@extends('layouts.appKencana') @section('content')
@section('title', 'Input PEB')
<script>
    $(document).ready(function() {
        $('#table_DO').DataTable({
            processing: true,
            serverSide: true,
            order: [0, 'desc'],
            "ajax": {
                "url": "{{ url('dopeb') }}", // Use the 'route' helper function to generate the URL
                "dataType": "json",
                "type": "post", // Change this to "post"
                "data": {
                    _token: "{{ csrf_token() }}"
                }
            },
            "columns": [{
                    "data": "ID DO"
                },
                {
                    "data": "Tanggal DO"
                },
                {
                    "data": "Nomor SP"
                },
                {
                    "data": "Kode Barang"
                },
                {
                    "data": "Nama Type"
                },
                {
                    "data": "Id Type"
                },
                {
                    "data": "PEB"
                },
                {
                    "data": "Actions"
                }
            ]
        });
    });
</script>
<link href="{{ asset('css/Kencana/input-PEB.css') }}" rel="stylesheet">
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0"> {{-- button untuk munculin create DO --}}
            {{-- <button
                    class="acs-icon-btn acs-add-btn acs-float" onclick="openNewWindow('DeliveryOrder/create')">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah DO</div>
                </button> --}}
            <div class="card">
                <div class="card-header">Data Delivery Order</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <table id="table_DO" class="table table-bordered table-striped SP_datatable">
                        <thead class="thead-light">
                            <tr>
                                <th>ID DO</th>
                                <th>Tanggal DO</th>
                                <th>Nomor SP</th>
                                <th>Kode Barang</th>
                                <th>Nama Type</th>
                                <th>Id Type</th>
                                <th>PEB</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {{-- <tbody>
                            @foreach ($data as $item)
                                <tr>
                                    <td class="RDZPaddingTable RDZCenterTable">{{ $item->IDDO }} </td>
                                    <td class="RDZPaddingTable RDZCenterTable">{{ substr($item->tanggal, 0, 10) }} </td>
                                    <td class="RDZPaddingTable RDZCenterTable">{{ $item->IDSuratPesanan }}</td>
                                    <td class="RDZPaddingTable RDZCenterTable">{{ $item->KodeBarang }}</td>
                                    <td class="RDZPaddingTable RDZCenterTable">{{ $item->NamaType }}</td>
                                    <td class="RDZPaddingTable RDZCenterTable">{{ $item->IdType }}</td>
                                    <td class="RDZPaddingTable RDZCenterTable">{{ $item->PEB ?? '' }}</td>
                                    <td class="acs-td-button"> <button class="btn btn-sm btn-primary"
                                            onclick="showModal({{ $item->IDDO }})"><span>&#x270E;</span> Input/Edit
                                            PEB</button>
                                        <form onsubmit="return confirm('Apakah Anda Yakin ?');"
                                                action="{{ route('deliveryorder.destroy', $item->IDDO) }}"
                                                method="POST" enctype="multipart/form-data"> {{ csrf_field() }} <button
                                                    type="submit" class="btn btn-sm btn-danger"><span>&#x1F5D1;</span>
                                                    Hapus</button> </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody> --}}
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="myModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2 id="modal-title"></h2>
        <input type="hidden" name="IDDO" id="IDDO">
        <input type="text" name="PEB" id="PEB" placeholder="Masukkan PEB" class="input">
        <button class="btn btn-sm btn-primary" id="button_submitSelected" style="margin-top:5px">Proses</button>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/Kencana/InputPEB.js') }}"></script>
@endsection
