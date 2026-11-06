<?php

namespace App\Http\Controllers\GPS\Laporan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LaporanHasilPengerjaanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        $bulan = (int)Carbon::now()->format('m');
        $tahun = (int)Carbon::now()->format('Y');
        return view('GPS.Laporan.laporanHasilPengerjaan',
            compact('access', 'bulan', 'tahun'));
    }

    // SP_5409_PJW_HASIL_PENGERJAAN (@bln1, @bln2, @thn1, @thn2)
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
            $rows = $db->select('EXEC [dbo].[SP_5409_PJW_HASIL_PENGERJAAN] @bln1=?, @bln2=?, @thn1=?, @thn2=?', [
                $bln1, $bln2, $thn1, $thn2
            ]);

            $result = [];
            foreach ($rows as $r) {
                $biayaMesin    = (float)($r->BiayaMesin ?? 0);
                $biayaMakloon  = (float)($r->BiayaMakloon ?? 0);
                $biayaMaterial = (float)($r->BiayaMaterial ?? 0);
                $biayaSpart    = (float)($r->BiayaSpart ?? 0);
                $total         = $biayaMesin + $biayaMakloon + $biayaMaterial + $biayaSpart;

                $result[] = [
                    'Bulan'         => trim($r->Bulan ?? ''),
                    'Tahun'         => trim($r->Tahun ?? ''),
                    'BiayaKerja'    => $biayaMesin,
                    'BiayaMakloon'  => $biayaMakloon,
                    'BiayaMaterial' => $biayaMaterial,
                    'BiayaSpart'    => $biayaSpart,
                    'Total'         => $total,
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

    // public function index()
    // {
    //     $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
    //     $bulan = (int)Carbon::now()->format('m');
    //     $tahun = (int)Carbon::now()->format('Y');
    //     return view(
    //         'GPS.Laporan.laporanHasilPengerjaan',
    //         compact('access', 'bulan', 'tahun')
    //     );
    // }

    // // SP_5409_PJW_HASIL_PENGERJAAN (@bln1, @bln2, @thn1, @thn2)
    // public function getData(Request $request)
    // {
    //     $validated = $request->validate([
    //         'bulan' => ['required', 'integer', 'min:1', 'max:12'],
    //         'tahun' => ['required', 'integer', 'min:2000', 'max:2100'],
    //     ]);

    //     $bln  = (int)$validated['bulan'];
    //     $thn2 = (int)$validated['tahun']; // Tahun dari input
    //     $thn1 = $thn2;

    //     $monthsArr = [];
    //     for ($j = 12; $j > 0; $j--) {
    //         $m = $bln - $j + 1;
    //         if ($m <= 0) {
    //             $m = 12 - ($j - $bln) + 1;
    //             $thn1 = $thn2 - 1;
    //         }
    //         $monthsArr[] = $m;
    //     }

    //     $bln1 = $monthsArr[0];
    //     $bln2 = $monthsArr[11];

    //     $db = DB::connection('Connworkshop');
    //     try {
    //         $rows = $db->select('SET NOCOUNT ON; EXEC [dbo].[SP_5409_PJW_HASIL_PENGERJAAN] @bln1=?, @bln2=?, @thn1=?, @thn2=?', [
    //             $bln1,
    //             $bln2,
    //             $thn2,
    //             $thn1
    //         ]);

    //         $result = [];
    //         foreach ($rows as $r) {
    //             $biayaMesin    = (float)($r->BiayaMesin ?? 0);
    //             $biayaMakloon  = (float)($r->BiayaMakloon ?? 0);
    //             $biayaMaterial = (float)($r->BiayaMaterial ?? 0);
    //             $biayaSpart    = (float)($r->BiayaSpart ?? 0);
    //             $total         = $biayaMesin + $biayaMakloon + $biayaMaterial + $biayaSpart;

    //             $result[] = [
    //                 'Bulan'         => trim($r->Bulan ?? ''),
    //                 'Tahun'         => trim($r->Tahun ?? ''),
    //                 'BiayaKerja'    => $biayaMesin,
    //                 'BiayaMakloon'  => $biayaMakloon,
    //                 'BiayaMaterial' => $biayaMaterial,
    //                 'BiayaSpart'    => $biayaSpart,
    //                 'Total'         => $total,
    //             ];
    //         }

    //         return response()->json([
    //             'data'  => $result,
    //             'range' => [
    //                 'bln1' => $bln1,
    //                 'bln2' => $bln2,
    //                 'thn1' => $thn2,
    //                 'thn2' => $thn1,
    //             ],
    //         ]);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
    //     }
    // }
}
