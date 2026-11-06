//#region Variabel DOM Elements
jQuery(function ($) {
    const TWorkSts = document.getElementById("TWorkSts");
    const TNoWorkSts = document.getElementById("TNoWorkSts");
    const btnWrkSts = document.getElementById("btnWrkSts");
    const Date1 = document.getElementById("Date1");
    const btnOK = document.getElementById("btnOK");
    const btnEdit = document.getElementById("btnEdit");
    const btnBatal = document.getElementById("btnBatal");
    const btnProses = document.getElementById("btnProses");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const tbodyJadwal = document.getElementById("tbodyJadwal");
    const TEstTime = document.getElementById("TEstTime");
    const TEstTime1 = document.getElementById("TEstTime1");

    let currentJadwalData = [];
    let currentDate = "";

    setDefaultDate();
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        if (btnKeluar.textContent.trim().toLowerCase() === "batal") {
            clearTable();
            TNoWorkSts.value = "";
            TWorkSts.value = "";
            btnKeluar.textContent = "Keluar";
            btnOK.disabled = true;
            btnProses.disabled = true;
            btnWrkSts.focus();
        } else {
            window.location.href = "/GPS";
        }
    });

    btnWrkSts.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Work Station",
            url: window.editEstWaktuConfig.routeGetWorkstationList,
            headers: ["ID", "Nama Work Station"],
            columns: ["NoWrkSts", "NamaWorkStation"],
            onSelect: function (row) {
                TNoWorkSts.value = row.NoWrkSts;
                TWorkSts.value = row.NamaWorkStation;
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
                    "Tanggal Estimasi harus lebih besar dari/sama dengan tanggal sekarang",
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
    });

    btnOK.addEventListener("click", function () {
        const worksts = TNoWorkSts.value.trim();
        const date = Date1.value;
        if (!worksts || !date) {
            Swal.fire("Info", "Isi Work Station dan Tanggal.", "info");
            return;
        }
        currentDate = date;
        loadJadwal(worksts, date);
        // Ubah tombol keluar jadi "Batal" (seperti VB)
        btnKeluar.textContent = "Batal";
    });

    // tbodyJadwal.addEventListener("change", function (e) {
    //     if (e.target.classList.contains("rowCheckbox")) {
    //         const total = tbodyJadwal.querySelectorAll(".rowCheckbox").length;
    //         const checked = tbodyJadwal.querySelectorAll(
    //             ".rowCheckbox:checked",
    //         ).length;
    //     }
    // });

    btnEdit.addEventListener("click", function () {
        const checkedItems = getCheckedItems();
        if (checkedItems.length !== 1) {
            Swal.fire("Info", "Pilih 1 data yang akan di-Edit.", "info");
            return;
        }
        const item = checkedItems[0];
        TEstTime.value = item.estHour;
        TEstTime1.value = item.estMinute;
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

    btnRefresh.addEventListener("click", function () {
        const worksts = TNoWorkSts.value.trim();
        const date = Date1.value;
        if (worksts && date) {
            loadJadwal(worksts, date);
        }
    });

    btnProses.addEventListener("click", function () {
        const worksts = TNoWorkSts.value.trim();
        const date = Date1.value;
        const checkedItems = getCheckedItems();
        if (checkedItems.length !== 1) {
            Swal.fire("Info", "Pilih 1 data.", "info");
            return;
        }
        const item = checkedItems[0];
        const estHour = parseInt(TEstTime.value) || 0;
        const estMinute = parseInt(TEstTime1.value) || 0;

        if (estHour === 0 && estMinute === 0) {
            Swal.fire("Info", "Estimasi waktu harus > 0.", "info");
            return;
        }

        // Step 1: Hitung kapasitas dulu
        ajaxPost(
            window.editEstWaktuConfig.routeHitungJam,
            { worksts: worksts, date: date, noQue: item.noAntrian },
            null,
            null,
            function (hitung) {
                const TotalMenitKrj = hitung.TotalMenitKrj || 0;
                const TotalMenitPk = hitung.TotalMenitPk || 0;
                const ada = hitung.ada || 0;
                const menitTbh = estHour * 60 + estMinute;
                const totalInput = ada > 0 ? menitTbh + TotalMenitPk : menitTbh;

                if (totalInput <= TotalMenitKrj) {
                    // Langsung update
                    doUpdate(worksts, date, item, estHour, estMinute);
                } else {
                    // Tidak cukup → tanya
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
                                window.editEstWaktuConfig.routeEditJamKerja +
                                "?tanggal=" +
                                    safeUrlParam(date) +
                                    "&worksts=" +
                                    safeUrlParam(worksts) +
                                    "&workstsName=" +
                                    safeUrlParam(TWorkSts.value),
                                "_blank",
                            );
                        } else if (result.isDenied) {
                            // Geser jadwal
                            handleShift(
                                worksts,
                                date,
                                item,
                                estHour,
                                estMinute,
                                kekurangan,
                            );
                        }
                    });
                }
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
    }

    function doUpdate(worksts, date, item, estHour, estMinute) {
        ajaxPost(
            window.editEstWaktuConfig.routeStore,
            {
                // _method: 'PUT',
                action: "update",
                worksts: worksts,
                date: date,
                noAntrian: item.noAntrian,
                idBagian: item.idBagian,
                estHour: estHour,
                estMinute: estMinute,
            },
            null,
            null,
            function (response) {
                Swal.fire("Sukses", response.message, "success").then(() => {
                    loadJadwal(worksts, date);
                    resetEstTime();
                });
            },
        );
    }

    function handleShift(worksts, date, item, estHour, estMinute, kekurangan) {
        // Hitung tanggal berikutnya
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        const nextDateStr = nextDate.toISOString().split("T")[0];

        // Tentukan item-item yang akan digeser.
        // Ambil dari baris terakhir ke atas sampai total >= kekurangan
        const rows = getTableRows();
        const shiftItems = [];
        let totalShiftMenit = 0;

        // Mulai dari item yang dicek (edit item ini tetap di tempat), geser item di bawahnya.
        // Cari index item yang diedit
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

        // Geser dari bawah ke atas, tapi jangan item yang diedit
        for (
            let i = rows.length - 1;
            i >= 0 && totalShiftMenit < kekurangan;
            i--
        ) {
            if (i === editIndex) continue;
            const r = rows[i];
            shiftItems.unshift({
                noAntrian: r.noAntrian,
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
                    window.editEstWaktuConfig.routeStore,
                    {
                        // _method: 'PUT',
                        action: "shift",
                        worksts: worksts,
                        date: date,
                        noAntrian: item.noAntrian,
                        idBagian: item.idBagian,
                        estHour: estHour,
                        estMinute: estMinute,
                        shiftItems: shiftItems,
                        nextDate: nextDateStr,
                        jamKerjaOptimal: null, // akan diminta backend jika perlu
                    },
                    null,
                    null,
                    function (response) {
                        Swal.fire("Sukses", response.message, "success").then(
                            () => {
                                loadJadwal(worksts, date);
                                resetEstTime();
                            },
                        );
                    },
                );
            }
        });
    }

    function loadJadwal(worksts, date) {
        ajaxGet(
            window.editEstWaktuConfig.routeGetJadwal,
            { worksts: worksts, date: date },
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
                '<tr><td colspan="12" class="text-center">Tidak ada jadwal pada tanggal ini.</td></tr>';
            return;
        }
        let html = "";
        for (const row of data) {
            const rowClass = row.Status === 1 ? "row-emergency" : "";
            html += `<tr class="${rowClass}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right:8px; cursor:pointer;"><span class="noAntrian">${row.NoAntrian}</span></td>`;
            html += `<td>${row.NoOrder}</td>`;
            html += `<td>${row.EstDate}</td>`;
            html += `<td>${row.NamaDivisi}</td>`;
            html += `<td>${row.Nama_Brg}</td>`;
            html += `<td>${row.NamaBagian}</td>`;
            html += `<td>${row.EstTime}</td>`;
            html += `<td class="text-center">${row.HariKe}</td>`;
            html += `<td style="display:none;">${row.IdBagian}</td>`;
            html += `<td style="display:none;">${row.EstTimeHour}</td>`;
            html += `<td style="display:none;">${row.EstTimeMinute}</td>`;
            html += `<td style="display:none;">${row.Status}</td>`;
            html += `</tr>`;
        }
        tbodyJadwal.innerHTML = html;
    }

    function getTableRows() {
        const rows = [];
        tbodyJadwal.querySelectorAll("tr").forEach((tr) => {
            const cells = tr.querySelectorAll("td");
            if (cells.length < 12) return;
            rows.push({
                noAntrian: cells[0].textContent.trim(),
                estDate: cells[2].textContent.trim(),
                idBagian: parseInt(cells[8].textContent.trim()) || 0,
                estHour: parseInt(cells[9].textContent.trim()) || 0,
                estMinute: parseInt(cells[10].textContent.trim()) || 0,
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
                    estDate: cells[2].textContent.trim(),
                    idBagian: parseInt(cells[8].textContent.trim()) || 0,
                    estHour: parseInt(cells[9].textContent.trim()) || 0,
                    estMinute: parseInt(cells[10].textContent.trim()) || 0,
                });
            }
        });
        return items;
    }

    function clearTable() {
        tbodyJadwal.innerHTML =
            '<tr><td colspan="12" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = resetEstTime();
    }
});
//#endregion
