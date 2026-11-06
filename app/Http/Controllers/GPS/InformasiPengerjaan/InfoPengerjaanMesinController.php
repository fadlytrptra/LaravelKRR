<?php

namespace App\Http\Controllers\GPS\InformasiPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InfoPengerjaanMesinController extends Controller
{
    // Mapping mesin ID → suffix SP
    private function getMesinSuffix($noMesin)
    {
        $map = [
            1 => 'TURNING',
            2 => 'DRILL',
            4 => 'GRINDING',
            6 => 'LAS',
            8 => 'PUNCH',
            10 => 'EDM',
            15 => 'FINISHING',
            16 => 'MAKLOON',
            17 => 'MEKATRONIK',
        ];
        return $map[$noMesin] ?? null;
    }

    private function getMesinPrefix($noMesin)
    {
        return ($noMesin == 17) ? 'SP_5409_PJW' : 'SP_5298_PJW';
    }

    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');

        // Default date: awal bulan s/d akhir bulan
        $now = Carbon::now();
        $startDate = $now->copy()->startOfMonth()->format('Y-m-d');
        $endDate   = $now->copy()->endOfMonth()->format('Y-m-d');

        return view(
            'GPS.InformasiPengerjaan.InfoPengerjaanMesin',
            compact('access', 'startDate', 'endDate')
        );
    }

    // Lookup mesin (SP_5298_PJW_LIST-TYPE-MESIN kode=1)
    public function getMesinList()
    {
        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-TYPE-MESIN] ?', [1]);
            return response()->json(array_map(function ($item) {
                return [
                    'NoMesin'   => $item->NoMesin ?? '',
                    'NamaMesin' => $item->NamaMesin ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Lookup type mesin (SP_5298_PJW_LIST-TYPE-MESIN kode=2, noMesin)
    public function getTypeList(Request $request)
    {
        $validated = $request->validate([
            'noMesin' => ['required', 'integer'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-TYPE-MESIN] ?, ?', [2, $validated['noMesin']]);
            return response()->json(array_map(function ($item) {
                return [
                    'NoType'   => $item->NoType ?? '',
                    'NamaType' => $item->NamaType ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_NOANTRI-{MESIN}-NOFINISH kode=1 + SP_5298_PJW_JADWAL-{MESIN} kode=3/4
    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'noMesin' => ['required', 'integer'],
            'noType'  => ['required', 'integer'],
            'date1'   => ['required', 'date_format:Y-m-d'],
            'date2'   => ['required', 'date_format:Y-m-d', 'after_or_equal:date1'],
        ]);

        $suffix = $this->getMesinSuffix($validated['noMesin']);
        if (!$suffix) {
            return response()->json(['error' => 'Mesin tidak dikenali.'], 400);
        }
        $prefix = $this->getMesinPrefix($validated['noMesin']);
        $db = DB::connection('Connworkshop');

        try {
            // 1. Ambil daftar NoAntrian dari SP_5298_PJW_NOANTRI-{SUFFIX}-NOFINISH kode=1
            $spNoAntri = "EXEC [dbo].[{$prefix}_NOANTRI-{$suffix}-NOFINISH] ?, ?, ?, ?";
            $noAntriRows = $db->select($spNoAntri, [
                1,
                $validated['noType'],
                $validated['date1'],
                $validated['date2'],
            ]);

            $result = [];
            $counter = 1;

            foreach ($noAntriRows as $noAntriRow) {
                $noAntri = $noAntriRow->NoAntrian ?? '';
                $jenisOd = $noAntriRow->JenisOrder ?? 'H';
                $estDate = $noAntriRow->EstDate ?? '';
                if (!$noAntri || !$estDate) continue;

                // 2. Detail via SP_5298_PJW_JADWAL-{SUFFIX} kode=3 (H) / 4 (P)
                $kode = ($jenisOd === 'H') ? 3 : 4;
                $spJadwal = "EXEC [dbo].[{$prefix}_JADWAL-{$suffix}] ?, ?, ?, ?";
                $detail = collect($db->select($spJadwal, [
                    $kode,
                    $noAntri,
                    $estDate,
                    $validated['noType']
                ]))->first();

                if (!$detail) continue;

                // Format Nama Barang & Kd Barang berdasarkan jenis order
                $namaBrg = ($jenisOd === 'H') ? ($detail->Nama_Brg ?? '') : ($detail->Nama_Proyek ?? '');
                $kdBrg   = ($jenisOd === 'H') ? ($detail->Kd_Brg ?? '') : '';
                $noGbr   = ($jenisOd === 'H') ? ($detail->No_Gbr ?? '') : '';

                // Format JmlDikerjakan
                $jmlDikerjakan = '';
                if (isset($detail->HariKe) && $detail->HariKe > 0) {
                    $jmlDikerjakan = trim(($detail->JmlBrg ?? '0') . ' . ' . $detail->HariKe);
                } else {
                    $jmlDikerjakan = trim($detail->JmlBrg ?? '0');
                }

                // Format Tgl Finish & RealTime (jika ada)
                $tglFinish = '';
                $realTime  = '';
                $jmlFinish = '';
                if (!empty($detail->TglFinish)) {
                    $tglFinish = $detail->TglFinish;
                    $realTime  = ($detail->RealTimeHour ?? 0) . ' jam ' . ($detail->RealTimeMinute ?? 0) . ' menit';
                    $jmlFinish = (int)($detail->JmlFinish ?? 0);
                }

                // Keterangan Cancel
                $keterangan = $detail->KetCancel ?? '';

                // Tentukan kolom Setuju/TdkSetuju/Alasan
                $setujuText     = '';
                $alasanText     = '';
                $tdkSetujuText  = '';
                $accPPICText    = '';

                $statusOrder    = (int)($detail->Status ?? 0);
                $finish         = $detail->Finish ?? 'N';
                $setujuKR       = $detail->SetujuKR ?? null;
                $tdkSetujuKR    = $detail->TdkSetujuKR ?? null;
                $accPPIC        = $detail->AccPPIC ?? null;
                $refTdkSetujuKR = $detail->RefTdkSetujuKR ?? null;
                $tglTolakMng    = $detail->Tgl_Tolak_Mng ?? null;
                $finishT        = $detail->FinishT ?? null;
                $cancel         = (int)($detail->Cancel ?? 0);

                // Prioritas warna (assignment akhir menang)
                $status = 'default';
                if ($statusOrder === 1)    $status = 'emergency';
                if ($finish === 'Y')       $status = 'finish';

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
                    'NoOrder'       => $detail->NoOd ?? '',
                    'TglStart'      => $detail->EstDate ?? $estDate,
                    'Divisi'        => $detail->NamaDivisi ?? '',
                    'Barang'        => $namaBrg,
                    'Bagian'        => $detail->NamaBagian ?? '',
                    'KdBarang'      => $kdBrg,
                    'NoGambar'      => $noGbr,
                    'JmlOrder'      => trim(($detail->Jml_Brg ?? '0') . ' ' . ($detail->Satuan ?? '')),
                    'StatusOrder'   => $detail->OdSts ?? '',
                    'EstTime'       => ($detail->EstTimeHour ?? 0) . ' jam ' . ($detail->EstTimeMinute ?? 0) . ' menit',
                    'JmlDikerjakan' => $jmlDikerjakan,
                    'TglOperator'   => $tglFinish,
                    'RealTime'      => $realTime,
                    'JmlFinish'     => $jmlFinish,
                    'Keterangan'    => $keterangan,
                    'TglKepRegu'    => $setujuText,     // Tgl. disetujui KR
                    'KetTdkSetuju'  => $alasanText,     // RefTdkSetujuKR
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
