@extends('Circular.layouts.app')

@section('title')
    Jam Kerja
@endsection

@section('content')
    {{-- <div class="card mb-3">
        <div class="card-header">
            Maintenance Order
        </div> --}}

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-7 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Jam Kerja</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            @csrf
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="tanggal" class="form-label">Tanggal</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="date" class="form-control" id="tanggal" name="tanggal">
                                </div>
                                <div class="col-sm-1">
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="shift" class="form-label">Shift</label>
                                </div>
                                <div class="col-sm-4">
                                    <select class="form-control" id="shift" name="shift">
                                        <option value="">Pilih Shift ▼</option>
                                        <option value="P">P</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label id="label_ganti" for="type_mesin" class="form-label">Type Mesin</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="type_mesin" name="type_mesin" readonly>
                                    <input type="text" class="form-control" id="idType_mesin" name="idType_mesin" style="display: none;">
                                </div>
                                <div class="col-sm-1">
                                    <button id="btn_type" class="btn btn-primary form-control" style="width: 50%">Pilih
                                        Type</button>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="nama_mesin" class="form-label">Nama Mesin</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="nama_mesin" name="nama_mesin" readonly>
                                    <input type="text" class="form-control" id="id_mesin" name="id_mesin" style="display: none;">
                                </div>
                                <div class="col-sm-4">
                                    <button id="btn_mesin" class="btn btn-primary form-control" style="width: 50%">Pilih
                                        Mesin</button>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label id="label_ganti" for="jam_kerja" class="form-label">Jam Kerja</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="jam_kerja" name="jam_kerja">
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <button class="btn btn-success" id="btn_proses">Proses</button>
                                </div>
                                <div class="col" style="text-align: right;">
                                    <button class="btn btn-danger" id="btn_batal">Batal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/koreksi/JamKerja.js') }}"></script>
@endsection
