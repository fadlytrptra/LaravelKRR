//#region Variables

// Select Elements
const slcIdMesin = document.getElementById("id_mesin");
const slcIdType = document.getElementById("id_type_mesin");
const slcKelompok = document.getElementById("kelompok_mesin");
const slcRawat = document.getElementById("kelompok_perawatan");
const slcLokasi = document.getElementById("kelompok_lokasi");
const slcIdPlc = document.getElementById("id_plc");

// Input Elements
const txtNama = document.getElementById("nama_mesin");
const txtNoSeri = document.getElementById("nomor_seri");
const txtGroupPL = document.getElementById("group_pl");
const numShuttle = document.getElementById("jumlah_shuttle");
const numRpm = document.getElementById("rpm");
const numPremi = document.getElementById("premi");
const numEfisiensi = document.getElementById("min_efisiensi");
const numMesin = document.getElementById("min_mesin");

// Other Elements
const hidProses = document.getElementById("mode_proses");
const hidData = document.getElementById("form_data");
const rdoAktif = document.getElementById("rdo_aktif");
const rdoNonaktif = document.getElementById("rdo_nonaktif");
const checkActive = document.getElementById("check_active");

// Feedback Elements
const warnNama = document.getElementById("warn_nama");
const warnSeri = document.getElementById("warn_seri");
const warnTanggal = document.getElementById("warn_tanggal");
const warnShuttle = document.getElementById("warn_shuttle");
const warnRpm = document.getElementById("warn_rpm");
const warnPremi = document.getElementById("warn_premi");
const warnMesin = document.getElementById("warn_mesin");
const warnEfisiensi = document.getElementById("warn_efisiensi");

// Input Date Elements
const dtBuat = document.getElementById("tgl_buat");
const dtOperasi = document.getElementById("tgl_operasi");

// Button Elements
const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

//#endregion

//#region Listeners

$("#id_mesin").on("select2:select", function () {
    fetchSelect("/sp-mesinD/Sp_List_Mesin~2/" + this.value, (data) => {
        let d = data[0];

        txtNoSeri.value = d.Serial_number;
        dtBuat.value = dateTimeToDate(d.Date_manufacture);
        dtOperasi.value = dateTimeToDate(d.Date_operation);
        numShuttle.value = d.Number_of_shutle;
        numRpm.value = d.Rpm;
        numEfisiensi.value = d.Min_Eff;
        numMesin.value = d.Min_mesin;
        numPremi.value = parseFloat(d.Premi).toFixed(2);
        txtNama.value = d.Nama_mesin;

        addOptionToSelect("id_type_mesin", d.IdType_mesin, d.Type_Mesin);
        addOptionToSelect("kelompok_mesin", d.Id_Group, d.Keterangan);
        addOptionToSelect("kelompok_perawatan", d.Id_Group_Perawatan, d.SDP_Kwh_Meter);
        addOptionToSelect(
            "kelompok_lokasi",
            d.Id_Lokasi,
            d.Lokasi
        );

        if (d.Active == "Y") {
            rdoAktif.checked = true;
        } else rdoNonaktif.checked = true;

        btnProses.disabled = false;
        if (hidProses.value == 2) {
            toggleAllInputs(true);
            slcIdType.focus();
        } else btnProses.focus();
    });
});

$("#id_mesin").on("select2:open", function () {
    this.selectedIndex = 0;
});

$("#id_type_mesin").on("select2:select", function () {
    txtNama.disabled = false;
    txtNama.focus();
    rdoAktif.disabled = false;
    rdoNonaktif.disabled = false;
});

$("#id_type_mesin").on("select2:open", function () {
    this.selectedIndex = 0;
});

$("#kelompok_mesin").on("select2:select", function () {
    slcRawat.disabled = false;
    slcRawat.focus();
});

$("#kelompok_mesin").on("select2:open", function () {
    this.selectedIndex = 0;
});

$("#kelompok_perawatan").on("select2:select", function () {
    slcLokasi.disabled = false;
    slcLokasi.focus();
});

$("#kelompok_perawatan").on("select2:open", function () {
    this.selectedIndex = 0;
});

$("#kelompok_lokasi").on("select2:select", function () {
    numShuttle.disabled = false;
    numShuttle.select();
});

$("#kelompok_lokasi").on("select2:open", function () {
    this.selectedIndex = 0;
});

$("#id_plc").on("select2:select", function () {
    btnProses.focus();
});

$("#id_plc").on("select2:open", function () {
    this.selectedIndex = 0;
});

dtBuat.addEventListener("input", function () {
    if (this.value > dtOperasi.value) {
        warnTanggal.style.display = "block";
    } else {
        warnTanggal.style.display = "none";
    }
});

dtOperasi.addEventListener("input", function () {
    if (this.value < dtBuat.value) {
        warnTanggal.style.display = "block";
    } else {
        warnTanggal.style.display = "none";
    }
});

btnIsi.addEventListener("click", function () {
    clearForm();
    toggleButtons(2);
    btnProses.disabled = false;
    hidProses.value = 1;

    dtBuat.value = getCurrentDate();
    dtOperasi.value = getCurrentDate();

    rdoAktif.checked = true;
    rdoNonaktif.checked = false;

    $("input, select").prop("disabled", false);
    slcIdMesin.disabled = true;

    slcIdType.focus();
});

btnKoreksi.addEventListener("click", function () {
    clearForm();
    toggleButtons(2);
    hidProses.value = 2;
    slcIdMesin.disabled = false;
    slcIdMesin.focus();
});

btnHapus.addEventListener("click", function () {
    clearForm();
    toggleButtons(2);
    hidProses.value = 3;
    slcIdMesin.disabled = false;
    slcIdMesin.focus();
});

btnProses.addEventListener("click", function () {
    // Jika input angka ada yang belum diisi otomatis terisi "0"
    $("input[type='number']").each(function () {
        if ($(this).val() === "") $(this).val("0");
    });

    hidData.value = "";

    let aktif = "";
    if (rdoAktif.checked) {
        aktif = "Y";
    } else aktif = "N";

    switch (hidProses.value) {
        case "2":
            hidData.value = slcIdMesin.value + "~";
            break;

        case "3":
            hidData.value = slcIdMesin.value;
            break;

        default:
            break;
    }

    if (hidProses.value != "3") {
        hidData.value +=
            slcIdType.value +
            "~" +
            txtNama.value.trim() +
            "~" +
            txtNoSeri.value.trim() +
            "~" +
            dtBuat.value +
            "~" +
            dtOperasi.value +
            "~" +
            slcKelompok.value +
            "~" +
            aktif +
            "~" +
            numShuttle.value +
            "~" +
            numRpm.value +
            "~" +
            numEfisiensi.value +
            "~" +
            numMesin.value +
            "~" +
            numPremi.value +
            "~" +
            slcRawat.value +
            "~" +
            slcLokasi.value;

        if (checkActive.checked) {
            hidData.value += "~Y~" + txtGroupPL.value + "~" + slcIdPlc.value;
        } else hidData.value += "~N";
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        clearForm();
        toggleAllInputs(false);
        toggleButtons(1);

        txtNama.classList.remove("is-invalid");
        $('[aria-labelledby="select2-id_type_mesin-container"]').removeClass(
            "is-invalid"
        );
        $('[aria-labelledby="select2-kelompok_mesin-container"]').removeClass(
            "is-invalid"
        );
        $(
            '[aria-labelledby="select2-kelompok_perawatan-container"]'
        ).removeClass("is-invalid");
        $('[aria-labelledby="select2-kelompok_lokasi-container"]').removeClass(
            "is-invalid"
        );
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
            break;

        default:
            btnIsi.disabled = false;
            btnKoreksi.disabled = false;
            btnHapus.disabled = false;
            btnProses.disabled = true;
            btnKeluar.textContent = "Keluar";
            break;
    }
}

function toggleAllInputs(enable) {
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((element) => {
        element.disabled = !enable;
    });
}

function init() {
    $("#id_mesin").select2({
        templateSelection: function (selectedOption) {
            if (selectedOption.text) {
                return selectedOption.text.split(" | ")[0];
            }
            return selectedOption.text;
        },
    });

    $("#id_type_mesin").select2();
    $("#kelompok_mesin").select2();
    $("#kelompok_perawatan").select2();
    $("#kelompok_lokasi").select2();

    addTxtListener(txtGroupPL, slcIdPlc);
    addTxtListener(numShuttle, numRpm);
    addTxtListener(numRpm, numPremi);
    addTxtListener(numPremi, numEfisiensi, {
        extraAction: () => {
            if (numPremi.value === "") {
                numPremi.value = (0).toFixed(2);
            } else numPremi.value = parseFloat(numPremi.value).toFixed(2);
        },
    });
    addTxtListener(numEfisiensi, numMesin);
    addTxtListener(numMesin, btnProses);
    addTxtListener(txtNama, txtNoSeri);
    addTxtListener(txtNoSeri, dtBuat);
    addTxtListener(dtBuat, dtOperasi);
    addTxtListener(dtOperasi, slcKelompok, {
        extraAction: () => {
            if (dtOperasi.value < dtBuat.value) {
                return;
            } else {
                slcKelompok.disabled = false;
                slcKelompok.focus();
            }
        },
        stopAction: true,
    });

    prepareButtons(btnIsi, btnKoreksi, btnHapus, btnKeluar);

    addCharLimit(txtNama, warnNama);
    addCharLimit(txtNoSeri, warnSeri);

    addNumLimit(numShuttle, warnShuttle);
    addNumLimit(numRpm, warnRpm);
    addNumLimit(numPremi, warnPremi);
    addNumLimit(numMesin, warnEfisiensi);
    addNumLimit(numEfisiensi, warnEfisiensi);

    addValidation(
        $(
            "#" +
                slcIdType.id +
                ", #" +
                txtNama.id +
                ", #" +
                slcKelompok.id +
                ", #" +
                slcRawat.id +
                ", #" +
                slcLokasi.id
        ),
        "form_submit"
    );

    btnIsi.focus();
}

$(document).ready(function () {
    init();
});

//#endregion
