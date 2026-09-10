@extends('Circular.layouts.app')

@section('title')
    History Gelondongan
@endsection

@section('content')
    <style>
        .label-container {
            display: flex;
            justify-content: end;
            align-items: center;
        }
    </style>

    <div class="card">
        <div class="card-header">
            Informasi History Gelondongan
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">

            <div class="row mt-2">
                <div class="col-md-2 label-container">
                    <label for="tanggal">Tanggal</span>
                </div>
                <div class="col-md-3">
                    <input type="date" id="tanggal" class="form-control form-control-sm">
                </div>

                <div class="col-md-3">
                    <button type="button" id="btn_OK" class="btn btn-sm btn-primary" disabled>OK</button>
                </div>
            </div>

            <div class="mt-5">
                <h5 class="mb-2"><b>HASIL POTONG CIRCULAR</b></h5>
                <table id="table_circular" class="display">
                    <thead>
                        <th>Mesin</th>
                        <th>Shift</th>
                        <th>Roll</th>
                        <th>Meter</th>
                        <th>Kg</th>
                        <th>Id Konversi</th>
                        <th>Status</th>
                        <th>Kode Barang</th>
                        <th>No. Indeks</th>
                        <th>Divisi</th>
                        <th>Objek</th>
                        <th>Kel. Utama</th>
                        <th>Kelompok</th>
                        <th>Sub Kelompok</th>
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
    <script src="{{ asset('js/informasi/infoGelondongan.js') }}"></script>
@endsection
