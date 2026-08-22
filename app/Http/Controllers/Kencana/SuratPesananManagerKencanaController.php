<?php

namespace App\Http\Controllers\Kencana;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class SuratPesananManagerKencanaController extends Controller
{

    //Display a listing of the resource.
    public function index()
    {
        $data = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_HEADER_PESANAN_BLMACC @Kode = ?', [2]);
        $jenis_sp = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SP @Kode = ?', [1]);
        $list_customer = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        $list_sales = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SALES');
        $jenis_bayar = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_JNSBAYAR');
        $jenis_brg = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_JNSBRG');
        $kategori_utama = DB::connection('ConnKCNPurchase')->select('exec SP_1273_PRG_KATEGORI_UTAMA');
        $list_satuan = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SATUAN');
        $list_sp = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SP_BLM_ACC');
        $user = trim(Auth::user()->NomorUser);
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.SuratPesananManager.AccManager', compact('data', 'access', 'jenis_sp', 'list_customer', 'list_sales', 'jenis_bayar', 'jenis_brg', 'kategori_utama', 'list_satuan', 'list_sp', 'user'));
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
    public function show(Request $request, $id)
    {
        // $header_pesanan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC @IDSURATPESANAN = ?, @Kode = ?', [$id, 1]);
        // $detail_pesanan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_DETAIL_SP @IDSURATPESANAN = ?, @Kode = ?', [$id, 5]);
        if ($id == 'Copy') {
            $no_sp = $request->query('no_sp');
            // dd($no_sp);
            $results = DB::connection('ConnKCNSales')->select('exec SP_4384_SLS_MAINTENANCE_SURAT_PESANAN @XKode = ?, @XIdSuratPesanan = ?', [4, $no_sp]);
            // dd($results);

            return response()->json($results);
            // return datatables($response)->make(true);
        } else if ($id == 'CopyDetails') {
            $no_sp = $request->query('no_sp');
            // dd($no_sp);
            $results = DB::connection('ConnKCNSales')->select('exec SP_4384_SLS_MAINTENANCE_SURAT_PESANAN @XKode = ?, @XIdSuratPesanan = ?', [3, $no_sp]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'IDSuratPesanan' => $row->IDSuratPesanan,
                    'IDBarang' => $row->IDBarang,
                    'NamaBarang' => $row->namabarang,
                    'IDJnsBarang' => $row->IDJnsBarang,
                    'NamaJnsBrg' => $row->NamaJnsBrg,
                    'SaldoAwal' => $row->SaldoAwal,
                    'Qty' => $row->Qty,
                    'Satuan' => $row->Satuan,
                    'HargaSatuan' => $row->HargaSatuan,
                    'Discount' => $row->Discount,
                    'UraianPesanan' => $row->UraianPesanan,
                    'TglRencanaKirim' => $row->TglRencanaKirim,
                    'Lunas' => $row->Lunas,
                    'TerKirim' => $row->TerKirim,
                    'PPN' => $row->PPN,
                    'IDPesanan' => $row->IDPesanan,
                    'KodeHS' => $row->KodeHS,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getDetailSP') {

            $no_spValue = $request->no_spValue;

            $results = DB::connection('ConnKCNSales')->select(
                'exec SP_1273_PRG_LIST_DETAIL_PESANAN_BLMACC @Mytype = ?, @IDSuratPesanan = ?',
                [2, $no_spValue]
            );

            // dd($no_spValue, $results);

            if (empty($results)) {
                return response()->json([
                    'error' => 'Data detail Surat Pesanan tidak ditemukan.',
                    'no_sp' => $no_spValue
                ], 404);
            }

            return response()->json([
                'message' => 'Data selected successfully.',
                'data' => $results[0]
            ]);
        }

    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {

    }

    //Update the specified resource in storage.
    public function update($id)
    {
        $idManager = Auth::user()->NomorUser;
        // dd($id);

        // Call the stored procedure
        DB::connection('ConnKCNSales')->statement('exec SP_1486_SLS_ACC_SURATPESANAN @AccManager = ?, @IDSuratPesanan = ?', [$idManager, $id]);

        // Redirect to the index page
        return redirect()->back()->with('success', 'Surat Pesanan Sudah Disetujui!');
        // return redirect()->route('SuratPesananManager.index');
    }

    public function updateAll(Request $request)
    {
        // dd($request->all());
        $nosp = $request->nomorSPs;
        $idManager = trim(Auth::user()->NomorUser);
        for ($i = 0; $i < count($nosp); $i++) {
            DB::connection('ConnKCNSales')->statement('exec SP_1273_PRG_ACC_SURATPESANAN @AccManager = ?, @IDSuratPesanan = ?', [$idManager, $nosp[$i]]);
            DB::connection('ConnKCNSales')
                ->statement('exec SP_1273_PRG_ACC_SURATPESANAN_DIREKTUR @IDSuratPesanan = ?, @AccDir = ?', [
                    $nosp[$i],
                    $idManager
                ]);
        }
        return redirect()->back()->with('success', 'Surat Pesanan yang Dipilih Sudah Disetujui!');
    }
    public function penyesuaian()
    {
        $jenis_sp = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SP @Kode = ?', [1]);
        $list_customer = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        $list_sales = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SALES');
        $jenis_bayar = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_JNSBAYAR');
        $jenis_brg = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
        $kategori_utama = DB::connection('ConnKCNPurchase')->select('exec SP_1273_PRG_KATEGORI_UTAMA');
        $list_satuan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SATUAN');
        // $header_pesanan = DB::connection('sqlsrv2')->select('exec SP_1486_SLS_LIST_SP_SDH_ACC @IDSURATPESANAN = ?, @Kode = ?', [$suratPesanan, 1]);
        // $detail_pesanan = DB::connection('sqlsrv2')->select('exec SP_1486_SLS_LIST_SESUAI_SP @IDSURATPESANAN = ?, @Kode = ?', [$suratPesanan, 2]);
        $data_array = [
            $jenis_sp,
            $list_customer,
            $list_sales,
            $jenis_bayar,
            $jenis_brg,
            $kategori_utama,
            $list_satuan
        ];
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        // dd($data_array);
        return view('Kencana.SuratPesananManager.Penyesuaian', compact('access', 'jenis_sp', 'list_customer', 'list_sales', 'jenis_bayar', 'jenis_brg', 'kategori_utama', 'list_satuan'));
    }

    public function getPenyesuaianSP($suratPesanan)
    {
        // dd($suratPesanan);
        if (strstr($suratPesanan, '.lama.')) {
            $no_spValue = str_replace('.lama.', '', $suratPesanan);
            $header_pesanan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SP_SDH_ACC @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 1]);
            $detail_pesanan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SESUAI_SP @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 2]);
            $data_array = [$header_pesanan, $detail_pesanan];
            return response()->json($data_array);
        }

        $list_sp = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC');
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        if (strstr($suratPesanan, '.')) { //ekspor
            $no_spValue = str_replace('.', '/', $suratPesanan);

            $mata_uang = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_MATAUANG');
            $jenis_harga = DB::connection('ConnKCNSales')->table('T_JenisHargaBarangEksport')->select('*')->get();
            $list_billing = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_BILLING');
            $list_customer = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
            $list_sales = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SALES');
            $jenis_brg = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
            $kelompok_utama = DB::connection('ConnInventory')->select('exec SP_1486_SLS_LIST_TYPEBARANG');
            $list_satuan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SATUAN');
            $jenis_harga = DB::connection('ConnKCNSales')->table('T_JenisHargaBarangEksport')->select('*')->get();
            $header_pesanan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SP_SDH_ACC @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 1]);
            $detail_pesanan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SESUAI_SP @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 3]);
            if (str_contains($header_pesanan[0]->Ket, '|') !== True) {
                $header_pesanan[0]->Ket = ' |  |  |  |  | ';
            }
            // dd($header_pesanan,$detail_pesanan, explode(' | ', $header_pesanan[0]->Ket)[5]);
            return view(
                'Sales.Transaksi.SuratPesanan.PenyesuaianEkspor',
                compact(
                    'access',
                    'mata_uang',
                    'list_customer',
                    'list_sales',
                    'jenis_brg',
                    'kelompok_utama',
                    'list_satuan',
                    'list_sp',
                    'jenis_harga',
                    'list_billing',
                    'header_pesanan',
                    'detail_pesanan',
                    'jenis_harga'
                )
            );
        } else { //lokal
            $no_spValue = $suratPesanan;

            $jenis_sp = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SP @Kode = ?', [1]);
            $list_customer = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
            $list_sales = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SALES');
            $jenis_bayar = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_JNSBAYAR');
            $jenis_brg = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
            $kategori_utama = DB::connection('ConnKCNPurchase')->select('exec SP_1273_PRG_KATEGORI_UTAMA');
            $list_satuan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SATUAN');

            $header_pesanan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SP_SDH_ACC @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 1]);
            $detail_pesanan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SESUAI_SP @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 2]);
            // dd($header_pesanan);
            return view(
                'Sales.Transaksi.SuratPesanan.PenyesuaianLokal',
                compact(
                    'access',
                    'jenis_sp',
                    'list_customer',
                    'list_sales',
                    'jenis_bayar',
                    'jenis_brg',
                    'kategori_utama',
                    'list_satuan',
                    'list_sp',
                    'header_pesanan',
                    'detail_pesanan'
                )
            );
        }
    }

    public function koreksiPenyesuaianSP(Request $request)
    {
        // dd($request->all());
        $UraianPesanan = null;
        $no_spText = $request->no_spText;
        $user = trim(Auth::user()->NomorUser);
        $tgl_pesan = $request->tgl_pesan;
        $jenis_sp = $request->jenis_sp;
        $IdCust = $request->list_customer;
        $no_po = $request->no_po;
        $no_sp = $request->no_spText;
        $tgl_po = $request->tgl_po;
        $no_pi = $request->no_pi;
        $list_sales = $request->list_sales;
        $mata_uang = $request->mata_uang;
        $jenis_bayar = $request->jenis_bayar;
        $syarat_bayar = $request->syarat_bayar ?? 0;
        $faktur_pjk = $request->faktur_pjk ?? null;
        $keterangan = $request->keterangan ?? "";
        $barang0 = $request->barang0; //nama barang
        $KodeBarang = $request->barang1; //kode barang
        $IdJnsBarang = $request->barang33; //jenis barang
        $Qty = $request->barang3; //qty pesan
        $Satuan = $request->barang5; //satuan
        $HargaSatuan = $request->barang2; //harga satuan
        $TglRencanaKirim = $request->barang6; //rencana kirim
        $Lunas = $request->barang7;
        $ppn = $request->barang8; //ppn
        $IdJnsBarang = $request->barang9; //jenis barang
        $id_pesanan = $request->barang10; //idsuratpesanan
        $kode = 2;
        // dd($kode, $no_sp, $jenis_sp, $tgl_pesan, $IdCust, $no_po, $tgl_po, $no_pi, $jenis_bayar, $list_sales, $mata_uang, $syarat_bayar, $user, $keterangan, $faktur_pjk);
        // dd($BeratStandart, $bs2);
        //update header dulu yaa..
        // dd($request->all(), $id_pesanan, $no_sp, $tgl_pesan, $tgl_po);
        $adaDo = DB::connection('ConnKCNSales')->table('T_DeliveryOrder')
            ->where('idpesanan', $id_pesanan)
            ->whereNull('ketBatal')
            ->count();

        $terkirim = DB::connection('ConnKCNSales')->table('T_DetailPesanan')
            ->where('idpesanan', $id_pesanan)
            ->value('terkirim');

        // $inv = DB::connection('ConnKCNSales')->table('T_DetailPengiriman')
        //     ->join('T_DeliveryOrder', 'T_DetailPengiriman.IDDO', '=', 'T_DeliveryOrder.IDDO')
        //     ->join('T_DetailPesanan', 'T_DeliveryOrder.IDPesanan', '=', 'T_DetailPesanan.IDPesanan')
        //     ->where('T_DetailPesanan.IDPesanan', $id_pesanan)
        //     ->groupBy('T_DetailPengiriman.IdPenagihan')
        //     ->havingRaw('COUNT(T_DetailPengiriman.IdPenagihan) IS NOT NULL')
        //     ->count();
        $inv = DB::connection('ConnKCNSales')->table('T_DetailPengiriman')->select('T_DetailPengiriman.IdPenagihan')
            ->join('T_DeliveryOrder', 'T_DetailPengiriman.IDDO', '=', 'T_DeliveryOrder.IDDO')
            ->join('T_DetailPesanan', 'T_DeliveryOrder.IDPesanan', '=', 'T_DetailPesanan.IDPesanan')
            ->where('T_DetailPesanan.IDPesanan', '=', $id_pesanan)
            ->groupBy('T_DetailPengiriman.IdPenagihan')
            ->havingRaw('COUNT(T_DetailPengiriman.IdPenagihan) IS NOT NULL')->get();
        // ->count('IdPenagihan');

        DB::connection('ConnKCNSales')->statement(
            'exec SP_1273_PRG_MAINT_HEADERPESANAN
                    @Kode = ?,
                    @IdSuratPesanan = ?,
                    @IdJnsSuratPesanan = ?,
                    @Tgl_Pesan = ?,
                    @IdCust = ?,
                    @No_PO = ?,
                    @Tgl_PO = ?,
                    @No_PI = ?,
                    @IDPembayaran = ?,
                    @IdBill = ?,
                    @IDSales = ?,
                    @IDMataUang = ?,
                    @SyaratBayar = ?,
                    @User_id = ?,
                    @Ket = ?,
                    @JnsFakturPjk = ?',
            [
                $kode,
                $no_spText,
                $jenis_sp,
                $tgl_pesan,
                $IdCust,
                $no_po,
                $tgl_po,
                $no_pi,
                $jenis_bayar,
                '0000006',
                $list_sales,
                $mata_uang,
                $syarat_bayar,
                $user,
                $keterangan,
                $faktur_pjk
            ],
        );


        // for ($i = 0; $i < count($id_pesanan); $i++) {
        //     // dd($inv->isEmpty(), $adaDo == 0 or $terkirim < 1);
        //     if ($inv->isEmpty() || $inv[0]->IdPenagihan == null) {
        //         // dd('masuk atas',$HargaSatuan);
        //         // if ($adaDo == 0 or (int) $terkirim < 1) {
        //         if ((int) $terkirim < 1) {
        //             if (is_null($id_pesanan[$i])) {
        //                 // dd('hehe1');
        //                 DB::connection('ConnKCNSales')->statement(
        //                     'exec SP_1273_PRG_MAINT_DETAILPESANAN1 @Kode = ?,
        //                             @IDSuratPesanan = ?,
        //                             @KodeBarang = ?,
        //                             @IdJnsBarang = ?,
        //                             @Qty = ?,
        //                             @Satuan = ?,
        //                             @HargaSatuan = ?,
        //                             @Discount = ?,
        //                             @UraianPesanan = ?,
        //                             @TglRencanaKirim = ?,
        //                             @Lunas = ?,
        //                             @PPN = ?',
        //                     [
        //                         1,
        //                         $no_spText,
        //                         $KodeBarang[$i],
        //                         $IdJnsBarang[$i],
        //                         $Qty[$i],
        //                         $Satuan[$i],
        //                         $HargaSatuan[$i],
        //                         0.0,
        //                         $UraianPesanan ?? null,
        //                         $TglRencanaKirim[$i],
        //                         $Lunas ?? null,
        //                         $ppn[$i],
        //                     ],
        //                 );
        //             } else {
        //                 // dd($Lunas[$i]);
        //                 DB::connection('ConnKCNSales')->statement(
        //                     'exec SP_1273_PRG_MAINT_DETAILPESANAN1 @Kode = ?,
        //                             @IdPesanan = ?,
        //                             @KodeBarang = ?,
        //                             @IdJnsBarang = ?,
        //                             @Qty = ?,
        //                             @Satuan = ?,
        //                             @HargaSatuan = ?,
        //                             @Discount = ?,
        //                             @UraianPesanan = ?,
        //                             @TglRencanaKirim = ?,
        //                             @Lunas = ?,
        //                             @PPN = ?',
        //                     [
        //                         $kode,
        //                         $id_pesanan[$i],
        //                         $KodeBarang[$i],
        //                         $IdJnsBarang[$i],
        //                         $Qty[$i],
        //                         $Satuan[$i],
        //                         $HargaSatuan[$i],
        //                         0.0,
        //                         $UraianPesanan ?? null,
        //                         $TglRencanaKirim[$i],
        //                         $Lunas[$i] ?? null,
        //                         $ppn[$i],
        //                     ],
        //                 );
        //             }
        //         } else {
        //             //yang digunakan
        //             for ($i = 0; $i < count($id_pesanan); $i++) {
        //                 DB::connection('ConnKCNSales')->table('T_DETAILPESANAN')->where('IDPesanan', $id_pesanan)
        //                     ->update([
        //                             'IdJnsBarang' => $IdJnsBarang[$i],
        //                             'Qty' => $Qty[$i],
        //                             'Satuan' => $Satuan[$i],
        //                             'HargaSatuan' => $HargaSatuan[$i],
        //                             'ppn' => $ppn[$i],
        //                             'Discount' => 0.0,
        //                             'UraianPesanan' => $UraianPesanan ?? null,
        //                             'TglRencanaKirim' => $TglRencanaKirim[$i],
        //                             'Lunas' => $Lunas[$i],
        //                             'IDBarang' => $KodeBarang[$i],
        //                         ]);
        //             }
        //             return response()->json(['error' => (string) 'Surat Pesanan ' . $no_sp . ' Sudah Dibuatkan DO, Tidak bisa mengubah kode barang']);
        //             // return redirect()->back()->with('error', 'Surat Pesanan ' . $no_sp . ' Sudah Dibuatkan DO, Tidak bisa mengubah kode barang');
        //         }
        //     } else {
        //         // dd('Masuk sini', $inv);
        //         for ($i = 0; $i < count($id_pesanan); $i++) {
        //             DB::connection('ConnKCNSales')->table('T_DETAILPESANAN')->where('IDPesanan', $id_pesanan)
        //                 ->update(['Lunas' => $Lunas[$i]]);
        //         }
        //         return response()->json(['error' => (string) 'Status Lunas BISA diproses. Surat Pesanan ' . $no_sp . ' Sudah Ada ID Penagihannya: ' . $inv[0]->IdPenagihan]);
        //         // return redirect()->back()->with('error', 'Status Lunas BISA diproses. Surat Pesanan ' . $no_sp . ' Sudah Ada ID Penagihannya: ' . $inv[0]->IdPenagihan);
        //     }
        // }



        // dd($inv, $adaDo, $terkirim, $id_pesanan, $adaDo == 0, $terkirim < 1, $inv->isEmpty(), $inv[0]->IdPenagihan);
        for ($i = 0; $i < count($id_pesanan); $i++) {
            if (is_null($id_pesanan[$i])) {

                DB::connection('ConnKCNSales')->statement(
                    'exec SP_1273_PRG_MAINT_DETAILPESANAN1
                        @Kode = ?,
                        @IDSuratPesanan = ?,
                        @KodeBarang = ?,
                        @IdJnsBarang = ?,
                        @Qty = ?,
                        @Satuan = ?,
                        @HargaSatuan = ?,
                        @Discount = ?,
                        @UraianPesanan = ?,
                        @TglRencanaKirim = ?,
                        @Lunas = ?,
                        @PPN = ?',
                    [
                        1,
                        $no_spText,
                        $KodeBarang[$i],
                        $IdJnsBarang[$i],
                        $Qty[$i],
                        $Satuan[$i],
                        $HargaSatuan[$i],
                        0.0,
                        $UraianPesanan ?? null,
                        $TglRencanaKirim[$i],
                        $Lunas[$i] ?? null,
                        $ppn[$i],
                    ]
                );

                continue;
            }

            DB::connection('ConnKCNSales')
                ->table('T_DETAILPESANAN')
                ->where('IDPesanan', $id_pesanan[$i])
                ->update([
                    'Qty' => $Qty[$i],
                    'HargaSatuan' => $HargaSatuan[$i],
                    'Satuan' => $Satuan[$i],
                    'PPN' => $ppn[$i],
                    'UraianPesanan' => $UraianPesanan ?? null,
                    'TglRencanaKirim' => $TglRencanaKirim[$i],
                    'Lunas' => $Lunas[$i] ?? null,
                    'IDBarang' => $KodeBarang[$i],
                    'IdJnsBarang' => $IdJnsBarang[$i],
                    'Discount' => 0.0,
                ]);
        }

        return response()->json([
            'message' => 'Update berhasil dan sudah masuk ke database'
        ]);





        return response()->json(['message' => (string) 'Surat Pesanan ' . $no_sp . ' Sudah Disesuaikan!',]);
        // return redirect()->back()->with('success', 'Surat Pesanan ' . $no_sp . ' Sudah Disesuaikan!');
        //SP_1486_SLS_MAINT_HEADERPESANAN @kode = 2
        //SP_1486_SLS_MAINT_DETAILPESANAN1 @kode = 4
        //SP_5409_SLS_UPDATE_BS
    }

    public function batalspPenyesuaianSP(Request $request, $nosp)
    {
        // dd($request->all(), $nosp, $request->no_spText);

        if ($request->no_spText !== null) {
            $nosp = $request->no_spText;
        }

        $date = date('m/d/Y', strtotime('now'));
        $do1 = db::connection('ConnKCNSales')->select('SELECT COUNT(dbo.T_DeliveryOrder.IDDO)
					                                FROM         dbo.T_DeliveryOrder INNER JOIN
					                                                      dbo.T_DetailPesanan ON dbo.T_DeliveryOrder.IDPesanan = dbo.T_DetailPesanan.IDPesanan INNER JOIN
					                                                      dbo.VW_PRG_1486_SLS_BARANG_1 ON dbo.T_DetailPesanan.IDBarang = dbo.VW_PRG_1486_SLS_BARANG_1.IDBarang
					                                WHERE     (dbo.T_DeliveryOrder.Dikeluarkan IS NOT NULL OR
					                                                dbo.T_DeliveryOrder.Dikeluarkan IS NULL) AND (dbo.T_DetailPesanan.IDSuratPesanan = \'' . $nosp . '\')
						                                    AND (dbo.T_DeliveryOrder.KetBatal IS NULL)');

        $do2 = db::connection('ConnKCNSales')->select('SELECT COUNT(T_DeliveryOrder.IDDO)
                                                    FROM         T_DeliveryOrder INNER JOIN
                                                                          T_DetailPesanan ON T_DeliveryOrder.IDPesanan = T_DetailPesanan.IDPesanan INNER JOIN
                                                                          VW_PRG_1486_SLS_BARANG_1 ON T_DetailPesanan.IDBarang = VW_PRG_1486_SLS_BARANG_1.KodeBarang AND T_DeliveryOrder.IdType = VW_PRG_1486_SLS_BARANG_1.IDBarang
                                                    WHERE     (T_DeliveryOrder.Dikeluarkan IS NOT NULL OR
                              T_DeliveryOrder.Dikeluarkan IS NULL) AND (LEN(T_DetailPesanan.IDBarang) = \'9\') AND (T_DeliveryOrder.KetBatal IS NULL)  AND (dbo.T_DetailPesanan.IDSuratPesanan = \'' . $nosp . '\')');
        if ($do1[0]->{""} == 0 || $do2[0]->{""} == 0) {
            db::connection('ConnKCNSales')->statement('UPDATE 	T_HEADERPESANAN
                                                            SET deleted = \'' . trim(Auth::user()->NomorUser) . '\' +\' - \'+ \'' . $date . '\'
                                                            WHERE IdSuratPesanan = \'' . $nosp . '\'');
            return redirect()->back()->with('success', 'Surat Pesanan ' . $nosp . ' Sudah Dibatalkan!');
        } else {
            return redirect()->back()->with('error', 'Surat Pesanan ' . $nosp . 'Tidak Bisa Di Batalkan Karena Sudah Ada DO Yang Di ACC Maupun Permohonan DO!');
        }
    }
    public function updatePenyesuaian(Request $request)
    {
        // dd($request->all());
        $UraianPesanan = null;
        $Lunas = null;
        $tgl_pesan = $request->tgl_pesan;
        $jenis_sp = $request->jenis_sp;
        $no_sp = $request->no_sp;
        $list_customer = $request->list_customer;
        $no_po = $request->no_po;
        $tgl_po = $request->tgl_po;
        $no_pi = $request->no_pi;
        $list_sales = $request->list_sales;
        $mata_uang = $request->mata_uang;
        $jenis_bayar = $request->jenis_bayar;
        $syarat_bayar = $request->syarat_bayar;
        $faktur_pjk = $request->faktur_pjk;
        $keterangan = $request->keterangan;
        $barang0 = $request->barang0;
        $KodeBarang = $request->barang1;
        $IdJnsBarang = $request->barang2;
        $Qty = $request->barang3;
        $Satuan = $request->barang5;
        $HargaSatuan = $request->barang6;
        $TglRencanaKirim = $request->barang7;
        $id_pesanan = $request->barang8;
        $ppn = $request->barang9;
        $bkarung = $request->barang10;
        $ikarung = $request->barang11;
        $hkarung = $request->barang12;
        $binner = $request->barang13;
        $iinner = $request->barang14;
        $hinner = $request->barang15;
        $blami = $request->barang16;
        $ilami = $request->barang17;
        $hlami = $request->barang18;
        $bkertas = $request->barang19;
        $ikertas = $request->barang20;
        $hkertas = $request->barang21;
        $hlain = $request->barang22;
        $BeratStandart = $request->barang23;
        $htotal = $request->barang24;
        $bkarung2 = $request->barang25;
        $binner2 = $request->barang26;
        $blami2 = $request->barang27;
        $bkertas2 = $request->barang28;
        $bs2 = $request->barang29;
        // dd($htotal);
        //maintenance header
        db::connection('ConnKCNSales')->statement('exec SP_1486_SLS_MAINT_HEADERPESANAN @Kode = ?,
        @IdJnsSuratPesanan = ?,
        @IdSuratPesanan = ?,
        @Tgl_Pesan = ?,
        @IdCust = ?,
        @No_Po = ?,
        @Tgl_Po = ?,
        @No_PI = ?,
        @IDPembayaran = ?,
        @IDSales = ?,
        @IDMataUang = ?,
        @SyaratBayar = ?,
        @User_id = ?,
        @Ket = ?',
            [
                2,
                $jenis_sp,
                $no_sp,
                $tgl_pesan,
                $list_customer,
                $no_po,
                $tgl_po,
                $no_pi,
                $jenis_bayar,
                $list_sales,
                $mata_uang,
                $syarat_bayar,
                Auth::user()->NomorUser,
                $keterangan
            ]
        );

        //maintenance detail
        for ($i = 0; $i < count($barang0); $i++) {
            db::connection('ConnKCNSales')->statement('exec SP_1486_SLS_MAINT_DETAILPESANAN1 @Kode = ?,
        @IDPesanan = ?,
        @IDSuratPesanan = ?,
        @KodeBarang = ?,
        @IdJnsBarang = ?,
        @Qty = ?,
        @Satuan = ?,
        @HargaSatuan = ?,
        @Discount = ?,
        @UraianPesanan = ?,
        @TglRencanaKirim = ?,
        @Lunas = ?,
        @Tawal = ?,
        @PPN = ?,
        @indek = ?,
        @ikarung = ?,
        @hkarung = ?,
        @iinner = ?,
        @hinner = ?,
        @ilami = ?,
        @hlami = ?,
        @ikertas = ?,
        @hkertas = ?,
        @hlain = ?,
        @htotal = ?',
                [
                    4,
                    $id_pesanan[$i],
                    $no_sp,
                    $KodeBarang[$i],
                    $IdJnsBarang[$i],
                    $Qty[$i],
                    $Satuan[$i],
                    $HargaSatuan[$i],
                    0.0,
                    $UraianPesanan ?? null,
                    $TglRencanaKirim[$i],
                    $Lunas ?? null,
                    0,
                    $ppn[$i],
                    0.0,
                    $ikarung[$i],
                    $hkarung[$i],
                    $iinner[$i],
                    $hinner[$i],
                    $ilami[$i],
                    $hlami[$i],
                    $ikertas[$i],
                    $hkertas[$i],
                    $hlain[$i],
                    $htotal[$i]
                ]
            );
        }
        return redirect()->back()->with('success', 'Surat Pesanan Sudah Disesuaikan!');
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        $no_sp = $request->input('no_spValue');

        try {
            DB::connection('ConnKCNSales')->transaction(function () use ($no_sp) {

                // Hapus detail pesanan
                DB::connection('ConnKCNSales')
                    ->table('T_DETAILPESANAN')
                    ->where('IDSuratPesanan', $no_sp)
                    ->delete();

                // Hapus header pesanan
                DB::connection('ConnKCNSales')
                    ->table('T_HEADERPESANAN')
                    ->where('IDSuratPesanan', $no_sp)
                    ->delete();
            });

            return response()->json([
                'message' => 'Data deleted successfully.'
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'error' => 'Failed to delete data: ' . $e->getMessage()
            ], 500);
        }
    }
}
