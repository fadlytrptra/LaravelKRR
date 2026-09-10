@extends('Circular.layouts.app')

@section('title')
    Maintenance All Jenis Sparepart
@endsection

@section('content')
    <div class="card" style="max-width: 100%; margin-left: auto; margin-right: auto;">
        <div class="card-header">
            Daftar Semua Sparepart
        </div>
        <div class="card-body" style="padding-left: 2%; padding-right: 2%;">
            <div id="table_sparepart_container" class="mt-4">
                <table id="table_sparepart" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th>Nama Sparepart</th>
                            <th>Identification Number</th>
                            <th>Keterangan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
            <button id="button_tambahSparepart" class="btn btn-primary" type="button">Tambah Sparepart</button>
        </div>
    </div>
@endsection

@section('custom_js')
    @include('Circular.mesin.modal-tambah-sparepart')
    <script src="{{ asset('js/Circular/mesin/maintenanceAllJenisSparepart.js') }}"></script>
@endsection
