@extends('Circular.layouts.app')
@section('content')
@section('title', 'Maintenance Pemeriksaan Ganti Ukuran')
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

    .box-item {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px 5px;
        height: 100%;
        background: #fafafa;
        transition: 0.2s;
    }

    .box-item:hover {
        border-color: #0d6efd;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
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
                <div class="card-header">Maintenance Pemeriksaan Ganti Ukuran&emsp;FM-7.5-01-QC-02-03</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="col-12">
                        <div class="">
                            <label style="font-weight: bold;" id="labelProses">Input Data</label>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="id">Tanggal</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="date" name="id_penagihan" class="form-control" style="width: 100%"
                                        id="tanggal">
                                </div>
                                <div class="col-md-1 justify-content-end">
                                    <label for="type_mesin">Type Mesin</label>
                                </div>
                                <div class="col-md-3">
                                    <select id="type_mesin" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                        @foreach ($listTypeMesin as $d)
                                            <option value="{{ $d->IdType_Mesin }}">
                                                {{ $d->IdType_Mesin . ' | ' . $d->Type_Mesin }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-1 justify-content-end">
                                    <label for="nama_mesin">Mesin</label>
                                </div>
                                <div class="col-md-2">
                                    <select id="nama_mesin" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-3 d-flex flex-column align-items-center">
                                    <label for="ukuran_asal" class="form-label font-weight-bold text-center">
                                        Ukuran Asal
                                    </label>
                                    <input type="text" class="form-control text-center" id="ukuran_asal"
                                        name="ukuran_asal" enterkeyhint="enter">
                                </div>
                                <div class="col-3 d-flex flex-column align-items-center">
                                    <label for="ukuran_baru" class="form-label font-weight-bold text-center">
                                        Ukuran Baru
                                    </label>
                                    <input type="text" class="form-control text-center" id="ukuran_baru"
                                        name="ukuran_baru" enterkeyhint="enter" placeholder="Ukuran ( WA X WE ) Denier">
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="corak" class="form-label font-weight-bold text-center">
                                        Corak
                                    </label>
                                    <input type="text" class="form-control text-center" id="corak"
                                        name="corak">
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="rpm" class="form-label font-weight-bold text-center">
                                        RPM
                                    </label>
                                    <input type="number" class="form-control text-center" id="rpm"
                                        name="rpm">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-3 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center w-100">
                                        Benang WA Baru
                                    </label>

                                    <select id="benang_wa" class="form-select form-select-sm text-center">
                                        <option></option>
                                        @foreach ($listBenangWeft as $d)
                                            <option value="{{ $d->KD_BRG }}">
                                                {{ $d->KD_BRG . ' | ' . $d->NAMA_BRG }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-3 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center w-100">
                                        Benang WE Baru
                                    </label>

                                    <select id="benang_we" class="form-select form-select-sm text-center">
                                        <option></option>
                                        @foreach ($listBenangWeft as $d)
                                            <option value="{{ $d->KD_BRG }}">
                                                {{ $d->KD_BRG . ' | ' . $d->NAMA_BRG }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="jumlah_warp" class="form-label font-weight-bold text-center">
                                        Jumlah Warp
                                    </label>
                                    <input type="number" class="form-control text-center" id="jumlah_warp"
                                        name="jumlah_warp">
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="berat_standart" class="form-label font-weight-bold text-center">
                                        Berat Standart
                                    </label>
                                    <input type="number" class="form-control text-center" id="berat_standart"
                                        name="berat_standart">
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="berat_realita" class="form-label font-weight-bold text-center">
                                        Berat Realita
                                    </label>
                                    <input type="number" class="form-control text-center" id="berat_realita"
                                        name="berat_realita">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-4 d-flex flex-column align-items-center">
                                    <label for="perawatan_gu" class="form-label font-weight-bold text-center">
                                        Perawatan GU
                                    </label>
                                    <input type="text" class="form-control text-center" id="perawatan_gu"
                                        name="perawatan_gu">
                                </div>
                                <div class="col-4 d-flex flex-column align-items-center">
                                    <label for="keterangan" class="form-label font-weight-bold text-center">
                                        Keterangan
                                    </label>
                                    <input type="text" class="form-control text-center" id="keterangan"
                                        name="keterangan">
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="awal_ganti" class="form-label font-weight-bold text-center">
                                        Awal Ganti
                                    </label>
                                    <input type="datetime-local" class="form-control text-center" id="awal_ganti"
                                        name="awal_ganti">
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="akhir_ganti" class="form-label font-weight-bold text-center">
                                        Akhir Ganti
                                    </label>
                                    <input type="datetime-local" class="form-control text-center" id="akhir_ganti"
                                        name="akhir_ganti">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-2 d-flex flex-column align-items-center box-item box-item">
                                    <label for="jml_bng_wa" class="form-label font-weight-bold text-center">
                                        Ukuran Gauge Ring
                                    </label>

                                    <div class="row w-100 g-0">
                                        <div class="col p-0">
                                            <input type="number" class="form-control text-center"
                                                id="ukuranGr_benar" name="ukuranGr_benar" placeholder="Benar">
                                        </div>
                                        <div class="col p-0">
                                            <input type="number" class="form-control text-center"
                                                id="ukuranGr_salah" name="ukuranGr_salah" placeholder="Salah">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Posisi Gauge Ring
                                    </label>

                                    <input type="hidden" name="posisi_gr" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="posisi_gr"
                                            name="posisi_gr" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="posisi_gr" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Posisi Shuttle Arm
                                    </label>

                                    <input type="hidden" name="posisi_sa" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="posisi_sa"
                                            name="posisi_sa" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="posisi_sa" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Tension Brake Shuttle
                                    </label>

                                    <input type="hidden" name="tension_bs" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="tension_bs"
                                            name="tension_bs" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="tension_bs" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Kondisi Push Rol
                                    </label>

                                    <input type="hidden" name="kondisi_pr" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="kondisi_pr"
                                            name="kondisi_pr" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="kondisi_pr" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Kondisi Eyelet Mesin
                                    </label>

                                    <input type="hidden" name="kondisi_em" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="kondisi_em"
                                            name="kondisi_em" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="kondisi_em" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Kondisi Upper Lower Ring
                                    </label>

                                    <input type="hidden" name="kondisi_ulr" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="kondisi_ulr"
                                            name="kondisi_ulr" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="kondisi_ulr" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Kondisi Dancing Level
                                    </label>

                                    <input type="hidden" name="kondisi_dl" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="kondisi_dl"
                                            name="kondisi_dl" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="kondisi_dl" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Kondisi Shuttle Body
                                    </label>

                                    <input type="hidden" name="kondisi_sb" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="kondisi_sb"
                                            name="kondisi_sb" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="kondisi_sb" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Kondisi Oli Tetes
                                    </label>

                                    <input type="hidden" name="kondisi_ot" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="kondisi_ot"
                                            name="kondisi_ot" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="kondisi_ot" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Sensor Warp
                                    </label>

                                    <input type="hidden" name="sensor_warp" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="sensor_warp"
                                            name="sensor_warp" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="sensor_warp" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Sensor Weft
                                    </label>

                                    <input type="hidden" name="sensor_weft" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="sensor_weft"
                                            name="sensor_weft" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="sensor_weft" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Sensor Weft End
                                    </label>

                                    <input type="hidden" name="sensor_weft_end" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="sensor_weft_end"
                                            name="sensor_weft_end" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="sensor_weft_end" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Posisi Expander
                                    </label>

                                    <input type="hidden" name="posisi_expander" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="posisi_expander"
                                            name="posisi_expander" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="posisi_expander" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Roda Expander
                                    </label>

                                    <input type="hidden" name="roda_expander" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="roda_expander"
                                            name="roda_expander" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="roda_expander" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label for="jml_bng_wa" class="form-label font-weight-bold text-center">
                                        Setting Weft / Change Gear
                                    </label>

                                    <div class="row w-100 g-0">
                                        <div class="col p-0">
                                            <input type="number" class="form-control text-center"
                                                id="settingWeft_benar" name="settingWeft_benar" placeholder="Benar">
                                        </div>
                                        <div class="col p-0">
                                            <input type="number" class="form-control text-center"
                                                id="settingWeft_salah" name="settingWeft_salah" placeholder="Salah">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Hasil Belahan / Gusset
                                    </label>

                                    <input type="hidden" name="hasil_belahan" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="hasil_belahan"
                                            name="hasil_belahan" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="hasil_belahan" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Kondisi Rajutan Saat JOG
                                    </label>

                                    <input type="hidden" name="kondisi_jog" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="kondisi_jog"
                                            name="kondisi_jog" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="kondisi_jog" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Tension Winder
                                    </label>

                                    <input type="hidden" name="tension_winder" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="tension_winder"
                                            name="tension_winder" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="tension_winder" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Jalur Benang di Rak
                                    </label>

                                    <input type="hidden" name="jalurBenang_rak" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="jalurBenang_rak"
                                            name="jalurBenang_rak" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="jalurBenang_rak" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Jalur Benang di Dancing Lever
                                    </label>

                                    <input type="hidden" name="jalurBenang_dl" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="jalurBenang_dl"
                                            name="jalurBenang_dl" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="jalurBenang_dl" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Jalur Benang di Wire Held
                                    </label>

                                    <input type="hidden" name="jalurBenang_wh" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="jalurBenang_wh"
                                            name="jalurBenang_wh" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="jalurBenang_wh" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Kondisi Dropper
                                    </label>

                                    <input type="hidden" name="kondisi_dropper" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="kondisi_dropper"
                                            name="kondisi_dropper" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="kondisi_dropper" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Corak & Jumlah Strip
                                    </label>

                                    <input type="hidden" name="corak_js" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="corak_js"
                                            name="corak_js" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="corak_js" style="min-width: 50px;">
                                            <span class="text-off">Salah</span>
                                            <span class="text-on d-none">Benar</span>

                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-2 d-flex flex-column align-items-center box-item">
                                    <label class="form-label font-weight-bold text-center">
                                        Setting Roll WTC
                                    </label>

                                    <input type="hidden" name="setting_roll_wtc" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="setting_roll_wtc"
                                            name="setting_roll_wtc" value="OK">

                                        <label class="form-check-label align-items-center justify-content-center"
                                            for="setting_roll_wtc" style="min-width: 50px;">
                                            <span class="text-off">Belum</span>
                                            <span class="text-on d-none">Sudah</span>

                                        </label>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row justify-content-center">
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
                            <hr>
                            <div class="row align-items-start">
                                <!-- KIRI -->
                                <div class="col-md-8">
                                    <label for="radiobutton" class="form-check-label" id="labelRedisplay">
                                        Tanggal Ganti Ukuran
                                    </label>
                                    <div class="row align-items-center mt-1">
                                        <div class="col-auto">
                                            <input type="date" class="form-control font-weight-bold"
                                                id="tgl_awal" name="tgl_awal">
                                        </div>
                                        <div class="col-auto">
                                            <label class="mb-0">s/d</label>
                                        </div>
                                        <div class="col-auto">
                                            <input type="date" class="form-control font-weight-bold"
                                                id="tgl_akhir" name="tgl_akhir">
                                        </div>
                                        <div class="col-auto">
                                            <button class="btn btn-info" id="btn_redisplay">
                                                Redisplay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <table class ="table table-bordered text-center align-middle" id="table_atas"
                                    style="width: 100%">
                                    <thead class="table-dark" style="text-align: center">
                                        <tr>
                                            <th rowspan="2">ID</th>
                                            <th rowspan="2">Tanggal</th>
                                            <th rowspan="2">Type Mesin</th>
                                            <th rowspan="2">Mesin</th>
                                            <th rowspan="2">Ukuran Asal</th>
                                            <th rowspan="2">Ukuran Baru</th>
                                            <th rowspan="2">Berat Standart</th>
                                            <th rowspan="2">Berat Realita</th>
                                            <th colspan="2">Benang</th>
                                            <th rowspan="2">Jumlah Warp</th>
                                            <th rowspan="2">User Input</th>
                                            <th rowspan="2">Aksi</th>
                                        </tr>
                                        <tr>
                                            <th>WA</th>
                                            <th>WE</th>
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
    </div>
    <script type="text/javascript" src="{{ asset('js/Circular/transaksi/MaintenancePemeriksaanGantiUkuran.js') }}"></script>
@endsection
