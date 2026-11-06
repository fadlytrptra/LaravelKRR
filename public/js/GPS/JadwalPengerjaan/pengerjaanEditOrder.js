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
    const optTukar = document.getElementById("optTukar");
    const optSusun = document.getElementById("optSusun");
    const btnProses = document.getElementById("btnProses");
    const btnRefresh = document.getElementById("btnRefresh");
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
    optTukar.addEventListener("change", updateProsesButton);
    optSusun.addEventListener("change", updateProsesButton);

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
                Swal.fire("Info", "Isi nomer ordernya.", "info");
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
                window.pkjEditOrderConfig.routeGetBagianList +
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

    tbodyJadwal.addEventListener("change", function (e) {
        if (e.target.classList.contains("rowCheckbox")) {
            updateProsesButton();
        }
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
        if (checkedItems.length !== 2) {
            Swal.fire("Info", "Pilih tepat 2 data.", "info");
            return;
        }

        // Cek tanggal kerja sama
        if (checkedItems[0].estDate !== checkedItems[1].estDate) {
            Swal.fire("Pesan", "Tanggal kerja tidak boleh berbeda.", "warning");
            return;
        }

        const idBagian = TIdBagian.value.trim();

        if (optTukar.checked) {
            Swal.fire({
                title: "Konfirmasi Tukar Posisi",
                html: `
                    <p>Tukar posisi antara:</p>
                    <p><b>Antrian ${checkedItems[0].noAntrian}</b> ↔ <b>Antrian ${checkedItems[1].noAntrian}</b></p>
                    <p>Lanjutkan?</p>
                `,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ya, Tukar",
                cancelButtonText: "Batal",
            }).then((result) => {
                if (result.isConfirmed) {
                    const payload = {
                        action: "tukar",
                        idBag: idBagian,
                        items: checkedItems.map((it) => ({
                            noAntrian: it.noAntrian,
                            idTrans: it.idTrans,
                            estDate: it.estDate,
                            noType: it.noType,
                            noMesin: it.noMesin,
                            timeInput: it.timeInput,
                        })),
                    };
                    ajaxPost(
                        window.pkjEditOrderConfig.routeStore,
                        payload,
                        null,
                        null,
                        function (response) {
                            Swal.fire(
                                "Sukses",
                                response.message,
                                "success",
                            ).then(() => {
                                loadJadwal(TNoOd.value.trim(), idBagian);
                                updateProsesButton();
                            });
                        },
                    );
                }
            });
        } else if (optSusun.checked) {
            Swal.fire({
                title: "Susun Posisi",
                text: "Pilih arah penyusunan:",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ke Atas",
                cancelButtonText: "Ke Bawah",
                reverseButtons: true,
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    // user pilih ke bawah? Perhatikan: Cancel = Ke Bawah di sini karena reversed
                    // Kita pakai mapping: isConfirmed → up, isDismissed(cancel) → down
                }
                let direction;
                if (result.isConfirmed) direction = "up";
                else if (result.dismiss === Swal.DismissReason.cancel)
                    direction = "down";
                else return;

                // Kumpulkan rangeItems: semua item di antara dua checked (inklusif)
                const allRows = getTableRows();
                const idx1 = allRows.findIndex(
                    (r) =>
                        r.noAntrian === checkedItems[0].noAntrian &&
                        r.idTrans === checkedItems[0].idTrans,
                );
                const idx2 = allRows.findIndex(
                    (r) =>
                        r.noAntrian === checkedItems[1].noAntrian &&
                        r.idTrans === checkedItems[1].idTrans,
                );

                if (idx1 === -1 || idx2 === -1) {
                    Swal.fire(
                        "Error",
                        "Data tidak ditemukan di tabel.",
                        "error",
                    );
                    return;
                }
                const start = Math.min(idx1, idx2);
                const end = Math.max(idx1, idx2);

                const rangeItems = [];
                for (let i = start; i <= end; i++) {
                    rangeItems.push({
                        noAntrian: allRows[i].noAntrian,
                        idTrans: allRows[i].idTrans,
                        estDate: allRows[i].estDate,
                        noType: allRows[i].noType,
                        noMesin: allRows[i].noMesin,
                        timeInput: allRows[i].timeInput,
                    });
                }

                const payload = {
                    action: "susun",
                    idBag: idBagian,
                    items: checkedItems.map((it) => ({
                        noAntrian: it.noAntrian,
                        idTrans: it.idTrans,
                        estDate: it.estDate,
                        noType: it.noType,
                        noMesin: it.noMesin,
                        timeInput: it.timeInput,
                    })),
                    rangeItems: rangeItems,
                    direction: direction,
                };

                ajaxPost(
                    window.pkjEditOrderConfig.routeStore,
                    payload,
                    null,
                    null,
                    function (response) {
                        Swal.fire("Sukses", response.message, "success").then(
                            () => {
                                loadJadwal(TNoOd.value.trim(), idBagian);
                                updateProsesButton();
                            },
                        );
                    },
                );
            });
        } else {
            Swal.fire(
                "Pesan",
                "Pilih, Tukar Posisi atau Susun Posisi...",
                "warning",
            );
        }
    });
//#endregion

//#region Utility & Helper Functions
    function getJenisOd() {
        return OptHarian.checked ? "H" : "P";
    }

    function updateProsesButton() {
        const checked = tbodyJadwal.querySelectorAll(
            ".rowCheckbox:checked",
        ).length;
        const modeSelected = optTukar.checked || optSusun.checked;
        btnProses.disabled = !(checked === 2 && modeSelected);
    }


    function loadOrder(noOd) {
        ajaxGet(
            window.pkjEditOrderConfig.routeGetOrder,
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
            window.pkjEditOrderConfig.routeGetJadwal,
            { noOd: noOd, idBag: idBagian, jenisOd: getJenisOd() },
            function (data) {
                currentJadwalData = data;
                renderTable(data);
                updateProsesButton();
            },
        );
    }

    function renderTable(data) {
        tbodyJadwal.innerHTML = "";
        if (!data || data.length === 0) {
            tbodyJadwal.innerHTML =
                '<tr><td colspan="9" class="text-center">Tidak ada jadwal pengerjaan untuk order & bagian ini.</td></tr>';
            return;
        }
        let html = "";
        for (const row of data) {
            let rowClass = "";
            if (row.status === 1) rowClass = "row-emergency";
            else if (row.cancel === 1) rowClass = "row-cancel";

            html += `<tr class="${rowClass}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right: 8px; cursor: pointer;">${row.nomerUrut}</td>`;
            html += `<td>${row.estDate}</td>`;
            html += `<td>${row.namaMesin}</td>`;
            html += `<td>${row.namaType}</td>`;
            html += `<td style="display:none;">${row.namaBagian}</td>`;
            html += `<td>${row.estTime}</td>`;
            html += `<td class="text-end">${row.jmlDikerjakan}</td>`;
            html += `<td>${row.ketCancel}</td>`;
            html += `<td style="display:none;">${row.timeInput}</td>`;
            html += `<td style="display:none;">${row.noMesin}</td>`;
            html += `<td style="display:none;">${row.noType}</td>`;
            html += `<td style="display:none;">${row.noAntrian}</td>`;
            html += `<td style="display:none;">${row.idTrans}</td>`;
            html += `<td style="display:none;">${row.status}</td>`;
            html += `<td style="display:none;">${row.cancel}</td>`;
            html += `</tr>`;
        }
        tbodyJadwal.innerHTML = html;
    }

    function getTableRows() {
        const rows = [];
        tbodyJadwal.querySelectorAll("tr").forEach((tr) => {
            const cells = tr.querySelectorAll("td");
            if (cells.length < 15) return;
            rows.push({
                nomerUrut: parseInt(cells[0].textContent.trim()) || 0,
                estDate: cells[1].textContent.trim(),
                timeInput: cells[8].textContent.trim(),
                noMesin: parseInt(cells[9].textContent.trim()) || 0,
                noType: parseInt(cells[10].textContent.trim()) || 0,
                noAntrian: cells[11].textContent.trim(),
                idTrans: parseInt(cells[12].textContent.trim()) || 0,
                status: parseInt(cells[13].textContent.trim()) || 0,
                cancel: parseInt(cells[14].textContent.trim()) || 0,
            });
        });
        return rows;
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
                    timeInput: cells[8].textContent.trim(),
                    noMesin: parseInt(cells[9].textContent.trim()) || 0,
                    noType: parseInt(cells[10].textContent.trim()) || 0,
                    noAntrian: cells[11].textContent.trim(),
                    idTrans: parseInt(cells[12].textContent.trim()) || 0,
                });
            }
        });
        return items;
    }

    function clearTable() {
        tbodyJadwal.innerHTML =
            '<tr><td colspan="9" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = [];
        optTukar.checked = false;
        optSusun.checked = false;
        updateProsesButton();
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
