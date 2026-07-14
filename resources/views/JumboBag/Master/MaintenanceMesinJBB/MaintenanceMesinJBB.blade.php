@extends('layouts.appJumboBag')
@section('content')
@section('title', 'Maintenance Mesin JBB')
<style>
    .input-error {
        outline: 1px solid red;
        text-decoration-color: red;
    }
</style>
{{-- <link href="{{ asset('css/ABM/MaintenanceMesinABM.css') }}" rel="stylesheet"> --}}
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            {{-- button untuk munculin create modal create mesin --}}
            <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahMesin" type="button" data-toggle="modal"
                data-target="#tambahMesinJBBModal">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah Mesin</div>
            </button>
            <div class="card">
                <div class="card-header">Daftar Seluruh Mesin</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <table id="table_mesinJBB" class="table table-bordered table-striped" style="width:100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Nama Mesin</th>
                                <th>Type Mesin</th>
                                <th>Lokasi</th>
                                <th>Action</th>
                                <th>Aktif</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal untuk Detail Mesin -->
<div class="modal fade" id="detailMesinModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog" style="max-width: 90%;">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="detailMesinModalLabel">Detail Mesin X</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="detailMesinLokasi">Lokasi</label>
                    <div class="input-group">
                        <div id="detailMesinLokasi" class="form-control" style="height: auto;"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="detailMesinStatusAktif">Status</label>
                    <div class="input-group">
                        <div id="detailMesinStatusAktif" class="form-control" style="height: auto;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@include('JumboBag.Master.MaintenanceMesinJBB.ModalMaintenanceMesinJBB')
<script src="{{ asset('js/JumboBag/Master/MaintenanceMesinJBB.js') }}"></script>
@endsection
