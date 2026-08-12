<?php

namespace App\Http\Controllers\Kencana;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;

class PermohonanPembelianController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.PermohonanPembelian.index', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'KdDiv' => 'required',
            'KdBarang' => 'required',
            'Qty' => 'required',
            'Pemesan' => 'required',
            'TglButuh' => 'required|date',

            'DokumentasiFile' => [
                'nullable',
                'array'
            ],

            'DokumentasiFile.*' => [
                'file',
                'mimes:jpg,jpeg,png,webp,pdf',
                'max:10240'
            ],
        ]);

        $db = DB::connection('ConnKCNPurchase');

        return $db->transaction(function () use ($request, $db) {

            // ==========================================================
            // Ambil nomor transaksi
            // ==========================================================

            $counter = $db->table('YCounter')
                ->lockForUpdate()
                ->value('YTRANSBL');

            $noTrans = str_pad(
                ((int) $counter + 1),
                8,
                '0',
                STR_PAD_LEFT
            );


            // ==========================================================
            // Jalankan SP LAMA - TIDAK DIUBAH
            // ==========================================================

            $db->statement(
                'EXEC spInsert_Permohonan_dotNet
                    @Kd_div=?,
                    @Kd_brg=?,
                    @keterangan=?,
                    @Qty=?,
                    @NoSatuan=?,
                    @Pemesan=?,
                    @No_gol=?,
                    @No_msn=?,
                    @Operator=?,
                    @Tgl_Dibutuhkan=?',
                [
                    $request->KdDiv,
                    $request->KdBarang,
                    $request->KetOrder,
                    $request->Qty,
                    $request->NoSatuan,
                    $request->Pemesan,
                    $request->Golongan,
                    $request->Mesin,
                    auth()->user()->NomorUser,
                    $request->TglButuh,
                ]
            );


            // ==========================================================
            // SIMPAN MULTIPLE DOKUMENTASI
            // ==========================================================

            if ($request->hasFile('DokumentasiFile')) {

                $files = $request->file('DokumentasiFile');

                $dokumentasi = [];

                foreach ($files as $file) {

                    $dokumentasi[] = [
                        'nama' => $file->getClientOriginalName(),
                        'mime' => $file->getMimeType(),
                        'data' => base64_encode(
                            file_get_contents($file->getRealPath())
                        ),
                    ];
                }


                // ======================================================
                // JSON
                // ======================================================

                $json = json_encode(
                    $dokumentasi,
                    JSON_UNESCAPED_SLASHES
                );

                $hex = bin2hex($json);

                $db->statement(
                    'UPDATE YTRANSBL
                    SET DokumentasiFile =
                        CONVERT(VARBINARY(MAX), ?, 2)
                    WHERE No_trans = ?',
                    [
                        $hex,
                        $noTrans
                    ]
                );
            }


            return response()->json([
                'success' => true,
                'message' => 'Permohonan berhasil disimpan.'
            ]);
        });
    }

    public function show(Request $request, $id)
    {

        if ($id == 'getDivisi') {
            // dd(DB::connection('ConnKCNPurchase')->getConfig());
            $divisi = DB::connection('ConnKCNPurchase')->select(
                'exec spSelect_UserDivisi_dotNet @Operator = ?',
                [auth()->user()->NomorUser]
            );

            return response()->json($divisi);

        } else if ($id == 'getData') {

            $data = DB::connection('ConnKCNPurchase')->select(
                'exec spSelect_Permohonan
                    @MinDate = ?,
                    @MaxDate = ?,
                    @Kd_Div = ?,
                    @Operator = ?',
                [
                    $request->MinDate,
                    $request->MaxDate,
                    $request->Kd_Div,
                    $request->filled('Operator') ? $request->Operator : null,
                ]
            );

            // dd($data[0]);

            return datatables($data)->make(true);

        } else if ($id == 'getDetail') {
            $detail = DB::connection('ConnKCNPurchase')
                ->table('YTRANSBL as YT')
                ->leftJoin('Y_BARANG as YB', 'YT.Kd_brg', '=', 'YB.KD_BRG')
                ->leftJoin('Y_KATEGORI_SUB as YKS', 'YB.NO_SUB_KATEGORI', '=', 'YKS.no_sub_kategori')
                ->leftJoin('Y_KATEGORY as YK', 'YKS.no_kategori', '=', 'YK.no_kategori')
                ->leftJoin('Y_KATEGORI_UTAMA as YKU', 'YK.no_kat_utama', '=', 'YKU.no_kat_utama')
                ->leftJoin('YGOL as YG', 'YT.No_gol', '=', 'YG.NO_GOL')
                ->leftJoin('YMESIN as YM', 'YT.No_msn', '=', 'YM.NO_MSN')
                ->select([
                    'YT.No_trans',
                    'YT.No_sppb',
                    'YT.keterangan as KetPemesan',
                    'YT.Pemesan',
                    'YT.Operator',
                    'YT.Manager',
                    'YT.Tgl_acc',
                    'YT.Direktur',
                    'YT.Tgl_Direktur',
                    'YT.Batal_acc',
                    'YT.Tgl_batal_Acc',
                    'YB.KET as KetBarang',
                    'YG.NM_GOL as GolMesin',
                    'YM.NM_MSN as NamaMesin',
                    'YKS.nama_sub_kategori as SubKategori',
                    'YK.nama_kategori as Kategori',
                    'YKU.nama as KategoriUtama'
                ])

                ->where('YT.No_trans', $request->No_Trans)
                ->first();

            if (!$detail) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan.'
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $detail
            ]);
        } else if ($id == 'getBarang') {
            $barang = DB::connection('ConnKCNPurchase')->selectOne(
                'exec spSelect_Barang_dotNet @KdBarang=?',
                [$request->KdBarang]
            );

            if (!$barang) {
                return response()->json([
                    'success' => false,
                    'message' => 'Barang tidak ditemukan.'
                ]);
            }

            /*
            |------------------------------------------------------------
            | Cek Warehouse
            |------------------------------------------------------------
            */
            if ($barang->no_kat_utama != '009') {
                $warehouse = DB::connection('ConnKCNPurchase')->selectOne(
                    'exec spCek_Barang_diWarehouse_dotNet
                        @kd_div=?,
                        @kd_brg=?',
                    [
                        $request->KdDiv,
                        $request->KdBarang
                    ]
                );

                if ($warehouse && $warehouse->Return_Status == 0) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Barang belum ada di Warehouse.'
                    ]);

                }
            }

            /*
            |------------------------------------------------------------
            | Saldo
            |------------------------------------------------------------
            */

            $kode = 1;

            if ($request->KdDiv == 'KRR') {
                $kode = 2;
            } elseif ($request->KdDiv == 'SPM') {
                $kode = 3;
            }

            $saldo = DB::connection('ConnKCNPurchase')->selectOne(
                'exec SP_7775_PBL_LIST_TYPE_SALDO_INV
                    @kd_brg=?,
                    @Kode=?',
                [
                    $request->KdBarang,
                    $kode
                ]
            );

            // dd($saldo);

            if (!$saldo) {
                $saldo = (object)[
                    'saldoprimer'   => 0,
                    'saldosekunder' => 0,
                    'saldotritier'  => 0,
                    'primer'        => 'Null',
                    'sekunder'      => 'Null',
                    'tritier'       => 'Null',
                ];
            }

            /*
            |------------------------------------------------------------
            | Foto -> Base64
            |------------------------------------------------------------
            */

            $foto = null;

            if (!empty($barang->FOTO)) {
                $foto = base64_encode($barang->FOTO);
            }

            /*
            |------------------------------------------------------------
            | Return JSON
            |------------------------------------------------------------
            */


            return response()->json([
                'success' => true,
                'data' => [
                    'KdBarang'      => $request->KdBarang,
                    'KategoriUtama' => $barang->nama,
                    'Kategori'      => $barang->nama_kategori,
                    'SubKategori'   => $barang->nama_sub_kategori,
                    'KetKhusus'     => $barang->KET_KHUSUS,
                    'NamaBarang'    => $barang->NAMA_BRG,
                    'KetBarang'     => $barang->KET,
                    'Foto'          => $foto,
                    'Primer'        => $saldo->SaldoPrimer,
                    'SatPrimer'     => trim($saldo->Primer),
                    'Sekunder'      => $saldo->SaldoSekunder,
                    'SatSekunder'   => trim($saldo->Sekunder),
                    'Tritier'       => $saldo->SaldoTritier,
                    'SatTritier'    => trim($saldo->Tritier),
                    'NoSatuan'   => $barang->NO_SATUAN_UMUM,
                    'NamaSatuan'    => $barang->Nama_satuan
                ]
            ]);
        } else if ($id == 'getGolongan') {

            $golongan = DB::connection('ConnKCNPurchase')->select(
                'exec spSelect_GolonganByDivisi_dotNet @kd_div = ?',
                [
                    $request->KdDiv
                ]
            );

            return response()->json([
                'success' => true,
                'data' => $golongan
            ]);

        } else if ($id == 'getMesin') {

            $mesin = DB::connection('ConnKCNPurchase')->select(
                'exec spSelect_MesinByGolongan_dotNet @no_gol = ?',
                [
                    $request->NoGol
                ]
            );

            return response()->json([
                'success' => true,
                'data' => $mesin
            ]);
        } else if ($id == 'getKoreksi') {
            /*
            |------------------------------------------------------------
            | Cek Data Transaksi
            |------------------------------------------------------------
            */

            $trans = DB::connection('ConnKCNPurchase')
                ->table('YTRANSBL')
                ->select(
                    'Operator',
                    'Manager',
                    'Direktur',
                    'Tgl_acc',
                    'Tgl_Direktur',
                    'Tgl_Dibutuhkan',
                    'DokumentasiFile'
                )
                ->where('No_trans', $request->NoTrans)
                ->first();

            if (!$trans) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan.'
                ]);
            }

            /*
            |------------------------------------------------------------
            | Cek Operator
            |------------------------------------------------------------
            */

            if (trim($trans->Operator) != trim(auth()->user()->NomorUser)) {

                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak boleh dikoreksi karena bukan Anda yang input.'
                ]);
            }

            /*
            |------------------------------------------------------------
            | Cek Status ACC
            |------------------------------------------------------------
            */

            if (!empty($trans->Tgl_acc) || !empty($trans->Tgl_Direktur)) {

                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak boleh dikoreksi karena sudah di-ACC.'
                ]);
            }

            /*
            |------------------------------------------------------------
            | Ambil Data Edit
            |------------------------------------------------------------
            */

            $data = DB::connection('ConnKCNPurchase')->selectOne(
                'exec spSelect_EditPermohonan_dotNet @noTrans=?',
                [$request->NoTrans]
            );

            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan.'
                ]);
            }

            /*
            |------------------------------------------------------------
            | Foto
            |------------------------------------------------------------
            */

            $foto = null;

            if (!empty($data->FOTO)) {
                $foto = base64_encode($data->FOTO);
            }

            $dokumentasi = [];
                if (!empty($trans->DokumentasiFile)) {

                    $binary = $trans->DokumentasiFile;

                    // Jika SQL Server mengembalikan resource
                    if (is_resource($binary)) {
                        $binary = stream_get_contents($binary);
                    }

                    // Pastikan menjadi string
                    $binary = (string) $binary;

                    // Coba decode langsung
                    $dokumentasi = json_decode(
                        $binary,
                        true
                    );

                    // Jika gagal, kemungkinan data tersimpan sebagai UTF-16
                    if (!is_array($dokumentasi)) {

                        $utf8 = mb_convert_encoding(
                            $binary,
                            'UTF-8',
                            'UTF-16LE'
                        );

                        $dokumentasi = json_decode(
                            $utf8,
                            true
                        );
                    }

                    // Jika tetap gagal
                    if (!is_array($dokumentasi)) {
                        $dokumentasi = [];
                    }
                }

            /*
            |------------------------------------------------------------
            | Return
            |------------------------------------------------------------
            */

            return response()->json([
                'success' => true,
                'data' => [

                    'NoTrans' => $data->No_trans,

                    'KdBarang' => $data->KD_BRG,

                    'NoKategoriUtama' => $data->no_kat_utama,
                    'KategoriUtama' => trim($data->nama),

                    'NoKategori' => $data->no_kategori,
                    'Kategori' => trim($data->nama_kategori),

                    'NoSubKategori' => $data->no_sub_kategori,
                    'SubKategori' => trim($data->nama_sub_kategori),

                    'NamaBarang' => trim($data->NAMA_BRG),
                    'KetBarang' => trim($data->KET),

                    'NoGol' => $data->NO_GOL,
                    'Golongan' => trim($data->NM_GOL),

                    'NoMesin' => $data->NO_MSN,
                    'Mesin' => trim($data->NM_MSN),

                    'Keterangan' => $data->keterangan,
                    'Qty' => $data->Qty,

                    'NoSatuan' => $data->NoSatuan,
                    'NamaSatuan' => trim($data->Nama_satuan),

                    'Pemesan' => $data->Pemesan,

                    // Diambil dari YTRANSBL
                    'TglDibutuhkan' => optional($trans->Tgl_Dibutuhkan)
                        ? date('Y-m-d', strtotime($trans->Tgl_Dibutuhkan))
                        : null,

                    'Foto' => $foto,
                    'DokumentasiFile' => $dokumentasi
                ]
            ]);
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        // ==========================================================
        // VALIDASI
        // ==========================================================

        $request->validate([
            'KdBarang' => 'required',
            'Qty' => 'required',
            'Pemesan' => 'required',
            'TglButuh' => 'required|date',

            'DokumentasiFile' => [
                'nullable',
                'array'
            ],

            'DokumentasiFile.*' => [
                'file',
                'mimes:jpg,jpeg,png,webp,pdf',
                'max:10240'
            ],
        ]);


        // ==========================================================
        // CONNECTION
        // ==========================================================

        $db = DB::connection('ConnKCNPurchase');


        // ==========================================================
        // UPDATE DATA PERMOHONAN
        // SP TETAP TIDAK DIUBAH
        // ==========================================================

        $db->statement(
            'EXEC spUpdate_Permohonan_dotNet
                @Kd_brg=?,
                @keterangan=?,
                @Qty=?,
                @NoSatuan=?,
                @Pemesan=?,
                @No_gol=?,
                @No_msn=?,
                @Operator=?,
                @Tgl_Dibutuhkan=?,
                @No_trans=?',
            [
                $request->KdBarang,
                $request->KetOrder,
                $request->Qty,
                $request->NoSatuan,
                $request->Pemesan,
                $request->Golongan,
                $request->Mesin,
                auth()->user()->NomorUser,
                $request->TglButuh,
                $id
            ]
        );


        // ==========================================================
        // UPDATE DOKUMENTASI
        // ==========================================================

        // File lama yang masih dipertahankan
        $dokumentasi = json_decode(
            $request->input('DokumentasiLama', '[]'),
            true
        );

        if (!is_array($dokumentasi)) {
            $dokumentasi = [];
        }


        // ==========================================================
        // TAMBAHKAN FILE BARU
        // ==========================================================

        if ($request->hasFile('DokumentasiFile')) {

            foreach ($request->file('DokumentasiFile') as $file) {

                $dokumentasi[] = [
                    'nama' => $file->getClientOriginalName(),
                    'mime' => $file->getMimeType(),
                    'data' => base64_encode(
                        file_get_contents($file->getRealPath())
                    ),
                ];
            }
        }


        // ==========================================================
        // SIMPAN DOKUMENTASI
        // ==========================================================

        if (
            $request->has('DokumentasiLama') ||
            $request->hasFile('DokumentasiFile')
        ) {

            $json = json_encode(
                $dokumentasi,
                JSON_UNESCAPED_SLASHES
            );

            $hex = bin2hex($json);

            $db->statement(
                'UPDATE YTRANSBL
                SET DokumentasiFile = CONVERT(VARBINARY(MAX), ?, 2)
                WHERE No_trans = ?',
                [
                    $hex,
                    $id
                ]
            );
        }


        // ==========================================================
        // RESPONSE
        // ==========================================================

        return response()->json([
            'success' => true,
            'message' => 'Permohonan berhasil dikoreksi.'
        ]);
    }

   public function destroy($id)
    {
        /*
        |----------------------------------------------------------
        | Cek Data
        |----------------------------------------------------------
        */

        $trans = DB::connection('ConnKCNPurchase')
            ->table('YTRANSBL')
            ->select(
                'Operator',
                'Tgl_acc',
                'Tgl_Direktur'
            )
            ->where('No_trans', $id)
            ->first();

        if (!$trans) {

            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan.'
            ],404);

        }

        /*
        |----------------------------------------------------------
        | Cek Operator
        |----------------------------------------------------------
        */

        if (trim($trans->Operator) != trim(auth()->user()->NomorUser)) {

            return response()->json([
                'success' => false,
                'message' => 'Data tidak boleh dihapus karena bukan Anda yang input.'
            ],422);

        }

        /*
        |----------------------------------------------------------
        | Cek ACC
        |----------------------------------------------------------
        */

        if (!empty($trans->Tgl_acc) || !empty($trans->Tgl_Direktur)) {

            return response()->json([
                'success' => false,
                'message' => 'Data tidak boleh dihapus karena sudah di-ACC.'
            ],422);

        }

        /*
        |----------------------------------------------------------
        | Hapus
        |----------------------------------------------------------
        */

        DB::connection('ConnKCNPurchase')->statement(
            'EXEC spDelete_Permohonan_dotNet @No_Trans=?',
            [
                $id
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Permohonan berhasil dihapus.'
        ]);
    }
}
