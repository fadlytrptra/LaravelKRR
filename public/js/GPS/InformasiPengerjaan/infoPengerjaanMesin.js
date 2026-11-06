//#region Variabel DOM Elements
jQuery(function ($) {
    const TMesin = document.getElementById("TMesin");
    const TNoMesin = document.getElementById("TNoMesin");
    const btnMesin = document.getElementById("btnMesin");
    const TType = document.getElementById("TType");
    const TNoType = document.getElementById("TNoType");
    const btnType = document.getElementById("btnType");
    const Date1 = document.getElementById("Date1");
    const Date2 = document.getElementById("Date2");
    const btnOK = document.getElementById("btnOK");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const tbodyData = document.getElementById("tbodyData");
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        if (this.textContent.trim() === "Batal") {
            resetForm();
        } else {
            window.location.href = "/GPS";
        }
    });

    // LOOKUP MESIN (SP_5298_PJW_LIST-TYPE-MESIN kode=1)
    btnMesin.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Mesin",
            url: window.infPkjMsnConfig.routeGetMesinList,
            headers: ["ID", "Nama Mesin"],
            columns: ["NoMesin", "NamaMesin"],
            onSelect: function (row) {
                TNoMesin.value = row.NoMesin;
                TMesin.value = row.NamaMesin;
                TNoType.value = "";
                TType.value = "";
                clearTable();
                btnType.focus();
                btnKeluar.textContent = "Batal";
            },
        });
    });

    // LOOKUP TYPE MESIN (SP_5298_PJW_LIST-TYPE-MESIN kode=2)
    btnType.addEventListener("click", function () {
        if (!TNoMesin.value) {
            Swal.fire("Info", "Pilih mesin terlebih dahulu.", "info");
            return;
        }

        openLookupModal({
            title: "Pilih Type Mesin",
            url:
                window.infPkjMsnConfig.routeGetTypeList +
                "?noMesin=" +
                safeUrlParam(TNoMesin.value),
            headers: ["ID", "Nama Type"],
            columns: ["NoType", "NamaType"],
            onSelect: function (row) {
                TNoType.value = row.NoType;
                TType.value = row.NamaType;
                Date1.focus();
            },
        });
    });

    // ENTER NAVIGASI
    Date1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") Date2.focus();
    });
    Date2.addEventListener("keypress", function (e) {
        if (e.key === "Enter") btnOK.focus();
    });

    // TOMBOL OK
    btnOK.addEventListener("click", function () {
        const noMesin = TNoMesin.value.trim();
        const noType = TNoType.value.trim();
        const date1 = Date1.value;
        const date2 = Date2.value;

        if (!noMesin || !noType) {
            Swal.fire(
                "Info",
                "Pilih Mesin dan Type Mesin terlebih dahulu.",
                "info",
            );
            return;
        }
        if (!date1 || !date2) {
            Swal.fire("Info", "Isi rentang tanggal.", "info");
            return;
        }
        if (new Date(date2) < new Date(date1)) {
            Swal.fire("Info", "Tanggal akhir harus >= tanggal awal.", "info");
            return;
        }

        loadData(noMesin, noType, date1, date2);
    });

    // TOMBOL REFRESH
    btnRefresh.addEventListener("click", function () {
        btnOK.click();
    });
//#endregion

//#region Utility & Helper Functions
    // SP_5298_PJW_NOANTRI-{MESIN}-NOFINISH kode=1 + SP_5298_PJW_JADWAL-{MESIN} kode=3/4
    function loadData(noMesin, noType, date1, date2) {
        ajaxGet(
            window.infPkjMsnConfig.routeGetJadwal,
            { noMesin: noMesin, noType: noType, date1: date1, date2: date2 },
            function (data) {
                renderTable(data);
            },
        );
    }

    // RENDER TABLE
    function renderTable(data) {
        tbodyData.innerHTML = "";

        if (!data || data.length === 0) {
            tbodyData.innerHTML =
                '<tr><td colspan="19" class="text-center">Tidak ada jadwal pada rentang tanggal ini untuk mesin/type tersebut.</td></tr>';
            return;
        }

        let html = "";
        for (const row of data) {
            const rowClass = "row-" + row.statusWarna;

            html += `<tr class="${rowClass}">`;
            html += `<td class="tbl-cell">${row.Nomer}</td>`;
            html += `<td class="tbl-cell">${row.NoOrder}</td>`;
            html += `<td class="tbl-cell">${row.TglStart}</td>`;
            html += `<td class="tbl-cell">${row.Divisi}</td>`;
            html += `<td class="tbl-cell">${row.Barang}</td>`;
            html += `<td class="tbl-cell">${row.Bagian}</td>`;
            html += `<td class="tbl-cell">${row.KdBarang}</td>`;
            html += `<td class="tbl-cell">${row.NoGambar}</td>`;
            html += `<td class="tbl-cell text-end">${row.JmlOrder}</td>`;
            html += `<td class="tbl-cell">${row.StatusOrder}</td>`;
            html += `<td class="tbl-cell">${row.EstTime}</td>`;
            html += `<td class="tbl-cell text-end">${row.JmlDikerjakan}</td>`;
            html += `<td class="tbl-cell">${row.TglOperator}</td>`;
            html += `<td class="tbl-cell">${row.RealTime}</td>`;
            html += `<td class="tbl-cell text-end">${row.JmlFinish}</td>`;
            html += `<td class="tbl-cell">${row.Keterangan}</td>`;
            html += `<td class="tbl-cell">${row.TglKepRegu}</td>`;
            html += `<td class="tbl-cell">${row.KetTdkSetuju}</td>`;
            html += `<td class="tbl-cell">${row.TglAccPPIC}</td>`;
            html += `</tr>`;
        }
        tbodyData.innerHTML = html;
    }

    // CLEAR TABLE
    function clearTable() {
        tbodyData.innerHTML =
            '<tr><td colspan="19" class="text-center">Belum ada data.</td></tr>';
    }
});
//#endregion
