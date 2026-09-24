<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class PenagihanPenjualanExportController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.PenagihanPenjualanExport', compact('access'));
    }

    // public function getCustomerEx()
    // {
    //     $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_CUSTOMER_EXPORT]
    //     @Kode = ?', [1]);
    //     return response()->json($data);
    // }

    // public function getSuratJalanEx($idCustomer)
    // {
    //     $data =  DB::connection('ConnSales')->select('exec [SP_1486_SLS_LIST_PENGIRIMAN_EXPORT]
    //     @Kode = ?, @IdCust = ?', [1, $idCustomer]);
    //     return response()->json($data);
    // }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        // dd($request->all());
        try {
            $allRowsDataAtas = $request->input('allRowsDataAtas', []);
            $allRowsDataHapus = $request->input('allRowsDataHapus', []);
            $proses = $request->input('proses');
            $terbilang = $request->input('TTerbilang', "");

            if (count($allRowsDataAtas) == 0) {
                return response()->json(['error' => 'Pengisian SJ Belum Ada']);
            }

            // Assume addMode and stored procedure
            if ($proses == 1) {
                $result = DB::connection('ConnAccounting')
                    ->select(
                        'exec SP_1486_ACC_MAINT_PENAGIHANSJ_EXPORT
                @Kode = ?,
                @Tgl_Penagihan = ?,
                @Id_Customer = ?,
                @id_Jenis_Dokumen = ?,
                @Nilai_Penagihan = ?,
                @Id_MataUang = ?,
                @Terbilang = ?,
                @UserInput = ?,
                @IdPenagih = ?,
                @NilaiKurs = ?,
                @NoPEB = ?,
                @TglPEB = ?,
                @NoBL = ?,
                @TglBL = ?,
                @NilaiTotalFOB = ?',
                        [
                            1,
                            $request->input('tanggal'),
                            $request->input('idCustomer'),
                            (int) $request->input('idJenisDokumen'),
                            (float) str_replace(',', '', $request->input('nilaiDitagihkan')),
                            (int) $request->input('idMataUang'),
                            (string) $terbilang,
                            trim(Auth::user()->NomorUser),
                            (string) $request->input('idUserPenagih'),
                            (float) $request->input('nilaiKurs'),
                            $request->input('noPEB'),
                            $request->input('tanggalPEB'),
                            $request->input('noBL'),
                            $request->input('tanggalBL'),
                            (float) $request->input('totalFOB'),
                        ]
                    );

                $id_Penagihan = $result[0]->ID_Penagihan ?? null;
                // dd($id_Penagihan);

                // $id_penagihan = DB::connection('ConnAccounting')
                //     ->select('SELECT SCOPE_IDENTITY() AS id_penagihan');

                foreach ($allRowsDataAtas as $list_sj) {
                    DB::connection('ConnAccounting')
                        ->statement('exec SP_1486_ACC_MAINT_PENAGIHANSJ_EXPORT @Kode = ?, @Id_Penagihan = ?, @SuratJalan = ?, @JatuhTempo = ?, @Id_Customer = ?', [
                            2,
                            $id_Penagihan,
                            $list_sj[0],
                            $list_sj[1],
                            $request->input('idCustomer')
                        ]);
                }

                return response()->json(['message' => 'Data Telah Tersimpan'], 200);
            }

            // EditMode logic
            if ($proses == 2) {
                $id_penagihan = $request->input('no_penagihan');
                // Hapus data ListHapus (Kode = 3)
                if ($allRowsDataHapus) {
                    foreach ($allRowsDataHapus as $list_hapus) {
                        DB::connection('ConnAccounting')
                            ->statement('exec SP_1486_ACC_MAINT_PENAGIHANSJ_EXPORT @Kode = ?, @id_detail_penagihan = ?, @Id_Penagihan = ?, @SuratJalan = ?, @Id_Customer = ?', [
                                3,
                                $list_hapus[4],  // id_detail_penagihan
                                $id_penagihan,                       // Id_Penagihan
                                $list_hapus[0],          // Surat Jalan
                                $request->input('idCustomer')       // Id_Customer
                            ]);
                    }
                }

                // Update Data ListSJ jika ada tambahan (Kode = 2)
                foreach ($allRowsDataAtas as $list_sj) {
                    if (empty($list_sj[3])) {
                        DB::connection('ConnAccounting')
                            ->statement('exec SP_1486_ACC_MAINT_PENAGIHANSJ_EXPORT @Kode = ?, @Id_Penagihan = ?, @SuratJalan = ?, @JatuhTempo = ?, @Id_Customer = ?', [
                                2,
                                $id_penagihan,                  // Id_Penagihan
                                $list_sj[0],        // Surat Jalan
                                $list_sj[1],        // Jatuh Tempo
                                $request->input('idCustomer')  // Id_Customer
                            ]);
                    }
                }

                // Update Penagihan Data (Kode = 4)
                DB::connection('ConnAccounting')
                    ->statement('exec SP_1486_ACC_MAINT_PENAGIHANSJ_EXPORT @Kode = ?, @Id_Penagihan = ?, @Nilai_Penagihan = ?, @Terbilang = ?, @IdPenagih = ?, @NilaiKurs = ?, @NilaiTotalFOB = ?, @TglPEB = ?, @TglBL = ?', [
                        4,
                        $id_penagihan,                         // Id_Penagihan
                        (float) str_replace(',', '', $request->input('nilaiDitagihkan')),    // Nilai_Penagihan
                        (string) $terbilang,                            // Terbilang
                        $request->input('idUserPenagih'),            // IdPenagih
                        (float) $request->input('nilaiKurs'),               // NilaiKurs
                        (float) $request->input('totalFOB'),    // NilaiTotalFOB
                        $request->input('tanggalPEB'),                 // TglPEB
                        $request->input('tanggalBL')                    // TglBL
                    ]);

                return response()->json(['message' => 'Data Telah Terkoreksi']);

            }

            // DelMode logic
            if ($proses == 3) {
                DB::connection('ConnAccounting')
                    ->statement('exec SP_1486_ACC_MAINT_PENAGIHANSJ_EXPORT @Kode = ?, @Id_Penagihan = ?, @Tgl_Penagihan = ?', [
                        5,
                        $request->input('no_penagihan'),
                        $request->input('tanggal'),
                    ]);

                return response()->json(['message' => 'Data Telah Terhapus'], 200);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getPenagihan') {
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1486_ACC_LIST_PENAGIHAN_SJ ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Penagihan' => \Carbon\Carbon::parse($row->Tgl_Penagihan)->format('m/d/Y'),
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'NamaCust' => $row->NamaCust,
                    'PO' => $row->PO ?? '',
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 2, '.', ','),
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Id_Customer' => $row->Id_Customer,
                    'Id_MataUang' => $row->Id_MataUang,
                    'NilaiKurs' => $row->NilaiKurs,
                    'NamaNPWP' => $row->NamaNPWP ?? '',
                    'JnsCust' => $row->JnsCust ?? '',
                    'IdFakturPajak' => $row->IdFakturPajak ?? '',
                    'Nama_Jns_PPN' => $row->Nama_Jns_PPN ?? '',
                ];
            }
            return datatables($response)->make(true);

        } else if ($id == 'getCustomer') {
            try {
                $results = DB::connection('ConnSales')
                    ->select('exec SP_1486_ACC_LIST_CUSTOMER_EXPORT ?', ['1']);
                // dd($results);
                $response = [];
                foreach ($results as $row) {
                    // Simulating logic in VB: extracting last 5 characters for TIdCustomer and first 3 for TIdJnsCust
                    $kode = trim($row->Kode);
                    $TIdCustomer = substr($kode, -5); // Last 5 characters
                    $TIdJnsCust = substr($kode, 0, 3); // First 3 characters

                    $response[] = [
                        'NamaCust' => trim($row->NamaCust),
                        'Kode' => $kode,
                        'TIdCustomer' => $TIdCustomer,
                        'TIdJnsCust' => $TIdJnsCust,
                    ];
                }

                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        } else if ($id == 'getSuratJalan') {
            $results = DB::connection('ConnSales')
                ->select('exec SP_1486_SLS_LIST_PENGIRIMAN_EXPORT ?, ?', [1, $request->input('idCustomer')]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'IDPengiriman' => $row->IDPengiriman,
                    'Tanggal' => \Carbon\Carbon::parse($row->Tanggal)->format('m/d/Y'),
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getPengirimanDetails') {
            // dd($request->all());
            $results = DB::connection('ConnSales')
                ->select('exec SP_1486_SLS_LIST_PENGIRIMAN_EXPORT @Kode = ?, @IDPengiriman = ?, @IDCust = ?', [2, $request->input('surat_jalan'), $request->input('idCustomer')]);
            // dd($results);
            // Assume the first record provides the currency information
            if (!empty($results)) {
                $TIdMataUang = $results[0]->IDMataUang ?? '';
                $TMataUang = $results[0]->MataUang ?? '';
            }

            // Map currency to ID
            if ($TIdMataUang === 'IDR')
                $TIdMataUang = 1;
            if ($TIdMataUang === 'USD')
                $TIdMataUang = 2;

            // Get detailed items list
            $items = DB::connection('ConnSales')
                ->select('exec SP_1486_SLS_LIST_PENGIRIMAN_EXPORT @Kode = ?, @IDPengiriman = ?, @IDCust = ?', [3, $request->input('surat_jalan'), $request->input('idCustomer')]);
            // dd($items);
            $response = [];
            // $total = 0;

            foreach ($items as $item) {
                $response[] = [
                    'NamaBarang' => $item->NamaBarang,
                    'JmlTerimaUmum' => number_format($item->JmlTerimaUmum, 2, '.', ','),
                    'HargaSatuan' => number_format($item->HargaSatuan, 6, '.', ','),
                    'Satuan' => $item->Satuan,
                    'Total' => number_format($item->Total, 2, '.', ','),
                    'StatusRetur' => is_null($item->StatusRetur) ? 'N' : 'Y',
                    'TotalFOB' => is_null($item->TotalFOB) ? '0' : number_format($item->TotalFOB, 2, '.', ','),
                    'IdPesanan' => $item->IdPesanan,
                ];
                // $total += (float) $item->Total;
            }

            return datatables($response)->make(true);

            // Returning datatables response with total amount
            // return datatables([
            //     'listSJ' => $response,
            //     'total' => number_format($total, 2, '.', ',')
            // ])->make(true);
        } else if (($id == 'getMataUang')) {
            $results = DB::connection('ConnSales')
                ->select('exec SP_1486_SLS_LIST_PENGIRIMAN_EXPORT @Kode = ?, @IDPengiriman = ?, @IDCust = ?', [2, $request->input('surat_jalan'), $request->input('idCustomer')]);
            // dd($results);
            // Assume the first record provides the currency information
            if (!empty($results)) {
                $TIdMataUang = $results[0]->IDMataUang ?? '';
                $TMataUang = $results[0]->MataUang ?? '';
            }

            // Map currency to ID
            if ($TIdMataUang === 'IDR')
                $TIdMataUang = 1;
            if ($TIdMataUang === 'USD')
                $TIdMataUang = 2;

            return response()->json([
                'TIdMataUang' => $TIdMataUang,
                'TMataUang' => $TMataUang,
            ]);
        } else if ($id == 'insFOB') {
            // Ambil parameter dari request
            $idPesanan = $request->input('idPesananM');
            $totalFOB = $request->input('harga_fob');

            // Jalankan stored procedure dengan parameter
            DB::connection('ConnSales')
                ->statement('exec SP_1486_SLS_MAINT_DETAILPESANAN1 @Kode = ?, @IdPesanan = ?, @TotalFOB = ?', [7, $idPesanan, $totalFOB]);

            // Berikan respons jika diperlukan
            return response()->json(['message' => 'Data successfully updated!']);

        } else if ($id == 'insSimpan') {
            // Fetch data from request
            $idPengiriman = $request->input('surat_jalan');
            $idCust = $request->input('idCustomer');
            $listItems = $request->input('ListItems');

            // Validation to check if 'totalFOB' is filled in each list item
            foreach ($listItems as $item) {
                if (empty($item['totalFOB'])) {
                    return response()->json(['error' => 'Isi Harga Satuan FOB Terlebih Dahulu!']);
                }
            }

            // Initialize variables for total calculation
            $totalSum = 0;
            $totalFOBSum = 0;

            // Sum up 'total' and 'totalFOB' from all items
            foreach ($listItems as $item) {
                // Remove commas from 'total' and 'totalFOB', convert them to floats for summation
                $totalSum += (float) str_replace(',', '', $item['total']);
                $totalFOBSum += (float) str_replace(',', '', $item['totalFOB']);
            }

            // Run the stored procedure to update data
            $totalFOB = null;
            $results = DB::connection('ConnSales')
                ->select('exec SP_1486_SLS_LIST_PENGIRIMAN_EXPORT ?, ?, ?', [4, $idPengiriman, $idCust]);

            if (count($results) > 0) {
                $totalFOB = $results[0]->TotalFOB;
            }

            // Create a single updated list item with the summed values
            $updatedListItems = [
                [
                    'SuratJalan' => $idPengiriman,
                    'TanggalSJ' => \Carbon\Carbon::now()->format('m/d/Y'),  // Set current date
                    'Total' => number_format($totalSum, 2, '.', ','),  // Format summed total
                    'TotalFOB' => number_format($totalFOBSum, 2, '.', ','),  // Format summed totalFOB
                ]
            ];

            // Return the updated list as response
            return datatables($updatedListItems)->make(true);
        } else if ($id == 'getPenagih') {
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1486_ACC_LIST_USER_PENAGIH @KODE = ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama' => trim($row->Nama),
                    'IdUser' => trim($row->IdUser),
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getPenagihanExport') {
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1486_ACC_LIST_PENAGIHAN_SJ_EXPORT ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NamaCust' => $row->NamaCust,
                    'Id_Penagihan' => $row->Id_Penagihan
                ];
            }
            return datatables($response)->make(true);

        } else if ($id == 'getPenagihanDetails') {
            try {
                // Jalankan stored procedure pertama (SP_1486_ACC_LIST_PENAGIHAN_SJ_EXPORT)
                $idPenagihan = $request->input('no_penagihan');
                $resultPenagihan = DB::connection('ConnAccounting')
                    ->select('exec SP_1486_ACC_LIST_PENAGIHAN_SJ_EXPORT ?, ?', [2, trim($idPenagihan)]);
                // dd($resultPenagihan);
                if (count($resultPenagihan) > 0) {
                    // Ambil data dari hasil stored procedure pertama
                    $penagihanData = $resultPenagihan[0];
                    $response = [
                        'Id_Customer' => $penagihanData->Id_Customer,
                        'Id_MataUang' => $penagihanData->Id_MataUang,
                        'Nama_MataUang' => $penagihanData->Nama_MataUang,
                        'Nilai_Penagihan' => number_format($penagihanData->Nilai_Penagihan, 2, '.', ','),
                        'Terbilang' => $penagihanData->Terbilang,
                        'NilaiKurs' => $penagihanData->NilaiKurs,
                        'Dokumen' => 'Invoice',
                        'IdJnsDok' => '8',
                        'NamaPenagih' => $penagihanData->NamaPenagih,
                        'IdPenagih' => $penagihanData->IdPenagih,
                        'Tgl_Penagihan' => \Carbon\Carbon::parse($penagihanData->Tgl_Penagihan)->format('Y-m-d'),
                    ];
                }

                // Jalankan stored procedure kedua (SP_1486_ACC_LIST_PENAGIHAN_SJ_EXPORT2)
                $listItems = DB::connection('ConnAccounting')
                    ->select('exec SP_1486_ACC_LIST_PENAGIHAN_SJ_EXPORT2 ?', [$idPenagihan]);
                // dd($listItems);
                // Siapkan list item dari stored procedure kedua
                $listSJ = [];
                foreach ($listItems as $item) {
                    $listSJ[] = [
                        'Surat_Jalan' => $item->Surat_Jalan,
                        'Tgl_Surat_Jalan' => \Carbon\Carbon::parse($item->Tgl_Surat_jalan)->format('m/d/Y'),
                        'Total' => number_format($item->Total, 2, '.', ','),
                        'ID_Detail_Penagihan' => $item->ID_Detail_Penagihan,
                    ];
                }

                // Mengirimkan hasil sebagai response JSON
                return response()->json([
                    'penagihanData' => $response,
                    'listSJ' => $listSJ
                ]);

            } catch (Exception $e) {
                // Menangkap error dan mengembalikan pesan error
                return response()->json([
                    'error' => 'Error: ' . $e->getMessage()
                ], 500);
            }
        }

        // else if ($id == 'insSimpan') {
        //     // dd($request->all());
        //     // Fetch data from request
        //     $idPengiriman = $request->input('surat_jalan');
        //     $idCust = $request->input('idCustomer');
        //     $listItems = $request->input('ListItems');

        //     // Validation to check if 'totalFOB' is filled in each list item
        //     foreach ($listItems as $item) {
        //         // Check if totalFOB is empty or null (handle formatted values if needed)
        //         if (empty($item['totalFOB'])) {
        //             return response()->json(['error' => 'Isi Harga Satuan FOB Terlebih Dahulu!']);
        //         }
        //     }

        //     // Run the stored procedure to update data
        //     $totalFOB = null;
        //     $results = DB::connection('ConnSales')
        //         ->select('exec SP_1486_SLS_LIST_PENGIRIMAN_EXPORT @Kode = ?, @IDPengiriman = ?, @IDCust = ?', [4, $idPengiriman, $idCust]);

        //     if (count($results) > 0) {
        //         $totalFOB = $results[0]->TotalFOB;
        //     }

        //     // Update front-end data (simulating FrmTagihanSJexport behavior)
        //     $updatedListItems = [];
        //     foreach ($listItems as $item) {
        //         $updatedListItems[] = [
        //             'SuratJalan' => $idPengiriman,
        //             'TanggalSJ' => \Carbon\Carbon::now()->format('m/d/Y'),  // Example of setting current date
        //             'Total' => $item['total'],  // Using 'total' from listItems
        //             'TotalFOB' => number_format((float) str_replace(',', '', $item['totalFOB']), 2, '.', ''), // Formatting totalFOB correctly
        //         ];
        //     }

        //     return datatables($updatedListItems)->make(true);
        //     // Assuming the updated list items will be returned as a response
        //     // return response()->json([
        //     //     'message' => 'Data successfully saved!',
        //     //     'updatedListItems' => $updatedListItems,
        //     //     'totalFOB' => $totalFOB,
        //     // ]);
        // }
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
