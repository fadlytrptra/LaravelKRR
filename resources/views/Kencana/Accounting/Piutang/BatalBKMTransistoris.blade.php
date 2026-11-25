@extends('layouts.appKencana')
@section('content')
@section('title', 'Koreksi / Batal BKM')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">KOREKSI / BATAL BKM</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    <div class="row pb-2">
                        <div class="col-sm-2">
                            <input type="radio" id="kasBesar" name="opsi" value="kasBesar">
                            <label for="kasBesar">Kas Besar</label>

                        </div>
                        <div class="col-sm-2">
                            <input type="radio" id="kasKecil" name="opsi" value="kasKecil">
                            <label for="kasKecil">Kas Kecil</label>
                        </div>
                    </div>

                    <div class="row pb-1">
                        <div class="col-sm-2">
                            <label>Bulan/Tahun</label>
                        </div>
                        <div class="col-sm-1">
                            <input type="text" class="form-control" id="bulanTahun" name="bulanTahun">
                        </div>
                    </div>
                    <div class="row pb-1">
                        <div class="col-sm-2">
                            <label>BKM</label>
                        </div>
                        <div class="col-sm-3">
                            <div class="input-group">
                                <input type="text" class="form-control" id="BKK" name="BKK">
                                <div class="input-group-append">
                                    <button type="button" id="btn_bkk" class="btn btn-default">...</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row pb-1">
                        <div class="col-sm-2">
                            <label>Status Penagihan</label>
                        </div>
                        <div class="col-sm-5">
                            <input type="text" class="form-control" id="statusPenagihan" name="statusPenagihan">
                        </div>
                    </div>
                    <div class="row pb-1">
                        <div class="col-sm-2">
                            <label>Mata Uang</label>
                        </div>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="mataUang" name="mataUang">
                        </div>
                    </div>
                    <div class="row pb-1">
                        <div class="col-sm-2">
                            <label>Nilai BKM</label>
                        </div>
                        <div class="col-sm-3">
                            <input type="text" class="form-control" id="nilaiBKM" name="nilaiBKM">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-2">
                            <label>Uraian</label>
                        </div>
                        <div class="col-sm-5">
                            <input type="text" class="form-control" id="uraian" name="uraian">
                        </div>
                    </div>

                    <div class="col-sm-2" style="display: none">
                        <input type="text" class="form-control" id="tanggalBatal" name="tanggalBatal">
                        <input type="text" class="form-control" id="alasan" name="alasan">
                    </div>

                    <div class="row pt-3">
                        <div class="col-sm-2">
                            <button type="button" id="btn_proses" class="btn btn-info" style="width: 60%"
                                disabled>PROSES</button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" id="btn_koreksi" class="btn btn-warning" style="width: 60%">Koreksi
                                BKM</button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" id="btn_batalBKM" class="btn btn-danger" style="width: 60%">Batal
                                BKM</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/BatalBKMTransistoris.js') }}"></script>
@endsection
