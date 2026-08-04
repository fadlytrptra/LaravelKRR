@extends('layouts.appOrderPembelian')
@section('content')
@section('title', 'List Order Sudah App Manager')
<link href="{{ asset('css/ListOrderAppManager.css') }}" rel="stylesheet">
<link href="{{ asset('css/style.css') }}" rel="stylesheet">

<style>
    #table_ListOrder{
        white-space: nowrap;
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @elseif (Session::has('error'))
                <div class="alert alert-danger">
                    {{ Session::get('error') }}
                </div>
            @endif
            <div class="card font-weight-bold">
                <div class="card-header">List Order App Manager</div>
                <div class="card-body">
                    <div class="row" id="formCekRedisplay">
                        <div class="col-xl-2 mt-2">
                            <div class="row align-items-center">
                                <div class="col-12">
                                    <input type="radio" name="filter_radioButton" id="filter_radioButtonNomorOrder"
                                        value="NomorOrder" class="radio-button">
                                    No. Order
                                </div>
                                <div class="col-xl-12">
                                    <input type="text" name="nomor_order" id="nomor_order"
                                        class="form-control font-weight-bold">
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 mt-2">
                            <div class="row align-items-center">
                                <div class="col-12">
                                    <input type="radio" name="filter_radioButton" id="filter_radioButtonDivisi"
                                        value="Divisi" class="radio-button" checked>
                                    Divisi
                                </div>
                                <div class="col-xl-12">
                                    <select name="select_divisi" id="select_divisi"
                                        class="input w-100 font-weight-bold">
                                        <option class="w-100 text-center" value="ALL" selected>ALL
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-5 mt-2">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <div class="pl-3">
                                        <label for="">
                                            Tanggal Awal
                                        </label>
                                    </div>
                                    <div class="col-xl-12">
                                        <div class="row">
                                            <input type="date" class="form-control font-weight-bold Filter w-100"
                                                id="tglAwal" name="tglAwal">
                                            <input type="time" class="form-control font-weight-bold Filter w-100"
                                                id="jamAwal" name="jamAwal">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="pl-3">
                                        <label for="">
                                            Tanggal Akhir
                                        </label>
                                    </div>
                                    <div class="col-xl-12">
                                        <div class="row">
                                            <input type="date" class="form-control font-weight-bold Filter w-100"
                                                id="tglAkhir" name="tglAkhir">
                                            <input type="time" class="form-control font-weight-bold Filter w-100"
                                                id="jamAkhir" name="jamAkhir">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="row align-items-center">
                                <div class="col-12 mb-2">
                                    <label for="status_beli">Status Beli</label>
                                    <div class="row align-items-center">
                                        <div class="col-6">
                                            <input type="radio" name="status_beliRadioButton"
                                                id="status_beliPengadaanPembelian" class="input" checked>Pengadaan
                                            Pembelian
                                        </div>
                                        <div style="col-6">
                                            <input type="radio" name="status_beliRadioButton"
                                                id="status_beliBeliSendiri" class="input">Beli Sendiri
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6" style="padding:10px 120px 0px 0px; text-align:end">
                            <div class="col-4 col-md-12 p-0 h-100">
                                <button class="btn btn-info w-50 h-100" id="button_redisplay">Redisplay</button>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="acs-form3">
                                <table id="table_ListOrder" class="table table-bordered" style="width:100%">
                                    <thead class="table-primary">
                                        <tr>
                                            <th><input type="checkbox" name="CheckedAll" id="CheckedAll"
                                                    class="RDZCheckBoxSize" /></th>
                                            <th>Tgl. & Jam Approve</th>
                                            <th>No. Order</th>
                                            <th>Status Beli</th>
                                            <th>Kode Barang</th>
                                            <th>Nama Barang</th>
                                            <th>Sub Kategori</th>
                                            <th>Qty.</th>
                                            <th>Satuan</th>
                                            <th>User</th>
                                            <th>Divisi</th>
                                            <th>Tgl. Dibutuhkan</th>
                                            <th>Keterangan Order</th>
                                            <th>Keterangan Internal</th>
                                            <th>Status Attachment</th>
                                            <th>Attachment</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-12">
                            <p id="checkedCount">Jumlah Data Yang TerCentang 0</p>
                        </div>
                        <div class="col-md-2 mt-2">
                            <div class="col-4 col-md-12 p-0">
                                <button class="btn btn-success w-100" id="btn_print">Print</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/OrderPembelian/ListOrderAppManager.js') }}"></script>
@endsection
