@extends('Circular.layouts.app')

@section('title')
    Jadwal Potong
@endsection

@section('content')
    <div class="card mb-3">
        <div class="card-header">
            Jadwal Potong
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">
            <div class="row mt-3">
                <div class="col-md-4 d-flex align-items-center">
                    <h3>Jadwal Potong:</h3>
                </div>
                <div class="col-md-8 d-flex justify-content-end flex-wrap">

                    <button type="button" id="btn_tampil" class="btn btn-primary mx-1 my-1">Tampilkan
                        Data</button>
                    <button type="button" id="btn_keluar" class="btn btn-secondary mx-1 my-1">Keluar</button>
                </div>
            </div>

            {{-- <div class="mt-3">
                <table id="table_jadwal" class="table table-bordered table-hover" style="font-size: 14px">
                    <thead>
                        <tr>
                            <th>Mesin</th>
                            <th>Nama Order</th>
                            <th>Total Meter</th>
                            <th>Standard Roll</th>
                            <th>Jumlah Jam</th>
                            <th>Shift</th>
                            <th>Tanggal Potong</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div> --}}
            <br>
            <table class="table" id="table_atas">
                <thead class="table-dark">
                    <tr>
                        <th>Mesin</th>
                        <th>Nama Order</th>
                        <th>Total Meter</th>
                        <th>Standard Roll</th>
                        <th>Jumlah Jam</th>
                        <th>Shift</th>
                        <th>Tanggal Potong</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
@endsection

@section('custom_js')
    <script src="{{ asset('js/Circular/informasi/jadwalPotong.js') }}"></script>
@endsection
