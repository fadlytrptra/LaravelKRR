<?php

namespace App\Http\Controllers\GPS\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KonstruksiBagianGambarController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');

        return view('GPS.JadwalKonstruksi.konstruksiBagianGambar', compact('access'));
    }

    // Load data order gambar (SP_5298_PJW_LIST-ORDER-GAMBAR)
    public function getOrder(Request $request)
    {
        $validated = $request->validate([
            'noOd' => ['required', 'string', 'max:6'],
            'proses' => ['nullable', 'integer', 'in:1,2,3'],
        ]);

        $noOd = $validated['noOd'];
        $proses = $validated['proses'] ?? null;
        $db = DB::connection('Connworkshop');

        try {
            $order = collect($db->select('EXEC [SP_5298_PJW_LIST-ORDER-GAMBAR] ?, ?', [1, $noOd]))->first();

            if (!$order) {
                return response()->json(['error' => "Nomer Order Gambar $noOd tidak ada, belum di-ACC, ditolak, atau sudah finish."], 404);
            }

            $response = [
                'TDivisi'    => $order->NamaDivisi ?? '',
                'TKdBrg'     => $order->Kd_Brg ?? '',
                'TNamaBrg'   => $order->Nama_Brg ?? '',
                'TNoGbr'     => $order->No_Gbr_Rev ?? '',
                'OdSts'      => $order->OdSts ?? '',
                'TKetOrder'  => $order->Ket_Order ?? '',
                'TMesin1'    => $order->Mesin ?? '',
                'TUserOrder' => $order->Pengorder ?? '',
                'TBagian'    => '',
                'TIdBagian'  => '',
            ];

            // 2. Cek estimasi konstruksi (SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI)
            $cekEst = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] ?', [$noOd]))->first();

            if (!$cekEst || $cekEst->ada == 0) {
                return response()->json([
                    'error' => "No. Order $noOd belum ada estimasi jadwalnya. Hubungi PPIC."
                ], 400);
            }

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


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

            $result = array_map(function ($item) {
                return [
                    'IdBagian' => $item->IdBagian ?? '',
                    'NamaBagian' => $item->NamaBagian ?? '',
                ];
            }, $list);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Proses utama (isi, koreksi, hapus) menggunakan SP_5298_PJW_MAINT-BAGIAN-GAMBAR
    public function store(Request $request)
    {
        $validated = $request->validate([
            'proses'    => ['required', 'integer', 'in:1,2,3'],
            'noOd'      => ['required', 'string', 'max:6'],
            'bagian'    => ['nullable', 'string', 'max:100'],
            'idBagian'  => ['nullable', 'integer'],
        ]);

        $proses = $validated['proses'];
        $noOd = $validated['noOd'];
        $bagian = trim($validated['bagian'] ?? '');
        $idBagian = $validated['idBagian'] ?? null;

        $db = DB::connection('Connworkshop');

        try {
            if ($proses == 1) {
                // Gunakan parameter bernama (@nama = ?)
                $cek = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-BAGIAN-GAMBAR] @noOd = ?, @bagian = ?', [$noOd, $bagian]))->first();
                if ($cek && $cek->ada > 0) {
                    return response()->json(['error' => "Nama Bagian yang akan diinputkan sudah ada. Tlg dicek datanya."], 400);
                }
            }

            if ($proses == 3) {
                if (!$idBagian) {
                    return response()->json(['error' => 'ID Bagian tidak ditemukan.'], 400);
                }
                $cekTrx = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-TRANSAKSI-BAGIAN-GAMBAR] @noOd = ?, @Idbag = ?', [$noOd, $idBagian]))->first();
                if ($cekTrx && $cekTrx->ada > 0) {
                    return response()->json(['error' => "Nama Bagian tidak bisa diHapus, karena sudah terjadwal."], 400);
                }
            }

            // Eksekusi SP dengan Named Parameters agar urutan di SQL Server tidak menjadi masalah
            if ($proses == 1) {
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-BAGIAN-GAMBAR] @kode = ?, @noOd = ?, @bagian = ?', [
                    1,
                    $noOd,
                    $bagian,
                ]);
            } else if ($proses == 2) {
                if (!$idBagian) {
                    return response()->json(['error' => 'ID Bagian tidak ditemukan.'], 400);
                }
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-BAGIAN-GAMBAR] @kode = ?, @IdBagian = ?, @bagian = ?', [
                    2,
                    $idBagian,
                    $bagian,
                ]);
            } else if ($proses == 3) {
                if (!$idBagian) {
                    return response()->json(['error' => 'ID Bagian tidak ditemukan.'], 400);
                }
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-BAGIAN-GAMBAR] @kode = ?, @IdBagian = ?', [
                    3,
                    $idBagian,
                ]);
            }

            $msgAction = $proses == 1 ? "DiSimpan" : ($proses == 2 ? "DiKoreksi" : "DiHapus");
            return response()->json(['message' => "Data Bagian telah $msgAction."]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
