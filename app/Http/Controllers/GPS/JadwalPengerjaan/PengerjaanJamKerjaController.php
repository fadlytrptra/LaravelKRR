<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PengerjaanJamKerjaController extends Controller
{

    // Mapping mesin ID → suffix SP
    private function getMesinSuffix($noMesin)
    {
        $map = [
            1  => 'TURNING',
            2  => 'DRILL',
            4  => 'GRINDING',
            6  => 'LAS',
            8  => 'PUNCH',
            10 => 'EDM',
            15 => 'FINISHING',
            16 => 'MAKLOON',
            17 => 'MEKATRONIK',
        ];
        return $map[$noMesin] ?? null;
    }

    private function getMesinPrefix($noMesin)
    {
        return ($noMesin == 17) ? 'SP_5409_PJW' : 'SP_5298_PJW';
    }

    public function index(Request $request)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');

        // Ambil parameter dari query string
        $tanggal    = $request->query('tanggal', date('Y-m-d'));
        $noMesin    = $request->query('noMesin', '');
        $namaMesin  = $request->query('namaMesin', '');
        $noType     = $request->query('noType', '');
        $namaType   = $request->query('namaType', '');

        return view('GPS.JadwalPengerjaan.pengerjaanJamKerja', compact(
            'access', 'tanggal', 'noMesin', 'namaMesin', 'noType', 'namaType'
        ));
    }


    // Lookup mesin (SP_5298_PJW_LIST-TYPE-MESIN kode=1)
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
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Lookup type mesin (SP_5298_PJW_LIST-TYPE-MESIN kode=2, noMesin)
    public function getTypeList(Request $request)
    {
        $validated = $request->validate([
            'noMesin' => ['required', 'integer'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-TYPE-MESIN] ?, ?', [2, $validated['noMesin']]);
            return response()->json(array_map(function ($item) {
                return [
                    'NoType'   => $item->NoType ?? '',
                    'NamaType' => $item->NamaType ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Ambil jam kerja optimal (SP_5298_PJW_GET-MIN-ANTRIAN + SP_5298_PJW_GET-JAM-KERJA)
    public function getJamKerja(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => ['required', 'date_format:Y-m-d'],
            'noMesin' => ['required', 'integer'],
            'noType'  => ['required', 'integer'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            // 1. Ambil min antrian
            $min = collect($db->select('EXEC [dbo].[SP_5298_PJW_GET-MIN-ANTRIAN] @EstDate=?, @mesin=?, @noType=?', [
                $validated['tanggal'], $validated['noMesin'], $validated['noType']
            ]))->first();

            $nomer = $min->min_antrian ?? '-';
            if ($nomer === '-' || $nomer === null || $nomer === '') {
                return response()->json(['found' => false, 'nomer' => null]);
            }

            // 2. Ambil jam kerja
            $jk = collect($db->select('EXEC [dbo].[SP_5298_PJW_GET-JAM-KERJA] @nomer=?, @mesin=?, @noType=?, @EstDate=?', [
                $nomer, $validated['noMesin'], $validated['noType'], $validated['tanggal']
            ]))->first();

            return response()->json([
                'found' => true,
                'nomer' => $nomer,
                'jmlJamKerja' => (int)($jk->JmlJamKerja ?? 0),
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Hitung sisa jam (SP_5298_PJW_HITUNG-SISA-JAM-KRJ-{SUFFIX})
    public function hitungSisa(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => ['required', 'date_format:Y-m-d'],
            'noMesin' => ['required', 'integer'],
            'noType'  => ['required', 'integer'],
        ]);

        $suffix = $this->getMesinSuffix($validated['noMesin']);
        if (!$suffix) {
            return response()->json(['error' => 'Mesin tidak dikenali.'], 400);
        }
        $prefix = $this->getMesinPrefix($validated['noMesin']);

        $db = DB::connection('Connworkshop');
        try {
            $sp = "EXEC [dbo].[{$prefix}_HITUNG-SISA-JAM-KRJ-{$suffix}] ?, ?";
            $row = collect($db->select($sp, [$validated['tanggal'], $validated['noType']]))->first();

            if ($row) {
                return response()->json([
                    'TotalMenitKrj' => (int)($row->TotalMenitKrj ?? 0),
                    'TotalMenitPk'  => (int)($row->TotalMenitPk ?? 0),
                    'SisaJamKrj'    => (int)($row->SisaJamKrj ?? 0),
                    'SisaMenitKrj'  => (int)($row->SisaMenitKrj ?? 0),
                ]);
            }
            return response()->json([
                'TotalMenitKrj' => 0,
                'TotalMenitPk'  => 0,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Proses update jam kerja optimal (SP_5298_PJW_EDIT-JAM-KERJA)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => ['required', 'date_format:Y-m-d'],
            'noMesin' => ['required', 'integer'],
            'noType'  => ['required', 'integer'],
            'nomer'   => ['required', 'string'],
            'jmlJam'  => ['required', 'integer', 'min:1'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $db->beginTransaction();

            $db->statement('EXEC [dbo].[SP_5298_PJW_EDIT-JAM-KERJA] ?, ?, ?, ?, ?', [
                $validated['nomer'],
                $validated['noType'],
                $validated['noMesin'],
                $validated['jmlJam'],
                $validated['tanggal'],
            ]);

            $db->commit();
            return response()->json(['message' => 'Data Sudah diSimpan.']);

        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
