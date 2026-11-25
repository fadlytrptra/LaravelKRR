<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceACCBayarTTKRR1KencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.MaintenanceACCBayarTTKRR1', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $listPengajuan = $request->input('checkedRows');
        // dd($listPengajuan); // Debugging output

        if (empty($listPengajuan)) {
            return response()->json(['error' => 'TIDAK DAPAT Proses Data, karena tidak ada Data!!!..']);
        }

        $adaProses = false;

        foreach ($listPengajuan as $item) {
            if (isset($item['Id_Penagihan']) && !empty($item['Id_Penagihan'])) {
                $adaProses = true;

                // Call the stored procedure for each item
                DB::connection('ConnKCNAccounting')
                    ->statement('EXEC SP_1273_PRG_UDT_BKK1_TT_LUNAS @IdPenagihan = ?', [$item['Id_Penagihan']]);
            }
        }

        if ($adaProses) {
            return response()->json(['message' => 'Data sudah diACC untuk dibayar !!..']);
        } else {
            return response()->json(['error' => 'Pilih dulu datanya!!.. dengan memberi tanda cawang']);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getPengajuan') {
            $pengajuanDetails = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK1_TT');
            // dd($pengajuanDetails);
            $response = [];
            foreach ($pengajuanDetails as $row) {
                $response[] = [
                    'Waktu_Penagihan' => \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y'),
                    'Id_Penagihan' => trim($row->Id_Penagihan),
                    'NM_SUP' => trim($row->NM_SUP),
                    'Nama_MataUang' => trim($row->Nama_MataUang),
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 2, '.', ','),
                    'Lunas' => trim($row->Lunas),
                ];
            }
            return datatables($response)->make(true);
        } else if ($id == 'getTT') {
            $IdTT = trim($request->input('tt_modal'));
            // dd($IdTT);
            $checkData = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_CHECK_BKK1_IDTT @IdTT = ?', [$IdTT]);

            if ($checkData[0]->Ada == 0) {
                return response()->json(['error' => 'Data Tidak Ada !!.., Hubungi Rus untuk Serah Terima TT !!..']);
            } else {
                $detailData = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_BKK1_IDTT @IdTT = ?', [$IdTT]);

                $response = [
                    'NM_SUP' => trim($detailData[0]->NM_SUP),
                    'Nilai_Pembayaran' => number_format($detailData[0]->Nilai_Pembayaran, 2, '.', ','),
                ];

                return response()->json($response);
            }
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        if ($id == 'updateTT') {
            $IdTT = trim($request->input('tt_modal'));
            $userId = trim($request->input('user_id'));

            DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_UDT_BKK1_USERTT @IDTT = ?, @UserId = ?', [$IdTT, $userId]);

            return response()->json(['message' => 'Data sudah diPROSES!!..']);
        }
    }

    public function destroy($id)
    {
        //
    }
}
