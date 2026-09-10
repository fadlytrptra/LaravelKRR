@extends('CircularM.layouts.app')

@section('title')
    Informasi Hasil Meter
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
                    <div class="card-header">Informasi Hasil Meter</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            @csrf
                            <div class="d-flex">
                                <div class="col-md-2">
                                    <label for="shift">Shift</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="input" id="shift" class="form-control">
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-2">
                                    <label for="tanggal">Tanggal</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="date" id="tanggal" class="form-control" style="width: 100%">
                                </div>
                                {{-- <div>
                                    <button id="btn_tanggal" class="btn btn-secondary form-control"
                                        style="width: 50%">...</button>
                                </div> --}}
                                <div class="col-md-1">
                                </div>
                                <div>
                                    <button class="btn btn-primary" id="btn_ok" style="width: 130px">OK</button>
                                </div>
                            </div>
                            <br>
                            <div style="overflow: auto">
                                <table class="table" id="table_atas" style="">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>ID. Log</th>
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
                                            <th>Hasil Meter</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <hr style="height:2px;">
                            <div class="mb-3 d-flex justify-content-between">
                                {{-- <button class="btn btn-success" id="btn_proses" style="width: 130px">Simpan</button> --}}
                                <button class="btn btn-danger" id="btn_batal"
                                    style="width: 130px; margin-left: auto;">Batal</button>
                            </div>
                            <br>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/CircularM/informasi/HasilMeter.js') }}"></script>
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
