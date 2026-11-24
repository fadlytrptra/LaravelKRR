@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance Informasi Bank')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance Informasi Bank untuk Uang Masuk</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <meta name="csrf-token" content="{{ csrf_token() }}">
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <input type="hidden" name="_method" id="methodkoreksi">
                        <!-- Form fields go here -->
                        <div class="d-flex">
                            <div class="col-md-2">
                                <label for="id" style="margin-right: 10px;">Tanggal</label>
                            </div>
                            <div class="col-md-3">
                                <input type="date" id="tanggal" name="tanggal" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-3">
                                <button type="button" class="btn btn-primary" id="btn_ok">OK</button>
                            </div>
                        </div>

                        <br>
                        <div>
                            <div style="overflow-x: auto;">
                                <table style="width: 200%; table-layout: fixed;" id="table_atas">
                                    <colgroup>
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                    </colgroup>
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Id. Referensi</th>
                                            <th>Nama Bank</th>
                                            <th>Mata Uang</th>
                                            <th>Nilai</th>
                                            <th>Keterangan</th>
                                            <th>Nama Customer</th>
                                            <th>Id. Bank</th>
                                            <th>Id. Mata Uang</th>
                                            <th>Tipe Transaksi</th>
                                            <th>Id. Jenis Bayar</th>
                                            <th>Jenis Pembayaran</th>
                                            <th>No Bukti</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br>
                        <div class="d-flex">
                            <div class="col-md-2">
                                <label for="id" style="margin-right: 10px;">Nama Bank</label>
                            </div>
                            <div class="col-md-5">
                                <input type="text" id="nama_bank" name="nama_bank" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-default" id="btn_bank">...</button>
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="idBank" name="idBank" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="text" id="idReferensi" name="idReferensi" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-2">
                                <label for="mataUangSelect" style="margin-right: 10px;">Mata Uang</label>
                            </div>
                            <div class="col-md-5">
                                <input type="text" id="mata_uang" name="mata_uang" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-default" id="btn_mataUang">...</button>
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="idMataUang" name="idMataUang" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-2">
                                <label for="id" style="margin-right: 10px;">Total Nilai</label>
                            </div>
                            <div class="col-md-5">
                                <input type="text" id="totalNilai" name="totalNilai" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-2">
                                <label for="id" style="margin-right: 10px;">Keterangan</label>
                            </div>
                            <div class="col-md-10">
                                <input type="text" id="keterangan" name="keterangan" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-2"></div>
                            <div class="col-md-6">
                                <input type="radio" name="radiogrup1" value="T" id="radio1">
                                <label for="radiogrup1">Transfer</label>
                            </div>
                            <div class="col-md-6">
                                <input type="radio" name="radiogrup1" value="K" id="radio2">
                                <label for="radiogrup1">Hasil Kliring</label>
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-2">
                                <label for="jenisPembayaranSelect" style="margin-right: 10px;">Jenis
                                    Pembayaran</label>
                            </div>
                            <div class="col-md-5">
                                <input type="text" id="jenis_pembayaran" name="jenis_pembayaran"
                                    class="form-control" style="width: 100%">
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-default" id="btn_jenisPembayaran">...</button>
                            </div>
                            <div class="col-md-4">
                                <input type="text" id="idJenisPembayaran" name="idJenisPembayaran"
                                    class="form-control" style="width: 100%; display: none">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-2">
                                <label for="noBukti" style="margin-right: 10px;">No. Bukti</label>
                            </div>
                            <div class="col-md-10">
                                <input type="text" id="noBukti" name="noBukti" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <p><br>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="display: flex;">
                                <div>
                                    <button type="button" class="btn btn-primary" id="btn_isi"
                                        style="width: 100px;">ISI</button>
                                </div>
                                <div style="margin-left: 5px;">
                                    <button type="button" class="btn btn-warning" id="btn_koreksi"
                                        style="width: 100px;">KOREKSI</button>
                                </div>
                                <div style="margin-left: 5px;">
                                    <button type="button" class="btn btn-danger" id="btn_hapus"
                                        style="width: 100px;">HAPUS</button>
                                </div>
                                <div style="margin-left: 5px;">
                                    <button type="button" class="btn btn-success" id="btn_proses"
                                        style="width: 100px;">PROSES</button>
                                </div>
                            </div>
                            <div>
                                <button type="button" class="btn" id="btn_batal"
                                    style="width: 100px; margin-left: 5px;">BATAL</button>
                            </div>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/MaintenanceInformasiBank.js') }}"></script>
@endsection
