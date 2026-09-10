@extends('CircularM.layouts.app')

@section('title')
    Reset Counter Mesin
@endsection

@section('content')
    <div class="card" style="max-width: 750px; margin-left: auto; margin-right: auto;">
        <div class="card-header">
            Maintenance Reset Counter Per Mesin
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">
            <div class="row">
                <div class="col-md-4">
                    <label for="id_mesin" class="aligned-text">Id / Nama Mesin</label>
                </div>
                <div class="col-md-6">
                    <select id="id_mesin" class="form-select form-select-sm">
                        <option></option>
                        @foreach ($listMesin as $d)
                            <option value="{{ $d->Id_mesin }}">
                                {{ $d->Id_mesin . ' | ' . $d->Nama_mesin }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="card mt-5">
                <div class="card-body">
                    <h5 class="custom-card-header ms-3">Counter Mesin</h5>

                    <div class="row">
                        <div class="col-md-4">
                            <label for="counter_pagi">Pagi:</label>
                            <input type="number" id="counter_pagi" class="form-control form-control-sm" disabled>
                        </div>

                        <div class="col-md-4">
                            <label for="counter_sore">Sore:</label>
                            <input type="number" id="counter_sore" class="form-control form-control-sm" disabled>
                        </div>

                        <div class="col-md-4">
                            <label for="counter_malam">Malam:</label>
                            <input type="number" id="counter_malam" class="form-control form-control-sm" disabled>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-5">
                <div class="card-body">
                    <h5 class="custom-card-header ms-3">Counter dikoreksi menjadi</h5>

                    <div class="row">
                        <div class="col-md-4">
                            <label for="koreksi_pagi">Pagi:</label>
                            <input type="number" id="koreksi_pagi" class="form-control form-control-sm" disabled>
                        </div>

                        <div class="col-md-4">
                            <label for="koreksi_sore">Sore:</label>
                            <input type="number" id="koreksi_sore" class="form-control form-control-sm" disabled>
                        </div>

                        <div class="col-md-4">
                            <label for="koreksi_malam">Malam:</label>
                            <input type="number" id="koreksi_malam" class="form-control form-control-sm" disabled>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-12 d-flex justify-content-center flex-wrap">
                    <form id="form_submit" action="{{ url('/proses-orderM') }}" method="POST">
                        @csrf
                        <input type="hidden" id="form_data" name="form_data">
                        <input type="hidden" name="form_sp" value="Sp_Maint_Mesin">
                        <input type="hidden" name="mode_proses" value="5">
                        <button type="submit" id="btn_proses" class="btn btn-primary mx-1 my-1"
                            style="margin-left: 1.5rem !important" disabled>Proses</button>
                    </form>

                    <div class="col-md-5"></div>
                    <button type="button" id="btn_keluar" class="btn btn-secondary mx-1 my-1">Keluar</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('custom_js')
    <script src="{{ asset('js/CircularM/transaksi/counterMesin.js') }}"></script>
@endsection
