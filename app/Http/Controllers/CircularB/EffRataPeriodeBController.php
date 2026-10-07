<?php

namespace App\Http\Controllers\CircularB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class EffRataPeriodeBController extends Controller
{
    public function index()
    {
        $listTypeMesin = DB::connection('ConnCircularMojosari')
            ->select('EXEC SP_1273_CIR_List_TypeMesin @Kode = ?', [1]);
        $filtered = array_values(array_filter($listTypeMesin, function ($item) {
            return in_array($item->IdType_Mesin, ['1']);
        }));
        // dd($filtered);
        usort($filtered, function ($a, $b) {
            return intval($a->IdType_Mesin) - intval($b->IdType_Mesin);
        });
        $listBarang = DB::connection('ConnPurchase')
            ->select('EXEC SP_MOHON_BELI @MyType = ?', [7]);
        // dd($listBarang);
        $listBarang = collect($listBarang)->sortBy('NAMA_BRG')->values();
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular B');
        return view('CircularB.laporanCircular.EffRataPeriode', compact('access', 'filtered', 'listBarang'));
    }

    public function getMesinSelect($idTypeMesin)
    {
        // dd($idTypeMesin);
        $mesin = DB::connection('ConnCircularMojosari')->select('EXEC SP_1273_CIR_LIST_MESIN @Kode = ?, @IdType_Mesin = ?', ['3', $idTypeMesin]);
        // dd($mesin);
        return response()->json($mesin);
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
        if ($id == 'getData') {
            $proses = $request->input('proses');
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $type_mesin = $request->input('type_mesin');
            $mesin = $request->input('mesin');
            $order = $request->input('order');
            // dd($request->all());
            // dd($order);
            try {
                switch ($proses) {
                    case 1:
                        // type mesin
                        $results = DB::connection('ConnCircularMojosari')
                            ->select('EXEC SP_4451_EffRataPeriode @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @type_mesin = ?', [1, $tgl_awal, $tgl_akhir, $type_mesin]);
                        // dd($results);
                        $response = [];
                        foreach ($results as $row) {
                            $response[] = [
                                'Tgl_Log' => Carbon::parse($row->Tgl_Log)->format('m/d/Y'),
                                'Tgl_Log_raw' => Carbon::parse($row->Tgl_Log)->format('Y-m-d'),
                                'Shift' => trim($row->Shift),
                                'Type_Mesin' => trim($row->Type_Mesin),
                                'Nama_mesin' => trim($row->Nama_mesin),
                                'A_rpm' => trim($row->A_rpm),
                                'NAMA_BRG' => trim($row->NAMA_BRG),
                                'AfalanWA' => trim($row->Afalan_WA),
                                'AfalanWE' => trim($row->Afalan_WE),
                                'Hasil_Meter' => trim($row->Hasil_Meter),
                                'Effisiensi' => trim($row->Effisiensi),
                                'Hasil_Kg' => trim($row->Hasil_Kg),
                            ];
                        }

                        return response()->json([
                            'data' => $response
                        ]);

                    case 2:
                        // mesin
                        $results = DB::connection('ConnCircular')
                            ->select('EXEC SP_4451_EffRataPeriode @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @type_mesin = ?, @mesin = ?', [2, $tgl_awal, $tgl_akhir, $type_mesin, $mesin]);
                        // dd($results);
                        $response = [];
                        foreach ($results as $row) {
                            $response[] = [
                                'Tgl_Log' => Carbon::parse($row->Tgl_Log)->format('m/d/Y'),
                                'Tgl_Log_raw' => Carbon::parse($row->Tgl_Log)->format('Y-m-d'),
                                'Shift' => trim($row->Shift),
                                'Type_Mesin' => trim($row->Type_Mesin),
                                'Nama_mesin' => trim($row->Nama_mesin),
                                'A_rpm' => trim($row->A_rpm),
                                'NAMA_BRG' => trim($row->NAMA_BRG),
                                'AfalanWA' => trim($row->Afalan_WA),
                                'AfalanWE' => trim($row->Afalan_WE),
                                'Hasil_Meter' => trim($row->Hasil_Meter),
                                'Effisiensi' => trim($row->Effisiensi),
                                'Hasil_Kg' => trim($row->Hasil_Kg),
                            ];
                        }

                        return response()->json([
                            'data' => $response
                        ]);

                    case 3:
                        // order
                        $results = DB::connection('ConnCircular')
                            ->select('EXEC SP_4451_EffRataPeriode @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @order = ?', [3, $tgl_awal, $tgl_akhir, $order]);
                        // dd($results);
                        $response = [];
                        foreach ($results as $row) {
                            $response[] = [
                                'Tgl_Log' => Carbon::parse($row->Tgl_Log)->format('m/d/Y'),
                                'Tgl_Log_raw' => Carbon::parse($row->Tgl_Log)->format('Y-m-d'),
                                'Shift' => trim($row->Shift),
                                'Type_Mesin' => trim($row->Type_Mesin),
                                'Nama_mesin' => trim($row->Nama_mesin),
                                'A_rpm' => trim($row->A_rpm),
                                'NAMA_BRG' => trim($row->NAMA_BRG),
                                'AfalanWA' => trim($row->Afalan_WA),
                                'AfalanWE' => trim($row->Afalan_WE),
                                'Hasil_Meter' => trim($row->Hasil_Meter),
                                'Effisiensi' => trim($row->Effisiensi),
                                'Hasil_Kg' => trim($row->Hasil_Kg),
                            ];
                        }

                        return response()->json([
                            'data' => $response
                        ]);

                    default:
                        return response()->json(['error', 'Proses tidak valid']);
                }

            } catch (Exception $e) {
                return response()->json([
                    'error' => $e->getMessage()
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
