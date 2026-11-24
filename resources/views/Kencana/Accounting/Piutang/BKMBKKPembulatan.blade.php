@extends('layouts.appKencana')
@section('content')
@section('title', 'BKM BKK Pembulatan')

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
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">BKM-BKK Pembulatan</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <input type="hidden" name="_method" id="methodkoreksi">
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
                        </div>

                        <!--CARD 1-->
                        <br>
                        <div class="card-container" style="display: flex;">
                            <div class="card" style="width: 40%;">
                                <div class="card-body">
                                    <div class="col-md-12">
                                        <strong>Data BKM</strong>
                                    </div>
                                    <div style="overflow-x: auto; overflow-y: auto;">
                                        <table style="width: 100%;" id="table_DataBKM">
                                            {{-- <colgroup>
                                                    <col style="width: 60%;">
                                                    <col style="width: 60%;">
                                                    <col style="width: 60%;">
                                                    </colgroup> --}}
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>No. BKM</th>
                                                    <th>Tgl. BKM</th>
                                                    <th>Nilai Pelunasan</th>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-10">
                                        <input type="hidden" id="idBKM" name="idBKM" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-10">
                                        <input type="hidden" id="id_bkk" name="id_bkk" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-10">
                                        <input type="hidden" name="idPembayaran" id="idPembayaran">
                                    </div>
                                    <div class="col-md-10">
                                        <input type="hidden" name="idMataUang" id="idMataUang">
                                    </div>
                                </div>
                            </div>

                            <!--CARD 2-->
                            <div class="card" style="width: 60%; overflow-y: auto;">
                                <div class="card-body">
                                    <div class="col-md-6">
                                        <strong>Rincian Data</strong>
                                    </div>
                                    <div style="overflow-x: auto;">
                                        <table style="width: 100%; table-layout: fixed;" id="table_RincianData">
                                            <colgroup>
                                                <col style="width: 40%;">
                                                <col style="width: 35%;">
                                                <col style="width: 35%;">
                                                <col style="width: 30%;">
                                                <col style="width: 40%;">
                                                {{-- <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;"> --}}
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Customer</th>
                                                    <th>No. Bukti</th>
                                                    <th>Invoice</th>
                                                    <th>Mata Uang</th>
                                                    <th>Nilai Rincian</th>
                                                    <th>Id. Bank</th>
                                                    <th>Id. Jenis</th>
                                                    <th>Id. Uang</th>
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
                        <div class="card-container" style="display: flex;">
                            <div class="card" style="width: 60%;">
                                <div class="card-body">
                                    <b>BKK</b>
                                    <p>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="tanggal">Tanggal</label>
                                        </div>
                                        <div class="col-md-5">
                                            <input type="date" id="tanggal" name="tanggal" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="idBKK">Id. BKK</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="idBKK" name="idBKK" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="jumlahUang">Jumlah Uang</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="jumlahUang" name="jumlahUang"
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="kodePerkiraan">Kode Perkiraan</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idKodePerkiraan" name="idKodePerkiraan"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-5">
                                            <input type="text" id="ketKodePerkiraan" name="ketKodePerkiraan"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-default"
                                                id="btn_perkiraan">...</button>
                                        </div>
                                    </div>
                                    <p>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="uraian">Uraian</label>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" id="uraian" name="uraian" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <input type="hidden" id="konversi" name="konversi" class="form-control"
                                            style="width: 100%">
                                    </div>
                                </div>
                            </div>

                            <!--CARD 2-->
                            <div style="width: 40%;">
                                <div class="card-body">
                                    <div style="display: flex; justify-content: center;">
                                        <input type="submit" id="btnPilihBKM" name="btnPilihBKM" value="Pilih BKM"
                                            class="btn btn-primary">
                                    </div>
                                    <br>
                                    <div class="row" style="display: flex; justify-content: center;">
                                        <div>
                                            <button type="submit" id="btnProses" name="btnProses"
                                                class="btn btn-success">PROSES</button>
                                        </div>
                                        <div style="display: flex; justify-content: center;">
                                            <input type="submit" id="btnBatal" name="btnBatal" value="Batal"
                                                class="btn btn-danger">
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row" style="display: flex; justify-content: center;">
                                        <div>
                                            <button type="submit" id="btn_tampilbkk" name="btn_tampilbkk"
                                                class="btn btn-primary">Tampil BKK</button>
                                        </div>
                                        <div>
                                            <input type="submit" name="tutup" value="TUTUP"
                                                class="btn btn-secondary">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Modal Tampil BKK-->
                        <div class="modal fade" id="dataBKKModal" tabindex="-1" aria-labelledby="dataBKKModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog" style="max-width: 60%">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="dataBKKModalLabel">Cetak BKK Pembulatan</h5>
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
                                            <button id="btn_okbkm" type="button" class="btn btn-primary">OK</button>
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
                                            <table id="tabletampilBKM">
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

{{-- style="visibility: hidden; --}}
<div class="print" style="visibility: hidden;">
    <div class="container">
        <div class="row">
            <div class="col-5" style="padding-right: 25px;">
                <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                    <h4 style="font-weight: bold">P.T. KENCANA RAJASA RAYA</h4>
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
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 16px;">RINCIAN</span>
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
                <div class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div id="jenispemb"></div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div id="jatuhtempo"></div>
                </div>
            </div>
            <div class="col-4" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div id="rincianBayar" style="justify-content: left;margin-right: -2.4vh; padding-left: 1%">
                    </div>

                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: center; border-bottom: 0px; border-right: 0px; margin-right: -2.0vh;">
                    <div id="kodeperkiraan"></div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px; text-align: right" >
                <div class="row"style="border: solid 1px; justify-content: right; border-bottom: 0px; margin-right: -2vh; padding-right: 12%">
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
                    <div class="col-12" style="height: 3vh; ">
                        <span style="font-size: 15px;">Untuk pembulatan BKM Nomer: </span><span id="idBKMAcuan"
                            style="font-size: 15px;"></span><span style="font-size: 15px;">, Tanggal: </span><span
                            id="tanggalBKM" style="font-size: 15px;"></span>
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
<script src="{{ asset('js/Kencana/BKMBKKPembulatan.js') }}"></script>
@endsection
