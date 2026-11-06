@extends('layouts.appGPS')

@section('title')
    Input Jadwal Pengerjaan
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #input_proses_form {
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

        .jam-kerja-label {
            font-size: 0.9rem;
            color: #d9534f;
            display: none;
        }
    </style>

    <div class="GPS_root">
        <div id="input_proses_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-clock-history me-2"></i>Input Jadwal Pengerjaan
            </h4>

            <fieldset id="pros_Frame1">
                <div class="row mt-3">
                    <div class="col-lg-12">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="jenisOd" id="pros_OptHarian" value="H"
                                checked>
                            <label class="form-check-label" for="pros_OptHarian">Harian</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="jenisOd" id="pros_OptProyek"
                                value="P">
                            <label class="form-check-label" for="pros_OptProyek">Proyek</label>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">No. Order:</div>
                    <div class="col-lg-2">
                        <input type="text" id="pros_TNoOd" class="form-control text-uppercase"
                            placeholder="Ketik & Enter..." autocomplete="off">
                    </div>
                    <div class="col-lg-8">
                        <span id="pros_OdSts" class="fw-bold text-danger mt-1 d-inline-block"></span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Divisi:</div>
                    <div class="col-lg-10">
                        <input type="text" id="pros_TDivisi" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Kode Barang:</div>
                    <div class="col-lg-3">
                        <input type="text" id="pros_TKdBrg" class="form-control bg-white" disabled readonly>
                    </div>
                    <div class="col-lg-2 aligned-text text-lg-end">No. Gambar:</div>
                    <div class="col-lg-5">
                        <input type="text" id="pros_TNoGbr" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Nama Barang:</div>
                    <div class="col-lg-10">
                        <input type="text" id="pros_TNamaBrg" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Mesin:</div>
                    <div class="col-lg-10">
                        <input type="text" id="pros_TMesin1" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Pengorder:</div>
                    <div class="col-lg-10">
                        <input type="text" id="pros_TUserOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Ket. Order:</div>
                    <div class="col-lg-10">
                        <input type="text" id="pros_TKetOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Jumlah Order:</div>
                    <div class="col-lg-3">
                        <input type="text" id="pros_TJml" class="form-control bg-white text-end" disabled readonly>
                    </div>
                </div>
            </fieldset>

            <fieldset id="pros_Frame2" disabled class="mt-4">
                <h5 class="mb-3 fw-bold border-bottom pb-2">
                    <i class="bi bi-gear me-2"></i>Proses Kerja
                </h5>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Nama Bagian:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="pros_TBagian" class="form-control" readonly
                                placeholder="Pilih bagian...">
                            <button class="lookup-btn" id="pros_btnBagian" title="Cari Bagian">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <input type="hidden" id="pros_TIdBagian" value="">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Jml Brg yg Dikerjakan:</div>
                    <div class="col-lg-2">
                        <input type="number" id="pros_TJml1" class="form-control text-center" value="0"
                            min="0">
                    </div>

                    <div class="col-lg-2 aligned-text">Hari Ke-:</div>
                    <div class="col-lg-2">
                        <input type="number" id="pros_THari" class="form-control text-center" value="0"
                            min="0">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Nama Mesin:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="pros_TMesin" class="form-control" readonly
                                placeholder="Pilih mesin...">
                            <button class="lookup-btn" id="pros_btnMesin" title="Cari Mesin">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <input type="hidden" id="pros_TNoMesin" value="">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Type Mesin:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="pros_TType" class="form-control" readonly
                                placeholder="Pilih type...">
                            <button class="lookup-btn" id="pros_btnType" title="Cari Type">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <input type="hidden" id="pros_TNoType" value="">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Tgl. Start:</div>
                    <div class="col-lg-3">
                        <input type="date" id="pros_EstDate" class="form-control">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Est. Waktu:</div>
                    <div class="col-lg-2">
                        <input type="number" id="pros_TEstTime" class="form-control text-center" value="0"
                            min="0" max="23">
                    </div>
                    <div class="col-lg-1 aligned-text">Jam</div>
                    <div class="col-lg-2">
                        <input type="number" id="pros_TEstTime1" class="form-control text-center" value="0"
                            min="0" max="59">
                    </div>
                    <div class="col-lg-1 aligned-text">Menit</div>
                    <div class="col-lg-4">
                        <span class="jam-kerja-label" id="pros_jamKerjaLabel">
                            Jam Kerja: <span id="pros_JamKrj">0</span> Jam
                        </span>
                    </div>
                </div>
            </fieldset>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-6">
                    <button type="button" id="pros_btnProses" class="btn btn-success fw-bold px-4"
                        disabled>PROSES</button>
                    <button type="button" id="pros_btnBatal" class="btn btn-secondary fw-bold px-4 ms-2">BATAL</button>
                </div>
                <div class="col-md-6 text-end">
                    <button type="button" id="pros_btnKeluar" class="btn btn-danger fw-bold px-4">KELUAR</button>
                </div>
            </div>

        </div>
    </div>

    @include('GPS.JadwalPengerjaan.frmListOpr')

    <script>
        window.prosesJadwalConfig = {
            routeGetOrder: "{{ route('GPS.pengerjaanJadwal.get-order') }}",
            routeGetBagianList: "{{ route('GPS.pengerjaanJadwal.get-bagian-list') }}",
            routeGetMesinList: "{{ route('GPS.pengerjaanJadwal.get-mesin-list') }}",
            routeGetTypeList: "{{ route('GPS.pengerjaanJadwal.get-type-list') }}",
            routeGetJamKerja: "{{ route('GPS.pengerjaanJadwal.get-jam-kerja') }}",
            routeCekProses: "{{ route('GPS.pengerjaanJadwal.cek-proses') }}",
            routeCekEstDate: "{{ route('GPS.pengerjaanJadwal.cek-estdate') }}",
            routeHitungSisaJam: "{{ route('GPS.pengerjaanJadwal.hitung-sisa-jam') }}",
            routeInsertNewQue: "{{ route('GPS.pengerjaanJadwal.insert-newque') }}",
            routeGetListAntri: "{{ route('GPS.pengerjaanJadwal.get-list-antri') }}",
            routeInsertAppQue: "{{ route('GPS.pengerjaanJadwal.insert-appque') }}",
            routeSaveStsReady: "{{ route('GPS.pengerjaanJadwal.save-stsready') }}",
            routeEditJamKerja: "{{ route('GPS.pengerjaanJamKerja.index') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalPengerjaan/pengerjaanJadwal.js') }}"></script>
@endsection
