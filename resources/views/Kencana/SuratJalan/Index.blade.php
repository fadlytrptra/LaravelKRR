@extends('layouts.appKencana') @section('content')
@section('title', 'Surat Jalan Kencana')
    <script>
        $(document).ready(function() {
            $('#table_SJ').DataTable({
                order: [
                    [0, 'desc']
                ],
            });
        });
    </script>
    <link href="{{ asset('css/Kencana/permohonan-sj.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0"> {{-- button untuk munculin create DO --}} <button
                    class="acs-icon-btn acs-add-btn acs-float" onclick="openNewWindow('Kencana/SuratJalan/create')">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah SJ</div>
                </button>
                <div class="card">
                    <div class="card-header">Surat Jalan Belum ACC Manager</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <table id="table_SJ" class="table table-bordered table-striped SP_datatable" style="width:100%">
                            <thead class="thead-light">
                                <tr>
                                    <th>Customer</th>
                                    <th>ID Pengiriman</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($data as $item)
                                    <tr>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->NamaCust }} </td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->IDPengiriman }} </td>
                                        <td class="acs-td-button"> <button class="btn btn-sm btn-primary"
                                                onclick="openNewWindow('{{ url('Kencana/SuratJalan/' . $item->IDPengiriman . '/edit') }}')"
                                                href=""><span>&#x270E;</span> Koreksi</button>
                                            <form onsubmit="return confirm('Apakah Anda Yakin ?');"
                                                action="{{ route('suratjalan.destroy', $item->IDPengiriman) }}" method="POST"
                                                enctype="multipart/form-data"> {{ csrf_field() }} <button type="submit"
                                                    class="btn btn-sm btn-danger"><span>&#x1F5D1;</span>
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
