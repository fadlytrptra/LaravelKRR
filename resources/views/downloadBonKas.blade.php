<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <style>

        @page{
            margin:8mm;
        }

        body{
            font-family:"Times New Roman", serif;
            font-size:10px;
            margin:0;
            padding:0;
        }

        table{
            border-collapse:collapse;
        }

        .bon{
            width:13cm;
            border:1px solid #000;
        }

        /* ================= HEADER ================= */

        .header{
            width:100%;
            border-bottom:1px solid #000;
        }

        .header-left{
            width:72%;
            border-right:1px solid #000;
            padding:5px;
        }

        .header-right{
            width:28%;
            text-align:center;
            vertical-align:middle;
            font-size:11px;
            font-weight:bold;
        }

        .logo{
            width:48px;
        }

        .company-name{
            font-size:16px;
            font-weight:bold;
            line-height:16px;
        }

        .company-sub{
            font-size:10px;
            line-height:12px;
        }

        /* ================= DETAIL ================= */

        .detail{
            width:100%;
        }

        .detail td{
            padding:2px 5px;
            font-size:10px;
            vertical-align:top;
        }

        .label{
            width:95px;
            font-weight:bold;
        }

        .label-right{
            width:60px;
            font-weight:bold;
            text-align:right;
        }

        .value{
            font-weight:bold;
        }

        .terbilang{
            font-style:italic;
            font-size:10px;
            padding-top:0;
        }

        /* ================= URAIAN ================= */

        .uraian-table{
            width:100%;
            border-collapse:collapse;
            margin-top:10px;
            margin-bottom:8px;
        }

        .uraian-label{
            width:95px;
            font-weight:bold;
            vertical-align:top;
            padding:2px 5px;
        }

        .uraian-content{
            padding:2px 5px;
        }

        .uraian-line{
            height:18px;
            border-bottom:1px dotted #000;
            font-size:10px;
            vertical-align:bottom;
        }

        /* ================= TANDA TANGAN ================= */

        .ttd-table{
            width:100%;
            border-collapse:collapse;
            border-top:1px solid #000;
        }

        .ttd-table td{
            width:33.33%;
            border-left:1px solid #000;
            text-align:center;
            vertical-align:top;
            padding:3px;
            font-size:10px;
        }

        .ttd-table td:first-child{
            border-left:none;
        }

        .ttd-title{
            height:18px;
            font-weight:normal;
        }

        .ttd-space{
            height:55px;
            vertical-align:bottom;
        }

        .ttd-space img{
            max-width:90px;
            max-height:42px;
        }

        .ttd-name{
            height:18px;
            vertical-align:bottom;
        }

    </style>

</head>

<body>
    <table class="bon">
        <tr>
            <td>
                <table class="header">
                    <tr>
                        <td class="header-left">
                            <table width="100%">
                                <tr>
                                    <td width="55">
                                        <img src="{{ public_path('images/KRR.png') }}" class="logo">
                                    </td>
                                    <td>
                                        <div class="company-name">
                                            P.T. KERTA RAJASA RAYA
                                        </div>
                                        <div class="company-sub">
                                            Woven Bag - Jumbo Bag Industrial
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>

                        <td class="header-right">
                            {{ $bonKas->JenisBonKas == 'P'
                                ? 'BON KAS PUTIH'
                                : 'BON KAS MERAH' }}
                        </td>
                    </tr>
                </table>

                <table class="detail">
                    <tr>
                        <td class="label">
                            TANGGAL
                        </td>
                        <td class="value">
                            {{ \Carbon\Carbon::parse($bonKas->Tanggal)->format('d-m-Y') }}
                        </td>

                        <td class="label-right">
                            No PO :
                        </td>
                        <td class="value">
                            {{ $bonKas->NoPO ?: '-' }}
                        </td>
                    </tr>

                    <tr>
                        <td class="label">
                            JUMLAH UANG
                        </td>
                        <td colspan="3" class="value">
                            Rp {{ number_format($bonKas->Jumlah, 2, ',', '.') }}
                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td colspan="3" class="terbilang">
                            ( {{ $terbilang }} )
                        </td>
                    </tr>
                </table>

                <table class="uraian-table">
                    <tr>
                        <td class="uraian-label">
                            URAIAN
                        </td>

                        <td class="uraian-content">
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="uraian-line">
                                        {{ $bonKas->Uraian }}
                                    </td>
                                </tr>

                                <tr>
                                    <td class="uraian-line">
                                        &nbsp;
                                    </td>
                                </tr>

                                <tr>
                                    <td class="uraian-line">
                                        &nbsp;
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <table class="ttd-table">
                    <tr>
                        <td class="ttd-title">
                            Menerima
                        </td>
                        <td class="ttd-title">
                            Mengetahui
                        </td>
                        <td class="ttd-title">
                            Kasir
                        </td>
                    </tr>

                    <tr>
                        <td class="ttd-space">
                            @if (!empty($bonKas->TtdPenerima))
                                <img src="data:image/png;base64,{{ $bonKas->TtdPenerima }}">
                            @endif
                        </td>

                        <td class="ttd-space">
                            @if (!empty($bonKas->TtdMengetahui))
                                <img src="data:image/png;base64,{{ $bonKas->TtdMengetahui }}">
                            @endif
                        </td>

                        <td class="ttd-space">
                            @if (!empty($bonKas->TtdKasir))
                                <img src="data:image/png;base64,{{ $bonKas->TtdKasir }}">
                            @endif
                        </td>
                    </tr>

                    <tr>
                        <td class="ttd-name">
                            ( {{ $bonKas->NamaPenerima }} )
                        </td>

                        <td class="ttd-name">
                            ( {{ $bonKas->NamaMengetahui }} )
                        </td>

                        <td class="ttd-name">
                            ( {{ $bonKas->NamaKasir }} )
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>
</html>
