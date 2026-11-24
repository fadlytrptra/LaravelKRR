<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class BKMKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.BKM', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        // Extract necessary inputs from the request
        $listBKM = $request->input('rowDataArray'); // The input array
        $tTgl = $request->input('tanggal'); // Transaction date input
        $userId = trim(Auth::user()->NomorUser); // Authenticated user's ID

        // Check selected items (Assuming "checked" key indicates whether item is selected)
        $checkedItems = [];
        foreach ($listBKM as $item) {
                $checkedItems[] = $item;
        }

        $checkedCount = count($checkedItems);
        // dd($checkedCount);
        if ($checkedCount == 1) {
            $selectedItem = $checkedItems[0];
            // dd($selectedItem);
            // Process with transaction date
            try {
                // Convert Nilai_Pelunasan to numeric, removing formatting (e.g., commas)
                $jumPemasukan = floatval(str_replace(',', '', $selectedItem['Nilai_Pelunasan']));
                // dd($jumPemasukan);
                // Execute the stored procedure with the correct parameters
                DB::connection('ConnKCNAccounting')->statement('EXEC SP_5298_ACC_INSERT_TRANSAKSI_BKM @idBKM = ?, @bank = ?, @jumPemasukan = ?, @tglTrans = ?, @user = ?', [
                    $selectedItem['Id_BKM'],       // @idBKM
                    $selectedItem['Id_bank'],      // @bank
                    $jumPemasukan,                 // @jumPemasukan
                    $tTgl,                         // @tglTrans
                    $userId                        // @user
                ]);

                return response()->json(['message' => 'Data has been saved successfully.']);

            } catch (Exception $e) {
                // Handle errors and log if necessary
                return response()->json(['errror' => 'Error occurred: ' . $e->getMessage()], 500);
            }

        } else {
            // Handle case when no items are selected
            return response()->json(['error' => 'Please select one item to process.'], 400);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getBankData') {
            $jenisBank = $request->input('JnsBank');
            $idMataUang = $request->input('IdUang');

            $bankResults = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_ACC_LIST_BANK_TBANK @JenisBank = ?, @IdMataUang = ?', [$jenisBank, $idMataUang]);
            // dd($bankResults);

            $response = [];
            foreach ($bankResults as $row) {
                $response[] = [
                    'Nama_Bank' => $row->Nama_Bank,
                    'Id_Bank' => $row->Id_Bank,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBKMData') {
            // dd($request->all());
            $kode = 0;
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');
            $idBank = $request->input('nama_bank');
            $radio = $request->input('kodeRadio');

            // Determine which option is selected
            if ($radio == 1) {
                $kode = 1;
            } else if ($radio == 6) {
                $kode = 2;
            } else if ($radio == 4) {
                $kode = 3;
            } else if ($radio == 3) {
                $kode = 4;
            } else if ($radio == 2) {
                $kode = 5;
            } else if ($radio == 5) {
                $kode = 6;
            }

            // Execute the stored procedure with the determined parameters
            $query = DB::connection('ConnKCNAccounting')->select('exec SP_5298_ACC_INF_BKM_NOTAGIH
                @kode = ?,
                @bln = ?,
                @thn = ?,
                @IdBank = ?', [$kode, $bulan, $tahun, $idBank]);

            // dd($query);
            // Prepare the response array
            $response = [];
            if (!empty($query)) {
                foreach ($query as $row) {
                    $response[] = [
                        'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                        'Id_BKM' => $row->Id_BKM,
                        'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','), // Format as ###,###,##0.00
                        'Nama_MataUang' => $row->Nama_MataUang,
                        'Id_bank' => $row->Id_bank,
                        'Jenis_Pembayaran' => $row->Jenis_Pembayaran,
                        'Id_Jenis_Bayar' => $row->Id_Jenis_Bayar,
                    ];
                }
            }

            return datatables($response)->make(true);
        } else if ($id == 'getPelunasan') {
            $idBKM = $request->input('id_bkm');

            // Fetch Pelunasan Details
            $pelunasanResults = DB::connection('ConnKCNAccounting')->select('exec SP_5298_ACC_LIST_INF_BKM @id_bkm = ?, @kode = ?', [$idBKM, 1]);
            // dd($pelunasanResults);
            $pelunasanResponse = [];
            foreach ($pelunasanResults as $row) {
                if ($row->ID_Penagihan !== null) {
                    $pelunasanResponse[] = [
                        'Ket' => $row->Ket,
                        'Detail' => number_format($row->Detail, 2, '.', ','),
                        'Kode_Perkiraan' => $row->Kode_Perkiraan,
                    ];
                } else {
                    $description = '';
                    if ($row->Keterangan !== null && $row->Uraian !== null) {
                        $description = $row->Keterangan . '-' . $row->Uraian;
                    } elseif ($row->Keterangan !== null) {
                        $description = $row->Keterangan;
                    } elseif ($row->Uraian !== null) {
                        $description = $row->Uraian;
                    }
                    $pelunasanResponse[] = [
                        'Ket' => $description,
                        'Detail' => number_format($row->Rincian, 2, '.', ','),
                        'Kode_Perkiraan' => $row->KodePerkiraan,
                    ];
                }
            }

            return datatables($pelunasanResponse)->make(true);
        } else if ($id == 'getBiaya') {
            $idBKM = $request->input('id_bkm');

            // Fetch Biaya Details
            $biayaResults = DB::connection('ConnKCNAccounting')->select('exec SP_5298_ACC_LIST_INF_BKM @id_bkm = ?, @kode = ?', [$idBKM, 2]);
            // dd($biayaResults);
            $biayaResponse = [];
            foreach ($biayaResults as $row) {
                if ($row->biaya > 0) {
                    $description = $row->KetBiaya !== null ? $row->KetBiaya : '';
                    $biayaResponse[] = [
                        'KetBiaya' => $description,
                        'Biaya' => number_format($row->Biaya, 2, '.', ','),
                        'Kode_Perkiraan' => $row->Kode_Perkiraan,
                    ];
                }
            }

            return datatables($biayaResponse)->make(true);
        } else if ($id == 'getKurang') {
            $idBKM = $request->input('id_bkm');

            // Fetch Kurang/Lebih Details
            $krgLebihResults = DB::connection('ConnKCNAccounting')->select('exec SP_5298_ACC_LIST_INF_BKM @id_bkm = ?, @kode = ?', [$idBKM, 3]);

            $krgLebihResponse = [];
            foreach ($krgLebihResults as $row) {
                if ($row->KurangLebih != 0) {
                    $description = $row->KetKrg !== null ? $row->KetKrg : '';
                    $krgLebihResponse[] = [
                        'KetKrg' => $description,
                        'KurangLebih' => number_format($row->KurangLebih, 2, '.', ','),
                        'Kode_Perkiraan' => $row->Kode_Perkiraan,
                    ];
                }
            }

            return datatables($krgLebihResponse)->make(true);
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
