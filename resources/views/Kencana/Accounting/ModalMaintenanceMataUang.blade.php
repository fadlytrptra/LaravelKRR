<div class="modal fade" id="modalMataUang" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-modal-width">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabelMataUang">Tambah Mata Uang</h5>
            </div>
            <div class="modal-body">
                <div class="form-container col-md-12">
                    <input type="hidden" name="idMataUang" id="idMataUang">
                    <div class="row">
                        <div class="col-md-4">
                            <label for="kodeMataUang">Kode Mata Uang </label>
                        </div>
                        <div class="col-md-7">
                            <input type="text" name="kodeMataUang" id="kodeMataUang" class="form-control">
                        </div>
                    </div>
                    <p>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="namaMataUang">Nama Mata Uang </label>
                        </div>
                        <div class="col-md-7">
                            <input type="text" id="namaMataUang" name="namaMataUang" class="form-control">
                        </div>
                    </div>
                    <p>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="symbol">Symbol </label>
                        </div>
                        <div class="col-md-7">
                            <input type="text" id="symbol" name="symbol" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary" id="prosesButtonModal">Proses</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Keluar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
