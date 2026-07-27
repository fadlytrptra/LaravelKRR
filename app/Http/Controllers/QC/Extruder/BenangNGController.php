<?php

namespace App\Http\Controllers\QC\Extruder;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class BenangNGController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        $listMesin = DB::connection('ConnExtruder')
            ->table('MasterMesin')
            ->select('IdMesin', 'TypeMesin')
            ->where('Aktif', 'Y')
            ->get();
        $listLokasi = DB::connection('ConnTestQC')
            ->table('Lokasi')
            ->select('idLokasi', 'nama_lokasi')
            ->get();
        // $filtered = array_values(array_filter($listTypeMesin, function ($item) {
        //     return in_array($item->IdType_Mesin, ['13', '17']);
        // }));
        // // dd($filtered);
        // usort($filtered, function ($a, $b) {
        //     return intval($a->IdType_Mesin) - intval($b->IdType_Mesin);
        // });
        // $listLokasi = collect($listLokasi)
        //     ->whereIn('idLokasi', [1])
        //     ->values();
        return view('QC.Extruder.BenangNG', compact('access', 'listLokasi', 'listMesin'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $proses = $request->input('proses');
        $proses = $request->input('proses');
        $tanggal = $request->input('tanggal');
        $id_laporan = $request->input('id_laporan');
        $shift = $request->input('shift');
        $lokasi = $request->input('lokasi');
        $mesin = $request->input('mesin');
        $jam_prod = $request->input('jam_prod');
        $tanggal = $request->input('tanggal');
        $spek_benang = $request->input('spek_benang');
        $jumlah = $request->input('jumlah');
        $keterangan = $request->input('keterangan');
        $kel_samping = $request->input('kel_samping');
        $bendol = $request->input('bendol');
        $tebal = $request->input('tebal');
        $nglinting = $request->input('nglinting');
        $berbulu = $request->input('berbulu');
        $tipis = $request->input('tipis');
        $besar = $request->input('besar');
        $kecil = $request->input('kecil');
        $warna_lain = $request->input('warna_lain');
        $luka = $request->input('luka');
        $trial_warna = $request->input('trial_warna');
        $pinggiran = $request->input('pinggiran');
        $st_jelek = $request->input('st_jelek');
        $elongation = $request->input('elongation');
        $setting_lain2 = $request->input('setting_lain2');
        $sebab_ng = $request->input('sebab_ng');
        $down_grade = $request->input('down_grade');
        $up_grade = $request->input('up_grade');
        $reject = $request->input('reject');
        $supply = $request->input('supply');
        $user = trim(Auth::user()->NomorUser);
        // dd($request->all());
        try {
            // dd($request->all());
            switch ($proses) {
                case 1:
                    // Simpan
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_BenangNG 
                        @kode = ?,
                        @user = ?,
                        @lokasi = ?,
                        @tanggal = ?,
                        @mesin = ?,
                        @shift = ?,
                        @jam_prod = ?,
                        @spek_benang = ?,
                        @jumlah = ?,
                        @keterangan = ?,
                        @kel_samping = ?,
                        @bendol = ?,
                        @tebal = ?,
                        @nglinting = ?,
                        @berbulu = ?,
                        @tipis = ?,
                        @besar = ?,
                        @kecil = ?,
                        @warna_lain = ?,
                        @luka = ?,
                        @trial_warna = ?,
                        @pinggiran = ?,
                        @st_jelek = ?,
                        @elongation = ?,
                        @setting_lain2 = ?,
                        @sebab_ng = ?,
                        @down_grade = ?,
                        @up_grade = ?,
                        @reject = ?,
                        @supply = ?',
                            [
                                1,
                                $user,
                                $lokasi,
                                $tanggal,
                                $mesin,
                                $shift,
                                $jam_prod,
                                $spek_benang,
                                $jumlah,
                                $keterangan,
                                $kel_samping,
                                $bendol,
                                $tebal,
                                $nglinting,
                                $berbulu,
                                $tipis,
                                $besar,
                                $kecil,
                                $warna_lain,
                                $luka,
                                $trial_warna,
                                $pinggiran,
                                $st_jelek,
                                $elongation,
                                $setting_lain2,
                                $sebab_ng,
                                $down_grade,
                                $up_grade,
                                $reject,
                                $supply,
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil disimpan!']);

                case 2:
                    // Koreksi
                    // dd($request->all());
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_BenangNG 
                        @kode = ?,
                        @id_laporan = ?,
                        @user = ?,
                        @tanggal = ?,
                        @mesin = ?,
                        @shift = ?,
                        @jam_prod = ?,
                        @spek_benang = ?,
                        @jumlah = ?,
                        @keterangan = ?,
                        @kel_samping = ?,
                        @bendol = ?,
                        @tebal = ?,
                        @nglinting = ?,
                        @berbulu = ?,
                        @tipis = ?,
                        @besar = ?,
                        @kecil = ?,
                        @warna_lain = ?,
                        @luka = ?,
                        @trial_warna = ?,
                        @pinggiran = ?,
                        @st_jelek = ?,
                        @elongation = ?,
                        @setting_lain2 = ?,
                        @sebab_ng = ?,
                        @down_grade = ?,
                        @up_grade = ?,
                        @reject = ?,
                        @supply = ?',
                            [
                                2,
                                $id_laporan,
                                $user,
                                $tanggal,
                                $mesin,
                                $shift,
                                $jam_prod,
                                $spek_benang,
                                $jumlah,
                                $keterangan,
                                $kel_samping,
                                $bendol,
                                $tebal,
                                $nglinting,
                                $berbulu,
                                $tipis,
                                $besar,
                                $kecil,
                                $warna_lain,
                                $luka,
                                $trial_warna,
                                $pinggiran,
                                $st_jelek,
                                $elongation,
                                $setting_lain2,
                                $sebab_ng,
                                $down_grade,
                                $up_grade,
                                $reject,
                                $supply,
                            ]
                        );

                    return response()->json(['message' => 'Keterangan berhasil diupdate!']);

                case 3:
                    // Delete
                    // dd($request->all());    
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_BenangNG @kode = ?, @id_laporan = ?, @user = ?',
                            [3, $id_laporan, $user]
                        );

                    return response()->json(['message' => 'Data berhasil dihapus!']);

                case 4:
                    // Update Sortir & Supply
                    // dd($request->all());    
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_BenangNG @kode = ?, @id_laporan = ?, @down_grade = ?, @up_grade = ?, @reject = ?, @supply = ?',
                            [4, $id_laporan, $down_grade, $up_grade, $reject, $supply]
                        );

                    return response()->json(['message' => 'Berhasil update sortir dan supply!']);

                // return response()->json(['message' => 'Data berhasil dihapus!']);

                default:
                    return response()->json(['error', 'Proses tidak valid']);
            }

        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $tgl_awal = $request->input('tgl_awalBawah');
            $tgl_akhir = $request->input('tgl_akhirBawah');
            $lokasi = $request->input('lokasi');
            $user = trim(Auth::user()->NomorUser);
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_BenangNG @kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [5, $tgl_awal, $tgl_akhir, $lokasi]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'id_laporan' => trim($row->id_laporan),
                    'shift' => trim($row->shift),
                    'jam_prod' => Carbon::parse($row->jam_prod)->format('H:i'),
                    'TypeMesin' => $row->TypeMesin,
                    'spek_benang' => trim($row->spek_benang),
                    'NamaUser' => trim($row->NamaUser),
                    'user_acc' => trim($row->user_acc),
                    'user' => trim($user),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataKoreksi') {
            $id_laporan = $request->input('id_laporan');
            // dd($id_laporan);
            $results = DB::connection('ConnTestQC')
                ->table('BenangNG as l')
                ->leftJoin('EXTRUDER.DBO.MasterMesin as m', 'l.mesin', '=', 'm.IdMesin')
                ->where('l.id_laporan', $id_laporan)
                ->select('l.*', 'm.TypeMesin')
                ->get();
            if ($results) {
                $user_input = trim($results[0]->user_input);
                $user_acc = trim($results[0]->user_acc);
                // $userVerified = trim($results[0]->userVerified) ?? '';
            }
            // dd($results);
            $ttdRaw = DB::connection('ConnEDP')
                ->select('EXEC SP_4451_EDP_MaintenanceTTDUser @XKode = ?, @XNomorUser = ?', [2, $user_input]);
            $ttd = null;
            if (!empty($ttdRaw)) {
                $row = $ttdRaw[0]; // ttd pasti 1 baris
                $ttd = [
                    'NamaUser' => $row->NamaUser,
                    'FotoTtd' => trim($row->FotoTtd) ?? '',
                ];
            }

            if ($user_acc !== null) {
                $ttdRaw2 = DB::connection('ConnEDP')
                    ->select('EXEC SP_4451_EDP_MaintenanceTTDUser @XKode = ?, @XNomorUser = ?', [2, $user_acc]);
                $ttd2 = null;
                if (!empty($ttdRaw2)) {
                    $row2 = $ttdRaw2[0]; // ttd pasti 1 baris
                    $ttd2 = [
                        'NamaUser' => $row2->NamaUser,
                        'FotoTtd' => trim($row2->FotoTtd) ?? '',
                    ];
                }
            } else {
                $ttd2 = null;
            }

            if (!empty($results)) {
                return response()->json([
                    'status' => 'ada',
                    'ttd' => $ttd,
                    'ttd2' => $ttd2,
                    'data' => $results
                ]);
            } else {
                return response()->json([
                    'status' => 'tidakAda',
                    'ttd' => [],
                    'ttd2' => [],
                    'data' => []
                ]);

            }
        }
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
