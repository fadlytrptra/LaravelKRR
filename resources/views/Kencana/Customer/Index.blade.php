@extends('layouts.appKencana')

@section('title', 'Kencana Customer')

@section('content')

<style>
    .custom-modal-width {
        max-width: 90%;
    }
</style>

<link href="{{ asset('css/Kencana/customer.css') }}" rel="stylesheet">
<link href="{{ asset('css/style.css') }}" rel="stylesheet">

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">

            <button
                class="acs-icon-btn acs-add-btn acs-float"
                data-bs-toggle="modal"
                data-bs-target="#modalCustomer"
                data-typeForm="tambah"
                id="buttonTambahCustomer">

                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah Customer</div>
            </button>

            <div class="card">

                <div class="card-header">
                    Customer
                </div>

                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    <table
                        id="table_Customer"
                        class="table table-bordered table-striped"
                        style="width:100%">

                        <thead class="thead-dark">
                            <tr>
                                <th>IdCustomer</th>
                                <th>Nama Customer</th>
                                <th>Kota Kirim</th>
                                <th>Negara</th>
                                <th>Action</th>
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


{{-- =========================================================
     ROUTES UNTUK KENCANA CUSTOMER
     ========================================================= --}}
<script>
    window.customerRoutes = {

        // GET /Kencana/Customer/getallcustomer
        getAll: @json(
            route('Kencana.Customer.show', 'getallcustomer')
        ),

        // GET /Kencana/Customer/getCertainCustomer
        getCertain: @json(
            route('Kencana.Customer.show', 'getCertainCustomer')
        ),

        // POST /Kencana/Customer
        store: @json(
            route('Kencana.Customer.store')
        ),

        // GET /Kencana/Customer/{Customer}/edit
        edit: @json(
            route('Kencana.Customer.edit', [
                'Customer' => '__ID__'
            ])
        ),

        // PUT/PATCH /Kencana/Customer/{Customer}
        update: @json(
            route('Kencana.Customer.update', [
                'Customer' => '__ID__'
            ])
        ),

        // DELETE /Kencana/Customer/{Customer}
        destroy: @json(
            route('Kencana.Customer.destroy', [
                'Customer' => '__ID__'
            ])
        ),

        // GET /Kencana/Customer
        index: @json(
            route('Kencana.Customer.index')
        )
    };
</script>


{{-- Modal harus tersedia sebelum JS dijalankan --}}
@include('Kencana.Customer.ModalCustomer')


{{-- Kencana Customer JS --}}
<script src="{{ asset('js/Kencana/KencanaCustomer.js') }}"></script>

@endsection