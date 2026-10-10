var csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

// Assign all IDs to variables
var divisiId = document.getElementById("divisiId");
var divisiNama = document.getElementById("divisiNama");
var btn_divisi = document.getElementById("btn_divisi");
var btn_ok = document.getElementById("btn_ok");
var tanggal = document.getElementById("tanggal");
var objekId = document.getElementById("objekId");
var objekNama = document.getElementById("objekNama");
var btn_objek = document.getElementById("btn_objek");
var userId = document.getElementById("userId");
var kelutNama = document.getElementById("kelutNama");
var kelompokNama = document.getElementById("kelompokNama");
var transaksiId = document.getElementById("transaksiId");
var subkelNama = document.getElementById("subkelNama");
var namaBarang = document.getElementById("namaBarang");

// gk pake
var kelutId = document.getElementById("kelutId");
var kelompokId = document.getElementById("kelompokId");
var subkelId = document.getElementById("subkelId");

var primer = document.getElementById("primer");
var satuanPrimer = document.getElementById("satuanPrimer");
var sekunder = document.getElementById("sekunder");
var satuanSekunder = document.getElementById("satuanSekunder");
var tritier = document.getElementById("tritier");
var satuanTritier = document.getElementById("satuanTritier");

var btn_refresh = document.getElementById("btn_refresh");
var btn_proses = document.getElementById("btn_proses");
var btn_batal = document.getElementById("btn_batal");

var today = new Date().toISOString().slice(0, 10);
tanggal.value = today;

$(document).ready(function () {
    $("#tableData").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: true,
        columns: [
            { title: "IdTrans" },
            { title: "Tanggal" },
            { title: "Barang" },
            { title: "Alasan" },
            { title: "Objek Pemberi" },
            { title: "Kel. Utama" },
            { title: "Kelompok" },
            { title: "Sub Kel" },
            { title: "Pemohon" },
            { title: "Primer" },
            { title: "Sekunder" },
            { title: "Tritier" },
            { title: "Kd Brg" },
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
            { targets: [1], width: "12%", className: "fixed-width" },
            { targets: [2], width: "20%", className: "fixed-width" },
            { targets: [3], width: "25%", className: "fixed-width" },
            { targets: [4], width: "8%", className: "fixed-width" },
            { targets: [5], width: "8%", className: "fixed-width" },
            { targets: [6], width: "8%", className: "fixed-width" },
            { targets: [7], width: "8%", className: "fixed-width" },
            { targets: [8], width: "8%", className: "fixed-width" },
            { targets: [9], width: "8%", className: "fixed-width" },
            { targets: [10], width: "8%", className: "fixed-width" },
            { targets: [11], width: "8%", className: "fixed-width" },
            { targets: [12], width: "8%", className: "fixed-width" },
        ],
    });
});

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

function updateDataTable(data) {
    var table = $("#tableData").DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            // '',
            escapeHtml(item.IdTransaksi),
            formatDateToMMDDYYYY(item.SaatAwalTransaksi),
            escapeHtml(item.NamaType),
            escapeHtml(item.UraianDetailTransaksi) ?? "",
            escapeHtml(item.NamaObjek),
            escapeHtml(item.NamaKelompokUtama),
            escapeHtml(item.NamaKelompok),
            escapeHtml(item.NamaSubKelompok),
            escapeHtml(item.IdPemberi),
            formatNumber(item.JumlahPengeluaranPrimer),
            formatNumber(item.JumlahPengeluaranSekunder),
            formatNumber(item.JumlahPengeluaranTritier),
            escapeHtml(item.KodeBarang),
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

function getUserId() {
    $.ajax({
        type: "GET",
        url: "/Kencana/AccSatuDivisiKencana/getUserId",
        data: {
            _token: csrfToken,
        },
        success: function (result) {
            userId.textContent = result.user;
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

$(document).ready(function () {
    getUserId();
});

var IdTrans;
// , YKdBrg, Yidtransaksi, Primer, Sekunder, Tritier;
$("#tableData tbody").on("click", "tr", function () {
    var table = $("#tableData").DataTable();
    var data = table.row(this).data();
    IdTrans = decodeHtmlEntities(data[0]);
    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected"); // Remove the 'selected' class if it's already selected

        transaksiId.value = "";
        primer.value = "";
        sekunder.value = "";
        tritier.value = "";
        namaBarang.value = "";
        objekNama.value = "";
        kelutNama.value = "";
        kelompokNama.value = "";
        subkelNama.value = "";
        satuanPrimer.value = "";
        satuanSekunder.value = "";
        satuanTritier.value = "";
    } else {
        $(this).addClass("selected");
        transaksiId.value = decodeHtmlEntities(data[0]);
        primer.value = formatNumber(data[9]);
        sekunder.value = formatNumber(data[10]);
        tritier.value = formatNumber(data[11]);
        namaBarang.value = decodeHtmlEntities(data[2]);

        TampilItem(IdTrans);
    }
});

function TampilItem(IdTrans) {
    $.ajax({
        type: "GET",
        url: "/Kencana/AccSatuDivisiKencana/tampilItem",
        data: {
            XIdTransaksi: IdTrans,
            _token: csrfToken,
        },
        success: function (result) {
            if (result) {
                objekNama.value = decodeHtmlEntities(result[0].NamaObjek);
                kelutNama.value = decodeHtmlEntities(result[0].NamaKelompokUtama); // prettier-ignore
                kelompokNama.value = decodeHtmlEntities(result[0].NamaKelompok);
                subkelNama.value = decodeHtmlEntities(result[0].NamaSubKelompok); // prettier-ignore
                satuanPrimer.value = result[0].Satuan_Primer
                    ? decodeHtmlEntities(result[0].Satuan_Primer.trim())
                    : "Null";
                satuanSekunder.value = result[0].Satuan_Sekunder
                    ? decodeHtmlEntities(result[0].Satuan_Sekunder.trim())
                    : "Null";
                satuanTritier.value = result[0].Satuan_Tritier
                    ? decodeHtmlEntities(result[0].Satuan_Tritier.trim())
                    : "Null";
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

// Function to handle the click event
btn_proses.addEventListener("click", async function (e) {
    var selectedData = [];
    var table = $("#tableData").DataTable();

    $("#tableData tbody tr.selected").each(function () {
        var data = table.row(this).data();
        selectedData.push(data);
    });
    if (selectedData.length > 0) {
        $.ajax({
            type: "PUT",
            url: "/Kencana/AccSatuDivisiKencana/proses",
            data: {
                tableData: selectedData,
                _token: csrfToken,
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
                }).then(() => {
                    TampilData();
                });
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Tidak ada data yang diproses",
            text: "Pilih transaksi yang ingin diproses",
        });
    }
});

// Function to check 'Cek_Sesuai_Pemberi'
async function Cek_Sesuai_Pemberi(sIdtrans) {
    try {
        const response = await $.ajax({
            type: "GET",
            url: "/Kencana/AccSatuDivisiKencana/cekSesuaiPemberi",
            data: {
                _token: csrfToken,
                idtransaksi: sIdtrans,
            },
        });
        if (response[0].jumlah >= 1) {
            let Yidtype = decodeHtmlEntities(response[0].IdType);
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

// Function to check 'Cek_Sesuai_Penerima'
async function Cek_Sesuai_Penerima(sIdtrans, sKodeBarang) {
    try {
        const response = await $.ajax({
            type: "GET",
            url: "/Kencana/AccSatuDivisiKencana/cekSesuaiPenerima",
            data: {
                _token: csrfToken,
                idtransaksi: sIdtrans,
                KodeBarang: sKodeBarang,
            },
        });
        if (response[0].jumlah >= 1) {
            let Yidtype = decodeHtmlEntities(response[0].IdType);
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

function ClearForm() {
    kelutNama.value = "";
    kelompokNama.value = "";
    subkelNama.value = "";
    transaksiId.value = "";
    namaBarang.value = "";
    primer.value = "";
    sekunder.value = "";
    tritier.value = "";
    satuanPrimer.value = "";
    satuanSekunder.value = "";
    satuanTritier.value = "";
}

function TampilData() {
    $.ajax({
        type: "GET",
        url: "/Kencana/AccSatuDivisiKencana/tampilData",
        data: {
            XIdDivisi: divisiId.value,
            _token: csrfToken,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result);
                btn_ok.disabled = true;
            } else {
                Swal.fire({
                    icon: "info",
                    text:
                        "Tidak ada data yang diterima divisi: " +
                        decodeHtmlEntities(divisiNama.value),
                }).then(() => {
                    var table = $("#tableData").DataTable();
                    table.clear().draw();
                    // btn_ok.focus();
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

btn_ok.addEventListener("click", function (e) {
    TampilData();
});

btn_refresh.addEventListener("click", function (e) {
    ClearForm();
    TampilData();
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
                            url: "/Kencana/AccSatuDivisiKencana/getDivisi",
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

                btn_ok.focus();
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
                            url: "/Kencana/AccSatuDivisiKencana/getObjek",
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

                btn_ok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});
