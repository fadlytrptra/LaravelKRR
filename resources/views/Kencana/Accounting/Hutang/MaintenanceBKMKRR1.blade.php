@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance BKM KRR1')

<style>
    .custom-modal-width {
        max-width: 65%;
        /* Adjust the percentage as needed */
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance Bukti Kas Masuk Tunai</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <!-- Form fields go here -->
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Id. BKM</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="id_bkm" class="form-control" style="width: 100%"
                                            id="id_bkm">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Tanggal Input</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="date" name="tanggal_input" class="form-control"
                                            style="width: 100%" id="tanggal_input">
                                    </div>
                                    <div class="col-md-1">
                                        <label for="id" style="color: blue;">Wajib Di-Enter</label>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Diterima Dari</label>
                                    </div>
                                    <div class="col-md-5">
                                        <input type="text" name="diterima_dari" class="form-control"
                                            style="width: 100%" id="diterima_dari">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Mata Uang</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="mata_uang" class="form-control" style="width: 100%"
                                            id="mata_uang">
                                        <input type="text" name="kode_matauang" class="form-control"
                                            style="width: 100%; display: none" id="kode_matauang">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-default" id="btn_matauang">...</button>
                                    </div>
                                    <div style="padding-left: 50px">
                                        <label for="id">Kurs Rupiah</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="kurs_rupiah" class="form-control"
                                            style="width: 100%" id="kurs_rupiah">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Jumlah Uang</label>
                                    </div>
                                    <div class="col-md-5">
                                        <input type="text" name="jumlah_uang" class="form-control"
                                            style="width: 100%" id="jumlah_uang">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Bank</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="nama_bank" class="form-control" style="width: 100%"
                                            id="nama_bank">
                                        <input type="text" name="id_bank" class="form-control"
                                            style="width: 100%; display: none" id="id_bank">
                                        <input type="text" name="jenis_bank" class="form-control"
                                            style="width: 100%; display: none" id="jenis_bank">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-default" id="btn_bank">...</button>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Jenis Pembayaran</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="jenis_pembayaran" class="form-control"
                                            style="width: 100%" id="jenis_pembayaran">
                                        <input type="text" name="id_jnsPem" class="form-control"
                                            style="width: 100%; display: none" id="id_jnsPem">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-default"
                                            id="btn_jenispembayaran">...</button>
                                    </div>
                                    <button type="button" class="btn" id="btn_tambahbiaya">Tambah Biaya</button>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Kode Perkiraan</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" name="kode_kira" class="form-control"
                                            style="width: 100%" id="kode_kira">
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" name="keterangan_kira" class="form-control"
                                            style="width: 100%" id="keterangan_kira">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-default"
                                            id="btn_kodeperkiraan">...</button>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">No. Bukti</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" name="no_bukti" class="form-control"
                                            style="width: 100%" id="no_bukti">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Uraian</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" name="uraian" class="form-control"
                                            style="width: 100%" id="uraian">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-2" style="padding-left: 15px">
                                        <button type="button" class="btn btn-primary" id="btn_tambahdata"
                                            style="width: 130px;">Tambah Data</button>
                                    </div>
                                    <div class="col-7" style="padding-left: 15px">
                                        <button type="button" class="btn btn-success" id="btn_proses"
                                            style="width: 130px;">PROSES</button>
                                    </div>
                                    <div class="col-1" style="padding-left: 15px">
                                        <button type="button" class="btn" id="btn_batal"
                                            style="width: 100px;">Batal</button>
                                    </div>
                                    <div class="col-1" style="padding-left: 15px">
                                        <button type="button" class="btn btn-warning" id="btn_koreksi"
                                            style="width: 100px;">Koreksi</button>
                                    </div>
                                    <div class="col-1">
                                        <button type="button" class="btn btn-danger" id="btn_hapus"
                                            style="width: 100px;">Hapus</button>
                                    </div>
                                </div>
                            </div>

                            <div class="card-container" style="display: flex;">
                                <div class="card" style="width: 60%;">
                                    <div class="card-body">
                                        <b>Detail Data</b>
                                        <div style="overflow-x: auto;">
                                            <table style="width: 180%;" id="table_kiri">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Id. Detail</th>
                                                        <th>Terima Dari</th>
                                                        <th>Jumlah Uang</th>
                                                        <th>Kode Perkiraan</th>
                                                        <th>Uraian</th>
                                                        <th>Jenis Pembayaran</th>
                                                        <th>No. Bukti</th>
                                                        <th>Nama Pembayaran</th>
                                                        <th>Nama Perkiraan</th>
                                                        <th>Kurs</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>


                                <!--CARD 2-->
                                <div class="card" style="width: 40%;">
                                    <div class="card-body">
                                        <b>Detail Biaya</b>
                                        <div style="overflow-x: auto;">
                                            <table style="width: 150%;" id="table_kanan">
                                                <thead class="table-dark">
                                                    <tr>
                                                        {{-- <th style="display: none">Id. Biaya</th> --}}
                                                        <th>Keterangan</th>
                                                        <th>Biaya</th>
                                                        <th>Kode Perkiraan</th>
                                                        <th>Id. Detail</th>
                                                        <th>Nama Perkiraan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-2">
                                        <b><label for="id">Total Pelunasan Rp.</label></b>
                                    </div>
                                    <div class="col-md-2">
                                        <input id="total_pelunasan" type="text" name="total_pelunasan" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-2"></div>
                                    <div class="col-md-2">
                                        <button type="button" class="btn" id="btn_tampilbkk"
                                            style="width: 130px;">Tampil BKM</button>
                                    </div>
                                    <div class="col-md-1">
                                        {{-- <input type="submit" name="tutup" value="TUTUP" class="btn btn-primary d-flex ml-auto"> --}}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Tampil BKK-->
<div class="modal fade" id="ModalTambah" tabindex="-1" aria-labelledby="dataBKKModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="dataBKKModalLabel">Tambah Biaya</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" id="close_modal">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row mb-3">
                    <div class="col-8 d-flex align-items-center">
                        <label for="bkk" class="col-form-label me-2" style="width: 100px;">Jumlah
                            Biaya:</label>
                        <input type="text" id="jumlah_biayaMBiaya" class="form-control" style="flex: 1;">
                    </div>
                    <div class="col-4 d-flex align-items-center">
                        <label for="idDetail" class="col-form-label me-2" style="width: 80px;">Id.
                            Detail:</label>
                        <input type="text" id="idDetail_MBiaya" class="form-control" style="width: 60px;">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col d-flex align-items-center">
                        <label for="kodePerkiraan" class="col-form-label me-2" style="width: 100px;">Kode Perkiraan:</label>
                        <!-- Input pertama yang lebih sempit -->
                        <input type="text" id="kodePerkiraan1" class="form-control me-2" style="flex: 0.3;">
                        <!-- Input kedua yang lebih lebar -->
                        <input type="text" id="kodePerkiraan2" class="form-control me-2" style="flex: 1.7;">
                        <button type="button" class="btn btn-default" id="btn_kodeperkiraanMBiaya">...</button>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col d-flex align-items-center">
                        <label for="keterangan" class="col-form-label me-2" style="width: 100px;">Keterangan:</label>
                        <input type="text" id="keterangan_MBiaya" class="form-control" style="flex: 1;">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btn_prosesMBiaya" type="button" class="btn btn-success">Proses</button>
                <button id="btn_prosesbkk" type="button" class="btn btn-success"
                    style="display: none">Proses</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    id="tutup_modal">Tutup</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Tampil BKK-->
<div class="modal fade" id="dataBKKModal" tabindex="-1" aria-labelledby="dataBKKModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-modal-width">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="dataBKKModalLabel">Data BKM</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" id="close_modalbkm">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-inline">
                    <label for="month">Bln/Thn:&nbsp;</label>
                    <input type="date" id="tgl_awalbkk" class="form-control" style="width: 160px">
                    <span>&nbsp;S/D&nbsp;</span>
                    <input type="date" id="tgl_akhirbkk" class="form-control" style="width: 160px">
                    <span>&nbsp;&nbsp;</span>
                    <button id="btn_okbkm" type="button" class="btn btn-primary">OK</button>
                </div>
                <div class="form-group mt-3">
                    <label for="bkm">Id. BKM:</label>
                    <input type="text" id="bkm" class="form-control">
                    <input type="text" id="terbilang" class="form-control" style="display: none">
                    <input type="text" id="id_matauang" class="form-control" style="display: none">
                </div>
                <div class="table-responsive">
                    <table id="tabletampilBKM">
                        <thead class="table-dark">
                            <tr>
                                <th>Tanggal Input</th>
                                <th>Id. BKM</th>
                                <th>Nilai Pelunasan</th>
                                <th>Terbilang</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btn_cetakbkm" type="button" class="btn btn-success">Cetak</button>
                <button id="btn_prosesbkm" type="button" class="btn btn-success"
                    style="display: none">Proses</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="tutup_modalbkk">Tutup</button>
            </div>
        </div>
    </div>
</div>
@include('Kencana.Accounting.Hutang.PrintTampilBKMKRR1')
<script src="{{ asset('js/Kencana/MaintenanceBKMKRR1.js') }}"></script>
@endsection
