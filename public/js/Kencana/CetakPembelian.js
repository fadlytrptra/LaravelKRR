$(document).ready(function () {

    console.log('CetakPembelian.js loaded');

    let tableCetakPembelian = null;

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = year + '-' + month + '-' + day;

    $('#tanggalMulai').val(todayString);
    $('#tanggalSelesai').val(todayString);


    // =========================================================
    // CARI DATA
    // =========================================================
    $('#btnCari').on('click', function () {

        let tanggalMulai = $('#tanggalMulai').val();
        let tanggalSelesai = $('#tanggalSelesai').val();


        // =====================================================
        // VALIDASI TANGGAL
        // =====================================================
        if (!tanggalMulai) {

            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Tanggal mulai harus dipilih.'
            });

            return;
        }


        if (!tanggalSelesai) {

            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Tanggal selesai harus dipilih.'
            });

            return;
        }


        if (tanggalMulai > tanggalSelesai) {

            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Tanggal mulai tidak boleh lebih besar dari tanggal selesai.'
            });

            return;
        }


        loadData(
            tanggalMulai,
            tanggalSelesai
        );

    });


    // =========================================================
    // LOAD DATA
    // =========================================================
    function loadData(
        tanggalMulai,
        tanggalSelesai
    ) {

        console.log(
            'LOAD CETAK PEMBELIAN'
        );

        console.log(
            'Tanggal Mulai:',
            tanggalMulai
        );

        console.log(
            'Tanggal Selesai:',
            tanggalSelesai
        );


        $.ajax({

            url:
                '/Kencana/CetakPembelian/getData',

            type:
                'GET',

            data: {

                tanggalMulai:
                    tanggalMulai,

                tanggalSelesai:
                    tanggalSelesai
            },


            beforeSend:
                function () {

                    $('body').css(
                        'cursor',
                        'wait'
                    );

                    $('#btnCari')
                        .prop(
                            'disabled',
                            true
                        )
                        .text(
                            'Memuat...'
                        );
                },


            success:
                function (response) {

                    console.log(
                        'GET DATA RESPONSE:',
                        response
                    );


                    if (
                        !response.success
                    ) {

                        Swal.fire({

                            icon:
                                'error',

                            title:
                                'Error',

                            text:
                                response.message
                                ||
                                'Gagal mengambil data.'
                        });

                        return;
                    }


                    renderTable(
                        response.data || []
                    );


                    // =================================================
                    // JIKA TIDAK ADA DATA
                    // =================================================
                    if (
                        !response.data ||
                        response.data.length === 0
                    ) {

                        Swal.fire({

                            icon:
                                'info',

                            title:
                                'Data Tidak Ditemukan',

                            text:
                                'Tidak ada SPPB yang sudah ACC Direktur pada periode tersebut.'
                        });
                    }

                },


            error:
                function (
                    xhr,
                    status,
                    error
                ) {

                    console.error(
                        'GET DATA ERROR'
                    );

                    console.error(
                        'HTTP:',
                        xhr.status
                    );

                    console.error(
                        'STATUS:',
                        status
                    );

                    console.error(
                        'ERROR:',
                        error
                    );

                    console.error(
                        'RESPONSE:',
                        xhr.responseText
                    );


                    let pesan =
                        'Gagal mengambil data Cetak Pembelian.';


                    if (
                        xhr.responseJSON &&
                        xhr.responseJSON.message
                    ) {

                        pesan =
                            xhr.responseJSON.message;
                    }


                    Swal.fire({

                        icon:
                            'error',

                        title:
                            'Error',

                        text:
                            pesan
                    });

                },


            complete:
                function () {

                    $('body').css(
                        'cursor',
                        'default'
                    );

                    $('#btnCari')
                        .prop(
                            'disabled',
                            false
                        )
                        .text(
                            'Cari'
                        );
                }

        });

    }


    // =========================================================
    // RENDER DATATABLE
    // =========================================================
    function renderTable(data) {

        console.log(
            'DATA TABLE:',
            data
        );


        // =====================================================
        // DESTROY DATATABLE LAMA
        // =====================================================
        if (
            $.fn.DataTable.isDataTable(
                '#tableCetakPembelian'
            )
        ) {

            tableCetakPembelian
                .clear()
                .destroy();
        }


        // =====================================================
        // DATATABLE BARU
        // =====================================================
        tableCetakPembelian =
            $('#tableCetakPembelian')
                .DataTable({

                    data:
                        data,

                    destroy:
                        true,

                    processing:
                        true,

                    responsive:
                        true,

                    autoWidth:
                        false,

                    searching:
                        false,

                    ordering:
                        true,

                    paging:
                        true,

                    pageLength:
                        10,

                    lengthMenu: [
                        [10, 25, 50, 100],
                        [10, 25, 50, 100]
                    ],


                    language: {

                        emptyTable:
                            'Tidak ada data.',

                        processing:
                            'Memuat data...',

                        lengthMenu:
                            'Tampilkan _MENU_ data',

                        info:
                            'Menampilkan _START_ sampai _END_ dari _TOTAL_ data',

                        infoEmpty:
                            'Tidak ada data',

                        paginate: {

                            first:
                                'Pertama',

                            last:
                                'Terakhir',

                            next:
                                'Berikutnya',

                            previous:
                                'Sebelumnya'
                        }
                    },


                    columns: [

                        // =================================================
                        // NO
                        // =================================================
                        {
                            data:
                                null,

                            className:
                                'text-center',

                            orderable:
                                false,

                            render:
                                function (
                                    data,
                                    type,
                                    row,
                                    meta
                                ) {

                                    return (
                                        meta.row + 1
                                    );
                                }
                        },


                        // =================================================
                        // NO SPPB
                        // =================================================
                        {
                            data:
                                'No_sppb',

                            defaultContent:
                                '-',

                            render:
                                function (
                                    data
                                ) {

                                    if (!data) {
                                        return '-';
                                    }

                                    return String(
                                        data
                                    ).trim();
                                }
                        },


                        // =================================================
                        // TGL SPPB
                        // =================================================
                        {
                            data:
                                'Tgl_sppb',

                            defaultContent:
                                '-',

                            render:
                                function (
                                    data
                                ) {

                                    return formatTanggal(
                                        data
                                    );
                                }
                        },


                        // =================================================
                        // DIVISI
                        // =================================================
                        {
                            data:
                                null,

                            render:
                                function (
                                    data
                                ) {

                                    let kdDiv =
                                        data.Kd_div
                                        ?
                                        String(
                                            data.Kd_div
                                        ).trim()
                                        :
                                        '';


                                    let namaDiv =
                                        data.NM_DIV
                                        ?
                                        String(
                                            data.NM_DIV
                                        ).trim()
                                        :
                                        '';


                                    if (
                                        !kdDiv &&
                                        !namaDiv
                                    ) {

                                        return '-';
                                    }


                                    if (!namaDiv) {

                                        return kdDiv;
                                    }


                                    if (!kdDiv) {

                                        return namaDiv;
                                    }


                                    return (
                                        kdDiv
                                        +
                                        ' - '
                                        +
                                        namaDiv
                                    );
                                }
                        },


                        // =================================================
                        // SUPPLIER
                        // =================================================
                        {
                            data:
                                null,

                            render:
                                function (
                                    data
                                ) {

                                    let supplier =
                                        data.Supplier
                                        ?
                                        String(
                                            data.Supplier
                                        ).trim()
                                        :
                                        '';


                                    let namaSupplier =
                                        data.NM_SUP
                                        ?
                                        String(
                                            data.NM_SUP
                                        ).trim()
                                        :
                                        '';


                                    if (
                                        !supplier &&
                                        !namaSupplier
                                    ) {

                                        return `
                                            <span class="text-danger fw-bold">
                                                Supplier belum ada
                                            </span>
                                        `;
                                    }


                                    if (!namaSupplier) {

                                        return supplier;
                                    }


                                    if (!supplier) {

                                        return namaSupplier;
                                    }


                                    return (
                                        supplier
                                        +
                                        ' - '
                                        +
                                        namaSupplier
                                    );
                                }
                        },


                        // =================================================
                        // DIREKTUR
                        // =================================================
                        {
                            data:
                                'Direktur',

                            defaultContent:
                                '-',

                            className:
                                'text-center',

                            render:
                                function (
                                    data
                                ) {

                                    if (!data) {
                                        return '-';
                                    }

                                    return String(
                                        data
                                    ).trim();
                                }
                        },


                        // =================================================
                        // TGL ACC DIREKTUR
                        // =================================================
                        {
                            data:
                                'Tgl_Direktur',

                            defaultContent:
                                '-',

                            render:
                                function (
                                    data
                                ) {

                                    return formatTanggalWaktu(
                                        data
                                    );
                                }
                        },


                        // =================================================
                        // ACTION
                        // =================================================
                        {
                            data:
                                null,

                            className:
                                'text-center',

                            orderable:
                                false,

                            searchable:
                                false,

                            render:
                                function (
                                    data
                                ) {

                                    let kdDiv =
                                        data.Kd_div
                                        ?
                                        String(
                                            data.Kd_div
                                        ).trim()
                                        :
                                        '';


                                    let noSPPB =
                                        data.No_sppb
                                        ?
                                        String(
                                            data.No_sppb
                                        ).trim()
                                        :
                                        '';


                                    let supplier =
                                        data.Supplier
                                        ?
                                        String(
                                            data.Supplier
                                        ).trim()
                                        :
                                        '';


                                    // =================================================
                                    // EMAIL BUTTON
                                    // =================================================
                                    let emailButton =
                                        '';


                                    if (!supplier) {

                                        emailButton = `

                                            <button
                                                type="button"
                                                class="btn btn-sm btn-secondary btn-email"
                                                data-kd-div="${escapeHtml(kdDiv)}"
                                                data-no-sppb="${escapeHtml(noSPPB)}"
                                            >
                                                EMAIL
                                            </button>

                                        `;

                                    } else {

                                        emailButton = `

                                            <button
                                                type="button"
                                                class="btn btn-sm btn-success btn-email"
                                                data-kd-div="${escapeHtml(kdDiv)}"
                                                data-no-sppb="${escapeHtml(noSPPB)}"
                                            >
                                                EMAIL
                                            </button>

                                        `;
                                    }


                                    return `

                                        <div
                                            class="d-flex justify-content-center gap-1"
                                        >

                                            <button
                                                type="button"
                                                class="btn btn-sm btn-primary btn-print"
                                                data-kd-div="${escapeHtml(kdDiv)}"
                                                data-no-sppb="${escapeHtml(noSPPB)}"
                                            >
                                                PRINT
                                            </button>

                                            ${emailButton}

                                        </div>

                                    `;
                                }
                        }

                    ]

                });

    }


    // =========================================================
    // ACTION PRINT
    // =========================================================
    $('#tableCetakPembelian tbody')
        .on(
            'click',
            '.btn-print',
            function () {

                let kdDiv =
                    $(this).attr(
                        'data-kd-div'
                    );


                let noSPPB =
                    $(this).attr(
                        'data-no-sppb'
                    );


                console.log(
                    'PRINT:',
                    kdDiv,
                    noSPPB
                );


                if (
                    !kdDiv ||
                    !noSPPB
                ) {

                    Swal.fire({

                        icon:
                            'warning',

                        title:
                            'Peringatan',

                        text:
                            'Kode divisi dan No SPPB tidak tersedia.'
                    });

                    return;
                }


                const url =
                    '/Kencana/CetakPembelian/print'
                    +
                    '?KdDiv='
                    +
                    encodeURIComponent(
                        kdDiv
                    )
                    +
                    '&NoSPPB='
                    +
                    encodeURIComponent(
                        noSPPB
                    );


                window.open(
                    url,
                    '_blank'
                );

            }
        );


    // =========================================================
    // ACTION EMAIL
    // =========================================================
    $('#tableCetakPembelian tbody')
        .on(
            'click',
            '.btn-email',
            function () {

                let button =
                    $(this);


                let kdDiv =
                    button.attr(
                        'data-kd-div'
                    );


                let noSPPB =
                    button.attr(
                        'data-no-sppb'
                    );


                // =================================================
                // AMBIL DATA ROW
                // =================================================
                let row =
                    tableCetakPembelian
                        .row(
                            button.closest('tr')
                        )
                        .data();


                let supplier =
                    row &&
                    row.Supplier
                    ?
                    String(
                        row.Supplier
                    ).trim()
                    :
                    '';


                console.log(
                    'EMAIL:',
                    {
                        kdDiv:
                            kdDiv,

                        noSPPB:
                            noSPPB,

                        supplier:
                            supplier
                    }
                );


                // =================================================
                // SUPPLIER NULL
                // =================================================
                if (!supplier) {

                    Swal.fire({

                        icon:
                            'warning',

                        title:
                            'Supplier Belum Ada',

                        text:
                            'Supplier untuk SPPB '
                            +
                            noSPPB
                            +
                            ' belum tersedia.'
                    });

                    return;
                }


                // =================================================
                // KONFIRMASI
                // =================================================
                Swal.fire({

                    title:
                        'Kirim SPPB ke Supplier?',

                    html:
                        'SPPB <b>'
                        +
                        noSPPB
                        +
                        '</b> akan dikirim ke email supplier.',

                    icon:
                        'question',

                    showCancelButton:
                        true,

                    confirmButtonText:
                        'Ya, Kirim',

                    cancelButtonText:
                        'Batal'

                })
                .then(
                    function (result) {

                        if (
                            !result.isConfirmed
                        ) {

                            return;
                        }


                        kirimEmail(
                            kdDiv,
                            noSPPB,
                            button
                        );

                    }
                );

            }
        );


    // =========================================================
    // KIRIM EMAIL
    // =========================================================
    function kirimEmail(
        kdDiv,
        noSPPB,
        button
    ) {

        $.ajax({

            url:
                '/Kencana/CetakPembelian/sendEmailSupplier',

            type:
                'POST',

            headers: {

                'X-CSRF-TOKEN':
                    $('meta[name="csrf-token"]')
                        .attr('content')
            },


            data: {

                KdDiv:
                    kdDiv,

                NoSPPB:
                    noSPPB
            },


            timeout:
                120000,


            beforeSend:
                function () {

                    button
                        .prop(
                            'disabled',
                            true
                        )
                        .text(
                            'KIRIM...'
                        );


                    Swal.fire({

                        title:
                            'Mengirim Email...',

                        text:
                            'Mohon tunggu.',

                        allowOutsideClick:
                            false,

                        allowEscapeKey:
                            false,

                        didOpen:
                            function () {

                                Swal.showLoading();
                            }
                    });

                },


            success:
                function (
                    response
                ) {

                    if (
                        response.success
                    ) {

                        Swal.fire({

                            icon:
                                'success',

                            title:
                                'Berhasil',

                            text:
                                response.message
                        });

                    } else {

                        Swal.fire({

                            icon:
                                'warning',

                            title:
                                'Peringatan',

                            text:
                                response.message
                        });
                    }

                },


            error:
                function (
                    xhr,
                    status,
                    error
                ) {

                    console.error(
                        'EMAIL ERROR:',
                        xhr.responseText
                    );


                    let pesan =
                        'Gagal mengirim email.';


                    if (
                        xhr.responseJSON &&
                        xhr.responseJSON.message
                    ) {

                        pesan =
                            xhr.responseJSON.message;
                    }


                    if (
                        status ===
                        'timeout'
                    ) {

                        pesan =
                            'Server terlalu lama merespons. '
                            +
                            'Proses pengiriman email mungkin masih berjalan.';
                    }


                    Swal.fire({

                        icon:
                            'error',

                        title:
                            'Error',

                        text:
                            pesan
                    });

                },


            complete:
                function () {

                    button
                        .prop(
                            'disabled',
                            false
                        )
                        .text(
                            'EMAIL'
                        );
                }

        });

    }


    // =========================================================
    // FORMAT TANGGAL
    // =========================================================
    function formatTanggal(
        tanggal
    ) {

        if (!tanggal) {
            return '-';
        }


        let date =
            new Date(tanggal);


        if (
            isNaN(
                date.getTime()
            )
        ) {

            return tanggal;
        }


        let day =
            String(
                date.getDate()
            ).padStart(
                2,
                '0'
            );


        let month =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                '0'
            );


        let year =
            date.getFullYear();


        return (
            day
            +
            '/'
            +
            month
            +
            '/'
            +
            year
        );
    }


    // =========================================================
    // FORMAT TANGGAL + JAM
    // =========================================================
    function formatTanggalWaktu(
        tanggal
    ) {

        if (!tanggal) {
            return '-';
        }


        let date =
            new Date(tanggal);


        if (
            isNaN(
                date.getTime()
            )
        ) {

            return tanggal;
        }


        let day =
            String(
                date.getDate()
            ).padStart(
                2,
                '0'
            );


        let month =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                '0'
            );


        let year =
            date.getFullYear();


        let hour =
            String(
                date.getHours()
            ).padStart(
                2,
                '0'
            );


        let minute =
            String(
                date.getMinutes()
            ).padStart(
                2,
                '0'
            );


        return (
            day
            +
            '/'
            +
            month
            +
            '/'
            +
            year
            +
            ' '
            +
            hour
            +
            ':'
            +
            minute
        );
    }


    // =========================================================
    // ESCAPE HTML
    // =========================================================
    function escapeHtml(
        value
    ) {

        return String(
            value ?? ''
        )
            .replace(
                /&/g,
                '&amp;'
            )
            .replace(
                /</g,
                '&lt;'
            )
            .replace(
                />/g,
                '&gt;'
            )
            .replace(
                /"/g,
                '&quot;'
            )
            .replace(
                /'/g,
                '&#039;'
            );
    }

});