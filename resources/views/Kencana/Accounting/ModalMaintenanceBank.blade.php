<div class="modal fade" id="modalBank" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-modal-width">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabelBank">Tambah Bank</h5>
            </div>
            <div class="modal-body">
                <div class="form-container col-md-12">
                    <form id="formMaintenanceBank">
                        {{ csrf_field() }}
                        <input type="hidden" name="_method">
                        <!-- Form fields go here -->
                        <div style="display: flex;flex-direction:row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="idBank" style="width: 51%">Id. Bank</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" style="width: 100%" id="idBank"
                                            name="idBank" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="namaBank" style="width: 51%">Nama Bank</label>
                                    <div class="input-group">
                                        <input type="text" id="isiNamaBank" name="isiNamaBank" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="idBank" style="width: 51%">Id. Bank</label>
                                    <div>
                                        <div class="col-auto">
                                            <input type="radio" name="jenisBankSelect" value="E"
                                                id="jenisBankSelect_E" checked>Eksterent
                                        </div>
                                        <div class="col-auto">
                                            <input type="radio" name="jenisBankSelect" value="I"
                                                id="jenisBankSelect_I">Interent
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="kodePerkiraanSelect" style="width: 100%;">Kode Perkiraan</label>
                                    <div class="input-group" style="display: flex; align-items: center;">
                                        <input type="hidden" id="ketKodePerkiraan" name="ketKodePerkiraan"
                                            class="form-control">
                                        <select name="kodePerkiraanSelect" id="kodePerkiraanSelect" class="form-control"
                                            style="width: auto">
                                            <option disabled selected>-- Pilih Kode Perkiraan --</option>
                                            @foreach ($kodePerkiraan as $kp)
                                                <option value="{{ $kp->NoKodePerkiraan }}">{{ $kp->NoKodePerkiraan }} |
                                                    {{ $kp->Keterangan }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="noRekening" style="width: 51%">No. Rekening</label>
                                    <div class="input-group">
                                        <input type="text" name="noRekening" id="noRekening" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="saldoBank" style="width: 51%">Saldo Bank</label>
                                    <div class="input-group">
                                        <input type="text" name="saldoBank" id="saldoBank" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="alamat" style="width: 51%">Alamat</label>
                                    <div class="input-group">
                                        <input type="text" name="alamat" id="alamat" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="kota" style="width: 51%">Kota</label>
                                    <div class="input-group">
                                        <input type="text" name="kota" id="kota" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="telp" style="width: 51%">Telp</label>
                                    <div class="input-group">
                                        <input type="text" name="telp" id="telp" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="person" style="width: 51%">Person</label>
                                    <div class="input-group">
                                        <input type="text" name="person" id="person" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="hp" style="width: 51%">HP</label>
                                    <div class="input-group">
                                        <input type="text" name="hp" id="hp" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary" id="prosesButtonModal">Proses</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Keluar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
