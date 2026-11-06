//#region Variabel DOM Elements
jQuery(function ($) {
    const BtnKeluar = document.getElementById("btnKeluar");
    const Tanggal = document.getElementById("Tanggal");
    const TNoWorkSts = document.getElementById("TNoWorkSts");
    const BtnWrkSts = document.getElementById("btnWrkSts");
    const TWorkSts = document.getElementById("TWorkSts");
    const TJam = document.getElementById("TJam");
    const BtnProses = document.getElementById("btnProses");
    const InfoSisa = document.getElementById("infoSisa");
    const params = new URLSearchParams(window.location.search);
    const resumeProcess = params.get("resumeProcess") === "1";
    const resumeInputJadwal = params.get("resumeInputJadwal") === "1";
    const requiredMinutes = parseInt(params.get("requiredMinutes"), 10) || 0;
    const pendingProcessKey = "konstruksiEstimasiTanggalPending";
//#endergion

//#region Input & Core Events
    BtnKeluar.addEventListener("click", function () {
        if (resumeInputJadwal) {
            sessionStorage.removeItem("konstruksiJadwalPendingEdit");
            window.location.href = window.editJamConfig.routeReturnInputJadwal;
            return;
        }
        if (resumeProcess) {
            sessionStorage.removeItem(pendingProcessKey);
            window.location.href =
                window.editJamConfig.routeReturnEstimasiTanggal;
            return;
        }

        window.close();
        if (!window.closed) {
            window.location.href = "/GPS";
        }
    });

    Tanggal.addEventListener("change", function () {
        let worksts = TNoWorkSts.value.trim();
        if (worksts) {
            loadJamKerja(worksts, this.value.trim());
        }
    });

    Tanggal.addEventListener("keypress", function (e) {
        BtnWrkSts.focus();
    });

    BtnWrkSts.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Work Station",
            url: window.editJamConfig.routeGetWorkstationList,
            headers: ["ID", "Nama Work Station"],
            columns: ["NoWrkSts", "NamaWorkStation"],
            onSelect: function (row) {
                TNoWorkSts.value = row.NoWrkSts;
                TWorkSts.value = row.NamaWorkStation;
                BtnWrkSts.disabled = true;
                Tanggal.disabled = true;
                let tanggal = Tanggal.value;
                if (tanggal) {
                    loadJamKerja(row.NoWrkSts, tanggal);
                }
            },
        });
    });

    TJam.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            validateJamKerja();
        }
    });

    BtnProses.addEventListener("click", function () {
        let worksts = TNoWorkSts.value.trim();
        let tanggal = Tanggal.value.trim();
        let jmlJam = TJam.value.trim();

        if (!worksts || !tanggal || !jmlJam || parseInt(jmlJam) <= 0) {
            Swal.fire("Info", "Lengkapi semua data dengan benar.", "info");
            return;
        }

        let payload = {
            worksts: worksts,
            estDate: tanggal,
            jmlJam: parseInt(jmlJam),
            requiredMinutes: requiredMinutes,
        };

        ajaxPost(
            window.editJamConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                if (resumeProcess) {
                    Swal.fire("Sukses", response.message, "success").then(
                        () => {
                            window.location.href =
                                window.editJamConfig.routeReturnEstimasiTanggal +
                                "?resumeProcess=1&workstsName=" +
                                encodeURIComponent(TWorkSts.value.trim());
                        },
                    );
                } else if (resumeInputJadwal) {
                    Swal.fire("Sukses", response.message, "success").then(
                        () => {
                            window.location.href =
                                window.editJamConfig.routeReturnInputJadwal +
                                "?resumeInputJadwal=1";
                        },
                    );
                } else {
                    resetForm();
                }
            },
            null,
            false,
        );
    });
//#endregion

//#region Utility & Helper Functions
    function loadJamKerja(worksts, tanggal) {
        ajaxPost(
            window.editJamConfig.routeGetJamKerja,
            { worksts: worksts, estDate: tanggal },
            null,
            null,
            function (response) {
                if (response.found && response.jmlJamKerja > 0) {
                    TJam.value = response.jmlJamKerja;
                    BtnKeluar.textContent = "Batal";
                    TJam.focus();
                    hitungSisa(worksts, tanggal);
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Info",
                        text: "Tidak ada jadwal konstruksi untuk Work Station ini pada tanggal tersebut.",
                    }).then(() => {
                        resetForm();
                        BtnWrkSts.focus();
                    });
                }
            },
            function (xhr) {
                let msg =
                    xhr.responseJSON?.error || "Gagal memuat data jam kerja.";
                Swal.fire("Error", msg, "error");
            },
        );
    }

    function validateJamKerja() {
        let worksts = TNoWorkSts.value.trim();
        let tanggal = Tanggal.value.trim();
        let jmlJam = parseInt(TJam.value.trim()) || 0;

        if (!worksts || !tanggal || jmlJam <= 0) {
            Swal.fire(
                "Info",
                "Pastikan work station dan tanggal sudah diisi, dan jam kerja > 0.",
                "info",
            );
            return;
        }

        hitungSisa(worksts, tanggal, function (data) {
            let totalMenitPk = data.TotalMenitPk || 0;

            if (jmlJam * 60 < totalMenitPk + requiredMinutes) {
                const totalDibutuhkan = totalMenitPk + requiredMinutes;
                const jamDibutuhkan = Math.floor(totalDibutuhkan / 60);
                const menitDibutuhkan = totalDibutuhkan % 60;
                Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: `Jml jam kerja harus mencukupi jadwal yang sudah terpakai dan estimasi yang akan dipindahkan (${jamDibutuhkan} jam ${menitDibutuhkan} menit).`,
                }).then(() => {
                    TJam.focus().select();
                    BtnProses.disabled = true;
                });
            } else {
                BtnProses.disabled = false;
                BtnProses.focus();
            }
        });
    }

    function hitungSisa(worksts, tanggal, callback) {
        ajaxPost(
            window.editJamConfig.routeHitungSisa,
            { worksts: worksts, estDate: tanggal },
            null,
            null,
            function (response) {
                if (response) {
                    let totalMenitKrj = response.TotalMenitKrj || 0;
                    let totalMenitPk = response.TotalMenitPk || 0;
                    let sisaJam = response.SisaJamKrj || 0;
                    let sisaMenit = response.SisaMenitKrj || 0;

                    let infoText = `Sisa: ${sisaJam} jam ${sisaMenit} menit`;
                    if (totalMenitKrj === 0 && totalMenitPk === 0) {
                        infoText = "Belum ada jadwal untuk tanggal ini.";
                    } else {
                        let jamPk = Math.floor(totalMenitPk / 60);
                        let menitPk = totalMenitPk % 60;
                        infoText =
                            `Terpakai: ${jamPk} jam ${menitPk} menit | ` +
                            infoText;
                    }
                    InfoSisa.textContent = infoText;

                    if (typeof callback === "function") {
                        callback(response);
                    }
                }
            },
            function () {
                InfoSisa.textContent = "Gagal menghitung sisa jam.";
            },
        );
    }

    function resetForm() {
        TNoWorkSts.value = "";
        TWorkSts.value = "";
        TJam.value = 0;
        BtnProses.disabled = true;
        BtnKeluar.innerText = "Keluar";
        BtnWrkSts.disabled = false;
        Tanggal.disabled = false;
        InfoSisa.innerText = "";
        Tanggal.focus();
    }

    let initialWorksts = TNoWorkSts.value.trim();
    let initialTanggal = Tanggal.value.trim();
    if (initialWorksts && initialTanggal) {
        BtnWrkSts.disabled = true;
        Tanggal.disabled = true;
        loadJamKerja(initialWorksts, initialTanggal);
    }
});
//#endregion
