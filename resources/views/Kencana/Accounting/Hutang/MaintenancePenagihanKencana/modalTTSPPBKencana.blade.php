<div class="modal fade" id="modalTTSPPB" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog" style="max-width: 90%">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabelTTSPPB">Tambah SPPB</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span>x</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="display:flex; flex-direction: row; gap: 5px">
                    <div style="flex-direction: column; width: 50%;">
                        <div style="display: flex;flex-direction: row;gap: 1%;">
                            <div class="form-group"style="flex: 0.5;" id="sppb_select2ParentDivisi">
                                <label for="sppb_divisi">Divisi</label>
                                <div class="input-group">
                                    <select name="sppb_divisi" class="form-control" id="sppb_divisi"></select>
                                </div>
                            </div>
                            <div class="form-group" style="flex: 0.5">
                                <label for="sppb_nomorSPPB">Nomor SPPB</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="sppb_nomorSPPB"
                                        name="sppb_nomorSPPB">
                                </div>
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: row;">
                            <div class="form-group" style="flex: 0.7">
                                <label for="sppb_idPenagihan">Id Penagihan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="sppb_idPenagihan"
                                        name="sppb_idPenagihan" readonly>
                                </div>
                            </div>
                        </div>
                        <div style="flex-direction: column; width: 100%; border:1px grey solid; padding: 5px;">
                            <h4>Data SPPB</h4>
                            <div style="display: flex;flex-direction: row;gap: 1%;">
                                <div class="form-group"style="flex: 0.5;">
                                    <label for="sppb_noTerima">No. Terima</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="sppb_noTerima"
                                            name="sppb_noTerima" readonly>
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.5">
                                    <label for="sppb_kodeBarang">Kode Barang</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="sppb_kodeBarang"
                                            name="sppb_kodeBarang" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="sppb_namaBarang">Nama Barang</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="sppb_namaBarang"
                                        name="sppb_namaBarang" readonly>
                                </div>
                            </div>
                            <hr style="width: 100%;">
                            <div style="overflow: auto;">
                                <table class="mt-2" style="width: 100%;" id="sppb_tableDataSPPB">
                                    <thead style="white-space: nowrap;">
                                        <tr>
                                            <th>No.Terima</th>
                                            <th>Spesifikasi</th>
                                            <th>S. Jalan</th>
                                            <th>Qty</th>
                                            <th>Satuan</th>
                                            <th>Mata Uang</th>
                                            <th>Hrg. Satuan</th>
                                            <th>Total Harga</th>
                                            <th>Kurs</th>
                                            <th>Hrg. Disc</th>
                                            <th>Hrg. PPN</th>
                                            <th>Hrg. Terbayar</th>
                                            <th>Hrg. Terbayar Rp</th>
                                            <th>Tgl. Datang</th>
                                            <th>Tgl. Faktur</th>
                                            <th>Disc</th>
                                            <th>PPN</th>
                                            <th>Lunas</th>
                                            <th>Kode Barang</th>
                                            <th>No. Sat. Terima</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style="flex-direction: column; width: 50%; border:1px grey solid; padding: 5px;">
                        <h4>Data Penagihan</h4>
                        <div style="display: flex;flex-direction: row;gap: 1%;">
                            <div class="form-group" style="flex: 0.6">
                                <label for="sppb_qtyTagihan">Qty Tagihan</label>
                                <div class="input-group" style="gap: 1%;" id="sppb_select2ParentQtyTagihan">
                                    <input type="text" class="form-control" id="sppb_qtyTagihan"
                                        name="sppb_qtyTagihan" style="flex: 0.8;" readonly>
                                    <select name="sppb_satuanQtyTagihan" class="form-control" id="sppb_satuanQtyTagihan"
                                        style="flex: 0.2;"></select>
                                </div>
                            </div>
                            <div class="form-group" style="flex: 0.4">
                                <label for="sppb_mataUang">Mata Uang</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="sppb_mataUang" name="sppb_mataUang"
                                        readonly>
                                    <input type="hidden" name="sppb_idMataUang" id="sppb_idMataUang">
                                </div>
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: row;gap: 1%;">
                            <div class="form-group" style="flex: 0.4">
                                <label for="sppb_kurs">Kurs</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="sppb_kurs" name="sppb_kurs"
                                        readonly>
                                </div>
                            </div>
                        </div>
                        <hr style="width: 100%;">
                        <div style="display: flex;flex-direction: row;gap: 1%;">
                            <div style="display: flex;flex-direction: column;gap: 1%;flex: 0.2;">
                                <div class="form-group">
                                    <label for="sppb_discTagihan">Disc</label>
                                    <div class="input-group" style="gap: 1%;">
                                        <input type="text" class="form-control" id="sppb_discTagihan"
                                            name="sppb_discTagihan" style="flex: 0.8;" readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="sppb_ppnTagihan">PPN</label>
                                    <div class="input-group" style="gap: 1%;">
                                        <input type="text" class="form-control" id="sppb_ppnTagihan"
                                            name="sppb_ppnTagihan" style="flex: 0.8;" readonly>
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex;flex-direction: column;gap: 1%;flex: 0.8;">
                                <div class="form-group">
                                    <label for="sppb_hargaSatuan">Harga Satuan</label>
                                    <div style="display: flex;flex-direction: row;gap: 1%;">
                                        <input type="text" class="form-control" id="sppb_hargaSatuan"
                                            name="sppb_hargaSatuan"readonly>
                                        <input type="text" class="form-control" id="sppb_hargaSatuanRupiah"
                                            name="sppb_hargaSatuanRupiah"readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="sppb_hargaMurni">Harga Murni</label>
                                    <div style="display: flex;flex-direction: row;gap: 1%;">
                                        <input type="text" class="form-control" id="sppb_hargaMurni"
                                            name="sppb_hargaMurni"readonly>
                                        <input type="text" class="form-control" id="sppb_hargaMurniRupiah"
                                            name="sppb_hargaMurniRupiah"readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="sppb_hargaDisc">Harga Disc</label>
                                    <div style="display: flex;flex-direction: row;gap: 1%;">
                                        <input type="text" class="form-control" id="sppb_hargaDisc"
                                            name="sppb_hargaDisc"readonly>
                                        <input type="text" class="form-control" id="sppb_hargaDiscRupiah"
                                            name="sppb_hargaDiscRupiah"readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="sppb_hargaPPN">Harga PPN</label>
                                    <div style="display: flex;flex-direction: row;gap: 1%;">
                                        <input type="text" class="form-control" id="sppb_hargaPPN"
                                            name="sppb_hargaPPN"readonly>
                                        <input type="text" class="form-control" id="sppb_hargaPPNRupiah"
                                            name="sppb_hargaPPNRupiah"readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="sppb_hargaSubtotal">Subtotal Harga</label>
                                    <div style="display: flex;flex-direction: row;gap: 1%;">
                                        <input type="text" class="form-control" id="sppb_hargaSubtotal"
                                            name="sppb_hargaSubtotal"readonly>
                                        <input type="text" class="form-control" id="sppb_hargaSubtotalRupiah"
                                            name="sppb_hargaSubtotalRupiah" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr style="width: 100%;">
                        <div style="display: flex;flex-direction: row;gap: 1%;">
                            <button class="btn btn-primary" id="sppb_buttonIsi">Isi</button>
                            {{-- <button class="btn btn-warning" id="sppb_buttonKoreksi">Koreksi</button> --}}
                            <button class="btn btn-danger" id="sppb_buttonHapus">Hapus</button>
                        </div>
                        <hr style="width: 100%;">
                        <div style="overflow: auto;">
                            <table class="mt-2" style="width: 100%;" id="sppb_tableDataPenagihan">
                                <thead style="white-space: nowrap;">
                                    <tr>
                                        <th>No.Terima</th>
                                        <th>Hrg. Sat</th>
                                        <th>Kurs</th>
                                        <th>Disc</th>
                                        <th>PPN</th>
                                        <th>Hrg. Disc</th>
                                        <th>Hrg. PPN</th>
                                        <th>Qty. Tagih</th>
                                        <th>Satuan</th>
                                        <th>Hrg. Murni</th>
                                        <th>Hrg. Sat Rp</th>
                                        <th>Hrg. Murni Rp</th>
                                        <th>Hrg. Disc Rp</th>
                                        <th>Hrg. PPN Rp</th>
                                        <th>Kode Barang</th>
                                        <th>Nama Barang</th>
                                        <th>Mata Uang</th>
                                        <th>Id Mata Uang</th>
                                        <th>No. Satuan</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div style="width: 100%;text-align: center;">
                    <button class="btn btn-success" id="sppb_buttonSimpan">Simpan</button>
                </div>
            </div>
        </div>
    </div>
</div>
