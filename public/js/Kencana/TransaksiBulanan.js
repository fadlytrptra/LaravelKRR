var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Assigning elements to variables
var divisiId = document.getElementById("divisiId");
var divisiNama = document.getElementById("divisiNama");
var bulan = document.getElementById("bulan");
var bulanId = document.getElementById("bulanId");
var tahun = document.getElementById("tahun");
var objekId = document.getElementById("objekId");
var objekNama = document.getElementById("objekNama");
var kelompokId = document.getElementById("kelompokId");
var kelompokNama = document.getElementById("kelompokNama");
var kelutId = document.getElementById("kelutId");
var kelutNama = document.getElementById("kelutNama");
var subkelId = document.getElementById("subkelId");
var subkelNama = document.getElementById("subkelNama");
var triter = document.getElementById("triter");
var sekunder = document.getElementById("sekunder");
var primer = document.getElementById("primer");

// Button Variables
var btn_divisi = document.getElementById('btn_divisi');
var btn_bulanTahun = document.getElementById('btn_bulanTahun');
var btn_objek = document.getElementById('btn_objek');
var btn_kelompok = document.getElementById('btn_kelompok');
var btn_kelut = document.getElementById('btn_kelut');
var btn_subkel = document.getElementById('btn_subkel');
var btn_print = document.getElementById('btn_print');
var btn_ok = document.getElementById('btn_ok');

const currentYear = new Date().getFullYear();
tahun.value = currentYear;

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
    }
    else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex === null || currentIndex >= rowCount - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    }
    else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === null || currentIndex <= 0) {
            currentIndex = rowCount - 1;
        } else {
            currentIndex--;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    }
    else if (e.key === "ArrowRight") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page < pageInfo.pages - 1) {
            table.page('next').draw('page').on('draw', function () {
                currentIndex = 0;
                const newRows = $(`#${tableId} tbody tr`);
                const selectedRow = $(newRows[currentIndex]).addClass("selected");
                scrollRowIntoView(selectedRow[0]);
            });
        }
    }
    else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page > 0) {
            table.page('previous').draw('page').on('draw', function () {
                currentIndex = 0;
                const newRows = $(`#${tableId} tbody tr`);
                const selectedRow = $(newRows[currentIndex]).addClass("selected");
                scrollRowIntoView(selectedRow[0]);
            });
        }
    }
}

// Helper function to scroll selected row into view
function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: 'nearest' });
}

// button list divisi
btn_divisi.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Divisi',
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
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "/Kencana/TransaksiBulananKencana/getDivisi",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IdDivisi" },
                            { data: "NamaDivisi" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });
                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                divisiId.value = decodeHtmlEntities(result.value.IdDivisi.trim());
                divisiNama.value = decodeHtmlEntities(result.value.NamaDivisi.trim());
                btn_bulanTahun.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});


// button list bulan
btn_bulanTahun.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Bulan',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Bulan</th>
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
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        paging: false,
                        searching: false,
                        info: false,
                        ordering: false,
                        ajax: {
                            url: "/Kencana/TransaksiBulananKencana/getBulan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Bulan" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                bulan.value = decodeHtmlEntities(result.value.Bulan.trim());
                bulanId.value = decodeHtmlEntities(result.value.Id_Bln.trim());
                tahun.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

$('#tahun').on('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        $('#btn_objek').focus();
    }
});

// button list objek
btn_objek.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Objek',
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
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "/Kencana/TransaksiBulananKencana/getObjek",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                divisi: divisiId.value
                            }
                        },
                        columns: [
                            { data: "IdObjek" },
                            { data: "NamaObjek" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                objekId.value = decodeHtmlEntities(result.value.IdObjek.trim());
                objekNama.value = decodeHtmlEntities(result.value.NamaObjek.trim());
                btn_kelut.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok utama
btn_kelut.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Kelompok Utama',
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
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "/Kencana/TransaksiBulananKencana/getKelUt",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                objekId: objekId.value
                            }
                        },
                        columns: [
                            { data: "IdKelompokUtama" },
                            { data: "NamaKelompokUtama" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                kelutId.value = decodeHtmlEntities(result.value.IdKelompokUtama.trim());
                kelutNama.value = decodeHtmlEntities(result.value.NamaKelompokUtama.trim());
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
            title: 'Kelompok',
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
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "/Kencana/TransaksiBulananKencana/getKelompok",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelutId: kelutId.value
                            }
                        },
                        columns: [
                            { data: "idkelompok" },
                            { data: "namakelompok" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                kelompokId.value = decodeHtmlEntities(result.value.idkelompok.trim());
                kelompokNama.value = decodeHtmlEntities(result.value.namakelompok.trim());
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
            title: 'Sub Kelompok',
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
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "/Kencana/TransaksiBulananKencana/getSubkel",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelompokId: kelompokId.value
                            }
                        },
                        columns: [
                            { data: "IdSubkelompok" },
                            { data: "NamaSubKelompok" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                subkelId.value = decodeHtmlEntities(result.value.IdSubkelompok.trim());
                subkelNama.value = decodeHtmlEntities(result.value.NamaSubKelompok.trim());
                btn_ok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Bulan' },
            { title: 'Tahun' },
            { title: 'Kode Type' },
            { title: 'Kode Barang' },
            { title: 'Nama Type' },
            { title: 'Pemasukan Primer' },
            { title: 'Pemasukan Sekunder' },
            { title: 'Pemasukan Tritier' },
            { title: 'Pengeluaran Primer' },
            { title: 'Pengeluaran Sekunder' },
            { title: 'Pengeluaran Tritier' },
        ],
        colResize: {
            isEnabled: true,
            hoverClass: 'dt-colresizable-hover',
            hasBoundCheck: true,
            minBoundClass: 'dt-colresizable-bound-min',
            maxBoundClass: 'dt-colresizable-bound-max',
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
                let stateStorageName = window.location.pathname + "/colResizeStateData";
                localStorage.setItem(stateStorageName, JSON.stringify(data));
            },
            stateLoadCallback: function (settings) {
                let stateStorageName = window.location.pathname + "/colResizeStateData",
                    data = localStorage.getItem(stateStorageName);
                return data != null ? JSON.parse(data) : null;
            }
        },
        scrollY: '400px',
        autoWidth: false,
        scrollX: '150%',
        columnDefs: [{ targets: [0], width: '8%', className: 'fixed-width', visible: false },
        { targets: [1], width: '5%', className: 'fixed-width' },
        { targets: [2], width: '12%', className: 'fixed-width' },
        { targets: [3], width: '12%', className: 'fixed-width' },
        { targets: [4], width: '20%', className: 'fixed-width' },
        { targets: [5], width: '10%', className: 'fixed-width' },
        { targets: [6], width: '10%', className: 'fixed-width' },
        { targets: [7], width: '10%', className: 'fixed-width' },
        { targets: [8], width: '10%', className: 'fixed-width' },
        { targets: [9], width: '10%', className: 'fixed-width' },
        { targets: [10], width: '10%', className: 'fixed-width' },]
    });
});

function decodeHtmlEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.Bulan),
            escapeHtml(item.Tahun),
            escapeHtml(item.IdType),
            escapeHtml(item.KodeBarang),
            escapeHtml(item.NamaType),
            formatNumber(item.MasukPrimer),
            formatNumber(item.MasukSekunder),
            formatNumber(item.MasukTritier),
            formatNumber(item.KeluarPrimer),
            formatNumber(item.KeluarSekunder),
            formatNumber(item.KeluarTritier),
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


$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    var data = table.row(this).data();
    let IdType = decodeHtmlEntities(data[2]);

    console.log(IdType);

    $.ajax({
        type: 'GET',
        url: '/Kencana/TransaksiBulananKencana/getSaldo',
        data: {
            IdType: IdType,
            _token: csrfToken
        },
        success: function (result) {
            if (result) {
                triter.value = formatNumber(result[0].SaldoTritier);
                primer.value = formatNumber(result[0].SaldoPrimer);
                sekunder.value = formatNumber(result[0].SaldoSekunder);
            }
            else {
                triter.value = '';
                primer.value = '';
                sekunder.value = '';
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});


// button ok
btn_ok.addEventListener("click", function (e) {
    primer.value = '';
    triter.value = '';
    sekunder.value = '';

    let tampil = false;

    // subkel(full)
    if (subkelId.value && kelompokId.value && kelutId.value && objekId.value) {
        tampil = true;

        $.ajax({
            type: 'GET',
            url: '/Kencana/TransaksiBulananKencana/getTransaksiBulanan4Data',
            data: {
                _token: csrfToken,
                XIdSubKelompok: subkelId.value,
                XBulan: bulanId.value ?? null,
                XTahun: tahun.value ?? null,
            },
            success: function (result) {
                if (tampil == true) {
                    updateDataTable(result);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data di tabel sudah diupdate.',
                    });
                }
            },
            error: function (xhr, status, error) {
            },
        });
    }

    // objek
    if (subkelId.value == '' && kelompokId.value == '' && kelutId.value == '' && objekId.value) {
        tampil = true;

        $.ajax({
            type: 'GET',
            url: '/Kencana/TransaksiBulananKencana/getTransaksiBulananObjek',
            data: {
                _token: csrfToken,
                XIdObjek: objekId.value,
                XBulan: bulanId.value,
                XTahun: tahun.value ?? null,
            },
            success: function (result) {
                if (tampil == true) {
                    updateDataTable(result);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data di tabel sudah diupdate.',
                    });
                }
            },
            error: function (xhr, status, error) {
            },
        });
    }

    // kelutama
    if (subkelId.value == '' && kelompokId.value == '' && kelutId.value && objekId.value) {
        tampil = true;

        $.ajax({
            type: 'GET',
            url: '/Kencana/TransaksiBulananKencana/getTransaksiBulananKelut',
            data: {
                _token: csrfToken,
                XIdKelUt: kelutId.value,
                XBulan: bulanId.value,
                XTahun: tahun.value ?? null,
            },
            success: function (result) {
                if (tampil == true) {
                    updateDataTable(result);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data di tabel sudah diupdate.',
                    });
                }
            },
            error: function (xhr, status, error) {
            },
        });
    }

    // kelutama
    if (subkelId.value == '' && kelompokId.value && kelutId.value && objekId.value) {
        tampil = true;

        $.ajax({
            type: 'GET',
            url: '/Kencana/TransaksiBulananKencana/getTransaksiBulananKelompok',
            data: {
                _token: csrfToken,
                XIdKel: kelompokId.value,
                XBulan: bulanId.value,
                XTahun: tahun.value ?? null,
            },
            success: function (result) {
                if (tampil == true) {
                    updateDataTable(result);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data di tabel sudah diupdate.',
                    });
                }
            },
            error: function (xhr, status, error) {
            },
        });
    }
});
