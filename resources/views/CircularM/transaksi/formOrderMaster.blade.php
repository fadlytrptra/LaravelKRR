@extends('Circular.layouts.app')

@section('title')
    Maintenance Order
@endsection


<style>
    .select2-container--default .select2-selection--single .select2-selection__rendered {
        user-select: text !important;
        -webkit-user-select: text !important;
    }

    .select2-container--disabled .select2-selection {
        background-color: #e9ecef !important;
        color: #6c757d !important;
    }
</style>

@section('content')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <div class="card mb-3">
        <div class="card-header">
            Maintenance Order
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">
            <div class="row">
                <div class="col-md-2 d-flex">
                    <label for="id_order">Id Order</label>
                </div>

                <div class="col-md-10">
                    <select id="id_order" class="form-select form-select-sm" disabled>
                        <option></option>
                    </select>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2 d-flex">
                    <label for="kategori_utama">Kategori Utama</label>
                </div>

                <div class="col-md-4">
                    <input type="text" id="kategori_utama" class="form-control form-control-sm" disabled>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2 d-flex">
                    <label for="kategori_biasa">Kategori</label>
                </div>

                <div class="col-md-4">
                    <input type="text" id="kategori_biasa" class="form-control form-control-sm" disabled>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2 d-flex">
                    <label for="sub_kategori">Sub Kategori</label>
                </div>

                <div class="col-md-4">
                    <div class="input-group input-group-sm">
                        <input type="text" id="id_sub_kategori" class="form-control" style="width: 25%" disabled>
                        <input type="text" id="sub_kategori" class="form-control" style="width: 75%" disabled>
                    </div>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2 d-flex">
                    <label for="kode_barang">Kode / Nama Barang</label>
                </div>

                <div class="col-md-10">
                    <select id="kode_barang" class="form-select form-select-sm" disabled>
                        <option></option>
                    </select>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-2 mt-1">
                    <label>Spesifikasi Karung</label>
                </div>

                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text">Nama Order</span>
                                <input type="text" id="nama_order" class="form-control" disabled>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text">Ukuran</span>
                                <input type="number" id="ukuran" class="form-control" placeholder="0" min="0"
                                    disabled>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text">Corak</span>
                                <input type="text" id="corak" class="form-control" disabled>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <input type="text" id="text_order" class="form-control form-control-sm" disabled>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-2 d-flex">
                            <label for="rajutan">Rajutan</label>
                        </div>

                        <div class="col-md-2">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text">WA</span>
                                <input type="number" id="wa_rajutan" class="form-control" placeholder="0" min="0"
                                    disabled>
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
                                <input type="number" id="we_rajutan" class="form-control" placeholder="0" min="0"
                                    disabled>
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
                                <input type="number" id="wa_denier" class="form-control" placeholder="0"
                                    min="0" max="9999999.99" disabled>
                                <div id="warn_wa" class="invalid-text">
                                    Input telah mencapai batas!
                                </div>
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
                                <input type="number" id="we_denier" class="form-control" placeholder="0"
                                    min="0" max="9999999.99" disabled>
                                <div id="warn_we" class="invalid-text">
                                    Input telah mencapai batas!
                                </div>
                            </div>
                        </div>

                        <div class="col-md-1">
                            <div class="input-group input-group-sm justify-content-center">
                                <span class="input-group-text">=</span>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <input type="number" id="denier" class="form-control form-control-sm" placeholder="0"
                                min="0" disabled>
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

                    <div class="row mt-2">
                        <div class="col-md-2 d-flex">
                            <label for="efisiensi">Estimasi Efisiensi</label>
                        </div>

                        <div class="col-md-2">
                            <div class="input-group input-group-sm">
                                <input type="number" id="efisiensi" class="form-control" placeholder="0"
                                    min="0" max="9999999.99" disabled>
                                <div id="warn_ef" class="invalid-text">
                                    Input telah mencapai batas!
                                </div>
                                <span class="input-group-text">%</span>
                            </div>
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
                            <label for="sub_benang">Sub Kategori</label>
                        </div>

                        <div class="col-md-4">
                            <div class="input-group input-group-sm">
                                <input type="text" id="id_sub_benang" class="form-control" style="width: 25%"
                                    disabled>
                                <input type="text" id="sub_benang" class="form-control" style="width: 75%" disabled>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <button type="button" id="btn_benang" class="btn btn-sm btn-outline-secondary"
                                style="width: -webkit-fill-available" data-bs-toggle="modal"
                                data-bs-target="#modalBenang" disabled>
                                Benang Strip
                                <span style="margin-left: 10px" id="jumlah_benang_strip"
                                    class="badge text-bg-danger"></span>
                            </button>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-2 d-flex">
                            <label for="benang_warp">Benang WARP</label>
                        </div>

                        <div class="col-md-6">
                            <select id="benang_warp" class="form-select form-select-sm" disabled>
                                <option></option>
                            </select>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-2 d-flex">
                            <label for="benang_weft">Benang WEFT</label>
                        </div>

                        <div class="col-md-6">
                            <select id="benang_weft" class="form-select form-select-sm" disabled>
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="custom-card-header ms-3">Rencana</h5>

                            <div class="row mt-1">
                                <div class="col-md-6" style="padding-right: 2.5%;">
                                    <div class="row">
                                        <div class="col-md-5 aligned-text">
                                            <label for="jumlah_order">Jumlah Order</label>
                                        </div>

                                        <div class="col-md-5">
                                            <div class="input-group input-group-sm">
                                                <input type="number" id="jumlah_order"
                                                    class="form-control form-control-sm" placeholder="0" min="0"
                                                    max="999999999" disabled>
                                                <div id="warn_order" class="invalid-text">
                                                    Input telah mencapai batas!
                                                </div>
                                                <span class="input-group-text">Meter</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mt-2">
                                        <div class="col-md-5 aligned-text">
                                            <label for="tgl_kerja">Tanggal Dikerjakan</label>
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
                                            <label for="panjang_potongan">Panjang Potongan</label>
                                        </div>

                                        <div class="col-md-5">
                                            <div class="input-group input-group-sm">
                                                <input type="number" id="panjang_potongan"
                                                    class="form-control form-control-sm" placeholder="0" min="0"
                                                    max="9999999" disabled>
                                                <div id="warn_order" class="invalid-text">
                                                    Input telah mencapai batas!
                                                </div>
                                                <span class="input-group-text">CM</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mt-2">
                                        <div class="col-md-5 aligned-text">
                                            <label for="tgl_selesai">Tanggal Selesai</label>
                                        </div>

                                        <div class="col-md-5">
                                            <input type="date" id="tgl_selesai" class="form-control form-control-sm"
                                                disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="warn_tanggal" class="invalid-text">
                                <b>Tanggal Dikerjakan</b> tidak boleh lebih awal dari <b>Tanggal Selesai</b>.
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-1 mt-3">
                    <input type="hidden" id="jumlah_benang" class="form-control form-control-sm">
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-12 d-flex justify-content-center flex-wrap">
                    <button type="button" id="btn_isi" class="btn btn-success mx-1 my-1">Tambah</button>
                    <button type="button" id="btn_koreksi" class="btn btn-warning mx-1 my-1">Koreksi</button>
                    <button type="button" id="btn_hapus" class="btn btn-danger mx-1 my-1">Hapus</button>
                    <div class="col-md-1"></div>
                    <form id="form_submit" action="{{ url('/proses-order') }}" method="post">
                        @csrf
                        <input type="hidden" id="mode_proses" name="mode_proses">
                        <input type="hidden" id="form_data" name="form_data">
                        <input type="hidden" name="form_sp" value="Sp_Maint_Order">

                        <input type="hidden" id="form_data2" name="form_data2">
                        <input type="hidden" id="form_sp2" name="form_sp2"
                            value="terisi setelah klik button benang strip">

                        <button type="submit" id="btn_proses" class="btn btn-primary mx-1 my-1" disabled>Proses</button>
                    </form>
                    <button type="button" id="btn_keluar" class="btn btn-secondary mx-1 my-1">Keluar</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('custom_js')
    <script>
        const url_IdOrder = "{{ url('/pagination/get-id-order') }}";
        const url_KodeBarang = "{{ url('/pagination/get-barang') }}";
        const url_BenangWarp = "{{ url('/pagination/get-benang-warp') }}";
        const url_BenangStrip = "{{ url('/pagination/get-benang-strip') }}";
    </script>

    <script src="{{ asset('js/Circular/transaksi/orderMaster.js') }}"></script>
    @include('Circular/transaksi/modalBenang')
@endsection
