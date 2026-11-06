<?php

namespace App\Http\Controllers\GPS\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class KonstruksiEstimasiWaktuController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.JadwalKonstruksi.konstruksiEstimasiWaktu', compact('access'));
    }

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


    // Load jadwal konstruksi per WorkStation pada tanggal tertentu.
    // Menggunakan SP_5298_PJW_NOANTRI-KONSTRUKSI-NOFINISH (kode=1)
    // dan SP_5298_PJW_JADWAL-KONSTRUKSI (kode=1).

    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'worksts' => ['required', 'integer'],
            'date'    => ['required', 'date_format:Y-m-d'],
        ]);

        $worksts = $validated['worksts'];
        $date    = $validated['date'];
        $db = DB::connection('Connworkshop');

        try {
            $noAntriRows = $db->select('EXEC [dbo].[SP_5298_PJW_NOANTRI-KONSTRUKSI-NOFINISH] @worksts=?, @date1=?', [$worksts, $date]);
            $jadwal = [];

            foreach ($noAntriRows as $row) {
                if (isset($row->Cancel) && $row->Cancel == 1) continue;
                $noAntri = $row->NoAntrian ?? '';
                if (!$noAntri) continue;

                $detail = collect($db->select('EXEC [dbo].[SP_5298_PJW_JADWAL-KONSTRUKSI] @kode=?, @noAntri=?, @date=?, @worksts=?', [1, $noAntri, $date, $worksts]))->first();
                if (!$detail) continue;
                if (isset($detail->Cancel) && $detail->Cancel == 1) continue;

                $jadwal[] = [
                    'NoAntrian'    => $noAntri,
                    'NoOrder'      => $detail->NoOrder ?? '',
                    'EstDate'      => $detail->EstDate ?? '',
                    'NamaDivisi'   => $detail->NamaDivisi ?? '',
                    'Nama_Brg'     => $detail->Nama_Brg ?? '',
                    'NamaBagian'   => $detail->NamaBagian ?? '',
                    'EstTime'      => ($detail->EstTimeHour ?? 0) . ' jam ' . ($detail->EstTimeMinute ?? 0) . ' menit',
                    'EstTimeHour'  => (int)($detail->EstTimeHour ?? 0),
                    'EstTimeMinute' => (int)($detail->EstTimeMinute ?? 0),
                    'HariKe'       => (int)($detail->HariKe ?? 0),
                    'IdBagian'     => (int)($detail->IdBagian ?? 0),
                    'Status'       => (int)($detail->Status ?? 0),
                ];
            }

            return response()->json($jadwal);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Hitung total jam kerja dan sisa untuk tanggal & work station (SP_5298_PJW_HITUNG-JAM-KONSTRUKSI).

    public function hitungJam(Request $request)
    {
        $validated = $request->validate([
            'worksts' => ['required', 'integer'],
            'date'    => ['required', 'date_format:Y-m-d'],
            'noQue'   => ['required', 'string'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $row = collect($db->select('EXEC [dbo].[SP_5298_PJW_HITUNG-JAM-KONSTRUKSI] @EstDate=?, @worksts=?, @noQue=?', [
                $validated['date'],
                $validated['worksts'],
                $validated['noQue']
            ]))->first();

            if (!$row) {
                return response()->json(['error' => 'Data tidak ditemukan.'], 404);
            }

            return response()->json([
                'TotalMenitKrj'      => (int)($row->TotalMenitKrj ?? 0),
                'TotalMenitPk'       => (int)($row->TotalMenitPk ?? 0),
                'SisaMenitKrj_bantu' => (int)($row->SisaMenitKrj_bantu ?? 0),
                'SisaJamKrj'         => (int)($row->SisaJamKrj ?? 0),
                'SisaMenitKrj'       => (int)($row->SisaMenitKrj ?? 0),
                'ada'                => (int)($row->ada ?? 0),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Proses edit estimasi waktu.
    // Mode:
    //  - action = 'update'   → langsung update estimasi waktu
    //  - action = 'shift'    → geser jadwal ke hari berikutnya (simplified)

    public function store(Request $request)
    {
        $validated = $request->validate([
            'action'    => ['required', 'string', 'in:update,shift'],
            'worksts'   => ['required', 'integer'],
            'date'      => ['required', 'date_format:Y-m-d'],
            'noAntrian' => ['required', 'string'],
            'idBagian'  => ['required', 'integer'],
            'estHour'   => ['required', 'integer', 'min:0', 'max:23'],
            'estMinute' => ['required', 'integer', 'min:0', 'max:59'],
            // Untuk shift
            'shiftItems' => ['nullable', 'array'], // [{noAntrian, idBagian, estHour, estMinute}, ...]
            'nextDate'   => ['nullable', 'date_format:Y-m-d'],
            'jamKerjaOptimal' => ['nullable', 'integer', 'min:1'],
        ]);

        $action = $validated['action'];
        $db = DB::connection('Connworkshop');
        // $user = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;

        try {

            if ($action === 'update') {
                // Mode langsung update
                if (($validated['estHour'] * 60 + $validated['estMinute']) <= 0) {
                    $db->rollBack();
                    return response()->json(['error' => 'Estimasi waktu harus lebih besar dari NOL.'], 400);
                }

                // Cek kapasitas
                $hitung = collect($db->select('EXEC [dbo].[SP_5298_PJW_HITUNG-JAM-KONSTRUKSI] @EstDate=?, @worksts=?, @noQue=?', [
                    $validated['date'],
                    $validated['worksts'],
                    $validated['noAntrian']
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
                    ], 400);
                }

                // Update
                $db->statement('EXEC [dbo].[SP_5298_PJW_EDIT-ESTTIME-KONSTRUKSI] @noAntri=?, @worksts=?, @IdBag=?, @estDate=?, @estHour=?, @estMinute=?', [
                    $validated['noAntrian'],
                    $validated['worksts'],
                    $validated['idBagian'],
                    $validated['date'],
                    $validated['estHour'],
                    $validated['estMinute'],
                ]);

                $db->commit();
                return response()->json(['message' => 'Proses Selesai.']);
            } else {
                // Mode shift (geser jadwal)
                if (empty($validated['shiftItems']) || empty($validated['nextDate'])) {
                    $db->rollBack();
                    return response()->json(['error' => 'Data shift tidak lengkap.'], 400);
                }

                // Cek apakah nextDate sudah ada jadwal
                $cekEst = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-ESTDATE-KONSTRUKSI] @date=?, @worksts=?', [
                    $validated['nextDate'],
                    $validated['worksts']
                ]))->first();
                $adaJadwal = (int)($cekEst->Ada ?? 0);

                if ($adaJadwal == 0) {
                    // Hari berikutnya kosong → butuh jam kerja optimal
                    if (empty($validated['jamKerjaOptimal'])) {
                        $db->rollBack();
                        return response()->json([
                            'error' => 'Belum ada jadwal untuk tanggal berikutnya. Silakan tentukan jam kerja optimal.',
                            'needJamKerja' => true,
                        ], 400);
                    }

                    // Cek total shift minutes
                    $totalShift = 0;
                    foreach ($validated['shiftItems'] as $s) {
                        $totalShift += (($s['estHour'] ?? 0) * 60) + ($s['estMinute'] ?? 0);
                    }

                    if ($totalShift > ($validated['jamKerjaOptimal'] * 60)) {
                        $db->rollBack();
                        return response()->json(['error' => 'Jam kerja optimal tidak boleh lebih kecil dari estimasi waktu shift.'], 400);
                    }

                    // Geser per item via SP_5298_PJW_GESER-KONSTRUKSI
                    foreach ($validated['shiftItems'] as $s) {
                        $db->statement('EXEC [dbo].[SP_5298_PJW_GESER-KONSTRUKSI] @estHour=?, @estMinute=?, @noAntri=?, @idBag=?, @worksts=?, @newEstDate=?, @estDate=?, @jamKrj=?, @user=?', [
                            $s['estHour'] ?? 0,
                            $s['estMinute'] ?? 0,
                            $s['noAntrian'],
                            $s['idBagian'],
                            $validated['worksts'],
                            $validated['nextDate'],  // setara newEstDate
                            $validated['date'],      // setara estDate lama
                            $validated['jamKerjaOptimal'],
                            $user
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
                    ], 400);
                }
            }
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
