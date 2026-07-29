<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratPesanan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class SuratPesananManagerController extends Controller
{

    //Display a listing of the resource.
    public function index()
    {
        $data = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_HEADER_PESANAN_BLMACC @Kode = ?', [2]);
        $jenis_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP @Kode = ?', [1]);
        $list_customer = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        $list_sales = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SALES');
        $jenis_bayar = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBAYAR');
        $jenis_brg = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
        $kategori_utama = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_KATEGORI_UTAMA');
        $list_satuan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SATUAN');
        $list_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Transaksi.SuratPesanan.AccManager', compact('data', 'access', 'jenis_sp', 'list_customer', 'list_sales', 'jenis_bayar', 'jenis_brg', 'kategori_utama', 'list_satuan', 'list_sp'));
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
        // $header_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC @IDSURATPESANAN = ?, @Kode = ?', [$id, 1]);
        // $detail_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_DETAIL_SP @IDSURATPESANAN = ?, @Kode = ?', [$id, 5]);
        if ($id == 'Copy') {
            $no_sp = $request->query('no_sp');
            // dd($no_sp);
            $results = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC @IDSURATPESANAN = ?, @Kode = ?', [$no_sp, 1]);
            // dd($results);
            // $response = [];
            // foreach ($results as $row) {
            //     $response[] = [
            //         'Nama_Dokumen' => trim($row->Nama_Dokumen),
            //         'Id_Jenis_Dokumen' => trim($row->Id_Jenis_Dokumen),
            //     ];
            // }

            return response()->json($results);
            // return datatables($response)->make(true);
        } else if ($id == 'CopyDetails') {
            $no_sp = $request->query('no_sp');
            // dd($no_sp);
            $results = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_DETAIL_SP @IDSURATPESANAN = ?, @Kode = ?', [$no_sp, 5]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'IDSuratPesanan' => $row->IDSuratPesanan,
                    'IDBarang' => $row->IDBarang,
                    'NamaBarang' => $row->NamaBarang,
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
                    'Indek' => $row->Indek,  // Mengganti field "Indek" sesuai dd
                    'KodeHS' => $row->KodeHS,
                    'HARGA_KARUNG' => $row->HARGA_KARUNG,
                    'HARGA_INNER' => $row->HARGA_INNER,
                    'HARGA_LAMI' => $row->HARGA_LAMI,
                    'HARGA_OPP' => $row->HARGA_OPP,
                    'HARGA_KERTAS' => $row->HARGA_KERTAS,
                    'HARGA_LAIN2' => $row->HARGA_LAIN2,
                    'HARGA_TOTAL' => $row->HARGA_TOTAL,
                    'BERAT_KARUNG' => $row->BERAT_KARUNG,
                    'BERAT_KARUNG3' => $row->BERAT_KARUNG3,
                    'BERAT_INNER' => $row->BERAT_INNER,
                    'BERAT_INNER3' => $row->BERAT_INNER3,
                    'BERAT_LAMI' => $row->BERAT_LAMI,
                    'BERAT_LAMI3' => $row->BERAT_LAMI3,
                    'BERAT_OPP' => $row->BERAT_OPP,
                    'BERAT_OPP3' => $row->BERAT_OPP3,
                    'BERAT_CONDUCTIVE' => $row->BERAT_CONDUCTIVE,
                    'BERAT_KERTAS3' => $row->BERAT_KERTAS3,
                    'BERAT_LAIN' => $row->BERAT_LAIN,  // Tambahkan field ini karena ada di dd
                    'BERAT_TOTAL' => $row->BERAT_TOTAL,
                    'BERAT_TOTAL3' => $row->BERAT_TOTAL3,
                    'INDEX_KARUNG' => $row->INDEX_KARUNG,
                    'INDEX_INNER' => $row->INDEX_INNER,
                    'INDEX_LAMI' => $row->INDEX_LAMI,
                    'INDEX_OPP' => $row->INDEX_OPP,
                    'INDEX_KERTAS' => $row->INDEX_KERTAS,
                ];
            }

            return datatables($response)->make(true);
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
        DB::connection('ConnSales')->statement('exec SP_1486_SLS_ACC_SURATPESANAN @AccManager = ?, @IDSuratPesanan = ?', [$idManager, $id]);

        // Redirect to the index page
        return redirect()->back()->with('success', 'Surat Pesanan Sudah Disetujui!');
        // return redirect()->route('SuratPesananManager.index');
    }

    public function updateAll(Request $request)
    {
        // dd($request->all());
        $nosp = $request->nomorSPs;
        $idManager = Auth::user()->NomorUser;
        for ($i = 0; $i < count($nosp); $i++) {
            DB::connection('ConnSales')->statement('exec SP_1486_SLS_ACC_SURATPESANAN @AccManager = ?, @IDSuratPesanan = ?', [$idManager, $nosp[$i]]);
        }
        return redirect()->back()->with('success', 'Surat Pesanan yang Dipilih Sudah Disetujui!');
    }
    public function penyesuaian()
    {
        $jenis_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP @Kode = ?', [1]);
        $list_customer = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        $list_sales = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SALES');
        $jenis_bayar = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBAYAR');
        $jenis_brg = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
        $kategori_utama = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_KATEGORI_UTAMA');
        $list_satuan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SATUAN');
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
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        // dd($data_array);
        return view('Sales.Transaksi.SuratPesanan.Penyesuaian', compact('access', 'jenis_sp', 'list_customer', 'list_sales', 'jenis_bayar', 'jenis_brg', 'kategori_utama', 'list_satuan'));
    }

    public function getPenyesuaianSP($suratPesanan)
    {
        // dd($suratPesanan);
        if (strstr($suratPesanan, '.lama.')) {
            $no_spValue = str_replace('.lama.', '', $suratPesanan);
            $header_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_SDH_ACC @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 1]);
            $detail_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SESUAI_SP @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 2]);
            $data_array = [$header_pesanan, $detail_pesanan];
            return response()->json($data_array);
        }

        $list_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        if (strstr($suratPesanan, '.')) { //ekspor
            $no_spValue = str_replace('.', '/', $suratPesanan);

            $mata_uang = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_MATAUANG');
            $jenis_harga = DB::connection('ConnSales')->table('T_JenisHargaBarangEksport')->select('*')->get();
            $list_billing = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_BILLING');
            $list_customer = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
            $list_sales = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SALES');
            $jenis_brg = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
            $kelompok_utama = DB::connection('ConnInventory')->select('exec SP_1486_SLS_LIST_TYPEBARANG');
            $list_satuan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SATUAN');
            $jenis_harga = DB::connection('ConnSales')->table('T_JenisHargaBarangEksport')->select('*')->get();
            $header_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_SDH_ACC @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 1]);
            $detail_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SESUAI_SP @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 3]);
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

            $jenis_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP @Kode = ?', [1]);
            $list_customer = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
            $list_sales = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SALES');
            $jenis_bayar = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBAYAR');
            $jenis_brg = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
            $kategori_utama = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_KATEGORI_UTAMA');
            $list_satuan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SATUAN');

            $header_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_SDH_ACC @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 1]);
            $detail_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SESUAI_SP @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 2]);
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
        $user = Auth::user()->NomorUser;
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
        $syarat_bayar = $request->syarat_bayar;
        $faktur_pjk = $request->faktur_pjk ?? null;
        $keterangan = $request->keterangan ?? null;
        $keteranganSKBDN = $request->keteranganSKBDN ?? null;
        $barang0 = $request->barang0; //nama barang
        $KodeBarang = $request->barang1; //kode barang
        $IdJnsBarang = $request->barang33; //jenis barang
        $Qty = $request->barang3; //qty pesan
        $Satuan = $request->barang5; //satuan
        $HargaSatuan = $request->barang2; //harga satuan
        $TglRencanaKirim = $request->barang6; //rencana kirim
        $Lunas = $request->barang7 ?? null;
        $ppn = $request->barang8; //ppn
        $bkarung = $request->barang9; //berat karung
        $ikarung = $request->barang10; //index karung
        $hkarung = $request->barang11; //berat index karung
        $binner = $request->barang12; //berat inner
        $iinner = $request->barang13; //index inner
        $hinner = $request->barang14; //berat index inner
        $blami = $request->barang15; //berat lami
        $ilami = $request->barang16; //index lami
        $hlami = $request->barang17; //berat index lami
        $bopp = $request->barang18; //berat opp
        $iopp = $request->barang19; //index opp
        $hopp = $request->barang20; //berat index opp
        $bkertas = $request->barang21; //berat kertas
        $ikertas = $request->barang22; //index kertas
        $hkertas = $request->barang23; //berat index kertas
        $hlain = $request->barang24; //biaya lain2
        $BeratStandart = $request->barang25; //berat standard total
        $htotal = $request->barang26; //total cost
        $bkarung2 = $request->barang27; //berat karung MTR
        $binner2 = $request->barang28; //berat inner MTR
        $blami2 = $request->barang29; //berat lami MTR
        $bopp2 = $request->barang30; //berat opp MTR
        $bkertas2 = $request->barang31; //berat kertas MTR
        $bs2 = $request->barang32; //berat standard total MTR
        $id_pesanan = $request->barang34; //id pesanan untuk di tabel detail pesanan
        $informasiTambahan = $request->barang35; //informasi tambahan
        $kode = 2;
        // dd($kode, $no_sp, $jenis_sp, $tgl_pesan, $IdCust, $no_po, $tgl_po, $no_pi, $jenis_bayar, $list_sales, $mata_uang, $syarat_bayar, $user, $keterangan, $faktur_pjk);
        // dd($BeratStandart, $bs2);
        //update header dulu yaa..
        // dd($request->all(), $id_pesanan, $no_sp, $tgl_pesan, $tgl_po);
        $adaDo = DB::connection('ConnSales')->table('T_DeliveryOrder')
            ->where('idpesanan', $id_pesanan)
            ->whereNull('ketBatal')
            ->count();

        $terkirim = DB::connection('ConnSales')->table('T_DetailPesanan')
            ->where('idpesanan', $id_pesanan)
            ->value('terkirim');

        // $inv = DB::connection('ConnSales')->table('T_DetailPengiriman')
        //     ->join('T_DeliveryOrder', 'T_DetailPengiriman.IDDO', '=', 'T_DeliveryOrder.IDDO')
        //     ->join('T_DetailPesanan', 'T_DeliveryOrder.IDPesanan', '=', 'T_DetailPesanan.IDPesanan')
        //     ->where('T_DetailPesanan.IDPesanan', $id_pesanan)
        //     ->groupBy('T_DetailPengiriman.IdPenagihan')
        //     ->havingRaw('COUNT(T_DetailPengiriman.IdPenagihan) IS NOT NULL')
        //     ->count();
        $inv = DB::connection('ConnSales')->table('T_DetailPengiriman')->select('T_DetailPengiriman.IdPenagihan')
            ->join('T_DeliveryOrder', 'T_DetailPengiriman.IDDO', '=', 'T_DeliveryOrder.IDDO')
            ->join('T_DetailPesanan', 'T_DeliveryOrder.IDPesanan', '=', 'T_DetailPesanan.IDPesanan')
            ->where('T_DetailPesanan.IDPesanan', '=', $id_pesanan)
            ->groupBy('T_DetailPengiriman.IdPenagihan')
            ->havingRaw('COUNT(T_DetailPengiriman.IdPenagihan) IS NOT NULL')->get();
        // ->count('IdPenagihan');

        DB::connection('ConnSales')->statement(
            'exec SP_5409_SLS_MAINT_HEADERPESANAN
        @Kode = ?,
        @IdSuratPesanan = ?,
        @IdJnsSuratPesanan = ?,
        @Tgl_Pesan = ?,
        @IdCust = ?,
        @No_PO = ?,
        @Tgl_PO = ?,
        @No_PI = ?,
        @IdPembayaran = ?,
        @IdSales = ?,
        @IdMataUang = ?,
        @SyaratBayar = ?,
        @User_id = ?,
        @Ket = ?,
        @KetSKBDN = ?,
        @SyaratPenyerahanSKBDN = ?,
        @JnsFakturPjk = ?',
            [$kode, $no_sp, $jenis_sp, $tgl_pesan, $IdCust, $no_po, $tgl_po, $no_pi, $jenis_bayar, $list_sales, $mata_uang, $syarat_bayar, $user, $keterangan, $keteranganSKBDN, $keteranganSKBDN, $faktur_pjk],
        );
        // dd($inv, $adaDo, $terkirim, $id_pesanan, $adaDo == 0, $terkirim < 1, $inv->isEmpty(), $inv[0]->IdPenagihan);
        for ($i = 0; $i < count($id_pesanan); $i++) {
            // dd($inv->isEmpty(), $adaDo == 0 or $terkirim < 1);
            if ($inv->isEmpty() || $inv[0]->IdPenagihan == null) {
                // dd('masuk atas',$HargaSatuan);
                if ($adaDo == 0 or (int) $terkirim < 1) {
                    if (is_null($id_pesanan[$i])) {
                        // dd($id_pesanan[$i]);
                        DB::connection('ConnSales')->statement(
                            'exec SP_1486_SLS_MAINT_DETAILPESANAN1 @Kode = ?,
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
                        @PPN = ?,
                        @indek = ?,
                        @ikarung = ?,
                        @hkarung = ?,
                        @iinner = ?,
                        @hinner = ?,
                        @ilami = ?,
                        @hlami = ?,
                        @iopp = ?,
                        @hopp = ?,
                        @ikertas = ?,
                        @hkertas = ?,
                        @hlain = ?,
                        @htotal = ?',
                            [
                                1,
                                $no_sp,
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
                                0.00,
                                $ikarung[$i],
                                $hkarung[$i],
                                $iinner[$i],
                                $hinner[$i],
                                $ilami[$i],
                                $hlami[$i],
                                $iopp[$i],
                                $hopp[$i],
                                $ikertas[$i],
                                $hkertas[$i],
                                $hlain[$i],
                                $htotal[$i]
                            ],
                        );
                    } else {
                        DB::connection('ConnSales')->statement(
                            'exec SP_1486_SLS_MAINT_DETAILPESANAN1
                        @Kode = ?,
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
                        @PPN = ?,
                        @indek = ?,
                        @ikarung = ?,
                        @hkarung = ?,
                        @iinner = ?,
                        @hinner = ?,
                        @ilami = ?,
                        @hlami = ?,
                        @iopp = ?,
                        @hopp = ?,
                        @ikertas = ?,
                        @hkertas = ?,
                        @hlain = ?,
                        @htotal = ?,
                        @info = ?,
                        @user_id = ?,
                        @Ket = ?',
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
                                $Lunas[$i] ?? null,
                                $ppn[$i],
                                0.00,
                                $ikarung[$i],
                                $hkarung[$i],
                                $iinner[$i],
                                $hinner[$i],
                                $ilami[$i],
                                $hlami[$i],
                                $iopp[$i],
                                $hopp[$i],
                                $ikertas[$i],
                                $hkertas[$i],
                                $hlain[$i],
                                $htotal[$i],
                                $informasiTambahan[$i],
                                $user,
                                $keterangan
                            ],
                        );
                    }
                } else {
                    for ($i = 0; $i < count($id_pesanan); $i++) {
                        DB::connection('ConnSales')->table('T_DETAILPESANAN')->where('IDPesanan', $id_pesanan)
                            ->update([
                                'IdJnsBarang' => $IdJnsBarang[$i],
                                'Qty' => $Qty[$i],
                                'Satuan' => $Satuan[$i],
                                'HargaSatuan' => $HargaSatuan[$i],
                                'ppn' => $ppn[$i],
                                'Discount' => 0.0,
                                'UraianPesanan' => $UraianPesanan ?? null,
                                'TglRencanaKirim' => $TglRencanaKirim[$i],
                                'Lunas' => $Lunas[$i],
                                'KodeBarang' => $KodeBarang[$i],
                                'INDEX_KARUNG' => $ikarung[$i],
                                'INDEX_INNER' => $iinner[$i],
                                'INDEX_LAMI' => $ilami[$i],
                                'INDEX_OPP' => $iopp[$i],
                                'INDEX_Kertas' => $ikertas[$i],
                                'HARGA_KARUNG' => $hkarung[$i],
                                'HARGA_INNER' => $hinner[$i],
                                'HARGA_LAMI' => $hlami[$i],
                                'HARGA_OPP' => $hopp[$i],
                                'HARGA_KERTAS' => $hkertas[$i],
                                'HARGA_LAIN2' => $hlain[$i],
                                'HARGA_TOTAL' => $htotal[$i],
                                'Informasi' => $informasiTambahan[$i]
                            ]);
                    }
                    return response()->json(['error' => (string) 'Surat Pesanan ' . $no_sp . ' Sudah Dibuatkan DO, Tidak bisa mengubah kode barang']);
                    // return redirect()->back()->with('error', 'Surat Pesanan ' . $no_sp . ' Sudah Dibuatkan DO, Tidak bisa mengubah kode barang');
                }
            } else {
                // dd('Masuk sini', $inv);
                for ($i = 0; $i < count($id_pesanan); $i++) {
                    DB::connection('ConnSales')->table('T_DETAILPESANAN')->where('IDPesanan', $id_pesanan)
                        ->update(['Lunas' => $Lunas[$i]]);
                }
                return response()->json(['error' => (string) 'Status Lunas BISA diproses. Surat Pesanan ' . $no_sp . ' Sudah Ada ID Penagihannya: ' . $inv[0]->IdPenagihan]);
                // return redirect()->back()->with('error', 'Status Lunas BISA diproses. Surat Pesanan ' . $no_sp . ' Sudah Ada ID Penagihannya: ' . $inv[0]->IdPenagihan);
            }

            // dd(
            //     'KodeBarang: ' . (string) $KodeBarang[$i],
            //     'bkarung: ' . (string) $bkarung[$i],
            //     'binner: ' . (string) $binner[$i],
            //     'blami: ' . (string) $blami[$i],
            //     'bopp: ' . (string) $bopp[$i],
            //     'bkertas: ' . (string) $bkertas[$i],
            //     'BeratStandart: ' . (string) $BeratStandart[$i],
            //     'bkarung2: ' . (string) $bkarung2[$i],
            //     'binner2: ' . (string) $binner2[$i],
            //     'blami2: ' . (string) $blami2[$i],
            //     'bopp2: ' . (string) $bopp2[$i],
            //     'bkertas2: ' . (string) $bkertas2[$i],
            //     'bs2: ' . (string) $bs2[$i],
            // );
            //Simpan BS (Berat Standard)
            DB::connection('ConnPurchase')->statement(
                'exec SP_5409_SLS_UPDATE_BS
            @KodeBarang = ?,
            @bkarung = ?,
            @binner = ?,
            @blami = ?,
            @bopp = ?,
            @bkertas = ?,
            @BeratStandart = ?,
            @bkarung2 = ?,
            @binner2 = ?,
            @bopp2 = ?,
            @blami2 = ?,
            @bkertas2 = ?,
            @bs2 = ?,
            @UserId = ?',
                [
                    $KodeBarang[$i],
                    $bkarung[$i],
                    $binner[$i],
                    $blami[$i],
                    $bopp[$i],
                    $bkertas[$i],
                    $BeratStandart[$i],
                    $bkarung2[$i],
                    $binner2[$i],
                    $bopp2[$i],
                    $blami2[$i],
                    $bkertas2[$i],
                    $bs2[$i],
                    $user
                ],
            );
        }
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
        $do1 = db::connection('ConnSales')->select('SELECT COUNT(dbo.T_DeliveryOrder.IDDO)
					                                FROM         dbo.T_DeliveryOrder INNER JOIN
					                                                      dbo.T_DetailPesanan ON dbo.T_DeliveryOrder.IDPesanan = dbo.T_DetailPesanan.IDPesanan INNER JOIN
					                                                      dbo.vw_prg_barang ON dbo.T_DetailPesanan.IDBarang = dbo.vw_prg_barang.IDBarang
					                                WHERE     (dbo.T_DeliveryOrder.Dikeluarkan IS NOT NULL OR
					                                                dbo.T_DeliveryOrder.Dikeluarkan IS NULL) AND (dbo.T_DetailPesanan.IDSuratPesanan = \'' . $nosp . '\')
						                                    AND (dbo.T_DeliveryOrder.KetBatal IS NULL)');

        $do2 = db::connection('ConnSales')->select('SELECT COUNT(T_DeliveryOrder.IDDO)
                                                    FROM         T_DeliveryOrder INNER JOIN
                                                                          T_DetailPesanan ON T_DeliveryOrder.IDPesanan = T_DetailPesanan.IDPesanan INNER JOIN
                                                                          VW_PRG_BARANG ON T_DetailPesanan.IDBarang = VW_PRG_BARANG.KodeBarang AND T_DeliveryOrder.IdType = VW_PRG_BARANG.IDBarang
                                                    WHERE     (T_DeliveryOrder.Dikeluarkan IS NOT NULL OR
                              T_DeliveryOrder.Dikeluarkan IS NULL) AND (LEN(T_DetailPesanan.IDBarang) = \'9\') AND (T_DeliveryOrder.KetBatal IS NULL)  AND (dbo.T_DetailPesanan.IDSuratPesanan = \'' . $nosp . '\')');
        $formula = db::connection('ConnSales')->select('SELECT COUNT(*)
                                    FROM   T_FormulaSP_KITE
                                    GROUP BY NoSP
                                    HAVING (NoSP = \'' . $nosp . '\')');
        // dd($do1[0]->{""}, $do2[0]->{""}, $formula);
        if ($do1[0]->{""} == 0 || $do2[0]->{""} == 0) {
            db::connection('ConnSales')->statement('UPDATE 	T_HEADERPESANAN
                                                            SET deleted = \'' . trim(Auth::user()->NomorUser) . '\' +\' - \'+ \'' . $date . '\'
                                                            WHERE IdSuratPesanan = \'' . $nosp . '\'');
            if (!empty($formula)) {
                $pp = db::connection('ConnSales')->select('SELECT SUM(BahanPP) + SUM(AfalanPP)
                                                            FROM         T_FormulaSP_KITE
                                                            WHERE     (NoSP = \'' . $nosp . '\')');
                $pe = db::connection('ConnSales')->select('SELECT SUM(BahanPE) + SUM(AfalanPE)
                                                            FROM         T_FormulaSP_KITE
                                                            WHERE     (NoSP = \'' . $nosp . '\')');
                $mb = db::connection('ConnSales')->select('SELECT SUM(BahanMB) + SUM(AfalanMB)
                                                            FROM         T_FormulaSP_KITE
                                                            WHERE     (NoSP = \'' . $nosp . '\')');
                db::connection('ConnInventory')->statement('UPDATE SaldoKITE
                                                            set SaldoPP = SaldoPP + ' . $pp . ',
                                                                SaldoPE = SaldoPE + ' . $pe . ',
                                                                SaldoMB = SaldoMB + ' . $mb . '');
                db::connection('ConnInventory')->statement('DELETE FROM T_FormulaSP_KITE
                                                            WHERE     (NoSP = \'' . $nosp . '\')');
            }
            return redirect()->back()->with('success', 'Surat Pesanan ' . $nosp . ' Sudah Dibatalkan!');
        } else {
            return redirect()->back()->with('error', 'Surat Pesanan ' . $nosp . 'Tidak Bisa Di Batalkan Karena Sudah Ada DO Yang Di ACC Maupun Permohonan DO!');
        }
    }
    public function updatePenyesuaian(Request $request)
    {
        dd($request->all());
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
        db::connection('ConnSales')->statement('exec SP_1486_SLS_MAINT_HEADERPESANAN @Kode = ?,
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
            db::connection('ConnSales')->statement('exec SP_1486_SLS_MAINT_DETAILPESANAN1 @Kode = ?,
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
        // dd($request->all());
        $no_sp = $request->input('no_spValue');

        try {
            DB::connection('ConnSales')->table('T_DetailPesanan')
                ->where('IDSuratPesanan', $no_sp)
                ->delete();

            DB::connection('ConnSales')->statement('EXEC SP_1486_SLS_DEL_HEADER_DETAIL_PESANAN @IDSuratPesanan = ?', [$no_sp]);

            return response()->json(['message' => 'Data deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete data: ' . $e->getMessage()]);
        }
    }
}
