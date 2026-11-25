@extends('layouts.appKencana')
@section('content')
@section('title', 'Maintenance Update Kurs BKM')
<style>
    .table-responsive.fixed-height tbody {
        background-color: white;
    }

    .underline {
        border-bottom: 1px solid black;
        /* Change the color as needed */
        margin-bottom: 10px;
        /* Space between labels and line */
    }

    .table-responsive.fixed-height {
        /* overflow-y: auto; */
        /* position: relative; */
        border-radius: 8px;
        border: 2px solid black;
        /* width: 100%; */
        /* table-layout: fixed; */
        background-color: white;
    }

    .no-wrap-header thead th {
        white-space: nowrap;
        background-color: lightgoldenrodyellow;
        padding: 0;
    }

    .table-responsive.fixed-height tbody td {
        background-color: white;
        padding: 4px 5px;
    }

    .fixed-width {
        white-space: nowrap;
        /* Prevent text wrapping */
        overflow: hidden;
        /* Hide overflow text */
        text-overflow: ellipsis;
        /* Show "..." when the text overflows */
        padding: 0;
    }

    table.dataTable {
        table-layout: fixed;
        /* Ensure table uses fixed layout */
        width: 100%;
        /* Ensure the table takes up the full width */
    }

    #table_list th,
    #table_list td {
        padding-top: 0;
        padding-bottom: 0;
        font-size: 16px;
    }

    @media print {
        .card {
            display: none;
        }

        .print {
            visibility: visible !important;
        }

        .modal {
            display: none !important;
        }

        .fade {
            opacity: 0 !important;
        }
    }
</style>


<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance Update Kurs BKM $$</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="{{ url('UpdateKursBKM') }}" id="formkoreksi">
                            {{ csrf_field() }}
                            <input type="hidden" name="_method" id="methodkoreksi">
                            <!-- Form fields go here -->
                            <div class="d-flex">
                                <div class="col-md-2">
                                    <label for="bulanTahun" style="margin-right: 10px;">Bulan dan Tahun</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" id="bulan" name="bulan" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-2">
                                    <input type="text" id="tahun" name="tahun" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-2">
                                    <button type="button" id="btnOK" class="btn btn-default">OK</button>

                                </div>
                            </div>

                            <br>    
                            <div>
                                <div class="table-responsive fixed-height">
                                    <table class="table table-bordered no-wrap-header" id="tableData">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-sm-3 d-flex">
                                <input type="hidden" id="idPelunasan" name="idPelunasan" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="idbkm" name="idbkm" class="form-control"
                                    style="width: 100%">
                            </div>

                            <br>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="kursRupiah" style="margin-right: 10px;">Kurs Rupiah</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="kursRupiah" name="kursRupiah" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-2">
                                        <button type="button" id="btnProses"
                                            class="btn btn-primary d-flex ml-auto"><strong>PROSES</strong></button>
                                    </div>
                                    <div class="col-3">
                                    </div>
                                    <div class="col-3">
                                        <button type="button" id="btnPilihBKM"
                                            class="btn btn-primary d-flex ml-auto">Pilih BKM</button>
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
<script src="{{ asset('js/Kencana/UpdateKursBKM.js') }}"></script>
@endsection
