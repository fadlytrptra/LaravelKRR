//#region Variabel DOM Elements
jQuery(function ($) {
    const BtnWrkSts = document.getElementById("btnWrkSts");
    const TNoWorkSts = document.getElementById("TNoWorkSts");
    const TWorkSts = document.getElementById("TWorkSts");
    const Date1 = document.getElementById("Date1");
    const BtnOK = document.getElementById("btnOK");
    const BtnRefresh = document.getElementById("btnRefresh");
    const BtnProses = document.getElementById("btnProses");
    const BtnKeluar = document.getElementById("btnKeluar");
    const TbodyJadwal = document.getElementById("tbodyJadwal");

    let currentJadwalData = [];
    let selectedItems = [];
    const pendingProcessKey = "konstruksiEstimasiTanggalPending";
//endregion

//#region Input & Core Events
    Date1.value = setDefaultDates();
    BtnOK.disabled = true;

    BtnKeluar.addEventListener("click", function () {
        if (this.textContent.trim().toUpperCase() === "BATAL") {
            clearTable();
            TNoWorkSts.value = "";
            TWorkSts.value = "";
            this.textContent = "KELUAR";
            BtnOK.disabled = true;
            BtnWrkSts.focus();
        } else {
            window.location.href = "/GPS";
        }
    });

    BtnWrkSts.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Work Station",
            url: window.editTanggalConfig.routeGetWorkstationList,
            headers: ["ID", "Nama Work Station"],
            columns: ["NoWrkSts", "NamaWorkStation"],
            onSelect: function (row) {
                TNoWorkSts.value = row.NoWrkSts;
                TWorkSts.value = row.NamaWorkStation;
                // Fokus ke tanggal
                Date1.focus();
            },
        });
    });

    Date1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let worksts = TNoWorkSts.value.trim();
            let date = this.value.trim();
            if (worksts && date) {
                BtnOK.disabled = false;
                BtnOK.focus();
            } else {
                Swal.fire(
                    "Info",
                    "Isi work station dan tanggal terlebih dahulu.",
                    "info",
                );
            }
        }
    });

    Date1.addEventListener("change", function () {
        BtnOK.disabled = true;
        clearTable();
    });

    BtnOK.addEventListener("click", function () {
        let worksts = TNoWorkSts.value.trim();
        let date = Date1.value.trim();
        if (!worksts || !date) {
            Swal.fire("Info", "Isi work station dan tanggal.", "info");
            return;
        }
        loadJadwal(worksts, date);
    });

    BtnRefresh.addEventListener("click", function () {
        let worksts = TNoWorkSts.value.trim();
        let date = Date1.value.trim();
        if (worksts && date) {
            loadJadwal(worksts, date);
        } else {
            Swal.fire(
                "Info",
                "Isi work station dan tanggal terlebih dahulu.",
                "info",
            );
        }
    });

    BtnProses.addEventListener("click", async function () {
        selectedItems = [];
        let orderNos = [];
        let worksts = TNoWorkSts.value.trim();
        let tanggalLama = Date1.value.trim();

        if (!worksts || !tanggalLama) {
            Swal.fire(
                "Info",
                "Work station dan tanggal lama harus diisi.",
                "info",
            );
            return;
        }

        TbodyJadwal.querySelectorAll("tr").forEach(function (tr) {
            let noOrder = tr.querySelector(".noOrder")?.textContent?.trim();
            if (noOrder) {
                orderNos.push(noOrder);
            }

            let checkbox = tr.querySelector(".rowCheckbox");
            if (checkbox && checkbox.checked) {
                let idBagian = tr.querySelector(".idBagian")?.value;
                let estHour = tr.querySelector(".estHour")?.value;
                let estMinute = tr.querySelector(".estMinute")?.value;
                let noAntrian = tr
                    .querySelector(".noAntrian")
                    ?.textContent?.trim();

                if (noAntrian) {
                    selectedItems.push({
                        noAntrian: noAntrian,
                        idBagian: idBagian,
                        estHour: estHour,
                        estMinute: estMinute,
                    });
                }
            }
        });

        if (selectedItems.length === 0) {
            Swal.fire(
                "Info",
                "Pilih minimal satu jadwal untuk diedit.",
                "info",
            );
            return;
        }

        // Flow 1: Input Alasan (Mirip Form FrmAlasan)
        const alasanResult = await showAlasanForm("Alasan Perubahan Tanggal");
        if (!alasanResult.isConfirmed) return;
        const alasan = alasanResult.value;

        // Flow 2: Input Tanggal Baru (Mirip newTgl = InputBox("Inputkan estimasi tanggal yg baru"))
        const dateResult = await Swal.fire({
            title: "Inputkan estimasi tanggal yg baru",
            input: "date",
            inputValue: "",
            showCancelButton: true,
            confirmButtonText: "Lanjut",
            cancelButtonText: "Batal",
        });


        if (!dateResult.isConfirmed || !dateResult.value) return;
        const tanggalBaru = dateResult.value;

        const confirmation = await Swal.fire({
            title: "Konfirmasi",
            text: `Anda akan mengubah tanggal dari ${tanggalLama} ke ${tanggalBaru} untuk ${selectedItems.length} jadwal.\nAlasan: ${alasan}\nLanjutkan proses?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Proses",
            cancelButtonText: "Batal",
        });

        if (confirmation.isConfirmed) {
            submitProcess({
                worksts: worksts,
                tanggal_lama: tanggalLama,
                tanggal_baru: tanggalBaru,
                items: selectedItems,
                orderNos: orderNos,
                alasan: alasan,
                jam_kerja_optimal: null,
            });
        }
    });
//#endregion

//#region Utility & Helper Functions
    function submitProcess(payload, canOpenJamKerja = true) {
        $.ajax({
            url: window.editTanggalConfig.routeStore,
            type: "POST",
            data: JSON.stringify(payload),
            contentType: "application/json",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                sessionStorage.removeItem(pendingProcessKey);
                Swal.fire("Sukses", response.message, "success").then(() => {
                    loadJadwal(payload.worksts, payload.tanggal_lama);
                });
            },
            error: async function (xhr) {
                const res = xhr.responseJSON || {};

                if (res.needJamKerja) {
                    const jamResult = await Swal.fire({
                        title: "PESAN",
                        text: res.error,
                        input: "number",
                        inputLabel: "Tentukan jam kerja optimal (Jam):",
                        inputAttributes: { min: 1, step: 1 },
                        showCancelButton: true,
                        confirmButtonText: "Submit",
                        cancelButtonText: "Batal",
                        preConfirm: (value) => {
                            const jam = Number(value);
                            if (!Number.isInteger(jam) || jam < 1) {
                                Swal.showValidationMessage(
                                    "Jam kerja optimal harus berupa bilangan bulat minimal 1.",
                                );
                                return false;
                            }
                            return jam;
                        },
                    });

                    if (jamResult.isConfirmed) {
                        submitProcess({
                            ...payload,
                            jam_kerja_optimal: jamResult.value,
                        }, canOpenJamKerja);
                    }
                    return;
                }

                if (res.needAction && canOpenJamKerja) {
                    const actionResult = await Swal.fire({
                        title: "Jam Kerja Tidak Mencukupi",
                        text: res.error,
                        icon: "warning",
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Edit Jam Kerja Optimal",
                        denyButtonText: "Geser Jadwal",
                        cancelButtonText: "Batal",
                    });

                    if (actionResult.isConfirmed) {
                        openJamKerjaPage(payload);
                    } else if (actionResult.isDenied) {
                        submitProcess({
                            ...payload,
                            action: "shift",
                            shift_jam_kerja: {},
                        });
                    }
                    return;
                }

                if (res.needShiftJamKerja) {
                    const jamResult = await Swal.fire({
                        title: "Tentukan Jam Kerja Optimal",
                        text: res.error,
                        input: "number",
                        inputLabel: `Jam kerja untuk tanggal ${res.date}`,
                        inputAttributes: { min: 1, step: 1 },
                        showCancelButton: true,
                        confirmButtonText: "Lanjut Geser",
                        cancelButtonText: "Batal",
                        preConfirm: (value) => {
                            const jam = Number(value);
                            const minimum = Math.ceil(
                                Number(res.requiredMinutes || 0) / 60,
                            );
                            if (!Number.isInteger(jam) || jam < minimum) {
                                Swal.showValidationMessage(
                                    `Jam kerja minimal ${minimum} jam.`,
                                );
                                return false;
                            }
                            return jam;
                        },
                    });

                    if (jamResult.isConfirmed) {
                        submitProcess({
                            ...payload,
                            shift_jam_kerja: {
                                ...(payload.shift_jam_kerja || {}),
                                [res.date]: jamResult.value,
                            },
                        });
                    }
                    return;
                }

                if (res.needEditJam && canOpenJamKerja) {
                    openJamKerjaPage(payload);
                    return;
                }

                sessionStorage.removeItem(pendingProcessKey);
                Swal.fire(
                    "Gagal",
                    res.error || "Terjadi kesalahan pada server",
                    "error",
                );
            },
        });
    }

    function openJamKerjaPage(payload) {
        const requiredMinutes = payload.items.reduce(
            (total, item) =>
                total +
                Number(item.estHour) * 60 +
                Number(item.estMinute),
            0,
        );
        sessionStorage.setItem(pendingProcessKey, JSON.stringify(payload));

        const query = new URLSearchParams({
            tanggal: payload.tanggal_baru,
            worksts: payload.worksts,
            workstsName: TWorkSts.value.trim(),
            requiredMinutes: String(requiredMinutes),
            resumeProcess: "1",
        });
        window.location.href =
            window.editTanggalConfig.routeEditJamKerja +
            "?" +
            query.toString();
    }

    function setDefaultDates() {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, "0");
        const d = String(today.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    }

    function loadJadwal(worksts, date) {
        ajaxGet(
            window.editTanggalConfig.routeGetJadwal,
            { worksts: worksts, date: date },
            function (data) {
                currentJadwalData = data;
                renderTable(data);

                let d = new Date(date);
                d.setDate(d.getDate() + 1);
                let nextDate = d.toISOString().split("T")[0];

                BtnKeluar.textContent = "Batal";
            },
        );
    }

    function renderTable(data) {
        let tbody = TbodyJadwal;
        tbody.innerHTML = "";

        if (!data || data.length === 0) {
            TbodyJadwal.innerHTML =
                '<tr><td colspan="12" class="text-center">Tidak ada jadwal pada tanggal ini.</td></tr>';
            return;
        }

        let html = "";
        data.forEach(function (row) {
            let isEmergency = row.Status === 1;
            let rowClass = isEmergency ? "emergency-row" : "";
            html += `<tr class="${rowClass}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right:8px; cursor:pointer;"><span class="noAntrian">${row.NoAntrian}</span></td>`;
            html += `<td><span class="noOrder">${row.NoOrder}</span></td>`;
            html += `<td>${row.EstDate}</td>`;
            html += `<td>${row.NamaDivisi}</td>`;
            html += `<td>${row.Nama_Brg}</td>`;
            html += `<td>${row.NamaBagian}</td>`;
            html += `<td>${row.EstTime}</td>`;
            html += `<td class="text-center">${row.HariKe}</td>`;
            html += `<td style="display:none;"><input type="hidden" class="idBagian" value="${row.IdBagian}"></td>`;
            html += `<td style="display:none;"><input type="hidden" class="estHour" value="${row.EstTimeHour}"></td>`;
            html += `<td style="display:none;"><input type="hidden" class="estMinute" value="${row.EstTimeMinute}"></td>`;
            html += `<td style="display:none;"><input type="hidden" class="status" value="${row.Status}"></td>`;
            html += `</tr>`;
        });
        tbody.innerHTML = html;
    }

    function clearTable() {
        TbodyJadwal.innerHTML =
            '<tr><td colspan="12" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = [];
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get("resumeProcess") === "1") {
        const pendingProcess = sessionStorage.getItem(pendingProcessKey);
        if (pendingProcess) {
            try {
                const payload = JSON.parse(pendingProcess);
                TNoWorkSts.value = payload.worksts;
                TWorkSts.value = params.get("workstsName") || "";
                Date1.value = payload.tanggal_lama;
                submitProcess(payload, false);
            } catch (error) {
                sessionStorage.removeItem(pendingProcessKey);
                Swal.fire(
                    "Gagal",
                    "Data proses yang tertunda tidak dapat dibaca. Silakan ulangi proses edit tanggal.",
                    "error",
                );
            }
        }
    }
});
//#endregion
