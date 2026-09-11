<?php

namespace App\Http\Controllers\CircularD;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class HapusKegiatanMesinDController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular D');
        return view('CircularD.koreksi.HapusKegiatanMesin', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $dataList = $request->input('data', []);
        $id_order = $request->input('id_order');
        $sisa = $request->input('sisa');
        $mesin = $request->input('nama_mesin');

        // Validasi awal
        if (empty($mesin) || empty($id_order) || $sisa === null || count($dataList) === 0) {
            return response()->json(['error' => 'Mohon lengkapi dulu datanya']);
        }

        DB::connection('ConnCircular')->beginTransaction();

        try {
            // Step 3: Loop dataList
            foreach ($dataList as $item) {
                // Step 1: Ambil TotalOrder
                $totalOrderResult = DB::connection('ConnCircular')
                    ->select('EXEC SP_1273_CIR_ERROR_CIR @Kode = ?, @IdOrder = ?', ['9', $id_order]);

                $totalOrder = $totalOrderResult[0]->A_jumlah_Order ?? 0;

                // Step 2: Hitung JumlahOrder
                $jumlahOrder = $totalOrder - (float) $item['Counter_mesin_akhir'] - (float) $item['Counter_mesin_awal'];

                // SP Kode 10 (update jumlah order)
                DB::connection('ConnCircular')->statement(
                    'EXEC SP_1273_CIR_ERROR_CIR @Kode = ?, @IdOrder = ?, @JmlOrder = ?',
                    ['10', $id_order, $jumlahOrder]
                );

                // SP Kode 11 (hapus per Id_Log)
                DB::connection('ConnCircular')->statement(
                    'EXEC SP_1273_CIR_ERROR_CIR @Kode = ?, @IdLog = ?',
                    ['11', $item['Id_Log']]
                );
            }

            DB::connection('ConnCircular')->commit();

            return response()->json(['message' => 'Data sudah dihapus']);
        } catch (Exception $e) {
            DB::connection('ConnCircular')->rollBack();

            return response()->json([
                'error' => 'Terjadi kesalahan saat memproses data: ' . $e->getMessage()
            ]);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $mesin = $request->input('nama_mesin');
            $tanggal = $request->input('tanggal');

            // Step 1: Ambil IdMax dulu dengan Kode = 6
            $bindings = [$tanggal, $mesin];
            $sql = 'exec SP_1273_CIR_ERROR_CIR ?, ?, ?';
            $resultsIdMax = DB::connection('ConnCircular')->select($sql, ['6', $tanggal, $mesin]);
            // dd($resultsIdMax);
            $idMax = 0;
            if (!empty($resultsIdMax)) {
                foreach ($resultsIdMax as $row) {
                    $idMax = $row->IdLog ?? 0;
                }
            }

            // Step 2: Tentukan Kode berdasarkan IdMax (0 = kode 7, >0 = kode 8)
            $kode = $idMax == 0 ? '7' : '8';
            $params = ['Kode' => $kode, 'Tanggal' => $tanggal, 'Mesin' => $mesin];

            if ($kode == '8') {
                $params['IdMax'] = $idMax;
            }

            // Persiapkan parameter dan binding
            $bindings = [];
            $sqlParams = [];

            foreach ($params as $key => $value) {
                $bindings[] = $value;
                $sqlParams[] = '?';
            }

            // $sql = 'exec SP_1273_CIR_ERROR_CIR ' . implode(',', $sqlParams);
            // dd($sql, $bindings);
            // $results = DB::connection('ConnCircular')->select($sql, $bindings);
            // dd($results);
            if ($kode == '8') {
                $results = DB::connection('ConnCircular')->select('EXEC SP_1273_CIR_ERROR_CIR @Kode = ?, @Tanggal = ?, @Mesin = ?, @IdMax = ?', [
                    $kode,
                    $tanggal,
                    $mesin,
                    $idMax
                ]);
            } else {
                $results = DB::connection('ConnCircular')->select('EXEC SP_1273_CIR_ERROR_CIR @Kode = ?, @Tanggal = ?, @Mesin = ?', [
                    $kode,
                    $tanggal,
                    $mesin
                ]);
            }
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Log' => $row->Id_Log ?? '',
                    'Status_log' => $row->Status_log ?? '',
                    'Shift' => $row->Shift ?? '',
                    'A_rpm' => $row->A_rpm ?? '',
                    'Id_order' => $row->Id_order ?? '',
                    'Id_karyawan' => $row->Id_karyawan ?? '',
                    'Counter_mesin_awal' => $row->Counter_mesin_awal ?? '',
                    'Counter_mesin_akhir' => $row->Counter_mesin_akhir ?? '',
                    'Awal_jam_kerja' => isset($row->Awal_jam_kerja) ? Carbon::parse($row->Awal_jam_kerja)->format('m/d/Y') : null,
                    'Akhir_jam_kerja' => isset($row->Akhir_jam_kerja) ? Carbon::parse($row->Akhir_jam_kerja)->format('m/d/Y') : null,
                    'Id_User' => $row->Id_User ?? '',
                ];
            }

            return datatables($response)->make(true);
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
