@extends('Circular.layouts.app')

@section('title')
    Maintenance Pengelompokan Perawatan
@endsection

@section('content')
    <div class="card" style="max-width: 750px; margin-left: auto; margin-right: auto;">
        <div class="card-header">
            Maintenance Pengelompokan Perawatan
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">
            <div class="row">
                <div class="col-md-4">
                    <label for="id_perawatan">Id Perawatan</label>
                </div>

                <div class="col-md-6">
                    <select id="id_perawatan" class="form-select form-select-sm" disabled>
                        <option selected disabled>-- Pilih Id Perawatan --</option>
                        @foreach ($listRawat as $d)
                            <option value="{{ $d->Id_Group_Perawatan . '~' . $d->SDP_Kwh_Meter }}">
                                {{ $d->Id_Group_Perawatan . ' | ' . $d->SDP_Kwh_Meter }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-4">
                    <label for="kwh_meter">SDP Kwh Meter</label>
                </div>

                <div class="col-md-8">
                    <input type="text" id="kwh_meter" class="form-control form-control-sm" maxlength="50" disabled>
                    <div id="warn_meter" class="invalid-text">
                        Input telah mencapai batas! (Maksimum panjang input 50)
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-12 d-flex justify-content-center flex-wrap">
                    <button type="button" id="btn_isi" class="btn btn-success mx-1 my-1">Isi</button>
                    <button type="button" id="btn_koreksi" class="btn btn-warning mx-1 my-1">Koreksi</button>
                    <button type="button" id="btn_hapus" class="btn btn-danger mx-1 my-1">Hapus</button>
                    <form id="form_submit" action="{{ url('/proses-mesin') }}" method="post">
                        @csrf
                        <input type="hidden" id="mode_proses" name="mode_proses">
                        <input type="hidden" id="form_data" name="form_data">
                        <input type="hidden" name="form_sp" value="Sp_Maint_GroupPerawatan">
                        <button type="submit" id="btn_proses" class="btn btn-primary mx-1 my-1"
                            style="margin-left: 1.5rem !important">Proses</button>
                    </form>
                    <button type="button" id="btn_keluar" class="btn btn-secondary mx-1 my-1">Keluar</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('custom_js')
    <script src="{{ asset('js/Circular/master/kelompokRawat.js') }}"></script>
@endsection
