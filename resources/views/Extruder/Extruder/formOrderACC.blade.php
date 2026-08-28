@extends('layouts.appExtruder')

@section('title')
    ACC Order
@endsection

@section('content')
    <div class="extruder_root">
        <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">

        <div id="order_acc" class="form" data-aos="fade-up">
            <table id="table_order" class="hover cell-border" tabindex="0">
                <thead>
                    <tr>
                        <th>Identifikasi Order</th>
                        <th>Id Order</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>

            <div class="mt-4"></div>

            <table id="table_detail_order" class="hover cell-border">
                <thead>
                    <tr>
                        <th>Nama Type</th>
                        <th>Qty Primer</th>
                        <th>Sat Primer</th>
                        <th>Qty Sekunder</th>
                        <th>Sat Sekunder</th>
                        <th>Qty Tritier</th>
                        <th>Sat Tritier</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>

            <div class="float-end mt-3 mb-3">
                <button type="button" id="btn_proses" class="btn btn-success">Proses</button>
                <button type="button" id="btn_keluar" class="btn btn-danger">Keluar</button>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/Extruder/ExtruderNet/orderACC.js') }}"></script>
@endsection
