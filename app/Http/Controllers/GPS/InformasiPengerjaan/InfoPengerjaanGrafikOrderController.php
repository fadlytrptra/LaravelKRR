<?php

namespace App\Http\Controllers\GPS\InformasiPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InfoPengerjaanGrafikOrderController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        $bulan = (int)Carbon::now()->format('m');
        $tahun = (int)Carbon::now()->format('Y');
        return view(
            'GPS.InformasiPengerjaan.infoPengerjaanGrafikOrder',
            compact('access', 'bulan', 'tahun')
        );
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
                ? 'EXEC [dbo].[SP_5298_PJW_LIST-ORDER-KERJA] @kode=?, @noOd=?'
                : 'EXEC [dbo].[SP_5298_PJW_LIST-ORDER-PROYEK] @kode=?, @noOd=?';

            $order = collect($db->select($sp, [2, $validated['noOd']]))->first();
            if (!$order) {
                $label = $validated['jenisOd'] === 'H' ? 'Order Kerja' : 'Order Proyek';
                return response()->json(['error' => "Nomer $label {$validated['noOd']} tidak ada atau belum di-ACC."], 404);
            }

            return response()->json([
                'TDivisi'    => $order->NamaDivisi ?? '',
                'TKdBrg'     => $order->Kd_Brg ?? '',
                'TNamaBrg'   => $validated['jenisOd'] === 'H' ? ($order->Nama_Brg ?? '') : ($order->Nama_Proyek ?? ''),
                'TNoGbr'     => $order->No_Gbr ?? '',
                'TJml'       => trim(($order->Jml_Brg ?? '0') . ' ' . ($order->Satuan ?? '')),
                'TMulai'     => $order->Tgl_Start ?? '',
                'TSelesai'   => $order->Tgl_Finish ?? '',
                'TKetOrder'  => $order->Ket_Order ?? '',
                'TMesin'     => $order->Mesin ?? '',
                'TUserOrder' => $order->Pengorder ?? ($order->UserOrder ?? ''),
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
                $validated['noOd'],
                $validated['jenisOd']
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

    // SP_5298_PJW_INF-JADWAL-PER-ORDER kode=2 (H) / 3 (P)
    // Return array hari (day) yang punya jadwal pada rentang tanggal.
    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'idBag'   => ['required', 'integer'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
            'bulan'   => ['required', 'integer', 'min:1', 'max:12'],
            'tahun'   => ['required', 'integer', 'min:2000', 'max:2100'],
        ]);

        $kode = $validated['jenisOd'] === 'H' ? 2 : 3;
        $daysInMonth = Carbon::create($validated['tahun'], $validated['bulan'], 1)->daysInMonth;
        $date1 = sprintf('%04d-%02d-01', $validated['tahun'], $validated['bulan']);
        $date2 = sprintf('%04d-%02d-%02d', $validated['tahun'], $validated['bulan'], $daysInMonth);

        $db = DB::connection('Connworkshop');
        try {
            $rows = $db->select('EXEC [dbo].[SP_5298_PJW_INF-JADWAL-PER-ORDER] @kode=?, @noOd=?, @idBag=?, @date1=?, @date2=?', [
                $kode,
                $validated['noOd'],
                $validated['idBag'],
                $date1,
                $date2
            ]);

            $daySet = [];
            foreach ($rows as $row) {
                if (!empty($row->EstDate)) {
                    $day = (int) Carbon::parse($row->EstDate)->format('j');
                    $daySet[$day] = true;
                }
            }

            $days = [];
            for ($d = 1; $d <= $daysInMonth; $d++) {
                $days[] = [
                    'day'   => $d,
                    'hasJd' => isset($daySet[$d]),
                ];
            }

            return response()->json([
                'daysInMonth' => $daysInMonth,
                'days'        => $days,
                'totalJadwal' => count($daySet),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
