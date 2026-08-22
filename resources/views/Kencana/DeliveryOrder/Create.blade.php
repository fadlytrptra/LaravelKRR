@extends('layouts.appKencana')

@section('title', 'Create DO Kencana')

@section('content')

<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/Kencana/permohonan-do.css') }}" rel="stylesheet">

<div class="container-fluid">
    <div class="row justify-content-center">

        <div class="col-md-10 RDZMobilePaddingLR0">

            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @endif

            <div class="card">

                <div class="card-header">
                    Delivery Order
                </div>

                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    <div class="permohonan-do-container">

                        <form
                            class="permohonan-do-form"
                            id="form_deliveryOrder"
                            method="POST"
                            action="{{ url('/Kencana/DeliveryOrder') }}"
                        >

                            @csrf

                            <input
                                type="hidden"
                                name="id_pesanan"
                                id="id_pesanan_hidden"
                                value=""
                            >

                            <div id="div_deliveryOrder" class="permohonan-do-form">

                                <div class="acs-div-filter">

                                    <label for="tgl_do">
                                        Tgl DO
                                    </label>

                                    <div class="acs-div-filter2" style="gap: 12px">

                                        <input
                                            type="date"
                                            name="tgl_do"
                                            id="tgl_do"
                                            class="input"
                                        >

                                        <button
                                            type="button"
                                            id="listDO_button"
                                            class="btn btn-info"
                                            style="display: inline;"
                                            disabled
                                        >
                                            ↺ List All DO
                                        </button>

                                        <div class="acs-div-filter1">

                                            <span id="nomor_doSpan">
                                                Nomor DO:
                                            </span>

                                            <input
                                                type="text"
                                                name="nomor_doText"
                                                id="nomor_doText"
                                                class="input"
                                            >

                                            <select
                                                name="nomor_doSelect"
                                                id="nomor_doSelect"
                                                style="display: none"
                                                class="input"
                                            >
                                                <option disabled selected>
                                                    -- Pilih Nomor Delivery Order --
                                                </option>
                                            </select>

                                        </div>

                                    </div>

                                </div>

                                <div class="acs-form">

                                    <div class="acs-form1">

                                        <div class="acs-div-filter1">

                                            <label for="customer">
                                                Customer
                                            </label>

                                            <select
                                                name="customer"
                                                id="customer"
                                                class="input"
                                            >
                                                <option selected disabled>
                                                    -- Pilih Customer --
                                                </option>

                                                @foreach ($customer as $cust)

                                                    @php
                                                        $IDCust = trim(
                                                            substr(
                                                                $cust->IDCust,
                                                                strpos($cust->IDCust, '-') + 1
                                                            )
                                                        );
                                                    @endphp

                                                    <option value="{{ $IDCust }}">
                                                        {{ $cust->NAMACUST }}
                                                    </option>

                                                @endforeach

                                            </select>

                                        </div>

                                        <div class="acs-div-filter">

                                            <label for="alamat_kirimCustomer">
                                                Alamat Kirim
                                            </label>

                                            <textarea
                                                name="alamat_kirimCustomer"
                                                id="alamat_kirimCustomer"
                                                cols="10"
                                                rows="1"
                                                class="input"
                                                readonly
                                            ></textarea>

                                        </div>

                                        <div class="acs-div-filter">

                                            <label for="surat_pesanan">
                                                Surat Pesanan
                                            </label>

                                            <div class="acs-div-filter2">

                                                <input
                                                    type="text"
                                                    name="nomor_spText"
                                                    id="nomor_spText"
                                                    class="input"
                                                >

                                                <div
                                                    class="acs-div-filter1"
                                                    id="surat_pesananDiv"
                                                    style="display: none"
                                                >

                                                    <select
                                                        name="nomor_spSelect"
                                                        id="nomor_spSelect"
                                                        style="display: none"
                                                        class="input"
                                                    >
                                                        <option selected disabled>
                                                            -- Pilih Surat Pesanan --
                                                        </option>
                                                    </select>

                                                </div>

                                                <button
                                                    type="button"
                                                    id="listSP_button"
                                                    class="btn btn-info"
                                                >
                                                    ↺ List All SP
                                                </button>

                                            </div>

                                        </div>

                                        <div class="acs-div-filter">

                                            <label for="id_pesanan">
                                                ID Pesanan
                                            </label>

                                            <div class="acs-div-filter2">

                                                <input
                                                    type="text"
                                                    name="id_pesananText"
                                                    id="id_pesananText"
                                                    class="input"
                                                >

                                                <div
                                                    class="acs-div-filter1"
                                                    id="id_pesananDiv"
                                                    style="display: none"
                                                >

                                                    <select
                                                        name="id_pesananSelect"
                                                        id="id_pesananSelect"
                                                        style="display: none"
                                                        class="input"
                                                    >
                                                        <option selected disabled>
                                                            -- Pilih ID Pesanan --
                                                        </option>
                                                    </select>

                                                </div>

                                                <button
                                                    type="button"
                                                    id="listBarang_button"
                                                    class="btn btn-info"
                                                >
                                                    ↺ List All Barang
                                                </button>

                                            </div>

                                        </div>

                                        <div class="acs-div-filter1">

                                            <label for="kode_barang">
                                                Kode Barang
                                            </label>

                                            <div class="acs-div-filter2" style="gap: 12px">

                                                <input
                                                    type="text"
                                                    name="kode_barang"
                                                    id="kode_barang"
                                                    placeholder="Kode Barang"
                                                    class="input"
                                                    readonly
                                                >

                                                <div class="acs-div-filter1">

                                                    <span
                                                        id="text_idTypeBarang"
                                                        style="display: none"
                                                    >
                                                        ID Type Barang
                                                    </span>

                                                    <input
                                                        type="text"
                                                        name="id_typeBarang"
                                                        id="id_typeBarang"
                                                        class="input"
                                                        style="display: none"
                                                        readonly
                                                    >

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="acs-form1">

                                        <div class="acs-div-filter3">

                                            <label for="uraian">
                                                Uraian
                                            </label>

                                            <input
                                                type="text"
                                                name="uraian"
                                                id="uraian"
                                                placeholder="Uraian"
                                                class="input"
                                            >

                                        </div>

                                        <div class="acs-div-filter1">

                                            <label for="kelompok_utama">
                                                Kelompok Utama
                                            </label>

                                            <select
                                                name="kelompok_utama"
                                                id="kelompok_utama"
                                                class="input"
                                                style="width: 100%"
                                            >
                                                <option disabled selected>
                                                    --Pilih Kelompok Utama--
                                                </option>
                                            </select>

                                        </div>

                                        <div class="acs-div-filter1">

                                            <label for="kelompok">
                                                Kelompok
                                            </label>

                                            <select
                                                name="kelompok"
                                                id="kelompok"
                                                class="input"
                                            >
                                                <option disabled selected>
                                                    --Pilih Kelompok--
                                                </option>
                                            </select>

                                        </div>

                                        <div class="acs-div-filter1">

                                            <label for="sub_kelompok">
                                                Sub Kelompok
                                            </label>

                                            <select
                                                name="sub_kelompok"
                                                id="sub_kelompok"
                                                class="input"
                                            >
                                                <option disabled selected>
                                                    --Pilih Sub Kelompok--
                                                </option>
                                            </select>

                                        </div>

                                    </div>

                                </div>

                                <div style="display:flex; flex-direction:row; gap:100px">

                                    <div>

                                        <div class="acs-div-filter1">
                                            <label for="qty_primer">
                                                Qty Primer
                                            </label>

                                            <input
                                                type="text"
                                                name="qty_primer"
                                                id="qty_primer"
                                                placeholder="Qty Primer"
                                                class="input"
                                            >
                                        </div>

                                        <div class="acs-div-filter1">
                                            <label for="qty_sekunder">
                                                Qty Sekunder
                                            </label>

                                            <input
                                                type="text"
                                                name="qty_sekunder"
                                                id="qty_sekunder"
                                                placeholder="Qty Sekunder"
                                                class="input"
                                            >
                                        </div>

                                        <div class="acs-div-filter1">
                                            <label for="qty_tritier">
                                                Qty Tritier
                                            </label>

                                            <input
                                                type="text"
                                                name="qty_tritier"
                                                id="qty_tritier"
                                                placeholder="Qty Tritier"
                                                class="input"
                                            >
                                        </div>

                                        <div class="acs-div-filter1">
                                            <label for="max_kirim">
                                                Max DO
                                            </label>

                                            <input
                                                type="text"
                                                name="max_kirim"
                                                id="max_kirim"
                                                placeholder="Max DO"
                                                class="input"
                                            >
                                        </div>

                                        <div class="acs-div-filter1">
                                            <label for="min_kirim">
                                                Min DO
                                            </label>

                                            <input
                                                type="text"
                                                name="min_kirim"
                                                id="min_kirim"
                                                placeholder="Min DO"
                                                class="input"
                                            >
                                        </div>

                                    </div>

                                    {{-- <div>
                                        <div class="acs-div-filter1">
                                            <label for="qty_order">
                                                Qty Order
                                            </label>

                                            <input
                                                type="text"
                                                name="qty_order"
                                                id="qty_order"
                                                placeholder="Qty Order"
                                                class="input"
                                                value="0"
                                            >
                                        </div>

                                        <div class="acs-div-filter1">
                                            <label for="qty_kirim">
                                                Qty Kirim
                                            </label>

                                            <input
                                                type="text"
                                                name="qty_kirim"
                                                id="qty_kirim"
                                                placeholder="Qty Kirim"
                                                class="input"
                                                value="0"
                                            >
                                        </div>
                                    </div> --}}

                                    <div>

                                        <div class="acs-div-filter1">

                                            <label>
                                                Qty Primer
                                            </label>

                                            <div class="acs-div-filter4">

                                                <input
                                                    type="text"
                                                    name="qty_primerGudang"
                                                    id="qty_primerGudang"
                                                    placeholder="Qty Primer Gudang"
                                                    class="input"
                                                    readonly
                                                >

                                                <input
                                                    type="text"
                                                    name="satuan_primer"
                                                    id="satuan_primer"
                                                    placeholder="Satuan Primer"
                                                    class="input"
                                                    style="width:140px"
                                                >

                                            </div>

                                        </div>

                                        <div class="acs-div-filter1">

                                            <label>
                                                Qty Sekunder
                                            </label>

                                            <div class="acs-div-filter4">

                                                <input
                                                    type="text"
                                                    name="qty_sekunderGudang"
                                                    id="qty_sekunderGudang"
                                                    placeholder="Qty Sekunder Gudang"
                                                    class="input"
                                                    readonly
                                                >

                                                <input
                                                    type="text"
                                                    name="satuan_sekunder"
                                                    id="satuan_sekunder"
                                                    placeholder="Satuan Sekunder"
                                                    class="input"
                                                    style="width:140px"
                                                >

                                            </div>

                                        </div>

                                        <div class="acs-div-filter1">

                                            <label>
                                                Qty Tritier
                                            </label>

                                            <div class="acs-div-filter4">

                                                <input
                                                    type="text"
                                                    name="qty_tritierGudang"
                                                    id="qty_tritierGudang"
                                                    placeholder="Qty Tritier Gudang"
                                                    class="input"
                                                    readonly
                                                >

                                                <input
                                                    type="text"
                                                    name="satuan_tritier"
                                                    id="satuan_tritier"
                                                    placeholder="Satuan Tritier"
                                                    class="input"
                                                    style="width:140px"
                                                >

                                            </div>

                                        </div>

                                        <div class="acs-div-filter1">

                                            <label for="divisi">
                                                Divisi
                                            </label>

                                            <input
                                                type="text"
                                                name="divisi"
                                                id="divisi"
                                                placeholder="Divisi"
                                                class="input"
                                                readonly
                                            >

                                        </div>

                                    </div>

                                </div>

                                <div>

                                    <div class="acs-div-filter3">

                                        <label for="alamat_kirim">
                                            Keterangan
                                        </label>

                                        <textarea
                                            name="alamat_kirim"
                                            id="alamat_kirim"
                                            placeholder="Keterangan"
                                            class="input"
                                        ></textarea>

                                    </div>

                                    <div
                                        class="acs-div-filter1"
                                        style="display:none"
                                    >

                                        <label for="kota_kirim">
                                            Kota Kirim
                                        </label>

                                        <input
                                            type="text"
                                            name="kota_kirim"
                                            id="kota_kirim"
                                            placeholder="Kota Kirim"
                                            class="input"
                                        >

                                    </div>

                                </div>

                            </div>

                            <div class="permohonan-do-container27">

                                <button
                                    type="submit"
                                    id="isi_button"
                                    class="permohonan-do-button1 button"
                                >
                                    <span>Isi</span>
                                </button>

                                <button
                                    type="button"
                                    id="edit_button"
                                    class="permohonan-do-button2 button"
                                >
                                    <span>Koreksi</span>
                                </button>

                                <button
                                    type="button"
                                    id="hapus_button"
                                    class="permohonan-do-button3 button"
                                >
                                    <span>Hapus</span>
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    </div>
</div>

<script
    type="text/javascript"
    src="{{ asset('js/Kencana/permohonan-do.js') }}"
></script>

@endsection
