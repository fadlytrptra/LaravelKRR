<?php

namespace App\Http\Controllers\Kencana;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Exception;


class TransferBarangController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.TransferBarang.index', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {

    }

    public function show(Request $request, $action)
    {
        \Log::info('TransferBarang SHOW', [
            'action' => $action,
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'request' => $request->all(),
        ]);
        switch ($action) {
            case 'divisi':
                $data = DB::connection('ConnKCNPurchase')->select(
                    "EXEC dbo.SP_7775_PBL_LIST_DIVISI"
                );

                return response()->json([
                    'status' => true,
                    'data' => $data
                ]);

            case 'load':
                // dd($request->all());
                if ($request->filled('kd_div')) {
                    $data = DB::connection('ConnKCNPurchase')->select(
                        "EXEC SP_7775_PBL_SLC_BELUM_TRANSFER
                            @terima_1=?,
                            @terima_2=?,
                            @kd_div_3=?",
                        [
                            $request->tgl_awal,
                            $request->tgl_akhir,
                            $request->kd_div
                        ]
                    );

                } else {
                    $data = DB::connection('ConnKCNPurchase')->select(
                        "EXEC SP_7775_PBL_SLC_BELUM_TRANSFER_ALL
                            @terima_1=?,
                            @terima_2=?",
                        [
                            $request->tgl_awal,
                            $request->tgl_akhir
                        ]
                    );
                }

                return response()->json([
                    'status'=>true,
                    'data'=>$data
                ]);

            case 'detail':
                // dd([
                //     'all_request' => $request->all(),
                //     'kd_barang'   => $request->kd_barang,
                //     'length'      => strlen($request->kd_barang),
                //     'type'        => gettype($request->kd_barang),
                // ]);
                $jumlah = DB::connection('ConnKCNPurchase')->selectOne(
                    "EXEC SP_1273_PBL_HITUNG_TYPE_TRANSFER_BELI
                        @Kd_brg=?",
                    [$request->kd_barang]
                );

                if ($jumlah->jumlah > 1) {
                    $type = DB::connection('ConnKCNPurchase')->select(
                        "EXEC SP_1273_PBL_LIST_TYPE_TRANSFER_BELI
                            @Kd_brg=?",
                        [$request->kd_barang]
                    );

                    return response()->json([
                        'status'   => true,
                        'multiple' => true,
                        'data'     => $type
                    ]);
                }

                $detail = DB::connection('ConnKCNPurchase')->select(
                    "EXEC SP_1273_PBL_LIST_TYPE_TRANSFER_BELI
                        @Kd_brg=?",
                    [$request->kd_barang]
                );

                return response()->json([
                    'status'   => true,
                    'multiple' => false,
                    'data'     => $detail
                ]);

            case 'konversi':
                $data = DB::connection('ConnInventory')->select(
                    "EXEC SP_7775_PBL_CEK_KONVERSI
                        @kd_brg=?,
                        @idtype=?,
                        @idsubkelompok=?",
                    [
                        $request->kd_barang,
                        $request->id_type,
                        $request->id_subkelompok
                    ]
                );

                return response()->json([
                    'status' => true,
                    'data' => $data
                ]);

            default:
                return response()->json([
                    'status'=>false,
                    'message'=>'Action tidak ditemukan'
                ],404);

        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        try {

            // 1. Transfer dari Purchase
            $transfer = DB::connection('ConnKCNPurchase')->select(
                "EXEC SP_7775_PBL_TRANSFER_TMPTRANSAKSI
                    @IdType=?,
                    @MasukPrimer=?,
                    @MasukSekunder=?,
                    @MasukTritier=?,
                    @User_id=?,
                    @SubKel=?,
                    @NoTerima=?,
                    @ket=?,
                    @kd=?,
                    @YTanggal=?,
                    @noPIB=?",
                [
                    $request->id_type,
                    $request->primer,
                    $request->sekunder,
                    $request->tritier,
                    Auth::user()->NomorUser,
                    $request->sub_kelompok,
                    $request->no_terima,
                    'Transfer Barang Dari Divisi Pembelian',
                    1,
                    now(),
                    $request->no_pib ?? null
                ]
            );

            // Ambil Identity dari hasil SP
            if (empty($transfer)) {
                throw new Exception(
                    'NoTempTransaksi tidak diperoleh dari proses transfer.'
                );
            }

            $identity = $transfer[0]->Identity ?? null;

            if ($identity === null) {
                throw new Exception(
                    'Identity tidak diperoleh dari proses transfer.'
                );
            }

            // 2. Hitung quantity
            $qtyTerima = (float) $request->qty;
            $qtyAsli = (float) $request->tritier;

            $satuan = trim($request->satuan ?? '');

            if ($qtyAsli == 0) {
                $qtyAsli = $qtyTerima;
                $satuan = trim($request->satuan_terima ?? '');
            }

            // 3. Hitung harga
            $currencyPrice =
                ((float) $request->hrg_trm * $qtyTerima)
                / $qtyAsli;

            $exchangeRate = (float) $request->exchange_rate;

            $actualPrice =
                $exchangeRate * $currencyPrice;

            // 4. Masukkan ke Inventory
            DB::connection('ConnInventory')->statement(
                "EXEC SP_7775_INV_DISPRESIASI_TEMP
                    @NoTempTrans=?,
                    @KdBarang=?,
                    @IdType=?,
                    @NoBTTB=?,
                    @Quantity=?,
                    @Satuan=?,
                    @ActualPrice=?,
                    @CurrencyPrice=?,
                    @ExchangeRate=?,
                    @IdMataUang=?",
                [
                    $identity,
                    $request->kd_barang,
                    $request->id_type,
                    $request->no_terima,
                    $qtyAsli,
                    $satuan,
                    $actualPrice,
                    $currencyPrice,
                    $exchangeRate,
                    $request->id_mata_uang
                ]
            );

            return response()->json([
                'status' => true,
                'message' => 'Transfer berhasil',
                'identity' => $identity
            ]);

        } catch (Exception $e) {

            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        //
    }
}
