@extends('layouts.appQC')
@section('content')
@section('title', 'Pemberhentian Mesin Circular')
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
                <div class="card-header">Pemberhentian Mesin Circular</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="col-12">
                        <div class="card">
                            <label style="font-weight: bold;" id="labelProses">Input Data</label>
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
                                <div class="col-md-2">
                                    <input type="datetime-local" name="jam_dijalankan" class="form-control" style="width: 100%"
                                        id="jam_dijalankan" readonly>
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
                                    <textarea name="penyelesaian" class="form-control" id="penyelesaian" style="width: 100%" rows="3" readonly></textarea>
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
                        <br>
                        <div class="row">
                            <div class="col-5">
                                <label for="radiobutton" class="form-check-label" id="labelRedisplay">Tanggal
                                    Pemberhentian Mesin</label>
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
                                <div class="col-12">
                                    <button class="btn btn-info mt-4 w-100" id="btn_redisplay">Redisplay</button>
                                </div>
                            </div>
                        </div>
                        <table class ="table table-bordered text-center align-middle" id="table_atas"
                            style="width: 100%">
                            <thead class="table-dark" style="text-align: center">
                                <tr>
                                    <th>ID</th>
                                    <th>Tanggal</th>
                                    {{-- <th>Type Mesin</th> --}}
                                    <th>Nama Mesin</th>
                                    {{-- <th>Jam Berhenti</th> --}}
                                    {{-- <th>Dijalankan</th> --}}
                                    <th>Masalah</th>
                                    <th>Penyelesaian</th>
                                    {{-- <th>User Input</th> --}}
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
<script type="text/javascript" src="{{ asset('js/QC/Circular/PemberhentianMesinCL.js') }}"></script>
@endsection
