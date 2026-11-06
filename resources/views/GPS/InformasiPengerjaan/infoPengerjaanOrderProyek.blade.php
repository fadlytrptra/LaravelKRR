@extends('layouts.appGPS')

@section('title')
    Informasi Daftar Order Kerja & Proyek
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #inf_pkj_order_proyek_form {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
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

        .row-hotpink>td {
            color: hotpink !important;
        }

        .row-blue>td {
            color: blue !important;
        }

        .row-limegreen>td {
            color: limegreen !important;
        }


        .tbl-hdr {
            font-size: .8rem;
            white-space: nowrap;
        }

        .tbl-cell {
            font-size: .8rem;
            white-space: nowrap;
        }

        .legend-box {
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius: 3px;
            border: 1px solid #dee2e6;
        }

        .status-finish {
            background-color: hotpink;
        }

        .status-not-ready {
            background-color: limegreen;
        }
    </style>

    <div class="GPS_root">
        <div id="inf_pkj_order_proyek_form" class="form" data-aos="fade-up">
            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-info-circle me-2"></i>Informasi Pengerjaan - Daftar Order Kerja & Proyek
            </h4>

            <div class="row mb-3 align-items-center">
                <div class="col-md-7 col-lg-8">
                    <div class="d-flex align-items-center gap-2">
                        <label for="Date1" class="col-form-label fw-bold mb-0 text-nowrap">Tanggal</label>
                        <input type="date" id="Date1" class="form-control" value="{{ $startDate }}">
                        <span class="text-nowrap">s/d</span>
                        <input type="date" id="Date2" class="form-control" value="{{ $endDate }}">
                        <button type="button" id="btnOK" class="btn btn-primary px-3">OK</button>
                    </div>
                </div>

                <div class="col-md-5 col-lg-4">
                    <fieldset class="border px-3 py-2 rounded bg-light m-0">
                        <legend class="float-none w-auto px-2 fw-bold fs-6 mb-0">Keterangan:</legend>
                        <div class="d-flex align-items-center gap-3">
                            <div class="d-flex align-items-center">
                                <span class="legend-box status-finish fw-semibold me-2"></span>
                                <span class="text-nowrap">Finish Total</span>
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="legend-box status-not-ready me-2"></span>
                                <span class="text-nowrap">Not Ready</span>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>

            <div class="table-responsive table-scroll-x mt-3 border rounded p-2">
                <table id="tblData" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th class="tbl-hdr">No.Order</th>
                            <th class="tbl-hdr">DM</th>
                            <th class="tbl-hdr">Nama Barang</th>
                            <th class="tbl-hdr">Nama Bagian</th>
                            <th class="tbl-hdr">Tgl Start</th>
                            <th class="tbl-hdr">Kd. Barang</th>
                            <th class="tbl-hdr">Divisi</th>
                            <th class="tbl-hdr">Status Order</th>
                            <th class="tbl-hdr">Jml Order</th>
                            <th class="tbl-hdr">Tgl Finish</th>
                            <th class="tbl-hdr">Status Mtr</th>
                            <th class="tbl-hdr d-none">IdTrans</th>
                            <th class="tbl-hdr d-none">Keterangan</th>
                            <th class="tbl-hdr">Total Biaya</th>
                            <th class="tbl-hdr">Tgl Bon</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyData">
                        <tr>
                            <td colspan="16" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-6">
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-3">Refresh</button>
                    <button type="button" id="btnMatOK" class="btn btn-success fw-bold px-3">Material OK</button>
                    <button type="button" id="btnBon" class="btn btn-warning fw-bold px-3">BON Material</button>
                </div>
                <div class="col-md-6 text-end">
                    <label class="me-2">Total Biaya Rp.</label>
                    <input type="text" id="TTotalBiaya" class="form-control d-inline-block w-auto text-end"
                        value="0" readonly>
                    <button type="button" id="btnTotal" class="btn btn-info fw-bold px-3 ms-2" disabled>Hitung
                        Total</button>
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4 ms-2">Keluar</button>
                </div>
            </div>
        </div>
    </div>

    @include('GPS.InformasiPengerjaan.frmListMaterial')
    @include('GPS.InformasiPengerjaan.frmMhnPenerima')

    <script>
        window.infoPkjOrderProyekConfig = {
            routeGetListOrder: "{{ route('GPS.InfoPengerjaanOrderProyek.get-list-order') }}",
            routeGetListMaterial: "{{ route('GPS.InfoPengerjaanOrderProyek.get-list-material') }}",
            routeGetUserType: "{{ route('GPS.InfoPengerjaanOrderProyek.get-user-type') }}",
            routeSetReady: "{{ route('GPS.InfoPengerjaanOrderProyek.set-ready') }}",
            routeSetBon: "{{ route('GPS.InfoPengerjaanOrderProyek.set-bon') }}",
            routeMhnListMohon: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-list-mohon') }}",
            routeMhnDivisiList: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-divisi-list') }}",
            routeMhnObjekList: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-objek-list') }}",
            routeMhnKelUtamaList: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-kel-utama-list') }}",
            routeMhnKelompokList: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-kelompok-list') }}",
            routeMhnSubKelList: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-sub-kel-list') }}",
            routeMhnTypeList: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-type-list') }}",
            routeMhnKodeBarang: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-kode-barang') }}",
            routeMhnCekKodeBarang: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-cek-kode-barang') }}",
            routeMhnKodeBarangTerima: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-kode-barang-terima') }}",
            routeMhnInsertTmp: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-insert-tmp') }}",
            routeMhnUpdateTmp: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-update-tmp') }}",
            routeMhnDeleteTmp: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-delete-tmp') }}",
            routeMhnTujuanDetail: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-tujuan-detail') }}",
            routeMhnAsalDetail: "{{ route('GPS.InfoPengerjaanOrderProyek.mhn-asal-detail') }}",
        };
    </script>

    <script src="{{ asset('js/GPS/InformasiPengerjaan/infoPengerjaanOrderProyek.js') }}"></script>
@endsection
