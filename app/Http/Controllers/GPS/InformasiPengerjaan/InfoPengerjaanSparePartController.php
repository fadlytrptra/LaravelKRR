<?php

namespace App\Http\Controllers\GPS\InformasiPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InfoPengerjaanSparePartController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.InformasiPengerjaan.infoPengerjaanSparePart', compact('access'));
    }

    // SP_5298_PJW_LIST-ORDER-KERJA (H) / SP_5298_PJW_LIST-ORDER-PROYEK (P) kode=2
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

            $order = collect($db->select($sp, [2, $validated['noOd']]))->first();
            if (!$order) {
                $label = $validated['jenisOd'] === 'H' ? 'Order Kerja' : 'Order Proyek';
                return response()->json([
                    'error' => "Nomer $label {$validated['noOd']} tidak ada, belum di-ACC, atau ditolak."
                ], 404);
            }

            return response()->json([
                'TDivisi'    => $order->NamaDivisi ?? '',
                'TKdBrg'     => $order->Kd_Brg ?? '',
                'TNamaBrg'   => $validated['jenisOd'] === 'H'
                                    ? ($order->Nama_Brg ?? '')
                                    : ($order->Nama_Proyek ?? ''),
                'TNoGbr'     => $order->No_Gbr ?? '',
                'TJml'       => trim(($order->Jml_Brg ?? '0') . ' ' . ($order->Satuan ?? '')),
                'OdSts'      => $order->OdSts ?? '',
                'TKetOrder'  => $order->Ket_Order ?? '',
                'TMesin'     => $order->Mesin ?? '',
                'TUserOrder' => $order->UserOrder ?? ($order->Pengorder ?? ''),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_LIST-BAGIAN-BARANG (@noOd, @jenisOd)
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

    // SP_5298_PJW_LIST-SPART-BAGIAN kode=6 (@noOrder, @noBagian, @jenisOrder)
    public function getSpartList(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'idBag'   => ['required', 'integer'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $rows = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-SPART-BAGIAN] @kode=?, @noOrder=?, @noBagian=?, @jenisOrder=?', [
                6,
                $validated['noOd'],
                $validated['idBag'],
                $validated['jenisOd'],
            ]);

            $result = [];
            $totalBaru  = 0;
            $totalStock = 0;

            foreach ($rows as $r) {
                $kdBrg      = trim($r->KdBrg ?? '');
                $nmBrg      = trim($r->NM_BRG ?? '');
                $subKat     = trim($r->nama_sub_kategori ?? '');
                $jml        = (float)($r->Jml ?? 0);
                $satuan     = trim($r->Satuan ?? '');
                $hargaBaru  = (float)($r->HargaBaru ?? 0);
                $hargaTotalB= (float)($r->HargaTotalB ?? 0);
                $hargaStok  = (float)($r->HargaStok ?? 0);
                $hargaTotalS= (float)($r->HargaTotalS ?? 0);
                $status     = (int)($r->Status ?? 0);

                $totalBaru  += $hargaTotalB;
                $totalStock += $hargaTotalS;

                $result[] = [
                    'KdBrg'        => $kdBrg,
                    'NmBrg'        => $nmBrg,
                    'SubKategori'  => $subKat,
                    'Jumlah'       => number_format($jml, 2, '.', ','),
                    'Satuan'       => $satuan,
                    'HargaBaru'    => number_format($hargaBaru, 2, '.', ','),
                    'TotalHargaB'  => number_format($hargaTotalB, 2, '.', ','),
                    'HargaStok'    => number_format($hargaStok, 2, '.', ','),
                    'TotalHargaS'  => number_format($hargaTotalS, 2, '.', ','),
                    'Status'       => $status, // 0 = stock (biru), selain itu baru (hitam)
                ];
            }

            return response()->json([
                'data'         => $result,
                'totalBaru'    => number_format($totalBaru, 2, '.', ','),
                'totalStock'   => number_format($totalStock, 2, '.', ','),
                'totalSemua'   => number_format($totalBaru + $totalStock, 2, '.', ','),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
