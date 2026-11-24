@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance BKK (Tunai) - ACC TT')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance BKK (Tunai) - ACC TT</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <div style="overflow-x: auto;">
                                <table style="width: 100%;" id="table_atas">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Tanggal</th>
                                            <th>ID. Penagihan</th>
                                            <th>Nama Supplier</th>
                                            <th>Mata Uang</th>
                                            <th>Nilai Penagihan</th>
                                            <th>Lunas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox_all" value="option2">
                                    <label class="form-check-label" for="checkbox_all">Pilih Semua</label>
                                </div>
                                <br>
                                <div class="form-check mt-2 d-flex justify-content-start">
                                    <button type="button" class="btn" id="btn_refresh" style="width: 100px">Refresh</button>
                                    <button type="button" class="btn btn-primary" id="btn_ttditunai" style="width: 100px; margin-left: 5px;">TT di Tunai</button>
                                    <button type="button" class="btn btn-success" id="btn_proses" style="width: 100px; margin-left: 5px;">Proses</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Modal TT --}}
<div class="modal fade" id="TTModal" tabindex="-1" aria-labelledby="dataBKKModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="dataBKKModalLabel">TT di Tunai</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" id="close_modal">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group mt-3">
                    <label for="tt_modal">TT</label>
                    <input type="text" id="tt_modal" class="form-control">
                    {{-- <input type="text" id="terbilang" class="form-control" style="display: none">
                    <input type="text" id="id_matauang" class="form-control" style="display: none"> --}}
                </div>
                <div class="form-group mt-3">
                    <label for="supplier_modal">Supplier</label>
                    <input type="text" id="supplier_modal" class="form-control">
                </div>
                <div class="form-group mt-3">
                    <label for="nilai_tt">Nilai TT</label>
                    <input type="text" id="nilai_tt" class="form-control">
                </div>
            </div>
            <div class="modal-footer">
                <button id="btn_bayartunai" type="button" class="btn btn-success">Bayar Tunai</button>
                {{-- <button id="btn_prosesbkk" type="button" class="btn btn-success" style="display: none">Proses</button> --}}
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="btn_batal_modal">Batal</button>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/MaintenanceACCBayarTTKRR1.js') }}"></script>
@endsection
