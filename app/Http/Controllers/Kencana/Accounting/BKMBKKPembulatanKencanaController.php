<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Auth;

class BKMBKKPembulatanKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.BKMBKKPembulatan', compact('access'));
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        $user = Auth::user()->NomorUser;
        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        }

        if ($id == 'getBank') {
            // Retrieve list of banks (SP_1273_PRG_LIST_BANK)
            $bankResults = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BANK');
            // dd($bankResults);
            $response = [];
            foreach ($bankResults as $bank) {
                $response[] = [
                    'Id_Bank' => $bank->Id_Bank,
                    'Nama_Bank' => $bank->Nama_Bank,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBankDetails') {
            if ($request->input('idBank') !== null) {
                // Execute the stored procedure to get bank details
                $bankResults = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_BANK_2 @idBank = ?', [
                        trim($request->input('idBank'))
                    ]);
                // dd($bankResults);
                if (count($bankResults) > 0) {
                    $bankData = $bankResults[0];

                    $response = [
                        'Jenis' => trim($bankData->jenis),
                        'Nama' => trim($bankData->Nama)
                    ];

                    return response()->json($response, 200);
                } else {
                    return response()->json(['message' => 'Bank not found'], 404);
                }
            } else {
                return response()->json(['message' => 'Invalid Bank ID'], 400);
            }
        } else if ($id == 'getBKM') {
            $kode = 1;
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');

            $bkmResults = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKM_PEMBULATAN @kode = ?, @bln = ?, @thn = ?', [$kode, $bulan, $tahun]);
            // dd($bkmResults);
            $response = [];
            $index = 0;

            if (!empty($bkmResults)) {
                foreach ($bkmResults as $bkm) {
                    $index++;
                    $response[] = [
                        'Tgl_Input' => \Carbon\Carbon::parse($bkm->Tgl_Input)->format('m/d/Y'),
                        'Id_BKM' => $bkm->Id_BKM,
                        'Total' => number_format($bkm->Total, 2, '.', ','),
                    ];
                }
                return datatables($response)->make(true);
            } else {
                return datatables([])->make(true);
            }

        } else if ($id == 'getBKMDetails') {
            $kode = 2;
            $idBKM = trim($request->input('idBKM'));
            // dd($idBKM);
            // Execute the stored procedure
            $bkmDetails = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKM_PEMBULATAN @kode = ?, @idBKM = ?', [$kode, $idBKM]);
            // dd($bkmDetails);
            // Prepare the response array for DataTables
            $response = [];
            foreach ($bkmDetails as $detail) {
                $response[] = [
                    'NamaCust' => $detail->NamaCust,
                    'No_Bukti' => $detail->No_Bukti,
                    'ID_Penagihan' => $detail->ID_Penagihan,
                    'MataUang' => $detail->MataUang,
                    'Rincian' => number_format($detail->Rincian, 2, '.', ','), // Format as ###,###,##0.00
                    'Id_bank' => $detail->Id_bank,
                    'Jenis_Bank' => $detail->Jenis_Bank,
                    'Id_MataUang' => $detail->Id_MataUang,
                ];
            }

            // dd($response);
            return datatables($response)->make(true);
        } else if ($id == 'getPembulatan') {
            $results = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_BKK_DP');
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
        } else if ($id == 'getOkBKM') {
            // Extract the parameters from the request
            $tgl1 = $request->input('tgl_awalbkk');
            $tgl2 = $request->input('tgl_akhirbkk');
            // dd($tgl1, $tgl2);
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK_DP_PERTGL ?, ?', [$tgl1, $tgl2]);
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
            $bkk = trim($request->input('bkk'));

            $sno = DB::connection('ConnKCNAccounting')
                ->select("SELECT * FROM VW_PRG_5298_ACC_CETAK_BKK_DP WHERE Id_BKK = ?", [$bkk]);

            return response()->json([
                'data' => $sno,
                'message' => 'Laporan telah dicetak dengan sukses'
            ]);
        } else if ($id === 'getUraian') {
            $bank = $request->input('id_bank1');
            $tanggal = $request->input('tanggal');

            $tahun = date('Y', strtotime($tanggal));
            $noUrut = 0;
            $ada = 0;
            $idBKM = '';
            $id_BKK = '';

            $ada = DB::connection('ConnKCNAccounting')->table('T_COUNTER_BKK')
                ->where('Periode', $tahun)
                ->count();

            if ($ada === 1) {
                // Logic if record exists
                $noUrut = DB::connection('ConnKCNAccounting')->table('T_COUNTER_BKK')
                    ->where('Periode', $tahun)
                    ->value('Id_BKK_E_Rp');
            } elseif ($ada === 0) {
                // Logic if no record exists
                $noUrut = 1;

                DB::connection('ConnKCNAccounting')->table('T_COUNTER_BKK')->insert([
                    'Periode' => $tahun,
                    'Id_BKK_E_Rp' => $noUrut,
                ]);
            }

            // Generate the IdBKK
            $id_BKK = '00000' . (string) $noUrut; // pad with leading zeros
            $id_BKK = $bank . '-P' . substr($tahun, -2) . substr($id_BKK, -5); // format IdBKK

            // Update T_COUNTER_BKK to increment Id_BKK_E_Rp
            DB::connection('ConnKCNAccounting')->table('T_COUNTER_BKK')
                ->where('Periode', $tahun)
                ->update(['Id_BKK_E_Rp' => $noUrut + 1]);

            // Return IdBKK
            // dd($id_BKK);
            return response()->json(['IdBKK' => $id_BKK]);
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
        $idBKK = trim($request->input('idBKK'));
        $tanggal = trim($request->input('tanggal'));
        $user_id = trim($request->input('user_id'));
        $Konversi = trim($request->input('Konversi'));
        $nilai = trim($request->input('nilai'));
        $id_bank = trim($request->input('id_bank'));
        $idMtUang = trim($request->input('idMtUang'));
        $id_bkm = trim($request->input('id_bkm'));
        $uraian = trim($request->input('uraian'));
        $idKodePerkiraan = trim($request->input('idKodePerkiraan'));
        $id_bkk = trim($request->input('id_bkk'));
        $id_bank1 = trim($request->input('id_bank1'));
        $jenis_bank = trim($request->input('jenis_bank'));

        // dd($request->all());

        if ($id === 'proses') {
            // proses insert pada T_Pembayaran
            $pembayaran = DB::connection('ConnKCNAccounting')->statement(
                'exec SP_1273_PRG_INSERT_BKK_TPEMBAYARAN
                @idBKK = ?, @tgl = ?, @userinput = ?, @terjemahan = ?, @nilai = ?, @IdBank=?',
                [$idBKK, $tanggal, $user_id, $Konversi, $nilai, $id_bank]
            );
            // dd($pembayaran);


            // proses insert pada T_Pembayaran_Tagihan
            $tagihan = DB::connection('ConnKCNAccounting')->statement(
                'exec SP_1273_PRG_INSERT_BKK_TPEMBAYARAN_TAG
                @idBKK = ?, @idUang = ?, @idJenis = ?, @IdBank = ?, @nilai = ?, @user = ?, @idBKM_acuan = ?',
                [$idBKK, $idMtUang, 1, $id_bank, $nilai, $user_id, $id_bkm]
            );
            // dd($tagihan);

            $query = DB::connection('ConnKCNAccounting')->select('
                    select max(Id_Pembayaran) as Id_Pembayaran
                    from T_Pembayaran_Tagihan');

            $idPembayaran = $query[0]->Id_Pembayaran;
            // dd($idPembayaran);

            // proses insert pada T_Detail_Pembayaran
            $trans2 = DB::connection('ConnKCNAccounting')->statement(
                'exec SP_1273_PRG_INSERT_BKK_TDETAILPEMB
                @idpembayaran = ?, @keterangan = ?, @biaya = ?, @kodeperkiraan = ?',
                [$idPembayaran, $uraian, $nilai, $idKodePerkiraan]
            );


            // proses update id_BKK pada T_Counter
            $counter = DB::connection('ConnKCNAccounting')->statement(
                'exec SP_1273_PRG_UPDATE_COUNTER_IDBKK
                @idbkk = ?, @idBank = ?, @jenis = ?, @tgl = ?',
                [$id_bkk, $id_bank1, $jenis_bank, $tanggal]
            );

            if ($id_bank1 === 'KKK' && $jenis_bank === 'E') {
                // Retrieve the current Tgl_BKK_Tunai from T_Counter
                $tglBKK = DB::connection('ConnKCNAccounting')
                    ->table('T_Counter')
                    ->value('Tgl_BKK_Tunai');

                // dd($tglBKK);

                // Format both $tglBKK and $tgl
                $tglBKKFormatted = \Carbon\Carbon::parse($tglBKK)->format('m-Y');
                $tglFormatted = \Carbon\Carbon::parse($tanggal)->format('m-Y');

                // dd($tglBKKFormatted, $tglFormatted);

                if ($tglBKKFormatted === $tglFormatted) {
                    // dd('sama');
                    DB::connection('ConnKCNAccounting')
                        ->table('T_Counter')
                        ->update(['Id_BKK_Tunai' => $id_bkk]);
                } else {
                    // dd('beda');
                    DB::connection('ConnKCNAccounting')
                        ->table('T_Counter')
                        ->update([
                            'Id_BKK_Tunai' => $id_bkk,
                            'Tgl_BKK_Tunai' => $tanggal
                        ]);
                }
            }



            if (!($pembayaran || $tagihan || $trans2 || $counter)) {
                return response()->json([
                    'error' => true,
                    'message' => 'Tidak Ada Yg diPROSES!'
                ]);
            } else {
                return response()->json([
                    'success' => true,
                    'message' => 'BKK No. ' . $idBKK . ' TerSimpan'
                ]);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
