@extends('layouts.appExtruder')

@section('title')
    Master KITE
@endsection

@section('content')
    <style>
        #tableLookupGeneric tbody tr:hover {
            background-color: #f1f1f1;
        }

        #tableLookupGeneric tbody tr:focus {
            outline: none
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

    <div id="kite_master" class="form" data-aos="fade-up">

        <div class="row mt-3">
            <div class="col-lg-6">
                <div class="d-flex align-items-center" style="justify-content: center;">
                    <div class="form-check">
                        <input class="form-check-input custom-radio" type="radio" name="fasilitas"
                            id="fasilitas_pembebasan" value="pembebasan">
                        <label class="form-check-label custom-radio" for="fasilitas_pembebasan">Fasilitas
                            Pembebasan</label>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="d-flex align-items-center" style="justify-content: center;">
                    <div class="form-check">
                        <input class="form-check-input custom-radio" type="radio" name="fasilitas"
                            id="fasilitas_pengembalian" value="pengembalian">
                        <label class="form-check-label custom-radio" for="fasilitas_pengembalian">Fasilitas
                            Pengembalian</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-2 d-flex justify-content-end">
                <span class="aligned-text">Tgl Start:</span>
            </div>
            <div class="col-lg-6">
                <input type="date" class="form-control" id="tgl_start">
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-2 d-flex justify-content-end">
                <span class="aligned-text">Kode Barang:</span>
            </div>
            <div class="col-lg-6">
                <div class="input-group rounded">
                    <input type="text" id="display_kode_barang" class="form-control rounded-start"
                        placeholder="-- Pilih Kode Barang --" readonly>
                    <button type="button" id="btn_lookup_kode_barang" class="btn btn-secondary me-2 rounded-end"> ...
                    </button>
                    <button type="button" id="btn_cek_kode" class="btn btn-secondary rounded-2">Cek</button>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-2 d-flex justify-content-end">
                <span class="aligned-text">Nama Barang:</span>
            </div>
            <div class="col-lg-9">
                <input type="text" class="form-control" id="nama_barang" disabled>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-2 d-flex justify-content-end">
                <span class="aligned-text">Bahan PP:</span>
            </div>
            <div class="col-lg-3">
                <input type="number" min="0" class="form-control" id="bahan_pp">
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-2 d-flex justify-content-end">
                <span class="aligned-text">Benang:</span>
            </div>
            <div class="col-lg-3">
                <input type="number" min="0" class="form-control" id="benang" disabled>
            </div>
            <input type="hidden" id="meter">
            <input type="hidden" id="roll">
            <input type="hidden" id="meter_awal">
        </div>

        <div class="row mt-3">
            <div class="col-lg-2 d-flex justify-content-end">
                <span class="aligned-text">Hasil:</span>
            </div>
            <div class="col-lg-3">
                <input type="number" min="0" class="form-control" id="hasil" disabled>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-2 d-flex justify-content-end">
                <span class="aligned-text">Sisa:</span>
            </div>
            <div class="col-lg-3">
                <input type="number" min="0" class="form-control" id="sisa" disabled>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-12 row justify-content-lg-center">
                <div class="text-center col-lg-auto"><button type="button" class="btn btn-primary"
                        id="btn_simpan">Simpan</button></div>
                <div class="col-lg-4"></div>
                <div class="text-center col-lg-auto"><button type="button" class="btn btn-secondary"
                        id="btn_keluar">Keluar</button></div>
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
                                    placeholder="Pencarian cepat...">
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

    <script src="{{ asset('js/Extruder/ExtruderNet/kiteMaster.js') }}"></script>
@endsection
