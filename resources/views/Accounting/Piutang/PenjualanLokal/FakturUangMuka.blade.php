@extends('layouts.appAccounting')
@section('content')
@section('title', 'Faktur Uang Muka')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">FAKTUR UANG MUKA</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="{{ url('FakturUangMuka') }}" id="formkoreksi">
                            {{ csrf_field() }}
                            <input type="hidden" name="_method" id="methodkoreksi">
                            <!-- Form fields go here -->
                            <div class="card" style="display: flex;">
                                <div style="width: 100%;">
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="tanggal" style="margin-right: 10px;">Tanggal</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="date" id="tanggal" name="tanggal" class="form-control"
                                                style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="id_cust" name="id_cust" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="namaCustomer" style="margin-right: 10px;">Nama Customer</label>
                                        </div>
                                        <div class="col-md-5">
                                            <input type="text" id="nama_customer" name="nama_customer"
                                                class="form-control" style="width: 100%;">
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-default" id="btn_customer">Lihat Semua
                                                Customer</button>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="idCustomer" name="idCustomer" class="form-control"
                                                style="width: 100%; display: none">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="idJenisCustomer" name="idJenisCustomer"
                                                class="form-control" style="width: 100%; display: none">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="noPenagihanSelect" style="margin-right: 10px;">No.
                                                Penagihan</label>
                                        </div>
                                        <div class="col-md-5">
                                            <input type="text" id="no_penagihan" name="no_penagihan"
                                                class="form-control" style="width: 100%;">
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-default"
                                                id="btn_penagihan">...</button>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="IdPenagihan" name="IdPenagihan"
                                                class="form-control" style="width: 100%; display: none">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="id_Penagihan" name="IdPenagihan"
                                                class="form-control" style="width: 100%; display: none">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="jenisCustomer" style="margin-right: 10px;">Jenis
                                                Customer</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="jenisCustomer" name="jenisCustomer"
                                                class="form-control" style="width: 100%">
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
                                            <button type="button" class="btn btn-default"
                                                id="btn_noSP">...</button>
                                        </div>
                                        <div class="col-md-1" style="display: none">
                                            <input type="text" id="noSP" name="noSP" class="form-control"
                                                style="width: 100%; display: none">
                                        </div>
                                        <div class="col-md-2">
                                            <label for="nomorPO" style="margin-right: 10px;">Nomor PO</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="nomorPO" name="nomorPO" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>

                                    <p>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="nomorSP" style="margin-right: 10px;">Mata Uang</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="namaMataUang" name="namaMataUang"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="idMataUang" name="idMataUang"
                                                class="form-control" style="width: 100%; display: none">
                                        </div>
                                        <div class="col-md-2">
                                            <label for="nilaiKurs" style="margin-right: 10px;">Nilai Kurs</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="nilaiKurs" name="nilaiKurs"
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="penagihanPajak" style="margin-right: 10px;">Penagihan
                                                Pajak</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="date" id="penagihanPajak" name="penagihanPajak"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">

                                        </div>
                                        <div class="col-md-2">
                                            <label for="penagihanPajak"
                                                style="margin-right: 10px; display: none">Syarat
                                                Pembayaran</label>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="syaratPembayaran" name="syaratPembayaran"
                                                class="form-control" style="width: 100%; display: none">
                                        </div>
                                        <div class="col-md-1">
                                            <label for="penagihanPajak"
                                                style="margin-right: 10px; display: none">Hari</label>
                                        </div>
                                    </div>
                                    <p>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="userPenagihSelect" style="margin-right: 10px;">User
                                                Penagih</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="user_penagih" name="user_penagih"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-default"
                                                id="btn_userPenagih">...</button>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="idUserPenagih" name="idUserPenagih"
                                                class="form-control" style="width: 100%; display: none">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="jenisPajakSelect" style="margin-right: 10px;">Jenis
                                                Pajak</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="nama_pajak" name="nama_pajak"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-default"
                                                id="btn_pajak">...</button>
                                        </div>
                                        <div class="col-md-3" style="display: none">
                                            <input type="text" id="jenis_pajak" name="jenis_pajak"
                                                class="form-control" style="width: 100%; display: none">
                                        </div>
                                        <div class="col-md-1">
                                            <label for="PPN" style="margin-right: 10px;">PPN%</label>
                                        </div>
                                        <div class="col-md-1">
                                            <select id="Ppn" name="Ppn" class="form-control"
                                                style="width: 100%;">
                                                <option value="12">12</option>
                                                <option value="11">11</option>
                                                <option value="10">10</option>
                                            </select>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="idJenisPajak" name="idJenisPajak"
                                                class="form-control" style="width: 100%; display: none">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="dokumenSelect" style="margin-right: 10px;">Dokumen</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="dokumen" name="dokumen" class="form-control"
                                                style="width: 100%;">
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-default"
                                                id="btn_dokumen">...</button>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="idJenisDokumen" name="idJenisDokumen"
                                                class="form-control" style="width: 100%; display: none">
                                        </div>
                                    </div>
                                    <br>
                                </div>
                            </div>
                            <div>
                                <label for="" style="margin-right: 10px; font-weight: bold;">Tabel Surat Pesanan</label>
                                <div style="overflow-y: auto;">
                                    <table style="width: 100%;" id="table_bawah">
                                        {{-- <colgroup>
                                            <col style="width: 25%;">
                                            <col style="width: 25%;">
                                            <col style="width: 25%;">
                                            <col style="width: 25%;">
                                            <col style="width: 25%;">
                                        </colgroup> --}}
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Surat Pesanan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-md-10" style="visibility: hidden">
                                    <button type="button" class="btn btn-default d-flex ml-auto"
                                        id="btn_lihatItemSP">Lihat Item</button>
                                </div>
                                <div class="col-md-2">
                                    <button type="button" class="btn btn-default d-flex ml-auto"
                                        id="btn_hapusItemSP">Hapus Item</button>
                                    {{-- <input type="submit" id="btnHapusItem" name="btnHapusItem"
                                            value="Hapus Item" class="btn d-flex ml-auto"> --}}
                                </div>
                            </div>
                            <!--CARD 2-->
                            <br>
                            <div class="card">
                                <br>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="uangMasuk" style="margin-right: 10px;">Uang Masuk</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="uangMasuk" name="uangMasuk" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-2" style="color: blue;">
                                        Enter
                                    </div>
                                    <div class="col-md-1">
                                        <label for="total" style="margin-right: 10px;">Total</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="total" name="total" class="form-control"
                                            style="width: 100%">
                                    </div>
                                </div>
                                <p>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="nilaiSblmPPN" style="margin-right: 10px;">Nilai Sebelum
                                            PPN</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="nilaiSblmPPN" name="nilaiSblmPPN"
                                            class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <p>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="nilaiPpn" style="margin-right: 10px;">Nilai Ppn</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="nilaiPpn" name="nilaiPpn" class="form-control"
                                            style="width: 100%">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Accounting/Piutang/PenjualanLokal/FakturUangMuka.js') }}"></script>
@endsection
