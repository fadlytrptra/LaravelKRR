@extends('layouts.appKencana')
@section('content')
@section('title', 'Permohonan Pemberi Barang (Tanpa ACC Mgr)')
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">

            <div class="card">
                <div class="card-header" style="">Permohonan Pemberi Barang (Tanpa ACC Mgr)</div>
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

                    <div class="baris-1 pl-1" id="baris-1">
                        <label><strong>PEMBERI</strong></label>
                        <div class="row pt-2 pr-5">
                            <div class="col-sm-2">
                                <label for="divisiId">Divisi</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" id="divisiId" name="divisiId" class="form-control" readonly
                                        style="display: none">
                                    <input type="text" class="form-control" id="divisiNama" name="divisiNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-1 offset-sm-2">
                                <label for="Tanggal">Tanggal</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="date" class="form-control" id="tanggal" name="tanggal">
                            </div>
                        </div>

                        <div class="row pr-5 pt-1">
                            <div class="col-sm-2">
                                <label for="objekId">Objek</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" id="objekId" name="objekId" class="form-control" readonly
                                        style="display: none">

                                    <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_objek" class="btn btn-info" disabled>...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 pl-5">
                                <label for="kelompokId">Kelompok</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" id="kelompokId" name="kelompokId" class="form-control"
                                        style="display: none" readonly>
                                    <input type="text" class="form-control" id="kelompokNama" name="kelompokNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelompok" class="btn btn-info"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row pb-1 pr-5 pt-1">
                            <div class="col-sm-2">
                                <label for="kelutId">Kelompok Utama</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" id="kelutId" name="kelutId" class="form-control" readonly
                                        style="display: none">
                                    <input type="text" class="form-control" id="kelutNama" name="kelutNama" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelut" class="btn btn-info" disabled>...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 pl-5">
                                <label for="subkelId">Sub Kelompok</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" id="subkelId" name="subkelId" class="form-control" readonly
                                        style="display: none">
                                    <input type="text" class="form-control" id="subkelNama" name="subkelNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_subkel" class="btn btn-info"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row pb-1 pr-5 pt-1">
                            <div class="col-sm-2 offset-sm-10">
                                <label style="margin-left: 30%">Saldo Akhir</label>
                            </div>
                        </div>

                        <div class="row pb-1 pr-5 pt-1">
                            <div class="col-sm-1">
                                <label for="idType">Id Type</label>
                            </div>
                            <div class="col-sm-2">
                                <input style="width: 150%" type="text" id="idType" name="idType"
                                    class="form-control">
                            </div>
                            <div class="col-sm-2" style="margin-left: 7%">
                                <label for="kodeBarang">Kode Barang</label>
                            </div>
                            <div class="col-sm-2" style="margin-left: -7%">
                                <input type="text" class="form-control" id="kodeBarang" name="kodeBarang">
                            </div>
                            <div class="col-sm-1">
                                <label for="pib">PIB</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="pib" name="pib" readonly>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" style="margin-left: 50%; width: 125%"
                                    id="primer" name="primer" readonly>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" style="margin-left: 50%"
                                    id="satuanPrimer" name="satuanPrimer" readonly>
                            </div>
                        </div>

                        <div class="row pb-1 pr-5 pt-1">
                            <div class="col-sm-2">
                                <label for="type">Nama Barang</label>
                            </div>
                            <div class="col-sm-8">
                                <div class="input-group">
                                    <input type="text" id="type" name="type" class="form-control"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_type" disabled
                                            class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" style="margin-left: 50%; width: 125%"
                                    id="sekunder" name="sekunder" readonly>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" style="margin-left: 50%"
                                    id="satuanSekunder" name="satuanSekunder" readonly>
                            </div>
                        </div>

                        <div class="row pr-5 pt-1">
                            <div class="col-sm-2">
                                <label for="hargaSatuan" id="hargaSatuanLabel">Harga Satuan</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" id="hargaSatuan" name="hargaSatuan" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="row pb-1 pr-5 pt-1">
                            <div class="col-sm-2 keranjang">
                                <label for="jmlKeranjang">Jml Keranjang</label>
                            </div>
                            <div class="col-sm-1 keranjang">
                                <input type="text" id="jmlKeranjang" name="jmlKeranjang" class="form-control">
                            </div>
                            <div class="col-sm-3 kosong"></div>
                            <div class="col-sm-1 offset-sm-7">
                                <input type="text" class="form-control" style="margin-left: 50%; width: 125%"
                                    id="tritier" name="tritier" readonly>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" style="margin-left: 50%"
                                    id="satuanTritier" name="satuanTritier" readonly>
                            </div>
                        </div>

                        <div class="row pb-1 pr-5 pt-1">
                            <div class="col-sm-2 offset-sm-10">
                                <label style="margin-left: 20%">Blm Di Acc</label>
                            </div>
                        </div>

                        <div class="row pb-1 pr-5 pt-1">
                            <div class="col-sm-1 offset-sm-10">
                                <input type="text" class="form-control" style="margin-left: 50%; width: 125%"
                                    id="primer3" name="primer3" readonly>
                            </div>
                        </div>
                        <div class="row pb-1 pr-5 pt-1">
                            <div class="col-sm-1 offset-sm-10">
                                <input type="text" class="form-control" style="margin-left: 50%; width: 125%"
                                    id="sekunder3" name="sekunder3" readonly>
                            </div>
                        </div>
                        <div class="row pb-1 pr-5 pt-1">
                            <div class="col-sm-1 offset-sm-10">
                                <input type="text" class="form-control" style="margin-left: 50%; width: 125%"
                                    id="tritier3" name="tritier3" readonly>
                            </div>
                        </div>

                    </div>

                    <div class="baris-1 pl-1" id="baris-1">
                        <label><strong>PENERIMA</strong></label>
                        <div class="row pt-2 pr-5">
                            <div class="col-sm-2">
                                <label for="divisiId2">Divisi</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" id="divisiId2" name="divisiId2" class="form-control"
                                        readonly style="display: none">
                                    <input type="text" class="form-control" id="divisiNama2" name="divisiNama2"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_divisi2" disabled
                                            class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 pl-5">
                                <label for="idTransaksi">Id Transaksi</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" readonly class="form-control" id="idTransaksi"
                                    name="idTransaksi">
                            </div>
                        </div>

                        <div class="row pr-5 pt-1">
                            <div class="col-sm-2">
                                <label for="objekId2">Objek</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" id="objekId2" name="objekId2" class="form-control"
                                        readonly style="display: none">
                                    <input type="text" class="form-control" id="objekNama2" name="objekNama2"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_objek2" disabled
                                            class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 pl-5">
                                <label for="kelompokId2">Kelompok</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" id="kelompokId2" name="kelompokId2" class="form-control"
                                        style="display: none" readonly>
                                    <input type="text" class="form-control" id="kelompokNama2"
                                        name="kelompokNama2" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelompok2" disabled
                                            class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row pr-5 pt-1">
                            <div class="col-sm-2">
                                <label for="kelutId2">Kelompok Utama</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" id="kelutId2" name="kelutId2" class="form-control"
                                        readonly style="display: none">
                                    <input type="text" class="form-control" id="kelutNama2" name="kelutNama2"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelut2" disabled
                                            class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 pl-5">
                                <label for="subkelId2">Sub Kelompok</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" id="subkelId2" name="subkelId2" class="form-control"
                                        readonly style="display: none">
                                    <input type="text" class="form-control" id="subkelNama2" name="subkelNama2"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_subkel2" disabled
                                            class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row pr-5 pt-1">
                            <div class="col-sm-2">
                                <label>Jumlah Mutasi</label>
                            </div>

                            <div class="col-sm-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="primer2" name="primer2">
                                </div>
                            </div>
                            <div class="col-sm-1" style="margin-left: -2%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="satuanPrimer2"
                                        name="satuanPrimer2" readonly>
                                </div>
                            </div>

                            <div class="col-sm-2" style="margin-left: 3%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="sekunder2" name="sekunder2">
                                </div>
                            </div>
                            <div class="col-sm-1" style="margin-left: -2%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="satuanSekunder2"
                                        name="satuanSekunder2" readonly>
                                </div>
                            </div>

                            <div class="col-sm-2" style="margin-left: 3%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="tritier2" name="tritier2">
                                </div>
                            </div>
                            <div class="col-sm-1" style="margin-left: -2%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="satuanTritier2"
                                        name="satuanTritier2" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="row pb-1 pr-5 pt-1">
                            <div class="col-sm-2">
                                <label for="uraian">Alasan Mutasi</label>
                            </div>
                            <div class="col-sm-8">
                                <input type="text" id="uraian" name="uraian" class="form-control">
                            </div>
                        </div>
                    </div>

                    <div style="text-align: right">
                        <button type="button" id="btn_isi" class="btn btn-info" disabled>Isi</button>
                        <button type="button" id="btn_koreksi" class="btn btn-info" disabled>Koreksi</button>
                        <button type="button" id="btn_hapus" class="btn btn-info" disabled>Hapus</button>
                        <button type="button" id="btn_proses" class="btn btn-info" disabled>Proses</button>
                        <button type="button" id="btn_batal" class="btn btn-info" disabled>Batal</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="{{ asset('css/Kencana/MhnPemberi.css') }}">
<script src="{{ asset('js/Kencana/MhnPemberi.js') }}"></script>
<link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
<script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
