<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class CariKodeBarangKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana'); //tidak perlu menu di navbar
        return view('Kencana.Inventory.CariKodeBarang', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        // 
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        $user = Auth::user()->NomorUser;

        if ($id === 'getObjek') {
            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_List_CariKodeBarang
            @Kode = ?, @UserId = ?', [1, $user]);
            
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'IdObjek' => $detail_objek->IdObjek,
                    'IdDivisi' => $detail_objek->IdDivisi
                ];
            }
            // dd($data_objek);
            return datatables($objek)->make(true);
        }

        // ambil detail data
        else if ($id === 'getDetailData') {
            $IdObjek = $request->input('IdObjek');
            $NamaBrg = $request->input('NamaBrg');

            $NamaBrg = $NamaBrg ?? '';

            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_List_CariKodeBarang
            @Kode = ?, @IdObjek = ?, @NamaBrg = ?', [2, $IdObjek, $NamaBrg]);
            
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'KodeBarang' => $detail_objek->KodeBarang,
                    'NamaType' => $detail_objek->NamaType,
                    'IdType' => $detail_objek->IdType
                ];
            }
            return response()->json($data_objek);
        }

        // ambil detail data
        else if ($id === 'getDataAdditional') {
            $IdType = $request->input('IdType');

            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_List_CariKodeBarang
            @Kode = ?, @IdType = ?', [3, $IdType]);
            
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaKelompokUtama' => $detail_objek->NamaKelompokUtama,
                    'NamaKelompok' => $detail_objek->NamaKelompok,
                    'NamaSubKelompok' => $detail_objek->NamaSubKelompok
                ];
            }
            return response()->json($data_objek);
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
    public function destroy(Request $request)
    {
        // 
    }
}
