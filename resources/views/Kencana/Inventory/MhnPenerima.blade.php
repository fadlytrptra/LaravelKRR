@extends('layouts.appKencana')
@section('content')
@section('title', 'Permohonan Mutasi Barang Antar Divisi (Awal Penerima Barang)')
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">

            <div class="card">
                <div class="card-header" style="">Permohonan Mutasi Barang Antar Divisi (Awal Penerima Barang)</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

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

                    <label><strong>PENERIMA BARANG</strong></label>
                    <div class="baris-1 pl-3" id="baris-1">
                        <div class="row pt-2">
                            <div class="col-2">
                                <label for="divisiId">Divisi</label>
                            </div>
                            <div class="col-sm-3 pl-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="divisiNama2" name="divisiNama2"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_divisi2" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-1">
                                <label for="pemohon">Pemohon</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="pemohon" name="pemohon" readonly>
                            </div>
                            <div class="col-1">
                                <label for="tanggal">Tanggal</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="date" class="form-control" id="tanggal">
                            </div>
                        </div>

                        <div class="row pr-5">
                            <div class="col-sm-2">
                                <label for="objekId">Objek</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="objekNama2" name="objekNama2"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_objek2" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 pl-5">
                                <label for="kelompokId">&nbsp;Kelompok</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kelompokNama2" name="kelompokNama2"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelompok2" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row pb-1 pr-5 pb-2">
                            <div class="col-sm-2">
                                <label for="kelutId">Kelompok Utama</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kelutNama2" name="kelutNama2"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelut2" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 pl-5">
                                <label for="subkelId">&nbsp;Sub Kelompok</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="subkelNama2" name="subkelNama2"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_subkel2" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row" id="ids" style="display:none;">
                        <div class="col-md-5 d-flex">
                            <input type="text" id="divisiId2" name="divisiId2" class="form-control" readonly>
                            <input type="text" id="objekId2" name="objekId2" class="form-control" readonly>
                            <input type="text" id="kelompokId2" name="kelompokId2" class="form-control" readonly>
                            <input type="text" id="kelutId2" name="kelutId2" class="form-control" readonly>
                            <input type="text" id="subkelId2" name="subkelId2" class="form-control">
                        </div>
                    </div>
                    <div class="row" id="ids2" style="display:none;">
                        <div class="col-md-5 d-flex">
                            <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                            <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                            <input type="text" id="kelompokId" name="kelompokId" class="form-control" readonly>
                            <input type="text" id="kelutId" name="kelutId" class="form-control" readonly>
                            <input type="text" id="subkelId" name="subkelId" class="form-control" readonly>
                        </div>
                    </div>

                    <label><strong>PEMBERI BARANG</strong></label>
                    <div class="baris-2 pl-3" id="baris-2">
                        <div class="row pt-2">
                            <div class="col-2">
                                <label for="divisiId">Divisi</label>
                            </div>
                            <div class="col-sm-3 pl-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="divisiNama" name="divisiNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4"></div>
                            <div class="col-sm-2">
                            </div>
                        </div>

                        <div class="row pr-5">
                            <div class="col-sm-2">
                                <label for="objekId">Objek</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="objekNama" name="objekNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_objek" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 pl-5">
                                <label for="kelompokId">&nbsp;Kelompok</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kelompokNama" name="kelompokNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelompok" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row pb-1 pr-5 pb-2">
                            <div class="col-sm-2">
                                <label for="kelutId">Kelompok Utama</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kelutNama" name="kelutNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelut" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 pl-5">
                                <label for="subkelId">&nbsp;Sub Kelompok</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="subkelNama" name="subkelNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_subkel" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row pr-5 pt-2">
                            <div class="col-sm-2">
                                <label for="kodeBarang">Kode Barang</label>
                            </div>
                            <div style="width: 110px; margin-left: 15px; margin-right: 10px;">
                                <input type="text" class="form-control" id="kodeBarang" name="kodeBarang">
                            </div>
                            <label for="PIB">PIB</label>
                            <div style="width: 170px;margin-left: 5px;">
                                <input type="text" class="form-control" id="PIB" name="PIB"readonly>
                            </div>
                            <label for="kodeType" style="margin-left: 10px; margin-right:60px">Kode Type</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="kodeType" name="kodeType"readonly>
                            </div>
                        </div>

                        <div class="row pr-5">
                            <div class="col-sm-2">
                                <label for="namaBarang">Nama Barang</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="namaBarang" name="namaBarang"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_namaBarang" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 pl-5">
                                <label for="kodeTransaksi">ID Transaksi</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="kodeTransaksi" name="kodeTransaksi"
                                    readonly>
                            </div>
                        </div>

                        <div class="row pl-3 pt-2">
                            <label>Stok Akhir Barang</label>
                            <label style="margin-left: 102px;">Sat. Primer</label>
                            <div style="width: 150px; margin-left: 10px">
                                <input type="text" class="form-control" id="primer" name="primer" readonly>
                            </div>
                            <div style="width: 70px; margin-left: 2px; margin-right: 1%">
                                <input type="text" class="form-control" id="no_primer" name="no_primer" readonly>
                            </div>
                            <label>Sat. Sekunder</label>
                            <div style="width: 150px; margin-left: 10px">
                                <input type="text" class="form-control" id="sekunder" name="sekunder" readonly>
                            </div>
                            <div style="width: 70px; margin-left: 2px; margin-right: 1%">
                                <input type="text" class="form-control" id="no_sekunder" name="no_sekunder"
                                    readonly>
                            </div>
                            <label>Sat. Tritier</label>
                            <div style="width: 150px; margin-left: 10px">
                                <input type="text" class="form-control" id="tritier" name="tritier" readonly>
                            </div>
                            <div style="width: 70px; margin-left: 2px; margin-right: 1%">
                                <input type="text" class="form-control" id="no_tritier" name="no_tritier"
                                    readonly>
                            </div>
                        </div>
                        <div class="row pr-5 pb-1">
                            <div class="col-sm-2">
                                <label>Jumlah Belum ACC</label>
                            </div>
                            <div></div>
                            <div class="col-sm-1 pr-0">
                                <input type="text" class="form-control" id="primer2" name="primer2" readonly>
                            </div>
                            <div style="margin-right: 11.2%"></div>
                            <div class="col-sm-1 pr-0 pl-1">
                                <input type="text" class="form-control" id="sekunder2" name="sekunder2" readonly>
                            </div>
                            <div style="margin-right: 9.3%"></div>
                            <div class="col-sm-1 pr-0 pl-1">
                                <input type="text" class="form-control" id="tritier2" name="tritier2" readonly>
                            </div>
                        </div>
                    </div>


                    <div class="baris-3 pl-3" id="baris-3">
                        <div class="row pl-3 pt-2">
                            <label>Jumlah Barang</label>
                            <label style="margin-left: 8%;">Primer</label>
                            <div style="width: 150px; margin-left: 12px">
                                <input type="text" class="form-control" id="primer3" name="primer3">
                            </div>
                            <div style="width: 70px; margin-left: 2px; margin-right: 2%">
                                <input type="text" class="form-control" id="no_primer3" name="no_primer3"
                                    readonly>
                            </div>
                            <label>Sekunder</label>
                            <div style="width: 150px; margin-left: 23px">
                                <input type="text" class="form-control" id="sekunder3" name="sekunder3">
                            </div>
                            <div style="width: 70px; margin-left: 2px; margin-right: 2%">
                                <input type="text" class="form-control" id="no_sekunder3" name="no_sekunder3"
                                    readonly>
                            </div>
                            <label>Tritier</label>
                            <div style="width: 150px; margin-left: 23px">
                                <input type="text" class="form-control" id="tritier3" name="tritier3">
                            </div>
                            <div style="width: 70px; margin-left: 2px; margin-right: 2%">
                                <input type="text" class="form-control" id="no_tritier3" name="no_tritier3"
                                    readonly>
                            </div>
                        </div>
                        <div class="row pr-5 pt-2">
                            <div class="col-sm-2">
                                <label for="alasan">Alasan Mutasi</label>
                            </div>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="alasan" name="alasan">
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="col-sm-12 mb-2">
                            <div class="table-responsive fixed-height" style="height: 100px; display:none;">
                                <table class="table table-bordered no-wrap-header" id="tableHarga">
                                    <thead>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="button" id="btn_isi" class="btn btn-outline-secondary">Isi</button>
                        <button type="button" id="btn_proses" class="btn btn-outline-secondary">Proses</button>
                        <button type="button" id="btn_batal" class="btn btn-outline-secondary">Batal</button>
                        <button type="button" id="btn_koreksi" class="btn btn-outline-secondary">Koreksi</button>
                        <button type="button" id="btn_hapus" class="btn btn-outline-secondary">Hapus</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="{{ asset('css/Kencana/MhnPenerima.css') }}">
<script src="{{ asset('js/Kencana/MhnPenerima.js') }}"></script>
<link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
<script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
