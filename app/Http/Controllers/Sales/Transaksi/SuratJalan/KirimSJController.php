<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratJalan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Mail;
use Illuminate\Encryption\Encrypter;
use Exception;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;
use ZipArchive;

class KirimSJController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Transaksi.SuratJalan.KirimSJ', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $jenisProses = $request->jenisProses;
        if ($jenisProses == 'kirimSJ') {
            $idPengiriman = $request->idPengiriman;

            try {
                DB::connection('ConnSales')->beginTransaction();
                // proses check apakah customer sudah memiliki perwakilan(user) sekaligus select email customer
                $emailCustomer = DB::connection('ConnSales')
                    ->select(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [0, $idPengiriman]
                    );

                $emails = collect($emailCustomer)
                    ->pluck('Email')
                    ->filter()
                    ->merge([
                        'shipment@kertarajasa.co.id'
                    ])
                    ->unique()
                    ->values()
                    ->toArray();

                if (count($emails) <= 1) {
                    return response()->json(['error' => 'Permohonan konfirmasi penerimaan barang tidak dikirim, customer belum register']);
                }

                // proses update kolom kirim customer, proses insert into database public web
                DB::connection('ConnSales')
                    ->statement(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [2, $idPengiriman]
                    );
                //get data to send email
                $dataSuratJalan = DB::connection('ConnSales')
                    ->select(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [3, $idPengiriman]
                    );
                // proses send email permintaan acc customer
                Mail::mailer('MailShipment')->send([], [], function ($message) use ($emails, $idPengiriman, $dataSuratJalan) {
                    $data = $dataSuratJalan[0];

                    $product = $data->NamaType ?? '-';

                    $satPrimer = trim($data->satPrimer);
                    $satSekunder = trim($data->satSekunder);
                    $satTritier = trim($data->satTritier);

                    $satJualRaw = trim($data->satJual);
                    $satJual = $this->formatSatuan($satJualRaw);

                    $qty = 0;
                    if ($satJualRaw == $satPrimer) {
                        $qty = $data->QtyPrimer ?? '-';
                    } else if ($satJualRaw == $satSekunder) {
                        $qty = $data->QtySekunder ?? '-';
                    } else if ($satJualRaw == $satTritier) {
                        $qty = $data->QtyTritier ?? '-';
                    }
                    $formattedQty = $this->formatQuantity($qty);
                    $transporter = $data->NamaExpeditor ?? '-';
                    $licensePlate = $data->TrukNopol ?? '-';
                    $driverName = $data->NamaSupir ?? '-';
                    $key = env('QR_SHARED_SECRET'); // 32 chars
                    $cipher = 'AES-256-CBC';

                    $encrypter = new Encrypter($key, $cipher);
                    $encryptedIdPengiriman = urlencode($encrypter->encryptString((string) $idPengiriman));

                    // $link = url('/surat-jalan/' . $idPengiriman); // change to your real route
                    // $encodedIdPengiriman = hash_hmac('sha256', $idPengiriman, env('QR_SHARED_SECRET'));
                    $link = 'https://mykrr.co.id/SuratJalan/' . $encryptedIdPengiriman; // change to your real route
                    $linkWeb = 'https://mykrr.co.id/';
                    $message->to($emails)
                        ->subject("SJ Digital {$idPengiriman} Kerta Rajasa Raya")
                        ->html("<p>Dear Customer,</p>

                        <p>Berikut detail Surat Jalan Digital:</p>

                        <table border='1' cellpadding='8' cellspacing='0' style='border-collapse: collapse;'>
                            <tr>
                                <td><strong>ID Pengiriman</strong></td>
                                <td>{$idPengiriman}</td>
                            </tr>
                            <tr>
                                <td><strong>Product</strong></td>
                                <td>{$product}</td>
                            </tr>
                            <tr>
                                <td><strong>Quantity</strong></td>
                                <td>{$formattedQty} {$satJual}</td>
                            </tr>
                            <tr>
                                <td><strong>Transporter</strong></td>
                                <td>{$transporter}</td>
                            </tr>
                            <tr>
                                <td><strong>License Plate Number</strong></td>
                                <td>{$licensePlate}</td>
                            </tr>
                            <tr>
                                <td><strong>Driver Name</strong></td>
                                <td>{$driverName}</td>
                            </tr>
                        </table>

                        <br>

                        <p>
                            Silakan klik link berikut untuk mengakses halaman konfirmasi penerimaan barang:
                            <a href='{$link}' target='_blank'>Halaman Konfirmasi Penerimaan Barang</a>
                            atau kunjungi
                            <a href='{$linkWeb}' target='_blank'>mykrr.co.id</a>
                        </p>

                        <br>

                        <p>Best regards,<br>Kerta Rajasa Raya</p>");
                });
                DB::connection('ConnSales')->commit();

                return response()->json(['success' => (string) 'Permohonan konfirmasi penerimaan barang sudah dikirim ke email: ' . implode(', ', $emails)], 200);
            } catch (\Illuminate\Database\QueryException $e) {
                DB::connection('ConnSales')->rollback();
                $msg = $e->getMessage();

                if (str_contains($msg, 'TTD Supir dan Satpam belum lengkap')) {
                    return response()->json([
                        'error' => 'TTD Supir dan Satpam belum lengkap, silakan lakukan pemeriksaan barang terlebih dahulu.'
                    ]);
                }
                return response()->json([
                    'error' => 'Gagal proses kirim SJ'
                ], 500);
            } catch (Exception $ex) {
                DB::connection('ConnSales')->rollback();
                return response()->json([
                    'error' => 'Gagal proses kirim SJ: ' . $ex->getMessage()
                ], 500);
            }
        }

        if ($jenisProses == 'resendSJ') {
            try {
                $idPengiriman = $request->idPengiriman;

                // ambil email customer
                $emailCustomer = DB::connection('ConnSales')
                    ->select(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [0, $idPengiriman]
                    );

                $emails = collect($emailCustomer)
                    ->pluck('Email')
                    ->filter()
                    ->merge(['shipment@kertarajasa.co.id'])
                    ->unique()
                    ->values()
                    ->toArray();

                if (count($emails) <= 1) {
                    return response()->json(['error' => 'Customer belum punya email']);
                }

                // increment resend + ambil counter
                $resendResult = DB::connection('ConnSales')->select(
                    'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                    [5, $idPengiriman]
                );

                if (empty($resendResult)) {
                    return response()->json([
                        'error' => 'Gagal mengambil data resend'
                    ]);
                }

                $resendCount = $resendResult[0]->ResendCount ?? 1;

                // ambil data SJ
                $dataSuratJalan = DB::connection('ConnSales')
                    ->select(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [3, $idPengiriman]
                    );

                if (empty($dataSuratJalan)) {
                    return response()->json([
                        'error' => 'Data Surat Jalan tidak ditemukan'
                    ]);
                }

                // kirim email
                Mail::mailer('MailShipment')->send([], [], function ($message) use ($emails, $idPengiriman, $dataSuratJalan, $resendCount) {
                    $data = $dataSuratJalan[0];

                    $product = $data->NamaType ?? '-';

                    $satPrimer = trim($data->satPrimer);
                    $satSekunder = trim($data->satSekunder);
                    $satTritier = trim($data->satTritier);

                    $satJualRaw = trim($data->satJual);
                    $satJual = $this->formatSatuan($satJualRaw);

                    $qty = match ($satJualRaw) {
                        $satPrimer => $data->QtyPrimer ?? '-',
                        $satSekunder => $data->QtySekunder ?? '-',
                        $satTritier => $data->QtyTritier ?? '-',
                        default => '-'
                    };
                    $formattedQty = $this->formatQuantity($qty);

                    $transporter = $data->NamaExpeditor ?? '-';
                    $licensePlate = $data->TrukNopol ?? '-';
                    $driverName = $data->NamaSupir ?? '-';

                    $key = env('QR_SHARED_SECRET');
                    $encrypter = new \Illuminate\Encryption\Encrypter($key, 'AES-256-CBC');
                    $encryptedId = urlencode($encrypter->encryptString((string) $idPengiriman));

                    $link = 'https://mykrr.co.id/SuratJalan/' . $encryptedId;
                    $linkWeb = 'https://mykrr.co.id/';

                    // SUBJECT DINAMIS
                    $subject = "RESEND Ke-{$resendCount} SJ Digital {$idPengiriman}";

                    $message->to($emails)
                        ->subject($subject)
                        ->html("
                            <p>Dear Customer,</p>

                            <p>Berikut detail Surat Jalan Digital:</p>

                            <table border='1' cellpadding='8' cellspacing='0' style='border-collapse: collapse;'>
                                <tr>
                                    <td><strong>ID Pengiriman</strong></td>
                                    <td>{$idPengiriman}</td>
                                </tr>
                                <tr>
                                    <td><strong>Product</strong></td>
                                    <td>{$product}</td>
                                </tr>
                                <tr>
                                    <td><strong>Quantity</strong></td>
                                    <td>{$formattedQty} {$satJual}</td>
                                </tr>
                                <tr>
                                    <td><strong>Transporter</strong></td>
                                    <td>{$transporter}</td>
                                </tr>
                                <tr>
                                    <td><strong>License Plate Number</strong></td>
                                    <td>{$licensePlate}</td>
                                </tr>
                                <tr>
                                    <td><strong>Driver Name</strong></td>
                                    <td>{$driverName}</td>
                                </tr>
                            </table>

                            <br>

                            <p>
                                Silakan klik link berikut untuk mengakses halaman konfirmasi penerimaan barang:
                                <a href='{$link}' target='_blank'>Halaman Konfirmasi Penerimaan Barang</a>
                                atau kunjungi
                                <a href='{$linkWeb}' target='_blank'>mykrr.co.id</a>
                            </p>

                            <br>

                            <p>Best regards,<br>Kerta Rajasa Raya</p>
                        ");
                });

                return response()->json([
                    'success' => 'Email berhasil dikirim ulang ke: ' . implode(', ', $emails)
                ]);

            } catch (\Illuminate\Database\QueryException $e) {
                $msg = $e->getMessage();

                if (str_contains($msg, 'TTD Supir dan Satpam belum lengkap')) {
                    return response()->json([
                        'error' => 'TTD Supir dan Satpam belum lengkap, silakan lakukan pemeriksaan barang terlebih dahulu.'
                    ]);
                }

                if (str_contains($msg, 'Data belum pernah dikirim')) {
                    return response()->json([
                        'error' => 'Surat jalan belum pernah dikirim sebelumnya'
                    ]);
                }

                return response()->json([
                    'error' => 'Gagal proses database'
                ], 500);

            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Terjadi kesalahan pada sistem'
                ], 500);
            }
        }

        if ($jenisProses == 'sendRequestPascaKirim') {
            $idPengiriman = $request->idPengiriman;
            $qtyTempVerifikasi = $request->qtyTempVerifikasi;
            $noteCustomer = $request->noteCustomer;
            try {
                DB::connection('ConnSales')->beginTransaction();
                // proses check apakah customer sudah memiliki perwakilan(user) sekaligus select email customer
                $emailCustomer = DB::connection('ConnSales')
                    ->select(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [0, $idPengiriman]
                    );

                $emails = collect($emailCustomer)
                    ->pluck('Email')
                    ->filter()
                    ->merge([
                        'shipment@kertarajasa.co.id'
                    ])
                    ->unique()
                    ->values()
                    ->toArray();

                if (count($emails) <= 1) {
                    return response()->json(['error' => 'Permohonan konfirmasi penerimaan barang tidak dikirim, customer belum register']);
                }

                // proses update kolom QtyTempVerifikasi, NotePascaKeCustomer pada database public web
                DB::connection('ConnSales')
                    ->statement(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?, @XQtyTempVerifikasi = ?, @XNoteKeCustomer = ?',
                        [10, $idPengiriman, $qtyTempVerifikasi, $noteCustomer]
                    );
                //get data to send email
                $dataSuratJalan = DB::connection('ConnSales')
                    ->select(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [3, $idPengiriman]
                    );
                // proses send email permintaan acc customer
                Mail::mailer('MailShipment')->send([], [], function ($message) use ($emails, $idPengiriman, $dataSuratJalan, $qtyTempVerifikasi) {
                    $data = $dataSuratJalan[0];

                    $product = $data->NamaType ?? '-';

                    // $satPrimer = trim($data->satPrimer);
                    // $satSekunder = trim($data->satSekunder);
                    // $satTritier = trim($data->satTritier);

                    $satJualRaw = trim($data->satJual);
                    $satJual = $this->formatSatuan($satJualRaw);

                    $qty = $qtyTempVerifikasi;
                    // if ($satJualRaw == $satPrimer) {
                    //     $qty = $data->QtyPrimer ?? '-';
                    // } else if ($satJualRaw == $satSekunder) {
                    //     $qty = $data->QtySekunder ?? '-';
                    // } else if ($satJualRaw == $satTritier) {
                    //     $qty = $data->QtyTritier ?? '-';
                    // }
                    $formattedQty = $this->formatQuantity($qty);
                    $transporter = $data->NamaExpeditor ?? '-';
                    $licensePlate = $data->TrukNopol ?? '-';
                    $driverName = $data->NamaSupir ?? '-';
                    $key = env('QR_SHARED_SECRET'); // 32 chars
                    $cipher = 'AES-256-CBC';

                    $encrypter = new Encrypter($key, $cipher);
                    $encryptedIdPengiriman = urlencode($encrypter->encryptString((string) $idPengiriman));

                    // $link = url('/surat-jalan/' . $idPengiriman); // change to your real route
                    // $encodedIdPengiriman = hash_hmac('sha256', $idPengiriman, env('QR_SHARED_SECRET'));
                    $link = 'https://mykrr.co.id/PascaKirim/' . $encryptedIdPengiriman; // change to your real route
                    $linkWeb = 'https://mykrr.co.id/';
                    $message->to($emails)
                        ->subject("Pasca Kirim SJ Digital {$idPengiriman} Kerta Rajasa Raya")
                        ->html("<p>Dear Customer,</p>

                        <p>Berikut detail <strong>Pasca Kirim</strong> Surat Jalan Digital:</p>

                        <table border='1' cellpadding='8' cellspacing='0' style='border-collapse: collapse;'>
                            <tr>
                                <td><strong>ID Pengiriman</strong></td>
                                <td>{$idPengiriman}</td>
                            </tr>
                            <tr>
                                <td><strong>Product</strong></td>
                                <td>{$product}</td>
                            </tr>
                            <tr>
                                <td><strong>Quantity Pasca Kirim</strong></td>
                                <td>{$formattedQty} {$satJual}</td>
                            </tr>
                            <tr>
                                <td><strong>Transporter</strong></td>
                                <td>{$transporter}</td>
                            </tr>
                            <tr>
                                <td><strong>License Plate Number</strong></td>
                                <td>{$licensePlate}</td>
                            </tr>
                            <tr>
                                <td><strong>Driver Name</strong></td>
                                <td>{$driverName}</td>
                            </tr>
                        </table>

                        <br>

                        <p>
                            Silakan klik link berikut untuk mengakses halaman konfirmasi Pasca Kirim:
                            <a href='{$link}' target='_blank'>Halaman Konfirmasi Pasca Kirim</a>
                            atau kunjungi
                            <a href='{$linkWeb}' target='_blank'>mykrr.co.id</a>
                        </p>

                        <br>

                        <p>Best regards,<br>Kerta Rajasa Raya</p>");
                });
                DB::connection('ConnSales')->commit();

                return response()->json(['success' => (string) 'Permohonan konfirmasi pasca kirim sudah dikirim ke email: ' . implode(', ', $emails)], 200);
            } catch (\Illuminate\Database\QueryException $e) {
                DB::connection('ConnSales')->rollback();
                $msg = $e->getMessage();

                if (str_contains($msg, 'TTD Supir dan Satpam belum lengkap')) {
                    return response()->json([
                        'error' => 'TTD Supir dan Satpam belum lengkap, silakan lakukan pemeriksaan barang terlebih dahulu.'
                    ]);
                }
                return response()->json([
                    'error' => 'Gagal proses kirim SJ: ' . $e->getMessage()
                ], 500);
            } catch (Exception $ex) {
                DB::connection('ConnSales')->rollback();
                return response()->json([
                    'error' => 'Gagal proses kirim SJ: ' . $ex->getMessage()
                ], 500);
            }
        }

        if ($jenisProses == 'resendPasca') {
            try {
                $idPengiriman = $request->idPengiriman;

                // ambil email customer
                $emailCustomer = DB::connection('ConnSales')
                    ->select(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [0, $idPengiriman]
                    );

                $emails = collect($emailCustomer)
                    ->pluck('Email')
                    ->filter()
                    ->merge(['shipment@kertarajasa.co.id'])
                    ->unique()
                    ->values()
                    ->toArray();

                if (count($emails) <= 1) {
                    return response()->json(['error' => 'Customer belum punya email']);
                }

                // increment resend + ambil counter
                $resendResult = DB::connection('ConnSales')->select(
                    'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                    [11, $idPengiriman]
                );

                if (empty($resendResult)) {
                    return response()->json([
                        'error' => 'Gagal mengambil data resend'
                    ]);
                }

                $resendCount = $resendResult[0]->ResendCount ?? 1;

                // ambil data SJ
                $dataSuratJalan = DB::connection('ConnSales')
                    ->select(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [3, $idPengiriman]
                    );

                if (empty($dataSuratJalan)) {
                    return response()->json([
                        'error' => 'Data Surat Jalan tidak ditemukan'
                    ]);
                }

                // kirim email
                Mail::mailer('MailShipment')->send([], [], function ($message) use ($emails, $idPengiriman, $dataSuratJalan, $resendCount) {
                    $data = $dataSuratJalan[0];

                    $product = $data->NamaType ?? '-';

                    $satPrimer = trim($data->satPrimer);
                    $satSekunder = trim($data->satSekunder);
                    $satTritier = trim($data->satTritier);

                    $satJualRaw = trim($data->satJual);
                    $satJual = $this->formatSatuan($satJualRaw);

                    // $qty = match ($satJualRaw) {
                    //     $satPrimer => $data->QtyPrimer ?? '-',
                    //     $satSekunder => $data->QtySekunder ?? '-',
                    //     $satTritier => $data->QtyTritier ?? '-',
                    //     default => '-'
                    // };
                    $qty = $data->QtyTempVerifikasi;
                    $formattedQty = $this->formatQuantity($qty);

                    $transporter = $data->NamaExpeditor ?? '-';
                    $licensePlate = $data->TrukNopol ?? '-';
                    $driverName = $data->NamaSupir ?? '-';

                    $key = env('QR_SHARED_SECRET');
                    $encrypter = new Encrypter($key, 'AES-256-CBC');
                    $encryptedId = urlencode($encrypter->encryptString((string) $idPengiriman));

                    $link = 'https://mykrr.co.id/PascaKirim/' . $encryptedId;
                    $linkWeb = 'https://mykrr.co.id/';

                    // SUBJECT DINAMIS
                    $subject = "RESEND Ke-{$resendCount} Pasca Kirim SJ Digital {$idPengiriman}";

                    $message->to($emails)
                        ->subject($subject)
                        ->html("
                            <p>Dear Customer,</p>

                            <p>Berikut detail <strong>Pasca Kirim</strong> Surat Jalan Digital:</p>

                            <table border='1' cellpadding='8' cellspacing='0' style='border-collapse: collapse;'>
                                <tr>
                                    <td><strong>ID Pengiriman</strong></td>
                                    <td>{$idPengiriman}</td>
                                </tr>
                                <tr>
                                    <td><strong>Product</strong></td>
                                    <td>{$product}</td>
                                </tr>
                                <tr>
                                    <td><strong>Quantity</strong></td>
                                    <td>{$formattedQty} {$satJual}</td>
                                </tr>
                                <tr>
                                    <td><strong>Transporter</strong></td>
                                    <td>{$transporter}</td>
                                </tr>
                                <tr>
                                    <td><strong>License Plate Number</strong></td>
                                    <td>{$licensePlate}</td>
                                </tr>
                                <tr>
                                    <td><strong>Driver Name</strong></td>
                                    <td>{$driverName}</td>
                                </tr>
                            </table>

                            <br>

                            <p>
                                Silakan klik link berikut untuk mengakses halaman konfirmasi Pasca Kirim:
                                <a href='{$link}' target='_blank'>Halaman Konfirmasi Pasca Kirim</a>
                                atau kunjungi
                                <a href='{$linkWeb}' target='_blank'>mykrr.co.id</a>
                            </p>

                            <br>

                            <p>Best regards,<br>Kerta Rajasa Raya</p>
                        ");
                });

                return response()->json([
                    'success' => 'Email berhasil dikirim ulang ke: ' . implode(', ', $emails)
                ]);

            } catch (\Illuminate\Database\QueryException $e) {
                $msg = $e->getMessage();

                if (str_contains($msg, 'TTD Supir dan Satpam belum lengkap')) {
                    return response()->json([
                        'error' => 'TTD Supir dan Satpam belum lengkap, silakan lakukan pemeriksaan barang terlebih dahulu.'
                    ]);
                }

                if (str_contains($msg, 'Data belum pernah dikirim')) {
                    return response()->json([
                        'error' => 'Surat jalan belum pernah dikirim sebelumnya'
                    ]);
                }

                return response()->json([
                    'error' => 'Gagal proses database'
                ], 500);

            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Terjadi kesalahan pada sistem'
                ], 500);
            }
        }

        if ($jenisProses == 'pascaKirim') {
            try {
                //proses pasca
                $jenis_pasca = $request->jenis_pasca;
                $surat_jalan = $request->surat_jalan;
                $idDetailKirim = $request->idDetailKirim;
                $idHeaderKirim = $request->idHeaderKirim;
                $nobttb = $request->nobttb;
                $alasan = $request->alasan;
                $user = Auth::user()->NomorUser;
                $tanggalDiterima = now();
                $qty_primerDiterimaCustomer = $request->qty_primerDiterimaCustomer;
                $qty_sekunderDiterimaCustomer = $request->qty_sekunderDiterimaCustomer;
                $qty_tritierDiterimaCustomer = $request->qty_tritierDiterimaCustomer;
                $pascaKirimCheck = db::connection('ConnSales')->select('exec SP_1486_SLS_CEK_PASCA_KIRIM @IdPengiriman = ?, @IDDetailKirim = ?', [$surat_jalan, $idDetailKirim]);
                // dd($pascaKirimCheck[0]->StatusPasca);
                if ($pascaKirimCheck[0]->StatusPasca == "Pengembalian" && $jenis_pasca == "Pengembalian") {
                    return response()->json(['error' => 'Pasca Kirim Pengembalian already exists!']);
                } else if ($pascaKirimCheck[0]->StatusPasca == "Kurang/Lebih" && $jenis_pasca == "Kurang/Lebih") {
                    return response()->json(['error' => 'Pasca Kirim Kelebihan/Kekurangan Pengiriman already exists!']);
                }
                // update data T_HeaderPengiriman, T_DetailPengiriman
                db::connection('ConnSales')->statement('exec SP_1486_SLS_MAINT_PASCA_KIRIM1 @JmlTerimaPrimer = ?,
                    @JmlTerimaTritier = ?,
                    @JmlTerimaSekunder = ?,
                    @StatusKirim = ?,
                    @IDDetailKirim = ?,
                    @NoSJ = ?,
                    @Tanggal = ?,
                    @UserPasca = ?,
                    @IdHeaderKirim = ?,
                    @Alasan = ?,
                    @StatusPasca = ?',
                    [
                        $qty_primerDiterimaCustomer,
                        $qty_tritierDiterimaCustomer,
                        $qty_sekunderDiterimaCustomer,
                        "Y",
                        $idDetailKirim,
                        $surat_jalan,
                        $tanggalDiterima,
                        $user,
                        $idHeaderKirim,
                        $alasan,
                        $jenis_pasca
                    ]
                );

                // update data T_KirimSJ PublicWeb
                DB::connection('ConnSales')
                    ->statement(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?,
                        @JmlTerimaPrimer = ?
                        @JmlTerimaSekunder = ?,
                        @JmlTerimaSekunder = ?',
                        [
                            8,
                            $qty_primerDiterimaCustomer,
                            $qty_sekunderDiterimaCustomer,
                            $qty_tritierDiterimaCustomer
                        ]
                    );
            } catch (Exception $e) {
                return response()->json([
                    'error' => (string) 'Terjadi kesalahan pada sistem, ' . $e->getMessage()
                ], 500);
            }
        }
    }

    public function sendSuratJalanEmail($idPengiriman, array $emails, int $resendCount = 0)
    {
        $items = DB::connection('ConnPublic')
            ->table('T_KirimSuratJalan')
            ->where('IDPengiriman', $idPengiriman)
            ->first();

        if (!$items) {
            throw new \Exception('Data Surat Jalan tidak ditemukan');
        }

        // format base64
        $formatBase64Image = function ($base64) {
            if (empty($base64))
                return null;

            $clean = trim(str_replace(["\r", "\n"], '', $base64));
            $binary = base64_decode($clean);

            if ($binary === false)
                return null;

            $mime = 'image/png';

            if (substr($binary, 0, 2) === "\xFF\xD8") {
                $mime = 'image/jpeg';
            }

            return "data:$mime;base64," . $clean;
        };

        $barcodeGudang = $formatBase64Image($items->GbrACCGudang);
        $barcodeSupir = $formatBase64Image($items->GbrACCSupir);
        $ttCustomer = $formatBase64Image($items->GbrACCCustomer);

        // $otp = DB::table('T_SuratJalanOTP')
        //     ->where('IdSuratJalan', $items->IdSuratJalan)
        //     ->whereNotNull('ApprovedAt')
        //     ->orderByDesc('ApprovedAt')
        //     ->first();

        $otp = DB::table('T_SuratJalanOTP')
            ->where('IdSuratJalan', $items->IdSuratJalan)
            ->where('IsUsed', 1)
            ->latest('CreatedAt')
            ->first();

        $tanggalCustomer = null;

        if ($otp) {
            $tanggalCustomer = $otp->ApprovedAt ?? $otp->CreatedAt;
        }

        $namaCustomer = '-';
        if ($otp && !empty($otp->Phone)) {
            $phone = preg_replace('/[^0-9]/', '', $otp->Phone);

            $namaCustomer = DB::connection('ConnPublic')
                ->table('UserPublic')
                ->where('NoHP', $phone)
                ->value('NamaUser') ?? '-';
        }

        $namaPengirim = null;
        $ttdPengirim = null;

        $namaExpeditor = $items->NamaExpeditor;

        if (!empty($items->NamaSupir) || !empty($items->GbrACCSupir)) {
            $namaPengirim = $items->NamaSupir;
            $ttdPengirim = $barcodeSupir;
        } elseif (!empty($items->NamaSatpam) || !empty($items->GbrACCSatpam)) {
            $namaPengirim = $items->NamaSatpam;
            $ttdPengirim = $formatBase64Image($items->GbrACCSatpam);
        }

        $template = ((int) $items->ACCCustomer === 1)
            ? 'Sales.Transaksi.SuratJalan.SuratJalanPDF'
            : 'SuratJalan.SuratJalanPascaPDF';

        $pdf = Pdf::loadView($template, [
            'items' => $items,
            'namaPengirim' => $namaPengirim,
            'ttdPengirim' => $ttdPengirim,
            'barcodeGudang' => $barcodeGudang,
            'barcodeSupir' => $barcodeSupir,
            'ttCustomer' => $ttCustomer,
            'namaCustomer' => $namaCustomer,
            'tanggalCustomer' => $tanggalCustomer,
            'namaExpeditor' => $namaExpeditor,
        ])->setPaper('A4', 'portrait');

        // Subject email
        $subject = "Surat Jalan {$idPengiriman}";

        if ($resendCount > 0) {
            $subject .= " - RESEND KE-{$resendCount}";
        }

        Mail::mailer('MailShipment')->send([], [], function ($message) use ($emails, $idPengiriman, $pdf, $subject, $resendCount) {

            $body = "
                Berikut adalah Surat Jalan dengan nomor <b>{$idPengiriman}</b>.<br>
                Silakan cek dokumen terlampir.
            ";

            if ($resendCount > 0) {
                $body = "
                    Berikut adalah Resend ke-{$resendCount} dengan Surat Jalan nomor <b>{$idPengiriman}</b>.<br>
                    Silakan cek dokumen terlampir.
                ";
            }

            $message->to($emails)
                ->subject($subject)
                ->html($body)
                ->attachData(
                    $pdf->output(),
                    "Surat Jalan {$idPengiriman}.pdf",
                    ['mime' => 'application/pdf']
                );
        });
    }

    public function formatQuantity($qty)
    {
        if (!is_numeric($qty)) {
            return $qty;
        }

        return number_format((float) $qty, 0, '.', ',');
    }

    public function formatSatuan($unit)
    {
        $mapping = [
            'TABUNG' => 'TABUNG',
            'SET' => 'SET',
            'KGM' => 'KILOGRAM',
            'RP' => 'RP',
            'BALL' => 'BALL',
            'LBR' => 'LEMBAR',
            'PC' => 'POTONG',
            'YARDS' => 'YARD',
            'MTR²' => 'METER PERSEGI',
            'ROLL' => 'ROLL',
            'DRUM' => 'DRUM',
            'LJR' => 'LONJOR',
            'MTR' => 'METER',
            'UNIT' => 'UNIT',
        ];

        return $mapping[trim($unit)] ?? $unit;
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getDataSJ') {
            $tanggalMulai = $request->tanggal_mulai;
            $tanggalAkhir = $request->tanggal_akhir;

            $dataSuratJalan = DB::connection('ConnSales')
                ->select(
                    'exec SP_4384_SLS_KIRIM_SJ @XKode = ?',
                    [4]
                );

            $dataSuratJalan = collect($dataSuratJalan);

            // Filter tanggal mulai
            if (!empty($tanggalMulai)) {
                $dataSuratJalan = $dataSuratJalan->filter(function ($item) use ($tanggalMulai) {
                    return \Carbon\Carbon::parse($item->Tanggal)->format('Y-m-d') >= $tanggalMulai;
                });
            }

            // Filter tanggal akhir
            if (!empty($tanggalAkhir)) {
                $dataSuratJalan = $dataSuratJalan->filter(function ($item) use ($tanggalAkhir) {
                    return \Carbon\Carbon::parse($item->Tanggal)->format('Y-m-d') <= $tanggalAkhir;
                });
            }

            return datatables($dataSuratJalan->values())->make(true);
        } else if ($id == 'preparePasca') {
            $idPengiriman = $request->idPengiriman;
            $dataSuratJalanTerkirim = DB::connection('ConnSales')
                ->select('exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?', [3, $idPengiriman]);
            $idCust = $dataSuratJalanTerkirim[0]->IDCust;
            // $invoiceCheck = db::connection('ConnAccounting')->select('exec SP_1486_SLS_CEK_INVOICE @Id_cust = ?, @SJ = ?', [$idCust, $idPengiriman]);
            // if (count($invoiceCheck) > 0) {
            //     // $invoiceCheck has a value
            //     return response()->json(['error' => 'Invoice already exists! Id Penagihan: ' . $invoiceCheck[0]->Id_Penagihan]);
            // }
            $dataIdDetailPengiriman = DB::connection('ConnSales')
                ->select('exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?', [6, $idPengiriman]);

            return response()->json(['dataSuratJalanTerkirim' => $dataSuratJalanTerkirim, 'idDetailKirim' => $dataIdDetailPengiriman]);
        } else if ($id == 'UnduhAttachment') {
            $idPengiriman = $request->idPengiriman;
            try {
                $data = DB::connection('ConnSales')
                    ->select('exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?', [7, $idPengiriman]);
                // $images = explode(',', $data[0]->picture);
                $images = json_decode($data[0]->picture, true);
                // dd($images, json_decode($data[0]->picture, true));

                $tempFolder = storage_path('app/temp/' . uniqid());

                File::makeDirectory($tempFolder, 0777, true, true);

                foreach ($images as $index => $imageData) {

                    // Pisahkan header dan isi base64
                    // if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $matches)) {

                    //     $extension = $matches[1];

                    //     $base64 = substr($imageData, strpos($imageData, ',') + 1);

                    //     $binary = base64_decode($base64);

                    //     file_put_contents(
                    //         $tempFolder . "/gambar_" . ($index + 1) . "." . $extension,
                    //         $binary
                    //     );
                    // }
                    $binary = base64_decode($imageData);

                    file_put_contents(
                        $tempFolder . '/gambar_' . ($index + 1) . '.jpg',
                        $binary
                    );
                }

                $zipFile = storage_path('app/temp/SJ_' . $idPengiriman . '.zip');

                $zip = new ZipArchive();

                if ($zip->open($zipFile, ZipArchive::CREATE | ZipArchive::OVERWRITE)) {

                    foreach (glob($tempFolder . '/*') as $file) {
                        $zip->addFile($file, basename($file));
                    }

                    $zip->close();
                }

                File::deleteDirectory($tempFolder);

                $idSuratJalan = DB::connection('ConnPublicWeb')
                    ->table('T_KirimSuratJalan')
                    ->where('IDPengiriman', $idPengiriman)
                    ->value('IdSuratJalan');

                if ($idSuratJalan) {

                    DB::connection('ConnPublicWeb')
                        ->table('T_Attachment')
                        ->where('IdSuratJalan', $idSuratJalan)
                        ->update([
                            'IsDownload' => 1
                        ]);
                }

                return response()->download($zipFile)->deleteFileAfterSend(true);
            } catch (Exception $ex) {
                $message = $ex->getMessage();
                if ($message == 'Undefined array key 0') {
                    return response()->json(['error' => 'Unduh attachment gagal: Data Attachment tidak ditemukan'], 500);
                } else {
                    return response()->json(['error' => 'Unduh attachment gagal: ' . $ex->getMessage()], 500);
                }
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
