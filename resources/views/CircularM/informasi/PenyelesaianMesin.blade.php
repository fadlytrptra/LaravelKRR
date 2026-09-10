@extends('Circular.layouts.app')
@section('content')
@section('title', 'Penyelesaian Mesin')
<style>
    input[readonly],
    textarea[readonly] {
        background-color: #e9ecef !important;
        /* cursor: not-allowed; */
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @elseif (Session::has('error'))
                <div class="alert alert-danger">
                    {{ Session::get('error') }}
                </div>
            @endif
            <div class="card font-weight-bold">
                <div class="card-header">Penyelesaian Mesin</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="col-12">
                        <div class="card">
                            <label style="font-weight: bold;" id="labelProses">Update Data</label>
                            <div class="row">
                                <div class="col-md-8">
                                    <label for="radiobutton" class="form-check-label" id="labelRedisplay">
                                        Tanggal Pemberhentian Mesin
                                    </label>
                                    <div class="row align-items-center mt-1">
                                        <div class="col-auto">
                                            <input type="date" class="form-control font-weight-bold" id="tgl_awal"
                                                name="tgl_awal">
                                        </div>
                                        <div class="col-auto">
                                            <label class="mb-0">s/d</label>
                                        </div>
                                        <div class="col-auto">
                                            <input type="date" class="form-control font-weight-bold" id="tgl_akhir"
                                                name="tgl_akhir">
                                        </div>
                                        <div class="col-auto">
                                            <button class="btn btn-info" id="btn_redisplay">
                                                Redisplay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table class ="table table-bordered text-center align-middle" id="table_atas"
                                style="width: 100%">
                                <thead class="table-dark" style="text-align: center">
                                    <tr>
                                        <th>ID</th>
                                        <th>Tanggal</th>
                                        <th>Type Mesin</th>
                                        <th>Nama Mesin</th>
                                        <th>Jam Berhenti</th>
                                        <th>Dijalankan</th>
                                        <th>Masalah</th>
                                        <th>Penyelesaian</th>
                                        <th>User Input</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="lokasi">Lokasi</label>
                                </div>
                                <div class="col-md-2">
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
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="tanggal">Tanggal</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="date" name="id_penagihan" class="form-control" style="width: 100%"
                                        id="tanggal">
                                </div>
                                <div class="col-md-1 d-flex justify-content-end">
                                    <label for="type_mesin">Type Mesin</label>
                                </div>
                                <div class="col-md-3 ">
                                    <select id="type_mesin" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                        @foreach ($listTypeMesin as $d)
                                            <option value="{{ $d->IdType_Mesin }}">
                                                {{ $d->IdType_Mesin . ' | ' . $d->Type_Mesin }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-1 d-flex justify-content-end">
                                    <label for="nama_mesin">Nama Mesin</label>
                                </div>
                                <div class="col-md-2">
                                    <select id="nama_mesin" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-1 ">
                                    <label for="jam_berhenti">Jam Berhenti</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="time" name="jam_berhenti" class="form-control" style="width: 100%"
                                        id="jam_berhenti">
                                </div>
                                <div class="col-md-1 d-flex justify-content-end">
                                    <label for="jam_dijalankan">Dijalankan</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="datetime-local" name="jam_dijalankan" class="form-control"
                                        style="width: 100%" id="jam_dijalankan">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="masalah">Masalah</label>
                                </div>
                                <div class="col-md-3">
                                    <textarea name="masalah" class="form-control" id="masalah" style="width: 100%" rows="3"></textarea>
                                </div>
                                <div class="col-md-1 d-flex justify-content-end">
                                    <label for="penyelesaian">Penyelesaian</label>
                                </div>
                                <div class="col-md-3">
                                    <textarea name="penyelesaian" class="form-control" id="penyelesaian" style="width: 100%" rows="3"></textarea>
                                </div>
                            </div>
                            <br>
                            <div style="display: flex; justify-content: space-between;">
                                <button type="button" class="btn btn-success" id="btn_proses"
                                    style="width: 130px; margin-left: 10px;">
                                    PROSES
                                </button>

                                <button type="button" class="btn btn-secondary" id="btn_batal"
                                    style="width: 100px; margin-right: 10px;">
                                    BATAL
                                </button>
                            </div>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/Circular/informasi/PenyelesaianMesin.js') }}"></script>
@endsection
