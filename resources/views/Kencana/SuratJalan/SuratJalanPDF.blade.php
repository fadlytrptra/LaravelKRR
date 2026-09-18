<style>
    h2,
    h3,
    h4 {
        margin: 0;
        padding: 0;
        text-align: center;
    }

    h5,
    p {
        margin: 0;
        padding: 0;
    }

    .signature_imgCanvas {
        max-height: 80px;
    }
</style>

@php
    $cleanNull = function ($value) {
        if (
            $value === null ||
            trim((string) $value) === '' ||
            strtoupper(trim((string) $value)) === 'NULL'
        ) {
            return '';
        }

        return trim((string) $value);
    };

    // CUSTOMER
    $namaCust = $cleanNull($items->NamaCust ?? null);
    $alamatKirim = $cleanNull($items->AlamatKirim ?? null);

    // SJ
    $noSJ = $cleanNull($items->IDPengiriman ?? null);
    $trukNopol = $cleanNull($items->TrukNopol ?? null);

    // TANGGAL
    $tanggalActual = $items->TanggalActual ?? null;

    // SP
    $idSP = $cleanNull($items->IdSP ?? null);

    // BARANG
    $namaTipeBarang = $cleanNull($items->NamaTipeBarang ?? null);

    // Uraian berasal dari DO.Uraian
    $namaBarang = $cleanNull($items->NamaBarang ?? null);

    // SATUAN
    $satuan = $cleanNull($items->Satuan ?? null);

    // JUMLAH DARI T_DeliveryOrder.QtyTritier
    $jumlah = is_numeric($items->QtyTritier ?? null)
        ? (float) $items->QtyTritier
        : 0;

    // ALAMAT PENGIRIMAN
    $alamatPengiriman = $cleanNull(
        $items->AlamatPengiriman ?? null
    );

    $kotaKirim = $cleanNull(
        $items->KotaKirim ?? null
    );

    // FORMAT ANGKA
    $formatQty = function ($value) {
        if ($value === null || $value === '') {
            return '';
        }

        if (!is_numeric($value)) {
            return '';
        }

        $number = (float) $value;

        if ($number == floor($number)) {
            return number_format(
                $number,
                0,
                ',',
                '.'
            );
        }

        return rtrim(
            rtrim(
                number_format(
                    $number,
                    2,
                    ',',
                    '.'
                ),
                '0'
            ),
            ','
        );
    };
@endphp


<div
    style="
        min-width:16cm;
        min-height:20.5cm;
        border:1px solid black;
        padding:10px;
        box-sizing:border-box;
    "
    contenteditable="true"
>

    {{-- =========================================================
         HEADER PERUSAHAAN
    ========================================================== --}}

    <h2>PT. KENCANA RAJASA RAYA</h2>

    <h4>
        JL RAYA TROPODO No. 1 WARU - SIDOARJO - INDONESIA
    </h4>

    <h4>
        TELP (031) 8669595, 8669966
    </h4>

    <h4>
        FAX (031) 8669989
    </h4>

    <h3>
        SURAT PENGANTAR PENGIRIMAN BARANG
    </h3>


    {{-- =========================================================
         CUSTOMER DAN INFORMASI SJ
    ========================================================== --}}

    <table
        style="width:100%; margin-top:10px;"
        cellpadding="0"
        cellspacing="0"
    >
        <tr>

            {{-- =================================================
                 CUSTOMER
            ================================================== --}}

            <td
                style="
                    width:50%;
                    vertical-align:top;
                    border:1px solid black;
                    padding:8px;
                "
            >

                <h5 style="margin:0;">
                    Kepada Yth.
                </h5>

                <h5 style="margin:0;">
                    {{ $namaCust }}
                </h5>

                @if ($alamatKirim !== '')
                    <p style="margin:0;">
                        {{ $alamatKirim }}
                    </p>
                @endif

            </td>


            {{-- =================================================
                 INFORMASI SURAT JALAN
            ================================================== --}}

            <td
                style="
                    width:50%;
                    vertical-align:top;
                    padding-left:15px;
                "
            >

                <table>

                    {{-- No SJ --}}
                    <tr>
                        <td>No. SJ</td>
                        <td>:</td>
                        <td>
                            {{ $noSJ }}
                        </td>
                    </tr>


                    {{-- Tanggal --}}
                    <tr>
                        <td>Tanggal</td>
                        <td>:</td>
                        <td>
                            @if (!empty($tanggalActual))
                                {{ \Carbon\Carbon::parse($tanggalActual)->locale('id')->translatedFormat('d-F-Y') }}
                            @endif
                        </td>
                    </tr>


                    {{-- Truk --}}
                    <tr>
                        <td>Truk No.</td>
                        <td>:</td>
                        <td>
                            {{ $trukNopol }}
                        </td>
                    </tr>


                    {{-- No SP --}}
                    <tr>
                        <td>No. SP</td>
                        <td>:</td>
                        <td>
                            {{ $idSP }}
                        </td>
                    </tr>

                </table>

            </td>

        </tr>
    </table>


    {{-- =========================================================
         TABEL BARANG
    ========================================================== --}}

    <table
        style="
            border:1px solid black;
            width:100%;
            border-collapse:collapse;
            margin-top:10px;
        "
    >
        <tr>
            <th style="
                border:1px solid black;
                padding:8px;
            ">
                Uraian
            </th>

            <th style="
                border:1px solid black;
                padding:8px;
            ">
                Satuan
            </th>

            <th style="
                border:1px solid black;
                padding:8px;
            ">
                Jumlah
            </th>
        </tr>

        <tr>

            {{-- URAIAN --}}
            <td
                style="
                    border:1px solid black;
                    padding:8px;
                    vertical-align:top;
                "
            >

                {{-- Nama Type --}}
                @if ($namaTipeBarang !== '')
                    {{ $namaTipeBarang }}
                @endif

                {{-- Uraian dari T_DeliveryOrder.Uraian --}}
                @if ($namaBarang !== '')

                    @if ($namaTipeBarang !== '')
                        <br>
                    @endif

                    {{ $namaBarang }}

                @endif

            </td>


            {{-- SATUAN --}}
            <td
                style="
                    border:1px solid black;
                    padding:8px;
                    vertical-align:top;
                    text-align:center;
                "
            >
                @if ($satuan !== '')
                    {{ $satuan }}
                @endif
            </td>


            {{-- JUMLAH --}}
            <td
                style="
                    border:1px solid black;
                    padding:8px;
                    vertical-align:top;
                    text-align:center;
                "
            >
                @if ($jumlah > 0)
                    {{ $formatQty($jumlah) }}
                @endif
            </td>

        </tr>
    </table>


    {{-- =========================================================
         SYARAT PENYERAHAN
    ========================================================== --}}

    <div
        style="
            width:98%;
            border:1px solid black;
            margin-top:10px;
            padding:0.85%;
        "
    >

        <h5>
            Syarat Penyerahan:
        </h5>

        @if ($alamatPengiriman !== '')

            <p>
                Dikirim ke: {{ $alamatPengiriman }}

                @if ($kotaKirim !== '')
                    , {{ $kotaKirim }}
                @endif
            </p>

        @elseif ($alamatKirim !== '')

            <p>
                Dikirim ke: {{ $alamatKirim }}
            </p>

        @endif

    </div>


    {{-- =========================================================
         TANDA TANGAN
    ========================================================== --}}

    <table
        style="
            width:100%;
            margin-top:10px;
        "
        cellpadding="0"
        cellspacing="0"
    >

        <tr>

            <td
                style="
                    width:55%;
                    vertical-align:top;
                    padding-left:10px;
                "
            >

                <table
                    style="
                        width:100%;
                        border-bottom:1px solid black;
                        border-collapse:collapse;
                    "
                >

                    {{-- HEADER TANDA TANGAN --}}
                    <tr>

                        <td
                            style="
                                width:30%;
                                text-align:center;
                                font-size:14px;
                                font-weight:bold;
                                vertical-align:top;
                                padding-top:28px;
                            "
                        >
                            PENGIRIM
                        </td>

                        <td
                            style="
                                width:70%;
                                text-align:center;
                                font-size:14px;
                                font-weight:bold;
                                padding-top:10px;
                            "
                        >
                            TANDA TERIMA
                            <br>
                            BARANG TERSEBUT TELAH KAMI TERIMA
                            DALAM KEADAAN CUKUP DAN BAIK
                        </td>

                    </tr>


                    {{-- AREA TANDA TANGAN --}}
                    <tr>

                        <td
                            style="
                                height:120px;
                                text-align:center;
                                vertical-align:bottom;
                                padding-top:15px;
                            "
                        >

                            @if (!empty($items->GbrAccMng ?? null))

                                <img
                                    src="data:image/png;base64,{{ $items->GbrAccMng }}"
                                    style="max-height:110px;"
                                >

                            @endif

                        </td>

                        <td
                            style="
                                height:120px;
                                text-align:center;
                                vertical-align:bottom;
                                padding-top:15px;
                            "
                        >
                        </td>

                    </tr>


                    {{-- NAMA --}}
                    <tr>

                        <td
                            style="
                                text-align:center;
                                font-size:15px;
                                font-weight:normal;
                                padding-bottom:15px;
                            "
                        >
                            SUNYATA ICHWAN
                        </td>

                        <td
                            style="
                                text-align:center;
                                font-size:15px;
                                font-weight:normal;
                                padding-bottom:15px;
                            "
                        >
                            {{ $namaCust !== '' ? $namaCust : '-' }}
                        </td>

                    </tr>

                </table>


                {{-- =================================================
                     NOTE
                ================================================== --}}

                <table
                    style="
                        width:100%;
                        font-size:12px;
                        margin-top:50px;
                    "
                >

                    <tr>
                        <td>
                            <strong>Note :</strong>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Apabila barang belum terbayar maka barang
                            yang terkirim merupakan barang titipan
                        </td>
                    </tr>

                </table>

            </td>

        </tr>

    </table>

</div>