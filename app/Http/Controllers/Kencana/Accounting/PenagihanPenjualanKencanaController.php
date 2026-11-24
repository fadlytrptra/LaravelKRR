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

class PenagihanPenjualanKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.PenagihanPenjualan', compact('access'));
    }

    public function getCustomerKencana()
    {
        //dd("masuk");
        $data = DB::connection('ConnKCNSales')->select('exec [SP_1273_PRG_LIST_ALL_CUSTOMER]
        @Kode = 1');
        return response()->json($data);
    }

    public function getCustomerKoreksiKencana()
    {
        //dd("masuk");
        $data = DB::connection('ConnKCNSales')->select('exec [SP_1273_PRG_LIST_CUSTOMER]
        @Kode = 1');
        return response()->json($data);
    }

    public function getNoPenagihanUMKencana($noSP)
    {
        $data = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_TAGIHAN_DP_1]
        @SuratPesanan = ?', [$noSP]);
        //dd("MASUK");
        return response()->json($data);
    }

    public function getSuratJalanKencana($noSP)
    {
        $data = DB::connection('ConnKCNSales')->select('exec [SP_1273_ACC_LIST_PENGIRIMAN]
        @KODE = ?, @IdSuratPesanan = ?', [1, $noSP]);
        //dd("MASUK");
        return response()->json($data);
    }

    public function getNoPenagihanKencana($idCustomer)
    {
        $data = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ]
        @KODE = ?, @Id_Customer = ?', [6, $idCustomer]);
        return response()->json($data);
    }

    public function getDataPenagihanKencana($id_Penagihan)
    {
        $IdPenagihan = str_replace('.', '/', $id_Penagihan);
        //dd($IdPenagihan);
        $data = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ]
        @Kode = ?, @Id_Penagihan_Acuan = ?', [7, $IdPenagihan]);
        return response()->json($data);
    }

    public function LihatPenagihanKencana($id_Penagihan, $idJenisPajak)
    {
        //dd("Masuk");
        $IdPenagihan = str_replace('.', '/', $id_Penagihan);
        $data1 =
            DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ]
        @Kode = ?, @Id_Penagihan_Acuan = ?', [7, $IdPenagihan])
        ;
        //dd($IdPenagihan);
        $data2 =
            DB::connection('ConnKCNAccounting')->select('exec [SP_1486_ACC_LIST_JENIS_PAJAK]
        @KODE = ?, @Jns_PPN = ?', [1, $idJenisPajak])
        ;
        $data3 =
            DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ]
        @Kode = ?, @Id_Penagihan_Acuan = ?', [19, $IdPenagihan])
        ;

        $dataAll = [
            'data1' => $data1,
            'data2' => $data2,
            'data3' => $data3
        ];
        return response()->json($dataAll);
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
            // return response()->json($request->all());
            // Set variables from request
            $TNilaiPenagihan = (float) $request->input('TNilaiPenagihan');
            $TNilaiUM = (float) $request->input('TNilaiUM', 0);
            $TIdJnsCust = $request->input('id_cust');
            $cbPPN = $request->input('Ppn');
            $TIdMataUang = (int) $request->input('idMataUang');
            $TKurs = (int) $request->input('nilaiKurs', 1);
            $TJnsPajak = $request->input('jenis_pajak');
            $proses = $request->input('proses');
            $TTerbilang = $request->input('TTerbilang');
            $noSeriFakturPajak = $request->input('noSeriFakturPajak');
            $idBank = $request->input('idBank');
            $user_id = trim(Auth::user()->NomorUser);
            $saveData = false;

            // Save data - AddMode
            if ($proses == 1) {
                DB::connection('ConnKCNAccounting')
                    ->statement(
                        'EXEC SP_1273_PRG_MAINT_PENAGIHAN_SJ
                        @Kode = ?,
                        @Tgl_penagihan = ?,
                        @Id_Customer = ?,
                        @PO = ?,
                        @id_Jenis_Dokumen = ?,
                        @Nilai_Penagihan = ?,
                        @Id_MataUang = ?,
                        @Terbilang = ?,
                        @UserInput = ?,
                        @IdPenagih = ?,
                        @TglFakturPajak = ?,
                        @NilaiKurs = ?,
                        @Jns_PPN = ?,
                        @Id_Penagihan_Acuan = ?,
                        @NoSeriFakturPajak = ?,
                        @PPN = ?,
                        @Bank = ? ',
                        [
                            1,
                            $request->tanggal,
                            $request->idCustomer,
                            $request->nomorPO,
                            (int) $request->idJenisDokumen,
                            $TNilaiPenagihan,
                            $TIdMataUang,
                            $TTerbilang,
                            $user_id,
                            $request->idUserPenagih,
                            $request->penagihanPajak,
                            $TKurs === 0 ? 1 : $TKurs,
                            $TJnsPajak === "" ? null : $TJnsPajak,
                            $request->no_penagihanUM === "" ? null : $request->no_penagihanUM,
                            $noSeriFakturPajak,
                            $cbPPN,
                            $idBank,
                        ]
                    );

                $idPenagihan = DB::connection('ConnKCNAccounting')
                    ->select(
                        'EXEC SP_1273_PRG_LIST_PENAGIHAN_SJ
                        @Kode = ?,
                        @Tgl_Penagihan = ?,
                        @Id_Customer = ?,
                        @PO = ?,
                        @id_Jenis_Dokumen = ?,
                        @Nilai_Penagihan = ?,
                        @Id_MataUang = ?,
                        @Terbilang = ?,
                        @IdPenagih = ?,
                        @TglFakturPajak = ?,
                        @NilaiKurs = ?,
                        @Jns_PPN = ?,
                        @Id_Penagihan_Acuan = ?',
                        [
                            2,
                            $request->tanggal,
                            $request->idCustomer,
                            $request->nomorPO,
                            (int) $request->idJenisDokumen,
                            $TNilaiPenagihan,
                            $TIdMataUang,
                            $TTerbilang,
                            $request->idUserPenagih,
                            $request->penagihanPajak,
                            $TKurs === 0 ? 1 : $TKurs,
                            $TJnsPajak === "" ? null : $TJnsPajak,
                            $request->no_penagihanUM === "" ? null : $request->no_penagihanUM,
                        ]
                    );

                foreach ($request->allRowsDataAtas as $index => $item) {
                    DB::connection('ConnKCNAccounting')
                        ->statement(
                            'EXEC SP_1273_PRG_MAINT_PENAGIHAN_SJ
                        @Kode = ?,
                        @Id_Penagihan = ?,
                        @SuratJalan = ?,
                        @JatuhTempo = ?,
                        @Id_Customer = ?,
                        @SuratPesanan = ?',
                            [
                                2,
                                $idPenagihan[0]->Id_Penagihan,
                                $item[2],
                                $item[3],
                                $request->idCustomer,
                                $item[5],
                            ]
                        );
                }
                $saveData = true;
            }

            // EditMode
            if ($proses == 2) {
                // dd($request->all());
                $koreksi = DB::connection('ConnKCNAccounting')
                    ->statement(
                        'EXEC SP_1273_PRG_MAINT_PENAGIHAN_SJ
                        @Kode = ?,
                        @ID_Penagihan = ?,
                        @IdPenagih = ?,
                        @TglFakturPajak = ?,
                        @NilaiKurs = ?,
                        @Jns_PPN = ?,
                        @Bank = ?',
                        [
                            6,
                            $request->no_penagihan,
                            $request->idUserPenagih,
                            $request->penagihanPajak,
                            $TKurs,
                            $TJnsPajak,
                            $idBank
                        ]
                    );

                if ($koreksi) {
                    $saveData = true;
                }
            }

            // DeleteMode
            if ($proses == 3) {
                $hapus = DB::connection('ConnKCNAccounting')
                    ->statement(
                        'EXEC SP_1273_PRG_MAINT_PENAGIHAN_SJ
                        @Kode = ?,
                        @Id_Penagihan = ?,
                        @Tgl_Penagihan = ?,
                        @id_Jenis_Dokumen = ?,
                        @Id_Penagihan_Acuan = ?',
                        [
                            7,
                            $request->no_penagihan,
                            $request->tanggal,
                            $request->idJenisDokumen,
                            $request->no_penagihanUM
                        ]
                    );

                if ($hapus) {
                    $saveData = true;
                }
            }

            // Success messages
            if ($saveData) {
                if ($proses == 2) {
                    return response()->json(['message' => 'Data Telah Terkoreksi....']);
                } elseif ($proses == 1) {
                    return response()->json(['message' => 'Data Telah Tersimpan....']);
                } elseif ($proses == 3) {
                    return response()->json(['message' => 'Data Telah Terhapus....']);
                }
            } else {
                return response()->json(['error' => 'Data belum lengkap terisi']);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getCustomer') {
            // Call stored procedure to get customer list
            $results = DB::connection('ConnKCNSales')
                ->select('exec SP_1273_PRG_LIST_ALL_CUSTOMER ?', ['1']);
            // dd($results);
            // Instance to handle lookup (similar to mLook class in VB)
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NAMACUST' => trim($row->NAMACUST),
                    'IDCust' => trim($row->IDCust),
                ];
            }

            return datatables($response)->make(true);
            // Extracting right and left parts from IDCUST
            // $TIdCustomer = substr($response[0]['IDCUST'], -5);
            // $TIdJnsCust = substr($response[0]['IDCUST'], 0, 3);

            // Call a method (similar to Lihat_Customer in VB)
            // $this->lihatCustomer($TIdCustomer);

            // Optionally handle CmdPajak (uncomment if needed)
            // if ($TIdJnsCust == "PNX") {
            //     $CmdPajakEnabled = false;
            // } else {
            //     $CmdPajakEnabled = true;
            // }
        } else if ($id == 'getJenisCustomer') {
            $TIdCustomer = $request->input('idCustomer');

            $customerResults = DB::connection('ConnKCNSales')
                ->select('exec SP_1273_PRG_LIST_CUSTOMER @IDCUST = ?', [trim($TIdCustomer)]);
            // dd($customerResults);
            if (!empty($customerResults)) {
                $customer = $customerResults[0];
                $TIdJnsCust = $customer->JnsCust;

                if ($TIdJnsCust == 'PNX') {
                    $TNamaCust = $customer->NamaCust;
                    $TAlamat = trim((string) $customer->Alamat . ' ' . $customer->Kota);
                } else {
                    $TNamaCust = $customer->NamaNPWP ?? '';
                    $TAlamat = $customer->AlamatNPWP ?? '';
                }

                $jenisCustResults = DB::connection('ConnKCNSales')
                    ->select('exec SP_1273_PRG_LIST_JNSCUST @IDJNSCUST = ?', [trim($TIdJnsCust)]);
                // dd($jenisCustResults);
                if (!empty($jenisCustResults)) {
                    $TJenisCust = $jenisCustResults[0]->NamaJnsCust;
                }

                return response()->json([
                    'TIdJnsCust' => $TIdJnsCust,
                    'TNamaCust' => $TNamaCust,
                    'TAlamat' => $TAlamat,
                    'TJenisCust' => $TJenisCust,
                ]);
            } else {
                return response()->json(['error' => 'Customer not found',]);
            }
        } else if ($id == 'getPesanan') {
            if (empty($request->input('IdPenagihan'))) {

                $customerId = $request->input('idCustomer');
                $results = DB::connection('ConnKCNSales')
                    ->select('exec SP_1273_PRG_LIST_HEADER_PESANAN @KODE = ?, @IdCust = ?', [4, $customerId]);
                // dd($results);
                $mLook = [];
                foreach ($results as $row) {
                    $mLook[] = [
                        'IDSuratPesanan' => $row->IDSuratPesanan,
                        'Tgl_Pesan' => \Carbon\Carbon::parse($row->Tgl_Pesan)->format('m/d/Y'),
                    ];
                }
                return datatables($mLook)->make(true);

            }
        } else if ($id == 'getPesananDetails') {
            // Initialize variables
            $TPO = '';
            $TIdMataUang = '';
            $TMataUang = '';
            $sNoSP = $request->input('no_sp');
            // dd($sNoSP);
            try {
                // Fetch order details using SP_1486_ACC_LIST_HEADER_PESANAN
                $orderResults = DB::connection('ConnKCNSales')
                    ->select('exec SP_1273_PRG_LIST_HEADER_PESANAN @Kode = ?, @IDSURATPESANAN = ?', [3, $sNoSP]);
                // dd($orderResults);
                if (count($orderResults) > 0) {
                    $order = $orderResults[0];
                    $TIdMataUang = $order->IDMataUang;
                    $TsyaratPembayaran = $order->SyaratBayar ?? 0;
                    $TPO = $order->NO_PO ?? '';
                    // $Syarat$order->SyaratBayar

                    // Map currency code to a numeric value
                    if ($TIdMataUang == 'IDR') {
                        $TIdMataUang = 1;
                    } elseif ($TIdMataUang == 'USD') {
                        $TIdMataUang = 2;
                    }
                }

                // Fetch currency details using SP_1486_ACC_LIST_MATAUANG
                $currencyResults = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_MATAUANG @Kode = ?, @IdMataUang = ?', [2, $TIdMataUang]);
                // dd($currencyResults);
                if (count($currencyResults) > 0) {
                    $TMataUang = $currencyResults[0]->Nama_MataUang;
                }

                // Determine if 'TKurs' field should be enabled
                // $TKursEnabled = ($TIdMataUang != 1);

                return response()->json([
                    'TPO' => $TPO,
                    'TIdMataUang' => $TIdMataUang,
                    'TMataUang' => $TMataUang,
                    'TsyaratPembayaran' => $TsyaratPembayaran,
                    // 'TKursEnabled' => $TKursEnabled,
                ]);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()]);
            }
        } else if ($id == 'getPenagih') {
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_USER_PENAGIH @KODE = ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama' => trim($row->Nama),
                    'IdUser' => trim($row->IdUser),
                ];
            }

            // Return as a datatable
            return datatables($response)->make(true);

        } else if ($id == 'getBank') {
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_4384_PRG_LIST_KETERANGAN_BANK @XKode = ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NamaBank' => trim($row->NamaBank),
                    'IdBank' => trim($row->IdBank),
                ];
            }

            // Return as a datatable
            return datatables($response)->make(true);

        } else if ($id == 'getPajak') {
            // Execute the stored procedure to list jenis pajak
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_JENIS_PAJAK');
            // dd($results);
            // Prepare the response array
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_Jns_PPN' => trim($row->Nama_Jns_PPN),
                    'Jns_PPN' => trim($row->Jns_PPN),
                ];
            }

            return datatables($response)->make(true);

            } else if ($id == 'getTagihanDP') {
                $suratPesanan = $request->input('no_sp');

                $results = DB::connection('ConnKCNAccounting')
                    ->select(
                        'exec SP_1273_PRG_LIST_TAGIHAN_DP_1 @SuratPesanan = ?',
                        [$suratPesanan]
                    );

                $ids = collect($results)
                    ->map(fn($row) => trim((string) $row->Id_Penagihan))
                    ->all();

                $headerById = collect();

                if (!empty($ids)) {
                    $headerById = DB::connection('ConnKCNAccounting')
                        ->table('T_PENAGIHAN_SJ')
                        ->whereIn('Id_Penagihan', $ids)
                        ->get([
                            'Id_Penagihan',
                            'Nilai_blm_Pajak',
                            'Nilai_Penagihan'
                        ])
                        ->keyBy(fn($row) => trim((string) $row->Id_Penagihan));
                }

                $response = [];

                foreach ($results as $row) {
                    $id = trim((string) $row->Id_Penagihan);
                    $header = $headerById->get($id);

                    $response[] = [
                        'Id_Penagihan' => $id,
                        'nilai_BLM_PAJAK' =>
                            $header->Nilai_blm_Pajak ?? $row->nilai_BLM_PAJAK,
                        'Nilai_Penagihan' =>
                            $header->Nilai_Penagihan ?? 0,
                    ];
                }

                return datatables($response)->make(true);

        } else if ($id == 'getSuratJalan') {
            // Menjalankan stored procedure 'SP_1486_ACC_LIST_PENGIRIMAN'
            $kode = 1;
            $idSuratPesanan = $request->input('no_sp');

            $results = DB::connection('ConnKCNSales')
                ->select('exec SP_1273_ACC_LIST_PENGIRIMAN @KODE = ?, @IdSuratPesanan = ?', [$kode, $idSuratPesanan]);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'IDPengiriman' => $row->IDPengiriman,
                    'TanggalDiterima' => \Carbon\Carbon::parse($row->TanggalDiterima)->format('m/d/Y'),
                ];
            }

            return datatables($response)->make(true);
            // Assuming we set values to variables TSuratJalan and TtglSJ similar to VB.NET
            // $TSuratJalan = $response[0]['IDPENGIRIMAN'] ?? '';
            // $TtglSJ = $response[0]['TANGGALDITERIMA'] ?? '';

            // // Cek apakah Surat Jalan sudah diinputkan
            // if (!empty($TSuratJalan)) {
            //     // Cek apakah ada dalam daftar ListSJ
            //     $listSJ = $request->input('ListSJ', []);  // Assuming ListSJ is passed in the request

            //     foreach ($listSJ as $item) {
            //         if (trim($item['TSuratJalan']) == trim($TSuratJalan) && trim($item['SubItems'][4]) == trim($idSuratPesanan)) {
            //             return response()->json(['message' => 'Data sudah diinputkan'], 200);
            //         }
            //     }

            //     // Simulasi membuka form 'FrmSuratJalan' dan memanggil fungsi 'LihatDetilSJ'
            //     $this->lihatDetilSJ($TSuratJalan, $request->input('TidCustomer'), $idSuratPesanan);

            //     return response()->json(['TSuratJalan' => $TSuratJalan, 'TtglSJ' => $TtglSJ], 200);
            // }
        } else if ($id == 'getDokumen') {
            $kode = trim($request->input('id_cust')) == 'NPX' ? 3 : 2;

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_JENIS_DOKUMEN @KODE = ?', [$kode]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_Dokumen' => trim($row->Nama_Dokumen),
                    'Id_Jenis_Dokumen' => trim($row->Id_Jenis_Dokumen),
                ];
            }

            // Return the response as a datatable
            return datatables($response)->make(true);
        } else if ($id == 'LihatDetilSJ') {
            // Parameters from request
            $sSuratJalan = trim($request->input('surat_jalan'));
            $sIdCust = trim($request->input('idCustomer'));
            $sSuratPesanan = trim($request->input('no_sp'));
            // dd($request->all());
            // Execute the stored procedure
            $results = DB::connection('ConnKCNSales')
                ->select(
                    'exec SP_1273_ACC_LIST_PENGIRIMAN @Kode = ?, @IDPENGIRIMAN = ?, @IDCust = ?, @IdSuratPesanan = ?',
                    [2, $sSuratJalan, $sIdCust, $sSuratPesanan]
                );
            // dd($results);
            // dd([
            //     'request' => $request->all(),
            //     'surat_jalan' => $sSuratJalan,
            //     'id_customer' => $sIdCust,
            //     'no_sp' => $sSuratPesanan,
            //     'results' => $results,
            // ]);
            // Initialize variables
            $response = [];
            $total = 0;

            foreach ($results as $row) {
                // Konversi nilai JmlTerimaUmum
                $jmlTerimaUmum = (float) $row->JmlTerimaUmum; // Pastikan nilai numerik
                $jmlTerimaUmum = ($jmlTerimaUmum == 0) ? 0 : (int) $jmlTerimaUmum; // Konversi 0.00 atau .00 menjadi 0, lainnya menjadi integer

                // Build the response array similar to ListSJ in VB.NET
                $response[] = [
                    'NamaBarang' => $row->NamaBarang,
                    'JmlTerimaUmum' => $jmlTerimaUmum,
                    'HargaSatuan' => $row->HargaSatuan,
                    'Satuan' => $row->Satuan,
                    'Total' => number_format($row->Total, 2),
                ];
            }

            // Return the response with total amount
            return datatables($response)->make(true);
            // return response()->json([
            //     'data' => $response,
            //     'total' => number_format($total, 2)
            // ]);
        } else if ($id == 'TotalDetailSJ') {
            // Parameters from request
            $sSuratJalan = trim($request->input('surat_jalan'));
            $sIdCust = trim($request->input('idCustomer'));
            $sSuratPesanan = trim($request->input('no_sp'));
            // dd($request->all());
            // Execute the stored procedure
            $results = DB::connection('ConnKCNSales')
                ->select(
                    'exec SP_1273_ACC_LIST_PENGIRIMAN @Kode = ?, @IDPENGIRIMAN = ?, @IDCust = ?, @IdSuratPesanan = ?',
                    [2, $sSuratJalan, $sIdCust, $sSuratPesanan]
                );
            // dd($results);
            // Initialize variables
            $response = [];
            $total = 0;

            foreach ($results as $row) {
                // Build the response array similar to ListSJ in VB.NET
                $response[] = [
                    'Total' => number_format($row->Total, 2),
                ];
                // Calculate total
                $total += $row->Total;
            }

            // Return the response with total amount
            // return datatables($response)->make(true);
            return response()->json([
                'total' => number_format($total, 2)
            ]);
        } else if ($id == 'getPenagihan') {
            // Execute the stored procedure for Penagihan
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ1 @KODE = ?, @IDCustomer = ?', [6, $request->idCustomer]);

            // Create a lookup class logic equivalent
            $lookupData = [];
            foreach ($results as $row) {
                $lookupData[] = [
                    'Tgl_Penagihan' => \Carbon\Carbon::parse($row->Tgl_Penagihan)->format('m/d/Y'),
                    'Id_Penagihan' => $row->Id_Penagihan,
                ];
            }
            return datatables($lookupData)->make(true);

        } else if ($id == 'lihatPenagihan') {
            $sid_Penagihan = $request->input('no_penagihan');

            // Execute first stored procedure
            $penagihanResults = DB::connection('ConnKCNAccounting')->select(
                'exec SP_1273_PRG_LIST_PENAGIHAN_SJ1 @Kode = 7, @ID_PENAGIHAN = ?',
                [$sid_Penagihan]
            );

            // Pastikan data penagihan ditemukan
            if (empty($penagihanResults)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data penagihan tidak ditemukan.',
                ], 404);
            }

            $penagihan = $penagihanResults[0];

            // Ambil data penagihan
            $TIdCustomer = $penagihan->Id_Customer;
            $TIdMataUang = $penagihan->Id_MataUang;
            $TMataUang = $penagihan->Nama_MataUang;

            $Tanggal = !empty($penagihan->Tgl_Penagihan)
                ? \Carbon\Carbon::parse($penagihan->Tgl_Penagihan)->format('Y-m-d')
                : null;

            $TglFakturPajak = !empty($penagihan->TglFakturPajak)
                ? \Carbon\Carbon::parse($penagihan->TglFakturPajak)->format('Y-m-d')
                : null;

            $TsyaratPembayaran = $penagihan->SyaratBayar;
            $TPO = $penagihan->PO;
            $Tid_Penagihan = $penagihan->Id_Penagihan;
            $TKurs = $penagihan->NilaiKurs;
            $TDokumen = $penagihan->Nama_Dokumen;
            $TIdJnsDok = $penagihan->Id_Jenis_Dokumen;
            $TIdUser = $penagihan->IdPenagih;
            $TPenagih = $penagihan->Nama;

            $TJnsPajak = $penagihan->Jns_PPN ?? '';
            $cbPPN = $penagihan->PPN;

            $TNilai_UM = $penagihan->Nilai_UM ?? '0';
            $Tid_PenagihanUM = $penagihan->Id_Penagihan_Acuan ?? '';
            $TNilai_Penagihan = $penagihan->Nilai_Penagihan;

            $TIdBank = $penagihan->KetBank;
            $TNamaBank = $penagihan->NamaBank;
            $TNilai_blm_Pajak = $penagihan->Nilai_blm_Pajak;

            // Default nilai pajak
            $TPajak = null;

            // Execute second stored procedure if tax type exists
            if (!empty($TJnsPajak)) {

                $jenisPajakResults = DB::connection('ConnKCNAccounting')->select(
                    'exec SP_1273_PRG_LIST_JENIS_PAJAK @KODE = 1, @Jns_PPN = ?',
                    [$TJnsPajak]
                );

                if (!empty($jenisPajakResults)) {
                    $TPajak = $jenisPajakResults[0]->Nama_Jns_PPN;
                }
            }

            // Execute third stored procedure for list of Surat Jalan
            $sjResults = DB::connection('ConnKCNAccounting')->select(
                'exec SP_1273_PRG_LIST_PENAGIHAN_SJ1 @Kode = 19, @ID_PENAGIHAN = ?',
                [$sid_Penagihan]
            );

            $listSJ = [];

            foreach ($sjResults as $sj) {
                $listSJ[] = [
                    'Surat_Jalan' => $sj->Surat_Jalan,
                    'Tgl_Surat_jalan' => \Carbon\Carbon::parse($sj->Tgl_Surat_jalan)->format('m/d/Y'),
                    'Total' => $sj->Total,
                    'IDSuratPesanan' => $sj->IDSuratPesanan,
                    'Type' => 'SJ',
                ];
            }

            // Return JSON
            return response()->json([
                'TIdCustomer' => $TIdCustomer,
                'TIdMataUang' => $TIdMataUang,
                'TMataUang' => $TMataUang,
                'Tanggal' => $Tanggal,
                'TglFakturPajak' => $TglFakturPajak,
                'TsyaratPembayaran' => $TsyaratPembayaran,
                'TPO' => $TPO,
                'Tid_Penagihan' => $Tid_Penagihan,
                'TKurs' => number_format((float) $TKurs, 0),
                'TDokumen' => $TDokumen,
                'TIdJnsDok' => $TIdJnsDok,
                'TIdUser' => $TIdUser,
                'TPenagih' => $TPenagih,
                'TJnsPajak' => $TJnsPajak,
                'cbPPN' => $cbPPN,
                'TNilai_UM' => $TNilai_UM,
                'Tid_PenagihanUM' => $Tid_PenagihanUM,
                'TNilai_Penagihan' => number_format((float) $TNilai_Penagihan, 0, '', ''),
                'TNilai_blm_Pajak' => $TNilai_blm_Pajak,
                'TPajak' => $TPajak,
                'ListSJ' => $listSJ,
                'TIdBank' => $TIdBank,
                'TNamaBank' => $TNamaBank,
            ]);
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
