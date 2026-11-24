<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class PenagihandiRETURKencanaController extends Controller
{
    //
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.PenagihandiRETUR', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $selectedPenagihanIds = $request->input('ids', []);
        $allRetur = $request->input('isSebagian', false);

        if (count($selectedPenagihanIds) == 0) {
            return response()->json([
                'message' => 'Data tidak ada yang diPROSES, Beri tanda cawang dulu !!..',
            ], 400);
        }

        if (count($selectedPenagihanIds) > 1) {
            return response()->json([
                'message' => 'Hanya 1(satu) Data yang dapat diPROSES!!...',
            ], 400);
        }

        $penagihanId = $selectedPenagihanIds[0];
        $listBarangItems = $request->input('noterima', []);

        if ($allRetur) {
            $msg = 'Proses Barang Retur SEMUA!!..';
        } else {
            $msg = 'Proses Barang Retur SEBAGIAN!!..';
        }
        // dd($msg);
        DB::connection('ConnKCNAccounting')->statement('EXEC Sp_1273_PRG_UDT_RETUR ?', [$listBarangItems]);
        // Return appropriate response
        return response()->json([
            'message' => $msg,
            'refreshData' => $allRetur ? 'Tampil_Data' : 'Tampil_Data_Sebagian'
        ]);
    }
    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getRincian') {
            $idPenagihan = $request->input('brg_retur');
            // dd($idPenagihan);
            $result = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_TT_TAMPIL_RETUR_IDTT ?', [$idPenagihan]);
            // dd($result);
            $data = collect($result)->map(function ($row) {
                return [
                    'No_Terima' => trim($row->No_Terima),
                    'Id_Divisi' => trim($row->Id_Divisi),
                    'No_SPPB' => trim($row->No_SPPB),
                    'Kd_Brg' => trim($row->Kd_brg),
                    'NAMA_BRG' => trim($row->NAMA_BRG),
                    'qty_tagih' => number_format($row->Qty_Tagih, 2, '.', ','),
                    'SatTagih' => trim($row->SatTagih),
                    'Qty_retur' => number_format($row->Qty_Retur, 2, '.', ','),
                    'Tgl_Retur' => \Carbon\Carbon::parse($row->Tgl_Retur)->format('m/d/Y'),
                ];
            });
            return datatables($data)->make(true);
        } else if ($id == 'getDataSebagian') {
            $result = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_RETUR_SEBAGIAN');
            // dd($result);
            $data = collect($result)->map(function ($row) {
                return [
                    'Waktu_Penagihan' => trim($row->Waktu_Penagihan),
                    'ID_Penagihan' => trim($row->ID_Penagihan),
                    'nm_sup' => trim($row->nm_sup),
                    'nama_dokumen' => trim($row->nama_dokumen),
                    'Status_PPN' => $row->Status_PPN == 'N' ? 'Tidak Ada' : 'Ada Pajak',
                    'Nama_MataUang' => trim($row->Nama_MataUang),
                    'nilai_penagihan' => '<span style="color: blue;">' . number_format($row->nilai_penagihan, 4, '.', ',') . '</span>'
                ];
            });

            return datatables($data)->rawColumns(['nilai_penagihan'])->make(true);
        } else if ($id == 'getData') {
            $result = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_TT_RETUR');
            // dd($result);
            $data = collect($result)->map(function ($row) {
                return [
                    'Waktu_Penagihan' => \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y'),
                    'ID_Penagihan' => trim($row->Id_Penagihan),
                    'nm_sup' => trim($row->NM_SUP),
                    'nama_dokumen' => trim($row->Nama_Dokumen),
                    'Status_PPN' => $row->Status_PPN == 'N' ? 'Tidak Ada' : 'Ada Pajak',
                    'Nama_MataUang' => trim($row->Nama_MataUang),
                    'nilai_penagihan' => '<span style="color: blue;">' . number_format($row->Nilai_Penagihan, 4, '.', ',') . '</span>'
                ];
            });

            return datatables($data)->rawColumns(['nilai_penagihan'])->make(true);
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
