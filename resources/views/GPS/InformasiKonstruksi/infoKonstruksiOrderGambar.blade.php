@extends('layouts.appGPS')

@section('title')
    Informasi Konstruksi - Daftar Order Gambar
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #inf_kons_og_form {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .table-responsive {
            max-height: 500px;
            overflow-y: auto;
        }

        .tbl-hdr {
            font-size: 0.85rem;
            white-space: nowrap;
            cursor: pointer;
        }

        .tbl-cell {
            font-size: 0.85rem;
            white-space: nowrap;
        }

        .order-checkbox {
            vertical-align: middle;
        }

        .row-finish > td {
            color: blue !important;
        }

        .legend-box {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 6px;
            border: 1px solid #ccc;
        }

        .legend-box.finish {
            background-color: blue;
        }
    </style>

    <div class="GPS_root">
        <div id="inf_kons_og_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-info-circle me-2"></i>Informasi Konstruksi - Daftar Order Gambar
            </h4>

            <div class="row align-items-end">
                <div class="col-lg-6">
                    <div class="row mb-3">
                        <div class="col-lg-2 aligned-text">Tanggal:</div>
                        <div class="col-lg-4">
                            <input type="date" id="Date1" class="form-control" value="{{ $startDate }}">
                        </div>
                        <div class="col-lg-1 aligned-text text-center">s/d</div>
                        <div class="col-lg-4">
                            <input type="date" id="Date2" class="form-control" value="{{ $endDate }}">
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 text-end">
                    <button type="button" id="btnOK" class="btn btn-primary fw-bold px-4">OK</button>
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-3">Refresh</button>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="border p-2 rounded" style="background-color: #f8f9fa;">
                        <span class="legend-box finish"></span> Finish Total
                        <span class="ms-3 text-muted" style="font-size: 0.9rem;">
                            <i class="bi bi-info-circle me-1"></i>Klik header kolom untuk sorting.
                        </span>
                    </div>
                </div>
            </div>

            <div class="table-responsive mt-3 border rounded p-2">
                <table id="tblOrder" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th class="tbl-hdr" data-col="0">No. Order</th>
                            <th class="tbl-hdr" data-col="1">Divisi</th>
                            <th class="tbl-hdr" data-col="2">Nama Barang</th>
                            <th class="tbl-hdr" data-col="3">Nama Bagian</th>
                            <th class="tbl-hdr" data-col="4">Status Order</th>
                            <th class="tbl-hdr" data-col="5">Tgl Start</th>
                            <th class="tbl-hdr" data-col="6">Tgl Finish</th>
                            <th class="tbl-hdr" data-col="7">Total Biaya</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyOrder">
                        <tr>
                            <td colspan="8" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-3">
                <div class="col-md-12 text-end">
                    <label class="me-2 fw-bold">Total Biaya Rp.</label>
                    <input type="text" id="TTotalBiaya" class="form-control d-inline-block text-end"
                        style="width: 180px;" value="0" disabled readonly>
                    <button type="button" id="btnTotal" class="btn btn-outline-primary border border-primary fw-bold ms-2"
                        {{ !$btnTotalEnabled ? 'disabled' : '' }}>Total Biaya</button>
                </div>
            </div>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-12 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">Keluar</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.infKonsOgConfig = {
            routeGetData: "{{ route('GPS.InfoKonstruksiOrderGambar.get-data') }}",
            btnTotalEnabled: {{ $btnTotalEnabled ? 'true' : 'false' }}
        };
    </script>

    <script src="{{ asset('js/GPS/InformasiKonstruksi/infoKonstruksiOrderGambar.js') }}"></script>
@endsection
