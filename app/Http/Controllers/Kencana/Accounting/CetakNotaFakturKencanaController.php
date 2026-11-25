<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Exception;
use Auth;
use DB;

class CetakNotaFakturKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        // $result = (new HakAksesController)->HakAksesFitur('Cetak Nota / Faktur');
        // if ($result > 0) {
            return view('Kencana.Accounting.CetakNotaFaktur.index', compact('access'));
        // } else {
        //     abort(403);
        // }
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
        if ($id === 'getBank') {
            $dataBank = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_TBANK @Kode = ?', [1]);

            return response()->json($dataBank, 200);
        } else if ($id === 'getDataPenagihanSJ') {
            $Tgl_penagihan = $request->input('Tgl_penagihan');
            $dataPenagihan = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ1 @Kode = ?, @Tgl_penagihan = ?', [10, $Tgl_penagihan]);

            return datatables($dataPenagihan)->make(true);
        } else if ($id === 'getDataPenagihanSP') {
            $Tgl_penagihan = $request->input('Tgl_penagihan');
            $dataPenagihan = DB::connection('ConnKCNAccounting')
                ->table('vw_prg_Cetak_Penagihan_SP')
                ->whereDate('Tgl_Penagihan', $Tgl_penagihan)
                ->get();

            return datatables($dataPenagihan)->make(true);
        }
        else if ($id == 'print') {
            $ttd = $request->input('ttd');
            $jenisCetak = $request->input('jenisCetak');
            $bank = $request->input('bank');
            $idPenagihan = $request->input('idPenagihan');

            $nilaiBlmPajak = 0;

            if ($jenisCetak == 'NotaFaktur') {
                $dataCetak = DB::connection('ConnKCNAccounting')
                    ->select(
                        'SELECT *
                        FROM vw_prg_cetak_Penagihan_SJ
                        WHERE Id_Penagihan = ?',
                        [$idPenagihan]
                    );

            } elseif ($jenisCetak == 'Tunai') {
                $dataCetak = DB::connection('ConnKCNAccounting')
                    ->select(
                        'SELECT *
                        FROM vw_prg_Cetak_Penagihan_SP
                        WHERE Id_Penagihan = ?',
                        [$idPenagihan]
                    );

                $hasilNilai = DB::connection('ConnKCNAccounting')->selectOne(
                    'SELECT Nilai_blm_Pajak, Nilai_Penagihan
                    FROM dbo.T_PENAGIHAN_SJ
                    WHERE Id_Penagihan = ?',
                    [$idPenagihan]
                );

                $nilaiBlmPajak = (float) ($hasilNilai->Nilai_blm_Pajak ?? 0);
                $nilaiBlmPajak = $hasilNilai->Nilai_blm_Pajak ?? 0;
            }

            return view('Kencana.Accounting.CetakNotaFaktur.cetak',
                compact(
                    'dataCetak',
                    'ttd',
                    'jenisCetak',
                    'bank',
                    'idPenagihan',
                    'nilaiBlmPajak'
                )
            );
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
