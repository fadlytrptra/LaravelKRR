@extends('layouts.appGPS')

@section('title')
    Jadwal Konstruksi per Bulan
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #inf_kons_bln_form {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        .table-responsive {
            max-height: 500px;
            overflow: auto;
        }

        .table-scroll-x {
            overflow-x: auto;
        }

        .table-scroll-x table {
            min-width: 1100px;
        }

        .tbl-hdr {
            font-size: .8rem;
            white-space: nowrap;
        }

        .tbl-cell {
            font-size: .8rem;
            white-space: nowrap;
        }

        .day-cell {
            text-align: center;
            width: 25px;
            padding: 2px !important;
        }

        .row-finish > td {
            color: blue !important;
        }

        .legend-box {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 6px;
            border: 1px solid #ccc;
        }

        .legend-box.finish {
            background-color: blue;
        }
    </style>

    <div class="GPS_root">
        <div id="inf_kons_bln_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-calendar3 me-2"></i>Jadwal Konstruksi per Bulan
            </h4>

            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="row mb-3">
                        <div class="col-lg-2 aligned-text">Tanggal:</div>
                        <div class="col-lg-3">
                            <input type="date" id="Date1" class="form-control" value="{{ $startDate }}">
                        </div>
                        <div class="col-lg-1 aligned-text text-center">s/d</div>
                        <div class="col-lg-3">
                            <input type="date" id="Date2" class="form-control" value="{{ $endDate }}">
                        </div>
                        <div class="col-lg-3">
                            <button type="button" id="btnOK" class="btn btn-primary fw-bold px-4">OK</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 text-end">
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-3">Refresh</button>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="border p-2 rounded" style="background-color: #f8f9fa;">
                        <span class="legend-box finish"></span> Finish Total
                        <span class="ms-3">X = ada jadwal</span>
                        <span class="ms-3"># = Edit EstDate / DiDelete</span>
                    </div>
                </div>
            </div>

            <div class="table-responsive table-scroll-x mt-3 border rounded p-2">
                <table id="tblData" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th class="tbl-hdr">No. Order</th>
                            <th class="tbl-hdr">Nama Barang</th>
                            <th class="tbl-hdr">Nama Bagian</th>
                            <!-- 31 kolom hari -->
                            <th class="tbl-hdr day-cell">1</th>
                            <th class="tbl-hdr day-cell">2</th>
                            <th class="tbl-hdr day-cell">3</th>
                            <th class="tbl-hdr day-cell">4</th>
                            <th class="tbl-hdr day-cell">5</th>
                            <th class="tbl-hdr day-cell">6</th>
                            <th class="tbl-hdr day-cell">7</th>
                            <th class="tbl-hdr day-cell">8</th>
                            <th class="tbl-hdr day-cell">9</th>
                            <th class="tbl-hdr day-cell">10</th>
                            <th class="tbl-hdr day-cell">11</th>
                            <th class="tbl-hdr day-cell">12</th>
                            <th class="tbl-hdr day-cell">13</th>
                            <th class="tbl-hdr day-cell">14</th>
                            <th class="tbl-hdr day-cell">15</th>
                            <th class="tbl-hdr day-cell">16</th>
                            <th class="tbl-hdr day-cell">17</th>
                            <th class="tbl-hdr day-cell">18</th>
                            <th class="tbl-hdr day-cell">19</th>
                            <th class="tbl-hdr day-cell">20</th>
                            <th class="tbl-hdr day-cell">21</th>
                            <th class="tbl-hdr day-cell">22</th>
                            <th class="tbl-hdr day-cell">23</th>
                            <th class="tbl-hdr day-cell">24</th>
                            <th class="tbl-hdr day-cell">25</th>
                            <th class="tbl-hdr day-cell">26</th>
                            <th class="tbl-hdr day-cell">27</th>
                            <th class="tbl-hdr day-cell">28</th>
                            <th class="tbl-hdr day-cell">29</th>
                            <th class="tbl-hdr day-cell">30</th>
                            <th class="tbl-hdr day-cell">31</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyData">
                        <tr>
                            <td colspan="34" class="text-center">Belum ada data.</td>
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
        window.infKonsBlnConfig = {
            routeGetData: "{{ route('GPS.InfoKonstruksiBulanan.get-data') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/InformasiKonstruksi/infoKonstruksiBulanan.js') }}"></script>
@endsection
