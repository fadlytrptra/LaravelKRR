@extends('layouts.appJumboBag')
@section('content')
@section('title', 'Maintenance Kegiatan Mesin JBB')

<style>
    .input-error {
        outline: 1px solid red;
        text-decoration-color: red;
    }

    .show-important {
        display: flex !important;
    }

    .hide-important {
        display: none !important;
    }

    .show-important-block {
        display: block !important;
    }

    .flatpickr-form-control {
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        width: 100%;
        height: calc(1.5em + 0.75rem + 2px);
    }

    #table_logMesin th {
        white-space: nowrap;
    }

    #table_logMesin {
        width: 100% !important;
    }

    #table_logMesin th:nth-child(6),
    #table_logMesin td:nth-child(6) {
        min-width: 250px !important;
        width: 250px !important;
        max-width: 250px !important;
        white-space: normal;
        overflow-wrap: anywhere;
    }

    #table_logMesin th:nth-child(5),
    #table_logMesin td:nth-child(5) {
        min-width: 150px !important;
        width: 150px !important;
        max-width: 150px !important;
        white-space: normal;
        overflow-wrap: anywhere;
    }
</style>
<link href="{{ asset('css/ABM/MaintenanceKegiatanMesin.css') }}" rel="stylesheet">
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            {{-- button untuk munculin create Order Kerja --}}
            <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahKegiatanMesin" type="button">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah Log Mesin</div>
            </button>
            <input type="hidden" name="nomorUser" id="nomorUser" value="{{ $user }}">
            <div class="card">
                <div class="card-header">Log Mesin Printing JBB</div>
                <div class="card-body RDZMobilePaddingLR0" style="overflow-x: auto;">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="lokasi" class="form-label">Lokasi</label>
                            <select id="lokasi" class="form-select form-select-sm" style="width: 100%">
                                <option>Tropodo</option>
                                <option>Mojosari</option>
                                {{-- @foreach ($listLokasi as $d)
                                    <option value="{{ $d->idLokasi }}">
                                        {{ $d->idLokasi . ' | ' . $d->nama_lokasi }}
                                    </option>
                                @endforeach --}}
                            </select>
                        </div>
                    </div>
                    <br>
                    {{-- <div class="row">
                        <div class="col-5">
                            <label for="radiobutton" class="form-check-label" id="labelRedisplay">Tanggal
                                Pemeriksaan</label>
                            <div class="row">
                                <div class="col">
                                    <input type="date" class="form-control font-weight-bold" id="tgl_awal"
                                        name="tgl_awal">
                                    <label for="tgl_awal" class="form-label"></label>
                                </div>
                                <div>
                                    <label for="sampai_dengan">s/d</label>
                                </div>
                                <div class="col">
                                    <input type="date" class="form-control font-weight-bold" id="tgl_akhir"
                                        name="tgl_akhir">
                                    <label for="tgl_akhir" class="form-label"></label>
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="col-12">
                                <button class="btn btn-info mt-4 w-100" id="btn_redisplay">Redisplay</button>
                            </div>
                        </div>
                    </div> --}}
                    <table id="table_logMesin" class="table table-bordered table-striped" style="width:100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Id Log</th>
                                <th>Tgl Log</th>
                                <th>Mesin</th>
                                <th>Shift</th>
                                <th>KB Tabel Hit.</th>
                                <th>Warna Tinta</th>
                                <th>Tot. Berat Tinta Awal (KG)</th>
                                <th>Tot. Berat Tinta Akhir (KG)</th>
                                <th>Tot. Berat Pemakaian Tinta (KG)</th>
                                <th>Tot. Jumlah Kain (PCS)</th>
                                <th>Tot. Hasil Printing (PCS)</th>
                                <th>Tot. Berat Kain (KG)</th>
                                <th>Tot. Afalan Printing (KG)</th>
                                <th>User Input</th>
                                <th>Action</th>
                                {{-- @if ($user == '4405' || $user == '4221' || $user == '4259' || $user == '8982' || $user == '4451' || $user == '4384' || $user == '4199')
                                    <th>Action</th>
                                @endif --}}
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

@include('JumboBag.Transaksi.KegiatanMesinPrinting.ModalMaintenanceKegiatanMesinPrinting')
<script src="{{ asset('js/JumboBag/Transaksi/MaintenanceKegiatanMesinPrinting.js') }}"></script>
@endsection
