@extends('layouts.appGPS')

@section('title')
    Edit Jam Kerja Optimal
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #edit_jam_pkj_form {
            max-width: 640px;
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
            border-radius: 0 0.25rem 0 0.25rem;
        }

        .input-group-lookup .form-control:first-child {
            border-radius: 0.25rem 0 0 0.25rem;
        }

        .info-sisa {
            font-size: 0.9rem;
            color: #6c757d;
        }

        .disabled-field {
            background-color: #e9ecef;
            opacity: 0.8;
        }
    </style>

    <div class="GPS_root">
        <div id="edit_jam_pkj_form" class="form border rounded p-4 shadow-sm" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-clock-history me-2"></i>Edit Jam Kerja Optimal - Pengerjaan
            </h4>

            <fieldset id="Frame2">

                <div class="row mt-3">
                    <div class="col-lg-3 aligned-text">Tanggal:</div>
                    <div class="col-lg-5">
                        <input type="date" id="Tanggal" class="form-control" value="{{ $tanggal }}">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-3 aligned-text">Nama Mesin:</div>
                    <div class="col-lg-7">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TMesin" class="form-control" readonly value="{{ $namaMesin }}"
                                placeholder="Pilih Mesin...">
                            <button class="lookup-btn" id="btnMesin" title="Cari Mesin">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <input type="hidden" id="TNoMesin" value="{{ $noMesin }}">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-3 aligned-text">Type Mesin:</div>
                    <div class="col-lg-7">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TType" class="form-control" readonly value="{{ $namaType }}"
                                placeholder="Pilih Type Mesin...">
                            <button class="lookup-btn" id="btnType" title="Cari Type Mesin">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <input type="hidden" id="TNoType" value="{{ $noType }}">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-3 aligned-text">Jml Jam Kerja:</div>
                    <div class="col-lg-2">
                        <input type="number" id="TJam" class="form-control text-center" value="0" min="1"
                            step="1">
                    </div>
                    <div class="col-lg-1 aligned-text">JAM</div>
                    <div class="col-lg-6">
                        <span class="info-sisa" id="infoSisa"></span>
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
        window.editJamPkjConfig = {
            routeGetMesinList: "{{ route('GPS.pengerjaanJamKerja.get-mesin-list') }}",
            routeGetTypeList: "{{ route('GPS.pengerjaanJamKerja.get-type-list') }}",
            routeGetJamKerja: "{{ route('GPS.pengerjaanJamKerja.get-jam-kerja') }}",
            routeHitungSisa: "{{ route('GPS.pengerjaanJamKerja.hitung-sisa') }}",
            routeStore: "{{ route('GPS.pengerjaanJamKerja.store') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalPengerjaan/pengerjaanJamKerja.js') }}"></script>
@endsection
