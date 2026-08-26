@extends('layouts.appKencana')

@section('title', 'Create SJ Kencana')

@section('content')

<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/Kencana/permohonan-sj.css') }}" rel="stylesheet">

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">

            <div class="card">

                <div class="card-header">
                    Surat Jalan Kencana
                </div>

                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    <div class="permohonan-sj-container">

                        <form
                            method="POST"
                            enctype="multipart/form-data"
                            id="form_suratJalan"
                            class="permohonan-sj-form"
                            action="{{ url('/Kencana/SuratJalan') }}"
                        >

                            @csrf

                            <div class="acs-div-form1">

                                <div class="acs-div-form1" id="div_suratJalan">

                                    {{-- ===================================================== --}}
                                    {{-- FORM UTAMA --}}
                                    {{-- ===================================================== --}}

                                    <div class="permohonan-sj-form">

                                        {{-- ===================== --}}
                                        {{-- KOLOM KIRI --}}
                                        {{-- ===================== --}}

                                        <div class="acs-div-form">

                                            {{-- ID KIRIM --}}
                                            <div class="acs-div-filter1">

                                                <label for="id_kirim">
                                                    Id Kirim
                                                </label>

                                                <div class="acs-div-filter2">

                                                    <input
                                                        type="text"
                                                        name="id_kirimText"
                                                        id="id_kirimText"
                                                        class="input"
                                                        value="{{ old('id_kirimText') }}"
                                                        readonly
                                                    >

                                                    <select
                                                        name="id_kirimSelect"
                                                        id="id_kirimSelect"
                                                        class="input"
                                                        style="display:none;"
                                                    >

                                                        <option value="" disabled>
                                                            --Pilih Id Kirim--
                                                        </option>

                                                    </select>

                                                    <button
                                                        type="button"
                                                        disabled
                                                        id="list_sjButton"
                                                        class="btn btn-info"
                                                        style="display:inline;"
                                                    >
                                                        ↺ Lihat Data
                                                    </button>

                                                </div>

                                            </div>


                                            {{-- JENIS PENGIRIMAN --}}
                                            <div class="acs-div-filter1">

                                                <label for="jenis_pengiriman">
                                                    Jenis Pengiriman
                                                </label>

                                                <select
                                                    name="jenis_pengiriman"
                                                    id="jenis_pengiriman"
                                                    class="input"
                                                >

                                                    <option
                                                        value=""
                                                        disabled
                                                        {{ old('jenis_pengiriman') ? '' : 'selected' }}
                                                    >
                                                        -- Pilih Jenis Pengiriman--
                                                    </option>

                                                    @foreach ($jenisPengiriman as $data)

                                                        <option
                                                            value="{{ $data->IDJnsSuratJalan }}"
                                                            {{ old('jenis_pengiriman') == $data->IDJnsSuratJalan ? 'selected' : '' }}
                                                        >
                                                            {{ $data->NamaJnsSuratJalan }}
                                                        </option>

                                                    @endforeach

                                                </select>

                                            </div>


                                            {{-- SURAT JALAN --}}
                                            <div class="acs-div-filter1">

                                                <label for="surat_jalan">
                                                    Surat Jalan
                                                </label>

                                                <input
                                                    type="text"
                                                    id="surat_jalan"
                                                    name="surat_jalan"
                                                    placeholder="Surat Jalan"
                                                    class="input"
                                                    value="{{ old('surat_jalan') }}"
                                                >

                                            </div>


                                            {{-- TANGGAL --}}
                                            <div class="acs-div-filter1">

                                                <label for="tanggal">
                                                    Tanggal
                                                </label>

                                                <input
                                                    type="date"
                                                    id="tanggal"
                                                    name="tanggal"
                                                    class="input"
                                                    value="{{ old('tanggal', date('Y-m-d')) }}"
                                                >

                                            </div>


                                            {{-- TANGGAL ACTUAL --}}
                                            <div class="acs-div-filter1">

                                                <label for="tanggal_actual">
                                                    Tanggal Actual
                                                </label>

                                                <input
                                                    type="date"
                                                    id="tanggal_actual"
                                                    name="tanggal_actual"
                                                    class="input"
                                                    value="{{ old('tanggal_actual', date('Y-m-d')) }}"
                                                >

                                            </div>

                                        </div>


                                        {{-- ===================== --}}
                                        {{-- KOLOM KANAN --}}
                                        {{-- ===================== --}}

                                        <div class="acs-div-form">

                                            {{-- KETERANGAN --}}
                                            <div class="acs-div-filter1">

                                                <label for="keterangan">
                                                    Keterangan
                                                </label>

                                                <textarea
                                                    placeholder="Keterangan"
                                                    name="keterangan"
                                                    id="keterangan"
                                                    class="textarea"
                                                >{{ old('keterangan') }}</textarea>

                                            </div>


                                            {{-- EXPEDITOR --}}
                                            <div class="acs-div-filter1">

                                                <label for="expeditor">
                                                    Expeditor
                                                </label>

                                                <select
                                                    name="expeditor"
                                                    id="expeditor"
                                                    class="input"
                                                >

                                                    <option
                                                        value=""
                                                        disabled
                                                        {{ old('expeditor') ? '' : 'selected' }}
                                                    >
                                                        -- Pilih Expeditor--
                                                    </option>

                                                    @foreach ($expeditor as $data)

                                                        <option
                                                            value="{{ $data->IDEXPEDITOR }}"
                                                            {{ old('expeditor') == $data->IDEXPEDITOR ? 'selected' : '' }}
                                                        >
                                                            {{ $data->NAMAEXPEDITOR }}
                                                        </option>

                                                    @endforeach

                                                </select>

                                            </div>


                                            {{-- CUSTOMER --}}
                                            <div class="acs-div-filter1">

                                                <label for="customer">
                                                    Customer
                                                </label>

                                                <select
                                                    name="customer"
                                                    id="customer"
                                                    class="input"
                                                >

                                                    <option
                                                        value=""
                                                        disabled
                                                        {{ old('customer') ? '' : 'selected' }}
                                                    >
                                                        -- Pilih Customer--
                                                    </option>

                                                    @foreach ($customer as $data)

                                                        @php
                                                            $IDCust = explode(' - ', $data->IdCust);
                                                            $customerId = $IDCust[0] ?? '';
                                                        @endphp

                                                        <option
                                                            value="{{ $customerId }}"
                                                            {{ old('customer') == $customerId ? 'selected' : '' }}
                                                        >
                                                            {{ $data->NamaCust }}
                                                        </option>

                                                    @endforeach

                                                </select>

                                            </div>


                                            {{-- TRUK NOPOL --}}
                                            <div class="acs-div-filter1">

                                                <label for="truk_nopol">
                                                    Truk Nopol
                                                </label>

                                                <input
                                                    type="text"
                                                    id="truk_nopol"
                                                    name="truk_nopol"
                                                    placeholder="Truk Nopol"
                                                    class="input"
                                                    value="{{ old('truk_nopol') }}"
                                                >

                                            </div>


                                            {{-- BIAYA --}}
                                            <div class="acs-div-filter1">

                                                <label for="biaya">
                                                    Biaya
                                                </label>

                                                <input
                                                    type="text"
                                                    id="biaya"
                                                    name="biaya"
                                                    placeholder="0"
                                                    class="input"
                                                    value="{{ old('biaya', '0') }}"
                                                    readonly
                                                >

                                            </div>

                                        </div>

                                    </div>


                                    {{-- ===================================================== --}}
                                    {{-- TABLE DETAIL --}}
                                    {{-- ===================================================== --}}

                                    <div class="permohonan-sj-container07">

                                        <table
                                            class="permohonan-sj-table"
                                            id="list_view"
                                            name="list_view"
                                        >

                                            <thead class="thead-light">

                                                <tr>

                                                    <th>No. DO</th>

                                                    <th>Uraian</th>

                                                    <th>No. Trans</th>

                                                    <th>Surat Pesanan</th>

                                                </tr>

                                            </thead>

                                            <tbody id="list_view_body">

                                                {{-- Data detail akan diisi oleh JavaScript --}}

                                            </tbody>

                                        </table>

                                    </div>


                                    {{-- ===================================================== --}}
                                    {{-- FORM TAMBAH ITEM --}}
                                    {{-- ===================================================== --}}

                                    <div class="permohonan-sj-container08">

                                        {{-- SURAT PESANAN --}}
                                        <div class="permohonan-sj-container09">

                                            <span>
                                                Surat Pesanan
                                            </span>

                                            <select
                                                class="permohonan-sj-select3 input"
                                                id="surat_pesanan"
                                                name="surat_pesanan"
                                            >

                                                <option
                                                    value=""
                                                    disabled
                                                    {{ old('surat_pesanan') ? '' : 'selected' }}
                                                >
                                                    -- Pilih Surat Pesanan --
                                                </option>

                                            </select>

                                        </div>


                                        {{-- NOMOR DO --}}
                                        <div class="permohonan-sj-container10">

                                            <span>
                                                Nomor DO
                                            </span>

                                            <select
                                                class="permohonan-sj-select4 input"
                                                id="nomor_do"
                                                name="nomor_do"
                                            >

                                                <option
                                                    value=""
                                                    disabled
                                                    {{ old('nomor_do') ? '' : 'selected' }}
                                                >
                                                    -- Pilih Nomor DO --
                                                </option>

                                            </select>

                                        </div>


                                        {{-- URAIAN --}}
                                        <div class="permohonan-sj-container11">

                                            <span>
                                                Uraian
                                            </span>

                                            <textarea
                                                id="uraian"
                                                name="uraian"
                                                placeholder="Uraian"
                                                class="permohonan-sj-textarea1 textarea"
                                            >{{ old('uraian') }}</textarea>

                                        </div>


                                        {{-- BUTTON --}}
                                        <div class="permohonan-sj-container12">

                                            <button
                                                id="add_item"
                                                name="add_item"
                                                type="button"
                                                class="permohonan-sj-button button"
                                            >
                                                Add Item
                                            </button>

                                            <button
                                                id="remove_item"
                                                name="remove_item"
                                                type="button"
                                                class="permohonan-sj-button1 button"
                                            >
                                                Remove Item
                                            </button>

                                        </div>

                                    </div>

                                </div>


                                {{-- ===================================================== --}}
                                {{-- BUTTON BAWAH --}}
                                {{-- ===================================================== --}}

                                <div class="permohonan-sj-container13">

                                    <button
                                        id="isi_button"
                                        type="submit"
                                        class="permohonan-sj-button2 button"
                                    >
                                        <span>Isi</span>
                                    </button>

                                    <button
                                        id="edit_button"
                                        type="button"
                                        class="permohonan-sj-button3 button"
                                    >
                                        <span>Koreksi</span>
                                    </button>

                                    <button
                                        id="hapus_button"
                                        type="button"
                                        class="permohonan-sj-button4 button"
                                    >
                                        <span>Hapus</span>
                                    </button>

                                </div>

                            </div>

                            <div id="old_detail_container">

                                @if (old('barang0'))

                                    @foreach (old('barang0') as $index => $idDO)

                                        <input
                                            type="hidden"
                                            name="barang0[]"
                                            value="{{ $idDO }}"
                                        >

                                        <input
                                            type="hidden"
                                            name="barang1[]"
                                            value="{{ old('barang1.' . $index) }}"
                                        >

                                        <input
                                            type="hidden"
                                            name="barang2[]"
                                            value="{{ old('barang2.' . $index) }}"
                                        >

                                        <input
                                            type="hidden"
                                            name="barang3[]"
                                            value="{{ old('barang3.' . $index) }}"
                                        >

                                    @endforeach

                                @endif

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@if (session('validation_error'))

<script>
document.addEventListener('DOMContentLoaded', function () {
    Swal.fire({
        icon: 'error',
        title: 'Data Tidak Dapat Disimpan',
        text: @json(session('validation_error')),
        confirmButtonText: 'OK',
        allowOutsideClick: false
    });
});
</script>

@endif

@if (session('success'))

<script>
document.addEventListener('DOMContentLoaded', function () {
    Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: @json(session('success')),
        confirmButtonText: 'OK',
        allowOutsideClick: false
    });
});
</script>

@endif
@if (session('error'))

<script>
document.addEventListener('DOMContentLoaded', function () {
    Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: @json(session('error')),
        confirmButtonText: 'OK',
        allowOutsideClick: false
    });
});

</script>

@endif
@if (old('barang0'))

<script>
    window.oldBarang0 = @json(old('barang0', []));
    window.oldBarang1 = @json(old('barang1', []));
    window.oldBarang2 = @json(old('barang2', []));
    window.oldBarang3 = @json(old('barang3', []));

    console.log('Old Barang0:', window.oldBarang0);
    console.log('Old Barang1:', window.oldBarang1);
    console.log('Old Barang2:', window.oldBarang2);
    console.log('Old Barang3:', window.oldBarang3);
</script>

@endif

<script
    type="text/javascript"
    src="{{ asset('js/Kencana/permohonan-s-j.js') }}"
></script>

@endsection
