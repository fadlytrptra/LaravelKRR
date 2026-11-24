<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class PotHargaKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.PotHarga', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        try {
            $proses = $request->proses;
            $TTotal = (float) $request->grandTotal;
            $TTerbilang = $request->TTerbilang;

            // Mode tambah data
            if ($proses == 1) {
                // Panggil stored procedure SP_1273_PRG_Insert_NotaKredit
                DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_Insert_NotaKredit @Tanggal = ?, @JnsNotaKredit = ?, @Id_MataUang = ?, @Status_PPN = ?, @Nilai = ?, @Terbilang = ?, @Id_Penagihan = ?, @Status_Pelunasan = ?, @UserInput = ?', [
                    $request->tanggalInput,
                    '2',
                    $request->idMataUang,
                    $request->statusPPN,
                    $TTotal,
                    $TTerbilang,
                    $request->no_penagihan,
                    $request->statusPelunasan == 'Lunas' ? 'Y' : 'N',
                    trim(Auth::user()->NomorUser),
                ]);

                $nota_KreditId = DB::connection('ConnKCNAccounting')
                    ->table('T_NOTA_KREDIT')
                    ->select('Id_NotaKredit')
                    ->where('Id_Penagihan', $request->no_penagihan)
                    ->orderBy('TglInput', 'desc')
                    ->first();
                $idNotaKredit = $nota_KreditId->Id_NotaKredit;
                // dd($idNotaKredit);

                // Panggil stored procedure SP_1273_PRG_Insert_Detail_NotaKredit untuk setiap item di ListView1
                foreach ($request->allRowsDataAtas as $item) {
                    DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_Insert_Detail_NotaKredit @Id_NotaKredit = ?, @SuratJalan = ?, @HargaSP = ?, @HargaPot = ?, @KdBrg = ?, @QtyBrg = ?', [
                        $idNotaKredit,
                        $item[0],
                        $item[3],
                        $item[4],
                        $item[1],
                        $item[2]
                    ]);
                }

                return response()->json(['message' => 'Data Telah Tersimpan']);

                // Mode edit data
            } else if ($proses == 2) {
                // Hapus detail dengan stored procedure SP_1273_PRG_Del_Detail_NotaKredit
                foreach ($request->allRowsDataHapus as $item) {
                    DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_Del_Detail_NotaKredit @IdDetail = ?', [
                        $item[5]
                    ]);
                }

                // Tambahkan atau update detail dengan stored procedure SP_1273_PRG_Insert_Detail_NotaKredit
                foreach ($request->allRowsDataAtas as $item) {
                    DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_Insert_Detail_NotaKredit @Id_NotaKredit = ?, @SuratJalan = ?, @HargaSP = ?, @HargaPot = ?, @KdBrg = ?, @QtyBrg = ?, @IdDEtail = ?', [
                        $request->no_notaKredit,
                        $item[0],
                        $item[3],
                        $item[4],
                        $item[1],
                        $item[2],
                        $item[5] == "" ? null : $item[5]
                    ]);
                }

                // Update Nota Kredit dengan stored procedure SP_1273_PRG_Update_NotaKredit
                DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_Update_NotaKredit @ID_NOtaKRedit = ?, @Nilai = ?, @Terbilang = ?', [
                    $request->no_notaKredit,
                    $TTotal,
                    $TTerbilang
                ]);

                return response()->json(['message' => 'Data Telah Terkoreksi']);

                // Mode delete data
            } else if ($proses == 3) {
                // Hapus Nota Kredit dengan stored procedure SP_1273_PRG_Del_NotaKredit
                $result = DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_Del_NotaKredit @Id_NotaKredit = ?', [
                    $request->no_notaKredit
                ]);

                // Cek error dari SP
                if ($result === false) {
                    return response()->json(['message' => 'Data Gagal Terhapus']);
                } else {
                    return response()->json(['message' => 'Data Telah Terhapus']);
                }
            }

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getCustomer') {
            $kode = $request->input('proses') == 1 ? 2 : 3;
            // dd($kode);
            // Panggil stored procedure sesuai parameter kode
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_CUSTOMER ?', [$kode]);
            // dd($results);
            // Simpan hasil lookup
            $response = [];
            foreach ($results as $row) {
                $idCust = trim($row->IdCust);
                $TIdCustomer = substr($idCust, -5); // Last 5 characters
                $TIdJnsCust = substr($idCust, 0, 3); // First 3 characters

                $response[] = [
                    'NamaCust' => trim($row->NamaCust),
                    'idCust' => $idCust,
                    'TIdCustomer' => $TIdCustomer,
                    'TIdJnsCust' => $TIdJnsCust,
                ];
            }

            // dd($response);

            return datatables($response)->make(true);

        } else if ($id == 'getPenagihan') {
            $kode = 5;
            $tglPenagihan = $request->input('tgl_penagihan');

            $results = DB::connection('ConnKCNAccounting')
                ->select(
                    'exec SP_1273_PRG_LIST_PENAGIHAN_SJ @Kode = ?, @Tgl_penagihan = ?',
                    [$kode, $tglPenagihan]
                );

            $response = [];

            foreach ($results as $row) {
                $response[] = [
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'IdFakturPajak' => $row->IdFakturPajak,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBarang') {
            // dd($request->all());
            $results = DB::connection('ConnKCNSales')
                ->select('exec SP_LIST_NOTA_KREDIT @Kode = ?, @IdPenagihan = ?', [1, $request->no_penagihan]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NamaBarang' => $row->NamaBarang,
                    'KdBrg' => $row->KdBrg,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBarangDetails') {
            // Logika untuk migrasi kode VB yang diberikan
            $results = DB::connection('ConnKCNSales')
                ->select(
                    'exec SP_LIST_NOTA_KREDIT @Kode = ?, @IdPenagihan = ?, @KodeBarang = ?',
                    [2, trim($request->no_penagihan), trim($request->kodeBarang)]
                );
            // dd($results);
            // Menginisialisasi response
            $response = [];
            $TotKirim = 0;

            // Loop melalui hasil query
            foreach ($results as $row) {
                $response[] = [
                    'IDPengiriman' => $row->IDPengiriman,
                    'JmlTerimaUmum' => $row->JmlTerimaUmum,
                    'HargaSatuan' => $row->HargaSatuan,
                ];

                // Menghitung total pengiriman
                $TotKirim += floatval($row->JmlTerimaUmum);
            }

            // Mengembalikan data dalam format JSON
            return response()->json([
                'data' => $response,
                'total_kirim' => $TotKirim
            ]);
        } else if ($id == 'getPenagihanDetails') {
            // Memanggil prosedur tersimpan untuk mendapatkan data penagihan
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_LIST_POT_HARGA @Id_Penagihan = ?', [$request->no_penagihan]);
            // dd($results);
            // Menginisialisasi variabel untuk response
            $response = [];
            if (!empty($results)) {
                $penagihan = $results[0];  // Asumsikan hanya satu hasil yang diambil

                // Menyiapkan data yang akan dikirim ke response
                $response = [
                    'Id_MataUang' => $penagihan->Id_MataUang,
                    'Nama_MataUang' => $penagihan->Nama_MataUang,
                    'Status_PPN' => $penagihan->Status_PPN,
                    'Jns_PPN' => $penagihan->Jns_PPN ?? '',
                    'Lunas' => $penagihan->Lunas == 'Y' ? 'Lunas' : 'Belum',
                    'Message' => $penagihan->Lunas == 'Y' ? 'Harap Dibuatkan BKK' : '',
                ];
            }

            // Mengembalikan response dalam format JSON
            return response()->json($response);
        } else if ($id == 'getNotaKredit') {
            $kode = 7;
            $idCust = $request->input('idCustomer');
            $jnsNotaKredit = "2";

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_LIST_NOTA_KREDIT @Kode = ?, @IdCust = ?, @JnsNotaKredit = ?', [$kode, $idCust, $jnsNotaKredit]);
            // dd($results);
            $response = [];

            foreach ($results as $row) {
                $response[] = [
                    'Id_NotaKredit' => $row->Id_NotaKredit,
                    'Tanggal' => \Carbon\Carbon::parse($row->Tanggal)->format('m/d/Y'),
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'displayNotaKredit') {
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_LIST_POT_HARGA1 @id_NotaKredit = ?', [$request->no_notaKredit]);
            // dd($results);
            $response = [];
            if (!empty($results)) {
                $nota = $results[0];

                $response = [
                    'Id_Penagihan' => $nota->Id_Penagihan,
                    'Terbilang' => $nota->Terbilang,
                    'Id_MataUang' => $nota->Id_MataUang,
                    'Nama_MataUang' => $nota->Nama_MataUang,
                    'Status_PPN' => $nota->Status_PPN,
                    'Jns_PPN' => $nota->Jns_PPN ?? '',
                    'Lunas' => $nota->Lunas == 'Y' ? 'Lunas' : 'Belum',
                    // 'Message' => $nota->Lunas == 'Y' ? 'Harap Dibuatkan BKK' : '',
                ];
            }

            // Mengembalikan response dalam format JSON
            return response()->json($response);
        } else if ($id == 'displayNotaKreditDetails') {
            $idNotaKredit = $request->input('no_notaKredit');

            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_LIST_POT_HARGA2 @id_NotaKredit = ?', [$idNotaKredit]);
            // dd($results);
            $response = [];
            $TTotal = 0;

            foreach ($results as $row) {
                $rowData = [
                    'SuratJalan' => $row->SuratJalan,
                    'KdBrg' => $row->KdBrg,
                    'QtyBrg' => $row->QtyBrg,
                    'HargaSP' => $row->HargaSP,
                    'HargaPot' => $row->HargaPot,
                    'IdDetail' => $row->IdDetail,
                ];
                $response[] = $rowData;

                // Hitung total
                $TTotal += (floatval($row->QtyBrg) * (floatval($row->HargaSP) - floatval($row->HargaPot)));
            }

            // Return hasil dan total
            return response()->json([
                'data' => $response,
                'TTotal' => $TTotal,
            ]);
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
