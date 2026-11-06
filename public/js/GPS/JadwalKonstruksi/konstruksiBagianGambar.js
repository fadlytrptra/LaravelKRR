//#region Variabel DOM Elements
jQuery(function ($) {
    const BtnIsi = document.getElementById("btnIsi");
    const BtnKoreksi = document.getElementById("btnKoreksi");
    const BtnHapus = document.getElementById("btnHapus");
    const BtnKeluar = document.getElementById("btnKeluar");
    const BtnProses = document.getElementById("btnProses");
    const TNoOd = document.getElementById("TNoOd");
    const TBagian = document.getElementById("TBagian");
    const TIdBagian = document.getElementById("TIdBagian");
    const Frame1 = document.getElementById("Frame1");
    const TDivisi = document.getElementById("TDivisi");
    const TKdBrg = document.getElementById("TKdBrg");
    const TNoGbr = document.getElementById("TNoGbr");
    const TNamaBrg = document.getElementById("TNamaBrg");
    const OdSts = document.getElementById("OdSts");
    const TKetOrder = document.getElementById("TKetOrder");
    const TMesin1 = document.getElementById("TMesin1");
    const TUserOrder = document.getElementById("TUserOrder");
    const BtnBagian = document.getElementById("btnBagian");

    let modeProses = 0;
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

    TBagian.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let bagian = this.value.trim();
            if (bagian !== "") {
                BtnProses.disabled = false;
                BtnProses.focus();
            } else {
                Swal.fire(
                    "Pesan",
                    "Nama Bagian tidak boleh kosong",
                    "warning",
                ).then(() => {
                    BtnProses.disabled = true;
                    this.focus();
                });
                return;
            }
        }
    });

    BtnBagian.addEventListener("click", function () {
        let noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire("Info", "Isi nomor order terlebih dahulu.", "info");
            return;
        }

        if (modeProses === 0) {
            Swal.fire(
                "Info",
                "Pilih proses (Isi/Koreksi/Hapus) terlebih dahulu.",
                "info",
            );
            return;
        }

        openLookupModal({
            title: "Pilih Bagian Gambar",
            url:
                window.maintBagianConfig.routeGetBagianList +
                "?noOd=" +
                safeUrlParam(noOd),
            headers: ["ID", "Nama Bagian"],
            columns: ["IdBagian", "NamaBagian"],
            onSelect: function (row) {
                TIdBagian.value = row.IdBagian;
                TBagian.value = row.NamaBagian;
                if (modeProses === 2) {
                    TBagian.focus();
                } else if (modeProses === 3) {
                    BtnProses.disabled = false;
                    BtnProses.focus();
                }
            },
        });
    });

    BtnProses.addEventListener("click", function () {
        if (modeProses === 0) {
            Swal.fire("Info", "Pilih proses terlebih dahulu.", "info");
            return;
        }

        let noOd = TNoOd.value.trim();
        let bagian = TBagian.value.trim();
        let idBagian = TIdBagian.value.trim();

        if (!noOd || !bagian) {
            Swal.fire("Info", "Lengkapi nomor order dan nama bagian.", "info");
            return;
        }

        if (modeProses === 3 && !idBagian) {
            Swal.fire(
                "Info",
                "Pilih bagian terlebih dahulu melalui tombol ...",
                "info",
            );
            return;
        }

        let payload = {
            proses: modeProses,
            noOd: TNoOd.value,
            bagian: TBagian.value,
            idBagian: TIdBagian.value || null,
        };

        ajaxPost(
            window.maintBagianConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                if (modeProses === 1) {
                    Swal.fire({
                        title: "Input lagi?",
                        text:
                            "Apakah Anda ingin menambah bagian lain untuk No.Order " +
                            noOd +
                            "?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Ya",
                        cancelButtonText: "Tidak",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            TBagian.value = "";
                            TIdBagian.value = "";
                            BtnProses.disabled = true;
                            TBagian.focus();
                        } else {
                            resetForm();
                        }
                    });
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
    function setMode(mode, textKeluar) {
        modeProses = mode;
        Frame1.disabled = false;
        BtnKeluar.textContent = textKeluar;
        BtnIsi.disabled = true;
        BtnKoreksi.disabled = true;
        BtnHapus.disabled = true;
        BtnProses.disabled = true;
        TBagian.value = "";
        TIdBagian.value = "";

        TNoOd.focus();
    }

    function resetForm() {
        clearText();
        BtnKeluar.textContent = "KELUAR";
        BtnIsi.disabled = false;
        BtnKoreksi.disabled = false;
        BtnHapus.disabled = false;
        BtnProses.disabled = true;
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
            TBagian,
            TIdBagian,
        ].forEach((el) => (el.value = ""));
        OdSts.innerText = "";
        BtnProses.disabled = true;
        modeProses = 0;
    }

    function loadData(noOrder) {
        ajaxGet(
            window.maintBagianConfig.routeGetOrder,
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
                TBagian.value = "";
                TIdBagian.value = "";

                if (modeProses === 1) {
                    TBagian.disabled = false;
                    TBagian.focus();
                } else {
                    BtnBagian.disabled = false;
                    BtnBagian.focus();
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
