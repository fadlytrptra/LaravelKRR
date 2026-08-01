@extends('layouts.app')
@section('title', 'List Bon Kas')
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

    #imagePreviewModal .modal-dialog{
        max-width:95vw;
        z-index: 1081 !important;
    }

    #imagePreviewModal .modal-body{
        height:90vh;
        display:flex;
        justify-content:center;
        align-items:center;
        overflow:auto;
    }

    #previewImage{
        width:auto;
        height:auto;
        max-width:95vw;
        max-height:90vh;
        object-fit:contain;
    }

    /* Preview modal */
    #imagePreviewModal{
        z-index: 1080 !important;
    }

    /* Backdrop preview */
    #imagePreviewModal + .modal-backdrop{
        z-index: 1079 !important;
    }

    .pdf-card{
        cursor:pointer;
        transition:.2s;
    }

    .pdf-card:hover{
        transform:translateY(-3px);
    }

    /* =======================
    Responsive Mobile
    ======================= */
    @media (max-width:768px){

        .container-fluid{
            padding:10px;
        }

        .card-body{
            padding:12px;
        }

        .table-responsive{
            overflow-x:auto;
            -webkit-overflow-scrolling:touch;
        }

        #tblBonKas{
            min-width:1000px;
        }

        #tblBonKas td:last-child .btn{
            display:block;
            width:100%;
            margin-bottom:4px;
        }

        .modal-kirim{
            width:98%;
            max-width:98%;
            margin:10px auto;
        }

    }


</style>


<div class="container-fluid">
    <div class="card shadow-sm">
        <div class="card-header bg-white">List Bon Kas</div>
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-end mb-3 flex-wrap">
                {{--filter data--}}
                <div class="row g-3 mb-3">
                    <div class="col-12 col-md-3">
                        <label class="form-label" for="filterTanggalAwal">
                            Tgl. Awal
                        </label>
                        <input type="date"
                            id="filterTanggalAwal"
                            class="form-control">
                    </div>

                    <div class="col-12 col-md-3">
                        <label class="form-label" for="filterTanggalAkhir">
                            Tgl. Akhir
                        </label>
                        <input type="date"
                            id="filterTanggalAkhir"
                            class="form-control">
                    </div>

                    <div class="col-12 col-md-3">
                        <label class="form-label" for="filterJenisBonKas">
                            Jenis Bon Kas
                        </label>
                        <select id="filterJenisBonKas" class="form-control">
                            <option value="">Semua Jenis</option>
                            <option value="P">Bon Kas Putih</option>
                            <option value="M">Bon Kas Merah</option>
                        </select>
                    </div>

                    <div class="col-12 col-md-3">
                        <label class="form-label" for="filterStatus">
                            Status
                        </label>

                        <select id="filterStatus" class="form-control">
                            <option value="">Semua Status</option>

                            @foreach($listStatus as $status)
                                <option value="{{ $status->KdStatus }}">
                                    {{ $status->Status }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                </div>
            </div>
            <div class="table-responsive">
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
</div>

<button
    type="button"
    class="acs-icon-btn acs-add-btn acs-float"
    id="btnTambahBonKas">

    <div class="acs-add-icon"></div>
    <div class="acs-btn-txt">Tambah Bon Kas</div>
</button>

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




@include('modalPrintBonKas')
@include('viewBonKasPutih')
@include('viewBonKasMerah')
@include('bonKasputih')
@include('bonKasMerah')

<script>
    const bonKas = @json($bonKas);
    const nomorUser = @json(Auth::user()->NomorUser);
    const bonKasMerah = @json($bonKasMerah);
    const isAdminKasir = @json($isAdminKasir);
</script>

<script src="{{ asset('js/bonkas.js') }}"></script>
<script src="{{ asset('js/bonkasPutih.js') }}"></script>
<script src="{{ asset('js/bonkasMerah.js') }}"></script>
<script src="{{ asset('js/bootstrap@5.0.2.min.js') }}"></script>

@if(session('successBonKas'))
<script>
document.addEventListener('DOMContentLoaded', function () {

    const data = @json(session('successBonKas'));

    Swal.fire({
        icon: 'success',
        title: 'Bon Kas Berhasil Dibuat',
        html: `
            <p class="mb-3">
                ${
                    data.action === 'kirim'
                        ? 'Bon Kas berhasil dibuat dan dikirim.'
                        : 'Bon Kas berhasil disimpan.'
                }
            </p>

            <div class="d-flex border rounded overflow-hidden">
                <div class="bg-light fw-bold px-3 py-2 border-end" style="width:35%;">
                    Kode Bon Kas
                </div>
                <div class="flex-grow-1 px-3 py-2 text-center">
                    <strong class="text-primary">${data.kode}</strong>
                </div>
            </div>
        `,
        iconColor: '#198754',
        confirmButtonText: 'OK',
        confirmButtonColor: '#198754'
    });

});
</script>
@endif

@endsection
