@extends('layouts.appKencana')
@section('content')
@section('title', 'Permohonan Satu Divisi')
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header" style="">Permohonan Satu Divisi</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

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

                    <div class="row pt-2">
                        <div class="col-sm-1">
                            <label for="divisiId">Divisi</label>
                        </div>
                        <div class="col-sm-1">
                            <input type="text" id="divisiId" name="divisiId" class="form-control" readonly
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
                        <div class="col-sm-1 offset-sm-2">
                            <label for="tanggal">Tanggal</label>
                        </div>
                        <div class="col-sm-2">
                            <input type="date" id="tanggal" name="tanggal" style="height: 80%"
                                class="form-control">
                        </div>
                    </div>

                    <div class="baris-1 pl-3">


                        <div class="row">
                            <div class="col-sm-2 ml-5">
                                <label><strong>Pemberi</strong></label>
                            </div>
                        </div>
                        <div class="row pr-5">

                            <div class="col-sm-2">
                                <label for="objekId">Objek</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" id="objekId" name="objekId" style="display: none"
                                    class="form-control" readonly>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_objek" class="btn btn-info" disabled>...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="kelompokId">Kelompok</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" style="display: none" id="kelompokId" name="kelompokId"
                                    class="form-control" readonly>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kelompokNama" name="kelompokNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelompok" class="btn btn-info"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row pb-1 pt-1 pr-5">
                            <div class="col-sm-2">
                                <label for="kelutId">Kelompok Utama</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" style="display: none" id="kelutId" name="kelutId"
                                    class="form-control" readonly>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kelutNama" name="kelutNama" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelut" class="btn btn-info" disabled>...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="subkelId">Sub Kelompok</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" style="display: none" id="subkelId" name="subkelId"
                                    class="form-control" readonly>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="subkelNama" name="subkelNama"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_subkel" class="btn btn-info"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="col-sm-2 offset-sm-9">
                                <label class="ml-5">Saldo Akhir</label>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="col-sm-2">
                                <label for="kodeTypePemberi">Kode Type</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="kodeTypePemberi"
                                    name="kodeTypePemberi" readonly>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="kodeBarangPemberi"
                                    name="kodeBarangPemberi" readonly>
                            </div>
                            <div class="col-sm-1">
                                <label>PIB</label>
                            </div>
                            <div class="col-sm-1">
                                <input style="width: 200%; margin-left: -80%" type="text" class="form-control"
                                    id="pibPemberi" name="pibPemberi" readonly>
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

                        <div class="row mt-1">
                            <div class="col-sm-2">
                                <label for="namaBarangPemberi">Nama Barang</label>
                            </div>
                            <div class="col-sm-7">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="namaBarangPemberi" name="namaBarangPemberi"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_namabarangPemberi" class="btn btn-info"
                                            disabled>...</button>
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

                        <div class="row mt-1">
                            <div class="col-sm-1 offset-sm-9">
                                <input type="text" class="form-control" style="margin-left: 50%; width: 125%"
                                    id="tritier" name="tritier" readonly>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" style="margin-left: 50%"
                                    id="satuanTritier" name="satuanTritier" readonly>
                            </div>
                        </div>

                    </div>

                    <div class="baris-1 pl-3">
                        <div class="row">
                            <div class="col-sm-2 ml-5">
                                <label><strong>Penerima</strong></label>
                            </div>
                        </div>
                        <div class="row pr-5">
                            <div class="col-sm-2">
                                <label for="objekId2">Objek</label>
                            </div>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="text" id="objekId2" name="objekId2" style="display: none"
                                        class="form-control">
                                    <input type="text" class="form-control" id="objekNama2" name="objekNama2"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_objek2" class="btn btn-info"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label>Id Transaksi</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="transaksiId" name="transaksiId"
                                    readonly>
                            </div>
                        </div>
                        <div class="row mt-1 pr-5">
                            <div class="col-sm-2">
                                <label for="kelutId2">Kelompok Utama</label>
                            </div>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="text" style="display: none" id="kelutId2" name="kelutId2"
                                        readonly class="form-control">
                                    <input type="text" class="form-control" id="kelutNama2" name="kelutNama2"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelut2" class="btn btn-info"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="kelompokId2">Kelompok</label>
                            </div>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="text" style="display: none" id="kelompokId2" name="kelompokId2"
                                        readonly class="form-control">
                                    <input type="text" class="form-control" id="kelompokNama2" readonly
                                        name="kelompokNama2">
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kelompok2" class="btn btn-info"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1 pr-5 pb-2">

                            <div class="col-sm-2 offset-sm-6">
                                <label for="subkelId2">Sub Kelompok</label>
                            </div>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="text" style="display: none" id="subkelId2" name="subkelId2"
                                        readonly class="form-control">
                                    <input type="text" class="form-control" id="subkelNama2" name="subkelNama2"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_subkel2" class="btn btn-info"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="col-sm-2">
                                <label for="kodeTypePenerima">Kode Type</label>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="kodeTypePenerima"
                                    name="kodeTypePenerima" readonly>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="kodeBarangPenerima"
                                    name="kodeBarangPenerima" readonly>
                            </div>
                            <div class="col-sm-1">
                                <label>PIB</label>
                            </div>
                            <div class="col-sm-1">
                                <input style="width: 200%; margin-left: -80%" type="text" class="form-control"
                                    id="pibPenerima" name="pibPenerima" readonly>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-sm-2">
                                <label for="namaBarangPenerima">Nama Barang</label>
                            </div>
                            <div class="col-sm-7">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="namaBarangPenerima" name="namaBarangPenerima"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_namabarangPenerima" class="btn btn-info"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row pr-5">

                            <div class="col-sm-2 mt-2 mb-2">
                                <label>Jumlah Mutasi</label>
                            </div>

                            <div class="col-sm-2 mt-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="primer2" name="primer2">
                                </div>
                            </div>
                            <div class="col-sm-1 mt-2" style="margin-left: -2%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="satuanPrimer2"
                                        name="satuanPrimer2" readonly>
                                </div>
                            </div>

                            <div class="col-sm-2 mt-2" style="margin-left: 3%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="sekunder2" name="sekunder2">
                                </div>
                            </div>
                            <div class="col-sm-1 mt-2" style="margin-left: -2%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="satuanSekunder2"
                                        name="satuanSekunder2" readonly>
                                </div>
                            </div>

                            <div class="col-sm-2 mt-2" style="margin-left: 3%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="tritier2" name="tritier2">
                                </div>
                            </div>
                            <div class="col-sm-1 mt-2" style="margin-left: -2%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="satuanTritier2"
                                        name="satuanTritier2" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1 pr-5 pt-2 pb-2">
                            <div class="col-sm-2">
                                <label for="uraian">Alasan Mutasi</label>
                            </div>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="uraian" name="uraian">
                                <input type="text" class="form-control" id="pemberi" name="pemberi"
                                    style="display: none" readonly>
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
<link rel="stylesheet" href="{{ asset('css/Kencana/PermohonanSatuDivisi.css') }}">
<script src="{{ asset('js/Kencana/PermohonanSatuDivisi.js') }}"></script>
<link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
<script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
