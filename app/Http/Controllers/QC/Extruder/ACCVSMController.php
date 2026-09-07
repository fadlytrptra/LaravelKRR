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

class ACCVSMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        $listTypeMesin = DB::connection('ConnTestQC')
            ->select('EXEC SP_4451_List_Mesin_CL @Kode = ?', [1]);
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
        return view('QC.Extruder.ACCVSM', compact('access', 'listLokasi'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $proses = $request->input('proses');
        $user_input = trim(Auth::user()->NomorUser);
        $idLaporan = $request->input('idLaporan');
        $keterangan = $request->input('keterangan');
        $hasilCheck = $request->input('hasilCheck');
        // dd(
        //     $hasilCheck['bz1BD']['status'] ?? null,
        //     $hasilCheck['bz1BD']['value'] ?? null,
        // );
        try {
            switch ($proses) {
                case 1:
                    // Simpan
                    DB::connection('ConnExtruder')
                        ->statement(
                            'EXEC SP_4451_GetDataLaporanProduksiExtruder 
                        @kode = ?,
                        @idLaporan = ?,
                        @user_input = ?',
                            [
                                11,
                                $idLaporan,
                                $user_input,
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil di-ACC!']);

                case 2:
                    // ACC D
                    DB::connection('ConnExtruder')
                        ->statement(
                            'EXEC SP_4451_GetDataLaporanProduksiExtruder 
                        @kode = ?,
                        @idLaporan = ?,
                        @user_input = ?',
                            [
                                12,
                                $idLaporan,
                                $user_input,
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil di-ACC!']);

                case 3:
                    // batal
                    DB::connection('ConnExtruder')
                        ->statement(
                            'EXEC SP_4451_GetDataLaporanProduksiExtruder 
                        @kode = ?,
                        @idLaporan = ?',
                            [
                                13,
                                $idLaporan,
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil dibatal ACC!']);

                case 4:
                    // batal D
                    DB::connection('ConnExtruder')
                        ->statement(
                            'EXEC SP_4451_GetDataLaporanProduksiExtruder 
                        @kode = ?,
                        @idLaporan = ?',
                            [
                                14,
                                $idLaporan,
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil dibatal ACC!']);

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
        if ($id == 'getDataExt') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $id_lokasi = $request->input('id_lokasi');

            if ($id_lokasi == 3) {
                // dd($tgl_awal, $tgl_akhir, $id_lokasi);
                $results = DB::connection('ConnExtruder')
                    ->select('EXEC SP_4451_LaporanProduksiLohia @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [8, $tgl_awal, $tgl_akhir, $id_lokasi]);
                // dd($results);
                $response = [];
                foreach ($results as $row) {
                    $response[] = [
                        'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                        'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                        'idLaporan' => trim($row->idLaporan),
                        'shiftValue' => trim($row->shiftValue),
                        // 'tanggal' => trim($row->tanggal),
                        'spek_mesin' => trim($row->spek_mesin),
                        'spek_benang' => trim($row->spek_benang),
                        'userInput' => trim($row->user_input),
                        'userVerified' => trim($row->userVerified),
                        'userACCSPV' => trim($row->userACCSPV),
                        'bahanPP' => $row->bahanPP ?? '',
                    ];
                }
                // dd($response);
                return datatables($response)->make(true);
            } else {
                $results = DB::connection('ConnExtruder')
                    ->select('EXEC SP_4451_GetDataLaporanProduksiExtruder @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [15, $tgl_awal, $tgl_akhir, $id_lokasi]);
                $response = [];
                foreach ($results as $row) {
                    $response[] = [
                        'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                        'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                        'idLaporan' => trim($row->idLaporan),
                        'shiftValue' => trim($row->shiftValue),
                        // 'tanggal' => trim($row->tanggal),
                        'spek_mesin' => trim($row->spek_mesin),
                        'spek_benang' => trim($row->spek_benang),
                        'userInput' => trim($row->userInput),
                        'userVerified' => trim($row->userVerified),
                        'userACCSPV' => trim($row->userACCSPV),
                        'bahanPP' => $row->bahanPP ?? '',
                    ];
                }
                // dd($response);
                return datatables($response)->make(true);
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
