@extends('layouts.appKencana')
@section('content')
@section('title', 'Cetak BKM')
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
                <div class="card-header">Cetak BKM</div>
                <div class="card-body">
                    <div style="display: flex; flex-direction: row">
                        <div class="p-2" style="display: flex; flex-direction: row;">
                            <input style="margin-right: 5px" type="radio" name="radio_jenisBKM"
                                id="radio_jenisBKMPenagihan" value="Penagihan">
                            <label style="margin: 0; align-content: center;"
                                for="radio_jenisBKMPenagihan">Penagihan</label>
                        </div>
                        <div class="p-2" style="display: flex; flex-direction: row;">
                            <input style="margin-right: 5px" type="radio" name="radio_jenisBKM"
                                id="radio_jenisCashAdvance" value="Cash Advance">
                            <label style="margin: 0; align-content: center;" for="radio_jenisCashAdvance">Cash
                                Advance</label>
                        </div>
                        <div class="p-2" style="display: flex; flex-direction: row;">
                            <input style="margin-right: 5px" type="radio" name="radio_jenisBKM"
                                id="radio_jenisDPPelunasan" value="DP Pelunasan">
                            <label style="margin: 0; align-content: center;" for="radio_jenisDPPelunasan">DP
                                Pelunasan</label>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 1rem; gap: 5px">
                        <div style="display: flex; flex-direction: column;">
                            <label for="tanggal_penagihan">Tanggal Penagihan</label>
                            <input type="date" name="tanggal_penagihan" id="tanggal_penagihan" class="form-control">
                        </div>
                        <div style="align-content: end">
                            <button class="btn btn-info" id="button_browseData" class="form-control">...</button>
                        </div>
                        <div style="display: flex; flex-direction: column;">
                            <label for="id_bkm">ID BKM</label>
                            <input type="text" name="id_bkm" id="id_bkm" class="form-control" readonly>
                        </div>
                        <div style="display: flex; flex-direction: column;">
                            <label for="nilai_pelunasan">Nilai Pelunasan</label>
                            <input type="text" name="nilai_pelunasan" id="nilai_pelunasan" class="form-control"
                                readonly>
                        </div>
                        <div style="align-content: end">
                            <button class="btn btn-success" id="button_cetak">Cetak</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Kencana/CetakBKM.js') }}"></script>
@endsection
