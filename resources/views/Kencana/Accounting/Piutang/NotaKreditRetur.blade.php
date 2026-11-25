@extends('layouts.appKencana')
@section('content')
@section('title', 'Nota kredit / Retur')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Nota Kredit / Retur</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <!-- Form fields go here -->
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="tanggalInput" style="margin-right: 10px;">Tanggal Input</label>
                            </div>
                            <div class="col-md-3">
                                <input type="date" id="tanggalInput" name="tanggalInput" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2" style="display: none">
                                <input type="text" id="jenisPPN" name="jenisPPN" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2" style="display: none">
                                <input type="text" id="statusPPN" name="statusPPN" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="namaCustomerSelect" style="margin-right: 10px;">Nama Customer</label>
                            </div>
                            <div class="col-md-5">
                                <input type="text" id="nama_customer" name="nama_customer" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-default" id="btn_customer">...</button>
                            </div>
                            <div class="col-md-1" style="display: none">
                                <input type="text" id="idCustomer" name="idCustomer" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1" style="display: none">
                                <input type="text" id="idJenisCustomer" name="idJenisCustomer" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="noNotaKreditSelect" style="margin-right: 10px;">No. Nota Kredit</label>
                            </div>
                            <div class="col-md-3">
                                <input type="text" id="no_notaKredit" name="no_notaKredit" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-default" id="btn_notaKredit">...</button>
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="suratJalanSelect" style="margin-right: 10px;">Surat Jalan</label>
                            </div>
                            <div class="col-md-3">
                                <input type="text" id="surat_jalan" name="surat_jalan" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-default" id="btn_suratJalan">...</button>
                            </div>
                            {{-- <div class="col-md-2">
                                <input type="text" id="suratjalan" name="suratjalan" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="text" id="idbarang" name="idbarang" class="form-control"
                                    style="width: 100%">
                            </div> --}}
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="namaBarang" style="margin-right: 10px;">Nama Barang</label>
                            </div>
                            <div class="col-md-5">
                                <input type="text" id="namaBarang" name="namaBarang" value=""
                                    class="form-control" style="width: 100%">
                            </div>
                            <div class="col-md-2" style="display: none">
                                <input type="text" id="idbarang" name="idbarang" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2" style="display: none">
                                <input type="text" id="MIdRetur" name="MIdRetur" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="noPenagihan" style="margin-right: 10px;">No. Penagihan</label>
                            </div>
                            <div class="col-md-3">
                                <input type="text" id="no_penagihan" name="no_penagihan" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="mataUang" style="margin-right: 10px;">Mata Uang</label>
                            </div>
                            <div class="col-md-3">
                                <input type="text" id="mataUang" name="mataUang" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1" style="display: none">
                                <input type="text" id="idMataUang" name="idMataUang" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1">
                                <label for="nilaiKurs" style="margin-right: 10px;">Nilai Kurs</label>
                            </div>
                            <div class="col-md-2">
                                <input type="text" id="nilaiKurs" name="nilaiKurs" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="jumlahRetur" style="margin-right: 10px;">Jumlah Retur</label>
                            </div>
                            <div class="col-md-2">
                                <input type="text" id="jumlahRetur" name="jumlahRetur" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="satuan" name="satuan" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1">
                                <label for="harga" style="margin-right: 10px;">Harga</label>
                            </div>
                            <div class="col-md-2">
                                <input type="text" id="harga" name="harga" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1 form-check">
                                =
                            </div>
                            <div class="col-md-2">
                                <input type="text" id="total" name="total" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="statusPelunasan" style="margin-right: 10px;">Status Pelunasan</label>
                            </div>
                            <div class="col-md-2">
                                <input type="text" id="statusPelunasan" name="statusPelunasan"
                                    class="form-control" style="width: 100%">
                            </div>
                            <div class="col-md-4">
                                <label for="statusPelunasan" style="margin-right: 10px; color: blue" id="lblStatusPelunasan"></label>
                            </div>
                            <div class="col-md-1">
                                <label for="discount" style="margin-right: 10px;">Discount</label>
                            </div>
                            <div class="col-md-2">
                                <input type="text" id="discount" name="discount" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="grandTotalRetur" style="margin-right: 10px;">Grand Total Retur</label>
                            </div>
                            <div class="col-md-3">
                                <input type="text" id="grandTotalRetur" name="grandTotalRetur"
                                    class="form-control" style="width: 100%">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="terbilang" style="margin-right: 10px;">Terbilang</label>
                            </div>
                            <div class="col-md-9">
                                <input type="text" id="terbilang" name="terbilang" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>

                        <br>
                        <div>
                            <div class="row">
                                <div class="col-md-2">
                                    <button type="button" class="btn btn" id="btn_tambahItem" style="">Tambah
                                        Item</button>
                                </div>
                                <div class="col-md-2">
                                    <button type="button" class="btn btn" id="btn_hapusItem" style="">Hapus
                                        Item</button>
                                </div>
                            </div>
                        </div>

                        <br>
                        <div>
                            <div style="overflow-y: auto; overflow-x: auto;">
                                <table style="width: 100%;" id="table_bawah">
                                    {{-- <colgroup>
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;"> --}}
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Customer</th>
                                            <th>Surat Jalan</th>
                                            <th>Nama Barang</th>
                                            <th>No. Penagihan</th>
                                            <th>Total Retur</th>
                                            <th>ID. Retur</th>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div style="display: none">
                            <div style="overflow-y: auto; overflow-x: auto;">
                                <table style="width: 100%;" id="table_hapus">
                                    {{-- <colgroup>
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;"> --}}
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Customer</th>
                                            <th>Surat Jalan</th>
                                            <th>Nama Barang</th>
                                            <th>No. Penagihan</th>
                                            <th>Total Retur</th>
                                            <th>ID. Retur</th>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
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
                                    <button type="button" class="btn" id="btn_batal"
                                        style="width: 100px; margin-left: 5px;">BATAL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/NotaKreditRetur.js') }}"></script>
@endsection
