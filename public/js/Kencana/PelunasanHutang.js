$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let btn_TT = document.getElementById("btn_TT");
    let btn_TTppn = document.getElementById("btn_TTppn");
    let btn_TTmurni = document.getElementById("btn_TTmurni");
    let btn_TTnego = document.getElementById("btn_TTnego");
    let btn_diJurnal = document.getElementById("btn_diJurnal");
    let btn_clear = document.getElementById("btn_clear");
    let bkk = document.getElementById("bkk");
    let tanggalS = document.getElementById("tanggalS");
    let id_uangS = document.getElementById("id_uangS");
    let supplierS = document.getElementById("supplierS");
    let bayarS = document.getElementById("bayarS");
    let mata_uangKiri = document.getElementById("mata_uangKiri");
    let totalBKK_rupiah = document.getElementById("totalBKK_rupiah");
    let totalBKK_dollar = document.getElementById("totalBKK_dollar");
    let totalTT_rupiah = document.getElementById("totalTT_rupiah");
    let totalTT_dollar = document.getElementById("totalTT_dollar");
    let mata_uangKanan = document.getElementById("mata_uangKanan");
    let nilai_bkk = document.getElementById("nilai_bkk");
    let kode_kiraM = document.getElementById("kode_kiraM");
    let ket_kiraM = document.getElementById("ket_kiraM");
    let btn_perkiraanM = document.getElementById("btn_perkiraanM");
    let hutangM = document.getElementById("hutangM");
    let pelunasanM = document.getElementById("pelunasanM");
    let keteranganM = document.getElementById("keteranganM");
    let btn_simpanM = document.getElementById("btn_simpanM");
    let btn_addM = document.getElementById("btn_addM");
    let bank = document.getElementById("bank");
    let table_atas = $("#table_atas").DataTable({
        columnDefs: [{ targets: [7, 8], visible: false }],
    });
    let table_kiri = $("#table_kiri").DataTable({
        // columnDefs: [{ targets: [7, 8], visible: false }],
    });
    let table_kanan = $("#table_kanan").DataTable({
        // columnDefs: [{ targets: [7, 8], visible: false }],
    });
    let table_jurnal = $("#table_jurnal").DataTable({
        autoWidth: false,
        columnDefs: [{ targets: [0], visible: false }],
    });
    let rowDataPertama;
    nilai_bkk.style.fontWeight = "bold";
    hutangM.value = 0;
    pelunasanM.value = 0;
    btn_diJurnal.disabled = false;

    hutangM.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(hutangM.value.replace(/,/g, ""));

            hutangM.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
            });
            pelunasanM.focus();
            pelunasanM.select();
        }
    });

    pelunasanM.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(pelunasanM.value.replace(/,/g, ""));

            pelunasanM.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
            });
            keteranganM.focus();
        }
    });

    table_atas = $("#table_atas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        destroy: true,
        ajax: {
            url: "/Kencana/PelunasanHutangKencana/getDataAtas",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                });
            },
        },
        columns: [
            {
                data: "NM_SUP",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Tgl_Input" },
            { data: "Id_BKK" },
            { data: "Symbol" },
            { data: "NilaiRincian" },
            { data: "Id_Supplier" },
            { data: "Id_MataUang" },
            { data: "IdUangTagih" },
            { data: "IdUang_Supp" },
        ],
        columnDefs: [{ targets: [7, 8], visible: false }],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
    });

    let rowDataArray = [];

    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                // Uncheck all other checkboxes and clear the array
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);

                // Get the data for the selected row
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Clear the array and push the current row data
                rowDataArray = [rowDataPertama];

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            } else {
                // Clear the array when the checkbox is unchecked
                rowDataArray = [];
                rowDataPertama = null;

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    btn_diJurnal.addEventListener("click", function (event) {
        event.preventDefault();
        var myModal = new bootstrap.Modal(
            document.getElementById("dataBKKModal"),
            {
                keyboard: false,
            }
        );
        myModal.show();
    });

    let tableData = [];

    btn_simpanM.addEventListener("click", function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/PelunasanHutangKencana",
            type: "POST",
            data: {
                _token: csrfToken,
                hutangM: hutangM.value,
                pelunasanM: pelunasanM.value,
                bkk: bkk.value,
                tanggalS: tanggalS.value,
                id_uangS: id_uangS.value,
                supplierS: supplierS.value,
                bayarS: bayarS.value,
                kode_kiraM: kode_kiraM.value,
                keteranganM: keteranganM.value,
                // checkedRows: checkedRows,
            },
            success: function (response) {
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        const newRow = {
                            id: tableData.length + 1,
                            bkk: bkk.value,
                            kode_kiraM: kode_kiraM.value,
                            hutangM: hutangM.value,
                            pelunasanM: pelunasanM.value,
                            keteranganM: keteranganM.value,
                        };

                        tableData.push(newRow);
                        console.log(tableData);

                        if ($.fn.DataTable.isDataTable("#table_jurnal")) {
                            var table_jurnal = $("#table_jurnal").DataTable();

                            table_jurnal.row
                                .add([
                                    newRow.id,
                                    newRow.bkk,
                                    newRow.kode_kiraM,
                                    newRow.hutangM,
                                    newRow.pelunasanM,
                                    newRow.keteranganM,
                                ])
                                .draw();
                            // diterima_dari.value = "";
                            // jumlah_uang.value = "";
                            // jenis_pembayaran.value = "";
                            // id_jnsPem.value = "";
                            // kode_kira.value = "";
                            // keterangan_kira.value = "";
                            // no_bukti.value = "";
                            // uraian.value = "";
                            // btn_matauang.disabled = true;
                            // btn_bank.disabled = true;
                            // document.activeElement.blur();

                            // const totalPelunasan = tableData.reduce(
                            //     (sum, row) => {
                            //         // Remove commas only and keep the decimal point
                            //         const cleanValue = row.jumlah_uang.replace(
                            //             /,/g,
                            //             ""
                            //         );
                            //         return sum + parseFloat(cleanValue);
                            //     },
                            //     0
                            // );

                            // total_pelunasan.value =
                            //     totalPelunasan.toLocaleString("en-US", {
                            //         minimumFractionDigits: 2,
                            //         maximumFractionDigits: 2,
                            //     });
                        } else {
                            var table_jurnal = $("#table_jurnal").DataTable();
                        }
                        // document
                        //     .querySelectorAll("input")
                        //     .forEach((input) => (input.value = ""));
                        // $("#table_atas").DataTable().ajax.reload();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr) {
                alert(xhr.responseJSON.message);
            },
        });
    });

    btn_addM.addEventListener("click", async function (event) {
        event.preventDefault();
        kode_kiraM.value = "";
        ket_kiraM.value = "";
        hutangM.value = 0;
        pelunasanM.value = 0;
        keteranganM.value = "";
        btn_perkiraanM.focus();
    });

    btn_perkiraanM.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKira" class="display" style="width:100%"><thead><tr><th>ID. Perkiraan</th><th>Nama Perkiraan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableKira")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#tableKira").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "/Kencana/PelunasanHutangKencana/getKodePerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "NoKodePerkiraan" },
                                { data: "Keterangan" },
                            ],
                        });
                        $("#tableKira tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableKira")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kode_kiraM.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ket_kiraM.value = escapeHTML(selectedRow.Keterangan.trim());

                    setTimeout(() => {
                        hutangM.focus();
                        hutangM.select();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_TT.addEventListener("click", function (event) {
        event.preventDefault();
        table_kanan = $("#table_kanan").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/PelunasanHutangKencana/getDataTT",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        bkk: bkk.value,
                    });
                },
                complete: function (response) {
                    if (response.responseJSON.data.length > 0) {
                        // Get the Symbol value from the first item in the response data
                        let symbol = response.responseJSON.data[0].Symbol;

                        document.getElementById("mata_uangKanan").value =
                            symbol;
                    }
                },
            },
            columns: [
                {
                    data: "Rincian_Bayar",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "No_Terima" },
                { data: "Kurs_tagih" },
                { data: "Sub3" },
                { data: "Sub4" },
            ],
            // columnDefs: [
            //     { targets: [7, 8], visible: false },
            // ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
        });

        $.ajax({
            url: "/Kencana/PelunasanHutangKencana/lanjutDataTT",
            type: "GET",
            data: {
                _token: csrfToken,
                bkk: bkk.value,
                mata_uangKanan: mata_uangKanan.value,
            },
            success: function (response) {
                console.log(response);
                totalTT_rupiah.value = response.TTtlTTRp;
                totalTT_dollar.value = response.TTtlTTDr;
            },
            error: function (xhr) {
                alert(xhr.responseJSON.message);
            },
        });
    });

    btn_TTppn.addEventListener("click", function (event) {
        event.preventDefault();
        table_kanan = $("#table_kanan").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/PelunasanHutangKencana/getDataTT_Ppn",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        bkk: bkk.value,
                    });
                },
                complete: function (response) {
                    if (response.responseJSON.data.length > 0) {
                        // Get the Symbol value from the first item in the response data
                        let symbol = response.responseJSON.data[0].Symbol;

                        document.getElementById("mata_uangKanan").value =
                            symbol;
                    }
                },
            },
            columns: [
                {
                    data: "Rincian_Bayar",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "No_Terima" },
                { data: "Kurs_tagih" },
                { data: "Sub4" },
                { data: "Sub3" },
            ],
            // columnDefs: [
            //     { targets: [7, 8], visible: false },
            // ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
        });

        $.ajax({
            url: "/Kencana/PelunasanHutangKencana/lanjutDataTT_Ppn",
            type: "GET",
            data: {
                _token: csrfToken,
                bkk: bkk.value,
                mata_uangKanan: mata_uangKanan.value,
            },
            success: function (response) {
                console.log(response);
                totalTT_rupiah.value = response.TTtlTTRp;
                totalTT_dollar.value = response.TTtlTTDr;
            },
            error: function (xhr) {
                alert(xhr.responseJSON.message);
            },
        });
    });

    btn_TTmurni.addEventListener("click", function (event) {
        event.preventDefault();
        table_kanan = $("#table_kanan").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/PelunasanHutangKencana/getDataTT_Murni",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        bkk: bkk.value,
                    });
                },
                complete: function (response) {
                    if (response.responseJSON.data.length > 0) {
                        // Get the Symbol value from the first item in the response data
                        let symbol = response.responseJSON.data[0].Symbol;

                        document.getElementById("mata_uangKanan").value =
                            symbol;
                    }
                },
            },
            columns: [
                {
                    data: "Rincian_Bayar",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "No_Terima" },
                { data: "Kurs_tagih" },
                { data: "Sub3" },
                { data: "Sub4" },
            ],
            // columnDefs: [
            //     { targets: [7, 8], visible: false },
            // ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
        });

        $.ajax({
            url: "/Kencana/PelunasanHutangKencana/lanjutDataTT_Murni",
            type: "GET",
            data: {
                _token: csrfToken,
                bkk: bkk.value,
                mata_uangKanan: mata_uangKanan.value,
            },
            success: function (response) {
                console.log(response);
                totalTT_rupiah.value = response.TTtlTTRp;
                totalTT_dollar.value = response.TTtlTTDr;
            },
            error: function (xhr) {
                alert(xhr.responseJSON.message);
            },
        });
    });

    btn_TTnego.addEventListener("click", function (event) {
        event.preventDefault();
        table_kanan = $("#table_kanan").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/PelunasanHutangKencana/getDataTT_MDisc",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        bkk: bkk.value,
                    });
                },
                complete: function (response) {
                    if (response.responseJSON.data.length > 0) {
                        // Get the Symbol value from the first item in the response data
                        let symbol = response.responseJSON.data[0].Symbol;

                        document.getElementById("mata_uangKanan").value =
                            symbol;
                    }
                },
            },
            columns: [
                {
                    data: "Rincian_Bayar",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "No_Terima" },
                { data: "Kurs_tagih" },
                { data: "Sub3" },
                { data: "Sub4" },
            ],
            // columnDefs: [
            //     { targets: [7, 8], visible: false },
            // ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
        });

        $.ajax({
            url: "/Kencana/PelunasanHutangKencana/lanjutDataTT_MDisc",
            type: "GET",
            data: {
                _token: csrfToken,
                bkk: bkk.value,
                mata_uangKanan: mata_uangKanan.value,
            },
            success: function (response) {
                console.log(response);
                totalTT_rupiah.value = response.TTtlTTRp;
                totalTT_dollar.value = response.TTtlTTDr;
            },
            error: function (xhr) {
                alert(xhr.responseJSON.message);
            },
        });
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataPertama == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        } else {
            $.ajax({
                url: "/Kencana/PelunasanHutangKencana/proses",
                type: "GET",
                data: {
                    _token: csrfToken,
                    rowDataArray: rowDataArray,
                },
                success: function (response) {
                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                            showConfirmButton: true,
                        }).then(() => {
                            bkk.value = rowDataPertama.Id_BKK;
                            tanggalS.value = rowDataPertama.Tgl_Input;
                            id_uangS.value = rowDataPertama.Id_MataUang;
                            supplierS.value = rowDataPertama.Id_Supplier;
                            bayarS.value = rowDataPertama.IdUangTagih;
                            rowDataPertama = null;
                            rowDataArray = [];
                            btn_diJurnal.disabled = false;
                            $("#table_atas").DataTable().ajax.reload();

                            table_kiri = $("#table_kiri").DataTable({
                                responsive: true,
                                processing: true,
                                serverSide: true,
                                destroy: true,
                                ajax: {
                                    url: "/Kencana/PelunasanHutangKencana/getDataBKK",
                                    dataType: "json",
                                    type: "GET",
                                    data: function (d) {
                                        return $.extend({}, d, {
                                            _token: csrfToken,
                                            bkk: bkk.value,
                                        });
                                    },
                                    complete: function (response) {
                                        // Initialize the total variable
                                        let totalNilaiRincian = 0;

                                        if (
                                            response.responseJSON.data.length >
                                            0
                                        ) {
                                            // Get the Symbol and Id_Bank from the first item in the response data
                                            let symbol =
                                                response.responseJSON.data[0]
                                                    .Symbol;
                                            let id_bank =
                                                response.responseJSON.data[0]
                                                    .Id_Bank;

                                            // Set the values to the respective elements
                                            document.getElementById(
                                                "mata_uangKiri"
                                            ).value = symbol;
                                            document.getElementById(
                                                "bank"
                                            ).value = id_bank;

                                            // Iterate over the response data to calculate the sum of Nilai_Rincian
                                            response.responseJSON.data.forEach(
                                                (row) => {
                                                    // Remove commas and convert to a float
                                                    let nilaiRincian =
                                                        parseFloat(
                                                            row.Nilai_Rincian.replace(
                                                                /,/g,
                                                                ""
                                                            )
                                                        );

                                                    // Sum or subtract based on the value
                                                    if (!isNaN(nilaiRincian)) {
                                                        totalNilaiRincian +=
                                                            nilaiRincian;
                                                    }
                                                }
                                            );

                                            // Set the calculated total to the nilai_bkk input
                                            document.getElementById(
                                                "nilai_bkk"
                                            ).value =
                                                totalNilaiRincian.toLocaleString(
                                                    "en-US",
                                                    {
                                                        minimumFractionDigits: 4,
                                                        maximumFractionDigits: 4,
                                                    }
                                                );
                                        }
                                    },
                                },
                                columns: [
                                    {
                                        data: "Rincian_Bayar",
                                    },
                                    { data: "Nilai_Rincian" },
                                    { data: "Sub2" },
                                    { data: "Kurs_Bayar" },
                                    { data: "Nilai_Rincian" },
                                    { data: "Kode_Perkiraan" },
                                ],
                                paging: false,
                                scrollY: "400px",
                                scrollCollapse: true,
                            });

                            $.ajax({
                                url: "/Kencana/PelunasanHutangKencana/lanjutDataBKK",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    bkk: bkk.value,
                                    mata_uangKiri: mata_uangKiri.value,
                                },
                                success: function (response) {
                                    console.log(response);
                                    totalBKK_rupiah.value = response.TTtlBKKRp;
                                    totalBKK_dollar.value = response.TTtlBKKD;
                                },
                                error: function (xhr) {
                                    alert(xhr.responseJSON.message);
                                },
                            });

                            table_kanan = $("#table_kanan").DataTable({
                                responsive: true,
                                processing: true,
                                serverSide: true,
                                destroy: true,
                                ajax: {
                                    url: "/Kencana/PelunasanHutangKencana/getDataTT",
                                    dataType: "json",
                                    type: "GET",
                                    data: function (d) {
                                        return $.extend({}, d, {
                                            _token: csrfToken,
                                            bkk: bkk.value,
                                        });
                                    },
                                    complete: function (response) {
                                        if (
                                            response.responseJSON.data.length >
                                            0
                                        ) {
                                            // Get the Symbol value from the first item in the response data
                                            let symbol =
                                                response.responseJSON.data[0]
                                                    .Symbol;

                                            document.getElementById(
                                                "mata_uangKanan"
                                            ).value = symbol;
                                        }
                                    },
                                },
                                columns: [
                                    {
                                        data: "Rincian_Bayar",
                                        // render: function (data) {
                                        //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                                        // },
                                    },
                                    { data: "No_Terima" },
                                    { data: "Kurs_tagih" },
                                    { data: "Sub3" },
                                    { data: "Sub4" },
                                ],
                                // columnDefs: [
                                //     { targets: [7, 8], visible: false },
                                // ],
                                paging: false,
                                scrollY: "400px",
                                scrollCollapse: true,
                            });

                            $.ajax({
                                url: "/Kencana/PelunasanHutangKencana/lanjutDataTT",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    bkk: bkk.value,
                                    mata_uangKanan: mata_uangKanan.value,
                                },
                                success: function (response) {
                                    console.log(response);
                                    totalTT_rupiah.value = response.TTtlTTRp;
                                    totalTT_dollar.value = response.TTtlTTDr;
                                },
                                error: function (xhr) {
                                    alert(xhr.responseJSON.message);
                                },
                            });
                        });
                    } else if (response.question) {
                        Swal.fire({
                            text: response.question,
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Ya",
                            cancelButtonText: "Tidak",
                            focusConfirm: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.ajax({
                                    url: "/Kencana/PelunasanHutangKencana/prosesDollar",
                                    type: "GET",
                                    data: {
                                        _token: csrfToken,
                                        rowDataArray: rowDataArray,
                                    },
                                    success: function (response) {
                                        if (response.message) {
                                            Swal.fire({
                                                icon: "success",
                                                title: "Success!",
                                                text: response.message,
                                                showConfirmButton: true,
                                            }).then(() => {
                                                bkk.value =
                                                    rowDataPertama.Id_BKK;
                                                tanggalS.value =
                                                    rowDataPertama.Tgl_Input;
                                                id_uangS.value =
                                                    rowDataPertama.Id_MataUang;
                                                supplierS.value =
                                                    rowDataPertama.Id_Supplier;
                                                bayarS.value =
                                                    rowDataPertama.IdUangTagih;
                                                rowDataPertama = null;
                                                rowDataArray = [];
                                                btn_diJurnal.disabled = false;
                                                $("#table_atas")
                                                    .DataTable()
                                                    .ajax.reload();

                                                table_kiri = $(
                                                    "#table_kiri"
                                                ).DataTable({
                                                    responsive: true,
                                                    processing: true,
                                                    serverSide: true,
                                                    destroy: true,
                                                    ajax: {
                                                        url: "/Kencana/PelunasanHutangKencana/getDataBKK",
                                                        dataType: "json",
                                                        type: "GET",
                                                        data: function (d) {
                                                            return $.extend(
                                                                {},
                                                                d,
                                                                {
                                                                    _token: csrfToken,
                                                                    bkk: bkk.value,
                                                                }
                                                            );
                                                        },
                                                        complete: function (
                                                            response
                                                        ) {
                                                            // Initialize the total variable
                                                            let totalNilaiRincian = 0;

                                                            if (
                                                                response
                                                                    .responseJSON
                                                                    .data
                                                                    .length > 0
                                                            ) {
                                                                // Get the Symbol and Id_Bank from the first item in the response data
                                                                let symbol =
                                                                    response
                                                                        .responseJSON
                                                                        .data[0]
                                                                        .Symbol;
                                                                let id_bank =
                                                                    response
                                                                        .responseJSON
                                                                        .data[0]
                                                                        .Id_Bank;

                                                                // Set the values to the respective elements
                                                                document.getElementById(
                                                                    "mata_uangKiri"
                                                                ).value =
                                                                    symbol;
                                                                document.getElementById(
                                                                    "bank"
                                                                ).value =
                                                                    id_bank;

                                                                // Iterate over the response data to calculate the sum of Nilai_Rincian
                                                                response.responseJSON.data.forEach(
                                                                    (row) => {
                                                                        // Remove commas and convert to a float
                                                                        let nilaiRincian =
                                                                            parseFloat(
                                                                                row.Nilai_Rincian.replace(
                                                                                    /,/g,
                                                                                    ""
                                                                                )
                                                                            );

                                                                        // Sum or subtract based on the value
                                                                        if (
                                                                            !isNaN(
                                                                                nilaiRincian
                                                                            )
                                                                        ) {
                                                                            totalNilaiRincian +=
                                                                                nilaiRincian;
                                                                        }
                                                                    }
                                                                );

                                                                // Set the calculated total to the nilai_bkk input
                                                                document.getElementById(
                                                                    "nilai_bkk"
                                                                ).value =
                                                                    totalNilaiRincian.toLocaleString(
                                                                        "en-US",
                                                                        {
                                                                            minimumFractionDigits: 4,
                                                                            maximumFractionDigits: 4,
                                                                        }
                                                                    );
                                                            }
                                                        },
                                                    },
                                                    columns: [
                                                        {
                                                            data: "Rincian_Bayar",
                                                        },
                                                        {
                                                            data: "Nilai_Rincian",
                                                        },
                                                        { data: "Sub2" },
                                                        { data: "Kurs_Bayar" },
                                                        {
                                                            data: "Nilai_Rincian",
                                                        },
                                                        {
                                                            data: "Kode_Perkiraan",
                                                        },
                                                    ],
                                                    paging: false,
                                                    scrollY: "400px",
                                                    scrollCollapse: true,
                                                });

                                                $.ajax({
                                                    url: "/Kencana/PelunasanHutangKencana/lanjutDataBKK",
                                                    type: "GET",
                                                    data: {
                                                        _token: csrfToken,
                                                        bkk: bkk.value,
                                                        mata_uangKiri:
                                                            mata_uangKiri.value,
                                                    },
                                                    success: function (
                                                        response
                                                    ) {
                                                        console.log(response);
                                                        totalBKK_rupiah.value =
                                                            response.TTtlBKKRp;
                                                        totalBKK_dollar.value =
                                                            response.TTtlBKKD;
                                                    },
                                                    error: function (xhr) {
                                                        alert(
                                                            xhr.responseJSON
                                                                .message
                                                        );
                                                    },
                                                });

                                                table_kanan = $(
                                                    "#table_kanan"
                                                ).DataTable({
                                                    responsive: true,
                                                    processing: true,
                                                    serverSide: true,
                                                    destroy: true,
                                                    ajax: {
                                                        url: "/Kencana/PelunasanHutangKencana/getDataTT",
                                                        dataType: "json",
                                                        type: "GET",
                                                        data: function (d) {
                                                            return $.extend(
                                                                {},
                                                                d,
                                                                {
                                                                    _token: csrfToken,
                                                                    bkk: bkk.value,
                                                                }
                                                            );
                                                        },
                                                        complete: function (
                                                            response
                                                        ) {
                                                            if (
                                                                response
                                                                    .responseJSON
                                                                    .data
                                                                    .length > 0
                                                            ) {
                                                                // Get the Symbol value from the first item in the response data
                                                                let symbol =
                                                                    response
                                                                        .responseJSON
                                                                        .data[0]
                                                                        .Symbol;

                                                                document.getElementById(
                                                                    "mata_uangKanan"
                                                                ).value =
                                                                    symbol;
                                                            }
                                                        },
                                                    },
                                                    columns: [
                                                        {
                                                            data: "Rincian_Bayar",
                                                            // render: function (data) {
                                                            //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                                                            // },
                                                        },
                                                        { data: "No_Terima" },
                                                        { data: "Kurs_tagih" },
                                                        { data: "Sub3" },
                                                        { data: "Sub4" },
                                                    ],
                                                    // columnDefs: [
                                                    //     { targets: [7, 8], visible: false },
                                                    // ],
                                                    paging: false,
                                                    scrollY: "400px",
                                                    scrollCollapse: true,
                                                });

                                                $.ajax({
                                                    url: "/Kencana/PelunasanHutangKencana/lanjutDataTT",
                                                    type: "GET",
                                                    data: {
                                                        _token: csrfToken,
                                                        bkk: bkk.value,
                                                        mata_uangKanan:
                                                            mata_uangKanan.value,
                                                    },
                                                    success: function (
                                                        response
                                                    ) {
                                                        console.log(response);
                                                        totalTT_rupiah.value =
                                                            response.TTtlTTRp;
                                                        totalTT_dollar.value =
                                                            response.TTtlTTDr;
                                                    },
                                                    error: function (xhr) {
                                                        alert(
                                                            xhr.responseJSON
                                                                .message
                                                        );
                                                    },
                                                });
                                            });
                                        } else if (response.error) {
                                            Swal.fire({
                                                icon: "info",
                                                title: "Info!",
                                                text: response.error,
                                                showConfirmButton: false,
                                            });
                                        }
                                    },
                                    error: function (xhr) {
                                        alert(xhr.responseJSON.message);
                                    },
                                });
                                // setTimeout(() => {
                                //     jumlah_biayaMBiaya.focus();
                                // }, 300);
                            } else {
                                // tutup_modal.click();
                            }
                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: "info",
                            title: "Info!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    }
                },
                error: function (xhr) {
                    alert(xhr.responseJSON.message);
                },
            });
        }
    });

    btn_clear.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });
});
