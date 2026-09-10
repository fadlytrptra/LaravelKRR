//#region Variables

const slcIdPerawatan = document.getElementById("id_perawatan");
const txtKwhMeter = document.getElementById("kwh_meter");
const hidProses = document.getElementById("mode_proses");
const hidData = document.getElementById("form_data");
const warnMeter = document.getElementById("warn_meter");

const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

//#endregion

//#region Listeners

$("#id_perawatan").on("select2:select", function () {
    let selected_data = this.value.split("~");
    txtKwhMeter.value = selected_data[1];

    btnProses.disabled = false;
    if (hidProses.value == 2) {
        txtKwhMeter.disabled = false;
        txtKwhMeter.select();
    } else btnProses.focus();
});

$("#id_perawatan").on("select2:open", function () {
    this.selectedIndex = 0;
});

btnIsi.addEventListener("click", function () {
    clearForm();
    toggleButtons(3);
    hidProses.value = 1;
    txtKwhMeter.select();
    btnProses.disabled = false;
});

btnKoreksi.addEventListener("click", function () {
    clearForm();
    toggleButtons(2);
    hidProses.value = 2;
    slcIdPerawatan.focus();
});

btnHapus.addEventListener("click", function () {
    clearForm();
    toggleButtons(2);
    hidProses.value = 3;
    slcIdPerawatan.focus();
});

btnProses.addEventListener("click", function () {
    hidData.value = "";
    switch (hidProses.value) {
        case "2":
            hidData.value =
                slcIdPerawatan.value.split("~")[0] + "~" + txtKwhMeter.value;
            break;

        case "3":
            hidData.value = slcIdPerawatan.value.split("~")[0];
            break;

        default:
            hidData.value = txtKwhMeter.value;
            break;
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        clearForm();
        toggleButtons(1);
        txtKwhMeter.classList.remove("is-invalid");
    } else window.location.href = "/";
});

//#endregion

//#region Functions

function toggleButtons(i) {
    switch (i) {
        case 2:
            btnIsi.disabled = true;
            btnKoreksi.disabled = true;
            btnHapus.disabled = true;
            btnKeluar.textContent = "Batal";
            slcIdPerawatan.disabled = false;
            break;

        case 3:
            btnIsi.disabled = true;
            btnKoreksi.disabled = true;
            btnHapus.disabled = true;
            btnKeluar.textContent = "Batal";
            txtKwhMeter.disabled = false;
            break;

        default:
            btnIsi.disabled = false;
            btnKoreksi.disabled = false;
            btnHapus.disabled = false;
            btnProses.disabled = true;
            btnKeluar.textContent = "Keluar";
            slcIdPerawatan.disabled = true;
            txtKwhMeter.disabled = true;
            break;
    }
}

function init() {
    addTxtListener(txtKwhMeter, btnProses);
    prepareButtons(btnIsi, btnKoreksi, btnHapus, btnKeluar);
    btnIsi.focus();

    $("#id_perawatan").select2({
        templateSelection: function (selectedOption) {
            if (selectedOption.text) {
                return selectedOption.text.split(" | ")[0];
            }
            return selectedOption.text;
        },
    });

    addCharLimit(txtKwhMeter, warnMeter);
    addValidation($("#" + txtKwhMeter.id), "form_submit");
}

$(document).ready(function () {
    init();
});

//#endregion
