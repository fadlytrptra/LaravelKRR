var csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

// BKK Card Variables
var bln = document.getElementById("bln");
var thn = document.getElementById("thn");
var tanggalInput = document.getElementById("tanggalInput");
var idBKK = document.getElementById("idBKK");
var listBiaya = document.getElementById("listBiaya");
listBiaya.value = 0;
var idUang1 = document.getElementById("idUang1");
var symbol1 = document.getElementById("symbol1");
var mataUang1 = document.getElementById("mataUang1");
var btnMataUang1 = document.getElementById("btnMataUang1");
var jenisBank1 = document.getElementById("jenisBank1");
var jenisBank = document.getElementById("jenisBank");
var uang1 = document.getElementById("uang1");
var idBank1 = document.getElementById("idBank1");
var bank1 = document.getElementById("bank1");
var btnBank1 = document.getElementById("btnBank1");
var btnBank = document.getElementById("btnBank");
var btnBiaya = document.getElementById("btnBiaya");
var idJenisBayar1 = document.getElementById("idJenisBayar1");
var jenisBayar1 = document.getElementById("jenisBayar1");
var btnJenisBayar1 = document.getElementById("btnJenisBayar1");
var btnBG = document.getElementById("btnBG");
var idPerkiraan1 = document.getElementById("idPerkiraan1");
var idPerkiraan = document.getElementById("idPerkiraan");
var perkiraan1 = document.getElementById("perkiraan1");
var btnPerkiraan1 = document.getElementById("btnPerkiraan1");
var uraian1 = document.getElementById("uraian1");

var btnTampilBKM = document.getElementById("btnTampilBKM");
var btnTampilBKK = document.getElementById("btnTampilBKK");

// BKM Card Variables
var tgl = document.getElementById("tgl");
var idBKM = document.getElementById("idBKM");
var listBiaya1 = document.getElementById("listBiaya1");
listBiaya1.value = 0;
var idUang = document.getElementById("idUang");
var symbol = document.getElementById("symbol");
var mataUang = document.getElementById("mataUang");
var btnMataUang = document.getElementById("btnMataUang");
var kurs = document.getElementById("kurs");
var uang = document.getElementById("uang");
var idBank = document.getElementById("idBank");
var bank = document.getElementById("bank");
var btnBank = document.getElementById("btnBank");
var idJenisBayar = document.getElementById("idJenisBayar");
var jenisBayar = document.getElementById("jenisBayar");
var btnJenisBayar = document.getElementById("btnJenisBayar");
var btnBiaya1 = document.getElementById("btnBiaya1");
var perkiraan = document.getElementById("perkiraan");
var btnPerkiraan = document.getElementById("btnPerkiraan");
var uraian = document.getElementById("uraian");

var tglAwalBKM = document.getElementById("tglAwalBKM");
var tglAkhirBKM = document.getElementById("tglAkhirBKM");
var btnOkBKM = document.getElementById("btnOkBKM");
var idCetakBKM = document.getElementById("idCetakBKM");
var btnCetakBKM = document.getElementById("btnCetakBKM");
// var btnProsesBg = document.getElementById('btnProsesBg');
var modalListBKM = document.getElementById("modalListBKM");
var tableListBKM = document.getElementById("tableListBKM");

var tglAwalBKK = document.getElementById("tglAwalBKK");
var tglAkhirBKK = document.getElementById("tglAkhirBKK");
var btnOkBKK = document.getElementById("btnOkBKK");
var idCetakBKK = document.getElementById("idCetakBKK");
var btnCetakBKK = document.getElementById("btnCetakBKK");
// var btnProsesBg = document.getElementById('btnProsesBg');
var modalListBKK = document.getElementById("modalListBKK");
var tableListBKK = document.getElementById("tableListBKK");

var dateNow = document.getElementById("tanggal");
var today = new Date().toISOString().slice(0, 10);
tgl.value = today;
tanggalInput.value = today;

var namaCetakBKM = document.getElementById("namaCetakBKM");
var voucherCetakBKM = document.getElementById("voucherCetakBKM");
var descriptionCetakBKM = document.getElementById("descriptionCetakBKM");
var postedCetakBKM = document.getElementById("postedCetakBKM");
var dateCetakBKM = document.getElementById("dateCetakBKM");
var receivedCetakBKM = document.getElementById("receivedCetakBKM");
var coaListBKM = document.getElementById("coaListBKM");
var accountListBKM = document.getElementById("accountListBKM");
var descriptionListBKM = document.getElementById("descriptionListBKM");
var amountListBKM = document.getElementById("amountListBKM");
var totalAmountBKM = document.getElementById("totalAmountBKM");
var amountBKM = document.getElementById("amountBKM");

var namaCetakBKK = document.getElementById("namaCetakBKK");
var voucherCetakBKK = document.getElementById("voucherCetakBKK");
var descriptionCetakBKK = document.getElementById("descriptionCetakBKK");
var postedCetakBKK = document.getElementById("postedCetakBKK");
var dateCetakBKK = document.getElementById("dateCetakBKK");
var paidCetakBKK = document.getElementById("paidCetakBKK");
var coaListBKK = document.getElementById("coaListBKK");
var accountListBKK = document.getElementById("accountListBKK");
var descriptionListBKK = document.getElementById("descriptionListBKK");
var amountListBKK = document.getElementById("amountListBKK");
var totalAmountBKK = document.getElementById("totalAmountBKK");
var amountBKK = document.getElementById("amountBKK");
var batalNote = document.getElementById("batalNote");
var alasanNote = document.getElementById("alasanNote");

document.addEventListener("DOMContentLoaded", function () {
    tanggalInput.focus(); // Set focus on the tanggalInput element
});

$.ajaxSetup({
    beforeSend: function () {
        // Show the loading screen before the AJAX request
        $("#loading-screen").css("display", "flex");
    },
    complete: function () {
        // Hide the loading screen after the AJAX request completes
        $("#loading-screen").css("display", "none");
    },
});

let isTableListBKKInitialized = false; // Flag for BKK table
let isTableListBKMInitialized = false; // Flag for BKM table

// Function to initialize both tables
function initializeTables() {
    if (!isTableListBKKInitialized) {
        // Initialize tableListBKK
        $("#tableListBKK").DataTable({
            paging: false,
            searching: false,
            info: false,
            ordering: false,
            scrollY: "200px",
            scrollX: true,
            autoWidth: false,
            columns: [
                { title: "Tgl. Input" },
                { title: "Id. BKK" },
                { title: "Nilai Pembulatan" },
            ],
            columnDefs: [
                { targets: [0, 1, 2], width: "33%", className: "fixed-width" },
            ],
        });
        isTableListBKKInitialized = true; // Mark as initialized
    }

    if (!isTableListBKMInitialized) {
        // Initialize tableListBKM
        $("#tableListBKM").DataTable({
            paging: false,
            searching: false,
            info: false,
            ordering: false,
            scrollY: "200px",
            scrollX: true,
            autoWidth: false,
            columns: [
                { title: "Tgl. Input" },
                { title: "Id. BKM" },
                { title: "Nilai Pelunasan" },
            ],
            columnDefs: [
                { targets: [0, 1, 2], width: "33%", className: "fixed-width" },
            ],
        });
        isTableListBKMInitialized = true; // Mark as initialized
    }
}

// Event listener for displaying BKK modal
btnTampilBKK.addEventListener("click", function () {
    tglAwalBKK.value = today;
    tglAkhirBKK.value = today;
    idCetakBKK.value = "";

    $("#modalListBKK").on("shown.bs.modal", function () {
        // Initialize both tables if not done already
        initializeTables();

        // Clear the BKK table when opening the modal
        var tableBKK = $("#tableListBKK").DataTable();
        tableBKK.clear().draw();
        tglAwalBKK.focus();
    });

    $("#modalListBKK").modal("show");
});

// Event listener for displaying BKM modal
btnTampilBKM.addEventListener("click", function () {
    tglAwalBKM.value = today;
    tglAkhirBKM.value = today;
    idCetakBKM.value = "";

    $("#modalListBKM").on("shown.bs.modal", function () {
        // Initialize both tables if not done already
        initializeTables();

        // Clear the BKM table when opening the modal
        var tableBKM = $("#tableListBKM").DataTable();
        tableBKM.clear().draw();
        tglAwalBKM.focus();
    });

    $("#modalListBKM").modal("show");
});

btnOkBKM.addEventListener("click", function () {
    var table = $("#tableListBKM").DataTable();
    table.clear().draw();

    $.ajax({
        type: "GET",
        url: "/Kencana/BKMTransistorisBankKencana/getListBKM",
        data: {
            _token: csrfToken,
            tgl1: tglAwalBKM.value,
            tgl2: tglAkhirBKM.value,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 4);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
});

$("#tableListBKM tbody").on("click", "tr", function () {
    var table = $("#tableListBKM").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");

    var data = table.row(this).data();

    idCetakBKM.value = decodeHtmlEntities(data[1]);
});

btnCetakBKM.addEventListener("click", function () {
    console.log("Button Cetak BKM diklik");
    console.log("ID BKM:", idCetakBKM.value);

    if (idCetakBKM.value === "") {
        Swal.fire({
            icon: "error",
            text: "Pilih 1 Id.BKM Untuk DiCetak!",
            returnFocus: false,
        });
        return;
    }

    $.ajax({
        type: "GET",
        url: "/Kencana/BKMTransistorisBankKencana/getCetakBKM",
        data: {
            _token: csrfToken,
            id_bkm: idCetakBKM.value,
        },

        beforeSend: function () {
            console.log("Request getCetakBKM dikirim...");
        },

        success: function (result) {
            console.log("Response getCetakBKM:", result);
            console.log("Jumlah data:", result.length);

            if (result.length !== 0) {
                // Proses cetak BKM yang sudah ada
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Data Tidak Ditemukan",
                    text: "Data detail BKM tidak ditemukan.",
                });
            }
        },

        error: function (xhr, status, error) {
            console.error("Error getCetakBKM:", xhr);
            console.error("Status:", status);
            console.error("Error:", error);
            console.error("Response:", xhr.responseText);

            Swal.fire({
                icon: "error",
                title: "Gagal Mengambil Data BKM",
                text: xhr.responseText,
            });
        },
    });
});

$("#tglAwalBKM").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        tglAkhirBKM.focus();
    }
});

$("#tglAkhirBKM").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        btnOkBKM.focus();
    }
});

$("#tglAwalBKK").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        tglAkhirBKK.focus();
    }
});

$("#tglAkhirBKK").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        btnOkBKK.focus();
    }
});

btnOkBKK.addEventListener("click", function () {
    var table = $("#tableListBKK").DataTable();
    table.clear().draw();

    $.ajax({
        type: "GET",
        url: "/Kencana/BKMTransistorisBankKencana/getListBKK",
        data: {
            _token: csrfToken,
            tgl1: tglAwalBKK.value,
            tgl2: tglAkhirBKK.value,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 5);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
});

$("#tableListBKK tbody").on("click", "tr", function () {
    var table = $("#tableListBKK").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");

    var data = table.row(this).data();

    idCetakBKK.value = decodeHtmlEntities(data[1]);
});

btnCetakBKK.addEventListener("click", function () {
    if (idCetakBKK.value === "") {
        Swal.fire({
            icon: "error",
            text: "Pilih 1 Id.BKK Untuk DiCetak!",
            returnFocus: false,
        });
        return;
    } else {
        $.ajax({
            type: "GET",
            url: "/Kencana/BKMTransistorisBankKencana/getCetakBKK",
            data: {
                _token: csrfToken,
                id_bkk: idCetakBKK.value,
            },
            success: function (result) {
                if (result.length !== 0) {
                    let totalBKM = 0;
                    var bkmDetailsContainer = document.getElementById(
                        "bkkDetailsContainer"
                    );

                    bkmDetailsContainer.innerHTML = "";

                    namaCetakBKK.textContent =
                        ": " + decodeHtmlEntities(result[0].Id_bank);
                    voucherCetakBKK.textContent =
                        ": " + decodeHtmlEntities(result[0].Id_BKK);
                    descriptionCetakBKK.textContent =
                        ": " + decodeHtmlEntities(result[0].Nama_Bank);
                    var today = new Date();

                    var options = {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    };
                    var formattedToday = today
                        .toLocaleDateString("en-GB", options)
                        .replace(/ /g, "-");
                    postedCetakBKK.textContent = ": " + formattedToday;

                    var date = new Date(result[0].Tgl_Input);
                    var options = {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    };
                    var formattedDate = date
                        .toLocaleDateString("en-GB", options)
                        .replace(/ /g, "-");
                    dateCetakBKK.textContent = ": " + formattedDate;

                    paidCetakBKK.textContent =
                        ": " + decodeHtmlEntities(result[0].NM_SUP);

                    if (result[0].Batal && result[0].Batal.trim() !== "") {
                        batalNote.textContent =
                            "BATAL: " + decodeHtmlEntities(result[0].Batal);
                        batalNote.style.display = "inline";
                    } else {
                        batalNote.style.display = "none";
                    }

                    if (result[0].Alasan && result[0].Alasan.trim() !== "") {
                        alasanNote.textContent =
                            "ALASAN: " + decodeHtmlEntities(result[0].Alasan);
                        alasanNote.style.display = "inline";
                    } else {
                        alasanNote.style.display = "none";
                    }

                    result.forEach(function (item, index) {
                        var row = document.createElement("div");
                        row.classList.add("row");

                        // COA column
                        var coaCol = document.createElement("div");
                        coaCol.classList.add("col-sm-2", "text-left");
                        coaCol.textContent = decodeHtmlEntities(
                            item.KodePerkiraan
                        );
                        row.appendChild(coaCol);

                        // Account Name column
                        var accountCol = document.createElement("div");
                        accountCol.classList.add("col-sm-3", "text-left");
                        accountCol.textContent = decodeHtmlEntities(
                            item.Keterangan
                        );
                        row.appendChild(accountCol);

                        // Description column
                        var descriptionCol = document.createElement("div");
                        descriptionCol.classList.add("col-sm-3", "text-left");
                        descriptionCol.textContent = decodeHtmlEntities(
                            item.Rincian_Bayar
                        );
                        row.appendChild(descriptionCol);

                        // Description column
                        var cekBgCol = document.createElement("div");
                        cekBgCol.classList.add("col-sm-2", "text-left");
                        cekBgCol.textContent = decodeHtmlEntities(
                            item.No_BGCek
                        );
                        row.appendChild(cekBgCol);

                        // Amount column
                        var amountCol = document.createElement("div");
                        amountCol.classList.add("col-sm-2", "text-right");
                        amountCol.textContent = numeral(
                            parseFloat(item.Nilai_Rincian)
                        ).format("0,0.00");
                        row.appendChild(amountCol);

                        // Append the row to the container
                        bkmDetailsContainer.appendChild(row);

                        // Update the total
                        totalBKM += parseFloat(item.Nilai_Rincian);

                        // Add underline class only to the last row
                        if (index === result.length - 1) {
                            coaCol.classList.add("underline");
                            accountCol.classList.add("underline");
                            cekBgCol.classList.add("underline");
                            descriptionCol.classList.add("underline");
                            amountCol.classList.add("underline");
                        }
                    });

                    amountBKK.textContent =
                        "Amount " +
                        decodeHtmlEntities(result[0].Id_MataUang_BC);
                    totalAmountBKK.textContent = numeral(
                        parseFloat(totalBKM)
                    ).format("0,0.00");

                    printPreview("preview2");
                    updateDateBKK();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
});

function printPreview(previewClass) {
    // Hide all content first
    document
        .querySelectorAll(".preview, .preview2")
        .forEach(function (preview) {
            preview.style.display = "none"; // Hide both previews
        });

    // Show the selected preview
    const previewToPrint = document.querySelector(`.${previewClass}`);
    previewToPrint.style.display = "block"; // Show the selected preview

    // Print the current view
    window.print();

    // Reset the display after printing
    previewToPrint.style.display = "none"; // Hide the preview again
}

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

btnMataUang1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Mata Uang",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                            url: "/Kencana/BKMTransistorisBankKencana/getMataUang",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            { data: "Nama_MataUang" },
                            { data: "Id_MataUang" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                idUang1.value = decodeHtmlEntities(
                    result.value.Id_MataUang.trim()
                );
                mataUang1.value = decodeHtmlEntities(
                    result.value.Nama_MataUang.trim()
                );

                $.ajax({
                    type: "GET",
                    url: "/Kencana/BKMTransistorisBankKencana/getSymbol",
                    data: {
                        _token: csrfToken,
                        nama: mataUang1.value.trim(),
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            symbol1.value = result[0].Symbol
                                ? decodeHtmlEntities(result[0].Symbol)
                                : "";
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
                uang1.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnMataUang.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Mata Uang",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                            url: "/Kencana/BKMTransistorisBankKencana/getMataUang",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            { data: "Nama_MataUang" },
                            { data: "Id_MataUang" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                idUang.value = decodeHtmlEntities(
                    result.value.Id_MataUang.trim()
                );
                mataUang.value = decodeHtmlEntities(
                    result.value.Nama_MataUang.trim()
                );

                $.ajax({
                    type: "GET",
                    url: "/Kencana/BKMTransistorisBankKencana/getSymbol",
                    data: {
                        _token: csrfToken,
                        nama: mataUang.value.trim(),
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            symbol.value = result[0].Symbol
                                ? decodeHtmlEntities(result[0].Symbol)
                                : "";

                            if (
                                mataUang.value.trim() !==
                                    mataUang1.value.trim() &&
                                mataUang.value !== ""
                            ) {
                                kurs.readOnly = false;
                                kurs.focus();
                                uang.value = formatNumber(0);
                                btnBank.focus();
                            } else if (
                                mataUang.value.trim() ==
                                    mataUang1.value.trim() &&
                                mataUang.value !== ""
                            ) {
                                kurs.readOnly = true;
                                kurs.value = "0";
                                uang.value = uang1.value;
                                btnBank.focus();
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});

var total;
$("#kurs").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        kurs.value = numeral(parseFloat(kurs.value)).format("0,0.00");

        if (parseFloat(kurs.value) === 0 || kurs.value === "") {
            Swal.fire({
                icon: "error",
                text: "Kurs TIDAK BOLEH = 0 !",
                returnFocus: false,
            }).then(() => {
                kurs.focus();
            });
            return;
        } else {
            let uang1Value = numeral(uang1.value).value();
            let kursValue = numeral(kurs.value).value();
            if (parseInt(idUang1.value) === 1 && parseInt(idUang.value) !== 1) {
                total = uang1Value / kursValue;
                uang.value = total;
                uang.value = numeral(parseFloat(uang.value)).format("0,0.00");
            } else {
                total = uang1Value * kursValue;
                uang.value = total;
                uang.value = numeral(parseFloat(uang.value)).format("0,0.00");
            }
            btnBank.focus();
        }
    }
});

$("#uang1").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        const uang1Value = parseFloat(uang1.value) || 0;

        if (uang1Value === 0) {
            Swal.fire({
                icon: "error",
                text: "Jumlah Uang TIDAK BOLEH = 0!",
            }).then(() => {
                uang1.focus();
            });
            return;
        } else {
            uang1.value = numeral(parseFloat(uang1.value)).format("0,0.00");
            btnBank1.focus();
        }
    }
});

function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}

// function formatUang(value) {
//     let number = parseFloat(value.replace(/,/g, ''));
//     if (isNaN(number)) {
//         return ''; // Return empty if not a valid number
//     }
//     return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// }

// function (formattedValue) {
//     let numericValue = parseFloat(formattedValue.replace(/,/g, ''));
//     return numericValue;
// }

btnBank1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Bank",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                            url: "/Kencana/BKMTransistorisBankKencana/getBank",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [{ data: "Id_Bank" }, { data: "Nama_Bank" }],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                idBank1.value = decodeHtmlEntities(result.value.Id_Bank.trim());
                bank1.value = decodeHtmlEntities(result.value.Nama_Bank.trim());
                // uang1.focus();

                if (idBank1.value !== "") {
                    $.ajax({
                        type: "GET",
                        url: "/Kencana/BKMTransistorisBankKencana/getAccBank",
                        data: {
                            _token: csrfToken,
                            idBank: idBank1.value,
                        },
                        success: function (result) {
                            if (result.length !== 0) {
                                jenisBank1.value = result[0].jenis
                                    ? decodeHtmlEntities(result[0].jenis)
                                    : "";
                                btnJenisBayar1.focus();
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        },
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnBank.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Bank",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                            url: "/Kencana/BKMTransistorisBankKencana/getBank",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [{ data: "Id_Bank" }, { data: "Nama_Bank" }],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                idBank.value = decodeHtmlEntities(result.value.Id_Bank.trim());
                bank.value = decodeHtmlEntities(result.value.Nama_Bank.trim());
                // uang1.focus();

                if (idBank.value !== "") {
                    $.ajax({
                        type: "GET",
                        url: "/Kencana/BKMTransistorisBankKencana/getAccBank",
                        data: {
                            _token: csrfToken,
                            idBank: idBank.value,
                        },
                        success: function (result) {
                            if (result.length !== 0) {
                                jenisBank.value = result[0].jenis
                                    ? decodeHtmlEntities(result[0].jenis.trim())
                                    : "";
                                btnJenisBayar.focus();
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        },
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

$("#tanggalInput").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        if (tanggalInput.value > today) {
            Swal.fire({
                icon: "error",
                text: "Tanggal SALAH!",
            }).then(() => {
                tanggalInput.focus();
            });
            return;
        } else {
            btnMataUang1.focus();
        }
    }
});

$("#tgl").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        if (tanggalInput.value > today) {
            Swal.fire({
                icon: "error",
                text: "Tanggal SALAH!",
            }).then(() => {
                tanggalInput.focus();
            });
            return;
        } else {
            var dateValue = new Date(tgl.value);

            var month = String(dateValue.getMonth() + 1).padStart(2, "0");
            var year = String(dateValue.getFullYear()).slice(-2);

            bln.value = month;
            thn.value = year;
            btnMataUang.focus();
        }
    }
});

btnJenisBayar1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Jenis Bayar",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                            url: "/Kencana/BKMTransistorisBankKencana/getJenisBayar",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            { data: "Id_Jenis_Bayar" },
                            { data: "Jenis_Pembayaran" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                idJenisBayar1.value = decodeHtmlEntities(
                    result.value.Id_Jenis_Bayar.trim()
                );
                jenisBayar1.value = decodeHtmlEntities(
                    result.value.Jenis_Pembayaran.trim()
                );

                if (
                    parseInt(idJenisBayar1.value) === 2 ||
                    parseInt(idJenisBayar1.value) === 3 ||
                    parseInt(idJenisBayar1.value) === 5 ||
                    parseInt(idJenisBayar1.value) === 4
                ) {
                    btnBG.disabled = false;
                    btnBG.focus();
                } else {
                    btnBG.disabled = true;
                    btnPerkiraan1.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnJenisBayar.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Jenis Bayar",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                            url: "/Kencana/BKMTransistorisBankKencana/getJenisBayar",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            { data: "Id_Jenis_Bayar" },
                            { data: "Jenis_Pembayaran" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                idJenisBayar.value = decodeHtmlEntities(
                    result.value.Id_Jenis_Bayar.trim()
                );
                jenisBayar.value = decodeHtmlEntities(
                    result.value.Jenis_Pembayaran.trim()
                );

                btnPerkiraan.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnPerkiraan1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Perkiraan",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                            url: "/Kencana/BKMTransistorisBankKencana/getPerkiraan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            { data: "NoKodePerkiraan" },
                            { data: "Keterangan" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                idPerkiraan1.value = decodeHtmlEntities(
                    result.value.NoKodePerkiraan.trim()
                );
                perkiraan1.value = decodeHtmlEntities(
                    result.value.Keterangan.trim()
                );

                uraian1.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnPerkiraan.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Perkiraan",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                            url: "/Kencana/BKMTransistorisBankKencana/getPerkiraan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            { data: "NoKodePerkiraan" },
                            { data: "Keterangan" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                idPerkiraan.value = decodeHtmlEntities(
                    result.value.NoKodePerkiraan.trim()
                );
                perkiraan.value = decodeHtmlEntities(
                    result.value.Keterangan.trim()
                );

                uraian.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

var bankBg = document.getElementById("bankBg");
var jenisBg = document.getElementById("jenisBg");
var noBg = document.getElementById("noBg");
var jatuhTempo = document.getElementById("jatuhTempo");
var cetak = document.getElementById("cetak");
var btnProsesBg = document.getElementById("btnProsesBg");

var btnProses = document.getElementById("btnProses");
var btnKoreksi = document.getElementById("btnKoreksi");
var btnKoreksiForm = document.getElementById("btnKoreksiForm");
var btnBatal = document.getElementById("btnBatal");

var btnHapus = document.getElementById("btnHapus");
var tableDetailBiayaBKK = document.getElementById("tableDetailBiayaBKK");

// Detail BG/CEK/TRANSFER BKK Section
var btnKoreksiBg = document.getElementById("btnKoreksiBg");
var btnHapusBg = document.getElementById("btnHapusBg");
var tableBg = document.getElementById("tableBg");

// Detail Biaya BKM Section
var btnKoreksi2 = document.getElementById("btnKoreksi2");
var btnHapus2 = document.getElementById("btnHapus2");
var tableDetailBiayaBKM = document.getElementById("tableDetailBiayaBKM");

var proses;

btnBG.addEventListener("click", function (e) {
    $("#modalBg").modal("show");
    $("#modalBg").on("shown.bs.modal", function () {
        proses = 1;

        bankBg.value = bank1.value;
        jenisBg.value = jenisBayar1.value;
        jatuhTempo.value = today;
        noBg.value = "";
        cetak.value = "";
        noBg.readOnly = false;
        jatuhTempo.readOnly = false;
        cetak.readOnly = false;
        noBg.focus();
    });
});

$("#jatuhTempo").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        cetak.focus();
    }
});

$("#noBg").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        jatuhTempo.focus();
    }
});

$("#cetak").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        cetak.value = cetak.value.toUpperCase();
        if (
            cetak.value.toUpperCase() === "T" ||
            cetak.value.toUpperCase() === "S" ||
            cetak.value.toUpperCase() === "O"
        ) {
            btnProsesBg.focus();
        } else {
            Swal.fire({
                icon: "error",
                text: "Hanya bisa diisi dengan status T,O,S !!..",
                returnFocus: false,
            }).then(() => {
                cetak.focus();
            });
        }
    }
});

var IdBank1,
    ModeKoreksi = false;

$("#uraian1").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        // jatuhTempo.focus();
        if (idBKK.value === "") {
            if (idBank1.value === "KRR1" || idBank1.value === "KRR2") {
                if (idBank1.value === "KRR2") {
                    IdBank1 = "KI";
                }
                if ((idBank1.value = "KRR1")) {
                    IdBank1 = "KKK";
                }
            } else {
                IdBank1 = idBank1.value;
            }
        }

        $.ajax({
            type: "GET",
            url: "/Kencana/BKMTransistorisBankKencana/getIdBKK",
            data: {
                _token: csrfToken,
                bank: IdBank1.trim(),
                tahun: new Date(tanggalInput.value).getFullYear(),
            },
            success: function (result) {
                if (result) {
                    idBKK.value = decodeHtmlEntities(result.IdBKK);

                    if (ModeKoreksi === false) {
                        if (btnBiaya.disabled === true) {
                            Swal.fire({
                                title: "Ada BIAYA?",
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonText: "Ya",
                                cancelButtonText: "Tidak",
                                returnFocus: false,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    btnBiaya.disabled = false;
                                    btnBiaya.focus();
                                } else {
                                    btnBiaya.disabled = true;
                                    enableBKM();
                                    tgl.focus();
                                    disableBKK();
                                }
                            });
                        } else {
                            enableBKM();
                            tgl.focus();
                            disableBKK();
                        }
                    } else {
                        if (btnBiaya.disabled === true) {
                            Swal.fire({
                                title: "Ada BIAYA?",
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonText: "Ya",
                                cancelButtonText: "Tidak",
                                returnFocus: false,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    btnBiaya.disabled = false;
                                    btnBiaya.focus();
                                } else {
                                    btnBiaya.disabled = true;
                                    enableBKM();
                                    tgl.focus();
                                    disableBKK();
                                }
                            });
                        } else {
                            Swal.fire({
                                title: "Mata Uang BKM DiKoreksi??",
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonText: "Ya",
                                cancelButtonText: "Tidak",
                                returnFocus: false,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    enableBKM();
                                    tgl.focus();
                                    disableBKK();
                                    uang.value = "0";
                                } else {
                                    enableBKM();
                                    disableBKK();
                                    if (parseFloat(kurs.value) !== 0) {
                                        let total;
                                        const uang1Value = parseFloat(
                                            uang1.value
                                        );
                                        const kursValue = parseFloat(
                                            kurs.value
                                        );

                                        if (
                                            idUang1.value === "1" &&
                                            idUang.value === "2"
                                        ) {
                                            total = uang1Value / kursValue;
                                            uang.value = total.toLocaleString(
                                                "en-US",
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }
                                            );
                                        } else if (
                                            idUang1.value === "2" &&
                                            idUang.value === "1"
                                        ) {
                                            total = uang1Value * kursValue;
                                            uang.value = total.toLocaleString(
                                                "en-US",
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }
                                            );
                                        } else if (
                                            idUang1.value === idUang.value
                                        ) {
                                            uang.value = parseFloat(
                                                uang1.value
                                            ).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            });
                                        }
                                    }

                                    btnBank.focus();
                                }
                            });
                        }
                    }
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
});

var IdBank;
$("#uraian").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        // jatuhTempo.focus();
        if (idBKM.value === "") {
            if (idBank.value === "KRR1" || idBank.value === "KRR2") {
                if (idBank.value === "KRR2") {
                    IdBank = "KI";
                }
                if ((idBank.value = "KRR1")) {
                    IdBank = "KKM";
                }
            } else {
                IdBank = idBank.value;
            }
        }

        $.ajax({
            type: "GET",
            url: "/Kencana/BKMTransistorisBankKencana/getIdBKM",
            data: {
                _token: csrfToken,
                bank: IdBank.trim(),
                tahun: new Date(tanggalInput.value).getFullYear(),
            },
            success: function (result) {
                if (result) {
                    idBKM.value = decodeHtmlEntities(result.IdBKM);

                    if (ModeKoreksi === false) {
                        if (btnBiaya1.disabled === true) {
                            Swal.fire({
                                title: "Ada BIAYA?",
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonText: "Ya",
                                cancelButtonText: "Tidak",
                                returnFocus: false,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    btnBiaya1.disabled = false;
                                    btnBiaya1.focus();
                                } else {
                                    btnBiaya1.disabled = true;
                                    disableBKM();
                                    btnProses.focus();
                                }
                            });
                        } else {
                            btnBiaya1.disabled = true;
                            disableBKM();
                            btnProses.focus();
                        }
                    } else {
                    }
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
});

function enableBKK() {
    tanggalInput.readOnly = false;
    uang1.readOnly = false;
    uraian1.readOnly = false;
    btnMataUang1.disabled = false;
    btnBank1.disabled = false;
    btnPerkiraan1.disabled = false;
    btnJenisBayar1.disabled = false;
    // btnBiaya.disabled = false;
}

function disableBKK() {
    tanggalInput.readOnly = true;
    uang1.readOnly = true;
    uraian1.readOnly = true;
    btnMataUang1.disabled = true;
    btnBank1.disabled = true;
    btnPerkiraan1.disabled = true;
    btnJenisBayar1.disabled = true;
    btnBiaya.disabled = true;
}

function enableBKM() {
    tgl.readOnly = false;
    uraian.readOnly = false;
    btnMataUang.disabled = false;
    btnBank.disabled = false;
    btnJenisBayar.disabled = false;
    btnPerkiraan.disabled = false;
    // kurs.readOnly = true;
}

function disableBKM() {
    tgl.readOnly = true;
    uraian.readOnly = true;
    btnMataUang.disabled = true;
    btnBank.disabled = true;
    btnJenisBayar.disabled = true;
    btnPerkiraan.disabled = true;
    kurs.readOnly = true;
    btnBiaya1.disabled = true;
    btnPerkiraan.disabled = true;
}

function updateDataTable(data, angka) {
    if (angka === 1) {
        var tableAsal = $("#tableBg").DataTable();

        tableAsal.row.add([escapeHtml(data[0]), data[1], escapeHtml(data[2])]);
        tableAsal.draw();
    } else if (angka === 2) {
        var table = $("#tableDetailBiayaBKK").DataTable();

        table.row.add([escapeHtml(data[0]), data[1], escapeHtml(data[2])]);
        table.draw();
    } else if (angka === 3) {
        var tableTujuan = $("#tableDetailBiayaBKM").DataTable();

        tableTujuan.row.add([
            escapeHtml(data[0]),
            data[1],
            escapeHtml(data[2]),
        ]);
        tableTujuan.draw();
    } else if (angka === 4) {
        var tableListBKM = $("#tableListBKM").DataTable();

        tableListBKM.clear();
        data.forEach(function (item) {
            tableListBKM.row.add([
                formatDateToMMDDYYYY(item.Tgl_Input),
                escapeHtml(item.Id_BKM),
                numeral(parseFloat(item.Nilai_Pelunasan)).format("0,0.00"),
                item.Terjemahan ? escapeHtml(item.Terjemahan) : "",
            ]);
        });
        tableListBKM.draw();
    } else if (angka === 5) {
        var tableListBKK = $("#tableListBKK").DataTable();

        tableListBKK.clear();
        data.forEach(function (item) {
            tableListBKK.row.add([
                formatDateToMMDDYYYY(item.Tgl_Input),
                escapeHtml(item.Id_BKK),
                numeral(parseFloat(item.Nilai_Pembulatan)).format("0,0.00"),
                escapeHtml(item.Terjemahan),
            ]);
        });
        tableListBKK.draw();
    }
}

var i;

// modal bkm bawah case 1

var nilaiPelunasanBiaya1 = document.getElementById("nilaiPelunasanBiaya1");
var idPerkiraanBiaya1 = document.getElementById("idPerkiraanBiaya1");
var perkiraanBiaya1 = document.getElementById("perkiraanBiaya1");
var btnPerkiraanBiaya1 = document.getElementById("btnPerkiraanBiaya1");
var keteranganBiaya1 = document.getElementById("keteranganBiaya1");
var btnProsesBiaya1 = document.getElementById("btnProsesBiaya1");
var KeA1 = document.getElementById("KeA1");
var formListBiaya1 = document.getElementById("formListBiaya1");

btnBiaya1.addEventListener("click", function (e) {
    proses = 1;
    $("#modalBiaya1").modal("show");
    $("#modalBiaya1").on("shown.bs.modal", function () {
        clearBiaya1();
        formListBiaya1.value = listBiaya.value;
        nilaiPelunasanBiaya1.readOnly = false;
        nilaiPelunasanBiaya1.value = 0;
        nilaiPelunasanBiaya1.focus();
        btnPerkiraan1.disabled = false;
        i = parseInt(formListBiaya1.value);
    });
});

$("#nilaiPelunasanBiaya1").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        nilaiPelunasanBiaya1.value = numeral(
            parseFloat(nilaiPelunasanBiaya1.value)
        ).format("0,0.00");
        select_kodePerkiraan1.focus();
    }
});

$("#keteranganBiaya1").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        btnProsesBiaya1.focus();
    }
});

const select_kodePerkiraan1 = $("#select_kodePerkiraan1");
select_kodePerkiraan1.select2({
    dropdownParent: $("#modalBiaya1"),
    placeholder: "Pilih Kode Perkiraan",
});
select_kodePerkiraan1.on("select2:select", function () {
    const selectedKodePerkiraan1 = $(this).val();
    const ketSelectedKodePerkiraan1 = $(this)
        .select2("data")[0]
        .text.split(" | ")[0]
        .trim();
    console.log(selectedKodePerkiraan1);
    console.log($(this).select2("data")[0].text.split(" | ")[0].trim());
    $.ajax({
        type: "GET",
        url: "/Kencana/BKMTransistorisBankKencana/getPerkiraanChange",
        data: {
            _token: csrfToken,
        },
        success: function (result) {
            if (result.length !== 0) {
                ketSelectedKodePerkiraan1 = result[0].Keterangan
                    ? decodeHtmlEntities(result[0].Keterangan)
                    : "";
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
    keteranganBiaya1.focus();
});

// btnPerkiraanBiaya1.addEventListener("click", function (e) {
//     try {
//         Swal.fire({
//             title: 'Perkiraan',
//             html: `
//             <table id="table_list" class="table">
//                 <thead>
//                     <tr>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                     </tr>
//                 </thead>
//                 <tbody></tbody>
//             </table>
//         `,
//             preConfirm: () => {
//                 const selectedData = $("#table_list")
//                     .DataTable()
//                     .row(".selected")
//                     .data();
//                 if (!selectedData) {
//                     Swal.showValidationMessage("Please select a row");
//                     return false;
//                 }
//                 return selectedData;
//             },
//             width: '40%',
//             returnFocus: false,
//             showCloseButton: true,
//             showConfirmButton: true,
//             confirmButtonText: 'Select',
//             didOpen: () => {
//                 $(document).ready(function () {
//                     const table = $("#table_list").DataTable({
//                         responsive: true,
//                         processing: true,
//                         serverSide: true,
//                         paging: false,
//                         scrollY: '400px',
//                         scrollCollapse: true,
//                         order: [0, "asc"],
//                         ajax: {
//                             url: "/Kencana/BKMTransistorisBankKencana/getPerkiraan",
//                             dataType: "json",
//                             type: "GET",
//                             data: {
//                                 _token: csrfToken
//                             }
//                         },
//                         columns: [
//                             { data: "NoKodePerkiraan" },
//                             { data: "Keterangan" },
//                         ],
//                     });

//                     $("#table_list tbody").on("click", "tr", function () {
//                         table.$("tr.selected").removeClass("selected");
//                         $(this).addClass("selected");
//                         scrollRowIntoView(this);
//                     });

//                     const searchInput = $('#table_list_filter input');
//                     if (searchInput.length > 0) {
//                         searchInput.focus();
//                     }

//                     currentIndex = null;
//                     Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
//                 });
//             }
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 idPerkiraanBiaya1.value = decodeHtmlEntities(result.value.NoKodePerkiraan.trim());
//                 perkiraanBiaya1.value = decodeHtmlEntities(result.value.Keterangan.trim());

//                 $.ajax({
//                     type: 'GET',
//                     url: '/Kencana/BKMTransistorisBankKencana/getPerkiraanChange',
//                     data: {
//                         _token: csrfToken,
//                     },
//                     success: function (result) {
//                         if (result.length !== 0) {
//                             perkiraanBiaya1.value = result[0].Keterangan ? decodeHtmlEntities(result[0].Keterangan) : '';
//                         }
//                     },
//                     error: function (xhr, status, error) {
//                         console.error('Error:', error);
//                     }
//                 });

//                 keteranganBiaya1.focus();
//             }
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });

btnProsesBiaya1.addEventListener("click", function (e) {
    if (proses === 1) {
        if (
            nilaiPelunasanBiaya1.value !== "" &&
            select_kodePerkiraan1.val() !== "" &&
            keteranganBiaya1.value !== ""
        ) {
            i += 1;
            tmpArr = [
                keteranganBiaya1.value,
                nilaiPelunasanBiaya1.value,
                select_kodePerkiraan1.val(),
            ];
            updateDataTable(tmpArr, 3);
            $("#modalBiaya1").modal("hide");
            Swal.fire({
                title: "Tambah BIAYA?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
                returnFocus: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    $("#modalBiaya1").modal("show");
                    $("#modalBiaya1").on("shown.bs.modal", function () {
                        formListBiaya1.value = listBiaya.value;
                        nilaiPelunasanBiaya1.readOnly = false;
                        nilaiPelunasanBiaya1.value = 0;
                        nilaiPelunasanBiaya1.focus();
                        btnPerkiraan1.disabled = false;
                    });
                    clearBiaya1();
                } else {
                    uraian.focus();
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                text: "Isi Datanya Yg Lengkap!",
                returnFocus: false,
            }).then(() => {
                noBg.focus();
            });
        }
    } else if (proses === 2) {
        if (
            nilaiPelunasanBiaya1.value !== "" &&
            select_kodePerkiraan1.val() !== "" &&
            keteranganBiaya1.value !== ""
        ) {
            arrBKM[0] = decodeHtmlEntities(keteranganBiaya1.value);
            arrBKM[1] = numeral(nilaiPelunasanBiaya1.value).value();
            arrBKM[2] = select_kodePerkiraan1.val();

            var table = $("#tableDetailBiayaBKM").DataTable();
            table.row(arrBKM[3]).data(arrBKM).draw();

            Swal.fire({
                icon: "success",
                text: "Data Sudah TerKoreksi",
                returnFocus: false,
            }).then(() => {
                $("#modalBiaya1").modal("hide");
            });
        } else {
            Swal.fire({
                icon: "error",
                text: "Isi Datanya Yg Lengkap!",
                returnFocus: false,
            }).then(() => {
                nilaiPelunasanBiaya1.focus();
            });
        }
    } else if (proses === 3) {
        var table = $("#tableDetailBiayaBKM").DataTable();
        table.row(arrBKM[3]).remove().draw();

        Swal.fire({
            icon: "success",
            text: "Data Sudah TerHapus",
            returnFocus: false,
        }).then(() => {
            $("#modalBiaya1").modal("hide");
        });
    }
});

function clearBiaya1() {
    keteranganBiaya1.value = "";
    nilaiPelunasanBiaya1.value = "";
    nilaiPelunasanBiaya1.focus();
}

// selesai modal bkm bawah

// Modal Biaya bkk atas case 1
var nilaiPelunasanBiaya = document.getElementById("nilaiPelunasanBiaya");
var idPerkiraanBiaya = document.getElementById("idPerkiraanBiaya");
var perkiraanBiaya = document.getElementById("perkiraanBiaya");
var btnPerkiraanBiaya = document.getElementById("btnPerkiraanBiaya");
var keteranganBiaya = document.getElementById("keteranganBiaya");
var btnProsesBiaya = document.getElementById("btnProsesBiaya");
var KeA = document.getElementById("KeA");
var formListBiaya = document.getElementById("formListBiaya");

btnBiaya.addEventListener("click", function (e) {
    proses = 1;
    $("#modalBiaya").modal("show");
    $("#modalBiaya").on("shown.bs.modal", function () {
        clearBiaya();
        formListBiaya.value = listBiaya.value;
        nilaiPelunasanBiaya.readOnly = false;
        nilaiPelunasanBiaya.value = 0;
        nilaiPelunasanBiaya.focus();
        btnPerkiraan.disabled = false;
        keteranganBiaya.readOnly = false;
        i = parseInt(formListBiaya.value);
    });
});

btnKoreksi.addEventListener("click", function (e) {
    var table = $("#tableDetailBiayaBKK").DataTable();
    if (table.rows(".selected").any()) {
        proses = 2;
        $("#modalBiaya").modal("show");
        $("#modalBiaya").on("shown.bs.modal", function () {
            clearBiaya();
            formListBiaya.value = listBiaya.value;
            nilaiPelunasanBiaya.readOnly = false;
            nilaiPelunasanBiaya.value = numeral(arrBKK[1]).value();
            select_kodePerkiraan.val(arrBKK[2]).trigger("change");
            // idPerkiraanBiaya.value = arrBKK[2];
            keteranganBiaya.value = arrBKK[0];
            KeA.value = arrBKK[3];
            nilaiPelunasanBiaya.focus();
            btnPerkiraan.disabled = false;
            keteranganBiaya.readOnly = false;
        });
    } else {
        Swal.fire({
            icon: "error",
            text: "Pilih 1 Detail Biaya U/ DiKoreksi!",
            returnFocus: false,
        });
    }
});

btnHapus.addEventListener("click", function (e) {
    var table = $("#tableDetailBiayaBKK").DataTable();
    if (table.rows(".selected").any()) {
        proses = 3;
        $("#modalBiaya").modal("show");
        $("#modalBiaya").on("shown.bs.modal", function () {
            clearBiaya();
            formListBiaya.value = listBiaya.value;
            nilaiPelunasanBiaya.readOnly = true;
            nilaiPelunasanBiaya.value = numeral(arrBKK[1]).value();
            select_kodePerkiraan.val(arrBKK[2]).trigger("change");
            // idPerkiraanBiaya.value = arrBKK[2];
            keteranganBiaya.value = arrBKK[0];
            KeA.value = arrBKK[3];
            btnProsesBiaya.focus();
            btnPerkiraan.disabled = true;
            keteranganBiaya.readOnly = true;
        });
    } else {
        Swal.fire({
            icon: "error",
            text: "Pilih 1 Detail Biaya U/ DiHapus!",
            returnFocus: false,
        });
    }
});

btnKoreksi2.addEventListener("click", function (e) {
    var table = $("#tableDetailBiayaBKM").DataTable();
    if (table.rows(".selected").any()) {
        proses = 2;
        $("#modalBiaya1").modal("show");
        $("#modalBiaya1").on("shown.bs.modal", function () {
            clearBiaya();
            formListBiaya1.value = listBiaya1.value;
            nilaiPelunasanBiaya1.readOnly = false;
            nilaiPelunasanBiaya1.value = numeral(arrBKM[1]).value();
            select_kodePerkiraan1.val(arrBKK[2]).trigger("change");
            // idPerkiraanBiaya1.value = arrBKM[2];
            keteranganBiaya1.value = arrBKM[0];
            KeA1.value = arrBKM[3];
            nilaiPelunasanBiaya1.focus();
            btnPerkiraan1.disabled = false;
            keteranganBiaya1.readOnly = false;
        });
    } else {
        Swal.fire({
            icon: "error",
            text: "Pilih 1 Detail Biaya U/ DiKoreksi!",
            returnFocus: false,
        });
    }
});

btnHapus2.addEventListener("click", function (e) {
    var table = $("#tableDetailBiayaBKM").DataTable();
    if (table.rows(".selected").any()) {
        proses = 3;
        $("#modalBiaya1").modal("show");
        $("#modalBiaya1").on("shown.bs.modal", function () {
            clearBiaya();
            formListBiaya1.value = listBiaya.value;
            nilaiPelunasanBiaya1.readOnly = true;
            nilaiPelunasanBiaya1.value = numeral(arrBKM[1]).value();
            select_kodePerkiraan1.val(arrBKK[2]).trigger("change");
            // idPerkiraanBiaya1.value = arrBKM[2];
            keteranganBiaya1.value = arrBKM[0];
            KeA1.value = arrBKM[3];
            btnProsesBiaya1.focus();
            btnPerkiraan1.disabled = true;
            keteranganBiaya1.readOnly = true;
        });
    } else {
        Swal.fire({
            icon: "error",
            text: "Pilih 1 Detail Biaya U/ DiHapus!",
            returnFocus: false,
        });
    }
});

$("#nilaiPelunasanBiaya").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        nilaiPelunasanBiaya.value = numeral(
            parseFloat(nilaiPelunasanBiaya.value)
        ).format("0,0.00");
        select_kodePerkiraan.focus();
    }
});

$("#keteranganBiaya").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        btnProsesBiaya.focus();
    }
});

const select_kodePerkiraan = $("#select_kodePerkiraan");
select_kodePerkiraan.select2({
    dropdownParent: $("#modalBiaya"),
    placeholder: "Pilih Kode Perkiraan",
});
select_kodePerkiraan.on("select2:select", function () {
    const selectedKodePerkiraan = $(this).val();
    const ketSelectedKodePerkiraan = $(this)
        .select2("data")[0]
        .text.split(" | ")[0]
        .trim();
    console.log(selectedKodePerkiraan);
    console.log($(this).select2("data")[0].text.split(" | ")[0].trim());
    $.ajax({
        type: "GET",
        url: "/Kencana/BKMTransistorisBankKencana/getPerkiraanChange",
        data: {
            _token: csrfToken,
        },
        success: function (result) {
            if (result.length !== 0) {
                ketSelectedKodePerkiraan = result[0].Keterangan
                    ? decodeHtmlEntities(result[0].Keterangan)
                    : "";
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
    keteranganBiaya.focus();
});

// btnPerkiraanBiaya.addEventListener("click", function (e) {
//     try {
//         Swal.fire({
//             title: 'Perkiraan',
//             html: `
//             <table id="table_list" class="table">
//                 <thead>
//                     <tr>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                     </tr>
//                 </thead>
//                 <tbody></tbody>
//             </table>
//         `,
//             preConfirm: () => {
//                 const selectedData = $("#table_list")
//                     .DataTable()
//                     .row(".selected")
//                     .data();
//                 if (!selectedData) {
//                     Swal.showValidationMessage("Please select a row");
//                     return false;
//                 }
//                 return selectedData;
//             },
//             width: '40%',
//             returnFocus: false,
//             showCloseButton: true,
//             showConfirmButton: true,
//             confirmButtonText: 'Select',
//             didOpen: () => {
//                 $(document).ready(function () {
//                     const table = $("#table_list").DataTable({
//                         responsive: true,
//                         processing: true,
//                         serverSide: true,
//                         paging: false,
//                         scrollY: '400px',
//                         scrollCollapse: true,
//                         order: [0, "asc"],
//                         ajax: {
//                             url: "/Kencana/BKMTransistorisBankKencana/getPerkiraan",
//                             dataType: "json",
//                             type: "GET",
//                             data: {
//                                 _token: csrfToken
//                             }
//                         },
//                         columns: [
//                             { data: "NoKodePerkiraan" },
//                             { data: "Keterangan" },
//                         ],
//                     });

//                     $("#table_list tbody").on("click", "tr", function () {
//                         table.$("tr.selected").removeClass("selected");
//                         $(this).addClass("selected");
//                         scrollRowIntoView(this);
//                     });

//                     const searchInput = $('#table_list_filter input');
//                     if (searchInput.length > 0) {
//                         searchInput.focus();
//                     }

//                     currentIndex = null;
//                     Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
//                 });
//             }
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 idPerkiraanBiaya.value = decodeHtmlEntities(result.value.NoKodePerkiraan.trim());
//                 perkiraanBiaya.value = decodeHtmlEntities(result.value.Keterangan.trim());

//                 $.ajax({
//                     type: 'GET',
//                     url: '/Kencana/BKMTransistorisBankKencana/getPerkiraanChange',
//                     data: {
//                         _token: csrfToken,
//                     },
//                     success: function (result) {
//                         if (result.length !== 0) {
//                             perkiraanBiaya.value = result[0].Keterangan ? decodeHtmlEntities(result[0].Keterangan) : '';
//                         }
//                     },
//                     error: function (xhr, status, error) {
//                         console.error('Error:', error);
//                     }
//                 });

//                 keteranganBiaya.focus();
//             }
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });

btnProsesBiaya.addEventListener("click", function (e) {
    if (proses === 1) {
        if (
            nilaiPelunasanBiaya.value !== "" &&
            select_kodePerkiraan.val() !== "" &&
            keteranganBiaya.value !== ""
        ) {
            i += 1;
            tmpArr = [
                keteranganBiaya.value,
                nilaiPelunasanBiaya.value,
                select_kodePerkiraan.val(),
            ];

            updateDataTable(tmpArr, 2);
            $("#modalBiaya").modal("hide");
            Swal.fire({
                title: "Tambah BIAYA?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
                returnFocus: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    $("#modalBiaya").modal("show");
                    $("#modalBiaya").on("shown.bs.modal", function () {
                        formListBiaya.value = listBiaya.value;
                        nilaiPelunasanBiaya.readOnly = false;
                        nilaiPelunasanBiaya.value = 0;
                        nilaiPelunasanBiaya.focus();
                        btnPerkiraan.disabled = false;
                        // i = parseInt(formListBiaya.value);
                    });
                    clearBiaya();
                } else {
                    uraian1.focus();
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                text: "Isi Datanya Yg Lengkap!",
                returnFocus: false,
            }).then(() => {
                noBg.focus();
            });
        }
    } else if (proses === 2) {
        if (
            nilaiPelunasanBiaya.value !== "" &&
            select_kodePerkiraan.val() !== "" &&
            keteranganBiaya.value !== ""
        ) {
            arrBKK[0] = decodeHtmlEntities(keteranganBiaya.value);
            arrBKK[1] = numeral(nilaiPelunasanBiaya.value).value();
            arrBKK[2] = select_kodePerkiraan.val();

            var table = $("#tableDetailBiayaBKK").DataTable();
            table.row(arrBKK[3]).data(arrBKK).draw();

            Swal.fire({
                icon: "success",
                text: "Data Sudah TerKoreksi",
                returnFocus: false,
            }).then(() => {
                $("#modalBiaya").modal("hide");
            });
        } else {
            Swal.fire({
                icon: "error",
                text: "Isi Datanya Yg Lengkap!",
                returnFocus: false,
            }).then(() => {
                nilaiPelunasanBiaya.focus();
            });
        }
    } else if (proses === 3) {
        var table = $("#tableDetailBiayaBKK").DataTable();
        table.row(arrBKK[3]).remove().draw();

        Swal.fire({
            icon: "success",
            text: "Data Sudah TerHapus",
            returnFocus: false,
        }).then(() => {
            $("#modalBiaya").modal("hide");
        });
    }
});

function clearBiaya() {
    keteranganBiaya.value = "";
    nilaiPelunasanBiaya.value = "";
    nilaiPelunasanBiaya.focus();
}

// selesai model biaya case 1

btnKoreksiForm.addEventListener("click", function (e) {
    if (idBKK.value !== "" && idBank.value !== "") {
        ModeKoreksi = true;
        enableBKK();
        tanggalInput.focus();
    } else {
        Swal.fire({
            icon: "error",
            text: "Tidak Ada Data Yg DiKoreksi",
            returnFocus: false,
        }).then(() => {
            enableBKK();
            tanggalInput.focus();
        });
    }
});

btnProsesBg.addEventListener("click", function (e) {
    console.log(proses);

    if (proses === 1) {
        if (jatuhTempo.value !== "" && cetak.value !== "") {
            tmpArr = [noBg.value, jatuhTempo.value, cetak.value];
            updateDataTable(tmpArr, 1);
            $("#modalBg").modal("hide");
            btnBG.disabled = true;
            btnPerkiraan1.focus();
        } else {
            Swal.fire({
                icon: "error",
                text: "Isi Datanya Yg Lengkap!",
                returnFocus: false,
            }).then(() => {
                noBg.focus();
            });
        }
    } else if (proses === 2) {
        if (jatuhTempo.value !== "" && cetak.value !== "") {
            arrBg[0] = noBg.value;
            arrBg[1] = jatuhTempo.value;
            arrBg[2] = cetak.value;

            var table = $("#tableBg").DataTable();
            table.row(arrBg[3]).data(arrBg).draw();

            Swal.fire({
                icon: "success",
                text: "Data Sudah TerKoreksi",
                returnFocus: false,
            }).then(() => {
                $("#modalBg").modal("hide");
            });
        } else {
            Swal.fire({
                icon: "error",
                text: "Isi Datanya Yg Lengkap!",
                returnFocus: false,
            }).then(() => {
                noBg.focus();
            });
        }
    } else if (proses === 3) {
        var table = $("#tableBg").DataTable();
        table.row(arrBg[3]).remove().draw();

        Swal.fire({
            icon: "success",
            text: "Data Sudah TerHapus",
            returnFocus: false,
        }).then(() => {
            $("#modalBg").modal("hide");
            btnBG.disabled = false;
        });
    }
});

var arrBKK, arrBg, arrBKM;

$("#tableDetailBiayaBKK tbody").on("click", "tr", function () {
    var table = $("#tableDetailBiayaBKK").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");

    var data = table.row(this).data();
    var rowIndex = table.row(this).index();

    arrBKK = [
        decodeHtmlEntities(data[0]),
        decodeHtmlEntities(data[1]),
        decodeHtmlEntities(data[2]),
        rowIndex,
    ];
});

$("#tableBg tbody").on("click", "tr", function () {
    var table = $("#tableBg").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");

    var data = table.row(this).data();
    var rowIndex = table.row(this).index();

    arrBg = [
        decodeHtmlEntities(data[0]),
        decodeHtmlEntities(data[1]),
        decodeHtmlEntities(data[2]),
        rowIndex,
    ];
});

$("#tableDetailBiayaBKM tbody").on("click", "tr", function () {
    var table = $("#tableDetailBiayaBKM").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");

    var data = table.row(this).data();
    var rowIndex = table.row(this).index();

    arrBKM = [
        decodeHtmlEntities(data[0]),
        decodeHtmlEntities(data[1]),
        decodeHtmlEntities(data[2]),
        rowIndex,
    ];
});

btnKoreksiBg.addEventListener("click", function (e) {
    var table = $("#tableBg").DataTable();
    if (table.rows(".selected").any()) {
        $("#modalBg").modal("show");
        $("#modalBg").on("shown.bs.modal", function () {
            proses = 2;
            noBg.value = arrBg[0];
            jatuhTempo.value = arrBg[1];
            cetak.value = arrBg[2];
            bankBg.value = idBank1.value;
            jenisBg.value = jenisBayar1.value;
            noBg.readOnly = false;
            jatuhTempo.readOnly = false;
            cetak.readOnly = false;
            noBg.focus();
        });
    } else {
        Swal.fire({
            icon: "error",
            text: "Pilih 1 Detail Biaya U/ DiKoreksi!",
            returnFocus: false,
        });
    }
});

btnHapusBg.addEventListener("click", function (e) {
    var table = $("#tableBg").DataTable();
    if (table.rows(".selected").any()) {
        $("#modalBg").modal("show");
        $("#modalBg").on("shown.bs.modal", function () {
            proses = 3;
            noBg.value = arrBg[0];
            jatuhTempo.value = arrBg[1];
            cetak.value = arrBg[2];
            bankBg.value = idBank1.value;
            jenisBg.value = jenisBayar1.value;
            noBg.readOnly = true;
            jatuhTempo.readOnly = true;
            cetak.readOnly = true;
            btnProsesBg.focus();
        });
    } else {
        Swal.fire({
            icon: "error",
            text: "Pilih 1 Detail Biaya U/ DiHapus!",
            returnFocus: false,
        });
    }
});

btnBatal.addEventListener("click", function (e) {
    location.reload();
    // tanggalInput.value = today;
    // tgl.value = today;
    // idBKK.value = '';
    // mataUang1.value = '';
    // idUang1.value = '';
    // symbol1.value = '';
    // uang1.value = '0';
    // bank1.value = '';
    // idBank1.value = '';
    // jenisBank1.value = '';
    // jenisBayar1.value = '';
    // idPerkiraan1.value = '';
    // perkiraan1.value = '';
    // uraian1.value = '';
    // idBKM.value = '';
    // mataUang.value = '';
    // idUang.value = '';
    // symbol.value = '';
    // kurs.value = '0';
    // uang.value = '0';
    // bank.value = '';
    // idBank.value = '';
    // jenisBank.value = '';
    // jenisBayar.value = '';
    // idPerkiraan.value = '';
    // perkiraan.value = '';
    // uraian.value = '';
    // listBiaya.value = 0;
    // listBiaya1.value = 0;
    // var table = $('#tableDetailBiayaBKK').DataTable();
    // var tableAsal = $('#tableBg').DataTable();
    // var tableTujuan = $('#tableDetailBiayaBKM').DataTable();
    // table.clear().draw();
    // tableAsal.clear().draw();
    // tableTujuan.clear().draw();
    // enableBKK();
    // disableBKM();
    // btnBiaya.disabled = true;
    // btnBiaya1.disabled = true;
    // ModeKoreksi = false;
    // tanggalInput.focus();
});

btnProses.addEventListener("click", async function (e) {
    btnProses.disabled = true;
    btnKoreksiForm.disabled = true;
    btnBatal.disabled = true;
    btnTampilBKK.disabled = true;
    btnTampilBKM.disabled = true;
    if (!idBKK.value.trim() || !idBKM.value.trim()) {
        Swal.fire({
            icon: "error",
            text: "Tidak Ada Yg diPROSES!",
            returnFocus: false,
        }).then(() => {
            enableBKK();
            tanggalInput.focus();
            btnProses.disabled = false;
            btnKoreksiForm.disabled = false;
            btnBatal.disabled = false;
            btnTampilBKK.disabled = false;
            btnTampilBKM.disabled = false;
        });
        return;
    }

    let idbkm = isNaN(parseInt(idBKM.value.substring(0, 3)))
        ? 0
        : parseInt(idBKM.value.substring(0, 3));
    let idbkk = isNaN(parseInt(idBKK.value.substring(0, 3)))
        ? 0
        : parseInt(idBKK.value.substring(0, 3));

    let biaya = 0,
        biaya1 = 0,
        ada1 = false,
        ada2 = false,
        ada3 = false;
    let allBKK = [],
        allBg = [],
        allBKM = [];

    // Ambil data dari tabel
    let tableBKK = $("#tableDetailBiayaBKK").DataTable();
    let tableBKM = $("#tableDetailBiayaBKM").DataTable();
    let tableBg = $("#tableBg").DataTable();

    if (tableBKK.data().length > 0) {
        allBKK = tableBKK
            .rows()
            .data()
            .toArray()
            .map((data) => [data[0], numeral(data[1]).value(), data[2]]);
        biaya = allBKK.reduce((sum, item) => sum + item[1], 0);
        ada1 = true;
    }

    if (tableBKM.data().length > 0) {
        allBKM = tableBKM
            .rows()
            .data()
            .toArray()
            .map((data) => [data[0], numeral(data[1]).value(), data[2]]);
        biaya1 = allBKM.reduce((sum, item) => sum + item[1], 0);
        ada3 = true;
    }

    if (tableBg.data().length > 0) {
        allBg = tableBg.rows().data().toArray();
        ada2 = true;
    }

    // Hitung total nilai dan konversi angka ke teks
    let nilai = biaya + numeral(uang1.value).value();
    let nilai1 = biaya + numeral(uang.value).value();

    let konversi =
        parseInt(idUang1.value) === 1
            ? convertNumberToWordsRupiah(nilai)
            : convertNumberToWordsDollar(nilai);
    let konversi2 =
        parseInt(idUang.value) === 1
            ? convertNumberToWordsRupiah(nilai1)
            : convertNumberToWordsDollar(nilai1);

    try {
        // Proses insert BKK & transaksi BKK secara paralel
        await Promise.all([
            (async () => {
                const response = await $.ajax({
                    type: "PUT",
                    url: "/Kencana/BKMTransistorisBankKencana/insertBKK",
                    data: {
                        _token: csrfToken,
                        idBKK: idBKK.value.trim(),
                        tgl: tanggalInput.value,
                        terjemahan: konversi,
                        nilai: numeral(parseFloat(nilai)).value(),
                        IdBank: idBank1.value.trim(),
                    },
                });

                if (response.success) {
                    return $.ajax({
                        type: "PUT",
                        url: "/Kencana/BKMTransistorisBankKencana/insertTransBKK",
                        data: {
                            _token: csrfToken,
                            idBKK: idBKK.value,
                            idUang: idUang1.value,
                            idJenis: idJenisBayar1.value,
                            idBank: idBank1.value,
                            nilai: numeral(parseFloat(nilai)).value(),
                            kurs:
                                numeral(parseFloat(kurs.value)).value() || null,
                        },
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            })(),
        ]);

        // Ambil IdPembayaran setelah proses insert
        let result = await $.ajax({
            type: "GET",
            url: "/Kencana/BKMTransistorisBankKencana/getIdPembayaran",
            data: { _token: csrfToken },
        });

        if (result.length !== 0) {
            let IdPembayaran = decodeHtmlEntities(result);
            console.log(IdPembayaran);

            let detailRequests = [
                $.ajax({
                    type: "PUT",
                    url: "/Kencana/BKMTransistorisBankKencana/insertTrans2BKK",
                    data: {
                        _token: csrfToken,
                        idpembayaran: IdPembayaran,
                        keterangan: uraian1.value,
                        biaya: numeral(uang1.value).value(),
                        kodeperkiraan: idPerkiraan1.value,
                    },
                }),
            ];

            if (ada1) {
                detailRequests.push(
                    $.ajax({
                        type: "PUT",
                        url: "/Kencana/BKMTransistorisBankKencana/insertDetailBKK",
                        data: {
                            _token: csrfToken,
                            idpembayaran: IdPembayaran,
                            detailBKK: allBKK,
                        },
                    })
                );
            }

            if (ada2) {
                detailRequests.push(
                    $.ajax({
                        type: "PUT",
                        url: "/Kencana/BKMTransistorisBankKencana/insertBg",
                        data: {
                            _token: csrfToken,
                            id: IdPembayaran,
                            no: allBg[0][0],
                            jthtempo: allBg[0][1],
                            status: allBg[0][2],
                        },
                    })
                        .then(() =>
                            $.ajax({
                                type: "GET",
                                url: "/Kencana/BKMTransistorisBankKencana/cekBg",
                                data: {
                                    _token: csrfToken,
                                    idpembayaran: IdPembayaran,
                                },
                            })
                        )
                        .then((result) => {
                            if (result.length !== 0) {
                                let idBG = decodeHtmlEntities(
                                    result[0].IdBGCEK
                                );
                                return $.ajax({
                                    type: "PUT",
                                    url: "/Kencana/BKMTransistorisBankKencana/updateBg",
                                    data: {
                                        _token: csrfToken,
                                        id: IdPembayaran,
                                        idBG: idBG,
                                    },
                                });
                            }
                        })
                );
            }

            await Promise.all(detailRequests);
        }

        // Proses insert BKM
        await Promise.all([
            (async () => {
                try {
                    const response = await $.ajax({
                        type: "PUT",
                        url: "/Kencana/BKMTransistorisBankKencana/insertBKM",
                        data: {
                            _token: csrfToken,
                            idBKM: idBKM.value.trim(),
                            tglinput: tgl.value,
                            terjemahan: konversi2,
                            nilai: numeral(parseFloat(nilai1)).value(),
                            IdBank: idBank.value.trim(),
                        },
                    });

                    if (response.success) {
                        return await $.ajax({
                            type: "PUT",
                            url: "/Kencana/BKMTransistorisBankKencana/insertTransBKM",
                            data: {
                                _token: csrfToken,
                                idBKM: idBKM.value,
                                tgl: tgl.value,
                                idUang: idUang.value,
                                idJenis: idJenisBayar.value,
                                idBank: idBank.value,
                                kodeperkiraan: idPerkiraan.value,
                                uraian: uraian.value,
                                nilaipelunasan: numeral(uang.value).value(),
                                idBKKAcuan: idBKK.value,
                                kurs:
                                    numeral(parseFloat(kurs.value)).value() ||
                                    null,
                            },
                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: "info",
                            title: "Info!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    }
                } catch (err) {
                    console.error("Gagal insert BKM:", err);
                }
            })(),
        ]);

        if (ada3) {
            let result = await $.ajax({
                type: "GET",
                url: "/Kencana/BKMTransistorisBankKencana/getIdPelunasan",
                data: { _token: csrfToken },
            });

            if (result.length !== 0) {
                let IdPelunasan = decodeHtmlEntities(result);
                await $.ajax({
                    type: "PUT",
                    url: "/Kencana/BKMTransistorisBankKencana/insertDetailBKM",
                    data: {
                        _token: csrfToken,
                        idpelunasan: IdPelunasan,
                        detailBKM: allBKM,
                    },
                });
            }
        }

        Swal.fire({
            icon: "success",
            text: `BKK No. ${idBKK.value} & BKM No. ${idBKM.value} TerSimpan`,
            returnFocus: false,
        }).then(() => location.reload());
    } catch (error) {
        console.error("Error:", error);
    }
});

$(document).ready(function () {
    $("#tableDetailBiayaBKK").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: "Keterangan" },
            { title: "Biaya" },
            { title: "Kode Perkiraan" },
        ],
        scrollY: "125px",
        autoWidth: false,
        scrollX: "100%",
        columnDefs: [
            { targets: [0, 1, 2], width: "33%", className: "fixed-width" },
        ],
    });

    $("#tableBg").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: "Nomer" },
            { title: "Jatuh Tempo" },
            { title: "Status Cetak" },
        ],
        scrollY: "75px",
        autoWidth: false,
        scrollX: "100%",
        columnDefs: [
            { targets: [0, 1, 2], width: "33%", className: "fixed-width" },
        ],
    });

    $("#tableDetailBiayaBKM").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: "Keterangan" },
            { title: "Biaya" },
            { title: "Kode Perkiraan" },
        ],
        scrollY: "125px",
        autoWidth: false,
        scrollX: "100%",
        columnDefs: [
            { targets: [0, 1, 2], width: "33%", className: "fixed-width" },
        ],
    });
});

function updateDateBKK() {
    $.ajax({
        type: "PUT",
        url: "BKMLC/updateDateBKK",
        data: {
            _token: csrfToken,
            idBKK: idCetakBKK.value.trim(),
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function updateDateBKM() {
    $.ajax({
        type: "PUT",
        url: "BKMLC/updateDateBKM",
        data: {
            _token: csrfToken,
            idBKM: idCetakBKM.value.trim(),
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}
