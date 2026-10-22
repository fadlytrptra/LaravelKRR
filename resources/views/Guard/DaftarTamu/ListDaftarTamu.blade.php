
@extends('layouts.appGuard')

@section('title', 'List Daftar Tamu')

@section('content')
<div class="container-fluid py-3 guest-list-page">
    <div class="card guest-list-card">
        <div class="card-header guest-list-header">
            <h5 class="mb-0">List Daftar Tamu</h5>
        </div>

        <div class="card-body guest-list-body">
            {{-- FILTER --}}
            <div class="guest-filter mb-4">

                {{-- Baris pertama: tanggal dan Redisplay --}}
                <div class="row g-3 align-items-end">
                    <div class="col-lg-3 col-md-4">
                        <label for="tanggalAwal" class="form-label">
                            Tanggal Daftar
                        </label>
                        <input type="date" id="tanggalAwal"
                            class="form-control"
                            value="{{ date('Y-m-d') }}">
                    </div>

                    <div class="col-lg-3 col-md-4">
                        <label for="tanggalAkhir" class="form-label">
                            Tanggal Akhir
                        </label>
                        <input type="date" id="tanggalAkhir"
                            class="form-control"
                            value="{{ date('Y-m-d') }}">
                    </div>

                    <div class="col-lg-3 col-md-4 guest-redisplay">
                        <button type="button" id="btnRedisplay"
                            class="btn btn-primary">
                            Redisplay
                        </button>
                    </div>
                </div>

                {{-- Baris kedua: lokasi di bawah tanggal --}}
                <div class="row mt-3">
                    <div class="col-lg-3 col-md-5">
                        <label for="filterLokasi" class="form-label">
                            Lokasi
                        </label>
                        <select id="filterLokasi" class="form-select">
                            <option value="">Semua</option>

                            @foreach ($daftarLokasi as $lokasi)
                                <option value="{{ $lokasi->Lokasi }}">
                                    {{ $lokasi->Lokasi }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-lg-3 col-md-5">
                        <label class="form-label d-block">
                            Status Jam Keluar
                        </label>

                        <button type="button"
                            id="btnFilterBelumKeluar"
                            class="btn btn-outline-secondary w-20"
                            data-active="0"
                            aria-pressed="false">
                            <i class="fas fa-filter me-1"></i>
                            Belum Isi Jam Keluar
                        </button>
                    </div>
                </div>
            </div>


            {{-- TABEL --}}
            <div class="table-responsive guest-table-wrapper">
                <table id="tableDaftarTamu"
                    class="table table-bordered table-hover w-100">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Hari, Jam Datang</th>
                            <th>Nama Tamu</th>
                            <th>Instansi</th>
                            <th>Bertemu Dengan</th>
                            <th>Keperluan</th>
                            <th>Lokasi</th>
                            <th>Foto Identitas</th>
                            <th>Foto Diri</th>
                            <th>Jam Keluar</th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach ($dataTamu as $tamu)

                        <tr
                            data-tanggal="{{ $tamu->TimeStamp
                                ? \Carbon\Carbon::parse($tamu->TimeStamp)->format('Y-m-d')
                                : '' }}"
                            data-lokasi="{{ $tamu->Lokasi }}"
                            data-jam-keluar="{{ empty($tamu->JamKeluar) ? '0' : '1' }}">


                            <td>{{ $loop->iteration }}</td>

                            <td>
                                {{ $tamu->TimeStamp
                                    ? \Carbon\Carbon::parse($tamu->TimeStamp)->format('d/m/Y H:i')
                                    : '-' }}
                            </td>

                            <td>{{ $tamu->NamaTamu }}</td>
                            <td>{{ $tamu->Instansi }}</td>
                            <td>{{ $tamu->BertemuDengan }}</td>
                            <td>{{ $tamu->Keperluan }}</td>
                            <td>{{ $tamu->Lokasi }}</td>

                            <td class="text-center">
                                <button type="button"
                                    class="btn btn-sm btn-info text-white btnLihatFoto"
                                    data-id="{{ $tamu->IdDaftarTamu }}"
                                    data-jenis="identitas">
                                    Lihat Foto
                                </button>
                            </td>

                            <td class="text-center">
                                <button type="button"
                                    class="btn btn-sm btn-info text-white btnLihatFoto"
                                    data-id="{{ $tamu->IdDaftarTamu }}"
                                    data-jenis="diri">
                                    Lihat Foto
                                </button>
                            </td>


                            <td>
                                @if ($tamu->JamKeluar)
                                    <div>
                                        <strong>
                                            {{ \Carbon\Carbon::parse($tamu->JamKeluar)->format('d/m/Y H:i') }}
                                        </strong>
                                    </div>

                                    {{-- @if ($tamu->TimeEdit)
                                        <small class="text-muted d-block">
                                            Terakhir diedit:
                                            {{ \Carbon\Carbon::parse($tamu->TimeEdit)->format('d/m/Y H:i') }}
                                            <br>
                                            Oleh: {{ $tamu->UserEdit ?? '-' }}
                                        </small>
                                    @endif --}}
                                @endif

                                <button
                                    type="button"
                                    class="btn btn-sm mt-1 btnJamKeluar {{ $tamu->JamKeluar ? 'btn-warning' : 'btn-success' }}"
                                    data-id="{{ $tamu->IdDaftarTamu }}"
                                    data-nama="{{ $tamu->NamaTamu }}"
                                    data-jam="{{ $tamu->JamKeluar
                                        ? \Carbon\Carbon::parse($tamu->JamKeluar)->format('H:i')
                                        : '' }}"
                                >
                                    {{ $tamu->JamKeluar ? 'Edit Jam Keluar' : 'Isi Jam Keluar' }}
                                </button>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

{{-- MODAL FOTO --}}
<div class="modal fade" id="modalFoto" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content guest-photo-modal">
            <div class="modal-header">
                <h5 class="modal-title" id="judulFoto">Foto Tamu</h5>
                <button type="button" class="btn-close"
                    data-bs-dismiss="modal" aria-label="Tutup"></button>
            </div>
            <div class="modal-body text-center"
                id="areaZoomFoto"
                style="overflow: auto; max-height: 75vh; padding: 10px;">

                <img id="gambarFoto"
                    src=""
                    alt="Foto tamu"
                    style="width: auto; height: auto; max-width: 100%; max-height: 70vh;
                            object-fit: contain; transform: none; cursor: zoom-in;">
            </div>
        </div>
    </div>
</div>

<meta name="csrf-token" content="{{ csrf_token() }}">

<style>
    .guest-list-page {
        padding-left: 4px;
        padding-right: 4px;
    }

    .guest-list-card {
        border: 1px solid #dee2e6;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
        overflow: hidden;
    }

    .guest-list-header {
        background: #f7f7f7;
        padding: 15px 22px;
        border-bottom: 1px solid #dee2e6;
    }

    .guest-list-header h5 {
        font-size: 17px;
        font-weight: 500;
        color: #263238;
    }

    .guest-list-body {
        padding: 24px 22px 18px;
    }

    .guest-filter {
        margin-bottom: 28px;
    }

    .guest-filter .form-label {
        display: block;
        margin-bottom: 6px;
        font-size: 14px;
        color: #263238;
    }

    .guest-filter .form-control,
    .guest-filter .form-select {
        min-height: 39px;
        border-color: #ced4da;
        border-radius: 4px;
        font-size: 14px;
    }

    .guest-redisplay .btn {
        width: 100%;
        min-height: 39px;
        background-color: #55a8e5;
        border-color: #263238;
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
    }

    .guest-redisplay .btn:hover {
        background-color: #328ed0;
    }

    .guest-location {
        margin-top: 12px;
    }

    .guest-table-wrapper {
        width: 100%;
    }

    #tableDaftarTamu {
        width: 100% !important;
        margin-bottom: 0 !important;
        border-color: #d7dce0;
        font-size: 13px;
        vertical-align: middle;
    }

    #tableDaftarTamu thead th {
        background-color: #212529;
        color: #fff;
        font-weight: 600;
        padding: 13px 12px;
        white-space: nowrap;
        border-color: #343a40;
    }

    #tableDaftarTamu tbody td {
        padding: 11px 12px;
        border-color: #dee2e6;
    }

    #tableDaftarTamu tbody tr:hover {
        background-color: #f4f8fb;
    }

    #tableDaftarTamu .btn {
        white-space: nowrap;
        border-radius: 4px;
    }

    #tableDaftarTamu .btn-info {
        background-color: #3498db;
        border-color: #3498db;
    }

    #tableDaftarTamu .btn-success {
        background-color: #28a745;
        border-color: #28a745;
    }

    #tableDaftarTamu .badge {
        font-size: 11px;
        padding: 7px 9px;
    }

    .guest-photo-modal {
        border-radius: 7px;
        overflow: hidden;
    }

    #gambarFoto {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
    }

    /* Penyesuaian kontrol DataTables */
    .dataTables_wrapper .dataTables_length,
    .dataTables_wrapper .dataTables_filter {
        margin-bottom: 14px;
        font-size: 13px;
    }

    .dataTables_wrapper .dataTables_filter input {
        min-height: 35px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        padding: 5px 9px;
        margin-left: 6px;
    }

    .dataTables_wrapper .dataTables_length select {
        min-height: 32px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        padding: 3px 7px;
    }

    .dataTables_wrapper .dataTables_info {
        padding-top: 15px;
        font-size: 13px;
    }

    .dataTables_wrapper .dataTables_paginate {
        padding-top: 8px;
    }

    .dataTables_wrapper .dataTables_paginate .paginate_button {
        border-radius: 4px !important;
    }

    @media (max-width: 767px) {
        .guest-list-body {
            padding: 16px 12px;
        }

        .guest-filter {
            margin-bottom: 20px;
        }

        .guest-redisplay {
            margin-top: 4px;
        }

        .guest-location {
            margin-top: 4px;
        }
    }
    /* Saat Semua dipilih, teks pada dropdown berwarna abu-abu */
    #filterLokasi.filter-lokasi-semua {
        color: #9ca3af !important;
    }

    /* Semua pilihan lokasi tetap berwarna hitam */
    #filterLokasi option {
        color: #212529 !important;
        background-color: #ffffff;
    }

    /* Khusus opsi Semua berwarna abu-abu */
    #filterLokasi option[value=""] {
        color: #9ca3af !important;
    }

    /* Jika lokasi tertentu dipilih, teks dropdown kembali hitam */
    #filterLokasi:not(.filter-lokasi-semua) {
        color: #212529 !important;
    }
</style>

<script>
    window.listDaftarTamuConfig = {
        resourceUrl: @json(url('/ListDaftarTamu'))
    };
</script>

<script src="{{ asset('js/Guard/DaftarTamu/ListDaftarTamu.js') }}"></script>
@endsection
