<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PengerjaanDeleteOrderController extends Controller
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

    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.JadwalPengerjaan.PengerjaanDeleteOrder', compact('access'));
    }


    // Load order kerja / proyek

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
                $label = $validated['jenisOd'] === 'H' ? 'Order Harian' : 'Order Proyek';
                return response()->json(['error' => "Nomer $label {$validated['noOd']} tidak ada, belum di-ACC, ditolak, atau sudah finish."], 404);
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


    // Load jadwal per order & bagian (SP_5298_PJW_INF-JADWAL-PER-ORDER-1 kode=4/5)

    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'idBag'   => ['required', 'integer'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $kode = ($validated['jenisOd'] === 'H') ? 4 : 5;
        $db = DB::connection('Connworkshop');

        try {
            $rows = $db->select('EXEC [dbo].[SP_5298_PJW_INF-JADWAL-PER-ORDER-1] ?, ?, ?', [
                $kode, $validated['noOd'], $validated['idBag']
            ]);

            $result = [];
            foreach ($rows as $row) {
                // Filter Cancel = 1 (skip)
                if (isset($row->Cancel) && $row->Cancel == 1) continue;

                // Format Jml Dikerjakan
                $jmlDikerjakan = '';
                if (isset($row->HariKe) && $row->HariKe > 0) {
                    $jmlDikerjakan = trim(($row->JmlBrg ?? '0') . ' . ' . $row->HariKe);
                } else {
                    $jmlDikerjakan = trim($row->JmlBrg ?? '0');
                }

                // Warna: Emergency (Status=1) atau Ditolak (Tgl_Tolak_Mng)
                $status = 'default';
                if (isset($row->Status) && $row->Status == 1) {
                    $status = 'emergency';
                } elseif (!empty($row->Tgl_Tolak_Mng)) {
                    $status = 'tolak-mng';
                }

                $result[] = [
                    'NoAntrian'     => $row->NoAntrian ?? '',
                    'EstDate'       => !empty($row->EstDate) ? Carbon::parse($row->EstDate)->format('Y-m-d') : '',
                    'NamaMesin'     => $row->NamaMesin ?? '',
                    'NamaType'      => $row->NamaType ?? '',
                    'EstTime'       => ($row->EstTimeHour ?? 0) . ' jam ' . ($row->EstTimeMinute ?? 0) . ' menit',
                    'NoMesin'       => (int)($row->NoMesin ?? 0),
                    'NoType'        => (int)($row->NoType ?? 0),
                    'NamaBagian'    => $row->NamaBagian ?? '',
                    'JmlDikerjakan' => $jmlDikerjakan,
                    'IdBagian'      => (int)($row->IdBagian ?? 0),
                    'Status'        => (int)($row->Status ?? 0),
                    'Tgl_Tolak_Mng' => $row->Tgl_Tolak_Mng ?? null,
                    'statusWarna'   => $status,
                ];
            }

            return response()->json($result);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Proses delete jadwal (SP_5298_PJW_DELETE-JADWAL-{MESIN}-NEW)

    public function store(Request $request)
    {
        $validated = $request->validate([
            'noOd'       => ['required', 'string', 'max:6'],
            'keterangan' => ['required', 'string', 'max:255'],
            'items'      => ['required', 'array', 'min:1'],
            'items.*.noAntrian' => ['required', 'string'],
            'items.*.estDate'   => ['required', 'date_format:Y-m-d'],
            'items.*.idBagian'  => ['required', 'integer'],
            'items.*.noMesin'   => ['required', 'integer'],
            'items.*.noType'    => ['required', 'integer'],
        ]);

        $noOd = $validated['noOd'];
        // $user = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');

        try {
            $db->beginTransaction();
            $count = 0;

            foreach ($validated['items'] as $item) {
                $suffix = $this->getMesinSuffix($item['noMesin']);
                if (!$suffix) continue; // skip unknown mesin
                $prefix = $this->getMesinPrefix($item['noMesin']);

                $sp = "EXEC [dbo].[{$prefix}_DELETE-JADWAL-{$suffix}-NEW] ?, ?, ?, ?, ?, ?, ?";
                $db->statement($sp, [
                    $item['noAntrian'],           // @noAntri
                    $noOd,                         // @noOrder
                    $item['estDate'],              // @tgl
                    $item['idBagian'],             // @idBag
                    $item['noType'],               // @noType
                    $user,                         // @user
                    'DiDelete. ' . $validated['keterangan'], // @keterangan
                ]);
                $count++;
            }

            $db->commit();
            return response()->json([
                'message' => 'Jadwal terHapus.',
                'count' => $count,
            ]);

        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
