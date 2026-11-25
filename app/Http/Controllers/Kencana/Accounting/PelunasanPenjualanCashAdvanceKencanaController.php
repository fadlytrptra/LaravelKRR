<?php

namespace App\Http\Controllers\Kencana\Accounting;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class PelunasanPenjualanCashAdvanceKencanaController extends Controller
{
    public function index()
    {
        $banks = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_KODE_PERKIRAAN @Kode = 1');
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.PelunasanPenjualanCashAdvance', compact('access', 'banks'));
    }

    public function getCustIsiCashAdvanceKencana()
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1 @Kode = ?', [7]);
        return datatables($tabel)->make(true);
    }

    public function getNoPelunasanCashAdvanceKencana($idCustomer)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1 @Kode = ?, @Id_Customer = ?', [6, $idCustomer]);
        return datatables($tabel)->make(true);
    }

    public function getKdPerkiraanKencana()
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_KODE_PERKIRAAN @Kode = ?', [1]);
        return datatables($tabel)->make(true);
    }

    public function LihatHeaderPelunasanCashAdvanceKencana($noPelunasan)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1 @Kode = ?, @Id_Pelunasan = ?', [2, $noPelunasan]);
        return response()->json($tabel);
    }

    public function LihatDetailPelunasanCashAdvanceKencana($noPelunasan)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1 @Kode = ?, @Id_Pelunasan = ?', [3, $noPelunasan]);
        return response()->json($tabel);
    }

    // public function getLihat_PenagihanCashAdvance($no_Pen)
    // {
    //     $noPen = str_replace('.', '/', $no_Pen);
    //     $tabel = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1 @Kode = ?, @Id_Penagihan = ?', [5, $noPen]);
    //     return response()->json($tabel);
    // }

    // public function getLihat_PenagihanCashAdvance2($no_Pen)
    // {
    //     $noPen = str_replace('.', '/', $no_Pen);
    //     $tabel = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1 @Kode = ?, @Id_Penagihan = ?', [4, $noPen]);
    //     return response()->json($tabel);
    // }

    public function getNoPenagihanCashAdvanceKencana($IdCustomer)
    {
        // dd($IdCustomer);
        $tabel = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ1 @Kode = ?, @IdCustomer = ?', [3, $IdCustomer]);
        return datatables($tabel)->make(true);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $noPelunasan = $request->noPelunasan;
        $idCustomer = $request->idCustomer;
        $idBKM = $request->idBKM;
        $sisa = $request->sisa;
        $nilai_Pelunasan = $request->nilai_Pelunasan;

        // $tabelIdDetailPelunasan = $request->tabelIdDetailPelunasan;
        // $tabelIdPenagihan = $request->tabelIdPenagihan;
        // $tabelNilaiPelunasan = $request->tabelNilaiPelunasan;
        // $tabelPelunasanRupiah = $request->tabelPelunasanRupiah;
        // $tabelMataUang = $request->tabelMataUang;
        // $tabelBiaya = $request->tabelBiaya;
        // $tabelLunas = $request->tabelLunas;
        // $tabelPelunasanCurrency = $request->tabelPelunasanCurrency;
        // $tabelKurangLebih = $request->tabelKurangLebih;
        // $tabelKodePerkiraan = $request->tabelKodePerkiraan;
        // $tabelKurs = $request->tabelKurs;
        // $tabelIdDetail = $request->tabelIdDetail;

        $listDataJSON = $request->input('listData');
        // Mendekode JSON menjadi array
        $listData = json_decode($listDataJSON, true);

        if (is_array($listData)) {
            foreach ($listData as $data) {
                $tabelIdDetailPelunasan = $data['tabelIdDetailPelunasan'];
                $noPelunasan = $noPelunasan;
                $tabelIdPenagihan = $data['tabelIdPenagihan'];
                $tabelNilaiPelunasan = $data['tabelNilaiPelunasan'];
                $tabelPelunasanRupiah = $data['tabelPelunasanRupiah'];
                $tabelBiaya = $data['tabelBiaya'];
                $tabelLunas = $data['tabelLunas'];
                $tabelPelunasanCurrency = $data['tabelPelunasanCurrency'];
                $tabelKurangLebih = $data['tabelKurangLebih'];
                $tabelKodePerkiraan = $data['tabelKodePerkiraan'];
                $tabelIdDetail = $data['tabelIdDetail'];
                $tabelMataUang = $data['tabelMataUang'];
                $tabelKurs = $data['tabelKurs'];

                DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN]
                @Kode = ?,
                @Id_Pelunasan = ?,
                @Id_Detail_Pelunasan = ?,
                @Id_Penagihan = ?,
                @Nilai_Pelunasan = ?,
                @Pelunasan_Rupiah = ?,
                @Biaya = ?,
                @Lunas = ?,
                @Pelunasan_Curency = ?,
                @KurangLebih = ?,
                @Kode_Perkiraan = ?,
                @Id_Penagihan_Pembulatan = ?
                ', [
                    5,
                    $tabelIdDetailPelunasan,
                    $noPelunasan,
                    $tabelIdPenagihan,
                    $tabelNilaiPelunasan,
                    $tabelPelunasanRupiah,
                    $tabelBiaya,
                    $tabelLunas,
                    $tabelPelunasanCurrency,
                    $tabelKurangLebih,
                    $tabelKodePerkiraan,
                    $tabelIdDetail
                ]);

                DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN]
                @Kode = ?,
                @Id_Pelunasan = ?,
                @SaldoPelunasan = ?,
                @Nilai_Pelunasan = ?
                ', [
                    6,
                    $tabelIdDetailPelunasan,
                    $sisa,
                    $tabelNilaiPelunasan
                ]);
            }
        } else {
            return redirect()->back()->with('success', 'Data listData tidak valid');
        }
        // dd($listData);
        return redirect()->back()->with('success', 'Sudah TerSimpan');
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        $user = Auth::user()->NomorUser;

        if ($id === 'getUser') {
            return response()->json($user);
        }

        // penagihan
        if ($id === 'getPenagihan') {
            $IdCustomer = $request->input('IdCustomer');
            // dd($IdCustomer);
            $tabel = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_PENAGIHAN_SJ1 @Kode = ?, @IdCustomer = ?', [3, $IdCustomer]);
            return datatables($tabel)->make(true);
        }

        // lihat penaghihan
        else if ($id === 'lihatPenagihan') {
            $Id_Penagihan = $request->input('Id_Penagihan');

            $tabel = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1 @Kode = ?, @Id_Penagihan = ?', [5, $Id_Penagihan]);
            return response()->json($tabel);
        }

        // lihat penaghihan2
        else if ($id === 'lihatPenagihan2') {
            $Id_Penagihan = $request->input('Id_Penagihan');
            // dd($Id_Penagihan);
            $tabel = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1 @Kode = ?, @Id_Penagihan = ?', [4, $Id_Penagihan]);
            return response()->json($tabel);
        }

        // kd perk
        else if ($id === 'getKdPerkiraan') {
            $tabel = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_KODE_PERKIRAAN @Kode = ?', [1]);
            return datatables($tabel)->make(true);
        } else if ($id === 'Perkiraan') {
            $IdPerkiraan = $request->input('IdPerkiraan');

            $tabel = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_KODEPERKIRAAN @Kode = ?, @IdPerkiraan = ?', [2, $IdPerkiraan]);
            return response()->json($tabel);
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
        if ($id === 'insertHapus') {
            $arrHapus = $request->input('arrHapus');
            $Tid_Pelunasan = $request->input('Tid_Pelunasan');

            // dd($request->all());

            if ($arrHapus) {
                try {
                    foreach ($arrHapus as $item) {
                        $idDetailPelunasan = $item[0]; // Adjust according to your data structure
                        $idPenagihan = $item[1]; // Adjust according to your data structure

                        DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN
                    @Kode = ?,
                    @Id_Pelunasan = ?,
                    @Id_Detail_Pelunasan = ?,
                    @Id_Penagihan = ?', [
                            4, // Kode
                            $Tid_Pelunasan, // Adjust this variable based on your context
                            $idDetailPelunasan,
                            $idPenagihan
                        ]);
                    }
                    return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
                }
            }
        }

        // sp ke 4
        else if ($id === 'insertPeluanasanAkhir') {
            $Id_Pelunasan = $request->input('Id_Pelunasan');
            $SaldoPelunasan = $request->input('SaldoPelunasan');
            $Nilai_Pelunasan = $request->input('Nilai_Pelunasan');
            // dd($request->all());


            try {
                DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN
                    @Kode = ?,
                    @Id_Pelunasan = ?,
                    @SaldoPelunasan = ?,
                    @Nilai_Pelunasan = ?', [
                    6, // Kode
                    $Id_Pelunasan,
                    $SaldoPelunasan, // Adjust this variable based on your context
                    $Nilai_Pelunasan,
                ]);
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // sp ke 2 dan 3
        else if ($id === 'insertIsiTable') {
            $Id_Pelunasan = $request->input('Id_Pelunasan');
            $IdCust = $request->input('IdCust');
            $noBKM = $request->input('noBKM');
            $arrTable = $request->input('arrTable');
            // dd($request->all());

            try {
                foreach ($arrTable as $item) {
                    $Id_Detail_Pelunasan = $item[4] === null ? null : $item[4];
                    $Id_Penagihan = $item[0] === null ? null : $item[0];
                    $Nilai_Pelunasan = $item[1] === null ? 0 : $item[1];
                    $Pelunasan_Rupiah = $item[5] === null ? 0 : $item[5];
                    $Biaya = $item[2];
                    $Lunas = $item[3];
                    $Pelunasan_Curency = $item[1];
                    $KurangLebih = $item[8];
                    $Kode_Perkiraan = $item[9];
                    $Id_Penagihan_Pembulatan = $item[11] === null ? null : $item[11];

                    DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN
                    @Kode = ?,
                    @Id_Pelunasan = ?,
                    @Id_Detail_Pelunasan = ?,
                    @Id_Penagihan = ?,
                    @Pelunasan_Rupiah = ?,
                    @Biaya = ?,
                    @Lunas = ?,
                    @Pelunasan_Curency = ?,
                    @KurangLebih = ?,
                    @Kode_Perkiraan = ?,
                    @Id_Penagihan_Pembulatan = ?', [
                        5, // Kode
                        $Id_Pelunasan, // Adjust this variable based on your context
                        $Id_Detail_Pelunasan,
                        $Id_Penagihan,
                        $Pelunasan_Rupiah,
                        $Biaya,
                        $Lunas,
                        $Pelunasan_Curency,
                        $KurangLebih,
                        $Kode_Perkiraan,
                        $Id_Penagihan_Pembulatan,
                    ]);

                    if ($Id_Penagihan !== '') {
                        $IdMtUang = $item[6];
                        $kreditRp = $item[5];
                        $kreditCur = $item[7];
                        $kurs = $item[10];

                        DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_INSERT_KARTU_PIUTANG
                        @IdPenagihan = ?,
                        @IdCust = ?,
                        @IdMtUang = ?,
                        @kreditRp = ?,
                        @kreditCur = ?,
                        @kurs = ?,
                        @noBKM = ?', [
                            $Id_Penagihan, // Adjust this variable based on your context
                            $IdCust,
                            $IdMtUang,
                            $kreditRp,
                            $kreditCur,
                            $kurs,
                            $noBKM,
                        ]);
                    }
                }
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
