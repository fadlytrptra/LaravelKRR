@extends('layouts.appKencana')
@section('content')
@section('title', 'Transaksi Harian')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header" style="">Transaksi Harian</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="row pt-2">
                            <div class="col-1 ml-2">
                                <label for="divisiId">Divisi</label>
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                            </div>
                            <div class="col-md-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="divisiNama" name="divisiNama" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        {{-- ATAS --}}
                        <div class="baris-1 pl-3">

                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label for="objekId">Objek</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                                </div>
                                <div class="col-md-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_objek" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <label for="kelompokId">&nbsp;&nbsp;Kelompok</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="kelompokId" name="kelompokId" class="form-control" readonly>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kelompokNama" name="kelompokNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_kelompok" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row pb-1 pr-5">
                                <div class="col-sm-2">
                                    <label for="kelutId">Kelompok Utama</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="kelutId" name="kelutId" class="form-control" readonly>
                                </div>
                                <div class="col-md-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kelutNama" name="kelutNama" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_kelut" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <label for="subkelId">&nbsp; Sub Kelompok</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="subkelId" name="subkelId" class="form-control" readonly>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="subkelNama" name="subkelNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_subkel" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row pb-1 pr-5">
                                <div class="col-sm-2">
                                    <label for="tanggal">Tanggal</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="date" id="tanggal" name="tanggal" class="form-control">
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" id="btn_ok" class="btn btn-outline-secondary">OK</button>
                                </div>
                            </div>
                        </div>


                        <div class="baris-1 pl-3">
                            <div class="row">
                                <div class="col-sm-2 mt-2 mb-2">
                                    <label>Saldo Akhir</label>
                                </div>

                                <div class="col-sm-2 mt-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="primer" name="primer"
                                            readonly>
                                    </div>
                                </div>
                                <div class="col-sm-1 mt-2" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanPrimer" name="satuanPrimer"
                                            readonly>
                                    </div>
                                </div>

                                <div class="col-sm-2 mt-2" style="margin-left: 3%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="sekunder" name="sekunder"
                                            readonly>
                                    </div>
                                </div>
                                <div class="col-sm-1 mt-2" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanSekunder"
                                            name="satuanSekunder" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-2 mt-2" style="margin-left: 3%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="triter" name="triter"
                                            readonly>
                                    </div>
                                </div>
                                <div class="col-sm-1 mt-2" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanTritier"
                                            name="satuanTritier" readonly>
                                    </div>
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

                        <button type="button" id="btn_print" class="btn btn-outline-secondary"
                            style="display: none">Print</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="{{ asset('css/Kencana/TransaksiHarian.css') }}">
    <script src="{{ asset('js/Kencana/TransaksiHarian.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
