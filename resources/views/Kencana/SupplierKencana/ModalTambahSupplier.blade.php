<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="tambahSupplierModal" tabindex="-1">
    <div class="modal-dialog" style="max-width: 80%;">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahSupplierLabel">Tambah Kegiatan Mesin</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="acs-div-container">
                    <div class="pl-2">
                        <label for="supplier">Supplier</label>
                        <div class="acs-div-filter2">
                            <input type="text" name="supplier_text" id="supplier_text"
                                class="input form-control font-weight-bold col-12">
                            <input type="hidden" name="kode" id="kode" value="2">
                            <input type="hidden" name="supplier_id" id="supplier_id">
                            <input type="hidden" name="kode_form" id="kode_form" value="Edit">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="col-12">
                            <label for="contact_person1">Contact Person 1</label>
                            <input type="text" name="contact_person1" id="contact_person1"
                                class="form-control font-weight-bold">
                        </div>
                        <div class="col-12">
                            <label for="phone1">Phone 1</label>
                            <input type="text" name="phone1" id="phone1" class="form-control font-weight-bold">
                        </div>
                        <div class="col-12">
                            <label for="mobile_phone1">Mobile Phone 1</label>
                            <input type="text" name="mobile_phone1" id="mobile_phone1"
                                class="form-control font-weight-bold" inputmode="numeric" pattern="[0-9]*">
                        </div>
                        <div class="col-12">
                            <label for="email1">Email 1</label>
                            <input type="text" name="email1" id="email1" class="form-control font-weight-bold">
                        </div>
                        <div class="col-12">
                            <label for="fax1">Fax 1</label>
                            <input type="text" name="fax1" id="fax1" class="form-control font-weight-bold">
                        </div>
                        <div class="col-12">
                            <label for="alamat1">Alamat 1</label>
                            <input type="text" name="alamat1" id="alamat1" class="form-control font-weight-bold">
                        </div>
                        <div class="col-12">
                            <label for="kota1">Kota 1</label>
                            <input type="text" name="kota1" id="kota1" class="form-control font-weight-bold">
                        </div>
                        <div class="col-12">
                            <label for="negara1">Negara 1</label>
                            <input type="text" name="negara1" id="negara1" class="form-control font-weight-bold">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="col-12">
                            <label for="contact_person2">Contact Person 2</label>
                            <input type="text" name="contact_person2" id="contact_person2"
                                class="form-control font-weight-bold">
                        </div>
                        <div class="col-12">
                            <label for="phone2">Phone 2</label>
                            <input type="text" name="phone2" id="phone2" class="form-control font-weight-bold">
                        </div>
                        <div class="col-12">
                            <label for="mobile_phone2">Mobile Phone 2</label>
                            <input type="text" name="mobile_phone2" id="mobile_phone2"
                                class="form-control font-weight-bold" inputmode="numeric" pattern="[0-9]*">
                        </div>
                        <div class="col-12">
                            <label for="email2">Email 2</label>
                            <input type="text" name="email2" id="email2"
                                class="form-control font-weight-bold">
                        </div>
                        <div class="col-12">
                            <label for="fax2">Fax 2</label>
                            <input type="text" name="fax2" id="fax2"
                                class="form-control font-weight-bold">
                        </div>
                        <div class="col-12">
                            <label for="alamat2">Alamat 2</label>
                            <input type="text" name="alamat2" id="alamat2"
                                class="form-control font-weight-bold">
                        </div>
                        <div class="col-12">
                            <label for="kota2">Kota 2</label>
                            <input type="text" name="kota2" id="kota2"
                                class="form-control font-weight-bold">
                        </div>
                        <div class="col-12">
                            <label for="negara2">Negara 2</label>
                            <input type="text" name="negara2" id="negara2"
                                class="form-control font-weight-bold">
                        </div>
                    </div>
                </div>
                <div class="acs-div-filter1 pl-3">
                    <label for="mata_uang">Mata Uang</label>
                    <select name="mata_uang" id="mata_uang" class="form-control input font-weight-bold">
                        <option selected disabled>-- Pilih Mata Uang--</option>
                        @foreach ($matauang as $dataMataUang)
                            <option value="{{ $dataMataUang->Id_MataUang }}">{{ $dataMataUang->Nama_MataUang }}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div class="row mt-4 pl-3">
                    <div class="col-md-12">
                        <div class="text-end">
                            <button id="save_button" class="btn btn-success font-weight-bold">
                                <span>Save</span>
                            </button>
                            <button id="clear_button" class="btn btn-secondary font-weight-bold">
                                <span>Clear All</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
