@extends('layouts.appGPS')

@section('title')
    Input Jadwal Konstruksi
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #input_jadwal_form {
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

        .est-label {
            font-size: 0.9rem;
            font-weight: bold;
            color: #d9534f;
        }

        .jam-kerja-label {
            font-size: 0.9rem;
            color: #d9534f;
            display: none;
        }
    </style>

    <div class="GPS_root">
        <div id="input_jadwal_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-clock-history me-2"></i>Input Jadwal Konstruksi
            </h4>

            <fieldset id="Frame1">
                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">No. Order:</div>
                    <div class="col-lg-2">
                        <input type="text" id="kons_TNoOd" class="form-control text-uppercase"
                            placeholder="Ketik & Enter..." autocomplete="off">
                    </div>
                    <div class="col-lg-8">
                        <span id="kons_OdSts" class="fw-bold text-danger mt-1 d-inline-block"></span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Divisi:</div>
                    <div class="col-lg-10">
                        <input type="text" id="kons_TDivisi" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Kode Barang:</div>
                    <div class="col-lg-3">
                        <input type="text" id="kons_TKdBrg" class="form-control bg-white" disabled readonly>
                    </div>
                    <div class="col-lg-2 aligned-text text-lg-end">No. Gambar Rev:</div>
                    <div class="col-lg-5">
                        <input type="text" id="kons_TNoGbr" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Nama Barang:</div>
                    <div class="col-lg-10">
                        <input type="text" id="kons_TNamaBrg" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Mesin:</div>
                    <div class="col-lg-10">
                        <input type="text" id="kons_TMesin1" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Pengorder:</div>
                    <div class="col-lg-10">
                        <input type="text" id="kons_TUserOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Ket. Order:</div>
                    <div class="col-lg-10">
                        <input type="text" id="kons_TKetOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>
            </fieldset>

            <fieldset id="kons_Frame2" disabled class="mt-4">
                <h5 class="mb-3 fw-bold border-bottom pb-2">
                    <i class="bi bi-gear me-2"></i>Proses Konstruksi
                </h5>

                <div class="row">
                    <div class="col-lg-6">
                        <span class="est-label">Est. Start: <span id="kons_EstStart">-</span></span>
                    </div>
                    <div class="col-lg-6 text-lg-end">
                        <span class="est-label">Est. Finish: <span id="kons_EstFinish">-</span></span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Nama Bagian:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="kons_TBagian" class="form-control" readonly
                                placeholder="Pilih bagian...">
                            <button class="lookup-btn" id="kons_btnBagian" title="Cari Bagian">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <input type="hidden" id="kons_TIdBagian" value="">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Work Station:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="kons_TWorkSts" class="form-control" readonly
                                placeholder="Pilih Work Station...">
                            <button class="lookup-btn" id="kons_btnWrkSts" title="Cari Work Station">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <input type="hidden" id="kons_TNoWorkSts" value="">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Tgl. Start:</div>
                    <div class="col-lg-3">
                        <input type="date" id="kons_TTanggal" class="form-control">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Hari Ke-:</div>
                    <div class="col-lg-2">
                        <input type="number" id="kons_THari" class="form-control text-center" value="0"
                            min="0">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Est. Waktu:</div>
                    <div class="col-lg-2">
                        <input type="number" id="kons_TEstTime" class="form-control text-center" value="0"
                            min="0" max="23">
                    </div>
                    <div class="col-lg-1 aligned-text">Jam</div>
                    <div class="col-lg-2">
                        <input type="number" id="kons_TEstTime1" class="form-control text-center" value="0"
                            min="0" max="59">
                    </div>
                    <div class="col-lg-1 aligned-text">Menit</div>
                    <div class="col-lg-4">
                        <span class="jam-kerja-label" id="kons_jamKerjaLabel">Jam Kerja: <span id="kons_JamKrj">0</span>
                            Jam</span>
                    </div>
                </div>

            </fieldset>
            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-6">
                    <button type="button" id="kons_btnProses" class="btn btn-success fw-bold px-4"
                        disabled>PROSES</button>
                    <button type="button" id="kons_btnBatal" class="btn btn-secondary fw-bold px-4">BATAL</button>
                </div>
                <div class="col-md-6 text-end">
                    <button type="button" id="kons_btnKeluar" class="btn btn-danger fw-bold px-4">KELUAR</button>
                </div>
            </div>

        </div>
    </div>

    @include('GPS.JadwalKonstruksi.frmListKons')

    <script>
        window.inputJadwalConfig = {
            routeGetOrder: "{{ route('GPS.konstruksiJadwal.get-order') }}",
            routeGetBagianList: "{{ route('GPS.konstruksiJadwal.get-bagian-list') }}",
            routeGetWorkstationList: "{{ route('GPS.konstruksiJadwal.get-workstation-list') }}",
            routeGetJamKerja: "{{ route('GPS.konstruksiJadwal.get-jam-kerja') }}",
            routeCekEstimasi: "{{ route('GPS.konstruksiJadwal.cek-estimasi') }}",
            routeCekEstDate: "{{ route('GPS.konstruksiJadwal.cek-estdate') }}",
            routeHitungSisaJam: "{{ route('GPS.konstruksiJadwal.hitung-sisa-jam') }}",
            routeCekProses: "{{ route('GPS.konstruksiJadwal.cek-proses') }}",
            routeInsertNewQue: "{{ route('GPS.konstruksiJadwal.insert-newque') }}",
            routeGetListKons: "{{ route('GPS.konstruksiJadwal.get-list-kons') }}",
            routeInsertAppQue: "{{ route('GPS.konstruksiJadwal.insert-appque') }}",
            routeEditJamKerja: "{{ route('GPS.konstruksiJamKerja.index') }}",
            serverDate: "{{ now()->toDateString() }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalKonstruksi/konstruksiJadwal.js') }}"></script>
@endsection
