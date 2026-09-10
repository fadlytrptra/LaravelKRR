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
                    <div class="card-header">Proses Simpan Tanggal History</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <div class="d-flex justify-content-center">
                                    <div class="col-md-1">
                                        <label for="tanggal">Tanggal</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="date" id="tanggal" class="form-control" style="width: 100%">
                                    </div>
                                    {{-- <div>
                                        <button id="btn_tanggal" class="btn btn-primary form-control"
                                            style="width: 50%">...</button>
                                    </div> --}}
                                </div>
                                <br>
                                <div class="d-flex justify-content-center">
                                    <label style="color: blue; display: none;" id="labelInfo">Proses ini memerlukan waktu
                                        Kurang Lebih 20 menit. Mohon bersabar...</label>
                                </div>
                                <br>
                                {{-- <div class="d-flex justify-content-center">
                                    <button class="btn btn-primary" id="btn_proses" style="width: 130px">Proses</button>
                                    <button class="btn btn-primary" id="btn_prosesCetak"
                                        style="width: 130px; display: none;">Proses</button>
                                    <button class="btn btn-danger" id="btn_keluar"
                                        style="width: 130px; display: none;">Keluar</button>
                                    <button class="btn btn-success" id="btn_excel" style="width: 130px">Export
                                        Excel</button>
                                </div> --}}
                                <div class="d-flex justify-content-center position-relative">
                                    <button class="btn btn-primary" id="btn_proses" style="width: 130px">Proses</button>
                                    <button class="btn btn-primary" id="btn_prosesCetak"
                                        style="width: 130px; display: none;">Proses</button>
                                    <button class="btn btn-danger" id="btn_keluar"
                                        style="width: 130px; display: none;">Keluar</button>

                                    <button class="btn btn-success position-absolute end-0 me-3" id="btn_excel"
                                        style="width: 130px">
                                        Export Excel
                                    </button>
                                </div>
                            </form>
                            <br>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/transaksi/cetakLapHistory.js') }}"></script>
@endsection
