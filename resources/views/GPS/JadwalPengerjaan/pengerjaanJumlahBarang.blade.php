@extends('layouts.appGPS')

@section('title')
    Edit Jumlah Barang yang Dikerjakan
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #pkj_jml_barang_form {
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
            border-radius: 0.25rem 0 0 0.25rem;
        }

        .table-responsive {
            max-height: 400px;
            overflow-y: auto;
        }

        .row-emergency>td {
            color: red !important;
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

        .legend-box.normal {
            background-color: white;
        }
    </style>

    <div class="GPS_root">
        <div id="pkj_jml_barang_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-boxes me-2"></i>Edit Jumlah Barang yang Dikerjakan
            </h4>

            <fieldset id="Frame1">
                <legend>Order Kerja</legend>

                <div class="row mb-2">
                    <div class="col-md-12">
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
                </div>

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
                    <div class="col-lg-2 aligned-text text-lg-end">No. Gambar:</div>
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
                    <div class="col-lg-2 aligned-text">Jumlah Order:</div>
                    <div class="col-lg-3">
                        <input type="text" id="TJml" class="form-control bg-white" disabled readonly>
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

            <div class="row mt-3">
                <div class="col-md-12">
                    <div class="border p-2 rounded" style="background-color: #f8f9fa;">
                        <span class="legend-box emergency"></span> Emergency
                        <span class="legend-box normal" style="margin-left: 20px;"></span> Normal
                        <span style="margin-left: 20px;"><i class="bi bi-check-square"></i> Checklist (pilih 1
                            item)</span>
                    </div>
                </div>
            </div>

            <div class="table-responsive mt-3 border rounded p-2">
                <table id="tblJadwal" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th>Nomer</th>
                            <th>Tgl Start</th>
                            <th>Mesin</th>
                            <th>Type Mesin</th>
                            <th>Bagian</th>
                            <th>Est. Time</th>
                            <th>Jml Dikerjakan</th>
                            <th style="display:none;">NoMesin</th>
                            <th style="display:none;">NoType</th>
                            <th style="display:none;">IdTrans</th>
                            <th style="display:none;">NoAntrian</th>
                            <th style="display:none;">JmlBr</th>
                            <th style="display:none;">Status</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyJadwal">
                        <tr>
                            <td colspan="8" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-6">
                    <button type="button" id="btnProses" class="btn btn-success fw-bold px-4">PROSES</button>
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-3">Refresh</button>
                </div>
                <div class="col-md-6 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">KELUAR</button>
                </div>
            </div>

        </div>
    </div>

    @include('GPS.jmlBarang')

    <script>
        window.pkjJmlBarangConfig = {
            routeGetOrder: "{{ route('GPS.pengerjaanJumlahBarang.get-order') }}",
            routeGetBagianList: "{{ route('GPS.pengerjaanJumlahBarang.get-bagian-list') }}",
            routeGetJadwal: "{{ route('GPS.pengerjaanJumlahBarang.get-jadwal') }}",
            routeStore: "{{ route('GPS.pengerjaanJumlahBarang.store') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalPengerjaan/pengerjaanJumlahBarang.js') }}"></script>
@endsection
