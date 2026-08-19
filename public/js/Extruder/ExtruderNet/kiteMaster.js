//#region Variables
const rdoPembebasan = document.getElementById("fasilitas_pembebasan");
const rdoPengembalian = document.getElementById("fasilitas_pengembalian");
const dateStart = document.getElementById("tgl_start");

const displayKodeBarang = document.getElementById("display_kode_barang");
const btnLookupKodeBarang = document.getElementById("btn_lookup_kode_barang");

const txtNamaBarang = document.getElementById("nama_barang");
const txtBahanPP = document.getElementById("bahan_pp");
const txtBenang = document.getElementById("benang");
const txtHasil = document.getElementById("hasil");
const txtSisa = document.getElementById("sisa");

const hidMeter = document.getElementById("meter");
const hidRoll = document.getElementById("roll");
const hidAwal = document.getElementById("meter_awal");

const btnCekKode = document.getElementById("btn_cek_kode");
const btnSimpan = document.getElementById("btn_simpan");
const btnKeluar = document.getElementById("btn_keluar");

const listOfTxt = document.querySelectorAll("input[type='text']");
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
        tbody.innerHTML = `<tr><td colspan="${config.headers.length}" class="text-center"><div class="spinner-border spinner-border-sm"></div> Memuat data...</td></tr>`;
        document.getElementById("paginationControls").innerHTML = "";

        const modalEl = document.getElementById("modalLookupGeneric");
        const modalInstance = new bootstrap.Modal(modalEl);
        modalInstance.show();

        const processData = (data) => {
            currentLookupData = data;
            filteredLookupData = data;
            renderLookupTable();
            renderPagination();

            selectedRowIndex = 0;

            setTimeout(() => {
                document.getElementById("lookupSearch").focus();
                highlightSelectedRow();
            }, 500);
        };

        if (config.url) {
            const data = await fetchSelectAsync(config.url, (data) =>
                processData(data),
            );
        } else if (config.data) {
            processData(config.data);
        }

        const searchInput = document.getElementById("lookupSearch");
        searchInput.value = "";

        searchInput.onkeydown = function (e) {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    renderLookupTable();
                    renderPagination();
                }
                return;
            }

            if (e.key === "ArrowRight") {
                e.preventDefault();
                const totalPages = Math.ceil(
                    filteredLookupData.length / itemsPerPage,
                );
                if (currentPage < totalPages) {
                    currentPage++;
                    renderLookupTable();
                    renderPagination();
                }
                return;
            }
        };

        searchInput.onkeyup = function (e) {
            if (["ArrowLeft", "ArrowRight"].includes(e.key)) return;

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
            "Error",
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
            let cellData = row[col];
            if (col === "TglStart" && cellData && cellData.includes("T")) {
                cellData = cellData.split("T")[0];
            }
            td.textContent = cellData || "-";
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
                if (prevRow) {
                    prevRow.focus();
                } else {
                    document.getElementById("lookupSearch").focus();
                }
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    renderLookupTable();
                    renderPagination();
                    const firstRow = document.querySelector("#lookupBody tr");
                    if (firstRow) firstRow.focus();
                }
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                const totalPages = Math.ceil(
                    filteredLookupData.length / itemsPerPage,
                );
                if (currentPage < totalPages) {
                    currentPage++;
                    renderLookupTable();
                    renderPagination();
                    const firstRow = document.querySelector("#lookupBody tr");
                    if (firstRow) firstRow.focus();
                }
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

//#region Events
rdoPembebasan.addEventListener("change", function () {
    clearAll();
});

rdoPengembalian.addEventListener("change", function () {
    clearAll();
});

btnLookupKodeBarang.addEventListener("click", function () {
    let kode = rdoPembebasan.checked ? 1 : 2;

    // SP_1273_EXT_Cek_Bahan_KITE
    fetchSelectAsync(
        `/Master/getCekBahanKite/${safeUrlParam(kode)}`,
        (data) => {
            if (data.length > 0) {
                openLookupModal({
                    title: "Pilih Kode Barang KITE",
                    data: data,
                    headers: ["Kode Barang", "Nama Type"],
                    columns: ["KodeBarang", "NamaType"],
                    onSelect: function (selectedRow) {
                        displayKodeBarang.value = selectedRow.KodeBarang;
                        txtNamaBarang.value = selectedRow.NamaType;

                        txtBenang.value = "";
                        txtBahanPP.value = "";
                        hidMeter.value = "";
                        hidRoll.value = "";
                        txtHasil.value = "";
                        txtSisa.value = "";
                        btnSimpan.disabled = false;

                        txtBahanPP.focus();
                    },
                });
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Informasi",
                    text: "Data kode barang tidak ditemukan.",
                });
            }
        },
    );
});

txtBahanPP.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (txtBahanPP.value === "" || txtBahanPP.value == 0) {
            Swal.fire(
                "Peringatan",
                "Harap isi Bahan PP lebih dari 0",
                "warning",
            ).then(() => {
                this.focus();
            });
            return;
        }
        txtBenang.value =
            ((parseFloat(txtBahanPP.value) / 0.0757) * 97.01) / 1000;
        txtBenang.value = parseFloat(txtBenang.value).toFixed(2);
        txtHasil.value = 0;
        txtSisa.value = 0;

        hidMeter.value = parseFloat(txtBahanPP.value) / 0.0757;
        hidAwal.value = parseFloat(hidMeter.value).toFixed(2);

        hidRoll.value = parseFloat(hidMeter.value) / 2000;
        hidRoll.value = parseFloat(hidRoll.value).toFixed(0);
        hidMeter.value = parseFloat(hidRoll.value) * 2000;

        btnSimpan.focus();
    }
});

btnSimpan.addEventListener("click", function () {
    // SP_1273_EXT_KITE
    try {
        if (displayKodeBarang.value.trim() == "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Pilih Kode Barang Fasilitas terlebih dahulu!",
            }).then(() => btnLookupKodeBarang.focus());
            return;
        } else if (txtBenang.value == "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Isi Bahan PP dan Benang terlebih dahulu!",
            }).then(() => txtBahanPP.focus());
            return;
        } else {
            let jenis = rdoPembebasan.checked
                ? "Fas Pembebasan"
                : "Fas Pengembalian";

            fetchPost("/Master/insKiteExtruder", {
                kode: "1",
                tgl_start: dateStart.value,
                kode_barang: displayKodeBarang.value,
                jenis_fas: jenis,
                bahan_pp: txtBahanPP.value,
                benang: txtBenang.value,
                meter: hidMeter.value,
                roll: hidRoll.value,
                meter_awal: hidAwal.value,
                hasil: txtHasil.value,
            })
                .then((res) => {
                    if (res && res.status === "success") {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Data berhasil tersimpan.",
                        }).then(() => clearAll());
                    } else {
                        Swal.fire("Error", "Data gagal tersimpan.", "error");
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: err.toString(),
                    });
                });
        }
        this.disabled = true;
        this.innerHTML =
            '<span class="spinner-border spinner-border-sm"></span> Processing...';
        btnKeluar.disabled = true;
    } catch (error) {
        Swal.fire("Error", "Terjadi kesalahan: " + error.message, "error");
    } finally {
        this.disabled = false;
        this.innerText = "Proses";
        btnKeluar.disabled = false;
    }
});

btnCekKode.addEventListener("click", function () {
    // SP_1273_EXT_KITE
    const kode = rdoPembebasan.checked ? 2 : 3;
    const url = `/Master/getKiteExtruder/${safeUrlParam(kode)}`;

    fetchSelectAsync(url, (data) => {
        if (data.length === 1) {
            processCekData(data[0].KodeBarang, data[0].TglStart);
            return;
        }

        const formattedData = data.map((row) => ({
            ...row,
            TglStart: row.TglStart.substring(0, 10),
        }));

        openLookupModal({
            title: "Cek Data KITE",
            data: formattedData,
            headers: ["Tanggal Start", "Kode Barang"],
            columns: ["TglStart", "KodeBarang"],
            onSelect: function (selectedRow) {
                processCekData(selectedRow.KodeBarang, selectedRow.TglStart);
            },
        });
    });
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/ExtruderNet";
});
//#endregion

//#region Functions
function clearAll() {
    listOfTxt.forEach((txt) => (txt.value = ""));
    dateStart.value = getCurrentDate();
    displayKodeBarang.value = "";
}

function processCekData(kodeBarang, tglStartRaw) {
    dateStart.value = tglStartRaw.includes("T")
        ? tglStartRaw.split("T")[0]
        : tglStartRaw;

    // SP_1273_EXT_KITE Kode 4
    fetchSelectAsync(
        `/Master/getKiteExtruder/4/${safeUrlParam(dateStart.value)}/${safeUrlParam(kodeBarang.trim())}`,
        (data) => {
            if (data.length > 0) {
                displayKodeBarang.value = kodeBarang;

                txtNamaBarang.value = data[0].NAMA_BRG;
                txtBahanPP.value = data[0].BahanPP;
                txtBenang.value = data[0].Benang;
                txtHasil.value = data[0].Hasil;
                txtSisa.value =
                    parseFloat(txtBenang.value) - parseFloat(txtHasil.value);

                btnSimpan.disabled = true;
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Tidak Ditemukan",
                    text:
                        "Tidak ditemukan data Kode Barang " +
                        kodeBarang.trim() +
                        ".",
                });
            }
        },
    );
}

function init() {
    rdoPembebasan.checked = true;
    dateStart.value = getCurrentDate();

    btnLookupKodeBarang.focus();
}

$(document).ready(() => init());
//#endregion
