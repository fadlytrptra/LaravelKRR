//#region Variables

const slcIdLokasi = document.getElementById("id_lokasi");
const txtNamaLokasi = document.getElementById("nama_lokasi");
const warnLokasi = document.getElementById("warn_lokasi");
const hidProses = document.getElementById("mode_proses");
const hidData = document.getElementById("form_data");

const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

//#endregion

//#region Listeners

$("#id_lokasi").on("select2:select", function () {
    let selected_data = this.value.split("~");
    txtNamaLokasi.value = selected_data[1];

    btnProses.disabled = false;
    if (hidProses.value == 2) {
        txtNamaLokasi.disabled = false;
        txtNamaLokasi.select();
    } else btnProses.focus();
});

$("#id_lokasi").on("select2:open", function () {
    this.selectedIndex = 0;
});

btnIsi.addEventListener("click", function () {
    clearForm();
    toggleButtons(3);
    hidProses.value = 1;
    txtNamaLokasi.select();
    btnProses.disabled = false;
});

btnKoreksi.addEventListener("click", function () {
    clearForm();
    toggleButtons(2);
    hidProses.value = 2;
    slcIdLokasi.focus();
});

btnHapus.addEventListener("click", function () {
    clearForm();
    toggleButtons(2);
    hidProses.value = 3;
    slcIdLokasi.focus();
});

btnProses.addEventListener("click", function () {
    hidData.value = "";
    switch (hidProses.value) {
        case "2":
            hidData.value =
                slcIdLokasi.value.split("~")[0] + "~" + txtNamaLokasi.value;
            break;

        case "3":
            hidData.value = slcIdLokasi.value.split("~")[0];
            break;

        default:
            hidData.value = txtNamaLokasi.value;
            break;
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        clearForm();
        toggleButtons(1);
        txtNamaLokasi.classList.remove("is-invalid");
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
            slcIdLokasi.disabled = false;
            break;

        case 3:
            btnIsi.disabled = true;
            btnKoreksi.disabled = true;
            btnHapus.disabled = true;
            btnKeluar.textContent = "Batal";
            txtNamaLokasi.disabled = false;
            break;

        default:
            btnIsi.disabled = false;
            btnKoreksi.disabled = false;
            btnHapus.disabled = false;
            btnProses.disabled = true;
            btnKeluar.textContent = "Keluar";
            slcIdLokasi.disabled = true;
            txtNamaLokasi.disabled = true;
            break;
    }
}

function init() {
    addTxtListener(txtNamaLokasi, btnProses);
    prepareButtons(btnIsi, btnKoreksi, btnHapus, btnKeluar);
    btnIsi.focus();

    $("#id_lokasi").select2({
        templateSelection: function (selectedOption) {
            if (selectedOption.text) {
                return selectedOption.text.split(" | ")[0];
            }
            return selectedOption.text;
        },
    });

    addCharLimit(txtNamaLokasi, warnLokasi);
    addValidation($("#" + txtNamaLokasi.id), "form_submit");
}

$(document).ready(function () {
    init();
});

//#endregion
