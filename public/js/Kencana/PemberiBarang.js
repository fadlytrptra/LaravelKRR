var csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

// PEMBELI BARANG
var divisiNama = document.getElementById("divisiNama");
var pemberi = document.getElementById("pemberi");
var tanggal = document.getElementById("tanggal");
var objekNama = document.getElementById("objekNama");
var kelompokNama = document.getElementById("kelompokNama");
var kelutNama = document.getElementById("kelutNama");
var subkelNama = document.getElementById("subkelNama");
var kodeTransaksi = document.getElementById("kodeTransaksi");
var kodeBarang = document.getElementById("kodeBarang");
var pemohon = document.getElementById("pemohon");
var namaBarang = document.getElementById("namaBarang");
var primer = document.getElementById("primer");
var satuanPrimer = document.getElementById("satuanPrimer");
var sekunder = document.getElementById("sekunder");
var satuanSekunder = document.getElementById("satuanSekunder");
var tritier = document.getElementById("tritier");
var satuanTritier = document.getElementById("satuanTritier");

// Hidden IDs
var divisiId = document.getElementById("divisiId");
var objekId = document.getElementById("objekId");
var kelompokId = document.getElementById("kelompokId");
var kelutId = document.getElementById("kelutId");
var subkelId = document.getElementById("subkelId");

// PENERIMA BARANG
var divisiNama2 = document.getElementById("divisiNama2");
var objekNama2 = document.getElementById("objekNama2");
var kelompokNama2 = document.getElementById("kelompokNama2");
var kelutNama2 = document.getElementById("kelutNama2");
var subkelNama2 = document.getElementById("subkelNama2");

// Buttons
var btn_refresh = document.getElementById("btn_refresh");
var btn_proses = document.getElementById("btn_proses");
var btn_batal = document.getElementById("btn_batal");

var today = new Date().toISOString().slice(0, 10);
tanggal.value = formatDateToMMDDYYYY(today);

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

function getUserId() {
    $.ajax({
        type: "GET",
        url: "/Kencana/PemberiBarangKencana/getUserId",
        data: {
            _token: csrfToken,
        },
        success: function (result) {
            pemberi.value = result.user;
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

$(document).ready(function () {
    getUserId();

    $("#tableData").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: "Kd. Trans" },
            { title: "Nama Barang" },
            { title: "Kode Barang" },
            { title: "Alasan Mutasi" },
            { title: "Jml Primer" },
            { title: "Jml Sekunder" },
            { title: "Jml Tritier" },
            { title: "Pemohon" },
            { title: "Tgl. Transaksi" },
            { title: "Div. Pemberi" },
            { title: "Objek" },
            { title: "Kel. Utama" },
            { title: "Kelompok" },
            { title: "Sub. Kel" },
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
        scrollY: "400px",
        autoWidth: false,
        scrollX: "100%",
        columnDefs: [
            { targets: [0], width: "10%", className: "fixed-width" },
            { targets: [1], width: "25%", className: "fixed-width" },
            { targets: [2], width: "12%", className: "fixed-width" },
            { targets: [3], width: "25%", className: "fixed-width" },
            { targets: [4], width: "10%", className: "fixed-width" },
            { targets: [5], width: "10%", className: "fixed-width" },
            { targets: [6], width: "10%", className: "fixed-width" },
            { targets: [7], width: "12%", className: "fixed-width" },
            { targets: [8], width: "12%", className: "fixed-width" },
            { targets: [9], width: "12%", className: "fixed-width" },
            { targets: [10], width: "12%", className: "fixed-width" },
            { targets: [11], width: "12%", className: "fixed-width" },
            { targets: [12], width: "12%", className: "fixed-width" },
            { targets: [13], width: "12%", className: "fixed-width" },
        ],
    });
});

// fungsi swal select pake arrow
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
            escapeHtml(item.KodeBarang),
            escapeHtml(item.UraianDetailTransaksi),
            formatNumber(item.JumlahPengeluaranPrimer),
            formatNumber(item.JumlahPengeluaranSekunder),
            formatNumber(item.JumlahPengeluaranTritier),
            escapeHtml(item.NamaUser),
            formatDateToMMDDYYYY(item.SaatAwalTransaksi),
            escapeHtml(item.NamaDivisi),
            escapeHtml(item.NamaObjek),
            escapeHtml(item.NamaKelompokUtama),
            escapeHtml(item.NamaKelompok),
            escapeHtml(item.NamaSubKelompok),
            escapeHtml(item.SatPrimer),
            escapeHtml(item.SatSekunder),
            escapeHtml(item.SatTritier),
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

btn_refresh.addEventListener("click", function (e) {
    AllData();
});

// button list divisi
btn_divisi.addEventListener("click", function (e) {
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
                            url: "/Kencana/PemberiBarangKencana/getDivisi",
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
                btn_objek.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list objek
btn_objek.addEventListener("click", function (e) {
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
                            url: "/Kencana/PemberiBarangKencana/getObjek",
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

                if (objekId.value === "099" || objekId.value === "107") {
                    var detailObject = {
                        XIdObjek: objekId.value,
                    };

                    var queryString = $.param(detailObject);

                    window.open("/Kencana/PemberiBarangKencanaAss?" + queryString, "_blank");
                } else {
                    AllData();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function AllData() {
    $.ajax({
        type: "GET",
        url: "/Kencana/PemberiBarangKencana/getAllData",
        data: {
            _token: csrfToken,
            XIdDivisi: divisiId.value,
            XIdObjek: objekId.value,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result);

                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Data di tabel sudah diupdate.",
                });
            } else {
                var table = $("#tableData").DataTable();
                table.clear().draw();

                Swal.fire({
                    icon: "info",
                    title: "Tidak ada Data!",
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

$("#tableData tbody").on("click", "tr", function () {
    var table = $("#tableData").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");

    var data = table.row(this).data();
    kodeTransaksi.value = decodeHtmlEntities(data[0]);

    kelutNama.value = decodeHtmlEntities(data[11]);
    kelompokNama.value = decodeHtmlEntities(data[12]);
    subkelNama.value = decodeHtmlEntities(data[13]);
    kodeBarang.value = decodeHtmlEntities(data[2]);
    namaBarang.value = decodeHtmlEntities(data[1]);
    primer.value = formatNumber(data[4]);
    sekunder.value = formatNumber(data[5]);
    tritier.value = formatNumber(data[6]);
    satuanPrimer.value = decodeHtmlEntities(data[14]);
    satuanSekunder.value = decodeHtmlEntities(data[15]);
    satuanTritier.value = decodeHtmlEntities(data[16]);
    pemohon.value = decodeHtmlEntities(data[7]);

    SelectData();
});

var SaldoPrimer, SaldoSekunder, SaldoTritier, PakaiAturanKonversi;
function SelectData() {
    $.ajax({
        type: "GET",
        url: "/Kencana/PemberiBarangKencana/selectData",
        data: {
            _token: csrfToken,
            XIdTransaksi: kodeTransaksi.value,
        },
        success: function (result) {
            if (result.length !== 0) {
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
                SaldoPrimer = formatNumber(result[0].SaldoPrimer);
                SaldoSekunder = formatNumber(result[0].SaldoSekunder);
                SaldoTritier = formatNumber(result[0].SaldoTritier);
                PakaiAturanKonversi = decodeHtmlEntities(
                    result[0].PakaiAturanKonversi
                );
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function ClearText() {
    kelutNama.value = "";
    kelompokNama.value = "";
    subkelNama.value = "";
    kelutId.value = "";
    kelompokId.value = "";
    subkelId.value = "";
    kodeTransaksi.value = "";
    kodeBarang.value = "";
    pemohon.value = "";
    namaBarang.value = "";
    primer.value = "0";
    satuanPrimer.value = "";
    sekunder.value = "0";
    satuanSekunder.value = "";
    tritier.value = "0";
    satuanTritier.value = "";
    divisiNama2.value = "";
    objekNama2.value = "";
    kelutNama2.value = "";
    kelompokNama2.value = "";
    subkelNama2.value = "";
}

function cek_sesuai_pemberi() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "/Kencana/PemberiBarangKencana/cekPemberi",
            data: {
                _token: csrfToken,
                IdTransaksi: kodeTransaksi.value,
            },
            success: function (result) {
                if (result[0].jumlah >= 1) {
                    Swal.fire({
                        icon: "error",
                        text:
                            "Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum DiACC untuk type " +
                            decodeHtmlEntities(result[0].IdType) +
                            " Pada Divisi Pemberi",
                        returnFocus: false,
                    });
                    resolve(false); // Resolve as invalid
                } else {
                    resolve(true); // Resolve as valid
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error); // Reject in case of error
            },
        });
    });
}

function cek_sesuai_penerima() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "/Kencana/PemberiBarangKencana/cekPenerima",
            data: {
                _token: csrfToken,
                IdTransaksi: kodeTransaksi.value,
                KodeBarang: kodeBarang.value,
            },
            success: function (result) {
                if (result[0].jumlah >= 1) {
                    Swal.fire({
                        icon: "error",
                        text:
                            "Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum DiACC untuk type " +
                            decodeHtmlEntities(result[0].IdType) +
                            " Pada Divisi Pemberi",
                        returnFocus: false,
                    });
                    resolve(false); // Resolve as invalid
                } else {
                    resolve(true); // Resolve as valid
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error); // Reject in case of error
            },
        });
    });
}

btn_proses.addEventListener("click", async function (e) {
    e.preventDefault();
    btn_proses.disabled = true;
    var Primer, Sekunder, Tritier;

    Primer = parseFloat(SaldoPrimer) - parseFloat(primer.value);
    Sekunder = parseFloat(SaldoSekunder) - parseFloat(sekunder.value);
    Tritier = parseFloat(SaldoTritier) - parseFloat(tritier.value);

    console.log("CEK SALDO");
    console.log("SaldoPrimer     :", SaldoPrimer);
    console.log("SaldoSekunder   :", SaldoSekunder);
    console.log("SaldoTritier    :", SaldoTritier);
    console.log("Jumlah Primer   :", primer.value);
    console.log("Jumlah Sekunder :", sekunder.value);
    console.log("Jumlah Tritier  :", tritier.value);
    console.log("Hasil Primer    :", Primer);
    console.log("Hasil Sekunder  :", Sekunder);
    console.log("Hasil Tritier   :", Tritier);
    console.log("Konversi        :", PakaiAturanKonversi);

    if (PakaiAturanKonversi != "Y") {
        if (Primer < 0 || Sekunder < 0 || Tritier < 0) {
            Swal.fire({
                icon: "error",
                text: "Saldo Tidak Cukup, Cek Stok Anda!",
                returnFocus: false,
            });
            btn_proses.disabled = false;
            return;
        }
    }

    const cekPemberiResult = await cek_sesuai_pemberi();
    const cekPenerimaResult = await cek_sesuai_penerima();

    if (cekPemberiResult && cekPenerimaResult) {
        proses();
    }
});

function proses() {
    $.ajax({
        type: "PUT",
        url: "/Kencana/PemberiBarangKencana/proses",
        data: {
            _token: csrfToken,
            IdTransaksi: kodeTransaksi.value,
            JumlahKeluarPrimer: primer.value,
            JumlahKeluarSekunder: sekunder.value,
            JumlahKeluarTritier: tritier.value,
        },
        success: function (response) {
            if (response.NmError1) {
                Swal.fire({
                    icon: "error",
                    text:
                        "IdTransaksi: " +
                        kodeTransaksi.value +
                        response.NmError1,
                    returnFocus: false,
                }).then(() => {
                    if (response.NmError2) {
                        Swal.fire({
                            icon: "error",
                            text:
                                "IdTransaksi: " +
                                kodeTransaksi.value +
                                response.NmError2,
                            returnFocus: false,
                        });
                        btn_proses.disabled = false;
                    }
                    btn_proses.disabled = false;
                });
            } else if (response.NmError2) {
                Swal.fire({
                    icon: "error",
                    text: response.NmError2,
                    returnFocus: false,
                });
                btn_proses.disabled = false;
            } else {
                Swal.fire({
                    icon: "success",
                    text: "Data Sudah diPROSES!!..",
                    returnFocus: false,
                }).then(() => {
                    btn_refresh.click();
                    ClearText();
                    btn_proses.disabled = false;
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
            btn_proses.disabled = false;
        },
    });
}
