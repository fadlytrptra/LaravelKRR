@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance Max/Min Stock Barang per Divisi')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header" style="">Maintenance Max/Min Stock Barang per Divisi</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        {{-- ATAS --}}
                        <div class="baris-1 pl-1">
                            <div class="row pt-2">
                                <div class="col-2">
                                    <label for="divisiId">Divisi</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                                </div>
                                <div class="col-md-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="divisiNama" name="divisiNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_divisi" class="btn btn-info" disabled>...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label for="objekId">Objek</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                                </div>
                                <div class="col-md-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_objek" class="btn btn-info" disabled>...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <label for="kelompokId">&nbsp;&nbsp;Kelompok</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="kelompokId" name="kelompokId" class="form-control" readonly>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kelompokNama" name="kelompokNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_kelompok" class="btn btn-info" disabled>...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row pb-1 pr-5">
                                <div class="col-sm-2">
                                    <label for="kelutId">Kelompok Utama</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="kelutId" name="kelutId" class="form-control" readonly>
                                </div>
                                <div class="col-md-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kelutNama" name="kelutNama" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_kelut" class="btn btn-info" disabled>...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <label for="subkelId">&nbsp; Sub Kelompok</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="subkelId" name="subkelId" class="form-control" readonly>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="subkelNama" name="subkelNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_subkel" class="btn btn-info" disabled>...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="baris-3 pl-1">
                            <div class="row pt-2">
                                <div class="col-md-2 pr-0">
                                    <label for="kode_type">Kode Type</label>
                                </div>
                                <div class="col-md-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kode_type" name="kode_type"
                                            class="form-control" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_kodetype" class="btn btn-info" disabled>...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2 offset-md-1">
                                    <span id="kodeBarang"></span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <label for="type-id">Nama Type</label>
                                </div>
                                <div class="col-md-9">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="namaType" name="namaType"
                                            class="form-control" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_namatype" class="btn btn-info" disabled>...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <label for="type-id">Keterangan</label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" id="ketType" name="ketType"
                                        class="form-control" readonly>
                                </div>
                                <div class="col-md-1">
                                    {{-- <label>lblKdBarang</label> --}}
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <label>Satuan</label>
                                </div>

                                <div class="col-md-1 pl-2">
                                    <label for="tritier">Tritier</label>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="triter" name="triter"
                                            class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="col-md-1 pl-3">
                                    <label for="tritier">Sekunder</label>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="sekunder" name="sekunder"
                                            class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="col-md-1 pl-3">
                                    <label for="tritier">Primer</label>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="primer" name="primer"
                                            class="form-control" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="baris-3 pl-1">
                            <div class="row">
                                <div class="col-md-2 offset-sm-2">
                                    <label for="minim">Minimum Stock</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="minim" name="minim"
                                            class="form-control" readonly>
                                </div>
                                <div class="col-md-2">
                                    <label for="maximum">Maximum Stock</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="maximum" name="maximum"
                                            class="form-control" readonly>
                                </div>
                            </div>
                        </div>

                        <button type="button" id="btn_isi" class="btn btn-outline-secondary">Isi</button>
                        <button type="button" id="btn_koreksi" class="btn btn-outline-secondary">Koreksi</button>
                        <button type="button" id="btn_proses" class="btn btn-outline-secondary" disabled>Proses</button>
                        <button type="button" id="btn_batal" class="btn btn-outline-secondary" disabled>Batal</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="{{ asset('css/Kencana/StokBarang.css') }}">
    <script src="{{ asset('js/Kencana/StokBarang.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
