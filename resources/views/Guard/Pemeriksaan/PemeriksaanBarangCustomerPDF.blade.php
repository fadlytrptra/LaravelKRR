<style>
    .laporan-extruderCustomer{
        font-family:"Times New Roman",serif;
        font-size:12px;
        color:#000;
    }
    .laporan-extruderCustomer .container{
        width:100%;
        border:1px solid #000;
        padding:5px;
        box-sizing:border-box;
    }
    .laporan-extruderCustomer table{
        width:100%;
        border-collapse:collapse;
    }
    .laporan-extruderCustomer td,
    .laporan-extruderCustomer th{
        padding:2px;
        vertical-align:middle;
    }
    .center{
        text-align:center;
    }
    .right{
        text-align:right;
    }
    .bold{
        font-weight:bold;
    }
    .header-table td{
        border:1px solid #000;
    }

    .detail-table td,
    .detail-table th{
        border:1px solid #000;
    }

    .info-table td{
        border:none;
        padding:2px 4px;
    }

    .info-table{
        border-top:1px solid #000;
        border-bottom:1px solid #000;
    }

    .info-table tr:first-child td{
        padding-top:4px;
    }

    .info-table tr:last-child td{
        padding-bottom:4px;
    }
</style>

@php
function imageSrc($img){
    if(empty($img)) return '';
    if(str_starts_with($img,'data:image')) return $img;
    return 'data:image/png;base64,'.$img;
}

$foto=[];
if(!empty($header['foto_pengiriman'])){
    $foto=preg_split('/(?=data:image\/[^;]+;base64,)/i',$header['foto_pengiriman'],-1,PREG_SPLIT_NO_EMPTY);
    $foto=array_map('trim',$foto);
}
@endphp

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Pemeriksaan Barang</title>
    </head>

    <body>
        <div class="laporan-extruderCustomer">
        <div class="container">

    <table>
        <tr><td class="center bold">PT. KERTA RAJASA RAYA</td></tr>
        <tr><td class="center bold">Woven Bag - Jumbo Bag Industrial</td></tr>
        <tr><td class="center bold">No. Dokumen : FM - 7.5 - 06 - BJ - 00 - 01</td></tr>
    </table>

    <table class="info-table">
        <tr>
        <td class="bold">Tanggal Muat</td><td>:</td><td>{{ $header['tanggal'] }}</td>
            <td class="bold">Nopol</td><td>:</td><td>{{ $header['nopol'] }}</td>
        </tr>
        <tr>
            <td class="bold">Jam Muat</td><td>:</td><td>{{ $header['jam_muat'] }}</td>
            <td class="bold">Instansi</td><td>:</td><td>{{ $header['instansi'] }}</td>
        </tr>
        <tr>
            <td class="bold">Tujuan Pengiriman</td><td>:</td><td>{{ $header['tujuan_kirim'] }}</td>
            <td class="bold">Seal / Container</td><td>:</td>
            <td>{{ $header['no_seal'] }} @if(!empty($header['no_container'])) / {{ $header['no_container'] }} @endif</td>
        </tr>
        <tr>
            <td class="bold">Surat Jalan</td><td>:</td>
            <td colspan="4">{{ $header['surat_jalanTerdaftar'] }}</td>
        </tr>
    </table>

    <table class="header-table">
        <thead>
            <tr>
            <th>No</th>
            <th>Tipe Barang</th>
            <th>Jam</th>
            <th>Tujuan Kirim</th>
            <th>Unit</th>
            <th>Total</th>
            </tr>
        </thead>

        <tbody>
            @php
                // Hitung total per Tipe Barang + Satuan
                $totalGroup = [];

                foreach ($detail as $row) {
                    $key = $row['nama_typeBarang'] . '|' . $row['Nama_satuan'];

                    if (!isset($totalGroup[$key])) {
                        $totalGroup[$key] = 0;
                    }

                    $totalGroup[$key] += $row['item'];
                }
            @endphp

            @foreach($detail as $index => $d)

                @php
                    $key = $d['nama_typeBarang'] . '|' . $d['Nama_satuan'];

                    // Cek apakah ini baris terakhir untuk Tipe Barang + Satuan
                    $isLast = true;

                    for ($i = $index + 1; $i < count($detail); $i++) {

                        if (
                            $detail[$i]['nama_typeBarang'] == $d['nama_typeBarang'] &&
                            $detail[$i]['Nama_satuan'] == $d['Nama_satuan']
                        ) {
                            $isLast = false;
                            break;
                        }
                    }
                @endphp

                <tr>
                    <td class="center">{{ $loop->iteration }}</td>
                    <td class="center">{{ $d['nama_typeBarang'] }}</td>
                    <td class="center">
                        {{ \Carbon\Carbon::parse($d['jam'])->format('H:i') }}
                    </td>

                    <td>{{ $d['tujuan_kirim'] }}</td>

                    <td class="center">
                        {{ number_format($d['item'],0,',','.') }}
                        {{ $d['Nama_satuan'] }}
                    </td>

                    <td class="center">
                        @if($isLast)
                            <strong>
                                {{ number_format($totalGroup[$key],0,',','.') }}
                                {{ $d['Nama_satuan'] }}
                            </strong>
                        @endif
                    </td>
                </tr>

            @endforeach

            <tr>
                <td colspan="6"
                    style="border-left:none;
                        border-right:none;
                        border-top:none;
                        border-bottom:1px solid #000;
                        padding:4px;">
                    Keterangan : {{ $header['keterangan'] }}
                </td>
            </tr>
        </tbody>
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
            <td class="center bold">Satpam</td>
            <td class="center bold">Mengetahui</td>
            <td class="center bold">Sopir</td>
        </tr>

        <tr>
            <td class="center">
                @if(!empty($ttd['FotoTtd']))
                <img src="data:image/png;base64,{{ $ttd['FotoTtd'] }}" style="max-width:180px;max-height:90px;">
                @endif
            </td>
            <td class="center">
                @if(!empty($header['fotoTtdAcc']))
                <img src="data:image/png;base64,{{ $header['fotoTtdAcc'] }}" style="max-width:180px;max-height:90px;">
                @endif
            </td>
            <td class="center">
                @if(!empty($header['ttd_base64']))
                <img src="{{ imageSrc($header['ttd_base64']) }}" style="max-width:180px;max-height:90px;">
                @endif
            </td>
        </tr>
        <tr>
            <td class="center">{{ $ttd['NamaUser'] ?? '-' }}</td>
            <td class="center">{{ $header['NamaUser'] ?? '-' }}</td>
            <td class="center">{{ $header['sopir'] ?? '-' }}</td>
        </tr>
    </table>

    @if(count($foto))
        <table style="border:none">
            <tr>
            @foreach($foto as $i=>$img)
            <td style="border:none;padding:6px;width:50%">
            <img src="{{ $img }}" style="width:100%;height:auto;">
            </td>
            @if($i%2==1)
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
