@extends('Circular.layouts.app')

@section('title')
    Maintenance Type Mesin
@endsection

@section('content')
    <div class="card" style="max-width: 750px; margin-left: auto; margin-right: auto;">
        <div class="card-header">
            Maintenance Type Mesin
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">
            <div class="row">
                <div class="col-md-4">
                    <label for="id_type_mesin">Id Type Mesin</label>
                </div>

                <div class="col-md-6">
                    <select id="id_type_mesin" name="id_type_mesin" class="form-select form-select-sm" disabled>
                        <option></option>
                        @foreach ($listTypeMesin as $d)
                            <option
                                value="{{ $d->IdType_Mesin . '~' . $d->Type_Mesin . '~' . $d->Nama_OEM . '~' . $d->Original_Country }}">
                                {{ $d->IdType_Mesin . ' | ' . $d->Type_Mesin }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-4">
                    <label for="nama_type_mesin">Nama Type Mesin</label>
                </div>

                <div class="col-md-8">
                    <input type="text" id="nama_type_mesin" name="nama_type_mesin" class="form-control form-control-sm"
                        maxlength="25" disabled>
                    <div id="warn_type" class="invalid-text">
                        Input telah mencapai batas! (Maksimum panjang input 25)
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-4">
                    <label for="pabrik_pembuat_mesin">Pabrik Pembuat Mesin</label>
                </div>

                <div class="col-md-8">
                    <input type="text" id="pabrik_pembuat_mesin" name="pabrik_pembuat_mesin"
                        class="form-control form-control-sm" maxlength="25" disabled>
                    <div id="warn_pabrik" class="invalid-text">
                        Input telah mencapai batas! (Maksimum panjang input 25)
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-4">
                    <label for="negara_pembuat_mesin">Negara Pembuat Mesin</label>
                </div>

                <div class="col-md-8">
                    <input type="text" id="negara_pembuat_mesin" name="negara_pembuat_mesin"
                        class="form-control form-control-sm" maxlength="25" disabled>
                    <div id="warn_negara" class="invalid-text">
                        Input telah mencapai batas! (Maksimum panjang input 25)
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-12 d-flex justify-content-center flex-wrap">
                    <button type="button" id="btn_isi" class="btn btn-success mx-1 my-1">Tambah</button>
                    <button type="button" id="btn_koreksi" class="btn btn-warning mx-1 my-1">Koreksi</button>
                    <button type="button" id="btn_hapus" class="btn btn-danger mx-1 my-1">Hapus</button>
                    <form id="form_submit" action="{{ url('/proses-mesin') }}" method="POST">
                        @csrf
                        <input type="hidden" id="mode_proses" name="mode_proses">
                        <input type="hidden" id="form_data" name="form_data">
                        <input type="hidden" name="form_sp" value="Sp_Maint_TypeMesin">
                        <button type="submit" id="btn_proses" class="btn btn-primary mx-1 my-1"
                            style="margin-left: 1.5rem !important" disabled>Proses</button>
                    </form>
                    <button type="button" id="btn_keluar" class="btn btn-secondary mx-1 my-1">Keluar</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('custom_js')
    <script src="{{ asset('js/Circular/master/mesinType.js') }}"></script>
@endsection
