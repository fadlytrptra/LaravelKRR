@extends('Circular.layouts.app')

@section('title')
    Maintenance Order Gudang
@endsection

@section('content')
    <div class="card">
        <div class="card-header">
            Maintenance Order Gudang
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">
            <div class="row">
                <div class="col-md-6" style="padding-right: 5%">
                    <div class="row">
                        <div class="col-md-4">
                            <label for="kode_asal">Kode Barang Asal</label>
                        </div>

                        <div class="col-md-8">
                            <input type="text" id="kode_asal" class="form-control form-control-sm" disabled>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-4">
                            <label for="id_order">Id Order</label>
                        </div>

                        <div class="col-md-8">
                            <div class="input-group input-group-sm">
                                <input type="text" id="id_order" class="form-control" disabled>
                                <input type="submit" id="btn_id_order" class="form-control btn-browse" value="..."
                                    disabled>
                            </div>

                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-4">
                            <label for="type_asal">Nama Type Asal</label>
                        </div>

                        <div class="col-md-8">
                            <input type="text" id="type_asal" class="form-control form-control-sm" disabled>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-4">
                            <label for="roll_order">Roll Order</label>
                        </div>

                        <div class="col-md-8">
                            <input type="number" id="roll_order" class="form-control form-control-sm" placeholder="0"
                                min="0" disabled>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-4">
                            <label for="roll_produksi">Roll Produksi</label>
                        </div>

                        <div class="col-md-8">
                            <input type="number" id="roll_produksi" class="form-control form-control-sm" placeholder="0"
                                min="0" disabled>
                        </div>
                    </div>
                </div>

                <div class="col-md-6" style="padding-left: 5%">
                    <div class="row">
                        <div class="col-md-4">
                            <label for="kode_tujuan">Kode Barang Tujuan</label>
                        </div>

                        <div class="col-md-8">
                            <div class="input-group input-group-sm">
                                <input type="text" id="kode_tujuan" class="form-control" disabled>
                                <input type="submit" id="btn_kode_tujuan" class="form-control btn-browse" value="..."
                                    disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-4">
                            <label for="no_sp">No. SP</label>
                        </div>

                        <div class="col-md-8">
                            <div class="input-group input-group-sm">
                                <input type="text" id="no_sp" class="form-control" disabled>
                                <input type="submit" id="btn_no_sp" class="form-control btn-browse" value="..."
                                    disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-4">
                            <label for="type_tujuan">Nama Type Tujuan</label>
                        </div>

                        <div class="col-md-8">
                            <input type="text" id="type_tujuan" class="form-control form-control-sm" disabled>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-4">
                            <label for="meter_order">Meter Order</label>
                        </div>

                        <div class="col-md-8">
                            <input type="number" id="meter_order" class="form-control form-control-sm" placeholder="0"
                                min="0" disabled>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-4">
                            <label for="meter_produksi">Meter Produksi</label>
                        </div>

                        <div class="col-md-8">
                            <input type="number" id="meter_produksi" class="form-control form-control-sm" placeholder="0"
                                min="0" disabled>
                        </div>
                    </div>

                    <div class="d-flex justify-content-center mt-4">
                        <div class="form-check">
                            <input type="checkbox" id="status_lunas" class="form-check-input me-2" value="lunas">
                            <label class="form-check-label" for="status_lunas">Status, centang jika order LUNAS</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-12 d-flex justify-content-center flex-wrap">
                    <button type="button" id="btn_isi" class="btn btn-success mx-1 my-1">Tambah</button>
                    <button type="button" id="btn_koreksi" class="btn btn-warning mx-1 my-1">Koreksi</button>
                    <button type="button" id="btn_hapus" class="btn btn-danger mx-1 my-1">Hapus</button>
                    <form action="{{ url('/proses-order') }}" method="post">
                        @csrf
                        <input type="hidden" id="mode_proses" name="mode_proses">
                        <input type="hidden" id="form_data" name="form_data">
                        <input type="hidden" name="form_sp" value="SP_4384_CIR_Check_GudangOrder1">
                        <button type="submit" id="btn_proses" class="btn btn-primary mx-1 my-1"
                            style="margin-left: 1.5rem !important" disabled>Proses</button>
                    </form>
                    <button type="button" id="btn_keluar" class="btn btn-secondary mx-1 my-1">Keluar</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('custom_js')
    <script src="{{ asset('js/Circular/transaksi/orderGudang.js') }}"></script>

    @include('Circular.modal-table')
@endsection
