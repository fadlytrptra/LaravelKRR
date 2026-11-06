@extends('layouts.appGPS')

@section('title')
    Edit Jadwal Per Mesin
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #edit_jadwal_mesin_form {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        #tblJadwal {
            white-space: nowrap;
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

        .row-emergency > td {
            color: red !important;
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

        .legend-box.cancel {
            background-color: hotpink;
        }

        .legend-box.normal {
            background-color: white;
        }
    </style>

    <div class="GPS_root">
        <div id="edit_jadwal_mesin_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-arrow-left-right me-2"></i>Edit Jadwal Pengerjaan - Per Mesin
            </h4>

            <div class="row">
                <div class="col-lg-7">
                    <div class="row mb-3">
                        <div class="col-lg-3 aligned-text">Nama Mesin:</div>
                        <div class="col-lg-8">
                            <div class="input-group input-group-lookup">
                                <input type="text" id="TMesin" class="form-control" readonly
                                    placeholder="Pilih Mesin...">
                                <button class="lookup-btn" id="btnMesin" title="Cari Mesin">
                                    <i class="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-1">
                            <input type="hidden" id="TNoMesin" value="">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-lg-3 aligned-text">Type Mesin:</div>
                        <div class="col-lg-8">
                            <div class="input-group input-group-lookup">
                                <input type="text" id="TType" class="form-control" readonly
                                    placeholder="Pilih Type Mesin...">
                                <button class="lookup-btn" id="btnType" title="Cari Type Mesin">
                                    <i class="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-1">
                            <input type="hidden" id="TNoType" value="">
                        </div>
                    </div>

                    <!-- Tanggal -->
                    <div class="row mb-3">
                        <div class="col-lg-3 aligned-text">Tanggal:</div>
                        <div class="col-lg-4">
                            <input type="date" id="Date1" class="form-control">
                        </div>
                        <div class="col-lg-2">
                            <button type="button" id="btnOK" class="btn btn-primary btn-sm w-100" disabled>OK</button>
                        </div>
                    </div>
                </div>

                <!-- Legenda -->
                <div class="col-lg-5">
                    <div class="border p-3 rounded" style="background-color: #f8f9fa;">
                        <div class="fw-bold mb-2">Keterangan:</div>
                        <div><span class="legend-box emergency"></span> Emergency</div>
                        <div><span class="legend-box cancel"></span> Edit EstDate / DiDelete</div>
                        <div class="mt-2 text-muted" style="font-size: 0.9rem;">
                            <i class="bi bi-info-circle me-1"></i>Cek nomor kerja yang mau diedit posisinya (pilih 2), dan
                            cek posisi barunya.
                        </div>
                    </div>
                </div>
            </div>

            <div class="table-responsive mt-3 border rounded p-2">
                <table id="tblJadwal" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th>Nomer</th>
                            <th>No.Order</th>
                            <th>Tgl Start</th>
                            <th>Barang</th>
                            <th>Kd. Barang</th>
                            <th>Est. Time</th>
                            <th>Divisi</th>
                            <th>Jml Order</th>
                            <th>Bagian</th>
                            <th>Jml Dikerjakan</th>
                            <th style="display:none;">IdBagian</th>
                            <th style="display:none;">Status</th>
                            <th style="display:none;">Cancel</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyJadwal">
                        <tr>
                            <td colspan="11" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-3 pt-3 border-top">
                <div class="col-md-6">
                    <button type="button" id="btnProses" class="btn btn-success fw-bold px-4" disabled>
                        <i class="bi bi-arrow-left-right"></i> Klik Disini Untuk PROSES
                    </button>
                    <button type="button" id="btnRefresh" class="btn btn-secondary fw-bold px-3">Refresh</button>
                </div>
                <div class="col-md-6 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">KELUAR</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.editJadwalMesinConfig = {
            routeGetMesinList: "{{ route('GPS.pengerjaanEditMesin.get-mesin-list') }}",
            routeGetTypeList: "{{ route('GPS.pengerjaanEditMesin.get-type-list') }}",
            routeGetJadwal: "{{ route('GPS.pengerjaanEditMesin.get-jadwal') }}",
            routeStore: "{{ route('GPS.pengerjaanEditMesin.store') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalPengerjaan/pengerjaanEditMesin.js') }}"></script>
@endsection
