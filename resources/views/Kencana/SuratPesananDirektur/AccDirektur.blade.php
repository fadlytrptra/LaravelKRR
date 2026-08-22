@extends('layouts.appKencana')
@section('content')
@section('title', 'ACC Direktur Kencana')
@include('Kencana/SuratPesananDirektur/modalDetailSP')

<style>
    #sppb_tableOrderPembelian tr {
        cursor: pointer;
    }

    .modal-preview-sp {
        max-width: 96vw !important;
        width: 80vw !important;
        margin: 1.5vh auto;
    }

    .modal-preview-sp .modal-content {
        height: 90vh;
    }

    .modal-preview-sp .modal-body {
        overflow-y: auto;
        padding: 24px;
    }

    .ttd_table,
    .ttd_table tr,
    .ttd_table td {
        border: none !important;
    }

</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Surat Pesanan Belum ACC Direktur</div>
                <div class="card-body">
                    <div style="display: flex; flex-direction: row;margin: 0 0 1rem 0; gap: 5px">
                        <div style="display: flex; flex-direction: column;">
                            <label for="jenisSP">Jenis SP</label>
                            <input type="text" name="jenisSP" id="jenisSP" class="form-control" readonly>
                            <input type="hidden" name="id_jenisSP" id="id_jenisSP" class="form-control">
                        </div>
                        <div style="align-content: end">
                            <button class="btn btn-info" id="button_browseJenisSP">...</button>
                        </div>
                    </div>
                    <table id="table_suratPesanan" class="table table-bordered table-striped" style="width:100%">
                        <thead class="thead-light">
                            <tr>
                                <th style="width:30px;text-align:center;white-space: nowrap;">
                                    <input type="checkbox" id="checkAllSuratPesanan"> Check All
                                </th>
                                <th>Nomor SP</th>
                                <th>Tanggal SP</th>
                                <th>Nama Customer</th>
                                <th>Nomor PO</th>
                                <th>Nomor PI</th>
                                <th>Nama Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    @php
                        $canApprove = in_array(trim($user), ['adam', 'rudy', '4496']);
                    @endphp
                    <button class="btn btn-sm btn-success"
                        @unless ($canApprove) style="display:none" @endunless
                        id="button_submitSelected"><span>&#x2713;</span>
                        Setujui Surat Pesanan yang Dipilih</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalPreviewSP" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-preview-sp">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Preview Surat Pesanan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
                <div id="previewSP">

                    <!-- HEADER ATAS -->
                    <div style="display:flex;justify-content:space-between;">
                        <div style="text-align: center;">
                            <h4 style="margin:0">PT. KENCANA RAJASA RAYA</h4>
                            <div><b>WARU - SIDOARJO</b></div>
                            <hr style="border: 0; border-top: 2px solid #000; margin: 4px 0;">
                            <h4 style="margin:0">S U R A T &nbsp; P E S A N A N</h4>
                            <div id="preview_no_sp" style="font-weight:bold;font-size:18px;"></div>
                            <div>PO NO : <span id="preview_no_po"></span></div>
                            <div>Tanggal PO : <span id="preview_tgl_po"></span></div>
                        </div>
                        <div>
                            <div style="margin-top: 3px">Tanggal Pesanan : <span id="preview_tgl_sp"></span></div>
                            <div style="margin-top: 3px">Nama Langganan : <span id="preview_customer"></span></div>
                            <div style="margin-top: 3px">Alamat Langganan : <span id="preview_alamat"></span></div>
                            <div style="margin-top: 3px">Alamat Kirim : <span id="preview_alamat_kirim"></span></div>
                        </div>
                    </div>

                    <!-- TABLE BARANG -->
                    <table class="table table-bordered mt-3" id="preview_table_sp">
                        <thead class="text-center">
                            <tr>
                                <th width="5%">NO.</th>
                                <th>TYPE BARANG</th>
                                <th width="15%">KD. BARANG</th>
                                <th width="15%">QUANTITY</th>
                                <th width="20%">HARGA SATUAN</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                    <!-- FOOTER INFO -->
                    <div style="margin-top:10px">
                        Jenis Bayar : <b id="preview_jenis_bayar"></b>
                        &nbsp;&nbsp;
                        Syarat Bayar : <b id="preview_syarat_bayar"></b>
                        &nbsp;&nbsp;
                        PPN : <b id="preview_ppn"></b>
                    </div>

                    <div style="margin-top:5px">
                        Rencana Kirim : <span id="preview_rencana_kirim"></span>
                        &nbsp;&nbsp;
                        Keterangan : <span id="preview_keterangan"></span>
                    </div>

                    <!-- TANDA TANGAN -->
                    <table class="ttd_table" style="width:100%; margin-top:40px; text-align:center;">
                        <tr>
                            <td>WIRANIAGA LOKAL</td>
                            <td>MANAGER</td>
                            <td>DIREKTUR</td>
                            <td>PPIC</td>
                            <td style="text-align: left; padding-left: 20px">Lembar Ke:</td>
                        </tr>
                        <tr style="height:80px">
                            <td></td><td></td><td></td><td></td>
                            <td style="text-align: left; padding-left: 20px">
                                1. Putih - Produksi<br>
                                2. Merah - QC<br>
                                3. Kuning - Adm. Piutang<br>
                                4. Hijau - Arsip Pemasaran
                            </td>
                        </tr>
                        <tr>
                            <td><b id="preview_sales"></b></td>
                            <td><b id="preview_manager"></b></td>
                            <td><b id="preview_direktur"></b></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>



<script src="{{ asset('js/Kencana/ACCDirektur.js') }}"></script>

@endsection
