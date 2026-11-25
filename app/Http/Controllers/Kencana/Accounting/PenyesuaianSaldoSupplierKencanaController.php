<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class PenyesuaianSaldoSupplierKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.PenyesuaianSaldoSupplier', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $proses = $request->input('proses1', 0);
        // dd($proses);
        // dd($request->all());
        if ($proses == 1) {
            $formData = $request->input('data', '[]');
            $selectedItems = json_decode($formData, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return response()->json(['message' => 'Invalid data format.'], 400);
            }

            if (empty($selectedItems)) {
                return response()->json(['message' => 'Tidak ada Data yang diPROSES!!..'], 400);
            }

            // Processing each selected item
            try {
                foreach ($selectedItems as $item) {
                    // Extract necessary data for each item
                    $idTrans = $item['IdTrans'] ?? null;
                    $idSupp = $item['id'] ?? null;

                    // Execute the stored procedure
                    DB::connection('ConnKCNAccounting')
                        ->statement('EXEC SP_1273_PRG_UDT_TT_SESUAI_SALDO @IdTrans = ?, @IdSupp = ?', [$idTrans, $idSupp]);
                }

                // Return success response
                return response()->json(['message' => 'Data processed successfully.'], 200);

            } catch (Exception $e) {
                return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
            }
        } else {
            $formData = $request->input('data', '[]');
            $selectedItems = json_decode($formData, true);
            // dd($selectedItems);
            if (json_last_error() !== JSON_ERROR_NONE) {
                return response()->json(['error' => 'Invalid data format.'], 400);
            }

            if (empty($selectedItems)) {
                return response()->json(['error' => 'Tidak ada Data yang diPROSES!!..'], 400);
            }

            try {
                foreach ($selectedItems as $supplierId) {
                    $idSupp = $supplierId['id'] ?? null;
                    // dd($idSupp);
                    DB::connection('ConnKCNAccounting')
                        ->statement('exec SP_1273_PRG_UDT_TT_SALDO_KOSONG ?', [$idSupp]);
                }

                return response()->json(['message' => 'Proses berhasil'], 200);
            } catch (Exception $e) {

                return response()->json(['error' => 'Terjadi kesalahan saat memproses data: ' . $e->getMessage()], 500);
            }
        }
    }
    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $hutang = $request->input('radio_hutang') == 'true' ? true : false;
            $tunai = $request->input('radio_tunai') == 'true' ? true : false;
            // dd($hutang, $tunai, $hutang && !$tunai);
            $results = [];
            // dd($results);
            if ($hutang && !$tunai) {
                $results = DB::connection('ConnKCNAccounting')
                    ->select('EXEC SP_1273_PRG_LIST_TT_SALDOSUPP_HUTANG');
            } elseif (!$hutang && $tunai) {
                $results = DB::connection('ConnKCNAccounting')
                    ->select('EXEC SP_1273_PRG_LIST_TT_SALDOSUPP_TUNAI');
            }
            // dd($results);
            $response = [];

            foreach ($results as $row) {
                $response[] = [
                    'Id_Supplier' => trim($row->Id_Supplier),
                    'NM_SUP' => trim($row->NM_SUP),
                    'Saldo' => number_format($row->Saldo, 4, '.', ','),
                    'Saldo_Rp' => number_format($row->Saldo_Rp, 4, '.', ','),
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'SALDO_HUTANG' => number_format($row->SALDO_HUTANG, 4, '.', ','),
                    'SALDO_HUTANG_Rp' => number_format($row->SALDO_HUTANG_Rp, 4, '.', ','),
                    'IdTrans' => $row->IdTrans
                ];
            }
            // dd($response);

            return datatables($response)->make(true);
        } else if ($id == 'getDataKosong') {
            $results = DB::connection('ConnKCNAccounting')->table('KCN_PURCHASE.dbo.YSUPPLIER')
                ->select(
                    'KCN_PURCHASE.dbo.YSUPPLIER.NO_SUP AS Id_Supplier',
                    'KCN_PURCHASE.dbo.YSUPPLIER.NM_SUP',
                    'KCN_PURCHASE.dbo.YSUPPLIER.SALDO_HUTANG',
                    'KCN_PURCHASE.dbo.YSUPPLIER.SALDO_HUTANG_Rp'
                )
                ->leftJoin('dbo.VW_PRG_1273_ACC_TT_SESUAI_SALDO', 'KCN_PURCHASE.dbo.YSUPPLIER.NO_SUP', '=', 'dbo.VW_PRG_1273_ACC_TT_SESUAI_SALDO.Id_Supplier')
                ->leftJoin('dbo.T_MATAUANG', 'KCN_PURCHASE.dbo.YSUPPLIER.ID_MATAUANG', '=', 'dbo.T_MATAUANG.Id_MataUang')
                ->whereNull('KCN_PURCHASE.dbo.YSUPPLIER.SALDO_HUTANG')
                ->orWhereNull('KCN_PURCHASE.dbo.YSUPPLIER.SALDO_HUTANG_Rp')
                ->orderBy('KCN_PURCHASE.dbo.YSUPPLIER.NM_SUP')
                ->get();

            // Format hasil query
            $response = [];

            foreach ($results as $row) {
                $response[] = [
                    'Id_Supplier' => trim($row->Id_Supplier),
                    'NM_SUP' => trim($row->NM_SUP),
                    'SALDO_HUTANG' => number_format($row->SALDO_HUTANG, 4, '.', ','),
                    'SALDO_HUTANG_Rp' => number_format($row->SALDO_HUTANG_Rp, 4, '.', ','),
                ];
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
