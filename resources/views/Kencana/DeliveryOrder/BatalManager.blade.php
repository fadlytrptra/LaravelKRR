@extends('layouts.appKencana')
@section('content')
@section('title', 'Batal DO')
<script>
    $(document).ready(function() {
        $('#table_DO').DataTable({
            order: [
                [0, 'desc']
            ],
        });
    });
</script>
<link href="{{ asset('css/Kencana/batal-do-kencana.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @elseif (Session::has('error'))
                <div class="alert alert-danger">
                    <ul>
                        @foreach (Session::get('error') as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            <div class="card">
                <div class="card-header">Delivery Order Sudah ACC Manager</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div style="padding:10px; overflow: auto;">
                        <table id="table_DO" class="table table-bordered table-striped SP_datatable"
                            style="width:100%">
                            <thead class="thead-light">
                                <tr>
                                    <th>Nomor DO</th>
                                    <th>Tanggal </th>
                                    <th>ID Pesanan</th>
                                    <th>No SP</th>
                                    <th>Customer</th>
                                    <th>ID Barang</th>
                                    <th>Nama Barang</th>
                                    <th>Primer</th>
                                    <th>Sekunder</th>
                                    <th>Tritier</th>
                                    <th>ID Trans TMP</th>
                                    {{-- <th>Action</th> --}}

                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($data as $item)
                                    <tr>
                                        <td class="RDZPaddingTable RDZCenterTable">
                                            <div style="display: flex; align-items: center;gap:5px">
                                                <input type="checkbox" name="selected[]" id="id_do"
                                                    value="{{ $item->IDDO }}">{{ $item->IDDO }}
                                            </div>
                                        </td>
                                        <td class="RDZPaddingTable RDZCenterTable" style="white-space: nowrap">
                                            {{ date('m-d-Y', strtotime($item->tanggal)) }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->IDPesanan }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->IDSuratPesanan }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->NamaCust }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->IDBarang }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->NamaBarang }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">
                                            {{ number_format($item->QtyPrimer) }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">
                                            {{ number_format($item->QtySekunder) }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">
                                            {{ number_format($item->QtyTritier) }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->IdtransTmp }}</td>
                                        {{-- <td class="acs-td-button">
                                                <button type="button" class="btn btn-sm btn-danger" id="buttonBatal"
                                                    onclick="openModal('{{ $item->IdtransTmp }}','{{ $item->IDDO }}')"><span>&#x1F5D1;</span>
                                                    Batalkan</button>
                                            </td> --}}
                                    </tr>
                                @endforeach
                        </table>
                    </div>
                   <div style="margin-top: 15px;">
                        <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            id="buttonBatal"
                        >
                            <span>&#x1F5D1;</span>
                            Batalkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- The modal -->
<!-- MODAL BATAL DO -->
<div id="modalBatalDO" class="modal-batal-do">

    <div class="modal-batal-do-content">

        <div class="modal-batal-do-header">
            <div class="modal-batal-do-title">
                Batalkan Delivery Order
            </div>

            <button
                type="button"
                class="modal-batal-do-close"
                id="btnCloseModal"
            >
                &times;
            </button>
        </div>

        <form
            id="modal-form"
            method="POST"
            action="{{ url('Kencana/DeliveryOrderManager/destroy') }}"
        >

            {{ csrf_field() }}

            <div class="modal-batal-do-body">
                <div class="modal-form-group">

                    <label for="modal-value">
                        Keterangan Pembatalan
                    </label>

                    <input
                        type="text"
                        name="value"
                        id="modal-value"
                        value="Stok Kosong"
                        autocomplete="off"
                    >

                </div>

                <div class="modal-selected-info">

                    <span>
                        DO yang akan dibatalkan
                    </span>

                    <strong id="selectedDoCount">
                        0
                    </strong>

                </div>

                {{-- hidden input akan dibuat oleh Javascript --}}

            </div>

            <div class="modal-batal-do-footer">

                <button
                    type="button"
                    class="btn-modal-cancel"
                    id="btnCancelModal"
                >
                    Batal
                </button>

                <button
                    type="submit"
                    class="btn-modal-delete"
                    id="btnConfirmBatal"
                >
                    <span>&#x1F5D1;</span>
                    Ya, Batalkan
                </button>

            </div>

        </form>

    </div>

</div>
<script src="{{ asset('js/Kencana/Batal-do.js') }}"></script>
@endsection
