var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore

var tanggal = document.getElementById("tanggal");
var today = new Date();
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, "0");
var day = today.getDate().toString().padStart(2, "0");
var todayString = year + "-" + month + "-" + day;
var user = document.getElementById("user");

var divisiNama = document.getElementById("divisiNama");
var objekNama = document.getElementById("objekNama");
var kelompokNama = document.getElementById("kelompokNama");
var kelutNama = document.getElementById("kelutNama");
var subkelNama = document.getElementById("subkelNama");
var divisiNama2 = document.getElementById("divisiNama2");
var objekNama2 = document.getElementById("objekNama2");
var kelompokNama2 = document.getElementById("kelompokNama2");
var kelutNama2 = document.getElementById("kelutNama2");
var subkelNama2 = document.getElementById("subkelNama2");

var kodeTransaksi = document.getElementById("kodeTransaksi");
var PIB = document.getElementById("PIB");
var kodeBarang = document.getElementById("kodeBarang");
var kodeType = document.getElementById("kodeType");
var namaBarang = document.getElementById("namaBarang");
var alasan = document.getElementById("alasan");
var primer = document.getElementById("primer");
var sekunder = document.getElementById("sekunder");
var tritier = document.getElementById("tritier");
var no_primer = document.getElementById("no_primer");
var no_sekunder = document.getElementById("no_sekunder");
var no_tritier = document.getElementById("no_tritier");
var primer2 = document.getElementById("primer2");
var sekunder2 = document.getElementById("sekunder2");
var tritier2 = document.getElementById("tritier2");

var primer3 = document.getElementById("primer3");
var sekunder3 = document.getElementById("sekunder3");
var tritier3 = document.getElementById("tritier3");
var no_primer3 = document.getElementById("no_primer3");
var no_sekunder3 = document.getElementById("no_sekunder3");
var no_tritier3 = document.getElementById("no_tritier3");

var divisiId = document.getElementById("divisiId");
var objekId = document.getElementById("objekId");
var kelompokId = document.getElementById("kelompokId");
var kelutId = document.getElementById("kelutId");
var subkelId = document.getElementById("subkelId");
var divisiId2 = document.getElementById("divisiId2");
var objekId2 = document.getElementById("objekId2");
var kelompokId2 = document.getElementById("kelompokId2");
var kelutId2 = document.getElementById("kelutId2");
var subkelId2 = document.getElementById("subkelId2");

// button
var btn_divisi = document.getElementById("btn_divisi");
var btn_objek = document.getElementById("btn_objek");
var btn_kelompok = document.getElementById("btn_kelompok");
var btn_kelut = document.getElementById("btn_kelut");
var btn_subkel = document.getElementById("btn_subkel");
var btn_divisi2 = document.getElementById("btn_divisi2");
var btn_objek2 = document.getElementById("btn_objek2");
var btn_kelompok2 = document.getElementById("btn_kelompok2");
var btn_kelut2 = document.getElementById("btn_kelut2");
var btn_subkel2 = document.getElementById("btn_subkel2");

var btn_namaBarang = document.getElementById("btn_namaBarang");
var btn_isi = document.getElementById("btn_isi");
var btn_proses = document.getElementById("btn_proses");
var btn_batal = document.getElementById("btn_batal");
var btn_koreksi = document.getElementById("btn_koreksi");
var btn_hapus = document.getElementById("btn_hapus");

var baris3 = document.querySelectorAll("#baris-3 input");

let a; // isi = 1, koreksi = 2, hapus = 3
let tampil; // all data = 1, not all = 2
let terima;
let konvTerima;
let konvBeri;
let kdBarang;
let asalSubkel;
let cekPr;
let cekSek;
let cekTr;
let acc;
let hargaAkhir;

const inputs = Array.from(
    document.querySelectorAll(
        '.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])',
    ),
);
console.log(inputs);

//#region Load Form

$(document).ready(function () {
    getUserId();
});
tanggal.value = todayString;
btn_divisi.disabled = true;
btn_objek.disabled = true;
btn_kelut.disabled = true;
btn_kelompok.disabled = true;
btn_subkel.disabled = true;
btn_namaBarang.disabled = true;
tanggal.focus();
btn_kelut2.disabled = true;
btn_kelompok2.disabled = true;
btn_subkel2.disabled = true;
disableKetik();
var allInputs = document.querySelectorAll("input");
const biarkan = [
    "divisiNama2",
    "pemohon",
    "tanggal",
    "objekNama2",
    "divisiId2",
    "objekId2",
];

let isLoading = false;

// Setup global AJAX handlers
$.ajaxSetup({
    beforeSend: function () {
        isLoading = true;
        $("#loading-screen").css("display", "flex");
    },
    complete: function () {
        isLoading = false;
        $("#loading-screen").css("display", "none");
    },
});

//#endregion

//#region Function Mantap-mantap

// fungsi utk dptin kode barang & pib
function loadKdBarang(kodeType) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "MhnPenerima/getType",
            data: {
                _token: csrfToken,
                kodeType: kodeType,
                subkelId: subkelId.value,
            },
            success: function (result) {
                if (kodeType === result[0].IdType.trim()) {
                    kodeBarang.value = result[0].KodeBarang.trim();
                    PIB.value = result[0].PIB?.trim() || "";
                    resolve(result);
                } else {
                    resolve(null);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

// fungsi utk cek PIB
function cekPIB(PIB) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "MhnPenerima/cekPIB",
            data: {
                _token: csrfToken,
                kodeBarang: kodeBarang.value,
                subkelId2: subkelId2.value,
                PIB: PIB,
                divisiNama2: divisiNama2.value,
                subkelNama2: subkelNama2.value,
            },
            success: function (response) {
                if (response.warning) {
                    Swal.fire({
                        icon: "warning",
                        html: response.warning,
                        returnFocus: false,
                    }).then(() => {
                        btn_namaBarang.focus();
                    });
                }
                resolve(response);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

function loadType(barang, subkel, pib) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "MhnPenerima/cekType",
            data: {
                _token: csrfToken,
                kodeBarang: barang,
                subkelId: subkel,
                PIB: pib,
            },
            success: function (response) {
                console.log(response);
                if (response.typeData && response.typeData.length > 0) {
                    const data = response.typeData[0];

                    kodeType.value = data.IdType
                        ? decodeHtmlEntities(data.IdType.trim())
                        : "-";
                    namaBarang.value = data.NamaType
                        ? decodeHtmlEntities(data.NamaType.trim())
                        : "-";
                    kodeBarang.value = decodeHtmlEntities(
                        data.KodeBarang.trim(),
                    );
                    primer.value = data.SaldoPrimer
                        ? formatNumber(data.SaldoPrimer)
                        : "0";
                    sekunder.value = data.SaldoSekunder
                        ? formatNumber(data.SaldoSekunder)
                        : "0";
                    tritier.value = data.SaldoTritier
                        ? formatNumber(data.SaldoTritier)
                        : "0";
                    no_primer.value = data.satuan_primer
                        ? decodeHtmlEntities(data.satuan_primer.trim())
                        : "";
                    no_sekunder.value = data.satuan_sekunder
                        ? decodeHtmlEntities(data.satuan_sekunder.trim())
                        : "";
                    no_tritier.value = data.satuan_tritier
                        ? decodeHtmlEntities(data.satuan_tritier.trim())
                        : "";
                    konvBeri = data.PakaiAturanKonversi.trim();

                    primer2.value = response.totalSaldoData[0]?.Primer
                        ? formatNumber(response.totalSaldoData[0].Primer)
                        : "0";
                    sekunder2.value = response.totalSaldoData[0]?.Sekunder
                        ? formatNumber(response.totalSaldoData[0].Sekunder)
                        : "0";
                    tritier2.value = response.totalSaldoData[0]?.Tritier
                        ? formatNumber(response.totalSaldoData[0].Tritier)
                        : "0";

                    // console.log('KONVBERI: ', konvBeri);
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

// fungsi cek kode barang dari inputan
function cekBarang(barang) {
    kodeBarangPadded = barang.trim().padStart(9, "0");

    $.ajax({
        type: "GET",
        url: "MhnPenerima/cekKodeBarang",
        data: {
            _token: csrfToken,
            kodeBarang: kodeBarangPadded,
            subkelId: subkelId.value,
            subkelNama: subkelNama.value,
        },
        success: function (response) {
            console.log("Server response:", response); // Check the response
            kodeBarang.value = kodeBarangPadded;

            if (response.warning) {
                Swal.fire({
                    icon: "warning",
                    title: "Kode Barang Tidak Ada!",
                    html: response.warning,
                    returnFocus: false,
                }).then(() => {
                    kodeBarang.select();
                });
            } else if (response.success) {
                console.log("Response is successful, loading type...");
                loadType(kodeBarangPadded, subkelId.value, PIB.value)
                    .then((loadTypeResult) => {
                        if (loadTypeResult) {
                            return terimaKodeBarang(
                                kodeBarang.value,
                                PIB.value,
                            );
                        }
                    })
                    .then((terimaResult) => {
                        if (terimaResult) {
                            console.log(konvBeri, konvTerima, terima);

                            if (terima) {
                                alasan.disabled = false;
                                primer3.disabled = false;
                                sekunder3.disabled = false;
                                tritier3.disabled = false;
                                primer3.focus();
                                primer3.select();
                                const primerValue = no_primer3.value.trim();
                                const sekunderValue = no_sekunder3.value.trim();

                                if (
                                    primerValue === "NULL" &&
                                    sekunderValue === "NULL"
                                ) {
                                    primer3.disabled = true;
                                    sekunder3.disabled = true;
                                    tritier3.disabled = false;
                                    tritier3.select();
                                } else if (
                                    primerValue === "NULL" &&
                                    sekunderValue !== "NULL"
                                ) {
                                    primer3.disabled = true;
                                    sekunder3.disabled = false;
                                    sekunder3.select();
                                } else {
                                    primer3.select();
                                }
                            } else {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Warning",
                                    html: `Satuan Pemberi dan Penerima Tidak sama <br> Atau Tidak ada Type tersebut Pada Divisi Penerima`,
                                    returnFocus: false,
                                }).then(() => {
                                    kodeType.value = selectedType.IdType.trim();
                                    namaBarang.value =
                                        selectedType.NamaType.trim();
                                    primer3.disabled = true;
                                    sekunder3.disabled = true;
                                    tritier3.disabled = true;
                                    btn_namaBarang.focus();
                                });
                            }
                        }
                    })
                    .catch(function (error) {
                        console.error("Error occurred:", error);
                    });
            }
        },
    });
}

function terimaKodeBarang(kodeBarang, PIB) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "MhnPenerima/kodeBarangTerima",
            data: {
                _token: csrfToken,
                kodeBarang: kodeBarang,
                subkelId2: subkelId2.value,
                PIB: PIB,
            },
            success: function (response) {
                // console.log(response);
                if (response.length > 0) {
                    no_primer3.value = decodeHtmlEntities(
                        response[0].satuan_primer.trim(),
                    );
                    no_sekunder3.value = decodeHtmlEntities(
                        response[0].satuan_sekunder.trim(),
                    );
                    no_tritier3.value = decodeHtmlEntities(
                        response[0].satuan_tritier.trim(),
                    );
                    konvTerima = response[0].PakaiAturanKonversi.trim();
                } else {
                    no_primer3.value = "";
                    no_sekunder3.value = "";
                    no_tritier3.value = "";
                    konvTerima = "";
                }

                // console.log('KONVTERIMA: ', konvTerima);

                if (konvBeri !== "Y" && konvTerima !== "Y") {
                    if (
                        no_primer.value === no_primer3.value &&
                        no_sekunder.value === no_sekunder3.value &&
                        no_tritier.value === no_tritier3.value
                    ) {
                        terima = true;
                    } else {
                        terima = false;
                    }
                } else if (konvBeri === "Y" && konvTerima !== "Y") {
                    terima = [no_primer, no_sekunder, no_tritier].some(
                        (item, i) =>
                            item.value ===
                            [no_primer3, no_sekunder3, no_tritier3][i].value,
                    );
                }
                // console.log('apakah terima?', terima);

                resolve(true);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

// Function to handle keydown events for table navigation
function handleTableKeydown(e, tableId) {
    const table = $(`#${tableId}`).DataTable();
    const rows = $(`#${tableId} tbody tr`);
    const rowCount = rows.length;

    if (e.key === "Enter") {
        e.preventDefault();
        const selectedRow = table.row(".selected").data();
        if (selectedRow) {
            Swal.getConfirmButton().click();
        } else {
            const firstRow = $(`#${tableId} tbody tr:first-child`);
            if (firstRow.length) {
                firstRow.click();
                Swal.getConfirmButton().click();
            }
        }
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex === null || currentIndex >= rowCount - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === null || currentIndex <= 0) {
            currentIndex = rowCount - 1;
        } else {
            currentIndex--;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page < pageInfo.pages - 1) {
            table
                .page("next")
                .draw("page")
                .on("draw", function () {
                    currentIndex = 0;
                    const newRows = $(`#${tableId} tbody tr`);
                    const selectedRow = $(newRows[currentIndex]).addClass(
                        "selected",
                    );
                    scrollRowIntoView(selectedRow[0]);
                });
        }
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page > 0) {
            table
                .page("previous")
                .draw("page")
                .on("draw", function () {
                    currentIndex = 0;
                    const newRows = $(`#${tableId} tbody tr`);
                    const selectedRow = $(newRows[currentIndex]).addClass(
                        "selected",
                    );
                    scrollRowIntoView(selectedRow[0]);
                });
        }
    }
}

// Helper function to scroll selected row into view
function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: "nearest" });
}

// fungsi unk menampilkan '&'
function decodeHtmlEntities(str) {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
}

function escapeHtml(text) {
    var map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}

// format angka
function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}

// fungsi dapetin user id unk pemohon
function getUserId() {
    $.ajax({
        type: "GET",
        url: "MhnPenerima/getUserId",
        data: {
            _token: csrfToken,
        },
        success: function (result) {
            pemohon.value = result.user.trim();
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

// menampilkan data dari semua pemohon
function showAllTable() {
    $.ajax({
        type: "GET",
        url: "MhnPenerima/getAllData",
        data: {
            _token: csrfToken,
            divisiId2: divisiId2.value,
            objekNama2: objekNama2.value,
        },
        success: function (result) {
            updateDataTable(result);
            $(".divTable").show();
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

// menampilkan data berdasarkan pemohon
function showTable() {
    $.ajax({
        type: "GET",
        url: "MhnPenerima/getData",
        data: {
            _token: csrfToken,
            divisiId2: divisiId2.value,
            pemohon: pemohon.value,
        },
        success: function (result) {
            updateDataTable(result);
            $(".divTable").show();
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

// fungsi unk update isi tabel
function updateDataTable(data) {
    var table = $("#tableData").DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdTransaksi?.trim() ?? ''),
            escapeHtml(item.NamaType?.trim() ?? ''),
            escapeHtml(item.UraianDetailTransaksi?.trim() ?? ''),
            escapeHtml(item.IdPenerima?.trim() ?? ''),
            escapeHtml(item.SaatAwalTransaksi?.trim() ?? ''),
            escapeHtml(item.NamaDivisi?.trim() ?? ''),
            escapeHtml(item.NamaObjek?.trim() ?? ''),
            escapeHtml(item.NamaKelompokUtama?.trim() ?? ''),
            escapeHtml(item.NamaKelompok?.trim() ?? ''),
            escapeHtml(item.NamaSubKelompok?.trim() ?? ''),
            escapeHtml(formatNumber(item.JumlahPengeluaranPrimer)),
            escapeHtml(formatNumber(item.JumlahPengeluaranSekunder)),
            escapeHtml(formatNumber(item.JumlahPengeluaranTritier)),
            escapeHtml(item.KodeBarang?.trim() ?? ''),
            escapeHtml(item.IdType?.trim() ?? ''),
            escapeHtml(item.SatPrimer?.trim() ?? ''),
            escapeHtml(item.SatSekunder?.trim() ?? ''),
            escapeHtml(item.SatTritier?.trim() ?? ''),
            escapeHtml(item.IdPenerima1?.trim() ?? ''),
        ]);
    });

    table.draw();
}

// fungsi unk update isi tabel
function updateDataTableKecil(data) {
    console.log("Data diterima di updateDataTableKecil:", data);

    if (!Array.isArray(data)) {
        console.warn("Data bukan array:", data);
        return;
    }

    var table = $("#tableHarga").DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdTransaksi.trim()),
            escapeHtml(item.NamaType.trim()),
            escapeHtml(item.UraianDetailTransaksi.trim()),
            escapeHtml(item.IdPenerima.trim()),
            escapeHtml(item.SaatAwalTransaksi.trim()),
        ]);
    });

    table.draw();
}

async function simpan_isi() {
    try {
        await cekKodeBarang();

        cekPr = numeral(primer.value).value() + numeral(primer2.value).value();
        cekSek =
            numeral(sekunder.value).value() + numeral(sekunder2.value).value();
        const cekTr =
            numeral(tritier.value).value() + numeral(tritier2.value).value();

        console.log("primer: ", primer.value, cekPr);
        console.log("sekunder: ", sekunder.value, cekSek);
        console.log(
            "tritier: ",
            tritier.value,
            cekTr,
            tritier3.value,
            tritier2.value,
        );

        console.log("beri: ", konvBeri, "terima: ", konvTerima);

        if (konvBeri !== "Y" && konvTerima !== "Y" && objekId2 !== "099") {
            // console.log(
            //     numeral(primer3.value).value() > numeral(cekPr).value(),
            //     numeral(sekunder3.value).value() > numeral(cekSek).value(),
            //     numeral(tritier3.value).value() > numeral(cekTr).value()
            // );
            // console.log(
            //     parseFloat(primer3.value).toFixed(2),
            //     parseFloat(cekPr).toFixed(2)
            // );
            // console.log(
            //     parseFloat(sekunder3.value).toFixed(2),
            //     parseFloat(cekSek).toFixed(2)
            // );
            // console.log(
            //     parseFloat(tritier3.value).toFixed(2),
            //     parseFloat(cekTr).toFixed(2)
            // );

            if (
                numeral(primer3.value).value() > numeral(cekPr).value() ||
                numeral(sekunder3.value).value() > numeral(cekSek).value() ||
                numeral(tritier3.value).value() > numeral(cekTr).value()
            ) {
                Swal.fire({
                    icon: "warning",
                    title: "Saldo Tidak Cukup!",
                    text: `Saldo Tidak Mencukupi, Cek Kembali Jumlah Yang Akan diMutasi !`,
                    returnFocus: false,
                });
                return;
            }
        }

        if (acc) {
            $.ajax({
                type: "GET",
                url: "MhnPenerima/getListType",
                data: {
                    _token: csrfToken,
                    kodeType: kodeType.value,
                    divisiNama: divisiNama.value,
                    objekNama: objekNama.value,
                },
                success: function (response) {
                    console.log(response);

                    if (response.data && response.data.length > 0) {
                        updateDataTableKecil(response.data[0]);
                    }

                    hargaAkhir = response.txtHarga;

                    // Tambahkan proses simpan PUT setelah sukses ambil list type
                    $.ajax({
                        type: "PUT",
                        url: "MhnPenerima/proses",
                        data: {
                            _token: csrfToken,
                            a: a,
                            divisiNama: divisiNama.value,
                            objekNama: objekNama.value,
                            alasan: alasan.value,
                            tanggal: tanggal.value,
                            kodeType: kodeType.value,
                            pemohon: pemohon.value,
                            primer3: parseFloat(primer3.value),
                            sekunder3: parseFloat(sekunder3.value),
                            tritier3: parseFloat(tritier3.value),
                            subkelId: subkelId.value,
                            subkelId2: subkelId2.value,
                            harga: hargaAkhir,
                            PIB: PIB.value,
                            kodeTransaksi: kodeTransaksi.value,
                        },
                        timeout: 30000,
                        success: function (response) {
                            if (a === 1 && response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    text: response.success,
                                    returnFocus: false,
                                }).then(() => {
                                    primer3.value = 0;
                                    sekunder3.value = 0;
                                    tritier3.value = 0;

                                    if (tampil === 1) {
                                        showAllTable();
                                    } else {
                                        showTable();
                                    }
                                });
                            } else if (a === 2 && response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    text: response.success,
                                    returnFocus: false,
                                }).then(() => {
                                    primer3.value = 0;
                                    sekunder3.value = 0;
                                    tritier3.value = 0;

                                    if (tampil === 1) {
                                        showAllTable();
                                        clearInputs();
                                    } else {
                                        showTable();
                                        clearInputs();
                                    }
                                    disableKetik();
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: response.error,
                                    returnFocus: false,
                                }).then(() => {
                                    btn_divisi.focus();
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("AJAX Error:", error);
                        },
                    });
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            });
        } else {
            Swal.fire({
                icon: "warning",
                text: `Kode Transaksi ${kodeTransaksi.value} Tidak Dapat Di ACC,
                    Sebab Type Barang Belum Ada Pada Sub Kelompok ${subkelNama2.value}. Isi Dulu Di Menu Maintenance Type Barang!!`,
                returnFocus: false,
            });
        }
    } catch (error) {
        console.error("Error occurred in simpan_isi:", error);
    }
}

// cek semua kriteria
function pengecekkan() {
    cekPr = Number(primer3.value) + Number(primer2.value);
    cekSek = Number(sekunder3.value) + Number(sekunder2.value);
    const cekTr = Number(tritier3.value) + Number(tritier2.value);
    if (namaBarang.value === "") {
        Swal.fire({
            icon: "warning",
            title: "Barang Belum Terpilih!",
            text: `Pilih dulu Nama Barang!!`,
            returnFocus: false,
        }).then(() => {
            btn_namaBarang.focus();
        });
        return false;
    }

    if (subkelId2.value === subkelId.value && PIB.value) {
        console.log(subkelId2.value, subkelId.value);

        Swal.fire({
            icon: "warning",
            title: "Mutasi barang tanpa PIB Tidak Bisa dilakukan pada Sub Kelompok yang sama",
            returnFocus: false,
        });
        return false;
    }

    if (a === 1) {
        if (divisiNama2.value === "") {
            Swal.fire({
                icon: "warning",
                title: "Divisi Kosong!",
                text: `Pilih dulu Divisinya!`,
                returnFocus: false,
            }).then(() => {
                btn_divisi2.focus();
            });
            return false;
        } else if (objekNama2.value === "") {
            Swal.fire({
                icon: "warning",
                title: "Objek Kosong!",
                text: `Pilih dulu Objeknya!`,
                returnFocus: false,
            }).then(() => {
                btn_divisi2.focus();
            });
            return false;
        }
    } else {
        if (tanggal.valueAsDate > today) {
            Swal.fire({
                icon: "warning",
                title: "Tanggal Tidak Boleh Lebih Besar Dari Tanggal Sekarang",
                returnFocus: false,
            }).then(() => {
                tanggal.focus();
            });
            return false;
        }
    }
    // console.log(
    //     parseFloat(primer.value).toFixed(2) < parseFloat(cekPr).toFixed(2),
    //     parseFloat(sekunder.value).toFixed(2) < parseFloat(cekSek).toFixed(2),
    //     parseFloat(tritier.value).toFixed(2) < parseFloat(cekTr).toFixed(2)
    // );
    // console.log("cekPr: ", cekPr, "cekSek: ", cekSek, "cekTr: ", cekTr);
    // console.log("primer: ", primer.value, "sekunder: ", sekunder.value, "tritier: ", tritier.value);

    // if (a !== 3) {
    //     if (
    //         parseFloat(primer.value).toFixed(2) <
    //             parseFloat(cekPr).toFixed(2) ||
    //         parseFloat(sekunder.value).toFixed(2) <
    //             parseFloat(cekSek).toFixed(2) ||
    //         parseFloat(tritier.value).toFixed(2) < parseFloat(cekTr).toFixed(2)
    //     ) {
    //         Swal.fire({
    //             icon: "warning",
    //             title: "Saldo Tidak Cukup!",
    //             text: `Saldo Tidak Mencukupi, Cek Kembali Jumlah Yang Akan diMutasi !`,
    //             returnFocus: false,
    //         });
    //         return false;
    //     }
    // }
    return true;
}

function cekKodeBarang() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "MhnPenerima/getDetailId",
            data: {
                _token: csrfToken,
                kodeType: kodeType.value,
                subkelId2: subkelId2.value,
            },
            success: function (result) {
                console.log(result);

                if (result.detailData && result.detailData.length > 0) {
                    kdBarang = result.detailData[0].KodeBarang.trim();
                    asalSubkel = result.detailData[0].IdSubkelompok_Type.trim();
                    acc = result.isValid;

                    resolve(result);
                } else {
                    resolve(null);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

// kosongin input
function clearInputs() {
    allInputs.forEach(function (input) {
        if (input.id && !biarkan.includes(input.id)) {
            input.value = "";
        }
    });

    primer3.value = 0;
    sekunder3.value = 0;
    tritier3.value = 0;

    getUserId();
    primer3.disabled = true;
    sekunder3.disabled = true;
    tritier3.disabled = true;
    alasan.disabled = true;
}

// fungsi bisa ketik
function enableKetik() {
    // hide button isi, tampilkan button proses
    btn_isi.style.display = "none";
    btn_proses.style.display = "inline-block";
    // hide button koreksi, tampilkan button batal
    btn_koreksi.style.display = "none";
    btn_batal.style.display = "inline-block";

    btn_hapus.disabled = true;
}

// fungsi gak bisa ketik
function disableKetik() {
    // hide button proses, tampilkan button isi
    btn_proses.style.display = "none";
    btn_isi.style.display = "inline-block";

    // hide button batal, tampilkan button koreksi
    btn_batal.style.display = "none";
    btn_koreksi.style.display = "inline-block";

    btn_hapus.disabled = false;
}

//#endregion
baris3.forEach(function (input) {
    input.disabled = true;
});

alasan.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn_proses.focus();
    }
});

//#region Add Event Listener
// fungsi berhubungan dengan ENTER & pengecekkan yg kosong2
inputs.forEach((masuk, index) => {
    // Event listener untuk keypress
    masuk.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            handleAction(masuk);
        }
    });

    // Event listener untuk double click
    masuk.addEventListener("dblclick", function () {
        handleAction(masuk);
    });
});

// Fungsi untuk menangani aksi
function handleAction(masuk) {
    if (masuk.id === "kodeBarang" && kodeBarang.value !== "") {
        cekBarang(kodeBarang.value);
    } else if (masuk.id === "primer3") {
        if (parseFloat(primer3.value) > parseFloat(primer.value)) {
            Swal.fire({
                icon: "warning",
                title: "Warning",
                html: `Saldo Primernya Tinggal: ${primer.value}`,
                returnFocus: false,
            }).then(() => {
                primer3.value = 0;
                primer3.select();
            });
        } else {
            sekunder3.disabled = false;
            sekunder3.select();
        }
    } else if (masuk.id === "sekunder3") {
        if (parseFloat(sekunder3.value) > parseFloat(sekunder.value)) {
            Swal.fire({
                icon: "warning",
                title: "Warning",
                html: `Saldo Sekundernya Tinggal: ${sekunder.value}`,
                returnFocus: false,
            }).then(() => {
                sekunder3.value = 0;
                sekunder3.select();
            });
        } else {
            tritier3.disabled = false;
            tritier3.select();
        }
    } else if (masuk.id === "tritier3") {
        if (konvBeri !== "Y") {
            if (
                parseFloat(tritier3.value) > parseFloat(tritier.value) &&
                objekId.value !== "099"
            ) {
                Swal.fire({
                    icon: "warning",
                    title: "Warning",
                    html: `Saldo Tritiernya Tinggal: ${tritier.value}`,
                    returnFocus: false,
                }).then(() => {
                    tritier3.value = 0;
                    tritier3.select();
                });
            } else if (
                tritier3.value === "0" &&
                sekunder3.value === "0" &&
                primer3.value === "0" &&
                objekId.value !== "099"
            ) {
                Swal.fire({
                    icon: "warning",
                    title: "Warning",
                    html: `Barang Yang Dimutasikan Harus Lebih besar 0`,
                    returnFocus: false,
                }).then(() => {
                    tritier3.value = 0;
                    tritier3.select();
                });
            } else {
                alasan.focus();
            }
        } else {
            if (parseFloat(tritier3.value) > 0) {
                if (no_primer.value === no_primer3.value) {
                    alasan.focus();
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Warning",
                        html: `Satuan Tritier harus sama !!...,yaitu= ${no_tritier.value}`,
                        returnFocus: false,
                    });
                }
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Warning",
                    html: `Tritier tidak boleh 0(nol)!!`,
                    returnFocus: false,
                }).then(() => {
                    sekunder3.value = 0;
                    sekunder3.select();
                });
            }
        }
    } else if (masuk.id === "alasan") {
        if (
            tritier3.value === "0" &&
            sekunder3.value === "0" &&
            primer3.value === "0"
        ) {
            Swal.fire({
                icon: "warning",
                title: "Warning",
                html: `Jumlah yg Di BON tdk boleh = 0`,
                returnFocus: false,
            }).then(() => {
                alasan.focus();
            });
        }
        if (a === 1) {
            btn_isi.focus();
        } else if (a === 2) {
            btn_koreksi.focus();
        } else if (a === 3) {
            btn_hapus.focus();
        } else {
            btn_proses().focus();
        }
    } else if (masuk.id === "tanggal") {
        btn_divisi2.focus();
    }
}

// button list divisi penerima
btn_divisi2.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Divisi",
            html: `
                <table id="table_divisi2" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Divisi</th>
                            <th scope="col">Nama Divisi</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_divisi2")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                const table = $("#table_divisi2").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    returnFocus: false,
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    order: [1, "asc"],
                    ajax: {
                        url: "MhnPenerima/getDivisi2",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                        },
                    },
                    columns: [{ data: "IdDivisi" }, { data: "NamaDivisi" }],
                    columnDefs: [
                        {
                            targets: 0,
                            width: "100px",
                        },
                    ],
                });

                $("#table_divisi2 tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                    scrollRowIntoView(this);
                });

                table.on("init.dt", function () {
                    setTimeout(() => {
                        $("#table_divisi2_filter input").trigger("focus");
                    }, 50);
                });

                currentIndex = null;
                const popup = Swal.getPopup();

                popup.onkeydown = (e) => {
                    handleTableKeydown(e, "table_divisi2");
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                divisiId2.value = result.value.IdDivisi.trim();
                divisiNama2.value = decodeHtmlEntities(
                    result.value.NamaDivisi.trim(),
                );

                if (divisiNama2.value !== "") {
                    btn_objek2.disabled = false;
                    btn_objek2.click();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list divisi pemberi
btn_divisi.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Divisi",
            html: `
                <table id="table_divisi" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Divisi</th>
                            <th scope="col">Nama Divisi</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_divisi")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                const table = $("#table_divisi").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    order: [1, "asc"],
                    ajax: {
                        url: "MhnPenerima/getDivisi",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                        },
                    },
                    columns: [{ data: "IdDivisi" }, { data: "NamaDivisi" }],
                    columnDefs: [
                        {
                            targets: 0,
                            width: "100px",
                        },
                    ],
                });

                $("#table_divisi tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                    scrollRowIntoView(this);
                });

                table.on("init.dt", function () {
                    setTimeout(() => {
                        $("#table_divisi_filter input").trigger("focus");
                    }, 50);
                });

                currentIndex = null;
                const popup = Swal.getPopup();

                popup.onkeydown = (e) => {
                    handleTableKeydown(e, "table_divisi");
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                divisiId.value = result.value.IdDivisi.trim();
                divisiNama.value = decodeHtmlEntities(
                    result.value.NamaDivisi.trim(),
                );

                btn_objek.disabled = false;
                btn_objek.click();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list objek penerima
btn_objek2.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Objek",
            html: `
                <table id="table_objek2" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Objek</th>
                            <th scope="col">Nama Objek</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_objek2")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                const table = $("#table_objek2").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    order: [1, "asc"],
                    ajax: {
                        url: "MhnPenerima/getObjek2",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            divisiId2: divisiId2.value,
                        },
                    },
                    columns: [{ data: "IdObjek" }, { data: "NamaObjek" }],
                    columnDefs: [
                        {
                            targets: 0,
                            width: "100px",
                        },
                    ],
                });

                $("#table_objek2 tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                    scrollRowIntoView(this);
                });

                table.on("init.dt", function () {
                    setTimeout(() => {
                        $("#table_objek2_filter input").trigger("focus");
                    }, 50);
                });

                currentIndex = null;
                const popup = Swal.getPopup();

                popup.onkeydown = (e) => {
                    handleTableKeydown(e, "table_objek2");
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                objekId2.value = result.value.IdObjek.trim();
                objekNama2.value = decodeHtmlEntities(
                    result.value.NamaObjek.trim(),
                );
                if (objekNama2.value !== "") {
                    Swal.fire({
                        icon: "question",
                        title: "Menampilkan Semua Data?",
                        showCancelButton: true,
                        confirmButtonText: "Ya",
                        cancelButtonText: "Tidak",
                        returnFocus: false,
                    }).then((confirmResult) => {
                        if (confirmResult.isConfirmed) {
                            tampil = 1;
                            showAllTable();
                        } else {
                            tampil = 2;
                            showTable();
                        }
                        btn_isi.focus();
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btn_objek.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Objek",
            html: `
                <table id="table_objek" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Objek</th>
                            <th scope="col">Nama Objek</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_objek")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                const table = $("#table_objek").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    order: [1, "asc"],
                    ajax: {
                        url: "MhnPenerima/getObjek",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            divisiId: divisiId.value,
                        },
                    },
                    columns: [{ data: "IdObjek" }, { data: "NamaObjek" }],
                    columnDefs: [
                        {
                            targets: 0,
                            width: "100px",
                        },
                    ],
                });

                $("#table_objek tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                    scrollRowIntoView(this);
                });

                table.on("init.dt", function () {
                    setTimeout(() => {
                        $("#table_objek_filter input").trigger("focus");
                    }, 50);
                });

                currentIndex = null;
                const popup = Swal.getPopup();

                popup.onkeydown = (e) => {
                    handleTableKeydown(e, "table_objek");
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                objekId.value = result.value.IdObjek.trim();
                objekNama.value = decodeHtmlEntities(
                    result.value.NamaObjek.trim(),
                );
                // btn_kelut.click();

                if (objekNama.value !== "") {
                    btn_kelut.disabled = false;
                    btn_kelut.click();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok utama penerima
btn_kelut2.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Kelompok Utama",
            html: `
                <table id="table_kelut2" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Kelompok Utama</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_kelut2")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                const table = $("#table_kelut2").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    order: [1, "asc"],
                    ajax: {
                        url: "MhnPenerima/getKelUt2",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            objekId2: objekId2.value,
                        },
                    },
                    columns: [
                        { data: "IdKelompokUtama" },
                        { data: "NamaKelompokUtama" },
                    ],
                    columnDefs: [
                        {
                            targets: 0,
                            width: "100px",
                        },
                    ],
                });

                $("#table_kelut2 tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                    scrollRowIntoView(this);
                });

                table.on("init.dt", function () {
                    setTimeout(() => {
                        $("#table_kelut2_filter input").trigger("focus");
                    }, 50);
                });

                currentIndex = null;
                const popup = Swal.getPopup();

                popup.onkeydown = (e) => {
                    handleTableKeydown(e, "table_kelut2");
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                kelutId2.value = result.value.IdKelompokUtama.trim();
                kelutNama2.value = decodeHtmlEntities(
                    result.value.NamaKelompokUtama.trim(),
                );

                if (kelutNama2.value !== "") {
                    btn_kelompok2.disabled = false;
                    btn_kelompok2.click();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btn_kelut.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Kelompok Utama",
            html: `
                <table id="table_kelut" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Kelompok Utama</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_kelut")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                const table = $("#table_kelut").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    paging: false,
                    destroy: true,
                    scrollY: "400px",
                    scrollCollapse: true,
                    order: [1, "asc"],
                    ajax: {
                        url: "MhnPenerima/getKelUt",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            objekId: objekId.value,
                        },
                    },
                    columns: [
                        { data: "IdKelompokUtama" },
                        { data: "NamaKelompokUtama" },
                    ],
                    columnDefs: [
                        {
                            targets: 0,
                            width: "100px",
                        },
                    ],
                });

                $("#table_kelut tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                    scrollRowIntoView(this);
                });

                table.on("init.dt", function () {
                    setTimeout(() => {
                        $("#table_kelut_filter input").trigger("focus");
                    }, 50);
                });

                currentIndex = null;
                const popup = Swal.getPopup();

                popup.onkeydown = (e) => {
                    handleTableKeydown(e, "table_kelut");
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                kelutId.value = result.value.IdKelompokUtama.trim();
                kelutNama.value = decodeHtmlEntities(
                    result.value.NamaKelompokUtama.trim(),
                );

                if (kelutNama.value !== "") {
                    btn_kelompok.disabled = false;
                    btn_kelompok.click();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok penerima
btn_kelompok2.addEventListener("click", function (e) {
    subkelId2.value = "";
    subkelNama2.value = "";

    try {
        Swal.fire({
            title: "Kelompok",
            html: `
                <table id="table_kelompok2" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Kelompok</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_kelompok2")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                const table = $("#table_kelompok2").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    order: [1, "asc"],
                    ajax: {
                        url: "MhnPenerima/getKelompok2",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            kelutId2: kelutId2.value,
                        },
                    },
                    columns: [
                        { data: "idkelompok" },
                        { data: "namakelompok" },
                    ],
                    columnDefs: [
                        {
                            targets: 0,
                            width: "100px",
                        },
                    ],
                });

                $("#table_kelompok2 tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                    scrollRowIntoView(this);
                });

                table.on("init.dt", function () {
                    setTimeout(() => {
                        $("#table_kelompok2_filter input").trigger("focus");
                    }, 50);
                });

                currentIndex = null;
                const popup = Swal.getPopup();

                popup.onkeydown = (e) => {
                    handleTableKeydown(e, "table_kelompok2");
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                kelompokId2.value = result.value.idkelompok.trim();
                kelompokNama2.value = decodeHtmlEntities(
                    result.value.namakelompok.trim(),
                );

                if (kelutNama2.value !== "") {
                    btn_subkel2.disabled = false;
                    btn_subkel2.click();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btn_kelompok.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Kelompok",
            html: `
                <table id="table_kelompok" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Kelompok</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_kelompok")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                const table = $("#table_kelompok").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    paging: false,
                    destroy: true,
                    scrollY: "400px",
                    scrollCollapse: true,
                    order: [1, "asc"],
                    ajax: {
                        url: "MhnPenerima/getKelompok",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            kelutId: kelutId.value,
                        },
                    },
                    columns: [
                        { data: "idkelompok" },
                        { data: "namakelompok" },
                    ],
                    columnDefs: [
                        {
                            targets: 0,
                            width: "100px",
                        },
                    ],
                });

                $("#table_kelompok tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                    scrollRowIntoView(this);
                });

                table.on("init.dt", function () {
                    setTimeout(() => {
                        $("#table_kelompok_filter input").trigger("focus");
                    }, 50);
                });

                currentIndex = null;
                const popup = Swal.getPopup();

                popup.onkeydown = (e) => {
                    handleTableKeydown(e, "table_kelompok");
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                kelompokId.value = result.value.idkelompok.trim();
                kelompokNama.value = decodeHtmlEntities(
                    result.value.namakelompok.trim(),
                );

                if (kelutNama.value !== "") {
                    btn_subkel.disabled = false;
                    btn_subkel.click();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kelompok penerima
btn_subkel2.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Sub Kelompok",
            html: `
                <table id="table_subkel2" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Sub Kelompok</th>
                            <th scope="col">Nama Sub Kelompok</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_subkel2")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                const table = $("#table_subkel2").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    order: [1, "asc"],
                    ajax: {
                        url: "MhnPenerima/getSubkel2",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            kelompokId2: kelompokId2.value,
                        },
                    },
                    columns: [
                        { data: "IdSubkelompok" },
                        { data: "NamaSubKelompok" },
                    ],
                    columnDefs: [
                        {
                            targets: 0,
                            width: "100px",
                        },
                    ],
                });

                $("#table_subkel2 tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                    scrollRowIntoView(this);
                });

                table.on("init.dt", function () {
                    setTimeout(() => {
                        $("#table_subkel2_filter input").trigger("focus");
                    }, 50);
                });

                currentIndex = null;
                const popup = Swal.getPopup();

                popup.onkeydown = (e) => {
                    handleTableKeydown(e, "table_subkel2");
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                subkelId2.value = result.value.IdSubkelompok.trim();
                subkelNama2.value = result.value.NamaSubKelompok.trim();

                btn_divisi.disabled = false;
                btn_divisi.click();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btn_subkel.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Sub Kelompok",
            html: `
                <table id="table_subkel" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Sub Kelompok</th>
                            <th scope="col">Nama Sub Kelompok</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_subkel")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                const table = $("#table_subkel").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    paging: false,
                    destroy: true,
                    scrollY: "400px",
                    scrollCollapse: true,
                    order: [1, "asc"],
                    ajax: {
                        url: "MhnPenerima/getSubkel",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            kelompokId: kelompokId.value,
                        },
                    },
                    columns: [
                        { data: "IdSubkelompok" },
                        { data: "NamaSubKelompok" },
                    ],
                    columnDefs: [
                        {
                            targets: 0,
                            width: "100px",
                        },
                    ],
                });

                $("#table_subkel tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                    scrollRowIntoView(this);
                });

                table.on("init.dt", function () {
                    setTimeout(() => {
                        $("#table_subkel_filter input").trigger("focus");
                    }, 50);
                });

                currentIndex = null;
                const popup = Swal.getPopup();

                popup.onkeydown = (e) => {
                    handleTableKeydown(e, "table_subkel");
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                subkelId.value = result.value.IdSubkelompok.trim();
                subkelNama.value = result.value.NamaSubKelompok.trim();

                btn_namaBarang.disabled = false;
                btn_namaBarang.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btn_namaBarang.addEventListener("click", function (e) {
    if (subkelNama2.value === "") {
        Swal.fire({
            icon: "warning",
            title: "Sub Kelompok Kosong!",
            text: `Pilih dulu Sub Kelompoknya!!`,
            returnFocus: false,
        }).then(() => {
            btn_divisi2.focus();
        });
        return;
    }

    try {
        Swal.fire({
            title: "Kode Type",
            html: `
                <table id="table_namaBarang" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Kode Type</th>
                            <th scope="col">Nama Barang</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_namaBarang")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "55%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                const table = $("#table_namaBarang").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    order: [1, "asc"],
                    ajax: {
                        url: "MhnPenerima/getSubkelType",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            subkelId: subkelId.value,
                        },
                    },
                    columns: [{ data: "IdType" }, { data: "NamaType" }],
                    columnDefs: [
                        {
                            targets: 0,
                            width: "200px",
                        },
                    ],
                });
                $("#table_namaBarang tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                    scrollRowIntoView(this);
                });

                table.on("init.dt", function () {
                    setTimeout(() => {
                        $("#table_namaBarang_filter input").trigger("focus");
                    }, 50);
                });

                currentIndex = null;
                const popup = Swal.getPopup();

                popup.onkeydown = (e) => {
                    handleTableKeydown(e, "table_namaBarang");
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedType = result.value;
                kodeType.value = selectedType.IdType.trim();
                namaBarang.value = selectedType.NamaType.trim();
                primer3.disabled = false;
                sekunder3.disabled = false;
                tritier3.disabled = false;
                primer3.focus();
                primer3.select();
                loadKdBarang(kodeType.value)
                    .then((loadResult) => {
                        if (loadResult && PIB.value !== "") {
                            return cekPIB(PIB.value);
                        }
                        return null;
                    })
                    .then(() => {
                        return loadType(
                            kodeBarang.value,
                            subkelId.value,
                            PIB.value,
                        );
                    })
                    .then((loadTypeResult) => {
                        if (loadTypeResult) {
                            return terimaKodeBarang(
                                kodeBarang.value,
                                PIB.value,
                            );
                        }
                    })
                    .then((terimaResult) => {
                        if (terimaResult) {
                            console.log(konvBeri, konvTerima, terima);

                            if (terima) {
                                alasan.disabled = false;

                                const primerValue = no_primer3.value.trim();
                                const sekunderValue = no_sekunder3.value.trim();

                                if (
                                    primerValue === "NULL" &&
                                    sekunderValue === "NULL"
                                ) {
                                    primer3.disabled = true;
                                    sekunder3.disabled = true;
                                    tritier3.disabled = false;
                                    tritier3.select();
                                } else if (
                                    primerValue === "NULL" &&
                                    sekunderValue !== "NULL"
                                ) {
                                    primer3.disabled = true;
                                    sekunder3.disabled = false;
                                    tritier3.disabled = false;
                                    sekunder3.select();
                                } else {
                                    primer3.select();
                                }
                            } else {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Warning",
                                    html: `Satuan Pemberi dan Penerima Tidak sama <br> Atau Tidak ada Type tersebut Pada Divisi Penerima`,
                                    returnFocus: false,
                                }).then(() => {
                                    kodeType.value = selectedType.IdType.trim();
                                    namaBarang.value =
                                        selectedType.NamaType.trim();
                                    primer3.disabled = true;
                                    sekunder3.disabled = true;
                                    tritier3.disabled = true;
                                    btn_namaBarang.focus();
                                });
                            }
                        }
                    })
                    .catch(function (error) {
                        console.error("Error occurred:", error);
                    });

                kodeType.addEventListener("change", () =>
                    loadKdBarang(kodeType.value),
                );

                PIB.addEventListener("change", () => {
                    if (
                        PIB.value !== "" &&
                        namaBarang.value.includes("<KITE>")
                    ) {
                        cekPIB(PIB.value);
                    }
                });
            }
        });
    } catch (error) {
        console.error("Error in process:", error);
    }
});

$(document).ready(function () {
    table = $("#tableData").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: "Kd. Transaksi" },
            { title: "Nama Barang" },
            { title: "Alasan Mutasi" },
            { title: "Pemohon" },
            { title: "Tgl. Mohon" },
            { title: "Div Penerima" },
            { title: "Objek" },
            { title: "Kel. Utama" },
            { title: "Kelompok" },
            { title: "Sub Kelompok" },
            { title: "Primer" },
            { title: "Sekunder" },
            { title: "Tritier" },
        ],
        colResize: {
            isEnabled: true,
            hoverClass: "dt-colresizable-hover",
            hasBoundCheck: true,
            minBoundClass: "dt-colresizable-bound-min",
            maxBoundClass: "dt-colresizable-bound-max",
            saveState: true,
            // isResizable: function (column) {
            //     return column.idx !== 2;
            // },
            onResize: function (column) {
                //console.log('...resizing...');
            },
            onResizeEnd: function (column, columns) {
                // console.log('I have been resized!');
            },
            stateSaveCallback: function (settings, data) {
                let stateStorageName =
                    window.location.pathname + "/colResizeStateData";
                localStorage.setItem(stateStorageName, JSON.stringify(data));
            },
            stateLoadCallback: function (settings) {
                let stateStorageName =
                    window.location.pathname + "/colResizeStateData",
                    data = localStorage.getItem(stateStorageName);
                return data != null ? JSON.parse(data) : null;
            },
        },
        scrollY: "300px",
        autoWidth: false,
        scrollX: "100%",
        columnDefs: [
            { targets: [0], width: "13%", className: "fixed-width" },
            { targets: [1], width: "35%", className: "fixed-width" },
            { targets: [2], width: "20%", className: "fixed-width" },
            { targets: [3], width: "15%", className: "fixed-width" },
            { targets: [4], width: "15%", className: "fixed-width" },
            { targets: [5], width: "15%", className: "fixed-width" },
            { targets: [6], width: "15%", className: "fixed-width" },
            { targets: [7], width: "15%", className: "fixed-width" },
            { targets: [8], width: "15%", className: "fixed-width" },
            { targets: [9], width: "13%", className: "fixed-width" },
            { targets: [10], width: "10%", className: "fixed-width" },
            { targets: [11], width: "10%", className: "fixed-width" },
            { targets: [12], width: "10%", className: "fixed-width" },
        ],
    });

    $("#tableData tbody").on("click", "tr", function () {
        selectRow($(this));
    });

    // Fungsi untuk memilih baris dan mengisi data
    function selectRow(row) {
        var table = $("#tableData").DataTable();
        table.$("tr.selected").removeClass("selected");
        row.addClass("selected");

        var data = table.row(row).data();
        // console.log(data);

        kodeTransaksi.value = data[0];
        namaBarang.value = decodeHtmlEntities(data[1]);
        alasan.value = decodeHtmlEntities(data[2]);
        divisiNama2.value = decodeHtmlEntities(data[5]);
        objekNama2.value = decodeHtmlEntities(data[6]);
        kelutNama2.value = decodeHtmlEntities(data[7]);
        kelompokNama2.value = decodeHtmlEntities(data[8]);
        subkelNama2.value = decodeHtmlEntities(data[9]);
        primer3.value = formatNumber(data[10]);
        sekunder3.value = formatNumber(data[11]);
        tritier3.value = formatNumber(data[12]);
        kodeBarang.value = decodeHtmlEntities(data[13]);
        kodeType.value = decodeHtmlEntities(data[14]);
        no_primer3.value = decodeHtmlEntities(data[15]);
        no_sekunder3.value = decodeHtmlEntities(data[16]);
        no_tritier3.value = decodeHtmlEntities(data[17]);
        pemohon.value = data[18];

        $.ajax({
            type: "GET",
            url: "MhnPenerima/getSelect",
            data: {
                _token: csrfToken,
                kodeTransaksi: kodeTransaksi.value,
            },
            success: function (response) {
                if (response) {
                    // console.log(response);

                    divisiId2.value =
                        response.data_selectData[0].IdDivisi.trim();
                    objekId2.value = response.data_selectData[0].IdObjek.trim();
                    kelutId2.value =
                        response.data_selectData[0].IdKelompokUtama.trim();
                    kelompokId2.value =
                        response.data_selectData[0].IdKelompok.trim();
                    subkelId2.value =
                        response.data_selectData[0].IdSubkelompok.trim();

                    divisiId.value = response.identityData[0].IdDivisi.trim();
                    divisiNama.value =
                        response.identityData[0].NamaDivisi.trim();
                    objekId.value = response.identityData[0].IdObjek.trim();
                    objekNama.value = response.identityData[0].NamaObjek.trim();
                    kelutId.value =
                        response.identityData[0].IdKelompokUtama.trim();
                    kelutNama.value =
                        response.identityData[0].NamaKelompokUtama.trim();
                    kelompokId.value =
                        response.identityData[0].IdKelompok.trim();
                    kelompokNama.value =
                        response.identityData[0].NamaKelompok.trim();
                    subkelId.value =
                        response.identityData[0].IdSubkelompok.trim();
                    subkelNama.value =
                        response.identityData[0].NamaSubKelompok.trim();

                    loadType(kodeBarang.value, subkelId.value, PIB.value).catch(
                        (error) => {
                            console.error("Error in loadType:", error);
                        },
                    );
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }

    $(document).on("keydown", function (e) {
        if (isLoading) return; // Blok navigasi saat loading

        let selectedRow = $("#tableData tbody tr.selected");
        let nextRow;

        if (e.key === "ArrowDown") {
            nextRow = selectedRow.length
                ? selectedRow.next("tr")
                : $("#tableData tbody tr").first();
        } else if (e.key === "ArrowUp") {
            nextRow = selectedRow.length
                ? selectedRow.prev("tr")
                : $("#tableData tbody tr").last();
        }

        if (nextRow && nextRow.length) {
            selectRow(nextRow);
            e.preventDefault();

            let container = $("#tableData_wrapper .dataTables_scrollBody")[0];
            let rowTop = nextRow.position().top;
            let rowHeight = nextRow.outerHeight();
            let containerHeight = $(container).height();

            if (rowTop + rowHeight > containerHeight) {
                container.scrollTop += rowHeight;
            }

            if (rowTop < 0) {
                container.scrollTop += rowTop;
            }
        }
    });
});

$(window).on("keydown", function (e) {
    // Cegah scroll halaman dengan tombol panah
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
    }
});

// $("#tableData tbody").on("click", "tr", function () {
//     var table = $("#tableData").DataTable();
//     table.$("tr.selected").removeClass("selected");
//     $(this).addClass("selected");
//     var data = table.row(this).data();
//     // console.log(data);

//     kodeTransaksi.value = data[0];
//     namaBarang.value = decodeHtmlEntities(data[1]);
//     alasan.value = decodeHtmlEntities(data[2]);
//     divisiNama2.value = decodeHtmlEntities(data[5]);
//     objekNama2.value = decodeHtmlEntities(data[6]);
//     kelutNama2.value = decodeHtmlEntities(data[7]);
//     kelompokNama2.value = decodeHtmlEntities(data[8]);
//     subkelNama2.value = decodeHtmlEntities(data[9]);
//     primer3.value = formatNumber(data[10]);
//     sekunder3.value = formatNumber(data[11]);
//     tritier3.value = formatNumber(data[12]);
//     kodeBarang.value = decodeHtmlEntities(data[13]);
//     kodeType.value = decodeHtmlEntities(data[14]);
//     no_primer3.value = decodeHtmlEntities(data[15]);
//     no_sekunder3.value = decodeHtmlEntities(data[16]);
//     no_tritier3.value = decodeHtmlEntities(data[17]);
//     pemohon.value = data[18];

//     $.ajax({
//         type: "GET",
//         url: "MhnPenerima/getSelect",
//         data: {
//             _token: csrfToken,
//             kodeTransaksi: kodeTransaksi.value,
//         },
//         success: function (response) {
//             if (response) {
//                 // console.log(response);

//                 divisiId2.value = response.data_selectData[0].IdDivisi.trim();
//                 objekId2.value = response.data_selectData[0].IdObjek.trim();
//                 kelutId2.value =
//                     response.data_selectData[0].IdKelompokUtama.trim();
//                 kelompokId2.value =
//                     response.data_selectData[0].IdKelompok.trim();
//                 subkelId2.value =
//                     response.data_selectData[0].IdSubkelompok.trim();

//                 divisiId.value = response.identityData[0].IdDivisi.trim();
//                 divisiNama.value = response.identityData[0].NamaDivisi.trim();
//                 objekId.value = response.identityData[0].IdObjek.trim();
//                 objekNama.value = response.identityData[0].NamaObjek.trim();
//                 kelutId.value = response.identityData[0].IdKelompokUtama.trim();
//                 kelutNama.value =
//                     response.identityData[0].NamaKelompokUtama.trim();
//                 kelompokId.value = response.identityData[0].IdKelompok.trim();
//                 kelompokNama.value =
//                     response.identityData[0].NamaKelompok.trim();
//                 subkelId.value = response.identityData[0].IdSubkelompok.trim();
//                 subkelNama.value =
//                     response.identityData[0].NamaSubKelompok.trim();

//                 loadType(kodeBarang.value, subkelId.value, PIB.value).catch(
//                     (error) => {
//                         console.error("Error in loadType:", error);
//                     }
//                 );
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error("Error:", error);
//         },
//     });
// });

$(document).ready(function () {
    table = $("#tableHarga").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: "No. Terima" },
            { title: "Qty" },
            { title: "Harga" },
            { title: "Kurs" },
            { title: "Harga Satuan" },
        ],
    });
});

btn_proses.addEventListener("click", function (e) {
    if (!pengecekkan()) {
        return;
    }
    if (a === 1) {
        simpan_isi();
    }

    if (a === 3) {
        if (kodeTransaksi.value === "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Pilih dulu data yg akan diHAPUS !",
                returnFocus: false,
            });
            return;
        }

        $.ajax({
            url: "MhnPenerima/hapusBarang",
            type: "DELETE",
            data: {
                _token: csrfToken,
                kodeTransaksi: kodeTransaksi.value,
            },
            timeout: 30000,
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: response.success,
                        returnFocus: false,
                    }).then(() => {
                        primer3.value = 0;
                        sekunder3.value = 0;
                        tritier3.value = 0;

                        if (tampil === 1) {
                            showAllTable();
                            clearInputs();
                        } else {
                            showTable();
                            clearInputs();
                        }
                        disableKetik();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: response.error,
                        returnFocus: false,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", error);
            },
        });
        return;
    }

    if (a === 2) {
        $.ajax({
            type: "PUT",
            url: "MhnPenerima/proses",
            data: {
                _token: csrfToken,
                a: a,
                divisiNama: divisiNama.value,
                objekNama: objekNama.value,
                alasan: alasan.value,
                tanggal: tanggal.value,
                kodeType: kodeType.value,
                pemohon: pemohon.value,
                primer3: parseFloat(primer3.value),
                sekunder3: parseFloat(sekunder3.value),
                tritier3: parseFloat(tritier3.value),
                subkelId: subkelId.value,
                subkelId2: subkelId2.value,
                harga: hargaAkhir,
                PIB: PIB.value,
                kodeTransaksi: kodeTransaksi.value,
            },
            timeout: 30000,
            success: function (response) {
                if (a === 1 && response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.success,
                        returnFocus: false,
                    }).then(() => {
                        primer3.value = 0;
                        sekunder3.value = 0;
                        tritier3.value = 0;

                        if (tampil === 1) {
                            showAllTable();
                        } else {
                            showTable();
                        }
                        // disableKetik();
                    });
                } else if (a === 2 && response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.success,
                        returnFocus: false,
                    }).then(() => {
                        primer3.value = 0;
                        sekunder3.value = 0;
                        tritier3.value = 0;

                        if (tampil === 1) {
                            showAllTable();
                            clearInputs();
                        } else {
                            showTable();
                            clearInputs();
                        }
                        disableKetik();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.error,
                        returnFocus: false,
                    }).then(() => {
                        btn_divisi.focus();
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", error);
            },
        });
    }
});

// button isi event listener
btn_isi.addEventListener("click", function () {
    a = 1;
    // $('#tableData').hide();
    if (divisiNama2.value == "" || objekNama2.value == "") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text:
                divisiNama2.value == ""
                    ? "Pilih dulu divisinya!"
                    : "Pilih dulu objeknya!",
            returnFocus: false,
        }).then(() => {
            (divisiNama2.value == "" ? btn_divisi2 : btn_objek2).focus();
        });
        return;
    }
    var table = $("#tableData").DataTable();
    table.$("tr.selected").removeClass("selected");
    getUserId()
    enableKetik();
    btn_kelut2.disabled = false;
    btn_kelut2.click();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    primer3.value = 0;
    sekunder3.value = 0;
    tritier3.value = 0;
    btn_hapus.disabled = true;
});

// button batal event listener
btn_batal.addEventListener("click", function () {
    // tampilin isi tabel
    if (tampil === 1) {
        showAllTable();
    } else if (tampil === 2) {
        showTable();
    }

    // $('#tableData').show();

    disableKetik();
    clearInputs();
});

// button koreksi event listener
btn_koreksi.addEventListener("click", function () {
    a = 2;
    // tampilin isi tabel
    // $('#tableData').show();

    btn_hapus.disabled = true;

    if (kodeBarang.value === "") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Pilih dulu data yg akan diKOREKSI !",
            returnFocus: false,
        });
        return;
    } else {
        primer3.disabled = false;
        sekunder3.disabled = false;
        tritier3.disabled = false;
        alasan.disabled = false;

        primer3.select();

        // hide button isi, tampilkan button proses
        btn_isi.style.display = "none";
        btn_proses.style.display = "inline-block";
        // hide button koreksi, tampilkan button batal
        btn_koreksi.style.display = "none";
        btn_batal.style.display = "inline-block";
    }
});

// button hapus event listener
btn_hapus.addEventListener("click", function () {
    a = 3;
    // hide button isi, tampilkan button proses
    btn_isi.style.display = "none";
    btn_proses.style.display = "inline-block";
    // hide button koreksi, tampilkan button batal
    btn_koreksi.style.display = "none";
    btn_batal.style.display = "inline-block";

    btn_hapus.disabled = true;
    btn_proses.focus();
});
//#endregion
