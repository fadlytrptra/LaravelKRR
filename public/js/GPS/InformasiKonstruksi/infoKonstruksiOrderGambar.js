//#region Variabel DOM Elements
jQuery(function ($) {
    const Date1 = document.getElementById("Date1");
    const Date2 = document.getElementById("Date2");
    const btnOK = document.getElementById("btnOK");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnTotal = document.getElementById("btnTotal");
    const btnKeluar = document.getElementById("btnKeluar");
    const TTotalBiaya = document.getElementById("TTotalBiaya");
    const tbodyOrder = document.getElementById("tbodyOrder");
    const tblOrder = document.getElementById("tblOrder");

    let currentData = [];
    let currentTotalBiaya = 0;
    let sortCol = null;
    let sortAsc = true;
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

    btnTotal.addEventListener("click", function () {
        if (!window.infKonsOgConfig.btnTotalEnabled) return;
        TTotalBiaya.value = currentTotalBiaya;
    });

    tblOrder.querySelectorAll("th.tbl-hdr").forEach((th) => {
        th.addEventListener("click", function () {
            const col = parseInt(this.dataset.col);
            if (sortCol === col) {
                sortAsc = !sortAsc;
            } else {
                sortCol = col;
                sortAsc = true;
            }
            sortData();
            renderTable();
        });
    });
//#endregion

//#region Utility & Helper Functions
    function loadData(date1, date2) {
        ajaxPost(
            window.infKonsOgConfig.routeGetData,
            { date1: date1, date2: date2 },
            null,
            null,
            function (response) {
                currentData = response.data || [];
                currentTotalBiaya = response.totalBiaya || "0";
                TTotalBiaya.value = "0";
                sortCol = null;
                sortAsc = true;
                renderTable();
            },
        );
    }

    function sortData() {
        if (sortCol === null) return;

        const keyMap = [
            "NoOrder",
            "Divisi",
            "NamaBarang",
            "NamaBagian",
            "StatusOrder",
            "TglStart",
            "TglFinish",
            "TotalBiayaRaw",
        ];
        const key = keyMap[sortCol];

        currentData.sort((a, b) => {
            const va = a[key] ?? "";
            const vb = b[key] ?? "";
            let cmp;
            if (typeof va === "number" && typeof vb === "number") {
                cmp = va - vb;
            } else {
                cmp = String(va).localeCompare(String(vb));
            }
            return sortAsc ? cmp : -cmp;
        });
    }

    function renderTable() {
        tbodyOrder.innerHTML = "";

        if (!currentData || currentData.length === 0) {
            tbodyOrder.innerHTML =
                '<tr><td colspan="8" class="text-center">Tidak ada jadwal pada rentang tanggal ini.</td></tr>';
            return;
        }

        let html = "";
        for (const row of currentData) {
            const rowClass = row.isFinish ? "row-finish" : "";

            html += `<tr class="${rowClass}">`;
            html += `<td class="tbl-cell">`;
            html += `<input type="checkbox" class="order-checkbox me-2" value="${row.NoOrder}" data-no-order="${row.NoOrder}" aria-label="Pilih order ${row.NoOrder}">`;
            html += `${row.NoOrder}</td>`;
            html += `<td class="tbl-cell">${row.Divisi}</td>`;
            html += `<td class="tbl-cell">${row.NamaBarang}</td>`;
            html += `<td class="tbl-cell">${row.NamaBagian}</td>`;
            html += `<td class="tbl-cell">${row.StatusOrder}</td>`;
            html += `<td class="tbl-cell">${row.TglStart}</td>`;
            html += `<td class="tbl-cell">${row.TglFinish}</td>`;
            html += `<td class="tbl-cell text-end">${row.TotalBiaya}</td>`;
            html += `</tr>`;
        }
        tbodyOrder.innerHTML = html;
    }
});
//#endregion
