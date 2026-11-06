//#region Variabel DOM Elements
jQuery(function ($) {
    const TBln = document.getElementById("TBln");
    const TThn = document.getElementById("TThn");
    const btnOk = document.getElementById("btnOk");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const tbodyData = document.getElementById("tbodyData");
    const rangeInfo = document.getElementById("rangeInfo");
    const chartCv = document.getElementById("hasilChart");

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
        if (e.key === "Enter") btnOk.focus();
    });

    TBln.addEventListener("change", loadData);
    TThn.addEventListener("change", loadData);
    btnOk.addEventListener("click", loadData);
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
            '<tr><td colspan="6" class="text-center text-muted">Memuat data...</td></tr>';

        ajaxGet(
            window.laporanHasilConfig.routeGetData,
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
                '<tr><td colspan="6" class="text-center text-muted">Tidak ada data.</td></tr>';
            return;
        }

        let html = "";
        data.forEach(function (row) {
            html += "<tr>";
            html += '<td class="tbl-cell">' + esc(row.Bulan) + "</td>";
            html +=
                '<td class="tbl-cell text-end">' +
                fmt(row.BiayaKerja) +
                "</td>";
            html +=
                '<td class="tbl-cell text-end">' +
                fmt(row.BiayaMakloon) +
                "</td>";
            html +=
                '<td class="tbl-cell text-end">' +
                fmt(row.BiayaMaterial) +
                "</td>";
            html +=
                '<td class="tbl-cell text-end">' +
                fmt(row.BiayaSpart) +
                "</td>";
            html += '<td class="tbl-cell text-end">' + fmt(row.Total) + "</td>";
            html += "</tr>";
        });
        tbodyData.innerHTML = html;
    }

    function renderChart(data) {
        const labels = (data || []).map(function (r) {
            return r.Bulan || "";
        });
        // Nilai total asli tetap tersedia bila perlu digunakan..
        const values = (data || []).map(function (r) {
            const totalAsli = parseFloat(r.Total) || 0;
            // return totalAsli;

            // Nilai dipotong dan mengambil angka awal
            let nilaiChart = Math.trunc(totalAsli).toString();
            if (nilaiChart.length === 9) {
                nilaiChart = nilaiChart.substring(0, 3);
            } else if (nilaiChart.length === 8) {
                nilaiChart = nilaiChart.substring(0, 2);
            } else if (nilaiChart.length === 7) {
                nilaiChart = nilaiChart.substring(0, 1);
            }

            return parseInt(nilaiChart, 10) || 0;
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
                        // label: "Hasil Pengerjaan (juta Rp)",
                        data: values,
                        backgroundColor: "rgba(25, 135, 84, 0.6)",
                        borderColor: "rgba(25, 135, 84, 1)",
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
                        text: "Hasil Pengerjaan per Bulan",
                        font: { size: 14, weight: "bold" },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (ctx) {
                                return (
                                    // "Nilai chart VB: " +
                                    "Rp " +
                                    ctx.parsed.y.toLocaleString("en-US", {
                                        maximumFractionDigits: 0,
                                    }) + " juta"
                                );
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0,
                            callback: function (value) {
                                return Number(value).toLocaleString("en-US");
                            },
                        },
                    },
                },
            },
        });
    }

    function fmt(v) {
        const n = parseFloat(v) || 0;
        return n.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
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
