@extends('layouts.appGPS')

@section('title')
    Nomer Order Kerja/Proyek
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #pkj_order_form {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        fieldset {
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            padding: 15px 15px 5px 15px;
            margin-bottom: 15px;
        }

        legend {
            font-size: 0.95rem;
            font-weight: bold;
            width: auto;
            padding: 0 8px;
        }

        .table-responsive {
            max-height: 400px;
            overflow-y: auto;
        }

        .list-bagian-tr {
            cursor: pointer;
        }
    </style>

    <div class="GPS_root">
        <div id="pkj_order_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-arrow-repeat me-2"></i>Nomer Order Kerja / Proyek
            </h4>

            <div class="row">
                <div class="col-lg-6">
                    <fieldset id="Frame1">
                        <legend>Order Kerja</legend>

                        <div class="row mb-2">
                            <div class="col-md-12">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="jenisOd" id="OptHarian"
                                        value="H" checked>
                                    <label class="form-check-label" for="OptHarian">Harian</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="jenisOd" id="OptProyek"
                                        value="P">
                                    <label class="form-check-label" for="OptProyek">Proyek</label>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">No. Order:</div>
                            <div class="col-lg-4">
                                <input type="text" id="TNoOd" class="form-control text-uppercase"
                                    placeholder="Ketik & Enter..." autocomplete="off">
                            </div>
                            <div class="col-lg-5">
                                <span id="OdSts" class="fw-bold text-danger mt-1 d-inline-block"></span>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Divisi:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TDivisi" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Kode Barang:</div>
                            <div class="col-lg-4">
                                <input type="text" id="TKdBrg" class="form-control bg-white" disabled readonly>
                            </div>
                            <div class="col-lg-2 aligned-text text-lg-end">No. Gbr:</div>
                            <div class="col-lg-3">
                                <input type="text" id="TNoGbr" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Nama Barang:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TNamaBrg" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Jumlah Order:</div>
                            <div class="col-lg-4">
                                <input type="text" id="TJml" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Mesin:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TMesin" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Pengorder:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TUserOrder" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Ket. Order:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TKetOrder" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="mt-3">
                            <label class="fw-bold mb-1">Daftar Bagian:</label>
                            <div class="table-responsive border rounded">
                                <table class="table table-sm table-bordered mb-0" id="tblBagian">
                                    <thead>
                                        <tr>
                                            <th>Nama Bagian</th>
                                            <th style="display:none;">IdBagian</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyBagian">
                                        <tr>
                                            <td colspan="3" class="text-center">Belum ada data.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="col-lg-6">
                    <fieldset id="GroupBox1">
                        <legend>Nomer Order yang Baru</legend>

                        <div class="row mb-2">
                            <div class="col-md-12">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="newJenisOd" id="optH"
                                        value="H" checked>
                                    <label class="form-check-label" for="optH">Harian</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="newJenisOd" id="optP"
                                        value="P">
                                    <label class="form-check-label" for="optP">Proyek</label>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">No. Order:</div>
                            <div class="col-lg-4">
                                <input type="text" id="TNoOrder" class="form-control text-uppercase"
                                    placeholder="Ketik & Enter..." autocomplete="off">
                            </div>
                            <div class="col-lg-5">
                                <span id="OdSts1" class="fw-bold text-danger mt-1 d-inline-block"></span>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Divisi:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TDivisi1" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Kode Barang:</div>
                            <div class="col-lg-4">
                                <input type="text" id="TKdBrg1" class="form-control bg-white" disabled readonly>
                            </div>
                            <div class="col-lg-2 aligned-text text-lg-end">No. Gbr:</div>
                            <div class="col-lg-3">
                                <input type="text" id="TNoGbr1" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Nama Barang:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TNamaBrg1" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Jumlah Order:</div>
                            <div class="col-lg-4">
                                <input type="text" id="TJml1" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Mesin:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TMesin1" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Pengorder:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TUserOrder1" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Ket. Order:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TKetOrder1" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>
                    </fieldset>
                    <div class="row mt-2">
                        <div class="col-md-12 text-end">
                            <button type="button" id="btnProses" class="btn btn-success fw-bold px-4 me-2">
                                <i class="bi bi-arrow-repeat"></i> PROSES
                                <button type="button" id="btnKeluar"
                                    class="btn btn-secondary fw-bold px-4">Keluar</button>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        window.pkjOrderConfig = {
            routeGetOrder: "{{ route('GPS.pengerjaanOrderProyek.get-order') }}",
            routeGetBagianList: "{{ route('GPS.pengerjaanOrderProyek.get-bagian-list') }}",
            routeStore: "{{ route('GPS.pengerjaanOrderProyek.store') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalPengerjaan/pengerjaanOrderProyek.js') }}"></script>
@endsection
