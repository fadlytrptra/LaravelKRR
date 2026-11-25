$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let radio_1 = document.getElementById("radio_1");
    let btn_ok = document.getElementById("btn_ok");
    let btn_kurstt = document.getElementById("btn_kurstt");
    let btn_proses = document.getElementById("btn_proses");
    let btn_prosesRincian = document.getElementById("btn_prosesRincian");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let bkk = document.getElementById("bkk");
    let nama_supplier = document.getElementById("nama_supplier");
    let id_bayar = document.getElementById("id_bayar");
    let id_rincian = document.getElementById("id_rincian");
    let kurs_pembayaran = document.getElementById("kurs_pembayaran");
    let tt_modal = document.getElementById("tt_modal");
    let kurs_rrM = document.getElementById("kurs_rrM");
    let table_bkk = $("#table_bkk").DataTable({
        columnDefs: [{ targets: [3, 4], visible: false }],
    });
    let table_pembayaran = $("#table_pembayaran").DataTable({
        // columnDefs: [{ targets: [3, 4], visible: false }],
    });
    let table_rincian = $("#table_rincian").DataTable({
        // columnDefs: [{ targets: [3, 4], visible: false }],
    });
    let rowDataPertama;
    let rowDataKedua;
    let krr1 = false;
    let proses;

    let currentDate = new Date();
    bulan.value = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    tahun.value = currentDate.getFullYear();
    kurs_pembayaran.style.fontWeight = 'bold';

    radio_1.addEventListener("click", function (event) {
        krr1 = true;
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        proses = 1;
        $.ajax({
            url: "/Kencana/MaintenanceKursBKKKencana",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: proses,
                id_bayar: id_bayar.value,
                kurs_pembayaran: kurs_pembayaran.value,
                bkk: bkk.value,
            },
            success: function (response) {
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        document
                            .querySelectorAll("input")
                            .forEach((input) => (input.value = ""));
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

    btn_prosesRincian.addEventListener("click", function (event) {
        event.preventDefault();
        proses = 2;
        $.ajax({
            url: "/Kencana/MaintenanceKursBKKKencana",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: proses,
                id_bayar: id_bayar.value,
                id_rincian: id_rincian.value,
                kurs_pembayaran: kurs_pembayaran.value,
            },
            success: function (response) {
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        // document
                        //     .querySelectorAll("input")
                        //     .forEach((input) => (input.value = ""));
                        $("#table_rincian").DataTable().ajax.reload();
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

    btn_kurstt.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataPertama == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data pembayaran terlebih dahulu!",
                showConfirmButton: true,
            });
        } else {
            if (rowDataPertama.Kurs_Bayar !== "1.00") {
                tt_modal.value = rowDataPertama.Id_Penagihan;
                var myModal = new bootstrap.Modal(
                    document.getElementById("dataBKKModal"),
                    {
                        keyboard: false,
                    }
                );

                let = table_kursTT = $("#table_kursTT").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    ajax: {
                        url: "/Kencana/MaintenanceKursBKKKencana/processTT",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                idtt: rowDataPertama.Id_Penagihan,
                            });
                        },
                        dataSrc: function (json) {
                            if (json.kursRata) {
                                $("#kurs_rrM").val(json.kursRata);
                            }
                            return json.data;
                        },
                    },
                    columns: [
                        {
                            data: "No_Terima",
                            // render: function (data) {
                            //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                            // },
                        },
                        { data: "Kurs_Tagih" },
                    ],
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    // columnDefs: [{ targets: [5], visible: false }],
                });

                myModal.show();
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Tidak ada kurs TT",
                    showConfirmButton: true,
                });
            }
        }
    });

    btn_ok.addEventListener("click", function (event) {
        event.preventDefault();
        if ($.fn.DataTable.isDataTable("#table_bkk")) {
            $("#table_bkk").DataTable().destroy();
        }
        table_bkk = $("#table_bkk").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/MaintenanceKursBKKKencana/checkBKK",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        bulan: bulan.value,
                        tahun: tahun.value,
                        krr1: krr1,
                    });
                },
            },
            columns: [
                {
                    data: "Id_BKK",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "Nilai_Pembulatan" },
                { data: "Tanggal_BKK" },
                { data: "NM_SUP" },
                { data: "Id_Supplier" },
                { data: "Sym_Supp" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            columnDefs: [{ targets: [5], visible: false }],
        });
    });

    $("#table_bkk tbody").off("click", "tr");
    $("#table_bkk tbody").on("click", "tr", function () {
        let checkSelectedRows = $("#table_bkk tbody tr.selected");

        if (checkSelectedRows.length > 0) {
            // Remove "selected" class from previously selected rows
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const table_bkk = $("#table_bkk").DataTable();
        let selectedRows = table_bkk.rows(".selected").data().toArray();
        console.log(selectedRows);

        bkk.value = selectedRows[0].Id_BKK;
        nama_supplier.value = selectedRows[0].NM_SUP;

        table_pembayaran = $("#table_pembayaran").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/MaintenanceKursBKKKencana/listBKKClick",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        bkk: bkk.value,
                    });
                },
            },
            columns: [
                {
                    data: "Id_Pembayaran",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_Penagihan" },
                { data: "Jenis_Pembayaran" },
                { data: "Nama_MataUang" },
                { data: "Nilai_Pembayaran" },
                { data: "Kurs_Bayar" },
            ],
            // columnDefs: [{ targets: [5, 6], visible: false }],
        });
    });

    let rowDataArray = [];

    $("#table_pembayaran tbody").off(
        "change",
        'input[name="penerimaCheckbox"]'
    );
    $("#table_pembayaran tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_pembayaran
                    .row($(this).closest("tr"))
                    .data();
                rowDataArray.push(rowDataPertama);
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_pembayaran);

                id_bayar.value = rowDataPertama.Id_Pembayaran;
                kurs_pembayaran.value = rowDataPertama.Kurs_Bayar;
                table_rincian = $("#table_rincian").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    ajax: {
                        url: "/Kencana/MaintenanceKursBKKKencana/listBayarClick",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                id_pembayaran: rowDataPertama.Id_Pembayaran,
                            });
                        },
                    },
                    columns: [
                        {
                            data: "Id_Pembayaran",
                            render: function (data) {
                                return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                            },
                        },
                        { data: "Id_Detail_Bayar" },
                        { data: "Rincian_Bayar" },
                        { data: "Nilai_Rincian" },
                        { data: "Kode_Perkiraan" },
                        { data: "Kurs" },
                    ],
                    // columnDefs: [{ targets: [5, 6], visible: false }],
                });
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                id_bayar.value = "";
                kurs_pembayaran.value = "";
                rowDataArray = [];
                rowDataPertama = null;
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_pembayaran);

                $("#table_rincian tbody").empty();
            }
        }
    );

    let rowDataArrayKedua = [];

    $("#table_rincian tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_rincian tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKedua = table_rincian.row($(this).closest("tr")).data();
                rowDataArrayKedua.push(rowDataKedua);
                console.log(rowDataArrayKedua);
                console.log(rowDataKedua, this, table_rincian);

                id_rincian.value = rowDataKedua.Id_Detail_Bayar;
                // First, remove any existing formatting to ensure proper parsing
                let kursValue = parseFloat(rowDataKedua.Kurs.replace(/,/g, ""));

                // Format the number to have a comma as thousand separators and two decimal places
                kurs_pembayaran.value = kursValue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
            } else {
                id_rincian.value = "";
                kurs_pembayaran.value = "";
                rowDataArrayKedua = [];
                rowDataKedua = null;
                console.log(rowDataArrayKedua);
                console.log(rowDataKedua, this, table_rincian);
            }
        }
    );

    kurs_pembayaran.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(kurs_pembayaran.value.replace(/,/g, ""));
            kurs_pembayaran.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        }
    });
});
