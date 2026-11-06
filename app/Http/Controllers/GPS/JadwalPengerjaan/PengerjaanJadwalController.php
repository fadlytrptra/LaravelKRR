<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class PengerjaanJadwalController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.JadwalPengerjaan.pengerjaanJadwal', compact('access'));
    }

    // Helper: nama SP dinamis berdasarkan tipe mesin
    private function spName(int $mesinId, string $op): string
    {
        $prefix = ($mesinId == 17) ? 'SP_5409_PJW' : 'SP_5298_PJW';
        $suffix = [
            1 => 'TURNING',
            2 => 'DRILL',
            4 => 'GRINDING',
            6 => 'LAS',
            8 => 'PUNCH',
            10 => 'EDM',
            15 => 'FINISHING',
            16 => 'MAKLOON',
            17 => 'MEKATRONIK',
        ][$mesinId] ?? 'TURNING';
        return "{$prefix}_{$op}-{$suffix}";
    }

    // SP_5298_PJW_LIST-ORDER-KERJA / PROYEK kode=1
    public function getOrder(Request $request)
    {
        $v = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'jenisOd' => ['required', 'in:H,P'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $sp = ($v['jenisOd'] === 'H')
                ? 'EXEC [dbo].[SP_5298_PJW_LIST-ORDER-KERJA] ?, ?'
                : 'EXEC [dbo].[SP_5298_PJW_LIST-ORDER-PROYEK] ?, ?';

            $order = collect($db->select($sp, [1, $v['noOd']]))->first();
            if (!$order) {
                return response()->json([
                    'error' => "Nomer Order {$v['noOd']} tidak ada, belum di-ACC, atau ditolak."
                ], 404);
            }

            return response()->json([
                'TDivisi'    => $order->NamaDivisi ?? '',
                'TKdBrg'     => $order->Kd_Brg ?? '',
                'TNamaBrg'   => ($v['jenisOd'] === 'H') ? ($order->Nama_Brg ?? '') : ($order->Nama_Proyek ?? ''),
                'TNoGbr'     => $order->No_Gbr ?? '',
                'TJml'       => trim(($order->Jml_Brg ?? '0') . ' ' . ($order->Satuan ?? '')),
                'OdSts'      => $order->OdSts ?? '',
                'TKetOrder'  => $order->Ket_Order ?? '',
                'TMesin'     => $order->Mesin ?? '',
                'TUserOrder' => $order->UserOrder ?? '',
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_LIST-BAGIAN-BARANG
    public function getBagianList(Request $request)
    {
        $v = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'jenisOd' => ['required', 'in:H,P'],
        ]);
        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-BARANG] ?, ?', [$v['noOd'], $v['jenisOd']]);
            return response()->json(array_map(function ($item) {
                return [
                    'IdBagian'   => $item->NoBagian ?? ($item->IdBagian ?? ''),
                    'NamaBagian' => $item->NamaBagian ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_LIST-TYPE-MESIN kode=1
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
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_LIST-TYPE-MESIN kode=2, @noMesin
    public function getTypeList(Request $request)
    {
        $v = $request->validate(['noMesin' => ['required', 'integer']]);
        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-TYPE-MESIN] ?, ?', [2, $v['noMesin']]);
            return response()->json(array_map(function ($item) {
                return [
                    'NoType'   => $item->NoType ?? '',
                    'NamaType' => $item->NamaType ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_GET-MIN-ANTRIAN + SP_5298_PJW_GET-JAM-KERJA
    public function getJamKerja(Request $request)
    {
        $v = $request->validate([
            'mesin'   => ['required', 'integer'],
            'noType'  => ['required', 'integer'],
            'estDate' => ['required', 'date'],
        ]);
        $db = DB::connection('Connworkshop');
        try {
            $minAntri = collect($db->select(
                'EXEC [dbo].[SP_5298_PJW_GET-MIN-ANTRIAN] ?, ?, ?',
                [$v['estDate'], $v['mesin'], $v['noType']]
            ))->first();

            $nomer = $minAntri->min_antrian ?? null;
            if (empty($nomer)) {
                return response()->json(['ada' => 0, 'JmlJamKerja' => 0]);
            }

            $jk = collect($db->select(
                'EXEC [dbo].[SP_5298_PJW_GET-JAM-KERJA] ?, ?, ?, ?',
                [$nomer, $v['mesin'], $v['noType'], $v['estDate']]
            ))->first();

            return response()->json([
                'ada'         => $jk ? 1 : 0,
                'JmlJamKerja' => (int)($jk->JmlJamKerja ?? 0),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_CEK-PROSES-KERJA
    public function cekProses(Request $request)
    {
        $v = $request->validate([
            'noOd'    => ['required', 'string'],
            'idBag'   => ['required', 'integer'],
            'estDate' => ['required', 'date'],
            'noType'  => ['required', 'integer'],
            'jenisOd' => ['required', 'in:H,P'],
        ]);
        $db = DB::connection('Connworkshop');
        try {
            $r = collect($db->select(
                'EXEC [dbo].[SP_5298_PJW_CEK-PROSES-KERJA] ?, ?, ?, ?, ?',
                [$v['noOd'], $v['idBag'], $v['estDate'], $v['noType'], $v['jenisOd']]
            ))->first();
            return response()->json(['ada' => (int)($r->ada ?? 0)]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Dynamic SP: CEK-ESTDATE-{SUFFIX}
    public function cekEstDate(Request $request)
    {
        $v = $request->validate([
            'mesin'   => ['required', 'integer'],
            'noType'  => ['required', 'integer'],
            'estDate' => ['required', 'date'],
        ]);
        $sp = $this->spName($v['mesin'], 'CEK-ESTDATE');
        $db = DB::connection('Connworkshop');
        try {
            $r = collect($db->select("EXEC [dbo].[{$sp}] ?, ?", [$v['estDate'], $v['noType']]))->first();
            return response()->json(['ada' => (int)($r->Ada ?? $r->ada ?? 0)]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Dynamic SP: HITUNG-SISA-JAM-KRJ-{SUFFIX}
    public function hitungSisaJam(Request $request)
    {
        $v = $request->validate([
            'mesin'   => ['required', 'integer'],
            'noType'  => ['required', 'integer'],
            'estDate' => ['required', 'date'],
        ]);
        $sp = $this->spName($v['mesin'], 'HITUNG-SISA-JAM-KRJ');
        $db = DB::connection('Connworkshop');
        try {
            $r = collect($db->select("EXEC [dbo].[{$sp}] ?, ?", [$v['estDate'], $v['noType']]))->first();
            return response()->json([
                'SisaJamKrj'         => (int)($r->SisaJamKrj ?? 0),
                'SisaMenitKrj'       => (int)($r->SisaMenitKrj ?? 0),
                'SisaMenitKrj_bantu' => (int)($r->SisaMenitKrj_bantu ?? 0),
                'TotalMenitKrj'      => (int)($r->TotalMenitKrj ?? 0),
                'TotalMenitPk'       => (int)($r->TotalMenitPk ?? 0),
                'JamKrj'             => (int)($r->JamKrj ?? 0),
                'JamPk'              => (int)($r->JamPk ?? 0),
                'MenitPk'            => (int)($r->MenitPk ?? 0),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Dynamic SP: INSERT-NEWQUE-{SUFFIX}
    public function insertNewQue(Request $request)
    {
        $v = $request->validate([
            'noOd'      => ['required', 'string'],
            'estDate'   => ['required', 'date'],
            'estHour'   => ['required', 'integer', 'min:0'],
            'estMinute' => ['required', 'integer', 'min:0', 'max:59'],
            'noType'    => ['required', 'integer', 'min:1'],
            'mesin'     => ['required', 'integer', 'in:1,2,4,6,8,10,15,16,17'],
            'jamKrj'    => ['required', 'integer', 'min:1'],
            'status'    => ['required', 'integer', 'in:0,1'],
            'jmlBrg'    => ['required', 'integer', 'min:1'],
            'idBag'     => ['required', 'integer', 'min:1'],
            'hari'      => ['required', 'integer', 'min:0'],
            'jenisOd'   => ['required', 'in:H,P'],
        ]);
        $sp = $this->spName($v['mesin'], 'INSERT-NEWQUE');
        // $user = auth()->user()->username ?? 'admin';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');
        try {
            $db->statement("EXEC [dbo].[{$sp}] @noOd=?, @estDate=?, @estHour=?, @estMinute=?, @noType=?, @jamKrj=?, @status=?, @user=?, @jmlBrg=?, @idBag=?, @hari=?, @jenisOd=?", [
                $v['noOd'],
                $v['estDate'],
                $v['estHour'],
                $v['estMinute'],
                $v['noType'],
                $v['jamKrj'],
                $v['status'],
                $user,
                $v['jmlBrg'],
                $v['idBag'],
                $v['hari'],
                $v['jenisOd'],
            ]);
            return response()->json(['success' => true, 'message' => 'Data tersimpan.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // List antrian untuk modal FrmListOpr
    public function getListAntri(Request $request)
    {
        $v = $request->validate([
            'mesin'   => ['required', 'integer'],
            'noType'  => ['required', 'integer'],
            'tanggal' => ['required', 'date'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $spNo = $this->spName($v['mesin'], 'NOANTRI') . '-NOFINISH';
            $noAntriRows = $db->select("EXEC [dbo].[{$spNo}] ?, ?, ?", [
                3,
                $v['noType'],
                $v['tanggal']
            ]);

            $spJadwal = $this->spName($v['mesin'], 'JADWAL');
            $result = [];

            foreach ($noAntriRows as $na) {
                $noAntri = trim($na->NoAntrian ?? '');
                $jenisOd = trim($na->JenisOrder ?? 'H');
                $kode = ($jenisOd === 'H') ? 1 : 2;

                $j = collect($db->select("EXEC [dbo].[{$spJadwal}] ?, ?, ?, ?", [
                    $kode,
                    $noAntri,
                    $v['tanggal'],
                    $v['noType']
                ]))->first();
                if (!$j) continue;

                $namaBarang = ($jenisOd === 'H')
                    ? trim($j->Nama_Brg ?? '')
                    : trim($j->Nama_Proyek ?? '');
                $kdBarang = trim($j->Kd_Brg ?? '');

                $jml = trim($j->Jml_Brg ?? '');
                $hariKe = (int)($j->HariKe ?? 0);
                $jmlDikerjakan = ($hariKe > 0) ? (trim($j->JmlBrg ?? '') . ' . ' . $hariKe) : trim($j->JmlBrg ?? '');

                $result[] = [
                    'NoAntrian'    => $noAntri,
                    'NoOrder'      => trim($j->NoOd ?? ''),
                    'JenisOd'      => $jenisOd,
                    'NamaBarang'   => $namaBarang,
                    'KdBarang'     => $kdBarang,
                    'Divisi'       => trim($j->NamaDivisi ?? ''),
                    'EstTime'      => trim(($j->EstTimeHour ?? 0) . ' Jam ' . ($j->EstTimeMinute ?? 0) . ' Menit'),
                    'JmlOrder'     => $jml,
                    'NamaBagian'   => trim($j->NamaBagian ?? ''),
                    'JmlDikerjakan' => $jmlDikerjakan,
                    'IdBagian'     => (int)($j->IdBagian ?? 0),
                    'EstHour'      => (int)($j->EstTimeHour ?? 0),
                    'EstMinute'    => (int)($j->EstTimeMinute ?? 0),
                    'Status'       => (int)($j->Status ?? 0),
                    'Cancel'       => (int)($j->Cancel ?? 0),
                    'Finish'       => trim($j->Finish ?? ''),
                ];
            }

            $spSisa = $this->spName($v['mesin'], 'HITUNG-SISA-JAM-KRJ');
            $sisa = collect($db->select("EXEC [dbo].[{$spSisa}] ?, ?", [
                $v['tanggal'],
                $v['noType']
            ]))->first();

            return response()->json([
                'data'       => $result,
                'sisaJam'    => (int)($sisa->SisaJamKrj ?? 0),
                'sisaMenit'  => (int)($sisa->SisaMenitKrj ?? 0),
                'pakaiJam'   => (int)($sisa->JamPk ?? 0),
                'pakaiMenit' => (int)($sisa->MenitPk ?? 0),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Dynamic SP: INSERT-APPQUE-{SUFFIX}
    public function insertAppQue(Request $request)
    {
        $v = $request->validate([
            'noAntri'   => ['required', 'string'],
            'noOd'      => ['required', 'string'],
            'estDate'   => ['required', 'date'],
            'estHour'   => ['required', 'integer', 'min:0'],
            'estMinute' => ['required', 'integer', 'min:0', 'max:59'],
            'noType'    => ['required', 'integer', 'min:1'],
            'mesin'     => ['required', 'integer', 'in:1,2,4,6,8,10,15,16,17'],
            'jamKrj'    => ['required', 'integer', 'min:1'],
            'status'    => ['required', 'integer', 'in:0,1'],
            'jmlBrg'    => ['required', 'integer', 'min:1'],
            'idBag'     => ['required', 'integer', 'min:1'],
            'hari'      => ['required', 'integer', 'min:0'],
            'jenisOd'   => ['required', 'in:H,P'],
        ]);
        $sp = $this->spName($v['mesin'], 'INSERT-APPQUE');
        // $user = auth()->user()->username ?? 'admin';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');
        try {
            $db->statement("EXEC [dbo].[{$sp}] @noAntri=?, @noOd=?, @estDate=?, @estHour=?, @estMinute=?, @noType=?, @jamKrj=?, @status=?, @user=?, @jmlBrg=?, @idBag=?, @hari=?, @jenisOd=?", [
                $v['noAntri'],
                $v['noOd'],
                $v['estDate'],
                $v['estHour'],
                $v['estMinute'],
                $v['noType'],
                $v['jamKrj'],
                $v['status'],
                $user,
                $v['jmlBrg'],
                $v['idBag'],
                $v['hari'],
                $v['jenisOd'],
            ]);
            return response()->json(['success' => true, 'message' => 'Data tersimpan.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_SAVE-STSREADY kode=1
    public function saveStsReady(Request $request)
    {
        $v = $request->validate([
            'idBag'   => ['required', 'integer'],
            'estDate' => ['required', 'date'],
        ]);
        $db = DB::connection('Connworkshop');
        try {
            $db->statement('EXEC [dbo].[SP_5298_PJW_SAVE-STSREADY] ?, ?, ?', [1, $v['idBag'], $v['estDate']]);
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
