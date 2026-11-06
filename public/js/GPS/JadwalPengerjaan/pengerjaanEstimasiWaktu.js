//#region Variabel DOM Elements
jQuery(function ($) {
    const TMesin = document.getElementById("TMesin");
    const TNoMesin = document.getElementById("TNoMesin");
    const btnMesin = document.getElementById("btnMesin");
    const TType = document.getElementById("TType");
    const TNoType = document.getElementById("TNoType");
    const btnType = document.getElementById("btnType");
    const Date1 = document.getElementById("Date1");
    const btnOK = document.getElementById("btnOK");
    const tbodyJadwal = document.getElementById("tbodyJadwal");
    const TEstTime = document.getElementById("TEstTime");
    const TEstTime1 = document.getElementById("TEstTime1");
    const btnEdit = document.getElementById("btnEdit");
    const btnBatal = document.getElementById("btnBatal");
    const btnProses = document.getElementById("btnProses");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");

    let currentJadwalData = [];
    let selectedItem = null;

    setDefaultDate();
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        if (btnKeluar.textContent.trim().toUpperCase() === "KELUAR") {
            window.location.href = "/GPS";
        } else {
            resetForm();
        }
    });

    btnMesin.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Mesin",
            url: window.pkjEstWaktuConfig.routeGetMesinList,
            headers: ["ID", "Nama Mesin"],
            columns: ["NoMesin", "NamaMesin"],
            onSelect: function (row) {
                TNoMesin.value = row.NoMesin;
                TMesin.value = row.NamaMesin;
                TNoType.value = "";
                TType.value = "";
                clearTable();
                btnType.focus();
            },
        });
    });

    btnType.addEventListener("click", function () {
        if (!TNoMesin.value) {
            Swal.fire("Info", "Pilih mesin terlebih dahulu.", "info");
            return;
        }

        openLookupModal({
            title: "Pilih Type Mesin",
            url:
                window.pkjEstWaktuConfig.routeGetTypeList +
                "?noMesin=" +
                safeUrlParam(TNoMesin.value),
            headers: ["ID", "Nama Type"],
            columns: ["NoType", "NamaType"],
            onSelect: function (row) {
                TNoType.value = row.NoType;
                TType.value = row.NamaType;
                Date1.focus();
            },
        });
    });

    Date1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const tgl = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (tgl < today) {
                Swal.fire(
                    "Pesan",
                    "Tanggal estimasi harus lebih besar dari/sama dengan tanggal sekarang.",
                    "warning",
                );
                btnOK.disabled = true;
                this.focus();
                return;
            }
            btnOK.disabled = false;
            btnOK.focus();
        }
    });

    Date1.addEventListener("change", function () {
        btnOK.disabled = true;
        clearTable();
        resetEstTime();
    });

    btnOK.addEventListener("click", function () {
        const noMesin = TNoMesin.value.trim();
        const noType = TNoType.value.trim();
        const date = Date1.value;
        if (!noMesin || !noType || !date) {
            Swal.fire(
                "Info",
                "Lengkapi Mesin, Type Mesin, dan Tanggal.",
                "info",
            );
            return;
        }
        loadJadwal(noMesin, noType, date);
        btnKeluar.textContent = "Batal";
    });

    btnRefresh.addEventListener("click", function () {
        const noMesin = TNoMesin.value.trim();
        const noType = TNoType.value.trim();
        const date = Date1.value;
        if (noMesin && noType && date) {
            loadJadwal(noMesin, noType, date);
            resetEstTime();
        }
    });

    btnEdit.addEventListener("click", function () {
        const checkedItems = getCheckedItems();
        if (checkedItems.length !== 1) {
            Swal.fire("Info", "Pilih 1 data yang akan di-Edit.", "info");
            return;
        }
        selectedItem = checkedItems[0];
        TEstTime.value = selectedItem.estHour;
        TEstTime1.value = selectedItem.estMinute;
        setEstTimeEnabled(true);
        TEstTime.focus();
    });

    TEstTime.addEventListener("keypress", function (e) {
        if (e.key === "Enter") TEstTime1.focus();
    });

    TEstTime1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const h = parseInt(TEstTime.value) || 0;
            const m = parseInt(TEstTime1.value) || 0;
            if (h === 0 && m === 0) {
                Swal.fire(
                    "Pesan",
                    "Estimasi waktu harus lebih besar dari NOL.",
                    "warning",
                );
                btnProses.disabled = true;
                TEstTime.focus();
                return;
            }
            btnProses.disabled = false;
            btnProses.focus();
        }
    });

    btnBatal.addEventListener("click", function () {
        resetEstTime();
    });

    btnProses.addEventListener("click", function () {
        if (!selectedItem) {
            Swal.fire(
                "Info",
                "Pilih 1 data dan klik Edit terlebih dahulu.",
                "info",
            );
            return;
        }

        const noMesin = TNoMesin.value.trim();
        const noType = TNoType.value.trim();
        const date = Date1.value;
        const estHour = parseInt(TEstTime.value) || 0;
        const estMinute = parseInt(TEstTime1.value) || 0;

        if (estHour === 0 && estMinute === 0) {
            Swal.fire("Info", "Estimasi waktu harus > 0.", "info");
            return;
        }

        // Step 1: Hitung kapasitas dulu
        ajaxPost(
            window.pkjEstWaktuConfig.routeHitungJam,
            {
                noMesin: noMesin,
                noType: noType,
                date: date,
                noQue: selectedItem.noAntrian,
            },
            null,
            null,
            function (hitung) {
                const TotalMenitKrj = hitung.TotalMenitKrj || 0;
                const TotalMenitPk = hitung.TotalMenitPk || 0;
                const ada = hitung.ada || 0;
                const menitTbh = estHour * 60 + estMinute;
                const totalInput = ada > 0 ? menitTbh + TotalMenitPk : menitTbh;

                if (totalInput <= TotalMenitKrj) {
                    doUpdate(noMesin, noType, date, estHour, estMinute);
                } else {
                    const kekurangan = totalInput - TotalMenitKrj;
                    const kekJam = Math.floor(kekurangan / 60);
                    const kekMenit = kekurangan % 60;

                    Swal.fire({
                        title: "Jam Kerja Tidak Cukup",
                        html: `Kekurangan: <b>${kekJam} jam ${kekMenit} menit</b>.<br>Pilih tindakan:`,
                        icon: "question",
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Edit Jam Kerja Optimal",
                        denyButtonText: "Geser Jadwal",
                        cancelButtonText: "Batal",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Redirect ke Edit Jam Kerja Optimal
                            window.open(
                                window.pkjEstWaktuConfig.routeEditJamKerja +
                                    "?tanggal=" +
                                    safeUrlParam(date) +
                                    "&noMesin=" +
                                    safeUrlParam(noMesin) +
                                    "&namaMesin=" +
                                    safeUrlParam(TMesin.value) +
                                    "&noType=" +
                                    safeUrlParam(noType) +
                                    "&namaType=" +
                                    safeUrlParam(TType.value),
                                "_blank",
                            );
                        } else if (result.isDenied) {
                            handleShift(
                                noMesin,
                                noType,
                                date,
                                selectedItem,
                                estHour,
                                estMinute,
                                kekurangan,
                            );
                        }
                    });
                }
            },
            function (xhr) {
                const msg = xhr.responseJSON?.error || "Terjadi kesalahan.";
                Swal.fire("Error", msg, "error");
            },
        );
    });
//#endregion

//#region Utility & Helper Functions
    function setDefaultDate() {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, "0");
        const d = String(today.getDate()).padStart(2, "0");
        Date1.value = `${y}-${m}-${d}`;
    }

    function setEstTimeEnabled(enabled) {
        TEstTime.disabled = !enabled;
        TEstTime1.disabled = !enabled;
    }

    function resetEstTime() {
        TEstTime.value = 0;
        TEstTime1.value = 0;
        setEstTimeEnabled(false);
        btnProses.disabled = true;
        selectedItem = null;
    }


    function doUpdate(noMesin, noType, date, estHour, estMinute) {
        ajaxPost(
            window.pkjEstWaktuConfig.routeStore,
            {
                action: "update",
                noMesin: noMesin,
                noType: noType,
                date: date,
                noAntrian: selectedItem.noAntrian,
                noOrder: selectedItem.noOrder,
                idBagian: selectedItem.idBagian,
                estHour: estHour,
                estMinute: estMinute,
                jenisOrder: selectedItem.jenisOrder,
            },
            null,
            null,
            function (response) {
                Swal.fire("Sukses", response.message, "success").then(() => {
                    loadJadwal(noMesin, noType, date);
                    resetEstTime();
                });
            },
        );
    }

    function handleShift(
        noMesin,
        noType,
        date,
        item,
        estHour,
        estMinute,
        kekurangan,
    ) {
        // Tanggal berikutnya
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        const nextDateStr = nextDate.toISOString().split("T")[0];

        // Kumpulkan range shift: dari bawah ke atas sampai total >= kekurangan
        const rows = getTableRows();
        let editIndex = -1;
        for (let i = 0; i < rows.length; i++) {
            if (
                rows[i].noAntrian === item.noAntrian &&
                rows[i].idBagian === item.idBagian
            ) {
                editIndex = i;
                break;
            }
        }

        const shiftItems = [];
        let totalShiftMenit = 0;
        for (
            let i = rows.length - 1;
            i >= 0 && totalShiftMenit < kekurangan;
            i--
        ) {
            if (i === editIndex) continue;
            const r = rows[i];
            shiftItems.unshift({
                noAntrian: r.noAntrian,
                noOrder: r.noOrder,
                idBagian: r.idBagian,
                estHour: r.estHour,
                estMinute: r.estMinute,
            });
            totalShiftMenit += r.estHour * 60 + r.estMinute;
        }

        if (shiftItems.length === 0) {
            Swal.fire("Info", "Tidak ada item yang bisa digeser.", "info");
            return;
        }

        Swal.fire({
            title: "Konfirmasi Geser",
            html: `
                <p>Item yang akan digeser: <b>${shiftItems.length}</b></p>
                <p>Total: <b>${Math.floor(totalShiftMenit / 60)} jam ${totalShiftMenit % 60} menit</b></p>
                <p>Ke tanggal: <b>${nextDateStr}</b></p>
                <p>Lanjutkan?</p>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Geser",
            cancelButtonText: "Batal",
        }).then((res) => {
            if (res.isConfirmed) {
                // Kirim request shift
                ajaxPost(
                    window.pkjEstWaktuConfig.routeStore,
                    {
                        action: "shift",
                        noMesin: noMesin,
                        noType: noType,
                        date: date,
                        noAntrian: item.noAntrian,
                        noOrder: item.noOrder,
                        idBagian: item.idBagian,
                        estHour: estHour,
                        estMinute: estMinute,
                        jenisOrder: item.jenisOrder,
                        shiftItems: shiftItems,
                        nextDate: nextDateStr,
                        jamKerjaOptimal: null,
                    },
                    null,
                    null,
                    function (response) {
                        Swal.fire("Sukses", response.message, "success").then(
                            () => {
                                loadJadwal(noMesin, noType, date);
                                resetEstTime();
                            },
                        );
                    },
                );
            }
        });
    }

    function loadJadwal(noMesin, noType, date) {
        ajaxGet(
            window.pkjEstWaktuConfig.routeGetJadwal,
            {
                noMesin: noMesin,
                noType: noType,
                date: date,
            },
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
                '<tr><td colspan="15" class="text-center">Tidak ada jadwal pada tanggal ini.</td></tr>';
            return;
        }
        let html = "";
        for (const row of data) {
            const rowClass = row.Status === 1 ? "row-emergency" : "";

            html += `<tr class="${rowClass}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right: 8px; cursor: pointer;">${row.NoAntrian}</td>`;
            html += `<td>${row.NoOrder}</td>`;
            html += `<td>${row.TglStart}</td>`;
            html += `<td>${row.NamaBarang}</td>`;
            html += `<td>${row.KdBarang}</td>`;
            html += `<td>${row.EstTime}</td>`;
            html += `<td>${row.NamaDivisi}</td>`;
            html += `<td class="text-end">${row.JmlOrder}</td>`;
            html += `<td>${row.NamaBagian}</td>`;
            html += `<td class="text-end">${row.JmlDikerjakan}</td>`;
            html += `<td style="display:none;">${row.IdBagian}</td>`;
            html += `<td style="display:none;">${row.EstTimeHour}</td>`;
            html += `<td style="display:none;">${row.EstTimeMinute}</td>`;
            html += `<td style="display:none;">${row.JenisOrder}</td>`;
            html += `<td style="display:none;">${row.Status}</td>`;
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
                noAntrian: cells[0].textContent.trim(),
                noOrder: cells[1].textContent.trim(),
                idBagian: parseInt(cells[10].textContent.trim()) || 0,
                estHour: parseInt(cells[11].textContent.trim()) || 0,
                estMinute: parseInt(cells[12].textContent.trim()) || 0,
                jenisOrder: cells[13].textContent.trim(),
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
                    noAntrian: cells[0].textContent.trim(),
                    noOrder: cells[1].textContent.trim(),
                    idBagian: parseInt(cells[10].textContent.trim()) || 0,
                    estHour: parseInt(cells[11].textContent.trim()) || 0,
                    estMinute: parseInt(cells[12].textContent.trim()) || 0,
                    jenisOrder: cells[13].textContent.trim(),
                });
            }
        });
        return items;
    }

    function clearTable() {
        tbodyJadwal.innerHTML =
            '<tr><td colspan="15" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = [];
        resetEstTime();
    }

    function resetForm() {
        TMesin.value = "";
        TNoMesin.value = "";
        TType.value = "";
        TNoType.value = "";
        btnOK.disabled = true;
        btnProses.disabled = true;
        btnKeluar.textContent = "KELUAR";
        clearTable();
        setDefaultDate();
        btnMesin.focus();
    }
});
//#endregion
