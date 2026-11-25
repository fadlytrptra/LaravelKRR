@extends('layouts.appKencana')
@section('content')
@section('title', 'Rekap Hutang')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-7 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Rekap Hutang</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <!-- Form fields go here -->
                            <div class="container fluid">
                                <div class="row align-items-center">
                                    <div class="col-md-2" style="padding-left: 15px; white-space: nowrap;">
                                        <label for="id">Tanggal</label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="date" id="tanggal_awal" name="tanggal_awal" class="form-control">
                                    </div>
                                    <div class="col-md-1">
                                        <label for="id">s/d</label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="date" id="tanggal_akhir" name="tanggal_akhir" class="form-control">
                                    </div>
                                </div>

                                <br>
                                <div class="radio-container">
                                    <div>
                                        JENIS SUPPLIER HUTANG
                                    </div>
                                    <div>
                                        <input type="radio" name="radiogrup1" value="radio_1" id="radio_1">
                                        <label for="radio_2">RUPIAH </label>
                                    </div>
                                    <div>
                                        <input type="radio" name="radiogrup1" value="radio_2" id="radio_2">
                                        <label for="radio_3">Non RUPIAH</label>
                                    </div>
                                </div>

                                <br>
                                <div class="radio-container">
                                    <div>
                                        JENIS SUPPLIER TUNAI
                                    </div>
                                    <div>
                                        <input type="radio" name="radiogrup1" value="radio_3" id="radio_3">
                                        <label for="radio_2">RUPIAH </label>
                                    </div>
                                    <div>
                                        <input type="radio" name="radiogrup1" value="radio_4" id="radio_4">
                                        <label for="radio_3">Non RUPIAH</label>
                                    </div>
                                </div>
                            </div>
                            <p>
                            <div class="mb-3">
                                <button id="btn_proses" type="button" class="btn btn-success">Proses</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/RekapHutang.js') }}"></script>
@endsection
