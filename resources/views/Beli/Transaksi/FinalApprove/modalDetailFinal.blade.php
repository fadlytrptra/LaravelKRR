<div class="modal fade" id="modalFinalApprove" tabindex="-1">
    <div class="modal-dialog" style="max-width: 60%">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabelFinalApprove">Detail No. Trans</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span>x</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="display:flex; flex-direction: row; gap: 5px">
                    <div style="flex-direction: column; width: 50%;">
                        <div class="form-group">
                            <label for="final_namaBarang">Nama Barang</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_namaBarang" name="final_namaBarang"
                                    readonly>
                            </div>
                        </div>
                        <button class="btn btn-info" id="final_btnShowDetail">
                            Show Kategori Barang
                        </button>

                        <div style="display:flex;align-items:flex-start;gap:15px;margin-top:8px;">
                            <button type="button" class="btn btn-warning" id="btnDownloadAttachment">
                                Download Attachment
                            </button>

                            <div id="final_fotoBarangContainer" style="display:none;">
                                <div style="width:185px;height:140px;border:3px solid #ccc;border-radius:6px;padding:3px;background:#fff;display:flex;align-items:center;justify-content:center;">
                                    <img id="final_fotoBarang" src="" alt="Foto Barang"
                                        style="max-width:100%;max-height:100%;object-fit:contain;cursor:zoom-in;">
                                </div>
                            </div>
                        </div>

                        <!-- Modal Preview Dokumentasi -->
                        <div class="modal fade" id="modalDokumentasi" tabindex="-1" style="padding-top: 10px;">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h5 class="modal-title">Dokumentasi</h5>
                                    </div>

                                    <div class="modal-body text-center">
                                        <iframe id="dok_preview" style="width:100%; height:500px; display:none;"></iframe>
                                        <div id="dok_keterangan" style="display:none;"></div>
                                    </div>

                                    <div class="modal-footer">
                                        <a id="btnDownloadPreview" class="btn btn-primary" target="_blank">
                                            Download
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div id="final_detailBarang" class="mt-2"
                            style="display:none;border: 1px solid black;padding-left: 10px">
                            <p class="RDZCard2" id="final_kategoriUtama"></p>
                            <p class="RDZCard2" id="final_kategori"></p>
                            <p class="RDZCard2" id="final_subKategori"></p>
                        </div>
                        <div class="form-group mt-4">
                            <label for="final_pembelianTerakhir">Pembelian Terakhir</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_pembelianTerakhir"
                                    name="final_pembelianTerakhir" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_supplier" id="supplier_label">Supplier</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_supplier" name="final_supplier"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_hargaUnit" id="hargaUnit_label">Harga Unit</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_hargaUnit" name="final_hargaUnit"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_total" id="total_label">Total</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_total" name="final_total" readonly>
                            </div>
                        </div>
                    </div>
                    <div style="flex-direction: column; width: 50%;">
                        <div class="form-group">
                            <label for="final_qtyOrder">Qty. Order</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_qtyOrder" name="final_qtyOrder"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_divisi">Divisi</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_divisi" name="final_divisi"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_user">User</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_user" name="final_user" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_status">Status</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_status" name="final_status"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_diskon" id="diskon_label">Diskon</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_diskon" name="final_diskon"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_ppn" id="ppn_label">PPN</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_ppn" name="final_ppn" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="final_ketOrder">Ket. Order</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="final_ketOrder"
                            name="final_ketOrder"readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label for="final_ketInternal">Ket. Internal</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="final_ketInternal" name="final_ketInternal"
                            readonly>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- MODAL FOTO BARANG -->
<div class="modal fade" id="modalFotoBarang" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width:850px;width:90%;">
        <div class="modal-content">
            <div class="modal-header" style="position:relative;justify-content:center;">
                <h3 class="modal-title" style="font-weight:bold;margin:0;">Foto Barang</h3>
                <button type="button" class="close" data-bs-dismiss="modal"
                    style="position:absolute;right:20px;top:12px;font-size:32px;border:0;background:transparent;">
                    <span>&times;</span>
                </button>
            </div>

            <div class="modal-body" style="padding:25px;">
                <div id="fotoBarangZoomArea"
                    style="width:100%;height:450px;overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:grab;">
                    <img id="fotoBarangPreview" src="" alt="Foto Barang"
                        style="max-width:100%;max-height:100%;object-fit:contain;transform-origin:center center;user-select:none;-webkit-user-drag:none;">
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    window.dokumentasiBase64 = @json($dokumentasi ?? null);
    window.dokumentasiExt = @json($ext ?? null);
</script>
