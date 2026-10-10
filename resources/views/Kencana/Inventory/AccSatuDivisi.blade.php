@extends('layouts.appKencana')
@section('content')
@section('title', 'Acc Permohonan Satu Divisi')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Acc Permohonan Satu Divisi</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="baris-1 pl-3">
                            <div class="row">
                                <div class="col-sm-2 ml-5">
                                    <label><strong>Penerima</strong></label>
                                </div>
                            </div>
                            <div class="row pt-2 pr-5 mb-1">
                                <div class="col-sm-1">
                                    <label for="divisiId">Divisi</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="divisiId" name="divisiId" class="form-control"
                                        style="display: none">
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="divisiNama" name="divisiNama" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" id="btn_ok" class="btn btn-info">OK</button>
                                </div>
                                <div class="col-sm-1 offset-sm-2">
                                    <label for="tanggal">Tanggal</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="date" id="tanggal" name="tanggal" style="height: 80%"
                                        class="form-control">
                                </div>
                            </div>

                            <div class="row pr-5">

                                <div class="col-sm-2">
                                    <label for="objekId">Objek</label>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_objek" class="btn btn-info" style="display: none">...</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-3 offset-sm-2">
                                    <span>User Yang Menerima</span>
                                </div>

                                <div class="col-sm-1">
                                    <span id="userId"></span>
                                </div>
                            </div>

                            <div class="row pb-1 pt-1 pr-5">
                                <div class="col-sm-2">
                                    <label for="kelutId">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" style="display: none" id="kelutId" name="kelutId" readonly
                                        class="form-control">
                                    <input type="text" class="form-control" id="kelutNama" name="kelutNama" readonly>
                                </div>
                                <div class="col-sm-2">
                                    <label for="kelompokId">Kelompok</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" style="display: none" id="kelompokId" name="kelompokId" readonly
                                        class="form-control">
                                    <input type="text" class="form-control" id="kelompokNama" name="kelompokNama" readonly>
                                </div>
                            </div>

                            <div class="row pb-1 pt-1 pr-5">
                                <div class="col-sm-2">
                                    <label for="transaksiId">Kode Transaksi</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="transaksiId" name="transaksiId" class="form-control" readonly>
                                </div>
                                <div class="col-sm-2 offset-sm-2">
                                    <label for="subkelId">Sub Kelompok</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" style="display: none" id="subkelId" name="subkelId" readonly
                                        class="form-control">
                                    <input type="text" class="form-control" id="subkelNama" name="subkelNama" readonly>
                                </div>
                            </div>

                            <div class="row mt-1 pr-5">
                                <div class="col-sm-2">
                                    <label for="namaBarang">Nama Barang</label>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="namaBarang" name="namaBarang" readonly>
                                </div>
                            </div>

                            <div class="row pr-5">

                                <div class="col-sm-2 mt-2 mb-2">
                                    <label>Jumlah Barang</label>
                                </div>

                                <div class="col-sm-2 mt-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="primer" name="primer" readonly>
                                    </div>
                                </div>
                                <div class="col-sm-1 mt-2" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanPrimer" readonly
                                            name="satuanPrimer">
                                    </div>
                                </div>

                                <div class="col-sm-2 mt-2" style="margin-left: 3%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="sekunder" name="sekunder" readonly>
                                    </div>
                                </div>
                                <div class="col-sm-1 mt-2" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanSekunder" readonly
                                            name="satuanSekunder">
                                    </div>
                                </div>

                                <div class="col-sm-2 mt-2" style="margin-left: 3%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="tritier" name="tritier" readonly>
                                    </div>
                                </div>
                                <div class="col-sm-1 mt-2" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanTritier" readonly
                                            name="satuanTritier">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row" id="tableHideShow" style="margin-top: -1%">
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

                        <div style="text-align: right">
                            <button type="button" id="btn_refresh" class="btn btn-info">Refresh</button>
                            <button type="button" id="btn_proses" class="btn btn-info">Proses</button>
                            <button type="button" id="btn_batal" class="btn btn-info">Batal</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="{{ asset('css/Kencana/AccSatuDivisi.css') }}">
    <script src="{{ asset('js/Kencana/AccSatuDivisi.js') }}"></script>
@endsection
