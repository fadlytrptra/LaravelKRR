<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">

    <style>
        @page {
            size: A4;
            margin: 8mm 5mm 0mm 5mm;
        }

        body {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 11px;
            color: #000;
            padding: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td {
            padding: 2px 4px;
            vertical-align: top;
        }

        /* .box {
            border: 1.5px solid #000;
            padding: 12px;
        } */

        .box {
            border: 1.5px solid #000;
            padding: 0 12px 12px 12px;
            height: 193mm;
        }

        .right {
            text-align: right;
        }

        .center {
            text-align: center;
        }

        .left {
            text-align: left;
        }

        table.po_table thead th {
            border-bottom: 1px solid #000;
            vertical-align: bottom;
            padding: 0 5px 0 5px;
            line-height: 2;
            font-size: 10px;
            white-space: nowrap;
        }

        table.po_table td {
            vertical-align: top;
            font-size: 11px;
        }

        table.po_table tbody tr:last-child td {
            border-bottom: 1px solid #000;
        }

        .th_sub {
            display: block;
            font-weight: normal;
            margin-top: 2px;
        }

        .signature_box {
            height: 55px;
            text-align: center;
        }

        .signature_img {
            max-height: 90px;
        }

        .signature_imgCanvas {
            max-height: 80px;
        }

        .print-header {
            width: 100%;
            border-collapse: collapse;
            padding-bottom: 5px;
        }

        .print-header td {
            padding: 0;
            vertical-align: top;
        }

        .header-left {
            width: 65%;
            vertical-align: top !important;
        }

        .header-right {
            width: 35%;
            text-align: right;
            font-size: 10px;
            line-height: 1.35;
            vertical-align: top !important;
        }

        .header-logo {
            width: 70px;
            height: auto;
            display: block;
            margin: 0;
        }

        .company-name {
            color: #39833b;
            font-size: 22px;
            font-weight: bold;
            line-height: 1.1;
            margin-top: 2px;
            white-space: nowrap;
        }

        .company-subtitle {
            color: #000;
            font-size: 12px;
            font-weight: bold;
            line-height: 1.1;
            margin-top: 3px;
            white-space: nowrap;
        }

        .office-title {
            font-size: 15px;
            font-weight: bold;
            line-height: 1.2;
            margin-bottom: 2px;
        }

        .office-address {
            font-size: 12px;
            line-height: 1.25;
        }

        .office-contact {
            font-size: 12px;
            line-height: 1.35;
            margin-top: 7px;
        }
    </style>
</head>

<body>
    {{-- HEADER TEMPLATE --}}
    <table class="print-header" cellpadding="0" cellspacing="0">
        <tr>
            {{-- ========================= --}}
            {{-- KIRI: LOGO DI ATAS + NAMA DI BAWAH --}}
            {{-- ========================= --}}
            <td class="header-left">

                <img
                    src="{{ $logo }}"
                    class="header-logo"
                    alt="Logo"
                >

                <div class="company-name">
                    PT. Kencana Rajasa Raya
                </div>

                <div class="company-subtitle">
                    PP. MULTIFILAMENT YARN MANUFACTURER
                </div>

            </td>

            {{-- ========================= --}}
            {{-- KANAN: ALAMAT & KONTAK --}}
            {{-- ========================= --}}
            <td class="header-right">

                <div class="office-title">
                    MFG &amp; OFFICE :
                </div>

                <div class="office-address">
                    Raya Tropodo No. 1 Waru, Sidoarjo 61256<br>
                    East Java, Indonesia
                </div>

                <div class="office-contact">
                    Phone : (031) 8669595, 8669966<br>
                    Fax. : (031) 8669989<br>
                    <i>e-mail : admin@kencanarajasa.co.id</i>
                </div>

            </td>
        </tr>
    </table>

    {{--Body--}}
    <div class="box">
        <table>
            <tr>
                <td width="50%">
                    <label style="line-height: 2;"><b>Issued To:</b></label><br>
                    <label>{{ $header->NM_SUP ?? '-' }}</label><br>
                    <label>{{ $header->ALAMAT1 ?? '-' }}</label><br>
                    <label>{{ $header->KOTA1 ?? '-' }}</label><br>
                    <label>{{ $header->NEGARA1 ?? '-' }}</label><br>
                    <br><br>

                    <b>Delivery To:</b><br>
                    PT. Kencana Rajasa Raya<br>
                    Jl. Raya Tropodo No. 1<br>
                    Waru - Sidoarjo 61256 East Java, Indonesia
                </td>
                <td width="50%">
                    <table>
                        <tr>
                            <td><b>Number</b></td>
                            <td>: KRR - {{ $header->No_sppb }}</td>
                        </tr>
                        <tr>
                            <td><b>Date</b></td>
                            <td>:
                                {{ $header->Tgl_sppb ? \Carbon\Carbon::parse($header->Tgl_sppb)->format('d M Y') : '-' }}
                            </td>
                        <tr>
                            <td><b>Payment Term</b></td>
                            <td>:
                                {{ $header->Pay_Term ?? '-' }}
                            </td>
                        </tr>
                       <tr>
                            <td><b>Divisi</b></td>
                            <td>: {{ $header->Kd_div }} - {{ $header->Nm_div ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td><b>Requester</b></td>
                            <td>: {{ $header->Pemesan }}</td>
                        </tr>
                        <tr>
                            <td><b>Page</b></td>
                            <td>: Page 1 of 1</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <br>

        <table class="po_table">
            <colgroup>
                <col style="width:2%">
                <col style="width:10%">
                <col style="width:66%">
                <col style="width:6%">
                <col style="width:6%">
                <col style="width:10%">
                <col style="width:7%">
                <col style="width:14%">
            </colgroup>

            <thead>
                <tr>
                    <th>No.</th>
                    <th>Item Number</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Unit Price {{ $header->Id_MataUang_BC ?? 'IDR' }}</th>
                    <th>Disc. {{ $header->Id_MataUang_BC ?? 'IDR' }}</th>
                    <th>Amount {{ $header->Id_MataUang_BC ?? 'IDR' }}</th>
                </tr>
            </thead>

            <tbody>
                @foreach ($detail as $i => $row)
                    <tr>
                        <td>{{ $i + 1 }}</td>
                        <td class="center">{{ $row->Kd_brg }}</td>
                        <td>
                            <div>{{ $row->NAMA_BRG }}</div>
                            <div>{{ $row->keterangan ?? '-' }}</div>
                            <div>{{ $row->nama_kategori ?? '-' }}</div>
                            <div>{{ $row->nama_sub_kategori ?? '-' }}</div>
                            <div>{{ $row->No_trans }}</div>
                        </td>
                        <td class="center">{{ number_format($row->Qty, 2) }}</td>
                        <td class="center">{{ $row->Nama_satuan }}</td>
                        <td class="right">
                            {{ number_format($row->PriceUnit ?? 0, 2, ',', '.') }}
                        </td>

                        <td class="right">
                            {{ number_format($row->DiscAmount ?? 0, 2, ',', '.') }}
                            <div>
                                ({{ number_format($row->disc ?? 0, 2, ',', '.') }}%)
                            </div>
                        </td>

                        <td class="right">
                            {{ number_format($row->Amount ?? 0, 2, ',', '.') }}
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <table style="font-size: 11px">
            <tr>
                <td style="padding: 1px 0; width: 74%"></td>

                <td style="padding: 1px 0; width: 13%">
                    <b>Sub Total</b>
                </td>

                <td
                    style="padding: 1px 0; width: 13%; border-bottom: 1px solid;"
                    class="right"
                >
                    {{ number_format($subTotal ?? 0, 2, ',', '.') }}
                </td>
            </tr>

            <tr>
                <td style="padding: 1px 0;"></td>

                <td style="padding: 1px 0;">
                    <b>PPN</b>
                </td>

                <td
                    style="padding: 1px 0; border-bottom: 1px solid;"
                    class="right"
                >
                    {{ number_format($ppnTotal ?? 0, 2, ',', '.') }}
                </td>
            </tr>

            <tr>
                <td style="padding: 1px 0;">
                    <b>Document Copy of {{ $detail[0]->JumCetak ?? 1 }}</b>
                </td>

                <td style="padding: 1px 0;">
                    <b>Total</b>
                </td>

                <td
                    style="padding: 1px 0; border-bottom: 1px solid;"
                    class="right"
                >
                    {{ number_format($total ?? 0, 2, ',', '.') }}
                </td>
            </tr>
        </table>
        {{-- <table style="font-size: 11px;">
            <tr>
                <td width="60%" style="vertical-align: bottom;">
                    <b>Document Copy of {{ $items[0]->JumCetak ?? 1 }}</b>
                </td>
                <td width="40%">
                    <table>
                        <tr>
                            <td><b>Sub Total</b></td>
                            <td class="right" style="border-bottom: 1px solid black">
                                {{ number_format($sumAmount, 2) }}</td>
                        </tr>
                        <tr>
                            <td><b>DPP Nilai Lain</b></td>
                            <td class="right" style=";border-bottom: 1px solid black">
                                {{ number_format($dpp, 2) }}</td>
                        </tr>
                        <tr>
                            <td><b>VAT</b></td>
                            <td class="right" style=";border-bottom: 1px solid black">
                                {{ number_format($ppn, 2) }}</td>
                        </tr>
                        <tr>
                            <td><b>Total</b></td>
                            <td class="right" style=";border-bottom: 1px solid black">
                                {{ number_format($total, 2) }}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table> --}}
    </div>

    {{-- FOOTER TEMPLATE --}}
    {{-- <table width="100%" style="text-align:center; margin:20px 0 63px 0;">
        <tr>
            @if ($header->StatusBeli == 1)
                @if (empty($ttdBase64_2))
                    <td width="33%">MENYETUJUI,</td>
                @else
                    <td colspan="2">MENYETUJUI,</td>
                @endif
            @else
                <td width="33%">MENYETUJUI,</td>
            @endif
            <td width="33%">PEMESAN,</td>
            <td width="33%">PELAKSANA,</td>
        </tr>
        <tr>
            @if ($header->StatusBeli == 1)
                @if (empty($ttdBase64_2))
                    @if (!empty($ttdBase64_1))
                        <td>
                            <img src="{{ $ttdBase64_1 }}" class="signature_img" style="display:block;margin:0 auto;">
                        </td>
                    @endif
                @else
                    @if (!empty($ttdBase64_1))
                        <td width="17%">
                            <img src="{{ $ttdBase64_1 }}" class="signature_img" style="display:block;margin:0 auto;">
                        </td>
                    @endif
                    @if (!empty($ttdBase64_2))
                        <td width="16%">
                            <img src="{{ $ttdBase64_2 }}" class="signature_img" style="display:block;margin:0 auto;">
                        </td>
                    @endif
                @endif
            @else
                <td></td>
            @endif
            <td>
                @if (!empty($ttdBase64_3))
                    <img src="{{ $ttdBase64_3 }}" class="signature_imgCanvas" style="display:block;margin:0 auto;">
                @endif
            </td>
            <td>
                @if (!empty($ttdBase64_4))
                    <img src="{{ $ttdBase64_4 }}" class="signature_imgCanvas" style="display:block;margin:0 auto;">
                @endif
            </td>
        </tr>
        <tr>
            @if ($header->StatusBeli == 1)
                @if (empty($ttdBase64_2))
                    @if (!empty($ttdBase64_1))
                        <td>
                            {{ $header->NamaDirektur }}
                        </td>
                    @endif
                @else
                    @if (!empty($ttdBase64_1))
                        <td width="17%">
                            {{ $header->NamaDirektur }}
                        </td>
                    @endif
                    @if (!empty($ttdBase64_2))
                        <td width="16%">
                            {{ $header->NamaDirektur2 }}
                        </td>
                    @endif
                @endif
            @else
                <td>(.............................................)</td>
            @endif
            <td>{{ $header->NamaManager }}</td>
            <td>{{ $header->NamaUser }}</td>
        </tr>
    </table> --}}

    {{-- nama user yang acc tidak pengaruh --}}
    <table width="100%" style="text-align:center; margin-top:8px; font-size:11px;">
            <tr>
                <td width="33%">MENYETUJUI,</td>
                <td width="33%"></td>
                <td width="33%"></td>
            </tr>
            <td>
                <div class="signature_box">
                    @if (!empty($ttdDirektur?->FotoTtd))
                        <img src="data:image/png;base64,{{ $ttdDirektur->FotoTtd }}" class="signature_img"><br>
                        <b style="font-size:12px;">{{ $ttdDirektur->NamaUser }}</b>
                    @endif
                </div>
            </td>
            <tr>
                <td>
                    <div class="signature_box"></div>
                </td>
                <td>
                    <div class="signature_box"></div>
                </td>
            </tr>

            <tr>
                <td>(................................)</td>
                <td></td>
                <td></td>
            </tr>
        </table>

    <p style="font-size:10px;margin-top:5px;">
        <b>PERHATIAN:</b> UNTUK PENAGIHAN YANG TIDAK DILENGKAPI LEMBAR INI TIDAK DAPAT KAMI LAYANI
    </p>


</body>

</html>


@if (empty($forEmail))
<script>
window.onload = function () {
    window.print();
};
</script>
@endif
