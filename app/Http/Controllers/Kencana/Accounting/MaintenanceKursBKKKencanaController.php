<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceKursBKKKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.MaintenanceKursBKK', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        // dd($request->all());
        $proses = $request->input('proses');
        $kurs_pembelian = floatval(str_replace(",", "", $request->input('kurs_pembayaran')));
        // dd($kurs_pembelian);
        switch ($proses) {
            case 1:
                DB::connection('ConnKCNAccounting')
                    ->statement('EXEC SP_1273_PRG_UDT_BKK_KURS ?, ?', [
                        $request->input('id_bayar'),
                        $kurs_pembelian,
                    ]);

                $checkBKK = DB::connection('ConnKCNAccounting')
                    ->select('EXEC SP_1273_PRG_CHECK_BKK_TRANSSUPP ?', [
                        $request->input('bkk')
                    ]);

                $responseMessage = '';

                if (!empty($checkBKK) && $checkBKK[0]->Ada > 0) {
                    $responseMessage = 'Data sudah masuk pada Hutang Supplier!..Hubungi EDP!!..';
                } else {
                    DB::connection('ConnKCNAccounting')
                        ->statement('EXEC SP_1273_PRG_UDT_BKK_KURS ?, ?', [
                            $request->input('id_bayar'),
                            $kurs_pembelian,
                        ]);

                    $responseMessage = 'Data Kurs Bayar sudah diSIMPAN !!..';
                }

                $checkKursBKK = DB::connection('ConnKCNAccounting')
                    ->select('EXEC SP_1273_PRG_CHECK_KURSBKK ?', [
                        $request->input('id_bayar')
                    ]);

                if (!empty($checkKursBKK) && $checkKursBKK[0]->Ada > 0) {
                    return response()->json([
                        'message' => $responseMessage,
                    ], 200);
                } else {
                    return response()->json([
                        'message' => $responseMessage,
                    ], 200);
                }

            case 2:
                if (empty($request->input('id_bayar'))) {
                    return response()->json([
                        'error' => 'Tandai dulu'
                    ]);
                }

                try {
                    DB::connection('ConnKCNAccounting')
                        ->statement('EXEC Sp_1273_PRG_UDT_DTL_KURSBKK ?, ?, ?', [
                            $request->input('id_rincian'),
                            $request->input('id_bayar'),
                            floatval(str_replace(",", "", $request->input('kurs_pembayaran'))),
                        ]);

                    return response()->json([
                        'message' => 'Data sudah diSIMPAN !!..'
                    ]);

                } catch (Exception $e) {
                    return response()->json([
                        'error' => 'Failed to save data: ' . $e->getMessage()
                    ]);
                }
        }

    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'checkBKK') {
            // $tes = $request->input('krr1');
            // dd($tes);
            $BlnThn = trim($request->input('bulan')) . substr(trim($request->input('tahun')), -2);
            // dd($BlnThn);
            if ($request->input('krr1') == "true") {
                $resultCheck = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_CHECK_BKK_KURS_BKK @BlnThn = ?', [$BlnThn]);
                if (!empty($resultCheck) && $resultCheck[0]->Ada == 0) {
                    return response()->json(['message' => 'Tidak ada Data!!..'], 404);
                }
            }

            $storedProc = $request->input('krr1') == "true"
                ? 'SP_1273_PRG_LIST_BKK_KURS_KRR1'
                : 'SP_1273_PRG_LIST_BKK_KURS_BKK';

            $results = DB::connection('ConnKCNAccounting')
                ->select((string) 'exec ' . $storedProc . ' @BlnThn = ?', [$BlnThn]);

            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_BKK' => $row->Id_BKK,
                    'Nilai_Pembulatan' => number_format($row->Nilai_Pembulatan, 2, '.', ','),
                    'Tanggal_BKK' => date('Y-m-d', strtotime($row->Tanggal_BKK)),
                    'Sym_Supp' => $row->Sym_Supp ?? '',
                    'NM_SUP' => $row->NM_SUP ?? '',
                    'Id_Supplier' => $row->Id_Supplier ?? '',
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'listBKKClick') {
            $TBKK = $request->input('bkk');

            $responseBayar = [];
            $ComTrans = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_BKK_BAYARTAGIHAN @IdBKK = ?', [$TBKK]);
            // dd($ComTrans);
            if (!empty($ComTrans)) {
                foreach ($ComTrans as $trans) {
                    $responseBayar[] = [
                        'Id_Pembayaran' => $trans->Id_Pembayaran,
                        'Id_Penagihan' => $trans->Id_Penagihan ?? '',
                        'Jenis_Pembayaran' => $trans->Jenis_Pembayaran,
                        'Nama_MataUang' => $trans->Nama_MataUang,
                        'Nilai_Pembayaran' => number_format($trans->Nilai_Pembayaran, 2, '.', ','),
                        'Kurs_Bayar' => number_format($trans->Kurs_Bayar, 2, '.', ','),
                    ];
                }
            }

            return datatables($responseBayar)->make(true);
        } else if ($id == 'listBayarClick') {
            $IdPembayaran = $request->input('id_pembayaran');

            $responseRincian = [];
            $ComTrans = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_BKK_DETAILPEMBAYARAN @IdPembayaran = ?', [$IdPembayaran]);
            // dd($ComTrans);
            if (!empty($ComTrans)) {
                foreach ($ComTrans as $trans) {
                    $responseRincian[] = [
                        'Id_Pembayaran' => $trans->Id_Pembayaran,
                        'Id_Detail_Bayar' => $trans->Id_Detail_Bayar,
                        'Rincian_Bayar' => $trans->Rincian_Bayar,
                        'Nilai_Rincian' => number_format($trans->Nilai_Rincian, 2, '.', ','),
                        'Kode_Perkiraan' => $trans->Kode_Perkiraan,
                        'Kurs' => number_format($trans->Kurs ?? 0, 5, '.', ','),
                    ];
                }
            }

            return datatables($responseRincian)->make(true);
        } else if ($id == 'processTT') {
            $idTT = $request->input('idtt');
            // dd($idTT);
            $resultsTT = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK_KURS_TT @IDPenagihan = ?', [$idTT]);
            // dd($resultsTT);
            $formattedResultsTT = [];
            foreach ($resultsTT as $row) {
                $formattedResultsTT[] = [
                    'No_Terima' => $row->No_Terima,
                    'Kurs_Tagih' => number_format($row->Kurs_Tagih, 2, '.', ','),
                ];
            }

            $resultKursRata = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK_KURSRATA @IDTT = ?', [$idTT]);
            // dd($resultKursRata);
            $kursRata = !empty($resultKursRata) ? number_format($resultKursRata[0]->Kurs_TT, 2, '.', ',') : null;

            $response = [
                'kursRata' => $kursRata,
                'listTT' => $formattedResultsTT,
            ];
            // dd($response);

            return response()->json([
                'data' => $formattedResultsTT,  // This is for DataTables
                'kursRata' => $kursRata,        // Additional variable
            ]);
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
