@extends('layouts.appGPS')

@section('title')
    Maintenance Bagian Barang
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #maint_bagian_barang_form {
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
            border-radius: 0 0.25rem 0 0.25rem;
        }

        .input-group-lookup .form-control:first-child {
            border-radius: 0.25rem 0 0 0.25rem;
        }

        /* fieldset {
                border: 1px solid #ced4da;
                border-radius: 0.25rem;
                padding: 15px 15px 5px 15px;
                margin-bottom: 15px;
            } */

        /* legend {
                font-size: 0.95rem;
                font-weight: bold;
                width: auto;
                padding: 0 8px;
            } */
    </style>

    <div class="GPS_root">
        <div id="maint_bagian_barang_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-tools me-2"></i>Order Kerja
            </h4>

            <div class="row mb-3">
                <div class="col-md-12">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="jenisOd" id="OptHarian" value="H" checked>
                        <label class="form-check-label" for="OptHarian">Harian</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="jenisOd" id="OptProyek" value="P">
                        <label class="form-check-label" for="OptProyek">Proyek</label>
                    </div>
                </div>
            </div>
            <fieldset id="Frame1" disabled>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">No. Order:</div>
                    <div class="col-lg-2">
                        <input type="text" id="TNoOd" class="form-control text-uppercase"
                            placeholder="Ketik & Enter..." autocomplete="off">
                    </div>
                    <div class="col-lg-8">
                        <span id="OdSts" class="fw-bold text-danger mt-1 d-inline-block"></span>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Divisi:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TDivisi" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Kode Barang:</div>
                    <div class="col-lg-4">
                        <input type="text" id="TKdBrg" class="form-control bg-white" disabled readonly>
                    </div>
                    <div class="col-lg-2 aligned-text text-lg-end">No. Gambar:</div>
                    <div class="col-lg-4">
                        <input type="text" id="TNoGbr" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Nama Barang:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TNamaBrg" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Jumlah Order:</div>
                    <div class="col-lg-3">
                        <input type="text" id="TJml" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Mesin:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TMesin" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Pengorder:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TUserOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Ket. Order:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TKetOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-2">
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

            <div class="row mt-3 pt-3">
                <div class="col-md-7">
                    <button type="button" id="btnIsi" class="btn btn-primary fw-bold me-2">
                        <i class="bi bi-plus-circle"></i> ISI
                    </button>
                    <button type="button" id="btnKoreksi" class="btn btn-warning fw-bold text-dark me-2">
                        <i class="bi bi-pencil-square"></i> KOREKSI
                    </button>
                    <button type="button" id="btnHapus" class="btn btn-danger fw-bold me-2">
                        <i class="bi bi-trash"></i> HAPUS
                    </button>
                </div>
                <div class="col-md-5 text-end">
                    <button type="button" id="btnProses" class="btn btn-success fw-bold" disabled>PROSES</button>
                    <button type="button" id="btnKeluar" class="btn btn-secondary fw-bold px-4">KELUAR</button>
                </div>
            </div>

            <fieldset id="Frame2" class="row mt-3 pt-3" disabled>
                <h4 class="mb-4 fw-bold border-bottom pb-2">
                    <i class="bi bi-gear me-2"></i>Material
                </h4>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Material Type:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TMaterial" class="form-control"
                                placeholder="Ketik Material Type atau klik ...">
                            <button class="lookup-btn" id="btnMat" title="Cari Material">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <input type="hidden" id="TNoMat" value="">
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Spesifikasi:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TSpek" class="form-control"
                                placeholder="Ketik Spesifikasi atau klik ...">
                            <button class="lookup-btn" id="btnSpek" title="Cari Spesifikasi">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <input type="hidden" id="TNoSpek" value="">
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Kd. Barang:</div>
                    <div class="col-lg-3">
                        <input type="text" id="TKdBrg1" class="form-control" placeholder="Kode Barang">
                    </div>
                    <div class="col-lg-2 aligned-text text-lg-end">Status Barang:</div>
                    <div class="col-lg-2">
                        <input type="text" id="TSts"
                            class="form-control bg-white text-center fw-bold text-primary" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-12">
                        <button type="button" id="btnIsiM" class="btn btn-primary fw-bold me-2">ISI</button>
                        <button type="button" id="btnKoreksiM"
                            class="btn btn-warning fw-bold text-dark me-2">KOREKSI</button>
                        <button type="button" id="btnHapusM" class="btn btn-danger fw-bold me-2">HAPUS</button>
                        <button type="button" id="btnProsesM" class="btn btn-success fw-bold" disabled>PROSES</button>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>

    <script>
        window.maintBagianBarangConfig = {
            routeGetOrder: "{{ route('GPS.pengerjaanBagianBarang.get-order') }}",
            routeGetBagianList: "{{ route('GPS.pengerjaanBagianBarang.get-bagian-list') }}",
            routeGetMaterialList: "{{ route('GPS.pengerjaanBagianBarang.get-material-list') }}",
            routeGetSpekList: "{{ route('GPS.pengerjaanBagianBarang.get-spek-list') }}",
            routeGetSatuanList: "{{ route('GPS.pengerjaanBagianBarang.get-satuan-list') }}",
            routeProcessBagian: "{{ route('GPS.pengerjaanBagianBarang.process-bagian') }}",
            routeProcessMaterial: "{{ route('GPS.pengerjaanBagianBarang.process-material') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalPengerjaan/pengerjaanBagianBarang.js') }}"></script>
@endsection
