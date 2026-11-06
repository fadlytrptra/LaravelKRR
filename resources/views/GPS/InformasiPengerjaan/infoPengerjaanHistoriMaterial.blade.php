<div class="modal fade" id="modalHistoriMaterial" tabindex="-1" aria-labelledby="modalHistoriMaterialLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold" id="modalHistoriMaterialLabel">Daftar Material</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
            </div>
            <div class="modal-body">
                <div class="row g-2 mb-3">
                    <div class="col-md-3"><label for="materialHistoriNoOd" class="form-label mb-1">No. Order</label><input id="materialHistoriNoOd" class="form-control form-control-sm" readonly></div>
                    <div class="col-md-6"><label for="materialHistoriNama" class="form-label mb-1">Nama Barang</label><input id="materialHistoriNama" class="form-control form-control-sm" readonly></div>
                    <div class="col-md-3"><label for="materialHistoriKode" class="form-label mb-1">Kode Barang</label><input id="materialHistoriKode" class="form-control form-control-sm" readonly></div>
                    <div class="col-md-6"><label for="materialHistoriBagian" class="form-label mb-1">Nama Bagian</label><input id="materialHistoriBagian" class="form-control form-control-sm" readonly></div>
                </div>
                <div class="table-responsive border rounded">
                    <table class="table table-bordered table-hover table-sm mb-0">
                        <thead class="table-light"><tr>
                            <th>Material Type</th><th>Spesifikasi</th><th>Kd.Barang</th><th class="text-end">Jumlah</th><th>Satuan</th>
                            <th class="text-end">Harga Baru/Satuan</th><th class="text-end">Total Harga Baru</th><th class="text-end">Harga Bekas/Satuan</th><th class="text-end">Total Harga Bekas</th>
                        </tr></thead>
                        <tbody id="tbodyHistoriMaterial"><tr><td colspan="9" class="text-center text-muted">Pilih baris histori untuk melihat material.</td></tr></tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer justify-content-between flex-wrap gap-2">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Keluar</button>
                <div class="d-flex align-items-center gap-2 flex-wrap">
                    <label for="TTotalMaterialBaru" class="form-label mb-0 fw-bold">Total Baru Rp.</label><input id="TTotalMaterialBaru" class="form-control form-control-sm text-end" value="0" readonly style="width:120px">
                    <label for="TTotalMaterial" class="form-label mb-0 fw-bold">Total Material Rp.</label><input id="TTotalMaterial" class="form-control form-control-sm text-end" value="0" readonly style="width:120px">
                    <label for="TTotalMaterialBekas" class="form-label mb-0 fw-bold">Total Bekas Rp.</label><input id="TTotalMaterialBekas" class="form-control form-control-sm text-end" value="0" readonly style="width:120px">
                </div>
            </div>
        </div>
    </div>
</div>
