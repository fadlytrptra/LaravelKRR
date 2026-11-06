<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class PengerjaanFinishController extends Controller
{

    // Mapping mesin ID → suffix SP

    private function getMesinSuffix($noMesin)
    {
        $map = [
            1 => 'TURNING',
            2 => 'DRILL',
            4 => 'GRINDING',
            6 => 'LAS',
            8 => 'PUNCH',
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

        // $user = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');
        $jenis = 0;
        try {
            $r = collect($db->select('EXEC [dbo].[SP_5298_PJW_USER-PENJADWALAN] ?', [$user]))->first();
            if ($r) $jenis = (int)($r->IdJenisUser ?? 0);
        } catch (\Exception $e) {
        }

        // Hak akses tombol per jenis user
        $btnSetuju    = in_array($jenis, [1, 2, 4, 7]);
        $btnTdkSetuju = in_array($jenis, [1, 2, 4, 7]);
        $btnAccSpv    = in_array($jenis, [1, 2]);
        $btnAccPPIC   = in_array($jenis, [1, 3, 7]);
        $btnProses    = in_array($jenis, [1, 5, 7]);

        return view('GPS.JadwalPengerjaan.PengerjaanFinish', compact(
            'access',
            'jenis',
            'btnSetuju',
            'btnTdkSetuju',
            'btnAccSpv',
            'btnAccPPIC',
            'btnProses'
        ));
    }

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


    // Load jadwal per order & bagian (SP_5298_PJW_INF-JADWAL-PER-ORDER-1 kode=2/3)

    private function nullableStatusValue($value)
    {
        if (is_null($value)) {
            return null;
        }

        $value = trim((string)$value);
        return $value === '' ? null : $value;
    }

    public function getJadwal(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'idBag'   => ['required', 'integer'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $kode = ($validated['jenisOd'] === 'H') ? 2 : 3;
        $db = DB::connection('Connworkshop');

        try {
            $rows = $db->select('EXEC [dbo].[SP_5298_PJW_INF-JADWAL-PER-ORDER-1] @kode=?, @noOd=?, @noBagian=?', [
                $kode,
                $validated['noOd'],
                $validated['idBag']
            ]);

            $result = [];
            foreach ($rows as $row) {
                // Skip if Cancel=1
                if (isset($row->Cancel) && $row->Cancel == 1) continue;

                // Format JmlDikerjakan
                $jmlDikerjakan = '';
                if (isset($row->HariKe) && $row->HariKe > 0) {
                    $jmlDikerjakan = trim(($row->JmlBrg ?? '0') . ' . ' . $row->HariKe);
                } else {
                    $jmlDikerjakan = trim($row->JmlBrg ?? '0');
                }

                // Tentukan status warna (mengikuti logika VB)
                $finish = strtoupper(trim((string)($row->Finish ?? 'N')));
                $setujuKR = $this->nullableStatusValue($row->SetujuKR ?? null);
                $tdkSetuju = $this->nullableStatusValue($row->TdkSetujuKR ?? null);
                $accPPIC = $this->nullableStatusValue($row->AccPPIC ?? null);

                $status = 'default';
                if (!is_null($tdkSetuju)) {
                    $status = is_null($accPPIC) ? 'tdksetuju' : 'setuju';
                } elseif (!is_null($setujuKR) && is_null($accPPIC)) {
                    $status = 'setuju'; // Green
                } elseif ($finish === 'Y') {
                    $status = 'finish'; // DarkTurquoise
                }

                $result[] = [
                    'NoAntrian'      => $row->NoAntrian ?? '',
                    'TglStart'       => !empty($row->EstDate)
                        ? Carbon::parse($row->EstDate)->format('Y-m-d')
                        : '',
                    'NamaMesin'      => $row->NamaMesin ?? '',
                    'NamaType'       => $row->NamaType ?? '',
                    'EstTime'        => ($row->EstTimeHour ?? 0) . ' jam ' . ($row->EstTimeMinute ?? 0) . ' menit',
                    'NoMesin'        => (int)($row->NoMesin ?? 0),
                    'NoType'         => (int)($row->NoType ?? 0),
                    'NamaBagian'     => $row->NamaBagian ?? '',
                    'JmlDikerjakan'  => $jmlDikerjakan,
                    'JmlBrg'         => (int)($row->JmlBrg ?? 0), // raw JmlBrg untuk validasi
                    'IdBagian'       => (int)($row->IdBagian ?? 0),
                    'RealTime'       => ($row->RealTimeHour ?? 0) . ' jam ' . ($row->RealTimeMinute ?? 0) . ' menit',
                    'JmlFinish'      => (int)($row->JmlFinish ?? 0),
                    'TglFinish'      => $row->TglFinish ?? '',
                    'SetujuKR'       => $row->SetujuKR ?? '',
                    'TdkSetujuKR'    => $row->TdkSetujuKR ?? '',
                    'RefTdkSetujuKR' => $row->RefTdkSetujuKR ?? '',
                    'AccPPIC'        => $row->AccPPIC ?? '',
                    'Status'         => (int)($row->Status ?? 0),
                    'statusWarna'    => $status, // default | finish | setuju | tdksetuju
                ];
            }

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Proses utama (action: proses, setuju, tdksetuju, accspv, accppic)

    public function store(Request $request)
    {
        $validated = $request->validate([
            'action'   => ['required', 'string', 'in:proses,setuju,tdksetuju,accspv,accppic'],
            'noOd'     => ['required', 'string', 'max:6'],
            'idBagian' => ['required', 'integer'],
            'items'    => ['required', 'array', 'min:1'],
            'items.*.noAntrian' => ['required', 'string'],
            'items.*.noMesin'   => ['required', 'integer'],
            'items.*.noType'    => ['required', 'integer'],
            'items.*.tgl'       => ['required', 'date_format:Y-m-d'],
            'items.*.idBagian'  => ['required', 'integer'],
            'items.*.jmlBrg'    => ['nullable', 'integer'],
            'items.*.jmlFinish' => ['nullable', 'integer'],
            // Untuk operator
            'realHour'   => ['nullable', 'integer', 'min:0', 'max:23'],
            'realMinute' => ['nullable', 'integer', 'min:0', 'max:59'],
            'jmlFinish'  => ['nullable', 'integer', 'min:0'],
            'keterangan' => ['nullable', 'string', 'max:255'],
            // Untuk tdk setuju
            'alasan'     => ['nullable', 'string', 'max:255'],
        ]);

        $action   = $validated['action'];
        $noOd     = $validated['noOd'];
        $idBagian = $validated['idBagian'];
        $items    = $validated['items'];
        // $user     = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db       = DB::connection('Connworkshop');

        try {
            $db->beginTransaction();

            $processed = 0;

            if ($action === 'proses') {
                if (count($items) !== 1) {
                    $db->rollBack();
                    return response()->json(['error' => 'Pilih 1 data yang akan diproses.'], 400);
                }
                $item = $items[0];
                $suffix = $this->getMesinSuffix($item['noMesin']);
                if (!$suffix) {
                    $db->rollBack();
                    return response()->json(['error' => 'Mesin tidak dikenali.'], 400);
                }
                $prefix = $this->getMesinPrefix($item['noMesin']);

                $sp = "EXEC [dbo].[{$prefix}_OPT-FINISH-{$suffix}] @noOd=?, @idBag=?, @noAntri=?, @noType=?, @tgl=?, @realH=?, @realM=?, @jmlF=?, @ketF=?, @user=?";
                $db->statement($sp, [
                    $noOd,
                    $item['idBagian'],
                    $item['noAntrian'],
                    $item['noType'],
                    $item['tgl'],
                    $validated['realHour'] ?? 0,
                    $validated['realMinute'] ?? 0,
                    $validated['jmlFinish'] ?? 0,
                    $validated['keterangan'] ?? '',
                    $user,
                ]);
                $processed++;

                $db->commit();
                return response()->json(['message' => 'Data sudah diProses.', 'processed' => $processed]);
            }

            if ($action === 'setuju' || $action === 'tdksetuju') {
                $kode = ($action === 'setuju') ? 1 : 2;
                $alasan = $validated['alasan'] ?? '';

                if ($action === 'tdksetuju' && $alasan === '') {
                    $db->rollBack();
                    return response()->json(['error' => 'Alasan tidak boleh kosong.'], 400);
                }

                foreach ($items as $item) {
                    $suffix = $this->getMesinSuffix($item['noMesin']);
                    if (!$suffix) continue;
                    $prefix = $this->getMesinPrefix($item['noMesin']);

                    // Validasi khusus untuk setuju: jmlBrg <= jmlFinish
                    if ($action === 'setuju') {
                        $jmlBrg = (int)($item['jmlBrg'] ?? 0);
                        $jmlFinish = (int)($item['jmlFinish'] ?? 0);
                        if ($jmlBrg > $jmlFinish) {
                            // Skip item ini (mirip VB: uncheck item)
                            continue;
                        }
                    }

                    if ($action === 'setuju') {
                        $sp = "EXEC [dbo].[{$prefix}_KR-FINISH-{$suffix}] @kode=?, @noType=?, @tgl=?, @noAntri=?, @noOd=?, @idBag=?, @user=?";
                        $db->statement($sp, [
                            $kode,
                            $item['noType'],
                            $item['tgl'],
                            $item['noAntrian'],
                            $noOd,
                            $item['idBagian'],
                            $user,
                        ]);
                    } else {
                        $sp = "EXEC [dbo].[{$prefix}_KR-FINISH-{$suffix}] @kode=?, @noType=?, @tgl=?, @noAntri=?, @noOd=?, @idBag=?, @user=?, @ref=?";
                        $db->statement($sp, [
                            $kode,
                            $item['noType'],
                            $item['tgl'],
                            $item['noAntrian'],
                            $noOd,
                            $item['idBagian'],
                            $user,
                            $alasan,
                        ]);
                    }
                    $processed++;
                }

                $db->commit();
                if ($processed > 0) {
                    return response()->json(['message' => 'Data sudah diProses.', 'processed' => $processed]);
                }
                return response()->json(['error' => 'Tidak ada data yang bisa diproses.'], 400);
            }

            if ($action === 'accspv') {
                // Proses setiap item
                foreach ($items as $item) {
                    $suffix = $this->getMesinSuffix($item['noMesin']);
                    if (!$suffix) continue;
                    $prefix = $this->getMesinPrefix($item['noMesin']);

                    $sp = "EXEC [dbo].[{$prefix}_SPV-FINISH-{$suffix}] @noOd=?, @idBag=?, @noAntri=?, @noType=?, @tgl=?, @user=?";
                    $db->statement($sp, [
                        $noOd,
                        $item['idBagian'],
                        $item['noAntrian'],
                        $item['noType'],
                        $item['tgl'],
                        $user,
                    ]);
                    $processed++;
                }

                // SP_5298_PJW_FINISH-TOTAL
                $db->statement('EXEC [dbo].[SP_5298_PJW_FINISH-TOTAL] ?, ?', [$noOd, $idBagian]);

                $db->commit();
                return response()->json(['message' => 'Data sudah diProses.', 'processed' => $processed]);
            }

            if ($action === 'accppic') {
                foreach ($items as $item) {
                    $suffix = $this->getMesinSuffix($item['noMesin']);
                    if (!$suffix) continue;
                    $prefix = $this->getMesinPrefix($item['noMesin']);

                    $sp = "EXEC [dbo].[{$prefix}_PPIC-FINISH-{$suffix}] @noType=?, @tgl=?, @noAntri=?, @noOd=?, @idBag=?, @user=?";
                    $db->statement($sp, [
                        $item['noType'],
                        $item['tgl'],
                        $item['noAntrian'],
                        $noOd,
                        $item['idBagian'],
                        $user,
                    ]);
                    $processed++;
                }

                $db->commit();
                return response()->json(['message' => 'Data sudah diProses.', 'processed' => $processed]);
            }

            $db->rollBack();
            return response()->json(['error' => 'Aksi tidak dikenal.'], 400);
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
