@extends('layouts.appExtruder')

@section('title')
    Maintenance Order
@endsection

@section('content')
    <div class="extruder_root">
        <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">

        <div id="order_maintenance" class="form" data-aos="fade-up">
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">Tanggal:</div>
                <div class="col-lg-2">
                    <input type="date" id="tanggal" class="form-control unclickable">
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">No. Order:</div>
                <div class="col-lg-2">
                    <input type="text" id="no_order" class="form-control" disabled>
                </div>
            </div>

            <div class="row mt-3 mb-4">
                <div class="col-lg-2 aligned-text">Identifikasi Order:</div>
                <div class="col-lg-8">
                    <input type="text" id="identifikasi" class="form-control" disabled>
                </div>
            </div>

            <table id="table_order" class="hover cell-border">
                <thead>
                    <tr>
                        <th>Nama Type</th>
                        <th>Qty. Primer</th>
                        <th>Sat. Primer</th>
                        <th>Qty. Sekunder</th>
                        <th>Sat. Sekunder</th>
                        <th>Qty. Tritier</th>
                        <th>Sat. Tritier</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>

            <div class="card mt-4">
                <div class="card-header">Detail Order</div>

                <div class="card-body">
                    <div class="mt-3 row">
                        <div class="col-lg-2"><span class="aligned-text">Type Benang:</span></div>
                        <div class="col-lg-8">
                            <div class="input-group rounded">
                                <input type="text" id="nama_type_benang" class="form-control bg-white"
                                    placeholder="Pilih Type Benang..." disabled readonly>
                                <button type="button" id="btn_lookup_benang" class="btn btn-secondary rounded-end"
                                    disabled>
                                    ...
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3 row">
                        <div class="col-lg-2"><span class="aligned-text">Primer:</span></div>
                        <div class="col-lg-2">
                            <div class="input-group">
                                <input type="number" min="0" id="primer_qty" class="form-control" placeholder="0"
                                    disabled>
                                <span id="primer_sat" class="input-group-text"></span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3 row">
                        <div class="col-lg-2"><span class="aligned-text">Sekunder:</span></div>
                        <div class="col-lg-2">
                            <div class="input-group">
                                <input type="number" min="0" id="sekunder_qty" class="form-control" placeholder="0"
                                    disabled>
                                <span id="sekunder_sat" class="input-group-text"></span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3 row">
                        <div class="col-lg-2"><span class="aligned-text">Tritier:</span></div>
                        <div class="col-lg-2">
                            <div class="input-group">
                                <input type="number" min="0" id="tritier_qty" class="form-control" placeholder="0"
                                    disabled>
                                <span id="tritier_sat" class="input-group-text"></span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <button type="button" id="btn_detail" class="btn btn-info float-end"
                                disabled>Tambah<br>Detail</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-5 text-center">
                    <button type="button" id="btn_baru" class="btn btn-primary">Tambah</button>
                </div>
                <div class="col-md-2"></div>
                <div class="col-md-5 text-center">
                    <button type="button" id="btn_proses" class="btn btn-success" disabled>Proses</button>
                    <button type="button" id="btn_keluar" class="btn btn-danger">Keluar</button>
                </div>
            </div>
        </div>
    </div>

    @include('Extruder.Extruder.modalLookUp')

    <script src="{{ asset('js/Extruder/ExtruderNet/orderMaintenance.js') }}"></script>
@endsection
