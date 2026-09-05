<?php

namespace App\Http\Controllers\Guard\Pemeriksaan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Encryption\Encrypter;
use Illuminate\Support\Facades\Http;

class ACCGudangPBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Guard');

        // dd($listTypeBarang);
        // $listNoPol = collect($listNoPol)
        //     ->whereIn('IdType_Mesin', [13, 17])
        //     ->values();
        return view('Guard.Pemeriksaan.ACCGudangPB', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $rowDataArray = $request->input('checkedRows', []);
        $nomorUser = trim(Auth::user()->NomorUser);
        $status_acc = $request->input('status_acc');
        // dd($rowDataArray);
        if (empty($rowDataArray)) {
            return response()->json(['error' => 'TIDAK DAPAT Proses Data, karena tidak ada Data!!!..']);
        }

        $adaProses = false;

        if ($status_acc == 'ACC') {
            foreach ($rowDataArray as $item) {
                if (isset($item['idHeader']) && !empty($item['idHeader'])) {
                    $adaProses = true;
                    $dataHeaderPengiriman = DB::connection('ConnGuard')->select(
                        'EXEC SP_4451_PemeriksaanBarang
                        @kode = ?,
                        @idHeader = ?',
                        [
                            11,
                            $item['idHeader']
                        ]
                    );

                    // dd($item['idHeader']);
                    $headerRaw = DB::connection('ConnGuard')
                        ->select('EXEC SP_4451_PemeriksaanBarang @Kode = ?, @idHeader = ?', [7, $item['idHeader']]);
                    // dd($headerRaw);
                    $header = null;
                    if (!empty($headerRaw)) {
                        $row = $headerRaw[0]; // header pasti 1 baris
                        $header = [
                            'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                            'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                            'tanggal_indo' => Carbon::parse($row->tanggal)->format('d-m-Y'),
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
                            'NamaUserIn' => trim($row->NamaUserIn) ?? "",
                            'NamaPemeriksa' => trim($row->NamaUserK ?? '') ?: trim($row->NamaUserIn ?? ''),
                            'FotoTtdK' => trim($row->FotoTtdK) ?? "",
                            'customer' => trim($row->customer) ?? "0",
                            'user_koreksi' => trim($row->user_koreksi) ?? "",
                            'tanggal_keluar' => trim($row->tanggal_keluar) ?? "",
                            'foto_pengiriman' => trim($row->foto_pengiriman) ?? "",
                            'Id_Lokasi' => match (trim($row->Id_Lokasi ?? '')) {
                                'JKK' => 'Jekek',
                                'JMB' => 'Jombang',
                                'MJS' => 'Mojosari',
                                'MLH' => 'Mlorah',
                                'TPD' => 'Tropodo',
                                default => trim($row->Id_Lokasi ?? ''),
                            },
                        ];
                    }

                    $detailRaw = DB::connection('ConnGuard')
                        ->select('EXEC SP_4451_PemeriksaanBarang @Kode = ?, @idHeader = ?', [8, $item['idHeader']]);

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

                    // ===============================
                    // HITUNG TOTAL PER TIPE BARANG + SATUAN
                    // ===============================
                    $totalPerGroup = [];

                    foreach ($detail as $items) {
                        $type = $items['nama_typeBarang'] ?? '';
                        $satuan = $items['Nama_satuan'] ?? '';
                        $key = $type . '__' . $satuan;

                        if (!isset($totalPerGroup[$key])) {
                            $totalPerGroup[$key] = [
                                'type' => $type,
                                'satuan' => $satuan,
                                'total' => 0,
                            ];
                        }

                        $totalPerGroup[$key]['total'] += (float) $items['item'];
                    }

                    // Membuat text untuk WhatsApp
                    $tipeBarangText = [];

                    foreach ($totalPerGroup as $group) {
                        $jumlah = rtrim(rtrim(number_format($group['total'], 2, '.', ''), '0'), '.');

                        $tipeBarangText[] = "- {$group['type']} ({$jumlah} {$group['satuan']})";
                    }

                    $tipeBarang = implode("\n", $tipeBarangText);

                    if ($dataHeaderPengiriman[0]->surat_jalanTerdaftar) {
                        $idPengirimanArray = array_map(
                            'trim',
                            explode(',', $dataHeaderPengiriman[0]->surat_jalanTerdaftar)
                        );
                    } else {
                        $idPengirimanArray = null;
                    }

                    if ($idPengirimanArray) {
                        for ($i = 0; $i < count($idPengirimanArray); $i++) {
                            $cekIdPengiriman = DB::connection('ConnSales')->select(
                                'EXEC SP_1486_SLS_MAINT_HEADERPENGIRIMAN
                                        @MyType = ?,
                                        @IDPengiriman = ?',
                                [
                                    5,
                                    $idPengirimanArray[$i]
                                ]
                            );
                            if (!empty($cekIdPengiriman[0])) {
                                $payloadSupir = "no_sj=$idPengirimanArray[$i]&jenisAcc=Supir";
                                $key = env('QR_SHARED_SECRET');
                                if (!$key || strlen($key) !== 32) {
                                    throw new Exception('QR key tidak valid');
                                }

                                $encrypter = new Encrypter($key, 'AES-256-CBC');

                                $encryptedPayloadSupir = urlencode(
                                    $encrypter->encryptString((string) $payloadSupir)
                                );
                                $urlSupir = "https://mykrr.co.id/DokumenSJ/view/$encryptedPayloadSupir";
                                $ttdBase64_Supir = base64_encode(
                                    QrCode::format('png')
                                        ->size(150)
                                        ->margin(1)
                                        ->generate($urlSupir)
                                );
                                $payloadSatpam = "no_sj=$idPengirimanArray[$i]&jenisAcc=Satpam";
                                $encryptedPayloadSatpam = urlencode(
                                    $encrypter->encryptString((string) $payloadSatpam)
                                );
                                $urlSatpam = "https://mykrr.co.id/DokumenSJ/view/$encryptedPayloadSatpam";
                                $ttdBase64_Satpam = base64_encode(
                                    QrCode::format('png')
                                        ->size(150)
                                        ->margin(1)
                                        ->generate($urlSatpam)
                                );
                                DB::connection('ConnSales')->statement(
                                    'EXEC SP_1486_SLS_MAINT_HEADERPENGIRIMAN
                                        @MyType = ?,
                                        @AccSupir = ?,
                                        @GbrAccSupir = ?,
                                        @AccSatpam = ?,
                                        @GbrAccSatpam = ?,
                                        @IDPengiriman = ?,
                                        @NoSeal = ?,
                                        @NoContainer = ?',
                                    [
                                        4,
                                        $dataHeaderPengiriman[0]->sopir,
                                        $ttdBase64_Supir,
                                        $dataHeaderPengiriman[0]->user_input,
                                        $ttdBase64_Satpam,
                                        $idPengirimanArray[$i],
                                        $dataHeaderPengiriman[0]->no_seal,
                                        $dataHeaderPengiriman[0]->no_container
                                    ]
                                );
                            }
                        }
                    }

                    // Call the stored procedure for each item
                    DB::connection('ConnGuard')
                        ->statement('EXEC SP_4451_ACCGudangPB @Kode = ?, @user_input = ?, @idHeader = ?', [2, $nomorUser, $item['idHeader']]);

                    if ($dataHeaderPengiriman[0]->customer == 1) {
                        $response = Http::withHeaders([
                            'Authorization' => env('WA_TOKEN')
                        ])->post('https://api.fonnte.com/send', [
                                    'target' => '62818510828-1476677731@g.us',
                                    'message' => "*Pemberitahuan Barang Customer Keluar Area KRR (" . $header['Id_Lokasi'] . ")*\n\n"
                                        // . "Tujuan Kirim: " . strtoupper($header['tujuan_kirim']) . "\n"
                                        . "Tanggal: " . date('d-m-Y', strtotime($header['tanggal_keluar'])) . "\n"
                                        . "Jam: " . date('H:i', strtotime($header['tanggal_keluar'])) . "\n"
                                        . "Tujuan Kirim: " . $header['tujuan_kirim'] . "\n"
                                        . "Surat Jalan: " . $header['surat_jalanTerdaftar'] . "\n"
                                        . "Nopol: " . $header['nopol'] . "\n"
                                        . "Expeditor: " . $header['instansi'] . "\n"
                                        . "No. Seal / Container: " . $header['no_seal'] . " / " . $header['no_container'] . "\n"
                                        . "Tipe Barang:\n" . $tipeBarang . "\n"
                                        . "Pemeriksa Barang: " . $header['NamaPemeriksa'] . "\n"
                                        . "Penyedia Barang: " . Auth::user()->NamaUser . "\n"
                                        . "Sopir: " . $header['sopir'] . "\n"
                                        . "\n\n_Pesan ini terkirim otomatis menggunakan website KRR_",
                                ]);
                    }
                }
            }

            if ($adaProses) {
                return response()->json(['message' => 'Data berhasil diACC!!..']);
            } else {
                return response()->json(['error' => 'Pilih dulu datanya!!.. dengan memberi tanda centang']);
            }
        } else {
            foreach ($rowDataArray as $item) {
                if (isset($item['idHeader']) && !empty($item['idHeader'])) {
                    $adaProses = true;
                    DB::connection('ConnGuard')
                        ->statement('EXEC SP_4451_ACCGudangPB @Kode = ?, @user_input = ?, @idHeader = ?', [4, $nomorUser, $item['idHeader']]);
                }
            }

            if ($adaProses) {
                return response()->json(['message' => 'Data berhasil dibatal ACC!!..']);
            } else {
                return response()->json(['error' => 'Pilih dulu datanya!!.. dengan memberi tanda centang']);
            }

        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $user_input = trim(Auth::user()->NomorUser);
            $status_acc = $request->input('status_acc');
            // dd($request->all());
            // $type_kain = $request->input('type_kain');
            if ($status_acc == 'ACC') {
                $results = DB::connection('ConnGuard')
                    ->select('EXEC SP_4451_ACCGudangPB @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @nomorUser = ?', [1, $tgl_awal, $tgl_akhir, $user_input]);
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
                        'tujuan_kirim' => trim($row->tujuan_kirim) ?? "",
                        'sopir' => trim($row->sopir) ?? "",
                        'NamaUser' => trim($row->NamaUser),
                    ];
                }
                // dd($response);
                return datatables($response)->make(true);
            } else {
                // Batal ACC
                $results = DB::connection('ConnGuard')
                    ->select('EXEC SP_4451_ACCGudangPB @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @nomorUser = ?', [5, $tgl_awal, $tgl_akhir, $user_input]);
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
                        'tujuan_kirim' => trim($row->tujuan_kirim) ?? "",
                        'sopir' => trim($row->sopir) ?? "",
                        'NamaUser' => trim($row->NamaUser),
                    ];
                }
                // dd($response);
                return datatables($response)->make(true);
            }
        }
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
