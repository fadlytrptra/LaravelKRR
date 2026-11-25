<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Exception;

class CounterFakturKencanaController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');

        return view('Kencana.Accounting.CounterFaktur', compact('access'));
    }

    // Show the form for creating a new resource.
    public function create()
    {
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $request->validate([
            'tahun'   => 'required|integer',
            'counter' => 'required|integer|min:0',
        ]);

        try {
            $updated = DB::connection('ConnKCNAccounting')
                ->table('T_COUNTER_FAKTUR')
                ->where('Periode', $request->tahun)
                ->update([
                    'Nomer' => $request->counter
                ]);

            if ($updated === 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data counter tahun ' . $request->tahun . ' tidak ditemukan atau tidak mengalami perubahan.'
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Counter faktur berhasil disimpan.'
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Display the specified resource.
    public function show($id)
    {
        try {
            $counter = DB::connection('ConnKCNAccounting')
                ->table('T_COUNTER_FAKTUR')
                ->where('Periode', $id)
                ->value('Nomer');

            return response()->json([
                'success' => true,
                'counter' => $counter ?? ''
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
    }

    // Update the specified resource in storage.
    public function update($id, Request $request)
    {
    }

    // Remove the specified resource from storage.
    public function destroy($id)
    {
    }
}
