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

class NotaPenjualanTunaiKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.NotaPenjualanTunai', compact('access'));
    }

    // public function getLihatPesanan($noSP)
    // {
    //     $data = DB::connection('ConnKCNSales')->select('exec [SP_1273_PRG_LIST_HEADER_PESANAN]
    //     @Kode = ?, @IDSURATPESANAN = ?', [3, $noSP]);
    //     return response()->json($data);
    // }

    // public function getNotaJualTunai($noSP)
    // {
    //     $data = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ]
    //     @KODE = ?, @SURATPESANAN = ?', [22, $noSP]);
    //     return response()->json($data);
    // }

    // public function getNotaJualTunai2($noSP)
    // {
    //     $data = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ]
    //     @KODE = ?, @SURATPESANAN = ?', [13, $noSP]);
    //     return response()->json($data);
    // }

    // public function getUserPenagihNota()
    // {
    //     $data = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_USER_PENAGIH]
    //     @KODE = ?', [1]);
    //     return response()->json($data);
    // }

    // public function getDokumenNota($kode)
    // {
    //     $jenis = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_JENIS_DOKUMEN] @KODE = ?', [$kode]);
    //     return response()->json($jenis);
    // }

    // public function getJenisPajakNota()
    // {
    //     $jenis = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_JENIS_PAJAK]');
    //     return response()->json($jenis);
    // }

    // public function getNoPenagihanUMNota($noSP)
    // {
    //     $jenis = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_TAGIHAN_DP_1] @SuratPesanan = ?', [$noSP]);
    //     return response()->json($jenis);
    // }

    // public function getNoPenagihan()
    // {
    //     $jenis = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ] @KODE = ?', [14]);
    //     return response()->json($jenis);
    // }

    // public function getJenisCust($idCustomer)
    // {
    //     $jenis = DB::connection('ConnKCNSales')->select('exec [SP_1273_PRG_LIST_CUSTOMER] @IDCUST = ?', [$idCustomer]);
    //     return response()->json($jenis);
    // }

    // public function getJnsCust($idJenisCustomer)
    // {
    //     $jenis = DB::connection('ConnKCNSales')->select('exec [SP_1273_PRG_LIST_JNSCUST] @IDJNSCUST = ?', [$idJenisCustomer]);
    //     return response()->json($jenis);
    // }

    // public function getLihatSP($id_Penagihan)
    // {
    //     $idNoPenagihan = str_replace('.', '/', $id_Penagihan);

    //     $jenis = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ] @KODE = 15, @ID_PENAGIHAN = ?', [$idNoPenagihan]);
    //     return response()->json($jenis);
    // }

    // public function getDataSP($noSP)
    // {
    //     $jenis = DB::connection('ConnKCNSales')->select('exec [SP_1273_PRG_LIST_HEADER_PESANAN] @KODE = 3, @IDSURATPESANAN = ?', [$noSP]);
    //     return response()->json($jenis);
    // }

    // public function getLihatPenagihan($id_Penagihan)
    // {
    //     $idNoPenagihan = str_replace('.', '/', $id_Penagihan);
    //     $jenis = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ] @KODE = 7, @ID_PENAGIHAN = ?', [$idNoPenagihan]);
    //     return response()->json($jenis);
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
            $proses = $request->input('proses');
            $TotalPenagihan = (float) str_replace(',', '', $request->input('totalPenagihan'));
            $discount = (float) $request->input('discount');
            $terbilang = $request->input('TTerbilang');
            $user_id = trim(Auth::user()->NomorUser);
            $TIdMataUang = (int) $request->input('idMataUang');
            // Insert or update Penagihan data
            // $penagihanParams = [
            //     1,
            //     $request->tanggalInput,
            //     $request->idCustomer,
            //     $request->nomorPO,
            //     $request->idJenisDokumen,
            //     (float) $TotalPenagihan,
            //     (float) $discount,
            //     $request->idMataUang,
            //     $terbilang,
            //     trim(Auth::user()->NomorUser),
            //     $request->idUserPenagih,
            //     $request->penagihanPajak,
            //     (float) $request->nilaiKurs ?: 1,
            //     $request->jenis_pajak ?: null,
            //     (int) $request->Ppn,
            //     $request->id_penagihanUM ?: null
            // ];
            // dd($penagihanParams);
            // dd($request->idJenisDokumen);
            // dd(array_column($request->allRowsDataAtas, 1));

            if ($proses == 1) {
                // $kode = 1; // Replace with dynamic values if needed
                // $tglPenagihan = $request->tanggalInput;
                // $idCustomer = $request->idCustomer;
                // $po = $request->nomorPO;
                // $idJenisDokumen = (int) $request->idJenisDokumen;
                // $nilaiPenagihan = $TotalPenagihan;
                // $idMataUang = $TIdMataUang;
                // $userInput = $user_id;
                // $idPenagih = $request->idUserPenagih;
                // $tglFakturPajak = $request->penagihanPajak;
                // $nilaiKurs = (float) $request->nilaiKurs ?: 1;
                // $jnsPpn = $request->jenis_pajak === "" ? null : $request->jenis_pajak;
                // $persenPpn = (int) $request->Ppn;
                // $idPenagihanAcuan = $request->no_penagihanUM === "" ? null : $request->no_penagihanUM;

                // // Generate values based on your logic
                // $idPenagihan = null;
                // $nilaiBlmPajak = null;
                // $statusPpn = 'N';
                // $periode = \Carbon\Carbon::parse($tglPenagihan)->format('Y');
                // $idFakturPajak = null;
                // $generatedId = null;

                // // Generate Id_Penagihan and Id_FakturPajak
                // if ($kode === 1) {
                //     // Fetch document type
                //     $dokumen = DB::connection('ConnKCNAccounting')
                //         ->table('T_Jenis_Dokumen')
                //         ->where('id_jenis_dokumen', $idJenisDokumen)
                //         ->value('Nama_Dokumen');

                //     $jns = substr($dokumen, -2);

                //     if ($idJenisDokumen === 4) {
                //         $statusPpn = 'Y';
                //         $idFakturPajak = DB::connection('ConnKCNAccounting')
                //             ->table('T_Counter')->value('Id_Faktur_Pajak') + 1;

                //         $id = DB::connection('ConnKCNAccounting')
                //             ->table('T_Counter_Faktur')
                //             ->where('Periode', $periode)
                //             ->value('Nomer') ?? 0;

                //         $id++;
                //         $idPenagihan = sprintf('%04d/KRR/%02d/%04d', $id, \Carbon\Carbon::parse($tglPenagihan)->month, \Carbon\Carbon::parse($tglPenagihan)->year);
                //         $fakPajak = sprintf('%08d', $idFakturPajak);

                //         // Update counters
                //         DB::connection('ConnKCNAccounting')
                //             ->table('T_Counter')->update(['Id_Faktur_Pajak' => $idFakturPajak]);
                //         DB::connection('ConnKCNAccounting')
                //             ->table('T_Counter_Faktur')->updateOrInsert(
                //                 ['Periode' => $periode],
                //                 ['Nomer' => $id]
                //             );
                //     }

                //     if (in_array($jns, ['AP', 'KP', 'LP'])) {
                //         $statusPpn = 'N';

                //         $id = DB::connection('ConnKCNAccounting')
                //             ->table('T_Counter_Nota')
                //             ->where('Periode', $periode)
                //             ->value("Nota_$jns") ?? 0;

                //         $id++;
                //         $idPenagihan = sprintf('%03d/%s/%02d/%04d', $id, $jns, \Carbon\Carbon::parse($tglPenagihan)->month, \Carbon\Carbon::parse($tglPenagihan)->year);

                //         DB::connection('ConnKCNAccounting')
                //             ->table('T_Counter_Nota')->updateOrInsert(
                //                 ['Periode' => $periode],
                //                 ["Nota_$jns" => $id]
                //             );
                //     }

                //     if (in_array($jnsPpn, [3, 4])) {
                //         $nilaiBlmPajak = $persenPpn == 11
                //             ? $nilaiPenagihan / 1.11
                //             : ($persenPpn == 12 ? $nilaiPenagihan / 1.12 : $nilaiPenagihan / 1.1);
                //     } else {
                //         $nilaiBlmPajak = $nilaiPenagihan;
                //     }

                //     // Insert into T_Penagihan_SJ
                //     $generatedId = DB::connection('ConnKCNAccounting')
                //         ->table('T_Penagihan_SJ')->insertGetId([
                //                 'Id_Penagihan' => $idPenagihan,
                //                 'Tgl_Penagihan' => $tglPenagihan,
                //                 'Id_Customer' => $idCustomer,
                //                 'PO' => $po,
                //                 'Id_Jenis_Dokumen' => $idJenisDokumen,
                //                 'Nilai_Penagihan' => $nilaiPenagihan,
                //                 'Id_MataUang' => $idMataUang,
                //                 'Status_PPN' => $statusPpn,
                //                 'Terbilang' => $terbilang,
                //                 'UserInput' => $userInput,
                //                 'TglInput' => now(),
                //                 'IDPenagih' => $idPenagih,
                //                 'TglFakturPajak' => $tglFakturPajak,
                //                 'IdFakturPajak' => $fakPajak ?? null,
                //                 'NilaiKurs' => $nilaiKurs,
                //                 'Jns_PPN' => $jnsPpn,
                //                 'Discount' => $discount,
                //                 'Nilai_blm_Pajak' => $nilaiBlmPajak,
                //                 'Id_Penagihan_Acuan' => $idPenagihanAcuan,
                //                 'PersenPPN' => $persenPpn,
                //             ]);
                // }


                // Ambil nilai dari database
                // dd(trim(Auth::user()->NomorUser));
                // dd($request->tanggalInput,
                // $request->idCustomer,
                // $request->nomorPO,
                // (int) $request->idJenisDokumen,
                // $TotalPenagihan,
                // $discount,
                // $TIdMataUang,
                // $terbilang,
                // $user_id,
                // $request->idUserPenagih,
                // $request->penagihanPajak,
                // (float) $request->nilaiKurs ?: 1,
                // $request->jenis_pajak === "" ? null : $request->jenis_pajak,
                // (int) $request->Ppn,
                // $request->no_penagihanUM === "" ? null : $request->no_penagihanUM,);
                // dd($request->all());
                // Insert new record
                DB::connection('ConnKCNAccounting')
                    ->statement(
                        'EXEC SP_1273_PRG_MAINT_PENAGIHAN_SJ @Kode = ?, @Tgl_penagihan = ?, @Id_Customer = ?, @PO = ?, @id_Jenis_Dokumen = ?, @Nilai_Penagihan = ?, @Discount = ?, @Id_MataUang = ?, @Terbilang = ?, @UserInput = ?, @IdPenagih = ?, @TglFakturPajak = ?, @NilaiKurs = ?, @Jns_PPN = ?, @PPN = ?, @Id_Penagihan_Acuan = ?',
                        [
                            1,
                            $request->tanggalInput,
                            $request->idCustomer,
                            $request->nomorPO,
                            (int) $request->idJenisDokumen,
                            $TotalPenagihan,
                            $discount,
                            $TIdMataUang,
                            $terbilang,
                            $user_id,
                            $request->idUserPenagih,
                            $request->penagihanPajak,
                            (float) $request->nilaiKurs ?: 1,
                            $request->jenis_pajak === "" ? null : $request->jenis_pajak,
                            (int) $request->Ppn,
                            $request->no_penagihanUM === "" ? null : $request->no_penagihanUM,
                        ]
                    );

                // dd($tes);
                // $idPenagihan = $result[0]->ID_Penagihan;
                // $currentYear = date('Y');

                // $id_Penagihan = DB::connection('ConnKCNAccounting')
                //     ->table('T_COUNTER')
                //     ->select('Id_Faktur_Pajak')
                //     ->first();
                // $idPenagihan = $id_Penagihan->Id_Penagihan;

                // Ambil nilai dari database
                $id_Penagihan = DB::connection('ConnKCNAccounting')
                    ->table('T_Penagihan_SJ')
                    ->select('Id_Penagihan')
                    ->where('Id_Customer', $request->idCustomer)
                    ->where('PO', $request->nomorPO)
                    ->where('Nilai_Penagihan', $TotalPenagihan)
                    ->first();

                $idPenagihan = $id_Penagihan->Id_Penagihan;

                // // Tambahkan leading zeros
                // $idFormatted = str_pad($idPenagihan, 4, '0', STR_PAD_LEFT);

                // $bulan = date('m');
                // $tahun = date('Y');

                // // Gabungkan menjadi format yang diinginkan
                // $idPenagihan = "{$idFormatted}/CSJ/{$bulan}/{$tahun}";
                // dd($idPenagihan);

                foreach (array_column($request->allRowsDataAtas, 1) as $suratPesanan) {
                    DB::connection('ConnKCNAccounting')
                        ->statement('EXEC SP_1273_PRG_MAINT_PENAGIHAN_SJ @Kode = 3, @Id_Penagihan = ?, @SuratPesanan = ?', [$idPenagihan, $suratPesanan]);
                }
                // dd($tes);
            } else if ($proses == "2") {
                // Update existing record
                $idPenagihan = $request->no_penagihan;
                // dd($idPenagihan);
                DB::connection('ConnKCNAccounting')
                    ->statement('EXEC SP_1273_PRG_MAINT_PENAGIHAN_SJ @Kode = 4, @Id_Penagihan = ?, @Nilai_Penagihan = ?, @Discount = ?, @Id_MataUang = ?, @Terbilang = ?, @IdPenagih = ?, @NilaiKurs = ?, @Jns_PPN = ?, @persenPPN = ?', [
                        $idPenagihan,
                        $TotalPenagihan,
                        $discount,
                        (int) $request->idMataUang,
                        $terbilang,
                        $request->idUserPenagih,
                        (float) $request->nilaiKurs ?: 1,
                        $request->jenis_pajak ?: null,
                        (int) $request->Ppn
                    ]);

                foreach (array_column($request->allRowsDataAtas, 1) as $suratPesanan) {
                    DB::connection('ConnKCNAccounting')
                        ->statement('EXEC SP_1273_PRG_MAINT_PENAGIHAN_SJ @Kode = 5, @Id_Penagihan = ?, @SuratPesanan = ?', [$idPenagihan, $suratPesanan]);
                }
            }

            return response()->json([
                'message' => 'Data Berhasil Diproses!'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Error: ' . $e->getMessage()
            ]);
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
                // Fetch order details using SP_1273_PRG_LIST_HEADER_PESANAN
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

                // Fetch currency details using SP_1273_PRG_LIST_MATAUANG
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
                ->select('exec SP_1273_PRG_LIST_TAGIHAN_DP_1 @SuratPesanan = ?', [$suratPesanan]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'nilai_BLM_PAJAK' => $row->nilai_BLM_PAJAK,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getSudahBayar') {
            $suratPesanan = $request->input('no_sp');

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_5409_ACC_JUMLAH_SDH_BAYAR_SPSJ @noSP = ?', [$suratPesanan]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'SuratPesanan' => $row->SuratPesanan,
                    'Nilai_Sdh_Bayar' => $row->Nilai_Sdh_Bayar,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getSudahBayarKoreksi') {
            $idUM = $request->input('no_penagihanUM');

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_5409_ACC_JUMLAH_SDH_BAYAR_SPSJ @kd = ?, @noInv', [1, $idUM]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'SuratPesanan' => $row->SuratPesanan,
                    'Nilai_Sdh_Bayar' => $row->Nilai_Sdh_Bayar,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'hitungPesanan') {
            $sNoSP = $request->input('no_sp');
            $cbUM = $request->input('potongUM');
            // dd($request->all());
            $j = 0;

            if ($cbUM == "1") {
                // Call stored procedure SP_1273_PRG_LIST_PENAGIHAN_SJ with @KODE = 22
                $results = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ @Kode = ?, @SuratPesanan = ?', [22, trim($sNoSP)]);
                // dd($results);
            } else {
                // Call stored procedure SP_1273_PRG_LIST_PENAGIHAN_SJ with @KODE = 13
                $results = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ @Kode = ?, @SuratPesanan = ?', [13, trim($sNoSP)]);
                // dd($results);
            }

            foreach ($results as $row) {
                if (is_numeric($row->Total)) {
                    $j += $row->Total;
                } else {
                    // If Total is not numeric, add 0 or handle it as needed
                    $j += 0;
                }
            }

            // Fetch and convert input values for 'nilaiSP' and 'nilaiUM' safely
            $TNilai_Penagihan = (float) str_replace(',', '', $request->input('nilaiSP')) ?? 0;
            $TNilai_UM = (float) str_replace(',', '', $request->input('nilaiUM')) ?? 0;

            // Calculate the total Penagihan value and format it
            $TNilai_Penagihan = $TNilai_Penagihan + $j;
            $TNilai_PenagihanFormatted = number_format($TNilai_Penagihan, 2, '.', ',');

            // Calculate the total billing (txtTotalPenagihan) and format it
            $txtTotalPenagihan = $TNilai_Penagihan - $TNilai_UM;
            $txtTotalPenagihanFormatted = number_format($txtTotalPenagihan, 2, '.', ',');

            // Build the response data, including the formatted values and total
            $response = [
                'sNoSP' => $sNoSP,
                'total' => $j,
                'TNilai_Penagihan' => $TNilai_PenagihanFormatted,
                'txtTotalPenagihan' => $txtTotalPenagihanFormatted
            ];

            // Return the response as JSON
            return response()->json($response);

        } else if ($id == 'getTotalPenagihan') {
            // dd($request->all());
            $totalPenagihan = (float) str_replace(',', '', $request->input('totalPenagihan'));
            // dd($totalPenagihan);
            $spArray = array_column($request->allRowsDataAtas, 1);
            $sp = implode('/', $spArray);

            // Tambahkan '/' di akhir jika hanya ada satu elemen
            if (count($spArray) === 1) {
                $sp .= '/';
            }
            // dd($sp);

            $result = DB::connection('ConnKCNAccounting')
                ->select('EXEC SP_1273_PRG_CEK_SURATPESAN @kode = ?, @SP = ?', [1, trim($sp)]);
            // dd($result);
            if ($result[0]->Jumlah > 1) {
                return response()->json([
                    'error' => 'Data Tidak Dapat Disimpan. Cek Mata uang, syarat bayar dan jenis bayar Harus sama'
                ]);
            }

            $result = DB::connection('ConnKCNAccounting')
                ->select('EXEC SP_1273_PRG_CEK_SURATPESAN @kode = ?, @SP = ?', [2, trim($sp)]);
            // dd($result);
            if (empty($result)) {
                return response()->json([
                    'error' => 'Discount Tidak sama dalam Surat Pesanan'
                ]);
            }

            $discount = $result[0]->Discount;
            $txtTotalPenagihan = $totalPenagihan - $totalPenagihan * $discount;

            if (in_array($request->id_cust, ['PWX', 'PNX']) && empty($request->no_penagihanUM)) {
                $ppnMultiplier = $request->Ppn == "11" ? 1.11 : 1.1;
                $txtTotalPenagihan *= $ppnMultiplier;
            }

            return response()->json([
                'txtTotalPenagihan' => $txtTotalPenagihan,
                'discount' => $discount,
            ]);
        } else if ($id == 'getPenagihan') {
            // Call stored procedure to get penagihan list (SP_1273_PRG_LIST_PENAGIHAN_SJ)
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ @KODE = ?', [14]);
            // dd($results);
            // Simulate the lookup like in VB.NET's mLook class
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NamaCust' => trim($row->NamaCust),
                    'Id_Penagihan' => trim($row->Id_Penagihan),
                ];
            }

            return datatables($response)->make(true);

            // if (count($response) > 0) {
            //     $selectedPenagihan = $response[0]['ID_PENAGIHAN'];
            //     $selectedCustomer = substr($response[0]['NAMACUST'], -5);

            //     // Perform subsequent actions
            //     $this->lihatCustomer($selectedCustomer);
            //     $this->lihatSP($selectedPenagihan);
            //     // Assuming ListSP contains some list data
            //     $firstSPItem = isset($request->ListSP[0]) ? $request->ListSP[0] : null;
            //     $this->lihatPesanan($firstSPItem);
            //     $this->lihatPenagihan($selectedPenagihan);

            //     return response()->json([
            //         'message' => 'Penagihan processed successfully',
            //         'penagihan' => $selectedPenagihan,
            //         'customer' => $selectedCustomer
            //     ]);
            // } else {
            //     return response()->json([
            //         'error' => 'No penagihan data found',
            //     ]);
            // }
        } else if ($id == 'lihatCustomer') {
            $customerId = $request->get('idCustomer');
            // Call stored procedure to get customer details
            $customerResult = DB::connection('ConnKCNSales')
                ->select('exec SP_1273_PRG_LIST_CUSTOMER @IDCUST = ?', [trim($customerId)]);
            // dd($customerResult);
            if (count($customerResult) > 0) {
                $customer = $customerResult[0];
                $TIdJnsCust = $customer->JnsCust;
                $TNamaCust = ($TIdJnsCust == 'NPX') ? $customer->NamaCust : ($customer->NamaNPWP ?? '');
                $TAlamat = ($TIdJnsCust == 'NPX') ? trim((string) $customer->Alamat . ' ' . $customer->Kota) : ($customer->AlamatNPWP ?? '');

                $jenisCustResult = DB::connection('ConnKCNSales')
                    ->select('exec SP_1273_PRG_LIST_JNSCUST @IDJNSCUST = ?', [trim($TIdJnsCust)]);
                // dd($jenisCustResult);
                $TJenisCust = count($jenisCustResult) > 0 ? $jenisCustResult[0]->NamaJnsCust : null;

                return response()->json([
                    'namaCust' => $TNamaCust,
                    'alamat' => $TAlamat,
                    'jenisCust' => $TJenisCust,
                ]);
            } else {
                return response()->json([
                    'message' => 'Customer not found',
                ]);
            }
        } else if ($id == 'lihatSP') {
            // Migrasi kode VB "Lihat_SP" ke Laravel
            $sidPenagihan = $request->input('no_penagihan');

            // Execute stored procedure for "Lihat SP"
            $results = DB::connection('ConnKCNAccounting')
                ->select('EXEC SP_1273_PRG_LIST_PENAGIHAN_SJ @KODE = ?, @ID_PENAGIHAN = ?', [15, trim($sidPenagihan)]);
            // dd($results);
            $listSP = [];
            $totalPenagihan = 0;

            // Iterasi hasil dan proses data
            foreach ($results as $row) {
                $listSP[] = [
                    'SuratPesanan' => $row->SuratPesanan,
                    'Total' => number_format($row->Total, 2, ',', '.'),
                ];
                $totalPenagihan += $row->Total;
            }

            // Format nilai penagihan
            $formattedPenagihan = number_format($totalPenagihan, 2, ',', '.');

            // Return JSON response (or another appropriate format)
            return response()->json([
                'listSP' => $listSP,
                'totalPenagihan' => $formattedPenagihan
            ]);
        } else if ($id == 'LihatPesanan') {
            // Stored procedure to get header pesanan details
            $sNoSP = $request->input('no_sp');
            // dd($sNoSP);
            $headerPesanan = DB::connection('ConnKCNSales')
                ->select('exec SP_1273_PRG_LIST_HEADER_PESANAN @KODE = ?, @IDSURATPESANAN = ?', [3, $sNoSP]);
            // dd($headerPesanan);
            if (!empty($headerPesanan)) {
                $header = $headerPesanan[0]; // Assuming single result row

                // Mapping values from the recordset
                $TIdMataUang = $header->IDMataUang;
                $TsyaratPembayaran = !empty($header->SyaratBayar) ? $header->SyaratBayar : 0;
                $TPO = !empty($header->NO_PO) ? $header->NO_PO : "";

                // Mapping currency to ID (1 for IDR, 2 for USD)
                if ($TIdMataUang == 'IDR') {
                    $TIdMataUang = 1;
                } else if ($TIdMataUang == 'USD') {
                    $TIdMataUang = 2;
                }

                // Fetch currency name from another stored procedure
                $mataUangResults = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_MATAUANG ?, ?', [2, $TIdMataUang]);
                // dd($mataUangResults);
                $TMataUang = !empty($mataUangResults) ? $mataUangResults[0]->Nama_MataUang : '';

                // Conditional to enable/disable the kurs field (assumed based on VB code)
                $kursEnabled = $TIdMataUang != 1 ? true : false;

                // Response data (you can return this in the way you need it, JSON or view)
                return response()->json([
                    'IdMataUang' => $TIdMataUang,
                    'SyaratPembayaran' => $TsyaratPembayaran,
                    'PO' => $TPO,
                    'MataUang' => $TMataUang,
                    'KursEnabled' => $kursEnabled
                ]);
            }
        } else if ($id == 'LihatPenagihan') {
            // Getting 'ID_PENAGIHAN' from request
            $sid_Penagihan = trim($request->input('no_penagihan'));

            // Call stored procedure to get Penagihan details
            $penagihanResults = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ ?, ?', [7, $sid_Penagihan]);
            // dd($penagihanResults);
            // Initialize variables for storing results
            $TIdJnsDok = '';
            $TDokumen = '';
            $TIdUser = '';
            $TPenagih = '';
            $TTerbilang = '';
            $TDiscount = '';
            $TJnsPajak = '';
            $cbPPN = '10';
            $Tid_PenagihanUM = '';
            $TNilai_UM = '0';

            if (!empty($penagihanResults)) {
                $penagihan = $penagihanResults[0]; // Assuming single result row

                // Mapping values from the recordset
                $TIdJnsDok = $penagihan->Id_Jenis_Dokumen;
                $TDokumen = $penagihan->Nama_Dokumen;
                $TIdUser = $penagihan->IdPenagih;
                $TPenagih = $penagihan->Nama;
                $TTerbilang = $penagihan->Terbilang;
                $TDiscount = $penagihan->Discount;
                $TJnsPajak = $penagihan->Jns_PPN ?? '';
                $cbPPN = $penagihan->PersenPPN ?? '10';
                $Tid_PenagihanUM = $penagihan->Id_Penagihan_Acuan ?? '';
                $TNilai_UM = $penagihan->Nilai_UM ?? '0';
            }

            // Set 'cbUM' value
            $cbUM = !empty($Tid_PenagihanUM) ? 1 : 0;

            // Fetch Pajak details if 'TJnsPajak' is not empty
            if (!empty($TJnsPajak)) {
                $pajakResults = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_JENIS_PAJAK ?, ?', [1, $TJnsPajak]);
                // dd($pajakResults);
                $TPajak = !empty($pajakResults) ? $pajakResults[0]->Nama_Jns_PPN : '';
            } else {
                $TPajak = '';
            }

            // Prepare response data
            return response()->json([
                'Id_Jenis_Dokumen' => $TIdJnsDok,
                'nama_dokumen' => $TDokumen,
                'Idpenagih' => $TIdUser,
                'Nama' => $TPenagih,
                'Terbilang' => $TTerbilang,
                'Discount' => (float) $TDiscount,
                'Jns_PPN' => $TJnsPajak,
                'PersenPPN' => $cbPPN,
                'Id_Penagihan_Acuan' => $Tid_PenagihanUM,
                'Nilai_UM' => $TNilai_UM,
                'UM_Checked' => $cbUM,
                'Nama_Jns_PPN' => trim($TPajak),
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

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
