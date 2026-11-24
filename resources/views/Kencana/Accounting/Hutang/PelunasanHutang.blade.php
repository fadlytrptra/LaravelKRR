@extends('layouts.appKencana')
@section('content')
@section('title', 'Pelunasan Hutang')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance Pelunasan Hutang</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <!-- Form fields go here -->
                            <table class="table" id="table_atas">
                                <thead class="table-dark">
                                    <tr>
                                        <th style="width: 250px;">Supplier</th>
                                        <th>Tanggal Lunas</th>
                                        <th>BKK</th>
                                        <th>Mata Uang</th>
                                        <th>Nilai BKK</th>
                                        <th>ID. Supplier</th>
                                        <th>ID. Uang Supplier</th>
                                        <th>ID. Uang Tagih</th>
                                        <th>ID. Uang Supp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <br>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-2">
                                        <button class="btn btn-success" id="btn_proses"
                                            style="width: 130px">Proses</button>
                                    </div>
                                    <div class="col-10">
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center">
                                <div class="col-md-1">
                                    <label for="id_bayar" class="form-label">BKK</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" name="id_bayar" class="form-control" id="bkk">
                                </div>
                                <div class="col-md-1">
                                    <label for="id_detail" class="form-label">Bank</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" name="id_detail" class="form-control" id="bank">
                                </div>
                                <div class="col-md-1">
                                </div>
                                <div class="col-md-1">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn" style="width: 100px"
                                        id="btn_TT">TT</button>
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn" style="width: 100px" id="btn_TTppn">TT
                                        &lt;Ppn&gt;</button>
                                </div>
                            </div>
                            <div class="row align-items-center">
                                <div class="col-md-1">
                                    <label for="id_bayar" class="form-label">Mata Uang</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" name="id_bayar" class="form-control" id="mata_uangKiri">
                                </div>
                                <div class="col-md-1">
                                    <label for="id_detail" class="form-label">Nilai BKK</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" name="id_detail" class="form-control" id="nilai_bkk">
                                </div>
                                <div class="col-md-1">
                                </div>
                                <div class="col-md-1">
                                </div>
                                <div class="col-md-1">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn" style="width: 100px" id="btn_TTmurni">TT
                                        &lt;Murni&gt;</button>
                                </div>
                            </div>
                            <div class="row align-items-center">
                                <div class="col-md-1">
                                </div>
                                <div class="col-md-2">
                                </div>
                                <div class="col-md-1">
                                </div>
                                <div class="col-md-2">
                                </div>
                                <div class="col-md-1">
                                    <input type="text" name="tanggalS" class="form-control" id="tanggalS"
                                        style="width: 100px; display: none">
                                    <input type="text" name="id_uangS" class="form-control" id="id_uangS"
                                        style="width: 100px; display: none">
                                    <input type="text" name="supplierS" class="form-control" id="supplierS"
                                        style="width: 100px; display: none">
                                    <input type="text" name="bayarS" class="form-control" id="bayarS"
                                        style="width: 100px; display: none">
                                </div>
                                <div class="col-md-1">
                                    <label for="id_detail" class="form-label" style="margin-left: 50px">Mata
                                        Uang</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" name="id_detail" class="form-control" id="mata_uangKanan"
                                        style="width: 100px">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn" style="width: 100px" id="btn_TTnego">TT
                                        &lt;Nego&gt;</button>
                                </div>
                            </div>
                            <br>
                            <div class="card-container" style="display: flex;">
                                <div class="card" style="width: 60%;">
                                    <div class="card-body">
                                        <b>Data BKK</b>
                                        <div style="overflow-x: auto;">
                                            <table style="width: 100%;" id="table_kiri">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th style="width: 250px;">Rincian Bayar</th>
                                                        <th>Nilai Rincian</th>
                                                        <th>Nilai Rincian $</th>
                                                        <th>Kurs</th>
                                                        <th>Nilai Rincian Rp</th>
                                                        <th>Perkiraan</th>
                                                        {{-- <th>Symbol</th> --}}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <!--CARD 2-->
                                <div class="card" style="width: 40%;">
                                    <div class="card-body">
                                        <b>Data TT</b>
                                        <div style="overflow-x: auto;">
                                            <table style="width: 100%;" id="table_kanan">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Tanda Terima</th>
                                                        <th>No. Terima</th>
                                                        <th>Kurs</th>
                                                        <th>Harga Rp</th>
                                                        <th>Harga $</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row align-items-center">
                                    <div class="col-md-1">
                                        <label for="id_bayar" class="form-label">Total BKK Rp</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="id_bayar" class="form-control"
                                            id="totalBKK_rupiah">
                                    </div>
                                    <div class="col-md-1">
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button" class="btn btn-primary" style="width: 100px"
                                            id="btn_diJurnal">Di
                                            JURNAL</button>
                                    </div>
                                    <div class="col-md-1">
                                        <label for="id_bayar" class="form-label">Total TT Rp</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" name="id_bayar" class="form-control"
                                            id="totalTT_rupiah" style="width: 120%">
                                    </div>
                                    <div class="col-md-1">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn" style="width: 100px"
                                            id="btn_clear">Clear</button>
                                    </div>
                                </div>
                                <div class="row align-items-center">
                                    <div class="col-md-1">
                                        <label for="id_bayar" class="form-label">Total BKK $</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="id_bayar" class="form-control"
                                            id="totalBKK_dollar">
                                    </div>
                                    <div class="col-md-1">
                                    </div>
                                    <div class="col-md-2">
                                    </div>
                                    <div class="col-md-1">
                                        <label for="id_bayar" class="form-label">Total TT $</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" name="id_bayar" class="form-control"
                                            id="totalTT_dollar" style="width: 120%">
                                    </div>
                                    <div class="col-md-1">
                                    </div>
                                    <div class="col-md-1">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Tampil BKK-->
<div class="modal fade" id="dataBKKModal" tabindex="-1" aria-labelledby="dataBKKModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="dataBKKModalLabel">Data BKK</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" id="close_modalbkm">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group row">
                        <label for="kdPerkiraan" class="col-sm-2 col-form-label">Kode Perkiraan</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="kode_kiraM">
                        </div>
                        <div class="col-sm-5">
                            <input type="text" class="form-control" id="ket_kiraM">
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn" id="btn_perkiraanM">...</button>
                        </div>
                    </div>
                    <div class="form-group row mt-3">
                        <label class="col-sm-2 col-form-label" style="visibility: hidden">Nilai Jurnal:</label>
                        <div class="col-sm-4">
                            <label class="col-sm-2 col-form-label" style="font-weight: bold">Hutang</label>
                        </div>
                        <div class="col-sm-4">
                            <label class="col-sm-2 col-form-label" style="font-weight: bold">Pelunasan</label>
                        </div>
                    </div>
                    <div class="form-group row mt-3">
                        <label class="col-sm-2 col-form-label">Nilai Jurnal:</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="hutangM">
                        </div>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="pelunasanM">
                        </div>
                    </div>
                    <div class="form-group row mt-3">
                        <label for="keterangan" class="col-sm-2 col-form-label">Keterangan</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="keteranganM">
                        </div>
                    </div>
                    <div class="form-group row mt-3">
                        <div class="col-sm-10">
                            <button type="button" class="btn btn-primary" id="btn_simpanM">Simpan</button>
                            <button type="button" class="btn btn" id="btn_addM">Add</button>
                        </div>
                    </div>
                </form>
                <div class="table-responsive mt-3">
                    <table class="table table-bordered" id="table_jurnal">
                        <thead class="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>BKK</th>
                                <th>Kode Perkiraan</th>
                                <th>Nilai Debit</th>
                                <th>Nilai Kredit</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Dynamic rows will be added here -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/PelunasanHutang.js') }}"></script>
@endsection
