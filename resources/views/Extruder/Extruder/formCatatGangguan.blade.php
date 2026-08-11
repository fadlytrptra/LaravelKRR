@extends('layouts.appExtruder')

@section('title')
    Pencatatan Gangguan Produksi
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

    <div id="tropodo_gangguan_produksi" class="form" data-aos="fade-up">
        <div id="card_transaksi" class="card mt-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-2">
                        <span class="aligned-text">Tanggal:</span>
                    </div>
                    <div class="col-lg-2">
                        <input type="date" id="tanggal" class="form-control">
                    </div>

                    <div class="col-lg-1"></div>

                    <div class="col-lg-1 row d-flex align-items-center">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="radio_status" id="radio_masuk">
                            <label class="form-check-label" for="radio_masuk">
                                Masuk
                            </label>
                        </div>
                    </div>

                    <div class="col-lg-1 row d-flex align-items-center">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="radio_status" id="radio_libur">
                            <label class="form-check-label" for="radio_libur">
                                Libur
                            </label>
                        </div>
                    </div>

                    <div class="col-lg-2">
                        <span class="aligned-text">No. Transaksi:</span>
                    </div>
                    <div class="col-lg-2">
                        <input type="text" id="no_transaksi" class="form-control">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Kode Mesin:</span>
                    </div>
                    <div class="col-lg-9">
                        <div class="input-group rounded">
                            <input type="text" id="id_mesin" class="form-control"
                                style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                            <input type="text" id="nama_mesin" class="form-control"
                                style="border-left: none; padding-left: 10px;" placeholder="Pilih kode Mesin..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_mesin" disabled> ...
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Komposisi:</span>
                    </div>
                    <div class="col-lg-9">
                        <div class="input-group rounded">
                            <input type="text" id="id_komposisi" class="form-control"
                                style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                            <input type="text" id="nama_komposisi" class="form-control"
                                style="border-left: none; padding-left: 10px;" placeholder="Pilih kode Komposisi..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_komposisi" disabled> ...
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Shift:</span>
                    </div>
                    <div class="col-lg-4">
                        <div class="input-group">
                            <input type="text" id="shift" class="form-control" style="max-width: 50px;">
                            <input type="time" id="shift_awal" class="form-control">
                            <span class="input-group-text">s/d</span>
                            <input type="time" id="shift_akhir" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="card_gangguan" class="card mt-3">
            <div class="card-body">

                <div class="row">
                    <div class="col-lg-2">
                        <span class="aligned-text">Gangguan:</span>
                    </div>

                    <div class="col-lg-9" style="margin-left: 7.5px">
                        <div class="input-group rounded">
                            <input type="text" id="id_gangguan" class="form-control"
                                style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                            <input type="text" id="nama_gangguan" class="form-control"
                                style="border-left: none; padding-left: 10px;" placeholder="Pilih kode Gangguan..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_gangguan" disabled> ...
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">

                    <div class="col-lg-5">
                        <div class="row">
                            <div class="col-lg-5">
                                <span class="aligned-text">Awal Gangguan:</span>
                            </div>

                            <div class="col-lg-6">
                                <input type="datetime-local" id="waktu_awal" class="form-control">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-5">
                                <span class="aligned-text">Akhir Gangguan:</span>
                            </div>

                            <div class="col-lg-6">
                                <input type="datetime-local" id="waktu_akhir" class="form-control"
                                    onblur="hitungWaktu()">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-5">
                                <span class="aligned-text">Jumlah Jam:</span>
                            </div>

                            <div class="col-lg-6">
                                <input type="number" id="jmlh_jam" class="form-control">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-5">
                                <span class="aligned-text">Jumlah Menit:</span>
                            </div>

                            <div class="col-lg-6">
                                <input type="number" id="jmlh_menit" class="form-control">
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 mt-3">
                        <label for="keterangan">Keterangan:</label>
                        <textarea id="keterangan" rows="5" cols="50" class="form-control"></textarea>
                    </div>

                </div>

            </div>
        </div>

        <div id="card_tabel" class="card mt-3">
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

                <table id="table_gangguan" class="hover cell-border">
                    <thead>
                        <tr>
                            <th>No. Transaksi</th>
                            <th>Tanggal</th>
                            <th>Id Mesin</th>
                            <th>Nama Mesin</th>
                            <th>Id Konversi</th>
                            <th>Id Gangguan</th>
                            <th>Nama Gangguan</th>
                            <th>Awal Gangguan</th>
                            <th>Akhir Gangguan</th>
                            <th>Jumlah Jam</th>
                            <th>Jumlah Menit</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php $tableWidth = 12; @endphp
                        <td colspan="{{ $tableWidth }}" style="padding-left: 250px">
                            <h1 class="mt-3">Tabel masih kosong...</h1>
                        </td>
                        @for ($i = 0; $i < $tableWidth - 1; $i++)
                            <td class="hidden"></td>
                        @endfor
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-5 text-center">
                <button type="button" id="btn_isi" class="btn btn-success" style="margin-right: 5px">Isi</button>
                <button type="button" id="btn_koreksi" class="btn btn-warning"
                    style="margin-right: 5px">Koreksi</button>
                <button type="button" id="btn_hapus" class="btn btn-danger">Hapus</button>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-5 text-center">
                <button type="button" id="btn_proses" class="btn btn-primary" style="margin-right: 5px"
                    disabled>Proses</button>
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

    <script src="{{ asset('js/Extruder/ExtruderNet/catatGangguan.js') }}"></script>
@endsection
