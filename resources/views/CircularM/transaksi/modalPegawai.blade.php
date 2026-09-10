<div class="modal fade" id="modalPegawai" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="modalPegawaiLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="modalPegawaiLabel">Transfer Data Pegawai</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body" style="margin-left: 12.5%; margin-right: 12.5%;">
                <div class="row">
                    <div class="col-md-4 d-flex justify-content-end">
                        <label for="pg_tanggal_awal">Tanggal Awal</label>
                    </div>

                    <div class="col-md-8">
                        <input type="date" id="pg_tanggal_awal" class="form-control form-control-sm">
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4 d-flex justify-content-end">
                        <label for="pg_tanggal_akhir">Tanggal Akhir</label>
                    </div>

                    <div class="col-md-8">
                        <input type="date" id="pg_tanggal_akhir" class="form-control form-control-sm">
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="button" id="btn_pegawai" class="btn btn-primary">OK</button>
            </div>
        </div>
    </div>
</div>
