//#region Variables

// Select & Input Elements
const slcIdKelompok = document.getElementById("id_kelompok_mesin");
const txtKeterangan = document.getElementById("keterangan_mesin");

// Other Elements
const warnKeterangan = document.getElementById("warn_keterangan");
const hidProses = document.getElementById("mode_proses");
const hidData = document.getElementById("form_data");

// Button Elements
const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

//#endregion

//#region Listeners

$("#id_kelompok_mesin").on("select2:select", function () {
    let selected_data = this.value.split("~");
    txtKeterangan.value = selected_data[1];

    btnProses.disabled = false;
    if (hidProses.value == 2) {
        txtKeterangan.disabled = false;
        txtKeterangan.select();
    } else btnProses.focus();
});

$("#id_kelompok_mesin").on("select2:open", function () {
    this.selectedIndex = 0;
});

btnIsi.addEventListener("click", function () {
    clearForm();
    toggleButtons(3);
    hidProses.value = 1;
    txtKeterangan.select();
    btnProses.disabled = false;
});

btnKoreksi.addEventListener("click", function () {
    clearForm();
    toggleButtons(2);
    hidProses.value = 2;
    slcIdKelompok.focus();
});

btnHapus.addEventListener("click", function () {
    clearForm();
    toggleButtons(2);
    hidProses.value = 3;
    slcIdKelompok.focus();
});

btnProses.addEventListener("click", function () {
    hidData.value = "";
    switch (hidProses.value) {
        case "2":
            hidData.value =
                slcIdKelompok.value.split("~")[0] + "~" + txtKeterangan.value;
            break;

        case "3":
            hidData.value = slcIdKelompok.value.split("~")[0];
            break;

        default:
            hidData.value = txtKeterangan.value;
            break;
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        clearForm();
        toggleButtons(1);
        warnKeterangan.style.display = "none";
        txtKeterangan.classList.remove("is-invalid");
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
            slcIdKelompok.disabled = false;
            break;

        case 3:
            btnIsi.disabled = true;
            btnKoreksi.disabled = true;
            btnHapus.disabled = true;
            btnKeluar.textContent = "Batal";
            txtKeterangan.disabled = false;
            break;

        default:
            btnIsi.disabled = false;
            btnKoreksi.disabled = false;
            btnHapus.disabled = false;
            btnProses.disabled = true;
            btnKeluar.textContent = "Keluar";
            slcIdKelompok.disabled = true;
            txtKeterangan.disabled = true;
            break;
    }
}

function init() {
    addTxtListener(txtKeterangan, btnProses);
    prepareButtons(btnIsi, btnKoreksi, btnHapus, btnKeluar);
    btnIsi.focus();

    $("#id_kelompok_mesin").select2({
        templateSelection: function (selectedOption) {
            if (selectedOption.text) {
                return selectedOption.text.split(" | ")[0];
            }
            return selectedOption.text;
        },
    });

    addCharLimit(txtKeterangan, warnKeterangan);
    addValidation($("#" + txtKeterangan.id), "form_submit");
}

$(document).ready(function () {
    init();
});

//#endregion
