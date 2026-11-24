@extends('layouts.appKencana')
@section('content')
@section('title', 'Create BKM')

<style>
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

<style>
    .custom-modal-width {
        max-width: 65%;
        /* Adjust the percentage as needed */
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Create BKM Cash Advance</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <meta name="csrf-token" content="{{ csrf_token() }}">
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <input type="hidden" name="_method" id="methodkoreksi">
                        <!-- Form fields go here -->
                        <div class="d-flex">
                            <div class="col-md-2">
                                <label for="bulanTahun" style="margin-right: 10px;">Bulan/Tahun</label>
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="bulan" class="form-control" style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="text" id="tahun" class="form-control" style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn-primary" id="btn_ok">OK</button>
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn" id="btn_tanggalbkm">Input Tanggal BKM</button>
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn" id="btn_group">Group BKM</button>
                            </div>
                            <input type="hidden" id="idBKMNew" name="idBKMNew" class="form-control"
                                style="width: 100%">
                            <input type="hidden" id="tglInputNew" name="tglInputNew" class="form-control"
                                style="width: 100%">
                        </div>

                        <br>
                        <div>
                            <strong>Data Pelunasan</strong>
                            <div style="overflow-y: auto;">
                                <table style="width: 160%; table-layout: fixed;" id="table_pelunasan">
                                    <colgroup>
                                        <col style="width: 15%;">
                                        <col style="width: 15%;">
                                        <col style="width: 15%;">
                                        <col style="width: 20%;">
                                        <col style="width: 15%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                    </colgroup>
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Tgl Pelunasan</th>
                                            <th>Id. Pelunasan</th>
                                            <th>Id. Bank</th>
                                            <th>Jenis Pembayaran</th>
                                            <th>Mata Uang</th>
                                            <th>Total Pelunasan</th>
                                            <th>No. Bukti</th>
                                            <th>Tgl. Input</th>
                                            <th>Kode Perkiraan</th>
                                            <th>Uraian</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-6">
                                    <button type="button" class="btn btn d-flex ml-auto" id="btn_tampilbkm">Tampil
                                        BKM</button>
                                </div>
                                <div class="col-6">
                                    <button type="button" class="btn btn d-flex ml-auto" id="btn_batal">Batal</button>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" id="uang" name="uang" class="form-control" style="width: 100%">
                        <input type="hidden" id="konversi" name="konversi" class="form-control" style="width: 100%">
                        <input type="hidden" id="total1" name="total1" class="form-control" style="width: 100%">
                        <input type="hidden" id="jenisBank" name="jenisBank" class="form-control" style="width: 100%">
                        <input type="hidden" id="tanggal" name="tanggal" class="form-control" style="width: 100%">
                        <input type="hidden" id="idbkm" name="idbkm" class="form-control" style="width: 100%">

                        <!--MODAL INPUT TANGGAL BKM-->
                        <div class="modal fade" id="modalInputTanggal" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="pilihBankModal">Maintenance Pilih Bank BKM
                                        </h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <input type="hidden" name="_method" id="methodInputTanggal">
                                    <div class="modal-body">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idPelunasan" style="margin-right: 10px;">Id.
                                                    Pelunasan</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="idPelunasan_TB" name="idPelunasan_TB"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="tanggalInput" style="margin-right: 10px;">Tanggal
                                                    Input</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalInputTB" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="jenisBayar" style="margin-right: 10px;">Jenis
                                                    Bayar</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="jenisBayarTB" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="bankSelect" style="margin-right: 10px;">Bank</label>
                                            </div>
                                            <div class="col-md-9" style="width: 100%;">
                                                <!-- Ensure full width here -->
                                                <select name="select_bankM" id="select_bankM" class="form-control"
                                                    style="width: 100%;">
                                                    <!-- Full width for select -->
                                                    <option disabled selected>Pilih Bank</option>
                                                    @foreach ($banks as $d)
                                                        <option value="{{ $d->Id_Bank }}">{{ $d->Id_Bank }}
                                                            | {{ $d->Nama_Bank }}</option>
                                                    @endforeach
                                                </select>
                                                <input type="text" id="jenis_bankTB" name="jenis_bankTB"
                                                    class="form-control" style="width: 100%; display: none">
                                            </div>
                                            {{-- <div class="col-md-2">
                                                <input type="text" id="idBank_TB" name="idBank_TB"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" id="nama_bankTB" name="nama_bankTB"
                                                    class="form-control" style="width: 100%">
                                                <input type="text" id="jenis_bankTB" name="jenis_bankTB"
                                                    class="form-control" style="width: 100%; display: none">
                                            </div>
                                            <div class="col-md-1">
                                                <button type="button" class="btn btn-default"
                                                    id="btn_bankTB">...</button>
                                            </div> --}}
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="mataUang" style="margin-right: 10px;">Mata
                                                    Uang</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="mataUangTB" name="mataUangTB"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="nilaiPelunasan" style="margin-right: 10px;">Nilai
                                                    Pelunasan</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="nilaiPelunasanTB" name="nilaiPelunasanTB"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="noBukti" style="margin-right: 10px;">No.
                                                    Bukti</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="noBuktiTB" namee="noBuktiTB"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-9" style="width: 100%;"> <!-- Ensure full width here -->
                                                <select name="select_kodePerkiraanM" id="select_kodePerkiraanM" class="form-control" style="width: 100%;"> <!-- Full width for select -->
                                                    <option disabled selected>Pilih Kode Perkiraan</option>
                                                    @foreach ($kodePerkiraan as $d)
                                                        <option value="{{ $d->NoKodePerkiraan }}">{{ $d->Keterangan }} | {{ $d->NoKodePerkiraan }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            {{-- <div class="col-md-2">
                                                <input type="text" id="id_perkiraanTB" name="id_perkiraanTB"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" id="ket_perkiraanTB" name="ket_perkiraanTB"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-1">
                                                <button type="button" class="btn btn-default"
                                                    id="btn_perkiraanTB">...</button>
                                            </div> --}}
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-10">
                                                <button type="button" class="btn btn-success" id="btn_prosesTB"
                                                    style="width: 100px;">Proses</button>
                                            </div>
                                            <div class="col-1 text-end">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal" id="tutup_TB">Tutup</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--MODAL TAMPIL BKM-->
                        <div class="modal fade" id="dataBKKModal" tabindex="-1" aria-labelledby="dataBKKModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog custom-modal-width">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="dataBKKModalLabel">Data BKM</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal"
                                            aria-label="Close" id="close_modalbkm">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-inline">
                                            <label for="month">Bln/Thn:&nbsp;</label>
                                            <input type="date" id="tgl_awalbkm" class="form-control"
                                                style="width: 160px">
                                            <span>&nbsp;S/D&nbsp;</span>
                                            <input type="date" id="tgl_akhirbkm" class="form-control"
                                                style="width: 160px">
                                            <span>&nbsp;&nbsp;</span>
                                            <button id="btn_okbkm" type="button" class="btn btn-primary">OK</button>
                                        </div>
                                        <div class="form-group mt-3">
                                            <label for="bkm">Id. BKM:</label>
                                            <input type="text" id="bkm" class="form-control">
                                            <input type="text" id="terbilang" class="form-control"
                                                style="display: none">
                                            <input type="text" id="id_matauang" class="form-control"
                                                style="display: none">
                                        </div>
                                        <div class="table-responsive">
                                            <table id="tabletampilBKM">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Tanggal Input</th>
                                                        <th>Id. BKM</th>
                                                        <th>Nilai Pelunasan</th>
                                                        <th>Terbilang</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button id="btn_cetakbkm" type="button"
                                            class="btn btn-success">Cetak</button>
                                        <button id="btn_prosesbkm" type="button" class="btn btn-success"
                                            style="display: none">Proses</button>
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                            id="tutup_modalbkk">Tutup</button>
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

<div class="print" style="visibility: hidden;">
    <div class="container">
        <div class="row">
            <div class="col-5" style="padding-right: 25px;">
                <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                    <h4 style="font-weight: bold">P.T. KENCANA RAJASA RAYA</h4>
                </div>
            </div>
            <div class="col-7">
                <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                    <h4 style="font-weight: bold">BUKTI PENERIMAAN KAS</h4>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-5" style="padding-right: 25px;">
                <div class="row" style="border: solid 1px; text-align-last: center;">
                    <div class="col-12" style="height: 4vh; ">
                        <span style="font-weight: bold; font-size: 18px;">Jl. Raya Tropodo No. 1</span><br>
                        <span style="font-weight: bold; font-size: 18px;">WARU - SIDOARJO</span>
                    </div>
                    {{-- <div class="col-12">
                        <span style="font-weight: bold; font-size: 18px;">WARU - SIDOARJO</span>
                    </div> --}}
                </div>
            </div>
            <div class="col-7">
                <div class="row" style="border: solid 1px; text-align-last: center;">
                    <div id="id_BKM" class="col-12" style="height: 4vh;">
                        <span style="display: inline; font-size: 18px; font-weight: bold">NOMER: </span> <span
                            id="nomer_P"
                            style="display: inline; margin-top: -5px; font-size: 18px; font-weight: bold;"></span>
                            <br>
                            <span style="display: inline; font-size: 18px; font-weight: bold">TANGGAL: </span><span
                            id="tglCetak_P"
                            style="display: inline; margin-top: -5px; font-size: 18px; font-weight: bold;"></span>
                    </div>
                    {{-- <div id="tanggal" class="col-12">
                        <span style="display: inline; font-size: 18px; font-weight: bold">TANGGAL: </span><span
                            id="tglCetak_P"
                            style="display: inline; margin-top: -5px; font-size: 18px; font-weight: bold;"></span>
                    </div> --}}
                </div>
            </div>
        </div>

        <br>
        <div class="row">
            <div class="col-12" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 1.5vh;">
                        <span style="display: inline; font-size: 18px; padding-left: 50px">Jumlah Diterima:
                        </span><span id="symbol"
                            style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 15px"></span><span
                            id="jumlahDiterima" name="jumlahDiterima"
                            style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 15px"></span>
                    </div>
                    <div class="col-12">
                        <span style="display: inline; font-size: 18px; padding-left: 50px">Terbilang: </span>
                    </div>
                    <div class="col-12">
                        <span id="terbilangCetak"
                            style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 50px"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-7" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 1.5vh; text-align-last: center;">
                        <span style="font-size: 18px; ">RINCIAN PENERIMAAN</span>
                    </div>
                </div>
            </div>
            <div class="col-3" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 1.5vh; text-align-last: center;">
                        <span style="font-size: 18px;">KODE PERKIRAAN</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 1.5vh; text-align-last: center;">
                        <span style="font-size: 18px;">JUMLAH</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-7" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 1.5vh; text-align-last: center;">
                        <span id="rincianPenerimaan" style="font-size: 18px;"></span>
                    </div>
                </div>
            </div>
            <div class="col-3" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 1.5vh; text-align-last: center;">
                        <span id="kodePerkiraanCetak" style="font-size: 18px;"></span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 1.5vh; text-align-last: right;">
                        <span id="jumlah" style="font-size: 18px;"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-10" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 1.5vh; text-align-last: right;">
                        <span style="font-size: 18px; font-weight: bold; padding-left: 45px">GRAND TOTAL: </span><span
                            id="symbol2"
                            style="display: inline; margin-top: -5px; font-size: 18px; padding-right: 20px"></span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; margin-right: -2vh;">
                    <div class="col-12" style="height: 1.5vh; text-align-last: right;">
                        <span id="grandTotal" style="font-size: 18px;"></span>
                    </div>
                </div>
            </div>
        </div>

        <br><br>
        <div class="row">
            <div class="col-3" style="margin-right: 25px;">
                <div class="row"
                    style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 7vh; ">
                        <span id="disetujui" style="font-size: 18px;">Disetujui,</span>
                    </div>
                </div>
            </div>
            <div class="col-3" style="margin-left: 50px">
                <div class="row"
                    style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 7vh; ">
                        <span id="kasir" style="font-size: 18px;">Kasir,</span>
                    </div>
                </div>
            </div>
            <div class="col-4" style="margin-right: 25px;">
                <div class="row" style="text-align-last: right;">
                    <div class="col-12" style="height: 10vh; ">
                        <span style="font-size: 18px;">Sidoarjo, </span><span id="tglCetakForm"
                            style="font-size: 18px;"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<script src="{{ asset('js/Kencana/CreateBKM.js') }}"></script>
@endsection
