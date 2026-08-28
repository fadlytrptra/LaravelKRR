//#region Variabel DOM Elements
const inputIdNomor = document.getElementById("id_nomor");
const txtNomor = document.getElementById("txt_nomor");
const btnLookupNomor = document.getElementById("btn_lookup_nomor");

const inputIdNoKonversi = document.getElementById("id_no_konversi");
const txtNoKonversi = document.getElementById("txt_no_konversi");
const btnLookupNoKonversi = document.getElementById("btn_lookup_no_konversi");

const inputIdType = document.getElementById("id_type");
const txtType = document.getElementById("txt_type");
const btnLookupType = document.getElementById("btn_lookup_type");

const txtMesin = document.getElementById("txt_mesin");
const txtShift = document.getElementById("shift");
const timeAwal = document.getElementById("shift_awal");
const timeAkhir = document.getElementById("shift_akhir");
const dateMohon = document.getElementById("tanggal_mohon");
const dateInput = document.getElementById("tanggal");

const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const hidRincianKonv = document.getElementById("form_rk_return");

const namaGedung = document.getElementById("nama_gedung").value;
const idDivisi = namaGedung === "D" ? "DEX" : "EXT";

const listAsal = [];
const listTujuan = [];
const colTable = [
    { width: "100px" }, // IdType
    { width: "150px" }, // NamaType
    { width: "75px" }, // JumlahPrimer
    { width: "75px" }, // JumlahSekunder
    { width: "75px" }, // JumlahTritier
    { width: "125px" }, // NamaObjek
    { width: "90px" }, // NamaKelompokUtama
    { width: "90px" }, // NamaKelompok
    { width: "90px" }, // NamaSubKelompok
    { width: "90px" }, // IdObjek
    { width: "90px" }, // IdKelompokUtama
    { width: "90px" }, // IdKelompok
    { width: "90px" }, // IdSubKelompok
    { width: "90px" }, // IdTransaksi
];

window.modeProses = "";
let pilAsal = -1;
let pilTujuan = -1;
let clickedTable = "";
//#endregion

//#region Lookup Triggers (Events)
btnLookupNomor.addEventListener("click", function () {
    if (window.modeProses !== "koreksi" && window.modeProses !== "hapus") {
        Swal.fire(
            "Peringatan",
            "Mode yang aktif tidak memerlukan pemilihan nomor.",
            "warning",
        );
        return;
    }
    if (!dateInput.value) {
        Swal.fire("Peringatan", "Pilih tanggal terlebih dahulu.", "warning");
        dateInput.focus();
        return;
    }

    openLookupModal({
        title: "Pilih Nomor Konversi NG",
        url: `/Benang/getKoreksiSortirNGBlmAcc/${safeUrlParam(dateInput.value)}`,
        headers: ["ID Konversi NG", "Mesin"],
        columns: ["IdKonversiNG", "MesinShift"],
        onSelect: (row) => {
            inputIdNomor.value = row.IdKonversiNG;
            txtNomor.value = row.MesinShift;
            const parts = (row.MesinShift || "").split("/");
            txtMesin.value = parts.length >= 2 ? parts[0].trim() : "";
            txtShift.value =
                parts.length >= 2 ? parts[1].trim().toUpperCase() : "";

            listAsal.length = 0;
            clearTable_DataTable(
                "table_asal",
                colTable.length,
                "padding=250px",
            );
            listTujuan.length = 0;
            clearTable_DataTable(
                "table_tujuan",
                colTable.length,
                "padding=250px",
            );

            lihatDataKonversiNGFetch(row.IdKonversiNG, () => {
                if (window.modeProses === "koreksi") {
                    $("html, body").animate(
                        { scrollTop: $("#table_asal").offset().top - 125 },
                        100,
                    );
                } else if (window.modeProses === "hapus") {
                    btnProses.disabled = false;
                    btnProses.focus();
                }
            });
        },
    });
});

btnLookupNoKonversi.addEventListener("click", function () {
    if (window.modeProses !== "isi") {
        Swal.fire(
            "Peringatan",
            'Pemilihan nomor konversi hanya pada mode "Isi".',
            "warning",
        );
        return;
    }
    if (!dateInput.value || !txtShift.value) {
        Swal.fire(
            "Peringatan",
            "Tanggal dan Shift harus diisi terlebih dahulu.",
            "warning",
        );
        return;
    }

    openLookupModal({
        title: "Pilih Nomor Konversi",
        url: `/Benang/getListIdKonv1/${safeUrlParam(idDivisi)}/${safeUrlParam(dateInput.value)}/${safeUrlParam(txtShift.value)}`,
        headers: ["ID Konversi", "Type Mesin"],
        columns: ["Konversi", "TypeMesin"],
        onSelect: (row) => {
            const konv = row.Konversi || "";
            const parts = konv.split("//");
            const idKonv = parts[0] || "";
            const namaKomposisi = parts[1] || "";

            inputIdNoKonversi.value = idKonv;
            txtNoKonversi.value = namaKomposisi;
            txtMesin.value = row.TypeMesin || "";

            // Reset shift awal/akhir dengan mengambil dari data konversi (jika ada)
            fetchSelectAsync(`/Benang/getListIdKonv2/${safeUrlParam(idKonv)}`)
                .then((data) => {
                    if (data && data.length > 0) {
                        timeAwal.value = dateTimetoTime(data[0].AwalShift);
                        timeAkhir.value = dateTimetoTime(data[0].AkhirShift);
                    } else {
                        timeAwal.value = "00:00";
                        timeAkhir.value = "00:00";
                    }
                })
                .catch(() => {
                    timeAwal.value = "00:00";
                    timeAkhir.value = "00:00";
                });

            listAsal.length = 0;
            clearTable_DataTable(
                "table_asal",
                colTable.length,
                "padding=250px",
            );
            listTujuan.length = 0;
            clearTable_DataTable(
                "table_tujuan",
                colTable.length,
                "padding=250px",
            );

            btnLookupType.disabled = false;
            btnLookupType.focus();
        },
    });
});

btnLookupType.addEventListener("click", function () {
    if (window.modeProses !== "isi") {
        Swal.fire(
            "Peringatan",
            'Pemilihan type hanya pada mode "Isi".',
            "warning",
        );
        return;
    }
    if (!inputIdNoKonversi.value) {
        Swal.fire(
            "Peringatan",
            "Pilih nomor konversi terlebih dahulu.",
            "warning",
        );
        return;
    }
    if (listTujuan.length > 0) {
        Swal.fire(
            "Peringatan",
            "Tidak boleh mengubah type karena sudah ada item tujuan konversi.",
            "warning",
        );
        return;
    }

    openLookupModal({
        title: "Pilih Type Produksi NG",
        url: `/Benang/getListProdNG/${safeUrlParam(inputIdNoKonversi.value)}`,
        headers: ["ID Type", "Nama Type"],
        columns: ["IdType", "Type"],
        onSelect: (row) => {
            inputIdType.value = row.IdType;
            txtType.value = row.Type;

            // Cek data NG (kode 1)
            fetchSelectAsync(
                `/Benang/getCekDataNG/1/${safeUrlParam(inputIdNoKonversi.value)}/${safeUrlParam(row.IdType)}`,
            )
                .then((data) => {
                    if (data.length > 0 && data[0].ada > 0) {
                        // Ada, cek status ACC (kode 2)
                        fetchSelectAsync(
                            `/Benang/getCekDataNG/2/${safeUrlParam(inputIdNoKonversi.value)}/${safeUrlParam(row.IdType)}`,
                        ).then((data2) => {
                            if (data2.length > 0) {
                                const pesan =
                                    data2[0].SaatLog != null
                                        ? `${row.Type} sudah disortir dan di-ACC.\nCek datanya di Kartu Barang Inventory.`
                                        : `${row.Type} sudah disortir namun belum di-ACC.\nCek datanya di ACC Sortir Benang NG.`;
                                Swal.fire("Peringatan", pesan, "warning");
                            }
                        });
                    } else {
                        displayDataBenangNGFetch();
                    }
                })
                .catch(() =>
                    Swal.fire("Error", "Gagal mengecek data NG.", "error"),
                );
        },
    });
});
//#endregion

//#region Input & Core Events
dateInput.addEventListener("change", function () {
    resetAllFields();
});

dateInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (window.modeProses === "isi") {
            txtShift.disabled = false;
            txtShift.focus();
        } else if (
            window.modeProses === "koreksi" ||
            window.modeProses === "hapus"
        ) {
            btnLookupNomor.disabled = false;
            btnLookupNomor.focus();
        }
    }
});

dateMohon.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        dateInput.value = dateMohon.value;
        btnIsi.focus();
    }
});

txtShift.addEventListener("change", function () {
    inputIdNoKonversi.value = "";
    txtNoKonversi.value = "";
});

txtShift.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (this.value.trim() !== "") {
            this.value = this.value.toUpperCase();
            btnLookupNoKonversi.disabled = false;
            btnLookupNoKonversi.focus();
        } else {
            this.select();
        }
    }
});

btnIsi.addEventListener("click", function () {
    clearAll();
    dateInput.classList.remove("unclickable");
    dateInput.value = dateMohon.value;
    dateInput.focus();
    window.modeProses = "isi";
    toggleButtons(2);
    btnLookupNomor.disabled = true;
    btnLookupNoKonversi.disabled = true;
    btnLookupType.disabled = true;
});

btnKoreksi.addEventListener("click", function () {
    clearAll();
    dateInput.classList.remove("unclickable");
    window.modeProses = "koreksi";
    toggleButtons(2);
    btnLookupNomor.disabled = false;
    btnLookupNomor.focus();
});

btnHapus.addEventListener("click", function () {
    clearAll();
    dateInput.classList.remove("unclickable");
    window.modeProses = "hapus";
    toggleButtons(2);
    btnLookupNomor.disabled = false;
    btnLookupNomor.focus();
});

btnProses.addEventListener("click", async function () {
    try {
        this.disabled = true;
        this.innerHTML =
            '<span class="spinner-border spinner-border-sm"></span> Processing...';
        btnKeluar.disabled = true;

        if (window.modeProses === "isi") {
            if (listAsal.length <= 0 || listTujuan.length <= 0) {
                Swal.fire(
                    "Peringatan",
                    "Data tidak dapat diproses karena tidak ada asal atau tujuan konversi.",
                    "warning",
                );
                return;
            }
            await prosesIsiFetch();
        } else if (window.modeProses === "koreksi") {
            if (!inputIdNomor.value) {
                Swal.fire(
                    "Peringatan",
                    "Pilih dulu data konversi yang akan dikoreksi.",
                    "warning",
                );
                return;
            }
            const confirm = await Swal.fire({
                title: "Koreksi",
                html: `Apakah anda yakin akan mengoreksi data <b>${txtNomor.value}</b>?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ya, Koreksi",
            });
            if (confirm.isConfirmed) await prosesKoreksiFetch();
        } else if (window.modeProses === "hapus") {
            if (!inputIdNomor.value) {
                Swal.fire(
                    "Peringatan",
                    "Pilih dulu data konversi yang akan dihapus.",
                    "warning",
                );
                return;
            }
            const confirm = await Swal.fire({
                title: "Hapus",
                html: `Apakah anda yakin akan menghapus data <b>${txtNomor.value}</b>?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, Hapus",
            });
            if (confirm.isConfirmed) await prosesHapusFetch(inputIdNomor.value);
        }
    } catch (error) {
        Swal.fire("Error System", error.message || error, "error");
    } finally {
        this.disabled = false;
        this.innerText = "Proses";
        btnKeluar.disabled = false;
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent !== "Keluar") {
        toggleButtons(1);
        clearAll();
        disableAll();
        window.modeProses = "";
        btnIsi.focus();
    } else {
        window.location.href = "/Extruder/Extruder";
    }
});

hidRincianKonv.addEventListener("change", function () {
    if (clickedTable === "asal") {
        if (pilAsal === -1 || pilAsal >= listAsal.length) {
            const idType = RK_txtIdType.value;
            const foundIdx = listAsal.findIndex(
                (item) => item.IdType === idType,
            );
            if (foundIdx !== -1) {
                pilAsal = foundIdx;
            } else {
                console.warn("Tidak ditemukan indeks asal yang cocok");
                clickedTable = "";
                return;
            }
        }
        if (window.modeProses === "isi") {
            listTujuan.push({
                IdType: RK_txtIdTypeTujuan.value,
                NamaType: RK_txtNamaTypeTujuan.value,
                JumlahPrimer: txtPrimerTujuan.value,
                JumlahSekunder: txtSekunderTujuan.value,
                JumlahTritier: txtTritierTujuan.value,
                NamaObjek: "Bahan & Hasil Produksi",
                NamaKelompokUtama: RK_txtNamaKelutTujuan.value,
                NamaKelompok: RK_txtNamaKelTujuan.value,
                NamaSubKelompok: RK_txtNamaSubkelTujuan.value,
                IdObjek: "032",
                IdKelompokUtama: RK_txtIdKelutTujuan.value,
                IdKelompok: RK_txtIdKelTujuan.value,
                IdSubKelompok: RK_txtIdSubkelTujuan.value,
                IdTransaksi: "",
            });
            addTable_DataTable(
                "table_tujuan",
                listTujuan,
                colTable,
                rowClickedTujuan,
                "125px",
            );
        } else if (window.modeProses === "koreksi") {
            listAsal[pilAsal].JumlahPrimer = txtPrimerAsal.value;
            listAsal[pilAsal].JumlahSekunder = txtSekunderAsal.value;
            listAsal[pilAsal].JumlahTritier = txtTritierAsal.value;
            addTable_DataTable(
                "table_asal",
                listAsal,
                colTable,
                rowClickedAsal,
                "125px",
            );
        }
    } else if (clickedTable === "tujuan") {
        if (pilTujuan === -1 || pilTujuan >= listTujuan.length) {
            const idType = RK_txtIdTypeTujuan.value;
            const foundIdx = listTujuan.findIndex(
                (item) => item.IdType === idType,
            );
            if (foundIdx !== -1) {
                pilTujuan = foundIdx;
            } else {
                console.warn("Tidak ditemukan indeks tujuan yang cocok");
                clickedTable = "";
                return;
            }
        }
        listTujuan[pilTujuan].JumlahPrimer = txtPrimerTujuan.value;
        listTujuan[pilTujuan].JumlahSekunder = txtSekunderTujuan.value;
        listTujuan[pilTujuan].JumlahTritier = txtTritierTujuan.value;
        addTable_DataTable(
            "table_tujuan",
            listTujuan,
            colTable,
            rowClickedTujuan,
            "125px",
        );
    }
    clickedTable = "";
    pilAsal = -1;
    pilTujuan = -1;
    btnProses.focus();
});

$("#form_rincian_konversi").on("hidden.bs.modal", function () {
    if (clickedTable !== "") {
        clickedTable = "";
        pilAsal = -1;
        pilTujuan = -1;
    }
    RK_clearAll();
    clearSelection_DataTable("table_asal");
    clearSelection_DataTable("table_tujuan");
});
//#endregion

//#region Utility & Helper Functions
function resetAllFields() {
    inputIdNomor.value = "";
    txtNomor.value = "";
    inputIdNoKonversi.value = "";
    txtNoKonversi.value = "";
    inputIdType.value = "";
    txtType.value = "";
    listAsal.length = 0;
    clearTable_DataTable("table_asal", colTable.length, "padding=250px");
    listTujuan.length = 0;
    clearTable_DataTable("table_tujuan", colTable.length, "padding=250px");
}

function clearAll() {
    resetAllFields();
    txtMesin.value = "";
    txtShift.value = "";
    timeAwal.value = "00:00";
    timeAkhir.value = "00:00";
    dateInput.value = getCurrentDate();
    dateMohon.value = getCurrentDate();
    btnLookupNomor.disabled = true;
    btnLookupNoKonversi.disabled = true;
    btnLookupType.disabled = true;
}

function disableAll() {
    btnLookupNomor.disabled = true;
    btnLookupNoKonversi.disabled = true;
    btnLookupType.disabled = true;
    timeAwal.classList.add("unclickable");
    timeAkhir.classList.add("unclickable");
    dateInput.classList.add("unclickable");
    txtShift.disabled = true;
}

function toggleButtons(tmb) {
    if (tmb === 1) {
        btnIsi.disabled = false;
        btnKoreksi.disabled = false;
        btnHapus.disabled = false;
        btnProses.disabled = true;
        btnKeluar.textContent = "Keluar";
    } else if (tmb === 2) {
        btnIsi.disabled = true;
        btnKoreksi.disabled = true;
        btnHapus.disabled = true;
        btnProses.disabled = false;
        btnKeluar.textContent = "Batal";
    }
}

function lihatDataKonversiNGFetch(id_konversi, post_action = null) {
    listAsal.length = 0;
    clearTable_DataTable("table_asal", colTable.length, "padding=250px");
    listTujuan.length = 0;
    clearTable_DataTable("table_tujuan", colTable.length, "padding=250px");

    fetchSelectAsync(
        `/Benang/getListDataNG/${safeUrlParam(id_konversi.trim())}/${safeUrlParam(dateInput.value)}`,
    )
        .then((data_ng) => {
            if (data_ng.length > 0) {
                timeAwal.value = dateTimetoTime(data_ng[0].AwalShift);
                timeAkhir.value = dateTimetoTime(data_ng[0].AkhirShift);

                if (!inputIdNoKonversi.value) {
                    inputIdNoKonversi.value = data_ng[0].IdKonversiEXT;
                    txtNoKonversi.value = data_ng[0].NamaKomposisi;
                }

                return fetchSelectAsync(
                    `/Benang/getDetailUraianKonvNG/${safeUrlParam(data_ng[0].IdKonversiINV)}`,
                );
            } else {
                Swal.fire(
                    "Peringatan",
                    "Data NG tidak ditemukan untuk tanggal ini.",
                    "warning",
                );
                return [];
            }
        })
        .then((detail) => {
            if (detail && detail.length > 0) {
                detail.forEach((item) => {
                    if (item.UraianDetailTransaksi === "Asal Konversi") {
                        listAsal.push({
                            IdType: item.IdType,
                            NamaType: item.NamaType,
                            JumlahPrimer: item.JumlahPengeluaranPrimer,
                            JumlahSekunder: item.JumlahPengeluaranSekunder,
                            JumlahTritier: item.JumlahPengeluaranTritier,
                            NamaObjek: item.NamaObjek,
                            NamaKelompokUtama: item.NamaKelompokUtama,
                            NamaKelompok: item.NamaKelompok,
                            NamaSubKelompok: item.NamaSubKelompok,
                            IdObjek: item.IdObjek,
                            IdKelompokUtama: item.IdKelompokUtama,
                            IdKelompok: item.IdKelompok,
                            IdSubKelompok: item.IdSubkelompok,
                            IdTransaksi: item.IdTransaksi,
                        });
                        addTable_DataTable(
                            "table_asal",
                            listAsal,
                            colTable,
                            rowClickedAsal,
                            "125px",
                        );
                    } else if (
                        item.UraianDetailTransaksi === "Tujuan Konversi"
                    ) {
                        listTujuan.push({
                            IdType: item.IdType,
                            NamaType: item.NamaType,
                            JumlahPrimer: item.JumlahPemasukanPrimer,
                            JumlahSekunder: item.JumlahPemasukanSekunder,
                            JumlahTritier: item.JumlahPemasukanTritier,
                            NamaObjek: item.NamaObjek,
                            NamaKelompokUtama: item.NamaKelompokUtama,
                            NamaKelompok: item.NamaKelompok,
                            NamaSubKelompok: item.NamaSubKelompok,
                            IdObjek: item.IdObjek,
                            IdKelompokUtama: item.IdKelompokUtama,
                            IdKelompok: item.IdKelompok,
                            IdSubKelompok: item.IdSubkelompok,
                            IdTransaksi: item.IdTransaksi,
                        });
                        addTable_DataTable(
                            "table_tujuan",
                            listTujuan,
                            colTable,
                            rowClickedTujuan,
                            "125px",
                        );
                    }
                });
            }
            if (post_action) post_action();
        })
        .catch(() =>
            Swal.fire("Error", "Gagal mengambil data konversi NG.", "error"),
        );
}

function displayDataBenangNGFetch(post_action = null) {
    fetchSelectAsync(
        `/Benang/getListIdKonv3/${safeUrlParam(inputIdNoKonversi.value)}/${safeUrlParam(inputIdType.value)}`,
    )
        .then((data) => {
            if (data.length > 0) {
                $("html, body").animate(
                    { scrollTop: $("#table_asal").offset().top - 125 },
                    100,
                );
                listAsal.length = 0;
                data.forEach((item) => {
                    listAsal.push({
                        IdType: item.IdType,
                        NamaType: item.NamaType,
                        JumlahPrimer: item.JumlahPrimer,
                        JumlahSekunder: item.JumlahSekunder,
                        JumlahTritier: item.JumlahTritier,
                        NamaObjek: item.NamaObjek,
                        NamaKelompokUtama: item.NamaKelompokUtama,
                        NamaKelompok: item.NamaKelompok,
                        NamaSubKelompok: item.NamaSubKelompok,
                        IdObjek: item.IdObjek,
                        IdKelompokUtama: item.IdKelompokUtama,
                        IdKelompok: item.IdKelompok,
                        IdSubKelompok: item.IdSubKelompok,
                        IdTransaksi: "",
                    });
                });
                addTable_DataTable(
                    "table_asal",
                    listAsal,
                    colTable,
                    rowClickedAsal,
                    "125px",
                );
                setTimeout(() => {
                    const rows = $("#table_asal tbody tr");

                    if (rows.length > 0) {
                        rows.attr("tabindex", "0");
                        rows.removeClass("keyboard-selected");

                        rows.eq(0).addClass("keyboard-selected").focus();
                    }
                }, 100);
            } else {
                Swal.fire(
                    "Peringatan",
                    "Hasil Konversi Tidak Menghasilkan Benang NG",
                    "warning",
                );
            }
            if (typeof post_action === "function") post_action(data.length > 0);
        })
        .catch(() =>
            Swal.fire("Error", "Gagal mengambil data benang NG.", "error"),
        );
}

async function prosesIsiFetch() {
    try {
        await fetchPost("/Benang/insMasterKonvNG", {
            tanggal: dateMohon.value,
            id_konversi_ext: inputIdNoKonversi.value,
        });

        const dataKonv = await fetchSelectAsync("/Benang/getMasterKonversiNG");
        if (!dataKonv.IdKonversiNG)
            throw new Error("Gagal mendapatkan ID Konversi NG");

        const idKonvNG = dataKonv.IdKonversiNG;
        inputIdNomor.value = idKonvNG;
        txtNomor.value = idKonvNG;

        const counterData = await fetchSelectAsync("/Benang/getListCounter");
        const id_konv_inv = padLeft(counterData[0].NoKonversi, 9, "0");

        await insertDetailLogic(id_konv_inv);

        clearAll();
        disableAll();
        toggleButtons(1);
        window.modeProses = "";
        btnIsi.focus();
        Swal.fire("Berhasil", "Data berhasil tersimpan.", "success");
    } catch (error) {
        Swal.fire("Error", error.message || "Gagal menyimpan data.", "error");
    }
}

async function insertDetailLogic(id_konv_inv) {
    for (let i = 0; i < listAsal.length; i++) {
        try {
            await fetchPost("/Benang/insDetailKonvNG", {
                id_konversi_ng: inputIdNomor.value,
                id_type: listAsal[i].IdType.trim(),
                jumlah_primer: listAsal[i].JumlahPrimer,
                jumlah_sekunder: listAsal[i].JumlahSekunder,
                jumlah_tritier: listAsal[i].JumlahTritier,
                id_konv_inv: id_konv_inv,
            });
            await fetchPost("/Benang/insAsalTmpTrans", {
                id_type_transaksi: "04",
                uraian_detail_transaksi: "asal_konversi",
                id_type: listAsal[i].IdType.trim(),
                saat_awal_transaksi: dateMohon.value,
                jumlah_primer: listAsal[i].JumlahPrimer,
                jumlah_sekunder: listAsal[i].JumlahSekunder,
                jumlah_tritier: listAsal[i].JumlahTritier,
                asal_sub_kel: listAsal[i].IdSubKelompok.trim(),
                id_konversi: id_konv_inv.trim(),
            });
        } catch (e) {
            throw new Error(`Gagal insert asal index ${i}: ${e.message}`);
        }
    }

    for (let i = 0; i < listTujuan.length; i++) {
        try {
            await fetchPost("/Benang/insDetailKonvNG", {
                id_konversi_ng: inputIdNomor.value,
                id_type: listTujuan[i].IdType.trim(),
                jumlah_primer: listTujuan[i].JumlahPrimer,
                jumlah_sekunder: listTujuan[i].JumlahSekunder,
                jumlah_tritier: listTujuan[i].JumlahTritier,
                id_konv_inv: id_konv_inv,
            });
            await fetchPost("/Benang/insTujuanTmpTrans", {
                id_type_transaksi: "04",
                uraian_detail_transaksi: "tujuan_konversi",
                id_type: listTujuan[i].IdType.trim(),
                saat_awal_transaksi: dateMohon.value,
                jumlah_primer: listTujuan[i].JumlahPrimer,
                jumlah_sekunder: listTujuan[i].JumlahSekunder,
                jumlah_tritier: listTujuan[i].JumlahTritier,
                tujuan_sub_kel: listTujuan[i].IdSubKelompok.trim(),
                id_konversi: id_konv_inv.trim(),
            });
        } catch (e) {
            throw new Error(`Gagal insert tujuan index ${i}: ${e.message}`);
        }
    }
}

async function prosesKoreksiFetch() {
    try {
        const idKonvNG = inputIdNomor.value;

        for (let i = 0; i < listAsal.length; i++) {
            await fetchPost(
                "/Benang/updDetailKonvNG",
                {
                    id_konversi: idKonvNG,
                    id_type: listAsal[i].IdType,
                    j_primer: listAsal[i].JumlahPrimer,
                    j_sekunder: listAsal[i].JumlahSekunder,
                    j_tritier: listAsal[i].JumlahTritier,
                },
                "PUT",
            );
            await fetchPost(
                "/Benang/updTmpTransaksi",
                {
                    id_transaksi: listAsal[i].IdTransaksi,
                    uraian_detail_transaksi: "asal_konversi",
                    jumlah_keluar_primer: listAsal[i].JumlahPrimer,
                    jumlah_keluar_sekunder: listAsal[i].JumlahSekunder,
                    jumlah_keluar_tritier: listAsal[i].JumlahTritier,
                    asal_sub_kel: listAsal[i].IdSubKelompok || "",
                    tujuan_sub_kelompok: "",
                },
                "PUT",
            );
        }

        for (let i = 0; i < listTujuan.length; i++) {
            await fetchPost(
                "/Benang/updDetailKonvNG",
                {
                    id_konversi: idKonvNG,
                    id_type: listTujuan[i].IdType,
                    j_primer: listTujuan[i].JumlahPrimer,
                    j_sekunder: listTujuan[i].JumlahSekunder,
                    j_tritier: listTujuan[i].JumlahTritier,
                },
                "PUT",
            );
            await fetchPost(
                "/Benang/updTmpTransaksi",
                {
                    id_transaksi: listTujuan[i].IdTransaksi,
                    uraian_detail_transaksi: "tujuan_konversi",
                    jumlah_keluar_primer: listTujuan[i].JumlahPrimer,
                    jumlah_keluar_sekunder: listTujuan[i].JumlahSekunder,
                    jumlah_keluar_tritier: listTujuan[i].JumlahTritier,
                    asal_sub_kel: "",
                    tujuan_sub_kelompok: listTujuan[i].IdSubKelompok || "",
                },
                "PUT",
            );
        }

        clearAll();
        disableAll();
        toggleButtons(1);
        window.modeProses = "";
        btnIsi.focus();
        Swal.fire("Berhasil", "Data berhasil dikoreksi.", "success");
    } catch (error) {
        Swal.fire("Error", error.message || "Gagal mengkoreksi data.", "error");
    }
}

async function prosesHapusFetch(idKonvNG) {
    try {
        await fetchPost(
            `/Benang/delKonversiNG/${safeUrlParam(idKonvNG)}`,
            {},
            "DELETE",
        );
        clearAll();
        disableAll();
        toggleButtons(1);
        window.modeProses = "";
        btnIsi.focus();
        Swal.fire("Berhasil", "Data berhasil dihapus.", "success");
    } catch (error) {
        Swal.fire("Error", error.message || "Gagal menghapus data.", "error");
    }
}

function rowClickedAsal(row, data, event) {
    const idx = findClickedRowInList(listAsal, "IdType", data.IdType);
    if (pilAsal === idx) {
        row.classList.remove("keyboard-selected");
        pilAsal = -1;
        return;
    }

    pilAsal = idx;
    clearSelection_DataTable("table_asal");

    $("#table_asal tbody tr").removeClass("keyboard-selected");
    row.classList.add("keyboard-selected");
    clickedTable = "asal";

    RK_txtIdKelut.value = data.IdKelompokUtama;
    RK_txtNamaKelut.value = data.NamaKelompokUtama;
    RK_txtIdKelompok.value = data.IdKelompok;
    RK_txtNamaKelompok.value = data.NamaKelompok;
    RK_txtIdSubkel.value = data.IdSubKelompok;
    RK_txtNamaSubkel.value = data.NamaSubKelompok;
    RK_txtIdType.value = data.IdType;
    RK_txtNamaType.value = data.NamaType;

    if (window.modeProses === "koreksi") {
        txtPrimerAsal.value = data.JumlahPrimer;
        txtSekunderAsal.value = data.JumlahSekunder;
        txtTritierAsal.value = data.JumlahTritier;

        RK_setStateKoreksi("asal");
        RK_modeProses = "asal";
        saldoTypeFetch(RK_txtIdType.value, true);
    } else if (window.modeProses === "isi") {
        RK_clearTujuan();
        txtPrimerAsal.value = data.JumlahPrimer;
        txtSekunderAsal.value = data.JumlahSekunder;
        txtTritierAsal.value = data.JumlahTritier;

        RK_setState(false, true, true);
        RK_modeProses = "asal";
        saldoTypeFetch(RK_txtIdType.value, true);
    } else {
        return;
    }

    $("#form_rincian_konversi").modal("show");
}

function rowClickedTujuan(row, data, event) {
    const idx = findClickedRowInList(listTujuan, "IdType", data.IdType);
    if (pilTujuan === idx) {
        row.style.background = "white";
        pilTujuan = -1;
        return;
    }
    pilTujuan = idx;
    clearSelection_DataTable("table_tujuan");
    row.style.background = "aliceblue";
    clickedTable = "tujuan";

    if (window.modeProses === "koreksi") {
        RK_txtIdKelutTujuan.value = data.IdKelompokUtama;
        RK_txtNamaKelutTujuan.value = data.NamaKelompokUtama;
        RK_txtIdKelTujuan.value = data.IdKelompok;
        RK_txtNamaKelTujuan.value = data.NamaKelompok;
        RK_txtIdSubkelTujuan.value = data.IdSubKelompok;
        RK_txtNamaSubkelTujuan.value = data.NamaSubKelompok;
        RK_txtIdTypeTujuan.value = data.IdType;
        RK_txtNamaTypeTujuan.value = data.NamaType;

        txtPrimerTujuan.value = data.JumlahPrimer;
        txtSekunderTujuan.value = data.JumlahSekunder;
        txtTritierTujuan.value = data.JumlahTritier;

        RK_setStateKoreksi("tujuan");
        RK_modeProses = "tujuan";
        saldoTypeFetch(data.IdType, false);

        $("#form_rincian_konversi").modal("show");
    }
}

$(document).ready(function () {
    clearTable_DataTable("table_asal", colTable.length, "padding=250px");
    clearTable_DataTable("table_tujuan", colTable.length, "padding=250px");

    $("#table_asal tbody")
        .off("click keydown", "tr")
        .on("click", "tr", function (e) {
            const table = $("#table_asal").DataTable();
            const idx = table.row(this).index();
            const data = listAsal[idx];

            if (data) {
                rowClickedAsal(this, data, e);
            }
        })
        .on("keydown", "tr", function (e) {
            const rows = $("#table_asal tbody tr");
            const index = rows.index(this);

            if (e.key === "ArrowDown") {
                e.preventDefault();

                if (index < rows.length - 1) {
                    rows.removeClass("keyboard-selected");

                    rows.eq(index + 1)
                        .addClass("keyboard-selected")
                        .attr("tabindex", "0")
                        .focus();
                }
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();

                if (index > 0) {
                    rows.removeClass("keyboard-selected");

                    rows.eq(index - 1)
                        .addClass("keyboard-selected")
                        .attr("tabindex", "0")
                        .focus();
                }
            }

            if (e.key === "Enter") {
                e.preventDefault();

                const table = $("#table_asal").DataTable();
                const data = table.row(this).data();

                if (data) {
                    rowClickedAsal(this, data, e);
                }
            }
        });

    $("#table_tujuan tbody")
        .off("click", "tr")
        .on("click", "tr", function (e) {
            const table = $("#table_tujuan").DataTable();
            const idx = table.row(this).index();
            const data = listTujuan[idx];
            if (data) rowClickedTujuan(this, data, e);
        });

    dateInput.value = getCurrentDate();
    dateMohon.value = getCurrentDate();
    timeAkhir.value = "00:00";
    timeAwal.value = "00:00";

    btnIsi.focus();
    toggleButtons(1);
    disableAll();
});
//#endregion
