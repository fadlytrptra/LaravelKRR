@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance BKK (KRR2)')
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance BKK (KRR2)</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <table class="table" id="tableatas" style="table-layout: fixed; width: 100%;">
                                <thead class="table-dark">
                                    <tr>
                                        <th style="width: 45px;">ID. Bayar</th>
                                        <th style="width: 75px;">ID. TT</th>
                                        <th style="width: 40px;">Bank</th>
                                        <th style="width: 150px;">Nama Supplier</th>
                                        <th style="width: 190px;">Rincian Pembayaran</th>
                                        <th style="width: 120px;">Nilai Bayar</th>
                                        <th style="width: 120px;">Jenis Bayar</th>
                                        <th style="width: 100px;">Mata Uang</th>
                                        <th style="width: 120px;">Jumlah Bayar</th>
                                        <th style="width: 120px;">Mata Uang PO</th>
                                        <th style="width: 100px;">ID. Jenis Bayar</th>
                                        <th style="width: 100px;">ID. Mata Uang</th>
                                        <th style="width: 100px;">ID. Supplier</th>
                                        <th style="width: 100px;">Jenis Bank</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>


                            <br>
                            <div class="row">
                                <div class="col">
                                    <div class="d-flex">
                                        <button class="btn" type="button" id="btn_group">Group BKK</button>
                                        <p>&nbsp;</p>
                                        <button class="btn" type="button" id="btn_refresh">Refresh BKK</button>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="d-flex">
                                        <button class="btn" type="button" id="btn_tampil">Tampil BKK</button>
                                        <button class="btn" type="button" id="btn_gantiBank">Ganti Bank</button>
                                        <div class="col-md-3 ml-auto">
                                            <label for="id">ID. Pembayaran</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input id="id_pembayaran" type="text" name="id_pembayaran"
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr style="height:2px;">
                            <div class="card-container" style="display: flex;">
                                <div class="card" style="width: 50%;">
                                    <div class="card-body">
                                        <div class="col">
                                            <div class="d-flex">
                                                <div>
                                                    <input type="radio" name="radiogrup" value="radio_1"
                                                        id="radio_1">
                                                    <label for="radio_1">Detail BG/CEK/TRANSFER</label>
                                                </div>
                                                <div class="col-md-2 ml-auto">
                                                    <label for="id">ID. Detail</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input id="id_detailkiri" type="text" name="id_detailkiri"
                                                        class="form-control" style="width: 100%">
                                                    <input id="bg_b" type="text" name="bg_b"
                                                        class="form-control" style="width: 100%; display: none">
                                                </div>
                                            </div>
                                        </div>
                                        <br>
                                        <div style="overflow-x: auto;">
                                            <table style="width: 150%; table-layout: fixed;" id="tablekiri">
                                                <colgroup>
                                                    <col style="width: 20%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                </colgroup>
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>ID. Detail</th>
                                                        <th>No. BG/CEK/TRANSFER</th>
                                                        <th>Jatuh Tempo</th>
                                                        <th>Cetak</th>
                                                        <th>ID. Bayar</th>
                                                        <th>Jumlah</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <!--CARD 2-->
                                <div class="card" style="width: 50%;">
                                    <div class="card-body">
                                        <div class="col">
                                            <div class="d-flex">
                                                <div>
                                                    <input type="radio" name="radiogrup" value="radio_2"
                                                        id="radio_2">
                                                    <label for="radio_2">Detail PEMBAYARAN</label>
                                                </div>
                                                <div class="col-md-2 ml-auto">
                                                    <label for="id">ID. Detail</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input id="id_detailkanan" type="text" name="id_detailkanan"
                                                        class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                        </div>
                                        <br>
                                        <div style="overflow-x: auto;">
                                            <table style="width: 200%;" id="tablekanan">
                                                {{-- <colgroup>
                                                    <col style="width: 20%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                </colgroup> --}}
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>ID. Detail</th>
                                                        <th>Rincian Bayar</th>
                                                        <th>Nilai Rincian</th>
                                                        <th>Kode Perkiraan</th>
                                                        <th>No BG</th>
                                                        <th>ID. Pembayaran</th>
                                                        <th>Keterangan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr style="height:2px;">
                            <div class="mb-3 d-flex justify-content-between">
                                <button class="btn btn-primary" id="btn_isi" style="width: 130px">Isi</button>
                                <button class="btn btn-warning" id="btn_koreksi"
                                    style="width: 130px">Koreksi</button>
                                <button class="btn btn-danger" id="btn_hapus" style="width: 130px">Hapus</button>
                                <button class="btn btn-success" id="btn_proses" style="width: 130px">Proses</button>
                                <button class="btn" id="btn_batal"
                                    style="width: 130px; margin-left: auto; visibility: hidden">Batal</button>
                            </div>

                        </form>
                        <br>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Ganti Bank-->
<div class="modal fade" id="gantiBankModal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="gantiBankLabel">Ganti Bank</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group mt-3">
                    <label for="id_bayarMB">ID Bayar:</label>
                    <input type="text" id="id_bayarMB" class="form-control" disabled>
                </div>
                <div class="form-group mt-3">
                    <label for="nama_supplierMB">Nama Supplier:</label>
                    <input type="text" id="nama_supplierMB" class="form-control" disabled>
                </div>
                <div class="form-group mt-3">
                    <label for="id_bankMB">ID. Bank:</label>
                    <select id="bankSelect" name="bankSelect" class="form-control" style="width: 100%">
                        <option disabled selected>Pilih Bank</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btn_prosesMB" type="button" class="btn btn-success">Proses</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
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
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-inline">
                    <label for="month">Bln/Thn:</label>
                    <input type="text" id="month" class="form-control" style="width: 80px">
                    <span>&nbsp;/&nbsp;</span>
                    <input type="text" id="year" class="form-control" style="width: 80px">
                    <span>&nbsp;&nbsp;</span>
                    <button id="btn_okbkk" type="button" class="btn btn-primary">OK</button>
                </div>
                <br>
                <div class="table-container">
                    <table class="table table-bordered" id="tabletampilBKK">
                        <thead class="table-dark">
                            <tr>
                                <th>BKK</th>
                                <th>Nilai BKK</th>
                                <th>Supplier</th>
                                <th>ID. Mata Uang</th>
                                <th>ID. Jenis Bayar</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="form-group mt-3">
                    <label for="bkk">BKK:</label>
                    <input type="text" id="bkk" class="form-control">
                    <input type="text" id="terbilang" class="form-control" style="display: none">
                    <input type="text" id="id_matauang" class="form-control" style="display: none">
                </div>
                <div class="form-group mt-3">
                    <label for="nilaiBkk">Nilai BKK:</label>
                    <input type="text" id="nilaiBkk" class="form-control" value="0">
                </div>
                <div class="form-group mt-3">
                    <label for="nilaiPembulatan">Nilai Pembulatan:</label>
                    <input type="text" id="nilaiPembulatan" class="form-control" value="0">
                </div>
            </div>
            <div class="modal-footer">
                <button id="btn_cetakbkk" type="button" class="btn btn-success">Cetak</button>
                <button id="btn_prosesbkk" type="button" class="btn btn-success"
                    style="display: none">Proses</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal BG -->
<div class="modal fade" id="formBGModal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="formModalLabel">Detail BG/Cek/Transfer</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="bank">Bank :</label>
                    <input type="text" id="bank" class="form-control">
                </div>
                <div class="form-group">
                    <label for="jnsByr">Jenis Bayar :</label>
                    <div class="d-flex">
                        <input type="text" id="jnsByr" class="form-control mr-2">
                        <input type="text" id="id_jnsByr" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label for="noJnsByr">No Jenis Bayar :</label>
                    <input type="text" id="noJnsByr" class="form-control">
                </div>
                <div class="form-group">
                    <label for="jumlahJnsByr">Jumlah Jenis Bayar :</label>
                    <input type="text" id="jumlahJnsByr" class="form-control">
                </div>
                <div class="form-group">
                    <label for="jatuhTempo">Jatuh Tempo :</label>
                    <div class="d-flex">
                        <input type="date" id="jatuhTempo" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label for="statusCetak">Status Cetak :</label>
                    <input type="text" id="statusCetak" class="form-control" placeholder="[ T, O, S ]">
                </div>
            </div>
            <div class="modal-footer">
                <button id="btn_prosesBG" type="button" class="btn btn-success">Proses</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Pembayaran -->
<div class="modal fade" id="formModalPembayaran" tabindex="-1" aria-labelledby="formModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="formModalLabel">Detail Pembayaran</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="uangMuka" name="dp">
                    <label class="form-check-label" for="uangMuka">Uang Muka (DP)</label>
                </div>
                <div class="form-group">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="paymentType" id="radio_biaya"
                            value="biaya">
                        <label class="form-check-label" for="biaya">Biaya</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="paymentType" id="radio_pembayaran"
                            value="pembayaran">
                        <label class="form-check-label" for="pembayaran">Pembayaran</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="bank">Bank :</label>
                    <input type="text" id="bank_pembayaran" class="form-control">
                </div>
                <div class="form-group">
                    <label for="jnsByr">Jenis Bayar :</label>
                    <input type="text" id="jnsByr_pembayaran" class="form-control">
                </div>
                <div class="form-group">
                    <label for="noBg">No BG:</label>
                    <div class="d-flex">
                        <input type="text" id="noBg" class="form-control">
                        <input type="text" id="IdDetailBGCek" class="form-control" style="display: none">
                        <button class="btn" type="button" id="btn_noBg">...</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="rincian">Rincian :</label>
                    <input type="text" id="rincian" class="form-control">
                </div>
                <div class="form-group">
                    <label for="nilaiBayar">Nilai Bayar :</label>
                    <input type="text" id="nilaiBayar" class="form-control">
                </div>
                <div class="form-group">
                    <label for="nilaiRincian">Nilai Rincian :</label>
                    <input type="text" id="nilaiRincian" class="form-control">
                </div>
                <div class="form-group">
                    <label for="kdPerkiraan">Kode Perkiraan :</label>
                    <div class="d-flex">
                        <div class="input-group" style="width: 100%;"> <!-- Ensure full width here -->
                            <select name="select_kodePerkiraan" id="select_kodePerkiraan" class="form-control"
                                style="width: 100%;"> <!-- Full width for select -->
                                <option disabled selected>Pilih Kode Perkiraan</option>
                                @foreach ($kodePerkiraan as $d)
                                    <option value="{{ $d->NoKodePerkiraan }}">{{ $d->Keterangan }} |
                                        {{ $d->NoKodePerkiraan }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                {{-- <div class="form-group">
                    <label for="kdPerkiraan">Kode Perkiraan :</label>
                    <div class="d-flex">
                        <div class="input-group">
                            <select name="select_kodePerkiraan" id="select_kodePerkiraan" class="form-control">
                                <option disabled selected>Pilih Kode Perkiraan</option>
                                @foreach ($kodePerkiraan as $d)
                                    <option value="{{ $d->NoKodePerkiraan }}">{{ $d->Keterangan }} |
                                        {{ $d->NoKodePerkiraan }}</option>
                                @endforeach
                            </select>
                        </div>
                        <input type="text" id="kdPerkiraan1" class="form-control mr-2" style="width: 35%">
                        <input type="text" id="kdPerkiraan2" class="form-control">
                        <button class="btn" type="button" id="btn_kodePerkiraan">...</button>
                    </div>
                </div> --}}
            </div>
            <div class="modal-footer">
                <button id="btn_prosesPembayaran" type="button" class="btn btn-success">Proses</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
@include('Kencana.Accounting.Hutang.PrintTampilBKK')
<script src="{{ asset('js/Kencana/BKKKRR2.js') }}"></script>
@endsection
