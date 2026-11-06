@extends('layouts.appGPS')

@section('title')
    Maintenance Data S/Part
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #pkj_spart_form {
            max-width: 900px;
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

        /* fieldset {
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            padding: 15px 15px 5px 15px;
            margin-bottom: 15px;
        }

        legend {
            font-size: 0.95rem;
            font-weight: bold;
            width: auto;
            padding: 0 8px;
        } */

        .status-barang {
            background-color: #e9ecef;
            font-weight: bold;
            color: #0d6efd;
            text-align: center;
        }
    </style>

    <div class="GPS_root">
        <div id="pkj_spart_form" class="form" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-gear me-2"></i>Order Kerja
            </h4>

            <div class="row mb-3">
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

            <fieldset id="Frame1" disabled>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">No. Order:</div>
                    <div class="col-lg-3">
                        <input type="text" id="TNoOd" class="form-control text-uppercase"
                            placeholder="Ketik & Enter..." autocomplete="off">
                    </div>
                    <div class="col-lg-2">
                        <span id="OdSts" class="fw-bold text-danger mt-1 d-inline-block"></span>
                    </div>
                    <div class="col-lg-2 aligned-text text-lg-end">Tanggal:</div>
                    <div class="col-lg-3">
                        <input type="date" id="TTanggal" class="form-control">
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

            <fieldset id="Frame2" class="mt-4" disabled>
                <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-wrench-adjustable me-2"></i>Data S/Part
            </h4>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Kd. Barang:</div>
                    <div class="col-lg-5">
                        <div class="input-group input-group-lookup" id="inputKdBarangIsi">
                            <input type="text" id="TKdBrg1" class="form-control" placeholder="Kode Barang (Enter)">
                        </div>
                        <div class="input-group input-group-lookup d-none" id="inputKdBarangKoreksi">
                            <input type="text" id="TKdBrg1_Koreksi" class="form-control" readonly
                                placeholder="Pilih S/Part existing...">
                            <button class="lookup-btn" id="btnKdBrg" title="Cari S/Part">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-1">
                        <input type="hidden" id="TNomer" value="">
                    </div>

                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Kat. Utama:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TKatUtama" class="form-control" placeholder="Kategori Utama">
                            <button class="lookup-btn btn-kategori" id="btnKatU" title="Cari Kategori Utama">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-1"><input type="hidden" id="TNoKU" value=""></div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Kategori:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TKategori" class="form-control" placeholder="Kategori">
                            <button class="lookup-btn btn-kategori" id="btnKat" title="Cari Kategori">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-1"><input type="hidden" id="TNoK" value=""></div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Sub Kategori:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TSubKat" class="form-control" placeholder="Sub Kategori">
                            <button class="lookup-btn btn-kategori" id="btnSub" title="Cari Sub Kategori">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-1"><input type="hidden" id="TNoS" value=""></div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Nama Barang:</div>
                    <div class="col-lg-8">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TNmBrg" class="form-control" placeholder="Nama Barang">
                            <button class="lookup-btn btn-kategori" id="btnBrg" title="Cari Barang">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Satuan:</div>
                    <div class="col-lg-3">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TSatuan" class="form-control" placeholder="Satuan">
                            <button class="lookup-btn" id="btnSatuan" title="Cari Satuan">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-1"><input type="hidden" id="TNoSat" value=""></div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Harga/Satuan:</div>
                    <div class="col-lg-3">
                        <input type="number" id="THarga" class="form-control text-end" value="0"
                            min="0" step="0.01">
                    </div>
                    <div class="col-lg-2 aligned-text text-lg-end">Status Barang:</div>
                    <div class="col-lg-2">
                        <input type="text" id="TSts" class="form-control status-barang" disabled readonly>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-2 aligned-text">Jumlah:</div>
                    <div class="col-lg-2">
                        <input type="number" id="TJml1" class="form-control text-end" value="0"
                            min="0" step="1">
                    </div>
                </div>

            </fieldset>

            <div class="row mt-3">
                <div class="col-md-7">
                    <button type="button" id="btnIsi" class="btn btn-primary fw-bold me-2">
                        <i class="bi bi-plus-circle"></i> ISI
                    </button>
                    <button type="button" id="btnKoreksi" class="btn btn-warning fw-bold text-dark me-2">
                        <i class="bi bi-pencil-square"></i> KOREKSI
                    </button>
                    <button type="button" id="btnHapus" class="btn btn-danger fw-bold">
                        <i class="bi bi-trash"></i> HAPUS
                    </button>
                </div>
                <div class="col-md-5 text-end">
                    <button type="button" id="btnProses" class="btn btn-success fw-bold px-4" disabled>PROSES</button>
                    <button type="button" id="btnKeluar" class="btn btn-secondary fw-bold px-4">KELUAR</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.pkjSparePartConfig = {
            routeGetOrder: "{{ route('GPS.pengerjaanSparePart.get-order') }}",
            routeGetBagianList: "{{ route('GPS.pengerjaanSparePart.get-bagian-list') }}",
            routeGetSpartExisting: "{{ route('GPS.pengerjaanSparePart.get-spart-existing') }}",
            routeGetSpartDetail: "{{ route('GPS.pengerjaanSparePart.get-spart-detail') }}",
            routeGetMohonBeli: "{{ route('GPS.pengerjaanSparePart.get-mohon-beli') }}",
            routeLoadBarang: "{{ route('GPS.pengerjaanSparePart.load-barang') }}",
            routeGetSatuanList: "{{ route('GPS.pengerjaanSparePart.get-satuan-list') }}",
            routeStore: "{{ route('GPS.pengerjaanSparePart.store') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalPengerjaan/pengerjaanSparePart.js') }}"></script>
@endsection
