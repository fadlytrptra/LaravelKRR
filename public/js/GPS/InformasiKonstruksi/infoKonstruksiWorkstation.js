//#region Variabel DOM Elements
jQuery(function ($) {
    const TWorkSts = document.getElementById("TWorkSts");
    const TNoWorkSts = document.getElementById("TNoWorkSts");
    const btnWrkSts = document.getElementById("btnWrkSts");
    const Date1 = document.getElementById("Date1");
    const Date2 = document.getElementById("Date2");
    const btnOK = document.getElementById("btnOK");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const tbodyJadwal = document.getElementById("tbodyJadwal");
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        window.location.href = "/GPS";
    });

    btnWrkSts.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Work Station",
            url: window.infKonsWsConfig.routeGetWorkstationList,
            headers: ["ID", "Nama Work Station"],
            columns: ["NoWrkSts", "NamaWorkStation"],
            onSelect: function (row) {
                TNoWorkSts.value = row.NoWrkSts;
                TWorkSts.value = row.NamaWorkStation;
                Date1.focus();
            },
        });
    });

    Date1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") Date2.focus();
    });

    Date2.addEventListener("keypress", function (e) {
        if (e.key === "Enter") btnOK.focus();
    });

    btnOK.addEventListener("click", function () {
        const worksts = TNoWorkSts.value.trim();
        const date1 = Date1.value;
        const date2 = Date2.value;

        if (!worksts) {
            Swal.fire("Info", "Pilih Work Station terlebih dahulu.", "info");
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

        loadData(worksts, date1, date2);
    });

    btnRefresh.addEventListener("click", function () {
        btnOK.click();
    });
//#endregion

//#region Utility & Helper Functions
    function loadData(worksts, date1, date2) {
        ajaxGet(
            window.infKonsWsConfig.routeGetJadwal,
            { worksts: worksts, date1: date1, date2: date2 },
            function (data) {
                renderTable(data);
            },
        );
    }

    function renderTable(data) {
        tbodyJadwal.innerHTML = "";

        if (!data || data.length === 0) {
            tbodyJadwal.innerHTML =
                '<tr><td colspan="15" class="text-center">Tidak ada jadwal pada rentang tanggal ini untuk Work Station tersebut.</td></tr>';
            return;
        }

        let html = "";
        for (const row of data) {
            // Map statusWarna → CSS class
            const statusClass = "row-" + row.statusWarna;

            html += `<tr class="${statusClass}">`;
            html += `<td class="tbl-cell">${row.Nomer}</td>`;
            html += `<td class="tbl-cell">${row.NoOrder}</td>`;
            html += `<td class="tbl-cell">${row.TglStart}</td>`;
            html += `<td class="tbl-cell">${row.Divisi}</td>`;
            html += `<td class="tbl-cell">${row.NamaBarang}</td>`;
            html += `<td class="tbl-cell">${row.NamaBagian}</td>`;
            html += `<td class="tbl-cell">${row.StatusOrder}</td>`;
            html += `<td class="tbl-cell">${row.EstTime}</td>`;
            html += `<td class="tbl-cell text-center">${row.HariKe}</td>`;
            html += `<td class="tbl-cell">${row.TglFinish}</td>`;
            html += `<td class="tbl-cell">${row.RealTime}</td>`;
            html += `<td class="tbl-cell">${row.Keterangan}</td>`;
            html += `<td class="tbl-cell">${row.SetujuKR}</td>`;
            html += `<td class="tbl-cell">${row.KetTdkSetujuKR}</td>`;
            html += `<td class="tbl-cell">${row.TdkSetujuKR}</td>`;
            html += `</tr>`;
        }
        tbodyJadwal.innerHTML = html;
    }
});
//#endregion
