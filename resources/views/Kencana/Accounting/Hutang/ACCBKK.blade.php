@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance ACC BKK')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">ACC Pengajuan BKK</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <table class="table" id="tablepertama">
                                <thead class="table-dark">
                                    <tr>
                                        <th>Pembayaran</th>
                                        <th>Penagihan</th>
                                        <th>Bank</th>
                                        <th>Rincian Pembayaran</th>
                                        <th>Nilai Bayar</th>
                                        <th>Jenis Bayar</th>
                                        <th>Mata Uang</th>
                                        <th>Jumlah Bayar</th>
                                        <th>Kurs</th>
                                        <th>Supplier</th>
                                        <th>ID Pembayaran</th>
                                        <th>ID Mata Uang</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="idPembayaranPenagihan">ID.Pembayaran/Penagihan</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="id_pembayaran" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="id_penagihan" class="form-control"
                                            style="width: 100%">
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="rincian">Pembayaran</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="rincian" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <label for="id"></label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="id_jenisbayar" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="bank">Bank</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="bank" name="bank_select" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-1">
                                        <button class="btn" type="button" id="btn_bank">...</button>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="jenisJumlahPembayaran" style="padding-left: 50px">Jenis/Jumlah
                                            Pembayaran</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id ="jenis_pembayaran" name="jenis_pembayaran"
                                            class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-1">
                                        <button class="btn" type="button" id="btn_supplier">...</button>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="jumlah_pembayaran" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                            </div>

                            <hr style="height:2px;">
                            <b>PENAGIHAN</b>
                            <div class="row">
                                <div class="col-md-2">
                                    <label for="mataUang">Mata Uang</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="mataUang" class="form-control" style="width: 100%">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-2">
                                    <label for="nilaiPenagihan">Nilai Penagihan</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="nilaiPenagihan" class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-3">
                                    <label for="nilaiPenagihanRP" style="margin-left: 206px !important">Nilai Penagihan
                                        (RP)</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="nilaiPenagihanRP" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>

                            <br><b>PEMBAYARAN</b>
                            <br>
                            <div class="card-container" style="display: flex;">
                                <div class="card" style="width: 50%;">
                                    <p>
                                    <div style="display: flex;">
                                        <div class="col-md-4">
                                            <label for="mata_uangbawah">Mata Uang</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="mata_uangbawah" name="bankSelect"
                                                class="form-control" style="width: 100%">
                                                <input type="text" id="id_matauang" name="bankSelect"
                                                class="form-control" style="width: 100%; display: none">
                                        </div>
                                        <div class="col-md-1" style="vertical-align: middle;">
                                            <button class="btn" type="button" id="btn_supplier">...</button>
                                        </div>
                                    </div>
                                    <br>
                                    <div style="display: flex;">
                                        <div class="col-md-4">
                                            <label for="nilaiDibayarkan">Nilai Dibayarkan</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="nilaidibayarkan" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <br>
                                    <div style="display: flex;">
                                        <div class="col-md-4">
                                            <label for="nilaiKurs">Nilai Kurs</label>
                                        </div>
                                        <div class="col-md-6">
                                            <input type="number" id="nilaikurs" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <br>
                                </div>

                                <!--CARD 2-->
                                <div class="card" style="width: 50%;">
                                    <p>
                                    <div style="display: flex;">
                                        <div class="col-md-5">
                                            <label>Sudah dibayar :</label>
                                        </div>
                                    </div>
                                    <div style="display: flex;">
                                        <div class="col-md-5">
                                            <label for="mataUang" class="clickable">Mata Uang</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="mata_uangkanan" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <br>
                                    <div style="display: flex;">
                                        <div class="col-md-5">
                                            <label for="nilaiSudahDibayar" class="clickable">Nilai SUDAH
                                                dibayar</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="nilaiSudahDibayar" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <br>
                                    <div style="display: flex;">
                                        <div class="col-md-5">
                                            <label for="nilaiBelumDibayar" class="clickable">Nilai BELUM
                                                dibayar</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="nilaiBelumDibayar" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <br>
                                </div>
                            </div>
                            <p>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-11" style="padding-left: 15px">
                                        <button class="btn btn-primary" id="btn_isi" style="width: 130px">ISI</button>
                                        <button class="btn btn-success" id="btn_proses" style="width: 130px">Proses</button>
                                    </div>
                                    <div class="col-1">
                                        <button class="btn" id="btn_batal" style="width: 130px">Batal</button>
                                    </div>
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
<script src="{{ asset('js/Kencana/ACCBKK.js') }}"></script>
@endsection
