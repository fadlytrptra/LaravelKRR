@extends('Circular.layouts.app')

@section('title')
    Hapus Kegiatan Mesin
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
                    <div class="card-header">Hapus Kegiatan Mesin</div>
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
                            {{-- <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="order_lama" class="form-label">Order Lama</label>
                                </div>
                                <div class="col-sm-2">
                                    <select class="form-control" id="shift" name="shift">
                                        <option value="">Pilih Shift ▼</option>
                                        <option value="P">P</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                    </select>
                                    <input type="number" class="form-control" id="order_lama" name="order_lama">
                                </div>
                            </div> --}}
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="nama_mesin" class="form-label">Nama Mesin</label>
                                </div>
                                <div class="col-sm-2"> 
                                    <input type="text" class="form-control" id="nama_mesin" name="nama_mesin">
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="nama_mesin" class="form-label" style="font-weight: bold">Data</label>
                                </div>
                            </div>
                            <table class="table" id="table_atas">
                                <thead class="table-dark">
                                    <tr>
                                        <th>ID. Log</th>
                                        <th>Status Log</th>
                                        <th>Shift</th>
                                        <th>RPM</th>
                                        <th>ID. Order</th>
                                        <th>ID. Karyawan</th>
                                        <th>Counter Awal</th>
                                        <th>Counter Akhir</th>
                                        <th>Jam Awal</th>
                                        <th>Jam Akhir</th>
                                        <th>ID. User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <br>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label id="label_ganti" for="id_log" class="form-label">ID Log</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="id_log" name="id_log">
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label id="label_ganti" for="id_order" class="form-label">ID Order</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="id_order" name="id_order">
                                </div>
                                <div class="col-sm-2">
                                    <button class="btn btn-success" id="btn_proses">Proses</button>
                                </div>
                                <div class="col" style="text-align: right;">
                                    <button class="btn btn-danger" id="btn_batal">Batal</button>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label id="label_ganti" for="sisa" class="form-label">Sisa</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="sisa" name="sisa">
                                </div>
                            </div>
                            <br>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/koreksi/HapusKegiatanMesin.js') }}"></script>
@endsection
