<?php

namespace App\Http\Controllers\GPS\InformasiKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InfoKonstruksiOrderController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.InformasiKonstruksi.InfoKonstruksiOrder', compact('access'));
    }

    /**
     * Load order gambar (SP_5298_PJW_LIST-ORDER-GAMBAR kode=2)
     */
    public function getOrder(Request $request)
    {
        $validated = $request->validate([
            'noOd' => ['required', 'string', 'max:6'],
        ]);

        $noOd = $validated['noOd'];
        $db = DB::connection('Connworkshop');

        try {
            // SP_5298_PJW_LIST-ORDER-GAMBAR kode=2
            $order = collect($db->select(
                'EXEC [SP_5298_PJW_LIST-ORDER-GAMBAR] ?, ?',
                [2, $noOd]
            ))->first();

            if (!$order) {
                return response()->json([
                    'error' => "Nomer Order Kerja $noOd tidak ada, belum di-ACC, ditolak, atau sudah finish."
                ], 404);
            }

            return response()->json([
                'TDivisi'    => $order->NamaDivisi ?? '',
                'TKdBrg'     => $order->Kd_Brg ?? '',
                'TNamaBrg'   => $order->Nama_Brg ?? '',
                'TNoGbr'     => $order->No_Gbr_Rev ?? '',
                'OdSts'      => $order->OdSts ?? '',
                'TKetOrder'  => $order->Ket_Order ?? '',
                'TMesin'     => $order->Mesin ?? '',
                'TUserOrder' => $order->Pengorder ?? '',
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Lookup Bagian Gambar (SP_5298_PJW_LIST-BAGIAN-GAMBAR)
     */
    public function getBagianList(Request $request)
    {
        $validated = $request->validate([
            'noOd' => ['required', 'string', 'max:6'],
        ]);

        $noOd = $validated['noOd'];
        $db = DB::connection('Connworkshop');

        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-GAMBAR] @noOd = ?', [$noOd]);
            return response()->json(array_map(function ($item) {
                return [
                    'IdBagian'   => $item->IdBagian ?? '',
                    'NamaBagian' => $item->NamaBagian ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Load jadwal konstruksi per order & bagian
     * SP_5298_PJW_INF-KONSTRUKSI-PER-ORDER kode=3 (@noOd, @idBag)
     */
    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'idBag'   => ['required', 'integer'],
        ]);

        $noOd  = $validated['noOd'];
        $idBag = $validated['idBag'];

        $db = DB::connection('Connworkshop');

        try {
            $rows = $db->select(
                'EXEC [dbo].[SP_5298_PJW_INF-KONSTRUKSI-PER-ORDER] @kode = ?, @noOd = ?, @idBag = ?',
                [3, $noOd, $idBag]
            );

            $result = [];
            $counter = 1;

            foreach ($rows as $row) {
                // Format Est.Time
                $estTime = ($row->EstTimeHour ?? 0) . ' jam ' . ($row->EstTimeMinute ?? 0) . ' menit';

                // Tgl Finish & RealTime (hanya jika TglFinish tidak null)
                $tglFinish = '';
                $realTime  = '';
                if (!empty($row->TglFinish)) {
                    $tglFinish = $row->TglFinish;
                    $realTime  = ($row->RealTimeHour ?? 0) . ' jam ' . ($row->RealTimeMinute ?? 0) . ' menit';
                }

                // Keterangan Cancel
                $keterangan = $row->KetCancel ?? '';

                // Inisialisasi kolom Setuju/TdkSetuju/Alasan
                $status         = 'default';
                $setujuText     = '';
                $alasanText     = '';
                $tdkSetujuText  = '';

                $statusOrder    = (int)($row->Status ?? 0);
                $finish         = $row->Finish ?? 'N';
                $setujuKR       = $row->SetujuKR ?? null;
                $tdkSetujuKR    = $row->TdkSetujuKR ?? null;
                $accPPIC        = $row->AccPPIC ?? null;
                $refTdkSetujuKR = $row->RefTdkSetujuKR ?? null;
                $tglTolakMng    = $row->Tgl_Tolak_Mng ?? null;
                $finishT        = $row->FinishT ?? null;
                $cancel         = (int)($row->Cancel ?? 0);

                // Prioritas warna (mengikuti VB: assignment terakhir yang menang)
                if ($statusOrder === 1) {
                    $status = 'emergency'; // Red
                }
                if ($finish === 'Y') {
                    $status = 'finish'; // DarkTurquoise
                }

                // Logika Setuju / Tdk Setuju KR
                if (!is_null($setujuKR)) {
                    if (is_null($tdkSetujuKR)) {
                        // Green — finish, disetujui
                        $status = 'setuju';
                        $setujuText = $setujuKR;
                    } else {
                        // Ada TdkSetujuKR juga
                        $setujuText    = $setujuKR;
                        $alasanText    = $refTdkSetujuKR ?? '';
                        $tdkSetujuText = $tdkSetujuKR;
                        if (is_null($accPPIC)) {
                            $status = 'tdksetuju'; // Orange
                        } else {
                            $status = 'setuju'; // Green
                        }
                    }
                } elseif (is_null($setujuKR)) {
                    if (!is_null($tdkSetujuKR)) {
                        $status         = 'tdksetuju'; // Orange
                        $setujuText     = '';
                        $alasanText     = $refTdkSetujuKR ?? '';
                        $tdkSetujuText  = $tdkSetujuKR;
                    }
                }

                // Prioritas akhir (VB assignment terakhir menang)
                if (!is_null($tglTolakMng)) {
                    $status = 'tolak-mng'; // DarkViolet
                }
                if (!is_null($finishT) && $finishT === 'Y') {
                    $status = 'finish-total'; // Blue
                }
                if ($cancel === 1) {
                    $status = 'cancel'; // HotPink
                }

                $result[] = [
                    'Nomer'          => $counter,
                    'TglStart'       => $row->EstDate ?? '',
                    'WorkStation'    => $row->NamaWorkStation ?? '',
                    'EstTime'        => $estTime,
                    'HariKe'         => (int)($row->HariKe ?? 0),
                    'TglFinish'      => $tglFinish,
                    'RealTime'       => $realTime,
                    'Keterangan'     => $keterangan,
                    'SetujuKR'       => $setujuText,
                    'KetTdkSetujuKR' => $alasanText,
                    'TglTdkSetujuKR' => $tdkSetujuText,
                    'statusWarna'    => $status,
                ];
                $counter++;
            }

            return response()->json($result);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
