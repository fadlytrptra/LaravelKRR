<?php

namespace App\Http\Controllers\QC\Circular;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class CircularMojosariD extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        return view('QC.Circular.CircularMojosariD', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id, Request $request)
    {

        // Tampil data pada hari itu yg belom masuk QC
        if ($id == 'getDataFromDate') {
            $tgl = $request->input('TglLog');

            $listDataDate = DB::connection('ConnCircular')
                ->select('exec [SP_1273_QC_LIST_QC] @Kode= ?, @TglLog= ?', [6, $tgl]);
            $dataDate = [];
            foreach ($listDataDate as $dateSelected) {
                $dataDate[] = [
                    'Id_Log' => $dateSelected->Id_Log,
                    'Nama_Mesin' => $dateSelected->Nama_mesin,
                    'NAMA_BRG' => $dateSelected->NAMA_BRG,
                    'Shift' => $dateSelected->Shift,
                ];
            }
            return datatables($dataDate)->make(true);
        }

        // ambil dan tampilkan data detail yg dipilih (blom masuk qc)
        else if ($id == 'showDetailByLog') {
            $IdLog = $request->input('IdLog');
            $listDetailByLog = DB::connection('ConnCircular')
                ->select('exec [SP_1273_QC_LIST_QC] @Kode= ?, @IdLog= ?', [2, $IdLog]);

            $dataDetailByLog = [];
            foreach ($listDetailByLog as $detail) {
                $dataDetailByLog[] = [
                    // 'idLog' => $detail->Id_Log,
                    'mesin' => $detail->Nama_mesin,
                    'ukuran' => $detail->Ukuran,
                    'waftRajutan' => $detail->R_WA,
                    'weftRajutan' => $detail->R_WE,
                    'waftBenang' => $detail->BngWaft,
                    'weftBenang' => $detail->BngWeft,
                    'waftDenier' => $detail->DenierWA,
                    'weftDenier' => $detail->DenierWE,
                    'Lebar' => $detail->Lebar,
                    'D_TEK9' => $detail->D_TEK9,
                    'JenisKrg' => $detail->JenisKrg
                ];
            }
            return response()->json($dataDetailByLog);
        }

        // ambil data yang sudah masuk qc, tampilkan di table bawah
        else if ($id == 'getQcData') {
            $tgl = $request->input('TglLog');

            $listDataQc = DB::connection('ConnCircular')
                ->select('exec [SP_1273_QC_LIST_QC] @Kode= ?, @TglLog= ?', [7, $tgl]);
            $QcData = [];
            foreach ($listDataQc as $QcSelected) {
                $QcData[] = [
                    'Nama_Mesin' => $QcSelected->Nama_mesin,
                    'Shift' => $QcSelected->Shift,
                    'Id_Log' => $QcSelected->Id_Log,
                    'R_Ukuran' => $QcSelected->R_Ukuran,
                    'R_Potongan' => $QcSelected->R_Potongan,
                    'R_Berat' => $QcSelected->R_Berat,
                    'R_BeratSTD' => $QcSelected->R_BeratSTD,
                    'Keterangan' => $QcSelected->Keterangan,
                    'St_Warp' => $QcSelected->St_Warp,
                    'Elg_Warp' => $QcSelected->Elg_Warp,
                    'St_Weft' => $QcSelected->St_Weft,
                    'Elg_Weft' => $QcSelected->Elg_Weft,
                    'St_Reinforced' => $QcSelected->St_Reinforced,
                    'Elg_Reinforced' => $QcSelected->Elg_Reinforced,
                    'Berat_Reinforced' => $QcSelected->Berat_Reinforced,
                    'Standart_WA' => $QcSelected->Standart_WA,
                    'Standart_WE' => $QcSelected->Standart_WE,
                    'Standart_ElgWA' => $QcSelected->Standart_ElgWA,
                    'Standart_ElgWE' => $QcSelected->Standart_ElgWE,

                    'Id_QC' => $QcSelected->Id_QC
                ];
            }
            return datatables($QcData)->make(true);
        }

        // ambil data yang kurang dari table qc
        else if ($id == 'getWaftWeft') {
            $IdLog = $request->input('IdLog');

            $listWaftWeft = DB::connection('ConnCircular')
                ->select('exec [SP_1273_QC_LIST_QC] @Kode= ?, @IdLog= ?', [2, $IdLog]);
            $WaftWeftData = [];
            foreach ($listWaftWeft as $selectedWaftWeft) {
                $WaftWeftData[] = [
                    'Waft_Rajutan' => $selectedWaftWeft->R_WA,
                    'Weft_Rajutan' => $selectedWaftWeft->R_WE,
                    'Waft_Benang' => $selectedWaftWeft->BngWaft,
                    'Weft_Benang' => $selectedWaftWeft->BngWeft,
                    'Waft_Denier' => $selectedWaftWeft->DenierWA,
                    'Weft_Denier' => $selectedWaftWeft->DenierWE,
                    'Lebar' => $selectedWaftWeft->Lebar,
                    'D_TEK9' => $selectedWaftWeft->D_TEK9,
                    'JenisKrg' => $selectedWaftWeft->JenisKrg
                ];
            }
            return response()->json($WaftWeftData);
        }

        // ambil berat standart kalau sudah ada
        else if ($id == 'ambilBeratStandart') {
            $IdLog = $request->input('IdLog');

            $dataBeratStd = DB::connection('ConnCircular')
                ->select('exec [SP_1273_QC_LIST_QC] @Kode= ?, @IdLog= ?', [5, $IdLog]);
            $beratStdArr = [];
            foreach ($dataBeratStd as $ambilBerat) {
                $beratStdArr[] = [
                    'beratStandart' => $ambilBerat->BERAT_TOTAL,
                ];
            }
            return response()->json($beratStdArr);
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {

        // update isi, kalau proses button ISI
        if ($id == 'prosesIsiData') {
            $IdLog = $request->input('IdLog');
            $Tanggal = $request->input('Tanggal');
            $Ukuran = $request->input('Ukuran');
            $UkuranSTD = $request->input('UkuranSTD');
            $Potongan = $request->input('Potongan');
            $BeratSTD = $request->input('BeratSTD');
            $Berat = $request->input('Berat');
            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);
            $StWarp = $request->input('StWarp');
            $ElgWarp = $request->input('ElgWarp');
            $StWeft = $request->input('StWeft');
            $ElgWeft = $request->input('ElgWeft');
            $StReinforced = $request->input('StReinforced');
            $ElgReinforced = $request->input('ElgReinforced');
            $BeratReinforced = $request->input('BeratReinforced');
            $StandartWA = $request->input('StandartWA');
            $StandartWE = $request->input('StandartWE');
            $StandartElgWA = $request->input('StandartElgWA');
            $StandartElgWE = $request->input('StandartElgWE');

            try {
                DB::connection('ConnCircular')
                    ->statement('exec [SP_1273_QC_MAINT_QC]
                @Kode = ?,
                @IdLog = ?,
                @Tanggal = ?,
                @Ukuran = ?,
                @UkuranSTD = ?,
                @Potongan = ?,
                @BeratSTD = ?,
                @Berat = ?,
                @UserInput = ?,
                @StWarp = ?,
                @ElgWarp = ?,
                @StWeft = ?,
                @ElgWeft = ?,
                @StReinforced = ?,
                @ElgReinforced = ?,
                @BeratReinforced = ?,
                @StandartWA = ?,
                @StandartWE = ?,
                @StandartElgWA = ?,
                @StandartElgWE = ?', [
                        1,
                        $IdLog,
                        $Tanggal,
                        $Ukuran,
                        $UkuranSTD,
                        $Potongan,
                        $BeratSTD,
                        $Berat,
                        $UserInput,
                        $StWarp,
                        $ElgWarp,
                        $StWeft,
                        $ElgWeft,
                        $StReinforced,
                        $ElgReinforced,
                        $BeratReinforced,
                        $StandartWA,
                        $StandartWE,
                        $StandartElgWA,
                        $StandartElgWE,
                    ]);
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // koreksi
        else if ($id == 'prosesKoreksiData') {
            $Ukuran = $request->input('Ukuran');
            $Potongan = $request->input('Potongan');
            $BeratSTD = $request->input('BeratSTD');
            $Berat = $request->input('Berat');

            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);

            $StWarp = $request->input('StWarp');
            $ElgWarp = $request->input('ElgWarp');
            $StWeft = $request->input('StWeft');
            $ElgWeft = $request->input('ElgWeft');
            $StReinforced = $request->input('StReinforced');
            $ElgReinforced = $request->input('ElgReinforced');
            $BeratReinforced = $request->input('BeratReinforced');
            $StandartWA = $request->input('StandartWA');
            $StandartWE = $request->input('StandartWE');
            $StandartElgWA = $request->input('StandartElgWA');
            $StandartElgWE = $request->input('StandartElgWE');

            $Id_QC = $request->input('Id_QC');

            try {
                DB::connection('ConnCircular')
                    ->statement('exec [SP_1273_QC_MAINT_QC]
                @Kode = ?,
                @Ukuran = ?,
                @Potongan = ?,
                @BeratSTD = ?,
                @Berat = ?,
                @UserInput = ?,
                @StWarp = ?,
                @ElgWarp = ?,
                @StWeft = ?,
                @ElgWeft = ?,
                @StReinforced = ?,
                @ElgReinforced = ?,
                @BeratReinforced = ?,
                @StandartWA = ?,
                @StandartWE = ?,
                @StandartElgWA = ?,
                @StandartElgWE = ?,
                @IdQC = ?', [
                        2,
                        $Ukuran,
                        $Potongan,
                        $BeratSTD,
                        $Berat,
                        $UserInput,
                        $StWarp,
                        $ElgWarp,
                        $StWeft,
                        $ElgWeft,
                        $StReinforced,
                        $ElgReinforced,
                        $BeratReinforced,
                        $StandartWA,
                        $StandartWE,
                        $StandartElgWA,
                        $StandartElgWE,
                        $Id_QC
                    ]);
                return response()->json(['success' => 'Data sudah diKOREKSI'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diKOREKSI: ' . $e->getMessage()], 500);
            }
        }
    }

    public function destroy($id, Request $request)
    {
        if ($id == 'hapusData') {
            $Id_QC = $request->input('Id_QC');

            try {
                DB::connection('ConnCircular')
                    ->statement('exec [SP_1273_QC_MAINT_QC]
                        @Kode = ?,
                        @IdQC = ?', [
                        3,
                        $Id_QC,
                    ]);
                return response()->json(['success' => 'Data sudah diHAPUS'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }

    }
}
