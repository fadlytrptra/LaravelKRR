<!-- Modal untuk Tambah Mesin JBB -->
<div class="modal fade" id="tambahMesinJBBModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahMesinJBBLabel">Tambah Mesin </h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="namaMesin">Nama Mesin</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="namaMesin" name="namaMesin">
                    </div>
                </div>
                <div class="form-group">
                    <label for="lokasiMesin">Lokasi</label>
                    <div class="input-group">
                        <select name="select_lokasiMesin" id="select_lokasiMesin" class="form-control">
                            <option disabled selected>-- Pilih Lokasi --</option>
                            @foreach ($lokasi as $l)
                                <option value="{{ $l->Id_Lokasi }}">{{ $l->Lokasi }} |
                                    {{ $l->Id_Lokasi }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="typeMesin">Type Mesin</label>
                    <div class="input-group">
                        <select name="select_typeMesin" id="select_typeMesin" class="form-control">
                            <option disabled selected>-- Pilih Type --</option>
                        </select>
                        <button class="btn btn-secondary" id="button_tambahTypeMesin">+</button>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
