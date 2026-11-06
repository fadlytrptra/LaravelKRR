<?php

namespace App\Http\Controllers\GPS\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KonstruksiEditOrderController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.JadwalKonstruksi.konstruksiEditOrder', compact('access'));
    }

    public function getOrder(Request $request)
    {
        $validated = $request->validate([
            'noOd' => ['required', 'string', 'max:6'],
        ]);
        $noOd = $validated['noOd'];
        $db = DB::connection('Connworkshop');

        try {
            $order = collect($db->select('EXEC [SP_5298_PJW_LIST-ORDER-GAMBAR] @kode = ?, @noOd = ?', [1, $noOd]))->first();
            if (!$order) {
                return response()->json(['error' => "Nomer order gambar: $noOd tidak ada, belum di-ACC, ditolak, atau sudah finish."], 404);
            }
            $response = [
                'TDivisi'    => $order->NamaDivisi ?? '',
                'TKdBrg'     => $order->Kd_Brg ?? '',
                'TNamaBrg'   => $order->Nama_Brg ?? '',
                'TNoGbr'     => $order->No_Gbr_Rev ?? '',
                'OdSts'      => $order->OdSts ?? '',
                'TKetOrder'  => $order->Ket_Order ?? '',
                'TMesin'     => $order->Mesin ?? '',
                'TUserOrder' => $order->Pengorder ?? '',
            ];
            $est = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] @noOd = ?', [$noOd]))->first();
            if (!$est || $est->ada == 0) {
                return response()->json(['error' => "No. Order $noOd belum ada estimasi jadwalnya. Hubungi PPIC."], 400);
            }
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    public function getBagianList(Request $request)
    {
        $validated = $request->validate([
            'noOd' => ['required', 'string', 'max:6'],
        ]);
        $noOd = $validated['noOd'];
        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-GAMBAR] @noOd = ?', [$noOd]);
            return response()->json(array_map(function ($item) {
                return [
                    'IdBagian'   => $item->IdBagian ?? '',
                    'NamaBagian' => $item->NamaBagian ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'noOd'     => ['required', 'string', 'max:6'],
            'idBagian' => ['required', 'integer'],
        ]);
        $noOd = $validated['noOd'];
        $idBagian = $validated['idBagian'];
        $db = DB::connection('Connworkshop');

        try {
            $rows = $db->select('EXEC [dbo].[SP_5298_PJW_INF-KONSTRUKSI-PER-ORDER] @kode = ?, @noOd = ?, @idBag = ?', [4, $noOd, $idBagian]);
            $result = [];
            foreach ($rows as $row) {
                if (isset($row->Cancel) && $row->Cancel == 1) continue;
                $estDate = $row->EstDate ?? null;
                $timeInput = $row->TimeInput ?? null;
                $item = [
                    'nomorUrut'    => count($result) + 1,
                    'estDate'      => $estDate ?? '',
                    'estDateValue' => $estDate ? Carbon::parse($estDate)->format('Y-m-d') : '',
                    'namaWorkStation' => $row->NamaWorkStation ?? '',
                    'estTime'      => ($row->EstTimeHour ?? 0) . ' jam ' . ($row->EstTimeMinute ?? 0) . ' menit',
                    'hariKe'       => $row->HariKe ?? 0,
                    'keterangan'   => $row->KetCancel ?? '',
                    'timeInput'    => $timeInput ? Carbon::parse($timeInput)->format('Y-m-d H:i:s') : '',
                    'noWrkSts'     => $row->NoWrkSts ?? 0,
                    'noAntrian'    => $row->NoAntrian ?? '',
                    'idTrans'      => $row->IdTrans ?? 0,
                    'status'       => (int)($row->Status ?? 0),
                    'cancel'       => (int)($row->Cancel ?? 0),
                ];
                $result[] = $item;
            }
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'action'     => ['required', 'string', 'in:tukar,susun'],
            'noOd'       => ['required', 'string', 'max:6'],
            'idBagian'   => ['required', 'integer'],
            'items'      => ['required', 'array', 'min:2', 'max:2'],
            'items.*.noAntrian' => ['required', 'string'],
            'items.*.idTrans'   => ['required', 'integer'],
            'items.*.estDate'   => ['required', 'date_format:Y-m-d'],
            'items.*.noWrkSts'  => ['required', 'integer'],
            'items.*.timeInput' => ['required', 'date_format:Y-m-d H:i:s'],
            'arah'       => ['nullable', 'string', 'in:up,down'],
        ]);

        $action   = $validated['action'];
        $noOd     = $validated['noOd'];
        $idBagian = $validated['idBagian'];
        $items    = $validated['items'];
        $arah     = $validated['arah'] ?? null;
        $db = DB::connection('Connworkshop');

        try {

            // Cek tanggal kerja sama (semua items harus tanggal sama)
            $tgl = $items[0]['estDate'];
            foreach ($items as $item) {
                if ($item['estDate'] != $tgl) {
                    $db->rollBack();
                    return response()->json(['error' => 'Tanggal kerja tidak boleh berbeda.'], 400);
                }
            }

            if ($action == 'tukar') {
                // Swap timeInput antara item1 dan item2
                $time1 = $items[0]['timeInput'];
                $time2 = $items[1]['timeInput'];

                // Update item1 dengan time2
                $db->statement('EXEC [dbo].[SP_5298_PJW_UPDATE-POSISIKRJ-KONSTRUKSI] @noAntri = ?, @idTrans = ?, @estDate = ?, @worksts = ?, @idBag = ?, @Time = ?', [
                    $items[0]['noAntrian'],
                    $items[0]['idTrans'],
                    $items[0]['estDate'],
                    $items[0]['noWrkSts'],
                    $idBagian,
                    $time2
                ]);

                // Update item2 dengan time1
                $db->statement('EXEC [dbo].[SP_5298_PJW_UPDATE-POSISIKRJ-KONSTRUKSI] @noAntri = ?, @idTrans = ?, @estDate = ?, @worksts = ?, @idBag = ?, @Time = ?', [
                    $items[1]['noAntrian'],
                    $items[1]['idTrans'],
                    $items[1]['estDate'],
                    $items[1]['noWrkSts'],
                    $idBagian,
                    $time1
                ]);

                $db->commit();
                return response()->json(['message' => 'Posisi berhasil ditukar.']);
            } elseif ($action == 'susun') {
                if ($arah == 'up') {
                }
                $rangeItems = $request->input('rangeItems', []);
                if (empty($rangeItems) || count($rangeItems) < 2) {
                    $db->rollBack();
                    return response()->json(['error' => 'Data range tidak lengkap untuk susun posisi.'], 400);
                }

                // Simpan timeInput pertama (untuk dipindahkan ke posisi akhir)
                $firstTime = $rangeItems[0]['timeInput'];
                $lastTime = $rangeItems[count($rangeItems) - 1]['timeInput'];

                if ($arah == 'up') {
                    for ($i = 1; $i < count($rangeItems); $i++) {
                        $prevTime = $rangeItems[$i - 1]['timeInput'];
                        $db->statement('EXEC [dbo].[SP_5298_PJW_UPDATE-POSISIKRJ-KONSTRUKSI] @noAntri = ?, @idTrans = ?, @estDate = ?, @worksts = ?, @idBag = ?, @Time = ?', [
                            $rangeItems[$i]['noAntrian'],
                            $rangeItems[$i]['idTrans'],
                            $rangeItems[$i]['estDate'],
                            $rangeItems[$i]['noWrkSts'],
                            $idBagian,
                            $prevTime
                        ]);
                    }
                    $db->statement('EXEC [dbo].[SP_5298_PJW_UPDATE-POSISIKRJ-KONSTRUKSI] @noAntri = ?, @idTrans = ?, @estDate = ?, @worksts = ?, @idBag = ?, @Time = ?', [
                        $rangeItems[0]['noAntrian'],
                        $rangeItems[0]['idTrans'],
                        $rangeItems[0]['estDate'],
                        $rangeItems[0]['noWrkSts'],
                        $idBagian,
                        $lastTime
                    ]);
                } elseif ($arah == 'down') {
                    for ($i = 0; $i < count($rangeItems) - 1; $i++) {
                        $nextTime = $rangeItems[$i + 1]['timeInput'];
                        $db->statement('EXEC [dbo].[SP_5298_PJW_UPDATE-POSISIKRJ-KONSTRUKSI] @noAntri = ?, @idTrans = ?, @estDate = ?, @worksts = ?, @idBag = ?, @Time = ?', [
                            $rangeItems[$i]['noAntrian'],
                            $rangeItems[$i]['idTrans'],
                            $rangeItems[$i]['estDate'],
                            $rangeItems[$i]['noWrkSts'],
                            $idBagian,
                            $nextTime
                        ]);
                    }
                    $db->statement('EXEC [dbo].[SP_5298_PJW_UPDATE-POSISIKRJ-KONSTRUKSI] @noAntri = ?, @idTrans = ?, @estDate = ?, @worksts = ?, @idBag = ?, @Time = ?', [
                        $rangeItems[count($rangeItems) - 1]['noAntrian'],
                        $rangeItems[count($rangeItems) - 1]['idTrans'],
                        $rangeItems[count($rangeItems) - 1]['estDate'],
                        $rangeItems[count($rangeItems) - 1]['noWrkSts'],
                        $idBagian,
                        $firstTime
                    ]);
                } else {
                    $db->rollBack();
                    return response()->json(['error' => 'Arah tidak valid.'], 400);
                }

                $db->commit();
                return response()->json(['message' => 'Posisi berhasil disusun.']);
            }

            $db->rollBack();
            return response()->json(['error' => 'Aksi tidak dikenal.'], 400);
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
