@extends('Circular.layouts.app')

@section('title')
    Maintenance Log Sparepart Mesin
@endsection

@section('content')
    <div class="card" style="max-width: 750px; margin-left: auto; margin-right: auto;">
        <div class="card-header">
            Status Mesin
        </div>
        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">
            <div id="table_mesin_container" class="mt-2">
                <table id="table_mesin" class="table table-bordered table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th>Nama Mesin</th>
                            <th>Jenis Parts</th>
                            <th>Status Health</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
            <button id="button_tambahLogMaintenance" class="btn btn-primary" type="button">Tambah Log Maintenance</button>
        </div>
    </div>
@endsection

@section('custom_js')
    @include('Circular.mesin.modal-tambah-log-maintenance')
    <script src="{{ asset('js/Circular/mesin/maintenancePartMesin.js') }}"></script>
@endsection
