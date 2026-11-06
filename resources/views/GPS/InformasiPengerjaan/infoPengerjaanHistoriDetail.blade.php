<div class="modal fade" id="modalHistoriDetail" tabindex="-1" aria-labelledby="modalHistoriDetailLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold" id="modalHistoriDetailLabel">Detail Histori Proses Pengerjaan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
            </div>
            <div class="modal-body">
                <div class="row g-2 mb-3">
                    <div class="col-md-4">
                        <label for="detailTNoOd" class="form-label mb-1">No. Order</label>
                        <input type="text" id="detailTNoOd" class="form-control form-control-sm" readonly>
                    </div>
                    <div class="col-md-8">
                        <label for="detailTNamaBrg" class="form-label mb-1">Nama Barang</label>
                        <input type="text" id="detailTNamaBrg" class="form-control form-control-sm" readonly>
                    </div>
                    <div class="col-md-8">
                        <label for="detailTBagian" class="form-label mb-1">Nama Bagian</label>
                        <input type="text" id="detailTBagian" class="form-control form-control-sm" readonly>
                    </div>
                </div>

                <input type="hidden" id="detailTKode">
                <input type="hidden" id="detailTIdBagian">
                <input type="hidden" id="detailTBulan">
                <input type="hidden" id="detailTTahun">

                <div class="table-responsive border rounded">
                    <table class="table table-bordered table-hover table-sm mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>TglStart</th>
                                <th>Mesin</th>
                                <th>Type Mesin</th>
                                <th>TglProses KR</th>
                                <th>RealTime</th>
                                <th class="text-end">JmlFinish</th>
                                <th class="text-end">Biaya</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyHistoriDetail">
                            <tr><td colspan="7" class="text-center text-muted">Pilih histori untuk melihat detail.</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
                <div>
                    <button type="button" id="btnKeluarDetail" class="btn btn-danger">Keluar</button>
                    <button type="button" id="btnRefreshDetail" class="btn btn-secondary">Refresh</button>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <label for="TTotalBiayaDetail" class="form-label mb-0 fw-bold">Total Biaya Proses Kerja Rp.</label>
                    <input type="text" id="TTotalBiayaDetail" class="form-control form-control-sm text-end" value="0" readonly style="width: 140px">
                    <button type="button" id="btnTotalDetail" class="btn btn-info" disabled>Total</button>
                </div>
            </div>
        </div>
    </div>
</div>
