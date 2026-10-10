@extends('layouts.appKencana')
@section('content')
@section('title', 'Informasi Lacak Transaksi')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Informasi Lacak Transaksi</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="row">
                            <div class="col-sm-5 offset-sm-1 bordered">

                                <div class="row">
                                    <div class="col-sm-12">
                                        <label>Menampilkan Data Transaksi berdasarkan</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-12 ml-3" style="color: blue">
                                        <label>Mutasi 1 (SATU) Divisi</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 ml-3">
                                        <input type="radio" id="Pemberi3" name="opsi" value="Pemberi3">
                                        <label for="Pemberi3">Sebagai Pemberi Barang (Pemohon)</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 ml-3">
                                        <input type="radio" id="Penerima3" name="opsi" value="Penerima3">
                                        <label for="Penerima3">Sebagai Penerima Barang</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-12 ml-3" style="color: blue">
                                        <label>Mutasi Antar Divisi AWAL PENERIMA BARANG</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 ml-3">
                                        <input type="radio" id="Penerima1" name="opsi" value="Penerima1">
                                        <label for="Penerima1">Sebagai Penerima Barang (Pemohon)</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 ml-3">
                                        <input type="radio" id="Penerima2" name="opsi" value="Penerima2">
                                        <label for="Penerima2">Sebagai Pemberi Barang</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-12 ml-3" style="color: blue">
                                        <label>Mutasi Antar Divisi AWAL PEMBERI BARANG</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 ml-3">
                                        <input type="radio" id="Pemberi1" name="opsi" value="Pemberi1">
                                        <label for="Pemberi1">Sebagai Pemberi Barang (Pemohon)</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 ml-3">
                                        <input type="radio" id="Pemberi2" name="opsi" value="Pemberi2">
                                        <label for="Pemberi2">Sebagai Penerima Barang</label>
                                    </div>
                                </div>

                            </div>

                            <div class="col-sm-5 ml-3 bordered">

                                <div class="row pt-2">
                                    <div class="col-sm-4">
                                        <label for="divisiId">Tanggal Mohon</label>
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="date" id="tanggal" name="tanggal" class="form-control">
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-sm-3">
                                        <label for="divisiId">User Id</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="text" id="userId" name="userId" class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-sm-3">
                                        <label for="divisiId">Divisi</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                                    </div>
                                    <div class="col-sm-5">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="divisiNama" name="divisiNama"
                                                readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-sm-3">
                                        <label for="obje`Id">Objek</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" id="objekId" name="objekId" class="form-control"
                                            readonly>
                                    </div>
                                    <div class="col-sm-5">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="objekNama" name="objekNama"
                                                readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_objek" class="btn btn-info">...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-sm-3">
                                        <label for="kelutId">Kel Utama</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" id="kelutId" name="kelutId" class="form-control"
                                            readonly>
                                    </div>
                                    <div class="col-sm-5">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="kelutNama" name="kelutNama"
                                                readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_kelut" class="btn btn-info">...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-sm-3">
                                        <label for="kelompokId">Kelompok</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" id="kelompokId" name="kelompokId" class="form-control"
                                            readonly>
                                    </div>
                                    <div class="col-sm-5">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="kelompokNama"
                                                name="kelompokNama" readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_kelompok"
                                                    class="btn btn-info">...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-sm-3">
                                        <label for="subkelId">Sub Kelompok</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" id="subkelId" name="subkelId" class="form-control"
                                            readonly>
                                    </div>
                                    <div class="col-sm-5">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="subkelNama" name="subkelNama"
                                                readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_subkel" class="btn btn-info">...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-sm-10 offset-sm-1">
                                        <button type="button" id="btn_ok" style="width: 100%"
                                            class="btn btn-outline-secondary">OK</button>
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

                    </div>
                </div>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="{{ asset('css/Kencana/LacakTransaksi.css') }}">
    <script src="{{ asset('js/Kencana/LacakTransaksi.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
