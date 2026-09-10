@extends('Circular.layouts.app')
@section('content')
@section('title', 'Transfer Hasil Meter')
{{-- <div class="card mb-3">
        <div class="card-header">
            Maintenance Order
        </div> --}}
<style>
    #table_atas tbody td,
    #table_atas thead th {
        padding: 4px 6px !important;
        /* kecilin padding */
        font-size: 12px !important;
        /* kecilin tulisan */
    }

    #table_atas input[type="checkbox"] {
        transform: scale(0.8);
        /* kecilin checkbox */
    }

    #table_atas {
        width: 100% !important;
        table-layout: fixed;
        /* 🔑 ini yang bikin lurus */
    }

    .dataTables_scrollHeadInner,
    .dataTables_scrollHeadInner table {
        width: 100% !important;
    }

    .dataTables_scrollBody table {
        width: 100% !important;
    }

    #table_bawah tbody td,
    #table_bawah thead th {
        padding: 4px 6px !important;
        /* kecilin padding */
        font-size: 12px !important;
        /* kecilin tulisan */
    }

    /* #table_bawah input[type="checkbox"] {
        transform: scale(0.8);
    } */

    #table_bawah {
        width: 100% !important;
        table-layout: fixed;
        /* 🔑 ini yang bikin lurus */
    }

    .dataTables_scrollHeadInner,
    .dataTables_scrollHeadInner table {
        width: 100% !important;
    }

    .dataTables_scrollBody table {
        width: 100% !important;
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Transfer Hasil Meter</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        @csrf
                        {{-- <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="tanggal" class="form-label">Tanggal</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="date" class="form-control" id="tanggal" name="tanggal">
                                </div>
                                <div class="col-sm-1">
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="shift" class="form-label">Shift</label>
                                </div>
                                <div class="col-sm-2">
                                    <select class="form-control" id="shift" name="shift">
                                        <option value="">Pilih Shift ▼</option>
                                        <option value="P">P</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="nama_mesin" class="form-label">Nama Mesin</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="nama_mesin" name="nama_mesin">
                                </div>
                            </div> --}}
                        <div class="row pb-2">
                            <div class="col-sm-2">
                                <label for="nama_mesin" class="form-label" style="font-weight: bold">Hasil Meter</label>
                            </div>
                        </div>
                        <table class="table" id="table_atas">
                            <thead class="table-dark">
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Id Log</th>
                                    <th>Id Order</th>
                                    <th>Id Mesin</th>
                                    <th>Nama Mesin</th>
                                    <th>Nama Order</th>
                                    <th>Meter</th>
                                    <th>Id Log Awal</th>
                                    <th>Index</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <table class="table" id="table_bawah">
                            <thead class="table-dark">
                                <tr>
                                    <th>Id Log</th>
                                    <th>Tanggal</th>
                                    <th>Shift</th>
                                    <th>Status Log</th>
                                    <th>Counter Awal</th>
                                    <th>Counter Akhir</th>
                                    <th>Jam Awal</th>
                                    <th>Jam Akhir</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <div class="row pb-2">
                            <div class="col-sm-4">
                                <button class="btn btn-primary" id="btn_refresh">Refresh</button>
                            </div>
                            <div class="col" style="text-align: center;">
                                <button class="btn btn-success" id="btn_proses">Proses</button>
                            </div>
                            <div class="col" style="text-align: right;">
                                <button class="btn btn-danger" id="btn_batal">Batal</button>
                            </div>
                        </div>
                        <br>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('custom_js')
@include('circular.transaksi.modalTransferHasilMeter')
<script src="{{ asset('js/Circular/transaksi/TransferHasilMeter.js') }}"></script>
@endsection
