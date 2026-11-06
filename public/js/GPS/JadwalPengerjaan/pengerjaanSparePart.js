//#region Variabel DOM Elements
jQuery(function ($) {
    const OptHarian = document.getElementById("OptHarian");
    const OptProyek = document.getElementById("OptProyek");

    // Frame 1
    const Frame1 = document.getElementById("Frame1");
    const TNoOd = document.getElementById("TNoOd");
    const TTanggal = document.getElementById("TTanggal");
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
    const inputKdBrgIsi = document.getElementById("inputKdBarangIsi");
    const inputKdBrgKoreksi = document.getElementById("inputKdBarangKoreksi");
    const TKdBrg1 = document.getElementById("TKdBrg1");
    const TKdBrg1_Koreksi = document.getElementById("TKdBrg1_Koreksi");
    const btnKdBrg = document.getElementById("btnKdBrg");
    const TNomer = document.getElementById("TNomer");
    const TSts = document.getElementById("TSts");
    const TKatUtama = document.getElementById("TKatUtama");
    const btnKatU = document.getElementById("btnKatU");
    const TNoKU = document.getElementById("TNoKU");
    const TKategori = document.getElementById("TKategori");
    const btnKat = document.getElementById("btnKat");
    const TNoK = document.getElementById("TNoK");
    const TSubKat = document.getElementById("TSubKat");
    const btnSub = document.getElementById("btnSub");
    const TNoS = document.getElementById("TNoS");
    const TNmBrg2 = document.getElementById("TNmBrg"); // Nama Barang di Frame2
    const btnBrg = document.getElementById("btnBrg");
    const TSatuan = document.getElementById("TSatuan");
    const btnSatuan = document.getElementById("btnSatuan");
    const TNoSat = document.getElementById("TNoSat");
    const THarga = document.getElementById("THarga");
    const TJml1 = document.getElementById("TJml1");
    const btnProses = document.getElementById("btnProses");

    // Tombol utama
    const btnIsi = document.getElementById("btnIsi");
    const btnKoreksi = document.getElementById("btnKoreksi");
    const btnHapus = document.getElementById("btnHapus");
    const btnKeluar = document.getElementById("btnKeluar");

    let proses = 0; // 1=Isi, 2=Koreksi, 3=Hapus
    //#endregion

    //#region Input & Core Events
    setDefaultTanggal();

    OptHarian.addEventListener("change", function () {
        if (this.checked) resetAll();
    });
    OptProyek.addEventListener("change", function () {
        if (this.checked) resetAll();
    });

    btnIsi.addEventListener("click", function () {
        setMode(1);
    });
    btnKoreksi.addEventListener("click", function () {
        setMode(2);
    });
    btnHapus.addEventListener("click", function () {
        setMode(3);
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

    btnBagian.addEventListener("click", function () {
        const noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire("Info", "Isi nomor order terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Bagian Barang",
            url:
                window.pkjSparePartConfig.routeGetBagianList +
                "?noOd=" +
                safeUrlParam(noOd) +
                "&jenisOd=" +
                getJenisOd(),
            headers: ["ID", "Nama Bagian"],
            columns: ["IdBagian", "NamaBagian"],
            onSelect: function (row) {
                TIdBagian.value = row.IdBagian;
                TBagian.value = row.NamaBagian;
                Frame2.disabled = false;
                setKategoriButtonsVisibility(proses === 1);
                if (proses === 1) {
                    TKdBrg1.focus();
                } else {
                    btnKdBrg.focus();
                }
            },
        });
    });

    btnKdBrg.addEventListener("click", function () {
        const idBagian = TIdBagian.value.trim();
        if (!idBagian) {
            Swal.fire("Info", "Pilih bagian terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih S/Part",
            url:
                window.pkjSparePartConfig.routeGetSpartExisting +
                "?noBagian=" +
                safeUrlParam(idBagian),
            headers: ["Nomer", "Kd. Barang", "Nama Barang"],
            columns: ["Nomer", "KdBarang", "NamaBarang"],
            onSelect: function (row) {
                TNomer.value = row.Nomer;
                TKdBrg1_Koreksi.value = row.KdBarang;
                loadSpartDetail(row.Nomer, idBagian);
            },
        });
    });

    btnKatU.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Kategori Utama",
            url: window.pkjSparePartConfig.routeGetMohonBeli + "?myType=1",
            headers: ["Kode", "Nama"],
            columns: ["Kode", "Nama"],
            onSelect: function (row) {
                TNoKU.value = row.Kode;
                TKatUtama.value = row.Nama;
                btnKat.focus();
            },
        });
    });

    btnKat.addEventListener("click", function () {
        if (!TNoKU.value) {
            Swal.fire("Info", "Pilih Kategori Utama terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Kategori",
            url:
                window.pkjSparePartConfig.routeGetMohonBeli +
                "?myType=2&myValue=" +
                safeUrlParam(TNoKU.value),
            headers: ["Kode", "Nama"],
            columns: ["Kode", "Nama"],
            onSelect: function (row) {
                TNoK.value = row.Kode;
                TKategori.value = row.Nama;
                btnSub.focus();
            },
        });
    });

    btnSub.addEventListener("click", function () {
        if (!TNoK.value) {
            Swal.fire("Info", "Pilih Kategori terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Sub Kategori",
            url:
                window.pkjSparePartConfig.routeGetMohonBeli +
                "?myType=3&myValue=" +
                safeUrlParam(TNoK.value),
            headers: ["Kode", "Nama"],
            columns: ["Kode", "Nama"],
            onSelect: function (row) {
                TNoS.value = row.Kode;
                TSubKat.value = row.Nama;
                btnBrg.focus();
            },
        });
    });

    btnBrg.addEventListener("click", function () {
        if (!TNoS.value) {
            Swal.fire("Info", "Pilih Sub Kategori terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Barang",
            url:
                window.pkjSparePartConfig.routeGetMohonBeli +
                "?myType=5&myValue=" +
                safeUrlParam(TNoS.value),
            headers: ["Kode", "Nama"],
            columns: ["Kode", "Nama"],
            onSelect: function (row) {
                TKdBrg1.value = row.Kode;
                TNmBrg2.value = row.Nama;
                loadBarang(row.Kode);
            },
        });
    });

    TKdBrg1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let val = this.value.trim();
            if (val !== "") {
                val = val.padStart(9, "0").slice(-9);
                this.value = val;
                loadBarang(val);
            } else {
                Swal.fire("Info", "Isi Kode Barangnya.", "info");
            }
        }
    });

    btnSatuan.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Satuan",
            url: window.pkjSparePartConfig.routeGetSatuanList,
            headers: ["No", "Nama Satuan"],
            columns: ["NoSat", "Satuan"],
            onSelect: function (row) {
                TNoSat.value = row.NoSat;
                TSatuan.value = row.Satuan;
                THarga.focus();
            },
        });
    });

    THarga.addEventListener("keypress", function (e) {
        if (e.key === "Enter") TJml1.focus();
    });
    TJml1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            btnProses.disabled = false;
            btnProses.focus();
        }
    });

    btnProses.addEventListener("click", function () {
        if (proses === 0) {
            Swal.fire("Info", "Pilih proses terlebih dahulu.", "info");
            return;
        }

        const idBagian = parseInt(TIdBagian.value) || 0;
        if (!idBagian) {
            Swal.fire("Info", "Pilih bagian terlebih dahulu.", "info");
            return;
        }

        // Tentukan kdBrg sesuai mode
        const kdBrg =
            proses === 1 ? TKdBrg1.value.trim() : TKdBrg1_Koreksi.value.trim();

        if (proses === 3) {
            // Mode Hapus → langsung proses
            const nomer = parseInt(TNomer.value) || 0;
            if (!nomer) {
                Swal.fire("Info", "Pilih S/Part yang akan dihapus.", "info");
                return;
            }

            Swal.fire({
                title: "Konfirmasi Hapus",
                text: `Hapus S/Part ${kdBrg}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, Hapus",
                cancelButtonText: "Batal",
                confirmButtonColor: "#dc3545",
            }).then((res) => {
                if (res.isConfirmed) {
                    doProcess({ proses: 3, idBagian, nomer });
                }
            });
            return;
        }

        // Mode 1 & 2 → tanya Baru/Stock
        if (!kdBrg) {
            Swal.fire("Info", "Kode barang tidak boleh kosong.", "info");
            return;
        }
        const jml = parseFloat(TJml1.value) || 0;
        const harga = parseFloat(THarga.value) || 0;

        Swal.fire({
            title: "S/Part Baru atau Stock?",
            text: "Pilih jenis S/Part",
            icon: "question",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Baru",
            denyButtonText: "Stock",
            cancelButtonText: "Batal",
        }).then((result) => {
            let status = null;
            if (result.isConfirmed)
                status = 1; // Baru
            else if (result.isDenied)
                status = 0; // Stock
            else return;

            const payload = {
                proses: proses,
                status: status,
                idBagian: idBagian,
                kdBrg: kdBrg,
                jml: jml,
                harga: harga,
                noSat: TNoSat.value.trim(),
                tanggal: TTanggal.value,
                nomer: parseInt(TNomer.value) || 0,
            };
            doProcess(payload);
        });
    });
    //#endregion

    //#region Utility & Helper Functions
    function getJenisOd() {
        return OptHarian.checked ? "H" : "P";
    }

    function setDefaultTanggal() {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, "0");
        const d = String(today.getDate()).padStart(2, "0");
        TTanggal.value = `${y}-${m}-${d}`;
    }

    function setKategoriButtonsVisibility(showKategori) {
        const btnKategoriList = document.querySelectorAll(".btn-kategori");
        btnKategoriList.forEach((el) => {
            el.style.display = showKategori ? "" : "none";
        });
        // Input Kd Barang mode
        if (showKategori) {
            inputKdBrgIsi.classList.remove("d-none");
            inputKdBrgKoreksi.classList.add("d-none");
        } else {
            inputKdBrgIsi.classList.add("d-none");
            inputKdBrgKoreksi.classList.remove("d-none");
        }
    }

    function doProcess(payload) {
        ajaxPost(
            window.pkjSparePartConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                Swal.fire("Sukses", response.message, "success").then(() => {
                    if (proses === 1) {
                        // Tanya input lagi
                        Swal.fire({
                            title: "Input lagi?",
                            text:
                                "Isi data S/Part lagi untuk No. Order " +
                                TNoOd.value +
                                "?",
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Ya",
                            cancelButtonText: "Tidak",
                        }).then((r) => {
                            if (r.isConfirmed) {
                                clearFrame2();
                                TKdBrg1.focus();
                            } else {
                                resetAll();
                            }
                        });
                    } else if (proses === 2) {
                        Swal.fire({
                            title: "Koreksi lagi?",
                            text:
                                "Koreksi data S/Part lagi untuk No. Order " +
                                TNoOd.value +
                                "?",
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Ya",
                            cancelButtonText: "Tidak",
                        }).then((r) => {
                            if (r.isConfirmed) {
                                clearFrame2();
                                btnKdBrg.focus();
                            } else {
                                resetAll();
                            }
                        });
                    } else {
                        Swal.fire({
                            title: "Hapus lagi?",
                            text:
                                "Hapus data S/Part lagi untuk No. Order " +
                                TNoOd.value +
                                "?",
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Ya",
                            cancelButtonText: "Tidak",
                        }).then((r) => {
                            if (r.isConfirmed) {
                                clearFrame2();
                                btnKdBrg.focus();
                            } else {
                                resetAll();
                            }
                        });
                    }
                });
            },
        );
    }

    function loadOrder(noOd) {
        ajaxGet(
            window.pkjSparePartConfig.routeGetOrder,
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

                // Reset bagian & Frame2
                TBagian.value = "";
                TIdBagian.value = "";
                Frame2.disabled = true;

                btnBagian.focus();
            },
        ).fail(function (xhr) {
            if (xhr.status === 400 || xhr.status === 404) {
                clearAll();
                TNoOd.value = "";
                TNoOd.focus();
            }
        });
    }

    function loadSpartDetail(nomer, idBagian) {
        ajaxGet(
            window.pkjSparePartConfig.routeGetSpartDetail,
            { nomer: nomer, noBagian: idBagian },
            function (data) {
                TJml1.value = data.Jml;
                TSts.value = data.StatusText;
                if (data.Status === 0) {
                    THarga.value = data.HargaStok;
                } else {
                    THarga.value = data.HargaBaru;
                }
                TSatuan.value = data.NamaSatuan;
                TNoSat.value = data.NoSat;

                if (proses === 2) THarga.focus();
                if (proses === 3) {
                    btnProses.disabled = false;
                    btnProses.focus();
                }
            },
        );
    }

    function loadBarang(kdBarang) {
        ajaxGet(
            window.pkjSparePartConfig.routeLoadBarang,
            { kdBarang: kdBarang },
            function (data) {
                TKatUtama.value = data.KatUtama;
                TKategori.value = data.Kategori;
                TSubKat.value = data.SubKat;
                TNmBrg2.value = data.NamaBarang;

                if (proses === 1) {
                    TSatuan.value = data.Satuan;
                    TNoSat.value = data.NoSat;
                }
                THarga.focus();
            },
        );
    }

    function setMode(mode) {
        proses = mode;
        Frame1.disabled = false;
        btnKeluar.textContent = "Batal";

        btnIsi.disabled = true;
        btnKoreksi.disabled = true;
        btnHapus.disabled = true;

        // Reset Frame2
        clearFrame2();
        Frame2.disabled = true;

        // Visibility kategori buttons hanya untuk mode isi
        setKategoriButtonsVisibility(mode === 1);

        TNoOd.focus();
    }

    function clearFrame2() {
        TKdBrg1.value = "";
        if (TKdBrg1_Koreksi) TKdBrg1_Koreksi.value = "";
        TNomer.value = "";
        TSts.value = "";
        TKatUtama.value = "";
        TNoKU.value = "";
        TKategori.value = "";
        TNoK.value = "";
        TSubKat.value = "";
        TNoS.value = "";
        TNmBrg2.value = "";
        TSatuan.value = "";
        TNoSat.value = "";
        THarga.value = 0;
        TJml1.value = 0;
        btnProses.disabled = true;
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
        TBagian.value = "";
        TIdBagian.value = "";
    }

    function clearAll() {
        clearOrderFields();
        clearFrame2();
        Frame2.disabled = true;
    }

    function resetAll() {
        proses = 0;
        clearAll();
        TNoOd.value = "";
        Frame1.disabled = true;
        btnKeluar.textContent = "KELUAR";
        btnIsi.disabled = false;
        btnKoreksi.disabled = false;
        btnHapus.disabled = false;
        // OptHarian.checked = true;
        // OptProyek.checked = false;
        setDefaultTanggal();
        setKategoriButtonsVisibility(true);
        TNoOd.focus();
    }
});
//#endregion
