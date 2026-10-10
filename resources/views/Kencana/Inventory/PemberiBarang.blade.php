@extends('layouts.appKencana')
@section('content')
@section('title', 'Pemberi Barang')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header" style="">PEMBERI BARANG</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="baris-1 pl-3" id="baris-1">
                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label for="objekId"><strong>PEMBERI BARANG</strong></label>
                                </div>
                            </div>
                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label for="divisiId">Divisi</label>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="divisiNama" name="divisiNama"
                                            disabled>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <label for="pemberi">User Pemberi</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="pemberi" name="pemberi" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <label for="tanggal">Tanggal</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="tanggal" name="tanggal" readonly>
                                </div>
                            </div>

                            <div class="row mt-1 pr-5">
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
                                <div class="col-sm-2">
                                    <label for="kelompokId">Kelompok</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="kelompokNama" name="kelompokNama"
                                        readonly>

                                </div>
                            </div>

                            <div class="row mt-1 pr-5">
                                <div class="col-sm-2">
                                    <label for="kelutId">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="kelutNama" name="kelutNama" readonly>

                                </div>
                                <div class="col-sm-2">
                                    <label for="subkelId">Sub Kelompok</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="subkelNama" name="subkelNama" readonly>

                                </div>
                            </div>

                            <div class="row pt-2 pr-5">
                                <div class="col-sm-2">
                                    <label for="kodeTransaksi">Kode Transaksi</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="kodeTransaksi" name="kodeTransaksi"
                                        readonly>
                                </div>
                                <div class="col-sm-2">
                                    <label for="kodeBarang">Kode Barang</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="kodeBarang" name="kodeBarang" readonly>
                                </div>
                                <div class="col-sm-1 offset-sm-1">
                                    <label for="pemohon">Pemohon</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="pemohon" name="pemohon" readonly>
                                </div>
                            </div>

                            <div class="row mt-1 pr-5">
                                <div class="col-sm-2">
                                    <label for="namaBarang">Nama Barang</label>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="namaBarang" name="namaBarang"
                                        readonly>
                                </div>
                            </div>

                            <div class="row mt-1 pr-5">
                                <div class="col-sm-2 mb-2">
                                    <label>Jumlah Barang</label>
                                </div>

                                <div class="col-sm-2">
                                    <label>Sat. Primer</label>
                                </div>
                                <div class="col-sm-1" style="margin-left: -8%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="primer" name="primer"
                                            readonly>
                                    </div>
                                </div>
                                <div class="col-sm-1" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanPrimer" name="satuanPrimer"
                                            readonly>
                                    </div>
                                </div>

                                <div class="col-sm-2">
                                    <label>Sat. Sekunder</label>
                                </div>
                                <div class="col-sm-1" style="margin-left: -5%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="sekunder" name="sekunder"
                                            readonly>
                                    </div>
                                </div>
                                <div class="col-sm-1" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanSekunder"
                                            name="satuanSekunder" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-2">
                                    <label>Sat. Tritier</label>
                                </div>
                                <div class="col-sm-1" style="margin-left: -5%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="tritier" name="tritier"
                                            readonly>
                                    </div>
                                </div>
                                <div class="col-sm-1" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanTritier"
                                            name="satuanTritier" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row" id="ids" style="display: none">
                            <div class="col-md-5 d-flex">
                                <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                                <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                                <input type="text" id="kelompokId" name="kelompokId" class="form-control" readonly>
                                <input type="text" id="kelutId" name="kelutId" class="form-control" readonly>
                                <input type="text" id="subkelId" name="subkelId" class="form-control" readonly>
                            </div>
                        </div>

                        <div class="baris-2 pl-3">
                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label><strong>PENERIMA BARANG</strong></label>
                                </div>
                            </div>
                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label>Divisi</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="divisiNama2" name="divisiNama2"
                                        disabled>
                                </div>
                            </div>

                            <div class="row mt-1 pr-5">
                                <div class="col-sm-2">
                                    <label for="objekId">Objek</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="objekNama2" name="objekNama2"
                                        readonly>

                                </div>
                                <div class="col-sm-2">
                                    <label for="kelompokId">Kelompok</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="kelompokNama2" name="kelompokNama2"
                                        readonly>

                                </div>
                            </div>

                            <div class="row mt-1 pr-5 pb-1">
                                <div class="col-sm-2">
                                    <label for="kelutId">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="kelutNama2" name="kelutNama2"
                                        readonly>

                                </div>
                                <div class="col-sm-2">
                                    <label for="subkelId">Sub Kelompok</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="subkelNama2" name="subkelNama2"
                                        readonly>

                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="col-sm-12 mb-2">
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
                            <div class="col-sm-2">
                                <button style="width: 75%" type="button" id="btn_refresh"
                                    class="btn btn-info">REFRESH</button>
                            </div>
                            <div class="col-sm-2 offset-sm-3">
                                <button style="width: 75%" type="button" id="btn_proses"
                                    class="btn btn-info">Proses</button>
                            </div>
                            {{-- <div class="col-sm-2 offset-sm-3">
                                <button style="width: 75%" type="button" id="btn_batal"
                                    class="btn btn-info">Batal</button>
                            </div> --}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="{{ asset('css/Kencana/PemberiBarang.css') }}">
    <script src="{{ asset('js/Kencana/PemberiBarang.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
