//#region Variables

// Select & Input Elements
const slcIdType = document.getElementById("id_type_mesin");
const txtNama = document.getElementById("nama_type_mesin");
const txtPabrik = document.getElementById("pabrik_pembuat_mesin");
const txtNegara = document.getElementById("negara_pembuat_mesin");

// Other Elements
const warnType = document.getElementById("warn_type");
const warnPabrik = document.getElementById("warn_pabrik");
const warnNegara = document.getElementById("warn_negara");
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

$("#id_type_mesin").on("select2:select", function () {
    let selected_data = this.value.split("~");
    txtNama.value = selected_data[1];
    txtPabrik.value = selected_data[2];
    txtNegara.value = selected_data[3];

    btnProses.disabled = false;
    if (hidProses.value == 2) {
        txtNama.disabled = false;
        txtPabrik.disabled = false;
        txtNegara.disabled = false;

        txtNama.select();
    } else btnProses.focus();
});

btnIsi.addEventListener("click", function () {
    clearForm();
    toggleButtons(3);
    hidProses.value = 1;
    txtNama.select();
    btnProses.disabled = false;
});

btnKoreksi.addEventListener("click", function () {
    clearForm();
    toggleButtons(2);
    hidProses.value = 2;
    $("#id_type_mesin").focus();
});

btnHapus.addEventListener("click", function () {
    clearForm();
    toggleButtons(2);
    hidProses.value = 3;
    $("#id_type_mesin").focus();
});

btnProses.addEventListener("click", function () {
    hidData.value = "";
    switch (hidProses.value) {
        case "2":
            hidData.value =
                slcIdType.value.split("~")[0] +
                "~" +
                txtNama.value +
                "~" +
                txtPabrik.value +
                "~" +
                txtNegara.value;
            break;

        case "3":
            hidData.value = slcIdType.value.split("~")[0];
            break;

        default:
            hidData.value =
                txtNama.value + "~" + txtPabrik.value + "~" + txtNegara.value;
            break;
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        clearForm();
        toggleButtons(1);
        warnType.style.display = "none";
        warnPabrik.style.display = "none";
        warnNegara.style.display = "none";
        txtNama.classList.remove("is-invalid");
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
            slcIdType.disabled = false;
            break;

        case 3:
            btnIsi.disabled = true;
            btnKoreksi.disabled = true;
            btnHapus.disabled = true;
            btnKeluar.textContent = "Batal";
            txtNama.disabled = false;
            txtPabrik.disabled = false;
            txtNegara.disabled = false;
            break;

        default:
            btnIsi.disabled = false;
            btnKoreksi.disabled = false;
            btnHapus.disabled = false;
            btnProses.disabled = true;
            btnKeluar.textContent = "Keluar";
            slcIdType.disabled = true;
            txtNama.disabled = true;
            txtPabrik.disabled = true;
            txtNegara.disabled = true;
            break;
    }
}

function init() {
    addTxtListener(txtNama, txtPabrik);
    addTxtListener(txtPabrik, txtNegara);
    addTxtListener(txtNegara, btnProses);
    prepareButtons(btnIsi, btnKoreksi, btnHapus, btnKeluar);

    btnIsi.focus();

    $("#id_type_mesin").select2({
        placeholder: "-- Pilih Id Type Mesin --",
        templateSelection: function (selectedOption) {
            if (selectedOption.text) {
                return selectedOption.text.split(" | ")[0];
            }
            return selectedOption.text;
        },
    });

    addCharLimit(txtNama, warnType);
    addCharLimit(txtPabrik, warnPabrik);
    addCharLimit(txtNegara, warnNegara);
    addValidation($("#" + txtNama.id), "form_submit");
}

$(function () {
    init();
});

//#endregion
