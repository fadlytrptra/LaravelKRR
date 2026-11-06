//#region Variabel DOM Elements
jQuery(function ($) {
    const OptHarian = document.getElementById("OptHarian");
    const OptProyek = document.getElementById("OptProyek");
    const TNoOd = document.getElementById("TNoOd");
    const TDivisi = document.getElementById("TDivisi");
    const TKdBrg = document.getElementById("TKdBrg");
    const TNamaBrg = document.getElementById("TNamaBrg");
    const TNoGbr = document.getElementById("TNoGbr");
    const TJml = document.getElementById("TJml");
    const TMulai = document.getElementById("TMulai");
    const TSelesai = document.getElementById("TSelesai");
    const TKetOrder = document.getElementById("TKetOrder");
    const TMesin = document.getElementById("TMesin");
    const TUserOrder = document.getElementById("TUserOrder");
    const TBagian = document.getElementById("TBagian");
    const TIdBagian = document.getElementById("TIdBagian");
    const btnBagian = document.getElementById("btnBagian");
    const TBln = document.getElementById("TBln");
    const TThn = document.getElementById("TThn");
    const btnOK = document.getElementById("btnOK");
    const btnKeluar = document.getElementById("btnKeluar");
    const dayGrid = document.getElementById("dayGrid");
//#endregion

//#region Input & Core Events
    OptHarian.addEventListener("change", function () {
        if (this.checked) resetAll();
    });
    OptProyek.addEventListener("change", function () {
        if (this.checked) resetAll();
    });

    btnKeluar.addEventListener("click", function () {
        window.location.href = "/GPS";
    });

    // Enter di No Order → load order
    TNoOd.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let v = this.value.trim();
            if (v !== "") {
                v = v.padStart(6, "0").slice(-6);
                this.value = v;
                clearOrderDetail();
                loadOrder(v);
            } else {
                Swal.fire("Info", "Isi Nomer Ordernya.", "info");
            }
        }
    });

    TBln.addEventListener("keypress", function (e) {
        if (e.key === "Enter") TThn.focus();
    });
    TThn.addEventListener("keypress", function (e) {
        if (e.key === "Enter") btnOK.focus();
    });

    // SP_5298_PJW_LIST-BAGIAN-BARANG
    btnBagian.addEventListener("click", function () {
        const noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire("Info", "Isi nomor order terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Bagian Barang",
            url:
                window.grafikOrderConfig.routeGetBagianList +
                "?noOd=" +
                encodeURIComponent(noOd) +
                "&jenisOd=" +
                getJenisOd(),
            headers: ["ID", "Nama Bagian"],
            columns: ["IdBagian", "NamaBagian"],
            onSelect: function (row) {
                TIdBagian.value = row.IdBagian;
                TBagian.value = row.NamaBagian;
                TBln.focus();
            },
        });
    });

    // SP_5298_PJW_INF-JADWAL-PER-ORDER kode=2 (H) / 3 (P)
    btnOK.addEventListener("click", function () {
        const noOd = TNoOd.value.trim();
        const idBag = TIdBagian.value.trim();
        const bulan = parseInt(TBln.value);
        const tahun = parseInt(TThn.value);

        if (!noOd) {
            Swal.fire("Info", "Isi nomor order.", "info");
            return;
        }
        if (!idBag) {
            Swal.fire("Info", "Pilih bagian terlebih dahulu.", "info");
            return;
        }
        if (!bulan || bulan < 1 || bulan > 12) {
            Swal.fire("Info", "Bulan tidak valid (1-12).", "info");
            return;
        }
        if (!tahun || tahun < 2000 || tahun > 2100) {
            Swal.fire("Info", "Tahun tidak valid.", "info");
            return;
        }

        ajaxGet(
            window.grafikOrderConfig.routeGetJadwal,
            {
                noOd: noOd,
                idBag: parseInt(idBag),
                jenisOd: getJenisOd(),
                bulan: bulan,
                tahun: tahun,
            },
            function (data) {
                renderChart(data);
            },
        );
    });
//#endregion

//#region Utility & Helper Functions

    function getJenisOd() {
        return OptHarian.checked ? "H" : "P";
    }

    // SP_5298_PJW_LIST-ORDER-KERJA/PROYEK kode=2
    function loadOrder(noOd) {
        ajaxGet(
            window.grafikOrderConfig.routeGetOrder,
            { noOd: noOd, jenisOd: getJenisOd() },
            function (data) {
                TDivisi.value = data.TDivisi || "";
                TKdBrg.value = data.TKdBrg || "";
                TNamaBrg.value = data.TNamaBrg || "";
                TNoGbr.value = data.TNoGbr || "";
                TJml.value = data.TJml || "";
                TMulai.value = data.TMulai || "";
                TSelesai.value = data.TSelesai || "";
                TKetOrder.value = data.TKetOrder || "";
                TMesin.value = data.TMesin || "";
                TUserOrder.value = data.TUserOrder || "";

                // Reset bagian + chart
                TBagian.value = "";
                TIdBagian.value = "";
                clearChart();

                btnBagian.focus();
            },
        );
    }

    function renderChart(data) {
        dayGrid.innerHTML = "";
        if (!data || !data.days || data.days.length === 0) {
            dayGrid.innerHTML =
                '<div class="text-center w-100 text-muted">Tidak ada data.</div>';
            return;
        }

        let html = "";
        data.days.forEach(function (d) {
            const cls = d.hasJd ? "day-card has-jd" : "day-card";
            html += '<div class="' + cls + '">';
            html += '<div class="day-label">' + d.day + "</div>";

            if (d.hasJd) {
                html +=
                    '<div class="day-bar" style="display: flex; align-items: center; padding-top: 6px;">';
                html +=
                    '  <div style="width: 100%; height: 16px; background-color: orangered; border-radius: 3px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);"></div>';
                html += "</div>";
            } else {
                html += '<div class="day-bar"></div>';
            }

            html += "</div>";
        });
        dayGrid.innerHTML = html;
    }

    function clearChart() {
        dayGrid.innerHTML =
            '<div class="text-center w-100 text-muted">Belum ada data. Isi No Order & Bagian, lalu tekan OK.</div>';
    }

    function clearOrderDetail() {
        TDivisi.value = "";
        TKdBrg.value = "";
        TNamaBrg.value = "";
        TNoGbr.value = "";
        TJml.value = "";
        TMulai.value = "";
        TSelesai.value = "";
        TKetOrder.value = "";
        TMesin.value = "";
        TUserOrder.value = "";
        TBagian.value = "";
        TIdBagian.value = "";
        clearChart();
    }

    function clearAll() {
        clearOrderDetail();
    }

    function resetAll() {
        clearOrderDetail();
        TNoOd.value = "";
        // OptHarian.checked = true;
        // OptProyek.checked = false;
        TNoOd.focus();
    }

    // init
    clearChart();
});
//#endregion
