<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class KodePerkiraanBKKKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.KodePerkiraanBKK', compact('access'));
    }

    public function getIdBKKKdPrkKencana($BlnThn)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_UDT_BKK_KDKIRA] @Kode = ?, @BlnThn = ?', [2, $BlnThn]);
        return response()->json($tabel);
    }
    public function getIdBKKKdPrk2Kencana($BlnThn)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_UDT_BKK_KDKIRA] @Kode = ?, @BlnThn = ?', [3, $BlnThn]);
        return response()->json($tabel);
    }

    public function getTabelRincianBKKKencana($idBKK)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_BKK_KDKIRA] @IdBKK = ?', [$idBKK]);
        // return datatables($tabel)->make(true);
        return response()->json($tabel);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $idDetail = $request->idDetail;
        $idKodePerkiraan = $request->idKodePerkiraan;
        try {
            DB::connection('ConnKCNAccounting')->statement("EXEC SP_1273_PRG_UDT_BKK_KDKIRA_DETAIL @IdDetailBayar = ?, @Perkiraan = ?", [
                $idDetail,
                $idKodePerkiraan,
            ]);

            return response()->json([
                'message' => 'Data sudah diKOREKSI!!..'
            ]);

        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    //Display the specified resource.
    public function show($cr)
    {
        //
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        // dd($request->all());
        $idDetail = $request->idDetail;
        $idKodePerkiraan = $request->idKodePerkiraan;

        DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_UDT_BKK_KDKIRA_DETAIL]
            @IdDetailBayar = ?,
            @Perkiraan = ?', [
            $idDetail,
            $idKodePerkiraan
        ]);

        return redirect()->back()->with('success', 'Data sudah diKOREKSI');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
