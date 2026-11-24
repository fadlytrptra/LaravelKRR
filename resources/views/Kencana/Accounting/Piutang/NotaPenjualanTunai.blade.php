@extends('layouts.appKencana')
@section('content')
@section('title', 'Nota Penjualan Tunai')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Nota Penjualan Tunai</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="{{ url('NotaPenjualanTunai') }}" id="formkoreksi">
                            {{ csrf_field() }}
                            <input type="hidden" name="_method" id="methodkoreksi">
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="namaCustomer" style="margin-right: 10px;">Nama Customer</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="nama_customer" name="nama_customer" class="form-control"
                                        style="width: 100%;">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_customer">...</button>
                                </div>
                                <div class="col-md-1" style="display: none">
                                    <input type="text" id="idCustomer" name="idCustomer" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1" style="display: none">
                                    <input type="text" id="id_cust" name="id_cust"
                                        class="form-control" style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="tanggalInput" style="margin-right: 10px;">Tanggal Input</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="date" id="tanggalInput" name="tanggalInput" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-1" style="margin-left: 20px">
                                    <div>
                                        <input class="form-check-input" type="checkbox" id="potongUM" name="potongUM"
                                            value="1">
                                    </div>
                                    <div style="white-space: nowrap;">
                                        Potong Uang Muka
                                    </div>
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="noPenagihanSelect" style="margin-right: 10px;">No. Penagihan</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="no_penagihan" name="no_penagihan" class="form-control"
                                        style="width: 100%;">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_penagihan">...</button>
                                </div>
                                <div class="col-md-1" style="display: none">
                                    <input type="text" id="idNoPenagihan" name="idNoPenagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1" style="display: none">
                                    <input type="text" id="IdPenagihan" name="IdPenagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="jenisCustomer" style="margin-right: 10px;">Jenis Customer</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="jenisCustomer" name="jenisCustomer" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="alamat" style="margin-right: 10px;">Alamat</label>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" id="alamat" name="alamat" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="nomorSPSelect" style="margin-right: 10px;">Nomor SP</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="no_sp" name="no_sp" class="form-control"
                                        style="width: 100%;">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_noSP">...</button>
                                </div>
                                <div class="col-md-1" style="display: none">
                                    <input type="text" id="noSP" name="noSP" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <label for="nomorPO" style="margin-right: 10px;">Nomor PO</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="nomorPO" name="nomorPO" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="mataUangSelect" style="margin-right: 10px;">Mata Uang</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="mata_uang" name="mata_uang" class="form-control"
                                        style="width: 100%;">
                                </div>
                                <div class="col-md-1" style="visibility: hidden">
                                    <button type="button" class="btn btn-default" id="btn_mataUang">...</button>
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
                                    <label for="penagihanPajak" style="margin-right: 10px;">Penagihan Pajak</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="date" id="penagihanPajak" name="penagihanPajak"
                                        class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <label for="syaratPembayaran" style="margin-right: 10px;">Syarat
                                        Pembayaran</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="syaratPembayaran" name="syaratPembayaran"
                                        class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    Hari
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="userPenagihSelect" style="margin-right: 10px;">User Penagih</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="user_penagih" name="user_penagih" class="form-control"
                                        style="width: 100%;">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_penagih">...</button>
                                </div>
                                <div class="col-md-1" style="display: none">
                                    <input type="text" id="idUserPenagih" name="idUserPenagih"
                                        class="form-control" style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="dokumen" style="margin-right: 10px;">Dokumen</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="dokumen" name="dokumen" class="form-control"
                                        style="width: 100%;">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_dokumen">...</button>
                                </div>
                                <div class="col-md-1" style="display: none">
                                    <input type="text" id="idJenisDokumen" name="idJenisDokumen"
                                        class="form-control" style="width: 100%">
                                </div>
                            </div>

                            <div class="col-md-1" style="display: none">
                                <input type="text" id="jenisdok" name="jenisdok" class="form-control"
                                    style="width: 100%">
                            </div>

                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="jenisPajakSelect" style="margin-right: 10px;">Jenis
                                        Pajak</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="nama_pajak" name="nama_pajak" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_pajak">...</button>
                                </div>
                                <div class="col-md-1" style="display: none">
                                    <input type="text" id="idJenisPajak" name="idJenisPajak" class="form-control"
                                        style="width: 100%; display: none">
                                </div>
                                <div class="col-md-1" style="display: none">
                                    <input type="text" id="jenis_pajak" name="jenis_pajak" class="form-control"
                                        style="width: 100%; display: none">
                                </div>
                                <div class="col-md-1">
                                    <label for="PPN" style="margin-right: 10px; margin-left: 50%">PPN%</label>
                                </div>
                                <div class="col-md-1">
                                    <select id="Ppn" name="Ppn" class="form-control" style="width: 100%;">
                                        <option value="12">12</option>
                                        <option value="11">11</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                                <div class="col-md-1">
                                    <label for="PPN" style="">No. Penagihan UM</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="no_penagihanUM" name="no_penagihanUM"
                                        class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_penagihanUM">...</button>
                                </div>
                                <div class="col-md-1" style="display: none">
                                    <input type="text" id="id_penagihanUM" name="id_penagihanUM"
                                        class="form-control" style="width: 100%; display: none">
                                </div>
                            </div>

                            <!--CARD 2-->
                            <br>
                            <div>
                                <div style="overflow-y: auto; max-height: 400px;">
                                    <table style="width: 100%;" id="table_atas">
                                        {{-- <colgroup>
                                            <col style="width: 30%;">
                                            <col style="width: 30%;">
                                            <col style="width: 30%;">
                                        </colgroup> --}}
                                        <thead class="table-dark">
                                            <tr>
                                                <th>ID</th>
                                                <th>Surat Pesanan</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="nilaiSP" style="margin-right: 10px;">Nilai SP (Blm Pajak)</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="nilaiSP" name="nilaiSP" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-2">
                                    <label for="nilaiUM" style="margin-right: 10px;">Nilai UM (Blm Pajak)</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="nilaiUM" name="nilaiUM" class="form-control"
                                        style="width: 100%">
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
                                    <label for="nilaiSdhBayar" style="margin-right: 10px;">Nilai Sdh Bayar (Blm
                                        Pajak)</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="nilaiSdhBayar" name="" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-4">

                                </div>
                                <div class="col-md-2">
                                    <button type="button" class="btn btn" id="btn_hapusItem"
                                        style="width: 100px;">Hapus Item</button>
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="totalPenagihan" style="margin-right: 10px;">Total Penagihan (Dengan
                                        PPN)</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="totalPenagihan" name="totalPenagihan"
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
                        </form>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/NotaPenjualanTunai.js') }}"></script>
@endsection
