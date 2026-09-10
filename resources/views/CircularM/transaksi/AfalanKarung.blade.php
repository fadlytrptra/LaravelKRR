@extends('Circular.layouts.app')

@section('title')
    Maintenance Afalan Karung
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
                    <div class="card-header">Maintenance Afalan Karung</div>
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
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-1">
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
                                    <button class="btn btn-primary" id="btn_tampil">Tampil Data</button>
                                </div>
                            </div>
                            <table class="table" id="table_atas">
                                <thead class="table-dark">
                                    <tr>
                                        <th>Id Log</th>
                                        <th>Nama Order</th>
                                        <th>Mesin</th>
                                        <th>WA</th>
                                        <th>WE</th>
                                        <th>Weft End</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="id_log" class="form-label">Id Log</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="id_log" name="id_log" disabled>
                                </div>
                                <div class="col-sm-1 d-flex justify-content-end">
                                    <label for="nama_mesin" class="form-label">Nama Mesin</label>
                                </div>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" id="nama_mesin" name="nama_mesin" disabled>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="afalan_warp" class="form-label">Afalan Warp</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="afalan_warp" name="afalan_warp">
                                </div>
                                <div class="col-sm-1 d-flex justify-content-end">
                                    <label for="nama_order" class="form-label">Nama Order</label>
                                </div>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" id="nama_order" name="nama_order" disabled>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="afalan_weft" class="form-label">Afalan Weft</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="afalan_weft" name="afalan_weft">
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="weft_end" class="form-label">Weft End</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="weft_end" name="weft_end">
                                </div>
                                <div class="col-sm-3 d-flex justify-content-end">
                                    <button class="btn btn-success" id="btn_proses">Proses</button>
                                </div>
                                <div class="col-sm-1">
                                    <button class="btn btn-danger" id="btn_batal">Batal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/transaksi/AfalanKarung.js') }}"></script>
@endsection
