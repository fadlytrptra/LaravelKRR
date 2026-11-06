@extends('layouts.appGPS')

@section('title')
    Maintenance Bagian Gambar
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #maint_bagian_form {
            max-width: 1100px;
            margin: 0 auto;
            padding: 20px;
        }

        .lookup-btn {
            cursor: pointer;
            background: #e9ecef;
            border: 1px solid #ced4da;
            border-left: none;
            border-radius: 0 0.25rem 0.25rem 0;
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .lookup-btn:hover {
            background: #dee2e6;
        }

        .input-group-lookup .form-control {
            border-radius: 0.25rem 0 0 0.25rem;
        }
    </style>

    <div class="GPS_root">
        <div id="maint_bagian_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-card-list me-2"></i>Maintenance Bagian Gambar
            </h4>

            <fieldset id="Frame1" disabled>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">No. Order:</div>
                    <div class="col-lg-2">
                        <input type="text" id="TNoOd" class="form-control text-uppercase"
                            placeholder="Ketik & Enter..." autocomplete="off">
                    </div>
                    <div class="col-lg-8">
                        <span id="OdSts" class="fw-bold text-danger mt-1 d-inline-block"></span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Divisi:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TDivisi" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Kode Barang:</div>
                    <div class="col-lg-3">
                        <input type="text" id="TKdBrg" class="form-control bg-white" disabled readonly>
                    </div>
                    <div class="col-lg-2 aligned-text text-lg-end">No. Gambar Rev:</div>
                    <div class="col-lg-5">
                        <input type="text" id="TNoGbr" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Nama Barang:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TNamaBrg" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Mesin:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TMesin1" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Pengorder:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TUserOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Ket. Order:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TKetOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-lg-2 aligned-text">Nama Bagian:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TBagian" class="form-control"
                                placeholder="Ketik Nama Bagian atau klik ...">
                            <button class="lookup-btn" id="btnBagian" title="Cari Bagian">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <input type="hidden" id="TIdBagian" value="">
                    </div>
                </div>

            </fieldset>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-7">
                    <button type="button" id="btnIsi" class="btn btn-primary fw-bold me-2">
                        <i class="bi bi-plus-circle"></i> ISI
                    </button>
                    <button type="button" id="btnKoreksi" class="btn btn-warning fw-bold me-2">
                        <i class="bi bi-pencil-square"></i> KOREKSI
                    </button>
                    <button type="button" id="btnHapus" class="btn btn-danger fw-bold me-2">
                        <i class="bi bi-trash"></i> HAPUS
                    </button>
                </div>
                <div class="col-md-5 text-end">
                    <button type="button" id="btnProses" class="btn btn-success fw-bold px-4 me-2" disabled>PROSES</button>
                    <button type="button" id="btnKeluar" class="btn btn-secondary fw-bold px-4">KELUAR</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.maintBagianConfig = {
            routeGetOrder: "{{ route('GPS.konstruksiBagianGambar.get-order') }}",
            routeGetBagianList: "{{ route('GPS.konstruksiBagianGambar.get-bagian-list') }}",
            routeStore: "{{ route('GPS.konstruksiBagianGambar.store') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalKonstruksi/konstruksiBagianGambar.js') }}"></script>
@endsection
