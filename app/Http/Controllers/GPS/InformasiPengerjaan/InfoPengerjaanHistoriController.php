<?php

namespace App\Http\Controllers\GPS\InformasiPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class InfoPengerjaanHistoriController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.InformasiPengerjaan.infoPengerjaanHistori', compact('access'));
    }

    // SP_5298_PJW_USER-PENJADWALAN untuk enable/disable tombol biaya
    public function getUserType()
    {
        // $user = auth()->user()->username ?? 'admin';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');
        try {
            $res = $db->select('EXEC [dbo].[SP_5298_PJW_USER-PENJADWALAN] ?', [$user]);
            $jenis = 0;
            if (!empty($res) && isset($res[0]->IdJenisUser)) {
                $jenis = (int)$res[0]->IdJenisUser;
            }
            return response()->json(['jenis' => $jenis]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Lookup bagian barang (SP_5298_PJW_LIST-BAGIAN-BARANG)
    public function getBagianList(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select(
                'EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-BARANG] @noOd = ?, @jenisOd = ?',
                [$validated['noOd'], $validated['jenisOd']]
            );
            $result = [];
            foreach ($list as $item) {
                $arr = (array) $item;
                $v = array_values($arr);
                $result[] = [
                    'IdBagian'   => $v[1] ?? '',
                    'NamaBagian' => $v[0] ?? '',
                ];
            }
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Multi-stage SP_5298_PJW_LIST-HISTORI + perhitungan biaya per bulan
    public function getData(Request $request)
    {
        $validated = $request->validate([
            'mode'    => ['required', 'in:namaBrg,kdBrg,noOd,idBag'],
            'jenisOd' => ['required', 'in:H,P'],
            'namaBrg' => ['nullable', 'string'],
            'kdBrg'   => ['nullable', 'string'],
            'noOd'    => ['nullable', 'string'],
            'idBag'   => ['nullable', 'integer'],
        ]);

        if ($validated['mode'] === 'kdBrg' && $validated['jenisOd'] !== 'H') {
            return response()->json([
                'error' => 'Pencarian Kode Barang hanya tersedia untuk Harian.',
            ], 422);
        }

        $db = DB::connection('Connworkshop');
        try {
            // 1) First-stage: ambil daftar IdBagian
            $kode = $this->resolveFirstKode($validated);
            $spSql = 'EXEC [dbo].[SP_5298_PJW_LIST-HISTORI] @kode = ?';
            $params = [$kode];
            if (in_array($kode, [1, 2], true)) {
                $spSql .= ', @namaBrg = ?';
                $params[] = $validated['namaBrg'] ?? '';
            } elseif (in_array($kode, [9, 10], true)) {
                $spSql .= ', @noOrder = ?';
                $params[] = $validated['noOd'] ?? '';
            } elseif ($kode === 6) {
                $spSql .= ', @kdBrg = ?';
                $params[] = $validated['kdBrg'] ?? '';
            } elseif (in_array($kode, [11, 12], true)) {
                $spSql .= ', @idBag = ?';
                $params[] = (int)($validated['idBag'] ?? 0);
            }
            $rows = $db->select($spSql, $params);

            $idBagians = [];
            foreach ($rows as $r) {
                $idBagians[] = (int)($r->IdBagian ?? 0);
            }

            if (empty($idBagians)) {
                return response()->json([
                    'data' => [],
                    'totalBiaya' => '0.00',
                ]);
            }

            // 2) Untuk setiap IdBagian, ambil daftar bulan (kode 13/14) lalu hitung biaya
            $jenisOd = $validated['jenisOd'];
            $kodeMonth   = ($jenisOd === 'H') ? 13 : 14;
            $kodeDetail  = ($jenisOd === 'H') ? 7 : 8;

            $result = [];
            $totalBiaya = 0;
            foreach ($idBagians as $ib) {
                // Ikuti urutan dan aturan pemilihan periode FrmHistori.vb.
                $monthRows = $db->select(
                    'EXEC [dbo].[SP_5298_PJW_LIST-HISTORI] @kode = ?, @idBag = ?',
                    [$kodeMonth, $ib]
                );
                $months = [];
                $monthIndex = 0;
                $lastFinish = null;
                foreach ($monthRows as $m) {
                    if ($m->TglFinish === null || $m->TglFinish === '') {
                        continue;
                    }

                    $finish = Carbon::parse($m->TglFinish);
                    $bulan = (int)($m->Bulan ?? 0);
                    $tahun = (int)($m->Tahun ?? 0);

                    if ($monthIndex === 0) {
                        $monthIndex = 1;
                        $lastFinish = $finish;
                        $months[] = ['bulan' => $bulan, 'tahun' => $tahun];
                        continue;
                    }

                    if ($lastFinish->lt($finish)) {
                        $lastFinish = $finish;
                        $lastMonth = $months[$monthIndex - 1];
                        if (($lastMonth['bulan'] < $bulan && $lastMonth['tahun'] === $tahun)
                            || ($lastMonth['bulan'] > $bulan && $lastMonth['tahun'] < $tahun)) {
                            $monthIndex++;
                            $months[] = ['bulan' => $bulan, 'tahun' => $tahun];
                        }
                    }
                }

                // Detail order (NoOrder, Divisi, NamaBarang, dll) — tidak difilter bulan
                $detailRows = $db->select(
                    'EXEC [dbo].[SP_5298_PJW_LIST-HISTORI] @kode = ?, @idBag = ?',
                    [$kodeDetail, $ib]
                );
                if (empty($detailRows)) continue;
                $d = $detailRows[0];

                $isHarian = in_array($kode, [1, 6, 9, 11], true);
                $namaBarang = $isHarian ? trim($d->Nama_Brg ?? '') : trim($d->Nama_Proyek ?? '');
                $kdBarang   = $isHarian ? trim($d->Kd_Brg ?? '') : '';
                $noGbr      = $isHarian ? trim($d->No_Gbr ?? '') : '';

                // Untuk setiap bulan dari idBagian ini, buat 1 baris
                foreach ($months as $mt) {
                    $bulan = $mt['bulan'];
                    $tahun = $mt['tahun'];

                    $biMaterial = $this->getMaterial($db, $ib, $bulan, $tahun);
                    $biSpart    = $this->getSpart($db, $ib, $bulan, $tahun);
                    $biMakloon  = $this->getMakloon($db, $ib, $bulan, $tahun);
                    $biProses   = $this->getProses($db, $ib, $bulan, $tahun);
                    $biTotal    = $biMaterial + $biSpart + $biMakloon + $biProses;
                    $totalBiaya += $biTotal;

                    $result[] = [
                        'NoOrder'    => trim($d->NoOrder ?? ''),
                        'Divisi'     => trim($d->NamaDivisi ?? ''),
                        'NamaBarang' => $namaBarang,
                        'KdBarang'   => $kdBarang,
                        'NoGbr'      => $noGbr,
                        'NamaBagian' => trim($d->NamaBagian ?? ''),
                        'IdBagian'   => $ib,
                        'JmlOrder'   => trim(($d->JmlOrder ?? '') . ' ' . ($d->Satuan ?? '')),
                        'TotalBiaya' => number_format($biTotal, 2, '.', ','),
                        'FinishKR'   => $this->namaBulan($bulan) . ' ' . $tahun,
                        'bulan'      => $bulan,
                        'tahun'      => $tahun,
                    ];
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

    public function getDetail(Request $request)
    {
        $validated = $request->validate([
            'kode'  => ['required', 'integer', 'in:18,19'],
            'idBag' => ['required', 'integer', 'min:1'],
            'bulan' => ['required', 'integer', 'between:1,12'],
            'tahun' => ['required', 'integer', 'between:1900,2200'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $rows = $db->select(
                'EXEC [dbo].[SP_5298_PJW_LIST-HISTORI] @kode = ?, @idBag = ?, @bulan = ?, @tahun = ?',
                [
                    (int)$validated['kode'],
                    (int)$validated['idBag'],
                    (int)$validated['bulan'],
                    (int)$validated['tahun'],
                ]
            );

            $result = [];
            $totalBiaya = 0;
            foreach ($rows as $row) {
                $biaya = (float)($row->Biaya ?? 0);
                $result[] = [
                    'EstDate'    => $row->EstDate ?? '',
                    'NamaMesin'  => $row->NamaMesin ?? '',
                    'NamaType'   => $row->NamaType ?? '',
                    'SetujuKR'   => $row->SetujuKR ?? '',
                    'RealTime'   => ($row->RealJam ?? 0) . ' Jam ' . ($row->RealMenit ?? 0) . ' Menit',
                    'JmlSelesai' => $row->JmlSelesai ?? '',
                    'Biaya'      => number_format($biaya, 2, '.', ','),
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

    /** Detail material untuk baris histori yang dipilih. */
    public function getHistoriMaterial(Request $request)
    {
        $validated = $request->validate([
            'noOd'       => ['required', 'string', 'max:6'],
            'namaBagian' => ['required', 'string', 'max:100'],
            'kdBrg'      => ['nullable', 'string', 'max:9'],
            'bulan'      => ['required', 'integer', 'between:1,12'],
            'tahun'      => ['required', 'integer', 'between:1900,2200'],
        ]);

        $jenisOrder = trim($validated['kdBrg'] ?? '') !== '' ? 'H' : 'P';
        $db = DB::connection('Connworkshop');
        try {
            $rows = $db->select(
                'EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL-LENGKAP] @kode = ?, @noOrder = ?, @namaBagian = ?, @jenisOrder = ?, @bulan = ?, @tahun = ?',
                [5, $validated['noOd'], $validated['namaBagian'], $jenisOrder, (int)$validated['bulan'], (int)$validated['tahun']]
            );

            $data = [];
            $totalBaru = 0;
            $totalBekas = 0;
            foreach ($rows as $row) {
                $hargaTotal = (float)($row->HargaTotal ?? 0);
                $hargaTotalBekas = (float)($row->HargaTotalB ?? 0);
                $totalBaru += $hargaTotal;
                $totalBekas += $hargaTotalBekas;
                $data[] = [
                    'MtrType'        => trim($row->MtrType ?? ''),
                    'Spek'           => trim($row->Spek ?? ''),
                    'KdBrg'          => trim($row->KdBrg ?? ''),
                    'Jml'            => number_format((float)($row->Jml ?? 0), 2, '.', ','),
                    'NamaSatuan'     => $row->Nama_Satuan ?? '',
                    'HargaBaru'      => number_format((float)($row->Harga ?? 0), 2, '.', ','),
                    'HargaTotal'     => number_format($hargaTotal, 2, '.', ','),
                    'HargaBekas'     => number_format((float)($row->HargaBekas ?? 0), 2, '.', ','),
                    'HargaTotalBekas'=> number_format($hargaTotalBekas, 2, '.', ','),
                    'Status'         => (int)($row->Status ?? 0),
                ];
            }

            return response()->json([
                'data' => $data,
                'totalBaru' => number_format($totalBaru, 2, '.', ','),
                'totalBekas' => number_format($totalBekas, 2, '.', ','),
                'totalSemua' => number_format($totalBaru + $totalBekas, 2, '.', ','),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    /** Detail S/Part untuk baris histori yang dipilih. */
    public function getHistoriSpart(Request $request)
    {
        $validated = $request->validate([
            'noOd'       => ['required', 'string', 'max:6'],
            'namaBagian' => ['required', 'string', 'max:100'],
            'kdBrg'      => ['nullable', 'string', 'max:9'],
            'bulan'      => ['required', 'integer', 'between:1,12'],
            'tahun'      => ['required', 'integer', 'between:1900,2200'],
        ]);

        $jenisOrder = trim($validated['kdBrg'] ?? '') !== '' ? 'H' : 'P';
        $db = DB::connection('Connworkshop');
        try {
            $rows = $db->select(
                'EXEC [dbo].[SP_5298_PJW_LIST-SPART-BAGIAN] @kode = ?, @noOrder = ?, @namaBagian = ?, @jenisOrder = ?, @bulan = ?, @tahun = ?',
                [9, $validated['noOd'], $validated['namaBagian'], $jenisOrder, (int)$validated['bulan'], (int)$validated['tahun']]
            );

            $data = [];
            $totalBaru = 0;
            $totalStock = 0;
            foreach ($rows as $row) {
                $hargaTotalBaru = (float)($row->HargaTotalB ?? 0);
                $hargaTotalStock = (float)($row->HargaTotalS ?? 0);
                $totalBaru += $hargaTotalBaru;
                $totalStock += $hargaTotalStock;
                $data[] = [
                    'KdBrg'       => trim($row->KdBrg ?? ''),
                    'NamaBarang'  => trim($row->Nm_brg ?? ''),
                    'SubKategori' => trim($row->nama_sub_kategori ?? ''),
                    'Jml'         => number_format((float)($row->Jml ?? 0), 2, '.', ','),
                    'Satuan'      => trim($row->Satuan ?? ''),
                    'HargaBaru'   => number_format((float)($row->HargaBaru ?? 0), 2, '.', ','),
                    'HargaTotalB' => number_format($hargaTotalBaru, 2, '.', ','),
                    'HargaStok'   => number_format((float)($row->HargaStok ?? 0), 2, '.', ','),
                    'HargaTotalS' => number_format($hargaTotalStock, 2, '.', ','),
                    'Status'      => (int)($row->Status ?? 0),
                ];
            }

            return response()->json([
                'data' => $data,
                'totalBaru' => number_format($totalBaru, 2, '.', ','),
                'totalStock' => number_format($totalStock, 2, '.', ','),
                'totalSemua' => number_format($totalBaru + $totalStock, 2, '.', ','),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    /** Detail biaya makloon untuk baris histori yang dipilih. */
    public function getHistoriMakloon(Request $request)
    {
        $validated = $request->validate([
            'idBag'   => ['required', 'integer', 'min:1'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
            'bulan'   => ['required', 'integer', 'between:1,12'],
            'tahun'   => ['required', 'integer', 'between:1900,2200'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $rows = $db->select(
                'EXEC [dbo].[SP_5298_PJW_LIST-HISTORI] @kode = ?, @idBag = ?, @jenis = ?, @bulan = ?, @tahun = ?',
                [20, (int)$validated['idBag'], $validated['jenisOd'], (int)$validated['bulan'], (int)$validated['tahun']]
            );

            $data = [];
            $totalBiaya = 0;
            foreach ($rows as $row) {
                $hasJumlah = isset($row->Jml);
                $harga = $hasJumlah ? (float)($row->Harga ?? 0) : null;
                $hargaTotal = $hasJumlah ? (float)($row->HargaTotal ?? 0) : null;
                if ($hasJumlah) {
                    $totalBiaya += $hargaTotal;
                }
                $data[] = [
                    'NamaType'   => trim($row->NamaType ?? ''),
                    'Jml'        => $hasJumlah ? $row->Jml : '',
                    'Harga'      => $hasJumlah ? number_format($harga, 2, '.', ',') : '',
                    'HargaTotal' => $hasJumlah ? number_format($hargaTotal, 2, '.', ',') : '',
                    'Keterangan' => $hasJumlah ? ($row->Keterangan ?? '') : '',
                ];
            }

            return response()->json([
                'data' => $data,
                'totalBiaya' => number_format($totalBiaya, 2, '.', ','),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    private function resolveFirstKode(array $v): int
    {
        $isH = ($v['jenisOd'] === 'H');
        switch ($v['mode']) {
            case 'namaBrg':
                return $isH ? 1 : 2;
            case 'kdBrg':
                return 6;    // H only
            case 'noOd':
                return $isH ? 9 : 10;
            case 'idBag':
                return $isH ? 11 : 12;
        }
        return 1;
    }

    // SP_5298_PJW_LIST-MATERIAL-LENGKAP kode=4
    private function getMaterial($db, int $idBag, int $bulan, int $tahun): float
    {
        try {
            $r = $db->select(
                'EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL-LENGKAP] @kode = ?, @idBagian = ?, @bulan = ?, @tahun = ?',
                [4, $idBag, $bulan, $tahun]
            );
            if (!empty($r) && isset($r[0]->TotalHarga) && isset($r[0]->TotalHargaB)) {
                return (float)$r[0]->TotalHarga + (float)$r[0]->TotalHargaB;
            }
        } catch (\Exception $e) {
        }
        return 0;
    }

    // SP_5298_PJW_LIST-SPART-BAGIAN kode=8
    private function getSpart($db, int $idBag, int $bulan, int $tahun): float
    {
        try {
            $r = $db->select(
                'EXEC [dbo].[SP_5298_PJW_LIST-SPART-BAGIAN] @kode = ?, @noBagian = ?, @bulan = ?, @tahun = ?',
                [8, $idBag, $bulan, $tahun]
            );
            if (!empty($r) && isset($r[0]->TotalHargaB) && isset($r[0]->TotalHargaS)) {
                return (float)$r[0]->TotalHargaB + (float)$r[0]->TotalHargaS;
            }
        } catch (\Exception $e) {
        }
        return 0;
    }

    // SP_5298_PJW_BIAYA-MAKLOON
    private function getMakloon($db, int $idBag, int $bulan, int $tahun): float
    {
        try {
            $r = $db->select(
                'EXEC [dbo].[SP_5298_PJW_BIAYA-MAKLOON] @noBagian = ?, @bulan = ?, @tahun = ?',
                [$idBag, $bulan, $tahun]
            );
            if (!empty($r) && isset($r[0]->TotalHarga)) {
                return (float)$r[0]->TotalHarga;
            }
        } catch (\Exception $e) {
        }
        return 0;
    }

    // SP_5298_PJW_LIST-HISTORI kode=17
    private function getProses($db, int $idBag, int $bulan, int $tahun): float
    {
        try {
            $r = $db->select(
                'EXEC [dbo].[SP_5298_PJW_LIST-HISTORI] @kode = ?, @idBag = ?, @bulan = ?, @tahun = ?',
                [17, $idBag, $bulan, $tahun]
            );
            if (!empty($r) && isset($r[0]->TotalBiaya)) {
                return (float)$r[0]->TotalBiaya;
            }
        } catch (\Exception $e) {
        }
        return 0;
    }

    private function namaBulan(int $b): string
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
        return $map[$b] ?? '';
    }
}
