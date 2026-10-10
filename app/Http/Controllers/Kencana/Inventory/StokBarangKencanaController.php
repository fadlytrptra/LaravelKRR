<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class StokBarangKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana'); //tidak perlu menu di navbar
        return view('Kencana.Inventory.StokBarang', compact('access'));
    }

    public function show($id, Request $request)
    {
        $user = Auth::user()->NomorUser;
        // mendapatkan daftar divisi
        if ($id === 'getDivisi') {
            $divisi = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_userdivisi @XKdUser = ?', [$user]);
            // $data_divisi = [];
            // foreach ($divisi as $detail_divisi) {
            //     $data_divisi[] = [
            //         'NamaDivisi' => $detail_divisi->NamaDivisi,
            //         'IdDivisi' => $detail_divisi->IdDivisi,
            //         'KodeUser' => $detail_divisi->KodeUser
            //     ];
            // }

            // divisi kencana saja
            $divisi = collect($divisi)
            ->filter(function ($item) {
                return in_array(strtoupper(trim($item->IdDivisi)), ['WKC', 'KCC']);
            })
            ->values();
            return datatables($divisi)->make(true);

            // mendapatkan daftar objek
        } else if ($id === 'getObjek') {
            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$user, $request->input('divisi')]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'IdObjek' => $detail_objek->IdObjek,
                    'IdDivisi' => $detail_objek->IdDivisi
                ];
            }
            return datatables($objek)->make(true);

            // mendapatkan daftar kelompok utama
        } else if ($id === 'getKelUt') {
            $kelut = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama @XIdObjek_KelompokUtama = ?', [$request->input('objekId')]);
            $data_kelut = [];
            foreach ($kelut as $detail_kelut) {
                $data_kelut[] = [
                    'NamaKelompokUtama' => $detail_kelut->NamaKelompokUtama,
                    'IdKelompokUtama' => $detail_kelut->IdKelompokUtama
                ];
            }
            return datatables($kelut)->make(true);

            // mendapatkan daftar kelompok
        } else if ($id === 'getKelompok') {
            $kelompok = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok @XIdKelompokUtama_Kelompok = ?', [$request->input('kelutId')]);
            $data_kelompok = [];
            foreach ($kelompok as $detail_kelompok) {
                $data_kelompok[] = [
                    'idkelompok' => $detail_kelompok->idkelompok,
                    'namakelompok' => $detail_kelompok->namakelompok
                ];
            }
            return datatables($kelompok)->make(true);

            // mendapatkan daftar sub kelompok
        } else if ($id === 'getSubkel') {
            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?', [$request->input('kelompokId')]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);
        }

        // ambil id type dan nama type
        else if ($id === 'getIdType') {
            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_idsubkelompok_type
            @XIdSubKelompok_Type = ?', [$request->input('XIdSubKelompok_Type')]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'NamaType' => $detail_subkel->NamaType
                ];
            }
            return datatables($subkel)->make(true);
        }

        // ambil id berat tritier sekunder primer
        else if ($id === 'getBerat') {
            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_NamaType_Type
            @IdType = ?, @IdSubKel = ?', [$request->input('IdType'), $request->input('IdSubKel')]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'satuan_primer' => $detail_subkel->satuan_primer,
                    'satuan_sekunder' => $detail_subkel->satuan_sekunder,
                    'satuan_tritier' => $detail_subkel->satuan_tritier,
                    'MinimumStock' => $detail_subkel->MinimumStock,
                    'MaximumStock' => $detail_subkel->MaximumStock,
                ];
            }
            return datatables($subkel)->make(true);
        }


    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    public function store(Request $request)
    {

    }

    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        if ($id == 'updateMaxStock') {
            $XIdType = $request->input('XIdType');
            $XIdSubKelompok = $request->input('XIdSubKelompok');
            $XMinStok = $request->input('XMinStok');
            $XMaxStok = $request->input('XMaxStok');

            try {
                $coba = DB::connection('ConnKCNInventory')->statement('exec SP_1003_INV_update_maximum_stok
                @XIdType = ?, @XIdSubKelompok = ?, @XMinStok = ?, @XMaxStok = ?',
                    [$XIdType, $XIdSubKelompok, $XMinStok, $XMaxStok]
                );

                return response()->json(['success' => 'Berhasil update data.'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Gagal update data: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {

    }
}
