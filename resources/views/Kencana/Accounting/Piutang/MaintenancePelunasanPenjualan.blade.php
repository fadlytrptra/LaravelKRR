@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance Pelunasan Penjualan')

<style>
    .table-responsive.fixed-height tbody {
        background-color: white;
    }

    .underline {
        border-bottom: 1px solid black;
        /* Change the color as needed */
        margin-bottom: 10px;
        /* Space between labels and line */
    }

    .table-responsive.fixed-height {
        /* overflow-y: auto; */
        /* position: relative; */
        border-radius: 8px;
        border: 2px solid black;
        /* width: 100%; */
        /* table-layout: fixed; */
        background-color: white;
    }

    .no-wrap-header thead th {
        white-space: nowrap;
        background-color: lightgoldenrodyellow;
        padding: 0;
    }

    .table-responsive.fixed-height tbody td {
        background-color: white;
        padding: 4px 5px;
    }

    .fixed-width {
        white-space: nowrap;
        /* Prevent text wrapping */
        overflow: hidden;
        /* Hide overflow text */
        text-overflow: ellipsis;
        /* Show "..." when the text overflows */
        padding: 0;
    }

    table.dataTable {
        table-layout: fixed;
        /* Ensure table uses fixed layout */
        width: 100%;
        /* Ensure the table takes up the full width */
    }

    #table_list th,
    #table_list td {
        padding-top: 0;
        padding-bottom: 0;
        font-size: 16px;
    }

    @media print {
        .card {
            display: none;
        }

        .print {
            visibility: visible !important;
        }

        .modal {
            display: none !important;
        }

        .fade {
            opacity: 0 !important;
        }
    }
</style>


<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance Pelunasan Penjualan</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        {{-- <form method="POST" action="{{ url('MaintenancePelunasanPenjualan') }}" id="formkoreksi">
                            {{ csrf_field() }} --}}
                        <input type="hidden" name="_method" id="methodkoreksi">
                        <!-- Form fields go here -->
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="tanggalInput" style="margin-right: 10px;">Tanggal Input</label>
                            </div>
                            <div class="col-md-3">
                                <input type="date" id="tanggalInput" name="tanggalInput" class="form-control"
                                    style="width: 100%" readonly>
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="namaCustomerSelect" style="margin-right: 10px;">Nama Customer</label>
                            </div>

                            <div class="col-md-6">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="namaCustomerSelect"
                                        name="namaCustomerSelect" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_cust" class="btn btn-default"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-1" style="display: none;">
                                <input type="text" id="idCustomer" name="idCustomer" class="form-control"
                                    style="width: 100%" readonly>
                            </div>
                            <div class="col-md-1" style="display: none;">
                                <input type="text" id="idJenisCustomer" name="idJenisCustomer" class="form-control"
                                    style="width: 100%" readonly>
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="noPelunasanSelect" style="margin-right: 10px;">No. Pelunasan</label>
                            </div>
                            <div class="col-md-5">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="noPelunasanSelect"
                                        name="noPelunasanSelect" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_pelunasan" class="btn btn-default"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                            {{-- <div class="col-md-2">
                                <input type="text" id="IdPelunasan" name="IdPelunasan" class="form-control"
                                    style="width: 100%" readonly>
                            </div> --}}
                            {{-- <div class="col-md-2">
                                        <input type="text" id="Id_Pelunasan" name="Id_Pelunasan" class="form-control" style="width: 100%" readonly>
                                    </div> --}}
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="jenisPembayaranSelect" style="margin-right: 10px;">Jenis
                                    Pembayaran</label>
                            </div>
                            <div class="col-md-5">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="jenisPembayaranSelect"
                                        name="jenisPembayaranSelect" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_jenisPmb" class="btn btn-default"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="idJenisPembayaran" name="idJenisPembayaran"
                                    class="form-control" style="width: 100%" readonly>
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="statusBayar" name="statusBayar" class="form-control"
                                    style="width: 100%" readonly>
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="informasiBankSelect" style="margin-right: 10px;">Informasi Bank</label>
                            </div>
                            <div class="col-md-5">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="informasiBankSelect"
                                        name="informasiBankSelect" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_bank" class="btn btn-default"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="idReferensi" name="idReferensi" class="form-control"
                                    style="width: 100%" readonly>
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="mataUangSelect" style="margin-right: 10px;">Mata Uang</label>
                            </div>
                            <div class="col-md-5">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="mataUangSelect"
                                        name="mataUangSelect" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_mtUang" class="btn btn-default"
                                            disabled>...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="idMataUang" name="idMataUang" class="form-control"
                                    style="width: 100%" readonly>
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="nilaiMasukKas" style="margin-right: 10px;">Nilai Masuk Kas</label>
                            </div>
                            <div class="col-md-5">
                                <input type="text" id="nilaiMasukKas" name="nilaiMasukKas" class="form-control"
                                    style="width: 100%" readonly>
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="buktiPelunasan" style="margin-right: 10px;">Bukti Pelunasan</label>
                            </div>
                            <div class="col-md-5">
                                <input type="text" id="buktiPelunasan" name="buktiPelunasan" class="form-control"
                                    style="width: 100%" readonly>
                            </div>
                        </div>

                        <br>
                        <div>
                            <div class="row">
                                <div class="col-md-2">
                                    <button id="btnAddItem" type="button" class="btn btn-primary">Add Item</button>
                                </div>
                                <div class="col-md-2">
                                    <button id="btnEditItem" type="button" class="btn btn-primary">Edit
                                        Item</button>
                                </div>
                                <div class="col-md-2">
                                    <button id="btnDeleteItem" type="button" class="btn btn-primary">Delete
                                        Item</button>
                                </div>
                            </div>
                        </div>

                        <br>
                        <div>
                            <div style="overflow-y: auto; overflow-x: auto; max-height: 400px;">
                                <div class="row mb-2" style="margin-top: 0.5%">
                                    <div class="col-sm-12">
                                        <div class="table-responsive fixed-height">
                                            <table class="table table-bordered no-wrap-header"
                                                id="tabelPelunasanPenjualan">
                                                <thead>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="tabelIdDetailPelunasan" name="tabelIdDetailPelunasan"
                                    class="form-control" style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="tabelIdPenagihan" name="tabelIdPenagihan"
                                    class="form-control" style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="tabelNilaiPelunasan" name="tabelNilaiPelunasan"
                                    class="form-control" style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="tabelPelunasanRupiah" name="tabelPelunasanRupiah"
                                    class="form-control" style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="tabelBiaya" name="tabelBiaya" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="tabelLunas" name="tabelLunas" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="tabelPelunasanCurrency" name="tabelPelunasanCurrency"
                                    class="form-control" style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="tabelKurangLebih" name="tabelKurangLebih"
                                    class="form-control" style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="tabelKodePerkiraan" name="tabelKodePerkiraan"
                                    class="form-control" style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="tabelIdDetail" name="tabelIdDetail" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="hidden" id="hAtauB" name="hAtauB" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <br>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="totalPelunasan" style="margin-right: 10px;">Total Pelunasan</label>
                            </div>
                            <div class="col-md-3">
                                <input type="text" id="totalPelunasan" name="totalPelunasan" class="form-control"
                                    style="width: 100%" readonly>
                            </div>
                            <div class="col-md-2">
                                <label for="nilaiPiutang" style="margin-right: 10px;"></label>
                            </div>
                            <div class="col-md-2">
                                <input type="text" id="nilaiPiutang" name="nilaiPiutang" class="form-control"
                                    style="width: 100%" readonly>
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-3">
                                <label for="totalBiaya" style="margin-right: 10px;">Total Biaya</label>
                            </div>
                            <div class="col-md-3">
                                <input type="text" id="totalBiaya" name="totalBiaya" class="form-control"
                                    style="width: 100%" readonly>
                            </div>
                            <div class="col-md-2">
                                <label for="kurangLebih" style="margin-right: 10px;">Kurang/Lebih</label>
                            </div>
                            <div class="col-md-3">
                                <input type="text" id="kurangLebih" name="kurangLebih" class="form-control"
                                    style="width: 100%" readonly>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <input type="hidden" id="arrayDetail" name="arrayDetail" class="form-control"
                                style="width: 100%" readonly>
                        </div>
                        <div class="col-md-3">
                            <input type="hidden" id="arrayPenagihan" name="arrayIdPen" class="form-control"
                                style="width: 100%" readonly>
                        </div>

                        <br>
                        <div>
                            <div class="row">
                                <div class="col-md-2">
                                    <button id="btnIsi" type="button" class="btn btn-primary">Isi</button>
                                    <button id="btnSimpan" type="button" class="btn btn-success"
                                        style="display: none">Simpan</button>
                                </div>
                                <div class="col-md-2">
                                    <button id="btnKoreksi" type="button" class="btn btn-warning">Koreksi</button>
                                    <button id="btnBatal" type="button" class="btn btn-warning"
                                        style="display: none">Batal</button>

                                </div>
                                <div class="col-md-2">
                                    <button id="btnHapus" type="button" class="btn btn-danger">Hapus</button>
                                </div>
                            </div>
                        </div>
                        {{-- </form> --}}

                        <!--MODAL FrmLihatPenagihan-->
                        <div class="modal fade" id="modalLihatPenagihan" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content" style="padding: 25px;">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Pengisian Pelunasan Tagihan</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <input type="hidden" name="_method" id="methodLihatPenagihan">
                                    <div class="row" style="padding-left: 20px">
                                        <div class="col-md-4">
                                            <input type="radio" name="radiogrup1" value="opt1" id="opt1">
                                            <label for="opt1">Pelunasan</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="radio" name="radiogrup1" value="opt2" id="opt2">
                                            <label for="opt2">Biaya Ditanggung</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="radio" name="radiogrup1" value="opt3" id="opt3">
                                            <label for="opt3">Kurang/Lebih</label>
                                        </div>
                                    </div>

                                    <div class="card mb-2">
                                        <b>Rincian Pelunasan</b>
                                        <div class="d-flex">
                                            <div class="col-md-4">
                                                <label for="noPenagihan" style="margin-right: 10px;">No.
                                                    Penagihan</label>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="input-group" style="width: 100%;">
                                                    <!-- Ensure full width here -->
                                                    <select name="noPenagihan" id="noPenagihan" class="form-control"
                                                        style="width: 100%;">
                                                        <!-- Full width for select -->
                                                        <option disabled selected>Pilih Penagihan</option>
                                                        {{-- @foreach ($kdperkiraan as $d)
                                                            <option value="{{ $d->NoKodePerkiraan }}">{{ $d->NoKodePerkiraan }}
                                                                | {{ $d->Keterangan }}</option>
                                                        @endforeach --}}
                                                    </select>
                                                </div>

                                                {{-- <div class="input-group">
                                                    <input type="text" class="form-control" id="noPenagihan"
                                                        name="noPenagihan" readonly>
                                                    <div class="input-group-append">
                                                        <button type="button" id="btn_noPenagihan"
                                                            class="btn btn-default" disabled>...</button>
                                                    </div>
                                                </div> --}}
                                            </div>
                                            <div class="col-md-4" style="display: none;">
                                                <input type="text" id="noPen" name="noPen"
                                                    class="form-control"style="width: 100%" readonly>
                                            </div>
                                            {{-- <div class="col-md-2">
                                                <input type="text" id="no_Pen" name="no_Pen"
                                                    class="form-control"style="width: 100%" readonly>
                                            </div> --}}
                                        </div>
                                        <p>
                                        <div class="d-flex">
                                            <div class="col-md-4">
                                                <label for="idBKM" style="margin-right: 10px;">Nilai
                                                    Penagihan</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="nilaiPenagihan" name="nilaiPenagihan"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-2 p-0">
                                                <input type="text" id="mataUangPenagihan" name="mataUangPenagihan"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <p>
                                        <div class="d-flex">
                                            <div class="col-md-4">
                                                <label for="nilaiKurs" style="margin-right: 10px;">Nilai Kurs</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="nilaiKurs" name="nilaiKurs"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <p>
                                        <div class="d-flex">
                                            <div class="col-md-4">
                                                <label for="terbayar"
                                                    style="margin-right: 10px; color:blue">Pembayaran Currency</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="terbayar" name="terbayar"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-2"></div>
                                            <div class="col-md-3">
                                                <input type="text" id="sisa" name="sisa"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <p>
                                        <div class="d-flex">
                                            <div class="col-md-4">
                                                <label for="terbayarRupiah"
                                                    style="margin-right: 10px; color:blue">Pembayaran (Rupiah)</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="terbayarRupiah" name="terbayarRupiah"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-2"></div>
                                            <div class="col-md-3 mb-1">
                                                <input type="text" id="sisaRupiah" name="sisaRupiah"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <div
                                            style="border: 1px solid gray; border-top: 0px; border-left: 0px; border-right: 0px; margin: 1% 3%">
                                        </div>

                                        <div class="d-flex">
                                            <div class="col-md-4">
                                                <label for="jumlahYangDibayar" style="margin-right: 10px;">Jumlah Yang
                                                    Dibayar</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="jumlahYangDibayar" name="jumlahYangDibayar"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-4" style="color: blue">
                                                Wajib Dienter
                                            </div>
                                        </div>
                                        <p>
                                        <div class="d-flex">
                                            <div class="col-md-4">
                                                <label for="pelunasanCurrency"
                                                    style="margin-right: 10px; color:blue">Nilai Pelunasan
                                                    (Currency)</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="pelunasanCurrency" name="pelunasanCurrency"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <p>
                                        <div class="d-flex">
                                            <div class="col-md-4">
                                                <label for="pelunasanRupiah"
                                                    style="margin-right: 10px; color:blue">Nilai Pelunasan
                                                    (Rupiah)</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="pelunasanRupiah" name="pelunasanRupiah"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <p>
                                        <div class="d-flex mb-1">
                                            <div class="col-md-4">
                                                <label for="lunas" style="margin-right: 10px;">Lunas (Y/N)</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="lunas" name="lunas"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card mb-2">
                                        <b>Biaya Ditanggung</b>
                                        <div class="d-flex mb-1">
                                            <div class="col-md-4">
                                                <label for="nilaiBiaya" style="margin-right: 10px;">Nilai
                                                    Biaya</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="nilaiBiaya" name="nilaiBiaya"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card mb-2">
                                        <div class="d-flex mt-1">
                                            <div class="col-md-4">
                                                <label for="nilaiKurangLebih" style="margin-right: 10px;">Nilai
                                                    Kurang/Lebih</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="nilaiKurangLebih" name="nilaiKurangLebih"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <p>
                                        <div class="d-flex mb-1">
                                            <div class="col-md-4">
                                                <label for="noPenagihan1" style="margin-right: 10px;">No.
                                                    Penagihan</label>
                                            </div>
                                            <div class="col-md-5">
                                                <div class="input-group" style="width: 100%;">
                                                    <!-- Ensure full width here -->
                                                    <select name="noPenagihan1" id="noPenagihan1"
                                                        class="form-control" style="width: 100%;">
                                                        <!-- Full width for select -->
                                                        <option disabled selected>Pilih Penagihan</option>
                                                        {{-- @foreach ($penagihan1 as $d)
                                                            <option value="{{ $d->Id_Penagihan }}">
                                                                {{ $d->Id_Penagihan }}
                                                                | {{ $d->Tgl_Penagihan }}</option>
                                                        @endforeach --}}
                                                    </select>
                                                </div>

                                                {{-- <div class="input-group">
                                                    <input type="text" class="form-control" id="noPenagihan1"
                                                        name="noPenagihan1" readonly>
                                                    <div class="input-group-append">
                                                        <button type="button" id="btn_noPenagihan1"
                                                            class="btn btn-default">...</button>
                                                    </div>
                                                </div> --}}
                                            </div>
                                            <div class="col-md-2" style="display: none;">
                                                <input type="text" id="noPen1" name="noPen1"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            {{-- <div class="col-md-2">
                                                        <input type="text" id="no_Pen1" name="no_Pen1" class="form-control" style="width: 100%" readonly>
                                                    </div> --}}
                                        </div>
                                    </div>

                                    <div class="d-flex mt-1">
                                        <div class="col-md-4">
                                            <label for="kodePerkiraanSelect" style="margin-right: 10px;">Kode
                                                Perkiraan</label>
                                        </div>
                                        <div class="col-md-2 pr-1" style="display: none;">
                                            <input type="text" id="idKodePerkiraan" name="idKodePerkiraan"
                                                class="form-control" readonly>
                                            <input type="text" id="kodePerkiraan" name="kodePerkiraan"
                                                class="form-control" readonly>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="input-group">
                                                <!-- Ensure full width here -->
                                                <select name="kodePerkiraanSelect" id="kodePerkiraanSelect"
                                                    class="form-control" style="width: 100%;">
                                                    <!-- Full width for select -->
                                                    <option disabled selected>Pilih Kode Perkiraan</option>
                                                    @foreach ($kdperkiraan as $d)
                                                        <option value="{{ $d->NoKodePerkiraan }}">
                                                            {{ $d->NoKodePerkiraan }}
                                                            | {{ $d->Keterangan }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {{-- <div class="d-flex mt-1">
                                    <div class="col-md-4">
                                        <label for="kodePerkiraanSelect" style="margin-right: 10px;">Kode
                                            Perkiraan</label>
                                    </div>
                                    <div class="col-md-2 pr-1">
                                        <input type="text" id="idKodePerkiraan" name="idKodePerkiraan"
                                            class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="kodePerkiraanSelect"
                                                name="kodePerkiraanSelect" readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_kodePerkiraan"
                                                    class="btn btn-default">...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> --}}

                                    <br>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <button id="btnSimpanModal" type="button"
                                                class="btn btn-success">Simpan</button>
                                            {{-- <input type="submit" id="btnSimpanModal" name="btnSimpanModal"
                                                value="Simpan" class="btn btn-success"> --}}
                                        </div>
                                        {{-- <div class="col-md-2">
                                                    <input type="submit" id="btnKeluar" name="btnKeluar" value="Keluar" class="btn btn-primary">
                                                </div> --}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</div>
<script src="{{ asset('js/Kencana/MaintenancePelunasanPenjualan.js') }}"></script>
@endsection
