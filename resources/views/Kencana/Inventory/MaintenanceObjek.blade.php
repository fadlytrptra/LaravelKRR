@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance Objek, Kel. Utama, Kelompok, Sub Kel')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">Maintenance Objek, Kel. Utama, Kelompok, Sub Kelompok</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        {{-- form --}}
                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="divisi">Divisi</label>
                            </div>
                            <div class="form-group col-md-2">
                                <input type="text" id="divisi" name="divisi" class="form-control" readonly>
                            </div>
                            <div class="form-group col-md-8">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="namaDivisi" name="namaDivisi" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btnDivisi" class="btn btn-info" disabled>...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="objek">Objek</label>
                            </div>
                            <div class="form-group col-md-2">
                                <input type="text" id="objek" name="objek" class="form-control" readonly>
                            </div>
                            <div class="form-group col-md-8">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="namaObjek" name="namaObjek" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btnObjek" class="btn btn-info" disabled>...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="kelompokUtama">Kelompok Utama</label>
                            </div>
                            <div class="form-group col-md-2">
                                <input type="text" id="kelompokUtama" name="kelompokUtama" class="form-control" readonly>
                            </div>
                            <div class="form-group col-md-8">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="namaKelompokUtama"
                                        name="namaKelompokUtama" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btnKelompokUtama" class="btn btn-info" disabled>...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="kelompok">Kelompok</label>
                            </div>
                            <div class="form-group col-md-2">
                                <input type="text" id="kelompok" name="kelompok" class="form-control" readonly>
                            </div>
                            <div class="form-group col-md-8">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="namaKelompok" name="namaKelompok"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btnKelompok" class="btn btn-info" disabled>...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="subKelompok">Sub Kelompok</label>
                            </div>
                            <div class="form-group col-md-2">
                                <input type="text" id="subKelompok" name="subKelompok" class="form-control" readonly>
                            </div>
                            <div class="form-group col-md-8">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="namaSubKelompok" name="namaSubKelompok"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btnSubKelompok" class="btn btn-info" disabled>...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="kodePerkiraan">Kode Perkiraan</label>
                            </div>
                            <div class="form-group col-md-2">
                                <input type="text" id="kodePerkiraan" name="kodePerkiraan" class="form-control"
                                    readonly>
                            </div>
                            <div class="form-group col-md-8">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="namaKodePerkiraan"
                                        name="namaKodePerkiraan" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btnKodePerkiraan" class="btn btn-info" disabled>...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <button type="button" id="btnIsi" class="btn btn-primary">ISI</button>
                            <button type="button" id="btnKoreksi" class="btn btn-primary">KOREKSI</button>
                            <button type="button" id="btnHapus" class="btn btn-primary">HAPUS</button>
                            <button type="button" id="btnProses" class="btn btn-primary" disabled>PROSES</button>
                            <button type="button" id="btnBatal" class="btn btn-primary" disabled>BATAL</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="{{ asset('js/Kencana/MaintenanceObjek.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/Kencana/MaintenanceObjek.css') }}">
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>

@endsection
