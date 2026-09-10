@extends('Circular.layouts.app')

@section('title')
    Maintenance Jenis Gangguan
@endsection

@section('content')
    {{-- <div class="card mb-3">
        <div class="card-header">
            Maintenance Order
        </div> --}}

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Jenis Gangguan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            @csrf
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="shift" class="form-label">Id Gangguan</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="id_gangguan" name="id_gangguan" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <button id="btn_idGangguan" class="btn btn-primary form-control" style="width: 100%"
                                        disabled>...</button>
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="jenisGangguan" class="form-label">Jenis Gangguan</label>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="jenisGangguan" name="jenisGangguan">
                                </div>
                            </div>
                            <div class="row pb-2">
                                <div class="col-sm-2">
                                    <label for="order" class="form-label">Status Gangguan :</label>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="status_gangguan" id="interen"
                                            value="I">
                                        <label class="form-check-label" for="interen">
                                            &nbsp;&nbsp;INTEREN
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="status_gangguan" id="exteren"
                                            value="E">
                                        <label class="form-check-label" for="exteren">
                                            &nbsp;&nbsp;EXTEREN
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-md-12 d-flex justify-content-center flex-wrap">
                                    <button type="button" id="btn_isi" class="btn btn-primary mx-1 my-1">Isi</button>
                                    <button type="button" id="btn_koreksi"
                                        class="btn btn-warning mx-1 my-1">Koreksi</button>
                                    <button type="button" id="btn_hapus" class="btn btn-danger mx-1 my-1">Hapus</button>
                                    <div class="col-md-1"></div>

                                    <button type="button" id="btn_proses" class="btn btn-success mx-1 my-1">Proses</button>
                                    <button type="button" id="btn_batal" class="btn btn-secondary mx-1 my-1">Batal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/master/MaintenanceJenisGangguan.js') }}"></script>
@endsection
