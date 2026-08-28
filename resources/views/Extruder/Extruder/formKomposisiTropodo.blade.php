@extends('layouts.appExtruder')

@section('title')
    Komposisi Bahan Tropodo
@endsection

@section('content')
    <div class="extruder_root">
        <div id="komposisi_tropodo" class="form" data-aos="fade-up">

            <div class="row mt-3">
                <div class="col-md-3">
                    <span class="aligned-text">Komposisi:</span>
                </div>
                <div class="col-md-6 form-group">
                    <div class="input-group rounded">
                        <input type="text" id="id_komposisi" class="form-control"
                            style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                        <input type="text" id="nama_komposisi" class="form-control"
                            style="border-left: none; padding-left: 10px;"
                            placeholder="Pilih atau masukkan nama komposisi..." disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_komposisi" disabled> ...
                        </button>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-3">
                    <span class="aligned-text">Mesin:</span>
                </div>
                <div class="col-md-6 form-group">
                    <div class="input-group rounded">
                        <input type="text" id="id_mesin" class="form-control"
                            style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                        <input type="text" id="nama_mesin" class="form-control"
                            style="border-left: none; padding-left: 10px;" placeholder="Pilih Mesin..." disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_mesin" disabled> ...
                        </button>
                    </div>
                </div>
            </div>

            <div class="card mt-5">
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
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                    <div class="row mt-3">
                        <div class="col-md-7 form-group">
                            <label for="nama_objek">Objek:</label>
                            <div class="input-group rounded">
                                <input type="text" id="id_objek" class="form-control"
                                    style="max-width: 150px; border-right: none;" placeholder="ID">
                                <input type="text" id="nama_objek" class="form-control"
                                    style="border-left: none; padding-left: 10px" placeholder="Pilih Objek..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_objek" disabled>
                                    ...
                                </button>
                            </div>
                        </div>

                        <div class="col-md-4 form-group">
                            <label for="primer">Primer:</label>
                            <div class="input-group">
                                <input type="number" id="primer" class="form-control" style="border-right: none"
                                    placeholder="0" disabled>
                                <input type="text" id="sat_primer" class="form-control" style="border-left: none"
                                    disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-md-7 form-group">
                            <label for="nama_kelut">Kelompok Utama:</label>
                            <div class="input-group rounded">
                                <input type="text" id="id_kelut" class="form-control"
                                    style="max-width: 150px; border-right: none;" placeholder="ID">
                                <input type="text" id="nama_kelut" class="form-control"
                                    style="border-left: none; padding-left: 10px" placeholder="Pilih Kelompok Utama..."
                                    disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_kelut" disabled>
                                    ...
                                </button>
                            </div>
                        </div>

                        <div class="col-md-4 form-group">
                            <label for="sekunder">Sekunder:</label>
                            <div class="input-group">
                                <input type="number" id="sekunder" class="form-control" style="border-right: none"
                                    placeholder="0" disabled>
                                <input type="text" id="sat_sekunder" class="form-control" style="border-left: none"
                                    disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-md-7 form-group">
                            <label for="nama_kelompok">Kelompok:</label>
                            <div class="input-group rounded">
                                <input type="text" id="id_kelompok" class="form-control"
                                    style="max-width: 150px; border-right: none;" placeholder="ID">
                                <input type="text" id="nama_kelompok" class="form-control"
                                    style="border-left: none; padding-left: 10px" placeholder="Pilih Kelompok..."
                                    disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_kelompok"
                                    disabled>
                                    ...
                                </button>
                            </div>
                        </div>

                        <div class="col-md-4 form-group">
                            <label for="tritier">Tritier:</label>
                            <div class="input-group">
                                <input type="number" id="tritier" class="form-control" style="border-right: none"
                                    placeholder="0" disabled>
                                <input type="text" id="sat_tritier" class="form-control" style="border-left: none"
                                    disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-md-7 form-group">
                            <label for="nama_subkel">Sub-kelompok:</label>
                            <div class="input-group rounded">
                                <input type="text" id="id_subkel" class="form-control"
                                    style="max-width: 150px; border-right: none;" placeholder="ID">
                                <input type="text" id="nama_subkel" class="form-control"
                                    style="border-left: none; padding-left: 10px;" placeholder="Pilih Sub-kelompok..."
                                    disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_subkel"
                                    disabled>
                                    ...
                                </button>
                            </div>
                        </div>

                        <div class="col-md-2 form-group">
                            <label for="persentase">Presentase:</label>
                            <div class="input-group">
                                <input type="number" id="persentase" class="form-control" placeholder="0" disabled>
                                <span class="input-group-text">%</span>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-md-7 form-group">
                            <label for="nama_type">Type:</label>
                            <div class="input-group rounded">
                                <input type="text" id="id_type" class="form-control"
                                    style="max-width: 150px; border-right: none;" placeholder="ID">
                                <input type="text" id="nama_type" class="form-control"
                                    style="border-left: none; padding-left: 10px" placeholder="Pilih Type..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_type"
                                    disabled>
                                    ... </button>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-md-6">
                            <div class="row mt-2">
                                <div class="col-md-6" style="padding-left: 50px">BB: Bahan Baku</div>
                                <div class="col-md-6">HP: Hasil Produksi</div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-6" style="padding-left: 50px">BP: Bahan Pembantu</div>
                                <div class="col-md-6">AF: Afalan</div>
                            </div>
                        </div>

                        <div class="col-md-1"></div>

                        <div class="col-md-5 text-center">
                            <button type="button" id="btn_tambah_detail" class="btn btn-success" disabled>Tambah
                                Bahan</button>
                            <button type="button" id="btn_koreksi_detail" class="btn btn-warning"
                                disabled>Koreksi</button>
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
                <div class="col-md-2"></div>
                <div class="col-md-4 text-center">
                    <button type="button" id="btn_proses" class="btn btn-primary" disabled>Proses</button>
                    <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
                </div>
            </div>
        </div>
    </div>

    @include('Extruder.Extruder.modalLookUp')

    <script src="{{ asset('js/Extruder/ExtruderNet/komposisiTropodo.js') }}"></script>
@endsection
