<?php

namespace App\Http\Controllers\GPS\Laporan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LaporanOrderPengerjaanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        $bulan = (int)Carbon::now()->format('m');
        $tahun = (int)Carbon::now()->format('Y');
        return view('GPS.Laporan.laporanOrderPengerjaan',
            compact('access', 'bulan', 'tahun'));
    }

    // SP_5409_PJW_JML_ORDER_MASUK (@bln1, @bln2, @thn1, @thn2)
    // Rolling window 12 bulan ke belakang dari bulan/tahun yang dipilih.
    public function getData(Request $request)
    {
        $validated = $request->validate([
            'bulan' => ['required', 'integer', 'min:1', 'max:12'],
            'tahun' => ['required', 'integer', 'min:2000', 'max:2100'],
        ]);

        $bln  = (int)$validated['bulan'];
        $thn2 = (int)$validated['tahun'];
        $thn1 = $thn2;

        $monthsArr = [];
        for ($j = 12; $j > 0; $j--) {
            $m = $bln - $j + 1;
            if ($m <= 0) {
                $m = 12 - ($j - $bln) + 1;
                $thn1 = $thn2 - 1;
            }
            $monthsArr[] = $m;
        }
        $bln1 = $monthsArr[0];
        $bln2 = $monthsArr[11];

        $db = DB::connection('Connworkshop');
        try {
            $rows = $db->select('EXEC [dbo].[SP_5409_PJW_JML_ORDER_MASUK] @bln1 = ?, @bln2 = ?, @thn1 = ?, @thn2 = ?', [
                $bln1, $bln2, $thn1, $thn2
            ]);

            $result = [];
            foreach ($rows as $r) {
                $masukP = (int)($r->MasukP ?? 0);
                $masukH = (int)($r->MasukH ?? 0);
                $result[] = [
                    'BulanP' => trim($r->BulanP ?? ''),
                    'TahunP' => trim($r->TahunP ?? ''),
                    'MasukP' => $masukP,
                    'MasukH' => $masukH,
                    'BulanH' => trim($r->BulanH ?? ''),
                    'TahunH' => trim($r->TahunH ?? ''),
                    'Total'  => $masukH + $masukP,
                ];
            }

            return response()->json([
                'data'  => $result,
                'range' => [
                    'bln1' => $bln1, 'bln2' => $bln2,
                    'thn1' => $thn1, 'thn2' => $thn2,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}