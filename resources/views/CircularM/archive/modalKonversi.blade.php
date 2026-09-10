<style>
    .label_div {
        font-size: smaller;
        display: flex;
        align-items: center;
    }
</style>

<div class="modal fade" id="modalKonversi" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="modalKonversiLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="modalKonversiLabel">Konversi Benang ke Hasil Rol</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card mt-2">
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
                                            <input type="text" id="id_divisi" class="form-control" style="width: 25%"
                                                disabled>
                                            <input type="text" id="divisi" class="form-control" style="width: 75%"
                                                disabled>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-1">
                                    <div class="col-md-3 label_div">
                                        <span class="alinged-text">Objek</span>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="input-group input-group-sm">
                                            <input type="text" id="id_objek" class="form-control" style="width: 25%"
                                                disabled>
                                            <input type="text" id="objek" class="form-control" style="width: 75%"
                                                disabled>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-1">
                                    <div class="col-md-3 label_div">
                                        <span class="alinged-text">Kelompok Utama</span>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="input-group input-group-sm">
                                            <input type="text" id="id_kelut" class="form-control" style="width: 25%"
                                                disabled>
                                            <input type="text" id="kelut" class="form-control" style="width: 75%"
                                                disabled>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-1">
                                    <div class="col-md-3 label_div">
                                        <span class="alinged-text">Kode Type Barang</span>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="type_barang" class="form-control form-control-sm"
                                            disabled>
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
                                            <input type="text" id="id_kelompok" class="form-control"
                                                style="width: 25%" disabled>
                                            <input type="text" id="kelompok" class="form-control" style="width: 75%"
                                                disabled>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-1">
                                    <div class="col-md-3 label_div">
                                        <span class="alinged-text">Sub Kelompok</span>
                                    </div>
                                    <div class="col-md-9">
                                        <select id="sub_kelompok" class="form-select form-select-sm" disabled>
                                            <option selected disabled>-- Pilih Sub Kelompok --</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row mt-1">
                                    <div class="col-md-3 label_div">
                                        <span class="alinged-text">Kode Barang</span>
                                    </div>
                                    <div class="col-md-7">
                                        <input type="text" id="kode_barang" class="form-control form-control-sm"
                                            disabled>
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
                                <label style="font-size: smaller" for="primer">Satuan Primer:</label>
                                <div class="input-group input-group-sm">
                                    <input type="number" id="primer" class="form-control form-control-sm"
                                        min="0" placeholder="0" disabled>
                                    <span class="input-group-text" id="label_primer"></span>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <label style="font-size: smaller" for="primer">Satuan Sekunder:</label>
                                <div class="input-group input-group-sm">
                                    <input type="number" id="sekunder" class="form-control form-control-sm"
                                        min="0" placeholder="0" disabled>
                                    <span class="input-group-text" id="label_sekunder"></span>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <label style="font-size: smaller" for="primer">Satuan Tritier:</label>
                                <div class="input-group input-group-sm">
                                    <input type="number" id="tritier" class="form-control form-control-sm"
                                        min="0" placeholder="0" disabled>
                                    <span class="input-group-text" id="label_tritier"></span>
                                </div>
                            </div>

                            <div class="col-md-1"></div>

                            <div class="col-md-2">
                                <label style="font-size: smaller" for="primer">Hasil Rumus Konversi:</label>
                                <input type="number" id="hasil_konversi" class="form-control form-control-sm"
                                    min="0" placeholder="0" disabled>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mt-5">
                    <div class="card-body" style="padding-left: 2.5%; padding-right: 2.5%;">
                        <h5 class="custom-card-header ms-3">Asal Konversi</h5>

                        <table id="table_asal" class="cell-border hover">
                            <thead></thead>
                            <tbody></tbody>
                        </table>

                        <div class="row mt-3">
                            <div class="col-md-2">
                                <span class="aligned-text label_div">Total Pemakaian Benang</span>
                            </div>
                            <div class="col-md-2">
                                <input type="number" id="total_benang" class="form-control form-control-sm"
                                    min="0" placeholder="0" disabled>
                            </div>

                            <div class="col-md-4"></div>

                            <div class="col-md-3 d-flex justify-content-end">
                                <button id="btn_hitung" type="button" class="btn btn-info btn-sm">Hitung
                                    Benang</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="btn_konversi_proses" class="btn btn-primary"
                    data-bs-dismiss="modal">Proses</button>
                <button type="button" id="btn_konversi_keluar" class="btn btn-secondary"
                    data-bs-dismiss="modal">Keluar</button>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/Circular/transaksi/modalKonversi.js') }}"></script>
