@extends('layouts.appGPS')

@section('title')
    Edit Jam Kerja Optimal
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #edit_jam_form {
            max-width: 600px;
            margin: 40px auto;
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

        .info-label {
            font-size: 0.9rem;
            color: #6c757d;
        }

        .jam-label {
            font-weight: bold;
        }

        .disabled-field {
            background-color: #e9ecef;
            opacity: 0.8;
        }
    </style>

    <div class="GPS_root">
        <div id="edit_jam_form" class="form border rounded p-4 shadow-sm" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-clock-edit me-2"></i>Edit Jam Kerja Optimal - Konstruksi
            </h4>

            <fieldset id="Frame2">

                <div class="row mt-3">
                    <div class="col-lg-3 aligned-text">Tanggal:</div>
                    <div class="col-lg-5">
                        <input type="date" id="Tanggal" class="form-control" value="{{ $tanggal }}">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-3 aligned-text">Work Station:</div>
                    <div class="col-lg-7">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TWorkSts" class="form-control" readonly value="{{ $workstsName }}"
                                placeholder="Pilih Work Station...">
                            <button class="lookup-btn" id="btnWrkSts" title="Cari Work Station">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <input type="hidden" id="TNoWorkSts" value="{{ $worksts }}">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-3 aligned-text">Jml Jam Kerja:</div>
                    <div class="col-lg-3">
                        <input type="number" id="TJam" class="form-control text-center" value="0" min="1"
                            step="1">
                    </div>
                    <div class="col-lg-1 aligned-text">JAM</div>
                    <div class="col-lg-5">
                        <span class="info-label" id="infoSisa"></span>
                    </div>
                </div>

                <div class="row mt-4 pt-3 border-top">
                    <div class="col-md-6">
                        <button type="button" id="btnProses" class="btn btn-success fw-bold px-4" disabled>PROSES</button>
                    </div>
                    <div class="col-md-6 text-end">
                        <button type="button" id="btnKeluar" class="btn btn-secondary fw-bold px-4">Keluar</button>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>

    <script>
        window.editJamConfig = {
            routeGetWorkstationList: "{{ route('GPS.konstruksiJamKerja.get-workstation-list') }}",
            routeGetJamKerja: "{{ route('GPS.konstruksiJamKerja.get-jam-kerja') }}",
            routeHitungSisa: "{{ route('GPS.konstruksiJamKerja.hitung-sisa') }}",
            routeStore: "{{ route('GPS.konstruksiJamKerja.store') }}",
            routeReturnEstimasiTanggal: "{{ route('GPS.konstruksiEstimasiTanggal.index') }}",
            routeReturnInputJadwal: "{{ route('GPS.konstruksiJadwal.index') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalKonstruksi/konstruksiJamKerja.js') }}"></script>
@endsection
