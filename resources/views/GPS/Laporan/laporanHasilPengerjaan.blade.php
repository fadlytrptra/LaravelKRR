@extends('layouts.appGPS')

@section('title')
    Hasil Pengerjaan
@endsection

@section('content')
    <style>
        .GPS_root { width: 100%; }

        #laporan_hasil_form {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        .tbl-hdr {
            font-size: .8rem;
            white-space: nowrap;
        }
        .tbl-cell {
            font-size: .8rem;
            white-space: nowrap;
        }

        .table-responsive { max-height: 300px; overflow: auto; }

        .chart-box {
            position: relative;
            width: 100%;
            height: 380px;
            border: 1px solid #dee2e6;
            border-radius: .25rem;
            padding: 10px;
            background: #fff;
        }

        .range-bar {
            font-size: .85rem;
            color: #495057;
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: .25rem;
            padding: 6px 10px;
            display: inline-block;
        }
    </style>

    <div class="GPS_root">
        <div id="laporan_hasil_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-graph-up-arrow me-2"></i>Hasil Pengerjaan
            </h4>

            <div class="row align-items-end mb-3">
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-lg-3">
                            <label class="form-label">Bulan:</label>
                            <input type="number" id="TBln" class="form-control" min="1" max="12"
                                maxlength="2" value="{{ $bulan }}">
                        </div>
                        <div class="col-lg-3">
                            <label class="form-label">Tahun:</label>
                            <input type="number" id="TThn" class="form-control" min="2000" max="2100"
                                maxlength="4" value="{{ $tahun }}">
                        </div>
                        <div class="col-lg-2 d-flex align-items-end">
                            <button type="button" id="btnOk" class="btn btn-primary fw-bold w-100">OK</button>
                        </div>
                        <div class="col-lg-3 d-flex align-items-end">
                            <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold w-100">Refresh</button>
                        </div>
                    </div>
                </div>
                {{-- hapus d-none agar tampil periodenya --}}
                <div class="col-lg-6 d-none">
                    <div class="text-end">
                        <span class="range-bar" id="rangeInfo">Periode: -</span>
                    </div>
                </div>
            </div>

            <div class="table-responsive border rounded p-2 mb-3">
                <table class="table table-bordered table-hover mb-0" style="width:100%">
                    <thead class="table-light">
                        <tr>
                            <th class="tbl-hdr">BULAN</th>
                            <th class="tbl-hdr">Biaya Kerja</th>
                            <th class="tbl-hdr">Biaya Makloon</th>
                            <th class="tbl-hdr">Biaya Material</th>
                            <th class="tbl-hdr">Biaya S/Part</th>
                            <th class="tbl-hdr">Hasil Pengerjaan</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyData">
                        <tr><td colspan="6" class="text-center text-muted">Memuat data...</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="chart-box">
                <canvas id="hasilChart"></canvas>
            </div>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-12 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">Keluar</button>
                </div>
            </div>

        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

    <script>
        window.laporanHasilConfig = {
            routeGetData: "{{ route('GPS.LaporanHasilPengerjaan.get-data') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/Laporan/laporanHasilPengerjaan.js') }}"></script>
@endsection
