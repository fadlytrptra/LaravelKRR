<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class BatalPenagihanKencanaController extends Controller
{

    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');

        $bulan = now()->format('m');
        $tahun = now()->format('y');
        $penagihan = DB::connection('ConnKCNAccounting')
            ->select('exec [SP_1273_PRG_LIST_IDTT_BTLTT] @Bln = ?, @Thn = ?', [$bulan, $tahun]);

        return view('Kencana.Accounting.Hutang.BatalPenagihan', compact('access', 'penagihan'));

    }

    // function getDataPenagihan($bulan, $tahun)
    // {
    //     $penagihan = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_ACC_LIST_IDTT_BTLTT] @Bln = ?, @Thn = ?', [$bulan, $tahun]);
    //     return response()->json($penagihan);
    // }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $idTT = (string) $request->input('idPenagihan');
        $alasan = (string) $request->input('alasan');

        // dd(reqi);

        try {
            // Check if the alasan is provided
            if (empty($alasan)) {
                return redirect()->back()->with('error', 'Alasan Harus diisi!!..');
            }

            // Confirm cancellation
            // (This part is usually handled in the frontend with a confirmation dialog)
            // Assuming frontend sends confirmation status as 'confirmed' in the request
            $confirmation = $request->input('confirmation', 'no');
            // dd($confirmation);
            if ($confirmation === 'yes') {
                // Execute the stored procedure to cancel TT
                DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_BATAL_TT @IdTT = ?, @Alasan = ?', [$idTT, $alasan]);

                return redirect()->back()->with('success', 'Data sudah dibatalkan...!!');
            } else {
                return redirect()->back()->withInput();
            }
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getIdPenagihan') {
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');

            $result1 = DB::connection('ConnKCNAccounting')
                ->select('EXEC SP_1273_PRG_LIST_IDTT_BTLTT @Bln = ?, @Thn = ?', [$bulan, $tahun]);
            $dataSupplier = [];
            foreach ($result1 as $Supplier) {
                $dataSupplier[] = [
                    'Id_Penagihan' => $Supplier->Id_Penagihan,
                    'NM_SUP' => $Supplier->NM_SUP,
                ];
            }
            return datatables($dataSupplier)->make(true);
        } else if ($id == 'getDetail') {
            $penagihanId = $request->input('idPenagihan');
            $supplierName = $request->input('supplier');
            // dd($penagihanId, $supplierName);
            $request->merge(['TIdTT' => $penagihanId, 'TSupplier' => $supplierName]);
            // dd($request);
            // Second stored procedure call
            $result2 = DB::connection('ConnKCNAccounting')
                ->select('EXEC SP_1273_PRG_LIST_TT_BTLTT @idtt = ?', [trim($penagihanId)]);
            // dd($result2);
            $uang = $result2[0]->Nama_MataUang ?? '';
            $nilai = (float) ($result2[0]->Nilai_Penagihan ?? 0);

            // Format nilai_penagihan
            $formattedNilai = number_format($nilai, 4, '.', ',');

            // Third stored procedure call
            $result3 = DB::connection('ConnKCNAccounting')
                ->select('EXEC SP_1273_PRG_CHECK_IDTT_BTLTT @idtt = ?', [trim($penagihanId)]);
            // dd($result3);
            $status = '';
            if ($result3[0]->ada > 1) {
                $status = 'PENAGIHAN SUDAH ADA BKK, BATAL BKK DULU!!..';
            }

            // Prepare response data
            $dataCustomer = [
                [
                    // dd($uang,$formattedNilai, $status),
                    'Id_Penagihan' => $penagihanId,
                    'Nama_Supplier' => $supplierName,
                    'Nama_MataUang' => $uang,
                    'Nilai_Penagihan' => $formattedNilai,
                    'Status' => $status,
                ]
            ];

            return datatables($dataCustomer)->make(true);
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
