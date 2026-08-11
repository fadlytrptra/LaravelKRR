//#region Variabel DOM Elements & Global State
const dateInput = document.getElementById("tanggal");
const hidInput = document.getElementById("hidden_input");

const listOfInputTxt = document.querySelectorAll("input[type='text']");
const listOfInputTime = document.querySelectorAll("input[type='time']");

const txtShift = document.getElementById("shift");
const timeAwal = document.getElementById("shift_awal");
const timeAkhir = document.getElementById("shift_akhir");
const timeMulai = document.getElementById("waktu_mulai");
const timeSelesai = document.getElementById("waktu_selesai");

const txtIdMesin = document.getElementById("id_mesin");
const txtNamaMesin = document.getElementById("nama_mesin");
const txtUkuran = document.getElementById("ukuran");
const txtDenier = document.getElementById("denier");
const txtWarna = document.getElementById("warna");
const txtLot = document.getElementById("lot");
const txtNoUrut = document.getElementById("no_urut");
const txtIdOrder = document.getElementById("id_order");
const txtNamaOrder = document.getElementById("nama_order");
const txtIdKomposisi = document.getElementById("id_komposisi");
const txtNamaKomposisi = document.getElementById("nama_komposisi");
const txtBahanTerpakai = document.getElementById("total_bahan_terpakai");
const txtHasilTimbang = document.getElementById("hasil_timbang");
const txtAfalan = document.getElementById("afalan");

const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

// Constants
const namaGedung = document.getElementById("nama_gedung").value;
const idDivisi =
    namaGedung === "B" ? "MEX" : namaGedung === "D" ? "DEX" : "EXT";

const listKonversi = [];
/* ISI LIST KONVERSI
    0 IdKonversi
    1 IdDivisi
    2 NamaDivisi
    3 Tanggal
    4 Shift
    5 AwalShift
    6 AkhirShift
    7 IdMesin
    8 TypeMesin
    9 Ukuran
    10 Denier
    11 Warna
    12 LotNumber
    13 IdOrder
    14 Identifikasi
    15 IdKomposisi
    16 Spec
    17 JamMulai
    18 JamSelesai
    19 NoUrutOrderEXT
*/

const listHasil = [];
/* ISI LIST HASIL
    0 Type
    1 IdType
    2 JumlahPrimer
    3 SatuanPrimer
    4 JumlahSekunder
    5 SatuanSekunder
    6 JumlahTritier
    7 SatuanTritier
    8 Persentase
    9 StatusType
*/

const colHasil = [
    { width: "300px" }, // Nama Type
    { width: "1px" }, // IdType
    { width: "95px" }, // Qty. Primer
    { width: "95px" }, // Sat. Primer
    { width: "95px" }, // Qty. Sekunder
    { width: "95px" }, // Sat. Sekunder
    { width: "95px" }, // Qty. Tritier
    { width: "95px" }, // Sat. Tritier
    { width: "1px" }, // Persentase
    { width: "1px" }, // Jenis
];

let konversiPil = -1;
let tableKonversi = "";
let tableHasil = "";
//#endregion

//#region Utility & Helper Functions
function clearForm(emptyAll = true) {
    listOfInputTxt.forEach((input) => (input.value = ""));
    listOfInputTime.forEach((input) => (input.value = "00:00"));
    dateInput.value = getCurrentDate();

    listHasil.length = 0;
    clearTable_DataTable("table_hasil", colHasil.length);

    if (emptyAll) {
        listKonversi.length = 0;
        clearTable_DataTable("table_konversi", 2);
        konversiPil = -1;
        btnProses.disabled = true;
    }
}

function padLeft(str, length, char = "0") {
    return String(str).padStart(length, char);
}

function formatDateToDDMMYY(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    return parts[2] + "-" + parts[1] + "-" + parts[0].slice(-2);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//#endregion

//#region Data Fetch & Render Functions
async function daftarKonversiBelumACCFetch() {
    try {
        listKonversi.length = 0;
        clearTable_DataTable("table_konversi", 2, "Memuat data...");

        // SP_5298_EXT_LIST_KONV_BLM_ACC
        const data = await fetchSelectAsync(
            `/Konversi/getListKonvBlmAcc/${safeUrlParam(idDivisi)}`,
        );

        if (!data || data.length === 0) {
            clearTable_DataTable(
                "table_konversi",
                2,
                "Data konversi tidak ditemukan.",
            );
            return;
        }

        for (let i = 0; i < data.length; i++) {
            listKonversi.push({
                IdKonversi: data[i].IdKonversi,
                IdDivisi: data[i].IdDivisi,
                NamaDivisi: data[i].NamaDivisi,
                Tanggal: data[i].Tanggal,
                Shift: data[i].Shift,
                AwalShift: data[i].AwalShift,
                AkhirShift: data[i].AkhirShift,
                IdMesin: data[i].IdMesin,
                TypeMesin: data[i].TypeMesin,
                Ukuran: data[i].Ukuran,
                Denier: data[i].Denier,
                Warna: data[i].Warna,
                LotNumber: data[i].LotNumber,
                IdOrder: data[i].IdOrder,
                Identifikasi: data[i].Identifikasi,
                IdKomposisi: data[i].IdKomposisi,
                NamaKomposisi: data[i].NamaKomposisi,
                JamMulai: data[i].JamMulai,
                JamSelesai: data[i].JamSelesai,
                NoUrut: data[i].nourutorderext,
            });
        }

        const tableData = listKonversi.map((item, index) => ({
            IdKonversi: `<input class="form-check-input" type="checkbox" value="${index}" name="checkbox_konversi"> ${item.IdKonversi}`,
            NamaKomposisi: item.NamaKomposisi,
        }));

        addTable_DataTable("table_konversi", tableData, null, null, "450px");

        const checkboxes = document.querySelectorAll(
            'input[name="checkbox_konversi"]',
        );
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", function () {
                if (this.checked) {
                    checkboxes.forEach((cb) => {
                        if (cb !== this) cb.checked = false;
                    });
                    konversiPil = parseInt(this.value);
                    listHasil.length = 0;
                    clearTable_DataTable(
                        "table_hasil",
                        colHasil.length,
                        "Memuat data...",
                    );
                    tampilRincianKonversi(
                        konversiPil,
                        listKonversi[konversiPil].IdKonversi,
                    );
                } else {
                    clearForm(false);
                }
            });
        });
    } catch (error) {
        console.error("Error daftarKonversiBelumACCFetch:", error);
        Swal.fire(
            "Error",
            "Gagal memuat daftar konversi: " + error.message,
            "error",
        );
        clearTable_DataTable(
            "table_konversi",
            2,
            "Terjadi kesalahan saat memuat data.",
        );
    }
}

function tampilRincianKonversi(index, idKonversi) {
    const item = listKonversi[index];
    dateInput.value = dateTimeToDate(item.Tanggal);
    txtShift.value = item.Shift;
    timeAwal.value = dateTimetoTime(item.AwalShift);
    timeAkhir.value = dateTimetoTime(item.AkhirShift);
    txtIdMesin.value = item.IdMesin;
    txtNamaMesin.value = item.TypeMesin;
    txtUkuran.value = item.Ukuran;
    txtDenier.value = item.Denier;
    txtWarna.value = item.Warna;
    txtLot.value = item.LotNumber;
    txtIdOrder.value = item.IdOrder;
    txtNamaOrder.value = item.Identifikasi;
    txtIdKomposisi.value = item.IdKomposisi;
    txtNamaKomposisi.value = item.NamaKomposisi;
    timeMulai.value = dateTimetoTime(item.JamMulai);
    timeSelesai.value = dateTimetoTime(item.JamSelesai);
    txtNoUrut.value = item.NoUrut;

    tampilDetailKonversiFetch(idKonversi);
}

async function tampilDetailKonversiFetch(idKonversi) {
    try {
        // SP_5298_EXT_LIST_KONV_DETAIL_1
        const data = await fetchSelectAsync(
            `/Konversi/getListKonvDetail/${safeUrlParam(idKonversi)}`,
        );

        if (!data || data.length === 0) {
            clearTable_DataTable(
                "table_hasil",
                colHasil.length,
                `Data untuk Konversi <b>${idKonversi}</b> tidak ditemukan.`,
            );
            return;
        }

        listHasil.length = 0;
        for (let i = 0; i < data.length; i++) {
            listHasil.push({
                Type: data[i].Type,
                IdType: data[i].IdType,
                JumlahPrimer: data[i].JumlahPrimer,
                SatuanPrimer: data[i].SatuanPrimer,
                JumlahSekunder: data[i].JumlahSekunder,
                SatuanSekunder: data[i].SatuanSekunder,
                JumlahTritier: data[i].JumlahTritier,
                SatuanTritier: data[i].SatuanTritier,
                Persentase: data[i].Persentase,
                StatusType: data[i].StatusType,
            });
        }

        addTable_DataTable("table_hasil", listHasil, colHasil);
        hitungJumlahBahanHasil();
    } catch (error) {
        console.error("Error tampilDetailKonversiFetch:", error);
        Swal.fire(
            "Error",
            "Gagal memuat detail konversi: " + error.message,
            "error",
        );
        clearTable_DataTable(
            "table_hasil",
            colHasil.length,
            "Terjadi kesalahan.",
        );
    }
}

function hitungJumlahBahanHasil() {
    let jum_bahan = 0;
    let jum_hasil = 0;
    let jum_afalan = 0;

    for (const item of listHasil) {
        const val = parseFloat(item.JumlahTritier) || 0;
        if (item.StatusType === "BB" || item.StatusType === "BP") {
            jum_bahan += val;
        } else if (item.StatusType === "AF") {
            jum_afalan += val;
        } else if (item.StatusType === "HP") {
            jum_hasil += val;
        }
    }

    txtBahanTerpakai.value = jum_bahan !== 0 ? jum_bahan : "";
    txtHasilTimbang.value = jum_hasil !== 0 ? jum_hasil : "";
    txtAfalan.value = jum_afalan !== 0 ? jum_afalan : "";

    toleransi(jum_bahan);
}
//#endregion

//#region Toleransi & Validasi
function toleransi(jum_bahan) {
    const mesin = txtIdMesin.value;
    const hasil = parseFloat(txtHasilTimbang.value) || 0;
    const afalan = parseFloat(txtAfalan.value) || 0;
    const totalProduksi = hasil + afalan;

    let toleransi, range1, range2;

    // Mesin dengan toleransi 8%
    if (["M-003", "M-004", "M-006", "M-007"].includes(mesin)) {
        toleransi = 0.08 * jum_bahan;
        range1 = jum_bahan - toleransi;
        range2 = jum_bahan + toleransi;
    }
    // Mesin dengan toleransi 4%
    else if (["M-001", "M-002", "M-005"].includes(mesin)) {
        toleransi = 0.04 * jum_bahan;
        range1 = jum_bahan - toleransi;
        range2 = jum_bahan + toleransi;
    }
    // Mesin lain tanpa toleransi (langsung aktif)
    else {
        btnProses.disabled = false;
        btnProses.focus();
        return;
    }

    // Validasi
    if (totalProduksi >= range1 && totalProduksi <= range2) {
        btnProses.disabled = false;
        btnProses.focus();
    } else if (totalProduksi < range1) {
        btnProses.disabled = true;
        Swal.fire(
            "Peringatan",
            `Total Hasil Produksi = ${totalProduksi.toFixed(2)} lebih kecil dari batas minimal = ${range1.toFixed(2)}`,
            "warning",
        );
    } else if (totalProduksi > range2) {
        btnProses.disabled = true;
        Swal.fire(
            "Peringatan",
            `Total Hasil Produksi = ${totalProduksi.toFixed(2)} lebih besar dari batas maksimal = ${range2.toFixed(2)}`,
            "warning",
        );
    } else {
        btnProses.disabled = true;
        Swal.fire("Error", "Jumlah bahan tidak valid.", "error");
    }
}
//#endregion

//#region Proses ACC
btnProses.addEventListener("click", async function () {
    try {
        this.disabled = true;
        this.innerHTML =
            '<span class="spinner-border spinner-border-sm"></span> Memproses...';

        await cekPenyesuaian();
        await prosesInventory();
        await prosesExtruder();

        Swal.fire("Berhasil", "Konversi berhasil di-ACC.", "success");
        clearForm();
        await daftarKonversiBelumACCFetch();
    } catch (error) {
        console.error("Error proses ACC:", error);
        Swal.fire(
            "Error",
            error.message || "Terjadi kesalahan saat memproses ACC.",
            "error",
        );
    } finally {
        this.disabled = false;
        this.innerHTML = "Proses";
    }
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/ExtruderNet";
});

async function cekPenyesuaian() {
    for (const item of listHasil) {
        const count = await fetchSelectAsync(
            `/Konversi/getPenyesuaianTransaksi/${safeUrlParam(item.IdType.trim())}/06`,
        );
        if (count.length > 1) {
            await Swal.fire(
                "Peringatan",
                `Terdapat penyesuaian untuk type ${item.Type}.`,
                "warning",
            );
            throw new Error("Ada penyesuaian transaksi, proses dihentikan.");
        }
    }
    return true;
}

async function prosesInventory() {
    const idKonv = listKonversi[konversiPil].IdKonversi;
    const transData = await fetchSelectAsync(
        `/Konversi/getTransaksiKonversi/${safeUrlParam(idKonv)}`,
    );

    if (!transData || transData.length === 0) {
        throw new Error("Data transaksi konversi tidak ditemukan.");
    }

    const tmpTrans = transData;

    for (const t of tmpTrans) {
        if (
            (t.JumlahPengeluaranPrimer || 0) > (t.SaldoPrimer || 0) ||
            (t.JumlahPengeluaranSekunder || 0) > (t.SaldoSekunder || 0) ||
            (t.JumlahPengeluaranTritier || 0) > (t.SaldoTritier || 0)
        ) {
            throw new Error(`Saldo untuk type ${t.namatype} tidak mencukupi.`);
        }
    }

    const waktuAwal = new Date("1970-01-01T" + timeAwal.value);
    let shift;
    if (waktuAwal <= new Date("1970-01-01T11:59")) shift = "P";
    else if (waktuAwal <= new Date("1970-01-01T16:59")) shift = "S";
    else shift = "M";

    let adaHutang = false;
    const hutangItems = [];

    for (const t of tmpTrans) {
        const hutData = await fetchSelectAsync(
            `/Konversi/getJumlahHutang/${safeUrlParam(t.IdType.trim())}/${safeUrlParam(t.idsubkelompok_type.trim())}/${safeUrlParam(shift)}/${safeUrlParam(formatDateToDDMMYY(dateInput.value))}`,
        );

        if (hutData && hutData.length > 0) {
            const h = hutData[0];
            const totalS = parseFloat(h.TotalS) || 0;
            const total = parseFloat(h.Total) || 0;
            const masukSekunder = parseFloat(t.JumlahPemasukanSekunder) || 0;
            const masukTritier = parseFloat(t.JumlahPemasukanTritier) || 0;

            if (
                masukSekunder === totalS &&
                masukTritier === total &&
                (masukSekunder !== 0 || masukTritier !== 0)
            ) {
                adaHutang = true;
                hutangItems.push({
                    IdType: t.IdType,
                    IdSubKel: t.idsubkelompok_type,
                    JumlahPemasukanSekunder: masukSekunder,
                    JumlahPemasukanTritier: masukTritier,
                });
            } else if (totalS !== 0 || total !== 0) {
                throw new Error("Jumlah hutang tidak sesuai dengan konversi.");
            }
        }
    }

    if (adaHutang) {
        const result = await Swal.fire({
            title: "Lunasi Hutang",
            text: "Ditemukan hutang benang, apakah ingin dilunasi?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Lunasi",
            cancelButtonText: "Tidak",
        });

        if (!result.isConfirmed) {
            throw new Error("Proses dibatalkan karena hutang tidak dilunasi.");
        }

        for (const h of hutangItems) {
            await fetchPost('/Konversi/updProsesACCKonversi', {
                id_transaksi: tmpTrans[0].IdTransaksi,
                id_type: h.IdType,
                waktu_acc: dateInput.value,
                keluar_primer: 0,
                keluar_sekunder: 0,
                keluar_tritier: 0,
                masuk_primer: 0,
                masuk_sekunder: h.JumlahPemasukanSekunder,
                masuk_tritier: h.JumlahPemasukanTritier
            }, "PUT");

            const idTransInv = await fetchSelectAsync(
                `/Konversi/getIdTransInv/${safeUrlParam(h.IdType)}/${safeUrlParam(h.IdSubKel)}/${safeUrlParam(formatDateToDDMMYY(dateInput.value))}/${safeUrlParam(shift)}`,
            );

            if (idTransInv && idTransInv.length > 0) {
                for (const inv of idTransInv) {
                    await fetchPost('/Konversi/updProsesHutang', {
                        id_type: h.IdType,
                        subkel: h.IdSubKel,
                        id_inv: inv.Trans
                    }, "PUT");
                }
            }
        }
    } else {
        for (const t of tmpTrans) {
            await fetchPost('/Konversi/updProsesACCKonversi', {
                id_transaksi: t.IdTransaksi,
                id_type: t.IdType.trim(),
                waktu_acc: dateInput.value,
                keluar_primer: t.JumlahPengeluaranPrimer,
                keluar_sekunder: t.JumlahPengeluaranSekunder,
                keluar_tritier: t.JumlahPengeluaranTritier,
                masuk_primer: t.JumlahPemasukanPrimer,
                masuk_sekunder: t.JumlahPemasukanSekunder,
                masuk_tritier: t.JumlahPemasukanTritier
            }, "PUT");
        }
    }

    return true;
}

async function prosesExtruder() {
    const idKonv = listKonversi[konversiPil].IdKonversi;

    await fetchPost('/Konversi/updACCMasterKonv', {
        id_konversi: idKonv
    }, "PUT");

    for (const item of listHasil) {
        await fetchPost('/Konversi/updSaldoOrderDetail', {
            id_order: txtIdOrder.value,
            no_urut_order: txtNoUrut.value,
            primer: item.JumlahPrimer,
            sekunder: item.JumlahSekunder,
            tritier: item.JumlahTritier
        }, "PUT");
    }

    const orderStatus = await fetchSelectAsync(
        `/Konversi/getSaldoOrderDetail/${safeUrlParam(txtIdOrder.value)}/${safeUrlParam(txtNoUrut.value)}`,
    );
    if (orderStatus && orderStatus.nmerror) {
        await Swal.fire("Informasi", orderStatus.nmerror, "info");
    }

    return true;
}
//#endregion

//#region Initialization
function init() {
    tableKonversi = $("#table_konversi").DataTable({
        responsive: true,
        paging: false,
        scrollY: "450px",
        scrollX: "",
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel konversi...",
            search: "",
        },
    });

    tableHasil = $("#table_hasil").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: colHasil,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel hasil...",
            search: "",
        },
        initComplete: function () {
            const searchInput = $('input[type="search"]').addClass(
                "form-control",
            );
            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    });

    timeAwal.value = "00:00";
    timeAkhir.value = "00:00";
    timeMulai.value = "00:00";
    timeSelesai.value = "00:00";
    btnProses.disabled = true;
    daftarKonversiBelumACCFetch();
}

$(document).ready(() => init());
//#endregion
