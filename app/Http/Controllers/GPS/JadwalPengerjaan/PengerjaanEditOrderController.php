<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PengerjaanEditOrderController extends Controller
{

    // Mapping mesin ID → suffix SP (untuk UPDATE-POSISIKRJ)
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
        return view('GPS.JadwalPengerjaan.PengerjaanEditOrder', compact('access'));
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
                $label = $validated['jenisOd'] === 'H' ? 'Order Kerja' : 'Order Proyek';
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


    // Load jadwal per order & bagian (SP_5298_PJW_INF-JADWAL-PER-ORDER kode=7/8)
    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'idBag'   => ['required', 'integer'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $kode = ($validated['jenisOd'] === 'H') ? 7 : 8;
        $db = DB::connection('Connworkshop');

        try {
            $rows = $db->select('EXEC [dbo].[SP_5298_PJW_INF-JADWAL-PER-ORDER] @kode=?, @noOd=?, @idBag=?', [
                $kode, $validated['noOd'], $validated['idBag']
            ]);

            $result = [];
            foreach ($rows as $row) {
                $result[] = [
                    'nomerUrut'    => count($result) + 1,
                    'estDate'      => !empty($row->EstDate) ? Carbon::parse($row->EstDate)->format('Y-m-d') : '',
                    'namaMesin'    => $row->NamaMesin ?? '',
                    'namaType'     => $row->NamaType ?? '',
                    'namaBagian'   => $row->NamaBagian ?? '',
                    'estTime'      => ($row->EstTimeHour ?? 0) . ' jam ' . ($row->EstTimeMinute ?? 0) . ' menit',
                    'jmlDikerjakan'=> (isset($row->HariKe) && $row->HariKe > 0)
                                        ? trim(($row->JmlBrg ?? '0') . ' . ' . $row->HariKe)
                                        : trim($row->JmlBrg ?? '0'),
                    'ketCancel'    => $row->KetCancel ?? '',
                    'timeInput'    => $row->TimeInput ?? '',  // posisi/urutan
                    'noMesin'      => (int)($row->NoMesin ?? 0),
                    'noType'       => (int)($row->NoType ?? 0),
                    'noAntrian'    => $row->NoAntrian ?? '',
                    'idTrans'      => (int)($row->IdTrans ?? 0),
                    'status'       => (int)($row->Status ?? 0),
                    'cancel'       => (int)($row->Cancel ?? 0),
                ];
            }
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Proses edit posisi (tukar / susun)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'action'   => ['required', 'string', 'in:tukar,susun'],
            'idBag'    => ['required', 'integer'],
            'items'    => ['required', 'array', 'min:2'],
            'items.*.noAntrian' => ['required', 'string'],
            'items.*.idTrans'   => ['required', 'integer'],
            'items.*.estDate'   => ['required', 'date_format:Y-m-d'],
            'items.*.noType'    => ['required', 'integer'],
            'items.*.noMesin'   => ['required', 'integer'],
            'items.*.timeInput' => ['required', 'string'], // format: "YYYY-MM-DD HH:mm:ss"
            'direction'  => ['nullable', 'string', 'in:up,down'], // untuk susun
        ]);

        $action   = $validated['action'];
        $idBag    = $validated['idBag'];
        $items    = $validated['items'];
        $direction= $validated['direction'] ?? null;

        $db = DB::connection('Connworkshop');

        try {

            if ($action === 'tukar') {
                if (count($items) !== 2) {
                    $db->rollBack();
                    return response()->json(['error' => 'Tukar posisi membutuhkan tepat 2 item.'], 400);
                }
                // Cek tanggal kerja harus sama
                if ($items[0]['estDate'] !== $items[1]['estDate']) {
                    $db->rollBack();
                    return response()->json(['error' => 'Tanggal kerja tidak boleh berbeda.'], 400);
                }

                $item1 = $items[0];
                $item2 = $items[1];

                // Update item1 dengan timeInput milik item2
                $this->updatePosisi($db, $item1, $item2['timeInput'], $idBag);
                // Update item2 dengan timeInput milik item1
                $this->updatePosisi($db, $item2, $item1['timeInput'], $idBag);

                $db->commit();
                return response()->json(['message' => 'Proses selesai.']);
            }

            if ($action === 'susun') {
                if (!$direction || !in_array($direction, ['up', 'down'])) {
                    $db->rollBack();
                    return response()->json(['error' => 'Arah susun tidak valid.'], 400);
                }
                // items dikirim dalam urutan visual (dari atas ke bawah)
                // items[0] = item pertama yang dicek (nomerUrut(1))
                // items[last] = item terakhir yang dicek (nomerUrut(2))
                // Range mencakup SEMUA item di antara keduanya (termasuk unchecked)
                // Frontend harus mengirimkan seluruh rangeItems

                $rangeItems = $request->input('rangeItems', $items);
                if (count($rangeItems) < 2) {
                    $db->rollBack();
                    return response()->json(['error' => 'Range susun tidak valid.'], 400);
                }

                $firstTime = $rangeItems[0]['timeInput'];
                $lastTime  = $rangeItems[count($rangeItems) - 1]['timeInput'];

                if ($direction === 'up') {
                    // Geser ke atas: item[i] ambil time dari item[i-1]
                    for ($i = 1; $i < count($rangeItems); $i++) {
                        $prevTime = $rangeItems[$i - 1]['timeInput'];
                        $this->updatePosisi($db, $rangeItems[$i], $prevTime, $idBag);
                    }
                    // Item pertama ambil time dari item terakhir (asli)
                    $this->updatePosisi($db, $rangeItems[0], $lastTime, $idBag);
                } else {
                    // Geser ke bawah: item[i] ambil time dari item[i+1]
                    for ($i = 0; $i < count($rangeItems) - 1; $i++) {
                        $nextTime = $rangeItems[$i + 1]['timeInput'];
                        $this->updatePosisi($db, $rangeItems[$i], $nextTime, $idBag);
                    }
                    // Item terakhir ambil time dari item pertama (asli)
                    $this->updatePosisi($db, $rangeItems[count($rangeItems) - 1], $firstTime, $idBag);
                }

                $db->commit();
                return response()->json(['message' => 'Proses selesai.']);
            }

            $db->rollBack();
            return response()->json(['error' => 'Aksi tidak dikenal.'], 400);

        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Helper: panggil SP_5298_PJW_UPDATE-POSISIKRJ-{SUFFIX}
    private function updatePosisi($db, $item, $newTime, $idBag)
    {
        $suffix = $this->getMesinSuffix($item['noMesin']);
        if (!$suffix) {
            throw new \Exception('Mesin tidak dikenali: ' . $item['noMesin']);
        }
        $prefix = $this->getMesinPrefix($item['noMesin']);
        $sp = "EXEC [dbo].[{$prefix}_UPDATE-POSISIKRJ-{$suffix}] ?, ?, ?, ?, ?, ?";
        $db->statement($sp, [
            $item['noAntrian'],
            $item['idTrans'],
            $item['estDate'],
            $item['noType'],
            $idBag,
            $newTime,
        ]);
    }
}
