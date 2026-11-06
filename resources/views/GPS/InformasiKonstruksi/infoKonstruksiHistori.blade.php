@extends('layouts.appGPS')

@section('title')
    Histori Proses Konstruksi
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #inf_kons_his_form {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .lookup-btn {
            cursor: pointer;
            background: #e9ecef;
            border: 1px solid #ced4da;
            border-left: none;
            border-radius: 0 0.25rem 0.25rem 0;
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .lookup-btn:hover {
            background: #dee2e6;
        }

        .input-group-lookup .form-control {
            border-radius: 0 0.25rem 0 0.25rem;
        }

        .input-group-lookup .form-control:first-child {
            border-radius: 0 0.25rem 0 0.25rem;
        }

        .table-responsive {
            max-height: 500px;
            overflow-y: auto;
        }

        .tbl-hdr {
            font-size: 0.85rem;
            white-space: nowrap;
        }

        .tbl-cell {
            font-size: 0.85rem;
            white-space: nowrap;
        }

        .histori-detail-trigger {
            cursor: pointer;
        }
    </style>

    <div class="GPS_root">
        <div id="inf_kons_his_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-clock-history me-2"></i>Histori Proses Konstruksi
            </h4>

            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="row mb-2">
                        <div class="col-lg-2 aligned-text">Nama Barang:</div>
                        <div class="col-lg-6">
                            <input type="text" id="TNamaBrg" class="form-control"
                                placeholder="Ketik Nama Barang & Enter...">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-lg-2 aligned-text">No. Order:</div>
                        <div class="col-lg-6">
                            <input type="text" id="TNoOd" class="form-control text-uppercase"
                                placeholder="Ketik & Enter / Space">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-lg-2 aligned-text">Nama Bagian:</div>
                        <div class="col-lg-6">
                            <div class="input-group input-group-lookup">
                                <input type="text" id="TBagian" class="form-control" readonly
                                    placeholder="Pilih bagian (isi No. Order + Space dulu)...">
                                <button class="lookup-btn" id="btnBagian" title="Cari Bagian">
                                    <i class="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <input type="hidden" id="TIdBagian" value="">
                        </div>
                    </div>
                    <div class="text-muted" style="font-size: 0.85rem;">
                        <i class="bi bi-info-circle me-1"></i>Tekan <b>Enter</b> pada No. Order untuk menampilkan seluruh
                        bagian. Tekan <b>Space</b> untuk memilih 1 bagian.
                    </div>
                </div>
                <div class="col-lg-4 text-end">
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-3">Refresh</button>
                </div>
            </div>

            <div class="table-responsive mt-3 border rounded p-2">
                <table id="tblData" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th class="tbl-hdr">No. Order</th>
                            <th class="tbl-hdr">Divisi</th>
                            <th class="tbl-hdr">Nama Barang</th>
                            <th class="tbl-hdr">Nama Bagian</th>
                            <th class="tbl-hdr">Total Biaya</th>
                            <th class="tbl-hdr">Keterangan Finish</th>
                            <th style="display:none;">IdBagian</th>
                            <th style="display:none;">Bulan</th>
                            <th style="display:none;">Tahun</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyData">
                        <tr>
                            <td colspan="9" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="text-muted mt-1" style="font-size: 0.8rem;">
                <i class="bi bi-info-circle me-1"></i>Klik dua kali pada baris histori untuk membuka detail proses.
            </div>

            <div class="row mt-3">
                <div class="col-md-12 text-end">
                    <button type="button" id="btnTotal" class="btn btn-outline-primary fw-bold me-2"
                        {{ !$btnTotalEnabled ? 'disabled' : '' }}>Total Biaya Rp.</button>
                    <input type="text" id="TTotalBiaya" class="form-control d-inline-block text-end"
                        style="width: 180px;" value="0" disabled readonly>
                </div>
            </div>

            @include('GPS.InformasiKonstruksi.frmHistoriKonsDetail')

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-12 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">Keluar</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.infKonsHisConfig = {
            routeGetBagianList: "{{ route('GPS.InfoKonstruksiHistori.get-bagian-list') }}",
            routeGetHistori: "{{ route('GPS.InfoKonstruksiHistori.get-histori') }}",
            routeGetHistoriDetail: "{{ route('GPS.InfoKonstruksiHistori.get-histori-detail') }}",
            btnTotalEnabled: {{ $btnTotalEnabled ? 'true' : 'false' }}
        };
    </script>

    <script src="{{ asset('js/GPS/InformasiKonstruksi/infoKonstruksiHistori.js') }}"></script>
@endsection
