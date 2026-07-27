<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratPesanan;

use App\Models\Sales\SuratPesanan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\HakAksesController;
use Session;


class SuratPesananController extends Controller
{
    public function index(Request $request)
    {
        $jenis_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP @Kode = ?', [1]);
        $list_customer = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        $list_sales = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SALES');
        $jenis_bayar = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBAYAR');
        $jenis_brg = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
        $kategori_utama = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_KATEGORI_UTAMA');
        $list_satuan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SATUAN');
        $list_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Transaksi.SuratPesanan.Index', compact('access', 'jenis_sp', 'list_customer', 'list_sales', 'jenis_bayar', 'jenis_brg', 'kategori_utama', 'list_satuan', 'list_sp'));
    }
    //get data SP dengan parameter sudah ACC manager, AKTIF dan Belum LUNAS.
    function splokal(Request $request)
    {
        // dd($request->all());
        $columns = array(
            0 => 'IDSuratPesanan',
            1 => 'NamaCust',
            2 => 'Tgl_Pesan'
        );

        $totalData = DB::connection('ConnSales')
            ->table('T_HeaderPesanan')
            ->select('IDSuratPesanan', 'Tgl_Pesan', 'NamaCust')
            ->leftJoin('T_Customer', 'T_HeaderPesanan.IDCust', '=', 'T_Customer.IDCust')
            ->where('IDJnsSuratPesanan', '=', 1)
            ->where('Aktive', '=', 'Y')
            ->whereNull('Deleted')
            ->whereNotNull('AccManager')
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        if (empty($request->input('search.value'))) {
            $sp = DB::connection('ConnSales')
                ->table('T_HeaderPesanan')
                ->select('IDSuratPesanan', 'Tgl_Pesan', 'NamaCust')
                ->leftJoin('T_Customer', 'T_HeaderPesanan.IDCust', '=', 'T_Customer.IDCust')
                ->where('IDJnsSuratPesanan', '=', 1)
                ->where('Aktive', '=', 'Y')
                ->whereNull('Deleted')
                ->whereNotNull('AccManager')
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
        } else {
            $search = $request->input('search.value');
            $sp = DB::connection('ConnSales')
                ->table('T_HeaderPesanan')
                ->select('IDSuratPesanan', 'Tgl_Pesan', 'NamaCust')
                ->leftJoin('T_Customer', 'T_HeaderPesanan.IDCust', '=', 'T_Customer.IDCust')
                ->where('IDJnsSuratPesanan', '=', 1)
                ->where('Aktive', '=', 'Y')
                ->whereNull('Deleted')
                ->whereNotNull('AccManager')
                ->where('IDSuratPesanan', 'LIKE', "%{$search}%")
                ->orWhere('Tgl_Pesan', 'LIKE', "%{$search}%")
                ->whereNull('Deleted')
                ->whereNotNull('AccManager')
                ->orWhere('NamaCust', 'LIKE', "%{$search}%")
                ->whereNull('Deleted')
                ->whereNotNull('AccManager')
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();

            $totalFiltered = DB::connection('ConnSales')
                ->table('T_HeaderPesanan')
                ->select('IDSuratPesanan', 'Tgl_Pesan', 'NamaCust')
                ->leftJoin('T_Customer', 'T_HeaderPesanan.IDCust', '=', 'T_Customer.IDCust')
                ->where('IDJnsSuratPesanan', '=', 1)
                ->where('Aktive', '=', 'Y')
                ->whereNull('Deleted')
                ->whereNotNull('AccManager')
                ->where('IDSuratPesanan', 'LIKE', "%{$search}%")
                ->orWhere('Tgl_Pesan', 'LIKE', "%{$search}%")
                ->whereNull('Deleted')
                ->whereNotNull('AccManager')
                ->orWhere('NamaCust', 'LIKE', "%{$search}%")
                ->whereNull('Deleted')
                ->whereNotNull('AccManager')
                ->count();
        }

        $data = array();
        if (!empty($sp)) {
            foreach ($sp as $datasp) {
                $nestedData['IDSuratPesanan'] = $datasp->IDSuratPesanan;
                $nestedData['NamaCust'] = $datasp->NamaCust;
                $nestedData['Tgl_Pesan'] = substr($datasp->Tgl_Pesan, 0, 10);
                if (strstr($datasp->IDSuratPesanan, '/')) {
                    $no_spValue = str_replace('/', '.', $datasp->IDSuratPesanan);
                } else {
                    $no_spValue = $datasp->IDSuratPesanan;
                }
                $csrfToken = Session::get('_token');
                $nestedData['Actions'] = "<button class=\"btn btn-sm btn-success\" id=\"btn_copy\" style=\"width: 110px\" data-nosp=\"" . $no_spValue . "\">&#128196; Copy SP</button>
                                        <br>
                                        <button class=\"btn btn-sm btn-info\" id=\"btn_penyesuaian\" style=\"width: 110px\" data-nosp=\"" . $no_spValue . "\">&#x270E; Penyesuaian</button>
                                        <br>
                                        <form onsubmit=\"return confirm('Apakah Anda Yakin ?');\" action=\"/batalsplokal/" . $no_spValue . "\" method=\"POST\" enctype=\"multipart/form-data\">
                                            <button type=\"submit\" style=\"width: 110px\" class=\"btn btn-sm btn-danger\"><span>&#x1F5D1;</span> Batal SP</button>
                                            <input type=\"hidden\" name=\"_token\" value=\"" . $csrfToken . "\">
                                        </form>";

                $data[] = $nestedData;
            }
        }

        $json_data = array(
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($totalData),
            "recordsFiltered" => intval($totalFiltered),
            "data" => $data
        );
        // dd($sp);
        echo json_encode($json_data);
    }
    //Show the form for creating a new resource.
    public function create()
    {
        $jenis_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP @Kode = ?', [1]);
        $list_customer = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        $list_sales = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SALES');
        $jenis_bayar = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBAYAR');
        $jenis_brg = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
        $kategori_utama = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_KATEGORI_UTAMA');
        $list_satuan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SATUAN');
        $list_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        // dd($list_customer);
        return view('Sales.Transaksi.SuratPesanan.Create', compact('access', 'jenis_sp', 'list_customer', 'list_sales', 'jenis_bayar', 'jenis_brg', 'kategori_utama', 'list_satuan', 'list_sp'));
    }
    public function getKategori($kategoriUtama)
    {
        $secondOptions = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_KATEGORI @NoKatUtama = ?', [$kategoriUtama]);
        // Return the options as JSON data
        return response()->json($secondOptions);
    }

    public function getSubKategori($kategori)
    {
        $thirdOptions = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_SUB_KATEGORI @NoKategori = ?', [$kategori]);
        // dd($thirdOptions);
        // Return the options as JSON data
        return response()->json($thirdOptions);
    }

    public function getNamaBarang($subKategori)
    {
        // dd($subKategori);
        $fourthOptions = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_BARANG @NoSubKategori = ?, @Eksport = ?', [$subKategori, 'N']);
        // dd($fourthOptions);
        return response()->json($fourthOptions);
    }

    public function getNamaBarangExport($subKategori)
    {
        // dd($subKategori);
        $fourthOptions = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_BARANG @NoSubKategori = ?, @Eksport = ?', [$subKategori, 'Y']);
        // dd($fourthOptions);
        return response()->json($fourthOptions);
    }

    public function getSatuanBarang($kode_barang)
    {
        // dd($kode_barang);
        $data = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_SATUAN_BARANG @KodeBarang = ?', [$kode_barang]);
        // dd($data);
        return response()->json($data);
    }

    public function getSatuanBarang1($kode_barang)
    {
        // dd($kode_barang);
        $data = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_SATUAN_BARANG1 @KodeBarang = ?', [$kode_barang]);
        // dd($data);
        return response()->json($data);
    }

    public function getBeratStandard($kode_barang)
    {
        // dd($kode_barang);
        $data = DB::connection('ConnPurchase')->select('exec SP_1273_SLS_CEK_BERAT_STANDART @kd = ?, @KodeBarang = ?', [1, $kode_barang]);
        // dd($data);
        return response()->json($data);
    }

    public function getListSatuan()
    {
        $list_satuan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SATUAN');

        return response($list_satuan);
    }

    public function getDisplayBarang($kode_barang)
    {
        $data = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_DETAIL_BARANG @KodeBarang = ?', [$kode_barang]);

        return response()->json($data);
    }

    public function getSaldoInventory($kode_barang)
    {
        $data = db::connection('ConnInventory')->select('exec SP_1003_INV_LIST_TYPE @KodeBarang = ?, @Kode = ?', [$kode_barang, 10]);

        return response()->json($data);
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        // dd($request->all());
        $UraianPesanan = null;
        $Lunas = null;
        $user = Auth::user()->NomorUser;
        $tgl_pesan = $request->tgl_pesan;
        $jenis_sp = $request->jenis_sp;
        $IdCust = $request->list_customer;
        $no_po = $request->no_po ?? "";
        $tgl_po = $request->tgl_po;
        $no_pi = $request->no_pi ?? "";
        $list_sales = $request->list_sales;
        $mata_uang = $request->mata_uang;
        $jenis_bayar = $request->jenis_bayar;
        $syarat_bayar = $request->syarat_bayar ?? 0;
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
        $IdSuratPesanan = $request->barang30; //idsuratpesanan
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
        $kode = 1;

        //maintenance header dulu yaw..
        DB::connection('ConnSales')->statement(
            'exec SP_5409_SLS_MAINT_HEADERPESANAN
        @Kode = ?,
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
        @JnsFakturPjk = ?',
            [$kode, $jenis_sp, $tgl_pesan, $IdCust, $no_po, $tgl_po, $no_pi, $jenis_bayar, $list_sales, $mata_uang, $syarat_bayar, $user, $keterangan, $keteranganSKBDN, $faktur_pjk],
        );

        //kita cari nomor SP yang baru saja dibuat..
        // dd($no_pi == null);
        // dd($jenis_sp, $tgl_pesan, $IdCust, $no_pi, $no_po, $tgl_po, $list_sales, $keterangan);
        $no_sp = DB::connection('ConnSales')->table('T_HeaderPesanan')
            ->select('IDSuratPesanan')
            ->where('IDJnsSuratPesanan', '=', $jenis_sp)
            ->where('Tgl_Pesan', '=', $tgl_pesan)
            ->where('IDCust', '=', $IdCust)
            ->where('NO_PI', '=', $no_pi)
            ->where('NO_PO', '=', $no_po)
            ->where('Tgl_PO', '=', $tgl_po)
            ->where('IDSales', '=', $list_sales)
            ->where('Ket', '=', $keterangan)
            ->where('KetSKBDN', '=', $keteranganSKBDN)
            ->latest('IDSuratPesanan')
            ->first();
        // dd($no_sp->IDSuratPesanan);

        // kemudian beralih ke maintenance detail pesanan nich...
        for ($i = 0; $i < count($bkarung); $i++) {
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
                    $kode,
                    $no_sp->IDSuratPesanan,
                    $KodeBarang[$i],
                    $IdJnsBarang[$i],
                    $Qty[$i],
                    $Satuan[$i],
                    $HargaSatuan[$i],
                    0.0,
                    $UraianPesanan ?? null,
                    $TglRencanaKirim[$i],
                    $Lunas ?? null,
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
            //Simpan BS Berat Standard
            // dd($KodeBarang[$i], $bkarung[$i], $binner[$i], $blami[$i], $bkertas[$i], $BeratStandart[$i], $user);

            DB::connection('ConnPurchase')->statement(
                'exec SP_5409_SLS_UPDATE_BS
                @KodeBarang = \'' . $KodeBarang[$i] . '\',
                @bkarung = ' . $bkarung[$i] . ',
                @binner = ' . $binner[$i] . ',
                @blami = ' . $blami[$i] . ',
                @bopp = ' . $bopp[$i] . ',
                @bkertas = ' . $bkertas[$i] . ',
                @BeratStandart = ' . $BeratStandart[$i] . ',
                @bkarung2 = ' . $bkarung2[$i] . ',
                @binner2 = ' . $binner2[$i] . ',
                @blami2 = ' . $blami2[$i] . ',
                @bopp2 = ' . $bopp2[$i] . ',
                @bkertas2 = ' . $bkertas[$i] . ',
                @bs2 = ' . $BeratStandart[$i] . ',
                @UserId = \'' . trim($user) . '\''
            );
        }
        return response()->json(['message' => (string) 'Surat Pesanan ' . $no_sp->IDSuratPesanan . ' Sudah Dibuat!',]);
        // return redirect()->back()->with('success', 'Surat Pesanan ' . $no_sp->IDSuratPesanan . ' Sudah Dibuat!');
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'Copy') {
            $no_sp = $request->query('no_sp');
            // dd($no_sp);
            $results = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_SDH_ACC @IDSURATPESANAN = ?, @Kode = ?', [$no_sp, 1]);
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
            $results = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SESUAI_SP @IDSURATPESANAN = ?, @Kode = ?', [$no_sp, 2]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'IDSuratPesanan' => $row->IDSuratPesanan,
                    'Tgl_Pesan' => $row->Tgl_Pesan,
                    'IDCust' => $row->IDCust,
                    'NamaCust' => $row->NamaCust,
                    'NO_PO' => $row->NO_PO,
                    'Tgl_PO' => $row->Tgl_PO,
                    'IDPembayaran' => $row->IDPembayaran,
                    'NamaPembayaran' => $row->NamaPembayaran,
                    'IDBill' => $row->IDBill,
                    'NamaBill' => $row->NamaBill,
                    'IDSales' => $row->IDSales,
                    'NamaSales' => $row->NamaSales,
                    'IDMataUang' => $row->IDMataUang,
                    'MataUang' => $row->MataUang,
                    'TglInput' => $row->TglInput,
                    'AccManager' => $row->AccManager,
                    'TglAccManager' => $row->TglAccManager,
                    'IDPesanan' => $row->IDPesanan,
                    'IDBarang' => $row->IDBarang,
                    'IDJnsBarang' => $row->IDJnsBarang,
                    'NamaJnsBrg' => $row->NamaJnsBrg,
                    'Qty' => $row->Qty,
                    'Satuan' => $row->Satuan,
                    'HargaSatuan' => $row->HargaSatuan,
                    'Discount' => $row->Discount,
                    'UraianPesanan' => $row->UraianPesanan,
                    'TglRencanaKirim' => $row->TglRencanaKirim,
                    'Lunas' => $row->Lunas,
                    'TerKirim' => $row->TerKirim,
                    'SaldoAwal' => $row->SaldoAwal,
                    'PPN' => $row->PPN,
                    'namabarang' => $row->namabarang,
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
                    'BERAT_TOTAL' => $row->BERAT_TOTAL,
                    'BERAT_TOTAL3' => $row->BERAT_TOTAL3,
                    'INDEX_KARUNG' => $row->INDEX_KARUNG,
                    'INDEX_INNER' => $row->INDEX_INNER,
                    'INDEX_LAMI' => $row->INDEX_LAMI,
                    'INDEX_OPP' => $row->INDEX_OPP,
                    'INDEX_KERTAS' => $row->INDEX_KERTAS,
                    'Informasi' => $row->Informasi,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'PelunasanSP') {
            $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
            return view('Sales.Transaksi.SuratPesanan.PelunasanSuratPesanan', compact('access'));
        } else if ($id == 'getDataPelunasanSP') {
            $data = DB::connection('ConnSales')->select('exec SP_4384_SLS_PELUNASANSP @XKode = 1');
            return datatables($data)->make(true);
        } else if ($id == 'prosesLunasSP') {
            try {
                $idPesananString = $request->input('idPesananString');
                $user = Auth::user()->NomorUser;
                // dd($idPesananString);
                if (empty($idPesananString)) {
                    return response()->json([
                        'error' => 'Tidak ada item yang dipilih untuk diproses.',
                    ]);
                }

                // Eksekusi sekali dengan semua ID dalam satu string
                DB::connection('ConnSales')->statement('exec SP_4384_SLS_PELUNASANSP @XKode = ?, @XIdPesananList = ?, @XNomorUser = ?', [2, $idPesananString, trim($user)]);

                return response()->json([
                    'message' => 'Proses Lunas SP Selesai!!',
                ]);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }

    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        // $header_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC @IDSURATPESANAN = ?, @Kode = ?', [$id, 1]);
        // $detail_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_DETAIL_SP @IDSURATPESANAN = ?, @Kode = ?', [$id, 5]);

        // $data = [$header_pesanan, $detail_pesanan];
        // return response()->json($data);
    }

    public function deleteDetailPesanan($idPesanan)
    {
        $cekDO = DB::connection('ConnSales')->table('T_DeliveryOrder')
            ->where('IDPesanan', $idPesanan)
            ->exists();

        if ($cekDO) {
            // Cek apakah ada setidaknya satu row dengan KetBatal IS NULL
            $adaKetBatalNull = DB::connection('ConnSales')->table('T_DeliveryOrder')
                ->where('IDPesanan', $idPesanan)
                ->whereNull('KetBatal')
                ->exists();

            if ($adaKetBatalNull) {
                return response()->json("Data tidak bisa dihapus karena ada DO!");
            }

            // Jika semua row KetBatal IS NOT NULL, hapus semua row di T_DeliveryOrder
            DB::connection('ConnSales')->table('T_DeliveryOrder')
                ->where('IDPesanan', $idPesanan)
                ->delete();
        }

        // Jika tidak ada DO atau sudah dihapus, jalankan stored procedure
        DB::connection('ConnSales')->statement('exec SP_1486_SLS_MAINT_DETAILPESANAN @Kode = ?, @IDPesanan = ?', [3, $idPesanan]);

        return response()->json("Data sudah terhapus dari database!");
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        // dd($request->all());
        // $data = $request->all();
        // dd($request->all());
        $UraianPesanan = null;
        $Lunas = null;
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
        $id_pesanan = $request->barang34; //idsuratpesanan
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
        $kode = 2;
        //update header dulu yaa..

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
        @JnsFakturPjk = ?',
            [$kode, $no_sp, $jenis_sp, $tgl_pesan, $IdCust, $no_po, $tgl_po, $no_pi, $jenis_bayar, $list_sales, $mata_uang, $syarat_bayar, $user, $keterangan, $faktur_pjk],
        );
        // dd($no_sp);
        for ($i = 0; $i < count($id_pesanan); $i++) {
            // dd($id_pesanan);
            if (is_null($id_pesanan[$i])) {
                // dd('hehe1');
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
                @ikertas = ?,
                @hkertas = ?,
                @hlain = ?,
                @htotal = ?',
                    [1, $no_sp, $KodeBarang[$i], $IdJnsBarang[$i], $Qty[$i], $Satuan[$i], $HargaSatuan[$i], 0.0, $UraianPesanan ?? null, $TglRencanaKirim[$i], $Lunas ?? null, $ppn[$i], 0.00, $ikarung[$i], $hkarung[$i], $iinner[$i], $hinner[$i], $ilami[$i], $hlami[$i], $ikertas[$i], $hkertas[$i], $hlain[$i], $htotal[$i]],
                );
            } else {
                // dd($id_pesanan[$i]);
                // dd('hehe2');
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
                    [$kode, $id_pesanan[$i], $no_sp, $KodeBarang[$i], $IdJnsBarang[$i], $Qty[$i], $Satuan[$i], $HargaSatuan[$i], 0.0, $UraianPesanan ?? null, $TglRencanaKirim[$i], $Lunas ?? null, $ppn[$i], $ikarung[$i], $hkarung[$i], $iinner[$i], $hinner[$i], $ilami[$i], $hlami[$i], $iopp[$i], $hopp[$i], $ikertas[$i], $hkertas[$i], $hlain[$i], $htotal[$i]],
                );
            }
            // dd(count($bkarung));
            //     //Simpan BS (Berat Standard)

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
                    $blami2[$i],
                    $bopp2[$i],
                    $bkertas2[$i],
                    $bs2[$i],
                    $user
                ],
            );
            // DB::connection('ConnPurchase')->statement(
            //     'exec SP_5409_SLS_UPDATE_BS
            //     @KodeBarang = \'?\',
            //     @bkarung = ?,
            //     @binner = ?,
            //     @blami = ?,
            //     @bkertas = ?,
            //     @BeratStandart = ?,
            //     @bkarung2 = ?,
            //     @binner2 = ?,
            //     @blami2 = ?,
            //     @bkertas2 = ?,
            //     @bs2 = ?,
            //     @UserId = \'?\'',
            //     [
            //         $KodeBarang[$i],
            //         $bkarung[$i],
            //         $binner[$i],
            //         $blami[$i],
            //         $bkertas[$i],
            //         $BeratStandart[$i],
            //         $bkarung[$i],
            //         $binner[$i],
            //         $blami[$i],
            //         $bkertas[$i],
            //         $BeratStandart[$i],
            //         $user
            //     ],
            // );
        }
        return response()->json(['message' => (string) 'Surat Pesanan ' . $no_sp . ' Sudah Diubah!',]);
        // return redirect()->back()->with('success', 'Surat Pesanan ' . $no_sp . ' Sudah Diubah!');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        // dd($id);
        DB::connection('ConnSales')->statement('exec SP_1486_SLS_DEL_HEADER_DETAIL_PESANAN @IdSuratPesanan = ?', [$id]);
        return redirect()->back()->with('success', 'Surat Pesanan ' . $id . ' Sudah Dihapus!'); //->with(['success' => 'Data berhasil dihapus!']);
    }
}
