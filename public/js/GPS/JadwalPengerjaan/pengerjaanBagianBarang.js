//#region Variabel DOM Elements
jQuery(function ($) {
    const OptHarian = document.getElementById("OptHarian");
    const OptProyek = document.getElementById("OptProyek");

    // Frame 1
    const Frame1 = document.getElementById("Frame1");
    const TNoOd = document.getElementById("TNoOd");
    const TDivisi = document.getElementById("TDivisi");
    const TKdBrg = document.getElementById("TKdBrg");
    const TNoGbr = document.getElementById("TNoGbr");
    const TNamaBrg = document.getElementById("TNamaBrg");
    const TJml = document.getElementById("TJml");
    const TMesin = document.getElementById("TMesin");
    const TUserOrder = document.getElementById("TUserOrder");
    const TKetOrder = document.getElementById("TKetOrder");
    const TBagian = document.getElementById("TBagian");
    const TIdBagian = document.getElementById("TIdBagian");
    const btnBagian = document.getElementById("btnBagian");
    const OdSts = document.getElementById("OdSts");

    // Frame 2
    const Frame2 = document.getElementById("Frame2");
    const TMaterial = document.getElementById("TMaterial");
    const TNoMat = document.getElementById("TNoMat");
    const btnMat = document.getElementById("btnMat");
    const TSpek = document.getElementById("TSpek");
    const TNoSpek = document.getElementById("TNoSpek");
    const btnSpek = document.getElementById("btnSpek");
    const TKdBrg1 = document.getElementById("TKdBrg1");
    const TSts = document.getElementById("TSts");
    const btnIsiM = document.getElementById("btnIsiM");
    const btnKoreksiM = document.getElementById("btnKoreksiM");
    const btnHapusM = document.getElementById("btnHapusM");
    const btnProsesM = document.getElementById("btnProsesM");

    // Tombol utama
    const btnIsi = document.getElementById("btnIsi");
    const btnKoreksi = document.getElementById("btnKoreksi");
    const btnHapus = document.getElementById("btnHapus");
    const btnProses = document.getElementById("btnProses");
    const btnKeluar = document.getElementById("btnKeluar");

    let proses = 0; // 1=Isi, 2=Koreksi, 3=Hapus (Frame1)
    let prosesK = 0; // 1=Bagian only, 2=Material only, 3=Keduanya
    let prosesMtr = 0; // 1=Isi Material, 2=Koreksi Material, 3=Hapus Material, 4=Delete All
//#endregion

//#region Input & Core Events
    OptHarian.addEventListener("change", function () {
        if (this.checked) resetAll();
    });
    OptProyek.addEventListener("change", function () {
        if (this.checked) resetAll();
    });

    btnIsi.addEventListener("click", function () {
        proses = 1;
        setModeUtama();
        Frame1.disabled = false;
        TNoOd.focus();
    });

    btnKoreksi.addEventListener("click", function () {
        Swal.fire({
            title: "Pilih Mode Koreksi",
            text: "Koreksi nama bagian (Yes), material saja (No), atau keduanya (Cancel)?",
            icon: "question",
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: "Bagian (Yes)",
            denyButtonText: "Material (No)",
            cancelButtonText: "Keduanya (Cancel)",
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                prosesK = 1;
            } else if (result.isDenied) {
                prosesK = 2;
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                prosesK = 3;
            } else {
                return; // user closed
            }
            proses = 2;
            setModeUtama();
            Frame1.disabled = false;
            TNoOd.focus();
        });
    });

    btnHapus.addEventListener("click", function () {
        proses = 3;
        setModeUtama();
        Frame1.disabled = false;
        TNoOd.focus();
    });

    btnKeluar.addEventListener("click", function () {
        if (btnKeluar.textContent.trim().toUpperCase() === "KELUAR") {
            window.location.href = "/GPS";
        } else {
            resetAll();
        }
    });

    TNoOd.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let noOdVal = this.value.trim();
            if (noOdVal !== "") {
                noOdVal = noOdVal.padStart(6, "0").slice(-6);
                this.value = noOdVal;
                loadOrder(noOdVal);
            } else {
                Swal.fire("Info", "Isi Nomer Ordernya", "info");
            }
        }
    });

    TBagian.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let val = this.value.trim();
            if (val !== "") {
                btnProses.disabled = false;
                btnProses.focus();
            } else {
                Swal.fire("Pesan", "Nama Bagian tidak boleh kosong", "warning");
                btnProses.disabled = true;
                this.focus();
            }
        }
    });

    btnBagian.addEventListener("click", function () {
        let noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire("Info", "Isi nomor order terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Bagian Barang",
            url:
                window.maintBagianBarangConfig.routeGetBagianList +
                "?noOd=" +
                safeUrlParam(noOd) +
                "&jenisOd=" +
                getJenisOd(),
            headers: ["ID", "Nama Bagian"],
            columns: ["IdBagian", "NamaBagian"],
            onSelect: function (row) {
                TIdBagian.value = row.IdBagian;
                TBagian.value = row.NamaBagian;
                if (proses === 2) TBagian.focus();
                if (proses === 3) {
                    btnProses.disabled = false;
                    btnProses.focus();
                }
            },
        });
    });

    btnProses.addEventListener("click", function () {
        if (proses === 0) {
            Swal.fire("Info", "Pilih proses terlebih dahulu.", "info");
            return;
        }

        let noOd = TNoOd.value.trim();
        let bagian = TBagian.value.trim();
        let idBagian = TIdBagian.value.trim();
        let jenisOd = getJenisOd();

        if (!noOd) {
            Swal.fire("Info", "Nomor order harus diisi.", "info");
            return;
        }

        if (proses === 1 || proses === 2) {
            if (!bagian) {
                Swal.fire("Info", "Nama Bagian tidak boleh kosong.", "info");
                TBagian.focus();
                return;
            }
        }
        if (proses === 2 && !idBagian) {
            Swal.fire(
                "Info",
                'Pilih bagian terlebih dahulu melalui tombol "...".',
                "info",
            );
            return;
        }
        if (proses === 3 && !idBagian) {
            Swal.fire("Info", "Pilih bagian yang akan dihapus.", "info");
            return;
        }

        if (proses === 2 && prosesK === 2) {
            showMaterialModeSelection();
            return;
        }

        let payload = {
            proses: proses,
            noOd: noOd,
            jenisOd: jenisOd,
            bagian: bagian,
            idBagian: idBagian || null,
        };

        ajaxPost(
            window.maintBagianBarangConfig.routeProcessBagian,
            payload,
            null,
            null,
            function (response) {
                // Simpan idBagian jika hasil Isi
                if (proses === 1 && response.idBagian) {
                    TIdBagian.value = response.idBagian;
                }

                Swal.fire({
                    title: "Sukses",
                    text: response.message,
                    icon: "success",
                    returnFocus: false,
                }).then(() => {
                    if (proses === 1) {
                        // Setelah simpan bagian → tanya apakah mau input material
                        Swal.fire({
                            title: "Inputkan materialnya?",
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Ya",
                            cancelButtonText: "Tidak",
                            // Jangan kembalikan fokus ke tombol PROSES setelah dialog ditutup.
                            returnFocus: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // Proses bagian sudah selesai; lanjutkan alur di Frame Material.
                                btnProses.disabled = true;
                                Frame2.disabled = false;
                                setMaterialMode(1); // btnIsiM
                            } else {
                                // Tanya mau input bagian lagi?
                                Swal.fire({
                                    title: "Input lagi?",
                                    text:
                                        "Input lagi Nama Bagian untuk No.Order " +
                                        noOd +
                                        "?",
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonText: "Ya",
                                    cancelButtonText: "Tidak",
                                }).then((r2) => {
                                    if (r2.isConfirmed) {
                                        TBagian.value = "";
                                        TIdBagian.value = "";
                                        btnProses.disabled = true;
                                        TBagian.focus();
                                    } else {
                                        resetAll();
                                    }
                                });
                            }
                        });
                    } else if (proses === 2) {
                        // Koreksi berdasarkan prosesK
                        if (prosesK === 1) {
                            resetAll();
                        } else if (prosesK === 2 || prosesK === 3) {
                            showMaterialModeSelection();
                        }
                    } else if (proses === 3) {
                        resetAll();
                    }
                });
            },
            null,
            false,
        );
    });

    btnIsiM.addEventListener("click", function () {
        setMaterialMode(1);
    });

    btnKoreksiM.addEventListener("click", function () {
        setMaterialMode(2);
    });

    btnHapusM.addEventListener("click", function () {
        setMaterialMode(3);
    });

    btnMat.addEventListener("click", function () {
        if (prosesMtr === 0) {
            Swal.fire(
                "Info",
                "Pilih mode material (ISI/KOREKSI/HAPUS) terlebih dahulu.",
                "info",
            );
            return;
        }
        openLookupModal({
            title: "Pilih Material Type",
            url: window.maintBagianBarangConfig.routeGetMaterialList,
            headers: ["ID", "Material Type"],
            columns: ["IdMaterial", "NamaMaterial"],
            onSelect: function (row) {
                TNoMat.value = row.IdMaterial;
                TMaterial.value = row.NamaMaterial;
                if (prosesMtr === 1) TSpek.value = "";
                TSpek.focus();
            },
        });
    });

    btnSpek.addEventListener("click", function () {
        let idBagian = TIdBagian.value.trim();
        if (!idBagian) {
            Swal.fire("Info", "Pilih bagian terlebih dahulu.", "info");
            return;
        }
        if (prosesMtr === 0) {
            Swal.fire("Info", "Pilih mode material terlebih dahulu.", "info");
            return;
        }

        // PERBAIKAN 1: Kirim parameter via query string (?kode=1&noBagian=...)
        // Jangan menggunakan method: "POST" dan postData di dalam openLookupModal
        openLookupModal({
            title: "Pilih Spesifikasi Material",
            url:
                window.maintBagianBarangConfig.routeGetSpekList +
                "?kode=1&noBagian=" +
                idBagian,
            headers: ["No Spek", "Spesifikasi"],
            columns: ["NoSpek", "Spek"],
            onSelect: function (row) {
                TNoSpek.value = row.NoSpek;
                TSpek.value = row.Spek;

                // PERBAIKAN 2: Gunakan ajaxGet alih-alih ajaxPost untuk mengambil data detail (kode=2)
                ajaxGet(
                    window.maintBagianBarangConfig.routeGetSpekList,
                    { kode: 2, nomer: row.NoSpek },
                    function (detail) {
                        TMaterial.value = detail.MtrType || "";
                        TNoMat.value = detail.NoMtr || "";
                        TKdBrg1.value = detail.KdBrg || "";
                        TSts.value = detail.Status === 0 ? "BARU" : "BEKAS";

                        setTimeout(() => {
                            if (prosesMtr === 2) TSpek.focus();
                            if (prosesMtr === 3) btnProsesM.focus();
                        }, 150);
                    },
                ).fail(function (xhr) {
                    Swal.fire(
                        "Error",
                        "Gagal mengambil detail spesifikasi.",
                        "error",
                    );
                });
            },
        });
    });

    TSpek.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            TKdBrg1.focus();
        }
    });

    TKdBrg1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            btnProsesM.focus();
        }
    });

    btnProsesM.addEventListener("click", function () {
        if (prosesMtr === 0) {
            Swal.fire("Info", "Pilih mode material terlebih dahulu.", "info");
            return;
        }

        let idBagian = TIdBagian.value.trim();
        if (!idBagian) {
            Swal.fire("Info", "Bagian belum terpilih.", "info");
            return;
        }

        if (prosesMtr === 1 || prosesMtr === 2) {
            if (!TNoMat.value) {
                Swal.fire(
                    "Info",
                    "Pilih tipe material terlebih dahulu.",
                    "warning",
                );
                return;
            }
        }

        let doProses = function (status) {
            let payload = {
                proses: prosesMtr,
                idBagian: idBagian,
                noMat: TNoMat.value || 0,
                spek: TSpek.value || "",
                kdBrg: TKdBrg1.value || "",
                status: status,
                nomer: TNoSpek.value || 0,
            };

            ajaxPost(
                window.maintBagianBarangConfig.routeProcessMaterial,
                payload,
                null,
                null,
                function (response) {
                    Swal.fire("Sukses", response.message, "success").then(
                        () => {
                            if (prosesMtr === 1) {
                                // Tanya input lagi material?
                                Swal.fire({
                                    title: "Input lagi material?",
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonText: "Ya",
                                    cancelButtonText: "Tidak",
                                    allowOutsideClick: false,
                                }).then((r) => {
                                    if (r.isConfirmed) {
                                        clearMaterialFields();
                                        btnMat.focus();
                                    } else if (proses === 1) {
                                        // Tanya input bagian lagi?
                                        Swal.fire({
                                            title: "Input lagi bagian?",
                                            text:
                                                "Input lagi Nama Bagian untuk No.Order " +
                                                TNoOd.value +
                                                "?",
                                            icon: "question",
                                            showCancelButton: true,
                                            confirmButtonText: "Ya",
                                            cancelButtonText: "Tidak",
                                            allowOutsideClick: false,
                                        }).then((r2) => {
                                            if (r2.isConfirmed) {
                                                resetFrame2();
                                                TBagian.value = "";
                                                TIdBagian.value = "";
                                                btnProses.disabled = true;
                                                TBagian.focus();
                                            } else {
                                                resetAll();
                                            }
                                        });
                                    } else {
                                        resetAll();
                                    }
                                });
                            } else {
                                clearMaterialFields();
                                // Tanya proses lagi untuk Koreksi / Hapus
                                Swal.fire({
                                    title: "Proses lagi?",
                                    text:
                                        "Proses material lagi untuk bagian " +
                                        TBagian.value +
                                        "?",
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonText: "Ya",
                                    cancelButtonText: "Tidak",
                                    allowOutsideClick: false,
                                }).then((r) => {
                                    if (r.isConfirmed) {
                                        // Reset ke mode idle (User harus klik ulang tombol Isi/Koreksi/Hapus Material)
                                        btnIsiM.disabled = false;
                                        btnKoreksiM.disabled = false;
                                        btnHapusM.disabled = false;
                                        btnProsesM.disabled = true;
                                        prosesMtr = 0;
                                        btnIsiM.focus();
                                    } else {
                                        resetAll();
                                    }
                                });
                            }
                        },
                    );
                },
            );
        };

        if (prosesMtr === 1 || prosesMtr === 2) {
            // PERBAIKAN: Gunakan 3 tombol (Deny, Confirm, Cancel) agar statusnya eksplisit & tidak bisa di-bypass
            Swal.fire({
                title: "Status Material",
                text: "Apakah material ini BARU atau BEKAS?",
                icon: "question",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "BARU",
                denyButtonText: "BEKAS",
                cancelButtonText: "Batal",
                confirmButtonColor: "#3085d6",
                denyButtonColor: "#f39c12",
                allowOutsideClick: false,
            }).then((r) => {
                if (r.isConfirmed) {
                    doProses(0); // BARU
                } else if (r.isDenied) {
                    doProses(1); // BEKAS
                }
                // Jika r.dismiss (Batal), proses berhenti disini (tidak melakukan ajaxPost)
            });
        } else if (prosesMtr === 3) {
            Swal.fire({
                title: "Yakin Hapus?",
                text: "Data material ini akan dihapus!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, Hapus!",
                allowOutsideClick: false,
            }).then((r) => {
                if (r.isConfirmed) doProses(0);
            });
        } else if (prosesMtr === 4) {
            doProses(0);
        }
    });
//#endregion

//#region Utility & Helper Functions
    function getJenisOd() {
        return OptHarian.checked ? "H" : "P";
    }

    function setJenisOdDisabled(disabled) {
        OptHarian.disabled = disabled;
        OptProyek.disabled = disabled;
    }

    function setModeUtama() {
        btnKeluar.textContent = "Batal";
        btnIsi.disabled = true;
        btnKoreksi.disabled = true;
        btnHapus.disabled = true;
        setJenisOdDisabled(true);
    }

    function showMaterialModeSelection() {
        resetFrame2();
        Frame2.disabled = false;
        // Pilih mode material setelah nama bagian selesai dikoreksi.
        setTimeout(() => btnIsiM.focus(), 150);
    }

    function setMaterialMode(mode, focusTarget = null) {
        prosesMtr = mode;
        btnIsiM.disabled = true;
        btnKoreksiM.disabled = true;
        btnHapusM.disabled = true;
        btnProsesM.disabled = false;

        // Reset field material
        clearMaterialFields();

        setTimeout(() => {
            if (focusTarget) {
                focusTarget.focus();
            } else if (mode === 1) {
                btnMat.focus();
            } else if (mode === 2 || mode === 3) {
                btnSpek.focus();
            }
        }, 150);
    }

    function clearMaterialFields() {
        TMaterial.value = "";
        TNoMat.value = "";
        TSpek.value = "";
        TNoSpek.value = "";
        TKdBrg1.value = "";
        TSts.value = "";
    }

    function clearOrderFields() {
        TDivisi.value = "";
        TKdBrg.value = "";
        TNoGbr.value = "";
        TNamaBrg.value = "";
        TJml.value = "";
        TMesin.value = "";
        TUserOrder.value = "";
        TKetOrder.value = "";
        OdSts.textContent = "";
    }

    function resetFrame2() {
        Frame2.disabled = true;
        clearMaterialFields();
        btnIsiM.disabled = false;
        btnKoreksiM.disabled = false;
        btnHapusM.disabled = false;
        btnProsesM.disabled = true;
        prosesMtr = 0;
    }

    function resetAll() {
        proses = 0;
        prosesK = 0;
        prosesMtr = 0;

        // Reset Frame1
        clearOrderFields();
        TNoOd.value = "";
        TBagian.value = "";
        TIdBagian.value = "";
        Frame1.disabled = true;

        // Reset Frame2
        resetFrame2();

        // Reset tombol utama
        btnKeluar.textContent = "KELUAR";
        btnIsi.disabled = false;
        btnKoreksi.disabled = false;
        btnHapus.disabled = false;
        btnProses.disabled = true;
        setJenisOdDisabled(false);

        // Radio default Harian
        // OptHarian.checked = true;
        // OptProyek.checked = false;
    }

    function loadOrder(noOd) {
        ajaxGet(
            window.maintBagianBarangConfig.routeGetOrder,
            { noOd: noOd, jenisOd: getJenisOd() },
            function (data) {
                TDivisi.value = data.TDivisi;
                TKdBrg.value = data.TKdBrg;
                TNamaBrg.value = data.TNamaBrg;
                TNoGbr.value = data.TNoGbr;
                TJml.value = data.TJml;
                OdSts.textContent = data.OdSts;
                TKetOrder.value = data.TKetOrder;
                TMesin.value = data.TMesin;
                TUserOrder.value = data.TUserOrder;

                // Fokus sesuai mode
                if (proses === 1) {
                    TBagian.focus();
                } else {
                    btnBagian.focus();
                }
            },
        ).fail(function (xhr) {
            if (xhr.status === 400 || xhr.status === 404) {
                TNoOd.value = "";
                clearOrderFields();
                TNoOd.focus();
            }
        });
    }
});
//#endregion
