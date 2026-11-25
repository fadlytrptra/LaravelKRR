<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Auth;

class ACCNotaKreditKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.ACCNotaKredit', compact('access'));
    }

    public function getTabelHeaderACCNotaKredit()
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_NOTA_KREDIT] @Kode = ?', [3]);
        return response()->json($tabel);
    }

    public function getDetailHeaderACCNotaKredit($idnotakredit)
    {
        $idNotaKredit = str_replace('.', '/', $idnotakredit);
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_NOTA_KREDIT] @Kode = ?, @ID_NotaKredit = ?', [4, $idNotaKredit]);
        return response()->json($tabel);
    }

    public function getDetailHeaderACCNotaKredit2($idNotaKredit)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_NOTA_KREDIT] @Kode = ?, @ID_NotaKredit = ?', [10, $idNotaKredit]);
        return response()->json($tabel);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        try {
            $ada = false;
            $userId = trim(Auth::user()->NomorUser);
            $items = $request->input('rowDataArray');
            // dd($items);

            if (count($items) === 0) {
                return response()->json(['error' => 'Tidak Ada Data Yang Disimpan']);
            }

            foreach ($items as $item) {
                // Execute stored procedure for each checked item
                DB::connection('ConnKCNAccounting')->statement('exec SP_ACC_NOTA_KREDIT @UserAcc = ?, @Id_NotaKredit = ?, @IdCust = ?, @IdMtUang = ?, @kredit = ?, @kurs = ?, @status = ?', [
                    $userId,
                    trim($item['Id_NotaKredit']),
                    trim($item['Id_Customer']),
                    $item['Id_MataUang'],
                    (float) str_replace(',', '', $item['Nilai']),
                    $item['NilaiKurs'],
                    trim($item['Status_Pelunasan']),
                ]);

                $ada = true;
            }

            if ($ada) {
                return response()->json(['message' => 'Proses Acc Penagihan Surat Jalan Selesai !!.']);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        if ($id == 'getNotaKredit') {
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_NOTA_KREDIT ?', [3]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NamaNotaKredit' => $row->NamaNotaKredit,
                    'Tanggal' => \Carbon\Carbon::parse($row->Tanggal)->format('m/d/Y'),
                    'NamaCust' => $row->NamaCust,
                    'Id_NotaKredit' => $row->Id_NotaKredit,
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'Nilai' => number_format($row->Nilai, 2, '.', ','),
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Id_Customer' => $row->Id_Customer,
                    'Id_MataUang' => $row->Id_MataUang,
                    'NilaiKurs' => $row->NilaiKurs,
                    'Status_Pelunasan' => $row->Status_Pelunasan,
                ];
            }
            return datatables($response)->make(true);

        } else if ($id == 'getNotaKreditDetail') {
            $sIdNota = $request->input('Id_NotaKredit');

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_NOTA_KREDIT @kode = ?, @ID_NotaKredit = ?', [4, $sIdNota]);

            $response = [];
            foreach ($results as $row) {
                if (is_null($row->IdRetur)) {
                    $response[] = [
                        'SuratJalan' => $row->SuratJalan ?? '',
                        'IdRetur' => '',
                        'QtyBrg' => $row->QtyBrg,
                        'HargaSP' => $row->HargaSP,
                        'SatuanJual' => '',
                        'HargaPot' => $row->HargaPot,
                    ];
                } else {
                    $response = [];
                    break;
                }
            }

            if (empty($response)) {
                $results = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_NOTA_KREDIT @kode = ?, @ID_NotaKredit = ?', [10, $sIdNota]);
                foreach ($results as $row) {
                    $response[] = [
                        'SuratJalan' => $row->SuratJalan,
                        'IdRetur' => $row->IdRetur,
                        'QtyBrg' => $row->QTyKonversi,
                        'HargaSP' => $row->HargaSatuan,
                        'SatuanJual' => $row->SatuanJual,
                        'HargaPot' => '',
                    ];
                }
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
