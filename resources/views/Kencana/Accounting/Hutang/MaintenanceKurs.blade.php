@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance Kurs')
{{-- <link href="{{ asset('css/ListPurchaseOrder.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet"> --}}

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
                <div class="card-header">Maintenance Kurs</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-5">
                                <label for="radiobutton" class="form-check-label">Tanggal Kurs</label>
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
                    </div>
                    <div class="col-12">
                        <table class ="table" id="table_atas" style="width: 100%">
                            <thead class="table-dark">
                                <tr>
                                    <th>ID. Kurs</th>
                                    <th>Tanggal Kurs</th>
                                    <th>Nilai Kurs</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="card">
                        <br>
                        <div class="row">
                            <div class="col-md-2">
                                <label for="id_kurs">ID. Kurs</label>
                            </div>
                            <div class="col-md-4">
                                <input type="text" name="id_kurs" class="form-control" style="width: 100%"
                                    id="id_kurs" readonly>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-2">
                                <label for="tanggal_kurs">Tanggal Kurs</label>
                            </div>
                            <div class="col-md-4">
                                <input type="date" name="tanggal_kurs" class="form-control" style="width: 100%"
                                    id="tanggal_kurs">
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-2">
                                <label for="nilai_kurs">Nilai Kurs</label>
                            </div>
                            <div class="col-md-4">
                                <input type="text" name="nilai_kurs" class="form-control" style="width: 100%"
                                    id="nilai_kurs">
                            </div>
                        </div>
                        <br>
                    </div>
                    <br>
                    <div style="margin-left: 5px;">
                        <button type="button" class="btn btn-primary" id="btn_isi" style="width: 100px;">ISI</button>
                        <button type="button" class="btn btn-success" id="btn_proses" style="width: 100px;">PROSES</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/MaintenanceKurs.js') }}"></script>
@endsection
