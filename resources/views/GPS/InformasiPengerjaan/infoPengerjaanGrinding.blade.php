@extends('layouts.appGPS')

@section('title')
    Grafik Mesin Grinding
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #grafik_grinding_form {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
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
            letter-spacing: 3px;
        }

        /* Grid hari (7 kolom × maksimal 5 baris) */
        .day-grid {
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            gap: 8px;
        }

        .day-card {
            border: 1px solid #ced4da;
            border-radius: .25rem;
            padding: 6px;
            background: #fff;
        }

        .day-card .day-label {
            text-align: center;
            font-weight: bold;
            font-size: .85rem;
            border-bottom: 1px solid #e9ecef;
            margin-bottom: 4px;
            padding-bottom: 2px;
        }

        .cell-bar-row {
            display: flex;
            align-items: center;
            gap: 4px;
            margin-bottom: 2px;
        }

        .cell-bar-row .bar-tag {
            font-size: .7rem;
            font-weight: bold;
            width: 12px;
            text-align: center;
        }

        .cell-bar-row .bar-tag.a {
            color: blue;
        }

        .cell-bar-row .bar-tag.b {
            color: red;
        }

        .cell-bar-row .progress {
            flex: 1 1 auto;
            height: 12px;
        }

        .cell-bar-row .jam-label {
            font-size: .7rem;
            min-width: 20px;
            text-align: right;
        }

        .jam-label.full {
            color: orangered;
            font-weight: bold;
        }

        .legend-box {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 6px;
            margin-left: 6px !important;
            margin-top: 4px;
            border: 1px solid #ccc;
        }
    </style>

    <div class="GPS_root">
        <div id="grafik_grinding_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-bar-chart-line me-2"></i>Grafik Mesin Grinding
            </h4>

            <div class="row align-items-end mb-3">
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-lg-4">
                            <label class="form-label">Bulan:</label>
                            <input type="number" id="TBln" class="form-control" min="1" max="12"
                                maxlength="2" value="{{ $bulan }}">
                        </div>
                        <div class="col-lg-4">
                            <label class="form-label">Tahun:</label>
                            <input type="number" id="TThn" class="form-control" min="2000" max="2100"
                                maxlength="4" value="{{ $tahun }}">
                        </div>
                        <div class="col-lg-4 d-flex align-items-end">
                            <button type="button" id="btnOK" class="btn btn-primary fw-bold w-100">OK</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="border p-2 rounded" style="background-color: #f8f9fa;">
                        <span class="fw-bold">Keterangan: </span>
                        <span class="legend-box" style="background-color: orangered;"></span>
                        FULL
                        <span class="ms-3" style="color: blue;">----> A : Cylinder Grinding Okuma</span>
                        <span class="ms-3" style="color: red;">----> B : Surface Grinding</span>
                    </div>
                </div>
            </div>

            <div class="grafik-title">G R I N D I N G</div>

            <div id="dayGrid" class="day-grid"></div>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-12 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">Keluar</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.grafikGrindingConfig = {
            routeGetData: "{{ route('GPS.InfoPengerjaanGrinding.get-data') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/InformasiPengerjaan/infoPengerjaanGrinding.js') }}"></script>
@endsection
