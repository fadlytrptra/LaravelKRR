<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class RekapHutangKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.RekapHutang', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        // Set cursor to loading (handled on the frontend)

        try {
            $command = '';
            $proses = $request->input('proses');
            $tgl_awal = $request->input('tanggal_awal');
            $tgl_akhir = $request->input('tanggal_akhir');
            // dd($request->all());
            if ($proses == 1) {
                $command = 'SP_1273_PRG_REKAP_HUTANG_RUPIAH';
            } elseif ($proses == 2) {
                $command = 'SP_1273_PRG_REKAP_HUTANG_NONRUPIAH';
            } elseif ($proses == 3) {
                $command = 'SP_1273_PRG_REKAP_TUNAI_RUPIAH';
            } elseif ($proses == 4) {
                $command = 'SP_1273_PRG_REKAP_TUNAI_NONRUPIAH';
            }

            // Execute the stored procedure if a command was set
            if ($command !== '') {
                DB::connection('ConnKCNAccounting')
                    ->statement((string) 'EXEC ' . $command . ' @Tgl1 = ?, @Tgl2 = ?', [
                        $tgl_awal,
                        $tgl_akhir
                    ]);

                return response()->json(['message' => 'Proses Selesai !!..'], 200);
            } else {
                return response()->json(['message' => 'Invalid input selection.'], 400);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Error executing the procedure: ' . $e->getMessage()], 500);
        }

        // No finally block needed as per your request
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        //
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
