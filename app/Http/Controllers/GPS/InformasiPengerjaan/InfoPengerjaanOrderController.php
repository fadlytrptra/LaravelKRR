<?php

namespace App\Http\Controllers\GPS\InformasiPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InfoPengerjaanOrderController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.InformasiPengerjaan.InfoPengerjaanOrder', compact('access'));
    }

    // SP_5298_PJW_LIST-ORDER-KERJA kode=2 / SP_5298_PJW_LIST-ORDER-PROYEK kode=2
    public function getOrder(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $sp = $validated['jenisOd'] === 'H'
                ? 'EXEC [dbo].[SP_5298_PJW_LIST-ORDER-KERJA] ?, ?'
                : 'EXEC [dbo].[SP_5298_PJW_LIST-ORDER-PROYEK] ?, ?';

            $order = collect($db->select($sp, [2, $validated['noOd']]))->first();
            if (!$order) {
                $label = $validated['jenisOd'] === 'H' ? 'Order Kerja' : 'Order Proyek';
                return response()->json(['error' => "Nomer $label {$validated['noOd']} tidak ada, belum di-ACC, atau ditolak."], 404);
            }

            return response()->json([
                'TDivisi'    => $order->NamaDivisi ?? '',
                'TKdBrg'     => $order->Kd_Brg ?? '',
                'TNamaBrg'   => $validated['jenisOd'] === 'H' ? ($order->Nama_Brg ?? '') : ($order->Nama_Proyek ?? ''),
                'TNoGbr'     => $order->No_Gbr ?? '',
                'TJml'       => trim(($order->Jml_Brg ?? '0') . ' ' . ($order->Satuan ?? '')),
                'OdSts'      => $order->OdSts ?? '',
                'TKetOrder'  => $order->Ket_Order ?? '',
                'TMesin'     => $order->Mesin ?? '',
                'TUserOrder' => $order->UserOrder ?? '',
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Lookup bagian barang (SP_5298_PJW_LIST-BAGIAN-BARANG)
    public function getBagianList(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-BARANG] ?, ?', [
                $validated['noOd'], $validated['jenisOd']
            ]);
            return response()->json(array_map(function ($item) {
                return [
                    'IdBagian'   => $item->NoBagian ?? ($item->IdBagian ?? ''),
                    'NamaBagian' => $item->NamaBagian ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_INF-JADWAL-PER-ORDER kode=5 (H) / 6 (P)
    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'idBag'   => ['required', 'integer'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $kode = ($validated['jenisOd'] === 'H') ? 5 : 6;
        $db = DB::connection('Connworkshop');

        try {
            $rows = $db->select('EXEC [dbo].[SP_5298_PJW_INF-JADWAL-PER-ORDER] @kode=?, @noOd=?, @idbag=?', [
                $kode, $validated['noOd'], $validated['idBag']
            ]);

            $result = [];
            $counter = 1;

            foreach ($rows as $row) {
                // Format JmlDikerjakan
                $jmlDikerjakan = '';
                if (isset($row->HariKe) && $row->HariKe > 0) {
                    $jmlDikerjakan = trim(($row->JmlBrg ?? '0') . ' . ' . $row->HariKe);
                } else {
                    $jmlDikerjakan = trim($row->JmlBrg ?? '0');
                }

                // TglFinish + RealTime + JmlFinish hanya jika TglFinish ada
                $tglFinish = '';
                $realTime  = '';
                $jmlFinish = '';
                if (!empty($row->TglFinish)) {
                    $tglFinish = $row->TglFinish;
                    $realTime  = ($row->RealTimeHour ?? 0) . ' jam ' . ($row->RealTimeMinute ?? 0) . ' menit';
                    $jmlFinish = (int)($row->JmlFinish ?? 0);
                }

                $keterangan = $row->KetCancel ?? '';

                // Inisialisasi kolom setuju/tdk setuju/acc
                $setujuText    = '';
                $alasanText    = '';
                $tdkSetujuText = '';
                $accPPICText   = '';

                $statusOrder    = (int)($row->Status ?? 0);
                $finish         = $row->Finish ?? 'N';
                $setujuKR       = $row->SetujuKR ?? null;
                $tdkSetujuKR    = $row->TdkSetujuKR ?? null;
                $accPPIC        = $row->AccPPIC ?? null;
                $refTdkSetujuKR = $row->RefTdkSetujuKR ?? null;
                $tglTolakMng    = $row->Tgl_Tolak_Mng ?? null;
                $finishT        = $row->FinishT ?? null;
                $cancel         = (int)($row->Cancel ?? 0);

                // Prioritas warna (assignment akhir menang)
                $status = 'default';
                if ($statusOrder === 1) $status = 'emergency';
                if ($finish === 'Y')    $status = 'finish';

                if (!is_null($setujuKR)) {
                    if (is_null($tdkSetujuKR)) {
                        $status = 'setuju';
                        $setujuText = $setujuKR;
                    } else {
                        $setujuText = $setujuKR;
                        $alasanText = $refTdkSetujuKR ?? '';
                        $tdkSetujuText = $tdkSetujuKR;
                        if (is_null($accPPIC)) {
                            $status = 'tdksetuju';
                        } else {
                            $status = 'setuju';
                            $accPPICText = $accPPIC;
                        }
                    }
                } elseif (is_null($setujuKR) && !is_null($tdkSetujuKR)) {
                    $status = 'tdksetuju';
                    $alasanText = $refTdkSetujuKR ?? '';
                    $tdkSetujuText = $tdkSetujuKR;
                    if (!is_null($accPPIC)) {
                        $status = 'setuju';
                        $accPPICText = $accPPIC;
                    }
                }

                if (!is_null($tglTolakMng)) $status = 'tolak-mng';
                if (!is_null($finishT) && $finishT === 'Y') $status = 'finish-total';
                if ($cancel === 1) $status = 'cancel';

                $result[] = [
                    'Nomer'         => $counter,
                    'TglStart'      => $row->EstDate ?? '',
                    'Mesin'         => $row->NamaMesin ?? '',
                    'TypeMesin'     => $row->NamaType ?? '',
                    'Bagian'        => $row->NamaBagian ?? '',
                    'EstTime'       => ($row->EstTimeHour ?? 0) . ' jam ' . ($row->EstTimeMinute ?? 0) . ' menit',
                    'JmlDikerjakan' => $jmlDikerjakan,
                    'TglOperator'   => $tglFinish,
                    'RealTime'      => $realTime,
                    'JmlFinish'     => $jmlFinish,
                    'Keterangan'    => $keterangan,
                    'TglKepRegu'    => $setujuText,
                    'KetTdkSetuju'  => $alasanText,
                    'TglAccPPIC'    => $accPPICText,
                    'statusWarna'   => $status,
                ];
                $counter++;
            }

            return response()->json($result);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
