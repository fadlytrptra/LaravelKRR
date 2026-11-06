//#region Variabel DOM Elements
jQuery(function ($) {
    const TNoOd = document.getElementById("TNoOd");
    const TDivisi = document.getElementById("TDivisi");
    const TKdBrg = document.getElementById("TKdBrg");
    const TNoGbr = document.getElementById("TNoGbr");
    const TNamaBrg = document.getElementById("TNamaBrg");
    const TMesin = document.getElementById("TMesin");
    const TUserOrder = document.getElementById("TUserOrder");
    const TKetOrder = document.getElementById("TKetOrder");
    const OdSts = document.getElementById("OdSts");
    const TBagian = document.getElementById("TBagian");
    const TIdBagian = document.getElementById("TIdBagian");
    const btnBagian = document.getElementById("btnBagian");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const tbodyJadwal = document.getElementById("tbodyJadwal");
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        window.location.href = "/GPS";
    });

    TNoOd.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let noOdVal = this.value.trim();
            if (noOdVal !== "") {
                noOdVal = noOdVal.padStart(6, "0").slice(-6);
                this.value = noOdVal;
                loadOrder(noOdVal);
            } else {
                Swal.fire("Info", "Isi Nomer Ordernya", "info");
            }
        }
    });

    btnBagian.addEventListener("click", function () {
        const noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire("Info", "Isi nomor order terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Bagian Gambar",
            url:
                window.infKonsOrderConfig.routeGetBagianList +
                "?noOd=" +
                safeUrlParam(noOd),
            headers: ["ID", "Nama Bagian"],
            columns: ["IdBagian", "NamaBagian"],
            onSelect: function (row) {
                TIdBagian.value = row.IdBagian;
                TBagian.value = row.NamaBagian;
                loadJadwal(noOd, row.IdBagian);
            },
        });
    });

    btnRefresh.addEventListener("click", function () {
        const noOd = TNoOd.value.trim();
        const idBagian = TIdBagian.value.trim();
        if (noOd && idBagian) {
            loadJadwal(noOd, idBagian);
        } else {
            Swal.fire(
                "Info",
                "Isi nomor order dan pilih bagian terlebih dahulu.",
                "info",
            );
        }
    });
//#endregion

//#region Utility & Helper Functions
    function loadOrder(noOd) {
        ajaxGet(
            window.infKonsOrderConfig.routeGetOrder,
            { noOd: noOd },
            function (data) {
                TDivisi.value = data.TDivisi;
                TKdBrg.value = data.TKdBrg;
                TNamaBrg.value = data.TNamaBrg;
                TNoGbr.value = data.TNoGbr;
                OdSts.textContent = data.OdSts;
                TKetOrder.value = data.TKetOrder;
                TMesin.value = data.TMesin;
                TUserOrder.value = data.TUserOrder;

                // Reset bagian & tabel
                TBagian.value = "";
                TIdBagian.value = "";
                clearTable();

                btnBagian.focus();
            },
        ).fail(function (xhr) {
            if (xhr.status === 400 || xhr.status === 404) {
                clearAll();
                TNoOd.value = "";
                TNoOd.focus();
            }
        });
    }

    function loadJadwal(noOd, idBagian) {
        ajaxGet(
            window.infKonsOrderConfig.routeGetJadwal,
            { noOd: noOd, idBag: idBagian },
            function (data) {
                renderTable(data);
            },
        );
    }

    function renderTable(data) {
        tbodyJadwal.innerHTML = "";

        if (!data || data.length === 0) {
            tbodyJadwal.innerHTML =
                '<tr><td colspan="11" class="text-center">Tidak ada jadwal konstruksi untuk order & bagian ini.</td></tr>';
            return;
        }

        let html = "";
        for (const row of data) {
            const statusClass = "row-" + row.statusWarna;

            html += `<tr class="${statusClass}">`;
            html += `<td class="tbl-cell">${row.Nomer}</td>`;
            html += `<td class="tbl-cell">${row.TglStart}</td>`;
            html += `<td class="tbl-cell">${row.WorkStation}</td>`;
            html += `<td class="tbl-cell">${row.EstTime}</td>`;
            html += `<td class="tbl-cell text-center">${row.HariKe}</td>`;
            html += `<td class="tbl-cell">${row.TglFinish}</td>`;
            html += `<td class="tbl-cell">${row.RealTime}</td>`;
            html += `<td class="tbl-cell">${row.Keterangan}</td>`;
            html += `<td class="tbl-cell">${row.SetujuKR}</td>`;
            html += `<td class="tbl-cell">${row.KetTdkSetujuKR}</td>`;
            html += `<td class="tbl-cell">${row.TglTdkSetujuKR}</td>`;
            html += `</tr>`;
        }
        tbodyJadwal.innerHTML = html;
    }

    function clearTable() {
        tbodyJadwal.innerHTML =
            '<tr><td colspan="11" class="text-center">Belum ada data.</td></tr>';
    }

    function clearAll() {
        TDivisi.value = "";
        TKdBrg.value = "";
        TNamaBrg.value = "";
        TNoGbr.value = "";
        OdSts.textContent = "";
        TKetOrder.value = "";
        TMesin.value = "";
        TUserOrder.value = "";
        TBagian.value = "";
        TIdBagian.value = "";
        clearTable();
    }
});
//#endregion
