<?php

namespace App\Http\Controllers\Kencana;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

use PDF;

class CetakDOKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.DeliveryOrder.CetakDO', compact('access'));
    }

    public function getDeliveryOrderSudahACC($tanggal)
    {
        $list_do = DB::connection('ConnKCNSales')->select(
            "
            SELECT *
            FROM VW_PRG_4496_SLS_DO_INV1
            WHERE CAST(TglDO AS DATE) = ?
            ",
            [$tanggal]
        );

        return response()->json($list_do);
    }

    public function getDeliveryOrderBelumACC($tanggal)
    {
        $list_do = DB::connection('ConnKCNSales')->select('SELECT * FROM VW_PRG_1486_SLS_CETAK_DO_BLMACC1 WHERE (TglDO = \'' . $tanggal . '\')');
        return response()->json($list_do);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {

    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update($id)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
