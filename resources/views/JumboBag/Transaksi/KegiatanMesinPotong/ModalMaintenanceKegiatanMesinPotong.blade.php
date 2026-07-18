<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="tambahKegiatanMesinPotongModal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog" style="max-width: 90%">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahKegiatanMesinPotongLabel">Tambah Kegiatan Mesin</h5>
                <button type="button" class="close" id="closeTambahKegiatanMesinPotongModal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group" style="flex: 0.1">
                            <label for="tanggalLogMesinPotong">Tanggal Log</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="tanggalLogMesinPotong"
                                    name="tanggalLogMesinPotong" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12" id="div_parentSelectNamaMesin">
                            <label for="namaMesinPotong">Nama Mesin</label>
                            <div class="input-group">
                                <select name="namaMesinPotong" id="namaMesinPotong"></select>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.08">
                            <label for="shiftPotong">Shift</label>
                            <div class="input-group">
                                <input type="text" name="shiftPotong" id="shiftPotong" class="form-control"
                                    placeholder="[P] [S] [M]" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.2">
                            <label for="searchDataByBarcode">Cari Data Berdasarkan Barcode</label>
                            <div class="input-group">
                                <input type="text" name="searchDataByBarcode" id="searchDataByBarcode"
                                    class="form-control" placeholder="nomorIndeks-KodeBarang" enterkeyhint="enter">
                            </div>
                        </div>
                    </div>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.1">
                            <label for="ukuranRoll">Ukuran Roll</label>
                            <div class="input-group">
                                <input type="number" name="ukuranRoll" id="ukuranRoll" class="form-control"
                                    enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="rajutanWA">Rajutan WA</label>
                            <div class="input-group">
                                <input type="number" name="rajutanWA" id="rajutanWA" class="form-control"
                                    enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="rajutanWE">Rajutan WE</label>
                            <div class="input-group">
                                <input type="number" name="rajutanWE" id="rajutanWE" class="form-control"
                                    enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.08">
                            <label for="denierKain">Denier</label>
                            <div class="input-group">
                                <input type="number" name="denierKain" id="denierKain" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.08">
                            <label for="statusLami">Lami</label>
                            <div class="input-group">
                                <input type="text" name="statusLami" id="statusLami" class="form-control"
                                    placeholder="[L] / [N]" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.08">
                            <label for="warnaRoll">Warna</label>
                            <div class="input-group">
                                <input type="text" name="warnaRoll" id="warnaRoll" class="form-control"
                                    enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.08">
                            <label for="statusReinforced">Reinforced</label>
                            <div class="input-group">
                                <input type="text" name="statusReinforced" id="statusReinforced"
                                    class="form-control" placeholder="[R] / [N]" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.08">
                            <label for="beratRoll">Berat Roll</label>
                            <div class="input-group">
                                <input type="number" name="beratRoll" id="beratRoll" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="beratPemakaian">Berat Pemakaian</label>
                            <div class="input-group">
                                <input type="number" name="beratPemakaian" id="beratPemakaian" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.08">
                            <label for="nomor_mesinCL">No. Mesin CL</label>
                            <div class="input-group">
                                <input type="text" name="nomor_mesinCL" id="nomor_mesinCL" class="form-control"
                                    enterkeyhint="enter">
                            </div>
                        </div>
                    </div>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.25" id="div_parentSelectCustomerTableHit">
                            <label for="customer_tableHit">Customer</label>
                            <div class="input-group">
                                <select name="customer_tableHit" id="customer_tableHit"></select>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15" id="div_parentSelectKodeBarangTableHit">
                            <label for="kodebarang_tableHit">Kode Barang Tabel Hit.</label>
                            <div class="input-group">
                                <select name="kodebarang_tableHit" id="kodebarang_tableHit"></select>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.3" id="div_parentSelectKomponenTableHit">
                            <label for="komponen_tableHit">Komponen Tabel Hit.</label>
                            <div class="input-group">
                                <select name="komponen_tableHit" id="komponen_tableHit"></select>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15; display: none;" id="div_jenisPotongan">
                            <label for="jenisPotongan">Jenis Potongan</label>
                            <div class="input-group">
                                <input type="text" name="jenisPotongan" id="jenisPotongan" class="form-control"
                                    enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 12%;align-content: end">
                            <button class="btn btn-primary w-100" id="btn_isiJenisPotongan">Isi Jenis Potongan</button>
                        </div>
                        <div class="form-group"style="flex: 0.08">
                            <label for="ukuranpanjang_tableHit">Uk. Panjang</label>
                            <div class="input-group">
                                <input type="number" name="ukuranpanjang_tableHit" id="ukuranpanjang_tableHit"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.08">
                            <label for="ukuranlebar_tableHit">Uk. Lebar</label>
                            <div class="input-group">
                                <input type="number" name="ukuranlebar_tableHit" id="ukuranlebar_tableHit"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                    </div>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.16">
                            <label for="hasil_potongJumlah">Jml. Hasil Potong</label>
                            <div class="input-group">
                                <input type="number" name="hasil_potongJumlah" id="hasil_potongJumlah"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.16">
                            <label for="hasil_potongBerat">Brt. Hasil Potong</label>
                            <div class="input-group">
                                <input type="number" name="hasil_potongBerat" id="hasil_potongBerat"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangHasil">Timbang</button>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalan_wa">Afalan WA</label>
                            <div class="input-group">
                                <input type="number" name="afalan_wa" id="afalan_wa" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanWA">Timbang</button>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalan_we">Afalan WE</label>
                            <div class="input-group">
                                <input type="number" name="afalan_we" id="afalan_we" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanWE">Timbang</button>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalan_lami">Afalan Lami</label>
                            <div class="input-group">
                                <input type="number" name="afalan_lami" id="afalan_lami" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanLami">Timbang</button>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalan_tepi">Afalan Tepi</label>
                            <div class="input-group">
                                <input type="number" name="afalan_tepi" id="afalan_tepi" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanTepi">Timbang</button>
                        </div>
                    </div>
                </div>
                <div class="py-2" id="div_alasanEditPotong" style="display: none">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 1">
                            <label for="alasanEdit">Alasan Edit</label>
                            <div class="input-group">
                                <input type="text" name="alasanEdit" id="alasanEdit" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProsesPotong">Proses</button>
            </div>
        </div>
    </div>
</div>
