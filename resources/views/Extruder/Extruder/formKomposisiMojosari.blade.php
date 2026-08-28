@extends('layouts.appExtruder')

@section('title')
    Komposisi Bahan Mojosari
@endsection

@section('content')
    <div class="extruder_root">
        <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">

        <div id="form_komposisi_mojosari" class="form" data-aos="fade-up">
            <div id="master" class="row mt-3">
                <div class="col-md-7">
                    <div class="form-group">
                        <label>Komposisi:</label>
                        <div class="input-group rounded">
                            <input type="text" id="id_komposisi" class="form-control"
                                style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                            <input type="text" id="nama_komposisi" class="form-control"
                                style="border-left: none; padding-left: 10px"
                                placeholder="Pilih atau ketik nama komposisi baru..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_komposisi" disabled>
                                ...
                            </button>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <label>Mesin:</label>
                        <div class="input-group rounded">
                            <input type="text" id="id_mesin" class="form-control"
                                style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                            <input type="text" id="nama_mesin" class="form-control"
                                style="border-left: none; padding-left: 10px" placeholder="Pilih Mesin..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_mesin" disabled> ...
                            </button>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <label>Hasil Produksi:</label>
                        <div class="input-group rounded">
                            <input type="text" id="id_hp" class="form-control"
                                style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                            <input type="text" id="nama_hp" class="form-control"
                                style="border-left: none; padding-left: 10px" placeholder="Pilih Hasil Produksi..."
                                disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_hp" disabled> ...
                            </button>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <label>Hasil Produksi NG:</label>
                        <div class="input-group rounded">
                            <input type="text" id="id_ng" class="form-control"
                                style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                            <input type="text" id="nama_ng" class="form-control"
                                style="border-left: none; padding-left: 10px" placeholder="Pilih Hasil Produksi NG..."
                                disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_ng" disabled> ...
                            </button>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <label>Afalan:</label>
                        <div class="input-group rounded">
                            <input type="text" id="id_af" class="form-control"
                                style="max-width: 150px; border-right: none" placeholder="ID" disabled>
                            <input type="text" id="nama_af" class="form-control"
                                style="border-left: none; padding-left: 10px" placeholder="Pilih Afalan..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_af" disabled> ...
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-md-5">
                    <div class="row" style="height: 20%;">
                        <div id="radio_container" class="hidden">
                            <div class="col-md-4 row d-flex align-items-center">
                                <div class="form-check" style="display: flex; justify-content: center;">
                                    <input class="form-check-input" type="radio" name="radio_jenis" id="radio_bb">
                                    <label class="form-check-label" for="radio_bb" style="padding-left: 7.5px"> Komposisi
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-4 row d-flex align-items-center">
                                <div class="form-check" style="display: flex; justify-content: center;">
                                    <input class="form-check-input" type="radio" name="radio_jenis" id="radio_hp">
                                    <label class="form-check-label" for="radio_hp" style="padding-left: 7.5px"> Hasil
                                        Produksi
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-4 row d-flex align-items-center">
                                <div class="form-check" style="display: flex; justify-content: center;">
                                    <input class="form-check-input" type="radio" name="radio_jenis" id="radio_af">
                                    <label class="form-check-label" for="radio_af" style="padding-left: 7.5px"> Afalan
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row" style="height: 80%;">
                        <div class="col-md-4 d-flex align-items-end">
                            <button type="button" id="btn_tambah_afalan" class="btn btn-secondary rounded-3"
                                style="margin-bottom: 7.5px" disabled>Tambah Afalan</button>
                        </div>
                        <div class="col-md-8">
                            <table id="table_afalan" class="hover cell-border">
                                <thead>
                                    <tr>
                                        <th>Kode Barang</th>
                                        <th>Nama Type</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-3">
                <div class="card-body">
                    <table id="table_komposisi" class="hover cell-border" tabindex="0">
                        <thead>
                            <tr>
                                <th>Jenis</th>
                                <th>Id Type</th>
                                <th>Nama Type</th>
                                <th>Qty. Primer</th>
                                <th>Sat. Primer</th>
                                <th>Qty. Sekunder</th>
                                <th>Sat. Sekunder</th>
                                <th>Qty. Tritier</th>
                                <th>Sat. Tritier</th>
                                <th>Persentase</th>
                                <th>Id Objek</th>
                                <th>Nama Objek</th>
                                <th>Id Kelut.</th>
                                <th>Nama Kelut.</th>
                                <th>Id Kelompok</th>
                                <th>Kelompok</th>
                                <th>Id Subkel.</th>
                                <th>Subkel.</th>
                                <th>Kode Barang</th>
                                <th>Cadangan</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                    <div class="row mt-3">
                        <div class="col-md-7 form-group">
                            <label>Objek:</label>
                            <div class="input-group rounded">
                                <input type="text" id="id_objek" class="form-control"
                                    style="max-width: 150px; border-right: none;" placeholder="ID">
                                <input type="text" id="nama_objek" class="form-control"
                                    style="border-left: none; padding-left: 10px" placeholder="Pilih Objek..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_objek"
                                    disabled>
                                    ... </button>
                            </div>
                        </div>

                        <div class="col-md-4 form-group">
                            <label>Primer:</label>
                            <div class="input-group">
                                <input type="number" min="0" id="primer" class="form-control"
                                    style="border-right: none" placeholder="0" disabled>
                                <input type="text" id="sat_primer" class="form-control" style="border-left: none"
                                    disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-md-7 form-group">
                            <label>Kelompok Utama:</label>
                            <div class="input-group rounded">
                                <input type="text" id="id_kelut" class="form-control"
                                    style="max-width: 150px; border-right: none;" placeholder="ID">
                                <input type="text" id="nama_kelut" class="form-control"
                                    style="border-left: none; padding-left: 10px" placeholder="Pilih Kelompok Utama..."
                                    disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_kelut"
                                    disabled>
                                    ... </button>
                            </div>
                        </div>

                        <div class="col-md-4 form-group">
                            <label>Sekunder:</label>
                            <div class="input-group">
                                <input type="number" min="0" id="sekunder" class="form-control"
                                    style="border-right: none" placeholder="0" disabled>
                                <input type="text" id="sat_sekunder" class="form-control" style="border-left: none"
                                    disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-md-7 form-group">
                            <label>Kelompok:</label>
                            <div class="input-group rounded">
                                <input type="text" id="id_kelompok" class="form-control"
                                    style="max-width: 150px; border-right: none" placeholder="ID">
                                <input type="text" id="nama_kelompok" class="form-control"
                                    style="border-left: none; padding-left: 10px" placeholder="Pilih Kelompok..."
                                    disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_kelompok"
                                    disabled> ... </button>
                            </div>
                        </div>

                        <div class="col-md-4 form-group">
                            <label>Tritier:</label>
                            <div class="input-group">
                                <input type="number" min="0" id="tritier" class="form-control"
                                    style="border-right: none" placeholder="0" disabled>
                                <input type="text" id="sat_tritier" class="form-control" style="border-left: none"
                                    disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-md-7 form-group">
                            <label>Sub-kelompok:</label>
                            <div class="input-group rounded">
                                <input type="text" id="id_subkel" class="form-control"
                                    style="max-width: 150px; border-right: none;" placeholder="ID">
                                <input type="text" id="nama_subkel" class="form-control"
                                    style="border-left: none; padding-left: 10px" placeholder="Pilih Sub-kelompok..."
                                    disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_subkel"
                                    disabled>
                                    ... </button>
                            </div>
                        </div>

                        <div class="col-md-2 form-group">
                            <label>Persentase:</label>
                            <div class="input-group">
                                <input type="number" id="persentase" min="0" class="form-control"
                                    placeholder="0" disabled>
                                <span class="input-group-text">%</span>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-md-7 form-group">
                            <label>Type:</label>
                            <div class="input-group rounded">
                                <input type="text" id="id_type" class="form-control"
                                    style="max-width: 150px; border-right: none" placeholder="ID">
                                <input type="text" id="nama_type" class="form-control"
                                    style="border-left: none; padding-left: 10px" placeholder="Pilih Type..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_type"
                                    disabled>
                                    ... </button>
                            </div>
                        </div>

                        <div class="col-md-4 form-group">
                            <label>Kode Barang:</label>
                            <input type="text" id="kode_barang" class="form-control" disabled>
                        </div>
                    </div>

                    <div class="row mt-3 justify-content-between">
                        <div class="col-md-3" style="padding-left: 75px;">
                            BB: Bahan Baku<br>
                            BP: Bahan Pembantu
                        </div>

                        <div class="col-md-3 form-group" style="margin-right: 218px">
                            <label>Cadangan:</label>
                            <div class="input-group">
                                <input type="text" id="cadangan" class="form-control" value="0" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col-md-12 d-flex justify-content-center">
                            <button type="button" id="btn_cadangan_detail" class="btn btn-info"
                                style="margin-right: 2em;" disabled>Tambah Cadangan</button>
                            <button type="button" id="btn_tambah_detail" class="btn btn-success"
                                style="margin-right: 2em;" disabled>Tambah Bahan</button>
                            <button type="button" id="btn_koreksi_detail" class="btn btn-warning"
                                style="margin-right: 2em;" disabled>Koreksi</button>
                            <button type="button" id="btn_hapus_detail" class="btn btn-danger" disabled>Hapus</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-3 mb-5">
                <div class="col-md-6 text-center">
                    <button type="button" id="btn_baru_master" class="btn btn-success">Komposisi Baru</button>
                    <button type="button" id="btn_koreksi_master" class="btn btn-warning">Koreksi</button>
                    <button type="button" id="btn_hapus_master" class="btn btn-danger">Hapus</button>
                </div>

                <div class="col-md-1 hidden">
                    <input type="number" min="0" id="persentase2" class="form-control hidden" placeholder="0">
                </div>
                <div class="col-md-1 hidden">
                    <input type="number" min="0" id="cadangan2" class="form-control hidden" placeholder="0">
                </div>

                <div class="col-md-4 text-center">
                    <button type="button" id="btn_proses" class="btn btn-primary" disabled>Proses</button>
                    <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
                </div>
            </div>
        </div>
    </div>

    @include('Extruder.Extruder.modalLookUp')

    <script src="{{ asset('js/Extruder/ExtruderNet/komposisiMojosari.js') }}"></script>
@endsection
