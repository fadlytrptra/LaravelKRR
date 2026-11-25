    @php
        $tanggalInput = date('d F Y', timestamp: strtotime($dataBKK[0]->Tgl_Input));
        $tanggalHariIni = date('d F Y');
        // dd($dataBKK);
    @endphp

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Cetak BKK {{ $idbkk }}</title>
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
                        <h3 style="margin: 0">BUKTI PENGELUARAN KAS</h3>
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
                                <h3 style="margin: 0">{{ $idbkk }}</h3>
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
                    {{ number_format($dataBKK[0]->Nilai_Pembulatan, 2, '.', ',') }}</div>
                <div style="margin-left: 20px">Terbilang:</div>
                <div style="font-size: small;margin: 10px 0 0 20px;">{{ $dataBKK[0]->Terjemahan }}</div>
                <div style="display: flex;flex-direction: row;margin-top: 10px;border-top: solid 1px grey">
                    <div
                        style="display: flex;flex-direction: column;flex:4;text-align: center;border-right: solid 1px grey">
                        BENTUK PEMBAYARAN</div>
                    <div
                        style="display: flex;flex-direction: column;flex:6;text-align: center;border-right: solid 1px grey">
                        URAIAN PEMBAYARAN</div>
                </div>
                <div style="display: flex;flex-direction: row;border-top: solid 1px grey">
                    <div
                        style="display: flex;flex-direction: column;flex:2;text-align: center;border-right: solid 1px grey;font-size: smaller;">
                        {{ $dataBKK[0]->Jenis_Pembayaran }}</div>
                    <div
                        style="display: flex;flex-direction: column;flex:2;text-align: center;border-right: solid 1px grey;font-size: smaller;">
                        JATUH TEMPO</div>
                    <div
                        style="display: flex;flex-direction: column;flex:2;text-align: center;border-right: solid 1px grey;font-size: smaller;">
                        RINCIAN</div>
                    <div
                        style="display: flex;flex-direction: column;flex:2;text-align: center;border-right: solid 1px grey;font-size: smaller;">
                        KODE PERKIRAAN</div>
                    <div style="display: flex;flex-direction: column;flex:2;text-align: center;font-size: smaller;">
                        JUMLAH</div>
                </div>
                @php
                    $totalRincian = 0;
                @endphp
                @foreach ($dataBKK as $item)
                    @php
                        $totalRincian += (float) $item->Nilai_Rincian;
                    @endphp
                    <div style="display: flex;flex-direction: row;border-top: solid 1px grey">
                        <div
                            style="display: flex;flex-direction: column;flex:2;text-align: center;border-right: solid 1px grey;font-size: smaller;">
                            {{ $item->No_BGCek }}
                        </div>
                        <div
                            style="display: flex;flex-direction: column;flex:2;text-align: center;border-right: solid 1px grey;font-size: smaller;">
                            {{ $item->Jatuh_Tempo }}
                        </div>
                        <div
                            style="display: flex;flex-direction: column;flex:2;text-align: center;border-right: solid 1px grey;font-size: smaller;">
                            {{ $item->Rincian_Bayar }}
                        </div>
                        <div
                            style="display: flex;flex-direction: column;flex:2;text-align: center;border-right: solid 1px grey;font-size: smaller;">
                            {{ $item->Kode_Perkiraan }}
                        </div>
                        <div style="display: flex;flex-direction: column;flex:2;text-align: center;font-size: smaller;">
                            {{ number_format($item->Nilai_Rincian, 2, '.', ',') }}
                        </div>
                    </div>
                @endforeach
                <div style="display: flex;flex-direction: row;border-top: solid 1px grey">
                    <div
                        style="display: flex;flex-direction: column;flex:7.75;text-align: right;border-right: solid 1px grey; font-weight: bold;">
                        GRAND TOTAL: </div>
                    <div style="display: flex;flex-direction: column;flex:2.25;text-align: center;font-weight: bold;">
                        {{ $dataBKK[0]->Symbol }} {{ number_format($totalRincian, 2, '.', ',') }}</div>
                </div>
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
                    @if ($jenisCetak == 'DP Pelunasan')
                        <div style="display: flex;flex-direction: row;">
                            <p style="margin: 0; font-size: smaller;">
                                Untuk Pelunasan DP BKM Nomer: {{ $dataBKK[0]->Id_BKM_Acuan }}
                            </p> &nbsp;
                            <p style="margin: 0; font-size: smaller;">
                                Tanggal: {{ date('m/d/Y', strtotime($dataBKK[0]->Tgl_BKM)) }}
                            </p>
                        </div>
                    @endif
                    Sidoarjo, {{ $tanggalHariIni }}
                </div>
            </div>
        </div>
    </body>
