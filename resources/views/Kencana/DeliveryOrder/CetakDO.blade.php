@extends('layouts.appKencana') @section('content')
@section('title', 'Cetak DO')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/Kencana/cetakDO.css') }}" rel="stylesheet">
    <link href="{{ asset('css/Kencana/cetak-dopdf.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="acs-div-form">
                    <div style="display: none"> <input type="radio" name="group_cetak" id="cetak_belumACC"> Cetak Belum
                        ACC (Lokal) <input type="radio" name="group_cetak" id="cetak_sudahACC"> Cetak Sudah ACC (Lokal)
                    </div>
                    <div class="acs-div-filter"> <label for="tanggal_do">Tanggal:</label> <input type="date"
                            name="tanggal_do" id="tanggal_do" class="input"> </div>
                    <div class="acs-div-filter1"> <label for="no_do">Hari:</label> <input type="text"
                            name="nomor_referensi" id="nomor_referensi" class="input"> </div> <button id="print_button"
                        class="btn btn-info" style="font-color: white"><span>&#128462;</span> View Print</button>
                        <button
                            id="export_pdf" class="btn btn-primary"><span>&#11123;</span> Export PDF
                        </button>
                    <button id="print_pdf" class="btn btn-success"><span>&#128438;</span> Print Surat Pesanan</button>
                    <hr> <label for="contoh_print" id="contoh_print">Contoh print:</label>
                </div>
                <div class="acs-div-container" id="contoh_printDiv">
                    <div class="cetak-dopdf-container">
                        <div class="cetak-dopdf-container02 header">
                            <div
                                style="display:flex; flex-direction: row;gap:5px; width: 100%;border: 1px solid black !important;font-size: 18px;">
                                <div style="text-align: center; padding:5px;width: 50%">
                                    <h2 style="margin-bottom: 0px"> <span>PT. KENCANA RAJASA RAYA</span> </h2>
                                </div>
                                <div style="display: flex; flex-direction: row; gap:5px;width: 50%;">
                                    <div style="display: flex;flex-direction: column">
                                        <div>Hari</div>
                                        <div>DiBuat Oleh</div>
                                        <div>Tanggal Kirim</div>
                                    </div>
                                    <div style="display: flex;flex-direction: column">
                                        <div>:</div>
                                        <div>:</div>
                                        <div>:</div>
                                    </div>
                                    <div style="display: flex;flex-direction: column">
                                        <div id="nomor_referensiKolom"></div>
                                        <div id="dibuat_olehKolom" style="white-space: nowrap;">Marketing</div>
                                        <div id="tanggal_kirimKolom"></div>
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex;flex-direction: column; width:100%; gap:12px">
                                <span class="hollow-font">SURAT PERINTAH PENGIRIMAN DIVISI PEMASARAN LOKAL / EKSPORT</span>
                            </div>
                        </div>
                        <table style="width: 100%">
                            <thead>
                                <tr>
                                    <td>
                                        <div class="page-header-space"></div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div id="div_cetakDOSudahACC"></div>
                                        <div id="div_cetakDOBelumACC"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Kencana/CetakDO.js') }}"></script>
@endsection
