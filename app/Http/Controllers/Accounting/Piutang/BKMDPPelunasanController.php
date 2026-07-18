<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Auth;

class BKMDPPelunasanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.BKMDPPelunasan', compact('access'));
    }

    // public function getNamaCustomer()
    // {
    //     $cust =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_CUSTOMER]');
    //     return response()->json($cust);
    // }

    // public function getTabelDataPelunasan($idCustomer)
    // {
    //     $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_SALDO_PELUNASAN] @Kode = ?, @idCust = ?', [3, $idCustomer]);
    //     return response()->json($tabel);
    // }

    // function getUraianEnterBKM($id, $tanggal)
    // {
    //     $idBank = $id;
    //     $tanggal = $tanggal;
    //     $jenis = 'R';

    //     $result = DB::statement("EXEC [dbo].[SP_5409_ACC_COUNTER_BKM_BKK] ?, ?, ?, ?", [
    //         $jenis,
    //         $tanggal,
    //         $idBank,
    //         null
    //         // Pass by reference for output parameter
    //     ]);

    //     $tahun = substr($tanggal, -10, 4);
    //     $x = DB::connection('ConnAccounting')->table('T_COUNTER_BKM')->where('Periode', '=', $tahun)->first();
    //     $nomorIdBKM = '00000' . str_pad($x->Id_BKM_E_Rp, 5, '0', STR_PAD_LEFT);
    //     $idBKM = $idBank . '-R' . substr($tahun, -2) . substr($nomorIdBKM, -5);

    //     return response()->json($idBKM);
    // }

    // function getUraianEnterBKK($id, $tanggal)
    // {
    //     $idBank = $id;
    //     $tanggal = $tanggal;
    //     $jenis = 'P';

    //     $result = DB::statement("EXEC [dbo].[SP_5409_ACC_COUNTER_BKM_BKK] ?, ?, ?, ?", [
    //         $jenis,
    //         $tanggal,
    //         $idBank,
    //         null
    //         // Pass by reference for output parameter
    //     ]);

    //     $tahun = substr($tanggal, -10, 4);
    //     $x = DB::connection('ConnAccounting')->table('T_COUNTER_BKK')->where('Periode', '=', $tahun)->first();
    //     $nomorIdBKK = '00000' . str_pad($x->Id_BKK_E_Rp, 5, '0', STR_PAD_LEFT);
    //     $idBKK = $idBank . '-P' . substr($tahun, -2) . substr($nomorIdBKK, -5);

    //     return response()->json($idBKK);
    // }

    // public function getTabelTampilBKM($tanggalTampilBKM, $tanggalTampilBKM2)
    // {
    //     // dd("masuk");
    //     $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKM_DP_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalTampilBKM, $tanggalTampilBKM2]);
    //     return response()->json($tabel);
    // }

    // public function getTabelTampilBKK($tanggalTampilBKK, $tanggalTampilBKK2)
    // {
    //     // dd("masuk");
    //     $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKK_DP_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalTampilBKK, $tanggalTampilBKK2]);
    //     return response()->json($tabel);
    // }

    // public function getIdPembayaran()
    // {
    //     // dd("masuk");
    //     $idPembayaran = DB::connection('ConnAccounting')
    //         ->table('T_Pembayaran_Tagihan')
    //         ->max('Id_Pembayaran');

    //     return response()->json(['id_pembayaran' => $idPembayaran]);
    // }

    // public function getIdPelunasan()
    // {
    //     $idPelunasan = DB::connection('ConnAccounting')
    //         ->table('T_Pelunasan_Tagihan')
    //         ->max('Id_Pelunasan');
    //     // dd($idPelunasan);

    //     return response()->json(['Id_Pelunasan' => $idPelunasan]);
    // }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //dd($request->all());
        $idCustomer = $request->idCustomer;
        $idBKK = $request->idBKK;
        $tanggal = $request->tanggal;
        $konversi = $request->konversi;
        $konversi1 = $request->konversi1;
        $nilai = $request->nilai;
        $idBankBKK = $request->idBankBKK;
        $idMataUang = $request->idMataUang;
        $kursRupiah = $request->kursRupiah;
        $idBKM = $request->idBKM;
        $idPembayaran = $request->idPembayaran;
        $uraian = $request->uraian;
        $nilai = $request->nilai;
        $nilai1 = $request->nilai1;
        $idKodePerkiraanBKK = $request->idKodePerkiraanBKK;
        $jenisBankBKK = $request->jenisBankBKK;
        $id_bkk = $request->id_bkk;
        $idBankBKM = $request->idBankBKM;
        $idKodePerkiraanBKM = $request->idKodePerkiraanBKM;
        $uraianBKM = $request->uraianBKM;
        $jenisBankBKM = $request->jenisBankBKM;
        $bulan = $request->bulan;
        $tahun = $request->tahun;
        $idPelunasan = $request->idPelunasan;

        $tgl = $tahun . '-' . $bulan . '-01';

        $id_bkm = $request->id_bkm;

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN]
        @idBKK = ?,
        @tgl = ?,
        @userinput = ?,
        @terjemahan = ?,
        @nilai = ?,
        @IdBank= ?', [
            $idBKK,
            $tanggal,
            null,
            $konversi,
            $nilai,
            $idBankBKK
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN_TAG]
        @idBKK = ?,
        @idUang = ?,
        @idJenis = ?,
        @idBank = ?,
        @nilai = ?,
        @user = ?,
        @Kurs = ?,
        @idBKM_acuan = ?', [
            $idBKK,
            $idMataUang,
            1,
            $idBankBKK,
            $nilai,
            null,
            $kursRupiah,
            $idBKM
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TDETAILPEMB]
        @idpembayaran = ?,
        @keterangan = ?,
        @biaya = ?,
        @kodeperkiraan = ?', [
            $idPembayaran,
            $uraian,
            $nilai,
            $idKodePerkiraanBKK,
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_COUNTER_IDBKK]
        @idbkk = ?,
        @idBank = ?,
        @jenis = ?,
        @tgl = ?', [
            $id_bkk,
            $idBankBKK,
            $jenisBankBKK,
            $tanggal,
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN]
        @idBKM = ?,
        @tglinput = ?,
        @userinput = ?,
        @terjemahan = ?,
        @nilaipelunasan = ?,
        @IdBank = ?', [
            $idBKM,
            $tanggal,
            1,
            $nilai1,
            $konversi1,
            $idBankBKM
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN_TAG]
        @idBKM = ?,
        @tgl = ?,
        @idUang = ?,
        @idJenis = ?,
        @idBank = ?,
        @kodeperkiraan = ?,
        @uraian = ?,
        @nilaipelunasan = ?,
        @user = ?,
        @idBKKAcuan = ?,
        @saldo = ?,
        @idCust = ?,
        @kurs = ?', [
            $idBKM,
            $tanggal,
            $idMataUang,
            1,
            $idBankBKM,
            $idKodePerkiraanBKM,
            $uraianBKM,
            $nilai1,
            1,
            $idBKK,
            $nilai1,
            $idCustomer,
            $kursRupiah
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_COUNTER_IDBKM]
        @idbkm = ?,
        @idBank = ?,
        @jenis = ?,
        @tgl = ?', [
            $id_bkm,
            $idBankBKM,
            $jenisBankBKM,
            $tgl
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_SALDO_PELUNASAN]
        @idBKM = ?,
        @idPelunasan = ?,
        @nilai = ?', [
            $idBKM,
            $idPelunasan,
            $nilai
        ]);


        return redirect()->back()->with('success', 'BKK No. ' . $idBKK . ' & BKM No. ' . $idBKM . ' Tersimpan');
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        // get cust
        if ($id === 'getCust') {
            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_CUSTOMER');
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaCust' => $detail_divisi->NamaCust,
                    'IdCust' => $detail_divisi->IdCust,
                ];
            }
            return datatables($divisi)->make(true);
        }

        // get divisi
        else if ($id === 'tampil1') {
            $idCust = $request->input('idCust');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_SALDO_PELUNASAN
            @kode = 3, @idCust = ?', [$idCust]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Tgl_Input' => $detail_divisi->Tgl_Input,
                    'Id_BKM' => $detail_divisi->Id_BKM,
                    'Id_bank' => $detail_divisi->Id_bank,
                    'Bank' => $detail_divisi->Bank,
                    'MataUang' => $detail_divisi->MataUang,
                    'NamaCust' => $detail_divisi->NamaCust,
                    'Nilai_Pelunasan' => $detail_divisi->Nilai_Pelunasan,
                    'SaldoPelunasan' => $detail_divisi->SaldoPelunasan,
                    'Id_Pelunasan' => $detail_divisi->Id_Pelunasan,
                    'Jenis_Bank' => $detail_divisi->Jenis_Bank,
                    'Id_MataUang' => $detail_divisi->Id_MataUang,
                    'ID_Cust' => $detail_divisi->ID_Cust,
                ];
            }
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'tampil2') {
            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_SALDO_PELUNASAN
            @kode = 2');
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Tgl_Input' => $detail_divisi->Tgl_Input,
                    'Id_BKM' => $detail_divisi->Id_BKM,
                    'Id_bank' => $detail_divisi->Id_bank,
                    'Bank' => $detail_divisi->Bank,
                    'MataUang' => $detail_divisi->MataUang,
                    'NamaCust' => $detail_divisi->NamaCust,
                    'Nilai_Pelunasan' => $detail_divisi->Nilai_Pelunasan,
                    'SaldoPelunasan' => $detail_divisi->SaldoPelunasan,
                    'Id_Pelunasan' => $detail_divisi->Id_Pelunasan,
                    'Jenis_Bank' => $detail_divisi->Jenis_Bank,
                    'Id_MataUang' => $detail_divisi->Id_MataUang,
                    'ID_Cust' => $detail_divisi->ID_Cust,
                ];
            }
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'getMataUang') {
            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_MATA_UANG @kode = ?', [1]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Id_MataUang' => $detail_divisi->Id_MataUang,
                    'Nama_MataUang' => $detail_divisi->Nama_MataUang,
                ];
            }
            return datatables($divisi)->make(true);
        }

        // get divisi
        else if ($id === 'getBank') {
            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BANK');
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Id_Bank' => $detail_divisi->Id_Bank,
                    'Nama_Bank' => $detail_divisi->Nama_Bank,
                ];
            }
            return datatables($divisi)->make(true);
        }

        // get divisi
        else if ($id === 'getAccBank') {
            $idBank = $request->input('idBank');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BANK_1 @idBank = ?', [$idBank]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'jenis' => $detail_divisi->jenis,
                ];
            }
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'getPerkiraan') {
            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_KODE_PERKIRAAN @Kode = ?', [1]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NoKodePerkiraan' => $detail_divisi->NoKodePerkiraan,
                    'Keterangan' => $detail_divisi->Keterangan,
                ];
            }
            return datatables($divisi)->make(true);
        }

        // id bkk
        else if ($id === 'getIdBKK') {
            $tahun = $request->input('tahun');
            $bank = $request->input('bank');

            $ada = DB::connection('ConnAccounting')
                ->table('T_COUNTER_BKK')
                ->where('Periode', $tahun)
                ->count();

            if ($ada === 1) {
                DB::connection('ConnAccounting')->transaction(function () use ($tahun, &$noUrut) {

                    $row = DB::connection('ConnAccounting')
                        ->table('T_COUNTER_BKK')
                        ->where('Periode', $tahun)
                        ->lockForUpdate()
                        ->first();

                    $noUrut = $row->Id_BKK_E_Rp + 1;

                    DB::connection('ConnAccounting')
                        ->table('T_COUNTER_BKK')
                        ->where('Periode', $tahun)
                        ->update([
                            'Id_BKK_E_Rp' => $noUrut
                        ]);
                });

            } else if ($ada === 0) {
                $noUrut = 1;
                DB::connection('ConnAccounting')
                    ->table('T_COUNTER_BKK')
                    ->insert([
                        'Periode' => $tahun,
                        'Id_BKK_E_Rp' => $noUrut
                    ]);
            }

            $idBKK = str_pad($noUrut, 5, '0', STR_PAD_LEFT);
            $idBKK = 'KKK' . '-P' . substr($tahun, -2) . substr($idBKK, -5);

            // DB::connection('ConnAccounting')
            //     ->table('T_COUNTER_BKK')
            //     ->where('Periode', $tahun)
            //     ->update(['Id_BKK_E_Rp' => $noUrut + 1]);

            return response()->json(['IdBKK' => $idBKK]);
        }

        // id bkm
        else if ($id === 'getIdBKM') {
            $tahun = $request->input('tahun');
            $bank = $request->input('bank');

            $ada = DB::connection('ConnAccounting')
                ->table('T_Counter_BKM')
                ->where('Periode', $tahun)
                ->count();

            if ($ada === 1) {
                $noUrut = DB::connection('ConnAccounting')
                    ->table('T_Counter_BKM')
                    ->where('Periode', $tahun)
                    ->increment('Id_BKM_E_Rp');
                $noUrut = DB::connection('ConnAccounting')
                    ->table('T_Counter_BKM')
                    ->where('Periode', $tahun)
                    ->value('Id_BKM_E_Rp');

            } else if ($ada === 0) {
                $noUrut = 1;
                DB::connection('ConnAccounting')
                    ->table('T_Counter_BKM')
                    ->insert([
                        'Periode' => $tahun,
                        'Id_BKM_E_Rp' => $noUrut
                    ]);
            }

            $idBKM = str_pad($noUrut, 5, '0', STR_PAD_LEFT);
            $idBKM = 'KKM' . '-R' . substr($tahun, -2) . substr($idBKM, -5);

            // DB::connection('ConnAccounting')
            //     ->table('T_Counter_BKM')
            //     ->where('Periode', $tahun)
            //     ->update(['Id_BKM_E_Rp' => $noUrut + 1]);

            return response()->json(['IdBKM' => $idBKM]);
        }

        // perkiraan
        else if ($id === 'getPerkiraanChange') {
            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_KODE_PERKIRAAN @Kode = ?', [2]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Keterangan' => $detail_divisi->Keterangan,
                ];
            }
            return response()->json($data_divisi);
        }

        // get id pembayaran
        else if ($id === 'getIdPembayaran') {
            // $divisi = DB::connection('ConnAccounting')->select('select max(Id_Pembayaran) as id_pembayaran from T_Pembayaran_Tagihan');
            // $data_divisi = [];
            // foreach ($divisi as $detail_divisi) {
            //     $data_divisi[] = [
            //         'id_pembayaran' => $detail_divisi->id_pembayaran,
            //     ];
            // }
            // return response()->json($data_divisi);
            $user = Auth::user()->NomorUser;
            $data = DB::connection('ConnAccounting')
                ->table('T_PEMBAYARAN_TAGIHAN')
                ->select('Id_Pembayaran')
                ->where('User_Input', $user)
                ->orderBy('Id_Pembayaran', 'desc')
                ->first(); // Mengambil satu data terbaru
            $data = $data->Id_Pembayaran;
            // dd($data);
            return response()->json($data);
        }

        // list bkm
        else if ($id === 'getListBKM') {
            $tgl1 = $request->input('tgl1');
            $tgl2 = $request->input('tgl2');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BKM_DP_PERTGL
            @tgl1 = ?, @tgl2 = ?', [$tgl1, $tgl2]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Tgl_Input' => $detail_divisi->Tgl_Input,
                    'Id_BKM' => $detail_divisi->Id_BKM,
                    'Nilai_Pelunasan' => $detail_divisi->Nilai_Pelunasan,
                    'Terjemahan' => $detail_divisi->Terjemahan,
                ];
            }
            return response()->json($data_divisi);
        }

        // list bkm
        else if ($id === 'getListFullBKM') {

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BKM_DP');
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Tgl_Input' => $detail_divisi->Tgl_Input,
                    'Id_BKM' => $detail_divisi->Id_BKM,
                    'Nilai_Pelunasan' => $detail_divisi->Nilai_Pelunasan,
                    'Terjemahan' => $detail_divisi->Terjemahan,
                ];
            }
            return response()->json($data_divisi);
        }

        // list bkK
        else if ($id === 'getListBKK') {
            $tgl1 = $request->input('tgl1');
            $tgl2 = $request->input('tgl2');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BKK_DP_PERTGL
            @tgl1 = ?, @tgl2 = ?', [$tgl1, $tgl2]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Tgl_Input' => $detail_divisi->Tgl_Input,
                    'Id_BKK' => $detail_divisi->Id_BKK,
                    'Nilai_Pembulatan' => $detail_divisi->Nilai_Pembulatan,
                    'Terjemahan' => $detail_divisi->Terjemahan,
                ];
            }
            return response()->json($data_divisi);
        }

        // list bkm
        else if ($id === 'getListFullBKK') {

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BKK_DP');
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Tgl_Input' => $detail_divisi->Tgl_Input,
                    'Id_BKK' => $detail_divisi->Id_BKK,
                    'Nilai_Pembulatan' => $detail_divisi->Nilai_Pembulatan,
                    'Terjemahan' => $detail_divisi->Terjemahan,
                ];
            }
            return response()->json($data_divisi);
        }

        // cetak bkm
        else if ($id === 'getCetakBKM') {
            $id_bkm = $request->input('id_bkm');

            $divisi = DB::connection('ConnAccounting')
                ->table('VW_PRG_5298_ACC_CETAK_BKM_DP')
                ->where('Id_BKM', $id_bkm)
                ->get();


            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Id_BKM' => $detail_divisi->Id_BKM,
                    'Tgl_Input' => $detail_divisi->Tgl_Input,
                    'Terjemahan' => $detail_divisi->Terjemahan,
                    'Nilai_Pelunasan' => $detail_divisi->Nilai_Pelunasan,
                    'Symbol' => $detail_divisi->Symbol,
                    'Nilai_Rincian' => $detail_divisi->Nilai_Rincian,
                    'KodePerkiraan' => $detail_divisi->KodePerkiraan,
                    'Uraian' => $detail_divisi->Uraian,
                    'NamaCust' => $detail_divisi->NamaCust,
                    'Id_bank' => $detail_divisi->Id_bank,
                    'Id_BKK_Acuan' => $detail_divisi->Id_BKK_Acuan,
                    'Tgl_BKK' => $detail_divisi->Tgl_BKK,
                    'Id_BKM_Acuan' => $detail_divisi->Id_BKM_Acuan,
                    'Tgl_BKM' => $detail_divisi->Tgl_BKM,
                ];
            }

            return response()->json($data_divisi);
        }

        // cetak bkm
        else if ($id === 'getCetakBKK') {
            $id_bkk = $request->input('id_bkk');

            $divisi = DB::connection('ConnAccounting')
                ->table('VW_PRG_5298_ACC_CETAK_BKK_DP')
                ->where('Id_BKK', $id_bkk)
                ->get();


            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    // 'Uraian' => $detail_divisi->Uraian,
                    'Terjemahan' => $detail_divisi->Terjemahan,
                    'Tgl_Input' => $detail_divisi->Tgl_Input,
                    'Id_BKK' => $detail_divisi->Id_BKK,
                    'Nilai_Pembulatan' => $detail_divisi->Nilai_Pembulatan,
                    'Symbol' => $detail_divisi->Symbol,
                    'Rincian_Bayar' => $detail_divisi->Rincian_Bayar,
                    'Nilai_Rincian' => $detail_divisi->Nilai_Rincian,
                    'Kode_Perkiraan' => $detail_divisi->Kode_Perkiraan,
                    'Id_Detail_Bayar' => $detail_divisi->Id_Detail_Bayar,
                    'Id_Bank' => $detail_divisi->Id_Bank,
                    'Jenis_Pembayaran' => $detail_divisi->Jenis_Pembayaran,
                    'No_BGCek' => $detail_divisi->No_BGCek,
                    'Jatuh_Tempo' => $detail_divisi->Jatuh_Tempo,
                    'Id_BKM_Acuan' => $detail_divisi->Id_BKM_Acuan,
                    'Tgl_BKM' => $detail_divisi->Tgl_BKM,

                ];
            }

            return response()->json($data_divisi);
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
        // $proses = $request->all();
        // if ($proses['cetak'] == "cetakBKM") {
        //     //dd($request->all());
        //     $idBKMTampil = $request->idBKMTampil;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKM] @idBKM = ?', [
        //         $idBKMTampil
        //     ]);
        //     return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        // } else if ($proses['cetak'] == "cetakBKK") {
        //     //dd($request->all());
        //     $idBKKTampil = $request->idBKKTampil;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKK] @idBKK = ?', [
        //         $idBKKTampil
        //     ]);
        //     return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        // }

        $user = Auth::user()->NomorUser;

        if ($id === 'insertBKK') {

            $idBKK = $request->input('idBKK');
            $tgl = $request->input('tgl');
            $terjemahan = $request->input('terjemahan');
            $nilai = $request->input('nilai');
            $IdBank = $request->input('IdBank');
            // dd($request->all());

            try {
                DB::connection('ConnAccounting')
                    ->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN]
                @idBKK = ?,
                @tgl = ?,
                @terjemahan = ?,
                @nilai = ?,
                @IdBank = ?,
                @userinput = ?', [
                        $idBKK,
                        $tgl,
                        $terjemahan,
                        $nilai,
                        $IdBank,
                        $user,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // dp bkk
        else if ($id === 'insertDpBKK') {
            $idBKK = $request->input('idBKK');
            $idUang = $request->input('idUang');
            $idJenis = $request->input('idJenis');
            $idBank = $request->input('idBank');
            $nilai = $request->input('nilai');
            $kurs = $request->input('kurs');
            $idBKM_acuan = $request->input('idBKM_acuan');
            // dd($request->all());

            if (intval($kurs) === 0) {
                try {
                    DB::connection('ConnAccounting')
                        ->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN_TAG]
                    @idBKK = ?,
                    @idUang = ?,
                    @idJenis = ?,
                    @idBank = ?,
                    @nilai = ?,
                    @idBKM_acuan = ?,
                    @user = ?', [
                            $idBKK,
                            $idUang,
                            1,
                            $idBank,
                            $nilai,
                            $idBKM_acuan,
                            $user,
                        ]);

                    return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
                } catch (Exception $e) {
                    return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
                }
            } else if (intval($kurs) !== 0) {
                try {
                    DB::connection('ConnAccounting')
                        ->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN_TAG]
                    @idBKK = ?,
                    @idUang = ?,
                    @idJenis = ?,
                    @idBank = ?,
                    @nilai = ?,
                    @kurs = ?,
                    @user = ?', [
                            $idBKK,
                            $idUang,
                            1,
                            $idBank,
                            $nilai,
                            $kurs,
                            $user,
                        ]);

                    return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
                } catch (Exception $e) {
                    return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
                }
            }
        }

        // detail bkk
        else if ($id === 'updateCounterBKK') {
            $idbkk = $request->input('idbkk');
            $idBank = $request->input('idBank');
            $jenis = $request->input('jenis');
            $tgl = $request->input('tgl');
            // dd($request->all());

            try {
                DB::connection('ConnAccounting')
                    ->statement('exec [SP_5298_ACC_UPDATE_COUNTER_IDBKK]
                    @idbkk = ?,
                    @idBank = ?,
                    @jenis = ?,
                    @tgl = ?', [
                        $idbkk,
                        $idBank,
                        $jenis,
                        $tgl,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // detail bkk
        else if ($id === 'insertDetailBKK') {
            $idpembayaran = $request->input('idpembayaran');
            $keterangan = $request->input('keterangan');
            $biaya = $request->input('biaya');
            $kodeperkiraan = $request->input('kodeperkiraan');
            // dd($request->all());

            try {
                DB::connection('ConnAccounting')
                    ->statement('exec [SP_5298_ACC_INSERT_BKK_TDETAILPEMB]
                    @idpembayaran = ?,
                    @keterangan = ?,
                    @biaya = ?,
                    @kodeperkiraan = ?', [
                        $idpembayaran,
                        $keterangan,
                        $biaya,
                        $kodeperkiraan,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // insert bkm
        else if ($id === 'insertBKM') {
            $idBKM = $request->input('idBKM');
            $tglinput = $request->input('tglinput');
            $terjemahan = $request->input('terjemahan');
            $IdBank = $request->input('IdBank');
            $nilaipelunasan = $request->input('nilai');
            // dd($request->all());

            try {
                DB::connection('ConnAccounting')
                    ->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN]
                @idBKM = ?,
                @tglinput = ?,
                @terjemahan = ?,
                @IdBank = ?,
                @nilaipelunasan = ?,
                @userinput = ?', [
                        $idBKM,
                        $tglinput,
                        $terjemahan,
                        $IdBank,
                        $nilaipelunasan,
                        $user,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // trans bkm
        else if ($id === 'insertDpBKM') {
            $idBKM = $request->input('idBKM');
            $tgl = $request->input('tgl');
            $idUang = $request->input('idUang');
            $idJenis = $request->input('idJenis');
            $idBank = $request->input('idBank');
            $kodeperkiraan = $request->input('kodeperkiraan');
            $uraian = $request->input('uraian');
            $nilaipelunasan = $request->input('nilaipelunasan');
            $idBKKAcuan = $request->input('idBKKAcuan');
            $kurs = $request->input('kurs');
            $saldo = $request->input('saldo');
            $idCust = $request->input('idCust');
            // dd($request->all());

            if ($kurs === null) {
                try {
                    DB::connection('ConnAccounting')
                        ->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN_TAG]
                    @idBKM = ?,
                    @tgl = ?,
                    @idUang = ?,
                    @idJenis = ?,
                    @idBank = ?,
                    @kodeperkiraan = ?,
                    @uraian = ?,
                    @nilaipelunasan = ?,
                    @idBKKAcuan = ?,
                    @saldo = ?,
                    @idCust = ?,
                    @user = ?', [
                            $idBKM,
                            $tgl,
                            $idUang,
                            $idJenis,
                            $idBank,
                            $kodeperkiraan,
                            $uraian,
                            $nilaipelunasan,
                            $idBKKAcuan,
                            $saldo,
                            $idCust,
                            $user,
                        ]);

                    return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
                } catch (Exception $e) {
                    return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
                }
            } else if ($kurs !== null) {
                try {
                    DB::connection('ConnAccounting')
                        ->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN_TAG]
                    @idBKM = ?,
                    @tgl = ?,
                    @idUang = ?,
                    @idJenis = ?,
                    @idBank = ?,
                    @kodeperkiraan = ?,
                    @uraian = ?,
                    @nilaipelunasan = ?,
                    @idBKKAcuan = ?,
                    @kurs = ?,
                    @saldo = ?,
                    @idCust = ?,
                    @user = ?', [
                            $idBKM,
                            $tgl,
                            $idUang,
                            $idJenis,
                            $idBank,
                            $kodeperkiraan,
                            $uraian,
                            $nilaipelunasan,
                            $idBKKAcuan,
                            $kurs,
                            $saldo,
                            $idCust,
                            $user,
                        ]);

                    return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
                } catch (Exception $e) {
                    return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
                }
            }
        }

        // update BKM
        else if ($id === 'updateIdBKM') {
            $idbkm = $request->input('idbkm');
            $idBank = $request->input('idBank');
            $jenis = $request->input('jenis');
            $tgl = $request->input('tgl');
            // dd($request->all());

            try {
                DB::connection('ConnAccounting')
                    ->statement('exec [SP_5298_ACC_UPDATE_COUNTER_IDBKM]
                @idbkm = ?,
                @idBank = ?,
                @jenis = ?,
                @tgl = ?', [
                        $idbkm,
                        $idBank,
                        $jenis,
                        $tgl,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // update BKM
        else if ($id === 'updateSaldoPelunasan') {
            $idBKM = $request->input('idBKM');
            $idPelunasan = $request->input('idPelunasan');
            $nilai = $request->input('nilai');
            // dd($request->all());

            // dd($idBKM, $idPelunasan, $nilai);

            try {
                DB::connection('ConnAccounting')
                    ->statement('exec [SP_5298_ACC_UPDATE_SALDO_PELUNASAN]
                @idBKM = ?,
                @idPelunasan = ?,
                @nilai = ?', [
                        $idBKM,
                        $idPelunasan,
                        $nilai,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
