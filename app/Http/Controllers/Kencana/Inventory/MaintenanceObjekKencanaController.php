<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class MaintenanceObjekKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Inventory.MaintenanceObjek', compact('access'));
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

        #region divisi
        if ($id == 'getUserDivisi') {
            $UserInput = trim(Auth::user()->NomorUser);
            $listUserDivisi = DB::connection('ConnKCNInventory')
                ->select(
                    'exec SP_1003_INV_userdivisi @XKdUser = ?',
                    [$UserInput]
                );

            $userDivisiArr = [];

            foreach ($listUserDivisi as $userDivisi) {

                // Hanya Kencana
                if (in_array(strtoupper(trim($userDivisi->IdDivisi)), ['WKC', 'KCC'])) {
                    $userDivisiArr[] = [
                        'IdDivisi' => $userDivisi->IdDivisi,
                        'NamaDivisi' => $userDivisi->NamaDivisi,
                    ];
                }
            }

            return datatables($userDivisiArr)->make(true);
        }

        #region ambil counter
        else if ($id == 'ambilCounter') {
            $listPerkiraanConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_List_Counter]');
            $PerkiraanArr = [];
            foreach ($listPerkiraanConn as $listPerkiraan) {
                $PerkiraanArr[] = [
                    'IdObjek' => str_pad($listPerkiraan->IdObjek + 1, 3, '0', STR_PAD_LEFT),
                    'IdKelUtama' => str_pad($listPerkiraan->IdKelompokUtama + 1, 4, '0', STR_PAD_LEFT),
                    'IdKelompok' => str_pad($listPerkiraan->IdKelompok + 1, 6, '0', STR_PAD_LEFT),
                    'IdSubKelompok' => str_pad($listPerkiraan->IdSubKelompok + 1, 6, '0', STR_PAD_LEFT),
                ];
            }
            return response()->json($PerkiraanArr);
        }

        #region objek
        else if ($id == 'getObjek') {

            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);

            $XIdDivisi = $request->input('idDivisi');

            $listObjekConn = DB::connection('ConnKCNInventory')
                ->select('exec SP_1003_INV_User_Objek @XKdUser= ?, @XIdDivisi = ?', [$UserInput, $XIdDivisi]);
            $listObjekArr = [];
            foreach ($listObjekConn as $userObjek) {
                $listObjekArr[] = [
                    'IdObjek' => $userObjek->IdObjek,
                    'NamaObjek' => $userObjek->NamaObjek,
                ];
            }
            return datatables($listObjekArr)->make(true);
        }
        // cek objek
        else if ($id == 'cekObjek') {
            $IdDivisi = $request->input('IdDivisi');
            $objek = $request->input('objek');

            $listPerkiraanConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_CEK_NAMA_OBJEK] @IdDivisi = ?, @objek = ?', [$IdDivisi, $objek]);
            $PerkiraanArr = [];
            foreach ($listPerkiraanConn as $listPerkiraan) {
                $PerkiraanArr[] = [
                    'ada' => $listPerkiraan->ada,
                ];
            }
            return response()->json($PerkiraanArr);
        }
        // update objek counter
        else if ($id == 'updateObjekCounter') {
            $XIdObjek = $request->input('XIdObjek');

            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec SP_1003_INV_Update_IdObjek_Counter @XIdObjek = ?', [$XIdObjek]);
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
        // insert objek
        else if ($id == 'insertObjek') {
            $XIdObjek = $request->input('XIdObjek');
            $XNamaObjek = $request->input('XNamaObjek');
            $XIdDivisi_Objek = $request->input('XIdDivisi_Objek');

            try {
                DB::connection('ConnKCNInventory')
                    ->statement(
                        'exec SP_1003_INV_Insert_Objek @XIdObjek = ?, @XNamaObjek = ?, @XIdDivisi_Objek = ?'
                        ,
                        [$XIdObjek, $XNamaObjek, $XIdDivisi_Objek]
                    );
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
        // update objek
        else if ($id == 'updateObjek') {
            $XIdObjek = $request->input('XIdObjek');
            $XNamaObjek = $request->input('XNamaObjek');
            $XIdDivisi_Objek = $request->input('XIdDivisi_Objek');

            try {
                DB::connection('ConnKCNInventory')
                    ->statement(
                        'exec SP_1003_INV_Update_Objek @XIdObjek = ?, @XNamaObjek = ?, @XIdDivisi_Objek = ?'
                        ,
                        [$XIdObjek, $XNamaObjek, $XIdDivisi_Objek]
                    );
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
        // delete objek
        else if ($id == 'deleteObjek') {
            $XIdObjek = $request->input('XIdObjek');
            $XIdDivisi_Objek = $request->input('XIdDivisi_Objek');

            try {
                DB::connection('ConnKCNInventory')
                    ->statement(
                        'exec SP_1003_INV_Delete_Objek @XIdObjek = ?, @XIdDivisi_Objek = ?'
                        ,
                        [$XIdObjek, $XIdDivisi_Objek]
                    );
                return response()->json(['success' => 'Objek berhasil diHAPUS'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Objek gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }

        #region kel utama
        else if ($id == 'getKelUtama') {
            $XIdObjek_KelompokUtama = $request->input('idObjek');

            $listKelUtamaConn = DB::connection('ConnKCNInventory')
                ->select('exec SP_1003_INV_IdObjek_KelompokUtama @XIdObjek_KelompokUtama = ?', [$XIdObjek_KelompokUtama]);
            $kelUtamaArr = [];
            foreach ($listKelUtamaConn as $listKelUtama) {
                $kelUtamaArr[] = [
                    'NamaKelompokUtama' => $listKelUtama->NamaKelompokUtama,
                    'IdKelompokUtama' => $listKelUtama->IdKelompokUtama,
                ];
            }
            return datatables($kelUtamaArr)->make(true);
        }
        // cek KelUtama
        else if ($id == 'cekKelUtama') {
            $IdObjek = $request->input('IdObjek');
            $kelut = $request->input('kelut');

            $listPerkiraanConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_CEK_NAMA_KELUT] @IdObjek = ?, @kelut = ?', [$IdObjek, $kelut]);
            $PerkiraanArr = [];
            foreach ($listPerkiraanConn as $listPerkiraan) {
                $PerkiraanArr[] = [
                    'ada' => $listPerkiraan->ada,
                ];
            }
            return response()->json($PerkiraanArr);
        }
        // update KelUtama counter
        else if ($id == 'updateKelUtamaCounter') {
            $XIdKelompokUtama = $request->input('XIdKelompokUtama');

            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec SP_1003_INV_Update_IdKelUt_Counter @XIdKelompokUtama = ?', [$XIdKelompokUtama]);
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
        // insert KelUtama
        else if ($id == 'insertKelUtama') {
            $XIdKelompokUtama = $request->input('XIdKelompokUtama');
            $XNamaKelompokUtama = $request->input('XNamaKelompokUtama');
            $XIdObjek_KelompokUtama = $request->input('XIdObjek_KelompokUtama');
            try {
                DB::connection('ConnKCNInventory')
                    ->statement(
                        'exec SP_1003_INV_Insert_KelompokUtama @XIdKelompokUtama = ?, @XNamaKelompokUtama = ?, @XIdObjek_KelompokUtama = ?'
                        ,
                        [$XIdKelompokUtama, $XNamaKelompokUtama, $XIdObjek_KelompokUtama]
                    );
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
        // update KelUtama
        else if ($id == 'updateKelUtama') {
            $XIdKelompokUtama = $request->input('XIdKelompokUtama');
            $XNamaKelompokUtama = $request->input('XNamaKelompokUtama');
            $XIdObjek_KelompokUtama = $request->input('XIdObjek_KelompokUtama');
            try {
                DB::connection('ConnKCNInventory')
                    ->statement(
                        'exec SP_1003_INV_Update_KelompokUtama @XIdKelompokUtama = ?, @XNamaKelompokUtama = ?, @XIdObjek_KelompokUtama = ?'
                        ,
                        [$XIdKelompokUtama, $XNamaKelompokUtama, $XIdObjek_KelompokUtama]
                    );
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
        // delete KelUtama
        else if ($id == 'deleteKelUtama') {
            $XIdKelompokUtama = $request->input('XIdKelompokUtama');
            $XIdObjek_KelompokUtama = $request->input('XIdObjek_KelompokUtama');
            try {
                DB::connection('ConnKCNInventory')
                    ->statement(
                        'exec SP_1003_INV_Delete_KelompokUtama @XIdKelompokUtama = ?, @XIdObjek_KelompokUtama = ?'
                        ,
                        [$XIdKelompokUtama, $XIdObjek_KelompokUtama]
                    );
                return response()->json(['success' => 'Kelompok Utama berhasil diHAPUS'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Kelompok Utama gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }
        // cek hapus Kel
        else if ($id == 'cekHapusKelompokUtama') {
            $XIdObjek_kelompokutama = $request->input('XIdObjek_kelompokutama');

            $listPerkiraanConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_idObjek_kelompokutama]
                @XIdObjek_kelompokutama = ?'
                    ,
                    [$XIdObjek_kelompokutama]
                );
            $PerkiraanArr = [];
            foreach ($listPerkiraanConn as $listPerkiraan) {
                $PerkiraanArr[] = [
                    'NamaKelompokUtama' => $listPerkiraan->NamaKelompokUtama,
                ];
            }
            return response()->json($PerkiraanArr);
        }

        #region kelompok
        else if ($id == 'getKel') {
            $XIdKelompokUtama_Kelompok = $request->input('idKelUtama');

            $listKelConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_IdKelompokUtama_Kelompok] @XIdKelompokUtama_Kelompok = ?', [$XIdKelompokUtama_Kelompok]);
            $kelArr = [];
            foreach ($listKelConn as $listKel) {
                $kelArr[] = [
                    'namakelompok' => $listKel->namakelompok,
                    'idkelompok' => $listKel->idkelompok,
                ];
            }
            return datatables($kelArr)->make(true);
        }
        // cek Kel
        else if ($id == 'cekKel') {
            $IdKelut = $request->input('IdKelut');
            $kelompok = $request->input('kelompok');

            $listPerkiraanConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_CEK_NAMA_KELOMPOK] @IdKelut = ?, @kelompok = ?', [$IdKelut, $kelompok]);
            $PerkiraanArr = [];
            foreach ($listPerkiraanConn as $listPerkiraan) {
                $PerkiraanArr[] = [
                    'ada' => $listPerkiraan->ada,
                ];
            }
            return response()->json($PerkiraanArr);
        }
        // update Kel counter
        else if ($id == 'updateKelCounter') {
            $XIdKelompok = $request->input('XIdKelompok');

            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec SP_1003_INV_Update_IdKelompok_Counter @XIdKelompok = ?', [$XIdKelompok]);
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
        // insert Kel
        else if ($id == 'insertKel') {
            $XIdKelompok = $request->input('XIdKelompok');
            $XNamaKelompok = $request->input('XNamaKelompok');
            $XIdKelompokUtama_Kelompok = $request->input('XIdKelompokUtama_Kelompok');
            try {
                DB::connection('ConnKCNInventory')
                    ->statement(
                        'exec SP_1003_INV_Insert_Kelompok @XIdKelompok = ?, @XNamaKelompok = ?, @XIdKelompokUtama_Kelompok = ?'
                        ,
                        [$XIdKelompok, $XNamaKelompok, $XIdKelompokUtama_Kelompok]
                    );
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
        // update Kel
        else if ($id == 'updateKel') {
            $XIdKelompok = $request->input('XIdKelompok');
            $XNamaKelompok = $request->input('XNamaKelompok');
            $XIdKelompokUtama_Kelompok = $request->input('XIdKelompokUtama_Kelompok');
            try {
                DB::connection('ConnKCNInventory')
                    ->statement(
                        'exec SP_1003_INV_Update_Kelompok @XIdKelompok = ?, @XNamaKelompok = ?, @XIdKelompokUtama_Kelompok = ?'
                        ,
                        [$XIdKelompok, $XNamaKelompok, $XIdKelompokUtama_Kelompok]
                    );
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
        // delete Kel
        else if ($id == 'deleteKel') {
            $XIdKelompok = $request->input('XIdKelompok');
            $XIdKelompokUtama_Kelompok = $request->input('XIdKelompokUtama_Kelompok');
            try {
                DB::connection('ConnKCNInventory')
                    ->statement(
                        'exec [SP_1003_INV_Delete_Kelompok]
                                @XIdKelompok = ?, @XIdKelompokUtama_Kelompok = ?'
                        ,
                        [$XIdKelompok, $XIdKelompokUtama_Kelompok]
                    );
                return response()->json(['success' => 'Kelompok berhasil diHAPUS'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Kelompok gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }
        // cek hapus Kel
        else if ($id == 'cekHapusKelompok') {
            $XIdkelompokutama_kelompok = $request->input('XIdkelompokutama_kelompok');

            $listPerkiraanConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_idkelompokutama_kelompok] @XIdkelompokutama_kelompok = ?', [$XIdkelompokutama_kelompok]);
            $PerkiraanArr = [];
            foreach ($listPerkiraanConn as $listPerkiraan) {
                $PerkiraanArr[] = [
                    'namakelompok' => $listPerkiraan->namakelompok,
                ];
            }
            return response()->json($PerkiraanArr);
        }

        #region sub kelompok
        else if ($id == 'getSubKel') {
            $XIdKelompok_SubKelompok = $request->input('idKel');

            $XIdKelompok_SubKelompok = $XIdKelompok_SubKelompok ?? '0';

            $listSubKelConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_IDKELOMPOK_SUBKELOMPOK] @XIdKelompok_SubKelompok = ?', [$XIdKelompok_SubKelompok]);
            $subKelArr = [];
            foreach ($listSubKelConn as $listSubKel) {
                $subKelArr[] = [
                    'NamaSubKelompok' => $listSubKel->NamaSubKelompok,
                    'IdSubkelompok' => $listSubKel->IdSubkelompok,
                ];
            }
            return datatables($subKelArr)->make(true);
        }
        // cek SubKel
        else if ($id == 'cekSubKel') {
            $IdKelp = $request->input('IdKelp');
            $subkel = $request->input('subkel');

            $listPerkiraanConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_CEK_NAMA_SUBKEL] @IdKelp = ?, @subkel = ?', [$IdKelp, $subkel]);
            $PerkiraanArr = [];
            foreach ($listPerkiraanConn as $listPerkiraan) {
                $PerkiraanArr[] = [
                    'ada' => $listPerkiraan->ada,
                ];
            }
            return response()->json($PerkiraanArr);
        }
        // update SubKel counter
        else if ($id == 'updateSubKelCounter') {
            $XIdSubKelompok = $request->input('XIdSubKelompok');

            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec SP_1003_INV_Update_IdSubKel_Counter @XIdSubKelompok = ?', [$XIdSubKelompok]);
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
        // insert Kel
        else if ($id == 'insertSubKel') {
            $XIdSubKelompok = $request->input('XIdSubKelompok');
            $XNamaSubKelompok = $request->input('XNamaSubKelompok');
            $XIdKelompok_SubKelompok = $request->input('XIdKelompokUtama_Kelompok');
            $XKodePerkiraan = $request->input('XKodePerkiraan');
            try {
                DB::connection('ConnKCNInventory')
                    ->statement(
                        'exec [SP_1003_INV_Insert_SubKelompok]
                        @XIdSubKelompok = ?, @XNamaSubKelompok = ?, @XIdKelompok_SubKelompok = ?, @XKodePerkiraan = ?'
                        ,
                        [$XIdSubKelompok, $XNamaSubKelompok, $XIdKelompok_SubKelompok, $XKodePerkiraan]
                    );
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
        // update subKel
        else if ($id == 'updateSubKel') {
            $XIdSubKelompok = $request->input('XIdSubKelompok');
            $XNamaSubKelompok = $request->input('XNamaSubKelompok');
            $XIdKelompok_SubKelompok = $request->input('XIdKelompok_SubKelompok');
            $XKodePerkiraan = $request->input('XKodePerkiraan');
            try {
                DB::connection('ConnKCNInventory')
                    ->statement(
                        'exec [SP_1003_INV_Update_SubKelompok]
                        @XIdSubKelompok = ?, @XNamaSubKelompok = ?, @XIdKelompok_SubKelompok = ?, @XKodePerkiraan = ?'
                        ,
                        [$XIdSubKelompok, $XNamaSubKelompok, $XIdKelompok_SubKelompok, $XKodePerkiraan]
                    );
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
        // delete subKel
        else if ($id == 'deleteSubKel') {
            $XIdSubKelompok = $request->input('XIdSubKelompok');
            $XIdKelompok_SubKelompok = $request->input('XIdKelompok_SubKelompok');
            try {
                DB::connection('ConnKCNInventory')
                    ->statement(
                        'exec [SP_1003_INV_Delete_SubKelompok]
                        @XIdSubKelompok = ?, @XIdKelompok_SubKelompok = ?'
                        ,
                        [$XIdSubKelompok, $XIdKelompok_SubKelompok]
                    );
                return response()->json(['success' => 'Subkelompok berhasil diHAPUS'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Subkelompok gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }
        // cek hapus SubKel
        else if ($id == 'cekHapusSubKelompok') {
            $XIdkelompok_subkelompok = $request->input('XIdkelompok_subkelompok');

            $listPerkiraanConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_idkelompok_subkelompok] @XIdkelompok_subkelompok = ?', [$XIdkelompok_subkelompok]);
            $PerkiraanArr = [];
            foreach ($listPerkiraanConn as $listPerkiraan) {
                $PerkiraanArr[] = [
                    'NamaSubKelompok' => $listPerkiraan->NamaSubKelompok,
                ];
            }
            return response()->json($PerkiraanArr);
        }

        #region id perkiraan
        else if ($id == 'getIdPerkiraan') {
            $XIdSubKelompok = $request->input('idSubKel');

            $listIdPerkiraanConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_IdSubKel_SubKelompok] @XIdSubKelompok = ?', [$XIdSubKelompok]);
            $idPerkiraanArr = [];
            foreach ($listIdPerkiraanConn as $listIdPerkiraan) {
                $idPerkiraanArr[] = [
                    'KodePerkiraan_Subkelompok' => $listIdPerkiraan->KodePerkiraan_Subkelompok,
                ];
            }
            return datatables($idPerkiraanArr)->make(true);
        }

        #region no kode perkiraan
        else if ($id == 'getNoKodePerkiraan') {
            $XNoKodePerkiraan = $request->input('idPerkiraan');

            $kodePerkiraanConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_NoKode_Perkiraan] @XNoKodePerkiraan = ?', [$XNoKodePerkiraan]);
            $kodePerkiraanArr = [];
            foreach ($kodePerkiraanConn as $listKodePerkiraan) {
                $kodePerkiraanArr[] = [
                    'Keterangan' => $listKodePerkiraan->Keterangan,
                ];
            }
            return datatables($kodePerkiraanArr)->make(true);
        }

        #region perkiraan
        else if ($id == 'getPerkiraan') {
            $listPerkiraanConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_list_perkiraan]');
            $PerkiraanArr = [];
            foreach ($listPerkiraanConn as $listPerkiraan) {
                $PerkiraanArr[] = [
                    'NoKodePerkiraan' => $listPerkiraan->NoKodePerkiraan,
                    'Keterangan' => $listPerkiraan->Keterangan,
                ];
            }
            return datatables($PerkiraanArr)->make(true);
        }
        // cek perkiraan
        else if ($id == 'cekPerkiraan') {
            $xketerangan = $request->input('xketerangan');
            $listPerkiraanConn = DB::connection('ConnKCNInventory')
                ->select('exec [SP_1003_INV_nama_perkiraan] @xketerangan = ?', [$xketerangan]);
            $PerkiraanArr = [];
            foreach ($listPerkiraanConn as $listPerkiraan) {
                $PerkiraanArr[] = [
                    'NoKodePerkiraan' => $listPerkiraan->NoKodePerkiraan,
                    'Keterangan' => $listPerkiraan->Keterangan,
                ];
            }
            return response()->json($PerkiraanArr);
        }

    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {

    }



    public function destroy($id)
    {
        //
    }
}
