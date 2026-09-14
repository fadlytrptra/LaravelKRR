@extends('layouts.appKencana')

@section('title', 'Scan Barcode Kencana')

@section('content')

    <link href="{{ asset('css/ScanBarcodeKencana.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

    <script>
        let data_kodeBarang = @json($data_kodeBarang);
    </script>

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">

                {{-- ALERT --}}
                @if (Session::has('success'))
                    <div class="alert alert-info">
                        {!! Session::get('success') !!}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif

                <div class="card">

                    {{-- HEADER --}}
                    <div class="card-header">
                        Scan Barcode / Barcode Jual
                    </div>

                    <div class="acs-div-form2">

                        {{-- FORM SCAN --}}
                        <form
                            action="{{ url('ScanBarcodeKencana') }}"
                            method="POST"
                            id="form_scanBarcode"
                        >
                            @csrf

                            <div class="acs-div-form3">

                                <div class="acs-div-filter1">

                                    <label for="kode_barcode">
                                        Kode Barcode
                                    </label>

                                    <textarea
                                        class="input"
                                        name="kode_barcode"
                                        id="kode_barcode"
                                        cols="60"
                                        rows="1"
                                        placeholder="Indeks-Kode Barang"
                                        autocomplete="off"
                                        autofocus
                                    ></textarea>

                                    <div>
                                        Tekan Enter untuk Scan Barcode!
                                    </div>

                                </div>

                            </div>

                        </form>

                        <br>

                        {{-- FILTER TANGGAL --}}
                        <div class="acs-div-form4">

                            <div class="acs-div-filter3">

                                <input
                                    type="date"
                                    name="tanggal_input"
                                    id="tanggal_input"
                                    class="input"
                                >

                                <button
                                    type="button"
                                    class="btn btn-primary acs-btn-form"
                                    id="lihat_data"
                                >
                                    Lihat Data
                                </button>

                            </div>

                        </div>

                    </div>


                    {{-- ===================================================== --}}
                    {{-- DATA BARCODE --}}
                    {{-- ===================================================== --}}

                    <div
                        class="card-body RDZOverflow RDZMobilePaddingLR0 acs-table-barcode"
                        id="div_tableBarcodeData"
                    >

                        <legend>
                            Data Barcode
                        </legend>

                        <div class="acs-div-filter2">

                            <label for="jumlah" id="jumlah">
                                Jumlah data Barcode: {{ $jumlah }}
                            </label>

                        </div>

                        <table
                            id="table_dataBarcode"
                            class="table table-bordered table-striped"
                            style="width:100%"
                        >

                            <thead class="thead-dark">

                                <tr>
                                    <th>No</th>
                                    <th>Nama Barang</th>
                                    <th>Id Type</th>
                                    <th>Kode Barang</th>
                                    <th>Ball/Roll</th>
                                    <th>Lembar/Meter</th>
                                    <th>Kg</th>
                                    <th>Tgl Scan</th>
                                </tr>

                            </thead>

                            <tbody>
                            </tbody>

                        </table>

                    </div>


                    {{-- ===================================================== --}}
                    {{-- DETAIL DATA BARCODE --}}
                    {{-- ===================================================== --}}

                    <div
                        class="card-body RDZOverflow RDZMobilePaddingLR0 acs-table-barcode"
                        id="div_tableBarcodeDetail"
                        style="display: none;"
                    >

                        <legend>
                            Detail Data Barcode
                        </legend>

                        <table
                            id="table_detailBarcode"
                            class="table table-bordered table-striped"
                            style="width:100%"
                        >

                            <thead class="thead-dark">

                                <tr>
                                    <th>No</th>
                                    <th>No Indeks</th>
                                    <th>Kode Barang</th>
                                    <th>Nama Type</th>
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


    <script
        type="text/javascript"
        src="{{ asset('js/Sales/ScanBarcodeKencana.js') }}"
    ></script>

@endsection
