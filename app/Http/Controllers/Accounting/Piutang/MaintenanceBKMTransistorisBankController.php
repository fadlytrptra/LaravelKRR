<?php

namespace App\Http\Controllers\Accounting\Piutang;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;


class MaintenanceBKMTransistorisBankController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        $kodePerkiraan = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK1_KODEPERKIRAAN');
        return view('Accounting.Piutang.MaintenanceBKMTransistorisBank', compact('access', 'kodePerkiraan'));
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
        $user = Auth::user()->NomorUser;

        // get user id
        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
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
        else if ($id === 'getSymbol') {
            $nama = $request->input('nama');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_MATA_UANG
            @kode = ?, @nama = ?', [3, $nama]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Symbol' => $detail_divisi->Symbol,
                ];
            }
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'getJenisBayar') {
            // $idBank = $request->input('idBank');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_JENIS_DOK');
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Id_Jenis_Bayar' => $detail_divisi->Id_Jenis_Bayar,
                    'Jenis_Pembayaran' => $detail_divisi->Jenis_Pembayaran,
                ];
            }
            return datatables($divisi)->make(true);
        }

        // get divisi
        else if ($id === 'getPerkiraan') {
            // $idBank = $request->input('idBank');

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

        // id pembayaran
        else if ($id === 'getIdPembayaran') {
            // $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_GET_IDPEMBAYARAN');
            // $data_divisi = [];
            // foreach ($divisi as $detail_divisi) {
            //     $data_divisi[] = [
            //         'Id_Pembayaran' => $detail_divisi->id_pembayaran,
            //     ];
            // }
            // return response()->json($data_divisi);
            $data = DB::connection('ConnAccounting')
                ->table('T_PEMBAYARAN_TAGIHAN')
                ->select('Id_Pembayaran')
                ->where('User_Input', $user)
                ->orderBy('Id_Pembayaran', 'desc')
                ->first(); // Mengambil satu data terbaru
            $data = $data->Id_Pembayaran;
            return response()->json($data);
        }

        // id lunas
        else if ($id === 'getIdPelunasan') {
            // $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_GET_IDPELUNASAN');
            // $data_divisi = [];
            // foreach ($divisi as $detail_divisi) {
            //     $data_divisi[] = [
            //         'id_pelunasan' => $detail_divisi->id_pelunasan,
            //     ];
            // }
            // return response()->json($data_divisi);
            $data = DB::connection('ConnAccounting')
                ->table('T_PELUNASAN_TAGIHAN')
                ->select('Id_Pelunasan')
                ->where('UserInput', $user)
                ->orderBy('Id_Pelunasan', 'desc')
                ->first(); // Mengambil satu data terbaru
            $data = $data->Id_Pelunasan;
            return response()->json($data);
        }

        // id cek bg
        else if ($id === 'cekBg') {
            $idpembayaran = $request->input('idpembayaran');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_GET_DETAIL_BGCEK
                @idpembayaran = ?', [$idpembayaran]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdBGCEK' => $detail_divisi->IdBGCEK,
                ];
            }
            return response()->json($data_divisi);
        }

        // list bkm
        else if ($id === 'getListBKM') {
            $tgl1 = $request->input('tgl1');
            $tgl2 = $request->input('tgl2');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BKM_TRANSITORIS_PERTGL
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

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BKK_TRANSITORIS_PERTGL
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

        // cetak bkm
        else if ($id === 'getCetakBKM') {
            $id_bkm = $request->input('id_bkm');

            $divisi = DB::connection('ConnAccounting')
                ->table('VW_PRG_5298_ACC_CETAK_BKM_TUNAI_1')
                ->where('Id_BKM', $id_bkm)
                ->get();


            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Id_bank' => $detail_divisi->Id_bank,
                    'Nama_Bank' => $detail_divisi->Nama_Bank,
                    'Nilai_Rincian' => $detail_divisi->Nilai_Rincian,
                    'Terjemahan' => $detail_divisi->Terjemahan,
                    'KodePerkiraan' => $detail_divisi->KodePerkiraan,
                    'Keterangan' => $detail_divisi->Keterangan,
                    'Uraian' => $detail_divisi->Uraian,
                    'Symbol' => $detail_divisi->Symbol,
                    'DetailKdPerkiraan' => $detail_divisi->DetailKdPerkiraan,
                    'Id_MataUang_BC' => $detail_divisi->Id_MataUang_BC,
                    'Tgl_Input' => $detail_divisi->Tgl_Input,
                    'Id_BKM' => $detail_divisi->Id_BKM,
                    'Nilai_Pelunasan' => $detail_divisi->Nilai_Pelunasan,
                ];
            }

            return response()->json($data_divisi);
        }

        // cetak bkK
        else if ($id === 'getCetakBKK') {
            $id_bkk = $request->input('id_bkk');

            $divisi = DB::connection('ConnAccounting')
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
                // DB::connection('ConnAccounting')
                //     ->table('T_COUNTER_BKK')
                //     ->where('Periode', $tahun)
                //     ->update(['Id_BKK_E_Rp' => $noUrut + 1]);
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
            $idBKK = $bank . '-P' . substr($tahun, -2) . substr($idBKK, -5);

            return response()->json(['IdBKK' => $idBKK]);
        } else if ($id === 'getIdBKM') {
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
                // DB::connection('ConnAccounting')
                //     ->table('T_Counter_BKM')
                //     ->where('Periode', $tahun)
                //     ->update(['Id_BKM_E_Rp' => $noUrut + 1]);
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
            $idBKM = $bank . '-R' . substr($tahun, -2) . substr($idBKM, -5);



            return response()->json(['IdBKM' => $idBKM]);
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
        $proses = $request->all();
        // if ($proses['cetak'] == "tampilBKK") {
        //     //dd($request->all());
        //     $idBKK = $request->idTampilBKK;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKK] @idBKK = ?', [
        //         $idBKK
        //     ]);
        //     return redirect()->back()->with('success', 'Tanggal cetak sudah terupdate');

        // } else if ($proses['cetak'] == "tampilBKM") {
        //     //dd('masuk');
        //     $idBKM = $request->idTampilBKM;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKM] @idBKM = ?', [
        //         $idBKM
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

                return response()->json(['success' => 'Data sudah diSIMPAN']);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()]);
            }
        }

        // trans bkk
        else if ($id === 'insertTransBKK') {
            $idBKK = $request->input('idBKK');
            $idUang = $request->input('idUang');
            $idJenis = $request->input('idJenis');
            $idBank = $request->input('idBank');
            $nilai = $request->input('nilai');
            $kurs = $request->input('kurs');

            if (intval($kurs) === 0) {
                try {
                    DB::connection('ConnAccounting')
                        ->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN_TAG_1 ]
                    @idBKK = ?,
                    @idUang = ?,
                    @idJenis = ?,
                    @idBank = ?,
                    @nilai = ?,
                    @user = ?', [
                            $idBKK,
                            $idUang,
                            $idJenis,
                            $idBank,
                            $nilai,
                            $user,
                        ]);

                    return response()->json(['success' => 'Data sudah diSIMPAN']);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()]);
                }
            } else if (intval($kurs) !== 0) {
                try {
                    DB::connection('ConnAccounting')
                        ->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN_TAG_1 ]
                    @idBKK = ?,
                    @idUang = ?,
                    @idJenis = ?,
                    @idBank = ?,
                    @nilai = ?,
                    @kurs = ?,
                    @user = ?', [
                            $idBKK,
                            $idUang,
                            $idJenis,
                            $idBank,
                            $nilai,
                            $kurs,
                            $user,
                        ]);

                    return response()->json(['success' => 'Data sudah diSIMPAN']);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()]);
                }
            }
        }

        // trans 2
        else if ($id === 'insertTrans2BKK') {
            $idpembayaran = (int) $request->input('idpembayaran');
            $keterangan = $request->input('keterangan');
            $biaya = (float) $request->input('biaya');
            $kodeperkiraan = $request->input('kodeperkiraan');

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
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()]);
            }
        }

        // biaya bkk
        else if ($id === 'insertDetailBKK') {
            $idpembayaran = $request->input('idpembayaran');
            $detailBKK = $request->input('detailBKK');

            try {
                foreach ($detailBKK as $detail) {
                    $keterangan = $detail[0];
                    $biaya = $detail[1];
                    $kodeperkiraan = $detail[2];

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
                }

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()]);
            }
        }

        // biaya bkM
        else if ($id === 'insertDetailBKM') {
            $idpelunasan = $request->input('idpelunasan');
            $detailBKM = $request->input('detailBKM');

            try {
                foreach ($detailBKM as $detail) {
                    $keterangan = $detail[0];
                    $biaya = $detail[1];
                    $kodeperkiraan = $detail[2];

                    DB::connection('ConnAccounting')
                        ->statement('exec [SP_5298_ACC_INSERT_DETAIL_BIAYA]
                @idpelunasan = ?,
                @keterangan = ?,
                @biaya = ?,
                @kodeperkiraan = ?', [
                            $idpelunasan,
                            $keterangan,
                            $biaya,
                            $kodeperkiraan,
                        ]);
                }

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()]);
            }
        }

        // update bg
        else if ($id === 'updateBg') {
            $id = $request->input('id');
            $idBG = $request->input('idBG');

            try {
                DB::connection('ConnAccounting')
                    ->statement('exec [SP_5298_ACC_UPDATE_TDETAILPEMB]
                    @id = ?,
                    @idBG = ?', [
                        $id,
                        $idBG,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()]);
            }
        }

        // insert bg
        else if ($id === 'insertBg') {
            $id = $request->input('id');
            $no = $request->input('no');
            $jthtempo = $request->input('jthtempo');
            $status = $request->input('status');

            try {
                DB::connection('ConnAccounting')
                    ->statement('exec [SP_5298_ACC_INSERT_BGCEK]
                    @id = ?,
                    @no = ?,
                    @jthtempo = ?,
                    @status = ?', [
                        $id,
                        $no,
                        $jthtempo,
                        $status,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()]);
            }
        }

        // insert BKM
        else if ($id === 'insertBKM') {
            $idBKM = $request->input('idBKM');
            $tglinput = $request->input('tglinput');
            $terjemahan = $request->input('terjemahan');
            $IdBank = $request->input('IdBank');
            $nilaipelunasan = $request->input('nilai');

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

                return response()->json(['success' => 'Data sudah diSIMPAN']);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()]);
            }
        }

        // update BKM
        else if ($id === 'updateIdBKM') {
            $idbkm = $request->input('idbkm');
            $idBank = $request->input('idBank');
            $jenis = $request->input('jenis');
            $tgl = $request->input('tgl');

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
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()]);
            }
        }

        // trans bkm
        else if ($id === 'insertTransBKM') {
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

            if (intval($kurs) === 0) {
                try {
                    DB::connection('ConnAccounting')
                        ->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN_TAG_TRANSITORIS]
                    @idBKM = ?,
                    @tgl = ?,
                    @idUang = ?,
                    @idJenis = ?,
                    @idBank = ?,
                    @kodeperkiraan = ?,
                    @uraian = ?,
                    @nilaipelunasan = ?,
                    @idBKKAcuan = ?,
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
                            $user,
                        ]);

                    return response()->json(['success' => 'Data sudah diSIMPAN']);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()]);
                }
            } else if (intval($kurs) !== 0) {
                try {
                    DB::connection('ConnAccounting')
                        ->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN_TAG_TRANSITORIS]
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
                            $user,
                        ]);

                    return response()->json(['success' => 'Data sudah diSIMPAN']);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()]);
                }
            }
        }

        //dd($request->all());
    }



    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
