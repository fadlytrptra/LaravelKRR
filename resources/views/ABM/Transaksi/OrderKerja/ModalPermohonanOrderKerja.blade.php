<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="tambahPermohonanOrderKerjaModal" tabindex="-1" data-backdrop="static">
    <div class="modal-dialog" style="max-width: 90%">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahPermohonanOrderKerjaLabel">Tambah Order Kerja </h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group" style="flex: 0.17">
                            <label for="jenisOrderKerja">Jenis Order Kerja</label>
                            <div class="input-group">
                                <select name="select_jenisOrderKerja" id="select_jenisOrderKerja" class="form-control">
                                    <option disabled selected>-- Pilih Jenis Order Kerja --</option>
                                    <option value="1">Woven</option>
                                    <option value="2">Starpak</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" style="flex: 0.12">
                            <label for="NomorOrderKerja">Nomor Order Kerja</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="NomorOrderKerja" name="NomorOrderKerja">
                            </div>
                            <span id="cekNomorOrderKerja"></span>
                        </div>
                        <div class="form-group"style="flex: 0.3">
                            <label for="suratPesanan">Surat Pesanan</label>
                            <div class="input-group">
                                <select name="select_suratPesananTujuan" id="select_suratPesananTujuan"
                                    class="form-control">
                                    <option disabled selected>-- Pilih Surat Pesanan --</option>
                                </select>
                                <button id="button_pakaiMemo" class="btn btn-info" style="display: inline;">↺ Pakai
                                    Memo</button>
                            </div>
                            <div class="input-group">
                                <input type="text" class="form-control hide-important" name="suratPesananValue"
                                    id="suratPesananValue">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.6">
                            {{-- <label for="customer">Customer</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="customerSuratPesanan"
                                    name="customerSuratPesanan" readonly>
                            </div> --}}
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.3">
                            <label for="customer">Customer</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="customerSuratPesanan"
                                    name="customerSuratPesanan" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="jumlahPesanan">Jumlah</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="jumlahPesanan" name="jumlahPesanan" min=0
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="kodeBarang">Kode Barang</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="kodeBarangJadi" name="kodeBarangJadi"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="sisaSaldo">Sisa Saldo</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="sisaSaldo" name="sisaSaldo">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.35">
                            <label for="packingSuratPesanan">Packing</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="packingSuratPesanan"
                                    name="packingSuratPesanan">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="namaBarang">Nama Barang</label>
                    <div class="input-group">
                        <div id="namaBarang" class="form-control" style="height: auto;"></div>
                    </div>
                </div>
                <label id="label_kodeBarang">Kode Barang</label>
                <div class="pt-2 hide-important" id="div_kodeBarangHasilProduksiWoven">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        {{-- <div class="mb-2 align-content-center"style="flex: 0.05">
                            <div class="input-group">
                                <input type="checkbox" class="from-control form-check-input ml-0"
                                    id="jenisOrderKerjaPrintingWoven" name="jenisOrderKerjaPrintingWoven" value=1>
                                <label for="jenisOrderKerjaPrintingWoven"
                                    class="from-control form-check-label ml-3">Woven</label>
                            </div>
                        </div> --}}
                        <div class="mb-2"style="flex: 0.15;">
                            <div class="input-group mb-2">
                                <input type="text" class="form-control" name="kodeBarangPrintingWoven"
                                    id="kodeBarangPrintingWoven" placeholder="KB Printing Woven" readonly>
                            </div>
                            <div class="input-group">
                                <input type="text" class="form-control" name="kodeBarangBalikLamiWoven"
                                    id="kodeBarangBalikLamiWoven" placeholder="KB Balik Lami Woven" readonly>
                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.3">
                            <div class="input-group mb-2">
                                <input type="text" class="form-control" name="namaBarangPrintingWoven"
                                    id="namaBarangPrintingWoven" placeholder="Nama Barang Printing Woven" readonly>
                            </div>
                            <div class="input-group">
                                <input type="text" class="form-control" name="namaBarangBalikLamiWoven"
                                    id="namaBarangBalikLamiWoven" placeholder="Nama Barang Balik Lami Woven" readonly>
                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.05">
                            <div class="input-group">
                                <input type="number" class="form-control"
                                    name="input_jumlahKodeBarangSetengahJadiWoven"
                                    id="input_jumlahKodeBarangSetengahJadiWoven" placeholder="Jumlah KB">
                            </div>
                        </div>
                        <div id="additionalInputsKBWoven" class="d-flex" style="flex: 0.5;gap: 1%">

                        </div>
                    </div>
                </div>
                <div class="pb-2 hide-important" id="div_kodeBarangHasilProduksiStarpak">
                    <div class="mb-2 align-content-center"style="flex: 0.05">
                        <div class="input-group">
                            <input type="checkbox" class="from-control form-check-input ml-0"
                                id="checkbox_patchIsEqual" name="checkbox_patchIsEqual" value=1>
                            <label for="checkbox_patchIsEqual" class="from-control form-check-label ml-3">Patch Atas
                                dan Patch Bawah Sama</label>
                        </div>
                    </div>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="mb-2"style="flex: 0.15">
                            <div class="input-group">
                                <input type="text" class="form-control" name="kodeBarangPrintingStarpak"
                                    id="kodeBarangPrintingStarpak" placeholder="KB Printing Starpak" readonly>
                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.325">
                            <div class="input-group">
                                <input type="text" class="form-control" name="namaBarangPrintingStarpak"
                                    id="namaBarangPrintingStarpak" placeholder="Nama Barang Printing Starpak"
                                    readonly>
                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.2">
                            <div class="input-group">
                                <input type="text" class="form-control" name="kodeBarangPrintingStarpakPatchAtas"
                                    id="kodeBarangPrintingStarpakPatchAtas"
                                    placeholder="KB Printing Starpak Patch Atas" readonly>
                            </div>
                            <div class="input-group">
                                <input type="text" class="form-control" name="kodeBarangPrintingStarpakPatchBawah"
                                    id="kodeBarangPrintingStarpakPatchBawah"
                                    placeholder="KB Printing Starpak Patch Bawah" readonly>
                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.325">
                            <div class="input-group">
                                <input type="text" class="form-control" name="namaBarangPrintingStarpakPatchAtas"
                                    id="namaBarangPrintingStarpakPatchAtas"
                                    placeholder="Nama Barang Printing Starpak Patch Atas" readonly>
                            </div>
                            <div class="input-group">
                                <input type="text" class="form-control" name="namaBarangPrintingStarpakPatchBawah"
                                    id="namaBarangPrintingStarpakPatchBawah"
                                    placeholder="Nama Barang Printing Starpak Patch Bawah" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 1%;width: 100%">
                        <div class="d-flex flex-column" style="gap: 5px;flex: 0.3">
                            <div class="form-group"style="flex: 0.1">
                                <label for="input_ukuran">Ukuran</label>
                                <div class="input-group align-items-center" style="gap: 5px">
                                    <input type="text" class="form-control" id="input_ukuran"
                                        name="input_ukuran"> CM
                                </div>
                            </div>
                            <div class="form-group"style="flex: 0.15">
                                <label for="input_rajutan">Rajutan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="input_rajutan"
                                        name="input_rajutan">
                                </div>
                            </div>
                            <div class="form-group"style="flex: 0.1">
                                <label for="input_denier">Denier</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="input_denier"
                                        name="input_denier">
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-column hide-important" style="gap: 5px;flex: 0.7;"
                            id="div_printingWoven">
                            <div class="d-flex" style="flex: 0.15;gap: 5px;">
                                <div class="form-group"style="flex: 0.2;">
                                    <label for="input_innerWoven">Inner</label>
                                    <div class="input-group" style="gap: 5px">
                                        <input type="text" class="form-control" id="input_innerWoven"
                                            name="input_innerWoven">
                                    </div>
                                </div>
                                <div class="form-group"style="flex: 0.2;">
                                    <label for="input_kertasWoven">Kertas</label>
                                    <div class="input-group align-items-center" style="gap: 5px">
                                        <input type="text" class="form-control" id="input_kertasWoven"
                                            name="input_kertasWoven">GSM
                                    </div>
                                </div>
                                <div class="form-group"style="flex: 0.6;">
                                    <label for="input_potongWoven">Potong</label>
                                    <div class="input-group align-items-center" style="gap: 5px">
                                        <input type="text" class="form-control" id="input_potongWoven"
                                            name="input_potongWoven">CM
                                    </div>
                                </div>
                            </div>
                            <div class="form-group"style="flex: 0.25">
                                <label for="input_jahitAtasWoven">Jahit Atas</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="input_jahitAtasWoven"
                                        name="input_jahitAtasWoven">
                                </div>
                            </div>
                            <div class="form-group"style="flex: 0.25">
                                <label for="input_jahitBawahWoven">Jahit Bawah</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="input_jahitBawahWoven"
                                        name="input_jahitBawahWoven">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2 hide-important" id="div_printingStarpak1">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.1">
                            <label for="input_drumKliseStarpak">Drum Klise Body</label>
                            <div class="input-group align-items-center" style="gap: 5px">
                                <input type="number" class="form-control" id="input_drumKliseStarpak"
                                    name="input_drumKliseStarpak">CM
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="input_panjangPotonganStarpak">Panjang Potongan</label>
                            <div class="input-group align-items-center" style="gap: 5px">
                                <input type="number" class="form-control" id="input_panjangPotonganStarpak"
                                    name="input_panjangPotonganStarpak">CM
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="input_coronaStarpak">Corona Body</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_coronaStarpak"
                                    name="input_coronaStarpak">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="input_printMaxStarpak">Print Max</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_printMaxStarpak"
                                    name="input_printMaxStarpak">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="input_airPermeabilityStarpak">Air Permeability</label>
                            <div class="input-group align-items-center" style="gap: 5px">
                                <input type="number" class="form-control" id="input_airPermeabilityStarpak"
                                    name="input_airPermeabilityStarpak">Nm³/h
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.5">
                            <label for="input_rollStarpak">Roll Body</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="input_rollStarpak"
                                    name="input_rollStarpak">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2 hide-important" id="div_printingStarpak2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.3">
                            <label for="input_kertasStarpak">Kertas</label>
                            <div class="input-group align-items-center">
                                <input type="text" class="form-control" id="input_kertasStarpak"
                                    name="input_kertasStarpak">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.3">
                            <label for="input_innerStarpak">Inner</label>
                            <div class="input-group align-items-center">
                                <input type="text" class="form-control" id="input_innerStarpak"
                                    name="input_innerStarpak">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.3">
                            <label for="input_spoonBondStarpak">Spoon Bond</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="input_spoonBondStarpak"
                                    name="input_spoonBondStarpak">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.1">
                            <label for="input_jumlahWarna">Jumlah Warna</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_jumlahWarna"
                                    name="input_jumlahWarna">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.43">
                            <label for="corakPrinting">Corak Printing</label>
                            <div class="input-group">
                                <input type="text" name="corakPrinting" id="corakPrinting" class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15" id="div_tanggalRencanaMulaiKerjaWoven">
                            <label for="input_tanggalRencanaMulaiKerjaWoven">Tanggal Rencana Mulai Kerja</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="input_tanggalRencanaMulaiKerjaWoven"
                                    name="input_tanggalRencanaMulaiKerjaWoven">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.17" id="div_tanggalRencanaSelesaiKerjaWoven">
                            <label for="input_tanggalRencanaSelesaiKerjaWoven">Tanggal Rencana Selesai Kerja</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="input_tanggalRencanaSelesaiKerjaWoven"
                                    name="input_tanggalRencanaSelesaiKerjaWoven">
                            </div>
                        </div>
                        <div class="form-group hide-important"style="flex: 0.15" id="div_warnaKarungWoven">
                            <label for="input_warnaKarungWoven">Warna Karung</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="input_warnaKarungWoven"
                                    name="input_warnaKarungWoven">
                            </div>
                        </div>
                    </div>
                </div>
                <div id="additionalInputs" class="row mt-2">
                    <!-- Container to add new inputs -->
                </div>
                <h4 id="title_starpakPatchAtas">Patch Atas</h4>
                <div class="py-2" id="div_rollPatchAtasStarpak">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.6">
                            <label for="input_rollStarpakPatchAtas" id="label_rollStarpakPatchAtas">
                                Roll Patch Atas
                            </label>
                            <div class="input-group">
                                <input type="text" name="input_rollStarpakPatchAtas"
                                    id="input_rollStarpakPatchAtas" class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.125">
                            <label for="input_drumKliseStarpakPatchAtas" id="label_drumKliseStarpakPatchAtas">Drum
                                Klise Patch Atas</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_drumKliseStarpakPatchAtas"
                                    name="input_drumKliseStarpakPatchAtas">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="input_coronaStarpakPatchAtas" id="label_coronaStarpakPatchAtas">Corona Patch
                                Atas</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_coronaStarpakPatchAtas"
                                    name="input_coronaStarpakPatchAtas">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="input_jumlahPatchAtas" id="label_jumlahPatchAtas">Jumlah Patch Atas</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_jumlahPatchAtas"
                                    name="input_jumlahPatchAtas">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2" id="div_rollPatchAtasStarpak2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.15">
                            <label for="input_jumlahWarnaPatchAtas" id="label_jumlahWarnaPatchAtas">
                                Jumlah Warna Patch Atas
                            </label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_jumlahWarnaPatchAtas"
                                    name="input_jumlahWarnaPatchAtas">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.6">
                            <label for="corakPrintingPatchAtas" id="label_corakPrintingPatchAtas">
                                Corak Printing Patch Atas
                            </label>
                            <div class="input-group">
                                <input type="text" name="corakPrintingPatchAtas" id="corakPrintingPatchAtas"
                                    class="form-control">
                            </div>
                        </div>
                        {{-- <div class="form-group"style="flex: 0.15">
                            <label></label>
                            <div class="input-group">
                                <button class="btn btn-secondary" id="button_patchIsEqual">Patch Sama</button>
                            </div>
                        </div> --}}
                    </div>
                </div>
                <div id="additionalInputsPatchAtas" class="row mt-2">
                    <!-- Container to add new inputs -->
                </div>
                <h4 id="title_starpakPatchBawah">Patch Bawah</h4>
                <div class="py-2" id="div_rollPatchBawahStarpak">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.6">
                            <label for="input_rollStarpakPatchBawah">Roll Patch Bawah</label>
                            <div class="input-group">
                                <input type="text" name="input_rollStarpakPatchBawah"
                                    id="input_rollStarpakPatchBawah" class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.125">
                            <label for="input_drumKliseStarpakPatchBawah">Drum Klise Patch Bawah</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_drumKliseStarpakPatchBawah"
                                    name="input_drumKliseStarpakPatchBawah">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.125">
                            <label for="input_coronaStarpakPatchBawah">Corona Patch Bawah</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_coronaStarpakPatchBawah"
                                    name="input_coronaStarpakPatchBawah">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.125">
                            <label for="input_jumlahPatchBawah">Jumlah Patch Bawah</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_jumlahPatchBawah"
                                    name="input_jumlahPatchBawah">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2" id="div_rollPatchBawahStarpak2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.15">
                            <label for="input_jumlahWarnaPatchBawah">Jumlah Warna Patch Bawah</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_jumlahWarnaPatchBawah"
                                    name="input_jumlahWarnaPatchBawah">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.6">
                            <label for="corakPrintingPatchBawah">Corak Printing Patch Bawah</label>
                            <div class="input-group">
                                <input type="text" name="corakPrintingPatchBawah" id="corakPrintingPatchBawah"
                                    class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <div id="additionalInputsPatchBawah" class="row mt-2">
                    <!-- Container to add new inputs -->
                </div>
                <div class="py-2" id="div_keterangan">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.5">
                            <label for="input_keterangan">Keterangan</label>
                            <div class="input-group">
                                <textarea class="form-control" name="input_keterangan" id="input_keterangan"></textarea>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.35;display: none" id="div_packingPalletWoven">
                            <label for="packingPalletWoven">Packing Pallet</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="packingPalletWoven"
                                    name="packingPalletWoven">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <div class="input-group">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="width: 100%; gap: 0.5%;">
                        <div class="form-group"style="flex: 0.3; display: none;" id="div_gambar_contohPacking">
                            <label for="gambar_contohPacking">Upload Gambar Contoh Packing</label>
                            <div class="input-group">
                                <input type="file" class="form-control-file" id="gambar_contohPacking"
                                    name="gambar_contohPacking" accept="image/*" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.7;display: none" id="div_previewGambar_contohPacking">
                            <label>Preview Gambar Contoh Packing</label>
                            <div id="imagePreview" style="padding: 10px; max-width: 500px;">
                                <img id="previewImg" src="#" alt="Preview Image"
                                    style="width: 100%; display: none; border: 1px solid black">
                            </div>
                            <br>
                            <button type="button" class="btn btn-secondary" id="clearImage"
                                style="width:100px">Clear</button>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
