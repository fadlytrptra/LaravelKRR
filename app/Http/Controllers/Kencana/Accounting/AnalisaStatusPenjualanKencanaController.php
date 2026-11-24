<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class AnalisaStatusPenjualanKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.AnalisaStatusPenjualan', compact('access'));
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
            // Check if the remaining balance is not zero
            if ($request->input('sisaTagihan') != 0) {
                return response()->json(['error' => 'Tidak boleh Proses, karena sisa tagihan tdk = Nol.']);
            }

            // Convert lunas to uppercase just in case
            $lunas = $request->input('lunas');

            // Call the stored procedure to update 'Lunas'
            DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_UPDATE_LUNAS @id_Penagihan = ?, @Lunas = ?, @Id_BKM = ?', [
                $request->input('noFaktur'),
                $lunas,
                $request->input('idBKM'),
            ]);

            // Assuming the process updates the front-end, we can return success or JSON response
            return response()->json(['message' => 'Data Telah Tersimpan', 'lunas' => $lunas]);

        } catch (Exception $e) {
            // Error handling
            return response()->json(['error' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'displayData') {
            // Get the dates from the request, default to current date if not provided
            $sTanggal1 = $request->input('tanggal', now());
            $sTanggal2 = $request->input('tanggal2', now());

            // Execute the stored procedure
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_STATUS_PENAGIHAN_PENJUALAN @Kode = ?, @Tgl1 = ?, @Tgl2 = ?', [1, $sTanggal1, $sTanggal2]);

            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Pelunasan' => \Carbon\Carbon::parse($row->Tgl_Pelunasan)->format('m/d/Y'),
                    'NamaCust' => $row->NamaCust,
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'Jenis_Pembayaran' => $row->Jenis_Pembayaran,
                    'NilaiPelunasan' => number_format($row->NilaiPelunasan, 2, '.', ','), // Format as "#,##0.00"
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 2, '.', ','), // Format as "#,##0.00"
                    'Terbayar' => number_format($row->Terbayar, 2, '.', ','), // Format as "#,##0.00"
                    'Lunas' => $row->Lunas,
                    'Id_BKM' => $row->Id_BKM,
                    // Add other fields if necessary
                    // 'Status_tagihan' => $row->Status_tagihan ?? '', // Uncomment and add if needed
                    // 'Id_Cust' => $row->Id_Cust ?? '', // Uncomment and add if needed
                ];
            }

            // dd($response);

            return datatables($response)->make(true);
        } else if ($id == 'DisplayNotaKredit') {

            $sIdPenagihan = $request->input('Id_Penagihan');
            // dd($sIdPenagihan);
            $result = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_STATUS_PENAGIHAN_PENJUALAN @Kode = ?, @Id_Penagihan = ?', [2, $sIdPenagihan]);
            // dd($result);
            if (!empty($result)) {
                $jumlah = $result[0]->jumlah;
            } else {
                $jumlah = 0.00;
            }

            return response()->json(['jumlah' => $jumlah]);
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

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
