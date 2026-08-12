//#region Variable

let tableAccPermohonan;

//#endregion


//#region Function

function initDataTable() {

    tableAccPermohonan = $('#tableAccPermohonan').DataTable({
        processing: true,
        serverSide: false,
        destroy: true,
        autoWidth: false,
        searching: true,
        paging: true,
        ordering: true,
        info: true,
        lengthChange: true,
        pageLength: 10,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "Semua"]
        ],

        ajax: {
            url: "/Kencana/AccPermohonan/getData",
            type: "GET",
            data: function (d) {
                d.action = $('input[name="action"]:checked').val();
            },
            dataSrc: ""
        },

        columns: [
            {
                data: null,
                orderable: false,
                searchable: false,
                width: "35px",
                className: "text-center",
                render: function (data) {
                    return `
                        <input type="checkbox"
                               class="check-item"
                               value="${data.No_trans}">
                    `;
                }
            },
            {
                data: "Kd_div",
                defaultContent: ""
            },
            {
                data: "Tgl_order",
                defaultContent: "",
                render: function (data) {

                    if (!data) return "";

                    return moment(data).format('DD/MM/YYYY');

                }
            },
            {
                data: "nama_sub_kategori",
                defaultContent: ""
            },
            {
                data: "NAMA_BRG",
                defaultContent: ""
            },
            {
                data: "Qty",
                defaultContent: "",
                className: "text-right"
            },
            {
                data: "Nama_satuan",
                defaultContent: ""
            },
            {
                data: "Tgl_Dibutuhkan",
                defaultContent: ""
            },
            {
                data: "keterangan",
                defaultContent: ""
            },
            {
                data: "Pemesan",
                defaultContent: ""
            },
            {
                data: "HasDokumentasi",
                orderable: false,
                searchable: false,
                className: "text-center",
                width: "120px",
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
        ],

        createdRow: function (row, data) {

            $(row).attr("data-no-trans", data.No_trans);
            $(row).attr("data-kd-brg", data.Kd_brg);

            let action = $('input[name="action"]:checked').val();

            if (action === 'acc') {

                if (data.Tgl_acc != null) {
                    $(row).css('color', 'red');
                } else {
                    $(row).css('color', 'black');
                }

            } else {

                // List batal ACC selalu hitam
                $(row).css('color', 'black');

            }

        },

        language: {
            processing: "Memuat data...",
            search: "Cari :",
            lengthMenu: "Tampilkan _MENU_ data",
            info: "Menampilkan _START_ - _END_ dari _TOTAL_ data",
            infoEmpty: "Tidak ada data",
            zeroRecords: "Data tidak ditemukan",
            emptyTable: "Tidak ada data",

            paginate: {
                first: "Awal",
                last: "Akhir",
                next: "›",
                previous: "‹"
            }
        }
    });
}

function reloadData() {
    $('#checkAll').prop('checked', false);
    tableAccPermohonan.ajax.reload(null, false);
}

function getSelectedData() {
    let selected = [];

    $('.check-item:checked').each(function () {
        selected.push($(this).val());

    });
    return selected;
}

function prosesAcc() {
    let action = $('input[name="action"]:checked').val();
    let selected = getSelectedData();

    if (selected.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Silakan pilih minimal satu data.'
        });
        return;
    }

    let text = action === 'acc'
        ? 'ACC permohonan yang dipilih?'
        : 'Batalkan ACC permohonan yang dipilih?';

    Swal.fire({
        title: 'Konfirmasi',
        text: text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal'

    }).then((result) => {
        if (!result.isConfirmed)
            return;

        $.ajax({
            url: '/Kencana/AccPermohonan/proses',
            type: 'PUT',
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                action: action,
                no_trans: selected
            },

            beforeSend: function () {
                $('#btnProses').prop('disabled', true);
            },

            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: response.message
                });

                reloadData();

                $('#checkAll').prop('checked', false);
            },

            error: function (xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: xhr.responseJSON.message
                });
            },

            complete: function () {
                $('#btnProses').prop('disabled', false);
            }
        });
    });
}

//#endregion


//#region Event Listener

$(document).ready(function () {
    initDataTable();
});


$(document).on('change', 'input[name="action"]', function () {
    reloadData();
});


$(document).on('change', '#checkAll', function () {
    $('.check-item').prop('checked', $(this).is(':checked'));
});


$('#tableAccPermohonan').on('draw.dt', function () {
    $('#checkAll').prop('checked', false);
});


$(document).on('click', '#btnProses', function () {
    prosesAcc();
});

$(document).on(
    'click',
    '.btn-download-dokumentasi',
    function () {

        const noTrans = $(this).data('no-trans');

        window.location.href =
            '/Kencana/AccPermohonan/dokumentasi/' +
            encodeURIComponent(noTrans);
    }
);

//#endregion
