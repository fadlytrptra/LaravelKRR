    @php
        $tanggalInput = date('d F Y', timestamp: strtotime($dataBKM[0]->Tgl_Input));
        $tanggalHariIni = date('d F Y');
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
                <div style="display: flex;flex-direction: row;margin-top: 10px;border-top: solid 1px grey">
                    <div
                        style="display: flex;flex-direction: column;flex:5.5;text-align: center;border-right: solid 1px grey">
                        RINCIAN PENERIMAAN</div>
                    <div
                        style="display: flex;flex-direction: column;flex:2.25;text-align: center;border-right: solid 1px grey">
                        KODE PERKIRAAN</div>
                    <div style="display: flex;flex-direction: column;flex:2.25;text-align: center;">JUMLAH</div>
                </div>
                @foreach ($dataBKM as $item)
                    <div style="display: flex;flex-direction: row;border-top: solid 1px grey">
                        <div
                            style="display: flex;flex-direction: column;flex:5.5;text-align: left;border-right: solid 1px grey;">
                            <p style="margin: 0;padding: 0 0 0 10px; font-size: small;">
                                {{ $item->NamaCust }} - {{ $item->Uraian }}
                            </p>
                        </div>
                        <div
                            style="display: flex;flex-direction: column;flex:2.25;text-align: center;border-right: solid 1px grey">
                            {{ $item->KodePerkiraan }}
                        </div>
                        <div style="display: flex;flex-direction: column;flex:2.25;text-align: right;">
                            <p style="margin: 0;padding: 0 10px 0 0">
                                {{ number_format($item->Nilai_Rincian, 2, '.', ',') }}
                            </p>
                        </div>
                    </div>
                @endforeach
                <div style="display: flex;flex-direction: row;border-top: solid 1px grey">
                    <div
                        style="display: flex;flex-direction: column;flex:7.75;text-align: right;border-right: solid 1px grey; font-weight: bold;">
                        GRAND TOTAL: </div>
                    <div style="display: flex;flex-direction: column;flex:2.25;text-align: center;font-weight: bold;">
                        Rp. {{ number_format($dataBKM[0]->Nilai_Pelunasan, 2, '.', ',') }}</div>
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
                    Sidoarjo, {{ $tanggalHariIni }}
                </div>
            </div>
        </div>
    </body>
