<?php

namespace App\Http\Controllers\Beli\Transaksi;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Carbon\Carbon;
use DB;
use Illuminate\Support\Facades\Auth;

class MaintenanceOrderPembelianController extends Controller
{
    // Display a listing of the resource.
    public function index(Request $request)
    {
        $idUser = trim(Auth::user()->NomorUser);
        $data = $request->query('d');
        $statusKoreksi = $request->query('s');
        $result = (new HakAksesController)->HakAksesFitur('Maintenance Order Pembelian');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        return view('Beli.Transaksi.MaintenanceOrderPembelian', compact('access', 'idUser', 'data', 'statusKoreksi'));

    }

    // public function cekNoTrans(Request $request)
    // {
    //     $No_trans = $request->input('No_trans');
    //     if ($No_trans != null) {
    //         try {
    //             $data = DB::connection('ConnPurchase')
    //             ->table('YTRANSBL')->where('YTRANSBL.No_trans', $No_trans)->get();
    //             return Response()->json($data);
    //         } catch (\Throwable $Error) {
    //             return Response()->json($Error);
    //         }
    //     } else {
    //         return Response()->json('Parameter harus di isi');
    //     }
    // }

    public function cekNoTrans(Request $request)
    {
        $No_trans = trim($request->input('No_trans'));

        if (!$No_trans) {
            return response()->json([
                'success' => false,
                'message' => 'Parameter harus di isi'
            ], 400);
        }

        $data = DB::connection('ConnPurchase')
            ->table('YTRANSBL')
            ->selectRaw("
                No_trans,
                Kd_div,
                Kd_brg,
                keterangan,
                Tgl_order,
                Qty,
                NoSatuan,
                Pemesan,
                Operator,
                Tgl_Dibutuhkan,
                StatusBeli,
                StatusOrder,
                Ket_Internal,
                Dokumentasi
            ")
            ->where('No_trans', $No_trans)
            ->first();

        if (!$data) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function kodeBarang(Request $request)
    {
        $KdBarang = $request->input('KdBarang');
        if ($KdBarang != null) {
            try {
                $data = DB::connection('ConnPurchase')->select('exec spSelect_Barang_dotNet @KdBarang = ?', [$KdBarang]);
                $imageContent = null;
                if (!empty($data[0]->FOTO)) {
                    $imageContent = base64_encode($data[0]->FOTO);
                }
                foreach ($data as $item) {
                    unset($item->FOTO);
                }
                return response()->json([
                    'data' => $data,
                    'image' => $imageContent
                ]);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function data()
    {
        $MyType = 1;
        try {
            $kategoriUtama = DB::connection('ConnPurchase')->select('exec spSelect_HirarkiTypeBarang_dotNet @MyType = ?', [$MyType]);
            $satuanList = DB::connection('ConnPurchase')->select('exec sp_list_stri');
            $divisi = DB::connection('ConnPurchase')->select('exec spSelect_UserDivisi_dotNet @Operator = ?', [trim(Auth::user()->NomorUser)]);
            return Response()->json(["kategoriUtama" => $kategoriUtama, "satuanList" => $satuanList, "divisi" => $divisi]);
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
                $data = DB::connection('ConnPurchase')->select('exec spSelect_HirarkiTypeBarang_dotNet @MyType = ?, @MyValue = ?', [$MyType, $MyValue]);
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
                $data = DB::connection('ConnPurchase')->select('exec spSelect_HirarkiTypeBarang_dotNet @MyType = ?, @MyValue = ?', [$MyType, $MyValue]);
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
                $data = DB::connection('ConnPurchase')->select('exec spSelect_HirarkiTypeBarang_dotNet @MyType = ?, @MyValue = ?', [$MyType, $MyValue]);
                return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function golongan(Request $request)
    {
        $kd_div = $request->input('kd_div');
        if ($kd_div != null) {
            try {
                $data = DB::connection('ConnPurchase')->select('exec spSelect_GolonganByDivisi_dotNet @kd_div = ?', [$kd_div]);
                return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function saldo(Request $request)
    {
        $Kode = 10;
        $KodeBarang = $request->input('KodeBarang');
        if ($KodeBarang != null) {
            try {
                $data = DB::connection('ConnInventory')->select('exec SP_1003_INV_LIST_TYPE @Kode = ?, @KodeBarang = ?', [$Kode, $KodeBarang]);
                return datatables($data)->make(true);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function mesinGolongan(Request $request)
    {
        $no_gol = $request->input('no_gol');
        if ($no_gol != null) {
            try {
                $data = DB::connection('ConnPurchase')->select('exec spSelect_MesinByGolongan_dotNet @no_gol = ?', [$no_gol]);
                return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }

    public function save(Request $request)
    {
        $Operator = trim(Auth::user()->NomorUser);
        $kd = $request->input('kd');
        $Kd_div = $request->input('Kd_div');
        $Kd_brg = $request->input('Kd_brg');
        $keterangan = $request->input('keterangan');
        $Qty = $request->input('Qty');
        $Pemesan = $request->input('Pemesan');
        $NoSatuan = $request->input('NoSatuan');
        $Tgl_Dibutuhkan = Carbon::parse($request->input('Tgl_Dibutuhkan'));
        $stBeli = $request->input('stBeli');
        $ketIn = $request->input('ketIn');
        $no_order = $request->input('no_order');

        if ($kd != null && $Kd_div != null && $Kd_brg != null && $NoSatuan != null && $Tgl_Dibutuhkan != null && $stBeli != null) {
            if ($no_order !== null) {
                DB::connection('ConnPurchase')->statement('exec SP_5409_SAVE_ORDER @Operator = ?,
                @kd = ?,
                @Kd_div = ?,
                @Kd_brg = ?,
                @keterangan = ?,
                @Qty = ?,
                @Pemesan = ?,
                @NoSatuan = ?,
                @Tgl_Dibutuhkan = ?,
                @stBeli = ?,
                @ketIn = ?,
                @noTrans = ?,
                @stOrder = ?', [
                    $Operator,
                    21,
                    $Kd_div,
                    $Kd_brg,
                    $keterangan,
                    $Qty,
                    $Pemesan,
                    $NoSatuan,
                    $Tgl_Dibutuhkan,
                    $stBeli,
                    $ketIn,
                    $no_order,
                    0
                ]);
                return response()->json(['message' => 'Data Sudah DiKoreksi!', "data" => $no_order]);
            }

            try {
                $cekInsertData = DB::connection('ConnPurchase')->select('exec SP_5409_SAVE_ORDER @Operator =?, @kd =?,@Kd_div =?,@Kd_brg =?,@keterangan =?,@Qty =?,@Pemesan =?,@NoSatuan =?, @Tgl_Dibutuhkan = ?, @stBeli=?, @ketIn = ?', [
                    $Operator,
                    3,
                    $Kd_div,
                    $Kd_brg,
                    $keterangan,
                    $Qty,
                    $Pemesan,
                    $NoSatuan,
                    $Tgl_Dibutuhkan,
                    $stBeli,
                    $ketIn
                ]);
            } catch (Exception $Ex) {
                return response()->json($Ex->getMessage(), 500);
            }

            if (count($cekInsertData) > 0) {
                return response()->json(['message' => 'Data Sudah Pernah DiTambahkan!', "data" => $cekInsertData[0]->No_trans]);
            } else {
                try {
                    $mValue = DB::connection('ConnPurchase')->table('YCounter')->value('YTRANSBL') + 1;
                    $No_trans = '00000000' . str_pad($mValue, 8, '0', STR_PAD_LEFT);
                    $No_trans = substr($No_trans, -8);

                    DB::connection('ConnPurchase')->statement('exec SP_5409_SAVE_ORDER @Operator =?, @kd =?,@Kd_div =?,@Kd_brg =?,@keterangan =?,@Qty =?,@Pemesan =?,@NoSatuan =?, @Tgl_Dibutuhkan = ?, @stBeli=?, @ketIn = ?', [
                        $Operator,
                        $kd,
                        $Kd_div,
                        $Kd_brg,
                        $keterangan,
                        $Qty,
                        $Pemesan,
                        $NoSatuan,
                        $Tgl_Dibutuhkan,
                        $stBeli,
                        $ketIn
                    ]);

                    return response()->json(['message' => 'Data Berhasil DiTambahkan!', "data" => $No_trans]);
                } catch (Exception $Ex) {
                    return response()->json($Ex->getMessage());
                }
            }
        } else {
            return response()->json('Parameter harus diisi');
        }
    }

    public function submit(Request $request)
    {
        $Operator = trim(Auth::user()->NomorUser);
        $kd = $request->input('kd');
        $Kd_div = $request->input('Kd_div');
        $Kd_brg = $request->input('Kd_brg');
        $keterangan = $request->input('keterangan');
        $Qty = $request->input('Qty');
        $Pemesan = $request->input('Pemesan');
        $NoSatuan = $request->input('NoSatuan');
        $Tgl_Dibutuhkan = Carbon::parse($request->input('Tgl_Dibutuhkan'));
        $stBeli = $request->input('stBeli');
        $ketIn = $request->input('ketIn');
        $noTrans = $request->input('noTrans');
        if (
            $kd != null && $Kd_div != null && $Kd_brg != null && $NoSatuan != null
            && $Tgl_Dibutuhkan != null && $stBeli != null && $noTrans != null
        ) {
            try {
                DB::connection('ConnPurchase')->statement('exec SP_5409_SAVE_ORDER
                @Operator = ?,
                @kd = ?,
                @Kd_div = ?,
                @Kd_brg = ?,
                @keterangan = ?,
                @Qty = ?,
                @Pemesan = ?,
                @NoSatuan = ?,
                @Tgl_Dibutuhkan = ?,
                @stBeli = ?,
                @stOrder = ?,
                @ketIn = ?,
                @noTrans = ?', [
                    $Operator,
                    21,
                    $Kd_div,
                    $Kd_brg,
                    $keterangan,
                    $Qty,
                    $Pemesan,
                    $NoSatuan,
                    $Tgl_Dibutuhkan,
                    $stBeli,
                    1,
                    $ketIn,
                    $noTrans
                ]);

                return response()->json(['message' => 'Data Berhasil DiUpdate!']);
            } catch (\Throwable $Error) {
                return response()->json($Error);
            }
        } else {
            // dd($request->all());
            return response()->json('Parameter harus diisi');
        }
    }


    public function delete(Request $request)
    {
        $kd = 7;
        $noTrans = $request->input('noTrans');
        if ($noTrans != null) {
            try {
                $data = DB::connection('ConnPurchase')->statement('exec SP_5409_SAVE_ORDER @kd =?, @noTrans = ?', [
                    $kd,
                    $noTrans
                ]);
                return response()->json(['message' => 'Berhasil DiDelete!']);
            } catch (\Throwable $Error) {
                return response()->json($Error);
            }
        } else {
            return response()->json('Parameter harus diisi');
        }
    }

    // public function uploadDokumentasi(Request $request)
    // {
    //     $request->validate([
    //         'noTrans'     => 'required|string',
    //         'attach_file' => 'required|mimes:jpg,jpeg,png,pdf|max:1536'
    //     ]);

    //     $noTrans = trim($request->noTrans);

    //     // 🔥 Cek apakah sudah ada dokumentasi
    //     $existing = DB::connection('ConnPurchase')
    //         ->table('YTRANSBL')
    //         ->select('Dokumentasi', 'DokumentasiFile')
    //         ->where('No_trans', $noTrans)
    //         ->first();

    //     if (!$existing) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'No Trans tidak ditemukan'
    //         ], 404);
    //     }

    //     // Jika salah satu sudah ada (tidak null & tidak kosong)
    //     if (
    //         (!empty($existing->Dokumentasi)) ||
    //         (!empty($existing->DokumentasiFile))
    //     ) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Dokumentasi sudah ada. Hapus terlebih dahulu sebelum upload baru.'
    //         ], 400);
    //     }

    //     $file = $request->file('attach_file');
    //     $extension = strtolower($file->getClientOriginalExtension());
    //     $binary = $file->get();
    //     $base64 = base64_encode($binary);

    //     try {

    //         if ($extension === 'pdf') {

    //             DB::connection('ConnPurchase')->statement(
    //                 'exec SP_5409_SAVE_ORDER
    //                     @kd = ?,
    //                     @noTrans = ?,
    //                     @DokumentasiFile = ?',
    //                 [20, $noTrans, $base64]
    //             );

    //         } else {

    //             DB::connection('ConnPurchase')->statement(
    //                 'exec SP_5409_SAVE_ORDER
    //                     @kd = ?,
    //                     @noTrans = ?,
    //                     @Dokumentasi = ?',
    //                 [20, $noTrans, $base64]
    //             );
    //         }

    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Dokumentasi berhasil diupload'
    //         ]);
    //     } catch (\Throwable $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => $e->getMessage()
    //         ], 500);
    //     }
    // }

    public function uploadDokumentasi(Request $request)
    {
        $request->validate([
            'noTrans' => 'required|string',
            'attach_file' => 'required|file|max:1536'
        ]);

        $noTrans = trim($request->noTrans);
        $conn = DB::connection('ConnPurchase');

        $conn->beginTransaction();

        try {

            $existing = $conn->table('YTRANSBL')
                ->where('No_trans', $noTrans)
                ->lockForUpdate()
                ->first();

            if (!$existing) {
                $conn->rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'No Trans tidak ditemukan'
                ], 404);
            }

            // hanya boleh 1 dokumentasi
            if (!is_null($existing->Dokumentasi) || !is_null($existing->DokumentasiFile)) {
                $conn->rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Dokumentasi sudah ada. Hapus terlebih dahulu.'
                ], 400);
            }

            $file = $request->file('attach_file');
            $extension = strtolower($file->getClientOriginalExtension());

            if ($extension === 'pdf') {

                // 🔴 VARBINARY
                $binary = $file->get();
                $hex = '0x' . bin2hex($binary);

                $conn->statement("
                    UPDATE YTRANSBL
                    SET DokumentasiFile = $hex
                    WHERE No_trans = ?
                ", [$noTrans]);

            } else {

                // 🔵 VARCHAR (BASE64)
                $base64 = base64_encode($file->get());

                $conn->table('YTRANSBL')
                    ->where('No_trans', $noTrans)
                    ->update([
                        'Dokumentasi' => $base64
                    ]);
            }

            $conn->commit();

            return response()->json([
                'success' => true,
                'message' => 'Dokumentasi berhasil diupload'
            ]);

        } catch (\Throwable $e) {

            $conn->rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getDokumentasi($noTrans)
    {
        $data = DB::connection('ConnPurchase')
            ->table('YTRANSBL')
            ->select('Dokumentasi', 'DokumentasiFile')
            ->where('No_trans', $noTrans)
            ->first();

        if (!$data) {
            return response('', 204);
        }

        // PDF (binary)
        if (!is_null($data->DokumentasiFile)) {
            return response($data->DokumentasiFile)
                ->header('Content-Type', 'application/pdf');
        }

        // Image (base64)
        if (!is_null($data->Dokumentasi)) {
            return response(base64_decode($data->Dokumentasi))
                ->header('Content-Type', 'image/jpeg');
        }

        return response('', 204);
    }

    public function deleteDokumentasi(Request $request)
    {
        $request->validate([
            'noTrans' => 'required|string'
        ]);

        DB::connection('ConnPurchase')->statement(
            'exec SP_5409_SAVE_ORDER
                @kd = ?,
                @noTrans = ?,
                @Dokumentasi = NULL,
                @DokumentasiFile = NULL',
            [20, trim($request->noTrans)]
        );

        return response()->json([
            'success' => true,
            'message' => 'Dokumentasi berhasil dihapus'
        ]);
    }

    public function cekDivisiPembelian(Request $request)
    {
        // dd($request->all());
        try {
            $selectedDivisi = trim($request->input('selectedDivisi'));
            $stBeli = (int) $request->input('stBeli');

            if (empty($selectedDivisi)) {
                return response()->json([
                    'allowed' => false,
                    'message' => 'Divisi belum dipilih.'
                ]);
            }

            // Jika status beli bukan 1, langsung diperbolehkan
            if ($stBeli != 1) {
                return response()->json([
                    'allowed' => true
                ]);
            }

            // Jika stBeli = 1, cek user yang memiliki hak divisi
            $cek = DB::connection('ConnPurchase')
                ->table('YUSER_DIVISI')
                ->where('Kd_div', $selectedDivisi)
                ->whereIn('kd_user', ['RUDY', 'TJAHYO'])
                ->exists();

            if ($cek) {
                return response()->json([
                    'allowed' => true
                ]);
            }

            return response()->json([
                'allowed' => false,
                'message' => 'Divisi ' . $selectedDivisi . ' belum memiliki hak ACC. Hubungi EDP untuk:<br><br>
                <ul style="text-align: left;">
                    <li>Tambah YUSER_DIVISI</li>
                    <li>Update Stored Procedure</li>
                    <li>Update Laravel</li>
                </ul>'
            ]);

        } catch (\Throwable $Error) {
            return response()->json([
                'allowed' => false,
                'message' => $Error->getMessage()
            ]);
        }
    }

}
