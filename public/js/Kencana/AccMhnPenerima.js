var csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

// Assign input fields
var pemberi = document.getElementById("pemberi");
var tanggal = document.getElementById("tanggal");
var divisiNama = document.getElementById("divisiNama");
var objekNama = document.getElementById("objekNama");
var kelompokNama = document.getElementById("kelompokNama");
var kelutNama = document.getElementById("kelutNama");
var subkelNama = document.getElementById("subkelNama");

// Hidden input fields
var divisiId = document.getElementById("divisiId");
var objekId = document.getElementById("objekId");
var kelompokId = document.getElementById("kelompokId");
var kelutId = document.getElementById("kelutId");
var subkelId = document.getElementById("subkelId");

// Second group of inputs for 'PEMBERI'
var divisiNama2 = document.getElementById("divisiNama2");
var kodeTransaksi = document.getElementById("kodeTransaksi");
var objekNama2 = document.getElementById("objekNama2");
var kelompokNama2 = document.getElementById("kelompokNama2");
var kelutNama2 = document.getElementById("kelutNama2");
var subkelNama2 = document.getElementById("subkelNama2");

// Input fields for 'Jumlah Barang'
var primer = document.getElementById("primer");
var satuanPrimer = document.getElementById("satuanPrimer");
var sekunder = document.getElementById("sekunder");
var satuanSekunder = document.getElementById("satuanSekunder");
var tritier = document.getElementById("tritier");
var satuanTritier = document.getElementById("satuanTritier");

// Buttons
var btn_divisi = document.getElementById("btn_divisi");
var btn_objek = document.getElementById("btn_objek");
// var btn_refresh = document.getElementById('btn_refresh');
var btn_proses = document.getElementById("btn_proses");
var btn_batal = document.getElementById("btn_batal");
var btn_ok = document.getElementById("btn_ok");

var acc = document.getElementById("acc");
var batalAcc = document.getElementById("batalAcc");

var today = new Date().toISOString().slice(0, 10);
tanggal.value = today;
btn_divisi.focus();

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
        url: "/Kencana/AccMhnPenerimaKencana/getUserId",
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

var IdArray = [];

tanggal.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn_divisi.focus();
    }
});

$(document).ready(function () {
    getUserId();

    $("#tableData").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            {
                title: "",
                orderable: false,
                className: "select-checkbox",
                data: null,
                defaultContent: "",
            }, // Checkbox
            { title: "Transaksi" },
            { title: "Nama Barang" },
            { title: "Alasan Mutasi" },
            { title: "Kel. Utama" },
            { title: "Kelompok" },
            { title: "Sub Kelompok" },
            { title: "Pemohon" },
            { title: "Primer" },
            { title: "Sekunder" },
            { title: "Tritier" },
            { title: "UserAcc" },
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
        columnDefs: [
            {
                targets: 0,
                orderable: false,
                className: "select-checkbox",
                width: "3%",
                render: function (data, type, row, meta) {
                    return `<input type="checkbox" class="row-checkbox"
                                    data-id="${row[1]}">`;
                },
            },
            { targets: [1], width: "12%", className: "fixed-width" },
            { targets: [2], width: "25%", className: "fixed-width" },
            { targets: [3], width: "15%", className: "fixed-width" },
            { targets: [4], width: "15%", className: "fixed-width" },
            { targets: [5], width: "15%", className: "fixed-width" },
            { targets: [6], width: "15%", className: "fixed-width" },
            { targets: [7], width: "15%", className: "fixed-width" },
            { targets: [8], width: "10%", className: "fixed-width" },
            { targets: [9], width: "10%", className: "fixed-width" },
            { targets: [10], width: "10%", className: "fixed-width" },
            { targets: [11], width: "8%", className: "fixed-width" },
        ],
        scrollY: "300px",
        autoWidth: false,
        scrollX: "100%",
        order: [[1, "asc"]],
        select: {
            style: "os",
            selector: "td:first-child",
        },
    });
});

// fungsi swal select pake arrow
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
            "",
            escapeHtml(item.IdTransaksi),
            escapeHtml(item.NamaType),
            item.UraianDetailTransaksi
                ? escapeHtml(item.UraianDetailTransaksi)
                : "",
            escapeHtml(item.NamaKelompokUtama),
            escapeHtml(item.NamaKelompok),
            escapeHtml(item.NamaSubKelompok),
            escapeHtml(item.user),
            formatNumber(item.JumlahPengeluaranPrimer),
            formatNumber(item.JumlahPengeluaranSekunder),
            formatNumber(item.JumlahPengeluaranTritier),
            item.KomfirmasiPenerima ? escapeHtml(item.KomfirmasiPenerima) : "",
            escapeHtml(item.NamaDivisi),
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

function showAcc() {
    $.ajax({
        type: "GET",
        url: "/Kencana/AccMhnPenerimaKencana/getAcc",
        data: {
            _token: csrfToken,
            XIdObjek: objekId.value,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result);
            } else {
                var table = $("#tableData").DataTable();
                table.clear().draw();
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function showBatal() {
    $.ajax({
        type: "GET",
        url: "/Kencana/AccMhnPenerimaKencana/getBatalAcc",
        data: {
            _token: csrfToken,
            XIdObjek: objekId.value,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result);
            } else {
                var table = $("#tableData").DataTable();
                table.clear().draw();
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

btn_ok.addEventListener("click", function (e) {
    if (acc.checked) {
        showAcc();
    } else if (batalAcc.checked) {
        showBatal();
    }

    acc.disabled = true;
    batalAcc.disabled = true;
    btn_ok.disabled = true;
    btn_objek.disabled = true;
    btn_proses.disabled = false;
    ClearText();
});

function ClearText() {
    kelutNama.value = "";
    kelompokNama.value = "";
    subkelNama.value = "";
    divisiNama2.value = "";
    objekNama2.value = "";
    kelutNama2.value = "";
    kelompokNama2.value = "";
    subkelNama2.value = "";
    kodeTransaksi.value = "";
    namaBarang.value = "";
    primer.value = 0;
    sekunder.value = 0;
    tritier.value = 0;
    satuanPrimer.value = "";
    satuanSekunder.value = "";
    satuanTritier.value = "";
}

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
                            url: "/Kencana/AccMhnPenerimaKencana/getDivisi",
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
                            url: "/Kencana/AccMhnPenerimaKencana/getObjek",
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

                btn_ok.disabled = false;
                btn_ok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

$("#tableData tbody").on("click", "tr", function () {
    var table = $("#tableData").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");

    var data = table.row(this).data();
    kodeTransaksi.value = decodeHtmlEntities(data[1]);
    namaBarang.value = decodeHtmlEntities(data[2]);
    kelutNama.value = decodeHtmlEntities(data[4]);
    kelompokNama.value = decodeHtmlEntities(data[5]);
    subkelNama.value = decodeHtmlEntities(data[6]);
    primer.value = formatNumber(data[8]);
    sekunder.value = formatNumber(data[9]);
    tritier.value = formatNumber(data[10]);

    Tampil_Item();
});

$("#tableData tbody").on("change", ".row-checkbox", function () {
    var transaksiId = $(this).data("id");

    if ($(this).is(":checked")) {
        if (!IdArray.includes(transaksiId)) {
            IdArray.push(transaksiId);
        }
        // console.log(IdArray);
    } else {
        IdArray = IdArray.filter((id) => id !== transaksiId);
        // console.log(IdArray);
    }
});

$("#checkbox2").on("change", function () {
    var isChecked = $(this).is(":checked");

    // Centang semua checkbox baris sesuai status Pilih Semua
    $(".row-checkbox").prop("checked", isChecked).trigger("change");
});

function Proses_Acc() {
    $.ajax({
        type: "PUT",
        url: "/Kencana/AccMhnPenerimaKencana/acc",
        data: {
            _token: csrfToken,
            listTransaksi: IdArray,
        },
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses Acc",
                    text: response.success,
                    returnFocus: false,
                }).then(() => {
                    showAcc();
                    IdArray = [];
                    $("#checkbox2").prop("checked", false);
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function Batal_Acc() {
    $.ajax({
        type: "PUT",
        url: "/Kencana/AccMhnPenerimaKencana/batal",
        data: {
            _token: csrfToken,
            listTransaksi: IdArray,
        },
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses Batal Acc",
                    text: response.success,
                    returnFocus: false,
                }).then(() => {
                    showBatal();
                    IdArray = [];
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

btn_proses.addEventListener("click", function (e) {
    if (IdArray.length !== 0) {
        if (acc.checked) {
            Proses_Acc();
        } else if (batalAcc.checked) {
            Batal_Acc();
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Tidak Data Yang DiAcc !..",
            returnFocus: false,
        });
        return;
    }
});

btn_batal.addEventListener("click", function (e) {
    acc.disabled = false;
    batalAcc.disabled = false;
    btn_objek.disabled = false;
    btn_ok.disabled = false;
    btn_proses.disabled = true;
    ClearText();
    var table = $("#tableData").DataTable();
    table.clear().draw();
    btn_divisi.focus();
});

function Tampil_Item() {
    $.ajax({
        type: "GET",
        url: "/Kencana/AccMhnPenerimaKencana/tampilItem",
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
                satuanPrimer.value = result[0].Satuan_Primer
                    ? decodeHtmlEntities(result[0].Satuan_Primer)
                    : "";
                satuanSekunder.value = result[0].Satuan_Sekunder
                    ? decodeHtmlEntities(result[0].Satuan_Sekunder)
                    : "";
                satuanTritier.value = result[0].Satuan_Tritier
                    ? decodeHtmlEntities(result[0].Satuan_Tritier)
                    : "";
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}
