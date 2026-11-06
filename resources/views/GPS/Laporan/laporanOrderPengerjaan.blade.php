@extends('layouts.appGPS')

@section('title')
    Order Pengerjaan yang Masuk
@endsection

@section('content')
    <style>
        .GPS_root { width: 100%; }

        #laporan_order_form {
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

        .table-responsive { max-height: 380px; overflow: auto; }

        .chart-box {
            position: relative;
            width: 100%;
            height: 400px;
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
        <div id="laporan_order_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-bar-chart-line me-2"></i>Order Pengerjaan yang Masuk
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
                        <div class="col-lg-3 d-flex align-items-end">
                            <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold w-100">Refresh</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="text-end">
                        <span class="range-bar" id="rangeInfo">Periode: -</span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-4">
                    <div class="table-responsive border rounded p-2">
                        <table class="table table-bordered table-hover mb-0" style="width:100%">
                            <thead class="table-light">
                                <tr>
                                    <th class="tbl-hdr">BULAN</th>
                                    <th class="tbl-hdr">ORDER MASUK</th>
                                </tr>
                            </thead>
                            <tbody id="tbodyData">
                                <tr><td colspan="2" class="text-center text-muted">Memuat data...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col-lg-8">
                    <div class="chart-box">
                        <canvas id="orderChart"></canvas>
                    </div>
                </div>
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
        window.laporanOrderConfig = {
            routeGetData: "{{ route('GPS.LaporanOrderPengerjaan.get-data') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/Laporan/laporanOrderPengerjaan.js') }}"></script>
@endsection
