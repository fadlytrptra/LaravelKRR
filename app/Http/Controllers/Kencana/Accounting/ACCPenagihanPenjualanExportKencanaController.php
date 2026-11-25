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

class ACCPenagihanPenjualanExportKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.ACCPenagihanPenjualanExport', compact('access'));
    }

    // public function getTabelPenagihanEx()
    // {
    //     $data =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ_EXPORT]
    //     @Kode = ?', [4]);
    //     return response()->json($data);
    // }

    // public function getDetailPenagihanEx($id_Penagihan)
    // {
    //     $idPenagihan = str_replace('.', '/', $id_Penagihan);
    //     $data =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ_EXPORT]
    //     @Kode = ?, @ID_Penagihan = ?', [5, $idPenagihan]);
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
        try {
            $listHeader = $request->input('rowDataArray', []);
            // dd($listHeader);
            $user_id = trim(Auth::user()->NomorUser);
            $ada = false;

            foreach ($listHeader as $item) {
                DB::connection('ConnKCNAccounting')
                    ->statement('exec SP_1273_PRG_PENAGIHAN_SJ @UserAcc = ?, @Id_Penagihan = ?, @IdCust = ?, @IdMtUang = ?, @debet = ?, @kurs = ?', [
                        $user_id,                      // @UserAcc
                        trim($item['Id_Penagihan']),   // @Id_Penagihan
                        trim($item['Id_Customer']),    // @IdCust
                        $item['Id_MataUang'],          // @IdMtUang
                        (float) str_replace(',', '', $item['Nilai_Penagihan']),
                        (float) $item['NilaiKurs']             // @kurs
                    ]);

                $ada = true;
            }

            // Jika ada item yang diproses
            if ($ada) {
                return response()->json([
                    'message' => 'Proses Acc Penagihan Surat Jalan Selesai!!',
                ]);
            } else {
                return response()->json([
                    'error' => 'Tidak ada item yang dipilih untuk diproses.',
                ]);
            }
        } catch (Exception $e) {
            // Error handling
            return response()->json(['error' => $e->getMessage(),], 500);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getDisplayHeader') {
            // Execute the stored procedure and fetch the result
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ_EXPORT ?', [4]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Penagihan' => \Carbon\Carbon::parse($row->Tgl_Penagihan)->format('m/d/Y'),
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'NamaCust' => $row->NamaCust,
                    'PO' => $row->PO ?? '',
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 2, '.', ','),
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Id_Customer' => $row->Id_Customer,
                    'Id_MataUang' => $row->Id_MataUang,
                    'NilaiKurs' => $row->NilaiKurs,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getDisplayDetail') {
            $sIdPenagihan = $request->input('id_penagihan');

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ_EXPORT ?, ?', [5, $sIdPenagihan]);
            // dd($results);
            // Siapkan respons dalam format array
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Surat_Jalan' => $row->Surat_Jalan,
                    'Tgl_Surat_jalan' => \Carbon\Carbon::parse($row->Tgl_Surat_jalan)->format('m/d/Y'),
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
        // $id_Penagihan = $request->id_Penagihan;
        // $idCustomer = $request->idCustomer;
        // $idMataUang = $request->idMataUang;
        // $debet = $request->debet;
        // $kurs = $request->kurs;

        // $idPenagihan = str_replace('.', '/', $id_Penagihan);

        // DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_PENAGIHAN_SJ]
        // @UserAcc = ?,
        // @Id_Penagihan = ?,
        // @IdCust = ?,
        // @IdMtUang = ?,
        // @debet = ?,
        // @kurs = ?', [
        //     1,
        //     $idPenagihan,
        //     $idCustomer,
        //     $idMataUang,
        //     $debet,
        //     $kurs
        // ]);
        // return redirect()->back()->with('success', 'Proses Acc Penagihan Surat Jalan Selesai !!');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
