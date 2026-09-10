@extends('Circular.layouts.app')

@section('title')
    Maintenance Kode Pegawai
@endsection

@section('content')
    {{-- <div class="card mb-3">
        <div class="card-header">
            Maintenance Order
        </div> --}}

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Kode Pegawai</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            @csrf
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="tanggal" class="form-label">Tanggal</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="date" class="form-control" id="tanggal" name="tanggal">
                                </div>
                                <div class="col-sm-1">
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="shift" class="form-label">Shift</label>
                                </div>
                                <div class="col-sm-2">
                                    <select class="form-control" id="shift" name="shift">
                                        <option value="" disabled selected>Pilih Shift ▼</option>
                                        <option value="P">P</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="kode_pegawai" class="form-label">Kode / Nama Pegawai</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="kode_pegawai" name="kode_pegawai">
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="nama_pegawai" name="nama_pegawai">
                                </div>
                                <div class="col-sm-1">
                                    <button id="btn_pegawai" class="btn btn-primary form-control"
                                        style="width: 100%">...</button>
                                </div>
                            </div>
                            {{-- <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="nama_mesin" class="form-label" style="font-weight: bold">Data
                                        Karyawan</label>
                                </div>
                            </div> --}}
                            <table class="table" id="table_atas">
                                <thead class="table-dark">
                                    <tr>
                                        <th>ID. Log</th>
                                        <th>Nama Mesin</th>
                                        <th>Status</th>
                                        <th>Kode Pegawai</th>
                                        <th>Nama Pegawai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <br>
                            <div class="row pb-2">
                                <div class="form-check form-check-inline" style="margin-left: 10px;">
                                    <input class="form-check-input" type="checkbox" id="checkbox_all" value="option2">
                                    <label class="form-check-label" for="checkbox_all">Pilih Semua</label>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="" class="form-label">Diganti Menjadi</label>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="kode_pegawaiNew" class="form-label">Kode / Nama Pegawai</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="kode_pegawaiNew" name="kode_pegawaiNew">
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="nama_pegawaiNew" name="nama_pegawaiNew">
                                </div>
                                <div class="col-sm-1">
                                    <button id="btn_pegawaiNew" class="btn btn-primary form-control"
                                        style="width: 100%">...</button>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <button class="btn btn-success" id="btn_proses">Proses</button>
                                </div>
                                <div class="col" style="text-align: right;">
                                    <button class="btn btn-danger" id="btn_batal">Batal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/transaksi/kodePegawai.js') }}"></script>
@endsection
