@extends('layouts.appKencana')
@section('content')
@section('title', 'BKK')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance Transaksi Bank (BKK)</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <!-- Form fields go here -->
                            <div class="d-flex">
                                <div class="col-md-1">
                                    <b>Data BKK</b>
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
                                    <input type="radio" name="radiogrup1" value="radio_1" id="IntRp">
                                    <label for="IntRp">Bank Intern Rp</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="radio" name="radiogrup1" value="radio_1" id="EksRp">
                                    <label for="EksRp">Bank Ekstern Rp</label>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-md-6"></div>
                                <div class="col-md-2">
                                    <input type="radio" name="radiogrup1" value="radio_1" id="OptKecil">
                                    <label for="OptKecil">KAS Kecil</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="radio" name="radiogrup1" value="radio_1" id="IntUS">
                                    <label for="IntUS">Bank Intern $</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="radio" name="radiogrup1" value="radio_1" id="EksUS">
                                    <label for="EksUS">Bank Ekstern $</label>
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
                            <div class="d-flex">
                                <div class="col-md-1"></div>
                                <div class="col-md-10">
                                    <table style="width: 100%;" id="table_atas">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>ID. BKK</th>
                                                <th>Tanggal Buat</th>
                                                <th>Bank</th>
                                                <th>Nilai BKK</th>
                                                <th>Purchase Order</th>
                                                <th>Supplier</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-1"></div>
                            </div>

                            <br>
                            <div>
                                <b>Rincian Data BKK</b>
                                <div style="overflow-y: auto; max-height: 400px;">
                                    <table style="width: 100%;" id="table_bawah">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Id. Penagihan</th>
                                                <th>Jenis Bayar</th>
                                                <th>Rincian Bayar</th>
                                                <th>Symbol</th>
                                                <th>Nilai Rincian</th>
                                                <th>Kode Perkiraan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-11">
                                    </div>
                                    <div class="col-1">
                                        {{-- <input type="submit" id="btnKeluar" name="keluar" value="KELUAR" class="btn btn-primary d-flex ml-auto"> --}}
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
<script src="{{ asset('js/Kencana/BKK.js') }}"></script>
@endsection
