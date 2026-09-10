<!-- Modal -->
<div class="modal fade" id="modal_tambahLogMaintenanceSparepart" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="modal_tambahLogMaintenanceSparepartLabel" aria-hidden="true">
    <div class="modal-dialog modal-xxl">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-3" id="md_title">Tambah Log Maintenance</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="form_tambahLogMaintenanceMesin">
                    <div class="row">
                        <div class="col-md-6" style="padding-right: 5%;border-bottom">
                            <div class="row">
                                <div class="col-md-5">
                                    <label for="mesin">Mesin</label>
                                </div>

                                <div class="col-md-7">
                                    <select id="mesin" class="form-select form-select-sm">
                                        @foreach ($listMesin as $d)
                                            <option value="{{ $d->Id_mesin }}"> {{ $d->Nama_mesin }} </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-5">
                                    <label for="jenis_maintenance">Jenis Maintenance</label>
                                </div>

                                <div class="col-md-7">
                                    <div class="input-group input-group-sm">
                                        <select id="jenis_maintenance" class="form-select form-select-sm">
                                            <option>Perawatan</option>
                                            <option>Ganti Sparepart</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-5">
                                    <label for="tanggal_maintenance">Tanggal Maintenance</label>
                                </div>

                                <div class="col-md-7">
                                    <div class="input-group input-group-sm">
                                        <input type="date" id="tanggal_maintenance" name="tanggal_maintenance"
                                            class="form-control form-control-sm">
                                    </div>
                                </div>
                            </div>
                            {{-- <div id="jenis_maintenance_penggantian" style="display: none">
                                <div class="row mt-2">
                                    <div class="col-md-5">
                                        <label for="nama_barang">Nama Barang</label>
                                    </div>

                                    <div class="col-md-7">
                                        <div class="input-group input-group-sm">
                                            <select id="nama_barang" class="form-select form-select-sm">
                                                <option selected disabled>-- Pilih Barang --</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-2">
                                    <div class="col-md-5">
                                        <label for="kode_barang">Kode Barang</label>
                                    </div>

                                    <div class="col-md-7">
                                        <input type="text" id="kode_barang" class="form-control form-control-sm"
                                            placeholder="Kode Barang" readonly>
                                    </div>
                                </div>

                                <div class="row mt-2">
                                    <div class="col-md-5">
                                        <label for="jumlah_tritier">Jumlah Pemakaian</label>
                                    </div>

                                    <div class="col-md-7">
                                        <input type="number" id="jumlah_tritier" class="form-control form-control-sm"
                                            placeholder="0" min="0">
                                    </div>
                                </div>
                            </div> --}}
                        </div>

                        <div class="col-md-6" style="padding-left: 5%">
                            <div class="row">
                                <div class="col-md-5">
                                    <label for="keterangan">Keterangan Maintenance</label>
                                </div>

                                <div class="col-md-7">
                                    <textarea name="keterangan" id="keterangan" rows="2" class="form-control"></textarea>
                                </div>
                            </div>

                            <div class="d-flex justify-content-center mt-4">
                                <div class="form-check">
                                    <input type="checkbox" id="status_lanjut" class="form-check-input me-2"
                                        value="lanjut" checked>
                                    <label class="form-check-label" for="status_lanjut">Status, centang jika maintenance
                                        selesai</label>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 mt-4 border-top border-dark bg-light p-2">
                            <h3 class="fs-5">Barang Pendukung Maintenance</h3>
                            <div class="row mt-2">
                                <div class="col-md-6" style="padding-right: 5%">
                                    <div class="row mt-2">
                                        <div class="col-md-4">
                                            <label for="divisi_barangPendukung">Divisi</label>
                                        </div>
                                        <div class="col-md-8">
                                            <select id="divisi_barangPendukung" class="form-select form-select-sm">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-4">
                                            <label for="kelompokUtama_barangPendukung">Kelompok Utama</label>
                                        </div>
                                        <div class="col-md-8">
                                            <select id="kelompokUtama_barangPendukung"
                                                class="form-select form-select-sm">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-4">
                                            <label for="subKelompok_barangPendukung">Sub Kelompok</label>
                                        </div>
                                        <div class="col-md-8">
                                            <select id="subKelompok_barangPendukung"
                                                class="form-select form-select-sm">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-4">
                                            <label for="kodeBarang_barangPendukung">Kode Barang</label>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="input-group input-group-sm">
                                                <input type="text" id="kodeBarang_barangPendukung"
                                                    placeholder="000000000" name="kodeBarang_barangPendukung"
                                                    class="form-control form-control-sm">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-4">
                                            <label for="nama_sparepart">Nama Sparepart</label>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="input-group input-group-sm">
                                                <select id="nama_sparepart" class="form-select form-select-sm">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding-right: 5%">
                                    <div class="row mt-2">
                                        <div class="col-md-4">
                                            <label for="objek_barangPendukung">Objek</label>
                                        </div>
                                        <div class="col-md-8">
                                            <select id="objek_barangPendukung" class="form-select form-select-sm">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-4">
                                            <label for="kelompok_barangPendukung">Kelompok</label>
                                        </div>
                                        <div class="col-md-8">
                                            <select id="kelompok_barangPendukung" class="form-select form-select-sm">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-4">
                                            <label for="idType_barangPendukung">Id Type</label>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="input-group input-group-sm">
                                                <input type="text" id="idType_barangPendukung"
                                                    placeholder="00000000000000000000" name="idType_barangPendukung"
                                                    class="form-control form-control-sm" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-4">
                                            <label for="namaBarang_barangPendukung">Nama Barang</label>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="input-group input-group-sm">
                                                <input type="text" id="namaBarang_barangPendukung"
                                                    placeholder="Nama Barang" name="namaBarang_barangPendukung"
                                                    class="form-control form-control-sm" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-9">
                                    <div class="row mt-2">
                                        <div class="col-md-2">
                                            <label for="saldo_barangPendukung">Saldo</label>
                                        </div>
                                        <div class="col-md-10">
                                            <div class="d-flex gap-2 align-items-center">
                                                <input type="text" id="saldoPrimer_barangPendukung"
                                                    placeholder="0" name="saldoPrimer_barangPendukung"
                                                    class="form-control form-control-sm" style="width: 10%" readonly>
                                                <label id="satuanSaldoPrimer_barangPendukung">X</label>

                                                <input type="text" id="saldoSekunder_barangPendukung"
                                                    placeholder="0" name="saldoSekunder_barangPendukung"
                                                    class="form-control form-control-sm" style="width: 10%" readonly>
                                                <label id="satuanSaldoSekunder_barangPendukung">X</label>

                                                <input type="text" id="saldoTritier_barangPendukung"
                                                    placeholder="0" name="saldoTritier_barangPendukung"
                                                    class="form-control form-control-sm" style="width: 10%" readonly>
                                                <label id="satuanSaldoTritier_barangPendukung">X</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-2">
                                            <label for="pemakaian_barangPendukung">Jumlah Pemakaian</label>
                                        </div>
                                        <div class="col-md-10">
                                            <div class="d-flex gap-2 align-items-center">
                                                <input type="text" id="pemakaianPrimer_barangPendukung"
                                                    placeholder="0" name="pemakaianPrimer_barangPendukung"
                                                    class="form-control form-control-sm" style="width: 10%">
                                                <label id="satuanPemakaianPrimer_barangPendukung">X</label>

                                                <input type="text" id="pemakaianSekunder_barangPendukung"
                                                    placeholder="0" name="pemakaianSekunder_barangPendukung"
                                                    class="form-control form-control-sm" style="width: 10%">
                                                <label id="satuanPemakaianSekunder_barangPendukung">X</label>

                                                <input type="text" id="pemakaianTritier_barangPendukung"
                                                    placeholder="0" name="pemakaianTritier_barangPendukung"
                                                    class="form-control form-control-sm" style="width: 10%">
                                                <label id="satuanPemakaianTritier_barangPendukung">X</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3" style="padding-right: 5%">
                                    <div class="row mt-2 d-flex justify-content-end">
                                        <div class="col-md-5">
                                            <button class="btn btn-danger">Hapus</button>
                                        </div>
                                        <div class="col-md-5">
                                            <button class="btn btn-success">Tambah</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4" style="overflow: auto">
                                <table id="table_barangTambahanMaintenanceMesin" style="white-space: nowrap">
                                    <thead>
                                        <tr>
                                            <th>Nama Barang</th>
                                            <th>Kode Barang</th>
                                            <th>Pemakaian Primer</th>
                                            <th>Satuan Primer</th>
                                            <th>Pemakaian Sekunder</th>
                                            <th>Satuan Sekunder</th>
                                            <th>Pemakaian Tritier</th>
                                            <th>Satuan Tritier</th>
                                            <th>Id Type</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="modal_ok" class="btn btn-primary">OK</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

{{-- <script src="{{ asset('js/circular/modal-table.js') }}"></script> --}}
