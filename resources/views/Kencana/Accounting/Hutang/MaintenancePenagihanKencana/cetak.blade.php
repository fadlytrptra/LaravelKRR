    @php
        dd($dataCetak);
        $subTotal = (float) 0;
        $total = (float) 0;
        $hargaSatuan = (float) 0;
        $hargaTerbayar = (float) 0;
    @endphp

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Cetak TT {{ $dataCetak[0]->Id_Penagihan }}</title>
        <style>
            body {
                margin: 15px;
                font-family: Tahoma, Arial, Helvetica, sans-serif;
                color: #111;
                font-size: 12px;
            }

            table tr td {
                border: 1px solid black;
            }
        </style>
    </head>

    <body>
        <div>
            <div style="display: flex;flex-direction: row;">
                <div style="display: flex;flex-direction: column;flex: 0.5;text-align: left;">
                    <label>PT. KENCANA RAJASA RAYA</label>
                    <label>Jl. Raya Tropodo No. 1</label>
                    <label>Waru - Sidoarjo</label>
                </div>
                <table style="flex: 0.5;border-collapse: collapse;font-size: 12px;">
                    <tr>
                        <td style="border:none;" colspan="3">Receipt Invoice</td>
                    </tr>
                    <tr>
                        <td style="border:none;">Receipt Number</td>
                        <td style="border:none;">:</td>
                        <td style="border:none;">{{ $dataCetak[0]->Id_Penagihan }}</td>
                    </tr>
                    <tr>
                        <td style="border:none;">Vendor Invoice</td>
                        <td style="border:none;">:</td>
                        <td style="border:none;">{{ $dataCetak[0]->Faktur }}</td>
                    </tr>
                    <tr>
                        <td style="border:none;">Due Date</td>
                        <td style="border:none;">:</td>
                        <td style="border:none;">{{ date('d-M-Y', strtotime($dataCetak[0]->Tempo)) }}</td>
                    </tr>
                    <tr>
                        <td style="border:none;">Create Date</td>
                        <td style="border:none;">:</td>
                        <td style="border:none;">{{ date('d-M-Y', strtotime($dataCetak[0]->Waktu_Penagihan)) }}</td>
                    </tr>
                </table>
                {{-- <div style="display: flex;flex-direction: row;flex: 0.5;text-align: right;">
                    <div style="display: flex;flex-direction: column;flex: 0.395;">
                        <label>Receipt Invoice</label>
                        <label>Invoice Number</label>
                        <label>Vendor Invoice</label>
                        <label>Due Date</label>
                        <label>Create Date</label>
                    </div>
                    <div style="display: flex;flex-direction: column;flex: 0.005;">
                        <label></label>
                        <label>:</label>
                        <label>:</label>
                        <label>:</label>
                        <label>:</label>
                    </div>
                    <div style="display: flex;flex-direction: column;flex: 0.60;">
                        <label></label>
                        <label>{{ $dataCetak[0]->Id_Penagihan }}</label>
                        <label>{{ $dataCetak[0]->Faktur }}</label>
                        <label>{{ $dataCetak[0]->Tempo }}</label>
                        <label>{{ $dataCetak[0]->Waktu_Penagihan }}</label>
                    </div>
                </div> --}}
            </div>
            <div style="display: flex;flex-direction: row;margin-top: 10px">
                <div style="display: flex;flex-direction: column;flex: 0.60;">
                    <label>{{ $dataCetak[0]->NM_SUP }}</label>
                    <label>{{ $dataCetak[0]->ALAMAT1 }}</label>
                    <label>{{ $dataCetak[0]->KOTA1 }}, {{ $dataCetak[0]->NEGARA1 }}</label>
                    <label>PHONE: {{ $dataCetak[0]->TLP1 }}, FAX: {{ $dataCetak[0]->FAX1 ?? '-' }}</label>
                </div>
            </div>
            <table style="width: 100%;border-collapse: collapse;margin-top: 10px;font-size: 12px;">
                <tr style="white-space: nowrap">
                    <td style="padding: 10px 5px 10px 5px; text-align: center;">No.</td>
                    <td style="padding: 10px 5px 10px 5px; text-align: center;">Receive Date</td>
                    <td style="padding: 10px 5px 10px 5px; text-align: center;">Delivery Order</td>
                    <td style="padding: 10px 5px 10px 5px; text-align: center;">PO</td>
                    <td style="padding: 10px 5px 10px 5px; text-align: center;">Description</td>
                    <td style="padding: 10px 5px 10px 5px; text-align: center;">Qty</td>
                    <td style="padding: 10px 5px 10px 5px; text-align: center;">Unit</td>
                    <td style="padding: 10px 5px 10px 5px; text-align: center;">Unit Price</td>
                    <td style="padding: 10px 5px 10px 5px; text-align: center;">Discount</td>
                    <td style="padding: 10px 5px 10px 5px; text-align: center;">Amount
                        {{ $dataCetak[0]->Id_MataUang_BC }}
                    </td>
                </tr>
                @foreach ($dataCetak as $index => $item)
                    <tr>
                        @php
                            $hargaSatuan =
                                $dataCetak[0]->Id_MataUang_BC == 'IDR' ? $item->Hrg_Satuan_Rp : $item->Hrg_Sat;
                            $hargaMurni =
                                $dataCetak[0]->Id_MataUang_BC == 'IDR' ? $item->Hrg_Murni_Rp : $item->Harga_Murni;
                            $hargaTerbayar =
                                $dataCetak[0]->Id_MataUang_BC == 'IDR'
                                    ? $item->Harga_TerbayarRp
                                    : $item->Harga_Terbayar;
                            $subTotal += (float) $hargaMurni;
                        @endphp
                        <td style="padding: 0 5px 0 5px">{{ $index + 1 }}</td>
                        <td style="padding: 0 5px 0 5px">{{ date('d-M-Y', strtotime($item->Datang)) }}</td>
                        <td style="padding: 0 5px 0 5px; white-space: nowrap;">{{ $item->No_SuratJalan }}</td>
                        <td style="padding: 0 5px 0 5px">{{ $item->No_sppb }}</td>
                        <td style="padding: 0 5px 0 5px">{{ $item->NAMA_BRG }}</td>
                        <td style="padding: 0 5px 0 5px">{{ number_format($item->Qty_Terima, 0, '.', ',') }}</td>
                        <td style="padding: 0 5px 0 5px">{{ $item->SatTerima }}</td>
                        <td style="padding: 0 5px 0 5px; white-space: nowrap;">
                            {{ $item->Symbol }}
                            {{ number_format($hargaSatuan, 4, '.', ',') }}
                        </td>
                        <td style="padding: 0 5px 0 5px">{{ number_format($item->Disc, 2, '.', ',') }}</td>
                        <td style="padding: 0 5px 0 5px; white-space: nowrap;">
                            {{ $item->Symbol }}
                            {{ number_format($hargaMurni, 4, '.', ',') }}
                        </td>

                    </tr>
                @endforeach
                @if ($dataCetak[0]->Status_PPN == 'Y')
                    @php
                        $dppAmount = ($subTotal * 11) / 12;
                    @endphp
                    <tr>
                        <td colspan="9" style="border: none;text-align: right;padding-right: 5px;">Subtotal</td>
                        <td style="border: none;padding: 0 0 0 5px;">{{ $dataCetak[0]->Symbol }}
                            {{ number_format($subTotal, 2, '.', ',') }} </td>
                    </tr>
                    <tr>
                        <td colspan="9" style="border: none;text-align: right;padding-right: 5px;">DPP</td>
                        <td style="border: none;padding: 0 0 0 5px;">{{ $dataCetak[0]->Symbol }}
                            {{ number_format($dppAmount, 2, '.', ',') }} </td>
                    </tr>
                    <tr>
                        <td colspan="9" style="border: none;text-align: right;padding-right: 5px;">PPN</td>
                        <td style="border: none;padding: 0 0 0 5px;">{{ $dataCetak[0]->Symbol }}
                            {{ number_format($dataCetak[0]->Harga_Ppn, 2, '.', ',') }} </td>
                    </tr>
                    @php
                        $total = collect($dataCetak)->sum(function ($item) {
                            return (float) $item->Harga_Terbayar;
                        });
                    @endphp
                    <tr>
                        <td colspan="9" style="border: none;text-align: right;padding-right: 5px;">Total</td>
                        <td style="border: none;padding: 0 0 0 5px;white-space: nowrap;">{{ $dataCetak[0]->Symbol }}
                            {{ number_format($total, 4, '.', ',') }} </td>
                    </tr>
                @else
                    @php
                        $total = $subTotal;
                    @endphp
                    <tr>
                        <td colspan="9" style="border: none;text-align: right;padding-right: 5px;">Total</td>
                        <td style="border: none;padding: 0 0 0 5px;">{{ $dataCetak[0]->Symbol }}
                            {{ number_format($total, 4, '.', ',') }} </td>
                    </tr>
                    @if ($dataCetak[0]->Id_MataUang_BC !== 'IDR')
                        <tr>
                            <td colspan="9" style="border: none;text-align: right;padding-right: 5px;">
                                Kurs IDR</td>
                            <td style="border: none;padding: 0 0 0 5px;">Rp.
                                {{ number_format($dataCetak[0]->Kurs_Rp, 2, '.', ',') }} </td>
                        </tr>
                        <tr>
                            <td colspan="9" style="border: none;text-align: right;padding-right: 5px;">
                                Total IDR</td>
                            <td style="border: none;padding: 0 0 0 5px;white-space: nowrap;">Rp.
                                {{ number_format($dataCetak[0]->Harga_TerbayarRp, 2, '.', ',') }} </td>
                        </tr>
                    @endif
                @endif
            </table>
            <div style="display: flex;flex-direction: row;margin-top: 10px;font-size: 12px;">
                <div style="display: flex;flex-direction: column;flex: 0.5;text-align: center;">
                    <label>Sender</label>
                    <br>
                    <br>
                    <br>
                    <br>
                    <label>____________________</label>
                </div>
                <div style="display: flex;flex-direction: column;flex: 0.5;text-align: center;">
                    <label>Receiver</label>
                    <br>
                    <br>
                    <br>
                    <br>
                    <label>____________________</label>
                </div>
            </div>
        </div>
    </body>
