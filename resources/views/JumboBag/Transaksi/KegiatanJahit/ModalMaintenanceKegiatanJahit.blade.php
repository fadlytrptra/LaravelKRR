<style>
    #table_detail {
        width: 100% !important;
        white-space: nowrap;
    }

    #table_detail th,
    #table_detail td {
        white-space: nowrap;
        vertical-align: middle;
    }

    .table-container {
        width: 100%;
        overflow-x: auto;
    }
</style>
<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="tambahKegiatanJahitModal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog" style="max-width: 95%">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahKegiatanJahitLabel">Tambah Kegiatan Mesin</h5>
                <button type="button" class="close" id="closeTambahKegiatanJahitModal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group" style="flex: 0.1">
                            <label for="tanggalLog">Tanggal Log</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="tanggalLog" name="tanggalLog"
                                    enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.10" id="div_parentSelectNamaLine">
                            <label for="namaLine">Line</label>
                            <div class="input-group">
                                <select id="namaLine" class="form-select form-select-sm" style="width: 100%">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    {{-- @foreach ($listLokasi as $d)
                                    <option value="{{ $d->idLokasi }}">
                                        {{ $d->idLokasi . ' | ' . $d->nama_lokasi }}
                                    </option>
                                @endforeach --}}
                                </select>
                                {{-- <select name="namaMesinPotong" id="namaMesinPotong"></select> --}}
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="shiftJahit">Shift</label>
                            <div class="input-group">
                                <input type="text" name="shiftJahit" id="shiftJahit" class="form-control"
                                    placeholder="[P] [S] [M]" enterkeyhint="enter">
                            </div>
                        </div>
                    </div>
                    <div class="table-container">
                        <table class="table table-bordered" id="table_detail" style="width: 100%">
                            <thead class="table-dark">
                                <tr>
                                    <th>ID Detail</th>
                                    <th>Nama Operator</th>
                                    <th>Kode Pegawai</th>
                                    <th>Status</th>
                                    <th>Customer</th>
                                    <th>Type Barang</th>
                                    <th>STD Waktu</th>
                                    <th>Hasil</th>
                                    <th>No Label</th>
                                    <th>Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.32" id="div_parentSelectNamaOperator">
                            <label for="nama_operator">Nama Operator</label>
                            <div class="input-group">
                                <select name="nama_operator" id="nama_operator"></select>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.10" id="div_parentSelectStatus">
                            <label for="status">Status</label>
                            <div class="input-group">
                                <select id="status" class="form-select form-select-sm" style="width: 100%">
                                    <option>M</option>
                                    <option>A</option>
                                    <option>S</option>
                                    <option>C</option>
                                    <option>I</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.32" id="div_parentSelectCustomerTableHit">
                            <label for="customer_tableHit">Customer</label>
                            <div class="input-group">
                                <select name="customer_tableHit" id="customer_tableHit"></select>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.32" id="div_parentSelectKodeBarangTableHit">
                            <label for="kodebarang_tableHit">Kode Barang Tabel Hit.</label>
                            <div class="input-group">
                                <select name="kodebarang_tableHit" id="kodebarang_tableHit"></select>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.14">
                            <label for="std_waktu">STD Waktu</label>
                            <div class="input-group">
                                <input type="number" name="std_waktu" id="std_waktu" class="form-control"
                                    min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.14">
                            <label for="hasil">Hasil</label>
                            <div class="input-group">
                                <input type="number" name="hasil" id="hasil" class="form-control" min="0"
                                    enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="form-group" style="flex: 0.4">
                            <label for="no_label">No Label</label>
                            <div class="input-group">
                                <textarea name="no_label" id="no_label" class="form-control" rows="3"></textarea>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.7">
                            <label for="keterangan_kegiatan">Keterangan</label>
                            <div class="input-group">
                                <input type="text" name="keterangan_kegiatan" id="keterangan_kegiatan"
                                    class="form-control" min="0" enterkeyhint="enter">
                            </div>
                        </div>
                        <div class="d-flex align-self-center">
                            <button type="button" class="btn btn-primary h-25" id="btn_add">Add</button>
                            <button type="button" class="btn btn-warning h-25" id="btn_update">Edit</button>
                            <button type="button" class="btn btn-danger h-25" id="btn_delete">Delete</button>
                        </div>
                    </div>
                    <hr>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.15" id="div_totalHasil">
                            <label for="total_hasil">Total Hasil</label>
                            <div class="input-group">
                                <input type="number" name="total_hasil" id="total_hasil" class="form-control"
                                    min="0" enterkeyhint="enter" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15" id="div_jumlahOperator">
                            <label for="jumlah_operator">Jumlah Operator</label>
                            <div class="input-group">
                                <input type="number" name="jumlah_operator" id="jumlah_operator"
                                    class="form-control" min="0" enterkeyhint="enter" readonly>
                            </div>
                        </div>
                    </div>
                    @if (
                        $user == '4405' ||
                            $user == '4221' ||
                            $user == '4259' ||
                            $user == '8982' ||
                            $user == '4384' ||
                            $user == '4451' ||
                            $user == '4199')
                        <div class="d-flex" style="gap: 0.5%;width: 100%">
                        @else
                            <div style="display:none">
                    @endif
                </div>
            </div>
            <button class="btn btn-success" id="button_modalProses">Proses</button>
        </div>
    </div>
</div>
</div>
