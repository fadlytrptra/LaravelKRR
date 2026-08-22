<?php

namespace App\Http\Controllers\Kencana;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class SuratJalanKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $data = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_KIRIM_BLM_ACC');
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        // dd($data);
        return view('Kencana.SuratJalan.Index', compact('data', 'access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        $jenisPengiriman = DB::connection('ConnKCNSales')
            ->table('T_JnsSuratJalan')
            ->select('NamaJnsSuratJalan', 'IDJnsSuratJalan')
            ->get();

        $customer = DB::connection('ConnKCNSales')
            ->table('T_DeliveryOrder as DO')
            ->join('T_DetailPesanan as DP', 'DO.IDPesanan', '=', 'DP.IDPesanan')
            ->join('T_HeaderPesanan as HP', 'DP.IDSuratPesanan', '=', 'HP.IDSuratPesanan')
            ->join('T_Customer as C', 'HP.IDCust', '=', 'C.IDCust')
            ->whereNotNull('DO.TglAccManager')
            ->whereNull('DO.Pengiriman')
            ->whereNotNull('DO.AccManager')
            ->whereNotNull('DO.Dikeluarkan')
            ->whereNull('DO.KetBatal')
            ->select(
                'C.NamaCust',
                DB::raw("C.IDCust + ' - ' + C.JnsCust AS IdCust")
            )
            ->groupBy(
                'C.NamaCust',
                'C.IDCust',
                'C.JnsCust'
            )
            ->get();

        $expeditor = DB::connection('ConnKCNSales')
            ->table('T_EXPEDITOR')
            ->select('NAMAEXPEDITOR', 'IDEXPEDITOR')
            ->orderBy('NAMAEXPEDITOR')
            ->get();

        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Kencana');

        return view(
            'Kencana.SuratJalan.Create',
            compact(
                'jenisPengiriman',
                'customer',
                'expeditor',
                'access'
            )
        );
    }

    public function getSuratPesanan($customer)
    {
        $suratPesanan = DB::connection('ConnKCNSales')
            ->select(
                'exec SP_4496_SLS_LIST_SP_KIRIM @IdCust = ?',
                [$customer]
            );

        return response()->json($suratPesanan);
    }

    public function getDeliveryOrder($suratPesanan)
    {
        $no_spValue = strstr($suratPesanan, '.')
            ? str_replace('.', '/', $suratPesanan)
            : $suratPesanan;

        $data = DB::connection('ConnKCNSales')
            ->table('T_DeliveryOrder as DO')
            ->join(
                'T_DetailPesanan as DP',
                'DO.IDPesanan',
                '=',
                'DP.IDPesanan'
            )
            ->join(
                DB::raw('INVENTORY.dbo.VW_PRG_1486_SLS_TYPE as T'),
                function ($join) {
                    $join->on(function ($query) {
                        $query->whereRaw('LEN(DP.IDBarang) = 20')
                            ->whereRaw('DP.IDBarang = T.IdType');
                    })
                    ->orOn(function ($query) {
                        $query->whereRaw('LEN(DP.IDBarang) = 9')
                            ->whereRaw('DP.IDBarang = T.KodeBarang')
                            ->whereRaw('DO.IdType = T.IdType');
                    });
                }
            )
            ->whereNotNull('DO.Dikeluarkan')
            ->whereNull('DO.Pengiriman')
            ->where('DP.IDSuratPesanan', $no_spValue)
            ->select(
                'DO.IDDO',
                DB::raw('DO.IdTransTmp AS NoTrans'),
                DB::raw("
                    T.NamaType
                    + ' Qty Primer : ' + CONVERT(varchar(10), DO.QtyPrimer, 0)
                    + '   Qty Sekunder : ' + CONVERT(varchar(10), DO.QtySekunder, 0)
                    + '   Qty Tritier : ' + CONVERT(varchar(10), DO.QtyTritier, 0)
                    + '  Tgl Keluar Gdg : ' + RIGHT(DO.Dikeluarkan, 10)
                    AS Uraian
                ")
            )
            ->orderByDesc('DO.IDDO')
            ->get();

        return response()->json($data);
    }
    public function getNomorSuratJalan(Request $request)
    {
        try {

            $suratJalan = DB::connection('ConnKCNSales')
                ->table('VW_PRG_4496_SLS_T_HEADERPENGIRIMAN as H')
                ->join(
                    'VW_PRG_4496_SLS_T_CUSTOMER as C',
                    'H.IDCust',
                    '=',
                    'C.IDCust'
                )
                ->select([
                    'C.NamaCust',
                    'H.IDPengiriman',
                    'H.IdHeaderKirim',
                ])
                ->whereNull('H.AccMrg')
                ->where('H.JnsIdPengiriman', '<>', 5)
                ->orderBy('C.NamaCust')
                ->orderBy('H.IDPengiriman')
                ->get();

            return response()->json($suratJalan);

        } catch (Exception $ex) {

            return response()->json([
                'error' => 'Gagal mengambil data Surat Jalan.'
            ], 500);
        }
    }

    public function getDetailSuratJalan($idHeaderKirim)
    {
        try {
            $conn = DB::connection('ConnKCNSales');
            $headerPengiriman = $conn
                ->table('T_HeaderPengiriman as H')
                ->select([
                    'H.IdHeaderKirim',
                    'H.JnsIdPengiriman',
                    'H.IDPengiriman',
                    'H.IDExpeditor',
                    'H.IDCust',
                    'H.TrukNopol',
                    'H.Tanggal',
                    'H.Biaya',
                    'H.StatusBiaya',
                    'H.Ket',
                    'H.TanggalActual',
                    'H.NoContainer',
                    'H.NoSeal',
                ])
                ->where('H.IdHeaderKirim', $idHeaderKirim)
                ->first();

            if (!$headerPengiriman) {
                return response()->json([
                    'error' => 'Data Surat Jalan tidak ditemukan.'
                ], 404);
            }

            $detailPengiriman1 = DB::connection('ConnKCNSales')
                ->table('T_DeliveryOrder as DO')
                ->join(
                    'T_DetailPesanan as DP',
                    'DO.IDPesanan',
                    '=',
                    'DP.IDPesanan'
                )
                ->join(
                    'T_DetailPengiriman as DPG',
                    'DO.IDDO',
                    '=',
                    'DPG.IDDO'
                )
                ->join(
                    DB::raw('INVENTORY.dbo.VW_PRG_1486_SLS_TYPE as T'),
                    'DP.IDBarang',
                    '=',
                    'T.IdType'
                )
                ->select([
                    'DPG.IDDetailKirim as IDDetailKirim',
                    'DPG.IDHeaderKirim as IDHeaderKirim',
                    'DPG.IDDO as IDDO',
                    'DPG.IDSuratPesanan as IDSuratPesanan',

                    DB::raw("
                        T.NamaType
                        + '   Qty Primer : '
                        + CONVERT(varchar(10), DO.QtyPrimer)
                        + '   Qty Sekunder : '
                        + CONVERT(varchar(10), DO.QtySekunder)
                        + '   Qty Tritier : '
                        + CONVERT(varchar(10), DO.QtyTritier)
                        + '  Tgl Keluar Gdg : '
                        + RIGHT(DO.Dikeluarkan, 10)
                        AS Uraian
                    ")
                ])
                ->whereRaw('LEN(DP.IDBarang) = 20')
                ->where('DPG.IDHeaderKirim', $idHeaderKirim)
                ->get();

            $customer = $conn
                ->table('T_Customer')
                ->select([
                    'IDCust',
                    'NamaCust',
                    'JnsCust',
                ])
                ->whereNotNull('NamaCust')
                ->where('IsActive', 1)
                ->orderBy('NamaCust')
                ->get()
                ->map(function ($item) {
                    return [
                        'IdCust'   => $item->IDCust . ' - ' . $item->JnsCust,
                        'NamaCust' => $item->NamaCust,
                    ];
                })
                ->values();

            return response()->json([
                [$headerPengiriman],
                $detailPengiriman1,
                $customer
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Gagal mengambil data Surat Jalan.'
            ], 500);
        }
    }


    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $validator = \Validator::make(
            $request->all(),
            [
                'jenis_pengiriman' => 'required',
                'surat_jalan'      => 'required|string|max:10',
                'expeditor'        => 'required',
                'customer'         => 'required',
                'tanggal'          => 'required|date',
                'tanggal_actual'   => 'required|date',
                'barang0'          => 'required|array|min:1',
                'barang3'          => 'required|array|min:1',
            ],
            [
                'jenis_pengiriman.required' => 'Jenis Pengiriman belum dipilih.',
                'surat_jalan.required'      => 'Nomor Surat Jalan belum diisi.',
                'expeditor.required'        => 'Expeditor belum dipilih.',
                'customer.required'         => 'Customer belum dipilih.',
                'tanggal.required'          => 'Tanggal belum diisi.',
                'tanggal_actual.required'   => 'Tanggal Actual belum diisi.',
                'barang0.required'          => 'Belum ada data DO yang dipilih.',
                'barang0.min'               => 'Minimal harus ada 1 data DO.',
                'barang3.required'          => 'Surat Pesanan belum dipilih.',
                'barang3.min'               => 'Minimal harus ada 1 Surat Pesanan.',
            ]
        );

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withInput()
                ->with('validation_error', $validator->errors()->first());
        }

        $Mytype           = 1;
        $JnsIdPengiriman  = $request->jenis_pengiriman;
        $IDPengiriman1    = $request->surat_jalan;
        $IDPengiriman = str_pad((string) $IDPengiriman1, 10, '0', STR_PAD_LEFT);
        $IDExpeditor = $request->expeditor;
        $IdCust      = $request->customer;
        $TrukNopol   = $request->truk_nopol ?? '';
        $Tanggal     = $request->tanggal;
        $Biaya       = $request->biaya ?? 0;
        $StatusBiaya = 'N';
        $Keterangan  = $request->keterangan ?? '';
        $NoContainer = null;
        $NoSeal      = null;
        $TglActual = $request->tanggal_actual;
        $IdDO = $request->barang0 ?? [];
        $IDSuratPesanan = $request->barang3 ?? [];

        if (count($IdDO) != count($IDSuratPesanan)) {
            return redirect()
                ->back()
                ->withInput()
                ->with(
                    'validation_error',
                    'Data DO dan Surat Pesanan tidak sesuai. Silakan periksa kembali.'
                );
        }


        $cekHeader = DB::connection('ConnKCNSales')
            ->table('T_HeaderPengiriman')
            ->where('JnsIdPengiriman', $JnsIdPengiriman)
            ->where('IDPengiriman', $IDPengiriman)
            ->first();

        if ($cekHeader) {
            return redirect()
                ->back()
                ->withInput()
                ->with(
                    'validation_error',
                    'Nomor Surat Jalan ' . $IDPengiriman . ' sudah digunakan. Silakan gunakan nomor Surat Jalan lain.'
                );
        }

        DB::connection('ConnKCNSales')->beginTransaction();
        try {
            $IDHeaderKirim = DB::connection('ConnKCNSales')
                ->table('T_HeaderPengiriman')
                ->insertGetId([
                    'JnsIdPengiriman' => $JnsIdPengiriman,
                    'IDPengiriman'    => $IDPengiriman,
                    'IdExpeditor'     => $IDExpeditor,
                    'IdCust'          => $IdCust,
                    'TrukNopol'       => $TrukNopol,
                    'Tanggal'         => $Tanggal,
                    'Biaya'           => $Biaya,
                    'StatusBiaya'     => $StatusBiaya,
                    'Ket'             => $Keterangan,
                    'TanggalDiTerima' => $Tanggal,
                    'NoContainer'     => $NoContainer,
                    'NoSeal'          => $NoSeal,
                    'TanggalActual'   => $TglActual,
                ]);

            $AccMgr = trim(Auth::user()->NomorUser);

            for ($i = 0; $i < count($IdDO); $i++) {

                $idDO = $IdDO[$i];
                $idSP = $IDSuratPesanan[$i];

                // Cek apakah DO sudah pernah digunakan
                $cekDetail = DB::connection('ConnKCNSales')
                    ->table('T_DetailPengiriman')
                    ->where('IdDO', $idDO)
                    ->first();

                if ($cekDetail) {
                    throw new \Exception(
                        'No. DO ' . $idDO .
                        ' sudah digunakan pada Surat Jalan sebelumnya.'
                    );
                }

                // Gunakan SP agar:
                // 1. Insert T_DetailPengiriman
                // 2. Mengisi T_DeliveryOrder.Pengiriman
                DB::connection('ConnKCNSales')->statement(
                    'EXEC dbo.SP_1273_PRG_MAINT_DETAILPENGIRIMAN
                        @MyType = ?,
                        @IdHeaderKirim = ?,
                        @IdDO = ?,
                        @IDSuratPesanan = ?,
                        @AccMgr = ?',
                    [
                        1,
                        $IDHeaderKirim,
                        $idDO,
                        $idSP,
                        $AccMgr
                    ]
                );
            }

            DB::connection('ConnKCNSales')->commit();

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Surat Jalan ' . $IDPengiriman . ' berhasil dibuat.'
                );

        } catch (\Throwable $e) {
            DB::connection('ConnKCNSales')->rollBack();

            $message = $e->getMessage();

            if (str_contains($message, 'IX_T_DetailPengiriman') || str_contains($message, 'T_DetailPengiriman')) {
                $message = 'Salah satu No. DO sudah digunakan pada Surat Jalan sebelumnya. Silakan periksa kembali data DO yang dipilih.';
            }

            elseif (str_contains($message, 'IX_T_HeaderPengiriman') || str_contains($message, 'T_HeaderPengiriman')) {
                $message = 'Nomor Surat Jalan ' . $IDPengiriman . ' sudah digunakan. Silakan gunakan nomor lain.';
            }

            elseif (
                str_contains($message, 'SQLSTATE') ||
                str_contains($message, 'ODBC Driver') ||
                str_contains($message, '[SQL Server]')
            ) {
                $message = 'Data tidak dapat disimpan karena terjadi kesalahan pada database. Silakan periksa kembali data yang dimasukkan.';
            }


            return redirect()
                ->back()
                ->withInput()
                ->with('validation_error', $message);
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
        $jenisPengiriman = db::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_JENIS_SJ');
        $customer = db::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_CUSTOMER_KIRIM');
        $expeditor = db::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_EXPEDITOR @Kode = ?', [1]);
        $DisplayDataHeader = db::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_HEADER_PENGIRIMAN @IdPengiriman = ?', [$id]);
        // dd($DisplayDataHeader[0]->IdHeaderKirim);
        for ($i = 0; $i < count($DisplayDataHeader); $i++) {
            $IdHeaderKirim = $DisplayDataHeader[$i]->IdHeaderKirim;
            $DisplayDataDetail = db::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_DETAIL_PENGIRIMAN @IDHeaderKirim = ?', [$IdHeaderKirim]);
        }
        // dd($DisplayDataHeader);
        return view('Kencana.SuratJalan.Edit', compact('jenisPengiriman', 'customer', 'expeditor', 'DisplayDataHeader', 'DisplayDataDetail'));
    }

    public function getCustomer($id)
    {
        $customer = db::connection('ConnKCNSales')->select('Select * from T_Customer where IDCust = ?', [$id]);
        return response()->json($customer);
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        try {

            $IdHeaderKirim = $request->id_kirimText ?? $id;

            $JnsIdPengiriman = $request->jenis_pengiriman;

            $IDPengiriman1 = $request->surat_jalan;

            $IDPengiriman = str_pad(
                $IDPengiriman1,
                10,
                '0',
                STR_PAD_LEFT
            );

            $IDExpeditor = $request->expeditor;
            $IdCust = $request->customer;
            $TrukNopol = $request->truk_nopol ?? "";
            $Tanggal = $request->tanggal;
            $Biaya = $request->biaya ?? 0;
            $StatusBiaya = 'N';
            $Keterangan = $request->keterangan ?? "";

            $NoContainer = null;
            $NoSeal = null;

            $TglActual = $request->tanggal_actual;

            $IdDO = $request->barang0 ?? [];
            $IDSuratPesanan = $request->barang3 ?? [];

            $AccMrg = Auth::user()->NomorUser;

            $conn = DB::connection('ConnKCNSales');

            $conn->beginTransaction();

            /*
            |--------------------------------------------------------------------------
            | CEK HEADER
            |--------------------------------------------------------------------------
            */

            $header = $conn
                ->table('T_HeaderPengiriman')
                ->where('IDHeaderKirim', $IdHeaderKirim)
                ->first();

            if (!$header) {

                $conn->rollBack();

                return redirect()
                    ->back()
                    ->withInput()
                    ->with(
                        'error',
                        'Data Surat Jalan tidak ditemukan.'
                    );
            }


            /*
            |--------------------------------------------------------------------------
            | UPDATE HEADER
            | Pengganti SP_1486_SLS_MAINT_HEADERPENGIRIMAN @MyType = 2
            |--------------------------------------------------------------------------
            */

            $conn
                ->table('T_HeaderPengiriman')
                ->where('IDHeaderKirim', $IdHeaderKirim)
                ->update([
                    'IDExpeditor'    => $IDExpeditor,
                    'Tanggal'        => $Tanggal,
                    'Biaya'          => $Biaya,
                    'StatusBiaya'    => $StatusBiaya,
                    'TrukNopol'      => $TrukNopol,
                    'Ket'            => $Keterangan,
                    'JnsIdPengiriman'=> $JnsIdPengiriman,
                    'NoContainer'    => $NoContainer,
                    'NoSeal'         => $NoSeal,
                    'TanggalActual'  => $TglActual,
                ]);


            /*
            |--------------------------------------------------------------------------
            | UPDATE DETAIL
            |--------------------------------------------------------------------------
            */

            for ($i = 0; $i < count($IdDO); $i++) {

                /*
                * Sama seperti kode lama:
                *
                * if ($request->barang2[$i])
                */

                if (!empty($request->barang2[$i])) {

                    $conn
                        ->table('T_DetailPengiriman')
                        ->where('IDDetailKirim', $request->barang2[$i])
                        ->where('IDHeaderKirim', $IdHeaderKirim)
                        ->update([
                            'IDDO'           => $IdDO[$i],
                            'IDSuratPesanan' => $IDSuratPesanan[$i],
                        ]);
                }
            }


            /*
            |--------------------------------------------------------------------------
            | COMMIT
            |--------------------------------------------------------------------------
            */

            $conn->commit();


            return redirect()
                ->back()
                ->with(
                    'success',
                    'Surat Jalan ' . $IDPengiriman . ' Sudah Dikoreksi!'
                );

        } catch (\Throwable $e) {

            if (isset($conn) && $conn->transactionLevel() > 0) {
                $conn->rollBack();
            }

            return redirect()
                ->back()
                ->withInput()
                ->with(
                    'error',
                    'Gagal mengoreksi Surat Jalan: ' . $e->getMessage()
                );
        }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        // dd($id);
        db::connection('ConnKCNSales')->statement('exec SP_1486_SLS_DEL_PENGIRIMAN @Mytype = ?, @IDHeaderKirim = ?', [1, $id]);
        return redirect()->back()->with('success', 'Surat Jalan ' . $id . ' Sudah Dihapus!');
    }
}
