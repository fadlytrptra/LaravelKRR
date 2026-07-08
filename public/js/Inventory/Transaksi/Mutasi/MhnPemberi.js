var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
var divisiId = document.getElementById("divisiId");
var divisiNama = document.getElementById("divisiNama");
var btnDivisi = document.getElementById("btn_divisi");
var tanggal = document.getElementById("tanggal");
var objekId = document.getElementById("objekId");
var objekNama = document.getElementById("objekNama");
var btnObjek = document.getElementById("btn_objek");
var kelompokId = document.getElementById("kelompokId");
var kelompokNama = document.getElementById("kelompokNama");
var btnKelompok = document.getElementById("btn_kelompok");
var kelutId = document.getElementById("kelutId");
var kelutNama = document.getElementById("kelutNama");
var btnKelut = document.getElementById("btn_kelut");
var subkelId = document.getElementById("subkelId");
var subkelNama = document.getElementById("subkelNama");
var btnSubkel = document.getElementById("btn_subkel");
var idType = document.getElementById("idType");
var kodeBarang = document.getElementById("kodeBarang");
var pib = document.getElementById("pib");
var primer = document.getElementById("primer");
var satuanPrimer = document.getElementById("satuanPrimer");
var type = document.getElementById("type");
var btnType = document.getElementById("btn_type");
var sekunder = document.getElementById("sekunder");
var satuanSekunder = document.getElementById("satuanSekunder");
var jmlKeranjang = document.getElementById("jmlKeranjang");
var tritier = document.getElementById("tritier");
var satuanTritier = document.getElementById("satuanTritier");
var primer3 = document.getElementById("primer3");
var sekunder3 = document.getElementById("sekunder3");
var tritier3 = document.getElementById("tritier3");
var hargaSatuan = document.getElementById("hargaSatuan");
var hargaSatuanLabel = document.getElementById("hargaSatuanLabel");

var primer2 = document.getElementById("primer2");
var sekunder2 = document.getElementById("sekunder2");
var tritier2 = document.getElementById("tritier2");
var satuanPrimer2 = document.getElementById("satuanPrimer2");
var satuanSekunder2 = document.getElementById("satuanSekunder2");
var satuanTritier2 = document.getElementById("satuanTritier2");

var divisiId2 = document.getElementById("divisiId2");
var divisiNama2 = document.getElementById("divisiNama2");
var btnDivisi2 = document.getElementById("btn_divisi2");
var idTransaksi = document.getElementById("idTransaksi");
var objekId2 = document.getElementById("objekId2");
var objekNama2 = document.getElementById("objekNama2");
var btnObjek2 = document.getElementById("btn_objek2");
var kelompokId2 = document.getElementById("kelompokId2");
var kelompokNama2 = document.getElementById("kelompokNama2");
var btnKelompok2 = document.getElementById("btn_kelompok2");
var kelutId2 = document.getElementById("kelutId2");
var kelutNama2 = document.getElementById("kelutNama2");
var btnKelut2 = document.getElementById("btn_kelut2");
var subkelId2 = document.getElementById("subkelId2");
var subkelNama2 = document.getElementById("subkelNama2");
var btnSubkel2 = document.getElementById("btn_subkel2");

var btnIsi = document.getElementById("btn_isi");
var btnProses = document.getElementById("btn_proses");
var btnBatal = document.getElementById("btn_batal");
var btnKoreksi = document.getElementById("btn_koreksi");
var btnHapus = document.getElementById("btn_hapus");

var today = new Date().toISOString().slice(0, 10);
tanggal.value = today;
hargaSatuan.style.display = "none";
hargaSatuanLabel.style.display = "none";

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

var idUser;

function getUserId() {
    $.ajax({
        type: "GET",
        url: "MhnPemberi/getUserId",
        data: {
            _token: csrfToken,
        },
        success: function (result) {
            idUser = result.user;
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

var TPemberi;

$(document).ready(function () {
    getUserId();
    let table = $("#tableData").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: "Kode" },
            { title: "Nama Barang" },
            { title: "Alasan Mutasi" },
            { title: "Kelut Pemberi" },
            { title: "Kel Pemberi" },
            { title: "SubKel Pemberi" },
            { title: "Pemohon" },
            { title: "Tgl Mohon" },
        ],
        scrollY: "300px",
        autoWidth: false,
        scrollX: "100%",
        columnDefs: [
            { targets: [0], width: "10%", className: "fixed-width" },
            { targets: [1], width: "25%", className: "fixed-width" },
            { targets: [2], width: "25%", className: "fixed-width" },
            { targets: [3], width: "10%", className: "fixed-width" },
            { targets: [4], width: "10%", className: "fixed-width" },
            { targets: [5], width: "10%", className: "fixed-width" },
            { targets: [6], width: "10%", className: "fixed-width" },
            { targets: [7], width: "10%", className: "fixed-width" },
        ],
    });

    // Event untuk klik baris pada tabel
    $("#tableData tbody").on("click", "tr", function () {
        selectRow($(this));
    });

    // Fungsi untuk memilih baris dan mengisi data
    function selectRow(row) {
        let table = $("#tableData").DataTable();
        table.$("tr.selected").removeClass("selected");
        row.addClass("selected");

        let data = table.row(row).data();
        if (!data) return;

        ClearForm();

        IdTrans = decodeHtmlEntities(data[0]);
        let date = data[7];
        let parts = date.split("/");
        let formattedDate = `${parts[2]}-${parts[0].padStart(
            2,
            "0"
        )}-${parts[1].padStart(2, "0")}`;

        idTransaksi.value = decodeHtmlEntities(data[0]);
        kelutNama.value = decodeHtmlEntities(data[3]);
        kelompokNama.value = decodeHtmlEntities(data[4]);
        subkelNama.value = decodeHtmlEntities(data[5]);
        tanggal.value = formattedDate;
        uraian.value = decodeHtmlEntities(data[2]);
        type.value = decodeHtmlEntities(data[1]);
        TPemberi = decodeHtmlEntities(data[6]);

        TampilItem(IdTrans);
    }

    // Event listener untuk menangkap tombol panah
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

function ClearForm() {
    // Clear text inputs
    kelutId.value = "";
    kelutNama.value = "";
    kelompokId.value = "";
    kelompokNama.value = "";
    subkelId.value = "";
    subkelNama.value = "";
    idType.value = "";
    kodeBarang.value = "";
    type.value = "";
    // pib.value = '';
    primer.value = 0;
    satuanPrimer.value = "";
    sekunder.value = 0;
    satuanSekunder.value = "";
    jmlKeranjang.value = "";
    tritier.value = 0;
    satuanTritier.value = "";
    primer3.value = 0;
    sekunder3.value = 0;
    tritier3.value = 0;

    primer2.value = 0;
    sekunder2.value = 0;
    tritier2.value = 0;

    // Clear second set of inputs
    divisiId2.value = "";
    divisiNama2.value = "";
    objekId2.value = "";
    objekNama2.value = "";
    kelompokId2.value = "";
    kelompokNama2.value = "";
    kelutId2.value = "";
    kelutNama2.value = "";
    subkelId2.value = "";
    subkelNama2.value = "";
    idTransaksi.value = "";

    satuanPrimer2.value = "";
    satuanSekunder2.value = "";
    satuanTritier2.value = "";

    TPemberi = "";

    primer2.disabled = false;
    sekunder2.disabled = false;
}

// var TPemberi;
// $('#tableData tbody').on('click', 'tr', function () {
//     var table = $('#tableData').DataTable();
//     table.$('tr.selected').removeClass('selected');
//     $(this).addClass('selected');
//     var data = table.row(this).data();
//     ClearForm();

//     IdTrans = decodeHtmlEntities(data[0]);

//     let date = data[7];
//     let parts = date.split('/');
//     let formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;

//     idTransaksi.value = decodeHtmlEntities(data[0]);
//     kelutNama.value = decodeHtmlEntities(data[3]);
//     kelompokNama.value = decodeHtmlEntities(data[4]);
//     subkelNama.value = decodeHtmlEntities(data[5]);
//     tanggal.value = formattedDate;
//     uraian.value = decodeHtmlEntities(data[2]);
//     type.value = decodeHtmlEntities(data[1]);
//     TPemberi = decodeHtmlEntities(data[6]);

//     TampilItem(IdTrans);
// });

function TampilItem(IdTrans) {
    $.ajax({
        type: "GET",
        url: "MhnPemberi/tampilItem",
        data: {
            XIdTransaksi: IdTrans,
            _token: csrfToken,
        },
        success: function (result) {
            if (result) {
                divisiId2.value = decodeHtmlEntities(result[0].IdDivisi);
                objekId2.value = decodeHtmlEntities(result[0].IdObjek);
                kelutId2.value = decodeHtmlEntities(result[0].IdKelompokUtama);
                kelompokId2.value = decodeHtmlEntities(result[0].IdKelompok);
                subkelId2.value = decodeHtmlEntities(result[0].IdSubkelompok);
                divisiNama2.value = decodeHtmlEntities(result[0].NamaDivisi);
                objekNama2.value = decodeHtmlEntities(result[0].NamaObjek);
                kelutNama2.value = decodeHtmlEntities(
                    result[0].NamaKelompokUtama
                );
                kelompokNama2.value = decodeHtmlEntities(
                    result[0].NamaKelompok
                );
                subkelNama2.value = decodeHtmlEntities(
                    result[0].NamaSubKelompok
                );
                satuanPrimer2.value = result[0].Satuan_Primer
                    ? decodeHtmlEntities(result[0].Satuan_Primer.trim())
                    : "Null";
                satuanSekunder2.value = result[0].Satuan_Sekunder
                    ? decodeHtmlEntities(result[0].Satuan_Sekunder.trim())
                    : "Null";
                satuanTritier2.value = result[0].Satuan_Tritier
                    ? decodeHtmlEntities(result[0].Satuan_Tritier.trim())
                    : "Null";
                primer2.value = formatNumber(result[0].JumlahPengeluaranPrimer);
                sekunder2.value = formatNumber(
                    result[0].JumlahPengeluaranSekunder
                );
                tritier2.value = formatNumber(
                    result[0].JumlahPengeluaranTritier
                );
                idType.value = decodeHtmlEntities(result[0].IdType);
                kodeBarang.value = decodeHtmlEntities(result[0].KodeBarang);
                pib.value = formatNumber(result[0].SaldoPrimer);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });

    $.ajax({
        type: "GET",
        url: "MhnPemberi/tampilItem2",
        data: {
            XIdTransaksi: IdTrans,
            _token: csrfToken,
        },
        success: function (result) {
            if (result) {
                divisiId.value = decodeHtmlEntities(result[0].IdDivisi);
                objekId.value = decodeHtmlEntities(result[0].IdObjek);
                kelutId.value = decodeHtmlEntities(result[0].IdKelompokUtama);
                kelompokId.value = decodeHtmlEntities(result[0].IdKelompok);
                subkelId.value = decodeHtmlEntities(result[0].IdSubkelompok);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
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
                        "selected"
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
                        "selected"
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
    table.clear().draw();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdTransaksi),
            escapeHtml(item.NamaType),
            item.UraianDetailTransaksi
                ? escapeHtml(item.UraianDetailTransaksi)
                : "",
            escapeHtml(item.NamaKelompokUtama),
            escapeHtml(item.NamaKelompok),
            escapeHtml(item.NamaSubKelompok),
            escapeHtml(item.IdPemberi),
            formatDateToMMDDYYYY(item.SaatAwalTransaksi),
            escapeHtml(item.NamaDivisi),
            escapeHtml(item.NamaObjek),
        ]);
    });

    table.draw();
}

function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}

function Tombol(angka) {
    if (angka === 1) {
        btnIsi.disabled = false;
        btnHapus.disabled = false;
        btnKoreksi.disabled = false;
        btnProses.disabled = true;
        btnBatal.disabled = true;
        btnIsi.focus();
    } else {
        btnIsi.disabled = true;
        btnHapus.disabled = true;
        btnKoreksi.disabled = true;
        btnBatal.disabled = false;
        if (Pil === 1) {
            btnProses.disabled = true;
        } else {
            btnProses.disabled = false;
        }
    }
}

function OrderText(angka) {
    if (angka === 1) {
        btnDivisi.disabled = false;
    } else if (angka === 2) {
        btnKelut.disabled = true;
        btnKelompok.disabled = true;
        btnSubkel.disabled = true;
        btnType.disabled = true;
        btnDivisi2.disabled = true;
        btnObjek2.disabled = true;
        btnKelut2.disabled = true;
        btnKelompok2.disabled = true;
        btnSubkel2.disabled = true;
    } else if (angka === 3) {
        btnKelut.disabled = true;
        btnKelompok.disabled = true;
        btnSubkel.disabled = true;
        btnType.disabled = true;
        btnDivisi2.disabled = false;
        btnObjek2.disabled = false;
        btnKelut2.disabled = false;
        btnKelompok2.disabled = false;
        btnSubkel2.disabled = false;
    }
}

var Pil;
document.addEventListener("DOMContentLoaded", function () {
    $(".keranjang").hide();
    $(".kosong").show();
    Pil = 0;
    OrderText(1);
    tanggal.focus();
});

$("#tanggal").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        btnDivisi.focus();
    }
});

hargaSatuan.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        hargaSatuan.value = numeral(hargaSatuan.value).format("0,0.00");
        btnDivisi2.disabled = false;
        btnDivisi2.focus();
    }
});

// button list divisi
btnDivisi.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Divisi",
            html: `
                <table id="table_list" class="table">
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
                const selectedData = $("#table_list")
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getDivisi",
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

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                divisiId.value = decodeHtmlEntities(
                    result.value.IdDivisi.trim()
                );
                divisiNama.value = decodeHtmlEntities(
                    result.value.NamaDivisi.trim()
                );

                if (divisiId.value === "EXP") {
                    $(".keranjang").show();
                    $(".kosong").hide();
                } else {
                    $(".keranjang").hide();
                    $(".kosong").show();
                }
                btnObjek.disabled = false;
                btnObjek.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

var Pilih;
var tgl1, tgl2;

// button list objek
btnObjek.addEventListener("click", function (e) {
    kelutId.value = "";
    kelutNama.value = "";
    kelompokId.value = "";
    kelompokNama.value = "";
    subkelId.value = "";
    subkelNama.value = "";
    Pilih = 0;

    try {
        Swal.fire({
            title: "Objek",
            html: `
                <table id="table_list" class="table">
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
                const selectedData = $("#table_list")
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MhnPemberi/getObjek",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                divisi: divisiId.value,
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

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                objekId.value = decodeHtmlEntities(result.value.IdObjek.trim());
                objekNama.value = decodeHtmlEntities(
                    result.value.NamaObjek.trim()
                );

                Swal.fire({
                    title: "Menampilkan Semua Data ??..",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Ya",
                    cancelButtonText: "Tidak",
                    returnFocus: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Tgl Awal (bln/tgl/thn) :",
                            html: '<input type="date" id="tglAwal" class="swal2-input">',
                            showCancelButton: true,
                            confirmButtonText: "Ok",
                            cancelButtonText: "Cancel",
                            returnFocus: false,
                            didOpen: () => {
                                const today = new Date()
                                    .toISOString()
                                    .split("T")[0];
                                document.getElementById("tglAwal").value =
                                    today;
                            },
                            preConfirm: () => {
                                return document.getElementById("tglAwal").value;
                            },
                        }).then((result) => {
                            if (result.isConfirmed) {
                                tgl1 = formatDateToMMDDYYYY(result.value);
                                Swal.fire({
                                    title: "Tgl Akhir (bln/tgl/thn) :",
                                    html: '<input type="date" id="tglAkhir" class="swal2-input">',
                                    showCancelButton: true,
                                    confirmButtonText: "Ok",
                                    cancelButtonText: "Cancel",
                                    returnFocus: false,
                                    didOpen: () => {
                                        const today = new Date()
                                            .toISOString()
                                            .split("T")[0];
                                        document.getElementById(
                                            "tglAkhir"
                                        ).value = today;
                                    },
                                    preConfirm: () => {
                                        return document.getElementById(
                                            "tglAkhir"
                                        ).value;
                                    },
                                    didClose: () => {
                                        Tombol(1);
                                    },
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        tgl2 = formatDateToMMDDYYYY(
                                            result.value
                                        );
                                        TampilAllData();
                                    }
                                });
                            }
                        });
                    } else {
                        Swal.fire({
                            title: "Tgl Awal (bln/tgl/thn) :",
                            html: '<input type="date" id="tglAwal" class="swal2-input">',
                            showCancelButton: true,
                            confirmButtonText: "Ok",
                            cancelButtonText: "Cancel",
                            returnFocus: false,
                            didOpen: () => {
                                const today = new Date()
                                    .toISOString()
                                    .split("T")[0];
                                document.getElementById("tglAwal").value =
                                    today;
                            },
                            preConfirm: () => {
                                return document.getElementById("tglAwal").value;
                            },
                        }).then((result) => {
                            if (result.isConfirmed) {
                                tgl1 = formatDateToMMDDYYYY(result.value);
                                Swal.fire({
                                    title: "Tgl Akhir (bln/tgl/thn) :",
                                    html: '<input type="date" id="tglAkhir" class="swal2-input">',
                                    showCancelButton: true,
                                    confirmButtonText: "Ok",
                                    cancelButtonText: "Cancel",
                                    returnFocus: false,
                                    didOpen: () => {
                                        const today = new Date()
                                            .toISOString()
                                            .split("T")[0];
                                        document.getElementById(
                                            "tglAkhir"
                                        ).value = today;
                                    },
                                    didClose: () => {
                                        Tombol(1);
                                    },
                                    preConfirm: () => {
                                        return document.getElementById(
                                            "tglAkhir"
                                        ).value;
                                    },
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        tgl2 = formatDateToMMDDYYYY(
                                            result.value
                                        );
                                        TampilData();
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function TampilAllData() {
    $.ajax({
        type: "GET",
        url: "MhnPemberi/tampilAllData",
        data: {
            XIdDivisi: divisiId.value,
            XIdObjek: objekId.value,
            tgl1: tgl1,
            tgl2: tgl2,
            _token: csrfToken,
        },
        success: function (result) {
            var table = $("#tableData").DataTable();

            if (result.length !== 0) {
                updateDataTable(result);
            } else {
                table.clear().draw();
                Swal.fire({
                    icon: "info",
                    title:
                        "Tidak ada Data Yang DiKirim Oleh Divisi : " +
                        decodeHtmlEntities(divisiNama.value),
                    returnFocus: false,
                }).then(() => {
                    btnIsi.focus();
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function TampilData() {
    $.ajax({
        type: "GET",
        url: "MhnPemberi/tampilData",
        data: {
            XIdDivisi: divisiId.value,
            XIdObjek: objekId.value,
            tgl1: tgl1,
            tgl2: tgl2,
            _token: csrfToken,
        },
        success: function (result) {
            var table = $("#tableData").DataTable();

            if (result.length !== 0) {
                updateDataTable(result);
            } else {
                table.clear().draw();
                Swal.fire({
                    icon: "info",
                    title:
                        "Tidak ada Data Yang DiKirim Oleh User : " +
                        decodeHtmlEntities(idUser),
                    returnFocus: false,
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

btnBatal.addEventListener("click", function (e) {
    primer2.disabled = false;
    sekunder2.disabled = false;

    if (Pilih === 0) {
        TampilAllData();
    } else {
        TampilData();
    }

    Tombol(1);
    OrderText(2);
});

btnIsi.addEventListener("click", function (e) {
    Pil = 1;
    OrderText(2);
    Tombol(2);
    ClearForm();
    var table = $("#tableData").DataTable();
    table.$("tr.selected").removeClass("selected");
    btnKelut.disabled = false;
    btnKelut.focus();
});

var CekPrimer, CekSekunder, CekTritier;
btnProses.addEventListener("click", function (e) {
    let jalan = true;
    if (new Date(tanggal.value) > new Date()) {
        Swal.fire({
            icon: "error",
            text: "Tanggal Mohon lebih besar dari tanggal hari ini",
        });
        return;
    }

    if (
        subkelId.value.trim() === subkelId2.value.trim() ||
        divisiId.value.trim() === divisiId2.value.trim()
    ) {
        Swal.fire({
            icon: "error",
            text: "Divisi Penerima dan Pemberi tidak boleh sama !!",
        }).then(() => {
            btn_subkel2.focus();
        });
        return;
    }

    if (
        parseFloat(primer2.value) === 0 &&
        parseFloat(sekunder2.value) === 0 &&
        parseFloat(tritier2.value) === 0
    ) {
        Swal.fire({
            icon: "error",
            text: "Jumlah Barang Yang dimutasi harap di isi",
        }).then(() => {
            primer2.focus();
            primer2.select();
        });
        return;
    }

    if (parseFloat(tritier2.value) <= 0) {
        Swal.fire({
            icon: "error",
            text: "Nilai Tritier Harus di isi",
        });
        return;
    }

    if (parseFloat(subkelId2.value) < 0 || subkelId2.value.trim() === "") {
        Swal.fire({
            icon: "error",
            text: "Tujuan Mutasi Harap Diisi !!!",
            returnFocus: false,
        }).then(() => {
            btn_subkel2.focus();
        });
        return;
    }

    if (Pil === 1) {
        CekPrimer = parseFloat(primer2.value) + parseFloat(primer3.value);
        CekSekunder = parseFloat(sekunder2.value) + parseFloat(sekunder3.value);
        CekTritier = formatNumber(
            parseFloat(tritier2.value) + parseFloat(tritier3.value)
        );

        if (
            parseFloat(primer.value) < CekPrimer ||
            parseFloat(sekunder.value) < CekSekunder ||
            parseFloat(tritier.value) < CekTritier
        ) {
            Swal.fire({
                icon: "error",
                text: "Saldo Tidak Mencukupi, Cek Kembali Jumlah Yang Akan diMutasi !",
                returnFocus: false,
            });
            jalan = false;
            return;
        }

        LoadPenerima()
            .then(function (loadPenerima) {
                if (!loadPenerima) {
                    jalan = false;
                    return;
                } else {
                    btnProses.disabled = false;
                    primer2.focus();
                    primer2.select();
                }
            })
            .catch(function (error) {
                console.error("Error occurred:", error);
            });
    }

    if (jalan) {
        SaveData();
        // Tombol(1);
        // OrderText(2);
    }
});

function SaveData() {
    if (Pil === 1) {
        if (uraian.value == "") {
            Swal.fire({
                icon: "error",
                text: "Uraian Detail Transaksi Harap diisi",
            });
            uraian.focus();
            return;
        }
        if (kondisi == 2 || kondisi == 3) {
            $.ajax({
                type: "PUT",
                url: "MhnPemberi/insPersediaan",
                data: {
                    _token: csrfToken,
                    XIdType: idType.value,
                    XJumlahKeluarTritier: tritier2.value,
                    hargaSatuan: hargaSatuan.value,
                    kondisi: kondisi,
                },
                success: function (result) {
                    // primer2.value = 0;
                    // sekunder2.value = 0;
                    // tritier2.value = 0;
                    // primer2.focus();
                    // if (Pilih === 0) {
                    //     TampilAllData();
                    // } else {
                    //     TampilData();
                    // }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            });
        }

        $.ajax({
            type: "PUT",
            url: "MhnPemberi/saveData",
            data: {
                _token: csrfToken,
                XUraianDetailTransaksi: uraian.value
                    ? decodeHtmlEntities(uraian.value)
                    : "",
                XIdType: idType.value,
                Xsaatawaltransaksi: tanggal.value,
                XJumlahKeluarPrimer: primer2.value,
                XJumlahKeluarSekunder: sekunder2.value,
                XJumlahKeluarTritier: tritier2.value,
                XAsalIdSubKelompok: subkelId.value,
                XTujuanIdSubkelompok: subkelId2.value,
                XPIB: pib.value,
                Jumlah: jmlKeranjang.value,
            },
            success: function (result) {
                idTransaksi.value = decodeHtmlEntities(result.idtransaksi);
                Swal.fire({
                    icon: "success",
                    text: result.success,
                    returnFocus: false,
                }).then(() => {
                    primer2.value = 0;
                    sekunder2.value = 0;
                    tritier2.value = 0;
                    // primer2.focus();
                    // primer2.select();
                    if (Pilih === 0) {
                        TampilAllData();
                    } else {
                        TampilData();
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    } else if (Pil === 2) {
        $.ajax({
            type: "PUT",
            url: "MhnPemberi/koreksiData",
            data: {
                _token: csrfToken,
                XIdTransaksi: idTransaksi.value,
                XUraianDetailTransaksi: uraian.value
                    ? decodeHtmlEntities(uraian.value)
                    : "",
                XJumlahKeluarPrimer: primer2.value,
                XJumlahKeluarSekunder: sekunder2.value,
                XJumlahKeluarTritier: tritier2.value,
                XTujuanSubkelompok: subkelId2.value,
            },
            success: function (result) {
                Swal.fire({
                    icon: "success",
                    text: result.success,
                    returnFocus: false,
                }).then(() => {
                    if (Pilih === 0) {
                        TampilAllData();
                    } else {
                        TampilData();
                    }
                    ClearForm();
                    Tombol(1);
                    OrderText(2);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    } else if (Pil === 3) {
        $.ajax({
            type: "DELETE",
            url: "MhnPemberi/deleteData",
            data: {
                _token: csrfToken,
                XIdTransaksi: idTransaksi.value,
            },
            success: function (result) {
                Swal.fire({
                    icon: "success",
                    text: result.success,
                    returnFocus: false,
                }).then(() => {
                    if (Pilih === 0) {
                        TampilAllData();
                    } else {
                        TampilData();
                    }
                    ClearForm();
                    Tombol(1);
                    OrderText(2);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
}

// button list kelompok utama
btnKelut.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Kelompok Utama",
            html: `
                <table id="table_list" class="table">
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
                const selectedData = $("#table_list")
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getKelUt",
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

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                kelutId.value = decodeHtmlEntities(
                    result.value.IdKelompokUtama.trim()
                );
                kelutNama.value = decodeHtmlEntities(
                    result.value.NamaKelompokUtama.trim()
                );
                btnKelompok.disabled = false;
                btnKelompok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok
btnKelompok.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Kelompok",
            html: `
                <table id="table_list" class="table">
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
                const selectedData = $("#table_list")
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getKelompok",
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

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                kelompokId.value = decodeHtmlEntities(
                    result.value.idkelompok.trim()
                );
                kelompokNama.value = decodeHtmlEntities(
                    result.value.namakelompok.trim()
                );

                btnSubkel.disabled = false;
                btnSubkel.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kelompok
btnSubkel.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Sub Kelompok",
            html: `
                <table id="table_list" class="table">
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
                const selectedData = $("#table_list")
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getSubkel",
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
                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                subkelId.value = decodeHtmlEntities(
                    result.value.IdSubkelompok.trim()
                );
                subkelNama.value = decodeHtmlEntities(
                    result.value.NamaSubKelompok.trim()
                );

                btnType.disabled = false;
                btnType.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function Load_Type_ABM() {
    try {
        Swal.fire({
            title: "Barang",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID Type</th>
                        <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getTypeABM",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdSubKelompok_Type: subkelId.value.trim(),
                            },
                        },
                        columns: [{ data: "idtype" }, { data: "BARU" }],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                idType.value = decodeHtmlEntities(result.value.idtype.trim());
                type.value = decodeHtmlEntities(result.value.BARU.trim());

                // btnDivisi2.disabled = false;
                // btnDivisi2.focus();

                LoadPIB();
            }
        });
    } catch (error) {
        console.error(error);
    }
}

function Load_Type_CIR() {
    try {
        Swal.fire({
            title: "Barang",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID Type</th>
                        <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getTypeCIR",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [{ data: "Id_Type" }, { data: "Nm_Type" }],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                idType.value = result.value.Id_Type
                    ? decodeHtmlEntities(result.value.Id_Type.trim())
                    : "";
                type.value = result.value.Nm_Type
                    ? decodeHtmlEntities(result.value.Nm_Type.trim())
                    : "";

                // btnDivisi2.disabled = false;
                // btnDivisi2.focus();

                LoadPIB();
            }
        });
    } catch (error) {
        console.error(error);
    }
}

let kondisi = 0;

function Load_Type() {
    try {
        Swal.fire({
            title: "Barang",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID Type</th>
                        <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getType",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdSubKelompok_Type: subkelId.value.trim(),
                            },
                        },
                        columns: [{ data: "IdType" }, { data: "NamaType" }],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                idType.value = decodeHtmlEntities(result.value.IdType.trim());
                type.value = decodeHtmlEntities(result.value.NamaType.trim());

                // btnDivisi2.disabled = false;
                // btnDivisi2.focus();
                console.log(divisiId.value);
                console.log(objekId.value);
                console.log(kelutId.value);

                if (divisiId) {
                    $.ajax({
                        type: "GET",
                        url: "MhnPemberi/getTypePersediaan",
                        data: {
                            idType: idType.value,
                            _token: csrfToken,
                        },
                        success: function (response) {
                            console.log(response);
                            console.log(response.success);
                            console.log(response.error);

                            if (response.success == "kondisi1") {
                                hargaSatuan.style.display = "none";
                                hargaSatuanLabel.style.display = "none";
                                hargaSatuan.value = 0;
                                hargaSatuan.select();
                                btnDivisi2.disabled = false;
                                btnDivisi2.focus();
                                kondisi = 1;
                            } else if (response.success == "kondisi2") {
                                hargaSatuan.style.display = "none";
                                hargaSatuanLabel.style.display = "none";
                                hargaSatuan.value = 0;
                                hargaSatuan.select();
                                btnDivisi2.disabled = false;
                                btnDivisi2.focus();
                                kondisi = 2;
                            } else if (response.success == "kondisi3") {
                                hargaSatuan.style.display = "block";
                                hargaSatuanLabel.style.display = "block";
                                hargaSatuan.value = 0;
                                hargaSatuan.select();
                                kondisi = 3;
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        },
                    });
                } else {
                    hargaSatuan.style.display = "none";
                    hargaSatuanLabel.style.display = "none";
                    btnDivisi2.disabled = false;
                    btnDivisi2.focus();
                }
                LoadPIB();
            }
        });
    } catch (error) {
        console.error(error);
    }
}

function Load_Saldo(sIdtype) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "MhnPemberi/getSaldo",
            data: {
                IdType: sIdtype,
                _token: csrfToken,
            },
            success: function (result) {
                if (result) {
                    primer.value = result[0].SaldoPrimer
                        ? formatNumber(result[0].SaldoPrimer)
                        : formatNumber(0);
                    sekunder.value = result[0].SaldoSekunder
                        ? formatNumber(result[0].SaldoSekunder)
                        : formatNumber(0);
                    tritier.value = result[0].SaldoTritier
                        ? formatNumber(result[0].SaldoTritier)
                        : formatNumber(0);

                    satuanPrimer.value = result[0].SatPrimer
                        ? decodeHtmlEntities(result[0].SatPrimer)
                        : "NULL";
                    satuanSekunder.value = result[0].SatSekunder
                        ? decodeHtmlEntities(result[0].SatSekunder)
                        : "NULL";
                    satuanTritier.value = result[0].SatTritier
                        ? decodeHtmlEntities(result[0].SatTritier)
                        : "NULL";

                    kodeBarang.value = decodeHtmlEntities(result[0].KodeBarang);
                    pib.value = result[0].PIB
                        ? decodeHtmlEntities(result[0].PIB)
                        : "";

                    primer3.value = 0;
                    sekunder3.value = 0;
                    tritier3.value = 0;

                    Load_JumlahAntrian(sIdtype);

                    resolve(result);
                } else {
                    reject("No result found");
                }
            },
            error: function (xhr, status, error) {
                reject(error);
            },
        });
    });
}

function Load_JumlahAntrian(sIdtype) {
    $.ajax({
        type: "GET",
        url: "MhnPemberi/getJumlahAntrian",
        data: {
            IdType: sIdtype,
            _token: csrfToken,
        },
        success: function (result) {
            if (result.length !== 0) {
                primer3.value = result[0].OutPrimer
                    ? formatNumber(result[0].OutPrimer)
                    : formatNumber(0);
                sekunder3.value = result[0].OutSekunder
                    ? formatNumber(result[0].OutSekunder)
                    : formatNumber(0);
                tritier3.value = result[0].OutTritier
                    ? formatNumber(result[0].OutTritier)
                    : formatNumber(0);
            }
            if (divisiId.value === "EXP") {
                jmlKeranjang.focus();
            } else if (divisiId.value !== "EXP") {
                // hargaSatuan.focus();
            } else {
                btnDivisi2.disabled = false;
                btnDivisi2.focus();
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function LoadPIB() {
    $.ajax({
        type: "GET",
        url: "MhnPemberi/loadPib",
        data: {
            IdType: idType.value,
            IdSubKel: subkelId.value,
            _token: csrfToken,
        },
        success: function (result) {
            if (result[0].IdType === idType.value.trim()) {
                pib.value = result[0].PIB
                    ? decodeHtmlEntities(result[0].PIB)
                    : "";
            }
            Load_Saldo(idType.value);
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

btnType.addEventListener("click", function (e) {
    if (
        (divisiId.value === "ABM" && objekId.value === "022") ||
        (divisiId.value === "CIR" && objekId.value === "043") ||
        (divisiId.value === "JBB" && objekId.value === "042") ||
        (divisiId.value === "LMT" &&
            objekId.value === "086" &&
            kelutId.value === "0325") ||
        (divisiId.value === "EXT" &&
            (kelompokId.value === "1259" || kelompokId.value === "1283"))
    ) {
        if (
            divisiId.value === "ABM" &&
            objekId.value === "022" &&
            kelompokId.value !== "0292"
        ) {
            Load_Type_ABM();
        } else {
            $.ajax({
                type: "PUT",
                url: "MhnPemberi/insertTempType",
                data: {
                    XIdDivisi: divisiId.value,
                    XIdSubKelompok: subkelId.value,
                    _token: csrfToken,
                },
                success: function (response) { },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            });

            Load_Type_CIR();
        }
    } else {
        Load_Type();
    }
});

$("#jmlKeranjang").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        var value = $(this).val();

        if (value === "" || value === "0") {
            Swal.fire({
                icon: "warning",
                text: "Input Jumlah Keranjang Terlebih Dahulu",
                returnFocus: false,
            }).then(() => {
                jmlKeranjang.focus();
            });
        } else {
            btnDivisi2.disabled = false;
            btnDivisi2.focus();
        }
    }
});

// button list divisi penerima
btnDivisi2.addEventListener("click", function (e) {
    objekId2.value = "";
    objekNama2.value = "";
    kelutId2.value = "";
    kelutNama2.value = "";
    kelompokId2.value = "";
    kelompokNama2.value = "";
    subkelId2.value = "";
    subkelNama2.value = "";

    try {
        Swal.fire({
            title: "Divisi",
            html: `
                <table id="table_list" class="table">
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
                const selectedData = $("#table_list")
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getDivisi2",
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

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                divisiId2.value = result.value.IdDivisi.trim();
                divisiNama2.value = decodeHtmlEntities(
                    result.value.NamaDivisi.trim()
                );

                if (divisiNama2.value !== "") {
                    btnObjek2.disabled = false;
                    btnObjek2.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list objek penerima
btnObjek2.addEventListener("click", function (e) {
    kelutId2.value = "";
    kelutNama2.value = "";
    kelompokId2.value = "";
    kelompokNama2.value = "";
    subkelId2.value = "";
    subkelNama2.value = "";

    try {
        Swal.fire({
            title: "Objek",
            html: `
                <table id="table_list" class="table">
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
                const selectedData = $("#table_list")
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getObjek2",
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

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                objekId2.value = result.value.IdObjek.trim();
                objekNama2.value = decodeHtmlEntities(
                    result.value.NamaObjek.trim()
                );

                btnKelut2.disabled = false;
                btnKelut2.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok utama penerima
btnKelut2.addEventListener("click", function (e) {
    kelompokId2.value = "";
    kelompokNama2.value = "";
    subkelId2.value = "";
    subkelNama2.value = "";

    try {
        Swal.fire({
            title: "Kelompok Utama",
            html: `
                <table id="table_list" class="table">
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
                const selectedData = $("#table_list")
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getKelUt2",
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

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                kelutId2.value = result.value.IdKelompokUtama.trim();
                kelutNama2.value = decodeHtmlEntities(
                    result.value.NamaKelompokUtama.trim()
                );

                if (kelutNama2.value !== "") {
                    btnKelompok2.disabled = false;
                    btnKelompok2.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

var SpekBenang, urlBaru;
// button list kelompok penerima
btnKelompok2.addEventListener("click", function (e) {
    subkelId2.value = "";
    subkelNama2.value = "";

    if (divisiId2.value === "CIR" && divisiId.value === "EXP") {
        urlBaru = "cirExp";
    } else if (divisiId2.value === "CLM" && divisiId.value === "EXP") {
        urlBaru = "clmExp";
    } else {
        urlBaru = "getKelompok2";
    }

    try {
        Swal.fire({
            title: "Kelompok",
            html: `
                <table id="table_list" class="table">
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
                const selectedData = $("#table_list")
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/" + urlBaru,
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelutId2: kelutId2.value,
                                KodeBarang: kodeBarang.value,
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

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                kelompokId2.value = decodeHtmlEntities(
                    result.value.idkelompok.trim()
                );
                kelompokNama2.value = decodeHtmlEntities(
                    result.value.namakelompok.trim()
                );

                if (kelutNama2.value !== "") {
                    btnSubkel2.disabled = false;
                    btnSubkel2.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kelompok penerima
btnSubkel2.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Sub Kelompok",
            html: `
                <table id="table_list" class="table">
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
                const selectedData = $("#table_list")
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getSubkel2",
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

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                subkelId2.value = result.value.IdSubkelompok.trim();
                subkelNama2.value = result.value.NamaSubKelompok.trim();

                btnProses.disabled = true;
                primer2.disabled = false;
                sekunder2.disabled = false;

                if (Pil === 2) {
                    Load_Saldo(idType.value)
                        .then(function (result) {
                            return LoadPenerima();
                        })
                        .then(function (loadPenerima) {
                            if (!loadPenerima) {
                                return;
                            } else {
                                btnProses.disabled = false;

                                if (
                                    satuanPrimer.value.trim() === "NULL" &&
                                    satuanSekunder.value.trim() === "NULL"
                                ) {
                                    primer2.disabled = true;
                                    sekunder2.disabled = true;
                                    tritier2.focus();
                                    tritier2.select();
                                } else if (
                                    satuanPrimer.value.trim() === "NULL" &&
                                    satuanSekunder.value.trim() !== "NULL"
                                ) {
                                    primer2.disabled = true;
                                    sekunder2.focus();
                                    sekunder2.select();
                                } else {
                                    primer2.focus();
                                    primer2.select();
                                }
                            }
                        })
                        .catch(function (error) {
                            console.error("Error occurred:", error);
                        });
                } else {
                    LoadPenerima()
                        .then(function (loadPenerima) {
                            if (!loadPenerima) {
                                return;
                            } else {
                                btnProses.disabled = false;

                                if (
                                    satuanPrimer.value.trim() === "NULL" &&
                                    satuanSekunder.value.trim() === "NULL"
                                ) {
                                    primer2.disabled = true;
                                    sekunder2.disabled = true;
                                    tritier2.focus();
                                    tritier2.select();
                                } else if (
                                    satuanPrimer.value.trim() === "NULL" &&
                                    satuanSekunder.value.trim() !== "NULL"
                                ) {
                                    primer2.disabled = true;
                                    sekunder2.focus();
                                    sekunder2.select();
                                } else {
                                    primer2.focus();
                                    primer2.select();
                                }
                            }
                        })
                        .catch(function (error) {
                            console.error("Error occurred:", error);
                        });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

var pemberi;
btnKoreksi.addEventListener("click", function (e) {
    if (TPemberi) {
        $.ajax({
            type: "GET",
            url: "MhnPemberi/getUser",
            data: {
                NamaUser: TPemberi,
                _token: csrfToken,
            },
            success: function (result) {
                pemberi = result[0].kodeUser.trim();

                if (pemberi.trim() !== idUser.trim()) {
                    Swal.fire({
                        icon: "error",
                        text:
                            "Anda Tidak berhak mengkoreksi data milik user : " +
                            pemberi,
                    });
                } else {
                    Pil = 2;
                    Tombol(2);
                    OrderText(3);
                    btnDivisi2.focus();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    } else {
        Swal.fire({
            icon: "error",
            text: "Pilih dulu data yang mau dikoreksi",
            showConfirmButton: false,
            timer: 1500,
        });
    }
});

btnHapus.addEventListener("click", function (e) {
    if (TPemberi) {
        $.ajax({
            type: "GET",
            url: "MhnPemberi/getUser",
            data: {
                NamaUser: TPemberi,
                _token: csrfToken,
            },
            success: function (result) {
                pemberi = result[0].kodeUser.trim();

                if (pemberi.trim() !== idUser.trim()) {
                    Swal.fire({
                        icon: "error",
                        text:
                            "Anda Tidak berhak mengkoreksi data milik user : " +
                            pemberi,
                    });
                } else {
                    Pil = 3;
                    Tombol(2);
                    btnProses.focus();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    } else {
        Swal.fire({
            icon: "error",
            text: "Pilih dulu data yang mau dihapus",
            showConfirmButton: false,
            timer: 1500,
        });
    }
});

$("#kodeBarang").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        kodeBarang.value = kodeBarang.value.trim();

        if (subkelId.value !== "" && kodeBarang.value !== "") {
            kodeBarang.value = kodeBarang.value.padStart(9, "0").slice(-9);

            primer2.disabled = false;
            sekunder2.disabled = false;

            $.ajax({
                type: "GET",
                url: "KonversiBarang/cekKodeBarang",
                data: {
                    XKodeBarang: kodeBarang.value.trim(),
                    XIdSubKelompok: subkelId.value,
                    _token: csrfToken,
                },
                success: function (result) {
                    if (parseInt(result[0].Jumlah) === 0) {
                        Swal.fire({
                            icon: "error",
                            text:
                                "Tidak Ada Kode Barang :" +
                                decodeHtmlEntities(kodeBarang.value) +
                                " Pada sub kel : " +
                                decodeHtmlEntities(subkelNama.value),
                        });
                    } else {
                        Load_TypeBarang()
                            .then(function (LoadTypeBarang) {
                                if (LoadTypeBarang) {
                                    primer3.value = 0;
                                    sekunder3.value = 0;
                                    tritier3.value = 0;

                                    $.ajax({
                                        type: "GET",
                                        url: "MhnPemberi/getJumlahAntrian",
                                        data: {
                                            IdType: idType.value,
                                            _token: csrfToken,
                                        },
                                        success: function (result) {
                                            if (result.length !== 0) {
                                                primer3.value = result[0]
                                                    .OutPrimer
                                                    ? formatNumber(
                                                        result[0].OutPrimer
                                                    )
                                                    : formatNumber(0);
                                                sekunder3.value = result[0]
                                                    .OutSekunder
                                                    ? formatNumber(
                                                        result[0].OutSekunder
                                                    )
                                                    : formatNumber(0);
                                                tritier3.value = result[0]
                                                    .OutTritier
                                                    ? formatNumber(
                                                        result[0].OutTritier
                                                    )
                                                    : formatNumber(0);
                                            }
                                        },
                                        error: function (xhr, status, error) {
                                            console.error("Error:", error);
                                        },
                                    });

                                    if (
                                        satuanPrimer.value === "NULL" &&
                                        satuanSekunder.value === "NULL"
                                    ) {
                                        primer2.disabled = true;
                                        sekunder2.disabled = true;
                                    } else if (
                                        satuanPrimer.value === "NULL" &&
                                        satuanSekunder.value !== "NULL"
                                    ) {
                                        primer2.disabled = true;
                                    }
                                    btnDivisi2.disabled = false;
                                    btnDivisi2.focus();
                                }
                            })
                            .catch(function (error) {
                                console.error("Error occurred:", error);
                            });
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            });
        }
    }
});

var LoadTypeBarang;
function Load_TypeBarang() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "MhnPemberi/loadTypeBarang",
            data: {
                _token: csrfToken,
                XKodeBarang: kodeBarang.value,
                XIdSubKelompok: subkelId.value,
                XPIB: pib.value,
            },
            success: function (response) {
                LoadTypeBarang = false;

                if (response.length > 0) {
                    let result = response[0];

                    idType.value =
                        result.IdType !== null
                            ? decodeHtmlEntities(result.IdType.trim())
                            : "-";
                    type.value =
                        result.NamaType !== null
                            ? decodeHtmlEntities(result.NamaType.trim())
                            : "-";
                    kodeBarang.value = decodeHtmlEntities(
                        result.KodeBarang.trim()
                    );
                    primer.value =
                        result.SaldoPrimer !== null
                            ? formatNumber(result.SaldoPrimer)
                            : "0";
                    sekunder.value =
                        result.SaldoSekunder !== null
                            ? formatNumber(result.SaldoSekunder)
                            : "0";
                    tritier.value =
                        result.SaldoTritier !== null
                            ? formatNumber(result.SaldoTritier)
                            : "0";
                    satuanPrimer.value =
                        result.satuan_primer !== null
                            ? decodeHtmlEntities(result.satuan_primer.trim())
                            : "";
                    satuanSekunder.value =
                        result.satuan_sekunder !== null
                            ? decodeHtmlEntities(result.satuan_sekunder.trim())
                            : "";
                    satuanTritier.value =
                        result.satuan_tritier !== null
                            ? decodeHtmlEntities(result.satuan_tritier.trim())
                            : "";
                    satuanPrimer2.value =
                        result.satuan_primer !== null
                            ? decodeHtmlEntities(result.satuan_primer.trim())
                            : "";
                    satuanSekunder2.value =
                        result.satuan_sekunder !== null
                            ? decodeHtmlEntities(result.satuan_sekunder.trim())
                            : "";
                    satuanTritier2.value =
                        result.satuan_tritier !== null
                            ? decodeHtmlEntities(result.satuan_tritier.trim())
                            : "";

                    LoadTypeBarang = true;
                }

                resolve(LoadTypeBarang);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

$("#primer2").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        var value = $(this).val();

        if (parseFloat(value) > parseFloat(primer.value)) {
            Swal.fire({
                icon: "warning",
                text:
                    "Saldo Primernya Tinggal : " +
                    formatNumber(primer.value.trim()),
                returnFocus: false,
            }).then(() => {
                primer2.value = 0;
                primer2.focus();
                primer2.select();
            });
        } else {
            primer2.value = formatNumber(value);
            sekunder2.focus();
            sekunder2.select();
        }
    }
});

$("#sekunder2").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        var value = $(this).val();

        if (parseFloat(value) > parseFloat(sekunder.value)) {
            Swal.fire({
                icon: "warning",
                text:
                    "Saldo Sekundernya Tinggal : " +
                    formatNumber(sekunder.value.trim()),
                returnFocus: false,
            }).then(() => {
                sekunder2.value = 0;
                sekunder2.focus();
                sekunder2.select();
            });
        } else {
            sekunder2.value = formatNumber(value);
            tritier2.focus();
            tritier2.select();
        }
    }
});

$("#tritier2").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        var value = $(this).val();

        if (parseFloat(value) > parseFloat(tritier.value)) {
            Swal.fire({
                icon: "warning",
                text:
                    "Saldo Tritiernya Tinggal : " +
                    formatNumber(tritier.value.trim()),
                returnFocus: false,
            }).then(() => {
                tritier2.value = 0;
                tritier2.focus();
                tritier2.select();
            });
        } else if (objekId.value === "147" && objekId2 === "095") {
            if (value > 20) {
                Swal.fire({
                    icon: "warning",
                    text: "Jumlah kirim tdk boleh lebih dari 20 Kg",
                    returnFocus: false,
                }).then(() => {
                    tritier2.value = 0;
                    tritier2.focus();
                    tritier2.select();
                });
            } else {
                uraian.focus();
            }
        } else {
            tritier2.value = formatNumber(value);
            uraian.focus();
        }
    }
});

$("#uraian").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        btnProses.focus();
    }
});

var loadPenerima = false;
function LoadPenerima() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "MhnPemberi/loadPenerima",
            data: {
                XKodeBarang: kodeBarang.value,
                XIdSubKelompok: subkelId2.value,
                XPIB: pib.value,
                _token: csrfToken,
            },
            success: function (result) {
                loadPenerima = false;

                console.log(result);

                if (result.length !== 0) {
                    satuanPrimer2.value = result[0].satuan_primer
                        ? decodeHtmlEntities(result[0].satuan_primer.trim())
                        : "NULL";
                    satuanSekunder2.value = result[0].satuan_sekunder
                        ? decodeHtmlEntities(result[0].satuan_sekunder.trim())
                        : "NULL";
                    satuanTritier2.value = result[0].satuan_tritier
                        ? decodeHtmlEntities(result[0].satuan_tritier.trim())
                        : "NULL";

                    if (
                        satuanPrimer.value.trim() === satuanPrimer2.value.trim()
                    ) {
                        if (
                            satuanSekunder.value.trim() ===
                            satuanSekunder2.value.trim()
                        ) {
                            if (
                                satuanTritier.value.trim() ===
                                satuanTritier2.value.trim()
                            ) {
                                loadPenerima = true;
                            } else {
                                loadPenerima =
                                    satuanPrimer.value.trim() === "NULL";
                            }
                        } else {
                            loadPenerima =
                                satuanSekunder.value.trim() === "NULL";
                        }
                    }

                    if (!loadPenerima) {
                        Swal.fire({
                            icon: "info",
                            text:
                                "Satuan Tritier, Sekunder, Primer pada Divisi " +
                                decodeHtmlEntities(divisiNama.value) +
                                " ADA yang TIDAK SAMA dengan Divisi Penerima Barang !!!... Koreksi di Maitenance Type Barang per Divisi",
                        });
                    }
                } else {
                    Swal.fire({
                        icon: "info",
                        text:
                            "Tidak Ada Type Barang " +
                            decodeHtmlEntities(type.value) +
                            " Pada Divisi Penerima",
                    });
                }

                resolve(loadPenerima);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}
