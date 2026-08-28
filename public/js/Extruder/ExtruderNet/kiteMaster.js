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
    openLookupModal({
        title: "Pilih Kode Barang KITE",
        url: `/Master/getCekBahanKite/${safeUrlParam(kode)}`,
        headers: ["Kode Barang", "Nama Type"],
        columns: ["KodeBarang", "NamaType"],
        onSelect: (row) => {
            displayKodeBarang.value = row.KodeBarang;
            txtNamaBarang.value = row.NamaType;

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
    const kode = rdoPembebasan.checked ? 2 : 3;

    // SP_1273_EXT_KITE
    openLookupModal({
        title: "Cek Data KITE",
        url: `/Master/getKiteExtruder/${safeUrlParam(kode)}`,
        headers: ["Tanggal Start", "Kode Barang"],
        columns: ["TglStart", "KodeBarang"],
        onSelect: (row) => {
            let tglStart = row.TglStart;
            if (tglStart && tglStart.includes("T")) {
                tglStart = tglStart.split("T")[0];
            }

            processCekData(row.KodeBarang, tglStart);
        },
    });
});

btnKeluar.addEventListener("click", function () {
    window.location.href = '/Extruder/Extruder';
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
