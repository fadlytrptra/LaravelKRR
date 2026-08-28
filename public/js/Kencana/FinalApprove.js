//#region Variable

let tableFinalApprove;

const btnProses = document.getElementById('btnProses');
const checkAll = document.getElementById('checkAll');

//#endregion


//#region Function

function loadData() {

    tableFinalApprove = $('#tblFinalApprove').DataTable({

        processing: true,

        // Controller show('data') mengembalikan seluruh data,
        // bukan format server-side DataTables
        serverSide: false,

        searching: true,
        ordering: true,

        autoWidth: false,
        responsive: false,

        scrollX: true,

        pageLength: 10,

        ajax: {

            url: '/Kencana/FinalApprove/data',

            type: 'GET',

            dataSrc: 'data'
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
                data: 'Kd_div',
                defaultContent: ''
            },

            {
                data: 'Tgl_acc',
                defaultContent: '',
                render: function (data) {

                    if (!data) return '';

                    return moment(data).format('DD/MM/YYYY');
                }
            },

            {
                data: 'nama_sub_kategori',
                defaultContent: ''
            },

            {
                data: 'NAMA_BRG',
                defaultContent: ''
            },

            {
                data: 'Qty',
                className: 'text-right',
                render: function (data) {

                    if (data === null || data === undefined) {
                        return '';
                    }

                    return $.fn.dataTable.render
                        .number(',', '.', 2)
                        .display(data);
                }
            },

            {
                data: 'Nama_satuan',
                defaultContent: ''
            },

            {
                data: 'HargaPerkiraan',
                className: 'text-right',
                render: function (data) {

                    if (data === null || data === undefined) {
                        return '';
                    }

                    return $.fn.dataTable.render
                        .number(',', '.', 2)
                        .display(data);
                }
            },

            {
                data: 'keterangan',
                defaultContent: ''
            },

            {
                data: 'Kd_brg',
                defaultContent: ''
            },

            {
                data: 'HasDokumentasi',
                orderable: false,
                searchable: false,
                className: 'text-center',

                render: function (data, type, row) {

                    if (Number(data) === 1) {

                        return `
                            <button
                                type="button"
                                class="btn btn-sm btn-primary btn-download-dokumentasi"
                                data-no-trans="${row.No_trans}">
                                <i class="fas fa-download"></i>
                                Download
                            </button>
                        `;
                    }

                    return `
                        <button
                            type="button"
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


//#endregion


//#region Selected Data

function getSelectedData() {

    let data = [];

    $('#tblFinalApprove tbody .chkItem:checked')
        .each(function () {

            let row = tableFinalApprove
                .row($(this).closest('tr'))
                .data();

            if (row) {

                data.push(row);

            }

        });

    return data;
}


//#endregion


//#region Proses Setuju

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

        text:
            'Proses persetujuan item yang dipilih?',

        icon: 'question',

        showCancelButton: true,

        confirmButtonText: 'Ya, Proses',

        cancelButtonText: 'Batal'

    }).then((result) => {

        if (!result.isConfirmed) {
            return;
        }


        $.ajax({

            url:
                '/Kencana/FinalApprove/prosesSetuju',

            type: 'PUT',

            data: {

                _token:
                    $('meta[name="csrf-token"]').attr('content'),

                data: selected

            },


            beforeSend: function () {

                btnProses.disabled = true;

                btnProses.innerHTML = `
                    <i class="fas fa-spinner fa-spin"></i>
                    Memproses...
                `;
            },


            success: function (res) {

                Swal.fire({

                    icon: 'success',

                    title: 'Berhasil',

                    text:
                        res.message ??
                        'Proses telah selesai.'

                });


                tableFinalApprove
                    .ajax
                    .reload(null, false);


                checkAll.checked = false;
            },


            error: function (xhr) {

                console.error(xhr);

                Swal.fire({

                    icon: 'error',

                    title: 'Error',

                    text:
                        xhr.responseJSON?.message ??
                        'Terjadi kesalahan saat memproses data.'

                });

            },


            complete: function () {

                btnProses.disabled = false;

                btnProses.innerHTML = `
                    <i class="fa fa-check"></i>
                    Proses Setuju
                `;
            }

        });

    });
}


//#endregion


//#region Ganti Level

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

        text:
            'Ganti level ACC untuk item yang dipilih?',

        icon: 'question',

        showCancelButton: true,

        confirmButtonText: 'Ya, Proses',

        cancelButtonText: 'Batal'

    }).then((result) => {

        if (!result.isConfirmed) {
            return;
        }


        $.ajax({

            url:
                '/Kencana/FinalApprove/gantiLevel',

            type: 'PUT',

            data: {

                _token:
                    $('meta[name="csrf-token"]').attr('content'),

                data: selected

            },


            success: function (res) {

                Swal.fire({

                    icon: 'success',

                    title: 'Berhasil',

                    html:
                        'Ganti level ACC telah selesai diproses.' +
                        '<br><br>' +

                        'Saat ini proses persetujuan harus tetap dilakukan.' +
                        '<br>' +

                        'Untuk selanjutnya persetujuan hanya sampai level manager.' +
                        '<br><br>' +

                        '<b>Silakan klik tombol Proses Setuju.</b>'

                });

            },


            error: function (xhr) {

                Swal.fire({

                    icon: 'error',

                    title: 'Error',

                    text:
                        xhr.responseJSON?.message ??
                        'Terjadi kesalahan.'

                });

            }

        });

    });
}


//#endregion


//#region Check All

function pilihSemua(status) {

    $('#tblFinalApprove tbody .chkItem')
        .prop('checked', status);
}


//#endregion


//#region Event Listener

$(document).ready(function () {

    loadData();

});


checkAll.addEventListener(
    'change',
    function () {

        pilihSemua(this.checked);

    }
);


btnProses.addEventListener(
    'click',
    function () {

        prosesSetuju();

    }
);


$(document).on(
    'change',
    '#tblFinalApprove tbody .chkItem',
    function () {

        let total =
            $('#tblFinalApprove tbody .chkItem').length;

        let checked =
            $('#tblFinalApprove tbody .chkItem:checked').length;


        checkAll.checked =
            total > 0 &&
            total === checked;

    }
);


//#endregion


//#region Download Dokumentasi

$(document).on(
    'click',
    '.btn-download-dokumentasi',
    function () {

        const noTrans =
            $(this).data('no-trans');


        window.location.href =
            '/Kencana/FinalApproveKencana/dokumentasi/' +
            encodeURIComponent(noTrans);

    }
);


//#endregion