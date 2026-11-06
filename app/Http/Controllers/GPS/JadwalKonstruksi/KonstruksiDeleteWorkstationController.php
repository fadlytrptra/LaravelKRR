<?php

namespace App\Http\Controllers\GPS\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class KonstruksiDeleteWorkstationController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        // Set default tanggal awal = awal bulan, akhir = akhir bulan
        $now = Carbon::now();
        $startDate = $now->copy()->startOfMonth()->format('Y-m-d');
        $endDate = $now->copy()->endOfMonth()->format('Y-m-d');
        return view('GPS.JadwalKonstruksi.konstruksiDeleteWorkstation', compact('access', 'startDate', 'endDate'));
    }

    public function getWorkstationList()
    {
        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-WORKSTATION]');
            return response()->json(array_map(function ($item) {
                return [
                    'NoWrkSts' => $item->NoWrkSts ?? '',
                    'NamaWorkStation' => $item->NamaWorkStation ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'worksts'   => ['required', 'integer'],
            'startDate' => ['required', 'date_format:Y-m-d'],
            'endDate'   => ['required', 'date_format:Y-m-d', 'after_or_equal:startDate'],
        ]);

        $worksts   = $validated['worksts'];
        $startDate = $validated['startDate'];
        $endDate   = $validated['endDate'];
        $db = DB::connection('Connworkshop');

        try {
            // 1. Ambil daftar no antrian & tanggal dalam rentang (SP dengan kode=2)
            $noAntriRows = $db->select('EXEC [dbo].[SP_5298_PJW_NOANTRI-KONSTRUKSI-NOFINISH] @kode = ?, @worksts = ?, @date1 = ?, @date2 = ?', [2, $worksts, $startDate, $endDate]);
            $jadwal = [];
            foreach ($noAntriRows as $row) {
                $noAntri = $row->NoAntrian ?? '';
                $estDate = $row->EstDate ?? '';
                if (!$noAntri || !$estDate) continue;

                // 2. Detail jadwal per no antrian (SP dengan kode=2)
                $detail = collect($db->select('EXEC [dbo].[SP_5298_PJW_JADWAL-KONSTRUKSI] @kode = ?, @noAntri = ?, @date = ?, @worksts = ?', [2, $noAntri, $estDate, $worksts]))->first();
                if (!$detail) continue;
                if (isset($detail->Cancel) && $detail->Cancel == 1) continue; // skip cancel

                $item = [
                    'NoAntrian'      => $noAntri,
                    'NoOrder'        => $detail->NoOrder ?? '',
                    'EstDate'        => $detail->EstDate ?? '',
                    'EstDateValue'  => !empty($detail->EstDate) ? Carbon::parse($detail->EstDate)->format('Y-m-d') : '',
                    'NamaDivisi'     => $detail->NamaDivisi ?? '',
                    'Nama_Brg'       => $detail->Nama_Brg ?? '',
                    'NamaBagian'     => $detail->NamaBagian ?? '',
                    'EstTime'        => ($detail->EstTimeHour ?? 0) . ' jam ' . ($detail->EstTimeMinute ?? 0) . ' menit',
                    'HariKe'         => (int)($detail->HariKe ?? 0),
                    'IdBagian'       => (int)($detail->IdBagian ?? 0),
                    'Status'         => (int)($detail->Status ?? 0),
                    'Tgl_Tolak_Mng'  => $detail->Tgl_Tolak_Mng ?? null,
                ];
                $jadwal[] = $item;
            }

            return response()->json($jadwal);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'worksts'   => ['required', 'integer'],
            'items'     => ['required', 'array'],
            'items.*.noAntrian' => ['required', 'string'],
            'items.*.estDate'   => ['required', 'date_format:Y-m-d'],
            'items.*.idBagian'  => ['required', 'integer'],
            'alasan'    => ['nullable', 'string', 'max:255'],
        ]);

        $worksts = $validated['worksts'];
        $items   = $validated['items'];
        $alasan  = $validated['alasan'] ?? '';
        // $user    = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db      = DB::connection('Connworkshop');

        try {
            foreach ($items as $item) {
                $db->statement('EXEC [dbo].[SP_5298_PJW_DELETE-JADWAL-KONSTRUKSI] @noAntri = ?, @tgl = ?, @idBag = ?, @worksts = ?, @user = ?, @keterangan = ?', [
                    $item['noAntrian'],
                    $item['estDate'],
                    $item['idBagian'],
                    $worksts,
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
