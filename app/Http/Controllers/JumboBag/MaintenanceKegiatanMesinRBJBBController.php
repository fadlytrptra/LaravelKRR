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

class MaintenanceKegiatanMesinRBJBBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        $listMesin = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?', [0]);
        $user = trim(Auth::user()->NomorUser);
        return view('JumboBag.Transaksi.KegiatanMesinRopeBelt.MaintenanceKegiatanMesinRB', compact('access', 'listMesin', 'user'));
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
        $namaMesin = $request->input('namaMesin');
        $shiftRB = $request->input('shiftRB');
        $ukuranRoll = $request->input('ukuranRoll');
        $rajutanWA = $request->input('rajutanWA');
        $rajutanWE = $request->input('rajutanWE');
        $denierKain = $request->input('denierKain');
        $lami = $request->input('lami');
        $warnaRoll = $request->input('warnaRoll');
        $reinforced = $request->input('reinforced');
        $beratRoll = $request->input('beratRoll');
        $panjangRoll = $request->input('panjangRoll');
        $nomor_mesinCL = $request->input('nomor_mesinCL');
        $customer = $request->input('customer');
        $kodeBarang = $request->input('kodeBarang');
        $komponen = $request->input('komponen');
        $jenisPotongan = $request->input('jenisPotongan');
        $ukuranpanjang_tableHit = $request->input('ukuranPanjang');
        $ukuranlebar_tableHit = $request->input('ukuranLebar');
        $hasil_potongJumlah = $request->input('hasil_potongJumlah');
        $hasil_potongBerat = $request->input('hasil_potongBerat');
        $afalan_waLBR = $request->input('afalan_waLBR');
        $afalan_waKG = $request->input('afalan_waKG');
        $afalan_weLBR = $request->input('afalan_weLBR');
        $afalan_weKG = $request->input('afalan_weKG');
        $afalan_lamiLBR = $request->input('afalan_lamiLBR');
        $afalan_lamiKG = $request->input('afalan_lamiKG');
        $afalan_tepiLBR = $request->input('afalan_tepiLBR');
        $afalan_tepiKG = $request->input('afalan_tepiKG');
        $keterangan_kegiatan = $request->input('keterangan_kegiatan');
        $afalan_totalLBR = $request->input('afalan_totalLBR');
        $afalan_totalKG = $request->input('afalan_totalKG');
        $panjangPemakaian = $request->input('panjangPemakaian');
        $beratPemakaian = $request->input('beratPemakaian');
        $selisihPanjang = $request->input('selisihPanjang');
        $selisihBerat = $request->input('selisihBerat');
        $afalan_persentaseKG = $request->input('afalan_persentaseKG');
        // $allRowsDataDetail = $request->input('allRowsDataDetail');+++
        $user = trim(Auth::user()->NomorUser);
        // dd($request->all());
        try {
            // dd($request->all());
            switch ($proses) {
                case 1:
                    // Simpan
                    DB::connection('ConnJumboBag')
                        ->statement(
                            'EXEC SP_4451_JBB_Maintenance_Log_Mesin_RopeBelt_JBB 
                        @kode = ?,
                        @tanggalLog = ?,
				        @lokasi = ?,
				        @namaMesin = ?,
				        @shiftRB = ?,
				        @ukuranRoll = ?,
				        @rajutanWA = ?,
				        @rajutanWE = ?,
				        @denierKain = ?,
				        @lami = ?,
				        @warnaRoll = ?,
				        @reinforced = ?,
				        @beratRoll = ?,
				        @panjangRoll = ?,
				        @nomor_mesinCL = ?,
				        @customer = ?,
				        @kodeBarang = ?,
				        @komponen = ?,
				        @jenisPotongan = ?,
				        @ukuranpanjang_tableHit = ?,
				        @ukuranlebar_tableHit = ?,
				        @hasil_potongJumlah = ?,
				        @hasil_potongBerat = ?,
				        @afalan_waLBR = ?,
				        @afalan_waKG = ?,
				        @afalan_weLBR = ?,
				        @afalan_weKG = ?,
				        @afalan_lamiLBR = ?,
				        @afalan_lamiKG = ?,
				        @afalan_tepiLBR = ?,
				        @afalan_tepiKG = ?,
				        @keterangan_kegiatan = ?,
				        @afalan_totalLBR = ?,
				        @afalan_totalKG = ?,
				        @panjangPemakaian = ?,
				        @beratPemakaian = ?,
				        @selisihPanjang = ?,
				        @selisihBerat = ?,
				        @afalan_persentaseKG = ?,
                        @user = ?',
                            [
                                1,
                                $tanggalLog,
                                $lokasi,
                                $namaMesin,
                                $shiftRB,
                                $ukuranRoll,
                                $rajutanWA,
                                $rajutanWE,
                                $denierKain,
                                $lami,
                                $warnaRoll,
                                $reinforced,
                                $beratRoll,
                                $panjangRoll,
                                $nomor_mesinCL,
                                $customer,
                                $kodeBarang,
                                $komponen,
                                $jenisPotongan,
                                $ukuranpanjang_tableHit,
                                $ukuranlebar_tableHit,
                                $hasil_potongJumlah,
                                $hasil_potongBerat,
                                $afalan_waLBR,
                                $afalan_waKG,
                                $afalan_weLBR,
                                $afalan_weKG,
                                $afalan_lamiLBR,
                                $afalan_lamiKG,
                                $afalan_tepiLBR,
                                $afalan_tepiKG,
                                $keterangan_kegiatan,
                                $afalan_totalLBR,
                                $afalan_totalKG,
                                $panjangPemakaian,
                                $beratPemakaian,
                                $selisihPanjang,
                                $selisihBerat,
                                $afalan_persentaseKG,
                                $user
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil disimpan!']);

                case 2:
                    // Koreksi
                    // dd($request->all());
                    // dd($total_beratPemakaianTinta);
                    DB::connection('ConnJumboBag')
                        ->statement(
                            'EXEC SP_4451_JBB_Maintenance_Log_Mesin_RopeBelt_JBB 
                        @kode = ?,
                        @idLog = ?,
				        @namaMesin = ?,
				        @shiftRB = ?,
				        @ukuranRoll = ?,
				        @rajutanWA = ?,
				        @rajutanWE = ?,
				        @denierKain = ?,
				        @lami = ?,
				        @warnaRoll = ?,
				        @reinforced = ?,
				        @beratRoll = ?,
				        @panjangRoll = ?,
				        @nomor_mesinCL = ?,
				        @customer = ?,
				        @kodeBarang = ?,
				        @komponen = ?,
				        @jenisPotongan = ?,
				        @ukuranpanjang_tableHit = ?,
				        @ukuranlebar_tableHit = ?,
				        @hasil_potongJumlah = ?,
				        @hasil_potongBerat = ?,
				        @afalan_waLBR = ?,
				        @afalan_waKG = ?,
				        @afalan_weLBR = ?,
				        @afalan_weKG = ?,
				        @afalan_lamiLBR = ?,
				        @afalan_lamiKG = ?,
				        @afalan_tepiLBR = ?,
				        @afalan_tepiKG = ?,
				        @keterangan_kegiatan = ?,
				        @afalan_totalLBR = ?,
				        @afalan_totalKG = ?,
				        @panjangPemakaian = ?,
				        @beratPemakaian = ?,
				        @selisihPanjang = ?,
				        @selisihBerat = ?,
				        @afalan_persentaseKG = ?,
                        @user = ?',
                            [
                                2,
                                $idLog,
                                $namaMesin,
                                $shiftRB,
                                $ukuranRoll,
                                $rajutanWA,
                                $rajutanWE,
                                $denierKain,
                                $lami,
                                $warnaRoll,
                                $reinforced,
                                $beratRoll,
                                $panjangRoll,
                                $nomor_mesinCL,
                                $customer,
                                $kodeBarang,
                                $komponen,
                                $jenisPotongan,
                                $ukuranpanjang_tableHit,
                                $ukuranlebar_tableHit,
                                $hasil_potongJumlah,
                                $hasil_potongBerat,
                                $afalan_waLBR,
                                $afalan_waKG,
                                $afalan_weLBR,
                                $afalan_weKG,
                                $afalan_lamiLBR,
                                $afalan_lamiKG,
                                $afalan_tepiLBR,
                                $afalan_tepiKG,
                                $keterangan_kegiatan,
                                $afalan_totalLBR,
                                $afalan_totalKG,
                                $panjangPemakaian,
                                $beratPemakaian,
                                $selisihPanjang,
                                $selisihBerat,
                                $afalan_persentaseKG,
                                $user
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil diupdate!']);

                case 3:
                    // Delete
                    // dd($request->all());
                    DB::connection('ConnJumboBag')
                        ->statement(
                            'EXEC SP_4451_JBB_Maintenance_Log_Mesin_RopeBelt_JBB 
                        @kode = ?,
                        @idLog = ?,
                        @user = ?',
                            [
                                3,
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
                ->select('EXEC SP_4451_JBB_Maintenance_Log_Mesin_RopeBelt_JBB @kode = ?, @lokasi = ?', [4, $lokasi]);

            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggalLog' => Carbon::parse($row->tanggalLog)->format('m/d/Y'),
                    'tanggalLog_raw' => Carbon::parse($row->tanggalLog)->format('Y-m-d'),
                    'idLog' => trim($row->idLog),
                    'jenisPotongan' => $row->jenisPotongan,
                    'namaMesin' => trim($row->namaMesin),
                    'shiftRB' => trim($row->shiftRB),
                    'kodeBarang' => trim($row->kodeBarang),
                    'NamaUser' => trim($row->NamaUser),
                    'NomorUser' => trim($row->NomorUser),
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
                ->select('EXEC SP_4451_JBB_Maintenance_Log_Mesin_RopeBelt_JBB @kode = ?, @idLog = ?', [5, $idLog]);

            return response()->json($results, 200);

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
