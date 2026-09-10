function displayDetail(id_mesin, id_order, id_log1, id_log2) {
    fetchSelect(
        "/sp-proses/SP_1486_CIR_LIST_TRANSF_MTR_2/" +
            id_mesin +
            "~" +
            id_order +
            "~" +
            id_log1 +
            "~" +
            id_log2,
        (data) => {
            for (let i = 0; i < data.length; i++) {
                listDetail.push({
                    IdLog: data[i]["Id_Log"],
                    TanggalLog: dateTimeToDate(data[i]["Tgl_Log"]),
                    Shift: data[i]["Shift"],
                    StatusLog: data[i]["nama_status_log"],
                    CountAwal: data[i]["Counter_mesin_awal"],
                    CountAkhir: data[i]["Counter_mesin_akhir"],
                    JamAwal: dateTimeToTime(data[i]["Awal_jam_kerja"]),
                    JamAkhir: dateTimeToTime(data[i]["Akhir_jam_kerja"]),
                });
            }

            updateTableDetail();
        }
    );
}

function updateTableDetail() {
    if ($.fn.DataTable.isDataTable("#table_detail")) {
        $("#table_detail").DataTable().destroy();
    }

    var dataTableOptions = {
        responsive: true,
        scrollY: tableHeight + "px",
        scrollX: true,

        columns: [
            {
                data: "IdLog",
                width: "100px",
            },
            {
                data: "TanggalLog",
                width: "90px",
            },
            {
                data: "Shift",
                width: "0px",
            },
            {
                data: "StatusLog",
                width: "185px",
            },
            {
                data: "CountAwal",
                width: "100px",
            },
            {
                data: "CountAkhir",
                width: "100px",
            },
            {
                data: "JamAwal",
                width: "90px",
            },
            {
                data: "JamAkhir",
                width: "90px",
            },
        ],

        language: {
            searchPlaceholder: " Pencarian...",
            search: "",
            lengthMenu: "Menampilkan _MENU_ data",
            info: "Total data: _TOTAL_",
            paginate: {
                previous: "Sebelumnya",
                next: "Berikutnya",
            },
        },

        initComplete: function () {
            var searchInput = $('input[type="search"]');

            searchInput = $('input[type="search"]')
                .eq(1)
                .addClass("form-control");
            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    };

    var tableDetail = $("#table_detail").DataTable(dataTableOptions);
    for (let i = 0; i < listDetail.length; i++) {
        tableDetail.row.add(listDetail[i]);

        if (i == listDetail.length - 1) {
            tableDetail.draw();
        }
    }
}

function hitungMeter(id_mesin, id_order, id_log) {
    fetchSelect(
        "/sp-proses/SP_1486_CIR_LIST_TRANSF_MTR_3/" +
            id_mesin +
            "~" +
            id_order +
            "~" +
            id_log,
        (data) => {
            let meter = data[0]["Hasil_Meter"];
            let id_log_awal = data[0]["Id_Log_Awal"] || 0;

            let currIndex = selectedRow["NomorKu"];
            let currData = tableMeter.row(currIndex).data();
            currData["Meter"] = meter;
            currData["IdLogAwal"] = id_log_awal;

            listMeter.push({
                NomorKu: currIndex,
                Meter: meter,
                IdLogAwal: id_log_awal,
            });

            tableMeter.draw();
            tableMeter.off("draw.dt");
            tableMeter.on("draw.dt", function () {
                tableMeter
                    .row(currIndex)
                    .nodes()
                    .to$()
                    .addClass("row_selected");
            });

            displayDetail(
                selectedRow["IdMesin"],
                selectedRow["IdOrder"],
                selectedRow["IdLog"],
                selectedRow["IdLogAwal"]
            );
        }
    );
}

formSubmit.addEventListener("submit", function (event) {
    if (selectedRow) {
        hidMesin.value = selectedRow["IdMesin"];
        hidOrder.value = selectedRow["IdOrder"];
        hidLog.value = selectedRow["IdLog"];
        hidMeter.value = selectedRow["Meter"] || 0;
    } else {
        event.preventDefault();
        event.stopPropagation();
        showToast("Belum ada data yang dipilih!");
    }
});

btnRefresh.addEventListener("click", function () {
    displayMeter();
    listDetail.length = 0;
});

const listDetail = [
    /** ISI LIST DETAIL
     * 0 IdLog
     * 1 TanggalLog
     * 2 Shift
     * 3 StatusLog
     * 4 CountAwal
     * 5 CountAkhir
     * 6 JamAwal
     * 7 JamAkhir
     */
];

const listMeter = [
    /** ISI LIST METER
     * 0 NomorKu
     * 1 Meter
     * 2 IdLogAwal
     */
];

function displayMeter() {
    if ($.fn.DataTable.isDataTable("#table_meter")) {
        $("#table_meter").DataTable().destroy();
    }

    var dataTableOptions = {
        responsive: true,
        scrollY: tableHeight + "px",
        scrollX: true,
        processing: true,
        serverSide: true,
        ordering: false,

        columns: [
            {
                data: "TanggalLog",
                width: "95px",
            },
            {
                data: "NamaMesin",
                width: "75px",
            },
            {
                data: "NamaBarang",
                width: "700px",
            },
            {
                data: "Meter",
                width: "100px",
            },
            {
                data: "IdLogAwal",
                width: "80px",
            },
            {
                data: "NoIndeks",
                width: "100px",
            },
        ],

        language: {
            searchPlaceholder: " Pencarian...",
            search: "",
            lengthMenu: "Menampilkan _MENU_ data",
            info: "Total data: _TOTAL_",
            paginate: {
                previous: "Sebelumnya",
                next: "Berikutnya",
            },
        },

        ajax: {
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
                        if (
                            json.data[i]["NomorKu"] === listMeter[j]["NomorKu"]
                        ) {
                            json.data[i]["Meter"] = listMeter[j]["Meter"];
                            json.data[i]["IdLogAwal"] =
                                listMeter[j]["IdLogAwal"];
                        }
                    }
                }

                return json.data;
            },
        },

        initComplete: function () {
            var searchInput = $('input[type="search"]');

            searchInput = $('input[type="search"]')
                .eq(0)
                .addClass("form-control");
            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    };

    tableMeter = $("#table_meter").DataTable(dataTableOptions);

    $("#table_meter tbody").off("click");
    $("#table_meter tbody").on("click", "tr", function () {
        tableMeter.rows().nodes().to$().removeClass("row_selected");
        $(this).addClass("row_selected");

        var currentRow = tableMeter.rows(".row_selected").data().toArray()[0];
        if (selectedRow && selectedRow["NomorKu"] === currentRow["NomorKu"]) {
            $(this).removeClass("row_selected");
            selectedRow = null;
        } else {
            selectedRow = tableMeter.rows(".row_selected").data().toArray()[0];
            console.log(selectedRow);
        }

        listDetail.length = 0;
        $("#table_detail").DataTable().clear().draw();

        if (selectedRow) {
            if (!selectedRow["Meter"]) {
                hitungMeter(
                    selectedRow["IdMesin"],
                    selectedRow["IdOrder"],
                    selectedRow["IdLog"]
                );
            } else {
                displayDetail(
                    selectedRow["IdMesin"],
                    selectedRow["IdOrder"],
                    selectedRow["IdLog"],
                    selectedRow["IdLogAwal"]
                );
            }
        }
    });
}
