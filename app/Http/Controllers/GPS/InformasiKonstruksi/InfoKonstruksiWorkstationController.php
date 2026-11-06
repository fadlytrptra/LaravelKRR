<?php

namespace App\Http\Controllers\GPS\InformasiKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InfoKonstruksiWorkstationController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');

        // Default date range: awal bulan s/d akhir bulan
        $now = Carbon::now();
        $startDate = $now->copy()->startOfMonth()->format('Y-m-d');
        $endDate   = $now->copy()->endOfMonth()->format('Y-m-d');

        return view('GPS.InformasiKonstruksi.InfoKonstruksiWorkstation', compact('access', 'startDate', 'endDate'));
    }

    /**
     * Lookup Work Station (SP_5298_PJW_LIST-WORKSTATION)
     */
    public function getWorkstationList()
    {
        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-WORKSTATION]');
            return response()->json(array_map(function ($item) {
                return [
                    'NoWrkSts'   => $item->NoWrkSts ?? '',
                    'NamaWorkStation' => $item->NamaWorkStation ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Load jadwal konstruksi per WorkStation dalam rentang tanggal.
     * SP: SP_5298_PJW_NOANTRI-KONSTRUKSI-NOFINISH (kode=1) + SP_5298_PJW_JADWAL-KONSTRUKSI (kode=2)
     */
    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'worksts' => ['required', 'integer'],
            'date1'   => ['required', 'date_format:Y-m-d'],
            'date2'   => ['required', 'date_format:Y-m-d', 'after_or_equal:date1'],
        ]);

        $worksts = $validated['worksts'];
        $date1   = $validated['date1'];
        $date2   = $validated['date2'];

        $db = DB::connection('Connworkshop');

        try {
            // 1. Ambil daftar NoAntrian & EstDate
            $noAntriRows = $db->select(
                'EXEC [dbo].[SP_5298_PJW_NOANTRI-KONSTRUKSI-NOFINISH] ?, ?, ?, ?',
                [1, $worksts, $date1, $date2]
            );

            $result = [];
            $counter = 1;

            foreach ($noAntriRows as $noAntriRow) {
                $noAntri = $noAntriRow->NoAntrian ?? '';
                $estDate = $noAntriRow->EstDate ?? '';
                if (!$noAntri || !$estDate) continue;

                // 2. Detail jadwal per no antrian
                $detail = collect($db->select(
                    'EXEC [dbo].[SP_5298_PJW_JADWAL-KONSTRUKSI] ?, ?, ?, ?',
                    [2, $noAntri, $estDate, $worksts]
                ))->first();

                if (!$detail) continue;

                // Format Est.Time
                $estTime = ($detail->EstTimeHour ?? 0) . ' jam ' . ($detail->EstTimeMinute ?? 0) . ' menit';

                // Tgl Finish & RealTime (hanya jika TglFinish tidak null)
                $tglFinish = '';
                $realTime  = '';
                if (!empty($detail->TglFinish)) {
                    $tglFinish = $detail->TglFinish;
                    $realTime  = ($detail->RealTimeHour ?? 0) . ' jam ' . ($detail->RealTimeMinute ?? 0) . ' menit';
                }

                // Keterangan Cancel
                $keterangan = $detail->KetCancel ?? '';

                // Status warna & kolom Setuju/TdkSetuju/Alasan
                $status      = 'default';
                $setujuText  = '';
                $alasanText  = '';
                $tdkSetujuText = '';

                $statusOrder = (int)($detail->Status ?? 0);
                $finish      = $detail->Finish ?? 'N';
                $setujuKR    = $detail->SetujuKR ?? null;
                $tdkSetujuKR = $detail->TdkSetujuKR ?? null;
                $accPPIC     = $detail->AccPPIC ?? null;
                $refTdkSetujuKR = $detail->RefTdkSetujuKR ?? null;
                $tglTolakMng = $detail->Tgl_Tolak_Mng ?? null;
                $finishT     = $detail->FinishT ?? null;
                $cancel      = (int)($detail->Cancel ?? 0);

                // Prioritas warna (mengikuti VB: assignment terakhir yang menang)
                if ($statusOrder === 1) {
                    $status = 'emergency'; // Red
                }
                if ($finish === 'Y') {
                    $status = 'finish'; // DarkTurquoise
                }

                if (!is_null($setujuKR)) {
                    if (is_null($tdkSetujuKR)) {
                        // Green
                        $status = 'setuju';
                        $setujuText = $setujuKR;
                    } else {
                        // Ada TdkSetujuKR juga
                        $setujuText = $setujuKR;
                        $alasanText = $refTdkSetujuKR ?? '';
                        $tdkSetujuText = $tdkSetujuKR;
                        if (is_null($accPPIC)) {
                            $status = 'tdksetuju'; // Orange
                        } else {
                            $status = 'setuju'; // Green
                        }
                    }
                } elseif (is_null($setujuKR)) {
                    if (!is_null($tdkSetujuKR)) {
                        $status = 'tdksetuju'; // Orange
                        $setujuText = '';
                        $alasanText = $refTdkSetujuKR ?? '';
                        $tdkSetujuText = $tdkSetujuKR;
                    }
                }

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
                    'NoOrder'        => $detail->NoOrder ?? '',
                    'TglStart'       => $detail->EstDate ?? $estDate,
                    'Divisi'         => $detail->NamaDivisi ?? '',
                    'NamaBarang'     => $detail->Nama_Brg ?? '',
                    'NamaBagian'     => $detail->NamaBagian ?? '',
                    'StatusOrder'    => $detail->OdSts ?? '',
                    'EstTime'        => $estTime,
                    'HariKe'         => (int)($detail->HariKe ?? 0),
                    'TglFinish'      => $tglFinish,
                    'RealTime'       => $realTime,
                    'Keterangan'     => $keterangan,
                    'SetujuKR'       => $setujuText,
                    'KetTdkSetujuKR' => $alasanText,     // RefTdkSetujuKR
                    'TdkSetujuKR'    => $tdkSetujuText,  // TdkSetujuKR
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