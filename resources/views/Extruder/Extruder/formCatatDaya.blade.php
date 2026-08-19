@extends('layouts.appExtruder')

@section('title')
    Pencatatan Daya Produksi
@endsection

@section('content')
    <style>
        table.cell-border {
            border-collapse: collapse !important;
            width: 100% !important;
        }

        table.cell-border,
        table.cell-border th,
        table.cell-border td {
            border: 1px solid #555555;
        }

        table.cell-border tbody tr:last-child td {
            border-bottom: none;
        }

        table.cell-border th {
            background-color: #dddddd;
        }

        .dataTables_filter {
            margin-bottom: 15px !important;
        }
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

    <div id="tropodo_daya" class="form" data-aos="fade-up">
        <div class="card mt-3">
            <div id="card_daya" class="card-body">
                <div class="row">
                    <div class="col-lg-2">
                        <span class="aligned-text">Tanggal:</span>
                    </div>

                    <div class="col-lg-3">
                        <input type="date" id="tanggal" class="form-control">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Mesin:</span>
                    </div>

                    <div class="col-lg-7">
                        {{-- <select id="select_mesin" class="form-select">
                            <option selected disabled>-- Pilih Mesin --</option>
                            @foreach ($formData['listMesin'] as $d)
                                <option value="{{ $d->IdMesin }}">{{ $d->IdMesin . ' | ' . $d->TypeMesin }}</option>
                            @endforeach
                        </select> --}}
                        <div class="input-group rounded">
                            <input type="text" class="form-control" id="id_mesin"
                                style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                            <input type="text" id="nama_mesin" class="form-control" style="border-left: none;"
                                placeholder="Pilih Mesin..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_mesin">...</button>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-6">

                        <div class="row">
                            <div class="col-lg-4">
                                <span class="aligned-text">Jam Produksi:</span>
                            </div>
                            <div class="col-lg-6">
                                <input type="time" id="jam_produksi" class="form-control">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-4">
                                <span class="aligned-text">Counter:</span>
                            </div>
                            <div class="col-lg-6">
                                <input type="text" id="counter" class="form-control">
                            </div>
                        </div>

                    </div>

                    <div class="col-lg-3">
                        <input type="text" id="teks_id" class="form-control" style="margin-top: 1.75em;"
                            placeholder="Id KWaH..">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Faktor Kali:</span>
                    </div>

                    <div class="col-lg-3">
                        <input type="text" id="faktor" class="form-control">
                    </div>
                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-3 d-flex align-items-center justify-content-end">
                        <span class="aligned-text">Data Bulan/Tahun:</span>
                    </div>

                    <div class="col-lg-3">
                        <div class="input-group">
                            <input type="text" id="data_tgl" class="form-control">
                            <button type="button" id="btn_ok" class="btn btn-primary">OK</button>
                        </div>
                    </div>
                </div>

                <table id="table_daya" class="hover cell-border">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Tanggal</th>
                            <th>Id Mesin</th>
                            <th>Jam Produksi</th>
                            <th>Counter</th>
                            <th>Faktor Kali</th>
                            <th>Id User</th>
                            <th>Id KWaH</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-5 text-center">
                <button type="button" id="btn_isi" class="btn btn-success">Isi</button>
                <button type="button" id="btn_koreksi" class="btn btn-warning">Koreksi</button>
                <button type="button" id="btn_hapus" class="btn btn-danger">Hapus</button>
            </div>

            <div class="col-md-2"></div>

            <div class="col-md-5 text-center">
                <button type="button" id="btn_proses" class="btn btn-primary">Proses</button>
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
                                    placeholder="Cari komposisi...">
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


    <script src="{{ asset('js/Extruder/ExtruderNet/catatDaya.js') }}"></script>
@endsection
