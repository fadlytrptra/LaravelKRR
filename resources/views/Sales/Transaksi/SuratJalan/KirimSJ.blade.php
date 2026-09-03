@extends('layouts.appSales') @section('content')
@section('title', 'Kirim SJ ke Customer')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">

<style>
    .table-responsive {
        width: 100%;
        overflow-x: auto;
    }

    #table_SJ {
        min-width: 1400px !important;
    }

    #table_SJ th,
    #table_SJ td {
        white-space: normal !important;
        vertical-align: middle !important;
        overflow-wrap: anywhere !important;
        word-break: normal !important;
    }

    #table_SJ td {
        overflow: visible !important;
        text-overflow: clip !important;
    }

    .dataTables_scrollHead th {
        position: relative;
        white-space: normal !important;
        vertical-align: middle !important;
    }

    .column-resizer {
        position: absolute;
        top: 0;
        right: -3px;
        width: 7px;
        height: 100%;
        cursor: col-resize;
        z-index: 100;
    }

    .column-resizer:hover {
        background: rgba(0, 123, 255, 0.35);
    }

    body.resizing-column {
        cursor: col-resize !important;
        user-select: none !important;
    }

    body.resizing-column * {
        cursor: col-resize !important;
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">List Surat Jalan untuk Kirim ke Customer </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="table_SJ" class="table table-bordered table-striped">
                            <thead class="thead-light">
                                <tr>
                                    <th>Tanggal SJ</th>
                                    <th>Nomor SJ</th>
                                    <th>Customer</th>
                                    <th>Nomor SP</th>
                                    <th>Nomor PO</th>
                                    <th>Nama Type</th>
                                    <th>Jumlah</th>
                                    <th>Alamat Kirim</th>
                                    <th>Pengirim</th>
                                    <th>Plat Nomor Kendaraan</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/colresizable/colResizable-1.6.min.js"></script>
<script type="text/javascript" src="{{ asset('js/Sales/KirimSJ.js') }}"></script>
@endsection
