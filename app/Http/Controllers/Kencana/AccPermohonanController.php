<?php

namespace App\Http\Controllers\Kencana;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;


class AccPermohonanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.AccPermohonan.index', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        if ($id == 'getData') {

            $db = DB::connection('ConnKCNPurchase');

            $sp = request('action') == 'batal'
                ? 'spSelect_BatalAccPermohonan_dotNet'
                : 'spSelect_AccPermohonan_dotNet';


            $data = $db->select(
                "EXEC {$sp} @kd_user = ?",
                [
                    auth()->user()->NomorUser
                ]
            );

            $noTransList = collect($data)
                ->pluck('No_trans')
                ->filter()
                ->values()
                ->toArray();

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

            return response()->json($data);
        }

        abort(404);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        if ($id != 'proses') {
            abort(404);
        }

        $request->validate([
            'action' => 'required|in:acc,batal',
            'no_trans' => 'required|array|min:1',
            'no_trans.*' => 'required|string'
        ]);

        DB::connection('ConnKCNPurchase')->beginTransaction();

        try {
            foreach ($request->no_trans as $noTrans) {
                if ($request->action == 'acc') {
                    DB::connection('ConnKCNPurchase')->statement(
                        "EXEC spUpdate_AccPermohonan_dotNet
                            @no_trans = ?,
                            @manager = ?",
                        [
                            $noTrans,
                            auth()->user()->NomorUser
                        ]
                    );

                } else {
                    DB::connection('ConnKCNPurchase')->statement(
                        "EXEC spUpdate_BatalAccPermohonan_dotNet
                            @no_trans = ?,
                            @batal_acc = ?",
                        [
                            $noTrans,
                            'DIBATALKAN OLEH '.auth()->user()->NomorUser
                        ]
                    );
                }
            }

            DB::connection('ConnKCNPurchase')->commit();

            return response()->json([
                'status' => true,
                'message' => 'Data berhasil diproses.'
            ]);

        } catch (\Exception $e) {

            DB::connection('ConnKCNPurchase')->rollBack();

            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ],500);

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

        $dokumentasi = json_decode($binary, true);

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
        // MASUKKAN FILE KE ZIP
        // ==========================================================

        foreach ($dokumentasi as $index => $file) {

            if (
                empty($file['nama']) ||
                empty($file['data'])
            ) {
                continue;
            }

            $namaFile = $file['nama'];

            // Jika nama file sama, beri nomor
            $namaDalamZip = $namaFile;

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
