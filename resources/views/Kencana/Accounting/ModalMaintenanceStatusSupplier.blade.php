<div class="modal fade" id="modalStatusSupplier" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-modal-width">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabelStatusSupplier">Edit Status Supplier</h5>
            </div>
            <div class="modal-body">
                <div class="form-container col-md-12">
                    <div class="form-container col-md-12">
                        <input type="hidden" name="idSupplier" id="idSupplier">
                        <div class="acs-div-filter">
                            <label for="namaSupplier">Nama Supplier </label>
                            <div style="display: flex; flex-direction: column">
                                <input type="text" name="namaSupplier" id="namaSupplier" class="form-control"
                                    style="margin: 0 0 5px 0" readonly>
                                <select name="namaSupplierSelect" id="namaSupplierSelect" class="form-control"
                                    style="display: none">
                                    <option disabled selected>-- Pilih Supplier --</option>
                                    @foreach ($data as $supplier)
                                        <option value="{{ $supplier->NO_SUP }}">{{ $supplier->NM_SUP }}</option>
                                    @endforeach
                                </select>
                                <label for="namaSupplierSelect" id="labelCatatanSelectSupplier"
                                    style="display: none;color: red;font-size: x-small;margin: 0 0 5px 0;">*Hanya
                                    menampilkan Supplier yang belum memiliki Status</label>
                                <button class="btn btn-info" id="buttonSwitchNamaSupplier">⟳ Tampilkan Supplier
                                    Lain</button>
                            </div>
                        </div>
                        <div class="acs-div-filter">
                            <label for="namaMataUang">Mata Uang </label>
                            <input type="text" id="namaMataUang" name="namaMataUang" class="form-control" readonly>
                        </div>
                        <div class="acs-div-filter">
                            <label for="radioButtonStatus">Status </label>
                            <div class="col-md-4">
                                <input type="radio" id="rbH" name="radioButtonStatus" value="H"
                                    class="input" style="width: 45%" checked>
                                <label for="" style="width: 45%">H</label>
                                <input type="radio" id="rbT" name="radioButtonStatus" value="T"
                                    class="input" style="width: 45%">
                                <label for="" style="width: 45%">T</label>
                                <input type="radio" id="rbI" name="radioButtonStatus" value="I"
                                    class="input" style="width: 45%">
                                <label for="" style="width: 45%">I</label>
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
</div>
