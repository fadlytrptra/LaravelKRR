
var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

let tahun = document.getElementById('tahun');
let bulan = document.getElementById('bulan');
let kursRupiah = document.getElementById('kursRupiah');

let idbkm = document.getElementById('idbkm');
let idPelunasan = document.getElementById('idPelunasan');

let btnOK = document.getElementById('btnOK');
let btnPilihBKM = document.getElementById('btnPilihBKM');
let btnProses = document.getElementById('btnProses');

let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');

let tableData = null;
let rowDataPertama = null;

kursRupiah.value = 0;

// ======================================================
// FOCUS INPUT
// ======================================================

bulan.focus();

bulan.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        tahun.focus();
    }
});

tahun.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        btnOK.focus();
    }
});

// ======================================================
// INITIALIZE DATATABLE
// ======================================================

function initializeDataTable(data) {

    if ($.fn.DataTable.isDataTable('#tableData')) {
        $('#tableData').DataTable().clear().destroy();
    }

    tableData = $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        data: data,
        scrollY: data.length > 0 ? '300px' : '',
        scrollCollapse: true,
        autoWidth: false,

        columns: [
            {
                title: 'Tgl. Input',
                data: 0,
                render: function (data, type, row) {
                    if (type === 'display') {
                        return `
                            <input type="checkbox"
                                name="penerimaCheckbox"
                                class="checkboxBKM">
                            ${data}
                        `;
                    }

                    return data;
                }
            },
            {
                title: 'ID BKM',
                data: 1
            },
            {
                title: 'ID Bank',
                data: 2
            },
            {
                title: 'Nilai Pelunasan',
                data: 3
            },
            {
                title: 'Rincian Pelunasan',
                data: 4
            },
            {
                title: 'Kode Perkiraan',
                data: 5
            },
            {
                title: 'Uraian',
                data: 6
            },
            {
                title: 'Id Pelunasan',
                data: 7,
                visible: false
            }
        ],

        columnDefs: [
            { targets: 0, width: '10%' },
            { targets: 1, width: '10%' },
            { targets: 2, width: '10%' },
            { targets: 3, width: '15%' },
            { targets: 4, width: '15%' },
            { targets: 5, width: '10%' },
            { targets: 6, width: '15%' },
            { targets: 7, visible: false }
        ]
    });

    // Reset pilihan setelah tabel dibuat ulang
    rowDataPertama = null;
    idPelunasan.value = '';
    idbkm.value = '';
}

// ======================================================
// INITIAL TABLE
// ======================================================

initializeDataTable([]);

// ======================================================
// FETCH DATA BKM
// ======================================================

function fetchDataPelunasan() {

    $.ajax({
        url: '/Kencana/UpdateKursBKMKencana/getDataPelunasan',
        type: 'GET',
        dataType: 'json',

        data: {
            _token: csrfToken,
            bulan: bulan.value,
            tahun: tahun.value
        },

        success: function (json) {

            console.log('Response getDataPelunasan:', json);

            if (!json.data || json.data.length === 0) {

                initializeDataTable([]);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Tidak Ada Data BKM',
                    returnFocus: false
                });

                return;
            }

            const dataTableRows = json.data.map(item => [
                item.Tgl_Input,
                item.Id_BKM,
                item.Id_bank,
                item.Nilai_Pelunasan,
                item.RincianPelunasan,
                item.KodePerkiraan,
                item.Uraian,
                item.Id_Pelunasan
            ]);

            console.log('Data untuk DataTable:', dataTableRows);

            initializeDataTable(dataTableRows);
        },

        error: function (xhr, status, error) {

            console.error('Error fetchDataPelunasan:', xhr.responseText);
            console.error('Status:', status);
            console.error('Error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Gagal Mengambil Data',
                text: xhr.responseText || error
            });
        }
    });
}

// ======================================================
// BUTTON OK
// ======================================================

btnOK.addEventListener('click', function (event) {

    event.preventDefault();

    if (bulan.value.trim() === '' || tahun.value.trim() === '') {

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Isi Bulan dan Tahun terlebih dahulu!',
            returnFocus: false
        }).then(() => {
            bulan.focus();
        });

        return;
    }

    fetchDataPelunasan();
});

// ======================================================
// CHECKBOX SELECTION
// HANYA BOLEH MEMILIH 1 BKM
// ======================================================

$(document).off(
    'change',
    '#tableData tbody input[name="penerimaCheckbox"]'
);

$(document).on(
    'change',
    '#tableData tbody input[name="penerimaCheckbox"]',
    function () {

        if (this.checked) {

            // Hilangkan centang dari checkbox lainnya
            $('#tableData tbody input[name="penerimaCheckbox"]')
                .not(this)
                .prop('checked', false);

            // Ambil data dari baris yang dipilih
            rowDataPertama = tableData
                .row($(this).closest('tr'))
                .data();

            console.log('BKM DIPILIH:', rowDataPertama);

        } else {

            rowDataPertama = null;

            console.log('BKM TIDAK DIPILIH');
        }
    }
);

// ======================================================
// DECODE HTML
// ======================================================

function decodeHtmlEntities(str) {

    if (str === null || str === undefined) {
        return '';
    }

    var textArea = document.createElement('textarea');
    textArea.innerHTML = str;

    return textArea.value;
}

// ======================================================
// BUTTON PILIH BKM
// ======================================================

btnPilihBKM.addEventListener('click', function (event) {
    event.preventDefault();

    const checkedCheckbox = document.querySelector(
        '#tableData tbody input[name="penerimaCheckbox"]:checked'
    );

    if (!checkedCheckbox) {
        Swal.fire({
            icon: 'warning',
            title: 'Data belum dipilih',
            text: 'Centang BKM yang ingin diproses terlebih dahulu.'
        });
        return;
    }

    const selectedRow = tableData
        .row($(checkedCheckbox).closest('tr'))
        .data();

    if (!selectedRow) {
        Swal.fire({
            icon: 'error',
            title: 'Data tidak ditemukan',
            text: 'Data BKM gagal diambil dari tabel.'
        });
        return;
    }

    // Simpan data baris
    rowDataPertama = selectedRow;

    // Ambil ID dari baris
    idPelunasan.value = selectedRow[7];
    idbkm.value = selectedRow[1];

    console.log('BKM TERPILIH:', selectedRow);
    console.log('Id Pelunasan:', idPelunasan.value);
    console.log('Id BKM:', idbkm.value);

    kursRupiah.focus();
});

// ======================================================
// FORMAT KURS
// ======================================================

function getKursValue() {

    return parseFloat(
        kursRupiah.value.replace(/,/g, '')
    ) || 0;
}

kursRupiah.addEventListener('keypress', function (event) {

    if (event.key === 'Enter') {

        event.preventDefault();

        let nilaiKurs = getKursValue();

        if (nilaiKurs <= 0) {

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Kurs TIDAK BOLEH = 0!',
                returnFocus: false
            }).then(() => {
                kursRupiah.select();
            });

            return;
        }

        kursRupiah.value = nilaiKurs.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        btnProses.focus();
    }
});

// ======================================================
// BUTTON PROSES
// ======================================================

btnProses.addEventListener('click', function (event) {

    event.preventDefault();

    console.log('===== PROSES UPDATE KURS BKM =====');

    // ==================================================
    // 1. CEK CHECKBOX BKM
    // ==================================================
    const checkedCheckbox = document.querySelector(
        '#tableData tbody input[name="penerimaCheckbox"]:checked'
    );

    if (!checkedCheckbox) {
        Swal.fire({
            icon: 'warning',
            title: 'Data belum dipilih',
            text: 'Centang BKM terlebih dahulu.'
        });
        return;
    }

    // ==================================================
    // 2. AMBIL DATA BARIS DARI DATATABLE
    // ==================================================
    const selectedRow = tableData
        .row($(checkedCheckbox).closest('tr'))
        .data();

    console.log('DATA BKM:', selectedRow);

    if (!selectedRow) {
        Swal.fire({
            icon: 'error',
            title: 'Data tidak ditemukan',
            text: 'Data BKM tidak berhasil diambil.'
        });
        return;
    }

    // ==================================================
    // 3. AMBIL ID PELUNASAN DAN ID BKM LANGSUNG
    // ==================================================
    rowDataPertama = selectedRow;

    idPelunasan.value = selectedRow[7];
    idbkm.value = selectedRow[1];

    console.log('Id Pelunasan:', idPelunasan.value);
    console.log('Id BKM:', idbkm.value);

    // ==================================================
    // 4. VALIDASI ID
    // ==================================================
    if (
        idPelunasan.value === null ||
        idPelunasan.value === undefined ||
        idPelunasan.value.toString().trim() === '' ||
        idbkm.value.toString().trim() === ''
    ) {
        Swal.fire({
            icon: 'error',
            title: 'ID Tidak Valid',
            text: 'Id Pelunasan atau Id BKM tidak ditemukan.'
        });
        return;
    }

    // ==================================================
    // 5. AMBIL KURS
    // ==================================================
    let nilaiKurs = parseFloat(
        kursRupiah.value.replace(/,/g, '')
    );

    console.log('Kurs Rupiah:', nilaiKurs);

    // ==================================================
    // 6. VALIDASI KURS
    // ==================================================
    if (isNaN(nilaiKurs) || nilaiKurs <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Kurs tidak valid',
            text: 'Kurs Rupiah harus lebih besar dari 0.'
        });

        kursRupiah.focus();
        return;
    }

    // ==================================================
    // 7. AJAX UPDATE
    // ==================================================
    $.ajax({
        type: 'PUT',
        url: '/Kencana/UpdateKursBKMKencana/proses',

        data: {
            _token: csrfToken,
            idPelunasan: idPelunasan.value,
            idbkm: idbkm.value,
            kursRupiah: nilaiKurs
        },

        success: function (response) {

            console.log('Response Controller:', response);

            if (response.success) {

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    html: response.success,
                    returnFocus: false
                }).then(() => {

                    // Reset input
                    kursRupiah.value = 0;
                    rowDataPertama = null;
                    idPelunasan.value = '';
                    idbkm.value = '';

                    // Hilangkan centang
                    $('#tableData tbody input[name="penerimaCheckbox"]')
                        .prop('checked', false);

                    // Refresh tabel
                    fetchDataPelunasan();
                });
            }
        },

        error: function (xhr, status, error) {

            console.error('UPDATE KURS BKM ERROR');
            console.error('Response:', xhr.responseText);
            console.error('Status:', status);
            console.error('Error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Gagal Update',
                text: xhr.responseText || error
            });
        }
    });

});
