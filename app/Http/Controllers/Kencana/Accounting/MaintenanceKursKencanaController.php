<?php

namespace App\Http\Controllers\Kencana\Accounting;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class MaintenanceKursKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.MaintenanceKurs', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $proses = $request->input('proses');
        $tanggalKurs = $request->input('tanggal_kurs');
        $nilaiKurs = (float)str_replace(',', '', $request->input('nilai_kurs'));
        if ($proses == 1) {
            try {
                // Cek apakah TanggalKurs sudah ada
                $existing = DB::connection('ConnKCNAccounting')
                    ->table('T_KURS')
                    ->whereDate('TanggalKurs', '=', $tanggalKurs)
                    ->first();

                if ($existing) {
                    return response()->json(['error' => 'Nilai kurs pada tanggal tersebut sudah ada!']);
                }

                // Insert jika belum ada
                DB::connection('ConnKCNAccounting')
                    ->table('T_KURS')
                    ->insert([
                        'TanggalKurs' => $tanggalKurs,
                        'NilaiKurs' => $nilaiKurs,
                    ]);

                return response()->json(['message' => 'Berhasil menambah kurs!']);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }

        } else {
            try {
                // Update data
                DB::connection('ConnKCNAccounting')
                    ->table('T_KURS')
                    ->where('TanggalKurs', $tanggalKurs)
                    ->update(['NilaiKurs' => $nilaiKurs]);

                // Kembalikan respons sukses
                return response()->json(['message' => 'Kurs berhasil diperbarui!']);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()]);
            }
        }

    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $dataAccounting = DB::connection('ConnKCNAccounting')
                ->table('T_KURS')
                ->select([
                    'IdKurs',
                    'TanggalKurs',
                    'NilaiKurs',
                ])
                ->whereBetween('TanggalKurs', [$request->tgl_awal, $request->tgl_akhir])
                ->get();

            // Format TanggalKurs
            $dataAccounting->transform(function ($item) {
                $item->TanggalKurs = \Carbon\Carbon::parse($item->TanggalKurs)->format('m/d/Y');
                return $item;
            });

            return datatables($dataAccounting)->make(true);
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
