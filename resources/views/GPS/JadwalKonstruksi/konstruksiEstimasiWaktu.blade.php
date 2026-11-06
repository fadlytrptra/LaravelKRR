@extends('layouts.appGPS')

@section('title')
    Edit Estimasi Waktu - Jadwal Konstruksi
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #edit_est_waktu_form {
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

        .table-responsive {
            max-height: 400px;
            overflow-y: auto;
        }

        .row-emergency > td {
            color: red !important;
            font-weight: bold;
        }

        .legend-box {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 6px;
            border: 1px solid #ccc;
        }

        .legend-box.emergency {
            background-color: red;
        }

        .legend-box.normal {
            background-color: white;
        }

        .est-input-group {
            display: inline-flex;
            align-items: center;
            gap: 5px;
        }

        .est-input-group input {
            width: 60px;
            text-align: center;
        }
    </style>

    <div class="GPS_root">
        <div id="edit_est_waktu_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-clock-history me-2"></i>Edit Estimasi Waktu - Jadwal Konstruksi
            </h4>

            <div class="row">
                <div class="col-lg-6">
                    <div class="row mb-3">
                        <div class="col-lg-3 aligned-text">Work Station:</div>
                        <div class="col-lg-7">
                            <div class="input-group input-group-lookup">
                                <input type="text" id="TWorkSts" class="form-control" readonly
                                    placeholder="Pilih Work Station...">
                                <span class="lookup-btn" id="btnWrkSts" title="Cari Work Station">
                                    <i class="bi bi-search"></i>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <input type="hidden" id="TNoWorkSts" value="">
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="row mb-3">
                        <div class="col-lg-3 aligned-text">Tanggal:</div>
                        <div class="col-lg-4">
                            <input type="date" id="Date1" class="form-control">
                        </div>
                        <div class="col-lg-5">
                            <button type="button" id="btnOK" class="btn btn-primary btn-sm">OK</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-12">
                    <div class="border p-2 rounded" style="background-color: #f8f9fa;">
                        <span class="legend-box emergency"></span> Emergency
                        <span class="legend-box normal" style="margin-left: 20px;"></span> Normal
                        <span style="margin-left: 20px;"><i class="bi bi-check-square"></i> Checklist (pilih 1 untuk
                            edit)</span>
                    </div>
                </div>
            </div>

            <div class="table-responsive mt-3 border rounded p-2">
                <table id="tblJadwal" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th>No Antrian</th>
                            <th>No Order</th>
                            <th>Tgl Start</th>
                            <th>Divisi</th>
                            <th>Nama Barang</th>
                            <th>Nama Bagian</th>
                            <th>Est. Time</th>
                            <th>Hari Ke-</th>
                            <th style="display:none;">IdBagian</th>
                            <th style="display:none;">EstHour</th>
                            <th style="display:none;">EstMinute</th>
                            <th style="display:none;">Status</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyJadwal">
                        <tr>
                            <td colspan="13" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-3 align-items-center border-top pt-3">
                <div class="col-lg-2 aligned-text">Est. Waktu Baru:</div>
                <div class="col-lg-4">
                    <div class="est-input-group">
                        <input type="number" id="TEstTime" class="form-control" value="0" min="0"
                            max="23" disabled>
                        <span>JAM</span>
                        <input type="number" id="TEstTime1" class="form-control" value="0" min="0"
                            max="59" disabled>
                        <span>MENIT</span>
                    </div>
                </div>
                <div class="col-lg-6 text-end">
                    <button type="button" id="btnEdit" class="btn btn-outline-primary fw-bold px-3 border border-primary">Edit</button>
                    <button type="button" id="btnBatal" class="btn btn-outline-secondary fw-bold px-3 border border-secondary">Batal</button>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-8">
                    <button type="button" id="btnProses" class="btn btn-success fw-bold px-4" disabled>PROSES</button>
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-3">Refresh</button>
                </div>
                <div class="col-md-4 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">KELUAR</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.editEstWaktuConfig = {
            routeGetWorkstationList: "{{ route('GPS.konstruksiEstimasiWaktu.get-workstation-list') }}",
            routeGetJadwal: "{{ route('GPS.konstruksiEstimasiWaktu.get-jadwal') }}",
            routeHitungJam: "{{ route('GPS.konstruksiEstimasiWaktu.hitung-jam') }}",
            routeStore: "{{ route('GPS.konstruksiEstimasiWaktu.store') }}",
            routeEditJamKerja: "/GPS/EditJamKerjaOptimal"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalKonstruksi/konstruksiEstimasiWaktu.js') }}"></script>
@endsection
