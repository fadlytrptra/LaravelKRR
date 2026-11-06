<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class PengerjaanEstimasiTanggalController extends Controller
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
        return view('GPS.JadwalPengerjaan.PengerjaanEstimasiTanggal', compact('access'));
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

                $namaBrg = ($jenisOd === 'H') ? ($detail->Nama_Brg ?? '') : ($detail->Nama_Proyek ?? '');
                $kdBgr   = ($jenisOd === 'H') ? ($detail->Kd_Brg ?? '') : '';

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
                    'KdBarang'      => $kdBgr,
                    'EstTime'       => ($detail->EstTimeHour ?? 0) . ' jam ' . ($detail->EstTimeMinute ?? 0) . ' menit',
                    'EstTimeHour'   => (int)($detail->EstTimeHour ?? 0),
                    'EstTimeMinute' => (int)($detail->EstTimeMinute ?? 0),
                    'NamaDivisi'    => $detail->NamaDivisi ?? '',
                    'JmlOrder'      => trim(($detail->Jml_Brg ?? '0') . ' ' . ($detail->Satuan ?? '')),
                    'NamaBagian'    => $detail->NamaBagian ?? '',
                    'IdBagian'      => (int)($detail->IdBagian ?? 0),
                    'JmlDikerjakan' => $jmlDikerjakan,
                    'JenisOrder'    => $jenisOd,
                    'Status'        => (int)($detail->Status ?? 0),
                    'Cancel'        => (int)($detail->Cancel ?? 0),
                ];
            }

            return response()->json($jadwal);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Proses edit estimasi tanggal.
    public function store(Request $request)
    {
        if ($request->input('action') === 'shift') {
            return $this->shiftSelectedItems($request);
        }

        $validated = $request->validate([
            'noMesin'    => ['required', 'integer'],
            'noType'     => ['required', 'integer'],
            'oldDate'    => ['required', 'date_format:Y-m-d'],
            'newDate'    => ['required', 'date_format:Y-m-d'],
            'keterangan' => ['required', 'string', 'max:255'],
            'jamKerjaOptimal' => ['nullable', 'integer', 'min:1'],
            'items'      => ['required', 'array', 'min:1'],
            'items.*.noAntrian'  => ['required', 'string'],
            'items.*.noOrder'    => ['required', 'string'],
            'items.*.idBagian'   => ['required', 'integer'],
            'items.*.estHour'    => ['required', 'integer', 'min:0'],
            'items.*.estMinute'  => ['required', 'integer', 'min:0', 'max:59'],
        ]);

        $suffix = $this->getMesinSuffix($validated['noMesin']);
        if (!$suffix) {
            return response()->json(['error' => 'Mesin tidak dikenali.'], 400);
        }
        $prefix = $this->getMesinPrefix($validated['noMesin']);

        $db = DB::connection('Connworkshop');
        // $user = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;

        try {
            $db->beginTransaction();

            // 1. Cek apakah tanggal baru sudah ada jadwal
            $spCekEstDate = "EXEC [dbo].[{$prefix}_CEK-ESTDATE-{$suffix}] ?, ?";
            $cek = collect($db->select($spCekEstDate, [
                $validated['newDate'],
                $validated['noType']
            ]))->first();
            // SQL Server preserves the alias casing returned by the stored procedure.
            // The VB code reads `ada`, so accept either casing here.
            $adaJadwal = (int)($cek->ada ?? $cek->Ada ?? 0);

            // Hitung total menit input
            $totalMenitInput = 0;
            foreach ($validated['items'] as $item) {
                $totalMenitInput += ($item['estHour'] * 60) + $item['estMinute'];
            }

            if ($adaJadwal == 0) {
                // === Belum ada jadwal → butuh jam kerja optimal ===
                if (empty($validated['jamKerjaOptimal'])) {
                    $db->rollBack();
                    return response()->json([
                        'error' => 'Belum ada jadwal untuk tanggal baru. Silakan tentukan jam kerja optimal.',
                        'needJamKerja' => true,
                        'totalMenitInput' => $totalMenitInput,
                        'minimumJamKerja' => (int)ceil($totalMenitInput / 60),
                    ], 400);
                }

                if ($totalMenitInput > ($validated['jamKerjaOptimal'] * 60)) {
                    $db->rollBack();
                    return response()->json([
                        'error' => 'Jam kerja optimal tidak boleh lebih kecil dari total estimasi waktu.',
                        'needJamKerja' => true,
                        'totalMenitInput' => $totalMenitInput,
                        'minimumJamKerja' => (int)ceil($totalMenitInput / 60),
                    ], 400);
                }

                // Update tiap item via SP_5298_PJW_EDIT-ESTDATE-{MESIN}-NEW
                $spEdit = "EXEC [dbo].[{$prefix}_EDIT-ESTDATE-{$suffix}-NEW] @estDate=?, @noAntri=?, @noOd=?, @idBag=?, @estHour=?, @estMinute=?, @noType=?, @oldDate=?, @jamKrj=?, @user=?, @keterangan=?";
                foreach ($validated['items'] as $item) {
                    $db->statement($spEdit, [
                        $validated['newDate'],       // @estDate (baru)
                        $item['noAntrian'],           // @noAntri
                        $item['noOrder'],             // @noOd
                        $item['idBagian'],            // @idBag
                        $item['estHour'],             // @estHour
                        $item['estMinute'],           // @estMinute
                        $validated['noType'],         // @noType
                        $validated['oldDate'],        // @oldDate
                        $validated['jamKerjaOptimal'], // @jamKrj
                        $user,                        // @user
                        'Edit estimasi tgl, ' . $validated['keterangan'] . '. Ke tgl: ' . $validated['newDate'], // @keterangan
                    ]);
                }

                $db->commit();
                return response()->json(['message' => 'Tersimpan.']);
            } else {
                // Match FrmEditTgl: a populated date is still editable. First compare
                // the moved work with the remaining capacity for the destination day.
                $spHitung = "EXEC [dbo].[{$prefix}_HITUNG-SISA-JAM-KRJ-{$suffix}] ?, ?";
                $hitung = collect($db->select($spHitung, [
                    $validated['newDate'],
                    $validated['noType']
                ]))->first();
                $totalMenitKrj = (int)($hitung->TotalMenitKrj ?? 0);
                $totalMenitPk = (int)($hitung->TotalMenitPk ?? 0);
                $totalMenit = $totalMenitInput + $totalMenitPk;

                if ($totalMenit > $totalMenitKrj) {
                    $db->rollBack();
                    return response()->json([
                        'error' => 'Jam kerja tidak mencukupi.',
                        'needCapacityDecision' => true,
                        'newDate' => $validated['newDate'],
                        'totalMenitInput' => $totalMenitInput,
                        'totalMenitPk' => $totalMenitPk,
                        'totalMenitKrj' => $totalMenitKrj,
                        'kekuranganMenit' => $totalMenit - $totalMenitKrj,
                    ], 400);
                }

                // Destination has a schedule but enough capacity: continue the same
                // edit stored procedure used by the empty-date path.
                $jamKerja = max(1, (int)ceil($totalMenitKrj / 60));
                $spEdit = "EXEC [dbo].[{$prefix}_EDIT-ESTDATE-{$suffix}-NEW] ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?";
                foreach ($validated['items'] as $item) {
                    $db->statement($spEdit, [
                        $validated['newDate'],
                        $item['noAntrian'],
                        $item['noOrder'],
                        $item['idBagian'],
                        $item['estHour'],
                        $item['estMinute'],
                        $validated['noType'],
                        $validated['oldDate'],
                        $jamKerja,
                        $user,
                        'Edit estimasi tgl, ' . $validated['keterangan'] . '. Ke tgl: ' . $validated['newDate'],
                    ]);
                }
                $db->commit();
                return response()->json(['message' => 'Tersimpan.']);
            }
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    /** Shift the selected work to the following date (the VB Yes path). */
    private function shiftSelectedItems(Request $request)
    {
        $validated = $request->validate([
            'noMesin' => ['required', 'integer'],
            'noType' => ['required', 'integer'],
            'oldDate' => ['required', 'date_format:Y-m-d'],
            'newDate' => ['required', 'date_format:Y-m-d'],
            'jamKerjaOptimal' => ['nullable', 'integer', 'min:1'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.noAntrian' => ['required', 'string'],
            'items.*.noOrder' => ['required', 'string'],
            'items.*.idBagian' => ['required', 'integer'],
            'items.*.estHour' => ['required', 'integer', 'min:0'],
            'items.*.estMinute' => ['required', 'integer', 'min:0', 'max:59'],
        ]);

        $suffix = $this->getMesinSuffix($validated['noMesin']);
        if (!$suffix) {
            return response()->json(['error' => 'Mesin tidak dikenali.'], 400);
        }
        $prefix = $this->getMesinPrefix($validated['noMesin']);
        $db = DB::connection('Connworkshop');
        // $user = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;

        try {
            $db->beginTransaction();
            $cek = collect($db->select(
                "EXEC [dbo].[{$prefix}_CEK-ESTDATE-{$suffix}] ?, ?",
                [$validated['newDate'], $validated['noType']]
            ))->first();
            $adaJadwal = (int)($cek->ada ?? $cek->Ada ?? 0);

            $jamKerja = $validated['jamKerjaOptimal'] ?? null;
            if (!$adaJadwal && !$jamKerja) {
                $db->rollBack();
                return response()->json([
                    'error' => 'Tentukan jam kerja optimal untuk tanggal geser.',
                    'needJamKerja' => true,
                ], 400);
            }

            $spGeser = "EXEC [dbo].[{$prefix}_GESER-{$suffix}] ?, ?, ?, ?, ?, ?, ?, ?, ?, ?";
            foreach ($validated['items'] as $item) {
                $db->statement($spGeser, [
                    $item['estHour'],
                    $item['estMinute'],
                    $item['noAntrian'],
                    $item['noOrder'],
                    $item['idBagian'],
                    $validated['noType'],
                    $validated['newDate'],
                    $validated['oldDate'],
                    $jamKerja ?? 0,
                    $user,
                ]);
            }
            $db->commit();
            return response()->json(['message' => 'Jadwal berhasil digeser.']);
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
