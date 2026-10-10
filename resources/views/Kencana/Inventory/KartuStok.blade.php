@extends('layouts.appKencana')
@section('content')
@section('title', 'Kartu Stok')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header" style="">Kartu Stok</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="row pt-1">
                            <div class="col-sm-2">
                                <label for="divisiId">Divisi</label>
                            </div>
                            <div class="col-sm-2">
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

                        <div class="row pt-1">
                            <div class="col-sm-2">
                                <label for="objekId">Objek</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                            </div>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_objek" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <a id="deleteObjek" href="#">Clear Objek</a>
                            </div>
                        </div>

                        <div class="row pt-1">
                            <div class="col-sm-2">
                                <label for="kelutId">Kel. Utama</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" id="kelutId" name="kelutId" class="form-control" readonly>
                            </div>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kelutNama" name="kelutNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelut" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <a id="deleteKelompokutama" href="#">Clear KelUtama</a>
                            </div>
                        </div>

                        <div class="row pt-1">
                            <div class="col-sm-2">
                                <label for="kelompokId">Kelompok</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" id="kelompokId" name="kelompokId" class="form-control"
                                    readonly>
                            </div>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kelompokNama" name="kelompokNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelompok" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <a id="deleteKelompok" href="#">Clear Kelompok</a>
                            </div>
                        </div>

                        <div class="row pt-1">
                            <div class="col-sm-2">
                                <label for="subkelId">Sub Kelompok</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" id="subkelId" name="subkelId" class="form-control" readonly>
                            </div>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="subkelNama" name="subkelNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_subkel" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <a id="deleteSubKelompok" href="#">Clear SubKelompok</a>
                            </div>
                        </div>

                        <div class="row pt-1">
                            <div class="col-sm-2 offset-sm-2">
                                <div class="form-check mb-0">
                                    <input class="form-check-input" type="checkbox" id="tampilStok" name="tampilStok">
                                    <label class="form-check-label ms-2" for="tampilStok">Tampil Stok</label>
                                </div>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" id="btn_ok" class="btn btn-info">OK</button>
                            </div>
                        </div>

                        <div class="row" style="margin-top: 0.5%; font-size: 13px;">
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

                        <div class="row">
                            <div class="col-sm-5">
                                <label><strong>*Klik 2x pada type barang untuk melihat list transaksi</strong></label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="{{ asset('css/Kencana/KartuStok.css') }}">
    <script src="{{ asset('js/Kencana/KartuStok.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
