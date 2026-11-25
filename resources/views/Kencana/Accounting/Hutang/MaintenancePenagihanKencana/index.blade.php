@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance Penagihan Kencana')
@include('Kencana/Accounting/Hutang/MaintenancePenagihanKencana/modalTTSPPBKencana')
@include('Kencana/Accounting/Hutang/MaintenancePenagihanKencana/modalTTPajakKencana')
@include('Kencana/Accounting/Hutang/MaintenancePenagihanKencana/modalTTKeteranganKencana')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Tanda Terima Penagihan</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div style="display: flex; flex-direction: row;margin-top: 1rem; gap: 5px">
                        <div style="display: flex; flex-direction: column;flex: 0.1;">
                            <label for="tanggal_penagihan">Tanggal</label>
                            <input type="date" name="tanggal_penagihan" id="tanggal_penagihan" class="form-control">
                        </div>
                        <div style="display: flex; flex-direction: column;">
                            <label for="nama_supplier">Supplier</label>
                            <input type="text" name="nama_supplier" id="nama_supplier" class="form-control" readonly>
                            <input type="hidden" name="id_supplier" id="id_supplier">
                        </div>
                        <div style="align-content: end">
                            <button class="btn btn-primary" id="button_browseSupplier">...</button>
                        </div>
                        <div style="display: flex; flex-direction: column;" id="div_idPenagihan">
                            <label for="id_penagihan">Id Penagihan</label>
                            <input type="text" name="id_penagihan" id="id_penagihan" class="form-control" readonly>
                        </div>
                        <div style="align-content: end">
                            <button class="btn btn-primary" id="button_browseIdPenagihan">...</button>
                        </div>
                        <div style="display: flex; flex-direction: column;">
                            <label>Status Pajak</label>
                            <div style="display: flex; flex-direction: row;">
                                <div style="display: flex; flex-direction: row">
                                    <div class="p-2" style="display: flex; flex-direction: row;">
                                        <input style="margin-right: 5px" type="radio" name="status_pajak"
                                            id="status_pajakAda" value="Y">
                                        <label style="margin: 0; align-content: center;"
                                            for="status_pajakAda">Ada</label>
                                    </div>
                                    <div class="p-2" style="display: flex; flex-direction: row;">
                                        <input style="margin-right: 5px" type="radio" name="status_pajak"
                                            id="status_pajakTidakAda" value="N">
                                        <label style="margin: 0; align-content: center;"
                                            for="status_pajakTidakAda">Tidak Ada</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column;width: 15%;">
                            <label for="jenis_dokumen">Jenis / Jumlah Dokumen</label>
                            <div style="display: flex; flex-direction: row;">
                                <input type="text" name="jenis_dokumen" id="jenis_dokumen" class="form-control"
                                    style="flex: 0.8;" readonly>
                                <input type="hidden" name="id_jenisDokumen" id="id_jenisDokumen">
                                <button class="btn btn-primary" id="button_browseJenisDokumen">...</button>
                                <input type="number" name="jumlah_dokumen" id="jumlah_dokumen" class="form-control"
                                    style="flex: 0.2;" min="0">
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column;" id="div_idPenagihanSupplier">
                            <label for="id_penagihanSupplier">Invoice Supplier</label>
                            <input type="text" name="id_penagihanSupplier" id="id_penagihanSupplier"
                                class="form-control" readonly>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 1rem; gap: 5px">
                        <div style="display: flex; flex-direction: column;">
                            <label for="nama_mataUang">Mata Uang</label>
                            <input type="text" name="nama_mataUang" id="nama_mataUang" class="form-control" readonly>
                            <input type="hidden" name="id_mataUang" id="id_mataUang">
                        </div>
                        <div style="display: flex; flex-direction: column;">
                            <label for="nilai_tagihan">Tagihan</label>
                            <input type="text" name="nilai_tagihan" id="nilai_tagihan" class="form-control" readonly>
                        </div>
                        <div style="align-content: end">
                            <button class="btn btn-primary" id="button_pembulatanBawahTagihan">
                                <<</button>
                        </div>
                        <div style="align-content: end">
                            <button class="btn btn-primary" id="button_pembulatanAtasTagihan">>></button>
                        </div>
                        <div style="align-content: end">
                            <button class="btn btn-primary" id="button_rupiahkanTagihan">Dirupiahkan</button>
                        </div>
                        <div style="display: flex; flex-direction: column;">
                            <label for="nilai_akhir">Nilai Akhir</label>
                            <input type="text" name="nilai_akhir" id="nilai_akhir" class="form-control" readonly>
                        </div>
                        <div style="align-content: end">
                            <button class="btn btn-success" id="button_nilaiAkhir">Nilai Akhir</button>
                        </div>
                        <div style="align-content: end">
                            <button class="btn btn-info" id="button_keterangan">Keterangan</button>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: row;margin-top: 1rem; gap: 5px">
                        <div class="p-2"
                            style="flex: 0.5; flex-direction: column;width: 100%;border: 1px gray solid;">
                            <div style="overflow: auto;">
                                <table class="mt-2" style="width: 100%;" id="table_detailSPPB">
                                    <thead>
                                        <tr>
                                            <th>Divisi</th>
                                            <th>SPPB</th>
                                            <th>Tgl. Nota</th>
                                            <th>No. Nota</th>
                                            <th>Nilai Nota</th>
                                            <th>Surat Jln.</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="mt-2" style="display: flex; flex-direction: column;">
                                <label for="total_detailPenagihan">Total Detail Penagihan</label>
                                <input type="text" name="total_detailPenagihan" id="total_detailPenagihan"
                                    class="form-control" readonly>
                            </div>
                            <div class="mt-2" style="display: flex; flex-direction: row;">
                                <button class="btn btn-primary" id="button_isiDetailSPPB">Isi</button>
                                <button class="btn btn-warning" id="button_koreksiDetailSPPB">Koreksi</button>
                                <button class="btn btn-danger" id="button_hapusDetailSPPB">Hapus</button>
                            </div>
                        </div>
                        <div class="p-2" style="flex: 0.5; flex-direction: column;border: 1px gray solid;">
                            <div style="overflow: auto;">
                                <table class="mt-2" style="width: 100%;" id="table_detailFakturPajak">
                                    <thead>
                                        <tr>
                                            <th>Id Detail</th>
                                            <th>No. Faktur</th>
                                            <th>Harga Murni</th>
                                            <th>Pajak (%)</th>
                                            <th>Harga Pajak</th>
                                            <th>Kurs</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="mt-2" style="display: flex; flex-direction: column;">
                                <label for="total_detailFakturPajak">Total Detail Faktur Pajak</label>
                                <input type="text" name="total_detailFakturPajak" id="total_detailFakturPajak"
                                    class="form-control" readonly>
                            </div>
                            <div class="mt-2" style="display: flex; flex-direction: row;">
                                <button class="btn btn-primary" id="button_isiDetailFakturPajak">Isi</button>
                                <button class="btn btn-warning" id="button_koreksiDetailFakturPajak">Koreksi</button>
                                <button class="btn btn-danger" id="button_hapusDetailFakturPajak">Hapus</button>
                            </div>
                        </div>
                    </div>
                    <div class="mt-2" style="display: flex; flex-direction: row;">
                        <button class="btn btn-primary" id="button_isiPenagihan">Isi</button>
                        <button class="btn btn-warning" id="button_koreksiPenagihan">Koreksi</button>
                        <button class="btn btn-secondary" id="button_cancelPenagihan">Cancel</button>
                        <button class="btn btn-info" id="button_cetakPenagihan">Cetak</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/MaintenancePenagihan.js') }}"></script>
@endsection
