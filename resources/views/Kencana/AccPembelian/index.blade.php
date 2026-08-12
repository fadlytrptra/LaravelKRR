@extends('layouts.appKencana')
@section('title', 'Acc Pembelian')

@section('content')

<div class="container-fluid">

    <div class="card shadow-sm">

        <div class="card-header bg-light">
            <h5 class="mb-0">
                <i class=""></i>
                ACC Pembelian
            </h5>
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table id="tblAccPembelian" class="table table-bordered table-hover table-sm nowrap" width="100%">
                    <thead class="thead-light">
                    <tr>
                        <th width="40">
                            <input type="checkbox" id="checkAll">
                        </th>
                        <th>Divisi</th>
                        <th>Tanggal</th>
                        <th>Jenis Barang</th>
                        <th>Type</th>
                        <th>Jumlah</th>
                        <th>Satuan</th>
                        <th>Harga Perkiraan</th>
                        <th>Keterangan Beli</th>
                        <th>Kd. Barang</th>
                        <th width="120">Dokumentasi</th>
                    </tr>
                    </thead>

                    <tbody>
                    </tbody>
                </table>
            </div>

            <div class="mt-3">
                <button
                    type="button"
                    class="btn btn-success mr-2"
                    id="btnProses">
                    <i class="fa fa-check"></i>
                    Proses Setuju
                </button>

                {{-- <button
                    type="button"
                    class="btn btn-warning"
                    id="btnGantiLevel">
                    Ganti level ACC untuk item terpilih
                    <br>
                    <small>(ke Level Manager)</small>
                </button> --}}
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/Kencana/AccPembelian.js') }}"></script>

@endsection
