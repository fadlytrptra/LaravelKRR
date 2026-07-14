<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Exception;
use DB;

class MaintenanceMesinJBBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        $lokasi = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Mesin @XKode = ?', [5]);
        return view('JumboBag.Master.MaintenanceMesinJBB.MaintenanceMesinJBB', compact('access', 'lokasi'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $jenisStore = $request->input('jenisStore');
        $idMesin = $request->input('idMesin');
        $namaMesin = $request->input('namaMesin');
        $lokasi = $request->input('select_lokasiMesin');
        $typeMesin = $request->input('select_typeMesin');
        if ($jenisStore == 'store') {
            // Tambah Mesin
            try {
                DB::connection('ConnJumboBag')->statement('EXEC SP_4384_JBB_Maintenance_Mesin
                    @XKode = ?,
                    @XNamaMesin = ?,
                    @XIdLokasi = ?,
                    @XIdTypeMesin = ?',
                    [
                        2,
                        $namaMesin,
                        $lokasi,
                        $typeMesin
                    ]
                );
                return response()->json(['success' => 'Data mesin berhasil ditambahkan.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($jenisStore == 'update') {
            // Edit Mesin
            try {
                DB::connection('ConnJumboBag')->statement('EXEC SP_4384_JBB_Maintenance_Mesin
                    @XKode = ?,
                    @XNamaMesin = ?,
                    @XIdLokasi = ?,
                    @XIdMesin = ?,
                    @XIdTypeMesin = ?',
                    [
                        3,
                        $namaMesin,
                        $lokasi,
                        $idMesin,
                        $typeMesin
                    ]
                );
                return response()->json(['success' => 'Data mesin berhasil diubah.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($jenisStore == 'storeTypeMesin') {
            // Tambah Type Mesin
            $nama_type_mesin = $request->input('nama_type_mesin');
            try {
                DB::connection('ConnJumboBag')->statement('EXEC SP_4384_JBB_Maintenance_Mesin
                    @XKode = ?,
                    @XNamaTypeMesin = ?',
                    [
                        7,
                        $nama_type_mesin
                    ]
                );
                return response()->json(['success' => 'Data type mesin berhasil ditambahkan.', 'nama_type_mesin' => $nama_type_mesin]);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $jenisStore]);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDataMesin') {
            $listMesin = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Mesin @XKode = ?', [0]);
            return datatables($listMesin)->make(true);
        } else if ($id == 'getDetailMesin') {
            $idMesin = $request->input('idMesin');
            $detailMesin = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Mesin @XKode = ?, @XIdMesin = ?', [1, $idMesin]);
            return response()->json($detailMesin);
        } else if ($id == 'getTypeMesin') {
            $typeMesin = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Mesin @XKode = ?', [6]);
            return response()->json($typeMesin);
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

    public function destroy($id, Request $request)
    {
        $aktif = $request->input('aktif') ? 1 : 0;
        try {
            DB::connection('ConnJumboBag')->statement('EXEC SP_4384_JBB_Maintenance_Mesin
                @XKode = ?,
                @XAktif = ?,
                @XIdMesin = ?',
                [
                    4,
                    $aktif,
                    $id
                ]
            );
            return response()->json(['success' => 'Status mesin berhasil diubah.']);
        } catch (Exception $e) {
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
        }
    }
}
