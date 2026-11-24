@extends('layouts.appKencana')
@section('content')
@section('title', 'Maint Pot Harga Penjualan')
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
                <div class="card-header">Maint Pot Harga Penjualan</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <!-- Form fields go here -->
                            <div class="d-flex">
                                <div class="col-md-2">
                                    <label for="tanggalInput" style="margin-right: 10px;">Tanggal Input</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="date" id="tanggalInput" class="form-control" style="width: 100%">
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-2">
                                    <label for="namaCustomer" style="margin-right: 10px;">Nama Customer</label>
                                </div>
                                <div class="col-md-8">
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
                                <div class="col-md-2">
                                    <label for="noNotaKredit" style="margin-right: 10px;">No. Nota Kredit</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="no_notaKredit" name="no_notaKredit" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_notaKredit">...</button>
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-2">
                                    <label for="noPenagihan" style="margin-right: 10px;">No. Penagihan</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="no_penagihan" name="no_penagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_penagihan">...</button>
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-2">
                                    <label for="namaBarang" style="margin-right: 10px;">Nama Barang</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="kodeBarang" value="" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-7">
                                    <input type="text" id="namaBarang" name="namaBarang" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_barang">...</button>
                                </div>
                            </div>

                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn" id="btn_tambahItem" style="">Tambah
                                            Item</button>
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn" id="btn_hapusItem"
                                            style="">Hapus
                                            Item</button>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div style="overflow-y: auto; overflow-x: auto;">
                                    <table style="width: 100%;" id="table_atas">
                                        {{-- <colgroup>
                                            <col style="width: 25%;">
                                            <col style="width: 15%;">
                                            <col style="width: 15%;">
                                            <col style="width: 15%;">
                                            <col style="width: 15%;">
                                            <col style="width: 15%;"> --}}
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Surat Jalan</th>
                                                <th>Kode Barang</th>
                                                <th>Jumlah Kirim</th>
                                                <th>Harga Lama</th>
                                                <th>Harga Baru</th>
                                                <th>ID</th>
                                                <th>Total Pot</th>
                                            </tr>
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
                                            <col style="width: 25%;">
                                            <col style="width: 15%;">
                                            <col style="width: 15%;">
                                            <col style="width: 15%;">
                                            <col style="width: 15%;">
                                            <col style="width: 15%;"> --}}
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Surat Jalan</th>
                                                <th>Kode Barang</th>
                                                <th>Jumlah Kirim</th>
                                                <th>Harga Lama</th>
                                                <th>Harga Baru</th>
                                                <th>ID</th>
                                                <th>Total Pot</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-2">
                                    <label for="totalPemakaian" style="margin-right: 10px;">Total Potongan</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="totalPotongan" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-2">
                                    <label for="totalBiaya" style="margin-right: 10px;">Terbilang</label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" id="terbilang" class="form-control" style="width: 100%">
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-2">
                                    <label for="totalBiaya" style="margin-right: 10px;">Mata Uang</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="mataUang" class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-3" style="display: none">
                                    <input type="text" id="idMataUang" class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-3" style="display: none">
                                    <input type="text" id="statusPPN" class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-3" style="display: none">
                                    <input type="text" id="jnsPPN" class="form-control" style="width: 100%">
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-2">
                                    <label for="totalBiaya" style="margin-right: 10px;">Status Pelunasan</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="statusPelunasan" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="statusPelunasan2" class="form-control"
                                        style="width: 100%; color: blue">
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
                        </form>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalLihatItem" tabindex="-1" role="dialog" aria-labelledby="pilihBankModal"
    aria-hidden="true">
    <div class="modal-dialog custom-modal-width" role="document">
        <div class="modal-content" style="padding: 25px;">
            <div class="modal-header">
                <h5 class="modal-title">Tambah Item</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" id="tutup_modal">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <br>
            <div style="overflow-x: auto; overflow-y: auto;">
                <table style="width: 100%;" id="table_tampilModal">
                    <thead class="table-dark">
                        <tr>
                            <th>Surat Jalan</th>
                            <th>Jumlah Kirim</th>
                            <th>Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <br>
            <div class="d-flex">
                <div class="col-md-2">
                    <label for="idBKKTampil" style="margin-right: 10px;">Harga Setelah Dipotong</label>
                </div>
                <div class="col-md-4">
                    <input type="number" id="hargaStlPotong" name="hargaStlPotong" class="form-control"
                        style="width: 100%">
                </div>
                {{-- <div class="col-md-3" style="">
                    <input type="text" id="totalFOB" name="totalFOB" class="form-control" style="width: 100%">
                </div>
                <div class="col-md-3" style="display: none">
                    <input type="text" id="idPengiriman" name="idPengiriman" class="form-control"
                        style="width: 100%">
                </div> --}}
            </div>
            <br>
            <div class="d-flex">
                <div class="col-md-2">
                    <label for="totalLihat" style="margin-right: 10px;">Total Pot Harga</label>
                </div>
                <div class="col-md-4">
                    <input type="text" id="totalPot" name="totalPot" class="form-control" style="width: 100%">
                </div>
                {{-- <div class="col-md-1">
                    <button class="btn btn-primary" id="btn_insert" name="btn_insert">Insert</button>
                </div>
                <div class="col-md-3">
                    <input type="text" id="idPesananM" name="idPesananM" class="form-control"
                        style="width: 100%">
                </div>
                <div class="col-md-3" style="display: none">
                    <input type="text" id="idCust" name="idCust" class="form-control" style="width: 100%">
                </div> --}}
            </div>
            <br>
            <div class="col-md-2">
                <button class="btn btn-success" id="btn_simpanM" name="btn_simpanM">Simpan</button>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/PotHarga.js') }}"></script>
@endsection
