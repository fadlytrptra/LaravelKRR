$(document).ready(function () {

    // =========================================================
    // CSRF
    // =========================================================

    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");


    // =========================================================
    // ELEMENT
    // =========================================================

    const tgl_awal = document.getElementById("tgl_awal");

    const tgl_akhir = document.getElementById("tgl_akhir");

    const btn_redisplay = document.getElementById(
        "btn_redisplay"
    );


    // =========================================================
    // DEFAULT TANGGAL
    // =========================================================

    tgl_awal.valueAsDate = new Date();

    tgl_akhir.valueAsDate = new Date();


    // =========================================================
    // DATATABLE
    // =========================================================

    let table_atas = $("#table_atas").DataTable({

        processing: true,

        serverSide: true,

        destroy: true,

        responsive: true,

        autoWidth: false,

        ajax: {

            url: "SJSudahKirimCustomer/getData",

            type: "GET",

            dataType: "json",

            data: function (d) {

                return $.extend({}, d, {

                    _token: csrfToken,

                    tgl_awal: tgl_awal.value,

                    tgl_akhir: tgl_akhir.value,

                });

            },

        },


        // =====================================================
        // COLUMN
        // =====================================================

        columns: [
            {
                data: "idHeader",
                name: "idHeader",
                render: function (data) {
                    return data ?? "";
                },
            },
            {
                data: "tanggal_raw",
                name: "tanggal",
                render: function (data, type, row) {
                    if (type === "display") {
                        return row.tanggal ?? "";
                    }
                    return data ?? "";
                },
            },
            {
                data: "jam_muat",
                name: "jam_muat",
                defaultContent: "",
            },
            {
                data: "instansi",
                name: "instansi",
                defaultContent: "",
            },
            {
                data: "tujuan_kirim",
                name: "tujuan_kirim",
                defaultContent: "",
            },
            {
                data: "sopir",
                name: "sopir",
                defaultContent: "",
            },
            {
                data: "acc_gudang",
                name: "acc_gudang",
                defaultContent: "",
            },
            {
                data: "waktu_acc_gudang",
                name: "waktu_acc_gudang",
                defaultContent: "",
            },
            {
                data: "acc_satpam",
                name: "acc_satpam",
                defaultContent: "",
            },

        ],

        paging: false,
        scrollY: "300px",
        scrollCollapse: true,
        scrollX: true,

        // =====================================================
        // ROW STYLE
        // =====================================================

        createdRow: function (row) {

            $(row).css(
                "font-family",
                "Arial"
            );

            $(row).css(
                "font-size",
                "14px"
            );

        },


        // =====================================================
        // HEADER STYLE
        // =====================================================

        headerCallback: function (thead) {

            $(thead)
                .find("th")
                .css(
                    "font-family",
                    "Arial"
                )
                .css(
                    "font-size",
                    "14px"
                )
                .css(
                    "text-align",
                    "center"
                );

        },

    });


    // =========================================================
    // REDISPLAY
    // =========================================================

    btn_redisplay.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            table_atas.ajax.reload(
                null,
                false
            );

        }
    );

});