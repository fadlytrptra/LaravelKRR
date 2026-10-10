@extends('layouts.appKencana')
@section('content')
@section('title', 'Permohonan Konversi Barang')
<style>
    .custom-modal-width {
        max-width: 65%;
        /* Adjust the percentage as needed */
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Permohonan Konversi Barang</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    <div class="row">
                        <div class="col-sm-1">
                            <label for="divisiId">Divisi</label>
                        </div>
                        <div class="col-sm-1">
                            <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                        </div>
                        <div class="col-sm-4">
                            <div class="input-group">
                                <input type="text" class="form-control" id="divisiNama" name="divisiNama" readonly>
                                <div class="input-group-append">
                                    <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                </div>
                            </div>
                        </div>
                        <div class="offset-sm-3 col-sm-1">
                            <label for="tanggal">Tanggal</label>
                        </div>
                        <div class="col-sm-2">
                            <input type="date" id="tanggal" name="tanggal" class="form-control">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-3 bordered">
                            <div class="row mt-3 mb-2">
                                <div class="col-sm-5">
                                    <label>Kode Konversi</label>
                                </div>
                                <div class="col-sm-7">
                                    <input type="text" id="kodeKonversi" name="kodeKonversi" class="form-control"
                                        readonly>
                                </div>
                            </div>
                            <div class="row mb-2" style="margin-top: 0.5%">
                                <div class="col-sm-12">
                                    <div class="table-responsive fixed-height">
                                        <table class="table table-bordered no-wrap-header" id="tableData">
                                            <thead>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-9">
                            <div class="bordered">
                                <div class="row">
                                    <div class="col-sm-4 ml-3">
                                        <label>
                                            <h6><strong>ASAL KONVERSI</strong></h6>
                                        </label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3 ml-4">
                                        <label for="kodeAsal">Kode Transaksi Asal</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="text" id="kodeAsal" name="kodeAsal" class="form-control"
                                            readonly>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3 ml-3 mt-1">
                                        <div class="row" style="margin-top: 0.5%">
                                            <div class="col-sm-12">
                                                <div class="table-responsive fixed-height" style="width: 425%">
                                                    <table class="table table-bordered no-wrap-header" id="tableAsal">
                                                        <thead>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row ml-5 mb-2 mt-1">
                                    <button type="button" id="btn_isiAsal" class="btn btn-info" disabled>Isi</button>
                                    <button type="button" id="btn_koreksiAsal" class="btn btn-info"
                                        disabled>Koreksi</button>
                                    <button type="button" id="btn_hapusAsal" class="btn btn-info"
                                        disabled>Hapus</button>
                                </div>
                            </div>

                            <div class="bordered mt-4">
                                <div class="row">
                                    <div class="col-sm-4 ml-3">
                                        <label>
                                            <h6><strong>TUJUAN KONVERSI</strong></h6>
                                        </label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3 ml-4">
                                        <label for="kodeTujuan">Kode Transaksi Tujuan</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="text" id="kodeTujuan" name="kodeTujuan" class="form-control"
                                            readonly>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3 ml-3 mt-1">
                                        <div class="row" style="margin-top: 0.5%">
                                            <div class="col-sm-12">
                                                <div class="table-responsive fixed-height" style="width: 425%">
                                                    <table class="table table-bordered no-wrap-header" id="tableTujuan">
                                                        <thead>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row ml-5 mb-2 mt-1">
                                    <button type="button" id="btn_isiTujuan" class="btn btn-info"
                                        disabled>Isi</button>
                                    <button type="button" id="btn_koreksiTujuan" disabled
                                        class="btn btn-info">Koreksi</button>
                                    <button type="button" id="btn_hapusTujuan" disabled
                                        class="btn btn-info">Hapus</button>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="row">
                        <div class="col-sm-1 offset-sm-10 pt-1">
                            <button style="width: 100%; margin-left: 50%" type="button" id="btn_batal"
                                class="btn btn-info" disabled>BATAL</button>
                        </div>
                    </div>

                    <div class="modal fade bd-example-modal-lg" id="modalAsalKonversi" tabindex="-1" role="dialog"
                        aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog custom-modal-width">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="asalAtauTujuan">Asal Konversi</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <label for="tanggalAsal">Tanggal</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="date" id="tanggalAsal" name="tanggalAsal"
                                                class="form-control">
                                        </div>
                                    </div>
                                    <div class="row pt-1">
                                        <div class="col-sm-3">
                                            <label for="divisiIdAsal">Divisi</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="text" id="divisiIdAsal" name="divisiIdAsal" readonly
                                                class="form-control">
                                        </div>
                                        <div class="col-sm-6">
                                            <input type="text" class="form-control" id="divisiNamaAsal" readonly
                                                name="divisiNamaAsal">
                                        </div>
                                    </div>

                                    <div class="row pt-1">
                                        <div class="col-sm-3">
                                            <label for="objekIdAsal">Objek</label>
                                        </div>
                                        <div class="col-md-8">
                                            <select id="objekSelect" name="objekSelect" class="form-control"
                                                style="width: 100%">
                                                <option disabled selected>Pilih Objek</option>
                                            </select>
                                        </div>
                                        {{-- <div class="col-sm-2">
                                                <input type="text" id="objekIdAsal" name="objekIdAsal" readonly
                                                    class="form-control">
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="objekNamaAsal" readonly
                                                        name="objekNamaAsal">
                                                    <div class="input-group-append">
                                                        <button type="button" id="btn_objek"
                                                            class="btn btn-info">...</button>
                                                    </div>
                                                </div>
                                            </div> --}}
                                    </div>

                                    <div class="row pt-1">
                                        <div class="col-sm-3">
                                            <label for="kelutIdAsal">Kel. Utama</label>
                                        </div>
                                        <div class="col-md-8">
                                            <select id="kelompokUtamaSelect" name="kelompokUtamaSelect"
                                                class="form-control" style="width: 100%">
                                                <option disabled selected>Pilih Kelompok Utama</option>
                                            </select>
                                        </div>
                                        {{-- <div class="col-sm-2">
                                                <input type="text" id="kelutIdAsal" name="kelutIdAsal" readonly
                                                    class="form-control">
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="kelutNamaAsal" readonly
                                                        name="kelutNamaAsal">
                                                    <div class="input-group-append">
                                                        <button type="button" id="btn_kelut"
                                                            class="btn btn-info">...</button>
                                                    </div>
                                                </div>
                                            </div> --}}
                                    </div>

                                    <div class="row pt-1">
                                        <div class="col-sm-3">
                                            <label for="kelompokIdAsal">Kelompok</label>
                                        </div>
                                        <div class="col-md-8">
                                            <select id="kelompokSelect" name="kelompokSelect" class="form-control"
                                                style="width: 100%">
                                                <option disabled selected>Pilih Kelompok</option>
                                            </select>
                                        </div>
                                        {{-- <div class="col-sm-2">
                                                <input type="text" id="kelompokIdAsal" name="kelompokIdAsal" readonly
                                                    class="form-control">
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="kelompokNamaAsal" readonly
                                                        name="kelompokNamaAsal">
                                                    <div class="input-group-append">
                                                        <button type="button" id="btn_kelompok"
                                                            class="btn btn-info">...</button>
                                                    </div>
                                                </div>
                                            </div> --}}
                                    </div>

                                    <div class="row pt-1">
                                        <div class="col-sm-3">
                                            <label for="subkelIdAsal">Sub Kelompok</label>
                                        </div>
                                        <div class="col-md-8">
                                            <select id="subKelompokSelect" name="subKelompokSelect"
                                                class="form-control" style="width: 100%">
                                                <option disabled selected>Pilih Sub Kelompok</option>
                                            </select>
                                        </div>
                                        {{-- <div class="col-sm-2">
                                                <input type="text" id="subkelIdAsal" name="subkelIdAsal" readonly
                                                    class="form-control">
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="subkelNamaAsal" readonly
                                                        name="subkelNamaAsal">
                                                    <div class="input-group-append">
                                                        <button type="button" id="btn_subkel"
                                                            class="btn btn-info">...</button>
                                                    </div>
                                                </div>
                                            </div> --}}
                                    </div>

                                    <div class="row pt-1 kodeAsal">
                                        <div class="col-sm-3">
                                            <label for="kodeBarangAsal">Kd Barang/Type</label>
                                        </div>
                                        <div class="col-md-8">
                                            <select id="idtypeSelect" name="idtypeSelect" class="form-control"
                                                style="width: 100%">
                                                <option disabled selected>Pilih Kode Barang/Type</option>
                                            </select>
                                        </div>
                                        {{-- <div class="col-sm-3">
                                                <input type="text" id="kodeBarangAsal" name="kodeBarangAsal" readonly
                                                    class="form-control">
                                            </div>
                                            <div class="col-sm-5">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="kodeTypeAsal" readonly
                                                        name="kodeTypeAsal">
                                                    <div class="input-group-append">
                                                        <button type="button" id="btn_idtype"
                                                            class="btn btn-info">...</button>
                                                    </div>
                                                </div>
                                            </div> --}}
                                    </div>

                                    <div class="row pt-1 kodeTujuan">
                                        <div class="col-sm-3">
                                            <label for="kodeBarangTujuan">Kode Type</label>
                                        </div>
                                        <div class="col-md-8">
                                            <select id="idtype2Select" name="idtype2Select" class="form-control"
                                                style="width: 100%">
                                                <option disabled selected>Pilih Kode Barang/Type/Nama Type</option>
                                            </select>
                                        </div>
                                        {{-- <div class="col-sm-8">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="kodeTypeTujuan" readonly
                                                        name="kodeTypeTujuan">
                                                    <div class="input-group-append">
                                                        <button type="button" id="btn_idtype2"
                                                            class="btn btn-info">...</button>
                                                    </div>
                                                </div>
                                            </div> --}}
                                    </div>

                                    {{-- <div class="row pt-1">
                                            <div class="col-sm-3">
                                                <label for="namaTypeAsal">Nama Type</label>
                                            </div>
                                            <div class="col-md-8">
                                                <select id="namaTypeSelect" name="namaTypeSelect" class="form-control" style="width: 100%">
                                                    <option disabled selected>Pilih Nama Type</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="input-group">
                                                    <input type="text" id="namaTypeAsal" name="namaTypeAsal" readonly
                                                        class="form-control">
                                                    <div class="input-group-append">
                                                        <button type="button" id="btn_namatype"
                                                            class="btn btn-info">...</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> --}}

                                    <div class="row pt-1 pb-1">
                                        <div class="col-sm-3">
                                            <label for="uraianAsal">Uraian Transaksi</label>
                                        </div>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="uraianAsal"
                                                name="uraianAsal">
                                        </div>
                                    </div>

                                    <div class="baris-1 pl-3">
                                        <div class="row mt-2 mb-2">
                                            <span><strong>Posisi Saldo Akhir</strong></span>
                                        </div>
                                        <div class="row align-items-center">
                                            <div class="col-sm-1"><label>Primer</label></div>
                                            <div class="col-sm-2"><input type="text" class="form-control" id="primerAkhirAsal" readonly name="primerAkhirAsal"></div>
                                            <div class="col-sm-1"><span id="asalP">P</span></div>

                                            <div class="col-sm-1"><label>Sekunder</label></div>
                                            <div class="col-sm-2"><input type="text" class="form-control" id="sekunderAkhirAsal" readonly name="sekunderAkhirAsal"></div>
                                            <div class="col-sm-1"><span id="asalS">S</span></div>

                                            <div class="col-sm-1"><label>Tritier</label></div>
                                            <div class="col-sm-2"><input type="text" class="form-control" id="triterAkhirAsal" readonly name="triterAkhirAsal"></div>
                                            <div class="col-sm-1"><span id="asalT">T</span></div>
                                        </div>
                                        <br>
                                    </div>

                                    <div class="baris-1 pl-3" id="hargaSatuanDiv" style="display: none">
                                        <div class="row mt-2 mb-2">
                                            <span><strong>Harga Satuan</strong></span>
                                        </div>
                                        <div class="row">

                                            <div class="col-sm-2 mb-2">
                                                <label>Harga Satuan Rp.</label>
                                            </div>
                                            <div class="col-sm-2">
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                        id="hargaSatuan" name="hargaSatuan">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="baris-1 pl-3">
                                        <div class="row mt-2 mb-2">
                                            <span><strong>Jumlah Yang DiKonversi</strong></span>
                                        </div>
                                        <div class="row">

                                            <div class="col-sm-1 mb-2">
                                                <label>Primer</label>
                                            </div>
                                            <div class="col-sm-2">
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                        id="primerKonversiAsal" name="primerKonversiAsal">
                                                </div>
                                            </div>

                                            <div class="col-sm-1" style="margin-left: 5%">
                                                <label>Sekunder</label>
                                            </div>
                                            <div class="col-sm-2" style="margin-left: 3%">
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                        id="sekunderKonversiAsal" name="sekunderKonversiAsal">
                                                </div>
                                            </div>

                                            <div class="col-sm-1" style="margin-left: 6%">
                                                <label>Tritier</label>
                                            </div>
                                            <div class="col-sm-2" style="margin-left: 3%">
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                        id="triterKonversiAsal" name="triterKonversiAsal">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" id="btn_prosesAsal" disabled
                                        class="btn btn-primary">PROSES</button>
                                    <button type="button" class="btn btn-secondary"
                                        data-dismiss="modal">TUTUP</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    {{-- modal tujuan --}}
                    <div class="modal fade bd-example-modal-lg" id="modalTujuanKonversi" tabindex="-1"
                        role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Tujuan Konversi</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <label for="tanggalTujuan">Tanggal</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="date" id="tanggalTujuan" name="tanggalTujuan"
                                                class="form-control">
                                        </div>
                                    </div>
                                    <div class="row pt-1">
                                        <div class="col-sm-3">
                                            <label for="divisiIdTujuan">Divisi</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="text" id="divisiIdTujuan" name="divisiIdTujuan"
                                                class="form-control">
                                        </div>
                                        <div class="col-sm-6">
                                            <input type="text" class="form-control" id="divisiNamaTujuan"
                                                name="divisiNamaTujuan">
                                        </div>
                                    </div>

                                    <div class="row pt-1">
                                        <div class="col-sm-3">
                                            <label for="objekIdTujuan">Objek</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="text" id="objekIdTujuan" name="objekIdTujuan"
                                                class="form-control">
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="objekNamaTujuan"
                                                    name="objekNamaTujuan">
                                                <div class="input-group-append">
                                                    <button type="button" id="btn_objek"
                                                        class="btn btn-info">...</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row pt-1">
                                        <div class="col-sm-3">
                                            <label for="kelutIdTujuan">Kel. Utama</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="text" id="kelutIdTujuan" name="kelutIdTujuan"
                                                class="form-control">
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="kelutNamaTujuan"
                                                    name="kelutNamaTujuan">
                                                <div class="input-group-append">
                                                    <button type="button" id="btn_kelut"
                                                        class="btn btn-info">...</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row pt-1">
                                        <div class="col-sm-3">
                                            <label for="kelompokIdTujuan">Kelompok</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="text" id="kelompokIdTujuan" name="kelompokIdTujuan"
                                                class="form-control">
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="kelompokNamaTujuan"
                                                    name="kelompokNamaTujuan">
                                                <div class="input-group-append">
                                                    <button type="button" id="btn_kelompok"
                                                        class="btn btn-info">...</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row pt-1">
                                        <div class="col-sm-3">
                                            <label for="subkelIdTujuan">Sub Kelompok</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="text" id="subkelIdTujuan" name="subkelIdTujuan"
                                                class="form-control">
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="subkelNamaTujuan"
                                                    name="subkelNamaTujuan">
                                                <div class="input-group-append">
                                                    <button type="button" id="btn_subkel"
                                                        class="btn btn-info">...</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row pt-1">
                                        <div class="col-sm-3">
                                            <label for="kodeBarangTujuan">Kd Barang/Type</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="text" id="kodeBarangTujuan" name="kodeBarangTujuan"
                                                class="form-control">
                                        </div>
                                        <div class="col-sm-5">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="kodeTypeTujuan"
                                                    name="kodeTypeTujuan">
                                                <div class="input-group-append">
                                                    <button type="button" id="btn_idtype"
                                                        class="btn btn-info">...</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row pt-1">
                                        <div class="col-sm-3">
                                            <label for="namaTypeTujuan">Nama Type</label>
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="input-group">
                                                <input type="text" id="namaTypeTujuan" name="namaTypeTujuan"
                                                    class="form-control">
                                                <div class="input-group-append">
                                                    <button type="button" id="btn_namatype"
                                                        class="btn btn-info">...</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row pt-1 pb-1">
                                        <div class="col-sm-3">
                                            <label for="uraianTujuan">Uraian Transaksi</label>
                                        </div>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="uraianTujuan"
                                                name="uraianTujuan">
                                        </div>
                                    </div>

                                    <div class="baris-1 pl-3">
                                        <div class="row mt-2 mb-2">
                                            <span><strong>Posisi Saldo Akhir</strong></span>
                                        </div>
                                        <div class="row">

                                            <div class="col-sm-1 mb-2">
                                                <label>Primer</label>
                                            </div>
                                            <div class="col-sm-2">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="primerAkhirTujuan"
                                                        name="primerAkhirTujuan">
                                                </div>
                                            </div>
                                            <div class="col-sm-1" style="margin-left: -3%">
                                                <span id="tujuanP">P</span>
                                            </div>

                                            <div class="col-sm-1">
                                                <label>Sekunder</label>
                                            </div>
                                            <div class="col-sm-2" style="margin-left: 3%">
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                        id="sekunderAkhirTujuan" name="sekunderAkhirTujuan">
                                                </div>
                                            </div>
                                            <div class="col-sm-1" style="margin-left: -3%">
                                                <span id="tujuanS">S</span>
                                            </div>

                                            <div class="col-sm-1">
                                                <label>Tritier</label>
                                            </div>
                                            <div class="col-sm-2" style="margin-left: 3%">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="triterAkhirTujuan"
                                                        name="triterAkhirTujuan">
                                                </div>
                                            </div>
                                            <div class="col-sm-1" style="margin-left: -3%">
                                                <span id="tujuanT">T</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="baris-1 pl-3">
                                        <div class="row mt-2 mb-2">
                                            <span><strong>Jumlah Yang DiKonversi</strong></span>
                                        </div>
                                        <div class="row">

                                            <div class="col-sm-1 mb-2">
                                                <label>Primer</label>
                                            </div>
                                            <div class="col-sm-2">
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                        id="primerKonversiTujuan" name="primerKonversiTujuan">
                                                </div>
                                            </div>

                                            <div class="col-sm-1" style="margin-left: 5%">
                                                <label>Sekunder</label>
                                            </div>
                                            <div class="col-sm-2" style="margin-left: 3%">
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                        id="sekunderKonversiTujuan" name="sekunderKonversiTujuan">
                                                </div>
                                            </div>

                                            <div class="col-sm-1" style="margin-left: 6%">
                                                <label>Tritier</label>
                                            </div>
                                            <div class="col-sm-2" style="margin-left: 3%">
                                                <div class="input-group">
                                                    <input type="text" class="form-control"
                                                        id="triterKonversiTujuan" name="triterKonversiTujuan">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" id="btn_prosesTujuan"
                                        class="btn btn-primary">PROSES</button>
                                    <button type="button" class="btn btn-secondary"
                                        data-dismiss="modal">TUTUP</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="{{ asset('css/Kencana/KonversiBarang.css') }}">
<script src="{{ asset('js/Kencana/KonversiBarang.js') }}"></script>
<link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
<script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
