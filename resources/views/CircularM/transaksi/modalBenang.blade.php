<div class="modal fade" id="modalBenang" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="modalBenangLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="modalBenangLabel">Benang Strip Gelondongan</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div class="row" style="margin-right: 5%; margin-left: 5%;">
                    <div class="col-md-2">
                        <label for="bng_id_order">Id Order</label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" id="bng_id_order" class="form-control form-control-sm" disabled>
                    </div>

                    <div class="col-md-2"></div>

                    <div class="col-md-2">
                        <label for="jml_bng_strip">Jml. Bng. Strip</label>
                    </div>
                    <div class="col-md-3">
                        <input type="number" id="jml_bng_strip" class="form-control form-control-sm" min="0"
                            placeholder="0" disabled>
                    </div>
                </div>

                <div class="card mt-3" style="margin-right: 5%; margin-left: 5%;">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2">
                                <label for="bng_sub_kategori">Sub Kategori</label>
                            </div>

                            <div class="col-md-6">
                                <select id="bng_sub_kategori" class="form-select form-select-sm">
                                    <option></option>
                                    @foreach ($listSubKategori as $d)
                                        <option value="{{ $d->no_sub_kategori }}">
                                            {{ $d->no_sub_kategori . ' | ' . $d->nama_sub_kategori }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-md-2">
                                <label for="bng_benang">Benang</label>
                            </div>

                            <div class="col-md-8">
                                <select id="bng_benang" class="form-select form-select-sm">
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-md-2">
                                <label for="bng_sub_kategori">Jumlah Benang</label>
                            </div>

                            <div class="col-md-4">
                                <input type="number" id="jml_bng" class="form-control form-control-sm" min="0"
                                    placeholder="0">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mt-4" style="margin-right: 2.5%; margin-left: 2.5%;">
                    <div class="card-body">
                        <h5 class="custom-card-header ms-3">Benang WA</h5>

                        <div class="row">
                            <div class="col-md-10">
                                <table id="table_benang_wa" class="table table-bordered table-hover">
                                    <thead>
                                        <th>Nama Barang</th>
                                        <th>Kode Barang</th>
                                        <th>Jumlah Benang</th>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div class="col-md-2"
                                style="display: flex; flex-wrap: wrap; align-content: center; justify-content: center;">
                                <button id="btn_wa_isi" type="button" class="btn btn-success mb-3"
                                    style="font-size: larger; width: -webkit-fill-available;">Isi</button>
                                <button id="btn_wa_koreksi" type="button" class="btn btn-warning mb-3"
                                    style="font-size: larger; width: -webkit-fill-available;">Koreksi</button>
                                <button id="btn_wa_hapus" type="button" class="btn btn-danger"
                                    style="font-size: larger; width: -webkit-fill-available;">Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mt-4" style="margin-right: 2.5%; margin-left: 2.5%;">
                    <div class="card-body">
                        <h5 class="custom-card-header ms-3">Benang WE</h5>

                        <div class="row">
                            <div class="col-md-10">
                                <table id="table_benang_we" class="table table-bordered table-hover">
                                    <thead>
                                        <th>Nama Barang</th>
                                        <th>Kode Barang</th>
                                        <th>Jumlah Benang</th>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div class="col-md-2"
                                style="display: flex; flex-wrap: wrap; align-content: center; justify-content: center;">
                                <button id="btn_we_isi" type="button" class="btn btn-success mb-3"
                                    style="font-size: larger; width: -webkit-fill-available;">Isi</button>
                                <button id="btn_we_koreksi" type="button" class="btn btn-warning mb-3"
                                    style="font-size: larger; width: -webkit-fill-available;">Koreksi</button>
                                <button id="btn_we_hapus" type="button" class="btn btn-danger"
                                    style="font-size: larger; width: -webkit-fill-available;">Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/Circular/transaksi/modalBenang.js') }}"></script>
