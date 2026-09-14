@extends('layouts.appKencana')
@section('content')
@section('title', 'Acc Keluar Barang u/ Penjualan Kencana')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-sm-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header" style="">Acc Keluar Barang u/ Penjualan Kencana</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="row mb-2" style="margin-top: -1%">
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
                        {{-- ATAS --}}
                        <div class="baris-1 pl-1" id="baris-1">
                            <div class="row pt-2 pr-5">
                                <div class="col-sm-2">
                                    <label for="divisi">Divisi</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="divisi" name="divisi" readonly>
                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="transaksi">Id Transaksi</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="transaksi" name="transaksi" readonly>
                                </div>
                            </div>

                            <div class="row pr-5 pt-1">
                                <div class="col-sm-2">
                                    <label for="objek">Objek</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="objek" name="objek" readonly>
                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="kelompok">Kelompok</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="kelompok" name="kelompok" readonly>
                                </div>
                            </div>

                            <div class="row pb-1 pr-5 pt-1">
                                <div class="col-sm-2">
                                    <label for="kelut">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="kelut" name="kelut" readonly>

                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="subkel">Sub Kelompok</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="subkel" name="subkel" readonly>
                                    <input type="text" class="form-control" id="subkelId" name="subkelId"
                                        style="display: none" readonly>
                                </div>
                            </div>

                            <div class="row pt-1 pr-5" style="color: rgb(187, 187, 187)">
                                <div class="col-sm-2">
                                    <label>Saldo Akhir</label>
                                </div>

                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="primer" name="primer"
                                            class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-2 offset-sm-1">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="sekunder" name="sekunder"
                                            class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-2 offset-sm-1">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="tritier" name="tritier"
                                            class="form-control" readonly>
                                    </div>
                                </div>
                            </div>

                            <div class="row pt-1 pr-5">
                                <div class="col-sm-2">
                                    <label>Tgl Mhn DO</label>
                                </div>

                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="tanggal" name="tanggal"
                                            class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-1">
                                    <label>No SP</label>
                                </div>

                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="noSp" name="noSp"
                                            class="form-control" readonly>
                                    </div>
                                </div>

                            </div>

                            <div class="row pb-1 pr-5 pt-1">
                                <div class="col-sm-2">
                                    <label for="type">Nama Barang</label>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="type" name="type" readonly>
                                </div>
                            </div>

                            <div class="row pb-1 pr-5 pt-1">
                                <div class="col-sm-2">
                                    <label for="customer">Customer</label>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="customer" name="customer" readonly>
                                </div>
                            </div>

                            <div class="row pt-1 pr-5">
                                <div class="col-sm-2">
                                    <label>Min DO</label>
                                </div>

                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="min" name="min"
                                            class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-1">
                                    <label>Max DO</label>
                                </div>

                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="max" name="max"
                                            class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-1" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satJual" name="satJual"
                                            class="form-control" readonly>
                                    </div>
                                </div>
                            </div>

                            <div class="row pt-1 pr-5" style="color: brown">
                                <div class="col-sm-2">
                                    <label>Jml Dikeluarkan</label>
                                </div>

                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="primer1" name="primer1"
                                            class="form-control">
                                    </div>
                                </div>

                                <div class="col-sm-1" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satPrimer" name="satPrimer"
                                            class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-2"  style="margin-left: 2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="sekunder1" name="sekunder1"
                                            class="form-control">
                                    </div>
                                </div>

                                <div class="col-sm-1" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satSekunder" name="satSekunder"
                                            class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-2" style="margin-left: 2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="tritier1" name="tritier1"
                                            class="form-control">
                                    </div>
                                </div>

                                <div class="col-sm-1" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satTritier" name="satTritier"
                                            class="form-control" readonly>
                                    </div>
                                </div>
                            </div>

                            <div class="row pt-1 pr-5">
                                <div class="col-sm-2">
                                    <label style="color:rgb(255, 0, 255)">Jml Konversi</label>
                                </div>

                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="konversi" name="konversi" style="color: rgb(255, 0, 255)"
                                            class="form-control">
                                    </div>
                                </div>

                            </div>
                        </div>

                        <button type="button" id="btn_proses" class="btn btn-outline-secondary" disabled>Proses</button>
                        {{-- <button type="button" id="btn_batal" class="btn btn-outline-secondary">Batal</button> --}}
                        <button type="button" id="btn_refresh" class="btn btn-outline-secondary">Refresh</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="{{ asset('css/Kencana/KeluarBarangUntukPenjualan.css') }}">
    <script src="{{ asset('js/Kencana/KeluarBarangUntukPenjualan.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
