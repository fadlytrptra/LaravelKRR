//#region Variabel DOM Elements
const dateAwal = document.getElementById("tanggal_awal");
const dateAkhir = document.getElementById("tanggal_akhir");
const hidInput = document.getElementById("hiddenKu");

const btnOK = document.getElementById("btn_ok");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");
const namaGedung = document.getElementById("nama_gedung").value;

const listKonversi = [];
/* ISI LIST KONVERSI
    0 IdKonversiNG
    1 Tanggal
*/

const listDetail = [];
/* ISI LIST DETAIL
    0 Tanggal
    1 IdKonversiNG
    2 UraianDetailTransaksi
    3 NamaType
    4 JumlahPrimer
    5 JumlahSekunder
    6 JumlahTritier
    7 NamaObjek
    8 NamaKelompokUtama
    9 NamaKelompok
    10 NamaSubKelompok
    11 IdSubKelompok
    12 IdType
*/

const listTmpTrans = [];
/* ISI LIST TMP TRANSAKSI
    0 IdTransaksi
    1 IdTypeTransaksi
    2 UraianDetailTransaksi
    3 IdType
    4 IdPenerima
    5 IdPemberi
    6 SaatAwalTransaksi
    7 SaatAkhirTransaksi
    8 JumlahPemasukanPrimer
    9 JumlahPemasukanSekunder
    10 JumlahPemasukanTritier
    11 JumlahPengeluaranPrimer
    12 JumlahPengeluaranSekunder
    13 JumlahPengeluaranTritier
    14 AsalIdSubKelompok
    15 TujuanIdSubKelompok
    16 idkonversi
    17 SaldoPrimer
    18 SaldoSekunder
    19 SaldoTritier
    20 namatype
    21 idsubkelompok_type
*/

const posTable = $("#table_konversi").offset().top - 125;
const colDetail = [
    { width: "100px" }, // Tanggal
    { width: "125px" }, // Id Konversi
    { width: "125px" }, // Uraian
    { width: "200px" }, // Nama Type
    { width: "125px" }, // Qty. Primer
    { width: "125px" }, // Qty. Sekunder
    { width: "125px" }, // Qty. Tritier
    { width: "100px" }, // Objek
    { width: "100px" }, // Kel. Ut.
    { width: "100px" }, // Kelompok
    { width: "100px" }, // Sub-kel.
    { width: "100px" }, // Id Sub-kel.
    { width: "100px" }, // Id Type
];

var idKonversiNG = -1;
var radios = null;
//#endregion

//#region Events
hidInput.addEventListener("change", function () {
    let [strFunction, strData] = this.value.split("|");
    console.log(this.value);
    console.log(strFunction);
    console.log(strData);

    if (strFunction.trim() == "cekPenyesuaian") {
        console.log("Cek penyesuaian selesai.");
        listTmpTrans.length = 0;
        if (strData.trim().toLowerCase() == "false") prosesInventoryFetch();
    } else if (strFunction.trim() == "prosesInventory") {
        console.log("Proses inventory selesai.");
        if (strData.trim().toLowerCase() == "true") prosesExtruderFetch();
    } else if (strFunction.trim() == "prosesExtruder") {
        console.log("Proses extruder selesai.");
        Swal.fire("Berhasil", "Data berhsil di-ACC", "success");
        clearAll();
    }
});

btnOK.addEventListener("click", function () {
    listKonversi.length = 0;
    clearTable_DataTable("table_konversi", 2, "Memuat data...");
    listDetail.length = 0;
    clearTable_DataTable("table_detail", colDetail.length, "padding=250px");
    daftarKonversiBelumACCFetch();
});

btnProses.addEventListener("click", function () {
    this.disabled = true;
    this.innerHTML =
        '<span class="spinner-border spinner-border-sm"></span> Processing...';
    btnKeluar.disabled = true;

    try {
        if (idKonversiNG == -1) {
            Swal.fire(
                "Peringatan",
                "Pilih dulu data konversi yang ingin di-ACC",
                "warning",
            );
            return;
        }

        cekPenyesuaianFetch();
    } finally {
        this.disabled = false;
        this.innerText = "Proses";
        btnKeluar.disabled = false;
    }
});

btnKeluar.addEventListener("click", function () {
    window.location.href = '/Extruder/Extruder';
});
//#endregion

//#region Functions
function daftarKonversiBelumACCFetch() {
    let kode_ins = namaGedung == "D" ? "D" : "";
    let url = `/Benang/getListIdKonversiNG/${safeUrlParam(dateAwal.value)}/${safeUrlParam(dateAkhir.value)}`;
    if (kode_ins != "") url += "/" + safeUrlParam(kode_ins);

    // SP_5298_EXT_LIST_IDKONVERSI_NG
    fetchSelectAsync(url, (data) => {
        for (let i = 0; i < data.length; i++) {
            const strRdo = `<input class="form-check-input" type="radio" name="rdo_konversi" id="`;
            listKonversi.push({
                IdKonversiNG: `${strRdo}rdo_${data[i].IdKonversiNG}"> &nbsp; ${data[i].IdKonversiNG}`,
                Tanggal: dateTimeToDate(data[i].Tanggal),
            });

            // $("html, body").animate({ scrollTop: posTable }, 100);
            addTable_DataTable(
                "table_konversi",
                listKonversi,
                null,
                null,
                null,
                "dom_empty",
            );

            radios = document.querySelectorAll("input[type='radio']");
            radios.forEach((radio) => {
                radio.addEventListener("click", function () {
                    idKonversiNG = radio.id.split("_")[1];
                    tampilDetailKonversiFetch(radio.id.split("_")[1]);
                });
            });
        }

        if (data.length <= 0) {
            clearTable_DataTable("table_konversi", 2, "Data tidak ditemukan.");
            Swal.fire(
                "Error",
                "Data konversi pada tanggal " +
                    dateAwal.value +
                    " hingga tanggal " +
                    dateAkhir.value +
                    " tidak ditemukan. mohon coba masukkan tanggal lain.",
                "error",
            );
        }
    });
}

function tampilDetailKonversiFetch(id_konversi_ng) {
    listDetail.length = 0;
    clearTable_DataTable("table_detail", colDetail.length, [
        "padding=250px",
        "Memuat data...",
    ]);

    // SP_5298_EXT_DETAILDATA_BENANG_NG
    fetchSelectAsync(
        `/Benang/getDetailDataBenangNG/${safeUrlParam(id_konversi_ng)}`,
        (data) => {
            for (let i = 0; i < data.length; i++) {
                let [jmlhPrimer, jmlhSekunder, jmlhTritier] = ["", "", ""];
                if (data[i].UraianDetailTransaksi == "Asal Konversi") {
                    jmlhPrimer = data[i].JumlahPengeluaranPrimer;
                    jmlhSekunder = data[i].JumlahPengeluaranSekunder;
                    jmlhTritier = data[i].JumlahPengeluaranTritier;
                } else if (data[i].UraianDetailTransaksi == "Tujuan Konversi") {
                    jmlhPrimer = data[i].JumlahPemasukanPrimer;
                    jmlhSekunder = data[i].JumlahPemasukanSekunder;
                    jmlhTritier = data[i].JumlahPemasukanTritier;
                }

                listDetail.push({
                    Tanggal: dateTimeToDate(data[i].Tanggal),
                    IdKonversiNG: data[i].IdKonversiNG,
                    UraianDetailTransaksi: data[i].UraianDetailTransaksi,
                    NamaType: data[i].NamaType,
                    JumlahPrimer: jmlhPrimer,
                    JumlahSekunder: jmlhSekunder,
                    JumlahTritier: jmlhTritier,
                    NamaObjek: data[i].NamaObjek,
                    NamaKelompokUtama: data[i].NamaKelompokUtama,
                    NamaKelompok: data[i].NamaKelompok,
                    NamaSubKelompok: data[i].NamaSubKelompok,
                    IdSubKelompok: data[i].IdSubkelompok,
                    IdType: data[i].IdType,
                });
            }

            if (data.length <= 0) {
                clearTable_DataTable("table_detail", colDetail.length, [
                    "padding=100px",
                    "Data untuk <b>Konversi " +
                        id_konversi_ng +
                        "</b> tidak ditemukan.",
                ]);
            } else addTable_DataTable("table_detail", listDetail, colDetail);
        },
    );
}

function cekPenyesuaianFetch() {
    let penyesuaian = false;
    for (let i = 0; i < listDetail.length; i++) {
        if (!penyesuaian) {
            // SP_5298_EXT_CHECK_PENYESUAIAN_TRANSAKSI
            fetchSelectAsync(
                "/Konversi/getPenyesuaianTransaksi/" +
                    safeUrlParam(listDetail[i].IdType.trim()) +
                    "/06",
                (data) => {
                    if (data > 1) {
                        penyesuaian = true;
                        Swal.fire(
                            "Peringatan",
                            "Terdapat penyesuaian untuk type " +
                                listDetail[i].namatype +
                                ".",
                            "warning",
                        );

                        hidInput.value = "cekPenyesuaian | " + penyesuaian;
                        hidInput.dispatchEvent(new Event("change"));
                        return;
                    }
                },
            );
        } else break;
    }

    hidInput.value = "cekPenyesuaian | " + penyesuaian;
    hidInput.dispatchEvent(new Event("change"));
}

function prosesInventoryFetch() {
    // SP_5409_EXT_DISPLAY_TRANSAKSI_KONVERSI_NG
    fetchSelectAsync(
        `/Benang/getTransaksiKonversiNG/${safeUrlParam(idKonversiNG)}`,
        (data) => {
            for (let i = 0; i < data.length; i++) listTmpTrans.push(data[i]);

            if (listTmpTrans.length <= 0) {
                hidInput.value = "prosesInventory | true";
                hidInput.dispatchEvent(new Event("change"));
                return;
            }

            // Cek saldo barang
            for (let i = 0; i < listTmpTrans.length; i++) {
                if (
                    parseFloat(listTmpTrans[i].JumlahPengeluaranPrimer) >
                        parseFloat(listTmpTrans[i].SaldoPrimer) ||
                    parseFloat(listTmpTrans[i].JumlahPengeluaranSekunder) >
                        parseFloat(listTmpTrans[i].SaldoSekunder) ||
                    parseFloat(listTmpTrans[i].JumlahPengeluaranTritier) >
                        parseFloat(listTmpTrans[i].SaldoTritier)
                ) {
                    Swal.fire(
                        "Peringatan",
                        "Saldo untuk type " +
                            listTmpTrans[i].namatype +
                            " tidak mencukupi.",
                        "warning",
                    );
                    return;
                }
            }

            for (let i = 0; i < listTmpTrans.length; i++) {
                // SP_5298_EXT_PROSES_ACC_KONVERSI
                fetchPost(
                    "/Benang/updProsesACCKonversi",
                    {
                        id_transaksi: listTmpTrans[i].IdTransaksi,
                        id_type: listTmpTrans[i].IdType.trim(),
                        waktu_acc: getCurrentDate(),
                        keluar_primer: listTmpTrans[i].JumlahPengeluaranPrimer,
                        keluar_sekunder:
                            listTmpTrans[i].JumlahPengeluaranSekunder,
                        keluar_tritier:
                            listTmpTrans[i].JumlahPengeluaranTritier,
                        masuk_primer: listTmpTrans[i].JumlahPemasukanPrimer,
                        masuk_sekunder: listTmpTrans[i].JumlahPemasukanSekunder,
                        masuk_tritier: listTmpTrans[i].JumlahPemasukanTritier,
                    },
                    "PUT",
                ).then((res) => {
                    if (res && res.status === "success") {
                        if (i == listTmpTrans.length - 1) {
                            hidInput.value = "prosesInventory | true";
                            hidInput.dispatchEvent(new Event("change"));
                        }
                    } else {
                        hidInput.value = "prosesInventory | false";
                        hidInput.dispatchEvent(new Event("change"));
                    }
                });
            }
        },
    );
}

function prosesExtruderFetch() {
    // SP_5298_EXT_ACC_KONVERSI_NG
    fetchPost(
        "/Benang/updACCKonversiNG",
        {
            id_konversi_ng: idKonversiNG,
        },
        "PUT",
    ).then((res) => {
        if (res && res.status === "success") {
            hidInput.value = "prosesExtruder | true";
            hidInput.dispatchEvent(new Event("change"));
        } else {
            hidInput.value = "prosesExtruder | false";
            hidInput.dispatchEvent(new Event("change"));
        }
    });
}

function clearAll() {
    dateAwal.value = getCurrentDate(false, "month,-1");
    dateAkhir.value = getCurrentDate();
    listKonversi.length = 0;
    clearTable_DataTable("table_konversi", 2);
    listDetail.length = 0;
    clearTable_DataTable("table_detail", colDetail.length, "padding=250px");
}
//#endregion

function init() {
    $("#table_konversi").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "",
        language: {
            searchPlaceholder: " Tabel konversi...",
            search: "",
        },
    });

    $("#table_detail").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: colDetail,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel detail...",
            search: "",
        },

        initComplete: () => {
            var searchInput = $('input[type="search"]').addClass(
                "form-control",
            );

            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    });

    clearTable_DataTable("table_konversi", 2);
    clearTable_DataTable("table_detail", colDetail.length, "padding=250px");
    dateAwal.value = getCurrentDate(false, "month,-1");
    dateAkhir.value = getCurrentDate();

    /**
     * DEBUG
     */

    // daftarKonversiBelumACCFetch();
}

$(document).ready(() => init());
