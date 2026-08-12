<?php

namespace App\Http\Controllers\Beli\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Illuminate\Support\Facades\Auth;

class MaintenanceKodeBarangController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {

        $result = (new HakAksesController)->HakAksesFitur('Maintenance Kode Barang');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        // $counterBrg = DB::connection('ConnPurchase')->table('YCOUNTER')->select('Y_BARANG')->get();
        // dd(intval($counterBrg[0]->Y_BARANG) + 1);
        if ($result > 0) {
            return view('Beli.Master.MaintenanceKodeBarang', compact('access'));
        } else {
            abort(403);
        }
    }

    public function kodeBarang(Request $request)
    {
        $kodeBarang = $request->input('kodeBarang');
        try {
            $data = DB::connection('ConnPurchase')->select('exec sp_List_Barang_new @KdBarang = ?', [$kodeBarang]);
            return Response()->json($data);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }
    public function data()
    {
        $MyType = 1;
        try {
            $kategoriUtama = DB::connection('ConnPurchase')->select('exec SP_MOHON_BELI @MyType = ?', [$MyType]);
            $jenisPembelian = DB::connection('ConnPurchase')->select('exec spSelect_Jenis_Pembelian');
            $satuanList = DB::connection('ConnPurchase')->select('exec sp_list_stri');
            $spek = DB::connection('ConnPurchase')->select('exec spSelect_GeneralSpec_dotNet ');
            return Response()->json(["kategoriUtama" => $kategoriUtama, "jenisPembelian" => $jenisPembelian, "satuanList" => $satuanList, "spek" => $spek]);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }
    public function kategori(Request $request)
    {
        $MyType = 2;
        $MyValue = $request->input('MyValue');
        if ($MyValue != null) {
            try {
                $data = DB::connection('ConnPurchase')->select('exec SP_MOHON_BELI @MyType = ?, @MyValue = ?', [$MyType, $MyValue]);
                return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function subKategori(Request $request)
    {
        $MyType = 3;
        $MyValue = $request->input('MyValue');
        if ($MyValue != null) {
            try {
                $data = DB::connection('ConnPurchase')->select('exec SP_MOHON_BELI @MyType = ?, @MyValue = ?', [$MyType, $MyValue]);
                return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function namaBarang(Request $request)
    {
        $MyType = 5;
        $MyValue = $request->input('MyValue');
        if ($MyValue != null) {
            try {
                $data = DB::connection('ConnPurchase')->select('exec SP_MOHON_BELI @MyType = ?, @MyValue = ?', [$MyType, $MyValue]);
                return datatables($data)->make(true);
                // return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function tambahKategori(Request $request)
    {
        $no_kat_utama = $request->input('no_kat_utama');
        $nama_kategori = $request->input('nama_kategori');
        if ($no_kat_utama != null && $nama_kategori != null) {
            try {
                $data = DB::connection('ConnPurchase')->statement('exec spInsert_Kategori_dotNet @no_kat_utama = ?, @nama_kategori = ?', [$no_kat_utama, $nama_kategori]);
                return Response()->json(['message' => 'Data berhasil ditambahkan']);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function tambahSubKategori(Request $request)
    {
        $no_kategori = $request->input('no_kategori');
        $nama_sub_kategori = $request->input('nama_sub_kategori');
        if ($no_kategori != null && $nama_sub_kategori != null) {
            try {
                $data = DB::connection('ConnPurchase')->statement('exec spInsert_SubKategori_dotNet @no_kategori = ?, @nama_sub_kategori = ?', [$no_kategori, $nama_sub_kategori]);
                return Response()->json(['message' => 'Data berhasil ditambahkan']);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function cekNamaBarang(Request $request)
    {
        $namaBarang = $request->input('namaBarang');
        if ($namaBarang == null) {
            $namaBarang = '';
        }
        try {
            $data = DB::connection('ConnPurchase')
                ->table('Y_BARANG')
                ->select('Y_BARANG.KD_BRG', 'Y_BARANG.NAMA_BRG', 'Y_KATEGORI_SUB.nama_sub_kategori')
                ->join('Y_KATEGORI_SUB', 'Y_BARANG.NO_SUB_KATEGORI', '=', 'Y_KATEGORI_SUB.no_sub_kategori')
                ->where('Y_BARANG.NAMA_BRG', 'like', $namaBarang . '%')->get();
            // dd($data);
            return datatables($data)->make(true);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }
    public function isi(Request $request)
    {
        $USERINPUT = trim(Auth::user()->NomorUser);
        $Kriteria = $request->input('Kriteria');
        $Jenis_Pembelian = $request->input('Jenis_Pembelian');
        $BrgSama = $request->input('BrgSama');
        $KodeBrgAslinya = $request->input('KodeBrgAslinya');
        $NO_SUB_KATEGORI = $request->input('NO_SUB_KATEGORI');
        $NAMA_BRG = $request->input('NAMA_BRG');
        $KET = $request->input('KET') ?? ' ';
        $KET_KHUSUS = $request->input('KET_KHUSUS');
        $ST_TRI = $request->input('ST_TRI');
        $ST_SEK = $request->input('ST_SEK');
        $ST_PRIM = $request->input('ST_PRIM');
        $NO_SATUAN_UMUM = $request->input('NO_SATUAN_UMUM');
        $ROUND = $request->input('ROUND');
        $D_Tek0 = $request->input('D_Tek0');
        $D_Tek1 = $request->input('D_Tek1');
        $D_Tek2 = $request->input('D_Tek2');
        $D_Tek3 = $request->input('D_Tek3');
        $D_Tek4 = $request->input('D_Tek4');
        $D_Tek5 = $request->input('D_Tek5');
        $D_Tek6 = $request->input('D_Tek6');
        $D_Tek7 = $request->input('D_Tek7');
        $D_Tek8 = $request->input('D_Tek8');
        $D_Tek9 = $request->input('D_Tek9');
        $D_Tek10 = $request->input('D_Tek10');
        $D_Tek11 = $request->input('D_Tek11');
        $D_Tek12 = $request->input('D_Tek12');
        $D_Tek13 = $request->input('D_Tek13');
        $Ket_Tek0 = $request->input('Ket_Tek0');
        $Ket_Tek1 = $request->input('Ket_Tek1');
        $KdSpec = $request->input('KdSpec');
        $Penjaluk = $request->input('Penjaluk');
        $Barang_Export = $request->input('Barang_Export');

        if ($Kriteria != null && $Jenis_Pembelian != null) {
            try {
                $counterBrg = DB::connection('ConnPurchase')->table('YCOUNTER')->select('Y_BARANG')->get();
                $counterBrg = intval($counterBrg[0]->Y_BARANG) + 1;
                $chrCounterBrg = str_pad($counterBrg, 9, '0', STR_PAD_LEFT);
                if ($BrgSama == "N") {
                    $chrCounterBrg = $Kriteria . $Jenis_Pembelian . substr($chrCounterBrg, -7);
                } else {
                    $chrCounterBrg = $Kriteria . $Jenis_Pembelian . substr($KodeBrgAslinya, -7);
                }

                $data = DB::connection('ConnPurchase')->statement('exec SpInsert_TypeBarang_dotNet @USERINPUT =?, @Kriteria =?,@Jenis_Pembelian =?,@BrgSama =?,@KodeBrgAslinya =?,@NO_SUB_KATEGORI =?,@NAMA_BRG =?,@KET =?,@KET_KHUSUS =?,@ST_TRI =?,@ST_SEK =?,@ST_PRIM =?,@NO_SATUAN_UMUM =?,@ROUND =?,@D_Tek0 =?,@D_Tek1 =?,@D_Tek2 =?,@D_Tek3 =?,@D_Tek4 =?,@D_Tek5 =?,@D_Tek6 =?,@D_Tek7 =?,@D_Tek8 =?,@D_Tek9 =?,@D_Tek10 =?,@D_Tek11 =?,@D_Tek12 =?,@D_Tek13 =?,@Ket_Tek0 =?,@Ket_Tek1 =?,@KdSpec =?,@Penjaluk =?,@Barang_Export =?', [
                    $USERINPUT,
                    $Kriteria,
                    $Jenis_Pembelian,
                    $BrgSama,
                    $KodeBrgAslinya,
                    $NO_SUB_KATEGORI,
                    $NAMA_BRG,
                    $KET,
                    $KET_KHUSUS,
                    $ST_TRI,
                    $ST_SEK,
                    $ST_PRIM,
                    $NO_SATUAN_UMUM,
                    $ROUND,
                    $D_Tek0,
                    $D_Tek1,
                    $D_Tek2,
                    $D_Tek3,
                    $D_Tek4,
                    $D_Tek5,
                    $D_Tek6,
                    $D_Tek7,
                    $D_Tek8,
                    $D_Tek9,
                    $D_Tek10,
                    $D_Tek11,
                    $D_Tek12,
                    $D_Tek13,
                    $Ket_Tek0,
                    $Ket_Tek1,
                    $KdSpec,
                    $Penjaluk,
                    $Barang_Export
                ]);

                $data = DB::connection('ConnKCNPurchase')->statement('exec SpInsert_TypeBarang_dotNet @USERINPUT =?, @Kriteria =?,@Jenis_Pembelian =?,@BrgSama =?,@KodeBrgAslinya =?,@NO_SUB_KATEGORI =?,@NAMA_BRG =?,@KET =?,@KET_KHUSUS =?,@ST_TRI =?,@ST_SEK =?,@ST_PRIM =?,@NO_SATUAN_UMUM =?,@ROUND =?,@D_Tek0 =?,@D_Tek1 =?,@D_Tek2 =?,@D_Tek3 =?,@D_Tek4 =?,@D_Tek5 =?,@D_Tek6 =?,@D_Tek7 =?,@D_Tek8 =?,@D_Tek9 =?,@D_Tek10 =?,@D_Tek11 =?,@D_Tek12 =?,@D_Tek13 =?,@Ket_Tek0 =?,@Ket_Tek1 =?,@KdSpec =?,@Penjaluk =?,@Barang_Export =?', [
                    $USERINPUT,
                    $Kriteria,
                    $Jenis_Pembelian,
                    $BrgSama,
                    $KodeBrgAslinya,
                    $NO_SUB_KATEGORI,
                    $NAMA_BRG,
                    $KET,
                    $KET_KHUSUS,
                    $ST_TRI,
                    $ST_SEK,
                    $ST_PRIM,
                    $NO_SATUAN_UMUM,
                    $ROUND,
                    $D_Tek0,
                    $D_Tek1,
                    $D_Tek2,
                    $D_Tek3,
                    $D_Tek4,
                    $D_Tek5,
                    $D_Tek6,
                    $D_Tek7,
                    $D_Tek8,
                    $D_Tek9,
                    $D_Tek10,
                    $D_Tek11,
                    $D_Tek12,
                    $D_Tek13,
                    $Ket_Tek0,
                    $Ket_Tek1,
                    $KdSpec,
                    $Penjaluk,
                    $Barang_Export
                ]);
                return response()->json(['message' => 'Data berhasil ditambahkan', "kd" => $chrCounterBrg]);
            } catch (\Throwable $Error) {
                return response()->json($Error);
            }
        } else {
            return response()->json('Parameter harus diisi');
        }
    }

    public function koreksi(Request $request)
    {
        $USERKOREKSI = trim(Auth::user()->NomorUser);
        $KD_BRG = $request->input('KD_BRG');
        $NO_SUB_KATEGORI = $request->input('NO_SUB_KATEGORI');
        $NAMA_BRG = $request->input('NAMA_BRG');
        $KET = $request->input('KET');
        $KET_KHUSUS = $request->input('KET_KHUSUS');
        $ST_TRI = $request->input('ST_TRI');
        $ST_SEK = $request->input('ST_SEK');
        $ST_PRIM = $request->input('ST_PRIM');
        $NO_SATUAN_UMUM = $request->input('NO_SATUAN_UMUM');
        $ROUND = $request->input('ROUND');
        $D_Tek0 = $request->input('D_Tek0');
        $D_Tek1 = $request->input('D_Tek1');
        $D_Tek2 = $request->input('D_Tek2');
        $D_Tek3 = $request->input('D_Tek3');
        $D_Tek4 = $request->input('D_Tek4');
        $D_Tek5 = $request->input('D_Tek5');
        $D_Tek6 = $request->input('D_Tek6');
        $D_Tek7 = $request->input('D_Tek7');
        $D_Tek8 = $request->input('D_Tek8');
        $D_Tek9 = $request->input('D_Tek9');
        $D_Tek10 = $request->input('D_Tek10');
        $D_Tek11 = $request->input('D_Tek11');
        $D_Tek12 = $request->input('D_Tek12');
        $D_Tek13 = $request->input('D_Tek13');
        $Ket_Tek0 = $request->input('Ket_Tek0');
        $Ket_Tek1 = $request->input('Ket_Tek1');
        $KdSpec = $request->input('KdSpec');
        $Penjaluk = $request->input('Penjaluk');
        $Barang_Export = $request->input('Barang_Export');

        $cekDatabaseKCN = DB::connection('ConnKCNPurchase')
            ->selectOne("SELECT DB_NAME() AS DatabaseName");

        // dd([
        //     'DatabaseKCN' => $cekDatabaseKCN->DatabaseName,
        //     'KD_BRG' => $KD_BRG,
        //     'KET' => $KET,
        // ]);

        if ($KD_BRG != null) {
            try {
                $data = DB::connection('ConnPurchase')->statement('exec spKoreksi_TypeBarang_dotNet @USERKOREKSI =?,@KD_BRG =?,@NO_SUB_KATEGORI =?,@NAMA_BRG =?,@KET =?,@KET_KHUSUS =?,@ST_TRI =?,@ST_SEK =?,@ST_PRIM =?,@NO_SATUAN_UMUM =?,@ROUND =?,@D_Tek0 =?,@D_Tek1 =?,@D_Tek2 =?,@D_Tek3 =?,@D_Tek4 =?,@D_Tek5 =?,@D_Tek6 =?,@D_Tek7 =?,@D_Tek8 =?,@D_Tek9 =?,@D_Tek10 =?,@D_Tek11 =?,@D_Tek12 =?,@D_Tek13 =?,@Ket_Tek0 =?,@Ket_Tek1 =?,@KdSpec =?,@Penjaluk =?,@Barang_Export =?', [
                    $USERKOREKSI,
                    $KD_BRG,
                    $NO_SUB_KATEGORI,
                    $NAMA_BRG,
                    $KET,
                    $KET_KHUSUS,
                    $ST_TRI,
                    $ST_SEK,
                    $ST_PRIM,
                    $NO_SATUAN_UMUM,
                    $ROUND,
                    $D_Tek0,
                    $D_Tek1,
                    $D_Tek2,
                    $D_Tek3,
                    $D_Tek4,
                    $D_Tek5,
                    $D_Tek6,
                    $D_Tek7,
                    $D_Tek8,
                    $D_Tek9,
                    $D_Tek10,
                    $D_Tek11,
                    $D_Tek12,
                    $D_Tek13,
                    $Ket_Tek0,
                    $Ket_Tek1,
                    $KdSpec,
                    $Penjaluk,
                    $Barang_Export
                ]);
                $data = DB::connection('ConnKCNPurchase')->statement('exec spKoreksi_TypeBarang_dotNet @USERKOREKSI =?,@KD_BRG =?,@NO_SUB_KATEGORI =?,@NAMA_BRG =?,@KET =?,@KET_KHUSUS =?,@ST_TRI =?,@ST_SEK =?,@ST_PRIM =?,@NO_SATUAN_UMUM =?,@ROUND =?,@D_Tek0 =?,@D_Tek1 =?,@D_Tek2 =?,@D_Tek3 =?,@D_Tek4 =?,@D_Tek5 =?,@D_Tek6 =?,@D_Tek7 =?,@D_Tek8 =?,@D_Tek9 =?,@D_Tek10 =?,@D_Tek11 =?,@D_Tek12 =?,@D_Tek13 =?,@Ket_Tek0 =?,@Ket_Tek1 =?,@KdSpec =?,@Penjaluk =?,@Barang_Export =?', [
                    $USERKOREKSI,
                    $KD_BRG,
                    $NO_SUB_KATEGORI,
                    $NAMA_BRG,
                    $KET,
                    $KET_KHUSUS,
                    $ST_TRI,
                    $ST_SEK,
                    $ST_PRIM,
                    $NO_SATUAN_UMUM,
                    $ROUND,
                    $D_Tek0,
                    $D_Tek1,
                    $D_Tek2,
                    $D_Tek3,
                    $D_Tek4,
                    $D_Tek5,
                    $D_Tek6,
                    $D_Tek7,
                    $D_Tek8,
                    $D_Tek9,
                    $D_Tek10,
                    $D_Tek11,
                    $D_Tek12,
                    $D_Tek13,
                    $Ket_Tek0,
                    $Ket_Tek1,
                    $KdSpec,
                    $Penjaluk,
                    $Barang_Export
                ]);
                return response()->json(['message' => 'Data berhasil ditambahkan']);
            } catch (\Throwable $Error) {
                return response()->json($Error);
            }
        } else {
            return response()->json('Parameter harus diisi');
        }
    }
    public function prosesHapus(Request $request)
    {
        $USERDELETE = trim(Auth::user()->NomorUser);
        $KD_BRG0 = $request->input('KD_BRG0');

        if ($KD_BRG0 != null) {
            try {
                $result = DB::connection('ConnPurchase')->statement('exec spDelete2_TypeBarang_dotNet @USERDELETE =?,@KD_BRG0 =?', [
                    $USERDELETE,
                    $KD_BRG0
                ]);
                $resultHapus = DB::connection('ConnPurchase')->statement('exec spDelete_TypeBarang_dotNet @KD_BRG =?', [
                    $KD_BRG0
                ]);
                 $resultKCN = DB::connection('ConnKCNPurchase')->statement(
                    'exec spDelete2_TypeBarang_dotNet @USERDELETE =?, @KD_BRG0 =?',
                    [
                        $USERDELETE,
                        $KD_BRG0
                    ]
                );

                $resultHapusKCN = DB::connection('ConnKCNPurchase')->statement(
                    'exec spDelete_TypeBarang_dotNet @KD_BRG =?',
                    [
                        $KD_BRG0
                    ]
                );
                if ($resultHapus && $resultHapusKCN) {
                    if ($result && $resultKCN) {
                        return response()->json([
                            'message' => 'Data berhasil dihapus dari ConnPurchase dan ConnKCNPurchase'
                        ]);
                    } else {
                        return response()->json([
                            'message' => 'Data gagal dibackup'
                        ]);
                    }

                } else {
                    return response()->json([
                        'message' => 'GAGAL dihapus'
                    ]);
                }
            } catch (\Throwable $Error) {
                return response()->json($Error);
            }
        } else {
            return response()->json('Parameter harus diisi');
        }
    }
}
