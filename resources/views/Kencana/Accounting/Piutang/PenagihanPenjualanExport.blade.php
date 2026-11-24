@extends('layouts.appKencana')
@section('content')
@section('title', 'Maint Penagihan Surat Jalan Export')
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
                <div class="card-header">Maint Penagihan Surat Jalan Ekspor</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <div>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="tanggal" style="margin-right: 10px;">Tanggal</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="date" id="tanggal" name="tanggal" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="namaCustomerSelect" style="margin-right: 10px;">Nama
                                        Customer</label>
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
                                    <input type="text" id="idJenisCustomer" name="idJenisCustomer"
                                        class="form-control" style="width: 100%">
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="noPenagihanSelect" style="margin-right: 10px;">No. Penagihan</label>
                                </div>
                                <div class="col-md-5">
                                    <input type="text" id="no_penagihan" name="no_penagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_penagihan">...</button>
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="suratJalanSelect" style="margin-right: 10px;">Surat Jalan</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="surat_jalan" name="surat_jalan" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_suratJalan">...</button>
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="mataUang" style="margin-right: 10px;">Mata Uang</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="mataUang" name="mataUang" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-2" style="display: none">
                                    <input type="text" id="idMataUang" name="idMataUang" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="nilaiKurs" style="margin-right: 10px;">Nilai Kurs</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="nilaiKurs" name="nilaiKurs" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="dokumen" style="margin-right: 10px;">Dokumen</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="dokumen" name="dokumen" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-2" style="display: none">
                                    <input type="text" id="idJenisDokumen" name="idJenisDokumen" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="userPenagihSelect" style="margin-right: 10px;">User Penagih</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="user_penagih" name="user_penagih" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-2" style="display: none">
                                    <input type="text" id="idUserPenagih" name="idUserPenagih"
                                        class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_penagih">...</button>
                                </div>
                                <div class="col-md-2">
                                    <button type="button" class="btn btn d-flex ml-auto" id="btn_lihatItem"
                                        style="">Lihat Item</button>
                                    {{-- <input type="submit" id="btnLihatItem" name="btnLihatItem" value="Lihat Item"
                                        class="btn btn-primary d-flex ml-auto"> --}}
                                </div>
                                <div class="col-md-2">
                                    <button type="button" class="btn btn d-flex ml-auto" id="btn_hapusItem"
                                        style="">Hapus Item</button>
                                    {{-- <input type="submit" id="btnHapusItem" name="btnHapusItem" value="Hapus Item"
                                        class="btn btn-primary d-flex ml-auto"> --}}
                                </div>
                            </div>
                        </div>

                        <!--CARD 2-->
                        <br>
                        <div>
                            <div style="overflow-y: auto;">
                                <table style="width: 100%;" id="table_atas">
                                    {{-- <colgroup>
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;"> --}}
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Surat Jalan</th>
                                            <th>Tanggal</th>
                                            <th>Nilai Penagihan</th>
                                            <th>Nilai FOB</th>
                                            <th>ID. Detail Pesann</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div style="display: none">
                            <div style="overflow-y: auto;">
                                <table style="width: 100%;" id="table_hapus">
                                    {{-- <colgroup>
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;">
                                        <col style="width: 25%;"> --}}
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Surat Jalan</th>
                                            <th>Tanggal</th>
                                            <th>Nilai Penagihan</th>
                                            <th>Nilai FOB</th>
                                            <th>ID. Detail Pesann</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="noPEB" style="margin-right: 10px;">No. PEB</label>
                            </div>
                            <div class="col-md-3">
                                <input type="text" id="noPEB" name="noPEB" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <label for="tanggalPEB" style="margin-right: 10px;">Tanggal PEB</label>
                            </div>
                            <div class="col-md-2">
                                <input type="date" id="tanggalPEB" name="tanggalPEB" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <br>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="noBL" style="margin-right: 10px;">No. BL</label>
                            </div>
                            <div class="col-md-3">
                                <input type="text" id="noBL" name="noBL" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <label for="tanggalBL" style="margin-right: 10px;">Tanggal BL</label>
                            </div>
                            <div class="col-md-2">
                                <input type="date" id="tanggalBL" name="tanggalBL" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <br>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="nilaiDitagihkan" style="margin-right: 10px;">Nilai yang
                                    Ditagihkan</label>
                            </div>
                            <div class="col-md-4">
                                <input type="text" id="nilaiDitagihkan" name="nilaiDitagihkan"
                                    class="form-control" style="width: 100%">
                            </div>
                        </div>
                        <br>
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

                        <!--MODAL LIHAT ITEM-->
                        <div class="modal fade" id="modalLihatItem" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog custom-modal-width" role="document">
                                <div class="modal-content" style="padding: 25px;">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Detail Surat Jalan Export</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close" id="tutup_modal">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <br>
                                    <div style="overflow-x: auto; overflow-y: auto;">
                                        <table style="width: 100%;" id="table_tampilBKK">
                                            {{-- <colgroup>
                                                <col style="width: 30%;">
                                                <col style="width: 30%;">
                                                <col style="width: 30%;">
                                                <col style="width: 30%;">
                                                <col style="width: 30%;">
                                                <col style="width: 30%;">
                                                <col style="width: 30%;">
                                            </colgroup> --}}
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Nama Type</th>
                                                    <th>Kwantum</th>
                                                    <th>Harga Satuan</th>
                                                    <th>Satuan</th>
                                                    <th>Total</th>
                                                    <th>Retur</th>
                                                    <th>Total FOB</th>
                                                    <th>ID. Pesanan</th>
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
                                        <div class="col-md-4">
                                            <input type="text" id="totalLihat" name="totalLihat"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3" style="">
                                            <input type="text" id="totalFOB" name="totalFOB"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3" style="display: none">
                                            <input type="text" id="idPengiriman" name="idPengiriman"
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-md-2">
                                            <label for="totalLihat" style="margin-right: 10px;">Harga FOB</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="number" id="harga_fob" name="harga_fob"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <button class="btn btn-primary" id="btn_insert"
                                                name="btn_insert">Insert</button>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="idPesananM" name="idPesananM"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3" style="display: none">
                                            <input type="text" id="idCust" name="idCust" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <br>
                                    <div class="col-md-2">
                                        <button class="btn btn-success" id="btn_simpanM"
                                            name="btn_simpanM">Simpan</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/PenagihanPenjualanExport.js') }}"></script>
@endsection
