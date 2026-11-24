<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class PelunasanHutangKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.PelunasanHutang', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $debet = floatval(str_replace(",", "", $request->input('hutangM')));
        $kredit = floatval(str_replace(",", "", $request->input('pelunasanM')));
        // dd($debet, $kredit);
        if ($debet > 0 && $kredit > 0) {
            return response()->json(['error' => 'Nilai Debet dan Nilai Kredit keduanya tidak boleh bernilai lebih dari 0(Nol) !!..']);
        }

        try {
            DB::connection('ConnKCNAccounting')->beginTransaction();

            // Insert Jurnal
            DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_INS_TT_JURNAL ?, ?, ?, ?, ?, ?', [
                $request->input('bkk'),
                $request->input('supplierS'),
                $request->input('keteranganM'),
                $debet,
                $kredit,
                $request->input('kode_kiraM')
            ]);

            // Cek Saldo Hutang Supplier
            $saldoSupplier = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_CHECK_TT_SALDOSUPP ?', [$request->input('supplierS')]);

            if (count($saldoSupplier) > 0 && $saldoSupplier[0]->aDA > 0) {
                if (trim($request->input('id_uangS')) == 1) { // Supplier = Rp
                    if (trim($request->input('bayarS')) == 1) { // Bayar = Rp
                        // Insert ke tabel T_Transaksi_Supplier
                        DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_INS_TT_TRANS_SUPP ?, ?, ?, ?, ?, ?, ?, ?, ?, ?', [
                            6,
                            $request->input('tanggalS'),
                            $request->input('supplierS'),
                            'Jurnal',
                            $request->input('id_uangS'),
                            $debet,
                            $kredit,
                            1,
                            $request->input('bkk'),
                            trim(Auth::user()->NomorUser),
                        ]);

                        // Update Saldo Rp Supplier
                        DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_TT_HITUNGSALDO_RP_SUPPLIER ?', [
                            trim($request->input('bkk'))
                        ]);
                    }
                } else { // Supplier = $
                    // Cek Kurs sudah diisi
                    $cekKurs = DB::connection('ConnKCNAccounting')
                        ->select('exec SP_1273_PRG_CHECK_TT_TRANS_SUPP_RP ?', [trim($request->input('bkk'))]);

                    if (count($cekKurs) > 0 && $cekKurs[0]->Ada > 0) {
                        // Kurs check and other necessary transactions for USD
                        DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_TT_HITUNGSALDO_DOLLAR_SUPPLIER ?', [
                            trim($request->input('bkk'))
                        ]);
                    } else {
                        return response()->json(['error' => 'BKK : ' . trim($request->input('bkk')) . ' TIDAK DAPAT diPROSES, Karena Kurs Belum diisi!!..']);
                    }
                }
            } else {
                return response()->json(['error' => 'Hubungi Edp untuk Saldo Hutang Supplier = ' . trim($request->input('supplierS'))]);
            }

            DB::connection('ConnKCNAccounting')->commit();
            return response()->json(['message' => 'Data sudah diPROSES JURNAL !!..untuk BKK = ' . trim($request->input('bkk'))]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'An error occurred while processing the journal data. Please try again.']);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getDataAtas') {
            $response = [];

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_TT_LIST_PELUNASANHUTANG');
            // dd($results);
            foreach ($results as $row) {
                $response[] = [
                    'NM_SUP' => trim($row->NM_SUP),
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKK' => trim($row->Id_BKK),
                    'Symbol' => trim($row->Symbol),
                    'NilaiRincian' => number_format($row->NilaiRincian, 4, '.', ','),
                    'Id_MataUang' => $row->Id_MataUang,
                    'Id_Supplier' => $row->Id_Supplier,
                    'IdUangTagih' => $row->IdUangTagih,
                    'IdUang_Supp' => $row->IdUang_Supp,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'proses') {
            $adaProses = false;
            $jmlDt = 0;

            $listLunas = $request->input('rowDataArray');
            // dd($listLunas);

            foreach ($listLunas as $index => $item) {
                if (!empty($item['Id_BKK'])) {
                    $adaProses = true;
                    $jmlDt++;

                    $brsLns = $index;
                    $supplier = $item['Id_Supplier'];   // Corresponds to SubItems[6]
                    $idUangSupp = $item['IdUang_Supp']; // Corresponds to SubItems[9]
                    $idUangByr = $item['IdUangTagih'];  // Corresponds to SubItems[7]
                    $bkk = $item['Id_BKK'];             // Corresponds to SubItems[2]
                }
            }

            if ($adaProses) {
                if ($jmlDt > 1) {
                    return response()->json(['message' => 'Hanya 1(satu) data yang dapat diPROSES PELUNASAN !!...'], 200);
                }

                $kursCheck = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_CHECK_TT_JURNAL_KURS @IdSupplier = ?', [$supplier]);

                if ($kursCheck[0]->adakurs > 0) {
                    if ($idUangSupp == 1) {
                        return response()->json(['question' => "Kode Supplier : $supplier MataUangnya harus $ !!... Ganti Dollar ????...."]);
                    } else {
                        return response()->json(['error' => "Kode Supplier : $supplier MataUangnya harus Rp, Hubungi EDP!!.."]);
                    }
                }

                $saldoCheck = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_CHECK_TT_SALDOSUPP @IdSupplier = ?', [$supplier]);

                if ($saldoCheck[0]->aDA > 0) {
                    // Insert transaction and update balances based on the conditions

                    if ($idUangSupp == 1) { // Supplier = Rp
                        if ($idUangByr == 1) { // Bayar = Rp
                            DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_INS_TT_TRANSAKSI_SUPPLIER @Id_TypeTransaksi = ?, @Tanggal = ?, @Id_Supplier = ?, @Detail = ?, @Id_Mata_Uang = ?, @Nilai_Debet = ?, @Nilai_Kredit = ?, @Kurs = ?, @Referensi = ?, @User_Input = ?', [
                                2,
                                $item['Tgl_Input'],  // Corresponds to SubItems[1]
                                $supplier,
                                $bkk,
                                $item['Id_MataUang'], // Corresponds to SubItems[5]
                                0,
                                floatval(str_replace(',', '', $item['NilaiRincian'])),
                                1,
                                $bkk,
                                trim(Auth::user()->NomorUser),
                            ]);

                            DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_TT_HITUNGSALDO_RP_SUPPLIER @IdBKK = ?', [$bkk]);
                        } else {
                            // Add logic if Bayar = $
                        }
                    } else { // Supplier = $
                        $kursIsiCheck = DB::connection('ConnKCNAccounting')
                            ->select('exec SP_1273_PRG_CHECK_TT_TRANS_SUPP_RP @IdBKK = ?', [$bkk]);

                        if ($kursIsiCheck[0]->Ada > 0) {
                            // Proceed with further checks and inserts for suppliers with currency $
                            DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_INS_TT_TRANS_SUPP_BKK2 @Id_TypeTransaksi = ?, @Tanggal = ?, @Id_Supplier = ?, @Detail = ?, @Id_Mata_Uang = ?, @Nilai_Debet = ?, @Nilai_Kredit = ?, @Kurs = ?, @Referensi = ?, @User_Input = ?, @Uang_Bayar = ?', [
                                2,
                                $item['Tgl_Input'],  // Corresponds to SubItems[1]
                                $supplier,
                                $bkk,
                                $item['Id_MataUang'], // Corresponds to SubItems[5]
                                0,
                                floatval(str_replace(',', '', $item['NilaiRincian'])), // Remove commas
                                5,
                                $bkk,
                                trim(Auth::user()->NomorUser),
                                $idUangByr
                            ]);

                            DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_TT_HITUNGSALDO_DOLLAR_SUPPLIER @InIdBKK = ?', [$bkk]);
                        } else {
                            // Further logic based on $ currency checks
                        }
                    }

                    return response()->json(['message' => 'Data sudah diPROSES !!..untuk BKK = ' . trim($bkk)]);
                } else {
                    return response()->json(['error' => 'Hubungi Edp untuk Saldo Hutang Supplier = ' . trim($supplier)]);
                }
            } else {
                return response()->json(['error' => 'Tidak Ada Data yang diPROSES !!..'], 200);
            }
        } else if ($id == 'prosesDollar') {
            $adaProses = false;
            $jmlDt = 0;

            $listLunas = $request->input('rowDataArray');
            // dd($listLunas);

            foreach ($listLunas as $index => $item) {
                if (!empty($item['Id_BKK'])) {
                    $adaProses = true;
                    $jmlDt++;

                    $brsLns = $index;
                    $supplier = $item['Id_Supplier'];   // Corresponds to SubItems[6]
                    $idUangSupp = $item['IdUang_Supp']; // Corresponds to SubItems[9]
                    $idUangByr = $item['IdUangTagih'];  // Corresponds to SubItems[7]
                    $bkk = $item['Id_BKK'];             // Corresponds to SubItems[2]
                }
            }
            $saldoCheck = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_CHECK_TT_SALDOSUPP @IdSupplier = ?', [$supplier]);

            if ($saldoCheck[0]->aDA > 0) {
                // Insert transaction and update balances based on the conditions

                if ($idUangSupp == 1) { // Supplier = Rp
                    if ($idUangByr == 1) { // Bayar = Rp
                        DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_INS_TT_TRANSAKSI_SUPPLIER @Id_TypeTransaksi = ?, @Tanggal = ?, @Id_Supplier = ?, @Detail = ?, @Id_Mata_Uang = ?, @Nilai_Debet = ?, @Nilai_Kredit = ?, @Kurs = ?, @Referensi = ?, @User_Input = ?', [
                            2,
                            $item['Tgl_Input'],  // Corresponds to SubItems[1]
                            $supplier,
                            $bkk,
                            $item['Id_MataUang'], // Corresponds to SubItems[5]
                            0,
                            floatval(str_replace(',', '', $item['NilaiRincian'])), // Remove commas
                            1,
                            $bkk,
                            trim(Auth::user()->NomorUser),
                        ]);

                        DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_TT_HITUNGSALDO_RP_SUPPLIER @IdBKK = ?', [$bkk]);
                    } else {
                        // Add logic if Bayar = $
                    }
                } else { // Supplier = $
                    $kursIsiCheck = DB::connection('ConnKCNAccounting')
                        ->select('exec SP_1273_PRG_CHECK_TT_TRANS_SUPP_RP @IdBKK = ?', [$bkk]);

                    if ($kursIsiCheck[0]->Ada > 0) {
                        // Proceed with further checks and inserts for suppliers with currency $
                        DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_INS_TT_TRANS_SUPP_BKK2 @Id_TypeTransaksi = ?, @Tanggal = ?, @Id_Supplier = ?, @Detail = ?, @Id_Mata_Uang = ?, @Nilai_Debet = ?, @Nilai_Kredit = ?, @Kurs = ?, @Referensi = ?, @User_Input = ?, @Uang_Bayar = ?', [
                            2,
                            $item['Tgl_Input'],  // Corresponds to SubItems[1]
                            $supplier,
                            $bkk,
                            $item['Id_MataUang'], // Corresponds to SubItems[5]
                            0,
                            floatval(str_replace(',', '', $item['NilaiRincian'])), // Remove commas
                            5,
                            $bkk,
                            trim(Auth::user()->NomorUser),
                            $idUangByr
                        ]);

                        DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_TT_HITUNGSALDO_DOLLAR_SUPPLIER @InIdBKK = ?', [$bkk]);
                    } else {
                        // Further logic based on $ currency checks
                    }
                }

                return response()->json(['message' => 'Data sudah diPROSES !!..untuk BKK = ' . trim($bkk)]);
            } else {
                return response()->json(['error' => 'Hubungi Edp untuk Saldo Hutang Supplier = ' . trim($supplier)]);
            }
        } else if ($id == 'getDataBKK') {
            // First Stored Procedure
            $idBKK = trim($request->input('bkk'));
            // dd($idBKK);
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_TT_LUNAS_BKK @IDBKK = ?', [$idBKK]);
            // dd($results);
            $response = [];
            $i = 0;

            foreach ($results as $row) {
                $i++;
                $responseItem = [
                    'Rincian_Bayar' => trim($row->Rincian_Bayar),
                    'Nilai_Rincian' => number_format($row->Nilai_Rincian, 4, '.', ','),
                    'Kurs_Bayar' => number_format($row->Kurs_Bayar, 4, '.', ','),
                    'Kode_Perkiraan' => $row->Kode_Perkiraan,
                    'Symbol' => trim($row->Symbol),
                    'Id_Bank' => trim($row->Id_Bank),
                ];

                if (trim($row->Symbol) == '$') {
                    $responseItem['Sub2'] = number_format($row->Nilai_Rincian, 4, '.', ',');
                    $responseItem['Sub4'] = number_format($row->NilaiRp, 4, '.', ',');
                } else {
                    $responseItem['Sub2'] = number_format($row->NilaiD, 4, '.', ',');
                    $responseItem['Sub3'] = number_format($row->Nilai_Rincian, 4, '.', ',');
                    $responseItem['Sub4'] = number_format($row->Nilai_Rincian, 4, '.', ',');
                }

                $response[] = $responseItem;
                // dd($response);
            }
            return datatables($response)->make(true);
        } else if ($id == 'lanjutDataBKK') {
            $idBKK = trim($request->input('bkk'));
            $mataUang = trim($request->input('mata_uangKiri'));
            // dd($idBKK);
            $response = [];
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_TT_JURNAL_TTL_BKK @IDBKK = ?', [$idBKK]);
            // dd($results);
            foreach ($results as $row) {
                if ($mataUang == '$') {
                    $response['TTtlBKKD'] = number_format($row->Nilai_Rincian, 4, '.', ',');
                    $response['TTtlBKKRp'] = number_format($row->NilaiRp, 4, '.', ',');
                } else {
                    $response['TTtlBKKRp'] = number_format($row->Nilai_Rincian, 4, '.', ',');
                    $response['TTtlBKKD'] = number_format($row->NilaiD, 4, '.', ',');
                }
            }

            return response()->json($response);
        } else if ($id == 'getDataTT') {
            // First Stored Procedure
            $idBKK = trim($request->input('bkk'));
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_TT_LUNAS_TT @BKK = ?', [$idBKK]);
            // dd($results);
            $response = [];
            $i = 0;

            if (!empty($results)) {
                foreach ($results as $row) {
                    $i++;
                    // Set values similar to VB.NET code
                    $symbol = trim($row->Symbol);
                    $idSupplier = trim($row->Id_Supplier);

                    // Prepare the response for the DataTable
                    $responseItem = [
                        'Rincian_Bayar' => trim($row->Id_Penagihan),
                        'No_Terima' => trim($row->No_Terima),
                        'Kurs_tagih' => number_format($row->Kurs_Tagih, 4, '.', ','),
                        'HrgByrRp' => number_format($row->HrgByrRp, 4, '.', ','),
                        'Hrg_Terbayar' => number_format($row->Hrg_Terbayar, 4, '.', ','),
                        'Symbol' => $symbol,
                        'Id_Supplier' => $idSupplier,
                    ];

                    if ($symbol == '$') {
                        $responseItem['Sub3'] = number_format($row->HrgByrRp, 4, '.', ',');
                        $responseItem['Sub4'] = number_format($row->Hrg_Terbayar, 4, '.', ',');
                    } else {
                        $responseItem['Sub4'] = number_format($row->Hrg_Terbayar, 4, '.', ',');
                        $responseItem['Sub3'] = number_format($row->HrgByrRp, 4, '.', ',');
                    }

                    $response[] = $responseItem;
                    // dd($response);
                }
            }
            return datatables($response)->make(true);
        } else if ($id == 'lanjutDataTT') {
            $idBKK = trim($request->input('bkk'));
            $mataUang = trim($request->input('mata_uangKanan'));
            $response = [];
            // Second Stored Procedure
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_TT_JURNAL_TTL @BKK = ?', [$idBKK]);

            if (!empty($results)) {
                foreach ($results as $row) {
                    if ($mataUang == '$') {
                        $response['TTtlTTDr'] = number_format($row->Hrg_Terbayar, 4, '.', ',');
                        $response['TTtlTTRp'] = number_format($row->HrgByrRp, 4, '.', ',');
                    } else {
                        $response['TTtlTTDr'] = number_format($row->Hrg_Terbayar, 4, '.', ',');
                        $response['TTtlTTRp'] = number_format($row->HrgByrRp, 4, '.', ',');
                    }
                }
            }

            return response()->json($response);
        } else if ($id == 'getDataTT_Ppn') {
            $response = [];
            $bkk = trim($request->input('bkk'));

            // Query pertama untuk SP_1273_PRG_TT_LUNAS_TT
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_TT_LUNAS_TT @BKK = ?', [$bkk]);
            // dd($results);
            $i = 0;
            foreach ($results as $row) {
                $i++;
                $symbol = trim($row->Symbol);
                $id_supplier = trim($row->Id_Supplier);
                $id_penagihan = trim($row->Id_Penagihan);
                $no_terima = trim($row->No_Terima);
                $kurs_tagih = number_format($row->Kurs_Tagih, 4, '.', ',');

                $ppn_rp = number_format($row->PpnRp, 4, '.', ',');
                $hrg_ppn = number_format($row->Hrg_Ppn, 4, '.', ',');

                // Kondisi untuk mata uang
                if ($symbol == '$') {
                    $sub3 = $ppn_rp;
                    $sub4 = $hrg_ppn;
                } else {
                    $sub3 = $hrg_ppn;
                    $sub4 = $ppn_rp;
                }

                // Menambahkan data ke dalam response
                $response[] = [
                    'Symbol' => $symbol,
                    'Id_Supplier' => $id_supplier,
                    'Rincian_Bayar' => $id_penagihan,
                    'No_Terima' => $no_terima,
                    'Kurs_tagih' => $kurs_tagih,
                    'Sub3' => $sub3,
                    'Sub4' => $sub4,
                ];
                // dd($response);
            }

            return datatables($response)->make(true);
        } else if ($id == 'lanjutDataTT_Ppn') {
            $idBKK = trim($request->input('bkk'));
            $mataUang = trim($request->input('mata_uangKanan'));
            $response = [];
            // Query kedua untuk SP_1273_PRG_TT_JURNAL_TTL
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_TT_JURNAL_TTL @BKK = ?', [$idBKK]);
            // dd($results);
            if (!empty($results)) {
                $row = $results[0];
                $hrg_ppn = number_format($row->Hrg_ppn, 4, '.', ',');
                $ppn_rp = number_format($row->ppnRp, 4, '.', ',');

                if ($mataUang == '$') {
                    $response['TTtlTTDr'] = $hrg_ppn;
                    $response['TTtlTTRp'] = $ppn_rp;
                } else {
                    $response['TTtlTTDr'] = $hrg_ppn;
                    $response['TTtlTTRp'] = $ppn_rp;
                }
            }

            return response()->json($response);
        } else if ($id == 'getDataTT_Murni') {
            $response = [];
            $bkk = trim($request->input('bkk'));

            // Query pertama untuk SP_1273_PRG_TT_LUNAS_TT
            $results1 = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_TT_LUNAS_TT @BKK = ?', [$bkk]);
            // dd($results1);
            $i = 0;
            foreach ($results1 as $row) {
                $i++;
                $symbol = trim($row->Symbol);
                $id_supplier = trim($row->Id_Supplier);
                $id_penagihan = trim($row->Id_Penagihan);
                $no_terima = trim($row->No_Terima);
                $kurs_tagih = number_format($row->Kurs_Tagih, 4, '.', ',');

                $murni_rp = number_format($row->MurniRp, 4, '.', ',');
                $hrg_murni = number_format($row->Hrg_Murni, 4, '.', ',');

                // Kondisi untuk mata uang
                if ($symbol == '$') {
                    $sub3 = $murni_rp;
                    $sub4 = $hrg_murni;
                } else {
                    $sub4 = $hrg_murni;
                    $sub3 = $murni_rp;
                }

                // Menambahkan data ke dalam response
                $response[] = [
                    'Symbol' => $symbol,
                    'Id_Supplier' => $id_supplier,
                    'Rincian_Bayar' => $id_penagihan,
                    'No_Terima' => $no_terima,
                    'Kurs_tagih' => $kurs_tagih,
                    'Sub3' => $sub3,
                    'Sub4' => $sub4,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'lanjutDataTT_Murni') {
            $idBKK = trim($request->input('bkk'));
            $mataUang = trim($request->input('mata_uangKanan'));
            $response = [];
            // Query kedua untuk SP_1273_PRG_TT_JURNAL_TTL
            $results2 = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_TT_JURNAL_TTL @BKK = ?', [$idBKK]);
            // dd($results2);
            if (!empty($results2)) {
                $row = $results2[0];
                $hrg_murni = number_format($row->Hrg_Murni, 4, '.', ',');
                $murni_rp = number_format($row->MurniRp, 4, '.', ',');

                if ($mataUang == '$') {
                    $response['TTtlTTDr'] = $hrg_murni;
                    $response['TTtlTTRp'] = $murni_rp;
                } else {
                    $response['TTtlTTDr'] = $hrg_murni;
                    $response['TTtlTTRp'] = $murni_rp;
                }
            }

            return response()->json($response);
        } else if ($id == 'getDataTT_MDisc') {
            $response = [];
            $bkk = trim($request->input('bkk'));

            // Query pertama untuk SP_1273_PRG_TT_LUNAS_TT
            $results1 = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_TT_LUNAS_TT @BKK = ?', [$bkk]);
            // dd($results1);
            $i = 0;
            foreach ($results1 as $row) {
                $i++;
                $symbol = trim($row->Symbol);
                $id_supplier = trim($row->Id_Supplier);
                $id_penagihan = trim($row->Id_Penagihan);
                $no_terima = trim($row->No_Terima);
                $kurs_tagih = number_format($row->Kurs_Tagih, 4, '.', ',');

                $hrg_nego_rp = number_format($row->Hrg_NegoRp, 4, '.', ',');
                $hrg_nego = number_format($row->Hrg_Nego, 4, '.', ',');

                // Kondisi untuk mata uang
                if ($symbol == '$') {
                    $sub3 = $hrg_nego_rp;
                    $sub4 = $hrg_nego;
                } else {
                    $sub4 = $hrg_nego;
                    $sub3 = $hrg_nego_rp;
                }

                // Menambahkan data ke dalam response
                $response[] = [
                    'Symbol' => $symbol,
                    'Id_Supplier' => $id_supplier,
                    'Rincian_Bayar' => $id_penagihan,
                    'No_Terima' => $no_terima,
                    'Kurs_tagih' => $kurs_tagih,
                    'Sub3' => $sub3,
                    'Sub4' => $sub4,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'lanjutDataTT_MDisc') {
            $idBKK = trim($request->input('bkk'));
            $mataUang = trim($request->input('mata_uangKanan'));
            // Query kedua untuk SP_1273_PRG_TT_JURNAL_TTL
            $results2 = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_TT_JURNAL_TTL @BKK = ?', [$idBKK]);
            // dd($results2);
            if (!empty($results2)) {
                $row = $results2[0];
                $hrg_nego = number_format($row->Hrg_Nego, 4, '.', ',');
                $hrg_nego_rp = number_format($row->Hrg_NegoRp, 4, '.', ',');

                if ($mataUang == '$') {
                    $response['TTtlTTDr'] = $hrg_nego;
                    $response['TTtlTTRp'] = $hrg_nego_rp;
                } else {
                    $response['TTtlTTDr'] = $hrg_nego;
                    $response['TTtlTTRp'] = $hrg_nego_rp;
                }
            }

            return response()->json($response);
        } else if ($id == 'getKodePerkiraan') {
            try {
                $results = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_TT_KODEPERKIRAAN');
                // dd($results);
                $response = [];
                foreach ($results as $row) {
                    $response[] = [
                        'NoKodePerkiraan' => trim($row->NoKodePerkiraan),
                        'Keterangan' => trim($row->Keterangan),
                    ];
                }

                return datatables($response)->make(true);
            } catch (Exception $e) {
                // Handle any errors
                return response()->json([
                    'status' => 'error',
                    'message' => $e->getMessage()
                ], 500);
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
