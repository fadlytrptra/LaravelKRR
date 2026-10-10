var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisi = document.getElementById('divisi');
var namaDivisi = document.getElementById('namaDivisi');
var btnDivisi = document.getElementById('btnDivisi');

var objek = document.getElementById('objek');
var namaObjek = document.getElementById('namaObjek');
var btnObjek = document.getElementById('btnObjek');

var kelompokUtama = document.getElementById('kelompokUtama');
var namaKelompokUtama = document.getElementById('namaKelompokUtama');
var btnKelompokUtama = document.getElementById('btnKelompokUtama');

var kelompok = document.getElementById('kelompok');
var namaKelompok = document.getElementById('namaKelompok');
var btnKelompok = document.getElementById('btnKelompok');

var subKelompok = document.getElementById('subKelompok');
var namaSubKelompok = document.getElementById('namaSubKelompok');
var btnSubKelompok = document.getElementById('btnSubKelompok');

var kodePerkiraan = document.getElementById('kodePerkiraan');
var namaKodePerkiraan = document.getElementById('namaKodePerkiraan');
var btnKodePerkiraan = document.getElementById('btnKodePerkiraan');

var btnIsi = document.getElementById('btnIsi');
var btnKoreksi = document.getElementById('btnKoreksi');
var btnHapus = document.getElementById('btnHapus');
var btnProses = document.getElementById('btnProses');
var btnBatal = document.getElementById('btnBatal');

document.addEventListener('DOMContentLoaded', function () {

    btnHapus.disabled = true;
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

    function decodeHtmlEntities(str) {
        let textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
    }

    //#region button divisi
    btnDivisi.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Divisi",
                html: `<table id="table_divisi" class="display" style="width:100%">
                        <thead>
                            <tr>
                                <th>Id Divisi</th>
                                <th>Nama Divisi</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>`,
                width: '40%',
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                cancelButtonText: 'Close',
                returnFocus: false,
                preConfirm: () => {
                    const table = $("#table_divisi").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_divisi").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: '400px',
                            scrollCollapse: true,
                            order: [[1, "asc"]],
                            ajax: {
                                url: "/Kencana/MaintenanceObjekKencana/getUserDivisi",
                                dataType: "json",
                                type: "GET",
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                },
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "IdDivisi",
                                },
                                {
                                    data: "NamaDivisi",
                                }
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: '100px',
                                }
                            ]
                        });

                        // Use the correct ID selector for the table body
                        $("#table_divisi tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                            scrollRowIntoView(this);
                        });

                        const searchInput = $('#table_divisi_filter input');
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_divisi'));

                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    namaDivisi.value = selectedRow.NamaDivisi ? decodeHtmlEntities(selectedRow.NamaDivisi.trim()) : '';
                    divisi.value = selectedRow.IdDivisi ? decodeHtmlEntities(selectedRow.IdDivisi.trim()) : '';
                    btnObjek.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    //#endregion

    //#region Button Objek
    //#region Button Objek
    btnObjek.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Objek",
                html: `<table id="table_Objek" class="display" style="width:100%">
                        <thead>
                            <tr>
                                <th>Id Objek</th>
                                <th>Nama Objek</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>`,
                width: '40%',
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                returnFocus: false,
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const table = $("#table_Objek").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    const table = $("#table_Objek").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [[1, "asc"]],
                        ajax: {
                            url: "/Kencana/MaintenanceObjekKencana/getObjek",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                idDivisi: divisi.value
                            },
                            error: function (xhr, error, thrown) {
                                console.error("Error fetching data: ", thrown);
                            }
                        },
                        columns: [
                            { data: "IdObjek" },
                            { data: "NamaObjek" }
                        ],
                        columnDefs: [
                            { targets: 0, width: '100px' }
                        ]
                    });

                    // Handle row click event
                    $("#table_Objek tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this); // Ensure the clicked row scrolls into view
                    });

                    // Set focus to search input after the table has loaded
                    const searchInput = $('#table_Objek_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    // Reset current index and bind keydown events for navigation
                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_Objek'));
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    namaObjek.value = selectedRow.NamaObjek ? decodeHtmlEntities(selectedRow.NamaObjek.trim()) : '';
                    objek.value = selectedRow.IdObjek ? decodeHtmlEntities(selectedRow.IdObjek.trim()) : '';

                    btnKelompokUtama.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
    //#endregion

    //#endregion

    //#region Button Kelompok Utama
    btnKelompokUtama.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Kelompok Utama",
                html: `<table id="table_kelUtama" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Id Kelompok Utama</th>
                                    <th>Nama Kelompok Utama</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                width: '40%',
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                returnFocus: false,
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const table = $("#table_kelUtama").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    // Initialize DataTable without document.ready
                    const table = $("#table_kelUtama").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [[1, "asc"]],
                        ajax: {
                            url: "/Kencana/MaintenanceObjekKencana/getKelUtama",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                idObjek: objek.value
                            },
                            error: function (xhr, error, thrown) {
                                console.error("Error fetching data: ", thrown);
                            }
                        },
                        columns: [
                            { data: "IdKelompokUtama" },
                            { data: "NamaKelompokUtama" }
                        ],
                        columnDefs: [
                            { targets: 0, width: '100px' }
                        ]
                    });

                    // Fix the tbody selector for row selection
                    $("#table_kelUtama tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this); // Optional: Scroll the clicked row into view
                    });

                    // Focus on search input after DataTable is loaded
                    const searchInput = $('#table_kelUtama_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    // Handle keyboard navigation for the table
                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_kelUtama'));
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    namaKelompokUtama.value = selectedRow.NamaKelompokUtama ? decodeHtmlEntities(selectedRow.NamaKelompokUtama.trim()) : '';
                    kelompokUtama.value = selectedRow.IdKelompokUtama ? decodeHtmlEntities(selectedRow.IdKelompokUtama.trim()) : '';

                    btnKelompok.focus(); // Focus on the next button after selection
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    //#endregion

    //#region Button Kelompok
    btnKelompok.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Kelompok",
                html: `<table id="table_kel" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Id Kelompok</th>
                                    <th>Nama Kelompok</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                width: '40%',
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                returnFocus: false,
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const table = $("#table_kel").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    const table = $("#table_kel").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [[1, "asc"]],
                        ajax: {
                            url: "/Kencana/MaintenanceObjekKencana/getKel",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                idKelUtama: kelompokUtama.value
                            },
                            error: function (xhr, error, thrown) {
                                console.error("Error fetching data: ", thrown);
                            }
                        },
                        columns: [
                            { data: "idkelompok" },
                            { data: "namakelompok" }
                        ],
                        columnDefs: [
                            { targets: 0, width: '100px' }
                        ]
                    });

                    // Event listener for row selection
                    $('#table_kel tbody').on('click', 'tr', function () {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                        scrollRowIntoView(this);
                    });

                    // Focusing on the search field
                    const searchInput = $('#table_kel_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    // Keydown event handling
                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_kel'));
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    namaKelompok.value = selectedRow.namakelompok ? decodeHtmlEntities(selectedRow.namakelompok.trim()) : '';
                    kelompok.value = selectedRow.idkelompok ? decodeHtmlEntities(selectedRow.idkelompok.trim()) : '';

                    btnSubKelompok.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    //#endregion

    //#region Button subKelompok
    btnSubKelompok.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Sub Kelompok",
                html: `<table id="table_subKel" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Id Sub Kelompok</th>
                                    <th>Nama Sub Kelompok</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                width: '40%',
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                returnFocus: false,
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const table = $("#table_subKel").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    const table = $("#table_subKel").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [[1, "asc"]],
                        ajax: {
                            url: "/Kencana/MaintenanceObjekKencana/getSubKel",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                idKel: kelompok.value
                            },
                            error: function (xhr, error, thrown) {
                                console.error("Error fetching data: ", thrown);
                            }
                        },
                        columns: [
                            { data: "IdSubkelompok" },
                            { data: "NamaSubKelompok" }
                        ],
                        columnDefs: [
                            { targets: 0, width: '100px' }
                        ]
                    });

                    // Event listener for row selection
                    $('#table_subKel tbody').on('click', 'tr', function () {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                        scrollRowIntoView(this);
                    });

                    // Focusing on the search field
                    const searchInput = $('#table_subKel_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_subKel'));
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    namaSubKelompok.value = selectedRow.NamaSubKelompok ? decodeHtmlEntities(selectedRow.NamaSubKelompok.trim()) : '';
                    subKelompok.value = selectedRow.IdSubkelompok ? decodeHtmlEntities(selectedRow.IdSubkelompok.trim()) : '';

                    // First AJAX call to get Kode Perkiraan
                    $.ajax({
                        url: "/Kencana/MaintenanceObjekKencana/getIdPerkiraan",
                        dataType: "json",
                        type: "GET",
                        data: { _token: csrfToken, idSubKel: subKelompok.value },
                        success: function (result) {
                            let selectedRow = result.data;
                            kodePerkiraan.value = selectedRow[0].KodePerkiraan_Subkelompok ?? "";

                            // Second AJAX call to get No Kode Perkiraan
                            $.ajax({
                                url: "/Kencana/MaintenanceObjekKencana/getNoKodePerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: { _token: csrfToken, idPerkiraan: kodePerkiraan.value },
                                success: function (result) {
                                    let selectedRow = result.data;
                                    namaKodePerkiraan.value = selectedRow[0].Keterangan ?? "";
                                },
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                }
                            });
                        },
                        error: function (xhr, error, thrown) {
                            console.error("Error fetching data: ", thrown);
                        }
                    });

                    btnKodePerkiraan.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    //#endregion

    //#region Perkiraan
    btnKodePerkiraan.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Kode Perkiraan",
                html: `<table id="table_Perkiraan" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Id Kode Perkiraan</th>
                                    <th>Nama Kode Perkiraan</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                width: '40%',
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                returnFocus: false,
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const table = $("#table_Perkiraan").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_Perkiraan").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: '400px',
                            scrollCollapse: true,
                            order: [[1, "asc"]],
                            ajax: {
                                url: "/Kencana/MaintenanceObjekKencana/getPerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                }
                            },
                            columns: [
                                { data: "NoKodePerkiraan" },
                                { data: "Keterangan" }
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: '100px',
                                }
                            ]
                        });

                        // Event listener for row selection
                        $("#table_Perkiraan tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                            scrollRowIntoView(this);  // If you have scroll functionality defined for the row
                        });

                        // Autofocus on search input if it exists
                        const searchInput = $('#table_Perkiraan_filter input');
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        // Initialize key event handling
                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_Perkiraan'));
                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    kodePerkiraan.value = selectedRow.NoKodePerkiraan ? decodeHtmlEntities(selectedRow.NoKodePerkiraan.trim()) : '';
                    namaKodePerkiraan.value = selectedRow.Keterangan ? decodeHtmlEntities(selectedRow.Keterangan.trim()) : '';
                    btnProses.focus();  // Focus on the 'Proses' button after selection
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    //#endregion

    function enableInputs() {
        btnDivisi.disabled = false;
        btnSubKelompok.disabled = false;
        btnObjek.disabled = false;
        btnKelompok.disabled = false;
        btnKodePerkiraan.disabled = false;
        btnKelompokUtama.disabled = false;
        btnProses.disabled = false;
        btnBatal.disabled = false;

        namaDivisi.removeAttribute('readonly');
        namaSubKelompok.removeAttribute('readonly');
        namaKelompok.removeAttribute('readonly');
        namaObjek.removeAttribute('readonly');
        namaKelompokUtama.removeAttribute('readonly');
        namaKodePerkiraan.removeAttribute('readonly');

        btnIsi.disabled = true;
        btnKoreksi.disabled = true;
        btnHapus.disabled = true;
    }

    function disableInputs() {
        btnDivisi.disabled = true;
        btnSubKelompok.disabled = true;
        btnObjek.disabled = true;
        btnKelompok.disabled = true;
        btnKodePerkiraan.disabled = true;
        btnKelompokUtama.disabled = true;
        btnProses.disabled = true;
        btnBatal.disabled = true;

        namaDivisi.setAttribute('readonly', true);
        namaSubKelompok.setAttribute('readonly', true);
        namaKelompok.setAttribute('readonly', true);
        namaObjek.setAttribute('readonly', true);
        namaKelompokUtama.setAttribute('readonly', true);
        namaKodePerkiraan.setAttribute('readonly', true);

        btnIsi.disabled = false;
        btnKoreksi.disabled = false;
        btnHapus.disabled = true;
    }

    function clearInput() {
        divisi.value = '';
        namaDivisi.value = '';
        objek.value = '';
        namaObjek.value = '';
        kelompokUtama.value = '';
        namaKelompokUtama.value = '';
        kelompok.value = '';
        namaKelompok.value = '';
        subKelompok.value = '';
        namaSubKelompok.value = '';
        kodePerkiraan.value = '';
        namaKodePerkiraan.value = '';
    }

    var nomorButton = 0;
    //#region button isi
    btnIsi.addEventListener('click', async () => {
        nomorButton = 1;
        enableInputs();
        btnProses.disabled = false;
        btnDivisi.focus();
    });
    //#endregion

    //#region button koreksi
    btnKoreksi.addEventListener('click', async () => {
        nomorButton = 2;
        enableInputs();
        btnProses.disabled = false;
        btnDivisi.focus();
    });
    //#endregion

    //#region button Hapus
    btnHapus.addEventListener('click', async () => {
        nomorButton = 3;
        enableInputs();
        btnProses.disabled = false;
        btnDivisi.focus();
    });
    //#endregion

    //#region button Batal
    btnBatal.addEventListener('click', async () => {
        nomorButton = 0;
        disableInputs();
        clearInput();
        btnProses.disabled = false;
        btnIsi.focus();
    });
    //#endregion


    //#region proses button
    btnProses.addEventListener('click', async () => {
        btnProses.disabled = true;
        const flag = 0;

        if (!divisi.value) {
            Swal.fire({
                icon: 'error',
                title: 'Divisi Kosong!',
                text: 'Data Tidak Dapat Di Proses!!...',
            });
            flag = 1;
            return;
        }

        //#region ISI
        if (nomorButton == 1) {
            if (namaObjek.value && namaKelompokUtama.value && namaKelompok.value && namaSubKelompok.value && namaKodePerkiraan.value) {
                $.ajax({
                    type: 'GET',
                    url: '/Kencana/MaintenanceObjekKencana/cekPerkiraan',
                    data: {
                        _token: csrfToken,
                        xketerangan: namaKodePerkiraan.value
                    },
                    success: function (result) {
                        if (!result[0]) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Nama Perkiraan Tidak Ada!',
                                text: 'Data Tidak Dapat Di Proses!!...',
                            });
                            flag = 1;
                            return;
                        }

                        else {
                            if (flag !== 1) {
                                //#region ISI objek
                                if (objek.value === '') {
                                    $.ajax({
                                        type: 'GET',
                                        url: '/Kencana/MaintenanceObjekKencana/cekObjek',
                                        data: {
                                            _token: csrfToken,
                                            IdDivisi: divisi.value,
                                            objek: namaObjek.value
                                        },
                                        success: function (result) {
                                            if (parseInt(result[0].ada) !== 0) {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Objek Sudah Ada!',
                                                    text: 'Data Tidak Dapat Di Proses!!...',
                                                });
                                                return;
                                            }
                                            else {
                                                $.ajax({
                                                    type: 'GET',
                                                    url: '/Kencana/MaintenanceObjekKencana/ambilCounter',
                                                    data: {
                                                        _token: csrfToken,
                                                    },
                                                    success: function (result) {
                                                        objek.value = result[0].IdObjek;

                                                        $.ajax({
                                                            type: 'GET',
                                                            url: '/Kencana/MaintenanceObjekKencana/updateObjekCounter',
                                                            data: {
                                                                _token: csrfToken,
                                                                XIdObjek: objek.value
                                                            },
                                                            success: function (result) {
                                                            },
                                                            error: function (xhr, status, error) {
                                                                console.error(error);
                                                            },
                                                            complete: function () {
                                                                setTimeout(() => {
                                                                    canClickProsesButton = true;
                                                                }, 3000);
                                                            }
                                                        });

                                                        $.ajax({
                                                            type: 'GET',
                                                            url: '/Kencana/MaintenanceObjekKencana/insertObjek',
                                                            data: {
                                                                _token: csrfToken,
                                                                XIdObjek: objek.value,
                                                                XNamaObjek: namaObjek.value,
                                                                XIdDivisi_Objek: divisi.value
                                                            },
                                                            success: function (result) {
                                                                if (result.success) {
                                                                    kelUtamaISI();
                                                                }
                                                            },
                                                            error: function (xhr, status, error) {
                                                                console.error(error);
                                                            },
                                                            complete: function () {
                                                                setTimeout(() => {
                                                                    canClickProsesButton = true;
                                                                }, 3000);
                                                            }
                                                        });
                                                    },
                                                    error: function (xhr, status, error) {
                                                        console.error(error);
                                                    },
                                                    complete: function () {
                                                        setTimeout(() => {
                                                            canClickProsesButton = true;
                                                        }, 3000);
                                                    }
                                                });
                                            }
                                        },
                                        error: function (xhr, status, error) {
                                            console.error(error);
                                        },
                                        complete: function () {
                                            setTimeout(() => {
                                                canClickProsesButton = true;
                                            }, 3000);
                                        }
                                    });
                                    return;
                                }

                                else if (kelompokUtama.value === '' && objek.value) {
                                    kelUtamaISI();
                                    return;
                                }

                                else if (kelompok.value === '' && kelompokUtama.value) {
                                    kelompokISI();
                                    return;
                                }

                                else if (subKelompok.value === '' && kelompok.value) {
                                    subKelISI();
                                    return;
                                }

                                else {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Sukses ISI',
                                        text: 'Data berhasil disimpan.',
                                    });
                                    return;
                                }

                                //#region ISI kel utama
                                function kelUtamaISI() {
                                    if (kelompokUtama.value === '' && objek.value) {
                                        $.ajax({
                                            type: 'GET',
                                            url: '/Kencana/MaintenanceObjekKencana/cekKelUtama',
                                            data: {
                                                _token: csrfToken,
                                                IdObjek: objek.value,
                                                kelut: namaKelompokUtama.value
                                            },
                                            success: function (result) {
                                                if (parseInt(result[0].ada) !== 0) {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Kelompok Utama Sudah Ada!',
                                                        text: 'Data Tidak Dapat Di Proses!!...',
                                                    });
                                                    return;
                                                }
                                                else {
                                                    $.ajax({
                                                        type: 'GET',
                                                        url: '/Kencana/MaintenanceObjekKencana/ambilCounter',
                                                        data: {
                                                            _token: csrfToken,
                                                        },
                                                        success: function (result) {
                                                            kelompokUtama.value = result[0].IdKelUtama;

                                                            $.ajax({
                                                                type: 'GET',
                                                                url: '/Kencana/MaintenanceObjekKencana/updateKelUtamaCounter',
                                                                data: {
                                                                    _token: csrfToken,
                                                                    XIdKelompokUtama: kelompokUtama.value
                                                                },
                                                                success: function (result) {
                                                                },
                                                                error: function (xhr, status, error) {
                                                                    console.error(error);
                                                                },
                                                                complete: function () {
                                                                    setTimeout(() => {
                                                                        canClickProsesButton = true;
                                                                    }, 3000);
                                                                }
                                                            });

                                                            $.ajax({
                                                                type: 'GET',
                                                                url: '/Kencana/MaintenanceObjekKencana/insertKelUtama',
                                                                data: {
                                                                    _token: csrfToken,
                                                                    XIdKelompokUtama: kelompokUtama.value,
                                                                    XNamaKelompokUtama: namaKelompokUtama.value,
                                                                    XIdObjek_KelompokUtama: objek.value
                                                                },
                                                                success: function (result) {
                                                                    if (result.success) {
                                                                        kelompokISI();
                                                                    }
                                                                },
                                                                error: function (xhr, status, error) {
                                                                    console.error(error);
                                                                },
                                                                complete: function () {
                                                                    setTimeout(() => {
                                                                        canClickProsesButton = true;
                                                                    }, 3000);
                                                                }
                                                            });
                                                        },
                                                        error: function (xhr, status, error) {
                                                            console.error(error);
                                                        },
                                                        complete: function () {
                                                            setTimeout(() => {
                                                                canClickProsesButton = true;
                                                            }, 3000);
                                                        }
                                                    });
                                                }
                                            },
                                            error: function (xhr, status, error) {
                                                console.error(error);
                                            },
                                            complete: function () {
                                                setTimeout(() => {
                                                    canClickProsesButton = true;
                                                }, 3000);
                                            }
                                        });
                                    }
                                }

                                //#region ISI kelompok
                                function kelompokISI() {
                                    if (kelompok.value === '' && kelompokUtama.value) {
                                        $.ajax({
                                            type: 'GET',
                                            url: '/Kencana/MaintenanceObjekKencana/cekKel',
                                            data: {
                                                _token: csrfToken,
                                                IdKelut: kelompokUtama.value,
                                                kelompok: namaKelompok.value
                                            },
                                            success: function (result) {
                                                if (parseInt(result[0].ada) !== 0) {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Kelompok Sudah Ada!',
                                                        text: 'Data Tidak Dapat Di Proses!!...',
                                                    });
                                                    return;
                                                }
                                                else {
                                                    $.ajax({
                                                        type: 'GET',
                                                        url: '/Kencana/MaintenanceObjekKencana/ambilCounter',
                                                        data: {
                                                            _token: csrfToken,
                                                        },
                                                        success: function (result) {
                                                            kelompok.value = result[0].IdKelompok;

                                                            $.ajax({
                                                                type: 'GET',
                                                                url: '/Kencana/MaintenanceObjekKencana/updateKelCounter',
                                                                data: {
                                                                    _token: csrfToken,
                                                                    XIdKelompok: kelompok.value
                                                                },
                                                                success: function (result) {
                                                                },
                                                                error: function (xhr, status, error) {
                                                                    console.error(error);
                                                                },
                                                                complete: function () {
                                                                    setTimeout(() => {
                                                                        canClickProsesButton = true;
                                                                    }, 3000);
                                                                }
                                                            });

                                                            $.ajax({
                                                                type: 'GET',
                                                                url: '/Kencana/MaintenanceObjekKencana/insertKel',
                                                                data: {
                                                                    _token: csrfToken,
                                                                    XIdKelompok: kelompok.value,
                                                                    XNamaKelompok: namaKelompok.value,
                                                                    XIdKelompokUtama_Kelompok: kelompokUtama.value
                                                                },
                                                                success: function (result) {
                                                                    if (result.success) {
                                                                        subKelISI();
                                                                    }
                                                                },
                                                                error: function (xhr, status, error) {
                                                                    console.error(error);
                                                                },
                                                                complete: function () {
                                                                    setTimeout(() => {
                                                                        canClickProsesButton = true;
                                                                    }, 3000);
                                                                }
                                                            });
                                                        },
                                                        error: function (xhr, status, error) {
                                                            console.error(error);
                                                        },
                                                        complete: function () {
                                                            setTimeout(() => {
                                                                canClickProsesButton = true;
                                                            }, 3000);
                                                        }
                                                    });
                                                }
                                            },
                                            error: function (xhr, status, error) {
                                                console.error(error);
                                            },
                                            complete: function () {
                                                setTimeout(() => {
                                                    canClickProsesButton = true;
                                                }, 3000);
                                            }
                                        });
                                    }
                                }

                                //#region ISI Sub kelompok
                                function subKelISI() {
                                    if (subKelompok.value === '' && kelompok.value) {
                                        $.ajax({
                                            type: 'GET',
                                            url: '/Kencana/MaintenanceObjekKencana/cekSubKel',
                                            data: {
                                                _token: csrfToken,
                                                IdKelp: kelompok.value,
                                                subkel: namaSubKelompok.value
                                            },
                                            success: function (result) {
                                                if (parseInt(result[0].ada) !== 0) {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Sub Kelompok Sudah Ada!',
                                                        text: 'Data Tidak Dapat Di Proses!!...',
                                                    });
                                                    return;
                                                }
                                                else {
                                                    $.ajax({
                                                        type: 'GET',
                                                        url: '/Kencana/MaintenanceObjekKencana/ambilCounter',
                                                        data: {
                                                            _token: csrfToken,
                                                        },
                                                        success: function (result) {
                                                            subKelompok.value = result[0].IdSubKelompok;

                                                            $.ajax({
                                                                type: 'GET',
                                                                url: '/Kencana/MaintenanceObjekKencana/updateSubKelCounter',
                                                                data: {
                                                                    _token: csrfToken,
                                                                    XIdSubKelompok: subKelompok.value
                                                                },
                                                                success: function (result) {
                                                                },
                                                                error: function (xhr, status, error) {
                                                                    console.error(error);
                                                                },
                                                                complete: function () {
                                                                    setTimeout(() => {
                                                                        canClickProsesButton = true;
                                                                    }, 3000);
                                                                }
                                                            });

                                                            $.ajax({
                                                                type: 'GET',
                                                                url: '/Kencana/MaintenanceObjekKencana/insertSubKel',
                                                                data: {
                                                                    _token: csrfToken,
                                                                    XIdSubKelompok: subKelompok.value,
                                                                    XNamaSubKelompok: namaSubKelompok.value,
                                                                    XIdKelompokUtama_Kelompok: kelompok.value,
                                                                    XKodePerkiraan: kodePerkiraan.value
                                                                },
                                                                success: function (result) {
                                                                    if (result.success) {
                                                                        Swal.fire({
                                                                            icon: 'success',
                                                                            title: 'Sukses ISI',
                                                                            text: result.success,
                                                                        });
                                                                    }
                                                                },
                                                                error: function (xhr, status, error) {
                                                                    console.error(error);
                                                                },
                                                                complete: function () {
                                                                    setTimeout(() => {
                                                                        canClickProsesButton = true;
                                                                    }, 3000);
                                                                }
                                                            });
                                                        },
                                                        error: function (xhr, status, error) {
                                                            console.error(error);
                                                        },
                                                        complete: function () {
                                                            setTimeout(() => {
                                                                canClickProsesButton = true;
                                                            }, 3000);
                                                        }
                                                    });
                                                }
                                            },
                                            error: function (xhr, status, error) {
                                                console.error(error);
                                            },
                                            complete: function () {
                                                setTimeout(() => {
                                                    canClickProsesButton = true;
                                                }, 3000);
                                            }
                                        });
                                    }
                                }
                            }

                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    },
                    complete: function () {
                        setTimeout(() => {
                            canClickProsesButton = true;
                        }, 3000);
                    }
                });
            }
            if (namaObjek.value === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Isi Nama Objek!',
                    text: 'Data tidak bisa diproses.',
                    didClose: () => {
                        btnObjek.focus();
                    }
                });
            }
            else if (namaKelompokUtama.value === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Isi Nama Kelompok Utama!',
                    text: 'Data tidak bisa diproses.',
                    didClose: () => {
                        btnKelompokUtama.focus();
                    }
                });
            }
            else if (namaKelompok.value === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Isi Nama Kelompok!',
                    text: 'Data tidak bisa diproses.',
                    didClose: () => {
                        btnKelompok.focus();
                    }
                });
            }
            else if (namaSubKelompok.value === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Isi Nama Sub Kelompok!',
                    text: 'Data tidak bisa diproses.',
                    didClose: () => {
                        btnSubKelompok.focus();
                    }
                });
            }
            else if (namaKodePerkiraan.value === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Isi Nama Kode Perkiraan!',
                    text: 'Data tidak bisa diproses.',
                    didClose: () => {
                        btnKodePerkiraan.focus();
                    }
                });
            }

        }

        //#region KOREKSI
        else if (nomorButton == 2) {
            if (flag !== 1) {

                //#region KOREKSI OBJEK
                if (objek.value && namaObjek.value) {
                    $.ajax({
                        type: 'GET',
                        url: '/Kencana/MaintenanceObjekKencana/updateObjek',
                        data: {
                            _token: csrfToken,
                            XIdObjek: objek.value,
                            XNamaObjek: namaObjek.value,
                            XIdDivisi_Objek: divisi.value,
                        },
                        success: function (result) {
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        },
                        complete: function () {
                            setTimeout(() => {
                                canClickProsesButton = true;
                            }, 3000);
                        }
                    });
                }

                //#region KOREKSI kelUtama
                if (kelompokUtama.value && kelompokUtama.value) {
                    $.ajax({
                        type: 'GET',
                        url: '/Kencana/MaintenanceObjekKencana/updateKelUtama',
                        data: {
                            _token: csrfToken,
                            XIdKelompokUtama: kelompokUtama.value,
                            XNamaKelompokUtama: namaKelompokUtama.value,
                            XIdObjek_KelompokUtama: objek.value,
                        },
                        success: function (result) {
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        },
                        complete: function () {
                            setTimeout(() => {
                                canClickProsesButton = true;
                            }, 3000);
                        }
                    });
                }

                //#region KOREKSI kelompok
                if (kelompok.value && namaKelompok.value) {
                    $.ajax({
                        type: 'GET',
                        url: '/Kencana/MaintenanceObjekKencana/updateKel',
                        data: {
                            _token: csrfToken,
                            XIdKelompok: kelompok.value,
                            XNamaKelompok: namaKelompok.value,
                            XIdKelompokUtama_Kelompok: kelompokUtama.value,
                        },
                        success: function (result) {
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        },
                        complete: function () {
                            setTimeout(() => {
                                canClickProsesButton = true;
                            }, 3000);
                        }
                    });
                }

                //#region KOREKSI subkelompok
                if (subKelompok.value && namaSubKelompok.value) {
                    $.ajax({
                        type: 'GET',
                        url: '/Kencana/MaintenanceObjekKencana/updateSubKel',
                        data: {
                            _token: csrfToken,
                            XIdSubKelompok: subKelompok.value,
                            XNamaSubKelompok: namaSubKelompok.value,
                            XIdKelompok_SubKelompok: kelompok.value,
                            XKodePerkiraan: kodePerkiraan.value,
                        },
                        success: function (result) {
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        },
                        complete: function () {
                            setTimeout(() => {
                                canClickProsesButton = true;
                            }, 3000);
                        }
                    });
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses Koreksi',
                    text: 'Berhasil Koreksi Data.',
                });
            }
        }

        //#region HAPUS
        else if (nomorButton === 3) {

            //#region HAPUS lengkap
            if (namaSubKelompok.value && namaKelompok.value && namaKelompokUtama.value && namaObjek.value) {
                Swal.fire({
                    icon: 'question',
                    title: 'Hapus Subkelompok ??..',
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak',
                    returnFocus: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            type: 'GET',
                            url: '/Kencana/MaintenanceObjekKencana/deleteSubKel',
                            data: {
                                _token: csrfToken,
                                XIdSubKelompok: subKelompok.value,
                                XIdKelompok_SubKelompok: kelompok.value,
                            },
                            success: function (result) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Sukses Hapus',
                                    text: result.success,
                                }).then(() => {
                                    Swal.fire({
                                        icon: 'question',
                                        title: 'Hapus Kelompok ??..',
                                        showCancelButton: true,
                                        confirmButtonText: 'Ya',
                                        cancelButtonText: 'Tidak',
                                        returnFocus: false
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            console.log('hapus');
                                            $.ajax({
                                                type: 'GET',
                                                url: '/Kencana/MaintenanceObjekKencana/deleteKel',
                                                data: {
                                                    _token: csrfToken,
                                                    XIdKelompok: kelompok.value,
                                                    XIdKelompokUtama_Kelompok: kelompokUtama.value,
                                                },
                                                success: function (result) {
                                                    Swal.fire({
                                                        icon: 'success',
                                                        title: 'Sukses Hapus',
                                                        text: result.success,
                                                    }).then(() => {
                                                        Swal.fire({
                                                            icon: 'question',
                                                            title: 'Hapus Kelompok Utama ??..',
                                                            showCancelButton: true,
                                                            confirmButtonText: 'Ya',
                                                            cancelButtonText: 'Tidak',
                                                            returnFocus: false
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                $.ajax({
                                                                    type: 'GET',
                                                                    url: '/Kencana/MaintenanceObjekKencana/deleteKelUtama',
                                                                    data: {
                                                                        _token: csrfToken,
                                                                        XIdKelompokUtama: kelompokUtama.value,
                                                                        XIdObjek_KelompokUtama: objek.value,
                                                                    },
                                                                    success: function (result) {
                                                                        Swal.fire({
                                                                            icon: 'success',
                                                                            title: 'Sukses Hapus',
                                                                            text: result.success,
                                                                        }).then(() => {
                                                                            Swal.fire({
                                                                                icon: 'question',
                                                                                title: 'Hapus Objek ??..',
                                                                                showCancelButton: true,
                                                                                confirmButtonText: 'Ya',
                                                                                cancelButtonText: 'Tidak',
                                                                                returnFocus: false
                                                                            }).then((result) => {
                                                                                if (result.isConfirmed) {
                                                                                    $.ajax({
                                                                                        type: 'GET',
                                                                                        url: '/Kencana/MaintenanceObjekKencana/deleteObjek',
                                                                                        data: {
                                                                                            _token: csrfToken,
                                                                                            XIdObjek: objek.value,
                                                                                            XIdDivisi_Objek: divisi.value,
                                                                                        },
                                                                                        success: function (result) {
                                                                                            Swal.fire({
                                                                                                icon: 'success',
                                                                                                title: 'Sukses Hapus',
                                                                                                text: result.success,
                                                                                            }).then(() => {
                                                                                                clearInput();
                                                                                                disableInputs();
                                                                                            });
                                                                                        },
                                                                                        error: function (xhr, status, error) {
                                                                                            Swal.fire({
                                                                                                icon: 'error',
                                                                                                title: 'Hubungi EDP!',
                                                                                                text: xhr.responseJSON.error ?? 'Data gagal dihapus'
                                                                                            });
                                                                                            clearInput();
                                                                                            disableInputs();
                                                                                        },
                                                                                        complete: function () {
                                                                                            setTimeout(() => {
                                                                                                canClickProsesButton = true;
                                                                                            }, 3000);
                                                                                        }
                                                                                    });
                                                                                } else {
                                                                                    clearInput();
                                                                                    disableInputs();
                                                                                }
                                                                            });
                                                                        });
                                                                    },
                                                                    error: function (xhr, status, error) {
                                                                        Swal.fire({
                                                                            icon: 'error',
                                                                            title: 'Hubungi EDP!',
                                                                            text: xhr.responseJSON.error ?? 'Data gagal dihapus'
                                                                        });
                                                                        clearInput();
                                                                        disableInputs();
                                                                    },
                                                                    complete: function () {
                                                                        setTimeout(() => {
                                                                            canClickProsesButton = true;
                                                                        }, 3000);
                                                                    }
                                                                });
                                                            } else {
                                                                clearInput();
                                                                disableInputs();
                                                            }
                                                        });
                                                    });
                                                },
                                                error: function (xhr, status, error) {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Hubungi EDP!',
                                                        text: xhr.responseJSON.error ?? 'Data gagal dihapus'
                                                    });
                                                    clearInput();
                                                    disableInputs();
                                                },
                                                complete: function () {
                                                    setTimeout(() => {
                                                        canClickProsesButton = true;
                                                    }, 3000);
                                                }
                                            });
                                        } else {
                                            clearInput();
                                            disableInputs();
                                        }
                                    });
                                });
                            },
                            error: function (xhr, status, error) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Hubungi EDP!',
                                    text: xhr.responseJSON.error ?? 'Data gagal dihapus'
                                });
                                clearInput();
                                disableInputs();
                            },
                            complete: function () {
                                setTimeout(() => {
                                    canClickProsesButton = true;
                                }, 3000);
                            }
                        });
                    } else {
                        clearInput();
                        disableInputs();
                    }
                });


            }

            //#region HAPUS kosong 1
            else if (namaSubKelompok.value === '' && namaKelompok.value && namaKelompokUtama.value && namaObjek.value) {
                $.ajax({
                    type: 'GET',
                    url: '/Kencana/MaintenanceObjekKencana/cekHapusSubKelompok',
                    data: {
                        _token: csrfToken,
                        XIdkelompok_subkelompok: kelompok.value,
                    },
                    success: function (result) {
                        if (result) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Isi Nama Sub Kelompok!',
                                text: 'Data Tidak Dapat Di Proses!!...',
                            });
                            return;
                        }
                        else {
                            Swal.fire({
                                icon: 'question',
                                title: 'Hapus Kelompok ??..',
                                showCancelButton: true,
                                confirmButtonText: 'Ya',
                                cancelButtonText: 'Tidak',
                                returnFocus: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    $.ajax({
                                        type: 'GET',
                                        url: '/Kencana/MaintenanceObjekKencana/deleteKel',
                                        data: {
                                            _token: csrfToken,
                                            XIdKelompok: kelompok.value,
                                            XIdKelompokUtama_Kelompok: kelompokUtama.value,
                                        },
                                        success: function (result) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Sukses Hapus',
                                                text: result.success,
                                            }).then(() => {
                                                Swal.fire({
                                                    icon: 'question',
                                                    title: 'Hapus Kelompok Utama ??..',
                                                    showCancelButton: true,
                                                    confirmButtonText: 'Ya',
                                                    cancelButtonText: 'Tidak',
                                                    returnFocus: false
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        $.ajax({
                                                            type: 'GET',
                                                            url: '/Kencana/MaintenanceObjekKencana/deleteKelUtama',
                                                            data: {
                                                                _token: csrfToken,
                                                                XIdKelompokUtama: kelompokUtama.value,
                                                                XIdObjek_KelompokUtama: objek.value,
                                                            },
                                                            success: function (result) {
                                                                Swal.fire({
                                                                    icon: 'success',
                                                                    title: 'Sukses Hapus',
                                                                    text: result.success,
                                                                }).then(() => {
                                                                    Swal.fire({
                                                                        icon: 'question',
                                                                        title: 'Hapus Objek ??..',
                                                                        showCancelButton: true,
                                                                        confirmButtonText: 'Ya',
                                                                        cancelButtonText: 'Tidak',
                                                                        returnFocus: false
                                                                    }).then((result) => {
                                                                        if (result.isConfirmed) {
                                                                            $.ajax({
                                                                                type: 'GET',
                                                                                url: '/Kencana/MaintenanceObjekKencana/deleteObjek',
                                                                                data: {
                                                                                    _token: csrfToken,
                                                                                    XIdObjek: objek.value,
                                                                                    XIdDivisi_Objek: divisi.value,
                                                                                },
                                                                                success: function (result) {
                                                                                    Swal.fire({
                                                                                        icon: 'success',
                                                                                        title: 'Sukses Hapus',
                                                                                        text: result.success,
                                                                                    });
                                                                                },
                                                                                error: function (xhr, status, error) {
                                                                                    Swal.fire({
                                                                                        icon: 'error',
                                                                                        title: 'Hubungi EDP!',
                                                                                        text: xhr.responseJSON.error ?? 'Data gagal dihapus'
                                                                                    });
                                                                                },
                                                                                complete: function () {
                                                                                    setTimeout(() => {
                                                                                        canClickProsesButton = true;
                                                                                    }, 3000);
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                });
                                                            },
                                                            error: function (xhr, status, error) {
                                                                Swal.fire({
                                                                    icon: 'error',
                                                                    title: 'Hubungi EDP!',
                                                                    text: xhr.responseJSON.error ?? 'Data gagal dihapus'
                                                                });
                                                            },
                                                            complete: function () {
                                                                setTimeout(() => {
                                                                    canClickProsesButton = true;
                                                                }, 3000);
                                                            }
                                                        });
                                                    }
                                                });
                                            });
                                        },
                                        error: function (xhr, status, error) {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Hubungi EDP!',
                                                text: xhr.responseJSON.error ?? 'Data gagal dihapus'
                                            });
                                        },
                                        complete: function () {
                                            setTimeout(() => {
                                                canClickProsesButton = true;
                                            }, 3000);
                                        }
                                    });
                                }
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    },
                    complete: function () {
                        setTimeout(() => {
                            canClickProsesButton = true;
                        }, 3000);
                    }
                });
            }

            //#region hapus kosong 2
            else if (namaSubKelompok.value === '' && namaKelompok.value === '' && namaKelompokUtama.value && namaObjek.value) {
                $.ajax({
                    type: 'GET',
                    url: '/Kencana/MaintenanceObjekKencana/cekHapusKelompok',
                    data: {
                        _token: csrfToken,
                        XIdkelompokutama_kelompok: kelompokUtama.value,
                    },
                    success: function (result) {
                        if (result) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Isi Nama Kelompok!',
                                text: 'Data Tidak Dapat Di Proses!!...',
                            });
                            return;
                        }
                        else {
                            Swal.fire({
                                icon: 'question',
                                title: 'Hapus Kelompok Utama ??..',
                                showCancelButton: true,
                                confirmButtonText: 'Ya',
                                cancelButtonText: 'Tidak',
                                returnFocus: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    $.ajax({
                                        type: 'GET',
                                        url: '/Kencana/MaintenanceObjekKencana/deleteKelUtama',
                                        data: {
                                            _token: csrfToken,
                                            XIdKelompokUtama: kelompokUtama.value,
                                            XIdObjek_KelompokUtama: objek.value,
                                        },
                                        success: function (result) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Sukses Hapus',
                                                text: result.success,
                                            }).then(() => {
                                                Swal.fire({
                                                    icon: 'question',
                                                    title: 'Hapus Objek ??..',
                                                    showCancelButton: true,
                                                    confirmButtonText: 'Ya',
                                                    cancelButtonText: 'Tidak',
                                                    returnFocus: false
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        $.ajax({
                                                            type: 'GET',
                                                            url: '/Kencana/MaintenanceObjekKencana/deleteObjek',
                                                            data: {
                                                                _token: csrfToken,
                                                                XIdObjek: objek.value,
                                                                XIdDivisi_Objek: divisi.value,
                                                            },
                                                            success: function (result) {
                                                                Swal.fire({
                                                                    icon: 'success',
                                                                    title: 'Sukses Hapus',
                                                                    text: result.success,
                                                                });
                                                            },
                                                            error: function (xhr, status, error) {
                                                                Swal.fire({
                                                                    icon: 'error',
                                                                    title: 'Hubungi EDP!',
                                                                    text: xhr.responseJSON.error ?? 'Data gagal dihapus'
                                                                });
                                                            },
                                                            complete: function () {
                                                                setTimeout(() => {
                                                                    canClickProsesButton = true;
                                                                }, 3000);
                                                            }
                                                        });
                                                    }
                                                });
                                            });
                                        },
                                        error: function (xhr, status, error) {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Hubungi EDP!',
                                                text: xhr.responseJSON.error ?? 'Data gagal dihapus'
                                            });
                                        },
                                        complete: function () {
                                            setTimeout(() => {
                                                canClickProsesButton = true;
                                            }, 3000);
                                        }
                                    });
                                }
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    },
                    complete: function () {
                        setTimeout(() => {
                            canClickProsesButton = true;
                        }, 3000);
                    }
                });
            }

            //#region hapus kosong 3
            else if (namaSubKelompok.value === '' && namaKelompok.value === '' && namaKelompokUtama.value === '' && namaObjek.value) {
                $.ajax({
                    type: 'GET',
                    url: '/Kencana/MaintenanceObjekKencana/cekHapusKelompokUtama',
                    data: {
                        _token: csrfToken,
                        XIdkelompokutama_kelompok: kelompokUtama.value,
                    },
                    success: function (result) {
                        if (result) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Isi Nama Kelompok Utama!',
                                text: 'Data Tidak Dapat Di Proses!!...',
                            });
                            return;
                        }
                        else {
                            Swal.fire({
                                icon: 'question',
                                title: 'Hapus Objek ??..',
                                showCancelButton: true,
                                confirmButtonText: 'Ya',
                                cancelButtonText: 'Tidak',
                                returnFocus: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    $.ajax({
                                        type: 'GET',
                                        url: '/Kencana/MaintenanceObjekKencana/deleteObjek',
                                        data: {
                                            _token: csrfToken,
                                            XIdObjek: objek.value,
                                            XIdDivisi_Objek: divisi.value,
                                        },
                                        success: function (result) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Sukses Hapus',
                                                text: result.success,
                                            });
                                        },
                                        error: function (xhr, status, error) {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Hubungi EDP!',
                                                text: xhr.responseJSON.error ?? 'Data gagal dihapus'
                                            });
                                        },
                                        complete: function () {
                                            setTimeout(() => {
                                                canClickProsesButton = true;
                                            }, 3000);
                                        }
                                    });
                                }
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    },
                    complete: function () {
                        setTimeout(() => {
                            canClickProsesButton = true;
                        }, 3000);
                    }
                });
            }
        }

    });
    //#endregion

});
