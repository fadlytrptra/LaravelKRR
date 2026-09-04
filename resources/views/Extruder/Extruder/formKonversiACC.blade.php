@extends('layouts.appExtruder')

@section('title')
    ACC Konversi
@endsection

@section('content')
    {{-- <style>
        .aligned-text, label {
            font-size: 0.85rem;
            margin-bottom: 0;
            font-weight: 500;
        }
        .table-wrapper {
            max-height: 30vh;
        }
    </style> --}}
    <style>
        .extruder_root {
            transform: scale(0.8);
            transform-origin: top left;
            width: 111.11%;
        }
    </style>

    <div class="extruder_root">
        <input type="hidden" id="hidden_input">
        <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">

        <div id="tropodo_konversi_acc" class="form" data-aos="fade-up">

            <div class="card mt-1">
                <div class="card-header py-1">Daftar Konversi</div>

                <div class="card-body p-2">
                    <div class="row">


                        <div class="col-lg-6">
                            <div class="table-wrapper mt-1">
                                <table id="table_konversi" class="hover cell-border table-sm w-100">
                                    <thead class="table-light">
                                        <tr>
                                            <th>No. Konversi</th>
                                            <th>Spek</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>


                        <div class="col-lg-6">

                            <div class="row mt-1 align-items-center">
                                <div class="col-lg-3"><span class="aligned-text">Tanggal:</span></div>
                                <div class="col-lg-6">
                                    <input type="date" id="tanggal" class="form-control form-control-sm unclickable">
                                </div>
                            </div>

                            <div class="row mt-1 align-items-center">
                                <div class="col-lg-3"><span class="aligned-text">Shift:</span></div>
                                <div class="col-lg-8">
                                    <div class="input-group input-group-sm">
                                        <input type="text" id="shift" class="form-control"
                                            style="max-width: 50px; border-right: none;" disabled>
                                        <input type="time" id="shift_awal" class="form-control unclickable"
                                            style="border-left: none;">
                                        <span class="input-group-text">s/d</span>
                                        <input type="time" id="shift_akhir" class="form-control unclickable">
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-1 align-items-center">
                                <div class="col-lg-3"><span class="aligned-text">Mesin:</span></div>
                                <div class="col-lg-9">
                                    <div class="input-group input-group-sm">
                                        <input type="text" id="id_mesin" class="form-control"
                                            style="border-right: none;" disabled>
                                        <input type="text" id="nama_mesin" class="form-control"
                                            style="width: 12.5vw; border-left: none;" disabled>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-1 align-items-center">
                                <div class="col-lg-3"><span class="aligned-text">Ukuran:</span></div>
                                <div class="col-lg-4">
                                    <input type="number" min="0" id="ukuran" class="form-control form-control-sm"
                                        placeholder="0" disabled>
                                </div>
                            </div>

                            <div class="row mt-1 align-items-center">
                                <div class="col-lg-3"><span class="aligned-text">Denier:</span></div>
                                <div class="col-lg-4">
                                    <input type="number" min="0" id="denier" class="form-control form-control-sm"
                                        placeholder="0" disabled>
                                </div>
                            </div>

                            <div class="row mt-1 align-items-center">
                                <div class="col-lg-7">
                                    <div class="row align-items-center">
                                        <div class="col-lg-5"><span class="aligned-text">Warna:</span></div>
                                        <div class="col-lg-7">
                                            <input type="text" id="warna" class="form-control form-control-sm"
                                                disabled>
                                        </div>
                                    </div>
                                    <div class="row align-items-center mt-1">
                                        <div class="col-lg-5"><span class="aligned-text">Lot:</span></div>
                                        <div class="col-lg-7">
                                            <input type="text" id="lot" class="form-control form-control-sm"
                                                disabled>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-5 d-flex align-items-center justify-content-center">
                                    <div class="col-lg-10">
                                        <input type="number" id="no_urut" class="form-control form-control-sm"
                                            placeholder="Nomor urut">
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-1 align-items-center">
                                <div class="col-lg-3"><span class="aligned-text">No. Order:</span></div>
                                <div class="col-lg-9">
                                    <div class="input-group input-group-sm">
                                        <input type="text" id="id_order" class="form-control"
                                            style="border-right: none;" disabled>
                                        <input type="text" id="nama_order" class="form-control"
                                            style="width: 12.5vw; border-left: none;" disabled>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-1 align-items-center">
                                <div class="col-lg-3"><span class="aligned-text">Komposisi:</span></div>
                                <div class="col-lg-9">
                                    <div class="input-group input-group-sm">
                                        <input type="text" id="id_komposisi" class="form-control"
                                            style="border-right: none;" disabled>
                                        <input type="text" id="nama_komposisi" class="form-control"
                                            style="width: 12.5vw; border-left: none;" disabled>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-1 mb-1 align-items-center">
                                <div class="col-lg-3"><span class="aligned-text">Mulai:</span></div>
                                <div class="col-lg-3">
                                    <input type="time" id="waktu_mulai"
                                        class="form-control form-control-sm unclickable">
                                </div>
                                <div class="col-lg-3"><span class="aligned-text">Selesai:</span></div>
                                <div class="col-lg-3">
                                    <input type="time" id="waktu_selesai"
                                        class="form-control form-control-sm unclickable">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-2">
                <div class="card-header py-1">Hasil Produksi</div>

                <div class="card-body p-2">
                    <div class="table-wrapper">
                        <table id="table_hasil" class="hover cell-border table-sm w-100">
                            <thead class="table-light">
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
                                        <h6 class="mt-2 mb-2 text-muted">Tabel masih kosong...</h6>
                                        <!-- h1 diubah ke h6 agar tidak makan tempat -->
                                    </td>
                                    @for ($i = 0; $i < $tableWidth - 1; $i++)
                                        <td class="hidden"></td>
                                    @endfor
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="row mt-2 d-flex justify-content-center">
                        <div class="col-lg-3">
                            <label for="total_bahan_terpakai">Total Bahan Terpakai:</label>
                            <input type="number" min="0" id="total_bahan_terpakai"
                                class="form-control form-control-sm" placeholder="0">
                        </div>
                        <div class="col-lg-3">
                            <label for="hasil_timbang">Hasil Timbang:</label>
                            <input type="number" min="0" id="hasil_timbang" class="form-control form-control-sm"
                                placeholder="0">
                        </div>
                        <div class="col-lg-3">
                            <label for="afalan">Afalan:</label>
                            <input type="number" min="0" id="afalan" class="form-control form-control-sm"
                                placeholder="0">
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-2 mb-2 float-end text-center">
                <button type="button" id="btn_proses" class="btn btn-sm btn-success" disabled>Proses</button>
                <button type="button" id="btn_keluar" class="btn btn-sm btn-danger">Keluar</button>
            </div>
            <div class="clearfix"></div>

        </div>
    </div>

    <script src="{{ asset('js/Extruder/ExtruderNet/konversiACC_new.js') }}"></script>
@endsection
