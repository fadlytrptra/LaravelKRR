@extends('layouts.appSales') @section('content')
@section('title', 'List SJ Online Sudah ACC')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">

<style>
    .table-responsive {
        overflow-x: auto;
        width: 100%;
    }

    #table_SJ {
        min-width: 1400px;
    }

    #table_SJ td,
    #table_SJ th {
        white-space: normal !important;
        vertical-align: middle !important;
        overflow-wrap: anywhere !important;
        word-break: normal !important;
    }

    #table_SJ td {
        overflow: visible !important;
        text-overflow: clip !important;
    }

    .column-resizer {
        cursor: col-resize;
    }
</style>


<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">List Surat Jalan Online Sudah Verifikasi </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-3">
                            <label for="tanggal_mulai">Tanggal Mulai</label>
                            <input type="date"
                                id="tanggal_mulai"
                                class="form-control">
                        </div>

                        <div class="col-md-3">
                            <label for="tanggal_akhir">Tanggal Akhir</label>
                            <input type="date"
                                id="tanggal_akhir"
                                class="form-control">
                        </div>

                        <div class="col-md-3 d-flex align-items-end">
                            <button type="button"
                                    id="btnFilterTanggal"
                                    class="btn btn-primary mr-2">
                                Filter
                            </button>

                            <button type="button"
                                    id="btnResetTanggal"
                                    class="btn btn-secondary">
                                Reset
                            </button>
                        </div>
                    </div>
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
<script type="text/javascript" src="{{ asset('js/Sales/KirimSJACC.js') }}"></script>
@endsection
