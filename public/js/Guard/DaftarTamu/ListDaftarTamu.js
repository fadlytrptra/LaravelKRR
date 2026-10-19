$(document).ready(function () {
    const baseUrl = window.listDaftarTamuConfig.resourceUrl;

    const filterLokasi = document.getElementById('filterLokasi');

    if (filterLokasi) {
        function updateWarnaLokasi() {
            filterLokasi.classList.toggle(
                'filter-lokasi-semua',
                filterLokasi.value === ''
            );
        }

        updateWarnaLokasi();

        filterLokasi.addEventListener(
            'change',
            updateWarnaLokasi
        );
    }

    // Filter tanggal datang dan lokasi
    $.fn.dataTable.ext.search.push(function (
        settings,
        data,
        dataIndex
    ) {
        if (settings.nTable.id !== 'tableDaftarTamu') {
            return true;
        }

        const row = settings.aoData[dataIndex].nTr;

        const tanggal = row.dataset.tanggal || '';
        const lokasi = (row.dataset.lokasi || '').trim();

        const tanggalAwal = $('#tanggalAwal').val();
        const tanggalAkhir = $('#tanggalAkhir').val();
        const lokasiDipilih = $('#filterLokasi').val();

        // Filter tanggal awal berdasarkan TimeStamp
        if (tanggalAwal && (!tanggal || tanggal < tanggalAwal)) {
            return false;
        }

        // Filter tanggal akhir, termasuk tanggal yang dipilih
        if (tanggalAkhir && (!tanggal || tanggal > tanggalAkhir)) {
            return false;
        }

        // Filter lokasi
        if (
            lokasiDipilih &&
            lokasi.toLowerCase() !== lokasiDipilih.trim().toLowerCase()
        ) {
            return false;
        }

        return true;
    });

    // Inisialisasi DataTables
    const table = $('#tableDaftarTamu').DataTable({
        responsive: true,
        scrollX: true,
        pageLength: 10,
        order: [],
        language: {
            search: 'Cari:',
            lengthMenu: 'Tampilkan _MENU_ data',
            info: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ data',
            infoEmpty: 'Tidak ada data',
            zeroRecords: 'Data tidak ditemukan',
            emptyTable: 'Belum ada data tamu',
            paginate: {
                first: 'Pertama',
                last: 'Terakhir',
                next: 'Berikutnya',
                previous: 'Sebelumnya'
            }
        },
        initComplete: function () {
            $('#tableDaftarTamu_length, #tableDaftarTamu_info')
                .css('font-size', '14px');
        }
    });

    // Tombol Redisplay untuk menerapkan filter
    $('#btnRedisplay').on('click', function () {
        const tanggalAwal = $('#tanggalAwal').val();
        const tanggalAkhir = $('#tanggalAkhir').val();

        if (
            tanggalAwal &&
            tanggalAkhir &&
            tanggalAwal > tanggalAkhir
        ) {
            Swal.fire(
                'Perhatian',
                'Tanggal awal tidak boleh melebihi tanggal akhir.',
                'warning'
            );
            return;
        }

        table.draw();
    });

    // Ambil foto melalui method show()
    $(document).on('click', '.btnLihatFoto', function () {
        const id = $(this).data('id');
        const jenis = $(this).data('jenis');

        $.ajax({
            url: `${baseUrl}/${id}`,
            type: 'GET',

            success: function (response) {
                if (!response.success) {
                    Swal.fire(
                        'Gagal',
                        response.message || 'Data tamu tidak ditemukan.',
                        'error'
                    );
                    return;
                }

                const tamu = response.data;

                const foto = jenis === 'identitas'
                    ? tamu.FotoIdentitas
                    : tamu.FotoDiri;

                if (!foto) {
                    Swal.fire(
                        'Informasi',
                        'Foto belum tersedia.',
                        'info'
                    );
                    return;
                }

                $('#judulFoto').text(
                    (jenis === 'identitas'
                        ? 'Foto Identitas - '
                        : 'Foto Diri - ') + tamu.NamaTamu
                );

                gambarFoto.onload = function () {
                    updateZoomFoto();
                    areaZoomFoto.scrollTop = 0;
                    areaZoomFoto.scrollLeft = 0;
                };

                gambarFoto.src = foto;

                $('#gambarFoto').attr('src', foto);

                bootstrap.Modal
                    .getOrCreateInstance(
                        document.getElementById('modalFoto')
                    )
                    .show();
            },

            error: function (xhr) {
                Swal.fire(
                    'Gagal',
                    xhr.responseJSON?.message ||
                        'Gagal mengambil foto tamu.',
                    'error'
                );
            }
        });
    });

    // Bersihkan foto setelah modal ditutup
    $('#modalFoto').on('hidden.bs.modal', function () {
        $('#gambarFoto').attr('src', '');
    });

    // Isi jam keluar: hanya jam dan menit
    $(document).on('click', '.btnJamKeluar', async function () {
        const id = $(this).data('id');
        const nama = $(this).data('nama');
        const jamSebelumnya = $(this).attr('data-jam') || '';

        const now = new Date();
        const jamSekarang =
            String(now.getHours()).padStart(2, '0') + ':' +
            String(now.getMinutes()).padStart(2, '0');

        const sedangEdit = jamSebelumnya !== '';

        const hasil = await Swal.fire({
            title: sedangEdit ? 'Edit Jam Keluar' : 'Isi Jam Keluar',
            text: 'Tamu: ' + nama,
            input: 'time',
            inputValue: jamSebelumnya || jamSekarang,
            showCancelButton: true,
            confirmButtonText: 'Simpan',
            cancelButtonText: 'Batal',
            inputValidator: function (value) {
                if (!value) {
                    return 'Jam keluar wajib diisi.';
                }
            }
        });

        if (!hasil.isConfirmed) {
            return;
        }

        $.ajax({
            url: `${baseUrl}/${id}`,
            type: 'POST',
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                _method: 'PUT',
                JamKeluar: hasil.value
            },

            success: function (response) {
                Swal.fire(
                    'Berhasil',
                    response.message,
                    'success'
                ).then(function () {
                    window.location.reload();
                });
            },

            error: function (xhr) {
                Swal.fire(
                    'Gagal',
                    xhr.responseJSON?.message ||
                        'Gagal menyimpan jam keluar.',
                    'error'
                );
            }
        });
    });

    // Zoom foto pada modal yang sudah ada
    let zoomLevel = 1;

    const gambarFoto = document.getElementById('gambarFoto');
    const areaZoomFoto = document.getElementById('areaZoomFoto');

    function updateZoomFoto() {
        if (zoomLevel === 1) {
            gambarFoto.style.width = 'auto';
            gambarFoto.style.height = 'auto';
            gambarFoto.style.maxWidth = '100%';
            gambarFoto.style.maxHeight = '70vh';
        } else {
            gambarFoto.style.maxWidth = 'none';
            gambarFoto.style.maxHeight = 'none';

            // Ukuran asli gambar sebagai dasar zoom
            gambarFoto.style.width =
                (gambarFoto.naturalWidth * zoomLevel) + 'px';

            gambarFoto.style.height = 'auto';
        }

        gambarFoto.style.transform = 'none';
        gambarFoto.style.cursor =
            zoomLevel > 1 ? 'zoom-out' : 'zoom-in';
    }

    // Zoom menggunakan scroll mouse
    areaZoomFoto.addEventListener('wheel', function (e) {
        e.preventDefault();

        zoomLevel = e.deltaY < 0
            ? Math.min(zoomLevel + 0.25, 5)
            : Math.max(zoomLevel - 0.25, 1);

        updateZoomFoto();
    }, { passive: false });

    // Klik gambar untuk memperbesar
    gambarFoto.addEventListener('click', function () {
        zoomLevel = zoomLevel >= 3 ? 1 : zoomLevel + 0.5;
        updateZoomFoto();
    });

    // Reset posisi scroll dan zoom saat modal ditutup
    $('#modalFoto').on('hidden.bs.modal', function () {
        zoomLevel = 1;
        updateZoomFoto();

        areaZoomFoto.scrollTop = 0;
        areaZoomFoto.scrollLeft = 0;

        gambarFoto.src = '';
    });
});
