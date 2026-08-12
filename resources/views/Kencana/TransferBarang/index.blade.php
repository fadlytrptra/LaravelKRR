@extends('layouts.appKencana')
@section('title','Transfer Barang')
@section('content')

<style>
#table_trasferBarang tbody tr {
    cursor: pointer;
}

#table_trasferBarang tbody tr:hover {
    background-color: #eef5ff;
    cursor: pointer;
}

#table_trasferBarang tbody tr.selected {
    background-color: #cfe2ff !important;
}
</style>

<div class="container-fluid">
<div class="row justify-content-center">
    <div class="col-md-10 RDZMobilePaddingLR0">
        @if (Session::has('success'))
            <div class="alert alert-success">
                {{ Session::get('success') }}
            </div>
        @elseif (Session::has('error'))
            <div class="alert alert-danger">
                {{ Session::get('error') }}
            </div>
        @endif
        <div class="card font-weight-bold">
            <div class="card-header">Transfer Gudang</div>
            <div class="card-body" id="select2DropdownParent">
                <div class="row">
                    <div class="col-md-5 mt-2">
                        <label for="tanggal_terimaBarang">Tanggal Terima Barang</label>
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <input type="date" name="tgl_awal" id="tgl_awal" class="form-control">
                            </div>
                            <div class="col-md-6">
                                <input type="date" name="tgl_akhir" id="tgl_akhir" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 mt-2">
                        <label for="select_divisi">Divisi</label>
                        <select name="select_divisi" id="select_divisi" class="form-control"></select>
                    </div>
                    <div class="col-md-2 justify-content-end" style="display: inline-flex">
                        <button class="btn btn-info w-100" id="button_redisplay">Redisplay</button>
                    </div>
                </div>

                <div class="col-12 mt-4">
                    <div class="table-responsive">
                        <table id="table_trasferBarang" class="table table-bordered"
                            style="width:100%;white-space: nowrap;">
                            <thead class="table-primary">
                                <tr>
                                    <th>Tgl. Datang</th>
                                    <th>Kategori</th>
                                    <th>Sub Kategori</th>
                                    <th>Kode Barang</th>
                                    <th>Nama Barang</th>
                                    <th>Quantity</th>
                                    <th>Satuan</th>
                                    <th>Divisi</th>
                                    <th>No. Terima</th>
                                    <th>Harga</th>
                                    <th>NoSatuanPesan</th>
                                    <th>QtyTerima</th>
                                    <th>NoSatuanTerima</th>
                                    <th>IdMataUang</th>
                                    <th>Kurs</th>
                                    <th>SatTerima2</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mt-2">
                        <div class="col-md-12">
                            <label for="terima_divisi">Divisi</label>
                            <input type="text" name="terima_divisi" id="terima_divisi" class="form-control"
                                readonly>
                        </div>
                        <div class="col-md-12">
                            <label for="terima_objek">Objek</label>
                            <input type="text" name="terima_objek" id="terima_objek" class="form-control"
                                readonly>
                        </div>
                        <div class="col-md-12">
                            <label for="terima_kelompok">Kelompok</label>
                            <input type="text" name="terima_kelompok" id="terima_kelompok" class="form-control"
                                readonly>
                        </div>
                        <div class="col-md-12">
                            <label for="terima_kodeBarang">Kode Barang</label>
                            <input type="text" name="terima_kodeBarang" id="terima_kodeBarang"
                                class="form-control" readonly>
                        </div>
                        <div class="col-md-12">
                            <label for="terima_idType">Kode Type</label>
                            <input type="text" name="terima_idType" id="terima_idType"
                                class="form-control" readonly>
                        </div>
                        <div class="col-md-12">
                            <label for="terima_namaType">Nama Type</label>
                            <input type="text" name="terima_namaType" id="terima_namaType"
                                class="form-control" readonly>
                        </div>
                    </div>
                    <div class="col-md-6 mt-2">
                       <div class="col-md-12">
                            <label for="terima_kelompokUtama">Kelompok Utama</label>
                            <input type="text"
                                id="terima_kelompokUtama"
                                name="terima_kelompokUtama"
                                class="form-control"
                                readonly>
                        </div>
                        <div class="col-md-12">
                            <label for="terima_subKelompok">Sub Kelompok</label>
                            <input type="text" name="terima_subKelompok" id="terima_subKelompok"
                                class="form-control" readonly>
                            <input type="hidden" name="terima_idSubKelompok" id="terima_idSubKelompok"
                                class="form-control" readonly>
                        </div>
                        <div class="col-md-12">
                            <div style="display: flex; flex-direction: row;gap: 5%;">
                                <div style="display: flex;flex-direction: column;">
                                    <label for="terima_qtyPesan">Quantity Pesan</label>
                                    <div style="display: flex; flex-direction: row;gap: 2%;">
                                        <input type="text" name="terima_qtyPesan" id="terima_qtyPesan"
                                            class="form-control" readonly>
                                        <input type="text" name="terima_satQtyPesan" id="terima_satQtyPesan"
                                            class="form-control" readonly>
                                    </div>
                                </div>
                                <div style="display: flex;flex-direction: column;">
                                    <label for="terima_qtyTerima">Quantity Terima</label>
                                    <div style="display: flex; flex-direction: row;gap: 2%;">
                                        <input type="text" name="terima_qtyTerima" id="terima_qtyTerima"
                                            class="form-control" readonly>
                                        <input type="text" name="terima_satQtyTerima" id="terima_satQtyTerima"
                                            class="form-control" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mt-2">
                        <label>Saldo Akhir</label>
                        <input type="hidden" name="terima_noSatPrimer" id="terima_noSatPrimer"
                            class="form-control" readonly>
                        <input type="hidden" name="terima_noSatSekunder" id="terima_noSatSekunder"
                            class="form-control" readonly>
                        <input type="hidden" name="terima_noSatTritier" id="terima_noSatTritier"
                            class="form-control" readonly>
                        <div style="display: flex; flex-direction: row;gap: 5%;">
                            <div style="display: flex;flex-direction: column;">
                                <label for="terima_saldoAkhirPrimer">Primer</label>
                                <div style="display: flex; flex-direction: row;gap: 2%;">
                                    <input type="text" name="terima_saldoAkhirPrimer"
                                        id="terima_saldoAkhirPrimer" class="form-control" readonly>
                                    <input type="text" name="terima_satSaldoAkhirPrimer"
                                        id="terima_satSaldoAkhirPrimer" class="form-control" readonly>
                                </div>
                            </div>
                            <div style="display: flex;flex-direction: column;">
                                <label for="terima_saldoAkhirSekunder">Sekunder</label>
                                <div style="display: flex; flex-direction: row;gap: 2%;">
                                    <input type="text" name="terima_saldoAkhirSekunder"
                                        id="terima_saldoAkhirSekunder" class="form-control" readonly>
                                    <input type="text" name="terima_satSaldoAkhirSekunder"
                                        id="terima_satSaldoAkhirSekunder" class="form-control" readonly>
                                </div>
                            </div>
                            <div style="display: flex;flex-direction: column;">
                                <label for="terima_saldoAkhirTritier">Tritier</label>
                                <div style="display: flex; flex-direction: row;gap: 2%;">
                                    <input type="text" name="terima_saldoAkhirTritier"
                                        id="terima_saldoAkhirTritier" class="form-control" readonly>
                                    <input type="text" name="terima_satSaldoAkhirTritier"
                                        id="terima_satSaldoAkhirTritier" class="form-control" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mt-2">
                        <label>Jumlah Transfer</label>
                        <div style="display: flex; flex-direction: row;gap: 5%;">
                            <div style="display: flex;flex-direction: column;">
                                <label for="terima_jumlahTerimaPrimer">Primer</label>
                                <div style="display: flex; flex-direction: row;gap: 2%;">
                                    <input type="text" name="terima_jumlahTerimaPrimer"
                                        id="terima_jumlahTerimaPrimer" class="form-control">
                                    <input type="text" name="terima_satJumlahTerimaPrimer"
                                        id="terima_satJumlahTerimaPrimer" class="form-control" readonly>
                                </div>
                            </div>
                            <div style="display: flex;flex-direction: column;">
                                <label for="terima_jumlahTerimaSekunder">Sekunder</label>
                                <div style="display: flex; flex-direction: row;gap: 2%;">
                                    <input type="text" name="terima_jumlahTerimaSekunder"
                                        id="terima_jumlahTerimaSekunder" class="form-control">
                                    <input type="text" name="terima_satJumlahTerimaSekunder"
                                        id="terima_satJumlahTerimaSekunder" class="form-control" readonly>
                                </div>
                            </div>
                            <div style="display: flex;flex-direction: column;">
                                <label for="terima_jumlahTerimarTritier">Tritier</label>
                                <div style="display: flex; flex-direction: row;gap: 2%;">
                                    <input type="text" name="terima_jumlahTerimaTritier"
                                        id="terima_jumlahTerimaTritier" class="form-control">
                                    <input type="text" name="terima_satJumlahTerimaTritier"
                                        id="terima_satJumlahTerimaTritier" class="form-control" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 mt-4 text-center">
                    <button class="btn btn-success w-25" id="button_transfer">Transfer</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/TransferBarang.js') }}"></script>

@endsection
