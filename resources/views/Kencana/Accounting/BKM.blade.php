@extends('layouts.appKencana')
@section('content')
@section('title', 'BKM')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance Transaksi Bank BKM</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <!-- Form fields go here -->
                            <div class="d-flex">
                                <div class="col-md-1">
                                </div>
                                <div class="col-md-1">
                                    <label for="bulan" style="margin-right: 10px;">Bulan</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="bulan" class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <label for="tahun" style="margin-right: 10px;">Tahun</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="tahun" class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-1"></div>
                                <div class="col-md-2">
                                    <input type="radio" name="radiogrup1" value="radio_1" id="OptBesar">
                                    <label for="OptBesar">KAS Besar</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="radio" name="radiogrup1" value="radio_1" id="EksRp">
                                    <label for="EksRp">Bank Ekstern Rp</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="radio" name="radiogrup1" value="radio_1" id="IntRp">
                                    <label for="IntRp">Bank Intern Rp</label>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-md-6"></div>
                                <div class="col-md-2">
                                    <input type="radio" name="radiogrup1" value="radio_1" id="OptKecil">
                                    <label for="OptKecil">KAS Kecil</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="radio" name="radiogrup1" value="radio_1" id="EksUS">
                                    <label for="EksUS">Bank Ekstern $</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="radio" name="radiogrup1" value="radio_1" id="IntUS">
                                    <label for="IntUS">Bank Intern $</label>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-md-1"></div>
                                <div class="col-md-1">
                                    <label for="namaBank" style="margin-right: 10px;">Nama Bank</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" name="nama_bank" class="form-control" id="nama_bank">
                                </div>
                                <div class="col-md-2">
                                    <button type="button" class="btn btn" id="btn_bank">...</button>
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-primary" id="btn_ok"
                                        style="width: 100px">OK</button>
                                </div>
                                <div class="col-md-2">
                                    <button type="button" class="btn btn-success" id="btn_proses"
                                        style="width: 200px">PROSES</button>
                                </div>
                            </div>

                            <br>
                            <div>
                                <b>Data BKM</b>
                                <div style="overflow-y: auto;">
                                    <table style="width: 100%;" id="table_bkm">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Tanggal Input</th>
                                                <th>Id. BKM</th>
                                                <th>Nilai Pelunasan</th>
                                                <th>Mata Uang</th>
                                                <th>Bank</th>
                                                <th>Jenis Bayar</th>
                                                <th>Id. Bayar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <!--CARD 1-->
                            <br>
                            <div class="card-container" style="display: flex;">
                                <div class="card" style="width: 34%;">
                                    <div class="card-body">
                                        <div class="col-md-6">
                                            <b>Rincian Pelunasan</b>
                                        </div>
                                        <div style="overflow-x: auto; overflow-y: auto;">
                                            <table style="width: 100%; table-layout: fixed;" id="table_rp">
                                                <colgroup>
                                                    <col style="width: 40%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                </colgroup>
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Ket. Pelunasan</th>
                                                        <th>Nilai Rincian</th>
                                                        <th>Kode Perkiraan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <!--CARD 2-->
                                <div class="card" style="width: 33%; overflow-y: auto;">
                                    <div class="card-body">
                                        <div class="col-md-6">
                                            <b>Rincian Biaya</b>
                                        </div>
                                        <div style="overflow-x: auto;">
                                            <table style="width: 100%; table-layout: fixed;" id="table_rb">
                                                <colgroup>
                                                    <col style="width: 40%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                </colgroup>
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Keterangan</th>
                                                        <th>Jumlah Biaya</th>
                                                        <th>Kode Perkiraan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <!--CARD 3-->
                                <div class="card" style="width: 33%; overflow-y: auto; ">
                                    <div class="card-body">
                                        <div class="col-md-7">
                                            <b>Rincian Kurang/Lebih</b>
                                        </div>
                                        <div style="overflow-x: auto;">
                                            <table style="width: 100%; table-layout: fixed;" id="table_rk">
                                                <colgroup>
                                                    <col style="width: 40%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                </colgroup>
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Keterangan</th>
                                                        <th>Jumlah</th>
                                                        <th>Kode Perkiraan</th>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/BKM.js') }}"></script>
@endsection
