@extends('layouts.appKencana')
@section('content')
@section('title', 'List Detail Transaksi')
    <div class="container-fluid">
        <label class="ml-3"><strong>List Detail Transaksi</strong></label>
        <!-- General Data -->
        <div class="row" style="margin-top: 0.5%">
            <div class="col-sm-1">
                <label>Id Type</label>
            </div>
            <div class="col-sm-3">
                <input type="text" id="idType" class="form-control" readonly>
            </div>
        </div>

        <div class="row" style="margin-top: 0.5%">
            <div class="col-sm-1">
                <label>Nama Type</label>
            </div>
            <div class="col-sm-5">
                <input type="text" id="namaType" class="form-control" readonly>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-1 mt-2 mb-2">
                <label>Saldo Akhir</label>
            </div>

            <div class="col-sm-2 mt-2">
                <div class="input-group">
                    <input type="text" id="saldoPrimer" class="form-control"
                        readonly>
                </div>
            </div>

            <div class="col-sm-1 mt-2">
                <div class="input-group">
                    <input type="text" id="satPrimer" class="form-control" readonly>
                </div>
            </div>

            <div class="col-sm-2 mt-2">
                <div class="input-group">
                    <input type="text" id="saldoSekunder" class="form-control"
                        readonly>
                </div>
            </div>

            <div class="col-sm-1 mt-2">
                <div class="input-group">
                    <input type="text" id="satSekunder" class="form-control" readonly>
                </div>
            </div>

            <div class="col-sm-2 mt-2">
                <div class="input-group">
                    <input type="text" id="saldoTritier" class="form-control"
                        readonly>
                </div>
            </div>

            <div class="col-sm-1 mt-2">
                <div class="input-group">
                    <input type="text" id="satTritier" class="form-control" readonly>
                </div>
            </div>
        </div>

        <div class="row" style="margin-top: 0%">
            <label class="col-sm-1 col-form-label">Tanggal</label>
            <div class="col-sm-2">
                <input type="date" class="form-control" id="tanggalAwal">
            </div>
            s/d
            <div class="col-sm-2">
                <input type="date" class="form-control" id="tanggalAkhir">
            </div>
            <div class="col-sm-1">
                <button type="button" id="btn_cari" class="btn btn-info">Cari</button>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-3">
                <span id="aturanKonversi">Aturan Konversi:</span>
            </div>
            <div class="col-sm-3">
                <span id="aturanPrimerSekunder">Primer Ke Sekunder:</span>
            </div>
            <div class="col-sm-3">
                <span id="aturanSekunderTritier">Sekunder Ke Tritier:</span>
            </div>
        </div>

        <div class="row" style="margin-top: 0.5%; font-size: 13px;">
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

    </div>
    <link rel="stylesheet" href="{{ asset('css/Kencana/ListDetailTransaksi.css') }}">
    <script src="{{ asset('js/Kencana/ListDetailTransaksi.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
