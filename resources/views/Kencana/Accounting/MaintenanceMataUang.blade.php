@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance Mata Uang')

@include('Kencana.Accounting.ModalMaintenanceMataUang')
<style>
    .custom-modal-width {
        max-width: 40%;
        /* Adjust the percentage as needed */
    }

    table.dataTable tbody th,
    table.dataTable tbody td {
        padding: 2px 3px
    }
</style>
<div class="container-fluid">
    <button class="acs-icon-btn acs-add-btn acs-float" data-bs-toggle="modal" data-bs-target="#modalMataUang"
        data-typeForm="tambah" id="tambahButtonMataUang" type="button">
        <div class="acs-add-icon"></div>
        <div class="acs-btn-txt">Tambah Mata Uang</div>
    </button>
    <div class="row justify-content-center">
        <div class="col-md-6 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">List Mata Uang</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div style="overflow: auto;">
                        <table id="table_MataUang" class="table table-bordered" style="width:100%;white-space: nowrap;">
                            <thead class="table-primary">
                                <tr>
                                    <th>Kode Mata Uang</th>
                                    <th>Nama Mata Uang </th>
                                    <th>Symbol Mata Uang </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/MaintenanceMataUang.js') }}"></script>
@endsection
