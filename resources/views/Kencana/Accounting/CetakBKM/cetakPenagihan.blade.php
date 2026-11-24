    @php
        $tanggalInput = date('d F Y', timestamp: strtotime($dataBKM[0]->Tgl_Input));
        $tanggalHariIni = date('d F Y');
        $sumBiaya = 0;
        $sumKurangLebih = 0;
        $sumNilaiRincian = 0;
        $nilaiTampil = 0;
        // dd($dataBKM);
    @endphp

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Cetak BKM {{ $idbkm }}</title>
        <style>
            body {
                font-family: Arial, Helvetica, sans-serif;
                color: #111;
            }
        </style>
    </head>

    <body>
        <div style="height: 20cm; overflow: overflow;">
            <div style="display: flex;flex-direction: row;gap: 10px;">
                <div style="display: flex;flex-direction: column;flex:0.4;border: solid 1px grey">
                    <div
                        style="display: flex;flex-direction: column;border-bottom: solid 1px grey;width: 100%; text-align: center;">
                        <h3 style="margin: 0">PT. KENCANA RAJASA RAYA</h3>
                    </div>
                    <div style="display: flex;flex-direction: column;width: 100%; text-align: center;">
                        <h3 style="margin: 0">Jl. Raya Tropodo No.1</h3>
                        <h3 style="margin: 0">WARU - SIDOARJO</h3>
                    </div>
                </div>
                <div style="display: flex;flex-direction: column;flex:0.6;border: solid 1px grey">
                    <div
                        style="display: flex;flex-direction: column;border-bottom: solid 1px grey;width: 100%; text-align: center;">
                        <h3 style="margin: 0">BUKTI PENERIMAAN BANK</h3>
                    </div>
                    <div style="display: flex;flex-direction: column;width: 100%; text-align: center;">
                        <div style="display: flex;flex-direction: row;">
                            <div style="display: flex;flex-direction: column;flex:0.399;">
                                NOMOR
                            </div>
                            <div style="display: flex;flex-direction: column;flex:0.001;">
                                :
                            </div>
                            <div style="display: flex;flex-direction: column;flex:0.6;">
                                <h3 style="margin: 0">{{ $idbkm }}</h3>
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: row;">
                            <div style="display: flex;flex-direction: column;flex:0.399;">
                                TANGGAL
                            </div>
                            <div style="display: flex;flex-direction: column;flex:0.001;">
                                :
                            </div>
                            <div style="display: flex;flex-direction: column;flex:0.6;">
                                <h3 style="margin: 0">{{ $tanggalInput }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;flex-direction: column;border: solid 1px grey; margin-top: 12px;">
                <div style="margin-left: 20px">Jumlah Diterima: Rp.
                    {{ number_format($dataBKM[0]->Nilai_Pelunasan, 2, '.', ',') }}</div>
                <div style="margin-left: 20px">Terbilang:</div>
                <div style="font-size: small;margin: 10px 0 0 20px;">{{ $dataBKM[0]->Terjemahan }}</div>
                @foreach ($dataBKM as $item)
                    @php
                        $sumBiaya += $item->Biaya;
                        $sumKurangLebih += $item->KurangLebih;
                        $sumNilaiRincian += $item->Nilai_Rincian;
                    @endphp
                @endforeach
                <table
                    style="
                        border-collapse: collapse;
                        width: 100%;
                        border-top: 1px solid grey;
                    ">
                    <tr>
                        <td style="text-align:center; border-right:1px solid grey; border-bottom:1px solid grey;">
                            RINCIAN PENERIMAAN
                        </td>
                        <td style="text-align:center; border-right:1px solid grey; border-bottom:1px solid grey;">
                            KODE PERKIRAAN
                        </td>
                        <td style="text-align:center; border-bottom:1px solid grey;">
                            JUMLAH
                        </td>
                    </tr>

                    @foreach ($dataBKM as $i => $item)
                        @php
                            $sign = '';

                            if ($item->ID_Penagihan !== null) {
                                if ($sumBiaya > 0 || $sumKurangLebih != 0) {
                                    $sign = '(+)';
                                }
                            } else {
                                if ($item->Biaya != 0) {
                                    $sign = '(-)';
                                } elseif ($item->KurangLebih > 0) {
                                    $sign = '(+)';
                                }
                            }
                            if ($sumBiaya == 0 && $sumKurangLebih == 0) {
                                $nilaiTampil = 0;
                            } elseif ($item->ID_Penagihan !== null && ($sumBiaya != 0 || $sumKurangLebih != 0)) {
                                $nilaiTampil = $item->Nilai_Rincian;
                            } elseif ($item->ID_Penagihan === null && ($sumBiaya != 0 || $sumKurangLebih != 0)) {
                                if ($item->Biaya != 0 && $item->KurangLebih == 0) {
                                    $nilaiTampil = $item->Biaya;
                                } elseif ($item->KurangLebih != 0 && $item->Biaya == 0) {
                                    $nilaiTampil = $item->KurangLebih;
                                }
                            } elseif ($item->ID_Penagihan === null && $item->Keterangan !== null) {
                                $nilaiTampil = $item->Nilai_Rincian;
                            }
                        @endphp
                        <tr>
                            <td style="border-right:1px solid grey; padding:4px;">
                                <div style="display: flex;flex-direction: row;">
                                    <p style="flex: 0.7;margin:0;padding: 0 0 0 10px; font-size: small;">
                                        {{ $item->ID_Penagihan !== null
                                            ? $item->NamaCust . ' - ' . $item->ID_Penagihan
                                            : ($item->Biaya != 0 || $item->KurangLebih != 0 || $item->Nilai_Rincian != 0
                                                ? $item->Keterangan ?? ''
                                                : '') }}
                                    </p>
                                    <p style="flex: 0.01;margin:0;padding: 0 0 0 10px; font-size: small;">
                                        {{ $sign }}
                                    </p>
                                    <p style="flex: 0.29;margin:0;padding: 0 10px 0 0">
                                        @if ($nilaiTampil > 0 || $nilaiTampil < 0)
                                            @if ($nilaiTampil < 0)
                                                (
                                            @endif
                                            {{ number_format(abs($nilaiTampil), 2, '.', ',') }}
                                            @if ($nilaiTampil < 0)
                                                    )
                                            @endif
                                        @endif
                                    </p>
                                </div>
                            </td>
                            <td style="border-right:1px solid grey; padding:4px; text-align:center;">
                                {{ $item->Kode_Perkiraan }}
                            </td>
                            <td style="padding:4px; text-align:right;">
                                @if ($nilaiTampil == 0)
                                    <p style="margin: 0;padding: 0 10px 0 0">
                                        {{ number_format($item->Nilai_Rincian, 2, '.', ',') }}
                                    </p>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                    @if ($sumBiaya > 0 || $sumKurangLebih > 0 || $sumKurangLebih < 0)
                        <tr>
                            <td style="padding:4px;border-top:1px solid grey;font-size: small;">Jumlah Tagihan:</td>
                            <td style="padding:4px;border-right:1px solid grey;border-top:1px solid grey;"></td>
                            <td style="padding:4px;border-top:1px solid grey;">
                                {{ $dataBKM[0]->Symbol }} {{ number_format($sumNilaiRincian, 2, '.', ',') }}</td>
                        </tr>
                    @endif
                    @if ($sumBiaya > 0)
                        <tr>
                            <td style="padding:4px;border-top:1px solid grey;font-size: small;">Lain-Lain:</td>
                            <td style="padding:4px;border-right:1px solid grey;border-top:1px solid grey;"></td>
                            <td style="padding:4px;border-top:1px solid grey;">
                                (-) {{ number_format($sumBiaya, 2, '.', ',') }}</td>
                        </tr>
                    @endif
                    @if ($sumKurangLebih > 0 || $sumKurangLebih < 0)
                        <tr>
                            @if ($sumKurangLebih > 0)
                                <td style="padding:4px;border-top:1px solid grey;font-size: small;">Kelebihan:</td>
                            @else
                                <td style="padding:4px;border-top:1px solid grey;font-size: small;">Kekurangan:</td>
                            @endif
                            <td style="padding:4px;border-right:1px solid grey;border-top:1px solid grey;"></td>
                            <td style="padding:4px;border-top:1px solid grey;">
                                @if ($sumKurangLebih > 0)
                                    (+)
                                @else
                                    (-)
                                @endif
                                {{ $dataBKM[0]->Symbol }} {{ number_format(abs($sumKurangLebih), 2, '.', ',') }}
                            </td>
                        </tr>
                    @endif
                    <tr sty>
                        <td style="border-top:1px solid grey;padding:4px"></td>
                        <td
                            style="border-top:1px solid grey;border-right:1px solid grey; padding:4px; text-align:right;">
                            GRAND TOTAL:</td>
                        <td style="border-top:1px solid grey;padding:4px">
                            {{ $dataBKM[0]->Symbol }} {{ number_format($dataBKM[0]->Nilai_Pelunasan, 2, '.', ',') }}
                        </td>
                    </tr>
                </table>
            </div>
            <div style="display: flex;flex-direction: row;gap: 10px;margin: 20px 0 0 10px">
                <div style="display: flex;flex-direction: column;flex:0.2">
                    Disetujui,
                    <br>
                    <br>
                    <br>
                    <br>
                    __________
                </div>
                <div style="display: flex;flex-direction: column;flex:0.2">
                    Kasir,
                    <br>
                    <br>
                    <br>
                    <br>
                    __________
                </div>
                <div style="display: flex;flex-direction: column;flex:0.6;">
                    Sidoarjo, {{ $tanggalHariIni }}
                </div>
            </div>
        </div>
    </body>
