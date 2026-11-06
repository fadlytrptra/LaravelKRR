@extends('layouts.appGPS')

@section('title')
    Daftar Estimasi Jadwal
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #inf_kons_est_form {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }

        .table-responsive {
            max-height: 500px;
            overflow-y: auto;
        }

        .tbl-hdr {
            font-size: 0.85rem;
            white-space: nowrap;
        }

        .tbl-cell {
            font-size: 0.85rem;
            white-space: nowrap;
        }

        .row-finish > td {
            color: blue !important;
        }

        .row-overtime > td {
            color: red !important;
        }

        .legend-box {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 6px;
            border: 1px solid #ccc;
        }

        .legend-box.overtime {
            background-color: red;
        }

        .legend-box.finish {
            background-color: blue;
        }

        .legend-box.normal {
            background-color: white;
        }
    </style>

    <div class="GPS_root">
        <div id="inf_kons_est_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-calendar-check me-2"></i>Daftar Estimasi Jadwal
            </h4>

            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="form-check mb-2">
                        <input class="form-check-input" type="radio" name="mode" id="optHariIni" value="1" checked>
                        <label class="form-check-label" for="optHariIni">Est. Tgl. Finish per hari ini</label>
                    </div>
                    <div class="form-check mb-2">
                        <input class="form-check-input" type="radio" name="mode" id="optTgl" value="2">
                        <label class="form-check-label" for="optTgl">Est. Jadwal mulai</label>
                    </div>

                    <div class="row mb-2">
                        <div class="col-lg-4">
                            <span id="Tanggal" class="fw-bold">{{ \Carbon\Carbon::now()->format('d-m-Y') }}</span>
                        </div>
                        <div class="col-lg-3">
                            <input type="date" id="Date1" class="form-control" value="{{ $startDate }}" disabled>
                        </div>
                        <div class="col-lg-1 aligned-text text-center">s/d</div>
                        <div class="col-lg-3">
                            <input type="date" id="Date2" class="form-control" value="{{ $endDate }}" disabled>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 text-end">
                    <button type="button" id="btnOK" class="btn btn-primary fw-bold px-4">OK</button>
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-3">Refresh</button>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="border p-2 rounded" style="background-color: #f8f9fa;">
                        <span class="legend-box overtime"></span> Over Time
                        <span class="legend-box finish" style="margin-left: 20px;"></span> Finish
                        <span class="legend-box normal" style="margin-left: 20px;"></span> Normal
                    </div>
                </div>
            </div>

            <div class="table-responsive mt-3 border rounded p-2">
                <table id="tblData" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th class="tbl-hdr">No Order</th>
                            <th class="tbl-hdr">Nama Divisi</th>
                            <th class="tbl-hdr">Nama Barang</th>
                            <th class="tbl-hdr">Tgl. Start</th>
                            <th class="tbl-hdr">Tgl. Finish</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyData">
                        <tr>
                            <td colspan="5" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-12 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">Keluar</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.infKonsEstConfig = {
            routeGetData: "{{ route('GPS.InfoKonstruksiEstimasi.get-data') }}",
            today: "{{ $today }}"
        };
    </script>

    <script src="{{ asset('js/GPS/InformasiKonstruksi/infoKonstruksiEstimasi.js') }}"></script>
@endsection
