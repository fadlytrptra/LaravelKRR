@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance Kode Perkiraan')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Kode Perkiraan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="customer-id">Kode Perkiraan</label>
                            </div>
                            <div class="form-group col-md-5">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kode" name="kode">
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="type-id">Keterangan</label>
                            </div>
                            <div class="form-group col-md-8">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="keterangan" name="keterangan" class="form-control">
                                    <div class="input-group-append">
                                        <button type="button" id="btn_lihat" class="btn btn-info">...</button>
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
                <br>

            </div>
        </div>
    </div>

    <script src="{{ asset('js/Kencana/KodePerkiraan.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/Kencana/KodePerkiraan.css') }}">
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
