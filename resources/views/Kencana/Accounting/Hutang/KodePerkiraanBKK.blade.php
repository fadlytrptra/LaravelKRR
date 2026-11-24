@extends('layouts.appKencana')
@section('content')
@section('title', 'Kode Perkiraan BKK')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Kode Perkiraan BKK</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('KodePerkiraanBKK') }}" id="formkoreksi">
                                {{ csrf_field() }}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <div class="card-container" style="display: flex;">
                                    <div class="card" style="width: 60%;">
                                        <div class="card-body">
                                            <div style="overflow-y: auto;">
                                                <table style="width: 100%; table-layout: fixed;" id="tabelatas">
                                                    <colgroup>
                                                        <col style="width: 20%;">
                                                        <col style="width: 15%;">
                                                        <col style="width: 25%;">
                                                        <col style="width: 15%;">
                                                        <col style="width: 25%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                        <tr>
                                                            <th>Id. BKK</th>
                                                            <th>Bank</th>
                                                            <th>Jns.Bayar</th>
                                                            <th>Mata Uang</th>
                                                            <th>Nilai Pembayaran</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <!--CARD 2-->
                                    <div style="width: 40%;">
                                        <div class="card-body">
                                            <div class="col">
                                                <div class="d-flex">
                                                    <div class="col-md-6">
                                                        <input type="radio" name="radiogrup1" value="kecil" id="kasKecil" checked>
                                                        <label for="kasKecil">Kas Kecil</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="radio" name="radiogrup1" value="besar" id="kasBesar">
                                                        <label for="kasBesar">Kas Besar</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="d-flex">
                                                    <div class="col-md-1">
                                                        <label for="bulan">Bulan</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <input type="text" id="bulan" name="bulan" class="form-control" style="width: 100%">
                                                    </div>
                                                    <div class="col-md-1" style="padding-right: 25px">
                                                        <label for="tahun">Tahun</label>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <input type="text" id="tahun" name="tahun" class="form-control" style="width: 100%">
                                                    </div>
                                                    <div class="col-md-3" >
                                                        <button id="btnOK" name="btnOK" class="btn btn-block">OK</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="hidden" id="BlnThn" name="BlnThn" class="form-control" style="width: 100%">
                                        <input type="text" name="idBKK" id="idBKK" class="form-control" style="width: 100%; visibility: hidden">

                                        <div class="card">
                                            <div class="card-body">
                                                Koreksi Kode Perkiraan
                                                <p><div class="col-md-6">
                                                    <label for="rincianPembayaran">Rincian Pembayaran</label>
                                                </div>
                                                <div class="col-md-12">
                                                    <textarea type="text" id="rincianPembayaran" name="rincianPembayaran" class="form-control" style="width: 100%"> </textarea>
                                                </div>
                                                <p><div class="col-md-6">
                                                    <label for="nilaiRincian">Nilai Rincian</label>
                                                </div>
                                                <div class="col-md-10">
                                                    <input type="text" id="nilaiRincian" name="nilaiRincian" class="form-control" style="width: 100%">
                                                </div>
                                                <p><div class="col-md-6">
                                                    <label for="kodePerkiraan">Kode Perkiraan</label>
                                                </div>
                                                <div class="row" style="padding-left: 15px">
                                                    <div class="col-md-4">
                                                        <input type="text" id="idKodePerkiraan" name="idKodePerkiraan" class="form-control" style="width: 100%">
                                                    </div>
                                                    <div class="col-md-7">
                                                        <select style="height: 80px !important" id="kodePerkiraanSelect" name="kodePerkiraanSelect" class="form-control">

                                                        </select>
                                                    </div>
                                                </div>

                                                <input type="hidden" name="idDetail" id="idDetail" class="form-control" style="width: 100%">
                                                <input type="hidden" name="idBayar" id="idBayar" class="form-control" style="width: 100%">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-container" style="display: flex;">
                                    <div class="card" style="width: 60%;">
                                        <div class="card-body">
                                            <div style="overflow-y: auto;">
                                                <table style="width: 125%; table-layout: fixed;" id="tabelbawah">
                                                    <colgroup>
                                                        <col style="width: 25%;">
                                                        <col style="width: 25%;">
                                                        <col style="width: 25%;">
                                                        <col style="width: 25%;">
                                                        <col style="width: 25%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                        <tr>
                                                            <th>Rincian Bayar</th>
                                                            <th>Nilai Rincian</th>
                                                            <th>Kd. Perkiraan</th>
                                                            <th>Id. Detail</th>
                                                            <th>Id. Bayar</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-container" style="display: flex;">
                                        <div style="width: 40%;">
                                            <p><div style="padding-left: 450px">
                                                <input type="submit" id="btnProses" name="btnProses" value="PROSES" class="btn btn-success" disabled>
                                            </div>
                                            {{-- <div style="padding-left: 450px">
                                                <input type="submit" name="keluar" value="KELUAR" class="btn btn-primary d-flex ml-auto">
                                            </div> --}}
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="{{ asset('js/Kencana/KodePerkiraanBKK.js') }}"></script>
@endsection
