    @php
        // $tanggalInput = date('d F Y', timestamp: strtotime($dataBKK[0]->Tgl_Input));
        // $tanggalHariIni = date('d F Y');
        // dd($dataCetak);
        $total = 0;
    @endphp

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Cetak Faktur Penjualan {{ $idPenagihan }}</title>
        <style>
            body {
                font-family: Arial, Helvetica, sans-serif;
                color: #111;
            }

            @media print {
                .no-print {
                    display: none;
                }
            }
        </style>
    </head>

    <body>
        <div style="height: 27cm; overflow: overflow;">
            <div style="left:16.25cm; top: 2.9cm; position: absolute; text-align:right; font-size:16px;">
                {{ $idPenagihan }}
            </div>
            <div style="left: 11cm; top: 4cm; position: absolute; text-align:right; font-size:16px;">
                No Seri Faktur Pajak: {{ $dataCetak[0]->NoSeri_FakturPajak }}
            </div>
            <div style="position:absolute; left:6cm; top:8.5cm; width:14cm;">
                <div style="font-size:14px; font-weight:bold;">
                    {{ $dataCetak[0]->NamaNPWP }}
                </div>

                <div style="font-size:12px; margin-top:0.3cm;">
                    {{ $dataCetak[0]->AlamatNPWP }}
                </div>

                <div style="font-size:14px; font-weight:bold; margin-top:0.3cm;">
                    {{ implode(' ', str_split(str_pad($dataCetak[0]->NPWP, 16, '0', STR_PAD_LEFT), 4)) }}
                </div>
            </div>
            @foreach ($dataCetak as $index => $item)
                @php
                    $top = 12 + $index * 0.6;
                    $total += (float) $item->Jml * (float) $item->HargaSatuan;
                @endphp
                <div style="position:absolute; top:{{ $top }}cm; left:0;">
                    <span style="position:absolute; left:0.5cm; font-size:14px;">{{ $index + 1 }}</span>
                    <span
                        style="position:absolute; left:1.6cm; font-size:14px;width: 8.5cm;">{{ $item->NamaType }}</span>
                    <span style="position:absolute; left:10.2cm; font-size:14px;width: 3cm;">
                        {{ number_format($item->Jml, 2, '.', ',') }} {{ $item->Satuan }}
                    </span>
                    <span style="position:absolute; left:13.2cm; font-size:14px;width: 3.5cm;">
                        {{ $item->Symbol2 }} {{ number_format($item->HargaSatuan, 2, '.', ',') }}
                    </span>
                    <span style="position:absolute; left:16.75cm; font-size:14px;width: 3.5cm;">
                        {{ $item->Symbol2 }}
                        {{ number_format((float) $item->Jml * (float) $item->HargaSatuan, 2, '.', ',') }}
                    </span>
                </div>
            @endforeach
            <div style="position:absolute; top:{{ $top + 1.2 }}cm; left:0;">
                <span style="position:absolute; left:1.8cm; font-size:14px;width: 8.5cm;">
                    P O
                    {{ $dataCetak[0]->NO_PO }}
                </span>
            </div>

            {{-- <div style="position:absolute; top:{{ $top + 4.5 }}cm; left:0;">
                <span style="position:absolute; left:1.5cm; font-size:14px;width: 6cm;">
                    Pembayaran Harap Ditransfer ke :<br />
                    @if ($bank == 'BCA1')
                        Bank BCA Cab. Galaxy, Surabaya<br />
                        a/c: 788.083.3639<br />
                        a/n: PT. CAHAYA SANTOSO JAYA
                    @elseif ($bank == 'OCBC')
                        Bank OCBC Cab. Pemuda, Surabaya<br />
                        a/c: 050.800.525.037<br />
                        a/n: PT. CAHAYA SANTOSO JAYA
                    @elseif ($bank == 'CIMB')
                        Bank CIMB Niaga Cab. Mayjend Sungkono, Surabaya<br />
                        a/c: 802.220.003.300<br />
                        a/n: PT.CAHAYA SANTOSO JAYA
                    @endif
                </span>
            </div> --}}

            {{-- @php
                $nilaiUM = (float) $dataCetak[0]->Nilai_UM ?? 0;
                $ppn = (float) $dataCetak[0]->PersenPPN;
                if ($ppn > 1) {
                    $ppn = $ppn / 100;
                }
                if ($ppn == 0.12) {
                    $dpp = (($total - $nilaiUM) * 11) / 12;
                } else {
                    $dpp = $total - $nilaiUM;
                }
                $pajak = round($dpp * $ppn, 2);
                $terbayar = $pajak + $total;
                $tglPenagihan = $dataCetak[0]->Tgl_Penagihan; // "2025-12-23 00:00:00.000"
                $syaratBayar = (int) $dataCetak[0]->SyaratBayar;

                $jatuhTempo = date('d/m/Y', strtotime("+{$syaratBayar} days", strtotime($tglPenagihan)));
            @endphp --}}

            @php
                // Total harga jual barang yang sudah dihitung dalam foreach.
                $totalHargaJual = (float) ($total ?? 0);

                $nilaiUM = (float) ($dataCetak[0]->Nilai_UM ?? 0);
                $nilaiBlmPajak = (float) ($nilaiBlmPajak ?? 0);

                $ppn = (float) ($dataCetak[0]->PersenPPN ?? 0.12);

                if ($ppn > 1) {
                    $ppn /= 100;
                }

                if ($jenisCetak === 'NotaFaktur') {
                    // NotaFaktur: total harga jual dikurangi UM.
                    $nilaiBarisPertama = $totalHargaJual;
                    $nilaiUMTampil = $nilaiUM;

                    $dasarPenagihan = max(
                        0,
                        $totalHargaJual - $nilaiUM
                    );

                } else {
                    // Tunai: gunakan Nilai_blm_Pajak langsung.
                    $nilaiBarisPertama = $nilaiBlmPajak;
                    $nilaiUMTampil = 0;

                    $dasarPenagihan = $nilaiBlmPajak;
                }

                // Hitung DPP Nilai Lain.
                if (abs($ppn - 0.12) < 0.000001) {
                    $dpp = $dasarPenagihan * 11 / 12;
                } else {
                    $dpp = $dasarPenagihan;
                }

                // Hitung PPN dan total penagihan.
                $pajak = round($dpp * $ppn, 2);
                $terbayar = round($dasarPenagihan + $pajak, 2);

                // Jatuh tempo.
                $tglPenagihan = $dataCetak[0]->Tgl_Penagihan;
                $syaratBayar = (int) ($dataCetak[0]->SyaratBayar ?? 0);

                $jatuhTempo = date(
                    'd/m/Y',
                    strtotime(
                        "+{$syaratBayar} days",
                        strtotime($tglPenagihan)
                    )
                );
            @endphp

            <div style="left: 16.75cm;top: 20.65cm; position: absolute;font-size:12px;">
                {{ $dataCetak[0]->Symbol2 }}
            </div>
            <div style="left: 17.35cm; top: 20.65cm; position: absolute; font-size: 12px; width: 2.3cm; text-align: right;">
                {{ number_format($nilaiBarisPertama, 2, '.', ',') }}
            </div>
            <div style="left: 16.75cm;top: 21.25cm; position: absolute;font-size:12px;">
                {{ $dataCetak[0]->Symbol2 }}
            </div>
            <div style="left: 17.35cm;top: 21.25cm; position: absolute;font-size:12px;width: 2.3cm;text-align: right;">
                {{-- {{ number_format($nilaiUM, 2, '.', ',') }} --}}
                0.00
            </div>
            <div style="left: 16.75cm;top: 21.85cm; position: absolute;font-size:12px;">
                {{ $dataCetak[0]->Symbol2 }}
            </div>
            <div style="left: 17.35cm; top: 21.85cm; position: absolute; font-size: 12px; width: 2.3cm; text-align: right;">
                {{ number_format($nilaiUMTampil, 2, '.', ',') }}
            </div>
            <div style="left: 4.5cm;top: 22.45cm; position: absolute;font-size:12px;">
                Nilai Lain
            </div>
            <div style="left: 16.75cm;top: 22.45cm; position: absolute;font-size:12px;">
                {{ $dataCetak[0]->Symbol2 }}
            </div>
            <div style="left: 17.35cm;top: 22.45cm; position: absolute;font-size:12px;width: 2.3cm;text-align: right;">
                {{ number_format($dpp, 2, '.', ',') }}
            </div>
            <div style="left: 1.8cm;top: 23.05cm; position: absolute;font-size:12px;">12%</div>
            <div style="left: 16.75cm;top: 23.05cm; position: absolute;font-size:12px;">
                {{ $dataCetak[0]->Symbol2 }}
            </div>
            <div
                style="left: 17.35cm;top: 23.05cm; position: absolute;font-size:12px;text-align: right;width: 2.3cm;text-align: right;">
                {{ number_format($pajak, 2, '.', ',') }}
            </div>
            <div style="left: 2cm;top: 23.65cm; position: absolute;font-size:12px;width: 14.5cm;">
                {{ $dataCetak[0]->Terbilang }}
            </div>
            <div style="left: 16.75cm;top: 23.65cm; position: absolute;font-size:12px;">
                {{ $dataCetak[0]->Symbol2 }}
            </div>
            <div
                style="left: 17.35cm;top: 23.65cm; position: absolute;font-size:12px;text-align: right;width: 2.3cm;text-align: right;">
                {{ number_format($terbayar, 2, '.', ',') }}
            </div>
            <div style="left: 13.2cm;top: 24.2cm; position: absolute;font-size:14px;">
                Sidoarjo
            </div>
            <div style="left: 15.6cm;top: 24.2cm; position: absolute;font-size:14px;">
                {{-- {{ date('d F', $dataCetak[0]->Tgl_Penagihan) }} --}}
                {{ \Carbon\Carbon::parse($dataCetak[0]->Tgl_Penagihan)->locale('id')->translatedFormat('j F') }}
            </div>
            <div style="left: 19.05cm;top: 24.2cm; position: absolute;font-size:14px;">
                {{ date('y') }}
            </div>
            <div style="left: 15cm;top: 26.3cm; position: absolute;font-size:14px;">
                {{ $ttd }}
            </div>
            <table style="position:absolute; left:1cm; top:25.5cm; width:10cm;font-size:14px;">
                <colgroup>
                    <col style="width:3.5cm;">
                    <col style="width:0.4cm;">
                    <col style="width:auto;">
                </colgroup>
                <tr>
                    <td>Syarat Pembayaran</td>
                    <td>:</td>
                    <td>{{ $dataCetak[0]->SyaratBayar }} Hari</td>
                </tr>
                <tr>
                    <td>Jatuh Tempo</td>
                    <td>:</td>
                    <td>{{ $jatuhTempo }}</td>
                </tr>
                <tr>
                    <td>Surat Jalan</td>
                    <td>:</td>
                    <td>{{ $dataCetak[0]->IDPengiriman }}</td>
                </tr>
            </table>
            {{-- <div style="position:absolute; left:1cm; top:25.5cm; width:12cm;">
                <div style="display: flex;flex-direction: row;">
                    <div style="font-size:14px;">
                        Syarat Pembayaran:
                    </div>
                    <div style="font-size:14px;">
                        {{ $dataCetak[0]->SyaratBayar }} Hari
                    </div>
                </div>
                <div style="display: flex;flex-direction: row;margin-top:0.2cm;">
                    <div style="font-size:14px;">
                        Jatuh Tempo:
                    </div>
                    <div style="font-size:14px;">
                        {{ $jatuhTempo }}
                    </div>
                </div>
                <div style="display: flex;flex-direction: row;margin-top:0.2cm;">
                    <div style="font-size:14px;">
                        Surat Jalan:
                    </div>
                    <div style="font-size:14px;">
                        {{ $dataCetak[0]->IDPengiriman }}
                    </div>
                </div>
            </div> --}}
        </div>
        <div class="no-print" style="color: red;font-weight: bold;">
            <label>Saat print harap pastikan sudah sesuai dengan settingan berikut: </label>
            <br>
            <label>-Margin: None</label>
            <br>
            <label>-Scale: Default</label>
        </div>
    </body>
