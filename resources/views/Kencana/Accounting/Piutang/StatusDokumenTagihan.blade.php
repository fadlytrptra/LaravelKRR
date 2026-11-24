@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance Status Fatkur/Nota')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance Status Faktur/Nota</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="{{ url('/Kencana/StatusDokumenTagihanKencana') }}" id="formkoreksi">
                            {{ csrf_field() }}
                            <input type="hidden" name="_method" id="methodkoreksi">
                            <!-- Form fields go here -->
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="namaCustomerSelect" style="margin-right: 10px;">Customer</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="idCustomer" name="idCustomer" class="form-control"
                                        style="width: 100%">
                                        <input type="text" id="id_CDepan" name="id_CDepan" class="form-control"
                                        style="width: 100%; display: none">
                                        <input type="text" id="id_CBelakang" name="id_CBelakang" class="form-control"
                                        style="width: 100%; display: none">
                                </div>
                                <div class="col-md-5">
                                    <input type="text" id="nama_customer" name="nama_customer" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_customer">...</button>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div style="overflow-y: auto;">
                                    <table style="width: 100%;" id="table_atas">
                                        {{-- <colgroup>
                                            <col style="width: 25%;">
                                            <col style="width: 25%;">
                                            <col style="width: 25%;">
                                            <col style="width: 25%;">
                                        </colgroup> --}}
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Penagihan</th>
                                                <th>Tgl. Penagihan</th>
                                                <th>Id. Status</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <br>

                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="idPenagihan" style="margin-right: 10px;">No. Penagihan</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="idPenagihan" name="idPenagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-3" style="display: none">
                                    <input type="text" id="id_Penagihan" name="id_Penagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="statusLama" style="margin-right: 10px;">Status Lama</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="statusLama" name="statusLama" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-3">
                                    <label for="statusBaruSelect" style="margin-right: 10px;">Status Baru</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="nama_status" name="nama_status" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-default" id="btn_status">...</button>
                                </div>
                                <div class="col-md-3" style="display: none">
                                    <input type="text" id="idStatus" name="idStatus" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                            <br>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-2">
                                        <button type="button" class="btn btn-success" id="btn_proses"
                                            style="100px; text-align: center">Proses</button>
                                    </div>
                                    <div class="col-2">
                                        {{-- <input type="submit" id="btnKeluar" name="keluar" value="Keluar" class="btn btn-primary"> --}}
                                    </div>
                                </div>
                            </div>
                        </form>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Kencana/StatusDokumenTagihan.js') }}"></script>
@endsection
