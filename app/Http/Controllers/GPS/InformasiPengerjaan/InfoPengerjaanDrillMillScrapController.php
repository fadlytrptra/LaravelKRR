<?php

namespace App\Http\Controllers\GPS\InformasiPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InfoPengerjaanDrillMillScrapController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        $bulan = (int)Carbon::now()->format('m');
        $tahun = (int)Carbon::now()->format('Y');
        return view(
            'GPS.InformasiPengerjaan.infoPengerjaanDrillMillScrap',
            compact('access', 'bulan', 'tahun')
        );
    }

    // SP_5298_PJW_HITUNG-SISA-JAM-KRJ-DRILL
    // Tipe mesin dipisah per tab: DRILL (10-13), MILL (17-19), SCRAP (41-42)
    // TabPage2 (14-16) di VB Visible=False → tidak ditampilkan
    public function getData(Request $request)
    {
        $validated = $request->validate([
            'bulan' => ['required', 'integer', 'min:1', 'max:12'],
            'tahun' => ['required', 'integer', 'min:2000', 'max:2100'],
        ]);

        $bulan = (int)$validated['bulan'];
        $tahun = (int)$validated['tahun'];
        $daysInMonth = Carbon::create($tahun, $bulan, 1)->daysInMonth;

        // Definisi tab + mesin. Urutan typeId mengikuti mapping VB:
        // 10→Bar(a), 11→Bar(b), 12→Bar(c), 13→Bar(d)
        // 17→Bar(g), 18→Bar(h), 19→Bar(i)
        // 41→Bar(j), 42→Bar(k)
        $tabs = [
            [
                'key'   => 'drill',
                'label' => 'DRILL',
                'types' => [
                    ['typeId' => 10, 'tag' => 'A', 'label' => 'ZX 32 A-1 (DL 1019)', 'colorClass' => 'blue'],
                    ['typeId' => 11, 'tag' => 'B', 'label' => 'ZX 32 A-1 (DL 1022)', 'colorClass' => 'green'],
                    ['typeId' => 12, 'tag' => 'C', 'label' => 'AG 32 Liu San', 'colorClass' => 'red'],
                    ['typeId' => 13, 'tag' => 'D', 'label' => 'QW 32', 'colorClass' => 'brown'],
                ],
                'data'  => [],
            ],
            [
                'key'   => 'drill1',
                'label' => 'DRILL1',
                'types' => [
                    ['typeId' => 14, 'tag' => 'A', 'label' => 'Long Change', 'colorClass' => 'blue'],
                    ['typeId' => 15, 'tag' => 'B', 'label' => 'West Lake', 'colorClass' => 'green'],
                    ['typeId' => 16, 'tag' => 'C', 'label' => 'Bor Radial', 'colorClass' => 'red'],
                ],
                'data'  => [],
            ],
            [
                'key'   => 'mill',
                'label' => 'MILL',
                'types' => [
                    ['typeId' => 17, 'tag' => 'A', 'label' => 'Pao Fong 5 PF - 4 CS Mdl', 'colorClass' => 'blue'],
                    ['typeId' => 18, 'tag' => 'B', 'label' => 'Mill Heckert', 'colorClass' => 'green'],
                    ['typeId' => 19, 'tag' => 'C', 'label' => 'Hobing <Mits - Lorenz>', 'colorClass' => 'red'],
                ],
                'data'  => [],
            ],
            [
                'key'   => 'scrap',
                'label' => 'SCRAP',
                'types' => [
                    ['typeId' => 41, 'tag' => 'A', 'label' => 'BC 6063 (besar)', 'colorClass' => 'blue'],
                    ['typeId' => 42, 'tag' => 'B', 'label' => 'B 6025 A (kecil)', 'colorClass' => 'red'],
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
                                'EXEC [dbo].[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-DRILL] ?, ?',
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
