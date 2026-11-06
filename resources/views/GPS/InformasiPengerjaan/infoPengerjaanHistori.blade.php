@extends('layouts.appGPS')

@section('title')
    Histori Proses Pengerjaan
@endsection

@section('content')
    <style>
        .GPS_root { width: 100%; }

        #histori_form {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        .table-responsive { max-height: 500px; overflow: auto; }

        .table-scroll-x {
            overflow-x: auto;
            overflow-y: auto;
        }
        .table-scroll-x table { min-width: 1200px; }

        .tbl-hdr {
            font-size: .8rem;
            white-space: nowrap;
        }
        .tbl-cell {
            font-size: .8rem;
            white-space: nowrap;
        }
        .histori-detail-row { cursor: pointer; }

        .hint-bar {
            font-size: .8rem;
            color: brown;
            padding: 4px 8px;
            background: #fff8e1;
            border-radius: .25rem;
            border: 1px solid #ffe0a3;
            display: inline-block;
            margin-bottom: 8px;
        }

        .input-group-lookup .form-control { border-radius: .25rem 0 0 .25rem; }
        .lookup-btn {
            cursor: pointer;
            background: #e9ecef;
            border: 1px solid #ced4da;
            border-left: none;
            border-radius: 0 .25rem .25rem 0;
            padding: 0 10px;
            display: flex; align-items: center; justify-content: center;
        }
        .lookup-btn:hover { background: #dee2e6; }
    </style>

    <div class="GPS_root">
        <div id="histori_form" class="form" data-aos="fade-up">

            <h4 class="mb-3 fw-bold border-bottom pb-2">
                <i class="bi bi-clock-history me-2"></i>Histori Proses Pengerjaan
            </h4>

            <fieldset class="border rounded p-3 mb-3">
                <legend class="fw-bold fs-6 px-2">Pencarian</legend>

                <div class="row mb-2">
                    <div class="col-md-12">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="jenisOd" id="OptHarian" value="H" checked>
                            <label class="form-check-label" for="OptHarian">Harian</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="jenisOd" id="OptProyek" value="P">
                            <label class="form-check-label" for="OptProyek">Proyek</label>
                        </div>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-md-2">Nama Barang:</div>
                    <div class="col-md-5">
                        <input type="text" id="TNamaBrg" class="form-control" autocomplete="off">
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-md-2">Kode Barang:</div>
                    <div class="col-md-3">
                        <input type="text" id="TKdBrg" class="form-control" autocomplete="off">
                    </div>
                    <div class="col-md-2 text-end">No. Order:</div>
                    <div class="col-md-3">
                        <input type="text" id="TNoOd" class="form-control text-uppercase" autocomplete="off">
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-md-2">Nama Bagian:</div>
                    <div class="col-md-7">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TBagian" class="form-control" readonly placeholder="Pilih bagian...">
                            <button class="lookup-btn" id="btnBagian" title="Cari Bagian">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                        <input type="hidden" id="TIdBagian" value="">
                    </div>
                </div>

                <div class="hint-bar">
                    <i class="bi bi-info-circle me-1"></i>
                    Tekan <b>Enter</b> pada No. Order untuk menampilkan seluruh bagian,
                    atau tekan <b>Spasi</b> untuk memilih 1 bagian.
                </div>
            </fieldset>

            <div class="table-responsive table-scroll-x border rounded p-2">
                <table class="table table-bordered table-hover mb-0" style="width:100%">
                    <thead class="table-light">
                        <tr>
                            <th class="tbl-hdr">No.Order</th>
                            <th class="tbl-hdr">Divisi</th>
                            <th class="tbl-hdr">Nama Barang</th>
                            <th class="tbl-hdr">Kd.Barang</th>
                            <th class="tbl-hdr">No.Gambar</th>
                            <th class="tbl-hdr">Nama Bagian</th>
                            <th class="tbl-hdr d-none">IdBagian</th>
                            <th class="tbl-hdr">Jml Order</th>
                            <th class="tbl-hdr">Total Biaya</th>
                            <th class="tbl-hdr">Finish KR</th>
                            <th class="tbl-hdr d-none">bulan</th>
                            <th class="tbl-hdr d-none">tahun</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyData">
                        <tr><td colspan="12" class="text-center text-muted">Belum ada data.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-4 pt-3 border-top align-items-center">
                <div class="col-md-7">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-3 me-2">Keluar</button>
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-3 me-2">Refresh</button>
                    <button type="button" id="btnMaterial" class="btn btn-outline-primary border border-primary fw-bold px-3 me-2">Harga Material</button>
                    <button type="button" id="btnSPart" class="btn btn-outline-primary border border-primary fw-bold px-3 me-2">Harga S/Part</button>
                    <button type="button" id="btnMakloon" class="btn btn-outline-primary border border-primary fw-bold px-3 me-2">Makloon</button>
                </div>
                <div class="col-md-5 text-end">
                    <label class="me-2 fw-bold">Total Biaya Rp.</label>
                    <input type="text" id="TTotalBiaya" class="form-control d-inline-block w-auto text-end" value="0" readonly>
                    <button type="button" id="btnTotal" class="btn btn-info fw-bold px-3 ms-2" disabled>Hitung</button>
                </div>
            </div>

        </div>
    </div>

    @include('GPS.InformasiPengerjaan.infoPengerjaanHistoriDetail')
    @include('GPS.InformasiPengerjaan.infoPengerjaanHistoriMaterial')
    @include('GPS.InformasiPengerjaan.infoPengerjaanHistoriSpart')
    @include('GPS.InformasiPengerjaan.infoPengerjaanHistoriMakloon')

    <script>
        window.historiConfig = {
            routeGetUserType:   "{{ route('GPS.InfoPengerjaanHistori.get-user-type') }}",
            routeGetData:       "{{ route('GPS.InfoPengerjaanHistori.get-data') }}",
            routeGetBagianList: "{{ route('GPS.InfoPengerjaanHistori.get-bagian-list') }}",
            routeGetDetail:     "{{ route('GPS.InfoPengerjaanHistori.get-detail') }}",
            routeGetMaterialDetail: "{{ route('GPS.InfoPengerjaanHistori.get-material-detail') }}",
            routeGetSpartDetail: "{{ route('GPS.InfoPengerjaanHistori.get-spart-detail') }}",
            routeGetMakloonDetail: "{{ route('GPS.InfoPengerjaanHistori.get-makloon-detail') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/InformasiPengerjaan/infoPengerjaanHistori.js') }}"></script>
@endsection
