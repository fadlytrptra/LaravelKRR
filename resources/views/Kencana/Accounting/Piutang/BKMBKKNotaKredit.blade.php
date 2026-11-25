@extends('layouts.appKencana')
@section('content')
@section('title', 'BKM BKK Nota Kredit')

<style>
    .table-responsive.fixed-height tbody {
        background-color: white;
    }

    .underline {
        border-bottom: 1px solid black;
        /* Change the color as needed */
        margin-bottom: 10px;
        /* Space between labels and line */
    }

    .table-responsive.fixed-height {
        /* overflow-y: auto; */
        /* position: relative; */
        border-radius: 8px;
        border: 2px solid black;
        /* width: 100%; */
        /* table-layout: fixed; */
        background-color: white;
    }

    .no-wrap-header thead th {
        white-space: nowrap;
        background-color: lightgoldenrodyellow;
        padding: 0;
    }

    .table-responsive.fixed-height tbody td {
        background-color: white;
        padding: 4px 5px;
    }

    .fixed-width {
        white-space: nowrap;
        /* Prevent text wrapping */
        overflow: hidden;
        /* Hide overflow text */
        text-overflow: ellipsis;
        /* Show "..." when the text overflows */
        padding: 0;
    }

    table.dataTable {
        table-layout: fixed;
        /* Ensure table uses fixed layout */
        width: 100%;
        /* Ensure the table takes up the full width */
    }

    #table_list th,
    #table_list td {
        padding-top: 0;
        padding-bottom: 0;
        font-size: 16px;
    }

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

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">BKM BKK Nota Kredit</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <input type="hidden" name="_method" id="methodkoreksi">
                        <div>

                            <b>Data Nota Kredit</b>
                            <div class="table-responsive fixed-height">
                                <table class="table table-bordered no-wrap-header" id="tabelNotaKredit">
                                    <thead></thead>
                                    <tbody></tbody>
                                </table>
                            </div>


                            <input type="hidden" id="idCustomer" name="idCustomer" class="form-control"
                                style="width: 100%">
                            <input type="hidden" id="idPenagihan" name="idPenagihan" class="form-control"
                                style="width: 100%">
                            <input type="hidden" id="noNotaKredit" name="noNotaKredit" class="form-control"
                                style="width: 100%">
                            <input type="hidden" id="jumlah" name="jumlah" class="form-control"
                                style="width: 100%">
                        </div>
                        <div class="card-container" style="display: flex;">
                            <div style="width: 60%;">
                                <div class="card" style>
                                    <b>BKM</b>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="tanggal" style="margin-right: 10px;">Tanggal</label>
                                        </div>
                                        <div class="col-md-5">
                                            <input type="date" id="tanggal" name="tanggal" class="form-control"
                                                style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-2" style="display: none">
                                            <input type="text" id="bulan" name="bulan" class="form-control"
                                                style="width: 100%">
                                        </div>
                                        <div class="col-md-2" style="display: none">
                                            <input type="text" id="tahun" name="tahun" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <input type="hidden" name="idPembayaran" id="idPembayaran">
                                    <input type="hidden" name="idPelunasan" id="idPelunasan">
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="idBKM" style="margin-right: 10px;">Id. BKM</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="idBKM" name="idBKM" class="form-control"
                                                style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="hidden" id="id_bkm" name="id_bkm" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="mataUangBKMSelect" style="margin-right: 10px;">Mata
                                                Uang</label>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="mataUangBKMSelect"
                                                    name="mataUangBKMSelect" readonly>
                                                <div class="input-group-append">
                                                    <button type="button" id="btn_mtUang" class="btn btn-default"
                                                        disabled>...</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="kursRupiah" style="margin-right: 10px;">Kurs
                                                Rupiah</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="kursRupiah" name="kursRupiah"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <input type="hidden" name="idMataUangBKM" id="idMataUangBKM"
                                        class="form-control" style="width: 100%">
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="jumlahUangBKM" style="margin-right: 10px;">Jumlah
                                                Uang</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="jumlahUangBKM" name="jumlahUangBKM"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="namaBankBKMSelect" style="margin-right: 10px;">Bank</label>
                                        </div>
                                        <div class="col-md-5">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="namaBankBKMSelect"
                                                    name="namaBankBKMSelect" readonly>
                                                <div class="input-group-append">
                                                    <button type="button" id="btn_bankBKM" class="btn btn-default"
                                                        disabled>...</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!--HIDDEN INPUT-->
                                        <div class="col-md-4">
                                            <input type="hidden" id="idBankBKM" name="idBankBKM"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3">
                                            <input type="hidden" id="jenisBankBKM" name="jenisBankBKM"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                Perkiraan</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control" id="idKodePerkiraanBKM"
                                                name="idKodePerkiraanBKM" class="form-control" readonly>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="input-group">
                                                <input type="text" class="form-control"
                                                    id="kodePerkiraanBKMSelect" name="kodePerkiraanBKMSelect"
                                                    class="form-control" readonly>
                                                <div class="input-group-append">
                                                    <button type="button" id="btn_kodeBKM" class="btn btn-default"
                                                        disabled>...</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {{-- <div class="col-md-3">
                                            <input type="text" id="uraianBKM" name="uraianBKM"
                                                class="form-control" style="width: 100%; display:none" readonly>
                                        </div> --}}
                                </div>

                                <!--CARD 2-->
                                <div class="card">
                                    <b>BKK</b>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="idBKK" style="margin-right: 10px;">Id. BKK</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="idBKK" name="idBKK" class="form-control"
                                                style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="hidden" id="id_bkk" name="id_bkk" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="jumlahUangBKK" style="margin-right: 10px;">Jumlah
                                                Uang</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="jumlahUangBKK" name="jumlahUangBKK"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="namaBankBKKSelect" style="margin-right: 10px;">Bank</label>
                                        </div>
                                        <div class="col-md-5">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="namaBankBKKSelect"
                                                    name="namaBankBKKSelect" readonly>
                                                <div class="input-group-append">
                                                    <button type="button" id="btn_bankBKK" class="btn btn-default"
                                                        disabled>...</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <input type="hidden" id="idBankBKK" name="idBankBKK"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3">
                                            <input type="hidden" id="jenisBankBKK" name="jenisBankBKK"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>

                                        {{-- <input type="text" id="idBankBKK" name="idBankBKK"
                                                class="form-control" style="width: 100%" readonly>
                                            <input type="text" id="jenisBankBKK" name="jenisBankBKK"
                                                class="form-control" style="width: 100%"> --}}
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                Perkiraan</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control" id="idKodePerkiraanBKK"
                                                name="idKodePerkiraanBKK" class="form-control" readonly>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="input-group">
                                                <input type="text" class="form-control"
                                                    id="kodePerkiraanBKKSelect" name="kodePerkiraanBKKSelect"
                                                    class="form-control" readonly>
                                                <div class="input-group-append">
                                                    <button type="button" id="btn_kodeBKK" class="btn btn-default"
                                                        disabled>...</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {{-- <div class="col-md-7">
                                            <input type="text" id="uraianBKK" name="uraianBKK"
                                                class="form-control" style="width: 100%; display: none;" readonly>
                                        </div> --}}
                                </div>
                            </div>

                            <!--CARD 3 KANAN-->
                            <div style="width: 40%;">
                                <div class="card-body">
                                    <div style="display: flex; justify-content: center;">
                                        <button type="submit" id="btnPilihNotaKredit" name="btnPilihNotaKredit"
                                                class="btn btn-primary d-flex ml-auto">Pilih Nota Kredit</button>
                                    </div>
                                    <div class="row"
                                        style="display: flex; justify-content: center; margin-top: 150px">
                                        <div style="margin-right: 10px;">
                                            <button type="submit" id="btnProses" name="btnProses"
                                                class="btn btn-primary">PROSES</button>
                                        </div>
                                        <div style="margin-right: 10px;">
                                            <button type="submit" id="btnKoreksi" name="btnKoreksi"
                                                class="btn btn-primary" style="display: none;">Koreksi</button>
                                        </div>
                                        <div>
                                            <button type="submit" id="btnBatal" name="btnBatal"
                                                class="btn btn-primary">Batal</button>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row" style="display: flex; justify-content: center;">
                                        <div style="margin-right: 10px;">
                                            <button type="submit" id="btnTampilBKM" name="btnTampilBKM"
                                                class="btn btn-primary">Tampil BKM</button>
                                            {{-- <input type="submit" id="btnTampilBKM" name="btnTampilBKM"
                                                value="Tampil BKM" class="btn btn-primary"> --}}
                                        </div>
                                        <div style="margin-right: 10px;">
                                            {{-- <input type="submit" id="btnTampilBKK" name="btnTampilBKK"
                                                value="Tampil BKK" class="btn btn-primary"> --}}
                                            <button type="submit" id="btnTampilBKK" name="btnTampilBKK"
                                                class="btn btn-primary">Tampil BKK</button>
                                        </div>
                                        {{-- <div>
                                                <input type="submit" name="tutup" value="TUTUP"
                                                    class="btn btn-primary">
                                            </div> --}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <input type="hidden" id="nilaiUang" name="nilaiUang" class="form-control"
                                style="width: 100%">
                            <input type="hidden" id="konversi" name="konversi" class="form-control"
                                style="width: 100%">
                            <input type="hidden" id="konversi1" name="konversi1" class="form-control"
                                style="width: 100%">
                            <input type="hidden" id="nilai" name="nilai" class="form-control"
                                style="width: 100%">
                            <input type="hidden" id="nilai1" name="nilai1" class="form-control"
                                style="width: 100%">
                        </div>

                        {{-- modal tampil bkk --}}
                        <div class="modal fade" id="dataBKKModal" tabindex="-1" aria-labelledby="dataBKKModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog" style="max-width: 60%">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="dataBKKModalLabel">Cetak BKK Nota Kredit</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close" id="close_modalbkm">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-inline">
                                            <label for="month">Tanggal Input&nbsp;</label>
                                            <input type="date" id="tgl_awalbkk" class="form-control"
                                                style="width: 160px">
                                            <span>&nbsp;S/D&nbsp;</span>
                                            <input type="date" id="tgl_akhirbkk" class="form-control"
                                                style="width: 160px">
                                            <span>&nbsp;&nbsp;</span>
                                            <button id="btn_okbkk" type="button" class="btn btn-primary">OK</button>
                                        </div>
                                        <div class="form-group mt-3">
                                            <label for="bkk">Id. BKK:</label>
                                            <input type="text" id="bkk" class="form-control">
                                            <input type="text" id="terbilang" class="form-control"
                                                style="display: none">
                                            <input type="text" id="id_matauang" class="form-control"
                                                style="display: none">
                                        </div>
                                        <div class="table-responsive">
                                            <table id="tabletampilBKK">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Tanggal Input</th>
                                                        <th>Id. BKK</th>
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
                                        <button id="btn_cetakbkk" type="button"
                                            class="btn btn-success">Cetak</button>
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                            id="tutup_modalbkk">Tutup</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- modal tampil bkm --}}
                        <div class="modal fade" id="dataBKMModal" tabindex="-1" aria-labelledby="dataBKMModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog" style="max-width: 60%">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="dataBKMModalLabel">Cetak BKM Nota Kredit</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close" id="close_modalbkm">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-inline">
                                            <label for="month">Tanggal Input&nbsp;</label>
                                            <input type="date" id="tgl_awalBKM" class="form-control"
                                                style="width: 160px">
                                            <span>&nbsp;S/D&nbsp;</span>
                                            <input type="date" id="tgl_akhirBKM" class="form-control"
                                                style="width: 160px">
                                            <span>&nbsp;&nbsp;</span>
                                            <button id="btn_okBKM" type="button" class="btn btn-primary">OK</button>
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
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                            id="tutup_modalBKM">Tutup</button>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {{-- <!--MODAL TAMPIL BKM-->
                        <div class="modal fade" id="modalTampilBKM" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content" style="padding: 25px;">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Cetak BKM Nota Kredit</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form action="{{ url('BKMBKKNotaKredit') }}" id="formTampilBKM" method="POST">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodTampilBKM">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="tanggalInputTampilBKM" style="margin-right: 10px;">Tanggal
                                                    Input</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalTampilBKM" name="tanggalTampilBKM"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-1">
                                                S/D
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalTampilBKM2" name="tanggalTampilBKM2"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnOkTampilBKM" name="btnOkTampilBKM">OK</button>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idBKMTampil" style="margin-right: 10px;">Id. BKM</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="idBKMTampil" name="idBKMTampil"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnCetakBKM" name="btnCetakBKM">CETAK</button>
                                            </div>
                                        </div>
                                        <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                            <table style="width: 120%; table-layout: fixed;"id="tabelTampilBKM">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                </colgroup>
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Tgl. Input</th>
                                                        <th>Id. BKM</th>
                                                        <th>Nilai Pelunasan</th>
                                                        <th>Terjemahan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                        <input type="hidden" name="cetak" id="cetak" value="cetakBKM">
                                    </form>
                                </div>
                            </div>
                        </div>

                        <!--MODAL TAMPIL BKK-->
                        <div class="modal fade" id="modalTampilBKK" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content" style="padding: 25px;">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Cetak BKK Nota Kredit</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form action="{{ url('BKMBKKNotaKredit') }}" id="formTampilBKK" method="POST">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodTampilBKK">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="tanggalInputTampilBKM" style="margin-right: 10px;">Tanggal
                                                    Input</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalTampilBKK" name="tanggalTampilBKK"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-1">
                                                S/D
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalTampilBKK2" name="tanggalTampilBKK2"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnOkTampilBKK" name="btnOkTampilBKK">OK</button>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idBKKTampil" style="margin-right: 10px;">Id. BKK</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="idBKKTampil" name="idBKKTampil"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnCetakBKK" name="btnCetakBKK">CETAK</button>
                                            </div>
                                        </div>
                                        <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                            <table style="width: 120%; table-layout: fixed;"id="tabelTampilBKK">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                </colgroup>
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Tgl. Input</th>
                                                        <th>Id. BKM</th>
                                                        <th>Nilai Pelunasan</th>
                                                        <th>Terjemahan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                        <input type="hidden" name="cetak" id="cetak" value="cetakBKK">
                                    </form>
                                </div>
                            </div>
                        </div> --}}

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- CETAK BKK --}}
<div class="printBKK" style="display: none;">
    <div class="container">
        <div class="row">
            <div class="col-5" style="padding-right: 25px;">
                <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                    <h4 style="font-weight: bold">P.T. KERTA RAJASA RAYA</h4>
                </div>
            </div>
            <div class="col-7">
                <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                    <h4 style="font-weight: bold">BUKTI PENGELUARAN KAS</h4>
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
                    <div class="col-12">
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
                        <span style="display: inline; font-size: 17px; padding-left: 50px">Jumlah Diterima:
                        </span><span id="symbol"
                            style="display: inline; margin-top: -5px; font-size: 17px; padding-left: 15px"></span><span
                            id="nilaiPembulatan" name="nilaiPembulatan"
                            style="display: inline; margin-top: -5px; font-size: 17px; padding-left: 15px"></span>
                    </div>
                    <div class="col-12">
                        <span style="display: inline; font-size: 17px; padding-left: 50px">Terbilang: </span>
                    </div>
                    <div class="col-12">
                        <span id="terbilangCetak"
                            style="display: inline; margin-top: -5px; font-size: 12px; padding-left: 50px"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 17px; ">BENTUK PEMBAYARAN</span>
                    </div>
                </div>
            </div>
            <div class="col-8" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 17px;">URAIAN PEMBAYARAN</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: center; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 16px;" id="jenisPembayaran"></span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: center; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 16px;">JATUH TEMPO</span>
                    </div>
                </div>
            </div>
            <div class="col-4" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-6" style="height: 2.5vh; text-align-last: left;">
                        <span style="font-size: 16px;">NOTA KREDIT</span>
                    </div>
                    <div class="col-6" style="height: 2.5vh; text-align-last: left;">
                        <span style="font-size: 16px;">PENAGIHAN</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -2.3vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 16px;">KODE PERKIRAAN</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 16px;">JUMLAH</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div id="jenispemb"></div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div id="jatuhtempo"></div>
                </div>
            </div>
            <div class="col-4" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div id="rincianBayar" style="justify-content: left;margin-right: -2.4vh; padding-left: 1%; margin-right: 10%">
                    </div>
                    <div id="penagihan" style="justify-content: right;margin-right: -2.4vh; padding-left: 1%">
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: center; border-bottom: 0px; border-right: 0px; margin-right: -2.0vh;">
                    <div id="kodeperkiraan"></div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px; text-align: right">
                <div
                    class="row"style="border: solid 1px; justify-content: right; border-bottom: 0px; margin-right: -2vh; padding-right: 12%">
                    <div id="nilairincian"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-10" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: right;">
                        <span style="font-size: 16px; font-weight: bold; padding-left: 45px">GRAND TOTAL: </span><span
                            id="symbol2"
                            style="display: inline; margin-top: -5px; font-size: 16px; padding-right: 20px"></span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: right;">
                        <span id="grandTotal" style="font-size: 16px;"></span>
                    </div>
                </div>
            </div>
        </div>

        <br><br>
        <div class="row">
            <div class="col-2" style="margin-right: 20px;">
                <div class="row"
                    style="border: solid 1px; border-left: 0px; border-top: 0px; border-bottom: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 10vh; ">
                        <span id="disetujui" style="font-size: 16px;">Penerima,</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="margin-left: 40px">
                <div class="row"
                    style="border: solid 1px; border-left: 0px; border-top: 0px; border-bottom: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 10vh; ">
                        <span id="kasir" style="font-size: 16px;">Kasir,</span>
                    </div>
                </div>
            </div>
            <div class="col-7" style="margin-right: 20px;">
                <div class="row" style="text-align-last: left;">
                    <div class="col-sm-7 offset-sm-1" style="height: 3vh; ">
                        <span style="font-size: 15px;">Acuan BKM no.&nbsp;</span><span id="idBKMAcuan"
                            style="font-size: 15px;"></span>
                    </div>
                    <div class="col-sm-4">
                        <span style="font-size: 15px;"> Tanggal: </span>
                        <span id="tanggalBKM" style="font-size: 15px;"></span>
                    </div>
                </div>
                <div class="row" style="text-align-last: left;">
                    <div class="col-sm-1"></div>
                    <div class="col-sm-7">
                        <span style="font-size: 15px;">Customer :</span>
                        <span id="customer" style="font-size: 15px;"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-2" style="margin-right: 20px;">
                <div class="row"
                    style="text-align-last: center; border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px;">
                    <div class="col-12" style="height: 4vh; ">
                        <span id="disetujui" style="font-size: 16px;"></span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="margin-left: 40px">
                <div class="row"
                    style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 4vh; ">
                        <span id="kasir" style="font-size: 16px;"></span>
                    </div>
                </div>
            </div>
            <div class="col-4" style="margin-right: 20px;">
                <div class="row" style="text-align-last: right;">
                    <div class="col-12" style="height: 4vh; ">
                        <span style="font-size: 16px;">Sidoarjo, </span><span id="tglCetakForm"
                            style="font-size: 17px;"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- CETAK BKM --}}
<div class="printBKM" style="display: none;">
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
                    <div class="col-12">
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
                        <span style="display: inline; font-size: 17px; padding-left: 50px">Jumlah Diterima:
                        </span><span id="symbol"
                            style="display: inline; margin-top: -5px; font-size: 17px; padding-left: 15px"></span><span
                            id="nilaiPembulatan" name="nilaiPembulatan"
                            style="display: inline; margin-top: -5px; font-size: 17px; padding-left: 15px"></span>
                    </div>
                    <div class="col-12">
                        <span style="display: inline; font-size: 17px; padding-left: 50px">Terbilang: </span>
                    </div>
                    <div class="col-12">
                        <span id="terbilangCetak"
                            style="display: inline; margin-top: -5px; font-size: 12px; padding-left: 50px"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-8" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: center; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-6" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 16px;">RINCIAN PENERIMAAN</span>
                    </div>

                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -2.3vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 16px;">KODE PERKIRAAN</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 16px;">JUMLAH</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-8" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div id="rincianBayar" style="justify-content: left;margin-right: -2.4vh; padding-left: 1%; margin-right: 10%">
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: center; border-bottom: 0px; border-right: 0px; margin-right: -2.0vh;">
                    <div id="kodeperkiraan"></div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px; text-align: right">
                <div
                    class="row"style="border: solid 1px; justify-content: right; border-bottom: 0px; margin-right: -2vh; padding-right: 12%">
                    <div id="nilairincian"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-10" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: right;">
                        <span style="font-size: 16px; font-weight: bold; padding-left: 45px">GRAND TOTAL: </span><span
                            id="symbol2"
                            style="display: inline; margin-top: -5px; font-size: 16px; padding-right: 20px"></span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: right;">
                        <span id="grandTotal" style="font-size: 16px;"></span>
                    </div>
                </div>
            </div>
        </div>

        <br><br>
        <div class="row">
            <div class="col-2" style="margin-right: 20px;">
                <div class="row"
                    style="border: solid 1px; border-left: 0px; border-top: 0px; border-bottom: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 10vh; ">
                        <span id="disetujui" style="font-size: 16px;">Disetujui,</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="margin-left: 40px">
                <div class="row"
                    style="border: solid 1px; border-left: 0px; border-top: 0px; border-bottom: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 10vh; ">
                        <span id="kasir" style="font-size: 16px;">Kasir,</span>
                    </div>
                </div>
            </div>
            <div class="col-7" style="margin-right: 20px;">
                <div class="row" style="text-align-last: left;">
                    <div class="col-sm-7 offset-sm-1" style="height: 3vh; ">
                        <span style="font-size: 15px;">Acuan BKM no. :&nbsp;</span><span id="idBKMAcuan"
                            style="font-size: 15px;"></span>
                    </div>
                    <div class="col-sm-4">
                        <span style="font-size: 15px;"> Tanggal: </span>
                        <span id="tanggalBKM" style="font-size: 15px;"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-2" style="margin-right: 20px;">
                <div class="row"
                    style="text-align-last: center; border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px;">
                    <div class="col-12" style="height: 4vh; ">
                        <span id="disetujui" style="font-size: 16px;"></span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="margin-left: 40px">
                <div class="row"
                    style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 4vh; ">
                        <span id="kasir" style="font-size: 16px;"></span>
                    </div>
                </div>
            </div>
            <div class="col-4" style="margin-right: 20px;">
                <div class="row" style="text-align-last: right;">
                    <div class="col-12" style="height: 4vh; ">
                        <span style="font-size: 16px;">Sidoarjo, </span><span id="tglCetakForm"
                            style="font-size: 17px;"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/Kencana/BKMBKKNotaKredit.js') }}"></script>

@endsection
