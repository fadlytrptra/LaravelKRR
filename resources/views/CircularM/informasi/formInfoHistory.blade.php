@extends('Circular.layouts.app')

@section('title')
    Laporan History Circular
@endsection

@section('content')
    <style>
        .label-container {
            display: flex;
            justify-content: end;
            align-items: center;
        }

        .text-right {
            text-align: right;
        }
    </style>

    <div class="card mb-3">
        <div class="card-header">
            Laporan History Circular
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">

            <div class="row mt-2">
                <div class="col-md-2"></div>
                <div class="col-md-3 label-container">
                    <label for="tanggal">Tanggal</span>
                </div>
                <div class="col-md-2">
                    <input type="date" id="tanggal" class="form-control form-control-sm">
                </div>

                <div class="col-md-3">
                    <button type="button" id="btn_OK" class="btn btn-sm btn-primary">OK</button>
                </div>
                <div class="col-md-2"></div>
            </div>

            <div class="mt-3">
                <table id="table_history" class="table table-bordered table-hover" style="font-size: 14px">
                    <thead>
                        <th>Nama Mesin</th>
                        <th>Jumlah Meter</th>
                        <th>Avg. RPM</th>
                        <th>Avg. Shuttle</th>
                        <th>Id Order</th>
                        <th>Nama Barang</th>
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
    <script>
        const ajaxUrl = "{{ url('/data-table/get-history-cir') }}";
    </script>

    <script src="{{ asset('js/Circular/informasi/infoHistory.js') }}"></script>
@endsection
