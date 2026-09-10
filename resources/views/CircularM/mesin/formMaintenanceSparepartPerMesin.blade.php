@extends('Circular.layouts.app')

@section('title')
    Maintenance Sparepart Per Mesin
@endsection

@section('content')
    <style>
        .detail-brg {
            color: blue;
            text-decoration: underline;
            cursor: pointer;
        }
    </style>
    <div class="card" style="max-width: 100%; margin-left: auto; margin-right: auto;">
        <div class="card-header">
            Data Sparepart Per Mesin
        </div>
        <div class="card-body" style="padding-left: 2%; padding-right: 2%;">
            <div id="table_sparepartPerMesin_container" class="mt-4">
                <table id="table_sparepartPerMesin" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th>Nama Mesin</th>
                            <th>Nama Sparepart</th>
                            <th>Kode Barang</th>
                            <th>Lifetime (Hour)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
            <button id="button_tambahSparepartPerMesin" class="btn btn-primary" type="button">Tambah Sparepart Per
                Mesin</button>
        </div>
    </div>
@endsection

@section('custom_js')
    @include('Circular.mesin.modal-tambah-sparepart-per-mesin')
    <script src="{{ asset('js/Circular/mesin/MaintenanceSparepartPerMesin.js') }}"></script>
@endsection
