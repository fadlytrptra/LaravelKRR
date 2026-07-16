//#region Variables
const txtGelondongan = document.getElementById("kode_gelondongan");
const txtType = document.getElementById("txt_type");
const numKarung = document.getElementById("berat_karung");
const numReinforced = document.getElementById("berat_reinforced");
const numLami = document.getElementById("berat_lami");
const numConductive = document.getElementById("berat_kertas");
const numTotal = document.getElementById("berat_total");
const last_input = document.getElementById("last_input");

const btnKoreksi = document.getElementById("btn_koreksi");
const btnBatal = document.getElementById("btn_batal");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");
const listOfTxt = document.querySelectorAll("input, textarea");

var userId = "1001";
//#endregion

//#region Events
btnKoreksi.addEventListener("click", function () {
    listOfTxt.forEach((ele) => (ele.value = ""));
    this.disabled = true;
    txtGelondongan.disabled = false;
    txtGelondongan.select();
    btnProses.disabled = false;
    btnBatal.disabled = false;
});

txtGelondongan.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value.trim() != "") {
            let kode = "000000000";
            kode += this.value.toUpperCase();
            kode = kode.slice(-9);
            this.value = kode;
            loadDataFetch(kode);
        } else this.focus();
    }
});

numKarung.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = "0";
        numReinforced.select();
    }
});

numReinforced.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = "0";
        numLami.select();
    }
});

numLami.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = "0";
        numConductive.select();
    }
});

numConductive.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = "0";
        numTotal.value =
            parseFloat(numKarung.value) +
            parseFloat(numReinforced.value) +
            parseFloat(numLami.value) +
            parseFloat(numConductive.value);
        btnProses.focus();
    }
});

btnProses.addEventListener("click", function () {
    formWait(true);
    numTotal.value =
        parseFloat(numKarung.value) +
        parseFloat(numReinforced.value) +
        parseFloat(numLami.value) +
        parseFloat(numConductive.value);

    fetchSelect(
        "/beratStandar/SP_1273_PRG_CEK_KOMPOSISI_1/" + txtGelondongan.value,
        (data) => {
            const koreksiBerat = () => {
                let ket =
                    numKarung.value +
                    "-" +
                    numReinforced.value +
                    "-" +
                    numLami.value +
                    "-" +
                    numConductive.value +
                    "-" +
                    numTotal.value;

                fetchStmt(
                    "/beratStandar/SP_1273_BCD_UPDATE_BERAT_CIRCULAR/" +
                        txtGelondongan.value +
                        "~" +
                        ket +
                        "~" +
                        numKarung.value +
                        "~" +
                        numReinforced.value +
                        "~" +
                        numLami.value +
                        "~" +
                        numConductive.value +
                        "~" +
                        numTotal.value,
                    () => {
                        formWait(false);
                        alert("Berat karung berhasil dikoreksi.");
                        listOfTxt.forEach((ele) => (ele.disabled = true));
                        btnBatal.disabled = true;
                        btnProses.disabled = true;
                        btnKoreksi.disabled = false;
                        btnKoreksi.focus();
                    },
                );
            };

            if (data.length > 0) {
                if (data[0].Total > 0 && userId != "1001" && userId != "1703") {
                    formWait(false);
                    enableForm(false);
                    alert(
                        "Berat Standard tidak bisa dikoreksi, \nkarena sudah memiliki Komposisi Konversi.",
                    );
                } else koreksiBerat();
            } else koreksiBerat();
        },
    );
});

btnBatal.addEventListener("click", function () {
    listOfTxt.forEach((ele) => (ele.value = ""));
    btnProses.disabled = true;
    this.disabled = true;
    listOfTxt.forEach((ele) => (ele.disabled = true));
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/Berat Komposisi 2";
});
//#endregion

//#region Functions
function loadDataFetch(s_kode_brg) {
    formWait(true);
    fetchSelect(
        "/beratStandar/SP_1273_BCD_DATA_CIRCULAR/" + s_kode_brg,
        (data) => {
            if (data.length > 0) {
                txtGelondongan.value = s_kode_brg;
                txtType.value = data[0].NAMA_BRG;
                numKarung.value = data[0].BERAT_KARUNG;
                numReinforced.value = data[0].BERAT_KARUNG_FORCE;
                numLami.value = data[0].BERAT_LAMI;
                numConductive.value = data[0].BERAT_CONDUCTIVE;
                numTotal.value = data[0].BERAT_TOTAL;
                last_input.value = `${data[0].NamaUser ?? "Data User Kosong"} - ${data[0].Date_Modified ?? "Data Date Modified Kosong"}`;

                enableForm(true);
                numKarung.select();
            } else {
                listOfTxt.forEach((ele) => (ele.value = ""));
                alert("Kode barang tidak ditemukan.");
            }

            formWait(false);
        },
    );
}

function enableForm(bool_state) {
    btnKoreksi.disabled = bool_state;
    btnProses.disabled = !bool_state;
    btnBatal.disabled = !bool_state;
    listOfTxt.forEach((ele) => (ele.disabled = !bool_state));
    numTotal.disabled = true;
}

function formWait(bool_state) {
    if (bool_state) {
        document.body.style.cursor = "wait";
        btnKoreksi.style.cursor = "wait";
        btnKeluar.style.cursor = "wait";
        btnProses.style.cursor = "wait";
        btnBatal.style.cursor = "wait";
        listOfTxt.forEach((ele) => (ele.style.cursor = "wait"));
    } else {
        document.body.style.cursor = "default";
        btnKoreksi.style.cursor = "default";
        btnKeluar.style.cursor = "default";
        btnProses.style.cursor = "default";
        btnBatal.style.cursor = "default";
        listOfTxt.forEach((ele) => (ele.style.cursor = "default"));
    }
}
//#endregion

function init() {
    enableForm(false);
    btnKoreksi.focus();
}

$(document).ready(() => init());
