$(document).ready(function () {

    //#region Variable
    let selectedData = null;
    let dokumentasiFiles = [];
    let dokumentasiLama = [];
    const today = new Date().toISOString().split('T')[0];
    $('#tgl1').val(today);
    $('#tgl2').val(today);
    let xhrLoadBarang = null;
    let xhrLoadMesin = null;

    //#endregion


    //#region Datatable

    const table = $('#tableSPPB').DataTable({
        processing: true,
        serverSide: true,
        searching: true,
        ordering: true,
        autoWidth: false,
        responsive: false,
        ajax: {
            url: '/Kencana/PermohonanPembelian/getData',
            type: 'GET',
            data: function (d) {

                d.MinDate = $('#tgl1').val();
                d.MaxDate = $('#tgl2').val();
                d.Kd_Div = $('#divisi').val();

                if ($('#operator').is(':checked')) {
                    d.Operator = currentUser;
                } else {
                    d.Operator = null;
                }

                console.log(currentUser);
                console.log(d);
            }
        },
        columns: [
            {
                data: 'Tgl_order',
                name: 'Tgl_order',
                render: function (data) {

                    if (!data) return '';

                    let tgl = new Date(data);

                    let month = String(tgl.getMonth() + 1).padStart(2, '0');
                    let day = String(tgl.getDate()).padStart(2, '0');
                    let year = tgl.getFullYear();

                    return `${month}/${day}/${year}`;
                }
            },
            {
                data: 'Kd_brg',
                name: 'Kd_brg'
            },
            {
                data: 'NAMA_BRG',
                name: 'NAMA_BRG'
            },
            {
                data: 'Qty',
                name: 'Qty',
                className: 'text-end',
                render: function (data) {

                    if (!data) return '';

                    return parseFloat(data).toLocaleString('id-ID', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });

                }
            },
            {
                data: 'Nama_satuan',
                name: 'Nama_satuan'
            },
            {
                data: 'No_trans',
                name: 'No_trans'
            }
        ]
    });

    //#endregion


    //#region Function
    function loadDivisi() {
        $.ajax({
            url: '/Kencana/PermohonanPembelian/getDivisi',
            type: 'GET',
            success: function (response) {
                let divisi = $('#divisi');
                divisi.empty();
                $.each(response, function (i, item) {
                    divisi.append(
                        $('<option>', {
                            value: item.Kd_div,
                            text: item.NM_DIV
                        })
                    );
                });

                if (response.length > 0) {
                    divisi.val(response[0].Kd_div);

                    loadGolongan(response[0].Kd_div);

                    table.ajax.reload();
                }
            }
        });
    }

    function loadGolongan(kdDiv) {
        $.ajax({
            url: '/Kencana/PermohonanPembelian/getGolongan',
            type: 'GET',
            data: {
                KdDiv: kdDiv
            },
            success: function (response) {
                console.log(response);
                let gol = $('#modalGolongan');

                gol.empty();
                gol.append('<option value="">-- Pilih Golongan --</option>');

                $.each(response.data, function (i, item) {

                    gol.append(
                        `<option value="${item.NO_GOL}">
                            ${item.NM_GOL}
                        </option>`
                    );

                });
            }
        });

    }

    function loadMesin(noGol, callback = null) {
        $.ajax({
            url: '/Kencana/PermohonanPembelian/getMesin',
            type: 'GET',
            data: {
                NoGol: noGol
            },
            success: function (response) {

                let mesin = $('#modalMesin');

                mesin.empty();
                mesin.append('<option value="">-- Pilih Mesin --</option>');

                $.each(response.data, function (i, item) {
                    mesin.append(
                        `<option value="${item.NO_MSN}">
                            ${item.NM_MSN}
                        </option>`
                    );
                });

                if (callback) {
                    callback();
                }
            }
        });

    }

    function loadDetail(noTrans) {
        $.ajax({
            url: '/Kencana/PermohonanPembelian/getDetail',
            type: 'GET',
            data: {
                No_Trans: noTrans
            },

            success: function (response) {
                if (!response.success) {
                    clearDetail();
                    return;
                }

                let d = response.data;

                $('#KategoriUtama').text(d.KategoriUtama ?? '');
                $('#Kategori').text(d.Kategori ?? '');
                $('#SubKategori').text(d.SubKategori ?? '');
                $('#KetBarang').text(d.KetBarang ?? '');
                $('#KetPemesan').text(d.KetPemesan ?? '');
                $('#GolMesin').text(d.GolMesin ?? '');
                $('#NamaMesin').text(d.NamaMesin ?? '');
                $('#Pemesan').text(d.Pemesan ?? '');
                $('#Operator').text(d.Operator ?? '');

                // ACC Manager
                if (d.Tgl_acc) {
                    $('#AccManager').text(
                        formatTanggal(d.Tgl_acc) + ' by: ' + (d.Manager ?? '')
                    );
                } else {
                    $('#AccManager').text('');
                }

                // ACC Direksi
                if (d.Tgl_Direktur) {
                    $('#AccDireksi').text(
                        formatTanggal(d.Tgl_Direktur) + ' by: ' + (d.Direktur ?? '')
                    );
                } else {
                    $('#AccDireksi').text('');
                }

                $('#NoSPPB').text(d.No_sppb ?? '');
                $('#KetBatal').text(d.Batal_acc ?? '');

                // Disable tombol jika sudah ACC Manager
                const allowUpdate = d.Tgl_acc == null;

                $('.btn-warning').prop('disabled', !allowUpdate);
                $('.btn-danger').prop('disabled', !allowUpdate);

            },

            error: function (xhr) {
                console.error(xhr);
                clearDetail();
                alert('Gagal mengambil detail permohonan.');
            }
        });
    }


    function clearDetail() {
        $('#KategoriUtama').text('');
        $('#Kategori').text('');
        $('#SubKategori').text('');
        $('#KetBarang').text('');
        $('#KetPemesan').text('');
        $('#GolMesin').text('');
        $('#NamaMesin').text('');
        $('#Pemesan').text('');
        $('#Operator').text('');
        $('#AccManager').text('');
        $('#AccDireksi').text('');
        $('#NoSPPB').text('');
    }


    function reloadData() {
        clearDetail();
        selectedData = null;
        table.ajax.reload();
    }

    function formatTanggal(tanggal) {
        if (!tanggal) return '';

        return new Date(tanggal).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    function padKodeBarang(kode) {
        return kode.toString().padStart(9, '0');
    }

    function loadBarang(kode) {

        kode = padKodeBarang(kode);

        $('#KdBarang').val(kode);

        $.ajax({

            url: '/Kencana/PermohonanPembelian/getBarang',

            type: 'GET',

            data: {
                KdBarang: kode,
                KdDiv: $('#divisi').val()
            },

            success: function (res) {
                console.log(res);
                if (!res.success) {
                    alert('Kode barang tidak ditemukan.');
                    return;
                }

                let d = res.data;

                $('#modalKategoriUtama').val(d.KategoriUtama);
                $('#modalKategori').val(d.Kategori);
                $('#modalSubKategori').val(d.SubKategori);
                $('#modalKetKhusus').val(d.KetKhusus ?? '-');
                $('#modalNamaBarang').val(d.NamaBarang);
                $('#modalKetBarang').val(d.KetBarang);

                $('#modalstokPrimer').text(d.Primer);
                $('#modalsatPrimer').text(d.SatPrimer);

                $('#modalstokSekunder').text(d.Sekunder);
                $('#modalsatSekunder').text(d.SatSekunder);

                $('#modalstokTritier').text(d.Tritier);
                $('#modalsatTritier').text(d.SatTritier);

                $('#NoSatuan').val(d.NoSatuan);

                $('#modalFotoBarang').attr(
                    'src',
                    d.Foto
                        ? 'data:image/jpeg;base64,' + d.Foto
                        : '/images/no-image.png'
                );

                $('#modalGolongan').focus();

            }
        });

    }

    function isiModalKoreksi(data) {

        $('#modalMode').val('edit');
        $('#modalNoTrans').val(data.NoTrans);

        // Reset file baru
        dokumentasiFiles = [];

        // Ambil dokumentasi lama dari database
        dokumentasiLama = data.DokumentasiFile || [];

        // Load seluruh informasi barang
        loadBarang(data.KdBarang);

        $('#modalGolongan').val(data.NoGol);

        loadMesin(data.NoGol, function () {
            $('#modalMesin').val(data.NoMesin);
        });

        $('#modalKetOrder').val(data.Keterangan);
        $('#modalQty').val(
            parseFloat(data.Qty || 0).toFixed(2)
        );
        $('#modalPemesan').val(data.Pemesan);
        $('#modalTglButuh').val(data.TglDibutuhkan);

        // Kosongkan input file
        $('#modalDokumentasi').val('');

        // Tampilkan file lama
        tampilkanDokumentasi();

        $('#modalPermohonan').modal('show');
    }

    function tampilkanListDokumentasi() {
        const container = $('#fileDokumentasiInfo');

        container.empty();

        if (dokumentasiFiles.length === 0) {
            return;
        }

        dokumentasiFiles.forEach(function (file, index) {

            const ukuranMB = (
                file.size / 1024 / 1024
            ).toFixed(2);

            container.append(`
                <div class="alert alert-info py-2 px-3 mb-1
                            d-flex align-items-center justify-content-between">

                    <div class="text-truncate">

                        <i class="fa fa-paperclip me-1"></i>

                        <strong>
                            ${escapeHtml(file.name)}
                        </strong>

                        <span class="text-muted ms-1">
                            (${ukuranMB} MB)
                        </span>

                    </div>

                    <button type="button"
                            class="btn btn-sm btn-danger
                                btn-hapus-dokumentasi ms-2"
                            data-index="${index}">
                        <i class="fa fa-trash"></i>
                    </button>

                </div>
            `);

        });
    }

    // untuk koreksi
    function tampilkanDokumentasi() {
        const container = $('#fileDokumentasiInfo');
        container.empty();

        dokumentasiLama.forEach(function (file, index) {
            const ukuran = file.data
                ? formatBase64Size(file.data)
                : '';

            container.append(`
                <div class="alert alert-info py-2 px-3 mb-1
                            d-flex align-items-center justify-content-between">

                    <div class="text-truncate">

                        <i class="fa fa-paperclip me-1"></i>

                        <strong>
                            ${escapeHtml(file.nama)}
                        </strong>

                        <span class="text-muted ms-1">
                            ${ukuran}
                        </span>

                    </div>

                    <button type="button"
                            class="btn btn-sm btn-danger
                                btn-hapus-dokumentasi-lama ms-2"
                            data-index="${index}">
                        <i class="fa fa-trash"></i>
                    </button>

                </div>
            `);

        });

        dokumentasiFiles.forEach(function (file, index) {
            const ukuranMB = (
                file.size / 1024 / 1024
            ).toFixed(2);

            container.append(`
                <div class="alert alert-success py-2 px-3 mb-1
                            d-flex align-items-center justify-content-between">

                    <div class="text-truncate">

                        <i class="fa fa-paperclip me-1"></i>

                        <strong>
                            ${escapeHtml(file.name)}
                        </strong>

                        <span class="text-muted ms-1">
                            (${ukuranMB} MB)
                        </span>

                    </div>

                    <button type="button"
                            class="btn btn-sm btn-danger
                                btn-hapus-dokumentasi-baru ms-2"
                            data-index="${index}">
                        <i class="fa fa-trash"></i>
                    </button>

                </div>
            `);

        });
    }

    function escapeHtml(text) {
        return $('<div>')
            .text(text)
            .html();
    }

    function formatBase64Size(base64) {
        if (!base64) return '';

        const bytes = Math.ceil(
            (base64.length * 3) / 4
        );

        const mb = bytes / 1024 / 1024;

        return `(${mb.toFixed(2)} MB)`;
    }

    //#endregion


    //#region Add Event Listener

    loadDivisi();


    $('#divisi').on('change', function () {
        reloadData();
        loadGolongan($(this).val());
    });


    $('#tgl1,#tgl2').on('change', function () {
        reloadData();
    });


    $('#operator').on('change', function () {
        reloadData();
    });

    $('#modalGolongan').on('change', function () {
        loadMesin($(this).val());
    });


    $('#tableSPPB tbody').on('click', 'tr', function () {
        $('#tableSPPB tbody tr').removeClass('table-active');
        $(this).addClass('table-active');
        selectedData = table.row(this).data();

        if (!selectedData)
            return;

        loadDetail(selectedData.No_trans);
    });


    $('#btnIsi').on('click', function (e) {
        e.preventDefault();
        // ==========================================================
        // BATALKAN AJAX LAMA
        // ==========================================================

        if (xhrLoadBarang) {
            xhrLoadBarang.abort();
            xhrLoadBarang = null;
        }

        if (xhrLoadMesin) {
            xhrLoadMesin.abort();
            xhrLoadMesin = null;
        }


        // ==========================================================
        // MODE INSERT DULU
        // ==========================================================

        $('#modalMode').val('insert');
        $('#modalNoTrans').val('');


        // ==========================================================
        // RESET KODE BARANG
        // ==========================================================

        $('#KdBarang').val('');


        // ==========================================================
        // RESET INFORMASI BARANG
        // ==========================================================

        $('#modalKategoriUtama').val('');
        $('#modalKategori').val('');
        $('#modalSubKategori').val('');
        $('#modalKetKhusus').val('');
        $('#modalNamaBarang').val('');
        $('#modalKetBarang').val('');


        // ==========================================================
        // RESET GOLONGAN & MESIN
        // ==========================================================

        $('#modalGolongan').val('');

        $('#modalMesin')
            .empty()
            .append(
                '<option value="">-- Pilih Mesin --</option>'
            );


        // ==========================================================
        // RESET KETERANGAN
        // ==========================================================

        $('#modalKetOrder').val('');


        // ==========================================================
        // RESET QTY & PEMESAN
        // ==========================================================

        $('#modalQty').val('');
        $('#modalPemesan').val('');
        $('#NoSatuan').val('');


        // ==========================================================
        // RESET DOKUMENTASI
        // ==========================================================

        dokumentasiFiles = [];
        dokumentasiLama = [];

        $('#modalDokumentasi').val('');
        $('#fileDokumentasiInfo').empty();


        // ==========================================================
        // RESET FOTO
        // ==========================================================

        $('#modalFotoBarang').attr(
            'src',
            '/images/no-image.png'
        );


        // ==========================================================
        // RESET STOCK
        // ==========================================================

        $('#modalstokPrimer').text('0');
        $('#modalsatPrimer').text('');

        $('#modalstokSekunder').text('0');
        $('#modalsatSekunder').text('');

        $('#modalstokTritier').text('0');
        $('#modalsatTritier').text('');


        // ==========================================================
        // TANGGAL = HARI INI + 7
        // ==========================================================

        let tgl = new Date();

        tgl.setDate(
            tgl.getDate() + 7
        );

        $('#modalTglButuh').val(
            tgl.toISOString().split('T')[0]
        );


        // ==========================================================
        // TAMPILKAN MODAL
        // ==========================================================

        $('#modalPermohonan').modal('show');
    });



    $('#KdBarang').on('keydown', function (e) {
        if (e.key !== 'Enter')
            return;

        e.preventDefault();

        loadBarang($(this).val());

    });

    $('#btnCariBarang').click(function () {

        loadBarang($('#KdBarang').val());

    });

    $('#btnProses').on('click', function () {
        let mode = $('#modalMode').val();

        // Ambil semua file yang sudah dipilih
        let files = dokumentasiFiles;

        let data = {
            _token: $('meta[name="csrf-token"]').attr('content'),
            KdDiv: $('#divisi').val(),
            KdBarang: $('#KdBarang').val(),
            Golongan: $('#modalGolongan').val(),
            Mesin: $('#modalMesin').val(),
            KetOrder: $('#modalKetOrder').val(),
            Qty: $('#modalQty').val(),
            NoSatuan: $('#NoSatuan').val(),
            Pemesan: $('#modalPemesan').val(),
            TglButuh: $('#modalTglButuh').val()
        };


        // ==========================================================
        // JIKA ADA FILE
        // ==========================================================

        if (files.length > 0 || mode === 'edit') {

            let allowedTypes = [
                'image/jpeg',
                'image/png',
                'image/webp',
                'application/pdf'
            ];


            // ======================================================
            // VALIDASI SEMUA FILE
            // ======================================================

            for (let file of files) {

                // Maksimal 10 MB per file
                if (file.size > 10 * 1024 * 1024) {

                    alert(
                        'File "' + file.name +
                        '" melebihi ukuran maksimal 10 MB.'
                    );

                    return;
                }


                // Validasi format
                if (!allowedTypes.includes(file.type)) {

                    alert(
                        'Format file "' + file.name +
                        '" tidak diperbolehkan.\n\n' +
                        'Format yang diperbolehkan: ' +
                        'JPG, JPEG, PNG, WEBP atau PDF.'
                    );

                    return;
                }
            }


            // ======================================================
            // FORM DATA
            // ======================================================

            let formData = new FormData();


            // Data permohonan
            $.each(data, function (key, value) {
                formData.append(key, value ?? '');
            });


            // File lama yang masih dipertahankan
            if (mode === 'edit') {
                formData.append(
                    'DokumentasiLama',
                    JSON.stringify(dokumentasiLama)
                );
            }

            files.forEach(function (file) {
                formData.append(
                    'DokumentasiFile[]',
                    file
                );

            });


            // ======================================================
            // KOREKSI + FILE
            // ======================================================

            if (mode === 'edit') {
                formData.append('_method', 'PUT');

                $.ajax({
                    url: '/Kencana/PermohonanPembelian/' +
                        $('#modalNoTrans').val(),
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        alert(res.message);
                        $('#modalPermohonan').modal('hide');
                        table.ajax.reload();
                    },

                    error: function (xhr) {
                        console.log(xhr);
                        alert('Gagal mengoreksi data.');
                    }
                });
            }


            // ======================================================
            // ISI + FILE
            // ======================================================

            else {

                $.ajax({
                    url: '/Kencana/PermohonanPembelian',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,

                    success: function (res) {
                        alert(res.message);
                        $('#modalPermohonan').modal('hide');
                        table.ajax.reload();
                    },

                    error: function (xhr) {
                        console.log(xhr);
                        alert('Gagal menyimpan.');
                    }
                });
            }
            return;
        }


        // ==========================================================
        // TIDAK ADA FILE
        // ALUR LAMA TETAP DIPERTAHANKAN
        // ==========================================================

        if (mode === 'edit') {

            $.ajax({

                url: '/Kencana/PermohonanPembelian/' +
                    $('#modalNoTrans').val(),

                type: 'PUT',

                data: data,

                success: function (res) {

                    alert(res.message);

                    $('#modalPermohonan').modal('hide');

                    table.ajax.reload();

                },

                error: function (xhr) {

                    console.log(xhr);

                    alert('Gagal mengoreksi data.');

                }

            });

        } else {

            $.ajax({

                url: '/Kencana/PermohonanPembelian',

                type: 'POST',

                data: data,

                success: function (res) {

                    alert(res.message);

                    $('#modalPermohonan').modal('hide');

                    table.ajax.reload();

                },

                error: function (xhr) {

                    console.log(xhr);

                    alert('Gagal menyimpan.');

                }

            });

        }

    });

    $('#btn-koreksi').on('click', function () {
        if (!selectedData) {
            Swal.fire({
                icon: 'warning',
                title: 'Pilih data terlebih dahulu'
            });
            return;
        }

        $.ajax({
            url: '/Kencana/PermohonanPembelian/getKoreksi',
            type: 'GET',
            data: {
                NoTrans: selectedData.No_trans
            },
            success: function (res) {

                if (!res.success) {
                    Swal.fire('Gagal', res.message, 'warning');
                    return;
                }

                isiModalKoreksi(res.data);

            },
            error: function (xhr) {
                console.log(xhr);
                Swal.fire('Error', 'Gagal mengambil data.', 'error');
            }
        });
    });

    $('#btnHapus').on('click', function () {
        if (!selectedData) {
            Swal.fire({
                icon: 'warning',
                title: 'Pilih data terlebih dahulu'
            });
            return;
        }

        Swal.fire({
            title: 'Hapus Permohonan?',
            text: 'Permohonan pembelian "' + selectedData.NAMA_BRG + '" akan dihapus.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then((result) => {

            if (!result.isConfirmed)
                return;

            $.ajax({

                url: '/Kencana/PermohonanPembelian/' + selectedData.No_trans,

                type: 'POST',

                data: {
                    _method: 'DELETE',
                    _token: $('meta[name="csrf-token"]').attr('content')
                },

                success: function (res) {

                    Swal.fire({
                        icon: 'success',
                        title: res.message
                    });

                    reloadData();

                },

                error: function (xhr) {

                    if (xhr.responseJSON) {

                        Swal.fire({
                            icon: 'warning',
                            title: xhr.responseJSON.message
                        });

                    } else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal menghapus data.'
                        });

                    }

                }

            });

        });

    });

    $('#modalDokumentasi').on('change', function () {
        const files = Array.from(this.files);

        if (files.length === 0) {
            return;
        }

        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'application/pdf'
        ];

        files.forEach(function (file) {

            // Validasi format
            if (!allowedTypes.includes(file.type)) {

                alert(
                    'File "' + file.name +
                    '" tidak diperbolehkan.\n' +
                    'Gunakan JPG, JPEG, PNG, WEBP atau PDF.'
                );

                return;
            }

            // Validasi ukuran
            if (file.size > 10 * 1024 * 1024) {

                alert(
                    'File "' + file.name +
                    '" melebihi ukuran maksimal 10 MB.'
                );

                return;
            }

            // Cek duplikat
            const sudahAda = dokumentasiFiles.some(function (existingFile) {

                return existingFile.name === file.name &&
                    existingFile.size === file.size &&
                    existingFile.lastModified === file.lastModified;

            });

            if (sudahAda) {
                return;
            }

            // Tambahkan ke array
            dokumentasiFiles.push(file);

        });

        tampilkanListDokumentasi();

        // Kosongkan input supaya file yang sama
        // tetap bisa dipilih kembali
        this.value = '';

    });

    $(document).on(
        'click',
        '.btn-hapus-dokumentasi',
        function (e) {

            e.preventDefault();
            e.stopPropagation();

            const index = parseInt(
                $(this).attr('data-index'),
                10
            );

            // Hapus HANYA file berdasarkan index
            dokumentasiFiles.splice(index, 1);

            // Tampilkan ulang daftar
            tampilkanListDokumentasi();

        }
    );

    // koreksi
    $(document).on(
        'click',
        '.btn-hapus-dokumentasi-lama',
        function (e) {

            e.preventDefault();
            e.stopPropagation();

            const index = parseInt(
                $(this).attr('data-index'),
                10
            );

            dokumentasiLama.splice(index, 1);

            tampilkanDokumentasi();
        }
    );

    // file baru saat koreksi
    $(document).on(
        'click',
        '.btn-hapus-dokumentasi-baru',
        function (e) {

            e.preventDefault();
            e.stopPropagation();

            const index = parseInt(
                $(this).attr('data-index'),
                10
            );

            dokumentasiFiles.splice(index, 1);

            tampilkanDokumentasi();
        }
    );

    //#endregion

});
