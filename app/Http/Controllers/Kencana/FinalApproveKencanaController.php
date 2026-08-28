<?php

namespace App\Http\Controllers\Kencana;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FinalApproveKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.FinalApprove.index', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $action = $request->input('action');

        $checkedBOX = $request->input('checkedBOX', []);

        // ==========================================
        // VALIDASI ACTION
        // ==========================================
        if (!in_array($action, ['Approve', 'Cancel'])) {

            return response()->json([
                'error' => 'Action tidak valid.'
            ], 400);
        }

        // ==========================================
        // VALIDASI DATA DIPILIH
        // ==========================================
        if (!is_array($checkedBOX) || count($checkedBOX) === 0) {

            return response()->json([
                'error' => 'Tidak ada transaksi yang dipilih.'
            ], 400);
        }

        // ==========================================
        // USER LOGIN
        // ==========================================
        $userLogin = Auth::user()->NomorUser ?? null;

        if (!$userLogin) {

            return response()->json([
                'error' => 'User login tidak ditemukan.'
            ], 401);
        }

        $connection = DB::connection('ConnKCNPurchase');

        try {

            $connection->beginTransaction();

            $processed = 0;

            foreach ($checkedBOX as $row) {
                $noTrans = $row['No_trans'] ?? null;

                if (!$noTrans) {
                    continue;
                }

                $noTrans = trim($noTrans);

                // ==========================================
                // FINAL APPROVE
                // ==========================================
                if ($action === 'Approve') {

                    /*
                     * Hanya proses data yang memang masih
                     * memenuhi kondisi Final Approve.
                     */
                    $affected = $connection
                        ->table('YTRANSBL')
                        ->where('No_trans', $noTrans)
                        ->whereNull('Direktur')
                        ->where('Dir_Agree', 0)
                        ->whereNull('Tgl_Direktur')
                        ->update([
                            'Direktur'    => $userLogin,
                            'Dir_Agree'   => 1,
                            'Tgl_Direktur' => now('Asia/Jakarta'),
                        ]);

                    $processed += $affected;
                }


                elseif ($action === 'Cancel') {

                }
            }

            $connection->commit();

            // ==========================================
            // RESPONSE APPROVE
            // ==========================================
            if ($action === 'Approve') {

                if ($processed === 0) {

                    return response()->json([
                        'error' =>
                            'Tidak ada data yang berhasil di-approve. ' .
                            'Data mungkin sudah diproses sebelumnya.'
                    ]);
                }

                return response()->json([
                    'success' =>
                        $processed . ' transaksi berhasil di-Final Approve.',
                    'processed' => $processed
                ]);
            }

            // ==========================================
            // RESPONSE CANCEL
            // ==========================================
            if ($action === 'Cancel') {

                return response()->json([
                    'success' =>
                        'Cancel Order belum diproses karena field/aturan ' .
                        'pembatalan YTRANSBL belum ditentukan.'
                ]);
            }

        } catch (\Throwable $e) {

            $connection->rollBack();

            return response()->json([
                'error' => 'Gagal memproses data.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id, Request $request)
    {
        if ($id === 'data') {

            $db = DB::connection('ConnKCNPurchase');

            $data = $db->table('YTRANSBL')

                ->leftJoin('YGOL', 'YTRANSBL.No_gol', '=', 'YGOL.NO_GOL')
                ->leftJoin('YMESIN', 'YTRANSBL.No_msn', '=', 'YMESIN.NO_MSN')
                ->leftJoin('Y_BARANG', 'YTRANSBL.Kd_brg', '=', 'Y_BARANG.KD_BRG')
                ->leftJoin('YSATUAN', 'YTRANSBL.NoSatuan', '=', 'YSATUAN.No_satuan')

                ->leftJoin(
                    'Y_KATEGORI_SUB',
                    'Y_BARANG.NO_SUB_KATEGORI',
                    '=',
                    'Y_KATEGORI_SUB.no_sub_kategori'
                )

                ->leftJoin(
                    'Y_KATEGORY',
                    'Y_KATEGORI_SUB.no_kategori',
                    '=',
                    'Y_KATEGORY.no_kategori'
                )

                ->leftJoin(
                    'Y_KATEGORI_UTAMA',
                    'Y_KATEGORY.no_kat_utama',
                    '=',
                    'Y_KATEGORI_UTAMA.no_kat_utama'
                )

                ->leftJoin(
                    'YJN_BL',
                    'YTRANSBL.Jenis',
                    '=',
                    'YJN_BL.NO_JNS'
                )

                // =====================================================
                // JOIN PPN
                // =====================================================

                ->leftJoin(
                    'PPN',
                    'YTRANSBL.IdPPN',
                    '=',
                    'PPN.IdPPN'
                )

                ->select([
                    'YTRANSBL.Tgl_order',
                    'YTRANSBL.Qty',
                    'YTRANSBL.Pemesan',

                    'YMESIN.NM_MSN',
                    'YGOL.NM_GOL',

                    'YTRANSBL.Jenis',
                    'YJN_BL.KET as JenisBeli',

                    'YTRANSBL.No_trans',
                    'YTRANSBL.Tgl_dtg',

                    'YSATUAN.Nama_satuan',

                    'YTRANSBL.Kd_brg',
                    'Y_BARANG.NAMA_BRG',
                    'Y_BARANG.KET',

                    'Y_KATEGORI_UTAMA.nama',
                    'Y_KATEGORY.nama_kategori',
                    'Y_KATEGORI_SUB.nama_sub_kategori',

                    'YTRANSBL.keterangan',

                    'YTRANSBL.No_sppb',
                    'YTRANSBL.Tgl_sppb',
                    'YTRANSBL.Batal_sppb',

                    'YTRANSBL.Kd_div',

                    'YTRANSBL.Batal_acc',
                    'YTRANSBL.Tgl_acc',

                    'YTRANSBL.Direktur',
                    'YTRANSBL.Dir_Agree',
                    'YTRANSBL.Tgl_Direktur',

                    // Data dasar harga
                    'YTRANSBL.PriceUnit',
                    'YTRANSBL.disc',
                    'YTRANSBL.IdPPN',
                    'PPN.JumPPN',
                ])

                // =====================================================
                // HITUNG TOTAL HARGA
                //
                // Qty × PriceUnit
                // dikurangi Discount
                // ditambah PPN
                // =====================================================

                ->selectRaw("
                    (
                        (
                            (COALESCE(YTRANSBL.Qty, 0)
                            * COALESCE(YTRANSBL.PriceUnit, 0))
                            -
                            (
                                (COALESCE(YTRANSBL.Qty, 0)
                                * COALESCE(YTRANSBL.PriceUnit, 0))
                                * COALESCE(YTRANSBL.disc, 0) / 100
                            )
                        )
                        +
                        (
                            (
                                (COALESCE(YTRANSBL.Qty, 0)
                                * COALESCE(YTRANSBL.PriceUnit, 0))
                                -
                                (
                                    (COALESCE(YTRANSBL.Qty, 0)
                                    * COALESCE(YTRANSBL.PriceUnit, 0))
                                    * COALESCE(YTRANSBL.disc, 0) / 100
                                )
                            )
                            * COALESCE(PPN.JumPPN, 0) / 100
                        )
                    ) AS HargaPerkiraan
                ")

                // =====================================================
                // SUDAH MEMILIKI SPPB
                // =====================================================

                ->whereNotNull('YTRANSBL.No_sppb')

                // =====================================================
                // BELUM ACC DIREKTUR
                // =====================================================

                ->whereNull('YTRANSBL.Direktur')

                ->whereNull('YTRANSBL.Tgl_Direktur')

                ->where(function ($query) {

                    $query->whereNull('YTRANSBL.Dir_Agree')
                        ->orWhere('YTRANSBL.Dir_Agree', 0);

                })

                // =====================================================
                // TIDAK DIBATALKAN
                // =====================================================

                ->whereNull('YTRANSBL.Batal_acc')

                ->orderBy('YTRANSBL.Kd_div')
                ->orderBy('YTRANSBL.Tgl_sppb')

                ->get();


            // =====================================================
            // AMBIL NO TRANS
            // =====================================================

            $noTrans = $data
                ->pluck('No_trans')
                ->filter()
                ->unique()
                ->values()
                ->toArray();


            // =====================================================
            // DOKUMENTASI
            // =====================================================

            $dokumentasi = [];

            if (count($noTrans) > 0) {

                $rowsDok = $db->table('YTRANSBL')
                    ->select([
                        'No_trans',
                        'DokumentasiFile'
                    ])
                    ->whereIn('No_trans', $noTrans)
                    ->get();

                foreach ($rowsDok as $dok) {

                    $dokumentasi[$dok->No_trans] =
                        !empty($dok->DokumentasiFile)
                            ? 1
                            : 0;
                }
            }


            // =====================================================
            // TAMBAHKAN HasDokumentasi
            // =====================================================

            foreach ($data as $row) {

                $row->HasDokumentasi =
                    $dokumentasi[$row->No_trans] ?? 0;
            }


            // =====================================================
            // RETURN
            // =====================================================

            return response()->json([
                'data' => $data
            ]);
        }

        abort(404);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        // dd($request->data[0]);
        if ($id == 'prosesSetuju') {
            foreach ($request->data as $row) {

                DB::connection('ConnKCNPurchase')->statement(
                    'exec spAcc_Direktur_dotNet
                        @Direktur = ?,
                        @Dir_Agree = ?,
                        @No_Trans = ?',
                    [
                        auth()->user()->NomorUser,
                        1,
                        $row['No_trans']
                    ]
                );
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Proses telah selesai.'
            ]);

        } else if ($id == 'gantiLevel') {

            foreach ($request->data as $row) {

                DB::connection('ConnKCNPurchase')->statement(
                    'exec spUpdate_LevelAcc
                        @AccDir = ?,
                        @PengesetAccDir = ?,
                        @KD_BRG = ?',
                    [
                        0,
                        auth()->user()->NomorUser,
                        $row['Kd_brg']
                    ]
                );
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Ganti level ACC telah selesai diproses.'
            ]);
        }
    }

    public function downloadDokumentasi($noTrans)
    {
        $db = DB::connection('ConnKCNPurchase');

        $data = $db->table('YTRANSBL')
            ->select('DokumentasiFile')
            ->where('No_trans', $noTrans)
            ->first();


        if (!$data || empty($data->DokumentasiFile)) {
            abort(404, 'Dokumentasi tidak ditemukan.');
        }

        $binary = $data->DokumentasiFile;

        if (is_resource($binary)) {
            $binary = stream_get_contents($binary);
        }

        $binary = (string) $binary;

        $dokumentasi = json_decode(
            $binary,
            true
        );


        if (!is_array($dokumentasi)) {
            abort(500, 'Data dokumentasi tidak valid.');
        }

        $folder = storage_path('app/temp');

        if (!is_dir($folder)) {
            mkdir($folder, 0755, true);
        }

        $zipName = 'Dokumentasi_' . $noTrans . '.zip';
        $zipPath = $folder . '/' . $zipName;
        $zip = new \ZipArchive();

        if (
            $zip->open(
                $zipPath,
                \ZipArchive::CREATE |
                \ZipArchive::OVERWRITE
            ) !== true
        ) {
            abort(500, 'Gagal membuat file ZIP.');
        }

        foreach ($dokumentasi as $index => $file) {

            if (empty($file['nama']) || empty($file['data'])) {
                continue;
            }

            $namaFile = $file['nama'];
            $namaDalamZip = $namaFile;


            // Hindari nama file duplikat
            if ($zip->locateName($namaDalamZip) !== false) {
                $pathInfo = pathinfo($namaFile);
                $namaDalamZip =
                    $pathInfo['filename']
                    . '_' . ($index + 1)
                    . (
                        isset($pathInfo['extension'])
                            ? '.' . $pathInfo['extension']
                            : ''
                    );
            }


            // Base64 -> binary
            $isiFile = base64_decode(
                $file['data'],
                true
            );


            if ($isiFile === false) {
                continue;
            }


            $zip->addFromString(
                $namaDalamZip,
                $isiFile
            );
        }


        $zip->close();
        
        return response()
            ->download(
                $zipPath,
                $zipName
            )
            ->deleteFileAfterSend(true);
    }

    public function destroy($id)
    {
        //
    }
}
