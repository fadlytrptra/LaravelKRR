@extends('layouts.appKencana')
@section('content')
@section('title', 'Pengajuan BKK')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">BKK2 - Pengajuan</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <!-- Form fields go here -->

                            <div class="radio-container">
                                <div style="float: left;">
                                    <input type="radio" name="radiogrup_penagihan" value="radio_penagihan"
                                        id="radiogrup_penagihan">
                                    <label for="radiogrup_penagihan">Penagihan</label>
                                    <label style="visibility: hidden">AAAAA</label>
                                </div>
                                <div style="display: inline-block; margin: 0 auto;">
                                    <input type="radio" name="radiogrup_penagihan" value="radio_nopenagihan"
                                        id="radiogrup_nopenagihan">
                                    <label for="radiogrup_nopenagihan">No Penagihan</label>
                                </div>
                            </div>

                            <div class="card" style="padding-left: 20px;">
                                <p>
                                <div>
                                    Data Penagihan
                                </div>
                                <p>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Supplier</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input id="supplier1" type="text" name="supplier1" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-3">
                                        <input id="supplier2" type="text" name="supplier2" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-1">
                                        <button class="btn" type="button" id="btn_supplier">...</button>
                                    </div>
                                </div>
                                <p>
                            </div>
                            <br>
                            <table class="table" id="tablebkkpertama">
                                <thead class="table-dark">
                                    <tr>
                                        <th>Pembayaran</th>
                                        <th>Penagihan</th>
                                        <th>Bank</th>
                                        <th>Rincian Pembayaran</th>
                                        <th>Nilai Bayar</th>
                                        <th>Jenis Bayar</th>
                                        <th>Mata Uang</th>
                                        <th>Jumlah Jenis Bayar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <table class="table" id="tablebkkpenagihan" style="width: 100%;">
                                <thead class="table-dark">
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>ID. Penagihan</th>
                                        <th>Sts. Pajak</th>
                                        <th>Mata Uang</th>
                                        <th>Nilai TT</th>
                                        <th>Lunas</th>
                                        <th>IdUangTT</th>
                                        <th>ID. Pembayaran</th>
                                        <th style="display: none">Kurs</th>
                                        {{-- <th>TT_NoLunas</th>
                                        <th>isRed</th> --}}
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>

                            <div class="radio-container">
                                <div class="d-flex align-items-center" style="margin-right: 10px;">
                                    <label for="penagihan">PENAGIHAN&nbsp;&nbsp;</label>
                                    <input type="radio" name="radiogrup" value="ada_dp" id="radiogrup_adadp"
                                        style="margin-bottom: 8px">
                                    <label for="radiogrup_adadp">&nbsp;ADA DP&nbsp;&nbsp;</label>
                                    <input type="radio" name="radiogrup" value="tidak_dp" id="radiogrup_tidakdp"
                                        style="margin-bottom: 8px">
                                    <label for="radiogrup_tidakdp">&nbsp;TIDAK ADA DP</label>
                                    <label style="visibility: hidden">AAAAAAAAAAAAAAAAAAA</label>
                                    <label for="supplierSelect">BKK Uang Muka&nbsp;&nbsp;</label>
                                    <input id="bkk_uangmuka" type="text" name="bkk_uangmuka"
                                        class="form-control me-2" style="width: 200px;">
                                    <input id="id_bkk" type="text" name="id_bkk" class="form-control me-2"
                                        style="width: 200px; display: none">
                                    <input id="rincian_bkk" type="text" name="rincian_bkk" class="form-control me-2"
                                        style="width: 200px; display: none">
                                    <input id="id_bayardp" type="text" name="id_bayardp" class="form-control me-2"
                                        style="width: 200px; display: none">
                                    <button class="btn" type="button" id="btn_bkkuangmuka">...</button>
                                </div>
                                <div class="d-flex align-items-center" style="margin-right: 10px;">
                                    <label id="label_pajak" for="pajak">Pajak&nbsp;&nbsp;</label>
                                    <input type="text" id="pajak" name="pajak" class="form-control"
                                        style="width: 400px; margin-left: 98px">
                                    <input type="text" id="rincian_dp" name="rincian_dp" class="form-control"
                                        style="width: 400px; margin-left: 98px; visibility: hidden">
                                </div>
                                <br>
                                <div class="d-flex align-items-center" style="margin-right: 10px;">
                                    <label for="rincian">Rincian Pembayaran&nbsp;&nbsp;</label>
                                    <input type="text" id="rincian" name="rincian" class="form-control"
                                        style="width: 400px">
                                </div>
                            </div>
                            <br>
                            <div class="card">
                                <div class="card-container" style="display: flex;">
                                    <div class="card" style="width: 50%;gap: 5px;">
                                        <p>
                                        <div style="display: flex;display: none;">
                                            <div class="col-md-3">
                                                <label id="bkm" for="bkm">BKM</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input id="ada_bkm" type="text" name="ada_bkm"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-3">
                                                <label for="id">Bank</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input id="id_bank" type="text" name="id_bank"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-1" style="vertical-align: middle;">
                                                <button class="btn" type="button" id="btn_bank">...</button>
                                            </div>
                                            <div style="display: flex; padding-left: 20px">
                                                <div class="col-md-2">
                                                    <label for="id">Kurs</label>
                                                </div>
                                                <div class="col-md-6" style="margin-left: 10px;">
                                                    <input id="kurs" type="number" name="kurs"
                                                        class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-3">
                                                <label for="id">Jenis Pembayaran</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input id="jns_pembayaran" type="text" name="jns_pembayaran"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-1" style="vertical-align: middle;">
                                                <button class="btn" type="button"
                                                    id="btn_jenispembayaran">...</button>
                                            </div>
                                            <div style="display: flex; padding-left: 20px">
                                                <div class="col-md-2">
                                                    <label for="id">Jumlah</label>
                                                </div>
                                                <div class="col-md-6" style="margin-left: 8px;">
                                                    <input id="jumlah_bayar" type="number" name="jumlah_bayar"
                                                        class="form-control" style="width: 94%">
                                                </div>
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-3">
                                                <label for="id">Mata Uang</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input id="mata_uang" type="text" name="mata_uang"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-1" style="vertical-align: middle;">
                                                <button class="btn" type="button" id="btn_matauang">...</button>
                                            </div>
                                            <div style="display: flex; padding-left: 20px">
                                                <div class="col-md-6" style="margin-left: 8px;">
                                                    <input id="id_jnsbayar" type="number" name="id_jnsbayar"
                                                        class="form-control" style="width: 145%">
                                                </div>
                                                <div class="col-md-6">
                                                    <input id="mata_uang_kanan" type="number" name="mata_uang_kanan"
                                                        class="form-control" style="width: 145%">
                                                </div>
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-3">
                                                <label for="id">Kode Perkiraan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input id="kode_perkiraanNomor" type="text"
                                                    name="kode_perkiraanNomor" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                            <div class="col-md-6">
                                                <input id="kode_perkiraanNama" type="text"
                                                    name="kode_perkiraanNama" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                            <div class="col-md-1" style="vertical-align: middle;">
                                                <button class="btn" type="button"
                                                    id="btn_kodePerkiraan">...</button>
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-3">
                                                <label for="id">Nilai Pembayaran</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input id="nilai_pembayaran" type="text" name="nilai_pembayaran"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div style="display: flex; padding-left: 20px">
                                                <div class="col-md-2">
                                                    <label for="id" style="visibility: hidden">Jumlah</label>
                                                </div>
                                                <div class="col-md-6" style="margin-left: 8px;">
                                                    <input id="nilai_pembayaran_kanan" type="number"
                                                        name="nilai_pembayaran_kanan" class="form-control"
                                                        style="width: 94%; margin-left: 20px">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!--CARD 2-->
                                    <div class="card" style="width: 50%;">
                                        <p>
                                        <div style="display: flex;">
                                            <div class="col-md-5">
                                                <label for="id">ID. Pembayaran</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input id="id_pembayaran" type="text" name="id_pembayaran"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-5">
                                                <label for="id">Pembayaran Sebelumnya</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" name="supplierSelect" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-5">
                                                <label for="id">Nilai Pembayaran</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input id="nilai_pembayaran2" type="text" name="nilai_pembayaran2"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-5">
                                                <label for="id">Belum Dibayar</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input id="belum_dibayar" type="text" name="belum_dibayar"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-5">
                                                <label for="id">Saldo</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input id="saldo" type="text" name="saldo"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p>
                            <div class="mb-3 d-flex justify-content-between">
                                <button class="btn btn-primary" id="btn_isi" style="width: 130px">Isi</button>
                                <button class="btn btn-warning" id="btn_koreksi"
                                    style="width: 130px">Koreksi</button>
                                <button class="btn btn-danger" id="btn_hapus" style="width: 130px">Hapus</button>
                                <button class="btn btn-success" id="btn_proses" style="width: 130px">Proses</button>
                                <button class="btn" id="btn_batal"
                                    style="width: 130px; margin-left: auto;">Batal</button>
                            </div>
                        </form>
                        <br>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/PengajuanBKK.js') }}"></script>
@endsection
