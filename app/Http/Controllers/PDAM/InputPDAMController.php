<?php

namespace App\Http\Controllers\PDAM;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Exception;
use Carbon\Carbon;
use function PHPUnit\Framework\isEmpty;


class InputPDAMController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('PDAM');
        $idUser = Auth::user()->IDUser;
        $nomorUser = trim(Auth::user()->NomorUser);
        $sumberModal = DB::connection('ConnUtility')->select('EXEC SP_4384_PDAM_Maintenance_Sumber_Air @XKode = ?, @XIdUser = ?', [5, $idUser]);
        $lokasi = DB::connection('ConnEDP')->select('EXEC SP_4451_EDP_MaintenanceLokasi @kode = ?, @idUser = ?', [4, $idUser]);
        $isAdminPDAM = DB::connection('ConnEDP')->select('EXEC SP_4451_EDP_MaintenanceLokasi @kode = ?, @idUser = ?', [9, $idUser]);
        return view('PDAM.Master.InputPDAM.IndexInputPDAM', compact('access', 'sumberModal', 'lokasi', 'nomorUser', 'isAdminPDAM'));
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $jenisStore = $request->input('jenisStore');
        $tanggalDataPDAM = $request->tanggalDataPDAM;
        $file = $request->file('foto')[0];
        $content = file_get_contents($file->getRealPath());
        $base64 = base64_encode($content);
        $sumberAir = $request->sumberAir;
        $counterSaatIni = $request->counterSaatIni;
        $counterPemakaian = $request->counterPemakaian;
        $keterangan = $request->keterangan;
        $idDataPDAM = $request->idDataPDAM;
        $user = trim(Auth::user()->NomorUser);
        if ($jenisStore == 'store') {
            // Tambah Data PDAM
            try {
                //check duplicate date
                $checkDuplicateDate = DB::connection('ConnUtility')->select('EXEC SP_4384_PDAM_Maintenance_Data_PDAM
                    @XKode = ?,
                    @XIdSumberAir = ?,
                    @XTanggal = ?',
                    [
                        6,
                        $sumberAir,
                        $tanggalDataPDAM
                    ]
                );
                if (empty($checkDuplicateDate)) {
                    DB::connection('ConnUtility')->statement('EXEC SP_4384_PDAM_Maintenance_Data_PDAM
                    @XKode = ?,
                    @XTanggal = ?,
                    @XIdSumberAir = ?,
                    @XKeterangan = ?,
                    @XCounter = ?,
                    @XPemakaian = ?,
                    @XFoto = ?,
                    @XUser = ?',
                        [
                            3,
                            $tanggalDataPDAM,
                            $sumberAir,
                            $keterangan,
                            $counterSaatIni,
                            $counterPemakaian,
                            $base64,
                            $user
                        ]
                    );
                    return response()->json(['success' => 'Data sumber air berhasil ditambahkan.']);
                } else {
                    return response()->json(['error' => (string) "Sudah ada data yang diinput untuk tanggal tersebut."]);
                }
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($jenisStore == 'update') {
            // Edit Data PDAM
            $checkDate = Carbon::parse($tanggalDataPDAM)->addDay();
            try {
                $dataPDAMSetelah = DB::connection('ConnUtility')->select('EXEC SP_4384_PDAM_Maintenance_Data_PDAM
                    @XKode = ?,
                    @XIdSumberAir = ?,
                    @XCheckDate = ?',
                    [
                        7,
                        $sumberAir,
                        $checkDate
                    ]
                );
                if (!empty($dataPDAMSetelah)) {
                    $intNewPemakaian = (int) $dataPDAMSetelah[0]->Counter - (int) $counterSaatIni;
                    $newPemakaian = str_pad((string) $intNewPemakaian, 7, "0", STR_PAD_LEFT);
                    DB::connection('ConnUtility')->statement('EXEC SP_4384_PDAM_Maintenance_Data_PDAM
                    @XKode = ?,
                    @XTanggal = ?,
                    @XIdSumberAir = ?,
                    @XKeterangan = ?,
                    @XCounter = ?,
                    @XPemakaian = ?,
                    @XFoto = ?,
                    @XUser = ?,
                    @XIdPdam = ?',
                        [
                            4,
                            $dataPDAMSetelah[0]->Tanggal,
                            $sumberAir,
                            $dataPDAMSetelah[0]->Keterangan,
                            $dataPDAMSetelah[0]->Counter,
                            $newPemakaian,
                            $dataPDAMSetelah[0]->Foto,
                            $user,
                            $dataPDAMSetelah[0]->IdPdam,
                        ]
                    );
                }
                DB::connection('ConnUtility')->statement('EXEC SP_4384_PDAM_Maintenance_Data_PDAM
                    @XKode = ?,
                    @XTanggal = ?,
                    @XIdSumberAir = ?,
                    @XKeterangan = ?,
                    @XCounter = ?,
                    @XPemakaian = ?,
                    @XFoto = ?,
                    @XUser = ?,
                    @XIdPdam = ?',
                    [
                        4,
                        $tanggalDataPDAM,
                        $sumberAir,
                        $keterangan,
                        $counterSaatIni,
                        $counterPemakaian,
                        $base64,
                        $user,
                        $idDataPDAM,
                    ]
                );
                return response()->json(['success' => 'Data sumber air berhasil diubah.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDataPDAM') {
            $idUser = Auth::user()->IDUser;
            $listDataPDAM = DB::connection('ConnUtility')->select('EXEC SP_4384_PDAM_Maintenance_Data_PDAM @XKode = ?, @XIdUser = ?', [0, $idUser]);
            return datatables($listDataPDAM)->make(true);
        } else if ($id == 'getDataCounterSebelumnya') {
            $idSumberAir = $request->idSumberAir;
            $idDataPDAM = $request->idDataPDAM ?? NULL;
            // dd($idSumberAir, $idDataPDAM);
            $dataCounterTerakhir = DB::connection('ConnUtility')->select('EXEC SP_4384_PDAM_Maintenance_Data_PDAM @XKode = ?, @XIdSumberAir = ?, @XIdPdam = ?', [1, $idSumberAir, $idDataPDAM]);
            return datatables($dataCounterTerakhir)->make(true);
        } else if ($id == 'getDetailDataPDAM') {
            $idDataPDAM = $request->idDataPDAM;
            $detailDataPDAM = DB::connection('ConnUtility')->select('EXEC SP_4384_PDAM_Maintenance_Data_PDAM @XKode = ?, @XIdPdam = ?', [2, $idDataPDAM]);
            return datatables($detailDataPDAM)->make(true);
        } else if ($id == 'getDetailDataPDAMCounterSebelumnya') {
            $idSumberAir = $request->idSumberAir;
            $idDataPDAM = $request->idDataPDAM ?? NULL;
            $dataCounterTerakhir = DB::connection('ConnUtility')->select('EXEC SP_4384_PDAM_Maintenance_Data_PDAM @XKode = ?, @XIdSumberAir = ?, @XIdPdam = ?', [8, $idSumberAir, $idDataPDAM]);
            return datatables($dataCounterTerakhir)->make(true);
        } else if ($id == 'getDataSumberAir') {
            $idLokasi = $request->idLokasi;
            $dataSumberAir = DB::connection('ConnUtility')->select('EXEC SP_4384_PDAM_Maintenance_Sumber_Air @XKode = ?, @XLokasi = ?', [6, $idLokasi]);
            return response()->json($dataSumberAir);
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $id]);
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
        $user = trim(Auth::user()->NomorUser);
        try {
            DB::connection('ConnUtility')->statement('EXEC SP_4384_PDAM_Maintenance_Data_PDAM
                @XKode = ?,
                @XIdPdam = ?,
                @XUser = ?',
                [
                    5,
                    $id,
                    $user
                ]
            );
            return response()->json(['success' => 'Data PDAM berhasil dihapus.']);
        } catch (Exception $e) {
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
        }
    }
}
