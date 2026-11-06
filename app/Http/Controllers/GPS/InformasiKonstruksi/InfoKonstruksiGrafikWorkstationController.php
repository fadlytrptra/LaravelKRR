<?php

namespace App\Http\Controllers\GPS\InformasiKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InfoKonstruksiGrafikWorkstationController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        $bulan = (int)Carbon::now()->format('m');
        $tahun = (int)Carbon::now()->format('Y');
        return view('GPS.InformasiKonstruksi.InfoKonstruksiGrafikWorkstation',
            compact('access', 'bulan', 'tahun'));
    }

    // SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI — per hari × tipe work station (1,2,3,4)
    public function getData(Request $request)
    {
        $validated = $request->validate([
            'bulan' => ['required', 'integer', 'min:1', 'max:12'],
            'tahun' => ['required', 'integer', 'min:2000', 'max:2100'],
        ]);

        $bulan = (int)$validated['bulan'];
        $tahun = (int)$validated['tahun'];

        $daysInMonth = Carbon::create($tahun, $bulan, 1)->daysInMonth;
        $types = [1, 2, 3, 4]; // 4 tipe work station

        $db = DB::connection('Connworkshop');

        try {
            // Data per hari: { day: 1, cells: [{typeId, menitPK, menitKrj, jamKrj, isFull}, ...] }
            $result = [];

            for ($day = 1; $day <= $daysInMonth; $day++) {
                $estDate = sprintf('%04d-%02d-%02d', $tahun, $bulan, $day);
                $cells = [];

                foreach ($types as $t) {
                    $menitPK = 0;
                    $menitKrj = 0;
                    $jamKrj = 0;

                    try {
                        $row = collect($db->select(
                            'EXEC [dbo].[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI] ?, ?',
                            [$estDate, $t]
                        ))->first();

                        if ($row) {
                            $menitPK  = (int)($row->TotalMenitPk ?? 0);
                            $menitKrj = (int)($row->TotalMenitKrj ?? 0);
                            $jamKrj   = (int)($row->JamKrj ?? 0);
                        }
                    } catch (\Exception $e) {
                        // Abaikan error per cell, lanjutkan ke sel berikutnya
                    }

                    $isFull = ($menitKrj > 0 && $menitKrj === $menitPK);

                    $cells[] = [
                        'typeId'   => $t,
                        'menitPK'  => $menitPK,
                        'menitKrj' => $menitKrj,
                        'jamKrj'   => $jamKrj,
                        'isFull'   => $isFull,
                    ];
                }

                $result[] = [
                    'day'   => $day,
                    'date'  => $estDate,
                    'cells' => $cells,
                ];
            }

            return response()->json([
                'daysInMonth' => $daysInMonth,
                'data' => $result,
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}