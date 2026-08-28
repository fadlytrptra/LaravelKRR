@extends('layouts.appExtruder')

@section('title')
    ACC Konversi NG
@endsection

@section('content')
    <div class="extruder_root">
        <input type="hidden" id="hiddenKu">
        <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">

        <div id="tropodo_benang_acc" class="form" data-aos="fade-up">
            <div class="row mt-3">
                <div class="col-lg-2">
                    <span class="aligned-text" style="margin-top: 10px">Tanggal:</span>
                </div>

                <div class="col-lg-5">
                    <div class="input-group">
                        <input type="date" id="tanggal_awal" class="form-control">
                        <span class="input-group-text">s/d</span>
                        <input type="date" id="tanggal_akhir" class="form-control">
                        <button type="button" id="btn_ok" class="btn btn-primary">OK</button>
                    </div>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-lg-3">
                    <table id="table_konversi" class="hover cell-border">
                        <thead>
                            <tr>
                                <th>Id Konversi</th>
                                <th>Tanggal</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>

                <div class="col-lg-9">
                    <table id="table_detail" class="hover cell-border">
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Id Konversi</th>
                                <th>Uraian</th>
                                <th>Nama Type</th>
                                <th>Qty. Primer</th>
                                <th>Qty. Sekunder</th>
                                <th>Qty. Tritier</th>
                                <th>Objek</th>
                                <th>Kelut</th>
                                <th>Kelompok</th>
                                <th>Subkel</th>
                                <th>Id Subkel</th>
                                <th>Id Type</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>

            <div class="mt-3 mb-5 float-end text-center">
                <button type="button" id="btn_proses" class="btn btn-success">Proses</button>
                <button type="button" id="btn_keluar" class="btn btn-danger">Keluar</button>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/Extruder/ExtruderNet/benangACC_new.js') }}"></script>
@endsection
