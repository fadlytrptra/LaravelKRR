var csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

var tanggal = document.getElementById("tanggal");
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
var primer = document.getElementById("primer");
var sekunder = document.getElementById("sekunder");
var tritier = document.getElementById("tritier");
var no_primer = document.getElementById("no_primer");
var no_sekunder = document.getElementById("no_sekunder");
var no_tritier = document.getElementById("no_tritier");
var kodeTransaksi = document.getElementById("kodeTransaksi");

var divisiId = document.getElementById("divisiId");
var objekId = document.getElementById("objekId");
var typeKonv = document.getElementById("typeKonv");
var idKonv = document.getElementById("idKonv");
var idTrans = document.getElementById("idTrans");

// button
var btn_proses = document.getElementById("btn_proses");
var btn_batal = document.getElementById("btn_batal");
var btn_refresh = document.getElementById("btn_refresh");
var btn_ok = document.getElementById("btn_ok");
var btn_konversi = document.getElementById("btn_konversi");
var btn_typeKonv = document.getElementById("btn_typeKonv");

var today = new Date().toISOString().slice(0, 10);
tanggal.value = today;

let simpan,
    Yidtransaksi,
    kodeBarang,
    YIdTypeKonv,
    jumlah,
    YidType,
    YidTypePenerima,
    subkel,
    sIdKonv,
    sError,
    pprimer,
    ssekunder,
    ttritier;
let ada = false;
btn_ok.focus();

divisiNama.value = "Circular loom";
objekId.value = "095";
objekNama.value = "Bahan Baku";

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
            user.value = result.user.trim();
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

$(document).ready(function () {
    getUserId();
});

$(document).ready(function () {
    table = $("#tableData").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: "ID Trans" },
            { title: "Barang" },
            { title: "Alasan Mutasi" },
            { title: "Kelut Penerima" },
            { title: "Kel Penerima" },
            { title: "SubKel" },
            { title: "Pemohon" },
            { title: "Primer" },
            { title: "Sekunder" },
            { title: "Tritier" },
            { title: "Tgl Mohon" },
            { title: "KdBrg" },
            { title: "IdSubkel" },
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
        order: [[1, "asc"]],
        scrollY: "400px",
        autoWidth: false,
        scrollX: "100%",
        columnDefs: [
            { targets: [0], width: "20%", className: "fixed-width" },
            { targets: [1], width: "30%", className: "fixed-width" },
            { targets: [2], width: "25%", className: "fixed-width" },
            { targets: [3], width: "12%", className: "fixed-width" },
            { targets: [4], width: "10%", className: "fixed-width" },
            { targets: [5], width: "10%", className: "fixed-width" },
            { targets: [6], width: "10%", className: "fixed-width" },
            { targets: [7], width: "12%", className: "fixed-width" },
            { targets: [8], width: "12%", className: "fixed-width" },
            { targets: [9], width: "12%", className: "fixed-width" },
            { targets: [10], width: "12%", className: "fixed-width" },
            { targets: [11], width: "12%", className: "fixed-width" },
            { targets: [12], width: "12%", className: "fixed-width" },
        ],
    });
});

// fungsi unk update isi tabel
function updateDataTable(data) {
    var table = $("#tableData").DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdTransaksi.trim()),
            escapeHtml(item.NamaType.trim()),
            escapeHtml(item.UraianDetailTransaksi.trim()),
            escapeHtml(item.NamaKelompokUtama.trim()),
            escapeHtml(item.NamaKelompok.trim()),
            escapeHtml(item.NamaSubKelompok.trim()),
            escapeHtml(item.IdPemberi.trim()),
            escapeHtml(formatNumber(item.JumlahPengeluaranPrimer.trim())),
            escapeHtml(formatNumber(item.JumlahPengeluaranSekunder.trim())),
            escapeHtml(formatNumber(item.JumlahPengeluaranTritier.trim())),
            escapeHtml(item.SaatAwalTransaksi.trim()),
            escapeHtml(item.KodeBarang.trim()),
            escapeHtml(item.TujuanIdSubkelompok.trim()),
        ]);
    });
    table.draw();
}

$("#tableData tbody").on("click", "tr", function () {
    var table = $("#tableData").DataTable();
    var data = table.row(this).data();
    var checkbox = $(this).find("input.row-checkbox");
    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected"); // Remove the 'selected' class if it's already selected

        kodeTransaksi.value = "";
        namaBarang.value = "";
        kelutNama.value = "";
        kelompokNama.value = "";
        subkelNama.value = "";
        primer.value = "";
        pprimer = "";
        sekunder.value = "";
        ssekunder = "";
        tritier.value = "";
        ttritier = "";
        kodeBarang = "";
        divisiNama2.value = "";
        objekNama2.value = "";
        kelutNama2.value = "";
        kelompokNama2.value = "";
        subkelNama2.value = "";
        no_primer.value = "";
        no_sekunder.value = "";
        no_tritier.value = "";
        subkel = "";
    } else {
        // If it's not selected, add the 'selected' class and remove it from any previously selected rows
        // table.$("tr.selected").removeClass("selected");
        $(this).addClass("selected");
        kodeTransaksi.value = data[0];
        namaBarang.value = decodeHtmlEntities(data[1]);
        kelutNama.value = decodeHtmlEntities(data[3]);
        kelompokNama.value = decodeHtmlEntities(data[4]);
        subkelNama.value = decodeHtmlEntities(data[5]);
        primer.value = formatNumber(data[7]);
        pprimer = formatNumber(data[7]);
        sekunder.value = formatNumber(data[8]);
        ssekunder = formatNumber(data[8]);
        tritier.value = formatNumber(data[9]);
        ttritier = formatNumber(data[9]);
        kodeBarang = data[11];
        subkel = data[12];

        $.ajax({
            type: "GET",
            url: "/Kencana/PermohonanPenerimaBenangKencana/getSelect",
            data: {
                _token: csrfToken,
                kodeTransaksi: kodeTransaksi.value,
            },
            success: function (result) {
                if (result) {
                    divisiNama2.value = result[0].NamaDivisi.trim();
                    objekNama2.value = result[0].NamaObjek.trim();
                    kelutNama2.value = result[0].NamaKelompokUtama.trim();
                    kelompokNama2.value = result[0].NamaKelompok.trim();
                    subkelNama2.value = result[0].NamaSubKelompok.trim();

                    no_primer.value = result[0].Satuan_Primer?.trim() || "";
                    no_sekunder.value = result[0].Satuan_Sekunder?.trim() || "";
                    no_tritier.value = result[0].Satuan_Tritier?.trim() || "";
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
});

// menampilkan semua data
function showTable() {
    $.ajax({
        type: "GET",
        url: "/Kencana/PermohonanPenerimaBenangKencana/getData",
        data: {
            _token: csrfToken,
            objekId: objekId.value,
            divisiNama: divisiNama.value,
        },
        success: function (response) {
            if (response.warning) {
                Swal.fire({
                    icon: "warning",
                    html: response.warning,
                    returnFocus: false,
                });
            } else {
                updateDataTable(response);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

btn_ok.addEventListener("click", function () {
    showTable();
    btn_ok.disabled = true;
});

btn_refresh.addEventListener("click", function () {
    showTable();
});

btn_batal.addEventListener("click", function () {
    btn_ok.disabled = false;
    clearInputs();
    var table = $("#tableData").DataTable();
    table.clear().draw();
    btn_ok.focus();
});

btn_typeKonv.addEventListener("click", function () {
    try {
        Swal.fire({
            title: "Konversi",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id Konversi</th>
                            <th scope="col">Nama Type</th>
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
                            url: "/Kencana/PermohonanPenerimaBenangKencana/getTypeKonv",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                subkel: subkel,
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
                typeKonv.value = result.value.NamaType.trim();
                idKonv.value = result.value.IdType.trim();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function TmpNama(sNama) {
    let tmpNama = "";
    let k = 0; // JavaScript strings are 0-based indexed
    let l = 0;

    if (sNama.slice(-3) !== "-DB") {
        console.log("asdasda", sNama);

        while (k < sNama.length) {
            if (sNama[k] === "-") {
                l += 1;
            }
            tmpNama += sNama[k];
            if (l === 4) break;
            k += 1;
        }

        tmpNama += "GO-N";

        typeKonv.value = tmpNama;

        return tmpNama;
    } else {
        tmpNama = "";
        return tmpNama;
    }
}

function cekPemberi(Yidtransaksi) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "/Kencana/PermohonanPenerimaBenangKencana/getPemberi",
            data: {
                _token: csrfToken,
                Yidtransaksi: Yidtransaksi,
            },
            success: function (response) {
                console.log(response);
                jumlah = parseFloat(response[0].jumlah.trim());
                YidType = response[0].IdType.trim();

                if (jumlah >= 1) {
                    Swal.fire({
                        icon: "warning",
                        title: "Warning!",
                        text: `Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type ${YidType} Pada divisi pemberi`,
                        returnFocus: false,
                    }).then(() => {
                        reject("Jumlah >= 1");
                    });
                } else {
                    resolve(true);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

function cekPenerima(Yidtransaksi, kodeBarang) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "/Kencana/PermohonanPenerimaBenangKencana/getPenerima",
            data: {
                _token: csrfToken,
                Yidtransaksi: Yidtransaksi,
                kodeBarang: kodeBarang,
            },
            success: function (response) {
                console.log(response);

                jumlah = parseFloat(response.jumlah.trim());
                YidTypePenerima = response.IdType.trim();

                if (jumlah >= 1) {
                    Swal.fire({
                        icon: "warning",
                        title: "Warning!",
                        text: `Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type ${YidType} Pada divisi penerima`,
                        returnFocus: false,
                    }).then(() => {
                        reject("Jumlah >= 1");
                    });
                } else {
                    resolve(YidTypePenerima);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

function cekKonversi(namaBarang) {
    // console.log(namaBarang);

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "/Kencana/PermohonanPenerimaBenangKencana/getKonversi",
            data: {
                _token: csrfToken,
                namaBarang: namaBarang,
            },
            success: function (response) {
                console.log(response);

                if (response[0] && response[0].Result.trim() === "True") {
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

async function cekPenyesuaianKonversi(YIdTypeKonv) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "/Kencana/PermohonanPenerimaBenangKencana/getPenyesuaianKonversi",
            data: {
                _token: csrfToken,
                YIdTypeKonv: YIdTypeKonv,
            },
            success: function (response) {
                const jumlah = parseFloat(response[0].jumlah.trim());

                if (jumlah >= 1) {
                    Swal.fire({
                        icon: "warning",
                        title: "Warning!",
                        text: `Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type ${YIdTypeKonv} Pada divisi pemberi`,
                        returnFocus: false,
                    }).then(() => {
                        resolve(false);
                    });
                } else {
                    resolve(true);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

function cariType(brg, sbke) {
    console.log(brg, sbke);

    $.ajax({
        type: "GET",
        url: "/Kencana/PermohonanPenerimaBenangKencana/getType",
        data: {
            _token: csrfToken,
            namaBarang: brg ?? "",
            subkel: sbke,
        },
        success: function (response) {
            if (response.length !== 0) {
                console.log(response);

                idKonv.value = response[0].IdType
                    ? response[0].IdType.trim()
                    : "";
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

async function getIdKonv() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "PUT",
            url: "/Kencana/PermohonanPenerimaBenangKencana/getIdKonv",
            data: {
                _token: csrfToken,
            },
            success: function (response) {
                sIdKonv = response.IDKonversi.trim();
                console.log(sIdKonv);
                resolve(sIdKonv);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

async function saveDataAsal(konv) {
    console.log(
        konv,
        YidTypePenerima,
        pprimer,
        ssekunder,
        ttritier,
        subkel,
        idTrans.value
    );

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "PUT",
            url: "/Kencana/PermohonanPenerimaBenangKencana/saveDataAsal",
            data: {
                _token: csrfToken,
                sIdKonv: konv,
                YidTypePenerima: YidTypePenerima,
                primer: pprimer, // keluar primer
                sekunder: ssekunder, // keluar sekunder
                tritier: ttritier, // keluar tritier
                subkel: subkel,
                idTrans: idTrans.value,
            },
            success: function (response) {
                resolve(true);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

async function saveDataTujuan(sIdKonv) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "PUT",
            url: "/Kencana/PermohonanPenerimaBenangKencana/saveDataTujuan",
            data: {
                _token: csrfToken,
                sIdKonv: sIdKonv,
                YidTypePenerima: YidTypePenerima,
                primer: pprimer, // keluar primer
                sekunder: ssekunder, // keluar sekunder
                tritier: ttritier, // keluar tritier
                subkel: subkel,
                idTrans: idTrans.value,
            },
            success: function (response) {
                resolve(true);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

btn_proses.addEventListener("click", function () {
    var selectedData = [];

    $("#tableData tbody tr.selected").each(function () {
        var data = table.row(this).data();
        selectedData.push(data);
    });

    if (selectedData.length > 1) {
        Swal.fire({
            icon: "warning",
            title: "Data yang dipilih lebih dari satu!",
            text: `Jika data yang dipilih lebih dari satu, tidak bisa menggunakan fitur konversi. Apakah Anda yakin ingin melanjutkan?`,
            showCancelButton: true,
            returnFocus: false,
        }).then((result) => {
            if (result.isConfirmed) {
                proses().then(() => {
                    clearInputs();
                    showTable();
                });
            }
        });
    } else {
        proses().then(async () => {
            const isKonversi = await cekKonversi(selectedData[0][1]);
            if (!isKonversi && sError === "BENAR") {
                Swal.fire({
                    icon: "question",
                    text: `Apakah Data Ini Akan Di Konversi ?`,
                    returnFocus: false,
                    // showCancelButton: true,
                    confirmButtonText: "OK",
                    // cancelButtonText: 'Tidak'
                }).then((result) => {
                    if (result.isConfirmed) {
                        cariType(TmpNama(selectedData[0][1]), subkel);
                        btn_konversi.disabled = false;
                        btn_typeKonv.disabled = false;
                        btn_refresh.disabled = true;
                        btn_proses.disabled = true;
                        btn_konversi.focus();
                    } else {
                        clearInputs();
                        showTable();
                    }
                });
            } else {
                clearInputs();
                showTable();
            }
        });
    }
    function proses() {
        $.ajax({
            type: "POST",
            url: "/Kencana/PermohonanPenerimaBenangKencana",
            data: {
                _token: csrfToken,
                tableData: selectedData,
            },
            success: function (response) {
                console.log("FULL RESPONSE:", response);
                var successList = [];
                var errorList = [];
                var res = response.response; // ambil isi yang sebenarnya
                if (
                    res &&
                    Array.isArray(res.Nmerror) &&
                    Array.isArray(res.IdTransaksi) &&
                    res.Nmerror.length === res.IdTransaksi.length
                ) {
                    for (var i = 0; i < res.Nmerror.length; i++) {
                        var error = (res.Nmerror[i] || "").trim();
                        var id = res.IdTransaksi[i] || "";
                        if (error === "BENAR") {
                            successList.push(id);
                        } else {
                            errorList.push({ IdTransaksi: id, Nmerror: error });
                        }
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Format Data Tidak Sesuai",
                        text: "Data dari server tidak bisa diproses.",
                    });
                    return;
                }
                // Build HTML for Swal
                var htmlContent = "";
                if (successList.length > 0) {
                    htmlContent += "<strong>✔️ Berhasil:</strong><ul>";
                    successList.forEach(function (id) {
                        htmlContent += `<li>${id}</li>`;
                    });
                    htmlContent += "</ul><br>";
                }
                if (errorList.length > 0) {
                    htmlContent += "<strong>❌ Gagal:</strong><ul>";
                    errorList.forEach(function (item) {
                        htmlContent += `<li><strong>${item.IdTransaksi}:</strong> ${item.Nmerror}</li>`;
                    });
                    htmlContent += "</ul>";
                }
                Swal.fire({
                    icon: errorList.length > 0 ? "warning" : "success",
                    title: "Hasil Proses",
                    html: htmlContent,
                    returnFocus: false,
                    width: 600,
                });
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
});

btn_konversi.addEventListener("click", async function () {
    let sIdKonv = "";

    if (idKonv.value !== "") {
        YIdTypeKonv = idKonv.value;
    }

    if (idKonv.value === "") {
        await Swal.fire({
            icon: "warning",
            title: "Warning!",
            text: `Isikan Dulu Type Benang Tujuan Konversi Pada Subkel : ${subkelNama.value}`,
            returnFocus: false,
        });
        return;
    }

    const isPenyesuaianValid = await cekPenyesuaianKonversi(YIdTypeKonv);
    if (!isPenyesuaianValid) {
        await Swal.fire({
            icon: "warning",
            title: "Warning!",
            text: `Tidak Bisa Dikonversi Karena type tujuan konversi ada penyesuaian`,
            returnFocus: false,
        });
        return;
    }

    sIdKonv = await getIdKonv();
    if (sIdKonv === "") {
        Swal.fire({
            icon: "warning",
            title: "Warning!",
            text: `Klik Kembali Tombol Proses Konversi`,
            returnFocus: false,
        });
        clearInputs();
        showTable();
        return;
    }

    const isDataAsalSaved = await saveDataAsal(sIdKonv);
    if (!isDataAsalSaved) {
        await Swal.fire({
            icon: "warning",
            title: "Warning!",
            text: `Klik Kembali Tombol Proses Konversi`,
            returnFocus: false,
        });
        return;
    }

    const isDataTujuanSaved = await saveDataTujuan(sIdKonv);
    if (!isDataTujuanSaved) {
        await Swal.fire({
            icon: "warning",
            title: "Warning!",
            text: `Klik Kembali Tombol Proses Konversi`,
            returnFocus: false,
        });
        return;
    }

    await Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Data Konversi Sudah Tersimpan`,
        returnFocus: false,
    }).then(() => {
        clearInputs(); // Call your clearInputs function here
        showTable();
        idKonv.value = "";
        typeKonv.value = "";
        idTrans.value = "";
        btn_typeKonv.disabled = true;
        btn_konversi.disabled = true;
        btn_refresh.disabled = false;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
    });
});

function clearInputs() {
    const allInputs = document.querySelectorAll("input");
    const excludeDivIds = ["divisiTanggal", "objUser", "ids"];

    allInputs.forEach(function (input) {
        let shouldClear = true;
        excludeDivIds.forEach(function (id) {
            const excludeDiv = document.getElementById(id);
            if (excludeDiv && excludeDiv.contains(input)) {
                shouldClear = false;
            }
        });
        if (shouldClear) {
            input.value = "";
        }
    });
}
