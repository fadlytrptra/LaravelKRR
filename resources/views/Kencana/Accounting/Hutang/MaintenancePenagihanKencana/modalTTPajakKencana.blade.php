<div class="modal fade" id="modalTTPajak" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabelTTPajak">Tambah Faktur Pajak</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span>x</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="display:flex; flex-direction: row; gap: 5px">
                    <div style="flex-direction: column; width: 50%;">
                        <div class="form-group">
                            <label for="pajak_idDetail">Id Detail</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pajak_idDetail" name="pajak_idDetail" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pajak_nomorFaktur">Nomor Faktur</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pajak_nomorFaktur"
                                    name="pajak_nomorFaktur">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pajak_hargaMurni">Harga Murni</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pajak_hargaMurni"
                                    name="pajak_hargaMurni">
                            </div>
                        </div>
                    </div>
                    <div style="flex-direction: column; width: 50%;">
                        <div class="form-group">
                            <label for="pajak_nilaiPajak">Pajak (%)</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pajak_nilaiPajak"
                                    name="pajak_nilaiPajak">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pajak_hargaPPN">Harga PPN</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pajak_hargaPPN" name="pajak_hargaPPN" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pajak_kursPajak">Kurs</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pajak_kursPajak" name="pajak_kursPajak">
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 100%;text-align: center;">
                    <button class="btn btn-success" id="pajak_buttonSimpan">Simpan</button>
                </div>
            </div>
        </div>
    </div>
</div>
