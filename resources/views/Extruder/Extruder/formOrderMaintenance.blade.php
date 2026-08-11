@extends('layouts.appExtruder')

@section('title')
    Maintenance Order
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

    <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">

    <div id="order_maintenance" class="form" data-aos="fade-up">
        <div class="row mt-3">
            <div class="col-lg-2 aligned-text">Tanggal:</div>
            <div class="col-lg-2">
                <input type="date" id="tanggal" class="form-control unclickable">
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-2 aligned-text">No. Order:</div>
            <div class="col-lg-2">
                <input type="text" id="no_order" class="form-control" disabled>
            </div>
        </div>

        <div class="row mt-3 mb-4">
            <div class="col-lg-2 aligned-text">Identifikasi Order:</div>
            <div class="col-lg-8">
                <input type="text" id="identifikasi" class="form-control" disabled>
            </div>
        </div>

        <table id="table_order" class="hover cell-border">
            <thead>
                <tr>
                    <th>Nama Type</th>
                    <th>Qty. Primer</th>
                    <th>Sat. Primer</th>
                    <th>Qty. Sekunder</th>
                    <th>Sat. Sekunder</th>
                    <th>Qty. Tritier</th>
                    <th>Sat. Tritier</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

        <div class="card mt-4">
            <div class="card-header">Detail Order</div>

            <div class="card-body">
                <div class="mt-3 row">
                    <div class="col-lg-2"><span class="aligned-text">Type Benang:</span></div>
                    <div class="col-lg-8">
                        <div class="input-group rounded">
                            <input type="text" id="nama_type_benang" class="form-control bg-white"
                                placeholder="Pilih Type Benang..." disabled readonly>
                            <button type="button" id="btn_lookup_benang" class="btn btn-secondary rounded-end" disabled>
                                ...
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-3 row">
                    <div class="col-lg-2"><span class="aligned-text">Primer:</span></div>
                    <div class="col-lg-2">
                        <div class="input-group">
                            <input type="number" min="0" id="primer_qty" class="form-control" placeholder="0"
                                disabled>
                            <span id="primer_sat" class="input-group-text"></span>
                        </div>
                    </div>
                </div>

                <div class="mt-3 row">
                    <div class="col-lg-2"><span class="aligned-text">Sekunder:</span></div>
                    <div class="col-lg-2">
                        <div class="input-group">
                            <input type="number" min="0" id="sekunder_qty" class="form-control" placeholder="0"
                                disabled>
                            <span id="sekunder_sat" class="input-group-text"></span>
                        </div>
                    </div>
                </div>

                <div class="mt-3 row">
                    <div class="col-lg-2"><span class="aligned-text">Tritier:</span></div>
                    <div class="col-lg-2">
                        <div class="input-group">
                            <input type="number" min="0" id="tritier_qty" class="form-control" placeholder="0"
                                disabled>
                            <span id="tritier_sat" class="input-group-text"></span>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <button type="button" id="btn_detail" class="btn btn-info float-end"
                            disabled>Tambah<br>Detail</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-5 text-center">
                <button type="button" id="btn_baru" class="btn btn-primary">Tambah</button>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-5 text-center">
                <button type="button" id="btn_proses" class="btn btn-success" disabled>Proses</button>
                <button type="button" id="btn_keluar" class="btn btn-danger">Keluar</button>
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

    <script src="{{ asset('js/Extruder/ExtruderNet/orderMaintenance.js') }}"></script>
@endsection
