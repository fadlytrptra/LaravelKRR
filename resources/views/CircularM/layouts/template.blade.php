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

            <div class="row mt-4">
                <div class="col-md-12 d-flex justify-content-center flex-wrap">
                    <button type="button" id="btn_isi" class="btn btn-success mx-1 my-1">Isi</button>
                    <button type="button" id="btn_koreksi" class="btn btn-warning mx-1 my-1">Koreksi</button>
                    <button type="button" id="btn_hapus" class="btn btn-danger mx-1 my-1">Hapus</button>
                    <button type="submit" id="btn_proses" class="btn btn-primary mx-1 my-1"
                        style="margin-left: 1.5rem !important" disabled>Proses</button>
                    <button type="button" id="btn_keluar" class="btn btn-secondary mx-1 my-1">Keluar</button>
                </div>
            </div>
        </div>
    </div>
@endsection

{{-- @section('custom_js')
    <script src="{{ asset('js/master/mesinType.js') }}"></script>
@endsection --}}
