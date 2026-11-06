@extends('layouts.appGPS')

@section('title')
    Edit Estimasi Tanggal
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #edit_tanggal_form {
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

        .emergency-row > td {
            color: red !important;
        }

        .legend-box {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 5px;
            border: 1px solid #ccc;
        }

        .legend-box.emergency {
            background-color: red;
        }

        .legend-box.normal {
            background-color: white;
        }
    </style>

    <div class="GPS_root">
        <div id="edit_tanggal_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-calendar-range me-2"></i>Edit Estimasi Tanggal - Jadwal Konstruksi
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

                <div class="col-lg-6">
                    <div class="border p-2 rounded" style="background-color: #f8f9fa;">
                        <span class="legend-box emergency"></span> Emergency
                        <span class="legend-box normal" style="margin-left: 20px;"></span> Normal
                        <span style="margin-left: 20px;"><i class="bi bi-check-square"></i> Checklist untuk dipilih</span>
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
                            <td colspan="12" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-6">
                    <button type="button" id="btnProses" class="btn btn-success fw-bold px-4">PROSES</button>
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-4">Refresh</button>
                </div>
                <div class="col-md-6 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">Keluar</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.editTanggalConfig = {
            routeGetWorkstationList: "{{ route('GPS.konstruksiEstimasiTanggal.get-workstation-list') }}",
            routeGetJadwal: "{{ route('GPS.konstruksiEstimasiTanggal.get-jadwal') }}",
            routeStore: "{{ route('GPS.konstruksiEstimasiTanggal.store') }}",
            routeEditJamKerja: "{{ route('GPS.konstruksiJamKerja.index') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalKonstruksi/konstruksiEstimasiTanggal.js') }}"></script>
@endsection
