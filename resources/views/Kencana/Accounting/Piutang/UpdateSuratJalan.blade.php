@extends('layouts.appKencana')
@section('content')
@section('title', 'Update Surat Jalan untuk Nota Tunai')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Update Surat Jalan untuk Nota Tunai</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="{{ url('UpdateSuratJalan') }}" id="formkoreksi">
                            {{ csrf_field() }}
                            <input type="hidden" name="_method" id="methodkoreksi">
                            <!-- Form fields go here -->
                            <div style="overflow-y: auto; max-height: 400px; overflow-x: auto;">
                                <table style="width: 100%;" id="table_atas">
                                    {{-- <colgroup>
                                        <col style="width: 15%;">
                                        <col style="width: 15%;">
                                        <col style="width: 20%;">
                                        <col style="width: 30%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 25%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                    </colgroup> --}}
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Id. Penagihan</th>
                                            <th>Id. Pengiriman</th>
                                            <th>Tgl. Jual</th>
                                            <th>Customer</th>
                                            <th>Nilai Jual</th>
                                            <th>Mata Uang</th>
                                            <th>Id. Customer</th>
                                            <th>Tgl. Diterima</th>
                                            <th>Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>

                            <p>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-1">
                                        <button type="button" class="btn btn-success" id="btn_proses"
                                                style="width: 100px;">Proses</button>
                                    </div>
                                    {{-- <div class="col-2">
                                        <input type="submit" id="btnKeluar" name="keluar" value="Keluar"
                                            class="btn btn-primary">
                                    </div> --}}
                                </div>
                            </div>
                            <div class="col-2">
                                <input type="hidden" id="idPenagihan" name="idPenagihan" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-2">
                                <input type="hidden" id="suratJalan" name="suratJalan" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-2">
                                <input type="hidden" id="idCustomer" name="idCustomer" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-2">
                                <input type="hidden" id="jatuhTempo" name="jatuhTempo" class="form-control"
                                    style="width: 100%">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/UpdateSuratJalan.js') }}"></script>
@endsection
