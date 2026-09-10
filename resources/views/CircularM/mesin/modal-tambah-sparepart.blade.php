<!-- Modal -->
<div class="modal fade" id="modal_tambahSparepart" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="modal_tambahSparepartLabel" aria-hidden="true">
    <div class="modal-dialog modal-l">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="md_title">Modal Table</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="form_tambahLogMaintenanceMesin">
                    <div class="row">
                        <div class="col-md-11" style="padding-right: 5%">
                            <div class="row">
                                <div class="col-md-5">
                                    <label for="namaSparepart">Nama Sparepart</label>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" id="namaSparepart" name="namaSparepart"
                                        class="form-control form-control-sm">
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-5">
                                    <label for="identificationNumber">Identification Number</label>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" id="identificationNumber" name="identificationNumber"
                                        class="form-control form-control-sm">
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-5">
                                    <label for="keterangan">Keterangan</label>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" id="keterangan" name="keterangan"
                                        class="form-control form-control-sm">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="modal_ok" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

{{-- <script src="{{ asset('js/circular/modal-table.js') }}"></script> --}}
