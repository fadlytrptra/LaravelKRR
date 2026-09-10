@extends('Circular.layouts.app')
@section('content')
@section('title', 'ACC Ganti Ukuran')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">ACC Ganti Ukuran</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        @csrf
                        {{-- <div class="row">
                            <div class="col-5">
                                <label for="radiobutton" class="form-check-label" id="labelRedisplay">Tanggal
                                    Ganti Ukuran</label>
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
                        </div> --}}
                        <div class="col-md-8">
                            <label for="radiobutton" class="form-check-label" id="labelRedisplay">
                                Tanggal Ganti Ukuran
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
                        <div style="overflow-x: auto;">
                            <table class ="table table-bordered text-center align-middle" id="table_atas"
                                style="width: 100%">
                                <thead class="table-dark" style="text-align: center">
                                    <tr>
                                        <th rowspan="2">ID</th>
                                        <th rowspan="2">Tanggal</th>
                                        <th rowspan="2">Type Mesin</th>
                                        <th rowspan="2">Mesin</th>
                                        <th rowspan="2">Ukuran Asal</th>
                                        <th rowspan="2">Ukuran Baru</th>
                                        <th rowspan="2">Berat Standart</th>
                                        <th rowspan="2">Berat Realita</th>
                                        <th colspan="2">Benang</th>
                                        <th rowspan="2">Jumlah Warp</th>
                                        <th rowspan="2">User Input</th>
                                        <th rowspan="2">Aksi</th>
                                    </tr>
                                    <tr>
                                        <th>WA</th>
                                        <th>WE</th>
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
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('Circular.transaksi.ModalGantiUkuran')
<script type="text/javascript" src="{{ asset('js/Circular/transaksi/ACCGantiUkuran.js') }}"></script>
@endsection
