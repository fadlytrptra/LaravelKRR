<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PengerjaanMaterialTypeController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.JadwalPengerjaan.pengerjaanMaterialType', compact('access'));
    }

    // Lookup material (SP_5298_PJW_LIST-MATERIAL)
    public function getMaterialList()
    {
        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL]');
            return response()->json(array_map(function ($item) {
                // SP kemungkinan mengembalikan kolom: NoMaterial (Id) dan NamaMaterial / MaterialType
                return [
                    'IdMaterial'   => $item->NoMaterial ?? ($item->NoMtr ?? ($item->IdMaterial ?? '')),
                    'NamaMaterial' => $item->NamaMaterial ?? ($item->MtrType ?? ($item->Type ?? '')),
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Memanggil SP_5298_PJW_MAINT-MASTER-MATERIAL.
    public function store(Request $request)
    {
        $validated = $request->validate([
            'proses'    => ['required', 'integer', 'in:1,2,3'],
            'material'  => ['required', 'string', 'max:100'],
            'noMat'     => ['nullable', 'integer'],
        ]);

        $proses   = (int) $validated['proses'];
        $material = trim($validated['material']);
        $noMat    = $validated['noMat'] ?? null;

        $db = DB::connection('Connworkshop');

        try {

            if ($proses == 1 || $proses == 2) {
                // Cek duplikat material (SP_5298_PJW_CEK-MATERIAL)
                $cek = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-MATERIAL] ?', [$material]))->first();
                if ($cek && $cek->ada > 0) {
                    $db->rollBack();
                    return response()->json(['error' => 'Material type yang akan diinputkan, sudah ada. Tlg dicek datanya.'], 400);
                }
            }

            if ($proses == 3) {
                if (!$noMat) {
                    $db->rollBack();
                    return response()->json(['error' => 'ID Material tidak ditemukan.'], 400);
                }
                // Cek transaksi material (SP_5298_PJW_CEK-TRANSAKSI-MATERIAL)
                $cekTrx = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-TRANSAKSI-MATERIAL] ?', [$noMat]))->first();
                if ($cekTrx && $cekTrx->ada > 0) {
                    $db->rollBack();
                    return response()->json(['error' => 'Material type tidak bisa dihapus, karena sudah bertransaksi.'], 400);
                }
            }

            // --- Eksekusi SP_5298_PJW_MAINT-MASTER-MATERIAL ---
            if ($proses == 1) {
                // Isi: @kode=1, @material
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-MASTER-MATERIAL] @kode=?, @material=?', [
                    1,
                    $material,
                ]);
            } elseif ($proses == 2) {
                // Koreksi: @kode=2, @noMtr, @material
                if (!$noMat) {
                    $db->rollBack();
                    return response()->json(['error' => 'ID Material tidak ditemukan.'], 400);
                }
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-MASTER-MATERIAL] ?, ?, ?', [
                    2,
                    $noMat,
                    $material,
                ]);
            } elseif ($proses == 3) {
                // Hapus: @kode=3, @noMtr
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-MASTER-MATERIAL] ?, ?', [
                    3,
                    $noMat,
                ]);
            }

            $db->commit();

            $msgAction = $proses == 1 ? 'Tersimpan' : ($proses == 2 ? 'Terkoreksi' : 'Terhapus');
            return response()->json(['message' => "Data $msgAction."]);
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
