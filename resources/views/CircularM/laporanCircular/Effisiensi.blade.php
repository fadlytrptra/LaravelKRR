@extends('Circular.layouts.app')

@section('title')
    Informasi Effisiensi per Hari
@endsection

@section('content')
    {{-- <div class="card mb-3">
        <div class="card-header">
            Maintenance Order
        </div> --}}

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Informasi Effisiensi per Hari</div>
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
                                <div class="col-sm-1">
                                    <button class="btn btn-success" id="btn_proses">Proses</button>
                                </div>
                                <div class="col-sm-1">
                                    <button class="btn btn-primary" id="btn_afalan">Afalan</button>
                                </div>
                                <div class="col-sm-2">
                                    <button class="btn btn-success" id="btn_excel">Export Excel</button>
                                </div>
                                <div class="col" style="text-align: right;">
                                    <button class="btn btn-danger" id="btn_batal">Batal</button>
                                </div>
                            </div>
                            {{-- <br> --}}
                            {{-- <div class="col-sm-3">
                                <label for="nama_mesin" class="form-label" style="font-weight: bold">Laporan Kegiatan Mesin
                                    per Hari</label>
                            </div> --}}
                            <table class="table table-bordered text-center align-middle" id="table_atas">
                                <thead class="table">
                                    <tr>
                                        <th rowspan="2">NO</th>
                                        <th rowspan="2">NO MESIN</th>
                                        <th rowspan="2">RPM</th>
                                        <th rowspan="2">NAMA BARANG</th>
                                        <th colspan="2">BENANG</th>
                                        <th colspan="2">PAGI</th>
                                        <th colspan="2">SORE</th>
                                        <th colspan="2">MALAM</th>
                                        <th colspan="2">RATA-RATA</th>
                                        <th rowspan="2">TTL<br>Mtr</th>
                                        <th rowspan="2">Efektivitas</th>
                                        <th rowspan="2">Sum Mtr P</th>
                                        <th rowspan="2">Sum Mtr S</th>
                                        <th rowspan="2">Sum Mtr M</th>
                                        <th rowspan="2">Sum Tot Mtr</th>
                                    </tr>
                                    <tr>
                                        <th>WARP</th>
                                        <th>WEFT</th>
                                        <th>Eff</th>
                                        <th>Mtr</th>
                                        <th>Eff</th>
                                        <th>Mtr</th>
                                        <th>Eff</th>
                                        <th>Mtr</th>
                                        <th>Eff</th>
                                        <th>Mtr</th>
                                        {{-- <th>Efektivitas</th> --}}
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <br>
                            <table class="table table-bordered text-center align-middle" id="table_bawah">
                                <thead class="table">
                                    <tr>
                                        <th rowspan="2">NO MESIN</th>
                                        <th rowspan="2">RPM</th>
                                        <th rowspan="2">NAMA BARANG</th>
                                        <th colspan="2">BENANG</th>
                                        <th colspan="2">AFALAN</th>
                                        <th rowspan="2">TOTAL METER</th>
                                    </tr>
                                    <tr>
                                        <th>WARP</th>
                                        <th>WEFT</th>
                                        <th>WA</th>
                                        <th>WE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/laporanCircular/Effisiensi.js') }}"></script>
@endsection
