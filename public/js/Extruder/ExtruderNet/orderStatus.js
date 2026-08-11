//#region Variabel DOM Elements & Global State
const dateInput = document.getElementById("tanggal");
const listOfInput = document.querySelectorAll(".card .form-control");

const txtSpek = document.getElementById("spek");
const txtJmlhOrder = document.getElementById("jmlh_order");
const txtJmlhProd = document.getElementById("jmlh_produksi");
const txtKeterangan = document.getElementById("keterangan");

const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const inputIdOrder = document.getElementById("no_order");
const txtNamaOrder = document.getElementById("nama_order");
const btnLookupOrder = document.getElementById("btn_lookup_order");
const slcStatus = document.getElementById("select_status");

const namaGedung = document.getElementById("nama_gedung").value;
let idDivisi = "";
switch (namaGedung) {
    case "B":
        idDivisi = "MEX";
        break;
    case "D":
        idDivisi = "DEX";
        break;
    default:
        idDivisi = "EXT";
        break;
}

const listOrder = [];
/* ISI LIST ORDER
    0 TanggalOrder
    1 TypeBenang
    2 JumlahTritier
    3 JumlahProduksiTritier
*/

const tableOrderCol = [
    { width: "225px" }, // TanggalOrder
    { width: "500px" }, // TypeBenang
    { width: "225px" }, // JumlahTritier
    { width: "225px" }, // JumlahProduksiTritier
];

let terpilih = -1;
let tableOrder = "";
//#endregion

//#region Generic Modal Lookup System
let currentLookupData = [];
let filteredLookupData = [];
let currentPage = 1;
let itemsPerPage = 10;
let currentLookupConfig = {};
let selectedRowIndex = 0;

async function openLookupModal(config) {
    try {
        currentLookupConfig = config;
        currentPage = 1;

        const showPageSelect = document.getElementById("showPerPage");
        itemsPerPage = parseInt(showPageSelect.value) || 10;

        document.getElementById("lookupTitle").innerHTML =
            `<i class="bi bi-view-list text-primary me-2"></i>${config.title}`;

        const trHeader = document.getElementById("lookupHeaders");
        trHeader.innerHTML = config.headers
            .map((h) => `<th>${h}</th>`)
            .join("");

        const tbody = document.getElementById("lookupBody");
        tbody.innerHTML = `<tr><td colspan="${config.headers.length}" class="text-center">Memuat data...</td></tr>`;
        document.getElementById("paginationControls").innerHTML = "";

        const modalEl = document.getElementById("modalLookupGeneric");
        const modalInstance = new bootstrap.Modal(modalEl);
        modalInstance.show();

        const data = await fetchSelectAsync(config.url);
        currentLookupData = data;
        filteredLookupData = data;
        renderLookupTable();
        renderPagination();

        selectedRowIndex = 0;

        setTimeout(() => {
            document.getElementById("lookupSearch").focus();
            highlightSelectedRow();
        }, 150);

        const searchInput = document.getElementById("lookupSearch");
        searchInput.value = "";
        searchInput.onkeyup = function (e) {
            if (e.key === "ArrowDown") {
                e.preventDefault();

                const rows = document.querySelectorAll("#lookupBody tr");
                if (rows.length > 0) {
                    rows[selectedRowIndex].focus();
                }
                return;
            }

            if (e.key === "Enter") {
                e.preventDefault();

                const rows = document.querySelectorAll("#lookupBody tr");
                if (rows.length > 0) {
                    rows[selectedRowIndex].click();
                }
                return;
            }

            const keyword = this.value.toLowerCase();
            filteredLookupData = currentLookupData.filter((row) => {
                return config.columns.some((col) =>
                    String(row[col] || "")
                        .toLowerCase()
                        .includes(keyword),
                );
            });

            currentPage = 1;
            renderLookupTable();
            renderPagination();
        };

        showPageSelect.onchange = function () {
            itemsPerPage = parseInt(this.value);
            currentPage = 1;
            renderLookupTable();
            renderPagination();
        };
    } catch (error) {
        Swal.fire(
            "Erro",
            error.message || "Gagal memuat data lookup.",
            "error",
        );
    }
}

function highlightSelectedRow() {
    const rows = document.querySelectorAll("#lookupBody tr");

    rows.forEach((row, index) => {
        if (index === selectedRowIndex) {
            row.classList.add("table-primary");
        }
    });
}

function renderLookupTable() {
    const tbody = document.getElementById("lookupBody");
    const config = currentLookupConfig;
    tbody.innerHTML = "";

    if (filteredLookupData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${config.headers.length}" class="text-center text-danger">Data tidak ditemukan</td></tr>`;
        return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredLookupData.slice(startIndex, endIndex);

    paginatedData.forEach((row) => {
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        tr.tabIndex = 0;

        config.columns.forEach((col) => {
            const td = document.createElement("td");
            td.textContent = row[col] || "-";
            tr.appendChild(td);
        });

        tr.addEventListener("click", () => {
            const modalEl = document.getElementById("modalLookupGeneric");
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (modalInstance) modalInstance.hide();
            config.onSelect(row);
        });

        tr.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                this.click();
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                let nextRow = this.nextElementSibling;
                if (nextRow) nextRow.focus();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                let prevRow = this.previousElementSibling;
                if (prevRow) prevRow.focus();
                else document.getElementById("lookupSearch").focus();
            }
        });
        tbody.appendChild(tr);
    });
    highlightSelectedRow();
}

function renderPagination() {
    const paginationEl = document.getElementById("paginationControls");
    paginationEl.innerHTML = "";

    const totalPages = Math.ceil(filteredLookupData.length / itemsPerPage);
    if (totalPages <= 1) return;

    const prevLi = document.createElement("li");
    prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
    prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous">&laquo;</a>`;
    prevLi.onclick = (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderLookupTable();
            renderPagination();
        }
    };
    paginationEl.appendChild(prevLi);

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        const pageLi = document.createElement("li");
        pageLi.className = `page-item ${currentPage === i ? "active" : ""}`;
        pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageLi.onclick = (e) => {
            e.preventDefault();
            currentPage = i;
            renderLookupTable();
            renderPagination();
        };
        paginationEl.appendChild(pageLi);
    }

    const nextLi = document.createElement("li");
    nextLi.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
    nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next">&raquo;</a>`;
    nextLi.onclick = (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderLookupTable();
            renderPagination();
        }
    };
    paginationEl.appendChild(nextLi);
}
//#endregion

//#region Lookup Triggers (Events)
btnLookupOrder.addEventListener("click", function () {
    // SP_5298_EXT_LIST_BATAL_ORDER
    openLookupModal({
        title: "Pilih No. Order",
        url: `/Order/getListBatalOrd/${safeUrlParam(idDivisi)}`,
        headers: ["Identifikasi", "Id Order"],
        columns: ["Identifikasi", "IdOrder"],
        onSelect: (row) => {
            inputIdOrder.value = row.IdOrder;
            txtNamaOrder.value = row.Identifikasi;

            // Reset field detail
            listOfInput.forEach((input) => (input.value = ""));
            clearTable_DataTable(
                "table_order",
                tableOrderCol.length,
                "Memuat data...",
            );

            // SP_5298_EXT_LIST_BATAL_ORDER
            fetchSelectAsync(
                `/Order/getListOrderBtl/${safeUrlParam(row.IdOrder)}`,
            )
                .then((data) => {
                    listOrder.length = 0;
                    for (let i = 0; i < data.length; i++) {
                        listOrder.push({
                            TanggalOrder: dateTimeToDate(data[i].TanggalOrder),
                            TypeBenang: data[i].TypeBenang,
                            JumlahTritier: data[i].JumlahTritier,
                            JumlahProduksiTritier:
                                data[i].JumlahProduksiTritier,
                        });
                    }

                    if (data.length > 0) {
                        addTable_DataTable(
                            "table_order",
                            listOrder,
                            tableOrderCol,
                            rowClicked,
                        );
                    } else {
                        clearTable_DataTable(
                            "table_order",
                            tableOrderCol.length,
                            `Tidak ditemukan data untuk <b>Order ${row.IdOrder}</b>.`,
                        );
                    }

                    window.scrollTo(0, document.body.scrollHeight);
                    slcStatus.focus();
                })
                .catch((error) => {
                    Swal.fire(
                        "Error",
                        "Gagal memuat detail order: " + error.message,
                        "error",
                    );
                    clearTable_DataTable(
                        "table_order",
                        tableOrderCol.length,
                        "Terjadi kesalahan.",
                    );
                });
        },
    });
});
//#endregion

//#region Input & Core Events
slcStatus.addEventListener("change", function () {
    if (this.value !== "-- Pilih Status --") {
        txtKeterangan.focus();
    } else {
        Swal.fire(
            "Peringatan",
            "Pilih status terlebih dahulu.",
            "warning",
        ).then(() => {
            this.focus();
        });
    }
});

txtKeterangan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (this.value.trim() !== "") {
            btnProses.disabled = false;
            btnProses.focus();
        } else {
            Swal.fire(
                "Peringatan",
                "Keterangan masih belum terisi!",
                "warning",
            ).then(() => {
                this.focus();
            });
            return;
        }
    }
});

btnProses.addEventListener("click", async function () {
    try {
        // Validasi input
        if (slcStatus.value === "-- Pilih Status --") {
            Swal.fire("Peringatan", "Status masih belum terpilih!", "warning");
            slcStatus.focus();
            return;
        }

        if (txtKeterangan.value.trim() === "") {
            Swal.fire(
                "Peringatan",
                "Keterangan masih belum terisi!",
                "warning",
            ).then(() => {
                txtKeterangan.focus();
            });
            return;
        }

        if (!inputIdOrder.value) {
            Swal.fire("Peringatan", "Pilih order terlebih dahulu!", "warning");
            btnLookupOrder.focus();
            return;
        }

        // Loading state
        this.disabled = true;
        this.innerHTML =
            '<span class="spinner-border spinner-border-sm"></span> Memproses...';

        // SP_5298_EXT_STATUS_ORDER
        await fetchPost(
            "/Order/updStatusOrder",
            {
                id_order: inputIdOrder.value,
                status: slcStatus.value,
                ket: txtKeterangan.value.trim(),
            },
            "PUT",
        );

        listOrder.length = 0;
        clearTable_DataTable("table_order", tableOrderCol.length);
        clearData();

        this.disabled = true;

        Swal.fire("Berhasil", "Data telah diproses!", "success").then(() => {
            inputIdOrder.value = "";
            txtNamaOrder.value = "";
            btnLookupOrder.focus();
        });
        return;
    } catch (error) {
        console.error("Error proses batal order:", error);
        Swal.fire("Error", "Gagal memproses data: " + error.message, "error");
    } finally {
        this.disabled = false;
        this.innerHTML = "Proses";
    }
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/ExtruderNet";
});

btnProses.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") btnKeluar.focus();
});

btnKeluar.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") btnProses.focus();
});
//#endregion

//#region Utility & Helper Functions
function clearData() {
    slcStatus.selectedIndex = 0;
    listOfInput.forEach((input) => (input.value = ""));
    terpilih = -1;
}

function rowClicked(row, data, _) {
    const currentIdx = findClickedRowInList(
        listOrder,
        "TypeBenang",
        data.TypeBenang,
    );

    if (terpilih === currentIdx) {
        row.style.background = "white";
        terpilih = -1;
        listOfInput.forEach((input) => {
            if (input.id !== "keterangan") input.value = "";
        });
    } else {
        clearSelection_DataTable("table_order");
        row.style.background = "aliceblue";
        terpilih = currentIdx;

        dateInput.value = data.TanggalOrder;
        txtSpek.value = data.TypeBenang;
        txtJmlhOrder.value = data.JumlahTritier;
        txtJmlhProd.value = data.JumlahProduksiTritier;
    }
}
//#endregion

//#region Initialization
function init() {
    tableOrder = $("#table_order").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: tableOrderCol,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel order...",
            search: "",
        },
        initComplete: function () {
            var searchInput = $('input[type="search"]').addClass(
                "form-control",
            );
            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    });

    clearTable_DataTable("table_order", tableOrderCol.length);
    btnProses.disabled = true;
    btnLookupOrder.focus();
}

$(document).ready(() => init());
//#endregion
