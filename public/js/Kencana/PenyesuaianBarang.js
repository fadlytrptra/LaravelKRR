var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisiNama = document.getElementById('divisiNama');
var tanggal = document.getElementById('tanggal');
var today = new Date();
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0');
var day = today.getDate().toString().padStart(2, '0');
var todayString = year + '-' + month + '-' + day;
var pemohon = document.getElementById('pemohon');
var objekNama = document.getElementById('objekNama');
var kelompokNama = document.getElementById('kelompokNama');
var kelutNama = document.getElementById('kelutNama');
var subkelNama = document.getElementById('subkelNama');
var kodeTransaksi = document.getElementById('kodeTransaksi');
var kodeBarang = document.getElementById('kodeBarang');
var PIB = document.getElementById('PIB');
var kodeType = document.getElementById('kodeType');
var namaBarang = document.getElementById('namaBarang');

var primer = document.getElementById('primer');
var primer2 = document.getElementById('primer2');
var sekunder = document.getElementById('sekunder');
var sekunder2 = document.getElementById('sekunder2');
var tritier = document.getElementById('tritier');
var tritier2 = document.getElementById('tritier2');
var no_primer = document.getElementById('no_primer');
var no_sekunder = document.getElementById('no_sekunder');
var no_tritier = document.getElementById('no_tritier');
var no_primer2 = document.getElementById('no_primer2');
var no_sekunder2 = document.getElementById('no_sekunder2');
var no_tritier2 = document.getElementById('no_tritier2');
var alasan = document.getElementById('alasan');

var divisiId = document.getElementById('divisiId');
var objekId = document.getElementById('objekId');
var kelompokId = document.getElementById('kelompokId');
var kelutId = document.getElementById('kelutId');
var subkelId = document.getElementById('subkelId');

var hargaSatuanLabel = document.getElementById('hargaSatuanLabel');
var hargaSatuan = document.getElementById('hargaSatuan');

// button
var btn_divisi = document.getElementById('btn_divisi');
var btn_objek = document.getElementById('btn_objek');
var btn_kelompok = document.getElementById('btn_kelompok');
var btn_kelut = document.getElementById('btn_kelut');
var btn_subkel = document.getElementById('btn_subkel');
var btn_kodeType = document.getElementById('btn_kodeType');
var btn_namaBarang = document.getElementById('btn_namaBarang');
var btn_isi = document.getElementById('btn_isi');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');

let a; // isi = 1, koreksi = 2, hapus = 3
let tampil; // all data = 1, not all = 2
const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'));
var primer3;
var sekunder3;
var tritier3;
var kondisi;

tanggal.value = todayString;
tanggal.focus();

primer2.disabled = true;
sekunder2.disabled = true;
tritier2.disabled = true;

hargaSatuan.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        hargaSatuan.value = numeral(hargaSatuan.value).format("0,0.00");
        alasan.focus();
    }
});
// fungsi berhubungan dengan ENTER & oengecekkan yg kosong2
inputs.forEach((masuk, index) => {
    masuk.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            if (masuk.id === 'tanggal') {
                btn_divisi.focus();
            } else if (masuk.id === 'primer2') {
                sekunder2.select();
            } else if (masuk.id === 'sekunder2') {
                tritier2.select();
            } else if (masuk.id === 'tritier2') {
                if (numeral(tritier2.value).value() > numeral(tritier.value).value()) {
                    kondisi = 1;
                    hargaSatuanLabel.style.display = 'block';
                    hargaSatuan.style.display = 'block';
                    hargaSatuan.select();
                    hargaSatuan.focus();
                } else {
                    kondisi = 2;
                    hargaSatuanLabel.style.display = 'none';
                    hargaSatuan.style.display = 'none';
                    alasan.focus();
                }
            } else if (masuk.id === 'alasan') {
                if (a === 1 || a === 2) {
                    btn_proses.focus();
                } else if (a === undefined) {
                    btn_koreksi.focus();
                } else if (masuk.id === 'kodeBarang' && kodeBarang.value !== '') {
                    cekKodeBarang(kodeBarang.value);
                }
            }
        }
    })
});

$(document).ready(function () {
    table = $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Kd. Transaksi' },
            { title: 'Nama Barang' },
            { title: 'Alasan Mutasi' },
            { title: 'Pemohon' },
            { title: 'Tgl. Mohon' },
            { title: 'Divisi' },
            { title: 'Objek' },
            { title: 'Kel. Utama' },
            { title: 'Kelompok' },
            { title: 'Sub Kelompok' }
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
        scrollX: '100%',
        columnDefs: [{ targets: [0], width: '10%', className: 'fixed-width' },
        { targets: [1], width: '35%', className: 'fixed-width' },
        { targets: [2], width: '35%', className: 'fixed-width' },
        { targets: [3], width: '10%', className: 'fixed-width' },
        { targets: [4], width: '10%', className: 'fixed-width' },
        { targets: [5], width: '10%', className: 'fixed-width' },
        { targets: [6], width: '10%', className: 'fixed-width' },
        { targets: [7], width: '10%', className: 'fixed-width' },
        { targets: [8], width: '10%', className: 'fixed-width' },
        { targets: [9], width: '10%', className: 'fixed-width' }]
    });
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


// fungsi unk menampilkan '&'
function decodeHtmlEntities(str) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
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
        type: 'GET',
        url: '/Kencana/PenyesuaianBarangKencana/getUserId',
        data: {
            _token: csrfToken
        },
        success: function (result) {
            pemohon.value = result.user.trim();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

$(document).ready(function () {
    getUserId();
});

btn_objek.disabled = true;
btn_kelut.disabled = true;
btn_kelompok.disabled = true;
btn_subkel.disabled = true;
btn_kodeType.disabled = true;
btn_namaBarang.disabled = true;

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
                            url: "/Kencana/PenyesuaianBarangKencana/getDivisi",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IdDivisi" },
                            { data: "NamaDivisi" }
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
                divisiId.value = result.value.IdDivisi.trim();
                divisiNama.value = decodeHtmlEntities(result.value.NamaDivisi.trim());
                if (divisiNama.value !== '') {
                    Swal.fire({
                        icon: 'question',
                        title: 'Menampilkan Semua Data?',
                        showCancelButton: true,
                        confirmButtonText: 'Ya',
                        cancelButtonText: 'Tidak',
                        returnFocus: false,
                    }).then((confirmResult) => {
                        if (confirmResult.isConfirmed) {
                            tampil = 1;
                            showAllTable();
                            btn_isi.focus();
                        } else {
                            tampil = 2;
                            showTable();
                            btn_isi.focus();
                        }
                    });
                }
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
                        order: [1, "asc"],
                        ajax: {
                            url: "/Kencana/PenyesuaianBarangKencana/getObjek",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                divisiId: divisiId.value
                            }
                        },
                        columns: [
                            { data: "IdObjek" },
                            { data: "NamaObjek" }
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
                objekId.value = result.value.IdObjek.trim();
                objekNama.value = decodeHtmlEntities(result.value.NamaObjek.trim());
                btn_kelut.focus();

                if (objekNama.value !== '') {
                    btn_kelut.disabled = false;
                    btn_kelut.focus();
                }
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
                        order: [1, "asc"],
                        ajax: {
                            url: "/Kencana/PenyesuaianBarangKencana/getKelUt",
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
                kelutId.value = result.value.IdKelompokUtama.trim();
                kelutNama.value = decodeHtmlEntities(result.value.NamaKelompokUtama.trim());

                if (kelutNama.value !== '') {
                    btn_kelompok.disabled = false;
                    btn_kelompok.focus();
                }
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
                            url: "/Kencana/PenyesuaianBarangKencana/getKelompok",
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
                kelompokId.value = result.value.idkelompok.trim();
                kelompokNama.value = decodeHtmlEntities(result.value.namakelompok.trim());

                if (kelutNama.value !== '') {
                    btn_subkel.disabled = false;
                    btn_subkel.focus();
                }
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
                            url: "/Kencana/PenyesuaianBarangKencana/getSubkel",
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
                btn_kodeType.focus();
                subkelId.value = result.value.IdSubkelompok.trim();
                subkelNama.value = result.value.NamaSubKelompok.trim();

                if (subkelNama.value !== '') {
                    btn_kodeType.disabled = false;
                    btn_namaBarang.disabled = false;
                    btn_kodeType.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button kode type & nama type sama
btn_kodeType.addEventListener("click", handleTypeSelection);
btn_namaBarang.addEventListener("click", handleTypeSelection);

function handleTypeSelection() {
    console.log(divisiNama.value, objekId.value, subkelId.value);

    primer2.value = 0;
    sekunder2.value = 0;
    tritier2.value = 0;

    if ((divisiId.value === 'ABM' && objekId.value === '022') || (divisiId.value === 'CIR' && objekId.value === '043') ||
        (divisiId.value === 'JBB' && objekId.value === '042') || (divisiId.value === 'EXT' && ((objekId.value === '1259' || objekId.value === '1283')))) {
        if (divisiId.value === 'ABM' && objekId.value === '022') {
            if (subkelId.value !== '') {
                try {
                    Swal.fire({
                        title: 'Kode Type',
                        html: `
                            <table id="table_list" class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">ID Type</th>
                                        <th scope="col">Nama</th>
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
                        width: '55%',
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
                                        url: "/Kencana/PenyesuaianBarangKencana/getABM",
                                        dataType: "json",
                                        type: "GET",
                                        data: {
                                            _token: csrfToken,
                                            subkelId: subkelId.value
                                        }
                                    },
                                    columns: [
                                        { data: "idtype" },
                                        { data: "BARU" }
                                    ],
                                    columnDefs: [
                                        {
                                            targets: 0,
                                            width: '200px',
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
                            kodeType.value = result.value.idtype.trim();
                            namaBarang.value = decodeHtmlEntities(result.value.BARU.trim());

                            if (kodeType.value !== '') {
                                getType(kodeType.value)
                                getSaldo(kodeType.value);

                                if (condition) {

                                }
                            } else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Data Belum Lengkap Terisi',
                                    text: 'Pilih dulu Type Barangnya !',
                                    returnFocus: false
                                }).then(() => {
                                    btn_kodeType.focus();
                                });
                            }
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Data Belum Lengkap Terisi',
                    text: 'Pilih dulu Sub Kelompoknya !',
                    returnFocus: false
                }).then(() => {
                    btn_subkel.focus();
                });
            }
        } else {
            if (subkelId.value !== '') {
                try {
                    Swal.fire({
                        title: 'Kode Type',
                        html: `
                            <table id="table_list" class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">ID Type</th>
                                        <th scope="col">Nama</th>
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
                        width: '55%',
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
                                        url: "/Kencana/PenyesuaianBarangKencana/getTypeCIR",
                                        dataType: "json",
                                        type: "GET",
                                        data: {
                                            _token: csrfToken,
                                            divisiId: divisiId.value,
                                            subkelId: subkelId.value
                                        }
                                    },
                                    columns: [
                                        { data: "Id_Type" },
                                        { data: "Nm_Type" }
                                    ],
                                    columnDefs: [
                                        {
                                            targets: 0,
                                            width: '200px',
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
                            kodeType.value = result.value.Id_Type.trim();
                            namaBarang.value = result.value.Nm_Type.trim();

                            if (kodeType.value !== '') {
                                getType(kodeType.value)
                                getSaldo(kodeType.value);
                            } else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Data Belum Lengkap Terisi',
                                    text: 'Pilih dulu Type Barangnya !',
                                    returnFocus: false
                                }).then(() => {
                                    kodeBarang.focus();
                                });
                            }
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    } else {
        if (subkelId !== '') {
            try {
                Swal.fire({
                    title: 'Kode Type',
                    html: `
                        <table id="table_list" class="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID Type</th>
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
                    width: '55%',
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
                                    url: "/Kencana/PenyesuaianBarangKencana/getType",
                                    dataType: "json",
                                    type: "GET",
                                    data: {
                                        _token: csrfToken,
                                        subkelId: subkelId.value
                                    }
                                },
                                columns: [
                                    { data: "IdType" },
                                    { data: "NamaType" }
                                ],
                                columnDefs: [
                                    {
                                        targets: 0,
                                        width: '200px',
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
                        kodeType.value = result.value.IdType.trim();
                        namaBarang.value = decodeHtmlEntities(result.value.NamaType.trim());

                        getType(kodeType.value);

                        if (namaBarang.value !== '') {
                            getSaldo(kodeType.value);

                            handleChange();
                            no_primer.addEventListener('change', handleChange);
                            no_sekunder.addEventListener('change', handleChange);
                            no_tritier.addEventListener('change', handleChange);
                        }
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
}

// fungsi unk dapatkan saldo primer, sekunder, tritier
function getSaldo(kodeType) {
    $.ajax({
        url: "/Kencana/PenyesuaianBarangKencana/getSaldo",
        type: "GET",
        data: {
            _token: csrfToken,
            kodeType: kodeType
        },
        timeout: 30000,
        success: function (response) {
            if (response && response.length > 0) {
                primer.value = formatNumber(response[0].SaldoPrimer);
                sekunder.value = formatNumber(response[0].SaldoSekunder);
                tritier.value = formatNumber(response[0].SaldoTritier);
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}

// fungsi unk dapatkan type dari kodetype
function getType(kodeType) {
    $.ajax({
        url: "/Kencana/PenyesuaianBarangKencana/getSatuanType",
        type: "GET",
        data: {
            _token: csrfToken,
            kodeType: kodeType
        },
        timeout: 30000,
        success: function (response) {
            console.log(response);
            if (response && response.length > 0) {
                kodeBarang.value = response[0].KodeBarang.trim();
                no_primer.value = response[0].Satuan_Primer.trim();
                no_sekunder.value = response[0].Satuan_Sekunder.trim();
                no_tritier.value = response[0].Satuan_Tritier.trim();
                no_primer2.value = response[0].Satuan_Primer.trim();
                no_sekunder2.value = response[0].Satuan_Sekunder.trim();
                no_tritier2.value = response[0].Satuan_Tritier.trim();
                PIB.value = response[0].PIB !== null ? response[0].PIB.trim() : '';
                handleChange();
                no_primer.addEventListener('change', handleChange);
                no_sekunder.addEventListener('change', handleChange);
                no_tritier.addEventListener('change', handleChange);
                no_primer2.addEventListener('change', handleChange);
                no_sekunder2.addEventListener('change', handleChange);
                no_tritier2.addEventListener('change', handleChange);
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}

function handleChange() {
    primerValue = no_primer.value.trim();
    sekunderValue = no_sekunder.value.trim();
    tritierValue = no_tritier.value.trim();

    if (primerValue === 'NULL' && sekunderValue === 'NULL') {
        primer2.disabled = true;
        sekunder2.disabled = true;
        tritier2.select();
    } else if (primerValue === 'NULL' && sekunderValue !== 'NULL') {
        primer2.disabled = true;
        sekunder2.disabled = false;
        sekunder2.select();
    } else {
        primer2.select();
    }
}

// fungsi unk dapatkan type dari kodetype
function getType2(kodeTransaksi) {
    $.ajax({
        url: "/Kencana/PenyesuaianBarangKencana/getType2",
        type: "GET",
        data: {
            _token: csrfToken,
            kodeTransaksi: kodeTransaksi
        },
        timeout: 30000,
        success: function (response) {
            console.log(response);
            primer2.value = formatNumber(response[0].JumlahPengeluaranPrimer.trim());
            sekunder2.value = formatNumber(response[0].JumlahPengeluaranSekunder.trim());
            tritier2.value = formatNumber(response[0].JumlahPengeluaranTritier.trim());
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}

// fungsi unk update isi tabel
function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdTransaksi.trim()),
            escapeHtml(item.NamaType.trim()),
            escapeHtml(item.UraianDetailTransaksi.trim()),
            escapeHtml(item.NamaUser.trim()),
            escapeHtml(item.SaatAwalTransaksi.trim()),
            escapeHtml(item.NamaDivisi.trim()),
            escapeHtml(item.NamaObjek.trim()),
            escapeHtml(item.NamaKelompokUtama.trim()),
            escapeHtml(item.NamaKelompok.trim()),
            escapeHtml(item.NamaSubKelompok.trim()),
            escapeHtml(item.IdPenerima.trim()),
            item.IdObjek
        ]);
    });
    table.draw();
}

$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    var data = table.row(this).data();
    console.log(data);

    kodeTransaksi.value = data[0];
    namaBarang.value = decodeHtmlEntities(data[1]);
    alasan.value = decodeHtmlEntities(data[2]);
    var originalDate = data[4];
    var parts = originalDate.split('/');
    var formattedDate = parts[2] + '-' + parts[0].padStart(2, '0') + '-' + parts[1].padStart(2, '0');
    tanggal.value = formattedDate;
    divisiNama.value = decodeHtmlEntities(data[5]);
    objekNama.value = decodeHtmlEntities(data[6]);
    kelutNama.value = decodeHtmlEntities(data[7]);
    kelompokNama.value = decodeHtmlEntities(data[8]);
    subkelNama.value = decodeHtmlEntities(data[9]);
    pemohon.value = data[10];

    $.ajax({
        type: 'GET',
        url: '/Kencana/PenyesuaianBarangKencana/getSelect',
        data: {
            _token: csrfToken,
            kodeTransaksi: kodeTransaksi.value
        },
        success: function (result) {
            if (result) {
                primer.value = formatNumber(result[0].SaldoPrimer) ?? formatNumber(0);
                sekunder.value = formatNumber(result[0].SaldoSekunder) ?? formatNumber(0);
                tritier.value = formatNumber(result[0].SaldoTritier) ?? formatNumber(0);

                no_primer2.value = result[0].Satuan_Primer;
                no_sekunder2.value = result[0].Satuan_Sekunder;
                no_tritier2.value = result[0].Satuan_Tritier;

                primer2.value = formatNumber(result[0].SaldoPrimer2) ?? formatNumber(0);
                sekunder2.value = formatNumber(result[0].SaldoSekunder2) ?? formatNumber(0);
                tritier2.value = formatNumber(result[0].SaldoTritier2) ?? formatNumber(0);

                primer2.select();
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});

// menampilkan data dari semua pemohon
function showAllTable() {
    $.ajax({
        type: 'GET',
        url: '/Kencana/PenyesuaianBarangKencana/getAllData',
        data: {
            _token: csrfToken,
            divisiId: divisiId.value,
        },
        success: function (result) {
            updateDataTable(result);
            $('.divTable').show();
            btn_isi.focus();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

// menampilkan data berdasarkan pemohon
function showTable() {
    $.ajax({
        type: 'GET',
        url: '/Kencana/PenyesuaianBarangKencana/getData',
        data: {
            _token: csrfToken,
            divisiId: divisiId.value,
            pemohon: pemohon.value
        },
        success: function (result) {
            updateDataTable(result);
            $('.divTable').show();
            btn_isi.focus();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

// fungsi dapetin sub id dari kode type
function getSubkelId() {
    $.ajax({
        type: 'GET',
        url: '/Kencana/PenyesuaianBarangKencana/getSubkelId',
        data: {
            _token: csrfToken,
            kodeType: kodeType.value,
        },
        success: function (response) {
            subkelId.value = response[0].idsubkel;
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

// fungsi cek kode barang dari inputan
function cekKodeBarang(kodeBarang) {
    kodeBarangPadded = kodeBarang.value.trim().padStart(9, '0');
    $.ajax({
        type: 'GET',
        url: '/Kencana/PenyesuaianBarangKencana/cekKodeBarang',
        data: {
            _token: csrfToken,
            kodeBarang: kodeBarangPadded,
            subkelId: subkelId.value
        },
        success: function (response) {
            if (response.warning) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Kode Barang Tidak Ada!',
                    text: response.warning,
                    returnFocus: false,
                }).then(() => {
                    btn_divisi.focus();
                });
            } else if (response.length > 0) {
                kodeType.value = result.IdType !== null ? decodeHtmlEntities(result.IdType.trim()) : "-";
                namaBarang.value = result.NamaType !== null ? decodeHtmlEntities(result.NamaType.trim()) : "-";
                kodeBarang.value = result.KodeBarang !== null ? decodeHtmlEntities(result.KodeBarang.trim()) : "-";
                primer.value = result.SaldoPrimer !== null ? formatNumber(result.SaldoPrimer) : "0";
                sekunder.value = result.SaldoSekunder !== null ? formatNumber(result.SaldoSekunder) : "0";
                tritier.value = result.SaldoTritier !== null ? formatNumber(result.SaldoTritier) : "0";
                no_primer.value = result.Satuan_Primer !== null ? decodeHtmlEntities(result.Satuan_Primer.trim()) : "";
                no_sekunder.value = result.Satuan_Sekunder !== null ? decodeHtmlEntities(result.Satuan_Sekunder.trim()) : "";
                no_tritier.value = result.Satuan_Tritier !== null ? decodeHtmlEntities(result.Satuan_Tritier.trim()) : "";
                no_primer2.value = result.Satuan_Primer !== null ? decodeHtmlEntities(result.Satuan_Primer.trim()) : "";
                no_sekunder2.value = result.Satuan_Sekunder !== null ? decodeHtmlEntities(result.Satuan_Sekunder.trim()) : "";
                no_tritier2.value = result.Satuan_Tritier !== null ? decodeHtmlEntities(result.Satuan_Tritier.trim()) : "";

                handleChange();
                no_primer.addEventListener('change', handleChange);
                no_sekunder.addEventListener('change', handleChange);
                no_tritier.addEventListener('change', handleChange);
                no_primer2.addEventListener('change', handleChange);
                no_sekunder2.addEventListener('change', handleChange);
                no_tritier2.addEventListener('change', handleChange);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });

}

function showAlert(icon, title, callback) {
    Swal.fire({
        icon: icon,
        title: title,
        returnFocus: false
    }).then(callback);
}

// button proses
btn_proses.addEventListener("click", function (e) {
    if (a === 1 || a === 2) {
        if (tanggal.valueAsDate > today) {
            showAlert('warning', 'Tanggal Tidak Boleh Lebih Besar Dari Tanggal Sekarang', () => tanggal.focus());
            return;
        }

        if (formatNumber(primer.value) > formatNumber(primer2.value)) {
            primer3 = formatNumber(primer.value) - formatNumber(primer2.value)
        } else {
            primer3 = formatNumber(primer.value) - formatNumber(primer2.value)
        }
        if (formatNumber(sekunder.value) - formatNumber(sekunder2.value)) {
            sekunder3 = formatNumber(sekunder.value) - formatNumber(sekunder2.value)
        } else {
            sekunder3 = formatNumber(sekunder.value) - formatNumber(sekunder2.value)
        }
        if (formatNumber(tritier.value) > formatNumber(tritier2.value)) {
            tritier3 = formatNumber(tritier.value) - formatNumber(tritier2.value)
        } else {
            tritier3 = formatNumber(tritier.value) - formatNumber(tritier2.value)
        }

        if (a === 1) {
            getSubkelId();
            // if (kondisi == 1 || kondisi == 2) {
            //     $.ajax({
            //         type: "PUT",
            //         url: "/Kencana/PenyesuaianBarangKencana/insPersediaan",
            //         data: {
            //             _token: csrfToken,
            //             XIdType: kodeType.value,
            //             XJumlahKeluarTritier: tritier2.value,
            //             hargaSatuan: hargaSatuan.value,
            //             kondisi: kondisi,
            //         },
            //         success: function (result) {
            //             hargaSatuan.value = 0;
            //             // primer2.value = 0;
            //             // sekunder2.value = 0;
            //             // tritier2.value = 0;
            //             // primer2.focus();
            //             // if (Pilih === 0) {
            //             //     TampilAllData();
            //             // } else {
            //             //     TampilData();
            //             // }
            //         },
            //         error: function (xhr, status, error) {
            //             console.error("Error:", error);
            //         },
            //     });
            // }
        }
    }


    if (a === 3) {
        $.ajax({
            url: "/Kencana/PenyesuaianBarangKencana/hapusBarang",
            type: "DELETE",
            data: {
                _token: csrfToken,
                kodeTransaksi: kodeTransaksi.value
            },
            timeout: 30000,
            success: function (response) {
                if (response.success) {
                    showAlert('success', 'Data terHAPUS', () => {
                        clearInputs();
                        if (tampil === 1) {
                            showAllTable();
                        } else {
                            showTable();
                        }
                    });
                } else if (response.error) {
                    showAlert('warning', 'Data Tidak ter-HAPUS.');
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX Error:', error);
            }
        });
    }

    $.ajax({
        type: 'PUT',
        url: '/Kencana/PenyesuaianBarangKencana/proses',
        data: {
            _token: csrfToken,
            a: a,
            alasan: alasan.value,
            kodeType: kodeType.value,
            subkelId: subkelId.value,
            pemohon: pemohon.value,
            tanggal: tanggal.value,
            primer3: primer3,
            sekunder3: sekunder3,
            tritier3: tritier3,
            kodeTransaksi: kodeTransaksi.value,
            hargaSatuan: hargaSatuan.value,
        },
        timeout: 30000,
        success: function (response) {
            if (a === 1 && response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.success,
                    returnFocus: false,
                }).then(() => {
                    primer2.value = 0;
                    sekunder2.value = 0;
                    tritier2.value = 0;

                    allInputs.forEach(function (input) {
                        let divPenting = input.closest('#baris-1') !== null;
                        let divids = input.closest('#ids') !== null;
                        if (!divPenting && !divids) {
                            input.value = '';
                        }
                    });

                    btn_kodeType.focus();
                    if (tampil === 1) {
                        showAllTable();
                    } else if (tampil === 2) {
                        showTable();
                    }
                });
            } else if (a === 2 && response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.success,
                    returnFocus: false,
                }).then(() => {
                    if (tampil === 1) {
                        showAllTable();
                        clearInputs();
                    } else {
                        showTable();
                        clearInputs();
                    }

                    btn_divisi.focus();
                });
            } else if (response.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Proses data GAGAL !',
                    text: response.error,
                    returnFocus: false,
                }).then(() => {
                    btn_divisi.focus();
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
});

disableKetik();
var allInputs = document.querySelectorAll('input');

// kosongin input
function clearInputs() {
    allInputs.forEach(function (input) {
        let divPenting = input.closest('#perlu') !== null;
        let divids = input.closest('#ids') !== null;
        if (!divPenting && !divids) {
            input.value = '';
        }
    });
    primer2.value = 0;
    sekunder2.value = 0;
    tritier2.value = 0;
    hargaSatuan.value = 0;
    hargaSatuanLabel.style.display = 'none';
    hargaSatuan.style.display = 'none';
}


// fungsi bisa ketik
function enableKetik() {
    clearInputs();

    // hide button isi, tampilkan button proses
    btn_isi.style.display = 'none';
    btn_proses.style.display = 'inline-block';
    // hide button koreksi, tampilkan button batal
    btn_koreksi.style.display = 'none';
    btn_batal.style.display = 'inline-block';

    btn_hapus.disabled = true;
}

// fungsi gak bisa ketik
function disableKetik() {
    // hide button proses, tampilkan button isi
    btn_proses.style.display = 'none';
    btn_isi.style.display = 'inline-block';

    // hide button batal, tampilkan button koreksi
    btn_batal.style.display = 'none';
    btn_koreksi.style.display = 'inline-block';

    btn_hapus.disabled = false;
}

// button isi event listener
btn_isi.addEventListener('click', function () {
    a = 1;
    $('#tableData').show();

    enableKetik();
    btn_objek.disabled = false;
    btn_objek.focus();

    primer2.disabled = false;
    sekunder2.disabled = false;
    tritier2.disabled = false;

    primer2.value = 0;
    sekunder2.value = 0;
    tritier2.value = 0;
    btn_hapus.disabled = true;
});

// button batal event listener
btn_batal.addEventListener('click', function () {
    // tampilin isi tabel
    if (tampil === 1) {
        showAllTable();
    } else if (tampil === 2) {
        showTable();
    }

    $('#tableData').show();

    disableKetik();
    clearInputs();
});

// button koreksi event listener
btn_koreksi.addEventListener('click', function () {
    a = 2;
    // tampilin isi tabel
    $('#tableData').show();

    btn_hapus.disabled = true;

    if (kodeTransaksi.value === '') {
        showAlert('warning', 'Pilih dulu data yg akan diKOREKSI !');
        return;
    } else {
        primer2.disabled = false;
        sekunder2.disabled = false;
        tritier2.disabled = false;

        primer2.select();

        // hide button isi, tampilkan button proses
        btn_isi.style.display = 'none';
        btn_proses.style.display = 'inline-block';
        // hide button koreksi, tampilkan button batal
        btn_koreksi.style.display = 'none';
        btn_batal.style.display = 'inline-block';
        $.ajax({
            type: 'GET',
            url: '/Kencana/PenyesuaianBarangKencana/getHargaSatuan',
            data: {
                _token: csrfToken,
                kodeTransaksi: kodeTransaksi.value
            },
            success: function (result) {
                hargaSatuanLabel.style.display = 'block';
                hargaSatuan.style.display = 'block';
                hargaSatuan.value = numeral(result.harga_satuan).format('0,0.00') ?? 0;
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }
});

// button hapus event listener
btn_hapus.addEventListener('click', function () {
    a = 3;
    // tampilin isi tabel
    $('#tableData').show();

    // btn_hapus.disabled = true;

    if (kodeTransaksi.value === '') {
        showAlert('warning', 'Pilih dulu data yg akan diHAPUS !');
        return;
    } else {
        // hide button isi, tampilkan button proses
        btn_isi.style.display = 'none';
        btn_proses.style.display = 'inline-block';
        // hide button koreksi, tampilkan button batal
        btn_koreksi.style.display = 'none';
        btn_batal.style.display = 'inline-block';

        btn_hapus.disabled = true;
        btn_proses.focus();
    }
});
