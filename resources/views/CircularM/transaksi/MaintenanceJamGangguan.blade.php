@extends('Circular.layouts.app')

@section('title')
    Maintenance Jam Gangguan
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
                    <div class="card-header">Maintenance Jam Gangguan</div>
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
                                {{-- <div class="col-sm-2">
                                    <input type="date" class="form-control" id="tanggal2" name="tanggal2">
                                </div> --}}
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="shift" class="form-label">Id Gangguan</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="idGangguan" name="idGangguan" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <button id="btn_idGangguan" class="btn btn-primary form-control"
                                        style="width: 100%" disabled>...</button>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="shift" class="form-label">Shift</label>
                                </div>
                                <div class="col-sm-2">
                                    <select class="form-control" id="shift" name="shift">
                                        <option value="" disabled selected>Pilih Shift ▼</option>
                                        <option value="P">Pagi</option>
                                        <option value="S">Sore</option>
                                        <option value="M">Malam</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="jam_gangguan" class="form-label">Jam Gangguan</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="time" class="form-control" id="jam_gangguan" name="jam_gangguan">
                                </div>
                                <div class="col-sm-1 d-flex justify-content-center align-items-center">
                                    <span>s/d</span>
                                </div>
                                <div class="col-sm-2">
                                    <input type="time" class="form-control" id="jam_gangguan2" name="jam_gangguan2">
                                </div>
                            </div>
                            <hr>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="id_typeMesin" class="form-label">Type Mesin</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="id_typeMesin" name="id_typeMesin" readonly>
                                </div>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" id="typeMesin" name="typeMesin" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <button id="btn_typeMesin" class="btn btn-primary form-control"
                                        style="width: 100%">...</button>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="id_namaMesin" class="form-label">Nama Mesin</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="id_namaMesin" name="id_namaMesin" readonly>
                                </div>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" id="namaMesin" name="namaMesin" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <button id="btn_namaMesin" class="btn btn-primary form-control"
                                        style="width: 100%">...</button>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="idOrder" name="idOrder">
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="order" class="form-label">Order</label>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="order" name="order">
                                </div>
                            </div>
                            <hr>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="" class="form-label">Gangguan</label>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="order" class="form-label">Type Gangguan :</label>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="type_gangguan"
                                            id="woven_bag" value="Woven Bag">
                                        <label class="form-check-label" for="woven_bag">
                                            &nbsp;&nbsp;Woven Bag
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="type_gangguan"
                                            id="jumbo_bag" value="Jumbo Bag">
                                        <label class="form-check-label" for="jumbo_bag">
                                            &nbsp;&nbsp;Jumbo Bag
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="id_jenisGangguan" class="form-label">Jenis Gangguan</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="id_jenisGangguan"
                                        name="id_jenisGangguan" readonly>
                                </div>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" id="jenisGangguan" name="jenisGangguan" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <button id="btn_jenisGangguan" class="btn btn-primary form-control"
                                        style="width: 100%">...</button>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-md-12 d-flex justify-content-center flex-wrap">
                                    <button type="button" id="btn_isi" class="btn btn-primary mx-1 my-1">Isi</button>
                                    <button type="button" id="btn_koreksi"
                                        class="btn btn-warning mx-1 my-1">Koreksi</button>
                                    <button type="button" id="btn_hapus" class="btn btn-danger mx-1 my-1">Hapus</button>
                                    <div class="col-md-1"></div>

                                    <button type="button" id="btn_proses"
                                        class="btn btn-success mx-1 my-1">Proses</button>
                                    <button type="button" id="btn_batal"
                                        class="btn btn-secondary mx-1 my-1">Batal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/transaksi/MaintenanceJamGangguan.js') }}"></script>
@endsection
