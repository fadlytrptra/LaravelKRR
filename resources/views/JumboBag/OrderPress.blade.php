@extends('layouts.appJumboBag')
@section('title', 'Order Press')

<link href="{{ asset('css/printPress.css') }}" rel="stylesheet" />

@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <script>
                let successMessage = '';
                let errorMessage = '';
            </script>
            @if (Session::has('success'))
                <script>
                    successMessage = "{{ Session::get('success') }}";
                </script>
            @elseif (Session::has('error'))
                <script>
                    errorMessage = "{{ Session::get('error') }}";
                </script>
            @endif
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Order Press</div>
                    <div class="card-body">
                        <form id="ReturPenggantiForm" action="{{ route('OrderJahit.store') }}" method="POST">
                            @csrf
                            <div class="row">
                                <!-- Kolom Kiri -->
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="customer">Customer</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="id_customer" name="id_customer"
                                                required>
                                            <input type="text" class="form-control" style="width: 75%" id="customer"
                                                name="customer" required>
                                            <button class="btn" type="button" id="button-customer">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="kodeBarang">Kode Barang</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="tanggal" name="tanggal"
                                                required>
                                            <input type="text" class="form-control" style="width: 75%"
                                                id="kodeBarangAsal" name="kodeBarangAsal" required>
                                            <button class="btn" type="button" id="button-kode-barang">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label style="width: 88%" for="no_suratpesanan">No Surat Pesanan</label>
                                        <label for="delivery">Delivery</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" style="width: 75%"
                                                id="no_suratpesanan" name="no_suratpesanan" required>
                                            <input type="text" class="form-control" id="delivery" name="delivery"
                                                required>
                                            <button class="btn" type="button" id="button-pesanan">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="jumlah_order">Jumlah Order</label>
                                        <input type="text" class="form-control" id="jumlah_order" name="jumlah_order"
                                            required>
                                    </div>
                                    <br>
                                    <div class="form-group">
                                        <label for="ukuran">Ukuran</label>
                                        <input type="text" class="form-control" id="ukuran" name="ukuran" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="rajutan">Rajutan</label>
                                        <input type="text" class="form-control" id="rajutan" name="rajutan" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="denier">Denier</label>
                                        <input type="text" class="form-control" id="denier" name="denier" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="type">Type</label>
                                        <input type="text" class="form-control" id="type" name="type" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="type">Kode Barang</label>
                                        <input type="text" class="form-control" id="id_barang" name="id_barang" required>
                                    </div>
                                </div>
                                <!-- Kolom Kanan -->
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="warna">Warna</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="warna" name="warna"
                                                required>
                                            <button class="btn" type="button" id="button-warna">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="packing">Packing</label>
                                        <input type="text" class="form-control" id="packing" name="packing"
                                            required>
                                    </div>
                                    <div class="form-group">
                                        <label for="no_referensi">No Referensi</label>
                                        <input type="text" class="form-control" id="no_referensi" name="no_referensi"
                                            required>
                                    </div>
                                    <div class="form-group">
                                        <label for="halaman">Catatan</label>
                                        <textarea class="form-control" name="halaman" id="halaman" cols="20" rows="5"></textarea>
                                        {{-- <input type="text" class="form-control" id="halaman" name="halaman"
                                            required> --}}
                                        {{-- <textarea name="" id="halaman" cols="30" rows="10">Catatan</textarea> --}}
                                        <input type="text" class="form-control" id="iner" name="iner"
                                            required style="display: none">
                                    </div>
                                    <div class="form-group">
                                        <label for="imageUpload">Upload Foto</label>
                                        <input type="file" class="form-control-file" id="imageUpload" name="image"
                                            accept="image/*">
                                    </div>
                                    <div class="form-group" id="imagePreviewContainer" style="display: none;">
                                        <label>Preview Foto</label>
                                        <div id="imagePreview"
                                            style="padding:10px; width:200px; height:200px; border:1px solid #ddd; display:flex; justify-content:center; align-items:center;">
                                            <img id="previewImg" src="#" alt="Preview Image"
                                                style="max-width:100%; max-height:100%; width:auto; height:auto; display:none;">
                                        </div>
                                        <br>
                                        <button type="button" class="btn btn-secondary" id="clearImage"
                                            style="width:100px">
                                            Clear
                                        </button>
                                    </div>
                                    <button id="btn_print" class="btn btn-success" style="width:100px">Print</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <br>
            </div>
        </div>
    </div>
    <div class="acs-div-container" id="contoh_printDiv">
        <div class="page">
            <div class="cetak-prspdf-container">
                <div class="cetak-prspdf-container01">
                    <div class="cetak-prspdf-container02">
                        <div class="cetak-prspdf-container03">
                            <div class="cetak-prspdf-container04">
                                <h2 style="margin-bottom: 0px;font-size:35px">
                                    <span>PT. KERTA RAJASA RAYA</span>
                                </h2>
                                <p style="margin-bottom: 0px;font-size:28px">
                                    <span>Woven Bag - Jumbo Bag Industrial</span>
                                    <br />
                                </p>
                                <p style="margin-bottom: 0px;font-size:25px">
                                    <span>No. Dokumen : FM-7.5-02-JB-03-05</span>
                                    <br />
                                </p>
                            </div>
                        </div>
                        <br>
                        <div class="cetak-prspdf-container06">
                            <div class="cetak-prspdf-container07">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td style="margin-bottom: 0px;font-size:22px">No Referensi
                                            </td>
                                            <td style="margin-bottom: 0px;font-size:22px">:</td>
                                            <td style="margin-bottom: 0px;font-size:22px" id="no_referensi_print"></td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td style="margin-bottom: 0px;font-size:22px">Tanggal</td>
                                            <td style="margin-bottom: 0px;font-size:22px">:</td>
                                            <td style="margin-bottom: 0px;font-size:22px" id="tanggal_print"></td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td style="margin-bottom: 0px;font-size:22px">Kode Barang</td>
                                            <td style="margin-bottom: 0px;font-size:22px">:</td>
                                            <td style="margin-bottom: 0px;font-size:22px" id="halaman_print"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="centered-text-container">
                        <h1 style="margin-bottom: 0px;font-size:23px;">
                            <span>ORDER PRESS JUMBO BAG</span>
                        </h1>
                    </div>
                    <br>
                    <div class="cetak-prspdf-container08">
                        <table style="width: 100%;border-collapse: collapse; border: 1px solid black;" id="table_ket">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="border:none !important;" id="nomor_barangKolom">&nbsp;KODE</td>
                                    <td style="border:none !important;">:&nbsp;</td>
                                    <td style="border:none !important; width: 45%" id="kode_tabel">&nbsp;-&nbsp;</td>
                                    <td style="border:none !important;" id="nomor_barangKolom">&nbsp;TYPE</td>
                                    <td style="border:none !important;">:&nbsp;</td>
                                    <td style="border:none !important; width: 50%" id="type_tabel">&nbsp;-&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="border:none !important;" id="nomor_barangKolom">&nbsp;UKURAN</td>
                                    <td style="border:none !important;">:&nbsp;</td>
                                    <td style="border:none !important; width: 45%" id="ukuran_tabel">&nbsp;-&nbsp;</td>
                                    <td style="border:none !important;" id="nomor_barangKolom">&nbsp;NO. SP</td>
                                    <td style="border:none !important;">:&nbsp;</td>
                                    <td style="border:none !important; width: 40%" id="nosp_tabel">&nbsp;-&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="border:none !important;" id="nomor_barangKolom">&nbsp;RAJUTAN</td>
                                    <td style="border:none !important;">:&nbsp;</td>
                                    <td style="border:none !important; width: 45%" id="rajutan_tabel">&nbsp;-&nbsp;</td>
                                    <td style="border:none !important;" id="nomor_barangKolom">&nbsp;QUANTITY</td>
                                    <td style="border:none !important;">:&nbsp;</td>
                                    <td style="border:none !important; width: 40%" id="qty_tabel">&nbsp;-&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="border:none !important;" id="nomor_barangKolom">&nbsp;DENIER</td>
                                    <td style="border:none !important;">:&nbsp;</td>
                                    <td style="border:none !important; width: 45%" id="denier_tabel">&nbsp;-&nbsp;</td>
                                    <td style="border:none !important;" id="nomor_barangKolom">&nbsp;DELIVERY</td>
                                    <td style="border:none !important;">:&nbsp;</td>
                                    <td style="border:none !important; width: 40%" id="delivery_tabel">&nbsp;-&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="border:none !important;" id="nomor_barangKolom">&nbsp;WARNA</td>
                                    <td style="border:none !important;">:&nbsp;</td>
                                    <td style="border:none !important; width: 45%" id="warna_tabel">&nbsp;-&nbsp;</td>
                                    <td style="border:none !important;" id="nomor_barangKolom">&nbsp;PACKING</td>
                                    <td style="border:none !important;">:&nbsp;</td>
                                    <td style="border:none !important; width: 40%" id="packing_tabel">&nbsp;-&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="border:none !important;" id="nomor_barangKolom">&nbsp;INNER</td>
                                    <td style="border:none !important;">:&nbsp;</td>
                                    <td style="border:none !important; width: 45%" id="inner_tabel">&nbsp;-&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="cetak-prspdf-container08">
                        <table style="width: 100%">
                            <tr>
                                <td
                                    style="width: 130px;text-align: center !important; border:none !important; border-top: 1px solid black !important; border-left: 1px solid black !important;border-right: 1px solid black !important">
                                    TANGGAL</td>
                                <td colspan="2"
                                    style="border:none !important; border-top: 1px solid black !important; text-align: center; border-right: 1px solid black !important">
                                    SHIFT : A
                                </td>
                                <td colspan="2"
                                    style="border:none !important; border-top: 1px solid black !important; text-align: center; border-right: 1px solid black !important">
                                    SHIFT : B
                                </td>
                                <td colspan="2"
                                    style="text-align: center !important; border:none !important; border-top: 1px solid black !important;">
                                    SHIFT : C</td>
                                <td
                                    style="text-align: center !important; border:none !important; border-top: 1px solid black !important; border-left: 1px solid black !important">
                                    SUB TOTAL</td>
                                <td
                                    style="text-align: center !important; border:none !important; border-top: 1px solid black !important; border-left: 1px solid black !important;border-right: 1px solid black !important">
                                    GRAND TOTAL</td>
                            </tr>
                            <tr>
                                <td
                                    style="border:none !important; border-right: 1px solid black !important; border-left: 1px solid black !important;border-bottom: 1px solid black !important">
                                </td>
                                <td
                                    style="border-right:none !important; border-top:none !important; text-align: center !important; width: 100px">
                                    &nbsp;</td>
                                <td
                                    style="border-left:none !important; border-top:none !important; text-align: center !important; width: 100px">
                                </td>
                                <td
                                    style="border-right:none !important; border-top:none !important; text-align: center !important; width: 100px">
                                </td>
                                <td
                                    style="border-left:none !important; border-top:none !important; text-align: center !important; width: 100px">
                                </td>
                                <td
                                    style="border-right:none !important; border-top:none !important; text-align: center !important; width: 100px">
                                </td>
                                <td
                                    style="border-left:none !important; border-right:none !important; border-top:none !important; text-align: center !important; width: 100px">
                                </td>
                                <td
                                    style="text-align: center !important; border:none !important; border-left: 1px solid black !important;border-bottom: 1px solid black !important">
                                    ( Per Bal )
                                </td>
                                <td
                                    style="border:none !important; border-right: 1px solid black !important; border-left: 1px solid black !important;border-bottom: 1px solid black !important">
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_bb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_bb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_bb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_bb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="denier_bb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="qty_bb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="berat_bb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="harga_bb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_ta"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_ta"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_ta"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_ta"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="denier_ta"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="qty_ta"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="berat_ta"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="harga_ta"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_tb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_tb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_tb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_tb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="denier_tb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="qty_tb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="berat_tb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="harga_tb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                            </tr>
                            <tr>
                                <td id="ca_x"
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_ca"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_ca"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_ca"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_ca"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="denier_ca"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="qty_ca"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="berat_ca"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="harga_ca"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                            </tr>
                            <tr>
                                <td id="cb_x"
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_cb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_cb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_cb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_cb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="denier_cb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="qty_cb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="berat_cb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="harga_cb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                            </tr>
                            <tr>
                                <td id="lb_x"
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_lb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_lb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_lb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_lb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="denier_lb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="qty_lb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="berat_lb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="harga_lb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_dr"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_dr"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_dr"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_dr"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="denier_dr"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="qty_dr"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="berat_dr"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="harga_dr"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_rt"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_rt"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_rt"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_rt"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="denier_rt"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="qty_rt"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="berat_rt"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="harga_rt"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_st"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_st"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_st"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_st"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="gambar_jb"
                                    style="text-align:center !important;
                                    border-top:none !important;
                                    border-left:none !important;
                                    width:100px;
                                    height:510px;
                                    overflow:hidden;"
                                    colspan="4" rowspan="12">

                                    <img id="gambar_print" src="#" alt="Preview Image"
                                        style="max-width:100%;
                                            max-height:100%;
                                            width:auto;
                                            height:auto;
                                            object-fit:contain;
                                            display:block;
                                            margin:auto;">
                                </td>
                                {{-- <td id="qty_st"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_st"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_st"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td> --}}
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_pp"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_pp"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_pp"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_pp"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                {{-- <td id="denier_pp"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="qty_pp"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_pp"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_pp"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td> --}}
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_cvb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_cvb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_cvb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_cvb"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                {{-- <td id="denier_cvb"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="qty_cvb"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_cvb"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_cvb"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td> --}}
                            </tr>
                            <tr>
                                <td id="lami_x"
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_lami"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_lami"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_lami"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_lami"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                {{-- <td id="denier_lami"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="qty_lami"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_lami"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_lami"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td> --}}
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_lami2"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_lami2"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_lami2"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_lami2"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                {{-- <td id="denier_lami2"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="qty_lami2"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_lami2"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_lami2"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td> --}}
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_bj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_bj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_bj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_bj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                {{-- <td id="denier_bj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="qty_bj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_bj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_bj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td> --}}
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                {{-- <td id="denier_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="qty_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td> --}}
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                {{-- <td id="denier_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="qty_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td> --}}
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                {{-- <td id="denier_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="qty_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td> --}}
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                {{-- <td id="denier_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="qty_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td> --}}
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                {{-- <td id="denier_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="qty_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td> --}}
                            </tr>
                            <tr>
                                <td
                                    style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;<br>&nbsp;</td>
                                <td id="potonganP_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="potonganL_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="warp_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="weft_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                {{-- <td id="denier_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="qty_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td> --}}
                            </tr>
                            {{-- <tr>
                            <td
                                style="text-align: center !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                &nbsp;TOTAL</td>
                            <td colspan="6" id="potonganP_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_total"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="hargakg_total"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_total"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                        </tr> --}}
                        </table>
                    </div>
                    <br>
                    <div class="cetak-prspdf-container08">
                        <table style="width: 100%">
                            <tr>
                                <td style="text-align: left !important; border:none !important;">
                                    &nbsp;Std Waktu :</td>
                                <td id="stdW_tabel"
                                    style="width: 875px;text-align: left !important; border:none !important;">
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: left !important; border:none !important;">
                                    &nbsp;CATATAN :</td>
                                <td id="catatan_tabel"
                                    style="width: 875px;text-align: left !important; border:none !important;">
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="cetak-prspdf-container08">
                        <table style="width: 100%">
                            <tr>
                                <td style="text-align: center !important; border:none !important;">
                                    Manajer Jumbo Bag</td>
                                <td id="catatan_tabel" style="text-align: center !important; border:none !important;">
                                    PPP Jumbo Bag
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center !important; border:none !important;">
                                    <br>
                                    <br>
                                    (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                                </td>
                                <td id="catatan_tabel" style="text-align: center !important; border:none !important;">
                                    <br>
                                    <br>
                                    (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                                </td>
                            </tr>
                        </table>
                    </div>
                    <br>
                    {{-- <div class="cetak-prspdf-container08">
                    <table style="width: 100%">
                        <tr>
                            <td
                                style="width: 25%; text-align: center !important; border-top: 1px solid black; border-bottom:none !important">
                                ACC TABEL HITUNGAN</td>
                            <td id="acc_th"
                                style="text-align: center !important; border-top: 1px solid black; border-bottom:none !important">
                                &nbsp;</td>
                            <td
                                style="width: 25%; text-align: center !important; border-top: 1px solid black; border-bottom:none !important">
                                GAMBAR</td>
                            <td id="id_th"
                                style="text-align: center !important; border-top: 1px solid black; border-bottom:none !important">
                                &nbsp;</td>
                        </tr>
                        <tr>
                            <td style="width: 25%; text-align: center !important; border-left: 1px solid black">
                                &nbsp;</td>
                            <td style="text-align: center !important;">
                                &nbsp;</td>
                            <td style="width: 25%; text-align: center !important;">
                                &nbsp;</td>
                            <td style="text-align: center !important; border-right: 1px solid black">
                                &nbsp;</td>
                        </tr>
                    </table>
                </div> --}}
                </div>
            </div>
        </div>
        <div class="page">
            <div style="border: 1px solid black !important;">
                <div class="cetak-prspdf-container">
                    <div class="cetak-prspdf-container01">
                        <div class="cetak-prspdf-container02">
                            <div class="cetak-prspdf-container03">
                                <div class="cetak-prspdf-container04">
                                    <h2 style="margin-bottom: 0px;font-size:35px">
                                        <span>PT. KERTA RAJASA RAYA</span>
                                    </h2>
                                    <p style="margin-bottom: 0px;font-size:28px">
                                        <span>Woven Bag - Jumbo Bag Industrial</span>
                                        <br />
                                    </p>
                                    <p style="margin-bottom: 0px;font-size:25px">
                                        <span>No. Dokumen : FM-7.5-02-JB-03-05</span>
                                        <br />
                                    </p>
                                </div>
                            </div>
                            <br>
                            <div class="cetak-prspdf-container06">
                                <div class="cetak-prspdf-container07">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td style="margin-bottom: 0px;font-size:22px">No Referensi
                                                </td>
                                                <td style="margin-bottom: 0px;font-size:22px">:</td>
                                                <td style="margin-bottom: 0px;font-size:22px" id="no_referensi2_print">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td style="margin-bottom: 0px;font-size:22px">Tanggal</td>
                                                <td style="margin-bottom: 0px;font-size:22px">:</td>
                                                <td style="margin-bottom: 0px;font-size:22px" id="tanggal2_print"></td>
                                            </tr>
                                            <tr>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td style="margin-bottom: 0px;font-size:22px">Kode Barang</td>
                                                <td style="margin-bottom: 0px;font-size:22px">:</td>
                                                <td style="margin-bottom: 0px;font-size:22px" id="halaman2_print"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="centered-text-container">
                            <h1 style="margin-bottom: 0px;font-size:23px;">
                                <span>ORDER PRESS JUMBO BAG - HALAMAN 2</span>
                            </h1>
                        </div>
                        {{-- <br>
                        <div class="cetak-prspdf-container08">
                            <table style="width: 100%;border-collapse: collapse; border: 1px solid black;" id="table_ket">
                                <thead>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="border:none !important;" id="nomor_barangKolom">&nbsp;KODE</td>
                                        <td style="border:none !important;">:&nbsp;</td>
                                        <td style="border:none !important; width: 30%" id="kode_tabel">&nbsp;-&nbsp;</td>
                                        <td style="border:none !important;" id="nomor_barangKolom">&nbsp;TYPE</td>
                                        <td style="border:none !important;">:&nbsp;</td>
                                        <td style="border:none !important; width: 50%" id="type_tabel">&nbsp;-&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="border:none !important;" id="nomor_barangKolom">&nbsp;UKURAN</td>
                                        <td style="border:none !important;">:&nbsp;</td>
                                        <td style="border:none !important; width: 25%" id="ukuran_tabel">&nbsp;-&nbsp;
                                        </td>
                                        <td style="border:none !important;" id="nomor_barangKolom">&nbsp;NO. SP</td>
                                        <td style="border:none !important;">:&nbsp;</td>
                                        <td style="border:none !important; width: 40%" id="nosp_tabel">&nbsp;-&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="border:none !important;" id="nomor_barangKolom">&nbsp;RAJUTAN</td>
                                        <td style="border:none !important;">:&nbsp;</td>
                                        <td style="border:none !important; width: 25%" id="rajutan_tabel">&nbsp;-&nbsp;
                                        </td>
                                        <td style="border:none !important;" id="nomor_barangKolom">&nbsp;QUANTITY</td>
                                        <td style="border:none !important;">:&nbsp;</td>
                                        <td style="border:none !important; width: 40%" id="qty_tabel">&nbsp;-&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="border:none !important;" id="nomor_barangKolom">&nbsp;DENIER</td>
                                        <td style="border:none !important;">:&nbsp;</td>
                                        <td style="border:none !important; width: 25%" id="denier_tabel">&nbsp;-&nbsp;
                                        </td>
                                        <td style="border:none !important;" id="nomor_barangKolom">&nbsp;DELIVERY</td>
                                        <td style="border:none !important;">:&nbsp;</td>
                                        <td style="border:none !important; width: 40%" id="delivery_tabel">&nbsp;-&nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:none !important;" id="nomor_barangKolom">&nbsp;WARNA</td>
                                        <td style="border:none !important;">:&nbsp;</td>
                                        <td style="border:none !important; width: 25%" id="warna_tabel">&nbsp;-&nbsp;</td>
                                        <td style="border:none !important;" id="nomor_barangKolom">&nbsp;PACKING</td>
                                        <td style="border:none !important;">:&nbsp;</td>
                                        <td style="border:none !important; width: 40%" id="packing_tabel">&nbsp;-&nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:none !important;" id="nomor_barangKolom">&nbsp;INNER</td>
                                        <td style="border:none !important;">:&nbsp;</td>
                                        <td style="border:none !important; width: 25%" id="inner_tabel">&nbsp;-&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> --}}
                        <br>
                        <div class="cetak-prspdf-container08">
                            <table style="width: 100%">
                                <tr>
                                    <td
                                        style="width: 130px;text-align: center !important; border:none !important; border-top: 1px solid black !important; border-left: 1px solid black !important;border-right: 1px solid black !important">
                                        TANGGAL</td>
                                    <td colspan="2"
                                        style="border:none !important; border-top: 1px solid black !important; text-align: center; border-right: 1px solid black !important">
                                        SHIFT : A
                                    </td>
                                    <td colspan="2"
                                        style="border:none !important; border-top: 1px solid black !important; text-align: center; border-right: 1px solid black !important">
                                        SHIFT : B
                                    </td>
                                    <td colspan="2"
                                        style="text-align: center !important; border:none !important; border-top: 1px solid black !important;">
                                        SHIFT : C</td>
                                    <td
                                        style="text-align: center !important; border:none !important; border-top: 1px solid black !important; border-left: 1px solid black !important">
                                        SUB TOTAL</td>
                                    <td
                                        style="text-align: center !important; border:none !important; border-top: 1px solid black !important; border-left: 1px solid black !important;border-right: 1px solid black !important">
                                        GRAND TOTAL</td>
                                </tr>
                                <tr>
                                    <td
                                        style="border:none !important; border-right: 1px solid black !important; border-left: 1px solid black !important;border-bottom: 1px solid black !important">
                                    </td>
                                    <td
                                        style="border-right:none !important; border-top:none !important; text-align: center !important; width: 100px">
                                        &nbsp;</td>
                                    <td
                                        style="border-left:none !important; border-top:none !important; text-align: center !important; width: 100px">
                                    </td>
                                    <td
                                        style="border-right:none !important; border-top:none !important; text-align: center !important; width: 100px">
                                    </td>
                                    <td
                                        style="border-left:none !important; border-top:none !important; text-align: center !important; width: 100px">
                                    </td>
                                    <td
                                        style="border-right:none !important; border-top:none !important; text-align: center !important; width: 100px">
                                    </td>
                                    <td
                                        style="border-left:none !important; border-right:none !important; border-top:none !important; text-align: center !important; width: 100px">
                                    </td>
                                    <td
                                        style="text-align: center !important; border:none !important; border-left: 1px solid black !important;border-bottom: 1px solid black !important">
                                        ( Per Bal )
                                    </td>
                                    <td
                                        style="border:none !important; border-right: 1px solid black !important; border-left: 1px solid black !important;border-bottom: 1px solid black !important">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_bb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_bb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_bb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_bb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_bb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_bb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_bb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_bb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_ta"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_ta"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_ta"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_ta"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_ta"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_ta"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_ta"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_ta"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_tb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_tb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_tb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_tb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_tb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_tb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_tb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_tb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td id="ca_x"
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_ca"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_ca"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_ca"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_ca"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_ca"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_ca"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_ca"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_ca"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td id="cb_x"
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_cb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_cb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_cb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_cb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_cb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_cb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_cb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_cb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td id="lb_x"
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_lb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_lb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_lb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_lb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_lb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_lb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_lb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_lb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_dr"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_dr"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_dr"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_dr"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_dr"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_dr"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_dr"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_dr"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_rt"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_rt"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_rt"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_rt"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_rt"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_rt"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_rt"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_rt"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_st"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_st"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_st"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_st"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="gambar_jb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_st"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_st"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_st"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_pp"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_pp"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_pp"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_pp"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_pp"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_pp"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_pp"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_pp"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_cvb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_cvb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_cvb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_cvb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_cvb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_cvb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_cvb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_cvb"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td id="lami_x"
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_lami"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_lami"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_lami"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_lami"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_lami"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_lami"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_lami"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_lami"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_lami2"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_lami2"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_lami2"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_lami2"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_lami2"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_lami2"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_lami2"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_lami2"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_bj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_bj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_bj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_bj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_bj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_bj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_bj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_bj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="text-align: left !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                        &nbsp;<br>&nbsp;</td>
                                    <td id="potonganP_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="potonganL_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="warp_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="weft_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="denier_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="qty_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="berat_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                    <td id="harga_oj"
                                        style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                    </td>
                                </tr>
                                {{-- <tr>
                            <td
                                style="text-align: center !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                &nbsp;TOTAL</td>
                            <td colspan="6" id="potonganP_oj"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="berat_total"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="hargakg_total"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                            <td id="harga_total"
                                style="text-align: center !important; border-top:none !important; border-left:none !important;">
                            </td>
                        </tr> --}}
                            </table>
                        </div>
                        <br>
                        {{-- <div class="cetak-prspdf-container08">
                            <table style="width: 100%">
                                <tr>
                                    <td style="text-align: left !important; border:none !important;">
                                        &nbsp;Std Waktu :</td>
                                    <td id="stdW_tabel"
                                        style="width: 875px;text-align: left !important; border:none !important;">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: left !important; border:none !important;">
                                        &nbsp;CATATAN :</td>
                                    <td id="catatan_tabel"
                                        style="width: 875px;text-align: left !important; border:none !important;">
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="cetak-prspdf-container08">
                            <table style="width: 100%">
                                <tr>
                                    <td style="text-align: center !important; border:none !important;">
                                        Manajer Jumbo Bag</td>
                                    <td id="catatan_tabel" style="text-align: center !important; border:none !important;">
                                        PPP Jumbo Bag
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center !important; border:none !important;">
                                        <br>
                                        <br>
                                        (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                                    </td>
                                    <td id="catatan_tabel" style="text-align: center !important; border:none !important;">
                                        <br>
                                        <br>
                                        (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <br> --}}
                        {{-- <div class="cetak-prspdf-container08">
                    <table style="width: 100%">
                        <tr>
                            <td
                                style="width: 25%; text-align: center !important; border-top: 1px solid black; border-bottom:none !important">
                                ACC TABEL HITUNGAN</td>
                            <td id="acc_th"
                                style="text-align: center !important; border-top: 1px solid black; border-bottom:none !important">
                                &nbsp;</td>
                            <td
                                style="width: 25%; text-align: center !important; border-top: 1px solid black; border-bottom:none !important">
                                GAMBAR</td>
                            <td id="id_th"
                                style="text-align: center !important; border-top: 1px solid black; border-bottom:none !important">
                                &nbsp;</td>
                        </tr>
                        <tr>
                            <td style="width: 25%; text-align: center !important; border-left: 1px solid black">
                                &nbsp;</td>
                            <td style="text-align: center !important;">
                                &nbsp;</td>
                            <td style="width: 25%; text-align: center !important;">
                                &nbsp;</td>
                            <td style="text-align: center !important; border-right: 1px solid black">
                                &nbsp;</td>
                        </tr>
                    </table>
                </div> --}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <script src="{{ asset('js/JumboBag/OrderPress.js') }}"></script>
@endsection
