<?php

namespace App\Http\Controllers\GPS\InformasiPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InfoPengerjaanBulananController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        $bulan = (int)Carbon::now()->format('m');
        $tahun = (int)Carbon::now()->format('Y');
        return view(
            'GPS.InformasiPengerjaan.infoPengerjaanBulanan',
            compact('access', 'bulan', 'tahun')
        );
    }

    // SP_5298_PJW_INF-JDW-TRANSAKSI + SP_5298_PJW_INF-JADWAL-PER-ORDER-3 per order
    public function getData(Request $request)
    {
        $validated = $request->validate([
            'bulan' => ['required', 'integer', 'min:1', 'max:12'],
            'tahun' => ['required', 'integer', 'min:2000', 'max:2100'],
        ]);

        $bulan = (int)$validated['bulan'];
        $tahun = (int)$validated['tahun'];
        $daysInMonth = Carbon::create($tahun, $bulan, 1)->daysInMonth;
        $date1 = sprintf('%04d-%02d-01', $tahun, $bulan);
        $date2 = sprintf('%04d-%02d-%02d', $tahun, $bulan, $daysInMonth);

        $db = DB::connection('Connworkshop');

        try {
            // 1) Ambil daftar transaksi bulan ini
            $rows = $db->select('EXEC [dbo].[SP_5298_PJW_INF-JDW-TRANSAKSI] ?, ?', [$date1, $date2]);

            // 2) Deduplikasi: kunci = IdBagian + EstDate + NoType, prioritaskan Cancel = 0
            $unique = [];
            foreach ($rows as $r) {
                $key = $r->IdBagian . '|' . $r->EstDate . '|' . ($r->NoType ?? '');
                if (!isset($unique[$key])) {
                    $unique[$key] = $r;
                } else {
                    if (((int)($unique[$key]->Cancel ?? 1) === 1) && ((int)($r->Cancel ?? 1) === 0)) {
                        $unique[$key] = $r;
                    }
                }
            }
            $unique = array_values($unique);

            // 3) Untuk setiap order, ambil detail jadwal per hari
            $result = [];
            foreach ($unique as $u) {
                $jenisOd = $u->JenisOrder ?? 'H';
                $kode = ($jenisOd === 'H') ? 2 : 3;

                $detail = $db->select('EXEC [dbo].[SP_5298_PJW_INF-JADWAL-PER-ORDER-3] @kode=?, @noOd=?, @idBag=?, @date1=?, @date2=?', [
                    $kode,
                    trim($u->NoOrder ?? ''),
                    (int)$u->IdBagian,
                    $date1,
                    $date2,
                ]);

                // Inisialisasi 31 hari
                $cells = [];
                for ($d = 1; $d <= 31; $d++) {
                    $cells[$d] = ['scheduled' => false, 'cancel' => false];
                }

                $namaBarang = '';
                $namaBagian = '';

                foreach ($detail as $d) {
                    if ($jenisOd === 'H') {
                        $namaBarang = $d->Nama_Brg ?? $namaBarang;
                    } else {
                        $namaBarang = $d->Nama_Proyek ?? $namaBarang;
                    }
                    $namaBagian = $d->NamaBagian ?? $namaBagian;

                    if (!empty($d->EstDate)) {
                        $day = (int)Carbon::parse($d->EstDate)->format('j');
                        if ($day >= 1 && $day <= 31) {
                            $isCancel = ((int)($d->Cancel ?? 0) === 1);

                            if (!$cells[$day]['scheduled']) {
                                $cells[$day]['scheduled'] = true;
                                $cells[$day]['cancel'] = $isCancel;
                            } else {
                                if ($cells[$day]['cancel'] === true && $isCancel === false) {
                                    $cells[$day]['cancel'] = false;
                                }
                            }
                        }
                    }
                }

                // Susun string per hari
                $dayStr = [];
                for ($d = 1; $d <= 31; $d++) {
                    if ($cells[$d]['cancel']) {
                        $dayStr[$d] = '#';
                    } elseif ($cells[$d]['scheduled']) {
                        $dayStr[$d] = 'X';
                    } else {
                        $dayStr[$d] = '';
                    }
                }

                $result[] = [
                    'NoOrder'    => trim($u->NoOrder ?? ''),
                    'NamaBarang' => trim($namaBarang),
                    'NamaBagian' => trim($namaBagian),
                    'Finish'     => trim($u->Finish ?? ''),
                    'days'       => $dayStr,
                ];
            }

            return response()->json([
                'daysInMonth' => $daysInMonth,
                'data'        => $result,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
