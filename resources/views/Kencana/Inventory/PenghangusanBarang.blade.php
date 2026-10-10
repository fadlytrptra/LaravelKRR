@extends('layouts.appKencana')
@section('content')
@section('title', 'Permohonan Penghangusan Barang')
<script></script>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-11 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Permohonan Penghangusan Barang</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    <div class="baris-1 pl-3" id="baris-1">
                        <div class="row pt-2">
                            <div class="col-2">
                                <label for="divisiId">Divisi</label>
                            </div>
                            <div class="col-sm-3 pl-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="divisiNama" name="divisiNama">
                                    <div class="input-group-append">
                                        <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-1">
                                <label for="tanggal">Tanggal</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="date" class="form-control" id="tanggal">
                            </div>
                            <div class="col-1">
                                <label for="pemohon">Pemohon</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="pemohon" name="pemohon" readonly>
                            </div>
                        </div>

                        <div class="row pr-5">
                            <div class="col-sm-2">
                                <label for="objekId">Objek</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
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
                                    <input type="text" class="form-control" id="kelutNama" name="kelutNama" readonly>
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
                    </div>

                    <div class="row" id="ids" style="display:none;">
                        <div class="col-md-5 d-flex">
                            <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                            <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                            <input type="text" id="kelompokId" name="kelompokId" class="form-control" readonly>
                            <input type="text" id="kelutId" name="kelutId" class="form-control" readonly>
                            <input type="text" id="subkelId" name="subkelId" class="form-control" readonly>
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

                    {{-- <div class="col-sm-2 pl-3">
                        <input type="checkbox" name="centang" id="centang" disabled>
                        <label for="centang"><i>Centang All</i></label disabled>
                    </div> --}}


                    <div class="baris-2 pl-3">
                        <div class="row pt-2">
                            <div class="col-2">
                                <label for="kodeTransaksi">Kode Transaksi</label>
                            </div>
                            <div class="col-sm-3 p-0 mr-3">
                                <input type="text" class="form-control" id="kodeTransaksi" name="kodeTransaksi"
                                    readonly>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-2">
                                <label for="kodeBarang">Kode Barang</label>
                            </div>
                            <div class="col-sm-3 p-0 mr-3">
                                <input type="text" class="form-control" id="kodeBarang" name="kodeBarang">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">
                                <label for="kodeType">Kode Type</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kodeType" name="kodeType"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_kodeType" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2"></div>
                            <div class="col-sm-5" style="display: flex">
                                <div class="col-4">
                                    <div class="row">
                                        <div class="col-12 px-2">
                                            <label>Primer</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="row">
                                        <div class="col-12 px-2">
                                            <label>Sekunder</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="row">
                                        <div class="col-12 px-2">
                                            <label>Tritier</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
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
                            <div class="col-sm-2">
                                <label>Stok Akhir</label>
                            </div>
                            <div class="col-sm-5" style="display: flex" id="satuan2">
                                <div class="col-4">
                                    <div class="row px-2">
                                        <div class="col-8 p-0">
                                            <input type="text" class="form-control" id="primer" name="primer"
                                                readonly>
                                        </div>
                                        <div class="col-4 p-0">
                                            <input type="text" class="form-control" id="no_primer"
                                                name="no_primer" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="row px-2">
                                        <div class="col-8 p-0">
                                            <input type="text" class="form-control" id="sekunder"
                                                name="sekunder" readonly>
                                        </div>
                                        <div class="col-4 p-0">
                                            <input type="text" class="form-control" id="no_sekunder"
                                                name="no_sekunder" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="row px-2">
                                        <div class="col-8 p-0">
                                            <input type="text" class="form-control" id="tritier" name="tritier"
                                                readonly>
                                        </div>
                                        <div class="col-4 p-0">
                                            <input type="text" class="form-control" id="no_tritier"
                                                name="no_tritier" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row pb-2">
                            <div class="col-sm-2">
                                <label for="alasan">Alasan</label>
                            </div>
                            <div class="col-sm-3 p-0">
                                <input type="text" class="form-control" id="alasan" name="alasan">
                            </div>
                            <div class="col-sm-2">
                                <label>Jumlah Dihanguskan</label>
                            </div>
                            <div class="col-sm-5" style="display: flex" id="satuan2">
                                <div class="col-4 px-2">
                                    <input type="text" class="form-control" id="primer2" name="primer2">
                                </div>
                                <div class="col-4 px-2">
                                    <input type="text" class="form-control" id="sekunder2" name="sekunder2">
                                </div>
                                <div class="col-4 px-2">
                                    <input type="text" class="form-control" id="tritier2" name="tritier2">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="text-align: right">
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

<link rel="stylesheet" href="{{ asset('css/Kencana/PenghangusanBarang.css') }}">
<script src="{{ asset('js/Kencana/PenghangusanBarang.js') }}"></script>
<link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
<script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
