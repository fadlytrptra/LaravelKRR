<style>
    #mhn_Modal {
        --mhn-primary: #2563eb;
        --mhn-border: #e5e7eb;
        --mhn-text: #334155;
        --mhn-muted: #64748b;
        --mhn-bg: #f8fafc;
    }

    #mhn_Modal .modal-content {
        border: 1px solid var(--mhn-border);
        border-radius: 14px;
        overflow: hidden;
        box-shadow: 0 12px 40px rgba(15, 23, 42, .12);
    }


    #mhn_Modal .mhn-header {
        padding: 16px 22px;
        background: #fff;
        border-bottom: 1px solid var(--mhn-border);
    }

    #mhn_Modal .mhn-header-icon {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 11px;
        background: #eff6ff;
        color: var(--mhn-primary);
        font-size: 21px;
    }

    #mhn_Modal .modal-title {
        font-size: 1rem;
        color: #1e293b;
    }

    #mhn_Modal .mhn-header small {
        font-size: .75rem;
    }


    #mhn_Modal .mhn-body {
        padding: 20px;
        background: var(--mhn-bg);
    }


    #mhn_Modal .mhn-section {
        min-width: 0;
        padding: 18px;
        background: #fff;
        border: 1px solid var(--mhn-border);
        border-radius: 11px;
    }

    #mhn_Modal .mhn-section legend {
        float: none;
        width: auto;
        margin: 0 0 14px;
        padding: 0 8px;
        color: #334155;
        font-size: .9rem;
        font-weight: 700;
    }

    #mhn_Modal .mhn-section legend i {
        color: var(--mhn-primary);
    }

    #mhn_Modal .mhn-label {
        color: var(--mhn-text);
        font-size: .8rem;
        font-weight: 600;
    }


    #mhn_Modal .form-control,
    #mhn_Modal .input-group-text,
    #mhn_Modal .btn {
        font-size: .82rem;
    }

    #mhn_Modal .form-control {
        min-height: 35px;
        border-color: #dbe1e8;
        border-radius: 7px;
        color: #334155;
        background-color: #fff;
        transition: border-color .2s, box-shadow .2s;
    }

    #mhn_Modal .form-control:focus {
        border-color: #93b4f8;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, .1);
    }

    #mhn_Modal .form-control[readonly] {
        background-color: #f8fafc;
        color: #475569;
    }

    #mhn_Modal .form-control:disabled {
        background-color: #f1f5f9;
    }

    #mhn_Modal .input-group .form-control {
        border-radius: 7px 0 0 7px;
    }

    #mhn_Modal .input-group-text {
        background: #f1f5f9;
        border-color: #dbe1e8;
        color: var(--mhn-muted);
        border-radius: 0 7px 7px 0;
    }

    #mhn_Modal .mhn-search-btn {
        min-width: 38px;
        border-color: #dbe1e8;
        border-radius: 0 7px 7px 0;
        background: #f8fafc;
        color: #475569;
        transition: all .2s;
    }

    #mhn_Modal .mhn-search-btn:hover:not(:disabled) {
        background: #eff6ff;
        border-color: #93b4f8;
        color: var(--mhn-primary);
    }

    #mhn_Modal .mhn-search-btn:disabled {
        background: #f1f5f9;
        color: #94a3b8;
    }


    #mhn_Modal .mhn-unit-info {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
        color: var(--mhn-muted);
        font-size: .76rem;
    }


    #mhn_Modal .mhn-table-wrapper {
        overflow: hidden;
        background: #fff;
        border: 1px solid var(--mhn-border);
        border-radius: 11px;
    }

    #mhn_Modal .mhn-table-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        border-bottom: 1px solid var(--mhn-border);
        color: #334155;
        font-size: .85rem;
        font-weight: 700;
    }

    #mhn_Modal .mhn-table-heading i {
        color: var(--mhn-primary);
    }

    #mhn_Modal .mhn-table-caption {
        color: var(--mhn-muted);
        font-size: .72rem;
        font-weight: 400;
    }

    #mhn_Modal .mhn-table-scroll {
        max-height: 260px;
        overflow: auto;
    }

    #mhn_Modal table {
        white-space: nowrap;
    }

    #mhn_Modal .mhn-tbl-hdr {
        position: sticky;
        top: 0;
        z-index: 2;
        padding: 11px 12px;
        background: #f1f5f9;
        border-bottom: 1px solid var(--mhn-border);
        color: #475569;
        font-size: .73rem;
        font-weight: 700;
        white-space: nowrap;
    }

    #mhn_Modal tbody td {
        padding: 9px 12px;
        color: #475569;
        font-size: .76rem;
        white-space: nowrap;
    }

    #mhn_Modal tbody tr {
        cursor: pointer;
        transition: background-color .15s;
    }

    #mhn_Modal tbody tr:hover>td {
        background-color: #f1f5f9;
    }

    #mhn_Modal tbody tr.selected>td {
        background-color: #eff6ff !important;
        color: #1d4ed8;
    }


    #mhn_Modal .mhn-footer {
        padding: 13px 20px;
        background: #fff;
        border-top: 1px solid var(--mhn-border);
    }

    #mhn_Modal .mhn-action-btn,
    #mhn_Modal .mhn-exit-btn {
        min-width: 100px;
        min-height: 36px;
        border-radius: 7px;
        font-size: .78rem;
        font-weight: 600;
    }

    #mhn_Modal .mhn-exit-btn {
        min-width: 115px;
    }


    @media (max-width: 767.98px) {
        #mhn_Modal .modal-dialog {
            margin: 8px;
        }

        #mhn_Modal .mhn-body {
            padding: 12px;
        }

        #mhn_Modal .mhn-section {
            padding: 14px;
        }

        #mhn_Modal .mhn-label {
            margin-bottom: 2px;
        }

        #mhn_Modal .mhn-footer {
            gap: 10px;
        }

        #mhn_Modal .mhn-footer>div {
            width: 100%;
        }

        #mhn_Modal .mhn-exit-btn {
            width: 100%;
        }
    }
</style>

<div class="modal fade" id="mhn_Modal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content mhn-modal-content">

            <div class="modal-header mhn-header">
                <div class="d-flex align-items-center gap-3">
                    <div class="mhn-header-icon">
                        <i class="bi bi-arrow-left-right"></i>
                    </div>
                    <div>
                        <h5 class="modal-title fw-bold mb-0">
                            Permohonan Mutasi Antar Divisi
                        </h5>
                        <small class="text-muted">Formulir permohonan perpindahan barang antar divisi</small>
                    </div>
                </div>

                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body mhn-body">

                <fieldset class="mhn-section mb-3">
                    <legend>
                        <i class="bi bi-box-arrow-in-down me-2"></i>
                        Penerima Barang
                    </legend>

                    <div class="row g-3">

                        <div class="col-md-6">
                            <div class="row align-items-center g-2">
                                <label class="col-sm-4 mhn-label">Divisi</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input type="text" id="mhn_Divisi2" class="form-control" readonly>
                                        <button class="btn btn-outline-secondary mhn-search-btn" id="mhn_btnDivisi2"
                                            type="button">
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                    <input type="hidden" id="mhn_TIdDivisi2">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="row align-items-center g-2">
                                <label class="col-5 mhn-label">Pemohon</label>
                                <div class="col-7">
                                    <input type="text" id="mhn_Pemohon" class="form-control" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="row align-items-center g-2">
                                <label class="col-4 mhn-label">Tanggal</label>
                                <div class="col-8">
                                    <input type="date" id="mhn_Tanggal" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row align-items-center g-2">
                                <label class="col-sm-4 mhn-label">Objek</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input type="text" id="mhn_Objek2" class="form-control" readonly>
                                        <button class="btn btn-outline-secondary mhn-search-btn" id="mhn_btnObjek2"
                                            type="button" disabled>
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                    <input type="hidden" id="mhn_TIdObjek2">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row align-items-center g-2">
                                <label class="col-sm-4 mhn-label">Kel. Utama</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input type="text" id="mhn_KelUtama2" class="form-control" readonly>
                                        <button class="btn btn-outline-secondary mhn-search-btn" id="mhn_btnKelUtama2"
                                            type="button" disabled>
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                    <input type="hidden" id="mhn_TIdKelUtama2">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row align-items-center g-2">
                                <label class="col-sm-4 mhn-label">Kelompok</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input type="text" id="mhn_Kelompok2" class="form-control" readonly>
                                        <button class="btn btn-outline-secondary mhn-search-btn" id="mhn_btnKelompok2"
                                            type="button" disabled>
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                    <input type="hidden" id="mhn_TIdKelompok2">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row align-items-center g-2">
                                <label class="col-sm-4 mhn-label">Sub Kelompok</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input type="text" id="mhn_SubKel2" class="form-control" readonly>
                                        <button class="btn btn-outline-secondary mhn-search-btn" id="mhn_btnSubKel2"
                                            type="button" disabled>
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                    <input type="hidden" id="mhn_TIdSubKel2">
                                </div>
                            </div>
                        </div>

                    </div>
                </fieldset>

                <fieldset id="mhn_FrameAsal" class="mhn-section mb-3" disabled>
                    <legend>
                        <i class="bi bi-box-arrow-up me-2"></i>
                        Pemberi Barang
                    </legend>

                    <div class="row g-3">

                        <div class="col-md-6">
                            <div class="row align-items-center g-2">
                                <label class="col-sm-4 mhn-label">Divisi</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input type="text" id="mhn_Divisi" class="form-control" readonly>
                                        <button class="btn btn-outline-secondary mhn-search-btn" id="mhn_btnDivisi"
                                            type="button" disabled>
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                    <input type="hidden" id="mhn_TIdDivisi">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row align-items-center g-2">
                                <label class="col-sm-4 mhn-label">Objek</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input type="text" id="mhn_Objek" class="form-control" readonly>
                                        <button class="btn btn-outline-secondary mhn-search-btn" id="mhn_btnObjek"
                                            type="button" disabled>
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                    <input type="hidden" id="mhn_TIdObjek">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row align-items-center g-2">
                                <label class="col-sm-4 mhn-label">Kel. Utama</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input type="text" id="mhn_KelUtama" class="form-control" readonly>
                                        <button class="btn btn-outline-secondary mhn-search-btn" id="mhn_btnKelUtama"
                                            type="button" disabled>
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                    <input type="hidden" id="mhn_TIdKelUtama">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row align-items-center g-2">
                                <label class="col-sm-4 mhn-label">Kelompok</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input type="text" id="mhn_Kelompok" class="form-control" readonly>
                                        <button class="btn btn-outline-secondary mhn-search-btn" id="mhn_btnKelompok"
                                            type="button" disabled>
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                    <input type="hidden" id="mhn_TIdKelompok">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row align-items-center g-2">
                                <label class="col-sm-4 mhn-label">Sub Kelompok</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input type="text" id="mhn_SubKel" class="form-control" readonly>
                                        <button class="btn btn-outline-secondary mhn-search-btn" id="mhn_btnSubKel"
                                            type="button" disabled>
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                    <input type="hidden" id="mhn_TIdSubKel">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row align-items-center g-2">
                                <label class="col-sm-4 mhn-label">Kode Barang</label>
                                <div class="col-sm-8">
                                    <input type="text" id="mhn_KdBrg" class="form-control" maxlength="9">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row align-items-center g-2">
                                <label class="col-sm-4 mhn-label">Nama Barang</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input type="text" id="mhn_NmBrg" class="form-control" readonly>
                                        <button class="btn btn-outline-secondary mhn-search-btn" id="mhn_btnNama"
                                            type="button">
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                    <input type="hidden" id="mhn_TIdType">
                                </div>
                            </div>
                        </div>

                    </div>
                </fieldset>

                <fieldset id="mhn_FrameQty" class="mhn-section mb-3" disabled>
                    <legend>
                        <i class="bi bi-box-seam me-2"></i>
                        Stok &amp; Jumlah Mutasi
                    </legend>

                    <div class="row g-3">

                        <div class="col-12">
                            <div class="row align-items-center g-2">
                                <label class="col-md-2 mhn-label">Stok Akhir</label>

                                <div class="col-md-2">
                                    <input type="text" id="mhn_Primer1" class="form-control text-end"
                                        value="0" readonly>
                                </div>

                                <div class="col-md-2">
                                    <input type="text" id="mhn_Sekunder1" class="form-control text-end"
                                        value="0" readonly>
                                </div>

                                <div class="col-md-2">
                                    <input type="text" id="mhn_Tritier1" class="form-control text-end"
                                        value="0" readonly>
                                </div>

                                <div class="col-md-4">
                                    <div class="mhn-unit-info">
                                        <span id="mhn_SatPrimer1"></span>
                                        <span>/</span>
                                        <span id="mhn_SatSekunder1"></span>
                                        <span>/</span>
                                        <span id="mhn_SatTritier1"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="row align-items-center g-2">
                                <label class="col-md-2 mhn-label">Jumlah Mutasi</label>

                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="number" id="mhn_Primer" class="form-control text-end"
                                            value="0" min="0" step="0.01">
                                        <span class="input-group-text" id="mhn_SatPrimer">-</span>
                                    </div>
                                </div>

                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="number" id="mhn_Sekunder" class="form-control text-end"
                                            value="0" min="0" step="0.01">
                                        <span class="input-group-text" id="mhn_SatSekunder">-</span>
                                    </div>
                                </div>

                                <div class="col-md-2">
                                    <div class="input-group">
                                        <input type="number" id="mhn_Tritier" class="form-control text-end"
                                            value="0" min="0" step="0.01">
                                        <span class="input-group-text" id="mhn_SatTritier">-</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="row align-items-center g-2">
                                <label class="col-md-2 mhn-label">Alasan Mutasi</label>
                                <div class="col-md-10">
                                    <input type="text" id="mhn_Alasan" class="form-control" maxlength="200"
                                        placeholder="Masukkan alasan mutasi barang...">
                                </div>
                            </div>
                        </div>

                    </div>
                </fieldset>

                <div class="mhn-table-wrapper">
                    <div class="mhn-table-heading">
                        <div>
                            <i class="bi bi-list-ul me-2"></i>
                            <span>Daftar Permohonan Mutasi</span>
                        </div>
                        <span class="mhn-table-caption">Data transaksi</span>
                    </div>

                    <div class="table-responsive mhn-table-scroll">
                        <table class="table table-hover align-middle mb-0" style="width:100%">
                            <thead>
                                <tr>
                                    <th class="mhn-tbl-hdr">Kd.Trans</th>
                                    <th class="mhn-tbl-hdr">Nama Barang</th>
                                    <th class="mhn-tbl-hdr">Alasan</th>
                                    <th class="mhn-tbl-hdr">Pemohon</th>
                                    <th class="mhn-tbl-hdr">Tgl Mohon</th>
                                    <th class="mhn-tbl-hdr">Divisi</th>
                                    <th class="mhn-tbl-hdr">Objek</th>
                                    <th class="mhn-tbl-hdr">Kel.Utama</th>
                                    <th class="mhn-tbl-hdr">Kelompok</th>
                                    <th class="mhn-tbl-hdr">Sub.Kel</th>
                                    <th class="mhn-tbl-hdr text-end">Primer</th>
                                    <th class="mhn-tbl-hdr text-end">Sekunder</th>
                                    <th class="mhn-tbl-hdr text-end">Tritier</th>
                                    <th class="mhn-tbl-hdr">Kd.Brg</th>
                                    <th class="mhn-tbl-hdr">Kd.Type</th>
                                    <th class="mhn-tbl-hdr">IdPemohon</th>
                                </tr>
                            </thead>

                            <tbody id="mhn_tbody">
                                <tr>
                                    <td colspan="16" class="text-center text-muted py-4">
                                        <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                                        Belum ada data. Pilih divisi penerima terlebih dahulu.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <input type="hidden" id="mhn_IdTransaksi">

            </div>

            <div class="modal-footer mhn-footer">
                <div class="d-flex flex-wrap gap-2 me-auto">
                    <button type="button" id="mhn_btnIsi" class="btn btn-primary mhn-action-btn">
                        <i class="bi bi-plus-circle me-1"></i> ISI
                    </button>

                    <button type="button" id="mhn_btnKoreksi" class="btn btn-warning mhn-action-btn">
                        <i class="bi bi-pencil-square me-1"></i> KOREKSI
                    </button>

                    <button type="button" id="mhn_btnHapus" class="btn btn-danger mhn-action-btn">
                        <i class="bi bi-trash me-1"></i> HAPUS
                    </button>
                </div>

                <button type="button" id="mhn_btnKeluar" class="btn btn-outline-secondary mhn-exit-btn">
                    <i class="bi bi-x-circle me-1"></i> KELUAR
                </button>
            </div>

        </div>
    </div>
</div>
