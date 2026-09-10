@extends('Circular.layouts.app')

@section('title')
    Maintenance Stop Order
@endsection

@section('content')
    <div class="card mb-3">
        <div class="card-header">
            Maintenance Stop Order
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">
            <div class="row">
                <div class="col-md-2 d-flex">
                    <label for="id_order">Id Order</label>
                </div>

                <div class="col-md-10">
                    <select id="id_order" class="form-select form-select-sm">
                        <option></option>
                    </select>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2 d-flex">
                    <label for="kode_barang">Kode / Nama Barang</label>
                </div>

                <div class="col-md-10">
                    <div class="input-group input-group-sm">
                        <input type="text" id="kode_barang" class="form-control" style="width: 10%" disabled>
                        <input type="text" id="nama_barang" class="form-control" style="width: 90%" disabled>
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-2 mt-1">
                    <label>Spesifikasi Karung</label>
                </div>

                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-2 d-flex">
                            <label for="rajutan">Ukuran / Corak</label>
                        </div>

                        <div class="col-md-3">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text">Ukuran</span>
                                <input type="text" id="ukuran" class="form-control" disabled>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text">Corak</span>
                                <input type="text" id="corak" class="form-control" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-2 d-flex">
                            <label for="rajutan">Rajutan</label>
                        </div>

                        <div class="col-md-2">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text">WA</span>
                                <input type="text" id="wa_rajutan" class="form-control" disabled>
                            </div>
                        </div>

                        <div class="col-md-1">
                            <div class="input-group input-group-sm justify-content-center">
                                <span class="input-group-text">X</span>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text">WE</span>
                                <input type="text" id="we_rajutan" class="form-control" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-2 d-flex">
                            <label for="denier">Denier</label>
                        </div>

                        <div class="col-md-2">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text">WA</span>
                                <input type="text" id="wa_denier" class="form-control" disabled>
                            </div>
                        </div>

                        <div class="col-md-1">
                            <div class="input-group input-group-sm justify-content-center">
                                <span class="input-group-text">X</span>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text">WE</span>
                                <input type="text" id="we_denier" class="form-control" disabled>
                            </div>
                        </div>

                        <div class="col-md-1">
                            <div class="input-group input-group-sm justify-content-center">
                                <span class="input-group-text">=</span>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <input type="text" id="denier" class="form-control form-control-sm" disabled>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-2 d-flex">
                            <label for="keterangan">Keterangan</label>
                        </div>

                        <div class="col-md-8">
                            <input type="text" id="keterangan" class="form-control form-control-sm" disabled>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-2 mt-1">
                    <label>Benang yang Digunakan</label>
                </div>

                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-2 d-flex">
                            <label for="benang_warp">Benang WARP</label>
                        </div>

                        <div class="col-md-10">
                            <div class="input-group input-group-sm">
                                <input type="text" id="kode_warp" class="form-control" style="width: 12.5%" disabled>
                                <input type="text" id="nama_warp" class="form-control" style="width: 87.5%" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-2 d-flex">
                            <label for="benang_weft">Benang WEFT</label>
                        </div>

                        <div class="col-md-10">
                            <div class="input-group input-group-sm">
                                <input type="text" id="kode_weft" class="form-control" style="width: 12.5%" disabled>
                                <input type="text" id="nama_weft" class="form-control" style="width: 87.5%" disabled>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-3">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6" style="padding-right: 2.5%;">
                                <div class="row">
                                    <div class="col-md-5 aligned-text">
                                        <label for="rencana_order">Rencana Order</label>
                                    </div>

                                    <div class="col-md-5">
                                        <div class="input-group input-group-sm">
                                            <input type="number" id="rencana_order" class="form-control form-control-sm"
                                                placeholder="0" min="0" disabled>
                                            <span class="input-group-text">meter</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-2">
                                    <div class="col-md-5 aligned-text">
                                        <label for="tgl_kerja">Actual Tanggal Dikerjakan</label>
                                    </div>

                                    <div class="col-md-5">
                                        <input type="date" id="tgl_kerja" class="form-control form-control-sm"
                                            disabled>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6" style="padding-right: 2.5%;">
                                <div class="row">
                                    <div class="col-md-5 aligned-text">
                                        <label for="order_terproduksi">Order Terproduksi</label>
                                    </div>

                                    <div class="col-md-5">
                                        <div class="input-group input-group-sm">
                                            <input type="number" id="order_terproduksi"
                                                class="form-control form-control-sm" placeholder="0" min="0"
                                                disabled>
                                            <span class="input-group-text">meter</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-2">
                                    <div class="col-md-5 aligned-text">
                                        <label for="tgl_selesai">Actual Tanggal Selesai</label>
                                    </div>

                                    <div class="col-md-5">
                                        <input type="date" id="tgl_selesai" class="form-control form-control-sm"
                                            disabled>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-12 d-flex justify-content-center flex-wrap">
                    <form id="form_submit" action="{{ url('/proses-order') }}" method="post">
                        @csrf
                        <input type="hidden" id="form_data" name="form_data">
                        <input type="hidden" name="form_sp" value="Sp_Akhir_Order">
                        <button type="submit" id="btn_proses" class="btn btn-primary mx-1 my-1">Proses</button>
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
        const url_IdOrder = "{{ url('/pagination/get-id-order') }}";
    </script>

    <script src="{{ asset('js/Circular/transaksi/orderStop.js') }}"></script>
@endsection
