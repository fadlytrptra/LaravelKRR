@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance Type Barang Per Divisi')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Type Barang Per Divisi</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        {{-- ATAS --}}
                        <div class="baris-1 pl-1" id="baris-1">
                            <div class="row pt-2">
                                <div class="col-2 pr-0">
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
                                            <button type="button" id="btn_divisi" class="btn btn-info">...</button>
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
                                            <button type="button" id="btn_objek" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="kelompokId">&nbsp;Kelompok</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="kelompokId" name="kelompokId" class="form-control" readonly>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kelompokNama" name="kelompokNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_kelompok" class="btn btn-info">...</button>
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
                                            <button type="button" id="btn_kelut" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="subkelId">&nbsp;Sub Kelompok</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="subkelId" name="subkelId" class="form-control" readonly>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="subkelNama" name="subkelNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_subkel" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- TENGAH --}}
                        <div class="baris-2 pl-1">
                            <div class="row pt-2 pb-1">
                                <div class="col-md-2">
                                    <label for="type-id">Kat. Utama</label>
                                </div>
                                <div class="col-md-9">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="katUtama" name="katUtama"
                                            class="form-control" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_katUtama" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-2">
                                    <label for="type-id">Kategori</label>
                                </div>
                                <div class="col-md-9">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kategori" name="kategori"
                                            class="form-control" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_kateogri" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-2">
                                    <label for="type-id">Sub Kategori</label>
                                </div>
                                <div class="col-md-9 pb-1">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="jenis" name="jenis"
                                            class="form-control" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_jenis" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-2">
                                    <label for="type-id">Barang</label>
                                </div>
                                <div class="col-md-2 pl-0">
                                    <input type="text" class="form-control" id="kdBarang" name="kdBarang"
                                        class="form-control">
                                </div>
                                <div class="col-md-7 pl-0 pr-0">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="namaBarang" name="namaBarang"
                                            class="form-control" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_brang" class="btn btn-info">...</button>
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
                                            <button type="button" id="btn_kodetype" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                {{-- <div ></div> --}}
                                <div class="col-md-1" style="padding-left: 3%">
                                    <label for="PIB">No PIB</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="PIB" name="PIB"
                                        class="form-control">
                                </div>
                                <div class="col-md-1">
                                    <label for="PEB">No PEB</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="PEB" name="PEB"
                                        class="form-control">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <label for="type-id">Nama Type</label>
                                </div>
                                <div class="col-md-9">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="namaType" name="namaType"
                                            class="form-control">
                                        <div class="input-group-append">
                                            <button type="button" id="btn_namatype" class="btn btn-info">...</button>
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
                                        class="form-control">
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
                                        <div class="input-group-append">
                                            <button type="button" id="btn_triter" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-1 pl-3">
                                    <label for="tritier">Sekunder</label>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="sekunder" name="sekunder"
                                            class="form-control" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_sekunder" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-1 pl-3">
                                    <label for="tritier">Primer</label>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="primer" name="primer"
                                            class="form-control" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_primer" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row pb-2">
                                <div class="col-md-2">
                                    <label>Satuan Umum</label>
                                </div>
                                <div class="col-md-2 pl-0">
                                    <select class="form-control" id="satuan" name="satuan">
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="baris-4 p-1">
                            <div class="row align-items-center">
                                <div class="col-md-2 d-flex align-items-center">
                                    <input type="checkbox" name="konversi" id="konversi" style="margin: 0 5%;">
                                    <label for="konversi" id="konversiLabel">Aturan Konversi</label>
                                </div>

                                <div class="col-md-10 d-flex align-items-center">
                                    <div class="row pl-4" id="konvPS">
                                        <label for="primerSekunder">Konversi Primer Ke Sekunder &#10148;</label>
                                        <div class="col-md-5">
                                            <div class="input-label">
                                                <input type="text" class="form-control input-field"
                                                    id="primerSekunder" name="primerSekunder">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" id="konvST">
                                        <label for="sekunderTritier">Konversi Sekunder Ke Tritier &#10148;</label>
                                        <div class="col-md-5">
                                            <div class="input-label">
                                                <input type="text" class="form-control input-field"
                                                    id="sekunderTritier" name="sekunderTritier">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <button type="button" id="btn_isi" class="btn btn-outline-secondary">Isi</button>
                        <button type="button" id="btn_proses" class="btn btn-outline-secondary">Proses</button>
                        <button type="button" id="btn_batal" class="btn btn-outline-secondary">Batal</button>
                        <button type="button" id="btn_koreksi" class="btn btn-outline-secondary">Koreksi</button>
                        <button type="button" id="btn_hapus" class="btn btn-outline-secondary">Hapus</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="{{ asset('css/Kencana/MaintenanceType.css') }}">
    <script src="{{ asset('js/Kencana/MaintenanceType.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
