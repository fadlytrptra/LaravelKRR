<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class PengajuanBKKKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.PengajuanBKK', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $Pjk = (bool) $request->input('pjk');
        $proses = $request->input('proses');
        $TT = (bool) $request->input('TT');
        $nomorUser = trim(Auth::user()->NomorUser);
        $TdkDP = (bool) $request->input('TdkDP');
        $AdaDP = (bool) $request->input('AdaDP');
        $TPajak = trim($request->input('pajak'));
        $TIDPembayaran = $request->input('id_pembayaran');
        $TBank = $request->input('id_bank');
        $TIdJnsByr = $request->input('id_jnsbayar');
        $TJmlByr = $request->input('jumlah_bayar');
        // $TNilaiBayar = floatval($request->input('nilai_pembayaran'));
        // $cleaned_value = str_replace(".", "", $request->input('nilai_pembayaran'));
        // $cleaned_value = str_replace(",", ".", $cleaned_value);
        $TNilaiBayar = (float) str_replace(",", "", $request->input('nilai_pembayaran'));
        $TIdTT = trim($request->input('Id_Penagihan'));
        $TKodePerkiraan = trim($request->input('NoKodePerkiraan'));
        $TRincian_DP = $request->input('rincian_dp');
        $TNilaiByrSbl = $request->input('nilai_pembayaran2');
        $TIDBKK_DP = $request->input('id_bkk');
        $TBKK_DP = $request->input('bkk_uangmuka');
        $TIDByr_DP = $request->input('id_bayardp');
        $TSisaByr = (float) str_replace(",", "", $request->input('belum_dibayar'));
        $Bayar = (bool) $request->input('bayar');
        $DP = (bool) $request->input('dp');
        $TIDSupplier = $request->input('supplier1');
        $kurs_value = str_replace(",", "", $request->input('kurs'));
        // $kurs_value = str_replace(",", ".", $kurs_value);
        $txtKurs = (float) $kurs_value;
        // $txtKurs = $request->input('kurs');
        $TBKM = $request->input('ada_bkm');
        $idMataUang = $request->input('mata_uang_kanan');
        $DP_lagi = 0;
        // dd($request->all());
        // dd($Pjk);
        switch ($proses) {
            case 1:
                if ($TT) {
                    if (!$TdkDP && !$AdaDP) {
                        return response()->json(['error' => 'Pilih dulu!!..ADA DP atau TIDAK ada DP ..']);
                    }

                    // if ($TPajak == "Ada Pajak") {
                    //     if ($this->confirm('Pembayaran Pajak di pisah ? ')) {
                    //         $Pjk = true;
                    //     }
                    // } else {
                    //     if (!$this->confirm('Dibayar Penuh ? ')) {
                    //         $Pjk = true;
                    //     }
                    // }

                    if ($Pjk) {
                        DB::connection('ConnKCNAccounting')
                            ->statement('EXEC SP_1273_PRG_INS_BKK2_ACUAN_TDKPENUH @IdPembayaran = ?, @UserId = ?, @KodePerkiraan = ?', [
                                $TIDPembayaran,
                                $nomorUser,
                                $TKodePerkiraan
                            ]);
                    }

                    if ($TNilaiBayar && $TdkDP) {
                        // dd(
                        //     (int) $TIDPembayaran,
                        //     $TBank,
                        //     (int) $TIdJnsByr,
                        //     (int) $TJmlByr,
                        //     $TNilaiBayar,
                        //     $TIdTT
                        // );
                        DB::connection('ConnKCNAccounting')
                            ->statement('EXEC SP_1273_PRG_UDT_BKK2_ACUAN_TTNODP @IdPembayaran = ?, @IdBank = ?, @IdJenisBayar = ?, @JmlJenisBayar = ?, @NilaiRincian = ?, @IdPenagihan = ?, @KodePerkiraan = ?', [
                                (int) $TIDPembayaran,
                                $TBank,
                                (int) $TIdJnsByr,
                                (int) $TJmlByr,
                                $TNilaiBayar,
                                $TIdTT,
                                $TKodePerkiraan
                            ]);
                        return response()->json(['message' => 'Data Pengajuan Penagihan sudah diSIMPAN !!..']);
                    } elseif ($TNilaiBayar && $AdaDP) {
                        if ($DP_lagi == 0) {
                            DB::connection('ConnKCNAccounting')
                                ->statement('EXEC SP_1273_PRG_INS_BKK2_ACUAN_TTDP_1 @IdPembayaran = ?, @IdPenagihan = ?, @IdBank = ?, @IdJenisBayar = ?, @IdMataUang = ?, @JmlJenisBayar = ?, @Rincian = ?, @NilaiRincian = ?, @UserId = ?, @idBKK = ?, @KodePerkiraan = ?', [
                                    $TIDPembayaran,
                                    $TIdTT,
                                    $TBank,
                                    $TIdJnsByr,
                                    $idMataUang,
                                    $TJmlByr,
                                    $TRincian_DP,
                                    $TNilaiByrSbl,
                                    $nomorUser,
                                    $TIDBKK_DP,
                                    $TKodePerkiraan
                                ]);
                        } else {
                            DB::connection('ConnKCNAccounting')
                                ->statement('EXEC SP_1273_PRG_INS_BKK2_ACUAN_TTDP_2 @IdPembayaran = ?, @IdPenagihan = ?, @Rincian = ?, @NilaiRincian = ?, @UserId = ?, @idBKK = ?, @KodePerkiraan = ?', [
                                    $TIDPembayaran,
                                    $TIdTT,
                                    $TRincian_DP,
                                    $TNilaiByrSbl,
                                    $nomorUser,
                                    $TBKK_DP,
                                    $TKodePerkiraan
                                ]);
                        }
                        DB::connection('ConnKCNAccounting')
                            ->statement('EXEC SP_1273_PRG_UDT_BKK2_ACUAN_SALDO @IdPembayaran = ?, @Saldo = ?', [
                                $TIDByr_DP,
                                $TSisaByr
                            ]);
                        return response()->json(['message' => 'Data Pengajuan Penagihan sudah diSIMPAN !!..']);
                    } else {
                        return response()->json(['error' => 'Data Pengajuan TIDAK DAPAT diPROSES, Nilai Rincian = 0(Nol) !!..']);
                    }
                } else {
                    if ($Bayar) {
                        $recTrans = DB::connection('ConnKCNAccounting')
                            ->statement('EXEC SP_1273_PRG_INS_BKK2_ACUAN_NOTT_BAYAR
                            @IdBank = ?,
                            @IdJenisBayar = ?,
                            @IdMataUang = ?,
                            @JmlJenisBayar = ?,
                            @Rincian = ?,
                            @NilaiRincian = ?,
                            @UserId = ?,
                            @supp = ?,
                            @kurs = ?,
                            @KodePerkiraan = ?', [
                                $TBank,
                                $TIdJnsByr,
                                $idMataUang,
                                $TJmlByr,
                                $request->input('rincian'),
                                $TNilaiBayar,
                                $nomorUser,
                                $TIDSupplier,
                                $txtKurs,
                                $TKodePerkiraan
                            ]);
                        if ($recTrans) {
                            $IdPenagihan = DB::connection('ConnKCNAccounting')
                                ->table('T_PEMBAYARAN_TAGIHAN')
                                ->select('Id_Penagihan')
                                ->orderBy('Tgl_Input', 'desc')
                                ->first();
                            $TIdTT = $IdPenagihan->Id_Penagihan;
                            // dd($TIdTT);
                        }
                    } else if ($DP) {
                        $recTrans = DB::connection('ConnKCNAccounting')
                            ->statement('EXEC SP_1273_PRG_INS_BKK2_ACUAN_NOTT_DP @IdBank = ?, @IdJenisBayar = ?, @IdMataUang = ?, @JmlJenisBayar = ?, @Rincian = ?, @NilaiRincian = ?, @idSuplier = ?, @UserId = ?, @kurs = ?, @saldo = ?, @KodePerkiraan = ?', [
                                $TBank,
                                $TIdJnsByr,
                                $idMataUang,
                                $TJmlByr,
                                $request->input('rincian'),
                                $TNilaiBayar,
                                $TIDSupplier,
                                $nomorUser,
                                $txtKurs,
                                $TNilaiBayar,
                                $TKodePerkiraan
                            ]);
                        if ($recTrans) {
                            $IdPenagihan = DB::connection('ConnKCNAccounting')
                                ->table('T_PEMBAYARAN_TAGIHAN')
                                ->select('Id_Penagihan')
                                ->orderBy('Tgl_Input', 'desc')
                                ->first();
                            $TIdTT = $IdPenagihan->Id_Penagihan;
                            // dd($TIdTT);
                        }
                    }
                    if ($TBKM) {
                        DB::connection('ConnKCNAccounting')
                            ->statement('EXEC SP_1273_PRG_UDT_BKM_DIBAYAR @bkm = ?, @Nilai = ?', [
                                $TBKM,
                                $TNilaiBayar
                            ]);
                        $TBKM = "";
                    }
                    return response()->json(['message' => 'Data Pengajuan NON Penagihan sudah diSIMPAN !!..']);
                }

            case 2:
                DB::connection('ConnKCNAccounting')
                    ->statement('EXEC SP_1273_PRG_UDT_BKK2_ACUAN ?, ?, ?, ?, ?, ?, ?', [
                        $TIDPembayaran,
                        $TBank,
                        $TIdJnsByr,
                        $idMataUang,
                        $TJmlByr,
                        $TKodePerkiraan,
                        $request->input('rincian')
                    ]);
                return response()->json(['message' => 'Data Pengajuan sudah diKOREKSI !!..'], 200);

            case 3:
                if ($TT) {
                    DB::connection('ConnKCNAccounting')
                        ->statement('EXEC SP_1273_PRG_DLT_BKK2_ACUAN_TT ?', [$TIDPembayaran]);
                    return response()->json(['message' => 'Data Pengajuan Penagihan sudah diHAPUS !!..'], 200);
                } else if ($TT == null) {
                    DB::connection('ConnKCNAccounting')
                        ->statement('EXEC SP_1273_PRG_DLT_BKK2_ACUAN_NOTT ?, ?', [
                            $TIDPembayaran,
                            $TIdTT
                        ]);
                    return response()->json(['message' => 'Data Pengajuan NO Penagihan sudah diHAPUS !!..'], 200);
                }
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getSupplier') {
            $supplierDetails = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_SUPPLIER');
            $response = [];
            foreach ($supplierDetails as $row) {
                $response[] = [
                    'NM_SUP' => trim($row->NM_SUP),
                    'NO_SUP' => trim($row->NO_SUP),
                ];
            }
            return datatables($response)->make(true);
        } else if ($id == 'getPengajuan') {
            $pengajuanDetails = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK2_PENGAJUAN');
            // dd($pengajuanDetails);
            $response = [];
            foreach ($pengajuanDetails as $row) {
                $item = [];
                $item['Id_Pembayaran'] = trim($row->Id_Pembayaran);
                $item['Id_Penagihan'] = (substr(trim($row->Id_Penagihan), 0, 1) != 'X') ? trim($row->Id_Penagihan) : trim($row->Id_Penagihan);
                $item['Id_Bank'] = trim($row->Id_Bank);
                $item['Rincian_Bayar'] = trim($row->Rincian_Bayar);
                $item['Nilai_Pembayaran'] = number_format($row->Nilai_Pembayaran, 2, ',', '.');
                $item['Id_Jenis_Bayar'] = trim($row->Id_Jenis_Bayar);
                $item['Jenis_Pembayaran'] = trim($row->Jenis_Pembayaran);
                $item['Id_MataUang'] = trim($row->Id_MataUang);
                $item['Nama_MataUang'] = trim($row->Nama_MataUang);
                $item['Jml_JenisBayar'] = $row->Jml_JenisBayar;
                $item['Kurs_Bayar'] = $row->Kurs_Bayar;
                $response[] = $item;
            }
            return datatables($response)->make(true);
        } else if ($id == 'getTT') {
            $supplierId = $request->input('supplier1');
            // dd($supplierId);
            $ttDetails = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK2_TT @IDSupplier = ?', [$supplierId]);
            // dd($ttDetails);
            $response = [];
            foreach ($ttDetails as $row) {
                $item = [];
                $item['Waktu_Penagihan'] = \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y');
                $item['Id_Penagihan'] = trim($row->Id_Penagihan);
                $item['Status_PPN'] = ($row->Status_PPN == 'N') ? 'Tidak Ada' : 'Ada Pajak';
                $item['UangTT'] = trim($row->UangTT);
                $item['Nilai_Penagihan'] = number_format($row->Nilai_Penagihan, 2, '.', ',');
                $item['Lunas'] = trim($row->Lunas);
                $item['IdUangTT'] = trim($row->IdUangTT);
                $item['Id_Pembayaran'] = $row->Id_Pembayaran;
                $item['TT_NOLunas'] = "";
                $item['KursBayar'] = $row->Kurs_Bayar;
                $response[] = $item;
            }

            $ttNoLunasDetails = DB::connection('ConnKCNAccounting')
                ->select('exec Sp_1273_PRG_LIST_BKK2_TT_NOLUNAS @IDSupplier = ?', [$supplierId]);
            // dd($ttNoLunasDetails);
            foreach ($ttNoLunasDetails as $row) {
                $item = [];
                $item['Waktu_Penagihan'] = \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y');
                $item['Id_Penagihan'] = trim($row->Id_Penagihan);
                $item['Status_PPN'] = ($row->Status_PPN == 'N') ? 'Tidak Ada' : 'Ada Pajak';
                $item['UangTT'] = trim($row->UangTT);
                $item['Nilai_Penagihan'] = number_format($row->Nilai_Penagihan, 2, '.', ',');
                $item['Lunas'] = trim($row->Lunas);
                $item['IdUangTT'] = trim($row->IdUangTT);
                $item['Id_Pembayaran'] = $row->Id_Pembayaran;
                $item['TT_NOLunas'] = $row->TT_NOLunas;
                $item['isRed'] = true;
                $item['KursBayar'] = $row->Kurs_Bayar;
                $response[] = $item;
            }
            // dd($ttDetails, $ttNoLunasDetails);
            return datatables($response)->make(true);
        } else if ($id == 'getBKK_DP') {
            $BKM_Pot = (bool) $request->input('BKM_Pot');
            $supplierId = $request->input('supplier1');
            // dd($request->all());
            $response = [];

            if ($BKM_Pot == false) {
                $results = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_BKK2_BKKDP @IDSUPP = ?', [$supplierId]);

                foreach ($results as $result) {
                    $response[] = [
                        'BKK' => $result->BKK,
                        'Rincian' => $result->Rincian,
                    ];
                }

            } else {
                $results = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_BKK2_DP_PEMBAYARAN');
                // @idSup = ?', [$supplierId]
                foreach ($results as $result) {
                    $response[] = [
                        'BKK' => $result->Id_BKM,
                        'Rincian' => $result->CustNilai,
                    ];
                }
            }
            return datatables($response)->make(true);
        } else if ($id == 'getBKK_DPDetails') {
            $BKM_Pot = (bool) $request->input('BKM_Pot');
            $bkk = $request->input('bkk_uangmuka');
            $rincian = $request->input('rincian_bkk');
            $nilai_pembayaran = (float) str_replace(',', '', $request->input('nilai_pembayaran'));
            if ($BKM_Pot == false) {
                $resultRincian = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_BKK2_BKKDP_RINCIAN @BKK = ?, @Rincian = ?', [$bkk, $rincian]);
                // dd($resultRincian);
                if ($resultRincian) {
                    $nilaiPembayaran = $resultRincian[0]->Nilai_Pembayaran;
                    $idPembayaran = $resultRincian[0]->Id_Pembayaran;

                    $response[] = [
                        'TBKK_DP' => $bkk,
                        'TRincian_DP' => $rincian,
                        'TNilaiByrSbl' => number_format($nilaiPembayaran, 2, '.', ','),
                        'TIDByr_DP' => $idPembayaran,
                        'TSisaByr' => number_format(($nilai_pembayaran - $nilaiPembayaran), 2, '.', ',')
                    ];
                }
            } else {
                $resultPembayaran = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_BKK2_BKMDP_PEMBAYARAN @bkk = ?', [$bkk]);

                if ($resultPembayaran) {
                    $nilaiPelunasan = $resultPembayaran[0]->Nilai_Pelunasan;

                    $response[] = [
                        'TBKK_DP' => $bkk,
                        'TIDBKK_DP' => $rincian,
                        'TNilaiBayarS' => number_format($nilaiPelunasan, 2, '.', ','),
                        'TSelisih' => number_format(($nilai_pembayaran - $nilaiPelunasan), 2, '.', ',')
                    ];
                }
            }

            return datatables($response)->make(true);

        } else if ($id == 'getBank') {
            $response = [];

            $banks = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK2_BANK');
            // dd($banks);
            foreach ($banks as $bank) {
                $response[] = [
                    'Id_Bank' => $bank->Id_Bank,
                    'Nama_Bank' => $bank->Nama_Bank,
                ];
            }

            if (empty($response)) {
                return response()->json(['error' => 'Pilih dulu Banknya !!..']);
            }
            return datatables($response)->make(true);
        } else if ($id == 'getBankDetails') {
            $selectedBank = $request->input('id_bank');
            $response = [];

            if ($request->has('TT') || $request->input('Proses') == 2) {
                $idBankDetails = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_BKK2_IDBANK @IdBank = ?', [$selectedBank]);

                if (!empty($idBankDetails)) {
                    $idMataUang = $idBankDetails[0]->Id_MataUang;
                    $namaMataUang = $idBankDetails[0]->Nama_MataUang;

                    if ($request->input('TIdUang') == 1) {
                        if ($idMataUang != 1) {
                            return response()->json(['error' => "Bank = $selectedBank  Untuk MataUang : $namaMataUang"]);
                        }
                    } else {
                        if ($idMataUang == 1) {
                            return response()->json(['error' => "Bank = $selectedBank  Untuk MataUang : $namaMataUang"]);
                        }
                    }
                }
            }

            return response()->json(['success' => true, 'data' => $response]);
        } else if ($id == 'getJnsByr') {
            // Execute the stored procedure to get payment types
            $paymentTypes = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK2_JENISBAYAR');

            // Prepare the response array
            $response = [];
            foreach ($paymentTypes as $paymentType) {
                $response[] = [
                    'Jenis_Pembayaran' => trim($paymentType->Jenis_Pembayaran),
                    'Id_Jenis_Bayar' => trim($paymentType->Id_Jenis_Bayar),
                ];
            }
            // dd($response);
            // Check if there are any results
            if (empty($response)) {
                return response()->json([
                    'message' => 'No payment types found. Please select a payment type!',
                    'status' => 'error'
                ], 400);
            }

            // Assuming the response should be returned as a DataTable
            $TIdJnsByr = $response[0]['Id_Jenis_Bayar'];
            $TJnsByr = $response[0]['Jenis_Pembayaran'];

            if ($TIdJnsByr == "") {
                return response()->json([
                    'message' => 'Please select a payment type first!',
                    'status' => 'error'
                ], 400);
            } else {
                $TBank = $request->input('id_bank');

                if ($TBank == "KRR2" && $TIdJnsByr != 1) {
                    return response()->json([
                        'message' => 'Bank = KRR2, Payment type must be CASH!',
                        'status' => 'error'
                    ], 400);
                }

                return datatables($response)->make(true);
            }
        } else if ($id == 'GetMataUang') {
            if ($request->input('mata_uang') != "") {
                return response()->json([
                    'enable' => 'TNilaiBayar',
                    'focus' => 'TNilaiBayar',
                    'status' => 'success'
                ]);
            }
            // dd($request->all());

            $currencies = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK2_MATAUANG');
            // dd($currencies);
            $response = [];
            foreach ($currencies as $currency) {
                $response[] = [
                    'Nama_MataUang' => trim($currency->Nama_MataUang),
                    'Id_MataUang' => trim($currency->Id_MataUang),
                ];
            }

            if (empty($response)) {
                return response()->json([
                    'message' => 'No currencies found. Please select a currency!',
                    'status' => 'error'
                ], 400);
            }

            $TUang = $response[0]['Nama_MataUang'];
            $TIdUang = $response[0]['Id_MataUang'];

            if ($TIdUang == "") {
                return response()->json([
                    'message' => 'Please select a currency first!',
                    'status' => 'error'
                ], 400);
            } else {
                $TBank = $request->input('id_bank');

                $bankCurrency = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_BKK2_IDBANK ?', [$TBank]);

                if (empty($bankCurrency)) {
                    return response()->json([
                        'message' => 'No bank currency found. Please select a currency!',
                        'status' => 'error'
                    ], 400);
                }

                $bankCurrency = $bankCurrency[0];

                // if ($TIdUang != $bankCurrency->Id_MataUang) {
                //     return response()->json([
                //         'message' => 'Bank = ' . trim($TBank) . '  For Currency : ' . trim($bankCurrency->Nama_MataUang),
                //         'status' => 'error'
                //     ], 400);
                // }

                return datatables($response)
                    ->with('enable', 'TNilaiBayar')
                    ->with('focus', 'TNilaiBayar')
                    ->make(true);
            }
        } else if ($id == 'GetKodePerkiraan') {
            $response = [];

            $kodePerkiraans = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK1_KODEPERKIRAAN');
            // dd($kodePerkiraans);
            foreach ($kodePerkiraans as $kodePerkiraan) {
                $response[] = [
                    'NoKodePerkiraan' => $kodePerkiraan->NoKodePerkiraan,
                    'Keterangan' => $kodePerkiraan->Keterangan,
                ];
            }

            if (empty($response)) {
                return response()->json(['error' => 'Pilih dulu Kode Perkiraannya !!..']);
            }
            return datatables($response)->make(true);
        }
    }
    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
