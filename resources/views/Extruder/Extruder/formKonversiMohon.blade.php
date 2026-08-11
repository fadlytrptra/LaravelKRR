@extends('layouts.appExtruder')

@section('title')
    Permohonan Konversi
@endsection

@section('content')
    <style>
        #table_komposisi,
        #table_konversi {
            font-size: 12px;
        }

        #tableLookupGeneric tbody tr:hover {
            background-color: #f1f1f1;
        }

        #tableLookupGeneric tbody tr:focus {
            outline: none;
        }

        #tableLookupGeneric tbody tr:focus td {
            background-color: #0d6efd !important;
            color: white !important;
        }

        .input-group>.form-control,
        .input-group>.btn,
        .input-group>.input-group-text {
            height: 38px !important;
            display: flex;
            align-items: center;
        }

        input[type="number"].form-control {
            display: block;
        }

        .hidden {
            display: none !important;
        }

        .unclickable {
            pointer-events: none;
            background-color: #e9ecef;
        }

        #table_komposisi tbody tr.keyboard-selected {
            background-color: #0d6efd !important;
            color: white !important;
        }

        #table_komposisi tbody tr.keyboard-selected td {
            color: white !important;
        }
    </style>

    <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] ?? 'B' }}">

    <div id="konversi_mohon" class="form" data-aos="fade-up">
        <div class="form-group row mt-3">
            <div class="col-lg-2"><span class="aligned-text">No:</span></div>
            <div class="col-lg-8">
                <div class="input-group rounded">
                    <input type="text" id="id_konversi" class="form-control"
                        placeholder="Pilih atau Masukan No Konversi..." disabled>
                    <input type="hidden" id="txt_konversi">
                    <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_konversi" disabled>
                        ...
                    </button>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-4">
                <label for="txt_order">No. Order:</label>
                <div class="input-group rounded">
                    <input type="text" id="id_order" class="form-control" style="max-width: 120px; border-right: none;"
                        placeholder="ID" disabled>
                    <input type="text" id="txt_order" class="form-control" style="border-left: none;"
                        placeholder="Pilih Order..." disabled>
                    <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_order" disabled>...</button>
                </div>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-2">
                <label for="lot">Lot:</label>
                <input type="number" id="lot" class="form-control" placeholder="0" min="0" step="1"
                    disabled>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-4">
                <label for="tanggal">Tanggal:</label>
                <input type="date" id="tanggal" class="form-control" disabled>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-4">
                <label for="txt_spek">Spek:</label>
                <div class="input-group rounded">
                    <input type="hidden" id="id_spek">
                    <input type="text" id="txt_spek" class="form-control rounded-start" placeholder="Pilih Spek..."
                        disabled>
                    <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_spek" disabled>...</button>
                </div>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-2">
                <label for="ukuran">Ukuran:</label>
                <input type="number" id="ukuran" class="form-control" placeholder="0" step="0.01" min="0"
                    disabled>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-4">
                <label for="shift">Shift:</label>
                <div class="input-group rounded">
                    <input type="text" id="shift" class="form-control" style="max-width: 50px; border-right: none;"
                        disabled>
                    <input type="time" id="shift_awal" class="form-control" style="border-left: none;" value="00:00">
                    <span class="input-group-text">s/d</span>
                    <input type="time" id="shift_akhir" class="form-control" value="00:00">
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-4">
                <label for="txt_mesin">Mesin:</label>
                <div class="input-group rounded">
                    <input type="text" id="id_mesin" class="form-control" style="max-width: 120px; border-right: none;"
                        placeholder="ID" disabled>
                    <input type="text" id="txt_mesin" class="form-control" style="border-left: none;"
                        placeholder="Pilih Mesin..." disabled>
                    <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_mesin"
                        disabled>...</button>
                </div>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-2">
                <label for="denier">Denier:</label>
                <input type="number" id="denier" class="form-control" placeholder="0" step="1"
                    min="0" disabled>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-2">
                <label for="waktu_mulai">Mulai:</label>
                <input type="time" id="waktu_mulai" class="form-control" value="00:00">
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-4">
                <label for="txt_komposisi">Komposisi:</label>
                <div class="input-group rounded">
                    <input type="text" id="id_komposisi" class="form-control"
                        style="max-width: 120px; border-right: none;" placeholder="ID" disabled>
                    <input type="text" id="txt_komposisi" class="form-control" style="border-left: none;"
                        placeholder="Pilih Komposisi..." disabled>
                    <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_komposisi"
                        disabled>...</button>
                </div>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-2">
                <label for="warna">Warna:</label>
                <input type="text" id="warna" class="form-control" placeholder="....." disabled>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-2">
                <label for="waktu_selesai">Selesai:</label>
                <input type="time" id="waktu_selesai" class="form-control" value="00:00">
            </div>
            <div class="col-lg-2">
                <input type="text" id="no_urut" class="form-control hidden" placeholder="Nomor Urut">
            </div>
        </div>

        <div class="card mt-4">
            <div class="card-body">
                <table id="table_konversi" class="hover cell-border" tabindex="0">
                    <thead>
                        <tr>
                            <th>Nama Type</th>
                            <th>Qty. Primer</th>
                            <th>Sat. Primer</th>
                            <th>Qty. Sekunder</th>
                            <th>Sat. Sekunder</th>
                            <th>Qty. Tritier</th>
                            <th>Sat. Tritier</th>
                            <th>Presentase</th>
                            <th>Jenis</th>
                            <th>Id Sub-kel.</th>
                            <th>IdType</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

                <div class="row mt-4">
                    <div class="col-lg-6">
                        <table id="table_komposisi" class="hover cell-border" tabindex="1">
                            <thead>
                                <tr>
                                    <th>Jenis</th>
                                    <th>Nama Type</th>
                                    <th>Sub-kelompok</th>
                                    <th>Id Subkel.</th>
                                    <th>IdType</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>

                    <div class="col-lg-6">
                        <div class="row">
                            <div class="col-lg-12">
                                <label>Item Produksi:</label>
                                <div class="input-group">
                                    <input type="text" id="id_produksi" class="form-control" disabled
                                        style="border-right: none;">
                                    <input type="text" id="nama_produksi" class="form-control"
                                        style="width: 12.5vw; border-left: none;" disabled>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-6">
                                <label>Stok Primer:</label>
                                <input type="number" id="stok_primer" class="form-control" disabled>
                            </div>
                            <div class="col-lg-1"></div>
                            <div class="col-lg-5">
                                <label>Primer:</label>
                                <div class="input-group">
                                    <input type="number" id="primer" class="form-control" placeholder="0"
                                        min="0" step="any" disabled>
                                    <span id="sat_primer" class="input-group-text"></span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-6">
                                <label>Stok Sekunder:</label>
                                <input type="number" id="stok_sekunder" class="form-control" disabled>
                            </div>
                            <div class="col-lg-1"></div>
                            <div class="col-lg-5">
                                <label>Sekunder:</label>
                                <div class="input-group">
                                    <input type="number" id="sekunder" class="form-control" placeholder="0"
                                        min="0" step="any" disabled>
                                    <span id="sat_sekunder" class="input-group-text"></span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-6">
                                <label>Stok Tritier:</label>
                                <input type="number" id="stok_tritier" class="form-control" disabled>
                            </div>
                            <div class="col-lg-1"></div>
                            <div class="col-lg-5">
                                <label>Tritier:</label>
                                <div class="input-group">
                                    <input type="number" id="tritier" class="form-control" placeholder="0"
                                        min="0" step="any" disabled>
                                    <span id="sat_tritier" class="input-group-text"></span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-lg-3">
                                <input type="text" id="jenis" class="form-control" placeholder="Jenis..."
                                    disabled>
                            </div>
                            <div class="col-lg-9">
                                <div class="float-end">
                                    <button type="button" id="btn_baru_detail" class="btn btn-success" disabled>Tambah
                                        Item</button>
                                    <button type="button" id="btn_koreksi_detail" class="btn btn-warning"
                                        disabled>Koreksi</button>
                                    <button type="button" id="btn_hapus_detail" class="btn btn-danger"
                                        disabled>Hapus</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-3 mb-5">
            <div class="col-md-5 text-center">
                <button type="button" id="btn_baru_master" class="btn btn-success">Konversi Baru</button>
                <button type="button" id="btn_koreksi_master" class="btn btn-warning">Koreksi</button>
                <button type="button" id="btn_hapus_master" class="btn btn-danger">Hapus</button>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-5 text-center">
                <button type="button" id="btn_proses" class="btn btn-primary" disabled>Proses</button>
                <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalLookupGeneric" tabindex="-1" aria-labelledby="modalLookupGenericLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header bg-light border-bottom">
                    <h5 class="modal-title fw-semibold text-dark fs-5" id="lookupTitle">
                        <i class="bi bi-view-list text-primary me-2"></i>Pilih Data
                    </h5>
                    <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="row g-3 align-items-center mb-3">
                        <div class="col-12 col-md-auto">
                            <div class="d-flex align-items-center text-muted small">
                                <span class="me-2">Tampilkan</span>
                                <select id="showPerPage" class="form-select form-select-sm shadow-none"
                                    style="width: 75px;">
                                    <option value="5">5</option>
                                    <option value="10" selected>10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>
                                <span class="ms-2">baris</span>
                            </div>
                        </div>
                        <div class="col-12 col-md-auto ms-md-auto">
                            <div class="input-group input-group-sm shadow-sm">
                                <span class="input-group-text bg-white text-muted border-end-0">
                                    <i class="bi bi-search"></i>
                                </span>
                                <input type="text" id="lookupSearch" class="form-control border-start-0 shadow-none"
                                    placeholder="Cari data...">
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive border rounded-3">
                        <table class="table table-hover align-middle mb-0" id="tableLookupGeneric">
                            <thead class="table-light text-muted">
                                <tr id="lookupHeaders"></tr>
                            </thead>
                            <tbody id="lookupBody" class="border-top-0"></tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer d-flex flex-column flex-sm-row justify-content-between bg-light border-top">
                    <nav aria-label="Navigasi Halaman" class="mb-3 mb-sm-0">
                        <ul class="pagination pagination-sm mb-0" id="paginationControls"></ul>
                    </nav>
                    <button type="button" class="btn btn-secondary btn-sm px-4" data-bs-dismiss="modal">Tutup</button>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/Extruder/ExtruderNet/konversiMohon_new.js') }}"></script>
@endsection
