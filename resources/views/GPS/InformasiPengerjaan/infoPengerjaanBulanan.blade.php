@extends('layouts.appGPS')

@section('title')
    Jadwal Pengerjaan per Bulan
@endsection

@section('content')
    <style>
        .GPS_root { width: 100%; }

        #grafik_bulanan_form {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        .table-responsive { max-height: 600px; overflow: auto; }

        .table-scroll-x {
            overflow-x: auto;
            overflow-y: auto;
        }
        .table-scroll-x table { min-width: 1200px; }

        .tbl-hdr {
            font-size: .75rem;
            white-space: nowrap;
            text-align: center;
            background-color: #f8f9fa;
        }

        .tbl-cell {
            font-size: .75rem;
            white-space: nowrap;
            padding: .25rem .4rem !important;
        }

        /* Kolom tetap (No.Order, NamaBarang, NamaBagian) */
        .col-fixed {
            position: sticky;
            background-color: #fff;
            z-index: 2;
        }
        .col-fixed:nth-child(1) { left: 0;    min-width: 80px; }
        .col-fixed:nth-child(2) { left: 80px; min-width: 130px; }
        .col-fixed:nth-child(3) { left: 210px;min-width: 110px; }

        thead .col-fixed { z-index: 3; background-color: #f8f9fa; }

        .day-cell {
            width: 28px;
            min-width: 28px;
            font-weight: bold;
        }

        .day-x      { color: #0d6efd; }   /* biru untuk X */
        .day-cancel { color: #dc3545; }   /* merah untuk # */
        .day-hidden { background-color: #f1f3f5; }

        .row-finish-total > td { color: blue !important; }

        .legend-box {
            display: inline-block;
            width: 14px; height: 14px;
            margin-right: 6px;
            border: 1px solid #ccc;
        }

        /* Header strip */
        .grafik-title {
            background: ivory;
            border: 1px solid #dee2e6;
            border-radius: .25rem;
            color: indigo;
            text-align: center;
            font-weight: bold;
            padding: 8px 0;
            margin-bottom: 15px;
            font-size: 1.1rem;
            letter-spacing: 2px;
        }
    </style>

    <div class="GPS_root">
        <div id="grafik_bulanan_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-calendar-month me-2"></i>Jadwal Pengerjaan per Bulan
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
                            <button type="button" id="btnOK" class="btn btn-primary fw-bold w-100">OK</button>
                        </div>
                        <div class="col-lg-3 d-flex align-items-end">
                            <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold w-100">Refresh</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="border p-2 rounded" style="background-color: #f8f9fa;">
                        <span class="fw-bold">Keterangan: </span>
                        <span style="color: blue;" class="fw-bold me-3">xxxxx → : Finish Total</span>
                        <span class="fw-bold me-1">X</span> : Ada Jadwal
                        <span class="ms-3 fw-bold" style="color:#dc3545;">#</span> : Edit EstDate / Di-Delete
                    </div>
                </div>
            </div>

            <div class="grafik-title">J A D W A L &nbsp; P E R &nbsp; B U L A N</div>

            <div class="table-responsive table-scroll-x border rounded p-2">
                <table class="table table-bordered table-hover mb-0" style="width:100%">
                    <thead>
                        <tr>
                            <th class="tbl-hdr col-fixed">No.Order</th>
                            <th class="tbl-hdr col-fixed">Nama Barang</th>
                            <th class="tbl-hdr col-fixed">Nama Bagian</th>
                            @for ($d = 1; $d <= 31; $d++)
                                <th class="tbl-hdr day-cell">{{ $d }}</th>
                            @endfor
                        </tr>
                    </thead>
                    <tbody id="tbodyData">
                        <tr><td colspan="34" class="text-center text-muted">Memuat data...</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-3 pt-3 border-top">
                <div class="col-md-12 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">Keluar</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.grafikBulananConfig = {
            routeGetData: "{{ route('GPS.InfoPengerjaanBulanan.get-data') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/InformasiPengerjaan/infoPengerjaanBulanan.js') }}"></script>
@endsection
