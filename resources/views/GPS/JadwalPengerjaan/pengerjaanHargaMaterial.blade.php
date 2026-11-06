@extends('layouts.appGPS')

@section('title')
    Harga Material
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #pkj_harga_mtr_form {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        #tblMaterial {
            white-space: nowrap !important;
        }

        .table-responsive {
            max-height: 500px;
            overflow: auto;
        }

        .table-scroll-x {
            overflow-x: auto;
            overflow-y: auto;
        }

        .table-scroll-x table {
            min-width: 1700px;
        }

        .row-bekas>td {
            color: dodgerblue !important;
        }

        .legend-box {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 6px;
            border: 1px solid #ccc;
        }

        .legend-box.baru {
            background-color: white;
        }

        .legend-box.bekas {
            background-color: dodgerblue;
        }

        .text-end {
            text-align: right;
        }

        .tbl-hdr {
            font-size: 0.85rem;
            white-space: nowrap !important;
        }

        .tbl-cell {
            font-size: 0.85rem;
            white-space: nowrap !important;
        }
    </style>

    <div class="GPS_root">
        <div id="pkj_harga_mtr_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-cash-coin me-2"></i>Harga Material
            </h4>

            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="row mb-3">
                        <div class="col-lg-2">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="jenisOd" id="OptHarian" value="H"
                                    checked>
                                <label class="form-check-label" for="OptHarian">Harian</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="jenisOd" id="OptProyek" value="P">
                                <label class="form-check-label" for="OptProyek">Proyek</label>
                            </div>
                        </div>
                        <div class="col-lg-2 aligned-text">Tanggal:</div>
                        <div class="col-lg-3">
                            <input type="date" id="Date1" class="form-control" value="{{ $startDate }}">
                        </div>
                        <div class="col-lg-1 aligned-text text-center">s/d</div>
                        <div class="col-lg-3">
                            <input type="date" id="Date2" class="form-control" value="{{ $endDate }}">
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 text-end">
                    <button type="button" id="btnOK" class="btn btn-primary fw-bold px-4">OK</button>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="border p-2 rounded" style="background-color: #f8f9fa;">
                        <span class="legend-box baru"></span> Baru
                        <span class="legend-box bekas" style="margin-left: 20px;"></span> Bekas
                        <span class="ms-3 text-muted" style="font-size: 0.9rem;">
                            <i class="bi bi-info-circle me-1"></i>Pilih 1 item yang sudah memiliki Kd. Barang Material untuk
                            diproses harganya.
                        </span>
                    </div>
                </div>
            </div>

            <div class="table-responsive table-scroll-x mt-3 border rounded p-2">
                <table id="tblMaterial" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th class="tbl-hdr">No.Order</th>
                            <th class="tbl-hdr">Divisi</th>
                            <th class="tbl-hdr">Nama Barang</th>
                            <th class="tbl-hdr">Kd. Barang</th>
                            <th class="tbl-hdr">No. Gambar</th>
                            <th class="tbl-hdr">Jml Order</th>
                            <th class="tbl-hdr">Tgl Start</th>
                            <th class="tbl-hdr">Nama Bagian</th>
                            <th class="tbl-hdr">Type Material</th>
                            <th class="tbl-hdr">Spek Material</th>
                            <th class="tbl-hdr">Kd. Brg Material</th>
                            <th class="tbl-hdr">Jml Material</th>
                            <th class="tbl-hdr">Harga Baru / Satuan</th>
                            <th class="tbl-hdr">Total Harga Baru</th>
                            <th class="tbl-hdr">Harga Bekas / Satuan</th>
                            <th class="tbl-hdr">Total Harga Bekas</th>
                            <th class="tbl-hdr">Acc Spv</th>
                            <th class="tbl-hdr">Tgl Bon</th>
                            <!-- Hidden -->
                            <th style="display:none;">IdBagian</th>
                            <th style="display:none;">Nomer</th>
                            <th style="display:none;">JmlMaterialRaw</th>
                            <th style="display:none;">SatuanMtr</th>
                            <th style="display:none;">HargaBaruRaw</th>
                            <th style="display:none;">HargaBekasRaw</th>
                            <th style="display:none;">NoSat</th>
                            <th style="display:none;">Status</th>
                            <th style="display:none;">statusWarna</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyMaterial">
                        <tr>
                            <td colspan="27" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-6">
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-3 me-1">Refresh</button>
                    <button type="button" id="btnProses" class="btn btn-success fw-bold px-4">PROSES</button>
                </div>
                <div class="col-md-6 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">Keluar</button>
                </div>
            </div>

        </div>
    </div>

    @include('GPS.JadwalPengerjaan.modalHargaMaterial')

    <script>
        window.pkjHargaMtrConfig = {
            routeGetMaterialOrder: "{{ route('GPS.pengerjaanHargaMaterial.get-material-order') }}",
            routeGetSatuanList: "{{ route('GPS.pengerjaanHargaMaterial.get-satuan-list') }}",
            routeStore: "{{ route('GPS.pengerjaanHargaMaterial.store') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalPengerjaan/pengerjaanHargaMaterial.js') }}"></script>
@endsection
