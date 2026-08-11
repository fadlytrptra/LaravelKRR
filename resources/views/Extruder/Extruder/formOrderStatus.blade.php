@extends('layouts.appExtruder')

@section('title')
    Pembatalan Order
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

    <div id="order_status" class="form" data-aos="fade-up">
        <div class="form-group mt-3 row">
            <div class="col-lg-2"><span class="aligned-text">No. Order:</span></div>
            <div class="col-lg-9">
                <div class="input-group rounded">
                    <input type="text" id="no_order" class="form-control" style="max-width: 150px; border-right: none;" placeholder="ID"
                        disabled>
                    <input type="text" id="nama_order" class="form-control" style="border-left: none; padding-left: 10px" placeholder="Pilih Order..." disabled>
                    <button type="button" id="btn_lookup_order" class="btn btn-secondary rounded-end"> ... </button>
                </div>
            </div>

        </div>

        <div class="card mt-3 mb-4">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-2 aligned-text">Tanggal:</div>
                    <div class="col-lg-3">
                        <input type="date" id="tanggal" class="form-control" disabled>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Spek:</div>
                    <div class="col-lg-9">
                        <input type="text" id="spek" class="form-control" disabled>
                    </div>
                </div>

                <div class="row mt-3">

                    <div class="col-lg-2 aligned-text">Jumlah Order:</div>
                    <div class="col-lg-3">
                        <input type="number" min="0" id="jmlh_order" class="form-control" placeholder="0" disabled>
                    </div>

                    <div class="col-lg-3 aligned-text">Jumlah Produksi:</div>
                    <div class="col-lg-3">
                        <input type="number" min="0" id="jmlh_produksi" class="form-control" placeholder="0"
                            disabled>
                    </div>

                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Status:</div>
                    <div class="col-lg-3">
                        <select id="select_status" class="form-select">
                            <option selected disabled>-- Pilih Status --</option>
                            <option value="FINISH">Finish</option>
                            <option value="CANCEL">Cancel</option>
                            <option value="STOP">Stop</option>
                        </select>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Keterangan:</div>
                    <div class="col-lg-9">
                        <input type="text" id="keterangan" class="form-control">
                    </div>
                </div>
            </div>
        </div>

        <table id="table_order" class="hover cell-border">
            <thead>
                <tr>
                    <th>Tanggal Order</th>
                    <th>Spek</th>
                    <th>Jumlah Order</th>
                    <th>Jumlah Konversi</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

        <div class="float-end mt-3 mb-3">
            <button id="btn_proses" type="button" class="btn btn-success" disabled>Proses</button>
            <button id="btn_keluar" type="button" class="btn btn-danger" style="margin-left: 25px">Keluar</button>
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
                                    placeholder="Cari No Order...">
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

    <script src="{{ asset('js/Extruder/ExtruderNet/orderStatus.js') }}"></script>
@endsection
