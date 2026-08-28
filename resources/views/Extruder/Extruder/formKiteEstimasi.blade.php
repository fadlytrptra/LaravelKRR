@extends('layouts.appExtruder')

@section('title')
    Estimasi KITE
@endsection

@section('content')
    <div class="extruder_root">
        <div id="kite_estimasi" class="form" data-aos="fade-up">
            <div class="card">
                <div class="card-header">Data KITE</div>

                <div class="card-body">

                    <div class="row mt-3">
                        <div class="col-lg-6">
                            <div class="d-flex align-items-center" style="justify-content: center;">
                                <div class="form-check">
                                    <input class="form-check-input custom-radio" type="radio" name="fasilitas"
                                        id="fasilitas_pembebasan" value="pembebasan">
                                    <label class="form-check-label custom-radio" for="fasilitas_pembebasan">Fasilitas
                                        Pembebasan</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="d-flex align-items-center" style="justify-content: center;">
                                <div class="form-check">
                                    <input class="form-check-input custom-radio" type="radio" name="fasilitas"
                                        id="fasilitas_pengembalian" value="pengembalian">
                                    <label class="form-check-label custom-radio" for="fasilitas_pengembalian">Fasilitas
                                        Pengembalian</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2 aligned-text">Tanggal Start:</div>
                        <div class="col-lg-4">
                            <input type="date" id="tgl_start" class="form-control unclickable" readonly>
                            <input type="hidden" id="meter">
                            <input type="hidden" id="roll">
                            <input type="hidden" id="meter_awal">
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2 aligned-text">Kode Barang:</div>
                        <div class="col-lg-4">
                            <div class="input-group rounded">
                                <input type="text" id="display_kode_barang" class="form-control"
                                    placeholder="-- Pilih Kode Barang --" readonly>
                                <button type="button" id="btn_lookup_kode_barang" class="btn btn-secondary rounded-end">
                                    ... </button>
                            </div>
                        </div>
                        <input type="hidden" id="id_order">
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2 aligned-text">Nama Barang:</div>
                        <div class="col-lg-10">
                            <input type="text" id="nama_barang" class="form-control" disabled>
                        </div>
                    </div>

                    <div class="row mt-3 mb-3">

                        <div class="col-lg-4">

                            <div class="row">
                                <div class="col-lg-6 aligned-text">Bahan PP:</div>
                                <div class="col-lg-6" style="height: fit-content;">
                                    <input type="text" id="bahan_pp" class="form-control" disabled>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-6 aligned-text">Benang:</div>
                                <div class="col-lg-6" style="height: fit-content;">
                                    <input type="text" id="benang" class="form-control" disabled>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-6 aligned-text">Hasil:</div>
                                <div class="col-lg-6" style="height: fit-content;">
                                    <input type="text" id="hasil" class="form-control" disabled>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-6 aligned-text">Sisa:</div>
                                <div class="col-lg-6" style="height: fit-content;">
                                    <input type="text" id="sisa" class="form-control" disabled>
                                </div>
                            </div>

                            <div id="estimase_bahan" class="card mt-3">
                                <div class="card-header">Estimasi Bahan</div>

                                <div class="card-body">
                                    <div class="row mt-3">
                                        <div class="col-lg-4 aligned-text">Tanggal:</div>
                                        <div class="col-lg-8">
                                            <input type="date" id="estimasi_tgl" class="form-control">
                                        </div>
                                    </div>

                                    <div class="row mt-3">
                                        <div class="col-lg-4 aligned-text">Bahan PP:</div>
                                        <div class="col-lg-8">
                                            <input type="number" id="estimasi_pp" class="form-control">
                                        </div>
                                    </div>

                                    <div class="row mt-3">
                                        <div class="col-lg-4 aligned-text">CaCO3:</div>
                                        <div class="col-lg-8">
                                            <input type="text" id="estimasi_caco3" class="form-control" disabled>
                                        </div>
                                    </div>

                                    <div class="row mt-3">
                                        <div class="col-lg-4 aligned-text">Benang:</div>
                                        <div class="col-lg-8">
                                            <input type="text" id="estimasi_benang" class="form-control" disabled>
                                        </div>
                                    </div>

                                    <div class="text-center mt-3">
                                        <button type="button" id="btn_proses" class="btn btn-primary">Proses</button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-lg-8">
                            <table id="table_order" class="hover cell-border">
                                <thead>
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>PP</th>
                                        <th>CaCO3</th>
                                        <th>Benang</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <div class="card-footer">
                    <div class="text-end mt-3">
                        <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @include('Extruder.Extruder.modalLookUp')

    <script src="{{ asset('js/Extruder/ExtruderNet/kiteEstimasi.js') }}"></script>
@endsection
