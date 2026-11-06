@extends('layouts.appGPS')

@section('title')
    Finish Jadwal Pengerjaan
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #pkj_finish_form {
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
            white-space: nowrap;
            overflow-y: auto;
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

        .legend-box {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 6px;
            border: 1px solid #ccc;
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

        .legend-box.normal {
            background-color: white;
        }
    </style>

    <div class="GPS_root">
        <div id="pkj_finish_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-check2-circle me-2"></i>Finish Jadwal Pengerjaan
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
                        <span class="legend-box finish"></span> Sudah diproses operator
                        <span class="legend-box setuju" style="margin-left: 20px;"></span> Disetujui KR
                        <span class="legend-box tdksetuju" style="margin-left: 20px;"></span> Tdk disetujui KR, dijadwal
                        ulang
                        <span class="legend-box normal" style="margin-left: 20px;"></span> Normal
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
                            <th>Est. Time</th>
                            <th>Jml Dikerjakan</th>
                            <th>Real Time</th>
                            <th>Jml Finish</th>
                            <th>Tgl Finish</th>
                            <th>Setuju KR</th>
                            <th>Tdk Setuju KR</th>
                            <th>Alasan</th>
                            <th>ACC PPIC</th>
                            <th style="display:none;">NoMesin</th>
                            <th style="display:none;">NoType</th>
                            <th style="display:none;">IdBagian</th>
                            <th style="display:none;">JmlBrg</th>
                            <th style="display:none;">statusWarna</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyJadwal">
                        <tr>
                            <td colspan="14" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-12">
                    <button type="button" id="btnRefresh"
                        class="btn btn-outline-secondary fw-bold px-3 me-1 border border-dark">Refresh</button>
                    <button type="button" id="btnAccSpv" class="btn btn-info fw-bold px-3 me-1"
                        {{ !$btnAccSpv ? 'disabled' : '' }}>ACC Supervisor</button>
                    <button type="button" id="btnAccPPIC" class="btn btn-secondary fw-bold px-3 me-1"
                        {{ !$btnAccPPIC ? 'disabled' : '' }}>ACC PPIC</button>
                    <button type="button" id="btnSetuju" class="btn btn-success fw-bold px-3 me-1"
                        {{ !$btnSetuju ? 'disabled' : '' }}>Disetujui KR</button>
                    <button type="button" id="btnTdkSetuju" class="btn btn-warning fw-bold px-3 me-1"
                        {{ !$btnTdkSetuju ? 'disabled' : '' }}>Tdk Disetujui KR</button>
                    <button type="button" id="btnProses" class="btn btn-primary fw-bold px-3 me-1"
                        {{ !$btnProses ? 'disabled' : '' }}>Proses Operator</button>
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-3 float-end">Keluar</button>
                </div>
            </div>

        </div>
    </div>

    @include('GPS.alasan1')
    @include('GPS.inputReal')
    
    <script>
        window.pkjFinishConfig = {
            routeGetOrder: "{{ route('GPS.pengerjaanFinish.get-order') }}",
            routeGetBagianList: "{{ route('GPS.pengerjaanFinish.get-bagian-list') }}",
            routeGetJadwal: "{{ route('GPS.pengerjaanFinish.get-jadwal') }}",
            routeStore: "{{ route('GPS.pengerjaanFinish.store') }}",
            jenisUser: {{ $jenis }}
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalPengerjaan/pengerjaanFinish.js') }}"></script>
@endsection
