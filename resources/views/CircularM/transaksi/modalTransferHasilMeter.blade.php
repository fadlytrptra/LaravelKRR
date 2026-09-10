<style>
    .custom-modal-width {
        max-width: 90%;
        /* Adjust the percentage as needed */
    }
</style>
<div class="modal fade bd-example-modal-lg" id="modalKonversi">
    <div class="modal-dialog custom-modal-width">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Konversi Benang Ke Hasil Rol</h5>
            </div>
            <div class="modal-body">
                <div class="col-sm-2">
                    <label for="nama_mesin" class="form-label" style="font-weight: bold">Hasil Konversi</label>
                </div>
                <div class="row">
                    <div class="col-sm-1">
                        <label for="id_divisi">Divisi</label>
                    </div>
                    <div class="col-sm-1">
                        <input type="text" id="id_divisi" name="id_divisi" class="form-control">
                    </div>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="nama_divisi" name="nama_divisi">
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-sm-1">
                        <label for="id_objek">Objek</label>
                    </div>
                    <div class="col-sm-1">
                        <input type="text" id="id_objek" name="id_objek" class="form-control">
                    </div>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="nama_objek" name="nama_objek">
                    </div>
                    <div class="col-sm-1">
                        <label for="id_kelompok">&nbsp;&nbsp;&nbsp;Kelompok</label>
                    </div>
                    <div class="col-sm-1">
                        <input type="text" id="id_kelompok" name="id_kelompok" class="form-control">
                    </div>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="nama_kelompok" name="nama_kelompok">
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-sm-1">
                        <label for="id_kelompokUtama">Kelompok Utama</label>
                    </div>
                    <div class="col-sm-1">
                        <input type="text" id="id_kelompokUtama" name="id_kelompokUtama" class="form-control">
                    </div>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="nama_kelompokUtama" name="nama_kelompokUtama">
                    </div>
                    <div class="col-sm-1">
                        <label for="id_subKelompok">&nbsp;&nbsp;&nbsp;Sub Kelompok</label>
                    </div>
                    <div class="col-sm-1">
                        <input type="text" id="id_subKelompok" name="id_subKelompok" class="form-control">
                    </div>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="nama_subKelompok" name="nama_subKelompok">
                    </div>
                    <div class="col-sm-1">
                        <div class="input-group-append">
                            <button type="button" id="btn_subKelompok" class="btn btn-secondary">...</button>
                        </div>
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-sm-1">
                        <label for="id_type">Kode Type Barang</label>
                    </div>
                    <div class="col-sm-4">
                        <input type="text" id="id_type" name="id_type" class="form-control">
                    </div>
                    <div class="col-sm-1">
                        <label for="kode_barang">&nbsp;&nbsp;&nbsp;Kode Barang</label>
                    </div>
                    <div class="col-sm-4">
                        <input type="text" id="kode_barang" name="kode_barang" class="form-control">
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-sm-1">
                        <label for="nama_barang">Nama Barang</label>
                    </div>
                    <div class="col-sm-6">
                        <input type="text" id="nama_barang" name="nama_barang" class="form-control">
                    </div>
                    <div class="col-sm-1">
                        <label for="hasil_rumusKonversi">Hasil Rumus Konversi</label>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" id="hasil_rumusKonversi" name="hasil_rumusKonversi"
                            class="form-control">
                    </div>
                </div>
                <div class="baris-1 pl-3">
                    {{-- <div class="row mt-2 mb-2">
                        <span><strong>Posisi Saldo Akhir</strong></span>
                    </div> --}}
                    <div class="row">

                        <div class="col-sm-1 mb-2">
                            <label>Satuan Primer</label>
                        </div>
                        <div class="col-sm-2">
                            <div class="row">
                                <div class="col-8 pe-0">
                                    <input type="text" class="form-control" id="primer" name="primer">
                                </div>
                                <div class="col-4 ps-1">
                                    <input type="text" class="form-control" id="satuanPrimer"
                                        name="satuanPrimer">
                                </div>
                            </div>
                        </div>
                        {{-- <div class="col-sm-1" style="margin-left: -3%">
                            <span id="tujuanP">P</span>
                        </div> --}}

                        <div class="col-sm-1 mb-2">
                            <label>Satuan Sekunder</label>
                        </div>
                        <div class="col-sm-2" style="margin-left: 3%">
                            <div class="row">
                                <div class="col-8 pe-0">
                                    <input type="text" class="form-control" id="sekunder" name="sekunder">
                                </div>
                                <div class="col-4 ps-1">
                                    <input type="text" class="form-control" id="satuanSekunder"
                                        name="satuanSekunder">
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-1 mb-2">
                            <label>Satuan Tritier</label>
                        </div>
                        <div class="col-sm-2" style="margin-left: 3%">
                            <div class="row">
                                <div class="col-8 pe-0">
                                    <input type="text" class="form-control" id="tritier" name="tritier">
                                </div>
                                <div class="col-4 ps-1">
                                    <input type="text" class="form-control" id="satuanTritier"
                                        name="satuanTritier">
                                </div>
                            </div>
                        </div>
                        {{-- <div class="col-sm-1" style="margin-left: -3%">
                            <span id="tujuanT">T</span>
                        </div> --}}
                    </div>
                </div>
                <div class="col-sm-2">
                    <label for="nama_mesin" class="form-label" style="font-weight: bold">Asal Konversi</label>
                </div>
                <div class="row pt-1" style="overflow: auto">
                    <table class="table" id="table_modal">
                        <thead class="table-dark">
                            <tr>
                                <th>Kode Barang</th>
                                <th>Nama Barang</th>
                                <th>Primer</th>
                                <th>Sekunder</th>
                                <th>Tritier</th>
                                <th>Id Type</th>
                                <th>Saldo Primer</th>
                                <th>Saldo Sekunder</th>
                                <th>Saldo Tritier</th>
                                <th>Ket</th>
                                <th>Sub Kel</th>
                                <th>Id Sub Kel</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="row pt-1 align-items-center">
                    <div class="col-sm-2">
                        <label for="total_pemakaianBenang">Total Pemakaian Benang</label>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" id="total_pemakaianBenang" name="total_pemakaianBenang"
                            class="form-control">
                    </div>
                    <div class="col-sm d-flex justify-content-end">
                        <button type="button" id="btn_hitungBenang" class="btn btn-info">
                            Hitung Benang
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="w-100 text-start">
                    <div>
                        <label>1 - Bng Strip WA 2</label>
                        <label style="margin-left: 10px;">3 - Bng Strip WA 4</label>
                    </div>
                    <div>
                        <label>2 - Bng Strip WE</label>
                        <label style="margin-left: 25px;">4 - Bng WE</label>
                    </div>
                </div>
                <button type="button" id="btn_prosesModal" class="btn btn-success">PROSES</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">TUTUP</button>
            </div>

            {{-- <div class="row pt-1">
                <div class="col-sm-2">
                    <label>2 - Bng Strip WE</label>
                    <label>4 - Bng WE</label>
                </div>
            </div> --}}
        </div>
    </div>
</div>
