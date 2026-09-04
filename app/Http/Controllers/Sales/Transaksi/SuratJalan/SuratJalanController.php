<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratJalan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class SuratJalanController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $data = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_KIRIM_BLM_ACC');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        // dd($data);
        return view('Sales.Transaksi.SuratJalan.Index', compact('data', 'access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        $jenisPengiriman = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JENIS_SJ');
        $customer = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_CUSTOMER_KIRIM');
        $expeditor = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_EXPEDITOR @Kode = ?', [1]);
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        // dd($customer);
        return view('Sales.Transaksi.SuratJalan.Create', compact('jenisPengiriman', 'customer', 'expeditor', 'access'));
    }

    public function getSuratPesanan($customer)
    {
        $suratPesanan = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_KIRIM @IdCust = ?', [$customer]);
        return response()->json($suratPesanan);
    }

    public function getDeliveryOrder($suratPesanan)
    {
        if (strstr($suratPesanan, '.')) { //ekspor
            $no_spValue = str_replace('.', '/', $suratPesanan);
            $deliveryOrder = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_DO_KIRIM @IdSP = ?', [$no_spValue]);
        } else { //lokal
            $no_spValue = $suratPesanan;
            $deliveryOrder = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_DO_KIRIM @IdSP = ?', [$no_spValue]);
        }
        return response()->json($deliveryOrder);
    }
    public function getNomorSuratJalan(Request $request)
    {
        $suratJalan = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_KIRIM_BLM_ACC');
        return response()->json($suratJalan);
    }

    function getDetailSuratJalan($id)
    {
        $headerPengiriman = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_HEADER_PENGIRIMAN @IdPengiriman = ?', [$id]);
        $detailPengiriman = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_DETAIL_PENGIRIMAN @IDHeaderKirim = ?', [$headerPengiriman[0]->IdHeaderKirim]);
        $customer = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_CUSTOMER_KIRIM');
        $data = [$headerPengiriman, $detailPengiriman, $customer];
        return response()->json($data);
    }
    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $request->validate([
            'surat_jalan' => 'required|string|max:10',
        ]);

        $Mytype = 1;
        $JnsIdPengiriman = $request->jenis_pengiriman;
        $IDPengiriman1 = $request->surat_jalan;
        $IDPengiriman = str_pad($IDPengiriman1, 10, '0', STR_PAD_LEFT);
        $IDExpeditor = $request->expeditor;
        $IdCust = $request->customer;
        $TrukNopol = $request->truk_nopol ?? "";
        $Tanggal = $request->tanggal;
        $Biaya = $request->biaya ?? 0;
        $StatusBiaya = 'N';
        $Keterangan = $request->keterangan ?? "";
        $NoContainer = NULL;
        $NoSeal = NULL;
        $TglActual = $request->tanggal_actual;
        $IdDO = $request->barang0;
        $IDSuratPesanan = $request->barang3;

        // User login
        $UserInput = Auth::user()->NomorUser;
        $AccMgr = $UserInput;

        // =========================
        // SAVE HEADER
        // =========================
        DB::connection('ConnSales')->statement(
            'exec SP_1486_SLS_MAINT_HEADERPENGIRIMAN
                @Mytype = ?,
                @JnsIdPengiriman = ?,
                @IDPengiriman = ?,
                @IDExpeditor = ?,
                @IdCust = ?,
                @TrukNopol = ?,
                @Tanggal = ?,
                @Biaya = ?,
                @StatusBiaya = ?,
                @Keterangan = ?,
                @NoContainer = ?,
                @NoSeal = ?,
                @TglActual = ?',
            [
                $Mytype,
                $JnsIdPengiriman,
                $IDPengiriman,
                $IDExpeditor,
                $IdCust,
                $TrukNopol,
                $Tanggal,
                $Biaya,
                $StatusBiaya,
                $Keterangan,
                $NoContainer,
                $NoSeal,
                $TglActual
            ]
        );

        // =========================
        // CARI HEADER YANG BARU DIBUAT
        // =========================
        $IDHeaderKirim = DB::connection('ConnSales')->select(
            'SELECT IdHeaderKirim
            FROM T_HeaderPengiriman
            WHERE JnsIdPengiriman = ?
            AND IDPengiriman = ?',
            [
                $JnsIdPengiriman,
                $IDPengiriman
            ]
        );

        if (empty($IDHeaderKirim)) {
            return redirect()->back()
                ->with('error', 'Header Surat Jalan tidak ditemukan.');
        }

        // Ambil nilai ID saja
        $IdHeaderKirim = $IDHeaderKirim[0]->IdHeaderKirim;

        // =========================
        // SIMPAN USER INPUT
        // =========================
        DB::connection('ConnSales')
            ->table('T_HeaderPengiriman')
            ->where('IdHeaderKirim', $IdHeaderKirim)
            ->update([
                'UserInput' => $UserInput
            ]);

        // =========================
        // SAVE DETAIL
        // =========================
        for ($i = 0; $i < count($request->barang0); $i++) {

            DB::connection('ConnSales')->statement(
                'exec SP_1486_SLS_MAINT_DETAILPENGIRIMAN
                    @Mytype = ?,
                    @IDHeaderKirim = ?,
                    @IdDO = ?,
                    @IDSuratPesanan = ?,
                    @AccMgr = ?',
                [
                    $Mytype,
                    $IdHeaderKirim,
                    $IdDO[$i],
                    $IDSuratPesanan[$i],
                    $AccMgr
                ]
            );
        }

        return redirect()->back()
            ->with('success', 'Surat Jalan Sudah Dibuat!');
    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        $jenisPengiriman = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JENIS_SJ');
        $customer = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_CUSTOMER_KIRIM');
        $expeditor = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_EXPEDITOR @Kode = ?', [1]);
        $DisplayDataHeader = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_HEADER_PENGIRIMAN @IdPengiriman = ?', [$id]);
        // dd($DisplayDataHeader[0]->IdHeaderKirim);
        for ($i = 0; $i < count($DisplayDataHeader); $i++) {
            $IdHeaderKirim = $DisplayDataHeader[$i]->IdHeaderKirim;
            $DisplayDataDetail = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_DETAIL_PENGIRIMAN @IDHeaderKirim = ?', [$IdHeaderKirim]);
        }
        // dd($DisplayDataHeader);
        return view('Sales.Transaksi.SuratJalan.Edit', compact('jenisPengiriman', 'customer', 'expeditor', 'DisplayDataHeader', 'DisplayDataDetail'));
    }

    public function getCustomer($id)
    {
        $customer = db::connection('ConnSales')->select('Select * from T_Customer where IDCust = ?', [$id]);
        return response()->json($customer);
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        // dd($request->all(), $request->barang3[0]);
        $Mytype = 2;
        $IdHeaderKirim = $request->id_kirimText;
        $JnsIdPengiriman = $request->jenis_pengiriman;
        $IDPengiriman1 = $request->surat_jalan;
        $IDPengiriman = str_pad($IDPengiriman1, 10, '0', STR_PAD_LEFT);
        // dd($IDPengiriman);
        $IDExpeditor = $request->expeditor;
        $IdCust = $request->customer;
        $TrukNopol = $request->truk_nopol ?? "";
        $Tanggal = $request->tanggal;
        $Biaya = $request->biaya;
        $StatusBiaya = 'N';
        $Keterangan = $request->keterangan ?? "";
        $NoContainer = NULL;
        $NoSeal = NULL;
        $TglActual = $request->tanggal_actual;
        $IdDO = $request->barang0;
        $IDSuratPesanan = $request->barang3;
        $AccMgr = Auth::user()->NomorUser;
        //save data header duluu

        db::connection('ConnSales')->statement(
            'exec SP_1486_SLS_MAINT_HEADERPENGIRIMAN
            @Mytype = ?,
            @IdHeaderKirim = ?,
            @JnsIdPengiriman = ?,
            @IDPengiriman = ?,
            @IDExpeditor = ?,
            @IdCust = ?,
            @TrukNopol = ?,
            @Tanggal = ?,
            @Biaya = ?,
            @StatusBiaya = ?,
            @Keterangan = ?,
            @NoContainer = ?,
            @NoSeal = ?,
            @TglActual = ?',
            [
                $Mytype,
                $IdHeaderKirim,
                $JnsIdPengiriman,
                $IDPengiriman,
                $IDExpeditor,
                $IdCust,
                $TrukNopol,
                $Tanggal,
                $Biaya,
                $StatusBiaya,
                $Keterangan,
                $NoContainer,
                $NoSeal,
                $TglActual
            ],
        );

        //save data detail duluu

        for ($i = 0; $i < count($request->barang0); $i++) {
            if ($request->barang2[$i]) {
                db::connection('ConnSales')->statement(
                    'exec SP_1486_SLS_MAINT_DETAILPENGIRIMAN @Mytype = ?,
                @IDHeaderKirim = ?,
                @IdDO = ?,
                @IDSuratPesanan = ?,
                @AccMgr = ?',
                    [
                        $Mytype,
                        $IdHeaderKirim,
                        $IdDO[$i],
                        $IDSuratPesanan[$i],
                        $AccMgr
                    ],
                );
            }
        }
        return redirect()->back()->with('success', 'Surat Jalan ' . $IDPengiriman . ' Sudah Dikoreksi!');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        // dd($id);
        db::connection('ConnSales')->statement('exec SP_1486_SLS_DEL_PENGIRIMAN @Mytype = ?, @IDHeaderKirim = ?', [1, $id]);
        return redirect()->back()->with('success', 'Surat Jalan ' . $id . ' Sudah Dihapus!');
    }
}
