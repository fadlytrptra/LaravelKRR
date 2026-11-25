@extends('layouts.appKencana')
@section('content')
@section('title', 'Update Detail BKM')

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
        max-width: 65%;
        /* Adjust the percentage as needed */
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Update Detail BKM</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <!-- Form fields go here -->
                        <div class="d-flex">
                            <div class="col-md-2">
                                <label for="bulanTahun" style="margin-right: 10px;">Bulan/Tahun</label>
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="bulan" name="bulan" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="tahun" name="tahun" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn-primary" id="btn_ok">OK</button>
                            </div>
                            <!--Kedua button dibawah tidak digunakan, karena di vb nya, diset visible = false-->
                            <div class="col-md-2">
                                <input type="submit" id="btnPilihBank" name="btnPilihBank" value="Pilih Bank"
                                    class="btn" style="display: none;">
                            </div>
                            <div class="col-md-2">
                                <input type="submit" id="btnGroupBKM" name="btnGroupBKM" value="Group BKM"
                                    class="btn" style="display: none;">
                            </div>
                        </div>

                        <br>
                        <div>
                            Data Pelunasan
                            <div style="overflow-y: auto;">
                                <table style="width: 160%; table-layout: fixed;" id="table_atas">
                                    <colgroup>
                                        <col style="width: 15%;">
                                        <col style="width: 15%;">
                                        <col style="width: 15%;">
                                        <col style="width: 20%;">
                                        <col style="width: 15%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                    </colgroup>
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Tgl Input</th>
                                            <th>Id. BKM</th>
                                            <th>Tgl. Pelunasan</th>
                                            <th>Id. Pelunasan</th>
                                            <th>Id. Bank</th>
                                            <th>Jenis Pembayaran</th>
                                            <th>Mata Uang</th>
                                            <th>Total Pelunasan</th>
                                            <th>No. Bukti</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!--CARD 1-->
                        <br>
                        <div class="card-container" style="display: flex;">
                            <div class="card" style="width: 40%;">
                                <div class="card-body">
                                    <div class="col-md-6">
                                        <input type="radio" name="radiogrupDetail" value="1" id="radio_1">
                                        <label for="radio_1">Detail Pelunasan</label>
                                    </div>
                                    <div style="overflow-x: auto; overflow-y: auto;">
                                        <table style="width: 240%; table-layout: fixed;" id="table_rp">
                                            <colgroup>
                                                <col style="width: 30%;">
                                                <col style="width: 30%;">
                                                <col style="width: 40%;">
                                                <col style="width: 30%;">
                                                <col style="width: 30%;">
                                                <col style="width: 25%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Id. Penagihan</th>
                                                    <th>Nilai Pelunasan</th>
                                                    <th>Pelunasan Rupiah</th>
                                                    <th>Kode Perkiraan</th>
                                                    <th>Customer</th>
                                                    <th>Id. Detail</th>
                                                    {{-- <th>Tgl. Penagihan</th>
                                                        <th>Id. Pelunasan</th> --}}
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
                                    <div class="col-md-6">
                                        <input type="radio" name="radiogrupDetail" value="2" id="radio_2">
                                        <label for="radio_2">Detail Biaya</label>
                                    </div>
                                    <div style="overflow-x: auto;">
                                        <table style="width: 120%; table-layout: fixed;" id="table_rb">
                                            <colgroup>
                                                <col style="width: 30%;">
                                                <col style="width: 30%;">
                                                <col style="width: 30%;">
                                                <col style="width: 30%;">
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
                                        <input type="radio" name="radiogrupDetail" value="3" id="radio_3">
                                        <label for="radio_3">Detail Kurang/Lebih</label>
                                    </div>
                                    <div style="overflow-x: auto;">
                                        <table style="width: 120%; table-layout: fixed;" id="table_rk">
                                            <colgroup>
                                                <col style="width: 30%;">
                                                <col style="width: 35%;">
                                                <col style="width: 30%;">
                                                <col style="width: 25%;">
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
                                <div class="col-1">
                                    <button type="button" class="btn btn-warning" id="btn_koreksi"
                                        style="width: 100px;">Koreksi</button>
                                </div>
                                <div class="col-1">
                                    <button type="button" class="btn" id="btn_tampilbkm"
                                        style="width: 100px;">Tampil BKM</button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn" id="btn_batal"
                                        style="width: 100px;">Batal</button>
                                </div>
                            </div>
                        </div>

                        <!--MODAL MAINTENANCE DETAIL PELUNASAN-->
                        <div class="modal fade" id="modalDetailPelunasan" tabindex="-1" role="dialog"
                            aria-labelledby="modalDetailPelunasan" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Maintenance Pilih Bank BKM</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close">
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
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <label for="iddetail" style="margin-right: 10px;">Id.
                                                    Pelunasan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="id_pelunasanMP" name="id_penagihanMP"
                                                    class="form-control" style="width: 100%">
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
                                                    class="form-control" style="width: 100%">
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
                                                    class="form-control" style="width: 100%">
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
                                                    style="width: 100%">
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
                                            <div class="col-md-2">
                                                <input type="text" id="id_perkiraanMP" name="id_perkiraanMP"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" id="ket_perkiraanMP" name="ket_perkiraanMP"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-1">
                                                <button type="button" class="btn btn-default"
                                                    id="btn_perkiraanMP">...</button>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-10">
                                                <button type="button" class="btn btn-success" id="btn_prosesMP"
                                                    style="width: 100px;">Proses</button>
                                            </div>
                                            <div class="col-1 text-end">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal" id="tutup_pelunasan">Tutup</button>
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
                                        <h5 class="modal-title" id="pilihBankModal">Maintenance Kurang/Lebih BKM</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close">
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
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <input type="hidden" name="idcoba" id="idcoba" value="idcoba">
                                    </div>
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                Perkiraan</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="id_perkiraanMK" name="id_perkiraanMK"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-6">
                                            <input type="text" id="ket_perkiraanMK" name="ket_perkiraanMK"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-default"
                                                id="btn_perkiraanMK">...</button>
                                        </div>
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
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                id="tutup_kuranglebih">Tutup</button>
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
                                        <h5 class="modal-title" id="pilihBankModal">Maintenance Kurang/Lebih BKM</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close">
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
                                            <input type="text" id="jumlahBiaya_MB" name="jumlahBiaya_MB"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3">
                                            <label for="idDetailBiaya" style="margin-right: 10px;">Id.
                                                Detail</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="id_detailMB"
                                                name="id_detailMB"class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                Perkiraan</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="id_perkiraanMB" name="id_perkiraanMB"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-6">
                                            <input type="text" id="ket_perkiraanMB" name="ket_perkiraanMB"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-default"
                                                id="btn_perkiraanMB">...</button>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="keterangan" style="margin-right: 10px;">Keterangan</label>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" id="keterangan_MB" name="keterangan_MB"
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-10">
                                            <button type="button" class="btn btn-success" id="btn_prosesMB"
                                                style="width: 100px;">Proses</button>
                                        </div>
                                        <div class="col-1 text-end">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                id="tutup_biaya">Tutup</button>
                                        </div>
                                    </div>
                                    <br>
                                    <input type="hidden" name="detpelunasan" id="detpelunasan" value="detbiaya">
                                </div>
                            </div>
                        </div>

                        <!--FORM TAMPIL BKM-->
                        <div class="modal fade" id="dataBKKModal" tabindex="-1" aria-labelledby="dataBKKModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog custom-modal-width">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="dataBKKModalLabel">Data BKM</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close" id="close_modalbkm">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-inline">
                                            <label for="month">Bln/Thn:&nbsp;</label>
                                            <input type="date" id="tgl_awalbkm" class="form-control"
                                                style="width: 160px">
                                            <span>&nbsp;S/D&nbsp;</span>
                                            <input type="date" id="tgl_akhirbkm" class="form-control"
                                                style="width: 160px">
                                            <span>&nbsp;&nbsp;</span>
                                            <button id="btn_okbkm" type="button" class="btn btn-primary">OK</button>
                                        </div>
                                        <div class="form-group mt-3">
                                            <label for="bkm">Id. BKM:</label>
                                            <input type="text" id="bkm" class="form-control">
                                            <input type="text" id="terbilang" class="form-control"
                                                style="display: none">
                                            <input type="text" id="id_matauang" class="form-control"
                                                style="display: none">
                                        </div>
                                        <div class="table-responsive">
                                            <table id="tabletampilBKM">
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
                                        <button id="btn_cetakbkm" type="button"
                                            class="btn btn-success">Cetak</button>
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
            </div>
        </div>
    </div>
</div>

{{-- style="visibility: hidden;" --}}
<div class="print" style="visibility: hidden;">
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
                        <span style="font-size: 18px; font-weight: bold; padding-left: 45px">GRAND TOTAL: </span><span
                            id="symbol2" style="font-size: 18px; padding-right: 20px"></span>
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
</div>
<script src="{{ asset('js/Kencana/UpdateDetailBKM.js') }}"></script>
@endsection
