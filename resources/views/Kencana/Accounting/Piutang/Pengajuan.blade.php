@extends('layouts.appKencana')
@section('content')
@section('title', 'Pengajuan')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance Pengajuan BKK Nota Kredit</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        {{-- <form method="POST" action="{{ url('Pengajuan') }}" id="formkoreksi">
                                {{csrf_field()}} --}}
                        <!-- Form fields go here -->
                        <div>
                            <b>Data Nota Kredit untuk Create BKK</b>
                            <div style="overflow-y: auto;">
                                <table style="width: 100%;" id="table_atas">
                                    {{-- <colgroup>
                                                <col style="width: 10%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 10%;">
                                                <col style="width: 10%;">
                                                <col style="width: 10%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                            </colgroup> --}}
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Tanggal</th>
                                            <th>Id. Nota Kredit</th>
                                            <th>Id. Penagihan</th>
                                            <th>Customer</th>
                                            <th>Mata Uang</th>
                                            <th>Jml Uang</th>
                                            <th>Id. Bank</th>
                                            <th>Jenis Bayar</th>
                                            <th>Rincian Bayar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>

                                {{-- <input type="hidden" id="id_Bank" name="id_Bank" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="jenis_Bayar" name="jenis_Bayar" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="idJenisBayar" name="idJenisBayar" class="form-control"
                                    style="width: 100%"> --}}
                            </div>
                        </div>
                    </div>

                    <br>
                    <div class="d-flex">
                        <div class="col-md-2">
                            <label for="noPenagihan" style="margin-right: 10px;">No. Penagihan</label>
                        </div>
                        <div class="col-md-3">
                            <input type="text" id="noPenagihan" name="noPenagihan" class="form-control"
                                style="width: 100%">
                        </div>
                        <div class="col-md-2">
                            <input type="text" id="idNotaKredit" name="idNotaKredit" class="form-control"
                                style="width: 100%">
                        </div>
                    </div>
                    <br>
                    <div class="d-flex">
                        <div class="col-md-2">
                            <label for="customer" style="margin-right: 10px;">Customer</label>
                        </div>
                        <div class="col-md-5">
                            <input type="text" id="namaCustomer" name="namaCustomer" class="form-control"
                                style="width: 100%">
                        </div>
                    </div>
                    <br>
                    <div class="d-flex">
                        <div class="col-md-2">
                            <label for="mataUangSelect" style="margin-right: 10px;">Mata Uang</label>
                        </div>
                        <div class="col-md-3">
                            <input type="text" id="mataUang" name="mataUang" class="form-control"
                                style="width: 100%">
                        </div>
                        <div class="col-md-4">
                            <input type="hidden" id="idMataUang" name="idMataUang" class="form-control"
                                style="width: 100%">
                        </div>
                    </div>
                    <br>
                    <div class="d-flex">
                        <div class="col-md-2">
                            <label for="jumlahUang" style="margin-right: 10px;">Jumlah Uang</label>
                        </div>
                        <div class="col-md-3">
                            <input type="text" id="jumlahUang" name="jumlahUang" class="form-control"
                                style="width: 100%">
                        </div>
                    </div>
                    <br>
                    <div class="d-flex">
                        <div class="col-md-2">
                            <label for="jenisBayarSelect" style="margin-right: 10px;">Jenis Bayar</label>
                        </div>
                        <div class="col-md-3">
                            <input type="text" id="jenisBayar" name="jenisBayar" class="form-control"
                                style="width: 100%">
                        </div>
                        <div class="col-md-1" style="display: none">
                            <input type="text" id="idJenisBayar" name="idJenisBayar" class="form-control"
                                style="width: 100%">
                        </div>
                        <div class="col-md-1">
                            <button type="button" class="btn btn-default" id="btn_jenisBayar">...</button>
                        </div>
                    </div>
                    <br>
                    <div class="d-flex">
                        <div class="col-md-2">
                            <label for="namaBankSelect" style="margin-right: 10px;">Bank</label>
                        </div>
                        <div class="col-md-1">
                            <input type="text" id="idBank" name="idBank" class="form-control"
                                style="width: 100%">
                        </div>
                        <div class="col-md-4">
                            <input type="text" id="namaBank" name="namaBank" class="form-control"
                                style="width: 100%">
                        </div>
                        <div class="col-md-1">
                            <button type="button" class="btn btn-default" id="btn_bank">...</button>
                        </div>
                    </div>
                    <br>
                    <div class="d-flex">
                        <div class="col-md-2">
                            <label for="rincianBKK" style="margin-right: 10px;">Rincian BKK</label>
                        </div>
                        <div class="col-md-3">
                            <input type="text" id="rincianBKK" name="rincianBKK" class="form-control"
                                style="width: 100%">
                        </div>
                    </div>
                    <br>
                    <div>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="display: flex;">
                                <div>
                                    <button type="button" class="btn btn-primary" id="btn_isi"
                                        style="width: 100px;">ISI</button>
                                </div>
                                <div style="margin-left: 5px;">
                                    <button type="button" class="btn btn-warning" id="btn_koreksi"
                                        style="width: 100px;">KOREKSI</button>
                                </div>
                                <div style="margin-left: 5px;">
                                    <button type="button" class="btn btn-danger" id="btn_hapus"
                                        style="width: 100px;">HAPUS</button>
                                </div>
                                <div style="margin-left: 5px;">
                                    <button type="button" class="btn btn-success" id="btn_proses"
                                        style="width: 100px;">PROSES</button>
                                </div>
                            </div>
                            <div>
                                <button type="button" class="btn btn" id="btn_batal"
                                    style="width: 100px; margin-left: 5px;">BATAL</button>
                            </div>
                        </div>
                    </div>
                    {{-- </form> --}}
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<script src="{{ asset('js/Kencana/Pengajuan.js') }}"></script>
@endsection
