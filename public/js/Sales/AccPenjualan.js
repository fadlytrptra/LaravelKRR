let closeModalButton = document.getElementById("closeModalButton");
let divisi = document.getElementById("divisi");
let form_accJualBarcode = document.getElementById("form_accJualBarcode");
let hapusButton = document.getElementById("hapusButton");
let id_transaksi = document.getElementById("id_transaksi");
let id_type = document.getElementById("id_type");
let jumlah_konversi = document.getElementById("jumlah_konversi");
let jumlahDicentang = 0;
let kelompok = document.getElementById("kelompok");
let kelompok_utama = document.getElementById("kelompok_utama");
let max_do = document.getElementById("max_do");
let max_doSatuan = document.getElementById("max_doSatuan");
let min_do = document.getElementById("min_do");
let min_doSatuan = document.getElementById("min_doSatuan");
let modalContent = document.getElementById("modalContent");
let modalOverlay = document.getElementById("modalOverlay");
let nama_barang = document.getElementById("nama_barang");
let nama_customer = document.getElementById("nama_customer");
let no_sp = document.getElementById("no_sp");
let objek = document.getElementById("objek");
let pilihButton = document.getElementById("pilihButton");
let pilihSemuaButton = document.getElementById("pilihSemuaButton");
let prosesButton = document.getElementById("prosesButton");
let saldo_primer = document.getElementById("saldo_primer");
let saldo_primerDikeluarkan = document.getElementById("saldo_primerDikeluarkan"); //prettier-ignore
let saldo_primerDikeluarkanSatuan = document.getElementById("saldo_primerDikeluarkanSatuan"); //prettier-ignore
let saldo_primerSatuan = document.getElementById("saldo_primerSatuan");
let saldo_sekunder = document.getElementById("saldo_sekunder");
let saldo_sekunderDikeluarkan = document.getElementById("saldo_sekunderDikeluarkan"); //prettier-ignore
let saldo_sekunderDikeluarkanSatuan = document.getElementById("saldo_sekunderDikeluarkanSatuan"); //prettier-ignore
let saldo_sekunderSatuan = document.getElementById("saldo_sekunderSatuan");
let saldo_tritier = document.getElementById("saldo_tritier");
let saldo_tritierDikeluarkan = document.getElementById("saldo_tritierDikeluarkan"); //prettier-ignore
let saldo_tritierDikeluarkanSatuan = document.getElementById("saldo_tritierDikeluarkanSatuan"); //prettier-ignore
let saldo_tritierSatuan = document.getElementById("saldo_tritierSatuan");
let sub_kelompok = document.getElementById("sub_kelompok");
let tgl_mohonDO = document.getElementById("tgl_mohonDO");
//#region Set Input Filter

//#endregion

//#region Table
$("#table_AccPenjualan").DataTable({
    data: data,
    columns: [
        { data: "IdTransaksi" },
        { data: "IdType" },
        { data: "NamaType" },
        {
            data: "Primer",
            render: function (data) {
                return parseFloat(data).toFixed(2);
            },
        },
        {
            data: "Sekunder",
            render: function (data) {
                return parseFloat(data).toFixed(2);
            },
        },
        {
            data: "Tritier",
            render: function (data) {
                return parseFloat(data).toFixed(2);
            },
        },
        { data: "KodeBarang" },
    ],
    lengthMenu: [25, 50, 100, 200, 300, 400, 500],
    pageLength: 25,
});
$("#table_AccPenjualan tbody").on("click", "tr", function () {
    $("#loading-screen").css("display", "flex");
    const table = $("#table_AccPenjualan").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");
    const selectedRowData = table.rows(".selected").data().toArray()[0];
    const IdTransaksi = selectedRowData.IdTransaksi;
    const IdType = selectedRowData.IdType;
    const KodeBarang = selectedRowData.KodeBarang;

    fetch("/accPenjualanTampilData/" + IdTransaksi)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            divisi.value = data[0].NamaDivisi;
            objek.value = data[0].NamaObjek;
            kelompok_utama.value = data[0].NamaKelompokUtama;
            kelompok.value = data[0].NamaKelompok;
            sub_kelompok.value =
                data[0].IdSubKelompok + " - " + data[0].NamaSubKelompok;
            saldo_primer.value = data[0].SaldoPrimer;
            saldo_primerSatuan.value = data[0].SatuanPrimer;
            saldo_sekunder.value = data[0].SaldoSekunder;
            saldo_sekunderSatuan.value = data[0].SatuanSekunder;
            saldo_tritier.value = data[0].SaldoTritier;
            saldo_tritierSatuan.value = data[0].SatuanTritier;
            id_transaksi.value = data[0].IdTransaksi;
            id_type.value = data[0].IdType;
            nama_barang.value = data[0].NamaType;
            nama_customer.value = data[0].NamaCust;
            no_sp.value = data[0].IDSuratPesanan;

            //convert value date yyyy-MM-dd hh:mm:SS.sss into yyyy-MM-dd
            let originalDate = data[0].TglDO;
            let parts = originalDate.split(" ")[0].split("-");
            let formattedDate = parts[0] + "-" + parts[1] + "-" + parts[2];
            tgl_mohonDO.value = formattedDate;

            max_do.value = data[0].MaxKirimDO;
            max_doSatuan.value = data[0].SatuanJual;
            min_do.value = data[0].MinKirimDO;
            min_doSatuan.value = data[0].SatuanJual;
            saldo_primerDikeluarkan.value = 0;
            saldo_primerDikeluarkanSatuan.value = data[0].SatuanPrimer;
            saldo_sekunderDikeluarkan.value = 0;
            saldo_sekunderDikeluarkanSatuan.value = data[0].SatuanSekunder;
            saldo_tritierDikeluarkan.value = 0;
            saldo_tritierDikeluarkanSatuan.value = data[0].SatuanTritier;
            jumlah_konversi.value = 0;

            fetch("/accPenjualanTampilBarcode/" + IdType + "/" + KodeBarang)
                .then((response) => response.json())
                .then((data_barcode) => {
                    console.log(data_barcode);
                    if (data_barcode.length === 0) {
                        alert("This barcode is empty.");
                    } else {
                        modalOverlay.style.display = "flex";
                        let data = [];
                        for (let i = 0; i < data_barcode.length; i++) {
                            let rowData = {
                                checkbox: '<input type="checkbox">' + (i + 1),
                                expr3: data_barcode[i].Expr3,
                                expr2: data_barcode[i].Expr2,
                                Qty_Primer: parseFloat(
                                    data_barcode[i].Qty_Primer
                                ),
                                Qty_sekunder: parseFloat(
                                    data_barcode[i].Qty_sekunder
                                ),
                                Qty: parseFloat(data_barcode[i].Qty),
                                Tgl_mutasi: data_barcode[i].Tgl_mutasi,
                            };
                            data.push(rowData);
                        }
                        console.log(data);
                        const dataTable = $(
                            "#table_AccBarcodePenjualan"
                        ).DataTable(); // Store the DataTable instance

                        // Clear and destroy the existing DataTable
                        dataTable.clear().destroy();

                        // Populate DataTables with the formatted data
                        let table = $("#table_AccBarcodePenjualan").DataTable({
                            data: data,
                            columns: [
                                { data: "checkbox" },
                                { data: "expr3" },
                                { data: "expr2" },
                                { data: "Qty_Primer" },
                                { data: "Qty_sekunder" },
                                { data: "Qty" },
                                {
                                    data: "Tgl_mutasi",
                                    render: function (data) {
                                        // Get the first 10 characters from the Tgl_mutasi column
                                        return data.substring(0, 10);
                                    },
                                },
                            ],
                            paging: false,
                            columnDefs: [
                                { targets: [0, 6], className: "nowrap" }, // Apply the "nowrap" class to the 7th (index 6) column (Tgl_mutasi)
                            ],
                        });
                        // dataTable.rows.add(data);
                        console.log(table.data());
                        // Redraw the DataTable
                        table.draw();

                        $("#table_AccBarcodePenjualan tbody").off(
                            "click",
                            "tr"
                        );
                        let tritier = 0;
                        let sekunder = 0;
                        let primer = 0;
                        $("#table_AccBarcodePenjualan tbody").on(
                            "click",
                            "tr",
                            function () {
                                let checkbox = $(this)
                                    .find("td:eq(0)")
                                    .find('input[type="checkbox"]');
                                let isChecked = checkbox.prop("checked");
                                // Toggle the checkbox state
                                checkbox.prop("checked", !isChecked);

                                let row = table.row(this);
                                row.data().checkbox = checkbox.prop("checked")
                                    ? '<input type="checkbox" checked>'
                                    : '<input type="checkbox">'; // Update the checkbox HTML in the data object

                                // Get the value of column 3
                                let primerData = parseFloat(
                                    table.cell(this, 3).data()
                                );
                                let sekunderData = parseFloat(
                                    table.cell(this, 4).data()
                                );
                                let tritierData = parseFloat(
                                    table.cell(this, 5).data()
                                );

                                console.log(tritierData);
                                if (isChecked) {
                                    primer -= primerData;
                                    sekunder -= sekunderData;
                                    tritier += tritierData;
                                    // Subtract when unchecked
                                } else {
                                    primer += primerData;
                                    sekunder += sekunderData;
                                    tritier += tritierData;
                                    // Add when checked
                                }
                                console.log(tritier);
                                saldo_primerDikeluarkan.value =
                                    primer.toFixed(2);
                                saldo_sekunderDikeluarkan.value =
                                    sekunder.toFixed(2);
                                saldo_tritierDikeluarkan.value =
                                    tritier.toFixed(2);

                                if (
                                    saldo_sekunderSatuan.value == "MTR" &&
                                    max_doSatuan.value == "YARD"
                                ) {
                                    jumlah_konversi.value =
                                        (tritier / 915) * 1000;
                                    jumlah_konversi.readOnly = true;
                                }

                                // Log the value of column 3
                                // console.log(column3Value);
                            }
                        );
                    }
                });
        })
        .finally(() => {
            $("#loading-screen").css("display", "none");
        });
});

//#endregion

//#region Load Form

tgl_mohonDO.valueAsDate = new Date();

//#endregion

//#region Add event listener

closeModalButton.addEventListener("click", function () {
    closeModal();
});
modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
        closeModal();
    }
});
pilihButton.addEventListener("click", function () {
    closeModal();
});
pilihSemuaButton.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(
        "#table_AccBarcodePenjualan tbody input[type='checkbox']"
    );
    // console.log(checkboxes);
    const dataTable = $("#table_AccBarcodePenjualan").DataTable();
    const primerData = dataTable.column(3).data().toArray();
    const sekunderData = dataTable.column(4).data().toArray();
    const tritierData = dataTable.column(5).data().toArray();
    const primerSum = primerData
        .reduce((acc, value) => acc + parseFloat(value), 0)
        .toFixed(2);
    const sekunderSum = sekunderData
        .reduce((acc, value) => acc + parseFloat(value), 0)
        .toFixed(2);
    const tritierSum = tritierData
        .reduce((acc, value) => acc + parseFloat(value), 0)
        .toFixed(2);
    console.log(primerSum, sekunderSum, tritierSum, dataTable.rows().count());
    console.log(dataTable);

    // Get a reference to the first column (index 0)
    let firstColumn = dataTable.data().column(0).data();
    console.log(firstColumn);

    // Loop through each cell in the first column
    firstColumn.each(function (data, index) {
        // Modify the content of each cell
        console.log(index);
        let modifiedData = '<input type="checkbox" checked>' + (index + 1);

        // Update the cell data
        dataTable.cell(index, 0).data(modifiedData);
        console.log(dataTable.cell(index, 0).data());
    });

    // Redraw the DataTable to reflect the changes
    dataTable.draw();

    saldo_primerDikeluarkan.value = primerSum;
    saldo_sekunderDikeluarkan.value = sekunderSum;
    saldo_tritierDikeluarkan.value = tritierSum;

    if (saldo_sekunderSatuan.value == "MTR" && max_doSatuan.value == "YARD") {
        jumlah_konversi.value = (tritier / 915) * 1000;
        jumlah_konversi.readOnly = true;
    }
    closeModal();
    prosesButton.focus();
    // console.log(checkboxes);
});

hapusButton.addEventListener("click", function () {
    const selectedCheckboxes = $(
        "#table_AccBarcodePenjualan tbody input[type='checkbox']:checked"
    );
    if (selectedCheckboxes.length > 0) {
        submitForm();
    } else {
        alert("Belum ada barcode yang dipilih");
    }
});

prosesButton.addEventListener("click", function (event) {
    event.preventDefault();
    let table = $("#table_AccBarcodePenjualan").DataTable();

    let selectedRowData = [];

    table.rows().every(function () {
        var rowData = this.data();
        let checkbox = $(rowData.checkbox);

        console.log(rowData);
        if (checkbox.is(":checked")) {
            selectedRowData.push(rowData);
        }
    });
    console.log(selectedRowData);
    console.log(selectedRowData.length);
    let kodebarang = selectedRowData[0].expr2;
    let noindeks = [];
    for (let i = 0; i < selectedRowData.length; i++) {
        noindeks.push(selectedRowData[i].expr3);
    }
    if (selectedRowData.length < 0) {
        alert("Tolong pilih barcode dulu!");
        return; // Exit the function if a checked checkbox is not found
    }
    if (
        saldo_primerDikeluarkanSatuan.value.trim() == max_doSatuan.value.trim()
    ) {
        if (
            parseFloat(saldo_primerDikeluarkan.value) <
                parseFloat(min_do.value) ||
            parseFloat(saldo_primerDikeluarkan.value) > parseFloat(max_do.value)
        ) {
            alert(
                "Jumlah Primer Yang Dikeluarkan Kurang dari MinDo atau Melebihi MaxDO !"
            );
            return;
        }
    } else if (
        saldo_sekunderDikeluarkanSatuan.value.trim() ==
        max_doSatuan.value.trim()
    ) {
        if (
            parseFloat(saldo_sekunderDikeluarkan.value) <
                parseFloat(min_do.value) ||
            parseFloat(saldo_sekunderDikeluarkan.value) >
                parseFloat(max_do.value)
        ) {
            alert(
                "Jumlah Sekunder Yang Dikeluarkan Kurang dari MinDo atau Melebihi MaxDO !"
            );
            return;
        }
    } else if (
        saldo_tritierDikeluarkanSatuan.value.trim() == max_doSatuan.value.trim()
    ) {
        if (
            parseFloat(saldo_tritierDikeluarkan.value) <
                parseFloat(min_do.value) ||
            parseFloat(saldo_tritierDikeluarkan.value) >
                parseFloat(max_do.value)
        ) {
            alert(
                "Jumlah Tritier Yang Dikeluarkan Kurang dari MinDo atau Melebihi MaxDO !"
            );
            return;
        }
    }

    if (
        saldo_primerDikeluarkanSatuan.value.trim() !==
            max_doSatuan.value.trim() &&
        saldo_sekunderDikeluarkanSatuan.value.trim() !==
            max_doSatuan.value.trim() &&
        saldo_tritierDikeluarkanSatuan.value.trim() !==
            max_doSatuan.value.trim()
    ) {
        if (parseFloat(jumlah_konversi.value) === 0) {
            alert("Jumlah Konversi Harus Lebih Besar '0' !");
            return;
        } else if (
            parseFloat(jumlah_konversi.value) < parseFloat(min_do.value) ||
            parseFloat(jumlah_konversi.value) > parseFloat(max_do.value)
        ) {
            alert(
                "Jumlah Konversi Yang Dikeluarkan Kurang dari MinDo atau Melebihi MaxDO !"
            );
            return;
        }
    }

    if (
        parseFloat(saldo_primerDikeluarkan.value) >
            parseFloat(saldo_primer.value) ||
        parseFloat(saldo_sekunderDikeluarkan.value) >
            parseFloat(saldo_sekunder.value) ||
        parseFloat(saldo_tritierDikeluarkan.value) >
            parseFloat(saldo_tritier.value)
    ) {
        alert("Jumlah Barang Di Gudang Tidak Mencukupi");
        return;
    }

    if (
        (saldo_primerDikeluarkanSatuan.value !== "NULL" &&
            parseInt(saldo_primerDikeluarkan.value) > 0) ||
        (saldo_primerDikeluarkanSatuan.value == "NULL" &&
            parseInt(saldo_primerDikeluarkan.value) == 0)
    ) {
        if (
            (saldo_sekunderDikeluarkanSatuan.value !== "NULL" &&
                parseInt(saldo_sekunderDikeluarkan.value) > 0) ||
            (saldo_sekunderDikeluarkanSatuan.value == "NULL" &&
                parseInt(saldo_sekunderDikeluarkan.value) == 0)
        ) {
            if (
                (saldo_tritierDikeluarkanSatuan.value !== "NULL" &&
                    parseInt(saldo_tritierDikeluarkan.value) > 0) ||
                (saldo_tritierDikeluarkanSatuan.value == "NULL" &&
                    parseInt(saldo_tritierDikeluarkan.value) == 0)
            ) {
                let kodebarangInput = document.createElement("input");
                kodebarangInput.type = "hidden";
                kodebarangInput.name = "kodebarang";
                kodebarangInput.value = kodebarang;
                form_accJualBarcode.appendChild(kodebarangInput);

                let jumlahdicentangInput = document.createElement("input");
                jumlahdicentangInput.type = "hidden";
                jumlahdicentangInput.name = "jumlahDicentang";
                jumlahdicentangInput.value = selectedRowData.length;
                form_accJualBarcode.appendChild(jumlahdicentangInput);

                let noindeksInput = document.createElement("input");
                noindeksInput.type = "hidden";
                noindeksInput.name = "noindeks";
                noindeksInput.value = noindeks;
                form_accJualBarcode.appendChild(noindeksInput);

                form_accJualBarcode.submit();
            }
        }
    }
});

//#endregion

//#region Function

function closeModal() {
    modalOverlay.style.display = "none";
}

function submitForm() {
    // Get the values you need for the form submission
    const selectedCheckboxes = $(
        "#table_AccBarcodePenjualan tbody input[type='checkbox']:checked"
    );
    const dataTable = $("#table_AccBarcodePenjualan").DataTable();
    const selectedRowData = [];
    let noindeks = [];

    selectedCheckboxes.each(function () {
        const row = $(this).closest("tr");
        const rowData = dataTable.row(row).data();
        selectedRowData.push(rowData);
        // console.log(selectedRowData);
    });

    for (let i = 0; i < selectedRowData.length; i++) {
        noindeks.push(selectedRowData[i][1]);
    }
    let kodebarang = selectedRowData[0][2];

    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    // Create a form element dynamically
    let form = document.createElement("form");
    form.method = "POST";
    form.action = "/AccPenjualan/" + kodebarang;

    // Create hidden input fields for the parameters
    let kodebarangInput = document.createElement("input");
    kodebarangInput.type = "hidden";
    kodebarangInput.name = "kodebarang";
    kodebarangInput.value = kodebarang;
    form.appendChild(kodebarangInput);

    let noindeksInput = document.createElement("input");
    noindeksInput.type = "hidden";
    noindeksInput.name = "noindeks";
    noindeksInput.value = noindeks;
    form.appendChild(noindeksInput);

    // Create CSRF token input field
    let csrfInput = document.createElement("input");
    csrfInput.type = "hidden";
    csrfInput.name = "_token";
    csrfInput.value = csrfToken;
    form.appendChild(csrfInput);

    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();
}

//#endregion
