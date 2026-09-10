jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let tanggal = document.getElementById("tanggal");
    let btn_batal = document.getElementById("btn_batal");
    let btn_proses = document.getElementById("btn_proses");
    let table_kiri = $("#table_kiri").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        // scrollX: "300px",
        scrollCollapse: true,
    });
    let table_tengah = $("#table_tengah").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        // scrollX: "300px",
        scrollCollapse: true,
    });
    let table_kanan = $("#table_kanan").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        // scrollX: "300px",
        scrollCollapse: true,
    });

    $.ajaxSetup({
        beforeSend: function () {
            // Show the loading screen before the AJAX request
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            // Hide the loading screen after the AJAX request completes
            $("#loading-screen").css("display", "none");
        },
    });

    tanggal.valueAsDate = new Date();

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        table_kiri = $("#table_kiri").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/HistorySalahD/cekHistoryLapsalah",
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
                    data: "NoOrder",
                    // render: function (data) {
                    //     return <input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data};
                    // },
                },
                {
                    data: "TotalMtr",
                    // render: function (data) {
                    //     return numeral(data).format("0,0.00");
                    // },
                },
                { data: "TotalKg" },
            ],
            // order: [[1, "asc"]],
            // paging: false,
            // scrollY: "300px",
            // scrollCollapse: true,
        });

        table_tengah = $("#table_tengah").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/HistorySalahD/cekHistorySalah",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tanggal: tanggal.value,
                    });
                },
            },
            columns: [
                {
                    data: "Nama_Brg",
                    // render: function (data) {
                    //     return <input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data};
                    // },
                },
                {
                    data: "HasilMeter",
                    // render: function (data) {
                    //     return numeral(data).format("0,0.00");
                    // },
                },
                { data: "HasilKg" },
            ],
            // order: [[1, "asc"]],
            // paging: false,
            // scrollY: "300px",
            // scrollCollapse: true,
        });

        table_kanan = $("#table_kanan").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/HistorySalahD/cekCekHistory",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tanggal: tanggal.value,
                    });
                },
            },
            columns: [
                {
                    data: "NoOrder",
                    // render: function (data) {
                    //     return <input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data};
                    // },
                },
                {
                    data: "SelisihMeter",
                    // render: function (data) {
                    //     return numeral(data).format("0,0.00");
                    // },
                },
                { data: "SelisihKg" },
            ],
            // order: [[1, "asc"]],
            // paging: false,
            // scrollY: "300px",
            // scrollCollapse: true,
        });
    });
});
