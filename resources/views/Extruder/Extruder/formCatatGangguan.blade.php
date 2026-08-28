@extends('layouts.appExtruder')

@section('title')
    Pencatatan Gangguan Produksi
@endsection

@section('content')
    <div class="extruder_root">
        <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">

        <div id="tropodo_gangguan_produksi" class="form" data-aos="fade-up">
            <div id="card_transaksi" class="card mt-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-2">
                            <span class="aligned-text">Tanggal:</span>
                        </div>
                        <div class="col-lg-2">
                            <input type="date" id="tanggal" class="form-control">
                        </div>

                        <div class="col-lg-1"></div>

                        <div class="col-lg-1 row d-flex align-items-center">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="radio_status" id="radio_masuk">
                                <label class="form-check-label" for="radio_masuk">
                                    Masuk
                                </label>
                            </div>
                        </div>

                        <div class="col-lg-1 row d-flex align-items-center">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="radio_status" id="radio_libur">
                                <label class="form-check-label" for="radio_libur">
                                    Libur
                                </label>
                            </div>
                        </div>

                        <div class="col-lg-2">
                            <span class="aligned-text">No. Transaksi:</span>
                        </div>
                        <div class="col-lg-2">
                            <input type="text" id="no_transaksi" class="form-control">
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2">
                            <span class="aligned-text">Kode Mesin:</span>
                        </div>
                        <div class="col-lg-9">
                            <div class="input-group rounded">
                                <input type="text" id="id_mesin" class="form-control"
                                    style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                                <input type="text" id="nama_mesin" class="form-control"
                                    style="border-left: none; padding-left: 10px;" placeholder="Pilih kode Mesin..."
                                    disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_mesin" disabled>
                                    ...
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2">
                            <span class="aligned-text">Komposisi:</span>
                        </div>
                        <div class="col-lg-9">
                            <div class="input-group rounded">
                                <input type="text" id="id_komposisi" class="form-control"
                                    style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                                <input type="text" id="nama_komposisi" class="form-control"
                                    style="border-left: none; padding-left: 10px;" placeholder="Pilih kode Komposisi..."
                                    disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_komposisi"
                                    disabled> ...
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2">
                            <span class="aligned-text">Shift:</span>
                        </div>
                        <div class="col-lg-4">
                            <div class="input-group">
                                <input type="text" id="shift" class="form-control" style="max-width: 50px;">
                                <input type="time" id="shift_awal" class="form-control">
                                <span class="input-group-text">s/d</span>
                                <input type="time" id="shift_akhir" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="card_gangguan" class="card mt-3">
                <div class="card-body">

                    <div class="row">
                        <div class="col-lg-2">
                            <span class="aligned-text">Gangguan:</span>
                        </div>

                        <div class="col-lg-9" style="margin-left: 7.5px">
                            <div class="input-group rounded">
                                <input type="text" id="id_gangguan" class="form-control"
                                    style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                                <input type="text" id="nama_gangguan" class="form-control"
                                    style="border-left: none; padding-left: 10px;" placeholder="Pilih kode Gangguan..."
                                    disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_gangguan"
                                    disabled> ...
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">

                        <div class="col-lg-5">
                            <div class="row">
                                <div class="col-lg-5">
                                    <span class="aligned-text">Awal Gangguan:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="datetime-local" id="waktu_awal" class="form-control">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="aligned-text">Akhir Gangguan:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="datetime-local" id="waktu_akhir" class="form-control"
                                        onblur="hitungWaktu()">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="aligned-text">Jumlah Jam:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="number" id="jmlh_jam" class="form-control">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="aligned-text">Jumlah Menit:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="number" id="jmlh_menit" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 mt-3">
                            <label for="keterangan">Keterangan:</label>
                            <textarea id="keterangan" rows="5" cols="50" class="form-control"></textarea>
                        </div>

                    </div>

                </div>
            </div>

            <div id="card_tabel" class="card mt-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-3 d-flex align-items-center justify-content-end">
                            <span class="aligned-text">Data Bulan/Tahun:</span>
                        </div>

                        <div class="col-lg-3">
                            <div class="input-group">
                                <input type="text" id="data_tgl" class="form-control">
                                <button type="button" id="btn_ok" class="btn btn-primary">OK</button>
                            </div>
                        </div>
                    </div>

                    <table id="table_gangguan" class="hover cell-border">
                        <thead>
                            <tr>
                                <th>No. Transaksi</th>
                                <th>Tanggal</th>
                                <th>Id Mesin</th>
                                <th>Nama Mesin</th>
                                <th>Id Konversi</th>
                                <th>Id Gangguan</th>
                                <th>Nama Gangguan</th>
                                <th>Awal Gangguan</th>
                                <th>Akhir Gangguan</th>
                                <th>Jumlah Jam</th>
                                <th>Jumlah Menit</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php $tableWidth = 12; @endphp
                            <td colspan="{{ $tableWidth }}" style="padding-left: 250px">
                                <h1 class="mt-3">Tabel masih kosong...</h1>
                            </td>
                            @for ($i = 0; $i < $tableWidth - 1; $i++)
                                <td class="hidden"></td>
                            @endfor
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-5 text-center">
                    <button type="button" id="btn_isi" class="btn btn-success" style="margin-right: 5px">Isi</button>
                    <button type="button" id="btn_koreksi" class="btn btn-warning"
                        style="margin-right: 5px">Koreksi</button>
                    <button type="button" id="btn_hapus" class="btn btn-danger">Hapus</button>
                </div>
                <div class="col-md-2"></div>
                <div class="col-md-5 text-center">
                    <button type="button" id="btn_proses" class="btn btn-primary" style="margin-right: 5px"
                        disabled>Proses</button>
                    <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
                </div>
            </div>
        </div>
    </div>

    @include('Extruder.Extruder.modalLookUp')

    <script src="{{ asset('js/Extruder/ExtruderNet/catatGangguan.js') }}"></script>
@endsection
