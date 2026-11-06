 //#region Variabel DOM Elements
 jQuery(function ($) {
    const Tanggal = document.getElementById("Tanggal");
    const TMesin = document.getElementById("TMesin");
    const TNoMesin = document.getElementById("TNoMesin");
    const btnMesin = document.getElementById("btnMesin");
    const TType = document.getElementById("TType");
    const TNoType = document.getElementById("TNoType");
    const btnType = document.getElementById("btnType");
    const TJam = document.getElementById("TJam");
    const infoSisa = document.getElementById("infoSisa");
    const btnProses = document.getElementById("btnProses");
    const btnKeluar = document.getElementById("btnKeluar");

    let nomer = "";
    const pageParams = new URLSearchParams(window.location.search);
    const returnTo = pageParams.get("returnTo");
    const returnUrl = pageParams.get("returnUrl");
    const jamKerjaResultKey = "pengerjaanJadwal.jamKerjaResult";
    if (returnTo === "pengerjaan-jadwal") btnKeluar.textContent = "Kembali";
//#endregion

//#region Variabel DOM Elements
    btnKeluar.addEventListener("click", function () {
        if (returnToScheduler("cancelled")) return;

        if (btnKeluar.textContent.trim().toLowerCase() === "keluar") {
            // Tutup halaman
            if (window.opener) {
                if (returnTo === "pengerjaan-jadwal") {
                    window.opener.postMessage(
                        { type: "pengerjaan-jam-kerja-cancelled" },
                        window.location.origin,
                    );
                }
                window.close();
            } else {
                window.location.href = "/GPS";
            }
        } else {
            // Batal → reset
            if (returnTo === "pengerjaan-jadwal" && window.opener) {
                window.opener.postMessage(
                    { type: "pengerjaan-jam-kerja-cancelled" },
                    window.location.origin,
                );
                window.close();
                return;
            }
            resetForm();
        }
    });

    Tanggal.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            btnMesin.disabled = false;
            btnMesin.focus();
        }
    });

    btnMesin.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Mesin",
            url: window.editJamPkjConfig.routeGetMesinList,
            headers: ["ID", "Nama Mesin"],
            columns: ["NoMesin", "NamaMesin"],
            onSelect: function (row) {
                TNoMesin.value = row.NoMesin;
                TMesin.value = row.NamaMesin;
                // Reset type & jam kerja
                TNoType.value = "";
                TType.value = "";
                TJam.value = 0;
                infoSisa.textContent = "";
                btnProses.disabled = true;
                // Enable btnType, fokus
                btnType.disabled = false;
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
            url: window.editJamPkjConfig.routeGetTypeList + "?noMesin=" + safeUrlParam(TNoMesin.value),
            headers: ["ID", "Nama Type"],
            columns: ["NoType", "NamaType"],
            onSelect: function (row) {
                TNoType.value = row.NoType;
                TType.value = row.NamaType;
                // Load jam kerja
                loadJamKerja();
            },
        });
    });

    TJam.addEventListener("input", function () {
        btnProses.disabled = true;
    });

    TJam.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const jmlJam = Number(TJam.value);
            if (!Number.isInteger(jmlJam) || jmlJam <= 0) {
                Swal.fire(
                    "Pesan",
                    "Jml Jam Kerja harus lebih besar dari NOL.",
                    "warning",
                );
                TJam.focus();
                return;
            }
            validateJamKerja();
        }
    });

    btnProses.addEventListener("click", function () {
        const jmlJam = Number(TJam.value);
        if (!Number.isInteger(jmlJam) || jmlJam <= 0) {
            Swal.fire("Info", "Jml Jam Kerja harus > 0.", "info");
            return;
        }

        btnProses.disabled = true;
        validateJamKerja(() => saveJamKerja(jmlJam));
    });
//#endregion

//#region Utility & Helper Functions
    function saveJamKerja(jmlJam) {
        const payload = {
            tanggal: Tanggal.value,
            noMesin: TNoMesin.value,
            noType: TNoType.value,
            nomer: nomer,
            jmlJam: jmlJam,
        };

        ajaxPost(
            window.editJamPkjConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                Swal.fire("Sukses", response.message, "success").then(() => {
                    const result = {
                        tanggal: payload.tanggal,
                        noMesin: payload.noMesin,
                        noType: payload.noType,
                    };
                    if (returnToScheduler("saved", result)) return;

                    if (window.opener) {
                        try {
                            window.opener.location.reload();
                        } catch (e) {}
                        window.close();
                    } else {
                        resetForm();
                    }
                });
            },
        );
    }

    function returnToScheduler(status, result = {}) {
        if (returnTo !== "pengerjaan-jadwal") return false;

        const message = {
            type:
                status === "saved"
                    ? "pengerjaan-jam-kerja-saved"
                    : "pengerjaan-jam-kerja-cancelled",
            ...result,
        };

        if (returnUrl) {
            let destination;
            try {
                destination = new URL(returnUrl, window.location.origin);
                if (destination.origin !== window.location.origin) {
                    throw new Error("Return URL harus berasal dari aplikasi ini.");
                }
                sessionStorage.setItem(
                    jamKerjaResultKey,
                    JSON.stringify({ status, ...result }),
                );
            } catch (error) {
                Swal.fire(
                    "Error",
                    "Halaman pengerjaan tidak dapat dipulihkan. Silakan kembali secara manual setelah menyimpan perubahan.",
                    "error",
                );
                return true;
            }

            try {
                const referrer = new URL(document.referrer);
                if (
                    referrer.origin === destination.origin &&
                    referrer.pathname === destination.pathname &&
                    referrer.search === destination.search
                ) {
                    window.history.back();
                } else {
                    window.location.href = destination.href;
                }
            } catch (error) {
                window.location.href = destination.href;
            }
            return true;
        }

        if (window.opener) {
            window.opener.postMessage(message, window.location.origin);
            window.close();
            return true;
        }

        return false;
    }

    function loadJamKerja() {
        const tanggal = Tanggal.value;
        const noMesin = TNoMesin.value;
        const noType = TNoType.value;

        if (!tanggal || !noMesin || !noType) return;

        ajaxPost(
            window.editJamPkjConfig.routeGetJamKerja,
            {
                tanggal: tanggal,
                noMesin: noMesin,
                noType: noType,
            },
            null,
            null,
            function (response) {
                if (response.found) {
                    nomer = response.nomer;
                    TJam.value = response.jmlJamKerja;
                    btnKeluar.textContent =
                        returnTo === "pengerjaan-jadwal" ? "Kembali" : "Batal";
                    TJam.focus();
                    // Tampilkan info sisa
                    hitungSisa();
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Info",
                        text:
                            "Tidak ada jadwal pengerjaan untuk mesin: " +
                            TMesin.value +
                            ", type: " +
                            TType.value +
                            ", tanggal: " +
                            Tanggal.value,
                    }).then(() => {
                        resetForm();
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

    function validateJamKerja(onValid = null) {
        const tanggal = Tanggal.value;
        const noMesin = TNoMesin.value;
        const noType = TNoType.value;
        const jmlJam = parseInt(TJam.value) || 0;

        ajaxPost(
            window.editJamPkjConfig.routeHitungSisa,
            {
                tanggal: tanggal,
                noMesin: noMesin,
                noType: noType,
            },
            null,
            null,
            function (data) {
                const TotalMenitPk = data.TotalMenitPk || 0;
                const jamPk = Math.floor(TotalMenitPk / 60);
                const menitPk = TotalMenitPk % 60;

                if (jmlJam * 60 < TotalMenitPk) {
                    Swal.fire({
                        icon: "warning",
                        title: "Peringatan",
                        text: `Jml Jam Kerja harus lebih besar dari Jml Jam yang sudah terpakai (${jamPk} jam ${menitPk} menit).`,
                    }).then(() => {
                        TJam.focus().select();
                        btnProses.disabled = true;
                    });
                } else {
                    btnProses.disabled = false;
                    if (onValid) onValid();
                    else btnProses.focus();
                }
            },
            function (xhr) {
                let msg =
                    xhr.responseJSON?.error || "Gagal menghitung sisa jam.";
                Swal.fire("Error", msg, "error");
            },
        );
    }

    function hitungSisa() {
        const tanggal = Tanggal.value;
        const noMesin = TNoMesin.value;
        const noType = TNoType.value;
        if (!tanggal || !noMesin || !noType) return;

        ajaxPost(
            window.editJamPkjConfig.routeHitungSisa,
            {
                tanggal: tanggal,
                noMesin: noMesin,
                noType: noType,
            },
            null,
            null,
            function (data) {
                const TotalMenitKrj = data.TotalMenitKrj || 0;
                const TotalMenitPk = data.TotalMenitPk || 0;
                const jamPk = Math.floor(TotalMenitPk / 60);
                const menitPk = TotalMenitPk % 60;
                const jamKrj = Math.floor(TotalMenitKrj / 60);
                infoSisa.textContent = `Total jam kerja: ${jamKrj} jam | Terpakai: ${jamPk} jam ${menitPk} menit`;
            },
        );
    }

    function resetForm() {
        TMesin.value = "";
        TNoMesin.value = "";
        TType.value = "";
        TNoType.value = "";
        TJam.value = 0;
        infoSisa.textContent = "";
        btnProses.disabled = true;
        btnKeluar.textContent = "Keluar";
        Tanggal.disabled = false;
        btnMesin.disabled = false;
        btnType.disabled = false;
        Tanggal.focus();
    }

    // Jika parent mengirimkan noType (form dipanggil dari EditProses dengan parameter lengkap)
    if (TNoType.value && TNoMesin.value && Tanggal.value) {
        // Nonaktifkan input yang sudah terisi
        Tanggal.disabled = true;
        btnMesin.disabled = true;
        btnType.disabled = true;
        // Load jam kerja
        loadJamKerja();
    }
});
//#endregion
