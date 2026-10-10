@extends('layouts.appKencana')
@section('content')
@section('title', 'Transaksi Bulanan')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header" style="">Transaksi Bulanan</div>
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
                            <div class="row pr-5 pt-2">
                                <div class="col-sm-2">
                                    <label for="bulan">Bulan/Tahun</label>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="bulanId" name="bulanId" style="display: none">
                                        <input type="text" class="form-control" id="bulan" name="bulan" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_bulanTahun" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="offset-sm-1 col-md-1">
                                    <input type="text" id="tahun" name="tahun" class="form-control">
                                </div>
                            </div>

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
                                        <input type="text" class="form-control" id="kelompokNama" name="kelompokNama" readonly>
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
                                        <input type="text" class="form-control" id="subkelNama" name="subkelNama" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_subkel" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label style="color: blue">Saldo Akhir</label>
                                </div>

                                <div class="col-sm-1 pl-3">
                                    <label for="primer">Primer</label>
                                </div>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="primer" name="primer" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-1 pl-3">
                                    <label for="sekunder">Sekunder</label>
                                </div>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="sekunder" name="sekunder" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-1 pl-2">
                                    <label for="triter">Tritier</label>
                                </div>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="triter" name="triter" readonly>
                                    </div>
                                </div>

                                <div class="sol-sm-1">
                                    <button type="button" id="btn_ok"
                                        class="btn btn-outline-secondary">OK</button>
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

                        <button type="button" id="btn_print" class="btn btn-outline-secondary" style="display: none">Print</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="{{ asset('css/Kencana/TransaksiBulanan.css') }}">
    <script src="{{ asset('js/Kencana/TransaksiBulanan.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
