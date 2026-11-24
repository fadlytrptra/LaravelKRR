<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class ACCBKKKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.ACCBKK', compact('access'));
        // $data = 'Accounting';
        // return view('Accounting.Hutang.ACCBKK', compact('data'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $TIDPembayaran = $request->input('id_pembayaran');

        if (empty($TIDPembayaran)) {
            return response()->json(['message' => 'Tidak Ada Data yang diPROSES!!..'], 200);
        }

        $Status_Lunas = "N";
        $TUang_TT = $request->input('mataUang');
        $TUang = $request->input('mata_uangbawah');
        // $TNilaiBayar = (int)$request->input('nilaidibayarkan');
        // $TNilaiBayarTanpaKoma = str_replace(',', '', $request->input('nilaidibayarkan'));
        $TNilaiBayar = (float) str_replace(',', '', $request->input('nilaidibayarkan'));
        $TNilai_TT = $request->input('nilaiPenagihan');
        $TIdUang = $request->input('id_matauang');
        $TNilai_TT_Rp = $request->input('nilaiPenagihanRP');
        // $cleaned_value = str_replace(".", "", $request->input('nilaidibayarkan'));
        // $cleaned_value = str_replace(",", ".", $cleaned_value);
        // $TNilaiBayar = (float) $cleaned_value;
        // $kurs_value = str_replace(".", "", $request->input('nilaikurs'));
        $kurs_value = str_replace(",", "", $request->input('nilaikurs'));
        $txtKurs = (float) $kurs_value;
        // dd($txtKurs);
        // dd($request->all());
        // dd($TNilaiBayar, $txtKurs);
        if ($TUang_TT == $TUang) {
            if ($TNilaiBayar == $TNilai_TT) {
                $Status_Lunas = "Y";
            } else {
                if ($request->input('confirm_lunas') == 'yes') {
                    $Status_Lunas = "Y";
                } else {
                    $Status_Lunas = "N";
                }
            }
        } else {
            if ($TIdUang == 1) {
                if ($TNilaiBayar == $TNilai_TT_Rp) {
                    $Status_Lunas = "Y";
                } else {
                    if ($request->input('confirm_lunas') == 'yes') {
                        $Status_Lunas = "Y";
                    } else {
                        $Status_Lunas = "N";
                    }
                }
            }
        }

        // Execute the stored procedure to get the detail count
        $result = DB::connection('ConnKCNAccounting')
            ->select('EXEC SP_1273_PRG_LIST_BKK2_JMLDETAIL ?', [$TIDPembayaran]);

        if (!empty($result) && $result[0]->JmlDetail == 1) {
            // Execute the first detail update stored procedure
            DB::connection('ConnKCNAccounting')
                ->statement('EXEC SP_1273_PRG_UDT_BKK2_DETAIL_1 ?,?,?,?,?,?,?,?,?,?,?', [
                    (int) $TIDPembayaran,
                    $request->input('bank'),
                    (int) $request->input('id_jenisbayar'),
                    (int) $request->input('id_matauang'),
                    (int) $request->input('jumlah_pembayaran'),
                    $request->input('rincian'),
                    $TNilaiBayar,
                    trim(Auth::user()->NomorUser),
                    $request->input('id_penagihan'),
                    $Status_Lunas,
                    $txtKurs,
                ]);
        } else {
            // Execute the second detail update stored procedure
            DB::connection('ConnKCNAccounting')
                ->statement('EXEC SP_1273_PRG_UDT_BKK2_DETAIL_2 ?,?,?,?,?,?,?,?,?,?,?', [
                    (int) $TIDPembayaran,
                    $request->input('bank'),
                    (int) $request->input('id_jenisbayar'),
                    (int) $request->input('id_matauang'),
                    (int) $request->input('jumlah_pembayaran'),
                    $request->input('rincian'),
                    $TNilaiBayar,
                    trim(Auth::user()->NomorUser),
                    $request->input('id_penagihan'),
                    $Status_Lunas,
                    $txtKurs,
                ]);
        }

        return response()->json(['message' => 'Data sudah diSIMPAN !!..'], 200);
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        // dd($id);
        if ($id == 'getBank') {
            $response = [];

            $banks = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK2_BANK');
            // dd($banks);
            foreach ($banks as $bank) {
                $response[] = [
                    'Id_Bank' => $bank->Id_Bank,
                    'Nama_Bank' => $bank->Nama_Bank,
                ];
            }

            if (empty($response)) {
                return response()->json(['error' => 'Pilih dulu Banknya !!..']);
            }
            return datatables($response)->make(true);
        } else if ($id == 'getPengajuan') {
            $response = [];

            $pengajuan = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK2_PENGAJUAN');
            // dd($pengajuan);
            foreach ($pengajuan as $ajuan) {
                $response[] = [
                    'Id_Pembayaran' => trim($ajuan->Id_Pembayaran),
                    'Id_Penagihan' => trim($ajuan->Id_Penagihan),
                    'Id_Bank' => trim($ajuan->Id_Bank),
                    'Rincian_Bayar' => trim($ajuan->Rincian_Bayar),
                    'Nilai_Pembayaran' => number_format($ajuan->Nilai_Pembayaran, 2, '.', ','),
                    'Id_Jenis_Bayar' => trim($ajuan->Id_Jenis_Bayar),
                    'Jenis_Pembayaran' => trim($ajuan->Jenis_Pembayaran),
                    'Id_MataUang' => trim($ajuan->Id_MataUang),
                    'Nama_MataUang' => trim($ajuan->Nama_MataUang),
                    'Jml_JenisBayar' => $ajuan->Jml_JenisBayar,
                    'Kurs_Bayar' => ($ajuan->Kurs_Bayar),
                    'NM_SUP' => $ajuan->NM_SUP,
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
