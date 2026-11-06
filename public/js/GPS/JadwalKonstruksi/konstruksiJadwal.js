//#region Variabel DOM Elements
jQuery(function ($) {
    const isKonsPage = !!document.getElementById("input_jadwal_form");
    const isListModal = !!document.getElementById("list_ModalKons");

    if (!isKonsPage && !isListModal) return;

    const kNoOd = document.getElementById("kons_TNoOd");
    const kDivisi = document.getElementById("kons_TDivisi");
    const kKdBrg = document.getElementById("kons_TKdBrg");
    const kNamaBrg = document.getElementById("kons_TNamaBrg");
    const kNoGbr = document.getElementById("kons_TNoGbr");
    const kOdSts = document.getElementById("kons_OdSts");
    const kKetOrder = document.getElementById("kons_TKetOrder");
    const kMesin = document.getElementById("kons_TMesin1");
    const kUserOrder = document.getElementById("kons_TUserOrder");
    const kTBagian = document.getElementById("kons_TBagian");
    const kTIdBagian = document.getElementById("kons_TIdBagian");
    const kBtnBagian = document.getElementById("kons_btnBagian");
    const kTWorkSts = document.getElementById("kons_TWorkSts");
    const kTNoWorkSts = document.getElementById("kons_TNoWorkSts");
    const kBtnWorkSts = document.getElementById("kons_btnWrkSts");
    const kTTanggal = document.getElementById("kons_TTanggal");
    const kTHari = document.getElementById("kons_THari");
    const kTEstTime = document.getElementById("kons_TEstTime");
    const kTEstTime1 = document.getElementById("kons_TEstTime1");
    const kJamKrj = document.getElementById("kons_JamKrj");
    const kJamKrjLabel = document.getElementById("kons_jamKerjaLabel");
    const kEstStart = document.getElementById("kons_EstStart");
    const kEstFinish = document.getElementById("kons_EstFinish");
    const kFrame2 = document.getElementById("kons_Frame2");
    const kBtnProses = document.getElementById("kons_btnProses");
    const kBtnBatal = document.getElementById("kons_btnBatal");
    const kBtnKeluar = document.getElementById("kons_btnKeluar");

    const lWorkSts = document.getElementById("list_WorkSts");
    const lTanggal = document.getElementById("list_Tanggal");
    const lJmlJam = document.getElementById("list_JmlJam");
    const lSisaJam = document.getElementById("list_SisaJam");
    const lPakai = document.getElementById("list_Pakai");
    const lTbody = document.getElementById("list_tbody");
    const lBtnProses = document.getElementById("list_btnProses");
    const lBtnBatal = document.getElementById("list_btnBatal");

    let listModalBs = null;
    if (isListModal) {
        listModalBs = new bootstrap.Modal(
            document.getElementById("list_ModalKons"),
        );
    }

    // State untuk menyimpan konteks dari Kons page
    const konsState = {
        noOd: "",
        idBag: "",
        worksts: "",
        tanggal: "",
        estHour: 0,
        estMinute: 0,
        hari: 0,
    };
    const pendingEditKey = "konstruksiJadwalPendingEdit";
    let statusKerja = 0;
    let serverDate = window.inputJadwalConfig.serverDate;
//#endregion

//#region Input & Core Events
    if (isKonsPage) {
        kBtnKeluar.addEventListener("click", function () {
            window.location.href = "/GPS";
        });

        // Enter No Order → load order
        kNoOd.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                let noOdVal = this.value.trim();
                if (noOdVal !== "") {
                    noOdVal = noOdVal.padStart(6, "0").slice(-6);
                    kNoOd.value = noOdVal;
                    loadOrder(noOdVal);
                } else {
                    Swal.fire("Info", "Isi Nomer Ordernya.", "info");
                }
            }
        });

        // Lookup Bagian
        kBtnBagian.addEventListener("click", function () {
            const noOd = kNoOd.value.trim();
            if (!noOd) {
                Swal.fire("Info", "Isi nomor order dahulu.", "info");
                return;
            }

            openLookupModal({
                title: "Pilih Bagian Barang",
                url:
                    window.inputJadwalConfig.routeGetBagianList +
                    "?noOd=" +
                    safeUrlParam(noOd),
                headers: ["ID", "Nama Bagian"],
                columns: ["IdBagian", "NamaBagian"],
                onSelect: function (row) {
                    kTIdBagian.value = row.IdBagian;
                    kTBagian.value = row.NamaBagian;
                    kBtnWorkSts.focus();
                },
            });
        });

        // Lookup Work Station
        kBtnWorkSts.addEventListener("click", function () {
            openLookupModal({
                title: "Pilih Work Station",
                url: window.inputJadwalConfig.routeGetWorkstationList,
                headers: ["ID", "Nama Work Station"],
                columns: ["NoWrkSts", "NamaWorkStation"],
                onSelect: function (row) {
                    kTNoWorkSts.value = row.NoWrkSts;
                    kTWorkSts.value = row.NamaWorkStation;
                    kJamKrj.textContent = "";
                    kTTanggal.focus();
                },
            });
        });

        // Enter Tanggal → cek estimasi
        kTTanggal.addEventListener("keypress", function (e) {
            if (e.key !== "Enter") return;
            validateTanggal(function () {
                kTHari.focus();
            });
        });

        // Enter Hari Ke- → fokus ke Est.Waktu Jam
        kTHari.addEventListener("keypress", function (e) {
            if (e.key === "Enter") kTEstTime.focus();
        });

        // Enter Est.Waktu (Jam) → hitung sisa jam kerja
        kTEstTime.addEventListener("keypress", function (e) {
            if (e.key !== "Enter") return;
            const worksts = kTNoWorkSts.value.trim();
            if (!worksts || !kTTanggal.value) {
                kTEstTime1.focus();
                return;
            }

            ajaxPost(
                window.inputJadwalConfig.routeGetJamKerja,
                { worksts: parseInt(worksts), estDate: kTTanggal.value },
                null,
                null,
                function (res) {
                    if (res.ada > 0 && res.JmlJamKerja > 0) {
                        kJamKrj.textContent = res.JmlJamKerja + " JAM";
                        kJamKrjLabel.style.display = "inline";
                    } else {
                        kJamKrj.textContent = "";
                        kJamKrjLabel.style.display = "none";
                    }
                    kTEstTime1.focus();
                },
            );
        });

        // Enter Est.Waktu (Menit) → fokus ke Proses
        kTEstTime1.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                if (!kBtnProses.disabled) kBtnProses.focus();
            }
        });

        // Enable btnProses saat user isi menit
        kTEstTime1.addEventListener("input", function () {
            if (kTTanggal.value && kTIdBagian.value && kTNoWorkSts.value) {
                kBtnProses.disabled = false;
            }
        });

        // Batal
        kBtnBatal.addEventListener("click", function () {
            clearAll();
        });

        // PROSES
        kBtnProses.addEventListener("click", function () {
            const estHour = parseInt(kTEstTime.value) || 0;
            const estMinute = parseInt(kTEstTime1.value) || 0;
            if (estHour === 0 && estMinute === 0) {
                Swal.fire("Error", "Estimate waktu harus > 0.", "error");
                kTEstTime.focus();
                return;
            }
            doProses(estHour, estMinute);
        });
//#endregion

//#region Utility & Helper Functions
        function loadOrder(noOrder) {
            ajaxGet(
                window.inputJadwalConfig.routeGetOrder,
                { noOd: noOrder },
                function (data) {
                    kDivisi.value = data.TDivisi;
                    kKdBrg.value = data.TKdBrg;
                    kNamaBrg.value = data.TNamaBrg;
                    kNoGbr.value = data.TNoGbr;
                    kOdSts.textContent = data.OdSts;
                    kKetOrder.value = data.TKetOrder;
                    kMesin.value = data.TMesin;
                    kUserOrder.value = data.TUserOrder;

                    clearDetail1();
                    kFrame2.disabled = false;
                    let today = serverDate;
                    kTTanggal.value = today;

                    kBtnBagian.focus();

                    const pending = getPendingEdit();
                    if (pending && pending.noOd === noOrder) {
                        restorePendingEdit(pending);
                        sessionStorage.removeItem(pendingEditKey);
                        setTimeout(function () {
                            doInsertNewQue(pending.estHour, pending.estMinute);
                        }, 0);
                    }
                },
            ).fail(function (xhr) {
                if (xhr.status === 400 || xhr.status === 404) {
                    clearAll();
                }
            });
        }

        function doProses(estHour, estMinute) {
            validateTanggal(function () {
                cekProses(estHour, estMinute);
            });
        }

        function validateTanggal(callback) {
            const noOd = kNoOd.value.trim();
            if (!noOd || !kTTanggal.value) {
                Swal.fire("Info", "Isi nomor order dan tanggal.", "info");
                return;
            }

            ajaxPost(
                window.inputJadwalConfig.routeCekEstimasi,
                { noOd: noOd },
                null,
                null,
                function (res) {
                    if (res.ada <= 0) {
                        Swal.fire(
                            "Error",
                            "No. Order belum ada estimasi jadwal. Hubungi PPIC.",
                            "error",
                        );
                        return;
                    }
                    serverDate = res.serverDate || serverDate;
                    const inputDate = kTTanggal.value;
                    const startDate = String(res.TglS).slice(0, 10);
                    const finishDate = String(res.TglF).slice(0, 10);
                    if (inputDate < startDate) {
                        Swal.fire(
                            "Error",
                            "Tgl < estimasi Tgl Start (" +
                                res.TglS +
                                ") dari PPIC.",
                            "error",
                        );
                        kTTanggal.focus();
                        return;
                    }
                    if (inputDate > finishDate) {
                        Swal.fire(
                            "Error",
                            "Tgl > estimasi Tgl Finish (" +
                                res.TglF +
                                ") dari PPIC.",
                            "error",
                        );
                        kTTanggal.focus();
                        return;
                    }
                    callback();
                },
            );
        }

        function cekProses(estHour, estMinute) {
            // 1) Cek proses (jadwal sudah ada?)
            ajaxPost(
                window.inputJadwalConfig.routeCekProses,
                {
                    idBag: parseInt(kTIdBagian.value),
                    estDate: kTTanggal.value,
                    worksts: parseInt(kTNoWorkSts.value),
                },
                null,
                null,
                function (res) {
                    if (res.ada > 0) {
                        Swal.fire({
                            icon: "warning",
                            title: "Sudah ada",
                            text: "Jadwal konstruksi untuk kombinasi ini sudah ada. Lanjut input?",
                            showCancelButton: true,
                            confirmButtonText: "Ya, Lanjut",
                            cancelButtonText: "Batal",
                        }).then(function (r) {
                            if (r.isConfirmed) askQueuePos(estHour, estMinute);
                            else kBtnBagian.focus();
                        });
                    } else {
                        askQueuePos(estHour, estMinute);
                    }
                },
            );
        }

        // Dialog pilih_que
        function askQueuePos(estHour, estMinute) {
            Swal.fire({
                icon: "question",
                title: "Pilih Aksi",
                html: "Tambahkan antrian baru?<br><small>Yes = antrian baru &nbsp;|&nbsp; No = sisipkan di posisi tertentu &nbsp;|&nbsp; Cancel = batal</small>",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Ya (Antrian Baru)",
                denyButtonText: "Sisipkan",
                cancelButtonText: "Batal",
            }).then(function (r) {
                if (r.isConfirmed) {
                    confirmStatusThen(function () {
                        doInsertNewQue(estHour, estMinute);
                    });
                } else if (r.isDenied) {
                    ajaxPost(
                        window.inputJadwalConfig.routeCekEstDate,
                        {
                            estDate: kTTanggal.value,
                            worksts: parseInt(kTNoWorkSts.value),
                        },
                        null,
                        null,
                        function (res) {
                            if (res.ada < 1) {
                                Swal.fire({
                                    icon: "info",
                                    title: "Tidak ada jadwal konstruksi",
                                    text: "Tidak bisa disisipkan. Disimpan sebagai antrian baru?",
                                    showCancelButton: true,
                                    confirmButtonText: "Ya",
                                    cancelButtonText: "Tidak",
                                }).then(function (save) {
                                    if (save.isConfirmed) {
                                        confirmStatusThen(function () {
                                            doInsertNewQue(estHour, estMinute);
                                        });
                                    }
                                });
                            } else {
                                confirmStatusThen(function () {
                                    doShowListKons(estHour, estMinute);
                                });
                            }
                        },
                    );
                } else kTTanggal.focus();
            });
        }

        function confirmStatusThen(callback) {
            if (kTTanggal.value < serverDate) {
                statusKerja = 1;
                window.konsStatusKerja = statusKerja;
                callback();
                return;
            }

            Swal.fire({
                icon: "question",
                title: "Tidak emergency.... ??",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            }).then(function (r) {
                statusKerja = r.isConfirmed ? 0 : 1;
                window.konsStatusKerja = statusKerja;
                if (r.isConfirmed || r.dismiss === Swal.DismissReason.cancel) {
                    callback();
                }
            });
        }

        // pilih_que = 1 → insert new queue
        function doInsertNewQue(estHour, estMinute) {
            const tanggal = kTTanggal.value;
            const worksts = kTNoWorkSts.value;

            // Cek estDate sudah ada? → minta input jam kerja optimal
            ajaxPost(
                window.inputJadwalConfig.routeCekEstDate,
                { estDate: tanggal, worksts: parseInt(worksts) },
                null,
                null,
                function (res) {
                    if (res.ada < 1) {
                        // Belum ada jadwal → minta jam kerja optimal
                        Swal.fire({
                            title: "Jam Kerja Optimal",
                            input: "number",
                            inputLabel: "Untuk tanggal " + tanggal + " (jam)",
                            inputAttributes: { min: 1 },
                            showCancelButton: true,
                            confirmButtonText: "OK",
                            cancelButtonText: "Batal",
                            inputValidator: function (v) {
                                const totalMenit = estHour * 60 + estMinute;
                                if (!v || parseInt(v) * 60 < totalMenit) {
                                    return "Jam kerja tidak boleh < estimasi waktu.";
                                }
                            },
                        }).then(function (r) {
                            if (!r.isConfirmed) return;
                            insertNewQueue(
                                estHour,
                                estMinute,
                                parseInt(r.value),
                                "new",
                            );
                        });
                    } else {
                        // Sudah ada → hitung sisa
                        ajaxPost(
                            window.inputJadwalConfig.routeHitungSisaJam,
                            { estDate: tanggal, worksts: parseInt(worksts) },
                            null,
                            null,
                            function (h) {
                                const totalInput = estHour * 60 + estMinute;
                                if (totalInput <= h.SisaMenitKrj_bantu) {
                                    insertNewQueue(
                                        estHour,
                                        estMinute,
                                        h.JamKrj,
                                        "new",
                                    );
                                } else {
                                    const sisaJam = h.SisaJamKrj || 0;
                                    const sisaMenit = h.SisaMenitKrj || 0;
                                    const editJamKerja = function () {
                                        openJamKerjaEditor(estHour, estMinute);
                                    };

                                    if (h.SisaMenitKrj_bantu <= 0) {
                                        Swal.fire({
                                            icon: "question",
                                            title: "Jadwal FULL",
                                            text: "Edit jam kerja optimal (OK), atau diinputkan di hari berikutnya (Cancel)?",
                                            showCancelButton: true,
                                            confirmButtonText: "OK",
                                            cancelButtonText: "Cancel",
                                        }).then(function (r) {
                                            if (r.isConfirmed) editJamKerja();
                                            else kTTanggal.focus();
                                        });
                                        return;
                                    }

                                    Swal.fire(
                                        "Info",
                                        "Karena jam kerja yang bisa masuk: " +
                                            sisaJam +
                                            " jam " +
                                            sisaMenit +
                                            " menit.",
                                        "info",
                                    ).then(function () {
                                        Swal.fire({
                                            icon: "question",
                                            title: "Jam kerja tidak cukup",
                                            text:
                                                "Sisa jam kerja (" +
                                                Math.floor(
                                                    (totalInput -
                                                        h.SisaMenitKrj_bantu) /
                                                        60,
                                                ) +
                                                " jam " +
                                                ((totalInput -
                                                    h.SisaMenitKrj_bantu) %
                                                    60) +
                                                " menit), diinputkan hari berikutnya (Yes), atau edit jam kerja optimal (No)?",
                                            showDenyButton: true,
                                            showCancelButton: true,
                                            confirmButtonText: "Yes",
                                            denyButtonText: "No",
                                            cancelButtonText: "Cancel",
                                        }).then(function (r) {
                                            if (r.isDenied) {
                                                editJamKerja();
                                            } else if (r.isConfirmed) {
                                                insertNewQueue(
                                                    sisaJam,
                                                    sisaMenit,
                                                    h.JamKrj || 0,
                                                    "partial",
                                                );
                                                kTEstTime.value = Math.floor(
                                                    (totalInput -
                                                        h.SisaMenitKrj_bantu) /
                                                        60,
                                                );
                                                kTEstTime1.value =
                                                    (totalInput -
                                                        h.SisaMenitKrj_bantu) %
                                                    60;
                                            } else {
                                                kTTanggal.focus();
                                            }
                                        });
                                    });
                                }
                            },
                        );
                    }
                },
            );
        }

        function openJamKerjaEditor(estHour, estMinute) {
            const pending = {
                noOd: kNoOd.value.trim(),
                idBag: kTIdBagian.value,
                bagian: kTBagian.value,
                worksts: kTNoWorkSts.value,
                workstsName: kTWorkSts.value,
                tanggal: kTTanggal.value,
                hari: parseInt(kTHari.value) || 0,
                estHour: estHour,
                estMinute: estMinute,
                statusKerja: statusKerja,
            };

            sessionStorage.setItem(pendingEditKey, JSON.stringify(pending));
            const query =
                "?tanggal=" +
                encodeURIComponent(pending.tanggal) +
                "&worksts=" +
                encodeURIComponent(pending.worksts) +
                "&workstsName=" +
                encodeURIComponent(pending.workstsName) +
                "&resumeInputJadwal=1&requiredMinutes=" +
                encodeURIComponent(estHour * 60 + estMinute);
            window.location.href =
                window.inputJadwalConfig.routeEditJamKerja + query;
        }

        function getPendingEdit() {
            try {
                const value = sessionStorage.getItem(pendingEditKey);
                return value ? JSON.parse(value) : null;
            } catch (error) {
                sessionStorage.removeItem(pendingEditKey);
                return null;
            }
        }

        function restorePendingEdit(pending) {
            kTBagian.value = pending.bagian || "";
            kTIdBagian.value = pending.idBag || "";
            kTWorkSts.value = pending.workstsName || "";
            kTNoWorkSts.value = pending.worksts || "";
            kTTanggal.value = pending.tanggal || "";
            kTHari.value = pending.hari || 0;
            kTEstTime.value = pending.estHour || 0;
            kTEstTime1.value = pending.estMinute || 0;
            statusKerja = pending.statusKerja || 0;
            kBtnProses.disabled = false;
        }

        function insertNewQueue(estHour, estMinute, jamKrj, mode) {
            ajaxPost(
                window.inputJadwalConfig.routeInsertNewQue,
                {
                    estDate: kTTanggal.value,
                    estHour: estHour,
                    estMinute: estMinute,
                    worksts: parseInt(kTNoWorkSts.value),
                    jamKrj: jamKrj,
                    status: statusKerja,
                    idBag: parseInt(kTIdBagian.value),
                    hari: parseInt(kTHari.value) || 0,
                },
                null,
                null,
                function (res) {
                    Swal.fire(
                        "Sukses",
                        res.message || "Data tersimpan.",
                        "success",
                    );
                    if (mode === "partial") {
                        kTTanggal.focus();
                    } else {
                        askInputAgain();
                    }
                },
                function (xhr) {
                    Swal.fire(
                        "Error",
                        (xhr.responseJSON && xhr.responseJSON.error) ||
                            "Gagal simpan.",
                        "error",
                    );
                },
            );
        }

        function askInputAgain() {
            Swal.fire({
                icon: "question",
                title: "Data tersimpan",
                text: "Input lagi jadwal konstruksi lain untuk nomor order ini?",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            }).then(function (r) {
                if (r.isConfirmed) {
                    clearDetail1();
                    kBtnBagian.focus();
                } else {
                    clearDetail();
                    kNoOd.focus();
                }
            });
        }
        window.konsAskInputAgain = askInputAgain;

        // pilih_que = 2 → tampilkan modal list kons
        function doShowListKons(estHour, estMinute) {
            konsState.noOd = kNoOd.value.trim();
            konsState.idBag = kTIdBagian.value;
            konsState.worksts = kTNoWorkSts.value;
            konsState.tanggal = kTTanggal.value;
            konsState.estHour = estHour;
            konsState.estMinute = estMinute;
            konsState.hari = parseInt(kTHari.value) || 0;

            // Set info di modal
            lWorkSts.textContent = kTWorkSts.value;
            lTanggal.textContent = kTTanggal.value;
            lJmlJam.textContent = kJamKrj.textContent;

            loadListKons();
            listModalBs.show();
        }

        function clearDetail() {
            kDivisi.value = "";
            kKdBrg.value = "";
            kNamaBrg.value = "";
            kNoGbr.value = "";
            kOdSts.textContent = "";
            kKetOrder.value = "";
            kMesin.value = "";
            kUserOrder.value = "";
            kTBagian.value = "";
            kTIdBagian.value = "";
            kTWorkSts.value = "";
            kTNoWorkSts.value = "";
            kTTanggal.value = "";
            kTHari.value = "0";
            kTEstTime.value = "0";
            kTEstTime1.value = "0";
            kJamKrj.textContent = "";
            kJamKrjLabel.style.display = "none";
            kEstStart.textContent = "";
            kEstFinish.textContent = "";
            kFrame2.disabled = true;
            kBtnProses.disabled = true;
        }

        function clearDetail1() {
            kTBagian.value = "";
            kTIdBagian.value = "";
            kTWorkSts.value = "";
            kTNoWorkSts.value = "";
            kTTanggal.value = "";
            kTHari.value = "0";
            kTEstTime.value = "0";
            kTEstTime1.value = "0";
            kJamKrj.textContent = "";
            kJamKrjLabel.style.display = "none";
            kBtnProses.disabled = true;
        }

        function clearAll() {
            clearDetail();
            kNoOd.value = "";
            kNoOd.focus();
        }

        const resumeParams = new URLSearchParams(window.location.search);
        const pending = getPendingEdit();
        if (
            resumeParams.get("resumeInputJadwal") === "1" &&
            pending &&
            pending.noOd
        ) {
            kNoOd.value = pending.noOd;
            loadOrder(pending.noOd);
        }
    }

    if (isListModal) {
        lBtnBatal.addEventListener("click", function () {
            listModalBs.hide();
        });

        lBtnProses.addEventListener("click", function () {
            const checked = [];
            document
                .querySelectorAll("#list_tbody input.row-check:checked")
                .forEach(function (cb) {
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

            let noAntri;
            const sorted = checked.sort((a, b) => a.index - b.index);
            if (sorted.length === 2) {
                const k = parseInt(sorted[0].noAntri);
                const m = parseInt(sorted[1].noAntri);
                if (m - k > 1) {
                    noAntri = String(k + 1).padStart(7, "0");
                } else {
                    // Ambil nomer antrian dari posisi m, geser semua ke +1
                    noAntri = sorted[1].noAntri;
                }
            } else {
                // Pilih 1 nomer → sisipkan sebelum nomer tersebut
                const k = parseInt(sorted[0].noAntri);
                noAntri =
                    k - 1 > 0
                        ? String(k - 1).padStart(7, "0")
                        : sorted[0].noAntri;
            }

            ajaxPost(
                window.inputJadwalConfig.routeInsertAppQue,
                {
                    noAntri: noAntri,
                    estDate: konsState.tanggal,
                    estHour: konsState.estHour,
                    estMinute: konsState.estMinute,
                    worksts: parseInt(konsState.worksts),
                    status: window.konsStatusKerja || 0,
                    idBag: parseInt(konsState.idBag),
                    hari: konsState.hari,
                },
                null,
                null,
                function (res) {
                    Swal.fire(
                        "Sukses",
                        res.message || "Data tersimpan.",
                        "success",
                    );
                    listModalBs.hide();
                    if (window.konsAskInputAgain) {
                        window.konsAskInputAgain();
                    }
                },
                function (xhr) {
                    Swal.fire(
                        "Error",
                        (xhr.responseJSON && xhr.responseJSON.error) ||
                            "Gagal simpan.",
                        "error",
                    );
                },
            );
        });

        function loadListKons() {
            lTbody.innerHTML =
                '<tr><td colspan="8" class="text-center text-muted">Memuat data...</td></tr>';

            ajaxPost(
                window.inputJadwalConfig.routeGetListKons,
                {
                    worksts: parseInt(konsState.worksts),
                    tanggal: konsState.tanggal,
                },
                null,
                null,
                function (res) {
                    lSisaJam.textContent =
                        res.sisaJam + " jam " + res.sisaMenit + " menit";
                    lPakai.textContent =
                        res.pakaiJam + " jam " + res.pakaiMenit + " menit";

                    if (!res.data || res.data.length === 0) {
                        lTbody.innerHTML =
                            '<tr><td colspan="8" class="text-center text-muted">Tidak ada antrian.</td></tr>';
                        return;
                    }

                    let html = "";
                    res.data.forEach(function (row, idx) {
                        let cls = "";
                        if (row.Status === 1) cls = "row-emergency";
                        if (row.Cancel === 1) cls = "row-cancel";
                        if (row.Finish === "Y") cls = "row-finish";

                        html += '<tr class="' + cls + '">';
                        html += '<td class="tbl-cell text-center">';
                        html +=
                            '<input type="checkbox" class="row-check" data-index="' +
                            idx +
                            '" data-noantri="' +
                            esc(row.NoAntrian) +
                            '">';
                        html += "</td>";
                        html +=
                            '<td class="tbl-cell">' +
                            esc(row.NoAntrian) +
                            "</td>";
                        html +=
                            '<td class="tbl-cell">' +
                            esc(row.NoOrder) +
                            "</td>";
                        html +=
                            '<td class="tbl-cell">' +
                            esc(row.NamaDivisi) +
                            "</td>";
                        html +=
                            '<td class="tbl-cell">' +
                            esc(row.NamaBarang) +
                            "</td>";
                        html +=
                            '<td class="tbl-cell">' +
                            esc(row.NamaBagian) +
                            "</td>";
                        html +=
                            '<td class="tbl-cell">' +
                            esc(row.EstTime) +
                            "</td>";
                        html +=
                            '<td class="tbl-cell text-center">' +
                            esc(row.HariKe) +
                            "</td>";
                        html += "</tr>";
                    });
                    lTbody.innerHTML = html;
                },
                function (xhr) {
                    lTbody.innerHTML =
                        '<tr><td colspan="8" class="text-center text-danger">Gagal memuat data.</td></tr>';
                },
            );
        }

        // expose supaya bisa dipanggil dari halaman kons
        window.loadListKonsModal = loadListKons;
    }

    function esc(s) {
        return String(s == null ? "" : s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
});
//#endregion
