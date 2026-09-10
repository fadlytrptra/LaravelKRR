@extends('Circular.layouts.app')

@section('title')
    Maintenance Mesin
@endsection

@section('content')
    <div class="card mb-3">
        <div class="card-header">
            Maintenance Mesin
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">
            <div class="row">
                <div class="col-md-6" style="adding-right: 2.5%;">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="id_mesin">Id Mesin</label>
                        </div>

                        <div class="col-md-6">
                            <select id="id_mesin" class="form-select form-select-sm" disabled>
                                <option selected disabled>-- Pilih Id Mesin --</option>
                                @foreach ($listIdMesin as $d)
                                    <option value="{{ $d->Id_mesin }}">
                                        {{ $d->Id_mesin . ' | ' . $d->Nama_mesin }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-3">
                            <label for="id_type_mesin">Id Type Mesin</label>
                        </div>

                        <div class="col-md-9">
                            <select id="id_type_mesin" class="form-select form-select-sm" disabled>
                                <option selected disabled>-- Pilih Id Type Mesin --</option>
                                @foreach ($listTypeMesin as $d)
                                    <option value="{{ $d->IdType_Mesin }}">
                                        {{ $d->IdType_Mesin . ' | ' . $d->Type_Mesin }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-3">
                            <label for="nama_mesin">Nama Mesin</label>
                        </div>

                        <div class="col-md-9">
                            <input type="text" id="nama_mesin" class="form-control form-control-sm" maxlength="25"
                                disabled>
                            <div id="warn_nama" class="invalid-text">
                                Input telah mencapai batas! (Maksimum panjang input 25)
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-3">
                            <label for="nomor_seri">Nomor Seri</label>
                        </div>

                        <div class="col-md-9">
                            <input type="text" id="nomor_seri" class="form-control form-control-sm" maxlength="25"
                                disabled>
                            <div id="warn_seri" class="invalid-text">
                                Input telah mencapai batas! (Maksimum panjang input 25)
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-3">
                            <label for="statusMesin">Status Mesin</label>
                        </div>

                        <div class="col-md-9" style="font-size: small">
                            <div class="form-check">
                                <input class="form-check-input me-2" type="radio" name="flexRadioDefault" id="rdo_aktif"
                                    checked disabled>
                                <label class="form-check-label" for="rdo_aktif">
                                    Aktif
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input me-2" type="radio" name="flexRadioDefault"
                                    id="rdo_nonaktif" disabled>
                                <label class="form-check-label" for="rdo_nonaktif">
                                    Tidak Aktif
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6" style="padding-left: 2.5%;">
                    <div class="row">
                        <div class="col-md-3">
                            <label style="color: white">temp</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="row mt-2">
                            <div class="col-md-4">
                                <label for="tgl_buat">Tanggal Pembuatan</label>
                            </div>

                            <div class="col-md-5">
                                <input type="date" id="tgl_buat" class="form-control form-control-sm" disabled>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-4">
                                <label for="tgl_operasi">Tanggal Dioperasikan</label>
                            </div>

                            <div class="col-md-5">
                                <input type="date" id="tgl_operasi" class="form-control form-control-sm" disabled>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <span style="color: white">temp</span>
                            </div>

                            <div class="col-md-8">
                                <div id="warn_tanggal" class="invalid-text">
                                    <b>Tanggal Operasi</b> tidak boleh lebih awal dari <b>Tanggal Pembuatan</b>.
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-4">
                                <label for="kelompok_mesin">Kelompok Mesin</label>
                            </div>

                            <div class="col-md-8">
                                <select id="kelompok_mesin" class="form-select form-select-sm" disabled>
                                    <option selected disabled>-- Pilih Kelompok Mesin --</option>
                                    @foreach ($listKelompok as $d)
                                        <option value="{{ $d->Id_Group }}">
                                            {{ $d->Id_Group . ' | ' . $d->Keterangan }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-4">
                                <label for="kelompok_perawatan">Kelompok Perawatan</label>
                            </div>

                            <div class="col-md-8">
                                <select id="kelompok_perawatan" class="form-select form-select-sm" disabled>
                                    <option selected disabled>-- Pilih Kelompok Perawatan --</option>
                                    @foreach ($listRawat as $d)
                                        <option value="{{ $d->Id_Group_Perawatan }}">
                                            {{ $d->Id_Group_Perawatan . ' | ' . $d->SDP_Kwh_Meter }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-4">
                                <label for="kelompok_lokasi">Kelompok Lokasi</label>
                            </div>

                            <div class="col-md-8">
                                <select id="kelompok_lokasi" class="form-select form-select-sm" disabled>
                                    <option selected disabled>-- Pilih Kelompok Lokasi --</option>
                                    @foreach ($listLokasi as $d)
                                        <option value="{{ $d->Id_Group_Lokasi }}">
                                            {{ $d->Id_Group_Lokasi . ' | ' . $d->Nama_Lokasi }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-6" style="padding-right: 2.5%;">
                    <div class="row mt-2">
                        <div class="col-md-5">
                            <label for="jumlah_shuttle">Jumlah Shuttle</label>
                        </div>

                        <div class="col-md-5">
                            <input type="number" id="jumlah_shuttle" class="form-control form-control-sm"
                                placeholder="0" min="0" max="9999999.99" disabled>
                            <div id="warn_shuttle" class="invalid-text">
                                Input telah mencapai batas!
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-5">
                            <label for="rpm">Rotation per meter (Rpm)</label>
                        </div>

                        <div class="col-md-5">
                            <input type="number" id="rpm" class="form-control form-control-sm" placeholder="0"
                                min="0" max="9999999.99" disabled>
                            <div id="warn_rpm" class="invalid-text">
                                Input telah mencapai batas!
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-5">
                            <label for="premi">PREMI</label>
                        </div>

                        <div class="col-md-5">
                            <input type="number" id="premi" class="form-control form-control-sm" placeholder="0"
                                min="0" max="9999999.99" disabled>
                            <div id="warn_premi" class="invalid-text">
                                Input telah mencapai batas!
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6" style="padding-left: 2.5%;">
                    <div class="row mt-2">
                        <div class="col-md-5">
                            <label for="min_efisiensi">Minimum Efisiensi Mesin</label>
                        </div>

                        <div class="col-md-5">
                            <input type="number" id="min_efisiensi" class="form-control form-control-sm"
                                placeholder="0" min="0" max="9999999.99" disabled>
                            <div id="warn_efisiensi" class="invalid-text">
                                Input telah mencapai batas!
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-5">
                            <label for="min_mesin">Minimum Mesin</label>
                        </div>

                        <div class="col-md-5">
                            <input type="number" id="min_mesin" class="form-control form-control-sm" placeholder="0"
                                min="0" max="9999999.99" disabled>
                            <div id="warn_mesin" class="invalid-text">
                                Input telah mencapai batas!
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- START Bagian Data PLC yang sudah tidak terpakai --}}
            <div style="display: none">
                <div class="card mt-5">
                    <div class="card-body">
                        <h5 class="custom-card-header ms-3">Data PLC</h5>

                        <div class="row mt-1">
                            <div class="col-md-6" style="padding-right: 2.5%;">
                                <div class="row">
                                    <div class="col-md-5 aligned-text">
                                        <label>Status PL</label>
                                    </div>

                                    <div class="col-md-5">
                                        <div class="form-check">
                                            <input type="checkbox" id="check_active" class="form-check-input me-2"
                                                value="aktif" disabled>
                                            <label class="form-check-label" for="check_active">Active</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-2">
                                    <div class="col-md-5 aligned-text">
                                        <label for="group_pl">Group PL</label>
                                    </div>

                                    <div class="col-md-5">
                                        <input type="text" id="group_pl" class="form-control form-control-sm"
                                            maxlength="2" disabled>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6" style="padding-right: 2.5%;">
                                <div class="row">
                                    <div class="col-md-3">
                                        <label style="color: white">temp</label>
                                    </div>
                                </div>

                                <div class="row mt-2">
                                    <div class="col-md-3 aligned-text">
                                        <label for="id_plc">ID. PLC</label>
                                    </div>

                                    <div class="col-md-5">
                                        <select id="id_plc" class="form-select form-select-sm" disabled>
                                            <option selected disabled>-- Pilih ID. PLC --</option>
                                            @foreach ($listIdPlc as $d)
                                                <option value="{{ $d->Id_T_PLC }}">
                                                    {{ $d->Id_T_PLC }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {{-- END Bagian Data PLC yang sudah tidak terpakai --}}

            <div class="row mt-4">
                <div class="col-md-12 d-flex justify-content-center flex-wrap">
                    <button type="button" id="btn_isi" class="btn btn-success mx-1 my-1">Tambah</button>
                    <button type="button" id="btn_koreksi" class="btn btn-warning mx-1 my-1">Koreksi</button>
                    <button type="button" id="btn_hapus" class="btn btn-danger mx-1 my-1">Hapus</button>
                    <div class="col-md-1"></div>
                    <form id="form_submit" action="{{ url('/proses-mesin') }}" method="post">
                        @csrf
                        <input type="hidden" id="mode_proses" name="mode_proses">
                        <input type="hidden" id="form_data" name="form_data">
                        <input type="hidden" name="form_sp" value="Sp_Maint_Mesin">
                        <button type="submit" id="btn_proses" class="btn btn-primary mx-1 my-1" disabled>Proses</button>
                    </form>
                    <button type="button" id="btn_keluar" class="btn btn-secondary mx-1 my-1">Keluar</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('custom_js')
    <script src="{{ asset('js/Circular/master/mesinMaster.js') }}"></script>
@endsection
