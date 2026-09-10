@extends('Circular.layouts.app')

@section('title')
    Proses Afalan
@endsection

@section('content')
    {{-- <div class="card mb-3">
        <div class="card-header">
            Maintenance Order
        </div> --}}

    <div class="container-fluid px-0">
        <div class="row justify-content-center mx-0">
            <div class="col-12 px-0 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Afalan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            @csrf
                            <div class="row pb-2">
                                <div class="col-sm-1 d-flex">
                                    <label for="tanggal" class="form-label">Tanggal</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="date" class="form-control" id="tanggal" name="tanggal">
                                </div>
                                <div class="col-sm-1 d-flex justify-content-end">
                                    <button class="btn btn-primary" id="btn_cek">Cek Afalan</button>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-1 d-flex">
                                    <label for="tonase" class="form-label">Tonase</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="tonase" name="tonase">
                                </div>
                                <div class="col-sm-1 d-flex justify-content-end">
                                    <label for="jumlah_mesin" class="form-label">Jumlah Mesin</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="jumlah_mesin" name="jumlah_mesin" readonly>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-1 d-flex">
                                    <label for="kg_afalan" class="form-label">KG Afalan</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="kg_afalan" name="kg_afalan" readonly>
                                </div>
                                <div class="col-sm-1 d-flex justify-content-end">
                                    <label for="kg_mesin" class="form-label">KG Per Mesin</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="kg_mesin" name="kg_mesin" readonly>
                                </div>
                            </div>
                            <table class="table" id="table_atas">
                                <thead class="table-dark">
                                    <tr>
                                        <th>Id Mesin</th>
                                        <th>Mesin</th>
                                        <th>Id Order</th>
                                        <th>Kode Barang</th>
                                        <th>Nama Barang</th>
                                        <th>Spek WA</th>
                                        <th>Spek WE</th>
                                        <th>KG Afalan</th>
                                        <th>Afalan WA</th>
                                        <th>Afalan WE</th>
                                        <th>Kode Barang WA</th>
                                        <th>Kode Barang WE</th>
                                        <th>Denier</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <div class="row pb-2 d-flex justify-content-between">
                                <div class="col-sm-1">
                                    <button class="btn btn-success" id="btn_proses" style="width: 100%">Proses</button>
                                </div>
                                <div class="col-sm-1 text-end">
                                    <button class="btn btn-danger" id="btn_batal" style="width: 100%">Batal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/transaksi/ProsesAfalan.js') }}"></script>
@endsection
