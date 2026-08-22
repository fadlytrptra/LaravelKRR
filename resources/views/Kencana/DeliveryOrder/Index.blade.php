@extends('layouts.appKencana') @section('content')
@section('title', 'Delivery Order')
    <script>
        $(document).ready(function() {
            $('#table_DO').DataTable({
                order: [
                    [0, 'desc']
                ],
            });
        });
    </script>
    <link href="{{ asset('css/Kencana/permohonan-do.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0"> {{-- button untuk munculin create DO --}} <button
                    class="acs-icon-btn acs-add-btn acs-float" onclick="openNewWindow('{{ route('Kencana.DeliveryOrder.create') }}')"
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah DO</div>
                </button>
                <div class="card">
                    <div class="card-header">Delivery Order Belum ACC Manager</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <table id="table_DO" class="table table-bordered table-striped SP_datatable" style="width:100%">
                            <thead class="thead-light">
                                <tr>
                                    <th>Nomor DO</th>
                                    <th>Nama Type</th>
                                    <th>ID Surat Pesanan</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($data as $item)
                                    <tr>
                                        @php
                                            $NamaType = trim(substr($item->Uraian, 0, strrpos($item->Uraian, '|') - 1));
                                            $IDSuratPesanan = trim(explode('|', $item->Uraian)[1]);
                                        @endphp
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->IDDO }} </td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $NamaType }} </td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $IDSuratPesanan }}</td>
                                        <td class="acs-td-button"> <button class="btn btn-sm btn-primary"
                                                onclick="openNewWindow('{{ url('DeliveryOrder/' . $item->IDDO . '/edit') }}')"
                                                href=""><span>&#x270E;</span> Koreksi</button>
                                            <form onsubmit="return confirm('Apakah Anda Yakin ?');"
                                                action="{{ route('deliveryorder.destroy', $item->IDDO) }}"
                                                method="POST" enctype="multipart/form-data"> {{ csrf_field() }} <button
                                                    type="submit" class="btn btn-sm btn-danger"><span>&#x1F5D1;</span>
                                                    Hapus</button> </form>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
