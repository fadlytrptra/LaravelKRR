<div class="modal fade" id="createBTTBModal" tabindex="-1">
    <div class="modal-dialog" style="max-width: 1200px;">
        <div class="modal-content" id="select2DropdownParent">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="createBTTBModalLabel">Maintenance BTTB </h5>
                <button type="button" class="close" data-bs-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <input type="hidden" name="bttb_noTerima" id="bttb_noTerima"
                                class="form-control font-weight-bold" readonly>
                            <div class="col-md-2 mb-3">
                                <label class="font-weight-bold" for="bttb_kodeBarang">Kode Barang</label>
                                <input type="text" name="bttb_kodeBarang" id="bttb_kodeBarang"
                                    class="form-control font-weight-bold" readonly>
                            </div>
                            <div class="col-md-10 mb-3">
                                <label class="font-weight-bold" for="bttb_namaBarang">Nama Barang</label>
                                <input type="text" name="bttb_namaBarang" id="bttb_namaBarang"
                                    class="form-control font-weight-bold" readonly>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2 mb-3">
                                <label class="font-weight-bold" for="bttb_tanggal">Tanggal</label>
                                <input type="date" name="bttb_tanggal" id="bttb_tanggal"
                                    class="form-control font-weight-bold">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="font-weight-bold" for="bttb_qtyTerima">Qty Terima</label>
                                <div style="display: flex; flex-direction: row;gap: 1%">
                                    <input type="number" name="bttb_qtyTerima" id="bttb_qtyTerima"
                                        class="form-control font-weight-bold" style="width: 60%" min="0">
                                    <input type="text" name="bttb_satTerima" id="bttb_satTerima"
                                        class="form-control font-weight-bold" style="width: 40%" readonly>
                                    <input type="hidden" name="bttb_noSatTerima" id="bttb_noSatTerima"
                                        class="form-control font-weight-bold" style="width: 40%" readonly>
                                    <input type="hidden" name="bttb_qtyTerimaKoreksi" id="bttb_qtyTerimaKoreksi"
                                        class="form-control font-weight-bold" style="width: 60%" min="0">
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="font-weight-bold" for="bttb_qtyTerimaActual">
                                    Qty Terima (Actual)
                                </label>

                                <div class="d-flex align-items-center" style="gap:5px;">

                                    <input type="number"
                                        name="bttb_qtyTerimaActual"
                                        id="bttb_qtyTerimaActual"
                                        class="form-control font-weight-bold"
                                        style="width:35%;"
                                        min="0">

                                    <input type="text"
                                        name="bttb_satTerimaActual"
                                        id="bttb_satTerimaActual"
                                        class="form-control font-weight-bold"
                                        style="width:30%;"
                                        readonly>

                                    <button type="button"
                                            id="btnCariSatuan"
                                            class="btn btn-secondary btn-sm"
                                            style="width:40px;">
                                        ...
                                    </button>

                                    <input type="text"
                                        name="bttb_noSatTerimaActual"
                                        id="bttb_noSatTerimaActual"
                                        class="form-control font-weight-bold"
                                        style="width:20%;"
                                        readonly>

                                    <input type="hidden"
                                        name="bttb_qtyTerimaActualKoreksi"
                                        id="bttb_qtyTerimaActualKoreksi">

                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2 mb-3">
                                <label class="font-weight-bold" for="bttb_tanggalFaktur">Tanggal Faktur</label>
                                <input type="date" name="bttb_tanggalFaktur" id="bttb_tanggalFaktur"
                                    class="form-control font-weight-bold">
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="font-weight-bold" for="bttb_noFaktur">No. Faktur</label>
                                <input type="text" name="bttb_noFaktur" id="bttb_noFaktur"
                                    class="form-control font-weight-bold">
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="font-weight-bold" for="bttb_nomorSJ">No. Surat Jalan</label>
                                <input type="text" name="bttb_nomorSJ" id="bttb_nomorSJ"
                                    class="form-control font-weight-bold">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="font-weight-bold" for="bttb_selectMataUang">Mata Uang</label>
                                <select class="form-control font-weight-bold" id="bttb_selectMataUang"
                                    name="bttb_selectMataUang"></select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2 mb-3">
                                <label class="font-weight-bold" for="bttb_kursRupiah">Kurs Rupiah</label>
                                <input type="number" name="bttb_kursRupiah" id="bttb_kursRupiah"
                                    class="form-control font-weight-bold" min="0">
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="font-weight-bold" for="bttb_harga">Harga</label>
                                <input type="number" name="bttb_harga" id="bttb_harga"
                                    class="form-control font-weight-bold" min="0">
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="font-weight-bold" for="bttb_discount">Discount (%)</label>
                                <input type="number" name="bttb_discount" id="bttb_discount"
                                    class="form-control font-weight-bold" min="0">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="font-weight-bold" for="bttb_ppn">PPN (%)</label>
                                <input type="number" name="bttb_ppn" id="bttb_ppn"
                                    class="form-control font-weight-bold" min="0">
                                <div id="bttb_divCbDPP" style="display: none">
                                    <input type="checkbox" name="bttb_checkboxDPP" id="bttb_checkboxDPP">
                                    DPP 11/12
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2 mb-3">
                                <label class="font-weight-bold" for="bttb_hargaPer">Harga Per</label>
                                <input type="number" name="bttb_hargaPer" id="bttb_hargaPer"
                                    class="form-control font-weight-bold" min="0" readonly>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="font-weight-bold" for="bttb_nilaiTrans">Nilai Trans</label>
                                <input type="number" name="bttb_nilaiTrans" id="bttb_nilaiTrans"
                                    class="form-control font-weight-bold" min="0" readonly>
                            </div>
                            <div class="col-md-8 mb-3">
                                <label class="font-weight-bold" for="bttb_supplier">
                                    Supplier
                                </label>

                                <select id="bttb_supplier"
                                        name="bttb_supplier"
                                        class="form-control font-weight-bold">
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2 mb-3">
                                <label class="font-weight-bold" for="bttb_jangkaWaktu">Jangka Waktu</label>
                                <div style="display: flex; flex-direction: row;gap: 1%; align-items: flex-end;">
                                    <input type="number" name="bttb_jangkaWaktu" id="bttb_jangkaWaktu"
                                        class="form-control font-weight-bold" style="width: 60%" min="0">
                                    <label class="font-weight-bold" for="bttb_jangkaWaktu">Hari</label>
                                </div>
                            </div>
                            <div class="col-md-2 mb-3">
                                <label class="font-weight-bold" for="bttb_pembayaran">Pembayaran</label>
                                <input type="text" name="bttb_pembayaran" id="bttb_pembayaran"
                                    class="form-control font-weight-bold" readonly>
                            </div>
                            <div class="col-md-8 mb-3">
                                <label class="font-weight-bold" for="bttb_keterangan">Keterangan</label>
                                <textarea name="bttb_keterangan" id="bttb_keterangan"class="form-control font-weight-bold"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
               <div class="col-md-12 mt-2 d-flex justify-content-between">
                    <div>
                        <button type="submit"
                                id="button_modalProses"
                                class="btn btn-success">
                            Proses
                        </button>

                        <button type="button"
                                id="button_modalBatal"
                                class="btn btn-danger"
                                data-bs-dismiss="modal">
                            Batal
                        </button>

                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
