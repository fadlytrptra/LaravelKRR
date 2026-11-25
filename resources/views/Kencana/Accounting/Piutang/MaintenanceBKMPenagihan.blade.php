@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance BKM Penagihan')
@include('Kencana.Accounting.Piutang.PrintMaintenanceBKMPenagihan')
{{-- @include('Accounting.Piutang.ModalMaintenanceBKMPenagihanPilihBank') --}}
<style>
    @media print {
        .card {
            display: none;
        }

        .print {
            visibility: visible !important;
        }

        .modal {
            display: none !important;
        }

        .fade {
            opacity: 0 !important;
        }
    }
</style>
<style>
    .custom-modal-width {
        max-width: 50%;
        /* Adjust the percentage as needed */
    }

    .custom-modal-widthBKM {
        max-width: 70%;
        /* Adjust the percentage as needed */
    }
</style>
<div class="container-fluid inti">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance BKM Penagihan</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">

                        {{ csrf_field() }}
                        <input type="hidden" name="_method" id="methodkoreksi">
                        <!-- Form fields go here -->
                        <div style="display: flex; flex-direction: row">
                            <div style="display: flex; flex-direction: row; width:50%">
                                <div style="align-self: end;">
                                    <label for="bulanTahun" style="margin-right: 10px;">Bulan/Tahun</label>
                                </div>
                                <div style="width: 15%;margin-right: 1%">
                                    <input type="text" id="bulan" name="bulan" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div style="width: 15%;margin-right: 2%">
                                    <input type="text" id="tahun" name="tahun" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div>
                                    <button type="button" class="btn btn" id="btn_ok"
                                        style="width:50px;">OK</button>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: row;width:50%">
                                <button type="button" class="btn btn" id="btn_pilihBank" style="width:150px;">Pilih
                                    Bank</button>
                                <button type="button" class="btn btn" id="btn_group" style="width:150px;">Group
                                    BKM</button>
                            </div>
                        </div>
                        <input type="hidden" id="tglInputNew" name="tglInputNew" class="form-control">
                        <input type="hidden" id="idBKMNew" name="idBKMNew" class="form-control">
                        <br>
                        <div>
                            <h5 style="font-weight: bold">Data Pelunasan</h5>
                            <div style="overflow-y: auto;">
                                <table id="table_atas">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Tgl Pelunasan</th>
                                            <th>Id. Pelunasan</th>
                                            <th>Id. Bank</th>
                                            <th>Jenis Pembayaran</th>
                                            <th>Mata Uang</th>
                                            <th>Total Pelunasan</th>
                                            <th>No. Bukti</th>
                                            <th>Tgl Pembuatan</th>
                                            <th>IdCust</th>
                                            <th>Jenis Bayar</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                                <input type="hidden" id="jenisBank" name="jenisBank" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="total" name="total" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="uang" name="uang" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="konversi" name="konversi" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="sisa" name="sisa" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="idbkm" name="idbkm" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>

                        <!--CARD 1-->
                        <br>
                        <div class="card-container" style="display: flex;">
                            <div class="card" style="width: 40%;">
                                <div class="card-body">
                                    <div class="col-md-12">
                                        <input type="radio" name="radiogrupDetail" value="radio1"
                                            id="radioDetailPelunasan">
                                        <label for="radioDetailPelunasan">Detail Pelunasan</label>
                                    </div>
                                    <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                        <table style="width: 280%; table-layout: fixed;"id="table_detailPelunasan">
                                            {{-- <colgroup>
                                                <col style="width: 40%;">
                                                <col style="width: 40%;">
                                                <col style="width: 40%;">
                                                <col style="width: 40%;">
                                                <col style="width: 40%;">
                                                <col style="width: 40%;">
                                                <col style="width: 40%;">
                                            </colgroup> --}}
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Id. Penagihan</th>
                                                    <th>Nilai Pelunasan</th>
                                                    <th>Pelunasan Rupiah</th>
                                                    <th>Kode Perkiraan</th>
                                                    <th>Customer</th>
                                                    <th>Id. Detail</th>
                                                    <th>Tgl. Penagihan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <!--CARD 2-->
                            <div class="card" style="width: 30%; overflow-y: auto;">
                                <div class="card-body">
                                    <div class="col-md-12">
                                        <input type="radio" name="radiogrupDetail" value="radio2"
                                            id="radioDetailBiaya">
                                        <label for="radioDetailBiaya">Detail Biaya</label>
                                    </div>
                                    <div style="overflow-x: auto;">
                                        <table style="width: 200%; table-layout: fixed;" id="table_detailBiaya">
                                            <colgroup>
                                                <col style="width: 50%;">
                                                <col style="width: 50%;">
                                                <col style="width: 50%;">
                                                <col style="width: 50%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Keterangan</th>
                                                    <th>Jumlah Biaya</th>
                                                    <th>Kode Perkiraan</th>
                                                    <th>Id. Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <!--CARD 3-->
                            <div class="card" style="width: 30%; overflow-y: auto;">
                                <div class="card-body">
                                    <div class="col-md-12">
                                        <input type="radio" name="radiogrupDetail" value="radio3"
                                            id="radioDetailKurangLebih">
                                        <label for="radioDetailKurangLebih">Detail Kurang/Lebih</label>
                                    </div>
                                    <div style="overflow-x: auto;">
                                        <table style="width: 240%; table-layout: fixed;" id="table_kurangLebih">
                                            <colgroup>
                                                <col style="width: 60%;">
                                                <col style="width: 60%;">
                                                <col style="width: 60%;">
                                                <col style="width: 60%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Keterangan</th>
                                                    <th>Jumlah Biaya</th>
                                                    <th>Kode Perkiraan</th>
                                                    <th>Id. Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-5">
                                    <button type="button" class="btn btn-warning d-flex ml-auto"
                                        id="btn_koreksiDetail">Koreksi Detail</button>
                                    {{-- <input type="submit" id="btnKoreksiDetail" name="koreksidetail"
                                        value="Koreksi Detail" class="btn btn-warning d-flex ml-auto"
                                        onclick="validateTabel()"> --}}
                                </div>
                                <div class="col-3">
                                    <button type="button" class="btn btn d-flex ml-auto" id="btn_tampilBKM">Tampil
                                        BKM</button>
                                    {{-- <input type="submit" id="btnTampilBKM" name="btnTampilBKM" value="Tampil BKM"
                                        class="btn btn-primary d-flex ml-auto"> --}}
                                </div>
                                {{-- <div class="col-4">
                                    <input type="submit" id="btnTutup" name="tutup" value="TUTUP"
                                        class="btn btn-dark d-flex ml-auto">
                                </div> --}}
                            </div>
                        </div>

                        <!--MODAL MAINTENANCE DETAIL PELUNASAN-->
                        <div class="modal fade" id="modalDetailPelunasan" tabindex="-1" role="dialog"
                            aria-labelledby="modalDetailPelunasan" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Maintenance Pelunasan</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close" id="tutup_modalMP">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <input type="hidden" name="_method" id="methoddetail">
                                    <div class="modal-body">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idPenagihan" style="margin-right: 10px;">Id.
                                                    Penagihan</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="id_penagihanMP" name="id_penagihanMP"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="iddetail" style="margin-right: 10px;">Id.
                                                    Pelunasan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="id_pelunasanMP" name="id_penagihanMP"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="namaCustomer" style="margin-right: 10px;">Nama
                                                    Customer</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" id="namaCustomer_MP" name="namaCustomer_MP"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="nilaiPelunasan" style="margin-right: 10px;">Nilai
                                                    Pelunasan</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="nilai_pelunasanMP" name="nilai_pelunasanMP"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="pelunasanRupiah" style="margin-right: 10px;">Pelunasan
                                                    Rupiah</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="pelunasanRupiah_MP"
                                                    name="pelunasanRupiah_MP" class="form-control"
                                                    style="width: 100%" readonly>
                                            </div>
                                            <input type="hidden" id="TDet" name="TDet" class="form-control"
                                                style="width: 100%">
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="input-group" style="width: 100%;"> <!-- Ensure full width here -->
                                                <select name="select_kodePerkiraanMP" id="select_kodePerkiraanMP" class="form-control" style="width: 100%;"> <!-- Full width for select -->
                                                    <option disabled selected>Pilih Kode Perkiraan</option>
                                                    @foreach ($kodePerkiraan as $d)
                                                        <option value="{{ $d->NoKodePerkiraan }}">{{ $d->Keterangan }} | {{ $d->NoKodePerkiraan }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            {{-- <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="id_perkiraanMP" name="id_perkiraanMP"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" id="ket_perkiraanMP" name="ket_perkiraanMP"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-1">
                                                <button type="button" class="btn btn-default"
                                                    id="btn_perkiraanMP">...</button>
                                            </div> --}}
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-10">
                                                <button type="button" class="btn btn-success" id="btn_prosesMP"
                                                    style="width: 100px;">Proses</button>
                                            </div>
                                            <div class="col-1 text-end">
                                                {{-- <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal" id="tutup_pelunasan">Tutup</button> --}}
                                            </div>
                                        </div>
                                        <input type="hidden" name="detpelunasan" id="detpelunasan"
                                            value="detpelunasan">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--MODAL DETAIL KURANG/LEBIH-->
                        <div class="modal fade" id="modalDetailKurangLebih" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="pilihBankModal">Maintenance Kurang/Lebih</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close" id="tutup_modalMK">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <input type="hidden" name="_method" id="methodkuranglebih">
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="jumlahUang" style="margin-right: 10px;">Jumlah
                                                Uang</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="jumlahUang_MK" name="jumlahUang_MK"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <input type="hidden" name="id_detailMK" id="id_detailMK">
                                    </div>
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                Perkiraan</label>
                                        </div>
                                        <div class="input-group" style="width: 100%;"> <!-- Ensure full width here -->
                                            <select name="select_kodePerkiraanMK" id="select_kodePerkiraanMK" class="form-control" style="width: 100%;"> <!-- Full width for select -->
                                                <option disabled selected>Pilih Kode Perkiraan</option>
                                                @foreach ($kodePerkiraan as $d)
                                                    <option value="{{ $d->NoKodePerkiraan }}">{{ $d->Keterangan }} | {{ $d->NoKodePerkiraan }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        {{-- <div class="col-md-3">
                                            <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                Perkiraan</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="id_perkiraanMK" name="id_perkiraanMK"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-6">
                                            <input type="text" id="ket_perkiraanMK" name="ket_perkiraanMK"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-default"
                                                id="btn_perkiraanMK">...</button>
                                        </div> --}}
                                    </div>
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="keterangan" style="margin-right: 10px;">Keterangan</label>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" id="keterangan_MK" name="keterangan_MK"
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-10">
                                            <button type="button" class="btn btn-success" id="btn_prosesMK"
                                                style="width: 100px;">Proses</button>
                                        </div>
                                        <div class="col-1 text-end">
                                            {{-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                id="tutup_kuranglebih">Tutup</button> --}}
                                        </div>
                                    </div>
                                    <br>
                                    <input type="hidden" name="detpelunasan" id="detpelunasan"
                                        value="detkuranglebih">
                                </div>
                            </div>
                        </div>


                        <!--MODAL DETAIL BIAYA-->
                        <div class="modal fade" id="modalDetailBiaya" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="pilihBankModal">Maintenance Biaya</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close" id="tutup_modalB">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <input type="hidden" name="_method" id="methodbiaya">
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="jumlahBiaya" style="margin-right: 10px;">Jumlah
                                                Biaya</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="jumlahBiaya_MBia" name="jumlahBiaya_MBia"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-3">
                                            <label for="idDetailBiaya" style="margin-right: 10px;">Id.
                                                Detail</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="id_detailMBia"
                                                name="id_detailMBia"class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                Perkiraan</label>
                                        </div>
                                        <div class="input-group" style="width: 100%;"> <!-- Ensure full width here -->
                                            <select name="select_kodePerkiraanMBia" id="select_kodePerkiraanMBia" class="form-control" style="width: 100%;"> <!-- Full width for select -->
                                                <option disabled selected>Pilih Kode Perkiraan</option>
                                                @foreach ($kodePerkiraan as $d)
                                                    <option value="{{ $d->NoKodePerkiraan }}">{{ $d->Keterangan }} | {{ $d->NoKodePerkiraan }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        {{-- <div class="col-md-2">
                                            <input type="text" id="id_perkiraanMBia" name="id_perkiraanMBia"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-6">
                                            <input type="text" id="ket_perkiraanMBia" name="ket_perkiraanMBia"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-default"
                                                id="btn_perkiraanMBia">...</button>
                                        </div> --}}
                                    </div>
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="keterangan" style="margin-right: 10px;">Keterangan</label>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" id="keterangan_MBia" name="keterangan_MBia"
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-10">
                                            <button type="button" class="btn btn-success" id="btn_prosesMBia"
                                                style="width: 100px;">Proses</button>
                                        </div>
                                        <div class="col-1 text-end">
                                            {{-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                id="tutup_biaya">Tutup</button> --}}
                                        </div>
                                    </div>
                                    <br>
                                    <input type="hidden" name="detpelunasan" id="detpelunasan" value="detbiaya">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Tampil BKM-->
        <div class="modal fade" id="dataBKMModal" tabindex="-1" aria-labelledby="dataBKMModalLabel"
            aria-hidden="true">
            <div class="modal-dialog custom-modal-widthBKM">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="dataBKMModalLabel">Data BKM</h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"
                            id="close_modalbkm">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-inline">
                            <label for="month">Bln/Thn:&nbsp;</label>
                            <input type="date" id="tgl_awalbkk" class="form-control" style="width: 160px">
                            <span>&nbsp;S/D&nbsp;</span>
                            <input type="date" id="tgl_akhirbkk" class="form-control" style="width: 160px">
                            <span>&nbsp;&nbsp;</span>
                            <button id="btn_okbkm" type="button" class="btn btn-primary">OK</button>
                        </div>
                        <div class="form-group mt-3">
                            <label for="bkm">Id. BKM:</label>
                            <input type="text" id="bkm" class="form-control">
                            <input type="text" id="terbilang" class="form-control" style="display: none">
                            <input type="text" id="id_matauang" class="form-control" style="display: none">
                        </div>
                        <div class="table-responsive">
                            <table style="width: 100%;" id="table_tampilBKM">
                                <thead class="table-dark">
                                    <tr>
                                        <th>Tanggal Input</th>
                                        <th>Id. BKM</th>
                                        <th>Nilai Pelunasan</th>
                                        <th>Terbilang</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="btn_cetakbkm" type="button" class="btn btn-success">Cetak</button>
                        <button id="btn_prosesbkm" type="button" class="btn btn-success"
                            style="display: none">Proses</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            id="tutup_modalbkk">Tutup</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--MODAL PILIH BANK-->
<div class="modal fade" id="modalPilihBank" tabindex="-1" role="dialog" aria-labelledby="modalPilihBank"
    aria-hidden="true">
    <div class="modal-dialog custom-modal-width" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="pilihBankModal">Maintenance Pilih Bank BKM
                </h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" id="tutupModalB">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <input type="hidden" name="_method" id="methoddetail">
            <div class="modal-body">
                <div class="d-flex">
                    <div class="col-md-2">
                        <label for="idPelunasanM" style="margin-right: 10px;">Id.
                            Pelunasan</label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" id="idPelunasanM" name="idPelunasanM" class="form-control"
                            style="width: 100%" readonly>
                    </div>
                </div>
                <br>
                <div class="d-flex">
                    <div class="col-md-2">
                        <label for="tanggalInputM" style="margin-right: 10px;">Tanggal
                            Input</label>
                    </div>
                    <div class="col-md-3">
                        <input type="date" id="tanggalInputM" name="tanggalInputM" class="form-control"
                            style="width: 100%">
                    </div>
                    <div class="col-md-2">
                        <label for="tanggalTagihM" style="margin-right: 10px;">Tanggal
                            Tagih</label>
                    </div>
                    <div class="col-md-3">
                        <input type="date" id="tanggalTagihM" name="tanggalTagihM" class="form-control"
                            style="width: 100%" readonly>
                    </div>
                </div>
                <br>
                <div class="d-flex">
                    <div class="col-md-2">
                        <label for="jenisBayarM" style="margin-right: 10px;">Jenis
                            Bayar</label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" id="jenisBayarM" name="jenisBayarM" class="form-control"
                            style="width: 100%" readonly>
                    </div>
                </div>
                <br>
                <div class="d-flex">
                    <div class="col-md-2">
                        <label for="select_bankM" style="margin-right: 10px;">Bank</label>
                    </div>
                    <div class="col-md-8">
                        <div class="col-md-1" style="display: none">
                            <input type="text" id="jenisMB" name="jenisMB"
                                class="form-control" style="width: 100%" readonly>
                        </div>
                        <div class="input-group" style="width: 100%;">
                            <!-- Ensure full width here -->
                            <select name="select_bankM" id="select_bankM" class="form-control"
                                style="width: 100%;">
                                <!-- Full width for select -->
                                <option disabled selected>Pilih Bank</option>
                                @foreach ($banks as $d)
                                    <option value="{{ $d->Id_Bank }}">{{ $d->Id_Bank }}
                                        | {{ $d->Nama_Bank }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                {{-- <div class="d-flex">
                <div class="col-md-2">
                    <label for="pelunasanRupiah" style="margin-right: 10px;">Bank</label>
                </div>
                <div class="col-md-2">
                    <input type="text" id="idBankM" name="idBankM"
                        class="form-control" style="width: 100%" readonly>
                </div>
                <div class="col-md-6">
                    <input type="text" id="namaBankM" name="namaBankM"
                        class="form-control" style="width: 100%" readonly>
                </div>
                <div class="col-md-1" style="display: none">
                    <input type="text" id="jenisMB" name="jenisMB"
                        class="form-control" style="width: 100%" readonly>
                </div>
                <div class="col-md-1">
                    <button type="button" class="btn btn-default"
                        id="btn_bankM">...</button>
                </div>
            </div> --}}
                <br>
                <div class="d-flex">
                    <div class="col-md-2">
                        <label for="kodePerkiraan" style="margin-right: 10px;">Mata
                            Uang</label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" id="mataUangM" name="mataUangM" class="form-control"
                            style="width: 100%" readonly>
                    </div>
                </div>
                <br>
                <div class="d-flex">
                    <div class="col-md-2">
                        <label for="kodePerkiraan" style="margin-right: 10px;">Nilai
                            Pelunasan</label>
                    </div>
                    <div class="col-md-5">
                        <input type="text" id="nilaiPeluansanM" name="nilaiPeluansanM" class="form-control"
                            style="width: 100%" readonly>
                    </div>
                </div>
                <br>
                <div class="d-flex">
                    <div class="col-md-2">
                        <label for="kodePerkiraan" style="margin-right: 10px;">No.
                            Bukti</label>
                    </div>
                    <div class="col-md-5">
                        <input type="text" id="noBuktiM" name="noBuktiM" class="form-control"
                            style="width: 100%" readonly>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-5">
                        <button type="button" class="btn btn-success" id="btn_prosesMB"
                            style="width: 100px;">Proses</button>
                    </div>
                    <div class="col-3">
                    </div>
                    <div class="col-4">
                        {{-- <input type="submit" id="btnTutupModal" name="btnTutupModal"
                            value="Tutup" class="btn btn-primary"> --}}
                    </div>
                </div>
                <input type="hidden" name="detpelunasan" id="detpelunasan" value="detpelunasan">
            </div>
            </form>
        </div>
    </div>
</div>
{{--  --}}
{{-- <div class="print" style="visibility: hidden;">
            <div class="container">
                <div class="row">
                    <div class="col-5" style="padding-right: 25px;">
                        <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                            <h4 style="font-weight: bold">P.T. KERTA RAJASA RAYA</h4>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                            <h4 style="font-weight: bold">BUKTI PENERIMAAN KAS</h4>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-5" style="padding-right: 25px;">
                        <div class="row" style="border: solid 1px; text-align-last: center;">
                            <div class="col-12" style="height: 3vh; ">
                                <span style="font-weight: bold; font-size: 22px;">Jl. Raya Tropodo No. 1</span><br>
                            </div>
                            <div class="col-12">
                                <span style="font-weight: bold; font-size: 22px;">WARU - SIDOARJO</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row" style="border: solid 1px; text-align-last: center;">
                            <div id="id_BKM" class="col-12" style="height: 3vh;">
                                <span style="display: inline; font-size: 22px; font-weight: bold">NOMER: </span> <span
                                    id="nomer"
                                    style="display: inline; margin-top: -5px; font-size: 22px; font-weight: bold;"></span>
                            </div>
                            <div id="tanggal" class="col-12">
                                <span style="display: inline; font-size: 22px; font-weight: bold">TANGGAL: </span><span
                                    id="tglCetak"
                                    style="display: inline; margin-top: -5px; font-size: 22px; font-weight: bold;"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <br>
                <div class="row">
                    <div class="col-12" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                            <div class="col-12" style="height: 2.5vh;">
                                <span style="display: inline; font-size: 18px; padding-left: 50px">Jumlah Diterima:
                                </span><span id="symbol"
                                    style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 15px"></span><span
                                    id="jumlahDiterima" name="jumlahDiterima"
                                    style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 15px"></span>
                            </div>
                            <div class="col-12">
                                <span style="display: inline; font-size: 18px; padding-left: 50px">Terbilang: </span>
                            </div>
                            <div class="col-12">
                                <span id="terbilangCetak"
                                    style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 50px"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                            <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                                <span style="font-size: 18px; ">RINCIAN PENERIMAAN</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-3" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                            <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                                <span style="font-size: 18px;">KODE PERKIRAAN</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-2" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                            <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                                <span style="font-size: 18px;">JUMLAH</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                            <div class="col-12" style="height: 4vh;">
                                <div class="row">
                                    <div class="col-7" style="text-align-last: left;">
                                        <span id="rincianPenerimaan" style="font-size: 18px;">BB</span>
                                    </div>
                                    <div class="col-2" style="text-align-last: right;">
                                        <span id="keterangan2" style="font-size: 18px;">AA</span>
                                    </div>
                                    <div class="col-3" style="text-align-last: right;">
                                        <span id="biaya" style="font-size: 18px;">CC</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                            <div class="col-12" style="height: 4vh; text-align-last: center;">
                                <span id="kodePerkiraanCetak" style="font-size: 18px;"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-2" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                            <div class="col-12" style="height: 4vh; text-align-last: right;">
                                <span id="jum1" style="font-size: 18px;">jum1</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row" style="border: solid 1px; border-bottom: 0px; border-right: 0px;">
                            <div class="col-12" style="height: 4vh; text-align-last: left;">
                                <span id="ket" style="font-size: 18px; "></span><br> <!--KET-->
                            </div>
                            <div class="col-12" style="height: 4vh; text-align-last: left;"><!--KET1-->
                                <span id="ket1" style="font-size: 18px; "></span><br>
                            </div>
                            <div class="col-12" style="height: 4vh; text-align-last: left;"><!--KET5-->
                                <span id="ket5" style="font-size: 18px;"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-3" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                            <div class="col-12" style="height: 12vh; text-align-last: center;">
                                <span id="kodePerkiraanCetak" style="font-size: 18px;"></span> <!--KD-->
                            </div>
                        </div>
                    </div>
                    <div class="col-2" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                            <div class="col-12" style="height: 4vh; text-align-last: right;">
                                <span id="totalK" style="font-size: 18px;">totalK</span>
                            </div>
                            <div class="col-12" style="height: 4vh; text-align-last: right;">
                                <span id="ket3" style="font-size: 18px;">ket3</span><span id="jum"
                                    style="font-size: 18px;">jum</span>
                            </div>
                            <div class="col-12" style="height: 4vh; text-align-last: right;">
                                <span id="ket6" style="font-size: 18px;">ket6<span id="jum2"
                                        style="font-size: 18px;">jum2</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-10" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-right: 0px; margin-right: -3.4vh;">
                            <div class="col-12" style="height: 2.5vh; text-align-last: right;">
                                <span style="font-size: 18px; font-weight: bold; padding-left: 45px">GRAND TOTAL:
                                </span><span id="symbol2" style="font-size: 18px; padding-right: 20px"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-2" style="padding-right: 25px;">
                        <div class="row"style="border: solid 1px; justify-content: left; margin-right: -2vh;">
                            <div class="col-12" style="height: 2.5vh; text-align-last: right;">
                                <span id="grandTotal" style="font-size: 18px;"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <br><br>
                <div class="row">
                    <div class="col-3" style="margin-right: 25px;">
                        <div class="row"
                            style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px; text-align-last: center;">
                            <div class="col-12" style="height: 10vh; ">
                                <span id="disetujui" style="font-size: 18px;">Disetujui,</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-3" style="margin-left: 50px">
                        <div class="row"
                            style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px; text-align-last: center;">
                            <div class="col-12" style="height: 10vh; ">
                                <span id="kasir" style="font-size: 18px;">Kasir,</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-4" style="margin-right: 25px;">
                        <div class="row" style="text-align-last: right;">
                            <div class="col-12" style="height: 10vh; ">
                                <span style="font-size: 18px;">Sidoarjo, </span><span id="tglCetakForm"
                                    style="font-size: 18px;"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> --}}

<script src="{{ asset('js/Kencana/MaintenanceBKMPenagihan.js') }}"></script>
@endsection
