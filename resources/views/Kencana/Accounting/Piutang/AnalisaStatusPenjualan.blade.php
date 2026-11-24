@extends('layouts.appKencana')
@section('content')
@section('title', 'Analisa Status Pelunasan')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Analisa Status Pelunasan Tagihan Penjualan</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <meta name="csrf-token" content="{{ csrf_token() }}">
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="{{ url('AnalisaStatusPenjualan') }}" id="formkoreksi">
                            {{ csrf_field() }}
                            <input type="hidden" name="_method" id="methodkoreksi">
                            <!-- Form fields go here -->
                            <div class="d-flex">
                                <div class="col-md-1">
                                    <label for="tanggal" name="tanggal" style="margin-right: 10px;">Tanggal</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="date" id="tanggal" name="tanggal" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <label style="margin-left: 30px">S/D</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="date" id="tanggal2" name="tanggal2" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-primary" id="btn_ok">OK</button>
                                </div>
                            </div>

                            <br>
                            <div>
                                <div style="overflow-y: auto;">
                                    <table style="width: 180%; table-layout: fixed;" id="table_atas">
                                        <colgroup>
                                            <col style="width: 20%;">
                                            <col style="width: 30%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 10%;">
                                            <col style="width: 20%;">
                                        </colgroup>
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Tgl. Pelunasan</th>
                                                <th>Customer</th>
                                                <th>No. Faktur</th>
                                                <th>Pembayaran</th>
                                                <th>Pelunasan</th>
                                                <th>NIlai Tagihan</th>
                                                <th>Total Bayar</th>
                                                <th>Lunas</th>
                                                <th>BKM</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <br>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="noFaktur" style="margin-right: 10px;">No. Faktur</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="noFaktur" name="noFaktur" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-3">
                                    <input type="hidden" id="no_Faktur" name="no_Faktur" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="totalPenagihan" style="margin-right: 10px;">Total Penagihan</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="totalPenagihan" name="totalPenagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="totalPembayaran" style="margin-right: 10px;">Total Pembayaran</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="totalPembayaran" name="totalPembayaran"
                                        class="form-control" style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="notaKredit" style="margin-right: 10px;">Nota Kredit</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="notaKredit" name="notaKredit" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="sisaTagihan" style="margin-right: 10px;">Sisa Tagihan</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="sisaTagihan" name="sisaTagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="lunas" style="margin-right: 10px;">Lunas (Y/N)</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="lunas" name="lunas" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <input type="hidden" id="idBKM" name="idBKM" class="form-control"
                                    style="width: 100%">
                            </div>

                            <br>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-1">
                                        <button type="button" class="btn btn-success" id="btn_proses"
                                            style="width: 100px;">Proses</button>
                                    </div>
                                    <div class="col-2">
                                        <button type="button" class="btn" id="btn_batal"
                                            style="width: 100px;">Batal</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/AnalisaStatusPenjualan.js') }}"></script>
@endsection
