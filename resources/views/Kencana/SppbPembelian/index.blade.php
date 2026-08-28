@extends('layouts.appKencana')

@section('title', 'SPPB Pembelian')

@section('content')

<style>
    .custom-select{
        height:42px;
        border:1px solid #ced4da;
        border-radius:8px;
        font-size:14px;
        font-weight:500;
        padding-left:14px;
        padding-right:40px;
        background-color:#fff;
        transition:.2s;
        box-shadow:none;
    }

    .custom-select:hover{
        border-color:#86b7fe;
    }

    .custom-select:focus{
        border-color:#0d6efd;
        box-shadow:0 0 0 .15rem rgba(13,110,253,.15);
    }

    #tableSPPB tbody tr.selected{
        background:#d8ecff !important;
    }

    #tableSPPB tbody tr{
        cursor:pointer;
    }
    #HargaSatuan,
    #Disc,
    #SubTotalHarga,
    #PPN,
    #TotalHarga {
        width: 100%;
        height: 38px;
        box-sizing: border-box;
    }
</style>


<div class="container-fluid">
    <div class="card shadow-sm">
        <div class="card-header">
            <h5 class="mb-0">
                Maintenance SPPB Pembelian
            </h5>
        </div>

        <div class="card-body">
            <form id="formSPPB">
                <input type="hidden" id="KdDiv">
                <div class="row">
                    <!-- ================= LEFT ================= -->
                    <div class="col-md-5">
                        <div class="mb-2 row">
                            <label class="col-sm-4 col-form-label">Nama Divisi</label>
                            <div class="col-sm-8">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="NamaDivisi" readonly>
                                   <button
                                        type="button"
                                        id="btnCariDivisi"
                                        class="btn btn-outline-secondary">
                                        ...
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-4 col-form-label">
                                No SPPB
                            </label>

                            <div class="col-sm-8">
                                <div class="input-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="NoSPPB">

                                    <button
                                        type="button"
                                        id="btnLoadSPPB"
                                        class="btn btn-outline-secondary">
                                        ...
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-4 col-form-label">
                                Tanggal SPPB
                            </label>

                            <div class="col-sm-4">
                                <input type="date" class="form-control" id="TanggalSPPB">
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-4 col-form-label">
                                No Transaksi
                            </label>

                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="NoTransaksi" readonly>
                            </div>
                        </div>

                    </div>

                    <!-- ================= RIGHT ================= -->

                    <div class="col-md-7">
                        <div class="mb-2 row">
                            <label class="col-sm-3 col-form-label">
                                Kd. Barang
                            </label>

                            <div class="col-sm-3">
                                <input class="form-control" id="KdBarang" readonly>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3 col-form-label">
                                Nama Barang
                            </label>

                            <div class="col-sm-9">
                                <input class="form-control" id="NamaBarang" readonly>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3 col-form-label">
                                Ket. Barang
                            </label>

                            <div class="col-sm-9">
                                <input class="form-control" id="KetBarang" readonly>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3 col-form-label">
                                Kategori Utama
                            </label>

                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="KategoriUtama" readonly>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3 col-form-label">
                                Kategori
                            </label>

                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="Kategori" readonly>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3 col-form-label">
                                Sub Kategori
                            </label>

                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="SubKategori" readonly>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3 col-form-label">
                                Ket. Pembelian
                            </label>

                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="KetPembelian" readonly>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3 col-form-label">
                                Satuan
                            </label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="Satuan" readonly>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3 col-form-label">
                                Payment Term
                            </label>

                            <div class="col-sm-3">
                                <select
                                    class="form-select custom-select"
                                    id="paymentTerm"
                                    name="paymentTerm"
                                >
                                    <option value="">Pilih Payment Term</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <hr>

                <!-- ================= TABLE ================= -->

                <div class="table-responsive">
                    <table class="table table-bordered table-sm" id="tableSPPB">
                        <thead class="table-light">
                        <tr>
                            <th width="40">
                                <input type="checkbox" id="checkAll">
                            </th>
                            <th>Tgl Order</th>
                            <th>Quantity</th>
                            <th>Pemesan</th>
                            <th>Nama Mesin</th>
                            <th>Nama Golongan</th>
                            <th>No Trans</th>
                            <th>Tgl Datang</th>
                            <th>Retur</th>
                            <th>Direktur</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>

                <!-- Harga -->
                <div class="row mt-3 mb-3">
                    <div class="col-md-2">
                        <label class="form-label mb-1">Harga Satuan</label>
                        <input
                            type="text"
                            class="form-control text-end"
                            id="HargaSatuan"
                            name="HargaSatuan"
                            value="0"
                        >
                    </div>

                    <div class="col-md-2">
                        <label class="form-label mb-1">Disc (%)</label>
                        <input
                            type="number"
                            class="form-control text-end"
                            id="Disc"
                            name="Disc"
                            value="0"
                            min="0"
                            step="0.01"
                        >
                    </div>

                    <div class="col-md-2">
                        <label class="form-label mb-1">SubTotal Harga</label>
                        <input
                            type="text"
                            class="form-control text-end"
                            id="SubTotalHarga"
                            name="SubTotalHarga"
                            value="0"
                            readonly
                        >
                    </div>

                    <div class="col-md-2">
                        <label class="form-label mb-1">PPN (%)</label>
                        <select
                            class="form-select"
                            id="PPN"
                            name="PPN"
                        >
                            <option value="">Pilih PPN</option>
                        </select>
                    </div>

                    <div class="col-md-2">
                        <label class="form-label mb-1">Total Harga</label>
                        <input
                            type="text"
                            class="form-control text-end"
                            id="TotalHarga"
                            name="TotalHarga"
                            value="0"
                            readonly
                        >
                    </div>

                </div>

                <div class="row mt-3">
                    <div class="col-md-8">
                        <div class="row mb-3 align-items-center">
                            <label class="col-sm-2 col-form-label">
                                Supplier
                            </label>

                            <div class="col-sm-5">
                                <select class="form-select custom-select" id="supplier" name="supplier">
                                    <option value="">Pilih Supplier</option>
                                </select>
                            </div>
                        </div>

                        <div class="row mb-3 align-items-center">
                            <label class="col-sm-2 col-form-label">
                                Tgl Datang
                            </label>

                            <div class="col-sm-5">
                                <input
                                    type="date"
                                    class="form-control"
                                    id="TanggalDatang"
                                    name="TanggalDatang"
                                >
                            </div>
                        </div>

                        <div class="row mb-3 align-items-center">
                            <label class="col-sm-2 col-form-label">
                                Jenis Pembelian
                            </label>

                            <div class="col-sm-5">
                                <select
                                    class="form-select custom-select"
                                    id="JenisPembelian"
                                    name="JenisPembelian"
                                >
                                    <option value="">Pilih Jenis Pembelian</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 text-end">
                        <button id="btnHarga" type="button" class="btn btn-outline-primary w-50 mb-3">
                            Lihat Daftar Harga
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div class="card-footer">
            <div class="d-flex justify-content-between align-items-center">
                <!-- Tombol Kiri -->
                <div class="d-flex gap-2">

                </div>

                <!-- Tombol Kanan -->
                <div class="d-flex gap-2">
                   <button id="btnIsi" type="button" class="btn btn-outline-secondary">
                        ISI
                    </button>

                    <button id="btnLihat" type="button" class="btn btn-outline-secondary">
                        LIHAT
                    </button>

                    <button id="btnProses" type="button" class="btn btn-success">
                        PROSES
                    </button>

                    <button id="btnBatal" type="button" class="btn btn-danger">
                        BATAL
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>



<div class="modal fade" id="modalHistoryHarga" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered" style="max-width:1100px;">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">
                    Daftar History Harga
                </h5>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>
            </div>

            <div class="modal-body">

                <div class="table-responsive">
                    <table class="table table-bordered table-striped"
                        id="tableHistoryHarga">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Harga</th>
                                <th>Satuan</th>
                                <th>Mata Uang</th>
                                <th>Disc</th>
                                <th>PPN</th>
                                <th>Supplier</th>
                                <th>Tanggal Datang</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>

            </div>

        </div>
    </div>
</div>

<script src="{{ asset('js/Kencana/SppbPembelian.js') }}"></script>

@endsection
