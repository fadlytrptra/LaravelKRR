@extends('Circular.layouts.app')

@section('title')
    Transfer Hasil Meter
@endsection

@section('content')
    <style>
        .dataTables_wrapper {
            font-size: 14px;
        }

        #table_meter tbody tr {
            cursor: pointer;
        }
    </style>

    <div class="card">
        <div class="card-body">
            <h5 class="custom-card-header ms-3">Hasil Meter</h5>

            <table id="table_meter" class="table table-bordered table-hover">
                <thead>
                    <th></th>
                    <th>Tanggal</th>
                    <th>Mesin</th>
                    <th>Nama Order</th>
                    <th>Meter</th>
                    <th>Id Log Awal</th>
                    <th>Index</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    <div class="row mt-5 mb-5">
        <div class="col-md-10">
            @csrf
            <table id="table_detail" class="table table-bordered table-hover">
                <thead>
                    <th>Id Log</th>
                    <th>Tanggal</th>
                    <th>Shift</th>
                    <th>Status Log</th>
                    <th>Counter Awal</th>
                    <th>Counter Akhir</th>
                    <th>Jam Awal</th>
                    <th>Jam Akhir</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div class="col-md-2" style="display: flex; flex-wrap: wrap; align-content: center; justify-content: center;">
            <button id="btn_refresh" type="button" class="btn btn-info mb-5"
                style="font-size: larger; width: -webkit-fill-available;">Refresh</button>
            <form style="width: -webkit-fill-available" id="form_submit" action="{{ url('/hasil-konversi') }}"
                method="post">
                @csrf
                <input type="hidden" id="konversi_mesin" name="konversi_mesin">
                <input type="hidden" id="konversi_order" name="konversi_order">
                <input type="hidden" id="konversi_log" name="konversi_log">
                <input type="hidden" id="konversi_meter" name="konversi_meter">
                <button id="btn_proses" type="submit" class="btn btn-primary mb-5"
                    style="font-size: larger; width: -webkit-fill-available;">Proses</button>
            </form>
            <button id="btn_keluar" type="button" class="btn btn-secondary"
                style="font-size: larger; width: -webkit-fill-available;">Keluar</button>
        </div>
    </div>
@endsection

@section('custom_js')
    <script src="{{ asset('js/transaksi/hasilMeter.js') }}"></script>

    <script>
        var serverSideUrl = "{{ url('/data-table/get-hasil-meter') }}";
    </script>
@endsection

{{-- Melakukan perubahan data pada DataTable serverside processing --}}
{{-- // https://stackoverflow.com/questions/58860843/how-to-redraw-a-datatable-that-uses-server-side-processing-using-only-the-existi --}}
