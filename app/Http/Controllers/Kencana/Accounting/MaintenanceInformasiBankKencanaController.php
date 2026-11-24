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

class MaintenanceInformasiBankKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.MaintenanceInformasiBank', compact('access'));
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
            $tanggal = $request->input('tanggal');
            $nilai = (float) str_replace(',', '', $request->input('totalNilai'));
            $keterangan = strtoupper($request->input('keterangan'));
            $bukti = $request->input('noBukti') ?? null;
            $id_bank = $request->input('idBank');
            $id_matauang = $request->input('idMataUang');
            $id_jenis_bayar = $request->input('idJenisPembayaran');
            $type_transaksi = $request->input('kode');
            $id_referensi = $request->input('idReferensi');
            $proses = $request->input('proses');
            // dd($nilai);
            // dd($request->all());
            // Validate Tanggal
            if (strtotime($tanggal) > strtotime(date('Y-m-d'))) {
                return response()->json(['error' => 'Tanggal input melebihi tanggal sekarang']);
            }

            // Check Edit or Delete mode
            if ($proses == 2 || $proses == 3) {
                $result = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_REFERENSI_BANK @Kode = ?, @IdReferensi = ?', [2, $id_referensi]);

                if (!empty($result) && $result[0]->Id_Pelunasan != '') {
                    return response()->json(['error' => 'Tidak Dapat Dikoreksi atau Dihapus Karena Sudah ada Pelunasan']);
                }
            }

            // Handle Add Mode
            if ($proses == 1) {
                $result = DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_MAINT_REFERENSI_BANK @Kode = ?, @Tanggal = ?, @Id_Bank = ?, @Id_MataUang = ?, @Nilai = ?, @TypeTransaksi = ?, @Keterangan = ?, @Userid = ?, @Id_Jenis_Bayar = ?, @No_Bukti = ?', [
                    1,
                    date('m/d/Y', strtotime($tanggal)),
                    $id_bank,
                    $id_matauang,
                    $nilai,
                    $type_transaksi,
                    $keterangan,
                    trim(Auth::user()->NomorUser),
                    $id_jenis_bayar,
                    $bukti
                ]);

                $id_referensi = DB::connection('ConnKCNAccounting')->table('T_REFERENSI_BANK')
                    ->select('IdReferensi')
                    ->orderBy('IdReferensi', 'desc')
                    ->first();
                // dd($id_referensi);
                return response()->json(['message' => 'Data Telah Tersimpan', 'IdReferensi' => $id_referensi->IdReferensi]);

            }

            // Handle Edit Mode
            if ($proses == 2) {
                DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_MAINT_REFERENSI_BANK @Kode = ?, @IdReferensi = ?, @Id_Bank = ?, @Id_MataUang = ?, @Nilai = ?, @TypeTransaksi = ?, @Keterangan = ?, @Id_Jenis_Bayar = ?, @No_Bukti = ?', [
                    2,
                    $id_referensi,
                    $id_bank,
                    $id_matauang,
                    $nilai,
                    $type_transaksi,
                    $keterangan,
                    $id_jenis_bayar,
                    $bukti
                ]);

                return response()->json(['message' => 'Data Telah Terupdate']);
            }

            // Handle Delete Mode
            if ($proses == 3) {
                DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_MAINT_REFERENSI_BANK @Kode = ?, @IdReferensi = ?', [3, $id_referensi]);
                return response()->json(['message' => 'Data Telah Terhapus']);
            }

            return response()->json(['message' => 'Data belum lengkap terisi']);

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'displayData') {
            // Call the stored procedure SP_1273_PRG_LIST_REFERENSI_BANK
            $sTanggal = $request->input('tanggal');
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_REFERENSI_BANK @Kode = 1, @Tanggal = ?', [$sTanggal]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'IdReferensi' => $row->IdReferensi,
                    'Nama_Bank' => $row->Nama_Bank,
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Nilai' => number_format($row->Nilai, 2),
                    'Keterangan' => $row->Keterangan,
                    'NamaCust' => $row->NamaCust ?? '', // Handle null values
                    'Id_Bank' => $row->Id_Bank,
                    'Id_MataUang' => $row->Id_MataUang,
                    'TypeTransaksi' => $row->TypeTransaksi,
                    'Id_Jenis_Bayar' => $row->Id_Jenis_Bayar,
                    'Jenis_Pembayaran' => $row->Jenis_Pembayaran,
                    'No_Bukti' => $row->No_Bukti ?? '' // Handle null values
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBank') {
            // Call the stored procedure SP_1273_PRG_LIST_TBANK
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_TBANK @Kode = 4');
            // dd($results);
            // Prepare response for the front-end
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_Bank' => $row->Nama_Bank,
                    'Id_Bank' => $row->Id_Bank,
                ];
            }

            // Return the response as JSON
            return datatables($response)->make(true);
        } else if ($id == 'getMataUang') {
            // Execute the stored procedure for getMataUang
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_MATAUANG @Kode = ?', [1]);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Id_MataUang' => $row->Id_MataUang,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getJenisPembayaran') {
            // Execute the stored procedure for getJenisPembayaran
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_TJENISPEMBAYARAN @Kode = ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Jenis_Pembayaran' => trim($row->Jenis_Pembayaran),
                    'Id_Jenis_Bayar' => trim($row->Id_Jenis_Bayar),
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
    public function update(Request $request, $id)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($idReferensi)
    {
        //
    }
}
