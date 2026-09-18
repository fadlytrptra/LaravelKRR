<?php

namespace App\Http\Controllers\Kencana;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class AccPenjualanTanpaBarcodeKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.KeluarBarangUntukPenjualan', compact('access'));
    }

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $user = trim(Auth::user()->NomorUser);

        /*
        |--------------------------------------------------------------------------
        | TAMPIL LIST BARANG
        |--------------------------------------------------------------------------
        */
        if ($id === 'tampilListBarang') {

            $data = $this->getListBarang($user);

            return response()->json($data);
        }

        /*
        |--------------------------------------------------------------------------
        | CEK SESUAI PEMBERI
        |--------------------------------------------------------------------------
        */
        if ($id === 'cekSesuaiPemberi') {

            $idTransaksi = $request->input('idtransaksi');

            $jumlah = $this->cekSesuaiPemberi($idTransaksi);

            return response()->json([
                [
                    'jumlah' => $jumlah
                ]
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | TAMPIL DETAIL BARANG
        |--------------------------------------------------------------------------
        */
        if ($id === 'tampilData') {
            $idTransaksi = $request->input('IDTransaksi');
            $data = $this->getDetailBarang(
                $idTransaksi,
                $user
            );

            return response()->json($data);
        }

        return response()->json([
            'error' => 'Request tidak dikenali.'
        ], 400);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        if ($id !== 'proses') {
            return response()->json([
                'error' => 'Request tidak valid.'
            ], 400);
        }

        $request->validate([
            'IDtransaksi' => 'required|integer',
            'JumlahKeluarPrimer' => 'required|numeric',
            'JumlahKeluarSekunder' => 'required|numeric',
            'JumlahKeluartritier' => 'required|numeric',
            'JumlahKonversi' => 'nullable|numeric',
        ]);

        $idTransaksi = $request->input('IDtransaksi');
        $jumlahPrimer = $request->input('JumlahKeluarPrimer');
        $jumlahSekunder = $request->input('JumlahKeluarSekunder');
        $jumlahTritier = $request->input('JumlahKeluartritier');
        $jumlahKonversi = $request->input('JumlahKonversi', 0);
        $user = trim(Auth::user()->NomorUser);

        // $conn = DB::connection('ConnInventory');

        // $cekUser = $conn->select("
        //     SELECT
        //         SUSER_SNAME() AS LoginName,
        //         USER_NAME() AS DatabaseUser,
        //         DB_NAME() AS DatabaseName
        // ");

        // dd($cekUser);

        try {
            DB::connection('ConnInventory')
                ->transaction(function () use (
                    $idTransaksi,
                    $jumlahPrimer,
                    $jumlahSekunder,
                    $jumlahTritier,
                    $jumlahKonversi,
                    $user
                ) {

                    $conn = DB::connection('ConnInventory');

                    /*
                    |--------------------------------------------------------------------------
                    | 1. AMBIL DATA TMP_TRANSAKSI
                    |--------------------------------------------------------------------------
                    */
                    $tmp = $conn
                        ->table('Tmp_Transaksi')
                        ->where(
                            'IdTransaksi',
                            $idTransaksi
                        )
                        ->lockForUpdate()
                        ->first();

                    if (!$tmp) {
                        throw new \Exception(
                            'Data Tmp_Transaksi tidak ditemukan.'
                        );
                    }

                    /*
                    |--------------------------------------------------------------------------
                    | 2. AMBIL DATA TYPE
                    |--------------------------------------------------------------------------
                    */
                    $type = $conn
                        ->table('Type')
                        ->where(
                            'IdType',
                            $tmp->IdType
                        )
                        ->lockForUpdate()
                        ->first();

                    if (!$type) {
                        throw new \Exception(
                            'Data Type tidak ditemukan.'
                        );
                    }

                    /*
                    |--------------------------------------------------------------------------
                    | 3. CEK SALDO
                    |--------------------------------------------------------------------------
                    |
                    | Sama dengan SP:
                    |
                    | IF ((@STritier - @JumlahKeluarTritier) >= 0)
                    | IF ((@SSekunder - @JumlahKeluarSekunder) >= 0)
                    | IF ((@SPrimer - @JumlahKeluarPrimer) >= 0)
                    |
                    */
                    if (
                        ($type->SaldoTritier - $jumlahTritier) < 0
                    ) {
                        throw new \Exception(
                            'Saldo Tritier tidak mencukupi.'
                        );
                    }

                    if (
                        ($type->SaldoSekunder - $jumlahSekunder) < 0
                    ) {
                        throw new \Exception(
                            'Saldo Sekunder tidak mencukupi.'
                        );
                    }

                    if (
                        ($type->SaldoPrimer - $jumlahPrimer) < 0
                    ) {
                        throw new \Exception(
                            'Saldo Primer tidak mencukupi.'
                        );
                    }

                    /*
                    |--------------------------------------------------------------------------
                    | 4. UPDATE JUMLAH PENGELUARAN TMP_TRANSAKSI
                    |--------------------------------------------------------------------------
                    |
                    | Menggantikan:
                    | SP_1003_INV_Proses_Acc_Jual
                    | bagian:
                    |
                    | update TMP_Transaksi
                    |--------------------------------------------------------------------------
                    */
                    $conn
                        ->table('Tmp_Transaksi')
                        ->where(
                            'IdTransaksi',
                            $idTransaksi
                        )
                        ->update([
                            'JumlahPengeluaranPrimer' =>
                                $jumlahPrimer,

                            'JumlahPengeluaranSekunder' =>
                                $jumlahSekunder,

                            'JumlahPengeluaranTritier' =>
                                $jumlahTritier,
                        ]);

                    /*
                    |--------------------------------------------------------------------------
                    | 5. AMBIL COUNTER
                    |--------------------------------------------------------------------------
                    |
                    | Menggantikan:
                    |
                    | select @a = idtransaksi
                    | from inventory.dbo.counter
                    |--------------------------------------------------------------------------
                    */
                    $counter = $conn
                        ->table('Counter')
                        ->lockForUpdate()
                        ->value('IdTransaksi');

                    if ($counter === null) {
                        throw new \Exception(
                            'Counter transaksi tidak ditemukan.'
                        );
                    }

                    /*
                    |--------------------------------------------------------------------------
                    | 6. COUNTER + 1
                    |--------------------------------------------------------------------------
                    |
                    | Menggantikan:
                    |
                    | select @a = @a + 1
                    | exec SP_1003_INV_Update_IdTransaksi_Counter @a
                    |--------------------------------------------------------------------------
                    */
                    $counter = ((int) $counter) + 1;

                    $conn
                        ->table('Counter')
                        ->update([
                            'IdTransaksi' => $counter
                        ]);

                    /*
                    |--------------------------------------------------------------------------
                    | 7. FORMAT ID TRANSAKSI
                    |--------------------------------------------------------------------------
                    |
                    | Right('000000000' + lTrim(Str(@a)), 9)
                    |--------------------------------------------------------------------------
                    */
                    $yIdTransaksi = str_pad(
                        (string) $counter,
                        9,
                        '0',
                        STR_PAD_LEFT
                    );

                    /*
                    |--------------------------------------------------------------------------
                    | 8. UPDATE SALDO TYPE
                    |--------------------------------------------------------------------------
                    |
                    | Menggantikan:
                    |
                    | SP_1003_INV_Update_SaldoType_Keluar
                    |--------------------------------------------------------------------------
                    */
                    $conn
                        ->table('Type')
                        ->where(
                            'IdType',
                            $tmp->IdType
                        )
                        ->update([

                            'TotalPengeluaranPrimer' =>
                                DB::raw(
                                    'TotalPengeluaranPrimer + ' .
                                    $jumlahPrimer
                                ),

                            'TotalPengeluaranSekunder' =>
                                DB::raw(
                                    'TotalPengeluaranSekunder + ' .
                                    $jumlahSekunder
                                ),

                            'TotalPengeluaranTritier' =>
                                DB::raw(
                                    'TotalPengeluaranTritier + ' .
                                    $jumlahTritier
                                ),

                            'SaldoPrimer' =>
                                DB::raw(
                                    'SaldoPrimer - ' .
                                    $jumlahPrimer
                                ),

                            'SaldoSekunder' =>
                                DB::raw(
                                    'SaldoSekunder - ' .
                                    $jumlahSekunder
                                ),

                            'SaldoTritier' =>
                                DB::raw(
                                    'SaldoTritier - ' .
                                    $jumlahTritier
                                ),
                        ]);

                    /*
                    |--------------------------------------------------------------------------
                    | 9. AMBIL SALDO TERBARU
                    |--------------------------------------------------------------------------
                    |
                    | Sama dengan SELECT output pada
                    | SP_1003_INV_Update_SaldoType_Keluar
                    |--------------------------------------------------------------------------
                    */
                    $saldo = $conn
                        ->table('Type')
                        ->where(
                            'IdType',
                            $tmp->IdType
                        )
                        ->first([
                            'SaldoPrimer',
                            'SaldoSekunder',
                            'SaldoTritier'
                        ]);

                    /*
                    |--------------------------------------------------------------------------
                    | 10. INSERT KE TRANSAKSI
                    |--------------------------------------------------------------------------
                    */
                    $conn
                        ->table('Transaksi')
                        ->insert([
                            'IdTransaksi' =>$yIdTransaksi,
                            'IdTypeTransaksi' =>$tmp->IdTypeTransaksi,
                            'UraianDetailTransaksi' =>$tmp->UraianDetailTransaksi,
                            'IdType' =>$tmp->IdType,
                            'IdPenerima' =>$tmp->IdPenerima,
                            'IdPemberi' =>$user,
                            'SaatAwalTransaksi' =>$tmp->SaatAwalTransaksi,
                            'SaatAkhirTransaksi' =>now(),
                            'SaatLog' =>now(),
                            'KomfirmasiPenerima' =>$tmp->KomfirmasiPenerima,
                            'KomfirmasiPemberi' =>$user,
                            'SaatAwalKomfirmasi' =>$tmp->SaatAwalKomfirmasi,
                            'SaatAkhirKomfirmasi' =>now(),
                            'JumlahPemasukanPrimer' =>$tmp->JumlahPemasukanPrimer,
                            'JumlahPemasukanSekunder' =>$tmp->JumlahPemasukanSekunder,
                            'JumlahPemasukanTritier' =>$tmp->JumlahPemasukanTritier,
                            'JumlahPengeluaranPrimer' =>$jumlahPrimer,
                            'JumlahPengeluaranSekunder' =>$jumlahSekunder,
                            'JumlahPengeluaranTritier' =>$jumlahTritier,
                            'AsalIdSubKelompok' => $tmp->AsalIdSubkelompok,
                            'TujuanIdSubkelompok' =>$tmp->TujuanIdSubkelompok,
                            'SaldoPrimer' =>$saldo->SaldoPrimer,
                            'SaldoSekunder' =>$saldo->SaldoSekunder,
                            'SaldoTritier' =>$saldo->SaldoTritier,
                            'TimeInput' =>$tmp->TimeInput,
                        ]);

                    /*
                    |--------------------------------------------------------------------------
                    | 11. UPDATE STATUS TMP_TRANSAKSI
                    |--------------------------------------------------------------------------
                    |
                    | Menggantikan:
                    |
                    | SP_1003_INV_UPDATE_STATUS_TMPTRANSAKSI
                    |
                    | SP aslinya:
                    |
                    | SET STATUS = 1,
                    |     saatlog = convert(varchar(10),getdate(),101),
                    |     idtrans = @IDTRANSAKSI
                    |--------------------------------------------------------------------------
                    |
                    | CATATAN:
                    | SP asli mengisi IDTRANS dengan @IDTRANSAKSI,
                    | BUKAN @YIdTransaksi.
                    |--------------------------------------------------------------------------
                    */
                    $conn
                        ->table('Tmp_Transaksi')
                        ->where(
                            'IdTransaksi',
                            $idTransaksi
                        )
                        ->update([
                            'Status' => 1,
                            'SaatLog' => now(),
                            'IdTrans' => $idTransaksi,
                        ]);

                    /*
                    |--------------------------------------------------------------------------
                    | 12. UPDATE KCN_SALES
                    |--------------------------------------------------------------------------
                    |
                    | Menggantikan:
                    |
                    | KCN_SALES.dbo.SP_4496_WHS_UDT_QTY_DO
                    |
                    | SP:
                    |
                    | UPDATE KCN_SALES.dbo.T_DeliveryOrder
                    | SET
                    |     QtyPrimer   = @XJumlahKeluarPrimer,
                    |     QtySekunder = @XJumlahKeluarSekunder,
                    |     QtyTritier  = @XJumlahKeluarTritier,
                    |     IdtransInv  = @XIdTransaksi,
                    |     QtyKonversi = @XJumlahKonversi,
                    |     DIKELUARKAN = @PEMBERI + '-' +
                    |                   CONVERT(VARCHAR(10), GETDATE(), 101)
                    | WHERE IdtransTmp = @XIdTransTmp
                    |
                    |--------------------------------------------------------------------------
                    */

                    $conn
                        ->table(
                            DB::raw(
                                'KCN_SALES.dbo.T_DeliveryOrder'
                            )
                        )
                        ->where(
                            'IdtransTmp',
                            $idTransaksi
                        )
                        ->update([

                            'QtyPrimer' =>
                                $jumlahPrimer,

                            'QtySekunder' =>
                                $jumlahSekunder,

                            'QtyTritier' =>
                                $jumlahTritier,

                            'IdtransInv' =>
                                $yIdTransaksi,

                            'QtyKonversi' =>
                                $jumlahKonversi,

                            'DIKELUARKAN' =>
                                DB::raw(
                                    "'" .
                                    str_replace(
                                        "'",
                                        "''",
                                        $user
                                    ) .
                                    "-' + " .
                                    "CONVERT(VARCHAR(10), GETDATE(), 101)"
                                ),
                        ]);

                    /*
                    |--------------------------------------------------------------------------
                    | 13. AMBIL DIVISI DAN OBJEK
                    |--------------------------------------------------------------------------
                    |
                    | Menggantikan SELECT:
                    |
                    | Type
                    | -> Subkelompok
                    | -> Kelompok
                    | -> KelompokUtama
                    | -> Objek
                    | -> Divisi
                    |--------------------------------------------------------------------------
                    */
                    $klasifikasi = $conn
                        ->table('Type as T')
                        ->join(
                            'Subkelompok as SK',
                            'T.IdSubkelompok_Type',
                            '=',
                            'SK.IdSubkelompok'
                        )
                        ->join(
                            'Kelompok as K',
                            'SK.IdKelompok_Subkelompok',
                            '=',
                            'K.IdKelompok'
                        )
                        ->join(
                            'KelompokUtama as KU',
                            'K.IdKelompokUtama_Kelompok',
                            '=',
                            'KU.IdKelompokUtama'
                        )
                        ->join(
                            'Objek as O',
                            'KU.IdObjek_KelompokUtama',
                            '=',
                            'O.IdObjek'
                        )
                        ->join(
                            'Divisi as D',
                            'O.IdDivisi_Objek',
                            '=',
                            'D.IdDivisi'
                        )
                        ->where(
                            'T.IdType',
                            $tmp->IdType
                        )
                        ->first([
                            'D.IdDivisi',
                            'O.IdObjek'
                        ]);

                    /*
                    |--------------------------------------------------------------------------
                    | 14. DISPRESIASI
                    |--------------------------------------------------------------------------
                    |
                    | SP asli:
                    |
                    | IF @Divisi = 'INV'
                    | AND @Objek = '030'
                    | BEGIN
                    |     Exec Sp_Dispresiasi ...
                    | END
                    |
                    | Bagian ini BELUM diganti karena isi
                    | SP_Dispresiasi belum diberikan.
                    |--------------------------------------------------------------------------
                    */

                    if (
                        $klasifikasi &&
                        $klasifikasi->IdDivisi === 'INV' &&
                        $klasifikasi->IdObjek === '030'
                    ) {

                        /*
                         * TODO:
                         * Ganti Sp_Dispresiasi dengan Query Builder
                         * setelah isi SP diberikan.
                         */
                    }
                });

            return response()->json([
                'success' =>
                    'Data sudah terSIMPAN'
            ], 200);

        } catch (\Throwable $e) {

            return response()->json([
                'error' =>
                    'Data gagal terSIMPAN: ' .
                    $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
    }

    /*
    |--------------------------------------------------------------------------
    | QUERY LIST BARANG
    |--------------------------------------------------------------------------
    */
    private function getListBarang($user)
    {
        return DB::connection('ConnInventory')
            ->table('Tmp_Transaksi as TT')

            ->join(
                'Type as T',
                'TT.IdType',
                '=',
                'T.IdType'
            )

            ->join(
                'Subkelompok as SK',
                'T.IdSubkelompok_Type',
                '=',
                'SK.IdSubkelompok'
            )

            ->join(
                'Kelompok as K',
                'SK.IdKelompok_Subkelompok',
                '=',
                'K.IdKelompok'
            )

            ->join(
                'KelompokUtama as KU',
                'K.IdKelompokUtama_Kelompok',
                '=',
                'KU.IdKelompokUtama'
            )

            ->join(
                'Objek as O',
                'KU.IdObjek_KelompokUtama',
                '=',
                'O.IdObjek'
            )

            ->join(
                'Divisi as D',
                'O.IdDivisi_Objek',
                '=',
                'D.IdDivisi'
            )

            ->join(
                'UserObjek as UO',
                'O.IdObjek',
                '=',
                'UO.IdObjek'
            )

            ->leftJoin(
                'SATUAN as S1',
                'T.UnitPrimer',
                '=',
                'S1.no_satuan'
            )

            ->leftJoin(
                'SATUAN as S2',
                'T.UnitSekunder',
                '=',
                'S2.no_satuan'
            )

            ->leftJoin(
                'SATUAN as S3',
                'T.UnitTritier',
                '=',
                'S3.no_satuan'
            )

            /*
            |--------------------------------------------------------------------------
            | KCN_SALES
            |--------------------------------------------------------------------------
            */
            ->join(
                'KCN_SALES.dbo.T_DeliveryOrder as DO',
                'DO.IdTransTmp',
                '=',
                'TT.IdTransaksi'
            )

            ->join(
                'KCN_SALES.dbo.T_DetailPesanan as DP',
                'DP.IDPesanan',
                '=',
                'DO.IDPesanan'
            )

            ->join(
                'KCN_SALES.dbo.T_HeaderPesanan as HP',
                'DP.IDSuratPesanan',
                '=',
                'HP.IDSuratPesanan'
            )

            ->join(
                'KCN_SALES.dbo.T_Customer as C',
                'HP.IDCust',
                '=',
                'C.IDCust'
            )

            /*
            |--------------------------------------------------------------------------
            | SYARAT DATA MUNCUL
            |--------------------------------------------------------------------------
            */
            ->whereNull('TT.SaatLog')
            ->where('TT.Status', 0)
            ->where('TT.IdTypeTransaksi', '09')
            ->where('UO.KodeUser', $user)

            // Sudah ACC Manager
            ->whereNotNull('DO.TglAccManager')

            // Belum dibatalkan
            ->whereNull('DO.KetBatal')

            // Belum dikeluarkan
            ->whereNull('DO.Dikeluarkan')

            // Belum dikirim
            ->whereNull('DO.Pengiriman')

            ->select([
                'TT.IdTransaksi',
                'TT.IdType',

                'T.NamaType',
                'T.KodeBarang',

                DB::raw(
                    'TT.JumlahPengeluaranPrimer as Primer'
                ),

                DB::raw(
                    'TT.JumlahPengeluaranSekunder as Sekunder'
                ),

                DB::raw(
                    'TT.JumlahPengeluaranTritier as Tritier'
                ),

                'T.SaldoPrimer',
                'T.SaldoSekunder',
                'T.SaldoTritier',

                DB::raw(
                    'S1.nama_satuan as SatuanPrimer'
                ),

                DB::raw(
                    'S2.nama_satuan as SatuanSekunder'
                ),

                DB::raw(
                    'S3.nama_satuan as SatuanTritier'
                ),

                'D.NamaDivisi',
                'O.NamaObjek',
                'KU.NamaKelompokUtama',
                'K.NamaKelompok',
                'SK.NamaSubKelompok',
                'SK.IdSubKelompok',

                DB::raw(
                    'DO.tanggal as TglDO'
                ),

                'DO.MinKirimDO',
                'DO.MaxKirimDO',

                'C.NamaCust',

                'HP.IDSuratPesanan',

                DB::raw(
                    'DP.Satuan as SatuanJual'
                ),
            ])

            ->orderBy(
                'TT.IdTransaksi'
            )

            ->get();
    }

    /*
    |--------------------------------------------------------------------------
    | QUERY DETAIL BARANG
    |--------------------------------------------------------------------------
    */
    private function getDetailBarang($idTransaksi, $user)
    {
        return DB::connection('ConnInventory')
            ->table('Tmp_Transaksi as TT')
            ->join(
                'Type as T',
                'TT.IdType',
                '=',
                'T.IdType'
            )
            ->join(
                'Subkelompok as SK',
                'T.IdSubkelompok_Type',
                '=',
                'SK.IdSubkelompok'
            )
            ->join(
                'Kelompok as K',
                'SK.IdKelompok_Subkelompok',
                '=',
                'K.IdKelompok'
            )
            ->join(
                'KelompokUtama as KU',
                'K.IdKelompokUtama_Kelompok',
                '=',
                'KU.IdKelompokUtama'
            )
            ->join(
                'Objek as O',
                'KU.IdObjek_KelompokUtama',
                '=',
                'O.IdObjek'
            )
            ->join(
                'Divisi as D',
                'O.IdDivisi_Objek',
                '=',
                'D.IdDivisi'
            )
            ->join(
                'UserObjek as UO',
                'O.IdObjek',
                '=',
                'UO.IdObjek'
            )
           ->leftJoin(
                'SATUAN as S1',
                'T.UnitPrimer',
                '=',
                'S1.no_satuan'
            )
            ->leftJoin(
                'SATUAN as S2',
                'T.UnitSekunder',
                '=',
                'S2.no_satuan'
            )
            ->leftJoin(
                'SATUAN as S3',
                'T.UnitTritier',
                '=',
                'S3.no_satuan'
            )

            ->join(
                'KCN_SALES.dbo.T_DeliveryOrder as DO',
                'DO.IdTransTmp',
                '=',
                'TT.IdTransaksi'
            )

            ->join(
                'KCN_SALES.dbo.T_DetailPesanan as DP',
                'DP.IDPesanan',
                '=',
                'DO.IDPesanan'
            )

            ->join(
                'KCN_SALES.dbo.T_HeaderPesanan as HP',
                'DP.IDSuratPesanan',
                '=',
                'HP.IDSuratPesanan'
            )

            ->join(
                'KCN_SALES.dbo.T_Customer as C',
                'HP.IDCust',
                '=',
                'C.IDCust'
            )

            /*
            |--------------------------------------------------------------------------
            | SYARAT YANG SAMA DENGAN INDEX
            |--------------------------------------------------------------------------
            */
            ->whereNull('TT.SaatLog')
            ->where('TT.Status', 0)
            ->where('TT.IdTypeTransaksi', '09')
            ->where('UO.KodeUser', $user)

            ->whereNotNull('DO.TglAccManager')
            ->whereNull('DO.KetBatal')
            ->whereNull('DO.Dikeluarkan')
            ->whereNull('DO.Pengiriman')

            ->where(
                'TT.IdTransaksi',
                $idTransaksi
            )

            ->select([
                'TT.IdTransaksi',
                'TT.IdType',

                'T.NamaType',
                'T.KodeBarang',

                DB::raw(
                    'TT.JumlahPengeluaranPrimer as Primer'
                ),

                DB::raw(
                    'TT.JumlahPengeluaranSekunder as Sekunder'
                ),

                DB::raw(
                    'TT.JumlahPengeluaranTritier as Tritier'
                ),

                'T.SaldoPrimer',
                'T.SaldoSekunder',
                'T.SaldoTritier',

                DB::raw(
                    'S1.nama_satuan as SatuanPrimer'
                ),

                DB::raw(
                    'S2.nama_satuan as SatuanSekunder'
                ),

                DB::raw(
                    'S3.nama_satuan as SatuanTritier'
                ),

                'D.NamaDivisi',
                'O.NamaObjek',
                'KU.NamaKelompokUtama',
                'K.NamaKelompok',
                'SK.NamaSubKelompok',
                'SK.IdSubKelompok',

                DB::raw(
                    'DO.tanggal as TglDO'
                ),

                'DO.MinKirimDO',
                'DO.MaxKirimDO',

                'C.NamaCust',

                'HP.IDSuratPesanan',

                DB::raw(
                    'DP.Satuan as SatuanJual'
                ),
            ])

            ->orderBy(
                'TT.IdTransaksi'
            )

            ->get();
    }

    /*
    |--------------------------------------------------------------------------
    | CEK PENYESUAIAN TRANSAKSI
    |--------------------------------------------------------------------------
    */
    private function cekSesuaiPemberi(
        $idTransaksi
    ) {
        $conn = DB::connection('ConnInventory');

        /*
         * Ambil IdType dari Tmp_Transaksi
         */
        $idType = $conn
            ->table('Tmp_Transaksi')
            ->where(
                'IdTransaksi',
                $idTransaksi
            )
            ->value('IdType');

        if (!$idType) {
            return 0;
        }

        $adaTransaksi = $conn
            ->table('Transaksi')
            ->where(
                'IdType',
                $idType
            )
            ->where(
                'IdTypeTransaksi',
                '06'
            )
            ->whereNull(
                'SaatLog'
            )
            ->exists();

        return $adaTransaksi ? 1 : 0;
    }
}
