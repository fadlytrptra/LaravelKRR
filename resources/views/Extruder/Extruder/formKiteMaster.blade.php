@extends('layouts.appExtruder')

@section('title')
    Master KITE
@endsection

@section('content')
    <div class="extruder_root">
        <div id="kite_master" class="form" data-aos="fade-up">

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
                <div class="col-lg-2 d-flex justify-content-end">
                    <span class="aligned-text">Tgl Start:</span>
                </div>
                <div class="col-lg-6">
                    <input type="date" class="form-control" id="tgl_start">
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-lg-2 d-flex justify-content-end">
                    <span class="aligned-text">Kode Barang:</span>
                </div>
                <div class="col-lg-6">
                    <div class="input-group rounded">
                        <input type="text" id="display_kode_barang" class="form-control rounded-start"
                            placeholder="-- Pilih Kode Barang --" readonly>
                        <button type="button" id="btn_lookup_kode_barang" class="btn btn-secondary me-2 rounded-end"> ...
                        </button>
                        <button type="button" id="btn_cek_kode" class="btn btn-secondary rounded-2">Cek</button>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-lg-2 d-flex justify-content-end">
                    <span class="aligned-text">Nama Barang:</span>
                </div>
                <div class="col-lg-9">
                    <input type="text" class="form-control" id="nama_barang" disabled>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-lg-2 d-flex justify-content-end">
                    <span class="aligned-text">Bahan PP:</span>
                </div>
                <div class="col-lg-3">
                    <input type="number" min="0" class="form-control" id="bahan_pp">
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-lg-2 d-flex justify-content-end">
                    <span class="aligned-text">Benang:</span>
                </div>
                <div class="col-lg-3">
                    <input type="number" min="0" class="form-control" id="benang" disabled>
                </div>
                <input type="hidden" id="meter">
                <input type="hidden" id="roll">
                <input type="hidden" id="meter_awal">
            </div>

            <div class="row mt-3">
                <div class="col-lg-2 d-flex justify-content-end">
                    <span class="aligned-text">Hasil:</span>
                </div>
                <div class="col-lg-3">
                    <input type="number" min="0" class="form-control" id="hasil" disabled>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-lg-2 d-flex justify-content-end">
                    <span class="aligned-text">Sisa:</span>
                </div>
                <div class="col-lg-3">
                    <input type="number" min="0" class="form-control" id="sisa" disabled>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-12 row justify-content-lg-center">
                    <div class="text-center col-lg-auto"><button type="button" class="btn btn-primary"
                            id="btn_simpan">Simpan</button></div>
                    <div class="col-lg-4"></div>
                    <div class="text-center col-lg-auto"><button type="button" class="btn btn-secondary"
                            id="btn_keluar">Keluar</button></div>
                </div>
            </div>
        </div>
    </div>

    @include('Extruder.Extruder.modalLookUp')

    <script src="{{ asset('js/Extruder/ExtruderNet/kiteMaster.js') }}"></script>
@endsection
