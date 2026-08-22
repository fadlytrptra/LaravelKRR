@extends('layouts.appKencana')
@section('content')
@section('title', 'ACC SJ Kencana')
<script>
    $(document).ready(function() {
        $('#table_PK').DataTable({
            order: [
                [0, 'desc']
            ],
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
                <div class="card-header">Surat Jalan Belum ACC Manager</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <table id="table_SJ" class="table table-bordered table-striped SP_datatable" style="width:100%">
                        <thead class="thead-light">
                            <tr>
                                <th>Surat Jalan</th>
                                <th>Tanggal </th>
                                <th>Customer</th>
                                <th>Expeditor</th>
                                <th>Kendaraan</th>
                                <th>IDHeader</th>
                                {{-- <th>Action</th> --}}
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($data as $item)
                                <tr>
                                    <td class="RDZPaddingTable RDZCenterTable">
                                        <input type="checkbox" name="selected[]" id="id_headerKirim"
                                            value="{{ $item->IdHeaderKirim }}">
                                        <a data-id="{{ $item->IdHeaderKirim }}" data-sj="{{ $item->IDPengiriman }}"
                                            class="DetailKirim"
                                            style="color: #3490dc; cursor: pointer;">{{ $item->IDPengiriman }}</a>
                                    </td>
                                    <td class="RDZPaddingTable RDZCenterTable">
                                        {{ date('m-d-Y', strtotime($item->Tanggal)) }}</td>
                                    <td class="RDZPaddingTable RDZCenterTable">{{ $item->NamaCust }}</td>
                                    <td class="RDZPaddingTable RDZCenterTable">{{ $item->NamaExpeditor }}</td>
                                    <td class="RDZPaddingTable RDZCenterTable">{{ $item->TrukNopol }}</td>
                                    <td class="RDZPaddingTable RDZCenterTable">{{ $item->IdHeaderKirim }}</td>
                                    {{-- <td class="acs-td-button">
                                            <form onsubmit="return confirm('Apakah Anda Yakin ?');"
                                                action="{{ url('SuratJalanManager/' . $item->IdHeaderKirim . '/up') }}"
                                                method="POST" enctype="multipart/form-data">
                                                {{ csrf_field() }}
                                                <button type="submit" class="btn btn-sm btn-success"><span>&#x2713;</span>
                                                    Setujui</button>
                                            </form>
                                        </td> --}}
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    <div>
                        <form
                            onsubmit="return confirm('Apakah Anda Yakin untuk menyetujui surat pesanan yang sudah dipilih?');"
                            id="form_submitSelected"action="{{ url('/Kencana/SuratJalanManager/up') }}" method="POST"
                            enctype="multipart/form-data">
                            {{ csrf_field() }}
                            <button class="btn btn-sm btn-success" id="button_submitSelected"><span>&#x2713;</span>
                                Setujui Surat Jalan yang Dipilih</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal untuk Lihat detail SJ -->
<div class="modal fade" id="detailSjModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="detailSJLabel">Detail SJ </h5>
                <button type="button" class="close" data-bs-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="QtyPrimer">Qty Primer (Ball)</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="QtyPrimer" name="QtyPrimer" readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label for="QtySekunder">Qty Sekunder (Lbr)</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="QtySekunder" name="QtySekunder" readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label for="QtyTritier">Qty Tritier (Kg)</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="QtyTritier" name="QtyTritier" readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label for="MinDO">Min DO:</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="MinDO" name="MinDO" readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label for="MaxDO">Max DO:</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="MaxDO" name="MaxDO" readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label for="Uraian">Uraian</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="Uraian" name="Uraian" readonly>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/Kencana/AccPermohonan-s-j.js') }}"></script>
@endsection
