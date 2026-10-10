var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisiId = document.getElementById('divisiId');
var divisiNama = document.getElementById('divisiNama');
var btnDivisi = document.getElementById('btn_divisi');
var btn_proses = document.getElementById('btn_proses');

var semua = document.getElementById('semua');

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

var selectedIndices = new Set(); // Track selected row indices
var ListKonv = {
    XIdKonversi: [],
    XIdTransaksi: [],
    XIdType: [],
    XKeluarPrimer: [],
    XKeluarSekunder: [],
    XKeluarTritier: [],
    XMasukPrimer: [],
    XMasukSekunder: [],
    XMasukTritier: [],
    XHargaSatuan: [],
    XUraian: [],
};
var ListKonversi = [];

$(document).ready(function () {
    var tableKonv = $('#tableKonv').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Kode Konversi' },
        ],
        order: [[0, 'asc']],
        scrollY: '400px',
        autoWidth: false,
        scrollX: '100%',
    });

    var table = $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: '', orderable: false, className: 'select-checkbox', data: null, defaultContent: '' }, // Checkbox
            { title: 'Kd. Konversi' },
            { title: 'Kd. Transaksi' },
            { title: 'Uraian' },
            { title: 'Nama Type' },
            { title: 'JmlKlrPrimer' },
            { title: 'JmlKlrSekunder' },
            { title: 'JmlKlrTritier' },
            { title: 'JmlMskPrimer' },
            { title: 'JmlMskSekunder' },
            { title: 'JmlMskTritier' },
            { title: 'Objek' },
            { title: 'Kel. Utama' },
            { title: 'Kelompok' },
            { title: 'Sub Kelompok' },
            { title: 'Harga Satuan' },
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
        columnDefs: [
            {
                targets: 0,
                orderable: false,
                width: '3%',
                className: 'select-checkbox',
                render: function (data, type, row, meta) {
                    return `<input type="checkbox" class="row-checkbox"
                                    data-id="${row[1]}"
                                    data-type="${row[11]}"
                                    data-primer="${row[13]}"
                                    data-sekunder="${row[14]}"
                                    data-tritier="${row[16]}">`;
                }
            },
            { targets: [1], width: '10%', className: 'fixed-width' },
            { targets: [2], width: '10%', className: 'fixed-width' },
            { targets: [3], width: '10%', className: 'fixed-width' },
            { targets: [4], width: '20%', className: 'fixed-width' },
            { targets: [5], width: '10%', className: 'fixed-width' },
            { targets: [6], width: '10%', className: 'fixed-width' },
            { targets: [7], width: '10%', className: 'fixed-width' },
            { targets: [8], width: '10%', className: 'fixed-width' },
            { targets: [9], width: '10%', className: 'fixed-width' },
            { targets: [10], width: '10%', className: 'fixed-width' },
            { targets: [11], width: '10%', className: 'fixed-width' },
            { targets: [12], width: '10%', className: 'fixed-width' },
            { targets: [13], width: '10%', className: 'fixed-width' },
            { targets: [14], width: '10%', className: 'fixed-width' },
            { targets: [15], width: '10%', className: 'fixed-width' }
        ],
        scrollY: '400px',
        autoWidth: false,
        scrollX: '150%',
        order: [[1, 'asc']],
        select: {
            style: 'os',
            selector: 'td:first-child'
        }
    });

    function updateListKonv() {
        // Clear arrays
        ListKonv.XIdKonversi = [];
        ListKonv.XIdTransaksi = [];
        ListKonv.XIdType = [];
        ListKonv.XKeluarPrimer = [];
        ListKonv.XKeluarSekunder = [];
        ListKonv.XKeluarTritier = [];
        ListKonv.XMasukPrimer = [];
        ListKonv.XMasukSekunder = [];
        ListKonv.XMasukTritier = [];
        ListKonv.XHargaSatuan = [];
        ListKonv.XUraian = [];

        // Populate arrays with selected data
        selectedIndices.forEach(index => {
            var rowData = table.row(index).data();
            console.log(rowData);

            ListKonv.XIdKonversi.push(rowData[1]);  // Adjust indices as needed
            ListKonv.XIdTransaksi.push(rowData[2]);  // Adjust indices as needed
            ListKonv.XUraian.push(rowData[3]);
            ListKonv.XIdType.push(rowData[4]);
            ListKonv.XKeluarPrimer.push(rowData[5]);
            ListKonv.XKeluarSekunder.push(rowData[6]);
            ListKonv.XKeluarTritier.push(rowData[7]);
            ListKonv.XMasukPrimer.push(rowData[8]);
            ListKonv.XMasukSekunder.push(rowData[9]);
            ListKonv.XMasukTritier.push(rowData[10]);
            ListKonv.XHargaSatuan.push(rowData[15]);
        });
    }

    function handleCheckboxChange(isBulk = false, isChecked = false, checkbox = null) {
        if (isBulk) {
            table.rows().every(function (rowIdx) {
                if (isChecked) {
                    selectedIndices.add(rowIdx);
                } else {
                    selectedIndices.delete(rowIdx);
                }
            });
        } else {
            var row = $(checkbox).closest('tr');
            var rowIndex = table.row(row).index();

            if (isChecked) {
                selectedIndices.add(rowIndex);
            } else {
                selectedIndices.delete(rowIndex);
            }
        }

        updateListKonv();
    }

    $('#tableData').on('change', 'input.row-checkbox', function () {
        handleCheckboxChange(false, $(this).prop('checked'), this);
    });

    $('#semua').on('click', function () {
        var isChecked = $(this).data('checked') || false;
        isChecked = !isChecked;
        $(this).data('checked', isChecked);

        $('.row-checkbox').prop('checked', isChecked).each(function () {
            handleCheckboxChange(true, isChecked, this);
        });

        if (isChecked) {
            $(this).text('Batal Semua');
            tableKonv.$('tr').addClass('selected');
            $('#tableKonv').addClass('table-disabled');

            ListKonversi = [];

            tableKonv.rows('.selected').every(function (rowIdx, tableLoop, rowLoop) {
                let value = this.data()[0];
                ListKonversi.push(value);
            });
        } else {
            $(this).text('Pilih Semua');
            tableKonv.$('tr').removeClass('selected');
            $('#tableKonv').removeClass('table-disabled');

            ListKonversi = [];
        }

        updateListKonv();
    });

    $('#tableKonv tbody').on('click', 'tr', function (event) {
        var tableKonv = $('#tableKonv').DataTable();
        var table = $('#tableData').DataTable();

        tableKonv.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');

        var data = tableKonv.row(this).data();
        let konvSelected = data[0];

        ListKonversi = [];
        ListKonversi.push(konvSelected);

        selectedIndices.clear();

        table.rows().every(function (rowIdx, tableLoop, rowLoop) {
            var rowData = this.data();
            var checkbox = $(this.node()).find('input[type="checkbox"]');

            if (rowData[1] === konvSelected) {
                checkbox.prop('checked', true);
                selectedIndices.add(rowIdx);
            } else {
                checkbox.prop('checked', false);
            }
        });

        updateListKonv();
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

function updateDataTable(data, angka) {
    var table = $('#tableData').DataTable();
    var tableKonv = $('#tableKonv').DataTable();

    if (angka === 1) {
        table.clear();
        data.forEach(function (item) {
            table.row.add([
                '',
                escapeHtml(item.IdKonversi),
                escapeHtml(item.IdTransaksi),
                escapeHtml(item.UraianDetailTransaksi),
                escapeHtml(item.NamaType),
                formatNumber(item.JumlahPengeluaranPrimer),
                formatNumber(item.JumlahPengeluaranSekunder),
                formatNumber(item.JumlahPengeluaranTritier),
                formatNumber(item.JumlahPemasukanPrimer),
                formatNumber(item.JumlahPemasukanSekunder),
                formatNumber(item.JumlahPemasukanTritier),
                escapeHtml(item.NamaObjek),
                escapeHtml(item.NamaKelompokUtama),
                escapeHtml(item.NamaKelompok),
                escapeHtml(item.NamaSubKelompok),
                formatNumber(item.HargaSatuan) ?? numeral(0).format('0,0.00'),
                escapeHtml(item.IdSubkelompok),
                escapeHtml(item.IdType),
            ]);
        });
        table.draw();
    }
    else if (angka === 2) {
        tableKonv.clear();
        data.forEach(function (item) {
            tableKonv.row.add([
                escapeHtml(item.IdKonversi),
            ]);
        });
        tableKonv.draw();
    }

}

function formatDateToMMDDYYYY(date) {
    let dateObj = new Date(date);
    if (isNaN(dateObj)) {
        return '';
    }

    let month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    let day = dateObj.getDate().toString().padStart(2, '0');
    let year = dateObj.getFullYear();

    return `${month}/${day}/${year}`;
}


function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}

function clearText1() {
    var tableKonv = $('#tableKonv').DataTable();
    var table = $('#tableData').DataTable();

    tableKonv.clear().draw();
    table.clear().draw();
}

function clearText() {
    divisiId.value = '';
    divisiNama.value = '';

    clearText1();
}


var c, i, j, a, t, al, tl, jum, k, con;
var KdKonversi, sidtype, Asal, Tujuan, Konversi;

function Proses_Acc() {
    console.log(ListKonv);

    $.ajax({
        type: 'PUT',
        url: '/Kencana/AccKonversiBarangKencana/proses',
        data: {
            IdKonversi: ListKonversi,
            XIdKonversi: ListKonv.XIdKonversi,
            XIdTransaksi: ListKonv.XIdTransaksi,
            XUraian: ListKonv.XUraian,
            XIdType: ListKonv.XIdType,
            XKeluarPrimer: ListKonv.XKeluarPrimer,
            XKeluarSekunder: ListKonv.XKeluarSekunder,
            XKeluarTritier: ListKonv.XKeluarTritier,
            XMasukPrimer: ListKonv.XMasukPrimer,
            XMasukSekunder: ListKonv.XMasukSekunder,
            XMasukTritier: ListKonv.XMasukTritier,
            XHargaSatuan: ListKonv.XHargaSatuan,
            _token: csrfToken
        },
        success: function (response) {
            if (response.errors && response.errors.length > 0) {
                // Function to show errors one by one
                let showNextError = function (index) {
                    if (index < response.errors.length) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Tidak Bisa Di Acc!',
                            text: response.errors[index],
                            returnFocus: false,
                        }).then(() => {
                            showNextError(index + 1);
                        });
                    } else {
                        // All errors have been shown, now show success message
                        if (response.success) {
                            if (response.success) {
                                console.log(response.success);

                                let iconType = response.success[0] === 'Tidak Ada Data Yang Di-ACC' ? 'info' : 'success';

                                Swal.fire({
                                    icon: iconType,
                                    title: 'Success',
                                    text: response.success,
                                    returnFocus: false,
                                }).then(() => {
                                    console.log('sukses');
                                    $('#semua').data('checked', false).text('Pilih Semua');
                                    $('#tableKonv').removeClass('table-disabled');

                                    clearText1();
                                    Load_Transaksi_Asal(divisiId.value);
                                    Load_DataKonversi();

                                    ListKonversi = [];

                                    ListKonv = {
                                        XIdKonversi: [],
                                        XIdTransaksi: [],
                                        XIdType: [],
                                        XKeluarPrimer: [],
                                        XKeluarSekunder: [],
                                        XKeluarTritier: [],
                                        XMasukPrimer: [],
                                        XMasukSekunder: [],
                                        XMasukTritier: [],
                                        XHargaSatuan: [],
                                        XUraian: [],
                                    };

                                });
                            }
                        }
                    }
                };

                showNextError(0);
            } else if (response.success) {
                // Show success message if there are no errors
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.success,
                    returnFocus: false,
                }).then(() => {
                    console.log('sukses');
                    clearText1();
                    Load_Transaksi_Asal(divisiId.value);
                    Load_DataKonversi();
                });
            } else if (response.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Tidak Bisa Di Acc!',
                    text: response.error,
                    returnFocus: false,
                }).then(() => {
                    console.log('gagal');
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }

    });


}

function Load_Transaksi_Asal(sDivisi) {
    $.ajax({
        type: 'GET',
        url: '/Kencana/AccKonversiBarangKencana/getTransaksiAwal',
        data: {
            XKdDivisi: sDivisi,
            _token: csrfToken
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 1)
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function Load_DataKonversi() {
    $.ajax({
        type: 'GET',
        url: '/Kencana/AccKonversiBarangKencana/getKodeKonversi',
        data: {
            XIdDivisi: divisiId.value,
            _token: csrfToken
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 2)
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

btn_proses.addEventListener("click", function (e) {
    var table = $('#tableData').DataTable();
    var tableKonv = $('#tableKonv').DataTable();

    console.log(ListKonversi.length);
    console.log(ListKonv);
    console.log(ListKonversi);

    if (tableKonv.$('tr.selected').length > 0 || ListKonversi.length > 0) {
        Proses_Acc();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Tidak ada data untuk di  Acc.',
            returnFocus: false
        });
        return;
    }
});

// button list divisi
btnDivisi.addEventListener("click", function (e) {

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
                const ListKonv = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!ListKonv) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return ListKonv;
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
                            url: "/Kencana/AccKonversiBarangKencana/getDivisi",
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
                clearText1();
                Load_Transaksi_Asal(divisiId.value);
                Load_DataKonversi();

                ListKonv = {
                    XIdKonversi: [],
                    XIdTransaksi: [],
                    XIdType: [],
                    XKeluarPrimer: [],
                    XKeluarSekunder: [],
                    XKeluarTritier: [],
                    XMasukPrimer: [],
                    XMasukSekunder: [],
                    XMasukTritier: [],
                    XHargaSatuan: [],
                };

                ListKonversi = [];

            }
        });
    } catch (error) {
        console.error(error);
    }
});
