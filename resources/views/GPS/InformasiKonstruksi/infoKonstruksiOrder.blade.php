@extends('layouts.appGPS')

@section('title')
    Informasi Konstruksi - Jadwal Per-Order
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #inf_kons_order_form {
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
            color: inherit;
            font: inherit;
        }

        .lookup-btn:hover {
            background: #dee2e6;
        }

        .lookup-btn:focus {
            outline: none;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .input-group-lookup .form-control {
            border-radius: 0 0.25rem 0 0.25rem;
        }

        .input-group-lookup .form-control:first-child {
            border-radius: 0 0.25rem 0 0.25rem;
        }

        .table-responsive {
            max-height: 500px;
            overflow: auto;
        }

        .table-scroll-x {
            overflow-x: auto;
        }

        .table-scroll-x table {
            min-width: 1200px;
        }

        .tbl-hdr {
            font-size: 0.85rem;
            white-space: nowrap;
        }

        .tbl-cell {
            font-size: 0.85rem;
            white-space: nowrap;
        }

        /* Warna status (mengikuti VB) */
        .row-emergency>td {
            color: red !important;
        }

        .row-finish>td {
            color: #00ced1 !important;
        }

        /* DarkTurquoise */
        .row-setuju>td {
            color: #008000 !important;
        }

        /* Green */
        .row-tdksetuju>td {
            color: #ff8c00 !important;
        }

        /* Orange */
        .row-tolak-mng>td {
            color: darkviolet !important;
        }

        .row-finish-total>td {
            color: blue !important;
        }

        .row-cancel>td {
            color: hotpink !important;
        }

        .legend-box {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 6px;
            border: 1px solid #ccc;
        }

        .legend-box.emergency {
            background-color: red;
        }

        .legend-box.finish {
            background-color: #00ced1;
        }

        .legend-box.setuju {
            background-color: #008000;
        }

        .legend-box.tdksetuju {
            background-color: #ff8c00;
        }

        .legend-box.tolak-mng {
            background-color: darkviolet;
        }

        .legend-box.finish-total {
            background-color: blue;
        }

        .legend-box.cancel {
            background-color: hotpink;
        }
    </style>

    <div class="GPS_root">
        <div id="inf_kons_order_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-info-circle me-2"></i>Informasi Konstruksi - Jadwal Per-Order
            </h4>

            <fieldset id="Frame1">
                <legend>Order Gambar</legend>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">No. Order:</div>
                    <div class="col-lg-2">
                        <input type="text" id="TNoOd" class="form-control text-uppercase"
                            placeholder="Ketik & Enter..." autocomplete="off">
                    </div>
                    <div class="col-lg-8">
                        <span id="OdSts" class="fw-bold text-danger mt-1 d-inline-block"></span>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Divisi:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TDivisi" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Kode Barang:</div>
                    <div class="col-lg-3">
                        <input type="text" id="TKdBrg" class="form-control bg-white" disabled readonly>
                    </div>
                    <div class="col-lg-2 aligned-text text-lg-end">No. Gambar Rev:</div>
                    <div class="col-lg-5">
                        <input type="text" id="TNoGbr" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Nama Barang:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TNamaBrg" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Mesin:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TMesin" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Pengorder:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TUserOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Ket. Order:</div>
                    <div class="col-lg-10">
                        <input type="text" id="TKetOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Nama Bagian:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TBagian" class="form-control" readonly
                                placeholder="Pilih bagian...">
                            <button type="button" class="lookup-btn" id="btnBagian" title="Cari Bagian"
                                aria-label="Cari Bagian">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <input type="hidden" id="TIdBagian" value="">
                    </div>
                </div>
            </fieldset>

            <div class="row mt-3">
                <div class="col-md-12">
                    <fieldset class="border p-3 rounded bg-light">
                        <legend class="float-none w-auto px-2 fw-bold fs-6">Keterangan:</legend>

                        <div class="row g-2">
                            <div class="col-md-3">
                                <div class="d-flex align-items-center mb-1">
                                    <span class="legend-box emergency me-2"></span> Emergency
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="legend-box finish me-2"></span> Finish, sdh diproses
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="d-flex align-items-center mb-1">
                                    <span class="legend-box setuju me-2"></span> Finish, disetujui
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="legend-box tdksetuju me-2"></span> Finish, tdk disetujui
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="d-flex align-items-center mb-1">
                                    <span class="legend-box tolak-mng me-2"></span> Ditolak
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="legend-box finish-total me-2"></span> Finish Total
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="d-flex align-items-center">
                                    <span class="legend-box cancel me-2"></span> Edit EstDate / DiDelete
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>


            <div class="table-responsive table-scroll-x mt-3 border rounded p-2">
                <table id="tblJadwal" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th class="tbl-hdr">Nomer</th>
                            <th class="tbl-hdr">Tgl Start</th>
                            <th class="tbl-hdr">Work Station</th>
                            <th class="tbl-hdr">Est. Time</th>
                            <th class="tbl-hdr text-center">Hari Ke-</th>
                            <th class="tbl-hdr">Tgl. Proses Finish</th>
                            <th class="tbl-hdr">Real Time</th>
                            <th class="tbl-hdr">Keterangan</th>
                            <th class="tbl-hdr">Tgl. Disetujui</th>
                            <th class="tbl-hdr">Ket. Tdk Disetujui</th>
                            <th class="tbl-hdr">Tgl. Tdk Disetujui</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyJadwal">
                        <tr>
                            <td colspan="11" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-6">
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-3">Refresh</button>
                </div>
                <div class="col-md-6 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">Keluar</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.infKonsOrderConfig = {
            routeGetOrder: "{{ route('GPS.InfoKonstruksiOrder.get-order') }}",
            routeGetBagianList: "{{ route('GPS.InfoKonstruksiOrder.get-bagian-list') }}",
            routeGetJadwal: "{{ route('GPS.InfoKonstruksiOrder.get-jadwal') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/InformasiKonstruksi/infoKonstruksiOrder.js') }}"></script>
@endsection
