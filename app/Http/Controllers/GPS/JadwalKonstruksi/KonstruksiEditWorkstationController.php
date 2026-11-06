<?php

namespace App\Http\Controllers\GPS\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KonstruksiEditWorkstationController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.JadwalKonstruksi.konstruksiEditWorkstation', compact('access'));
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
            'worksts' => ['required', 'integer'],
            'date' => ['required', 'date_format:Y-m-d'],
        ]);

        $worksts = $validated['worksts'];
        $date = $validated['date'];
        $db = DB::connection('Connworkshop');

        try {
            $noAntriRows = $db->select('EXEC [dbo].[SP_5298_PJW_NOANTRI-KONSTRUKSI-NOFINISH] @worksts = ?, @date1 = ?', [
                $worksts,
                $date
            ]);
            $jadwal = [];

            foreach ($noAntriRows as $row) {
                if (isset($row->Cancel) && $row->Cancel == 1) continue;
                $noAntri = $row->NoAntrian ?? '';
                if (!$noAntri) continue;

                $detail = collect($db->select('EXEC [dbo].[SP_5298_PJW_JADWAL-KONSTRUKSI] @kode = ?, @noAntri = ?, @date = ?, @worksts = ?', [1, $noAntri, $date, $worksts]))->first();
                if (!$detail) continue;
                if (isset($detail->Cancel) && $detail->Cancel == 1) continue;

                $jadwal[] = [
                    'NoAntrian'     => $noAntri,
                    'NoOrder'       => $detail->NoOrder ?? '',
                    'EstDate'       => $detail->EstDate ?? '',
                    'NamaDivisi'    => $detail->NamaDivisi ?? '',
                    'Nama_Brg'      => $detail->Nama_Brg ?? '',
                    'NamaBagian'    => $detail->NamaBagian ?? '',
                    'EstTime'       => ($detail->EstTimeHour ?? 0) . ' jam ' . ($detail->EstTimeMinute ?? 0) . ' menit',
                    'HariKe'        => (int) ($detail->HariKe ?? 0),
                    'IdBagian'      => (int) ($detail->IdBagian ?? 0),
                    'Status'        => (int) ($detail->Status ?? 0),
                    'Cancel'        => (int) ($detail->Cancel ?? 0),
                ];
            }
            return response()->json($jadwal);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'worksts'    => ['required', 'integer'],
            'date'       => ['required', 'date_format:Y-m-d'],
            'items'      => ['required', 'array', 'size:2'],
            'items.*.noAntrian' => ['required', 'string'],
        ]);

        $worksts = $validated['worksts'];
        $date = $validated['date'];
        $items = $validated['items'];

        // Ambil dua no antrian yang dipilih
        $noAntri1 = $items[0]['noAntrian'];
        $noAntri2 = $items[1]['noAntrian'];

        // Konversi ke integer untuk mengatur posisi baru
        $k = (int) $noAntri1;
        $m = (int) $noAntri2;

        // Buat posisi baru: digit pertama (angka jutaan) diubah menjadi 1 untuk noAntri1
        // Contoh: 0000001 -> 1000001 (posisi baru)
        $posisiBaru = '1' . str_pad(substr($noAntri1, 1), 6, '0', STR_PAD_LEFT); // pendekatan sederhana

        $db = DB::connection('Connworkshop');
        try {
            // 1. Update noAntri1 menjadi posisiBaru (misal 1000001)
            $db->statement('EXEC [dbo].[SP_5298_PJW_UPDATE-NOANTRI-KONSTRUKSI] @noAntri = ?, @noBantu = ?, @worksts = ?, @tgl = ?', [
                $noAntri1,
                $posisiBaru,
                $worksts,
                $date,
            ]);

            // 2. Update noAntri2 menjadi noAntri1 (swap)
            $db->statement('EXEC [dbo].[SP_5298_PJW_UPDATE-NOANTRI-KONSTRUKSI] @noAntri = ?, @noBantu = ?, @worksts = ?, @tgl = ?', [
                $noAntri2,
                $noAntri1,
                $worksts,
                $date,
            ]);

            // 3. Update posisiBaru menjadi noAntri2 (swap)
            $db->statement('EXEC [dbo].[SP_5298_PJW_UPDATE-NOANTRI-KONSTRUKSI] @noAntri = ?, @noBantu = ?, @worksts = ?, @tgl = ?', [
                $posisiBaru,
                $noAntri2,
                $worksts,
                $date,
            ]);

            $db->commit();
            return response()->json(['message' => 'Proses selesai. Posisi antrian berhasil ditukar.']);
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
