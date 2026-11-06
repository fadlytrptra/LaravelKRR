@extends('layouts.appGPS')

@section('title')
    Biaya Proses Makloon
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #pkj_makloon_form {
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

        .table-responsive {
            max-height: 400px;
            overflow-y: auto;
        }

        .text-end {
            text-align: right;
        }
    </style>

    <div class="GPS_root">
        <div id="pkj_makloon_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-cash-coin me-2"></i>Biaya Proses Makloon
            </h4>

            <fieldset id="Frame1">
                <legend>Order Kerja</legend>

                <div class="row mb-2">
                    <div class="col-md-12">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="jenisOd" id="OptHarian" value="H"
                                checked>
                            <label class="form-check-label" for="OptHarian">Harian</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="jenisOd" id="OptProyek" value="P">
                            <label class="form-check-label" for="OptProyek">Proyek</label>
                        </div>
                    </div>
                </div>

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
                    <div class="col-lg-3">
                        <input type="text" id="TKdBrg" class="form-control bg-white" disabled readonly>
                    </div>
                    <div class="col-lg-2 aligned-text text-lg-end">No. Gambar:</div>
                    <div class="col-lg-5">
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

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Nama Bagian:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TBagian" class="form-control" readonly
                                placeholder="Pilih bagian...">
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

            <div class="table-responsive mt-3 border rounded p-2">
                <table id="tblJadwal" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th>Proses Makloon</th>
                            <th style="display:none;">NoType</th>
                            <th>JmlBrg</th>
                            <th>Harga/PC</th>
                            <th>HargaTotal</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyJadwal">
                        <tr>
                            <td colspan="6" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-6">
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-3 me-1">Refresh</button>
                    <button type="button" id="btnProses" class="btn btn-success fw-bold px-4">PROSES</button>
                </div>
                <div class="col-md-6 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">Keluar</button>
                </div>
            </div>

        </div>
    </div>
    @include('GPS.inputBiayaMakloon')

    <script>
        window.pkjMakloonConfig = {
            routeGetOrder: "{{ route('GPS.pengerjaanMakloon.get-order') }}",
            routeGetBagianList: "{{ route('GPS.pengerjaanMakloon.get-bagian-list') }}",
            routeGetJadwal: "{{ route('GPS.pengerjaanMakloon.get-jadwal') }}",
            routeStore: "{{ route('GPS.pengerjaanMakloon.store') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalPengerjaan/pengerjaanMakloon.js') }}"></script>
@endsection
