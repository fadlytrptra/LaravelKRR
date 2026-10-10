<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class KartuStokKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Inventory.KartuStok', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        $user = Auth::user()->NomorUser;

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
            $XIdKelompok_SubKelompok = $request->input('kelompokId');

            $XIdKelompok_SubKelompok = $XIdKelompok_SubKelompok ?? '0';

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?', [$XIdKelompok_SubKelompok]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);
        }

        // get true subkel
        else if ($id === 'getDataTransaksiSubKelTrue') {
            $id_Subkel = $request->input('id_Subkel');
            $id_Kelompok = $request->input('id_Kelompok');
            $id_Kel_utama = $request->input('id_Kel_utama');
            $id_objek = $request->input('id_objek');
            $id_Divisi = $request->input('id_Divisi');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_INV_4372_List_SubKel_Stok
            @kode = ?, @id_Subkel = ?, @id_Kelompok = ?, @id_Kel_utama = ?, @id_objek = ?, @id_Divisi = ?',
                [1, $id_Subkel, $id_Kelompok, $id_Kel_utama, $id_objek, $id_Divisi]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'NamaType' => $detail_subkel->NamaType,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'sat_primer' => $detail_subkel->sat_primer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'sat_sekunder' => $detail_subkel->sat_sekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'sat_tritier' => $detail_subkel->sat_tritier,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok
                ];
            }
            return response()->json($data_subkel);
        }

        // get true kelompok
        else if ($id === 'getDataTransaksiKelompokTrue') {
            $id_Kelompok = $request->input('id_Kelompok');
            $id_Kel_utama = $request->input('id_Kel_utama');
            $id_objek = $request->input('id_objek');
            $id_Divisi = $request->input('id_Divisi');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_INV_4372_List_Kelompok_Stok
            @kode = ?, @id_Kelompok = ?, @id_Kel_utama = ?, @id_objek = ?, @id_Divisi = ?',
                [1, $id_Kelompok, $id_Kel_utama, $id_objek, $id_Divisi]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'NamaType' => $detail_subkel->NamaType,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'sat_primer' => $detail_subkel->sat_primer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'sat_sekunder' => $detail_subkel->sat_sekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'sat_tritier' => $detail_subkel->sat_tritier,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok
                ];
            }
            return response()->json($data_subkel);
        }

        // get true kelompok utama
        else if ($id === 'getDataTransaksiKelompokUtamaTrue') {
            $id_Kel_utama = $request->input('id_Kel_utama');
            $id_objek = $request->input('id_objek');
            $id_Divisi = $request->input('id_Divisi');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_INV_4372_List_KelUtama_Stok
            @kode = ?, @id_Kel_utama = ?, @id_objek = ?, @id_Divisi = ?',
                [1, $id_Kel_utama, $id_objek, $id_Divisi]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'NamaType' => $detail_subkel->NamaType,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'sat_primer' => $detail_subkel->sat_primer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'sat_sekunder' => $detail_subkel->sat_sekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'sat_tritier' => $detail_subkel->sat_tritier,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok
                ];
            }
            return response()->json($data_subkel);
        }

        // get true kelompok utama
        else if ($id === 'getDataTransaksiObjekTrue') {
            $id_objek = $request->input('id_objek');
            $id_Divisi = $request->input('id_Divisi');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_INV_4372_List_Objek_Stok
            @kode = ?, @id_objek = ?, @id_Divisi = ?',
                [1, $id_objek, $id_Divisi]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'NamaType' => $detail_subkel->NamaType,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'sat_primer' => $detail_subkel->sat_primer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'sat_sekunder' => $detail_subkel->sat_sekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'sat_tritier' => $detail_subkel->sat_tritier,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok
                ];
            }
            return response()->json($data_subkel);
        }

        // get False subkel
        else if ($id === 'getDataTransaksiSubKelFalse') {
            $id_Subkel = $request->input('id_Subkel');
            $id_Kelompok = $request->input('id_Kelompok');
            $id_Kel_utama = $request->input('id_Kel_utama');
            $id_objek = $request->input('id_objek');
            $id_Divisi = $request->input('id_Divisi');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_INV_4372_List_SubKel_Stok
            @id_Subkel = ?, @id_Kelompok = ?, @id_Kel_utama = ?, @id_objek = ?, @id_Divisi = ?',
                [$id_Subkel, $id_Kelompok, $id_Kel_utama, $id_objek, $id_Divisi]
            );
            // dd($subkel);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'NamaType' => $detail_subkel->NamaType,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'sat_primer' => $detail_subkel->sat_primer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'sat_sekunder' => $detail_subkel->sat_sekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'sat_tritier' => $detail_subkel->sat_tritier,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok
                ];
            }
            return response()->json($data_subkel);
        }

        // get False kelompok
        else if ($id === 'getDataTransaksiKelompokFalse') {
            $id_Kelompok = $request->input('id_Kelompok');
            $id_Kel_utama = $request->input('id_Kel_utama');
            $id_objek = $request->input('id_objek');
            $id_Divisi = $request->input('id_Divisi');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_INV_4372_List_Kelompok_Stok
            @id_Kelompok = ?, @id_Kel_utama = ?, @id_objek = ?, @id_Divisi = ?',
                [$id_Kelompok, $id_Kel_utama, $id_objek, $id_Divisi]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'NamaType' => $detail_subkel->NamaType,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'sat_primer' => $detail_subkel->sat_primer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'sat_sekunder' => $detail_subkel->sat_sekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'sat_tritier' => $detail_subkel->sat_tritier,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok
                ];
            }
            return response()->json($data_subkel);
        }

        // get False kelompok utama
        else if ($id === 'getDataTransaksiKelompokUtamaFalse') {
            $id_Kel_utama = $request->input('id_Kel_utama');
            $id_objek = $request->input('id_objek');
            $id_Divisi = $request->input('id_Divisi');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_INV_4372_List_KelUtama_Stok
            @id_Kel_utama = ?, @id_objek = ?, @id_Divisi = ?',
                [$id_Kel_utama, $id_objek, $id_Divisi]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'NamaType' => $detail_subkel->NamaType,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'sat_primer' => $detail_subkel->sat_primer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'sat_sekunder' => $detail_subkel->sat_sekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'sat_tritier' => $detail_subkel->sat_tritier,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok
                ];
            }
            return response()->json($data_subkel);
        }

        // get False kelompok utama
        else if ($id === 'getDataTransaksiObjekFalse') {
            $id_objek = $request->input('id_objek');
            $id_Divisi = $request->input('id_Divisi');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_INV_4372_List_Objek_Stok
            @id_objek = ?, @id_Divisi = ?',
                [$id_objek, $id_Divisi]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'NamaType' => $detail_subkel->NamaType,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'sat_primer' => $detail_subkel->sat_primer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'sat_sekunder' => $detail_subkel->sat_sekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'sat_tritier' => $detail_subkel->sat_tritier,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok
                ];
            }
            return response()->json($data_subkel);
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
    public function destroy(Request $request)
    {
        //
    }
}
