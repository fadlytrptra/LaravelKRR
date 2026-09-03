    @php
        $tanggalRekap = date('d F Y', timestamp: strtotime($data['dataRekapHarian'][0]->TanggalRekapan));
        // dd($data);
    @endphp

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Rekap Harian {{ $tanggalRekap }}</title>
        <style>
            body {
                font-family: Arial, Helvetica, sans-serif;
                color: #111;
            }

            h1 {
                text-align: center;
                font-size: 18px;
                margin: 6px;
            }

            .sub {
                text-align: center;
                font-size: 12px;
                margin-bottom: 18px;
                color: #333;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 16px;
            }

            th,
            td {
                border: 1px solid #666;
                padding: 2px;
                font-size: 10px;
                vertical-align: middle;
            }

            th {
                white-space: nowrap;
                background: #efefef;
                text-align: left;
            }

            .no-border td {
                border: none;
                padding: 4px;
            }

            .right {
                text-align: right;
            }

            .center {
                text-align: center;
            }

            .section-title {
                background: #ddd;
                padding: 6px;
                font-weight: bold;
                margin-top: 12px;
            }

            .small {
                font-size: 11px;
                color: #333;
            }

            .muted {
                color: #555;
                font-size: 11px;
            }

            .summary {
                width: 48%;
                display: inline-block;
                vertical-align: top;
            }

            .fullwidth {
                width: 100%;
            }

            .footnote {
                font-size: 11px;
                color: #333;
                margin-top: 8px;
            }
        </style>
    </head>

    <body>
        <!-- Ukuran tinggi HVS A4 -->
        <div style="height: 28cm; overflow: overflow;">
            <h1>HASIL PRODUKSI WOVEN TANGGAL {{ strtoupper($tanggalRekap) }}</h1>
            <!-- Printing / RTR table -->
            <table>
                <thead>
                    <tr>
                        <th class="center">MESIN</th>
                        <th class="center">PRINTING</th>
                        <th class="center">PCS</th>
                        <th class="center">KGM</th>
                        <th class="center">AFALAN<br>SETTING</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                        $grouped = collect($data['dataLogRTR'])->groupBy('NamaMesin');
                        $totalHasilLembarRTR = 0;
                        $totalHasilKgRTR = 0;
                        $totalAfalanSetting = 0;
                    @endphp
                    @foreach ($grouped as $namaMesin => $rows)
                        @foreach ($rows as $index => $item)
                            @php
                                $totalAfalanSetting += $item->Afalan_Setting_Lembar;
                                $totalHasilLembarRTR += $item->Hasil_Lembar;
                                $totalHasilKgRTR += $item->Hasil_Kg;
                            @endphp
                            <tr>
                                {{-- Only print NamaMesin on first row of the group, with rowspan --}}
                                @if ($index == 0)
                                    <td rowspan="{{ $rows->count() }}" style="white-space: nowrap;text-align: center">
                                        {{ $namaMesin }}
                                    </td>
                                @endif

                                <td>{{ $item->NAMA_BRG }}</td>
                                <td>{{ number_format($item->Hasil_Lembar) }}</td>
                                <td>{{ number_format($item->Hasil_Kg) }}</td>
                                <td>
                                    {{ $item->Afalan_Setting_Lembar == 0 || $item->Afalan_Setting_Lembar == 0.0 ? '-' : number_format($item->Afalan_Setting_Lembar) }}
                                </td>
                            </tr>
                        @endforeach
                    @endforeach
                    <tr>
                        <td colspan="2"></td>
                        <th colspan="2" class="right">TOTAL AFV SETTING</th>
                        <th class="center">{{ $totalAfalanSetting }}</th>
                    </tr>
                    <tr>
                        <td colspan="2">HASIL JAHIT MULUT ULTRASONIK</td>
                        <td class="center">
                            {{ $data['dataRekapHarian'][0]->HasilJahitMulut == 0 || $data['dataRekapHarian'][0]->HasilJahitMulut == 0.0 ? '-' : number_format($data['dataRekapHarian'][0]->HasilJahitMulut) }}
                        </td>
                        <td class="center">-</td>
                    </tr>
                    <tr>
                        <td colspan="2">PASANG INNER</td>
                        <td class="center">
                            {{ $data['dataRekapHarian'][0]->PasangInner == 0 || $data['dataRekapHarian'][0]->PasangInner == 0.0 ? '-' : number_format($data['dataRekapHarian'][0]->PasangInner) }}
                        </td>
                        <td class="center">-</td>
                    </tr>
                </tbody>
            </table>

            <!-- MPJ summary table -->
            <table cellspacing="0" cellpadding="5">
                <thead>
                    <tr>
                        <th class="center" rowspan="2">Mesin</th>
                        <th class="center" rowspan="2">PCS</th>
                        <th class="center" rowspan="2">KGM</th>
                        <th class="center" colspan="2">WA</th>
                        <th class="center" colspan="2">WE</th>
                        <th class="center" colspan="2">Afalan Potong</th>
                        <th class="center" colspan="4">EFF</th>
                    </tr>
                    <tr>
                        <th class="center">KGM</th>
                        <th class="center">%</th>
                        <th class="center">KGM</th>
                        <th class="center">%</th>
                        <th class="center">KGM</th>
                        <th class="center">%</th>
                        <th class="center">KEC.<br>(Bag/MNT)</th>
                        <th class="center">JAM KERJA</th>
                        <th class="center">STD. Hasil</th>
                        <th class="center">%</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                        $totalHasilLembarMPJ = 0;
                        $totalHasilKgMPJ = 0;
                    @endphp
                    @foreach ($data['dataLogMPJ'] as $item)
                        @php
                            $totalHasilLembarMPJ += $item->Hasil_Lembar;
                            $totalHasilKgMPJ += $item->BahanBaku_Kg;
                        @endphp
                        <tr>
                            <td class="center">{{ $item->NamaMesin }}</td>
                            <td class="center">{{ number_format($item->Hasil_Lembar) }}</td>
                            <td class="center">{{ number_format($item->BahanBaku_Kg, 2) }}</td>
                            <td class="center">{{ number_format($item->AfalanWA_KG, 2) }}</td>
                            <td class="center">
                                {{ number_format(($item->AfalanWA_KG / $item->BahanBaku_Kg) * 100, 2) }}</td>
                            <td class="center">{{ number_format($item->AfalanWE_KG, 2) }}</td>
                            <td class="center">
                                {{ number_format(($item->AfalanWE_KG / $item->BahanBaku_Kg) * 100, 2) }}</td>
                            <td class="center">{{ number_format($item->AfalanPotong_KG, 2) }}</td>
                            <td class="center">
                                {{ number_format(($item->AfalanPotong_KG / $item->BahanBaku_Kg) * 100, 2) }}</td>
                            <td class="center">{{ number_format($item->AVG_Standard_Waktu, 2) }}</td>
                            <td class="center">{{ number_format($item->Jam_Kerja, 2) }}</td>
                            <td class="center">{{ number_format($item->Std_Hasil, 2) }}</td>
                            <td class="center">{{ number_format(($item->Hasil_Lembar / $item->Std_Hasil) * 100, 2) }}
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <table style="width: 20%">
                <tr>
                    <td style="white-space: nowrap">AWAL BARANG REPAIR</td>
                    <td>{{ number_format($data['dataRekapHarian'][0]->BarangRepair, 2) }}</td>
                </tr>
                <tr>
                    <td style="white-space: nowrap">HASIL REPAIR</td>
                    <td>{{ number_format($data['dataRekapHarian'][0]->BarangRepair, 2) }}</td>
                </tr>
                <tr>
                    <td style="white-space: nowrap">SISA BARANG REPAIR</td>
                    <td>-</td>
                </tr>
            </table>
            <!-- Shift detail per MPJ -->
            <table>
                <thead>
                    <tr>
                        <th class="center" rowspan="2">MESIN</th>
                        <th class="center" colspan="2">SHIFT</th>
                        <th class="center" rowspan="2">BERAT</th>
                        <th class="center" colspan="3">WA</th>
                        <th class="center" colspan="3">WE</th>
                    </tr>
                    <tr>
                        <th class="center">JAM</th>
                        <th class="center">SHIFT</th>
                        <th class="center">LEMBAR</th>
                        <th class="center">KG</th>
                        <th class="center">%</th>
                        <th class="center">LEMBAR</th>
                        <th class="center">KG</th>
                        <th class="center">%</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                        $grouped = collect($data['dataDetailLogMPJ'])->groupBy('NamaMesin');
                    @endphp
                    @foreach ($grouped as $namaMesin => $rows)
                        @php
                            $totalBeratPerMesin = 0;
                            $totalLembarWAPerMesin = 0;
                            $totalBeratWAPerMesin = 0;
                            $totalPersenWAPerMesin = 0;
                            $totalLembarWEPerMesin = 0;
                            $totalBeratWEPerMesin = 0;
                            $totalPersenWEPerMesin = 0;
                        @endphp
                        @foreach ($rows as $index => $item)
                            @php
                                $totalBeratPerMesin += $item->BahanBaku_Kg;
                                $totalLembarWAPerMesin += $item->AfalanWA_LBR;
                                $totalBeratWAPerMesin += $item->AfalanWA_KG;
                                $totalLembarWEPerMesin += $item->AfalanWE_LBR;
                                $totalBeratWEPerMesin += $item->AfalanWE_KG;
                            @endphp
                            <tr>
                                {{-- Only print NamaMesin on first row of the group, with rowspan --}}
                                @if ($index == 0)
                                    <td rowspan="{{ $rows->count() + 1 }}"
                                        style="white-space: nowrap;text-align: center">
                                        {{ $namaMesin }}
                                    </td>
                                @endif

                                @if ($item->Shift == 'B')
                                    <td class="center">07-15</td>
                                @elseif ($item->Shift == 'C')
                                    <td class="center">15-23</td>
                                @elseif ($item->Shift == 'A')
                                    <td class="center">23-07</td>
                                @else
                                    <td class="center">-</td>
                                @endif
                                <td class="center">{{ $item->Shift }}</td>
                                <td class="center">{{ number_format($item->BahanBaku_Kg) }}</td>
                                <td class="center">{{ number_format($item->AfalanWA_LBR) }}</td>
                                <td class="center">{{ number_format($item->AfalanWA_KG) }}</td>
                                <td class="center">
                                    {{ $item->BahanBaku_Kg != 0 ? number_format(($item->AfalanWA_KG / $item->BahanBaku_Kg) * 100, 2) : '0.00' }}
                                </td>
                                <td class="center">{{ number_format($item->AfalanWE_LBR) }}</td>
                                <td class="center">{{ number_format($item->AfalanWE_KG) }}</td>
                                <td class="center">
                                    {{ $item->BahanBaku_Kg != 0 ? number_format(($item->AfalanWA_KG / $item->BahanBaku_Kg) * 100, 2) : '0.00' }}
                                </td>
                            </tr>
                        @endforeach
                        <tr>
                            <td colspan="2" class="right"><b>Total:</b></td>
                            <td class="center"><b>{{ $totalBeratPerMesin }}</b></td>
                            <td class="center"><b>{{ $totalLembarWAPerMesin }}</b></td>
                            <td class="center"><b>{{ $totalBeratWAPerMesin }}</b></td>
                            <td class="center">
                                <b>{{ number_format(($totalBeratWAPerMesin / $totalBeratPerMesin) * 100, 2) }}</b>
                            </td>
                            <td class="center"><b>{{ $totalLembarWEPerMesin }}</b></td>
                            <td class="center"><b>{{ $totalBeratWEPerMesin }}</b></td>
                            <td class="center">
                                <b>{{ number_format(($totalBeratWEPerMesin / $totalBeratPerMesin) * 100, 2) }}</b>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <!-- Rekap akhir -->
            <div class="section-title">Rekap & Hasil Press</div>
            <table>
                <thead>
                    <tr>
                        <th>REKAP</th>
                        <th class="right">PCS</th>
                        <th class="right">KGM</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TOTAL HASIL RTR</td>
                        <td class="right">{{ number_format($totalHasilLembarRTR, 2) }}</td>
                        <td class="right">{{ number_format($totalHasilKgRTR, 2) }}</td>
                    </tr>
                    <tr>
                        <td>TOTAL HASIL MPJ</td>
                        <td class="right">{{ number_format($totalHasilLembarMPJ, 2) }}</td>
                        <td class="right">{{ number_format($totalHasilKgMPJ, 2) }}</td>
                    </tr>
                    <tr>
                        <td colspan="3">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>HASIL PRINTING BODY STARPAK</td>
                        <td class="right">
                            {{ number_format($data['dataHasilPrintingBodyStarpak'][0]->Hasil_Lembar, 2) }}</td>
                        <td class="right">{{ number_format($data['dataHasilPrintingBodyStarpak'][0]->Hasil_Kg, 2) }}
                        </td>
                    </tr>
                    <tr>
                        <td>HASIL PRINTING PATCH STARPAK</td>
                        <td class="right">
                            {{ number_format($data['dataHasilPrintingPatchStarpak'][0]->Hasil_Lembar, 2) }}</td>
                        <td class="right">{{ number_format($data['dataHasilPrintingPatchStarpak'][0]->Hasil_Kg, 2) }}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>HASIL PRESS STARPAK</td>
                        <td class="right">{{ number_format($data['dataRekapHarian'][0]->HasilPressStarpak_LBR, 2) }}
                        </td>
                        <td class="right">{{ number_format($data['dataRekapHarian'][0]->HasilPressStarpak_KG, 2) }}
                        </td>
                    </tr>
                    <tr>
                        <td>HASIL PRESS WOVEN</td>
                        <td class="right">{{ number_format($data['dataRekapHarian'][0]->HasilPressWoven_LBR, 2) }}
                        </td>
                        <td class="right">{{ number_format($data['dataRekapHarian'][0]->HasilPressWoven_KG, 2) }}
                        </td>
                    </tr>
                    <tr>
                        <td>HASIL PRESS NGANJUK</td>
                        <td class="right">{{ number_format($data['dataRekapHarian'][0]->HasilPressNganjuk_LBR, 2) }}
                        </td>
                        <td class="right">{{ number_format($data['dataRekapHarian'][0]->HasilPressNganjuk_KG, 2) }}
                        </td>
                    </tr>
                    <tr>
                        <th>TOTAL HASIL PRESS KESELURUHAN</th>
                        <th class="right">
                            {{ number_format($data['dataRekapHarian'][0]->HasilPressStarpak_LBR + $data['dataRekapHarian'][0]->HasilPressWoven_LBR + $data['dataRekapHarian'][0]->HasilPressNganjuk_LBR, 2) }}
                        </th>
                        <th class="right">
                            {{ number_format($data['dataRekapHarian'][0]->HasilPressStarpak_KG + $data['dataRekapHarian'][0]->HasilPressWoven_KG + $data['dataRekapHarian'][0]->HasilPressNganjuk_KG, 2) }}
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
