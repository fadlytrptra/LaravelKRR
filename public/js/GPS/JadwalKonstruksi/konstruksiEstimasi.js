//#region Variabel DOM Elements
jQuery(function ($) {
    const BtnIsi = document.getElementById("btnIsi");
    const BtnKoreksi = document.getElementById("btnKoreksi");
    const BtnHapus = document.getElementById("btnHapus");
    const BtnKeluar = document.getElementById("btnKeluar");
    const BtnProses = document.getElementById("btnProses");
    const TNoOd = document.getElementById("TNoOd");
    const TTglStart = document.getElementById("TTglStart");
    const TTglFinish = document.getElementById("TTglFinish");
    const Frame1 = document.getElementById("Frame1");
    const TDivisi = document.getElementById("TDivisi");
    const TKdBrg = document.getElementById("TKdBrg");
    const TNoGbr = document.getElementById("TNoGbr");
    const TNamaBrg = document.getElementById("TNamaBrg");
    const OdSts = document.getElementById("OdSts");
    const TKetOrder = document.getElementById("TKetOrder");
    const TMesin1 = document.getElementById("TMesin1");
    const TUserOrder = document.getElementById("TUserOrder");
    let modeProses = 0;

    setDefaultDates();
//#endregion

//#region Input & Core Events
    BtnIsi.addEventListener("click", function () {
        setMode(1, "Batal");
    });
    BtnKoreksi.addEventListener("click", function () {
        setMode(2, "Batal");
    });
    BtnHapus.addEventListener("click", function () {
        setMode(3, "Batal");
    });

    BtnKeluar.addEventListener("click", function () {
        if (this.textContent.trim().toUpperCase() === "BATAL") {
            resetForm();
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
                loadData(noOdVal);
            } else {
                Swal.fire("Info", "Isi Nomer Ordernya", "info");
            }
        }
    });

    TTglStart.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            TTglFinish.focus();
        }
    });

    TTglFinish.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let start = new Date(TTglStart.value);
            let finish = new Date(TTglFinish.value);

            if (finish < start) {
                Swal.fire(
                    "Pesan",
                    "Tidak boleh.. Tgl finish < tgl start.",
                    "warning",
                );
                this.focus();
                BtnProses.disabled = true;
            } else {
                BtnProses.disabled = false;
                BtnProses.focus();
            }
        }
    });

    BtnProses.addEventListener("click", function () {
        if (modeProses === 0) {
            Swal.fire("Info", "Pilih proses terlebih dahulu.", "info");
            return;
        }

        if (!TNoOd.value || !TTglStart.value || !TTglFinish.value) {
            Swal.fire(
                "Info",
                "Lengkapi nomor order dan tanggal estimasi.",
                "info",
            );
            return;
        }

        let payload = {
            proses: modeProses,
            noOd: TNoOd.value,
            tglStart: TTglStart.value,
            tglFinish: TTglFinish.value,
        };

        ajaxPost(
            window.EstimasiJadwalConfig.routeStore,
            payload,
            null,
            null,
        ).done(function (response) {
            resetForm();
        });
    });
//#endregion

//#region Utility & Helper Functions
    function setMode(mode, textKeluar) {
        modeProses = mode;
        Frame1.disabled = false;
        BtnKeluar.textContent = textKeluar;
        BtnIsi.disabled = true;
        BtnKoreksi.disabled = true;
        BtnHapus.disabled = true;
        TNoOd.focus();
    }

    function resetForm() {
        clearText();
        BtnKeluar.textContent = "KELUAR";
        BtnIsi.disabled = false;
        BtnKoreksi.disabled = false;
        BtnHapus.disabled = false;
        Frame1.disabled = true;
        BtnIsi.focus();
    }

    function clearText() {
        [
            TNoOd,
            TDivisi,
            TKdBrg,
            TNoGbr,
            TNamaBrg,
            TKetOrder,
            TMesin1,
            TUserOrder,
        ].forEach((el) => (el.value = ""));
        OdSts.innerText = "";
        BtnProses.disabled = true;
        modeProses = 0;
    }

    function setDefaultDates() {
        let today = new Date();
        let localDate = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0"),
        ].join("-");

        TTglStart.value = localDate;
        TTglFinish.value = localDate;
    }

    function loadData(noOrder) {
        ajaxGet(
            window.EstimasiJadwalConfig.routeGetOrder,
            { noOd: noOrder, proses: modeProses },
            function (data) {
                TDivisi.value = data.TDivisi || "";
                TKdBrg.value = data.TKdBrg || "";
                TNamaBrg.value = data.TNamaBrg || "";
                TNoGbr.value = data.TNoGbr || "";
                OdSts.innerText = data.OdSts || "";
                TKetOrder.value = data.TKetOrder || "";
                TMesin1.value = data.TMesin1 || "";
                TUserOrder.value = data.TUserOrder || "";
                TTglStart.value = data.TTglStart || TTglStart.value;
                TTglFinish.value = data.TTglFinish || TTglFinish.value;

                if (modeProses === 1 || modeProses === 2) {
                    TTglStart.focus();
                } else {
                    BtnProses.disabled = false;
                    BtnProses.focus();
                }
            },
        ).fail(function (xhr) {
            if (xhr.status === 400 || xhr.status === 404) {
                clearText();
                TNoOd.focus();
            }
        });
    }
});
//#endregion
