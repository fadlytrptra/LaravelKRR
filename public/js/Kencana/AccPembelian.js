//#region Variable
let tableAccPembelian;
const btnProses = document.getElementById('btnProses');
const checkAll = document.getElementById('checkAll');

//#endregion

//#region Function

function loadData() {
    tableAccPembelian = $('#tblAccPembelian').DataTable({
        processing: true,
        serverSide: true,
        searching: true,
        ordering: true,
        autoWidth: false,
        responsive: false,
        scrollX: true,
        pageLength: 10,
        ajax: {
            url: '/Kencana/AccPembelian/getData',
            type: 'GET'
        },

        columns: [
            {
                data: null,
                orderable: false,
                searchable: false,
                className: 'text-center',
                render: function () {
                    return '<input type="checkbox" class="chkItem">';
                }
            },
            {
                data: 'Kd_div'
            },
            {
                data: 'Tgl_acc',
                render: function (data) {
                    if (!data) return '';
                    return moment(data).format('MM-DD-YYYY');
                }
            },
            {
                data: 'nama_sub_kategori'
            },
            {
                data: 'NAMA_BRG'
            },
            {
                data: 'Qty',
                className: 'text-right',
                render: $.fn.dataTable.render.number(',', '.', 2)
            },
            {
                data: 'Nama_satuan'
            },
            {
                data: 'HargaPerkiraan',
                className: 'text-right',
                render: $.fn.dataTable.render.number(',', '.', 2)
            },
            {
                data: 'keterangan'
            },
            {
                data: 'Kd_brg'
            },
            {
                data: 'HasDokumentasi',
                orderable: false,
                searchable: false,
                className: 'text-center',
                width: '120px',
                render: function (data, type, row) {

                    if (data == 1) {

                        return `
                            <button type="button"
                                    class="btn btn-sm btn-primary btn-download-dokumentasi"
                                    data-no-trans="${row.No_trans}">
                                <i class="fas fa-download"></i>
                                Download
                            </button>
                        `;
                    }

                    return `
                        <button type="button"
                                class="btn btn-sm btn-secondary"
                                disabled>
                            <i class="fas fa-download"></i>
                            Download
                        </button>
                    `;
                }
            }
        ]
    });
}

function getSelectedData() {
    let data = [];

    $('#tblAccPembelian tbody .chkItem:checked').each(function () {
        let row = tableAccPembelian.row($(this).closest('tr')).data();
        if (row) {
            data.push(row);
        }
    });
    return data;
}


function prosesSetuju() {
    let selected = getSelectedData();

    if (selected.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Silakan pilih minimal satu data.'
        });
        return;
    }

    Swal.fire({
        title: 'Konfirmasi',
        text: 'Proses persetujuan item yang dipilih?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal'

    }).then((result) => {
        if (!result.isConfirmed) return;

        $.ajax({
            url: '/Kencana/AccPembelian/prosesSetuju',
            type: 'PUT',
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                data: selected
            },
            beforeSend: function () {
                btnProses.disabled = true;
            },

            success: function (res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: res.message
                });

                tableAccPembelian.ajax.reload(null, false);
                checkAll.checked = false;
            },

            error: function (xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: xhr.responseJSON?.message ?? 'Terjadi kesalahan.'
                });
            },

            complete: function () {
                btnProses.disabled = false;
            }
        });
    });
}


function gantiLevelACC() {
    let selected = getSelectedData();

    if (selected.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Silakan pilih minimal satu data.'
        });
        return;
    }

    Swal.fire({
        title: 'Konfirmasi',
        text: 'Ganti level ACC untuk item yang dipilih?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal'

    }).then((result) => {
        if (!result.isConfirmed) return;
        $.ajax({
            url: '/Kencana/AccPembelian/gantiLevel',
            type: 'PUT',
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                data: selected
            },

            success: function (res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    html:
                        'Ganti level ACC telah selesai diproses.<br><br>' +
                        'Saat ini proses persetujuan harus tetap dilakukan.<br>' +
                        'Untuk selanjutnya persetujuan hanya sampai level manager.<br><br>' +
                        '<b>Silakan klik tombol Proses Setuju.</b>'
                });
            },

            error: function (xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: xhr.responseJSON?.message ?? 'Terjadi kesalahan.'
                });
            },
        });
    });
}

function pilihSemua(status) {
    $('#tblAccPembelian tbody .chkItem').prop('checked', status);
}

//#endregion


//#region AddEventListener
$(document).ready(function () {
    loadData();
});

checkAll.addEventListener('change', function () {
    pilihSemua(this.checked);
});

btnProses.addEventListener('click', function () {
    prosesSetuju();
});

$(document).on('change', '.chkItem', function () {
    let total = $('.chkItem').length;
    let checked = $('.chkItem:checked').length;

    checkAll.checked = (total > 0 && total === checked);
});

$(document).on(
    'click',
    '.btn-download-dokumentasi',
    function () {

        const noTrans = $(this).data('no-trans');

        window.location.href =
            '/Kencana/AccPembelian/dokumentasi/' +
            encodeURIComponent(noTrans);
    }
);

//#endregion
