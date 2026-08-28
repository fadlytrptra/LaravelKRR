@extends('layouts.appOrderPembelian')
@section('content')
@section('title', 'Supplier')
<link href="{{ asset('css/Supplier.css') }}" rel="stylesheet">
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<style>
    .input-error {
        border-color: red;
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahSupplier" data-toggle="modal"
                data-target="#tambahSupplierModal">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah Supplier</div>
            </button>
            <div class="card">
                <div class="card-header">Supplier</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div style="overflow: auto;">
                        <table id="table_Supplier" class="table table-bordered" style="width:100%;white-space: nowrap;">
                            <thead class="table-primary">
                                <tr>
                                    <th>IdSupplier</th>
                                    <th>Nama Supplier </th>
                                    <th>Alamat</th>
                                    <th>Kota</th>
                                    <th>Negara</th>
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
@include('Kencana.SupplierKencana.ModalTambahSupplier')
<script src="{{ asset('js/Kencana/SupplierKencana.js') }}"></script>
@endsection
