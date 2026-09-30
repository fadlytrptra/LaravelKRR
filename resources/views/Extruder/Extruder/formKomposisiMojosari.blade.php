@extends('layouts.appExtruder')

@section('title')
    Komposisi Bahan Mojosari
@endsection

@section('content')
    <style>
        .extruder_root {
            zoom: 0.8;
        }

        .label-span {
            width: 190px;
            justify-content: flex-start;
            font-weight: 500;
            background-color: transparent !important;
            border: none !important;
            padding-left: 0 !important;
        }

        .label-span-sm {
            width: 140px;
            justify-content: flex-start;
            font-weight: 500;
            background-color: transparent !important;
            border: none !important;
            padding-left: 0 !important;
        }

        #table_afalan_wrapper .dataTables_scrollBody {
            max-height: 150px !important;
            height: auto !important;
        }

        table.dataTable tbody td,
        #table_komposisi tbody tr td {
            padding: 2px 4px !important;
        }

        /* #table_komposisi_wrapper .dataTables_scrollBody {
                        height: auto !important;
                    } */
    </style>

    <div class="extruder_root">
        <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">

        <div id="form_komposisi_mojosari" class="form" data-aos="fade-up">
            <div id="master" class="row mt-2">
                <div class="col-md-7">

                    <div class="form-group mt-2">
                        <div class="input-group rounded">
                            <span class="input-group-text label-span">Komposisi:</span>
                            <input type="text" id="id_komposisi" class="form-control rounded-start"
                                style="max-width: 200px; border-right: none;" placeholder="ID" disabled>
                            <input type="text" id="nama_komposisi" class="form-control" style="border-left: none;"
                                placeholder="Pilih atau ketik nama komposisi baru..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_komposisi" disabled>
                                ...
                            </button>
                        </div>
                    </div>

                    <div class="form-group mt-2">
                        <div class="input-group rounded">
                            <span class="input-group-text label-span">Mesin:</span>
                            <input type="text" id="id_mesin" class="form-control rounded-start"
                                style="max-width: 200px; border-right: none;" placeholder="ID" disabled>
                            <input type="text" id="nama_mesin" class="form-control" style="border-left: none;"
                                placeholder="Pilih Mesin..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_mesin" disabled>
                                ...
                            </button>
                        </div>
                    </div>

                    <div class="form-group mt-2">
                        <div class="input-group rounded">
                            <span class="input-group-text label-span">Hasil Produksi:</span>
                            <input type="text" id="id_hp" class="form-control rounded-start"
                                style="max-width: 200px; border-right: none;" placeholder="ID" disabled>
                            <input type="text" id="nama_hp" class="form-control" style="border-left: none;"
                                placeholder="Pilih Hasil Produksi..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_hp" disabled>
                                ...
                            </button>
                        </div>
                    </div>

                    <div class="form-group mt-2">
                        <div class="input-group rounded">
                            <span class="input-group-text label-span">Hasil Produksi NG:</span>
                            <input type="text" id="id_ng" class="form-control rounded-start"
                                style="max-width: 200px; border-right: none;" placeholder="ID" disabled>
                            <input type="text" id="nama_ng" class="form-control" style="border-left: none;"
                                placeholder="Pilih Hasil Produksi NG..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_ng" disabled>
                                ...
                            </button>
                        </div>
                    </div>

                    <div class="form-group mt-2">
                        <div class="input-group rounded">
                            <span class="input-group-text label-span">Afalan:</span>
                            <input type="text" id="id_af" class="form-control rounded-start"
                                style="max-width: 200px; border-right: none" placeholder="ID" disabled>
                            <input type="text" id="nama_af" class="form-control" style="border-left: none;"
                                placeholder="Pilih Afalan..." disabled>
                            <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_af" disabled>
                                ...
                            </button>
                        </div>
                    </div>

                </div>

                <div class="col-md-5">
                    <div class="row mb-2">
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
                                        Produksi </label>
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

                    <div class="row mb-2">
                        <div class="col-md-4 d-flex align-items-end">
                            <button type="button" id="btn_tambah_afalan" class="btn btn-secondary rounded-3"
                                disabled>Tambah Afalan</button>
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

            <div class="card mt-2">
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

                    <div class="row mt-2">
                        <div class="col-md-7 form-group">
                            <div class="input-group rounded">
                                <span class="input-group-text label-span">Objek:</span>
                                <input type="text" id="id_objek" class="form-control rounded-start"
                                    style="max-width: 200px; border-right: none;" placeholder="ID">
                                <input type="text" id="nama_objek" class="form-control" style="border-left: none;"
                                    placeholder="Pilih Objek..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_objek"
                                    disabled>
                                    ...
                                </button>
                            </div>
                        </div>

                        <div class="col-md-4 form-group">
                            <div class="input-group">
                                <span class="input-group-text label-span-sm">Primer:</span>
                                <input type="number" min="0" id="primer" class="form-control rounded-start"
                                    style="border-right: none" placeholder="0" disabled>
                                <input type="text" id="sat_primer" class="form-control" style="border-left: none"
                                    disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-7 form-group">
                            <div class="input-group rounded">
                                <span class="input-group-text label-span">Kelompok Utama:</span>
                                <input type="text" id="id_kelut" class="form-control rounded-start"
                                    style="max-width: 200px; border-right: none;" placeholder="ID">
                                <input type="text" id="nama_kelut" class="form-control" style="border-left: none;"
                                    placeholder="Pilih Kelompok Utama..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_kelut"
                                    disabled>
                                    ...
                                </button>
                            </div>
                        </div>

                        <div class="col-md-4 form-group">
                            <div class="input-group">
                                <span class="input-group-text label-span-sm">Sekunder:</span>
                                <input type="number" min="0" id="sekunder" class="form-control rounded-start"
                                    style="border-right: none" placeholder="0" disabled>
                                <input type="text" id="sat_sekunder" class="form-control" style="border-left: none"
                                    disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-7 form-group">
                            <div class="input-group rounded">
                                <span class="input-group-text label-span">Kelompok:</span>
                                <input type="text" id="id_kelompok" class="form-control rounded-start"
                                    style="max-width: 200px; border-right: none" placeholder="ID">
                                <input type="text" id="nama_kelompok" class="form-control" style="border-left: none;"
                                    placeholder="Pilih Kelompok..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_kelompok"
                                    disabled>
                                    ...
                                </button>
                            </div>
                        </div>

                        <div class="col-md-4 form-group">
                            <div class="input-group">
                                <span class="input-group-text label-span-sm">Tritier:</span>
                                <input type="number" min="0" id="tritier" class="form-control rounded-start"
                                    style="border-right: none" placeholder="0" disabled>
                                <input type="text" id="sat_tritier" class="form-control" style="border-left: none"
                                    disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-7 form-group">
                            <div class="input-group rounded">
                                <span class="input-group-text label-span">Sub-kelompok:</span>
                                <input type="text" id="id_subkel" class="form-control rounded-start"
                                    style="max-width: 200px; border-right: none;" placeholder="ID">
                                <input type="text" id="nama_subkel" class="form-control" style="border-left: none;"
                                    placeholder="Pilih Sub-kelompok..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_subkel"
                                    disabled>
                                    ...
                                </button>
                            </div>
                        </div>

                        <div class="col-md-3 form-group">
                            <div class="input-group">
                                <span class="input-group-text label-span-sm">Persentase:</span>
                                <input type="number" id="persentase" min="0" class="form-control rounded-start"
                                    placeholder="0" disabled>
                                <span class="input-group-text">%</span>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-7 form-group">
                            <div class="input-group rounded">
                                <span class="input-group-text label-span">Type:</span>
                                <input type="text" id="id_type" class="form-control rounded-start"
                                    style="max-width: 200px; border-right: none" placeholder="ID">
                                <input type="text" id="nama_type" class="form-control" style="border-left: none;"
                                    placeholder="Pilih Type..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_type"
                                    disabled>
                                    ...
                                </button>
                            </div>
                        </div>

                        <div class="col-md-4 form-group">
                            <div class="input-group">
                                <span class="input-group-text label-span-sm">Kode Barang:</span>
                                <input type="text" id="kode_barang" class="form-control rounded-start" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-7" style="padding-left: 75px;">
                            BB: Bahan Baku<br>
                            BP: Bahan Pembantu
                        </div>

                        <div class="col-md-4 form-group">
                            <div class="input-group">
                                <span class="input-group-text label-span-sm">Cadangan:</span>
                                <input type="text" id="cadangan" class="form-control rounded-start" value="0"
                                    disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
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

            <div class="row mt-2 mb-5">
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
