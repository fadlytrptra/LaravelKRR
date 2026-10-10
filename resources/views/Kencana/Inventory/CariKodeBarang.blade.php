@extends('layouts.appKencana')
@section('content')
@section('title', 'Cari Kode Barang')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header" style="">Cari Kode Barang</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="row">
                            <div class="col-sm-2">
                                <label for="divisiId">Divisi</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="divisiNama" name="divisiNama" readonly>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" id="divisiId" name="divisiId" class="form-control"
                                    style="display: none">
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="col-sm-2">
                                <label for="objekId">Objek</label>
                            </div>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_objek" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="col-sm-2">
                                <label for="namaBarang">Nama Barang</label>
                            </div>
                            <div class="col-sm-8">
                                <input type="text" id="namaBarang" name="namaBarang" class="form-control" readonly>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" id="btn_ok" class="btn btn-info" style="height: 100%">OK</button>
                            </div>
                        </div>

                        <div class="bordered">
                            <div class="row mt-2 ml-2">
                                <div class="col-sm-2">
                                    <label for="kelutId">Kode/Nama Barang</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="kodeId" name="kodeId" readonly>
                                </div>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" id="kodeNama" name="kodeNama" readonly>
                                </div>
                            </div>

                            <div class="row ml-2 mt-1">
                                <div class="col-sm-2">
                                    <label for="kodeType">Kode Type</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kodeType" name="kodeType" readonly>
                                </div>
                                <div class="col-sm-2">
                                    <label for="subkelId">&nbsp; Kelompok</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kelompokNama" name="kelompokNama" readonly>
                                </div>
                            </div>

                            <div class="row ml-2 mt-1 mb-2">
                                <div class="col-sm-2">
                                    <label for="kelutNama">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kelutNama" name="kelutNama" readonly>
                                </div>
                                <div class="col-sm-2">
                                    <label for="subkelId">&nbsp; Sub Kelompok</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="subkelNama" name="subkelNama"
                                        readonly>
                                </div>
                            </div>
                        </div>

                        <div class="row" style="margin-top: 0.5%">
                            <div class="col-sm-12">
                                <div class="table-responsive fixed-height">
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
    </div>
    <link rel="stylesheet" href="{{ asset('css/Kencana/CariKodeBarang.css') }}">
    <script src="{{ asset('js/Kencana/CariKodeBarang.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
