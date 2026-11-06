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
    const btnProses = document.getElementById("btnProses");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");

    let currentJadwalData = [];

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
            url: window.pkjEstTglConfig.routeGetMesinList,
            headers: ["ID", "Nama Mesin"],
            columns: ["NoMesin", "NamaMesin"],
            onSelect: function (row) {
                TNoMesin.value = row.NoMesin;
                TMesin.value = row.NamaMesin;
                // Reset type & tabel
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
                window.pkjEstTglConfig.routeGetTypeList +
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
            btnOK.disabled = false;
            btnOK.focus();
        }
    });

    Date1.addEventListener("change", function () {
        btnOK.disabled = true;
        clearTable();
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
        } else {
            Swal.fire(
                "Info",
                "Isi Mesin, Type Mesin, dan Tanggal terlebih dahulu.",
                "info",
            );
        }
    });

    btnProses.addEventListener("click", function () {
        const checkedItems = getCheckedItems();
        if (checkedItems.length === 0) {
            Swal.fire(
                "Pesan",
                "Pilih data yang akan di edit estimasi tanggalnya.",
                "warning",
            );
            return;
        }

        const noMesin = TNoMesin.value.trim();
        const noType = TNoType.value.trim();
        const oldDate = Date1.value;

        // Step 1: Minta keterangan (form alasan)
        showAlasanForm("Keterangan").then((result) => {
            if (!result.isConfirmed) return;

            const keterangan = result.value;

            // Step 2: Input tanggal baru
            Swal.fire({
                title: "Tanggal Baru",
                input: "date",
                showCancelButton: true,
                confirmButtonText: "OK",
                cancelButtonText: "Batal",
                preConfirm: (value) => {
                    if (!value) {
                        Swal.showValidationMessage("Tanggal baru wajib diisi");
                    }
                    return value;
                },
            }).then((res) => {
                if (!res.isConfirmed) return;
                const newDate = res.value;

                // Kirim request process
                doProcess(
                    noMesin,
                    noType,
                    oldDate,
                    newDate,
                    keterangan,
                    checkedItems,
                );
            });
        });
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


    function doProcess(noMesin, noType, oldDate, newDate, keterangan, items, jamKerjaOptimal = null) {
        let payload = {
            noMesin: noMesin,
            noType: noType,
            oldDate: oldDate,
            newDate: newDate,
            keterangan: keterangan,
            items: items.map((it) => ({
                noAntrian: it.noAntrian,
                noOrder: it.noOrder,
                idBagian: it.idBagian,
                estHour: it.estHour,
                estMinute: it.estMinute,
            })),
            jamKerjaOptimal: jamKerjaOptimal,
        };

        ajaxPost(
            window.pkjEstTglConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                if (response.message) {
                    Swal.fire("Sukses", response.message, "success").then(
                        () => {
                            loadJadwal(noMesin, noType, oldDate);
                        },
                    );
                }
            },
            function (xhr) {
                const res = xhr.responseJSON || {};
                if (res.needJamKerja) {
                    // Minta jam kerja optimal
                    const minimumJam = parseInt(res.minimumJamKerja) || 1;
                    Swal.fire({
                        title: "Jam Kerja Optimal",
                        text: res.error || "Belum ada jadwal untuk tanggal baru. Masukkan jam kerja optimal (jam):",
                        input: "number",
                        inputAttributes: { min: minimumJam, step: 1 },
                        showCancelButton: true,
                        confirmButtonText: "OK",
                        cancelButtonText: "Batal",
                        preConfirm: (value) => {
                            if (!value || parseInt(value) < minimumJam) {
                                Swal.showValidationMessage(
                                    `Jam kerja optimal minimal ${minimumJam} jam`,
                                );
                            }
                            return value;
                        },
                    }).then((r) => {
                        if (r.isConfirmed) {
                            payload.jamKerjaOptimal = parseInt(r.value);
                            doProcess(
                                noMesin,
                                noType,
                                oldDate,
                                newDate,
                                keterangan,
                                items,
                                payload.jamKerjaOptimal,
                            );
                        }
                    });
                } else if (res.needCapacityDecision) {
                    const shortage = parseInt(res.kekuranganMenit) || 0;
                    const hours = Math.floor(shortage / 60);
                    const minutes = shortage % 60;
                    Swal.fire({
                        title: "Jam kerja tidak mencukupi",
                        text: `Kekurangan ${hours} jam ${minutes} menit. Geser jadwal ke hari berikutnya (Ya) atau edit jam kerja optimal (Tidak)?`,
                        icon: "question",
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Ya, geser jadwal",
                        denyButtonText: "Edit jam kerja",
                        cancelButtonText: "Batal",
                    }).then((choice) => {
                        if (choice.isDenied) {
                            window.open(
                                window.pkjEstTglConfig.routeEditJamKerja +
                                    "?tanggal=" + safeUrlParam(newDate) +
                                    "&noMesin=" + safeUrlParam(noMesin) +
                                    "&namaMesin=" + safeUrlParam(TMesin.value) +
                                    "&noType=" + safeUrlParam(noType) +
                                    "&namaType=" + safeUrlParam(TType.value),
                                "_blank",
                            );
                        } else if (choice.isConfirmed) {
                            const next = new Date(`${newDate}T00:00:00`);
                            next.setDate(next.getDate() + 1);
                            const nextDate = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}-${String(next.getDate()).padStart(2, "0")}`;
                            shiftSelectedItems(noMesin, noType, newDate, nextDate, items);
                        }
                    });
                } else if (res.needEditJam) {
                    // Sudah ada jadwal → arahkan ke edit jam kerja optimal
                    Swal.fire({
                        title: "Jam Kerja Tidak Mencukupi",
                        text: "Tanggal baru sudah memiliki jadwal. Silakan edit jam kerja optimal terlebih dahulu.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Buka Edit Jam Kerja Optimal",
                        cancelButtonText: "Batal",
                    }).then((r) => {
                        if (r.isConfirmed) {
                            window.open(
                                window.pkjEstTglConfig.routeEditJamKerja +
                                    "?tanggal=" +
                                    safeUrlParam(newDate) +
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
                        }
                    });
                } else {
                    Swal.fire(
                        "Error",
                        res.error || "Terjadi kesalahan pada server.",
                        "error",
                    );
                }
            },
            false,
            false,
        );
    }

    function shiftSelectedItems(noMesin, noType, oldDate, newDate, items, jamKerjaOptimal = null) {
        ajaxPost(
            window.pkjEstTglConfig.routeStore,
            {
                action: "shift",
                noMesin,
                noType,
                oldDate,
                newDate,
                jamKerjaOptimal,
                items: items.map((item) => ({
                    noAntrian: item.noAntrian,
                    noOrder: item.noOrder,
                    idBagian: item.idBagian,
                    estHour: item.estHour,
                    estMinute: item.estMinute,
                })),
            },
            null,
            null,
            function (response) {
                Swal.fire("Sukses", response.message, "success").then(() => {
                    loadJadwal(noMesin, noType, oldDate);
                });
            },
            function (xhr) {
                const res = xhr.responseJSON || {};
                if (res.needJamKerja) {
                    Swal.fire({
                        title: "Jam Kerja Optimal",
                        text: `Masukkan jam kerja optimal untuk ${newDate}:`,
                        input: "number",
                        inputAttributes: { min: 1, step: 1 },
                        showCancelButton: true,
                        preConfirm: (value) => {
                            if (!value || parseInt(value, 10) <= 0) {
                                Swal.showValidationMessage("Jam kerja optimal harus > 0");
                            }
                            return value;
                        },
                    }).then((answer) => {
                        if (answer.isConfirmed) {
                            shiftSelectedItems(noMesin, noType, oldDate, newDate, items, parseInt(answer.value, 10));
                        }
                    });
                }
            },
            false,
            false,
        );
    }

    function loadJadwal(noMesin, noType, date) {
        ajaxGet(
            window.pkjEstTglConfig.routeGetJadwal,
            { noMesin: noMesin, noType: noType, date: date },
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
            let rowClass = row.Status === 1 ? "row-emergency" : "";

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
    }

    function resetForm() {
        TMesin.value = "";
        TNoMesin.value = "";
        TType.value = "";
        TNoType.value = "";
        btnOK.disabled = true;
        btnKeluar.textContent = "KELUAR";
        clearTable();
        setDefaultDate();
        btnMesin.focus();
    }
});
//#endregion
