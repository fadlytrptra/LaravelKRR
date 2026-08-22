@extends('layouts.appSales') @section('content')
@section('title', 'Batal SJ')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<style>
    .input-error {
        text-decoration-color: red;
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Batal Surat Jalan</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div style="width: 100%;height: 100%;gap: 3%;display: flex;flex-direction: row;">
                        <div style="display: flex;gap: 10px;width: 100%;height: 100%;flex-direction: column;">
                            <div style="display: flex;gap: 10px;width: 100%;height: 100%;flex-direction: column;"
                                id="div_suratJalan">
                                <div style="width: 100%;height: 100%;gap: 3%;display: flex;flex-direction: row;">
                                    <div style="display: flex;width: 45%;height: 100%;flex-direction: column;">
                                        <div style="display: flex;width: 45%;flex-direction: column;margin: 4px 0;">
                                            <label for="customer">Customer</label>
                                            <div
                                                style="display: flex;width: 100%;flex-direction: row;margin: 4px 0;gap: 5px;">
                                                <input type="text" name="customer" id="customer" class="input"
                                                    readonly>
                                                <input type="hidden" name="idCustomer" id="idCustomer" class="input">
                                                {{-- <button disabled id="list_sjButton" class="btn btn-info"
                                                        style="display: inline;">↺ Lihat Data</button> --}}
                                                <button id="list_customerButton" class="btn btn-info"
                                                    style="display: inline;"> ... </button>
                                            </div>
                                        </div>
                                        <div style="display: flex;width: 45%;flex-direction: column;margin: 4px 0;">
                                            <label for="surat_pesanan">Surat Pesanan</label>
                                            <div
                                                style="display: flex;width: 100%;flex-direction: row;margin: 4px 0;gap: 5px;">
                                                <input type="text" name="surat_pesanan" id="surat_pesanan"
                                                    class="input" readonly>
                                                <button disabled id="list_suratpesananButton" class="btn btn-info"
                                                    style="display: inline;"> ... </button>
                                            </div>
                                        </div>
                                        <div style="display: flex;width: 60%;flex-direction: column;margin: 4px 0;">
                                            <label for="jenisSuratJalan">Jenis Surat Jalan</label>
                                            <div
                                                style="display: flex;width: 100%;flex-direction: row;margin: 4px 0;gap: 5px;">
                                                <input type="text" name="jenisSuratJalan" id="jenisSuratJalan"
                                                    class="input" readonly>
                                                <input type="hidden" name="idJenisSuratJalan" id="idJenisSuratJalan">
                                                <button disabled id="list_jenisSuratJalanButton" class="btn btn-info"
                                                    style="display: inline;"> ... </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="display: flex;width: 45%;height: 100%;flex-direction: column;">
                                        <div style="display: flex;width: 60%;flex-direction: column;margin: 4px 0;">
                                            <label for="surat_jalan">Surat Jalan</label>
                                            <input type="text" name="surat_jalan" id="surat_jalan" class="input">
                                        </div>
                                        <div style="display: flex;width: 60%;flex-direction: column;margin: 4px 0;">
                                            <label for="alasan_batal">Alasan Batal</label>
                                            <textarea placeholder="Alasan Batal" name="alasan_batal" id="alasan_batal" class="textarea"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="permohonan-sj-container13">
                                <button id="proses_button" class="btn btn-primary">
                                    <span>Proses</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/Kencana/batal-s-j.js') }}"></script>
@endsection
