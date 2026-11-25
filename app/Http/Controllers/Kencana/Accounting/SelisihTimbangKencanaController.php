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

class SelisihTimbangKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.SelisihTimbang', compact('access'));
    }

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
        if ($id == 'getCustomer') {
            $kode = $request->input('proses') == 1 ? 2 : 3;
            // dd($kode);
            // Panggil stored procedure sesuai parameter kode
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_CUSTOMER ?', [$kode]);
            // dd($results);
            // Simpan hasil lookup
            $response = [];
            foreach ($results as $row) {
                $idCust = trim($row->IdCust);
                $TIdCustomer = substr($idCust, -5); // Last 5 characters
                $TIdJnsCust = substr($idCust, 0, 3); // First 3 characters

                $response[] = [
                    'NamaCust' => trim($row->NamaCust),
                    'idCust' => $idCust,
                    'TIdCustomer' => $TIdCustomer,
                    'TIdJnsCust' => $TIdJnsCust,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getPenagihan') {
            $kode = 5;
            $idCustomer = $request->input('idCustomer');

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ @Kode = ?, @IdCustomer = ?', [$kode, $idCustomer]);
            // dd($results);
            // Hasil lookup untuk Id_Penagihan dan Tgl_Penagihan
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'Tgl_Penagihan' => \Carbon\Carbon::parse($row->Tgl_Penagihan)->format('m/d/Y'),
                ];
            }

            return datatables($response)->make(true);

            // Jika Addmode aktif, jalankan logika penambahan
            // if ($request->input('addmode') === 'true') {
            //     $this->displayPenagihan($response[0]['Id_Penagihan']);
            // }

        } else if ($id == 'cekPelunasan') {
            $sIdPenagihan = $request->input('no_penagihan');
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_List_KelebihanBayar @Id_Penagihan = ?, @Kode = ?', [$sIdPenagihan, 1]);
            dd($results);
            if (!empty($results)) {
                $result = $results[0];
                if ($result->Terbayar < 0) {
                    return response()->json(['error' => 'Nota ini belum dibayar, harap dibayar dulu']);
                } else {
                    return response()->json(['message' => 'Nota sudah dibayar']);
                }
            } else {
                return response()->json(['error' => 'Nota ini belum dibayar, harap dibayar dulu']);
            }
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
        //
    }
}
