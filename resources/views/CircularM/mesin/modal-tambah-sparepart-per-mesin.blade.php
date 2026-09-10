<!-- Modal -->
<div class="modal fade" id="modal_tambahSparepartPerMesin" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_tambahSparepartPerMesinLabel">Tambah Sparepart Per Mesin </h5>
                <button type="button" class="btn-close" id="modal_tambah_closeButton"></button>
            </div>
            <div class="modal-body" id="modal_tambahSparepartPerMesinBody">
                <div class="form-group">
                    <label for="modal_tambah_Mesin">Mesin</label>
                    <div class="input-group">
                        <select id="modal_tambah_Mesin" class="form-select form-select-sm">
                            <option selected>-- Pilih Mesin --</option>
                            @foreach ($listMesin as $d)
                                <option value="{{ $d->Id_mesin }}"> {{ $d->Nama_mesin }} </option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="modal_tambah_NamaSparepart">Nama Sparepart</label>
                    <div class="input-group">
                        <select name="modal_tambah_NamaSparepart"
                            id="modal_tambah_NamaSparepart" class="form-select form-select-sm">
                            <option disabled selected>-- Pilih Sparepart --</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="modal_tambah_KeteranganSparepart">Keterangan Sparepart</label>
                    <div class="input-group">
                        <div class="form-control" style="height: auto;">
                            <span id="modal_tambah_KeteranganSparepart">-</span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="modal_tambah_KodeBarang">Kode Barang</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="modal_tambah_KodeBarang"
                            name="modal_tambah_KodeBarang">
                    </div>
                </div>
                <div class="form-group">
                    <label for="modal_tambah_namaBarang">Nama Barang</label>
                    <div class="input-group">
                        <div class="form-control" style="height: auto;">
                            <span id="modal_tambah_namaBarang">-</span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="modal_tambah_Lifetime">Lifetime</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="modal_tambah_Lifetime"
                            name="modal_tambah_Lifetime" min="0" value="0">
                    </div>
                </div>
                <button type="submit" class="btn btn-success" style="margin-top: 5px"
                    id="modal_tambah_ButtonProses">Proses</button>
            </div>
        </div>
    </div>
</div>
