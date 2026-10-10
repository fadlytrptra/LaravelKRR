var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisiId = document.getElementById('divisiId');
var divisiNama = document.getElementById('divisiNama');
var objekId = document.getElementById('objekId');
var objekNama = document.getElementById('objekNama');
var kelompokId = document.getElementById('kelompokId');
var kelompokNama = document.getElementById('kelompokNama');
var kelutId = document.getElementById('kelutId');
var kelutNama = document.getElementById('kelutNama');
var subkelId = document.getElementById('subkelId');
var subkelNama = document.getElementById('subkelNama');
var kodeType = document.getElementById('kode_type');
var namaType = document.getElementById('namaType');
var ketType = document.getElementById('ketType');
var triter = document.getElementById('triter');
var sekunder = document.getElementById('sekunder');
var primer = document.getElementById('primer');
var kodeBarang = document.getElementById('kodeBarang');

var minim = document.getElementById('minim');
var maximum = document.getElementById('maximum');

// buttons
var btn_divisi = document.getElementById('btn_divisi');
var btn_objek = document.getElementById('btn_objek');
var btn_kelompok = document.getElementById('btn_kelompok');
var btn_kelut = document.getElementById('btn_kelut');
var btn_subkel = document.getElementById('btn_subkel');
var btn_kodeType = document.getElementById('btn_kodetype');
var btn_namaType = document.getElementById('btn_namatype');
var btn_isi = document.getElementById('btn_isi');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');


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
                            url: "/Kencana/StokBarangKencana/getDivisi",
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
                btn_objek.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function decodeHtmlEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}

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
                            url: "/Kencana/StokBarangKencana/getObjek",
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
                            url: "/Kencana/StokBarangKencana/getKelUt",
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
                            url: "/Kencana/StokBarangKencana/getKelompok",
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
                            url: "/Kencana/StokBarangKencana/getSubkel",
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
                btn_kodeType.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});


// button list Kode Type
btn_kodeType.addEventListener("click", function (e) {
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
                            url: "/Kencana/StokBarangKencana/getIdType",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdSubKelompok_Type: subkelId.value
                            }
                        },
                        columns: [
                            { data: "IdType" },
                            { data: "NamaType" },
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
                kodeType.value = decodeHtmlEntities(result.value.IdType.trim());
                namaType.value = decodeHtmlEntities(result.value.NamaType.trim());

                $.ajax({
                    type: 'GET',
                    url: '/Kencana/StokBarangKencana/getBerat',
                    data: {
                        _token: csrfToken,
                        IdType: kodeType.value,
                        IdSubKel: subkelId.value,
                    },
                    success: function (result) {
                        ketType.readOnly = false;
                        triter.readOnly = false;
                        sekunder.readOnly = false;
                        primer.readOnly = false;
                        minim.readOnly = false;
                        maximum.readOnly = false;

                        const selectedRow = result.data;

                        triter.value = formatNumber(selectedRow[0].satuan_tritier);
                        sekunder.value = formatNumber(selectedRow[0].satuan_sekunder);
                        primer.value = formatNumber(selectedRow[0].satuan_primer);
                        kodeBarang.innerText = ' Kode Barang : ' + decodeHtmlEntities(selectedRow[0].KodeBarang);
                        minim.value = parseInt(selectedRow[0].MinimumStock).toFixed(0);
                        maximum.value = parseInt(selectedRow[0].MaximumStock ?? 0).toFixed(0);


                        minim.focus();
                    },
                    error: function (xhr, status, error) {
                    },
                    complete: function () {
                        setTimeout(() => {
                            canClickProsesButton = true;
                        }, 3000);
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}

// button list Kode Type
btn_namaType.addEventListener("click", function (e) {
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
                            url: "/Kencana/StokBarangKencana/getIdType",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdSubKelompok_Type: subkelId.value
                            }
                        },
                        columns: [
                            { data: "IdType" },
                            { data: "NamaType" },
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
                kodeType.value = decodeHtmlEntities(result.value.IdType.trim());
                namaType.value = decodeHtmlEntities(result.value.NamaType.trim());

                $.ajax({
                    type: 'GET',
                    url: '/Kencana/StokBarangKencana/getBerat',
                    data: {
                        _token: csrfToken,
                        IdType: kodeType.value,
                        IdSubKel: subkelId.value,
                    },
                    success: function (result) {
                        ketType.readOnly = false;
                        triter.readOnly = false;
                        sekunder.readOnly = false;
                        primer.readOnly = false;
                        minim.readOnly = false;
                        maximum.readOnly = false;

                        const selectedRow = result.data;

                        triter.value = formatNumber(selectedRow[0].satuan_tritier);
                        sekunder.value = formatNumber(selectedRow[0].satuan_sekunder);
                        primer.value = formatNumber(selectedRow[0].satuan_primer);
                        kodeBarang.innerText = ' Kode Barang : ' + decodeHtmlEntities(selectedRow[0].KodeBarang);
                        minim.value = parseInt(selectedRow[0].MinimumStock).toFixed(0);
                        maximum.value = parseInt(selectedRow[0].MaximumStock ?? 0).toFixed(0);


                        minim.focus();
                    },
                    error: function (xhr, status, error) {
                    },
                    complete: function () {
                        setTimeout(() => {
                            canClickProsesButton = true;
                        }, 3000);
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});


var nomorButton = 0;

btn_isi.addEventListener('click', async () => {
    nomorButton = 1;
    enableInputs();
    btn_divisi.focus();
});

btn_koreksi.addEventListener('click', async () => {
    nomorButton = 2;
    enableInputs();
    btn_divisi.focus();
});

btn_batal.addEventListener('click', async () => {
    nomorButton = 0;
    disableInputs();
    clearInput();
    btn_isi.focus();
});

function enableInputs() {
    btn_batal.disabled = false;
    btn_proses.disabled = false;
    btn_divisi.disabled = false;
    btn_objek.disabled = false;
    btn_kelut.disabled = false;
    btn_kelompok.disabled = false;
    btn_subkel.disabled = false;
    btn_kodeType.disabled = false;
    btn_namaType.disabled = false;

    btn_isi.disabled = true;
    btn_koreksi.disabled = true;
}

function disableInputs() {
    btn_batal.disabled = true;
    btn_proses.disabled = true;
    btn_divisi.disabled = true;
    btn_objek.disabled = true;
    btn_kelut.disabled = true;
    btn_kelompok.disabled = true;
    btn_subkel.disabled = true;
    btn_kodeType.disabled = true;
    btn_namaType.disabled = true;

    btn_isi.disabled = false;
    btn_koreksi.disabled = false;
}

function clearInput() {
    divisiId.value = '';
    divisiNama.value = '';
    objekId.value = '';
    objekNama.value = '';
    kelompokId.value = '';
    kelompokNama.value = '';
    kelutId.value = '';
    kelutNama.value = '';
    subkelId.value = '';
    subkelNama.value = '';
    kodeType.value = '';
    namaType.value = '';
    ketType.value = '';
    triter.value = '';
    sekunder.value = '';
    primer.value = '';
    kodeBarang.innerText = '';
    minim.value = '';
    maximum.value = '';
}

btn_proses.addEventListener('click', async () => {
    if (nomorButton === 1 || nomorButton === 2) {
        if (minim.value.trim() === "") {
            Swal.fire({
                icon: 'error',
                title: 'Data minimum kosong!',
                text: 'Jumlah Minimum Stock Tidak Boleh Dikosongi',
                confirmButtonText: 'OK'
            });
            minim.focus();
            return;
        }

        // Check if maximum is empty or 0
        if (maximum.value.trim() === "" || parseFloat(maximum.value) <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Data maximum kosong!',
                text: 'Jumlah Maximum Stock Tidak Boleh Dikosongi & Harus Lebih Besar Dari Nol',
                confirmButtonText: 'OK'
            });
            maximum.focus();
            return;
        }

        // Check if maximum is less than minim
        if (parseFloat(maximum.value) < parseFloat(minim.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Data maximum terlalu kecil!',
                text: 'Jumlah Maximum Stock Harus Lebih Besar atau Sama Dengan Jumlah Minimum Stock',
                confirmButtonText: 'OK'
            });
            maximum.focus();
            return;
        }

        $.ajax({
            type: 'PUT',
            url: '/Kencana/StokBarangKencana/updateMaxStock',
            data: {
                _token: csrfToken,
                XIdType: kodeType.value,
                XIdSubKelompok: subkelId.value,
                XMinStok: minim.value,
                XMaxStok: maximum.value
            },
            success: function (response) {
                if (response.success) {
                    let messageText;
                    if (nomorButton === 1) {
                        messageText = 'Data Telah Disimpan';
                    } else if (nomorButton === 2) {
                        messageText = 'Data Telah Dikoreksi';
                    } else {
                        messageText = 'Data Telah Disimpan';
                    }

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: messageText,
                        didClose: () => {
                            clearInput();
                            disableInputs();
                            btn_isi.focus();
                        },
                    });
                }

            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });

    }
});

$('#minim').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        maximum.focus();
    }
});

$('#maximum').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        btn_proses.focus();
    }
});
