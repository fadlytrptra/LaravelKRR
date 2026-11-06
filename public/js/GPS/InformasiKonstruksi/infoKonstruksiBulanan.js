//#region Variabel DOM Elements
jQuery(function ($) {
    const Date1 = document.getElementById("Date1");
    const Date2 = document.getElementById("Date2");
    const btnOK = document.getElementById("btnOK");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const tbodyData = document.getElementById("tbodyData");
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        window.location.href = "/GPS";
    });

    Date1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") Date2.focus();
    });
    Date2.addEventListener("keypress", function (e) {
        if (e.key === "Enter") btnOK.focus();
    });

    btnOK.addEventListener("click", function () {
        const date1 = Date1.value;
        const date2 = Date2.value;

        if (!date1 || !date2) {
            Swal.fire("Info", "Isi rentang tanggal.", "info");
            return;
        }
        if (new Date(date2) < new Date(date1)) {
            Swal.fire("Info", "Tanggal akhir harus >= tanggal awal.", "info");
            return;
        }

        loadData(date1, date2);
    });

    btnRefresh.addEventListener("click", function () {
        btnOK.click();
    });
//#endregion

//#region Utility & Helper Functions
    // SP_5298_PJW_INF-JDW-KONSTRUKSI + SP_5298_PJW_INF-KONSTRUKSI-PER-ORDER-3 (kode=2)
    function loadData(date1, date2) {
        ajaxPost(
            window.infKonsBlnConfig.routeGetData,
            { date1: date1, date2: date2 },
            null,
            null,
            function (data) {
                renderTable(data);
            },
        );
    }

    function renderTable(data) {
        tbodyData.innerHTML = "";

        if (!data || data.length === 0) {
            tbodyData.innerHTML =
                '<tr><td colspan="34" class="text-center">Tidak ada data.</td></tr>';
            return;
        }

        let html = "";
        for (const row of data) {
            const rowClass = row.isFinish ? "row-finish" : "";

            html += `<tr class="${rowClass}">`;
            html += `<td class="tbl-cell">${row.NoOrder}</td>`;
            html += `<td class="tbl-cell">${row.NamaBarang}</td>`;
            html += `<td class="tbl-cell">${row.NamaBagian}</td>`;

            // Kolom hari 1..31
            for (let d = 1; d <= 31; d++) {
                const v = row.cells[d] || "";
                html += `<td class="tbl-cell day-cell">${v}</td>`;
            }

            html += `</tr>`;
        }
        tbodyData.innerHTML = html;
    }
});
//#endregion
