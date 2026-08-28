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

//#region Input & Core Events dan lookup event
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
                } else {
                    txtFaktor.value = "";
                    // Pakai atas agar mirip VB agar tidak error meskipun faktor kali tidak ditemukan
                    // Uncomment kode SWAL dibawah jika mau lebih ketat dan hapus 1 baris code diatas serta btnProses.focus() dibawah
                    // Swal.fire(
                    //     "Error",
                    //     "Faktor Kali untuk Mesin " +
                    //         txtIdMesin.value +
                    //         " tidak ditemukan.",
                    //     "error",
                    // );
                }
                btnProses.focus();
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

btnOk.addEventListener("click", async function () {
    await loadDataKwahMesin();
});

btnProses.addEventListener("click", async function () {
    this.disabled = true;
    this.innerHTML =
        '<span class="spinner-border spinner-border-sm"></span> Processing...';
    btnKeluar.disabled = true;

    try {
        if (modeProses == "isi") {
            await prosesIsi();
        } else if (modeProses == "koreksi") {
            await prosesUpdate();
        } else if (modeProses == "hapus") {
            await prosesDelete();
        }
    } finally {
        this.disabled = false;
        this.innerText = "Proses";
        btnKeluar.disabled = false;
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent == "Keluar") {
        window.location.href = "/Extruder/Extruder";
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
