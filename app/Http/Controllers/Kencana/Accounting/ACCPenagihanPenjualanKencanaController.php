<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class ACCPenagihanPenjualanKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.ACCPenagihanPenjualan', compact('access'));
    }

    // public function getDisplayHeader()
    // {
    //     $jenis =  DB::connection('ConnKCNAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ] @Kode = ?',[1]);
    //     return response()->json($jenis);
    // }

    // public function getDisplayDetail($id_Penagihan)
    // {
    //     //dd("mask");
    //     $idPenagihan = str_replace('.', '/', $id_Penagihan);
    //     $jenis =  DB::connection('ConnKCNAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ] @Kode = ?, @ID_Penagihan = ?', [2, $idPenagihan]);
    //     return response()->json($jenis);
    // }

    // public function getDisplaySuratJalan($id_Penagihan)
    // {
    //     $idPenagihan = str_replace('.', '/', $id_Penagihan);
    //     $jenis =  DB::connection('ConnKCNAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ] @Kode = ?, @ID_PENAGIHAN = ?',[11, $idPenagihan]);
    //     return response()->json($jenis);
    // }

    // public function accCheckCtkSJ($id_Penagihan)
    // {

    //     $idPenagihan = str_replace('.', '/', $id_Penagihan);
    //     $jenis =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_ACC_CHECK_CTK_SJ] @IdPenagihan = ?',[$idPenagihan]);
    //     return response()->json($jenis);
    // }

    // public function accCheckCtkSP($id_Penagihan)
    // {

    //     $idPenagihan = str_replace('.', '/', $id_Penagihan);
    //     $jenis =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_ACC_CHECK_CTK_SP] @IdPenagihan = ?',[$idPenagihan]);
    //     return response()->json($jenis);
    // }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $id_Penagihan = $request->id_Penagihan;
        $idCustomer = $request->idCustomer;
        $idMataUang = $request->idMataUang;
        $nilaiTagihan = $request->nilaiTagihan;
        $kurs = $request->kurs;

        $idPenagihan = str_replace('.', '/', $id_Penagihan);

        DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_PENAGIHAN_SJ]
        @UserAcc = ?,
        @Id_Penagihan = ?,
        @IdCust = ?,
        @IdMtUang = ?,
        @debet = ?,
        @kurs = ?', [
            1,
            $idPenagihan,
            $idCustomer,
            $idMataUang,
            $nilaiTagihan,
            $kurs
        ]);
        return response()->json([
            'message' => 'Data Berhasil Diproses!'
        ]);
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getPenagihan') {
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ1 ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Penagihan' => \Carbon\Carbon::parse($row->Tgl_Penagihan)->format('m/d/Y'),
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'NamaCust' => $row->NamaCust,
                    'PO' => $row->PO ?? '',
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 2, '.', ','),
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Id_Customer' => $row->Id_Customer,
                    'Id_MataUang' => $row->Id_MataUang,
                    'NilaiKurs' => $row->NilaiKurs,
                    'NamaNPWP' => $row->NamaNPWP ?? '',
                    'JnsCust' => $row->JnsCust ?? '',
                    'IdFakturPajak' => $row->IdFakturPajak ?? '',
                    'Nama_Jns_PPN' => $row->Nama_Jns_PPN ?? '',
                ];
            }
            return datatables($response)->make(true);

        } else if ($id == 'getDetailPenagihan') {
            $sIdPenagihan = $request->input('ID_Penagihan');

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ1 @Kode = ?, @Id_Penagihan = ?', [2, $sIdPenagihan]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Surat_Jalan' => $row->Surat_Jalan,
                    'Tgl_Surat_jalan' => \Carbon\Carbon::parse($row->Tgl_Surat_jalan)->format('m/d/Y'),
                ];
            }
            return datatables($response)->make(true);

        }

        // sj
        else if ($id == 'displaySuratJalan') {
            $ID_PENAGIHAN = $request->input('ID_PENAGIHAN');

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ1 @Kode = ?, @ID_PENAGIHAN = ?', [11, $ID_PENAGIHAN]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Surat_Jalan' => $row->Surat_Jalan,
                ];
            }
            return response()->json($response);
        }

        // cek sj
        else if ($id == 'cekCtkSJ') {
            $IdPenagihan = $request->input('IdPenagihan');

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_CHECK_CTK_SJ @IdPenagihan = ?', [$IdPenagihan]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Ada' => $row->Ada,
                ];
            }
            return response()->json($response);
        }

        // cek sp
        else if ($id == 'cekCtkSP') {
            $IdPenagihan = $request->input('IdPenagihan');

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_CHECK_CTK_SP @IdPenagihan = ?', [$IdPenagihan]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Ada' => $row->Ada,
                ];
            }
            return response()->json($response);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $user = Auth::user()->NomorUser;

        if ($id === 'proses') {
            $Id_Penagihan = $request->input('Id_Penagihan');
            $IdCust = $request->input('IdCust');
            $IdMtUang = $request->input('IdMtUang');
            $debet = $request->input('debet');
            $kurs = $request->input('kurs');

            // dd($request->all());
            try {
                DB::connection('ConnKCNAccounting')
                    ->statement('exec [SP_1273_PRG_PENAGIHAN_SJ]
                    @Id_Penagihan = ?,
                @IdCust = ?,
                @IdMtUang = ?,
                @debet = ?,
                @kurs = ?,
                @UserAcc = ?', [
                        $Id_Penagihan,
                        $IdCust,
                        $IdMtUang,
                        $debet,
                        $kurs,
                        $user,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
