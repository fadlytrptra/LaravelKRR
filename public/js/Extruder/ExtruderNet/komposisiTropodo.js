//#region Variabel DOM Elements
const inputIdKomposisi = document.getElementById("id_komposisi");
const txtNamaKomposisi = document.getElementById("nama_komposisi");
const btnLookupKomposisi = document.getElementById("btn_lookup_komposisi");

const inputIdMesin = document.getElementById("id_mesin");
const txtNamaMesin = document.getElementById("nama_mesin");
const btnLookupMesin = document.getElementById("btn_lookup_mesin");

const inputIdObjek = document.getElementById("id_objek");
const txtNamaObjek = document.getElementById("nama_objek");
const btnLookupObjek = document.getElementById("btn_lookup_objek");

const inputIdKelut = document.getElementById("id_kelut");
const txtNamaKelut = document.getElementById("nama_kelut");
const btnLookupKelut = document.getElementById("btn_lookup_kelut");

const inputIdKelompok = document.getElementById("id_kelompok");
const txtNamaKelompok = document.getElementById("nama_kelompok");
const btnLookupKelompok = document.getElementById("btn_lookup_kelompok");

const inputIdSubkel = document.getElementById("id_subkel");
const txtNamaSubkel = document.getElementById("nama_subkel");
const btnLookupSubkel = document.getElementById("btn_lookup_subkel");

const inputIdType = document.getElementById("id_type");
const txtNamaType = document.getElementById("nama_type");
const btnLookupType = document.getElementById("btn_lookup_type");

const numPrimer = document.getElementById("primer");
const numSekunder = document.getElementById("sekunder");
const numTritier = document.getElementById("tritier");
const numPersentase = document.getElementById("persentase");

const txtSatPrimer = document.getElementById("sat_primer");
const txtSatSekunder = document.getElementById("sat_sekunder");
const txtSatTritier = document.getElementById("sat_tritier");

const btnTambahDetail = document.getElementById("btn_tambah_detail");
const btnKoreksiDetail = document.getElementById("btn_koreksi_detail");
const btnHapusDetail = document.getElementById("btn_hapus_detail");

const btnBaruMaster = document.getElementById("btn_baru_master");
const btnKoreksiMaster = document.getElementById("btn_koreksi_master");
const btnHapusMaster = document.getElementById("btn_hapus_master");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const listOfDetailInputs = document.querySelectorAll(".card input");
const listOfButtonDetail = document.querySelectorAll(".card button");

let tableKomposisi = "";
const colKomposisi = [
    { width: "1px" }, // Jenis
    { width: "50px" }, // Id Type
    { width: "200px" }, // Nama Type
    { width: "75px" }, // Qty. Primer
    { width: "75px" }, // Sat. Primer
    { width: "90px" }, // Qty. Sekunder
    { width: "90px" }, // Sat. Sekunder
    { width: "75px" }, // Qty. Tritier
    { width: "75px" }, // Sat. Tritier
    { width: "1px" }, // Persentase
    { width: "50px" }, // Id Objek
    { width: "100px" }, // Nama Objek
    { width: "50px" }, // Id KelUt.
    { width: "70px" }, // Nama KelUt.
    { width: "75px" }, // Id Kelompok
    { width: "50px" }, // Kelompok
    { width: "70px" }, // Id SubKel.
    { width: "50px" }, // SubKel.
];

let modeProses = "";
let pilKomposisi = -1;
let listKomposisi = [];
//#endregion

//#region Lookup Triggers (Events)
btnLookupKomposisi.addEventListener("click", function () {
    // SP_5298_EXT_LIST_KOMPOSISI_1
    openLookupModal({
        title: "Pilih Komposisi",
        url: "/Master/getListKomposisi/EXT",
        headers: ["ID Komposisi", "Nama Komposisi"],
        columns: ["IdKomposisi", "NamaKomposisi"],
        onSelect: (row) => {
            inputIdKomposisi.value = row.IdKomposisi;
            txtNamaKomposisi.value = row.NamaKomposisi;

            clearDataDetail();

            fetchSelectAsync(
                `/Master/getListKomposisi/EXT/${safeUrlParam(row.IdKomposisi)}`,
                (data) => {
                    if (data.length > 0) {
                        inputIdMesin.value = data[0].IdMesin;
                        txtNamaMesin.value = data[0].IdMesin;
                    }

                    getDataKomposisiFetch(row.IdKomposisi, () => {
                        if (modeProses == "koreksi") {
                            btnLookupObjek.disabled = false;
                            btnLookupObjek.focus();
                        } else if (modeProses == "hapus") {
                            btnProses.focus();
                        } else if (modeProses == "hapus_detail") {
                            btnHapusDetail.disabled = false;
                        }
                    });
                },
            );
        },
    });
});

btnLookupMesin.addEventListener("click", function () {
    // SP_5298_EXT_LIST_MESIN
    openLookupModal({
        title: "Pilih Mesin",
        url: "/Master/getListMesin/1",
        headers: ["ID Mesin", "Nama Mesin"],
        columns: ["IdMesin", "TypeMesin"],
        onSelect: (row) => {
            inputIdMesin.value = row.IdMesin;
            txtNamaMesin.value = row.TypeMesin;

            if (modeProses == "baru") {
                listKomposisi.length = 0;
                clearTable_DataTable(
                    "table_komposisi",
                    colKomposisi.length,
                    "padding=250px",
                );
                btnLookupObjek.disabled = false;
                btnLookupObjek.focus();
                $(window).scrollTop($(document).height());
            }
        },
    });
});

btnLookupObjek.addEventListener("click", function () {
    // SP_5298_EXT_IDDIVISI_OBJEK
    openLookupModal({
        title: "Pilih Objek",
        url: "/Master/getIdDivisiObjek/EXT",
        headers: ["ID Objek", "Nama Objek"],
        columns: ["IdObjek", "NamaObjek"],
        onSelect: (row) => {
            inputIdObjek.value = row.IdObjek;
            txtNamaObjek.value = row.NamaObjek;

            clearInputGroup(inputIdKelut, txtNamaKelut);
            clearInputGroup(inputIdKelompok, txtNamaKelompok);
            clearInputGroup(inputIdSubkel, txtNamaSubkel);
            clearInputGroup(inputIdType, txtNamaType);

            btnLookupKelut.disabled = false;
            btnLookupKelut.focus();
        },
    });
});

btnLookupKelut.addEventListener("click", function () {
    if (!inputIdObjek.value) {
        return Swal.fire(
            "Peringatan",
            "Pilih Objek terlebih dahulu!",
            "warning",
        );
    }

    // SP_5298_EXT_IDOBJEK_KELOMPOKUTAMA
    openLookupModal({
        title: "Pilih Kelompok Utama",
        url: `/Master/getIdObjekKelompokUtama/${safeUrlParam(inputIdObjek.value)}`,
        headers: ["ID Kelompok Utama", "Nama Kelompok Utama"],
        columns: ["IdKelompokUtama", "NamaKelompokUtama"],
        onSelect: (row) => {
            inputIdKelut.value = row.IdKelompokUtama;
            txtNamaKelut.value = row.NamaKelompokUtama;

            clearInputGroup(inputIdKelompok, txtNamaKelompok);
            clearInputGroup(inputIdSubkel, txtNamaSubkel);
            clearInputGroup(inputIdType, txtNamaType);

            if (row.IdKelompokUtama == "0117") {
                Swal.fire({
                    title: "Konfirmasi",
                    html: "Anda akan memasukkan data bahan pembantu.<br>Apakah Anda sudah memasukkan <b>SEMUA BAHAN BAKU</b>??",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Ya, Lanjut",
                    cancelButtonText: "Belum",
                }).then((result) => {
                    if (result.isConfirmed) {
                        btnLookupKelompok.disabled = false;
                        btnLookupKelompok.focus();
                    } else {
                        btnLookupKelut.focus();
                    }
                });
            } else {
                btnLookupKelompok.disabled = false;
                btnLookupKelompok.focus();
            }
        },
    });
});

btnLookupKelompok.addEventListener("click", function () {
    if (!inputIdKelut.value) {
        return Swal.fire(
            "Peringatan",
            "Pilih Kelompok Utama terlebih dahulu!",
            "warning",
        );
    }

    // SP_5298_EXT_IDKELOMPOKUTAMA_KELOMPOK
    openLookupModal({
        title: "Pilih Kelompok",
        url: `/Master/getIdKelompokUtamaKelompok/${safeUrlParam(inputIdKelut.value)}`,
        headers: ["ID Kelompok", "Nama Kelompok"],
        columns: ["idkelompok", "namakelompok"],
        onSelect: (row) => {
            const idKelompok = row?.idkelompok
                ? String(row.idkelompok).trim()
                : "";
            inputIdKelompok.value = row.idkelompok;

            let namaClean = row.namakelompok;
            if (namaClean.includes("|"))
                namaClean = namaClean.split("|")[1].trim();
            else if (namaClean.includes("-"))
                namaClean = namaClean.split("-")[1].trim();
            txtNamaKelompok.value = namaClean;

            clearInputGroup(inputIdSubkel, txtNamaSubkel);
            clearInputGroup(inputIdType, txtNamaType);

            if (["0057", "0121", "0009"].includes(inputIdKelut.value)) {
                btnLookupSubkel.disabled = true;

                // SP_5298_EXT_CEK_KELOMPOK_MESIN
                fetchSelectAsync(
                    `/Master/getCekKelompokMesin/${safeUrlParam(idKelompok)}`,
                ).then((data) => {
                    // Test get mesin
                    // console.log("=== CEK KELOMPOK MESIN ===");
                    // console.log("Id Kelompok :", JSON.stringify(idKelompok));
                    // console.log(
                    //     "Id Mesin Form:",
                    //     JSON.stringify(inputIdMesin.value),
                    // );
                    // console.log("Response SP :", data);
                    // console.log("Type data :", typeof data);
                    // console.log("Is Array :", Array.isArray(data));
                    // console.log("JSON data :", JSON.stringify(data));
                    // console.log("==========================");

                    const dataArray = Array.isArray(data) ? data : [];
                    // if (dataArray.length < 1) {
                    //     Swal.fire("Error", "Mesin tidak ditemukan.", "error");
                    //     clearInputGroup(inputIdKelompok, txtNamaKelompok);
                    // } else {
                    //     let found = dataArray.some(
                    //         (d) =>
                    //             String(d.IdMesin).trim() ===
                    //             inputIdMesin.value.trim(),
                    //     );
                    //     if (!found) {
                    //         Swal.fire(
                    //             "Peringatan",
                    //             "Mesin tidak sama.",
                    //             "warning",
                    //         );
                    //         clearInputGroup(inputIdKelompok, txtNamaKelompok);
                    //     } else {
                    //         btnLookupSubkel.disabled = false;
                    //         btnLookupSubkel.focus();
                    //     }
                    // }

                    // Tidak ada data → lewati validasi, pakai yang atas bila perlu validasi
                    // yang bawah sama seperti VB lama.
                    if (dataArray.length > 0) {
                        const found = dataArray.some(
                            (d) =>
                                String(d.IdMesin).trim() ===
                                inputIdMesin.value.trim(),
                        );

                        if (!found) {
                            Swal.fire(
                                "Peringatan",
                                "Mesin tidak sama.",
                                "warning",
                            ).then(() => {
                                clearInputGroup(
                                    inputIdKelompok,
                                    txtNamaKelompok,
                                );
                                btnLookupKelompok.focus();
                            });
                            return;
                        }
                    }
                    btnLookupSubkel.disabled = false;
                    btnLookupSubkel.focus();
                });
            } else {
                btnLookupSubkel.disabled = false;
                btnLookupSubkel.focus();
            }
        },
    });
});

btnLookupSubkel.addEventListener("click", function () {
    if (!inputIdKelompok.value) {
        return Swal.fire(
            "Peringatan",
            "Pilih Kelompok terlebih dahulu!",
            "warning",
        );
    }

    // SP_5298_EXT_IDKELOMPOK_SUBKELOMPOK
    openLookupModal({
        title: "Pilih Sub Kelompok",
        url: `/Master/getIdKelompokSubKelompok/${safeUrlParam(inputIdKelompok.value)}`,
        headers: ["ID SubKelompok", "Nama SubKelompok"],
        columns: ["idsubkelompok", "namasubkelompok"],
        onSelect: (row) => {
            inputIdSubkel.value = row.idsubkelompok;
            txtNamaSubkel.value = row.namasubkelompok;

            clearInputGroup(inputIdType, txtNamaType);
            btnLookupType.disabled = false;
            btnLookupType.focus();
        },
    });
});

btnLookupType.addEventListener("click", function () {
    if (!inputIdSubkel.value) {
        return Swal.fire(
            "Peringatan",
            "Pilih Sub Kelompok terlebih dahulu!",
            "warning",
        );
    }

    // SP_5298_EXT_IDSUBKELOMPOK_TYPE
    openLookupModal({
        title: "Pilih Type",
        url: `/Master/getIdSubKelompokType/${safeUrlParam(inputIdSubkel.value)}`,
        headers: ["ID Type", "Nama Type"],
        columns: ["IdType", "NamaType"],
        onSelect: (row) => {
            inputIdType.value = row.IdType;
            txtNamaType.value = row.NamaType;

            getSatuanFetch(row.IdType);

            numPrimer.disabled = false;
            numSekunder.disabled = true;
            numTritier.disabled = true;
            numPersentase.disabled = true;

            btnTambahDetail.disabled = true;
            btnHapusDetail.disabled = true;
            btnKoreksiDetail.disabled = true;

            numPrimer.value = 0;
            numSekunder.value = 0;
            numTritier.value = 0;
            numPersentase.value = 0;
            numPrimer.select();
        },
    });
});
//#endregion

//#region Input & Core Events
txtNamaKomposisi.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (this.value.trim() !== "") {
            btnLookupMesin.disabled = false;
            btnLookupMesin.focus();
        } else {
            Swal.fire(
                "Peringatan",
                "Masukkan nama komposisi terlebih dahulu.",
                "warning",
            ).then(() => this.focus());
        }
    }
});

numPrimer.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (isNaN(this.value) || this.value.trim() === "") {
            Swal.fire(
                "Peringatan",
                "Primer harus diisi angka.",
                "warning",
            ).then(() => {
                this.value = "";
                this.focus();
            });
            return;
        }
        numSekunder.disabled = false;
        numSekunder.value = 0;
        numSekunder.select();
    }
});

numSekunder.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (isNaN(this.value) || this.value.trim() === "") {
            Swal.fire(
                "Peringatan",
                "Sekunder harus diisi angka.",
                "warning",
            ).then(() => {
                this.value = "";
                this.focus();
            });
            return;
        }
        numTritier.disabled = false;
        numTritier.value = 0;
        numTritier.select();
    }
});

numTritier.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (isNaN(this.value) || this.value.trim() === "") {
            Swal.fire(
                "Peringatan",
                "Tritier harus diisi angka.",
                "warning",
            ).then(() => {
                this.value = "";
                this.focus();
            });
            return;
        }
        numPersentase.disabled = false;
        numPersentase.value = 0;
        numPersentase.select();
    }
});

numPersentase.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (isNaN(this.value) || this.value.trim() === "") {
            Swal.fire(
                "Peringatan",
                "Persentase harus diisi angka.",
                "warning",
            ).then(() => {
                this.value = "";
                this.focus();
            });
            return;
        }

        if (modeProses === "baru") {
            btnTambahDetail.disabled = false;
            btnKoreksiDetail.disabled = false;
            btnHapusDetail.disabled = false;
            pilKomposisi !== -1
                ? btnKoreksiDetail.focus()
                : btnTambahDetail.focus();
        } else if (modeProses === "koreksi") {
            btnTambahDetail.disabled = false;
            btnKoreksiDetail.disabled = true;
            btnHapusDetail.disabled = true;
            btnTambahDetail.focus();
        }
    }
});

btnBaruMaster.addEventListener("click", function () {
    clearDataMaster();
    clearDataDetail();

    txtNamaKomposisi.disabled = false;
    btnLookupKomposisi.disabled = true;
    txtNamaKomposisi.focus();

    window.scrollTo({ top: 0, behavior: "smooth" });
    modeProses = "baru";
    toggleButtons(2);

    listKomposisi.length = 0;
    clearTable_DataTable(
        "table_komposisi",
        colKomposisi.length,
        "padding=250px",
    );
});

btnKoreksiMaster.addEventListener("click", function () {
    clearDataMaster();
    clearDataDetail();

    txtNamaKomposisi.disabled = true;
    btnLookupKomposisi.disabled = false;
    btnLookupKomposisi.focus();

    window.scrollTo({ top: 0, behavior: "smooth" });
    modeProses = "koreksi";
    toggleButtons(2);

    listKomposisi.length = 0;
    clearTable_DataTable(
        "table_komposisi",
        colKomposisi.length,
        "padding=250px",
    );
});

btnHapusMaster.addEventListener("click", function () {
    Swal.fire({
        title: "Hapus Data",
        text: "Apakah Anda mau menghapus semua komposisi bahan atau hanya sebagian?",
        icon: "question",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Semua",
        denyButtonText: "Sebagian (Detail)",
    }).then((result) => {
        if (result.isConfirmed) {
            modeProses = "hapus";
            setupHapusUI();
        } else if (result.isDenied) {
            modeProses = "hapus_detail";
            setupHapusUI();
        }
    });
});

function setupHapusUI() {
    clearDataMaster();
    clearDataDetail();
    txtNamaKomposisi.disabled = true;
    btnLookupKomposisi.disabled = false;
    btnLookupKomposisi.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
    toggleButtons(2);
    listKomposisi.length = 0;
    clearTable_DataTable(
        "table_komposisi",
        colKomposisi.length,
        "padding=250px",
    );
}

// SP_5298_EXT_INSERT_KOMPOSISI_BAHAN
btnTambahDetail.addEventListener("click", function () {
    this.disabled = true;
    let jenis = getStatusType(inputIdKelut.value);

    if (
        !inputIdObjek.value ||
        !inputIdKelut.value ||
        !inputIdKelompok.value ||
        !inputIdSubkel.value ||
        !inputIdType.value ||
        numPrimer.value === "" ||
        numSekunder.value === "" ||
        numTritier.value === "" ||
        numPersentase.value === ""
    ) {
        Swal.fire(
            "Peringatan",
            "Ada data yang belum terisi secara lengkap.",
            "warning",
        );
        this.disabled = false;
        return;
    }

    if (listKomposisi.some((k) => k.IdType === inputIdType.value)) {
        Swal.fire(
            "Error",
            "Sudah ada type yang sama di dalam list komposisi.",
            "error",
        ).then(() => {
            this.disabled = false;
            btnLookupType.focus();
        });
        return;
    }

    listKomposisi.push({
        StatusType: jenis,
        IdType: inputIdType.value,
        NamaType: txtNamaType.value,
        JumlahPrimer: numPrimer.value,
        SatuanPrimer: txtSatPrimer.value || "NULL",
        JumlahSekunder: numSekunder.value,
        SatuanSekunder: txtSatSekunder.value || "NULL",
        JumlahTritier: numTritier.value,
        SatuanTritier: txtSatTritier.value || "NULL",
        Persentase: numPersentase.value,
        IdObjek: inputIdObjek.value,
        NamaObjek: txtNamaObjek.value,
        IdKelompokUtama: inputIdKelut.value,
        NamaKelompokUtama: txtNamaKelut.value,
        IdKelompok: inputIdKelompok.value,
        NamaKelompok: txtNamaKelompok.value,
        IdSubKelompok: inputIdSubkel.value,
        NamaSubKelompok: txtNamaSubkel.value,
    });

    addTable_DataTable(
        "table_komposisi",
        listKomposisi,
        colKomposisi,
        rowClickedFetch,
        "350px",
    );

    Swal.fire({
        title: "Input Lagi?",
        text: "Input data bahan / hasil produksi lagi?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
    }).then((result) => {
        if (result.isConfirmed) {
            disableDetail(true);
            clearDataDetail(["id_objek", "nama_objek"]);
            btnLookupObjek.disabled = false;
            btnLookupKelut.disabled = false;
            btnLookupKelut.focus();
        } else {
            btnProses.focus();
        }
        this.disabled = false;
    });
});

btnKoreksiDetail.addEventListener("click", function () {
    if (pilKomposisi === -1) {
        return Swal.fire(
            "Peringatan",
            "Pilih dulu data yang akan dikoreksi dari tabel.",
            "warning",
        );
    }

    if (
        !inputIdObjek.value ||
        !inputIdKelut.value ||
        !inputIdKelompok.value ||
        !inputIdSubkel.value ||
        !inputIdType.value ||
        numPrimer.value === "" ||
        numSekunder.value === "" ||
        numTritier.value === "" ||
        numPersentase.value === ""
    ) {
        return Swal.fire(
            "Peringatan",
            "Ada data yang belum terisi secara lengkap.",
            "warning",
        );
    }

    let isDuplicate = listKomposisi.some((k, index) => {
        return k.IdType === inputIdType.value && index !== pilKomposisi;
    });

    if (isDuplicate) {
        return Swal.fire(
            "Error",
            "Sudah ada type yang sama di dalam list komposisi.",
            "error",
        );
    }

    Swal.fire({
        title: "Koreksi Data",
        html: `Anda yakin akan mengoreksi type <b>${listKomposisi[pilKomposisi].NamaType}</b>?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, Koreksi",
    }).then((result) => {
        if (result.isConfirmed) {
            listKomposisi[pilKomposisi] = {
                StatusType: getStatusType(inputIdKelut.value),
                IdType: inputIdType.value,
                NamaType: txtNamaType.value,
                JumlahPrimer: numPrimer.value,
                SatuanPrimer: txtSatPrimer.value || "NULL",
                JumlahSekunder: numSekunder.value,
                SatuanSekunder: txtSatSekunder.value || "NULL",
                JumlahTritier: numTritier.value,
                SatuanTritier: txtSatTritier.value || "NULL",
                Persentase: numPersentase.value,
                IdObjek: inputIdObjek.value,
                NamaObjek: txtNamaObjek.value,
                IdKelompokUtama: inputIdKelut.value,
                NamaKelompokUtama: txtNamaKelut.value,
                IdKelompok: inputIdKelompok.value,
                NamaKelompok: txtNamaKelompok.value,
                IdSubKelompok: inputIdSubkel.value,
                NamaSubKelompok: txtNamaSubkel.value,
            };

            pilKomposisi = -1;
            clearSelection_DataTable("table_komposisi");
            addTable_DataTable(
                "table_komposisi",
                listKomposisi,
                colKomposisi,
                rowClickedFetch,
                "350px",
            );

            clearDataDetail(["id_objek", "nama_objek"]);
            btnLookupObjek.disabled = false;
            btnLookupKelut.disabled = false;
            btnLookupKelut.focus();
        }
    });
});

btnHapusDetail.addEventListener("click", async function () {
    if (listKomposisi.length <= 1) {
        pilKomposisi = -1;
        clearSelection_DataTable("table_komposisi");
        return Swal.fire(
            "Peringatan",
            "Data komposisi hanya tersisa satu, tidak boleh dihapus.",
            "warning",
        );
    }

    if (pilKomposisi === -1) {
        return Swal.fire(
            "Peringatan",
            "Pilih dulu data yang akan dihapus dari tabel.",
            "warning",
        );
    }

    if (modeProses === "baru") {
        Swal.fire({
            title: "Hapus Detail",
            html: `Anda yakin akan menghapus type <b>${listKomposisi[pilKomposisi].NamaType}</b> dari daftar sementara?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus",
        }).then((result) => {
            if (result.isConfirmed) {
                listKomposisi.splice(pilKomposisi, 1);
                pilKomposisi = -1;
                clearSelection_DataTable("table_komposisi");
                clearDataDetail(["id_objek", "nama_objek"]);
                btnLookupObjek.disabled = false;
                btnLookupKelut.disabled = false;
                btnLookupKelut.focus();
                addTable_DataTable(
                    "table_komposisi",
                    listKomposisi,
                    colKomposisi,
                    rowClickedFetch,
                    "350px",
                );
            } else {
                pilKomposisi = -1;
                clearSelection_DataTable("table_komposisi");
            }
        });
        return;
    }

    let confirmation = await Swal.fire({
        title: "Hapus Detail",
        html: `Anda yakin akan menghapus type <b>${listKomposisi[pilKomposisi].NamaType}</b>?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
    });

    if (confirmation.isConfirmed) {
        try {
            this.disabled = true;
            let idKomposisiKirim = inputIdKomposisi.value.trim() || "-";
            let idTypeHapus = listKomposisi[pilKomposisi].IdType;

            // SP_5409_EXT_CEK_KONVERSI
            let checkData = await fetchSelectAsync(
                `/Master/getCekKonversi/${safeUrlParam(idKomposisiKirim)}/${safeUrlParam(idTypeHapus)}`,
            );

            if (checkData && checkData.length > 0 && checkData[0].ada > 0) {
                pilKomposisi = -1;
                clearSelection_DataTable("table_komposisi");
                Swal.fire(
                    "Gagal",
                    "Type tidak dapat dihapus karena pernah digunakan untuk konversi.",
                    "error",
                );
            } else {
                // SP_5298_EXT_DELETE_KOMPOSISI_BAHAN_1
                await fetchPost(
                    `/Master/delKomposisiBahan1/${safeUrlParam(idKomposisiKirim)}/${safeUrlParam(idTypeHapus)}`,
                    {},
                    "DELETE",
                );

                listKomposisi.splice(pilKomposisi, 1);
                clearDataDetail(["id_objek", "nama_objek"]);
                btnLookupObjek.disabled = false;
                btnLookupKelut.disabled = false;
                btnLookupKelut.focus();

                addTable_DataTable(
                    "table_komposisi",
                    listKomposisi,
                    colKomposisi,
                    rowClickedFetch,
                    "350px",
                );
                pilKomposisi = -1;
                clearSelection_DataTable("table_komposisi");
            }
        } catch (error) {
            Swal.fire("Error", "Gagal memproses hapus: " + error, "error");
        } finally {
            this.disabled = false;
        }
    } else {
        pilKomposisi = -1;
        clearSelection_DataTable("table_komposisi");
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent !== "Keluar") {
        toggleButtons(1);
        clearDataMaster();
        clearDataDetail();
        disableDetail(true);
        modeProses = "";
        listKomposisi.length = 0;
        clearTable_DataTable(
            "table_komposisi",
            colKomposisi.length,
            "padding=250px",
        );
        pilKomposisi = -1;
        btnBaruMaster.focus();
    } else {
        window.location.href = '/Extruder/Extruder';
    }
});

// SP_5298_EXT_INSERT_MASTER_KOMPOSISI
btnProses.addEventListener("click", async function () {
    try {
        if (modeProses === "baru" && listKomposisi.length < 1) {
            return Swal.fire(
                "Peringatan",
                "Data tidak dapat diproses karena tidak ada data komposisi di tabel.",
                "warning",
            );
        }

        this.disabled = true;
        this.innerHTML =
            '<span class="spinner-border spinner-border-sm"></span> Processing...';
        btnKeluar.disabled = true;

        if (modeProses === "baru") {
            let jmlh_bb = listKomposisi
                .filter((k) => k.StatusType === "BB")
                .reduce(
                    (sum, k) => sum + (parseFloat(k.JumlahTritier) || 0),
                    0,
                );

            let insMaster = await fetchPost("/Master/insMasterKomposisi", {
                nama_komposisi: txtNamaKomposisi.value,
                id_mesin: inputIdMesin.value,
                id_divisi: "EXT",
            });

            if (insMaster && insMaster.status === "success") {
                let resId = await fetchSelectAsync(
                    "/Master/getMasterKomposisi/EXT",
                );
                inputIdKomposisi.value = resId.NoKomposisi;

                await insertDetailLogic(jmlh_bb);

                // SP_5298_EXT_UPDATE_IDKOMPOSISI_COUNTER
                await fetchPost("/Master/updIdKomposisiCounter", {
                    id_divisi: "EXT",
                });

                Swal.fire("Berhasil", "Data berhasil disimpan.", "success");
                resetAfterProses();
            }
        } else if (modeProses === "koreksi" || modeProses === "hapus_detail") {
            let jmlh_bb = listKomposisi
                .filter((k) => k.StatusType === "BB")
                .reduce(
                    (sum, k) => sum + (parseFloat(k.JumlahTritier) || 0),
                    0,
                );

            await deleteDetailFetchAsync(inputIdKomposisi.value);
            await insertDetailLogic(jmlh_bb);

            Swal.fire("Berhasil", "Data berhasil diubah.", "success");
            resetAfterProses();
        } else if (modeProses === "hapus") {
            let resCek = await fetchSelectAsync(
                `/Master/getCekKomposisi/${safeUrlParam(inputIdKomposisi.value.trim())}`,
            );
            let ada = resCek && resCek[0] && resCek[0].ada > 0;

            if (ada) {
                Swal.fire(
                    "Ditolak",
                    "Komposisi Tidak BOLEH diHAPUS!! Karena Sudah Dipakai Konversi",
                    "error",
                );
            } else {
                // SP_5298_EXT_DELETE_MASTER_KOMPOSISI
                await deleteDetailFetchAsync(inputIdKomposisi.value);
                let delMaster = await fetchPost(
                    `/Master/delMasterKomposisi/${safeUrlParam(inputIdKomposisi.value.trim())}`,
                    {},
                    "DELETE",
                );

                if (delMaster && delMaster.status === "success") {
                    Swal.fire(
                        "Berhasil",
                        "Komposisi sudah dihapus.",
                        "success",
                    );
                    resetAfterProses();
                }
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
function getStatusType(kelutValue) {
    switch (kelutValue) {
        case "0057":
        case "2480":
            return "BB";
        case "0117":
            return "BP";
        case "0121":
        case "2481":
            return "HP";
        case "0213":
            return "AF";
        default:
            return "__";
    }
}

function clearInputGroup(elId, elName) {
    if (elId) elId.value = "";
    if (elName) elName.value = "";
}

function clearDataDetail(exceptions = []) {
    if (!Array.isArray(exceptions)) exceptions = [exceptions];

    listOfDetailInputs.forEach((ele) => {
        let isExcluded = exceptions.some((ex) => ele.id.includes(ex));
        if (!isExcluded && ele.type !== "button") {
            ele.value = "";
        }
    });
}

function clearDataMaster() {
    clearInputGroup(inputIdKomposisi, txtNamaKomposisi);
    clearInputGroup(inputIdMesin, txtNamaMesin);
}

function disableDetail(state = true) {
    listOfButtonDetail.forEach((btn) => (btn.disabled = state));
    listOfDetailInputs.forEach((ele) => (ele.disabled = state));
}

function toggleButtons(tmb) {
    if (tmb === 1) {
        btnLookupKomposisi.disabled = true;
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

function resetAfterProses() {
    toggleButtons(1);
    disableDetail(true);
    modeProses = "";
    txtNamaKomposisi.disabled = true;
}

async function insertDetailLogic(jmlh_bb) {
    let inserted = [];
    try {
        for (let i = 0; i < listKomposisi.length; i++) {
            let komp = listKomposisi[i];
            let persentaseKu = parseFloat(komp.Persentase) || 0;

            if (komp.StatusType === "BP") {
                let totalBB = parseFloat(jmlh_bb) || 0;
                if (totalBB === 0) {
                    persentaseKu = 0;
                } else {
                    persentaseKu =
                        Math.round(
                            ((parseFloat(komp.JumlahTritier) || 0) / totalBB) *
                                100 *
                                100,
                        ) / 100;
                }
            }

            let payloadBahan = {
                id_komposisi: inputIdKomposisi.value.trim(),
                id_objek: komp.IdObjek.trim(),
                nama_objek: komp.NamaObjek,
                id_kelompok_utama: komp.IdKelompokUtama.trim(),
                nama_kelompok_utama: komp.NamaKelompokUtama.trim(),
                id_kelompok: komp.IdKelompok.trim(),
                nama_kelompok: komp.NamaKelompok.trim(),
                id_sub_kelompok: komp.IdSubKelompok.trim(),
                nama_sub_kelompok: komp.NamaSubKelompok.trim(),
                id_type: komp.IdType.trim(),
                nama_type: komp.NamaType.trim(),
                jumlah_primer: parseFloat(komp.JumlahPrimer) || 0,
                sat_primer: komp.SatuanPrimer.trim(),
                jumlah_sekunder: parseFloat(komp.JumlahSekunder) || 0,
                sat_sekunder: komp.SatuanSekunder.trim(),
                jumlah_tritier: parseFloat(komp.JumlahTritier) || 0,
                sat_tritier: komp.SatuanTritier.trim(),
                persentase: persentaseKu,
                status_type: komp.StatusType.trim(),
            };

            let res = await fetchPost(
                "/Master/insKomposisiBahan",
                payloadBahan,
            );
            if (res && res.status === "success") {
                inserted.push(komp.IdType);
            } else {
                throw new Error(`Gagal insert ${komp.IdType}`);
            }
        }
    } catch (err) {
        if (inserted.length > 0) {
            let idKomposisi = inputIdKomposisi.value.trim();
            for (let idType of inserted) {
                await fetchPost(
                    `/Master/delKomposisiBahan1/${safeUrlParam(idKomposisi)}/${safeUrlParam(idType)}`,
                    {},
                    "DELETE",
                ).catch(() => {});
            }
        }
        throw err;
    }
}

// SP_5298_EXT_DELETE_KOMPOSISI_BAHAN
async function deleteDetailFetchAsync(id_komposisi) {
    return await fetchPost(
        `/Master/delKomposisiBahan/${safeUrlParam(id_komposisi.trim())}`,
        {},
        "DELETE",
    );
}

function getDataKomposisiFetch(no_komposisi, post_action = null) {
    listKomposisi.length = 0;
    clearTable_DataTable("table_komposisi", colKomposisi.length, [
        "padding=250px",
        "Memuat data...",
    ]);

    fetchSelectAsync(
        `/Master/getListKomposisiBahan/${safeUrlParam(no_komposisi.trim())}`,
    ).then((data) => {
        data.forEach((d) => {
            listKomposisi.push({
                StatusType: d.statustype || d.StatusType,
                IdType: d.idtype || d.IdType,
                NamaType: d.namatype || d.NamaType,
                JumlahPrimer: d.jumlahprimer || d.JumlahPrimer,
                SatuanPrimer: d.satuanprimer || d.SatuanPrimer || "NULL",
                JumlahSekunder: d.jumlahsekunder || d.JumlahSekunder,
                SatuanSekunder: d.satuansekunder || d.SatuanSekunder || "NULL",
                JumlahTritier: d.jumlahtritier || d.JumlahTritier,
                SatuanTritier: d.satuantritier || d.SatuanTritier || "NULL",
                Persentase: d.Persentase || d.persentase,
                IdObjek: d.idobjek || d.IdObjek,
                NamaObjek: d.namaobjek || d.NamaObjek,
                IdKelompokUtama: d.idkelompokutama || d.IdKelompokUtama,
                NamaKelompokUtama: d.namakelompokutama || d.NamaKelompokUtama,
                IdKelompok: d.idkelompok || d.IdKelompok,
                NamaKelompok: d.namakelompok || d.NamaKelompok,
                IdSubKelompok: d.idsubkelompok || d.IdSubKelompok,
                NamaSubKelompok: d.namasubkelompok || d.NamaSubKelompok,
            });
        });

        if (listKomposisi.length < 1) {
            clearTable_DataTable("table_komposisi", colKomposisi.length, [
                "padding=250px",
                `Tidak ditemukan data untuk Komposisi ${no_komposisi}`,
            ]);
        } else {
            addTable_DataTable(
                "table_komposisi",
                listKomposisi,
                colKomposisi,
                rowClickedFetch,
                "350px",
            );
        }
        if (post_action) post_action();
    });
}

function getSatuanFetch(id_type) {
    fetchSelectAsync(`/Master/getDetailBahan/${safeUrlParam(id_type)}`).then(
        (data) => {
            txtSatPrimer.value =
                data[0]?.unitprimer || data[0]?.satPrimer || "NULL";
            txtSatSekunder.value =
                data[0]?.unitsekunder || data[0]?.satSekunder || "NULL";
            txtSatTritier.value =
                data[0]?.unittritier || data[0]?.nama_satuan || "NULL";
        },
    );
}

function rowClickedFetch(row, data, _) {
    if (
        pilKomposisi ===
        findClickedRowInList(listKomposisi, "IdType", data.IdType)
    ) {
        row.style.background = "white";
        pilKomposisi = -1;
        clearDataDetail(["id_objek", "nama_objek"]);
        disableDetail(true);
        btnLookupObjek.disabled = false;
        btnLookupKelut.disabled = false;
        btnLookupKelut.focus();
    } else {
        if (["baru", "hapus_detail", "koreksi"].includes(modeProses)) {
            pilKomposisi = findClickedRowInList(
                listKomposisi,
                "IdType",
                data.IdType,
            );
            clearSelection_DataTable("table_komposisi");
            row.style.background = "aliceblue";

            numPrimer.value = data.JumlahPrimer;
            txtSatPrimer.value = data.SatuanPrimer;
            numSekunder.value = data.JumlahSekunder;
            txtSatSekunder.value = data.SatuanSekunder;
            numTritier.value = data.JumlahTritier;
            txtSatTritier.value = data.SatuanTritier;
            numPersentase.value = data.Persentase;

            inputIdType.value = data.IdType;
            txtNamaType.value = data.NamaType;
            inputIdObjek.value = data.IdObjek;
            txtNamaObjek.value = data.NamaObjek;
            inputIdKelut.value = data.IdKelompokUtama;
            txtNamaKelut.value = data.NamaKelompokUtama;
            inputIdKelompok.value = data.IdKelompok;
            txtNamaKelompok.value = data.NamaKelompok;
            inputIdSubkel.value = data.IdSubKelompok;
            txtNamaSubkel.value = data.NamaSubKelompok;

            if (modeProses === "baru") {
                disableDetail(true);
                btnKoreksiDetail.disabled = false;
                btnHapusDetail.disabled = false;
                numPrimer.disabled = false;
                numSekunder.disabled = false;
                numTritier.disabled = false;
                numPersentase.disabled = false;
                numPrimer.select();
            } else {
                btnHapusDetail.disabled = false;
            }
        }
    }
}

function init() {
    tableKomposisi = $("#table_komposisi").DataTable({
        responsive: true,
        paging: false,
        scrollY: "350px",
        scrollX: "1000000px",
        columns: colKomposisi,
        searching: false,
        info: false,
    });

    tableKomposisi.on("blur", function () {
        removeNavigation_DataTable([tableKomposisi]);
    });

    clearTable_DataTable(
        "table_komposisi",
        colKomposisi.length,
        "padding=25vw",
    );

    toggleButtons(1);
    disableDetail(true);
    btnBaruMaster.focus();
}

$(document).ready(() => init());
//#endregion
