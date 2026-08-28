@extends('layouts.appGuard')
@section('content')
@section('title', 'ACC Gudang (Pemeriksaan Barang)')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">ACC Gudang (Pemeriksaan Barang)</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        @csrf
                        <div class="row mt-2">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="status_acc" id="status_acc"
                                        value="ACC">
                                    <label class="form-check-label font-weight-bold" for="status_acc">
                                        ACC
                                    </label>
                                </div>

                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="status_acc"
                                        id="status_batal_acc" value="Batal ACC">
                                    <label class="form-check-label font-weight-bold" for="status_batal_acc">
                                        Batal ACC
                                    </label>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-5">
                                <label for="radiobutton" class="form-check-label" id="labelRedisplay">Tanggal
                                    Pemeriksaan</label>
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
                        <div style="overflow-x: auto;">
                            <table style="width: 100%;" id="table_atas">
                                <thead class="table-dark">
                                    <tr>
                                        <th>ID Header</th>
                                        <th>Tanggal Muat</th>
                                        <th>Jam Muat</th>
                                        <th>Nopol</th>
                                        <th>Instansi</th>
                                        <th>Tujuan Kirim</th>
                                        <th>Sopir</th>
                                        <th>User Input</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div class="mb-3">
                            {{-- <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox_all" value="option2">
                                    <label class="form-check-label" for="checkbox_all">Pilih Semua</label>
                                </div> --}}
                            <br>
                            <div class="form-check mt-2 d-flex justify-content-start">
                                <button type="button" class="btn btn-success" id="btn_proses"
                                    style="width: 100px; margin-left: 5px;">Proses</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('Guard.Pemeriksaan.ModalPemeriksaanBarang')
@include('Guard.Pemeriksaan.ModalPemeriksaanBarangCustomer')
<script type="text/javascript" src="{{ asset('js/Guard/Pemeriksaan/ACCGudangPB.js') }}"></script>
@endsection
