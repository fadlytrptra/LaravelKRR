<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PengerjaanEditMesinController extends Controller
{

    // Mapping mesin ID → suffix SP (untuk NOANTRI-NOFINISH, JADWAL, UPDATE-NOANTRI)
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
        return view('GPS.JadwalPengerjaan.pengerjaanEditMesin', compact('access'));
    }


    // Lookup mesin (SP_5298_PJW_LIST-TYPE-MESIN kode=1)
    public function getMesinList()
    {
        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-TYPE-MESIN] ?', [1]);
            return response()->json(array_map(function ($item) {
                return [
                    'NoMesin'   => $item->NoMesin ?? '',
                    'NamaMesin' => $item->NamaMesin ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Lookup type mesin (SP_5298_PJW_LIST-TYPE-MESIN kode=2, noMesin)
    public function getTypeList(Request $request)
    {
        $validated = $request->validate([
            'noMesin' => ['required', 'integer'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-TYPE-MESIN] ?, ?', [2, $validated['noMesin']]);
            return response()->json(array_map(function ($item) {
                return [
                    'NoType'   => $item->NoType ?? '',
                    'NamaType' => $item->NamaType ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Load jadwal pengerjaan per mesin & type pada tanggal tertentu.
    // SP: SP_5298_PJW_NOANTRI-{SUFFIX}-NOFINISH + SP_5298_PJW_JADWAL-{SUFFIX}
    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'noMesin' => ['required', 'integer'],
            'noType'  => ['required', 'integer'],
            'date'    => ['required', 'date_format:Y-m-d'],
        ]);

        $suffix = $this->getMesinSuffix($validated['noMesin']);
        if (!$suffix) {
            return response()->json(['error' => 'Mesin tidak dikenali.'], 400);
        }
        $prefix = $this->getMesinPrefix($validated['noMesin']);

        $db = DB::connection('Connworkshop');

        try {
            // 1. Ambil daftar no antrian yang belum finish
            $spNoAntri = "EXEC [dbo].[{$prefix}_NOANTRI-{$suffix}-NOFINISH] @type=?, @date1=?";
            $noAntriRows = $db->select($spNoAntri, [$validated['noType'], $validated['date']]);

            $jadwal = [];
            foreach ($noAntriRows as $row) {
                if (isset($row->Cancel) && $row->Cancel == 1) continue;
                $noAntri = $row->NoAntrian ?? '';
                $jenisOd = $row->JenisOrder ?? 'H';
                if (!$noAntri) continue;

                // 2. Ambil detail jadwal per no antrian
                $spJadwal = "EXEC [dbo].[{$prefix}_JADWAL-{$suffix}] ?, ?, ?, ?";
                $kode = ($jenisOd === 'H') ? 1 : 2;

                $detail = collect($db->select($spJadwal, [
                    $kode,
                    $noAntri,
                    $validated['date'],
                    $validated['noType']
                ]))->first();

                if (!$detail) continue;
                if (isset($detail->Cancel) && $detail->Cancel == 1) continue;

                // Format Nama Barang & Kd Barang berdasarkan jenis order
                $namaBrg = ($jenisOd === 'H') ? ($detail->Nama_Brg ?? '') : ($detail->Nama_Proyek ?? '');
                $kdBrg   = ($jenisOd === 'H') ? ($detail->Kd_Brg ?? '') : '';

                // Format jumlah yang dikerjakan
                $jmlDikerjakan = '';
                if (isset($detail->HariKe) && $detail->HariKe > 0) {
                    $jmlDikerjakan = trim(($detail->JmlBrg ?? '0') . ' . ' . $detail->HariKe);
                } else {
                    $jmlDikerjakan = trim($detail->JmlBrg ?? '0');
                }

                $jadwal[] = [
                    'NoAntrian'     => $noAntri,
                    'NoOrder'       => $detail->NoOd ?? '',
                    'TglStart'      => $detail->EstDate ?? '',
                    'NamaBarang'    => $namaBrg,
                    'KdBarang'      => $kdBrg,
                    'EstTime'       => ($detail->EstTimeHour ?? 0) . ' jam ' . ($detail->EstTimeMinute ?? 0) . ' menit',
                    'NamaDivisi'    => $detail->NamaDivisi ?? '',
                    'JmlOrder'      => trim(($detail->Jml_Brg ?? '0') . ' ' . ($detail->Satuan ?? '')),
                    'NamaBagian'    => $detail->NamaBagian ?? '',
                    'IdBagian'      => (int)($detail->IdBagian ?? 0),
                    'JmlDikerjakan' => $jmlDikerjakan,
                    'Status'        => (int)($detail->Status ?? 0),
                    'Cancel'        => (int)($detail->Cancel ?? 0),
                ];
            }

            return response()->json($jadwal);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Proses swap posisi 2 jadwal (SP_5298_PJW_UPDATE-NOANTRI-{SUFFIX}).
    public function store(Request $request)
    {
        $validated = $request->validate([
            'noMesin'   => ['required', 'integer'],
            'noType'    => ['required', 'integer'],
            'date'      => ['required', 'date_format:Y-m-d'],
            'noAntri1'  => ['required', 'string'],
            'noAntri2'  => ['required', 'string'],
        ]);

        $suffix = $this->getMesinSuffix($validated['noMesin']);
        if (!$suffix) {
            return response()->json(['error' => 'Mesin tidak dikenali.'], 400);
        }
        $prefix = $this->getMesinPrefix($validated['noMesin']);

        $noAntri1 = $validated['noAntri1'];
        $noAntri2 = $validated['noAntri2'];

        if ($noAntri1 === $noAntri2) {
            return response()->json(['error' => 'Pilih 2 nomor antrian yang berbeda.'], 400);
        }

        // === ADAPTASI LOGIKA VB.NET ===
        // 1. VB: k = CInt(noAntri(1))
        $k = (int) $noAntri1; // Menghilangkan 0 di depan, misal "0000001" jadi 1

        // 2. VB: myCode = "0010000" & Trim(k)
        $myCode = "0010000" . $k;

        // 3. VB: posisiBaru = Trim(Microsoft.VisualBasic.Right(myCode, 7))
        $posisiBaru = substr($myCode, -7);

        $db = DB::connection('Connworkshop');
        $spUpdate = "EXEC [dbo].[{$prefix}_UPDATE-NOANTRI-{$suffix}] ?, ?, ?, ?";

        $db->beginTransaction();

        try {
            // Eksekusi SP sama persis seperti urutan ExecuteReader di VB.NET

            // Parameter SP berurutan: nomor tujuan, lalu nomor sumber.
            // Pindahkan noAntri1 ke posisi sementara terlebih dahulu.
            $db->statement($spUpdate, [
                $posisiBaru,
                $noAntri1,
                $validated['noType'],
                $validated['date'],
            ]);

            // Pindahkan noAntri2 ke slot noAntri1 yang sudah kosong.
            $db->statement($spUpdate, [
                $noAntri1,
                $noAntri2,
                $validated['noType'],
                $validated['date'],
            ]);

            // Pindahkan nomor sementara ke slot noAntri2 yang sudah kosong.
            $db->statement($spUpdate, [
                $noAntri2,
                $posisiBaru,
                $validated['noType'],
                $validated['date'],
            ]);

            $db->commit();
            return response()->json(['message' => 'Proses selesai.']);
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
