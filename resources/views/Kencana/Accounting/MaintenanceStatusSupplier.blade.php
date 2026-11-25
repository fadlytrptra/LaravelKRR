@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance Status Supplier')

@include('Kencana.Accounting.ModalMaintenanceStatusSupplier')
<style>
    table.dataTable tbody th,
    table.dataTable tbody td {
        padding: 4px 5px
    }

    .card-body {
        flex: 1 1 auto;
        padding: 0.5rem;
    }

    .card-header {
        padding: .5rem 1rem;
        margin-bottom: 0;
        background-color: rgba(0, 0, 0, .03);
        border-bottom: 1px solid rgba(0, 0, 0, .125);
    }

    .py-4 {
        padding-bottom: 10px !important;
        padding-top: 20px !important;
    }

    .acs-div-filter {
        display: flex;
        width: 100%;
        flex-direction: column;
        margin-bottom: 4px;
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance Status Supplier</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <table style="width: 100%" id="table_StatusSupplier" name="table_StatusSupplier">
                            <thead class="table-dark">
                                <tr>
                                    <th>Id Supp</th>
                                    <th>Nama Supplier</th>
                                    <th>Saldo</th>
                                    <th>Saldo Rp</th>
                                    <th>Jns Supp</th>
                                    <th>Jns Bayar</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/MaintenanceStatusSupplier.js') }}"></script>
@endsection
