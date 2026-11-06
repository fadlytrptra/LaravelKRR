<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class PengerjaanDeleteMesinController extends Controller
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

        // Default date range: awal bulan s/d akhir bulan
        $now = Carbon::now();
        $startDate = $now->copy()->startOfMonth()->format('Y-m-d');
        $endDate   = $now->copy()->endOfMonth()->format('Y-m-d');

        return view('GPS.JadwalPengerjaan.PengerjaanDeleteMesin', compact('access', 'startDate', 'endDate'));
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


    // Load jadwal pengerjaan per mesin & type dalam rentang tanggal.
    // SP_5298_PJW_NOANTRI-{SUFFIX}-NOFINISH kode=2 + SP_5298_PJW_JADWAL-{SUFFIX} kode=3/4

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
            // 1. Ambil daftar no antrian & estDate dalam rentang (kode=2)
            $spNoAntri = "EXEC [dbo].[{$prefix}_NOANTRI-{$suffix}-NOFINISH] ?, ?, ?, ?";
            $noAntriRows = $db->select($spNoAntri, [
                2,
                $validated['noType'],
                $validated['date1'],
                $validated['date2'],
            ]);

            $jadwal = [];
            foreach ($noAntriRows as $row) {
                $noAntri = $row->NoAntrian ?? '';
                $jenisOd = $row->JenisOrder ?? 'H';
                $estDate = $row->EstDate ?? '';
                if (!$noAntri || !$estDate) continue;

                // 2. Ambil detail via SP_5298_PJW_JADWAL-{MESIN} kode=3 (H) / 4 (P)
                $kode = ($jenisOd === 'H') ? 3 : 4;
                $spJadwal = "EXEC [dbo].[{$prefix}_JADWAL-{$suffix}] ?, ?, ?, ?";
                $detail = collect($db->select($spJadwal, [
                    $kode,
                    $noAntri,
                    $estDate,
                    $validated['noType']
                ]))->first();

                if (!$detail) continue;
                if (isset($detail->Cancel) && $detail->Cancel == 1) continue;

                $namaBrg = ($jenisOd === 'H') ? ($detail->Nama_Brg ?? '') : ($detail->Nama_Proyek ?? '');
                $kdBgr   = ($jenisOd === 'H') ? ($detail->Kd_Brg ?? '') : '';

                $jmlDikerjakan = '';
                if (isset($detail->HariKe) && $detail->HariKe > 0) {
                    $jmlDikerjakan = trim(($detail->JmlBrg ?? '0') . ' . ' . $detail->HariKe);
                } else {
                    $jmlDikerjakan = trim($detail->JmlBrg ?? '0');
                }

                // Tentukan status warna: emergency (Status=1) atau tolak-mng (Tgl_Tolak_Mng not null)
                $status = 'default';
                if (isset($detail->Status) && $detail->Status == 1) {
                    $status = 'emergency';
                } elseif (!empty($detail->Tgl_Tolak_Mng)) {
                    $status = 'tolak-mng';
                }

                $jadwal[] = [
                    'NoAntrian'     => $noAntri,
                    'NoOrder'       => $detail->NoOd ?? '',
                    'EstDate'       => !empty($row->EstDate) ? Carbon::parse($row->EstDate)->format('Y-m-d') : '',
                    'NamaBarang'    => $namaBrg,
                    'KdBarang'      => $kdBgr,
                    'EstTime'       => ($detail->EstTimeHour ?? 0) . ' jam ' . ($detail->EstTimeMinute ?? 0) . ' menit',
                    'NamaDivisi'    => $detail->NamaDivisi ?? '',
                    'JmlOrder'      => trim(($detail->Jml_Brg ?? '0') . ' ' . ($detail->Satuan ?? '')),
                    'IdBagian'      => (int)($detail->IdBagian ?? 0),
                    'NamaBagian'    => $detail->NamaBagian ?? '',
                    'JmlDikerjakan' => $jmlDikerjakan,
                    'JenisOrder'    => $jenisOd,
                    'Status'        => (int)($detail->Status ?? 0),
                    'Tgl_Tolak_Mng' => $detail->Tgl_Tolak_Mng ?? null,
                    'statusWarna'   => $status,
                ];
            }

            return response()->json($jadwal);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Proses delete jadwal (SP_5298_PJW_DELETE-JADWAL-{MESIN}-NEW)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'noMesin'    => ['required', 'integer'],
            'noType'     => ['required', 'integer'],
            'keterangan' => ['required', 'string', 'max:255'],
            'items'      => ['required', 'array', 'min:1'],
            'items.*.noAntrian' => ['required', 'string'],
            'items.*.noOrder'   => ['required', 'string'],
            'items.*.tgl'       => ['required', 'date_format:Y-m-d'],
            'items.*.idBagian'  => ['required', 'integer'],
        ]);

        $suffix = $this->getMesinSuffix($validated['noMesin']);
        if (!$suffix) {
            return response()->json(['error' => 'Mesin tidak dikenali.'], 400);
        }
        $prefix = $this->getMesinPrefix($validated['noMesin']);
        // $user = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');

        try {
            $db->beginTransaction();
            $count = 0;

            foreach ($validated['items'] as $item) {
                $sp = "EXEC [dbo].[{$prefix}_DELETE-JADWAL-{$suffix}-NEW] ?, ?, ?, ?, ?, ?, ?";
                $db->statement($sp, [
                    $item['noAntrian'],
                    $item['noOrder'],
                    $item['tgl'],
                    $item['idBagian'],
                    $validated['noType'],
                    $user,
                    'DiDelete. ' . $validated['keterangan'],
                ]);
                $count++;
            }

            $db->commit();
            return response()->json([
                'message' => 'Jadwal terHapus.',
                'count' => $count,
            ]);
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
