//#region Variabel DOM Elements
jQuery(function ($) {
    const TBln = document.getElementById("TBln");
    const TThn = document.getElementById("TThn");
    const btnOK = document.getElementById("btnOK");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const tbodyData = document.getElementById("tbodyData");
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        window.location.href = "/GPS";
    });

    TBln.addEventListener("keypress", function (e) {
        if (e.key === "Enter") TThn.focus();
    });
    TThn.addEventListener("keypress", function (e) {
        if (e.key === "Enter") btnOK.focus();
    });

    // Auto re-load
    TBln.addEventListener("change", autoLoad);
    TThn.addEventListener("change", autoLoad);

    btnOK.addEventListener("click", autoLoad);
    btnRefresh.addEventListener("click", autoLoad);
//#endregion

//#region Utility & Helper Functions
    // SP_5298_PJW_INF-JDW-TRANSAKSI + SP_5298_PJW_INF-JADWAL-PER-ORDER-3
    function loadData(bulan, tahun) {
        tbodyData.innerHTML =
            '<tr><td colspan="34" class="text-center text-muted">Memuat data...</td></tr>';

        ajaxPost(
            window.grafikBulananConfig.routeGetData,
            { bulan: bulan, tahun: tahun },
            null,
            null,
            function (response) {
                renderTable(response);
            },
            function (xhr) {
                tbodyData.innerHTML =
                    '<tr><td colspan="34" class="text-center text-danger">Gagal memuat data.</td></tr>';
                Swal.fire(
                    "Error",
                    (xhr.responseJSON && xhr.responseJSON.error) ||
                        "Terjadi kesalahan.",
                    "error",
                );
            },
        );
    }

    function renderTable(response) {
        if (!response || !response.data || response.data.length === 0) {
            tbodyData.innerHTML =
                '<tr><td colspan="34" class="text-center text-muted">Tidak ada data pada bulan/tahun tersebut.</td></tr>';
            return;
        }

        const daysInMonth = response.daysInMonth || 31;
        let html = "";

        response.data.forEach(function (row) {
            const rowClass = row.Finish === "Y" ? "row-finish-total" : "";
            html += '<tr class="' + rowClass + '">';
            html +=
                '<td class="tbl-cell col-fixed">' +
                escapeHtml(row.NoOrder) +
                "</td>";
            html +=
                '<td class="tbl-cell col-fixed">' +
                escapeHtml(row.NamaBarang) +
                "</td>";
            html +=
                '<td class="tbl-cell col-fixed">' +
                escapeHtml(row.NamaBagian) +
                "</td>";

            for (let d = 1; d <= 31; d++) {
                const val = row.days[d] || "";
                if (d > daysInMonth) {
                    html +=
                        '<td class="tbl-cell text-center day-cell day-hidden"></td>';
                } else {
                    const cls =
                        val === "#" ? "day-cancel" : val === "X" ? "day-x" : "";
                    html +=
                        '<td class="tbl-cell text-center day-cell ' +
                        cls +
                        '">' +
                        val +
                        "</td>";
                }
            }
            html += "</tr>";
        });

        tbodyData.innerHTML = html;
    }

    function autoLoad() {
        const bulan = parseInt(TBln.value);
        const tahun = parseInt(TThn.value);

        if (!bulan || bulan < 1 || bulan > 12) {
            Swal.fire("Info", "Bulan tidak valid (1-12).", "info");
            return;
        }
        if (!tahun || tahun < 2000 || tahun > 2100) {
            Swal.fire("Info", "Tahun tidak valid.", "info");
            return;
        }
        loadData(bulan, tahun);
    }

    function escapeHtml(s) {
        return String(s || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    autoLoad();
});
//#endregion
