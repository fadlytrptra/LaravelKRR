<style>
    .legend-box {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 3px;
        border: 1px solid #dee2e6;
    }

    .status-baru {
        background-color: black;
    }

    .status-bekas {
        background-color: blue;
    }
</style>
<div class="modal fade" id="materialModal" tabindex="-1" aria-labelledby="materialModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-light">
                <h5 class="modal-title fw-bold" id="materialModalLabel">
                    <i class="bi bi-box-seam me-2"></i>Daftar Material
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
            </div>

            <div class="modal-body">
                <div class="row g-3 mb-3">
                    <div class="col-md-7">
                        <div class="row g-2">
                            <div class="col-md-3">
                                <label for="materialNoOrder" class="form-label fw-bold">No. Order</label>
                                <input type="text" id="materialNoOrder" class="form-control form-control-sm bg-light"
                                    readonly>
                            </div>

                            <div class="col-md-4">
                                <label for="materialNamaBarang" class="form-label fw-bold">Nama Barang</label>
                                <input type="text" id="materialNamaBarang"
                                    class="form-control form-control-sm bg-light" readonly>
                            </div>

                            <div class="col-md-5">
                                <label for="materialNamaBagian" class="form-label fw-bold">Nama Bagian</label>
                                <input type="text" id="materialNamaBagian"
                                    class="form-control form-control-sm bg-light" readonly>
                            </div>

                            <input type="hidden" id="materialKodeBarang">
                        </div>
                    </div>

                    <div class="col-md-5">
                        <fieldset class="border px-3 py-2 rounded bg-light m-0 h-100">
                            <legend class="float-none w-auto px-2 fw-bold fs-6 mb-0">
                                Keterangan:
                            </legend>

                            <div class="d-flex align-items-center flex-wrap gap-3">
                                <div class="d-flex align-items-center">
                                    <span class="legend-box status-baru fw-semibold me-2"></span>
                                    <span class="text-nowrap">Baru</span>
                                </div>

                                <div class="d-flex align-items-center">
                                    <span class="legend-box status-bekas me-2"></span>
                                    <span class="text-nowrap">Bekas</span>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>

                <div class="table-responsive border rounded">
                    <table class="table table-bordered table-sm mb-0 align-middle">
                        <thead class="table-light">
                            <tr>
                                <th>Material Type</th>
                                <th>Spesifikasi</th>
                                <th>Kd. Barang</th>
                                <th class="text-end">Jumlah</th>
                                <th>Satuan</th>
                                <th>Harga Baru</th>
                                <th>Harga Bekas</th>
                            </tr>
                        </thead>
                        <tbody id="materialTbody">
                            <tr>
                                <td colspan="7" class="text-center text-muted">Belum ada data.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-danger px-4" data-bs-dismiss="modal">Keluar</button>
            </div>
        </div>
    </div>
</div>
