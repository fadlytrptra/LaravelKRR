@extends('layouts.appBeratKomposisi2')

@section('title')
    Berat Woven
@endsection

@section('content')
    <div id="berat_woven" class="form" data-aos="fade-up">

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Kode Woven:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <input type="text" id="kode_woven" class="form-control" required>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Type:</span>
            </div>
            <div class="form-group col-md-9 mt-3 mt-md-0">
                <textarea id="txt_type" class="form-control" rows="3" required></textarea>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Berat Karung:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <input type="number" min="0" id="berat_karung" class="form-control" required>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Berat Inner:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <input type="number" min="0" id="berat_inner" class="form-control" required>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Berat Lami:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <input type="number" min="0" id="berat_lami" class="form-control" required>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Berat OPP:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <input type="number" min="0" id="berat_opp" class="form-control" required>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Berat Kertas:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <input type="number" min="0" id="berat_kertas" class="form-control" required>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Berat Lain:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <input type="number" min="0" id="berat_lain" class="form-control" required>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Berat Standar Total:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" id="berat_total" class="form-control" required>
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
                        class="btn btn-outline-warning">Koreksi</button>
                </div>
                <div class="text-center col-md-auto"><button type="button" id="btn_batal"
                        class="btn btn-outline-danger">Batal</button>
                </div>
                <div class="text-center col-md-auto"><button type="button" id="btn_proses"
                        class="btn btn-outline-success">Proses</button>
                </div>
            </div>

            <div class="text-center col-3"><button type="button" id="btn_keluar"
                    class="btn btn-outline-secondary">Keluar</button></div>
        </div>

    </div>

    <script src="{{ asset('js/Extruder/BeratKomposisi/beratWoven.js') }}"></script>
@endsection
