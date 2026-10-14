<style>
    #table_detail {
        width: 100% !important;
        white-space: nowrap;
    }

    #table_detail th,
    #table_detail td {
        white-space: nowrap;
        vertical-align: middle;
    }

    .table-container {
        width: 100%;
        overflow-x: auto;
    }
</style>
<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="tambahKegiatanMesinPrintingModal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog" style="max-width: 95%">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahKegiatanMesinPrintingLabel">Tambah Kegiatan Mesin</h5>
                <button type="button" class="close" id="closeTambahKegiatanMesinPrintingModal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group" style="flex: 0.1">
                            <label for="tanggalLog">Tanggal Log</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="tanggalLog" name="tanggalLog"
                                    enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15" id="div_parentSelectNamaMesin">
                            <label for="namaMesinPotong">No Mesin</label>
                            <div class="input-group">
                                <input type="text" name="noMesin" id="noMesin" class="form-control" value="PRINT"
                                    enterkeyhint="enter" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="shiftPrinting">Shift</label>
                            <div class="input-group">
                                <input type="text" name="shiftPrinting" id="shiftPrinting" class="form-control"
                                    placeholder="[P] [S] [M]" enterkeyhint="enter">
                            </div>
                        </div>
                    </div>
                    <div class="table-container">
                        <table class="table table-bordered" id="table_detail" style="width: 100%">
                            <thead class="table-dark">
                                <tr>
                                    <th>ID Detail</th>
                                    <th>Customer</th>
                                    <th>Kode Barang Tabel Hit.</th>
                                    <th>Kode Komponen</th>
                                    <th>Komponen Tabel Hit.</th>
                                    <th>Ukuran Panjang (CM)</th>
                                    <th>Ukuran Lebar (CM)</th>
                                    <th>Pemakaian Tinta (Warna)</th>
                                    <th>Berat Tinta Awal (KG)</th>
                                    <th>Berat Tinta Akhir (KG)</th>
                                    <th>Jumlah Kain (PCS)</th>
                                    <th>Hasil Printing (PCS)</th>
                                    <th>Berat Kain (KG)</th>
                                    <th>Afalan Printing (KG)</th>
                                    <th>Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.6" id="div_parentSelectCustomerTableHit">
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
                        <div class="form-group"style="flex: 0.4">
                            <label for="warnaTinta">Pemakaian Tinta (Warna)</label>
                            <div class="input-group">
                                <input type="text" name="warnaTinta" id="warnaTinta" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15" id="div_afalanWALBR">
                            <label for="beratTintaAwal">Berat Tinta Awal (KG)</label>
                            <div class="input-group">
                                <input type="number" name="beratTintaAwal" id="beratTintaAwal" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15" id="div_afalanWAKG">
                            <label for="beratTintaAkhir">Berat Tinta Akhir (KG)</label>
                            <div class="input-group">
                                <input type="number" name="beratTintaAkhir" id="beratTintaAkhir"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15" id="div_afalanWELBR">
                            <label for="jumlahKain">Jumlah Kain (PCS)</label>
                            <div class="input-group">
                                <input type="number" name="jumlahKain" id="jumlahKain" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15" id="div_afalanWEKG">
                            <label for="hasilPrinting">Hasil Printing (PCS)</label>
                            <div class="input-group">
                                <input type="number" name="hasilPrinting" id="hasilPrinting" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                    </div>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.18" id="div_afalanLamiKG">
                            <label for="beratKain">Berat Kain (KG)</label>
                            <div class="input-group">
                                <input type="number" name="beratKain" id="beratKain" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end" id="div_btnafalanLamiKG">
                            <button class="btn btn-warning w-100" id="btn_timbangBeratKain">Timbang</button>
                        </div>
                        <div class="form-group"style="flex: 0.18" id="div_afalanTepiKG">
                            <label for="afalanPrinting">Afalan Printing (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalanPrinting" id="afalanPrinting" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="width: 8%;align-content: end" id="div_btnafalanTepiKG">
                            <button class="btn btn-warning w-100" id="btn_timbangAfalanPrinting">Timbang</button>
                        </div>
                        <div class="form-group"style="flex: 0.7">
                            <label for="keterangan_kegiatan">Keterangan</label>
                            <div class="input-group">
                                <input type="text" name="keterangan_kegiatan" id="keterangan_kegiatan"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="d-flex align-self-center">
                            <button type="button" class="btn btn-primary h-25" id="btn_add">Add</button>
                            <button type="button" class="btn btn-warning h-25" id="btn_update">Update</button>
                            <button type="button" class="btn btn-danger h-25" id="btn_delete">Delete</button>
                        </div>
                    </div>
                    <hr>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.185" id="div_afalanWSettingBR">
                            <label for="pemakaianReduser">Pemakaian Reduser (KG)</label>
                            <div class="input-group">
                                <input type="number" name="pemakaianReduser" id="pemakaianReduser"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.18" id="div_afalanSettingKG">
                            <label for="pembersihan">Reduser untuk Pembersihan (KG)</label>
                            <div class="input-group">
                                <input type="number" name="pembersihan" id="pembersihan" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.18" id="div_afalanSettingKG">
                            <label for="buangAfalanTintaPail">Buang Afalan Tinta (PAIL)</label>
                            <div class="input-group">
                                <input type="number" name="buangAfalanTintaPail" id="buangAfalanTintaPail"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.18" id="div_afalanSettingKG">
                            <label for="buangAfalanTintaKG">Buang Afalan Tinta (KG)</label>
                            <div class="input-group">
                                <input type="number" name="buangAfalanTintaKG" id="buangAfalanTintaKG"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="total_beratTintaAwal">Total Berat Tinta Awal (KG)</label>
                            <div class="input-group">
                                <input type="number" name="total_beratTintaAwal" id="total_beratTintaAwal"
                                    class="form-control" min="0" enterkeyhint="enter" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="total_beratTintaAkhir">Total Berat Tinta Akhir (KG)</label>
                            <div class="input-group">
                                <input type="number" name="total_beratTintaAkhir" id="total_beratTintaAkhir"
                                    class="form-control" min="0" enterkeyhint="enter" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="total_jumlahKain">Total Jumlah Kain (PCS)</label>
                            <div class="input-group">
                                <input type="number" name="total_jumlahKain" id="total_jumlahKain"
                                    class="form-control" min="0" enterkeyhint="enter" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.15">
                            <label for="total_hasilPrinting">Total Hasil Printing (PCS)</label>
                            <div class="input-group">
                                <input type="number" name="total_hasilPrinting" id="total_hasilPrinting"
                                    class="form-control" min="0" enterkeyhint="enter" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="total_beratKain">Total Berat Kain (KG)</label>
                            <div class="input-group">
                                <input type="number" name="total_beratKain" id="total_beratKain"
                                    class="form-control" min="0" enterkeyhint="enter" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="total_afalanPrinting">Total Afalan Printing (KG)</label>
                            <div class="input-group">
                                <input type="number" name="total_afalanPrinting" id="total_afalanPrinting"
                                    class="form-control" min="0" enterkeyhint="enter" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="persen1">Persen 1</label>
                            <div class="input-group">
                                <input type="number" name="persen1" id="persen1" class="form-control"
                                    min="0" enterkeyhint="enter" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="persen2">Persen 2</label>
                            <div class="input-group">
                                <input type="number" name="persen2" id="persen2" class="form-control"
                                    min="0" enterkeyhint="enter" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="persen3">Persen 3</label>
                            <div class="input-group">
                                <input type="number" name="persen3" id="persen3" class="form-control"
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
            <button class="btn btn-success" id="button_modalProsesPrinting">Proses</button>
        </div>
    </div>
</div>
</div>
