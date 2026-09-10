//#region Variables

// Select & Input Elements
const slcIdMesin = document.getElementById("id_mesin");
const txtCounterPagi = document.getElementById("counter_pagi");
const txtCounterSore = document.getElementById("counter_sore");
const txtCounterMalam = document.getElementById("counter_malam");
const txtKoreksiPagi = document.getElementById("koreksi_pagi");
const txtKoreksiSore = document.getElementById("koreksi_sore");
const txtKoreksiMalam = document.getElementById("koreksi_malam");
const hidData = document.getElementById("form_data");

// Button Elements
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

//#endregion

//#region Event Listeners
$("#" + slcIdMesin.id).on("select2:select", function () {
    fetchSelect("/sp-orderM/Sp_List_Mesin~2/" + slcIdMesin.value, (data) => {
        txtCounterPagi.value = data[0]["Counter_Pagi"] || 0;
        txtCounterSore.value = data[0]["Counter_Sore"] || 0;
        txtCounterMalam.value = data[0]["Counter_Malam"] || 0;
        txtKoreksiPagi.value = data[0]["Counter_Pagi"] || 0;
        txtKoreksiSore.value = data[0]["Counter_Sore"] || 0;
        txtKoreksiMalam.value = data[0]["Counter_Malam"] || 0;

        txtKoreksiPagi.disabled = false;
        txtKoreksiSore.disabled = false;
        txtKoreksiMalam.disabled = false;

        txtKoreksiPagi.select();
        btnProses.disabled = false;
    });
});

txtKoreksiPagi.addEventListener("focus", function () {
    this.select();
    this.focus();
});

txtKoreksiPagi.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
        txtKoreksiSore.select();
    }
});

txtKoreksiSore.addEventListener("focus", function () {
    this.select();
});

txtKoreksiSore.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
        txtKoreksiMalam.select();
    }
});

txtKoreksiMalam.addEventListener("focus", function () {
    this.select();
});

txtKoreksiMalam.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
        btnProses.focus();
    }
});

$("#" + slcIdMesin.id).on("select2:unselect", function () {
    txtCounterPagi.value = 0;
    txtCounterSore.value = 0;
    txtCounterMalam.value = 0;
    txtKoreksiPagi.value = 0;
    txtKoreksiSore.value = 0;
    txtKoreksiMalam.value = 0;

    txtKoreksiPagi.disabled = true;
    txtKoreksiSore.disabled = true;
    txtKoreksiMalam.disabled = true;
    btnProses.disabled = true;
});

btnProses.addEventListener("click", function () {
    hidData.value =
        slcIdMesin.value +
        "~" +
        txtKoreksiPagi.value +
        "~" +
        txtKoreksiSore.value +
        "~" +
        txtKoreksiMalam.value;
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent !== "Keluar") {
        btnKoreksi.disabled = false;
        btnProses.disabled = true;
        this.textContent = "Keluar";
        clearForm();
    } else window.location.href = "/";
});
//#endregion

//#region Functions
function init() {
    $("#" + slcIdMesin.id).select2({
        placeholder: "-- Pilih Type Mesin --",
        allowClear: true,
    });

    slcIdMesin.focus();
}

$(document).ready(function () {
    init();
});
//#endregion
