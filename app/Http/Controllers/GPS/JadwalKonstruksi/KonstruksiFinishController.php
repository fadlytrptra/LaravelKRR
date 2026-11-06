<?php

namespace App\Http\Controllers\GPS\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class KonstruksiFinishController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        // $user = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');
        $jenis = 0;
        try {
            $result = collect($db->select('EXEC [dbo].[SP_5298_PJW_USER-PENJADWALAN] ?', [$user]))->first();
            if ($result) {
                $jenis = (int) $this->resultValue($result, 'IdJenisUser', 0);
            }
        } catch (\Exception $e) {
            Log::error('Gagal mengambil jenis user Finish Jadwal Konstruksi.', [
                'user' => $user,
                'error' => $e->getMessage(),
            ]);
        }

        $btnSetuju   = in_array($jenis, [1, 12, 13]) ? true : false;
        $btnTdkSetuju = in_array($jenis, [1, 12, 13]) ? true : false;
        $btnAccSpv   = in_array($jenis, [1, 12]) ? true : false;
        $btnAccPPIC  = in_array($jenis, [1, 12, 13]) ? true : false;
        $btnProses   = in_array($jenis, [1, 12, 13, 14]) ? true : false;

        return view('GPS.JadwalKonstruksi.konstruksiFinish', compact(
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
            $ada = $est->Ada ?? $est->ada ?? 0;
            if (!$est || $ada == 0) {
                return response()->json(['error' => "No. Order $noOd belum ada estimasi jadwalnya. Hubungi PPIC."], 400);
            }
            $response['EstStart']  = Carbon::parse($est->TglS)->format('Y-m-d');
            $response['EstFinish'] = Carbon::parse($est->TglF)->format('Y-m-d');
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
            $rows = $db->select('EXEC [dbo].[SP_5298_PJW_INF-KONSTRUKSI-PER-ORDER-1] @kode=?, @noOd=?, @noBagian=?', [1, $noOd, $idBagian]);
            $result = [];
            foreach ($rows as $row) {
                if (isset($row->Cancel) && $row->Cancel == 1) continue;
                $estDate = $row->EstDate ?? null;
                $item = [
                    'NoAntrian'      => $row->NoAntrian ?? '',
                    'EstDate'        => $estDate ?? '',
                    'estDateValue'   => $estDate ? Carbon::parse($estDate)->format('Y-m-d') : '',
                    'NamaWorkStation' => $row->NamaWorkStation ?? '',
                    'NoWrkSts'       => $row->NoWrkSts ?? 0,
                    'EstTime'        => ($row->EstTimeHour ?? 0) . ' jam ' . ($row->EstTimeMinute ?? 0) . ' menit',
                    'HariKe'         => $row->HariKe ?? 0,
                    'RealTime'       => ($row->RealTimeHour ?? 0) . ' jam ' . ($row->RealTimeMinute ?? 0) . ' menit',
                    'RealTimeHour'   => (int)($row->RealTimeHour ?? 0),
                    'RealTimeMinute' => (int)($row->RealTimeMinute ?? 0),
                    'TglFinish'      => $row->TglFinish ?? '',
                    'SetujuKR'       => $row->SetujuKR ?? '',
                    'TdkSetujuKR'    => $row->TdkSetujuKR ?? '',
                    'RefTdkSetujuKR' => $row->RefTdkSetujuKR ?? '',
                    'AccPPIC'        => $row->AccPPIC ?? '',
                    'Finish'         => $row->Finish ?? 'N',
                ];
                // tentukan status warna
                // if ($row->Finish == 'Y') {
                //     $item['status'] = 'finish'; // DarkTurquoise
                // } elseif (!is_null($row->SetujuKR) && is_null($row->TdkSetujuKR)) {
                //     $item['status'] = 'setuju'; // Green
                // } elseif (!is_null($row->TdkSetujuKR) && is_null($row->AccPPIC)) {
                //     $item['status'] = 'tdksetuju'; // Orange
                // } elseif (!is_null($row->SetujuKR) && !is_null($row->TdkSetujuKR) && !is_null($row->AccPPIC)) {
                //     $item['status'] = 'setuju'; // Green
                // } else {
                //     $item['status'] = 'default'; // hitam
                // }
                // $result[] = $item;

                // tentukan status warna menggunakan safe null operator (?? null)
                $finish      = $row->Finish ?? 'N';
                $setujuKR    = $row->SetujuKR ?? null;
                $tdkSetujuKR = $row->TdkSetujuKR ?? null;
                $accPPIC     = $row->AccPPIC ?? null;

                if ($finish == 'Y') {
                    $item['status'] = 'finish'; // DarkTurquoise
                } elseif (!is_null($setujuKR) && is_null($tdkSetujuKR)) {
                    $item['status'] = 'setuju'; // Green
                } elseif (!is_null($tdkSetujuKR) && is_null($accPPIC)) {
                    $item['status'] = 'tdksetuju'; // Orange
                } elseif (!is_null($setujuKR) && !is_null($tdkSetujuKR) && !is_null($accPPIC)) {
                    $item['status'] = 'setuju'; // Green
                } else {
                    $item['status'] = 'default'; // hitam
                }
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
            'action'     => ['required', 'string', 'in:proses,setuju,tdksetuju,accspv,accppic'],
            'noOd'       => ['required', 'string', 'max:6'],
            'idBagian'   => ['required', 'integer'],
            'items'      => ['required', 'array'],
            'items.*.noAntrian' => ['required', 'string'],
            'items.*.noWrkSts'  => ['required', 'integer'],
            'items.*.estDate'   => ['required', 'date_format:Y-m-d'],
            'items.*.status'    => ['nullable', 'string', 'in:default,finish,setuju,tdksetuju'],
            'realHour'   => ['nullable', 'integer', 'min:0'],
            'realMinute' => ['nullable', 'integer', 'min:0', 'max:59'],
            'keterangan' => ['nullable', 'string', 'max:255'],
            'alasan'     => ['nullable', 'string', 'max:255'],
        ]);

        $action   = $validated['action'];
        $noOd     = $validated['noOd'];
        $idBagian = $validated['idBagian'];
        $items    = $validated['items'];
        // $user     = auth()->user()->username ?? 'SYSTEM';
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');

        try {
            $jenis = $this->userJenis($db, $user);
            //commet atas uncommet bawah untuk test all akses
            // @$jenis = 1;
            $allowedActions = [
                1 => ['proses', 'setuju', 'tdksetuju', 'accspv', 'accppic'],
                12 => ['proses', 'setuju', 'tdksetuju', 'accspv', 'accppic'],
                13 => ['proses', 'setuju', 'tdksetuju', 'accppic'],
                14 => ['proses'],
            ];
            if (!in_array($action, $allowedActions[$jenis] ?? [], true)) {
                return response()->json(['error' => 'Anda tidak memiliki hak akses untuk aksi ini.'], 403);
            }

            $statusAllowed = [
                'proses' => $jenis === 14
                    ? ['default', 'finish']
                    : ['default', 'finish', 'setuju', 'tdksetuju'],
                'setuju' => ['finish', 'tdksetuju'],
                'tdksetuju' => ['finish', 'setuju'],
                'accspv' => ['setuju'],
                'accppic' => ['tdksetuju'],
            ];

            foreach ($items as $item) {
                $current = $this->findScheduleRow($db, $noOd, $idBagian, $item);
                if (!$current || !in_array($this->rowStatus($current), $statusAllowed[$action], true)) {
                    return response()->json(['error' => 'Status data berubah atau tidak sesuai untuk aksi ini.'], 409);
                }
            }

            if ($action == 'proses') {
                if (count($items) != 1) {
                    return response()->json(['error' => 'Pilih 1 data yang akan diproses.'], 400);
                }
                $item = $items[0];
                $est = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] @noOd=?', [$noOd]))->first();
                $ada = $est->Ada ?? $est->ada ?? 0;
                if (!$est || $ada == 0) {
                    return response()->json(['error' => 'Estimasi tidak ditemukan.'], 400);
                }
                $estFinish = Carbon::parse($est->TglF);
                $today = Carbon::today();
                if ($estFinish < $today) {
                    return response()->json(['error' => 'Est. finish lebih kecil dari tgl hari ini. Hubungi PPIC.'], 400);
                }
                $estDate = Carbon::parse($item['estDate']);
                if ($estDate > $today) {
                    return response()->json(['error' => 'Tgl finish lebih kecil dari tgl start.'], 400);
                }
                $realHour   = $validated['realHour'] ?? 0;
                $realMinute = $validated['realMinute'] ?? 0;
                $keterangan = $validated['keterangan'] ?? '';
                $db->statement('EXEC [dbo].[SP_5298_PJW_OPT-FINISH-KONSTRUKSI] @idBag=?, @noAntri=?, @worksts=?, @tgl=?, @realH=?, @realM=?, @ketF=?, @user=?', [
                    $idBagian,
                    $item['noAntrian'],
                    $item['noWrkSts'],
                    $item['estDate'],
                    $realHour,
                    $realMinute,
                    $keterangan,
                    $user,
                ]);
                return response()->json(['message' => 'Data sudah diproses.']);
            } elseif ($action == 'setuju') {
                $count = 0;
                foreach ($items as $item) {
                    $current = collect($db->select('EXEC [dbo].[SP_5298_PJW_JADWAL-KONSTRUKSI] @kode=?, @noAntri=?, @date=?, @worksts=?', [1, $item['noAntrian'], $item['estDate'], $item['noWrkSts']]))->first();
                    if (!$current) continue;
                    $finish     = $current->Finish ?? 'N';
                    $setujuKR   = $current->SetujuKR ?? null;;
                    $tdkSetujuKR = $current->TdkSetujuKR ?? null;;
                    if ($finish == 'Y' && is_null($setujuKR) && is_null($tdkSetujuKR)) {
                        $db->statement('EXEC [dbo].[SP_5298_PJW_KR-FINISH-KONSTRUKSI] @kode=?, @noWrkSts=?, @tgl=?, @noAntri=?, @idBag=?, @user=?', [
                            1,
                            $item['noWrkSts'],
                            $item['estDate'],
                            $item['noAntrian'],
                            $idBagian,
                            $user,
                        ]);
                        $count++;
                    } elseif (!is_null($tdkSetujuKR) && is_null($setujuKR)) {
                        $db->statement('EXEC [dbo].[SP_5298_PJW_PPIC-FINISH-KONSTRUKSI] @noWrkSts=?, @tgl=?, @noAntri=?, @idBag=?, @user=?', [
                            $item['noWrkSts'],
                            $item['estDate'],
                            $item['noAntrian'],
                            $idBagian,
                            $user,
                        ]);
                        $count++;
                    }
                }
                if ($count > 0) {
                    return response()->json(['message' => 'Data sudah diproses.']);
                } else {
                    return response()->json(['error' => 'Tidak ada data yang bisa diproses.'], 400);
                }
            } elseif ($action == 'tdksetuju') {
                $alasan = $validated['alasan'] ?? '';
                if (empty($alasan)) {
                    return response()->json(['error' => 'Alasan tidak boleh kosong.'], 400);
                }
                $count = 0;
                foreach ($items as $item) {
                    $current = $this->findScheduleRow($db, $noOd, $idBagian, $item);
                    if (!$current) continue;
                    $finish = strtoupper(trim((string) $this->resultValue($current, 'Finish', 'N')));
                    $setujuKR = $this->nullableResultValue($current, 'SetujuKR');
                    $tdkSetujuKR = $this->nullableResultValue($current, 'TdkSetujuKR');
                    if (($finish == 'Y' || !is_null($setujuKR)) && is_null($tdkSetujuKR)) {
                        $db->statement('EXEC [dbo].[SP_5298_PJW_KR-FINISH-KONSTRUKSI] @kode=?, @worksts=?, @tgl=?, @noAntri=?, @idBag=?, @user=?, @ref=?', [
                            2,
                            $item['noWrkSts'],
                            $item['estDate'],
                            $item['noAntrian'],
                            $idBagian,
                            $user,
                            $alasan,
                        ]);
                        $count++;
                    }
                }
                if ($count > 0) {
                    return response()->json(['message' => 'Data sudah diproses.']);
                } else {
                    return response()->json(['error' => 'Tidak ada data yang bisa diproses.'], 400);
                }
            } elseif ($action == 'accspv') {
                foreach ($items as $item) {
                    $current = collect($db->select('EXEC [dbo].[SP_5298_PJW_JADWAL-KONSTRUKSI] @kode=?, @noAntri=?, @date=?, @worksts=?', [1, $item['noAntrian'], $item['estDate'], $item['noWrkSts']]))->first();
                    if (!$current) continue;
                    $setujuKR = $current->SetujuKR ?? null;;
                    if (is_null($setujuKR)) {
                        return response()->json(['error' => 'Tidak bisa diACC, karena proses kerjanya belum Finish semua.'], 400);
                    }
                }
                foreach ($items as $item) {
                    $db->statement('EXEC [dbo].[SP_5298_PJW_SPV-FINISH-KONSTRUKSI] @idBag=?, @noAntri=?, @worksts=?, @tgl=?, @user=?', [
                        $idBagian,
                        $item['noAntrian'],
                        $item['noWrkSts'],
                        $item['estDate'],
                        $user,
                    ]);
                }
                $db->statement('EXEC [dbo].[SP_5298_PJW_FINISH-KONSTRUKSI-TOTAL] @idBagian=?', [$idBagian]);
                return response()->json(['message' => 'Data sudah diproses.']);
            } elseif ($action == 'accppic') {
                foreach ($items as $item) {
                    $current = collect($db->select('EXEC [dbo].[SP_5298_PJW_JADWAL-KONSTRUKSI] @kode=?, @noAntri=?, @date=?, @worksts=?', [1, $item['noAntrian'], $item['estDate'], $item['noWrkSts']]))->first();
                    if (!$current) continue;
                    $tdkSetujuKR = $current->TdkSetujuKR ?? null;;
                    $accPPIC = $current->AccPPIC ?? null;;
                    if (is_null($tdkSetujuKR) || !is_null($accPPIC)) {
                        return response()->json(['error' => 'Item harus dalam status Tdk Disetujui dan belum diACC.'], 400);
                    }
                }
                foreach ($items as $item) {
                    $db->statement('EXEC [dbo].[SP_5298_PJW_PPIC-FINISH-KONSTRUKSI] @worksts=?, @tgl=?, @noAntri=?, @idBag=?, @user=?', [
                        $item['noWrkSts'],
                        $item['estDate'],
                        $item['noAntrian'],
                        $idBagian,
                        $user,
                    ]);
                }
                return response()->json(['message' => 'Data sudah diproses.']);
            }
            return response()->json(['error' => 'Aksi tidak dikenal.'], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    private function userJenis($db, $user): int
    {
        $result = collect($db->select(
            'EXEC [dbo].[SP_5298_PJW_USER-PENJADWALAN] ?',
            [$user]
        ))->first();

        return (int) $this->resultValue($result, 'IdJenisUser', 0);
    }

    private function findScheduleRow($db, string $noOd, int $idBagian, array $item)
    {
        $rows = $db->select(
            'EXEC [dbo].[SP_5298_PJW_INF-KONSTRUKSI-PER-ORDER-1] @kode=?, @noOd=?, @noBagian=?',
            [1, $noOd, $idBagian]
        );

        foreach ($rows as $row) {
            $rowDate = $this->resultValue($row, 'EstDate');
            $rowDate = $rowDate ? Carbon::parse($rowDate)->format('Y-m-d') : '';

            if (
                trim((string) $this->resultValue($row, 'NoAntrian', '')) === trim((string) $item['noAntrian'])
                && $rowDate === $item['estDate']
                && (int) $this->resultValue($row, 'NoWrkSts', 0) === (int) $item['noWrkSts']
            ) {
                return $row;
            }
        }

        return null;
    }

    private function rowStatus($row): string
    {
        $finish = strtoupper(trim((string) $this->resultValue($row, 'Finish', 'N')));
        $setuju = $this->nullableResultValue($row, 'SetujuKR');
        $tdkSetuju = $this->nullableResultValue($row, 'TdkSetujuKR');
        $accPPIC = $this->nullableResultValue($row, 'AccPPIC');

        if ($finish === 'Y') {
            return 'finish';
        }
        if (!is_null($setuju) && is_null($tdkSetuju)) {
            return 'setuju';
        }
        if (!is_null($tdkSetuju) && is_null($accPPIC)) {
            return 'tdksetuju';
        }
        if (!is_null($setuju) && !is_null($tdkSetuju) && !is_null($accPPIC)) {
            return 'setuju';
        }

        return 'default';
    }

    private function nullableResultValue($result, string $key)
    {
        $value = $this->resultValue($result, $key);

        return $value === null || trim((string) $value) === '' ? null : $value;
    }

    private function resultValue($result, string $key, $default = null)
    {
        if (!$result) {
            return $default;
        }

        foreach (get_object_vars($result) as $name => $value) {
            if (strcasecmp($name, $key) === 0) {
                return $value;
            }
        }

        return $default;
    }
}
