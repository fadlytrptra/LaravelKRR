@extends('layouts.appGuard')

@section('content')
@section('title', 'SJ Sudah Kirim Customer')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">
                    SJ Sudah Kirim Customer
                </div>

                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    @csrf

                    <div class="row mt-2">
                        <div class="col-md-5">
                            <label for="tgl_awal">
                                Tanggal Muat
                            </label>

                            <div class="row">
                                <div class="col">
                                    <input type="date" class="form-control font-weight-bold" id="tgl_awal" name="tgl_awal">
                                </div>

                                <div class="col-auto">
                                    <label class="mt-2">
                                        s/d
                                    </label>
                                </div>

                                <div class="col">
                                    <input type="date" class="form-control font-weight-bold" id="tgl_akhir" name="tgl_akhir">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <button type="button" class="btn btn-info mt-4 w-100" id="btn_redisplay">
                                Redisplay
                            </button>
                        </div>
                    </div>

                    <br>

                    <div style="overflow-x: auto;">
                        <table style="width: 100%;" id="table_atas">
                            <thead class="table-dark">
                                <tr>
                                    <th>Id Header</th>
                                    <th>Tanggal Muat</th>
                                    <th>Jam Muat</th>
                                    <th>Instansi</th>
                                    <th>Tujuan Kirim</th>
                                    <th>Sopir</th>
                                    <th>Acc Gudang</th>
                                    <th>Waktu Acc Gudang</th>
                                    <th>User Input</th>
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

<script
    type="text/javascript"
    src="{{ asset('js/Guard/Pemeriksaan/SJSudahKirimCustomer.js') }}"
></script>

@endsection