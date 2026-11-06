<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PengerjaanFinishRencanaController extends Controller
{

    // Mapping mesin ID → suffix SP (untuk UPDATE-JMLBRGKRJ)

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
        return view('GPS.JadwalPengerjaan.PengerjaanFinishRencana', compact('access'));
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
                $validated['noOd'],
                $validated['jenisOd']
            ]);
            return response()->json(array_map(function ($item) {
                return [
                    'IdBagian'   => $item->IdBagian ?? ($item->NoBagian ?? ''),
                    'NamaBagian' => $item->NamaBagian ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Load jadwal per order & bagian (SP_5298_PJW_INF-JADWAL-PER-ORDER-1 kode=9/10)
    // Filter Cancel != 1
    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'idBag'   => ['required', 'integer'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $kode = ($validated['jenisOd'] === 'H') ? 9 : 10;
        $db = DB::connection('Connworkshop');

        try {
            $rows = $db->select('EXEC [dbo].[SP_5298_PJW_INF-JADWAL-PER-ORDER-1] ?, ?, ?', [
                $kode,
                $validated['noOd'],
                $validated['idBag']
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

                // Tentukan status warna
                // Prioritas: Blue (FinishT='Y') > Green (SetujuKR not null + AccPPIC null) > DarkTurquoise (Finish='Y')
                $finish    = $row->Finish ?? 'N';
                $setujuKR  = $row->SetujuKR ?? null;
                $accPPIC   = $row->AccPPIC ?? null;
                $finishT   = $row->FinishT ?? null;

                $status = 'default';
                if ($finish === 'Y') {
                    $status = 'finish'; // DarkTurquoise
                }
                if (!is_null($setujuKR) && is_null($accPPIC)) {
                    $status = 'setuju'; // Green
                }
                if (!is_null($finishT) && $finishT === 'Y') {
                    $status = 'finish-total'; // Blue
                }

                $result[] = [
                    'NoAntrian'     => $row->NoAntrian ?? '',
                    'TglStart'      => $row->EstDate ?? '',
                    'TglStartValue' => !empty($row->EstDate)
                        ? Carbon::parse($row->EstDate)->format('Y-m-d')
                        : '',
                    'NamaMesin'     => $row->NamaMesin ?? '',
                    'NamaType'      => $row->NamaType ?? '',
                    'EstTime'       => ($row->EstTimeHour ?? 0) . ' jam ' . ($row->EstTimeMinute ?? 0) . ' menit',
                    'NoMesin'       => (int)($row->NoMesin ?? 0),
                    'NoType'        => (int)($row->NoType ?? 0),
                    'JmlDikerjakan' => $jmlDikerjakan,
                    'JmlBrgRaw'     => (int)($row->JmlBrg ?? 0),
                    'RealTime'      => ($row->RealTimeHour ?? 0) . ' jam ' . ($row->RealTimeMinute ?? 0) . ' menit',
                    'JmlFinish'     => (int)($row->JmlFinish ?? 0),
                    'IdTrans'       => (int)($row->IdTrans ?? 0),
                    'statusWarna'   => $status,
                ];
            }
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Proses update jumlah barang dikerjakan (SP_5298_PJW_UPDATE-JMLBRGKRJ-{MESIN})

    public function store(Request $request)
    {
        $validated = $request->validate([
            'noOd'     => ['required', 'string', 'max:6'],
            'idBagian' => ['required', 'integer'],
            'jml'      => ['required', 'integer', 'min:0'],
            'items'    => ['required', 'array', 'min:1', 'max:1'],
            'items.*.idTrans'   => ['required', 'integer'],
            'items.*.noAntrian' => ['required', 'string'],
            'items.*.noType'    => ['required', 'integer'],
            'items.*.noMesin'   => ['required', 'integer'],
            'items.*.tgl'       => ['required', 'date_format:Y-m-d'],
        ]);

        $suffix = $this->getMesinSuffix($validated['items'][0]['noMesin']);
        if (!$suffix) {
            return response()->json(['error' => 'Mesin tidak dikenali.'], 400);
        }
        $prefix = $this->getMesinPrefix($validated['items'][0]['noMesin']);

        $db = DB::connection('Connworkshop');

        try {
            $db->beginTransaction();

            $item = $validated['items'][0];
            $sp = "EXEC [dbo].[{$prefix}_UPDATE-JMLBRGKRJ-{$suffix}] @idTrans=?, @noOd=?, @idBag=?, @noAntri=?, @noType=?, @tgl=?, @jml=?";
            $db->statement($sp, [
                $item['idTrans'],           // @idTrans
                $validated['noOd'],          // @noOd
                $validated['idBagian'],      // @idBag
                $item['noAntrian'],          // @noAntri
                $item['noType'],             // @noType
                $item['tgl'],                // @tgl
                $validated['jml'],           // @jml
            ]);

            $db->commit();
            return response()->json(['message' => 'Data terSimpan.']);
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
