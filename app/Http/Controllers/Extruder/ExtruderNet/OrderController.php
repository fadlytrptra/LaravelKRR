<?php

namespace App\Http\Controllers\Extruder\ExtruderNet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index($form_name, $nama_gedung = null)
    {
        $view_name = 'extruder.Extruder.' . $form_name;
        $form_data = [];

        $id_divisi = "";
        $kode_benang = "";
        switch ($nama_gedung) {
            case 'B':
                $id_divisi = "MEX";
                $kode_benang = 3;
                break;

            case 'D':
                $id_divisi = "DEX";
                $kode_benang = 5;
                break;

            default:
                $id_divisi = "EXT";
                $kode_benang = 2;
                break;
        }

        switch ($form_name) {
            case 'formOrderMaintenance':
                // $form_data = ['listBenang' => $this->getListBenang($kode_benang)];
                $form_data = [];
                break;

            case 'formOrderStatus':
                $form_data = ['listBatalOrder' => $this->getListBatalOrd($id_divisi)];
                // $form_data = [];
                break;

            default:
                break;
        }

        $form_data['namaGedung'] = $nama_gedung;
        $view_data = [
            'pageName' => 'Extruder',
            'formName' => $form_name,
            'formData' => $form_data,
        ];

        return view($view_name, $view_data);
    }

    #region Order - Maintenance
    public function getListBenang($kode)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_BENANG @kode = ?',
            [$kode]
        );
    }

    public function insOrderBenang(Request $request)
    {
        try {
            $validated = $request->validate([
                'gedung' => 'required|string',
                'tanggal' => 'required|date',
                'identifikasi' => 'required|string',
                'kode' => 'nullable|string'
            ]);

            $cleanIdentifikasi = strtoupper($validated['identifikasi']);
            $userId = Auth::user()->NomorUser;

            if ($validated['gedung'] === 'B') {
                DB::connection('ConnExtruder')->statement(
                    'exec SP_1273_MEX_INSERT_ORDER_BENANG @tanggal = ?, @identifikasi = ?, @user = ?',
                    [$validated['tanggal'], $cleanIdentifikasi, $userId]
                );
            } else {
                DB::connection('ConnExtruder')->statement(
                    'exec SP_5298_EXT_INSERT_ORDER_BENANG @tanggal = ?, @identifikasi = ?, @user = ?, @kode = ?',
                    [$validated['tanggal'], $cleanIdentifikasi, $userId, $validated['kode'] ?? null]
                );
            }

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    // public function getNoOrder($kode = null)
    // {
    //     $divisi = $kode == 'D'
    //         ? 'DEX'
    //         : 'EXT';

    //     $mCounterResult = DB::connection('ConnExtruder')
    //         ->select('SELECT IdOrder + 1 AS mCounter FROM CounterTrans WHERE divisi = ?', [$divisi]);

    //     $mCounter = $mCounterResult[0]->mCounter;
    //     $mCode = '000000000' . $mCounter;
    //     $mCode = $divisi . substr($mCode, -7);

    //     return response()->json(['NoOrder' => $mCode]);

    //     // *Query SELECT pada SP_5298_EXT_INSERT_ORDER_BENANG
    // }

    // public function getNoOrderMjs()
    // {
    //     $mCounterResult = DB::connection('ConnExtruder')
    //         ->select('SELECT IdOrder + 1 AS mCounter FROM CounterTrans WHERE divisi = ?', ['MEX']);

    //     $mCounter = $mCounterResult[0]->mCounter;
    //     $mCode = '000000000' . $mCounter;
    //     $mCode = 'MEX' . substr($mCode, -7);

    //     return response()->json(['NoOrder' => $mCode]);

    //     // *Query SELECT pada SP_1273_MEX_INSERT_ORDER_BENANG
    // }

    public function getNoOrder($kode = null)
    {
        $divisi = $kode == 'D' ? 'DEX' : 'EXT';

        $mCounterResult = DB::connection('ConnExtruder')
            ->select('SELECT IdOrder AS mCounter FROM CounterTrans WHERE divisi = ?', [$divisi]);

        $mCounter = !empty($mCounterResult) ? $mCounterResult[0]->mCounter + 1 : 1;

        $mCode = '000000000' . $mCounter;
        $mCode = $divisi . substr($mCode, -7);

        return response()->json(['NoOrder' => $mCode]);
    }

    public function getNoOrderMjs()
    {
        $mCounterResult = DB::connection('ConnExtruder')
            ->select('SELECT IdOrder AS mCounter FROM CounterTrans WHERE divisi = ?', ['MEX']);

        $mCounter = !empty($mCounterResult) ? $mCounterResult[0]->mCounter + 1 : 1;

        $mCode = '000000000' . $mCounter;
        $mCode = 'MEX' . substr($mCode, -7);

        return response()->json(['NoOrder' => $mCode]);
    }

    public function insOrderDetail(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_order' => 'required|string',
                'type_benang' => 'required|string',
                'jmlh_primer' => 'required|numeric',
                'jmlh_sekunder' => 'required|numeric',
                'jmlh_tritier' => 'required|numeric',
                'prod_primer' => 'required|numeric',
                'prod_sekunder' => 'required|numeric',
                'prod_tritier' => 'required|numeric'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_INSERT_ORDERDETAIL_BENANG @idorder = ?, @typebenang = ?, @jumlahprimer = ?, @jumlahsekunder = ?, @jumlahtritier = ?, @jumprodprimer = ?, @jumprodsekunder = ?, @jumprodtritier = ?',
                [$validated['id_order'], strtoupper($validated['type_benang']), $validated['jmlh_primer'], $validated['jmlh_sekunder'], $validated['jmlh_tritier'], $validated['prod_primer'], $validated['prod_sekunder'], $validated['prod_tritier']]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function updCounterOrder(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_divisi' => 'required|string'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_UPDATE_COUNTER_ORDER @iddivisi = ?',
                [$validated['id_divisi']]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
    #endregion

    #region Order - ACC
    public function getOrderBlmAcc($divisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_ORDER_BLM_ACC @divisi = ?',
            [$divisi]
        );
    }

    public function getListSpek($id_order)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_SPEK_ORDER_1 @idorder = ?',
            [$id_order]
        );
    }

    public function updAccOrder(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_order' => 'required|string'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_ACC_ORDER @idorder = ?, @useracc = ?',
                [$validated['id_order'], Auth::user()->NomorUser]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
    #endregion

    #region Order - Status
    public function getListBatalOrd($id_divisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_BATAL_ORDER @iddivisi = ?',
            [$id_divisi]
        );
    }

    public function getListOrderBtl($id_order)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_ORDER_BATAL @idorder = ?',
            [$id_order]
        );
    }

    public function updStatusOrder(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_order' => 'required|string',
                'status' => 'required|string',
                'ket' => 'required|string'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_STATUS_ORDER @idorder = ?, @status = ?, @ket = ?',
                [$validated['id_order'], $validated['status'], strtoupper($validated['ket'])]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
    #endregion
}
