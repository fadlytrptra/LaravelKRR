{{-- catatan settingan print: A4, landscape, margin:default, scale:default --}}
<script src="{{ asset('js/jquery-3.1.0.js') }}" loading=lazy></script>
<link href="{{ asset('css/app.css') }}" rel="stylesheet">
<script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
<style>
    label {
        margin-bottom: 0 !important
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    table,
    th,
    td {
        border: 1px solid black;
    }

    th,
    td {
        text-align: center;
        font-weight: normal;
        /* no bold */
        font-size: 12px;
        /* smaller font */
    }

    /* Set empty row height */
    td {
        height: 0.9cm;
    }

    #tableTTD td {
        height: 2cm;
    }

    #tableTTD th,
    #tableTTD td {
        width: 25%;
    }

    .line-text {
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }

    .line-checkbox:checked+.line-text {
        background-color: yellow;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }

    @media print {
        @page {
            size: A4 landscape !important;
        }

        #printArea {
            margin: 0;
        }

        #catatanPrint {
            display: none;
        }

        .line-checkbox {
            display: none;
        }

        /* Keep highlight visible in print */
        .line-checkbox:checked+.line-text {
            background-color: yellow !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
    }
</style>
<div class="m-2" style="width: 99%; height: 20cm; border: 1px solid black;" id="printArea" contenteditable="true">
    <div class="d-flex" style="width: 100%; font-size: smaller; line-height: 1.25; border-bottom: 1px solid black;">
        <div class="d-flex flex-column"
            style="flex: 0.5; border-right: 1px solid black; align-items: center; align-content: center;">
            <div style="flex: 0.3">
                <label>PT. Kerta Rajasa Raya</label>
            </div>
            <div style="flex: 0.3">
                <label>Woven Bag . Jumbo Bag Industrial</label>
            </div>
            <div style="flex: 0.3">
                <label>(FM-7,5-02-WB-01-02)</label>
            </div>
        </div>
        <div class="d-flex flex-column" style="flex: 0.15;">
            <div class="pl-1" style="flex: 0.5; align-content: center; border-bottom: 1px solid black;">
                <label>No. Order Kerja </label>
            </div>
            <div class="pl-1" style="flex: 0.5; align-content: center;">
                <label>Tgl. Berlaku </label>
            </div>
        </div>
        <div class="d-flex flex-column" style="flex: 0.001;">
            <div style="flex: 0.5; align-content: center; border-bottom: 1px solid black;">
                <label>:</label>
            </div>
            <div style="flex: 0.5; align-content: center;">
                <label>:</label>
            </div>
        </div>
        <div class="d-flex flex-column" style="flex: 0.199; border-right: 1px solid black;">
            <div class="pl-1" style="flex: 0.5; align-content: center; border-bottom: 1px solid black;">
                <label id="title_noReferensi">{{ $dataDetailOrderKerja[0]->No_OK }}</label>
            </div>
            <div class="pl-1" style="flex: 0.5; align-content: center;">
                <label
                    id="title_tglBerlaku">{{ $dataDetailOrderKerja[0]->TanggalInput ? \Carbon\Carbon::parse($dataDetailOrderKerja[0]->TanggalInput)->format('d-m-Y') : '' }}
                </label>
            </div>
        </div>
        <div class="d-flex flex-column" style="flex: 0.15;">
            <div style="flex: 0.3; text-align: center; border-bottom: 1px solid black;">
                <label>Order Kerja ABM</label>
            </div>
            <div style="flex: 0.7; align-content: end; text-align: center;">
                <label class="m-0">LOKAL / EXPORT</label>
            </div>
        </div>
    </div>

    <div class="d-flex p-3" style="width: 100%; height: calc(100% - 40px);font-size: 10px;">
        <div class="d-flex" style="width: 100%; height: 100%; border: 1px solid black;">
            <div class="d-flex flex-column p-1" style="flex: 0.3;">
                @php
                    // dd($dataDetailOrderKerja);
                    $JumlahKBStghJadi = $dataDetailOrderKerja[0]->JumlahKBStghJadi ?? '0';
                    $jumlahWarna = explode(' | ', $dataDetailOrderKerja[0]->WarnaPrinting)[0];
                    $packingWoven = explode(' | ', $dataDetailOrderKerja[0]->Packing);
                    $pakaiMemo = $dataDetailOrderKerja[0]->DataMemo;
                    if ($pakaiMemo) {
                        $arrayDataMemo = explode(' | ', $pakaiMemo);
                    }
                @endphp
                <div class="d-flex" style="flex: 0.75">
                    <div style="flex:0.38; white-space: nowrap;">
                        <label>NO. ORDER KERJA</label><br>
                        <label>UKURAN</label><br>
                        <label>POTONG</label><br>
                        <label>JAHIT ATAS</label><br>
                        <label>JAHIT BAWAH</label><br>
                        <label>RAJUTAN</label><br>
                        <label>DENIER</label><br>
                        <label>WARNA KARUNG</label><br>
                        @for ($i = 0; $i < $jumlahWarna; $i++)
                            <label>WARNA PRINT {{ $i + 1 }}</label><br>
                        @endfor
                        <label>CORAK PRINTING</label><br>
                        <label>INNER</label><br>
                        <label>KERTAS</label><br>
                        <label>KB PRINTING</label><br>
                        {{-- <label>NAMA BARANG PRINTING</label><br> --}}
                        @for ($i = 0; $i < $JumlahKBStghJadi; $i++)
                            <label>KB SET. JADI {{ $i + 1 }}</label><br>
                        @endfor
                        {{-- <label>NAMA BARANG SET. JADI</label><br> --}}
                        <label>JUMLAH</label><br>
                        <label>TGL. MULAI</label><br>
                        <label>SELESAI</label><br>
                        <label>SP. NO.</label><br>
                        <label>NAMA CUSTOMER</label><br>
                        <label>KODE BARANG JADI</label><br>
                        <label>PACKING</label>
                    </div>
                    <div style="flex: 0.001">
                        {{-- <label>:</label><br>
                        <label>:</label><br> --}}
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        @for ($i = 0; $i < $jumlahWarna; $i++)
                            <label>:</label><br>
                        @endfor
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        @for ($i = 0; $i < $JumlahKBStghJadi; $i++)
                            <label>:</label><br>
                        @endfor
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label>
                    </div>
                    <div class="pl-2" style="flex: 0.619;white-space: nowrap;">
                        <label>{{ $dataDetailOrderKerja[0]->No_OK }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->Ukuran ?? '-' }}</label>&nbsp;CM<br>
                        <label>{{ $dataDetailOrderKerja[0]->PotongWoven ?? '-' }}</label>&nbsp;CM<br>
                        <label>{{ $dataDetailOrderKerja[0]->JahitAtasWoven ?? '-' }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->JahitBawahWoven ?? '-' }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->Rajutan ?? '-' }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->Denier ?? 0 }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->WarnaKarungWoven }}</label><br>
                        @for ($i = 0; $i < $jumlahWarna; $i++)
                            <label>{{ explode(' | ', $dataDetailOrderKerja[0]->WarnaPrinting)[$i + 1] }}</label><br>
                        @endfor
                        <label>{{ $dataDetailOrderKerja[0]->CorakPrinting ?? '-' }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->InnerWoven ?? '-' }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->KertasWoven ?? '-' }} GSM</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->KBPrintingWoven ?? '-' }}</label><br>
                        @for ($i = 0; $i < $JumlahKBStghJadi; $i++)
                            @php
                                $field = $i == 0 ? 'KBSetengahJadiWoven' : "KBSetengahJadiWoven{$i}";
                            @endphp

                            <label>{{ $dataDetailOrderKerja[0]->$field ?? '-' }}</label><br>
                        @endfor
                        @if ($pakaiMemo)
                            <label>{{ number_format($arrayDataMemo[2] ?? 0, 2, '.', ',') ?? 0 }} &nbsp;
                                {{ $dataDetailOrderKerja[0]->Satuan }}
                            </label><br>
                        @else
                            <label>{{ number_format($dataDetailOrderKerja[0]->Qty ?? 0, 2, '.', ',') ?? 0 }} &nbsp;
                                {{ $dataDetailOrderKerja[0]->Satuan }}
                            </label><br>
                        @endif
                        <label>
                            {{ $dataDetailOrderKerja[0]->TanggalRencanaMulaiKerja ?? '' }}
                        </label><br>
                        <label>
                            {{ $dataDetailOrderKerja[0]->TanggalRencanaSelesaiKerja ?? '' }}
                        </label><br>
                        @if ($pakaiMemo)
                            <label>{{ $arrayDataMemo[0] }}</label><br>
                            <label>{{ $arrayDataMemo[1] }}</label><br>
                            <label>{{ $arrayDataMemo[3] }}</label><br>
                        @else
                            <label>{{ $dataDetailOrderKerja[0]->IDSuratPesanan }}</label><br>
                            <label>{{ $dataDetailOrderKerja[0]->NamaCust }}</label><br>
                            <label>{{ $dataDetailOrderKerja[0]->KodeBarang }}</label><br>
                        @endif
                        <label>{{ $packingWoven[0] }}</label>
                        @if (count($packingWoven) > 1)
                            <br>
                            <label
                                style="background-color: yellow;-webkit-print-color-adjust: exact;print-color-adjust: exact;">
                                {{ $packingWoven[1] }}
                            </label>
                        @endif
                    </div>
                </div>
                <div style="flex: 0.25; border-top: 1px solid black; white-space: nowrap;text-align: center;">
                    <label>Keterangan</label><br>
                    @php
                        $keterangan = $dataDetailOrderKerja[0]->Keterangan ?? '-';
                        $lines = preg_split('/\r\n|\r|\n/', $keterangan);
                        $highlighted = explode(',', $dataDetailOrderKerja[0]->KeteranganHighlight ?? '[]');
                    @endphp

                    @foreach ($lines as $index => $line)
                        @php
                            // Insert line breaks every 45 characters
                            $line = wordwrap($line, 90, '<br>');
                        @endphp
                        <div class="line-item" style="display: flex; margin-bottom: 0px;">
                            <input type="checkbox" id="line_{{ $index }}" class="line-checkbox"
                                style="margin-right: 6px;" {{ in_array($index, $highlighted) ? 'checked' : '' }}>
                            <label for="line_{{ $index }}" style="text-align: left;"
                                class="line-text">{!! $line !!}</label>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="d-flex flex-column p-1" style="flex: 0.35;">
                <table>
                    <tr>
                        <th>TGL</th>
                        <th>SHIFT</th>
                        <th>SELESAI</th>
                        <th>SALDO</th>
                    </tr>
                    @for ($i = 0; $i < 14; $i++)
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    @endfor
                </table>
                @if ($dataDetailOrderKerja[0]->SisaSaldoInventory > 0)
                    <div style="position: relative; height: 0;">
                        <label id="label_saldoSisa" style="position: absolute; top: -12.3cm; left: 0.1cm;">
                            Saldo Sisa
                            {{ number_format($dataDetailOrderKerja[0]->SisaSaldoInventory ?? 0, 0, '.', ',') ?? 0 }}
                            {{ $dataDetailOrderKerja[0]->Satuan }}
                        </label>
                    </div>
                @endif
                @if ($dataDetailOrderKerja[0]->ContohPacking)
                    <div id="imagePreview" style="padding: 10px;text-align: center;">
                        <h5 for="imagePreview">Contoh Packing</h5>
                        <img id="previewImg" src="data:image/png;base64,{{ $dataDetailOrderKerja[0]->ContohPacking }}"
                            alt="Image Contoh Packing" style="height: 130px; width: 250px;;display: block; border: 1px solid black;">
                    </div>
                @endif
            </div>
            <div class="d-flex flex-column p-1" style="flex: 0.35; gap: 5px;">
                <table>
                    <tr>
                        <th>TGL</th>
                        <th>SHIFT</th>
                        <th>SELESAI</th>
                        <th>SALDO</th>
                    </tr>
                    @for ($i = 0; $i < 14; $i++)
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    @endfor
                </table>

                <table id="tableTTD">
                    <tr>
                        <th>PEMBUAT</th>
                        <th>MANAGER</th>
                        <th>MANAGER QC</th>
                        <th>ABM</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="p-2" id="catatanPrint" style="color: red; font-weight: bold;">
    <label>Saat print harap pastikan sudah sesuai dengan settingan berikut: </label>
    <br>
    <label>-Margin: Minimal</label>
    <br>
    <label>-Scale: Default</label>
    <br>
    <label>-Paper Size: A4</label>
</div>
<script>
    // Setup global AJAX handlers
    $.ajaxSetup({
        beforeSend: function() {
            // Show the loading screen before the AJAX request
            $("#loading-screen").css("display", "flex");
        },
        complete: function() {
            // Hide the loading screen after the AJAX request completes
            $("#loading-screen").css("display", "none");
        },
    });
    document.querySelectorAll('.line-checkbox').forEach(cb => {
        cb.addEventListener('change', () => {
            let selected = [...document.querySelectorAll('.line-checkbox:checked')]
                .map(cb => parseInt(cb.id.replace('line_', '')));
            // console.log($dataDetailOrderKerja[0]);

            $.ajax({
                url: "/MaintenanceOrderKerjaABM",
                method: "POST",
                data: {
                    jenisStore: "editHighlightKeteranganOrderKerja",
                    idOrder: {{ $dataDetailOrderKerja[0]->IdOrder }},
                    KeteranganHighlight: selected,
                    _token: '{{ csrf_token() }}',
                },
                dataType: "json",
                success: function(data) {
                    if (data.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: data.error,
                        });
                    }
                },
                error: function(xhr, status, error) {
                    let errorMessage = "Terjadi kesalahan saat memproses data.";
                    if (xhr.responseText) {
                        try {
                            const json = JSON.parse(xhr.responseText);
                            if (json.message) {
                                errorMessage = json.message;
                            } else {
                                errorMessage = xhr.responseText;
                            }
                        } catch (e) {
                            errorMessage = xhr.responseText;
                        }
                    }

                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: errorMessage,
                    });

                    console.error("AJAX Error:", {
                        status: status,
                        error: error,
                        response: xhr.responseText,
                    });
                },
            });
        });
    });
</script>
