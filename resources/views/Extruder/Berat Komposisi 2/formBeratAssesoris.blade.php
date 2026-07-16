@extends('layouts.appBeratKomposisi2')

@section('title')
    Berat Assesoris
@endsection

@section('content')
    <div id="berat_assesoris" class="form" data-aos="fade-up">

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Kode Assesoris:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <input type="text" class="form-control" id="kode_assesoris">
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Type:</span>
            </div>
            <div class="form-group col-md-9 mt-3 mt-md-0">
                <textarea class="form-control" id="txt_type" rows="3"></textarea>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Berat Conductive:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <input type="number" min="0" class="form-control" id="berat_conductive">
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Berat Lain:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <input type="number" min="0" class="form-control" id="berat_lain">
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Berat Standar Total:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control" id="berat_total">
                    <span class="input-group-text">Gram</span>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Last Input Information:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="text" id="last_input" class="form-control" readonly>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-9 row justify-content-md-center">
                <div class="text-center col-md-auto"><button type="button" id="btn_koreksi"
                        class="btn btn-outline-warning">Koreksi</button></div>
                <div class="text-center col-md-auto"><button type="button" id="btn_batal"
                        class="btn btn-outline-danger">Batal</button></div>
                <div class="text-center col-md-auto"><button type="button" id="btn_proses"
                        class="btn btn-outline-success">Proses</button></div>
            </div>

            <div class="text-center col-3"><button type="button" id="btn_keluar"
                    class="btn btn-outline-secondary">Keluar</button></div>
        </div>

    </div>

    <script src="{{ asset('js/Extruder/BeratKomposisi/beratAssesoris.js') }}"></script>
@endsection
