<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PengerjaanMakloonController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.JadwalPengerjaan.PengerjaanMakloon', compact('access'));
    }

    // Load order kerja / proyek (SP_5298_PJW_LIST-ORDER-KERJA / SP_5298_PJW_LIST-ORDER-PROYEK)
    public function getOrder(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $sp = $validated['jenisOd'] === 'H'
                ? 'EXEC [dbo].[SP_5298_PJW_LIST-ORDER-KERJA] ?, ?'
                : 'EXEC [dbo].[SP_5298_PJW_LIST-ORDER-PROYEK] ?, ?';

            $order = collect($db->select($sp, [1, $validated['noOd']]))->first();
            if (!$order) {
                $label = $validated['jenisOd'] === 'H' ? 'Order Kerja' : 'Order Proyek';
                return response()->json(['error' => "Nomer $label {$validated['noOd']} tidak ada, belum di-ACC, atau ditolak."], 404);
            }

            return response()->json([
                'TDivisi'    => $order->NamaDivisi ?? '',
                'TKdBrg'     => $order->Kd_Brg ?? '',
                'TNamaBrg'   => $validated['jenisOd'] === 'H' ? ($order->Nama_Brg ?? '') : ($order->Nama_Proyek ?? ''),
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


    // Lookup bagian barang (SP_5298_PJW_LIST-BAGIAN-BARANG)

    public function getBagianList(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-BARANG] ?, ?', [
                $validated['noOd'], $validated['jenisOd']
            ]);
            return response()->json(array_map(function ($item) {
                return [
                    'IdBagian'   => $item->NoBagian ?? ($item->IdBagian ?? ''),
                    'NamaBagian' => $item->NamaBagian ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Load data proses makloon per order & bagian
    // SP_5298_PJW_INF-JADWAL-PER-ORDER-1 kode=6 (@jenis, @noOd, @noBagian)

    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'idBag'   => ['required', 'integer'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $db = DB::connection('Connworkshop');

        try {
            // Note: parameter 2 adalah @jenis (Char H/P), bukan @jenisOd
            $rows = $db->select(
                'EXEC [dbo].[SP_5298_PJW_INF-JADWAL-PER-ORDER-1] @kode=?, @jenis=?, @noOd=?, @noBagian=?',
                [6, $validated['jenisOd'], $validated['noOd'], $validated['idBag']]
            );

            $result = [];
            foreach ($rows as $row) {
                // Format harga dengan format ribuan Indonesia
                $jml        = $row->Jml ?? null;
                $harga      = $row->Harga ?? null;
                $hargaTotal = $row->HargaTotal ?? null;
                $keterangan = $row->Keterangan ?? '';

                $fmt = function ($val) {
                    if ($val === null || $val === '') return '';
                    return number_format((float)$val, 2, '.', ',');
                };

                $result[] = [
                    'NamaType'   => $row->NamaType ?? '',
                    'NoType'     => (int)($row->NoType ?? 0),
                    'JmlBrg'     => $jml !== null ? $jml : '',
                    'Harga'      => $fmt($harga),
                    'HargaRaw'   => $harga !== null ? (float)$harga : 0,
                    'HargaTotal' => $fmt($hargaTotal),
                    'HargaTotalRaw' => $hargaTotal !== null ? (float)$hargaTotal : 0,
                    'Keterangan' => $keterangan ?? '',
                    // Untuk cek di frontend: baris dianggap "kosong" jika keterangan kosong
                    'isEmpty'    => ($keterangan === '' || $keterangan === null),
                ];
            }

            return response()->json($result);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Proses simpan biaya makloon (SP_5298_PJW_HARGA-MAKLOON)

    public function store(Request $request)
    {
        $validated = $request->validate([
            'noOd'       => ['required', 'string', 'max:6'],
            'idBagian'   => ['required', 'integer'],
            'noType'     => ['required', 'integer'],
            'jmlBrg'     => ['required', 'numeric', 'min:0'],
            'harga'      => ['required', 'numeric', 'min:0'],
            'keterangan' => ['nullable', 'string', 'max:255'],
            'hargaU'     => ['nullable', 'numeric'],
        ]);

        // $user = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db   = DB::connection('Connworkshop');

        try {
            $db->beginTransaction();

            $hargaT = (float)$validated['jmlBrg'] * (float)$validated['harga'];
            $hargaU = (float)($validated['hargaU'] ?? 0);

            $db->statement('EXEC [dbo].[SP_5298_PJW_HARGA-MAKLOON] @noOrder=?, @idBagian=?, @noType=?, @jmlBrg=?, @harga=?, @keterangan=?, @hargaT=?, @hargaU=?', [
                $validated['noOd'],           // @noOrder
                $validated['idBagian'],       // @idBagian
                $validated['noType'],         // @noType
                (int)$validated['jmlBrg'],    // @jmlBrg
                (float)$validated['harga'],   // @harga
                $validated['keterangan'] ?? '',     // @keterangan
                $hargaT,                      // @hargaT (Jml × Harga)
                $hargaU,                      // @hargaU (harga total lama)
            ]);

            $db->commit();
            return response()->json(['message' => 'Data terProses.']);

        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
