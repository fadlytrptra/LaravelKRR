<?php

namespace App\Http\Controllers\Kencana;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Redirector;
use App\Http\Controllers\HakAksesController;

class DeliveryOrderManagerKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $data = DB::connection('ConnKCNSales')->select('exec SP_4384_SLS_LIST_DO_ACC_WEB');
        // dd($data);
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.DeliveryOrder.AccManager', compact('data', 'access'));
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
    public function update(Request $request)
    {
        $idManager = Auth::user()->NomorUser;
        $nomorDO = $request->nomorDOs;

        for ($i = 0; $i < count($nomorDO); $i++) {

            // 1. ACC Delivery Order
            DB::connection('ConnKCNSales')->statement(
                'exec SP_1273_PRG_ACC_DO1 @IdManager = ?, @IdDO = ?',
                [
                    $idManager,
                    $nomorDO[$i]
                ]
            );

            // 2. Isi Dikeluarkan langsung dari Laravel
            // DB::connection('ConnKCNSales')
            //     ->table('T_DeliveryOrder')
            //     ->where('IDDO', $nomorDO[$i])
            //     ->update([
            //         'Dikeluarkan' => $idManager . '-' . now()->format('m/d/Y')
            //     ]);
        }

        return redirect()->back()->with(
            'success',
            'Delivery Order dengan Nomor DO ' . implode(", ", $nomorDO) . ' Sudah Disetujui!'
        );
    }

    public function indexDestroy()
    {
        $data = DB::connection('ConnKCNSales')->select('exec SP_4384_SLS_LIST_DO_WEB');
        // dd($data);
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.DeliveryOrder.BatalManager', compact('data', 'access'));
    }
    //Remove the specified resource from storage.

    public function destroy(Request $request)
    {
        // dd($id);
        // $data = $request->all();
        // dd($data);
        $nomorTransTmps = $request->nomorTransTmps;
        $nomorDOs = $request->nomorDOs;
        $value = $request->value;
        $user = Auth::user()->NomorUser;
        $errors = [];
        for ($i = 0; $i < count($nomorDOs); $i++) {
            $accManager = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_DO_BATAL @Kode = ?, @IDDO = ?', [1, $nomorDOs[$i]]);
            // dd($accManager);
            if (trim($accManager[0]->AccManager) == trim($user)) {
                DB::connection('ConnKCNSales')->statement('exec SP_1273_PRG_DO_BATAL @Kode = ?, @IdDO = ?, @IDManager = ?, @KetBatal = ?, @IdTransTmp = ?', [2, $nomorDOs[$i], $user, $value, $nomorTransTmps[$i]]);
            } else {
                $errors[] = 'Anda tidak berhak untuk menghapus Delivery Order ' . $nomorDOs[$i] . '. Coba hubungi pemilik login: ' . $accManager[0]->AccManager;
            }
        }
        if (count($errors) > 0) {
            return redirect()->back()->with('error', $errors);
        } else {
            return redirect()->back()->with('success', 'Delivery Order yang Dipilih Sudah Dihapus!');
        }
    }
}
