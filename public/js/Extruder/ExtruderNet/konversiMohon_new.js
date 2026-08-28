//#region Variabel DOM Elements
const inputIdKonversi = document.getElementById("id_konversi");
const txtKonversi = document.getElementById("txt_konversi");
const btnLookupKonversi = document.getElementById("btn_lookup_konversi");

const inputIdOrder = document.getElementById("id_order");
const txtOrder = document.getElementById("txt_order");
const btnLookupOrder = document.getElementById("btn_lookup_order");

const inputIdSpek = document.getElementById("id_spek");
const txtSpek = document.getElementById("txt_spek");
const btnLookupSpek = document.getElementById("btn_lookup_spek");

const inputIdMesin = document.getElementById("id_mesin");
const txtMesin = document.getElementById("txt_mesin");
const btnLookupMesin = document.getElementById("btn_lookup_mesin");

const inputIdKomposisi = document.getElementById("id_komposisi");
const txtKomposisi = document.getElementById("txt_komposisi");
const btnLookupKomposisi = document.getElementById("btn_lookup_komposisi");

const txtShift = document.getElementById("shift");
const txtWarna = document.getElementById("warna");
const txtIdProd = document.getElementById("id_produksi");
const txtNamaProd = document.getElementById("nama_produksi");
const txtJenis = document.getElementById("jenis");

const numLot = document.getElementById("lot");
const numUkuran = document.getElementById("ukuran");
const numDenier = document.getElementById("denier");
const numStokPrimer = document.getElementById("stok_primer");
const numPrimer = document.getElementById("primer");
const numStokSekunder = document.getElementById("stok_sekunder");
const numSekunder = document.getElementById("sekunder");
const numStokTritier = document.getElementById("stok_tritier");
const numTritier = document.getElementById("tritier");

const dateTanggal = document.getElementById("tanggal");
const timeAwal = document.getElementById("shift_awal");
const timeAkhir = document.getElementById("shift_akhir");
const timeMulai = document.getElementById("waktu_mulai");
const timeSelesai = document.getElementById("waktu_selesai");

const spnSatPrimer = document.getElementById("sat_primer");
const spnSatSekunder = document.getElementById("sat_sekunder");
const spnSatTritier = document.getElementById("sat_tritier");

const btnTambahDetail = document.getElementById("btn_baru_detail");
const btnKoreksiDetail = document.getElementById("btn_koreksi_detail");
const btnHapusDetail = document.getElementById("btn_hapus_detail");
const btnBaruMaster = document.getElementById("btn_baru_master");
const btnKoreksiMaster = document.getElementById("btn_koreksi_master");
const btnHapusMaster = document.getElementById("btn_hapus_master");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");
const hidNoUrut = document.getElementById("no_urut");

const listOfDetailInputs = document.querySelectorAll(
    ".card input:not([type='hidden'])",
);
const listOfButtonDetail = document.querySelectorAll(".card button");
const listOfMasterInputs = document.querySelectorAll("input:not(.card input)");

let tableKonversi = "";
let tableKomposisi = "";

const listKonversi = [];
/** ISI LIST KONVERSI
 * 0 Type
 * 1 IdType *hidden
 * 2 JumlahPrimer
 * 3 SatPrimer
 * 4 JumlahSekunder
 * 5 SatSekunder
 * 6 JumlahTritier
 * 7 SatTrititer
 * 8 Persentase
 * 9 StatusType *Jenis
 * 10 IdSubKelompok
 */

const listKomposisi = [];
/** ISI LIST KOMPOSISI
 * 0 StatusType *Jenis
 * 1 IdType *hidden
 * 2 NamaType
 * 3 NamaSubKelompok
 * 4 SatuanPrimer *hidden
 * 5 SatuanSekunder *hidden
 * 6 SatuanTritier *hidden
 * 7 IdSubKelompok
 */

const colKonversi = [
    { width: "250px" }, // Nama Type
    { width: "75px" }, // Qty. Primer
    { width: "75px" }, // Sat. Primer
    { width: "90px" }, // Qty. Sekunder
    { width: "90px" }, // Sat. Sekunder
    { width: "75px" }, // Qty. Tritier
    { width: "75px" }, // Sat. Tritier
    { width: "1px" }, // Presentase
    { width: "1px" }, // Jenis
    { width: "90px" }, // Sub-kelompok
    { width: "1px" }, // IdType
];

const colKomposisi = [
    { width: "1px" }, // Jenis
    { width: "200px" }, // Nama Type
    { width: "90px" }, // Sub-kelompok
    { width: "75px" }, // Id Sub-kel.
    { width: "1px" }, // IdType
];

// Constants Gedung
const namaGedung = document.getElementById("nama_gedung").value;
const idDivisi =
    namaGedung === "B" ? "MEX" : namaGedung === "D" ? "DEX" : "EXT";
const kodeDivisi = namaGedung === "B" ? "2" : namaGedung === "D" ? "3" : "1";

let modeProses = "";
let pilKomposisi = -1;
let pilKonversi = -1;
let jumlah = 0;
let suppressSelectionReset = false;
//#endregion

//#region Lookup Triggers (Events)
btnLookupKonversi.addEventListener("click", function () {
    // SP_5298_EXT_LIST_KONVERSI
    openLookupModal({
        title: "Pilih Nomor Konversi",
        url: `/Konversi/getListKonversi/${safeUrlParam(idDivisi)}`,
        headers: ["ID Konversi", "Identifikasi"],
        columns: ["IdKonversi", "Identifikasi"],
        onSelect: (row) => {
            inputIdKonversi.value = row.IdKonversi;
            txtKonversi.value = row.Identifikasi;

            listKonversi.length = 0;
            clearTable_DataTable(
                "table_konversi",
                colKonversi.length,
                "Memuat data...",
            );
            if (modeProses !== "hapus") {
                listKomposisi.length = 0;
                clearTable_DataTable(
                    "table_komposisi",
                    colKomposisi.length,
                    "Memuat data...",
                );
            }
            clearDataDetail();

            getDataKonversiFetch(row.IdKonversi, () => {
                if (modeProses === "koreksi") {
                    disableMasterInputs();
                    disableDetail();
                    $("html, body").animate(
                        { scrollTop: $("#table_konversi").offset().top - 125 },
                        100,
                    );
                    getDataKomposisiFetch(inputIdKomposisi.value);
                } else if (modeProses === "hapus") {
                    btnProses.disabled = false;
                    btnProses.focus();
                }
            });
        },
    });
});

btnLookupOrder.addEventListener("click", function () {
    // SP_5298_EXT_ORDER_ACC_BLM_SELESAI
    openLookupModal({
        title: "Pilih No. Order",
        url: `/Konversi/getOrdAccBlmSelesai/${safeUrlParam(idDivisi)}`,
        headers: ["ID Order", "Identifikasi"],
        columns: ["IDOrder", "Identifikasi"],
        onSelect: (row) => {
            console.log(row);
            inputIdOrder.value = row.IDOrder;
            txtOrder.value = row.Identifikasi;

            clearDataDetail();
            inputIdSpek.value = "";
            txtSpek.value = "";

            if (modeProses === "baru") {
                btnLookupSpek.disabled = false;
                btnLookupSpek.focus();
            }
        },
    });
});

btnLookupSpek.addEventListener("click", function () {
    if (!inputIdOrder.value) {
        Swal.fire("Peringatan", "Pilih No. Order terlebih dahulu!", "warning");
        return;
    }

    // SP_5298_EXT_LIST_SPEK_ORDER
    openLookupModal({
        title: "Pilih Spek",
        url: `/Konversi/getListSpek/${safeUrlParam(inputIdOrder.value)}`,
        headers: ["No Urut", "Type Benang"],
        columns: ["NoUrutOrder", "TypeBenang"],
        onSelect: (row) => {
            inputIdSpek.value = row.NoUrutOrder;
            txtSpek.value = row.TypeBenang;
            hidNoUrut.value = row.NoUrutOrder;

            ambilDataUkuran(row.TypeBenang);

            if (modeProses === "baru") {
                btnLookupMesin.disabled = false;
                btnLookupMesin.focus();
            }
        },
    });
});

btnLookupMesin.addEventListener("click", function () {
    // SP_5298_EXT_LIST_MESIN
    openLookupModal({
        title: "Pilih Mesin",
        url: `/Konversi/getListMesin/${safeUrlParam(kodeDivisi)}`,
        headers: ["ID Mesin", "Type Mesin"],
        columns: ["IdMesin", "TypeMesin"],
        onSelect: (row) => {
            inputIdMesin.value = row.IdMesin;
            txtMesin.value = row.TypeMesin;

            if (modeProses === "baru") {
                btnLookupKomposisi.disabled = false;
                btnLookupKomposisi.focus();
            }
        },
    });
});

btnLookupKomposisi.addEventListener("click", function () {
    if (!inputIdMesin.value) {
        Swal.fire("Peringatan", "Pilih Mesin terlebih dahulu!", "warning");
        return;
    }

    // SP_5298_EXT_LIST_KOMPOSISI
    openLookupModal({
        title: "Pilih Komposisi",
        url: `/Konversi/getListKomposisi/${safeUrlParam(kodeDivisi)}/${safeUrlParam(inputIdMesin.value)}`,
        headers: ["ID Komposisi", "Nama Komposisi"],
        columns: ["IdKomposisi", "NamaKomposisi"],
        onSelect: (row) => {
            inputIdKomposisi.value = row.IdKomposisi;
            txtKomposisi.value = row.NamaKomposisi; // ← hanya nama komposisi

            listKomposisi.length = 0;
            clearTable_DataTable("table_komposisi", colKomposisi.length);
            listKonversi.length = 0;
            clearSelection_DataTable("table_konversi");
            clearDataDetail();

            if (modeProses === "baru") {
                getDataKomposisiFetch(row.IdKomposisi, () => {
                    numLot.disabled = false;
                    numLot.focus();
                });
            }
        },
    });
});
//#endregion

//#region Input & Core Events
numLot.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (this.value === "") this.value = 0;
        numUkuran.disabled = false;
        numUkuran.focus();
    }
});

numUkuran.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        numDenier.disabled = false;
        numDenier.focus();
    }
});

numDenier.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        txtWarna.disabled = false;
        txtWarna.focus();
    }
});

txtWarna.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        dateTanggal.disabled = false;
        dateTanggal.focus();
    }
});

dateTanggal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        txtShift.disabled = false;
        txtShift.focus();
    }
});

txtShift.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (this.value === "") {
            Swal.fire(
                "Peringatan",
                "Isi Shift terlebih dahulu",
                "warning",
            ).then(() => {
                txtShift.focus();
            });
            return;
        }
        this.value = this.value.toUpperCase();
        timeAwal.classList.remove("unclickable");
        timeAwal.focus();
    }
});

timeAwal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        timeAkhir.classList.remove("unclickable");
        timeAkhir.focus();
    }
});

timeAkhir.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        timeMulai.classList.remove("unclickable");
        timeMulai.focus();
    }
});

timeMulai.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        timeSelesai.classList.remove("unclickable");
        timeSelesai.focus();
    }
});

timeSelesai.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        const rows = document.querySelectorAll("#table_komposisi tbody tr");

        if (rows.length === 0) return;

        rows.forEach((row) => row.classList.remove("keyboard-selected"));

        rows[0].classList.add("keyboard-selected");
        rows[0].focus();

        rowEventKomposisi(0, null, false);
    }
});

function debugDetailState(label = "detail state") {
    const state = {
        label,
        modeProses,
        pilKomposisi,
        pilKonversi,
        txtIdProd: txtIdProd.value,
        txtNamaProd: txtNamaProd.value,
        txtJenis: txtJenis.value,
        numPrimer: numPrimer.value,
        numSekunder: numSekunder.value,
        numTritier: numTritier.value,
        disabled: {
            primer: numPrimer.disabled,
            sekunder: numSekunder.disabled,
            tritier: numTritier.disabled,
        },
        detailFields: [...listOfDetailInputs].map((ele) => ({
            id: ele.id || ele.name || "anon",
            value: ele.value,
            disabled: ele.disabled,
            type: ele.type,
        })),
    };
    console.log("[DEBUG detail]", state);
}

numPrimer.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        if (this.value.trim() === "") this.value = "0";

        numSekunder.value =
            numSekunder.value.trim() === "" ? "0" : numSekunder.value;
        numSekunder.disabled = false;
        console.log("[DEBUG detail] numPrimer Enter", {
            primer: this.value,
            sekunderBeforeFocus: numSekunder.value,
            sekunderDisabled: numSekunder.disabled,
        });
        setTimeout(() => {
            numSekunder.focus();
            numSekunder.select();
        }, 0);
    }
});

numSekunder.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        if (this.value.trim() === "") this.value = "0";

        numTritier.value =
            numTritier.value.trim() === "" ? "0" : numTritier.value;
        numTritier.disabled = false;
        console.log("[DEBUG detail] numSekunder Enter", {
            sekunder: this.value,
            tritierBeforeFocus: numTritier.value,
            tritierDisabled: numTritier.disabled,
        });
        setTimeout(() => {
            numTritier.focus();
            numTritier.select();
        }, 0);
    }
});

numTritier.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        if (this.value.trim() === "") this.value = "0";

        if (txtJenis.value.trim() === "BB" || txtJenis.value.trim() === "BP") {
            numSekunder.value = Math.round(parseFloat(numTritier.value) / 25);
        }

        console.log("[DEBUG detail] numTritier Enter", {
            tritier: this.value,
            sekunderAfterAutoFill: numSekunder.value,
            jenis: txtJenis.value,
        });

        setTimeout(() => {
            if (modeProses === "koreksi") {
                if (pilKonversi !== -1) {
                    btnKoreksiDetail.disabled = false;
                    btnHapusDetail.disabled = false;
                    btnKoreksiDetail.focus();
                } else {
                    btnTambahDetail.disabled = false;
                    btnTambahDetail.focus();
                }
            } else {
                btnTambahDetail.disabled = false;
                btnTambahDetail.focus();
            }
        }, 0);
    }
});

btnBaruMaster.addEventListener("click", function () {
    clearDataMaster();
    clearDataDetail();
    listKonversi.length = 0;
    clearTable_DataTable("table_konversi", colKonversi.length);
    listKomposisi.length = 0;
    clearTable_DataTable("table_komposisi", colKomposisi.length);

    modeProses = "baru";
    toggleButtons(2);
    btnLookupOrder.disabled = false;
    btnLookupOrder.focus();

    window.scrollTo({ top: 0, behavior: "smooth" });
});

btnKoreksiMaster.addEventListener("click", function () {
    clearDataMaster();
    clearDataDetail();
    listKonversi.length = 0;
    clearTable_DataTable("table_konversi", colKonversi.length);
    listKomposisi.length = 0;
    clearTable_DataTable("table_komposisi", colKomposisi.length);

    modeProses = "koreksi";
    toggleButtons(2);
    btnLookupKonversi.disabled = false;
    btnLookupKonversi.focus();

    window.scrollTo({ top: 0, behavior: "smooth" });
});

btnHapusMaster.addEventListener("click", function () {
    clearDataMaster();
    clearDataDetail();
    listKonversi.length = 0;
    clearTable_DataTable("table_konversi", colKonversi.length);
    listKomposisi.length = 0;
    clearTable_DataTable("table_komposisi", colKomposisi.length);

    modeProses = "hapus";
    toggleButtons(2);
    btnLookupKonversi.disabled = false;
    btnLookupKonversi.focus();
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent === "Keluar") {
        window.location.href = "/Extruder/Extruder";
    } else {
        toggleButtons(1);
        clearDataMaster();
        clearDataDetail();
        disableDetail();
        disableMasterInputs();
        modeProses = "";
        listKomposisi.length = 0;
        clearTable_DataTable("table_komposisi", colKomposisi.length);
        listKonversi.length = 0;
        clearTable_DataTable("table_konversi", colKonversi.length);
        btnBaruMaster.focus();
    }
});

// Detail Buttons
btnTambahDetail.addEventListener("click", function () {
    this.disabled = true;
    suppressSelectionReset = true;
    debugDetailState("before save");

    console.log("[DEBUG detail] save click start", {
        suppressSelectionReset,
        pilKomposisi,
        primer: numPrimer.value,
        sekunder: numSekunder.value,
        tritier: numTritier.value,
        activeElement:
            document.activeElement?.id || document.activeElement?.tagName,
    });

    let isEmpty = false;
    listOfDetailInputs.forEach((ele) => {
        if (ele.disabled || ele.type === "hidden") return;
        if (ele.value.trim() === "") {
            console.log("[DEBUG detail] field empty before save", {
                id: ele.id || ele.name || "anon",
                value: ele.value,
                disabled: ele.disabled,
                type: ele.type,
            });
            if (!isEmpty) {
                ele.focus();
                Swal.fire(
                    "Peringatan",
                    "Masih terdapat data yang belum terisi. Mohon periksa kembali!",
                    "warning",
                );
            }
            isEmpty = true;
        }
    });

    if (!isEmpty) {
        if (
            findClickedRowInList(listKonversi, "IdType", txtIdProd.value) !== -1
        ) {
            suppressSelectionReset = false;
            Swal.fire(
                "Error",
                "Sudah ada data yang sama dalam tabel konversi.",
                "error",
            ).then(() => {
                clearSelection_DataTable("table_komposisi");
                clearDataDetail();
            });
            return;
        } else {
            listKonversi.push({
                Type: txtNamaProd.value,
                JumlahPrimer: numPrimer.value || 0,
                SatPrimer: spnSatPrimer.textContent || "Null",
                JumlahSekunder: numSekunder.value || 0,
                SatSekunder: spnSatSekunder.textContent || "Null",
                JumlahTritier: numTritier.value || 0,
                SatTritier: spnSatTritier.textContent || "Null",
                Persentase: "0",
                StatusType: listKomposisi[pilKomposisi].StatusType,
                IdSubKelompok: listKomposisi[pilKomposisi].IdSubKelompok,
                IdType: txtIdProd.value,
            });

            addTable_DataTable(
                "table_konversi",
                listKonversi,
                colKonversi,
                rowEventKonversi,
                "350px",
                "table_only",
            );
            clearDataDetail();
            disableDetail();
            clearSelection_DataTable("table_komposisi");

            Swal.fire({
                title: "Input Lagi?",
                text: "Ingin input data konversi lagi?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            }).then((result) => {
                suppressSelectionReset = false;
                if (result.isConfirmed) {
                    $(window).scrollTop($(document).height());
                    btnTambahDetail.disabled = false;

                    document
                        .querySelectorAll("#table_komposisi tbody tr")
                        .forEach((row) => {
                            row.classList.remove(
                                "selected",
                                "keyboard-selected",
                            );
                        });

                    let tableRows = document.querySelectorAll(
                        "#table_komposisi .odd, #table_komposisi .even",
                    );
                    if (tableRows[pilKomposisi]) {
                        tableRows[pilKomposisi].click();
                    }
                    document.getElementById("table_komposisi").focus();
                } else {
                    btnProses.focus();
                    this.disabled = false;
                }
            });
        }
    } else {
        suppressSelectionReset = false;
        this.disabled = false;
    }
});

btnKoreksiDetail.addEventListener("click", function () {
    if (pilKonversi === -1) {
        Swal.fire(
            "Peringatan",
            "Belum ada data konversi yang dipilih!",
            "warning",
        );
        return;
    }

    Swal.fire({
        title: "Koreksi Data",
        html: `Apakah anda yakin akan mengoreksi jumlah item untuk data konversi <b>${listKonversi[pilKonversi].Type}</b>?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, Koreksi",
    }).then((result) => {
        if (result.isConfirmed) {
            listKonversi[pilKonversi].JumlahPrimer = numPrimer.value || 0;
            listKonversi[pilKonversi].JumlahSekunder = numSekunder.value || 0;
            listKonversi[pilKonversi].JumlahTritier = numTritier.value || 0;

            disableDetail();
            addTable_DataTable(
                "table_konversi",
                listKonversi,
                colKonversi,
                rowEventKonversi,
                "350px",
                "table_only",
            );

            Swal.fire(
                "Berhasil",
                `Data konversi ${listKonversi[pilKonversi].Type} berhasil dikoreksi!`,
                "success",
            ).then(() => {
                btnProses.focus();
            });
            return;
        }
    });
});

btnHapusDetail.addEventListener("click", function () {
    if (pilKonversi === -1) {
        Swal.fire(
            "Peringatan",
            "Belum ada data konversi yang dipilih!",
            "warning",
        );
        return;
    }

    Swal.fire({
        title: "Hapus Data",
        html: `Apakah anda yakin akan menghapus data konversi <b>${listKonversi[pilKonversi].Type}</b>?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
    }).then((result) => {
        if (result.isConfirmed) {
            if (listKonversi.length > 1) {
                let namaKonversi = listKonversi[pilKonversi].Type;
                listKonversi.splice(pilKonversi, 1);
                clearDataDetail();
                disableDetail();
                addTable_DataTable(
                    "table_konversi",
                    listKonversi,
                    colKonversi,
                    rowEventKonversi,
                    "350px",
                    "table_only",
                );
                Swal.fire(
                    "Berhasil",
                    `Data konversi ${namaKonversi} berhasil dihapus!`,
                    "success",
                );
            } else {
                Swal.fire(
                    "Peringatan",
                    "Data konversi hanya tersisa satu, tidak boleh dihapus.",
                    "warning",
                );
            }
        }
    });
});

btnProses.addEventListener("click", async function () {
    try {
        this.disabled = true;
        this.innerHTML =
            '<span class="spinner-border spinner-border-sm"></span> Processing...';
        btnKeluar.disabled = true;
        if (modeProses === "baru") {
            if (listKomposisi.length < 1) {
                Swal.fire(
                    "Peringatan",
                    "Data tidak dapat diproses karena tidak ada data komposisi.",
                    "warning",
                );
                return;
            }
            await prosesIsiFetch();
        } else if (modeProses === "koreksi") {
            if (!inputIdKonversi.value) {
                Swal.fire(
                    "Peringatan",
                    "Pilih terlebih dahulu data konversi yang akan dikoreksi.",
                    "warning",
                );
                return;
            }
            let confirm = await Swal.fire({
                title: "Koreksi",
                text: "Apakah anda yakin akan mengoreksi data ini?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ya, Koreksi",
            });
            if (confirm.isConfirmed) {
                await prosesKoreksiFetch(inputIdKonversi.value);
            }
        } else if (modeProses === "hapus") {
            if (!inputIdKonversi.value) {
                Swal.fire(
                    "Peringatan",
                    "Pilih terlebih dahulu data konversi yang akan dihapus.",
                    "warning",
                );
                return;
            }
            let confirm = await Swal.fire({
                title: "Hapus",
                text: "Apakah anda yakin akan menghapus data ini?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, Hapus",
            });
            if (confirm.isConfirmed) {
                await prosesHapusFetch(inputIdKonversi.value);
            }
        }
    } catch (error) {
        Swal.fire("Error System", error.message || error, "error");
    } finally {
        this.disabled = false;
        this.innerText = "Proses";
        btnKeluar.disabled = false;
    }
});
//#endregion

//#region Utility & Helper Functions
function getKomposisiRows() {
    return [...document.querySelectorAll("#table_komposisi tbody tr")].filter(
        (row) =>
            !row.textContent.includes("Tabel masih kosong") &&
            !row.textContent.includes("Memuat data"),
    );
}

function setKomposisiSelection(index, shouldFocus = true) {
    const rows = getKomposisiRows();
    if (!rows.length || index < 0 || index >= rows.length) return null;

    rows.forEach((row) => {
        row.classList.remove("keyboard-selected", "selected", "table-primary");
    });

    const targetRow = rows[index];
    targetRow.classList.add("keyboard-selected", "selected", "table-primary");

    if (shouldFocus) {
        targetRow.focus();
        targetRow.scrollIntoView({ block: "nearest", inline: "nearest" });
    }

    return targetRow;
}

document
    .getElementById("table_komposisi")
    .addEventListener("keydown", function (event) {
        const rows = getKomposisiRows();
        if (!rows.length) return;

        const activeRow = event.target.closest("tr");
        const currentIndex = activeRow
            ? rows.indexOf(activeRow)
            : rows.findIndex(
                  (row) =>
                      row.classList.contains("keyboard-selected") ||
                      row.classList.contains("selected") ||
                      row.classList.contains("table-primary"),
              );

        const startIndex = currentIndex >= 0 ? currentIndex : 0;
        let nextIndex = startIndex;

        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                nextIndex = Math.min(startIndex + 1, rows.length - 1);
                break;

            case "ArrowUp":
                event.preventDefault();
                nextIndex = Math.max(startIndex - 1, 0);
                break;

            case "PageDown":
                event.preventDefault();
                nextIndex = Math.min(startIndex + 5, rows.length - 1);
                break;

            case "PageUp":
                event.preventDefault();
                nextIndex = Math.max(startIndex - 5, 0);
                break;

            case "Home":
                event.preventDefault();
                nextIndex = 0;
                break;

            case "End":
                event.preventDefault();
                nextIndex = rows.length - 1;
                break;

            case "Enter":
                event.preventDefault();
                event.stopPropagation();
                rowEventKomposisi(startIndex, null, true);
                return;

            default:
                return;
        }

        if (nextIndex !== startIndex) {
            setKomposisiSelection(nextIndex, true);
            rowEventKomposisi(nextIndex, null, false);
        }
    });

function clearDataDetail() {
    listOfDetailInputs.forEach((ele) => {
        ele.value = "";
    });
    spnSatPrimer.textContent = "";
    spnSatSekunder.textContent = "";
    spnSatTritier.textContent = "";
}

function clearDataMaster() {
    inputIdKonversi.value = "";
    txtKonversi.value = "";
    inputIdOrder.value = "";
    txtOrder.value = "";
    inputIdSpek.value = "";
    txtSpek.value = "";
    inputIdMesin.value = "";
    txtMesin.value = "";
    inputIdKomposisi.value = "";
    txtKomposisi.value = "";
    numLot.value = "";
    numUkuran.value = "";
    numDenier.value = "";
    txtWarna.value = "";
    dateTanggal.value = getCurrentDate();
    txtShift.value = "";
    timeAwal.value = "00:00";
    timeAkhir.value = "00:00";
    timeMulai.value = "00:00";
    timeSelesai.value = "00:00";
    hidNoUrut.value = "";
}

function disableDetail() {
    listOfDetailInputs.forEach((ele) => (ele.disabled = true));
    listOfButtonDetail.forEach((btn) => (btn.disabled = true));
}

function disableMasterInputs() {
    btnLookupOrder.disabled = true;
    btnLookupSpek.disabled = true;
    btnLookupMesin.disabled = true;
    btnLookupKomposisi.disabled = true;

    const isKoreksi = modeProses === "koreksi";

    numLot.disabled = !isKoreksi;
    numUkuran.disabled = !isKoreksi;
    numDenier.disabled = !isKoreksi;
    txtWarna.disabled = !isKoreksi;
    dateTanggal.disabled = !isKoreksi;
    txtShift.disabled = !isKoreksi;

    if (!isKoreksi) {
        timeAwal.classList.add("unclickable");
        timeAkhir.classList.add("unclickable");
        timeMulai.classList.add("unclickable");
        timeSelesai.classList.add("unclickable");
    } else {
        timeAwal.classList.remove("unclickable");
        timeAkhir.classList.remove("unclickable");
        timeMulai.classList.remove("unclickable");
        timeSelesai.classList.remove("unclickable");
    }
}

function toggleButtons(tmb) {
    if (tmb === 1) {
        btnLookupKonversi.disabled = true;
        btnBaruMaster.disabled = false;
        btnKoreksiMaster.disabled = false;
        btnHapusMaster.disabled = false;
        btnProses.disabled = true;
        btnKeluar.textContent = "Keluar";
    } else if (tmb === 2) {
        btnBaruMaster.disabled = true;
        btnKoreksiMaster.disabled = true;
        btnHapusMaster.disabled = true;
        btnProses.disabled = false;
        btnKeluar.textContent = "Batal";
    }
}

function ambilDataUkuran(nama_spek) {
    try {
        let parts = nama_spek.split("-", 5);
        if (parts.length >= 2) {
            numUkuran.value = parseFloat(parts[1]) / 100;
        }
        if (parts.length >= 3) {
            let letter = parts[2].substring(0, 1);
            let denierMap = {
                A: 1000,
                B: 1100,
                C: 1200,
                D: 1300,
                E: 1400,
                F: 1500,
                G: 1600,
                H: 1700,
                I: 1800,
                J: 1900,
                K: 2000,
                L: 2100,
                M: 2200,
                N: 2300,
            };
            if (denierMap[letter]) {
                numDenier.value = denierMap[letter];
            } else if (!isNaN(parts[2])) {
                numDenier.value = parseFloat(parts[2]) * 10;
            } else {
                Swal.fire("Peringatan", "Denier tidak valid.", "warning");
            }
        }
        if (parts.length >= 4) {
            txtWarna.value = parts[3];
        }
    } catch (error) {
        console.error("Error ambilDataUkuran:", error);
        Swal.fire("Error", "Gagal menentukan ukuran.", "error");
    }
}

function persentaseFun(qty_tritier, total_bahan) {
    if (total_bahan === 0) return 0;
    return Math.round((qty_tritier / total_bahan) * 100 * 100) / 100;
}

function hitungTotalBahan() {
    let qty = 0;
    for (let i = 0; i < listKonversi.length; i++) {
        if (
            listKonversi[i].StatusType.trim() === "BB" ||
            listKonversi[i].StatusType.trim() === "BP"
        ) {
            qty += parseFloat(listKonversi[i].JumlahTritier) || 0;
        }
    }
    return qty;
}

async function getDataKomposisiFetch(no_komposisi, post_action = null) {
    try {
        listKomposisi.length = 0;
        clearTable_DataTable(
            "table_komposisi",
            colKomposisi.length,
            "Memuat data...",
        );

        // SP_5298_EXT_LIST_KOMPOSISI_BAHAN
        const data = await fetchSelectAsync(
            `/Konversi/getListKomposisiBahan/${safeUrlParam(no_komposisi.trim())}`,
            (data) => {
                if (data.length < 1) {
                    clearTable_DataTable(
                        "table_komposisi",
                        colKomposisi.length,
                        `Data komposisi untuk ${no_komposisi} tidak ditemukan.`,
                    );
                } else {
                    let tableList = [];
                    for (let i = 0; i < data.length; i++) {
                        let sat_primer = data[i].SatuanPrimer || "NULL";
                        let sat_sekunder = data[i].SatuanSekunder || "NULL";
                        let sat_tritier = data[i].SatuanTritier || "NULL";

                        listKomposisi.push({
                            StatusType: data[i].StatusType,
                            IdType: data[i].IdType,
                            NamaType: data[i].NamaType,
                            NamaSubKelompok: data[i].NamaSubKelompok,
                            SatuanPrimer: sat_primer,
                            SatuanSekunder: sat_sekunder,
                            SatuanTritier: sat_tritier,
                            IdSubKelompok: data[i].IdSubKelompok,
                        });

                        tableList.push({
                            StatusType: data[i].StatusType,
                            NamaType: data[i].NamaType,
                            NamaSubKelompok: data[i].NamaSubKelompok,
                            IdSubKelompok: data[i].IdSubKelompok,
                            IdType: data[i].IdType,
                        });
                    }
                    addTable_DataTable(
                        "table_komposisi",
                        tableList,
                        colKomposisi,
                        rowEventKomposisi,
                        "300px",
                        "table_only",
                    );
                    document
                        .querySelectorAll("#table_komposisi tbody tr")
                        .forEach((row) => row.setAttribute("tabindex", "0"));
                }
                if (post_action) post_action();
            },
        );
    } catch (error) {
        console.error("getDataKomposisiFetch error:", error);
        Swal.fire("Error", "Gagal memuat data komposisi.", "error");
        clearTable_DataTable(
            "table_komposisi",
            colKomposisi.length,
            "Terjadi kesalahan.",
        );
    }
}

async function getSatuanFetch(id_type, index, post_action = null) {
    // SP_5298_EXT_GET_SATUAN
    try {
        const data = await fetchSelectAsync(
            `/Konversi/getSatuan/${safeUrlParam(id_type)}`,
            (data) => {
                listKonversi[index].SatPrimer = data[0].SatPrimer || "NULL";
                listKonversi[index].SatSekunder = data[0].SatSekunder || "NULL";
                listKonversi[index].SatTritier = data[0].SatTritier || "NULL";

                if (index === listKonversi.length - 1) {
                    addTable_DataTable(
                        "table_konversi",
                        listKonversi,
                        colKonversi,
                        rowEventKonversi,
                        "350px",
                        "table_only",
                    );
                    if (post_action) post_action();
                }
            },
        );
    } catch (error) {
        console.error("getSatuanFetch error:", error);
        Swal.fire("Error", "Gagal memuat data satuan.", "error");
    }
}

function getDataKonversiFetch(id_konversi, post_action = null) {
    listKonversi.length = 0;
    clearTable_DataTable(
        "table_konversi",
        colKonversi.length,
        "Memuat data...",
    );

    // SP_5298_EXT_DATA_KONVERSI
    fetchSelectAsync(
        `/Konversi/getDataKonversi/${safeUrlParam(id_konversi.trim())}`,
    )
        .then((data) => {
            let row = data[0];
            dateTanggal.value = dateTimeToDate(row.Tanggal);
            txtShift.value = row.Shift.trim();
            timeAwal.value = dateTimetoTime(row.AwalShift);
            timeAkhir.value = dateTimetoTime(row.AkhirShift);
            numUkuran.value = row.Ukuran;
            numDenier.value = row.Denier;
            timeMulai.value = dateTimetoTime(row.JamMulai);
            timeSelesai.value = dateTimetoTime(row.JamSelesai);
            txtWarna.value = row.Warna.trim();
            numLot.value = row.LotNumber.trim();
            hidNoUrut.value = row.NoUrutOrderEXT || "";

            inputIdMesin.value = row.IdMesin;
            txtMesin.value = row.TypeMesin;
            inputIdOrder.value = row.IdOrder;
            txtOrder.value = row.Identifikasi;
            inputIdKomposisi.value = row.IdKomposisi;
            txtKomposisi.value = row.NamaKomposisi;
            inputIdSpek.value = row.TypeBenang;
            txtSpek.value = row.TypeBenang;

            // SP_5298_EXT_LIST_DETAIL_KONVERSI_1
            fetchSelectAsync(
                `/Konversi/getListDetailKonversi/${safeUrlParam(id_konversi.trim())}`,
                (detailData) => {
                    if (detailData.length < 1) {
                        clearTable_DataTable(
                            "table_konversi",
                            colKonversi.length,
                            `Data konversi untuk ${id_konversi} tidak ditemukan.`,
                        );
                        if (post_action) post_action();
                    } else {
                        for (let i = 0; i < detailData.length; i++) {
                            listKonversi.push({
                                Type: detailData[i].Type,
                                JumlahPrimer: detailData[i].JumlahPrimer,
                                SatPrimer: "",
                                JumlahSekunder: detailData[i].JumlahSekunder,
                                SatSekunder: "",
                                JumlahTritier: detailData[i].JumlahTritier,
                                SatTritier: "",
                                Persentase: detailData[i].Persentase,
                                StatusType: detailData[i].StatusType,
                                IdSubKelompok: detailData[i].IdSubKelompok,
                                IdType: detailData[i].IdType,
                            });
                        }
                        for (let i = 0; i < listKonversi.length; i++) {
                            getSatuanFetch(
                                listKonversi[i].IdType.trim(),
                                i,
                                post_action,
                            );
                        }
                    }
                },
            );
        })
        .catch((error) => {
            console.error(error);
            Swal.fire("Error", "Gagal memuat data konversi.", "error");
        });
}

async function getSaldoFetch(id_type, post_action = null) {
    // SP_5298_EXT_SALDO_BARANG
    try {
        const data = await fetchSelectAsync(
            `/Konversi/getSaldoBarang/${safeUrlParam(id_type.trim())}`,
            (data) => {
                numStokPrimer.value = data[0].SaldoPrimer || 0;
                numStokSekunder.value = data[0].SaldoSekunder || 0;
                numStokTritier.value = data[0].SaldoTritier || 0;
                if (post_action) post_action();
            },
        );
    } catch (error) {
        Swal.fire("Error", "Gagal meuat saldo barang.", "error");
    }
}

async function loadSaldoFetch(id_type) {
    // SP_1003_INV_Saldo_Barang
    try {
        const dta = await fetchSelectAsync(
            `/Konversi/getSaldoInv/${safeUrlParam(id_type.trim())}`,
            (data) => {
                numStokPrimer.value = data[0].SaldoPrimer || 0;
                numStokSekunder.value = data[0].SaldoSekunder || 0;
                numStokTritier.value = data[0].SaldoTritier || 0;
            },
        );
    } catch (error) {
        Swal.fire("Error", "Gagal memuat saldo.", "error");
    }
}

async function prosesIsiFetch() {
    let isEmpty = false;

    const ignoredIds = [
        "no_urut",
        "id_konversi",
        "txt_konversi",
        "lookupSearch",
    ];

    listOfMasterInputs.forEach((ele) => {
        if (
            ele.value.trim() === "" &&
            ele.type !== "hidden" &&
            !ignoredIds.includes(ele.id)
        ) {
            if (!isEmpty) {
                Swal.fire(
                    "Peringatan",
                    `Terdapat data yang masih belum terisi (${ele.id || "Tanpa ID"}). Mohon periksa kembali!`,
                    "warning",
                );
                ele.focus();
            }
            isEmpty = true;
        }
    });

    if (isEmpty) return;

    let noUrut = hidNoUrut.value.trim() === "" ? 0 : parseInt(hidNoUrut.value);

    // SP_5298_EXT_INSERT_MASTER_KONVERSI / SP_1273_MEX_INSERT_MASTER_KONVERSI
    await fetchPost("/Konversi/insMasterKonversi", {
        tgl: dateTanggal.value,
        shift: txtShift.value,
        awal: timeAwal.value,
        akhir: timeAkhir.value,
        mesin: inputIdMesin.value,
        ukuran: numUkuran.value,
        denier: numDenier.value,
        warna: txtWarna.value,
        lot_number: numLot.value,
        id_order: inputIdOrder.value,
        no_urut: noUrut,
        id_komp: inputIdKomposisi.value,
        jam1: timeMulai.value,
        jam2: timeSelesai.value,
        divisi: idDivisi,
    });

    let dataKonv = await fetchSelectAsync(
        `/Konversi/getMasterKonversi/${safeUrlParam(idDivisi)}`,
    );
    let noKonversi = dataKonv.NoKonversi;
    inputIdKonversi.value = noKonversi;
    txtKonversi.value = noKonversi + " | " + txtKonversi.value;

    await fetchPost("/Konversi/updListCounter", {}, "PUT");

    let counterData = await fetchSelectAsync("/Konversi/getListCounter");
    let id_konv_inv = counterData.NoKonversi.padStart(9, "0");

    await insertDetailLogic(id_konv_inv);

    toggleButtons(1);
    disableDetail();
    disableMasterInputs();
    modeProses = "";
    btnTambahDetail.disabled = true;
    btnLookupKonversi.disabled = true;

    Swal.fire("Berhasil", "Data berhasil tersimpan!", "success");
}

async function insertDetailLogic(id_konv_inv) {
    let totalBahan = hitungTotalBahan();

    for (let i = 0; i < listKonversi.length; i++) {
        let persentase = 0;
        if (
            listKonversi[i].StatusType === "BB" ||
            listKonversi[i].StatusType === "BP" ||
            listKonversi[i].StatusType === "AF"
        ) {
            let tritier = parseFloat(listKonversi[i].JumlahTritier) || 0;
            persentase = persentaseFun(tritier, totalBahan);
        }

        // Insert Detail Konversi - SP_5409_EXT_INSERT_DETAILKONVERSI
        await fetchPost("/Konversi/insDetailKonversi", {
            id_konversi: inputIdKonversi.value,
            id_type: listKonversi[i].IdType.trim(),
            jumlah_primer: listKonversi[i].JumlahPrimer,
            jumlah_sekunder: listKonversi[i].JumlahSekunder,
            jumlah_tritier: listKonversi[i].JumlahTritier,
            presentase: persentase,
            id_konversi_inv: id_konv_inv,
        });

        // Insert Tmp Transaksi
        let uraian = "";
        if (
            listKonversi[i].StatusType.trim() === "BB" ||
            listKonversi[i].StatusType.trim() === "BP"
        ) {
            uraian = "asal_konversi";
        } else if (
            listKonversi[i].StatusType.trim() === "HP" ||
            listKonversi[i].StatusType.trim() === "AF"
        ) {
            uraian = "tujuan_konversi";
        } else {
            throw new Error("Jenis tidak valid: " + listKonversi[i].StatusType);
        }

        // SP_5298_EXT_INSERT_04_ASALTMPTRANSAKSI / SP_5298_EXT_INSERT_04_TUJUANTMPTRANSAKSI
        await fetchPost("/Konversi/insTmpTransaksi", {
            id_type_transaksi: "04",
            uraian_detail_transaksi: uraian,
            id_type: listKonversi[i].IdType.trim(),
            saat_awal_transaksi: dateTanggal.value,
            jumlah_keluar_primer: listKonversi[i].JumlahPrimer,
            jumlah_keluar_sekunder: listKonversi[i].JumlahSekunder,
            jumlah_keluar_tritier: listKonversi[i].JumlahTritier,
            asal_sub_kel: listKonversi[i].IdSubKelompok.trim(),
            id_konversi: id_konv_inv,
        });
    }
}

async function prosesKoreksiFetch(id_konversi_ext) {
    let dataInv = await fetchSelectAsync(
        `/Konversi/getIdKonversiInv/${safeUrlParam(id_konversi_ext)}`,
    );
    let id_konv_inv = dataInv[0].IdKonversi_Inv;

    // SP_5409_EXT_DELETE_DETAIL_KONVERSI
    await fetchPost(
        "/Konversi/delDetailKonversi",
        {
            id_konversi: id_konversi_ext,
            id_konv_inv: id_konv_inv,
        },
        "DELETE",
    );

    await insertDetailLogic(id_konv_inv);

    // SP_5409_EXT_UPDATE_MASTER_KONVERSI
    await fetchPost(
        "/Konversi/updMasterKonversi",
        {
            tgl: dateTanggal.value,
            shift: txtShift.value,
            awal: timeAwal.value,
            akhir: timeAkhir.value,
            ukuran: numUkuran.value,
            // denier: (numUkier = numDenier.value), // (or standard value)
            denier: numDenier.value,
            warna: txtWarna.value,
            lot_number: numLot.value.trim(),
            jam1: timeMulai.value,
            jam2: timeSelesai.value,
            id_konv: id_konversi_ext,
        },
        "PUT",
    );

    toggleButtons(1);
    disableDetail();
    modeProses = "";
    btnLookupKonversi.disabled = true;

    Swal.fire("Berhasil", "Data berhasil dikoreksi!", "success");
}

async function prosesHapusFetch(id_konversi_ext) {
    // SP_5409_EXT_DELETE_KONVERSI
    await fetchPost(
        `/Konversi/delKonversi/${safeUrlParam(id_konversi_ext)}`,
        {},
        "DELETE",
    );

    toggleButtons(1);
    disableDetail();
    clearDataMaster();
    clearDataDetail();
    modeProses = "";
    btnLookupKonversi.disabled = true;

    listKonversi.length = 0;
    clearTable_DataTable("table_konversi", colKonversi.length);
    listKomposisi.length = 0;
    clearTable_DataTable("table_komposisi", colKomposisi.length);

    Swal.fire("Berhasil", "Data berhasil dihapus!", "success");
}

function rowEventKomposisi(index, _, focus = false) {
    if (index < 0 || !listKomposisi[index]) {
        console.log("[DEBUG detail] rowEventKomposisi skipped invalid row", {
            index,
            suppressSelectionReset,
            modeProses,
        });
        return;
    }

    const rows = document.querySelectorAll("#table_komposisi tbody tr");
    rows.forEach((row, i) => {
        if (i === index) {
            row.classList.add("selected");
        } else {
            row.classList.remove(
                "selected",
                "keyboard-selected",
                "table-primary",
            );
        }
    });

    pilKomposisi = index;
    let data = listKomposisi[index];

    const hasCurrentDetailInput = [numPrimer, numSekunder, numTritier].some(
        (input) => {
            const value = (input.value || "").trim();
            return value !== "" && parseFloat(value) !== 0;
        },
    );

    txtIdProd.value = data.IdType;
    txtNamaProd.value = data.NamaType;
    spnSatPrimer.textContent = data.SatuanPrimer || "NULL";
    spnSatSekunder.textContent = data.SatuanSekunder || "NULL";
    spnSatTritier.textContent = data.SatuanTritier || "NULL";
    txtJenis.value = data.StatusType;

    if (!hasCurrentDetailInput && !suppressSelectionReset) {
        numPrimer.value = "0";
        numSekunder.value = "0";
        numTritier.value = "0";
    }

    console.log("[DEBUG detail] rowEventKomposisi", {
        index,
        statusType: data.StatusType,
        idType: data.IdType,
        selectedName: data.NamaType,
        primerValue: numPrimer.value,
        sekunderValue: numSekunder.value,
        tritierValue: numTritier.value,
        modeProses,
        suppressSelectionReset,
        focus,
        hasCurrentDetailInput,
    });

    getSaldoFetch(data.IdType, () => {
        if (
            data.StatusType.trim() === "BB" ||
            data.StatusType.trim() === "BP"
        ) {
            let stokTritier = parseFloat(numStokTritier.value) || 0;
            if (stokTritier <= 0) {
                if (focus && !suppressSelectionReset) {
                    Swal.fire(
                        "Peringatan",
                        `${data.NamaType} tidak dapat digunakan karena stok telah habis.`,
                        "warning",
                    );
                    clearSelection_DataTable("table_komposisi");
                    clearDataDetail();
                }
                return;
            }
        }

        if (modeProses !== "") {
            numPrimer.disabled = false;
            numSekunder.disabled = true;
            numTritier.disabled = true;
            btnTambahDetail.disabled = true;
            btnKoreksiDetail.disabled = true;
            btnHapusDetail.disabled = true;

            if (focus && !suppressSelectionReset && !hasCurrentDetailInput) {
                setTimeout(() => {
                    numPrimer.focus();
                    numPrimer.select();
                }, 0);
            }
        }
    });
}

function rowEventKonversi(index, _, focus = false) {
    pilKonversi = index;
    let data = listKonversi[index];

    txtIdProd.value = data.IdType;
    txtNamaProd.value = data.Type;
    numPrimer.value = data.JumlahPrimer;
    spnSatPrimer.textContent = data.SatPrimer;
    numSekunder.value = data.JumlahSekunder;
    spnSatSekunder.textContent = data.SatSekunder;
    numTritier.value = data.JumlahTritier;
    spnSatTritier.textContent = data.SatTritier;
    txtJenis.value = data.StatusType;

    loadSaldoFetch(data.IdType);

    if (modeProses !== "" && modeProses !== "hapus") {
        numPrimer.disabled = false;
        numSekunder.disabled = false;
        numTritier.disabled = false;
        btnTambahDetail.disabled = true;
        btnKoreksiDetail.disabled = false;
        btnHapusDetail.disabled = false;

        if (focus) {
            numPrimer.focus();
            numPrimer.select();
            $(window).scrollTop($(document).height());
        }
    }
}
//#endregion

//#region Initialization
function init() {
    tableKonversi = $("#table_konversi").DataTable({
        responsive: false,
        paging: false,
        scrollY: "350px",
        scrollX: true,
        columns: colKonversi,
        searching: false,
        info: false,
    });

    tableKomposisi = $("#table_komposisi").DataTable({
        responsive: false,
        paging: false,
        scrollY: "300px",
        scrollX: true,
        columns: colKomposisi,
        searching: false,
        info: false,
    });

    clearTable_DataTable("table_konversi", colKonversi.length, "padding=25vw");
    clearTable_DataTable("table_komposisi", colKomposisi.length);

    toggleButtons(1);
    disableDetail();
    disableMasterInputs();
    btnBaruMaster.focus();
    dateTanggal.value = getCurrentDate();
}

$(document).ready(() => init());
//#endregion
