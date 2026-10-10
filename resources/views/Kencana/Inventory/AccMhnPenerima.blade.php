@extends('layouts.appKencana')
@section('content')
@section('title', 'ACC Permohonan Mutasi Barang Antar Divisi (Awal Penerima Barang)')
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header" style="">ACC Permohonan Mutasi Barang Antar Divisi (Awal Penerima Barang)
                </div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    <div class="baris-1 pl-3" id="baris-1">

                        <div class="row pr-5">
                            <div class="col-sm-2">
                                <label for="objekId"><strong>PENERIMA</strong></label>
                            </div>
                        </div>

                        <div class="row pr-5">
                            <div class="col-sm-2">
                                <label for="pemberi">Pemohon</label>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" disabled id="pemberi" name="pemberi">
                            </div>
                            <div class="col-sm-1">
                                <label for="tanggal">Tanggal</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="date" class="form-control" id="tanggal" name="tanggal">
                            </div>
                            <div class="col-sm-2 offset-sm-2">
                                <input type="radio" id="acc" name="opsi" value="acc" checked>
                                <label for="acc">ACC</label>
                            </div>
                        </div>

                        <div class="row pr-5 pt-1">
                            <div class="col-sm-2">
                                <label for="divisiId">Divisi</label>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="divisiNama" name="divisiNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-2">
                                <button type="button" id="btn_ok" disabled class="btn btn-info">OK</button>
                            </div>

                            <div class="col-sm-2">
                                <input type="radio" id="batalAcc" name="opsi" value="batalAcc">
                                <label for="batalAcc">Batal ACC</label>
                            </div>
                        </div>

                        <div class="row mt-1 pr-5">
                            <div class="col-sm-2">
                                <label for="objekId">Objek</label>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                            </div>
                            <div class="col-sm-3">
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

                        <div class="row mt-1 pr-5 pb-1">
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


                    </div>

                    <div class="row" id="ids" style="display: none">
                        <div class="col-md-5 d-flex">
                            {{-- <input type="text" id="divisiId" name="divisiId" class="form-control"> --}}
                            {{-- <input type="text" id="objekId" name="objekId" class="form-control"> --}}
                            <input type="text" id="kelompokId" name="kelompokId" class="form-control">
                            <input type="text" id="kelutId" name="kelutId" class="form-control">
                            <input type="text" id="subkelId" name="subkelId" class="form-control">
                        </div>
                    </div>

                    <div class="baris-2 pl-3">
                        <div class="row pr-5">
                            <div class="col-sm-2">
                                <label><strong>PEMBERI</strong></label>
                            </div>
                        </div>
                        <div class="row pr-5">
                            <div class="col-sm-2">
                                <label>Divisi</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="divisiNama2" name="divisiNama2"
                                    readonly>
                            </div>
                            <div class="col-sm-2">
                                <label>Kode Transaksi</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="kodeTransaksi" name="kodeTransaksi"
                                    readonly>
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

                        <div class="row mt-1 pr-5">
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

                            <div class="col-sm-1" style="margin-left: -5.25%">
                                <label>Primer</label>
                            </div>
                            <div class="col-sm-2" style="margin-left: -3%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="primer" name="primer"
                                        readonly>
                                </div>
                            </div>
                            <div class="col-sm-1" style="margin-left: -2%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="satuanPrimer" readonly
                                        name="satuanPrimer">
                                </div>
                            </div>

                            <div class="col-sm-1">
                                <label>Sekunder</label>
                            </div>
                            <div class="col-sm-2" style="margin-left: -2%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="sekunder" name="sekunder"
                                        readonly>
                                </div>
                            </div>
                            <div class="col-sm-1" style="margin-left: -2%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="satuanSekunder" readonly
                                        name="satuanSekunder">
                                </div>
                            </div>

                            <div class="col-sm-1">
                                <label>Tritier</label>
                            </div>
                            <div class="col-sm-2" style="margin-left: -3%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="tritier" name="tritier"
                                        readonly>
                                </div>
                            </div>
                            <div class="col-sm-1" style="margin-left: -2%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="satuanTritier" readonly
                                        name="satuanTritier">
                                </div>
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
                        <div class="col-9" style="margin-left: 50px;">
                            <div>
                                <input class="form-check-input" type="checkbox" id="checkbox2" value="option1">
                            </div>
                            <div style="white-space: nowrap;">
                                <label for="checkbox2">Pilih Semua</label>
                            </div>
                        </div>
                    </div>

                    <div style="text-align: right">
                        {{-- <div class="col-sm-2">
                                <button style="width: 75%" type="button" id="btn_refresh"
                                    class="btn btn-info">REFRESH</button>
                            </div> --}}
                        <button type="button" id="btn_proses" class="btn btn-info" disabled>Proses</button>
                        <button type="button" id="btn_batal" class="btn btn-info">Batal</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="{{ asset('css/Kencana/AccMhnPenerima.css') }}">
<script src="{{ asset('js/Kencana/AccMhnPenerima.js') }}"></script>
<link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
<script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
