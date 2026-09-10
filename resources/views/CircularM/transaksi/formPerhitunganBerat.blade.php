@extends('Circular.layouts.app')

@section('title')
    Maintenance Proses Perhitungan Effisiensi
@endsection

@section('content')
    {{-- <div class="card mb-3"> --}}
    {{-- <div class="card-header">
            Maintenance Order
        </div> --}}

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Perhitungan Berat</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            {{-- <form method="POST" action=""> --}}
                                @csrf
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="tahun">Perhitungan Berat :</label>
                                    </div>
                                </div>
                                <br>
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="tahun">Tahun</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="input" id="tahun" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-1">
                                    </div>
                                    <div class="col-md-1">
                                    </div>
                                    <div class="col-md-2">
                                        <label for="tanggal">Tanggal</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="date" id="tanggal" class="form-control" style="width: 100%">
                                    </div>
                                    <div>
                                        <button id="btn_tanggal" class="btn btn-primary form-control"
                                            style="width: 50%">...</button>
                                    </div>
                                </div>
                                <br>
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="bulan">Bulan</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="input" id="id_bulan" class="form-control" style="width: 100%; display: none;">
                                        <input type="input" id="bulan" class="form-control" style="width: 100%">
                                    </div>
                                    <div>
                                        <button id="btn_bulan" class="btn btn-primary form-control"
                                            style="width: 50%">...</button>
                                    </div>
                                    <div class="col-md-1">
                                    </div>
                                    <div class="col-md-2">
                                        <label for="shift">Shift</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="input" id="shift" class="form-control" style="width: 50%">
                                    </div>
                                </div>
                                <br>
                                <div class="d-flex">
                                    <button class="btn btn-success" id="btn_proses" style="width: 130px">Proses</button>
                                </div>
                                <br>
                                <table class="table" id="table_atas">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>ID. Premi</th>
                                            <th>Mesin</th>
                                            <th>Nama Order</th>
                                            <th>Meter</th>
                                            <th>Berat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>

                                {{-- <br>
                                <div class="d-flex">
                                    <div class="col-md-1">
                                        <label for="mesin" style="display: block; text-align: center;">Mesin</label>
                                    </div>
                                    <div class="col-md-1">
                                        <label for="ukuran" style="display: block; text-align: center;">Ukuran</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="rajutan" style="display: block; text-align: center;">Rajutan</label>
                                    </div>
                                    <div class="col-md-1">
                                        <label for="rpm" style="display: block; text-align: center;">RPM</label>
                                    </div>
                                    <div class="col-md-1">
                                        <label for="shutle" style="display: block; text-align: center;">Shutle</label>
                                    </div>
                                    <div class="col-md-1">
                                        <label for="hsl_meter" style="display: block; text-align: center;">Hsl.
                                            Meter</label>
                                    </div>
                                    <div class="col-md-1">
                                        <label for="effisiensi"
                                            style="display: block; text-align: center;">Effisiensi</label>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-1">
                                        <input type="input" id="mesin" class="form-control"
                                            style="width: 100%; text-align: center;">
                                    </div>
                                    <div class="col-md-1">
                                        <input type="input" id="ukuran" class="form-control"
                                            style="width: 100%; text-align: center;">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="input" id="rajutan" class="form-control"
                                            style="width: 100%; text-align: center;">
                                    </div>
                                    <div class="col-md-1">
                                        <input type="input" id="rpm" class="form-control"
                                            style="width: 100%; text-align: center;">
                                    </div>
                                    <div class="col-md-1">
                                        <input type="input" id="shutle" class="form-control"
                                            style="width: 100%; text-align: center;">
                                    </div>
                                    <div class="col-md-1">
                                        <input type="input" id="hsl_meter" class="form-control"
                                            style="width: 100%; text-align: center;">
                                    </div>
                                    <div class="col-md-1">
                                        <input type="input" id="effisiensi" class="form-control"
                                            style="width: 100%; text-align: center;">
                                    </div>
                                </div> --}}
                                <hr style="height:2px;">
                                <div class="mb-3 d-flex justify-content-between">
                                    {{-- <button class="btn btn-success" id="btn_proses" style="width: 130px">Simpan</button> --}}
                                    <button class="btn btn-danger" id="btn_batal"
                                        style="width: 130px; margin-left: auto;">Batal</button>
                                </div>

                            {{-- </form> --}}
                            <br>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/transaksi/ProsesBerat.js') }}"></script>
@endsection

{{-- @section('custom_js')
    <script>
        const url_IdOrder = "{{ url('/pagination/get-id-order') }}";
        const url_KodeBarang = "{{ url('/pagination/get-barang') }}";
        const url_BenangWarp = "{{ url('/pagination/get-benang-warp') }}";
        const url_BenangStrip = "{{ url('/pagination/get-benang-strip') }}";
    </script>

    <script src="{{ asset('js/Circular/transaksi/orderMaster.js') }}"></script>
    @include('Circular/transaksi/modalBenang')
@endsection --}}
