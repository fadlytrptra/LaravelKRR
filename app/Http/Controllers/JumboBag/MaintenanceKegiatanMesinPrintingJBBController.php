<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class MaintenanceKegiatanMesinPrintingJBBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        $listMesin = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?', [0]);
        $user = trim(Auth::user()->NomorUser);
        return view('JumboBag.Transaksi.KegiatanMesinPrinting.MaintenanceKegiatanMesinPrinting', compact('access', 'listMesin', 'user'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $proses = $request->input('proses');
        $idLog = $request->input('idLog');
        $tanggalLog = $request->input('tanggalLog');
        $lokasi = $request->input('lokasi');
        $noMesin = $request->input('noMesin');
        $shiftPrinting = $request->input('shiftPrinting');
        $customer = $request->input('customer');
        $kodeBarang = $request->input('kodeBarang');
        $komponen = $request->input('komponen');
        $jenisPotongan = $request->input('jenisPotongan');
        $ukuranPanjang = $request->input('ukuranPanjang');
        $ukuranLebar = $request->input('ukuranLebar');
        $warnaTinta = $request->input('warnaTinta');
        $beratTintaAwal = $request->input('beratTintaAwal');
        $beratTintaAkhir = $request->input('beratTintaAkhir');
        $jumlahKain = $request->input('jumlahKain');
        $hasilPrinting = $request->input('hasilPrinting');
        $beratKain = $request->input('beratKain');
        $afalanPrinting = $request->input('afalanPrinting');
        $pemakaianReduser = $request->input('pemakaianReduser');
        $pembersihan = $request->input('pembersihan');
        $buangAfalanTintaPail = $request->input('buangAfalanTintaPail');
        $buangAfalanTintaKG = $request->input('buangAfalanTintaKG');
        $keterangan_kegiatan = $request->input('keterangan_kegiatan');
        $user = trim(Auth::user()->NomorUser);
        // dd($request->all());
        try {
            // dd($request->all());
            switch ($proses) {
                case 1:
                    // Simpan
                    DB::connection('ConnJumboBag')
                        ->statement(
                            'EXEC SP_4451_JBB_Maintenance_Log_Mesin_Printing_JBB 
                        @kode = ?,
                        @tanggalLog = ?,
                        @lokasi = ?,
                        @noMesin = ?,
                        @shiftPrinting = ?,
                        @customer = ?,
                        @kodeBarang = ?,
                        @komponen = ?,
                        @jenisPotongan = ?,
                        @ukuranPanjang = ?,
                        @ukuranLebar = ?,
                        @warnaTinta = ?,
                        @beratTintaAwal = ?,
                        @beratTintaAkhir = ?,
                        @jumlahKain = ?,
                        @hasilPrinting = ?,
                        @beratKain = ?,
                        @afalanPrinting = ?,
                        @pemakaianReduser = ?,
                        @pembersihan = ?,
                        @buangAfalanTintaPail = ?,
                        @buangAfalanTintaKG = ?,
                        @keterangan_kegiatan = ?,
                        @user = ?',
                            [
                                1,
                                $tanggalLog,
                                $lokasi,
                                $noMesin,
                                $shiftPrinting,
                                $customer,
                                $kodeBarang,
                                $komponen,
                                $jenisPotongan,
                                $ukuranPanjang,
                                $ukuranLebar,
                                $warnaTinta,
                                $beratTintaAwal,
                                $beratTintaAkhir,
                                $jumlahKain,
                                $hasilPrinting,
                                $beratKain,
                                $afalanPrinting,
                                $pemakaianReduser,
                                $pembersihan,
                                $buangAfalanTintaPail,
                                $buangAfalanTintaKG,
                                $keterangan_kegiatan,
                                $user
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil disimpan!']);

                case 2:
                    // Koreksi
                    // dd($request->all());
                    DB::connection('ConnJumboBag')
                        ->statement(
                            'EXEC SP_4451_JBB_Maintenance_Log_Mesin_Printing_JBB 
                        @kode = ?,
                        @idLog = ?,
                        @shiftPrinting = ?,
                        @customer = ?,
                        @kodeBarang = ?,
                        @komponen = ?,
                        @jenisPotongan = ?,
                        @ukuranPanjang = ?,
                        @ukuranLebar = ?,
                        @warnaTinta = ?,
                        @beratTintaAwal = ?,
                        @beratTintaAkhir = ?,
                        @jumlahKain = ?,
                        @hasilPrinting = ?,
                        @beratKain = ?,
                        @afalanPrinting = ?,
                        @pemakaianReduser = ?,
                        @pembersihan = ?,
                        @buangAfalanTintaPail = ?,
                        @buangAfalanTintaKG = ?,
                        @keterangan_kegiatan = ?,
                        @user = ?',
                            [
                                2,
                                $idLog,
                                $shiftPrinting,
                                $customer,
                                $kodeBarang,
                                $komponen,
                                $jenisPotongan,
                                $ukuranPanjang,
                                $ukuranLebar,
                                $warnaTinta,
                                $beratTintaAwal,
                                $beratTintaAkhir,
                                $jumlahKain,
                                $hasilPrinting,
                                $beratKain,
                                $afalanPrinting,
                                $pemakaianReduser,
                                $pembersihan,
                                $buangAfalanTintaPail,
                                $buangAfalanTintaKG,
                                $keterangan_kegiatan,
                                $user
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil diupdate!']);

                case 3:
                    // Delete
                    // dd($request->all());
                     DB::connection('ConnJumboBag')
                        ->statement(
                            'EXEC SP_4451_JBB_Maintenance_Log_Mesin_Printing_JBB 
                        @kode = ?,
                        @idLog = ?,
                        @user = ?',
                            [
                                5,
                                $idLog,
                                $user
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil dihapus!']);

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
        if ($id == 'initModalTambahKegiatanMesinPotong') {
            $idTypeMesin = $request->input('idTypeMesin');
            $user = trim(Auth::user()->NomorUser);
            $dataMesin = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?, @XIdTypeMesin = ?, @XNomorUser = ?', [0, $idTypeMesin, $user]);
            $dataCustomer = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?', [3]);
            return response()->json([
                'dataMesin' => $dataMesin,
                'dataCustomer' => $dataCustomer,
            ], 200);
        } else if ($id == 'getTabelHitunganByCustomer') {
            $kodeCustomer = $request->input('kodeCustomer');
            $dataTabelHit = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?, @XKodeCustomer = ?', [4, $kodeCustomer]);
            return response()->json($dataTabelHit, 200);
        } else if ($id == 'getKomponenByTabelHitungan') {
            $kodeBarang = $request->input('kodeBarang');
            $dataKomponen = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?, @XKdBrgTabelHit = ?', [5, $kodeBarang]);
            return response()->json($dataKomponen, 200);
        } else if ($id == 'getData') {
            // dd($request->all());
            // $tgl_awal = $request->input('tgl_awal');
            // $tgl_akhir = $request->input('tgl_akhir');
            $lokasi = $request->input('lokasi');
            // dd($lokasi);
            $user = trim(Auth::user()->NomorUser);
            // if ($lokasi == 3) {
            //     // dd($lokasi);
            //     $results = DB::connection('ConnExtruder')
            //         ->select('EXEC SP_4451_JBB_Maintenance_Log_Mesin_Printing_JBB @kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [9, $tgl_awal, $tgl_akhir, $lokasi]);
            // } else {
            //     $results = DB::connection('ConnExtruder')
            //         ->select('EXEC SP_4451_MaintenanceSettingMesin @kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [4, $tgl_awal, $tgl_akhir, $lokasi]);
            // }

            $results = DB::connection('ConnJumboBag')
                ->select('EXEC SP_4451_JBB_Maintenance_Log_Mesin_Printing_JBB @kode = ?, @lokasi = ?', [3, $lokasi]);

            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggalLog' => Carbon::parse($row->tanggalLog)->format('m/d/Y'),
                    'tanggalLog_raw' => Carbon::parse($row->tanggalLog)->format('Y-m-d'),
                    'idLog' => trim($row->idLog),
                    'noMesin' => trim($row->noMesin),
                    'shiftPrinting' => trim($row->shiftPrinting),
                    'kodeBarang' => trim($row->kodeBarang),
                    'warnaTinta' => trim($row->warnaTinta),
                    'beratKain' => trim($row->beratKain),
                    'afalanPrinting' => trim($row->afalanPrinting),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataEdit') {
            // dd($request->all());
            $idLog = $request->input('idLog');
            $lokasi = $request->input('lokasi');
            $user = trim(Auth::user()->NomorUser);

            $results = DB::connection('ConnJumboBag')
                ->select('EXEC SP_4451_JBB_Maintenance_Log_Mesin_Printing_JBB @kode = ?, @idLog = ?', [4, $idLog]);

            return response()->json($results, 200);
            // dd($results);
            // $response = [];
            // foreach ($results as $row) {
            //     $response[] = [
            //         'tanggalLog' => Carbon::parse($row->tanggalLog)->format('m/d/Y'),
            //         'tanggalLog_raw' => Carbon::parse($row->tanggalLog)->format('Y-m-d'),
            //         'idLog' => trim($row->idLog),
            //         'noMesin' => trim($row->noMesin),
            //         'shiftPrinting' => trim($row->shiftPrinting),
            //         'kodeBarang' => trim($row->kodeBarang),
            //         'warnaTinta' => trim($row->warnaTinta),
            //         'beratKain' => trim($row->beratKain),
            //         'afalanPrinting' => trim($row->afalanPrinting),
            //     ];
            // }
            // return datatables($response)->make(true);

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
