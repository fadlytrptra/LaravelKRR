<?php

namespace App\Http\Controllers\GPS\InformasiKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InfoKonstruksiBulananController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');

        // Default date: awal bulan s/d akhir bulan
        $now = Carbon::now();
        $startDate = $now->copy()->startOfMonth()->format('Y-m-d');
        $endDate   = $now->copy()->endOfMonth()->format('Y-m-d');

        return view(
            'GPS.InformasiKonstruksi.InfoKonstruksiBulanan',
            compact('access', 'startDate', 'endDate')
        );
    }

    // SP_5298_PJW_INF-JDW-KONSTRUKSI → SP_5298_PJW_INF-KONSTRUKSI-PER-ORDER-3 (kode=2)
    public function getData(Request $request)
    {
        $validated = $request->validate([
            'date1' => ['required', 'date_format:Y-m-d'],
            'date2' => ['required', 'date_format:Y-m-d', 'after_or_equal:date1'],
        ]);

        $db = DB::connection('Connworkshop');

        try {
            // 1. Ambil daftar unique IdBagian + NoOrder dari SP_5298_PJW_INF-JDW-KONSTRUKSI
            $rawRows = $db->select('EXEC [dbo].[SP_5298_PJW_INF-JDW-KONSTRUKSI] @date1=?, @date2=?', [
                $validated['date1'],
                $validated['date2']
            ]);

            // Filter unique berdasarkan IdBagian + NoOrder
            $uniqueRows = [];
            $seenKeys = [];
            foreach ($rawRows as $row) {
                $idBagian = $row->IdBagian ?? null;
                if ($idBagian === null) continue;
                $key = $idBagian . '|' . ($row->NoOrder ?? '');
                if (!isset($seenKeys[$key])) {
                    $seenKeys[$key] = true;
                    $uniqueRows[] = $row;
                }
            }

            $result = [];

            foreach ($uniqueRows as $u) {
                $noOrder  = $u->NoOrder ?? '';
                $idBagian = (int)($u->IdBagian ?? 0);
                $finish   = $u->Finish ?? '';

                // 2. Detail per hari dari SP_5298_PJW_INF-KONSTRUKSI-PER-ORDER-3 kode=2
                $details = $db->select(
                    'EXEC [dbo].[SP_5298_PJW_INF-KONSTRUKSI-PER-ORDER-3] @kode=?, @noOd=?, @idBag=?, @date1=?, @date2=?',
                    [2, $noOrder, $idBagian, $validated['date1'], $validated['date2']]
                );

                // Inisialisasi matriks 31 hari (default: kosong)
                $days = [];
                for ($d = 1; $d <= 31; $d++) {
                    $days[$d] = ['hasSchedule' => false, 'cancel' => false];
                }

                $namaBrg    = '';
                $namaBagian = '';

                foreach ($details as $d) {
                    $namaBrg    = $d->Nama_Brg ?? $namaBrg;
                    $namaBagian = $d->NamaBagian ?? $namaBagian;

                    if (empty($d->EstDate)) continue;
                    $day = (int)Carbon::parse($d->EstDate)->format('d');
                    if ($day < 1 || $day > 31) continue;

                    $cancel = (int)($d->Cancel ?? 0);

                    if ($cancel === 1) {
                        $days[$day]['cancel'] = true;
                    } else {
                        $days[$day]['hasSchedule'] = true;
                    }
                }

                // Build cells: X / # / ''
                $cells = [];
                for ($d = 1; $d <= 31; $d++) {
                    if ($days[$d]['hasSchedule']) {
                        $cells[$d] = 'X';
                    } elseif ($days[$d]['cancel']) {
                        $cells[$d] = '#';
                    } else {
                        $cells[$d] = '';
                    }
                }

                $result[] = [
                    'NoOrder'    => $noOrder,
                    'NamaBarang' => $namaBrg,
                    'NamaBagian' => $namaBagian,
                    'cells'      => $cells,
                    'isFinish'   => ($finish === 'Y'),
                ];
            }

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
