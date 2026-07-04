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


class MaintenanceBKMPenagihanController extends Controller
{
    public function index()
    {
        $kodePerkiraan = DB::connection('ConnAccounting')
            ->select('exec SP_5298_ACC_LIST_KODE_PERKIRAAN ?', [1]);
            // dd($kodePerkiraan);
        $banks = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BANK');
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.MaintenanceBKMPenagihan', compact('access', 'banks', 'kodePerkiraan'));
    }

    public function getTabelDetailPelunasan($idPelunasan)
    {
        //dd($bulan, $tahun);
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_PELUNASAN] @idPelunasan = ?', [$idPelunasan]);
        return response()->json($tabel);
    }

    public function getTabelKurangLebih($idPelunasan)
    {
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_KRGLBH] @idPelunasan = ?', [$idPelunasan]);
        return response()->json($tabel);
    }

    public function getTabelTampilBKMPenagihan($tanggalInputTampil, $tanggalInputTampil2)
    {
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKM_TAGIH_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalInputTampil, $tanggalInputTampil2]);
        return response()->json($tabel);
    }

    public function getTabelBiaya($idPelunasan)
    {

        $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_BIAYA] @idPelunasan = ?', [$idPelunasan]);
        return response()->json($tabel);
    }

    function getKodePerkiraan()
    {
        $kode = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_KODE_PERKIRAAN] @Kode = ?', [1]);
        return response()->json($kode);
    }

    function cekNoPelunasanBKMPenagihan($idPelunasan, $idCustomer)
    {
        $kode = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_CEK_NO_PELUNASAN]
        @idpelunasan = ?,
        @idcust = ?',
            [
                $idPelunasan,
                $idCustomer
            ]
        );
        return response()->json($kode);
    }


    public function cekJumlahRincianBKMPenagihan($idPelunasan)
    {
        $kode = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_CEK_JML_RINCIAN]
        @idpelunasan = ?',
            [
                $idPelunasan
            ]
        );
        return response()->json($kode);
    }

    function getIDBKMPenagihan($id, $tanggal)
    {
        $idBank = $id;
        $tanggalInput = $tanggal;
        $jenis = 'R';

        // $result = DB::statement("EXEC [dbo].[SP_5409_ACC_COUNTER_BKM_BKK] ?, ?, ?, ?", [
        //     $jenis,
        //     $tanggalInput,
        //     $idBank,
        //     null
        //     // Pass by reference for output parameter
        // ]);

        $tahun = substr($tanggalInput, -10, 4);
        $x = DB::connection('ConnAccounting')->table('T_Counter_BKM')->where('Periode', '=', $tahun)->first();
        $nomorIdBKM = '00000' . str_pad($x->Id_BKM_E_Rp, 5, '0', STR_PAD_LEFT);
        $idBKM = $idBank . '-R' . substr($tahun, -2) . substr($nomorIdBKM, -5);

        return response()->json($idBKM);
    }

    public function prosesSisaPiutang($idPelunasan)
    {
        $kode = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_GET_IDPENAGIHAN_PIUTANG]
        @idpelunasan = ?',
            [
                $idPelunasan
            ]
        );
        return response()->json($kode);
    }

    function insertUpdateBKMPenagihan(Request $request)
    {
        dd('masuk');
        $idPelunasan = $request->idPelunasan;
        $sisa = $request->sisa;
        $jenisBayar = $request->jenisBayar;
        $tanggalTagih = $request->tanggalTagih;

        $idBKMNew = $request->idBKMNew;
        $tglInputNew = $request->tglInputNew;
        $konversi = $request->konversi;
        $total = $request->total;

        $idBank = $request->idBank;
        $jenisBank = $request->jenisBank;
        $idPelunasan = $request->idPelunasan;

        list($hari, $bulan, $tahun) = explode('-', $tglInputNew);

        // Mengambil bulan dan tahun sebagai integer
        $bulan = (int) $bulan;
        $tahun = (int) $tahun;
        $tgl = $bulan . $tahun;

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TDETAILPEL]
        @idpelunasan = ?,
        @sisa = ?,
        @jenisBayar = ?', [
            $idPelunasan,
            $sisa,
            $jenisBayar
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5409_ACC_COUNTER_BKM_BKK]
        @bank = ?,
        @jenis = ?,
        @tgl = ?,
        @id = ?', [
            $idBank,
            'R',
            $tgl,
            $idBKMNew
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN]
        @idBKM = ?,
        @tglinput = ?,
        @userinput = ?,
        @terjemahan = ?,
        @nilaipelunasan = ?,
        @IdBank = ?', [
            $idBKMNew,
            $tanggalTagih,
            1,
            $konversi,
            $total,
            $idBank,
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_IDBKM_1]
        @idpelunasan = ?,
        @idBKM = ?,
        @idBank = ?', [
            $idPelunasan,
            $idBKMNew,
            $idBank
        ]);

        return response()->json('ok');
        // return redirect()->back()->with('Success', 'Data BKM Dengan No. ' .$idBKMNew. ' TerSimpan');
    }

    public function getCetakBKMNoPenagihan($idBKMInput)
    {
        //dd($idBKM);
        $data = DB::connection('ConnAccounting')->table('VW_PRG_5298_ACC_CETAK_BKM_TAGIH')
            ->where('Id_BKM', $idBKMInput)
            ->get();
        return $data;
    }

    public function getCetakBKMJumlahPelunasan($idBKMInput)
    {
        //dd($idBKM);
        $data = DB::connection('ConnAccounting')->table('VW_PRG_5298_ACC_JML_PELUNASAN_TAGIH')
            ->where('Id_BKM', $idBKMInput)
            ->get();
        return $data;
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        if ($id == 'cekPelunasan') {
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');

            if (empty($bulan) || empty($tahun)) {
                return response()->json([
                    'error' => 'Isi Dulu Bulan & Tahun!!'
                ]);
            }

            // Calculate `bln` and `thn`
            if ((int) $bulan == 1) {
                $bln = 12;
                $thn = (int) $tahun - 1;
            } else {
                $bln = (int) $bulan - 1;
                $thn = (int) $tahun;
            }

            // Execute the stored procedure
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_CEK_PELUNASAN @bln = ?, @thn = ?', [$bln, $thn]);
            // dd($results);
            // Check if 'ada' field in the result is greater than 0
            if (count($results) > 0 && $results[0]->ada > 0) {
                return response()->json([
                    'error' => "TIDAK BOLEH CREATE BKM U/ BLN INI!!!\nCREATE BKM U/ BLN SBLMNYA DULU. SAMPAI TUNTAS... KHUSUS TUNAI & TRANSFER"
                ]);
            } else {
                return response()->json([
                    'message' => "Tampil Pelunasan"
                ]);
            }
        } else if ($id == 'getPelunasan') {
            // dd($request->all());
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');

            if (empty($bulan) || empty($tahun)) {
                return response()->json(['error' => 'Isi Dulu Bulan & Tahun!!']);
            }

            // Main Pelunasan list query
            $pelunasanResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_PELUNASAN_TAGIHAN @bln = ?, @thn = ?', [$bulan, $tahun]);
            // dd($pelunasanResults);
            $pelunasanList = [];
            $j = 0;

            foreach ($pelunasanResults as $pelunasan) {
                $j++;
                $biaya = 0;
                $krglbh = 0;

                // Get `biaya` using SP_5298_ACC_CEK_BIAYA if 'ada' > 0
                $biayaResults = DB::connection('ConnAccounting')
                    ->select('exec SP_5298_ACC_CEK_BIAYA @idPelunasan = ?', [$pelunasan->Id_Pelunasan]);

                if (isset($biayaResults[0]) && $biayaResults[0]->ada > 0) {
                    $biayaItems = DB::connection('ConnAccounting')
                        ->select('exec SP_5298_ACC_CEK_BIAYA_1 @idPelunasan = ?', [$pelunasan->Id_Pelunasan]);

                    foreach ($biayaItems as $item) {
                        $biaya += $item->Biaya;
                    }
                }

                // Get `krglbh` using SP_5298_ACC_CEK_KRGLBH if 'ada' > 0
                $krglbhResults = DB::connection('ConnAccounting')
                    ->select('exec SP_5298_ACC_CEK_KRGLBH @idPelunasan = ?', [$pelunasan->Id_Pelunasan]);

                if (isset($krglbhResults[0]) && $krglbhResults[0]->ada > 0) {
                    $krglbhItems = DB::connection('ConnAccounting')
                        ->select('exec SP_5298_ACC_CEK_KRGLBH_1 @idPelunasan = ?', [$pelunasan->Id_Pelunasan]);

                    foreach ($krglbhItems as $item) {
                        $krglbh += $item->KurangLebih;
                    }
                }

                // Calculate final `nilai` for each pelunasan entry
                $nilai = (float) $pelunasan->Nilai_Pelunasan - $biaya + $krglbh;

                $pelunasanList[] = [
                    'Tgl_Pelunasan' => \Carbon\Carbon::parse($pelunasan->Tgl_Pelunasan)->format('m/d/Y'),
                    'Id_Pelunasan' => $pelunasan->Id_Pelunasan,
                    'Id_Bank' => $pelunasan->Id_Bank ?? '',
                    'Jenis_Pembayaran' => $pelunasan->Jenis_Pembayaran,
                    'Nama_MataUang' => $pelunasan->Nama_MataUang,
                    'Nilai' => number_format($nilai, 2, '.', ','),
                    'No_Bukti' => $pelunasan->No_Bukti ?? '',
                    'ID_Cust' => $pelunasan->ID_Cust,
                    'Id_Jenis_Bayar' => $pelunasan->Id_Jenis_Bayar,
                ];
            }

            if ($j == 0) {
                return response()->json(['error' => 'Tidak Ada Pelunasan']);
            }

            return response()->json($pelunasanList);

        } else if ($id == 'getDetailPelunasan') {
            $idPelunasan = $request->input('idPelunasan');

            $pelunasanDetails = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_DETAIL_PELUNASAN @idPelunasan = ?', [$idPelunasan]);
            // dd($pelunasanDetails);
            $listPelunasan = [];
            $j = 0;
            foreach ($pelunasanDetails as $pelunasan) {
                $j++;
                $listPelunasan[] = [
                    'ID_Penagihan' => $pelunasan->ID_Penagihan,
                    'Nilai_Pelunasan' => number_format($pelunasan->Nilai_Pelunasan, 2, '.', ','),
                    'Pelunasan_Rupiah' => number_format($pelunasan->Pelunasan_Rupiah, 2, '.', ','),
                    'Kode_Perkiraan' => $pelunasan->Kode_Perkiraan ?? '0.00.00',
                    'NamaCust' => $pelunasan->NamaCust,
                    'ID_Detail_Pelunasan' => $pelunasan->ID_Detail_Pelunasan,
                    'Tgl_Penagihan' => \Carbon\Carbon::parse($pelunasan->Tgl_Penagihan)->format('m/d/Y'),
                ];
            }

            return datatables($listPelunasan)->make(true);

        } else if ($id == 'getDetailBiaya') {
            $idPelunasan = $request->input('idPelunasan');

            $biayaDetails = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_DETAIL_BIAYA @idPelunasan = ?', [$idPelunasan]);
            // dd($biayaDetails);
            $listBiaya = [];
            $k = 0;
            foreach ($biayaDetails as $biaya) {
                if ($biaya->Biaya != 0) {
                    $k++;
                    $listBiaya[] = [
                        'Keterangan' => $biaya->Keterangan ?? '',
                        'Biaya' => number_format($biaya->Biaya, 2, '.', ','),
                        'Kode_Perkiraan' => $biaya->Kode_Perkiraan ?? '0.00.00',
                        'Id_Detail_Pelunasan' => $biaya->Id_Detail_Pelunasan,
                    ];
                }
            }

            return datatables($listBiaya)->make(true);

        } else if ($id == 'getDetailKrgLbh') {
            $idPelunasan = $request->input('idPelunasan');

            $krglbhDetails = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_DETAIL_KRGLBH @idPelunasan = ?', [$idPelunasan]);
            // dd($krglbhDetails);
            $listKrgLbh = [];
            $l = 0;
            foreach ($krglbhDetails as $krglbh) {
                if ($krglbh->KurangLebih != 0) {
                    $l++;
                    $listKrgLbh[] = [
                        'Keterangan' => $krglbh->Keterangan ?? '',
                        'KurangLebih' => number_format($krglbh->KurangLebih, 2, '.', ','),
                        'Kode_Perkiraan' => $krglbh->Kode_Perkiraan ?? '0.00.00',
                        'Id_Detail_Pelunasan' => $krglbh->Id_Detail_Pelunasan,
                    ];
                }
            }

            return datatables($listKrgLbh)->make(true);

        } else if ($id == 'getBank') {
            // Eksekusi prosedur tersimpan SP_5298_ACC_LIST_BANK untuk mengambil data bank
            $banks = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BANK');
            // dd($banks);
            // Respons pertama dari stored procedure untuk `TBank` dan `TNamaBank`
            $response = [];
            foreach ($banks as $bank) {
                $response[] = [
                    'Id_Bank' => $bank->Id_Bank,
                    'Nama_Bank' => $bank->Nama_Bank,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBankDetails') {
            $bankId = $request->input('idBankM');
            // Eksekusi prosedur tersimpan SP_5298_ACC_LIST_BANK untuk mengambil data bank
            $bankDetails = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BANK_1 ?', [$bankId]);
            // dd($bankDetails);
            // Respons pertama dari stored procedure untuk `TBank` dan `TNamaBank`
            $response = [];
            foreach ($bankDetails as $bank) {
                $response[] = [
                    'Id_Bank' => $bank->jenis,
                ];
            }

            return response()->json($response);
        } else if ($id == 'getBankAda') {
            $idBank = $request->input('idBankM');

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BANK_2 ?', [trim($idBank)]);
            // dd($results);
            $bankDetails = [];
            foreach ($results as $row) {
                $bankDetails = [
                    'jenis' => trim($row->jenis),
                    'Nama' => trim($row->Nama),
                ];
            }
            return response()->json($bankDetails);

        } else if ($id == 'getPerkiraanDetails') {
            $idPerkiraan = $request->input('id_perkiraanMP');

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_KODE_PERKIRAAN ?, ?', [2, trim($idPerkiraan)]);
            // dd($results);
            $perkiraanDetails = [];
            foreach ($results as $row) {
                $perkiraanDetails = [
                    'Keterangan' => trim($row->Keterangan),
                ];
            }
            return response()->json($perkiraanDetails);

        } else if ($id == 'getKodePerkiraan') {
            // Menjalankan prosedur `SP_5298_ACC_LIST_KODE_PERKIRAAN` dengan parameter Kode = 1
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_KODE_PERKIRAAN ?', [1]);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NoKodePerkiraan' => $row->NoKodePerkiraan,
                    'Keterangan' => $row->Keterangan,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'updateDetailPelunasan') {
            // Memastikan `iddetail` dan `kode` diterima dalam request
            $iddetail = (int) $request->input('ID_Detail_Pelunasan');
            $kode = $request->input('id_perkiraanMP');
            // dd($iddetail, $kode);

            if ($iddetail && $kode) {
                // Menjalankan prosedur `SP_5298_ACC_UPDATE_DETAIL_PELUNASAN`
                DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_UPDATE_DETAIL_PELUNASAN @iddetail = ?, @kode = ?', [
                    $iddetail,
                    $kode,
                ]);

                // Respons sukses
                return response()->json(['message' => 'Detail sudah terkoreksi']);
            } else {
                // Jika parameter tidak valid
                return response()->json(['error' => 'Parameter tidak valid']);
            }
        } else if ($id == 'updateDetailBiaya') {
            // Retrieve parameters from request
            $iddetail = $request->input('ID_Detail_Pelunasan');
            $keterangan = $request->input('keterangan_MBia');
            $kode = $request->input('id_perkiraanMBia');

            // Execute stored procedure with parameters
            DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_UPDATE_DETAIL_BIAYA @iddetail = ?, @keterangan = ?, @kode = ?', [
                $iddetail,
                $keterangan,
                $kode
            ]);

            // Update ListBiaya in the response or session data as needed
            $response = [
                'message' => 'Detail Sudah TerKoreksi',
                'uraian' => $keterangan,
                'idPerkiraan' => $kode
            ];

            return response()->json($response);

        } else if ($id == 'updateDetailKrgLbh') {
            // Retrieve parameters from request
            $iddetail = $request->input('id_detailMK');
            $keterangan = $request->input('keterangan_MK');
            $kode = $request->input('id_perkiraanMK');

            // Execute stored procedure with parameters
            DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_UPDATE_DETAIL_KRGLBH @iddetail = ?, @keterangan = ?, @kode = ?', [
                $iddetail,
                $keterangan,
                $kode
            ]);

            // Respond with success message
            $response = [
                'message' => 'Detail Sudah TerKoreksi',
                'uraian' => $keterangan,
                'idPerkiraan' => $kode
            ];

            return response()->json($response);

        } else if ($id == 'getBKMTagih') {
            // Execute the stored procedure to fetch BKM Tagih records
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKM_TAGIH');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getBKMTagihByDate') {
            // Retrieve date parameters from the request
            $tgl1 = $request->input('tgl_awalbkk');
            $tgl2 = $request->input('tgl_akhirbkk');

            // Execute the stored procedure with date parameters
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKM_TAGIH_PERTGL @tgl1 = ?, @tgl2 = ?', [$tgl1, $tgl2]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan,
                ];
            }
            return datatables($response)->make(true);
            // return response()->json($response);

        } else if ($id == 'cetakBKM') {
            // dd($request->all());
            $selectedIdBKM = $request->input('bkm');
            $jml = (float) $request->input('Nilai_Pelunasan');

            // Retrieve the total `Pelunasan` amount using stored procedure
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_JML_PELUNASAN @IdBKM = ?', [trim($selectedIdBKM)]);
            // dd($results);
            $pelunasan = !empty($results) ? (float) $results[0]->Pelunasan : 0;

            // Compare jml to pelunasan and set status
            $status = ($jml !== $pelunasan) ? '1' : '2';

            // Define criteria for the report selection
            $sno = "WHERE Id_BKM = '" . trim($selectedIdBKM) . "'";
            $reportType = 3; // Specific report type in the VB code

            // Fetch the report data
            $reportData = DB::connection('ConnAccounting')
                ->select("SELECT * FROM VW_PRG_5298_ACC_CETAK_BKM_TAGIH $sno");
            // dd($reportData);
            // Update the print date
            DB::connection('ConnAccounting')
                ->statement('exec SP_5298_ACC_UPDATE_TGLCETAK_BKM @idBKM = ?', [trim($selectedIdBKM)]);

            return response()->json([
                'data' => $reportData,
                'status' => $status,
                'message' => 'Laporan telah dicetak dengan sukses',
                'reportType' => $reportType
            ]);
            #region Group
        } else if ($id == 'CmdGroup') {
            // dd($request->all());
            $checkedItems = $request->input('rowDataArray', []);
            // dd($checkedItems);
            $countChecked = count($checkedItems);
            // dd($countChecked);

            if ($countChecked === 1) {
                $singleItem = $checkedItems[0];
                // dd($singleItem);
                $pelunasanId = intval($singleItem[1]);
                $idCust = trim($singleItem[8]);

                $checkResults = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_CEK_NO_PELUNASAN @idpelunasan = ?, @idcust = ?', [$pelunasanId, $idCust]);

                if (!empty($checkResults) && $checkResults[0]->ada > 0) {
                    return response()->json(['error' => "Buat BKM utk Id.Pelunasan yg lebih kecil dulu."]);
                }

                $bankCodeMurni = trim($singleItem[2]);
                if ($bankCodeMurni === "KRR1" || $bankCodeMurni === "KRR2") {
                    if ($bankCodeMurni === "KRR2") {
                        $bankCode = "KI";
                    } elseif ($bankCodeMurni === "KRR1") {
                        $bankCode = "KKM";
                    }
                } else {
                    $bankCode = trim($singleItem[2]);
                }

                $tgl = date('Y-m-d', strtotime($singleItem[7]));
                $jenisBayar = $singleItem[3];
                $uang = $singleItem[4];
                $total = (float) str_replace(',', '', $singleItem[5]);
                $konversi = $singleItem[10];

                // Check pelunasan vs invoice
                $checkPelunasan = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_CEK_JML_RINCIAN @idpelunasan = ?', [$pelunasanId]);
                if (!empty($checkPelunasan) && floatval($checkPelunasan[0]->Pelunasan) < $total) {
                    $sisa = $total - floatval($checkPelunasan[0]->Pelunasan);

                    DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_INSERT_BKM_TDETAILPEL @idpelunasan = ?, @sisa = ?, @jenisBayar = ?', [
                        $pelunasanId,
                        $sisa,
                        $jenisBayar
                    ]);
                }

                // $bankResult = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BANK_1 @idBank = ?', [$bankCode]);
                // $jenis = !empty($bankResult) ? trim($bankResult[0]->jenis) : null;

                #region perlu attention
                // $outputId = DB::connection('ConnAccounting')->select('exec SP_5409_ACC_COUNTER_BKM_BKK @bank = ?, @jenis = ?, @tgl = ?', [
                //     $bankCode,
                //     "R",
                //     $tgl,
                // ]);
                // $idBKM = !empty($outputId) ? $outputId[0]->id : null;

                $periode = date('Y');
                // dd($periode);
                // $bank = trim($selectedRows[0]['Id_bank']);
                $noUrut = DB::connection('ConnAccounting')
                    ->table('T_Counter_BKM')
                    ->where('Periode', $periode)
                    ->value('Id_BKM_E_Rp');

                DB::connection('ConnAccounting')
                    ->table('T_Counter_BKM')
                    ->where('Periode', $periode)
                    ->update(['Id_BKM_E_Rp' => DB::raw('Id_BKM_E_Rp + 1')]);

                // $noUrutFormatted = str_pad($noUrut, 3, '0', STR_PAD_LEFT);
                // $idBKM = $noUrutFormatted . $bank . $periode;
                $idBKM = str_pad($noUrut, 5, '0', STR_PAD_LEFT);
                $idBKM = $bankCode . '-R' . substr($periode, -2) . substr($idBKM, -5);
                // dd($idBKM, $bankCodeMurni); 
                // dd($idBKM);

                // Insert to T_Pelunasan
                DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_INSERT_BKM_TPELUNASAN @idBKM = ?, @tglinput = ?, @userinput = ?, @terjemahan = ?, @nilaipelunasan = ?, @IdBank = ?', [
                    $idBKM,
                    $tgl,
                    trim(Auth::user()->NomorUser),
                    $konversi,
                    $total,
                    $bankCodeMurni
                ]);

                // Update T_Pelunasan_Tagihan
                DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_UPDATE_IDBKM_1 @idpelunasan = ?, @idBKM = ?, @idBank = ?', [
                    $pelunasanId,
                    $idBKM,
                    $bankCodeMurni
                ]);

                // Process remaining piutang
                $remainingPiutang = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_GET_IDPENAGIHAN_PIUTANG @idpelunasan = ?', [$pelunasanId]);
                foreach ($remainingPiutang as $piutang) {
                    $penagihanId = trim($piutang->Id_Penagihan);
                    if (!empty($penagihanId)) {
                        DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_PROSES_SISA_PIUTANG @idpelunasan = ?, @idPenagihan = ?', [
                            $pelunasanId,
                            $penagihanId
                        ]);
                    }
                }

                // Additional commands for "BG" or "CEK" payment type
                if ($jenisBayar == 'BG' || $jenisBayar == 'CEK') {
                    DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_UPDATE_STATUSBAYAR @idpelunasan = ?', [$pelunasanId]);
                }

                // Additional data handling
                $details = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_GET_DATA_DETAIL_PELUNASAN @idpelunasan = ?', [$pelunasanId]);
                foreach ($details as $detail) {
                    DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_INSERT_KARTU_PIUTANG @IdPenagihan = ?, @IdCust = ?, @IdMtUang = ?, @kreditRp = ?, @kreditCur = ?, @kurs = ?, @noBKM = ?', [
                        trim($detail->ID_Penagihan),
                        trim($detail->ID_Cust),
                        ($detail->Id_MataUang == $detail->MtUang_Invoice) ? $detail->Id_MataUang : $detail->MtUang_Invoice,
                        $detail->NilaiRp,
                        $detail->NilaiCur,
                        $detail->NilaiKurs,
                        trim($detail->Id_BKM)
                    ]);
                }

                return response()->json(['message' => "Data BKM Dengan No. {$idBKM} TerSimpan"]);

                #region lebih dari 1 group
            } else if ($countChecked > 1) {
                // dd($checkedItems);
                // Initializing variables
                $idk_noCust = 0;
                $idk_noCust_cek = 1;
                $total = 0;
                $j = 1;
                $k = 1;
                $l = 1;
                $noCust1 = [];
                $noCust_cek = [];
                $noJnsBayar = [];
                $noJnsBayar_cek = [];
                $noLunas = [];
                $noLunas_cek = [];

                // Iterate through the ListLunas to process checked items
                foreach ($checkedItems as $item) {
                    if ($countChecked > 1) {
                        $idk_noCust++;
                        $noCust1[$idk_noCust] = trim($item[8]);
                        $noJnsBayar[$idk_noCust] = intval($item[9]);
                        $noLunas[$idk_noCust] = floatval($item[1]);
                    }
                }

                $cek_noCust = $noCust1[1];
                $cek_jnsbayar = $noJnsBayar[1];
                $noCust_cek[1] = $noCust1[1];
                $noJnsBayar_cek[1] = $noJnsBayar[1];
                $noLunas_cek[1] = $noLunas[1];

                for ($i = 2; $i <= $idk_noCust; $i++) {
                    if ($cek_noCust !== $noCust1[$i] || $cek_jnsbayar !== $noJnsBayar[$i]) {
                        $idk_noCust_cek++;
                        $noCust_cek[$idk_noCust_cek] = $noCust1[$i];
                        $noJnsBayar_cek[$idk_noCust_cek] = $noJnsBayar[$i];
                        $noLunas_cek[$idk_noCust_cek] = $noLunas[$i];
                        $cek_noCust = $noCust1[$i];
                        $cek_jnsbayar = $noJnsBayar[$i];
                    }
                }

                // Checking each entry in noJnsBayar_cek and processing according to stored procedures
                for ($i = 1; $i <= $idk_noCust_cek; $i++) {
                    if (in_array($noJnsBayar_cek[$i], [1, 4])) {
                        $result = DB::connection('ConnAccounting')->select("EXEC SP_5298_ACC_CEK_NO_PELUNASAN @idpelunasan = ?, @idcust = ?", [
                            $noLunas_cek[$i],
                            trim($noCust_cek[$i])
                        ]);

                        if ($result[0]->ada > 0) {
                            return response()->json(['error' => 'Buat BKM utk Id.Pelunasan yg lebih kecil dulu.']);
                        }
                    }
                }

                $referenceBank = $checkedItems[0][2];
                $referenceTgl = $checkedItems[0][7];
                // dd($referenceTgl);
                $isSame = true;
                // dd($checkedItems);
                foreach ($checkedItems as $item) {
                    if ($item[2] !== $referenceBank || $item[7] !== $referenceTgl) {
                        $isSame = false;
                        break;
                    }
                }

                if (!$isSame) {
                    return response()->json(['error' => 'Nama Bank & Tgl Pembuatan Harus SAMA!']);
                }
                dd($isSame);
                // dd($referenceValue);

                // Calculate total for checked items in ListLunas
                foreach ($checkedItems as $item) {
                    if ($countChecked > 1) {
                        (float) str_replace(',', '', $item[5]);
                        $total += (float) str_replace(',', '', $item[5]);
                        $total2 = (float) str_replace(',', '', $item[5]);
                        $uang = $item[4];

                        // Checking if pelunasan equals nilai_invoice
                        $result = DB::connection('ConnAccounting')->select("EXEC SP_5298_ACC_CEK_JML_RINCIAN @idpelunasan = ?", [
                            intval($item[1])
                        ]);

                        if ($result[0]->Pelunasan < $total2) {
                            $sisa = $total2 - $result[0]->Pelunasan;
                            DB::connection('ConnAccounting')->statement("EXEC SP_5298_ACC_INSERT_BKM_TDETAILPEL @idpelunasan = ?, @sisa = ?, @jenisBayar = ?", [
                                intval($item[1]),
                                $sisa,
                                trim($item[3])
                            ]);
                        }
                    }
                }

                $Konversi = $checkedItems[0][11];
                $bankCode = trim($checkedItems[0][2]);
                if ($bankCode === "KRR1" || $bankCode === "KRR2") {
                    if ($bankCode === "KRR2") {
                        $bankCode = "KI";
                    } elseif ($bankCode === "KRR1") {
                        $bankCode = "KKM";
                    }
                } else {
                    $bankCode = trim($checkedItems[0][2]);
                }

                // Retrieve additional details based on bank and date
                $jenis = DB::connection('ConnAccounting')->select("EXEC SP_5298_ACC_LIST_BANK_1 @idBank", [$bankCode])[0]->jenis;

                $result = DB::connection('ConnAccounting')->select("EXEC SP_5298_ACC_IDBKM @month = ? ,@year = ?, @IdBank = ?, @jenis = ?, @tgl = ?", [
                    date('m', strtotime($checkedItems[0][7])),
                    date('y', strtotime($checkedItems[0][7])),
                    $bankCode,
                    $jenis,
                    date('my', strtotime($checkedItems[0][7]))
                ]);

                $id = $result[0]->id_BKM;
                $idbkm = intval(substr($id, 0, 3));

                // Insert into T_Pelunasan
                DB::connection('ConnAccounting')->statement("EXEC SP_5298_ACC_INSERT_BKM_TPELUNASAN @idBKM = ?, @tglinput = ?, @userinput = ?, @terjemahan = ?, @nilaipelunasan = ?", [
                    $id,
                    date('Y-m-d', strtotime($checkedItems[0][7])),
                    trim(Auth::user()->NomorUser),
                    $Konversi,
                    $total
                ]);

                // Continue inserting/updating details per selected item in ListLunas
                foreach ($checkedItems as $item) {
                    if ($countChecked > 1) {
                        DB::connection('ConnAccounting')->statement("EXEC SP_5298_ACC_UPDATE_IDBKM @idpelunasan = ?, @idBKM = ?, @idBank = ?", [
                            intval($item[1]),
                            $id,
                            $item[2]
                        ]);

                        if (in_array($item[3], ['BG', 'CEK'])) {
                            DB::connection('ConnAccounting')->statement("EXEC SP_5298_ACC_UPDATE_STATUSBAYAR @idpelunasan = ?", [
                                intval($item[1])
                            ]);
                        }
                    }
                }

                foreach ($checkedItems as $item) {
                    if ($countChecked > 1) {
                        $idPelunasan = intval($item[1]);

                        $result = DB::connection('ConnAccounting')->select("EXEC SP_5298_ACC_GET_IDPENAGIHAN_PIUTANG @idpelunasan = ?", [$idPelunasan]);

                        foreach ($result as $row) {
                            $pen = trim($row->Id_Penagihan ?? '');

                            if ($pen !== '') {
                                DB::connection('ConnAccounting')->statement("EXEC SP_5298_ACC_PROSES_SISA_PIUTANG @idpelunasan = ?, @idPenagihan = ?", [
                                    $idPelunasan,
                                    $pen
                                ]);
                            }
                        }
                    }
                }

                // Update Counter IDBKM
                DB::connection('ConnAccounting')->statement("EXEC SP_5298_ACC_UPDATE_COUNTER_IDBKM @idbkm = ?, @idBank = ?, @jenis = ?, @tgl = ?", [
                    $idbkm,
                    $bankCode,
                    $jenis,
                    date('my', strtotime($checkedItems[0][7]))
                ]);

                foreach ($checkedItems as $item) {
                    if ($countChecked > 1) {
                        $noGet = 0;

                        // Retrieve data details for each checked item
                        $result = DB::connection('ConnAccounting')->select("EXEC SP_5298_ACC_GET_DATA_DETAIL_PELUNASAN @idpelunasan = ?", [intval($item[1])]);

                        // Initialize arrays to store the results
                        $noCust = [];
                        $noInvoice = [];
                        $noMtUang = [];
                        $noMtUang_Invoice = [];
                        $nilaiRp = [];
                        $nilaiCur = [];
                        $kurs = [];
                        $noBKM = '';

                        // Populate arrays with data from the result set
                        foreach ($result as $row) {
                            $noGet++;
                            $noBKM = trim($row->Id_BKM);
                            $noCust[] = trim($row->ID_Cust);
                            $noInvoice[] = trim($row->ID_Penagihan);
                            $noMtUang[] = $row->Id_MataUang;
                            $noMtUang_Invoice[] = $row->MtUang_Invoice;
                            $nilaiRp[] = $row->NilaiRp;
                            $nilaiCur[] = $row->NilaiCur;
                            $kurs[] = $row->NilaiKurs;
                        }

                        // Insert data into Kartu Piutang for each retrieved item
                        foreach ($noInvoice as $index => $idPenagihan) {
                            $idCust = $noCust[$index];
                            $idMtUang = ($noMtUang[$index] === $noMtUang_Invoice[$index]) ? $noMtUang[$index] : $noMtUang_Invoice[$index];
                            $kreditRp = $nilaiRp[$index];
                            $kreditCur = $nilaiCur[$index];
                            $nilaiKurs = $kurs[$index];

                            DB::connection('ConnAccounting')->statement("EXEC SP_5298_ACC_INSERT_KARTU_PIUTANG @IdPenagihan = ?, @IdCust = ?, @IdMtUang = ?, @kreditRp = ?, @kreditCur = ?, @kurs = ?, @noBKM = ?", [
                                $idPenagihan,
                                $idCust,
                                $idMtUang,
                                $kreditRp,
                                $kreditCur,
                                $nilaiKurs,
                                $noBKM
                            ]);
                        }
                    }
                }

                return response()->json(['message' => "Data BKM Dengan No. {$idbkm} TerSimpan"]);

            } else {
                return response()->json(['error' => "Pilih Data Pelunasan Yg Mau Di'Group!"]);
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
        $proses = $request->all();
        //dd("masuk");
        // if ($proses['detpelunasan'] == "datpelunasan") {
        //     $idBank = $request->idBank;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_LIST_BANK_1]
        //     @idBank = ?', [$idBank]);
        //     return redirect()->back()->with('success', 'Data sudah diKOREKSI');

        // } else if ($proses['detpelunasan'] == "detpelunasan") {
        //     //dd("masuk else if");
        //     $idDetail = $request->iddetail;
        //     $kode = $request->idKodePerkiraan;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_DETAIL_PELUNASAN] @iddetail = ?, @kode = ?', [
        //         $idDetail,
        //         $kode
        //     ]);
        //     return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');

        // } else if ($proses['detpelunasan'] == "detkuranglebih") {
        //     //dd($request->all());
        //     $idcoba = $request->idcoba;
        //     $kode = $request->idKodePerkiraanKrgLbh;
        //     $keterangan = $request->keterangan;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_DETAIL_KRGLBH] @iddetail = ?, @keterangan = ?, @kode = ?', [
        //         $idcoba,
        //         $keterangan,
        //         $kode
        //     ]);
        //     return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        // } else if ($proses['detpelunasan'] == "detbiaya") {
        //     //dd($request->all());
        //     $idDetailBiaya = $request->idDetailBiaya;
        //     $kode = $request->idKodePerkiraanBiaya;
        //     $keterangan = $request->keteranganBiaya;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_DETAIL_BIAYA] @iddetail = ?, @keterangan = ?, @kode = ?', [
        //         $idDetailBiaya,
        //         $keterangan,
        //         $kode
        //     ]);
        //     return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        // }
        // else if ($proses['detpelunasan'] == "dettampilbkm") {
        //     //dd($request->all());
        //     $idcoba = $request->idcoba;
        //     $kode = $request ->idKodePerkiraanKrgLbh;
        //     $keterangan = $request ->keterangan;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_LIST_BKM_TAGIH] @iddetail = ?, @keterangan = ?, @kode = ?', [
        //         $idcoba, $keterangan, $kode]);
        //     return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        // }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
