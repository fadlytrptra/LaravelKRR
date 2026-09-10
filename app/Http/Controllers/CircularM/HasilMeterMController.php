<?php

namespace App\Http\Controllers\CircularM;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class HasilMeterMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular M');
        return view('CircularM.informasi.HasilMeter', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id, Request $request)
    {
        if ($id == 'ProsesMeter') {
            $tanggal = $request->input('tanggal');
            $shift = $request->input('shift');

            // === Ambil data utama ===
            $results = DB::connection('ConnCircular')->select(
                'exec Sp_List_ProsesMeter @Kode = ?, @Tanggal = ?, @Shift = ?',
                [16, $tanggal, $shift]
            );

            $response = [];
            $HslMeter = 0;
            $XIdMesin = null;
            $i = 0;

            foreach ($results as $row) {
                $nama_brg = trim($row->NAMA_BRG ?? '');
                $ukuran = '';
                $rajutan = '';
                $we = '';

                // parsing string NAMA_BRG
                $parts = explode('/', $nama_brg);
                if (count($parts) >= 2) {
                    $ukuran = substr($parts[1], 0, 6);
                }

                if (count($parts) >= 3) {
                    $we = substr($parts[2], 0, 5);
                    $rajutan = substr($parts[2], 0, 13);
                }

                $awal = (int) $row->Counter_mesin_awal;
                $akhir = (int) $row->Counter_mesin_akhir;

                if ($i == 0) {
                    $HslMeter = $akhir - $awal;
                } else {
                    if ($XIdMesin == $row->Id_mesin) {
                        $HslMeter += ($akhir - $awal);
                    } else {
                        $HslMeter = $akhir - $awal;
                    }
                }
                $XIdMesin = $row->Id_mesin;

                $data = [
                    'Id_Log' => $row->Id_Log ?? '',
                    'Nama_mesin' => $row->Nama_mesin ?? '',
                    'Ukuran' => $ukuran,
                    'Rajutan' => $rajutan,
                    'D_TEK4' => $row->D_TEK4 ?? '',
                    'D_TEK5' => $row->D_TEK5 ?? '',
                    'Keterangan' => $row->Keterangan ?? '',
                    'CounterAwal' => number_format($awal, 0, '.', ''),
                    'CounterAkhir' => number_format($akhir, 0, '.', ''),
                    'AwalJamKerja' => isset($row->Awal_jam_kerja) ? Carbon::parse($row->Awal_jam_kerja)->format('H:i') : '',
                    'AkhirJamKerja' => isset($row->Akhir_jam_kerja) ? Carbon::parse($row->Akhir_jam_kerja)->format('H:i') : '',
                    'HasilMeter' => (!empty($row->Keterangan) && str_starts_with($row->Keterangan, 'Ganti Shift'))
                        ? number_format($HslMeter, 0, '.', '')
                        : null,
                ];

                // kalau Keterangan "Ganti Shift*" → tambahkan hasil meter
                // if (!empty($row->Keterangan) && str_starts_with($row->Keterangan, 'Ganti Shift')) {
                //     $data['HasilMeter'] = number_format($HslMeter, 0, '.', '');
                // }

                $response[] = $data;
                $i++;
            }
            // dd($response);
            return datatables($response)->make(true);
            // return response()->json([
            //     'status' => 'ok',
            //     'data' => $response
            // ]);

        } else if ($id == 'CekHasilMeter') {
            $tanggal = $request->input('tanggal');
            $shift = $request->input('shift');

            // === Cek data Ada / Tidak ===
            $cek = DB::connection('ConnCircular')->select(
                'exec Sp_List_ProsesMeter @Kode = ?, @Tanggal = ?, @Shift = ?',
                [15, $tanggal, $shift]
            );
            // dd($cek);
            if (empty($cek) || ($cek[0]->Ada ?? 0) == 0) {
                return response()->json([
                    'error' => 'Data TIDAK ADA !!!..'
                ]);
            } else {
                return response()->json([
                    'message' => 'Data ADA !!!..'
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
