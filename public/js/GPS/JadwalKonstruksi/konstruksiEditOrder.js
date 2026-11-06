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
    const tbodyJadwal = document.getElementById("tbodyJadwal");
    const btnProses = document.getElementById("btnProses");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const btnBagian = document.getElementById("btnBagian");
    const optTukar = document.getElementById("optTukar");
    const optSusun = document.getElementById("optSusun");

    let currentNoOd = "";
    let currentJadwalData = [];
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        if (this.textContent.trim().toUpperCase() === "BATAL") {
            clearAll();
            this.textContent = "KELUAR";
            currentNoOd = "";
            TNoOd.focus();
        } else {
            window.location.href = "/GPS";
        }
    });

    TNoOd.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let noOdVal = this.value.trim();
            if (noOdVal !== "") {
                noOdVal = noOdVal.padStart(6, "0").slice(-6);
                this.value = noOdVal;
                currentNoOd = noOdVal;
                loadOrder(noOdVal);
            } else {
                Swal.fire("Info", "Isi nomer ordernya.", "info");
            }
        }
    });

    btnBagian.addEventListener("click", function () {
        let noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire("Info", "Isi nomor order terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Bagian Gambar",
            url:
                window.editPerOrderConfig.routeGetBagianList +
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
        let noOd = TNoOd.value.trim();
        let idBagian = TIdBagian.value.trim();
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
        let aksi = "";
        if (optTukar.checked) aksi = "tukar";
        else if (optSusun.checked) aksi = "susun";

        if (!aksi) {
            Swal.fire("Info", "Pilih: Tukar Posisi atau Susun Posisi.", "info");
            return;
        }

        let checkedItems = getCheckedItems();
        if (checkedItems.length !== 2) {
            Swal.fire("Info", "Pilih tepat 2 data.", "info");
            return;
        }

        let tgl1 = checkedItems[0].estDate;
        let tgl2 = checkedItems[1].estDate;
        if (tgl1 !== tgl2) {
            Swal.fire("Error", "Tanggal kerja tidak boleh berbeda.", "error");
            return;
        }

        let noOd = TNoOd.value.trim();
        let idBagian = TIdBagian.value.trim();

        if (aksi === "tukar") {
            // Kirim swap
            let payload = {
                action: "tukar",
                noOd: noOd,
                idBagian: idBagian,
                items: checkedItems.map((item) => ({
                    noAntrian: item.noAntrian,
                    idTrans: item.idTrans,
                    estDate: item.estDate,
                    noWrkSts: item.noWrkSts,
                    timeInput: item.timeInput,
                })),
            };
            ajaxPost(
                window.editPerOrderConfig.routeStore,
                payload,
                null,
                null,
                function (res) {
                    Swal.fire("Sukses", res.message, "success").then(() => {
                        loadJadwal(noOd, idBagian);
                    });
                },
                function (xhr) {
                    showStoreError(xhr);
                },
                false,
                false,
            );
        } else if (aksi === "susun") {
            // Minta arah: ke atas (Yes) atau ke bawah (No)
            Swal.fire({
                title: "Susun Posisi",
                text: "Pilih arah penyusunan:",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ke Atas",
                cancelButtonText: "Ke Bawah",
                reverseButtons: true,
            }).then((result) => {
                let arah = result.isConfirmed ? "up" : "down";
                let allRows = getTableRows();
                let idx1 = getIndexOfItem(checkedItems[0], allRows);
                let idx2 = getIndexOfItem(checkedItems[1], allRows);
                if (idx1 === -1 || idx2 === -1) {
                    Swal.fire(
                        "Error",
                        "Data tidak ditemukan di tabel.",
                        "error",
                    );
                    return;
                }
                let start = Math.min(idx1, idx2);
                let end = Math.max(idx1, idx2);
                let rangeItems = [];
                for (let i = start; i <= end; i++) {
                    let row = allRows[i];
                    rangeItems.push({
                        noAntrian: row.noAntrian,
                        idTrans: row.idTrans,
                        estDate: row.estDate,
                        noWrkSts: row.noWrkSts,
                        timeInput: row.timeInput,
                    });
                }
                let payloadSusun = {
                    action: "susun",
                    noOd: noOd,
                    idBagian: idBagian,
                    items: checkedItems.map((item) => ({
                        noAntrian: item.noAntrian,
                        idTrans: item.idTrans,
                        estDate: item.estDate,
                        noWrkSts: item.noWrkSts,
                        timeInput: item.timeInput,
                    })),
                    arah: arah,
                    rangeItems: rangeItems,
                };
                ajaxPost(
                    window.editPerOrderConfig.routeStore,
                    payloadSusun,
                    null,
                    null,
                    function (res) {
                        Swal.fire("Sukses", res.message, "success").then(() => {
                            loadJadwal(noOd, idBagian);
                        });
                    },
                    function (xhr) {
                        showStoreError(xhr);
                    },
                    false,
                    false,
                );
            });
        }
    });
//#endregion

//#region Utility & Helper Functions
    function loadOrder(noOd) {
        ajaxGet(
            window.editPerOrderConfig.routeGetOrder,
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

                TBagian.value = "";
                TIdBagian.value = "";
                btnKeluar.textContent = "Batal";
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

    function showStoreError(xhr) {
        const response = xhr.responseJSON || {};
        const validationMessages = response.errors
            ? Object.keys(response.errors).reduce(function (messages, key) {
                  return messages.concat(response.errors[key]);
              }, [])
            : [];
        const message =
            validationMessages.join("\n") ||
            response.error ||
            response.message ||
            "Gagal memproses perubahan jadwal.";

        Swal.fire("Error", message, "error");
    }

    function loadJadwal(noOd, idBagian) {
        ajaxGet(
            window.editPerOrderConfig.routeGetJadwal,
            { noOd: noOd, idBagian: idBagian },
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
                '<tr><td colspan="7" class="text-center">Tidak ada jadwal konstruksi untuk order dan bagian ini.</td></tr>';
            return;
        }
        let html = "";
        data.forEach(function (row) {
            let rowClass = "";
            if (row.status === 1) rowClass = "row-emergency";
            if (row.cancel === 1) rowClass = "row-cancel";
            html += `<tr class="${rowClass}" data-est-date="${row.estDateValue}" data-time-input="${row.timeInput}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right:8px; cursor:pointer;"><span class="nomorUrut">${row.nomorUrut}</span></td>`;
            html += `<td>${row.estDate}</td>`;
            html += `<td>${row.namaWorkStation}</td>`;
            html += `<td>${row.estTime}</td>`;
            html += `<td class="text-center">${row.hariKe}</td>`;
            html += `<td>${row.keterangan}</td>`;
            html += `<td style="display:none;">${row.timeInput}</td>`;
            html += `<td style="display:none;">${row.noWrkSts}</td>`;
            html += `<td style="display:none;">${row.noAntrian}</td>`;
            html += `<td style="display:none;">${row.idTrans}</td>`;
            html += `<td style="display:none;">${row.status}</td>`;
            html += `</tr>`;
        });
        tbodyJadwal.innerHTML = html;
    }

    function getCheckedItems() {
        let items = [];
        let checkedBoxes = tbodyJadwal.querySelectorAll(
            "tr .rowCheckbox:checked",
        );
        checkedBoxes.forEach(function (checkbox) {
            let tr = checkbox.closest("tr");
            let cells = tr.querySelectorAll("td");
            items.push({
                noAntrian: cells[8].textContent.trim(),
                idTrans: parseInt(cells[9].textContent.trim()) || 0,
                estDate: tr.dataset.estDate,
                noWrkSts: parseInt(cells[7].textContent.trim()) || 0,
                timeInput: tr.dataset.timeInput,
            });
        });
        return items;
    }

    function getTableRows() {
        let rows = [];
        let tableRows = tbodyJadwal.querySelectorAll("tr");
        tableRows.forEach(function (tr) {
            let cells = tr.querySelectorAll("td");
            if (cells.length < 2) return;
            // KOREKSI: Index cells bergeser karena kolom berkurang 1
            rows.push({
                noAntrian: cells[8].textContent.trim(),
                idTrans: parseInt(cells[9].textContent.trim()) || 0,
                estDate: tr.dataset.estDate,
                noWrkSts: parseInt(cells[7].textContent.trim()) || 0,
                timeInput: tr.dataset.timeInput,
            });
        });
        return rows;
    }

    function getIndexOfItem(item, rows) {
        for (let i = 0; i < rows.length; i++) {
            if (
                rows[i].noAntrian === item.noAntrian &&
                rows[i].idTrans === item.idTrans
            ) {
                return i;
            }
        }
        return -1;
    }

    function clearTable() {
        tbodyJadwal.innerHTML =
            '<tr><td colspan="11" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = [];
    }

    function clearAll() {
        [
            TDivisi,
            TKdBrg,
            TNoGbr,
            TNamaBrg,
            TKetOrder,
            TMesin,
            TUserOrder,
            TBagian,
            TIdBagian,
        ].forEach((el) => (el.value = ""));
        OdSts.innerText = "";
        clearTable();
    }
});
//#endregion
