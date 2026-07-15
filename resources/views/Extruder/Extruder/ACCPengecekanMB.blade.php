@extends('layouts.appExtruder')
@section('content')
@section('title')
    ACC Pengecekan Mutu Benang Extruder
@endsection
<style>
    #table_atas {
        border-collapse: collapse !important;
    }

    #table_atas th,
    #table_atas td {
        border: 1px solid #dee2e6 !important;
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">ACC Pengecekan Mutu Benang Extruder</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        @csrf
                        <div class="row">
                            <div class="col-md-3">
                                <label for="lokasi" class="form-label">Lokasi</label>
                                <select id="lokasi" class="form-select form-select-sm" style="width: 100%">
                                    <option></option>
                                    @foreach ($listLokasi as $d)
                                        <option value="{{ $d->idLokasi }}">
                                            {{ $d->idLokasi . ' | ' . $d->nama_lokasi }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="row align-items-end">
                            <label for="tgl_awal" class="form-label">Tanggal</label>
                            <div class="col-auto">
                                <input type="date" class="form-control font-weight-bold" id="tgl_awal"
                                    name="tgl_awal">
                            </div>
                            <div class="col-auto">
                                <label for="sampai_dengan" class="ms-2 me-2">s/d</label>
                            </div>
                            <div class="col-auto">
                                <input type="date" class="form-control font-weight-bold" id="tgl_akhir"
                                    name="tgl_akhir">
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-info w-100" id="btn_redisplay">Redisplay</button>
                            </div>
                        </div>
                        <div style="overflow-x: auto;">
                            <table id="table_atas" class="table table-bordered" style="width:100%">
                                <thead class="table-dark">
                                    <tr>
                                        <th>ID Laporan</th>
                                        <th>Shift</th>
                                        <th>Tanggal</th>
                                        <th>Spek</th>
                                        <th>User Input</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('QC.Extruder.ModalPengecekanMB')
{{-- @include('Guard.Pemeriksaan.ModalPemeriksaanBarangCustomer') --}}
<script type="text/javascript" src="{{ asset('js/Extruder/ExtruderNet/ACCPengecekanMB.js') }}"></script>
@endsection
