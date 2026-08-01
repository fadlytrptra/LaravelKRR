@extends('layouts.app')
@section('title', 'List Bon Kas Putih')
@section('content')


<style>
    .modal-kirim {
        max-width: 950px;
        width: 90%;
        margin-top: 70px;
    }

    .modal-kirim .modal-body {
        padding: 25px;
    }

    #imagePreviewModal{
        z-index:1065;
    }

    #imagePreviewModal + .modal-backdrop{
        z-index:1064;
    }

    .pdf-card{
        cursor:pointer;
        transition:.2s;
    }

    .pdf-card:hover{
        transform:translateY(-3px);
    }
</style>


<div class="container-fluid">
    <div class="card shadow-sm">
        <div class="card-header bg-white">List Bon Kas Putih</div>
        <div class="card-body">
            <table id="tblBonKas" class="table table-bordered table-hover table-striped w-100">
                <thead class="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Kode</th>
                        <th>Tanggal</th>
                        <th>Jenis</th>
                        <th>Jumlah</th>
                        <th>Uraian</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>

                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>

<button type="button" class="acs-icon-btn acs-add-btn acs-float" id="btn_tambahPutih" data-bs-toggle="modal" data-bs-target="#modalTambahBonKasPutih">
    <div class="acs-add-icon"></div>
    <div class="acs-btn-txt">Tambah Bon Kas</div>
</button>

{{-- Modal List User --}}
<div class="modal fade"
     id="modalKirim"
     tabindex="-1"
     aria-hidden="true">

    <div class="modal-dialog modal-lg modal-kirim">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">
                    Kirim Bon Kas
                </h5>

                <button type="button"
                        class="btn-close btn-close-white"
                        data-bs-dismiss="modal"
                        aria-label="Close">
                </button>
            </div>

            <div class="modal-body">

                <input type="hidden" id="idBonKas">

                <div class="form-group">
                    <label class="font-weight-bold">
                        Kode Bon Kas
                    </label>

                    <input type="text"
                           id="kodeBonKas"
                           class="form-control"
                           readonly>
                </div>

                <div class="form-group mt-3">
                    <label for="nomorUser">
                        Pilih User Tujuan
                    </label>

                    <select id="nomorUser" class="form-control" style="width:100%;">
                        <option value=""></option>
                        @foreach($listUser as $user)
                            <option value="{{ $user->NomorUser }}">
                                {{ $user->NamaUser }} - {{ $user->NomorUser }}
                            </option>
                        @endforeach
                    </select>

                    <small class="text-muted">
                        Cari berdasarkan Nomor User atau Nama User.
                    </small>
                </div>

            </div>

            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Batal
                </button>

                <button type="button"
                        class="btn btn-success"
                        id="btnProsesKirim">
                    Kirim
                </button>

            </div>

        </div>
    </div>
</div>

<div class="modal fade" id="pdfPreviewModal" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>
            </div>

            <div class="modal-body p-0">
                <iframe
                    id="pdfFrame"
                    style="
                        width:100%;
                        height:85vh;
                        border:none;
                    ">
                </iframe>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="imagePreviewModal" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content bg-transparent border-0 shadow-none">
            <div class="modal-body p-0 text-center overflow-auto">
                <img
                    id="previewImage"
                    src=""
                    style="
                        max-width:100%;
                        max-height:90vh;
                        cursor:grab;
                        transition:.2s;
                        transform-origin:center center;
                    ">

            </div>

        </div>

    </div>

</div>

@include('modalPrintBonKas')
@include('bonKasputih')
@include('viewBonKasPutih')

<script>
    const bonKas = @json($bonKas);
    const nomorUser = @json(Auth::user()->NomorUser);
    const bonKasMerah = @json($bonKasMerah);
    const isAdminKasir = @json($isAdminKasir);
</script>

<script src="{{ asset('js/bootstrap@5.0.2.min.js') }}"></script>
<script src="{{ asset('js/bonkasPutih.js') }}"></script>

@if(session('success'))
<script>
    const successMessage = @json(session('success'));
    const kodeBonKasBaru = @json(session('kodeBonKas'));

    Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        html: `
            <div>
                <p class="mb-2">${successMessage}</p>

                <p class="mb-0">
                    Kode Bon Kas:
                    <strong>${kodeBonKasBaru}</strong>
                </p>
            </div>
        `,
        confirmButtonText: 'OK',
        allowEscapeKey: true,
        allowEnterKey: true,
        allowOutsideClick: false
    });
</script>
@endif

@endsection
