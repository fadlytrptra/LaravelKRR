<div class="modal fade" id="barcodeBalikLamiModal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog" style="max-width: 90%;">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="barcodeBalikLamiModalLabel">Tambah Barcode Balik Lami </h5>
                <button type="button" class="close" data-bs-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="display: flex; flex-direction: row;gap:0.5%;margin: 8px;">
                    <div class="card" style="width: 100%;margin: 0.5%;padding:0.5%;">
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div style="overflow: auto; width: 100%; margin-bottom: 1%;">
                                <table id="table_asalKonversi">
                                    <thead>
                                        <tr style="white-space: nowrap">
                                            <th>Barcode Asal</th>
                                            <th>Nama Type Asal</th>
                                            <th>Jumlah Primer</th>
                                            <th>Jumlah Sekunder</th>
                                            <th>Jumlah Tritier</th>
                                            <th>Pengeluaran Sekunder</th>
                                            <th>Pengeluaran Tritier</th>
                                            <th>Sisa Persen Tritier</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 14%">
                                <label for="input_barcodeTambahan">Barcode Tambahan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="input_barcodeTambahan"
                                        name="input_barcodeTambahan">
                                </div>
                            </div>
                            <div class="form-group" style="width: 12%;align-content: end">
                                <button class="btn btn-info" id="btn_tambahBarcodeAsal">Tambah Barcode Asal</button>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 12%">
                                <label for="input_tanggalKonversi">Tanggal</label>
                                <div class="input-group">
                                    <input type="date" class="form-control" id="input_tanggalKonversi"
                                        name="input_tanggalKonversi">
                                </div>
                            </div>
                            <div class="form-group" style="width: 8%">
                                <label for="shiftBL">Shift</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="shiftBL" name="shiftBL"
                                        placeholder="[A] [B] [C]">
                                </div>
                            </div>
                            <div class="form-group" style="width: 12%" id="div_selectMesin">
                                <label for="select_mesin">Mesin</label>
                                <div class="input-group">
                                    <select name="select_mesin" id="select_mesin" class="form-control">
                                    </select>
                                </div>
                            </div>
                            <input type="hidden" name="idOrderKerja" id="idOrderKerja">
                            <div class="form-group" style="width: 8%">
                                <label for="nomor_ok">Order Kerja</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="nomor_ok" name="nomor_ok" readonly>
                                </div>
                            </div>
                            <div class="form-group" style="width: 10%">
                                <label for="kode_barangHasil">Kode Barang Hasil</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kode_barangHasil"
                                        name="kode_barangHasil" readonly>
                                </div>
                            </div>
                            <div class="form-group" style="width: 38%">
                                <label for="nama_barangHasil">Nama Barang Hasil</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="nama_barangHasil"
                                        name="nama_barangHasil" readonly>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 10%">
                                <label for="afalan_setting">Afalan Setting (KG)</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="afalan_setting"
                                        name="afalan_setting" min="0">
                                </div>
                            </div>
                            <div class="form-group" style="width: 8%;align-content: end">
                                <button class="btn btn-warning w-100" id="btn_timbangAfalan">Timbang</button>
                            </div>
                            <div class="form-group" style="width: 8%">
                                <label for="hasil_pcs" id="label_hasilPcs">Hasil Pcs</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="hasil_pcs" name="hasil_pcs"
                                        min="0">
                                </div>
                            </div>
                            <div class="form-group" style="width: 8%">
                                <label for="hasil_kg">Hasil Kg</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="hasil_kg" name="hasil_kg"
                                        min="0">
                                </div>
                            </div>
                            <div class="form-group" style="width: 8%;align-content: end">
                                <button class="btn btn-warning w-100" id="btn_timbang">Timbang</button>
                            </div>
                            <div class="form-group" style="width: 40%;border:none;">
                                <label for="pemakaian_typeAsal">Total Pemakaian Barcode Asal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="pemakaian_typePrimerAsal"
                                        name="pemakaian_typePrimerAsal" style="width:20%" readonly>
                                    <input type="text" class="form-control" id="satuan_pemakaianTypePrimerAsal"
                                        name="satuan_pemakaianTypePrimerAsal" style="width:13%" readonly>
                                    <input type="text" class="form-control" id="pemakaian_typeSekunderAsal"
                                        name="pemakaian_typeSekunderAsal" style="width:20%" readonly>
                                    <input type="text" class="form-control" id="satuan_pemakaianTypeSekunderAsal"
                                        name="satuan_pemakaianTypeSekunderAsal" style="width:13%" readonly>
                                    <input type="text" class="form-control" id="pemakaian_TritierAsal"
                                        name="pemakaian_TritierAsal" style="width:20%" readonly>
                                    <input type="text" class="form-control" id="satuan_pemakaianTritierAsal"
                                        name="satuan_pemakaianTritierAsal" style="width:13%" readonly>
                                </div>
                            </div>
                            <div class="form-group" style="width: 15%;align-content: end">
                                <button class="btn btn-primary w-100" id="btn_tambahBarcodeTujuan">Tambah Barcode Tujuan</button>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div style="overflow: auto; width: 100%; margin-bottom: 1%;">
                                <table id="table_tujuanKonversi">
                                    <thead>
                                        <tr style="white-space: nowrap">
                                            <th>Nama Type Tujuan</th>
                                            <th>Jumlah Primer</th>
                                            <th>Jumlah Sekunder</th>
                                            <th>Jumlah Tritier</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
