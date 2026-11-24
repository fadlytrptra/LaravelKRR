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

class UpdateSuratJalanKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.UpdateSuratJalan', compact('access'));
    }

    public function getTabelSuratJalan()
    {
        //dd("masuk");
        $data = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ]
        @Kode = ?', [21]);
        return response()->json($data);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        // dd($request->all());
        $suratJalan = $request->suratJalan;
        $idPenagihan = $request->idPenagihan;
        $jatuhTempo = $request->jatuhTempo;
        $idCustomer = $request->idCustomer;
        $tes = DB::connection('ConnKCNAccounting')->select(
            'exec SP_1273_PRG_LIST_PENAGIHAN_SJ @Kode = ?, @Surat_jalan = ?',
            [
                17,
                $suratJalan
            ]
        );
        // dd($tes);
        $idSuratPesanan = $tes[0]->IDSuratPesanan;

        DB::connection('ConnKCNAccounting')->statement(
            'exec SP_1273_PRG_MAINT_PENAGIHAN_SJ @Kode = ?, @Id_Penagihan = ?, @SuratJalan = ?, @JatuhTempo = ?, @Id_customer = ?, @SuratPesanan = ?',
            [
                2,
                $idPenagihan,
                $suratJalan,
                $jatuhTempo,
                $idCustomer,
                $idSuratPesanan
            ]
        );

        return response()->json([
            'message' => 'Data Berhasil Diproses!'
        ]);
        // return redirect()->back()->with('success', 'Data Sudah Tersimpan');
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'DisplayData') {
            $penagihanResults = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ ?', [21]);
            // dd($penagihanResults);
            $response = [];
            foreach ($penagihanResults as $row) {
                $response[] = [
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'IDPengiriman' => $row->IDPengiriman,
                    'Tgl_Penagihan' => \Carbon\Carbon::parse($row->Tgl_Penagihan)->format('m/d/Y'),
                    'NamaCust' => $row->NamaCust,
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 2, ',', '.'),
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'IDCust' => $row->IDCust,
                    'TanggalDiterima' => \Carbon\Carbon::parse($row->TanggalDiterima)->format('m/d/Y'),
                    'JmlTerimaUmum' => ($row->JmlTerimaUmum == '.00' ? 0 : $row->JmlTerimaUmum),
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
        //
    }
}
