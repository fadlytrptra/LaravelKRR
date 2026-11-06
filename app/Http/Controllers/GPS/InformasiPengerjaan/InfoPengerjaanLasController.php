<?php

namespace App\Http\Controllers\GPS\InformasiPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InfoPengerjaanLasController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        $bulan = (int)Carbon::now()->format('m');
        $tahun = (int)Carbon::now()->format('Y');
        return view(
            'GPS.InformasiPengerjaan.infoPengerjaanLas',
            compact('access', 'bulan', 'tahun')
        );
    }

    // SP_5298_PJW_HITUNG-SISA-JAM-KRJ-LAS per hari × tipe mesin
    // Tipe: 27, 28, 29, 30, 31, 32, 33, 53
    public function getData(Request $request)
    {
        $validated = $request->validate([
            'bulan' => ['required', 'integer', 'min:1', 'max:12'],
            'tahun' => ['required', 'integer', 'min:2000', 'max:2100'],
        ]);

        $bulan = (int)$validated['bulan'];
        $tahun = (int)$validated['tahun'];
        $daysInMonth = Carbon::create($tahun, $bulan, 1)->daysInMonth;

        // Urutan typeId mengikuti mapping VB j = 1..8:
        // 27 → no suffix, 28 → a, 29 → b, 30 → c, 31 → d, 32 → e, 33 → f, 53 → g
        $tabs = [
            [
                'key'   => '1',
                'label' => ' ... ',
                'types' => [
                    ['typeId' => 27, 'tag' => 'A', 'label' => 'Tig (T 200)', 'colorClass' => 'blue'],
                    ['typeId' => 28, 'tag' => 'B', 'label' => 'ESSAB LHE 300 Nomer 1', 'colorClass' => 'green'],
                    ['typeId' => 29, 'tag' => 'C', 'label' => 'ESSAB LHE 300 Nomer 2', 'colorClass' => 'red'],
                    ['typeId' => 30, 'tag' => 'D', 'label' => 'ESSAB LHE 300 Nomer 3', 'colorClass' => 'brown'],
                ],
                'data'  => [],
            ],
            [
                'key'   => '2',
                'label' => ' ... ',
                'types' => [
                    ['typeId' => 31, 'tag' => 'A', 'label' => 'Power Compact 250', 'colorClass' => 'blue'],
                    ['typeId' => 32, 'tag' => 'B', 'label' => 'ESSAB THF 400', 'colorClass' => 'green'],
                    ['typeId' => 33, 'tag' => 'C', 'label' => 'Spot Welding', 'colorClass' => 'red'],
                    ['typeId' => 53, 'tag' => 'D', 'label' => 'Acetylin', 'colorClass' => 'brown'],
                ],
                'data'  => [],
            ],
        ];

        $db = DB::connection('Connworkshop');

        try {
            for ($day = 1; $day <= $daysInMonth; $day++) {
                $estDate = sprintf('%04d-%02d-%02d', $tahun, $bulan, $day);

                foreach ($tabs as &$tab) {
                    $cells = [];

                    foreach ($tab['types'] as $t) {
                        $menitPK  = 0;
                        $menitKrj = 0;
                        $jamKrj   = 0;

                        try {
                            $row = collect($db->select(
                                'EXEC [dbo].[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-LAS] ?, ?',
                                [$estDate, $t['typeId']]
                            ))->first();

                            if ($row) {
                                $menitPK  = (int)($row->TotalMenitPk ?? 0);
                                $menitKrj = (int)($row->TotalMenitKrj ?? 0);
                                $jamKrj   = (int)($row->JamKrj ?? 0);
                            }
                        } catch (\Exception $e) {
                            // Abaikan error per cell
                        }

                        $cells[] = [
                            'typeId'   => $t['typeId'],
                            'menitPK'  => $menitPK,
                            'menitKrj' => $menitKrj,
                            'jamKrj'   => $jamKrj,
                            'isFull'   => ($menitKrj > 0 && $menitKrj === $menitPK),
                        ];
                    }

                    $tab['data'][] = [
                        'day'   => $day,
                        'date'  => $estDate,
                        'cells' => $cells,
                    ];
                }
                unset($tab);
            }

            return response()->json([
                'daysInMonth' => $daysInMonth,
                'tabs'        => $tabs,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
