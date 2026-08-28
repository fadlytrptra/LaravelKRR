<?php

namespace App\Http\Controllers\Kencana;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class CetakPembelianKencanaController extends Controller
{

    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.CetakPembelian.index', compact('access'));
    }

    public function getData(Request $request)
    {
        try {

            // =====================================================
            // VALIDASI
            // =====================================================
            $request->validate([
                'tanggalMulai'   => 'required|date',
                'tanggalSelesai' => 'required|date|after_or_equal:tanggalMulai',
            ]);


            $tanggalMulai   = $request->tanggalMulai;
            $tanggalSelesai = $request->tanggalSelesai;


            // =====================================================
            // QUERY
            // =====================================================
            $query = DB::connection('ConnKCNPurchase')
                ->table('YTRANSBL as T')

                // =================================================
                // JOIN SUPPLIER
                // =================================================
                ->leftJoin(
                    'YSUPPLIER as S',
                    'T.Supplier',
                    '=',
                    'S.NO_SUP'
                )

                // =================================================
                // JOIN DIVISI
                // =================================================
                ->leftJoin(
                    'YDIVISI as D',
                    'T.Kd_div',
                    '=',
                    'D.KD_DIV'
                )

                ->select([
                    'T.No_sppb',
                    'T.Kd_div',
                    'D.NM_DIV',

                    'T.Tgl_sppb',

                    'T.Supplier',
                    'S.NO_SUP',
                    'S.NM_SUP',

                    'T.Direktur',
                    'T.Dir_Agree',
                    'T.Tgl_Direktur',
                ])

                // =================================================
                // HANYA DATA YANG SUDAH ACC DIREKTUR
                // =================================================
                ->whereNotNull(
                    'T.Direktur'
                )

                ->whereRaw(
                    "LTRIM(RTRIM(T.Direktur)) <> ''"
                )

                ->where(
                    'T.Dir_Agree',
                    1
                )

                ->whereNotNull(
                    'T.Tgl_Direktur'
                )

                // =================================================
                // FILTER TANGGAL SPPB
                // =================================================
                ->where(
                    'T.Tgl_sppb',
                    '>=',
                    $tanggalMulai . ' 00:00:00'
                )

                ->where(
                    'T.Tgl_sppb',
                    '<',
                    date(
                        'Y-m-d',
                        strtotime($tanggalSelesai . ' +1 day')
                    ) . ' 00:00:00'
                )

                // =================================================
                // URUTKAN
                // =================================================
                ->orderByDesc(
                    'T.Tgl_Direktur'
                );


            // =====================================================
            // EXECUTE
            // =====================================================
            $data = $query->get();


            // =====================================================
            // SATU No SPPB = SATU BARIS
            // =====================================================
            $data = $data
                ->unique(function ($item) {

                    return trim(
                        $item->No_sppb
                    );

                })
                ->values();


            // =====================================================
            // FORMAT DATA
            // =====================================================
            $data = $data->map(function ($item) {

                return [

                    'No_sppb' =>
                        trim(
                            $item->No_sppb ?? ''
                        ),

                    'Kd_div' =>
                        trim(
                            $item->Kd_div ?? ''
                        ),

                    'NM_DIV' =>
                        trim(
                            $item->NM_DIV ?? ''
                        ),

                    'Tgl_sppb' =>
                        $item->Tgl_sppb,

                    'Supplier' =>
                        trim(
                            $item->Supplier ?? ''
                        ),

                    'NO_SUP' =>
                        trim(
                            $item->NO_SUP ?? ''
                        ),

                    'NM_SUP' =>
                        trim(
                            $item->NM_SUP ?? ''
                        ),

                    'Direktur' =>
                        trim(
                            $item->Direktur ?? ''
                        ),

                    'Dir_Agree' =>
                        (bool) $item->Dir_Agree,

                    'Tgl_Direktur' =>
                        $item->Tgl_Direktur,
                ];

            })->values();


            // =====================================================
            // RESPONSE
            // =====================================================
            return response()->json([

                'success' => true,

                'data' => $data,

                'total' => $data->count(),

            ]);


        } catch (\Illuminate\Validation\ValidationException $e) {

            return response()->json([

                'success' => false,

                'message' =>
                    'Tanggal filter tidak valid.',

                'errors' =>
                    $e->errors(),

            ], 422);


        } catch (\Throwable $e) {

            Log::error(
                'CETAK PEMBELIAN - GET DATA ERROR',
                [

                    'message' =>
                        $e->getMessage(),

                    'file' =>
                        $e->getFile(),

                    'line' =>
                        $e->getLine(),

                    'request' =>
                        $request->all(),

                ]
            );


            return response()->json([

                'success' => false,

                'message' =>
                    'Gagal mengambil data Cetak Pembelian: '
                    . $e->getMessage(),

            ], 500);
        }
    }

    public function print(Request $request)
    {
        $request->validate([
            'KdDiv'  => 'required',
            'NoSPPB' => 'required',
        ]);

        $kdDiv  = $request->KdDiv;
        $noSPPB = $request->NoSPPB;

        // =========================================================
        // DETAIL SPPB
        // =========================================================
        $detail = DB::connection('ConnKCNPurchase')
            ->select(
                "EXEC SP_7775_PBL_LIST_DETAIL_SPPB
                    @MyType=?,
                    @KdDiv=?,
                    @NoSPPB=?",
                [
                    2,
                    $kdDiv,
                    $noSPPB
                ]
            );

        if (count($detail) == 0) {
            abort(404, 'Data SPPB tidak ditemukan.');
        }


        // =========================================================
        // AMBIL NO TRANSAKSI
        // =========================================================
        $noTrans = collect($detail)
            ->pluck('No_trans')
            ->filter()
            ->unique()
            ->values()
            ->toArray();


        // =========================================================
        // AMBIL HARGA, DISC & PPN
        // =========================================================
        $hargaTransaksi = DB::connection('ConnKCNPurchase')
            ->table('YTRANSBL as T')
            ->leftJoin('PPN as P', 'T.IdPPN', '=', 'P.IdPPN')
            ->select([
                'T.No_trans',
                'T.PriceUnit',
                'T.disc',
                'T.IdPPN',
                'P.JumPPN',
            ])
            ->whereIn('T.No_trans', $noTrans)
            ->get()
            ->keyBy('No_trans');


        // =========================================================
        // NAMA DIVISI
        // =========================================================
        $divisi = DB::connection('ConnKCNPurchase')
            ->table('YDIVISI')
            ->select([
                'KD_DIV',
                'NM_DIV'
            ])
            ->where('KD_DIV', $kdDiv)
            ->first();


        // =========================================================
        // SUPPLIER & PAYMENT TERM
        // =========================================================
        $transaksi = DB::connection('ConnKCNPurchase')
            ->table('YTRANSBL')
            ->select([
                'Supplier',
                'Pay_Term',
                'Direktur'
            ])
            ->where('No_sppb', $noSPPB)
            ->first();


        // =========================================================
        // SUPPLIER
        // =========================================================
        $supplier = null;

        if (!empty($transaksi?->Supplier)) {

            $supplier = DB::connection('ConnKCNPurchase')
                ->table('YSUPPLIER')
                ->select([
                    'NO_SUP',
                    'NM_SUP',
                    'ALAMAT1',
                    'KOTA1',
                    'NEGARA1'
                ])
                ->where('NO_SUP', $transaksi->Supplier)
                ->first();
        }


        // =========================================================
        // PAYMENT TERM
        // =========================================================
        $paymentTerm = null;

        if (!empty($transaksi?->Pay_Term)) {

            $paymentTerm = DB::connection('ConnKCNPurchase')
                ->table('PAYMENT_TERM')
                ->select([
                    'Kode',
                    'Pembayaran',
                    'Hari'
                ])
                ->where('Kode', $transaksi->Pay_Term)
                ->first();
        }


        // =========================================================
        // TANDA TANGAN DIREKTUR
        // =========================================================
        $ttdDirektur = null;

        if (!empty($transaksi?->Direktur)) {

            $ttdDirektur = DB::connection('ConnEDP')
                ->table('UserMaster')
                ->select([
                    'NomorUser',
                    'NamaUser',
                    'FotoTtd'
                ])
                ->where('NomorUser', $transaksi->Direktur)
                ->first();
        }


        // =========================================================
        // HEADER
        // =========================================================
        $header = (object)[
            'Kd_div'   => $kdDiv,
            'Nm_div'   => $divisi->NM_DIV ?? null,
            'No_sppb'  => $noSPPB,
            'Tgl_sppb' => $detail[0]->Tgl_sppb ?? null,
            'Pemesan'  => $detail[0]->Pemesan ?? null,

            'NO_SUP'   => $supplier->NO_SUP ?? null,
            'NM_SUP'   => $supplier->NM_SUP ?? null,
            'ALAMAT1'  => $supplier->ALAMAT1 ?? null,
            'KOTA1'    => $supplier->KOTA1 ?? null,
            'NEGARA1'  => $supplier->NEGARA1 ?? null,

            'Pay_Term' => $paymentTerm->Pembayaran ?? null,
        ];


        // =========================================================
        // HITUNG TOTAL
        // =========================================================
        $sumAmount = 0;
        $sumDisc   = 0;
        $subTotal  = 0;
        $ppnTotal  = 0;
        $total     = 0;


        foreach ($detail as $row) {

            $trans = $hargaTransaksi->get($row->No_trans);

            $row->PriceUnit = (float) ($trans->PriceUnit ?? 0);
            $row->disc      = (float) ($trans->disc ?? 0);
            $row->IdPPN     = $trans->IdPPN ?? null;
            $row->JumPPN    = (float) ($trans->JumPPN ?? 0);

            $qty = (float) ($row->Qty ?? 0);

            $row->Amount = $qty * $row->PriceUnit;

            $row->DiscAmount =
                $row->Amount * $row->disc / 100;

            $row->SubTotal =
                $row->Amount - $row->DiscAmount;

            $row->PPNAmount =
                $row->SubTotal * $row->JumPPN / 100;

            $row->Total =
                $row->SubTotal + $row->PPNAmount;


            $sumAmount += $row->Amount;
            $sumDisc   += $row->DiscAmount;
            $subTotal  += $row->SubTotal;
            $ppnTotal  += $row->PPNAmount;
            $total     += $row->Total;
        }


        // =========================================================
        // LOGO
        // =========================================================
        $logo = asset('images/logo_kencana2.png');


        // =========================================================
        // VIEW CETAK
        // =========================================================
        return view(
            'Kencana.SppbPembelian.cetak',
            compact(
                'header',
                'detail',
                'logo',
                'sumAmount',
                'sumDisc',
                'subTotal',
                'ppnTotal',
                'total',
                'ttdDirektur'
            )
        );
    }


    /**
     * ============================================================
     * KIRIM EMAIL KE SUPPLIER
     * ============================================================
     */
    public function sendEmailSupplier(Request $request)
    {
        $request->validate([
            'KdDiv'  => 'required',
            'NoSPPB' => 'required',
            'email'  => 'nullable|string',
        ]);

        try {
            $kdDiv  = $request->KdDiv;
            $noSPPB = $request->NoSPPB;

            \Log::info('SPPB EMAIL - START', [
                'KdDiv'  => $kdDiv,
                'NoSPPB' => $noSPPB,
            ]);

            $detail = DB::connection('ConnKCNPurchase')
                ->select(
                    "EXEC SP_7775_PBL_LIST_DETAIL_SPPB
                        @MyType=?,
                        @KdDiv=?,
                        @NoSPPB=?",
                    [
                        2,
                        $kdDiv,
                        $noSPPB
                    ]
                );

            \Log::info('SPPB EMAIL - DETAIL', [
                'count' => count($detail)
            ]);

            if (count($detail) == 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data SPPB tidak ditemukan.'
                ]);
            }

            $noTrans = collect($detail)
                ->pluck('No_trans')
                ->filter()
                ->unique()
                ->values()
                ->toArray();

            $hargaTransaksi = DB::connection('ConnKCNPurchase')
                ->table('YTRANSBL as T')
                ->leftJoin('PPN as P', 'T.IdPPN', '=', 'P.IdPPN')
                ->select([
                    'T.No_trans',
                    'T.PriceUnit',
                    'T.disc',
                    'T.IdPPN',
                    'P.JumPPN',
                ])
                ->whereIn('T.No_trans', $noTrans)
                ->get()
                ->keyBy('No_trans');

            $divisi = DB::connection('ConnKCNPurchase')
                ->table('YDIVISI')
                ->select([
                    'KD_DIV',
                    'NM_DIV'
                ])
                ->where('KD_DIV', $kdDiv)
                ->first();

            $transaksi = DB::connection('ConnKCNPurchase')
                ->table('YTRANSBL')
                ->select([
                    'Supplier',
                    'Pay_Term',
                    'Direktur'
                ])
                ->where('No_sppb', $noSPPB)
                ->first();

            if (!$transaksi) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data transaksi SPPB tidak ditemukan.'
                ]);
            }

            \Log::info('SPPB EMAIL - TRANSAKSI', [
                'Supplier' => $transaksi->Supplier,
                'Pay_Term' => $transaksi->Pay_Term,
                'Direktur' => $transaksi->Direktur,
            ]);

            // =====================================================
            // DOKUMENTASI FILE
            // =====================================================
            $dokumentasiRows = DB::connection('ConnKCNPurchase')
                ->table('YTRANSBL')
                ->select([
                    'No_trans',
                    'DokumentasiFile'
                ])
                ->where('No_sppb', $noSPPB)
                ->whereNotNull('DokumentasiFile')
                ->whereRaw('DATALENGTH(DokumentasiFile) > 0')
                ->get();

            $dokumentasiFiles = [];

            foreach ($dokumentasiRows as $row) {

                if (empty($row->DokumentasiFile)) {
                    continue;
                }

                $binary = $row->DokumentasiFile;

                // Jika driver database mengembalikan resource
                if (is_resource($binary)) {
                    $binary = stream_get_contents($binary);
                }

                // DokumentasiFile berisi JSON dalam bentuk VARBINARY
                $json = $binary;

                // Decode JSON
                $files = json_decode($json, true);

                if (!is_array($files)) {

                    \Log::warning('SPPB EMAIL - JSON DOKUMENTASI INVALID', [
                        'No_trans'   => $row->No_trans,
                        'json_error' => json_last_error_msg(),
                    ]);

                    continue;
                }

                // =================================================
                // AMBIL SEMUA FILE DALAM JSON
                // =================================================
                foreach ($files as $file) {

                    if (
                        empty($file['nama']) ||
                        empty($file['mime']) ||
                        empty($file['data'])
                    ) {
                        continue;
                    }

                    // Decode BASE64 menjadi binary file asli
                    $fileData = base64_decode(
                        $file['data'],
                        true
                    );

                    if ($fileData === false) {

                        \Log::warning('SPPB EMAIL - BASE64 INVALID', [
                            'nama'     => $file['nama'],
                            'No_trans' => $row->No_trans,
                        ]);

                        continue;
                    }

                    $dokumentasiFiles[] = [
                        'nama' => $file['nama'],
                        'mime' => $file['mime'],
                        'data' => $fileData,
                    ];
                }
            }

            \Log::info('SPPB EMAIL - DOKUMENTASI', [
                'jumlah_file' => count($dokumentasiFiles),
                'files' => collect($dokumentasiFiles)
                    ->pluck('nama')
                    ->toArray(),
            ]);

            $supplier = null;

            if (!empty($transaksi->Supplier)) {
                $supplier = DB::connection('ConnKCNPurchase')
                    ->table('YSUPPLIER')
                    ->select([
                        'NO_SUP',
                        'NM_SUP',
                        'ALAMAT1',
                        'KOTA1',
                        'NEGARA1',
                        'TELEX1',
                        'TELEX2'
                    ])
                    ->where('NO_SUP', $transaksi->Supplier)
                    ->first();
            }

            if (!$supplier) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data supplier tidak ditemukan.'
                ]);
            }

            \Log::info('SPPB EMAIL - SUPPLIER', [
                'NO_SUP' => $supplier->NO_SUP,
                'NM_SUP' => $supplier->NM_SUP,
                'TELEX1' => $supplier->TELEX1,
                'TELEX2' => $supplier->TELEX2,
            ]);

            $paymentTerm = null;
            if (!empty($transaksi->Pay_Term)) {
                $paymentTerm = DB::connection('ConnKCNPurchase')
                    ->table('PAYMENT_TERM')
                    ->select([
                        'Kode',
                        'Pembayaran',
                        'Hari'
                    ])
                    ->where('Kode', $transaksi->Pay_Term)
                    ->first();
            }

            $ttdDirektur = null;

            if (!empty($transaksi->Direktur)) {

                $ttdDirektur = DB::connection('ConnEDP')
                    ->table('UserMaster')
                    ->select([
                        'NomorUser',
                        'NamaUser',
                        'FotoTtd'
                    ])
                    ->where('NomorUser', $transaksi->Direktur)
                    ->first();
            }

            \Log::info('SPPB EMAIL - TTD', [
                'ada'  => !empty($ttdDirektur),
                'nama' => $ttdDirektur->NamaUser ?? null,
                'foto' => !empty($ttdDirektur?->FotoTtd),
            ]);

            $header = (object)[
                'Kd_div'   => $kdDiv,
                'Nm_div'   => $divisi->NM_DIV ?? null,
                'No_sppb'  => $noSPPB,
                'Tgl_sppb' => $detail[0]->Tgl_sppb ?? null,
                'Pemesan'  => $detail[0]->Pemesan ?? null,
                'NO_SUP'   => $supplier->NO_SUP ?? null,
                'NM_SUP'   => $supplier->NM_SUP ?? null,
                'ALAMAT1'  => $supplier->ALAMAT1 ?? null,
                'KOTA1'    => $supplier->KOTA1 ?? null,
                'NEGARA1'  => $supplier->NEGARA1 ?? null,
                'Pay_Term' => $paymentTerm->Pembayaran ?? null,
            ];

            // =====================================================
            // HITUNG TOTAL
            // =====================================================
            $sumAmount = 0;
            $sumDisc   = 0;
            $subTotal  = 0;
            $ppnTotal  = 0;
            $total     = 0;

            foreach ($detail as $row) {
                $trans = $hargaTransaksi->get($row->No_trans);
                $row->PriceUnit = (float) ($trans->PriceUnit ?? 0);
                $row->disc      = (float) ($trans->disc ?? 0);
                $row->IdPPN     = $trans->IdPPN ?? null;
                $row->JumPPN    = (float) ($trans->JumPPN ?? 0);
                $qty = (float) ($row->Qty ?? 0);
                $row->Amount = $qty * $row->PriceUnit;
                $row->DiscAmount = $row->Amount * $row->disc / 100;
                $row->SubTotal = $row->Amount - $row->DiscAmount;
                $row->PPNAmount = $row->SubTotal * $row->JumPPN / 100;
                $row->Total = $row->SubTotal + $row->PPNAmount;
                $sumAmount += $row->Amount;
                $sumDisc   += $row->DiscAmount;
                $subTotal  += $row->SubTotal;
                $ppnTotal  += $row->PPNAmount;
                $total     += $row->Total;
            }

            // =====================================================
            // EMAIL SUPPLIER
            // =====================================================
            $emailString = trim($request->email ?? '');

            if (empty($emailString)) {
                $emailString = collect([
                    trim($supplier->TELEX1 ?? ''),
                    trim($supplier->TELEX2 ?? '')
                ])
                    ->filter()
                    ->implode(',');
            }

            if (empty($emailString)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email supplier tidak ditemukan.'
                ]);
            }

            // =====================================================
            // VALIDASI EMAIL
            // =====================================================
            $emails = collect(
                preg_split('/[,;]+/', $emailString)
            )
                ->map(fn($email) => trim($email))
                ->filter()
                ->unique()
                ->values()
                ->toArray();

            $invalidEmails = [];

            foreach ($emails as $email) {

                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $invalidEmails[] = $email;
                }
            }

            if (!empty($invalidEmails)) {

                return response()->json([
                    'success' => false,
                    'message' => 'Email tidak valid: '
                        . implode(', ', $invalidEmails)
                ]);
            }

            \Log::info('SPPB EMAIL - EMAIL VALID', [
                'emails' => $emails
            ]);

            // =====================================================
            // LOGO
            // =====================================================
            $logoPath = public_path(
                'images/logo_kencana2.png'
            );

            if (!file_exists($logoPath)) {

                return response()->json([
                    'success' => false,
                    'message' => 'File logo tidak ditemukan.'
                ]);
            }

            $logo = 'data:image/png;base64,' .
                base64_encode(
                    file_get_contents($logoPath)
                );

            // =====================================================
            // GENERATE PDF
            // =====================================================
            \Log::info(
                'SPPB EMAIL - MULAI GENERATE PDF'
            );

            $pdf = Pdf::loadView(
                'Kencana.SppbPembelian.cetak',
                [
                    'header'      => $header,
                    'detail'      => $detail,
                    'logo'        => $logo,
                    'sumAmount'   => $sumAmount,
                    'sumDisc'     => $sumDisc,
                    'subTotal'    => $subTotal,
                    'ppnTotal'    => $ppnTotal,
                    'total'       => $total,
                    'ttdDirektur' => $ttdDirektur,
                    'forEmail'    => true,
                ]
            )->setPaper('A4', 'portrait');

            \Log::info(
                'SPPB EMAIL - PDF BERHASIL'
            );

            // =====================================================
            // EMAIL TAMBAHAN UNTUK TESTING
            // =====================================================
            $emails[] =
                'admin@kencanarajasa.co.id';

            \Log::info(
                'SPPB EMAIL - MULAI MAIL',
                ['emails' => $emails]
            );

            // =====================================================
            // KIRIM EMAIL
            // =====================================================
            Log::info('CETAK PEMBELIAN - SEBELUM MAIL', [
                'KdDiv'  => $kdDiv,
                'NoSPPB' => $noSPPB,
                'emails' => $emails,
            ]);
            Mail::mailer('gmail')->send(
                [],
                [],
                function ($message) use (
                    $emails,
                    $noSPPB,
                    $pdf,
                    $dokumentasiFiles
                ) {

                    $message->from(
                        env('GMAIL_USERNAME'),
                        env(
                            'MAIL_FROM_NAME',
                            'Kencana Rajasa Raya'
                        )
                    );

                    $message->to($emails)
                        ->subject(
                            "SPPB Kencana Rajasa Raya {$noSPPB}"
                        )
                        ->html(
                            "Berikut adalah SPPB dengan nomor "
                            . "<b>{$noSPPB}</b>."
                            . "<br><br>"
                            . "Silakan cek SPPB pada file PDF "
                            . "yang terlampir."
                        )

                        // =================================================
                        // ATTACH PDF SPPB
                        // =================================================
                        ->attachData(
                            $pdf->output(),
                            "{$noSPPB}.pdf",
                            [
                                'mime' => 'application/pdf'
                            ]
                        );

                    // =====================================================
                    // ATTACH SEMUA DOKUMENTASI
                    // =====================================================
                    foreach ($dokumentasiFiles as $file) {
                        $message->attachData(
                            $file['data'],
                            $file['nama'],
                            [
                                'mime' => $file['mime']
                            ]
                        );

                        \Log::info(
                            'SPPB EMAIL - ATTACH DOKUMENTASI',
                            [
                                'nama' => $file['nama'],
                                'mime' => $file['mime'],
                                'size' => strlen($file['data'])
                            ]
                        );
                    }
                }
            );

            Log::info('CETAK PEMBELIAN - MAIL BERHASIL', [
                'KdDiv'  => $kdDiv,
                'NoSPPB' => $noSPPB,
                'emails' => $emails,
            ]);

            // =====================================================
            // RESPONSE
            // =====================================================
            return response()->json([
                'success' => true,
                'message' => 'Email berhasil dikirim ke '
                    . implode(', ', $emails)
                    . '.'
            ]);

        } catch (\Throwable $e) {

            \Log::error(
                'SPPB EMAIL - ERROR',
                [
                    'message' => $e->getMessage(),
                    'file'    => $e->getFile(),
                    'line'    => $e->getLine(),
                ]
            );

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengirim email: '
                    . $e->getMessage()
            ], 500);
        }
    }
}
