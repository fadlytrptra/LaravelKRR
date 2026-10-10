<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratPesanan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class SuratPesananDirekturController extends Controller
{
    public function index()
    {
        // SP yang sudah ACC Manager dan belum ACC Direktur
        $data = DB::connection('ConnSales')
            ->table('T_HeaderPesanan')
            ->leftJoin('T_JnsSuratPesanan','T_HeaderPesanan.IDJnsSuratPesanan','=','T_JnsSuratPesanan.IDJnsSuratPesanan')
            ->leftJoin('T_Sales','T_HeaderPesanan.IDSales','=','T_Sales.IDSales')
            ->leftJoin('T_MataUang','T_HeaderPesanan.IDMataUang','=','T_MataUang.IDMataUang')
            ->leftJoin('T_Billing','T_HeaderPesanan.IDBill','=','T_Billing.IDBill')
            ->leftJoin('T_JnsBayar','T_HeaderPesanan.IDPembayaran','=','T_JnsBayar.IdPembayaran')
            ->leftJoin('T_Customer','T_HeaderPesanan.IDCust','=','T_Customer.IDCust')
            ->where('T_HeaderPesanan.StatusSP', 3)
            ->whereNull('T_HeaderPesanan.AccDirektur')
            ->whereNull('T_HeaderPesanan.TglAccDirektur')
            ->whereNull('T_HeaderPesanan.Batal')
            ->whereNull('T_HeaderPesanan.TglBatal')
            ->select([
                'T_HeaderPesanan.IDSuratPesanan',
                'T_HeaderPesanan.Tgl_Pesan',
                'T_HeaderPesanan.IDCust',
                'T_Customer.NamaCust',
                'T_HeaderPesanan.NO_PO',
                'T_HeaderPesanan.Tgl_PO',
                'T_HeaderPesanan.NO_PI',
                'T_HeaderPesanan.IDPembayaran',
                'T_JnsBayar.NamaPembayaran',
                'T_HeaderPesanan.IDBill',
                'T_Billing.NamaBill',
                'T_HeaderPesanan.IDSales',
                'T_Sales.NamaSales',
                'T_HeaderPesanan.IDMataUang',
                'T_MataUang.MataUang',
                'T_HeaderPesanan.TglInput',
                'T_HeaderPesanan.AccManager',
                'T_HeaderPesanan.TglAccManager',
                'T_HeaderPesanan.AccDirektur',
                'T_HeaderPesanan.TglAccDirektur',
                'T_HeaderPesanan.SyaratBayar',
                'T_JnsSuratPesanan.JnsSuratPesanan',
                'T_HeaderPesanan.IDJnsSuratPesanan',
                'T_HeaderPesanan.Ket',
                'T_HeaderPesanan.JnsFakturPjk',
                'T_Customer.JnsCust',
                'T_HeaderPesanan.JenisHargaBarang',
                'T_HeaderPesanan.StatusSP',
                'T_HeaderPesanan.UserInput',
            ])
            ->orderBy('T_HeaderPesanan.IDSuratPesanan')
            ->get();

        // Ambil nomor SP
        $nomorSP = $data
            ->pluck('IDSuratPesanan')
            ->filter()
            ->values()
            ->toArray();

        // Ambil dokumentasi
        $dokumentasi = collect();

        if (!empty($nomorSP)) {
            $chunks = array_chunk($nomorSP, 1000);

            foreach ($chunks as $chunk) {
                $hasil = DB::connection('ConnSales')
                    ->table('T_HeaderPesanan')
                    ->whereIn('IDSuratPesanan', $chunk)
                    ->pluck('Dokumentasi', 'IDSuratPesanan');

                $dokumentasi = $dokumentasi->merge($hasil);
            }
        }

        foreach ($data as $item) {
            $item->Dokumentasi =
                $dokumentasi[$item->IDSuratPesanan] ?? null;
        }

        // Data pendukung halaman
        $jenis_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP @Kode = ?', [1]);
        $list_customer = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        $list_sales = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SALES');
        $jenis_bayar = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBAYAR');
        $jenis_brg = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
        $kategori_utama = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_KATEGORI_UTAMA');
        $list_satuan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SATUAN');
        $list_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');

        return view('Sales.Transaksi.SuratPesanan.AccDirektur',
            compact(
                'data',
                'access',
                'jenis_sp',
                'list_customer',
                'list_sales',
                'jenis_bayar',
                'jenis_brg',
                'kategori_utama',
                'list_satuan',
                'list_sp'
            )
        );
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
        //
    }

    public function edit($id)
    {
        //
    }


    public function update($id)
    {
        try {

            $idDirektur = Auth::user()->NomorUser;

            DB::connection('ConnSales')
                ->table('T_HeaderPesanan')
                ->where('IDSuratPesanan', $id)
                ->where('StatusSP', 3)
                ->update([
                    'AccDirektur' => $idDirektur,
                    'TglAccDirektur' => DB::raw('GETDATE()'),
                    'StatusSP' => 4
                ]);

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Surat Pesanan ' .
                    $id .
                    ' Sudah Disetujui Direktur!'
                );

        } catch (\Throwable $e) {

            return redirect()
                ->back()
                ->with(
                    'error',
                    'Gagal melakukan ACC Surat Pesanan ' .
                    $id .
                    ': ' .
                    $e->getMessage()
                );
        }
    }

    public function updateAll(Request $request)
    {
        try {

            $nosp = $request->input('nomorSPs', []);

            if (!is_array($nosp) || count($nosp) === 0) {

                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Tidak ada Surat Pesanan yang dipilih!'
                    );
            }

            $idDirektur = Auth::user()->NomorUser;

            $nosp = array_unique(
                array_filter($nosp)
            );

            DB::connection('ConnSales')->transaction(function () use ($nosp, $idDirektur) {

                foreach ($nosp as $noSP) {

                    DB::connection('ConnSales')
                        ->table('T_HeaderPesanan')
                        ->where('IDSuratPesanan', $noSP)
                        ->where('StatusSP', 3)
                        ->update([
                            'AccDirektur' => $idDirektur,
                            'TglAccDirektur' => DB::raw('GETDATE()'),
                            'StatusSP' => 4
                        ]);
                }

            });

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Surat Pesanan yang dipilih berhasil disetujui Direktur!'
                );

        } catch (\Throwable $e) {

            return redirect()
                ->back()
                ->with(
                    'error',
                    'Gagal melakukan ACC Direktur: ' .
                    $e->getMessage()
                );
        }
    }

    public function destroy($id)
    {
        //
    }

    public function downloadDokumentasi($id)
    {
        try {

            $id = trim($id);
            if ($id === '') {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'ID Surat Pesanan tidak ditemukan.'
                    );
            }

            $data = DB::connection('ConnSales')
                ->table('T_HeaderPesanan')
                ->where('IDSuratPesanan', $id)
                ->value('Dokumentasi');

            if (empty($data)) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Dokumentasi tidak ditemukan.'
                    );
            }


            $files = array_filter(
                array_map(
                    'trim',
                    explode(',', $data)
                )
            );


            if (empty($files)) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Dokumentasi tidak ditemukan.'
                    );
            }

            $tempDir = storage_path('app/temp-dokumentasi');

            if (!is_dir($tempDir)) {
                mkdir($tempDir,0755,true);
            }

            $safeId = preg_replace(
                '/[^A-Za-z0-9_-]/',
                '_',
                $id
            );


            if (count($files) === 1) {
                $decoded = base64_decode(
                    $files[0],
                    true
                );


                if ($decoded === false) {
                    return redirect()
                        ->back()
                        ->with(
                            'error',
                            'Dokumentasi tidak valid.'
                        );
                }


                $finfo = new \finfo(FILEINFO_MIME_TYPE);
                $mime = $finfo->buffer($decoded);
                $extension = match ($mime) {
                    'image/jpeg' => 'jpg',
                    'image/png' => 'png',
                    'image/gif' => 'gif',
                    'image/webp' => 'webp',
                    'application/pdf' => 'pdf',
                    default => 'bin',
                };

                $fileName =
                    'Dokumentasi_' .
                    $safeId .
                    '.' .
                    $extension;


                $filePath =
                    $tempDir .
                    DIRECTORY_SEPARATOR .
                    $fileName;


                file_put_contents(
                    $filePath,
                    $decoded
                );


                return response()
                    ->download(
                        $filePath,
                        $fileName
                    )
                    ->deleteFileAfterSend(true);
            }


            // =====================================================
            // MULTIPLE FILE -> ZIP
            // =====================================================

            $zipFileName =
                'Dokumentasi_' .
                $safeId .
                '.zip';

            $zipPath =
                $tempDir .
                DIRECTORY_SEPARATOR .
                $zipFileName;


            // =====================================================
            // BUAT ZIP
            // =====================================================

            $zip = new \ZipArchive();
            $result = $zip->open(
                $zipPath,
                \ZipArchive::CREATE |
                \ZipArchive::OVERWRITE
            );


            if ($result !== true) {
                \Log::error(
                    'Gagal membuat ZIP dokumentasi',
                    [
                        'id' => $id,
                        'safeId' => $safeId,
                        'zipPath' => $zipPath,
                        'zipError' => $result,
                    ]
                );

                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Gagal membuat file ZIP.'
                    );
            }

            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $fileNumber = 1;

            foreach ($files as $base64) {
                $decoded = base64_decode($base64,true);

                if ($decoded === false) {
                    continue;
                }

                $mime = $finfo->buffer($decoded);

                $extension = match ($mime) {
                    'image/jpeg' => 'jpg',
                    'image/png' => 'png',
                    'image/gif' => 'gif',
                    'image/webp' => 'webp',
                    'application/pdf' =>'pdf',
                    default => 'bin',
                };

                $fileName =
                    'Dokumentasi' .
                    $fileNumber .
                    '.' .
                    $extension;


                $zip->addFromString(
                    $fileName,
                    $decoded
                );

                $fileNumber++;
            }

            $zip->close();

            return response()
                ->download(
                    $zipPath,
                    $zipFileName
                )
                ->deleteFileAfterSend(true);


        } catch (\Throwable $e) {
            \Log::error(
                'Download Dokumentasi Error',
                [
                    'id' => $id ?? null,
                    'error' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ]
            );


            return redirect()
                ->back()
                ->with(
                    'error',
                    'Gagal download dokumentasi: ' .
                    $e->getMessage()
                );
        }
    }

    public function batal(Request $request)
    {
        try {

            // Ambil SP yang dipilih
            $nosp = $request->input('nomorSPs', []);

            // Pastikan ada SP yang dipilih
            if (!is_array($nosp) || count($nosp) === 0) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Tidak ada Surat Pesanan yang dipilih!'
                    );
            }

            // NomorUser Direktur yang sedang login
            $idDirektur = trim(Auth::user()->NomorUser);

            // Catatan siapa yang melakukan pembatalan + tanggal
            $deletedBy = $idDirektur . ' - ' . now()->format('m/d/Y');

            // Hilangkan data kosong dan duplikat
            $nosp = array_unique(
                array_filter($nosp)
            );

            DB::connection('ConnSales')->transaction(function () use ($nosp, $deletedBy) {

                foreach ($nosp as $noSP) {

                    DB::connection('ConnSales')
                        ->table('T_HeaderPesanan')
                        ->where('IDSuratPesanan', $noSP)
                        ->update([
                            'Deleted' => $deletedBy,
                            'StatusSP' => 5
                        ]);
                }

            });

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Surat Pesanan yang dipilih berhasil dibatalkan!'
                );

        } catch (\Throwable $e) {

            return redirect()
                ->back()
                ->with(
                    'error',
                    'Gagal melakukan pembatalan Surat Pesanan: ' .
                    $e->getMessage()
                );
        }
    }

    public function printSP(Request $request)
    {
        $idSuratPesanan = trim((string) $request->idSuratPesanan);

        if ($idSuratPesanan === '') {
            return response()->json([
                'success' => false,
                'message' => 'ID Surat Pesanan tidak ditemukan.'
            ], 400);
        }

        $header = DB::connection('ConnSales')
            ->table('T_HeaderPesanan as H')
            ->leftJoin('T_JnsSuratPesanan as JSP','H.IDJnsSuratPesanan','=','JSP.IDJnsSuratPesanan')
            ->leftJoin('T_Sales as S','H.IDSales','=','S.IDSales')
            ->leftJoin('T_MataUang as MU','H.IDMataUang','=','MU.IDMataUang')
            ->leftJoin('T_Billing as B','H.IDBill','=','B.IDBill')
            ->leftJoin('T_JnsBayar as JB','H.IDPembayaran','=','JB.IdPembayaran')
            ->leftJoin('T_Customer as C','H.IDCust','=','C.IDCust')
            ->where('H.IDSuratPesanan', $idSuratPesanan)
            ->whereNull('H.Deleted')
            ->select([
                'H.IDSuratPesanan',
                'H.Tgl_Pesan',
                'H.IDCust',
                'C.NamaCust',
                DB::raw('C.Alamat AS AlamatKantor'),
                'C.AlamatKirim',
                'C.Kota',
                'H.NO_PO',
                'H.Tgl_PO',
                'H.NO_PI',
                'H.IDPembayaran',
                'JB.NamaPembayaran',
                'H.IDBill',
                'B.NamaBill',
                'H.IDSales',
                'S.NamaSales',
                'H.IDMataUang',
                'MU.MataUang',
                'H.TglInput',
                'H.AccManager',
                'H.TglAccManager',
                'H.AccDirektur',
                'H.TglAccDirektur',
                'H.SyaratBayar',
                'JSP.JnsSuratPesanan',
                'H.IDJnsSuratPesanan',
                'H.Ket',
                'C.JnsCust',
                'H.JnsFakturPjk',
            ])
            ->first();

        if (!$header) {
            return response()->json([
                'success' => false,
                'message' => 'Data Surat Pesanan tidak ditemukan.'
            ], 404);
        }


        // =====================================================
        // CUSTOMER
        // =====================================================

        $customer = DB::connection('ConnSales')
            ->table('T_Customer as C')
            ->where('C.IDCust', $header->IDCust)
            ->select([
                'C.IDCust',
                'C.NamaCust',
                'C.ContactPerson',
                'C.AlamatKirim',
                'C.Alamat',
                'C.Kota',
                'C.Propinsi',
                'C.Negara',
                'C.KodePos',
                'C.NoTelp1',
                'C.NoTelp2',
                'C.NoFax1',
                'C.NoFax2',
                'C.NoHp1',
                'C.NoHp2',
                'C.NoTelex',
                'C.Email',
                'C.NamaNPWP',
                'C.AlamatNPWP',
                'C.NPWP',
                'C.JnsCust',
            ])
            ->first();


        // =====================================================
        // DETAIL
        // =====================================================

        $details = DB::connection('ConnSales')
            ->table('T_HeaderPesanan as H')
            ->leftJoin('T_Customer as C','H.IDCust','=','C.IDCust')
            ->leftJoin('T_DetailPesanan as D','H.IDSuratPesanan','=','D.IDSuratPesanan')
            ->leftJoin('T_Sales as S','H.IDSales','=','S.IDSales')
            ->leftJoin('T_JnsBayar as JBAYAR','H.IDPembayaran','=','JBAYAR.IdPembayaran')
            ->leftJoin(
                DB::raw('PURCHASE.dbo.Y_BARANG as YB'),
                function ($join) {
                    $join->on(
                        'D.IDBarang',
                        '=',
                        'YB.KD_BRG'
                    )
                    ->whereRaw('LEN(D.IDBarang) = 9');
                }
            )

            // =================================================
            // ID BARANG 20 DIGIT -> INVENTORY.Type
            // =================================================
            ->leftJoin(
                DB::raw('INVENTORY.dbo.Type as TY'),
                function ($join) {
                    $join->on(
                        'D.IDBarang',
                        '=',
                        'TY.IdType'
                    )
                    ->whereRaw('LEN(D.IDBarang) = 20');
                }
            )

            ->leftJoin('T_Sales as Manager','H.AccManager','=','Manager.ID_User')
            ->leftJoin('T_Sales as Direktur','H.AccDirektur','=','Direktur.ID_User')
            ->leftJoin('T_JnsBrg as JBRG','D.IDJnsBarang','=','JBRG.IDJnsBrg')
            ->whereNull('H.Deleted')
            ->where('H.IDSuratPesanan',$idSuratPesanan)
            ->select([
                'JBRG.NamaJnsBrg as JnsBarang',
                DB::raw("
                    CASE
                        WHEN LEN(D.IDBarang) = 20
                            THEN TY.NamaType

                        WHEN LEN(D.IDBarang) = 9
                            THEN YB.NAMA_BRG

                        ELSE NULL
                    END AS NamaType
                "),
                'C.NamaCust',
                'H.IDSuratPesanan as NO_SP',
                'H.Tgl_Pesan as TGL_SP',
                'H.NO_PO',
                'H.Tgl_PO',
                'D.Qty as JmlOrder',
                'D.TerKirim as JmlKirim',
                DB::raw("
                    ISNULL(D.Qty, 0) -
                    ISNULL(D.TerKirim, 0)
                    as SisaOrder
                "),
                'D.Satuan',
                'D.TglRencanaKirim',
                'C.AlamatKirim',
                DB::raw("
                    CASE
                        WHEN LEN(D.IDBarang) = 20
                            THEN TY.KodeBarang

                        WHEN LEN(D.IDBarang) = 9
                            THEN YB.KD_BRG

                        ELSE D.IDBarang
                    END AS KodeBarang
                "),
                'D.Lunas',
                'H.IDCust',
                'C.Alamat',
                'C.Kota',
                'H.NO_PI',
                'S.NamaSales',
                'H.Ket',
                'JBAYAR.NamaPembayaran',
                DB::raw("'-' as NamaBill"),
                'D.IDPesanan',
                'H.SyaratBayar',
                'Manager.NamaSales as Manager',
                'Direktur.NamaSales as Direktur',
            ])

            ->orderBy('JBRG.NamaJnsBrg')
            ->orderBy('NamaType')
            ->get();


        // Tanda tangan Manager
        $manager = null;
        $nomorUserManager = trim(
            (string) $header->AccManager
        );

        if ($nomorUserManager !== '') {

            $manager = DB::connection('ConnEDP')
                ->table('UserMaster')
                ->select([
                    'NomorUser',
                    'NamaUser',
                    'FotoTtd',
                ])
                ->whereRaw(
                    "LTRIM(RTRIM(CAST(NomorUser AS VARCHAR(50)))) = ?",
                    [$nomorUserManager]
                )
                ->first();
        }


        // =====================================================
        // FORMAT FOTO TTD
        // =====================================================

        if ($manager && !empty($manager->FotoTtd)) {
            $fotoTtd = trim((string) $manager->FotoTtd);

            if (str_starts_with(strtolower($fotoTtd), 'data:image/')) {
                $manager->FotoTtd = $fotoTtd;

            } else {
                $decoded = base64_decode($fotoTtd, true);
                if ($decoded !== false) {

                    $finfo = new \finfo(
                        FILEINFO_MIME_TYPE
                    );

                    $mime = $finfo->buffer(
                        $decoded
                    );

                    if (
                        in_array(
                            $mime,
                            [
                                'image/jpeg',
                                'image/png',
                                'image/gif',
                                'image/webp'
                            ],
                            true
                        )
                    ) {

                        $manager->FotoTtd =
                            'data:' .
                            $mime .
                            ';base64,' .
                            $fotoTtd;

                    } else {
                        $manager->FotoTtd = null;
                    }

                } else {

                    $manager->FotoTtd = null;
                }
            }
        }

        $sales = null;
        $idSales = trim((string) $header->IDSales);

        if ($idSales !== '') {
            $salesData = DB::connection('ConnSales')
                ->table('T_Sales')
                ->select([
                    'IDSales',
                    'NamaSales',
                    'ID_User',
                ])
                ->where('IDSales', $idSales)
                ->first();

            if ($salesData && !empty($salesData->ID_User)) {
                $sales = DB::connection('ConnEDP')
                    ->table('UserMaster')
                    ->select([
                        'NomorUser',
                        'FotoTtd',
                    ])
                    ->whereRaw(
                        "LTRIM(RTRIM(CAST(NomorUser AS VARCHAR(50)))) = ?",
                        [trim((string) $salesData->ID_User)]
                    )
                    ->first();
            }
        }


        // =====================================================
        // FORMAT FOTO TTD SALES
        // =====================================================

        if ($sales && !empty($sales->FotoTtd)) {

            $fotoTtdSales = trim(
                (string) $sales->FotoTtd
            );

            if (str_starts_with(
                strtolower($fotoTtdSales),
                'data:image/'
            )) {

                $sales->FotoTtd = $fotoTtdSales;

            } else {
                $decodedSales = base64_decode(
                    $fotoTtdSales,
                    true
                );

                if ($decodedSales !== false) {

                    $finfoSales = new \finfo(
                        FILEINFO_MIME_TYPE
                    );

                    $mimeSales = $finfoSales->buffer(
                        $decodedSales
                    );

                    if (
                        in_array(
                            $mimeSales,
                            [
                                'image/jpeg',
                                'image/png',
                                'image/gif',
                                'image/webp'
                            ],
                            true
                        )
                    ) {

                        $sales->FotoTtd =
                            'data:' .
                            $mimeSales .
                            ';base64,' .
                            $fotoTtdSales;

                    } else {

                        $sales->FotoTtd = null;
                    }

                } else {

                    $sales->FotoTtd = null;
                }
            }
        }

        return response()->json([
            'success'  => true,
            'header'   => $header,
            'customer' => $customer,
            'details'  => $details,
            'manager'  => $manager,
            'sales' => $sales,
        ]);
    }

}
