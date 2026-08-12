<?php

namespace App\Http\Controllers\Kencana;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AccPembelianController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.AccPembelian.index', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id, Request $request)
    {
        if ($id == 'getData') {

            $db = DB::connection('ConnKCNPurchase');


            // ==========================================================
            // AMBIL DATA DARI SP
            // SP TIDAK DIUBAH
            // ==========================================================

            $data = $db->select(
                'exec spSelect_Pembelian_dotNet
                    @UserAcc = ?',
                [
                    auth()->user()->NomorUser
                ]
            );


            // ==========================================================
            // AMBIL No_trans
            // ==========================================================

            $noTransList = collect($data)
                ->pluck('No_trans')
                ->filter()
                ->values()
                ->toArray();


            // ==========================================================
            // CEK DOKUMENTASI DI YTRANSBL
            // ==========================================================

            $dokumentasiMap = [];


            if (!empty($noTransList)) {

                $dokumentasiMap = $db->table('YTRANSBL')
                    ->whereIn('No_trans', $noTransList)
                    ->select(
                        'No_trans',
                        DB::raw("
                            CASE
                                WHEN DokumentasiFile IS NOT NULL
                                    AND DATALENGTH(DokumentasiFile) > 0
                                THEN 1
                                ELSE 0
                            END AS HasDokumentasi
                        ")
                    )
                    ->get()
                    ->keyBy('No_trans');
            }


            // ==========================================================
            // TAMBAHKAN HasDokumentasi
            // ==========================================================

            foreach ($data as $row) {

                $noTrans = $row->No_trans ?? null;

                if (
                    $noTrans &&
                    isset($dokumentasiMap[$noTrans])
                ) {

                    $row->HasDokumentasi =
                        (int) $dokumentasiMap[$noTrans]->HasDokumentasi;

                } else {

                    $row->HasDokumentasi = 0;
                }
            }


            // ==========================================================
            // RESPONSE DATATABLE
            // ==========================================================

            return datatables($data)->make(true);
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


        // ==========================================================
        // AMBIL DOKUMENTASI
        // ==========================================================

        $data = $db->table('YTRANSBL')
            ->select('DokumentasiFile')
            ->where('No_trans', $noTrans)
            ->first();


        if (!$data || empty($data->DokumentasiFile)) {
            abort(404, 'Dokumentasi tidak ditemukan.');
        }


        // ==========================================================
        // VARBINARY -> STRING
        // ==========================================================

        $binary = $data->DokumentasiFile;

        if (is_resource($binary)) {
            $binary = stream_get_contents($binary);
        }

        $binary = (string) $binary;


        // ==========================================================
        // DECODE JSON
        // ==========================================================

        $dokumentasi = json_decode(
            $binary,
            true
        );


        if (!is_array($dokumentasi)) {
            abort(500, 'Data dokumentasi tidak valid.');
        }


        // ==========================================================
        // FOLDER TEMP
        // ==========================================================

        $folder = storage_path('app/temp');

        if (!is_dir($folder)) {
            mkdir($folder, 0755, true);
        }


        // ==========================================================
        // NAMA ZIP
        // ==========================================================

        $zipName = 'Dokumentasi_' . $noTrans . '.zip';

        $zipPath = $folder . '/' . $zipName;


        // ==========================================================
        // BUAT ZIP
        // ==========================================================

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


        // ==========================================================
        // MASUKKAN SEMUA FILE
        // ==========================================================

        foreach ($dokumentasi as $index => $file) {

            if (
                empty($file['nama']) ||
                empty($file['data'])
            ) {
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


        // ==========================================================
        // DOWNLOAD
        // ==========================================================

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
