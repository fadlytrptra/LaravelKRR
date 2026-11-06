@extends('layouts.appGPS')

@section('title')
    Grafik Pengerjaan Per Order
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #grafik_order_form {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Grid hari untuk grafik */
        .day-grid {
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            gap: 8px;
        }

        .day-card {
            border: 1px solid #ced4da;
            border-radius: .25rem;
            padding: 6px;
            background: #fff;
            text-align: center;
            min-height: 60px;
        }

        .day-card .day-label {
            font-weight: bold;
            font-size: .85rem;
            border-bottom: 1px solid #e9ecef;
            margin-bottom: 4px;
            padding-bottom: 2px;
        }

        .day-card .day-bar {
            font-size: 1.4rem;
            color: #0d6efd;
            min-height: 24px;
        }

        .day-card.has-jd {
            background: #fff5e6;
            border-color: orangered;
        }

        .day-card.has-jd .day-bar {
            color: orangered;
        }

        .legend-box {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 6px;
            border: 1px solid #ccc;
        }

        .legend-box.filled {
            background-color: orangered;
        }
    </style>

    <div class="GPS_root">
        <div id="grafik_order_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-bar-chart-line me-2"></i>Grafik Pengerjaan Per Order
            </h4>

            <!-- Frame Order -->
            <fieldset class="border rounded p-3 mb-3">
                <legend class="fw-bold fs-6 px-2">Order Kerja</legend>

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

                <div class="row mb-2">
                    <div class="col-md-2">No. Order:</div>
                    <div class="col-md-2">
                        <input type="text" id="TNoOd" class="form-control text-uppercase"
                            placeholder="Ketik & Enter..." autocomplete="off">
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-md-2">Divisi:</div>
                    <div class="col-md-4">
                        <input type="text" id="TDivisi" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-md-2">Kode Barang:</div>
                    <div class="col-md-3">
                        <input type="text" id="TKdBrg" class="form-control bg-white" disabled readonly>
                    </div>
                    <div class="col-md-2 text-end">No. Gbr:</div>
                    <div class="col-md-3">
                        <input type="text" id="TNoGbr" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-md-2">Nama Barang:</div>
                    <div class="col-md-10">
                        <input type="text" id="TNamaBrg" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-md-2">Jumlah Order:</div>
                    <div class="col-md-3">
                        <input type="text" id="TJml" class="form-control bg-white text-end" disabled readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-md-2">Mesin:</div>
                    <div class="col-md-6">
                        <input type="text" id="TMesin" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-md-2">Pengorder:</div>
                    <div class="col-md-6">
                        <input type="text" id="TUserOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-md-2">Ket. Order:</div>
                    <div class="col-md-10">
                        <input type="text" id="TKetOrder" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-md-2">Tgl. Start:</div>
                    <div class="col-md-3">
                        <input type="text" id="TMulai" class="form-control bg-white" disabled readonly>
                    </div>
                    <div class="col-md-2 text-end">Tgl. Finish:</div>
                    <div class="col-md-3">
                        <input type="text" id="TSelesai" class="form-control bg-white" disabled readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-md-2">Nama Bagian:</div>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="text" id="TBagian" class="form-control" readonly
                                placeholder="Pilih bagian...">
                            <button type="button" class="btn btn-secondary" id="btnBagian" title="Cari Bagian">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <input type="hidden" id="TIdBagian" value="">
                    </div>
                </div>
            </fieldset>

            <!-- Filter Bulan / Tahun + OK -->
            <div class="row align-items-end mb-3">
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-lg-4">
                            <label class="form-label">Bulan:</label>
                            <input type="number" id="TBln" class="form-control" min="1" max="12"
                                maxlength="2" value="{{ $bulan }}">
                        </div>
                        <div class="col-lg-4">
                            <label class="form-label">Tahun:</label>
                            <input type="number" id="TThn" class="form-control" min="2000" max="2100"
                                maxlength="4" value="{{ $tahun }}">
                        </div>
                        <div class="col-lg-4 d-flex align-items-end">
                            <button type="button" id="btnOK" class="btn btn-primary fw-bold w-100">OK</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="border p-2 rounded" style="background-color: #f8f9fa;">
                        <span class="fw-bold">Keterangan: </span>
                        <span class="legend-box filled"></span> Ada jadwal pengerjaan
                    </div>
                </div>
            </div>

            <!-- Grafik Hari -->
            <div id="dayGrid" class="day-grid mb-4"></div>

            <div class="row mt-3 pt-3 border-top">
                <div class="col-md-12 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-danger fw-bold px-4">Keluar</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.grafikOrderConfig = {
            routeGetOrder: "{{ route('GPS.InfoPengerjaanGrafikOrder.get-order') }}",
            routeGetBagianList: "{{ route('GPS.InfoPengerjaanGrafikOrder.get-bagian-list') }}",
            routeGetJadwal: "{{ route('GPS.InfoPengerjaanGrafikOrder.get-jadwal') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/InformasiPengerjaan/infoPengerjaanGrafikOrder.js') }}"></script>
@endsection
