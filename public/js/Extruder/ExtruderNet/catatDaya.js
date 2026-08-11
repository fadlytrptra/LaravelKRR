//#region Variables
const txtIdMesin = document.getElementById("id_mesin");
const txtNamaMesin = document.getElementById("nama_mesin");
const btnLookupMesin = document.getElementById("btn_lookup_mesin");

const dateInput = document.getElementById("tanggal");
const timeJamProd = document.getElementById("jam_produksi");
// const slcMesin = document.getElementById("select_mesin");
const listOfInput = document.querySelectorAll("#card_daya .form-control");

const txtCounter = document.getElementById("counter");
const txtId = document.getElementById("teks_id");
const txtFaktor = document.getElementById("faktor");
const txtTanggal = document.getElementById("data_tgl");

const btnOk = document.getElementById("btn_ok");
const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const tableDayaCol = [
    { width: "50px" }, // No.
    { width: "140px" }, // Tanggal
    { width: "140px" }, // Id Mesin
    { width: "140px" }, // Jam Produksi
    { width: "140px" }, // Counter
    { width: "100px" }, // Faktor Kali
    { width: "140px" }, // Id User
    { width: "100px" }, // Id KWaH
];

const listDaya = [];
/* ISI LIST DAYA
    0 Nomor
    1 Tanggal
    2 IdMesin
    3 Jam
    4 CounterKWaH
    5 FaktorKali
    6 UserInput
    8 IdKwahMesin
*/

var checkboxesDaya = null;
var pilDaya = -1;
var modeProses = "";
//#endregion

const namaGedung = document.getElementById("nama_gedung").value;
const kode = namaGedung === "D" ? "3" : "1";
//#endregion

//#region Modal Lookup Functions
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
        Swal.fire("Error System", error.message || error, "error");
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
                if (prevRow) {
                    prevRow.focus();
                } else {
                    document.getElementById("lookupSearch").focus();
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

// SP_5298_EXT_LIST_MESIN
btnLookupMesin.addEventListener("click", function () {
    openLookupModal({
        title: "Pilih Mesin",
        url: `/Catat/getListMesin/${safeUrlParam(kode)}`,
        headers: ["ID Mesin", "Nama Mesin"],
        columns: ["IdMesin", "TypeMesin"],
        onSelect: (row) => {
            txtIdMesin.value = row.IdMesin;
            txtNamaMesin.value = row.TypeMesin;
            timeJamProd.focus();
        },
    });
});
//#endregion

//#region Input & Core Events
dateInput.addEventListener("keypress", function (event) {
    if (event.key == "Enter") btnLookupMesin.focus();
});

btnLookupMesin.addEventListener("change", function () {
    timeJamProd.focus();
});

timeJamProd.addEventListener("keypress", function (event) {
    if (event.key == "Enter") txtCounter.focus();
});

txtCounter.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        // SP_5298_EXT_FAKTOR_KALI
        fetchSelectAsync(
            `/Catat/getFaktorKali/${safeUrlParam(txtIdMesin.value)}`,
            (data) => {
                if (data.length > 0) {
                    txtFaktor.value = data[0].FaktorKali;
                    btnProses.focus();
                } else
                    Swal.fire(
                        "Error",
                        "Faktor Kali untuk Mesin " +
                            txtIdMesin.value +
                            " tidak ditemukan.",
                        "error",
                    );
            },
        );
    }
});

btnIsi.addEventListener("click", function () {
    modeProses = "isi";
    toggleButtons(2);
    setEnable(true);
    clearAll();
    dateInput.focus();
});

btnKoreksi.addEventListener("click", function () {
    if (pilDaya != -1) {
        modeProses = "koreksi";
        toggleButtons(2);
        setEnable(true);
        btnLookupMesin.disabled = true;
        txtCounter.select();
    } else
        Swal.fire(
            "Perhatian",
            "Pilih data yang akan dikoreksi terlebih dahulu!",
            "warning",
        );
});

btnHapus.addEventListener("click", function () {
    if (pilDaya != -1) {
        modeProses = "hapus";
        toggleButtons(2);
        btnProses.focus();
    } else
        Swal.fire(
            "Perhatian",
            "Pilih data yang akan dihapus terlebih dahulu!",
            "warning",
        );
});

btnOk.addEventListener("click", function () {
    loadDataKwahMesin();
});

btnProses.addEventListener("click", function () {
    if (modeProses == "isi") {
        prosesIsi();
    } else if (modeProses == "koreksi") {
        prosesUpdate();
    } else if (modeProses == "hapus") {
        prosesDelete();
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent == "Keluar") {
        window.location.href = "/Extruder/ExtruderNet";
    } else {
        toggleButtons(1);
        clearAll();
        setEnable(false);

        modeProses = "";
    }
});
//#endregion

//#region Functions
function toggleButtons(tmb) {
    switch (tmb) {
        case 1:
            btnIsi.disabled = false;
            btnKoreksi.disabled = false;
            btnHapus.disabled = false;
            btnProses.disabled = true;
            btnKeluar.textContent = "Keluar";
            break;
        case 2:
            btnIsi.disabled = true;
            btnKoreksi.disabled = true;
            btnHapus.disabled = true;
            btnProses.disabled = false;
            btnKeluar.textContent = "Batal";
            break;

        default:
            break;
    }
}

function setEnable(m_value) {
    if (modeProses == "koreksi" && m_value) {
        txtCounter.disabled = false;
    } else {
        btnLookupMesin.disabled = !m_value;
        listOfInput.forEach((input) => (input.disabled = !m_value));
    }

    txtId.disabled = true;
}

function clearAll(clear_table = true) {
    txtIdMesin.value = "";
    listOfInput.forEach((input) => (input.value = ""));
    timeJamProd.value = "00:00";
    dateInput.value = getCurrentDate();

    if (clear_table) {
        listDaya.length = 0;
        clearTable_DataTable("table_daya", 8);
    }
}

async function prosesIsi() {
    // SP_5298_EXT_INSERT_KWAH_MESIN
    try {
        const result = await fetchPost("/Catat/insKwahMesin", {
            tanggal: dateInput.value,
            id_mesin: txtIdMesin.value,
            jam: timeJamProd.value,
            counter: txtCounter.value || 0,
            kali: txtFaktor.value || 0,
            jam_user: getCurrentTime(),
        });

        if (result && result.status === "success") {
            setEnable(false);
            toggleButtons(1);
            clearAll();
            await loadDataKwahMesin();
            btnIsi.focus();
            modeProses = "";
            Swal.fire("Berhasil", "Data tersimpan.", "success");
        }
    } catch (error) {
        console.error("prosesIsi error:", error);
        Swal.fire("Error", error.message || "Gagal menyimpan data.", "error");
    }
}

async function prosesUpdate() {
    // SP_5298_EXT_UPDATE_KWAH_MESIN
    try {
        const result = await fetchPost(
            "/Catat/updKwahMesin",
            {
                id_kwah_mesin: parseInt(txtId.value),
                counter: txtCounter.value || 0,
            },
            "PUT",
        );

        if (result && result.status === "success") {
            setEnable(false);
            txtIdMesin.disabled = false;
            modeProses = "";
            toggleButtons(1);
            clearAll();
            await loadDataKwahMesin();
            btnIsi.focus();
            Swal.fire("Berhasil", "Data berhasil dikoreksi!", "success");
        }
    } catch (error) {
        console.error("prosesUpdate error:", error);
        Swal.fire("Error", error.message || "Gagal mengoreksi data.", "error");
    }
}

async function prosesDelete() {
    // SP_5298_EXT_DELETE_KWAH_MESIN
    try {
        const result = await fetchPost(
            `/Catat/delKwahMesin/${safeUrlParam(txtId.value)}`,
            {},
            "DELETE",
        );

        if (result && result.status === "success") {
            setEnable(false);
            modeProses = "";
            toggleButtons(1);
            clearAll();
            await loadDataKwahMesin();
            btnIsi.focus();
            Swal.fire("Berhasil", "Data berhasil dihapus!", "success");
        }
    } catch (error) {
        console.error("prosesDelete error:", error);
        Swal.fire("Error", error.message || "Gagal menghapus data.", "error");
    }
}

function rowClickedDaya(row, data, index) {
    if (
        pilDaya ==
        findClickedRowInList(listDaya, "IdKwahMesin", data.IdKwahMesin)
    ) {
        row.style.background = "white";
        pilDaya = -1;
        checkboxesDaya[index].checked = false;
        clearAll(false);
        setEnable(false);
        toggleButtons(1);
    } else {
        clearSelection_DataTable("table_daya");
        clearCheckedBoxes(checkboxesDaya, checkboxesDaya[index]);

        row.style.background = "aliceblue";
        checkboxesDaya[index].checked = true;
        pilDaya = findClickedRowInList(
            listDaya,
            "IdKwahMesin",
            data.IdKwahMesin,
        );

        dateInput.value = data.Tanggal;
        txtIdMesin.value = data.IdMesin;
        timeJamProd.value = data.Jam;
        txtCounter.value = data.CounterKWaH;
        txtFaktor.value = data.FaktorKali;
        txtId.value = data.IdKwahMesin;
    }
}

function loadDataKwahMesin(w_alert = true) {
    listDaya.length = 0;
    clearTable_DataTable("table_daya", 8, "Memuat data...");

    // SP_5298_EXT_KWAH_MESIN_PERBULAN
    fetchSelectAsync(
        `/Catat/getKwahMesinPerbulan/${safeUrlParam(txtTanggal.value.split("/")[0])}/${safeUrlParam(txtTanggal.value.split("/")[1])}`,
        (data) => {
            for (let i = 0; i < data.length; i++) {
                listDaya.push({
                    Nomor: i + 1,
                    Tanggal: dateTimeToDate(data[i].Tanggal),
                    IdMesin: data[i].IdMesin,
                    Jam: dateTimetoTime(data[i].Jam),
                    CounterKWaH: data[i].CounterKWaH,
                    FaktorKali: data[i].FaktorKali,
                    UserInput: data[i].UserInput,
                    IdKwahMesin: data[i].IdKWaHMesin,
                });
            }

            if (listDaya.length > 0) {
                addTable_DataTable(
                    "table_daya",
                    listDaya.map((item, index) => {
                        return {
                            ...item,
                            Nomor: `<input class="form-check-input" type="checkbox" value="${index}" name="checkbox_daya"> ${item.Nomor}`,
                        };
                    }),
                    null,
                    rowClickedDaya,
                );

                checkboxesDaya = document.querySelectorAll(
                    'input[name="checkbox_daya"]',
                );
            } else {
                if (w_alert)
                    Swal.fire(
                        "Perhatian",
                        "Tidak ditemukan Data KWaH Mesin pada bulan dan tahun tersebut. \nMohon coba masukkan bulan dan tahun lain.",
                        "warning",
                    );

                clearTable_DataTable(
                    "table_daya",
                    8,
                    "Tidak ditemukan Data KWaH Mesin.<br>Mohon pilih Bulan/Tahun lain.",
                );
            }
        },
    );
}
//#endregion

function init() {
    $("#table_daya").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "",
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel daya...",
            search: "",
        },

        initComplete: () => {
            var searchInput = $('input[type="search"]').addClass(
                "form-control",
            );

            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    });

    dateInput.value = getCurrentDate();
    timeJamProd.value = "00:00";
    txtTanggal.value = getCurrentDate(true);

    clearTable_DataTable("table_daya", 8);
    toggleButtons(1);
    setEnable(false);
    loadDataKwahMesin(false);
    btnIsi.focus();
}

$(document).ready(() => init());
