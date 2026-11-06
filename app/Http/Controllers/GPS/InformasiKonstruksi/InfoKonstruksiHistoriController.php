<?php

namespace App\Http\Controllers\GPS\InformasiKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class InfoKonstruksiHistoriController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');

        // SP_5298_PJW_USER-PENJADWALAN — cek jenis user
        // $user = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');
        $jenis = 1;
        try {
            $r = collect($db->select('EXEC [dbo].[SP_5298_PJW_USER-PENJADWALAN] ?', [$user]))->first();
            if ($r) $jenis = (int)($r->IdJenisUser ?? 0);
        } catch (\Exception $e) {
        }

        $btnTotalEnabled = in_array($jenis, [1, 7]);

        return view(
            'GPS.InformasiKonstruksi.InfoKonstruksiHistori',
            compact('access', 'jenis', 'btnTotalEnabled')
        );
    }

    // Lookup bagian gambar (SP_5298_PJW_LIST-BAGIAN-GAMBAR)
    public function getBagianList(Request $request)
    {
        $validated = $request->validate([
            'noOd' => ['required', 'string', 'max:6'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-GAMBAR] ?', [$validated['noOd']]);
            return response()->json(array_map(function ($item) {
                return [
                    'IdBagian'   => $item->IdBagian ?? '',
                    'NamaBagian' => $item->NamaBagian ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_LIST-HISTORI-KONSTRUKSI — gabungan kode 1/9/11 → 13 → 17 → 7
    public function getHistori(Request $request)
    {
        $validated = $request->validate([
            'kode'    => ['required', 'integer', 'in:1,9,11'],
            'namaBrg' => ['nullable', 'string', 'max:100'],
            'noOrder' => ['nullable', 'string', 'max:6'],
            'idBag'   => ['nullable', 'integer'],
        ]);

        $kode    = (int)$validated['kode'];
        $namaBrg = $validated['namaBrg'] ?? '';
        $noOrder = $validated['noOrder'] ?? '';
        $idBag   = $validated['idBag'] ?? 0;

        $db = DB::connection('Connworkshop');

        try {
            // 1. Daftar IdBagian unik (kode 1/9/11)
            $params = [$kode];
            $sql = 'EXEC [dbo].[SP_5298_PJW_LIST-HISTORI-KONSTRUKSI] @kode = ?';
            if ($kode === 1) {
                $sql .= ', @namaBrg = ?';
                $params[] = $namaBrg;
            } elseif ($kode === 9) {
                $sql .= ', @noOrder = ?';   
                $params[] = $noOrder;
            } elseif ($kode === 11) {
                $sql .= ', @idBag = ?';
                $params[] = $idBag;
            }
            $rawRows = $db->select($sql, $params);

            // Ambil unique IdBagian
            $idBagianList = [];
            foreach ($rawRows as $r) {
                $id = (int)($r->IdBagian ?? 0);
                if ($id > 0 && !in_array($id, $idBagianList, true)) {
                    $idBagianList[] = $id;
                }
            }

            $result = [];
            $totalBiaya = 0;

            // 2. Per IdBagian: kode=13 → daftar bulan-tahun
            foreach ($idBagianList as $idB) {
                $monthRows = $db->select(
                    'EXEC [dbo].[SP_5298_PJW_LIST-HISTORI-KONSTRUKSI] @kode = ?, @idBag = ?',
                    [13, $idB]
                );

                // Kumpulkan unique bulan-tahun
                $monthYearList = [];
                $seenMY = [];
                $lastTglFinish = null;
                foreach ($monthRows as $mr) {
                    if (empty($mr->TglFinish)) continue;
                    $tgl = Carbon::parse($mr->TglFinish);
                    $bln = (int)($mr->Bulan ?? $tgl->format('n'));
                    $thn = (int)($mr->Tahun ?? $tgl->format('Y'));
                    $key = $thn . '|' . $bln;
                    if (!isset($seenMY[$key])) {
                        $seenMY[$key] = true;
                        $monthYearList[] = ['bulan' => $bln, 'tahun' => $thn];
                    }
                }

                // 3. Per bulan-tahun: kode=17 → TotalBiaya, kode=7 → detail
                foreach ($monthYearList as $my) {
                    $biProses = 0;
                    $biayaRow = collect($db->select(
                        'EXEC [dbo].[SP_5298_PJW_LIST-HISTORI-KONSTRUKSI] @kode = ?, @idBag = ?, @bulan = ?, @tahun = ?',
                        [17, $idB, $my['bulan'], $my['tahun']]
                    ))->first();
                    if ($biayaRow && !is_null($biayaRow->TotalBiaya)) {
                        $biProses = (float)$biayaRow->TotalBiaya;
                    }

                    $detail = collect($db->select(
                        'EXEC [dbo].[SP_5298_PJW_LIST-HISTORI-KONSTRUKSI] @kode = ?, @idBag = ?',
                        [7, $idB]
                    ))->first();
                    if (!$detail) continue;

                    $namaBulan = $this->getNamaBulan($my['bulan']);

                    $result[] = [
                        'NoOrder'      => $detail->NoOrder ?? '',
                        'Divisi'       => $detail->NamaDivisi ?? '',
                        'NamaBarang'   => $detail->Nama_Brg ?? '',
                        'NamaBagian'   => $detail->NamaBagian ?? '',
                        'IdBagian'     => (int)($detail->IdBagian ?? 0),
                        'TotalBiaya'   => number_format($biProses, 2, '.', ','),
                        'KeteranganFinish' => $namaBulan . ' ' . $my['tahun'],
                        'Bulan'        => $my['bulan'],
                        'Tahun'        => $my['tahun'],
                    ];
                    $totalBiaya += $biProses;
                }
            }

            return response()->json([
                'data' => $result,
                'totalBiaya' => number_format($totalBiaya, 2, '.', ','),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Detail proses konstruksi untuk periode histori terpilih.
     * SP_5298_PJW_LIST-HISTORI-KONSTRUKSI kode=3.
     */
    public function getHistoriDetail(Request $request)
    {
        $validated = $request->validate([
            'kode'  => ['required', 'integer', 'in:18'],
            'idBag' => ['required', 'integer', 'min:1'],
            'bulan' => ['required', 'integer', 'between:1,12'],
            'tahun' => ['required', 'integer', 'between:1900,2200'],
        ]);

        $db = DB::connection('Connworkshop');

        try {
            $rows = $db->select(
                'EXEC [dbo].[SP_5298_PJW_LIST-HISTORI-KONSTRUKSI] @kode = ?, @idBag = ?, @bulan = ?, @tahun = ?',
                [(int)$validated['kode'], (int)$validated['idBag'], (int)$validated['bulan'], (int)$validated['tahun']]
            );

            $result = [];
            $totalBiaya = 0;
            foreach ($rows as $row) {
                $biaya = (float)($row->Biaya ?? 0);
                $result[] = [
                    'EstDate'          => $row->EstDate ?? '',
                    'NamaWorkStation'  => $row->NamaWorkStation ?? '',
                    'SetujuKR'         => $row->SetujuKR ?? '',
                    'RealTime'         => ($row->RealJam ?? 0) . ' Jam ' . ($row->RealMenit ?? 0) . ' Menit',
                    'Biaya'            => number_format($biaya, 2, '.', ','),
                ];
                $totalBiaya += $biaya;
            }

            return response()->json([
                'data' => $result,
                'totalBiaya' => number_format($totalBiaya, 2, '.', ','),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Helper: nama bulan Indonesia
    private function getNamaBulan($bln)
    {
        $map = [
            1 => 'JANUARI',
            2 => 'FEBRUARI',
            3 => 'MARET',
            4 => 'APRIL',
            5 => 'MEI',
            6 => 'JUNI',
            7 => 'JULI',
            8 => 'AGUSTUS',
            9 => 'SEPTEMBER',
            10 => 'OKTOBER',
            11 => 'NOVEMBER',
            12 => 'DESEMBER',
        ];
        return $map[$bln] ?? '';
    }
}
