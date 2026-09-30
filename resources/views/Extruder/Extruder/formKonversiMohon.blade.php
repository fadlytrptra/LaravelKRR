@extends('layouts.appExtruder')

@section('title')
    Permohonan Konversi
@endsection

@section('content')
    <style>
        .extruder_root {
            zoom: 0.8;
        }
        table.dataTable tbody td,
        #table_konversi tbody tr td,
        #table_komposisi tbody tr td {
            padding: 2px 4px !important;
        }

        .label-span {
            width: 160px;
            justify-content: flex-start;
            font-weight: 500;
            background-color: transparent !important;
            border: none !important;
            padding-left: 0 !important;
        }

        .label-span-sm {
            width: 95px;
            justify-content: flex-start;
            font-weight: 500;
            background-color: transparent !important;
            border: none !important;
            padding-left: 0 !important;
        }

        #table_konversi_wrapper .dataTables_scrollBody,
        #table_komposisi_wrapper .dataTables_scrollBody {
            max-height: 250px !important;
            /* height: auto !important; */
        }
    </style>
    <div class="extruder_root">
        <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] ?? 'B' }}">

        <div id="konversi_mohon" class="form" data-aos="fade-up">

            <div class="row mt-2">
                <div class="col-lg-7">
                    <div class="input-group rounded">
                        <span class="input-group-text label-span">No:</span>
                        <input type="text" id="id_konversi" class="form-control rounded-start"
                            placeholder="Pilih atau Masukan No Konversi..." disabled>
                        <input type="hidden" id="txt_konversi">
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_konversi" disabled>
                            ...
                        </button>
                    </div>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-lg-5">
                    <div class="input-group rounded">
                        <span class="input-group-text label-span">No. Order:</span>
                        <input type="text" id="id_order" class="form-control rounded-start"
                            style="max-width: 200px; border-right: none;" placeholder="ID" disabled>
                        <input type="text" id="txt_order" class="form-control" style="border-left: none;"
                            placeholder="Pilih Order..." disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_order"
                            disabled>...</button>
                    </div>
                </div>
                <div class="col-lg-auto" style="width: 4.16%;"></div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-text label-span-sm">Lot:</span>
                        <input type="number" id="lot" class="form-control rounded-start" placeholder="0"
                            min="0" step="1" disabled>
                    </div>
                </div>
                <div class="col-lg-auto" style="width: 4.16%;"></div>
                <div class="col-lg-4">
                    <div class="input-group">
                        <span class="input-group-text label-span-sm">Tanggal:</span>
                        <input type="date" id="tanggal" class="form-control rounded-start" disabled>
                    </div>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-lg-5">
                    <div class="input-group rounded">
                        <span class="input-group-text label-span">Spek:</span>
                        <input type="hidden" id="id_spek">
                        <input type="text" id="txt_spek" class="form-control rounded-start" placeholder="Pilih Spek..."
                            disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_spek"
                            disabled>...</button>
                    </div>
                </div>
                <div class="col-lg-auto" style="width: 4.16%;"></div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-text label-span-sm">Ukuran:</span>
                        <input type="number" id="ukuran" class="form-control rounded-start" placeholder="0"
                            step="0.01" min="0" disabled>
                    </div>
                </div>
                <div class="col-lg-auto" style="width: 4.16%;"></div>
                <div class="col-lg-4">
                    <div class="input-group rounded">
                        <span class="input-group-text label-span-sm">Shift:</span>
                        <input type="text" id="shift" class="form-control rounded-start"
                            style="max-width: 50px; border-right: none;" disabled>
                        <input type="time" id="shift_awal" class="form-control" style="border-left: none;"
                            value="00:00">
                        <span class="input-group-text">s/d</span>
                        <input type="time" id="shift_akhir" class="form-control" value="00:00">
                    </div>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-lg-5">
                    <div class="input-group rounded">
                        <span class="input-group-text label-span">Mesin:</span>
                        <input type="text" id="id_mesin" class="form-control rounded-start"
                            style="max-width: 200px; border-right: none;" placeholder="ID" disabled>
                        <input type="text" id="txt_mesin" class="form-control" style="border-left: none;"
                            placeholder="Pilih Mesin..." disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_mesin"
                            disabled>...</button>
                    </div>
                </div>
                <div class="col-lg-auto" style="width: 4.16%;"></div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-text label-span-sm">Denier:</span>
                        <input type="number" id="denier" class="form-control rounded-start" placeholder="0"
                            step="1" min="0" disabled>
                    </div>
                </div>
                <div class="col-lg-auto" style="width: 4.16%;"></div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-text label-span-sm">Mulai:</span>
                        <input type="time" id="waktu_mulai" class="form-control rounded-start" value="00:00">
                    </div>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-lg-5">
                    <div class="input-group rounded">
                        <span class="input-group-text label-span">Komposisi:</span>
                        <input type="text" id="id_komposisi" class="form-control"
                            style="max-width: 200px; border-right: none;" placeholder="ID" disabled>
                        <input type="text" id="txt_komposisi" class="form-control" style="border-left: none;"
                            placeholder="Pilih Komposisi..." disabled>
                        <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_komposisi"
                            disabled>...</button>
                    </div>
                </div>
                <div class="col-lg-auto" style="width: 4.16%;"></div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-text label-span-sm">Warna:</span>
                        <input type="text" id="warna" class="form-control rounded-start" placeholder="....." disabled>
                    </div>
                </div>
                <div class="col-lg-auto" style="width: 4.16%;"></div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-text label-span-sm">Selesai:</span>
                        <input type="time" id="waktu_selesai" class="form-control" value="00:00">
                    </div>
                </div>
                <div class="col-lg-2">
                    <input type="text" id="no_urut" class="form-control hidden" placeholder="Nomor Urut">
                </div>
            </div>

            <div class="card mt-2">
                <div class="card-body">
                    <table id="table_konversi" class="hover cell-border" tabindex="0">
                        <thead>
                            <tr>
                                <th>Nama Type</th>
                                <th>Qty. Primer</th>
                                <th>Sat. Primer</th>
                                <th>Qty. Sekunder</th>
                                <th>Sat. Sekunder</th>
                                <th>Qty. Tritier</th>
                                <th>Sat. Tritier</th>
                                <th>Presentase</th>
                                <th>Jenis</th>
                                <th>Id Sub-kel.</th>
                                <th>IdType</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                    <div class="row mt-2">
                        <div class="col-lg-6">
                            <table id="table_komposisi" class="hover cell-border" tabindex="1">
                                <thead>
                                    <tr>
                                        <th>Jenis</th>
                                        <th>Nama Type</th>
                                        <th>Sub-kelompok</th>
                                        <th>Id Subkel.</th>
                                        <th>IdType</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>

                        <div class="col-lg-6">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <span class="input-group-text label-span">Item Produksi:</span>
                                        <input type="text" id="id_produksi" class="form-control rounded-start"
                                            disabled style="max-width: 200px; border-right: none;">
                                        <input type="text" id="nama_produksi" class="form-control"
                                            style="border-left: none;" disabled>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-lg-6">
                                    <div class="input-group">
                                        <span class="input-group-text label-span">Stok Primer:</span>
                                        <input type="number" id="stok_primer" class="form-control rounded-start"
                                            disabled>
                                    </div>
                                </div>
                                <div class="col-lg-1"></div>
                                <div class="col-lg-5">
                                    <div class="input-group">
                                        <span class="input-group-text label-span-sm">Primer:</span>
                                        <input type="number" id="primer" class="form-control rounded-start"
                                            placeholder="0" min="0" step="any" disabled>
                                        <span id="sat_primer" class="input-group-text"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-lg-6">
                                    <div class="input-group">
                                        <span class="input-group-text label-span">Stok Sekunder:</span>
                                        <input type="number" id="stok_sekunder" class="form-control rounded-start"
                                            disabled>
                                    </div>
                                </div>
                                <div class="col-lg-1"></div>
                                <div class="col-lg-5">
                                    <div class="input-group">
                                        <span class="input-group-text label-span-sm">Sekunder:</span>
                                        <input type="number" id="sekunder" class="form-control rounded-start"
                                            placeholder="0" min="0" step="any" disabled>
                                        <span id="sat_sekunder" class="input-group-text"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-lg-6">
                                    <div class="input-group">
                                        <span class="input-group-text label-span">Stok Tritier:</span>
                                        <input type="number" id="stok_tritier" class="form-control rounded-start"
                                            disabled>
                                    </div>
                                </div>
                                <div class="col-lg-1"></div>
                                <div class="col-lg-5">
                                    <div class="input-group">
                                        <span class="input-group-text label-span-sm">Tritier:</span>
                                        <input type="number" id="tritier" class="form-control rounded-start"
                                            placeholder="0" min="0" step="any" disabled>
                                        <span id="sat_tritier" class="input-group-text"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-lg-3">
                                    <input type="text" id="jenis" class="form-control" placeholder="Jenis..."
                                        disabled>
                                </div>
                                <div class="col-lg-9">
                                    <div class="float-end">
                                        <button type="button" id="btn_baru_detail" class="btn btn-success"
                                            disabled>Tambah Item</button>
                                        <button type="button" id="btn_koreksi_detail" class="btn btn-warning"
                                            disabled>Koreksi</button>
                                        <button type="button" id="btn_hapus_detail" class="btn btn-danger"
                                            disabled>Hapus</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-2 mb-5">
                <div class="col-md-5 text-center">
                    <button type="button" id="btn_baru_master" class="btn btn-success">Konversi Baru</button>
                    <button type="button" id="btn_koreksi_master" class="btn btn-warning">Koreksi</button>
                    <button type="button" id="btn_hapus_master" class="btn btn-danger">Hapus</button>
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

    <script src="{{ asset('js/Extruder/ExtruderNet/konversiMohon_new.js') }}"></script>
@endsection
