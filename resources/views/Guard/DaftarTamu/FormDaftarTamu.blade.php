
@extends('layouts.appGuard')

@section('title', 'Form Pendaftaran Tamu')

@section('content')
<div class="container py-3">
    <div class="guest-form mx-auto">

        <div class="guest-header">
            <h4 id="judulForm">
                DAFTAR TAMU PT. KERTA RAJASA RAYA
                {{ strtoupper($lokasiUser->first()->Lokasi) }}
            </h4>

            {{-- @if ($lokasiUser->count() > 1)
                <div class="mb-3">
                    <label for="Lokasi" class="form-label">
                        Pilih Lokasi <span class="text-danger">*</span>
                    </label>

                    <select id="Lokasi" name="Lokasi"
                        form="formDaftarTamu"
                        class="form-select" required>
                        @foreach ($lokasiUser as $lokasi)
                            <option value="{{ $lokasi->Id_Lokasi }}"
                                data-nama="{{ $lokasi->Lokasi }}"
                                @selected($loop->first)>
                                {{ $lokasi->Lokasi }}
                            </option>
                        @endforeach
                    </select>
                </div>
            @else
                <input type="hidden"
                    id="Lokasi"
                    name="Lokasi"
                    form="formDaftarTamu"
                    value="{{ $lokasiUser->first()->Id_Lokasi }}"
                    data-nama="{{ $lokasiUser->first()->Lokasi }}">
            @endif --}}

            <p class="text-muted mb-0">
                Silakan isi data berikut untuk melakukan pendaftaran
                kunjungan tamu.
            </p>
        </div>

        <form id="formDaftarTamu"
            action="{{ route('FormDaftarTamu.store') }}"
            method="POST"
            enctype="multipart/form-data"
            novalidate>
            @csrf

            <input type="hidden"
                    id="Lokasi"
                    name="Lokasi"
                    form="formDaftarTamu"
                    value="{{ $lokasiUser->first()->Id_Lokasi }}"
                    data-nama="{{ $lokasiUser->first()->Lokasi }}">

            <div class="guest-field">
                <label for="NamaTamu" class="form-label">
                    NAMA <span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control"
                    id="NamaTamu" name="NamaTamu"
                    placeholder="Masukkan nama lengkap sesuai KTP"
                    maxlength="150" required>
            </div>

            <div class="guest-field">
                <label for="Instansi" class="form-label">
                    INSTANSI <span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control"
                    id="Instansi" name="Instansi"
                    placeholder="Masukkan nama instansi anda"
                    maxlength="150" required>
            </div>

            <div class="guest-field">
                <label for="BertemuDengan" class="form-label">
                    BERTEMU DENGAN <span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control"
                    id="BertemuDengan" name="BertemuDengan"
                    placeholder="Nama karyawan yang ditemui"
                    maxlength="150" required>
            </div>

            <div class="guest-field">
                <label for="Keperluan" class="form-label">
                    KEPERLUAN <span class="text-danger">*</span>
                </label>
                <textarea class="form-control"
                    id="Keperluan" name="Keperluan"
                    rows="3" maxlength="500"
                    placeholder="Jelaskan keperluan kunjungan"
                    required></textarea>
            </div>


            {{-- FOTO IDENTITAS --}}
            <div class="guest-field">
                <label class="form-label">
                    FOTO IDENTITAS (KTP/SIM DLL)
                    <span class="text-danger">*</span>
                </label>

                <small class="text-muted d-block mb-3">
                    Ambil foto menggunakan kamera.
                </small>

                <img id="previewIdentitas" class="camera-preview"
                    style="display:none" alt="Preview foto identitas">

                <button type="button" id="btnKameraIdentitas"
                        class="btn btn-primary">
                    Buka Kamera
                </button>

                <button type="button" id="btnUlangIdentitas"
                        class="btn btn-secondary" style="display:none">
                    Ulangi Foto
                </button>
            </div>

            {{-- FOTO SELFIE --}}
            <div class="guest-field">
                <label class="form-label">
                    FOTO DIRI
                    <span class="text-danger">*</span>
                </label>

                <small class="text-muted d-block mb-3">
                    Ambil foto diri menggunakan kamera.
                </small>

                <img id="previewDiri" class="camera-preview"
                    style="display:none" alt="Preview foto selfie">

                <button type="button" id="btnKameraDiri"
                        class="btn btn-primary">
                    Buka Kamera
                </button>

                <button type="button" id="btnUlangDiri"
                        class="btn btn-secondary" style="display:none">
                    Ulangi Foto
                </button>
            </div>

            {{-- INPUT KAMERA HP --}}
            <input type="file" id="cameraInput" hidden
                accept="image/*" capture="environment">

            {{-- MODAL WEBCAM LAPTOP --}}
            <div id="cameraModal" class="camera-modal">
                <div class="camera-box">
                    <h5 id="cameraTitle">Ambil Foto</h5>

                    <video id="cameraVideo"
                        autoplay playsinline muted
                        class="camera-video"></video>

                    <div class="camera-action">
                        <button type="button" id="btnTakePhoto"
                                class="btn btn-success">
                            Ambil Foto
                        </button>

                        <button type="button" id="btnCloseCamera"
                                class="btn btn-secondary">
                            Tutup
                        </button>
                    </div>
                </div>
            </div>

            {{-- <div class="mb-3">
                <label class="form-label">Kirim Pesan WhatsApp</label>
                <div class="form-check">
                    <input type="hidden" name="grup_pengumuman" value="0">

                    <input class="form-check-input" type="checkbox" name="grup_pengumuman" value="1"
                        id="grupPengumuman">

                    <label class="form-check-label" for="grupPengumuman">
                        Tes Kirim WA
                    </label>
                </div>
            </div> --}}

            <canvas id="cameraCanvas" hidden></canvas>

            <div class="guest-submit">
                <button type="submit" id="btnSubmit"
                    class="btn btn-success">
                    Kirim
                </button>
            </div>
        </form>
    </div>
</div>


<!-- MODAL PREVIEW -->
<div class="modal fade" id="modalPreviewTamu"
     tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
            <!--Header Preview-->
            <div class="modal-header align-items-start">
                <div>
                    <h4 class="modal-title mb-2">
                        Konfirmasi Data Tamu
                    </h4>

                    <div class="small text-muted">
                        <div class="mb-1">
                            <strong>Lokasi:</strong>
                            <span id="previewLokasi">-</span>
                        </div>

                        <div>
                            <strong>Waktu Datang:</strong>
                            <span id="previewWaktuDatang">-</span>
                        </div>
                    </div>
                </div>

                <button type="button" class="btn-close"
                    data-bs-dismiss="modal" aria-label="Tutup">
                </button>
            </div>

            <div class="modal-body">
                <dl class="preview-data">
                    <dt>Nama</dt>
                    <dd id="previewNama"></dd>

                    <dt>Instansi</dt>
                    <dd id="previewInstansi"></dd>

                    <dt>Bertemu dengan</dt>
                    <dd id="previewBertemu"></dd>

                    <dt>Keperluan</dt>
                    <dd id="previewKeperluan"></dd>
                </dl>

                <hr>
                <h6>Foto Identitas</h6>
                <img id="previewModalIdentitas" alt="Foto identitas"
                    style="width:100%;max-height:350px;object-fit:contain">

                <hr>
                <h6>Foto Selfie</h6>
                <img id="previewModalDiri" alt="Foto selfie"
                    style="width:100%;max-height:350px;object-fit:contain">
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Kembali
                </button>
                <button type="button" class="btn btn-success"
                    id="btnKonfirmasiSimpan">
                    Ya, Lanjutkan
                </button>
            </div>
        </div>
    </div>
</div>



<style>
    .guest-form {
        max-width: 650px;
        color: #202124;
    }

    .guest-header,
    .guest-field {
        background: #fff;
        border-radius: 8px;
        padding: 22px;
        margin-bottom: 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,.12);
    }

    .guest-header {
        border-top: 7px solid #ffffff;
    }

    .guest-header h4 {
        font-size: 22px;
        font-weight: 600;
        line-height: 1.4;
        margin-bottom: 12px;
    }

    .guest-field .form-label {
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 12px;
    }

    .guest-field .form-control {
        font-size: 14px;
    }

    .guest-submit {
        padding: 4px 0 20px;
    }

    body {
        background-color: #f0f1f8;
    }

    @media (max-width: 576px) {
        .guest-header,
        .guest-field {
            padding: 16px;
        }

        .guest-header h4 {
            font-size: 19px;
        }
    }

    .camera-modal {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: rgba(0, 0, 0, .75);
        align-items: center;
        justify-content: center;
        padding: 15px;
    }

    .camera-box {
        background: #fff;
        width: 100%;
        max-width: 600px;
        padding: 20px;
        border-radius: 10px;
    }

    .camera-video {
        width: 100%;
        max-height: 65vh;
        object-fit: contain;
        background: #111;
        border-radius: 8px;
    }

    .camera-action {
        display: flex;
        gap: 10px;
        margin-top: 15px;
    }

    .camera-preview {
        display: block;
        width: 100%;
        max-height: 350px;
        object-fit: contain;
        margin: 12px 0;
        border-radius: 8px;
    }

    .camera-action button {
        flex: 1;
    }

    /* Area preview mempertahankan ukuran tetap */
    .camera-preview {
        display: block;
        width: 100%;
        height: 280px;
        max-width: 100%;
        max-height: 280px;
        object-fit: contain;
        margin: 12px 0;
        border-radius: 8px;
        cursor: zoom-in;
    }

    /* Area pembungkus gambar */
    .camera-preview-wrapper {
        position: relative;
        width: 100%;
        height: 280px;
        overflow: hidden;
        background: #f2f2f2;
        border-radius: 8px;
        margin: 12px 0;
    }

    /* Gambar di dalam area preview */
    .camera-preview-wrapper .camera-preview {
        width: 100%;
        height: 100%;
        max-width: none;
        max-height: none;
        object-fit: contain;
        margin: 0;
        transform: none;
        user-select: none;
        -webkit-user-drag: none;
        touch-action: none;
    }

    /* Saat zoom, gambar bisa digeser */
    .camera-preview-wrapper .camera-preview.zoom-aktif {
        cursor: grab;
    }

    .camera-preview-wrapper .camera-preview.zoom-aktif:active {
        cursor: grabbing;
    }

    .preview-data {
        display: grid;
        grid-template-columns: 145px 15px 1fr;
        row-gap: 10px;
        margin-bottom: 0;
    }

    .preview-data dt {
        grid-column: 1;
        font-weight: 600;
        margin: 0;
    }

    .preview-data dt::after {
        content: ":";
        float: right;
        margin-right: -5px;
    }

    .preview-data dd {
        grid-column: 3;
        margin: 0;
        min-width: 0;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
    }
</style>

<script>
    window.daftarTamuConfig = {
        storeUrl: @json(route('FormDaftarTamu.store')),
        lokasi: @json(strtoupper($lokasiUser->first()->Lokasi))
    };
</script>

<script src="{{ asset('js/Guard/DaftarTamu/FormDaftarTamu.js') }}"></script>
@endsection
