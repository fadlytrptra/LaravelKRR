<?php

namespace App\Http\Controllers\Kencana;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PDF;
use App\Http\Controllers\HakAksesController;

class CetakSPKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        // dd(now()->format('Y-m-d'));
        try {
            $date = now()->format('Y-m-d');
            $nosp = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SP_CETAK @Kode = ?, @Tanggal = ?', [1, $date]);

            if (empty($nosp)) {
                throw new \Exception("No data returned from the stored procedure.");
            }

            $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');

            return view('Kencana.CetakSPKencana', compact('nosp', 'access'));
        } catch (\Exception $e) {
            // Handle the exception here
            // You can log the error, display a custom error message, etc.
            // return view('error.view')->with('errorMessage', $e->getMessage());
            $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
            $dataArray = [
                [
                    'IDSuratPesanan' => 'NO DATA',
                    'NamaCust' => 'NO DATA',
                ]
            ];
            $nosp = array_map(function ($item) {
                return (object)$item;
            }, $dataArray);
            // dd($nosp);
            return view('Kencana.CetakSPKencana', compact('nosp', 'access'));
        }
    }

    public function getSuratPesananSelect($tanggal)
    {
        $nosp = db::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SP_CETAK @Kode =?, @Tanggal =?', [1, $tanggal]);
        return response()->json($nosp);
    }

    public function getJenisSp($nosp)
    {
        $jnssp = db::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SP_CETAK @Kode = ?, @IdSuratPesanan = ?', [2, $nosp]);
        return response()->json($jnssp);
    }

    public function getViewPrint($nosp)
    {
        $data = db::connection('ConnKCNSales')->select('Select * from VW_PRG_1486_SLS_CETAK_SP1 where NO_SP = ?', [$nosp]);
        return response()->json($data);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {

    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update($id)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
