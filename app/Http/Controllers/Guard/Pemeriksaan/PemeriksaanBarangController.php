<?php

namespace App\Http\Controllers\Guard\Pemeriksaan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
// use SimpleSoftwareIO\QrCode\Facades\QrCode;
// use Illuminate\Encryption\Encrypter;

class PemeriksaanBarangController extends Controller
{
    public function index()
    {
        $user_input = trim(Auth::user()->NomorUser);
        $lokasi = DB::connection('ConnEDP')
            ->select(
                'EXEC SP_4451_EDP_MaintenanceLokasi
                        @kode = ?,
                        @nomorUser = ?',
                [
                    5,
                    $user_input,
                ]
            );
        $lokasi = trim($lokasi[0]->Id_Lokasi);

        if (empty($lokasi)) {
            return redirect('/Guard')->with('status', 'Lokasi user belum terdaftar untuk proses pemeriksaan barang.');
        }

        $access = (new HakAksesController)->HakAksesFiturMaster('Guard');
        $listNoPol = DB::connection('ConnUtility')
            ->select('EXEC SP_5409_PRG_LIST_NOPOL');
        $listExpeditor = DB::connection('ConnSales')
            ->select('EXEC SP_4384_SLS_MASTER @XKode = ?', [8]);
        $listSuratJalan = DB::connection('ConnSales')
            ->select('EXEC SP_1486_SLS_MAINT_HEADERPENGIRIMAN @MyType = ?', [3]);
        // $listCustomer = DB::connection('ConnSales')
        //     ->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        $listSatuan = DB::connection('ConnPurchase')
            ->table('YSATUAN')
            ->select('No_satuan', 'Nama_satuan')
            ->get();
        $listTypeBarang = DB::connection('ConnGuard')
            ->table('Type_Barang')
            ->select('id_typeBarang', 'nama_typeBarang')
            ->get();

        // dd($listTypeBarang);
        // $listNoPol = collect($listNoPol)
        //     ->whereIn('IdType_Mesin', [13, 17])
        //     ->values();
        return view(
            'Guard.Pemeriksaan.PemeriksaanBarang',
            compact(
                'access',
                'listNoPol',
                'listSatuan',
                'listTypeBarang',
                'listExpeditor',
                'listSuratJalan',
                // 'listCustomer'
            )
        );
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $proses = $request->input('proses');
        $tanggal = $request->input('tanggal');
        $nopol = $request->input('nopol');
        $jam_muat_awal = $request->input('jam_muat_awal');
        $jam_muat_akhir = $request->input('jam_muat_akhir');
        $instansi = $request->input('instansi');
        $sopir = $request->input('sopir');
        $keterangan = $request->input('keterangan');
        $tujuan_kirim = $request->tujuan_kirim;
        $ttd_base64 = $request->input('ttd_base64');
        $allRowsDataAtas = $request->input('allRowsDataAtas', []);
        $user_input = trim(Auth::user()->NomorUser);
        $idHeader = $request->input('idHeader');
        $idDetail = $request->input('idDetail');
        $customer = $request->input('customer', 0);
        $tanggal_keluar = $request->input('tanggal_keluar');
        $surat_jalanTerdaftar = $request->surat_jalanTerdaftar;
        $noSeal = $request->noSeal;
        $noContainer = $request->noContainer;
        if ($request->fotoPengiriman) {
            $fotoPengiriman = implode(', ', $request->fotoPengiriman);
        } else {
            $fotoPengiriman = null;
        }
        // dd(
        //     $proses,
        //     $tanggal,
        //     $nopol,
        //     $jam_muat_awal,
        //     $jam_muat_akhir,
        //     $instansi,
        //     $sopir,
        //     $keterangan,
        //     $ttd_base64,
        //     $allRowsDataAtas,
        //     $user_input,
        //     $idHeader,
        //     $idDetail,
        //     $customer,
        //     $surat_jalanTerdaftar,
        //     $noSeal,
        //     $noContainer
        // );
        try {
            switch ($proses) {
                case 1:
                    DB::connection('ConnGuard')->beginTransaction();
                    // Simpan
                    $lokasi = DB::connection('ConnEDP')
                        ->select(
                            'EXEC SP_4451_EDP_MaintenanceLokasi
                        @kode = ?,
                        @nomorUser = ?',
                            [
                                5,
                                $user_input,
                            ]
                        );
                    $lokasi = trim($lokasi[0]->Id_Lokasi);

                    DB::connection('ConnGuard')
                        ->statement(
                            'EXEC SP_4451_PemeriksaanBarang
                        @kode = ?,
                        @tanggal = ?,
                        @nopol = ?,
                        @jam_muat_awal = ?,
                        @jam_muat_akhir = ?,
                        @tujuan_kirim = ?,
                        @instansi = ?,
                        @sopir = ?,
                        @keterangan = ?,
		                @noSeal = ?,
		                @noContainer = ?,
		                @suratJalanTerdaftar = ?,
                        @user_input = ?,
                        @ttd_base64 = ?,
                        @customer = ?,
                        @tanggal_keluar = ?,
                        @idLokasi = ?,
                        @fotoPengiriman = ?',
                            [
                                1,
                                $tanggal,
                                $nopol,
                                $jam_muat_awal,
                                $jam_muat_akhir,
                                $tujuan_kirim,
                                $instansi,
                                $sopir,
                                $keterangan,
                                $noSeal,
                                $noContainer,
                                $surat_jalanTerdaftar,
                                $user_input,
                                $ttd_base64,
                                $customer,
                                $tanggal_keluar,
                                $lokasi,
                                $fotoPengiriman
                            ]
                        );

                    // EXEC KODE = 4 (baru jalan kalau kode 1 sukses)
                    $idHeaderResult = DB::connection('ConnGuard')->select(
                        'EXEC SP_4451_PemeriksaanBarang
                        @kode = ?,
                        @user_input = ?',
                        [
                            4,
                            $user_input,
                        ]
                    );
                    $idHeaderResult = $idHeaderResult[0]->idHeader;
                    // dd($idHeaderResult);

                    if ($idHeaderResult) {
                        foreach ($allRowsDataAtas as $row) {
                            // $jamFull = date('Y-m-d') . ' ' . $row[3];
                            $jamFull = $tanggal . ' ' . $row[3];
                            DB::connection('ConnGuard')->statement(
                                'EXEC SP_4451_PemeriksaanBarang
                            @kode = ?,
                            @idHeader = ?,
                            @type_barang = ?,
                            @jam = ?,
                            @item = ?,
                            @satuan = ?,
                            @tujuan_kirim = ?,
                            @user_input = ?',
                                [
                                    5,
                                    $idHeaderResult,
                                    $row[1],
                                    $jamFull,
                                    $row[4],
                                    $row[5],
                                    $tujuan_kirim,
                                    $user_input
                                ]
                            );
                            // input acc satpam, supir ke table header pengiriman
                            // if (!empty($surat_jalanTerdaftar)) {
                            //     $idPengirimanArray = array_map('trim', explode(',', $surat_jalanTerdaftar));
                            // } else {
                            //     $idPengirimanArray = null;
                            // }

                            // if ($idPengirimanArray) {
                            //     for ($i = 0; $i < count($idPengirimanArray); $i++) {
                            //         $cekIdPengiriman = DB::connection('ConnSales')->select(
                            //             'EXEC SP_1486_SLS_MAINT_HEADERPENGIRIMAN
                            //             @MyType = ?,
                            //             @IDPengiriman = ?',
                            //             [
                            //                 5,
                            //                 $idPengirimanArray[$i]
                            //             ]
                            //         );
                            //         if (!empty($cekIdPengiriman[0])) {
                            //             $payloadSupir = "no_sj=$idPengirimanArray[$i]&jenisAcc=Supir";
                            //             $key = env('QR_SHARED_SECRET');
                            //             if (!$key || strlen($key) !== 32) {
                            //                 throw new Exception('QR key tidak valid');
                            //             }

                            //             $encrypter = new Encrypter($key, 'AES-256-CBC');

                            //             $encryptedPayloadSupir = urlencode(
                            //                 $encrypter->encryptString((string) $payloadSupir)
                            //             );
                            //             $urlSupir = "https://mykrr.co.id/DokumenSJ/view/$encryptedPayloadSupir";
                            //             $ttdBase64_Supir = base64_encode(
                            //                 QrCode::format('png')
                            //                     ->size(150)
                            //                     ->margin(1)
                            //                     ->generate($urlSupir)
                            //             );
                            //             $payloadSatpam = "no_sj=$idPengirimanArray[$i]&jenisAcc=Satpam";
                            //             $encryptedPayloadSatpam = urlencode(
                            //                 $encrypter->encryptString((string) $payloadSatpam)
                            //             );
                            //             $urlSatpam = "https://mykrr.co.id/DokumenSJ/view/$encryptedPayloadSatpam";
                            //             $ttdBase64_Satpam = base64_encode(
                            //                 QrCode::format('png')
                            //                     ->size(150)
                            //                     ->margin(1)
                            //                     ->generate($urlSatpam)
                            //             );
                            //             DB::connection('ConnSales')->statement(
                            //                 'EXEC SP_1486_SLS_MAINT_HEADERPENGIRIMAN
                            //             @MyType = ?,
                            //             @AccSupir = ?,
                            //             @GbrAccSupir = ?,
                            //             @AccSatpam = ?,
                            //             @GbrAccSatpam = ?,
                            //             @IDPengiriman = ?,
                            //             @NoSeal = ?,
                            //             @NoContainer = ?',
                            //                 [
                            //                     4,
                            //                     $sopir,
                            //                     $ttdBase64_Supir,
                            //                     $user_input,
                            //                     $ttdBase64_Satpam,
                            //                     $idPengirimanArray[$i],
                            //                     $noSeal,
                            //                     $noContainer
                            //                 ]
                            //             );
                            //         }
                            //     }
                            // }
                        }
                    }

                    DB::connection('ConnGuard')->commit();
                    return response()->json(['message' => 'Data berhasil disimpan!']);
                case 2:
                    // Update
                    DB::connection('ConnGuard')->beginTransaction();
                    $oldData = DB::connection('ConnGuard')
                        ->select('EXEC SP_4451_PemeriksaanBarang @Kode = ?, @idHeader = ?', [7, $idHeader]);
                    // dd($oldData);
                    $surat_jalanTerdaftarOld = $oldData[0]->surat_jalanTerdaftar;
                    // Simpan
                    DB::connection('ConnGuard')
                        ->statement(
                            'EXEC SP_4451_PemeriksaanBarang
                        @kode = ?,
                        @idHeader = ?,
                        @tanggal = ?,
                        @nopol = ?,
                        @jam_muat_awal = ?,
                        @jam_muat_akhir = ?,
                        @tujuan_kirim = ?,
                        @instansi = ?,
                        @sopir = ?,
                        @keterangan = ?,
		                @noSeal = ?,
		                @noContainer = ?,
		                @suratJalanTerdaftar = ?,
                        @user_input = ?,
                        @customer = ?,
                        @tanggal_keluar = ?,
                        @ttd_base64 = ?,
                        @fotoPengiriman = ?',
                            [
                                2,
                                $idHeader,
                                $tanggal,
                                $nopol,
                                $jam_muat_awal,
                                $jam_muat_akhir,
                                $tujuan_kirim,
                                $instansi,
                                $sopir,
                                $keterangan,
                                $noSeal,
                                $noContainer,
                                $surat_jalanTerdaftar,
                                $user_input,
                                $customer,
                                $tanggal_keluar,
                                $ttd_base64,
                                $fotoPengiriman,
                            ]
                        );
                    foreach ($allRowsDataAtas as $row) {
                        $jamFull = $tanggal . ' ' . $row[3];
                        // JIKA ID DETAIL KOSONG (DATA BARU)
                        if ($row[0] == '' || $row[0] === null) {
                            DB::connection('ConnGuard')->statement(
                                'EXEC SP_4451_PemeriksaanBarang
                            @kode = ?,
                            @idHeader = ?,
                            @type_barang = ?,
                            @jam = ?,
                            @item = ?,
                            @satuan = ?,
                            @tujuan_kirim = ?,
                            @user_input = ?',
                                [
                                    5,                 // contoh: kode INSERT
                                    $idHeader,          // header
                                    $row[1],            // type_barang
                                    $jamFull,
                                    $row[4],            // item
                                    $row[5],            // satuan
                                    $tujuan_kirim,
                                    $user_input
                                ]
                            );
                        } else {
                            // JIKA ID DETAIL ADA (UPDATE)
                            DB::connection('ConnGuard')->statement(
                                'EXEC SP_4451_PemeriksaanBarang
                            @kode = ?,
                            @idDetail = ?,
                            @type_barang = ?,
                            @jam = ?,
                            @item = ?,
                            @satuan = ?,
                            @tujuan_kirim = ?,
                            @user_input = ?',
                                [
                                    9,
                                    $row[0],
                                    $row[1],
                                    $jamFull,
                                    $row[4],
                                    $row[5],
                                    $tujuan_kirim,
                                    $user_input
                                ]
                            );
                        }
                    }

                    // koreksi acc satpam, supir yang ada di table header pengiriman
                    // // Update data T_HeaderPengiriman
                    // $newArray = $surat_jalanTerdaftar
                    //     ? array_map('trim', explode(',', $surat_jalanTerdaftar))
                    //     : [];

                    // $oldArray = $surat_jalanTerdaftarOld
                    //     ? array_map('trim', explode(',', $surat_jalanTerdaftarOld))
                    //     : [];
                    // $toInsert = array_diff($newArray, $oldArray);
                    // $toDelete = array_diff($oldArray, $newArray);
                    // foreach ($toInsert as $sj) {
                    //     $cekIdPengiriman = DB::connection('ConnSales')->select(
                    //         'EXEC SP_1486_SLS_MAINT_HEADERPENGIRIMAN
                    //                     @MyType = ?,
                    //                     @IDPengiriman = ?',
                    //         [
                    //             5,
                    //             $sj
                    //         ]
                    //     );
                    //     if (!empty($cekIdPengiriman[0])) {
                    //         $payloadSupir = "no_sj=$sj&jenisAcc=Supir";
                    //         $key = env('QR_SHARED_SECRET');
                    //         if (!$key || strlen($key) !== 32) {
                    //             throw new Exception('QR key tidak valid');
                    //         }

                    //         $encrypter = new Encrypter($key, 'AES-256-CBC');

                    //         $encryptedPayloadSupir = urlencode(
                    //             $encrypter->encryptString((string) $payloadSupir)
                    //         );
                    //         $urlSupir = "https://mykrr.co.id/DokumenSJ/view/$encryptedPayloadSupir";
                    //         $ttdBase64_Supir = base64_encode(
                    //             QrCode::format('png')
                    //                 ->size(150)
                    //                 ->margin(1)
                    //                 ->generate($urlSupir)
                    //         );
                    //         $payloadSatpam = "no_sj=$sj&jenisAcc=Satpam";
                    //         $encryptedPayloadSatpam = urlencode(
                    //             $encrypter->encryptString((string) $payloadSatpam)
                    //         );
                    //         $urlSatpam = "https://mykrr.co.id/DokumenSJ/view/$encryptedPayloadSatpam";
                    //         $ttdBase64_Satpam = base64_encode(
                    //             QrCode::format('png')
                    //                 ->size(150)
                    //                 ->margin(1)
                    //                 ->generate($urlSatpam)
                    //         );
                    //         DB::connection('ConnSales')->statement(
                    //             'EXEC SP_1486_SLS_MAINT_HEADERPENGIRIMAN
                    //                     @MyType = ?,
                    //                     @AccSupir = ?,
                    //                     @GbrAccSupir = ?,
                    //                     @AccSatpam = ?,
                    //                     @GbrAccSatpam = ?,
                    //                     @IDPengiriman = ?,
                    //                     @NoSeal = ?,
                    //                     @NoContainer = ?',
                    //             [
                    //                 4,
                    //                 $sopir,
                    //                 $ttdBase64_Supir,
                    //                 $user_input,
                    //                 $ttdBase64_Satpam,
                    //                 $sj,
                    //                 $noSeal,
                    //                 $noContainer
                    //             ]
                    //         );
                    //     }
                    // }

                    // foreach ($toDelete as $sj) {
                    //     DB::connection('ConnSales')->statement(
                    //         'EXEC SP_1486_SLS_MAINT_HEADERPENGIRIMAN
                    //                     @MyType = ?,
                    //                     @AccSupir = ?,
                    //                     @GbrAccSupir = ?,
                    //                     @AccSatpam = ?,
                    //                     @GbrAccSatpam = ?,
                    //                     @IDPengiriman = ?,
                    //                     @NoSeal = ?,
                    //                     @NoContainer = ?',
                    //         [
                    //             4,
                    //             null,
                    //             null,
                    //             null,
                    //             null,
                    //             $sj,
                    //             (string) 'Data Talisit idheader ' . $idHeader . ' telah diproses update oleh: ' . $user_input,
                    //             (string) 'Nomor SJ Removed: ' . implode(', ', $toDelete) . ' Nomor SJ Added: ' . implode(', ', $toInsert)
                    //         ]
                    //     );
                    // }
                    DB::connection('ConnGuard')->commit();
                    return response()->json(['message' => 'Data berhasil dikoreksi!']);
                case 3:
                    // Delete
                    DB::connection('ConnGuard')->beginTransaction();

                    // delete acc satpam, supir di table header pengiriman
                    // $dataHeader = DB::connection('ConnGuard')
                    //     ->select('EXEC SP_4451_PemeriksaanBarang @Kode = ?, @idHeader = ?', [7, $idHeader]);
                    // dd($dataHeader);
                    // $dataSurat_jalanTerdaftar = $dataHeader[0]->surat_jalanTerdaftar;
                    // $arraySurat_jalanTerdaftar = $dataSurat_jalanTerdaftar
                    //     ? array_map('trim', explode(',', $dataSurat_jalanTerdaftar))
                    //     : [];
                    // foreach ($arraySurat_jalanTerdaftar as $sj) {
                    //     DB::connection('ConnSales')->statement(
                    //         'EXEC SP_1486_SLS_MAINT_HEADERPENGIRIMAN
                    //                     @MyType = ?,
                    //                     @AccSupir = ?,
                    //                     @GbrAccSupir = ?,
                    //                     @AccSatpam = ?,
                    //                     @GbrAccSatpam = ?,
                    //                     @IDPengiriman = ?,
                    //                     @NoSeal = ?,
                    //                     @NoContainer = ?',
                    //         [
                    //             4,
                    //             null,
                    //             null,
                    //             null,
                    //             null,
                    //             $sj,
                    //             (string) 'Data Talisit idheader ' . $idHeader . ' telah diproses hapus oleh: ' . $user_input,
                    //             (string) 'Nomor SJ Removed: ' . implode(',', $arraySurat_jalanTerdaftar)
                    //         ]
                    //     );
                    // }

                    DB::connection('ConnGuard')->statement(
                        'EXEC SP_4451_PemeriksaanBarang
                            @kode = ?,
                            @idHeader = ?',
                        [
                            3,
                            $idHeader
                        ]
                    );

                    DB::connection('ConnGuard')->commit();
                    return response()->json(['message' => 'Data berhasil dihapus!']);

                case 4:
                    // Delete
                    DB::connection('ConnGuard')->statement(
                        'EXEC SP_4451_PemeriksaanBarang
                            @kode = ?,
                            @idDetail = ?',
                        [
                            10,
                            $idDetail
                        ]
                    );
                    return response()->json(['message' => 'Data berhasil detail dihapus!']);

                default:
                    return response()->json(['error', 'Proses tidak valid']);
            }

        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getDataDetail') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $user = trim(Auth::user()->NomorUser);
            // dd($request->all());
            // $type_kain = $request->input('type_kain');
            $results = DB::connection('ConnGuard')
                ->select('EXEC SP_4451_PemeriksaanBarang @Kode = ?,
                @tgl_awal = ?,
                @tgl_akhir = ?,
                @nomorUser = ?',
                    [
                        6,
                        $tgl_awal,
                        $tgl_akhir,
                        $user
                    ]
                );
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'idHeader' => trim($row->idHeader),
                    'jam_muat' => Carbon::parse($row->jam_muat_awal)->format('H:i')
                        . ' - ' .
                        Carbon::parse($row->jam_muat_akhir)->format('H:i'),
                    'nopol' => trim($row->nopol) ?? "",
                    'instansi' => trim($row->instansi) ?? "",
                    'sopir' => trim($row->sopir) ?? "",
                    'NamaUser_Input' => trim($row->NamaUser_Input) ?? "",
                    'NamaUser_Acc' => trim($row->NamaUser_Acc) ?? "",
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataKoreksiHeader') {
            $idHeader = $request->input('idHeader');
            // dd($request->all());
            // $type_kain = $request->input('type_kain');
            $results = DB::connection('ConnGuard')
                ->select('EXEC SP_4451_PemeriksaanBarang @Kode = ?, @idHeader = ?', [7, $idHeader]);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'idHeader' => trim($row->idHeader),
                    'jam_muat_awal' => $row->jam_muat_awal,
                    'jam_muat_akhir' => $row->jam_muat_akhir,
                    'nopol' => trim($row->nopol) ?? "",
                    'tujuan_kirim' => trim($row->tujuan_kirim) ?? "",
                    'instansi' => trim($row->instansi) ?? "",
                    'sopir' => trim($row->sopir) ?? "",
                    'keterangan' => trim($row->keterangan) ?? "",
                    'ttd_base64' => trim($row->ttd_base64) ?? "",
                    'user_input' => trim($row->user_input),
                    'customer' => trim($row->customer) ?? "0",
                    'surat_jalanTerdaftar' => trim($row->surat_jalanTerdaftar) ?? "",
                    'no_seal' => trim($row->no_seal) ?? "",
                    'no_container' => trim($row->no_container) ?? "",
                    'foto_pengiriman' => trim($row->foto_pengiriman) ?? "",
                    'tanggal_keluar' => trim($row->tanggal_keluar) ?? null
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataKoreksiDetail') {
            $idHeader = $request->input('idHeader');
            // dd($request->all());
            $results = DB::connection('ConnGuard')
                ->select('EXEC SP_4451_PemeriksaanBarang @Kode = ?, @idHeader = ?', [8, $idHeader]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'idDetail' => $row->idDetail,
                    'type_barang' => trim($row->type_barang),
                    'nama_typeBarang' => $row->nama_typeBarang,
                    'jam' => $row->jam,
                    'item' => $row->item,
                    'tujuan_kirimText' => $row->tujuan_kirimText,
                    'tujuan_kirimValue' => $row->tujuan_kirimValue,
                    'suratJalanCustomer' => $row->suratJalanCustomer,
                    'NoSeal' => trim($row->NoSeal) ?? "",
                    'NoContainer' => trim($row->NoContainer) ?? "",
                    'satuan' => trim($row->satuan) ?? "",
                    'Nama_satuan' => trim($row->Nama_satuan) ?? "",
                    'user_input' => trim($row->user_input) ?? "",
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getPrint') {
            $idHeader = $request->input('idHeaderLink');
            $nomorUser = trim(Auth::user()->NomorUser);

            $headerRaw = DB::connection('ConnGuard')
                ->select('EXEC SP_4451_PemeriksaanBarang @Kode = ?, @idHeader = ?', [7, $idHeader]);
            // dd($headerRaw);
            $header = null;
            if (!empty($headerRaw)) {
                $row = $headerRaw[0]; // header pasti 1 baris
                $header = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'idHeader' => trim($row->idHeader),
                    'jam_muat_awal' => $row->jam_muat_awal,
                    'jam_muat_akhir' => $row->jam_muat_akhir,
                    'jam_muat' => Carbon::parse($row->jam_muat_awal)->format('H:i')
                        . ' - ' .
                        Carbon::parse($row->jam_muat_akhir)->format('H:i'),
                    'nopol' => trim($row->nopol) ?? "",
                    'tujuan_kirim' => trim($row->tujuan_kirim) ?? "",
                    'instansi' => trim($row->instansi) ?? "",
                    'sopir' => trim($row->sopir) ?? "",
                    'keterangan' => trim($row->keterangan) ?? "",
                    'surat_jalanTerdaftar' => trim($row->surat_jalanTerdaftar) ?? "",
                    'no_seal' => trim($row->no_seal) ?? "",
                    'no_container' => trim($row->no_container) ?? "",
                    'user_input' => trim($row->user_input),
                    'NamaUser' => trim($row->NamaUser) ?? "",
                    'ttd_base64' => trim($row->ttd_base64) ?? "",
                    'fotoTtdAcc' => trim($row->fotoTtd) ?? "",
                    'NamaUserK' => trim($row->NamaUserK) ?? "",
                    'FotoTtdK' => trim($row->FotoTtdK) ?? "",
                    'customer' => trim($row->customer) ?? "0",
                    'user_koreksi' => trim($row->user_koreksi) ?? "",
                    'foto_pengiriman' => trim($row->foto_pengiriman) ?? ""
                ];
            }

            $ttdRaw = DB::connection('ConnEDP')
                ->select('EXEC SP_4451_EDP_MaintenanceTTDUser @XKode = ?, @XNomorUser = ?', [2, $header['user_input']]);

            $ttd = null;
            if (!empty($ttdRaw)) {
                $row = $ttdRaw[0]; // ttd pasti 1 baris
                $ttd = [
                    'NamaUser' => $row->NamaUser,
                    'FotoTtd' => trim($row->FotoTtd),
                ];
            }

            $detailRaw = DB::connection('ConnGuard')
                ->select('EXEC SP_4451_PemeriksaanBarang @Kode = ?, @idHeader = ?', [8, $idHeader]);

            $detail = [];
            foreach ($detailRaw as $row) {
                $detail[] = [
                    'idDetail' => $row->idDetail,
                    'type_barang' => trim($row->type_barang),
                    'nama_typeBarang' => $row->nama_typeBarang,
                    'jam' => $row->jam,
                    'item' => $row->item,
                    'tujuan_kirim' => $row->tujuan_kirimText,
                    'satuan' => trim($row->satuan) ?? "",
                    'Nama_satuan' => trim($row->Nama_satuan) ?? "",
                    'user_input' => trim($row->user_input) ?? "",
                ];
            }

            return response()->json([
                'header' => $header,
                'ttd' => $ttd,
                'detail' => $detail
            ]);
        }
    }

    public function downloadPdf($idHeader)
    {
        $headerRaw = DB::connection('ConnGuard')
            ->select(
                'EXEC SP_4451_PemeriksaanBarang @Kode = ?, @idHeader = ?',
                [7, $idHeader]
            );

        if (empty($headerRaw)) {
            abort(404);
        }

        $row = $headerRaw[0];

        $header = [
            'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
            'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
            'idHeader' => trim($row->idHeader),
            'jam_muat' => Carbon::parse($row->jam_muat_awal)->format('H:i')
                . ' - ' .
                Carbon::parse($row->jam_muat_akhir)->format('H:i'),
            'jam_muat_awal' => $row->jam_muat_awal,
            'jam_muat_akhir' => $row->jam_muat_akhir,
            'nopol' => trim($row->nopol),
            'tujuan_kirim' => trim($row->tujuan_kirim),
            'instansi' => trim($row->instansi),
            'sopir' => trim($row->sopir),
            'keterangan' => trim($row->keterangan),
            'surat_jalanTerdaftar' => trim($row->surat_jalanTerdaftar),
            'no_seal' => trim($row->no_seal),
            'no_container' => trim($row->no_container),
            'NamaUser' => trim($row->NamaUser),
            'NamaUserK' => trim($row->NamaUserK),
            'ttd_base64' => trim($row->ttd_base64),
            'fotoTtdAcc' => trim($row->fotoTtd),
            'FotoTtdK' => trim($row->FotoTtdK),
            'foto_pengiriman' => trim($row->foto_pengiriman),
            'customer' => trim($row->customer),
        ];

        $ttdRaw = DB::connection('ConnEDP')
            ->select(
                'EXEC SP_4451_EDP_MaintenanceTTDUser
                @XKode=?,
                @XNomorUser=?',
                [
                    2,
                    $row->user_input
                ]
            );

        $ttd = null;

        if (!empty($ttdRaw)) {
            $ttd = [
                'NamaUser' => $ttdRaw[0]->NamaUser,
                'FotoTtd' => trim($ttdRaw[0]->FotoTtd)
            ];
        }

        $detailRaw = DB::connection('ConnGuard')
            ->select(
                'EXEC SP_4451_PemeriksaanBarang
                @Kode=?,
                @idHeader=?',
                [
                    8,
                    $idHeader
                ]
            );

        $detail = [];

        foreach ($detailRaw as $d) {

            $detail[] = [
                'nama_typeBarang' => $d->nama_typeBarang,
                'jam' => $d->jam,
                'item' => $d->item,
                'tujuan_kirim' => $d->tujuan_kirimText,
                'Nama_satuan' => trim($d->Nama_satuan)
            ];
        }

        $view = $header['customer'] == 1
            ? 'Guard.Pemeriksaan.PemeriksaanBarangCustomerPDF'
            : 'Guard.Pemeriksaan.PemeriksaanBarangPDF';

        $pdf = Pdf::loadView(
            $view,
            compact(
                'header',
                'ttd',
                'detail'
            )
        );

        $pdf->setPaper('a3', 'portrait');

        return $pdf->download(
            'PemeriksaanBarang-' . $idHeader . '.pdf'
        );
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
