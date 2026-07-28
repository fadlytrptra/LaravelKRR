@extends('layouts.appQC')
@section('content')
@section('title', 'Benang NG')
{{-- <link href="{{ asset('css/ListPurchaseOrder.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet"> --}}
<style>
    .switch-lampu .form-check-input {
        width: 3.2rem;
        height: 1.6rem;
        cursor: pointer;
    }

    .switch-lampu .form-check-input:checked {
        background-color: #28a745;
        border-color: #28a745;
    }

    .switch-lampu .form-check-input:not(:checked) {
        background-color: #dc3545;
        border-color: #dc3545;
    }

    .switch-lampu .form-check-label {
        margin-left: 8px;
        font-weight: bold;
    }

    .switch-lampu .text-on {
        color: #28a745;
    }

    .switch-lampu .text-off {
        color: #dc3545;
    }

    /* .container-fluid {
        transform: scale(0.9);
        transform-origin: top left;
        width: 111.11%;
    } */

    .cacat-item {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        cursor: pointer;
        width: fit-content;
    }

    .kode {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        transition: .2s;
    }

    .kode.selected {
        border: 2px solid #000;
    }

    .nama {
        user-select: none;
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
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
                <div class="card-header">Benang NG</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="col-12">
                        <div class="card">
                            <label style="font-weight: bold;" id="labelProses">Input Data</label>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="lokasi">Lokasi</label>
                                </div>
                                <div class="col-md-3">
                                    <select id="lokasi" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                        @foreach ($listLokasi as $d)
                                            <option value="{{ $d->idLokasi }}">
                                                {{ $d->idLokasi . ' | ' . $d->nama_lokasi }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-1 d-flex justify-content-end">
                                    <label for="tanggal">Tanggal</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="date" name="tanggal" class="form-control" style="width: 100%"
                                        id="tanggal">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="mesin">No Mesin</label>
                                </div>
                                <div class="col-md-3">
                                    <select id="mesin" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                        @foreach ($listMesin as $d)
                                            <option value="{{ $d->IdMesin }}">
                                                {{ $d->TypeMesin }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-1 d-flex justify-content-end">
                                    <label for="shift">Shift</label>
                                </div>
                                <div class="col-md-2">
                                    <select id="shift" class="form-select form-select-sm" style="width: 100%">
                                        {{-- <option disabled selected>Pilih Shift</option> --}}
                                        <option></option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                    </select>
                                </div>
                                <div class="col-md-2 d-flex justify-content-end">
                                    <label for="jam_kerja">Jam Prod</label>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group input-group-sm">
                                        <input type="time" id="jam_prod" class="form-control">
                                        {{-- <label>&nbsp;s/d&nbsp;</label>
                                        <input type="time" id="jam_kerja_akhir" class="form-control"> --}}
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="spek_benang">Spek Benang</label>
                                </div>
                                <div class="col-md-5">
                                    <input type="text" class="form-control" id="spek_benang"
                                        name="spek_benang">
                                </div>
                                <div class="col-md-1 d-flex justify-content-end">
                                    <label for="jumlah">Jumlah</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="jumlah"
                                        name="jumlah">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="keterangan">Keterangan</label>
                                </div>
                                <div class="col-md-10">
                                    <input type="text" class="form-control" id="keterangan" name="keterangan">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="cacat-item" data-target="1">
                                        <span class="kode">1.</span>
                                        <span class="nama">Kel. Samping</span>
                                        <input type="hidden" name="kel_samping" id="kel_samping" value="0">
                                    </div>
                                    <div class="cacat-item" data-target="2">
                                        <span class="kode">2.</span>
                                        <span class="nama">Bendol-Bendol</span>
                                        <input type="hidden" name="bendol" id="bendol" value="0">
                                    </div>
                                    <div class="cacat-item" data-target="3">
                                        <span class="kode">3.</span>
                                        <span class="nama">Tebal</span>
                                        <input type="hidden" name="tebal" id="tebal" value="0">
                                    </div>
                                    <div class="cacat-item" data-target="4">
                                        <span class="kode">4.</span>
                                        <span class="nama">Nglinting</span>
                                        <input type="hidden" name="nglinting" id="nglinting" value="0">
                                    </div>
                                    <div class="cacat-item" data-target="5">
                                        <span class="kode">5.</span>
                                        <span class="nama">Berbulu</span>
                                        <input type="hidden" name="berbulu" id="berbulu" value="0">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="cacat-item" data-target="6">
                                        <span class="kode">6.</span>
                                        <span class="nama">Tipis</span>
                                        <input type="hidden" name="tipis" id="tipis" value="0">
                                    </div>
                                    <div class="cacat-item" data-target="7">
                                        <span class="kode">7.</span>
                                        <span class="nama">Besar</span>
                                        <input type="hidden" name="besar" id="besar" value="0">
                                    </div>
                                    <div class="cacat-item" data-target="8">
                                        <span class="kode">8.</span>
                                        <span class="nama">Kecil</span>
                                        <input type="hidden" name="kecil" id="kecil" value="0">
                                    </div>
                                    <div class="cacat-item" data-target="9">
                                        <span class="kode">9.</span>
                                        <span class="nama">Warna Lain</span>
                                        <input type="hidden" name="warna_lain" id="warna_lain" value="0">
                                    </div>
                                    <div class="cacat-item" data-target="A">
                                        <span class="kode">A.</span>
                                        <span class="nama">Luka</span>
                                        <input type="hidden" name="luka" id="luka" value="0">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="cacat-item" data-target="B">
                                        <span class="kode">B.</span>
                                        <span class="nama">Trial Warna</span>
                                        <input type="hidden" name="trial_warna" id="trial_warna" value="0">
                                    </div>
                                    <div class="cacat-item" data-target="C">
                                        <span class="kode">C.</span>
                                        <span class="nama">Pinggiran</span>
                                        <input type="hidden" name="pinggiran" id="pinggiran" value="0">
                                    </div>
                                    <div class="cacat-item" data-target="D">
                                        <span class="kode">D.</span>
                                        <span class="nama">ST Jelek</span>
                                        <input type="hidden" name="st_jelek" id="st_jelek" value="0">
                                    </div>
                                    <div class="cacat-item" data-target="E">
                                        <span class="kode">E.</span>
                                        <span class="nama">Elongation</span>
                                        <input type="hidden" name="elongation" id="elongation" value="0">
                                    </div>
                                    <div class="cacat-item" data-target="F">
                                        <span class="kode">F.</span>
                                        <span class="nama">Setting / Lain-lain</span>
                                        <input type="hidden" name="setting_lain2" id="setting_lain2"
                                            value="0">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="sebab_ng">Sebab NG</label>
                                </div>
                                <div class="col-md-10">
                                    <input type="text" class="form-control" id="sebab_ng" name="sebab_ng">
                                </div>
                            </div>
                            <br>
                            <div style="display: flex; justify-content: space-between;">
                                <button type="button" class="btn btn-success" id="btn_proses"
                                    style="width: 130px; margin-left: 10px;">
                                    PROSES
                                </button>

                                <button type="button" class="btn btn-secondary" id="btn_batal"
                                    style="width: 100px; margin-right: 10px;">
                                    BATAL
                                </button>
                            </div>
                            <br>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-5">
                                <label for="radiobutton" class="form-check-label" id="labelRedisplay">Tanggal
                                    Cek</label>
                                <div class="row">
                                    <div class="col">
                                        <input type="date" class="form-control font-weight-bold"
                                            id="tgl_awalBawah" name="tgl_awalBawah">
                                        <label for="tgl_awalBawah" class="form-label"></label>
                                    </div>
                                    <div>
                                        <label for="sampai_dengan">s/d</label>
                                    </div>
                                    <div class="col">
                                        <input type="date" class="form-control font-weight-bold"
                                            id="tgl_akhirBawah" name="tgl_akhirBawah">
                                        <label for="tgl_akhirBawah" class="form-label"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="col-12">
                                    <button class="btn btn-info mt-4 w-100" id="btn_redisplay">Redisplay</button>
                                </div>
                            </div>
                            {{-- <div class="col-2" style="text-align: right">
                                <div class="col-12">
                                    <button class="btn btno mt-4 w-100" id="btn_laporan">Laporan</button>
                                </div>
                            </div> --}}
                        </div>
                    </div>
                    <div class="col-12">
                        <table class ="table table-bordered text-center align-middle" id="table_bawah"
                            style="width: 100%">
                            <thead class="table-dark" style="text-align: center">
                                <tr>
                                    <th>ID</th>
                                    <th>Tanggal</th>
                                    <th>Shift</th>
                                    <th>Jam</th>
                                    <th>Mesin</th>
                                    <th>Spek Bng </th>
                                    <th>User Input</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('QC.Extruder.ModalBenangNG')
{{-- <script src="{{ asset('js/Accounting/Piutang/MaintenanceFakturPajakPenjualan.js') }}"></script> --}}
<script type="text/javascript" src="{{ asset('js/QC/Extruder/BenangNG.js') }}"></script>
@endsection
