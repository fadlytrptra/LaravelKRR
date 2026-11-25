@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance Bank')

@include('Kencana.Accounting.ModalMaintenanceBank')
<style>
    .custom-modal-width {
        max-width: 90%;
        /* Adjust the percentage as needed */
    }

    table.dataTable tbody th,
    table.dataTable tbody td {
        padding: 2px 3px
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <button class="acs-icon-btn acs-add-btn acs-float" data-bs-toggle="modal" data-bs-target="#modalBank"
                data-typeForm="tambah" id="tambahButtonBank" type="button">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah Bank</div>
            </button>
            <div class="card">
                <div class="card-header">List Bank</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div style="overflow: auto;">
                        <table id="table_Bank" class="table table-bordered" style="width:100%;white-space: nowrap;">
                            <thead class="table-primary">
                                <tr>
                                    <th>Id Bank</th>
                                    <th>Nama Bank </th>
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
<script src="{{ asset('js/Kencana/MaintenanceBank.js') }}"></script>
@endsection
