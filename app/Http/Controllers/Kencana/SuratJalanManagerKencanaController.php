<?php

namespace App\Http\Controllers\Kencana;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class SuratJalanManagerKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $data = db::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_HEADERKIRIM_BLMACC');
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        // dd($LoadHeaderPengiriman);
        return view('Kencana.SuratJalan.AccPermohonan', compact('data', 'access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        if ($id === 'getDataHeader') {

            $IdHeaderKirim = $request->IdHeaderKirim;

            $data = DB::connection('ConnKCNSales')->select(
                'EXEC SP_1273_PRG_LIST_DETAILKIRIM_BLMACC @IDHeaderKirim = ?',
                [$IdHeaderKirim]
            );

            return response()->json([
                'message' => $data
            ]);
        }

        return response()->json([
            'message' => []
        ]);
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        $user = trim(auth::user()->NomorUser);
        $nomorSJs = $request->nomorSJs;
        // dd($request->all());
        for ($i = 0; $i < count($nomorSJs); $i++) {
            db::connection('ConnKCNSales')->statement('exec SP_1273_PRG_ACC_PENGIRIMAN @IdManager = ?, @IdHeaderKirim = ?', [$user, $nomorSJs[$i]]);
        }
        return redirect()->back()->with('success', 'Surat Jalan yang Dipilih Sudah Disetujui!');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
