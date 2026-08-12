<?php

namespace App\Http\Controllers\Kencana;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Exception;


class BttbPembelianController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.BttbPembelian.index', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $jenisProses = $request->jenisProses;
        $datang = $request->datang;
        $qty = $request->qty;
        $QtyTerima = $request->QtyTerima;
        $SatuanTerima = $request->SatuanTerima;
        $faktur = $request->faktur;
        $no_sup = $request->no_sup;
        $min_ord = $request->min_ord;
        $hrg_trm = $request->hrg_trm;
        $disc_trm = $request->disc_trm;
        $ppn_trm = $request->ppn_trm;
        $waktu = $request->waktu;
        $no_ket = $request->no_ket;
        $ket_trm = $request->ket_trm;
        $no_sppb = $request->no_sppb;
        $no_trans = $request->no_trans;
        $kd_div = $request->kd_div;
        $IdMataUang = $request->IdMataUang;
        $KursBeli = $request->KursBeli;
        $TglFaktur = $request->TglFaktur;
        $NoSJ = $request->NoSJ;
        $hrg_murni = $request->hrg_murni;
        $hrg_murni_rp = $request->hrg_murni_rp;
        $hrg_disc = $request->hrg_disc;
        $hrg_disc_rp = $request->hrg_disc_rp;
        $hrg_nego = $request->hrg_nego;
        $hrg_nego_rp = $request->hrg_nego_rp;
        $hrg_ppn = $request->hrg_ppn;
        $hrg_ppn_rp = $request->hrg_ppn_rp;
        if ($jenisProses == 'isiBTTB') {
            try {
                $Counter = DB::connection('ConnKCNPurchase')->select('exec SP_7775_PBL_LIST_COUNTER');
                $NewCounter = $Counter[0]->YTERIMA + 1;
                $NoTerima = str_pad($NewCounter, 10, "0", STR_PAD_LEFT);

                DB::connection('ConnKCNPurchase')->statement('exec SP_7775_PBL_INSERT_YTERIMA
                @no_terima_1 = ?,
                @datang_2 = ?,
                @qty_3 = ?,
                @QtyTerima = ?,
                @SatuanTerima = ?,
                @faktur_4 = ?,
                @no_sup_5 = ?,
                @min_ord_6 = ?,
                @hrg_trm_7 = ?,
                @disc_trm_8 = ?,
                @ppn_trm_9 = ?,
                @waktu_10 = ?,
                @no_ket_11 = ?,
                @ket_trm_12 = ?,
                @no_sppb_13 = ?,
                @no_trans_14 = ?,
                @kd_div_15 = ?,
                @IdMataUang = ?,
                @Kurs = ?,
                @TglFaktur = ?,
                @NoSJ = ?,
                @hrg_murni = ?,
                @hrg_murni_rp = ?,
                @hrg_disc = ?,
                @hrg_disc_rp = ?,
                @hrg_nego = ?,
                @hrg_nego_rp = ?,
                @hrg_ppn = ?,
                @hrg_ppn_rp = ?',
                    [
                        $NoTerima,
                        $datang,
                        $qty,
                        $QtyTerima,
                        $SatuanTerima,
                        $faktur,
                        $no_sup,
                        $min_ord,
                        $hrg_trm,
                        $disc_trm,
                        $ppn_trm,
                        $waktu,
                        $no_ket,
                        $ket_trm,
                        $no_sppb,
                        $no_trans,
                        $kd_div,
                        $IdMataUang,
                        $KursBeli,
                        $TglFaktur,
                        $NoSJ,
                        $hrg_murni,
                        $hrg_murni_rp,
                        $hrg_disc,
                        $hrg_disc_rp,
                        $hrg_nego,
                        $hrg_nego_rp,
                        $hrg_ppn,
                        $hrg_ppn_rp,
                    ]
                );

                DB::connection('ConnKCNPurchase')->statement('exec SP_7775_PBL_UPDATE_COUNTER_TERIMA
                @yterima_1 = ?', [
                    intval($NewCounter)
                ]);

                return response()->json([
                    'success'  => true,
                    'NoTerima' => $NoTerima,
                ], 200);
            } catch (Exception $e) {
                return response()->json(['error' => true, 'message' => $e->getMessage()], 500);
            }
        } else if ($jenisProses == 'koreksiBTTB') {
            $no_terima = $request->no_terima;

            // dd([
            //     'request' => $request->all(),
            //     'no_terima' => $no_terima,
            //     'no_sup' => $no_sup,
            //     'SatuanTerima' => $SatuanTerima,
            //     'IdMataUang' => $IdMataUang,
            //     'KursBeli' => $KursBeli,
            //     'NoSJ' => $NoSJ,
            // ]);

            DB::connection('ConnKCNPurchase')->statement(
            'EXEC SP_7775_PBL_UPDATE_YTERIMA
                @no_terima_1 = ?,
                @tgl_terima = ?,
                @qty_2 = ?,
                @QtyTerima = ?,
                @SatuanTerima = ?,
                @faktur_3 = ?,
                @hrg_trm_4 = ?,
                @disc_trm_5 = ?,
                @ppn_trm_6 = ?,
                @min_ord_7 = ?,
                @no_sup_8 = ?,
                @waktu_9 = ?,
                @no_ket_10 = ?,
                @ket_trm_11 = ?,
                @IdMataUang = ?,
                @Kurs = ?,
                @TglFaktur = ?,
                @NoSJ = ?,
                @hrg_murni = ?,
                @hrg_murni_rp = ?,
                @hrg_disc = ?,
                @hrg_disc_rp = ?,
                @hrg_nego = ?,
                @hrg_nego_rp = ?,
                @hrg_ppn = ?,
                @hrg_ppn_rp = ?',
            [
                $no_terima,
                $datang,
                $qty,
                $QtyTerima,
                $SatuanTerima,
                $faktur,
                $hrg_trm,
                $disc_trm,
                $ppn_trm,
                $min_ord,
                $no_sup,
                $waktu,
                $no_ket,
                $ket_trm,
                $IdMataUang,
                $KursBeli,
                $TglFaktur,
                $NoSJ,
                $hrg_murni,
                $hrg_murni_rp,
                $hrg_disc,
                $hrg_disc_rp,
                $hrg_nego,
                $hrg_nego_rp,
                $hrg_ppn,
                $hrg_ppn_rp
            ]);

            return response()->json([
                'success' => true
            ]);

        }
    }

    public function show(Request $request, $id)
    {
        try {
            switch ($id) {
                case 'divisi':
                    $data = DB::connection('ConnKCNPurchase')->select('EXEC SP_7775_PBL_LIST_DIVISI');
                    return response()->json([
                        'success' => true,
                        'data' => $data
                    ]);

                case 'nosppb':
                    $data = DB::connection('ConnKCNPurchase')->select('EXEC SP_7775_PBL_SLC_NOMOR_SPPB @KdDivisi = ?', [$request->KdDivisi]);

                    return response()->json([
                        'success' => true,
                        'data' => $data
                    ]);

                case 'barang':
                    $barang = DB::connection('ConnKCNPurchase')->select('EXEC SP_7775_PBL_SLC_DATA_SPPB @KdDivisi = ?, @NoSPPB = ?', [$request->KdDivisi,$request->NoSPPB]);

                    return response()->json([
                        'success' => true,
                        'data' => $barang
                    ]);

                case 'terima':
                    // dd($request->NoTrans);
                    $terima = DB::connection('ConnKCNPurchase')->select('EXEC SP_7775_PBL_SLC_TERIMA_BARANG @NoTrans = ?',[$request->NoTrans]);

                    return response()->json([
                        'success' => true,
                        'data' => $terima
                    ]);

                case 'supplier':
                    $supplier = DB::connection('ConnKCNPurchase')->select('EXEC SP_7775_PBL_LIST_SUPPLIER');

                    return response()->json([
                        'success' => true,
                        'data' => $supplier
                    ]);

                case 'matauang':
                    $mataUang = DB::connection('ConnAccounting')->select('EXEC SP_7775_PBL_LIST_MATA_UANG');

                    return response()->json([
                        'success' => true,
                        'data' => $mataUang
                    ]);

                case 'namamatauang':
                    $data = DB::connection('ConnAccounting')->select('EXEC SP_7775_PBL_SLC_NAMA_MATAUANG @IdMataUang = ?', [$request->IdMataUang]);

                    return response()->json([
                        'success' => true,
                        'data' => $data
                    ]);

                case 'satuan':
                    $data = DB::connection('ConnKCNPurchase')->select('EXEC SP_7775_PBL_LIST_SATUAN');

                    return response()->json([
                        'success' => true,
                        'data' => $data
                    ]);

                default:

                    return response()->json([
                        'success' => false,
                        'message' => 'Request tidak dikenal.'
                    ], 404);
            }

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);

        }
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        if ($id == 'UpdateFlag') {
            $no_trans_1 = $request->no_trans_1;
            $sFlag = $request->sFlag;
            try {
                DB::connection('ConnKCNPurchase')->statement('exec SP_1273_PRG_UPDATE_FLAG @no_trans_1 = ?, @sFlag = ?', [$no_trans_1, $sFlag]);
                return response()->json(['success' => true]);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        } else if ($id == 'ProsesKoreksiKurs') {
            $NoSPPB = $request->NoSPPB;
            $Kurs = $request->Kurs;
            $KodeBarang = $request->KodeBarang;
            try {
                DB::connection('ConnKCNPurchase')->statement('exec SP_1273_PRG_UPDATE_HARGA_YTERIMA @Kode = ?, @NoSPPB = ?, @Kurs = ?', [1, $NoSPPB, $Kurs]);
                $ada = DB::connection('ConnSales')->select('exec SP_1273_PRG_LIST_HARGASATUAN @Kode = ?, @KodeBarang = ?', [1, $KodeBarang]);
                if ($ada[0]->Ada > 0) {
                    $qtyJual = DB::connection('ConnKCNPurchase')->select('exec SP_1273_PRG_CEK_QTY_JUAL @Kode = ?, @KodeBarang = ?', [1, $KodeBarang])[0]->QtyJual;
                    $saldoInv = DB::connection('ConnInventory')->select('exec SP_1273_PRG_CEK_SALDO @Kode = ?, @KodeBarang = ?', [1, $KodeBarang])[0]->Saldo;
                    // dd($qtyJual, $saldoInv);
                    if ($qtyJual <> $saldoInv) {
                        return response()->json(['error' => 'Hubungi EDP untuk cek harga satuan qtyJual <> saldoInv']);
                    } else {
                        $qtyTritier = DB::connection('ConnSales')->select('exec SP_1273_PRG_LIST_HARGASATUAN @Kode = ?, @KodeBarang = ?', [2, $KodeBarang])[0]->QtyTritier;
                        $qtyJual2 = DB::connection('ConnSales')->select('exec SP_1273_PRG_CEK_QTY_JUAL @Kode = ?, @KodeBarang = ?', [2, $KodeBarang])[0]->QtyJual2;
                        if ($qtyTritier <> $qtyJual2) {
                            return response()->json(['error' => 'Hubungi EDP untuk cek harga satuan qtyJual2 <> qtyTritier']);
                        } else {
                            $listSales = DB::connection('ConnSales')->select('exec SP_1273_PRG_LIST_HARGASATUAN @Kode = ?, @KodeBarang = ?', [3, $KodeBarang]);
                            $listJual = DB::connection('ConnSales')->select('exec SP_1273_PRG_LIST_SPPB_KURS_TERIMA @Kode = ?, @KodeBarang = ?', [3, $KodeBarang]);
                            for ($i = 0; $i < count($listSales); $i++) {
                                $qtyJual1 = $listSales[$i]->QtyTritier;
                                $totalHargaBeli1 = 0.0;
                                $HargaBeli2 = 0.0;
                                $noPIBBeli = (string) "";
                                for ($j = 0; $j < count($listJual); $j++) {
                                    if ($qtyJual1 > $listJual[$j]->Qty_Jual2) {
                                        $qtyJual3 = $listJual[$j]->Qty_Jual2;
                                        $hargaBeli = $listJual[$j]->Hrg_trm;
                                        $kursBeli = $listJual[$j]->Kurs_Rp;
                                        $totalHargaBeli = $qtyJual3 * $kursBeli * $hargaBeli;
                                        $totalHargaBeli1 += $totalHargaBeli;
                                        $qtyJual1 -= $listJual[$j]->Qty_Jual2;
                                        $noPIBBeli = (string) $noPIBBeli . trim($listJual[$j]->No_PIB_External) . "(" . $qtyJual3 . "), ";
                                        $listJual[$j]->Qty_Jual2 = 0;
                                    } else if ($qtyJual1 < $listJual[$j]->Qty_Jual2) {
                                        $qtyJual3 = $qtyJual1;
                                        $hargaBeli = $listJual[$j]->Hrg_trm;
                                        $kursBeli = $listJual[$j]->Kurs_Rp;
                                        $totalHargaBeli = $qtyJual3 * $kursBeli * $hargaBeli;
                                        $totalHargaBeli1 += $totalHargaBeli;
                                        $noPIBBeli = (string) $noPIBBeli . trim($listJual[$j]->No_PIB_External) . "(" . $qtyJual3 . ")";
                                        $listJual[$j]->Qty_Jual2 -= $qtyJual1;
                                        $qtyJual1 = 0;
                                        break;
                                    } else if ($qtyJual1 == $listJual[$j]->Qty_Jual2) {
                                        $qtyJual3 = $listJual[$j]->Qty_Jual2;
                                        $hargaBeli = $listJual[$j]->Hrg_trm;
                                        $kursBeli = $listJual[$j]->Kurs_Rp;
                                        $totalHargaBeli = $qtyJual3 * $kursBeli * $hargaBeli;
                                        $totalHargaBeli1 += $totalHargaBeli;
                                        $noPIBBeli = (string) $noPIBBeli . trim($listJual[$j]->No_PIB_External) . "(" . $qtyJual3 . ")";
                                        $qtyJual1 = 0;
                                        $listJual[$j]->Qty_Jual2 = 0;
                                        break;
                                    }
                                }
                                $HargaBeli2 = $totalHargaBeli1 / $listSales[$i]->QtyTritier;
                                DB::connection('ConnSales')->statement(
                                    'exec SP_1273_PRG_UDT_PENJUALAN
                                        @IdTrans = ?,
                                        @Harga = ?,
                                        @NoPIBBeli = ?',
                                    [
                                        $listSales[$i]->IdTransTmp,
                                        $HargaBeli2,
                                        $noPIBBeli
                                    ]
                                );
                                for ($j = 0; $j < count($listJual); $j++) {
                                    DB::connection('ConnKCNPurchase')->statement(
                                        'exec SP_1273_PRG_UPDATE_HARGA_YTERIMA
                                        @Kode = ?,
                                        @NoTerima = ?,
                                        @Qty = ?',
                                        [
                                            5,
                                            $listJual[$j]->No_terima,
                                            $listJual[$j]->Qty_Jual2
                                        ]
                                    );
                                }
                            }
                            return response()->json(['success' => (string) 'Proses Koreksi Kurs Selesai.']);
                        }
                    }
                } else {
                    return response()->json(['success' => (string) 'Tidak ada data hargasatuan2 yang 0 menurut kode barang: ' . $KodeBarang]);
                }
                return response()->json(['success' => true]);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }

        }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }

    public function updateFlag(Request $request)
    {
        // dd($request->all());
        DB::connection('ConnKCNPurchase')->statement(
            "EXEC SP_7775_PBL_UPDATE_FLAG
                @no_trans_1 = ?,
                @sFlag = ?",
            [
                $request->no_trans_1,
                $request->sFlag
            ]
        );

        return response()->json([
            'success' => true
        ]);
    }
}
