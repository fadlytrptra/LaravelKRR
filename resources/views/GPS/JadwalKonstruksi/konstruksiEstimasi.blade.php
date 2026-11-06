@extends('layouts.appGPS')

@section('title')
    Estimasi Jadwal Konstruksi
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #est_konst_form {
            max-width: 1100px;
            margin: 0 auto;
            padding: 20px;
        }
    </style>
    <div class="GPS_root">
        <div id="est_konst_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-calendar-check me-2"></i>Order Gambar
            </h4>

            <fieldset id="Frame1" disabled>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">No. Order:</div>
                    <div class="col-lg-2">
                        <input type="text" id="TNoOd" class="form-control text-uppercase"
                            placeholder="Ketik & Enter..." autocomplete="off">
                    </div>
                    <div class="col-lg-8">
                        <span id="OdSts" class="fw-bold text-danger mt-1 d-inline-block"></span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Divisi:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TDivisi" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Kode Barang:</div>
                    <div class="col-lg-3">
                        <input type="text" id="TKdBrg" class="form-control bg-white" disabled readonly>
                    </div>
                    <div class="col-lg-2 aligned-text text-lg-end">No. Gambar Rev:</div>
                    <div class="col-lg-5">
                        <input type="text" id="TNoGbr" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Nama Barang:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TNamaBrg" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Mesin:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TMesin1" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Pengorder:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TUserOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Ket. Order:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TKetOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2"><span class="aligned-text">Tgl. Start:</span></div>
                    <div class="col-lg-2">
                        <input type="date" id="TTglStart" class="form-control">
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-2"><span class="aligned-text">Tgl. Finish:</span></div>
                    <div class="col-lg-2">
                        <input type="date" id="TTglFinish" class="form-control">
                    </div>
                </div>

            </fieldset>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-7">
                    <button type="button" id="btnIsi" class="btn btn-primary fw-bold me-2"><i
                            class="bi bi-plus-circle"></i> ISI</button>
                    <button type="button" id="btnKoreksi" class="btn btn-warning fw-bold text-dark me-2"><i
                            class="bi bi-pencil-square"></i> KOREKSI</button>
                    <button type="button" id="btnHapus" class="btn btn-danger fw-bold"><i class="bi bi-trash"></i>
                        HAPUS</button>
                </div>
                <div class="col-md-5 text-end">
                    <button type="button" id="btnProses" class="btn btn-success fw-bold px-4 me-2" disabled>PROSES</button>
                    <button type="button" id="btnKeluar" class="btn btn-secondary fw-bold px-4">Keluar</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.EstimasiJadwalConfig = {
            routeGetOrder: "{{ route('GPS.konstruksiEstimasi.get-order') }}",
            routeStore: "{{ route('GPS.konstruksiEstimasi.store') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalKonstruksi/konstruksiEstimasi.js') }}"></script>
@endsection
