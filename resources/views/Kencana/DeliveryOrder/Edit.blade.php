@extends('layouts.appKencana')

@section('title', 'Edit DO')

@section('content')

<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/Kencana/permohonan-do.css') }}" rel="stylesheet">

@php
    $data_encode = json_encode($data);
    $data_array = json_decode($data_encode, true);

    $do = $data_array[0] ?? [];

    /*
    |--------------------------------------------------------------------------
    | Normalisasi tanggal
    |--------------------------------------------------------------------------
    */
    $tanggalDO = $do['Tanggal'] ?? $do['tanggal'] ?? '';

    if (!empty($tanggalDO)) {
        $tanggalDO = substr($tanggalDO, 0, 10);
    }
@endphp

<div class="container-fluid">

    <div class="row justify-content-center">

        <div class="col-md-10 RDZMobilePaddingLR0">

            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @endif

            @if (Session::has('error'))
                <div class="alert alert-danger">
                    {{ Session::get('error') }}
                </div>
            @endif

            <div class="card">

                <div class="card-header">
                    Edit Delivery Order
                </div>

                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    <div class="permohonan-do-container">

                        {{-- ===================================================== --}}
                        {{-- FORM UPDATE --}}
                        {{-- ===================================================== --}}

                        <form
                            class="permohonan-do-form"
                            id="form_deliveryOrder"
                            method="POST"
                            action="{{ url('/Kencana/DeliveryOrder/' . ($do['IDDO'] ?? '') . '/up') }}"
                        >

                            @csrf

                            {{-- ================================================= --}}
                            {{-- HIDDEN DATA --}}
                            {{-- ================================================= --}}

                            <input
                                type="hidden"
                                name="id_pesanan"
                                id="id_pesanan_hidden"
                                value="{{ $do['IDPesanan'] ?? '' }}"
                            >

                            <input
                                type="hidden"
                                name="nomor_sp"
                                id="nomor_sp_edit"
                                value="{{ $do['IDSuratPesanan'] ?? '' }}"
                            >

                            <input
                                type="hidden"
                                name="id_pesanan_edit"
                                id="id_pesanan_edit"
                                value="{{ $do['IDPesanan'] ?? '' }}"
                            >

                            <input
                                type="hidden"
                                name="kelompok_utama"
                                id="kelompok_utama_edit"
                                value="{{ $do['IdKelompokUtama'] ?? '' }}"
                            >

                            <input
                                type="hidden"
                                name="kelompok"
                                id="kelompok_edit"
                                value="{{ $do['IdKelompok'] ?? '' }}"
                            >

                            <input
                                type="hidden"
                                name="sub_kelompok"
                                id="sub_kelompok_edit"
                                value="{{ $do['IdSubkelompok'] ?? '' }}"
                            >

                            {{-- ================================================= --}}
                            {{-- TANGGAL DO --}}
                            {{-- ================================================= --}}

                            <div class="permohonan-do-container01">

                                <span class="permohonan-do-text">
                                    Tgl DO
                                </span>

                                <input
                                    type="date"
                                    id="tgl_do"
                                    name="tgl_do"
                                    class="permohonan-do-textinput input"
                                    value="{{ $tanggalDO }}"
                                >

                            </div>

                            {{-- ================================================= --}}
                            {{-- CUSTOMER --}}
                            {{-- ================================================= --}}

                            <div class="permohonan-do-container02">

                                <span class="permohonan-do-text02">
                                    Customer
                                </span>

                                <select
                                    id="customer"
                                    name="customer"
                                    class="permohonan-do-select1 input"
                                    disabled
                                >

                                    <option disabled>
                                        -- Pilih Customer --
                                    </option>

                                    @foreach ($customer as $cust)

                                        @php
                                            $idCustRaw = $cust->IDCust ?? '';

                                            $posisiStrip = strpos($idCustRaw, '-');

                                            if ($posisiStrip !== false) {
                                                $IDCust = trim(
                                                    substr(
                                                        $idCustRaw,
                                                        $posisiStrip + 1
                                                    )
                                                );
                                            } else {
                                                $IDCust = trim($idCustRaw);
                                            }

                                            $namaCustomer =
                                                $cust->NAMACUST
                                                ?? $cust->NamaCust
                                                ?? '';
                                        @endphp

                                        <option
                                            value="{{ $IDCust }}"
                                            {{ ($do['IDCust'] ?? '') == $IDCust ? 'selected' : '' }}
                                        >
                                            {{ $namaCustomer }}
                                        </option>

                                    @endforeach

                                </select>

                                {{-- Karena select disabled tidak ikut POST --}}
                                <input
                                    type="hidden"
                                    name="customer"
                                    value="{{ $do['IDCust'] ?? '' }}"
                                >

                            </div>

                            {{-- ================================================= --}}
                            {{-- NOMOR SP --}}
                            {{-- ================================================= --}}

                            <div class="permohonan-do-container03">

                                <span class="permohonan-do-text03">
                                    No SP
                                </span>

                                <select
                                    id="nomor_sp"
                                    name="nomor_sp"
                                    class="permohonan-do-select2 input"
                                >

                                    <option
                                        value="{{ $do['IDSuratPesanan'] ?? '' }}"
                                        selected
                                    >
                                        {{ $do['IDSuratPesanan'] ?? '-- Pilih Nomor Surat Pesanan --' }}
                                    </option>

                                </select>

                            </div>

                            {{-- ================================================= --}}
                            {{-- ID PESANAN --}}
                            {{-- ================================================= --}}

                            <div class="permohonan-do-container04">

                                <span class="permohonan-do-text04">
                                    ID Pesanan
                                </span>

                                <select
                                    id="id_pesanan"
                                    name="id_pesanan"
                                    class="permohonan-do-select3 input"
                                >

                                    <option
                                        value="{{ $do['IDPesanan'] ?? '' }}"
                                        selected
                                    >
                                        {{ $do['IDPesanan'] ?? '-- Pilih ID Pesanan --' }}
                                    </option>

                                </select>

                            </div>

                            {{-- ================================================= --}}
                            {{-- KODE BARANG --}}
                            {{-- ================================================= --}}

                            <div class="permohonan-do-container05">

                                <span class="permohonan-do-text05">
                                    Kode Barang
                                </span>

                                <input
                                    type="text"
                                    id="kode_barang"
                                    name="kode_barang"
                                    placeholder="Kode Barang"
                                    value="{{ $do['IDBarang'] ?? '' }}"
                                    class="permohonan-do-input input"
                                    readonly
                                >

                                <span
                                    class="permohonan-do-text06"
                                    id="text_idTypeBarang"
                                    style="display:none"
                                >
                                    ID Type Barang
                                </span>

                                <input
                                    type="text"
                                    id="id_typeBarang"
                                    name="id_typeBarang"
                                    placeholder="ID Type Barang"
                                    value="{{ $do['IdType'] ?? '' }}"
                                    class="permohonan-do-textinput01 input"
                                    readonly
                                >

                            </div>

                            {{-- ================================================= --}}
                            {{-- URAIAN --}}
                            {{-- ================================================= --}}

                            <div class="permohonan-do-container06">

                                <span class="permohonan-do-text07">
                                    Uraian
                                </span>

                                <input
                                    type="text"
                                    id="uraian"
                                    name="uraian"
                                    placeholder="Uraian"
                                    value="{{ $do['NamaType'] ?? '' }}"
                                    class="permohonan-do-textarea input"
                                    readonly
                                >

                            </div>

                            {{-- ================================================= --}}
                            {{-- KELOMPOK UTAMA --}}
                            {{-- ================================================= --}}

                            <div class="permohonan-do-container07">

                                <span class="permohonan-do-text08">
                                    Kel. Utama
                                </span>

                                <select
                                    id="kelompok_utama"
                                    name="kelompok_utama"
                                    class="permohonan-do-select4 input"
                                >

                                    <option
                                        value="{{ $do['IdKelompokUtama'] ?? '' }}"
                                        selected
                                    >
                                        {{ $do['NamaKelompokUtama'] ?? $do['IdKelompokUtama'] ?? '-- Pilih Kelompok Utama --' }}
                                    </option>

                                </select>

                            </div>

                            {{-- ================================================= --}}
                            {{-- KELOMPOK --}}
                            {{-- ================================================= --}}

                            <div class="permohonan-do-container08">

                                <span class="permohonan-do-text09">
                                    Kelompok
                                </span>

                                <select
                                    id="kelompok"
                                    name="kelompok"
                                    class="permohonan-do-select5 input"
                                >

                                    <option
                                        value="{{ $do['IdKelompok'] ?? '' }}"
                                        selected
                                    >
                                        {{ $do['NamaKelompok'] ?? $do['IdKelompok'] ?? '-- Pilih Kelompok --' }}
                                    </option>

                                </select>

                            </div>

                            {{-- ================================================= --}}
                            {{-- SUB KELOMPOK --}}
                            {{-- ================================================= --}}

                            <div class="permohonan-do-container09">

                                <span class="permohonan-do-text10">
                                    Sub. Kel.
                                </span>

                                <select
                                    id="sub_kelompok"
                                    name="sub_kelompok"
                                    class="permohonan-do-select6 input"
                                >

                                    <option
                                        value="{{ $do['IdSubkelompok'] ?? '' }}"
                                        selected
                                    >
                                        {{ $do['NamaSubKelompok'] ?? $do['IdSubkelompok'] ?? '-- Pilih Sub Kelompok --' }}
                                    </option>

                                </select>

                            </div>

                            {{-- ================================================= --}}
                            {{-- QUANTITY --}}
                            {{-- ================================================= --}}

                            <div class="permohonan-do-container10">

                                <div class="permohonan-do-container11">

                                    {{-- Qty Primer --}}
                                    <div class="permohonan-do-container12">

                                        <span class="permohonan-do-text11">
                                            Qty Primer
                                        </span>

                                        <input
                                            type="text"
                                            id="qty_primer"
                                            name="qty_primer"
                                            placeholder="Qty Primer"
                                            class="permohonan-do-textinput02 input"
                                            value="{{ $do['QtyPrimer'] ?? 0 }}"
                                        >

                                    </div>

                                    {{-- Qty Sekunder --}}
                                    <div class="permohonan-do-container13">

                                        <span class="permohonan-do-text13">
                                            Qty Sekunder
                                        </span>

                                        <input
                                            type="text"
                                            id="qty_sekunder"
                                            name="qty_sekunder"
                                            placeholder="Qty Sekunder"
                                            class="permohonan-do-textinput04 input"
                                            value="{{ $do['QtySekunder'] ?? 0 }}"
                                        >

                                        <span class="permohonan-do-text14">
                                            Qty Order
                                        </span>

                                        <input
                                            type="text"
                                            id="qty_order"
                                            name="qty_order"
                                            placeholder="Qty Order"
                                            class="permohonan-do-textinput05 input"
                                            value="{{ $do['Qty'] ?? 0 }}"
                                        >

                                    </div>

                                    {{-- Qty Tritier --}}
                                    <div class="permohonan-do-container13">

                                        <span class="permohonan-do-text13">
                                            Qty Tritier
                                        </span>

                                        <input
                                            type="text"
                                            id="qty_tritier"
                                            name="qty_tritier"
                                            placeholder="Qty Tritier"
                                            class="input"
                                            style="margin-left:40px"
                                            value="{{ $do['QtyTritier'] ?? 0 }}"
                                        >

                                        <span class="permohonan-do-text14">
                                            Qty Kirim
                                        </span>

                                        <input
                                            type="text"
                                            id="qty_kirim"
                                            name="qty_kirim"
                                            placeholder="Qty Kirim"
                                            class="input"
                                            value="{{ $do['TerKirim'] ?? 0 }}"
                                        >

                                    </div>

                                    {{-- Max Kirim --}}
                                    <div class="permohonan-do-container14">

                                        <span class="permohonan-do-text15">
                                            Max Kirim
                                        </span>

                                        <input
                                            type="text"
                                            id="max_kirim"
                                            name="max_kirim"
                                            placeholder="Max Kirim"
                                            class="permohonan-do-textinput06 input"
                                            value="{{ $do['MaxKirimDO'] ?? 0 }}"
                                        >

                                    </div>

                                    {{-- Min Kirim --}}
                                    <div class="permohonan-do-container15">

                                        <span class="permohonan-do-text16">
                                            Min Kirim
                                        </span>

                                        <input
                                            type="text"
                                            id="min_kirim"
                                            name="min_kirim"
                                            placeholder="Min Kirim"
                                            class="permohonan-do-textinput07 input"
                                            value="{{ $do['MinKirimDO'] ?? 0 }}"
                                        >

                                    </div>

                                </div>

                                {{-- ================================================= --}}
                                {{-- SALDO GUDANG --}}
                                {{-- ================================================= --}}

                                <div class="permohonan-do-container16">

                                    {{-- Saldo Primer --}}
                                    <div class="permohonan-do-container17">

                                        <span class="permohonan-do-text17">
                                            Qty Primer
                                        </span>

                                        <input
                                            type="text"
                                            id="qty_primerGudang"
                                            name="qty_primerGudang"
                                            placeholder="Qty Primer Gudang"
                                            class="permohonan-do-textinput08 input"
                                            value="{{ $do['SaldoPrimer'] ?? 0 }}"
                                            readonly
                                        >

                                        <input
                                            type="text"
                                            id="satuan_primer"
                                            name="satuan_primer"
                                            placeholder="Satuan Primer"
                                            class="permohonan-do-textinput09 input"
                                            value="{{ $do['SatPrimer'] ?? '' }}"
                                            readonly
                                        >

                                    </div>

                                    {{-- Saldo Sekunder --}}
                                    <div class="permohonan-do-container18">

                                        <span class="permohonan-do-text18">
                                            Qty Sekunder
                                        </span>

                                        <input
                                            type="text"
                                            id="qty_sekunderGudang"
                                            name="qty_sekunderGudang"
                                            placeholder="Qty Sekunder Gudang"
                                            class="permohonan-do-textinput10 input"
                                            value="{{ $do['SaldoSekunder'] ?? 0 }}"
                                            readonly
                                        >

                                        <input
                                            type="text"
                                            id="satuan_sekunder"
                                            name="satuan_sekunder"
                                            placeholder="Satuan Sekunder"
                                            class="permohonan-do-textinput11 input"
                                            value="{{ $do['SatSekunder'] ?? '' }}"
                                            readonly
                                        >

                                    </div>

                                    {{-- Saldo Tritier --}}
                                    <div class="permohonan-do-container19">

                                        <span class="permohonan-do-text19">
                                            Qty Tritier
                                        </span>

                                        <input
                                            type="text"
                                            id="qty_tritierGudang"
                                            name="qty_tritierGudang"
                                            placeholder="Qty Tritier Gudang"
                                            class="permohonan-do-textinput12 input"
                                            value="{{ $do['SaldoTritier'] ?? 0 }}"
                                            readonly
                                        >

                                        <input
                                            type="text"
                                            id="satuan_tritier"
                                            name="satuan_tritier"
                                            placeholder="Satuan Tritier"
                                            class="permohonan-do-textinput13 input"
                                            value="{{ $do['SatTritier'] ?? '' }}"
                                            readonly
                                        >

                                    </div>

                                    {{-- Divisi --}}
                                    <div class="permohonan-do-container20">

                                        <span class="permohonan-do-text20">
                                            Divisi
                                        </span>

                                        <input
                                            type="text"
                                            id="divisi"
                                            name="divisi"
                                            placeholder="Divisi"
                                            class="permohonan-do-textinput14 input"
                                            value="{{ $do['Kd_div'] ?? $do['KdDiv'] ?? $do['Divisi'] ?? '' }}"
                                            readonly
                                        >

                                    </div>

                                </div>

                            </div>

                            {{-- ================================================= --}}
                            {{-- ALAMAT KIRIM --}}
                            {{-- ================================================= --}}

                            <div class="permohonan-do-container21">

                                <span class="permohonan-do-text21">
                                    <span>Alamat Kirim</span>
                                    <br>
                                    <br>
                                </span>

                                <textarea
                                    id="alamat_kirim"
                                    name="alamat_kirim"
                                    placeholder="Alamat Kirim"
                                    class="permohonan-do-textarea1 textarea"
                                >{{ $do['AlamatKirim'] ?? '' }}</textarea>

                            </div>

                            {{-- ================================================= --}}
                            {{-- KOTA KIRIM --}}
                            {{-- ================================================= --}}

                            <div class="permohonan-do-container22">

                                <span class="permohonan-do-text25">
                                    <span>Kota Kirim</span>
                                    <br>
                                    <br>
                                </span>

                                <input
                                    type="text"
                                    id="kota_kirim"
                                    name="kota_kirim"
                                    placeholder="Kota Kirim"
                                    class="permohonan-do-input1 input"
                                    value="{{ $do['KotaKirim'] ?? '' }}"
                                >

                            </div>

                            {{-- ================================================= --}}
                            {{-- EXPORT --}}
                            {{-- ================================================= --}}

                            <div
                                class="permohonan-do-container23"
                                style="display:none"
                            >

                                <div class="permohonan-do-container24">

                                    <span class="permohonan-do-text29">
                                        <span>Vessel</span>
                                        <br>
                                    </span>

                                    <input
                                        type="text"
                                        id="vessel"
                                        name="vessel"
                                        placeholder="Vessel"
                                        class="permohonan-do-input2 input"
                                        value="{{ $do['Vessel'] ?? '' }}"
                                    >

                                </div>

                                <div class="permohonan-do-container25">

                                    <span class="permohonan-do-text32">
                                        <span>ETD</span>
                                        <br>
                                    </span>

                                    <input
                                        type="date"
                                        id="etd"
                                        name="etd"
                                        class="permohonan-do-textinput15 input"
                                        value="{{ !empty($do['ETD']) ? substr($do['ETD'], 0, 10) : '' }}"
                                    >

                                </div>

                                <div class="permohonan-do-container26">

                                    <span class="permohonan-do-text35">
                                        <span>CC</span>
                                        <br>
                                    </span>

                                    <input
                                        type="date"
                                        id="cc"
                                        name="cc"
                                        class="permohonan-do-textinput16 input"
                                        value="{{ !empty($do['CC']) ? substr($do['CC'], 0, 10) : '' }}"
                                    >

                                </div>

                            </div>

                            {{-- ================================================= --}}
                            {{-- BUTTON --}}
                            {{-- ================================================= --}}

                            <div
                                class="permohonan-do-container27"
                                style="margin-top:20px"
                            >

                                <button
                                    type="submit"
                                    id="edit_button"
                                    class="permohonan-do-button2 button"
                                >
                                    <span>Koreksi</span>
                                </button>

                                <button
                                    type="button"
                                    id="hapus_button"
                                    class="permohonan-do-button3 button"
                                    onclick="window.close()"
                                >
                                    <span>Batal</span>
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

<script>
    /*
    |--------------------------------------------------------------------------
    | Data awal untuk JavaScript Edit
    |--------------------------------------------------------------------------
    */

    const deliveryOrderEditData = @json($do);

    console.log('Delivery Order Edit:', deliveryOrderEditData);

    /*
    |--------------------------------------------------------------------------
    | Set tanggal jika belum terisi oleh Blade
    |--------------------------------------------------------------------------
    */

    $(document).ready(function () {

        const tanggal =
            deliveryOrderEditData.Tanggal ??
            deliveryOrderEditData.tanggal ??
            '';

        if (tanggal && !$('#tgl_do').val()) {
            $('#tgl_do').val(tanggal.substring(0, 10));
        }

        /*
        |--------------------------------------------------------------------------
        | ID Pesanan
        |--------------------------------------------------------------------------
        */

        const idPesanan =
            deliveryOrderEditData.IDPesanan ?? '';

        $('#id_pesanan_hidden').val(idPesanan);
        $('#id_pesanan_edit').val(idPesanan);

        /*
        |--------------------------------------------------------------------------
        | Nomor SP
        |--------------------------------------------------------------------------
        */

        const nomorSP =
            deliveryOrderEditData.IDSuratPesanan ?? '';

        $('#nomor_sp_edit').val(nomorSP);

        /*
        |--------------------------------------------------------------------------
        | Kelompok
        |--------------------------------------------------------------------------
        */

        $('#kelompok_utama_edit').val(
            deliveryOrderEditData.IdKelompokUtama ?? ''
        );

        $('#kelompok_edit').val(
            deliveryOrderEditData.IdKelompok ?? ''
        );

        $('#sub_kelompok_edit').val(
            deliveryOrderEditData.IdSubkelompok ?? ''
        );

    });
</script>

<script
    type="text/javascript"
    src="{{ asset('js/Kencana/permohonan-do edit.js') }}"
></script>

@endsection