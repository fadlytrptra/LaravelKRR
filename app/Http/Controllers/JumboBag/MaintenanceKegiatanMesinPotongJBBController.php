<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Yajra\DataTables\Facades\DataTables;
use Exception;
use DB;
use Auth;

class MaintenanceKegiatanMesinPotongJBBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        $listMesin = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?', [0]);
        $user = trim(Auth::user()->NomorUser);
        return view('JumboBag.Transaksi.KegiatanMesinPotong.MaintenanceKegiatanMesinPotong', compact('access', 'listMesin', 'user'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $jenisStore = $request->input('jenisStore');
        $idLog = $request->input('idLog');
        $TglLogPotong = $request->input('TglLogPotong');
        $idMesinPotong = $request->input('idMesinPotong');
        $shiftPotong = $request->input('shiftPotong');
        $ukuranRoll = $request->input('ukuranRoll');
        $rajutanWA = $request->input('rajutanWA');
        $rajutanWE = $request->input('rajutanWE');
        $denierKain = $request->input('denierKain');
        $statusLami = $request->input('statusLami') == "L" ? 1 : 0;
        $warnaRoll = $request->input('warnaRoll');
        $statusReinforced = $request->input('statusReinforced') == "R" ? 1 : 0;
        $beratRoll = $request->input('beratRoll');
        $panjangRoll = $request->input('panjangRoll');
        $nomor_mesinCL = $request->input('nomor_mesinCL');
        $kodebarang_tableHit = $request->input('kodebarang_tableHit');
        $komponen_tableHit = $request->input('komponen_tableHit');
        $jenisPotongan = $request->input('jenisPotongan');
        $ukuranpanjang_tableHit = $request->input('ukuranpanjang_tableHit');
        $ukuranlebar_tableHit = $request->input('ukuranlebar_tableHit');
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
        $afalan_settingLBR = $request->input('afalan_settingLBR');
        $afalan_settingKG = $request->input('afalan_settingKG');
        $afalan_lamiSambunganLBR = $request->input('afalan_lamiSambunganLBR');
        $afalan_lamiSambunganKG = $request->input('afalan_lamiSambunganKG');
        $afalan_lamiEkorLBR = $request->input('afalan_lamiEkorLBR');
        $afalan_lamiEkorKG = $request->input('afalan_lamiEkorKG');
        $afalan_lamiLubangLBR = $request->input('afalan_lamiLubangLBR');
        $afalan_lamiLubangKG = $request->input('afalan_lamiLubangKG');
        $afalan_kotorLBR = $request->input('afalan_kotorLBR');
        $afalan_kotorKG = $request->input('afalan_kotorKG');
        $afalan_totalLBR = $request->input('afalan_totalLBR');
        $afalan_totalKG = $request->input('afalan_totalKG');
        $panjangPemakaian = $request->input('panjangPemakaian');
        $beratPemakaian = $request->input('beratPemakaian');
        $selisihPanjang = $request->input('selisihPanjang');
        $selisihBerat = $request->input('selisihBerat');
        $afalan_persentaseKG = $request->input('afalan_persentaseKG');
        $user = trim(Auth::user()->NomorUser);
        $alasan = $request->input('alasanEdit');
        date_default_timezone_set('Asia/Jakarta');
        $date = date('Y-m-d H:i:s');
        $edited = (string) 'Edited by: ' . $user . ' | On: ' . $date . ' | Reason: ' . $alasan;
        $inputed = (string) 'Inputed by: ' . $user . ' | On: ' . $date;
        if ($jenisStore == 'store') {
            try {
                // Tambah Log Mesin Potong
                DB::connection('ConnJumboBag')->statement('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB
                    @XKode = ?,
                    @XTgl_Log = ?,
                    @XShift = ?,
                    @XId_Mesin = ?,
                    @XUkuran_Roll = ?,
                    @XRajutan_WA = ?,
                    @XRajutan_WE = ?,
                    @XDenier = ?,
                    @XStatus_Lami = ?,
                    @XWarna = ?,
                    @XStatus_Reinforced = ?,
                    @XBerat_Roll = ?,
                    @XPanjang_Roll = ?,
                    @XNomor_Mesin_CL = ?,
                    @XKB_TabelHit = ?,
                    @XKode_Komponen_TabelHit = ?,
                    @XJenis_Potongan = ?,
                    @XPanjang_Potongan = ?,
                    @XLebar_Potongan = ?,
                    @XJumlah_Hasil_Potong = ?,
                    @XBerat_Hasil_Potong = ?,
                    @XLembar_Afalan_WA = ?,
                    @XBerat_Afalan_WA = ?,
                    @XLembar_Afalan_WE = ?,
                    @XBerat_Afalan_WE = ?,
                    @XLembar_Afalan_Lami = ?,
                    @XBerat_Afalan_Lami = ?,
                    @XLembar_Afalan_Tepi = ?,
                    @XBerat_Afalan_Tepi = ?,
                    @XLembar_Afalan_Setting = ?,
                    @XBerat_Afalan_Setting = ?,
                    @XLembar_Afalan_LamiSambungan = ?,
                    @XBerat_Afalan_LamiSambungan = ?,
                    @XLembar_Afalan_LamiEkor = ?,
                    @XBerat_Afalan_LamiEkor = ?,
                    @XLembar_Afalan_LamiLubang = ?,
                    @XBerat_Afalan_LamiLubang = ?,
                    @XLembar_Afalan_Kotor = ?,
                    @XBerat_Afalan_Kotor = ?,
                    @XLembar_Afalan_Total = ?,
                    @XBerat_Afalan_Total = ?,
                    @XPanjang_Pemakaian = ?,
                    @XBerat_Pemakaian = ?,
                    @XPanjang_Selisih = ?,
                    @XBerat_Selisih = ?,
                    @XPersentase_Afalan = ?,
                    @XInput_Information = ?',
                    [
                        6,
                        $TglLogPotong,
                        $shiftPotong,
                        $idMesinPotong,
                        $ukuranRoll,
                        $rajutanWA,
                        $rajutanWE,
                        $denierKain,
                        $statusLami,
                        $warnaRoll,
                        $statusReinforced,
                        $beratRoll,
                        $panjangRoll,
                        $nomor_mesinCL,
                        $kodebarang_tableHit,
                        $komponen_tableHit,
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
                        $afalan_settingLBR,
                        $afalan_settingKG,
                        $afalan_lamiSambunganLBR,
                        $afalan_lamiSambunganKG,
                        $afalan_lamiEkorLBR,
                        $afalan_lamiEkorKG,
                        $afalan_lamiLubangLBR,
                        $afalan_lamiLubangKG,
                        $afalan_kotorLBR,
                        $afalan_kotorKG,
                        $afalan_totalLBR,
                        $afalan_totalKG,
                        $panjangPemakaian,
                        $beratPemakaian,
                        $selisihPanjang,
                        $selisihBerat,
                        $afalan_persentaseKG,
                        $inputed
                    ]
                );
                return response()->json(['success' => 'Data Kegiatan Mesin berhasil ditambahkan.'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($jenisStore == 'update') {
            try {
                // Update Log Mesin Potong
                DB::connection('ConnJumboBag')->statement('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB
                    @XKode = ?,
                    @XTgl_Log = ?,
                    @XShift = ?,
                    @XId_Mesin = ?,
                    @XUkuran_Roll = ?,
                    @XRajutan_WA = ?,
                    @XRajutan_WE = ?,
                    @XDenier = ?,
                    @XStatus_Lami = ?,
                    @XWarna = ?,
                    @XStatus_Reinforced = ?,
                    @XBerat_Roll = ?,
                    @XPanjang_Roll = ?,
                    @XNomor_Mesin_CL = ?,
                    @XKB_TabelHit = ?,
                    @XKode_Komponen_TabelHit = ?,
                    @XJenis_Potongan = ?,
                    @XPanjang_Potongan = ?,
                    @XLebar_Potongan = ?,
                    @XJumlah_Hasil_Potong = ?,
                    @XBerat_Hasil_Potong = ?,
                    @XLembar_Afalan_WA = ?,
                    @XBerat_Afalan_WA = ?,
                    @XLembar_Afalan_WE = ?,
                    @XBerat_Afalan_WE = ?,
                    @XLembar_Afalan_Lami = ?,
                    @XBerat_Afalan_Lami = ?,
                    @XLembar_Afalan_Tepi = ?,
                    @XBerat_Afalan_Tepi = ?,
                    @XLembar_Afalan_Setting = ?,
                    @XBerat_Afalan_Setting = ?,
                    @XLembar_Afalan_LamiSambungan = ?,
                    @XBerat_Afalan_LamiSambungan = ?,
                    @XLembar_Afalan_LamiEkor = ?,
                    @XBerat_Afalan_LamiEkor = ?,
                    @XLembar_Afalan_LamiLubang = ?,
                    @XBerat_Afalan_LamiLubang = ?,
                    @XLembar_Afalan_Kotor = ?,
                    @XBerat_Afalan_Kotor = ?,
                    @XLembar_Afalan_Total = ?,
                    @XBerat_Afalan_Total = ?,
                    @XPanjang_Pemakaian = ?,
                    @XBerat_Pemakaian = ?,
                    @XPanjang_Selisih = ?,
                    @XBerat_Selisih = ?,
                    @XPersentase_Afalan = ?,
                    @XEdit_Information = ?,
                    @XIdLog = ?',
                    [
                        7,
                        $TglLogPotong,
                        $shiftPotong,
                        $idMesinPotong,
                        $ukuranRoll,
                        $rajutanWA,
                        $rajutanWE,
                        $denierKain,
                        $statusLami,
                        $warnaRoll,
                        $statusReinforced,
                        $beratRoll,
                        $beratPemakaian,
                        $nomor_mesinCL,
                        $kodebarang_tableHit,
                        $komponen_tableHit,
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
                        $afalan_settingLBR,
                        $afalan_settingKG,
                        $afalan_lamiSambunganLBR,
                        $afalan_lamiSambunganKG,
                        $afalan_lamiEkorLBR,
                        $afalan_lamiEkorKG,
                        $afalan_lamiLubangLBR,
                        $afalan_lamiLubangKG,
                        $afalan_kotorLBR,
                        $afalan_kotorKG,
                        $afalan_totalLBR,
                        $afalan_totalKG,
                        $panjangPemakaian,
                        $beratPemakaian,
                        $selisihPanjang,
                        $selisihBerat,
                        $afalan_persentaseKG,
                        $edited,
                        $idLog
                    ]
                );
                return response()->json(['success' => 'Data Kegiatan Mesin berhasil diupdate.'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $jenisStore]);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getLogMesin') {
            $user = trim(Auth::user()->NomorUser);
            $listLogMesin = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?, @XNomorUser = ?', [2, $user]);
            return datatables($listLogMesin)->make(true);
        } else if ($id == 'initModalTambahKegiatanMesinPotong') {
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
        } else if ($id == 'getDataByBarcode') {
            $kodeBarang = $request->input('kodeBarang');
            $nomorIndeks = $request->input('nomorIndeks');
            $dataBarcode = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?, @XKodeBarang = ?, @XNoIndeks = ?', [1, $kodeBarang, $nomorIndeks]);
            return response()->json($dataBarcode, 200);
        } else if ($id == 'getLogMesinByIdLog') {
            $user = trim(Auth::user()->NomorUser);
            $idLog = $request->input('idLog');
            $dataLog = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?, @XIdLog = ?, @XNomorUser = ?', [9, $idLog, $user]);
            return response()->json($dataLog, 200);
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

    public function destroy($id, Request $request)
    {
        $user = trim(Auth::user()->NomorUser);
        $alasan = $request->input('alasanHapus');
        date_default_timezone_set('Asia/Jakarta');
        $date = date('Y-m-d H:i:s');
        $deleted = (string) 'Deleted by: ' . $user . ' | On: ' . $date . ' | Reason: ' . $alasan;
        try {
            DB::connection('ConnJumboBag')->statement('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB
                    @XKode = ?,
                    @XDelete_Information = ?,
                    @XIdLog = ?',
                [
                    8,
                    $deleted,
                    $id
                ]
            );
            return response()->json(['success' => 'Data kegiatan mesin berhasil diproses soft delete.']);
        } catch (Exception $e) {
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
        }
    }
}
