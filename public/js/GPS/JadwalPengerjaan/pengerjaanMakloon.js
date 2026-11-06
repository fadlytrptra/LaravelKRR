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
    const tbodyJadwal = document.getElementById("tbodyJadwal");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnProses = document.getElementById("btnProses");
    const btnKeluar = document.getElementById("btnKeluar");

    let currentJadwalData = [];
//#endregion

    function getJenisOd() {
        return OptHarian.checked ? "H" : "P";
    }

   //#region Input & Core Events
    OptHarian.addEventListener("change", function () {
        if (this.checked) resetAll();
    });
    OptProyek.addEventListener("change", function () {
        if (this.checked) resetAll();
    });

    btnKeluar.addEventListener("click", function () {
        if (btnKeluar.textContent.trim().toLowerCase() === "keluar") {
            window.location.href = "/GPS";
        } else {
            resetAll();
        }
    });

    TNoOd.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let noOdVal = this.value.trim();
            if (noOdVal !== "") {
                noOdVal = noOdVal.padStart(6, "0").slice(-6);
                this.value = noOdVal;
                loadOrder(noOdVal);
            } else {
                Swal.fire("Info", "Isi nomer ordernya...", "info");
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
            title: "Pilih Bagian Barang",
            url:
                window.pkjMakloonConfig.routeGetBagianList +
                "?noOd=" +
                safeUrlParam(noOd) +
                "&jenisOd=" +
                getJenisOd(),
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

    btnProses.addEventListener("click", function () {
        const checked = getCheckedItems();
        if (checked.length !== 1) {
            Swal.fire("Pesan", "Pilih 1 data untuk diproses.", "warning");
            return;
        }
        const item = checked[0];

        showBiayaMakloonForm("Input Biaya Makloon").then((result) => {
            if (result.isConfirmed) {
                doProcess(item, result.value);
            }
        });
    });
//#endregion

//#region Utility & Helper Functions
    function doProcess(item, input) {
        // Harga lama yang tersimpan (dari tabel) → @hargaU
        const hargaU = item.hargaTotalRaw || 0;

        const payload = {
            noOd: TNoOd.value.trim(),
            idBagian: parseInt(TIdBagian.value) || 0,
            noType: item.noType,
            jmlBrg: input.jmlBrg,
            harga: input.harga,
            keterangan: input.keterangan,
            hargaU: hargaU,
        };

        ajaxPost(
            window.pkjMakloonConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                Swal.fire("Sukses", response.message, "success").then(() => {
                    // Reload data jadwal
                    const noOd = TNoOd.value.trim();
                    const idBagian = TIdBagian.value.trim();
                    if (noOd && idBagian) loadJadwal(noOd, idBagian);
                });
            },
        );
    }


    function loadOrder(noOd) {
        ajaxGet(
            window.pkjMakloonConfig.routeGetOrder,
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

                // Reset bagian & tabel
                TBagian.value = "";
                TIdBagian.value = "";
                clearTable();

                // Ubah tombol keluar jadi Batal
                btnKeluar.textContent = "Batal";
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
            window.pkjMakloonConfig.routeGetJadwal,
            { noOd: noOd, idBag: idBagian, jenisOd: getJenisOd() },
            function (data) {
                currentJadwalData = data;
                renderTable(data);
            },
        );
    }

    function renderTable(data) {
        tbodyJadwal.innerHTML = "";
        if (!data || data.length === 0) {
            tbodyJadwal.innerHTML =
                '<tr><td colspan="6" class="text-center">Tidak ada Proses Makloon untuk order & bagian ini, atau sudah diproses.</td></tr>';
            return;
        }
        let html = "";
        for (const row of data) {
            html += `<tr>`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right: 8px; cursor: pointer;">${row.NamaType}</td>`;
            html += `<td style="display:none;">${row.NoType}</td>`;
            html += `<td class="text-end">${row.JmlBrg}</td>`;
            html += `<td class="text-end">${row.Harga}</td>`;
            html += `<td class="text-end">${row.HargaTotal}</td>`;
            html += `<td>${row.Keterangan}</td>`;
            html += `</tr>`;
        }
        tbodyJadwal.innerHTML = html;
    }

    function getCheckedItems() {
        const items = [];
        tbodyJadwal.querySelectorAll("tr").forEach((tr, idx) => {
            const cb = tr.querySelector(".rowCheckbox");
            if (cb && cb.checked) {
                // Ambil data dari currentJadwalData berdasarkan urutan baris (index)
                const rowData = currentJadwalData[idx];
                if (!rowData) return;
                items.push({
                    namaType: rowData.NamaType,
                    noType: rowData.NoType,
                    jmlBrgRaw: rowData.JmlBrg,
                    hargaRaw: rowData.HargaRaw,
                    hargaTotalRaw: rowData.HargaTotalRaw,
                    keterangan: rowData.Keterangan,
                    isEmpty: rowData.isEmpty,
                });
            }
        });
        return items;
    }

    function clearTable() {
        tbodyJadwal.innerHTML =
            '<tr><td colspan="6" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = [];
    }

    function clearAll() {
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

    function resetAll() {
        clearAll();
        TNoOd.value = "";
        btnKeluar.textContent = "Keluar";
        TNoOd.focus();
    }
});
//#endregion
