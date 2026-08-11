@extends('layouts.appExtruder')

@section('title')
    ACC Konversi
@endsection

@section('content')
    <style>
        #table_hasil,
        #table_konversi {
            font-size: 12px;
        }

        .sorting {
            font-size: 12px;
        }
    </style>

    <input type="hidden" id="hidden_input">
    <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">

    <div id="tropodo_konversi_acc" class="form" data-aos="fade-up">

        <div class="card mt-3">
            <div class="card-header">Daftar Konversi</div>

            <div class="card-body">
                <div class="row">

                    <div class="col-lg-6">
                        <div class="mt-3"></div>
                        <table id="table_konversi" class="hover cell-border">
                            <thead>
                                <tr>
                                    <th>No. Konversi</th>
                                    <th>Spek</th>
                                </tr>
                            </thead>

                        </table>
                    </div>

                    <div class="col-lg-6">

                        <div class="row mt-3">
                            <div class="col-lg-3">
                                <span class="aligned-text">Tanggal:</span>
                            </div>
                            <div class="col-lg-6">
                                <input type="date" id="tanggal" class="form-control unclickable">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-3">
                                <span class="aligned-text">Shift:</span>
                            </div>
                            <div class="col-lg-8">
                                <div class="input-group">
                                    <input type="text" id="shift" class="form-control" style="max-width: 50px; border-right: none;"
                                        disabled>
                                    <input type="time" id="shift_awal" class="form-control unclickable" style="border-left: none;">
                                    <span class="input-group-text">s/d</span>
                                    <input type="time" id="shift_akhir" class="form-control unclickable">
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-3">
                                <span class="aligned-text">Mesin:</span>
                            </div>
                            <div class="col-lg-9">
                                <div class="input-group">
                                    <input type="text" id="id_mesin" class="form-control border-right: none;" disabled>
                                    <input type="text" id="nama_mesin" class="form-control" style="width: 12.5vw; border-left: none;"
                                        disabled>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-3">
                                <span class="aligned-text">Ukuran:</span>
                            </div>
                            <div class="col-lg-4">
                                <input type="number" min="0" id="ukuran" class="form-control" placeholder="0"
                                    disabled>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-3">
                                <span class="aligned-text">Denier:</span>
                            </div>
                            <div class="col-lg-4">
                                <input type="number" min="0" id="denier" class="form-control" placeholder="0"
                                    disabled>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-7">
                                <div class="row">
                                    <div class="col-lg-5">
                                        <span class="aligned-text">Warna:</span>
                                    </div>

                                    <div class="col-lg-7">
                                        <input type="text" id="warna" class="form-control" disabled>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="aligned-text">Lot:</span>
                                    </div>

                                    <div class="col-lg-7">
                                        <input type="text" id="lot" class="form-control" disabled>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-5 row d-flex justify-content-center">
                                <div class="col-lg-10">
                                    <input type="number" id="no_urut" class="form-control" style="margin-top: 1.5em;"
                                        placeholder="Nomor urut">
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-3">
                                <span class="aligned-text">No. Order:</span>
                            </div>
                            <div class="col-lg-9">
                                <div class="input-group">
                                    <input type="text" id="id_order" class="form-control" style="border-right: none;" disabled>
                                    <input type="text" id="nama_order" class="form-control" style="width: 12.5vw; border-left: none;"
                                        disabled>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-3">
                                <span class="aligned-text">Komposisi:</span>
                            </div>
                            <div class="col-lg-9">
                                <div class="input-group">
                                    <input type="text" id="id_komposisi" class="form-control" style="border-right: none;" disabled>
                                    <input type="text" id="nama_komposisi" class="form-control"
                                        style="width: 12.5vw; border-left: none;" disabled>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3 mb-3">
                            <div class="col-lg-3">
                                <span class="aligned-text">Mulai:</span>
                            </div>
                            <div class="col-lg-3">
                                <input type="time" id="waktu_mulai" class="form-control unclickable">
                            </div>

                            <div class="col-lg-3">
                                <span class="aligned-text">Selesai:</span>
                            </div>
                            <div class="col-lg-3">
                                <input type="time" id="waktu_selesai" class="form-control unclickable">
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">Hasil Produksi</div>

            <div class="card-body">
                <table id="table_hasil" class="hover cell-border">
                    <thead>
                        <tr>
                            <th>Nama Type</th>
                            <th>ID Type</th>
                            <th>Qty. Primer</th>
                            <th>Sat. Primer</th>
                            <th>Qty. Sekunder</th>
                            <th>Sat. Sekunder</th>
                            <th>Qty. Tritier</th>
                            <th>Sat. Tritier</th>
                            <th>Persentase</th>
                            <th>Jenis</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            @php $tableWidth = 10; @endphp
                            <td colspan="{{ $tableWidth }}" class="text-center">
                                <h1 class="mt-3">Tabel masih kosong...</h1>
                            </td>
                            @for ($i = 0; $i < $tableWidth - 1; $i++)
                                <td class="hidden"></td>
                            @endfor
                        </tr>
                    </tbody>
                </table>

                <div class="row mt-3 d-flex justify-content-center">
                    <div class="col-lg-3" style="margin-right: 25px;">
                        <label for="total_bahan_terpakai">Total Bahan Terpakai:</label>
                        <input type="number" min="0" id="total_bahan_terpakai" class="form-control"
                            placeholder="0">
                    </div>
                    <div class="col-lg-3" style="margin-right: 25px;">
                        <label for="hasil_timbang">Hasil Timbang:</label>
                        <input type="number" min="0" id="hasil_timbang" class="form-control" placeholder="0">
                    </div>
                    <div class="col-lg-3">
                        <label for="afalan">Afalan:</label>
                        <input type="number" min="0" id="afalan" class="form-control" placeholder="0">
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-3 mb-5 float-end text-center">
            <button type="button" id="btn_proses" class="btn btn-success" disabled>Proses</button>
            <button type="button" id="btn_keluar" class="btn btn-danger">Keluar</button>
        </div>
    </div>

    <script src="{{ asset('js/Extruder/ExtruderNet/konversiACC_new.js') }}"></script>
@endsection
