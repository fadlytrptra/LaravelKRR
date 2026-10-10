var csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

var divisiId = document.getElementById("divisiId");
var divisiNama = document.getElementById("divisiNama");
var btn_divisi = document.getElementById("btn_divisi");
var tanggal = document.getElementById("tanggal");
var pibPemberi = document.getElementById("pibPemberi");

var objekId = document.getElementById("objekId");
var objekNama = document.getElementById("objekNama");
var btn_objek = document.getElementById("btn_objek");

var kelutId = document.getElementById("kelutId");
var kelutNama = document.getElementById("kelutNama");
var btn_kelut = document.getElementById("btn_kelut");

var kelompokId = document.getElementById("kelompokId");
var kelompokNama = document.getElementById("kelompokNama");
var btn_kelompok = document.getElementById("btn_kelompok");

var subkelId = document.getElementById("subkelId");
var subkelNama = document.getElementById("subkelNama");
var btn_subkel = document.getElementById("btn_subkel");

var kodeTypePemberi = document.getElementById("kodeTypePemberi");
var kodeTypePenerima = document.getElementById("kodeTypePenerima");
var kodeBarangPemberi = document.getElementById("kodeBarangPemberi");
var kodeBarangPenerima = document.getElementById("kodeBarangPenerima");
var primer = document.getElementById("primer");
var satuanPrimer = document.getElementById("satuanPrimer");

var namaBarangPemberi = document.getElementById("namaBarangPemberi");
var namaBarangPenerima = document.getElementById("namaBarangPenerima");
var sekunder = document.getElementById("sekunder");
var satuanSekunder = document.getElementById("satuanSekunder");

var tritier = document.getElementById("tritier");
var satuanTritier = document.getElementById("satuanTritier");

var transaksiId = document.getElementById("transaksiId");

var objekId2 = document.getElementById("objekId2");
var objekNama2 = document.getElementById("objekNama2");
var kelompokId2 = document.getElementById("kelompokId2");
var kelompokNama2 = document.getElementById("kelompokNama2");

var kelutId2 = document.getElementById("kelutId2");
var kelutNama2 = document.getElementById("kelutNama2");
var subkelId2 = document.getElementById("subkelId2");
var subkelNama2 = document.getElementById("subkelNama2");

var btn_objek2 = document.getElementById("btn_objek2");
var btn_kelut2 = document.getElementById("btn_kelut2");
var btn_kelompok2 = document.getElementById("btn_kelompok2");
var btn_subkel2 = document.getElementById("btn_subkel2");

var uraian = document.getElementById("uraian");
var pemberi = document.getElementById("pemberi");

var primer2 = document.getElementById("primer2");
var satuanPrimer2 = document.getElementById("satuanPrimer2");
var sekunder2 = document.getElementById("sekunder2");
var satuanSekunder2 = document.getElementById("satuanSekunder2");
var tritier2 = document.getElementById("tritier2");
var satuanTritier2 = document.getElementById("satuanTritier2");

var btn_hitung = document.getElementById("btn_hitung");

var btn_isi = document.getElementById("btn_isi");
var btn_proses = document.getElementById("btn_proses");
var btn_batal = document.getElementById("btn_batal");
var btn_koreksi = document.getElementById("btn_koreksi");
var btn_hapus = document.getElementById("btn_hapus");
var btn_namabarangPemberi = document.getElementById("btn_namabarangPemberi");
var btn_namabarangPenerima = document.getElementById("btn_namabarangPenerima");

var pilih, pemberi, userId;
var today = new Date().toISOString().slice(0, 10);
tanggal.value = today;

$(document).ready(function () {
    $("#tableData").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: true,
        columns: [
            { title: "NoTrans" },
            { title: "Nama Type" },
            { title: "Alasan" },
            { title: "Objek" },
            { title: "Kel. Utama" },
            { title: "Kelompok" },
            { title: "Sub Kel" },
            { title: "Pemohon" },
            { title: "Tgl Mohon" },
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
            { targets: [1], width: "25%", className: "fixed-width" },
            { targets: [2], width: "20%", className: "fixed-width" },
            { targets: [3], width: "12%", className: "fixed-width" },
            { targets: [4], width: "12%", className: "fixed-width" },
            { targets: [5], width: "12%", className: "fixed-width" },
            { targets: [6], width: "12%", className: "fixed-width" },
            { targets: [7], width: "12%", className: "fixed-width" },
            { targets: [8], width: "12%", className: "fixed-width" },
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

function updateDataTable(data) {
    var table = $("#tableData").DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdTransaksi),
            escapeHtml(item.NamaType),
            escapeHtml(item.UraianDetailTransaksi) ?? "",
            escapeHtml(item.NamaObjek),
            escapeHtml(item.NamaKelompokUtama),
            escapeHtml(item.NamaKelompok),
            escapeHtml(item.NamaSubKelompok),
            escapeHtml(item.IdPemberi),
            escapeHtml(item.SaatAwalTransaksi),
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

var IdTrans, NamaUser;
$("#tableData tbody").on("click", "tr", function () {
    var table = $("#tableData").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");
    var data = table.row(this).data();
    IdTrans = data[0];
    transaksiId.value = data[0];
    NamaUser = data[7];

    $.ajax({
        type: "GET",
        url: "/Kencana/PermohonanSatuDivisiKencana/tampilItem",
        data: {
            XIdTransaksi: IdTrans,
            _token: csrfToken,
        },
        success: function (result) {
            if (result) {
                objekId2.value = decodeHtmlEntities(result[0].IdObjek);
                kelutId2.value = decodeHtmlEntities(result[0].IdKelompokUtama);
                kelompokId2.value = decodeHtmlEntities(result[0].IdKelompok);
                subkelId2.value = decodeHtmlEntities(result[0].IdSubkelompok);
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
                primer2.value =
                    formatNumber(result[0].JumlahPengeluaranPrimer) ??
                    formatNumber(0);
                sekunder2.value =
                    formatNumber(result[0].JumlahPengeluaranSekunder) ??
                    formatNumber(0);
                tritier2.value =
                    formatNumber(result[0].JumlahPengeluaranTritier) ??
                    formatNumber(0);
                kodeTypePemberi.value = decodeHtmlEntities(result[0].IdType);
                uraian.value = result[0].UraianDetailTransaksi
                    ? decodeHtmlEntities(result[0].UraianDetailTransaksi)
                    : "";
                kodeBarangPemberi.value = decodeHtmlEntities(
                    result[0].KodeBarang
                );
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
});

function TampilAllData() {
    $.ajax({
        type: "GET",
        url: "/Kencana/PermohonanSatuDivisiKencana/tampilAllData",
        data: {
            XIdDivisi: divisiId.value,
            _token: csrfToken,
        },
        success: function (result) {
            var table = $("#tableData").DataTable();

            if (result.length !== 0) {
                updateDataTable(result);
            } else {
                table.clear().draw();
            }

            btn_batal.disabled = false;
            btn_isi.disabled = false;
            btn_koreksi.disabled = false;
            btn_hapus.disabled = false;
            btn_isi.focus();
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function TampilData() {
    $.ajax({
        type: "GET",
        url: "/Kencana/PermohonanSatuDivisiKencana/tampilData",
        data: {
            XIdDivisi: divisiId.value,
            _token: csrfToken,
        },
        success: function (result) {
            var table = $("#tableData").DataTable();

            if (result.length !== 0) {
                updateDataTable(result);
            } else {
                table.clear().draw();
            }

            btn_batal.disabled = false;
            btn_isi.disabled = false;
            btn_koreksi.disabled = false;
            btn_hapus.disabled = false;
            btn_isi.focus();
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function tombol(angka) {
    if (angka === 1) {
        btn_isi.disabled = false;
        btn_koreksi.disabled = false;
        btn_hapus.disabled = false;
        btn_proses.disabled = true;
        btn_batal.disabled = true;
    } else if (angka === 2) {
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = true;
        // btn_batal.disabled = true;
    } else if (angka === 3) {
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = true;
        btn_batal.disabled = false;
    }
}

function ClearForm() {
    pilih = 0;
    objekId.value = "";
    objekNama.value = "";
    kelutId.value = "";
    kelutNama.value = "";
    kelompokId.value = "";
    kelompokNama.value = "";
    subkelId.value = "";
    subkelNama.value = "";

    kodeTypePemberi.value = "";
    kodeBarangPemberi.value = "";
    kodeTypePenerima.value = "";
    kodeBarangPenerima.value = "";
    primer.value = 0;
    satuanPrimer.value = "";

    pibPemberi.value = "";
    pibPenerima.value = "";

    namaBarangPemberi.value = "";
    namaBarangPenerima.value = "";
    sekunder.value = 0;
    satuanSekunder.value = "";

    tritier.value = 0;
    satuanTritier.value = "";

    transaksiId.value = "";

    objekId2.value = "";
    objekNama2.value = "";
    kelompokId2.value = "";
    kelompokNama2.value = "";

    kelutId2.value = "";
    kelutNama2.value = "";
    subkelId2.value = "";
    subkelNama2.value = "";

    uraian.value = "";
    pemberi.value = "";

    primer2.value = 0;
    satuanPrimer2.value = "";
    sekunder2.value = 0;
    satuanSekunder2.value = "";
    tritier2.value = 0;
    satuanTritier2.value = "";

    primer2.disabled = false;
    sekunder2.disabled = false;
    btn_kelut.disabled = true;
    btn_kelompok.disabled = true;
    btn_subkel.disabled = true;
    btn_objek2.disabled = true;
    btn_kelut2.disabled = true;
    btn_kelompok2.disabled = true;
    btn_subkel2.disabled = true;
}

function Load_Type(jenisLoad) {
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
                    let subkel, kodeBarang;
                    if (jenisLoad == "pemberi") {
                        subkel = subkelId.value.trim();
                        kodeBarang = null;
                    } else if (jenisLoad == "penerima") {
                        subkel = subkelId2.value.trim();
                        kodeBarang = kodeBarangPemberi.value.trim();
                    }
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "/Kencana/PermohonanSatuDivisiKencana/getType",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XJenisLoad: jenisLoad,
                                XKodeBarang: kodeBarang,
                                XIdSubKelompok_Type: subkel,
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
                if (jenisLoad == "pemberi") {
                    kodeTypePemberi.value = decodeHtmlEntities(
                        result.value.IdType.trim()
                    );
                    kodeBarangPemberi.value = decodeHtmlEntities(
                        result.value.KodeBarang.trim()
                    );
                    namaBarangPemberi.value = decodeHtmlEntities(
                        result.value.NamaType.trim()
                    );
                    pibPemberi.value = result.value.PIB
                        ? decodeHtmlEntities(result.value.PIB)
                        : "";

                    primer2.disabled = false;
                    sekunder2.disabled = false;
                    Load_SaldoPemberi(kodeTypePemberi.value).then(() => {
                        if (
                            satuanPrimer.value.trim() === "NULL" &&
                            satuanSekunder.value.trim() === "NULL"
                        ) {
                            primer2.disabled = true;
                            sekunder2.disabled = true;
                        } else if (
                            satuanPrimer.value.trim() === "NULL" &&
                            satuanSekunder.value.trim() !== "NULL"
                        ) {
                            primer2.disabled = true;
                        }
                    });

                    btn_objek2.disabled = false;
                    btn_objek2.focus();
                } else if (jenisLoad == "penerima") {
                    console.log(result.value);

                    kodeTypePenerima.value = decodeHtmlEntities(
                        result.value.IdType.trim()
                    );
                    kodeBarangPenerima.value = decodeHtmlEntities(
                        result.value.KodeBarang.trim()
                    );
                    namaBarangPenerima.value = decodeHtmlEntities(
                        result.value.NamaType.trim()
                    );
                    pibPenerima.value = result.value.PIB
                        ? decodeHtmlEntities(result.value.PIB)
                        : "";

                    $.ajax({
                        type: "GET",
                        url: "/Kencana/PermohonanSatuDivisiKencana/loadPenerima",
                        data: {
                            XkodeBarangPemberi: kodeBarangPenerima.value,
                            XIdSubKelompok: subkelId2.value,
                            XpibPemberi: pibPenerima.value,
                            _token: csrfToken,
                        },
                        success: function (result) {
                            let loadPenerima = false;
                            if (result.length !== 0) {
                                satuanPrimer2.value = result[0].satuan_primer
                                    ? decodeHtmlEntities(
                                          result[0].satuan_primer.trim()
                                      )
                                    : "NULL";
                                satuanSekunder2.value = result[0]
                                    .satuan_sekunder
                                    ? decodeHtmlEntities(
                                          result[0].satuan_sekunder.trim()
                                      )
                                    : "NULL";
                                satuanTritier2.value = result[0].satuan_tritier
                                    ? decodeHtmlEntities(
                                          result[0].satuan_tritier.trim()
                                      )
                                    : "NULL";

                                if (
                                    satuanPrimer.value.trim() ===
                                    satuanPrimer2.value.trim()
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
                                                satuanPrimer.value.trim() ===
                                                "NULL";
                                        }
                                    } else {
                                        loadPenerima =
                                            satuanSekunder.value.trim() ===
                                            "NULL";
                                    }
                                }

                                if (!loadPenerima) {
                                    Swal.fire({
                                        icon: "info",
                                        text:
                                            "Satuan Tritier, Sekunder, Primer pada Divisi " +
                                            decodeHtmlEntities(
                                                divisiNama.value
                                            ) +
                                            " ADA yang TIDAK SAMA dengan Divisi Penerima Barang !!!... Koreksi di Maitenance Type Barang per Divisi",
                                    });
                                } else {
                                    // 🧠 Focus logic
                                    const hasPrimer =
                                        satuanPrimer2.value !== "NULL";
                                    const hasSekunder =
                                        satuanSekunder2.value !== "NULL";
                                    const hasTritier =
                                        satuanTritier2.value !== "NULL";

                                    if (
                                        hasPrimer &&
                                        hasSekunder &&
                                        hasTritier
                                    ) {
                                        primer2.focus();
                                    } else if (hasSekunder && hasTritier) {
                                        sekunder2.focus();
                                    } else if (hasTritier) {
                                        tritier2.focus();
                                    }
                                }
                            } else {
                                Swal.fire({
                                    icon: "info",
                                    text:
                                        "Tidak Ada Type Barang " +
                                        decodeHtmlEntities(
                                            namaBarangPemberi.value
                                        ) +
                                        " Pada Divisi Penerima",
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                            reject(error);
                        },
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
}

function Load_Type_CIR(jenisLoad) {
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
                    let subkel;
                    if (jenisLoad == "pemberi") {
                        subkel = subkelId.value.trim();
                    } else if (jenisLoad == "penerima") {
                        subkel = subkelId2.value.trim();
                    }
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "/Kencana/PermohonanSatuDivisiKencana/getTypeCIR",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdSubKelompok_Type: subkel,
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
                if (jenisLoad == "pemberi") {
                    kodeTypePemberi.value = decodeHtmlEntities(
                        result.value.Id_Type.trim()
                    );
                    kodeBarangPemberi.value = decodeHtmlEntities(
                        result.value.Kode_Barang.trim()
                    );
                    namaBarangPemberi.value = decodeHtmlEntities(
                        result.value.Nm_Type.trim()
                    );
                    pibPemberi.value = result.value.PIB
                        ? decodeHtmlEntities(result.value.PIB)
                        : "";

                    primer2.disabled = false;
                    sekunder2.disabled = false;
                    Load_SaldoPemberi(kodeTypePemberi.value).then(() => {
                        if (
                            satuanPrimer.value.trim() === "NULL" &&
                            satuanSekunder.value.trim() === "NULL"
                        ) {
                            primer2.disabled = true;
                            sekunder2.disabled = true;
                        } else if (
                            satuanPrimer.value.trim() === "NULL" &&
                            satuanSekunder.value.trim() !== "NULL"
                        ) {
                            primer2.disabled = true;
                        }
                    });

                    btn_objek2.disabled = false;
                    btn_objek2.focus();
                } else if (jenisLoad == "penerima") {
                    console.log(result.value);

                    kodeTypePenerima.value = decodeHtmlEntities(
                        result.value.Id_Type.trim()
                    );
                    kodeBarangPenerima.value = decodeHtmlEntities(
                        result.value.Kode_Barang.trim()
                    );
                    namaBarangPenerima.value = decodeHtmlEntities(
                        result.value.Nm_Type.trim()
                    );
                    pibPenerima.value = result.value.PIB
                        ? decodeHtmlEntities(result.value.PIB)
                        : "";

                    $.ajax({
                        type: "GET",
                        url: "/Kencana/PermohonanSatuDivisiKencana/loadPenerima",
                        data: {
                            XkodeBarangPemberi: kodeBarangPenerima.value,
                            XIdSubKelompok: subkelId2.value,
                            XpibPemberi: pibPenerima.value,
                            _token: csrfToken,
                        },
                        success: function (result) {
                            let loadPenerima = false;
                            if (result.length !== 0) {
                                satuanPrimer2.value = result[0].satuan_primer
                                    ? decodeHtmlEntities(
                                          result[0].satuan_primer.trim()
                                      )
                                    : "NULL";
                                satuanSekunder2.value = result[0]
                                    .satuan_sekunder
                                    ? decodeHtmlEntities(
                                          result[0].satuan_sekunder.trim()
                                      )
                                    : "NULL";
                                satuanTritier2.value = result[0].satuan_tritier
                                    ? decodeHtmlEntities(
                                          result[0].satuan_tritier.trim()
                                      )
                                    : "NULL";

                                if (
                                    satuanPrimer.value.trim() ===
                                    satuanPrimer2.value.trim()
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
                                                satuanPrimer.value.trim() ===
                                                "NULL";
                                        }
                                    } else {
                                        loadPenerima =
                                            satuanSekunder.value.trim() ===
                                            "NULL";
                                    }
                                }

                                if (!loadPenerima) {
                                    Swal.fire({
                                        icon: "info",
                                        text:
                                            "Satuan Tritier, Sekunder, Primer pada Divisi " +
                                            decodeHtmlEntities(
                                                divisiNama.value
                                            ) +
                                            " ADA yang TIDAK SAMA dengan Divisi Penerima Barang !!!... Koreksi di Maitenance Type Barang per Divisi",
                                    });
                                } else {
                                    // 🧠 Focus logic
                                    const hasPrimer =
                                        satuanPrimer2.value !== "NULL";
                                    const hasSekunder =
                                        satuanSekunder2.value !== "NULL";
                                    const hasTritier =
                                        satuanTritier2.value !== "NULL";

                                    if (
                                        hasPrimer &&
                                        hasSekunder &&
                                        hasTritier
                                    ) {
                                        primer2.focus();
                                    } else if (hasSekunder && hasTritier) {
                                        sekunder2.focus();
                                    } else if (hasTritier) {
                                        tritier2.focus();
                                    }
                                }
                            } else {
                                Swal.fire({
                                    icon: "info",
                                    text:
                                        "Tidak Ada Type Barang " +
                                        decodeHtmlEntities(
                                            namaBarangPemberi.value
                                        ) +
                                        " Pada Divisi Penerima",
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                            reject(error);
                        },
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
}

function Load_Type_ABM(jenisLoad) {
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
                    let subkel;
                    if (jenisLoad == "pemberi") {
                        subkel = subkelId.value.trim();
                    } else if (jenisLoad == "penerima") {
                        subkel = subkelId2.value.trim();
                    }
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "/Kencana/PermohonanSatuDivisiKencana/getTypeABM",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdSubKelompok_Type: subkel,
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
                if (jenisLoad == "pemberi") {
                    kodeTypePemberi.value = decodeHtmlEntities(
                        result.value.IdType.trim()
                    );
                    kodeBarangPemberi.value = decodeHtmlEntities(
                        result.value.KodeBarang.trim()
                    );
                    namaBarangPemberi.value = decodeHtmlEntities(
                        result.value.NamaType.trim()
                    );
                    pibPemberi.value = result.value.PIB
                        ? decodeHtmlEntities(result.value.PIB)
                        : "";

                    primer2.disabled = false;
                    sekunder2.disabled = false;
                    Load_SaldoPemberi(kodeTypePemberi.value).then(() => {
                        if (
                            satuanPrimer.value.trim() === "NULL" &&
                            satuanSekunder.value.trim() === "NULL"
                        ) {
                            primer2.disabled = true;
                            sekunder2.disabled = true;
                        } else if (
                            satuanPrimer.value.trim() === "NULL" &&
                            satuanSekunder.value.trim() !== "NULL"
                        ) {
                            primer2.disabled = true;
                        }
                    });

                    btn_objek2.disabled = false;
                    btn_objek2.focus();
                } else if (jenisLoad == "penerima") {
                    console.log(result.value);

                    kodeTypePenerima.value = decodeHtmlEntities(
                        result.value.IdType.trim()
                    );
                    kodeBarangPenerima.value = decodeHtmlEntities(
                        result.value.KodeBarang.trim()
                    );
                    namaBarangPenerima.value = decodeHtmlEntities(
                        result.value.NamaType.trim()
                    );
                    pibPenerima.value = result.value.PIB
                        ? decodeHtmlEntities(result.value.PIB)
                        : "";

                    $.ajax({
                        type: "GET",
                        url: "/Kencana/PermohonanSatuDivisiKencana/loadPenerima",
                        data: {
                            XkodeBarangPemberi: kodeBarangPenerima.value,
                            XIdSubKelompok: subkelId2.value,
                            XpibPemberi: pibPenerima.value,
                            _token: csrfToken,
                        },
                        success: function (result) {
                            let loadPenerima = false;
                            if (result.length !== 0) {
                                satuanPrimer2.value = result[0].satuan_primer
                                    ? decodeHtmlEntities(
                                          result[0].satuan_primer.trim()
                                      )
                                    : "NULL";
                                satuanSekunder2.value = result[0]
                                    .satuan_sekunder
                                    ? decodeHtmlEntities(
                                          result[0].satuan_sekunder.trim()
                                      )
                                    : "NULL";
                                satuanTritier2.value = result[0].satuan_tritier
                                    ? decodeHtmlEntities(
                                          result[0].satuan_tritier.trim()
                                      )
                                    : "NULL";

                                if (
                                    satuanPrimer.value.trim() ===
                                    satuanPrimer2.value.trim()
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
                                                satuanPrimer.value.trim() ===
                                                "NULL";
                                        }
                                    } else {
                                        loadPenerima =
                                            satuanSekunder.value.trim() ===
                                            "NULL";
                                    }
                                }

                                if (!loadPenerima) {
                                    Swal.fire({
                                        icon: "info",
                                        text:
                                            "Satuan Tritier, Sekunder, Primer pada Divisi " +
                                            decodeHtmlEntities(
                                                divisiNama.value
                                            ) +
                                            " ADA yang TIDAK SAMA dengan Divisi Penerima Barang !!!... Koreksi di Maitenance Type Barang per Divisi",
                                    });
                                } else {
                                    // 🧠 Focus logic
                                    const hasPrimer =
                                        satuanPrimer2.value !== "NULL";
                                    const hasSekunder =
                                        satuanSekunder2.value !== "NULL";
                                    const hasTritier =
                                        satuanTritier2.value !== "NULL";

                                    if (
                                        hasPrimer &&
                                        hasSekunder &&
                                        hasTritier
                                    ) {
                                        primer2.focus();
                                    } else if (hasSekunder && hasTritier) {
                                        sekunder2.focus();
                                    } else if (hasTritier) {
                                        tritier2.focus();
                                    }
                                }
                            } else {
                                Swal.fire({
                                    icon: "info",
                                    text:
                                        "Tidak Ada Type Barang " +
                                        decodeHtmlEntities(
                                            namaBarangPemberi.value
                                        ) +
                                        " Pada Divisi Penerima",
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                            reject(error);
                        },
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
}

function Load_SaldoPemberi(sIdtype) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/Kencana/PermohonanSatuDivisiKencana/getSaldo",
            data: {
                IdType: sIdtype,
                _token: csrfToken,
            },
            success: function (result) {
                if (result) {
                    console.log(result);

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

                    resolve(result);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                // Reject the promise with the error
                reject(error);
            },
        });
    });
}

// $("#kodeBarangPemberi").on("keydown", function (e) {
//     if (e.key === "Enter") {
//         e.preventDefault();
//         // prosesButton.focus();
//         if (subkelId.value !== "" && kodeBarangPemberi.value !== "") {
//             let kdbrg2 = kodeBarangPemberi.value.trim();
//             kodeBarangPemberi.value = kdbrg2.padStart(9, "0");
//             primer2.disabled = false;
//             sekunder2.disabled = false;

//             $.ajax({
//                 url: "/Kencana/PermohonanSatuDivisiKencana/cekkodeBarangPemberi",
//                 type: "GET",
//                 data: {
//                     _token: csrfToken,
//                     XkodeBarangPemberi: kodeBarangPemberi.value,
//                     XIdSubKelompok: subkelId.value,
//                 },
//                 timeout: 30000,
//                 success: function (result) {
//                     // console.log();
//                     if (result.length !== 0) {
//                         if (parseInt(result[0].Jumlah) === 0) {
//                             // console.log(result[0]);
//                             Swal.fire({
//                                 icon: "info",
//                                 html:
//                                     "Tidak Ada Kode Barang : " +
//                                     kodeBarangPemberi.value +
//                                     " Pada sub kel : " +
//                                     subkelNama.value,
//                                 returnFocus: false,
//                             });
//                         } else {
//                             $.ajax({
//                                 url: "/Kencana/PermohonanSatuDivisiKencana/loadTypeBarang",
//                                 type: "GET",
//                                 data: {
//                                     _token: csrfToken,
//                                     XkodeBarangPemberi: kodeBarangPemberi.value,
//                                     XIdSubKelompok: subkelId.value,
//                                     XpibPemberi: pibPemberi.value,
//                                 },
//                                 timeout: 30000,
//                                 success: function (response) {
//                                     if (response.length > 0) {
//                                         let result = response[0];

//                                         kodeTypePemberi.value =
//                                             result.IdType !== null
//                                                 ? decodeHtmlEntities(
//                                                       result.IdType.trim()
//                                                   )
//                                                 : "-";
//                                         namaBarangPemberi.value =
//                                             result.NamaType !== null
//                                                 ? decodeHtmlEntities(
//                                                       result.NamaType.trim()
//                                                   )
//                                                 : "-";
//                                         kodeBarangPemberi.value =
//                                             decodeHtmlEntities(
//                                                 result.KodeBarang.trim()
//                                             );
//                                         primer.value =
//                                             result.SaldoPrimer !== null
//                                                 ? formatNumber(
//                                                       result.SaldoPrimer
//                                                   )
//                                                 : "0";
//                                         sekunder.value =
//                                             result.SaldoSekunder !== null
//                                                 ? formatNumber(
//                                                       result.SaldoSekunder
//                                                   )
//                                                 : "0";
//                                         tritier.value =
//                                             result.SaldoTritier !== null
//                                                 ? formatNumber(
//                                                       result.SaldoTritier
//                                                   )
//                                                 : "0";
//                                         satuanPrimer.value =
//                                             result.satuan_primer !== null
//                                                 ? decodeHtmlEntities(
//                                                       result.satuan_primer.trim()
//                                                   )
//                                                 : "";
//                                         satuanSekunder.value =
//                                             result.satuan_sekunder !== null
//                                                 ? decodeHtmlEntities(
//                                                       result.satuan_sekunder.trim()
//                                                   )
//                                                 : "";
//                                         satuanTritier.value =
//                                             result.satuan_tritier !== null
//                                                 ? decodeHtmlEntities(
//                                                       result.satuan_tritier.trim()
//                                                   )
//                                                 : "";
//                                         satuanPrimer2.value =
//                                             result.satuan_primer !== null
//                                                 ? decodeHtmlEntities(
//                                                       result.satuan_primer.trim()
//                                                   )
//                                                 : "";
//                                         satuanSekunder2.value =
//                                             result.satuan_sekunder !== null
//                                                 ? decodeHtmlEntities(
//                                                       result.satuan_sekunder.trim()
//                                                   )
//                                                 : "";
//                                         satuanTritier2.value =
//                                             result.satuan_tritier !== null
//                                                 ? decodeHtmlEntities(
//                                                       result.satuan_tritier.trim()
//                                                   )
//                                                 : "";

//                                         LoadTypeBarang = true;

//                                         if (
//                                             satuanPrimer.value === "NULL" &&
//                                             satuanSekunder.value === "NULL"
//                                         ) {
//                                             primer2.disabled = true;
//                                             sekunder2.disabled = true;
//                                         } else if (
//                                             satuanPrimer.value === "NULL" &&
//                                             satuanSekunder.value !== "NULL"
//                                         ) {
//                                             primer2.disabled = true;
//                                         }

//                                         btn_objek2.disabled = false;
//                                         btn_objek2.focus();
//                                     }
//                                 },
//                                 error: function (xhr, status, error) {
//                                     console.error("AJAX Error:", error);
//                                 },
//                             });
//                         }
//                     }
//                 },
//                 error: function (xhr, status, error) {
//                     console.error("AJAX Error:", error);
//                 },
//             });
//         }
//     }
// });

// function fillkodeBarangPemberi(tmpKode) {
//     $.ajax({
//         url: "PenyesuaianBarang/fillkodeBarangPemberi",
//         type: "GET",
//         data: {
//             _token: csrfToken,
//             kodeBarangPemberi: tmpKode,
//             subkelId: subkelId.value
//         },
//         timeout: 30000,
//         success: function (response) {
//             if (response.success) {
//                 cekkodeBarangPemberi(tmpKode);

//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error!',
//                     html: response,
//                     returnFocus: false
//                 });
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error('AJAX Error:', error);
//         }
//     });
// }

// function cekkodeBarangPemberi(tmpKode) {
//     let kdbrg2 = tmpKode.trim();
//     kodeBarangPemberi.value = kdbrg2.padStart(9, '0');
//     // tmpKode =
//     $.ajax({
//         type: 'GET',
//         url: 'PenyesuaianBarang/cekkodeBarangPemberi',
//         data: {
//             _token: csrfToken,
//             kodeBarangPemberi: kodeBarangPemberi.value,
//             subkelId: subkelId.value
//         },
//         success: function (response) {
//             if (response.length > 0) {
//                 const result = response[0];

//                 kodeTypePemberi.value = result.IdType !== null ? decodeHtmlEntities(result.IdType.trim()) : "-";
//                 namaBarang.value = result.NamaType !== null ? decodeHtmlEntities(result.NamaType.trim()) : "-";
//                 kodeBarangPemberi.value = decodeHtmlEntities(result.kodeBarangPemberi.trim());
//                 primer.value = result.SaldoPrimer !== null ? formatNumber(result.SaldoPrimer) : "0";
//                 sekunder.value = result.SaldoSekunder !== null ? formatNumber(result.SaldoSekunder) : "0";
//                 tritier.value = result.SaldoTritier !== null ? formatNumber(result.SaldoTritier) : "0";
//                 satuanPrimer.value = result.satuan_primer !== null ? decodeHtmlEntities(result.satuan_primer.trim()) : "";
//                 satuanSekunder.value = result.satuan_sekunder !== null ? decodeHtmlEntities(result.satuan_sekunder.trim()) : "";
//                 satuanTritier.value = result.satuan_tritier !== null ? decodeHtmlEntities(result.satuan_tritier.trim()) : "";
//                 satuanPrimer2.value = result.satuan_primer !== null ? decodeHtmlEntities(result.satuan_primer.trim()) : "";
//                 satuanSekunder2.value = result.satuan_sekunder !== null ? decodeHtmlEntities(result.satuan_sekunder.trim()) : "";
//                 satuanTritier2.value = result.satuan_tritier !== null ? decodeHtmlEntities(result.satuan_tritier.trim()) : "";

//                 // handleChange();
//                 // satuanPrimer.addEventListener('change', handleChange);
//                 // satuanSekunder.addEventListener('change', handleChange);
//                 // satuanTritier.addEventListener('change', handleChange);
//                 // satuanPrimer2.addEventListener('change', handleChange);
//                 // satuanSekunder2.addEventListener('change', handleChange);
//                 // satuanTritier2.addEventListener('change', handleChange);

//                 // alasan.focus();
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error('Error:', error);
//         }
//     });

// }

// function handleChange() {
//     primerValue = no_primer.value.trim();
//     sekunderValue = no_sekunder.value.trim();
//     tritierValue = no_tritier.value.trim();

//     if (primerValue === 'NULL' && sekunderValue === 'NULL') {
//         primer2.disabled = true;
//         sekunder2.disabled = true;
//         tritier2.select();
//     } else if (primerValue === 'NULL' && sekunderValue !== 'NULL') {
//         primer2.disabled = true;
//         // sekunder2.disabled = false;
//         // sekunder2.select();
//     }
// }

// function LoadPenerimaIsiKoreksi() {
//     return new Promise(function (resolve, reject) {
//         $.ajax({
//             type: "GET",
//             url: "/Kencana/PermohonanSatuDivisiKencana/loadPenerima",
//             data: {
//                 XkodeBarangPemberi: kodeBarangPemberi.value,
//                 XIdSubKelompok: subkelId2.value,
//                 XpibPemberi: pibPemberi.value,
//                 _token: csrfToken,
//             },
//             success: function (result) {
//                 let loadPenerima = false;
//                 console.log(result);

//                 if (result.length !== 0) {
//                     satuanPrimer2.value = result[0].satuan_primer
//                         ? decodeHtmlEntities(result[0].satuan_primer.trim())
//                         : "NULL";
//                     satuanSekunder2.value = result[0].satuan_sekunder
//                         ? decodeHtmlEntities(result[0].satuan_sekunder.trim())
//                         : "NULL";
//                     satuanTritier2.value = result[0].satuan_tritier
//                         ? decodeHtmlEntities(result[0].satuan_tritier.trim())
//                         : "NULL";

//                     if (
//                         satuanPrimer.value.trim() === satuanPrimer2.value.trim()
//                     ) {
//                         if (
//                             satuanSekunder.value.trim() ===
//                             satuanSekunder2.value.trim()
//                         ) {
//                             if (
//                                 satuanTritier.value.trim() ===
//                                 satuanTritier2.value.trim()
//                             ) {
//                                 loadPenerima = true;
//                             } else {
//                                 loadPenerima =
//                                     satuanPrimer.value.trim() === "NULL";
//                             }
//                         } else {
//                             loadPenerima =
//                                 satuanSekunder.value.trim() === "NULL";
//                         }
//                     }

//                     if (!loadPenerima) {
//                         Swal.fire({
//                             icon: "info",
//                             text:
//                                 "Satuan Tritier, Sekunder, Primer pada Divisi " +
//                                 decodeHtmlEntities(divisiNama.value) +
//                                 " ADA yang TIDAK SAMA dengan Divisi Penerima Barang !!!... Koreksi di Maitenance Type Barang per Divisi",
//                         });
//                     }
//                 } else {
//                     Swal.fire({
//                         icon: "info",
//                         text:
//                             "Tidak Ada Type Barang " +
//                             decodeHtmlEntities(namaBarangPemberi.value) +
//                             " Pada Divisi Penerima",
//                     });
//                 }

//                 resolve(loadPenerima);
//             },
//             error: function (xhr, status, error) {
//                 console.error("Error:", error);
//                 reject(error);
//             },
//         });
//     });
// }

$("#primer2").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sekunder2.focus();
    }
});

$("#sekunder2").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        tritier2.focus();
    }
});

$("#tritier2").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        uraian.focus();
    }
});

$("#uraian").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        btn_proses.disabled = false;
        btn_proses.focus();
    }
});

btn_isi.addEventListener("click", function (e) {
    tombol(3);
    ClearForm();
    pilih = 1;
    btn_objek.disabled = false;
    btn_objek.focus();
});

btn_koreksi.addEventListener("click", function (e) {
    if (transaksiId.value === "") {
        Swal.fire({
            icon: "error",
            text: "Pilih dulu barangnya, baru koreksi!",
        });
    } else {
        $.ajax({
            type: "GET",
            url: "/Kencana/PermohonanSatuDivisiKencana/getUser",
            data: {
                NamaUser: NamaUser,
                _token: csrfToken,
            },
            success: function (result) {
                pemberi = result[0].kodeUser.trim();

                $.ajax({
                    type: "GET",
                    url: "/Kencana/PermohonanSatuDivisiKencana/getUserId",
                    data: {
                        _token: csrfToken,
                    },
                    success: function (result) {
                        userId = result.user.trim();

                        if (userId === pemberi) {
                            Load_SaldoPemberi(kodeTypePemberi.value);
                            pilih = 2;
                            tombol(3);
                            btn_objek2.disabled = false;
                            btn_kelut2.disabled = false;
                            btn_kelompok2.disabled = false;
                            btn_subkel2.disabled = false;
                            primer2.disabled = false;
                            primer2.focus();
                        } else {
                            Swal.fire({
                                icon: "error",
                                text:
                                    "Anda Tidak Berhak mengkoreksi data milik " +
                                    pemberi,
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
});

btn_hapus.addEventListener("click", function (e) {
    if (transaksiId.value === "") {
        Swal.fire({
            icon: "error",
            text: "Pilih dulu barangnya, baru menghapus!",
        });
    } else {
        $.ajax({
            type: "GET",
            url: "/Kencana/PermohonanSatuDivisiKencana/getUser",
            data: {
                NamaUser: NamaUser,
                _token: csrfToken,
            },
            success: function (result) {
                pemberi = result[0].kodeUser.trim();

                $.ajax({
                    type: "GET",
                    url: "/Kencana/PermohonanSatuDivisiKencana/getUserId",
                    data: {
                        _token: csrfToken,
                    },
                    success: function (result) {
                        userId = result.user.trim();

                        if (userId === pemberi) {
                            pilih = 3;
                            tombol(3);
                            btn_proses.disabled = false;
                            btn_proses.focus();
                        } else {
                            Swal.fire({
                                icon: "error",
                                text:
                                    "Anda Tidak Berhak menghapus data milik " +
                                    pemberi,
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
});

btn_proses.addEventListener("click", async function (e) {
    // Handle the async function properly with await
    if (pilih === 1 || pilih === 2) {
        // Check if Penerima and Pemberi id type are the same
        if (kodeTypePenerima.value.trim() === kodeTypePemberi.value.trim()) {
            Swal.fire({
                icon: "error",
                text: "Id type Penerima dan Pemberi tidak boleh sama !!",
            });
            return;
        }
        if (
            (pilih == 2 && pibPemberi.value !== "") ||
            (pilih == 2 && pibPenerima.value !== "")
        ) {
            Swal.fire({
                icon: "error",
                text: "Transaksi untuk barang PIB tidak bisa dikoreksi!",
            });
            return;
        }
        if (kodeBarangPemberi.value !== kodeBarangPenerima.value) {
            Swal.fire({
                icon: "error",
                text: "Kode barang yang dimutasi dalam satu divisi harus sama!",
            });
            return;
        }
    }

    // Compare dates, ensure the format of 'today' and 'tanggal.value' are consistent
    if (new Date(tanggal.value) > new Date()) {
        Swal.fire({
            icon: "error",
            text: "Tanggal Mohon lebih besar dari tanggal hari ini",
        });
        return;
    }

    // Validate if all quantities are zero
    if (
        parseFloat(primer2.value) === 0 &&
        parseFloat(sekunder2.value) === 0 &&
        parseFloat(tritier2.value) === 0
    ) {
        Swal.fire({
            icon: "error",
            text: "Jumlah Barang Yang dimutasi harap di isi",
        });
        return;
    }

    // Ensure Tritier value is greater than 0
    if (parseFloat(tritier2.value) <= 0) {
        Swal.fire({
            icon: "error",
            text: "Nilai Tritier Harus di isi",
        });
        return;
    }

    // Check if subkelId2 is a valid number
    if (parseFloat(subkelId2.value) < 0 || subkelId2.value.trim() === "") {
        Swal.fire({
            icon: "error",
            text: "Tujuan Mutasi Harap Diisi !!!",
            returnFocus: false,
        }).then(() => {
            btn_subkel2.focus(); // Focus on the button after the error message
        });
        return;
    }

    if (pibPemberi.value.trim() !== pibPenerima.value.trim()) {
        Swal.fire({
            icon: "warning",
            title: "PIB Tidak Sama",
            text: "PIB Penerima dan Pemberi tidak sama! Apakah Anda ingin melanjutkan?",
            showCancelButton: true,
            confirmButtonText: "Ya, Lanjutkan",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                // 👉 Continue the process here
                console.log("Lanjutkan proses meskipun PIB berbeda");
                // If all validations pass, save the data
                SaveData();
            } else {
                // ❌ User cancelled
                console.log("Pengguna membatalkan proses karena pib berbeda");
            }
        });
    } else {
        SaveData();
    }
});

function SaveData() {
    console.log(pilih);

    if (pilih === 1) {
        $.ajax({
            type: "PUT",
            url: "/Kencana/PermohonanSatuDivisiKencana/saveData",
            data: {
                _token: csrfToken,
                XUraianDetailTransaksi: uraian.value
                    ? decodeHtmlEntities(uraian.value)
                    : "",
                XIdType: kodeTypePemberi.value,
                Xsaatawaltransaksi: tanggal.value,
                XJumlahKeluarPrimer: primer2.value,
                XJumlahKeluarSekunder: sekunder2.value,
                XJumlahKeluarTritier: tritier2.value,
                XAsalIdSubKelompok: subkelId.value,
                XTujuanIdSubkelompok: subkelId2.value,
                XIdTypeTujuan: kodeTypePenerima.value,
                XpibPemberi: pibPemberi.value ?? pibPenerima.value,
                // idtransaksi: transaksiId.value,
            },
            success: function (result) {
                transaksiId.value = decodeHtmlEntities(result.idtransaksi);
                Swal.fire({
                    icon: "success",
                    text: result.success,
                    returnFocus: false,
                }).then(() => {
                    primer2.value = 0;
                    sekunder2.value = 0;
                    tritier2.value = 0;
                    btn_objek2.focus();

                    if (tabelApa === 1) {
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
    } else if (pilih === 2) {
        $.ajax({
            type: "PUT",
            url: "/Kencana/PermohonanSatuDivisiKencana/koreksiData",
            data: {
                _token: csrfToken,
                XIdTransaksi: transaksiId.value,
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
                    tombol(1);
                    if (tabelApa === 1) {
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
    } else if (pilih === 3) {
        $.ajax({
            type: "DELETE",
            url: "/Kencana/PermohonanSatuDivisiKencana/deleteData",
            data: {
                _token: csrfToken,
                XIdTransaksi: transaksiId.value,
            },
            success: function (result) {
                Swal.fire({
                    icon: "success",
                    text: result.success,
                    returnFocus: false,
                }).then(() => {
                    tombol(1);
                    if (tabelApa === 1) {
                        TampilAllData();
                    } else {
                        TampilData();
                    }
                    ClearForm();
                });
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
}

btn_batal.addEventListener("click", function (e) {
    ClearForm();
    tombol(1);
    if (tabelApa === 1) {
        TampilAllData();
    } else {
        TampilData();
    }
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
                            url: "/Kencana/PermohonanSatuDivisiKencana/getDivisi",
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

                Swal.fire({
                    title: "Tampilkan semua data?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Ya",
                    cancelButtonText: "Tidak",
                    returnFocus: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        tabelApa = 1;
                        TampilAllData();
                    } else {
                        tabelApa = 0;
                        TampilData();
                    }
                });
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
                        order: [1, "asc"],
                        ajax: {
                            url: "/Kencana/PermohonanSatuDivisiKencana/getObjek",
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
                objekId.value = result.value.IdObjek.trim();
                objekNama.value = decodeHtmlEntities(
                    result.value.NamaObjek.trim()
                );

                btn_kelut.disabled = false;
                btn_kelut.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// but`to`n list kelompok utama
btn_kelut.addEventListener("click", function (e) {
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
                        order: [0, "asc"],
                        ajax: {
                            url: "/Kencana/PermohonanSatuDivisiKencana/getKelUt",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdObjek_KelompokUtama: objekId.value.trim(),
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

                btn_kelompok.disabled = false;
                btn_kelompok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok
btn_kelompok.addEventListener("click", function (e) {
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
                            url: "/Kencana/PermohonanSatuDivisiKencana/getKelompok",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdKelompokUtama_Kelompok: kelutId.value.trim(),
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

                btn_subkel.disabled = false;
                btn_subkel.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kelompok
btn_subkel.addEventListener("click", function (e) {
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
                            url: "/Kencana/PermohonanSatuDivisiKencana/getSubkel",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdKelompok_SubKelompok:
                                    kelompokId.value.trim(),
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

                btn_namabarangPemberi.disabled = false;
                btn_namabarangPemberi.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btn_namabarangPemberi.addEventListener("click", function (e) {
    PIdType = "";
    console.log(subkelId.value);

    if (
        (divisiId.value === "ABM" && objekId.value === "022") ||
        (divisiId.value === "CIR" && objekId.value === "043") ||
        (divisiId.value === "JBB" && objekId.value === "042") ||
        (divisiId.value === "EXT" &&
            (kelompokId.value === "1259" || kelompokId.value === "1283"))
    ) {
        if (
            divisiId.value === "ABM" &&
            objekId.value === "022" &&
            kelompokId.value !== "0292"
        ) {
            Load_Type_ABM("pemberi");
        } else {
            $.ajax({
                type: "PUT",
                url: "/Kencana/PermohonanSatuDivisiKencana/insertTempType",
                data: {
                    XIdDivisi: divisiId.value,
                    XIdSubKelompok: subkelId.value,
                    _token: csrfToken,
                },
                success: function (response) {},
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            });
            Load_Type_CIR("pemberi");
        }
    } else {
        Load_Type("pemberi");
    }
});

btn_objek2.addEventListener("click", function (e) {
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
                            url: "/Kencana/PermohonanSatuDivisiKencana/getObjek",
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
                objekId2.value = decodeHtmlEntities(
                    result.value.IdObjek.trim()
                );
                objekNama2.value = decodeHtmlEntities(
                    result.value.NamaObjek.trim()
                );

                btn_kelut2.disabled = false;
                btn_kelut2.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// but`to`n list kelompok utama
btn_kelut2.addEventListener("click", function (e) {
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
                        order: [0, "asc"],
                        ajax: {
                            url: "/Kencana/PermohonanSatuDivisiKencana/getKelUt",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdObjek_KelompokUtama: objekId2.value.trim(),
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
                kelutId2.value = decodeHtmlEntities(
                    result.value.IdKelompokUtama.trim()
                );
                kelutNama2.value = decodeHtmlEntities(
                    result.value.NamaKelompokUtama.trim()
                );

                btn_kelompok2.disabled = false;
                btn_kelompok2.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok
btn_kelompok2.addEventListener("click", function (e) {
    subkelId2.value = "";
    subkelNama2.value = "";

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
                            url: "/Kencana/PermohonanSatuDivisiKencana/getKelompok",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdKelompokUtama_Kelompok:
                                    kelutId2.value.trim(),
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

                btn_subkel2.disabled = false;
                btn_subkel2.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kelompok
btn_subkel2.addEventListener("click", function (e) {
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
                            url: "/Kencana/PermohonanSatuDivisiKencana/getSubkel",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdKelompok_SubKelompok:
                                    kelompokId2.value.trim(),
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
                subkelId2.value = decodeHtmlEntities(
                    result.value.IdSubkelompok.trim()
                );
                subkelNama2.value = decodeHtmlEntities(
                    result.value.NamaSubKelompok.trim()
                );

                btn_namabarangPenerima.disabled = false;
                btn_namabarangPenerima.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btn_namabarangPenerima.addEventListener("click", function (e) {
    PIdType = "";
    if (
        (divisiId.value === "ABM" && objekId.value === "022") ||
        (divisiId.value === "CIR" && objekId.value === "043") ||
        (divisiId.value === "JBB" && objekId.value === "042") ||
        (divisiId.value === "EXT" &&
            (kelompokId.value === "1259" || kelompokId.value === "1283"))
    ) {
        if (
            divisiId.value === "ABM" &&
            objekId.value === "022" &&
            kelompokId.value !== "0292"
        ) {
            Load_Type_ABM("penerima");
        } else {
            $.ajax({
                type: "PUT",
                url: "/Kencana/PermohonanSatuDivisiKencana/insertTempType",
                data: {
                    XIdDivisi: divisiId.value,
                    XIdSubKelompok: subkelId2.value,
                    _token: csrfToken,
                },
                success: function (response) {},
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            });
            Load_Type_CIR("penerima");
        }
    } else {
        Load_Type("penerima");
    }
});
