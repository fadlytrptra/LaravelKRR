//#region Variables

// Button Elements
const btnRefresh = document.getElementById("btn_refresh");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

// Other Elements
const formSubmit = document.getElementById("form_submit");
const hidMesin = document.getElementById("konversi_mesin");
const hidOrder = document.getElementById("konversi_order");
const hidLog = document.getElementById("konversi_log");
const hidMeter = document.getElementById("konversi_meter");

// Non-elements
var tableMeter = null;
const listMeter = [];
var tableDetail = null;
const listDetail = [];

//#endregion

//#region Event Listeners
btnRefresh.addEventListener("click", function () {
    listMeter.length = 0;
    initDataTableMeter();
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/";
});
//#endregion

//#region Functions
function initDataTableMeter() {
    let screenHeight = $(window).height();
    let percentageHeight = 40;
    let tableHeight = (screenHeight * percentageHeight) / 100;

    let dtAjax = {
        url: serverSideUrl,
        dataType: "json",
        type: "POST",
        timeout: 60000,
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        dataSrc: function (json) {
            for (let i = 0; i < json.data.length; i++) {
                for (let j = 0; j < listMeter.length; j++) {
                    if (json.data[i]["NomorKu"] === listMeter[j]["NomorKu"]) {
                        json.data[i]["Meter"] = listMeter[j]["Meter"];
                        json.data[i]["IdLogAwal"] = listMeter[j]["IdLogAwal"];
                    }
                }
            }
            return json.data;
        },
    };

    const dtOptions = {
        responsive: true,
        scrollX: true,
        scrollY: tableHeight + "px",
        rowId: "NomorKu",
        select: {
            headerCheckbox: false,
        },
        language: {
            searchPlaceholder: " Pencarian...",
            search: "",
            lengthMenu: "Menampilkan _MENU_ data",
            info: "Menampilkan _START_ - _END_ dari _TOTAL_ data",
        },
        initComplete: function () {
            var searchInput = $('input[type="search"]');
            searchInput.eq(0).addClass("form-control");
            searchInput.wrap('<div class="input-group input-group-sm"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
        columns: [
            {
                data: null,
                width: "0px",
                render: DataTable.render.select(),
            },
            {
                data: "TanggalLog",
                width: "75px",
            },
            {
                data: "NamaMesin",
                width: "60px",
            },
            {
                data: "NamaBarang",
                width: "600px",
            },
            {
                data: "Meter",
                width: "75px",
            },
            {
                data: "IdLogAwal",
                width: "100px",
            },
            {
                data: "NoIndeks",
                width: "60px",
            },
        ],
        columnDefs: [
            {
                targets: 3,
                render: DataTable.render.ellipsis(80, true),
            },
        ],
        ajax: dtAjax,
    };

    if (tableMeter) {
        tableMeter.destroy();
    }

    tableMeter = new DataTable("#table_meter", dtOptions);

    tableMeter.on("select", function (e, dt, type, indexes) {
        let rowData = tableMeter.rows(indexes).data().toArray();

        for (let i = 0; i < listMeter.length; i++) {
            if (rowData[0]["NomorKu"] == listMeter[i]["NomorKu"]) {
                return;
            }
        }

        hitungMeter(
            rowData[0]["NomorKu"],
            rowData[0]["IdMesin"],
            rowData[0]["IdOrder"],
            rowData[0]["IdLog"]
        );
    });
}

function hitungMeter(row_index, id_mesin, id_order, id_log) {
    fetchSelect(
        "/sp-proses/SP_1486_CIR_LIST_TRANSF_MTR_3/" +
            id_mesin +
            "~" +
            id_order +
            "~" +
            id_log,
        (data) => {
            let meter = data[0]["Hasil_Meter"];
            let idLogAwal = data[0]["Id_Log_Awal"] || 0;

            listMeter.push({
                NomorKu: row_index,
                Meter: meter,
                IdLogAwal: idLogAwal,
            });

            tableMeter.ajax.reload(null, false);
        }
    );
}

function initDataTable(data) {
    let exportFormatter = {
        format: {
            body: function (data, row, column) {
                return column === 4 ? tableMesin.cell(row, 4).data() : data;
            },
        },
    };

    const dtOptions = {
        responsive: true,
        scrollX: true,
        scrollY: "400px",
        layout: {
            topStart: {
                info: true,
            },
            bottomStart: {
                buttons: [
                    {
                        extend: "excel",
                        exportOptions: exportFormatter,
                    },
                ],
            },
        },
        language: {
            searchPlaceholder: " Pencarian...",
            search: "",
            info: "Menampilkan _START_ - _END_ dari _TOTAL_ data",
        },
        initComplete: function () {
            var searchInput = $('input[type="search"]');
            searchInput.eq(0).addClass("form-control");
            searchInput.wrap('<div class="input-group input-group-sm"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');

            $(".dt-buttons button")
                .removeClass("btn-secondary")
                .addClass("btn-success btn-sm ms-3");

            var infoText = $(".dt-info").text();
            if (infoText.includes("Showing 0 to 0 of 0 entries")) {
                $(".dt-info").text("Menampilkan 0 data");
            }
        },
    };

    if (data) {
        dtOptions.columnDefs = [
            {
                targets: 4,
                render: DataTable.render.ellipsis(50, true),
            },
        ];
        dtOptions.columns = [
            { data: "Tanggal", width: "75px" },
            { data: "Nama_mesin", width: "50px" },
            { data: "Id_Order", width: "75px" },
            { data: "Kode_barang", width: "75px" },
            { data: "NAMA_BRG", width: "350px" },
            { data: "R_jumlah_Order", width: "100px" },
            { data: "A_jumlah_Order", width: "100px" },
            { data: "Rpm", width: "0px" },
        ];
        dtOptions.data = data;
    } else {
        dtOptions.columns = [
            { width: "75px" }, // Tanggal
            { width: "50px" }, // Nama Mesin
            { width: "75px" }, // Id Order
            { width: "75px" }, // Kd. Barang
            { width: "350px" }, // Nama Order
            { width: "100px" }, // Rencana Order
            { width: "100px" }, // Jumlah Order
            { width: "0px" }, // RPM
        ];
    }

    if (tableMesin) {
        tableMesin.destroy();
    }

    tableDetail = new DataTable("#table_detail", dtOptions);
}

function init() {
    initDataTableMeter();
}

$(document).ready(function () {
    init();
});
//#endregion
