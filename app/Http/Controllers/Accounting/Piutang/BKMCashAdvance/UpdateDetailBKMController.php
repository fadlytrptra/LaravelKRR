<?php

namespace App\Http\Controllers\Accounting\Piutang\BKMCashAdvance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class UpdateDetailBKMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.BKMCashAdvance.UpdateDetailBKM', compact('access'));
    }

    // public function getTabelPelunasan($bulan, $tahun)
    // {
    //     //dd($bulan, $tahun);
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_PELUNASAN_TAGIHAN_1] @kode = ?, @bln = ?, @thn = ?', [1, $bulan, $tahun]);
    //     return response()->json($tabel);
    // }

    // public function cekTabelPelunasan($idPelunasan)
    // {
    //     //dd($idPelunasan);
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_PELUNASAN_TAGIHAN_1] @kode = ?, @idP = ?', [2, $idPelunasan]);
    //     return response()->json($tabel);
    // }

    // public function getTabelDetailPelunasan($idPelunasan)
    // {
    //     //dd($bulan, $tahun);
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_PELUNASAN] @idPelunasan = ?', [$idPelunasan]);
    //     return response()->json($tabel);
    // }

    // public function getTabelKurangLebih($idPelunasan)
    // {
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_KRGLBH] @idPelunasan = ?', [$idPelunasan]);
    //     return response()->json($tabel);
    // }

    // public function getTabelBiaya($idPelunasan)
    // {
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_BIAYA] @idPelunasan = ?', [$idPelunasan]);
    //     return response()->json($tabel);
    // }

    // public function getTabelTampilBKM($tanggalInputTampil, $tanggalInputTampil2)
    // {
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKM_CASHADV_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalInputTampil, $tanggalInputTampil2]);
    //     return response()->json($tabel);
    // }

    // public function getCetakUpdateDetailBKM($idBKMInput)
    // {
    //     //dd($idBKM);
    //     $data = DB::connection('ConnAccounting')->table('VW_PRG_5298_ACC_CETAK_BKM_CASHADV')
    //         ->where('Id_BKM', $idBKMInput)
    //         ->get();
    //     return $data;
    // }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {

    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getPelunasan') {

            // Execute the first stored procedure
            $firstResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_PELUNASAN_TAGIHAN_1 @kode = 1, @bln = ?, @thn = ?', [
                    $request->input('bulan'),
                    $request->input('tahun')
                ]);

            // dd($firstResults);
            $response = [];
            $j = 0;

            foreach ($firstResults as $row) {
                // Execute the second stored procedure for each row in firstResults
                $secondResults = DB::connection('ConnAccounting')
                    ->select('exec SP_5298_ACC_LIST_PELUNASAN_TAGIHAN_1 @kode = 2, @idP = ?', [$row->Id_Pelunasan]);
                // dd($secondResults);
                if ($secondResults && $secondResults[0]->ada > 0) {
                    $j++;
                    $response[] = [
                        'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                        'Id_BKM' => $row->Id_BKM,
                        'Tgl_Pelunasan' => \Carbon\Carbon::parse($row->Tgl_Pelunasan)->format('m/d/Y'),
                        'Id_Pelunasan' => $row->Id_Pelunasan,
                        'Id_bank' => $row->Id_bank ?? '',
                        'Jenis_Pembayaran' => $row->Jenis_Pembayaran,
                        'Nama_MataUang' => $row->Nama_MataUang,
                        'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                        'No_Bukti' => $row->No_Bukti ?? ''
                    ];
                }
            }

            if ($j == 0) {
                return response()->json(['message' => 'Tidak Ada Cash Advance'], 200);
            }

            return datatables($response)->make(true);
        } else if ($id == 'getDetailPelunasan') {
            // Clear any existing lists equivalent logic
            $idPelunasan = $request->input('idPelunasan');

            // First stored procedure: SP_5298_ACC_DETAIL_PELUNASAN
            $pelunasanResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_DETAIL_PELUNASAN @idPelunasan = ?', [$idPelunasan]);
            // dd($pelunasanResults);
            $responsePelunasan = [];
            $j = 0;
            foreach ($pelunasanResults as $row) {
                $j++;
                $responsePelunasan[] = [
                    'ID_Penagihan' => $row->ID_Penagihan,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Pelunasan_Rupiah' => number_format($row->Pelunasan_Rupiah, 2, '.', ','),
                    'Kode_Perkiraan' => $row->Kode_Perkiraan ?? '0.00.00',
                    'NamaCust' => $row->NamaCust,
                    'ID_Detail_Pelunasan' => $row->ID_Detail_Pelunasan
                ];
            }
            return datatables($responsePelunasan)->make(true);
        } else if ($id == 'getDetailBiaya') {
            $idPelunasan = $request->input('idPelunasan');

            // Second stored procedure: SP_5298_ACC_DETAIL_BIAYA
            $biayaResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_DETAIL_BIAYA @idPelunasan = ?', [$idPelunasan]);
            // dd($biayaResults);
            $responseBiaya = [];
            $k = 0;
            foreach ($biayaResults as $row) {
                if ($row->Biaya != 0) {
                    $k++;
                    $responseBiaya[] = [
                        'Keterangan' => $row->Keterangan ?? '',
                        'Biaya' => number_format($row->Biaya, 2, '.', ','),
                        'Kode_Perkiraan' => $row->Kode_Perkiraan ?? '0.00.00',
                        'Id_Detail_Pelunasan' => $row->Id_Detail_Pelunasan
                    ];
                }
            }

            return datatables($responseBiaya)->make(true);
        } else if ($id == 'getDetailKurang') {
            $idPelunasan = $request->input('idPelunasan');
            // Third stored procedure: SP_5298_ACC_DETAIL_KRGLBH
            $krgLbhResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_DETAIL_KRGLBH @idPelunasan = ?', [$idPelunasan]);
            // dd($krgLbhResults);
            $responseKrgLbh = [];
            $l = 0;
            foreach ($krgLbhResults as $row) {
                if ($row->KurangLebih != 0) {
                    $l++;
                    $responseKrgLbh[] = [
                        'Keterangan' => $row->Keterangan ?? '',
                        'KurangLebih' => number_format($row->KurangLebih, 2, '.', ','),
                        'Kode_Perkiraan' => $row->Kode_Perkiraan ?? '0.00.00',
                        'Id_Detail_Pelunasan' => $row->Id_Detail_Pelunasan
                    ];
                }
            }

            return datatables($responseKrgLbh)->make(true);
        } else if ($id == 'getPerkiraan') {
            // dd($request->all());
            if ($request->has('IdPerkiraan')) {
                $perkiraanResults = DB::connection('ConnAccounting')
                    ->select('exec SP_5298_ACC_LIST_KODE_PERKIRAAN @Kode = 2, @IdPerkiraan = ?', [
                        $request->input('IdPerkiraan')
                    ]);

                if ($perkiraanResults && count($perkiraanResults) > 0) {
                    $result = $perkiraanResults[0];
                    $response = [
                        'Keterangan' => $result->Keterangan
                    ];

                    return response()->json($response);
                } else {
                    return response()->json(['message' => 'Data not found']);
                }
            } else {
                return response()->json(['message' => 'IdPerkiraan is required']);
            }
        } else if ($id == 'getKira') {
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_KODEPERKIRAAN');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NoKodePerkiraan' => trim($row->NoKodePerkiraan),
                    'Keterangan' => trim($row->Keterangan),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getListBKM') {
            // Eksekusi stored procedure SP_5298_ACC_LIST_BKM_CASHADV
            // dd($request->all());
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKM_CASHADV');
            // dd($results);
            // Inisialisasi variabel response dan indeks
            $response = [];
            $j = 0;

            // Proses hasil stored procedure
            foreach ($results as $row) {
                $j++;
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan,
                ];
            }

            // Kembalikan data dalam format yang dapat diproses oleh datatables
            return datatables($response)->make(true);
        } else if ($id == 'getOkBKM') {
            // Ambil parameter tanggal dari request
            $tgl1 = $request->input('tgl_awalbkm');
            $tgl2 = $request->input('tgl_akhirbkm');

            // Eksekusi stored procedure SP_5298_ACC_LIST_BKM_CASHADV_PERTGL dengan parameter tanggal
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKM_CASHADV_PERTGL @tgl1 = ?, @tgl2 = ?', [
                    $tgl1,
                    $tgl2
                ]);

            // Inisialisasi variabel response dan indeks
            $response = [];
            $j = 0;

            // Proses hasil stored procedure
            foreach ($results as $row) {
                $j++;
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan
                ];
            }

            // Kembalikan data dalam format yang dapat diproses oleh datatables
            return datatables($response)->make(true);
        }
    }
    // Show the form for editing the specified resource.
    public function edit($id)
    {

    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        if ($id == 'updatePelunasan') {
            // dd($request->all());
            // Update stored procedure untuk detail pelunasan
            DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_UPDATE_DETAIL_PELUNASAN @iddetail = ?, @kode = ?', [
                $request->input('ID_Detail_Pelunasan'),
                $request->input('id_perkiraanMP')
            ]);

            // Ambil nilai j dari input TKeA
            // $j = (int) $request->input('TKeA');

            // Perbarui data ListPelunasan pada indeks j
            // Asumsi: Anda punya logika untuk mengupdate tampilan list ini (disesuaikan dengan implementasi Anda)
            // Misalnya: Simpan atau update dalam database atau session yang sesuai
            // $listPelunasan = session('listPelunasan', []); // Ambil dari session atau data lain
            // if (isset($listPelunasan[$j])) {
            //     $listPelunasan[$j]['SubItems'][3] = $request->input('TIdPerkiraan');
            //     session(['listPelunasan' => $listPelunasan]); // Simpan kembali di session
            // }

            // Pesan notifikasi ke user
            return response()->json([
                'message' => 'Detail Sudah TerKoreksi'
            ], 200);
        } else if ($id == 'updateKrgLbh') {
            // dd($request->all());
            DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_UPDATE_DETAIL_KRGLBH @iddetail = ?, @keterangan = ?, @kode = ?', [
                $request->input('Id_Detail_Pelunasan'),
                $request->input('keterangan_MK'),
                $request->input('id_perkiraanMK')
            ]);

            // Ambil nilai j dari input TKeA
            // $j = (int) $request->input('TKeA');

            // Perbarui data ListKrgLbh pada indeks j
            // Asumsi: Anda punya logika untuk mengupdate tampilan list ini (disesuaikan dengan implementasi Anda)
            // Misalnya: Simpan atau update dalam database atau session yang sesuai
            // $listKrgLbh = session('listKrgLbh', []); // Ambil dari session atau data lain
            // if (isset($listKrgLbh[$j])) {
            //     $listKrgLbh[$j] = $request->input('TUraian');
            //     $listKrgLbh[$j]['SubItems'][2] = $request->input('TIdPerkiraan');
            //     session(['listKrgLbh' => $listKrgLbh]); // Simpan kembali di session
            // }

            // Pesan notifikasi ke user
            return response()->json([
                'message' => 'Detail Sudah TerKoreksi'
            ], 200);
        } else if ($id == 'updateBiaya') {
            // Update stored procedure untuk detail Biaya
            DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_UPDATE_DETAIL_BIAYA @iddetail = ?, @keterangan = ?, @kode = ?', [
                $request->input('Id_Detail_Pelunasan'),
                $request->input('keterangan_MB'),
                $request->input('id_perkiraanMB')
            ]);

            // Ambil nilai j dari input TKeA
            // $j = (int) $request->input('TKeA');

            // Perbarui data ListBiaya pada indeks j
            // Asumsi: Anda punya logika untuk mengupdate tampilan list ini (disesuaikan dengan implementasi Anda)
            // Misalnya: Simpan atau update dalam database atau session yang sesuai
            // $listBiaya = session('listBiaya', []); // Ambil dari session atau data lain
            // if (isset($listBiaya[$j])) {
            //     $listBiaya[$j] = $request->input('TUraian');
            //     $listBiaya[$j]['SubItems'][2] = $request->input('TIdPerkiraan');
            //     session(['listBiaya' => $listBiaya]); // Simpan kembali di session
            // }

            // Pesan notifikasi ke user
            return response()->json([
                'message' => 'Detail Sudah TerKoreksi'
            ], 200);
        }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
