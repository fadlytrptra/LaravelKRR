{{-- @extends('Circular.layouts.app')

@section('title')
    Maintenance Order & Mesin yang Aktif
@endsection

@section('content')
    <div class="card mb-3">
        <div class="card-header">
            Maintenance Order & Mesin yang Aktif
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">
            <div class="row">
                <div class="col-md-2">
                    <label for="type_mesin">Type Mesin</label>
                </div>

                <div class="col-md-5">
                    <select id="type_mesin" class="form-select form-select-sm">
                        <option></option>
                        @foreach ($listTypeMesin as $d)
                            <option value="{{ $d->IdType_Mesin }}">
                                {{ $d->IdType_Mesin . ' | ' . $d->Type_Mesin }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2">
                    <label for="mesin_aktif">Mesin</label>
                </div>

                <div class="col-md-5">
                    <select id="mesin_aktif" class="form-select form-select-sm" disabled>
                        <option></option>
                    </select>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2">
                    <label for="order_lama">Order Lama</label>
                </div>

                <div class="col-md-10">
                    <div class="input-group input-group-sm">
                        <input type="text" id="id_order_lama" class="form-control" style="width: 15%" disabled>
                        <input type="text" id="nama_order_lama" class="form-control" style="width: 85%" disabled>
                    </div>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2">
                    <label for="order_baru">Order Baru</label>
                </div>

                <div class="col-md-10">
                    <select id="order_baru" class="form-control" disabled>
                        <option></option>
                    </select>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2">
                    <label for="meter_panen">Meter per Panen</label>
                </div>

                <div class="col-md-2">
                    <input type="text" id="meter_panen" class="form-control form-control-sm" disabled>
                </div>
            </div>

            <div id="table_mesin_container" class="mt-4">
                <table id="table_mesin" class="table table-bordered table-hover">
                    <thead>
                        <th>Id Mesin</th>
                        <th>Nama Mesin</th>
                        <th>Id Order</th>
                        <th>Nama Barang</th>
                        <th>Meter Panen</th>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

            <div class="row mt-4">
                <div class="col-md-12 d-flex justify-content-center flex-wrap">
                    <form action="{{ url('/proses-order') }}" method="post">
                        @csrf
                        <input type="hidden" id="mode_proses" name="mode_proses" value="4">
                        <input type="hidden" id="form_data" name="form_data">
                        <input type="hidden" name="form_sp" value="Sp_Maint_Mesin">
                        <button type="submit" id="btn_proses" class="btn btn-primary mx-1 my-1" disabled>Proses</button>
                    </form>

                    <div class="col-md-5"></div>
                    <button type="button" id="btn_keluar" class="btn btn-secondary mx-1 my-1">Keluar</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('custom_js')
    <script>
        const url_MesinAktif = "{{ url('/pagination/get-mesin-aktif') }}";
        const url_OrderBaru = "{{ url('/pagination/get-order-baru') }}";
        const url_OrderBarang = "{{ url('/data-table/get-mesin-order-barang') }}";
    </script>

    <script src="{{ asset('js/Circular/transaksi/orderAktif.js') }}"></script>
@endsection --}}
@extends('Circular.layouts.app')

@section('title')
    Maintenance Order & Mesin yang Aktif
@endsection

@section('content')
    {{-- <div class="card mb-3"> --}}
    {{-- <div class="card-header">
            Maintenance Order
        </div> --}}

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Order & Mesin yang Aktif</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            {{-- <form method="POST" action=""> --}}
                                @csrf
                                <br>
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="btn_typeMesin">Type Mesin</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="input" id="id_typeMesin" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-4">
                                        <input type="input" id="type_mesin" class="form-control" style="width: 100%">
                                    </div>
                                    <div>
                                        <button id="btn_typeMesin" class="btn btn-primary form-control"
                                            style="width: 50%">...</button>
                                    </div>
                                </div>
                                <br>
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="btn_mesin">Mesin</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="input" id="id_mesin" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-4">
                                        <input type="input" id="mesin" class="form-control" style="width: 100%">
                                    </div>
                                    <div>
                                        <button id="btn_mesin" class="btn btn-primary form-control"
                                            style="width: 50%">...</button>
                                    </div>
                                </div>
                                <br>
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="">Order Lama</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="input" id="id_orderLama" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-9">
                                        <input type="input" id="orderLama" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <br>
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="">Order Baru</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="input" id="id_orderBaru" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-8">
                                        <input type="input" id="orderBaru" class="form-control" style="width: 100%">
                                    </div>
                                    <div>
                                        <button id="btn_orderBaru" class="btn btn-primary form-control"
                                            style="width: 50%">...</button>
                                    </div>
                                </div>
                                <br>
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="">Meter per Panen</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="input" id="meterPanen" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <table class="table" id="table_atas">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>ID. Mesin</th>
                                            <th>Nama Mesin</th>
                                            <th>Id Order</th>
                                            <th>Nama Barang</th>
                                            <th>Meter Panen</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>

                                <br>
                                <div class="d-flex">
                                    <div class="col-sm-4">
                                        <button class="btn btn-warning" id="btn_koreksi">Koreksi</button>
                                    </div>
                                    <div class="col" style="text-align: center;">
                                        <button class="btn btn-success" id="btn_proses">Proses</button>
                                    </div>
                                    <div class="col" style="text-align: right;">
                                        <button class="btn btn-danger" id="btn_batal">Batal</button>
                                    </div>
                                </div>
                            {{-- </form> --}}
                            <br>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/transaksi/orderAktif.js') }}"></script>
@endsection
