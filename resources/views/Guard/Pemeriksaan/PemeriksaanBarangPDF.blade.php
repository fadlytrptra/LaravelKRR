{{-- =========================
    STYLE KHUSUS MODAL
========================= --}}
<style>
    .custom-modal-width2 {
        max-width: 75%;
    }

    /* =========================
   SCOPE LAPORAN
========================= */
    .laporan-extruder {
        font-family: "Times New Roman", serif;
        font-size: 12px;
        color: #000;
    }

    .laporan-extruder .container {
        width: 100%;
        border: 1px solid #000;
        padding: 5px;
        box-sizing: border-box;
    }

    .laporan-extruder table {
        border-collapse: collapse;
        width: 100%;
    }

    .laporan-extruder td,
    .laporan-extruder th {
        border: 1px solid #000;
        padding: 1px 2px;
        vertical-align: middle;
    }

    .laporan-extruder .no-border td,
    .laporan-extruder .no-border th {
        border: none;
    }

    .laporan-extruder .center {
        text-align: center;
    }

    .laporan-extruder .right {
        text-align: right;
    }

    .laporan-extruder .bold {
        font-weight: bold;
    }

    .laporan-extruder .section-title {
        font-weight: bold;
        text-align: center;
        margin: 5px 0;
    }

    .laporan-extruder .small-text {
        font-size: 10px;
    }

    .laporan-extruder .remark {
        height: 60px;
    }

    .laporan-extruder .signature td {
        height: 30px;
    }

    #foto_pengirimanContainer {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    #foto_pengirimanContainer img {
        width: 500px;
        height: auto;
    }

    /* =========================
   PRINT ONLY
========================= */
    @media print {
        @page {
            size: A3 portrait;
            margin: 15mm;
        }
    }
</style>

@php

function imageSrc($img)
{
    if(empty($img)) return '';

    if(str_starts_with($img,'data:image')){
        return $img;
    }

    return 'data:image/png;base64,'.$img;
}

@endphp

@php
    $foto = [];

    if (!empty($header['foto_pengiriman'])) {

        $foto = preg_split(
            '/(?=data:image\/[^;]+;base64,)/i',
            $header['foto_pengiriman'],
            -1,
            PREG_SPLIT_NO_EMPTY
        );

        $foto = array_map('trim', $foto);
    }
@endphp

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pemeriksaan Barang</title>
</head>

<body>
    <div class="laporan-extruder">
        <div class="container mt-2">
            <table>
                <tr>
                    <td colspan="2" class="bold center" style="border-bottom:none !important">PT. KERTA
                        RAJASA RAYA</td>
                    <td class="small-text left"
                        style="border-right:none !important; border-bottom:none !important"></td>
                    <td colspan="4" class="small-text left"
                        style="width:200px; border-left:none !important; border-bottom:none !important">
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="center bold"
                        style="border-bottom:none !important; border-top:none !important">Woven Bag - Jumbo
                        Bag Industrial</td>
                    <td class="bold"
                        style="border-bottom:none !important; border-top:none !important; border-right:none !important">
                        Tujuan Pengiriman :</td>
                    <td colspan="4" style="border-bottom:none !important; border-top:none !important; border-left:none !important">
                    {{ $header['tujuan_kirim'] }}</td>
                </tr>
                <tr>
                    <td colspan="2" class="center bold" style="border-top:none !important">No. Dokumen:
                        FM - 7.5 - 06 - BJ - 00 - 01</td>
                    <td colspan="5" style="border-top:none !important"></td>
                </tr>
                <tr>
                    <td colspan="7" class="center bold" style="font-size: large">FORM PEMERIKSAAN BARANG
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td class="bold"
                        style="width:120px; border-right:none !important; border-bottom:none !important;">
                        Tanggal Muat</td>
                    <td
                        style="border-right:none !important; border-left:none !important; border-bottom:none !important">
                        :</td>
                    <td colspan="3" class=""
                        style="width: 100px; border-right:none !important; border-left:none !important; border-bottom:none !important;">
                        {{ $header['tanggal'] }}</td>
                    <td class="bold"
                        style="width:120px; border-right:none !important; border-left:none !important; border-bottom:none !important;">
                        Nopol</td>
                    <td
                        style="border-right:none !important; border-left:none !important; border-bottom:none !important;">
                        :</td>
                    <td colspan="3" class=""
                        style="width: 100px; border-left:none !important; border-bottom:none !important;">{{ $header['nopol'] }}</td>
                </tr>
                <tr>
                    <td class="bold"
                        style="width:120px; border-right:none !important; border-top:none !important;">Jam
                        Muat</td>
                    <td
                        style="border-right:none !important; border-left:none !important; border-top:none !important;">
                        :</td>
                    <td colspan="3" class=""
                        style="width: 100px; border-right:none !important; border-left:none !important; border-top:none !important;">{{ $header['jam_muat'] }}</td>
                    <td class="bold"
                        style="width:120px; border-right:none !important; border-left:none !important; border-top:none !important;">
                        Instansi</td>
                    <td
                        style="border-right:none !important; border-left:none !important; border-top:none !important;">
                        :</td>
                    <td colspan="3" class=""
                        style="width: 100px; border-left:none !important; border-top:none !important;">{{ $header['instansi'] }}</td>
                </tr>
            </table>
            <table id="modalItemTable">
                <thead>
                    <tr>
                        <td class="center bold" style="width:10%;">No.</td>
                        <td class="center bold" style="width:30%;">Tipe Barang</td>
                        <td class="center bold" style="width:15%;">Jam</td>
                        <td class="center bold" style="width:30%;">Unit</td>
                        <td class="center bold" style="width:15%;">Total</td>
                    </tr>
                </thead>
                <tbody>
                    @foreach($detail as $i => $d)
                    <tr>

                    <td class="center">
                    {{ $loop->iteration }}
                    </td>

                    <td>
                    {{ $d['nama_typeBarang'] }}
                    </td>

                    <td class="center">
                    {{ \Carbon\Carbon::parse($d['jam'])->format('H:i') }}
                    </td>

                    <td class="center">
                        {{ number_format($d['item'],0,',','.') }}
                        {{ $d['Nama_satuan'] }}
                    </td>

                    <td class="center">
                        {{ number_format($d['item'],0,',','.') }}
                        {{ $d['Nama_satuan'] }}
                    </td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td class="right" style="width:10%;border:none !important;">Keterangan:</td>
                        <td class="pl-2 pr-2" style="width: 90%;border:none !important;" colspan="4">{{ $header['keterangan'] }}</td>
                    </tr>
                </tfoot>
            </table>
            <table>
                <tr>
                    <td class="center bold"
                        style="width:120px; border:none !important; border-top: 1px solid black !important">
                        Tanda Tangan & Nama Jelas</td>
                    <td class="center bold"
                        style="width:120px; border:none !important; border-top: 1px solid black !important"
                        id="ttnGudang">
                        Tanda Tangan & Nama Jelas</td>
                    <td class="center bold"
                        style="width:120px; border:none !important; border-top: 1px solid black !important">
                        Tanda Tangan & Nama Jelas</td>
                </tr>
                <tr>
                    <td class="center bold" style="width:120px; border:none !important">Satpam</td>
                    <td class="center bold" style="width:120px; border:none !important" id="gdg">
                        Mengetahui</td>
                    <td class="center bold" style="width:120px; border:none !important">Sopir</td>
                </tr>
                {{--Tanda tangan--}}
                <tr>
                    {{-- Satpam --}}
                    <td class="center" style="width:120px; border:none !important">
                        @if(!empty($ttd['FotoTtd']))
                            <img
                                src="data:image/png;base64,{{ $ttd['FotoTtd'] }}"
                                style="max-width:180px; max-height:90px;">
                        @endif
                    </td>

                    {{-- Gudang --}}
                    <td class="center" style="width:120px; border:none !important">
                        @if(!empty($header['fotoTtdAcc']))
                            <img
                                src="data:image/png;base64,{{ $header['fotoTtdAcc'] }}"
                                style="max-width:180px; max-height:90px;">
                        @endif
                    </td>

                    {{-- Sopir --}}
                    <td class="center" style="width:120px; border:none !important">
                        @if(!empty($header['ttd_base64']))
                            <img
                                src="{{ imageSrc($header['ttd_base64']) }}"
                                style="max-width:180px; max-height:90px;">
                        @endif
                    </td>
                </tr>

                <tr>
                    <td class="center bold" style="border:none !important">
                        {{ $ttd['NamaUser'] ?? '-' }}
                    </td>
                    <td class="center bold" style="border:none !important">
                        {{ $header['NamaUser'] ?? '-' }}
                    </td>
                    <td class="center bold" style="border:none !important">
                        {{ $header['sopir'] ?? '-' }}
                    </td>
                </tr>
            </table>


            @if(count($foto))
                <table width="100%" style="border:none">

                <tr>

                @foreach($foto as $i => $img)

                    <td width="50%" style="border:none;padding:6px;vertical-align:top;">

                        <img src="{{ $img }}"
                            style="width:100%;height:auto;">

                    </td>

                    @if($i % 2 == 1)
                        </tr><tr>
                    @endif

                @endforeach

                </tr>

                </table>

                @endif
        </div>
    </div>
</body>
</html>
