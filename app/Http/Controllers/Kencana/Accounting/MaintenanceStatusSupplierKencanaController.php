<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Exception;

class MaintenanceStatusSupplierKencanaController extends Controller
{
    //
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        $data = DB::connection('ConnKCNAccounting')->select('exec [SP_4384_MAINT_SUPPLIER_STATUS] @XKode = ?', [3]);
        return view('Kencana.Accounting.MaintenanceStatusSupplier', compact('data', 'access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        dd('masuk create');
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        dd('masuk store');
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        // dd($id);
        try {
            if ($id == 'getAllStatusSupplier') {
                $listStatusSupplier = DB::connection('ConnKCNAccounting')->select('exec [SP_4384_MAINT_SUPPLIER_STATUS] @XKode = ?', [1]);

                // Transform the data
                $listStatusSupplier = array_map(function ($item) {
                    if (is_null($item->STATUS)) {
                        $item->STATUS = '[KOSONG]';
                    }
                    return $item;
                }, $listStatusSupplier);
                return datatables($listStatusSupplier)->make(true);
            } else if ($id == 'getCertainSupplier') {
                $data = DB::connection('ConnKCNAccounting')->select('exec [SP_4384_MAINT_SUPPLIER_STATUS] @XKode = ?, @IdSupplier = ?', [2, $request->idSupplier]);
                return response()->json($data);
            } else if ($id == 'getSupplierNullStatus') {
                $data = DB::connection('ConnKCNAccounting')->select('exec [SP_4384_MAINT_SUPPLIER_STATUS] @XKode = ?', [3]);
                return response()->json($data);
            }
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }


    // Show the form for editing the specified resource.
    public function edit($id)
    {
        dd('masuk edit');
    }

    //Update the specified resource in storage.
    public function update($id, Request $request)
    {
        try {
            DB::connection('ConnKCNAccounting')->statement('exec SP_4384_MAINT_SUPPLIER_STATUS @XKode = ?, @IdSupplier = ?, @Status = ?', [4, $id, $request->Status]);
            return response()->json(['success' => (string) 'Status untuk Id Supplier: ' . $id . ' Berhasil Diubah!']);
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
