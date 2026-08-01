$(function () {
    let table = $('#tblBonKas').DataTable({
        data: bonKas,
        pageLength: 10,
        order: [[2, 'desc']],
        columns: [
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {
                data: 'KodeBonKas',
                render: function (data, type, row) {
                    return `
                        <a href="javascript:void(0)"
                        class="link-bon-kas"
                        data-id="${row.IdBonKas}">
                            ${data}
                        </a>
                    `;
                }
            },
            {
                data: 'Tanggal',
                render: function (data) {
                    let d = new Date(data);
                    let hari = String(d.getDate()).padStart(2, '0');
                    let bulan = String(d.getMonth() + 1).padStart(2, '0');
                    let tahun = d.getFullYear();

                    return `${hari}-${bulan}-${tahun}`;
                }
            },
            {
                data: 'JenisBonKas',
                render: function (data) {
                    return data === 'P'
                        ? 'Bon Kas Putih'
                        : 'Bon Kas Merah';
                }
            },
            {
                data: 'Jumlah',
                render: $.fn.dataTable.render.number('.', ',', 2)
            },
            {
                data: 'Uraian'
            },
            {
                data: 'NamaPenerima'
            },
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function (data) {

                    //status -> save
                    switch (data.Aksi) {
                        // status -> submit
                        case 'ACC':
                            return `
                                <button
                                    class="btn btn-warning btn-sm btn-acc"
                                    data-id="${data.IdBonKas}">
                                    ACC
                                </button>

                                <button
                                    class="btn btn-danger btn-sm btn-cancel"
                                    data-id="${data.IdBonKas}">
                                    Batal ACC
                                </button>
                            `;

                        default:
                            return '';
                    }
                }
            }
        ]
    });

    // Filter custom DataTable
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {

        if (settings.nTable.id !== 'tblBonKas') {
            return true;
        }

        const filterTanggalAwal = $('#filterTanggalAwal').val();
        const filterTanggalAkhir = $('#filterTanggalAkhir').val();
        const filterJenis = $('#filterJenisBonKas').val();

        // Ambil data asli baris langsung dari DataTables
        const row = settings.aoData[dataIndex]._aData;

        if (!row) {
            return true;
        }

        // FILTER TANGGAL
        if (filterTanggalAwal || filterTanggalAkhir) {

            let tanggalRow = '';

            if (row.Tanggal) {
                const tanggal = new Date(row.Tanggal);

                const tahun = tanggal.getFullYear();
                const bulan = String(tanggal.getMonth() + 1).padStart(2, '0');
                const hari = String(tanggal.getDate()).padStart(2, '0');

                tanggalRow = `${tahun}-${bulan}-${hari}`;
            }

            if (filterTanggalAwal && tanggalRow < filterTanggalAwal) {
                return false;
            }

            if (filterTanggalAkhir && tanggalRow > filterTanggalAkhir) {
                return false;
            }
        }

        // FILTER JENIS BON KAS
        if (filterJenis && row.JenisBonKas !== filterJenis) {
            return false;
        }

        return true;
    });

    let zoom = 1;
    $(document).on('click','.preview-image',function(){

        zoom = 1;

        $('#previewImage')
            .attr('src',this.src)
            .css('transform','scale(1)');

        bootstrap.Modal
            .getOrCreateInstance(
                document.getElementById('imagePreviewModal')
            )
            .show();

    });

    function penyebut(nilai) {
        nilai = Math.floor(Math.abs(nilai));

        const huruf = [
            "", "Satu", "Dua", "Tiga", "Empat",
            "Lima", "Enam", "Tujuh", "Delapan",
            "Sembilan", "Sepuluh", "Sebelas"
        ];

        if (nilai < 12) {
            return huruf[nilai];
        } else if (nilai < 20) {
            return penyebut(nilai - 10) + " Belas";
        } else if (nilai < 100) {
            return penyebut(Math.floor(nilai / 10)) + " Puluh" +
                (nilai % 10 ? " " + penyebut(nilai % 10) : "");
        } else if (nilai < 200) {
            return "Seratus" +
                (nilai - 100 ? " " + penyebut(nilai - 100) : "");
        } else if (nilai < 1000) {
            return penyebut(Math.floor(nilai / 100)) + " Ratus" +
                (nilai % 100 ? " " + penyebut(nilai % 100) : "");
        } else if (nilai < 2000) {
            return "Seribu" +
                (nilai - 1000 ? " " + penyebut(nilai - 1000) : "");
        } else if (nilai < 1000000) {
            return penyebut(Math.floor(nilai / 1000)) + " Ribu" +
                (nilai % 1000 ? " " + penyebut(nilai % 1000) : "");
        } else if (nilai < 1000000000) {
            return penyebut(Math.floor(nilai / 1000000)) + " Juta" +
                (nilai % 1000000 ? " " + penyebut(nilai % 1000000) : "");
        } else if (nilai < 1000000000000) {
            return penyebut(Math.floor(nilai / 1000000000)) + " Miliar" +
                (nilai % 1000000000 ? " " + penyebut(nilai % 1000000000) : "");
        } else if (nilai < 1000000000000000) {
            return penyebut(Math.floor(nilai / 1000000000000)) + " Triliun" +
                (nilai % 1000000000000 ? " " + penyebut(nilai % 1000000000000) : "");
        }

        return "";
    }


    $('#filterTanggalAwal, #filterTanggalAkhir, #filterJenisBonKas').on('change', function () {
        table.draw();
    });

    $('#modalKirim').on('shown.bs.modal', function () {
        if (!$('#nomorUser').hasClass('select2-hidden-accessible')) {
            $('#nomorUser').select2({
                dropdownParent: $('#modalKirim'),
                width: '100%',
                placeholder: 'Cari Nomor User atau Nama User',
                allowClear: true,
                minimumResultsForSearch: 0
            });
        }

    });

    // Klik tombol kirim
    $(document).on('click', '.btn-kirim', function () {

        $('#idBonKas').val($(this).data('id'));
        $('#kodeBonKas').val($(this).data('kode'));

        $('#nomorUser').val(null).trigger('change');

    });

    // // Proses kirim
    // $('#btnProsesKirim').on('click', function () {

    //     let idBonKas = $('#idBonKas').val();
    //     let nomorUser = $('#nomorUser').val();

    //     if (!nomorUser) {
    //         Swal.fire({
    //             icon: 'warning',
    //             title: 'Peringatan',
    //             text: 'Pilih user tujuan terlebih dahulu.'
    //         });
    //         return;
    //     }

    //     $.ajax({
    //         url: '/bon-kas/' + idBonKas,
    //         type: 'POST',
    //         data: {
    //             _token: $('meta[name="csrf-token"]').attr('content'),
    //             _method: 'PUT',
    //             action: 'kirimBonKas',
    //             nomorUser: nomorUser
    //         },
    //         success: function (res) {

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Berhasil',
    //                 text: res.message,
    //                 confirmButtonText: 'OK'
    //             }).then(() => {
    //                 $('#modalKirim').modal('hide');
    //                 location.reload();
    //             });

    //         },
    //         error: function (xhr) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Gagal',
    //                 text: xhr.responseJSON?.message ?? 'Terjadi kesalahan.'
    //             });
    //         }
    //     });

    // });

    $(document).on('click', '.btn-acc', function () {
        let idBonKas = $(this).data('id');

        // Ambil data Bon Kas dari array
        const data = bonKas.find(x => x.IdBonKas == idBonKas);

        if (!data) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Data Bon Kas tidak ditemukan.'
            });
            return;
        }

        // ==============================
        // Fungsi ACC (dipakai sekali)
        // ==============================
        function prosesACC() {

            $.ajax({
                url: '/bon-kas/' + idBonKas,
                type: 'POST',
                data: {
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    _method: 'PUT',
                    action: 'accBonKas'
                },
                success: function (res) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: res.message
                    }).then(() => {
                        location.reload();
                    });

                },
                error: function (xhr) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: xhr.responseJSON?.message ?? 'Terjadi kesalahan.'
                    });

                }
            });

        }

        // =====================================
        // Ada Penyesuaian
        // =====================================
        if (data.JenisBonKas === 'P' && Number(data.TotalPenyesuaian) > 0) {

            const jumlah = Number(data.Jumlah);
            const totalMerah = Number(data.TotalPenyesuaian);
            const selisih = jumlah - totalMerah;

            let title = '';
            let icon = '';
            let selisihClass = '';

            if (selisih === 0) {
                title = 'Jumlah Sudah Sesuai';
                icon = 'success';
            }
            else if (selisih > 0) {
                title = 'Informasi Lebih Bayar';
                icon = 'info';
                selisihClass = 'table-success';
            }
            else {
                title = 'Informasi Kurang Bayar';
                icon = 'info';
                selisihClass = 'table-danger';
            }

            Swal.fire({
                icon: icon,
                title: title,
                width: '900px',

                html: `
                    <style>

                        .swal-bonkas-table{
                            width:100%;
                            border-collapse:collapse;
                            table-layout:fixed;
                        }

                        .swal-bonkas-table th,
                        .swal-bonkas-table td{
                            border:1px solid #212529;
                            padding:8px;
                            vertical-align:middle;
                        }

                        .swal-bonkas-table th{
                            background:#f8f9fa;
                            text-align:center;
                            font-weight:bold;
                        }

                        .selisih-success th,
                        .selisih-success td{
                            background:#19e86c;
                            color:#000;
                            font-weight:bold;
                        }

                        .selisih-danger th,
                        .selisih-danger td{
                            background:#ff4d5f;
                            color:#000;
                            font-weight:bold;
                        }

                    </style>

                    <table class="swal-bonkas-table">

                        <tr>

                            <th style="width:20%">
                                Kode Bon Kas Merah
                            </th>

                            <td style="width:30%">
                                ${
                                    data.KodeBonKasMerah
                                        ? data.KodeBonKasMerah.replaceAll(',', '<br>')
                                        : '-'
                                }
                            </td>

                            <th style="width:20%">
                                Total Bon Kas Merah
                            </th>

                            <td style="width:30%;text-align:right;white-space:nowrap">
                                Rp ${totalMerah.toLocaleString('id-ID',{
                                    minimumFractionDigits:2,
                                    maximumFractionDigits:2
                                })}
                            </td>

                        </tr>

                        <tr>

                            <th>
                                Kode Bon Kas Putih
                            </th>

                            <td>
                                ${data.KodeBonKas}
                            </td>

                            <th>
                                Total Bon Kas Putih
                            </th>

                            <td style="text-align:right;white-space:nowrap">
                                Rp ${jumlah.toLocaleString('id-ID',{
                                    minimumFractionDigits:2,
                                    maximumFractionDigits:2
                                })}
                            </td>

                        </tr>

                        <tr class="${
                            selisih < 0
                                ? 'selisih-danger'
                                : 'selisih-success'
                        }">

                            <th colspan="3">
                                ${
                                    selisih < 0
                                        ? 'Selisih'
                                        : selisih > 0
                                            ? 'Selisih'
                                            : 'Sesuai'
                                }
                            </th>

                            <td style="text-align:right">
                                Rp ${Math.abs(selisih).toLocaleString('id-ID',{
                                    minimumFractionDigits:2,
                                    maximumFractionDigits:2
                                })}
                            </td>

                        </tr>

                    </table>

                    <div class="fw-bold mt-3">
                        ACC Bon Kas?
                    </div>
                `,

                showCancelButton: true,
                confirmButtonText: 'Ya, ACC',
                cancelButtonText: 'Batal',
                reverseButtons: true

            }).then((result) => {
                if (!result.isConfirmed)
                    return;

                prosesACC();
            });
        }

        // =====================================
        // Tidak Ada Penyesuaian
        // =====================================
        else {
            Swal.fire({
                title: 'ACC Bon Kas?',
                text: 'Data yang sudah di-ACC tidak dapat diubah.',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Ya, ACC',
                cancelButtonText: 'Batal',
                reverseButtons: true

            }).then((result) => {
                if (!result.isConfirmed)
                    return;
                prosesACC();
            });
        }
    });

    $(document).on('click', '.btn-cancel', function () {
        let idBonKas = $(this).data('id');

        Swal.fire({
            title: 'Batalkan Pengiriman?',
            text: 'Bon Kas akan dikembalikan ke status awal.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Batalkan',
            cancelButtonText: 'Tidak',
            reverseButtons: true
        }).then((result) => {

            if (!result.isConfirmed) return;

            $.ajax({
                url: '/bon-kas/' + idBonKas,
                type: 'POST',
                data: {
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    _method: 'PUT',
                    action: 'cancelBonKas'
                },
                success: function (res) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: res.message
                    }).then(() => {
                        location.reload();
                    });

                },
                error: function (xhr) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: xhr.responseJSON?.message ?? 'Terjadi kesalahan.'
                    });
                }
            });
        });
    });

    $(document).on('click', '.btn-delete', function () {
        const idBonKas = $(this).data('id');

        Swal.fire({
            title: 'Hapus Bon Kas?',
            text: 'Data yang dihapus tidak dapat dikembalikan.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#dc3545',
            reverseButtons: true
        }).then((result) => {
            if (!result.isConfirmed) {
                return;
            }

            $.ajax({
                url: '/bon-kas/' + idBonKas,
                type: 'POST',
                data: {
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    _method: 'PUT',
                    action: 'deleteBonKas'
                },
                success: function (res) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: res.message
                    }).then(() => {
                        location.reload();
                    });

                },
                error: function (xhr) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: xhr.responseJSON?.message ?? 'Terjadi kesalahan.'
                    });
                }
            });
        });
    });

    $(document).on('click', '.btn-print', function () {
        let id = $(this).data('id');
        let data = bonKas.find(x => x.IdBonKas == id);

        if (!data) return;

        let tgl = new Date(data.Tanggal);

        $('#printJenisBonKas').text(
            data.JenisBonKas === 'P'
                ? 'BON KAS PUTIH'
                : 'BON KAS MERAH'
        );

        $('#printTanggal').text(
            String(tgl.getDate()).padStart(2, '0') + '-' +
            String(tgl.getMonth() + 1).padStart(2, '0') + '-' +
            tgl.getFullYear()
        );

        $('#printJumlah').text(Number(data.Jumlah).toLocaleString('id-ID', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
        $('#printTerbilang').text(penyebut(Number(data.Jumlah)).trim() + " Rupiah");
        $('#printUraian').text(data.Uraian ?? '');
        $('#printPenerima').text(data.NamaPenerima ?? '');
        $('#printMengetahui').text(data.NamaMengetahui ?? '');
        $('#printKasir').text(data.NamaKasir ?? '');
        $('#printNoPO').text(data.NoPO ? data.NoPO : '-');
        const section = $('#printDokumentasiSection');
        const container = $('#printDokumentasi');
        container.empty();

        if (data.TtdPenerima) {
            $('#ttdPenerima')
                .attr('src', 'data:image/png;base64,' + data.TtdPenerima)
                .show();
        } else {
            $('#ttdPenerima').hide();
        }

        if (parseInt(data.Status) >= 2) {
            $('#printMengetahui').text(data.NamaMengetahui ?? '');

            if (data.TtdMengetahui) {
                $('#ttdMengetahui')
                    .attr('src', 'data:image/png;base64,' + data.TtdMengetahui)
                    .show();
            } else {
                $('#ttdMengetahui').hide();
            }
        } else {
            $('#printMengetahui').text('');
            $('#ttdMengetahui').hide();

        }

        if (data.TtdKasir) {
            $('#ttdKasir')
                .attr('src', 'data:image/png;base64,' + data.TtdKasir)
                .show();
        } else {
            $('#ttdKasir').hide();
        }

        let jumlahGambar = 0;
        if (data.Dokumentasi) {
            const files = data.Dokumentasi.match(/data:[^,]+;base64,[^,]+/g);

            if (files) {
                files.forEach(file => {
                    if (file.startsWith('data:image/')) {
                        container.append(`<img src="${file}">`);
                        jumlahGambar++;
                    }
                });
            }
        }

        // Tampilkan hanya jika ada gambar
        section.toggle(jumlahGambar > 0);

        $('#printArea').show();

        setTimeout(function () {
            console.log(data);
            window.print();

            $('#printArea').hide();

        }, 100);
    });

   $(document).on('click', '.btn-download', function () {
        let id = $(this).data('id');

        let form = $('<form>', {
            action: '/bon-kas/' + id,
            method: 'POST'
        });

        form.append(`
            <input type="hidden" name="_token" value="${$('meta[name="csrf-token"]').attr('content')}">
            <input type="hidden" name="_method" value="PUT">
            <input type="hidden" name="action" value="downloadDokumentasi">
        `);

        $('body').append(form);

        form.submit();
    });

    $(document).on('click', '.btn-kasir', function () {
        let idBonKas = $(this).data('id');

        Swal.fire({
            title: 'ACC Kasir?',
            text: 'Kasir akan menyetujui Bon Kas ini.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, ACC',
            cancelButtonText: 'Batal',
            reverseButtons: true
        }).then((result) => {

            if (!result.isConfirmed) return;

            $.ajax({
                url: '/bon-kas/' + idBonKas,
                type: 'POST',
                data: {
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    _method: 'PUT',
                    action: 'accKasir'
                },
                success: function (res) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: res.message
                    }).then(() => {
                        location.reload();
                    });

                },
                error: function (xhr) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: xhr.responseJSON?.message ?? 'Terjadi kesalahan.'
                    });
                }
            });
        });
    });


    $(document).on('click', '.link-bon-kas', function (e) {
        e.preventDefault();

        const id = $(this).data('id');
        const data = bonKas.find(x => x.IdBonKas == id);

        if (!data) {
            console.log('Data Bon Kas tidak ditemukan');
            return;
        }

        const tgl = new Date(data.Tanggal);

        // Tentukan modal view
        const modal =
            data.JenisBonKas === 'P'
                ? $('#modalViewBonKasPutih')
                : $('#modalViewBonKasMerah');

        modal.modal('show');

        // ===========================
        // HEADER
        // ===========================

        modal.find('#kodeBonKasForm').val(data.KodeBonKas);

        modal.find('#tanggal').val(
            tgl.getFullYear() + '-' +
            String(tgl.getMonth() + 1).padStart(2, '0') + '-' +
            String(tgl.getDate()).padStart(2, '0')
        );

        // ===========================
        // DATA
        // ===========================

        modal.find('#jumlah').val(
            Number(data.Jumlah).toLocaleString('id-ID', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
        );

        modal.find('#terbilang').text(
            '(' + penyebut(Number(data.Jumlah)).trim() + ' Rupiah)'
        );

        modal.find('#noPO').val(data.NoPO ?? '');
        modal.find('#uraian').val(data.Uraian ?? '');

        // ===========================
        // PENYESUAIAN BON KAS MERAH
        // ===========================
        if (
            data.JenisBonKas === 'P' &&
            data.KodeBonKasMerah &&
            data.KodeBonKasMerah !== ''
        ) {
            modal.find('#panelPenyesuaian').show();
            modal.find('#viewKodeBonKasMerah').html(
                data.KodeBonKasMerah.replaceAll(',', '<br>')
            );

            const totalMerah = Number(data.TotalBonKasMerah);
            const totalPutih = Number(data.Jumlah);
            const selisih = totalMerah - totalPutih;

            modal.find('#viewTotalBonKasMerah').text(
                Number(data.TotalBonKasMerah).toLocaleString('id-ID', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            );
            modal.find('#viewSelisih').text(
                Math.abs(selisih).toLocaleString('id-ID', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            );

            // Beri warna sesuai hasil
            const tdSelisih = modal.find('#viewSelisih').closest('td');
            const thSelisih = tdSelisih.prev('th');

            tdSelisih.removeClass('table-danger table-success table-warning');
            thSelisih.removeClass('table-danger table-success table-warning');

            if (selisih > 0) {
                // Bon Kas Merah lebih besar
                tdSelisih.addClass('table-danger');
                thSelisih.addClass('table-danger');
            }
            else if (selisih < 0) {
                // Bon Kas Putih lebih besar
                tdSelisih.addClass('table-success');
                thSelisih.addClass('table-success');
            }
            else {
                // Sama
                tdSelisih.addClass('table-success');
                thSelisih.addClass('table-success');
            }
        }
        else {

            modal.find('#panelPenyesuaian').hide();
            modal.find('#viewKodeBonKasMerah').empty();
            modal.find('#viewTotalBonKasMerah').empty();
            modal.find('#viewSelisih').empty();

        }

        // ===========================
        // PENERIMA
        // ===========================

        modal.find('#namaPenerima').text(
            data.NamaPenerima ?? 'Belum Ditentukan'
        );

        if (data.TtdPenerima) {
            modal.find('#ttdPenerimaModal')
                .attr('src', 'data:image/png;base64,' + data.TtdPenerima)
                .show();
        } else {
            modal.find('#ttdPenerimaModal').hide();
        }

        // ===========================
        // MENGETAHUI
        // ===========================

        if (parseInt(data.Status) >= 1) {
            modal.find('#namaMengetahui').text(data.NamaMengetahui ?? '');
        } else {
            modal.find('#namaMengetahui').text('');
        }

        if (parseInt(data.Status) >= 2 && data.TtdMengetahui) {
            modal.find('#ttdMengetahuiModal')
                .attr('src', 'data:image/png;base64,' + data.TtdMengetahui)
                .show();
        } else {
            modal.find('#ttdMengetahuiModal').hide();
        }

        // ===========================
        // KASIR
        // ===========================

        modal.find('#namaKasir').text(
            data.NamaKasir ?? 'Belum Ditentukan'
        );

        if (data.TtdKasir) {
            modal.find('#ttdKasirModal')
                .attr('src', 'data:image/png;base64,' + data.TtdKasir)
                .show();
        } else {
            modal.find('#ttdKasirModal').hide();
        }

        // ===========================
        // DOKUMENTASI
        // ===========================

        const container = modal.find('#listDokumentasi');

        container.empty();

        if (!data.Dokumentasi || data.Dokumentasi.trim() === '') {
            container.html(`
                <div class="col-12 text-center text-muted">
                    Tidak ada dokumentasi.
                </div>
            `);

        } else {
            const files = data.Dokumentasi.match(/data:[^;]+;base64,[A-Za-z0-9+/=\r\n]+/g);

            if (!files || files.length === 0) {
                container.html(`
                    <div class="col-12 text-center text-muted">
                        Tidak ada dokumentasi.
                    </div>
                `);

            } else {
                files.forEach(function(file){
                    if(file.startsWith('data:image/')){
                        container.append(`
                            <div class="col-md-3 mb-3">
                                <img
                                    src="${file}"
                                    class="img-fluid rounded border preview-image"
                                    style="
                                        width:100%;
                                        height:180px;
                                        object-fit:cover;
                                        cursor:zoom-in;
                                    ">
                            </div>
                        `);
                    }

                    else if(file.startsWith('data:application/pdf')){
                        container.append(`
                            <div class="col-md-4 mb-3">
                                <div class="pdf-card border rounded shadow-sm p-3 d-flex align-items-center"
                                    data-src="${file}">
                                    <div class="me-3">
                                        <div style="
                                            width:54px;
                                            height:54px;
                                            background:#dc3545;
                                            color:#fff;
                                            border-radius:8px;
                                            display:flex;
                                            justify-content:center;
                                            align-items:center;
                                            font-weight:bold;
                                            font-size:18px;">
                                            PDF
                                        </div>
                                    </div>

                                    <div class="flex-grow-1 overflow-hidden">
                                        <div class="fw-bold text-truncate" style="padding-left: 10px">
                                            Dokumen PDF
                                        </div>

                                        <small class="text-muted" style="padding-left: 10px">
                                            Klik untuk membuka preview
                                        </small>
                                    </div>
                                </div>
                            </div>
                        `);
                    }
                });
            }
        }
    });

    $('#previewImage').on('wheel',function(e){
        e.preventDefault();
        zoom += e.originalEvent.deltaY < 0 ? 0.2 : -0.2;
        zoom = Math.max(1,Math.min(zoom,6));

        $(this).css(
            'transform',
            `scale(${zoom})`
        );
    });

    $('#previewImage').on('dblclick',function(){
        zoom = zoom==1 ? 2 : 1;

        $(this).css(
            'transform',
            `scale(${zoom})`
        );
    });

     $(document).on('click', '.pdf-card', function () {

        const pdf = $(this).data('src');

        const base64 = pdf.split(',')[1];

        const binary = atob(base64);

        const bytes = new Uint8Array(binary.length);

        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        const blob = new Blob([bytes], {
            type: 'application/pdf'
        });

        const url = URL.createObjectURL(blob);

        window.open(url, '_blank');
    });


    $('#pdfPreviewModal').on('hidden.bs.modal',function(){
        $('#pdfFrame').attr('src','');
    });

    $('#imagePreviewModal').on('hidden.bs.modal', function () {
        $('body').removeClass('modal-open');
        $('body').css({
            overflow:'',
            paddingRight:''
        });

        if (
            $('#modalViewBonKasPutih').hasClass('show') ||
            $('#modalViewBonKasMerah').hasClass('show')
        ) {
            $('body').addClass('modal-open');
        }

    });
});
