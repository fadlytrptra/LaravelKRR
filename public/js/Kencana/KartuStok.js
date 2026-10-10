var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Divisi
var divisiId = document.getElementById('divisiId');
var divisiNama = document.getElementById('divisiNama');
var btn_divisi = document.getElementById('btn_divisi');

// Objek
var objekId = document.getElementById('objekId');
var objekNama = document.getElementById('objekNama');
var btn_objek = document.getElementById('btn_objek');
var deleteObjek = document.getElementById('deleteObjek');

// Kel. Utama
var kelutId = document.getElementById('kelutId');
var kelutNama = document.getElementById('kelutNama');
var btn_kelut = document.getElementById('btn_kelut');
var deleteKelompokutama = document.getElementById('deleteKelompokutama');

// Kelompok
var kelompokId = document.getElementById('kelompokId');
var kelompokNama = document.getElementById('kelompokNama');
var btn_kelompok = document.getElementById('btn_kelompok');
var deleteKelompok = document.getElementById('deleteKelompok');

// Sub Kelompok
var subkelId = document.getElementById('subkelId');
var subkelNama = document.getElementById('subkelNama');
var btn_subkel = document.getElementById('btn_subkel');
var deleteSubKelompok = document.getElementById('deleteSubKelompok');

// Tampil Stok
var tampilStok = document.getElementById('tampilStok');
var btn_ok = document.getElementById('btn_ok');


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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "/Kencana/KartuStokKencana/getDivisi",
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
                            url: "/Kencana/KartuStokKencana/getObjek",
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
                        order: [1, "asc"],
                        ajax: {
                            url: "/Kencana/KartuStokKencana/getKelUt",
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
                            url: "/Kencana/KartuStokKencana/getKelompok",
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
                            url: "/Kencana/KartuStokKencana/getSubkel",
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


// button ok
btn_ok.addEventListener("click", function (e) {

    var table = $('#tableData').DataTable();

    if (tampilStok.checked == true) {
        if (subkelId.value) {
            $.ajax({
                type: 'GET',
                url: '/Kencana/KartuStokKencana/getDataTransaksiSubKelTrue',
                data: {
                    id_Subkel: subkelId.value,
                    id_Kelompok: kelompokId.value,
                    id_Kel_utama: kelutId.value,
                    id_objek: objekId.value,
                    id_Divisi: divisiId.value,
                    _token: csrfToken
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Data di tabel sudah diupdate.',
                        });
                    }
                    else {
                        table.clear().draw();

                        Swal.fire({
                            icon: 'info',
                            title: 'Tidak ada Data!',
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

        else if (kelompokId.value) {
            $.ajax({
                type: 'GET',
                url: '/Kencana/KartuStokKencana/getDataTransaksiKelompokTrue',
                data: {
                    id_Kelompok: kelompokId.value,
                    id_Kel_utama: kelutId.value,
                    id_objek: objekId.value,
                    id_Divisi: divisiId.value,
                    _token: csrfToken
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Data di tabel sudah diupdate.',
                        });
                    }
                    else {
                        table.clear().draw();

                        Swal.fire({
                            icon: 'info',
                            title: 'Tidak ada Data!',
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

        else if (kelutId.value) {
            $.ajax({
                type: 'GET',
                url: '/Kencana/KartuStokKencana/getDataTransaksiKelompokUtamaTrue',
                data: {
                    id_Kel_utama: kelutId.value,
                    id_objek: objekId.value,
                    id_Divisi: divisiId.value,
                    _token: csrfToken
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Data di tabel sudah diupdate.',
                        });
                    }
                    else {
                        table.clear().draw();

                        Swal.fire({
                            icon: 'info',
                            title: 'Tidak ada Data!',
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

        else if (objekId.value) {
            $.ajax({
                type: 'GET',
                url: '/Kencana/KartuStokKencana/getDataTransaksiObjekTrue',
                data: {
                    id_objek: objekId.value,
                    id_Divisi: divisiId.value,
                    _token: csrfToken
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Data di tabel sudah diupdate.',
                        });
                    }
                    else {
                        table.clear().draw();

                        Swal.fire({
                            icon: 'info',
                            title: 'Tidak ada Data!',
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

        else {
            Swal.fire({
                icon: 'error',
                title: 'Filter pencarian harus diisi dengan benar!',
            });
        }
    }

    else if (tampilStok.checked == false) {
        if (subkelId.value) {
            $.ajax({
                type: 'GET',
                url: '/Kencana/KartuStokKencana/getDataTransaksiSubKelFalse',
                data: {
                    id_Subkel: subkelId.value,
                    id_Kelompok: kelompokId.value,
                    id_Kel_utama: kelutId.value,
                    id_objek: objekId.value,
                    id_Divisi: divisiId.value,
                    _token: csrfToken
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Data di tabel sudah diupdate.',
                        });
                    }
                    else {
                        table.clear().draw();

                        Swal.fire({
                            icon: 'info',
                            title: 'Tidak ada Data!',
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

        else if (kelompokId.value) {
            $.ajax({
                type: 'GET',
                url: '/Kencana/KartuStokKencana/getDataTransaksiKelompokFalse',
                data: {
                    id_Kelompok: kelompokId.value,
                    id_Kel_utama: kelutId.value,
                    id_objek: objekId.value,
                    id_Divisi: divisiId.value,
                    _token: csrfToken
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Data di tabel sudah diupdate.',
                        });
                    }
                    else {
                        table.clear().draw();

                        Swal.fire({
                            icon: 'info',
                            title: 'Tidak ada Data!',
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

        else if (kelutId.value) {
            $.ajax({
                type: 'GET',
                url: '/Kencana/KartuStokKencana/getDataTransaksiKelompokUtamaFalse',
                data: {
                    id_Kel_utama: kelutId.value,
                    id_objek: objekId.value,
                    id_Divisi: divisiId.value,
                    _token: csrfToken
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Data di tabel sudah diupdate.',
                        });
                    }
                    else {
                        table.clear().draw();

                        Swal.fire({
                            icon: 'info',
                            title: 'Tidak ada Data!',
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

        else if (objekId.value) {
            $.ajax({
                type: 'GET',
                url: '/Kencana/KartuStokKencana/getDataTransaksiObjekFalse',
                data: {
                    id_objek: objekId.value,
                    id_Divisi: divisiId.value,
                    _token: csrfToken
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Data di tabel sudah diupdate.',
                        });
                    }
                    else {
                        table.clear().draw();

                        Swal.fire({
                            icon: 'info',
                            title: 'Tidak ada Data!',
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

        else {
            Swal.fire({
                icon: 'error',
                title: 'Filter pencarian harus diisi dengan benar!',
            });
        }
    }
});


$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        // scrollX: true,
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
        columns: [
            { title: 'IdType' },
            { title: 'Kel. Utama' },
            { title: 'Kelompok' },
            { title: 'Sub Kelompok' },
            { title: 'Kode Barang' },
            { title: 'Nama Barang' },
            { title: 'Saldo Primer' },
            { title: 'SatPrimer' },
            { title: 'Saldo Sekunder' },
            { title: 'SatSekunder' },
            { title: 'Saldo Tritier' },
            { title: 'SatTritier' },
        ],
        scrollY: '400px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0], width: '12%', className: 'fixed-width' },
        { targets: [1], width: '8%', className: 'fixed-width' },
        { targets: [2], width: '20%', className: 'fixed-width' },
        { targets: [3], width: '13%', className: 'fixed-width' },
        { targets: [4], width: '8%', className: 'fixed-width' },
        { targets: [5], width: '25%', className: 'fixed-width' },
        { targets: [6], width: '8%', className: 'fixed-width' },
        { targets: [7], width: '8%', className: 'fixed-width' },
        { targets: [8], width: '8%', className: 'fixed-width' },
        { targets: [9], width: '8%', className: 'fixed-width' },
        { targets: [10], width: '8%', className: 'fixed-width' },
        { targets: [11], width: '8%', className: 'fixed-width' }]

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
            escapeHtml(item.IdType),
            escapeHtml(item.NamaKelompokUtama),
            escapeHtml(item.NamaKelompok),
            escapeHtml(item.NamaSubKelompok),
            escapeHtml(item.KodeBarang),
            escapeHtml(item.NamaType),
            formatNumber(item.SaldoPrimer),
            escapeHtml(item.sat_primer),
            formatNumber(item.SaldoSekunder),
            escapeHtml(item.sat_sekunder),
            formatNumber(item.SaldoTritier),
            escapeHtml(item.sat_tritier),
            escapeHtml(item.IdSubkelompok),
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

$('#tableData tbody').on('dblclick', 'tr', function () {
    var table = $('#tableData').DataTable();
    var detailArray = table.row(this).data();

    var detailObject = {
        IdType: detailArray[0],
        NamaKelompokUtama: detailArray[1],
        NamaKelompok: detailArray[2],
        NamaSubKelompok: detailArray[3],
        KodeBarang: detailArray[4],
        NamaType: detailArray[5],
        SaldoPrimer: detailArray[6],
        sat_primer: detailArray[7],
        SaldoSekunder: detailArray[8],
        sat_sekunder: detailArray[9],
        SaldoTritier: detailArray[10],
        sat_tritier: detailArray[11],
        IdSubkelompok: detailArray[12],
    };

    var queryString = $.param(detailObject);

    window.open('ListDetailTransaksiKencana?' + queryString, '_blank');
});



$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

});

deleteObjek.addEventListener("click", function (e) {
    objekId.value = '';
    objekNama.value = '';
    kelompokId.value = '';
    kelompokNama.value = '';
    kelutId.value = '';
    kelutNama.value = '';
    subkelId.value = '';
    subkelNama.value = '';

    btn_objek.focus();
});

deleteKelompokutama.addEventListener("click", function (e) {
    kelompokId.value = '';
    kelompokNama.value = '';
    kelutId.value = '';
    kelutNama.value = '';
    subkelId.value = '';
    subkelNama.value = '';

    btn_kelut.focus();
});

deleteKelompok.addEventListener("click", function (e) {
    kelompokId.value = '';
    kelompokNama.value = '';
    subkelId.value = '';
    subkelNama.value = '';

    btn_kelompok.focus();
});

deleteSubKelompok.addEventListener("click", function (e) {
    subkelId.value = '';
    subkelNama.value = '';

    btn_subkel.focus();
});
