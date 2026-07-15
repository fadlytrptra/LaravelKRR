@extends('layouts.appQC')
@section('content')
@section('title', 'Pengecekan Mutu Benang Extruder')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Pengecekan Mutu Benang Extruder</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        @csrf
                        <button class="acs-icon-btn acs-add-btn acs-float" id="btn_tambah" type="button"
                            data-toggle="modal" data-target="#modalLaporan">
                            <div class="acs-add-icon"></div>
                            <div class="acs-btn-txt">Tambah Data</div>
                        </button>
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
                        <div class="row">
                            <div class="col-5">
                                <label for="radiobutton" class="form-check-label" id="labelRedisplay">Tanggal
                                    Setting Mesin</label>
                                <div class="row">
                                    <div class="col">
                                        <input type="date" class="form-control font-weight-bold" id="tgl_awal"
                                            name="tgl_awal">
                                        <label for="tgl_awal" class="form-label"></label>
                                    </div>
                                    <div>
                                        <label for="sampai_dengan">s/d</label>
                                    </div>
                                    <div class="col">
                                        <input type="date" class="form-control font-weight-bold" id="tgl_akhir"
                                            name="tgl_akhir">
                                        <label for="tgl_akhir" class="form-label"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="d-flex gap-2 mt-4">
                                    <button class="btn btn-info flex-fill" id="btn_redisplay">
                                        Redisplay
                                    </button>
                                    {{-- <button class="btn btn-info flex-fill" id="btn_tambahF">
                                        Tambah Laporan
                                    </button> --}}
                                </div>
                            </div>
                        </div>
                        <div style="overflow-x: auto;">
                            <table style="width: 100%;" id="table_atas">
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
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('QC.Extruder.ModalPengecekanMB')
<script type="text/javascript" src="{{ asset('js/QC/Extruder/PengecekanMB.js') }}"></script>
@endsection
