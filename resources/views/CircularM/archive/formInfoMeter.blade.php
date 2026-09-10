@extends('Circular.layouts.app')

@section('title')
    Informasi Hasil Meter
@endsection

@section('content')
    <style>
        .label-container {
            display: flex;
            justify-content: end;
            align-items: center;
        }
    </style>

    <div class="card mb-3">
        <div class="card-header">
            Informasi Hasil Meter
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">

            <div class="card" style="margin-left: 25%; margin-right: 25%;">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3 label-container">
                            <label for="shift">Shift</span>
                        </div>
                        <div class="col-md-4">
                            <select id="shift" class="form-select form-select-sm">
                                <option></option>
                                <option value="P">P | Pagi</option>
                                <option value="S">S | Sore</option>
                                <option value="M">M | Malam</option>
                            </select>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-3 label-container">
                            <label for="tanggal">Tanggal</span>
                        </div>
                        <div class="col-md-4">
                            <input type="date" id="tanggal" class="form-control form-control-sm">
                        </div>

                        <div class="col-md-3">
                            <button type="button" id="btn_OK" class="btn btn-sm btn-primary" disabled>OK</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-3">
                <table id="table_meter" class="table table-bordered table-hover" style="font-size: 14px">
                    <thead>
                        <th>Id Log</th>
                        <th>Mesin</th>
                        <th>Ukuran</th>
                        <th>Rajutan</th>
                        <th>Denier</th>
                        <th>Corak</th>
                        <th>Status Log</th>
                        <th>Cnt. Awal</th>
                        <th>Cnt. Akhir</th>
                        <th>Jam Awal</th>
                        <th>Jam Akhir</th>
                        <th>Hsl. Meter</th>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

            <div class="row mt-4">
                <div class="col-md-12 d-flex justify-content-end flex-wrap">
                    <button type="button" id="btn_keluar" class="btn btn-secondary mx-1 my-1">Keluar</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('custom_js')
    <script src="{{ asset('js/informasi/infoMeter.js') }}"></script>
@endsection
