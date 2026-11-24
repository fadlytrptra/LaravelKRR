<?php

namespace App\Http\Controllers\Kencana\Accounting;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use App\Http\Controllers\HakAksesController;

class MaintenancePelunasanPenjualanKencanaController extends Controller
{
    public function index(Request $request)
    {
        $kdperkiraan = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_KODEPERKIRAAN] @Kode = ?', [1]);
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.MaintenancePelunasanPenjualan', compact('access', 'kdperkiraan'));
    }

    public function getCustIsiKencana()
    {
        $tabel = DB::connection('ConnKCNSales')->select('exec [SP_1273_PRG_LIST_ALL_CUSTOMER] @Kode = ?', [1]);
        return datatables($tabel)->make(true);
    }

    public function getCustKoreksiKencana()
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_CUSTOMER] @Kode = ?', [5]);
        // dd($tabel);
        return datatables($tabel)->make(true);
    }

    public function getJenisPembayaranKencana()
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_TJENISPEMBAYARAN] @Kode = ?', [1]);
        return datatables($tabel)->make(true);
    }

    public function getReferensiBankKencana($idCustomer)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_REFERENSI_BANK] @Kode = ?, @Id_Cust = ?', [4, $idCustomer]);
        // dd($tabel);
        return datatables($tabel)->make(true);
    }

    public function getDataRefBankKencana($idReferensi)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_REFERENSI_BANK] @Kode = ?, @IdReferensi = ?', [2, $idReferensi]);
        return response()->json($tabel);
    }

    public function getListPenagihanSJKencana($idCustomer)
    {
        $tabel =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ1] @Kode = ?, @IdCustomer = ?', [3, $idCustomer]);
        // dd($tabel);
        return response()->json($tabel);
    }

    public function getLihatDetailPelunasanKencana($noPenagihan)
    {
        $noPen = str_replace('.', '/', $noPenagihan);
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1] @Kode = ?, @Id_Penagihan = ?', [4, $noPen]);
        // dd($tabel);

        return response()->json($tabel);
    }

    // public function getListPelunasanTagihan($noPenagihan)
    // {
    //     $noPen = str_replace('.', '/', $noPenagihan);
    //     $tabel =  DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1] @Kode = ?, @Id_Penagihan = ?', [5, $noPen]);
    //     return response()->json($tabel);
    // }

    // public function getKdPerkiraan()
    // {
    //     $tabel = DB::connection('ConnKCNAccounting')->select('exec [Sp_List_KodePerkiraan] @Kode = ?', [1]);
    //     return datatables($tabel)->make(true);
    // }

    public function getListPelunasanKencana($idCustomer)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PELUNASANTAGIHAN] @Kode = ?, @Id_Customer = ?', [1, $idCustomer]);
        // dd($tabel);

        return datatables($tabel)->make(true);
    }

    public function getDataPelunasanTagihanKencana($Id_Pelunasan)
    {
        $IdPelunasan = str_replace('.', '/', $Id_Pelunasan);
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1] @Kode = ?, @Id_Pelunasan = ?', [2, $IdPelunasan]);
        // dd($tabel);
        return response()->json($tabel);
    }

    public function LihatDetailPelunasanKencana($Id_Pelunasan)
    {
        // $IdPelunasan = str_replace('.', '/', $Id_Pelunasan);
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1] @Kode = ?, @Id_Pelunasan = ?', [3, $Id_Pelunasan]);
        // dd($tabel);
        return response()->json($tabel);
    }

    public function getCekReferensiPelunasanKencana($Id_Pelunasan)
    {
        // $IdPelunasan = str_replace('.', '/', $Id_Pelunasan);
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_REFERENSI_BANK] @Kode = ?, @Id_pelunasan = ?', [5, $Id_Pelunasan]);
        // dd($tabel, $Id_Pelunasan);
        return response()->json($tabel);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        // //dd($request->all());
        // $tanggalInput = $request->tanggalInput;
        // $idJenisPembayaran = $request->idJenisPembayaran;
        // $nilaiPiutang = $request->nilaiPiutang;
        // $idMataUang = $request->idMataUang;
        // $buktiPelunasan = $request->buktiPelunasan;
        // $idCustomer = $request->idCustomer;
        // $sisa = $request->sisa;
        // $idReferensi = $request->idReferensi;
        // $statusBayar = $request->statusBayar;
        // $IdPelunasan = $request->IdPelunasan;

        // $tabelIdPenagihan = $request->tabelIdPenagihan;
        // $tabelNilaiPelunasan = $request->tabelNilaiPelunasan;
        // $tabelPelunasanRupiah = $request->tabelPelunasanRupiah;
        // $tabelBiaya = $request->tabelBiaya;
        // $tabelLunas = $request->tabelLunas;
        // $tabelPelunasanCurrency = $request->tabelPelunasanCurrency;
        // $tabelKurangLebih = $request->tabelKurangLebih;
        // $tabelKodePerkiraan = $request->tabelKodePerkiraan;
        // $tabelIdDetail = $request->tabelIdDetail;

        // DB::connection('ConnKCNAccounting')->statement('exec [SP_1486_ACC_MAINT_PELUNASAN_TAGIHAN]
        // @Kode = ?,
        // @Tgl_Pelunasan = ?,
        // @id_Jenis_Bayar = ?,
        // @Nilai_Pelunasan = ?,
        // @Id_MataUang = ?,
        // @No_Bukti = ?,
        // @Status_Penagihan = ?,
        // @Id_Cust = ?,
        // @SaldoPelunasan = ?,
        // @UserInput = ?,
        // @Status_Bayar = ?,
        // @IdReferensi = ?
        // ', [
        //     1,
        //     $tanggalInput,
        //     $idJenisPembayaran,
        //     $nilaiPiutang,
        //     $idMataUang,
        //     $buktiPelunasan,
        //     "Y",
        //     $idCustomer,
        //     $sisa,
        //     1,
        //     $statusBayar,
        //     $idReferensi
        // ]);

        // // Lakukan operasi UPDATE
        // $IdPelunasan = DB::connection('ConnKCNAccounting')->table('T_Referensi_Bank')
        //     ->where('IdReferensi', '=', $idReferensi)
        //     ->value('Id_Pelunasan');

        // //dd($IdPelunasan);
        // DB::connection('ConnKCNAccounting')->statement(
        //     'exec [SP_1486_ACC_MAINT_PELUNASAN_TAGIHAN]
        // @Kode = ?,
        // @Id_Pelunasan = ?,
        // @Id_Penagihan = ?,
        // @Nilai_Pelunasan = ?,
        // @Pelunasan_Rupiah = ?,
        // @Biaya = ?,
        // @Lunas = ?,
        // @Pelunasan_Curency = ?,
        // @KurangLebih = ?,
        // @Kode_Perkiraan = ?,
        // @ID_Penagihan_Pembulatan = ?',
        //     [
        //         2,
        //         $IdPelunasan,
        //         $tabelIdPenagihan,
        //         $tabelNilaiPelunasan,
        //         $tabelPelunasanRupiah,
        //         $tabelBiaya,
        //         $tabelLunas,
        //         $tabelPelunasanCurrency,
        //         $tabelKurangLebih,
        //         $tabelKodePerkiraan,
        //         $tabelIdDetail
        //     ]
        // );

        // return redirect()->back()->with('success', 'Sudah TerSimpan');
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        $user = Auth::user()->NomorUser;
        $idCustomer = $request->input('idCustomer');
        $noPenagihan = $request->input('noPenagihan');
        $noKodePerkiraan = $request->input('noKodePerkiraan');

        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        } else if ($id === 'getMataUang') {
            $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_MATAUANG] @Kode = ?', [1]);
            return datatables($tabel)->make(true);
        } else if ($id === 'getPerkiraan') {
            $idPelunasan = $request->input('idPelunasan');
            $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_KODEPERKIRAAN] @Kode = ?, @IdPerkiraan = ?', [2, $idPelunasan]);
            // dd($tabel);
            return response()->json($tabel);
        } else if ($id === 'getListPenagihanSJ') {
            $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PENAGIHAN_SJ1] @Kode = ?, @IdCustomer = ?', [3, $idCustomer]);
            return response()->json($tabel);
        } else if ($id === 'getLihatDetailPelunasan') {
            $noPen = str_replace('.', '/', $noPenagihan);
            $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1] @Kode = ?, @Id_Penagihan = ?', [4, $noPen]);
            return response()->json($tabel);
        } else if ($id === 'getListPelunasanTagihan') {
            $noPen = str_replace('.', '/', $noPenagihan);
            $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_PELUNASAN_TAGIHAN1] @Kode = ?, @Id_Penagihan = ?', [5, $noPen]);
            // dd($tabel);
            return response()->json($tabel);
        }
         else if ($id === 'getDetailPerkiraan') {
            $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_KODEPERKIRAAN] @Kode = ?, @IdPerkiraan = ?', [2, $noKodePerkiraan]);
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
        $user = Auth::user()->NomorUser;

        $tanggalInput = $request->input('tanggalInput');
        $idJenisPembayaran = $request->input('idJenisPembayaran');
        $nilaiPiutang = $request->input('nilaiPiutang');
        $idMataUang = $request->input('idMataUang');
        $buktiPelunasan = $request->input('buktiPelunasan') === null ? null : $request->input('buktiPelunasan');
        $idCustomer = $request->input('idCustomer');
        $sisa = $request->input('sisa');
        $idReferensi = $request->input('idReferensi') === null ? null : $request->input('idReferensi');
        $statusBayar = $request->input('statusBayar') === null ? null : $request->input('statusBayar');
        $IdPelunasan = $request->input('IdPelunasan');

        $arrTable = $request->input('arrTable');
        // dd($request->all());



        if ($id === 'insertData') {
            try {
                DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN]
                @Kode = ?,
                @Tgl_Pelunasan = ?,
                @id_Jenis_Bayar = ?,
                @Nilai_Pelunasan = ?,
                @Id_MataUang = ?,
                @No_Bukti = ?,
                @Status_Penagihan = ?,
                @Id_Cust = ?,
                @SaldoPelunasan = ?,
                @UserInput = ?,
                @Status_Bayar = ?,
                @IdReferensi = ?
                ', [
                    1,
                    $tanggalInput,
                    $idJenisPembayaran,
                    $nilaiPiutang,
                    $idMataUang,
                    $buktiPelunasan,
                    "Y",
                    $idCustomer,
                    $sisa,
                    $user,
                    $statusBayar,
                    $idReferensi
                ]);

                $lastInsertId = DB::connection('ConnKCNAccounting')->getPdo()->lastInsertId();
                // Lakukan operasi UPDATE
                $IdPelunasan = DB::connection('ConnKCNAccounting')->table('T_Referensi_Bank')
                    ->where('IdReferensi', '=', $idReferensi)
                    ->update(['Id_Pelunasan' => $lastInsertId]);

                // dd($idReferensi, $lastInsertId);


                foreach ($arrTable as $item) {
                    $Id_Detail_Pelunasan = $item[4] === null ? null : $item[4];
                    $Id_Penagihan = $item[0] === null ? null : $item[0];
                    $Nilai_Pelunasan = $item[1] === null ? 0 : $item[1];
                    $Pelunasan_Rupiah = $item[5] === null ? 0 : $item[5];
                    $Biaya = $item[2];
                    $Lunas = $item[3];
                    $Pelunasan_Curency = $item[1];
                    $KurangLebih = $item[8];
                    $Kode_Perkiraan = $item[9] === null ? null : $item[9];
                    $Id_Penagihan_Pembulatan = $item[10] === null ? null : $item[10];

                    DB::connection('ConnKCNAccounting')->statement(
                        'EXEC SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN
                        @Kode = ?,
                        @Id_Pelunasan = ?,
                        @Id_Penagihan = ?,
                        @Nilai_Pelunasan = ?,
                        @Pelunasan_Rupiah = ?,
                        @Biaya = ?,
                        @Lunas = ?,
                        @Pelunasan_Curency = ?,
                        @KurangLebih = ?,
                        @Kode_Perkiraan = ?,
                        @ID_Penagihan_Pembulatan = ?',
                        [
                            2,
                            $lastInsertId,
                            $Id_Penagihan,
                            $Nilai_Pelunasan,
                            $Pelunasan_Rupiah,
                            $Biaya,
                            $Lunas,
                            $Pelunasan_Curency,
                            $KurangLebih,
                            $Kode_Perkiraan,
                            $Id_Penagihan_Pembulatan
                        ]
                    );
                }

                return response()->json([
                    'success' => 'Data sudah diSIMPAN',
                    'Id_Pelunasan' => $lastInsertId
                ], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        } else if ($id === 'updateData') {
            $arrHapus = $request->input('arrHapus');
            $IdPelunasan = $request->input('IdPelunasan');
            // dd($request->all());

            try {
                if ($arrHapus) {
                    foreach ($arrHapus as $item) {
                        $idDetailPelunasan = $item[0];
                        $idPenagihan = $item[1];

                        // dd($item);

                        DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN
                    @Kode = ?,
                    @Id_Pelunasan = ?,
                    @Id_Detail_Pelunasan = ?,
                    @Id_Penagihan = ?', [
                            4, // Kode
                            $IdPelunasan, // Adjust this variable based on your context
                            $idDetailPelunasan,
                            $idPenagihan
                        ]);
                    }
                }

                // dd($request->all());

                // update di T_Detail_Pelunasan_Tagihan
                foreach ($arrTable as $item) {
                    $Id_Detail_Pelunasan = $item[4] === null ? null : $item[4];
                    $Id_Penagihan = $item[0] === null ? null : $item[0];
                    $Nilai_Pelunasan = $item[1] === null ? 0 : $item[1];
                    $Pelunasan_Rupiah = $item[5] === null ? 0 : $item[5];
                    $Biaya = $item[2];
                    $Lunas = $item[3];
                    $Pelunasan_Curency = $item[1];
                    $KurangLebih = $item[8];
                    $Kode_Perkiraan = $item[9] === null ? null : $item[9];
                    $Id_Penagihan_Pembulatan = $item[10] === null ? null : $item[10];

                    DB::connection('ConnKCNAccounting')->statement(
                        'EXEC SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN
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
                        @Kode_Perkiraan = ?',
                        [
                            5,
                            $IdPelunasan,
                            $Id_Detail_Pelunasan,
                            $Id_Penagihan,
                            $Nilai_Pelunasan,
                            $Pelunasan_Rupiah,
                            $Biaya,
                            $Lunas,
                            $Pelunasan_Curency,
                            $KurangLebih,
                            $Kode_Perkiraan,
                        ]
                    );
                }

                // Update di T_Pelunasan_Tagihan
                DB::connection('ConnKCNAccounting')->statement(
                    'exec [SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN]
                @Kode = ?,
                @Id_Pelunasan = ?,
                @Nilai_Pelunasan = ?,
                @Tgl_Pelunasan = ?,
                @id_Jenis_Bayar = ?,
                @No_Bukti = ?,
                @SaldoPelunasan = ?',
                    [
                        3,
                        $IdPelunasan,
                        $nilaiPiutang,
                        $tanggalInput,
                        $idJenisPembayaran,
                        $buktiPelunasan,
                        $sisa
                    ]
                );
                return response()->json(['success' => 'Data sudah Terkoreksi'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diKOREKSI: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request, $id)
    {
        $IdPelunasan = $request->input('IdPelunasan');
        $Batal = $request->input('Batal');
        $Id_Cust = $request->input('Id_Cust');
        $arrTable = $request->input('arrTable');

        if ($id === 'deleteH') {
            try {
                DB::connection('ConnKCNAccounting')->statement(
                    'exec [SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Pelunasan = ?',
                    [
                        9,
                        $IdPelunasan
                    ]
                );
                return response()->json(['success' => 'Data sudah Terhapus'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        } else if ($id === 'deleteB') {
            // dd($request->all());

            try {
                foreach ($arrTable as $item) {
                    $Id_Detail_Pelunasan = $item[4] === null ? null : $item[4];
                    $Id_Penagihan = $item[0] === null ? null : $item[0];

                    DB::connection('ConnKCNAccounting')->statement(
                        'exec [SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Pelunasan = ?, @Id_Detail_Pelunasan = ?',
                        [
                            8,
                            $IdPelunasan,
                            $Id_Detail_Pelunasan
                        ]
                    );

                    DB::connection('ConnKCNAccounting')->statement(
                        'exec [SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Pelunasan = ?, @Id_Detail_Pelunasan = ?, @Id_Penagihan = ?',
                        [
                            4,
                            $IdPelunasan,
                            $Id_Detail_Pelunasan,
                            $Id_Penagihan
                        ]
                    );
                }
                // dd($request->all());

                DB::connection('ConnKCNAccounting')->statement(
                    'exec [SP_1273_PRG_MAINT_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Pelunasan = ?, @Id_Cust = ?, @Batal = ?',
                    [
                        7,
                        $IdPelunasan,
                        $Id_Cust,
                        $Batal
                    ]
                );

                return response()->json(['success' => 'Data sudah Terhapus'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }
    }
}
