jQuery(function ($) {
    //#region Variabel DOM Elements
    const Date1 = document.getElementById("Date1");
    const Date2 = document.getElementById("Date2");
    const btnOK = document.getElementById("btnOK");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const btnMatOK = document.getElementById("btnMatOK");
    const btnBon = document.getElementById("btnBon");
    const btnTotal = document.getElementById("btnTotal");
    const TTotalBiaya = document.getElementById("TTotalBiaya");
    const tbodyData = document.getElementById("tbodyData");
    const materialModal = document.getElementById("materialModal");
    const materialModalBs = new bootstrap.Modal(materialModal);
    const materialNoOrder = document.getElementById("materialNoOrder");
    const materialNamaBarang = document.getElementById("materialNamaBarang");
    const materialNamaBagian = document.getElementById("materialNamaBagian");
    const materialKodeBarang = document.getElementById("materialKodeBarang");
    const materialTbody = document.getElementById("materialTbody");

    const mhn_Modal = document.getElementById("mhn_Modal");
    const mhn_ModalBs = new bootstrap.Modal(mhn_Modal);
    const mhn_Divisi2 = document.getElementById("mhn_Divisi2");
    const mhn_TIdDivisi2 = document.getElementById("mhn_TIdDivisi2");
    const mhn_btnDivisi2 = document.getElementById("mhn_btnDivisi2");
    const mhn_Objek2 = document.getElementById("mhn_Objek2");
    const mhn_TIdObjek2 = document.getElementById("mhn_TIdObjek2");
    const mhn_btnObjek2 = document.getElementById("mhn_btnObjek2");
    const mhn_KelUtama2 = document.getElementById("mhn_KelUtama2");
    const mhn_TIdKelUtama2 = document.getElementById("mhn_TIdKelUtama2");
    const mhn_btnKelUtama2 = document.getElementById("mhn_btnKelUtama2");
    const mhn_Kelompok2 = document.getElementById("mhn_Kelompok2");
    const mhn_TIdKelompok2 = document.getElementById("mhn_TIdKelompok2");
    const mhn_btnKelompok2 = document.getElementById("mhn_btnKelompok2");
    const mhn_SubKel2 = document.getElementById("mhn_SubKel2");
    const mhn_TIdSubKel2 = document.getElementById("mhn_TIdSubKel2");
    const mhn_btnSubKel2 = document.getElementById("mhn_btnSubKel2");
    const mhn_Pemohon = document.getElementById("mhn_Pemohon");
    const mhn_Tanggal = document.getElementById("mhn_Tanggal");

    const mhn_FrameAsal = document.getElementById("mhn_FrameAsal");
    const mhn_BarangFields = document.getElementById("mhn_BarangFields");
    const mhn_Divisi = document.getElementById("mhn_Divisi");
    const mhn_TIdDivisi = document.getElementById("mhn_TIdDivisi");
    const mhn_btnDivisi = document.getElementById("mhn_btnDivisi");
    const mhn_Objek = document.getElementById("mhn_Objek");
    const mhn_TIdObjek = document.getElementById("mhn_TIdObjek");
    const mhn_btnObjek = document.getElementById("mhn_btnObjek");
    const mhn_KelUtama = document.getElementById("mhn_KelUtama");
    const mhn_TIdKelUtama = document.getElementById("mhn_TIdKelUtama");
    const mhn_btnKelUtama = document.getElementById("mhn_btnKelUtama");
    const mhn_Kelompok = document.getElementById("mhn_Kelompok");
    const mhn_TIdKelompok = document.getElementById("mhn_TIdKelompok");
    const mhn_btnKelompok = document.getElementById("mhn_btnKelompok");
    const mhn_SubKel = document.getElementById("mhn_SubKel");
    const mhn_TIdSubKel = document.getElementById("mhn_TIdSubKel");
    const mhn_btnSubKel = document.getElementById("mhn_btnSubKel");
    const mhn_KdBrg = document.getElementById("mhn_KdBrg");
    const mhn_NmBrg = document.getElementById("mhn_NmBrg");
    const mhn_TIdType = document.getElementById("mhn_TIdType");
    const mhn_btnNama = document.getElementById("mhn_btnNama");

    const mhn_FrameQty = document.getElementById("mhn_FrameQty");
    const mhn_Primer1 = document.getElementById("mhn_Primer1");
    const mhn_Sekunder1 = document.getElementById("mhn_Sekunder1");
    const mhn_Tritier1 = document.getElementById("mhn_Tritier1");
    const mhn_SatPrimer1 = document.getElementById("mhn_SatPrimer1");
    const mhn_SatSekunder1 = document.getElementById("mhn_SatSekunder1");
    const mhn_SatTritier1 = document.getElementById("mhn_SatTritier1");
    const mhn_Primer = document.getElementById("mhn_Primer");
    const mhn_Sekunder = document.getElementById("mhn_Sekunder");
    const mhn_Tritier = document.getElementById("mhn_Tritier");
    const mhn_SatPrimer = document.getElementById("mhn_SatPrimer");
    const mhn_SatSekunder = document.getElementById("mhn_SatSekunder");
    const mhn_SatTritier = document.getElementById("mhn_SatTritier");
    const mhn_Alasan = document.getElementById("mhn_Alasan");

    const mhn_tbody = document.getElementById("mhn_tbody");
    const mhn_TableSection = document.getElementById("mhn_TableSection");
    const mhn_IdTransaksi = document.getElementById("mhn_IdTransaksi");

    const mhn_btnIsi = document.getElementById("mhn_btnIsi");
    const mhn_btnKoreksi = document.getElementById("mhn_btnKoreksi");
    const mhn_btnHapus = document.getElementById("mhn_btnHapus");
    const mhn_btnKeluar = document.getElementById("mhn_btnKeluar");
    const mhn_btnHeaderClose = document.getElementById("mhn_btnHeaderClose");

    const mhnState = {
        pilih: 0,       // 0 = AllData, 1 = AllDataPemohon
        proses: 0,      // 0 = pilih aksi, 1 = isi, 2 = koreksi, 3 = hapus
        konvBeri: "",
        konvTerima: "",
        jmlBon: 0,
        onCloseCb: null,
    };
    //#endregion

    //#region Input & Core Events
    let jenisUser = 0;
    ajaxGet(
        window.infoPkjOrderProyekConfig.routeGetUserType,
        {},
        function (res) {
            jenisUser = res.jenis || 0;
            btnTotal.disabled = !(jenisUser === 1 || jenisUser === 7);
        }
    );

    btnOK.addEventListener("click", loadData);
    btnRefresh.addEventListener("click", loadData);
    btnKeluar.addEventListener("click", function () {
        window.location.href = "/GPS";
    });

    btnMatOK.addEventListener("click", function () {
        const rows = JSON.parse(tbodyData.dataset.rows || "[]");
        const checked = [];
        document.querySelectorAll(".row-check:checked").forEach(function (cb) {
            const idx = parseInt(cb.dataset.index);
            const row = rows[idx];
            if (row.rowColor === "limegreen") {
                checked.push({ idBag: row.IdTrans, estDate: row.TglStart });
            }
        });

        mhn_Modal.addEventListener("hide.bs.modal", function (event) {
            if (mhnState.proses !== 0) {
                event.preventDefault();
                mhn_btnKeluar.click();
            }
        });
        if (checked.length === 0) {
            Swal.fire("Info", "Tidak ada data Not Ready yang dipilih.", "info");
            return;
        }
        ajaxPost(
            window.infoPkjOrderProyekConfig.routeSetReady,
            { items: checked },
            null, null,
            function (res) {
                if (res.success) {
                    Swal.fire("Sukses", res.message, "success");
                    loadData();
                } else {
                    Swal.fire("Error", res.error || "Gagal proses.", "error");
                }
            },
            function (xhr) {
                Swal.fire("Error", xhr.responseJSON?.error || "Terjadi kesalahan.", "error");
            }
        );
    });

    btnBon.addEventListener("click", function () {
        const rows = JSON.parse(tbodyData.dataset.rows || "[]");
        const checked = [];
        document.querySelectorAll(".row-check:checked").forEach(function (cb) {
            checked.push(rows[parseInt(cb.dataset.index)]);
        });
        if (checked.length !== 1) {
            Swal.fire("Info", "Pilih tepat 1 data untuk diproses.", "info");
            return;
        }
        const row = checked[0];
        if (!row.IdTrans || !row.TglStart) {
            Swal.fire("Info", "Data tidak valid.", "info");
            return;
        }
        window.mhnOpenModal({
            onClose: function () {
                ajaxPost(
                    window.infoPkjOrderProyekConfig.routeSetBon,
                    { idBag: row.IdTrans, estDate: row.TglStart },
                    null, null,
                    function (res) {
                        if (res.success) {
                            Swal.fire("Sukses", res.message, "success");
                            loadData();
                        } else {
                            Swal.fire("Error", res.error || "Gagal proses.", "error");
                        }
                    },
                    function (xhr) {
                        Swal.fire("Error", xhr.responseJSON?.error || "Terjadi kesalahan.", "error");
                    }
                );
            }
        });
    });

    btnTotal.addEventListener("click", function () {
        const rows = JSON.parse(tbodyData.dataset.rows || "[]");
        let total = 0;
        rows.forEach(function (r) {
            if (r.TotalBiaya) total += parseFloat(r.TotalBiaya.replace(/,/g, "")) || 0;
        });
        TTotalBiaya.value = total.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    });

    tbodyData.addEventListener("dblclick", function (e) {
        const tr = e.target.closest("tr");
        if (!tr) return;
        const checkbox = tr.querySelector(".row-check");
        if (!checkbox) return;
        const row = JSON.parse(tbodyData.dataset.rows || "[]")[parseInt(checkbox.dataset.index)];
        if (!row) return;
        openMaterialModal(row);
    });

    materialModal.addEventListener("hidden.bs.modal", function () {
        document.querySelectorAll(".row-check:checked").forEach(function (checkbox) {
            checkbox.checked = false;
        });
    });

    // Dipanggil dari X close, ESC, atau btnKeluar
    mhn_Modal.addEventListener("hidden.bs.modal", function () {
        if (mhnState.jmlBon > 0 && typeof mhnState.onCloseCb === "function") {
            const cb = mhnState.onCloseCb;
            const jml = mhnState.jmlBon;
            mhnState.jmlBon = 0;
            mhnState.onCloseCb = null;
            cb(jml);
        }
    });

    mhn_Modal.addEventListener("shown.bs.modal", function () {
        if (!mhn_TIdDivisi2.value) mhn_btnDivisi2.focus();
    });

    mhn_btnKeluar.addEventListener("click", function () {
        if (mhnState.proses !== 0) {
            mhnResetProcess();
            return;
        }
        mhn_ModalBs.hide();
    });

    mhn_btnHeaderClose.addEventListener("click", function () {
        mhn_btnKeluar.click();
    });

    mhn_btnDivisi2.addEventListener("click", function () {
        mhnLookup(
            "Pilih Divisi Penerima",
            window.infoPkjOrderProyekConfig.routeMhnDivisiList + "?mode=tujuan",
            ["ID", "Nama Divisi"],
            ["Id", "Nama"],
            function (row) {
                mhn_TIdDivisi2.value = row.Id;
                mhn_Divisi2.value = row.Nama;
                mhnResetForm(true);
                Swal.fire({
                    title: "Tampilkan Data?",
                    text: "Tampilkan semua data atau hanya data pemohon?",
                    showCancelButton: true,
                    confirmButtonText: "Semua",
                    cancelButtonText: "Pemohon Saja",
                }).then(function (r) {
                    mhnState.pilih = r.isConfirmed ? 0 : 1;
                    mhnLoadListMohon(function () {
                        mhn_btnIsi.focus();
                    });
                });
            }
        );
    });

    mhn_btnObjek2.addEventListener("click", function () {
        if (!mhn_TIdDivisi2.value) return;
        mhnLookup(
            "Pilih Objek",
            window.infoPkjOrderProyekConfig.routeMhnObjekList +
                "?mode=tujuan&idDivisi=" + encodeURIComponent(mhn_TIdDivisi2.value),
            ["ID", "Nama Objek"],
            ["Id", "Nama"],
            function (row) {
                mhn_TIdObjek2.value = row.Id;
                mhn_Objek2.value = row.Nama;
                mhn_btnKelUtama2.disabled = false;
                mhn_btnKelUtama2.focus();
            }
        );
    });

    mhn_btnKelUtama2.addEventListener("click", function () {
        if (!mhn_TIdObjek2.value) return;
        mhnLookup(
            "Pilih Kelompok Utama",
            window.infoPkjOrderProyekConfig.routeMhnKelUtamaList +
                "?idObjek=" + encodeURIComponent(mhn_TIdObjek2.value),
            ["ID", "Nama Kel Utama"],
            ["Id", "Nama"],
            function (row) {
                mhn_TIdKelUtama2.value = row.Id;
                mhn_KelUtama2.value = row.Nama;
                mhn_btnKelompok2.disabled = false;
                mhn_btnKelompok2.focus();
            }
        );
    });

    mhn_btnKelompok2.addEventListener("click", function () {
        if (!mhn_TIdKelUtama2.value) return;
        mhnLookup(
            "Pilih Kelompok",
            window.infoPkjOrderProyekConfig.routeMhnKelompokList +
                "?idKelUtama=" + encodeURIComponent(mhn_TIdKelUtama2.value),
            ["ID", "Nama Kelompok"],
            ["Id", "Nama"],
            function (row) {
                mhn_TIdKelompok2.value = row.Id;
                mhn_Kelompok2.value = row.Nama;
                mhn_btnSubKel2.disabled = false;
                mhn_btnSubKel2.focus();
            }
        );
    });

    mhn_btnSubKel2.addEventListener("click", function () {
        if (!mhn_TIdKelompok2.value) return;
        mhnLookup(
            "Pilih Sub Kelompok",
            window.infoPkjOrderProyekConfig.routeMhnSubKelList +
                "?idKelompok=" + encodeURIComponent(mhn_TIdKelompok2.value),
            ["ID", "Nama Sub Kel"],
            ["Id", "Nama"],
            function (row) {
                mhn_TIdSubKel2.value = row.Id;
                mhn_SubKel2.value = row.Nama;
                mhn_FrameAsal.disabled = false;
                mhn_btnDivisi.disabled = false;
                mhn_btnDivisi.focus();
                if (mhn_TIdType.value || mhn_KdBrg.value) {
                    mhn_FrameQty.disabled = true;
                    mhnValidateKodeBarang();
                }
            }
        );
    });

    mhn_btnDivisi.addEventListener("click", function () {
        mhnLookup(
            "Pilih Divisi Pemberi",
            window.infoPkjOrderProyekConfig.routeMhnDivisiList + "?mode=asal",
            ["ID", "Nama Divisi"],
            ["Id", "Nama"],
            function (row) {
                mhn_TIdDivisi.value = row.Id;
                mhn_Divisi.value = row.Nama;
                mhn_btnObjek.disabled = false;
                mhn_btnObjek.focus();
            }
        );
    });

    mhn_btnObjek.addEventListener("click", function () {
        if (!mhn_TIdDivisi.value) return;
        mhnLookup(
            "Pilih Objek (Asal)",
            window.infoPkjOrderProyekConfig.routeMhnObjekList +
                "?mode=asal&idDivisi=" + encodeURIComponent(mhn_TIdDivisi.value),
            ["ID", "Nama Objek"],
            ["Id", "Nama"],
            function (row) {
                mhn_TIdObjek.value = row.Id;
                mhn_Objek.value = row.Nama;
                mhn_btnKelUtama.disabled = false;
                mhn_btnKelUtama.focus();
            }
        );
    });

    mhn_btnKelUtama.addEventListener("click", function () {
        if (!mhn_TIdObjek.value) return;
        mhnLookup(
            "Pilih Kel Utama (Asal)",
            window.infoPkjOrderProyekConfig.routeMhnKelUtamaList +
                "?idObjek=" + encodeURIComponent(mhn_TIdObjek.value),
            ["ID", "Nama"],
            ["Id", "Nama"],
            function (row) {
                mhn_TIdKelUtama.value = row.Id;
                mhn_KelUtama.value = row.Nama;
                mhn_btnKelompok.disabled = false;
                mhn_btnKelompok.focus();
            }
        );
    });

    mhn_btnKelompok.addEventListener("click", function () {
        if (!mhn_TIdKelUtama.value) return;
        mhnLookup(
            "Pilih Kelompok (Asal)",
            window.infoPkjOrderProyekConfig.routeMhnKelompokList +
                "?idKelUtama=" + encodeURIComponent(mhn_TIdKelUtama.value),
            ["ID", "Nama"],
            ["Id", "Nama"],
            function (row) {
                mhn_TIdKelompok.value = row.Id;
                mhn_Kelompok.value = row.Nama;
                mhn_btnSubKel.disabled = false;
                mhn_btnSubKel.focus();
            }
        );
    });

    mhn_btnSubKel.addEventListener("click", function () {
        if (!mhn_TIdKelompok.value) return;
        mhnLookup(
            "Pilih Sub Kel (Asal)",
            window.infoPkjOrderProyekConfig.routeMhnSubKelList +
                "?idKelompok=" + encodeURIComponent(mhn_TIdKelompok.value),
            ["ID", "Nama"],
            ["Id", "Nama"],
            function (row) {
                mhn_TIdSubKel.value = row.Id;
                mhn_SubKel.value = row.Nama;
                mhnClearBarangFields();
                mhn_btnNama.focus();
            }
        );
    });

    mhn_btnNama.addEventListener("click", function () {
        if (!mhn_TIdSubKel.value) {
            Swal.fire("Info", "Pilih Sub Kelompok Pemberi terlebih dahulu.", "info");
            return;
        }
        mhnClearBarangFields();
        mhnLookup(
            "Pilih Nama Barang",
            window.infoPkjOrderProyekConfig.routeMhnTypeList +
                "?idSubKel=" + encodeURIComponent(mhn_TIdSubKel.value),
            ["ID Type", "Nama Type"],
            ["Id", "Nama"],
            function (row) {
                if (!row.Id) {
                    Swal.fire("Error", "Kode Type barang tidak ditemukan.", "error");
                    return;
                }
                mhn_TIdType.value = row.Id || "";
                mhn_NmBrg.value = row.Nama || "";
                mhnValidateKodeBarang();
            }
        );
    });

    mhn_KdBrg.addEventListener("keypress", function (e) {
        if (e.key !== "Enter") return;
        e.preventDefault();
        if (!mhn_TIdSubKel.value) {
            Swal.fire("Info", "Pilih Sub Kelompok Pemberi terlebih dahulu.", "info");
            return;
        }
        const kode = mhn_KdBrg.value.trim();
        if (!kode) {
            mhn_btnNama.focus();
            return;
        }
        mhn_KdBrg.value = kode.padStart(9, "0").slice(-9);
        mhnValidateKodeBarang();
    });

    mhn_Primer.addEventListener("keypress", function (e) {
        if (e.key !== "Enter") return;
        if (parseFloat(mhn_Primer.value) > parseFloat(mhn_Primer1.value)) {
            Swal.fire("Error", "Saldo Primer: " + mhn_Primer1.value, "error");
            mhn_Primer.value = "0";
            return;
        }
        mhn_Sekunder.select();
    });

    mhn_Sekunder.addEventListener("keypress", function (e) {
        if (e.key !== "Enter") return;
        if (parseFloat(mhn_Sekunder.value) > parseFloat(mhn_Sekunder1.value)) {
            Swal.fire("Error", "Saldo Sekunder: " + mhn_Sekunder1.value, "error");
            mhn_Sekunder.value = "0";
            return;
        }
        mhn_Tritier.select();
    });

    mhn_Tritier.addEventListener("keypress", function (e) {
        if (e.key !== "Enter") return;
        if (parseFloat(mhn_Tritier.value) > parseFloat(mhn_Tritier1.value)) {
            Swal.fire("Error", "Saldo Tritier: " + mhn_Tritier1.value, "error");
            mhn_Tritier.value = "0";
            return;
        }
        mhn_Alasan.focus();
    });

    mhn_Alasan.addEventListener("keypress", function (e) {
        if (e.key !== "Enter") return;
        e.preventDefault();
        if (
            (parseFloat(mhn_Primer.value) || 0) === 0 &&
            (parseFloat(mhn_Sekunder.value) || 0) === 0 &&
            (parseFloat(mhn_Tritier.value) || 0) === 0
        ) {
            Swal.fire("Error", "Jumlah yang di-BON tidak boleh 0.", "error");
            mhn_Primer.focus();
            return;
        }

        if (mhnState.proses === 1) mhn_btnIsi.disabled = false;
        if (mhnState.proses === 2) mhn_btnKoreksi.focus();
        else if (mhnState.proses === 3) mhn_btnHapus.focus();
        else mhn_btnIsi.focus();
    });

    mhn_btnIsi.addEventListener("click", function () {
        // VB: ISI membuka mode input terlebih dahulu, lalu PROSES menyimpan.
        if (mhnState.proses === 0) {
            if (!mhn_TIdDivisi2.value) {
                Swal.fire("Info", "Pilih dulu Divisi Penerima.", "info");
                mhn_btnDivisi2.focus();
                return;
            }

            mhn_tbody.querySelectorAll("tr.selected").forEach(function (row) {
                row.classList.remove("selected");
            });
            mhn_IdTransaksi.value = "";
            mhn_TIdObjek2.value = "";
            mhn_Objek2.value = "";
            mhn_TIdKelUtama2.value = "";
            mhn_KelUtama2.value = "";
            mhn_TIdKelompok2.value = "";
            mhn_Kelompok2.value = "";
            mhn_TIdSubKel2.value = "";
            mhn_SubKel2.value = "";
            mhn_btnKelUtama2.disabled = true;
            mhn_btnKelompok2.disabled = true;
            mhn_btnSubKel2.disabled = true;
            mhn_Pemohon.value = mhn_Pemohon.dataset.user || "";
            mhn_Tanggal.value = new Date().toISOString().slice(0, 10);
            mhnResetFormAsalOnly();
            mhnState.proses = 1;
            mhnSetListVisible(false);
            mhnSetEntryFieldsVisible(true);
            mhn_btnIsi.textContent = "PROSES";
            mhn_btnIsi.disabled = true;
            mhn_btnKoreksi.disabled = true;
            mhn_btnHapus.disabled = true;
            mhn_btnKeluar.textContent = "BATAL";
            mhn_btnObjek2.disabled = false;
            mhn_btnObjek2.focus();
            return;
        }

        // Mode KOREKSI → update
        if (mhnState.proses === 2) {
            mhnConfirmAction();
            return;
        }

        if (mhnState.proses !== 1) return;

        // Mode insert
        const p = parseFloat(mhn_Primer.value) || 0;
        const s = parseFloat(mhn_Sekunder.value) || 0;
        const t = parseFloat(mhn_Tritier.value) || 0;
        if (p === 0 && s === 0 && t === 0) {
            Swal.fire("Error", "Jumlah BON tidak boleh 0.", "error");
            mhn_Primer.focus();
            return;
        }
        if (!mhn_TIdType.value) {
            Swal.fire("Error", "Pilih Nama Barang terlebih dahulu.", "error");
            return;
        }
        if (!mhn_TIdSubKel2.value || !mhn_TIdSubKel.value) {
            Swal.fire("Error", "Pilih Sub Kelompok Penerima & Pemberi.", "error");
            return;
        }
        if (mhn_TIdSubKel2.value === mhn_TIdSubKel.value) {
            Swal.fire("Error", "Sub Kelompok Asal dan Tujuan tidak boleh sama.", "error");
            return;
        }
        ajaxPost(
            window.infoPkjOrderProyekConfig.routeMhnInsertTmp,
            {
                idType: mhn_TIdType.value,
                kodeBarang: mhn_KdBrg.value,
                idPenerima: mhn_Pemohon.value,
                primer: p,
                sekunder: s,
                tritier: t,
                idSubKelAsal: mhn_TIdSubKel.value,
                idSubKelTujuan: mhn_TIdSubKel2.value,
                alasan: mhn_Alasan.value,
                tanggal: mhn_Tanggal.value,
            },
            null, null,
            function (res) {
                mhnState.jmlBon++;
                Swal.fire("Sukses", res.message || "Data tersimpan.", "success");
                mhnLoadListMohon();
                mhnResetFormAsalOnly();
                mhn_btnIsi.disabled = true;
                mhn_btnObjek2.focus();
            },
            function (xhr) {
                Swal.fire("Error", (xhr.responseJSON && xhr.responseJSON.error) || "Gagal simpan.", "error");
            }
        );
    });

    mhn_btnKoreksi.addEventListener("click", function () {
        if (!mhn_IdTransaksi.value) {
            Swal.fire("Info", "Pilih 1 baris pada list terlebih dahulu.", "info");
            return;
        }
        if (mhnState.proses === 2) {
            mhnConfirmAction();
            return;
        }
        mhnState.proses = 2;
        mhn_FrameQty.disabled = false;
        mhn_btnKoreksi.textContent = "PROSES";
        mhn_btnIsi.disabled = true;
        mhn_btnHapus.disabled = true;
        mhn_btnKeluar.textContent = "BATAL";
        Swal.fire("Info", "Ubah data lalu klik tombol PROSES.", "info").then(function () {
            mhn_Primer.focus();
        });
    });

    mhn_btnHapus.addEventListener("click", function () {
        if (!mhn_IdTransaksi.value) {
            Swal.fire("Info", "Pilih 1 baris pada list terlebih dahulu.", "info");
            return;
        }
        if (mhnState.proses !== 3) {
            mhnState.proses = 3;
            mhn_btnIsi.disabled = true;
            mhn_btnKoreksi.disabled = true;
            mhn_btnHapus.textContent = "PROSES";
            mhn_btnKeluar.textContent = "BATAL";
            mhn_btnHapus.focus();
            return;
        }
        Swal.fire({
            title: "Hapus data?",
            text: "Data transaksi " + mhn_IdTransaksi.value + " akan dihapus.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus",
        }).then(function (r) {
            if (!r.isConfirmed) return;
            ajaxPost(
                window.infoPkjOrderProyekConfig.routeMhnDeleteTmp,
                { idTransaksi: mhn_IdTransaksi.value },
                null, null,
                function (res) {
                    Swal.fire("Sukses", res.message, "success");
                    mhnResetForm(true);
                    mhnLoadListMohon();
                },
                function (xhr) {
                    Swal.fire("Error", (xhr.responseJSON && xhr.responseJSON.error) || "Gagal hapus.", "error");
                }
            );
        });
    });

    mhn_tbody.addEventListener("click", function (e) {
        const tr = e.target.closest("tr");

        // Klik area kosong / row tanpa kolom lengkap → batalkan pilihan
        if (!tr || tr.querySelectorAll("td").length < 19) {
            mhnResetForm(true);
            return;
        }

        // Reset pilihan sebelumnya
        mhn_tbody.querySelectorAll("tr.selected").forEach(function (x) {
            x.classList.remove("selected");
        });
        tr.classList.add("selected");

        const cells = tr.querySelectorAll("td");
        mhn_IdTransaksi.value = cells[0].textContent.trim();
        mhn_Alasan.value = cells[2].textContent.trim();
        mhn_Pemohon.value = cells[18].textContent.trim();
        mhn_NmBrg.value = cells[1].textContent.trim();
        mhn_KdBrg.value = cells[10].textContent.trim();
        mhn_TIdType.value = cells[11].textContent.trim();
        mhn_Primer.value = cells[12].textContent.trim();
        mhn_Sekunder.value = cells[13].textContent.trim();
        mhn_Tritier.value = cells[14].textContent.trim();
        mhn_Divisi2.value = cells[5].textContent.trim();
        mhn_Objek2.value = cells[6].textContent.trim();
        mhn_KelUtama2.value = cells[7].textContent.trim();
        mhn_Kelompok2.value = cells[8].textContent.trim();
        mhn_SubKel2.value = cells[9].textContent.trim();

        // Reset state KOREKSI jika sebelumnya aktif
        mhnState.proses = 0;
        mhn_btnIsi.textContent = "ISI";
        mhn_btnIsi.disabled = false;
        mhn_btnKoreksi.disabled = false;
        mhn_btnHapus.disabled = false;
        mhn_btnKoreksi.textContent = "KOREKSI";
        mhn_btnHapus.textContent = "HAPUS";
        mhn_btnKeluar.textContent = "KELUAR";
        mhn_btnObjek2.disabled = true;
        mhn_FrameAsal.disabled = true;
        mhn_FrameQty.disabled = true;
        mhnSetEntryFieldsVisible(true);

        // Load detail Tujuan
        ajaxPost(
            window.infoPkjOrderProyekConfig.routeMhnTujuanDetail,
            { idTransaksi: mhn_IdTransaksi.value },
            null, null,
            function (r) {
                mhn_TIdDivisi2.value = r.IdDivisi || "";
                mhn_TIdObjek2.value = r.IdObjek || "";
                mhn_TIdKelUtama2.value = r.IdKelUtama || "";
                mhn_TIdKelompok2.value = r.IdKelompok || "";
                mhn_TIdSubKel2.value = r.IdSubKel || "";
                mhnLoadCorrectionStock();
            }
        );

        // Load detail Asal
        ajaxPost(
            window.infoPkjOrderProyekConfig.routeMhnAsalDetail,
            { idTransaksi: mhn_IdTransaksi.value },
            null, null,
            function (r) {
                mhn_TIdDivisi.value = r.IdDivisi || "";
                mhn_TIdObjek.value = r.IdObjek || "";
                mhn_TIdKelUtama.value = r.IdKelUtama || "";
                mhn_TIdKelompok.value = r.IdKelompok || "";
                mhn_TIdSubKel.value = r.IdSubKel || "";
                mhn_Divisi.value = r.NamaDivisi || "";
                mhn_Objek.value = r.NamaObjek || "";
                mhn_KelUtama.value = r.NamaKelUtama || "";
                mhn_Kelompok.value = r.NamaKelompok || "";
                mhn_SubKel.value = r.NamaSubKel || "";
                mhnLoadCorrectionStock();
            }
        );
    });
    //#endregion

    //#region Utility & Helper Functions
    window.mhnOpenModal = function (opts) {
        mhnState.pilih = 0;
        mhnState.proses = 0;
        mhnState.jmlBon = 0;
        mhnState.onCloseCb = (opts && opts.onClose) || null;
        mhnResetForm();
        mhn_tbody.innerHTML =
            '<tr><td colspan="13" class="text-center text-muted">Pilih divisi penerima untuk memuat data.</td></tr>';
        mhn_ModalBs.show();
    };

    function mhnResetProcess() {
        const idDivisi = mhn_TIdDivisi2.value;
        mhnResetForm(true);
        if (idDivisi) {
            mhnLoadListMohon(function () {
                mhn_btnIsi.focus();
            });
        }
    }

    function mhnLoadCorrectionStock() {
        if (!mhn_KdBrg.value || !mhn_TIdSubKel.value) return;
        ajaxPost(
            window.infoPkjOrderProyekConfig.routeMhnKodeBarang,
            {
                kodeBarang: mhn_KdBrg.value,
                idSubKel: mhn_TIdSubKel.value,
                idType: mhn_TIdType.value,
            },
            null,
            null,
            function (r) {
                mhnFillKodeBarang(r);
            },
            function (xhr) {
                Swal.fire(
                    "Error",
                    (xhr.responseJSON && xhr.responseJSON.error) ||
                        "Gagal memuat saldo barang.",
                    "error",
                );
            },
        );
    }

    function mhnLookup(title, url, headers, columns, onSelect) {
        openLookupModal({ title, url, headers, columns, onSelect });
    }

    function loadData() {
        const date1 = Date1.value;
        const date2 = Date2.value;
        if (!date1 || !date2) {
            Swal.fire("Info", "Isi tanggal awal dan akhir.", "info");
            return;
        }
        ajaxGet(
            window.infoPkjOrderProyekConfig.routeGetListOrder,
            { date1: date1, date2: date2 },
            function (res) {
                if (res.success) {
                    renderTable(res.data);
                    TTotalBiaya.value = res.totalBiaya || "0";
                } else {
                    Swal.fire("Error", res.error || "Gagal memuat data.", "error");
                }
            }
        );
    }

    function renderTable(data) {
        tbodyData.innerHTML = "";
        if (!data || data.length === 0) {
            tbodyData.innerHTML =
                '<tr><td colspan="15" class="text-center">Tidak ada jadwal pada tanggal tersebut.</td></tr>';
            return;
        }
        let html = "";
        data.forEach(function (row, idx) {
            const colorClass = row.rowColor ? "row-" + row.rowColor : "";
            html += `<tr class="${colorClass}">`;
            html += `<td class="text-nowrap"><label class="d-inline-flex align-items-center gap-2 mb-0">
                <input type="checkbox" class="row-check" data-index="${idx}">
                <span>${row.NoOrder || ""}</span>
            </label></td>`;
            html += `<td>${row.DM || ""}</td>`;
            html += `<td>${row.NamaBarang || ""}</td>`;
            html += `<td>${row.NamaBagian || ""}</td>`;
            html += `<td>${row.TglStart || ""}</td>`;
            html += `<td>${row.KdBarang || ""}</td>`;
            html += `<td>${row.Divisi || ""}</td>`;
            html += `<td>${row.StatusOrder || ""}</td>`;
            html += `<td class="text-end">${row.JmlOrder || ""}</td>`;
            html += `<td>${row.TglFinish || ""}</td>`;
            html += `<td>${row.StatusMtr || ""}</td>`;
            html += `<td class="d-none">${row.IdTrans || ""}</td>`;
            html += `<td class="d-none">${row.Keterangan || ""}</td>`;
            html += `<td class="text-end">${row.TotalBiaya || ""}</td>`;
            html += `<td>${row.TglBon || ""}</td>`;
            html += `</tr>`;
        });
        tbodyData.innerHTML = html;
        tbodyData.dataset.rows = JSON.stringify(data);
    }

    function openMaterialModal(row) {
        materialNoOrder.value = row.NoOrder || "";
        materialNamaBarang.value = row.NamaBarang || "";
        materialNamaBagian.value = row.NamaBagian || "";
        materialKodeBarang.value = row.KdBarang || "";
        materialTbody.innerHTML =
            '<tr><td colspan="7" class="text-center text-muted">Memuat data...</td></tr>';
        materialModalBs.show();

        ajaxGet(
            window.infoPkjOrderProyekConfig.routeGetListMaterial,
            {
                noOrder: row.NoOrder || "",
                namaBagian: row.NamaBagian || "",
                jenisOrder: row.KdBarang ? "H" : "P",
            },
            function (res) {
                if (!res.success) {
                    materialTbody.innerHTML =
                        '<tr><td colspan="7" class="text-center text-danger">Gagal memuat data material.</td></tr>';
                    Swal.fire("Error", res.error || "Gagal memuat data material.", "error");
                    return;
                }
                renderMaterialTable(res.data || []);
            }
        ).fail(function () {
            materialTbody.innerHTML =
                '<tr><td colspan="7" class="text-center text-danger">Gagal memuat data material.</td></tr>';
        });
    }

    function renderMaterialTable(data) {
        if (data.length === 0) {
            materialTbody.innerHTML =
                '<tr><td colspan="7" class="text-center text-muted">Tidak ada data material.</td></tr>';
            return;
        }

        materialTbody.innerHTML = data.map(function (material) {
            const rowClass = material.Status === 1 ? "text-primary" : "";
            return `<tr class="${rowClass}">
                <td>${material.MtrType || ""}</td>
                <td>${material.Spek || ""}</td>
                <td>${material.KdBrg || ""}</td>
                <td class="text-end">${material.Jml || "0.00"}</td>
                <td>${material.NamaSatuan || ""}</td>
                <td>${material.HargaBaru || ""}</td>
                <td>${material.HargaBekas || ""}</td>
            </tr>`;
        }).join("");
    }

    function mhnValidateKodeBarang() {
        const kode = mhn_KdBrg.value.trim();
        const idSubKel = mhn_TIdSubKel.value;
        const idType = mhn_TIdType.value;
        if ((!kode && !idType) || !idSubKel) return;

        const loadKodeBarang = function () {
            ajaxPost(
                window.infoPkjOrderProyekConfig.routeMhnKodeBarang,
                { kodeBarang: kode, idType: idType, idSubKel: idSubKel },
                null,
                null,
                function (r) {
                    mhnFillKodeBarang(r);
                },
                function (xhr) {
                    Swal.fire(
                        "Error",
                        (xhr.responseJSON && xhr.responseJSON.error) ||
                            "Gagal memuat kode barang.",
                        "error",
                    );
                },
            );
        };

        if (!kode) {
            loadKodeBarang();
            return;
        }

        ajaxPost(
            window.infoPkjOrderProyekConfig.routeMhnCekKodeBarang,
            { kodeBarang: kode, idSubKel: idSubKel },
            null,
            null,
            function (res) {
                if (res.jumlah === 0) {
                    Swal.fire(
                        "Error",
                        "Tidak ada kode barang " + kode + " pada sub kel ini.",
                        "error",
                    );
                    return;
                }
                loadKodeBarang();
            },
            function (xhr) {
                Swal.fire(
                    "Error",
                    (xhr.responseJSON && xhr.responseJSON.error) ||
                        "Gagal memeriksa kode barang.",
                    "error",
                );
            },
        );
    }

    function mhnFillKodeBarang(r) {
        if (!r) return;
        const kodeBarang = String(r.KodeBarang || mhn_KdBrg.value || "").trim();
        if (!kodeBarang) {
            Swal.fire("Error", "Kode Barang untuk Nama Barang ini tidak ditemukan.", "error");
            return;
        }
        mhn_KdBrg.value = kodeBarang;
        mhn_NmBrg.value = r.NamaType || mhn_NmBrg.value || "";
        mhn_TIdType.value = r.IdType || mhn_TIdType.value || "";
        mhn_Primer1.value = r.Primer1 || 0;
        mhn_Sekunder1.value = r.Sekunder1 || 0;
        mhn_Tritier1.value = r.Tritier1 || 0;
        mhn_SatPrimer1.textContent = r.SatPrimer1 || "";
        mhn_SatSekunder1.textContent = r.SatSekunder1 || "";
        mhn_SatTritier1.textContent = r.SatTritier1 || "";
        mhnState.konvBeri = r.KonvBeri || "";

        if (!mhn_TIdSubKel2.value) return;

        ajaxPost(
            window.infoPkjOrderProyekConfig.routeMhnKodeBarangTerima,
            {
                kodeBarang: r.KodeBarang || mhn_KdBrg.value,
                idSubKel: mhn_TIdSubKel2.value,
            },
            null, null,
            function (t) {
                mhnState.konvTerima = t.KonvTerima || "";
                mhn_SatPrimer.textContent = t.SatPrimer || "-";
                mhn_SatSekunder.textContent = t.SatSekunder || "-";
                mhn_SatTritier.textContent = t.SatTritier || "-";

                let valid = false;
                if (mhnState.konvBeri !== "Y" && mhnState.konvTerima !== "Y") {
                    valid =
                        t.SatPrimer === mhn_SatPrimer1.textContent &&
                        t.SatSekunder === mhn_SatSekunder1.textContent &&
                        t.SatTritier === mhn_SatTritier1.textContent;
                } else if (mhnState.konvBeri === "Y" && mhnState.konvTerima !== "Y") {
                    valid =
                        t.SatPrimer === mhn_SatPrimer1.textContent ||
                        t.SatSekunder === mhn_SatSekunder1.textContent ||
                        t.SatTritier === mhn_SatTritier1.textContent;
                }

                if (valid) {
                    const canEditQty = mhnState.proses === 1 || mhnState.proses === 2;
                    mhn_FrameQty.disabled = !canEditQty;
                    if (canEditQty) mhn_Primer.select();
                } else {
                    mhn_FrameQty.disabled = true;
                    Swal.fire(
                        "Error",
                        "Satuan pemberi dan penerima tidak sama.",
                        "error"
                    );
                }
            }
        );
    }

    function mhnConfirmAction() {
        ajaxPost(
            window.infoPkjOrderProyekConfig.routeMhnUpdateTmp,
            {
                idTransaksi: mhn_IdTransaksi.value,
                alasan: mhn_Alasan.value,
                primer: parseFloat(mhn_Primer.value) || 0,
                sekunder: parseFloat(mhn_Sekunder.value) || 0,
                tritier: parseFloat(mhn_Tritier.value) || 0,
                idSubKelTujuan: mhn_TIdSubKel2.value,
            },
            null, null,
            function (res) {
                Swal.fire("Sukses", res.message, "success");
                mhnResetForm(true);
                mhnLoadListMohon();
            },
            function (xhr) {
                Swal.fire(
                    "Error",
                    (xhr.responseJSON && xhr.responseJSON.error) || "Gagal update.",
                    "error"
                );
            }
        );
    }

    function mhnLoadListMohon(onLoaded) {
        const finish = function () {
            if (typeof onLoaded === "function") onLoaded();
        };
        if (!mhn_TIdDivisi2.value) {
            finish();
            return;
        }
        mhn_tbody.innerHTML =
            '<tr><td colspan="13" class="text-center text-muted">Memuat data...</td></tr>';

        ajaxPost(
            window.infoPkjOrderProyekConfig.routeMhnListMohon,
            {
                kode: mhnState.pilih === 0 ? 2 : 1,
                idDivisi: mhn_TIdDivisi2.value,
            },
            null, null,
            function (data) {
                if (!data || data.length === 0) {
                    mhn_tbody.innerHTML =
                        '<tr><td colspan="13" class="text-center text-muted">Tidak ada data mohon.</td></tr>';
                    finish();
                    return;
                }
                let html = "";
                data.forEach(function (row) {
                    html += "<tr>";
                    html += `<td class="mhn-tbl-cell">${esc(row.IdTransaksi)}</td>`;
                    html += `<td class="mhn-tbl-cell">${esc(row.NamaType)}</td>`;
                    html += `<td class="mhn-tbl-cell">${esc(row.UraianDetail)}</td>`;
                    html += `<td class="mhn-tbl-cell">${esc(row.IdPenerima)}</td>`;
                    html += `<td class="mhn-tbl-cell">${esc(row.SaatAwal)}</td>`;
                    html += `<td class="mhn-tbl-cell">${esc(row.NamaDivisi)}</td>`;
                    html += `<td class="mhn-tbl-cell">${esc(row.NamaObjek)}</td>`;
                    html += `<td class="mhn-tbl-cell">${esc(row.NamaKelUtama)}</td>`;
                    html += `<td class="mhn-tbl-cell">${esc(row.NamaKelompok)}</td>`;
                    html += `<td class="mhn-tbl-cell">${esc(row.NamaSubKel)}</td>`;
                    html += `<td class="mhn-tbl-cell d-none">${esc(row.KodeBarang)}</td>`;
                    html += `<td class="mhn-tbl-cell d-none">${esc(row.IdType)}</td>`;
                    html += `<td class="mhn-tbl-cell text-end">${row.Primer}</td>`;
                    html += `<td class="mhn-tbl-cell text-end">${row.Sekunder}</td>`;
                    html += `<td class="mhn-tbl-cell text-end">${row.Tritier}</td>`;
                    html += `<td class="mhn-tbl-cell d-none">${esc(row.SatPrimer)}</td>`;
                    html += `<td class="mhn-tbl-cell d-none">${esc(row.SatSekunder)}</td>`;
                    html += `<td class="mhn-tbl-cell d-none">${esc(row.SatTritier)}</td>`;
                    html += `<td class="mhn-tbl-cell d-none">${esc(row.IdPenerima1)}</td>`;
                    html += "</tr>";
                });
                mhn_tbody.innerHTML = html;
                finish();
            },
            function () {
                mhn_tbody.innerHTML =
                    '<tr><td colspan="13" class="text-center text-danger">Gagal memuat.</td></tr>';
                finish();
            }
        );
    }

    function mhnResetForm(preserveReceiver) {
        const receiverId = preserveReceiver ? mhn_TIdDivisi2.value : "";
        const receiverName = preserveReceiver ? mhn_Divisi2.value : "";
        mhn_TIdDivisi2.value = receiverId;
        mhn_Divisi2.value = receiverName;
        mhn_TIdObjek2.value = "";
        mhn_Objek2.value = "";
        mhn_TIdKelUtama2.value = "";
        mhn_KelUtama2.value = "";
        mhn_TIdKelompok2.value = "";
        mhn_Kelompok2.value = "";
        mhn_TIdSubKel2.value = "";
        mhn_SubKel2.value = "";
        mhn_Pemohon.value = mhn_Pemohon.dataset.user || "";
        mhn_Tanggal.value = new Date().toISOString().slice(0, 10);
        mhn_btnObjek2.disabled = true;
        mhn_btnKelUtama2.disabled = true;
        mhn_btnKelompok2.disabled = true;
        mhn_btnSubKel2.disabled = true;
        mhnResetFormAsalOnly();
        mhn_IdTransaksi.value = "";
        mhn_btnIsi.textContent = "ISI";
        mhn_btnIsi.disabled = false;
        mhn_btnKoreksi.disabled = false;
        mhn_btnHapus.disabled = false;
        mhn_btnKoreksi.textContent = "KOREKSI";
        mhn_btnHapus.textContent = "HAPUS";
        mhn_btnKeluar.textContent = "KELUAR";
        mhn_btnObjek2.disabled = true;
        mhn_FrameAsal.disabled = true;
        mhn_FrameQty.disabled = true;
        mhnSetListVisible(true);
        mhnSetEntryFieldsVisible(false);
        mhnState.proses = 0;
        mhn_tbody.querySelectorAll("tr.selected").forEach(function (x) {
            x.classList.remove("selected");
        });
    }

    function mhnResetFormAsalOnly() {
        mhn_TIdDivisi.value = "";
        mhn_Divisi.value = "";
        mhn_TIdObjek.value = "";
        mhn_Objek.value = "";
        mhn_TIdKelUtama.value = "";
        mhn_KelUtama.value = "";
        mhn_TIdKelompok.value = "";
        mhn_Kelompok.value = "";
        mhn_TIdSubKel.value = "";
        mhn_SubKel.value = "";
        mhn_TIdType.value = "";
        mhn_NmBrg.value = "";
        mhn_KdBrg.value = "";
        mhn_btnDivisi.disabled = true;
        mhn_btnObjek.disabled = true;
        mhn_btnKelUtama.disabled = true;
        mhn_btnKelompok.disabled = true;
        mhn_btnSubKel.disabled = true;
        mhn_FrameQty.disabled = true;
        mhn_FrameAsal.disabled = true;
        mhn_Primer.value = "0";
        mhn_Sekunder.value = "0";
        mhn_Tritier.value = "0";
        mhn_Primer1.value = "0";
        mhn_Sekunder1.value = "0";
        mhn_Tritier1.value = "0";
        mhn_SatPrimer.textContent = "-";
        mhn_SatSekunder.textContent = "-";
        mhn_SatTritier.textContent = "-";
        mhn_SatPrimer1.textContent = "";
        mhn_SatSekunder1.textContent = "";
        mhn_SatTritier1.textContent = "";
        mhn_Alasan.value = "";
        mhnState.konvBeri = "";
        mhnState.konvTerima = "";
    }

    function mhnClearBarangFields() {
        mhn_KdBrg.value = "";
        mhn_NmBrg.value = "";
        mhn_TIdType.value = "";
        mhn_Primer1.value = "0";
        mhn_Sekunder1.value = "0";
        mhn_Tritier1.value = "0";
        mhn_SatPrimer1.textContent = "";
        mhn_SatSekunder1.textContent = "";
        mhn_SatTritier1.textContent = "";
        mhn_Primer.value = "0";
        mhn_Sekunder.value = "0";
        mhn_Tritier.value = "0";
        mhn_SatPrimer.textContent = "-";
        mhn_SatSekunder.textContent = "-";
        mhn_SatTritier.textContent = "-";
        mhn_Alasan.value = "";
        mhn_FrameQty.disabled = true;
        mhnState.konvBeri = "";
        mhnState.konvTerima = "";
    }

    function mhnSetListVisible(visible) {
        mhn_TableSection.classList.toggle("d-none", !visible);
    }

    function mhnSetEntryFieldsVisible(visible) {
        mhn_BarangFields.classList.toggle("d-none", !visible);
    }

    function esc(s) {
        return String(s == null ? "" : s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
    //#endregion
});
