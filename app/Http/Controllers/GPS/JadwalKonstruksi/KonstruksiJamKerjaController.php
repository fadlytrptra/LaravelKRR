<?php

namespace App\Http\Controllers\GPS\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KonstruksiJamKerjaController extends Controller
{
    public function index(Request $request)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');

        $tanggal = $request->query('tanggal', date('Y-m-d'));
        $worksts = $request->query('worksts', '');
        $workstsName = $request->query('workstsName', '');

        return view('GPS.JadwalKonstruksi.konstruksiJamKerja', compact(
            'access',
            'tanggal',
            'worksts',
            'workstsName'
        ));
    }

    // Lookup work station (SP_5298_PJW_LIST-WORKSTATION)

    public function getWorkstationList()
    {
        $db = DB::connection('Connworkshop');

        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-WORKSTATION]');

            $result = array_map(function ($item) {
                return [
                    'NoWrkSts'   => $item->NoWrkSts ?? '',
                    'NamaWorkStation' => $item->NamaWorkStation ?? '',
                ];
            }, $list);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Ambil jam kerja optimal (SP_5298_PJW_GET-JAM-KERJA-KONSTRUKSI)

    public function getJamKerja(Request $request)
    {
        $validated = $request->validate([
            'worksts' => ['required', 'integer'],
            'estDate' => ['required', 'date_format:Y-m-d'],
        ]);

        $db = DB::connection('Connworkshop');

        try {
            $result = collect($db->select('EXEC [dbo].[SP_5298_PJW_GET-JAM-KERJA-KONSTRUKSI] @worksts = ?, @estDate = ?', [
                $validated['worksts'],
                $validated['estDate']
            ]))->first();

            if ($result && isset($result->JmlJamKerja)) {
                return response()->json(['jmlJamKerja' => (int) $result->JmlJamKerja, 'found' => true]);
            } else {
                return response()->json(['jmlJamKerja' => 0, 'found' => false]);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Hitung sisa jam (SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI)
    // Digunakan untuk validasi saat user menekan Enter di TJam

    public function hitungSisa(Request $request)
    {
        $validated = $request->validate([
            'worksts' => ['required', 'integer'],
            'estDate' => ['required', 'date_format:Y-m-d'],
        ]);

        $db = DB::connection('Connworkshop');

        try {
            $result = collect($db->select('EXEC [dbo].[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI] @EstDate = ?, @worksts = ?', [
                $validated['estDate'],
                $validated['worksts']
            ]))->first();

            if ($result) {
                return response()->json([
                    'TotalMenitKrj' => (int) ($result->TotalMenitKrj ?? 0),
                    'TotalMenitPk'  => (int) ($result->TotalMenitPk ?? 0),
                    'SisaJamKrj'    => (int) ($result->SisaJamKrj ?? 0),
                    'SisaMenitKrj'  => (int) ($result->SisaMenitKrj ?? 0),
                ]);
            } else {
                return response()->json(['TotalMenitKrj' => 0, 'TotalMenitPk'  => 0]);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Proses update jam kerja optimal (SP_5298_PJW_EDIT-JAM-KERJA-KONSTRUKSI)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'worksts'   => ['required', 'integer'],
            'estDate'   => ['required', 'date_format:Y-m-d'],
            'jmlJam'    => ['required', 'integer', 'min:1'],
            'requiredMinutes' => ['nullable', 'integer', 'min:0'],
        ]);

        $db = DB::connection('Connworkshop');

        try {
            $usage = collect($db->select('EXEC [dbo].[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI] @EstDate = ?, @worksts = ?', [
                $validated['estDate'],
                $validated['worksts'],
            ]))->first();
            $totalMenitPk = (int)($usage->TotalMenitPk ?? 0);
            $requiredMinutes = (int)($validated['requiredMinutes'] ?? 0);

            if (($validated['jmlJam'] * 60) < ($totalMenitPk + $requiredMinutes)) {
                return response()->json([
                    'error' => 'Jml jam kerja harus mencukupi jadwal yang sudah terpakai dan estimasi yang akan dipindahkan.',
                ], 422);
            }

            $db->statement('EXEC [dbo].[SP_5298_PJW_EDIT-JAM-KERJA-KONSTRUKSI] @worksts = ?, @jmljam = ?, @EstDate = ?', [
                $validated['worksts'],
                $validated['jmlJam'],
                $validated['estDate'],
            ]);

            return response()->json(['message' => 'Data jam kerja optimal berhasil diupdate.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
