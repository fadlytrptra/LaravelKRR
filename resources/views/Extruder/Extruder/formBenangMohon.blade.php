@extends('layouts.appExtruder')

@section('title')
    Permohonan Konversi NG
@endsection

@section('content')
    <div class="extruder_root">
        <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] ?? 'B' }}">
        <input type="hidden" id="form_rk_return">

        <div id="form_benang_mohon" class="form" data-aos="fade-up">

            <div class="row mt-3">
                <div class="col-lg-7"></div>
                <div class="col-lg-3">
                    <span class="aligned-text">Tanggal Mohon:</span>
                </div>
                <div class="col-lg-2">
                    <input type="date" id="tanggal_mohon" class="form-control">
                </div>
            </div>

            <div class="row mt-3 border-bottom"></div>

            <div class="row mt-3">
                <div class="col-lg-1">
                    <span class="aligned-text">Tanggal:</span>
                </div>
                <div class="col-lg-3">
                    <input type="date" id="tanggal" class="form-control unclickable">
                </div>

                <div class="col-lg-3">
                    <span class="aligned-text">Mesin:</span>
                </div>
                <div class="col-lg-3">
                    <input type="text" id="txt_mesin" class="form-control" disabled>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-lg-1">
                    <span class="aligned-text">Nomor:</span>
                </div>
                <div class="col-lg-4">
                    <div class="input-group rounded">
                        <input type="text" id="id_nomor" class="form-control"
                            style="max-width: 100px; border-right: none" placeholder="ID" disabled>
                        <input type="text" id="txt_nomor" class="form-control" style="border-left: none;"
                            placeholder="Pilih Nomor..." disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_nomor"
                            disabled>...</button>
                    </div>
                </div>

                <div class="col-lg-2">
                    <span class="aligned-text">Konversi:</span>
                </div>

                <div class="col-lg-5">
                    <div class="input-group rounded">
                        <input type="text" id="id_no_konversi" class="form-control"
                            style="max-width: 150px; border-right: none" placeholder="ID" disabled>
                        <input type="text" id="txt_no_konversi" class="form-control"
                            style="border-left: none; padding-left: 10px" placeholder="Pilih Nomor Konversi..." disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_no_konversi"
                            disabled>...</button>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-lg-1">
                    <span class="aligned-text">Shift:</span>
                </div>
                <div class="col-lg-4">
                    <div class="input-group">
                        <input type="text" id="shift" class="form-control" style="max-width: 50px;" disabled>
                        <input type="time" id="shift_awal" class="form-control unclickable">
                        <span class="input-group-text">s/d</span>
                        <input type="time" id="shift_akhir" class="form-control unclickable">
                    </div>
                </div>

                <div class="col-lg-2">
                    <span class="aligned-text">Type:</span>
                </div>
                <div class="col-lg-5">
                    <div class="input-group rounded">
                        <input type="text" id="id_type" class="form-control"
                            style="max-width: 150px; border-right: none" placeholder="ID" disabled>
                        <input type="text" id="txt_type" class="form-control"
                            style="border-left: none; padding-ledt: 10px" placeholder="Pilih Type..." disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_type"
                            disabled>...</button>
                    </div>
                </div>
            </div>

            <div class="card mt-3">
                <div class="card-header">Asal Konversi</div>
                <div class="card-body">
                    <table id="table_asal" class="hover cell-border">
                        <thead>
                            <tr>
                                <th>Id Type</th>
                                <th>Nama Type</th>
                                <th>Jumlah Primer</th>
                                <th>Jumlah Sekunder</th>
                                <th>Jumlah Tritier</th>
                                <th>Nama Objek</th>
                                <th>Nama Kel. Utama</th>
                                <th>Nama Kelompok</th>
                                <th>Nama Sub-kelompok</th>
                                <th>Id Objek</th>
                                <th>Id Kel. Ut.</th>
                                <th>Id Kelompok</th>
                                <th>Id Sub-kel.</th>
                                <th>Id Transaksi</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>

            <div class="card mt-3">
                <div class="card-header">Tujuan Konversi</div>
                <div class="card-body">
                    <table id="table_tujuan" class="hover cell-border">
                        <thead>
                            <tr>
                                <th>Id Type</th>
                                <th>Nama Type</th>
                                <th>Jumlah Primer</th>
                                <th>Jumlah Sekunder</th>
                                <th>Jumlah Tritier</th>
                                <th>Nama Objek</th>
                                <th>Nama Kel. Utama</th>
                                <th>Nama Kelompok</th>
                                <th>Nama Sub-kelompok</th>
                                <th>Id Objek</th>
                                <th>Id Kel. Ut.</th>
                                <th>Id Kelompok</th>
                                <th>Id Sub-kel.</th>
                                <th>Id Transaksi</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-5 text-center">
                    <button type="button" id="btn_isi" class="btn btn-success">Isi</button>
                    <button type="button" id="btn_koreksi" class="btn btn-warning">Koreksi</button>
                    <button type="button" id="btn_hapus" class="btn btn-danger">Hapus</button>
                </div>
                <div class="col-md-2"></div>
                <div class="col-md-5 text-center">
                    <button type="button" id="btn_proses" class="btn btn-primary" disabled>Proses</button>
                    <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
                </div>
            </div>
        </div>
    </div>

    @include('Extruder.Extruder.modalLookUp')
    @include('Extruder.Extruder.modalRincianKonversi')

    <script src="{{ asset('js\Extruder\ExtruderNet\benangMohon_new.js') }}"></script>
@endsection
