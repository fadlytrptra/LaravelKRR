@extends('layouts.appKencana')
@section('content')
@section('title', 'BKM Transitoris Bank')

<style>
    @page {
        size: auto;
        margin: 10mm;
    }
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
        /* padding-top: 0;
        padding-bottom: 0; */
        /* font-size: 16px; */
    }

    .preview,
    .preview2 {
        display: none;
        /* Initially hide both previews */
    }

    @media print {

        /* Hide everything by default */
        body * {
            visibility: hidden;
        }

        /* Show only elements with the class 'preview' */
        .preview,
        .preview * {
            visibility: visible;
        }

        /* Show only elements with the class 'preview2' */
        .preview2,
        .preview2 * {
            visibility: visible;
        }

        /* Ensure that the elements are positioned correctly */
        .preview,
        .preview2 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            transform-origin: top left;
        }
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance BKM Transistoris Bank</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        {{-- <form method="POST" action=""> --}}
                        {{-- @csrf --}}
                        <!-- Form fields go here -->
                        <div class="card-container" style="display: flex;">
                            <div style="width: 60%;">
                                <div class="card" style>
                                    <b>BKK</b>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="tanggalInput" style="margin-right: 10px;">Tanggal</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="date" id="tanggalInput" name="tanggalInput"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3">
                                            Wajib di-ENTER
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="idBKK" style="margin-right: 10px;">Id. BKK</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="idBKK" name="idBKK" class="form-control"
                                                style="width: 100%" readonly>
                                        </div>
                                    </div>

                                    <input type="text" id="listBiaya" class="form-control" style="display: none">
                                    <input type="text" id="idUang1" class="form-control" style="display: none">
                                    <input type="text" id="symbol1" class="form-control" style="display: none">

                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="mataUangSelect" style="margin-right: 10px;">Mata
                                                Uang</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="mataUang1" class="form-control" readonly>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnMataUang1" name="btnMataUang1"
                                                class="btn btn-primary">...</button>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="jumlahUang" style="margin-right: 10px;">Jumlah Uang</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="jenisBank1" class="form-control"
                                                style="display: none">
                                            <input type="text" id="uang1" name="uang1" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="namaBankSelect" style="margin-right: 10px;">Bank</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="idBank1" class="form-control"
                                                style="display: none">
                                            <input type="text" id="bank1" class="form-control" readonly>
                                        </div>
                                        <div class="col-md-2">
                                            <button id="btnBank1" name="btnBank1" class="btn btn-primary">...</button>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnBiaya" name="btnBiaya" class="btn btn-primary"
                                                disabled>Tambah Biaya</button>
                                        </div>
                                    </div>

                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="namaBankSelect" style="margin-right: 10px;">Jenis
                                                Pembayaran</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idJenisBayar1" class="form-control"
                                                style="display: none">
                                            <input type="text" id="jenisBayar1" class="form-control" readonly>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnJenisBayar1" name="btnJenisBayar1"
                                                class="btn btn-primary">...</button>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnBG" name="btnBG" class="btn btn-primary"
                                                disabled>Detail BG/CEK/Transfer/DBT</button>
                                        </div>
                                    </div>

                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                Perkiraan</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idPerkiraan1" name="idPerkiraan1"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-5">
                                            <input type="text" id="perkiraan1" name="perkiraan1"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnPerkiraan1" name="btnPerkiraan1"
                                                class="btn btn-primary">...</button>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="uraian" style="margin-right: 10px;">Uraian</label>
                                        </div>
                                        <div class="col-md-7">
                                            <input type="text" id="uraian1" name="uraian1" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                </div>

                                <!--CARD 2-->
                                {{-- <div class="card disabled" id="cardBKM"> --}}
                                <div class="card">
                                    <b>BKM</b>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="tanggal" style="margin-right: 10px;">Tanggal</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="date" id="tgl" name="tgl" readonly
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3">
                                            Wajib di-ENTER
                                        </div>
                                    </div>

                                    <input type="text" id="listBiaya1" class="form-control"
                                        style="display: none">
                                    <input type="text" id="idUang" class="form-control" style="display: none">
                                    <input type="text" id="symbol" class="form-control" style="display: none">

                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="idBKK" style="margin-right: 10px;">Id. BKM</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="idBKM" name="idBKM" readonly
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="mataUangSelect" style="margin-right: 10px;">Mata
                                                Uang</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="mataUang" class="form-control" readonly>
                                        </div>
                                        <div class="col-md-1">
                                            <button id="btnMataUang" name="btnMataUang" class="btn btn-primary"
                                                disabled>...</button>
                                        </div>
                                        <div class="col-md-1">
                                            <label for="mataUangSelect" style="margin-right: 10px;">Kurs</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="kurs" class="form-control" readonly>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="jumlahUang" style="margin-right: 10px;">Jumlah
                                                Uang</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="uang" name="uang" class="form-control"
                                                style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="namaBankSelect" style="margin-right: 10px;">Bank</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="idBank" class="form-control"
                                                style="display: none">
                                            <input type="text" id="jenisBank" class="form-control"
                                                style="display: none">
                                            <input type="text" id="bank" class="form-control" readonly>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnBank" name="btnBank" class="btn btn-primary"
                                                disabled>...</button>
                                        </div>

                                    </div>

                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="namaBankSelect" style="margin-right: 10px;">Jenis
                                                Pembayaran</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idJenisBayar" class="form-control"
                                                style="display: none">
                                            <input type="text" id="jenisBayar" class="form-control" readonly>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnJenisBayar" name="btnJenisBayar" class="btn btn-primary"
                                                disabled>...</button>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnBiaya1" name="btnBiaya1" class="btn btn-primary"
                                                disabled>Tambah Biaya</button>
                                        </div>
                                    </div>

                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                Perkiraan</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idPerkiraan" name="idPerkiraan"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-5">
                                            <input type="text" id="perkiraan" name="perkiraan"
                                                class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnPerkiraan" name="btnPerkiraan" class="btn btn-primary"
                                                disabled>...</button>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="uraian" style="margin-right: 10px;">Uraian</label>
                                        </div>
                                        <div class="col-md-7">
                                            <input type="text" id="uraian" name="uraian" readonly
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <input type="text" id="bln" name="bln" readonly class="form-control" hidden
                                style="width: 100%">
                            <input type="text" id="thn" name="thn" readonly class="form-control" hidden
                                style="width: 100%">

                            <!--CARD 2-->
                            <div style="width: 40%;">
                                <div class="col-md-12">
                                    <h6><strong>Detail Biaya BKK</strong></h6>
                                </div>
                                <div class="row mb-2" style="margin-top: 0.5%">
                                    <div class="col-sm-12">
                                        <div class="table-responsive fixed-height">
                                            <table class="table table-bordered no-wrap-header"
                                                id="tableDetailBiayaBKK">
                                                <thead>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 mb-4">
                                    <button type="button" id="btnKoreksi" class="btn btn-primary">Koreksi
                                        Biaya</button>
                                    <button type="button" id="btnHapus" class="btn btn-danger">Hapus Biaya</button>
                                </div>

                                <div class="col-md-12">
                                    <h6><strong>Detail BG/CEK/TRANSFER BKK</strong></h6>
                                </div>
                                <div class="row mb-2" style="margin-top: 0.5%">
                                    <div class="col-sm-12">
                                        <div class="table-responsive fixed-height">
                                            <table class="table table-bordered no-wrap-header" id="tableBg">
                                                <thead>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 mb-4">
                                    <button type="button" id="btnKoreksiBg" class="btn btn-primary">Koreksi No
                                        BG</button>
                                    <button type="button" id="btnHapusBg" class="btn btn-danger">Hapus BG</button>
                                </div>

                                <div class="col-md-12">
                                    <h6><strong>Detail Biaya BKM</strong></h6>
                                </div>
                                <div class="row" style="margin-top: 0.5%">
                                    <div class="col-sm-12">
                                        <div class="table-responsive fixed-height">
                                            <table class="table table-bordered no-wrap-header"
                                                id="tableDetailBiayaBKM">
                                                <thead>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <button type="button" id="btnKoreksi2" class="btn btn-primary">Koreksi
                                        Biaya</button>
                                    <button type="button" id="btnHapus2" class="btn btn-danger">Hapus Biaya</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row">
                                <div class="col-md-1">
                                    <input type="submit" name="proses" id="btnProses" value="Proses"
                                        class="btn btn-primary">
                                </div>
                                <div class="col-md-1">
                                    <input type="submit" id="btnKoreksiForm" name="btnKoreksi" value="KOREKSI"
                                        class="btn btn-primary">
                                </div>
                                <div class="col-md-1">
                                    <input type="submit" id="btnBatal" name="btnBatal" value="Batal"
                                        class="btn btn-primary d-flex ml-auto">
                                </div>
                                <div class="col-md-1">
                                    <input type="submit" id="btnTampilBKM" name="btnTampilBKM" value="TampilBKM"
                                        class="btn btn-primary d-flex ml-auto">
                                </div>
                                <div class="col-md-1" style="padding-left: 30px">
                                    <input type="submit" id="btnTampilBKK" name="btnTampilBKK" value="TampilBKK"
                                        class="btn btn-primary d-flex ml-auto">
                                </div>
                            </div>
                        </div>

                        {{-- print voucher --}}
                        <div class="preview">
                            <div class="row">
                                <div class="col-sm-12">
                                    <label><b>Receipt Voucher</b></label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <label><b>PT. KENCANA RAJASA RAYA</b></label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-1">
                                    <label>Name</label>
                                </div>
                                <div class="col-sm-6">
                                    <span id="namaCetakBKM">: Nama di sini</span>
                                </div>
                                <div class="col-sm-2">
                                    <label>Voucher</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="voucherCetakBKM">: Voucher di sini</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-1">
                                    <label>Description</label>
                                </div>
                                <div class="col-sm-6">
                                    <span id="descriptionCetakBKM">: Description di sini</span>
                                </div>
                                <div class="col-sm-2">
                                    <label>Posted On</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="postedCetakBKM">: Posted ON di sini</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-1">
                                    <label>Date</label>
                                </div>
                                <div class="col-sm-6">
                                    <span id="dateCetakBKM">: Date di sini</span>
                                </div>
                                <div class="col-sm-2">
                                    <label>Received From</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="receivedCetakBKM">: Received From di sini</span>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-sm-2 text-center underline">
                                    <label>C.O.A</label>
                                </div>
                                <div class="col-sm-4 text-center underline">
                                    <label>Account Name</label>
                                </div>
                                <div class="col-sm-4 text-center underline">
                                    <label>Description</label>
                                </div>
                                <div class="col-sm-2 text-right underline">
                                    <span id="amountBKM">Amount</span>
                                </div>
                            </div>
                            <div id="bkmDetailsContainer" style="margin-top: -0.5%"></div>
                            {{-- <div class="row">
                                <div class="col-sm-2 text-center underline">
                                    <span id="coaListBKM">data coa</span>
                                </div>
                                <div class="col-sm-4 text-center underline">
                                    <span id="accountListBKM">data account</span>
                                </div>
                                <div class="col-sm-4 text-center underline">
                                    <span id="descriptionListBKM">data Description</span>
                                </div>
                                <div class="col-sm-2 text-right underline">
                                    <span id="amountListBKM">data Amount</span>
                                </div>
                            </div> --}}
                            <div class="row">
                                <div class="col-sm-2 text-right offset-sm-8">
                                    <label>TOTAL =</label>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="totalAmountBKM">total amountBKM</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-4 text-center">
                                    <label>Receiver</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>Cashier</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>Responsible Person</label>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div class="col-sm-2 offset-sm-1 text-center underline">
                                </div>
                                <div class="col-sm-2 offset-sm-2 text-center underline">
                                </div>
                                <div class="col-sm-2 offset-sm-2 text-center underline">
                                </div>
                            </div>
                        </div>
                        {{-- end tampil voucher --}}

                        {{-- tampil bkk --}}
                        {{-- print voucher --}}
                        <div class="preview2">
                            <div class="row">
                                <div class="col-sm-12">
                                    <label><b>Payment Voucher</b></label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <label><b>PT. KENCANA RAJASA RAYA</b></label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-1">
                                    <label>Name</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="namaCetakBKK">: Nama di sini</span>
                                </div>
                                <div class="col-sm-1">
                                    <label>Date</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="dateCetakBKK">: Date di sini</span>
                                </div>
                                <div class="col-sm-1">
                                    <label>Voucher</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="voucherCetakBKK">: Voucher di sini</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-1">
                                    <label>Description</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="descriptionCetakBKK">: Description di sini</span>
                                </div>
                                <div class="col-sm-1">
                                    <label>Paid To</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="paidCetakBKK">: Paid To di sini</span>
                                </div>
                                <div class="col-sm-1">
                                    <label>Posted On</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="postedCetakBKK">: Posted On di sini</span>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-sm-2 text-center underline">
                                    <label>C.O.A</label>
                                </div>
                                <div class="col-sm-3 text-center underline">
                                    <label>Account Name</label>
                                </div>
                                <div class="col-sm-3 text-center underline">
                                    <label>Description</label>
                                </div>
                                <div class="col-sm-2 text-center underline">
                                    <label>CEK/BG No.</label>
                                </div>
                                <div class="col-sm-2 text-right underline">
                                    <span id="amountBKK">Amount</span>
                                </div>
                            </div>
                            <div id="bkkDetailsContainer" style="margin-top: -0.5%"></div>
                            <div class="row">
                                <div class="col-sm-2 text-right offset-sm-8">
                                    <label>TOTAL =</label>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="totalAmountBKK">total amount BKK</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-3 text-center">
                                    <label>Receiver</label>
                                </div>
                                <div class="col-sm-3 text-center">
                                    <label>Cashier</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3 text-left offset-sm-6">
                                    <label>Note: </label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 offset-sm-6">
                                    <span id="batalNote">batal</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 offset-sm-6">
                                    <span id="alasanNote">alasan</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-1 text-center underline">
                                </div>
                                <div class="col-sm-1 offset-sm-2 text-center underline">
                                </div>
                            </div>
                        </div>
                        {{-- end tampil bkk --}}
                        {{-- </form> --}}


                        {{-- modal tampil bkm --}}
                        <div class="modal fade bd-example-modal-lg" id="modalListBKM" tabindex="-1" role="dialog"
                            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Cetak BKM Transitoris</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Tanggal Input</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="date" id="tglAwalBKM" class="form-control">
                                            </div>
                                            <div class="col-sm-1">
                                                <label>S/D</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="date" id="tglAkhirBKM" class="form-control">
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="submit" id="btnOkBKM" value="OK"
                                                    class="btn btn-primary d-flex ml-auto">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Id. BKM</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" id="idCetakBKM" readonly class="form-control">
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="submit" id="btnCetakBKM" value="CETAK"
                                                    class="btn btn-primary d-flex ml-auto">
                                            </div>
                                        </div>

                                        <div class="row mb-2" style="margin-top: 0.5%">
                                            <div class="col-sm-12">
                                                <div class="table-responsive fixed-height">
                                                    <table class="table table-bordered no-wrap-header"
                                                        id="tableListBKM">
                                                        <thead>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">TUTUP</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- modal tampil bkk --}}
                        <div class="modal fade bd-example-modal-lg" id="modalListBKK" tabindex="-1" role="dialog"
                            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Cetak BKK Transitoris</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Tanggal Input</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="date" id="tglAwalBKK" class="form-control">
                                            </div>
                                            <div class="col-sm-1">
                                                <label>S/D</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="date" id="tglAkhirBKK" class="form-control">
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="submit" id="btnOkBKK" value="OK"
                                                    class="btn btn-primary d-flex ml-auto">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Id. BKK</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" id="idCetakBKK" readonly class="form-control">
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="submit" id="btnCetakBKK" value="CETAK"
                                                    class="btn btn-primary d-flex ml-auto">
                                            </div>
                                        </div>

                                        <div class="row mb-2" style="margin-top: 0.5%">
                                            <div class="col-sm-12">
                                                <div class="table-responsive fixed-height">
                                                    <table class="table table-bordered no-wrap-header"
                                                        id="tableListBKK">
                                                        <thead>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">TUTUP</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- modal bg --}}
                        <div class="modal fade bd-example-modal-lg" id="modalBg" tabindex="-1" role="dialog"
                            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Maintenance Detail BG/CEK/TRANSFER/DBT LSG</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Bank</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" id="bankBg" name="bankBg" readonly
                                                    class="form-control">
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col-sm-3">
                                                <label for="jenisBg">Jenis Pembayaran</label>
                                            </div>
                                            <div class="col-sm-5">
                                                <input type="text" id="jenisBg" name="jenisBg" readonly
                                                    class="form-control">
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col-sm-3">
                                                <label for="noBg">Nomer</label>
                                            </div>
                                            <div class="col-sm-7">
                                                <input type="text" id="noBg" name="noBg"
                                                    class="form-control">
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col-sm-3">
                                                <label for="jatuhTempo">Jatuh Tempo</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="date" id="jatuhTempo" name="jatuhTempo"
                                                    class="form-control">
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col-sm-3">
                                                <label for="cetak">Status Cetak [T.O.S]</label>
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="text" id="cetak" name="cetak"
                                                    class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" id="btnProsesBg"
                                            class="btn btn-primary">PROSES</button>
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">TUTUP</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- modal biaya --}}
                        <div class="modal fade bd-example-modal-lg" id="modalBiaya" tabindex="-1" role="dialog"
                            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Maintenance Biaya BKK Transitoris</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Jumlah Biaya</label>
                                            </div>
                                            <div class="col-sm-5">
                                                <input type="text" id="nilaiPelunasanBiaya" name="bankBg"
                                                    class="form-control">
                                                <input type="text" id="KeA" name="bankBg" hidden readonly
                                                    class="form-control">
                                                <input type="text" id="formListBiaya" name="bankBg" hidden
                                                    readonly class="form-control">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="input-group" style="width: 100%;"> <!-- Ensure full width here -->
                                                    <select name="select_kodePerkiraan" id="select_kodePerkiraan" class="row" style="width: 100%;"> <!-- Full width for select -->
                                                        <option disabled selected>Pilih Kode Perkiraan</option>
                                                        @foreach ($kodePerkiraan as $d)
                                                            <option value="{{ $d->NoKodePerkiraan }}">{{ $d->Keterangan }} | {{ $d->NoKodePerkiraan }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {{-- <div class="row">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idPerkiraanBiaya" name="idPerkiraanBiaya"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-5">
                                                <input type="text" id="perkiraanBiaya" name="perkiraanBiaya"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-2">
                                                <button id="btnPerkiraanBiaya" name="btnPerkiraanBiaya"
                                                    class="btn btn-primary">...</button>
                                            </div>
                                        </div> --}}
                                        <div class="row pt-1">
                                            <div class="col-sm-3">
                                                <label for="noBg">keterangan</label>
                                            </div>
                                            <div class="col-sm-7">
                                                <input type="text" id="keteranganBiaya" name="keteranganBiaya"
                                                    class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" id="btnProsesBiaya"
                                            class="btn btn-primary">PROSES</button>
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">TUTUP</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {{-- modal biaya 1 --}}
                        <div class="modal fade bd-example-modal-lg" id="modalBiaya1" tabindex="-1" role="dialog"
                            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Maintenance Biaya BKM Transitoris</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Jumlah Biaya</label>
                                            </div>
                                            <div class="col-sm-5">
                                                <input type="text" id="nilaiPelunasanBiaya1" name="bankBg"
                                                    class="form-control">
                                                <input type="text" id="KeA1" name="bankBg" hidden readonly
                                                    class="form-control">
                                                <input type="text" id="formListBiaya1" name="bankBg" hidden
                                                    readonly class="form-control">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="input-group" style="width: 100%;"> <!-- Ensure full width here -->
                                                    <select name="select_kodePerkiraan1" id="select_kodePerkiraan1" class="row" style="width: 100%;"> <!-- Full width for select -->
                                                        <option disabled selected>Pilih Kode Perkiraan</option>
                                                        @foreach ($kodePerkiraan as $d)
                                                            <option value="{{ $d->NoKodePerkiraan }}">{{ $d->Keterangan }} | {{ $d->NoKodePerkiraan }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {{-- <div class="row">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan1" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idPerkiraanBiaya1" name="idPerkiraanBiaya"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-5">
                                                <input type="text" id="perkiraanBiaya1" name="perkiraanBiaya"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-2">
                                                <button id="btnPerkiraanBiaya1" name="btnPerkiraanBiaya"
                                                    class="btn btn-primary">...</button>
                                            </div>
                                        </div> --}}
                                        <div class="row pt-1">
                                            <div class="col-sm-3">
                                                <label for="noBg">keterangan</label>
                                            </div>
                                            <div class="col-sm-7">
                                                <input type="text" id="keteranganBiaya1" name="keteranganBiaya"
                                                    class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" id="btnProsesBiaya1"
                                            class="btn btn-primary">PROSES</button>
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">TUTUP</button>
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
<script src="{{ asset('js/Kencana/MaintenanceBKMTransistorisBank.js') }}"></script>
@endsection
