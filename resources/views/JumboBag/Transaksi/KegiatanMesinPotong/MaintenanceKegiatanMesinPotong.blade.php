@extends('layouts.appABM')
@section('content')
@section('title', 'Maintenance Kegiatan Mesin ABM')

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

    .flatpickr-form-control{
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
        <div class="col-md-10 RDZMobilePaddingLR0">
            {{-- button untuk munculin create Order Kerja --}}
            <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahKegiatanMesin" type="button">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah Log Mesin</div>
            </button>
            <div class="card">
                <div class="card-header">Log Mesin Potong JBB</div>
                <div class="card-body RDZMobilePaddingLR0" style="overflow-x: auto;">
                    <table id="table_logMesin" class="table table-bordered table-striped" style="width:100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Tgl Log</th>
                                <th>Jenis Potongan</th>
                                <th>Mesin</th>
                                <th>Shift</th>
                                <th>KB Tabel Hit.</th>
                                <th>Hasil LBR</th>
                                <th>Hasil KG</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {{-- <tfoot>
                            <tr>
                                <th colspan="5" style="text-align:right">Grand Total:</th>
                                <th id="totalLembar"></th>
                                <th id="totalKg"></th>
                                <th></th>
                            </tr>
                        </tfoot> --}}
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

@include('JumboBag.Transaksi.KegiatanMesinPotong.ModalMaintenanceKegiatanMesinPotong')
<script src="{{ asset('js/JumboBag/Transaksi/MaintenanceKegiatanMesinPotong.js') }}"></script>
@endsection
