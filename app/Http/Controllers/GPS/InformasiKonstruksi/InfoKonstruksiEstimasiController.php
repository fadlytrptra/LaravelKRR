<?php

namespace App\Http\Controllers\GPS\InformasiKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InfoKonstruksiEstimasiController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');

        // Default date: awal bulan s/d akhir bulan
        $now = Carbon::now();
        $startDate = $now->copy()->startOfMonth()->format('Y-m-d');
        $endDate   = $now->copy()->endOfMonth()->format('Y-m-d');
        $today     = $now->format('Y-m-d');

        return view('GPS.InformasiKonstruksi.InfoKonstruksiEstimasi',
            compact('access', 'startDate', 'endDate', 'today'));
    }

    /**
     * SP_5298_PJW_DAFTAR_EST_JDW_KONS — kode=1 (hari ini) / kode=2 (rentang tanggal)
     */
    public function getData(Request $request)
    {
        $validated = $request->validate([
            'kode'  => ['required', 'integer', 'in:1,2'],
            'tgl_1' => ['required', 'date_format:Y-m-d'],
            'tgl_2' => ['nullable', 'date_format:Y-m-d'],
        ]);

        $kode = (int)$validated['kode'];
        $tgl1 = $validated['tgl_1'];
        $tgl2 = $validated['tgl_2'] ?? $tgl1;

        $db = DB::connection('Connworkshop');
        $today = Carbon::today();

        try {
            $rows = $db->select('EXEC [dbo].[SP_5298_PJW_DAFTAR_EST_JDW_KONS] ?, ?, ?', [
                $kode, $tgl1, $tgl2
            ]);

            $result = [];
            foreach ($rows as $row) {
                $tglFinish = $row->TglFinish ?? null;
                $jmlBagian = (int)($row->JmlBagian ?? 0);
                $jmlSelesai = (int)($row->JmlSelesai ?? 0);

                // Tentukan warna
                $status = 'default';
                if (!empty($tglFinish)) {
                    $tglF = Carbon::parse($tglFinish)->startOfDay();

                    if ($tglF->lt($today)) {
                        // TglFinish < hari ini
                        if ($jmlBagian === $jmlSelesai && $jmlSelesai !== 0) {
                            $status = 'finish'; // Biru
                        }
                        if ($jmlBagian !== $jmlSelesai || $jmlBagian === 0) {
                            $status = 'overtime'; // Merah
                        }
                    } elseif ($tglF->eq($today)) {
                        // TglFinish = hari ini
                        if ($jmlBagian === $jmlSelesai && $jmlSelesai !== 0) {
                            $status = 'finish'; // Biru
                        }
                    }
                }

                $result[] = [
                    'NoOrder'    => $row->Id_Order ?? '',
                    'Divisi'     => $row->NamaDivisi ?? '',
                    'NamaBarang' => $row->Nama_Brg ?? '',
                    'TglStart'   => $row->TglStart ?? '',
                    'TglFinish'  => $tglFinish ?? '',
                    'statusWarna' => $status,
                ];
            }

            return response()->json($result);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}