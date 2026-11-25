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

class KodePerkiraanBKMKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.KodePerkiraanBKM', compact('access'));
    }

    // public function getIdBKM5($BlnThn)
    // {
    //     $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_TPELUNASAN] @Kode = ?, @BlnThn = ?', [5, $BlnThn]);
    //     return response()->json($tabel);
    // }
    // public function getIdBKM6($BlnThn)
    // {
    //     $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_TPELUNASAN] @Kode = ?, @BlnThn = ?', [6, $BlnThn]);
    //     return response()->json($tabel);
    // }

    // public function getTabelRincian($idBKM)
    // {
    //     $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_TPELUNASAN] @Kode = ?, @IdBKM = ?', [7, $idBKM]);
    //     return response()->json($tabel);
    // }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {

        if ($request->input('ID_Detail_Pelunasan') == 0) {
            // Call stored procedure for T_PELUNASAN_TAGIHAN
            DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_UPDATE_KDPERKIRAAN_BKM @Kode = ?, @IdPelunasan = ?, @KodePerkiraan = ?', [
                1,
                $request->input('Id_Pelunasan'),
                $request->input('KodePerkiraan')
            ]);
        } else {
            // Call stored procedure for T_DETAIL_PELUNASAN_TAGIHAN
            DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_UPDATE_KDPERKIRAAN_BKM @Kode = ?, @IdDetail = ?, @KodePerkiraan = ?', [
                2,
                $request->input('ID_Detail_Pelunasan'),
                $request->input('KodePerkiraan')
            ]);
        }

        // After process, return a response
        return response()->json([
            'message' => 'Data sudah diKOREKSI!!..'
        ]);

    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getKira') {
            // Execute the stored procedure
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK1_KODEPERKIRAAN');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NoKodePerkiraan' => trim($row->NoKodePerkiraan),
                    'Keterangan' => trim($row->Keterangan),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getPelunasan') {
            $kode = $request->input('kode');

            $blnThn = trim($request->input('bulan')) . substr(trim($request->input('tahun')), -2);
            // dd($blnThn, $kode);
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_TPELUNASAN @Kode = ?, @BlnThn = ?', [$kode, $blnThn]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_BKM' => $row->Id_BKM,
                    'Id_bank' => $row->Id_bank,
                    'Jenis_Pembayaran' => $row->Jenis_Pembayaran,
                    'Symbol' => $row->Symbol,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2),
                ];
            }
            return datatables($response)->make(true);

        } else if ($id == 'listBKM') {
            $T = 0;

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_TPELUNASAN @Kode = 7, @IdBKM = ?', [$request->input('Id_BKM')]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $T++;

                if ($row->Status_Penagihan == 'Y') {
                    $response[] = [
                        'ID_Penagihan' => !is_null($row->ID_Penagihan) ? $row->ID_Penagihan : (!is_null($row->Ket) ? $row->Ket : ''),
                        'Nilai_Lunas' => number_format($row->Nilai_Lunas, 2),
                        'KodePerkiraan' => !is_null($row->KodePerkiraan) ? $row->KodePerkiraan : '',
                        'ID_Detail_Pelunasan' => !is_null($row->ID_Detail_Pelunasan) ? $row->ID_Detail_Pelunasan : '',
                        'Id_Pelunasan' => !is_null($row->Id_Pelunasan) ? $row->Id_Pelunasan : ''
                    ];
                } else {
                    $response[] = [
                        'ID_Penagihan' => !is_null($row->Uraian) ? $row->Uraian : '',
                        'Nilai_Lunas' => number_format($row->Nilai_Pelunasan, 2),
                        'KodePerkiraan' => !is_null($row->KodePerkiraan) ? $row->KodePerkiraan : '',
                        'ID_Detail_Pelunasan' => '0',
                        'Id_Pelunasan' => !is_null($row->Id_Pelunasan) ? $row->Id_Pelunasan : ''
                    ];
                }
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

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
