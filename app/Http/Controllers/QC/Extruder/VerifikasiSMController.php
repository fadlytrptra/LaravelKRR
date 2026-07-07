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

class VerifikasiSMController extends Controller
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
        return view('QC.Extruder.VerifikasiSM', compact('access', 'listLokasi'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $proses = $request->input('proses'); // 1 = insert, 2 = update, 3 = delete
        $user_input = trim(Auth::user()->NomorUser);
        $idLaporan = $request->input('idLaporan');
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
                                5,
                                $idLaporan,
                                $user_input,
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil disimpan!']);

                case 2:

                // return response()->json(['message' => 'Data berhasil dikoreksi!']);

                case 3:

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
        if ($id == 'getDataExt') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $id_lokasi = $request->input('id_lokasi');
            $results = DB::connection('ConnExtruder')
                ->select('EXEC SP_4451_GetDataLaporanProduksiExtruder @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [4, $tgl_awal, $tgl_akhir, $id_lokasi]);
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
                ];
            }
            // dd($response);
            return datatables($response)->make(true);
        } else if ($id == 'getDataPrint') {
            $idLaporan = $request->input('idLaporan');
            $results = DB::connection('ConnExtruder')
                ->table('LaporanProduksiExtruder')
                ->where('idLaporan', $idLaporan)
                ->select('*')
                ->get();
            if ($results) {
                $userInput = trim($results[0]->userInput);
                $userVerified = trim($results[0]->userVerified) ?? '';
            }
            // dd($results);
            $ttdRaw = DB::connection('ConnEDP')
                ->select('EXEC SP_4451_EDP_MaintenanceTTDUser @XKode = ?, @XNomorUser = ?', [2, $userVerified]);
            $ttd = null;
            if (!empty($ttdRaw)) {
                $row = $ttdRaw[0]; // ttd pasti 1 baris
                $ttd = [
                    'NamaUser' => $row->NamaUser,
                    'FotoTtd' => trim($row->FotoTtd) ?? '',
                ];
            }

            // dd($ttd);
            if (!empty($results)) {
                return response()->json([
                    'status' => 'ada',
                    'ttd' => $ttd,
                    'data' => $results
                ]);
            } else {
                return response()->json([
                    'status' => 'tidakAda',
                    'ttd' => [],
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
