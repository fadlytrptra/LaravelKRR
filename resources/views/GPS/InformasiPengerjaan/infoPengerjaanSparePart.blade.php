@extends('layouts.appGPS')

@section('title')
    Informasi Pengerjaan - Daftar S/Part
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #spart_form {
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
            min-width: 1100px;
        }

        .tbl-hdr {
            font-size: .8rem;
            white-space: nowrap;
        }

        .tbl-cell {
            font-size: .8rem;
            white-space: nowrap;
        }

        .input-group-lookup .form-control {
            border-radius: .25rem 0 0 .25rem;
        }

        .lookup-btn {
            cursor: pointer;
            background: #e9ecef;
            border: 1px solid #ced4da;
            border-left: none;
            border-radius: 0 .25rem .25rem 0;
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .lookup-btn:hover {
            background: #dee2e6;
        }

        #spart_form .row-stock>td {
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
            background-color: #212529;
        }

        .legend-box.stock {
            background-color: dodgerblue;
        }
    </style>

    <div class="GPS_root">
        <div id="spart_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-gear me-2"></i>Informasi Pengerjaan - Daftar S/Part
            </h4>

            <div class="row">
                <div class="col-lg-6">
                    <fieldset class="border rounded p-3 mb-3">
                        <legend class="fw-bold fs-6 px-2">Order Kerja</legend>

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

                        <div class="row mb-2">
                            <div class="col-md-3">No. Order:</div>
                            <div class="col-md-4">
                                <input type="text" id="TNoOd" class="form-control text-uppercase"
                                    placeholder="Ketik & Enter..." autocomplete="off">
                            </div>
                            <div class="col-md-4">
                                <span id="OdSts" class="fw-bold text-danger mt-1 d-inline-block"></span>
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="col-md-3">Divisi:</div>
                            <div class="col-md-9">
                                <input type="text" id="TDivisi" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="col-md-3">Kode Barang:</div>
                            <div class="col-md-3">
                                <input type="text" id="TKdBrg" class="form-control bg-white" disabled readonly>
                            </div>
                            <div class="col-md-2 text-end">No. Gbr:</div>
                            <div class="col-md-4">
                                <input type="text" id="TNoGbr" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="col-md-3">Nama Barang:</div>
                            <div class="col-md-9">
                                <input type="text" id="TNamaBrg" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="col-md-3">Jumlah Order:</div>
                            <div class="col-md-4">
                                <input type="text" id="TJml" class="form-control bg-white text-end" disabled
                                    readonly>
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="col-md-3">Mesin:</div>
                            <div class="col-md-9">
                                <input type="text" id="TMesin" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="col-md-3">Pengorder:</div>
                            <div class="col-md-9">
                                <input type="text" id="TUserOrder" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="col-md-3">Ket. Order:</div>
                            <div class="col-md-9">
                                <input type="text" id="TKetOrder" class="form-control bg-white" disabled readonly>
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="col-md-3">Nama Bagian:</div>
                            <div class="col-md-7">
                                <div class="input-group input-group-lookup">
                                    <input type="text" id="TBagian" class="form-control" readonly
                                        placeholder="Pilih bagian...">
                                    <button class="lookup-btn" id="btnBagian" title="Cari Bagian">
                                        <i class="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="TIdBagian" value="">
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="col-lg-6">
                    <div class="border p-3 rounded" style="background-color: #f8f9fa;">
                        <div class="fw-bold mb-2">Keterangan:</div>
                        <div><span class="legend-box baru"></span> Baru</div>
                        <div><span class="legend-box stock"></span> Stock</div>
                    </div>
                </div>
            </div>

            <div class="table-responsive table-scroll-x border rounded p-2">
                <table class="table table-bordered table-hover mb-0" style="width:100%">
                    <thead class="table-light">
                        <tr>
                            <th class="tbl-hdr">Kd. Barang</th>
                            <th class="tbl-hdr">Nm. Barang</th>
                            <th class="tbl-hdr">Sub Kategori</th>
                            <th class="tbl-hdr">Jumlah</th>
                            <th class="tbl-hdr">Satuan</th>
                            <th class="tbl-hdr">Harga Baru/Satuan</th>
                            <th class="tbl-hdr">Total Harga Baru</th>
                            <th class="tbl-hdr">Harga Stock/Satuan</th>
                            <th class="tbl-hdr">Total Harga Stock</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyData">
                        <tr>
                            <td colspan="9" class="text-center text-muted">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-4 pt-3 border-top align-items-center">
                <div class="col-md-2">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-3 me-2">Keluar</button>
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-3">Refresh</button>
                </div>
                <div class="col-md-10 text-end">
                    <label class="fw-bold me-2">Total Harga S/Part Rp.</label>
                    <input type="text" id="TTotal" class="form-control d-inline-block w-auto text-end"
                        value="0" readonly>
                    <label class="fw-bold ms-3 me-2">Total Baru Rp.</label>
                    <input type="text" id="TTotalBiaya" class="form-control d-inline-block w-auto text-end"
                        value="0" readonly>
                    <label class="fw-bold ms-3 me-2">Total Bekas Rp.</label>
                    <input type="text" id="TTotalBiaya1" class="form-control d-inline-block w-auto text-end"
                        value="0" readonly>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.spartConfig = {
            routeGetOrder: "{{ route('GPS.InfoPengerjaanSparePart.get-order') }}",
            routeGetBagianList: "{{ route('GPS.InfoPengerjaanSparePart.get-bagian-list') }}",
            routeGetSpartList: "{{ route('GPS.InfoPengerjaanSparePart.get-spart-list') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/InformasiPengerjaan/infoPengerjaanSparePart.js') }}"></script>
@endsection
