@extends('layouts.appKencana')
@section('content')
@section('title', 'ACC Penagihan Penjualan')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">ACC Penagihan Penjualan</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="{{ url('ACCPenagihanPenjualan') }}" id="formkoreksi">
                            {{ csrf_field() }}
                            <input type="hidden" name="_method" id="methodkoreksi">
                            <!-- Form fields go here -->
                            <div style="overflow-y: auto; overflow-x: auto;">
                                <table style="width: 100%;" id="table_atas">
                                    {{-- <colgroup>
                                            <col style="width: 15%;">
                                            <col style="width: 15%;">
                                            <col style="width: 30%;">
                                            <col style="width: 15%;">
                                            <col style="width: 20%;">
                                            <col style="width: 10%;">
                                            <col style="width: 20%;">
                                            <col style="width: 15%;">
                                            <col style="width: 15%;">
                                            <col style="width: 30%;">
                                            <col style="width: 15%;">
                                            <col style="width: 20%;">
                                            <col style="width: 10%;">
                                        </colgroup> --}}
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Tanggal</th>
                                            <th>Id. Penagihan</th>
                                            <th>Customer</th>
                                            <th>PO</th>
                                            <th>Nilai Tagihan</th>
                                            <th>Mata Uang</th>
                                            <th>Id. Customer</th>
                                            <th>Id. Mata Uang</th>
                                            <th>Kurs</th>
                                            <th>Nama NPWP</th>
                                            <th>Jenis Customer</th>
                                            <th>Id. Faktur Pajak</th>
                                            <th>Jenis PPN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>

                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="idPenagihan">Id. Penagihan</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="idPenagihan" name="idPenagihan" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-7">
                                        <button type="button" class="btn btn-success d-flex ml-auto" id="btn_proses"
                                            style="100px; text-align: center">Proses</button>
                                    </div>
                                    {{-- <div class="col-1" style="visibility: hidden">
                                            <input type="submit" id="btnKeluar" name="btnKeluar" value="Keluar" class="btn btn-primary d-flex ml-auto">
                                        </div> --}}
                                </div>
                            </div>
                            <p>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="fakturPajak">Faktur Pajak</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="fakturPajak" name="fakturPajak" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-8 d-flex justify-content-end">
                                        Sebelum Di Acc, Mohon diteliti Kembali
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <input type="hidden" id="idMataUang" name="idMataUang" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-2">
                                    <input type="hidden" id="id_Penagihan" name="id_Penagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-2">
                                    <input type="hidden" id="jenisCustomer" name="jenisCustomer" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-2">
                                    <input type="hidden" id="namaNPWP" name="namaNPWP" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-2">
                                    <input type="hidden" id="nilaiTagihan" name="nilaiTagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-2">
                                    <input type="hidden" id="idCustomer" name="idCustomer" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-2">
                                    <input type="hidden" id="kurs" name="kurs" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>

                            <br>
                            <div style="overflow-y: auto;">
                                <table style="width: 100%;" id="table_bawah">
                                    {{-- <colgroup>
                                            <col style="width: 30%;">
                                            <col style="width: 30%;">
                                        </colgroup> --}}
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Surat Jalan</th>
                                            <th>Tanggal Terima Barang</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </form>

                        {{-- Faktur Tunai UM --}}
                        <div class="fakturTunai">

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-right">
                                    <span id="fakturTunai_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX
                                    </span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 25%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="fakturTunai_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span
                                        id="fakturTunai_AlamatNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span id="fakturTunai_NPWP">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%; text-decoration: underline">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="fakturTunai_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturTunai_Detail"></div>

                            <div class="row mt-4">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturTunai_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunai_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturTunai_SymbolDiscount">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunai_Discount">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturTunai_SymbolUM">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunai_UM">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturTunai_SymbolDPP">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunai_DPP">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturTunai_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunai_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 offset-sm-1 text-left">
                                    <span id="fakturTunai_Terbilang">xxxx</span>
                                </div>
                                <div class="col-sm-1 text-right">
                                    <span id="fakturTunai_SymbolTerbayar">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunai_Terbayar">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-4 text-left">
                                    <span id="fakturTunai_SyaratBayar">Syarat Pembayaran: &emsp;&emsp;xxxx Hari</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturTunai_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="fakturTunai_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-left">
                                    <span id="fakturTunai_Tempo">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-left">
                                    <span id="fakturTunai_SuratJalan">Surat Jalan: &emsp;&emsp;
                                        -</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-10 text-right">
                                    <label>YUDI SANTOSO</label>
                                </div>
                            </div>

                        </div>

                        <div class="nota1">

                            <div class="row" style="margin-top: 10%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="nota1_IdPenagihan">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXidpenagihanXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 offset-sm-3 text-left">
                                    <span
                                        id="nota1_NamaCust">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span id="nota1_Alamat">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%; text-decoration: underline">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="nota1_NamaTypeBarang">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="nota1_Detail"></div>

                            <div class="row mt-5">
                                <div class="col-sm-8 offset-sm-1 text-left">
                                    <span id="nota1_Terbilang">xxxx</span>
                                </div>
                                <div class="col-sm-1 text-right">
                                    <span id="nota1_SymbolTerbayar">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="nota1_Terbayar">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-4 text-left">
                                    <span>Syarat Pembayaran: &emsp;&emsp; CASH</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="nota1_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="nota1_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-left">
                                    <span>Jatuh Tempo: &emsp;&emsp; -</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-left">
                                    <span>Surat Jalan: &emsp;&emsp;
                                        0</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-10 text-right">
                                    <label>YUDI SANTOSO</label>
                                </div>
                            </div>

                        </div>

                        {{-- faktur pajak tunai rph --}}
                        <div class="fakturPajakTunai">

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-center">
                                    <span id="fakturPajakTunai_AreaPPNThnIdFakturPajak">XX . 000 - 07. XXXXXXXXX
                                    </span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 25%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajakTunai_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajakTunai_AlamatNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span id="fakturPajakTunai_NPWP">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="fakturPajakTunai_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturPajakTunai_Detail"></div>

                            <div class="row mt-4">
                                <div class="col-sm-2 offset-sm-10 text-right">
                                    <span id="fakturPajakTunai_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajakTunai_SymbolDiscount">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajakTunai_Discount">0.00</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span>-</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajakTunai_SymbolDPP">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajakTunai_DPP">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajakTunai_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajakTunai_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-2 text-center offset-sm-7">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajakTunai_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="fakturPajakTunai_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>YUDI SANTOSO</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>MARKETING MANAGER</label>
                                </div>
                            </div>
                        </div>

                        {{-- faktur pajak --}}
                        <div class="fakturPajak1">

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-center">
                                    <span id="fakturPajak1_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX
                                    </span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 25%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajak1_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajak1_AlamatNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span id="fakturPajak1_NPWP">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                                <div class="col-sm-4 offset-sm-1 text-left">
                                    <span id="fakturPajak1_NPWP2">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="fakturPajak1_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturPajak1_Detail"></div>

                            <div class="row mt-4">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_Symbol0">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span>0.00</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_SymbolUM">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_UM">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_SymbolGrandTot">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_GrandTot">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-2 text-center offset-sm-7">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="fakturPajak1_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>YUDI SANTOSO</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>MARKETING MANAGER</label>
                                </div>
                            </div>
                        </div>

                        <div class="fakturPajak">

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-center">
                                    <span id="fakturPajak_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX
                                    </span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 25%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajak_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajak_AlamatNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span id="fakturPajak_NPWP">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                                <div class="col-sm-4 offset-sm-1 text-left">
                                    <span id="fakturPajak_NPWP2">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="fakturPajak_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturPajak_Detail"></div>

                            <div class="row mt-4">
                                <div class="col-sm-1 offset-sm-7 text-right">
                                    <span id="fakturPajak_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 offset-sm-8 text-right">
                                    <span>0.00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-7 text-right">
                                    <span id="fakturPajak_SymbolUM">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_UM">-5.555.555,00</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_UMRupiah">Rp. -5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-7 text-right">
                                    <span id="fakturPajak_SymbolGrandTot">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_GrandTot">-5.555.555,00</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_TotalRupiah">Rp. -5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 offset-sm-10 text-right">
                                    <span id="fakturPajak_Pajak">Rp. -5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-2 offset-sm-9 text-right">
                                    <span id="fakturPajak_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="fakturPajak_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>YUDI SANTOSO</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>MARKETING MANAGER</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 offset-sm-1">
                                    <span id="fakturPajak_Kurs">Kurs /1 Rp.</span>
                                </div>
                            </div>

                        </div>

                        {{-- nota dan faktur --}}
                        <div class="faktur">

                            <div class="row">
                                <div class="col-sm-12 text-right">
                                    <span id="faktur_IdPenagihan">Id Penagihan</span>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div class="col-sm-8 text-right">
                                    <label>Nomor Seri Faktur Pajak</label>
                                </div>
                                <div class="col-sm-4 text-right">
                                    <span id="faktur_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX
                                    </span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="faktur_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="faktur_AlamatNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span id="faktur_NPWP">XXXXXXXXXXXXXXNPWPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="faktur_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="faktur_Detail"></div>

                            <div class="row mt-3">
                                <div class="col-sm-10 text-left offset-sm-1">
                                    <label><b> Pembayaran mohon ditransfer ke: <br>
                                            Bank OCBC NISP Cab. Diponegoro - Surabaya <br>
                                            a/c. 5578 0000 9333 ( IDR ) <br>
                                            a/n. PT. Kerta Rajasa Raya</b></label>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-2 text-left offset-sm-2">
                                    <label><b> XXXXXXXXXXXXXXXXXXXXXXXXXXXX</b></label>
                                </div>
                                <div class="col-sm-1 offset-sm-5 text-right">
                                    <span id="faktur_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="faktur_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 offset-sm-10 text-right">
                                    <label>0.00</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="faktur_SymbolUM">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="faktur_UM">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="faktur_SymbolDPP">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="faktur_DPP">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 text-left offset-sm-1">
                                    <span id="faktur_PersenPPN"><b>11%</b></span>
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="faktur_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="faktur_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-left offset-sm-1">
                                    <span
                                        id="faktur_Terbilang">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-1 text-right" style="font-weight: bold">
                                    <span id="faktur_SymbolTerbayar">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="font-weight: bold">
                                    <span id="faktur_Terbayar">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-4 text-left">
                                    <span id="faktur_SyaratBayar">Syarat Pembayaran: &emsp;&emsp;xxxx Hari</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-left">
                                    <span id="faktur_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="faktur_Thn">11</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="faktur_Tempo">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="faktur_SuratJalan">Surat Jalan: &emsp;&emsp;
                                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-8 text-left">
                                    <span
                                        id="faktur_SJ">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-3 text-center">
                                    <span id="faktur_SJ">RUDY SANTOSO</span>
                                </div>
                            </div>

                        </div>

                        <div class="nota">

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="nota_IdPenagihan">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXIdPenagihanXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="nota_NamaCust">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMACUStXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span id="nota_Alamat">XXXXXXXXXXXXXXalamatXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="nota_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <div id="nota_Detail" style="margin-bottom: 25%"></div>

                            <div class="row mt-4" style="font-weight: bold">
                                <div class="col-sm-8 text-left offset-sm-1">
                                    <span
                                        id="nota_Terbilang">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-1 text-right">
                                    <span id="nota_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="nota_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-4 text-left">
                                    <span id="nota_SyaratBayar">Syarat Pembayaran: &emsp;&emsp;xxxx Hari</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-left">
                                    <span id="nota_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="nota_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-left">
                                    <span id="nota_Tempo">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-left">
                                    <span id="nota_SuratJalan">Surat Jalan: &emsp;&emsp;
                                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-left">
                                    <span
                                        id="nota_SJ">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-3 text-center">
                                    <span id="nota_SJ">YUDI SANTOSO</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .faktur {
        display: none;
    }

    .fakturXC {
        display: none;
    }

    .nota {
        display: none;
    }

    .fakturPajak1 {
        display: none;
    }

    .fakturPajak {
        display: none;
    }

    .fakturTunai {
        display: none;
    }

    .nota1 {
        display: none;
    }

    .fakturPajakTunai {
        display: none;
    }

    .fakturUangMuka {
        display: none;
    }

    @media print {

        /* Hide everything by default */
        body * {
            visibility: hidden;
        }

        /* Show only elements with the class 'faktur' */
        .faktur,
        .faktur * {
            visibility: visible;
        }

        /* Show only elements with the class 'fakturXC' */
        .fakturXC,
        .fakturXC * {
            visibility: visible;
        }

        .nota,
        .nota * {
            visibility: visible;
        }

        .fakturPajak1,
        .fakturPajak1 * {
            visibility: visible;
        }

        .fakturPajak,
        .fakturPajak * {
            visibility: visible;
        }

        .fakturTunai,
        .fakturTunai * {
            visibility: visible;
        }

        .nota1,
        .nota1 * {
            visibility: visible;
        }

        .fakturPajakTunai,
        .fakturPajakTunai * {
            visibility: visible;
        }

        .fakturUangMuka,
        .fakturUangMuka * {
            visibility: visible;
        }

        /* Ensure that the elements are positioned correctly */
        .faktur,
        .fakturXC,
        .nota,
        .fakturPajak1,
        .fakturPajak,
        .fakturTunai,
        .nota1,
        .fakturPajakTunai,
        .fakturUangMuka {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            transform-origin: top left;
        }
    }
</style>
<script src="{{ asset('js/Kencana/ACCPenagihanPenjualan.js') }}"></script>
@endsection
