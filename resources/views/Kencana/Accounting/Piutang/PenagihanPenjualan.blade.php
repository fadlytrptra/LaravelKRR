@extends('layouts.appKencana')
@section('content')
@section('title', 'Penagihan Penjualan')
<style>
    .custom-modal-width {
        max-width: 70%;
        /* Adjust the percentage as needed */
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance Penagihan Surat Jalan</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="{{ url('PenagihanPenjualan') }}" id="formkoreksi">
                            {{ csrf_field() }}
                            <input type="hidden" name="_method" id="methodkoreksi">
                            <!-- Form fields go here -->
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="tanggal" style="margin-right: 10px;">Tanggal</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="date" id="tanggal" name="tanggal" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <input type="hidden" id="id_cust" name="id_cust" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="namaCustomer" style="margin-right: 10px;">Nama Customer</label>
                                </div>
                                <div class="col-md-5">
                                    <input type="text" id="nama_customer" name="nama_customer" class="form-control"
                                        style="width: 100%;">
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
                                    <input type="text" id="no_penagihan" name="no_penagihan" class="form-control"
                                        style="width: 100%;">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_penagihan">...</button>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="IdPenagihan" name="IdPenagihan" class="form-control"
                                        style="width: 100%; display: none">
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="id_Penagihan" name="IdPenagihan" class="form-control"
                                        style="width: 100%; display: none">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="jenisCustomer" style="margin-right: 10px;">Jenis
                                        Customer</label>
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
                                        style="width: 100%; display: none">
                                </div>
                                <div class="col-md-1">
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
                                    <input type="text" id="namaMataUang" name="namaMataUang" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="idMataUang" name="idMataUang" class="form-control"
                                        style="width: 100%; display: none">
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
                                    <label for="penagihanPajak" style="margin-right: 10px;">Penagihan
                                        Pajak</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="date" id="penagihanPajak" name="penagihanPajak"
                                        class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-1">

                                </div>
                                <div class="col-md-1">
                                    <label for="penagihanPajak" style="margin-right: 10px;">Syarat
                                        Pembayaran</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="syaratPembayaran" name="syaratPembayaran"
                                        class="form-control" style="width: 100%;">
                                </div>
                                <div class="col-md-1">
                                    <label for="penagihanPajak" style="margin-right: 10px;">Hari</label>
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="userPenagihSelect" style="margin-right: 10px;">User
                                        Penagih</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="user_penagih" name="user_penagih" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_userPenagih">...</button>
                                    <input type="hidden" id="idUserPenagih" name="idUserPenagih"
                                        class="form-control" style="width: 100%; display: none">
                                </div>
                                <div class="col-md-1">
                                    <label for="nama_bank" style="margin-right: 10px;">Bank</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="nama_bank" name="nama_bank" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_bank">...</button>
                                    <input type="hidden" id="idBank" name="idBank" class="form-control"
                                        style="width: 100%; display: none">
                                </div>
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
                                <label for="" style="margin-right: 10px; font-weight: bold;">Tabel Surat
                                    Jalan</label>
                                <div style="overflow-y: auto;">
                                    <table style="width: 100%;" id="table_atas">
                                        {{-- <colgroup>
                                            <col style="width: 25%;">
                                            <col style="width: 25%;">
                                            <col style="width: 25%;">
                                            <col style="width: 25%;">
                                            <col style="width: 25%;">
                                        </colgroup> --}}
                                        <thead class="table-dark">
                                            <tr>
                                                <th>ID</th>
                                                <th>Uraian</th>
                                                <th>Surat Jalan</th>
                                                <th>Tanggal</th>
                                                <th>Nilai Penagihan</th>
                                                <th>Surat Pesanan</th>
                                                <th>Jenis</th>
                                                <th>ID XC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-md-10">
                                    <button type="button" class="btn btn-default d-flex ml-auto"
                                        id="btn_lihatItem">Lihat Item</button>
                                </div>
                                <div class="col-md-2">
                                    <button type="button" class="btn btn-default d-flex ml-auto"
                                        id="btn_hapusItem">Hapus Item</button>
                                    {{-- <input type="submit" id="btnHapusItem" name="btnHapusItem"
                                            value="Hapus Item" class="btn d-flex ml-auto"> --}}
                                </div>
                            </div>
                            <br>
                            <div>
                                <label for="" style="margin-right: 10px; font-weight: bold;">Tabel Uang
                                    Muka</label>
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
                                                <th>No. Penagihan UM</th>
                                                <th>Jumlah UM</th>
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
                                        id="btn_lihatItemUM">Lihat Item</button>
                                </div>
                                <div class="col-md-2">
                                    <button type="button" class="btn btn-default d-flex ml-auto"
                                        id="btn_hapusItemUM">Hapus Item</button>
                                    {{-- <input type="submit" id="btnHapusItem" name="btnHapusItem"
                                            value="Hapus Item" class="btn d-flex ml-auto"> --}}
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="suratJalanSelect" style="margin-right: 10px;">Surat Jalan</label>
                                </div>
                                <div class="col-md-3" style="display: none">
                                    <input type="text" id="tanggal_diterima" name="tanggal_diterima"
                                        class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="surat_jalan" name="surat_jalan" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_suratJalan">...</button>
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
                                    <button type="button" class="btn btn-default" id="btn_dokumen">...</button>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="idJenisDokumen" name="idJenisDokumen"
                                        class="form-control" style="width: 100%; display: none">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="nomor_seriFakturPajak" style="margin-right: 10px;">No. Seri Faktur Pajak</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="nomor_seriFakturPajak" name="nomor_seriFakturPajak" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="noBC24" style="margin-right: 10px;">No. BC 2.4</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="noBC24" name="noBC24" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <label for="tanggalBC24" style="margin-right: 10px;">Tanggal BC 2.4</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="date" id="tanggalBC24" name="tanggalBC24" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <hr>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="nilaiPenagihan" style="margin-right: 10px;">Nilai
                                        Penagihan</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="nilaiPenagihan" name="nilaiPenagihan"
                                        class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <label for="nilaiUangMuka" style="margin-right: 10px;">Nilai Uang Muka</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="nilaiUangMuka" name="nilaiUangMuka"
                                        class="form-control" style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="dpp_nilaiLain" style="margin-right: 10px;">DPP Nilai Lain</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="dpp_nilaiLain" name="dpp_nilaiLain"
                                        class="form-control" style="width: 100%;">
                                </div>
                                <div class="col-md-1">
                                    <label for="nilai_ppn" style="margin-right: 10px;">PPN</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="nilai_ppn" name="nilai_ppn" class="form-control"
                                        style="width: 100%;">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="nilai_total" style="margin-right: 10px;">Total</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="nilai_total" name="nilai_total"
                                        class="form-control" style="width: 100%;">
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
                            <br>
                        </form>

                        <!--MODAL LIHAT ITEM-->
                        <div class="modal fade" id="modalLihatItem" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog custom-modal-width" role="document">
                                <div class="modal-content" style="padding: 25px;">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Surat Jalan yang Ditagihkan</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    {{-- <form action="{{ url('PenagihanPenjualan') }}" id="formLihatItem" method="POST">
                                        {{ csrf_field() }} --}}
                                    <input type="hidden" name="_method" id="methodLihatItem">
                                    <br>
                                    <div style="overflow-x: auto; overflow-y: auto; ">
                                        <table style="width: 100%; table-layout: fixed;"id="table_item">
                                            <colgroup>
                                                <col style="width: 30%;">
                                                <col style="width: 30%;">
                                                <col style="width: 30%;">
                                                <col style="width: 15%;">
                                                <col style="width: 30%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Nama Type</th>
                                                    <th>Kwantum</th>
                                                    <th>Harga Satuan</th>
                                                    <th>Satuan</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-md-2">
                                            <label for="idBKKTampil" style="margin-right: 10px;">Total</label>
                                        </div>
                                        <div class="col-md-6">

                                        </div>
                                        <div class="col-md-2">
                                            <button type="button" class="btn btn-success" id="btn_simpanM"
                                                style="width: 100px;">Simpan</button>
                                        </div>
                                        <div class="col-md-2">
                                            <button type="button" class="btn btn-danger" id="btn_keluarM"
                                                style="width: 100px;" data-bs-dismiss="modal">Keluar</button>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="totalLihat" name="totalLihat" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    {{-- <input type="hidden" name="cetak" id="cetak" value="cetakBKK"> --}}
                                    {{-- </form> --}}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/PenagihanPenjualan.js') }}"></script>
@endsection
