<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class PengerjaanEstimasiWaktuController extends Controller
{

    // Mapping mesin ID → suffix SP
    private function getMesinSuffix($noMesin)
    {
        $map = [
            1  => 'TURNING',
            2  => 'DRILL',
            4  => 'GRINDING',
            6  => 'LAS',
            8  => 'PUNCH',
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
        return view('GPS.JadwalPengerjaan.PengerjaanEstimasiWaktu', compact('access'));
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


    // Load jadwal pengerjaan per mesin & type pada tanggal tertentu.
    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'noMesin' => ['required', 'integer'],
            'noType'  => ['required', 'integer'],
            'date'    => ['required', 'date_format:Y-m-d'],
        ]);

        $suffix = $this->getMesinSuffix($validated['noMesin']);
        if (!$suffix) {
            return response()->json(['error' => 'Mesin tidak dikenali.'], 400);
        }
        $prefix = $this->getMesinPrefix($validated['noMesin']);

        $db = DB::connection('Connworkshop');

        try {
            // 1. Ambil daftar no antrian yang belum finish
            $spNoAntri = "EXEC [dbo].[{$prefix}_NOANTRI-{$suffix}-NOFINISH] @type=?, @date1=?";
            $noAntriRows = $db->select($spNoAntri, [$validated['noType'], $validated['date']]);

            $jadwal = [];
            foreach ($noAntriRows as $row) {
                if (isset($row->Cancel) && $row->Cancel == 1) continue;
                $noAntri = $row->NoAntrian ?? '';
                $jenisOd = $row->JenisOrder ?? 'H';
                if (!$noAntri) continue;

                // 2. Ambil detail jadwal per no antrian
                $spJadwal = "EXEC [dbo].[{$prefix}_JADWAL-{$suffix}] ?, ?, ?, ?";
                $kode = ($jenisOd === 'H') ? 1 : 2;

                $detail = collect($db->select($spJadwal, [
                    $kode, $noAntri, $validated['date'], $validated['noType']
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

                $jadwal[] = [
                    'NoAntrian'     => $noAntri,
                    'NoOrder'       => $detail->NoOd ?? '',
                    'TglStart'      => $detail->EstDate ?? '',
                    'NamaBarang'    => $namaBrg,
                    'KdBarang'      => $kdBgr,
                    'EstTime'       => ($detail->EstTimeHour ?? 0) . ' jam ' . ($detail->EstTimeMinute ?? 0) . ' menit',
                    'EstTimeHour'   => (int)($detail->EstTimeHour ?? 0),
                    'EstTimeMinute' => (int)($detail->EstTimeMinute ?? 0),
                    'NamaDivisi'    => $detail->NamaDivisi ?? '',
                    'JmlOrder'      => trim(($detail->Jml_Brg ?? '0') . ' ' . ($detail->Satuan ?? '')),
                    'NamaBagian'    => $detail->NamaBagian ?? '',
                    'IdBagian'      => (int)($detail->IdBagian ?? 0),
                    'JmlDikerjakan' => $jmlDikerjakan,
                    'JenisOrder'    => $jenisOd,
                    'Status'        => (int)($detail->Status ?? 0),
                    'Cancel'        => (int)($detail->Cancel ?? 0),
                ];
            }

            return response()->json($jadwal);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Hitung kapasitas jam kerja untuk tanggal & type (SP_5298_PJW_HITUNG-JAM-{MESIN}).
    public function hitungJam(Request $request)
    {
        $validated = $request->validate([
            'noMesin' => ['required', 'integer'],
            'noType'  => ['required', 'integer'],
            'date'    => ['required', 'date_format:Y-m-d'],
            'noQue'   => ['required', 'string'],
        ]);

        $suffix = $this->getMesinSuffix($validated['noMesin']);
        if (!$suffix) {
            return response()->json(['error' => 'Mesin tidak dikenali.'], 400);
        }
        $prefix = $this->getMesinPrefix($validated['noMesin']);

        $db = DB::connection('Connworkshop');
        try {
            $sp = "EXEC [dbo].[{$prefix}_HITUNG-JAM-{$suffix}] ?, ?, ?";
            $row = collect($db->select($sp, [
                $validated['date'], $validated['noType'], $validated['noQue']
            ]))->first();

            if ($row) {
                return response()->json([
                    'TotalMenitKrj'      => (int)($row->TotalMenitKrj ?? 0),
                    'TotalMenitPk'       => (int)($row->TotalMenitPk ?? 0),
                    'SisaMenitKrj_bantu' => (int)($row->SisaMenitKrj_bantu ?? 0),
                    'SisaJamKrj'         => (int)($row->SisaJamKrj ?? 0),
                    'SisaMenitKrj'       => (int)($row->SisaMenitKrj ?? 0),
                    'ada'                => (int)($row->ada ?? 0),
                ]);
            }
            return response()->json([
                'TotalMenitKrj' => 0,
                'TotalMenitPk'  => 0,
                'ada'           => 0,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Proses edit estimasi waktu.
    // action=update → update via SP_5298_PJW_EDIT-ESTTIME-{MESIN}
    // action=shift  → geser jadwal ke hari berikutnya via SP_5298_PJW_GESER-{MESIN}
    public function store(Request $request)
    {
        $validated = $request->validate([
            'action'      => ['required', 'string', 'in:update,shift'],
            'noMesin'     => ['required', 'integer'],
            'noType'      => ['required', 'integer'],
            'date'        => ['required', 'date_format:Y-m-d'],
            'noAntrian'   => ['required', 'string'],
            'noOrder'     => ['required', 'string'],
            'idBagian'    => ['required', 'integer'],
            'estHour'     => ['required', 'integer', 'min:0', 'max:23'],
            'estMinute'   => ['required', 'integer', 'min:0', 'max:59'],
            'jenisOrder'  => ['nullable', 'string', 'in:H,P'],
            // Untuk shift
            'nextDate'         => ['nullable', 'date_format:Y-m-d'],
            'shiftItems'       => ['nullable', 'array'],
            'jamKerjaOptimal'  => ['nullable', 'integer', 'min:1'],
        ]);

        $action = $validated['action'];
        $suffix = $this->getMesinSuffix($validated['noMesin']);
        if (!$suffix) {
            return response()->json(['error' => 'Mesin tidak dikenali.'], 400);
        }
        $prefix = $this->getMesinPrefix($validated['noMesin']);
        $db = DB::connection('Connworkshop');
        // $user = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;

        try {
            $db->beginTransaction();

            if ($action === 'update') {
                if (($validated['estHour'] * 60 + $validated['estMinute']) <= 0) {
                    $db->rollBack();
                    return response()->json(['error' => 'Estimasi waktu harus lebih besar dari NOL.'], 400);
                }

                // Cek kapasitas via SP_5298_PJW_HITUNG-JAM-{MESIN}
                $spHitung = "EXEC [dbo].[{$prefix}_HITUNG-JAM-{$suffix}] ?, ?, ?";
                $hitung = collect($db->select($spHitung, [
                    $validated['date'], $validated['noType'], $validated['noAntrian']
                ]))->first();

                $TotalMenitKrj = (int)($hitung->TotalMenitKrj ?? 0);
                $TotalMenitPk  = (int)($hitung->TotalMenitPk ?? 0);
                $ada           = (int)($hitung->ada ?? 0);

                $menitTbh = $validated['estHour'] * 60 + $validated['estMinute'];
                $totalMenitInput = ($ada > 0) ? ($menitTbh + $TotalMenitPk) : $menitTbh;

                if ($totalMenitInput > $TotalMenitKrj) {
                    $db->rollBack();
                    $sisa = $totalMenitInput - $TotalMenitKrj;
                    return response()->json([
                        'error' => 'Jam kerja optimal tidak cukup. Kelebihan ' . intdiv($sisa, 60) . ' jam ' . ($sisa % 60) . ' menit.',
                        'needAction' => true,
                        'totalMenitInput' => $totalMenitInput,
                        'TotalMenitKrj' => $TotalMenitKrj,
                        'TotalMenitPk' => $TotalMenitPk,
                        'ada' => $ada,
                        'sisaNoInput' => $sisa,
                    ], 400);
                }

                // Update via SP_5298_PJW_EDIT-ESTTIME-{MESIN}
                $spEdit = "EXEC [dbo].[{$prefix}_EDIT-ESTTIME-{$suffix}] @noAntri=?, @noOd=?, @noType=?, @IdBag=?, @estDate=?, @estHour=?, @estMinute=?";
                $db->statement($spEdit, [
                    $validated['noAntrian'],
                    $validated['noOrder'],
                    $validated['noType'],
                    $validated['idBagian'],
                    $validated['date'],
                    $validated['estHour'],
                    $validated['estMinute'],
                ]);

                $db->commit();
                return response()->json(['message' => 'Proses selesai.']);

            } else {
                // ==== SHIFT ====
                if (empty($validated['shiftItems']) || empty($validated['nextDate'])) {
                    $db->rollBack();
                    return response()->json(['error' => 'Data shift tidak lengkap.'], 400);
                }

                // Cek apakah nextDate sudah ada jadwal
                $spCekEstDate = "EXEC [dbo].[{$prefix}_CEK-ESTDATE-{$suffix}] ?, ?";
                $cek = collect($db->select($spCekEstDate, [
                    $validated['nextDate'], $validated['noType']
                ]))->first();
                $adaJadwal = (int)($cek->Ada ?? 0);

                if ($adaJadwal == 0) {
                    // Hari berikutnya kosong → butuh jam kerja optimal
                    if (empty($validated['jamKerjaOptimal'])) {
                        $db->rollBack();
                        return response()->json([
                            'error' => 'Belum ada jadwal untuk tanggal berikutnya. Silakan tentukan jam kerja optimal.',
                            'needJamKerja' => true,
                        ], 400);
                    }

                    // Validasi: total shift tidak boleh melebihi jam kerja optimal
                    $totalShift = 0;
                    foreach ($validated['shiftItems'] as $s) {
                        $totalShift += (($s['estHour'] ?? 0) * 60) + ($s['estMinute'] ?? 0);
                    }
                    if ($totalShift > ($validated['jamKerjaOptimal'] * 60)) {
                        $db->rollBack();
                        return response()->json(['error' => 'Jam kerja optimal tidak boleh lebih kecil dari total estimasi waktu shift.'], 400);
                    }

                    // Geser per item via SP_5298_PJW_GESER-{MESIN}
                    $spGeser = "EXEC [dbo].[{$prefix}_GESER-{$suffix}] ?, ?, ?, ?, ?, ?, ?, ?, ?, ?";
                    foreach ($validated['shiftItems'] as $s) {
                        $db->statement($spGeser, [
                            $s['estHour'] ?? 0,
                            $s['estMinute'] ?? 0,
                            $s['noAntrian'],
                            $s['noOrder'] ?? '',
                            $s['idBagian'],
                            $validated['noType'],
                            $validated['nextDate'],  // newEstDate
                            $validated['date'],      // estDate lama
                            $validated['jamKerjaOptimal'],
                            $user,
                        ]);
                    }

                    $db->commit();
                    return response()->json(['message' => 'Jadwal berhasil digeser ke tanggal ' . $validated['nextDate'] . '.']);
                } else {
                    // Hari berikutnya sudah ada jadwal → kompleks, arahkan ke edit jam kerja optimal
                    $db->rollBack();
                    return response()->json([
                        'error' => 'Tanggal berikutnya sudah memiliki jadwal. Silakan edit jam kerja optimal terlebih dahulu.',
                        'needEditJam' => true,
                        'nextDate' => $validated['nextDate'],
                    ], 400);
                }
            }

        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
