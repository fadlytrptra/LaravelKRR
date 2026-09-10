@extends('Circular.layouts.app')

@section('title')
    Konversi Benang ke Hasil Rol
@endsection

@section('content')
    <style>
        .label_div {
            display: flex;
            align-items: center;
        }
    </style>

    <input type="hidden" id="hid_id_mesin" value="{{ $IdMesin }}">
    <input type="hidden" id="hid_id_order" value="{{ $IdOrder }}">
    <input type="hidden" id="hid_id_log" value="{{ $IdLog }}">

    {{-- <input type="hidden" id="hid_id_mesin" value="0">
    <input type="hidden" id="hid_id_order" value="0">
    <input type="hidden" id="hid_id_log" value="0"> --}}

    <div class="card">
        <div class="card-body" style="padding-left: 2.5%; padding-right: 2.5%;">
            <h5 class="custom-card-header ms-3">Hasil Konversi</h5>

            <div class="row mt-1">
                <div class="col-md-6" style="padding-right: 1.5%;">
                    <div class="row">
                        <div class="col-md-3 label_div">
                            <span class="alinged-text">Divisi</span>
                        </div>
                        <div class="col-md-9">
                            <div class="input-group input-group-sm">
                                <input type="text" id="id_divisi" class="form-control" style="width: 25%" disabled>
                                <input type="text" id="divisi" class="form-control" style="width: 75%" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-1">
                        <div class="col-md-3">
                            <span class="alinged-text">Objek</span>
                        </div>
                        <div class="col-md-9">
                            <div class="input-group input-group-sm">
                                <input type="text" id="id_objek" class="form-control" style="width: 25%" disabled>
                                <input type="text" id="objek" class="form-control" style="width: 75%" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-1">
                        <div class="col-md-3">
                            <span class="alinged-text">Kelompok Utama</span>
                        </div>
                        <div class="col-md-9">
                            <div class="input-group input-group-sm">
                                <input type="text" id="id_kelut" class="form-control" style="width: 25%" disabled>
                                <input type="text" id="kelut" class="form-control" style="width: 75%" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-1">
                        <div class="col-md-3">
                            <span class="alinged-text">Kode Type Barang</span>
                        </div>
                        <div class="col-md-9">
                            <input type="text" id="type_barang" class="form-control form-control-sm" disabled>
                        </div>
                    </div>
                </div>

                <div class="col-md-6" style="padding-left: 1.5%;">
                    <div class="row" style="visibility: hidden">
                        <div class="col-md-3">
                            <span style="color: white">temp</span>
                        </div>
                        <div class="col-md-9">
                            <input type="text" class="form-control form-control-sm">
                        </div>
                    </div>

                    <div class="row mt-1">
                        <div class="col-md-3 label_div">
                            <span class="alinged-text">Kelompok</span>
                        </div>
                        <div class="col-md-9">
                            <div class="input-group input-group-sm">
                                <input type="text" id="id_kelompok" class="form-control" style="width: 25%" disabled>
                                <input type="text" id="kelompok" class="form-control" style="width: 75%" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-1">
                        <div class="col-md-3 label_div">
                            <span class="alinged-text">Sub Kelompok</span>
                        </div>
                        <div class="col-md-9">
                            <select id="sub_kelompok" class="form-select form-select-sm">
                                <option></option>
                            </select>
                        </div>
                    </div>

                    <div class="row mt-1">
                        <div class="col-md-3 label_div">
                            <span class="alinged-text">Kode Barang</span>
                        </div>
                        <div class="col-md-7">
                            <input type="text" id="kode_barang" class="form-control form-control-sm" disabled>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-1 col-1-5 label_div">
                    <span class="alinged-text">Nama Barang</span>
                </div>
                <div class="col-md-1 col-10-5">
                    <input type="text" id="nama_barang" class="form-control form-control-sm" disabled>
                </div>
            </div>

            <div class="row mt-3 d-flex justify-content-center">
                <div class="col-md-2">
                    <label for="primer">Satuan Primer:</label>
                    <div class="input-group input-group-sm">
                        <input type="number" id="primer" class="form-control form-control-sm" min="0"
                            placeholder="0">
                        <span class="input-group-text" id="label_primer"></span>
                    </div>
                </div>

                <div class="col-md-2">
                    <label for="primer">Satuan Sekunder:</label>
                    <div class="input-group input-group-sm">
                        <input type="number" id="sekunder" class="form-control form-control-sm" min="0"
                            placeholder="0" value="{{ $JumlahMeter }}">
                        {{-- <input type="number" id="sekunder" class="form-control form-control-sm" min="0"
                            placeholder="0"> --}}
                        <span class="input-group-text" id="label_sekunder"></span>
                    </div>
                </div>

                <div class="col-md-2">
                    <label for="primer">Satuan Tritier:</label>
                    <div class="input-group input-group-sm">
                        <input type="number" id="tritier" class="form-control form-control-sm" min="0"
                            placeholder="0">
                        <span class="input-group-text" id="label_tritier"></span>
                    </div>
                </div>

                <div class="col-md-1"></div>

                <div class="col-md-2">
                    <label for="primer">Hasil Rumus Konversi:</label>
                    <input type="number" id="hasil_konversi" class="form-control form-control-sm" min="0"
                        placeholder="0" disabled>
                </div>
            </div>
        </div>
    </div>

    <div class="card mt-5">
        <div class="card-body" style="padding-left: 2.5%; padding-right: 2.5%;">
            <h5 class="custom-card-header ms-3">Asal Konversi</h5>

            <table id="table_asal" class="table table-bordered table-hover">
                <thead>
                    <th>Kd. Barang</th>
                    <th>Nama Barang</th>
                    <th>Primer</th>
                    <th>Sekunder</th>
                    <th>Tritier</th>
                    <th>Id Type</th>
                    <th>Saldo Primer</th>
                    <th>Saldo Sekunder</th>
                    <th>Saldo Tritier</th>
                    <th>Ket.</th>
                    <th>Sub Kel.</th>
                </thead>
                <tbody></tbody>
            </table>

            <div class="row mt-3">
                <div class="col-md-2">
                    <span class="aligned-text label_div">Total Pemakaian Benang</span>
                </div>
                <div class="col-md-2">
                    <input type="number" id="total_benang" class="form-control form-control-sm" min="0"
                        placeholder="0" disabled>
                </div>

                <div class="col-md-5"></div>

                <div class="col-md-3 d-flex justify-content-end">
                    <button id="btn_hitung" type="button" class="btn btn-info">Hitung Benang</button>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-3 mb-3">
        <div class="col-md-4">
            <div class="container text-center">
                <div class="row row-cols-2" style="text-align: left; color: blue;">
                    <div class="col">1 - Bng. Strip WA</div>
                    <div class="col">3 - Bng. WA</div>
                    <div class="col">2 - Bng. Strip WE</div>
                    <div class="col">4 - Bng. WE</div>
                </div>
            </div>
        </div>

        <div class="col-md-5"></div>

        <div class="col-md-3">
            <button type="submit" id="btn_proses" class="btn btn-primary mx-3 my-2" disabled>Proses</button>
            <button type="button" id="btn_keluar" class="btn btn-secondary mx-3 my-2">Keluar</button>
        </div>
    </div>
@endsection

@section('custom_js')
    <script>
        const url_SubKelompok = "{{ url('/pagination/get-sub-kelompok') }}"
    </script>

    <script src="{{ asset('js/transaksi/hasilKonversi.js') }}"></script>
@endsection
