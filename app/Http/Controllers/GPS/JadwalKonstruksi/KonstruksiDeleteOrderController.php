<?php

namespace App\Http\Controllers\GPS\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class KonstruksiDeleteOrderController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.JadwalKonstruksi.konstruksiDeleteOrder', compact('access'));
    }

    public function getOrder(Request $request)
    {
        $validated = $request->validate([
            'noOd' => ['required', 'string', 'max:6'],
        ]);
        $noOd = $validated['noOd'];
        $db = DB::connection('Connworkshop');

        try {
            $order = collect($db->select('EXEC [SP_5298_PJW_LIST-ORDER-GAMBAR] @kode=?, @noOd=?', [1, $noOd]))->first();
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
            $est = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] @noOd=?', [$noOd]))->first();
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
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-GAMBAR] @noOd=?', [$noOd]);
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
        $noOd     = $validated['noOd'];
        $idBagian = $validated['idBagian'];
        $db = DB::connection('Connworkshop');

        try {
            $rows = $db->select('EXEC [dbo].[SP_5298_PJW_INF-KONSTRUKSI-PER-ORDER-1] @kode=?, @noOd=?, @noBagian=?', [3, $noOd, $idBagian]);
            $result = [];
            foreach ($rows as $row) {
                if (isset($row->Cancel) && $row->Cancel == 1) continue;
                $estDate = $row->EstDate ?? null;
                $item = [
                    'NoAntrian'      => $row->NoAntrian ?? '',
                    'EstDate'        => $row->EstDate ?? '',
                    'estDateValue' => $estDate ? Carbon::parse($estDate)->format('Y-m-d') : '',
                    'NamaWorkStation' => $row->NamaWorkStation ?? '',
                    'NoWrkSts'       => $row->NoWrkSts ?? 0,
                    'EstTime'        => ($row->EstTimeHour ?? 0) . ' jam ' . ($row->EstTimeMinute ?? 0) . ' menit',
                    'HariKe'         => (int)($row->HariKe ?? 0),
                    'Status'         => (int)($row->Status ?? 0),
                    'Tgl_Tolak_Mng'  => $row->Tgl_Tolak_Mng ?? null,
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
            'noOd'      => ['required', 'string', 'max:6'],
            'idBagian'  => ['required', 'integer'],
            'items'     => ['required', 'array'],
            'items.*.noAntrian' => ['required', 'string'],
            'items.*.estDate'   => ['required', 'date_format:Y-m-d'],
            'items.*.noWrkSts'  => ['required', 'integer'],
            'alasan'    => ['nullable', 'string', 'max:255'],
        ]);

        $noOd     = $validated['noOd'];
        $idBagian = $validated['idBagian'];
        $items    = $validated['items'];
        $alasan   = $validated['alasan'] ?? '';
        // $user     = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db       = DB::connection('Connworkshop');

        try {

            foreach ($items as $item) {
                $db->statement('EXEC [dbo].[SP_5298_PJW_DELETE-JADWAL-KONSTRUKSI] @noAntri=?, @tgl=?, @idBag=?, @worksts=?, @user=?, @keterangan=?', [
                    $item['noAntrian'],
                    $item['estDate'],
                    $idBagian,
                    $item['noWrkSts'],
                    $user,
                    'DiDelete. ' . $alasan,
                ]);
            }

            $db->commit();
            return response()->json(['message' => 'Jadwal berhasil dihapus.']);
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
