@extends('layouts.appKencana')

@section('title', 'Cetak Pembelian')

@section('content')

<div class="container-fluid">

    <div class="card shadow-sm">

        {{-- HEADER --}}
        <div class="card-header">
            <h5 class="mb-0">
                Cetak Pembelian
            </h5>
        </div>


        {{-- FILTER --}}
        <div class="card-body">

            <div class="row g-2 align-items-end">

                {{-- TANGGAL MULAI --}}
                <div class="col-md-3">

                    <label
                        for="tanggalMulai"
                        class="form-label"
                    >
                        Tanggal Mulai
                    </label>

                    <input
                        type="date"
                        id="tanggalMulai"
                        class="form-control"
                    >

                </div>


                {{-- TANGGAL SELESAI --}}
                <div class="col-md-3">

                    <label
                        for="tanggalSelesai"
                        class="form-label"
                    >
                        Tanggal Selesai
                    </label>

                    <input
                        type="date"
                        id="tanggalSelesai"
                        class="form-control"
                    >

                </div>


                {{-- CARI --}}
                <div class="col-md-2">

                    <button
                        type="button"
                        id="btnCari"
                        class="btn btn-primary w-100"
                    >
                        Cari
                    </button>

                </div>

            </div>

        </div>


        {{-- TABLE --}}
        <div class="card-body pt-0">

            <div class="table-responsive">

                <table
                    id="tableCetakPembelian"
                    class="table table-bordered table-striped table-hover align-middle w-100"
                >

                    <thead class="table-light">

                        <tr>

                            <th class="text-center" style="width: 50px;">
                                No
                            </th>
                            <th>
                                No SPPB
                            </th>
                            <th>
                                Tgl SPPB
                            </th>
                            <th>
                                Divisi
                            </th>
                            <th>
                                Supplier
                            </th>
                            <th>
                                Direktur
                            </th>
                            <th>
                                Tgl ACC Direktur
                            </th>
                            <th class="text-center" style="width: 170px;">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<script src="{{ asset('js/Kencana/CetakPembelian.js') }}"></script>

@endsection