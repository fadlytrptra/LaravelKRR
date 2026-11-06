<style>
    #list_ModalKons .aligned-text {
        font-size: 0.9rem;
        font-weight: 600;
    }

    #list_ModalKons .tbl-hdr {
        font-size: 0.8rem;
        white-space: nowrap;
    }

    #list_ModalKons .tbl-cell {
        font-size: 0.8rem;
        white-space: nowrap;
    }

    #list_ModalKons .row-emergency>td {
        color: red !important;
    }

    #list_ModalKons .row-finish>td {
        color: blue !important;
    }

    #list_ModalKons .row-cancel>td {
        color: hotpink !important;
    }
</style>

<div class="modal fade" id="list_ModalKons" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title fw-bold">
                    <i class="bi bi-list-ol me-2"></i>Jadwal Pengerjaan Konstruksi
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

                <div class="row">
                    <div class="col-lg-3 aligned-text">WORK STATION</div>
                    <div class="col-lg-3">
                        <span id="list_WorkSts" class="fw-bold text-primary"></span>
                    </div>
                    <div class="col-lg-2 aligned-text">TANGGAL</div>
                    <div class="col-lg-4">
                        <span id="list_Tanggal" class="fw-bold text-primary"></span>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-3 aligned-text">JAM KERJA OPTIMAL</div>
                    <div class="col-lg-3">
                        <span id="list_JmlJam" class="fw-bold text-primary"></span>
                    </div>
                    <div class="col-lg-2 aligned-text">SISA JAM KERJA</div>
                    <div class="col-lg-4">
                        <span id="list_SisaJam" class="fw-bold text-primary"></span>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-lg-3 aligned-text">TERPAKAI</div>
                    <div class="col-lg-3">
                        <span id="list_Pakai" class="fw-bold text-primary"></span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-12">
                        <span class="fw-bold me-3">Keterangan:</span>
                        <span class="text-danger fw-bold me-3">■ Emergency</span>
                        <span class="text-primary fw-bold me-3">■ Finish</span>
                        <span class="fw-bold" style="color: hotpink;">■ Edit EstDate / Di-Delete</span>
                    </div>
                </div>

                <div class="table-responsive mt-3" style="max-height: 380px; overflow: auto;">
                    <table class="table table-bordered table-hover mb-0" style="width:100%">
                        <thead class="table-light" style="position: sticky; top: 0; z-index: 1;">
                            <tr>
                                <th class="tbl-hdr text-center" style="width: 50px;">Pilih</th>
                                <th class="tbl-hdr">No.Antrian</th>
                                <th class="tbl-hdr">No.Order</th>
                                <th class="tbl-hdr">Divisi</th>
                                <th class="tbl-hdr">Nama Barang</th>
                                <th class="tbl-hdr">Nama Bagian</th>
                                <th class="tbl-hdr">Est.Time</th>
                                <th class="tbl-hdr text-center">Hari Ke-</th>
                            </tr>
                        </thead>
                        <tbody id="list_tbody">
                            <tr>
                                <td colspan="8" class="text-center text-muted">Memuat data...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="alert alert-warning mt-3 mb-0 py-2 px-3 small">
                    <i class="bi bi-info-circle me-1"></i>
                    Pilih <b>1 nomer antrian</b> untuk menyisipkan di atasnya, atau <b>2 nomer antrian</b> untuk
                    menyisipkan di antaranya.
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" id="list_btnBatal" class="btn btn-secondary fw-bold px-4">B a t a l</button>
                <button type="button" id="list_btnProses" class="btn btn-success fw-bold px-4"
                    style="font-style: italic;">PROSES</button>
            </div>

        </div>
    </div>
</div>
