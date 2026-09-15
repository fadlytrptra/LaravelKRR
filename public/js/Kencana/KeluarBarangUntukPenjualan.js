var csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

// Assign input elements to variables
var divisi = document.getElementById("divisi");
var transaksi = document.getElementById("transaksi");
var objek = document.getElementById("objek");
var kelompok = document.getElementById("kelompok");
var kelut = document.getElementById("kelut");
var subkel = document.getElementById("subkel");
var subkelId = document.getElementById("subkelId");
var primer = document.getElementById("primer");
var sekunder = document.getElementById("sekunder");
var tritier = document.getElementById("tritier");
var tanggal = document.getElementById("tanggal");
var noSp = document.getElementById("noSp");
var type = document.getElementById("type");
var customer = document.getElementById("customer");
var min = document.getElementById("min");
var max = document.getElementById("max");
var satJual = document.getElementById("satJual");
var primer1 = document.getElementById("primer1");
var satPrimer = document.getElementById("satPrimer");
var sekunder1 = document.getElementById("sekunder1");
var satSekunder = document.getElementById("satSekunder");
var tritier1 = document.getElementById("tritier1");
var satTritier = document.getElementById("satTritier");
var konversi = document.getElementById("konversi");

// Assign buttons to variables
var btnProses = document.getElementById("btn_proses");
var btnRefresh = document.getElementById("btn_refresh");

konversi.disabled = true;

$(document).ready(function () {
    $("#tableData").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: "IdType" },
            { title: "IdTransaksi" },
            { title: "Nama Type" },
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
            { targets: [0], width: "15%", className: "fixed-width" },
            { targets: [1], width: "15%", className: "fixed-width" },
            { targets: [2], width: "40%", className: "fixed-width" },
            { targets: [3], width: "10%", className: "fixed-width" },
            { targets: [4], width: "10%", className: "fixed-width" },
            { targets: [5], width: "10%", className: "fixed-width" },
        ],
    });
});

function formatDateToMMDDYYYY(date) {
    let dateObj = new Date(date);
    if (isNaN(dateObj)) {
        return "";
    }

    let month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    let day = dateObj.getDate().toString().padStart(2, "0");
    let year = dateObj.getFullYear();

    return `${month}/${day}/${year}`;
}

function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}

function decodeHtmlEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
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

function updateDataTable(data) {
    var table = $("#tableData").DataTable();

    table.clear();
    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdType),
            escapeHtml(item.IdTransaksi),
            escapeHtml(item.NamaType),
            formatNumber(item.Primer),
            formatNumber(item.Sekunder),
            formatNumber(item.Tritier),
        ]);
    });
    table.draw();
}

$("#tableData tbody").on("click", "tr", function () {
    var table = $("#tableData").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");

    btnProses.disabled = false;

    var data = table.row(this).data();
    let sIdTrans = decodeHtmlEntities(data[1]);

    Tampil_Data(sIdTrans);

    // transaksi.value = decodeHtmlEntities(data[1]);
    // kode.value = decodeHtmlEntities(data[6]);
    // type.value = decodeHtmlEntities(data[2]);
    // primer.value = formatNumber(data[3]);
    // sekunder.value = formatNumber(data[4]);
    // triter.value = formatNumber(data[5]);
});

document.addEventListener("DOMContentLoaded", function () {
    primer.value = "0";
    sekunder.value = "0";
    tritier.value = "0";
    primer1.value = "0";
    sekunder1.value = "0";
    tritier1.value = "0";
    min.value = "0";
    max.value = "0";
    konversi.value = "0";

    ClearForm();
    Tampil_Listbarang();
});

btnRefresh.addEventListener("click", function (e) {
    ClearForm();
    Tampil_Listbarang();
    btnProses.disabled = true;
});

btnProses.addEventListener("click", function (e) {
    if (transaksi.value === "") {
        Swal.fire({
            icon: "error",
            text: "Tidak Ada Data Yang akan DiProses !",
        });
        return;
    }

    if (
        satPrimer.value.trim() === satJual.value.trim() &&
        (parseFloat(primer1.value) < parseFloat(min.value) ||
            parseFloat(primer1.value) > parseFloat(max.value))
    ) {
        Swal.fire({
            icon: "error",
            text: "Jumlah Primer Yang Dikeluarkan Kurang dari MinDo atau Melebihi MaxDO !!",
        });
        return;
    }

    if (
        satSekunder.value.trim() === satJual.value.trim() &&
        (parseFloat(sekunder1.value) < parseFloat(min.value) ||
            parseFloat(sekunder1.value) > parseFloat(max.value))
    ) {
        Swal.fire({
            icon: "error",
            text: "Jumlah Sekunder Yang Dikeluarkan Kurang dari MinDo atau Melebihi MaxDO !!",
        });
        return;
    }

    if (
        satTritier.value.trim() === satJual.value.trim() &&
        (parseFloat(tritier1.value) < parseFloat(min.value) ||
            parseFloat(tritier1.value) > parseFloat(max.value))
    ) {
        Swal.fire({
            icon: "error",
            text: "Jumlah Tritier Yang Dikeluarkan Kurang dari MinDo atau Melebihi MaxDO !!",
        });
        return;
    }

    if (
        satJual.value.trim() !== satPrimer.value.trim() &&
        satJual.value.trim() !== satSekunder.value.trim() &&
        satJual.value.trim() !== satTritier.value.trim()
    ) {
        if (parseInt(konversi.value) === 0) {
            Swal.fire({
                icon: "error",
                text: "Jumlah Konversi Harus Lebih Besar '0' !!",
            }).then(() => {
                konversi.focus();
            });
            return;
        } else if (
            parseFloat(konversi.value) < parseFloat(min.value) ||
            parseFloat(konversi.value) > parseFloat(max.value)
        ) {
            Swal.fire({
                icon: "error",
                text: "Jumlah Konversi Yang Dikeluarkan Kurang dari MinDo atau Melebihi MaxDO !!",
            }).then(() => {
                konversi.focus();
            });
            return;
        }
    }

    if (
        (satPrimer.value.trim() !== "NULL" && parseFloat(primer1.value) > 0) ||
        (satPrimer.value.trim() === "NULL" && parseFloat(primer1.value) === 0)
    ) {
        if (
            (satSekunder.value.trim() !== "NULL" &&
                parseFloat(sekunder1.value) > 0) ||
            (satSekunder.value.trim() === "NULL" &&
                parseFloat(sekunder1.value) === 0)
        ) {
            if (
                (satTritier.value.trim() !== "NULL" &&
                    parseFloat(tritier1.value) > 0) ||
                (satTritier.value.trim() === "NULL" &&
                    parseFloat(tritier1.value) === 0)
            ) {
                Cek_Sesuai_Pemberi(transaksi.value);
            }
        }
    }
});

function proses(sIdTrans) {
    $.ajax({
        type: "PUT",
        url: "/Kencana/AccPenjualanTanpaBarcodeKencana/proses",
        data: {
            _token: csrfToken,
            IDtransaksi: sIdTrans,
            JumlahKeluarPrimer: primer1.value,
            JumlahKeluarSekunder: sekunder1.value,
            JumlahKeluartritier: tritier1.value,
            JumlahKonversi: decodeHtmlEntities(konversi.value),
        },
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.success,
                }).then(() => {
                    ClearForm();
                    Tampil_Listbarang();
                    btnProses.disabled = true;
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function Cek_Sesuai_Pemberi(sIdtrans) {
    $.ajax({
        type: "GET",
        url: "/Kencana/AccPenjualanTanpaBarcodeKencana/cekSesuaiPemberi",
        data: {
            _token: csrfToken,
            idtransaksi: sIdtrans,
        },
        success: function (result) {
            if (result[0].jumlah >= 1) {
                Swal.fire({
                    icon: "info",
                    text:
                        "Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type " +
                        decodeHtmlEntities(type.value) +
                        " Pada divisi pemberi",
                });
            } else {
                proses(sIdtrans);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function Tampil_Data(sIdTrans) {
    $.ajax({
        type: "GET",
        url: "/Kencana/AccPenjualanTanpaBarcodeKencana/tampilData",
        data: {
            _token: csrfToken,
            IDTransaksi: sIdTrans,
        },
        success: function (result) {
            if (result.length !== 0) {
                divisi.value = decodeHtmlEntities(result[0].NamaDivisi);
                objek.value = decodeHtmlEntities(result[0].NamaObjek);
                kelut.value = decodeHtmlEntities(result[0].NamaKelompokUtama);
                kelompok.value = decodeHtmlEntities(result[0].NamaKelompok);
                subkel.value = decodeHtmlEntities(result[0].NamaSubKelompok);
                transaksi.value = decodeHtmlEntities(result[0].IdTransaksi);
                type.value = decodeHtmlEntities(result[0].NamaType);
                satPrimer.value = decodeHtmlEntities(result[0].SatuanPrimer);
                satSekunder.value = decodeHtmlEntities(result[0].SatuanSekunder);
                satTritier.value = decodeHtmlEntities(result[0].SatuanTritier);
                subkelId.value = decodeHtmlEntities(result[0].IdSubkelompok);
                primer.value = formatNumber(result[0].SaldoPrimer);
                sekunder.value = formatNumber(result[0].SaldoSekunder);
                tritier.value = formatNumber(result[0].SaldoTritier);
                customer.value = decodeHtmlEntities(result[0].NamaCust);
                noSp.value = decodeHtmlEntities(result[0].IDSuratPesanan);
                max.value = formatNumber(result[0].MaxKirimDO);
                min.value = formatNumber(result[0].MinKirimDO);
                satJual.value = decodeHtmlEntities(result[0].SatuanJual);
                primer1.value = "0";
                sekunder1.value = "0";
                tritier1.value = "0";
                konversi.value = "0";
                tanggal.value = formatDateToMMDDYYYY(result[0].TglDO);

                if (!primer1.disabled) {
                    primer1.focus();
                }

                if (
                    satJual.value.trim() !== satPrimer.value.trim() &&
                    satJual.value.trim() !== satSekunder.value.trim() &&
                    satJual.value.trim() !== satTritier.value.trim()
                ) {
                    konversi.disabled = false;
                    Swal.fire({
                        icon: "error",
                        text: "Satuan Jual dan Satuan di Gudang Tidak Sama\nAnda Harus Mengisi Jumlah Konversinya!",
                    });
                }
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function Tampil_Listbarang() {
    $.ajax({
        type: "GET",
        url: "/Kencana/AccPenjualanTanpaBarcodeKencana/tampilListBarang",
        data: {
            _token: csrfToken,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result);
            } else {
                var table = $("#tableData").DataTable();
                table.clear().draw();
                Swal.fire({
                    icon: "info",
                    text: "Tidak ada Data yang ditampilkan.",
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

$("#primer1").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sekunder1.focus();
    }
});

$("#sekunder1").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        tritier1.focus();
    }
});

$("#tritier1").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        if (konversi.disabled === false) {
            konversi.focus();
        } else {
            btnProses.focus();
        }
    }
});

$("#konversi").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        btnProses.focus();
    }
});

function ClearForm() {
    divisi.value = "";
    objek.value = "";
    kelut.value = "";
    kelompok.value = "";
    subkel.value = "";
    subkelId.value = "";
    primer.value = "0";
    sekunder.value = "0";
    tritier.value = "0";
    tanggal.value = "";
    noSp.value = "";
    type.value = "";
    customer.value = "";
    min.value = "0";
    max.value = "0";
    satJual.value = "";
    primer1.value = "0";
    sekunder1.value = "0";
    tritier1.value = "0";
    satPrimer.value = "";
    satSekunder.value = "";
    satTritier.value = "";
    konversi.value = "0";
    transaksi.value = "";
}
