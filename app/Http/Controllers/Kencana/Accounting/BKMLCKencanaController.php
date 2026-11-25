<?php

namespace App\Http\Controllers\Kencana\Accounting;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class BKMLCKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.BKMLC', compact('access'));
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
        if ($id === 'tampilPelunasan') {
            $bln = $request->input('bln');
            $thn = $request->input('thn');

            // Initialize $data_divisi array before the loop
            $data_divisi = [];

            $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_5298_ACC_LIST_PELUNASAN_DOLLAR] @bln = ?, @thn = ?', [$bln, $thn]);

            foreach ($tabel as $detail_divisi) {
                $biaya = 0;
                $krglbh = 0;
                $nilai = 0;

                // Fetch Biaya data
                $cekBiaya = DB::connection('ConnKCNAccounting')->select('exec [SP_5298_ACC_CEK_BIAYA] @idPelunasan = ?', [$detail_divisi->Id_Pelunasan]);

                $adaBiaya = intval($cekBiaya[0]->ada);
                if ($adaBiaya > 0) {
                    $cekBiaya1 = DB::connection('ConnKCNAccounting')->select('exec [SP_5298_ACC_CEK_BIAYA_1] @idPelunasan = ?', [$detail_divisi->Id_Pelunasan]);

                    foreach ($cekBiaya1 as $detail_biaya1) {
                        $biaya += floatval($detail_biaya1->biaya);
                    }
                }

                // Fetch KurangLebih data
                $cekKrgLbh = DB::connection('ConnKCNAccounting')->select('exec [SP_5298_ACC_CEK_KRGLBH] @idPelunasan = ?', [$detail_divisi->Id_Pelunasan]);

                $adaBiaya = intval($cekKrgLbh[0]->ada);
                if ($adaBiaya > 0) {
                    $cekKrgLbh1 = DB::connection('ConnKCNAccounting')->select('exec [SP_5298_ACC_CEK_KRGLBH_1] @idPelunasan = ?', [$detail_divisi->Id_Pelunasan]);

                    foreach ($cekKrgLbh1 as $detail_biaya1) {
                        $krglbh += floatval($detail_biaya1->KurangLebih);
                    }
                }

                // Calculate Nilai Pelunasan
                $nilai = floatval($detail_divisi->Nilai_Pelunasan) - $biaya + $krglbh;

                // Append to the array
                $data_divisi[] = [
                    'Id_Pelunasan' => $detail_divisi->Id_Pelunasan,
                    'Tgl_Pelunasan' => $detail_divisi->Tgl_Pelunasan,
                    'Id_bank' => $detail_divisi->Id_bank,
                    'Jenis_Pembayaran' => $detail_divisi->Jenis_Pembayaran,
                    'Nama_MataUang' => $detail_divisi->Nama_MataUang,
                    'Nilai_Pelunasan' => $detail_divisi->Nilai_Pelunasan,
                    'No_Bukti' => $detail_divisi->No_Bukti,
                    'SaldoPelunasan' => $detail_divisi->SaldoPelunasan,
                    'nilai' => $nilai,
                ];
            }

            // Return the accumulated data
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'getBank') {
            $divisi = DB::connection('ConnKCNAccounting')->select('exec SP_5298_ACC_LIST_BANK');
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

            $divisi = DB::connection('ConnKCNAccounting')->select('exec SP_5298_ACC_LIST_BANK_1 @idBank = ?', [$idBank]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'jenis' => $detail_divisi->jenis,
                ];
            }
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'getPelunasanList') {
            $idPelunasan = $request->input('idPelunasan');

            $divisi = DB::connection('ConnKCNAccounting')->select('exec SP_5298_ACC_DETAIL_PELUNASAN
            @idPelunasan = ?', [$idPelunasan]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'ID_Penagihan' => $detail_divisi->ID_Penagihan,
                    'Nilai_Pelunasan' => $detail_divisi->Nilai_Pelunasan,
                    'Pelunasan_Rupiah' => $detail_divisi->Pelunasan_Rupiah,
                    'Kode_Perkiraan' => $detail_divisi->Kode_Perkiraan,
                    'NamaCust' => $detail_divisi->NamaCust,
                    'ID_Pelunasan' => $detail_divisi->ID_Pelunasan,
                    'ID_Detail_Pelunasan' => $detail_divisi->ID_Detail_Pelunasan,
                    'Tgl_Penagihan' => $detail_divisi->Tgl_Penagihan,
                ];
            }
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'getBiayaList') {
            $idPelunasan = $request->input('idPelunasan');

            $divisi = DB::connection('ConnKCNAccounting')->select('exec SP_5298_ACC_DETAIL_BIAYA
            @idPelunasan = ?', [$idPelunasan]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Biaya' => $detail_divisi->Biaya,
                    'Keterangan' => $detail_divisi->Keterangan,
                    'Kode_Perkiraan' => $detail_divisi->Kode_Perkiraan,
                    'ID_Detail_Pelunasan' => $detail_divisi->ID_Detail_Pelunasan,
                ];
            }
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'getKurangLebihList') {
            $idPelunasan = $request->input('idPelunasan');

            $divisi = DB::connection('ConnKCNAccounting')->select('exec SP_5298_ACC_DETAIL_KRGLBH
            @idPelunasan = ?', [$idPelunasan]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'KurangLebih' => $detail_divisi->KurangLebih,
                    'Keterangan' => $detail_divisi->Keterangan,
                    'Kode_Perkiraan' => $detail_divisi->Kode_Perkiraan,
                    'ID_Detail_Pelunasan' => $detail_divisi->ID_Detail_Pelunasan,
                ];
            }
            return response()->json($data_divisi);
        }

        // list bkm
        else if ($id === 'getListFullBKM') {

            $divisi = DB::connection('ConnKCNAccounting')->select('exec SP_5298_ACC_LIST_BKM_LC');
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
        else if ($id === 'getListFullBKK') {

            $divisi = DB::connection('ConnKCNAccounting')->select('exec SP_5298_ACC_LIST_BKK_LC');
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
        else if ($id === 'getListBKM') {
            $tgl1 = $request->input('tgl1');
            $tgl2 = $request->input('tgl2');

            $divisi = DB::connection('ConnKCNAccounting')->select('exec SP_5298_ACC_LIST_BKM_LC_PERTGL
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

        // list bkK
        else if ($id === 'getListBKK') {
            $tgl1 = $request->input('tgl1');
            $tgl2 = $request->input('tgl2');

            $divisi = DB::connection('ConnKCNAccounting')->select('exec SP_5298_ACC_LIST_BKK_LC_PERTGL
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
        else if ($id === 'getCetakBKM') {
            $id_bkm = $request->input('id_bkm');

            $divisi = DB::connection('ConnKCNAccounting')
                ->table('VW_PRG_5298_ACC_CETAK_BKM_TAGIH')
                ->where('Id_BKM', $id_bkm)
                ->get();

            $sumResult = DB::connection('ConnKCNAccounting')
                ->table('VW_PRG_5298_ACC_CETAK_BKM_TAGIH')
                ->where('Id_BKM', $id_bkm)
                ->select(
                    DB::raw('SUM(KurangLebih) as total_kurang_lebih'),
                    DB::raw('SUM(Biaya) as total_biaya'),
                    DB::raw('SUM(Nilai_Rincian) as total_nilai_rincian')
                )
                ->first();

            $totalKurangLebih = $sumResult->total_kurang_lebih;
            $totalBiaya = $sumResult->total_biaya;
            $totalNilaiRincian = $sumResult->total_nilai_rincian;

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Id_BKM' => $detail_divisi->Id_BKM,
                    'Tgl_Input' => $detail_divisi->Tgl_Input,
                    'Terjemahan' => $detail_divisi->Terjemahan,
                    'Nilai_Pelunasan' => $detail_divisi->Nilai_Pelunasan,
                    'ID_Penagihan' => $detail_divisi->ID_Penagihan,
                    'NamaCust' => $detail_divisi->NamaCust,
                    'Nilai_Rincian' => $detail_divisi->Nilai_Rincian,
                    'Biaya' => $detail_divisi->Biaya,
                    'Kode_Perkiraan' => $detail_divisi->Kode_Perkiraan,
                    'Keterangan' => $detail_divisi->Keterangan,
                    'Symbol' => $detail_divisi->Symbol,
                    'Pelunasan' => $detail_divisi->Pelunasan,
                    'ID_Detail_Pelunasan' => $detail_divisi->ID_Detail_Pelunasan,
                    'Id_Pelunasan' => $detail_divisi->Id_Pelunasan,
                    'Id_bank' => $detail_divisi->Id_bank,
                    'KurangLebih' => $detail_divisi->KurangLebih,
                    'totalKurangLebih' => $totalKurangLebih,
                    'totalBiaya' => $totalBiaya,
                    'totalNilaiRincian' => $totalNilaiRincian,
                ];
            }

            return response()->json($data_divisi);
        }

        // cetak bkK
        else if ($id === 'getCetakBKK') {
            $id_bkk = $request->input('id_bkk');

            $divisi = DB::connection('ConnKCNAccounting')
                ->table('Vw_PRG_1273_ACC_CETAK_BAYAR_BKK1')
                ->where('Id_BKK', $id_bkk)
                ->get();

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Id_bank' => $detail_divisi->Id_Bank,
                    'NM_SUP' => $detail_divisi->NM_SUP,
                    'Nama_Bank' => $detail_divisi->Nama_Bank,
                    'Nilai_Rincian' => $detail_divisi->Nilai_Rincian,
                    'Terjemahan' => $detail_divisi->Terjemahan,
                    'KodePerkiraan' => $detail_divisi->Kode_Perkiraan,
                    'Keterangan' => $detail_divisi->Keterangan,
                    'Rincian_Bayar' => $detail_divisi->Rincian_Bayar, // Added based on the SQL
                    'Symbol' => $detail_divisi->Symbol,
                    'Id_MataUang_BC' => $detail_divisi->Id_MataUang_BC,
                    'Tgl_Input' => $detail_divisi->Tgl_Input,
                    'Id_BKK' => $detail_divisi->Id_BKK, // Adjust based on your requirement
                    'Jenis_Pembayaran' => $detail_divisi->Jenis_Pembayaran, // Added based on the SQL
                    'Nilai_Pembulatan' => $detail_divisi->Nilai_Pembulatan, // Added based on the SQL
                    'No_BGCek' => $detail_divisi->No_BGCek, // Added based on the SQL
                    'User_Batal' => $detail_divisi->User_Batal, // Added based on the SQL
                    'Batal' => $detail_divisi->Batal, // Added based on the SQL
                    'Alasan' => $detail_divisi->Alasan, // Added based on the SQL
                ];
            }

            return response()->json($data_divisi);
        }

        // cek jml rinician
        else if ($id === 'cekJmlRincian') {
            $idpelunasan = $request->input('idpelunasan');

            $divisi = DB::connection('ConnKCNAccounting')->select(
                'exec SP_5298_ACC_CEK_JML_RINCIAN @idpelunasan = ?'
                ,
                [$idpelunasan]
            );
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Pelunasan' => $detail_divisi->Pelunasan,
                ];
            }
            return response()->json($data_divisi);
        }

        // id bkk
        else if ($id === 'getIdBKK') {
            $tahun = $request->input('tahun');
            $bank = $request->input('bank');

            $ada = DB::connection('ConnKCNAccounting')
                ->table('T_COUNTER_BKK')
                ->where('Periode', $tahun)
                ->count();

            if ($ada === 1) {
                $noUrut = DB::connection('ConnKCNAccounting')
                    ->table('T_COUNTER_BKK')
                    ->where('Periode', $tahun)
                    ->value('Id_BKK_E_Rp');

            } else if ($ada === 0) {
                $noUrut = 1;
                DB::connection('ConnKCNAccounting')
                    ->table('T_COUNTER_BKK')
                    ->insert([
                        'Periode' => $tahun,
                        'Id_BKK_E_Rp' => $noUrut
                    ]);
            }

            $idBKK = str_pad($noUrut, 5, '0', STR_PAD_LEFT);
            $idBKK = $bank . '-P' . substr($tahun, -2) . substr($idBKK, -5);

            DB::connection('ConnKCNAccounting')
                ->table('T_COUNTER_BKK')
                ->where('Periode', $tahun)
                ->update(['Id_BKK_E_Rp' => $noUrut + 1]);

            return response()->json(['IdBKK' => $idBKK]);
        }

        // get id bkm
        else if ($id === 'getIdBKM') {
            $tahun = $request->input('tahun');
            $bank = $request->input('bank');

            $ada = DB::connection('ConnKCNAccounting')
                ->table('T_Counter_BKM')
                ->where('Periode', $tahun)
                ->count();

            if ($ada === 1) {
                $noUrut = DB::connection('ConnKCNAccounting')
                    ->table('T_Counter_BKM')
                    ->where('Periode', $tahun)
                    ->value('Id_BKM_E_Rp');

            } else if ($ada === 0) {
                $noUrut = 1;
                DB::connection('ConnKCNAccounting')
                    ->table('T_Counter_BKM')
                    ->insert([
                        'Periode' => $tahun,
                        'Id_BKM_E_Rp' => $noUrut
                    ]);
            }

            $idBKM = str_pad($noUrut, 5, '0', STR_PAD_LEFT);
            $idBKM = $bank . '-R' . substr($tahun, -2) . substr($idBKM, -5);

            DB::connection('ConnKCNAccounting')
                ->table('T_Counter_BKM')
                ->where('Periode', $tahun)
                ->update(['Id_BKM_E_Rp' => $noUrut + 1]);

            return response()->json(['IdBKM' => $idBKM]);
        }

        // get id bkk
        else if ($id === 'accBKK') {
            $IdBank = $request->input('IdBank');
            $jenis = $request->input('jenis');
            $tgl = $request->input('tgl');

            $divisi = DB::connection('ConnKCNAccounting')->select(
                'exec SP_5298_ACC_IDBKK @IdBank = ?, @jenis = ?, @tgl = ?'
                ,
                [$IdBank, $jenis, $tgl]
            );
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'id_BKK' => $detail_divisi->id_BKK,
                ];
            }
            return response()->json($data_divisi);
        }

        // get id bkk
        else if ($id === 'getIdPelunasanBKK') {

            $maxIdPembayaran = DB::connection('ConnKCNAccounting')
                ->select(DB::raw('SELECT MAX(Id_Pembayaran) AS id_pembayaran FROM T_Pembayaran_Tagihan'));


            $maxId = $maxIdPembayaran[0]->id_pembayaran;
            // dd($maxIdPembayaran, $maxId);

            $data = [
                'id_pembayaran' => $maxId,
            ];

            return response()->json($data);
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
        $user = Auth::user()->NomorUser;

        if ($id === 'updateDateBKK') {
            $idBKKTampil = $request->input('idBKK');
            DB::connection('ConnKCNAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKK] @idBKK = ?', [
                $idBKKTampil
            ]);
        } else if ($id === 'updateDateBKM') {
            $idBKKTampil = $request->input('idBKM');
            DB::connection('ConnKCNAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKM] @idBKM = ?', [
                $idBKKTampil
            ]);
        }

        // tagih bkm
        else if ($id === 'insertTagihBKM') {
            $idBKM = $request->input('idBKM');
            $tglinput = $request->input('tglinput');
            $terjemahan = $request->input('terjemahan');
            $nilaipelunasan = $request->input('nilaipelunasan');
            $IdBank = $request->input('IdBank');

            // dd($request->all());

            try {
                DB::connection('ConnKCNAccounting')
                    ->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN]
                @idBKM = ?,
                @tglinput = ?,
                @terjemahan = ?,
                @nilaipelunasan = ?,
                @IdBank = ?,
                @userinput = ?', [
                        $idBKM,
                        $tglinput,
                        $terjemahan,
                        $nilaipelunasan,
                        $IdBank,
                        $user
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // tagih 1 bkm
        else if ($id === 'insertSisaBKM') {
            $idpelunasan = $request->input('idpelunasan');
            $sisa = $request->input('sisa');
            $jenisBayar = $request->input('jenisBayar');

            // dd($request->all());
            try {
                DB::connection('ConnKCNAccounting')
                    ->statement('exec [SP_5298_ACC_INSERT_BKM_TDETAILPEL]
                    @idpelunasan = ?,
                @sisa = ?,
                @jenisBayar = ?', [
                        $idpelunasan,
                        $sisa,
                        $jenisBayar,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // tagih 1 bkm
        else if ($id === 'insertTagih1BKM') {
            $idBKM = $request->input('idBKM');
            $idpelunasan = $request->input('idpelunasan');
            $idBank = $request->input('idBank');
            // dd($request->all());

            try {
                DB::connection('ConnKCNAccounting')
                    ->statement('exec [SP_5298_ACC_UPDATE_IDBKM]
                @idBKM = ?,
                @idpelunasan = ?,
                @idBank = ?', [
                        $idBKM,
                        $idpelunasan,
                        $idBank,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // tagih 1 bkm
        else if ($id === 'updateIdBKM') {
            $idbkm = $request->input('idbkm');
            $idBank = $request->input('idBank');
            $jenis = $request->input('jenis');
            $tgl = $request->input('tgl');

            // dd($request->all());

            try {
                DB::connection('ConnKCNAccounting')
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
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // tagih 1 bkm
        else if ($id === 'updateStatusBKM') {
            $idpelunasan = $request->input('idpelunasan');
            // dd($request->all());

            try {
                DB::connection('ConnKCNAccounting')
                    ->statement('exec [SP_5298_ACC_UPDATE_STATUSBAYAR]
                @idpelunasan = ?', [
                        $idpelunasan,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // tagih 1 bkk
        else if ($id === 'insertTransBKK') {
            $idBKK = $request->input('idBKK');
            $tgl = $request->input('tgl');
            $terjemahan = $request->input('terjemahan');
            $nilai = $request->input('nilai');
            $IdBank = $request->input('IdBank');
            // dd($request->all());

            try {
                DB::connection('ConnKCNAccounting')
                    ->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN]
                @idBKK = ?, @tgl = ?, @terjemahan = ?, @nilai = ?, @IdBank = ?, @userinput = ?', [
                        $idBKK,
                        $tgl,
                        $terjemahan,
                        $nilai,
                        $IdBank,
                        $user,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // tagih 1 bkk
        else if ($id === 'insertLCBKK') {
            $idBKK = $request->input('idBKK');
            $idBank = $request->input('idBank');
            $nilai = $request->input('nilai');
            $idBKM_acuan = $request->input('idBKM_acuan');
            $IdBank = $request->input('IdBank');
            // dd($request->all());

            try {
                DB::connection('ConnKCNAccounting')
                    ->statement('exec [SP_5298_ACC_INSERT_BKK_LC]
                @idBKK = ?, @idBank = ?, @nilai = ?, @idBKM_acuan = ?, @user = ?', [
                        $idBKK,
                        $idBank,
                        $nilai,
                        $idBKM_acuan,
                        $user,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // tagih 1 bkk
        else if ($id === 'insertLCDetail') {
            $idpelunasan = $request->input('idpelunasan');
            $idpembayaran = $request->input('idpembayaran');
            // dd($request->all());

            try {
                $divisi = DB::connection('ConnKCNAccounting')
                    ->select('exec [SP_5298_ACC_GET_IDPENAGIHAN_1]
                @idpelunasan = ?', [
                        $idpelunasan,
                    ]);

                // dd($divisi);

                foreach ($divisi as $detail_divisi) {
                    $nilai = floatval($detail_divisi->Nilai);
                    $keterangan = 'Pengembalian K.E. Inv. ' . $detail_divisi->Id_Penagihan;

                    // dd($nilai, $keterangan);

                    DB::connection('ConnKCNAccounting')
                        ->statement('exec [SP_5298_ACC_INSERT_BKK_LC_DETAIL]
                @idpembayaran = ?, @nilai = ?, @keterangan = ?', [
                            $idpembayaran,
                            $nilai,
                            $keterangan,
                        ]);
                }

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // tagih 1 bkm
        else if ($id === 'updateIdBKK') {
            $idbkk = $request->input('idbkk');
            $idBank = $request->input('idBank');
            $jenis = $request->input('jenis');
            $tgl = $request->input('tgl');
            // dd($request->all());

            try {
                DB::connection('ConnKCNAccounting')
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
            } catch (\Exception $e) {
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
