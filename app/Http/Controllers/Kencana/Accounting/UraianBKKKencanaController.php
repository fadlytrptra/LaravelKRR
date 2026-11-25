<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class UraianBKKKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.UraianBKK', compact('access'));
    }

    public function getCheckBKKIdBKKKencana($idBKK)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_CHECK_BKK_IDBKK] @IdBKK = ?', [$idBKK]);
        return response()->json($tabel);
    }

    public function getListBKKKencana($idBKK)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_BKK_IDBKK] @IdBKK = ?', [$idBKK]);
        return response()->json($tabel);
    }

    public function getListBKKTotalIdBKKKencana($idBKK)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_BKK_TOTAL_IDBKK] @IdBKK = ?', [$idBKK]);
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
        $proses = $request->input('proses');
        $userId = trim(Auth::user()->NomorUser);
        $idBKK = $request->input('idBKK');
        // dd($request->all());
        DB::connection('ConnKCNAccounting')->beginTransaction();

        try {
            switch ($proses) {
                case 1:
                    DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_INS_BKK2_DETAILBAYAR @IdDetailBayar = ?, @Rincian = ?, @Nilai = ?, @Perkiraan = ?', [
                        $request->input('idBayar'),
                        $request->input('rincian'),
                        $request->input('nilaiRincian'),
                        $request->input('idKodePerkiraan')
                    ]);
                    break;

                case 2:
                    DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_UDT_BKK2_DETAILBAYAR @IdDetailBayar = ?, @IdPembayaran = ?, @Rincian = ?, @Nilai = ?, @Perkiraan = ?', [
                        $request->input('idDetail'),
                        $request->input('idBayar'),
                        $request->input('rincian'),
                        $request->input('nilaiRincian'),
                        $request->input('idKodePerkiraan')
                    ]);
                    break;
            }

            DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_UDT_BKK_USER_UPDATE @USERID = ?, @IDBKK = ?', [
                $userId,
                $idBKK
            ]);

            DB::connection('ConnKCNAccounting')->commit();

            return response()->json(['message' => 'Data processed successfully']);

        } catch (Exception $e) {
            DB::connection('ConnKCNAccounting')->rollBack();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getListKP') {
            try {
                $results = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_BKK1_KODEPERKIRAAN');
                // dd($results);
                $data = [];
                foreach ($results as $row) {
                    $data[] = [
                        'NoKodePerkiraan' => $row->NoKodePerkiraan,
                        'Keterangan' => $row->Keterangan,
                    ];
                }

                return datatables($data)->make(true);

            } catch (Exception $e) {
                return response()->json(['error' => 'Terjadi kesalahan saat memproses data: ' . $e->getMessage()], 500);
            }
        }
    }

    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        $idDetail = $request->idDetail;
        $rincian = $request->rincian;
        $nilaiRincian = $request->nilaiRincian;
        $idBayar = $request->idBayar;
        $idKodePerkiraan = $request->idKodePerkiraan;

        DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_UDT_BKK2_DETAILBAYAR]
        @IdDetailBayar = ?,
        @IdPembayaran = ?,
        @rincian = ?,
        @Nilai = ?,
        @Perkiraan = ?', [
            $idDetail,
            $rincian,
            $nilaiRincian,
            $idBayar,
            $idKodePerkiraan
        ]);
        return redirect()->back()->with('success', 'Data sudah diKoreksi!');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
