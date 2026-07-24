<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="tambahKegiatanMesinPotongModal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog" style="max-width: 95%">
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
                        <div class="form-group"style="flex: 0.15" id="div_parentSelectNamaMesin">
                            <label for="namaMesinPotong">Nama Mesin</label>
                            <div class="input-group">
                                <select name="namaMesinPotong" id="namaMesinPotong"></select>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="shiftPotong">Shift</label>
                            <div class="input-group">
                                <input type="text" name="shiftPotong" id="shiftPotong" class="form-control"
                                    placeholder="[P] [S] [M]" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.25">
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
                        <div class="form-group"style="flex: 0.09">
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
                        <div class="form-group"style="flex: 0.09">
                            <label for="statusReinforced">Reinforced</label>
                            <div class="input-group">
                                <input type="text" name="statusReinforced" id="statusReinforced"
                                    class="form-control" placeholder="[R] / [N]" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="beratRoll">Berat Roll (KG)</label>
                            <div class="input-group">
                                <input type="number" name="beratRoll" id="beratRoll" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.14">
                            <label for="panjangRoll">Panjang Roll (MTR)</label>
                            <div class="input-group">
                                <input type="number" name="panjangRoll" id="panjangRoll" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
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
                        <div class="form-group"style="flex: 0.22" id="div_parentSelectKodeBarangTableHit">
                            <label for="kodebarang_tableHit">Kode Barang Tabel Hit.</label>
                            <div class="input-group">
                                <select name="kodebarang_tableHit" id="kodebarang_tableHit"></select>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.25" id="div_parentSelectKomponenTableHit">
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
                        <div class="form-group" style="width: 15%;align-content: end;display: none">
                            <button class="btn btn-primary w-100" id="btn_isiJenisPotongan">Isi Jenis
                                Potongan</button>
                        </div>
                        <div class="form-group"style="flex: 0.14">
                            <label for="ukuranpanjang_tableHit">Uk. Panjang (CM)</label>
                            <div class="input-group">
                                <input type="number" name="ukuranpanjang_tableHit" id="ukuranpanjang_tableHit"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.14">
                            <label for="ukuranlebar_tableHit">Uk. Lebar (CM)</label>
                            <div class="input-group">
                                <input type="number" name="ukuranlebar_tableHit" id="ukuranlebar_tableHit"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                    </div>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.2">
                            <label for="hasil_potongJumlah">Jml. Hasil Potong</label>
                            <div class="input-group">
                                <input type="number" name="hasil_potongJumlah" id="hasil_potongJumlah"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.2">
                            <label for="hasil_potongBerat">Brt. Hasil Potong</label>
                            <div class="input-group">
                                <input type="number" name="hasil_potongBerat" id="hasil_potongBerat"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangHasil">Timbang</button>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="afalan_waLBR">Afalan WA (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_waLBR" id="afalan_waLBR" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="afalan_waKG">Afalan WA (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_waKG" id="afalan_waKG" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanWA">Timbang</button>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="afalan_weLBR">Afalan WE (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_weLBR" id="afalan_weLBR" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="afalan_weKG">Afalan WE (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_weKG" id="afalan_weKG" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanWE">Timbang</button>
                        </div>
                    </div>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.17">
                            <label for="afalan_lamiLBR">Afalan Lami (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_lamiLBR" id="afalan_lamiLBR" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.155">
                            <label for="afalan_lamiKG">Afalan Lami (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_lamiKG" id="afalan_lamiKG" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanLami">Timbang</button>
                        </div>
                        <div class="form-group"style="flex: 0.16">
                            <label for="afalan_tepiLBR">Afalan Tepi (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_tepiLBR" id="afalan_tepiLBR" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="afalan_tepiKG">Afalan Tepi (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_tepiKG" id="afalan_tepiKG" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanTepi">Timbang</button>
                        </div>
                        <div class="form-group"style="flex: 0.185">
                            <label for="afalan_settingLBR">Afalan Setting (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_settingLBR" id="afalan_settingLBR"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.18">
                            <label for="afalan_settingKG">Afalan Setting (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_settingKG" id="afalan_settingKG"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanSetting">Timbang</button>
                        </div>
                    </div>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.25">
                            <label for="afalan_lamiSambunganLBR">Afalan Lami Sambungan(LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_lamiSambunganLBR" id="afalan_lamiSambunganLBR"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.25">
                            <label for="afalan_lamiSambunganKG">Afalan Lami Sambungan(KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_lamiSambunganKG" id="afalan_lamiSambunganKG"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanLamiSambungan">Timbang</button>
                        </div>
                        <div class="form-group"style="flex: 0.25">
                            <label for="afalan_lamiEkorLBR">Afalan Lami Ekor(LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_lamiEkorLBR" id="afalan_lamiEkorLBR"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.25">
                            <label for="afalan_lamiEkorKG">Afalan Lami Ekor(KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_lamiEkorKG" id="afalan_lamiEkorKG"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanLamiEkor">Timbang</button>
                        </div>
                    </div>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.5">
                            <label for="afalan_lamiLubangLBR">Afalan Lami Lubang / Tebal Tipis / Tidak Lengket
                                (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_lamiLubangLBR" id="afalan_lamiLubangLBR"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.5">
                            <label for="afalan_lamiLubangKG">Afalan Lami Lubang / Tebal Tipis / Tidak Lengket
                                (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_lamiLubangKG" id="afalan_lamiLubangKG"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanLamiLubang">Timbang</button>
                        </div>
                    </div>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.15">
                            <label for="afalan_kotorLBR">Afalan Kotor (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_kotorLBR" id="afalan_kotorLBR"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="afalan_kotorKG">Afalan Kotor (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_kotorKG" id="afalan_kotorKG" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanKotor">Timbang</button>
                        </div>
                        <div class="form-group"style="flex: 0.4">
                            <label for="keterangan_kegiatan">Keterangan</label>
                            <div class="input-group">
                                <input type="text" name="keterangan_kegiatan" id="keterangan_kegiatan" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="afalan_totalLBR">Afalan Total (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_totalLBR" id="afalan_totalLBR"
                                    class="form-control" min="0" enterkeyhint="enter" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="afalan_totalKG">Afalan Total (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalan_totalKG" id="afalan_totalKG" class="form-control"
                                    min="0" enterkeyhint="enter" readonly>
                            </div>
                        </div>
                    </div>
                    @if (
                        $user == '4405' ||
                            $user == '4221' ||
                            $user == '4259' ||
                            $user == '8982' ||
                            $user == '4384' ||
                            $user == '4451' ||
                            $user == '4199')
                        <div class="d-flex" style="gap: 0.5%;width: 100%">
                        @else
                            <div style="display:none">
                    @endif
                    <div class="form-group"style="flex: 0.2">
                        <label for="panjangPemakaian">Panjang Pemakaian (MTR)</label>
                        <div class="input-group">
                            <input type="number" name="panjangPemakaian" id="panjangPemakaian" class="form-control"
                                min="0" enterkeyhint="enter" readonly>
                        </div>
                    </div>
                    <div class="form-group"style="flex: 0.16">
                        <label for="beratPemakaian">Berat Pemakaian (KG)</label>
                        <div class="input-group">
                            <input type="number" name="beratPemakaian" id="beratPemakaian" class="form-control"
                                min="0" enterkeyhint="enter" readonly>
                        </div>
                    </div>
                    <div class="form-group"style="flex: 0.24">
                        <label for="selisihPanjang">Selisih Panjang Pemakaian (MTR)</label>
                        <div class="input-group">
                            <input type="number" name="selisihPanjang" id="selisihPanjang" class="form-control"
                                min="0" enterkeyhint="enter" readonly>
                        </div>
                    </div>
                    <div class="form-group"style="flex: 0.2">
                        <label for="selisihBerat">Selisih Berat Pemakaian (KG)</label>
                        <div class="input-group">
                            <input type="number" name="selisihBerat" id="selisihBerat" class="form-control"
                                min="0" enterkeyhint="enter" readonly>
                        </div>
                    </div>
                    <div class="form-group"style="flex: 0.17">
                        <label for="afalan_persentaseKG">Persentase Afalan (KG)</label>
                        <div class="input-group">
                            <input type="number" name="afalan_persentaseKG" id="afalan_persentaseKG"
                                class="form-control" min="0" enterkeyhint="enter" readonly>
                            &nbsp;
                            <span style="font-size: large; align-self: center;">%</span>
                        </div>
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
