<?php

namespace App\Http\Controllers\GPS\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class KonstruksiJadwalController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.JadwalKonstruksi.konstruksiJadwal', compact('access'));
    }

    // SP_5298_PJW_LIST-ORDER-GAMBAR kode=1
    public function getOrder(Request $request)
    {
        $validated = $request->validate([
            'noOd' => ['required', 'string', 'max:6'],
        ]);
        $db = DB::connection('Connworkshop');
        try {
            $request = collect($db->select('EXEC [dbo].[SP_5298_PJW_LIST-ORDER-GAMBAR] ?, ?', [
                1,
                $validated['noOd']
            ]))->first();
            if (!$request) {
                return response()->json([
                    'error' => "Nomer order gambar {$validated['noOd']} tidak ada, belum di-ACC, ditolak, atau sudah finish."
                ], 404);
            }
            return response()->json([
                'TDivisi'    => $request->NamaDivisi ?? '',
                'TKdBrg'     => $request->Kd_Brg ?? '',
                'TNamaBrg'   => $request->Nama_Brg ?? '',
                'TNoGbr'     => $request->No_Gbr_Rev ?? '',
                'OdSts'      => $request->OdSts ?? '',
                'TKetOrder'  => $request->Ket_Order ?? '',
                'TMesin'     => $request->Mesin ?? '',
                'TUserOrder' => $request->Pengorder ?? '',
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_LIST-BAGIAN-GAMBAR
    // Lookup bagian gambar (SP_5298_PJW_LIST-BAGIAN-GAMBAR)

    public function getBagianList(Request $request)
    {
        $validated = $request->validate([
            'noOd' => ['required', 'string', 'max:6'],
        ]);

        $noOd = $validated['noOd'];
        $db = DB::connection('Connworkshop');

        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-GAMBAR] ?', [$noOd]);

            $requestesult = array_map(function ($item) {
                return [
                    'IdBagian'   => $item->IdBagian ?? '',
                    'NamaBagian' => $item->NamaBagian ?? '',
                ];
            }, $list);

            return response()->json($requestesult);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Lookup work station (SP_5298_PJW_LIST-WORKSTATION)

    public function getWorkstationList()
    {
        $db = DB::connection('Connworkshop');

        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-WORKSTATION]');

            $requestesult = array_map(function ($item) {
                return [
                    'NoWrkSts' => $item->NoWrkSts ?? '',
                    'NamaWorkStation' => $item->NamaWorkStation ?? '',
                ];
            }, $list);

            return response()->json($requestesult);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI
    public function cekEstimasi(Request $request)
    {
        $validated = $request->validate([
            'noOd' => ['required', 'string', 'max:6'],
        ]);
        $db = DB::connection('Connworkshop');
        try {
            $request = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] ?', [
                $validated['noOd']
            ]))->first();
            return response()->json([
                'ada'   => (int)($request->Ada ?? $request->ada ?? 0),
                'TglS'  => $request->TglS ?? '',
                'TglF'  => $request->TglF ?? '',
                'serverDate' => Carbon::today()->toDateString(),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }

    }

    public function cekTanggal(Request $request)
    {
        return $this->cekEstimasi($request);
    }

    // SP_5298_PJW_CEK-ESTDATE-KONSTRUKSI
    public function cekEstDate(Request $request)
    {
        $validated = $request->validate([
            'estDate' => ['required', 'date'],
            'worksts' => ['required', 'integer'],
        ]);
        $db = DB::connection('Connworkshop');
        try {
            $request = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-ESTDATE-KONSTRUKSI] @estDate=?, @worksts=?', [
                $validated['estDate'],
                $validated['worksts']
            ]))->first();
            return response()->json(['ada' => (int)($request->Ada ?? $request->ada ?? 0)]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_GET-JAM-KERJA-KONSTRUKSI
    public function getJamKerja(Request $request)
    {
        $validated = $request->validate([
            'worksts' => ['required', 'integer'],
            'estDate' => ['required', 'date'],
        ]);
        $db = DB::connection('Connworkshop');
        try {
            $request = collect($db->select('EXEC [dbo].[SP_5298_PJW_GET-JAM-KERJA-KONSTRUKSI] ?, ?', [
                $validated['worksts'],
                $validated['estDate']
            ]))->first();
            return response()->json([
                'ada'        => $request ? 1 : 0,
                'JmlJamKerja' => (int)($request->JmlJamKerja ?? 0),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI
    public function hitungSisaJam(Request $request)
    {
        $validated = $request->validate([
            'estDate' => ['required', 'date'],
            'worksts' => ['required', 'integer'],
        ]);
        $db = DB::connection('Connworkshop');
        try {
            $request = collect($db->select('EXEC [dbo].[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI] ?, ?', [
                $validated['estDate'],
                $validated['worksts']
            ]))->first();
            return response()->json([
                'SisaJamKrj'         => (int)($request->SisaJamKrj ?? 0),
                'SisaMenitKrj'       => (int)($request->SisaMenitKrj ?? 0),
                'SisaMenitKrj_bantu' => (int)($request->SisaMenitKrj_bantu ?? 0),
                'TotalMenitKrj'      => (int)($request->TotalMenitKrj ?? 0),
                'TotalMenitPk'       => (int)($request->TotalMenitPk ?? 0),
                'JamKrj'             => (int)($request->JamKrj ?? 0),
                'JamPk'              => (int)($request->JamPk ?? 0),
                'MenitPk'            => (int)($request->MenitPk ?? 0),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_CEK-PROSES-KONSTRUKSI
    public function cekProses(Request $request)
    {
        $validated = $request->validate([
            'idBag'   => ['required', 'integer'],
            'estDate' => ['required', 'date'],
            'worksts' => ['required', 'integer'],
        ]);
        $db = DB::connection('Connworkshop');
        try {
            $request = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-PROSES-KONSTRUKSI] ?, ?, ?', [
                $validated['idBag'],
                $validated['estDate'],
                $validated['worksts']
            ]))->first();
            return response()->json(['ada' => (int)($request->Ada ?? $request->ada ?? 0)]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_INSERT-NEWQUE-KONSTRUKSI (kode pilih_que = 1)
    public function insertNewQue(Request $request)
    {
        $validate = $request->validate([
            'estDate'  => ['required', 'date'],
            'estHour'  => ['required', 'integer', 'min:0', 'max:23'],
            'estMinute' => ['required', 'integer', 'min:0', 'max:59'],
            'worksts'  => ['required', 'integer'],
            'jamKrj'   => ['required', 'integer', 'min:1'],
            'status'   => ['required', 'integer', 'in:0,1'],
            'idBag'    => ['required', 'integer'],
            'hari'     => ['required', 'integer', 'min:0'],
        ]);
        if (($validate['jamKrj'] * 60) < (($validate['estHour'] * 60) + $validate['estMinute'])) {
            return response()->json([
                'error' => 'Jam kerja optimal tidak boleh lebih kecil dari estimasi waktu.',
            ], 422);
        }
        // $user = auth()->user()->username ?? 'admin';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');
        try {
            $db->statement ('EXEC [dbo].[SP_5298_PJW_INSERT-NEWQUE-KONSTRUKSI] ?, ?, ?, ?, ?, ?, ?, ?, ?', [
                $validate['estDate'],
                $validate['estHour'],
                $validate['estMinute'],
                $validate['worksts'],
                $validate['jamKrj'],
                $validate['status'],
                $user,
                $validate['idBag'],
                $validate['hari']
            ]);
            return response()->json(['success' => true, 'message' => 'Data tersimpan.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_NOANTRI-KONSTRUKSI-NOFINISH (kode=3) + SP_5298_PJW_JADWAL-KONSTRUKSI (kode=1)
    public function getListKons(Request $request)
    {
        $validate = $request->validate([
            'worksts' => ['required', 'integer'],
            'tanggal' => ['required', 'date'],
        ]);
        $db = DB::connection('Connworkshop');
        try {
            $noAntriRows = $db->select('EXEC [dbo].[SP_5298_PJW_NOANTRI-KONSTRUKSI-NOFINISH] ?, ?, ?', [
                3,
                $validate['worksts'],
                $validate['tanggal']
            ]);

            $requestesult = [];
            foreach ($noAntriRows as $na) {
                $noAntri = trim($na->NoAntrian ?? '');
                $j = collect($db->select('EXEC [dbo].[SP_5298_PJW_JADWAL-KONSTRUKSI] ?, ?, ?, ?', [
                    1,
                    $noAntri,
                    $validate['tanggal'],
                    $validate['worksts']
                ]))->first();
                if (!$j) continue;

                $requestesult[] = [
                    'NoAntrian'     => $noAntri,
                    'NoOrder'       => trim($j->NoOrder ?? ''),
                    'NamaDivisi'    => trim($j->NamaDivisi ?? ''),
                    'NamaBarang'    => trim($j->Nama_Brg ?? ''),
                    'NamaBagian'    => trim($j->NamaBagian ?? ''),
                    'IdBagian'      => (int)($j->IdBagian ?? 0),
                    'EstTime'       => trim(($j->EstTimeHour ?? 0) . ' Jam ' . ($j->EstTimeMinute ?? 0) . ' Menit'),
                    'HariKe'        => trim($j->HariKe ?? ''),
                    'Status'        => (int)($j->Status ?? 0),
                    'Cancel'        => (int)($j->Cancel ?? 0),
                    'Finish'        => trim($j->Finish ?? ''),
                ];
            }

            // Info sisa jam
            $sisa = collect($db->select('EXEC [dbo].[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI] ?, ?', [
                $validate['tanggal'],
                $validate['worksts']
            ]))->first();

            return response()->json([
                'data'    => $requestesult,
                'sisaJam' => (int)($sisa->SisaJamKrj ?? 0),
                'sisaMenit' => (int)($sisa->SisaMenitKrj ?? 0),
                'pakaiJam'  => (int)($sisa->JamPk ?? 0),
                'pakaiMenit' => (int)($sisa->MenitPk ?? 0),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_INSERT-APPQUE-KONSTRUKSI (insert di posisi antrian)
    public function insertAppQue(Request $request)
    {
        $validate = $request->validate([
            'noAntri'  => ['required', 'string'],
            'estDate'  => ['required', 'date'],
            'estHour'  => ['required', 'integer', 'min:0', 'max:23'],
            'estMinute' => ['required', 'integer', 'min:0', 'max:59'],
            'worksts'  => ['required', 'integer'],
            'status'   => ['required', 'integer', 'in:0,1'],
            'idBag'    => ['required', 'integer'],
            'hari'     => ['required', 'integer', 'min:0'],
        ]);
        // $user = auth()->user()->username ?? 'admin';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');
        try {
            $db->select('EXEC [dbo].[SP_5298_PJW_INSERT-APPQUE-KONSTRUKSI] ?, ?, ?, ?, ?, ?, ?, ?, ?', [
                $validate['noAntri'],
                $validate['estDate'],
                $validate['estHour'],
                $validate['estMinute'],
                $validate['worksts'],
                $validate['status'],
                $user,
                $validate['idBag'],
                $validate['hari']
            ]);
            return response()->json(['success' => true, 'message' => 'Data tersimpan.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
