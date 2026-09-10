@extends('Circular.layouts.app')

@section('title')
    History Salah
@endsection

@section('content')
    {{-- <div class="card mb-3">
        <div class="card-header">
            Maintenance Order
        </div> --}}
    <style>
        .container-tabel {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 15px;
        }

        .container-tabel .table {
            width: 100%;
        }

        .table-wrapper {
            flex: 1;
        }
    </style>

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">History Salah</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            @csrf
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="tanggal" class="form-label">Tanggal</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="date" class="form-control" id="tanggal" name="tanggal">
                                </div>
                                <div class="col-sm-2">
                                    <button class="btn btn-success" id="btn_proses">Proses</button>
                                </div>
                                <div class="col" style="text-align: right;">
                                    <button class="btn btn-danger" id="btn_batal">Batal</button>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="nama_mesin" class="form-label" style="font-weight: bold">Cek History</label>
                                </div>
                            </div>
                            <div class="container-tabel">
                                <div class="table-wrapper">
                                    <table class="table" id="table_kiri">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Type</th>
                                                <th>Meter</th>
                                                <th>Kg</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="table-wrapper">
                                    <table class="table" id="table_tengah">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Type</th>
                                                <th>Meter</th>
                                                <th>Kg</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="table-wrapper">
                                    <table class="table" id="table_kanan">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Type</th>
                                                <th>Cek Meter</th>
                                                <th>Cek Kg</th>
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
        </div>
    </div>
    <script src="{{ asset('js/Circular/koreksi/HistorySalah.js') }}"></script>
@endsection
