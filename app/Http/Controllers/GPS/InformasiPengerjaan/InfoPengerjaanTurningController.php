<?php
// masih dalam development, belum diimplementasikan sepenuhnya karena no type mesin tidak ada pada program lama vb!.
namespace App\Http\Controllers\GPS\InformasiPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InfoPengerjaanTurningController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        $bulan = (int)Carbon::now()->format('m');
        $tahun = (int)Carbon::now()->format('Y');
        return view(
            'GPS.InformasiPengerjaan.infoPengerjaanTurning',
            compact('access', 'bulan', 'tahun')
        );
    }

    // SP_5298_PJW_HITUNG-SISA-JAM-KRJ-TURNING
    public function getData(Request $request)
    {
        $validated = $request->validate([
            'bulan' => ['required', 'integer', 'min:1', 'max:12'],
            'tahun' => ['required', 'integer', 'min:2000', 'max:2100'],
        ]);

        $bulan = (int)$validated['bulan'];
        $tahun = (int)$validated['tahun'];
        $daysInMonth = Carbon::create($tahun, $bulan, 1)->daysInMonth;

        $tabs = [
            [
                'key'   => '1',
                'label' => ' ... ',
                'types' => [
                    ['typeId' => 1, 'tag' => 'A', 'label' => 'L 5 dia 500x 1500(TR 1010)', 'colorClass' => 'blue'],
                    ['typeId' => 2, 'tag' => 'B', 'label' => 'L 5 dia 500x 1500(TR 1015)', 'colorClass' => 'green'],
                    ['typeId' => 3, 'tag' => 'C', 'label' => 'L 5 dia 500x 1500(TR 1016)', 'colorClass' => 'red'],
                ],
                'data'  => [],
            ],
            [
                'key'   => '2',
                'label' => ' ... ',
                'types' => [
                    ['typeId' => 4, 'tag' => 'A', 'label' => 'L 5 dia 500x 1500(TR 1011)', 'colorClass' => 'blue'],
                    ['typeId' => 5, 'tag' => 'B', 'label' => 'L 5 dia 500x 1500(TR 1012)', 'colorClass' => 'green'],
                    ['typeId' => 6, 'tag' => 'C', 'label' => 'CZ 6280S dia 800 x 3000', 'colorClass' => 'red'],
                ],
                'data'  => [],
            ],
            [
                'key'   => '3',
                'label' => ' ... ',
                'types' => [
                    ['typeId' => 7, 'tag' => 'A', 'label' => 'TR Renovasi dia 500 x 1000', 'colorClass' => 'blue'],
                    ['typeId' => 8, 'tag' => 'B', 'label' => 'Sanyuen GF-1700 HS', 'colorClass' => 'green'],
                    ['typeId' => 9, 'tag' => 'C', 'label' => 'Bubut Melintang', 'colorClass' => 'red'],
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
                                'EXEC [dbo].[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-TURNING] ?, ?',
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
