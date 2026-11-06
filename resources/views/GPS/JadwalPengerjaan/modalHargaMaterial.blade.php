<style>
    #modalHargaMaterial .modal-content {
        overflow: hidden;
        border: 0;
        border-radius: 14px;
        box-shadow: 0 1rem 3rem rgba(33, 37, 41, .18);
    }

    #modalHargaMaterial .modal-header {
        padding: 18px 22px;
        background: #f8fbff;
        border-bottom: 1px solid #e8edf3;
    }

    #modalHargaMaterial .modal-title {
        color: #212529;
        font-size: 17px;
        font-weight: 700;
    }

    #modalHargaMaterial .modal-body {
        padding: 22px;
    }

    #modalHargaMaterial .material-info {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
        padding: 14px 16px;
        border: 1px solid #dee2e6;
        border-radius: 10px;
        background: #f8fbff;
    }

    #modalHargaMaterial .material-info-row {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    #modalHargaMaterial .material-info-label {
        color: #6c757d;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .04em;
        text-transform: uppercase;
    }

    #modalHargaMaterial .material-info-value {
        color: #212529;
        font-size: 14px;
        font-weight: 600;
        overflow-wrap: anywhere;
    }

    #modalHargaMaterial .form-label {
        margin-bottom: 6px;
        color: #343a40;
        font-size: 13px;
        font-weight: 600;
    }

    #modalHargaMaterial .form-control,
    #modalHargaMaterial .input-group-text,
    #modalHargaMaterial .btn-lookup-satuan {
        min-height: 42px;
        border-radius: 9px;
    }

    #modalHargaMaterial .form-control {
        font-size: 14px;
    }

    #modalHargaMaterial .form-control:focus {
        border-color: #86b7fe;
        box-shadow: 0 0 0 .2rem rgba(13, 110, 253, .12);
    }

    #modalHargaMaterial .input-group > .form-control {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    #modalHargaMaterial .btn-lookup-satuan {
        width: 46px;
        border: 1px solid #ced4da;
        border-left: 0;
        border-radius: 0 9px 9px 0;
        background: #f8f9fa;
        color: #495057;
        transition: background-color .2s ease, color .2s ease;
    }

    #modalHargaMaterial .btn-lookup-satuan:hover {
        background: #eaf2ff;
        color: #0d6efd;
    }

    #modalHargaMaterial .modal-footer {
        gap: 8px;
        padding: 14px 22px;
        border-top: 1px solid #e8edf3;
        background: #fbfcfd;
    }

    #modalHargaMaterial .modal-footer .btn {
        min-width: 92px;
        border-radius: 8px;
        font-weight: 600;
    }

    @media (min-width: 576px) {
        #modalHargaMaterial .modal-dialog {
            max-width: 440px;
        }
    }
</style>

<div class="modal fade" id="modalHargaMaterial" tabindex="-1" aria-labelledby="modalHargaMaterialLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form id="formHargaMaterial" novalidate>
                <div class="modal-header">
                    <h5 class="modal-title" id="modalHargaMaterialLabel">
                        <i class="bi bi-cash-coin text-primary me-2" aria-hidden="true"></i>Input Harga Material
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
                </div>
                <div class="modal-body">
                    <div class="material-info">
                        <div class="material-info-row">
                            <span class="material-info-label">Type Material</span>
                            <span class="material-info-value" id="hargaMaterialType">-</span>
                        </div>
                        <div class="material-info-row">
                            <span class="material-info-label">Spesifikasi</span>
                            <span class="material-info-value" id="hargaMaterialSpek">-</span>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="inputHargaMaterial" class="form-label">Harga</label>
                        <div class="input-group has-validation">
                            <span class="input-group-text bg-light text-muted me-2 rounded">Rp</span>
                            <input id="inputHargaMaterial" type="number" class="form-control text-end rounded" min="0.01" step="any" value="0" required aria-describedby="inputHargaMaterialFeedback">
                            <div id="inputHargaMaterialFeedback" class="invalid-feedback">Harga material tidak boleh nol.</div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="inputJumlahMaterial" class="form-label">Jumlah</label>
                        <input id="inputJumlahMaterial" type="number" class="form-control text-end" min="0.01" step="any" value="0" required>
                        <div class="invalid-feedback">Jumlah material tidak boleh nol.</div>
                    </div>

                    <div>
                        <label for="inputNamaSatuanMaterial" class="form-label">Satuan</label>
                        <div class="input-group">
                            <input id="inputKodeSatuanMaterial" type="hidden">
                            <input id="inputNamaSatuanMaterial" type="text" class="form-control" placeholder="Pilih satuan material" readonly required>
                            <button type="button" id="btnLookupSatuanMaterial" class="btn-lookup-satuan" aria-label="Pilih satuan">
                                <i class="bi bi-search" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div id="satuanMaterialFeedback" class="text-danger small mt-1 d-none">Pilih satuan material.</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light border" data-bs-dismiss="modal">Batal</button>
                    <button type="submit" class="btn btn-primary"><i class="bi bi-check2 me-1" aria-hidden="true"></i>OK</button>
                </div>
            </form>
        </div>
    </div>
</div>
