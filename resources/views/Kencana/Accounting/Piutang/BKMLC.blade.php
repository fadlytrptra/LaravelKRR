@extends('layouts.appKencana')
@section('content')
@section('title', 'BKM LC')

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

    .preview {
        display: none;
    }

    .preview2 {
        display: none;
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
            transform-origin: top left;
        }
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance BKM-BKK LC</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">

                        <div class="row">
                            <div class="col-md-2">
                                <label for="bulanTahun" style="margin-right: 10px;">Bulan/Tahun</label>
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="bln" name="bln" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="thn" name="thn" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="submit" id="btnOK" name="btnOK" value="OK" class="btn">
                            </div>
                            <div class="col-md-2">
                                <input type="submit" id="btnPilih" name="pilihBank" value="Pilih Bank" class="btn">
                            </div>
                            <div class="col-md-2">
                                <input type="submit" id="btnGroup" name="groupBKM" value="Group BKM" class="btn">
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

                        <div class="row mt-3">
                            <div class="col-sm-4">
                                <input type="radio" id="detailPelunasan" name="detailOption" value="pelunasan">
                                <label for="detailPelunasan">Detail Pelunasan</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="radio" id="detailBiaya" name="detailOption" value="biaya">
                                <label for="detailBiaya">Detail Biaya</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="radio" id="detailKurangLebih" name="detailOption" value="kurangLebih">
                                <label for="detailKurangLebih">Detail Kurang/Lebih</label>
                            </div>
                        </div>

                        <div class="row mb-2" style="margin-top: 0.5%">
                            <div class="col-sm-4">
                                <div class="table-responsive fixed-height">
                                    <table class="table table-bordered no-wrap-header" id="tablePelunasan">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="table-responsive fixed-height">
                                    <table class="table table-bordered no-wrap-header" id="tableBiaya">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="table-responsive fixed-height">
                                    <table class="table table-bordered no-wrap-header" id="tableKurangLebih">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <div class="row">
                                <div class="col-5">
                                    <input type="submit" id="btnTampilBKM" value="Tampil BKM"
                                        class="btn btn-primary d-flex ml-auto">
                                </div>
                                <div class="col-3">
                                    <input type="submit" id="btnTampilBKK" value="Tampil BKK"
                                        class="btn btn-primary d-flex ml-auto">
                                </div>
                            </div>
                        </div>

                        <div class="modal fade bd-example-modal-lg" id="modalPilihBank" tabindex="-1" role="dialog"
                            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Maintenance Pilih Bank BKM</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Id. Pelunasan</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" id="idPelunasanPilih" class="form-control"
                                                    readonly>
                                            </div>
                                        </div>

                                        <div class="row mt-5">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Tanggal Input</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="date" id="tglInputPilih" class="form-control">
                                                <input type="text" id="blnPilih" class="form-control" hidden>
                                                <input type="text" id="thnPilih" class="form-control" hidden>
                                            </div>
                                        </div>

                                        <div class="row mt-1">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Jenis Bayar</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" id="jenisBayarPilih" class="form-control"
                                                    readonly>
                                            </div>
                                        </div>

                                        <div class="row mt-1">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Bank</label>
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="text" id="bankPilih" class="form-control" readonly>
                                            </div>
                                            <div class="col-sm-6">
                                                <input type="text" id="namaBankPilih" class="form-control"
                                                    readonly>
                                            </div>
                                            <div class="col-sm-1">
                                                <button id="btnBankPilih"
                                                    class="form-control btn btn-primary">...</button>
                                            </div>
                                        </div>

                                        <div class="row mt-1">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Mata Uang</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" id="mataUangPilih" class="form-control"
                                                    readonly>
                                            </div>
                                        </div>

                                        <div class="row mt-1">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Nilai Pelunasan</label>
                                            </div>
                                            <div class="col-sm-6">
                                                <input type="text" id="pelunasanPilih" class="form-control"
                                                    readonly>
                                            </div>
                                        </div>

                                        <div class="row mt-1">
                                            <div class="col-sm-3">
                                                <label for="bankBg">No. Bukti</label>
                                            </div>
                                            <div class="col-sm-9">
                                                <input type="text" id="buktiPilih" class="form-control" readonly>
                                                <input type="text" id="jenisBankPilih" class="form-control"
                                                    hidden>
                                                <input type="text" id="keAPilih" class="form-control" hidden>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <button id="btnProsesPilih" class="btn btn-primary">PROSES</button>
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">TUTUP</button>
                                    </div>
                                </div>
                            </div>
                        </div>

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

                        {{-- print voucher --}}
                        <div class="preview">
                            <div class="row" style="font-weight: bold;">
                                <div class="col-sm-5 text-center" style="border: 1px black solid">
                                    <label>
                                        <h5><b>P.T. Kerta Rajasa Raya</b></h5>
                                    </label>
                                </div>
                                <div class="col-sm-6 ml-3 text-center" style="border: 1px black solid">
                                    <span id="keteranganCetakBKM">
                                        <h5><b>Bukti Penerimaan Bank</b></h5>
                                    </span>
                                </div>
                            </div>
                            <div class="row" style="font-weight: bold;">
                                <div class="col-sm-5 text-center" style="border: 1px black solid">
                                    <label>
                                        <h5><b>Jl. Raya Tropodo No. 1</b></h5>
                                    </label>
                                    <br>
                                    <label>
                                        <h5><b>WARU - SIDOARJO</b></h5>
                                    </label>
                                </div>
                                <div class="col-sm-6 ml-3" style="border: 1px black solid">
                                    <div class="row">
                                        <div class="col-sm-8 offset-sm-3">
                                            <span id="nomerBKM">
                                                <h5><b>Nomer: di sini nomer</b></h5>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-8 offset-sm-3">
                                            <span id="tanggalBKM">
                                                <h5><b>Tanggal: di sini tanggal</b></h5>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="row mt-4" style="border: 1px black solid; width:95%">
                                <div class="col-sm-11">
                                    <div class="row">
                                        <div class="col-sm-3 offset-sm-1">
                                            <label>Jumlah Diterima :</label>
                                        </div>
                                        <div class="col-sm-1">
                                            <span id="symbolBKM">Rp. </span>
                                        </div>
                                        <div class="col-sm-6" style="margin-left: -3%">
                                            <span id="nilaiBKM">123123123</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-2 offset-sm-1">
                                            <label>Terbilang :</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-11 offset-sm-1">
                                            <span id="terbilangBKM">ini jumlah angka ini jumlah angka ini jumlah angka
                                                ini jumlah angka
                                                ini jumlah angka ini jumlah angka<span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" style="width: 95%">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-7 text-center" style="border: 1px black solid">
                                            <label>RINCIAN PENERIMAAN</label>
                                        </div>
                                        <div class="col-sm-2 text-center" style="border: 1px black solid">
                                            <label>KODE PERKIRAAN</label>
                                        </div>
                                        <div class="col-sm-3 text-center" style="border: 1px black solid">
                                            <label>JUMLAH</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="bkmDetailsContainer"></div>
                            <div class="row" id="rowBKM1" style="width: 95%">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-7 text-left"
                                            style="border-left: 1px black solid; border-right: 1px black solid">
                                            <span id="ketBKM">Ket</span>
                                        </div>
                                        <div class="col-sm-2"
                                            style="border-left: 1px black solid; border-right: 1px black solid"></div>
                                        <div class="col-sm-3 text-right"
                                            style="border-left: 1px black solid; border-right: 1px black solid">
                                            <span id="bkmTotalK">totalK</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="rowBKM2" style="width: 95%">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-7 text-left"
                                            style="border-left: 1px black solid; border-right: 1px black solid">
                                            <span id="ket1BKM">Ket1</span>
                                        </div>
                                        <div class="col-sm-2"
                                            style="border-left: 1px black solid; border-right: 1px black solid"></div>
                                        <div class="col-sm-1 text-center" style="border-left: 1px black solid">
                                            <span id="ket3BKM">ket3</span>
                                        </div>
                                        <div class="col-sm-2 text-right" style="border-right: 1px black solid">
                                            <span id="bkmJum">jum</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="rowBKM3" style="width: 95%">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-7 text-left"
                                            style="border-left: 1px black solid; border-right: 1px black solid">
                                            <span id="ket5BKM">Ket5</span>
                                        </div>
                                        <div class="col-sm-2"
                                            style="border-left: 1px black solid; border-right: 1px black solid"></div>
                                        <div class="col-sm-1 text-center" style="border-left: 1px black solid">
                                            <span id="ket6BKM">ket6</span>
                                        </div>
                                        <div class="col-sm-2 text-right" style="border-right: 1px black solid">
                                            <span id="bkmJum2">jum2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row" style="border: 1px black solid; width: 95%">
                                <div class="col-sm-12">
                                    <div class="row" style="font-weight: bold;">
                                        <div class="col-sm-3 offset-sm-6 text-right">
                                            <label>GRAND TOTAL :</label>
                                        </div>
                                        <div class="col-sm-1">
                                            <span id="symbolgtBKM">Rp. </span>
                                        </div>
                                        <div class="col-sm-2 text-right">
                                            <span id="grandTotalBKM">123123112323</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3" style="width: 95%">
                                <div class="col-sm-2 text-center">
                                    <label>Disetujui,</label>
                                </div>
                                <div class="col-sm-2 text-center">
                                    <label>Kasir,</label>
                                </div>
                            </div>

                            <div class="row" style="width: 95%">
                                <div class="col-sm-4 offset-sm-6" style="font-weight: bold">
                                    <span id="sidoarjoBKM">Sidoarjo, 17/October/2024</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-2 text-center" style="width: 75%; position: relative;">
                                    <span
                                        style="display: inline-block; width: 75%; border-bottom: 2px solid black;"></span>
                                </div>
                                <div class="col-sm-2 text-center" style="width: 75%; position: relative;">
                                    <span
                                        style="display: inline-block; width: 75%; border-bottom: 2px solid black;"></span>
                                </div>
                            </div>

                        </div>
                        {{-- end tampil voucher --}}

                        {{-- BKM print --}}
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js\Kencana\BKMLC.js') }}"></script>
@endsection
