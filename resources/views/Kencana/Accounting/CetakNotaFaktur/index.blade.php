@extends('layouts.appKencana')
@section('content')
@section('title', 'Cetak Nota/Faktur')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
@if (session('error'))
    <script>
        window.close();
    </script>
@endif
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card font-weight-bold">
                <div class="card-header">Cetak Nota/Faktur</div>
                <div class="card-body" id="select2DropdownParent">
                    <div style="display: flex; flex-direction: row">
                        <div class="p-2" style="display: flex; flex-direction: row;">
                            <input style="margin-right: 5px" type="radio" name="radio_jenisCetak"
                                id="radio_jenisNotaFaktur" value="NotaFaktur">
                            <label style="margin: 0; align-content: center;" for="radio_jenisNotaFaktur">Nota /
                                Faktur</label>
                        </div>
                        <div class="p-2" style="display: flex; flex-direction: row;">
                            <input style="margin-right: 5px" type="radio" name="radio_jenisCetak"
                                id="radio_jenisTunai" value="Tunai">
                            <label style="margin: 0; align-content: center;" for="radio_jenisTunai">Tunai</label>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 1rem; gap: 5px">
                        <div style="display: flex; flex-direction: column;">
                            <label for="tanggal_penagihan">Tanggal Penagihan</label>
                            <input type="date" name="tanggal_penagihan" id="tanggal_penagihan" class="form-control">
                        </div>
                        <div style="display: flex; flex-direction: column;">
                            <label for="select_ttd">Tanda Tangan</label>
                            <select name="select_ttd" id="select_ttd">
                                <option value="Rudy Santoso">Rudy Santoso</option>
                                <option value="Yudi Santoso">Yudi Santoso</option>
                            </select>
                        </div>
                        <div style="display: flex; flex-direction: column;">
                            <label for="select_bank">Bank</label>
                            <select name="select_bank" id="select_bank"></select>
                        </div>
                        <div style="align-content: end">
                            <button class="btn btn-info" id="button_browseData" class="form-control">...</button>
                        </div>
                        <div style="display: flex; flex-direction: column;">
                            <label for="id_penagihan">ID Penagihan</label>
                            <input type="text" name="id_penagihan" id="id_penagihan" class="form-control" readonly>
                        </div>
                        <div style="display: flex; flex-direction: column;">
                            <label for="nama_customer">Nama Customer</label>
                            <input type="text" name="nama_customer" id="nama_customer" class="form-control" readonly>
                            <input type="hidden" name="id_customer" id="id_customer" class="form-control" readonly>
                        </div>
                        <div style="align-content: end">
                            <button class="btn btn-success" id="button_cetak">Cetak</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Kencana/CetakNotaFaktur.js') }}"></script>
@endsection
