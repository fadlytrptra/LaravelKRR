@extends('layouts.appExtruder')

@section('title')
    Komposisi Bahan Mojosari
@endsection

@section('content')
    <style>
        #table_komposisi,
        #table_afalan {
            font-size: 12px;
        }

        .sorting {
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
    </style>

    <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">

    <div id="form_komposisi_mojosari" class="form" data-aos="fade-up">

        <div id="master" class="row mt-3">
            <div class="col-md-7">
                <div class="form-group">
                    <label>Komposisi:</label>
                    <div class="input-group rounded">
                        <input type="text" id="id_komposisi" class="form-control" style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                        <input type="text" id="nama_komposisi" class="form-control" style="border-left: none; padding-left: 10px"
                            placeholder="Pilih atau ketik nama komposisi baru..." disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_komposisi" disabled> ...
                        </button>
                    </div>
                </div>

                <div class="form-group mt-3">
                    <label>Mesin:</label>
                    <div class="input-group rounded">
                        <input type="text" id="id_mesin" class="form-control" style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                        <input type="text" id="nama_mesin" class="form-control" style="border-left: none; padding-left: 10px"
                            placeholder="Pilih Mesin..." disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_mesin" disabled> ...
                        </button>
                    </div>
                </div>

                <div class="form-group mt-3">
                    <label>Hasil Produksi:</label>
                    <div class="input-group rounded">
                        <input type="text" id="id_hp" class="form-control" style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                        <input type="text" id="nama_hp" class="form-control" style="border-left: none; padding-left: 10px"
                            placeholder="Pilih Hasil Produksi..." disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_hp" disabled> ...
                        </button>
                    </div>
                </div>

                <div class="form-group mt-3">
                    <label>Hasil Produksi NG:</label>
                    <div class="input-group rounded">
                        <input type="text" id="id_ng" class="form-control" style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                        <input type="text" id="nama_ng" class="form-control" style="border-left: none; padding-left: 10px"
                            placeholder="Pilih Hasil Produksi NG..." disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_ng" disabled> ...
                        </button>
                    </div>
                </div>

                <div class="form-group mt-3">
                    <label>Afalan:</label>
                    <div class="input-group rounded">
                        <input type="text" id="id_af" class="form-control" style="max-width: 150px; border-right: none" placeholder="ID" disabled>
                        <input type="text" id="nama_af" class="form-control" style="border-left: none; padding-left: 10px"
                            placeholder="Pilih Afalan..." disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_af" disabled> ...
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-md-5">
                <div class="row" style="height: 20%;">
                    <div id="radio_container" class="hidden">
                        <div class="col-md-4 row d-flex align-items-center">
                            <div class="form-check" style="display: flex; justify-content: center;">
                                <input class="form-check-input" type="radio" name="radio_jenis" id="radio_bb">
                                <label class="form-check-label" for="radio_bb" style="padding-left: 7.5px"> Komposisi
                                </label>
                            </div>
                        </div>
                        <div class="col-md-4 row d-flex align-items-center">
                            <div class="form-check" style="display: flex; justify-content: center;">
                                <input class="form-check-input" type="radio" name="radio_jenis" id="radio_hp">
                                <label class="form-check-label" for="radio_hp" style="padding-left: 7.5px"> Hasil Produksi
                                </label>
                            </div>
                        </div>
                        <div class="col-md-4 row d-flex align-items-center">
                            <div class="form-check" style="display: flex; justify-content: center;">
                                <input class="form-check-input" type="radio" name="radio_jenis" id="radio_af">
                                <label class="form-check-label" for="radio_af" style="padding-left: 7.5px"> Afalan </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" style="height: 80%;">
                    <div class="col-md-4 d-flex align-items-end">
                        <button type="button" id="btn_tambah_afalan" class="btn btn-secondary rounded-3"
                            style="margin-bottom: 7.5px" disabled>Tambah Afalan</button>
                    </div>
                    <div class="col-md-8">
                        <table id="table_afalan" class="hover cell-border">
                            <thead>
                                <tr>
                                    <th>Kode Barang</th>
                                    <th>Nama Type</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-body">
                <table id="table_komposisi" class="hover cell-border" tabindex="0">
                    <thead>
                        <tr>
                            <th>Jenis</th>
                            <th>Id Type</th>
                            <th>Nama Type</th>
                            <th>Qty. Primer</th>
                            <th>Sat. Primer</th>
                            <th>Qty. Sekunder</th>
                            <th>Sat. Sekunder</th>
                            <th>Qty. Tritier</th>
                            <th>Sat. Tritier</th>
                            <th>Persentase</th>
                            <th>Id Objek</th>
                            <th>Nama Objek</th>
                            <th>Id Kelut.</th>
                            <th>Nama Kelut.</th>
                            <th>Id Kelompok</th>
                            <th>Kelompok</th>
                            <th>Id Subkel.</th>
                            <th>Subkel.</th>
                            <th>Kode Barang</th>
                            <th>Cadangan</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

                <div class="row mt-3">
                    <div class="col-md-7 form-group">
                        <label>Objek:</label>
                        <div class="input-group rounded">
                            <input type="text" id="id_objek" class="form-control" style="max-width: 150px; border-right: none;" placeholder="ID">
                            <input type="text" id="nama_objek" class="form-control" style="border-left: none; padding-left: 10px"
                                placeholder="Pilih Objek..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_objek" disabled>
                                ... </button>
                        </div>
                    </div>

                    <div class="col-md-4 form-group">
                        <label>Primer:</label>
                        <div class="input-group">
                            <input type="number" min="0" id="primer" class="form-control" style="border-right: none" placeholder="0"
                                disabled>
                            <input type="text" id="sat_primer" class="form-control" style="border-left: none" disabled>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-7 form-group">
                        <label>Kelompok Utama:</label>
                        <div class="input-group rounded">
                            <input type="text" id="id_kelut" class="form-control" style="max-width: 150px; border-right: none;" placeholder="ID">
                            <input type="text" id="nama_kelut" class="form-control" style="border-left: none; padding-left: 10px"
                                placeholder="Pilih Kelompok Utama..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_kelut" disabled>
                                ... </button>
                        </div>
                    </div>

                    <div class="col-md-4 form-group">
                        <label>Sekunder:</label>
                        <div class="input-group">
                            <input type="number" min="0" id="sekunder" class="form-control" style="border-right: none" placeholder="0"
                                disabled>
                            <input type="text" id="sat_sekunder" class="form-control" style="border-left: none" disabled>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-7 form-group">
                        <label>Kelompok:</label>
                        <div class="input-group rounded">
                            <input type="text" id="id_kelompok" class="form-control" style="max-width: 150px; border-right: none" placeholder="ID">
                            <input type="text" id="nama_kelompok" class="form-control" style="border-left: none; padding-left: 10px"
                                placeholder="Pilih Kelompok..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_kelompok"
                                disabled> ... </button>
                        </div>
                    </div>

                    <div class="col-md-4 form-group">
                        <label>Tritier:</label>
                        <div class="input-group">
                            <input type="number" min="0" id="tritier" class="form-control" style="border-right: none" placeholder="0"
                                disabled>
                            <input type="text" id="sat_tritier" class="form-control" style="border-left: none" disabled>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-7 form-group">
                        <label>Sub-kelompok:</label>
                        <div class="input-group rounded">
                            <input type="text" id="id_subkel" class="form-control" style="max-width: 150px; border-right: none;" placeholder="ID">
                            <input type="text" id="nama_subkel" class="form-control" style="border-left: none; padding-left: 10px"
                                placeholder="Pilih Sub-kelompok..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_subkel" disabled>
                                ... </button>
                        </div>
                    </div>

                    <div class="col-md-2 form-group">
                        <label>Persentase:</label>
                        <div class="input-group">
                            <input type="number" id="persentase" min="0" class="form-control" placeholder="0"
                                disabled>
                            <span class="input-group-text">%</span>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-7 form-group">
                        <label>Type:</label>
                        <div class="input-group rounded">
                            <input type="text" id="id_type" class="form-control" style="max-width: 150px; border-right: none" placeholder="ID">
                            <input type="text" id="nama_type" class="form-control" style="border-left: none; padding-left: 10px"
                                placeholder="Pilih Type..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_type" disabled>
                                ... </button>
                        </div>
                    </div>

                    <div class="col-md-4 form-group">
                        <label>Kode Barang:</label>
                        <input type="text" id="kode_barang" class="form-control" disabled>
                    </div>
                </div>

                <div class="row mt-3 justify-content-between">
                    <div class="col-md-3" style="padding-left: 75px;">
                        BB: Bahan Baku<br>
                        BP: Bahan Pembantu
                    </div>

                    <div class="col-md-3 form-group" style="margin-right: 218px">
                        <label>Cadangan:</label>
                        <div class="input-group">
                            <input type="text" id="cadangan" class="form-control" value="0" disabled>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-md-12 d-flex justify-content-center">
                        <button type="button" id="btn_cadangan_detail" class="btn btn-info" style="margin-right: 2em;"
                            disabled>Tambah Cadangan</button>
                        <button type="button" id="btn_tambah_detail" class="btn btn-success" style="margin-right: 2em;"
                            disabled>Tambah Bahan</button>
                        <button type="button" id="btn_koreksi_detail" class="btn btn-warning"
                            style="margin-right: 2em;" disabled>Koreksi</button>
                        <button type="button" id="btn_hapus_detail" class="btn btn-danger" disabled>Hapus</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-3 mb-5">
            <div class="col-md-6 text-center">
                <button type="button" id="btn_baru_master" class="btn btn-success">Komposisi Baru</button>
                <button type="button" id="btn_koreksi_master" class="btn btn-warning">Koreksi</button>
                <button type="button" id="btn_hapus_master" class="btn btn-danger">Hapus</button>
            </div>

            <div class="col-md-1 hidden">
                <input type="number" min="0" id="persentase2" class="form-control hidden" placeholder="0">
            </div>
            <div class="col-md-1 hidden">
                <input type="number" min="0" id="cadangan2" class="form-control hidden" placeholder="0">
            </div>

            <div class="col-md-4 text-center">
                <button type="button" id="btn_proses" class="btn btn-primary" disabled>Proses</button>
                <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
            </div>
        </div>
    </div>

    {{-- MODAL LOOKUP --}}
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
                                    placeholder="Cari Type Benang...">
                            </div>
                        </div>
                    </div>

                    <div class="table-responsive border rounded-3">
                        <table class="table table-hover align-middle mb-0" id="tableLookupGeneric">
                            <thead class="table-light text-muted">
                                <tr id="lookupHeaders">
                                </tr>
                            </thead>
                            <tbody id="lookupBody" class="border-top-0">
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="modal-footer d-flex flex-column flex-sm-row justify-content-between bg-light border-top">
                    <nav aria-label="Navigasi Halaman" class="mb-3 mb-sm-0">
                        <ul class="pagination pagination-sm mb-0" id="paginationControls">
                        </ul>
                    </nav>
                    <button type="button" class="btn btn-secondary btn-sm px-4" data-bs-dismiss="modal">Tutup</button>
                </div>

            </div>
        </div>
    </div>

    <script src="{{ asset('js/Extruder/ExtruderNet/komposisiMojosari.js') }}"></script>
@endsection
