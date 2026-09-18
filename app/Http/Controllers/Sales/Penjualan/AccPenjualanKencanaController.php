<?php

namespace App\Http\Controllers\Sales\Penjualan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class AccPenjualanKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $user = Auth::user()->NomorUser;
        $data = DB::connection('ConnInventory')
            ->table('Tmp_Transaksi as TT')
            ->join('Type as T', 'TT.IdType', '=', 'T.IdType')
            ->join('Subkelompok as SK', 'T.IdSubkelompok_Type', '=', 'SK.IdSubkelompok')
            ->join('Kelompok as K', 'SK.IdKelompok_Subkelompok', '=', 'K.IdKelompok')
            ->join('KelompokUtama as KU', 'K.IdKelompokUtama_Kelompok', '=', 'KU.IdKelompokUtama')
            ->join('Objek as O', 'KU.IdObjek_KelompokUtama', '=', 'O.IdObjek')
            ->join('Divisi as D', 'O.IdDivisi_Objek', '=', 'D.IdDivisi')
            ->join('UserObjek as UO', 'O.IdObjek', '=', 'UO.IdObjek')
            ->join('SATUAN as S1', 'T.UnitPrimer', '=', 'S1.no_satuan')
            ->join('SATUAN as S2', 'T.UnitSekunder', '=', 'S2.no_satuan')
            ->join('SATUAN as S3', 'T.UnitTritier', '=', 'S3.no_satuan')
            ->join('KCN_SALES.dbo.T_DeliveryOrder as DO', 'DO.IdTransTmp', '=', 'TT.IdTransaksi')
            ->join('KCN_SALES.dbo.T_DetailPesanan as DP', 'DP.IDPesanan', '=', 'DO.IDPesanan')
            ->join('KCN_SALES.dbo.T_HeaderPesanan as HP', 'DP.IDSuratPesanan', '=', 'HP.IDSuratPesanan')
            ->join('KCN_SALES.dbo.T_Customer as C', 'HP.IDCust', '=', 'C.IDCust')
            ->whereNull('TT.SaatLog')
            ->where('TT.Status', 0)
            ->where('TT.IdTypeTransaksi', '09')
            ->where('UO.KodeUser', $user)
            ->whereNotNull('DO.TglAccManager')
            ->whereNull('DO.KetBatal')
            ->whereNull('DO.Dikeluarkan')
            ->whereNull('DO.Pengiriman')

            ->select([
                'TT.IdTransaksi',
                'TT.IdType',
                'T.NamaType',
                'T.KodeBarang',
                'TT.JumlahPengeluaranPrimer as Primer',
                'TT.JumlahPengeluaranSekunder as Sekunder',
                'TT.JumlahPengeluaranTritier as Tritier',
                'T.SaldoPrimer',
                'T.SaldoSekunder',
                'T.SaldoTritier',
                'S1.nama_satuan as SatuanPrimer',
                'S2.nama_satuan as SatuanSekunder',
                'S3.nama_satuan as SatuanTritier',
                'D.NamaDivisi',
                'O.NamaObjek',
                'KU.NamaKelompokUtama',
                'K.NamaKelompok',
                'SK.NamaSubKelompok',
                'SK.IdSubKelompok',
                'DO.tanggal as TglDO',
                'DO.MinKirimDO',
                'DO.MaxKirimDO',
                'C.NamaCust',
                'HP.IDSuratPesanan',
                'DP.Satuan as SatuanJual',
            ])

            ->orderBy('TT.IdTransaksi')
            ->get();

        // dd($user, $data);

        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Kencana');

        return view('Sales.Penjualan.AccPenjualanKencana', compact('data', 'access'));
    }

    // public function accPenjualanTampilData($idtransaksi)
    // {
    //     $user = Auth::user()->NomorUser;

    //     $data = DB::connection('ConnInventory')
    //         ->table('Tmp_Transaksi')
    //         ->where('IdTransaksi', $idtransaksi)
    //         ->get();

    //     return response()->json([
    //         'idtransaksi' => $idtransaksi,
    //         'user' => $user,
    //         'jumlah' => $data->count(),
    //         'data' => $data,
    //     ]);
    // }

    public function accPenjualanTampilData($idtransaksi)
    {
        $user = Auth::user()->NomorUser;
        $data = DB::connection('ConnInventory')
            ->table('Tmp_Transaksi as TT')
            ->join('Type as T', 'TT.IdType', '=', 'T.IdType')
            ->join('Subkelompok as SK','T.IdSubkelompok_Type','=','SK.IdSubkelompok')
            ->join('Kelompok as K','SK.IdKelompok_Subkelompok','=','K.IdKelompok')
            ->join('KelompokUtama as KU','K.IdKelompokUtama_Kelompok','=','KU.IdKelompokUtama')
            ->join('Objek as O','KU.IdObjek_KelompokUtama','=','O.IdObjek')
            ->join('Divisi as D','O.IdDivisi_Objek','=','D.IdDivisi')
            ->join('UserObjek as UO','O.IdObjek','=','UO.IdObjek')
            ->join('SATUAN as S1','T.UnitPrimer','=','S1.no_satuan')
            ->join('SATUAN as S2','T.UnitSekunder','=','S2.no_satuan')
            ->join('SATUAN as S3','T.UnitTritier','=','S3.no_satuan')
            ->join(DB::raw('KCN_SALES.dbo.T_DeliveryOrder as DO'),'DO.IdTransTmp','=','TT.IdTransaksi')
            ->join(DB::raw('KCN_SALES.dbo.T_DetailPesanan as DP'),'DP.IDPesanan','=','DO.IDPesanan')
            ->join(DB::raw('KCN_SALES.dbo.T_HeaderPesanan as HP'),'DP.IDSuratPesanan','=','HP.IDSuratPesanan')
            ->join(DB::raw('KCN_SALES.dbo.T_Customer as C'),'HP.IDCust','=','C.IDCust')
            ->whereNull('TT.SaatLog')
            ->where('TT.Status', 0)
            ->where('TT.IdTypeTransaksi', '09')
            ->where('UO.KodeUser', $user)
            ->where('TT.IdTransaksi', $idtransaksi)
            ->select([
                'D.NamaDivisi',
                'O.NamaObjek',
                'KU.NamaKelompokUtama',
                'K.NamaKelompok',
                'SK.NamaSubKelompok',
                'TT.IdTransaksi',
                'TT.IdType',
                'T.NamaType',
                'T.SaldoPrimer',
                'T.SaldoSekunder',
                'T.SaldoTritier',
                'S1.nama_satuan as SatuanPrimer',
                'S2.nama_satuan as SatuanSekunder',
                'S3.nama_satuan as SatuanTritier',
                'DO.tanggal as TglDO',
                'DO.MinKirimDO',
                'DO.MaxKirimDO',
                'C.NamaCust',
                'HP.IDSuratPesanan',
                'DP.Satuan as SatuanJual',
                'SK.IdSubKelompok',
            ])

            ->orderBy('TT.IdTransaksi')
            ->get();

        return response()->json($data);
    }

    public function accPenjualanTampilBarcode($idtype, $kodebarang)
    {
        try {

            $idtype = trim($idtype);
            $kodebarang = trim($kodebarang);

            \Log::info('ACC PENJUALAN KCN - REQUEST BARCODE', [
                'IdType' => $idtype,
                'KodeBarang' => $kodebarang,
            ]);

            $data = DB::connection('ConnInventory')
                ->table('Tmp_Gudang as TG')
                ->join(
                    'Type as T',
                    'TG.IdType',
                    '=',
                    'T.IdType'
                )
                ->leftJoin(
                    'Dispresiasi as D',
                    function ($join) {
                        $join->on('TG.Kode_barang','=','D.Kode_barang');
                        $join->on('TG.NoIndeks','=','D.NoIndeks');
                        $join->on('TG.IdType','=','D.Id_type_tujuan');
                    }
                )

                ->where('TG.typetransaksi', '09')
                ->where('TG.Aktif', 'Y')
                ->where('TG.IdType', $idtype)
                ->where('TG.Kode_barang', $kodebarang)
                ->whereNull('TG.IDDO')
                ->select([
                    'TG.NoIndeks as Expr3',
                    'TG.Kode_barang as Expr2',
                    'TG.Tgl_mutasi',
                    'TG.IdType',
                    'TG.Aktif',
                    'TG.Tgl_proses_dispresiasi',
                    'TG.typetransaksi',
                    'TG.IDDO',
                    'T.IdType as Expr1',
                    'T.NamaType',
                    'T.UraianType',
                    'T.IdSubkelompok_Type',
                    'T.KodeBarang',
                    'T.SaatStockAwal',
                    'T.StockAwalPrimer',
                    'T.TotalPemasukanPrimer',
                    'T.TotalPengeluaranPrimer',
                    'T.SaldoPrimer',
                    'T.UnitPrimer',
                    'T.StockAwalSekunder',
                    'T.TotalPemasukanSekunder',
                    'T.TotalPengeluaranSekunder',
                    'T.SaldoSekunder',
                    'T.UnitSekunder',
                    'T.StockAwalTritier',
                    'T.TotalPemasukanTritier',
                    'T.TotalPengeluaranTritier',
                    'T.SaldoTritier',
                    'T.UnitTritier',
                    'T.PakaiAturanKonversi',
                    'T.KonvSekunderKePrimer',
                    'T.KonvTritierKeSekunder',
                    'T.Nonaktif',
                    'T.posisi',
                    'T.MinimumStock',
                    'T.MaximumStock',
                    'T.SatuanUmum',
                    'T.User_Input',
                    'D.Id_barang',
                    'D.Kode_barang as Expr2_D',
                    'D.NoIndeks as Expr3_D',
                    'D.Id_type_asal',
                    'D.Id_type_tujuan',
                    'D.Qty_Primer',
                    'D.Satuan_Primer',
                    'D.Qty_sekunder',
                    'D.Satuan_sekunder',
                    'D.Qty',
                    'D.Satuan',
                    'D.Actual_price',
                    'D.Currency_price',
                    'D.Exchange_rate',
                    'D.L_Id_matauang',
                    'D.no_bttb',
                    'D.Type_Transaksi',
                    'D.Jumlah_cetak',
                    'D.NoTempTrans',
                    'D.y_idtrans',
                    'D.x_idtrans',
                    'D.Status',
                    'D.Ditembak',
                    'D.Tgl_Tembak_keluar',
                ])

                ->orderBy('TG.Tgl_mutasi')
                ->get();

            \Log::info(
                'ACC PENJUALAN KCN - HASIL BARCODE',
                [
                    'jumlah' => $data->count(),
                    'data' => $data->toArray(),
                ]
            );

            return response()->json($data);

        } catch (\Throwable $e) {
            \Log::error(
                'ACC PENJUALAN KCN - ERROR BARCODE',
                [
                    'IdType' => $idtype ?? null,
                    'KodeBarang' => $kodebarang ?? null,
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ]
            );

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil barcode.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $conn = DB::connection('ConnInventory');

        try {
            $idType = trim((string) $request->id_type);
            $idTransaksi = (int) $request->id_transaksi;
            $user = trim((string) Auth::user()->NomorUser);
            $saldoPrimerDikeluarkan = (float) ($request->saldo_primerDikeluarkan ?? 0);
            $saldoSekunderDikeluarkan = (float) ($request->saldo_sekunderDikeluarkan ?? 0);
            $saldoTritierDikeluarkan = (float) ($request->saldo_tritierDikeluarkan ?? 0);
            $jumlahKonversi = (float) ($request->jumlah_konversi ?? 0);
            $noSP = $request->no_sp;
            $kodeBarang = trim((string) $request->kodebarang);
            $noIndeks = array_filter(
                array_map(
                    'trim',
                    explode(',', (string) $request->noindeks)
                ),
                function ($value) {
                    return $value !== '';
                }
            );

            $penyesuaian = $conn
                ->table('Transaksi')
                ->where('idtype', $idType)
                ->where('IdTypeTransaksi', '06')
                ->whereNull('SaatLog')
                ->exists();

            if ($penyesuaian) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Tidak Bisa DiAcc !!! Karena ada Transaksi Penyesuaian yang belum diACC untuk Type ' .
                        $idType
                    );
            }

            $tmpTransaksi = $conn
                ->table('Tmp_Transaksi')
                ->where('IdTransaksi', $idTransaksi)
                ->first();

            if (!$tmpTransaksi) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Data Tmp_Transaksi tidak ditemukan.'
                    );
            }

            $tmpData = [];
            foreach (get_object_vars($tmpTransaksi) as $key => $value) {
                $tmpData[strtolower($key)] = $value;
            }

            $getTmp = function ($column, $default = null) use ($tmpData) {
                $key = strtolower($column);

                return array_key_exists($key, $tmpData)
                    ? $tmpData[$key]
                    : $default;
            };

            if ((string) $tmpTransaksi->IdType !== $idType) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'IdType transaksi tidak sesuai dengan data Tmp_Transaksi.'
                    );
            }

            $type = $conn
                ->table('Type')
                ->where('IdType', $idType)
                ->lockForUpdate()
                ->first();

            if (!$type) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Data Type ' . $idType . ' tidak ditemukan.'
                    );
            }


            $saldoPrimer =(float) ($type->SaldoPrimer ?? 0);
            $saldoSekunder =(float) ($type->SaldoSekunder ?? 0);
            $saldoTritier =(float) ($type->SaldoTritier ?? 0);
            $pib = $type->PIB ?? null;

            if (($saldoTritier - $saldoTritierDikeluarkan) < 0) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Saldo Tritier tidak mencukupi.'
                    );
            }

            if (($saldoSekunder - $saldoSekunderDikeluarkan) < 0) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Saldo Sekunder tidak mencukupi.'
                    );
            }

            if (($saldoPrimer - $saldoPrimerDikeluarkan) < 0) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Saldo Primer tidak mencukupi.'
                    );
            }

            if (count($noIndeks) === 0) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Tidak ada barcode yang dipilih.'
                    );
            }

            $conn->beginTransaction();

            try {
                $updated = $conn
                    ->table('Tmp_Transaksi')
                    ->where('IdTransaksi', $idTransaksi)
                    ->update([
                        'JumlahPengeluaranPrimer' =>
                            $saldoPrimerDikeluarkan,

                        'JumlahPengeluaranSekunder' =>
                            $saldoSekunderDikeluarkan,

                        'JumlahPengeluaranTritier' =>
                            $saldoTritierDikeluarkan,
                    ]);

                if ($updated === 0) {

                    throw new \Exception(
                        'Gagal update Tmp_Transaksi.'
                    );
                }


                // =====================================================
                // 10. AMBIL COUNTER
                // =====================================================

                $counter = $conn
                    ->table('counter')
                    ->select([
                        'IdTransaksi as idtransaksi',
                        'IdTransaksi_Inv_Bcd_Pjl',
                    ])
                    ->lockForUpdate()
                    ->first();

                if (!$counter) {
                    throw new \Exception(
                        'Data counter tidak ditemukan.'
                    );
                }

                // Karena kita sudah alias-kan menjadi idtransaksi
                $counterBaru = ((int) $counter->idtransaksi) + 1;

                // Bentuk 9 digit
                $idTransaksiInventory = str_pad(
                    (string) $counterBaru,
                    9,
                    '0',
                    STR_PAD_LEFT
                );


                // =====================================================
                // 11. UPDATE COUNTER
                // =====================================================

                $updatedCounter = $conn
                    ->table('counter')
                    ->update([
                        'IdTransaksi' => $counterBaru,
                        'IdTransaksi_Inv_Bcd_Pjl' => $idTransaksiInventory,
                    ]);

                if ($updatedCounter === 0) {
                    throw new \Exception(
                        'Gagal update counter.'
                    );
                }


                // =====================================================
                // 12. HITUNG SALDO BARU
                // =====================================================

                $saldoPrimerBaru =
                    $saldoPrimer -
                    $saldoPrimerDikeluarkan;

                $saldoSekunderBaru =
                    $saldoSekunder -
                    $saldoSekunderDikeluarkan;

                $saldoTritierBaru =
                    $saldoTritier -
                    $saldoTritierDikeluarkan;


                // =====================================================
                // 13. UPDATE SALDO TYPE
                // =====================================================

                $updatedType = $conn
                    ->table('Type')
                    ->where('IdType', $idType)
                    ->update([
                        'SaldoPrimer' =>
                            $saldoPrimerBaru,

                        'SaldoSekunder' =>
                            $saldoSekunderBaru,

                        'SaldoTritier' =>
                            $saldoTritierBaru,
                    ]);

                if ($updatedType === 0) {

                    throw new \Exception(
                        'Gagal update saldo Type.'
                    );
                }


                // =====================================================
                // 14. INSERT TRANSAKSI
                // =====================================================

                $tanggal = now();
                $conn
                    ->table('Transaksi')
                    ->insert([
                        'IdTransaksi' =>$idTransaksiInventory,
                        'IdTypeTransaksi' =>$getTmp('IdTypeTransaksi'),
                        'UraianDetailTransaksi' =>$getTmp('UraianDetailTransaksi'),
                        'IdType' =>$getTmp('IdType'),
                        'IdPenerima' =>$getTmp('IdPenerima'),
                        'IdPemberi' =>$user,
                        'SaatAwalTransaksi' =>$getTmp('SaatAwalTransaksi'),
                        'SaatAkhirTransaksi' =>$tanggal,
                        'SaatLog' =>$tanggal,
                        'KomfirmasiPenerima' =>$getTmp('KomfirmasiPenerima'),
                        'KomfirmasiPemberi' =>$user,
                        'SaatAwalKomfirmasi' =>$getTmp('SaatAwalKomfirmasi'),
                        'SaatAkhirKomfirmasi' =>$tanggal,
                        'JumlahPemasukanPrimer' =>$getTmp('JumlahPemasukanPrimer', 0),
                        'JumlahPemasukanSekunder' =>$getTmp('JumlahPemasukanSekunder', 0),
                        'JumlahPemasukanTritier' =>$getTmp('JumlahPemasukanTritier', 0),
                        'JumlahPengeluaranPrimer' =>$saldoPrimerDikeluarkan,
                        'JumlahPengeluaranSekunder' =>$saldoSekunderDikeluarkan,
                        'JumlahPengeluaranTritier' =>$saldoTritierDikeluarkan,
                        'AsalIdSubKelompok' =>$getTmp('AsalIdSubKelompok'),
                        'TujuanIdSubkelompok' =>$getTmp('TujuanIdSubkelompok'),
                        'SaldoPrimer' =>$saldoPrimerBaru,
                        'SaldoSekunder' =>$saldoSekunderBaru,
                        'SaldoTritier' =>$saldoTritierBaru,
                        'IdSubkontraktor' =>'barcode',
                        'TimeInput' =>$getTmp('TimeInput'),
                        'NoSP' =>$noSP,
                    ]);


                // =====================================================
                // 15. INSERT TRANS_PIB
                // =====================================================

                if (!empty($pib)) {

                    $conn
                        ->table('Trans_PIB')
                        ->insert([
                            'IdTransaksi' =>
                                $idTransaksiInventory,

                            'NoPIB' =>
                                $pib,
                        ]);
                }


                // =====================================================
                // 16. UPDATE STATUS TMP_TRANSAKSI
                // =====================================================

                $updatedTmp = $conn
                    ->table('Tmp_Transaksi')
                    ->where('IdTransaksi', $idTransaksi)
                    ->update([
                        'IdTrans' => $idTransaksiInventory,
                        'Status' => 1,
                    ]);

                if ($updatedTmp === 0) {
                    throw new \Exception(
                        'Gagal update IdTrans dan Status Tmp_Transaksi.'
                    );
                }


                // =====================================================
                // 17. UPDATE DELIVERY ORDER KCN_SALES
                // =====================================================

                $deliveryOrder = DB::connection('ConnKCNSales')
                    ->table('T_DeliveryOrder')
                    ->where('IdtransTmp', $idTransaksi)
                    ->first();

                if (!$deliveryOrder) {
                    throw new \Exception(
                        'T_DeliveryOrder KCN_SALES tidak ditemukan untuk IdtransTmp ' .
                        $idTransaksi
                    );
                }

                $idDO = $deliveryOrder->IDDO
                    ?? $deliveryOrder->IdDO
                    ?? null;


                // =====================================================
                // INSERT DO
                // =====================================================

                DB::connection('ConnKCNSales')->statement(
                    'EXEC dbo.SP_4496_WHS_UDT_QTY_DO ?, ?, ?, ?, ?, ?, ?',
                    [
                        $saldoTritierDikeluarkan !== null
                            ? $saldoPrimerDikeluarkan
                            : 0,

                        $saldoSekunderDikeluarkan,
                        $saldoTritierDikeluarkan,
                        str_pad(
                            (string) $idTransaksiInventory,
                            9,
                            '0',
                            STR_PAD_LEFT
                        ),
                        $idTransaksi,
                        $user,
                        $jumlahKonversi,
                    ]
                );


                // Jika struktur kolom IDDO memang IDDO,
                // gunakan nilai tersebut.

                foreach ($noIndeks as $itemNumber) {
                    $query = $conn
                        ->table('Tmp_Gudang')
                        ->where(
                            'Kode_barang',
                            $kodeBarang
                        )
                        ->where('NoIndeks', (int) $itemNumber)
                        ->where('typetransaksi','09');

                    $updateData = [
                        'Aktif' =>
                            'N',

                        'Tgl_proses_dispresiasi' =>
                            now()->format('Y-m-d'),
                    ];

                    if ($idDO !== null) {

                        $updateData['IDDO'] =
                            $idDO;
                    }

                    $updatedBarcode =
                        $query->update($updateData);

                    if ($updatedBarcode === 0) {

                        throw new \Exception(
                            'Barcode ' .
                            $itemNumber .
                            ' tidak ditemukan di Tmp_Gudang.'
                        );
                    }
                }


                // =====================================================
                // 18. UPDATE DISPRESIASI
                //

                $dispresiasiQuery = $conn
                    ->table('Dispresiasi')
                    ->where(
                        'Id_type_tujuan',
                        $idType
                    )
                    ->whereIn(
                        'NoIndeks',
                        function ($query) use (
                            $conn,
                            $idType,
                            $idDO
                        ) {
                            $query
                                ->from('Tmp_Gudang')
                                ->select('NoIndeks')
                                ->where(
                                    'IdType',
                                    $idType
                                );

                            if ($idDO !== null) {

                                $query->where(
                                    'IDDO',
                                    $idDO
                                );
                            }
                        }
                    );

                $dispresiasiQuery->update([
                    'Type_Transaksi' =>
                        '09',

                    'y_idtrans' =>
                        $idTransaksiInventory,

                    'x_idtrans' =>
                        null,

                    'status' =>
                        'N',

                    'Tgl_Tembak_Keluar' =>
                        now()->format('Y-m-d'),

                    'NoTempTrans' =>
                        null,

                    'no_bttb' =>
                        $noSP,
                ]);


                // =====================================================
                // 19. INSERT DISPRESIASI_KELUAR
                // =====================================================

                $dispresiasiKeluar =
                    $conn
                        ->table('Dispresiasi')
                        ->where(
                            'y_idtrans',
                            $idTransaksiInventory
                        )
                        ->get();

                foreach ($dispresiasiKeluar as $row) {

                    $data =
                        (array) $row;

                    unset($data['id']);

                    $conn
                        ->table('Dispresiasi_keluar')
                        ->insert($data);
                }


                // =====================================================
                // 20. DELETE DISPRESIASI
                // =====================================================

                $conn
                    ->table('Dispresiasi')
                    ->where(
                        'y_idtrans',
                        $idTransaksiInventory
                    )
                    ->delete();


                // =====================================================
                // 21. COMMIT
                // =====================================================

                $conn->commit();

            } catch (\Throwable $e) {
                $conn->rollBack();
                throw $e;
            }


            // =========================================================
            // 22. SUCCESS
            // =========================================================

            $noIndeksAll =
                implode(', ', $noIndeks);

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Barcode Penjualan dengan Kode Barang ' .
                    $kodeBarang .
                    ' dan Nomor Indeks ' .
                    $noIndeksAll .
                    ' Sudah Disetujui !'
                );


        } catch (\Throwable $e) {

            \Log::error(
                'ACC PENJUALAN KCN ERROR',
                [
                    'message' =>
                        $e->getMessage(),

                    'file' =>
                        $e->getFile(),

                    'line' =>
                        $e->getLine(),

                    'idtransaksi' =>
                        $request->id_transaksi,

                    'idtype' =>
                        $request->id_type,

                    'kodebarang' =>
                        $request->kodebarang,

                    'noindeks' =>
                        $request->noindeks,
                ]
            );

            return redirect()
                ->back()
                ->with(
                    'error',
                    'Gagal proses ACC Penjualan: ' .
                    $e->getMessage()
                );
        }
    }



    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update($id)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($kodebarang, $noindeks)
    {
        // dd('masuk destroy');
        // db::connection('ConnIventory')->statement('exec SP_1273_INV_Hapus_Barcode_Tmp_Gudang @kode_barang = ?, @item_number = ?', [$kodebarang, $noindeks]);
        // return redirect()->back()->with('success', 'Kode Barang ' . $kodebarang . 'dengan Nomor Indeks ' . $noindeks . 'Sudah Dihapus!');
    }
}
