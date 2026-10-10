var csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

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
var primer = document.getElementById("primer");
var sekunder = document.getElementById("sekunder");
var tritier = document.getElementById("tritier");
var no_primer = document.getElementById("no_primer");
var no_sekunder = document.getElementById("no_sekunder");
var no_tritier = document.getElementById("no_tritier");
var divisiId = document.getElementById("divisiId");
var objekId = document.getElementById("objekId");
var kodeTransaksi = document.getElementById("kodeTransaksi");
var namaBarang = document.getElementById("namaBarang");

// button
var btn_divisi = document.getElementById("btn_divisi");
var btn_objek = document.getElementById("btn_objek");
var btn_proses = document.getElementById("btn_proses");
var btn_batal = document.getElementById("btn_batal");
var btn_refresh = document.getElementById("btn_refresh");

tanggal.value = todayString;

// Setup global AJAX handlers
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
            escapeHtml(formatNumber(item.JumlahPengeluaranPrimer ? item.JumlahPengeluaranPrimer.trim() : "0")) || 0,
            escapeHtml(formatNumber(item.JumlahPengeluaranSekunder ? item.JumlahPengeluaranSekunder.trim() : "0")) || 0,
            escapeHtml(formatNumber(item.JumlahPengeluaranTritier ? item.JumlahPengeluaranTritier.trim() : "0")) || 0,
            escapeHtml(item.SaatAwalTransaksi.trim()),
            escapeHtml(item.KodeBarang.trim()),
            escapeHtml(item.TujuanIdSubkelompok.trim()),
        ]);
    });
    table.draw();
}

var Primer, Sekunder, Tritier, SaldoPrimer, SaldoTritier, SaldoSekunder;
$("#tableData tbody").on("click", "tr", function () {
    var table = $("#tableData").DataTable();
    // table.$('tr.selected').removeClass('selected');
    $(this).toggleClass("selected");
    var isSelected = $(this).hasClass("selected");
    var data = table.row(this).data();
    // var checkbox = $(this).find('input.row-checkbox');

    if (isSelected) {
        kodeTransaksi.value = data[0];
        namaBarang.value = decodeHtmlEntities(data[1]);

        kelutNama.value = decodeHtmlEntities(data[3]);
        kelompokNama.value = decodeHtmlEntities(data[4]);
        subkelNama.value = decodeHtmlEntities(data[5]);
        primer.value = formatNumber(data[7]);
        sekunder.value = formatNumber(data[8]);
        tritier.value = formatNumber(data[9]);

        $.ajax({
            type: "GET",
            url: "/Kencana/PermohonanPenerimaKencana/getSelect",
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

                    no_primer.value = result[0].Satuan_Primer?.trim() || "Null";
                    no_sekunder.value = result[0].Satuan_Sekunder?.trim() || "Null"; // prettier-ignore
                    no_tritier.value = result[0].Satuan_Tritier?.trim() || "Null"; // prettier-ignore

                    SaldoPrimer = result[0].SaldoPrimer;
                    SaldoSekunder = result[0].SaldoSekunder;
                    SaldoTritier = result[0].SaldoTritier;

                    Primer = parseFloat(SaldoPrimer - primer.value);
                    Sekunder = parseFloat(SaldoSekunder - sekunder.value);
                    Tritier = parseFloat(SaldoTritier - tritier.value);

                    console.log(Primer, Sekunder, Tritier);

                    // if (checkbox.is(':checked')) {
                    //     const index = completeDataArray.findIndex(item => item.tableData[1] === data[1]);
                    //     if (index === -1) {
                    //         completeDataArray.push({
                    //             tableData: data,
                    //             ajaxResult: result
                    //         });
                    //     }
                    //     console.log('data lengkap: ', completeDataArray);
                    // }
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    } else {
        kodeTransaksi.value = "";
        namaBarang.value = "";
        kelutNama.value = "";
        kelompokNama.value = "";
        subkelNama.value = "";
        primer.value = "";
        sekunder.value = "";
        tritier.value = "";
        divisiNama2.value = "";
        objekNama2.value = "";
        kelutNama2.value = "";
        kelompokNama2.value = "";
        subkelNama2.value = "";
        no_primer.value = "";
        no_sekunder.value = "";
        no_tritier.value = "";
    }
});
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
        url: "/Kencana/PermohonanPenerimaKencana/getUserId",
        data: {
            _token: csrfToken,
        },
        success: function (result) {
            user.value = result.trim();
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

// Function to check 'Cek_Sesuai_Pemberi'
async function Cek_Sesuai_Pemberi(sIdtrans) {
    try {
        const response = await $.ajax({
            type: "GET",
            url: "/Kencana/PermohonanPenerimaKencana/cekSesuaiPemberi",
            data: {
                _token: csrfToken,
                idtransaksi: sIdtrans,
            },
        });
        console.log(response);

        Yidtype = decodeHtmlEntities(response[0].IdType);
        if (response[0].jumlah >= 1) {
            await Swal.fire({
                icon: "info",
                text:
                    "Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type " +
                    Yidtype +
                    " Pada divisi pemberi",
            });
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

var Yidtype, YIdTypePenerima;
// Function to check 'Cek_Sesuai_Penerima'
async function Cek_Sesuai_Penerima(sIdtrans, sKodeBarang) {
    try {
        const response = await $.ajax({
            type: "GET",
            url: "/Kencana/PermohonanPenerimaKencana/cekSesuaiPenerima",
            data: {
                _token: csrfToken,
                idtransaksi: sIdtrans,
                KodeBarang: sKodeBarang,
            },
        });
        YIdTypePenerima = decodeHtmlEntities(response[0].IdType);
        if (response[0].jumlah >= 1) {
            await Swal.fire({
                icon: "info",
                text:
                    "Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type " +
                    YIdTypePenerima +
                    " Pada divisi pemberi",
            });
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

btn_ok.addEventListener("click", function () {
    showTable();
    btn_ok.disabled = true;
});

btn_refresh.addEventListener("click", function () {
    showTable();
});

btn_proses.addEventListener("click", async function () {
    // btn_proses.disabled = true;
    const table = $("#tableData").DataTable();
    const selectedRows = table.rows("tr.selected").data();

    if (selectedRows.length === 0) {
        Swal.fire({
            icon: "warning",
            html: "Pilih minimal satu baris untuk diproses.",
        });
        btn_proses.disabled = false;
        return;
    }

    let transaksiList = [];
    let valid = true;

    for (let i = 0; i < selectedRows.length; i++) {
        const data = selectedRows[i];
        const kodeTransaksi = data[0]; // first column
        const kodeBarang = data[11]; // adjust as needed

        transaksiList.push({ kodeTransaksi, kodeBarang });

        // Optional: you can check saldo validity per row here if needed
        if (
            parseFloat(Primer) < 0 ||
            parseFloat(Sekunder) < 0 ||
            parseFloat(Tritier) < 0
        ) {
            Swal.fire({
                icon: "error",
                html: `Saldo tidak cukup untuk transaksi ${kodeTransaksi}, cek stok Anda!`,
            });
            valid = false;
            break;
        }
    }

    if (!valid) {
        btn_proses.disabled = false;
        return;
    }

    $.ajax({
        type: "PUT",
        url: "/Kencana/PermohonanPenerimaKencana/proses",
        data: {
            _token: csrfToken,
            transaksiList: transaksiList,
            primer: primer.value,
            sekunder: sekunder.value,
            tritier: tritier.value,
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
            // Decide icon dynamically
            let iconType = "success";
            if (successList.length > 0 && errorList.length > 0) {
                iconType = "warning";
            } else if (errorList.length > 0 && successList.length === 0) {
                iconType = "error";
            }

            Swal.fire({
                icon: iconType,
                title: "Hasil Proses",
                html: htmlContent,
                returnFocus: false,
                width: 600,
            }).then(() => {
                showTable(); // refresh table or UI
            });
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
    // .then((result) => {
    //     sError = result.Nmerror.trim();
    //     btn_proses.disabled = false;

    //     if (sError === "BENAR") {
    //         simpan = true;
    //         ada = true;
    //         if (simpan) {
    //             Swal.fire({
    //                 icon: "success",
    //                 title: "Success",
    //                 text: "Data Sudah Disimpan!!",
    //                 returnFocus: false,
    //             }).then(() => {
    //                 clearInputs();
    //                 showTable();
    //             });
    //         } else if (!ada) {
    //             Swal.fire({
    //                 icon: "warning",
    //                 title: "Warning!",
    //                 text: "Tidak Ada Data Yang DiTerima!!!!....., Untuk Menerima Barang pilih data pada tabel tersedia ",
    //                 returnFocus: false,
    //             }).then(() => {
    //                 return;
    //             });
    //         }
    //     } else {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Error!",
    //             html: `Untuk Idtransaksi = ${Yidtransaksi} Tidak bisa diacc.<br>${sError}`,
    //             returnFocus: false,
    //         }).then(() => {
    //             return;
    //         });
    //     }
    // });
});

function clearInputs() {
    kelutNama.value = "";
    kelompokNama.value = "";
    subkelNama.value = "";
    kodeTransaksi.value = "";
    divisiNama2.value = "";
    objekNama2.value = "";
    kelutNama2.value = "";
    kelompokNama2.value = "";
    subkelNama2.value = "";
    namaBarang.value = "";
    primer.value = "";
    sekunder.value = "";
    tritier.value = "";
    no_primer.value = "";
    no_sekunder.value = "";
    no_tritier.value = "";
}

// button list divisi pemberi
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
                            url: "/Kencana/PermohonanPenerimaKencana/getDivisi",
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
                divisiId.value = result.value.IdDivisi.trim();
                divisiNama.value = decodeHtmlEntities(
                    result.value.NamaDivisi.trim()
                );

                btn_objek.disabled = false;
                btn_objek.focus();
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
                            url: "/Kencana/PermohonanPenerimaKencana/getObjek",
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
                objekId.value = result.value.IdObjek.trim();
                objekNama.value = decodeHtmlEntities(
                    result.value.NamaObjek.trim()
                );

                if (objekNama.value !== "") {
                    btn_ok.disabled = false;
                    btn_ok.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
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
            { targets: [0], width: "12%", className: "fixed-width" },
            { targets: [1], width: "27%", className: "fixed-width" },
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
        ],
    });
});
