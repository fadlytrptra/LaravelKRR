<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class StatusDokumenTagihanKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.StatusDokumenTagihan', compact('access'));
    }

    // public function getCust()
    // {
    //     $data =  DB::connection('ConnKCNAccounting')->select('exec [SP_1486_SLS_LIST_ALL_CUSTOMER]
    //     @Kode = ?', [1]);
    //     return response()->json($data);
    // }

    // public function getTabelStatusDokumen($idCustomer)
    // {
    //     $data =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_MAINT_STATUS_DOKUMEN]
    //     @Kode = ?, @ID_Customer = ?', [1, $idCustomer]);
    //     return response()->json($data);
    // }

    // public function getDataStatusDokumen()
    // {
    //     $data =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_MAINT_STATUS_DOKUMEN]
    //     @Kode = ?', [3]);
    //     return response()->json($data);
    // }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        // dd($request->all());
        $idStatus = $request->input('idStatus');
        $idPenagihan = $request->input('idPenagihan');

        if (empty($idStatus)) {
            return response()->json(['error' => 'Isi Statusnya dulu']);
        }

        try {
            DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_MAINT_STATUS_DOKUMEN @Kode = ?, @IdStatus = ?, @ID_Penagihan = ?', [
                4,
                $idStatus,
                $idPenagihan
            ]);

            return response()->json(['message' => 'Status updated successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getCustomer') {
            // Call stored procedure to get customer list
            $results = DB::connection('ConnKCNSales')
                ->select('exec SP_1273_PRG_LIST_ALL_CUSTOMER ?', ['1']);
            // dd($results);
            // Instance to handle lookup (similar to mLook class in VB)
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NamaCust' => trim($row->NamaCust),
                    'IDCust' => trim($row->IDCust),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getDocumentStatus') {
            $customerId = $request->input('idCustomer');

            $documentResults = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_MAINT_STATUS_DOKUMEN ?, ?', [1, $customerId]);
            // dd($documentResults);
            $response = [];
            foreach ($documentResults as $row) {
                $response[] = [
                    'ID_Penagihan' => trim($row->ID_Penagihan),
                    'tgl_penagihan' => date('m/d/Y', strtotime($row->tgl_penagihan)),
                    'idstatus' => $row->idstatus ?? '',
                    'status' => $row->status ?? '',
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getStatus') {
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_MAINT_STATUS_DOKUMEN ?', ['3']);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'IdStatus' => trim($row->IdStatus),
                    'Status' => trim($row->Status),
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
        // dd($request->all());
        $idStatus = $request->idStatus;
        $id_Penagihan = $request->id_Penagihan;
        $idPenagihan = str_replace('.', '/', $id_Penagihan);


        DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_MAINT_STATUS_DOKUMEN]
        @Kode = ?,
        @IdStatus = ?,
        @Id_Penagihan = ?',
            [
                4,
                $idStatus,
                $idPenagihan
            ]
        );

        return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
