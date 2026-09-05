<?php

namespace App\Http\Controllers\Guard\Pemeriksaan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Carbon\Carbon;

class SJSudahKirimCustomerController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Guard');

        return view(
            'Guard.Pemeriksaan.SJSudahKirimCustomer',
            compact('access')
        );
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Request $request, $id)
    {
        if ($id === 'getData') {

            $tgl_awal  = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');

            $query = DB::connection('ConnGuard')
                ->table('Header_PemeriksaanBarang as h')
                ->select(
                    'h.idHeader',
                    'h.tanggal',
                    'h.jam_muat_awal',
                    'h.jam_muat_akhir',
                    'h.instansi',
                    'h.tujuan_kirim',
                    'h.sopir',
                    'h.user_acc',
                    'h.time_accGudang',
                    'h.surat_jalanTerdaftar'
                );

            if (!empty($tgl_awal)) {
                $query->whereDate(
                    'h.tanggal',
                    '>=',
                    $tgl_awal
                );
            }

            if (!empty($tgl_akhir)) {
                $query->whereDate(
                    'h.tanggal',
                    '<=',
                    $tgl_akhir
                );
            }

            $headers = $query
                ->orderBy('h.tanggal', 'desc')
                ->orderBy('h.idHeader', 'desc')
                ->get();

            $response = [];

            foreach ($headers as $header) {

                // Tidak ada surat jalan
                if (empty($header->surat_jalanTerdaftar)) {
                    continue;
                }

                $dataPengiriman = DB::connection('ConnSales')
                    ->table('T_HeaderPengiriman as HP')
                    ->where('HP.KirimCUstomer', 1)
                    ->whereRaw("
                        CHARINDEX(
                            ',' + CAST(HP.IDPengiriman AS varchar(50)) + ',',
                            ',' + REPLACE(?, ' ', '') + ','
                        ) > 0
                    ", [
                        $header->surat_jalanTerdaftar
                    ])
                    ->whereNotNull('HP.AccSatpam')
                    ->orderByDesc('HP.IdHeaderKirim')
                    ->select(
                        'HP.IDPengiriman',
                        'HP.AccSatpam',
                        'HP.IdHeaderKirim'
                    )
                    ->first();


                if (!$dataPengiriman) {
                    continue;
                }

                $namaExpeditor = trim(
                    (string) ($header->instansi ?? '')
                );

                if (!empty($header->instansi) && is_numeric($header->instansi)) {
                    $dataExpeditor = DB::connection('ConnSales')
                        ->table('T_Expeditor')
                        ->where(
                            'IDExpeditor',
                            (int) $header->instansi
                        )
                        ->select(
                            'IDExpeditor',
                            'NamaExpeditor'
                        )
                        ->first();

                    if ($dataExpeditor) {
                        $namaExpeditor = trim(
                            (string) $dataExpeditor->NamaExpeditor
                        );
                    }
                }

                $namaAccGudang = '';

                if (!empty($header->user_acc)) {
                    $dataUserGudang = DB::connection('ConnEDP')
                        ->table('UserMaster')
                        ->where(
                            'NomorUser',
                            trim($header->user_acc)
                        )
                        ->select(
                            'NomorUser',
                            'NamaUser'
                        )
                        ->first();

                    if ($dataUserGudang) {
                        $namaAccGudang = trim(
                            $dataUserGudang->NamaUser
                        );
                    }
                }

                $namaAccSatpam = '';
                if (!empty($dataPengiriman->AccSatpam)) {
                    $dataUserSatpam = DB::connection('ConnEDP')
                        ->table('UserMaster')
                        ->where(
                            'NomorUser',
                            trim($dataPengiriman->AccSatpam)
                        )
                        ->select(
                            'NomorUser',
                            'NamaUser'
                        )
                        ->first();

                    if ($dataUserSatpam) {
                        $namaAccSatpam = trim(
                            $dataUserSatpam->NamaUser
                        );
                    }
                }

                $response[] = [
                    'idHeader' => trim((string) $header->idHeader),
                    'tanggal' => $header->tanggal
                        ? Carbon::parse($header->tanggal)
                            ->format('m/d/Y')
                        : '',
                    'tanggal_raw' => $header->tanggal
                        ? Carbon::parse($header->tanggal)
                            ->format('Y-m-d')
                        : '',
                    'jam_muat' => ($header->jam_muat_awal && $header->jam_muat_akhir)
                        ? Carbon::parse($header->jam_muat_awal)
                            ->format('H:i')
                            . ' - ' .
                            Carbon::parse($header->jam_muat_akhir)
                            ->format('H:i')
                        : '',
                    'instansi' => $namaExpeditor,
                    'tujuan_kirim' => trim((string) ($header->tujuan_kirim ?? '')),
                    'sopir' => trim((string) ($header->sopir ?? '')),
                    'acc_gudang' => $namaAccGudang,
                    'waktu_acc_gudang' => $header->time_accGudang
                        ? Carbon::parse($header->time_accGudang)->format('m/d/Y H:i')
                        : '',
                    'acc_satpam' => $namaAccSatpam,
                ];
            }

            return datatables($response)->make(true);
        }

        abort(404);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}