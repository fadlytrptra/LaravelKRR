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
    const btnProses = document.getElementById("btnProses");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");

    let currentJadwalData = [];
//#edregion

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
        if (btnKeluar.textContent.trim().toUpperCase() === "KELUAR") {
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
                window.pkjJmlBarangConfig.routeGetBagianList +
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
        const checkedItems = getCheckedItems();
        if (checkedItems.length !== 1) {
            Swal.fire("Pesan", "Pilih 1 data untuk diProses.", "warning");
            return;
        }

        const item = checkedItems[0];
        const noOd = TNoOd.value.trim();
        const idBagian = TIdBagian.value.trim();

        showJmlKerjaForm("Input Jumlah Barang").then((result) => {
            if (result.isConfirmed) {
                doProcess(noOd, idBagian, result.value, item);
            }
        });
    });
//#endregion

//#region Utility & Helper Functions
    function doProcess(noOd, idBagian, jml, item) {
        let payload = {
            noOd: noOd,
            idBagian: idBagian,
            jml: jml,
            items: [
                {
                    idTrans: item.idTrans,
                    noAntrian: item.noAntrian,
                    noType: item.noType,
                    noMesin: item.noMesin,
                    estDate: item.estDate,
                },
            ],
        };

        ajaxPost(
            window.pkjJmlBarangConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                Swal.fire("Sukses", response.message, "success").then(() => {
                    // Reload data jadwal
                    loadJadwal(noOd, idBagian);
                });
            },
        );
    }

    function loadOrder(noOd) {
        ajaxGet(
            window.pkjJmlBarangConfig.routeGetOrder,
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
            window.pkjJmlBarangConfig.routeGetJadwal,
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
                '<tr><td colspan="13" class="text-center">Tidak ada jadwal pengerjaan untuk order & bagian ini.</td></tr>';
            return;
        }
        let html = "";
        for (const row of data) {
            let rowClass = row.status === 1 ? "row-emergency" : "";

            html += `<tr class="${rowClass}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right: 8px; cursor: pointer;">${row.nomerUrut}</td>`;
            html += `<td>${row.estDate}</td>`;
            html += `<td>${row.namaMesin}</td>`;
            html += `<td>${row.namaType}</td>`;
            html += `<td>${row.namaBagian}</td>`;
            html += `<td>${row.estTime}</td>`;
            html += `<td class="text-end">${row.jmlDikerjakan}</td>`;
            html += `<td style="display:none;">${row.noMesin}</td>`;
            html += `<td style="display:none;">${row.noType}</td>`;
            html += `<td style="display:none;">${row.idTrans}</td>`;
            html += `<td style="display:none;">${row.noAntrian}</td>`;
            html += `<td style="display:none;">${row.jmlBr}</td>`;
            html += `<td style="display:none;">${row.status}</td>`;
            html += `</tr>`;
        }
        tbodyJadwal.innerHTML = html;
    }

    function getCheckedItems() {
        const items = [];
        tbodyJadwal.querySelectorAll("tr").forEach((tr) => {
            const cb = tr.querySelector(".rowCheckbox");
            if (cb && cb.checked) {
                const cells = tr.querySelectorAll("td");
                items.push({
                    nomerUrut: parseInt(cells[0].textContent.trim()) || 0,
                    estDate: cells[1].textContent.trim(),
                    noMesin: parseInt(cells[8].textContent.trim()) || 0,
                    noType: parseInt(cells[9].textContent.trim()) || 0,
                    idTrans: parseInt(cells[10].textContent.trim()) || 0,
                    noAntrian: cells[11].textContent.trim(),
                    jmlBr: parseInt(cells[12].textContent.trim()) || 0,
                });
            }
        });
        return items;
    }

    function clearTable() {
        tbodyJadwal.innerHTML =
            '<tr><td colspan="13" class="text-center">Belum ada data.</td></tr>';
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
        // OptHarian.checked = true;
        // OptProyek.checked = false;
        btnKeluar.textContent = "KELUAR";
        TNoOd.focus();
    }
});
//#endregion
