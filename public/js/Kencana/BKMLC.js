var btnOK = document.getElementById("btnOK");
var btnPilih = document.getElementById("btnPilih");
var btnGroup = document.getElementById("btnGroup");
var thn = document.getElementById('thn');
var bln = document.getElementById('bln');
var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var idPelunasanPilih = document.getElementById('idPelunasanPilih');
var tglInputPilih = document.getElementById('tglInputPilih');
var blnPilih = document.getElementById('blnPilih');
var thnPilih = document.getElementById('thnPilih');
var jenisBayarPilih = document.getElementById('jenisBayarPilih');
var bankPilih = document.getElementById('bankPilih');
var namaBankPilih = document.getElementById('namaBankPilih');
var btnBankPilih = document.getElementById('btnBankPilih');
var mataUangPilih = document.getElementById('mataUangPilih');
var pelunasanPilih = document.getElementById('pelunasanPilih');
var buktiPilih = document.getElementById('buktiPilih');
var jenisBankPilih = document.getElementById('jenisBankPilih');
var keAPilih = document.getElementById('keAPilih');
var btnProsesPilih = document.getElementById('btnProsesPilih');

var tglAwalBKM = document.getElementById('tglAwalBKM');
var tglAkhirBKM = document.getElementById('tglAkhirBKM');
var btnOkBKM = document.getElementById('btnOkBKM');
var idCetakBKM = document.getElementById('idCetakBKM');
var btnCetakBKM = document.getElementById('btnCetakBKM');
var modalListBKM = document.getElementById('modalListBKM');
var tableListBKM = document.getElementById('tableListBKM');

var tglAwalBKK = document.getElementById('tglAwalBKK');
var tglAkhirBKK = document.getElementById('tglAkhirBKK');
var btnOkBKK = document.getElementById('btnOkBKK');
var idCetakBKK = document.getElementById('idCetakBKK');
var btnCetakBKK = document.getElementById('btnCetakBKK');
var modalListBKK = document.getElementById('modalListBKK');
var tableListBKK = document.getElementById('tableListBKK');

var btnTampilBKM = document.getElementById("btnTampilBKM");
var btnTampilBKK = document.getElementById("btnTampilBKK");

// Assigning all IDs to JavaScript variables
var keteranganCetakBKM = document.getElementById('keteranganCetakBKM');
var nomerBKM = document.getElementById('nomerBKM');
var tanggalBKM = document.getElementById('tanggalBKM');
var symbolBKM = document.getElementById('symbolBKM');
var nilaiBKM = document.getElementById('nilaiBKM');
var terbilangBKM = document.getElementById('terbilangBKM');
var ketBKM = document.getElementById('ketBKM');
var bkmTotalK = document.getElementById('bkmTotalK');
var ket1BKM = document.getElementById('ket1BKM');
var ket3BKM = document.getElementById('ket3BKM');
var bkmJum = document.getElementById('bkmJum');
var ket5BKM = document.getElementById('ket5BKM');
var ket6BKM = document.getElementById('ket6BKM');
var bkmJum2 = document.getElementById('bkmJum2');
var symbolgtBKM = document.getElementById('symbolgtBKM');
var grandTotalBKM = document.getElementById('grandTotalBKM');
var sidoarjoBKM = document.getElementById('sidoarjoBKM');

// Assign all IDs to variables
var namaCetakBKK = document.getElementById('namaCetakBKK');
var dateCetakBKK = document.getElementById('dateCetakBKK');
var voucherCetakBKK = document.getElementById('voucherCetakBKK');
var descriptionCetakBKK = document.getElementById('descriptionCetakBKK');
var paidCetakBKK = document.getElementById('paidCetakBKK');
var postedCetakBKK = document.getElementById('postedCetakBKK');
var amountBKK = document.getElementById('amountBKK');
var totalAmountBKK = document.getElementById('totalAmountBKK');
var batalNote = document.getElementById('batalNote');
var alasanNote = document.getElementById('alasanNote');

var today = new Date().toISOString().slice(0, 10);

$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Tgl. Pelunasan' },
            { title: 'Id. Pelunasan' },
            { title: 'Id. Bank' },
            { title: 'Jenis Pembayaran' },
            { title: 'Mata Uang' },
            { title: 'Total Pelunasan' },
            { title: 'No. Bukti' },
            { title: 'Tgl. Pembulatan' },
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
        scrollY: '150px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2, 3, 4, 5, 6, 7], width: '20%', className: 'fixed-width' },]
    });

    $('#tableKurangLebih').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Keterangan' },
            { title: 'Jumlah Biaya' },
            { title: 'Kode Perkiraan' },
            { title: 'Id. Detail' },
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
        scrollY: '150px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2, 3], width: '20%', className: 'fixed-width' },]
    });

    $('#tablePelunasan').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Id. Penagihan' },
            { title: 'Nilai Pelunasan' },
            { title: 'Pelunasan Rupiah' },
            { title: 'Kode Perkiraan' },
            { title: 'Customer' },
            { title: 'Id. Detail' },
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
        scrollY: '150px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2, 3, 4, 5], width: '20%', className: 'fixed-width' },]
    });

    $('#tableBiaya').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Keterangan' },
            { title: 'Jumlah Biaya' },
            { title: 'Kode Perkiraan' },
            { title: 'Id. Detail' },
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
        scrollY: '150px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2, 3], width: '20%', className: 'fixed-width' },]
    });
});

$('#bln').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        thn.focus();
    }
});

$('#thn').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        btnOK.focus();
    }
});

btnOK.addEventListener("click", function (e) {
    if (bln.value === '' || thn.value === '') {
        Swal.fire({
            icon: 'error',
            text: 'Isi Dulu Bulan & Tahun!!',
            returnFocus: false
        }).then(() => {
            bln.focus();
        });
    }
    else {
        tampilPelunasan();
    }
});

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

function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: 'nearest' });
}

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

function updateDataTable(data, angka) {

    if (angka === 1) {
        var tableData = $('#tableData').DataTable();
        tableData.clear();
        data.forEach(function (item) {
            tableData.row.add([
                formatDateToMMDDYYYY(item.Tgl_Pelunasan),
                escapeHtml(item.Id_Pelunasan),
                item.Id_bank ? escapeHtml(item.Id_bank) : '',
                escapeHtml(item.Jenis_Pembayaran),
                escapeHtml(item.Nama_MataUang),
                numeral(parseFloat(item.nilai)).format("0,0.00"),
                item.No_Bukti ? escapeHtml(item.No_Bukti) : '',
                ''
            ]);
        });
        tableData.draw();
    }

    else if (angka === 2) {
        var tableData = $('#tablePelunasan').DataTable();
        tableData.clear();
        data.forEach(function (item) {
            tableData.row.add([
                escapeHtml(item.ID_Penagihan),
                numeral(parseFloat(item.Nilai_Pelunasan)).format("0,0.00"),
                numeral(parseFloat(item.Pelunasan_Rupiah)).format("0,0.00"),
                item.Kode_Perkiraan ? escapeHtml(item.Kode_Perkiraan) : '0.0.00',
                escapeHtml(item.NamaCust),
                escapeHtml(item.Id_Detail_Pelunasan),
            ]);
        });
        tableData.draw();
    }

    else if (angka === 3) {
        var tableData = $('#tableBiaya').DataTable();
        tableData.clear();
        data.forEach(function (item) {
            tableData.row.add([
                item.Keterangan ? escapeHtml(item.Keterangan) : '',
                numeral(parseFloat(item.Biaya)).format("0,0.00"),
                item.Kode_Perkiraan ? escapeHtml(item.Kode_Perkiraan) : '0.0.00',
                escapeHtml(item.Id_Detail_Pelunasan),
            ]);
        });
        tableData.draw();
    }

    else if (angka === 4) {
        var tableData = $('#tableKurangLebih').DataTable();
        tableData.clear();
        data.forEach(function (item) {
            tableData.row.add([
                item.Keterangan ? escapeHtml(item.Keterangan) : '',
                numeral(parseFloat(item.KurangLebih)).format("0,0.00"),
                item.Kode_Perkiraan ? escapeHtml(item.Kode_Perkiraan) : '0.0.00',
                escapeHtml(item.Id_Detail_Pelunasan),
            ]);
        });
        tableData.draw();
    }

    else if (angka === 5) {
        var tableListBKM = $('#tableListBKM').DataTable();

        tableListBKM.clear();
        data.forEach(function (item) {
            tableListBKM.row.add([
                formatDateToMMDDYYYY(item.Tgl_Input),
                escapeHtml(item.Id_BKM),
                numeral(parseFloat(item.Nilai_Pelunasan)).format("0,0.00"),
                item.Terjemahan ? escapeHtml(item.Terjemahan) : '',
            ]);
        });
        tableListBKM.draw();
    }
    else if (angka === 6) {
        var tableListBKK = $('#tableListBKK').DataTable();

        tableListBKK.clear();
        data.forEach(function (item) {
            tableListBKK.row.add([
                formatDateToMMDDYYYY(item.Tgl_Input),
                escapeHtml(item.Id_BKK),
                numeral(parseFloat(item.Nilai_Pembulatan)).format("0,0.00"),
                escapeHtml(item.Terjemahan),
            ]);
        });
        tableListBKK.draw();
    }
}

function tampilPelunasan() {
    $.ajax({
        type: 'GET',
        url: '/Kencana/BKMLCKencana/tampilPelunasan',
        data: {
            _token: csrfToken,
            bln: bln.value,
            thn: thn.value,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 1);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    text: 'Tidak Ada Pelunasan',
                    returnFocus: false
                }).then(() => {
                    var tableData = $('#tableData').DataTable();
                    tableData.clear().draw();
                    bln.focus();
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    bln.focus(); // Set focus on the tglInput element
    // $('#modalPilihBank').modal('show');
});

let rowIndex;
$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    data = table.row(this).data();
    rowIndex = table.row(this).index();

    idPelunasanPilih.value = data[1] ? decodeHtmlEntities(data[1]) : '';
    jenisBayarPilih.value = data[3] ? decodeHtmlEntities(data[3]) : '';
    bankPilih.value = data[2] ? decodeHtmlEntities(data[2]) : '';
    mataUangPilih.value = data[4] ? decodeHtmlEntities(data[4]) : '';
    pelunasanPilih.value = data[5] ? numeral(data[5]).format("0,0.00") : '';
    buktiPilih.value = data[6] ? decodeHtmlEntities(data[6]) : '';
    keAPilih.value = rowIndex;
    tglInputPilih.value = today;

    updatePelunasan(idPelunasanPilih.value);
    updateBiaya(idPelunasanPilih.value);
    updateKurangLebih(idPelunasanPilih.value);
});

function updatePelunasan(id) {
    $.ajax({
        type: 'GET',
        url: '/Kencana/BKMLCKencana/getPelunasanList',
        data: {
            _token: csrfToken,
            idPelunasan: id
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 2);
            }
            else {
                var table = $('#tablePelunasan').DataTable();
                table.clear().draw();
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function updateBiaya(id) {
    $.ajax({
        type: 'GET',
        url: '/Kencana/BKMLCKencana/getBiayaList',
        data: {
            _token: csrfToken,
            idPelunasan: id
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 3);
            }
            else {
                var table = $('#tableBiaya').DataTable();
                table.clear().draw();
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function updateKurangLebih(id) {
    $.ajax({
        type: 'GET',
        url: '/Kencana/BKMLCKencana/getKurangLebihList',
        data: {
            _token: csrfToken,
            idPelunasan: id
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 4);
            }
            else {
                var table = $('#tableKurangLebih').DataTable();
                table.clear().draw();
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

btnPilih.addEventListener("click", function (e) {
    var table = $('#tableData').DataTable();
    var selectedRow = table.$('tr.selected');

    $('#modalPilihBank').on('shown.bs.modal', function () {
        // bankPilih.value = '';
        namaBankPilih.value = '';
        jenisBankPilih.value = '';
        blnPilih.value = '';
        thnPilih.value = '';

        tglInputPilih.focus();
    });

    if (selectedRow.length > 0) {
        $('#modalPilihBank').modal('show');
    }
    else {
        Swal.fire({
            icon: 'error',
            text: 'Pilih 1 Data Pelunasan',
            returnFocus: false
        });
    }
});

$('#tglInputPilih').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (tglInputPilih.value > today) {
            Swal.fire({
                icon: 'error',
                text: 'Tanggal SALAH!',
                returnFocus: false
            });
        }
        else {
            var dateValue = new Date(tglInputPilih.value);

            var month = String(dateValue.getMonth() + 1).padStart(2, '0');
            var year = String(dateValue.getFullYear()).slice(-2);
            blnPilih.value = month;
            thnPilih.value = year;
            btnBankPilih.focus();
        }
    }
});

btnBankPilih.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Bank',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                            url: "/Kencana/BKMLCKencana/getBank",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_Bank" },
                            { data: "Nama_Bank" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                bankPilih.value = decodeHtmlEntities(result.value.Id_Bank.trim());
                namaBankPilih.value = decodeHtmlEntities(result.value.Nama_Bank.trim());

                if (bankPilih.value !== '') {
                    $.ajax({
                        type: 'GET',
                        url: '/Kencana/BKMLCKencana/getAccBank',
                        data: {
                            _token: csrfToken,
                            idBank: bankPilih.value
                        },
                        success: function (result) {
                            if (result.length !== 0) {
                                jenisBankPilih.value = result[0].jenis ? decodeHtmlEntities(result[0].jenis.trim()) : '';
                                btnProsesPilih.focus();
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error('Error:', error);
                        }
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnProsesPilih.addEventListener("click", function (e) {
    var table = $('#tableData').DataTable();
    table.cell(keAPilih.value, 2).data(bankPilih.value);
    table.cell(keAPilih.value, 7).data(formatDateToMMDDYYYY(tglInputPilih.value));

    $('#modalPilihBank').modal('hide');
});

//#region group button
btnGroup.addEventListener('click', function () {
    let i;
    let ada = false;
    let j;
    let a;
    let brs;
    let IdBank = "";
    let total = 0.0;
    let uang = "";
    let jenis = "";
    let Konversi = "";
    let total1 = "";
    let id = "";
    let id1 = "";
    let id2 = "";
    let idbkm = 0;
    let idbkk = 0;
    let ada1 = false;
    let brs1;
    let IdPembayaran = 0;

    brs = 1;
    total = 0;
    j = 0;
    a = 0;

    var table = $('#tableData').DataTable();
    var selectedRow = table.$('tr.selected');

    if (selectedRow.length > 0) {
        if (table.cell(rowIndex, 7).data() !== '' && table.cell(rowIndex, 2).data() !== '') {
            if (table.cell(rowIndex, 2).data() === 'KRR1' || table.cell(rowIndex, 2).data() === 'KRR2') {
                if (table.cell(rowIndex, 2).data() === 'KRR2') {
                    IdBank = 'KI';
                    proses(IdBank);

                }
                else if (table.cell(rowIndex, 2).data() === 'KRR1') {
                    IdBank = 'KKM';
                    proses(IdBank);

                }
            }
            else {
                IdBank = table.cell(rowIndex, 2).data();
                proses(IdBank);

            }

            function proses(IdBank) {
                total = numeral(table.cell(rowIndex, 5).data()).value();
                uang = table.cell(rowIndex, 4).data();
                total1 = numeral(total).format("0,0.00");
                if (uang === 'RUPIAH') {
                    Konversi = convertNumberToWordsRupiah(total);
                }
                else {
                    Konversi = convertNumberToWordsDollar(total);
                }

                $.ajax({
                    type: 'GET',
                    url: '/Kencana/BKMLCKencana/cekJmlRincian',
                    data: {
                        _token: csrfToken,
                        idpelunasan: table.cell(rowIndex, 1).data(),
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            if (numeral(result[0].Pelunasan).value() < total) {
                                let sisa = 0;
                                let x1;

                                sisa = total - numeral(result[0].Pelunasan).value();

                                $.ajax({
                                    type: 'PUT',
                                    url: '/Kencana/BKMLCKencana/insertSisaBKM',
                                    data: {
                                        _token: csrfToken,
                                        idpelunasan: table.cell(rowIndex, 1).data(),
                                        sisa: numeral(sisa).value(),
                                        jenisBayar: table.cell(rowIndex, 3).data(),
                                    },
                                    error: function (xhr, status, error) {
                                        console.error('Error:', error);
                                    }
                                });

                            }
                        }
                        else {
                            sisa = total - numeral(result[0].Pelunasan).value();

                            $.ajax({
                                type: 'PUT',
                                url: '/Kencana/BKMLCKencana/insertSisaBKM',
                                data: {
                                    _token: csrfToken,
                                    idpelunasan: table.cell(rowIndex, 1).data(),
                                    sisa: numeral(sisa).value(),
                                    jenisBayar: table.cell(rowIndex, 3).data(),
                                },
                                error: function (xhr, status, error) {
                                    console.error('Error:', error);
                                }
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });

                $.ajax({
                    type: 'GET',
                    url: '/Kencana/BKMLCKencana/getAccBank',
                    data: {
                        _token: csrfToken,
                        idBank: table.cell(rowIndex, 2).data()
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            jenis = result[0].jenis ? decodeHtmlEntities(result[0].jenis.trim()) : '';

                            prosesBKM(jenis);
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });

                function prosesBKM(jenis) {
                    $.ajax({
                        type: 'GET',
                        url: '/Kencana/BKMLCKencana/getIdBKM',
                        data: {
                            _token: csrfToken,
                            bank: IdBank,
                            jenis: 'R',
                            tahun: new Date(table.cell(rowIndex, 7).data()).getFullYear(),
                            tgl: table.cell(rowIndex, 7).data(),
                        },
                        success: function (result) {
                            if (result.length !== 0) {
                                id = result.IdBKM ? decodeHtmlEntities(result.IdBKM) : '';

                                idbkm = isNaN(parseInt(id.substring(0, 3))) ? 0 : parseInt(id.substring(0, 3));

                                prosesIdBKM(id);

                                function prosesIdBKM(id) {
                                    $.ajax({
                                        type: 'PUT',
                                        url: '/Kencana/BKMLCKencana/insertTagihBKM',
                                        data: {
                                            _token: csrfToken,
                                            idBKM: id,
                                            tglinput: table.cell(rowIndex, 7).data(),
                                            terjemahan: Konversi,
                                            nilaipelunasan: total,
                                            IdBank: IdBank.trim(),
                                        },
                                        error: function (xhr, status, error) {
                                            console.error('Error:', error);
                                        }
                                    });

                                    $.ajax({
                                        type: 'PUT',
                                        url: '/Kencana/BKMLCKencana/insertTagih1BKM',
                                        data: {
                                            _token: csrfToken,
                                            idBKM: id,
                                            idpelunasan: isNaN(parseInt(table.cell(rowIndex, 1).data())) ? 0 : parseInt(table.cell(rowIndex, 1).data()),
                                            idBank: table.cell(rowIndex, 2).data(),
                                        },
                                        error: function (xhr, status, error) {
                                            console.error('Error:', error);
                                        }
                                    });

                                    var dateValue = new Date(table.cell(rowIndex, 7).data());

                                    var month = String(dateValue.getMonth() + 1).padStart(2, '0');
                                    var year = String(dateValue.getFullYear()).slice(-2);

                                    $.ajax({
                                        type: 'PUT',
                                        url: '/Kencana/BKMLCKencana/updateIdBKM',
                                        data: {
                                            _token: csrfToken,
                                            idbkm: idbkm,
                                            idBank: IdBank.trim(),
                                            jenis: jenis,
                                            tgl: String(month) + String(year),
                                        },
                                        error: function (xhr, status, error) {
                                            console.error('Error:', error);
                                        }
                                    });

                                    if (table.cell(rowIndex, 3).data() === 'BG' || table.cell(rowIndex, 3).data() === 'CEK') {
                                        $.ajax({
                                            type: 'PUT',
                                            url: '/Kencana/BKMLCKencana/updateStatusBKM',
                                            data: {
                                                _token: csrfToken,
                                                idpelunasan: isNaN(parseInt(table.cell(rowIndex, 1).data())) ? 0 : parseInt(table.cell(rowIndex, 1).data()),
                                            },
                                            error: function (xhr, status, error) {
                                                console.error('Error:', error);
                                            }
                                        });
                                    }

                                    prosesBKK(id);
                                }
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error('Error:', error);
                        }
                    });
                }

                function prosesBKK(id) {
                    let TIdBKK = '';
                    $.ajax({
                        type: 'GET',
                        url: '/Kencana/BKMLCKencana/accBKK',
                        data: {
                            _token: csrfToken,
                            IdBank: IdBank.trim(),
                            jenis: jenis.trim(),
                            tgl: table.cell(rowIndex, 7).data(),
                        },
                        success: function (result) {
                            if (result.length !== 0) {
                                TIdBKK = result[0].id_BKK ? decodeHtmlEntities(result[0].id_BKK.trim()) : '';
                                id2 = TIdBKK.substring(0, 3);

                                idbkk = isNaN(parseInt(id2.substring(0, 3))) ? 0 : parseInt(id2.substring(0, 3));

                                $.ajax({
                                    type: 'PUT',
                                    url: '/Kencana/BKMLCKencana/insertTransBKK',
                                    data: {
                                        _token: csrfToken,
                                        idBKK: TIdBKK.trim(),
                                        tgl: table.cell(rowIndex, 7).data(),
                                        terjemahan: Konversi,
                                        nilai: total,
                                        IdBank: IdBank.trim(),
                                    },
                                    error: function (xhr, status, error) {
                                        console.error('Error:', error);
                                    }
                                });

                                $.ajax({
                                    type: 'PUT',
                                    url: '/Kencana/BKMLCKencana/insertLCBKK',
                                    data: {
                                        _token: csrfToken,
                                        idBKK: TIdBKK.trim(),
                                        idBank: IdBank.trim(),
                                        nilai: total,
                                        idBKM_acuan: id.trim()
                                    },
                                    success: function (response) {
                                        if (response.success) {
                                            $.ajax({
                                                type: 'GET',
                                                url: '/Kencana/BKMLCKencana/getIdPelunasanBKK',
                                                data: {
                                                    _token: csrfToken,
                                                },
                                                success: function (result) {
                                                    if (result.length !== 0) {
                                                        IdPembayaran = parseInt(result.id_pembayaran);

                                                        let ketrg = [];
                                                        let nilai_pel = [];

                                                        // get dan insert langsung
                                                        $.ajax({
                                                            type: 'PUT',
                                                            url: '/Kencana/BKMLCKencana/insertLCDetail',
                                                            data: {
                                                                _token: csrfToken,
                                                                // idpembayaran: IdPembayaran,
                                                                idpelunasan: table.cell(rowIndex, 1).data(),
                                                            },
                                                            error: function (xhr, status, error) {
                                                                console.error('Error:', error);
                                                            }
                                                        });
                                                    }
                                                },
                                                error: function (xhr, status, error) {
                                                    console.error('Error:', error);
                                                }
                                            });
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        console.error('Error:', error);
                                    }
                                });

                                $.ajax({
                                    type: 'PUT',
                                    url: '/Kencana/BKMLCKencana/updateIdBKK',
                                    data: {
                                        _token: csrfToken,
                                        idbkk: idbkk,
                                        idBank: IdBank.trim(),
                                        jenis: jenis.trim(),
                                        tgl: table.cell(rowIndex, 7).data(),
                                    },
                                    error: function (xhr, status, error) {
                                        console.error('Error:', error);
                                    }
                                });

                                Swal.fire({
                                    icon: 'success',
                                    text: "Data BKM Dengan No." + id + " & BKK No. " + TIdBKK + " TerSimpan",
                                    returnFocus: false
                                }).then(() => {
                                    tampilPelunasan();
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error('Error:', error);
                        }
                    });
                }
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Input Tgl Pembuatan BKM & Id.Bank, Klik Tombol Pilih Bank',
                returnFocus: false
            }).then(() => {
                btnPilih.focus();
            });
        }
    }
    else {
        Swal.fire({
            icon: 'error',
            text: 'Pilih Data Pelunasan Yg Mau DiGroup!',
            returnFocus: false
        });
    }
});

// Event listener for displaying BKK modal
btnTampilBKK.addEventListener('click', function () {
    tglAwalBKK.value = today;
    tglAkhirBKK.value = today;
    idCetakBKK.value = '';

    $('#modalListBKK').on('shown.bs.modal', function () {
        initializeTables();

        $.ajax({
            type: 'GET',
            url: '/Kencana/BKMLCKencana/getListFullBKK',
            data: {
                _token: csrfToken,
            },
            success: function (result) {
                if (result.length !== 0) {
                    updateDataTable(result, 6);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });

        var tableBKK = $('#tableListBKK').DataTable();
        tableBKK.clear().draw();
        tglAwalBKK.focus();
    });

    $('#modalListBKK').modal('show');
});

btnTampilBKM.addEventListener('click', function () {
    tglAwalBKM.value = today;
    tglAkhirBKM.value = today;
    idCetakBKM.value = '';

    $('#modalListBKM').on('shown.bs.modal', function () {
        initializeTables();

        $.ajax({
            type: 'GET',
            url: '/Kencana/BKMLCKencana/getListFullBKM',
            data: {
                _token: csrfToken,
            },
            success: function (result) {
                if (result.length !== 0) {
                    updateDataTable(result, 5);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });

        // Clear the BKM table when opening the modal
        var tableBKM = $('#tableListBKM').DataTable();
        tableBKM.clear().draw();
        tglAwalBKM.focus();
    });

    $('#modalListBKM').modal('show');
});

btnOkBKM.addEventListener('click', function () {
    var table = $('#tableListBKM').DataTable();
    table.clear().draw();

    $.ajax({
        type: 'GET',
        url: '/Kencana/BKMLCKencana/getListBKM',
        data: {
            _token: csrfToken,
            tgl1: tglAwalBKM.value,
            tgl2: tglAkhirBKM.value
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 5);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});

$('#tableListBKM tbody').on('click', 'tr', function () {
    var table = $('#tableListBKM').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = table.row(this).data();

    idCetakBKM.value = decodeHtmlEntities(data[1]);
});

btnOkBKK.addEventListener('click', function () {
    var table = $('#tableListBKK').DataTable();
    table.clear().draw();

    $.ajax({
        type: 'GET',
        url: '/Kencana/BKMLCKencana/getListBKK',
        data: {
            _token: csrfToken,
            tgl1: tglAwalBKK.value,
            tgl2: tglAkhirBKK.value
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 6);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});

$('#tableListBKK tbody').on('click', 'tr', function () {
    var table = $('#tableListBKK').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = table.row(this).data();

    idCetakBKK.value = decodeHtmlEntities(data[1]);
});

let isTableListBKKInitialized = false; // Flag for BKK table
let isTableListBKMInitialized = false; // Flag for BKM table
// Function to initialize both tables
function initializeTables() {
    if (!isTableListBKKInitialized) {
        // Initialize tableListBKK
        $('#tableListBKK').DataTable({
            paging: false,
            searching: true,
            info: false,
            ordering: false,
            scrollY: '200px',
            scrollX: true,
            autoWidth: false,
            columns: [
                { title: 'Tgl. Input' },
                { title: 'Id. BKK' },
                { title: 'Nilai Pelunasan' },
                { title: 'Terbilang' },
            ],
            columnDefs: [
                { targets: [0, 1, 2, 3], width: '25%', className: 'fixed-width' }
            ]
        });
        isTableListBKKInitialized = true; // Mark as initialized
    }

    if (!isTableListBKMInitialized) {
        // Initialize tableListBKM
        $('#tableListBKM').DataTable({
            paging: false,
            searching: true,
            info: false,
            ordering: false,
            scrollY: '200px',
            scrollX: true,
            autoWidth: false,
            columns: [
                { title: 'Tgl. Input' },
                { title: 'Id. BKM' },
                { title: 'Nilai Pelunasan' },
                { title: 'Terbilang' },
            ],
            columnDefs: [
                { targets: [0, 1, 2, 3], width: '25%', className: 'fixed-width' }
            ]
        });
        isTableListBKMInitialized = true; // Mark as initialized
    }
}

function printPreview(previewClass) {
    // Hide all content first
    document.querySelectorAll('.preview, .preview2').forEach(function (preview) {
        preview.style.display = "none"; // Hide both previews
    });

    // Show the selected preview
    const previewToPrint = document.querySelector(`.${previewClass}`);
    previewToPrint.style.display = "block"; // Show the selected preview

    // Print the current view
    window.print();

    // Reset the display after printing
    previewToPrint.style.display = "none"; // Hide the preview again
}

btnCetakBKM.addEventListener('click', function () {
    if (idCetakBKM.value === '') {
        Swal.fire({
            icon: 'error',
            text: 'Pilih 1 Id.BKM Untuk DiCetak!',
            returnFocus: false
        });
        return;
    }
    else {
        $.ajax({
            type: 'GET',
            url: '/Kencana/BKMLCKencana/getCetakBKM',
            data: {
                _token: csrfToken,
                id_bkm: idCetakBKM.value
            },
            success: function (result) {
                if (result.length !== 0) {
                    var bkmDetailsContainer = document.getElementById("bkmDetailsContainer");
                    bkmDetailsContainer.innerHTML = "";

                    if (result[0].Id_bank === 'KRR1' || result[0].Id_bank === 'KRR2') {
                        keteranganCetakBKM.innerHTML = '<h5><b>BUKTI PENERIMAAN KAS</b></h5>';
                    } else {
                        keteranganCetakBKM.innerHTML = '<h5><b>BUKTI PENERIMAAN BANK</b></h5>';
                    }

                    nomerBKM.innerHTML = '<h5><b>Nomer: ' + decodeHtmlEntities(result[0].Id_BKM) + '</b></h5>';

                    var date = new Date(result[0].Tgl_Input);

                    var monthNames = [
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];

                    var day = date.getDate();
                    var month = monthNames[date.getMonth()];
                    var year = date.getFullYear();
                    var formattedDate = day + '/' + month + '/' + year;

                    tanggalBKM.innerHTML = '<h5><b>Tanggal: ' + formattedDate + '</b></h5>';

                    symbolBKM.textContent = decodeHtmlEntities(result[0].Symbol);
                    nilaiBKM.textContent = numeral(parseFloat(result[0].Nilai_Pelunasan)).format("0,0.00");

                    terbilangBKM.textContent = decodeHtmlEntities(result[0].Terjemahan);

                    result.forEach(function (item, index) {
                        var row = document.createElement("div");
                        row.classList.add("row");
                        row.style.width = "95%";

                        var coaCol = document.createElement("div");
                        coaCol.classList.add("col-sm-4", "text-left");
                        coaCol.style.borderLeft = "1px solid black";  // Border kiri

                        if (item.ID_Penagihan !== null) {
                            coaCol.textContent = decodeHtmlEntities(item.NamaCust) + ' - ' + decodeHtmlEntities(item.ID_Penagihan);
                        } else if (numeral(item.Biaya).value() !== 0 ||
                            numeral(item.KurangLebih).value() !== 0 ||
                            numeral(item.Nilai_Rincian).value() !== 0 ||
                            item.Keterangan !== null) {
                            coaCol.textContent = decodeHtmlEntities(item.Keterangan);
                        }
                        row.appendChild(coaCol);

                        var accountCol = document.createElement("div");
                        accountCol.classList.add("col-sm-1", "text-center");
                        if (item.ID_Penagihan !== null && numeral(item.totalBiaya).value() > 0 ||
                            (item.ID_Penagihan !== null && numeral(item.totalKurangLebih).value() !== 0)) {
                            accountCol.textContent = '(+)';
                        } if (item.ID_Penagihan === null && numeral(item.Biaya).value() !== 0) {
                            accountCol.textContent = '(-)';
                        } if (item.ID_Penagihan === null && numeral(item.KurangLebih).value() > 0) {
                            accountCol.textContent = '(+)';
                        } if (item.ID_Penagihan !== null && numeral(item.totalBiaya).value() === 0 ||
                            (item.ID_Penagihan !== null && numeral(item.totalKurangLebih).value() === 0)) {
                            accountCol.textContent = '';
                        }
                        row.appendChild(accountCol);

                        var descriptionCol = document.createElement("div");
                        descriptionCol.classList.add("col-sm-2", "text-right");
                        descriptionCol.style.borderRight = "1px solid black"; // Border kanan
                        if (numeral(item.totalBiaya).value() === 0 && numeral(item.totalKurangLebih).value() === 0) {
                            descriptionCol.textContent = '0';
                        } if (item.ID_Penagihan !== null && (numeral(item.totalBiaya).value() !== 0 || numeral(item.totalKurangLebih).value() !== 0)) {
                            descriptionCol.textContent = numeral(item.Nilai_Rincian).format("0,0.00");
                        } if (item.ID_Penagihan === null && (numeral(item.totalBiaya).value() !== 0 || numeral(item.totalKurangLebih).value() !== 0)) {
                            if (numeral(item.Biaya).value() !== 0 && numeral(item.KurangLebih).value() === 0) {
                                descriptionCol.textContent = numeral(item.Biaya).format("0,0.00");
                            } else if (numeral(item.KurangLebih).value() !== 0 && numeral(item.Biaya).value() === 0) {
                                descriptionCol.textContent = numeral(item.KurangLebih).format("0,0.00");
                            }
                        } if (item.ID_Penagihan === null && item.Keterangan !== null) {
                            descriptionCol.textContent = numeral(item.Nilai_Rincian).format("0,0.00");
                        }
                        row.appendChild(descriptionCol);

                        var cekBgCol = document.createElement("div");
                        cekBgCol.classList.add("col-sm-2", "text-center");
                        cekBgCol.textContent = item.Kode_Perkiraan ? decodeHtmlEntities(item.Kode_Perkiraan) : '';
                        cekBgCol.style.borderLeft = "1px solid black";  // Border kiri
                        cekBgCol.style.borderRight = "1px solid black"; // Border kanan
                        row.appendChild(cekBgCol);

                        var amountCol = document.createElement("div");
                        amountCol.classList.add("col-sm-3", "text-right");
                        amountCol.style.borderLeft = "1px solid black";  // Border kiri
                        amountCol.style.borderRight = "1px solid black"; // Border kanan
                        if (numeral(item.totalBiaya).value() === 0 && numeral(item.totalKurangLebih).value() === 0) {
                            amountCol.textContent = numeral(item.Nilai_Rincian).format("0,0.00");
                        } else {
                            amountCol.textContent = '';
                        }

                        row.appendChild(amountCol);

                        bkmDetailsContainer.appendChild(row);

                        if (index === result.length - 1) {
                            coaCol.style.borderBottom = "1px solid black";         // Border bawah
                            accountCol.style.borderBottom = "1px solid black";     // Border bawah
                            cekBgCol.style.borderBottom = "1px solid black";       // Border bawah
                            descriptionCol.style.borderBottom = "1px solid black"; // Border bawah
                            amountCol.style.borderBottom = "1px solid black";      // Border bawah
                        }

                    });

                    bkmJum.textContent = numeral(result[0].totalBiaya).format("0,0.00");
                    bkmJum2.textContent = numeral(result[0].totalKurangLebih).format("0,0.00");

                    let rowBKM1 = document.querySelector("#rowBKM1");
                    let rowBKM2 = document.querySelector("#rowBKM2");
                    let rowBKM3 = document.querySelector("#rowBKM3");

                    if (numeral(bkmJum.textContent).value() === 0 && numeral(bkmJum2.textContent).value() === 0) {
                        ketBKM.textContent = '';
                        rowBKM1.style.display = 'none'; // Hide the row
                    } else {
                        ketBKM.textContent = 'Jumlah Tagihan :';
                        rowBKM1.style.display = ''; // Show the row again
                    }

                    if (numeral(bkmJum.textContent).value() === 0) {
                        ket1BKM.textContent = '';
                        rowBKM2.style.display = 'none'; // Hide the row
                    } else {
                        ket1BKM.textContent = 'Lain-Lain :';
                        rowBKM2.style.display = ''; // Show the row again
                    }

                    if (numeral(bkmJum2.textContent).value() === 0) {
                        ket5BKM.textContent = '';
                        rowBKM3.style.display = 'none'; // Hide the row
                    } else if (numeral(bkmJum2.textContent).value() < 0) {
                        ket5BKM.textContent = 'KeKurangan';
                        rowBKM3.style.display = ''; // Show the row again
                    } else if (numeral(bkmJum2.textContent).value() > 0) {
                        ket5BKM.textContent = 'KeLebihan';
                        rowBKM3.style.display = ''; // Show the row again
                    }

                    if (numeral(bkmJum.textContent).value() > 0 || numeral(bkmJum2.textContent).value() !== 0) {
                        bkmTotalK.textContent = numeral(result[0].totalNilaiRincian).format("0,0.00");
                    } else {
                        bkmTotalK.textContent = '0';
                    }

                    if (numeral(bkmJum.textContent).value() > 0) {
                        ket3BKM.textContent = '(-)';
                    } else {
                        ket3BKM.textContent = '';
                    }

                    if (numeral(bkmJum2.textContent).value() > 0) {
                        ket6BKM.textContent = '(+)';
                    } else {
                        ket6BKM.textContent = '';
                    }

                    symbolgtBKM.textContent = decodeHtmlEntities(result[0].Symbol);
                    grandTotalBKM.textContent = numeral(parseFloat(result[0].Nilai_Pelunasan)).format("0,0.00");

                    var today = new Date();
                    var day = today.getDate();
                    var month = monthNames[today.getMonth()];
                    var year = today.getFullYear();

                    var formattedToday = day + '/' + month + '/' + year;

                    sidoarjoBKM.innerHTML = "<h5><b>Sidoarjo, " + formattedToday + "</b></h5>";

                    printPreview('preview');
                    updateDateBKM();
                }

            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });

    }
});

btnCetakBKK.addEventListener('click', function () {
    if (idCetakBKK.value === '') {
        Swal.fire({
            icon: 'error',
            text: 'Pilih 1 Id.BKK Untuk DiCetak!',
            returnFocus: false
        });
        return;
    }
    else {
        $.ajax({
            type: 'GET',
            url: '/Kencana/BKMLCKencana/getCetakBKK',
            data: {
                _token: csrfToken,
                id_bkk: idCetakBKK.value
            },
            success: function (result) {
                if (result.length !== 0) {
                    let totalBKM = 0;
                    var bkmDetailsContainer = document.getElementById("bkkDetailsContainer");

                    bkmDetailsContainer.innerHTML = "";

                    namaCetakBKK.textContent = ': ' + decodeHtmlEntities(result[0].Id_bank);
                    voucherCetakBKK.textContent = ': ' + decodeHtmlEntities(result[0].Id_BKK);
                    descriptionCetakBKK.textContent = ": " + decodeHtmlEntities(result[0].Nama_Bank);
                    var today = new Date();

                    var options = { year: 'numeric', month: 'short', day: 'numeric' };
                    var formattedToday = today.toLocaleDateString('en-GB', options).replace(/ /g, '-');
                    postedCetakBKK.textContent = ": " + formattedToday;

                    var date = new Date(result[0].Tgl_Input);
                    var options = { year: 'numeric', month: 'short', day: 'numeric' };
                    var formattedDate = date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
                    dateCetakBKK.textContent = ": " + formattedDate;

                    paidCetakBKK.textContent = ": " + decodeHtmlEntities(result[0].NM_SUP);

                    if (result[0].Batal && result[0].Batal.trim() !== '') {
                        batalNote.textContent = 'BATAL: ' + decodeHtmlEntities(result[0].Batal);
                        batalNote.style.display = 'inline';
                    } else {
                        batalNote.style.display = 'none';
                    }

                    if (result[0].Alasan && result[0].Alasan.trim() !== '') {
                        alasanNote.textContent = 'ALASAN: ' + decodeHtmlEntities(result[0].Alasan);
                        alasanNote.style.display = 'inline';
                    } else {
                        alasanNote.style.display = 'none';
                    }

                    result.forEach(function (item, index) {
                        var row = document.createElement("div");
                        row.classList.add("row");

                        // COA column
                        var coaCol = document.createElement("div");
                        coaCol.classList.add("col-sm-2", "text-left");
                        coaCol.textContent = decodeHtmlEntities(item.KodePerkiraan);
                        row.appendChild(coaCol);

                        // Account Name column
                        var accountCol = document.createElement("div");
                        accountCol.classList.add("col-sm-3", "text-left");
                        accountCol.textContent = decodeHtmlEntities(item.Keterangan);
                        row.appendChild(accountCol);

                        // Description column
                        var descriptionCol = document.createElement("div");
                        descriptionCol.classList.add("col-sm-3", "text-left");
                        descriptionCol.textContent = decodeHtmlEntities(item.Rincian_Bayar);
                        row.appendChild(descriptionCol);

                        // Description column
                        var cekBgCol = document.createElement("div");
                        cekBgCol.classList.add("col-sm-2", "text-left");
                        cekBgCol.textContent = decodeHtmlEntities(item.No_BGCek);
                        row.appendChild(cekBgCol);

                        // Amount column
                        var amountCol = document.createElement("div");
                        amountCol.classList.add("col-sm-2", "text-right");
                        amountCol.textContent = numeral(parseFloat(item.Nilai_Rincian)).format("0,0.00");
                        row.appendChild(amountCol);

                        // Append the row to the container
                        bkmDetailsContainer.appendChild(row);

                        // Update the total
                        totalBKM += parseFloat(item.Nilai_Rincian);

                        // Add underline class only to the last row
                        if (index === result.length - 1) {
                            coaCol.classList.add("underline");
                            accountCol.classList.add("underline");
                            cekBgCol.classList.add("underline");
                            descriptionCol.classList.add("underline");
                            amountCol.classList.add("underline");
                        }
                    });

                    amountBKK.textContent = 'Amount ' + decodeHtmlEntities(result[0].Id_MataUang_BC)
                    totalAmountBKK.textContent = numeral(parseFloat(totalBKM)).format("0,0.00");

                    printPreview('preview2');
                    updateDateBKK();
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });

    }
});

function updateDateBKK() {
    $.ajax({
        type: 'PUT',
        url: '/Kencana/BKMLCKencana/updateDateBKK',
        data: {
            _token: csrfToken,
            idBKK: idCetakBKK.value.trim(),
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function updateDateBKM() {
    $.ajax({
        type: 'PUT',
        url: '/Kencana/BKMLCKencana/updateDateBKM',
        data: {
            _token: csrfToken,
            idBKM: idCetakBKM.value.trim(),
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

