//#region Variabel DOM Elements
jQuery(function ($) {
    const OptHarian = document.getElementById("OptHarian");
    const OptProyek = document.getElementById("OptProyek");
    const TNoOd = document.getElementById("TNoOd");
    const TDivisi = document.getElementById("TDivisi");
    const TKdBrg = document.getElementById("TKdBrg");
    const TNoGbr = document.getElementById("TNoGbr");
    const TNamaBrg = document.getElementById("TNamaBrg");
    const TJml = document.getElementById("TJml");
    const TMesin = document.getElementById("TMesin");
    const TUserOrder = document.getElementById("TUserOrder");
    const TKetOrder = document.getElementById("TKetOrder");
    const OdSts = document.getElementById("OdSts");
    const TBagian = document.getElementById("TBagian");
    const TIdBagian = document.getElementById("TIdBagian");
    const btnBagian = document.getElementById("btnBagian");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const tbodyData = document.getElementById("tbodyData");

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

    // SP_5298_PJW_LIST-ORDER-KERJA kode=2 / SP_5298_PJW_LIST-ORDER-PROYEK kode=2
    TNoOd.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let noOdVal = this.value.trim();
            if (noOdVal !== "") {
                noOdVal = noOdVal.padStart(6, "0").slice(-6);
                this.value = noOdVal;
                clearDataOnly();
                loadOrder(noOdVal);
            } else {
                Swal.fire("Info", "Isi Nomer Ordernya", "info");
            }
        }
    });

    // SP_5298_PJW_LIST-BAGIAN-BARANG (@noOd, @jenisOd)
    btnBagian.addEventListener("click", function () {
        const noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire("Info", "Isi nomor order terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Bagian Barang",
            url:
                window.infPkjOrderConfig.routeGetBagianList +
                "?noOd=" +
                encodeURIComponent(noOd) +
                "&jenisOd=" +
                getJenisOd(),
                headers: ["ID", "Nama Bagian"],
                columns: ["IdBagian", "NamaBagian"],
                onSelect: function (row) {
                    TIdBagian.value = row.IdBagian;
                    TBagian.value = row.NamaBagian;
                    // Setelah pilih bagian → langsung LoadOpr (kode 5/6)
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
    function getJenisOd() {
        return OptHarian.checked ? "H" : "P";
    }
    
    function loadOrder(noOd) {
        ajaxGet(
            window.infPkjOrderConfig.routeGetOrder,
            { noOd: noOd, jenisOd: getJenisOd() },
            function (data) {
                TDivisi.value = data.TDivisi;
                TKdBrg.value = data.TKdBrg;
                TNamaBrg.value = data.TNamaBrg;
                TNoGbr.value = data.TNoGbr;
                TJml.value = data.TJml;
                OdSts.textContent = data.OdSts;
                TKetOrder.value = data.TKetOrder;
                TMesin.value = data.TMesin;
                TUserOrder.value = data.TUserOrder;

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

    // SP_5298_PJW_INF-JADWAL-PER-ORDER kode=5 (H) / 6 (P)
    function loadJadwal(noOd, idBagian) {
        ajaxGet(
            window.infPkjOrderConfig.routeGetJadwal,
            { noOd: noOd, idBag: parseInt(idBagian), jenisOd: getJenisOd() },
            function (data) {
                renderTable(data);
            },
        );
    }

    function renderTable(data) {
        tbodyData.innerHTML = "";

        if (!data || data.length === 0) {
            tbodyData.innerHTML =
                '<tr><td colspan="14" class="text-center">Tidak ada jadwal pengerjaan untuk nomor order & bagian ini.</td></tr>';
            return;
        }

        let html = "";
        for (const row of data) {
            const rowClass = "row-" + row.statusWarna;

            html += `<tr class="${rowClass}">`;
            html += `<td class="tbl-cell">${row.Nomer}</td>`;
            html += `<td class="tbl-cell">${row.TglStart}</td>`;
            html += `<td class="tbl-cell">${row.Mesin}</td>`;
            html += `<td class="tbl-cell">${row.TypeMesin}</td>`;
            html += `<td class="tbl-cell">${row.Bagian}</td>`;
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

    function clearDataOnly() {
        TDivisi.value = "";
        TKdBrg.value = "";
        TNoGbr.value = "";
        TNamaBrg.value = "";
        TJml.value = "";
        TMesin.value = "";
        TUserOrder.value = "";
        TKetOrder.value = "";
        OdSts.textContent = "";
        TBagian.value = "";
        TIdBagian.value = "";
        clearTable();
    }

    function clearTable() {
        tbodyData.innerHTML =
            '<tr><td colspan="14" class="text-center">Belum ada data.</td></tr>';
    }

    // RESET ALL
    function resetAll() {
        clearDataOnly();
        TNoOd.value = "";
        // OptHarian.checked = true;
        // OptProyek.checked = false;
        TNoOd.focus();
    }
});
//#endregion
