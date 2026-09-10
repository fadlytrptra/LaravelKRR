//#region Variables
const slcShift = document.getElementById("shift");
const dtTanggal = document.getElementById("tanggal");
const btnOK = document.getElementById("btn_OK");
const btnKeluar = document.getElementById("btn_keluar");

var tableHistory = null;
//#endregion

//#region Events
dtTanggal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btnOK.focus();
    }
});

btnOK.addEventListener("click", function () {
    initDataTable();
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/";
});
//#endregion

//#region Functions
function initDataTable() {
    const dtOptions = {
        responsive: true,
        scrollX: true,
        scrollY: "400px",
        layout: {
            topStart: "pageLength",
            bottomStart: {
                buttons: [
                    {
                        extend: "excel",
                        fileName: "Laporan History CIR " + dtTanggal.value,
                        title: "Laporan History CIR (" + dtTanggal.value + ")",
                        action: function (e, dt, button, config) {
                            $(
                                'select[name="table_history_length"] option[value="-1"]'
                            )
                                .prop("selected", true)
                                .trigger("change");

                            dt.one("draw", function () {
                                $.fn.dataTable.ext.buttons.excelHtml5.action.call(
                                    button,
                                    e,
                                    dt,
                                    button,
                                    config
                                );

                                $(
                                    'select[name="table_history_length"] option[value="10"]'
                                )
                                    .prop("selected", true)
                                    .trigger("change");

                                $(".buttons-excel").removeClass("processing");
                            });
                        },
                    },
                ],
            },
        },
        language: {
            searchPlaceholder: " Pencarian...",
            search: "",
            info: "Menampilkan _START_ - _END_ dari _TOTAL_ total data",
            infoFiltered: "(disaring dari _MAX_ total data)",
            infoEmpty: "Menampilkan 0 data",
            zeroRecords: "Data tidak ditemukan",
            lengthMenu: "Menampilkan _MENU_ data per halaman",
        },
        initComplete: function () {
            var searchInput = $('input[type="search"]');
            searchInput.eq(0).addClass("form-control");
            searchInput.wrap('<div class="input-group input-group-sm"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');

            $(".dt-buttons button")
                .removeClass("btn-secondary")
                .addClass("btn-success btn-sm ms-3");
        },
        processing: true,
        serverSide: true,
        ajax: {
            url: ajaxUrl,
            dataType: "json",
            type: "POST",
            timeout: 60000,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            data: function (d) {
                d.tanggal = dtTanggal.value;
            },
        },
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "semua"],
        ],
        columns: [
            { data: "NamaMesin", width: "100px" },
            {
                data: "TotalMeter",
                width: "100px",
                className: "text-right",
            },
            {
                data: "AvgRpm",
                width: "75px",
                className: "text-right",
                render: $.fn.dataTable.render.number(",", ".", 2, ""),
            },
            {
                data: "AvgShuttle",
                width: "100px",
                className: "text-right",
                render: $.fn.dataTable.render.number(",", ".", 2, ""),
            },
            { data: "IdOrder", width: "75px" },
            { data: "NamaBarang", width: "1000px" },
        ],
    };

    if (tableHistory) {
        tableHistory.destroy();
    }

    tableHistory = new DataTable("#table_history", dtOptions);
}

function init() {
    dtTanggal.value = getCurrentDate();

    // Initialize DataTable
    initDataTable();
}

$(document).ready(function () {
    init();
});
//#endregion
