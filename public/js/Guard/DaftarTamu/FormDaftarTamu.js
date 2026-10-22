
$(document).ready(function () {
    const form = document.getElementById('formDaftarTamu');
    form.noValidate = true;
    const cameraModal = document.getElementById('cameraModal');
    const cameraVideo = document.getElementById('cameraVideo');
    const cameraCanvas = document.getElementById('cameraCanvas');
    const cameraInput = document.getElementById('cameraInput');


    const maxSize = 3 * 1024 * 1024;

    let stream = null;
    let jenisFotoAktif = null;
    let fotoIdentitas = null;
    let fotoDiri = null;

    let dataSudahDikirim = false;
    let sedangMenyimpan = false;

    const $button = $('#btnSubmit');

    // Update judul lokasi

    function updateJudul() {
        const judul = document.getElementById('judulForm');

        if (!judul) return;

        const lokasi = window.daftarTamuConfig?.lokasi || '';

        judul.textContent =
            'DAFTAR TAMU PT. KERTA RAJASA RAYA' +
            (lokasi ? ' ' + lokasi : '');
    }

    updateJudul();


    // Deteksi perangkat mobile
    function isMobile() {
        return /Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
        ) || (
            navigator.maxTouchPoints > 1 &&
            window.innerWidth <= 1366
        );
    }

    // Hentikan kamera
    function closeCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }

        cameraVideo.srcObject = null;
        cameraModal.style.display = 'none';
    }

    // Buka kamera
    async function bukaKamera(jenis) {
        jenisFotoAktif = jenis;

        // HP: minta perangkat membuka kamera native
        if (isMobile()) {
            cameraInput.value = '';

            // Identitas memakai kamera belakang,
            // selfie memakai kamera depan.
            cameraInput.setAttribute(
                'capture',
                jenis === 'identitas' ? 'environment' : 'user'
            );

            cameraInput.click();
            return;
        }

        // Laptop/desktop: webcam melalui modal
        try {
            if (!navigator.mediaDevices?.getUserMedia) {
                throw new Error(
                    'API kamera tidak tersedia. Gunakan HTTPS, ' +
                    'localhost, atau konfigurasi secure context.'
                );
            }

            closeCamera();

            stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: {
                        ideal: jenis === 'identitas'
                            ? 'environment'
                            : 'user'
                    }
                }
            });

            cameraVideo.srcObject = stream;
            document.getElementById('cameraTitle').textContent =
                jenis === 'identitas'
                    ? 'Foto Identitas'
                    : 'Foto Selfie';

            cameraModal.style.display = 'flex';
            await cameraVideo.play();

        } catch (error) {
            console.error('Camera Error:', error);

            let message = 'Tidak dapat membuka kamera.';

            if (error.name === 'NotAllowedError') {
                message = 'Izin kamera ditolak. Izinkan akses kamera ' +
                    'pada browser.';
            } else if (error.name === 'NotFoundError') {
                message = 'Kamera tidak ditemukan.';
            } else if (error.name === 'NotReadableError') {
                message = 'Kamera sedang digunakan aplikasi lain.';
            } else if (error.message) {
                message = error.message;
            }

            Swal.fire('Kamera gagal dibuka', message, 'error');
        }
    }

    $('#btnKameraIdentitas').on('click', function () {
        bukaKamera('identitas');
    });

    $('#btnKameraDiri').on('click', function () {
        bukaKamera('diri');
    });

    // Simpan hasil foto
    const MAX_SIZE = 3 * 1024 * 1024; // 3 MB

    async function kompresFoto(file) {
        // Tidak perlu kompres jika ukuran sudah <= 3 MB
        if (file.size <= MAX_SIZE) {
            return file;
        }

        // Baca gambar untuk proses kompresi
        const imageUrl = URL.createObjectURL(file);

        try {
            const img = new Image();

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = () => reject(
                    new Error('Gagal membaca gambar untuk kompresi.')
                );
                img.src = imageUrl;
            });

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let width = img.naturalWidth;
            let height = img.naturalHeight;
            let quality = 0.9;
            let blob = null;

            // Kurangi resolusi secara bertahap jika kompresi JPEG
            // saja belum cukup untuk mencapai batas ukuran.
            for (let attempt = 0; attempt < 12; attempt++) {
                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                blob = await new Promise(resolve => {
                    canvas.toBlob(resolve, 'image/jpeg', quality);
                });

                if (!blob) {
                    throw new Error('Gagal mengompres gambar.');
                }

                if (blob.size <= MAX_SIZE) {
                    return new File(
                        [blob],
                        file.name.replace(/\.[^.]+$/, '') + '.jpg',
                        {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        }
                    );
                }

                if (quality > 0.5) {
                    quality -= 0.1;
                } else {
                    width = Math.round(width * 0.8);
                    height = Math.round(height * 0.8);
                    quality = 0.8;
                }
            }

            // Periksa hasil akhir; jangan kirim file yang masih > 3 MB.
            if (blob && blob.size <= MAX_SIZE) {
                return new File(
                    [blob],
                    file.name.replace(/\.[^.]+$/, '') + '.jpg',
                    { type: 'image/jpeg', lastModified: Date.now() }
                );
            }

            throw new Error(
                'Ukuran gambar belum dapat dikurangi hingga maksimal 3 MB.'
            );
        } finally {
            URL.revokeObjectURL(imageUrl);
        }
    }

    async function simpanFoto(blob, jenis) {
        try {
            const fileAsli = blob instanceof File
                ? blob
                : new File(
                    [blob],
                    jenis === 'identitas' ? 'identitas.jpg' : 'selfie.jpg',
                    { type: blob.type || 'image/jpeg' }
                );

            const ukuranAwal = fileAsli.size;
            const fileHasil = await kompresFoto(fileAsli);

            if (jenis === 'identitas') {
                fotoIdentitas = fileHasil;
            } else {
                fotoDiri = fileHasil;
            }

            const preview = jenis === 'identitas'
                ? '#previewIdentitas'
                : '#previewDiri';

            const tombol = jenis === 'identitas'
                ? '#btnKameraIdentitas'
                : '#btnKameraDiri';

            const ulang = jenis === 'identitas'
                ? '#btnUlangIdentitas'
                : '#btnUlangDiri';

            const previewElement = document.querySelector(preview);

            // Hindari penumpukan URL preview lama
            if (previewElement.dataset.objectUrl) {
                URL.revokeObjectURL(previewElement.dataset.objectUrl);
            }

            const objectUrl = URL.createObjectURL(fileHasil);

            previewElement.dataset.objectUrl = objectUrl;
            $(preview).attr('src', objectUrl).show();
            $(tombol).hide();
            $(ulang).show();

            // Reset zoom dan posisi foto baru
            if (typeof previewElement.resetZoom === 'function') {
                previewElement.resetZoom();
            } else {
                previewElement.style.transform = 'none';
                previewElement.classList.remove('zoom-aktif');
            }


        } catch (error) {
            console.error('Kompresi foto gagal:', error);

            Swal.fire(
                'Gagal memproses foto',
                error.message || 'Silakan ambil foto kembali.',
                'error'
            );
        }
    }


    // Foto dari kamera native HP
    cameraInput.addEventListener('change', async function () {
        const file = this.files?.[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            Swal.fire(
                'Format tidak valid',
                'Gunakan file gambar.',
                'warning'
            );
            this.value = '';
            return;
        }

        try {
            await simpanFoto(file, jenisFotoAktif);
        } finally {
            this.value = '';
        }
    });

    // Ambil gambar dari webcam laptop
    $('#btnTakePhoto').on('click', function () {
        if (!cameraVideo.videoWidth) {
            Swal.fire('Perhatian', 'Kamera belum siap.', 'warning');
            return;
        }

        cameraCanvas.width = cameraVideo.videoWidth;
        cameraCanvas.height = cameraVideo.videoHeight;

        cameraCanvas.getContext('2d').drawImage(
            cameraVideo,
            0,
            0,
            cameraCanvas.width,
            cameraCanvas.height
        );

        // Kompres JPEG sampai di bawah 3 MB
        let quality = 0.85;

        function encode() {
            cameraCanvas.toBlob(function (blob) {
                if (!blob) {
                    Swal.fire('Gagal', 'Tidak dapat memproses foto.', 'error');
                    return;
                }

                if (blob.size <= maxSize) {
                    simpanFoto(blob, jenisFotoAktif);
                    closeCamera();
                } else if (quality > 0.3) {
                    quality -= 0.1;
                    encode();
                } else {
                    Swal.fire(
                        'Foto terlalu besar',
                        'Silakan ambil foto kembali.',
                        'warning'
                    );
                }
            }, 'image/jpeg', quality);
        }

        encode();
    });

    $('#btnCloseCamera').on('click', closeCamera);

    cameraModal.addEventListener('click', function (event) {
        if (event.target === cameraModal) closeCamera();
    });

    $(document).on('keydown', function (event) {
        if (event.key === 'Escape') closeCamera();
    });


    // Ulangi foto dan langsung buka kamera kembali
    async function ulangiFoto(jenis) {
        if (jenis === 'identitas') {
            fotoIdentitas = null;
        } else {
            fotoDiri = null;
        }

        const preview = jenis === 'identitas'
            ? '#previewIdentitas'
            : '#previewDiri';

        const tombol = jenis === 'identitas'
            ? '#btnKameraIdentitas'
            : '#btnKameraDiri';

        const ulang = jenis === 'identitas'
            ? '#btnUlangIdentitas'
            : '#btnUlangDiri';

        const previewElement = document.querySelector(preview);

        // Hapus URL preview sebelumnya
        if (previewElement.dataset.objectUrl) {
            URL.revokeObjectURL(previewElement.dataset.objectUrl);
            delete previewElement.dataset.objectUrl;
        }

        $(preview).attr('src', '').hide();
        $(ulang).hide();
        $(tombol).show();

        // Langsung buka kamera untuk foto yang dipilih
        await bukaKamera(jenis);
    }

    $('#btnUlangIdentitas').on('click', function () {
        ulangiFoto('identitas');
    });

    $('#btnUlangDiri').on('click', function () {
        ulangiFoto('diri');
    });



    // Zoom dalam area preview tetap, dengan drag ke segala arah
    $('#previewIdentitas, #previewDiri').each(function () {
        const img = this;

        // Bungkus gambar dalam area dengan ukuran tetap
        if (!img.parentElement.classList.contains('camera-preview-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'camera-preview-wrapper';
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
        }

        const wrapper = img.parentElement;

        const state = {
            scale: 1,
            x: 0,
            y: 0,
            dragging: false,
            startX: 0,
            startY: 0,
            pointerId: null
        };

        function render() {
            img.style.transform =
                `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;

            img.classList.toggle('zoom-aktif', state.scale > 1);
            img.style.transformOrigin = 'center center';
            img.style.cursor = state.scale > 1 ? 'grab' : 'zoom-in';
        }

        function resetZoom() {
            state.scale = 1;
            state.x = 0;
            state.y = 0;
            render();
        }

        // Klik dua kali untuk zoom masuk/keluar
        img.addEventListener('dblclick', function (e) {
            e.preventDefault();

            if (state.scale > 1) {
                resetZoom();
            } else {
                state.scale = 2;
                state.x = 0;
                state.y = 0;
                render();
            }
        });

        // Scroll mouse untuk zoom
        wrapper.addEventListener('wheel', function (e) {
            if (!img.src || img.style.display === 'none') return;

            e.preventDefault();

            const oldScale = state.scale;
            const newScale = Math.max(
                1,
                Math.min(4, oldScale + (e.deltaY < 0 ? 0.25 : -0.25))
            );

            // Pertahankan posisi relatif gambar ketika zoom
            const rect = wrapper.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - rect.width / 2;
            const mouseY = e.clientY - rect.top - rect.height / 2;
            const ratio = newScale / oldScale;

            state.x = mouseX - (mouseX - state.x) * ratio;
            state.y = mouseY - (mouseY - state.y) * ratio;
            state.scale = newScale;

            if (newScale === 1) {
                state.x = 0;
                state.y = 0;
            }

            render();
        }, { passive: false });

        // Drag menggunakan mouse atau sentuhan
        img.addEventListener('pointerdown', function (e) {
            if (state.scale <= 1) return;

            state.dragging = true;
            state.pointerId = e.pointerId;
            state.startX = e.clientX - state.x;
            state.startY = e.clientY - state.y;

            img.setPointerCapture(e.pointerId);
            img.style.cursor = 'grabbing';
            e.preventDefault();
        });

        img.addEventListener('pointermove', function (e) {
            if (!state.dragging || e.pointerId !== state.pointerId) return;

            state.x = e.clientX - state.startX;
            state.y = e.clientY - state.startY;
            render();
        });

        function stopDrag(e) {
            if (e.pointerId !== state.pointerId) return;

            state.dragging = false;
            state.pointerId = null;
            render();
        }

        img.addEventListener('pointerup', stopDrag);
        img.addEventListener('pointercancel', stopDrag);

        // Simpan fungsi reset untuk dipakai saat foto diulang
        img.resetZoom = resetZoom;
    });


    // Submit form

    $(form).on('submit', function (event) {
        event.preventDefault();

        if (dataSudahDikirim || sedangMenyimpan) return;

        // Periksa field teks dari atas ke bawah.
        const fieldWajib = [
            ['NamaTamu', 'Nama tamu wajib diisi.'],
            ['Instansi', 'Instansi wajib diisi.'],
            ['BertemuDengan', 'Bertemu dengan wajib diisi.'],
            ['Keperluan', 'Keperluan wajib diisi.']
        ];

        for (const [id, pesan] of fieldWajib) {
            const field = document.getElementById(id);

            if (!field || !field.value.trim()) {
                arahkanKeField(field, pesan);
                return;
            }
        }

        // Periksa foto identitas.
        if (!fotoIdentitas) {
            arahkanKeField(
                document.getElementById('btnKameraIdentitas'),
                'Silakan ambil foto identitas terlebih dahulu.'
            );
            return;
        }

        // Periksa foto diri.
        if (!fotoDiri) {
            arahkanKeField(
                document.getElementById('btnKameraDiri'),
                'Silakan ambil foto diri terlebih dahulu.'
            );
            return;
        }

        // Periksa ukuran foto.
        if (
            fotoIdentitas.size > maxSize ||
            fotoDiri.size > maxSize
        ) {
            Swal.fire(
                'Foto terlalu besar',
                'Masing-masing foto maksimal 3 MB.',
                'warning'
            );
            return;
        }

        // Isi lokasi pada header modal
        const namaLokasi =
            document.getElementById('Lokasi')?.dataset.nama
            || window.daftarTamuConfig?.lokasi
            || '';

        const lokasi = namaLokasi
            ? `Kerta Rajasa Raya ${namaLokasi}`
            : 'Kerta Rajasa Raya';

        $('#previewLokasi').text(lokasi);

        // Ambil hari, tanggal, dan jam saat preview dibuka
        const sekarang = new Date();

        const hariTanggal = new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Jakarta'
        }).format(sekarang);

        const jamDatang = new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hourCycle: 'h23',
            timeZone: 'Asia/Jakarta'
        }).format(sekarang).replace(/\./g, ':');

        $('#previewWaktuDatang').text(
            `${hariTanggal}, ${jamDatang} WIB`
        );

        // Isi preview data
        $('#previewNama').text($('#NamaTamu').val());
        $('#previewInstansi').text($('#Instansi').val());
        $('#previewBertemu').text($('#BertemuDengan').val());
        $('#previewKeperluan').text($('#Keperluan').val());

        $('#previewModalIdentitas').attr(
            'src',
            document.getElementById('previewIdentitas').src
        );

        $('#previewModalDiri').attr(
            'src',
            document.getElementById('previewDiri').src
        );

        // Tampilkan modal konfirmasi
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById('modalPreviewTamu')
        ).show();
    });

    $('#btnKonfirmasiSimpan').on('click', function () {
        if (dataSudahDikirim || sedangMenyimpan) return;

        if (!fotoIdentitas || !fotoDiri) {
            Swal.fire(
                'Foto belum lengkap',
                'Silakan ambil kedua foto kembali.',
                'warning'
            );
            return;
        }

        sedangMenyimpan = true;

        const tombol = $(this);
        tombol.prop('disabled', true).text('Memproses...');

        // Tutup modal preview data tamu
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById('modalPreviewTamu')
        ).hide();

        // Instruksi untuk menyerahkan device kepada satpam
        Swal.fire({
            title: 'Perhatian',
            text: 'Berikan device kepada satpam.',
            icon: 'info',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(function () {

            // Modal pilihan grup WhatsApp
            Swal.fire({
                title: 'Pilih Grup WhatsApp',
                html: `
                    <div style="text-align:left; padding: 10px 20px;">
                        <div class="form-check mb-3">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                id="swalGrupPengumuman"
                            >
                            <label
                                class="form-check-label"
                                for="swalGrupPengumuman"
                            >
                                Grup Pengumuman
                            </label>
                        </div>

                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                id="swalGrupStaff"
                            >
                            <label
                                class="form-check-label"
                                for="swalGrupStaff"
                            >
                                Grup Staff
                            </label>
                        </div>
                    </div>
                `,
                icon: 'question',
                confirmButtonText: 'Lanjutkan',
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                focusConfirm: false,

                // Checkbox boleh tidak dipilih.
                // Jika keduanya kosong, tetap lanjutkan proses simpan.
                preConfirm: function () {
                    const grupPengumuman =
                        document.getElementById('swalGrupPengumuman').checked;

                    const grupStaff =
                        document.getElementById('swalGrupStaff').checked;

                    return {
                        grupPengumuman: grupPengumuman,
                        grupStaff: grupStaff
                    };
                }
            }).then(function (pilihanGrup) {

                // Simpan Tanpa WhatsApp akan menghasilkan kedua nilai 0
                const kirimPengumuman =
                    pilihanGrup.isConfirmed &&
                    pilihanGrup.value?.grupPengumuman === true;

                const kirimStaff =
                    pilihanGrup.isConfirmed &&
                    pilihanGrup.value?.grupStaff === true;

                const formData = new FormData(form);

                // Hindari field ganda
                formData.delete('FotoIdentitas');
                formData.delete('FotoDiri');
                formData.delete('grup_pengumuman');
                formData.delete('grup_staff');

                // Tambahkan hasil foto dari kamera
                formData.append('FotoIdentitas', fotoIdentitas);
                formData.append('FotoDiri', fotoDiri);

                // Kirim pilihan masing-masing grup ke controller
                formData.append(
                    'grup_pengumuman',
                    kirimPengumuman ? '1' : '0'
                );

                formData.append(
                    'grup_staff',
                    kirimStaff ? '1' : '0'
                );

                tombol.text('Menyimpan...');

                $.ajax({
                    url: window.daftarTamuConfig.storeUrl,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,

                    success: function (response) {
                        dataSudahDikirim = true;

                        Swal.fire({
                            title: 'Data Berhasil Tersimpan',
                            text: response.message ||
                                'Data tamu berhasil disimpan ke database.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            allowOutsideClick: false
                        }).then(function () {
                            resetFormTamu();
                        });
                    },

                    error: function (xhr) {
                        let message = 'Gagal menyimpan data tamu.';

                        if (xhr.responseJSON?.errors) {
                            message = Object.values(xhr.responseJSON.errors)
                                .flat()
                                .join('\n');
                        } else if (xhr.responseJSON?.message) {
                            message = xhr.responseJSON.message;
                        }

                        Swal.fire({
                            title: 'Gagal',
                            text: message,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        }).then(function () {
                            bootstrap.Modal.getOrCreateInstance(
                                document.getElementById('modalPreviewTamu')
                            ).show();
                        });
                    },

                    complete: function () {
                        sedangMenyimpan = false;

                        tombol.prop('disabled', false)
                            .text('Ya, Lanjutkan');
                    }
                });
            });
        });
    });

    function resetFormTamu() {
        form.reset();

        fotoIdentitas = null;
        fotoDiri = null;

        ['previewIdentitas', 'previewDiri'].forEach(function (id) {
            const img = document.getElementById(id);

            if (img) {
                if (img.dataset.objectUrl) {
                    URL.revokeObjectURL(img.dataset.objectUrl);
                    delete img.dataset.objectUrl;
                }

                img.removeAttribute('src');
                img.style.display = 'none';
                img.style.transform = 'scale(1)';
                img.classList.remove('zoom-aktif');
            }
        });

        $('#btnKameraIdentitas, #btnKameraDiri').show();
        $('#btnUlangIdentitas, #btnUlangDiri').hide();

        dataSudahDikirim = false;
        sedangMenyimpan = false;

        updateJudul();
    }

    function arahkanKeField(element, pesan) {
        if (!element) return;

        const navbar = document.querySelector(
            '.navbar.fixed-top, .navbar.sticky-top, header.fixed-top'
        );

        const tinggiNavbar = navbar
            ? navbar.getBoundingClientRect().height
            : 100;

        const posisi =
            element.getBoundingClientRect().top +
            window.scrollY -
            tinggiNavbar -
            30;

        window.scrollTo({
            top: Math.max(0, posisi),
            behavior: 'smooth'
        });

        setTimeout(() => {
            element.focus({ preventScroll: true });

            Swal.fire({
                icon: 'warning',
                title: 'Data belum lengkap',
                text: pesan,
                confirmButtonText: 'OK'
            });
        }, 500);
    }


    $(window).on('pagehide', closeCamera);
});
