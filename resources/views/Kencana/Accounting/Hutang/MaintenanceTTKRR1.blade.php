@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance TT KRR1')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance BKK (Tunai) -- Create TT</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <!-- Form fields go here -->
                            <p>
                            <div class="row">
                                <div class="col-md-2">
                                    <label for="namaSupplierSelect">Supplier</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="id_supp" name="id_supp" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="nama_supp" name="nama_supp" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div>
                                    <button type="button" class="btn btn-default" id="btn_supplier">...</button>
                                </div>
                                <div>

                                </div>
                            </div>

                            <p>
                            <div style="overflow-x: auto;">
                                <table style="width: 200%; table-layout: fixed;" id="table_atas">
                                    <colgroup>
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                    </colgroup>
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Divisi</th>
                                            <th>PO</th>
                                            <th>Faktur</th>
                                            <th>Nilai Tagih</th>
                                            <th>Kd. Barang</th>
                                            <th>Nama Barang</th>
                                            <th>Qty</th>
                                            <th>Satuan</th>
                                            <th>No. Terima</th>
                                            <th>Hrg. Satuan</th>
                                            <th>Kurs</th>
                                            <th>Disc</th>
                                            <th>PPN</th>
                                            <th>Hrg. Disc</th>
                                            <th>Hrg. PPN</th>
                                            <th>Sat. Terima</th>
                                            <th>Hrg. Murni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-2">
                                    <label for="id">ID. Penagihan</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="id_penagihan" name="id_penagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-8 d-flex justify-content-end">
                                    <label for="id" style="margin-left: 10px;">Mata Uang</label>
                                    <div class="col-md-2">
                                        <input type="text" id="mata_uang" name="mata_uang" class="form-control"
                                            style="width: 100%">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-2">
                                    <label for="id">ID Inv. Supplier</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="id_inv" name="id_inv" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>

                            <hr style="height:2px;">
                            <div class="row">
                                <div class="col-2">
                                    <label for="id"><strong>NILAI PENAGIHAN (Rp)</strong></label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="nilai_penagihan" name="nilai_penagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <hr style="height:2px;">
                            <div class="col-md-2">
                                <div class="row">
                                    <label for="id">Faktur Pajak</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2">
                                    <label for="id">No. Faktur Pajak</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="nofaktur_pajak" name="supplierSelect" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-2">
                                    <label for="id" style="margin-left: 80px;">Nilai Pajak</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="nilai_pajak" name="nilai_pajak" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-4 d-flex justify-content-end">
                                    <div class="col-md-4">
                                        <label for="id" style="margin-left: 80px;">Pajak</label>
                                    </div>
                                    <div class="col-md-7">
                                        <input type="text" id="pajak" name="pajak" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-1">
                                        <label for="id">%</label>
                                    </div>
                                </div>
                            </div>
                            <br>
                            {{-- <div style="overflow-x: auto;">
                                <table style="width: 100%;" id="table_bawah">
                                    <colgroup>
                                        <col style="width: 10%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 10%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                    </colgroup>
                                    <thead class="table-dark">
                                        <tr>
                                            <th>ID. Detail</th>
                                            <th>No. Faktur</th>
                                            <th>Nilai Faktur</th>
                                            <th>Pajak</th>
                                            <th>Sub. Total</th>
                                            <th>Kurs</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div> --}}
                            <br>
                            <div class="mb-3">
                                <button type="button" class="btn btn-success" id="btn_proses">Proses</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/MaintenanceTTKRR1.js') }}"></script>
{{-- <script src="{{ asset('js/Hutang/MaintenanceTTKRR1.js') }}"></script> --}}
@endsection
