function displayMeter() {
    fetchSelect("/sp-proses/Sp_Maint_Transfer~1", (data) => {
        listMeter.length = 0;

        for (let i = 0; i < data.length; i++) {
            listMeter.push({
                TanggalLog: dateTimeToDate(data[i]["Tgl_Log"]),
                NamaMesin: data[i]["Nama_mesin"],
                NamaBarang: data[i]["NAMA_BRG"],
                Meter: "",
                IdMesin: data[i]["Id_mesin"],
                IdOrder: data[i]["Id_order"],
                IdLog: data[i]["Id_Log"],
                IdLogAwal: "",
                NoIndeks: data[i]["noIndek"],
            });
        }

        updateTableMeter();
    });
}

function updateTableMeter() {
    populateTable("table_meter", listMeter, {
        colSizes: [95, 90, 700, 0, 80, 0],
        tableIndex: 1,
        headers: [
            "Tanggal",
            "Nama Mesin",
            "Nama Order",
            "Meter",
            "Id Log Awal",
            "Index",
        ],
        keyOrder: [
            "TanggalLog",
            "NamaMesin",
            "NamaBarang",
            "Meter",
            "IdLogAwal",
            "NoIndeks",
        ],
        rowClick: true,
        rowEventHandler: (_, index) => {
            hitungMeter(
                listMeter[index]["IdMesin"],
                listMeter[index]["IdOrder"],
                listMeter[index]["IdLog"],
                index,
                () => {
                    displayDetail(
                        listMeter[index]["IdMesin"],
                        listMeter[index]["IdOrder"],
                        listMeter[index]["IdLog"],
                        listMeter[index]["IdLogAwal"]
                    );
                }
            );
        },
        rowEmptyHandler: () => {
            listDetail.length = 0;
            updateTableDetail();
        },
    });
}

function updateTableDetail() {
    populateTable("table_detail", listDetail, {
        colSizes: [100, 90, 0, 185, 100, 100, 90, 90],
        tableIndex: 2,
        headers: [
            "Id Log",
            "Tanggal",
            "Shift",
            "Status Log",
            "Counter Awal",
            "Counter Akhir",
            "Jam Awal",
            "Jam Akhir",
        ],
        keyOrder: [
            "IdLog",
            "TanggalLog",
            "Shift",
            "StatusLog",
            "CountAwal",
            "CountAkhir",
            "JamAwal",
            "JamAkhir",
        ],
    });
}

function hitungMeter(id_mesin, id_order, id_log, i, post_action = null) {
    let [meter, id_log_awal] = [0, 0];

    fetchSelect(
        "/sp-proses/SP_1486_CIR_LIST_TRANSF_MTR_3/" +
            id_mesin +
            "~" +
            id_order +
            "~" +
            id_log,
        (data) => {
            meter = data[0]["Hasil_Meter"];
            id_log_awal = data[0]["Id_Log_Awal"];
            if (!id_log_awal) id_log_awal = 0;

            listMeter[i]["Meter"] = meter;
            listMeter[i]["IdLogAwal"] = id_log_awal;

            updateTableMeter();
            selectThisRow("table_meter", dt_selected[2]);

            if (post_action) {
                post_action();
            }
        }
    );
}

formSubmit.addEventListener("submit", function (event) {
    let isValid = true;
    let errorMsg = "";

    if (!dt_selected) {
        isValid = false;
        errorMsg = "Belum ada data yang dipilih!";
    } else {
        let row_selected = dt_selected[2];

        hidMesin.value = listMeter[row_selected]["IdMesin"];
        hidOrder.value = listMeter[row_selected]["IdOrder"];
        hidLog.value = listMeter[row_selected]["IdLog"];
        hidMeter.value = listMeter[row_selected]["Meter"]
            ? listMeter[row_selected]["Meter"]
            : 0;
    }

    if (!isValid) {
        event.preventDefault();
        event.stopPropagation();
        showToast(errorMsg);
    }
});
