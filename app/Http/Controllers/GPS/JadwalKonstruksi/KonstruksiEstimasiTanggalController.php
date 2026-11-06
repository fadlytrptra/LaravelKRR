<?php

namespace App\Http\Controllers\GPS\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
class KonstruksiEstimasiTanggalController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.JadwalKonstruksi.konstruksiEstimasiTanggal', compact('access'));
    }

    // Lookup work station (SP_5298_PJW_LIST-WORKSTATION)

    public function getWorkstationList()
    {
        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-WORKSTATION]');
            return response()->json(array_map(function ($item) {
                return [
                    'NoWrkSts' => $item->NoWrkSts ?? '',
                    'NamaWorkStation' => $item->NamaWorkStation ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Ambil daftar jadwal konstruksi untuk work station dan tanggal tertentu.
    // Memanggil SP_5298_PJW_NOANTRI-KONSTRUKSI-NOFINISH dan SP_5298_PJW_JADWAL-KONSTRUKSI.

    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'worksts' => ['required', 'integer'],
            'date' => ['required', 'date_format:Y-m-d'],
        ]);

        $worksts = $validated['worksts'];
        $date = $validated['date'];
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

    // Proses edit estimasi tanggal.
    // Memanggil SP_5298_PJW_EDIT-ESTDATE-KONSTRUKSI-NEW.
    // Jika sisa jam tidak cukup, kembalikan error dengan saran edit jam kerja optimal.

    public function store(Request $request)
    {
        $validated = $request->validate([
            'worksts' => ['required', 'integer'],
            'tanggal_lama' => ['required', 'date_format:Y-m-d'],
            'tanggal_baru' => ['required', 'date_format:Y-m-d'],
            'items' => ['required', 'array'],
            'items.*.noAntrian' => ['required', 'string'],
            'items.*.idBagian' => ['required', 'integer'],
            'items.*.estHour' => ['required', 'integer', 'min:0'],
            'items.*.estMinute' => ['required', 'integer', 'min:0', 'max:59'],
            'orderNos' => ['required', 'array', 'min:1'],
            'orderNos.*' => ['required', 'string'],
            'alasan' => ['nullable', 'string', 'max:255'],
            'jam_kerja_optimal' => ['nullable', 'integer', 'min:1'],
            'action' => ['nullable', 'string', 'in:edit,shift'],
            'shift_jam_kerja' => ['nullable', 'array'],
            'shift_jam_kerja.*' => ['required', 'integer', 'min:1'],
        ]);

        $worksts = $validated['worksts'];
        $tanggalLama = $validated['tanggal_lama'];
        $tanggalBaru = $validated['tanggal_baru'];
        $items = $validated['items'];
        $orderNos = $validated['orderNos'];
        $alasan = $validated['alasan'] ?? '';
        $jamKerjaOptimal = $validated['jam_kerja_optimal'] ?? null;
        $action = $validated['action'] ?? 'edit';
        $shiftJamKerja = $validated['shift_jam_kerja'] ?? [];

        $db = DB::connection('Connworkshop');

        try {
            $db->beginTransaction();

            // 1. Validasi tanggal baru terhadap estimasi PPIC untuk setiap order
            foreach ($orderNos as $noOrder) {
                $orderInfo = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] @noOd=?', [$noOrder]))->first();
                if (!$orderInfo || !isset($orderInfo->ada)) {
                    $db->rollBack();
                    return response()->json(['error' => "Data estimasi tidak ditemukan untuk order {$noOrder}"], 400);
                }

                if ($orderInfo->ada == 0) {
                    $db->rollBack();
                    return response()->json(['error' => "Order $noOrder belum ada estimasi jadwal. Hubungi PPIC."], 400);
                }

                $tglS = Carbon::parse($orderInfo->TglS);
                $tglF = Carbon::parse($orderInfo->TglF);
                $newDate = Carbon::parse($tanggalBaru);

                if ($newDate < $tglS || $newDate > $tglF) {
                    $msg = $newDate < $tglS
                        ? "Tidak boleh. Karena tgl yg diinput < estimasi tgl start ({$tglS->format('Y-m-d')}) yg dijadwalkan oleh PPIC untuk order $noOrder."
                        : "Tidak boleh. Karena tgl yg diinput > estimasi tgl finish ({$tglF->format('Y-m-d')}) yg dijadwalkan oleh PPIC untuk order $noOrder.";
                    $db->rollBack();
                    return response()->json(['error' => $msg], 400);
                }
            }

            // 2. Hitung total menit yang akan dipindah
            $totalMenit = 0;
            foreach ($items as $item) {
                $totalMenit += ($item['estHour'] * 60) + $item['estMinute'];
            }

            // 3. Cek ketersediaan Jadwal & Jam Kerja Optimal
            $cekEstDate = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-ESTDATE-KONSTRUKSI] @estDate=?, @worksts=?', [$tanggalBaru, $worksts]))->first();
            $ada = $cekEstDate->Ada ?? ($cekEstDate->ada ?? 0);
            $jamKerjaFinal = 0;

            if ($ada == 0) {
                // Flow VB: Jika belum ada jadwal sama sekali -> minta jam kerja optimal
                if ($jamKerjaOptimal === null) {
                    $db->rollBack();
                    return response()->json(['error' => 'Belum ada jadwal (Tentukan jam kerja optimal u/ tgl ini)', 'needJamKerja' => true], 400);
                }

                if ($totalMenit > ($jamKerjaOptimal * 60)) {
                    $db->rollBack();
                    return response()->json(['error' => 'Jam kerja optimal tdk boleh lebih kecil dari estimasi waktu.', 'needJamKerja' => true], 400);
                }
                $jamKerjaFinal = $jamKerjaOptimal;
            } else {
                // Flow VB: Jika sudah ada jadwal -> Hitung sisa jam
                $sisa = collect($db->select('EXEC [dbo].[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI] @estDate=?, @worksts=?', [$tanggalBaru, $worksts]))->first();
                $totalMenitKrj = (int)($sisa->TotalMenitKrj ?? 0);
                $totalMenitPk = (int)($sisa->TotalMenitPk ?? 0);

                if (($totalMenit + $totalMenitPk) <= $totalMenitKrj) {
                    $jamKerjaFinal = $sisa->JamKrj ?? 0; // Cukup, pakai yang di database
                } elseif ($action === 'shift') {
                    $shiftResult = $this->shiftScheduleChain(
                        $db,
                        $tanggalBaru,
                        $worksts,
                        $totalMenit,
                        $shiftJamKerja,
                        // auth()->user()->username ?? 'SYSTEM'
                        Auth::check() ? Auth::user()->NomorUser : null
                    );

                    if (isset($shiftResult['needShiftJamKerja'])) {
                        $db->rollBack();
                        return response()->json($shiftResult, 400);
                    }

                    if (isset($shiftResult['error'])) {
                        $db->rollBack();
                        return response()->json($shiftResult, 400);
                    }

                    $updatedSisa = collect($db->select('EXEC [dbo].[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI] @estDate=?, @worksts=?', [$tanggalBaru, $worksts]))->first();
                    $jamKerjaFinal = $updatedSisa->JamKrj ?? intdiv((int)($updatedSisa->TotalMenitKrj ?? 0), 60);
                } else {
                    $db->rollBack();
                    return response()->json([
                        'error' => "Jam kerja tdk mencukupi. Edit jam kerja optimal u/ tgl: $tanggalBaru",
                        'needAction' => true,
                    ], 400);
                }
            }

            // 4. Proses update untuk setiap item
            // $user = auth()->user()->username ?? 'SYSTEM';
            $user = Auth::check() ? Auth::user()->NomorUser : null;
            $keterangan = "Edit estimasi tgl, " . ($alasan ?: '') . ". Ke tgl: " . $tanggalBaru;

            foreach ($items as $item) {
                $db->statement('EXEC [dbo].[SP_5298_PJW_EDIT-ESTDATE-KONSTRUKSI-NEW] @estDate=?, @noAntri=?, @idBag=?, @estHour=?, @estMinute=?, @worksts=?, @oldDATE=?, @jamKrj=?, @user=?, @keterangan=?', [
                    $tanggalBaru,
                    $item['noAntrian'],
                    $item['idBagian'],
                    $item['estHour'],
                    $item['estMinute'],
                    $worksts,
                    $tanggalLama,
                    $jamKerjaFinal,
                    $user,
                    $keterangan
                ]);
            }

            $db->commit();
            return response()->json(['message' => 'TerSimpan.']);
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    private function shiftScheduleChain($db, string $startDate, int $worksts, int $additionalMinutes, array $jamKerjaByDate, string $user): array
    {
        $currentDate = Carbon::parse($startDate)->startOfDay();
        $isFirstDate = true;
        $movedFromCurrentDate = false;

        for ($day = 0; $day < 500; $day++) {
            $date = $currentDate->format('Y-m-d');
            $stats = $this->getScheduleCapacity($db, $date, $worksts);
            $capacity = (int)($stats->TotalMenitKrj ?? 0);
            $used = (int)($stats->TotalMenitPk ?? 0);
            $required = $used + ($isFirstDate ? $additionalMinutes : 0);

            if ($required <= $capacity) {
                if (!$movedFromCurrentDate) {
                    return ['success' => true];
                }

                $currentDate->addDay();
                $isFirstDate = false;
                $movedFromCurrentDate = false;
                continue;
            }

            if ($capacity <= 0) {
                return ['error' => "Jam kerja optimal tidak tersedia untuk tanggal {$date}."];
            }

            $overage = $required - $capacity;
            $sourceRows = $this->getScheduleRows($db, $date, $worksts);
            if (count($sourceRows) === 0) {
                return ['error' => "Tidak ada jadwal yang dapat digeser pada tanggal {$date}."];
            }

            $rowsToMove = [];
            $totalRowsToMove = 0;
            for ($index = count($sourceRows) - 1; $index >= 0 && $totalRowsToMove < $overage; $index--) {
                $row = $sourceRows[$index];
                $minutes = ((int)($row->EstTimeHour ?? 0) * 60) + (int)($row->EstTimeMinute ?? 0);
                if ($minutes <= 0) {
                    continue;
                }
                $row->ShiftMinutes = $minutes;
                $rowsToMove[] = $row;
                $totalRowsToMove += $minutes;
            }

            if ($totalRowsToMove < $overage) {
                return ['error' => "Jadwal pada tanggal {$date} tidak cukup untuk digeser."];
            }

            $rowsToMove = array_reverse($rowsToMove);
            $nextDate = $currentDate->copy()->addDay()->format('Y-m-d');
            foreach ($rowsToMove as $row) {
                $estimate = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] @noOd=?', [$row->NoOrder ?? '']))->first();
                if (!$estimate || (int)($estimate->ada ?? 0) === 0) {
                    return ['error' => "Order {$row->NoOrder} belum ada estimasi jadwal. Hubungi PPIC."];
                }

                if (empty($estimate->TglS) || empty($estimate->TglF)) {
                    return ['error' => "Rentang estimasi PPIC tidak lengkap untuk order {$row->NoOrder}."];
                }

                $startDate = Carbon::parse($estimate->TglS)->startOfDay();
                $finishDate = Carbon::parse($estimate->TglF)->startOfDay();
                $nextDateValue = Carbon::parse($nextDate)->startOfDay();
                if ($nextDateValue->lt($startDate) || $nextDateValue->gt($finishDate)) {
                    return [
                        'error' => "Untuk nomer order: {$row->NoOrder}, tidak dapat digeser ke tanggal {$nextDate} karena di luar estimasi PPIC ({$startDate->format('Y-m-d')} s/d {$finishDate->format('Y-m-d')}).",
                    ];
                }
            }

            $moveResult = $this->moveSchedulesToNextDate(
                $db,
                $rowsToMove,
                $date,
                $nextDate,
                $worksts,
                $overage,
                $totalRowsToMove,
                $jamKerjaByDate,
                $user
            );

            if (isset($moveResult['needShiftJamKerja']) || isset($moveResult['error'])) {
                return $moveResult;
            }

            $movedFromCurrentDate = true;
        }

        return ['error' => 'Penggeseran jadwal melebihi batas 500 hari. Periksa jam kerja dan estimasi jadwal.'];
    }

    private function moveSchedulesToNextDate($db, array $rowsToMove, string $sourceDate, string $nextDate, int $worksts, int $overage, int $totalRowsToMove, array $jamKerjaByDate, string $user): array
    {
        $isDestinationScheduled = $this->hasScheduleOnDate($db, $nextDate, $worksts);
        $remainingMinutes = $totalRowsToMove - $overage;
        $boundaryRow = $rowsToMove[0];
        $boundaryMinutes = (int)$boundaryRow->ShiftMinutes;
        $minutesMovedFromBoundary = $boundaryMinutes - $remainingMinutes;

        if ($minutesMovedFromBoundary < 0) {
            return ['error' => "Pembagian estimasi jadwal pada tanggal {$sourceDate} tidak valid."];
        }

        if (!$isDestinationScheduled) {
            $jamKerja = (int)($jamKerjaByDate[$nextDate] ?? 0);
            if ($jamKerja < 1 || ($jamKerja * 60) < $overage) {
                return [
                    'error' => "Tentukan jam kerja optimal u/ tgl: {$nextDate}. Jam kerja minimal " . max(1, (int)ceil($overage / 60)) . ' jam.',
                    'needShiftJamKerja' => true,
                    'date' => $nextDate,
                    'requiredMinutes' => $overage,
                ];
            }

            foreach ($rowsToMove as $index => $row) {
                $minutes = $index === 0 ? $minutesMovedFromBoundary : 0;
                $this->executeProcedure($db, 'SP_5298_PJW_GESER-KONSTRUKSI', [
                    'estHour' => intdiv($minutes, 60),
                    'estMinute' => $minutes % 60,
                    'noAntri' => $row->NoAntrian,
                    'idBag' => $row->IdBagian,
                    'worksts' => $worksts,
                    'newEstDate' => $nextDate,
                    'estDate' => $sourceDate,
                    'jamKrj' => $jamKerja,
                    'user' => $user,
                ]);
            }

            return ['success' => true];
        }

        $destinationRows = $this->getScheduleRows($db, $nextDate, $worksts);
        $finishedRows = [];
        $finishedCheck = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-JADWAL-KONSTRUKSI-FINISH] @EstDate=?, @worksts=?', [
            $nextDate,
            $worksts,
        ]))->first();
        if ((int)($finishedCheck->ada ?? 0) > 0) {
            $finishedRows = $this->getScheduleRows($db, $nextDate, $worksts, 1);
        }

        $usedNumbers = [];
        foreach (array_merge($destinationRows, $finishedRows) as $row) {
            $usedNumbers[(string)$row->NoAntrian] = true;
        }

        $destinationRenumbering = [];
        foreach ($destinationRows as $row) {
            $oldNumber = (string)$row->NoAntrian;
            if (!ctype_digit($oldNumber)) {
                return ['error' => "Nomor antrian {$oldNumber} pada tanggal {$nextDate} tidak dapat disusun ulang."];
            }

            $candidate = ((int)$oldNumber) + count($rowsToMove);
            do {
                $newNumber = substr(str_pad((string)$candidate, 7, '0', STR_PAD_LEFT), -7);
                $candidate++;
            } while (isset($usedNumbers[$newNumber]));

            $usedNumbers[$newNumber] = true;
            $destinationRenumbering[] = [
                'old' => $oldNumber,
                'new' => $newNumber,
            ];
        }

        for ($index = count($destinationRenumbering) - 1; $index >= 0; $index--) {
            $this->executeProcedure($db, 'SP_5298_PJW_GENERATE-KONSTRUKSI', [
                'nomer' => $destinationRenumbering[$index]['old'],
                'noAntri' => $destinationRenumbering[$index]['new'],
                'worksts' => $worksts,
                'tgl' => $nextDate,
            ]);
        }

        if (count($destinationRenumbering) > 0) {
            $lastNumber = $destinationRenumbering[count($destinationRenumbering) - 1]['new'];
            $this->executeProcedure($db, 'SP_5298_PJW_UPDATE-COUNTER-KONSTRUKSI', [
                'IdWorkSts' => $lastNumber,
                'tgl' => $nextDate,
                'worksts' => $worksts,
            ]);
        }

        $newNumbers = array_map(function ($row) {
            return (string)$row->NoAntrian;
        }, $destinationRows);
        while (count($newNumbers) < count($rowsToMove)) {
            $candidate = (int)max(array_merge([0], array_map('intval', array_keys($usedNumbers)))) + 1;
            do {
                $newNumber = substr(str_pad((string)$candidate, 7, '0', STR_PAD_LEFT), -7);
                $candidate++;
            } while (isset($usedNumbers[$newNumber]));
            $usedNumbers[$newNumber] = true;
            $newNumbers[] = $newNumber;
        }

        foreach ($rowsToMove as $index => $row) {
            $minutes = $index === 0 ? $minutesMovedFromBoundary : 0;
            $this->executeProcedure($db, 'SP_5298_PJW_MOVE-KONSTRUKSI', [
                'estHour' => intdiv($minutes, 60),
                'estMinute' => $minutes % 60,
                'noAntri' => $row->NoAntrian,
                'idBag' => $row->IdBagian,
                'newNomer' => $newNumbers[$index],
                'worksts' => $worksts,
                'newEstDate' => $nextDate,
                'estDate' => $sourceDate,
                'user' => $user,
            ]);
        }

        if ($remainingMinutes === 0) {
            $this->executeProcedure($db, 'SP_5298_PJW_DELETE-JADWAL-KONSTRUKSI', [
                'noAntri' => $boundaryRow->NoAntrian,
                'tgl' => $sourceDate,
                'idBag' => $boundaryRow->IdBagian,
                'worksts' => $worksts,
                'user' => $user,
                'keterangan' => "DiDelete, digeser ke tgl: {$nextDate}",
            ]);
        } else {
            $this->executeProcedure($db, 'SP_5298_PJW_EDIT-ESTTIME-KONSTRUKSI', [
                'noAntri' => $boundaryRow->NoAntrian,
                'worksts' => $worksts,
                'IdBag' => $boundaryRow->IdBagian,
                'estDate' => $sourceDate,
                'estHour' => intdiv($remainingMinutes, 60),
                'estMinute' => $remainingMinutes % 60,
            ]);
        }

        return ['success' => true];
    }

    private function getScheduleCapacity($db, string $date, int $worksts)
    {
        return collect($db->select('EXEC [dbo].[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI] @EstDate=?, @worksts=?', [
            $date,
            $worksts,
        ]))->first();
    }

    private function getScheduleRows($db, string $date, int $worksts, ?int $kode = null): array
    {
        $sql = 'EXEC [dbo].[SP_5298_PJW_GET-EST-TIME-KONSTRUKSI] @EstDate=?, @worksts=?';
        $parameters = [$date, $worksts];
        if ($kode !== null) {
            $sql .= ', @kode=?';
            $parameters[] = $kode;
        }

        return $db->select($sql, $parameters);
    }

    private function hasScheduleOnDate($db, string $date, int $worksts): bool
    {
        $result = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-ESTDATE-KONSTRUKSI] @estDate=?, @worksts=?', [
            $date,
            $worksts,
        ]))->first();

        return (int)($result->Ada ?? $result->ada ?? 0) > 0;
    }

    private function executeProcedure($db, string $procedure, array $parameters): void
    {
        $arguments = [];
        foreach ($parameters as $name => $value) {
            $arguments[] = '@' . $name . '=?';
        }

        $db->statement('EXEC [dbo].[' . $procedure . '] ' . implode(', ', $arguments), array_values($parameters));
    }
}
