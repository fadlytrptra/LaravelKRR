@extends('layouts.appKencana')
@section('content')
@section('title', 'ACC DO Kencana')
<script>
    $(document).ready(function() {
        $('#table_DO').DataTable({
            order: [
                [0, 'asc']
            ],
            paging: false,
            scrollY: "650px",
            scrollCollapse: true,
        });
    });
</script>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @endif
            <div class="card">
                <div class="card-header">Delivery Order Belum ACC Manager</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div style="overflow: auto;padding: 10px">
                        <table id="table_DO" class="table table-bordered table-striped SP_datatable" style="width:100%">
                            <thead class="thead-light">
                                <tr>
                                    <th>Nomor DO</th>
                                    <th>Tanggal </th>
                                    <th>No SP</th>
                                    <th>Customer</th>
                                    <th>Kode Barang</th>
                                    <th>Nama Barang</th>
                                    <th>Min DO</th>
                                    <th>Max DO</th>
                                    <th>Primer</th>
                                    <th>Sekunder</th>
                                    <th>Tritier</th>
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
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->IDSuratPesanan }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->NamaCust }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->KodeBarang }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->NamaBarang }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->MinKirimDO }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->MaxKirimDO }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ (float) $item->QtyPrimer }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ (float) $item->QtySekunder }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ (float) $item->QtyTritier }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <input type="checkbox" id="checkAll">
                        <label for="checkAll">Pilih Semua</label>
                    </div>
                    <br>
                    <div>
                        <form
                            onsubmit="return confirm('Apakah Anda Yakin untuk menyetujui surat pesanan yang sudah dipilih?');"
                            id="form_submitSelected"action="{{ url('Kencana/DeliveryOrderManager/up') }}" method="POST"
                            enctype="multipart/form-data">
                            {{-- {{ url('/SuratPesananManager/upall') }} --}}
                            {{ csrf_field() }}
                            <button class="btn btn-sm btn-success" id="button_submitSelected"><span>&#x2713;</span>
                                Setujui Delivery Order yang Dipilih</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/AccManagerDO.js') }}"></script>
@endsection
