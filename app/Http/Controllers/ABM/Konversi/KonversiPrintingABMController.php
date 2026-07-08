<?php

namespace App\Http\Controllers\ABM\Konversi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Exception;
use DB;
use Auth;
use DateTime;
use DateTimeZone;

class KonversiPrintingABMController extends Controller
{
    public function index()
    {
        $nomorUser = trim(Auth::user()->NomorUser);
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        return view('ABM.Konversi.Printing.BarcodePrinting', compact('access', 'nomorUser'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $dateTime = new DateTime("now", new DateTimeZone('Asia/Jakarta'));
        $date = $dateTime->format('Y-m-d');
        $Tgl_konversiRTR = $request->input('Tgl_konversiRTR');
        $shiftRTR = $request->input('shiftRTR');
        $idMesinRTR = $request->input('idMesinRTR');
        $hasilPCSRTR = (float) $request->input('hasilPCSRTR');
        $hasilKgRTR = (float) $request->input('hasilKgRTR');
        $totalAfalanSetting = (float) $request->input('totalAfalanSetting');
        $pemakaian_TritierAsal = (float) $request->input('pemakaian_TritierAsal');
        $pemakaian_typeSekunderAsal = (float) $request->input('pemakaian_typeSekunderAsal');
        $kodeBarangHasil = $request->input('kodeBarangHasil');
        $dataAsalKonversi = $request->input('dataAsalKonversi');
        $idOrderKerja = $request->input('idOrderKerja');
        $nomorOrderKerja = $request->input('nomorOrderKerja');
        $uraian_asal = (string) 'Group ' . $shiftRTR . ", Asal Konversi ABM Printing | Nomor Order Kerja: " . $nomorOrderKerja;
        $uraian_tujuan = (string) 'Group ' . $shiftRTR . ", Tujuan Konversi ABM Printing | Nomor Order Kerja: " . $nomorOrderKerja;
        $jumlahSekunderBarcodeSisa = $request->input('jumlahSekunderBarcodeSisa');
        $jumlahTritierBarcodeSisa = $request->input('jumlahTritierBarcodeSisa');
        $sisaBarcodeAsalManual = $request->boolean('sisaBarcodeAsalManual');
        $nomorUser = trim(Auth::user()->NomorUser);
        $sisaTritier = 0;
        $sisaSekunder = 0;
        $jumlahHasilKonversi = 1;
        $dataBarcode = [];
        DB::connection('ConnInventory')->beginTransaction();
        DB::connection('ConnABM')->beginTransaction();

        // === PROSES GET DATA BARCODE ASAL (tidak boleh minus) ===
        foreach ($dataAsalKonversi as $row) {
            $barcodeFull = $row[0];
            [$noIndeks, $kodeBarang] = explode('-', $barcodeFull);
            $result = DB::connection('ConnABM')
                ->select(
                    'EXEC SP_4384_ABM_Konversi_Printing @XKode = ?, @XKdBrg = ?, @XNomorIndeks = ?',
                    [2, $kodeBarang, $noIndeks]
                );
            $dataBarcode = array_merge($dataBarcode, $result);
        }
        // Loop through barcode results
        foreach ($dataBarcode as $barcodeObj) {
            // Build full barcode: pad NoIndeks to 9 digits
            $noIndeksPadded = str_pad($barcodeObj->NoIndeks, 9, '0', STR_PAD_LEFT);
            $fullBarcode = $noIndeksPadded . '-' . $barcodeObj->Kode_barang;

            // Find matching row in $dataAsalKonversi
            foreach ($dataAsalKonversi as $key => $asalRow) {
                if ($asalRow[0] === $fullBarcode) {
                    // Put IdType into index 7 (replace existing value)
                    $dataAsalKonversi[$key][8] = $barcodeObj->IdType;
                    $dataAsalKonversi[$key][9] = $barcodeObj->NamaType;
                    $dataAsalKonversi[$key][10] = $barcodeObj->SaldoPrimer;
                    $dataAsalKonversi[$key][11] = $barcodeObj->SaldoSekunder;
                    $dataAsalKonversi[$key][12] = $barcodeObj->SaldoTritier;
                    $dataAsalKonversi[$key][13] = $barcodeObj->IdSubkelompok;
                }
            }
        }

        $grouped = [];

        foreach ($dataAsalKonversi as $row) {
            $idType = $row[8];

            if (!isset($grouped[$idType])) {
                $grouped[$idType] = [
                    'IdType' => $idType,
                    'sumQty' => 0,
                    'sumQtySek' => 0,
                    'sumQtyPrimer' => 0,
                    'NamaType' => '',
                    'SaldoPrimer' => 0,
                    'SaldoSekunder' => 0,
                    'SaldoTritier' => 0
                ];
            }

            $grouped[$idType]['sumQty'] += (float) $row[6];
            $grouped[$idType]['sumQtySek'] += (float) $row[5];
            $grouped[$idType]['sumQtyPrimer'] += (float) $row[2];
            $grouped[$idType]['NamaType'] = $row[9];
            $grouped[$idType]['SaldoPrimer'] = (float) $row[10];
            $grouped[$idType]['SaldoSekunder'] = (float) $row[11];
            $grouped[$idType]['SaldoTritier'] = (float) $row[12];
        }

        // === PROSES CEK SALDO ASAL (berdasarkan id type) ===
        foreach ($grouped as $row) {
            $cekSaldo = $row['SaldoPrimer'] < $row['sumQtyPrimer']
                || $row['SaldoSekunder'] < $row['sumQtySek']
                || $row['SaldoTritier'] < $row['sumQty'];

            if ($cekSaldo) {
                return response()->json([
                    'error' => (string) "Saldo tidak mencukupi untuk type {$row['NamaType']} ",
                    'detail' => [
                        'IdType' => $row['IdType'],
                        'NamaType' => $row['NamaType'],
                        'SaldoPrimer' => $row['SaldoPrimer'],
                        'SaldoSekunder' => $row['SaldoSekunder'],
                        'SaldoTritier' => $row['SaldoTritier'],
                        'PengeluaranSekunder' => $row['sumQtySek'],
                        'PengeluaranTritier' => $row['sumQty'],
                    ],
                ], 400);
            }
        }

        try {
            // === GENERATE ID KONVERSI ===
            $currentIdKonvPotongABM = DB::connection('ConnInventory')
                ->table('Counter')->value('IdKonvPotongABM');
            $newIdKonvPotongABM = $currentIdKonvPotongABM + 1;
            DB::connection('ConnInventory')
                ->table('Counter')->update(['IdKonvPotongABM' => $newIdKonvPotongABM]);
            $idkonversi = "ABP" . str_pad($newIdKonvPotongABM, 6, "0", STR_PAD_LEFT);

            //= INSERT PERMOHONAN INTO TMP_TRANSAKSI =

            //== INSERT ASAL KONVERSI ==
            for ($i = 0; $i < count($dataAsalKonversi); $i++) {
                $uraian_asal = (string) $uraian_asal . ' | Sisa Persen Tritier: ' . $dataAsalKonversi[$i][7];
                DB::connection('ConnABM')
                    ->statement('EXEC SP_4384_ABM_Konversi_Printing
                        @XKode = ?,
                        @XUraianDetailTransaksi = ?,
                        @XIdType = ?,
                        @XIdPenerima = ?,
                        @XIdPemberi = ?,
                        @XSaatAwalTransaksi = ?,
                        @XSaatLog = ?,
                        @XJumlahPengeluaranPrimer = ?,
                        @XJumlahPengeluaranSekunder = ?,
                        @XJumlahPengeluaranTritier = ?,
                        @XAsalIdSubkelompok = ?,
                        @XIdKonversi = ?,
                        @XTimeInput = ?,
                        @XStatus = ?,
                        @XNomorIndeks = ?,
                        @XKdBrg = ?',
                        [
                            3,
                            $uraian_asal,
                            $dataAsalKonversi[$i][8],
                            trim(Auth::user()->NomorUser),
                            trim(Auth::user()->NomorUser),
                            $Tgl_konversiRTR,
                            $date,
                            $dataAsalKonversi[$i][2],
                            $dataAsalKonversi[$i][3],
                            $dataAsalKonversi[$i][4],
                            $dataAsalKonversi[$i][13],
                            $idkonversi,
                            $dateTime,
                            0,
                            explode('-', $dataAsalKonversi[$i][0])[0],
                            explode('-', $dataAsalKonversi[$i][0])[1]
                        ]
                    );
            }
        } catch (Exception $ex) {
            DB::connection('ConnInventory')->rollBack();
            DB::connection('ConnABM')->rollBack();
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $ex->getMessage(), 'errorDetail' => $ex]);
        }

        try {
            //== INSERT TUJUAN KONVERSI ==

            //=== PREPARE VARIABLES FOR PROCESS "INSERT TUJUAN KONVERSI" ===
            $DataTypeTujuan = DB::connection('ConnABM')
                ->select(
                    'EXEC SP_4384_ABM_Konversi_Printing @XKode = ?, @XKdBrg = ?, @XIdMesin = ?, @XIdOrder = ?',
                    [5, $kodeBarangHasil, $idMesinRTR, $idOrderKerja]
                );

            if (count($DataTypeTujuan) < 1) {
                return response()->json([
                    'error' => (string) 'Belum ada id type tujuan untuk kode barang ' . $kodeBarangHasil . '. Dipersilahkan cek type tujuannya dulu.',
                ]);
            }

            foreach ($dataAsalKonversi as $row) {
                $sisaTritier = $row[4] - $row[6];
                $sisaSekunder = $row[3] - $row[5];
                $sisaPersen = (float) $row[7];
                if ($sisaTritier !== (float) 0 && $sisaSekunder !== (float) 0 && $sisaBarcodeAsalManual) {
                    $jumlahHasilKonversi = 2;
                    $IdTypeTujuan = [$DataTypeTujuan[0]->IdType, $row[8]];
                    $JumlahMasukSekunder = [$hasilPCSRTR, $jumlahSekunderBarcodeSisa];
                    $JumlahMasukTritier = [$hasilKgRTR, $jumlahTritierBarcodeSisa];
                    $idSubkelompokTujuan = [$DataTypeTujuan[0]->IdSubkelompok, $row[13]];
                    $uraian_tujuanKonversi = [
                        $uraian_tujuan,
                        (string) 'Group ' . $shiftRTR . ', Sisa Konversi ABM Printing | Nomor Order Kerja: ' . $nomorOrderKerja . ' | Sisa Persen: ' . $sisaPersen
                    ];
                } else {
                    $jumlahHasilKonversi = 1;
                    $IdTypeTujuan = [$DataTypeTujuan[0]->IdType];
                    $JumlahMasukSekunder = [$hasilPCSRTR];
                    $JumlahMasukTritier = [$hasilKgRTR];
                    $idSubkelompokTujuan = [$DataTypeTujuan[0]->IdSubkelompok];
                    $uraian_tujuanKonversi = [$uraian_tujuan];
                }
            }

            for ($k = 0; $k < $jumlahHasilKonversi; $k++) {
                DB::connection('ConnABM')
                    ->statement('EXEC SP_4384_ABM_Konversi_Printing
                            @XKode = ?,
                            @XUraianDetailTransaksi = ?,
                            @XIdType = ?,
                            @XIdPenerima = ?,
                            @XIdPemberi = ?,
                            @XSaatAwalTransaksi = ?,
                            @XSaatLog = ?,
                            @XJumlahMasukPrimer = ?,
                            @XJumlahMasukSekunder = ?,
                            @XJumlahMasukTritier = ?,
                            @XTujuanIdSubKel = ?,
                            @XIdKonversi = ?,
                            @XTimeInput = ?,
                            @XStatus = ?',
                        [
                            3,
                            $uraian_tujuanKonversi[$k],
                            $IdTypeTujuan[$k],
                            trim(Auth::user()->NomorUser),
                            trim(Auth::user()->NomorUser),
                            $Tgl_konversiRTR,
                            $date,
                            1,
                            $JumlahMasukSekunder[$k],
                            $JumlahMasukTritier[$k],
                            $idSubkelompokTujuan[$k],
                            $idkonversi,
                            $dateTime,
                            0,
                        ]
                    );
            }

            DB::connection('ConnInventory')->commit();
            DB::connection('ConnABM')->commit();
            // ACC Konversi
            DB::connection('ConnABM')
                ->statement('EXEC SP_4384_ABM_Konversi_Printing @XKode = ?, @XIdKonversi = ?, @XKdUser = ?', [6, $idkonversi, $nomorUser]);

            // SELECT BARCODE AFTER ACC
            $barcodeHasil = DB::connection('ConnABM')
                ->select('EXEC SP_4384_ABM_Konversi_Printing @XKode = ?, @XIdKonversi = ?', [7, $idkonversi]);

            $barcode = [];

            foreach ($barcodeHasil as $item) {
                $formattedCode = str_pad($item->NoIndeks, 9, '0', STR_PAD_LEFT) . '-' . $item->Kode_barang;

                $barcode[] = [
                    'code' => $formattedCode,
                    'NAMA_BRG' => trim($item->NAMA_BRG),
                    'Qty_Primer' => (float) $item->Qty_Primer,
                    'Qty_sekunder' => $item->Qty_sekunder,
                    'Qty' => $item->Qty,
                    'Satuan_Primer' => $item->Satuan_Primer,
                    'Satuan_sekunder' => $item->Satuan_sekunder,
                    'Satuan' => $item->Satuan,
                    'Tgl_mutasi' => $item->Tgl_mutasi
                ];
            }

            return response()->json([
                'success' => 'Proses konversi dengan Id Konversi: ' . $idkonversi . ' berhasil!',
                'barcode' => $barcode
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage(), 'errorDetail' => $e]);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDataKonversiRTR') {
            $nomorIndeksBarangAsal = (int) $request->input('nomorIndeksBarangAsal');
            $kodeBarangAsal = $request->input('kodeBarangAsal');
            try {
                $dataBarcode = DB::connection('ConnABM')
                    ->select(
                        'EXEC SP_4384_ABM_Konversi_Printing @XKode = ?, @XKdBrg = ?, @XNomorIndeks = ?',
                        [2, $kodeBarangAsal, $nomorIndeksBarangAsal]
                    );

                if (str_contains($dataBarcode[0]->idkonversi_barcode, 'ABP')) {
                    return response()->json(['error' => (string) "Barcode sudah pernah discan dengan id konversi: " . $dataBarcode[0]->idkonversi_barcode]);
                } else {
                    return response()->json(['success' => true, 'dataBarcode' => $dataBarcode]);
                }
            } catch (Exception $e) {
                if ($e->getMessage() == 'Undefined array key 0') {
                    return response()->json(['error' => (string) "Terjadi Kesalahan, Data Barcode Tidak Ditemukan!"]);
                } else {
                    return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
                }
            }
        } else if ($id == 'getDataMesin') {
            try {
                $dataMesin = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Konversi_Printing @XKode = ?', [4]);

                return response()->json(['success' => true, 'dataMesin' => $dataMesin]);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($id == 'getBarcodeAktif') {
            try {
                $dataBarcode = DB::connection('ConnABM')
                    ->select('EXEC SP_4384_ABM_Konversi_Printing @XKode = ?', [8]);

                return datatables($dataBarcode)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($id == 'getDataBarcodeKonversiRTR') {
            try {
                $idTransaksi = $request->input('idTransaksi');
                $barcodeHasil = DB::connection('ConnABM')
                    ->select('EXEC SP_4384_ABM_Konversi_Printing @XKode = ?, @XIdTrans = ?', [9, $idTransaksi]);

                $barcode = [];

                foreach ($barcodeHasil as $item) {
                    $formattedCode = str_pad($item->NoIndeks, 9, '0', STR_PAD_LEFT) . '-' . $item->Kode_barang;

                    $barcode[] = [
                        'code' => $formattedCode,
                        'NAMA_BRG' => trim($item->NAMA_BRG),
                        'Qty_Primer' => (float) $item->Qty_Primer,
                        'Qty_sekunder' => $item->Qty_sekunder,
                        'Qty' => $item->Qty,
                        'Satuan_Primer' => $item->Satuan_Primer,
                        'Satuan_sekunder' => $item->Satuan_sekunder,
                        'Satuan' => $item->Satuan,
                        'Tgl_mutasi' => $item->Tgl_mutasi
                    ];
                }
                if (count($barcode) > 0) {
                    return response()->json([
                        'success' => 'Barcode bisa dicetak!',
                        'barcode' => $barcode
                    ]);
                } else {
                    return response()->json([
                        'error' => 'Barcode tidak ditemukan!',
                    ]);
                }
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $id]);
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
