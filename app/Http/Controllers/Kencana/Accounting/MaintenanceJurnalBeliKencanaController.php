<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceJurnalBeliKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.MaintenanceJurnalBeli', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        try {
            $proses = $request->input('proses');
            // dd($proses);
            // dd($request->all());
            switch ($proses) {
                case 1:
                    try {
                        // First stored procedure execution (SP_1273_PRG_INS_TT_JURNAL)
                        DB::connection('ConnKCNAccounting')
                            ->statement('EXEC SP_1273_PRG_INS_TT_JURNAL
                            @BKK = ?, @IdSupplier = ?, @Keterangan = ?,
                            @Debet = ?, @Kredit = ?, @Perkiraan = ?', [
                                $request->input('bkk'),
                                $request->input('kode_supp'),
                                $request->input('keterangan'),
                                $request->input('hutang'),
                                $request->input('pelunasan'),
                                $request->input('kode_perkiraan')
                            ]);

                        // Check supplier balance (SP_1273_PRG_CHECK_TT_SALDOSUPP)
                        $saldoCheck = DB::connection('ConnKCNAccounting')
                            ->select('EXEC SP_1273_PRG_CHECK_TT_SALDOSUPP @IdSupplier = ?', [
                                $request->input('kode_supp')
                            ]);

                        if ($saldoCheck && $saldoCheck[0]->aDA > 0) {
                            // Supplier = Rp
                            if ($request->input('uang_supp') == 1) {
                                // Bayar = Rp
                                if ($request->input('kode_matauang') == 1) {
                                    // Insert into T_Transaksi_Supplier
                                    DB::connection('ConnKCNAccounting')
                                        ->statement('EXEC SP_1273_PRG_INS_TT_TRANS_SUPP
                                        @Id_TypeTransaksi = 6, @Tanggal = ?, @Id_Supplier = ?,
                                        @Detail = "Jurnal", @Id_Mata_Uang = ?, @Nilai_Debet = ?,
                                        @Nilai_Kredit = ?, @Kurs = 1, @Referensi = ?, @User_Input = ?', [
                                            $request->input('tanggal'),
                                            $request->input('kode_supp'),
                                            $request->input('kode_matauang'),
                                            $request->input('hutang'),
                                            $request->input('pelunasan'),
                                            $request->input('bkk'),
                                            trim(Auth::user()->NomorUser),
                                        ]);

                                    // Calculate balance in Rp (SP_1273_PRG_TT_HITUNGSALDO_RP_SUPPLIER)
                                    DB::connection('ConnKCNAccounting')
                                        ->statement('EXEC SP_1273_PRG_TT_HITUNGSALDO_RP_SUPPLIER @IdBKK = ?', [
                                            $request->input('bkk')
                                        ]);
                                } else {
                                    // Handle case where Bayar is $
                                    // Add your logic here
                                }
                            } else {
                                // Supplier = $
                                // Check if exchange rate is provided
                                $checkTransSuppRp = DB::connection('ConnKCNAccounting')
                                    ->select('EXEC SP_1273_PRG_CHECK_TT_TRANS_SUPP_RP @IdBKK = ?', [
                                        $request->input('bkk')
                                    ]);

                                if ($checkTransSuppRp && $checkTransSuppRp[0]->Ada > 0) {
                                    $checkBKKTransSupp = DB::connection('ConnKCNAccounting')
                                        ->select('EXEC SP_1273_PRG_CHECK_TT_BKK_RP @IdBKK = ?', [
                                            $request->input('bkk')
                                        ]);

                                    if ($checkBKKTransSupp && $checkBKKTransSupp[0]->Ada == 0) {
                                        return response()->json([
                                            'message' => 'BKK : ' . $request->input('bkk') . ' TIDAK DAPAT diPROSES, Karena Kurs Belum diisi!!..'
                                        ], 400);
                                    } else {
                                        // Insert into T_Transaksi_Supplier
                                        DB::connection('ConnKCNAccounting')
                                            ->statement('EXEC SP_1273_PRG_INS_TT_TRANS_SUPP_JURNAL_2
                                            @Id_TypeTransaksi = 6, @Tanggal = ?, @Id_Supplier = ?,
                                            @Detail = "Jurnal", @Id_Mata_Uang = ?, @Nilai_Debet = ?,
                                            @Nilai_Kredit = ?, @Kurs = 5, @Referensi = ?,
                                            @User_Input = ?, @Uang_Bayar = 0', [
                                                $request->input('tanggal'),
                                                $request->input('kode_supp'),
                                                $request->input('kode_matauang'),
                                                $request->input('hutang'),
                                                $request->input('pelunasan'),
                                                $request->input('bkk'),
                                                trim(Auth::user()->NomorUser),
                                            ]);

                                        // Calculate balance in Dollar (SP_1273_PRG_TT_HITUNGSALDO_DOLLAR_SUPPLIER)
                                        DB::connection('ConnKCNAccounting')
                                            ->statement('EXEC SP_1273_PRG_TT_HITUNGSALDO_DOLLAR_SUPPLIER @InIdBKK = ?', [
                                                $request->input('bkk')
                                            ]);
                                    }
                                } else {
                                    // Insert into T_Transaksi_Supplier
                                    DB::connection('ConnKCNAccounting')
                                        ->statement('EXEC SP_1273_PRG_INS_TT_TRANS_SUPP_JURNAL_1
                                        @Id_TypeTransaksi = 6, @Tanggal = ?, @Id_Supplier = ?,
                                        @Detail = "Jurnal", @Id_Mata_Uang = ?, @Nilai_Debet = ?,
                                        @Nilai_Kredit = ?, @Kurs = 5, @Referensi = ?,
                                        @User_Input = ?, @Uang_Bayar = 0', [
                                            $request->input('tanggal'),
                                            $request->input('kode_supp'),
                                            $request->input('kode_matauang'),
                                            $request->input('hutang'),
                                            $request->input('pelunasan'),
                                            $request->input('bkk'),
                                            trim(Auth::user()->NomorUser),
                                        ]);

                                    // Calculate balance in Dollar (SP_1273_PRG_TT_HITUNGSALDO_DOLLAR_SUPPLIER)
                                    DB::connection('ConnKCNAccounting')
                                        ->statement('EXEC SP_1273_PRG_TT_HITUNGSALDO_DOLLAR_SUPPLIER @InIdBKK = ?', [
                                            $request->input('bkk')
                                        ]);
                                }
                            }

                            return response()->json([
                                'message' => 'Data sudah diPROSES JURNAL !!..untuk BKK = ' . trim($request->input('bkk'))
                            ], 200);
                        } else {
                            return response()->json([
                                'error' => 'Hubungi Edp untuk Saldo Hutang Supplier = ' . $request->input('bkk')
                            ], 400);
                        }
                    } catch (Exception $e) {
                        // Handle exception and return JSON response
                        return response()->json([
                            'error' => 'Terjadi kesalahan: ' . $e->getMessage()
                        ], 500);
                    }

                case 2:
                    // Begin transaction
                    DB::connection('ConnKCNAccounting')
                        ->beginTransaction();
                    // Execute SP_1273_PRG_UDT_TT_JURNAL
                    DB::connection('ConnKCNAccounting')
                        ->statement('EXEC SP_1273_PRG_UDT_TT_JURNAL @idjurnal = ?, @Keterangan = ?, @Debet = ?, @Kredit = ?, @Perkiraan = ?', [
                            $request->input('id_jurnal'),
                            $request->input('keterangan'),
                            (float) floatval(str_replace(",", "", $request->input('hutang'))),
                            // $request->input('hutang'),
                            (float) floatval(str_replace(",", "", $request->input('pelunasan'))),
                            // $request->input('pelunasan'),
                            $request->input('kode_perkiraan')
                        ]);

                    $updateJr = $request->input('cek');
                    if ($updateJr == "true") {
                        DB::connection('ConnKCNAccounting')
                            ->commit();
                        return response()->json(['message' => 'Data Jurnal Beli sudah diKOREKSI !!!..']);
                    }

                    // Execute SP_1273_PRG_CHECK_TT_SALDOSUPP to check supplier balance
                    $supplierBalance = DB::connection('ConnKCNAccounting')
                        ->select('EXEC SP_1273_PRG_CHECK_TT_SALDOSUPP @IdSupplier = ?', [
                            $request->input('kode_supp')
                        ]);

                    if ($supplierBalance[0]->aDA > 0) {
                        // Check currency type
                        if ($request->input('uang_supp') == 1) {
                            if ($request->input('matauangbayar') == 1) {
                                // Execute SP_1273_PRG_INS_TT_TRANS_SUPP
                                DB::connection('ConnKCNAccounting')
                                    ->statement('EXEC SP_1273_PRG_INS_TT_TRANS_SUPP
                                    @Id_TypeTransaksi = 6,
                                    @Tanggal = ?,
                                    @Id_Supplier = ?,
                                    @Detail = "Jurnal",
                                    @Id_Mata_Uang = ?,
                                    @Nilai_Debet = ?,
                                    @Nilai_Kredit = ?,
                                    @Kurs = 1,
                                    @Referensi = ?,
                                    @User_Input = ?', [
                                        $request->input('tanggal'),
                                        $request->input('kode_supp'),
                                        $request->input('id_uang'),
                                        $request->input('hutang'),
                                        $request->input('pelunasan'),
                                        $request->input('bkk'),
                                        trim(Auth::user()->NomorUser),
                                    ]);

                                // Execute SP_1273_PRG_TT_HITUNGSALDO_RP_SUPPLIER
                                DB::connection('ConnKCNAccounting')
                                    ->statement('EXEC SP_1273_PRG_TT_HITUNGSALDO_RP_SUPPLIER @IdBKK = ?', [
                                        $request->input('bkk')
                                    ]);
                            } else {
                                // Handle "Bayar = $"
                            }
                        } else {
                            // Handle "Supplier = $"
                            $checkKurs = DB::connection('ConnKCNAccounting')
                                ->select('EXEC SP_1273_PRG_CHECK_TT_TRANS_SUPP_RP @IdBKK = ?', [
                                    $request->input('bkk')
                                ]);

                            if ($checkKurs[0]->Ada > 0) {
                                $checkKursFilled = DB::connection('ConnKCNAccounting')
                                    ->select('EXEC SP_1273_PRG_CHECK_TT_BKK_RP @IdBKK = ?', [
                                        $request->input('bkk')
                                    ]);

                                if ($checkKursFilled[0]->Ada == 0) {
                                    DB::connection('ConnKCNAccounting')
                                        ->rollBack();
                                    return response()->json(['error' => 'BKK : ' . $request->input('bkk') . ' TIDAK DAPAT diPROSES, Karena Kurs Belum diisi!!..']);
                                } else {
                                    // Execute SP_1273_PRG_INS_TT_TRANS_SUPP_BKK2
                                    DB::connection('ConnKCNAccounting')
                                        ->statement('EXEC SP_1273_PRG_INS_TT_TRANS_SUPP_BKK2
                                        @Id_TypeTransaksi = 6,
                                        @Tanggal = ?,
                                        @Id_Supplier = ?,
                                        @Detail = "Jurnal",
                                        @Id_Mata_Uang = ?,
                                        @Nilai_Debet = ?,
                                        @Nilai_Kredit = ?,
                                        @Kurs = 5,
                                        @Referensi = ?,
                                        @User_Input = ?,
                                        @Uang_Bayar = 0', [
                                            $request->input('tanggal'),
                                            $request->input('kode_supp'),
                                            $request->input('id_uang'),
                                            $request->input('hutang'),
                                            $request->input('pelunasan'),
                                            $request->input('bkk'),
                                            trim(Auth::user()->NomorUser),
                                        ]);

                                    // Execute SP_1273_PRG_TT_HITUNGSALDO_DOLLAR_SUPPLIER
                                    DB::connection('ConnKCNAccounting')
                                        ->statement('EXEC SP_1273_PRG_TT_HITUNGSALDO_DOLLAR_SUPPLIER @InIdBKK = ?', [
                                            $request->input('bkk')
                                        ]);
                                }
                            } else {
                                // Insert into supplier transactions table SP_1273_PRG_INS_TT_TRANS_SUPP_BKK
                                DB::connection('ConnKCNAccounting')
                                    ->statement('EXEC SP_1273_PRG_INS_TT_TRANS_SUPP_BKK
                                    @Id_TypeTransaksi = 6,
                                    @Tanggal = ?,
                                    @Id_Supplier = ?,
                                    @Detail = "Jurnal",
                                    @Id_Mata_Uang = ?,
                                    @Nilai_Debet = ?,
                                    @Nilai_Kredit = ?,
                                    @Kurs = 5,
                                    @Referensi = ?,
                                    @User_Input = ?,
                                    @Uang_Bayar = 0', [
                                        $request->input('tanggal'),
                                        $request->input('kode_supp'),
                                        $request->input('id_uang'),
                                        $request->input('hutang'),
                                        $request->input('pelunasan'),
                                        $request->input('bkk'),
                                        trim(Auth::user()->NomorUser),
                                    ]);

                                // Execute SP_1273_PRG_TT_HITUNGSALDO_DOLLAR_SUPPLIER
                                DB::connection('ConnKCNAccounting')
                                    ->statement('EXEC SP_1273_PRG_TT_HITUNGSALDO_DOLLAR_SUPPLIER @InIdBKK = ?', [
                                        $request->input('bkk')
                                    ]);
                            }
                        }

                        // Commit transaction
                        DB::connection('ConnKCNAccounting')
                            ->commit();
                        return response()->json(['message' => 'Data sudah diPROSES JURNAL !!..untuk BKK = ' . trim($request->input('bkk'))], 200);
                    } else {
                        DB::connection('ConnKCNAccounting')
                            ->rollBack();
                        return response()->json(['error' => 'Hubungi Edp untuk Saldo Hutang Supplier = ' . $request->input('kode_supp')], 422);
                    }

                case 3:
                    // dd($request->all());
                    try {
                        DB::connection('ConnKCNAccounting')
                            ->table('T_JURNAL_BELI')
                            ->where('ID_Jurnal', $request->input('id_jurnal'))
                            ->delete();

                        return response()->json(['message' => 'Data sudah diHAPUS!!...']);
                    } catch (Exception $e) {
                        return response()->json(['error' => 'Tidak ada data yang dihapus' . $e->getMessage()]);
                    }
                // return back()->with('message', 'Data sudah diHAPUS!!...');

            }
            return response()->json(['message' => 'Data sudah diPROSES!!..']);
            // return back()->with('message', 'Data sudah diSIMPAN!!..');
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }


    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getSupplier') {
            try {
                // Execute the stored procedure
                $suppStatusDetails = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_SUPP_STATUSH');
                // dd($suppStatusDetails);
                $response = [];
                foreach ($suppStatusDetails as $row) {
                    $response[] = [
                        'Supplier' => $row->Supplier,
                        'NO_SUP' => $row->NO_SUP,
                    ];
                }

                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => 'Error retrieving supplier status: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'getPeriodeJurnal') {
            try {
                $periodeDetails = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_PERIODE_JURNAL @IDSupplier = ?', [
                        trim($request->input('kode_supp'))
                    ]);
                // dd($periodeDetails);
                if (count($periodeDetails) > 0) {
                    $response = [];
                    foreach ($periodeDetails as $row) {
                        $response[] = [
                            'BlnThn' => $row->BlnThn,
                        ];
                    }

                    $TBlTh = $response[0]['BlnThn'] ?? '';

                    if ($TBlTh !== '') {
                        return datatables($response)->make(true);
                    } else {
                        return response()->json(['error' => 'Pilih dulu Periode BKKnya !!...']);
                    }
                } else {
                    return response()->json(['error' => 'No data found for the provided supplier ID.']);
                }
            } catch (Exception $e) {
                return response()->json(['error' => 'Error retrieving periode jurnal: ' . $e->getMessage()]);
            }
        } else if ($id == 'getBKK') {
            try {
                $comTrans = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_BKK_JURNAL ?, ?', [
                        $request->input('kode_supp'),
                        $request->input('bulantahun')
                    ]);
                // dd($comTrans);
                $response = [];
                foreach ($comTrans as $row) {
                    $response[] = [
                        'Referensi' => $row->Referensi,
                        'Uang' => $row->Uang,
                    ];
                }

                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => 'Error executing BKK procedure: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'checkBKK') {
            try {
                $bkk = $request->input('bkk');

                $checkJurnal = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_CHECK_ADA_JURNAL ?', [$bkk]);
                // dd($checkJurnal);
                if ($checkJurnal[0]->Ada == 0) {
                    return response()->json(['message' => 'TIDAK ADA Data JURNAL !!'], 200);
                } else {
                    return response()->json(['error' => 'Ada Data Jurnal'], 200);
                }

            } catch (Exception $e) {
                return response()->json(['error' => 'Error executing BKK procedure: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'DataJurnal') {
            try {
                $bkk = $request->input('bkk');
                $recTrans = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_TT_JURNAL ?', [$bkk]);

                $response = [];
                foreach ($recTrans as $row) {
                    $response[] = [
                        'BKK' => $row->BKK,
                        'KodePerkiraan' => $row->KodePerkiraan,
                        'KetKira' => $row->KetKira,
                        'Nilai_Debet' => number_format($row->Nilai_Debet, 4, ',', '.'),
                        'Nilai_Kredit' => number_format($row->Nilai_Kredit, 4, ',', '.'),
                        'Keterangan' => $row->Keterangan,
                        'ID_Jurnal' => $row->ID_Jurnal,
                    ];
                }

                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => 'Error retrieving jurnal data: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'getKira') {
            try {
                $comTrans = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_TT_KODEPERKIRAAN');
                // dd($comTrans);
                $response = [];
                foreach ($comTrans as $row) {
                    $response[] = [
                        'NoKodePerkiraan' => $row->NoKodePerkiraan,
                        'Keterangan' => $row->Keterangan,
                    ];
                }

                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => 'Error executing kode perkiraan procedure: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'getMataUang') {
            try {
                // Execute the stored procedure
                $comTrans = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_TT_MATAUANG');
                // dd($comTrans);
                $response = [];
                foreach ($comTrans as $row) {
                    $response[] = [
                        'Nama_MataUang' => $row->Nama_MataUang,
                        'Id_MataUang' => $row->Id_MataUang,
                    ];
                }

                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => 'Error executing mata uang procedure: ' . $e->getMessage()], 500);
            }
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
