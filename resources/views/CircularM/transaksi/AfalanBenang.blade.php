@extends('Circular.layouts.app')

@section('title')
    Maintenance Afalan Benang
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
                    <div class="card-header">Maintenance Afalan Benang</div>
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
                                    <label for="shift" class="form-label">Shift</label>
                                </div>
                                <div class="col-sm-2">
                                    <select id="shift" class="form-select form-select-sm" style="width: 100%">
                                        {{-- <option disabled selected>Pilih Shift</option> --}}
                                        <option></option>
                                        <option value="P">P</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                    </select>
                                </div>
                                <div class="col-sm-2 d-flex justify-content-end">
                                    <button class="btn btn-primary" id="btn_ok">OK</button>
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
                                        <th>Shift</th>
                                        <th>Mesin</th>
                                        <th>Order</th>
                                        <th>Afv Benang WA</th>
                                        <th>Afv Benang WE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <br>
                            <table class="table" id="table_bawah">
                                <thead class="table-dark">
                                    <tr>
                                        <th>Jenis Benang</th>
                                        <th>Kode Barang</th>
                                        <th>Nama Benang</th>
                                        <th>Id Type Benang</th>
                                        <th>Jumlah</th>
                                        <th>Saldo Primer</th>
                                        <th>Saldo Sekunder</th>
                                        <th>Saldo Tritier</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="kelompok_utamaAtas" class="form-label">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="idKelompok_utamaAtas"
                                        name="idKelompok_utamaAtas">
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="kelompok_utamaAtas"
                                        name="kelompok_utamaAtas">
                                </div>
                                <div class="col-sm-1 d-flex justify-content-end">
                                    <label for="kode_konversi" class="form-label">Kode Konversi</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="kode_konversi" name="kode_konversi">
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="kelompok_atas" class="form-label">Kelompok</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="idKelompok_atas"
                                        name="idKelompok_atas">
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="kelompok_atas"
                                        name="kelompok_atas">
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="subKelompok_atas" class="form-label">Sub Kelompok</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="idSubKelompok_atas"
                                        name="idSubKelompok_atas">
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="subKelompok_atas"
                                        name="subKelompok_atas">
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="namaBarang_atas" class="form-label">Nama Barang</label>
                                </div>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="namaBarang_atas"
                                        name="namaBarang_atas">
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="primer_atas" class="form-label">Satuan Primer</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="primer_atas"
                                        name="primer_atas">
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="satPrimer_atas"
                                        name="satPrimer_atas">
                                </div>
                                <div class="col-sm-1 d-flex justify-content-end">
                                    <label for="sekunder_atas" class="form-label">Satuan Sekunder</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="sekunder_atas"
                                        name="sekunder_atas">
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="satSekunder_atas"
                                        name="satSekunder_atas">
                                </div>
                                <div class="col-sm-1 d-flex justify-content-end">
                                    <label for="tritier_atas" class="form-label">Satuan Tritier</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="tritier_atas"
                                        name="tritier_atas">
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="satTritier_atas"
                                        name="satTritier_atas">
                                </div>
                            </div>
                            <hr>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="kelompok_utamaBawah" class="form-label">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="idKelompok_utamaBawah"
                                        name="idKelompok_utamaBawah">
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="kelompok_utamaBawah"
                                        name="kelompok_utamaBawah">
                                </div>
                                <div class="col-sm-2 d-flex justify-content-end">
                                    <label for="kelompok_utamaBawah" class="form-label" style="color: blue">3 - Bng WA</label>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="kelompok_bawah" class="form-label">Kelompok</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="idKelompok_bawah"
                                        name="idKelompok_bawah">
                                </div>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" id="kelompok_bawah"
                                        name="kelompok_bawah">
                                </div>
                                <div class="col-sm-1">
                                    <button id="btn_kelompokBawah" class="btn btn-secondary form-control" style="width: 100%">...</button>
                                </div>
                                <div class="col-sm-2 d-flex justify-content-end">
                                    <label for="" class="form-label" style="color: blue">4 - Bng WE</label>
                                </div>
                                <div class="col-sm-2" style="text-align: right">
                                    <button class="btn btn-success" id="btn_proses" style="width: 100%">Proses</button>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="subKelompok_bawah" class="form-label">Sub Kelompok</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="idSubKelompok_bawah"
                                        name="idSubKelompok_bawah">
                                </div>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" id="subKelompok_bawah"
                                        name="subKelompok_bawah">
                                </div>
                                <div class="col-sm-1">
                                    <button id="btn_subKelompokBawah" class="btn btn-secondary form-control" style="width: 100%">...</button>
                                </div>
                                <div class="col-sm-2 d-flex justify-content-end">
                                    <label for="" class="form-label" style="display: none"></label>
                                </div>
                                <div class="col-sm-2">
                                    <button class="btn btn-danger" id="btn_batal" style="width: 100%">Batal</button>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="namaBarang_bawah" class="form-label">Nama Barang</label>
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="namaBarang_bawah"
                                        name="namaBarang_bawah">
                                </div>
                                <div class="col-sm-1">
                                    <button id="btn_namaBarangBawah" class="btn btn-secondary form-control" style="width: 100%">...</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/transaksi/AfalanBenang.js') }}"></script>
@endsection
