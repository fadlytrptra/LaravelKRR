@extends('layouts.appOrderPembelian')
@section('title', 'Foto Barang')

@section('content')
<link href="{{ asset('css/FotoBarang.css') }}" rel="stylesheet">


<div class="layout-wrapper">
    <div class="container-foto-barang">
        <div class="foto-card">

            {{-- Kd Barang --}}
            <div class="row-form">
                <label>Kd Barang:</label>

                <div class="input-search-group">
                    <input type="text" id="kdBarang" maxlength="9">

                    <button id="btnCari">
                        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="M18 10c0-4.41-3.59-8-8-8s-8 3.59-8 8 3.59 8 8 8c1.85 0 3.54-.63 4.9-1.69l5.1 5.1L21.41 20l-5.1-5.1A8 8 0 0 0 18 10M4 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {{-- Nama Barang --}}
            <div class="row-form">
                <label>Nama Barang:</label>
                <input type="text" id="namaBarang" readonly>
            </div>

            {{-- Keterangan --}}
            <div class="row-form">
                <label>Keterangan:</label>
                <input type="text" id="ketBarang" readonly>
            </div>

            {{-- Gambar --}}
            <div class="row-form gambar-box">
                <label>Gambar:</label>
                <div class="preview-container">
                    <img id="previewImage" src="" alt="">
                </div>
            </div>

            <input type="file" id="fotoInput" hidden accept="image/*">
            <!-- kamera -->
            <input type="file" id="cameraInput" hidden accept="image/*" capture="environment">

            {{-- Button --}}
            <div class="button-group">
                <button id="btnBrowse">Browse</button>
                <button id="btnFoto">Foto</button>
                <button id="btnSimpan">Simpan</button>
                <button id="btnHapus">Hapus</button>
            </div>
        </div>
    </div>

    {{--Notes--}}
    <div class="notes_box">
        <p style="color: red;"><b>Notes!</b>
            <br>
            Untuk dapat akses kamera, silahkan copy link ini:
            <b>chrome://flags/#unsafely-treat-insecure-origin-as-secure</b>
            <br>
            <br>
            Yang perlu dilakukan: <br>
            - Copy address website Kerta Rajasa Raya <b>http://krr.local</b> atau <b>http://192.168.99.91</b><br>
            - Buka link yang sudah diberikan diatas<br>
            - Salin address website pada bagian Insecure origins treated as secure<br>
            - Kemudian pilih Enabled pada bagian kanan<br>
            - Akan muncul permintaan Relaunch, tekan tombol Relaunch<br>
            - Kembali ke website
        </p>
    </div>
</div>

<!-- Modal Kamera Laptop -->
<div id="cameraModal" class="camera-modal">
    <div class="camera-box">

        <video id="cameraVideo"
            autoplay
            playsinline
            class="camera-video">
        </video>

        <div class="camera-action">

            <button id="btnTakePhoto"
                class="btn-camera btn-camera-save">
                Ambil Foto
            </button>

            <button id="btnCloseCamera"
                class="btn-camera btn-camera-close">
                Tutup
            </button>

        </div>
    </div>
</div>



<canvas id="cameraCanvas" hidden></canvas>

<script>
    window.isAdminFotoBarang = @json($isAdminFotoBarang);
</script>
<script src="{{ asset('js/OrderPembelian/FotoBarang.js') }}"></script>
@endsection
