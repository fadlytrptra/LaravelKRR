@extends('layouts.appAccounting')
@section('content')
@section('title', 'Cetak Nota dan Faktur')
<style>
    .description-left {
        margin-left: -35px;
        /* Atur sesuai kebutuhan */
    }

    .description-right {
        margin-right: -40px;
        /* Atur sesuai kebutuhan */
    }

    .penagihan-up {
        margin-top: -10px;
        /* Atur sesuai kebutuhan */
    }

    .small-font {
        font-size: 16px !important;
        /* Atur ukuran font sesuai kebutuhan */
        /* padding: 0 !important; */
    }

    .small-normal {
        font-size: 18px !important;
        /* Atur ukuran font sesuai kebutuhan */
        /* padding: 0 !important; */
    }

    .table-responsive.fixed-height tbody {
        background-color: white;
    }

    .underline {
        font-size: 18px;
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
        font-size: 18px;
    }

    .no-wrap-header thead th {
        white-space: nowrap;
        background-color: lightgoldenrodyellow;
        padding: 0;
        font-size: 18px;
    }

    .table-responsive.fixed-height tbody td {
        background-color: white;
        padding: 4px 5px;
        font-size: 18px;
    }

    .fixed-width {
        white-space: nowrap;
        /* Prevent text wrapping */
        overflow: hidden;
        /* Hide overflow text */
        text-overflow: ellipsis;
        /* Show "..." when the text overflows */
        padding: 0;
        font-size: 18px;
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
        font-size: 18px;
    }

    .faktur {
        display: none;
    }

    .faktur2 {
        display: none;
    }

    .faktur3 {
        display: none;
    }

    .fakturXC {
        display: none;
    }

    .nota {
        display: none;
    }

    .fakturPajak1 {
        display: none;
    }

    .fakturPajak {
        display: none;
    }

    .fakturTunai {
        display: none;
    }

    .nota1 {
        display: none;
    }

    .fakturPajakTunai {
        display: none;
    }

    .fakturUangMuka {
        display: none;
    }

    .fakturTunaiUM {
        display: none;
    }

    @media print {

        /* Hide everything by default */
        body * {
            visibility: hidden;
        }

        /* Show only elements with the class 'faktur' */
        .faktur,
        .faktur * {
            visibility: visible;
            font-size: 18px;
        }

        /* Show only elements with the class 'faktur2' */
        .faktur2,
        .faktur2 * {
            visibility: visible;
            font-size: 18px;
        }

        /* Show only elements with the class 'faktur3' */
        .faktur3,
        .faktur3 * {
            visibility: visible;
            font-size: 18px;
        }

        /* Show only elements with the class 'fakturXC' */
        .fakturXC,
        .fakturXC * {
            visibility: visible;
        }

        .nota,
        .nota * {
            visibility: visible;
        }

        .fakturPajak1,
        .fakturPajak1 * {
            visibility: visible;
        }

        .fakturPajak,
        .fakturPajak * {
            visibility: visible;
        }

        .fakturTunai,
        .fakturTunai * {
            visibility: visible;
            font-size: 18px;
        }

        .nota1,
        .nota1 * {
            visibility: visible;
        }

        .fakturPajakTunai,
        .fakturPajakTunai * {
            visibility: visible;
        }

        .fakturUangMuka,
        .fakturUangMuka * {
            visibility: visible;
            font-size: 18px;
        }

        .fakturTunaiUM,
        .fakturTunaiUM * {
            visibility: visible;
            font-size: 18px;
        }

        /* Ensure that the elements are positioned correctly */
        .faktur,
        .faktur2,
        .faktur3,
        .fakturXC,
        .nota,
        .fakturPajak1,
        .fakturPajak,
        .fakturTunai,
        .nota1,
        .fakturPajakTunai,
        .fakturUangMuka,
        .fakturTunaiUM {
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
        <div class="col-md-8 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Cetak Nota dan Faktur</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <!-- Form fields go here -->
                        <div class="card">
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <input type="radio" id="optTunai" name="pilihan" value="optTunai">
                                    <label for="optTunai">Tunai</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="radio" id="optPajakTunai" name="pilihan" value="optPajakTunai">
                                    <label for="optPajakTunai">Faktur Pajak Tunai</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="radio" id="optUM" name="pilihan" value="optUM">
                                    <label for="optUM">Faktur Uang Muka</label>
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <input type="radio" id="optNotaFaktur" name="pilihan" value="optNotaFaktur"
                                        checked>
                                    <label for="optNotaFaktur">Nota/Faktur</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="radio" id="optPajak" name="pilihan" value="optPajak">
                                    <label for="optPajak">Faktur Pajak</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="radio" id="optPajakUM" name="pilihan" value="optPajakUM">
                                    <label for="optPajakUM">Faktur Tunai UM</label>
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <label for="tgl_Penagihan">Tanggal Penagihan</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="date" id="tgl_Penagihan" class="form-control" style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <label for="bankSelect">Bank</label>
                                </div>
                                <div class="col-md-7">
                                    <select id="bankSelect" class="form-control" style="width: 100%">
                                        <option value="0">Pilih Bank (Kosong)</option>
                                        <option value="1">BCA</option>
                                        <option value="2">BNI</option>
                                        <option value="3">Mandiri SCF</option>
                                        <option value="4">Mandiri</option>
                                        <option value="5">OCBC</option>
                                        <option value="6">SKBDN</option>
                                        <option value="7">OCBC TRF</option>
                                    </select>
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <label for="ttdSelect">TTD</label>
                                </div>
                                <div class="col-md-7">
                                    <select id="ttdSelect" class="form-control" style="width: 100%">
                                        <option value="" disabled selected>Pilih TTD</option>
                                        <option value="1">TJAHYO SANTOSO</option>
                                        <option value="2">RUDY SANTOSO</option>
                                        <option value="3">YUDI SANTOSO</option>
                                    </select>
                                </div>
                            </div>
                            <p>
                            <div class="d-flex" id="divFormat">
                                <div class="col-md-4">
                                    <label for="formatSelect" id="formatLabel">Format</label>
                                </div>
                                <div class="col-md-7">
                                    <select id="formatSelect" class="form-control" style="width: 100%">
                                        <option value="1" disabled selected>Pilih Format</option>
                                        <option value="1">Default</option>
                                        <option value="2">PDF</option>
                                    </select>
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <label for="item_halaman">Item Halaman</label>
                                </div>
                                <div class="col-md-7">
                                    <input type="number" id="item_halaman" class="form-control"
                                        style="width: 100%" value="3">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <label for="customer">Customer</label>
                                </div>
                                <div class="col-md-7">
                                    <input readonly type="text" id="customer" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button id="btnBrowse" class="btn btn-primary form-control">...</button>
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <label for="idPenagihan">Id Penagihan</label>
                                </div>
                                <div class="col-md-7">
                                    <input readonly type="text" id="idPenagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <br>
                        </div>
                        <br>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-1">
                                    <input type="submit" id="btnPrev" name="cetak" value="Cetak"
                                        class="btn btn-primary">
                                </div>
                                {{-- <div class="col-2">
                                    <input type="submit" id="btnKeluar" name="keluar" value="Keluar"
                                        class="btn btn-primary">
                                </div> --}}
                            </div>
                        </div>

                        {{-- nota dan faktur OMYA --}}
                        <div class="faktur3">
                            {{-- <table style="width: 100%; border-bottom: 1px solid black !important; border-top: 1px solid black !important;" > --}}
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="border: 1px solid black; padding: 5px; position: relative;">
                                        <div class="row">
                                            <div class="col-sm-8 text-right">
                                                <span style="font-weight: bold; font-size: 24px !important">FAKTUR
                                                    PENJUALAN</span>
                                            </div>
                                            <div class="col-sm-3 text-right"
                                                style="margin-left: 60px; margin-top: 5px">
                                                <span>Nomor: </span>
                                                <span id="faktur_IdPenagihan3">Id Penagihan</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table style="width: 100%;">
                                <tr>
                                    <td colspan="2"
                                        style="font-weight: bold; border-bottom:none !important; border-right:none !important">
                                        &nbsp;PENGUSAHA KENA PAJAK</td>
                                    <td style="border-bottom:none !important; border-left:none !important"><span
                                            id="faktur_beneficiary3">( BENEFICIARY
                                            )</span></td>
                                </tr>
                                <tr>
                                    <td
                                        style="width: 25%; border:none !important; border-left: 1px solid black !important;">
                                        &nbsp;N a m a</td>
                                    <td style="width: 2%; border:none !important;">&nbsp;:</td>
                                    <td
                                        style="font-weight: bold; border:none !important; border-right: 1px solid black !important;">
                                        &nbsp;PT. KERTA RAJASA RAYA</td>
                                </tr>
                                <tr>
                                    <td
                                        style="width: 25%; border:none !important; border-left: 1px solid black !important;">
                                        &nbsp;A l a m a t</td>
                                    <td style="width: 2%; border:none !important;">&nbsp;:</td>
                                    <td
                                        style="border:none !important; border-right: 1px solid black !important; font-size: 16px !important">
                                        &nbsp;Jl. Raya Tropodo No.1, RT 001, RW 005, Kepuhkiriman, Waru, Kab. Sidoarjo,
                                        Jawa Timur 61256</td>
                                </tr>
                                <tr>
                                    <td
                                        style="width: 25%; border:none !important; border-left: 1.5px solid black !important;">
                                        &nbsp;N P W P</td>
                                    <td style="width: 2%; border:none !important;">&nbsp;:</td>
                                    <td style="border:none !important; border-right: 1px solid black !important;">
                                        &nbsp;0011 4089 7864 1000</td>
                                </tr>
                                <tr>
                                    <td
                                        style="width: 25%; border:none !important; border-left: 1px solid black !important; border-bottom: 1px solid black !important;">
                                        &nbsp;Tanggal Pengukuhan PKP</td>
                                    <td
                                        style="width: 2%; border:none !important; border-bottom: 1px solid black !important;">
                                        &nbsp;:</td>
                                    <td
                                        style="border:none !important; border-right: 1px solid black !important; border-bottom: 1px solid black !important;">
                                        &nbsp;24 Februari 2011</td>
                                </tr>
                            </table>
                            <table style="width: 100%;">
                                <tr>
                                    <td colspan="3"
                                        style="font-weight: bold; border-bottom:none !important; border-right:none !important; width: 30%;">
                                        &nbsp;PEMBELI BKP / PENERIMA JKP</td>
                                    <td style="border-bottom:none !important; border-left:none !important;">
                                        <span id="faktur_applicant3">( APPLICANT )</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="width: 10%; border:none !important; border-left: 1px solid black !important;">
                                        &nbsp;N a m a</td>
                                    <td style="width: 2%; border:none !important;">&nbsp;:</td>
                                    <td colspan="3"
                                        style="font-weight: bold; border:none !important; border-right: 1px solid black !important;">
                                        &nbsp;
                                        <span
                                            id="faktur_NamaNPWP3">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border:none !important; border-left: 1px solid black !important;">
                                        &nbsp;A l a m a t</td>
                                    <td style="width: 2%; border:none !important;">&nbsp;:</td>
                                    <td colspan="2"
                                        style="border:none !important; border-right: 1px solid black !important;">
                                        &nbsp;
                                        <span id="faktur_AlamatNPWP3"
                                            style="font-size: 15px !important">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="border:none !important; border-left: 1px solid black !important; border-bottom: 1px solid black !important;">
                                        &nbsp;N P W P</td>
                                    <td
                                        style="width: 2%; border:none !important; border-bottom: 1px solid black !important;">
                                        &nbsp;:</td>
                                    <td colspan="2"
                                        style="border:none !important; border-right: 1px solid black !important; border-bottom: 1px solid black !important;">
                                        &nbsp;
                                        <span
                                            id="faktur_NPWP3">XXXXXXXXXXXXXXNPWPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                    </td>
                                </tr>
                            </table>
                            <table style="width: 100%;">
                                <tr>
                                    <td style="width: 5%; text-align: center;">No. Urut</td>
                                    <td style="width: 41%; text-align: center;">Nama Barang / Jasa Kena Pajak</td>
                                    <td style="width: 16%; text-align: center;">
                                        <span>Kuantum</span>
                                        <br>
                                        <span id="faktur_emptyBag3">/ Empty Bag</span>
                                    </td>
                                    <td style="width: 17%; text-align: center;">Harga Satuan</td>
                                    <td style="text-align: center;">Harga Jual/Penggantian/Uang Muka</td>
                                </tr>
                                <tr>
                                    <td colspan="5">
                                        <span id="faktur_NamaKelompokUtama3"
                                            style="text-align: left !important; margin-left: 60px;">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                        <div style="margin-left: 50px;" id="faktur_Detail3"></div>
                                        <br>
                                        <label id="bankBayar3" style="font-weight: bold; margin-left: 60px;">&nbsp;
                                            <br>
                                            &nbsp;<br>
                                            &nbsp;<br>
                                            &nbsp;</label>
                                    </td>
                                </tr>
                            </table>
                            <table style="width: 100%;">
                                <tr>
                                    <td colspan="2" style="width: 79%; text-align: left;">Jumlah Harga Jual / Penggantian / Uang Muka / Termijn
                                    </td>
                                    <td style="width: 4%; text-align: left; border-right:none !important"
                                        id="faktur_SymbolGrand3"></td>
                                    <td style="text-align: right; border-left:none !important" id="faktur_Grand3">
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="width: 79%; text-align: left;">Dikurangi potongan harga
                                    </td>
                                    <td style="width: 4%; text-align: left; border-right:none !important"
                                        id="faktur_SymbolDiscount3"></td>
                                    <td style="text-align: right; border-left:none !important" id="faktur_Discount3">0.00</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="width: 79%; text-align: left;">Dikurangi uang muka yang
                                        diterima</td>
                                    <td style="width: 4%; text-align: left; border-right:none !important"
                                        id="faktur_SymbolUM3"></td>
                                    <td style="text-align: right; border-left:none !important" id="faktur_UM3"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="width: 79%; text-align: left;">Dasar Pengenaan Pajak
                                        Nilai Lain</td>
                                    <td style="width: 4%; text-align: left; border-right:none !important"
                                        id="faktur_SymbolDPP3"></td>
                                    <td style="text-align: right; border-left:none !important" id="faktur_DPP3"></td>
                                </tr>
                                {{-- <tr>
                                    <td colspan="2" style="width: 79%; text-align: left;">PPN 12%</td>
                                    <td style="width: 4%; text-align: left; border-right:none !important" id="faktur_SymbolPajak3"></td>
                                    <td style="text-align: right; border-left:none !important" id="faktur_Pajak3"></td>
                                </tr> --}}
                            </table>
                            <table style="width: 100%;">
                                <tr>
                                    <td style="width: 15%; text-align: left; border-right:none !important">PPN</td>
                                    <td style="width: 64%; text-align: left; border-left:none !important"
                                        id="faktur_PersenPPN3"></td>
                                    <td style="width: 4%; text-align: left; border-right:none !important"
                                        id="faktur_SymbolPajak3"></td>
                                    <td style="text-align: right; border-left:none !important" id="faktur_Pajak3">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 15%; text-align: left; border-right:none !important">PPH UNIFIKASI</td>
                                    <td style="width: 64%; text-align: left; border-left:none !important"
                                        id="faktur_PersenPPH3"></td>
                                    <td style="width: 4%; text-align: left; border-right:none !important"
                                        id="faktur_SymbolPPH3"></td>
                                    <td style="text-align: right; border-left:none !important" id="faktur_PPH3">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 15%; text-align: left; border-right:none !important">Jumlah</td>
                                    <td style="width: 64%; text-align: left; border-left:none !important; font-family: 'Arial Narrow', Arial, sans-serif; font-size: 12px;"
                                        id="faktur_Terbilang3"></td>
                                    <td style="width: 4%; text-align: left; border-right:none !important"
                                        id="faktur_SymbolTerbayar3"></td>
                                    <td style="text-align: right; border-left:none !important" id="faktur_Terbayar3">
                                    </td>
                                </tr>
                            </table>
                            <table style="width: 100%;">
                                <tr>
                                    <td style="width: 72%; text-align: left; border-right:none !important; border-bottom:none !important"
                                        id="faktur_SyaratBayar3">&nbsp;</td>
                                    <td
                                        style="width: 11%; text-align: left; border-right:none !important; border-bottom:none !important">
                                        Sidoarjo, Tgl</td>
                                    <td style="width: 25%; text-align: center; border-right:none !important; border-bottom:none !important"
                                        id="faktur_TglBln3"></td>
                                    <td style="text-align: right; border-bottom:none !important; border-bottom:none !important"
                                        id="faktur_Thn3"></td>
                                </tr>
                                <tr>
                                    <td colspan="4" style="text-align: left; border-bottom:none !important"
                                        id="faktur_Tempo3">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td colspan="3"
                                        style="width: 72%; text-align: left; border-right:none !important; border-bottom:none !important"
                                        id="faktur_SuratJalan3">&nbsp;</td>
                                    <td style="border-bottom:none !important"></td>
                                </tr>
                                <tr>
                                    <td colspan="3"
                                        style="width: 72%; text-align: left; border-right:none !important; border-bottom:none !important"
                                        id="faktur_SJ3">&nbsp;</td>
                                    <td style="border-bottom:none !important"></td>
                                </tr>
                                <tr>
                                    <td style="border-right:none !important; border-bottom:none !important"></td>
                                    <td colspan="3" style="text-align: center; border-bottom:none !important">
                                        (.........................................)</td>
                                </tr>
                                <tr>
                                    <td style="border-right:none !important"></td>
                                    <td colspan="3" style="text-align: center" id="ttdPimpinan3">RUDY SANTOSO</td>
                                </tr>
                            </table>
                            <div class="row" style="position: absolute; top: 1.4cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    {{-- <span id="faktur_beneficiary3">( BENEFICIARY
                                        )</span> --}}
                                </div>
                            </div>

                            <div class="row mt-5" style="margin-top: 0.1cm">
                                <div class="col-sm-8 text-right">
                                    {{-- <label><b>Nomor Seri Faktur Pajak</b></label> --}}
                                </div>
                                <div class="col-sm-4 text-right">
                                    {{-- <span id="faktur_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX</span> --}}
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 7.1cm; left: 0cm; right: 6.2cm;">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    {{-- <span id="faktur_applicant3">( APPLICANT )</span> --}}
                                </div>
                            </div>

                            <br>
                            <br>
                            <br>
                            <br>
                            {{-- <div class="row" style="margin-top: 15%">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span
                                        id="faktur_NamaNPWP3">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-10 offset-sm-2 text-left">
                                    <span id="faktur_AlamatNPWP3"
                                        style="font-size: 15px !important">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span id="faktur_NPWP3">XXXXXXXXXXXXXXNPWPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div> --}}

                            <div class="row" style="position: absolute; top: 12.2cm; left: 1cm; right: 0cm;">
                                <div class="col-sm-7 text-right offset-sm-0">
                                    {{-- <span id="faktur_emptyBag3">/ Empty Bag</span> --}}
                                </div>
                            </div>

                            <br>
                            <br>
                            <div class="row mt-3">
                                <div class="col-sm-1 offset-sm-0 text-left description-left"
                                    style="font-size: 14px !important;">
                                    <span></span>
                                </div>
                                <div class="col-sm-5 offset-sm-0 text-left description-left"
                                    style="font-size: 14px !important;">
                                    {{-- <span
                                        id="faktur_NamaKelompokUtama3">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span> --}}
                                </div>
                            </div>
                            {{-- <div id="faktur_Detail3"></div> --}}

                            <div class="row mt-3" style="position: absolute; top: 21.7cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-10 text-left offset-sm-0">
                                    <label id="bankBayar3" style="font-weight: bold">&nbsp;
                                        <br>
                                        &nbsp;<br>
                                        &nbsp;<br>
                                        &nbsp;</label>
                                </div>
                                <div class="col-sm-2 text-right offset-sm-1">
                                    {{-- <label><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;XXXXXXXXXXXXXXXXXXXXXXXXXXXX</b></label> --}}
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    {{-- <span id="faktur_SymbolGrand3">xxxx</span> --}}
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    {{-- <span id="faktur_Grand3">-5.555.555,00</span> --}}
                                </div>
                            </div>

                            {{-- <div class="row mt-4">
                                <div class="col-sm-2 text-left offset-sm-3">
                                    <label><b> XXXXXXXXXXXXXXXXXXXXXXXXXXXX</b></label>
                                </div>
                                <div class="col-sm-1 offset-sm-5 text-right">
                                    <span id="faktur_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="faktur_Grand">-5.555.555,00</span>
                                </div>
                            </div> --}}

                            <div class="row" style="position: absolute; top: 26.2cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-2 offset-sm-10 text-right">
                                    {{-- <label>0.00</label> --}}
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 27cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    {{-- <span id="faktur_SymbolUM3">xxxx</span> --}}
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    {{-- <span id="faktur_UM3">-5.555.555,00</span> --}}
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 27.9cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-4 text-left offset-sm-2">
                                    {{-- <span>Nilai Lain</span> --}}
                                </div>
                                <div class="col-sm-1 offset-sm-3 text-right">
                                    {{-- <span id="faktur_SymbolDPP3">xxxx</span> --}}
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    {{-- <span id="faktur_DPP3">-5.555.555,00</span> --}}
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 28.7cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-3 text-left offset-sm-0">
                                    {{-- <span id="faktur_PersenPPN3"><b>11%</b></span> --}}
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    {{-- <span id="faktur_SymbolPajak3">xxxx</span> --}}
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    {{-- <span id="faktur_Pajak3">-5.555.555,00</span> --}}
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 29.55cm; left: 0cm; right: 0cm; padding: 0% !important">
                                <div class="col-sm-9 text-left offset-sm-0">
                                    {{-- <span id="faktur_Terbilang3"
                                        style="font-family: 'Arial Narrow', Arial, sans-serif; font-size: 14px;">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span> --}}
                                </div>
                                <div class="col-sm-1 text-right" style="font-weight: bold">
                                    {{-- <span id="faktur_SymbolTerbayar3">xxxx</span> --}}
                                </div>
                                <div class="col-sm-2 text-right"
                                    style="font-weight: bold; white-space: nowrap; overflow: hidden;">
                                    {{-- <span id="faktur_Terbayar3">-5.555.555,00</span> --}}
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 30.5cm; left: 1cm; right: 0cm !important; font-weight: bold">
                                <div class="col-sm-4 text-left">
                                    {{-- <span id="faktur_SyaratBayar3">Syarat Pembayaran: &emsp;&emsp;xxxx Hari</span> --}}
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    {{-- <span>Sidoarjo</span> --}}
                                </div>
                                <div class="col-sm-2 text-center">
                                    {{-- <span id="faktur_TglBln3">3 Januari</span> --}}
                                </div>
                                <div class="col-sm-1 text-right">
                                    {{-- <span id="faktur_Thn3">11</span> --}}
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 31.4cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    {{-- <span id="faktur_Tempo3">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span> --}}
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 32.3cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    {{-- <span id="faktur_SuratJalan3">Surat Jalan: &emsp;&emsp;
                                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span> --}}
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 33.6cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-8 text-left">
                                    {{-- <span
                                        id="faktur_SJ3">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span> --}}
                                </div>
                                <div class="col-sm-3 text-right">
                                    {{-- <span id="ttdPimpinan3">RUDY SANTOSO</span> --}}
                                </div>
                            </div>
                            {{-- </table> --}}
                        </div>

                        {{-- nota dan faktur --}}
                        <div class="faktur">

                            <div class="row">
                                <div class="col-sm-12 text-right penagihan-up"
                                    style="position: absolute; top: 0.4cm; left: 0cm; right: 2cm;">
                                    <span id="faktur_IdPenagihan">Id Penagihan</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 1.4cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span id="faktur_beneficiary">( BENEFICIARY )</span>
                                </div>
                            </div>

                            <div class="row mt-5" style="margin-top: 0.1cm">
                                <div class="col-sm-8 text-right">
                                    {{-- <label><b>Nomor Seri Faktur Pajak</b></label> --}}
                                </div>
                                <div class="col-sm-4 text-right">
                                    {{-- <span id="faktur_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX</span> --}}
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 7.1cm; left: 0cm; right: 6.2cm;">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span id="faktur_applicant">( APPLICANT )</span>
                                </div>
                            </div>

                            <br>
                            <br>
                            <br>
                            <br>
                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span
                                        id="faktur_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-10 offset-sm-2 text-left">
                                    <span id="faktur_AlamatNPWP"
                                        style="font-size: 15px !important">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span id="faktur_NPWP">XXXXXXXXXXXXXXNPWPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 12.2cm; left: 1cm; right: 0cm;">
                                <div class="col-sm-7 text-right offset-sm-0">
                                    <span id="faktur_emptyBag">/ Empty Bag</span>
                                </div>
                            </div>

                            <br>
                            <br>
                            <div class="row mt-3">
                                <div class="col-sm-1 offset-sm-0 text-left description-left"
                                    style="font-size: 14px !important;">
                                    <span></span>
                                </div>
                                <div class="col-sm-5 offset-sm-0 text-left description-left"
                                    style="font-size: 14px !important;">
                                    <span
                                        id="faktur_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="faktur_Detail"></div>

                            <div class="row mt-3" style="position: absolute; top: 21.7cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-10 text-left offset-sm-0">
                                    <label id="bankBayar" style="font-weight: bold">&nbsp;
                                        <br>
                                        &nbsp;<br>
                                        &nbsp;<br>
                                        &nbsp;</label>
                                </div>
                                <div class="col-sm-2 text-right offset-sm-1">
                                    <label><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
                                    {{-- XXXXXXXXXXXXXXXXXXXXXXXXXXXX --}}
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="faktur_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    <span id="faktur_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            {{-- <div class="row mt-4">
                                <div class="col-sm-2 text-left offset-sm-2">
                                    <label><b> XXXXXXXXXXXXXXXXXXXXXXXXXXXX</b></label>
                                </div>
                                <div class="col-sm-1 offset-sm-5 text-right">
                                    <span id="faktur_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="faktur_Grand">-5.555.555,00</span>
                                </div>
                            </div> --}}

                            <div class="row" style="position: absolute; top: 26.2cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-2 offset-sm-10 text-right">
                                    <label>0.00</label>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 27cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="faktur_SymbolUM">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    <span id="faktur_UM">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 27.9cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-4 text-left offset-sm-2">
                                    <span>Nilai Lain</span>
                                </div>
                                <div class="col-sm-1 offset-sm-3 text-right">
                                    <span id="faktur_SymbolDPP">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    <span id="faktur_DPP">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 28.7cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-3 text-left offset-sm-0">
                                    <span id="faktur_PersenPPN"><b>11%</b></span>
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="faktur_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    <span id="faktur_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 29.55cm; left: 0cm; right: 0cm; padding: 0% !important">
                                <div class="col-sm-9 text-left offset-sm-0">
                                    <span id="faktur_Terbilang"
                                        style="font-family: 'Arial Narrow', Arial, sans-serif; font-size: 14px;">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-1 text-right" style="font-weight: bold">
                                    <span id="faktur_SymbolTerbayar">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right"
                                    style="font-weight: bold; white-space: nowrap; overflow: hidden;">
                                    <span id="faktur_Terbayar">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 30.5cm; left: 1cm; right: 0cm !important; font-weight: bold">
                                <div class="col-sm-4 text-left">
                                    <span id="faktur_SyaratBayar">Syarat Pembayaran: &emsp;&emsp;xxxx Hari</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-center">
                                    <span id="faktur_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="faktur_Thn">11</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 31.4cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="faktur_Tempo">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 32.3cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="faktur_SuratJalan">Surat Jalan: &emsp;&emsp;
                                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 33.6cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-8 text-left">
                                    <span id="faktur_SJ"
                                        style="width: 50%">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-3 text-right">
                                    <span id="ttdPimpinan">RUDY SANTOSO</span>
                                </div>
                            </div>

                        </div>

                        {{-- nota dan faktur 2 --}}
                        <div class="faktur2">

                            <div class="row">
                                <div class="col-sm-12 text-right penagihan-up"
                                    style="position: absolute; top: 0.4cm; left: 0cm; right: 2cm;">
                                    <span id="faktur_IdPenagihan2">Id Penagihan</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 1.4cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span id="faktur_beneficiary2">( BENEFICIARY )</span>
                                </div>
                            </div>

                            <div class="row mt-5" style="margin-top: 0.1cm">
                                <div class="col-sm-8 text-right">
                                    {{-- <label><b>Nomor Seri Faktur Pajak</b></label> --}}
                                </div>
                                <div class="col-sm-4 text-right">
                                    {{-- <span id="faktur_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX</span> --}}
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 7.1cm; left: 0cm; right: 6.2cm;">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span id="faktur_applicant2">( APPLICANT )</span>
                                </div>
                            </div>

                            <br>
                            <br>
                            <br>
                            <br>
                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span
                                        id="faktur_NamaNPWP2">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-10 offset-sm-2 text-left">
                                    <span id="faktur_AlamatNPWP2"
                                        style="font-size: 15px !important">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span id="faktur_NPWP2">XXXXXXXXXXXXXXNPWPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 12.2cm; left: 1cm; right: 0cm;">
                                <div class="col-sm-7 text-right offset-sm-0">
                                    <span id="faktur_emptyBag2">/ Empty Bag</span>
                                </div>
                            </div>

                            <br>
                            <br>
                            <div class="row mt-3">
                                <div class="col-sm-1 offset-sm-0 text-left description-left"
                                    style="font-size: 14px !important;">
                                    <span></span>
                                </div>
                                <div class="col-sm-5 offset-sm-0 text-left description-left"
                                    style="font-size: 14px !important;">
                                    <span
                                        id="faktur_NamaKelompokUtama2">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="faktur_Detail2"></div>

                            <div class="row mt-3" style="position: absolute; top: 21.7cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-10 text-left offset-sm-0">
                                    <label id="bankBayar2" style="font-weight: bold">&nbsp;
                                        <br>
                                        &nbsp;<br>
                                        &nbsp;<br>
                                        &nbsp;</label>
                                </div>
                                <div class="col-sm-2 text-right offset-sm-1">
                                    <label><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="faktur_SymbolGrand2">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    <span id="faktur_Grand2">-5.555.555,00</span>
                                </div>
                            </div>

                            {{-- <div class="row mt-4">
                                <div class="col-sm-2 text-left offset-sm-2">
                                    <label><b> XXXXXXXXXXXXXXXXXXXXXXXXXXXX</b></label>
                                </div>
                                <div class="col-sm-1 offset-sm-5 text-right">
                                    <span id="faktur_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="faktur_Grand">-5.555.555,00</span>
                                </div>
                            </div> --}}

                            <div class="row" style="position: absolute; top: 26.2cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-2 offset-sm-10 text-right">
                                    <label>0.00</label>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 27cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="faktur_SymbolUM2">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    <span id="faktur_UM2">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 27.9cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-4 text-left offset-sm-2">
                                    <span>Nilai Lain</span>
                                </div>
                                <div class="col-sm-1 offset-sm-3 text-right">
                                    <span id="faktur_SymbolDPP2">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    <span id="faktur_DPP2">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 28.7cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-3 text-left offset-sm-0">
                                    <span id="faktur_PersenPPN2"><b>11%</b></span>
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="faktur_SymbolPajak2">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    <span id="faktur_Pajak2">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 29.55cm; left: 0cm; right: 0cm; padding: 0% !important">
                                <div class="col-sm-9 text-left offset-sm-0">
                                    <span id="faktur_Terbilang2"
                                        style="font-family: 'Arial Narrow', Arial, sans-serif; font-size: 14px;">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-1 text-right" style="font-weight: bold">
                                    <span id="faktur_SymbolTerbayar2">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right"
                                    style="font-weight: bold; white-space: nowrap; overflow: hidden;">
                                    <span id="faktur_Terbayar2">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 30.5cm; left: 1cm; right: 0cm !important; font-weight: bold">
                                <div class="col-sm-4 text-left">
                                    <span id="faktur_SyaratBayar2">Syarat Pembayaran: &emsp;&emsp;xxxx Hari</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-center">
                                    <span id="faktur_TglBln2">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="faktur_Thn2">11</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 31.4cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="faktur_Tempo2">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 32.3cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="faktur_SuratJalan2">Surat Jalan: &emsp;&emsp;
                                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 33.6cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-8 text-left">
                                    <span
                                        id="faktur_SJ2">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-3 text-right">
                                    <span id="ttdPimpinan2">RUDY SANTOSO</span>
                                </div>
                            </div>

                        </div>

                        <div class="fakturXC">

                            <div class="row">
                                <div class="col-sm-12 text-right">
                                    <span id="fakturXC_IdPenagihan">Id Penagihan</span>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div class="col-sm-8 text-right">
                                    <label>Nomor Seri Faktur Pajak</label>
                                </div>
                                <div class="col-sm-4 text-right">
                                    <span id="fakturXC_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX
                                    </span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="fakturXC_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="fakturXC_AlamatNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span id="fakturXC_NPWP">XXXXXXXXXXXXXXNPWPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="fakturXC_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturXC_Detail"></div>

                            <div class="row mt-4">
                                <div class="col-sm-6 text-left offset-sm-1">
                                    <span>Tambahan Biaya</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-4 text-left offset-sm-1">
                                    <span>1. Extra Charge Transport</span>
                                </div>
                                <div class="col-sm-7 text-right">
                                    <span id="fakturXC_Dexlite">-5,555,555.55</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-4 text-left offset-sm-1">
                                    <span>2. Storage</span>
                                </div>
                                <div class="col-sm-7 text-right">
                                    <span id="fakturXC_Demurrage">-5,555,555.55</span>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div class="col-sm-10 text-left offset-sm-1">
                                    <label><b> Pembayaran mohon ditransfer ke: <br>
                                            Bank OCBC NISP Cab. Diponegoro - Surabaya <br>
                                            a/c. 5578 0000 9333 ( IDR ) <br>
                                            a/n. PT. Kerta Rajasa Raya</b></label>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-2 text-left offset-sm-2">
                                    <label><b> XXXXXXXXXXXXXXXXXXXXXXXXXXXX</b></label>
                                </div>
                                <div class="col-sm-1 offset-sm-5 text-right">
                                    <span id="fakturXC_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturXC_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 offset-sm-10 text-right">
                                    <label>0.00</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturXC_SymbolUM">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturXC_UM">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturXC_SymbolDPP">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturXC_DPP">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 text-left offset-sm-1">
                                    <span id="fakturXC_PersenPPN"><b>11%</b></span>
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="fakturXC_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturXC_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-left offset-sm-1">
                                    <span
                                        id="fakturXC_Terbilang">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-1 text-right" style="font-weight: bold">
                                    <span id="fakturXC_SymbolTerbayar">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="font-weight: bold">
                                    <span id="fakturXC_Terbayar">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-4 text-left">
                                    <span id="fakturXC_SyaratBayar">Syarat Pembayaran: &emsp;&emsp;xxxx Hari</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-left">
                                    <span id="fakturXC_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="fakturXC_Thn">11</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="fakturXC_Tempo">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="fakturXC_SuratJalan">Surat Jalan: &emsp;&emsp;
                                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-8 text-left">
                                    <span
                                        id="fakturXC_SJ">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-3 text-center">
                                    <span id="fakturXC_SJ">RUDY SANTOSO</span>
                                </div>
                            </div>

                        </div>

                        <div class="nota">

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="nota_IdPenagihan">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXIdPenagihanXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="nota_NamaCust">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMACUStXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span id="nota_Alamat">XXXXXXXXXXXXXXalamatXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="nota_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <div id="nota_Detail" style="margin-bottom: 25%"></div>

                            <div class="row mt-4" style="font-weight: bold">
                                <div class="col-sm-8 text-left offset-sm-1">
                                    <span
                                        id="nota_Terbilang">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-1 text-right">
                                    <span id="nota_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="nota_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-4 text-left">
                                    <span id="nota_SyaratBayar">Syarat Pembayaran: &emsp;&emsp;xxxx Hari</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-left">
                                    <span id="nota_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="nota_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-left">
                                    <span id="nota_Tempo">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-left">
                                    <span id="nota_SuratJalan">Surat Jalan: &emsp;&emsp;
                                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-left">
                                    <span
                                        id="nota_SJ">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-3 text-center">
                                    <span id="nota_SJ">YUDI SANTOSO</span>
                                </div>
                            </div>

                        </div>


                        {{-- faktur pajak --}}
                        <div class="fakturPajak1">

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-center">
                                    <span id="fakturPajak1_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX
                                    </span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 25%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajak1_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajak1_AlamatNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span id="fakturPajak1_NPWP">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                                <div class="col-sm-4 offset-sm-1 text-left">
                                    <span id="fakturPajak1_NPWP2">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="fakturPajak1_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturPajak1_Detail"></div>

                            <div class="row mt-4">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_Symbol0">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span>0.00</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_SymbolUM">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_UM">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_SymbolGrandTot">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_GrandTot">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-2 text-center offset-sm-7">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="fakturPajak1_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>YUDI SANTOSO</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>MARKETING MANAGER</label>
                                </div>
                            </div>
                        </div>

                        <div class="fakturPajak">

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-center">
                                    <span id="fakturPajak_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX
                                    </span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 25%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajak_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajak_AlamatNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span id="fakturPajak_NPWP">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                                <div class="col-sm-4 offset-sm-1 text-left">
                                    <span id="fakturPajak_NPWP2">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="fakturPajak_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturPajak_Detail"></div>

                            <div class="row mt-4">
                                <div class="col-sm-1 offset-sm-7 text-right">
                                    <span id="fakturPajak_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 offset-sm-8 text-right">
                                    <span>0.00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-7 text-right">
                                    <span id="fakturPajak_SymbolUM">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_UM">-5.555.555,00</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_UMRupiah">Rp. -5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-7 text-right">
                                    <span id="fakturPajak_SymbolGrandTot">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_GrandTot">-5.555.555,00</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_TotalRupiah">Rp. -5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 offset-sm-10 text-right">
                                    <span id="fakturPajak_Pajak">Rp. -5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-2 offset-sm-9 text-right">
                                    <span id="fakturPajak_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="fakturPajak_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>YUDI SANTOSO</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>MARKETING MANAGER</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 offset-sm-1">
                                    <span id="fakturPajak_Kurs">Kurs /1 Rp.</span>
                                </div>
                            </div>

                        </div>


                        {{-- Faktur Tunai --}}
                        <div class="fakturTunai">

                            <div class="row">
                                <div class="col-sm-12 text-right penagihan-up"
                                    style="position: absolute; top: 0.4cm; left: 0cm; right: 2cm;">
                                    <span id="fakturTunai_IdPenagihan">Id Penagihan</span>
                                </div>
                            </div>

                            <div class="row mt-5" style="margin-top: 0.1cm">
                                <div class="col-sm-8 text-right">
                                    {{-- <label><b>Nomor Seri Faktur Pajak</b></label> --}}
                                </div>
                                <div class="col-sm-4 text-right">
                                    {{-- <span id="fakturTunai_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX</span> --}}
                                </div>
                            </div>

                            <br>
                            <br>
                            <br>
                            <br>
                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span
                                        id="fakturTunai_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-10 offset-sm-2 text-left">
                                    <span id="fakturTunai_AlamatNPWP"
                                        style="font-size: 15px !important">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span
                                        id="fakturTunai_NPWP">XXXXXXXXXXXXXXNPWPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <br>
                            <br>
                            <div class="row mt-3">
                                <div class="col-sm-1 offset-sm-0 text-left description-left"
                                    style="font-size: 14px !important;">
                                    <span></span>
                                </div>
                                <div class="col-sm-5 offset-sm-0 text-left description-left"
                                    style="font-size: 14px !important;">
                                    <span
                                        id="fakturTunai_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturTunai_Detail"></div>

                            <div class="row mt-3" style="position: absolute; top: 21.7cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-10 text-left offset-sm-0">
                                    <label id="bankBayarTunai" style="font-weight: bold">&nbsp;
                                        <br>
                                        &nbsp;<br>
                                        &nbsp;<br>
                                        &nbsp;</label>
                                </div>
                                <div class="col-sm-2 text-left offset-sm-1">
                                    <label></label>
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="fakturTunai_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    <span id="fakturTunai_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            {{-- <div class="row mt-4">
                                <div class="col-sm-2 text-left offset-sm-2">
                                    <label><b> XXXXXXXXXXXXXXXXXXXXXXXXXXXX</b></label>
                                </div>
                                <div class="col-sm-1 offset-sm-5 text-right">
                                    <span id="fakturTunai_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunai_Grand">-5.555.555,00</span>
                                </div>
                            </div> --}}

                            <div class="row" style="position: absolute; top: 26.2cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturTunai_SymbolDiscount">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunai_Discount">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 27cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturTunai_SymbolUM"></span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunai_UM"></span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 27.9cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-4 text-left offset-sm-2">
                                    <span>Nilai Lain</span>
                                </div>
                                <div class="col-sm-1 offset-sm-3 text-right">
                                    <span id="fakturTunai_SymbolDPP">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunai_DPP">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 28.7cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-3 text-left offset-sm-0">
                                    <span id="fakturTunai_PersenPPN"><b>11%</b></span>
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="fakturTunai_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunai_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 29.55cm; left: 0cm; right: 0cm; padding: 0% !important">
                                <div class="col-sm-9 text-left offset-sm-0">
                                    <span id="fakturTunai_Terbilang"
                                        style="font-family: 'Arial Narrow', Arial, sans-serif; font-size: 14px;">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-1 text-right" style="font-weight: bold">
                                    <span id="fakturTunai_SymbolTerbayar">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="font-weight: bold; white-space: nowrap; overflow: hidden;">
                                    <span id="fakturTunai_Terbayar">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 30.5cm; left: 1cm; right: 0cm !important; font-weight: bold">
                                <div class="col-sm-4 text-left">
                                    <span id="fakturTunai_SyaratBayar">Syarat Pembayaran: &emsp;&emsp;xxxx
                                        Hari</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-center">
                                    <span id="fakturTunai_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-right">
                                    <span id="fakturTunai_Thn">11</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 31.4cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="fakturTunai_Tempo">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 32.3cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="fakturTunai_SuratJalan">Surat Jalan: &emsp;&emsp;</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 33.6cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-8 text-left">
                                    <span id="fakturTunai_SJ"></span>
                                </div>
                                <div class="col-sm-3 text-right">
                                    <span id="ttdPimpinanTunai">RUDY SANTOSO</span>
                                </div>
                            </div>

                        </div>

                        <div class="nota1">

                            <div class="row" style="margin-top: 10%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="nota1_IdPenagihan">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXidpenagihanXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 offset-sm-3 text-left">
                                    <span
                                        id="nota1_NamaCust">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span id="nota1_Alamat">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%; text-decoration: underline">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="nota1_NamaTypeBarang">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="nota1_Detail"></div>

                            <div class="row mt-5">
                                <div class="col-sm-8 offset-sm-1 text-left">
                                    <span id="nota1_Terbilang">xxxx</span>
                                </div>
                                <div class="col-sm-1 text-right">
                                    <span id="nota1_SymbolTerbayar">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="nota1_Terbayar">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-4 text-left">
                                    <span>Syarat Pembayaran: &emsp;&emsp; CASH</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="nota1_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="nota1_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-left">
                                    <span>Jatuh Tempo: &emsp;&emsp; -</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-left">
                                    <span>Surat Jalan: &emsp;&emsp;
                                        0</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-10 text-right">
                                    <label>YUDI SANTOSO</label>
                                </div>
                            </div>

                        </div>


                        {{-- faktur pajak tunai --}}
                        <div class="fakturPajakTunai">

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-center">
                                    <span id="fakturPajakTunai_AreaPPNThnIdFakturPajak">XX . 000 - 07. XXXXXXXXX
                                    </span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 25%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajakTunai_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajakTunai_AlamatNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span id="fakturPajakTunai_NPWP">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="fakturPajakTunai_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturPajakTunai_Detail"></div>

                            <div class="row mt-4">
                                <div class="col-sm-2 offset-sm-10 text-right">
                                    <span id="fakturPajakTunai_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajakTunai_SymbolDiscount">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajakTunai_Discount">0.00</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span>-</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajakTunai_SymbolDPP">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajakTunai_DPP">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajakTunai_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajakTunai_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-2 text-center offset-sm-7">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajakTunai_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="fakturPajakTunai_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>YUDI SANTOSO</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>MARKETING MANAGER</label>
                                </div>
                            </div>
                        </div>


                        {{-- faktur uang muka --}}
                        <div class="fakturUangMuka">

                            <div class="row">
                                <div class="col-sm-12 text-right penagihan-up"
                                    style="position: absolute; top: 0.4cm; left: 0cm; right: 2cm;">
                                    <span id="fakturUangMuka_IdPenagihan">Id Penagihan</span>
                                </div>
                            </div>

                            <div class="row mt-5" style="margin-top: 0.1cm">
                                <div class="col-sm-8 text-right">
                                    {{-- <label><b>Nomor Seri Faktur Pajak</b></label> --}}
                                </div>
                                <div class="col-sm-4 text-right">
                                    {{-- <span id="fakturUangMuka_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX</span> --}}
                                </div>
                            </div>

                            <br>
                            <br>
                            <br>
                            <br>
                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span
                                        id="fakturUangMuka_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-10 offset-sm-2 text-left">
                                    <span id="fakturUangMuka_AlamatNPWP"
                                        style="font-size: 15px !important">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span
                                        id="fakturUangMuka_NPWP">XXXXXXXXXXXXXXNPWPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <br>
                            <br>
                            <div class="row mt-3">
                                <div class="col-sm-1 offset-sm-0 text-left description-left"
                                    style="font-size: 14px !important;">
                                    <span></span>
                                </div>
                                <div class="col-sm-5 offset-sm-0 text-left description-left"
                                    style="font-size: 14px !important;">
                                    <span
                                        id="fakturUangMuka_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturUangMuka_Detail"></div>

                            <div class="row mt-3" style="position: absolute; top: 21.7cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-10 text-left offset-sm-0">
                                    <label id="bankBayarUangMuka" style="font-weight: bold">&nbsp;
                                        <br>
                                        &nbsp;<br>
                                        &nbsp;<br>
                                        &nbsp;</label>
                                </div>
                                <div class="col-sm-2 text-left offset-sm-1">
                                    <label></label>
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="fakturUangMuka_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="white-space: nowrap; overflow: hidden;">
                                    <span id="fakturUangMuka_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            {{-- <div class="row mt-4">
                                <div class="col-sm-2 text-left offset-sm-2">
                                    <label><b> XXXXXXXXXXXXXXXXXXXXXXXXXXXX</b></label>
                                </div>
                                <div class="col-sm-1 offset-sm-5 text-right">
                                    <span id="fakturUangMuka_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturUangMuka_Grand">-5.555.555,00</span>
                                </div>
                            </div> --}}

                            <div class="row" style="position: absolute; top: 26.2cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturUangMuka_SymbolUM">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturUangMuka_Discount">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 27cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="tes"></span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturUangMuka_UM"></span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 27.9cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-4 text-left offset-sm-2">
                                    <span>Nilai Lain</span>
                                </div>
                                <div class="col-sm-1 offset-sm-3 text-right">
                                    <span id="fakturUangMuka_SymbolDPP">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturUangMuka_DPP">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 28.7cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-3 text-left offset-sm-0">
                                    <span id="fakturUangMuka_PersenPPN"><b>11%</b></span>
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="fakturUangMuka_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturUangMuka_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 29.55cm; left: 0cm; right: 0cm; padding: 0% !important">
                                <div class="col-sm-9 text-left offset-sm-0">
                                    <span id="fakturUangMuka_Terbilang"
                                        style="font-family: 'Arial Narrow', Arial, sans-serif; font-size: 14px;">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-1 text-right" style="font-weight: bold">
                                    <span id="fakturUangMuka_SymbolTerbayar">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="font-weight: bold; white-space: nowrap; overflow: hidden;">
                                    <span id="fakturUangMuka_Terbayar">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 30.5cm; left: 1cm; right: 0cm !important; font-weight: bold">
                                <div class="col-sm-4 text-left">
                                    <span id="fakturUangMuka_SyaratBayar">Syarat Pembayaran: &emsp;&emsp;xxxx
                                        Hari</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-center">
                                    <span id="fakturUangMuka_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-right">
                                    <span id="fakturUangMuka_Thn">11</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 31.4cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="fakturUangMuka_Tempo">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 32.3cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="fakturUangMuka_SuratJalan">Surat Jalan: &emsp;&emsp;</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 33.6cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-8 text-left">
                                    <span id="fakturUangMuka_SJ"></span>
                                </div>
                                <div class="col-sm-3 text-right">
                                    <span id="ttdPimpinanUangMuka">RUDY SANTOSO</span>
                                </div>
                            </div>

                        </div>


                        {{-- faktur uang tunai um --}}
                        <div class="fakturTunaiUM">

                            <div class="row">
                                <div class="col-sm-12 text-right penagihan-up"
                                    style="position: absolute; top: 0.4cm; left: 0cm; right: 2cm;">
                                    <span id="fakturTunaiUM_IdPenagihan">Id Penagihan</span>
                                </div>
                            </div>

                            <div class="row mt-5" style="margin-top: 0.1cm">
                                <div class="col-sm-8 text-right">
                                    {{-- <label><b>Nomor Seri Faktur Pajak</b></label> --}}
                                </div>
                                <div class="col-sm-4 text-right">
                                    {{-- <span id="fakturTunaiUM_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX</span> --}}
                                </div>
                            </div>

                            <br>
                            <br>
                            <br>
                            <br>
                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span
                                        id="fakturTunaiUM_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-10 offset-sm-2 text-left">
                                    <span id="fakturTunaiUM_AlamatNPWP"
                                        style="font-size: 15px !important">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-2 text-left">
                                    <span
                                        id="fakturTunaiUM_NPWP">XXXXXXXXXXXXXXNPWPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <br>
                            <br>
                            <div class="row mt-3">
                                <div class="col-sm-1 offset-sm-0 text-left description-left"
                                    style="font-size: 14px !important;">
                                    <span></span>
                                </div>
                                <div class="col-sm-5 offset-sm-0 text-left description-left"
                                    style="font-size: 14px !important;">
                                    <span
                                        id="fakturTunaiUM_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturTunaiUM_Detail"></div>

                            <div class="row mt-3" style="position: absolute; top: 21.7cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-10 text-left offset-sm-0">
                                    <label id="bankBayarUM" style="font-weight: bold">&nbsp;
                                        <br>
                                        &nbsp;<br>
                                        &nbsp;<br>
                                        &nbsp;</label>
                                </div>
                                <div class="col-sm-2 text-left offset-sm-1">
                                    <label></label>
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="fakturTunaiUM_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunaiUM_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            {{-- <div class="row mt-4">
                                <div class="col-sm-2 text-left offset-sm-2">
                                    <label><b> XXXXXXXXXXXXXXXXXXXXXXXXXXXX</b></label>
                                </div>
                                <div class="col-sm-1 offset-sm-5 text-right">
                                    <span id="fakturTunaiUM_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunaiUM_Grand">-5.555.555,00</span>
                                </div>
                            </div> --}}

                            <div class="row" style="position: absolute; top: 26.2cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturTunaiUM_SymbolDiscount">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunaiUM_Discount">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 27cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturTunaiUM_SymbolUM"></span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunaiUM_UM"></span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 27.9cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-4 text-left offset-sm-2">
                                    <span>Nilai Lain</span>
                                </div>
                                <div class="col-sm-1 offset-sm-3 text-right">
                                    <span id="fakturTunaiUM_SymbolDPP">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunaiUM_DPP">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="position: absolute; top: 28.7cm; left: 0cm; right: 0cm;">
                                <div class="col-sm-3 text-left offset-sm-0">
                                    <span id="fakturTunaiUM_PersenPPN"><b>11%</b></span>
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="fakturTunaiUM_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunaiUM_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 29.55cm; left: 0cm; right: 0cm; padding: 0% !important">
                                <div class="col-sm-9 text-left offset-sm-0">
                                    <span id="fakturTunaiUM_Terbilang"
                                        style="font-family: 'Arial Narrow', Arial, sans-serif; font-size: 14px;">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-1 text-right" style="font-weight: bold">
                                    <span id="fakturTunaiUM_SymbolTerbayar">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="font-weight: bold">
                                    <span id="fakturTunaiUM_Terbayar">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 30.5cm; left: 1cm; right: 0cm !important; font-weight: bold">
                                <div class="col-sm-4 text-left">
                                    <span id="fakturTunaiUM_SyaratBayar">Syarat Pembayaran: &emsp;&emsp;xxxx
                                        Hari</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-center">
                                    <span id="fakturTunaiUM_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-right">
                                    <span id="fakturTunaiUM_Thn">11</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 31.4cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="fakturTunaiUM_Tempo">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 32.3cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="fakturTunaiUM_SuratJalan">Surat Jalan: &emsp;&emsp;</span>
                                </div>
                            </div>

                            <div class="row"
                                style="position: absolute; top: 33.6cm; left: 1cm; right: 1cm; font-weight: bold">
                                <div class="col-sm-8 text-left">
                                    <span id="fakturTunaiUM_SJ"></span>
                                </div>
                                <div class="col-sm-3 text-right">
                                    <span id="ttdPimpinanUM">RUDY SANTOSO</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Accounting/Informasi/CetakNotadanFaktur.js') }}"></script>
@endsection
