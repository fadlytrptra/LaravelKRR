@extends('layouts.appJumboBag')
@section('content')
@section('title', 'Maintenance Kegiatan Mesin Rope/Belt JBB')

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

    #table_logMesin th:nth-child(5),
    #table_logMesin td:nth-child(5) {
        min-width: 250px !important;
        width: 250px !important;
        max-width: 250px !important;
        white-space: normal;
        overflow-wrap: anywhere;
    }

    #table_logMesin th:nth-child(2),
    #table_logMesin td:nth-child(2) {
        min-width: 250px !important;
        width: 250px !important;
        max-width: 250px !important;
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
                <div class="card-header">Log Mesin Rope/Belt JBB</div>
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
                    <table id="table_logMesin" class="table table-bordered table-striped" style="width:100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>ID Log</th>
                                <th>Tgl Log</th>
                                <th>Jenis Potongan</th>
                                <th>Mesin</th>
                                <th>Shift</th>
                                <th>KB Tabel Hit.</th>
                                <th>User Input</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

@include('JumboBag.Transaksi.KegiatanMesinRopeBelt.ModalMaintenanceKegiatanRB')
<script src="{{ asset('js/JumboBag/Transaksi/MaintenanceKegiatanMesinRB.js') }}"></script>
@endsection
