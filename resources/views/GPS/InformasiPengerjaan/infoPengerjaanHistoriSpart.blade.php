<div class="modal fade" id="modalHistoriSpart" tabindex="-1" aria-labelledby="modalHistoriSpartLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold" id="modalHistoriSpartLabel">Informasi Pengerjaan - Daftar S/Part</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
            </div>
            <div class="modal-body">
                <div class="row g-2 mb-3">
                    <div class="col-md-3"><label for="spartHistoriNoOd" class="form-label mb-1">No. Order</label><input id="spartHistoriNoOd" class="form-control form-control-sm" readonly></div>
                    <div class="col-md-6"><label for="spartHistoriNama" class="form-label mb-1">Nama Barang</label><input id="spartHistoriNama" class="form-control form-control-sm" readonly></div>
                    <div class="col-md-3"><label for="spartHistoriKode" class="form-label mb-1">Kode Barang</label><input id="spartHistoriKode" class="form-control form-control-sm" readonly></div>
                    <div class="col-md-6"><label for="spartHistoriBagian" class="form-label mb-1">Nama Bagian</label><input id="spartHistoriBagian" class="form-control form-control-sm" readonly></div>
                </div>
                <div class="table-responsive border rounded">
                    <table class="table table-bordered table-hover table-sm mb-0">
                        <thead class="table-light"><tr>
                            <th>Kd.Barang</th><th>Nm.Barang</th><th>SubKategori</th><th class="text-end">Jumlah</th><th>Satuan</th>
                            <th class="text-end">Harga Baru/Satuan</th><th class="text-end">Total Harga Baru</th><th class="text-end">Harga Stock/Satuan</th><th class="text-end">Total Harga Stock</th>
                        </tr></thead>
                        <tbody id="tbodyHistoriSpart"><tr><td colspan="9" class="text-center text-muted">Pilih baris histori untuk melihat S/Part.</td></tr></tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer justify-content-between flex-wrap gap-2">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Keluar</button>
                <div class="d-flex align-items-center gap-2 flex-wrap">
                    <label for="TTotalSpartBaru" class="form-label mb-0 fw-bold">Total Baru Rp.</label><input id="TTotalSpartBaru" class="form-control form-control-sm text-end" value="0" readonly style="width:120px">
                    <label for="TTotalSpart" class="form-label mb-0 fw-bold">Total Harga S/Part Rp.</label><input id="TTotalSpart" class="form-control form-control-sm text-end" value="0" readonly style="width:120px">
                    <label for="TTotalSpartStock" class="form-label mb-0 fw-bold">Total Bekas Rp.</label><input id="TTotalSpartStock" class="form-control form-control-sm text-end" value="0" readonly style="width:120px">
                </div>
            </div>
        </div>
    </div>
</div>
