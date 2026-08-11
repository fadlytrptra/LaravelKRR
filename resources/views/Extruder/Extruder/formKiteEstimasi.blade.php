@extends('layouts.appExtruder')

@section('title')
    Estimasi KITE
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

    <div id="kite_estimasi" class="form" data-aos="fade-up">
        <div class="card">
            <div class="card-header">Data KITE</div>

            <div class="card-body">

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
                    <div class="col-lg-2 aligned-text">Tanggal Start:</div>
                    <div class="col-lg-4">
                        <input type="date" id="tgl_start" class="form-control unclickable" readonly>
                        <input type="hidden" id="meter">
                        <input type="hidden" id="roll">
                        <input type="hidden" id="meter_awal">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Kode Barang:</div>
                    <div class="col-lg-4">
                        <div class="input-group rounded">
                            <input type="text" id="display_kode_barang" class="form-control"
                                placeholder="-- Pilih Kode Barang --" readonly>
                            <button type="button" id="btn_lookup_kode_barang" class="btn btn-secondary rounded-end"> ... </button>
                        </div>
                    </div>
                    <input type="hidden" id="id_order">
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Nama Barang:</div>
                    <div class="col-lg-10">
                        <input type="text" id="nama_barang" class="form-control" disabled>
                    </div>
                </div>

                <div class="row mt-3 mb-3">

                    <div class="col-lg-4">

                        <div class="row">
                            <div class="col-lg-6 aligned-text">Bahan PP:</div>
                            <div class="col-lg-6" style="height: fit-content;">
                                <input type="text" id="bahan_pp" class="form-control" disabled>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-6 aligned-text">Benang:</div>
                            <div class="col-lg-6" style="height: fit-content;">
                                <input type="text" id="benang" class="form-control" disabled>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-6 aligned-text">Hasil:</div>
                            <div class="col-lg-6" style="height: fit-content;">
                                <input type="text" id="hasil" class="form-control" disabled>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-6 aligned-text">Sisa:</div>
                            <div class="col-lg-6" style="height: fit-content;">
                                <input type="text" id="sisa" class="form-control" disabled>
                            </div>
                        </div>

                        <div id="estimase_bahan" class="card mt-3">
                            <div class="card-header">Estimasi Bahan</div>

                            <div class="card-body">
                                <div class="row mt-3">
                                    <div class="col-lg-4 aligned-text">Tanggal:</div>
                                    <div class="col-lg-8">
                                        <input type="date" id="estimasi_tgl" class="form-control">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-4 aligned-text">Bahan PP:</div>
                                    <div class="col-lg-8">
                                        <input type="number" id="estimasi_pp" class="form-control">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-4 aligned-text">CaCO3:</div>
                                    <div class="col-lg-8">
                                        <input type="text" id="estimasi_caco3" class="form-control" disabled>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-4 aligned-text">Benang:</div>
                                    <div class="col-lg-8">
                                        <input type="text" id="estimasi_benang" class="form-control" disabled>
                                    </div>
                                </div>

                                <div class="text-center mt-3">
                                    <button type="button" id="btn_proses" class="btn btn-primary">Proses</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="col-lg-8">
                        <table id="table_order" class="hover cell-border">
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>PP</th>
                                    <th>CaCO3</th>
                                    <th>Benang</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>

                </div>
            </div>

            <div class="card-footer">
                <div class="text-end mt-3">
                    <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
                </div>
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

    <script src="{{ asset('js/Extruder/ExtruderNet/kiteEstimasi.js') }}"></script>
@endsection
