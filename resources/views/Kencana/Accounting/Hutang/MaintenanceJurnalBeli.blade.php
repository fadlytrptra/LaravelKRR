@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance Jurnal Beli')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Jurnal Beli</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <!-- Form fields go here -->

                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Supplier</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="kode_supp" name="kode_supp" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="nama_supp" name="nama_supp" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-default" id="btn_supllier">...</button>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="uang_supp" name="uang_supp" class="form-control"
                                            style="width: 100%">
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Bulan/Tahun</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="bulantahun" name="bulantahun" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-default" id="btn_bulantahun">...</button>
                                    </div>
                                </div>
                                <br>
                                <div class="row align-items-center">
                                    <div class="col-md-2" style="padding-left: 15px; white-space: nowrap;">
                                        <label for="bkk">BKK</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="bkk" name="bkk" class="form-control">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-default" id="btn_bkk">...</button>
                                    </div>
                                    <div class="col-md-1">
                                        <label for="tanggal">Tanggal</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="date" id="tanggal" name="pembulatan" class="form-control">
                                    </div>
                                    <div class="col-md-2">
                                        <label for="tanggal" style="margin-left: 100px">Mata Uang Bayar</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="matauangbayar" name="pembulatan" class="form-control">
                                    </div>
                                </div>

                                <hr>
                                <div class="row">
                                    <div class="col-8"> </div>
                                    <div class="col-4 d-flex align-items-center">
                                        <span style="white-space: nowrap; padding-right: 10px">ID. Jurnal</span>
                                        <input type="text" id="id_jurnal" name="pembulatan" class="form-control"
                                            style="width: 200px">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2">
                                    <label for="id">Kode Perkiraan</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="kode_perkiraan" name="kode_perkiraan1"
                                        class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="ketKode_perkiraan" name="kode_perkiraan2"
                                        class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default"
                                        id="btn_kodeperkiraan">...</button>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-2">
                                    <label for="id">Mata Uang</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="mata_uang" name="mata_uang" class="form-control"
                                        style="width: 100%">
                                    <input type="text" id="id_uang" name="id_uang" class="form-control"
                                        style="width: 100%; display: none">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_matauang">...</button>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <p>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label for="id">Tagihan:</label>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="id">Hutang</label>
                                            <input type="text" id="hutang" name="tagihan"
                                                class="form-control">
                                            <br>
                                            <input class="form-check-input" type="checkbox" id="checkbox"
                                                value="option1" style="margin-left: 2px">
                                            <label class="form-check-label" for="checkbox"
                                                style="margin-left: 20px">Koreksi Pembelian</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <p>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label for="id">Pelunasan</label>
                                            <input type="text" id="pelunasan" name="pelunasan"
                                                class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p>
                            <div class="row align-items-center">
                                <div class="col-md-2">
                                    <label for="matauang">Keterangan</label>
                                </div>
                                <div class="col-md-5">
                                    <input type="text" id="keterangan" name="keterangan" class="form-control">
                                </div>
                            </div>

                            <hr style="height:2px;">
                            <table class="table" id="table_jurnal">
                                <thead class="table-dark">
                                    <tr>
                                        <th>Id Jurnal</th>
                                        <th>Kd. Perkiraan</th>
                                        <th>MataUang</th>
                                        <th>Nilai Debet</th>
                                        <th>Nilai Kredit</th>
                                        <th>Keterangan</th>
                                        <th>ID Jurnal real</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>

                            <hr style="height:2px;">
                            <div class="mb-3 d-flex justify-content-between">
                                <button class="btn btn-primary" id="btn_isi" style="width: 130px">Isi</button>
                                <button class="btn btn-warning" id="btn_koreksi"
                                    style="width: 130px; display: none">Koreksi</button>
                                <button class="btn btn-danger" id="btn_hapus" style="width: 130px">Hapus</button>
                                <button class="btn btn-success" id="btn_proses" style="width: 130px">Proses</button>
                                <button class="btn" id="btn_batal"
                                    style="width: 130px; margin-left: auto;">Batal</button>
                            </div>
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
<script src="{{ asset('js/Kencana/MaintenanceJurnal.js') }}"></script>
@endsection
