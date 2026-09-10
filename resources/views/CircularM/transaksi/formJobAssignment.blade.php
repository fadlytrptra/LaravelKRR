@extends('Circular.layouts.app')

@section('title')
    Penugasan Mesin Terhadap Order
@endsection

@section('content')
    {{-- jQuery UI --}}
    <link rel="stylesheet" type="text/css" href="{{ asset('library/jQuery-UI/tabs.min.css') }}">

    {{-- vis.js Timeline --}}
    <link rel="stylesheet" type="text/css" href="{{ asset('library/vis-timeline/vis-timeline-graph2d.min.css') }}">

    <style>
        body {
            /* font-family: Arial, sans-serif; */
            margin: 0;
            padding: 0;
        }

        h1 {
            text-align: center;
            color: #343a40;
        }

        .highlight {
            background-color: #f8f9fa;
        }

        .special {
            background-color: #f0f0f0;
        }

        .checkbox_order {
            pointer-events: none;
        }

        #table_order tbody tr {
            cursor: pointer;
        }

        .drag-handle {
            cursor: move;
        }
    </style>

    <table id="table_order" class="table table-bordered table-hover">
        <thead>
            <th></th>
            <th>Id Order</th>
            <th>Nama Barang</th>
            <th>Jumlah Order</th>
            <th>Rencanca Mulai</th>
            <th>Rencana Selesai</th>
            <th>Info</th>
        </thead>
        <tbody></tbody>
    </table>

    <div class="row mt-3">
        <div class="col-md-8"></div>

        <div class="col-md-4 d-flex justify-content-end">
            <button type="button" id="btn_proses" class="btn btn-primary mx-3">Tentukan Prioritas Order</button>
            <button type="button" id="btn_keluar" class="btn btn-secondary mx-3">Batalkan Pilihan</button>
        </div>
    </div>

    <ul class="nav nav-tabs mt-3">
        <li class="nav-item">
            <button class="nav-link active" id="nav-order-tab" data-bs-toggle="tab" data-bs-target="#nav-order"
                type="button" role="tab" aria-controls="nav-order" aria-selected="true">Prioritas Order</button>
        </li>

        <li class="nav-item">
            <button class="nav-link" id="nav-mesin-tab" data-bs-toggle="tab" data-bs-target="#nav-mesin" type="button"
                role="tab" aria-controls="nav-mesin" aria-selected="true" disabled>Prioritas Mesin</button>
        </li>

        <li class="nav-item">
            <button class="nav-link" id="nav-waktu-tab" data-bs-toggle="tab" data-bs-target="#nav-waktu" type="button"
                role="tab" aria-controls="nav-waktu" aria-selected="true" disabled>Timeline Order</button>
        </li>

        <li class="nav-item">
            <button class="nav-link" id="nav-surat-tab" data-bs-toggle="tab" data-bs-target="#nav-surat" type="button"
                role="tab" aria-controls="nav-surat" aria-selected="true" disabled>Surat Perintah Kerja</button>
        </li>
    </ul>

    <div class="tab-content mt-3" style="margin-left: 2%; margin-right: 2%; min-height: 100vh;">
        <div class="tab-pane fade show active p-3" id="nav-order" role="tabpanel" aria-labelledby="nav-order-tab"
            tabindex="0">
            <h2>Prioritas Order</h2>
            <p>
                Jika urutan prioritas tidak sesuai, Anda dapat mengaturnya kembali sesuai kebutuhan dengan cara menyeret
                (<i>drag</i>)
                baris ke posisi yang diinginkan.
            </p>
            <div class="table-responsive mt-3">
                <table id="table_prioritas_order" class="table table-bordered align-middle draggable-table"
                    style="min-height: 25vh">
                    <thead>
                        <th style="align-content: center; min-width: 100px;">Id Order</th>
                        <th style="align-content: center; min-width: 175px;">Deadline Order (Hari)</th>
                        <th style="align-content: center; min-width: 175px;">Jumlah Order</th>
                        <th style="align-content: center; min-width: 100px;">Jumlah Mesin</th>
                        <th style="align-content: center; min-width: 175px;">Kecepatan Mesin /shift</th>
                        <th style="align-content: center; min-width: 50px;">Group Mesin</th>
                        <th style="align-content: center; min-width: 50px;">Nilai Order</th>
                    </thead>
                    <tbody>
                        <td colspan="7">
                            <h1 class="mt-3 mb-3">Tabel masih kosong..</h1>
                        </td>
                    </tbody>
                </table>
            </div>
            <div class="row mt-1">
                <div class="col-md-12 d-flex justify-content-end">
                    <button type="button" id="btn_simpan_order" class="btn btn-success mx-3" disabled>
                        <span id="spinnerMesin" class="spinner-border spinner-border-sm hidden" aria-hidden="true"></span>
                        Tentukan Prioritas Mesin
                    </button>
                    <button type="button" id="btn_batal_order" class="btn btn-danger" disabled>Batalkan Perubahan</button>
                </div>
            </div>

            <div id="container-order-breakdown"></div>
        </div>

        <div class="tab-pane fade show p-3" id="nav-mesin" role="tabpanel" aria-labelledby="nav-mesin-tab" tabindex="0">
            <h2>Prioritas Mesin</h2>
            <p>
                Prioritas mesin ditentukan berdasarkan kecepatan mesin per shift serta umur dari mesin tersebut.
            </p>

            <div class="mt-3"></div>

            <div id="placeholder_item">
                <div class="mt-3 d-flex justify-content-center">
                    <div id="spinnerKu" class="spinner-border text-secondary hidden" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

                <h5 class="mt-3">Id Order: -</h5>
                <div class="table-responsive">
                    <table id="table-mesin-xx" class="table table-bordered align-middle draggable-table"
                        style="min-height: 25vh">
                        <thead>
                            <th style="align-content: center; min-width: 100px;">Nama Mesin</th>
                            <th style="align-content: center; min-width: 175px;">Kecepatan Mesin /shift</th>
                            <th style="align-content: center; min-width: 175px;">Umur Mesin (Hari)</th>
                            <th style="align-content: center; min-width: 50px;">Nilai Mesin</th>
                        </thead>
                        <tbody>
                            <td colspan="4">
                                <h1 class="mt-3 mb-3">Tabel masih kosong..</h1>
                            </td>
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="container-mesin-breakdown"></div>

            <div class="row mt-3">
                <div class="col-md-12 d-flex justify-content-end">
                    <button type="button" id="btn_simpan_mesin" class="btn btn-success mx-3">
                        Tentukan Tabel Waktu
                    </button>

                    <button type="button" id="btn_batal_mesin" class="btn btn-danger">
                        Batalkan Perubahan
                    </button>
                </div>
            </div>
        </div>

        <div class="tab-pane fade show p-3" id="nav-waktu" role="tabpanel" aria-labelledby="nav-waktu-tab"
            tabindex="0">
            <h2>Timeline Pengerjaan Order</h2>
            <p>
                Timeline ini dibuat berdasarkan hasil prioritas order dan mesin yang telah ditentukan pada menu sebelumnya.
            </p>
            <div id="visualization"></div>
        </div>

        <div class="tab-pane fade show p-3" id="nav-surat" role="tabpanel" aria-labelledby="nav-surat-tab"
            tabindex="0">
            <h2>Pencetakan Surat Perintah Kerja</h2>
            <p>
                Setelah mengisi nomor surat dan menekan tombol cetak, proses pencetakan akan dilakukan pada tab baru.
            </p>
            <div class="row mt-5">
                <div class="col-md-12 d-flex justify-content-center">
                    <div class="input-group mx-3" style="width: 300px">
                        <span class="input-group-text">KRR/2024/CIR-</span>
                        <input id="nomor_surat" type="text" class="form-control" placeholder="Nomor Surat">
                    </div>
                    <button type="button" id="btn_print_spk" class="btn btn-primary mx-3">
                        Cetak Surat Perintah Kerja &nbsp;
                        <img src="http://127.0.0.1:8000/icons/filetype-pdf.svg" class="me-2" alt="PDF Icon">
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-5"></div>
@endsection

@section('custom_js')
    <script>
        const moveIcon = `<img src="{{ asset('icons/arrows-move.svg') }}" class="me-2 drag-handle" alt="Move Icon"> &nbsp; `
        // var serverSideUrl = "{{ url('/data-table/get-order-history') }}";
        var serverSideUrl = "{{ url('/data-table/get-pending-order') }}";
    </script>

    {{-- jQuery UI --}}
    <script src="{{ asset('library/jQuery-UI/jquery-ui.min.js') }}"></script>

    {{-- Moment.js --}}
    <script src="{{ asset('library/moment.min.js') }}"></script>

    {{-- vis.js Timeline --}}
    <script src="{{ asset('library/vis-timeline/vis-data.min.js') }}"></script>
    <script src="{{ asset('library/vis-timeline/vis-timeline-graph2d.min.js') }}"></script>

    <script src="{{ asset('js/Circular/transaksi/jobAssignment.js') }}"></script>
@endsection
