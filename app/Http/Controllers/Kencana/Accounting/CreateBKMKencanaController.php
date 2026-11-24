<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class CreateBKMKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        $kodePerkiraan = DB::connection('ConnKCNAccounting')
            ->select('exec SP_1273_PRG_LIST_KODE_PERKIRAAN ?', [1]);
        $banks = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_BANK');
        return view('Kencana.Accounting.Piutang.CreateBKM', compact('access', 'banks', 'kodePerkiraan'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {

    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getPelunasan') {

            // Execute the stored procedure
            $pelunasanResults = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_CASH_ADV @bln = ?, @thn = ?', [
                    $request->input('bulan'),
                    $request->input('tahun')
                ]);

            // dd($pelunasanResults);

            $response = [];
            $j = 0;

            foreach ($pelunasanResults as $row) {
                $j++;
                $response[] = [
                    'Tgl_Pelunasan' => \Carbon\Carbon::parse($row->Tgl_Pelunasan)->format('m/d/Y'),
                    'Id_Pelunasan' => $row->Id_Pelunasan,
                    'Id_bank' => $row->Id_bank ?? '',
                    'Jenis_Pembayaran' => $row->Jenis_Pembayaran ?? '',
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'No_Bukti' => $row->No_Bukti ?? '',
                    // 'TglInput' => \Carbon\Carbon::parse($row->TglInput)->format('m/d/Y'),
                    // 'KodePerkiraan' => $row->KodePerkiraan ?? '',
                    'TglInput' => "",
                    'KodePerkiraan' => '',
                    'Uraian' => $row->Uraian ?? ''
                ];
            }

            if ($j == 0) {
                return response()->json(['message' => 'Tidak Ada Uang Muka'], 200);
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBankDetails') {
            if ($request->input('idBank') !== null) {
                // Execute the stored procedure to get bank details
                $bankResults = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_BANK_2 @idBank = ?', [
                        trim($request->input('idBank'))
                    ]);
                // dd($bankResults);
                if (count($bankResults) > 0) {
                    $bankData = $bankResults[0];

                    $response = [
                        'Jenis' => trim($bankData->jenis),
                        'Nama' => trim($bankData->Nama)
                    ];

                    return response()->json($response, 200);
                } else {
                    return response()->json(['message' => 'Bank not found'], 404);
                }
            } else {
                return response()->json(['message' => 'Invalid Bank ID'], 400);
            }
        } else if ($id == 'getPerkiraan') {
            // dd($request->all());
            if ($request->has('IdPerkiraan')) {
                $perkiraanResults = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_KODE_PERKIRAAN @Kode = 2, @IdPerkiraan = ?', [
                        $request->input('IdPerkiraan')
                    ]);

                if ($perkiraanResults && count($perkiraanResults) > 0) {
                    $result = $perkiraanResults[0];
                    $response = [
                        'Keterangan' => $result->Keterangan
                    ];

                    return response()->json($response);
                } else {
                    return response()->json(['message' => 'Data not found']);
                }
            } else {
                return response()->json(['message' => 'IdPerkiraan is required']);
            }
        } else if ($id == 'getBank') {
            // Retrieve list of banks (SP_1273_PRG_LIST_BANK)
            $bankResults = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BANK');
            // dd($bankResults);
            $response = [];
            foreach ($bankResults as $bank) {
                $response[] = [
                    'Id_Bank' => $bank->Id_Bank,
                    'Nama_Bank' => $bank->Nama_Bank,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getKodePerkiraan') {
            $kodePerkiraanResults = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_KODE_PERKIRAAN @Kode = ?', [1]);
            // dd($kodePerkiraanResults);
            // Prepare response data
            $response = [];
            foreach ($kodePerkiraanResults as $kodePerkiraan) {
                $response[] = [
                    'NoKodePerkiraan' => $kodePerkiraan->NoKodePerkiraan,
                    'Keterangan' => $kodePerkiraan->Keterangan,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getListBKM') {
            // Eksekusi stored procedure SP_1273_PRG_LIST_BKM_CASHADV
            // dd($request->all());
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKM_CASHADV_1');
            // dd($results);
            // Inisialisasi variabel response dan indeks
            $response = [];
            $j = 0;

            // Proses hasil stored procedure
            foreach ($results as $row) {
                $j++;
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan,
                ];
            }

            // Kembalikan data dalam format yang dapat diproses oleh datatables
            return datatables($response)->make(true);
        } else if ($id == 'getOkBKM') {
            $tgl1 = $request->input('tgl_awalbkm');
            $tgl2 = $request->input('tgl_akhirbkm');

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKM_CASHADV_1_PERTGL @tgl1 = ?, @tgl2 = ?', [
                    $tgl1,
                    $tgl2
                ]);

            $response = [];
            $j = 0;

            foreach ($results as $row) {
                $j++;
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getGroup') {
            // Migrated logic from CmdGroup_Click
            $selectedRows = $request->input('rowDataArray', []);

            $total = 0;

            foreach ($selectedRows as $row) {
                // Remove commas and convert to float, then add to total
                $total += (float) str_replace(',', '', $row['Nilai_Pelunasan']);
            }

            if (count($selectedRows) > 1) {
                $results = [];
                if (!empty($selectedRows[0]['TglInput']) && !empty($selectedRows[0]['Id_bank']) && !empty($selectedRows[0]['KodePerkiraan'])) {

                    $idBank = $selectedRows[0]['Id_bank'];
                    if ($idBank == 'KRR1') {
                        $idBank = 'KKM';
                    } elseif ($idBank == 'KRR2') {
                        $idBank = 'KI';
                    }

                    $bankResult = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_BANK_1 @idBank = ?', [
                        trim($idBank)
                    ]);

                    if (!empty($bankResult)) {
                        $jenis = trim($bankResult[0]->jenis);
                    }

                    $month = date('m');
                    $year = date('y');

                    $getIdBKM = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_IDBKM @month = ?, @year = ?, @IdBank = ?, @jenis = ?, @tgl = ?', [
                        $month,
                        $year,
                        $idBank,
                        $jenis,
                        (string) $month . $year,
                    ]);

                    if (!empty($getIdBKM)) {
                        $idBKM = trim($getIdBKM[0]->id_BKM);
                    }

                    $id1 = substr($idBKM, 0, 3);

                    $idbkm = intval($id1);
                    // dd($idbkm);
                    // dd($idBKM);
                    $terbilangSemua = $request->input('terbilangSemua');

                    DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_INSERT_BKM_TPELUNASAN @idBKM = ?, @tglinput = ?, @userinput = ?, @terjemahan = ?, @nilaipelunasan = ?, @IdBank = ?', [
                        $idBKM,
                        \Carbon\Carbon::parse($row['TglInput'])->format('Y-m-d'),
                        trim(Auth::user()->NomorUser),
                        $terbilangSemua,
                        $total,
                        $idBank
                    ]);

                    DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_UPDATE_COUNTER_IDBKM @idbkm = ?, @IdBank = ?, @jenis = ?, @tgl = ?', [
                        $idbkm,
                        $idBank,
                        $jenis,
                        (string) $month . $year,
                    ]);

                    Log::info(
                        (string) $idBKM . ' ' .
                        $idBank . ' ' .
                        $jenis
                    );
                    // dd($tes);

                    // $periode = date('my');
                    // // dd($periode);
                    // $bank = trim($selectedRows[0]['Id_bank']);
                    // $noUrut = DB::connection('ConnKCNAccounting')
                    //     ->table('T_Counter_BKM')
                    //     ->where('Periode', $periode)
                    //     ->value('Id_BKM_E_Rp');

                    // // Ensure $noUrut is always 3 digits
                    // $noUrutFormatted = str_pad($noUrut, 3, '0', STR_PAD_LEFT);

                    // $idBKM = $noUrutFormatted . $bank . $periode; // Example: 003ANZ0924
                    // dd($idBKM);
                    // $idBKM = str_pad($noUrut, 5, '0', STR_PAD_LEFT);
                    // $idBKM = $bank . '-R' . substr($periode, -2) . substr($idBKM, -5);
                } else {
                    return response()->json(['error' => 'Please fill in the Tgl Pembuatan BKM and Id.Bank']);
                }

                foreach ($selectedRows as $index => $row) {
                    if (!empty($row['TglInput']) && !empty($row['Id_bank']) && !empty($row['KodePerkiraan'])) {

                        $idBank = $row['Id_bank'];
                        if ($idBank == 'KRR1') {
                            $idBank = 'KKM';
                        } elseif ($idBank == 'KRR2') {
                            $idBank = 'KI';
                        }

                        DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_UPDATE_IDBKM_1 @idpelunasan = ?, @idBKM = ?, @idBank = ?, @kode = ?', [
                            $row['Id_Pelunasan'],
                            $idBKM,
                            $idBank,
                            $row['KodePerkiraan']
                        ]);

                        if (in_array($row['Jenis_Pembayaran'], ['BG', 'CEK'])) {
                            DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_UPDATE_STATUSBAYAR @idpelunasan = ?', [
                                $row['Id_Pelunasan']
                            ]);
                        }

                        // Collect the success message for this row
                        // $results[] = (string) 'Data BKM With No.' . $idBKM . ' Saved Successfully';
                    } else {
                        // If there are missing required fields
                        $results[] = 'Please fill in the Tgl Pembuatan BKM and Id.Bank for row ' . ($index + 1);
                    }
                }

                // Return the accumulated results after processing all rows
                return response()->json(['message' => (string) 'Data BKM With No.' . $idBKM . ' Saved Successfully']);
            } elseif (count($selectedRows) === 1) {
                $results = [];
                if (!empty($selectedRows[0]['TglInput']) && !empty($selectedRows[0]['Id_bank']) && !empty($selectedRows[0]['KodePerkiraan'])) {

                    $idBank = $selectedRows[0]['Id_bank'];
                    if ($idBank == 'KRR1') {
                        $idBank = 'KKM';
                    } elseif ($idBank == 'KRR2') {
                        $idBank = 'KI';
                    }

                    $getIdBKM = DB::connection('ConnKCNAccounting')->statement('exec SP_5409_ACC_COUNTER_BKM_BKK @bank = ?, @jenis = ?, @tgl = ?, @id = ?', [
                        $idBank,
                        'R',
                        \Carbon\Carbon::parse($selectedRows[0]['TglInput'])->format('Y-m-d'),
                        '',
                    ]);
                    // dd($tes);

                    $periode = date('Y');
                    // dd($periode);
                    $bank = trim($selectedRows[0]['Id_bank']);
                    $noUrut = DB::connection('ConnKCNAccounting')
                        ->table('T_Counter_BKM')
                        ->where('Periode', $periode)
                        ->value('Id_BKM_E_Rp');

                    // $noUrutFormatted = str_pad($noUrut, 3, '0', STR_PAD_LEFT);
                    // $idBKM = $noUrutFormatted . $bank . $periode;
                    // dd($idBKM);
                    $idBKM = str_pad($noUrut, 5, '0', STR_PAD_LEFT);
                    $idBKM = $bank . '-R' . substr($periode, -2) . substr($idBKM, -5);
                    // dd($idBKM);
                } else {
                    return response()->json(['error' => 'Please fill in the Tgl Pembuatan BKM and Id.Bank']);
                }

                foreach ($selectedRows as $index => $row) {
                    if (!empty($row['TglInput']) && !empty($row['Id_bank']) && !empty($row['KodePerkiraan'])) {

                        $idBank = $row['Id_bank'];
                        if ($idBank == 'KRR1') {
                            $idBank = 'KKM';
                        } elseif ($idBank == 'KRR2') {
                            $idBank = 'KI';
                        }

                        DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_INSERT_BKM_TPELUNASAN @idBKM = ?, @tglinput = ?, @userinput = ?, @terjemahan = ?, @nilaipelunasan = ?, @IdBank = ?', [
                            $idBKM,
                            \Carbon\Carbon::parse($row['TglInput'])->format('Y-m-d'),
                            trim(Auth::user()->NomorUser),
                            $row['terbilang'],
                            $total,
                            $idBank
                        ]);

                        DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_UPDATE_IDBKM_1 @idpelunasan = ?, @idBKM = ?, @idBank = ?, @kode = ?', [
                            $row['Id_Pelunasan'],
                            $idBKM,
                            $idBank,
                            $row['KodePerkiraan']
                        ]);

                        if (in_array($row['Jenis_Pembayaran'], ['BG', 'CEK'])) {
                            DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_UPDATE_STATUSBAYAR @idpelunasan = ?', [
                                $row['Id_Pelunasan']
                            ]);
                        }

                        // Collect the success message for this row
                        // $results[] = (string) 'Data BKM With No.' . $idBKM . ' Saved Successfully';
                    } else {
                        // If there are missing required fields
                        $results[] = 'Please fill in the Tgl Pembuatan BKM and Id.Bank for row ' . ($index + 1);
                    }
                }

                return response()->json(['message' => (string) 'Data BKM With No.' . $idBKM . ' Saved Successfully']);
            } else {
                return response()->json(['error' => 'Please select pelunasan data to group']);
            }
        } else if ($id == 'cetakBKM') {
            $idBKM = $request->input('bkm', null);
            // dd($idBKM);
            if ($idBKM) {
                $data = DB::connection('ConnKCNAccounting')
                    ->select("SELECT * FROM VW_PRG_5298_ACC_CETAK_BKM_NOTAGIH_1 WHERE Id_BKM = ?", [$idBKM]);
                // dd($data);
                // Execute stored procedure to update print date
                DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_UPDATE_TGLCETAK_BKM ?', [$idBKM]);

                return response()->json([
                    'data' => $data,
                    'message' => 'Data sudah diSIMPAN!'
                ]);
            } else {
                return response()->json(['error' => 'Pilih 1 Id.BKM Untuk DiCetak!'], 400);
            }
        } else {
            return response()->json(['error' => 'Invalid request'], 400);
        }

    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {

    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
