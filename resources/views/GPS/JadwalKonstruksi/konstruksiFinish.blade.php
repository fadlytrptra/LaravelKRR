@extends('layouts.appGPS')

@section('title')
    Finish Jadwal Konstruksi
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #finish_jadwal_form {
            max-width: 1200px;
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

        .table-responsive {
            max-height: 350px;
            overflow-y: auto;
        }

        #tblJadwal {
            white-space: nowrap;
        }

        .row-finish > td {
            color: #00ced1 !important;
        }

        .row-setuju > td {
            color: #008000 !important;
        }

        .row-tdksetuju > td {
            color: #ff8c00 !important;
        }

        .row-default > td {
            color: #000000 !important;
        }

        .legend-box {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 6px;
            border: 1px solid #ccc;
        }

        .legend-box.finish {
            background-color: #00ced1;
        }

        .legend-box.setuju {
            background-color: #008000;
        }

        .legend-box.tdksetuju {
            background-color: #ff8c00;
        }

        .legend-box.default {
            background-color: #ffffff;
        }
    </style>

    <div class="GPS_root">
        <div id="finish_jadwal_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-check2-circle me-2"></i>Finish Jadwal Konstruksi
            </h4>

            <fieldset id="Frame1">
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
                        <input type="text" id="TMesin" class="form-control bg-white" disabled readonly>
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

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Est. Start:</div>
                    <div class="col-lg-3">
                        <span id="EstStart" class="fw-bold text-danger"></span>
                    </div>
                    <div class="col-lg-2 aligned-text">Est. Finish:</div>
                    <div class="col-lg-3">
                        <span id="EstFinish" class="fw-bold text-danger"></span>
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

            <div class="row mt-3">
                <div class="col-md-12">
                    <div class="border p-2 rounded" style="background-color: #f8f9fa;">
                        <span class="legend-box finish"></span> Sdh Proses
                        <span class="legend-box setuju" style="margin-left: 20px;"></span> Disetujui
                        <span class="legend-box tdksetuju" style="margin-left: 20px;"></span> Tidak Disetujui
                        <span class="legend-box default" style="margin-left: 20px;"></span> Belum Proses
                        <span style="margin-left: 20px;"><i class="bi bi-check-square"></i> Checklist untuk dipilih</span>
                    </div>
                </div>
            </div>

            <div class="table-responsive mt-3 border rounded p-2">
                <table id="tblJadwal" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th>No Antrian</th>
                            <th>Tgl Start</th>
                            <th>Work Station</th>
                            <th style="display:none;">NoWrkSts</th>
                            <th>Est. Time</th>
                            <th>Hari Ke-</th>
                            <th>Real Time</th>
                            <th>Tgl Proses</th>
                            <th>Tgl Setuju</th>
                            <th>Tgl Tdk Setuju</th>
                            <th>Ket Tdk Setuju</th>
                            <th style="display:none;">Status</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyJadwal">
                        <tr>
                            <td colspan="12" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-6">
                    <button type="button" id="btnProses" class="btn btn-success fw-bold px-3"
                        @disabled(!$btnProses)>Proses</button>
                    <button type="button" id="btnSetuju" class="btn btn-primary fw-bold px-3"
                        @disabled(!$btnSetuju)>Disetujui</button>
                    <button type="button" id="btnTdkSetuju" class="btn btn-warning fw-bold px-3"
                        @disabled(!$btnTdkSetuju)>Tdk Disetujui</button>
                </div>
                <div class="col-md-6 text-end">
                    <button type="button" id="btnAccSpv" class="btn btn-info fw-bold px-3"
                        @disabled(!$btnAccSpv)>ACC SPV</button>
                    <button type="button" id="btnAccPPIC" class="btn btn-secondary fw-bold px-3"
                        @disabled(!$btnAccPPIC)>ACC PPIC</button>
                    <button type="button" id="btnRefresh"
                        class="btn btn-outline-secondary fw-bold px-3 border border-secondary">Refresh</button>
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-3">Keluar</button>
                </div>
            </div>

        </div>
    </div>

    @include('GPS.inputReal')
    @include('GPS.alasan1')

    <script>
        window.finishJadwalConfig = {
            routeGetOrder: "{{ route('GPS.konstruksiFinish.get-order') }}",
            routeGetBagianList: "{{ route('GPS.konstruksiFinish.get-bagian-list') }}",
            routeGetJadwal: "{{ route('GPS.konstruksiFinish.get-jadwal') }}",
            routeStore: "{{ route('GPS.konstruksiFinish.store') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalKonstruksi/konstruksiFinish.js') }}"></script>
@endsection
