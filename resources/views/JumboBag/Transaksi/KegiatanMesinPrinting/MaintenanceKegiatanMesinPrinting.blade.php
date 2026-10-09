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
                    <table id="table_logMesin" class="table table-bordered table-striped" style="width:100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Id Log</th>
                                <th>Tgl Log</th>
                                <th>Mesin</th>
                                <th>Shift</th>
                                <th>KB Tabel Hit.</th>
                                <th>Pemakaian Tinta (Warna)</th>
                                <th>Berat Kain KG</th>
                                <th>Afalan Printing KG</th>
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
