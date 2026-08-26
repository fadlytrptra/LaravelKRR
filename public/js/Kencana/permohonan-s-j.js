//#region get element by id

// let submit = document.getElementById("submit");
let add_item = document.getElementById("add_item");
let biaya = document.getElementById("biaya");
let customer = document.getElementById("customer");
let div_suratJalan = document.getElementById("div_suratJalan");
let edit_button = document.getElementById("edit_button");
let expeditor = document.getElementById("expeditor");
let hapus_button = document.getElementById("hapus_button");
let isi_button = document.getElementById("isi_button");
let jenis_pengiriman = document.getElementById("jenis_pengiriman");
let keterangan = document.getElementById("keterangan");
let list_view = document.getElementById("list_view");
let nomor_container = document.getElementById("nomor_container");
let nomor_do = document.getElementById("nomor_do");
let nomor_seal = document.getElementById("nomor_seal");
let proses = 0;
let id_kirimSelect = document.getElementById("id_kirimSelect");
let id_kirimText = document.getElementById("id_kirimText");
let list_sjButton = document.getElementById("list_sjButton");
let remove_item = document.getElementById("remove_item");
let surat_jalan = document.getElementById("surat_jalan");
let surat_pesanan = document.getElementById("surat_pesanan");
let tanggal = document.getElementById("tanggal");
let tanggal_actual = document.getElementById("tanggal_actual");
let truk_nopol = document.getElementById("truk_nopol");
let uraian = document.getElementById("uraian");
let form_suratJalan = document.getElementById("form_suratJalan");

//#endregion

//#region input filter

setInputFilter(
    document.getElementById("biaya"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);

//#endregion

//#region load form

isi_button.focus();
tanggal.valueAsDate = new Date();
tanggal.setAttribute("readonly", true);
tanggal_actual.valueAsDate = new Date();
div_suratJalan.classList.toggle("disabled");

//#endregion

//#region Add event listener

customer.addEventListener("change", function () {
    let customer = this.value;
    fetch("/Kencana/options/suratpesanan/" + customer)
        .then((response) => response.json())
        .then((options) => {
            surat_pesanan.innerHTML =
                "<option disabled selected>-- Pilih Surat Pesanan --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.IDSuratPesanan;
                optionTag.text = option.IDSuratPesanan;
                surat_pesanan.appendChild(optionTag);
            });
        });
});
surat_pesanan.addEventListener("change", function () {
    let surat_pesanan = "";

    if (this.value.includes("/")) {
        surat_pesanan = this.value.replace(/\//g, ".");
    } else {
        surat_pesanan = this.value;
    }

    fetch("/Kencana/options/deliveryorder/" + surat_pesanan)
        .then((response) => response.json())
        .then((options) => {

            nomor_do.innerHTML =
                "<option disabled selected>-- Pilih Delivery Order --</option>";

            options.forEach((option) => {

                let optionTag = document.createElement("option");

                // No DO
                optionTag.value = option.IDDO;

                // Uraian
                optionTag.text = option.Uraian;

                // Simpan No Trans di option
                optionTag.dataset.notrans = option.NoTrans ?? "";

                nomor_do.appendChild(optionTag);
            });
        });
});

nomor_do.addEventListener("change", function () {
    // Get the selected option element
    var selectedOption = this.options[this.selectedIndex];

    // Get the text content of the selected option
    var selectedText = selectedOption.textContent;

    // Set the value of the textarea to the selected text
    uraian.value = selectedText;
});

id_kirimSelect.addEventListener("change", function (event) {
    if (this.selectedIndex !== 0) {
        this.classList.add("input-error");
        this.setCustomValidity("Tekan Enter!");
        this.reportValidity();
    }
    // console.log(id_kirimText.value)
});

id_kirimSelect.addEventListener("keypress", function (event) {
    if (event.key !== "Enter") {
        return;
    }

    event.preventDefault();

    if (this.selectedIndex === 0 || !this.value) {
        return;
    }

    // value option = IdHeaderKirim
    const idHeaderKirim = this.value;
    console.log("IdHeaderKirim:", idHeaderKirim);

    id_kirimText.value = idHeaderKirim;
    id_kirimSelect.disabled = true;

    fetch("/Kencana/options/editSJ/" + encodeURIComponent(idHeaderKirim))
        .then((response) => {
            if (!response.ok) {
                throw new Error("Data Surat Jalan tidak ditemukan.");
            }

            return response.json();
        })
        .then((data) => {
            console.log("Data Edit SJ:", data);
            if (data.error) {
                throw new Error(data.error);
            }

            if (!data[0] || !data[0][0]) {
                throw new Error("Data Header Surat Jalan tidak ditemukan.");
            }

            const header = data[0][0];
            const detail = data[1] || [];
            const customers = data[2] || [];

            biaya.value = parseFloat(header.Biaya || 0);
            surat_jalan.value = header.IDPengiriman || "";
            keterangan.value = header.Ket || "";
            truk_nopol.value = header.TrukNopol || "";

            const optionJenisPengiriman = jenis_pengiriman.options;
            for (let i = 0; i < optionJenisPengiriman.length; i++) {
                if (String(optionJenisPengiriman[i].value) === String(header.JnsIdPengiriman)) {
                    optionJenisPengiriman[i].selected = true;
                    break;
                }
            }

            if (header.Tanggal) {
                tanggal.value =
                    String(header.Tanggal).split(" ")[0];
            }

            if (header.TanggalActual) {
                tanggal_actual.value =
                    String(header.TanggalActual).split(" ")[0];
            }

            customer.innerHTML = '<option value="">-- Pilih Customer --</option>';
            customers.forEach((option) => {
                let idCust = option.IdCust || "";
                idCust = idCust
                    .split("-")[0]
                    .trim();

                const optionTag =
                    document.createElement("option");

                optionTag.value = idCust;
                optionTag.textContent =
                    option.NamaCust;

                customer.appendChild(optionTag);
            });

            for (let i = 0; i < customer.options.length; i++) {
                if (String(customer.options[i].value) === String(header.IDCust)) {
                    customer.options[i].selected = true;
                    break;
                }
            }

            const optionExpeditor = expeditor.options;
            for (let i = 0; i < optionExpeditor.length; i++) {
                if (String(optionExpeditor[i].value) === String(header.IDExpeditor)) {
                    optionExpeditor[i].selected = true;
                    break;
                }
            }

            const table = document.getElementById("list_view");
            if (table) {
                while (table.rows.length > 1) {
                    table.deleteRow(1);
                }
            }

            console.log("Detail:", detail);

            detail.forEach((item) => {
                console.log("DATA DETAIL DARI CONTROLLER:", item);
                console.log("IDDO:", item.IDDO);
                console.log("Uraian:", item.Uraian);
                console.log("IDDetailKirim:", item.IDDetailKirim);
                console.log("IDSuratPesanan:", item.IDSuratPesanan);
                const arrayDetail = [
                    item.IDDO || item.IdDO || "",
                    item.Uraian || "",
                    item.IDDetailKirim || "",
                    item.IDSuratPesanan || ""
                ];

                console.log("Detail Row:", arrayDetail);
                funcInsertRow(arrayDetail);
            });
            list_sjButton.disabled = true;
        })
        .catch((error) => {
            console.error("Error get detail SJ:", error);
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: error.message ||
                    "Data Surat Jalan gagal dimuat.",
                confirmButtonText: "OK"
            });
            id_kirimSelect.disabled = false;
        });
});

id_kirimText.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        // console.log("masuk enter");
        let id_pengiriman = id_kirimSelect.options[
            id_kirimSelect.selectedIndex
        ].textContent
            .split("-")[0]
            .trim();
        event.preventDefault();
        fetch("/Kencana/options/editSJ/" + id_pengiriman)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                biaya.value = parseFloat(data[0][0].Biaya);
                const optionjenis_pengiriman = jenis_pengiriman.options;

                for (let i = 0; i < optionjenis_pengiriman.length; i++) {
                    const option = optionjenis_pengiriman[i];
                    if (option.value === data[0][0].JnsIdPengiriman) {
                        option.selected = true;
                        break;
                    }
                }

                surat_jalan.value = data[0][0].IDPengiriman;
                tanggal.value = data[0][0].Tanggal.split(" ")[0];
                keterangan.value = data[0][0].Ket;
                customer.innerHTML = "<option> -- Pilih Customer -- </option>";
                data[2].forEach((option) => {
                    let optionTagValue = option.IdCust.split("-");
                    // console.log(optionTagValue);
                    let optionTag = document.createElement("option");
                    optionTag.value = optionTagValue[0].trim();
                    optionTag.text = option.NamaCust;
                    customer.appendChild(optionTag);
                });

                let optionTag = document.createElement("option");
                optionTag.value = data[0][0].IDCust;
                optionTag.text = id_kirimSelect.options[
                    id_kirimSelect.selectedIndex
                ].textContent
                    .split("-")[1]
                    .trim();
                customer.appendChild(optionTag);
                const optioncustomer = customer.options;

                for (let i = 0; i < optioncustomer.length; i++) {
                    const option = optioncustomer[i];
                    if (option.value === data[0][0].IDCust) {
                        option.selected = true;
                        break;
                    }
                }

                const optionexpeditor = expeditor.options;

                for (let i = 0; i < optionexpeditor.length; i++) {
                    const option = optionexpeditor[i];
                    if (option.value === data[0][0].IDExpeditor) {
                        option.selected = true;
                        break;
                    }
                }

                truk_nopol.value = data[0][0].TrukNopol;
                let arrayDetail = [];

                for (let i = 0; i < data[1].length; i++) {
                    arrayDetail.push(data[1][i].IDDO);
                    arrayDetail.push(data[1][i].Uraian);
                    arrayDetail.push(data[1][i].IDDetailKirim);
                    arrayDetail.push(data[1][i].IDSuratPesanan);
                }
                console.log(arrayDetail);
                funcInsertRow(arrayDetail);
            });
        list_sjButton.disabled = true;
    }
});

truk_nopol.addEventListener("change", function () {
    truk_nopol.value = this.value.toUpperCase();
});
//#endregion

surat_pesanan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // nomor_do.focus();
    }
});

nomor_do.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // add_item.focus();
    }
});

jenis_pengiriman.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // surat_jalan.focus();
    }
});

tanggal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // customer.focus();
    }
});

tanggal_actual.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // customer.focus();
    }
});

customer.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // keterangan.focus();
    }
});

expeditor.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // surat_pesanan.focus();
    }
});

surat_jalan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // tanggal.focus();
    }
});

tanggal_actual.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // expeditor.focus();
    }
});

// keterangan.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         // truk_nopol.focus();
//     }
// });

truk_nopol.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // biaya.focus();
    }
});

biaya.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // tanggal_actual.focus();
    }
});

// nomor_container.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         nomor_seal.focus();
//     }
// });

// nomor_seal.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         surat_pesanan.focus();
//     }
// });

//#region Table-table

add_item.addEventListener("click", function () {

    if (
        uraian.value === "" ||
        nomor_do.selectedIndex === 0 ||
        surat_pesanan.selectedIndex === 0
    ) {
        alert("Isi Surat Pesanan dan DO dulu!");
        return;
    }

    const selectedDO = nomor_do.options[nomor_do.selectedIndex];
    const selectedSP = surat_pesanan.options[surat_pesanan.selectedIndex];

    const arraydata = [
        selectedDO.value,
        uraian.value,
        selectedDO.dataset.notrans || "",
        selectedSP.value
    ];

    funcInsertRow(arraydata);

    funcClearDataInput();

    const confirmation = confirm("Apakah mau menambah DO lagi?");

    if (confirmation === true) {
        surat_pesanan.focus();
    } else {
        isi_button.focus();
    }
});

function funcInsertRow(array) {
    const table = document.getElementById("list_view");
    const dataToCheck = array[1];
    let isDataInTable = false;

    if (table.rows.length > 0) {
        const cellValue = table.querySelectorAll("input");

        for (let i = 1; i < cellValue.length; i++) {
            if (cellValue[i].value === dataToCheck) {
                isDataInTable = true;
            }
        }
    }
    if (isDataInTable) {
        alert("Data sudah ada di table");
    } else {
        const newRow = table.insertRow(-1);
        newRow.setAttribute("class", "acs-tr-hover");

        for (let i = 0; i < array.length; i++) {
            const cell = newRow.insertCell(i);
            cell.innerHTML = array[i];
            cell.setAttribute("class", "acs-tr-hover");
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("readonly", "true");
            input.setAttribute("value", array[i]);
            input.setAttribute("class", "acs-input-table");
            input.setAttribute("name", "barang" + i + "[]");
            input.style.backgroundColor = table.style.backgroundColor;
            cell.innerHTML = "";
            cell.appendChild(input);
        }
        newRow.addEventListener("click", () => {
            // remove highlight from previously selected row
            const highlightedRow = table.querySelector("tr.highlighted");
            const inputs = newRow.querySelectorAll("input");
            if (highlightedRow) {
                highlightedRow.classList.remove("highlighted");
            }
            // highlight current row
            newRow.classList.add("highlighted");
            // add the "highlighted" class to all input elements in the row
        });
    }
}

function funcClearDataInput() {
    // surat_pesanan.selectedIndex = 0;
    nomor_do.selectedIndex = 0;
    uraian.value = "";
}


document.addEventListener("DOMContentLoaded", function () {
    const oldBarang0 = window.oldBarang0 || [];
    const oldBarang1 = window.oldBarang1 || [];
    const oldBarang2 = window.oldBarang2 || [];
    const oldBarang3 = window.oldBarang3 || [];

    if (oldBarang0.length === 0) {
        return;
    }

    const table = document.getElementById("list_view");

    if (!table) {
        return;
    }

    // Bersihkan detail
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Restore detail
    for (let i = 0; i < oldBarang0.length; i++) {

        const arrayData = [
            oldBarang0[i] || "",
            oldBarang1[i] || "",
            oldBarang2[i] || "",
            oldBarang3[i] || ""
        ];

        funcInsertRow(arrayData);
    }

    console.log("Detail berhasil direstore setelah validation error.");

});


remove_item.addEventListener("click", function (event) {
    event.preventDefault();
    const table = document.getElementById("list_view");
    const highlightedRow = table.querySelector("tr.highlighted");
    if (highlightedRow) {
        table.deleteRow(highlightedRow.rowIndex);
        alert("Data sudah terhapus!");
    } else {
        alert("Tidak ada data yang dihapus");
    }
});

//#region Validasi Form

function validasiFormSuratJalan() {

    // Jenis Pengiriman
    if (!jenis_pengiriman.value) {
        Swal.fire({
            icon: "warning",
            title: "Data Belum Lengkap",
            text: "Jenis Pengiriman belum dipilih.",
            confirmButtonText: "OK"
        });
        jenis_pengiriman.focus();
        return false;
    }

    // Nomor Surat Jalan
    if (!surat_jalan.value.trim()) {
        Swal.fire({
            icon: "warning",
            title: "Data Belum Lengkap",
            text: "Nomor Surat Jalan belum diisi.",
            confirmButtonText: "OK"
        });
        surat_jalan.focus();
        return false;
    }

    // Expeditor
    if (!expeditor.value) {
        Swal.fire({
            icon: "warning",
            title: "Data Belum Lengkap",
            text: "Expeditor belum dipilih.",
            confirmButtonText: "OK"
        });
        expeditor.focus();
        return false;
    }

    // Customer
    if (!customer.value) {
        Swal.fire({
            icon: "warning",
            title: "Data Belum Lengkap",
            text: "Customer belum dipilih.",
            confirmButtonText: "OK"
        });
        customer.focus();
        return false;
    }

    // Tanggal
    if (!tanggal.value) {
        Swal.fire({
            icon: "warning",
            title: "Data Belum Lengkap",
            text: "Tanggal belum diisi.",
            confirmButtonText: "OK"
        });
        tanggal.focus();
        return false;
    }

    // Tanggal Actual
    if (!tanggal_actual.value) {
        Swal.fire({
            icon: "warning",
            title: "Data Belum Lengkap",
            text: "Tanggal Actual belum diisi.",
            confirmButtonText: "OK"
        });
        tanggal_actual.focus();
        return false;
    }

    // Detail DO
    const table = document.getElementById("list_view");

    if (!table || table.rows.length <= 1) {
        Swal.fire({
            icon: "warning",
            title: "Data Belum Lengkap",
            text: "Minimal harus ada 1 data DO.",
            confirmButtonText: "OK"
        });
        surat_pesanan.focus();
        return false;
    }

    // Pastikan setiap detail memiliki data lengkap
    const rows = table.querySelectorAll("tbody tr");

    for (let i = 0; i < rows.length; i++) {

        const inputs = rows[i].querySelectorAll("input");

        if (inputs.length < 4) {
            Swal.fire({
                icon: "warning",
                title: "Data Belum Lengkap",
                text: "Data detail DO belum lengkap.",
                confirmButtonText: "OK"
            });
            return false;
        }

        const idDO = inputs[0].value.trim();
        const uraianDetail = inputs[1].value.trim();
        const noTrans = inputs[2].value.trim();
        const idSP = inputs[3].value.trim();

        if (!idDO) {
            Swal.fire({
                icon: "warning",
                title: "Data Belum Lengkap",
                text: "No. DO belum diisi pada detail.",
                confirmButtonText: "OK"
            });
            return false;
        }

        if (!uraianDetail) {
            Swal.fire({
                icon: "warning",
                title: "Data Belum Lengkap",
                text: "Uraian belum diisi pada detail.",
                confirmButtonText: "OK"
            });
            return false;
        }

        if (!idSP) {
            Swal.fire({
                icon: "warning",
                title: "Data Belum Lengkap",
                text: "Surat Pesanan belum dipilih pada detail.",
                confirmButtonText: "OK"
            });
            return false;
        }
    }

    return true;
}

//#endregion

//#region Button-button

isi_button.addEventListener("click", function (event) {

    event.preventDefault();

    // ==========================================
    // AWAL -> MASUK MODE ISI
    // ==========================================
    if (proses == 0) {

        proses = 1;

        this.innerHTML = "Proses";
        edit_button.innerHTML = "Batal";
        hapus_button.style.display = "none";

        div_suratJalan.classList.toggle("disabled");

        jenis_pengiriman.focus();

        return;
    }

    // ==========================================
    // MODE ISI -> PROSES / SUBMIT
    // ==========================================
    if (proses == 1) {

        // BARU DI SINI VALIDASI DILAKUKAN
        if (!validasiFormSuratJalan()) {
            return;
        }

        form_suratJalan.submit();

        proses = 0;

        this.innerHTML = "Isi";
        edit_button.innerHTML = "Koreksi";
        hapus_button.style.display = "block";

        return;
    }

    // ==========================================
    // MODE KOREKSI
    // ==========================================
    if (proses == 2) {

        if (!validasiFormSuratJalan()) {
            return;
        }

        proses = 0;

        this.innerHTML = "Isi";
        edit_button.innerHTML = "Koreksi";
        hapus_button.style.display = "block";

        form_suratJalan.action =
            "/Kencana/SuratJalan/" + id_kirimText.value;

        let methodInput =
            form_suratJalan.querySelector('input[name="_method"]');

        if (!methodInput) {
            methodInput = document.createElement("input");
            methodInput.type = "hidden";
            methodInput.name = "_method";
            form_suratJalan.appendChild(methodInput);
        }

        methodInput.value = "PUT";

        form_suratJalan.submit();

        return;
    }

    // ==========================================
    // MODE HAPUS
    // ==========================================
    if (proses == 3) {

        proses = 0;

        this.innerHTML = "Isi";
        edit_button.innerHTML = "Koreksi";
        hapus_button.style.display = "block";

        form_suratJalan.action =
            "/Kencana/SuratJalan/" + id_kirimText.value;

        form_suratJalan.submit();

        div_suratJalan.classList.toggle("disabled");

        return;
    }
});

edit_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        proses = 2;
        isi_button.innerHTML = "Proses";
        this.innerHTML = "Batal";
        hapus_button.style.display = "none";
        list_sjButton.disabled = false;
        list_sjButton.focus();
    } else {
        proses = 0;
        isi_button.innerHTML = "Isi";
        this.innerHTML = "Koreksi";
        hapus_button.style.display = "block";
        id_kirimSelect.style.display = "none";
        id_kirimText.style.display = "block";
        list_sjButton.disabled = true;
    }
    div_suratJalan.classList.toggle("disabled");
});

hapus_button.addEventListener("click", function (event) {
    event.preventDefault();
    proses = 3;
    isi_button.innerHTML = "Proses";
    edit_button.innerHTML = "Batal";
    this.style.display = "none";
    list_sjButton.disabled = false;
    div_suratJalan.classList.toggle("disabled");
});

list_sjButton.addEventListener("click", function (event) {
    event.preventDefault();
    id_kirimSelect.style.display = "block";
    id_kirimText.style.display = "none";

    fetch("/Kencana/options/nomorSJ/")
        .then((response) => response.json())
        .then((options) => {
            // console.log(options);
            id_kirimSelect.innerHTML =
                "<option disabled selected value>-- Pilih Nomor Surat Jalan --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.IdHeaderKirim;
                optionTag.text = option.IDPengiriman + " - " + option.NamaCust;
                id_kirimSelect.appendChild(optionTag);
            });
        });
    id_kirimSelect.focus();
});

//#endregion
