@extends('layouts.appKencana')
@section('content')
@section('title', 'ACC Konversi Barang')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">ACC Konversi Barang</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="row">
                            <div class="col-sm-1 offset-sm-2">
                                <label for="divisiId">Divisi</label>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                            </div>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="divisiNama" name="divisiNama" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row pt-2">
                            <div class="col-sm-2">
                                <div class="row mb-2" style="margin-top: 0.5%">
                                    <div class="col-sm-12">
                                        <div class="table-responsive fixed-height">
                                            <table class="table table-bordered no-wrap-header" id="tableKonv">
                                                <thead>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-10">
                                <div class="row">
                                    <div class="col-sm-3 ml-3">
                                        <div class="row" style="margin-top: 0.5%">
                                            <div class="col-sm-12">
                                                <div class="table-responsive fixed-height"
                                                    style=" width: 425%">
                                                    <table class="table table-bordered no-wrap-header" id="tableData">
                                                        <thead>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="row">
                            <div class="col-sm-1 pt-1">
                                <button style="width: 200%; margin-left: 50%" type="button" id="semua"
                                    class="btn btn-info" >Pilih Semua</button>
                            </div>
                            <div class="col-sm-6 offset-sm-1 pt-1" style="margin-left: 10%">
                                <label style="color: blue">Untuk memilih lebih dari 1 Kd Konversi yg akan di-ACC : cawang
                                     beberapa kotak Kd Konversi yg akan di-ACC.
                                </label>
                            </div>
                            <div class="col-sm-1 offset-sm-2 pt-1">
                                <button style="width: 120%" type="button" id="btn_proses" class="btn btn-info"
                                    >PROSES</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="{{ asset('css/Kencana/AccKonversiBarang.css') }}">
    <script src="{{ asset('js/Kencana/AccKonversiBarang.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
