@extends('layouts.appGPS')

@section('title')
    Informasi Jadwal Per-Order
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #inf_pkj_order_form {
            max-width: 1400px;
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
            overflow: auto;
        }

        .table-scroll-x {
            overflow-x: auto;
        }

        .table-scroll-x table {
            min-width: 1400px;
        }

        .tbl-hdr {
            font-size: .8rem;
            white-space: nowrap;
        }

        .tbl-cell {
            font-size: .8rem;
            white-space: nowrap;
        }

        .row-emergency > td {
            color: red !important;
        }

        .row-finish > td {
            color: #00ced1 !important;
        }

        .row-setuju > td {
            color: #008000 !important;
        }

        .row-tdksetuju > td {
            color: #ff8c00 !important;
        }

        .row-tolak-mng > td {
            color: darkviolet !important;
        }

        .row-finish-total > td {
            color: blue !important;
        }

        .row-cancel > td {
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
        <div id="inf_pkj_order_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-info-circle me-2"></i>Informasi Pengerjaan - Jadwal Per-Order
            </h4>

            <div class="row">
                <div class="col-lg-6">
                    <fieldset id="Frame1">
                        <legend>Order Kerja</legend>

                        <div class="row mb-2">
                            <div class="col-md-12">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="jenisOd" id="OptHarian"
                                        value="H" checked>
                                    <label class="form-check-label" for="OptHarian">Harian</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="jenisOd" id="OptProyek"
                                        value="P">
                                    <label class="form-check-label" for="OptProyek">Proyek</label>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">No. Order:</div>
                            <div class="col-lg-3">
                                <input type="text" id="TNoOd" class="form-control text-uppercase"
                                    placeholder="Ketik & Enter..." autocomplete="off">
                            </div>
                            <div class="col-lg-6">
                                <span id="OdSts" class="fw-bold text-danger mt-1 d-inline-block"></span>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Divisi:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TDivisi" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Kode Barang:</div>
                            <div class="col-lg-4">
                                <input type="text" id="TKdBrg" class="form-control bg-white" disabled readonly>
                            </div>
                            <div class="col-lg-2 aligned-text text-lg-end">No. Gbr:</div>
                            <div class="col-lg-3">
                                <input type="text" id="TNoGbr" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Nama Barang:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TNamaBrg" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Jumlah Order:</div>
                            <div class="col-lg-4">
                                <input type="text" id="TJml" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Mesin:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TMesin" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Pengorder:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TUserOrder" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-lg-3 aligned-text">Ket. Order:</div>
                            <div class="col-lg-9">
                                <input type="text" id="TKetOrder" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-3 aligned-text">Nama Bagian:</div>
                            <div class="col-lg-7">
                                <div class="input-group input-group-lookup">
                                    <input type="text" id="TBagian" class="form-control" readonly
                                        placeholder="Pilih bagian...">
                                    <button class="lookup-btn" id="btnBagian" title="Cari Bagian">
                                        <i class="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-lg-2">
                                <input type="hidden" id="TIdBagian" value="">
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="col-lg-6">
                    <div class="border p-3 rounded" style="background-color: #f8f9fa;">
                        <div class="fw-bold mb-2">Keterangan:</div>
                        <div class="row">
                            <div class="col-md-6">
                                <div><span class="legend-box emergency"></span> Emergency</div>
                                <div><span class="legend-box finish"></span> Finish, sdh diproses</div>
                                <div><span class="legend-box setuju"></span> Finish, disetujui KR</div>
                                <div><span class="legend-box tdksetuju"></span> Finish, Tdk disetujui KR</div>
                            </div>
                            <div class="col-md-6">
                                <div><span class="legend-box tolak-mng"></span> Ditolak</div>
                                <div><span class="legend-box finish-total"></span> Finish Total</div>
                                <div><span class="legend-box cancel"></span> Edit EstDate / DiDelete</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="table-responsive table-scroll-x mt-3 border rounded p-2">
                <table id="tblData" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th class="tbl-hdr">Nomer</th>
                            <th class="tbl-hdr">Tgl Start</th>
                            <th class="tbl-hdr">Mesin</th>
                            <th class="tbl-hdr">Type Mesin</th>
                            <th class="tbl-hdr">Bagian</th>
                            <th class="tbl-hdr">Est. Time</th>
                            <th class="tbl-hdr">Jml Dikerjakan</th>
                            <th class="tbl-hdr">Tgl. Operator</th>
                            <th class="tbl-hdr">Real Time</th>
                            <th class="tbl-hdr">Jml Finish</th>
                            <th class="tbl-hdr">Keterangan</th>
                            <th class="tbl-hdr">Tgl. Kep. Regu</th>
                            <th class="tbl-hdr">Ket. Tdk Disetujui KR</th>
                            <th class="tbl-hdr">Tgl. Acc PPIC</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyData">
                        <tr>
                            <td colspan="14" class="text-center">Belum ada data.</td>
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
        window.infPkjOrderConfig = {
            routeGetOrder: "{{ route('GPS.InfoPengerjaanOrder.get-order') }}",
            routeGetBagianList: "{{ route('GPS.InfoPengerjaanOrder.get-bagian-list') }}",
            routeGetJadwal: "{{ route('GPS.InfoPengerjaanOrder.get-jadwal') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/InformasiPengerjaan/infoPengerjaanOrder.js') }}"></script>
@endsection
