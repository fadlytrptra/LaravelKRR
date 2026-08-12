<div class="modal fade" id="koreksiKursModal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog" style="max-width: 90%;">
        <div class="modal-content" id="select2DropdownParentKoreksiKurs">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="koreksiKursModalLabel">Koreksi Kurs BTTB </h5>
                <button type="button" class="close" data-bs-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-md-12">
                    <div class="col-md-3">
                        <label class="font-weight-bold" for="koreksiKurs_noFaktur">Nomor Faktur</label>
                        <input type="text" name="koreksiKurs_noFaktur" id="koreksiKurs_noFaktur"
                            class="form-control font-weight-bold">
                    </div>
                    <div class="mt-4">
                        <div class="table-responsive">
                            <table class="mx-auto table table-bordered" id="koreksiKurs_tableBarang"
                                style="white-space: nowrap">
                                <thead class="table-primary">
                                    <tr>
                                        <th>Tgl. Datang</th>
                                        <th>Kd. Barang</th>
                                        <th>Nama Barang</th>
                                        <th>Harga</th>
                                        <th>Kurs</th>
                                        <th>No. Terima</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="table-responsive">
                            <table class="mx-auto table table-bordered" id="koreksiKurs_tableKurs"
                                style="white-space: nowrap">
                                <thead class="table-primary">
                                    <tr>
                                        <th>No. Terima</th>
                                        <th>Hrg. Terima</th>
                                        <th>Kurs Rupiah</th>
                                        <th>Qty. Terima</th>
                                        <th>Tgl. Datang</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="table-responsive">
                            <table class="mx-auto table table-bordered" id="koreksiKurs_tableSales"
                                style="white-space: nowrap">
                                <thead class="table-primary">
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Id Header Kirim</th>
                                        <th>Id Trans Tmp</th>
                                        <th>Qty. Tritier</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="table-responsive">
                            <table class="mx-auto table table-bordered" id="koreksiKurs_tableJual"
                                style="white-space: nowrap">
                                <thead class="table-primary">
                                    <tr>
                                        <th>Tgl. Datang</th>
                                        <th>Hrg. Terima</th>
                                        <th>Kurs Rupiah</th>
                                        <th>Qty Jual2</th>
                                        <th>No. Terima</th>
                                        <th>No. PIB Ext</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <input type="hidden" name="koreksiKurs_nomorTerima" id="koreksiKurs_nomorTerima">
                    <div class="col-md-3">
                        <label class="font-weight-bold" for="koreksiKurs_kodeBarang">Kode Barang</label>
                        <input type="text" name="koreksiKurs_kodeBarang" id="koreksiKurs_kodeBarang"
                            class="form-control font-weight-bold" readonly>
                    </div>
                    <div class="col-md-5">
                        <label class="font-weight-bold" for="koreksiKurs_namaBarang">Nama Barang</label>
                        <input type="text" name="koreksiKurs_namaBarang" id="koreksiKurs_namaBarang"
                            class="form-control font-weight-bold" readonly>
                    </div>
                    <div class="col-md-3">
                        <label class="font-weight-bold" for="koreksiKurs_harga">Harga</label>
                        <input type="number" name="koreksiKurs_harga" id="koreksiKurs_harga"
                            class="form-control font-weight-bold" readonly>
                    </div>
                    <div class="col-md-3">
                        <label class="font-weight-bold" for="koreksiKurs_kurs">Kurs</label>
                        <input type="number" name="koreksiKurs_kurs" id="koreksiKurs_kurs"
                            class="form-control font-weight-bold">
                    </div>
                    <div class="col-md-3">
                        <label class="font-weight-bold" for="koreksiKurs_totalBayar">Total Bayar</label>
                        <input type="text" name="koreksiKurs_totalBayar" id="koreksiKurs_totalBayar"
                            class="form-control font-weight-bold" readonly>
                    </div>
                </div>
                <div class="col-md-6 mt-2">
                    <button type="submit" class="btn btn-success" id="koreksiKurs_Proses">Proses</button>
                </div>
            </div>
        </div>
    </div>
</div>
