<?php

namespace App\Http\Controllers\Kencana;

use App\Models\Kencana\KcnSuratPesanan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\HakAksesController;
use Session;


class SuratPesananKencanaController extends Controller
{
    public function index(Request $request)
    {
        $jenis_sp = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SP @Kode = ?', [1]);
        $list_customer = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        $list_sales = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SALES');
        $jenis_bayar = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_JNSBAYAR');
        $jenis_brg = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_JNSBRG');
        $kategori_utama = DB::connection('ConnKCNPurchase')->select('exec SP_1273_PRG_KATEGORI_UTAMA');
        $list_satuan = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SATUAN');
        $list_sp = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SP_BLM_ACC');
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.SuratPesanan.Index', compact('access', 'jenis_sp', 'list_customer', 'list_sales', 'jenis_bayar', 'jenis_brg', 'kategori_utama', 'list_satuan', 'list_sp'));
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

        $totalData = DB::connection('ConnKCNSales')
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
            $sp = DB::connection('ConnKCNSales')
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
            $sp = DB::connection('ConnKCNSales')
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

            $totalFiltered = DB::connection('ConnKCNSales')
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
                // $nestedData['Actions'] = "<button class=\"btn btn-sm btn-success\" id=\"btn_copy\" style=\"width: 110px\" data-nosp=\"" . $no_spValue . "\">&#128196; Copy SP</button>
                //                         <br>
                //                         <button class=\"btn btn-sm btn-info\" id=\"btn_penyesuaian\" style=\"width: 110px\" data-nosp=\"" . $no_spValue . "\">&#x270E; Penyesuaian</button>
                //                         <br>
                //                         <form onsubmit=\"return confirm('Apakah Anda Yakin ?');\" action=\"/batalsplokal/" . $no_spValue . "\" method=\"POST\" enctype=\"multipart/form-data\">
                //                             <button type=\"submit\" style=\"width: 110px\" class=\"btn btn-sm btn-danger\"><span>&#x1F5D1;</span> Batal SP</button>
                //                             <input type=\"hidden\" name=\"_token\" value=\"" . $csrfToken . "\">
                //                         </form>";

                $nestedData['Actions'] = "<button class=\"btn btn-sm btn-info\" id=\"btn_penyesuaian\" style=\"width: 110px\" data-nosp=\"" . $no_spValue . "\">&#x270E; Penyesuaian</button>
                                        <br>
                                        <form onsubmit=\"return confirm('Apakah Anda Yakin ?');\" action=\"/Kencana/batalsplokal/" . $no_spValue . "\" method=\"POST\" enctype=\"multipart/form-data\">
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
        $jenis_sp = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SP @Kode = ?', [1]);
        $list_customer = DB::connection('ConnKCNSales')
            ->table('T_CUSTOMER')
            ->select(
                DB::raw("NAMACUST + ' (' + KotaKirim + ')' AS NamaCust"),
                DB::raw("JNSCUST + ' -' + IDCUST AS IDCust")
            )
            ->whereNotNull('NAMACUST')
            ->where('IsActive', 1)
            ->orderBy('NAMACUST')
            ->orderBy('JNSCUST')
            ->get();
        $list_sales = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SALES');
        $jenis_bayar = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_JNSBAYAR');
        $jenis_brg = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
        $kategori_utama = DB::connection('ConnKCNPurchase')->select('exec SP_1273_PRG_KATEGORI_UTAMA');
        $list_satuan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SATUAN');
        $list_sp = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC');
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        // dd($list_customer);
        return view('Kencana.SuratPesanan.Create', compact('access', 'jenis_sp', 'list_customer', 'list_sales', 'jenis_bayar', 'jenis_brg', 'kategori_utama', 'list_satuan', 'list_sp'));
    }

    public function getKategori($kategoriUtama)
    {
        $secondOptions = DB::connection('ConnKCNPurchase')->select('exec SP_1273_PRG_KATEGORI @NoKatUtama = ?', [$kategoriUtama]);
        // Return the options as JSON data
        return response()->json($secondOptions);
    }

    public function getSubKategori($kategori)
    {
        $thirdOptions = DB::connection('ConnKCNPurchase')->select('exec SP_1273_PRG_SUB_KATEGORI @NoKategori = ?', [$kategori]);
        // dd($thirdOptions);
        // Return the options as JSON data
        return response()->json($thirdOptions);
    }

    public function getNamaBarang($subKategori)
    {
        $data = DB::connection('ConnKCNPurchase')->select(
            'EXEC SP_1273_PRG_BARANG @NoSubKategori = ?, @Eksport = ?',
            [$subKategori, 'N']
        );

        return response()->json($data);
    }

    public function getNamaBarangExport($subKategori)
    {
        // dd($subKategori);
        $fourthOptions = DB::connection('ConnKCNPurchase')->select('exec SP_1273_PRG_BARANG @NoSubKategori = ?, @Eksport = ?', [$subKategori, 'Y']);
        // dd($fourthOptions);
        return response()->json($fourthOptions);
    }

    public function getSatuanBarang($kode_barang)
    {
        // dd($kode_barang);
        $data = DB::connection('ConnKCNPurchase')->select('exec SP_1273_PRG_SATUAN_BARANG @KodeBarang = ?', [$kode_barang]);
        // dd($data);
        return response()->json($data);
    }

    public function getSatuanBarang1($kode_barang)
    {
        // dd($kode_barang);
        $data = DB::connection('ConnKCNSales')->select(
            'exec SP_4384_SLS_MAINTENANCE_SURAT_PESANAN
            @XKode = ?,
            @XKodeBarang = ?',
            [1, $kode_barang]
        );
        // dd($data, $kode_barang);
        return response()->json($data);
    }

    public function getBeratStandard($kode_barang)
    {
        // dd($kode_barang);
        $data = DB::connection('ConnKCNPurchase')->select('exec SP_1273_SLS_CEK_BERAT_STANDART @kd = ?, @KodeBarang = ?', [1, $kode_barang]);
        // dd($data);
        return response()->json($data);
    }

    public function getListSatuan()
    {
        $list_satuan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SATUAN');

        return response($list_satuan);
    }

    public function getDisplayBarang($kode_barang)
    {
        $data = DB::connection('ConnKCNPurchase')->select('exec SP_1273_PRG_DETAIL_BARANG @KodeBarang = ?', [$kode_barang]);

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
        // $data = $request->all();
        // dd($data);
        $UraianPesanan = null;
        $Lunas = null;
        $no_spText = $request->no_spText;
        $user = trim(Auth::user()->NomorUser);
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
        $barang0 = $request->barang0; //nama barang
        $KodeBarang = $request->barang1; //kode barang
        $HargaSatuan = $request->barang2; //harga satuan
        $Qty = $request->barang3; //qty pesan
        $Satuan = $request->barang5; //satuan
        $TglRencanaKirim = $request->barang6; //rencana kirim
        $ppn = $request->barang8; //ppn
        $IdJnsBarang = $request->barang9; //jenis barang
        $kode = 1;

        //maintenance header dulu yaw..
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

        // kemudian beralih ke maintenance detail pesanan nich...
        for ($i = 0; $i < count($KodeBarang); $i++) {
            DB::connection('ConnKCNSales')->statement(
                'exec SP_1273_PRG_MAINT_DETAILPESANAN1 @Kode = ?,
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
                    $kode,
                    $no_spText,
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
                ],
            );
        }
        return response()->json(['message' => (string) 'Surat Pesanan ' . $no_spText . ' Sudah Dibuat!',]);
        // return redirect()->back()->with('success', 'Surat Pesanan ' . $no_sp->IDSuratPesanan . ' Sudah Dibuat!');
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'Copy') {
            $no_sp = $request->query('no_sp');
            // dd($no_sp);
            $results = DB::connection('ConnKCNSales')->select('exec SP_4384_SLS_MAINTENANCE_SURAT_PESANAN @XKode = ?, @XIdSuratPesanan = ?', [2, $no_sp]);
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
            $results = DB::connection('ConnKCNSales')->select('exec SP_4384_SLS_MAINTENANCE_SURAT_PESANAN @XKode = ?, @XIdSuratPesanan = ?', [3, $no_sp]);
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
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'PelunasanSP') {
            $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
            return view('Sales.Transaksi.SuratPesanan.PelunasanSuratPesanan', compact('access'));
        } else if ($id == 'getDataPelunasanSP') {
            $data = DB::connection('ConnKCNSales')->select('exec SP_4384_SLS_PELUNASANSP @XKode = 1');
            return datatables($data)->make(true);
        } else if ($id == 'prosesLunasSP') {
            try {
                $idPesananString = $request->input('idPesananString');
                $user = trim(Auth::user()->NomorUser);
                // dd($idPesananString);
                if (empty($idPesananString)) {
                    return response()->json([
                        'error' => 'Tidak ada item yang dipilih untuk diproses.',
                    ]);
                }

                // Eksekusi sekali dengan semua ID dalam satu string
                DB::connection('ConnKCNSales')->statement('exec SP_4384_SLS_PELUNASANSP @XKode = ?, @XIdPesananList = ?, @XNomorUser = ?', [2, $idPesananString, trim($user)]);

                return response()->json([
                    'message' => 'Proses Lunas SP Selesai!!',
                ]);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        } else if ($id == 'getLatestNomorSP') {
            $data = DB::connection('ConnKCNSales')->select('exec SP_4384_SLS_MAINTENANCE_SURAT_PESANAN @XKode = 5');
            return response()->json($data);
        }

    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        // $header_pesanan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC @IDSURATPESANAN = ?, @Kode = ?', [$id, 1]);
        // $detail_pesanan = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_DETAIL_SP @IDSURATPESANAN = ?, @Kode = ?', [$id, 5]);

        // $data = [$header_pesanan, $detail_pesanan];
        // return response()->json($data);
    }

    public function deleteDetailPesanan($idPesanan)
    {
        $cekDO = DB::connection('ConnKCNSales')->table('T_DeliveryOrder')
            ->where('IDPesanan', $idPesanan)
            ->exists();

        if ($cekDO) {
            // Cek apakah ada setidaknya satu row dengan KetBatal IS NULL
            $adaKetBatalNull = DB::connection('ConnKCNSales')->table('T_DeliveryOrder')
                ->where('IDPesanan', $idPesanan)
                ->whereNull('KetBatal')
                ->exists();

            if ($adaKetBatalNull) {
                return response()->json("Data tidak bisa dihapus karena ada DO!");
            }

            // Jika semua row KetBatal IS NOT NULL, hapus semua row di T_DeliveryOrder
            DB::connection('ConnKCNSales')->table('T_DeliveryOrder')
                ->where('IDPesanan', $idPesanan)
                ->delete();
        }

        // Jika tidak ada DO atau sudah dihapus, jalankan stored procedure
        DB::connection('ConnKCNSales')->statement('exec SP_1273_PRG_MAINT_DETAILPESANAN1 @Kode = ?, @IDPesanan = ?', [3, $idPesanan]);

        return response()->json("Data sudah terhapus dari database!");
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id = null)
    {
        // $data = $request->all();
        // dd($request->all());
        $UraianPesanan = null;
        $Lunas = null;
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
        $ppn = $request->barang8; //ppn
        $IdJnsBarang = $request->barang9; //jenis barang
        $id_pesanan = $request->barang10; //idsuratpesanan
        $kode = 2;
        //update header dulu yaa..

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

        // dd($no_spText);
        for ($i = 0; $i < count($id_pesanan); $i++) {
            // dd(is_null($id_pesanan[$i]));
            if (is_null($id_pesanan[$i])) {
                // dd('hehe1');
                DB::connection('ConnKCNSales')->statement(
                    'exec SP_1273_PRG_MAINT_DETAILPESANAN1 @Kode = ?,
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
                        $Lunas ?? null,
                        $ppn[$i],
                    ],
                );
            } else {
                DB::connection('ConnKCNSales')->statement(
                    'exec SP_1273_PRG_MAINT_DETAILPESANAN1 @Kode = ?,
            @IdPesanan = ?,
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
                        $kode,
                        $id_pesanan[$i],
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
                    ],
                );
            }
        }
        return response()->json(['message' => (string) 'Surat Pesanan ' . $no_sp . ' Sudah Diubah!',]);
        // return redirect()->back()->with('success', 'Surat Pesanan ' . $no_sp . ' Sudah Diubah!');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        // dd($id);
        DB::connection('ConnKCNSales')->statement('exec SP_1486_SLS_DEL_HEADER_DETAIL_PESANAN @IdSuratPesanan = ?', [$id]);
        return redirect()->back()->with('success', 'Surat Pesanan ' . $id . ' Sudah Dihapus!'); //->with(['success' => 'Data berhasil dihapus!']);
    }
}
