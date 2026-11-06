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
    const btnPilih = document.getElementById("btnPilih");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnProses = document.getElementById("btnProses");
    const btnKeluar = document.getElementById("btnKeluar");

    let currentJadwalData = [];
//#endregion

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
                window.pkjDelOrderConfig.routeGetBagianList +
                "?noOd=" +
                safeUrlParam(noOd) +
                "&jenisOd=" +
                getJenisOsForUrl(),
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

    btnPilih.addEventListener("click", function () {
        const checkboxes = tbodyJadwal.querySelectorAll(".rowCheckbox");
        let allChecked = true;
        for (let cb of checkboxes) {
            if (!cb.checked) {
                allChecked = false;
                break;
            }
        }
        const targetState = !allChecked;
        for (let cb of checkboxes) cb.checked = targetState;
        setBtnPilihState();
    });

    tbodyJadwal.addEventListener("change", function (e) {
        if (e.target.classList.contains("rowCheckbox")) {
            setBtnPilihState();
        }
    });

    btnProses.addEventListener("click", function () {
        const checkedItems = getCheckedItems();
        if (checkedItems.length === 0) {
            Swal.fire("Pesan", "Pilih jadwal yang akan dihapus.", "warning");
            return;
        }

        showAlasanForm("Keterangan").then((result) => {
            if (result.isConfirmed) {
                const payload = {
                    noOd: TNoOd.value.trim(),
                    keterangan: result.value, // result.value berisi teks alasan/keterangan
                    items: checkedItems.map((it) => ({
                        noAntrian: it.noAntrian,
                        estDate: it.estDate,
                        idBagian: it.idBagian,
                        noMesin: it.noMesin,
                        noType: it.noType,
                    })),
                };

                ajaxPost(
                    window.pkjDelOrderConfig.routeStore,
                    payload,
                    null,
                    null,
                    function (response) {
                        Swal.fire("Sukses", response.message, "success").then(
                            () => {
                                // Reload data
                                const noOd = TNoOd.value.trim();
                                const idBagian = TIdBagian.value.trim();
                                if (noOd && idBagian)
                                    loadJadwal(noOd, idBagian);
                            },
                        );
                    },
                );
            }
        });
    });
//#endregion

//#region Utility & Helper Functions
    function getJenisOsForUrl() {
        return OptHarian.checked ? "H" : "P";
    }

    function getJenisOd() {
        return OptHarian.checked ? "H" : "P";
    }

    function setBtnPilihState() {
        const checkboxes = tbodyJadwal.querySelectorAll(".rowCheckbox");
        if (checkboxes.length === 0) {
            btnPilih.textContent = "Pilih Semua";
            return;
        }
        let allChecked = true;
        for (let cb of checkboxes) {
            if (!cb.checked) {
                allChecked = false;
                break;
            }
        }
        btnPilih.textContent = allChecked ? "Batal Semua" : "Pilih Semua";
    }

    function loadOrder(noOd) {
        ajaxGet(
            window.pkjDelOrderConfig.routeGetOrder,
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
            window.pkjDelOrderConfig.routeGetJadwal,
            { noOd: noOd, idBag: idBagian, jenisOd: getJenisOd() },
            function (data) {
                currentJadwalData = data;
                renderTable(data);
                setBtnPilihState();
            },
        );
    }

    function renderTable(data) {
        tbodyJadwal.innerHTML = "";
        if (!data || data.length === 0) {
            tbodyJadwal.innerHTML =
                '<tr><td colspan="12" class="text-center">Tidak ada jadwal pengerjaan untuk order & bagian ini, atau sudah finish semua.</td></tr>';
            return;
        }
        let html = "";
        for (const row of data) {
            let rowClass = "";
            if (row.statusWarna === "emergency") rowClass = "row-emergency";
            else if (row.statusWarna === "tolak-mng")
                rowClass = "row-tolak-mng";

            html += `<tr class="${rowClass}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right: 8px; cursor: pointer;">${row.NoAntrian}</td>`;
            html += `<td>${row.EstDate}</td>`;
            html += `<td>${row.NamaMesin}</td>`;
            html += `<td>${row.NamaType}</td>`;
            html += `<td>${row.EstTime}</td>`;
            html += `<td>${row.NamaBagian}</td>`;
            html += `<td class="text-end">${row.JmlDikerjakan}</td>`;
            html += `<td style="display:none;">${row.NoMesin}</td>`;
            html += `<td style="display:none;">${row.NoType}</td>`;
            html += `<td style="display:none;">${row.IdBagian}</td>`;
            html += `<td style="display:none;">${row.Status}</td>`;
            html += `<td style="display:none;">${row.Tgl_Tolak_Mng || ""}</td>`;
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
                    noAntrian: cells[0].textContent.trim(),
                    estDate: cells[1].textContent.trim(),
                    noMesin: parseInt(cells[7].textContent.trim()) || 0,
                    noType: parseInt(cells[8].textContent.trim()) || 0,
                    idBagian: parseInt(cells[9].textContent.trim()) || 0,
                });
            }
        });
        return items;
    }

    function clearTable() {
        tbodyJadwal.innerHTML =
            '<tr><td colspan="12" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = [];
        btnPilih.textContent = "Pilih Semua";
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
        btnKeluar.textContent = "Keluar";
        TNoOd.focus();
    }
});
//#endregion
