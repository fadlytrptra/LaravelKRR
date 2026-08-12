@extends('layouts.appKencana')
@section('title', 'Acc Permohonan')

@section('content')

<style>
    .card-header{
        padding:8px 15px;
        font-weight:bold;
    }

    .table thead th{
        text-align:center;
        vertical-align:middle;
        white-space:nowrap;
        font-size:13px;
    }

    .table tbody td{
        height:32px;
        white-space:nowrap;
        vertical-align:middle;
        font-size:13px;
    }

    #tableAccPermohonan{
        min-width:1500px;
    }

    .table-responsive{
        height:550px;
        overflow:auto;
    }

    .form-check-inline{
        margin-top:3px;
    }

    .btn{
        min-width:110px;
    }
</style>


<div class="container-fluid">

    {{-- Panel Action --}}
    <div class="card mb-3">
        <div class="card-header bg-primary text-white font-weight-bold">
            Action
        </div>
        <div class="card-body py-2">
           <div class="form-check form-check-inline mr-4">
                <input class="form-check-input"
                    type="radio"
                    name="action"
                    id="acc"
                    value="acc"
                    checked>

                <label class="form-check-label" for="acc">
                    Acc Permohonan
                </label>
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input"
                    type="radio"
                    name="action"
                    id="batal"
                    value="batal">

                <label class="form-check-label" for="batal">
                    Batal Acc
                </label>
            </div>
        </div>
    </div>

    {{-- Tabel --}}
    <div class="card">
        <div class="card-body p-0">

            <div class="table-responsive">
                <table class="table table-bordered table-hover mb-0" id="tableAccPermohonan">
                    <thead class="thead-light text-center">
                        <tr>
                            <th width="40">
                                <input type="checkbox" id="checkAll">
                            </th>
                            <th width="100">Divisi</th>
                            <th width="120">Tanggal</th>
                            <th width="220">Jenis Barang</th>
                            <th width="180">Type</th>
                            <th width="100">Jumlah</th>
                            <th width="100">Satuan</th>
                            <th width="140">Tgl Dibutuhkan</th>
                            <th width="250">Keterangan Beli</th>
                            <th width="180">Pemesan</th>
                            <th width="120">Dokumentasi</th>
                        </tr>
                    </thead>

                    <tbody>

                    </tbody>
                </table>
            </div>

        </div>
    </div>

    {{-- Tombol Proses --}}
    <div class="mt-3 d-flex justify-content-between">
        <button class="btn btn-success" id="btnProses">
            <i class="fa fa-check"></i> Proses
        </button>
    </div>

</div>

<script src="{{ asset('js/Kencana/AccPermohonan.js') }}"></script>
@endsection

