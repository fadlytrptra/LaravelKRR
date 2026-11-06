<?php

namespace App\Http\Controllers\GPS\InformasiKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class InfoKonstruksiOrderGambarController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');

        // SP_5298_PJW_USER-PENJADWALAN — cek jenis user
        // $user = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');
        $jenis = 0;
        try {
            $r = collect($db->select('EXEC [dbo].[SP_5298_PJW_USER-PENJADWALAN] ?', [$user]))->first();
            if ($r) $jenis = (int)($r->IdJenisUser ?? 0);
        } catch (\Exception $e) {
        }

        $btnTotalEnabled = in_array($jenis, [1, 7]);

        // Default date: awal bulan s/d akhir bulan
        $now = Carbon::now();
        $startDate = $now->copy()->startOfMonth()->format('Y-m-d');
        $endDate   = $now->copy()->endOfMonth()->format('Y-m-d');

        return view(
            'GPS.InformasiKonstruksi.InfoKonstruksiOrderGambar',
            compact('access', 'jenis', 'btnTotalEnabled', 'startDate', 'endDate')
        );
    }

    /**
     * Load data daftar order gambar.
     * SP_5298_PJW_INF-JDW-KONSTRUKSI → SP_5298_PJW_BIAYA-KONSTRUKSI-BAGIAN → SP_5298_PJW_INF-JADWAL-ORDER-GBR (kode=1)
     */
    public function getData(Request $request)
    {
        $validated = $request->validate([
            'date1' => ['required', 'date_format:Y-m-d'],
            'date2' => ['required', 'date_format:Y-m-d', 'after_or_equal:date1'],
        ]);

        $db = DB::connection('Connworkshop');

        try {
            // 1. Ambil daftar (IdBagian, NoAntrian, EstDate, NoWrkSts) dari SP_5298_PJW_INF-JDW-KONSTRUKSI
            $rawRows = $db->select('EXEC [dbo].[SP_5298_PJW_INF-JDW-KONSTRUKSI] ?, ?', [
                $validated['date1'],
                $validated['date2']
            ]);

            // Filter unik IdBagian (mirip logika VB idk)
            $uniqueRows = [];
            $seenKeys = [];
            foreach ($rawRows as $row) {
                $idBagian = $row->IdBagian ?? null;
                if ($idBagian === null) continue;
                $key = $idBagian . '|' . ($row->EstDate ?? '');
                if (!isset($seenKeys[$key])) {
                    $seenKeys[$key] = true;
                    $uniqueRows[] = $row;
                }
            }

            // 2. Loop: ambil biaya + detail
            $result = [];
            $totalBiaya = 0;
            $counter = 0;

            foreach ($uniqueRows as $row) {
                $idBagian  = (int)($row->IdBagian ?? 0);
                $noAntri   = $row->NoAntrian ?? '';
                $estDate   = $row->EstDate ?? '';
                $noWrkSts  = (int)($row->NoWrkSts ?? 0);

                // Biaya proses (SP_5298_PJW_BIAYA-KONSTRUKSI-BAGIAN)
                $biProses = 0;
                $biayaRow = collect($db->select('EXEC [dbo].[SP_5298_PJW_BIAYA-KONSTRUKSI-BAGIAN] ?, ?, ?', [
                    $idBagian,
                    $validated['date1'],
                    $validated['date2']
                ]))->first();
                if ($biayaRow && !is_null($biayaRow->TotalBiaya)) {
                    $biProses = (float)$biayaRow->TotalBiaya;
                }

                // Detail (SP_5298_PJW_INF-JADWAL-ORDER-GBR kode=1)
                $detail = collect($db->select('EXEC [dbo].[SP_5298_PJW_INF-JADWAL-ORDER-GBR] @kode=?, @noAntri=?, @date1=?, @worksts=?', [
                    1,
                    $noAntri,
                    $estDate,
                    $noWrkSts
                ]))->first();

                if (!$detail) continue;

                $tglFinish = $detail->TglFinish ?? null;
                $isFinish  = !empty($tglFinish);

                $result[] = [
                    'NoOrder'      => $detail->Id_Order ?? '',
                    'Divisi'       => $detail->NamaDivisi ?? '',
                    'NamaBarang'   => $detail->Nama_Brg ?? '',
                    'NamaBagian'   => $detail->NamaBagian ?? '',
                    'StatusOrder'  => $detail->Keterangan ?? '',
                    'TglStart'     => $detail->EstDate ?? '',
                    'TglFinish'    => $tglFinish ?? '',
                    'TotalBiaya'   => number_format($biProses, 2, '.', ','),
                    'TotalBiayaRaw' => $biProses,
                    'isFinish'     => $isFinish,
                ];

                $totalBiaya += $biProses;
                $counter++;
            }

            return response()->json([
                'data' => $result,
                'totalBiaya' => number_format($totalBiaya, 2, '.', ','),
                'totalBiayaRaw' => $totalBiaya,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
