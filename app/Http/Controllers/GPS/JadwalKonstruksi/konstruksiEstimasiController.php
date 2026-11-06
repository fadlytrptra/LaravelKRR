<?php

namespace App\Http\Controllers\GPS\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class konstruksiEstimasiController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');

        return view('GPS.JadwalKonstruksi.konstruksiEstimasi', compact('access'));
    }

    public function getOrder(Request $request)
    {
        $validated = $request->validate([
            'noOd' => ['required', 'string', 'max:6'],
            'proses' => ['nullable', 'integer', 'in:1,2,3'],
        ]);

        $noOd = $validated['noOd'];
        $proses = $validated['proses'] ?? null;
        $db = DB::connection('Connworkshop');

        try {
            $order = collect($db->select('EXEC [SP_5298_PJW_LIST-ORDER-GAMBAR] ?, ?', [1, $noOd]))->first();

            if (!$order) {
                return response()->json(['error' => "Nomer order gambar: $noOd tidak ada, belum di-ACC, ditolak, atau sudah finish."], 404);
            }

            $response = [
                'TDivisi' => $order->NamaDivisi ?? '',
                'TKdBrg' => $order->Kd_Brg ?? '',
                'TNamaBrg' => $order->Nama_Brg ?? '',
                'TNoGbr' => $order->No_Gbr_Rev ?? '',
                'OdSts' => $order->OdSts ?? '',
                'TKetOrder' => $order->Ket_Order ?? '',
                'TMesin1' => $order->Mesin ?? '',
                'TUserOrder' => $order->Pengorder ?? '',
                'TTglStart' => Carbon::now()->format('Y-m-d'),
                'TTglFinish' => Carbon::now()->format('Y-m-d')
            ];

            if ($proses == 2 || $proses == 3) {
                $cekEst = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] ?', [$noOd]))->first();

                if (!$cekEst || $cekEst->ada == 0) {
                    return response()->json(['error' => "No. order $noOd belum pernah diinputkan estimasinya."], 400);
                } else {
                    $response['TTglStart'] = Carbon::parse($cekEst->TglS)->format('Y-m-d');
                    $response['TTglFinish'] = Carbon::parse($cekEst->TglF)->format('Y-m-d');
                }
            }

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'proses' => ['required', 'integer', 'in:1,2,3'],
            'noOd' => ['required', 'string', 'max:6'],
            'tglStart' => ['required', 'date_format:Y-m-d'],
            'tglFinish' => ['required', 'date_format:Y-m-d', 'after_or_equal:tglStart'],
        ]);

        $proses = $validated['proses'];
        $noOd = $validated['noOd'];
        $tglStart = $validated['tglStart'];
        $tglFinish = $validated['tglFinish'];

        // $ppic = auth()->user()->username ?? 'SYSTEM';
        $ppic = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');

        try {

            if ($proses == 1) {
                $cekEst = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] ?', [$noOd]))->first();
                if ($cekEst && $cekEst->ada > 0) {
                    $db->rollBack();
                    return response()->json(['error' => "No. Order $noOd sudah ada."], 400);
                }
            } elseif ($proses == 2) {
                $est = collect($db->select('EXEC [dbo].[SP_5298_PJW_ESTIMASI_KONSTRUKSI] ?', [$noOd]))->first();
                if ($est) {
                    $tglMulai = Carbon::parse($est->TglMulai)->startOfDay();
                    $sampaiTgl = Carbon::parse($est->SampaiTgl)->startOfDay();
                    $reqStart = Carbon::parse($tglStart)->startOfDay();
                    $reqFinish = Carbon::parse($tglFinish)->startOfDay();

                    if ($reqStart > $tglMulai) {
                        $db->rollBack();
                        return response()->json(['error' => "Tidak dapat dikoreksi, karena sudah terjadwal mulai tgl " . $tglMulai->format('d-m-Y') . ", dan estimasi tgl start > jadwal mulai."], 400);
                    }
                    if ($reqFinish < $sampaiTgl) {
                        $db->rollBack();
                        return response()->json(['error' => "Tidak dapat dikoreksi, karena sudah terjadwal sampai tgl " . $sampaiTgl->format('d-m-Y') . ", dan tgl finish < tgl terjadwal."], 400);
                    }
                }
            } elseif ($proses == 3) {
                $cekTrx = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-TRANSAKSI-KONSTRUKSI] ?', [$noOd]))->first();
                if ($cekTrx && $cekTrx->ada > 0) {
                    $db->rollBack();
                    return response()->json(['error' => "Tidak bisa dihapus, karena sudah terjadwal."], 400);
                }
            }

            if ($proses == 1 || $proses == 2) {
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-ESTIMASI-KONSTRUKSI] @kode = ?, @noOd = ?, @tglStart = ?, @tglFinish = ?, @ppic = ?', [
                    $proses,
                    $noOd,
                    $tglStart,
                    $tglFinish,
                    $ppic
                ]);
            } elseif ($proses == 3) {
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-ESTIMASI-KONSTRUKSI] @kode = ?, @noOd = ?', [
                    $proses,
                    $noOd
                ]);
            }

            $msgAction = $proses == 1 ? "Disimpan" : ($proses == 2 ? "DiKoreksi" : "DiHapus");
            return response()->json(['message' => "Data telah $msgAction."]);
        } catch (\Exception $e) {
            if (isset($db)) {
                $db->rollBack();
            }
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
