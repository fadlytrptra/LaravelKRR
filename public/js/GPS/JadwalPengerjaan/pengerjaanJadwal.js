//#region Variabel DOM Elements
jQuery(function ($) {
    const OptHarian = document.getElementById("pros_OptHarian");
    const OptProyek = document.getElementById("pros_OptProyek");
    const TNoOd = document.getElementById("pros_TNoOd");
    const TDivisi = document.getElementById("pros_TDivisi");
    const TKdBrg = document.getElementById("pros_TKdBrg");
    const TNoGbr = document.getElementById("pros_TNoGbr");
    const TNamaBrg = document.getElementById("pros_TNamaBrg");
    const TMesin1 = document.getElementById("pros_TMesin1");
    const TUserOrder = document.getElementById("pros_TUserOrder");
    const TKetOrder = document.getElementById("pros_TKetOrder");
    const TJml = document.getElementById("pros_TJml");
    const OdSts = document.getElementById("pros_OdSts");
    const TBagian = document.getElementById("pros_TBagian");
    const TIdBagian = document.getElementById("pros_TIdBagian");
    const btnBagian = document.getElementById("pros_btnBagian");
    const TJml1 = document.getElementById("pros_TJml1");
    const THari = document.getElementById("pros_THari");
    const TMesin = document.getElementById("pros_TMesin");
    const TNoMesin = document.getElementById("pros_TNoMesin");
    const btnMesin = document.getElementById("pros_btnMesin");
    const TType = document.getElementById("pros_TType");
    const TNoType = document.getElementById("pros_TNoType");
    const btnType = document.getElementById("pros_btnType");
    const EstDate = document.getElementById("pros_EstDate");
    const TEstTime = document.getElementById("pros_TEstTime");
    const TEstTime1 = document.getElementById("pros_TEstTime1");
    const JamKrj = document.getElementById("pros_JamKrj");
    const jamKerjaLabel = document.getElementById("pros_jamKerjaLabel");
    const Frame2 = document.getElementById("pros_Frame2");
    const btnProses = document.getElementById("pros_btnProses");
    const btnBatal = document.getElementById("pros_btnBatal");
    const btnKeluar = document.getElementById("pros_btnKeluar");

    const lMesin = document.getElementById("list_Mesin");
    const lType = document.getElementById("list_Type");
    const lTanggal = document.getElementById("list_Tanggal");
    const lJmlJam = document.getElementById("list_JmlJam");
    const lSisaJam = document.getElementById("list_SisaJam");
    const lPakai = document.getElementById("list_Pakai");
    const lTbody = document.getElementById("list_tbody");
    const lBtnProses = document.getElementById("list_btnProses");
    const lBtnBatal = document.getElementById("list_btnBatal");

    const listModalBs = new bootstrap.Modal(
        document.getElementById("list_ModalOpr"),
    );
    const getJenisOd = () => (OptHarian.checked ? "H" : "P");
    const jamKerjaPendingKey = "pengerjaanJadwal.pendingJamKerja";
    const jamKerjaResultKey = "pengerjaanJadwal.jamKerjaResult";
    const schedulerFormControls = [
        OptHarian,
        OptProyek,
        TNoOd,
        TDivisi,
        TKdBrg,
        TNoGbr,
        TNamaBrg,
        TMesin1,
        TUserOrder,
        TKetOrder,
        TJml,
        TBagian,
        TIdBagian,
        TJml1,
        THari,
        TMesin,
        TNoMesin,
        TType,
        TNoType,
        EstDate,
        TEstTime,
        TEstTime1,
    ];
    let pendingListSelection = [];

    // state untuk modal
    const modalState = {
        mesin: 0,
        noType: 0,
        tanggal: "",
        noOd: "",
        jml1: 0,
        hari: 0,
        idBag: 0,
        jenisOd: "H",
        estHour: 0,
        estMinute: 0,
        mesinNama: "",
        typeNama: "",
        jamKerja: 0,
        sisaMenit: 0,
    };
//#endregion

//#region Input & Core Events
    EstDate.valueAsDate = new Date();
    clearAll();

    OptHarian.addEventListener("change", () => {
        if (OptHarian.checked) resetAll();
    });
    OptProyek.addEventListener("change", () => {
        if (OptProyek.checked) resetAll();
    });

    btnKeluar.addEventListener("click", () => {
        window.location.href = "/GPS";
    });

    TNoOd.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            let v = TNoOd.value.trim();
            if (!v) {
                Swal.fire("Info", "Isi Nomer Ordernya.", "info");
                return;
            }
            v = v.padStart(6, "0").slice(-6);
            TNoOd.value = v;
            clearFrame2();
            loadOrder(v);
        }
    });

    btnBagian.addEventListener("click", () => {
        const noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire("Info", "Isi nomor order terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Bagian Barang",
            url:
                window.prosesJadwalConfig.routeGetBagianList +
                "?noOd=" +
                encodeURIComponent(noOd) +
                "&jenisOd=" +
                getJenisOd(),
            headers: ["ID", "Nama Bagian"],
            columns: ["IdBagian", "NamaBagian"],
            onSelect: (row) => {
                TIdBagian.value = row.IdBagian;
                TBagian.value = row.NamaBagian;
                TJml1.focus();
            },
        });
    });

    TJml1.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            if (parseFloat(TJml1.value) > 0) THari.focus();
            else {
                Swal.fire("Info", "Jml yg dikerjakan harus > 0.", "info");
                TJml1.focus();
            }
        }
    });

    THari.addEventListener("keypress", (e) => {
        if (e.key === "Enter") btnMesin.focus();
    });

    btnMesin.addEventListener("click", () => {
        openLookupModal({
            title: "Pilih Mesin",
            url: window.prosesJadwalConfig.routeGetMesinList,
            headers: ["ID", "Nama Mesin"],
            columns: ["NoMesin", "NamaMesin"],
            onSelect: (row) => {
                TNoMesin.value = row.NoMesin;
                TMesin.value = row.NamaMesin;
                TNoType.value = "";
                TType.value = "";
                jamKerjaLabel.style.display = "none";
                btnType.focus();
            },
        });
    });

    btnType.addEventListener("click", () => {
        const noMesin = TNoMesin.value.trim();
        if (!noMesin) {
            Swal.fire("Info", "Pilih mesin terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Type Mesin",
            url:
                window.prosesJadwalConfig.routeGetTypeList +
                "?noMesin=" +
                encodeURIComponent(noMesin),
            headers: ["ID", "Nama Type"],
            columns: ["NoType", "NamaType"],
            onSelect: (row) => {
                TNoType.value = row.NoType;
                TType.value = row.NamaType;
                jamKerjaLabel.style.display = "none";
                EstDate.focus();
            },
        });
    });

    EstDate.addEventListener("keypress", (e) => {
        if (e.key === "Enter") TEstTime.focus();
    });

    TEstTime.addEventListener("keypress", (e) => {
        if (e.key !== "Enter") return;
        const mesin = parseInt(TNoMesin.value);
        const noType = parseInt(TNoType.value);
        if (!mesin || !noType || !EstDate.value) {
            TEstTime1.focus();
            return;
        }

        ajaxPost(
            window.prosesJadwalConfig.routeGetJamKerja,
            { mesin, noType, estDate: EstDate.value },
            null,
            null,
            (res) => {
                if (res.ada > 0 && res.JmlJamKerja > 0) {
                    JamKrj.textContent = res.JmlJamKerja;
                    jamKerjaLabel.style.display = "inline";
                    btnProses.dataset.jamKerja = res.JmlJamKerja;
                } else {
                    jamKerjaLabel.style.display = "none";
                    btnProses.dataset.jamKerja = 0;
                }
                TEstTime1.focus();
            },
        );
    });

    TEstTime1.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            if (TNoType.value && TIdBagian.value) {
                btnProses.disabled = false;
                btnProses.focus();
            }
        }
    });

    btnBatal.addEventListener("click", resetAll);

    btnProses.addEventListener("click", doProses);
//#endregion

//#region Utility & Helper Functions
    function loadOrder(noOd) {
        ajaxPost(
            window.prosesJadwalConfig.routeGetOrder,
            { noOd, jenisOd: getJenisOd() },
            null,
            null,
            (data) => {
                TDivisi.value = data.TDivisi || "";
                TKdBrg.value = data.TKdBrg || "";
                TNamaBrg.value = data.TNamaBrg || "";
                TNoGbr.value = data.TNoGbr || "";
                TJml.value = data.TJml || "";
                OdSts.textContent = data.OdSts || "";
                TKetOrder.value = data.TKetOrder || "";
                TMesin1.value = data.TMesin || "";
                TUserOrder.value = data.TUserOrder || "";
                Frame2.disabled = false;
                btnBagian.focus();
            },
            (xhr) => {
                clearAll();
                Swal.fire(
                    "Error",
                    (xhr.responseJSON && xhr.responseJSON.error) ||
                        "Order tidak ditemukan.",
                    "error",
                );
            },
        );
    }

    function doProses() {
        const noOd = TNoOd.value.trim();
        const idBag = Number(TIdBagian.value);
        const jmlBrg = Number(TJml1.value);
        const mesin = Number(TNoMesin.value);
        const noType = Number(TNoType.value);
        const estHour = Number(TEstTime.value);
        const estMinute = Number(TEstTime1.value);

        if (!noOd || !Number.isInteger(idBag) || idBag < 1) {
            Swal.fire("Info", "Pilih order dan bagian terlebih dahulu.", "info");
            btnBagian.focus();
            return;
        }
        if (!Number.isInteger(jmlBrg) || jmlBrg < 1) {
            Swal.fire("Info", "Jumlah barang yang dikerjakan harus lebih dari nol.", "info");
            TJml1.focus();
            return;
        }
        if (!Number.isInteger(mesin) || mesin < 1 || !Number.isInteger(noType) || noType < 1) {
            Swal.fire("Info", "Pilih mesin dan type mesin terlebih dahulu.", "info");
            btnMesin.focus();
            return;
        }
        if (!EstDate.value) {
            Swal.fire("Info", "Tanggal mulai harus diisi.", "info");
            EstDate.focus();
            return;
        }
        if (
            !Number.isInteger(estHour) ||
            estHour < 0 ||
            !Number.isInteger(estMinute) ||
            estMinute < 0 ||
            estMinute > 59 ||
            (estHour === 0 && estMinute === 0)
        ) {
            Swal.fire("Error", "Estimate waktu harus lebih besar dari nol.", "error");
            TEstTime.focus();
            return;
        }

        const meta = {
            noOd,
            idBag,
            estDate: EstDate.value,
            noType,
            mesin,
            jmlBrg,
            hari: parseInt(THari.value) || 0,
            jenisOd: getJenisOd(),
            estHour,
            estMinute,
            jamKerja: parseInt(btnProses.dataset.jamKerja || 0),
            mesinNama: TMesin.value,
            typeNama: TType.value,
        };

        // 1. Cek proses (sudah ada jadwal?)
        ajaxPost(
            window.prosesJadwalConfig.routeCekProses,
            {
                noOd: meta.noOd,
                idBag: meta.idBag,
                estDate: meta.estDate,
                noType: meta.noType,
                jenisOd: meta.jenisOd,
            },
            null,
            null,
            (res) => {
                const proceed = () => promptQueueChoice(meta);
                if (res.ada > 0) {
                    Swal.fire({
                        icon: "warning",
                        title: "Sudah Ada Jadwal",
                        text: "Jadwal pengerjaan yang akan diinputkan sudah ada. Mau input lagi?",
                        showCancelButton: true,
                        confirmButtonText: "Ya, Lanjut",
                        cancelButtonText: "Tidak",
                    }).then((r) => {
                        if (r.isConfirmed) proceed();
                        else btnBagian.focus();
                    });
                } else {
                    proceed();
                }
            },
        );
    }

    // Pilih: New Queue / Insert / Cancel
    function promptQueueChoice(meta) {
        Swal.fire({
            icon: "question",
            title: "Pilih Aksi",
            html: "Tambahkan antrian baru?<br><small>Ya = antrian baru | Sisipkan = pilih posisi | Batal</small>",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Ya (Antrian Baru)",
            denyButtonText: "Sisipkan",
            cancelButtonText: "Batal",
        }).then((r) => {
            if (r.isConfirmed) handleNewQueue(meta);
            else if (r.isDenied) checkInsertQueueAvailability(meta);
            else EstDate.focus();
        });
    }

    function checkInsertQueueAvailability(meta) {
        ajaxPost(
            window.prosesJadwalConfig.routeCekEstDate,
            { mesin: meta.mesin, noType: meta.noType, estDate: meta.estDate },
            null,
            null,
            (res) => {
                if (res.ada < 1) {
                    promptSaveAsNewQueue(meta);
                    return;
                }

                ajaxPost(
                    window.prosesJadwalConfig.routeGetJamKerja,
                    {
                        mesin: meta.mesin,
                        noType: meta.noType,
                        estDate: meta.estDate,
                    },
                    null,
                    null,
                    (jamKerja) => {
                        const totalJam = parseInt(jamKerja.JmlJamKerja) || 0;
                        if (jamKerja.ada < 1 || totalJam < 1) {
                            promptSaveAsNewQueue(meta);
                            return;
                        }
                        meta.jamKerja = totalJam;
                        openListOprModal(meta);
                    },
                    (xhr) =>
                        Swal.fire(
                            "Error",
                            (xhr.responseJSON && xhr.responseJSON.error) ||
                                "Gagal memuat jam kerja optimal.",
                            "error",
                        ),
                );
            },
            (xhr) =>
                Swal.fire(
                    "Error",
                    (xhr.responseJSON && xhr.responseJSON.error) ||
                        "Gagal memeriksa jadwal pada tanggal tersebut.",
                    "error",
                ),
        );
    }

    function promptSaveAsNewQueue(meta) {
        Swal.fire({
            icon: "info",
            title: "Tidak Ada Jadwal Pengerjaan",
            text: "Jadwal pada tanggal ini belum ada, jadi order tidak bisa disisipkan. Simpan sebagai antrian baru?",
            showCancelButton: true,
            confirmButtonText: "Simpan Antrian Baru",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) handleNewQueue(meta);
        });
    }

    function handleNewQueue(meta) {
        // Tentukan status emergency
        const tglEst = new Date(meta.estDate);
        const tglSrv = new Date();
        tglSrv.setHours(0, 0, 0, 0);
        if (tglEst < tglSrv) {
            meta.status = 1;
            continueNewQueue(meta);
        } else {
            Swal.fire({
                title: "Emergency?",
                text: "Tandai sebagai emergency (status = 1)?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Emergency",
                cancelButtonText: "Tidak",
            }).then((r) => {
                meta.status = r.isConfirmed ? 1 : 0;
                continueNewQueue(meta);
            });
        }
    }

    function continueNewQueue(meta) {
        // Cek estdate sudah ada?
        ajaxPost(
            window.prosesJadwalConfig.routeCekEstDate,
            { mesin: meta.mesin, noType: meta.noType, estDate: meta.estDate },
            null,
            null,
            (res) => {
                if (res.ada < 1) {
                    // Belum ada jadwal → minta jam kerja optimal
                    promptJamKerja(meta);
                } else {
                    // Sudah ada → hitung sisa
                    ajaxPost(
                        window.prosesJadwalConfig.routeHitungSisaJam,
                        {
                            mesin: meta.mesin,
                            noType: meta.noType,
                            estDate: meta.estDate,
                        },
                        null,
                        null,
                        (sisa) => handleSisaJam(meta, sisa),
                    );
                }
            },
        );
    }

    function promptJamKerja(meta) {
        const totalInput = meta.estHour * 60 + meta.estMinute;
        Swal.fire({
            title: "Jam Kerja Optimal",
            input: "number",
            inputLabel: `Untuk tanggal ${meta.estDate} (jam)`,
            inputAttributes: { min: 1 },
            showCancelButton: true,
            confirmButtonText: "Simpan",
            cancelButtonText: "Batal",
            inputValidator: (v) => {
                if (!v || parseInt(v) * 60 < totalInput) {
                    return "Jam kerja tidak boleh < estimasi waktu.";
                }
            },
        }).then((r) => {
            if (!r.isConfirmed) return;
            const jamKerja = parseInt(r.value);
            meta.jamKerja = jamKerja;
            // Langsung insert
            insertNewQueue(meta, meta.estHour, meta.estMinute, jamKerja);
        });
    }

    function handleSisaJam(meta, sisa) {
        const totalInput = meta.estHour * 60 + meta.estMinute;
        const sisaMenit = parseInt(sisa.SisaMenitKrj_bantu || 0);
        const jamKerja = parseInt(sisa.JamKrj || 0);
        meta.jamKerja = jamKerja;

        if (totalInput <= sisaMenit) {
            // Muat semua
            insertNewQueue(meta, meta.estHour, meta.estMinute, jamKerja);
        } else {
            // Tidak muat — hitung sisa
            const sisaNoInput = totalInput - sisaMenit;
            const remJam = Math.floor(sisaNoInput / 60);
            const remMenit = sisaNoInput % 60;

            if (sisaMenit === 0) {
                Swal.fire({
                    icon: "info",
                    title: "Jadwal FULL",
                    html: `Jam kerja optimal: ${sisa.JamKrj} jam. Tidak ada sisa.`,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Input Hari Berikutnya",
                    denyButtonText: "Edit Jam Kerja",
                    cancelButtonText: "Batal",
                }).then((r) => {
                    if (r.isConfirmed) {
                        EstDate.focus();
                        Swal.fire(
                            "Info",
                            "Silakan ubah tanggal untuk hari berikutnya.",
                            "info",
                        );
                    } else if (r.isDenied) {
                        openEditJamKerja(meta);
                    }
                });
            } else {
                Swal.fire({
                    icon: "question",
                    title: "Jam Kerja Tidak Cukup",
                    html: `Sisa tersedia: <b>${sisa.SisaJamKrj} jam ${sisa.SisaMenitKrj} menit</b>.<br>Sisa ${remJam} jam ${remMenit} menit akan diinput hari berikutnya?`,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Ya (Hari Berikutnya)",
                    denyButtonText: "Edit Jam Kerja",
                    cancelButtonText: "Batal",
                }).then((r) => {
                    if (r.isConfirmed) {
                        // Insert partial dengan sisa jam
                        insertNewQueue(
                            meta,
                            sisa.SisaJamKrj,
                            sisa.SisaMenitKrj,
                            jamKerja,
                            {
                                partialJam: remJam,
                                partialMenit: remMenit,
                            },
                        );
                    } else if (r.isDenied) {
                        openEditJamKerja(meta);
                    }
                });
            }
        }
    }

    function openEditJamKerja(meta, returnAction = "recheckQueue") {
        const route = window.prosesJadwalConfig.routeEditJamKerja;
        if (!route) {
            Swal.fire(
                "Error",
                "Halaman Edit Jam Kerja Optimal belum dikonfigurasi.",
                "error",
            );
            return;
        }

        const params = new URLSearchParams({
            tanggal: meta.estDate,
            noMesin: String(meta.mesin),
            namaMesin: meta.mesinNama || "",
            noType: String(meta.noType),
            namaType: meta.typeNama || "",
            returnTo: "pengerjaan-jadwal",
            returnUrl: window.location.href,
        });
        const pending = {
            meta,
            returnAction,
            formState: captureSchedulerState(),
            modalState: { ...modalState },
            selectedAntri: Array.from(
                document.querySelectorAll("#list_tbody input.row-check:checked"),
                (checkbox) => checkbox.dataset.noantri,
            ),
        };

        try {
            sessionStorage.setItem(jamKerjaPendingKey, JSON.stringify(pending));
            sessionStorage.removeItem(jamKerjaResultKey);
        } catch (error) {
            try {
                sessionStorage.removeItem(jamKerjaPendingKey);
                sessionStorage.removeItem(jamKerjaResultKey);
            } catch (storageError) {}
            Swal.fire(
                "Error",
                "Konteks form tidak dapat disimpan pada browser ini. Edit Jam Kerja tidak dibuka agar data pengerjaan tidak hilang.",
                "error",
            );
            return;
        }

        window.location.href = `${route}?${params.toString()}`;
    }

    function captureSchedulerState() {
        const controls = {};
        schedulerFormControls.forEach((control) => {
            controls[control.id] =
                control.type === "radio" || control.type === "checkbox"
                    ? { checked: control.checked }
                    : { value: control.value };
        });

        return {
            controls,
            orderStatus: OdSts.textContent,
            jamKerja: JamKrj.textContent,
            jamKerjaLabelDisplay: jamKerjaLabel.style.display,
            frame2Disabled: Frame2.disabled,
            processDisabled: btnProses.disabled,
            processJamKerja: btnProses.dataset.jamKerja || "0",
        };
    }

    function restoreSchedulerState(state) {
        if (!state) return;

        schedulerFormControls.forEach((control) => {
            const saved = state.controls && state.controls[control.id];
            if (!saved) return;
            if (Object.prototype.hasOwnProperty.call(saved, "checked")) {
                control.checked = saved.checked;
            } else if (Object.prototype.hasOwnProperty.call(saved, "value")) {
                control.value = saved.value;
            }
        });

        OdSts.textContent = state.orderStatus || "";
        JamKrj.textContent = state.jamKerja || "0";
        jamKerjaLabel.style.display = state.jamKerjaLabelDisplay || "none";
        Frame2.disabled = Boolean(state.frame2Disabled);
        btnProses.disabled = Boolean(state.processDisabled);
        btnProses.dataset.jamKerja = state.processJamKerja || "0";
    }

    function resumeAfterEditJamKerja() {
        let pending;
        let result;
        try {
            const pendingJson = sessionStorage.getItem(jamKerjaPendingKey);
            if (!pendingJson) return;
            pending = JSON.parse(pendingJson);
            const resultJson = sessionStorage.getItem(jamKerjaResultKey);
            result = resultJson ? JSON.parse(resultJson) : null;
            sessionStorage.removeItem(jamKerjaPendingKey);
            sessionStorage.removeItem(jamKerjaResultKey);
        } catch (error) {
            try {
                sessionStorage.removeItem(jamKerjaPendingKey);
                sessionStorage.removeItem(jamKerjaResultKey);
            } catch (storageError) {}
            Swal.fire("Error", "Konteks Edit Jam Kerja tidak dapat dipulihkan.", "error");
            return;
        }

        restoreSchedulerState(pending.formState);
        if (pending.modalState) Object.assign(modalState, pending.modalState);

        if (pending.returnAction === "refreshList") {
            pendingListSelection = Array.isArray(pending.selectedAntri)
                ? pending.selectedAntri.map(String)
                : [];
            listModalBs.show();
            loadListAntri();
            return;
        }

        if (!result || result.status !== "saved") return;

        const meta = pending.meta || {};
        if (
            result.tanggal !== meta.estDate ||
            String(result.noMesin) !== String(meta.mesin) ||
            String(result.noType) !== String(meta.noType)
        ) {
            Swal.fire(
                "Error",
                "Jam kerja yang diperbarui tidak sesuai dengan jadwal yang sedang diproses.",
                "error",
            );
            return;
        }

        ajaxPost(
            window.prosesJadwalConfig.routeHitungSisaJam,
            {
                mesin: meta.mesin,
                noType: meta.noType,
                estDate: meta.estDate,
            },
            null,
            null,
            (sisa) => handleSisaJam(meta, sisa),
            (xhr) =>
                Swal.fire(
                    "Error",
                    (xhr.responseJSON && xhr.responseJSON.error) ||
                        "Gagal menghitung ulang sisa jam kerja.",
                    "error",
                ),
        );
    }

    function insertNewQueue(meta, estHour, estMinute, jamKerja, partial) {
        ajaxPost(
            window.prosesJadwalConfig.routeInsertNewQue,
            {
                noOd: meta.noOd,
                estDate: meta.estDate,
                estHour,
                estMinute,
                noType: meta.noType,
                mesin: meta.mesin,
                jamKrj: jamKerja,
                status: meta.status,
                jmlBrg: meta.jmlBrg,
                idBag: meta.idBag,
                hari: meta.hari,
                jenisOd: meta.jenisOd,
            },
            null,
            null,
            (res) => {
                // Simpan status ready jika estDate <= 3 hari
                const tglEst = new Date(meta.estDate);
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                const max = new Date(now);
                max.setDate(max.getDate() + 3);
                if (tglEst >= now && tglEst <= max) {
                    ajaxPost(window.prosesJadwalConfig.routeSaveStsReady, {
                        idBag: meta.idBag,
                        estDate: meta.estDate,
                    });
                }

                if (partial) {
                    // Tampilkan sisa & fokus ke est date
                    Swal.fire({
                        icon: "success",
                        title: "Data TerSIMPAN (Sebagian)",
                        html: `Sisa ${partial.partialJam} jam ${partial.partialMenit} menit harus diinput hari berikutnya.`,
                    }).then(() => {
                        TEstTime.value = partial.partialJam;
                        TEstTime1.value = partial.partialMenit;
                        EstDate.focus();
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Data TerSIMPAN",
                        text: `Input jadwal lain untuk order ${meta.noOd}?`,
                        showCancelButton: true,
                        confirmButtonText: "Ya (Lanjut)",
                        cancelButtonText: "Selesai",
                    }).then((r) => {
                        if (r.isConfirmed) clearFrame2();
                        else clearAll();
                    });
                }
            },
            (xhr) =>
                Swal.fire(
                    "Error",
                    (xhr.responseJSON && xhr.responseJSON.error) ||
                        "Gagal simpan.",
                    "error",
                ),
        );
    }

    function openListOprModal(meta) {
        modalState.mesin = meta.mesin;
        modalState.noType = meta.noType;
        modalState.tanggal = meta.estDate;
        modalState.noOd = meta.noOd;
        modalState.jml1 = meta.jmlBrg;
        modalState.hari = meta.hari;
        modalState.idBag = meta.idBag;
        modalState.jenisOd = meta.jenisOd;
        modalState.estHour = meta.estHour;
        modalState.estMinute = meta.estMinute;
        modalState.mesinNama = meta.mesinNama;
        modalState.typeNama = meta.typeNama;
        modalState.jamKerja = meta.jamKerja;

        lMesin.textContent = meta.mesinNama;
        lType.textContent = meta.typeNama;
        lTanggal.textContent = meta.estDate;
        lJmlJam.textContent = meta.jamKerja + " jam";

        loadListAntri();
        listModalBs.show();
    }

    function loadListAntri() {
        lTbody.innerHTML =
            '<tr><td colspan="10" class="text-center text-muted">Memuat data...</td></tr>';

        ajaxPost(
            window.prosesJadwalConfig.routeGetListAntri,
            {
                mesin: modalState.mesin,
                noType: modalState.noType,
                tanggal: modalState.tanggal,
            },
            null,
            null,
            (res) => {
                modalState.sisaMenit = Math.max(
                    0,
                    (parseInt(res.sisaJam) || 0) * 60 +
                        (parseInt(res.sisaMenit) || 0),
                );
                lSisaJam.textContent =
                    res.sisaJam + " jam " + res.sisaMenit + " menit";
                lPakai.textContent =
                    res.pakaiJam + " jam " + res.pakaiMenit + " menit";

                if (!res.data || res.data.length === 0) {
                    lTbody.innerHTML =
                        '<tr><td colspan="10" class="text-center text-muted">Tidak ada antrian pada tanggal ini.</td></tr>';
                    pendingListSelection = [];
                    return;
                }

                let html = "";
                res.data.forEach((row, idx) => {
                    let cls = "";
                    if (row.Status === 1) cls = "row-emergency";
                    if (row.Cancel === 1) cls = "row-cancel";
                    if (row.Finish === "Y") cls = "row-finish";

                    html += '<tr class="' + cls + '">';
                    html += '<td class="tbl-cell text-center">';
                    html += `<input type="checkbox" class="row-check" data-index="${idx}" data-noantri="${esc(row.NoAntrian)}">`;
                    html += "</td>";
                    html += `<td class="tbl-cell">${esc(row.NoAntrian)}</td>`;
                    html += `<td class="tbl-cell">${esc(row.NoOrder)}</td>`;
                    html += `<td class="tbl-cell">${esc(row.NamaBarang)}</td>`;
                    html += `<td class="tbl-cell">${esc(row.KdBarang)}</td>`;
                    html += `<td class="tbl-cell">${esc(row.EstTime)}</td>`;
                    html += `<td class="tbl-cell">${esc(row.Divisi)}</td>`;
                    html += `<td class="tbl-cell text-end">${esc(row.JmlOrder)}</td>`;
                    html += `<td class="tbl-cell">${esc(row.NamaBagian)}</td>`;
                    html += `<td class="tbl-cell text-end">${esc(row.JmlDikerjakan)}</td>`;
                    html += "</tr>";
                });
                lTbody.innerHTML = html;
                if (pendingListSelection.length > 0) {
                    const selected = new Set(pendingListSelection);
                    document
                        .querySelectorAll("#list_tbody input.row-check")
                        .forEach((checkbox) => {
                            checkbox.checked = selected.has(
                                String(checkbox.dataset.noantri),
                            );
                        });
                    pendingListSelection = [];
                }
            },
            (xhr) => {
                lTbody.innerHTML =
                    '<tr><td colspan="10" class="text-center text-danger">Gagal memuat data.</td></tr>';
                pendingListSelection = [];
            },
        );
    }

    lBtnBatal.addEventListener("click", () => listModalBs.hide());

    lBtnProses.addEventListener("click", () => {
        const checked = [];
        document
            .querySelectorAll("#list_tbody input.row-check:checked")
            .forEach((cb) => {
                checked.push({
                    index: parseInt(cb.dataset.index),
                    noAntri: cb.dataset.noantri,
                });
            });

        if (checked.length === 0) {
            Swal.fire("Info", "Pilih minimal 1 nomer antrian.", "info");
            return;
        }
        if (checked.length > 2) {
            Swal.fire("Info", "Maksimal 2 nomer antrian.", "info");
            return;
        }

        const sorted = checked.sort((a, b) => a.index - b.index);
        let noAntri;

        if (sorted.length === 1) {
            // 1 antrian: harus di posisi teratas
            if (sorted[0].index !== 0) {
                Swal.fire(
                    "Info",
                    "Untuk 1 pilihan, harus memilih nomer antrian paling atas.",
                    "info",
                );
                return;
            }
            const k = parseInt(sorted[0].noAntri);
            noAntri =
                k - 1 > 0
                    ? String(k - 1).padStart(7, "0")
                    : String(k).padStart(7, "0");
        } else {
            // 2 antrian: sisipkan di antaranya
            const k = parseInt(sorted[0].noAntri);
            const m = parseInt(sorted[1].noAntri);
            noAntri =
                m - k > 1
                    ? String(k + 1).padStart(7, "0")
                    : String(m).padStart(7, "0");
        }

        const totalInputMenit =
            modalState.estHour * 60 + modalState.estMinute;
        const tglEst = new Date(modalState.tanggal);
        const tglSrv = new Date();
        tglSrv.setHours(0, 0, 0, 0);
        const confirmEmergency = (status, menitDiinput = totalInputMenit) => {
            const sisaMenit = totalInputMenit - menitDiinput;
            const estHour = Math.floor(menitDiinput / 60);
            const estMinute = menitDiinput % 60;
            ajaxPost(
                window.prosesJadwalConfig.routeInsertAppQue,
                {
                    noAntri,
                    noOd: modalState.noOd,
                    estDate: modalState.tanggal,
                    estHour,
                    estMinute,
                    noType: modalState.noType,
                    mesin: modalState.mesin,
                    jamKrj: modalState.jamKerja,
                    status,
                    jmlBrg: modalState.jml1,
                    idBag: modalState.idBag,
                    hari: modalState.hari,
                    jenisOd: modalState.jenisOd,
                },
                null,
                null,
                (res) => {
                    listModalBs.hide();
                    if (sisaMenit > 0) {
                        const sisaJamInput = Math.floor(sisaMenit / 60);
                        const sisaMenitInput = sisaMenit % 60;
                        Swal.fire({
                            icon: "success",
                            title: "Data Tersimpan Sebagian",
                            html: `${res.message || "Data tersimpan."}<br>Sisa ${sisaJamInput} jam ${sisaMenitInput} menit perlu dijadwalkan pada tanggal berikutnya.`,
                        }).then(() => {
                            TEstTime.value = sisaJamInput;
                            TEstTime1.value = sisaMenitInput;
                            EstDate.focus();
                        });
                        return;
                    }

                    Swal.fire({
                        icon: "success",
                        title: "Input Lagi?",
                        text: `Input jadwal lain untuk order ${modalState.noOd}?`,
                        showCancelButton: true,
                        confirmButtonText: "Ya",
                        cancelButtonText: "Selesai",
                    }).then((r) => {
                        if (r.isConfirmed) clearFrame2();
                        else clearAll();
                    });
                },
                (xhr) =>
                    Swal.fire(
                        "Error",
                        (xhr.responseJSON && xhr.responseJSON.error) ||
                            "Gagal simpan.",
                        "error",
                    ),
            );
        };

        const promptEmergency = (menitDiinput) => {
            if (tglEst < tglSrv) {
                confirmEmergency(1, menitDiinput);
                return;
            }

            Swal.fire({
                title: "Emergency?",
                text: "Tandai sebagai emergency (status = 1)?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Emergency",
                cancelButtonText: "Tidak",
            }).then((r) =>
                confirmEmergency(r.isConfirmed ? 1 : 0, menitDiinput),
            );
        };

        if (totalInputMenit > modalState.sisaMenit) {
            if (modalState.sisaMenit === 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Jadwal FULL",
                    text: "Tidak ada sisa jam kerja untuk menyisipkan order.",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Ubah Tanggal",
                    denyButtonText: "Edit Jam Kerja",
                    cancelButtonText: "Batal",
                }).then((result) => {
                    if (result.isConfirmed) {
                        EstDate.focus();
                        Swal.fire(
                            "Info",
                            "Silakan ubah tanggal untuk hari berikutnya.",
                            "info",
                        );
                    } else if (result.isDenied) {
                        openEditJamKerja(
                            {
                                estDate: modalState.tanggal,
                                mesin: modalState.mesin,
                                noType: modalState.noType,
                                mesinNama: modalState.mesinNama,
                                typeNama: modalState.typeNama,
                            },
                            "refreshList",
                        );
                    }
                });
                return;
            }

            const sisaInput = totalInputMenit - modalState.sisaMenit;
            const sisaJamInput = Math.floor(sisaInput / 60);
            const sisaMenitInput = sisaInput % 60;
            const sisaJamTersedia = Math.floor(modalState.sisaMenit / 60);
            const sisaMenitTersedia = modalState.sisaMenit % 60;

            Swal.fire({
                icon: "question",
                title: "Jam Kerja Tidak Cukup",
                html: `Sisa tersedia: <b>${sisaJamTersedia} jam ${sisaMenitTersedia} menit</b>.<br>Sisipkan bagian yang muat dan jadwalkan sisa ${sisaJamInput} jam ${sisaMenitInput} menit pada tanggal berikutnya?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Sisipkan Sebagian",
                denyButtonText: "Edit Jam Kerja",
                cancelButtonText: "Batal",
            }).then((result) => {
                if (result.isConfirmed) {
                    promptEmergency(modalState.sisaMenit);
                } else if (result.isDenied) {
                    openEditJamKerja(
                        {
                            estDate: modalState.tanggal,
                            mesin: modalState.mesin,
                            noType: modalState.noType,
                            mesinNama: modalState.mesinNama,
                            typeNama: modalState.typeNama,
                        },
                        "refreshList",
                    );
                }
            });
            return;
        }

        promptEmergency(totalInputMenit);
    });

    function clearFrame2() {
        TBagian.value = "";
        TIdBagian.value = "";
        TJml1.value = "0";
        THari.value = "0";
        TMesin.value = "";
        TNoMesin.value = "";
        TType.value = "";
        TNoType.value = "";
        TEstTime.value = "0";
        TEstTime1.value = "0";
        JamKrj.textContent = "0";
        jamKerjaLabel.style.display = "none";
        EstDate.valueAsDate = new Date();
        btnProses.disabled = true;
        btnBagian.focus();
    }

    function clearAll() {
        TNoOd.value = "";
        TDivisi.value = "";
        TKdBrg.value = "";
        TNoGbr.value = "";
        TNamaBrg.value = "";
        TMesin1.value = "";
        TUserOrder.value = "";
        TKetOrder.value = "";
        TJml.value = "";
        OdSts.textContent = "";
        Frame2.disabled = true;
        clearFrame2();
        TNoOd.focus();
    }

    function resetAll() {
        // OptHarian.checked = true;
        // OptProyek.checked = false;
        clearAll();
    }

    function esc(s) {
        return String(s == null ? "" : s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    window.addEventListener("pageshow", resumeAfterEditJamKerja);
    resumeAfterEditJamKerja();
});
//#endregion
