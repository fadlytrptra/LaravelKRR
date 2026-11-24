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

class NotaKreditReturKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.NotaKreditRetur', compact('access'));
    }

    // public function getCustNotaKredit()
    // {
    //     $tabel =  DB::connection('ConnKCNSales')->select('exec [sp_list_all_customer] @Kode = ?', [2]);
    //     return response()->json($tabel);
    // }

    // public function getListSJNotaKredit($idCustomer)
    // {
    //     $tabel =  DB::connection('ConnKCNSales')->select('exec [SP_1273_ACC_LIST_SJ_NOTAKREDIT] @IdCust = ?', [$idCustomer]);
    //     return response()->json($tabel);
    // }

    // public function getLihat_PenagihanNotaKredit($idCustomer, $MIdRetur)
    // {
    //     //dd($idCustomer, $MIdRetur);
    //     $tabel =  DB::connection('ConnKCNSales')->select('exec [SP_LIST_RETUR_NOTAKREDIT] @IdCust = ?, @IdRetur = ?', [$idCustomer, $MIdRetur]);
    //     return response()->json($tabel);
    // }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        try {
            // dd($request->all());
            $proses = $request->input('proses');
            $list_items = $request->input('allRowsDataBawah');

            if (count($list_items) === 0) {
                return response()->json(['error' => 'Tidak Ada Data Yang Disimpan']);
            }

            $grandTotal = (float) $request->input('grandTotal');
            $terbilang = $request->input('TTerbilang');

            // Proses penyimpanan (mode add)
            if ($proses == 1) {
                // Panggil Stored Procedure untuk Insert Nota Kredit
                DB::connection('ConnKCNAccounting')
                    ->statement('EXEC SP_1273_PRG_Insert_NotaKredit @Tanggal = ?, @Id_MataUang = ?, @JnsNotaKredit = ?, @Status_PPN = ?, @Nilai = ?, @Terbilang = ?, @Id_Penagihan = ?, @Status_Pelunasan = ?, @UserInput = ?', [
                        $request->tanggalInput,
                        $request->idMataUang,
                        '1',
                        $request->statusPPN,
                        $grandTotal,
                        $terbilang,
                        $request->no_penagihan,
                        $request->statusPelunasan == 'Lunas' ? 'Y' : 'N',
                        trim(Auth::user()->NomorUser),
                    ]);

                // Ambil ID_NotaKredit dari hasil stored procedure
                $nota_KreditId = DB::connection('ConnKCNAccounting')
                    ->table('T_NOTA_KREDIT')
                    ->select('Id_NotaKredit')
                    ->where('Id_Penagihan', $request->no_penagihan)
                    ->orderBy('TglInput', 'desc')
                    ->first();
                $notaKreditId = $nota_KreditId->Id_NotaKredit;
                // dd($notaKreditId);
                // Simpan detail nota kredit
                foreach ($list_items as $item) {
                    DB::connection('ConnKCNAccounting')
                        ->statement('EXEC SP_1273_PRG_Insert_Detail_NotaKredit @Id_NotaKredit = ?, @IdRetur = ?, @SuratJalan = ?', [
                            $notaKreditId,
                            $item[5],
                            $item[1]
                        ]);
                }


                return response()->json(['message' => 'Data Telah Tersimpan', 'nota_kredit_id' => $notaKreditId]);
            }

            // Proses koreksi (mode edit)
            if ($proses == 2) {
                // dd($request->all());
                $notaKreditId = $request->no_notaKredit;
                // dd($notaKreditId);
                // Hapus detail lama dengan stored procedure
                foreach ($list_items as $item) {
                    DB::connection('ConnKCNAccounting')
                        ->statement('EXEC SP_1273_PRG_Del_Detail_NotaKredit @Id_NotaKredit = ?, @IdRetur = ?', [
                            $notaKreditId,
                            $item[5],
                        ]);
                }

                // Simpan detail baru
                foreach ($list_items as $item) {
                    DB::connection('ConnKCNAccounting')
                        ->statement('EXEC SP_1273_PRG_Insert_Detail_NotaKredit @Id_NotaKredit = ?, @IdRetur = ?, @SuratJalan = ?', [
                            $notaKreditId,
                            $item[5],
                            $item[1]
                        ]);
                }

                // Update nilai Nota Kredit dengan stored procedure
                DB::connection('ConnKCNAccounting')
                    ->statement('EXEC SP_1273_PRG_Update_NotaKredit @ID_NOtaKRedit = ?, @Nilai = ?, @Terbilang = ?', [
                        $notaKreditId,
                        $grandTotal,
                        $terbilang
                    ]);

                return response()->json(['message' => 'Data Telah Terkoreksi']);
            }

            // Proses hapus (mode delete)
            if ($proses == 3) {
                $notaKreditId = $request->no_notaKredit;

                // Hapus nota kredit dengan stored procedure
                DB::connection('ConnKCNAccounting')
                    ->statement('EXEC SP_1273_PRG_Del_NotaKredit @Id_NotaKredit = ?', [
                        $notaKreditId
                    ]);

                return response()->json(['message' => 'Data Telah Terhapus']);
            }

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getCustomer') {
            try {
                // Jalankan stored procedure untuk mendapatkan daftar customer
                $results = DB::connection('ConnKCNSales')
                    ->select('exec SP_1273_PRG_LIST_ALL_CUSTOMER ?', [2]);
                // dd($results);
                $response = [];
                foreach ($results as $row) {
                    $response[] = [
                        'NamaCust' => $row->NamaCust,
                        'IDCust' => $row->IDCust
                    ];
                }

                return datatables($response)->make(true);

            } catch (Exception $e) {
                // Error handling jika ada kesalahan
                return response()->json([
                    'error' => $e->getMessage(),
                ], 500);
            }
        } else if ($id == 'getSuratJalan') {
            // dd($request->all());
            $IdCust = $request->input('idCustomer'); // Get 'IdCust' from request

            // Fetch data using stored procedure SP_1273_ACC_LIST_SJ_NOTAKREDIT
            $results = DB::connection('ConnKCNSales')
                ->select('exec SP_1273_ACC_LIST_SJ_NOTAKREDIT ?', [$IdCust]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $SuratJalan = trim($row->IDPengiriman);
                $IdBarang = trim($row->NamaBarang);
                $TSuratJalan = trim(substr($row->IDPengiriman, -10));
                $TIdBarang = trim(substr($row->NamaBarang, -20));

                if (!empty($row->NamaBarang)) {
                    $TBarang = substr($row->NamaBarang, 0, strlen($row->NamaBarang) - 22);
                } else {
                    $TBarang = '';
                }

                $MIdRetur = intval(substr($row->IDPengiriman, 0, strlen($row->IDPengiriman) - 11));

                // Prepare data to be returned
                $response[] = [
                    'SuratJalan' => $SuratJalan,
                    'IdBarang' => $IdBarang,
                    'TSuratJalan' => $TSuratJalan,
                    'TIdBarang' => $TIdBarang,
                    'TBarang' => $TBarang,
                    'MIdRetur' => $MIdRetur,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getPenagihan') {
            $IdCust = $request->input('idCustomer');
            $IdRetur = $request->input('MIdRetur');

            $results = DB::connection('ConnKCNSales')
                ->select('exec SP_1273_ACC_LIST_RETUR_NOTAKREDIT ?, ?', [$IdCust, $IdRetur]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                // Process MataUang and Kurs
                $TMataUang = $row->MataUang;
                switch ($TMataUang) {
                    case "RUPIAH":
                        $TIdMataUang = 1;
                        break;
                    case "US DOLLAR":
                        $TIdMataUang = 2;
                        break;
                    case "YEN":
                        $TIdMataUang = 3;
                        break;
                    default:
                        $TIdMataUang = null;
                }

                // Additional fields processing
                $TDiscount = $row->Discount;
                $TStatusLunas = ($row->Lunas == 'Y') ? 'Lunas' : 'Belum';
                $TTotal = 0;
                $TJmlRetur = 0;

                if (trim($row->SatuanJual) == trim($row->SatuanPrimer)) {
                    $TTotal = ($row->QtyPrimer * $row->HargaSatuan) - ($row->QtyPrimer * $row->HargaSatuan * $TDiscount);
                    $TJmlRetur = $row->QtyPrimer;
                } elseif (trim($row->SatuanJual) == trim($row->SatuanSekunder)) {
                    $TTotal = ($row->QtySekunder * $row->HargaSatuan) - ($row->QtySekunder * $row->HargaSatuan * $TDiscount);
                    $TJmlRetur = $row->QtySekunder;
                } elseif (trim($row->SatuanJual) == trim($row->SatuanTritier)) {
                    $TTotal = ($row->QtyTritier * $row->HargaSatuan) - ($row->QtyTritier * $row->HargaSatuan * $TDiscount);
                    $TJmlRetur = $row->QtyTritier;
                } else {
                    $TTotal = ($row->QTyKonversi * $row->HargaSatuan) - ($row->QTyKonversi * $row->HargaSatuan * $TDiscount);
                    $TJmlRetur = $row->QTyKonversi;
                }

                $response[] = [
                    'THarga' => $row->HargaSatuan,
                    'TMataUang' => $TMataUang,
                    'TIdMataUang' => $TIdMataUang,
                    'TKurs' => $row->NilaiKurs,
                    'TIdPenagihan' => $row->IdPenagihan,
                    'TJns_PPN' => $row->Jns_PPN ?? '',
                    'TSatuan' => $row->SatuanJual,
                    'TStatus_PPN' => $row->Status_PPN,
                    'TDiscount' => $TDiscount == ".00" ? 0 : $TDiscount,
                    'TStatus_Lunas' => $TStatusLunas,
                    'TTotal' => $TTotal,
                    'TJmlRetur' => $TJmlRetur,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getNotaKredit') {
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_List_NotaKredit ?', [1]);
            // dd($results);
            $response = [];
            if (!empty($results)) {
                foreach ($results as $row) {
                    $response[] = [
                        'Id_NotaKredit' => $row->Id_NotaKredit,
                        'NamaCust' => $row->NamaCust,
                    ];
                }

                return datatables($response)->make(true);
            }

        } else if ($id == 'getNotaKreditDetails') {
            $sNotaKredit = $request->input('no_notaKredit');
            try {
                $kode = 2;
                $results = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_List_NotaKredit @Id_NotaKredit = ?, @Kode = ?', [$sNotaKredit, $kode]);
                // dd($results);
                $response = [];
                $TGrand = 0;

                foreach ($results as $row) {
                    if (trim(Auth::user()->NomorUser) !== trim($row->UserInput)) {
                        return response()->json(['error' => (string) 'Anda Tidak Berhak mengakses data milik: ' . $row->UserInput]);
                    }

                    $Stotal = 0;
                    if (trim($row->SatuanJual) === trim($row->SatuanPrimer)) {
                        $Stotal = ($row->QtyPrimer * $row->HargaSatuan) - ($row->QtyPrimer * $row->HargaSatuan * $row->Discount);
                    } elseif (trim($row->SatuanJual) === trim($row->SatuanSekunder)) {
                        $Stotal = ($row->QtySekunder * $row->HargaSatuan) - ($row->QtySekunder * $row->HargaSatuan * $row->Discount);
                    } elseif (trim($row->SatuanJual) === trim($row->SatuanTritier)) {
                        $Stotal = ($row->QtyTritier * $row->HargaSatuan) - ($row->QtyTritier * $row->HargaSatuan * $row->Discount);
                    } else {
                        $Stotal = ($row->QTyKonversi * $row->HargaSatuan) - ($row->QTyKonversi * $row->HargaSatuan * $row->Discount);
                    }

                    $TGrand += $Stotal;

                    $response[] = [
                        'NamaCust' => $row->NamaCust,
                        'IDPengiriman' => $row->IDPengiriman,
                        'NamaBarang' => $row->NamaBarang,
                        'IdPenagihan' => $row->IdPenagihan,
                        'Stotal' => $Stotal,
                        'IdCust' => $row->IDCust,
                        'IdRetur' => $row->IDRetur,
                        'TGrand' => $TGrand,
                    ];
                }
                // $response['TGrand'] = $TGrand;

                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
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
