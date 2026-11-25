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

class PengajuanKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.Pengajuan', compact('access'));
    }

    // public function loadDataNotaK()
    // {
    //     $tabel =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_NOTA_KREDIT_1]');
    //     return response()->json($tabel);
    // }

    // public function getJenisBayarPenagajuan()
    // {
    //     $tabel =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_JENIS_DOK]');
    //     return response()->json($tabel);
    // }

    // //SP NYA SALAH
    // public function getBankPengajuan()
    // {
    //     $tabel =  DB::connection('ConnKCNAccounting')->select('exec [E-sp_Bank]');
    //     return response()->json($tabel);
    // }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getNotaKredit') {
            // Execute the stored procedure 'SP_1273_PRG_LIST_NOTA_KREDIT_1'
            $results = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_NOTA_KREDIT_1');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tanggal' => \Carbon\Carbon::parse($row->Tanggal)->format('m/d/Y'),
                    'Id_NotaKredit' => $row->Id_NotaKredit,
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'NamaCust' => $row->NamaCust,
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Nilai' => number_format($row->Nilai, 2, '.', ','),
                    'Id_Bank' => $row->Id_Bank ?? '',
                    'Jenis_Pembayaran' => $row->Jenis_Pembayaran ?? '',
                    'Rincian_Bayar' => $row->Rincian_Bayar ?? ''
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getJenisBayar') {
            // Execute the stored procedure
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_JENIS_DOK');
            // dd($results);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Jenis_Bayar' => $row->Id_Jenis_Bayar,
                    'Jenis_Pembayaran' => $row->Jenis_Pembayaran,
                ];
            }

            return datatables($response)->make(true);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {

    }
}
