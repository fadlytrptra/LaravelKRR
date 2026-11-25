<?php

namespace App\Http\Controllers\Kencana\Accounting;

use DB;
use Exception;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;
// use Illuminate\Support\Facades\Log;

class BKMBKKNotaKreditKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.BKMBKKNotaKredit', compact('access'));
        // $data = 'Accounting';
        // return view('Accounting.Piutang.BKMBKKNotaKredit', compact('data'));
    }

    public function getDataNotaKreditKencana()
    {
        $tabel =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_NOTA_KREDIT]');
        // dd($tabel);
        return response()->json($tabel);
    }

    public function getMataUangKencana()
    {
        $data = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_MATA_UANG] @Kode = ?', [1]);
        $data_Uang = [];
        foreach ($data as $detail_Uang) {
            $data_Uang[] = [
                'Id_MataUang' => $detail_Uang->Id_MataUang,
                'Nama_MataUang' => $detail_Uang->Nama_MataUang
            ];
        }
        return datatables()->of($data_Uang)->make(true);
    }


    function getUraianEnterBKMKencana($id, $tanggal)
    {
        $idBank = $id;
        $tanggal = $tanggal;
        $jenis = 'R';

        $result = DB::statement("EXEC [dbo].[SP_5409_ACC_COUNTER_BKM_BKK] ?, ?, ?, ?", [
            $jenis,
            $tanggal,
            $idBank,
            null
            // Pass by reference for output parameter
        ]);


        $tahun = substr($tanggal, -10, 4);
        $x = DB::connection('ConnKCNAccounting')->table('T_COUNTER_BKM')->where('Periode', '=', $tahun)->first();
        $nomorIdBKM = '00000' . str_pad($x->Id_BKM_E_Rp, 5, '0', STR_PAD_LEFT);
        $idBKM = $idBank . '-R' . substr($tahun, -2) . substr($nomorIdBKM, -5);

        return response()->json($idBKM);
    }

    function getUraianEnterBKKKencana($id, $tanggal)
    {
        $idBank = $id;
        $tanggal = $tanggal;
        $jenis = 'P';

        $result = DB::statement("EXEC [dbo].[SP_5409_ACC_COUNTER_BKM_BKK] ?, ?, ?, ?", [
            $jenis,
            $tanggal,
            $idBank,
            null
            // Pass by reference for output parameter
        ]);

        $tahun = substr($tanggal, -10, 4);
        $x = DB::connection('ConnKCNAccounting')->table('T_COUNTER_BKK')->where('Periode', '=', $tahun)->first();
        $nomorIdBKK = '00000' . str_pad($x->Id_BKK_E_Rp, 5, '0', STR_PAD_LEFT);
        $idBKK = $idBank . '-R' . substr($tahun, -2) . substr($nomorIdBKK, -5);

        return response()->json($idBKK);
    }

    public function getTabelTampilBKMKencana($tanggalTampilBKM, $tanggalTampilBKM2)
    {
        // dd("masuk");
        $tabel =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_BKM_NOTA_KREDIT_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalTampilBKM, $tanggalTampilBKM2]);
        return response()->json($tabel);
    }

    public function getTabelTampilBKKKencana($tanggalTampilBKK, $tanggalTampilBKK2)
    {
        // dd("masuk");
        $tabel =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_BKK_NOTA_KREDIT_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalTampilBKK, $tanggalTampilBKK2]);
        return response()->json($tabel);
    }

    public function getIdPelunasanKencana()
    {
        $idPelunasan = DB::connection('ConnKCNAccounting')
            ->table('T_Pelunasan_Tagihan')
            ->max('Id_Pelunasan');
        // dd($idPelunasan);

        return response()->json(['Id_Pelunasan' => $idPelunasan]);
    }

    public function getIdPembayaranKencana()
    {
        $idPembayaran = DB::connection('ConnKCNAccounting')
            ->table('T_Pembayaran_Tagihan')
            ->max('Id_Pembayaran');
        // dd($idPelunasan);

        return response()->json(['Id_Pembayaran' => $idPembayaran]);
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
        $idBankBKM = trim($request->input('idBankBKM'));
        $tanggal = trim($request->input('tanggal'));
        $jenis = trim($request->input('jenis'));
        $idBankBKK = trim($request->input('idBankBKK'));
        $idBankBKKtemp = trim($request->input('idBankBKKtemp'));

        if ($id === 'getbank') {
            $data = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_BANK]');
            // dd($data);
            $data_isi = [];
            foreach ($data as $detail_isi) {
                $data_isi[] = [
                    'Id_Bank' => $detail_isi->Id_Bank,
                    'Nama_Bank' => $detail_isi->Nama_Bank
                ];
            }
            return datatables($data_isi)->make(true);
        } else if ($id === 'detailjenisbank') {
            $idBank = trim($request->input('idBank'));

            $data =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_BANK_1] @idBank = ?', [$idBank]);
            // dd($data, $request->all());
            return response()->json($data);
        } else if ($id === 'getkodeperkiraan') {
            $data = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_KODE_PERKIRAAN] @Kode = 1');
            // dd($data);
            $data_isi = [];
            foreach ($data as $detail_isi) {
                $data_isi[] = [
                    'NoKodePerkiraan' => $detail_isi->NoKodePerkiraan,
                    'Keterangan' => $detail_isi->Keterangan
                ];
            }
            return datatables($data_isi)->make(true);
        } else if ($id === 'getidNota') {
            $tanggal = trim($request->input('tanggal'));
            $jenis = trim($request->input('jenis'));

            // dd($request->all());
            $tgl = Carbon::parse($tanggal);

            $tahun = $tgl->year;
            $noUrut = 0;
            $ada = 0;

            if ($jenis === 'R') {
                $ada = DB::connection('ConnKCNAccounting')->table('T_Counter_BKM')->where('Periode', $tahun)->count();

                if ($ada == 1) {
                    $noUrut = DB::connection('ConnKCNAccounting')->table('T_Counter_BKM')->where('Periode', $tahun)->value('Id_BKM_E_Rp');
                } else {
                    $noUrut = 1;

                    DB::connection('ConnKCNAccounting')->table('T_Counter_BKM')->insert([
                        'Periode' => $tahun,
                        'Id_BKM_E_Rp' => $noUrut,
                    ]);
                }

                $idBKM = '00000' . (string)$noUrut;
                $finalIdBKM = $idBankBKM . '-R' . substr($tahun, -2) . substr($idBKM, -5);

                DB::connection('ConnKCNAccounting')->table('T_Counter_BKM')->where('Periode', $tahun)->update([
                    'Id_BKM_E_Rp' => $noUrut + 1,
                ]);

                return response()->json(['IdBKM' => $finalIdBKM]);
            } else {
                $ada = DB::connection('ConnKCNAccounting')->table('T_Counter_BKK')->where('Periode', $tahun)->count();

                if ($ada == 1) {
                    $noUrut = DB::connection('ConnKCNAccounting')->table('T_Counter_BKK')->where('Periode', $tahun)->value('Id_BKK_E_Rp');
                } else {
                    $noUrut = 1;

                    DB::connection('ConnKCNAccounting')->table('T_Counter_BKK')->insert([
                        'Periode' => $tahun,
                        'Id_BKK_E_Rp' => $noUrut,
                    ]);
                }

                $idBKK = '00000' . (string)$noUrut;
                $finalIdBKK = $idBankBKK . '-P' . substr($tahun, -2) . substr($idBKK, -5);

                DB::connection('ConnKCNAccounting')->table('T_Counter_BKK')->where('Periode', $tahun)->update([
                    'Id_BKK_E_Rp' => $noUrut + 1,
                ]);

                return response()->json(['IdBKK' => $finalIdBKK]);
            }
        } else if ($id == 'cetakBKK') {
            $bkk = trim($request->input('bkk'));

            $sno = DB::connection('ConnKCNAccounting')
                ->select("SELECT * FROM VW_PRG_5298_ACC_CETAK_BKK_NOTA_KREDIT WHERE Id_BKK = ?", [$bkk]);
            // dd($sno);

            DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_UPDATE_TGLCETAK_BKK] @idBKK = ?', [$bkk]);

            return response()->json([
                'data' => $sno,
                'message' => 'Laporan telah dicetak dengan sukses'
            ]);
        } else if ($id == 'getPembulatanBKK') {
            $results = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_BKK_NOTA_KREDIT');
            // dd($results);
            $response = [];
            $j = 0;

            foreach ($results as $row) {
                $j++;
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKK' => $row->Id_BKK,
                    'Nilai_Pembulatan' => number_format($row->Nilai_Pembulatan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getOkBKK') {
            $tgl1 = $request->input('tgl_awalbkk');
            $tgl2 = $request->input('tgl_akhirbkk');
            // dd($tgl1, $tgl2);

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK_NOTA_KREDIT_PERTGL ?, ?', [$tgl1, $tgl2]);
            // dd($results);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKK' => $row->Id_BKK,
                    'Nilai_Pembulatan' => number_format($row->Nilai_Pembulatan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan ?? "",
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'cetakBKM') {
            $bkm = trim($request->input('bkm'));

            $sno = DB::connection('ConnKCNAccounting')
                ->select("SELECT * FROM VW_PRG_5298_ACC_CETAK_BKM_NOTA_KREDIT WHERE Id_BKM = ?", [$bkm]);
            // dd($sno);

            DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_UPDATE_TGLCETAK_BKM] @idBKm = ?', [$bkm]);

            return response()->json([
                'data' => $sno,
                'message' => 'Laporan telah dicetak dengan sukses'
            ]);
        } else if ($id == 'getPembulatanBKM') {
            $results = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_BKM_NOTA_KREDIT');
            // dd($results);
            $response = [];
            $j = 0;

            foreach ($results as $row) {
                $j++;
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getOkBKM') {
            $tgl1 = $request->input('tgl_awalBKM');
            $tgl2 = $request->input('tgl_akhirBKM');
            // dd($tgl1, $tgl2);

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKM_NOTA_KREDIT_PERTGL ?, ?', [$tgl1, $tgl2]);
            // dd($results);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan ?? "",
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
        if ($id === 'insertTLunas') {
            $user = Auth::user()->NomorUser;

            $idBKM = $request->input('idBKM');
            $tgl = $request->input('tgl');
            $terjemahan = $request->input('terjemahan');
            // $nilai = $request->input('nilai');
            $IdBank = $request->input('IdBank');
            $idBKK = $request->input('idBKK');
            $noMtUang = $request->input('noMtUang');
            $nilai1 = $request->input('nilai1');
            $idCust = $request->input('idCust');
            $kursRupiah = $request->input('kursRupiah');
            $NoPenagihan = $request->input('NoPenagihan');
            $jmlUang = $request->input('jmlUang');
            $idKodePerkiraanBKM = $request->input('idKodePerkiraanBKM');
            $idbkmtemp = $request->input('idbkmtemp');
            $jenisBankBKM = $request->input('jenisBankBKM');
            $blnthnn = $request->input('blnthnn');
            $bankbkm = $request->input('bankbkm');

            // dd($request->all());

            try {
                // Insert into T_Pelunasan
                // Log::info('Inserting into T_Pelunasan started.');
                DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_INSERT_BKM_TPELUNASAN]
                    @idBKM = ?,
                    @tglinput = ?,
                    @userinput = ?,
                    @terjemahan = ?,
                    @nilaipelunasan = ?,
                    @IdBank = ?,
                    @kode = 1', [
                    $idBKM,
                    $tgl,
                    $user,
                    $terjemahan,
                    $nilai1,
                    $IdBank,
                ]);
                // Log::info('Inserting into T_Pelunasan finished successfully.');

                // Insert into T_Pelunasan_Tagihan
                // Log::info('Inserting into T_Pelunasan_Tagihan started.');
                $data = [
                    'Id_BKM' => $idBKM,
                    'Tgl_Pelunasan' => now(),
                    'Id_Bank' => $IdBank,
                    'Id_MataUang' => $noMtUang,
                    'Id_Jenis_Bayar' => 1,
                    'Nilai_Pelunasan' => $nilai1,
                    'TglInput' => now(),
                    'UserInput' => $user,
                    'Id_BKK_Acuan' => $idBKK,
                    'Id_Cust' => $idCust,
                    'Status_Penagihan' => "Y",
                ];

                if ($kursRupiah > 0) {
                    $data['Kurs_RPH'] = $kursRupiah;
                }

                $insertedId = DB::connection('ConnKCNAccounting')->table('T_Pelunasan_Tagihan')->insertGetId($data);
                $idPelunasan = DB::connection('ConnKCNAccounting')->table('T_Pelunasan_Tagihan')->max('Id_Pelunasan');
                // Log::info('Inserting into T_Pelunasan_Tagihan finished successfully.');

                // Insert into T_Detail_Pelunasan_Tagihan
                // Log::info('Inserting into T_Detail_Pelunasan_Tagihan started.');
                DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_INSERT_BKM_TDETAILPEL]
                    @idpelunasan = ?,
                    @idpenagihan = ?,
                    @sisa = ?,
                    @kodePerk = ?,
                    @kode = 1', [
                    $idPelunasan,
                    $NoPenagihan,
                    $jmlUang,
                    $idKodePerkiraanBKM
                ]);
                // Log::info('Inserting into T_Detail_Pelunasan_Tagihan finished successfully.');

                // Update id_BKM pada T_Counter_BKM
                // Log::info('Updating T_Counter_IdBKM started.');
                DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_UPDATE_COUNTER_IDBKM]
                        @idBKM = ?,
                        @idBank = ?,
                        @jenis = ?,
                        @tgl = ?', [
                    $idbkmtemp,
                    $bankbkm,
                    $jenisBankBKM,
                    $blnthnn
                ]);
                // Log::info('Updating T_Counter_IdBKM finished successfully.');

                return response()->json([
                    'success' => 'Data sudah diSIMPAN',
                    'id_pelunasan' => $idPelunasan
                ], 200);
            } catch (\Exception $e) {
                // Log::error('Error occurred: ' . $e->getMessage());
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }

        } else if ($id === 'insertTPembayaran') {
            $user = Auth::user()->NomorUser;
            $idBKK = $request->input('idBKK');
            $idBKM = $request->input('idBKM');
            $tgl = $request->input('tgl');
            $terjemahan = $request->input('terjemahan');
            $nilai = $request->input('nilai');
            $IdBank = $request->input('IdBank');
            $noMtUang = $request->input('noMtUang');
            $idCust = $request->input('idCust');
            $kursRupiah = $request->input('kursRupiah');
            $NoNotaKredit = $request->input('NoNotaKredit');
            $jmlUang = $request->input('jmlUang');
            $idKodePerkiraanBKK = $request->input('idKodePerkiraanBKK');
            $idbkktemp = $request->input('idbkktemp');
            $jenisBankBKK = $request->input('jenisBankBKK');
            $NoPenagihan = $request->input('NoPenagihan');
            $bankbkk = $request->input('bankbkk');


            // dd($request->all());

            try {
                // Log request inputs
                // Log::info('Inserting into T_Pembayaran started.');

                // Insert pada T_Pembayaran
                DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_INSERT_BKK_TPEMBAYARAN]
                    @idBKK = ?,
                    @tgl = ?,
                    @userinput = ?,
                    @terjemahan = ?,
                    @nilai = ?,
                    @IdBank = ?,
                    @kode = 1', [
                    $idBKK,
                    $tgl,
                    $user,
                    $terjemahan,
                    $nilai,
                    $IdBank,
                ]);
                // Log::info('Inserting into T_Pembayaran finished successfully.');

                // Insert pada T_Pembayaran_Tagihan
                $data = [
                    'Id_BKK' => $idBKK,
                    'Id_MataUang' => $noMtUang,
                    'Tgl_Input' => now(),
                    'Id_Jenis_Bayar' => 1,
                    'Id_Bank' => $IdBank,
                    'Nilai_Pembayaran' => $nilai,
                    'PersetujuanBayar' => now(),
                    'User_Input' => $user,
                    'User_ACC' => $user,
                    'Id_BKM_Acuan' => $idBKM,
                    'Diajukan' => "Y",
                    'Waktu_Diajukan' => now(),
                    'Id_BKM_Acuan' => $idBKM,
                    'Jml_JenisBayar' => 1
                ];

                if ($kursRupiah > 0) {
                    $data['Kurs_Bayar'] = $kursRupiah;
                }

                $insertedId = DB::connection('ConnKCNAccounting')->table('T_Pembayaran_Tagihan')->insertGetId($data);
                $idPembayaran = DB::connection('ConnKCNAccounting')->table('T_Pembayaran_Tagihan')->max('id_pembayaran');
                // Log::info('Inserting into T_Pembayaran_Tagihan finished successfully.');

                // Insert pada T_Detail_Pelunasan_Tagihan
                DB::connection('ConnKCNAccounting')->statement(
                    'exec [SP_1273_PRG_INSERT_BKK_TDETAILPEMB]
                        @idpembayaran = ?,
                        @keterangan = ?,
                        @biaya = ?,
                        @kodeperkiraan = ?',
                    [
                        $idPembayaran,
                        $NoNotaKredit,
                        $jmlUang,
                        $idKodePerkiraanBKK
                    ]
                );
                // Log::info('Inserted into T_Detail_Pelunasan_Tagihan finished successfully.');

                // Update id_BKK pada T_Counter_BKK
                DB::connection('ConnKCNAccounting')->statement(
                    'exec [SP_1273_PRG_UPDATE_COUNTER_IDBKK]
                    @idbkk = ?,
                    @idBank = ?,
                    @jenis = ?,
                    @tgl = ?',
                    [
                        $idbkktemp,
                        $bankbkk,
                        $jenisBankBKK,
                        $tgl
                    ]
                );
                // Log::info('Updated T_Counter_BKK finished successfully.');

                // Update no BKK di T_Nota_Kredit dan T_Kartu_Piutang
                DB::connection('ConnKCNAccounting')->statement(
                    'exec [SP_1273_PRG_UPDATE_FIELD_IDBKK]
                        @idNotaKredit = ?,
                        @idPenagihan = ?,
                        @idBKK = ?,
                        @idBKM = ?',
                    [
                        $NoNotaKredit,
                        $NoPenagihan,
                        $idBKK,
                        $idBKM
                    ]
                );
                // Log::info('Updated T_Nota_Kredit dan T_Kartu_Piutang finished successfully.');

                return response()->json([
                    'success' => true,
                    'message' => 'BKM No. ' . $idBKM . ' & BKK No. ' . $idBKK . ' TerSimpan.',
                    'id_pembayaran' => $idPembayaran
                ], 200);

            } catch (\Exception $e) {
                // Log::error('Error during insert process:', ['error' => $e->getMessage()]);
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
