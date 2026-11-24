<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class BKKKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.BKK', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $user_id = trim(Auth::user()->NomorUser);
        $listBKK = $request->input('rowDataArray', []);
        // dd($listBKK);
        $dataCount = count($listBKK);
        $adaData = false;
        $sama = true;
        $dataKe = 1;
        $brsproses = null;
        $messages = []; // Array to hold messages

        // Check if there are any items in listBKK
        foreach ($listBKK as $index => $item) {
            if (!empty($item)) {
                $adaData = true;
                if ($dataKe == 1) {
                    $brsproses = $index;
                }
                $dataKe++;
            }
        }

        if ($adaData) {
            if ($sama) {
                $tglTransaksi = $request->input('tanggal', now()->format('m/d/Y'));

                foreach ($listBKK as $item) {
                    $prosesSupp = false;

                    // // Execute the first stored procedure
                    // $result = DB::connection('ConnKCNAccounting')->select('exec SP_1273_ACC_BANK_PROSES_TRANSAKSIBANK2
                    // @IdBank = ?,
                    // @NilaiKeluar = ?,
                    // @TglTransaksi = ?,
                    // @UserInput = ?,
                    // @IdBKK = ?,
                    // @IdSupplier = ?,
                    // @Kurs = ?,
                    // @IdMataUang = ?', [
                    //     $item['Id_Bank'],               // IdBank
                    //     $item['Nilai_Pembulatan'],      // NilaiKeluar
                    //     $tglTransaksi,                  // TglTransaksi
                    //     $user_id,                       // UserInput
                    //     $item['Id_BKK'],                // IdBKK
                    //     $item['Id_Supplier'] ?? null,   // IdSupplier
                    //     $item['Kurs_Rupiah'],           // Kurs
                    //     $item['Id_MataUang']            // IdMataUang
                    // ]);

                    // // Assuming the response is similar to RecPross!nmError
                    // $nmError = trim($result[0]->nmError ?? '');

                    // $messages[] = $nmError; // Collecting messages

                    // Fetch the initial SaldoBank and Plafon
                    $bankData = DB::connection('ConnKCNAccounting')
                        ->table('T_BANK')
                        ->select('SaldoBank', 'Plafon')
                        ->where('Id_Bank', $item['Id_Bank'])
                        ->first();

                    $saldoBank = $bankData->SaldoBank;
                    $plafon = $bankData->Plafon;
                    $nilaiKeluar = floatval(str_replace(',', '', $item['Nilai_Pembulatan']));
                    $saldoSkrg = $saldoBank - $nilaiKeluar;

                    $nmError = 'B'; // Default error message

                    // Check balance and update accordingly
                    if ($saldoSkrg <= 0) {
                        if ($plafon === 'Y') {
                            // Update T_BANK table
                            DB::connection('ConnKCNAccounting')
                                ->table('T_BANK')
                                ->where('Id_Bank', $item['Id_Bank'])
                                ->update(['SaldoBank' => $saldoSkrg]);

                            // Insert into T_TRANSAKSI_BANK
                            DB::connection('ConnKCNAccounting')
                                ->table('T_TRANSAKSI_BANK')
                                ->insert([
                                    'Id_TypeTransaksi' => 2,
                                    'Id_Bank' => $item['Id_Bank'],
                                    'Jumlah_Pemasukan' => 0,
                                    'Jumlah_Pengeluaran' => $nilaiKeluar,
                                    'Saldo_Bank' => $saldoSkrg,
                                    'Tanggal_Transaksi' => $tglTransaksi,
                                    'Tanggal_Input' => now(),
                                    'User_Input' => $user_id,
                                ]);

                            // Get the latest Id_Transaksi
                            $maxIdTransaksi = DB::connection('ConnKCNAccounting')
                                ->table('T_TRANSAKSI_BANK')
                                ->where('Id_TypeTransaksi', 2)
                                ->max('Id_Transaksi');

                            // Update T_PEMBAYARAN table
                            DB::connection('ConnKCNAccounting')
                                ->table('T_PEMBAYARAN')
                                ->where('Id_BKK', $item['Id_BKK'])
                                ->update(['Id_Transaksi' => $maxIdTransaksi]);

                            $nmError = 'Proses sudah SELESAI..!!, untuk BKK : ' . $item['Id_BKK'];
                        } else {
                            $nmError = 'Saldo tidak mencukupi untuk dikeluarkan, Cek Saldo .....!!';
                        }
                    } else {
                        // Update T_BANK table
                        DB::connection('ConnKCNAccounting')
                            ->table('T_BANK')
                            ->where('Id_Bank', $item['Id_Bank'])
                            ->update(['SaldoBank' => $saldoSkrg]);

                        // Insert into T_TRANSAKSI_BANK
                        DB::connection('ConnKCNAccounting')
                            ->table('T_TRANSAKSI_BANK')
                            ->insert([
                                'Id_TypeTransaksi' => 2,
                                'Id_Bank' => $item['Id_Bank'],
                                'Jumlah_Pemasukan' => 0,
                                'Jumlah_Pengeluaran' => $nilaiKeluar,
                                'Saldo_Bank' => $saldoSkrg,
                                'Tanggal_Transaksi' => $tglTransaksi,
                                'Tanggal_Input' => now(),
                                'User_Input' => $user_id,
                            ]);

                        // Get the latest Id_Transaksi
                        $maxIdTransaksi = DB::connection('ConnKCNAccounting')
                            ->table('T_TRANSAKSI_BANK')
                            ->where('Id_TypeTransaksi', 2)
                            ->max('Id_Transaksi');

                        // Update T_PEMBAYARAN table
                        DB::connection('ConnKCNAccounting')
                            ->table('T_PEMBAYARAN')
                            ->where('Id_BKK', $item['Id_BKK'])
                            ->update(['Id_Transaksi' => $maxIdTransaksi]);

                        $nmError = 'Proses sudah SELESAI..!!, untuk BKK : ' . $item['Id_BKK'];
                    }

                    // Collect the message
                    $messages[] = trim($nmError);

                    if (str_starts_with($nmError, 'P')) {
                        if (!empty($item['Id_Supplier']) && $item['Id_Supplier'] !== '00000') {
                            $prosesSupp = true;
                        }
                    }

                    // If there is a need to process the supplier
                    if ($prosesSupp) {
                        // Execute the second stored procedure
                        DB::connection('ConnKCNAccounting')->select('exec SP_1273_ACC_INS_BANK_TRANSAKSI_SUPPLIER
                        @Id_TypeTransaksi = ?,
                        @Tanggal = ?,
                        @Id_Supplier = ?,
                        @Detail = ?,
                        @Id_Mata_Uang = ?,
                        @Nilai_Debet = ?,
                        @Nilai_Kredit = ?,
                        @Kurs = ?,
                        @Referensi = ?,
                        @User_Input = ?', [
                            2,                          // Id_TypeTransaksi
                            $tglTransaksi,              // Tanggal
                            $item['Id_Supplier'],       // Id_Supplier
                            $item['Id_BKK'],            // Detail
                            $item['Id_MataUang'],       // Id_Mata_Uang
                            0,                          // Nilai_Debet
                            $item['Nilai_Pembulatan'],  // Nilai_Kredit
                            $item['Kurs_Rupiah'],       // Kurs
                            $item['Id_BKK'],            // Referensi
                            $user_id                    // User_Input
                        ]);
                    }
                }
            } else {
                // If bank data is not the same
                return response()->json(['error' => 'Data Bank ada TIDAK SAMA !!..']);
            }
        } else {
            // If no data was selected
            return response()->json(['error' => 'Tidak ada Data']);
        }

        // Return JSON response with collected messages
        return response()->json([
            'message' => $messages,
        ]);
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getBankData') {
            $jenisBank = $request->input('JnsBank');
            $idMataUang = $request->input('IdUang');

            $bankResults = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_ACC_LIST_BANK_TBANK @JenisBank = ?, @IdMataUang = ?', [$jenisBank, $idMataUang]);
            // dd($bankResults);

            $response = [];
            foreach ($bankResults as $row) {
                $response[] = [
                    'Nama_Bank' => $row->Nama_Bank,
                    'Id_Bank' => $row->Id_Bank,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getTransaksiBank') {
            // dd($request->all());
            $kode = null;
            $idBank = $request->input('nama_bank');
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');
            $radio = $request->input('kodeRadio');

            if ($radio == 1) {
                $kode = 1;
            } elseif ($radio == 2) {
                $kode = 3;
            } elseif ($radio == 3) {
                $kode = 4;
            } elseif ($radio == 4) {
                $kode = 5;
            } elseif ($radio == 5) {
                $kode = 6;
            } elseif ($radio == 6) {
                $kode = 7;
            }

            $transResults = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_ACC_LIST_BANK_TTRANSAKSIBANK @Kode = ?, @IdBank = ?, @Bulan = ?, @Tahun = ?', [
                    $kode,
                    $idBank,
                    $bulan,
                    $tahun
                ]);
            // dd($transResults);

            $response = [];
            foreach ($transResults as $row) {
                $response[] = [
                    'Id_BKK' => trim($row->Id_BKK),
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Nama_Bank' => trim($row->Nama_Bank),
                    'Nilai_Pembulatan' => number_format($row->Nilai_Pembulatan, 2, '.', ','),
                    'Status_Penagihan' => ($row->Status_Penagihan === 'Y') ? 'Ada' : 'Tidak Ada',
                    'Id_Bank' => trim($row->Id_Bank),
                    'NM_SUP' => $row->NM_SUP ?? '',
                    'Id_Supplier' => $row->Id_Supplier ?? '',
                    'Kurs_Rupiah' => '0', // As per VB code, this was hardcoded to "0"
                    'Id_MataUang' => trim($row->Id_MataUang),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBKKData') {
            $idBKK = $request->input('Id_BKK');
            // dd($idBKK);
            if (empty($idBKK)) {
                return response()->json(['message' => 'Tidak ada Data']);
            }

            // Prepare and execute the stored procedure call
            $bkkResults = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_ACC_LIST_BANK_TTRANSAKSIBANK @Kode = ?, @IdBKK = ?', [2, $idBKK]);
            // dd($bkkResults);
            $response = [];
            foreach ($bkkResults as $row) {
                $response[] = [
                    'Id_BKK' => trim($row->Id_BKK),
                    'Jenis_Pembayaran' => $row->Jenis_Pembayaran,
                    'Rincian_Bayar' => trim($row->Rincian_Bayar),
                    'Symbol' => trim($row->Symbol),
                    'Nilai_Rincian' => number_format($row->Nilai_Rincian, 2, '.', ','),
                    'Kode_Perkiraan' => $row->Kode_Perkiraan ?? '',
                ];
            }

            return datatables($response)->make(true);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
