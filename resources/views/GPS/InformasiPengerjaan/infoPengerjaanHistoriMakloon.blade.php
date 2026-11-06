<div class="modal fade" id="modalHistoriMakloon" tabindex="-1" aria-labelledby="modalHistoriMakloonLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold" id="modalHistoriMakloonLabel">Detail Histori Makloon</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
            </div>
            <div class="modal-body">
                <div class="row g-2 mb-3">
                    <div class="col-md-3"><label for="makloonHistoriNoOd" class="form-label mb-1">No. Order</label><input id="makloonHistoriNoOd" class="form-control form-control-sm" readonly></div>
                    <div class="col-md-6"><label for="makloonHistoriNama" class="form-label mb-1">Nama Barang</label><input id="makloonHistoriNama" class="form-control form-control-sm" readonly></div>
                    <div class="col-md-3"><label for="makloonHistoriBagian" class="form-label mb-1">Nama Bagian</label><input id="makloonHistoriBagian" class="form-control form-control-sm" readonly></div>
                </div>
                <div class="table-responsive border rounded">
                    <table class="table table-bordered table-hover table-sm mb-0">
                        <thead class="table-light"><tr><th>Type Mesin</th><th class="text-end">JmlBrg</th><th class="text-end">Harga/PC</th><th class="text-end">TotalHarga</th><th>Keterangan</th></tr></thead>
                        <tbody id="tbodyHistoriMakloon"><tr><td colspan="5" class="text-center text-muted">Pilih baris histori untuk melihat makloon.</td></tr></tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
                <div class="d-flex gap-2"><button type="button" id="btnKeluarHistoriMakloon" class="btn btn-danger">Keluar</button><button type="button" id="btnRefreshHistoriMakloon" class="btn btn-secondary">Refresh</button></div>
                <div class="d-flex align-items-center gap-2"><label for="TTotalMakloon" class="form-label mb-0 fw-bold">Total Biaya Rp.</label><input id="TTotalMakloon" class="form-control form-control-sm text-end" value="0" readonly style="width:140px"><button type="button" id="btnTotalHistoriMakloon" class="btn btn-info" disabled>Total</button></div>
            </div>
        </div>
    </div>
</div>
