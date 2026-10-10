<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class AccPemberiBarangKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Inventory.AccPemberiBarang', compact('access'));
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

        // get user id
        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        }

        // get divisi
        else if ($id === 'getDivisi') {
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
        }

        // get acc
        else if ($id === 'getAcc') {
            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_List_BelumACC_TmpTransaksi
            @Kode = ?, @XIdTypeTransaksi = ?, @XIdObjek = ?', [3, '02', $request->input('XIdObjek')]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'IdTransaksi' => $detail_objek->IdTransaksi,
                    'NamaType' => $detail_objek->NamaType,
                    'UraianDetailTransaksi' => $detail_objek->UraianDetailTransaksi,
                    'NamaDivisi' => $detail_objek->NamaDivisi,
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'NamaKelompokUtama' => $detail_objek->NamaKelompokUtama,
                    'NamaKelompok' => $detail_objek->NamaKelompok,
                    'NamaSubKelompok' => $detail_objek->NamaSubKelompok,
                    'user' => $detail_objek->NamaUser,
                    'JumlahPengeluaranPrimer' => $detail_objek->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_objek->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_objek->JumlahPengeluaranTritier,
                    'KomfirmasiPenerima' => $detail_objek->KomfirmasiPenerima,
                ];
            }
            return response()->json($data_objek);

        }

        // get batakl acc
        else if ($id === 'getBatalAcc') {
            $XIdObjek = $request->input('XIdObjek');
            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_List_SudahACC_TmpTransaksi
            @Kode = ?, @XIdTypeTransaksi = ?, @XIdObjek = ?', [1, '02', $XIdObjek]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'IdTransaksi' => $detail_objek->IdTransaksi,
                    'NamaType' => $detail_objek->NamaType,
                    'UraianDetailTransaksi' => $detail_objek->UraianDetailTransaksi,
                    'NamaDivisi' => $detail_objek->NamaDivisi,
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'NamaKelompokUtama' => $detail_objek->NamaKelompokUtama,
                    'NamaKelompok' => $detail_objek->NamaKelompok,
                    'NamaSubKelompok' => $detail_objek->NamaSubKelompok,
                    'user' => $detail_objek->IdPenerima,
                    'JumlahPengeluaranPrimer' => $detail_objek->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_objek->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_objek->JumlahPengeluaranTritier,
                    'KomfirmasiPenerima' => $detail_objek->KomfirmasiPenerima,
                ];
            }
            return response()->json($data_objek);

        }

        // get batakl acc
        else if ($id === 'tampilItem') {
            $XIdTransaksi = $request->input('XIdTransaksi');
            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_AsalSubKelompok_TmpTransaksi
            @XIdTransaksi = ?', [$XIdTransaksi]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaDivisi' => $detail_objek->NamaDivisi,
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'NamaKelompokUtama' => $detail_objek->NamaKelompokUtama,
                    'NamaKelompok' => $detail_objek->NamaKelompok,
                    'NamaSubKelompok' => $detail_objek->NamaSubKelompok,
                    'Satuan_Primer' => $detail_objek->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_objek->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_objek->Satuan_Tritier,
                ];
            }
            return response()->json($data_objek);

        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $user = Auth::user()->NomorUser;

        // acc
        if ($id == 'acc') {
            $listTransaksi = $request->input('listTransaksi');

            try {
                foreach ($listTransaksi as $transaksi) {
                    DB::connection('ConnKCNInventory')
                        ->statement('exec [SP_1003_INV_Update_ACCManager_TmpTransaksi]
                        @UserACC = ?,
                        @Kode = ?,
                        @YIdTransaksi = ?', [
                            $user,
                            4,
                            $transaksi,
                        ]);
                }
                return response()->json(['success' => 'Data Sudah Disimpan !!..'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // batal acc
        else if ($id == 'batal') {
            $listTransaksi = $request->input('listTransaksi');

            try {
                foreach ($listTransaksi as $transaksi) {
                    DB::connection('ConnKCNInventory')
                        ->statement('exec [SP_1003_INV_Batal_ACCManager_TmpTransaksi]
                        @Kode = ?,
                        @YIdTransaksi = ?', [
                            1,
                            $transaksi,
                        ]);
                }
                return response()->json(['success' => 'Pembatalan Acc Telah Terproses !!..'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Pembatalan Acc gagal.' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        //
    }
}
