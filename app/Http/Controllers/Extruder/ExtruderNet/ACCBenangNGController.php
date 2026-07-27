<?php

namespace App\Http\Controllers\Extruder\ExtruderNet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ACCBenangNGController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Extruder');
        $view_data = [
            'pageName' => 'Extruder',
            'formName' => 'ACCBenangNG',
            // 'formData' => $form_data,
        ];
        $listLokasi = DB::connection('ConnTestQC')
            ->table('Lokasi')
            ->select('idLokasi', 'nama_lokasi')
            ->get();
        $listMesin = DB::connection('ConnExtruder')
            ->table('MasterMesin')
            ->select('IdMesin', 'TypeMesin')
            ->where('Aktif', 'Y')
            ->get();
        return view('Extruder.Extruder.ACCBenangNG', compact('access', 'listLokasi', 'listMesin'), $view_data);

    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $rowDataArray = $request->input('checkedRows', []);
        $nomorUser = trim(Auth::user()->NomorUser);
        // dd($rowDataArray);
        if (empty($rowDataArray)) {
            return response()->json(['error' => 'TIDAK DAPAT Proses Data, karena tidak ada Data!!!..']);
        }

        foreach ($rowDataArray as $item) {
            DB::connection('ConnTestQC')
                ->statement('EXEC SP_4451_BenangNG @kode = ?, @user = ?, @id_laporan = ?', [6, $nomorUser, $item['id_laporan']]);
        }

        return response()->json(['message' => 'Data berhasil diACC!!..']);
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            // dd($request->all());
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
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
