//#region Input & Core Events
jQuery(function ($) {
    const TBln = document.getElementById("TBln");
    const TThn = document.getElementById("TThn");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const tbodyData = document.getElementById("tbodyData");
    const rangeInfo = document.getElementById("rangeInfo");
    const chartCv = document.getElementById("orderChart");

    let chartInstance = null;
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        window.location.href = "/GPS";
    });

    TBln.addEventListener("keypress", function (e) {
        if (e.key === "Enter") TThn.focus();
    });
    TThn.addEventListener("keypress", function (e) {
        if (e.key === "Enter") loadData();
    });

    // Auto re-load saat bulan/tahun diubah
    TBln.addEventListener("change", loadData);
    TThn.addEventListener("change", loadData);
    btnRefresh.addEventListener("click", loadData);
//#endregion

//#region Utility & Helper Functions
    function loadData() {
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

        tbodyData.innerHTML =
            '<tr><td colspan="2" class="text-center text-muted">Memuat data...</td></tr>';

        ajaxGet(
            window.laporanOrderConfig.routeGetData,
            { bulan: bulan, tahun: tahun },
            function (res) {
                renderTable(res.data);
                renderChart(res.data);

                if (res.range) {
                    rangeInfo.textContent =
                        "Periode: bulan " +
                        res.range.bln1 +
                        "/" +
                        res.range.thn1 +
                        " s/d " +
                        res.range.bln2 +
                        "/" +
                        res.range.thn2;
                }
            },
        );
    }

    function renderTable(data) {
        tbodyData.innerHTML = "";

        if (!data || data.length === 0) {
            tbodyData.innerHTML =
                '<tr><td colspan="2" class="text-center text-muted">Tidak ada data.</td></tr>';
            return;
        }

        let html = "";
        data.forEach(function (row) {
            html += "<tr>";
            html += '<td class="tbl-cell">' + esc(row.BulanH) + "</td>";
            html += '<td class="tbl-cell text-end">' + row.Total + "</td>";
            html += "</tr>";
        });
        tbodyData.innerHTML = html;
    }

    function renderChart(data) {
        const labels = (data || []).map(function (r) {
            return r.BulanH || "";
        });
        const values = (data || []).map(function (r) {
            return r.Total;
        });

        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }

        if (labels.length === 0) return;

        chartInstance = new Chart(chartCv, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Order Masuk",
                        data: values,
                        backgroundColor: "rgba(13, 110, 253, 0.6)",
                        borderColor: "rgba(13, 110, 253, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Jumlah Order Pengerjaan yang Masuk (12 Bulan Terakhir)",
                        font: { size: 14, weight: "bold" },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (ctx) {
                                return "Order Masuk: " + ctx.parsed.y;
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { precision: 0 },
                    },
                },
            },
        });
    }

    function esc(s) {
        return String(s == null ? "" : s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    loadData();
});
//#endregion
