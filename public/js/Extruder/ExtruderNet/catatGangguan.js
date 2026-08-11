//#region Variables DOM Elements
const dateInput = document.getElementById("tanggal");
const rdoMasuk = document.getElementById("radio_masuk");
const rdoLibur = document.getElementById("radio_libur");

const timeShiftAwal = document.getElementById("shift_awal");
const timeShiftAkhir = document.getElementById("shift_akhir");
const timeGangAwal = document.getElementById("waktu_awal");
const timeGangAkhir = document.getElementById("waktu_akhir");

const txtIdMesin = document.getElementById("id_mesin");
const txtNamaMesin = document.getElementById("nama_mesin");
const btnLookupMesin = document.getElementById("btn_lookup_mesin");

const txtIdKomposisi = document.getElementById("id_komposisi");
const txtNamaKomposisi = document.getElementById("nama_komposisi");
const btnLookupKomposisi = document.getElementById("btn_lookup_komposisi");

const txtIdGangguan = document.getElementById("id_gangguan");
const txtNamaGangguan = document.getElementById("nama_gangguan");
const btnLookupGangguan = document.getElementById("btn_lookup_gangguan");

const txtNoTransaksi = document.getElementById("no_transaksi");
const txtShift = document.getElementById("shift");
const txtJmlhJam = document.getElementById("jmlh_jam");
const txtJmlhMenit = document.getElementById("jmlh_menit");
const txtKeterangan = document.getElementById("keterangan");
const txtTanggal = document.getElementById("data_tgl");

const btnOk = document.getElementById("btn_ok");
const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const namaGedung = document.getElementById("nama_gedung");
const kode = namaGedung === "D" ? "3" : "1";
const listOfTransaksi = document.querySelectorAll(
    "#card_transaksi .form-control, .form-check-input, #card_transaksi .btn-lookup",
);

const listOfGangguan = document.querySelectorAll(
    "#card_gangguan .form-control, #card_gangguan .btn-lookup",
);

const listGangguan = [];

const posGangguan = $("#table_gangguan").offset().top - 125;
const colGangguan = [
    { width: "125px" }, // No. Transaksi
    { width: "100px" }, // Tanggal
    { width: "100px" }, // Id Mesin
    { width: "100px" }, // Nama Mesin
    { width: "125px" }, // Id Konversi
    { width: "50px" }, // Id Gangguan
    { width: "125px" }, // Nama Gangguan
    { width: "100px" }, // Awal Gangguan
    { width: "100px" }, // Akhir Gangguan
    { width: "100px" }, // Jumlah Jam
    { width: "110px" }, // Jumlah Menit
    { width: "125px" }, // Keterangan
];

var checkboxesGangguan = null;
var pilGangguan = -1;
var modeProses = "";
var refetchKomposisi = false;
//#endregion

//#region Generic Modal Lookup System
let currentLookupConfig = {};
let currentLookupData = [];
let filteredLookupData = [];
let currentPage = 1;
let itemsPerPage = 10;
let selectedRowIndex = 0;

// const modalLookupGeneric = new bootstrap.Modal(
//     document.getElementById("modalLookupGeneric"),
// );
// const lookupTitle = document.getElementById("lookupTitle");
// const lookupSearch = document.getElementById("lookupSearch");
// const lookupBody = document.getElementById("lookupBody");
// const paginationControls = document.getElementById("paginationControls");
// const showPerPage = document.getElementById("showPerPage");
// const lookupHeaders = document.getElementById("lookupHeaders");

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
//#endregion

//#region Lookup Triggers (Events)
btnLookupMesin.addEventListener("click", function () {
    openLookupModal({
        title: "Pilih Mesin",
        url: `/Catat/getListMesin/${safeUrlParam(kode)}`,
        headers: ["ID Mesin", "Nama Mesin"],
        columns: ["IdMesin", "TypeMesin"],
        onSelect: (row) => {
            const id = row.IdMesin;
            const name = row.TypeMesin;

            txtIdMesin.value = id;
            txtNamaMesin.value = name;

            if (modeProses == "Koreksi" || modeProses == "Hapus") {
                btnOk.disabled = false;
                btnOk.focus();
            } else if (modeProses == "Isi") {
                btnLookupGangguan.disabled = false;
                btnLookupGangguan.focus();
            }

            if (rdoLibur.checked) {
                btnLookupKomposisi.disabled = true;
                txtShift.disabled = false;
                txtShift.focus();
            } else {
                btnLookupKomposisi.disabled = false;
                btnLookupKomposisi.focus();
            }
        },
    });
});

btnLookupKomposisi.addEventListener("click", function () {
    if (!txtIdMesin.value) {
        Swal.fire("Perhatian", "Pilih Mesin terlebih dahulu!", "warning");
        return;
    }

    openLookupModal({
        title: "Pilih Komposisi",
        url: `/Catat/getListIdKomposisi/${safeUrlParam(dateInput.value)}/${safeUrlParam(txtIdMesin.value)}`,
        headers: ["ID Komposisi", "Nama Komposisi"],
        columns: ["idkonversi", "namakomposisi"],
        onSelect: (row) => {
            txtIdKomposisi.value = row.idkonversi || "";
            txtNamaKomposisi.value = row.namakomposisi || "";

            fetchSelectAsync(
                `/Catat/getDisplayShift/${safeUrlParam(row.idkonversi)}`,
                (data) => {
                    if (data && data.length > 0) {
                        txtShift.value = data[0].Shift;
                        timeShiftAwal.value = dateTimetoTime(data[0].AwalShift);
                        timeShiftAkhir.value = dateTimetoTime(
                            data[0].AkhirShift,
                        );
                    }
                    btnLookupGangguan.disabled = false;
                    btnLookupGangguan.focus();
                },
            );
        },
    });
});

btnLookupGangguan.addEventListener("click", function () {
    openLookupModal({
        title: "Pilih Gangguan",
        url: "/Catat/getListGangguan",
        headers: ["ID Gangguan", "Nama Gangguan"],
        columns: ["IdGangguan", "NamaGangguan"],
        onSelect: (row) => {
            const id = row.IdGangguan || row.id_gangguan || "";
            const name = row.NamaGangguan || row.nama_gangguan || "";

            txtIdGangguan.value = id;
            txtNamaGangguan.value = name;

            timeGangAwal.disabled = false;
            timeGangAwal.focus();
        },
    });
});
//#endregion

//#region Input & Core Events
dateInput.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        btnLookupMesin.disabled = false;
        btnLookupMesin.focus();
    }
});

timeShiftAwal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        timeShiftAkhir.focus();
    }
});

timeGangAwal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") timeGangAkhir.focus();
});

timeGangAkhir.addEventListener("keypress", function (event) {
    // if (event.key == "Enter") this.blur();
    if (event.key == "Enter") txtKeterangan.focus();
});

timeShiftAkhir.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        btnLookupGangguan.focus();
    }
});

rdoLibur.addEventListener("change", function () {
    txtIdKomposisi.value = "";
    txtNamaKomposisi.value = "";
});

rdoMasuk.addEventListener("change", function () {
    txtIdKomposisi.value = "";
    txtNamaKomposisi.value = "";
});

btnOk.addEventListener("click", function () {
    listGangguan.length = 0;
    clearTable_DataTable("table_gangguan", colGangguan.length, [
        "padding=250px",
        "Memuat data...",
    ]);

    loadDataGangguanProdEXT();
});

btnIsi.addEventListener("click", function () {
    toggleButtons(2);
    clearAll();
    modeProses = "isi";
    timeGangAwal.value = getCurrentDate() + "T" + getCurrentTime("hh:mm");
    timeGangAkhir.value = getCurrentDate() + "T" + getCurrentTime("hh:mm");
    setEnable(true);
});

btnKoreksi.addEventListener("click", function () {
    if (pilGangguan != -1) {
        modeProses = "koreksi";
        toggleButtons(2);
        setEnable(true, "gangguan");
        btnLookupGangguan.disabled = false;
        btnLookupGangguan.focus();
    } else {
        Swal.fire("Perhatian", "Belum ada data yang dipilih.", "warning");
    }
});

btnHapus.addEventListener("click", function () {
    if (pilGangguan != -1) {
        toggleButtons(2);
        modeProses = "hapus";
        btnProses.focus();
    } else {
        Swal.fire("Perhatian", "Belum ada data yang dipilih.", "warning");
    }
});

btnProses.addEventListener("click", function () {
    if (modeProses == "isi") {
        if (txtIdMesin.value == "") {
            btnLookupMesin.focus();
            Swal.fire(
                "Perhatian",
                "Data Mesin belum terisi dengan lengkap. Mohon periksa kembali!",
                "warning",
            );
        } else if (txtIdKomposisi.value == "") {
            btnLookupKomposisi.focus();
            Swal.fire(
                "Perhatian",
                "Data Komposisi belum terisi dengan lengkap. Mohon periksa kembali!",
                "warning",
            );
        } else if (txtIdGangguan.value == "") {
            btnLookupGangguan.focus();
            Swal.fire(
                "Perhatian",
                "Data Gangguan belum terisi dengan lengkap. Mohon periksa kembali!",
                "warning",
            );
        } else if (txtKeterangan.value.trim() == "") {
            txtKeterangan.focus();
            Swal.fire(
                "Perhatian",
                "Keterangan belum terisi dengan lengkap. Mohon periksa kembali!",
                "warning",
            );
        } else prosesIsi();
    } else if (modeProses == "koreksi") {
        prosesUpdate();
    } else if (modeProses == "hapus") {
        prosesDelete();
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        toggleButtons(1);
        clearAll();
        setEnable(false);

        pilGangguan = -1;
        listGangguan.length = 0;
        clearTable_DataTable("table_gangguan", colGangguan.length);

        modeProses = "";
    } else window.location.href = "/Extruder/ExtruderNet";
});

txtShift.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        this.value = this.value.toUpperCase();
        timeShiftAwal.focus();
    }
});

txtKeterangan.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        this.value = this.value.toUpperCase().replace(/\n/g, "");
        btnProses.focus();
    }
});

txtTanggal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") btnOk.focus();
});
//#endregion

// #region Utility & Helper Functions
function hitungWaktu() {
    let waktuAwal = new Date(timeGangAwal.value);
    let waktuAkhir = new Date(timeGangAkhir.value);
    if (waktuAkhir > waktuAwal) {
        let timeDiff = calculateTimeDifference(timeGangAwal, timeGangAkhir);
        txtJmlhJam.value = timeDiff[0];
        txtJmlhMenit.value = timeDiff[1];
        txtKeterangan.focus();
    } else {
        Swal.fire({
            icon: "error",
            title: "Waktu Tidak Valid",
            text: "Akhir Gangguan tidak bisa lebih awal dibandingkan Awal Gangguan.",
        }).then(() => {
            this.value = "";
            this.focus();
            timeGangAkhir.focus();
        });
        return;
    }
}

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

function setEnable(m_value, group_box = "") {
    if (group_box != "gangguan") {
        listOfTransaksi.forEach((ele) => {
            if (ele.type == "date" || ele.type == "time") {
                if (m_value) {
                    ele.classList.remove("unclickable");
                } else ele.classList.add("unclickable");
            } else if (ele.tagName == "BUTTON") {
                ele.disabled = !m_value;
            } else ele.disabled = !m_value;
        });

        if (modeProses == "isi" && m_value) {
            txtShift.disabled = true;
            timeShiftAwal.disabled = true;
            timeShiftAkhir.disabled = true;
            txtNoTransaksi.disabled = true;
            dateInput.focus();
        }
    }

    if (group_box != "transaksi") {
        listOfGangguan.forEach((ele) => {
            if (ele.type == "datetime") {
                if (m_value) {
                    ele.classList.remove("unclickable");
                } else ele.classList.add("unclickable");
            } else if (ele.tagName == "BUTTON") {
                ele.disabled = !m_value;
            } else ele.disabled = !m_value;
        });

        if (modeProses == "isi" || modeProses == "koreksi") {
            if (m_value) {
                txtJmlhJam.disabled = true;
                txtJmlhMenit.disabled = true;
            }
        }
    }
}

function clearAll() {
    listOfTransaksi.forEach((input) => {
        if (input.tagName == "INPUT") {
            input.value = "";
        } else if (input.tagName == "SELECT") {
            input.selectedIndex = 0;
        }

        rdoMasuk.checked = true;
    });

    listOfGangguan.forEach((input) => {
        if (input.tagName == "INPUT" || input.tagName == "TEXTAREA") {
            input.value = "";
        } else if (input.tagName == "SELECT") {
            input.selectedIndex = 0;
        }
    });

    dateInput.value = getCurrentDate();
    timeShiftAwal.value = "00:00";
    timeShiftAkhir.value = "00:00";
    timeGangAwal.value = getCurrentDate() + "T" + getCurrentTime("hh:mm");
    timeGangAkhir.value = getCurrentDate() + "T" + getCurrentTime("hh:mm");
}

function loadDataGangguanProdEXT() {
    fetchSelectAsync(
        `/Catat/getListGangguanProd/${safeUrlParam(txtTanggal.value.split("/")[0])}/${safeUrlParam(txtTanggal.value.split("/")[1])}`,
        (data) => {
            for (let i = 0; i < data.length; i++) {
                listGangguan.push({
                    NoTrans: data[i].NoTrans,
                    Tanggal: dateTimeToDate(data[i].Tanggal),
                    IdMesin: data[i].IdMesin,
                    TypeMesin: data[i].TypeMesin,
                    IdKonversi:
                        data[i].IdKonversi === undefined
                            ? ""
                            : data[i].IdKonversi,
                    IdGangguan: data[i].IdGangguan,
                    NamaGangguan: data[i].NamaGangguan,
                    AwalGangguan: data[i].AwalGangguan,
                    AkhirGangguan: data[i].AkhirGangguan,
                    JumlahJam: data[i].JumlahJam,
                    JumlahMenit: data[i].JumlahMenit,
                    Keterangan: data[i].Keterangan,
                    Transaksi: data[i].NoTrans,
                });
            }

            if (listGangguan.length > 0) {
                addTable_DataTable(
                    "table_gangguan",
                    listGangguan.map((item, index) => {
                        return {
                            ...item,
                            NoTrans: `<input class="form-check-input" type="checkbox" value="${index}" name="checkbox_gangguan"> ${item.NoTrans}`,
                        };
                    }),
                    colGangguan,
                    rowClickedGangguan,
                );
            } else
                clearTable_DataTable(
                    "table_gangguan",
                    colGangguan.length,
                    "Tidak Ada Data Gangguan.",
                );

            checkboxesGangguan = document.querySelectorAll(
                'input[name="checkbox_gangguan"]',
            );
        },
    );
}

function rowClickedGangguan(row, data, _) {
    if (
        pilGangguan ==
        findClickedRowInList(listGangguan, "NoTrans", data.Transaksi)
    ) {
        row.style.background = "white";
        checkboxesGangguan[pilGangguan].checked = false;
        pilGangguan = -1;
        clearAll();
    } else {
        clearSelection_DataTable("table_gangguan");
        clearCheckedBoxes(checkboxesGangguan, checkboxesGangguan[pilGangguan]);

        pilGangguan = findClickedRowInList(
            listGangguan,
            "NoTrans",
            data.Transaksi,
        );
        row.style.background = "aliceblue";
        checkboxesGangguan[pilGangguan].checked = true;

        txtNoTransaksi.value = listGangguan[pilGangguan].Transaksi;
        dateInput.value = data.Tanggal;
        timeGangAwal.value = data.AwalGangguan.replace(" ", "T");
        timeGangAkhir.value = data.AkhirGangguan.replace(" ", "T");
        txtJmlhJam.value = data.JumlahJam;
        txtJmlhMenit.value = data.JumlahMenit;
        txtKeterangan.value = data.Keterangan;

        txtIdMesin.value = data.IdMesin;
        txtNamaMesin.value = data.NamaMesin || data.TypeMesin;

        txtIdGangguan.value = data.IdGangguan;
        txtNamaGangguan.value = data.NamaGangguan;

        txtIdKomposisi.value = data.IdKonversi;

        if (txtIdKomposisi.value && txtIdKomposisi.value != "null") {
            fetchSelectAsync(
                `/Catat/getListShift/${safeUrlParam(txtIdKomposisi.value)}`,
                (dataShift) => {
                    txtShift.value = dataShift[0].Shift;
                    timeShiftAwal.value =
                        dataShift[0].AwalShift.split(" ")[1].split(".")[0];
                    timeShiftAkhir.value =
                        dataShift[0].AkhirShift.split(" ")[1].split(".")[0];
                },
            );
        } else txtShift.value = "***";
    }
}

async function prosesIsi() {
    try {
        if (txtIdMesin.value == "") {
            btnLookupMesin.focus();
            Swal.fire("Perhatian", "Data Mesin belum terisi.", "warning");
            return;
        }
        if (txtIdKomposisi.value == "") {
            btnLookupKomposisi.focus();
            Swal.fire("Perhatian", "Data Komposisi belum terisi.", "warning");
            return;
        }
        if (txtIdGangguan.value == "") {
            btnLookupGangguan.focus();
            Swal.fire("Perhatian", "Data Gangguan belum terisi.", "warning");
            return;
        }
        if (txtKeterangan.value.trim() == "") {
            txtKeterangan.focus();
            Swal.fire("Perhatian", "Keterangan belum terisi.", "warning");
            return;
        }

        const radioStr = rdoLibur.checked ? "L" : "M";
        const awalShift = getCurrentDate() + "T" + timeShiftAwal.value;
        const akhirShift = getCurrentDate() + "T" + timeShiftAkhir.value;

        const result = await fetchPost("/Catat/insGangguanProd", {
            tanggal: dateInput.value,
            id_mesin: txtIdMesin.value,
            id_gangguan: txtIdGangguan.value,
            id_konversi: txtIdKomposisi.value || null,
            shift: txtShift.value,
            awal: awalShift,
            akhir: akhirShift,
            awal_gangguan: timeGangAwal.value,
            akhir_gangguan: timeGangAkhir.value,
            jumlah_jam: txtJmlhJam.value || 0,
            jumlah_menit: txtJmlhMenit.value || 0,
            status: radioStr,
            keterangan: txtKeterangan.value,
            jam_user: getCurrentTime(),
        });

        if (result && result.status === "success") {
            const noTransData = await fetchSelectAsync("/Catat/getNoTrans");
            txtNoTransaksi.value = noTransData[0].No_Trans;

            setEnable(false);
            modeProses = "";
            toggleButtons(1);
            btnIsi.focus();

            listGangguan.push({
                NoTrans: txtNoTransaksi.value,
                Tanggal: dateInput.value,
                IdMesin: txtIdMesin.value,
                TypeMesin: txtNamaMesin.value,
                IdKonversi: txtIdKomposisi.value,
                IdGangguan: txtIdGangguan.value,
                NamaGangguan: txtNamaGangguan.value,
                AwalGangguan: timeGangAwal.value.replace("T", " "),
                AkhirGangguan: timeGangAkhir.value.replace("T", " "),
                JumlahJam: txtJmlhJam.value,
                JumlahMenit: txtJmlhMenit.value,
                Keterangan: txtKeterangan.value,
                Transaksi: txtNoTransaksi.value,
            });

            addTable_DataTable(
                "table_gangguan",
                listGangguan.map((item, index) => {
                    return {
                        ...item,
                        NoTrans: `<input class="form-check-input" type="checkbox" value="${index}" name="checkbox_gangguan"> ${item.NoTrans}`,
                    };
                }),
                colGangguan,
                rowClickedGangguan,
            );

            checkboxesGangguan = document.querySelectorAll(
                'input[name="checkbox_gangguan"]',
            );
            Swal.fire("Berhasil", "Data tersimpan.", "success");
        }
    } catch (error) {
        console.error("prosesIsi error:", error);
        Swal.fire("Error", error.message || "Gagal menyimpan data.", "error");
    }
}

async function prosesUpdate() {
    try {
        const result = await fetchPost(
            "/Catat/updGangguanProd",
            {
                no_trans: parseInt(txtNoTransaksi.value),
                awal: timeGangAwal.value,
                akhir: timeGangAkhir.value,
                jam: txtJmlhJam.value || 0,
                menit: txtJmlhMenit.value || 0,
                ket: txtKeterangan.value,
            },
            "PUT",
        );

        if (result && result.status === "success") {
            setEnable(false);
            modeProses = "";
            toggleButtons(1);
            clearAll();
            listGangguan.length = 0;
            clearTable_DataTable("table_gangguan", colGangguan.length);
            btnIsi.focus();
            Swal.fire("Berhasil", "Data berhasil dikoreksi!", "success");
        }
    } catch (error) {
        console.error("prosesUpdate error:", error);
        Swal.fire("Error", error.message || "Gagal mengoreksi data.", "error");
    }
}

async function prosesDelete() {
    try {
        const result = await fetchPost(
            `/Catat/delGangguanProd/${safeUrlParam(txtNoTransaksi.value)}`,
            {},
            "DELETE",
        );

        if (result && result.status === "success") {
            setEnable(false);
            modeProses = "";
            toggleButtons(1);
            clearAll();
            listGangguan.length = 0;
            clearTable_DataTable("table_gangguan", colGangguan.length);
            btnIsi.focus();
            Swal.fire("Berhasil", "Data berhasil dihapus!", "success");
        }
    } catch (error) {
        console.error("prosesDelete error:", error);
        Swal.fire("Error", error.message || "Gagal menghapus data.", "error");
    }
}
//#endregion

//#region Initialization
function init() {
    $("#table_gangguan").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: colGangguan,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel gangguan...",
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

    clearTable_DataTable("table_gangguan", colGangguan.length);
    toggleButtons(1);
    setEnable(false);

    rdoMasuk.checked = true;

    btnIsi.focus();
    txtTanggal.value = getCurrentDate(true);
    dateInput.value = getCurrentDate();
    timeShiftAwal.value = "00:00";
    timeShiftAkhir.value = "00:00";
    timeGangAwal.value = getCurrentDate() + " 00:00";
    timeGangAkhir.value = getCurrentDate() + " 00:00";
}

$(document).ready(() => {
    init();
});
//#endregion
