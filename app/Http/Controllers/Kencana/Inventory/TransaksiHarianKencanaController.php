<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class TransaksiHarianKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana'); //tidak perlu menu di navbar
        return view('Kencana.Inventory.TransaksiHarian', compact('access'));
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

        // bulan
        else if ($id === 'getBulan') {
            $divisi = DB::connection('ConnKCNInventory')->select('exec [SP_LIST_BULAN]');
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Bulan' => $detail_divisi->Bulan,
                    'Id_Bln' => $detail_divisi->Id_Bln,
                ];
            }
            return datatables($divisi)->make(true);

            // mendapatkan daftar objek
        }

        // transaksi bulanan full data
        else if ($id === 'getTransaksiHarian4Data') {
            $XIdSubKelompok = $request->input('XIdSubKelompok');
            $tanggal = $request->input('tanggal');

            $divisi = DB::connection('ConnKCNInventory')->select('exec [SP_1003_INV_Transaksi_Harian]
            @XIdSubKelompok = ?, @tanggal = ?', [$XIdSubKelompok, $tanggal]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'AwalTrans' => $detail_divisi->AwalTrans,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'TypeTransaksi' => $detail_divisi->TypeTransaksi,
                    'IdType' => $detail_divisi->IdType,
                    'NamaType' => $detail_divisi->NamaType,
                    'JumlahPemasukanPrimer' => $detail_divisi->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_divisi->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_divisi->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $detail_divisi->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_divisi->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_divisi->JumlahPengeluaranTritier,
                    'SaatLog' => $detail_divisi->SaatLog,
                    'IdSubkelompok' => $detail_divisi->IdSubkelompok,
                ];
            }

            return response()->json($data_divisi);
        }

        // transaksi bulanan kelompok
        else if ($id === 'getTransaksiHarianKelompok') {
            $IdKel = $request->input('IdKel');
            $tanggal = $request->input('tanggal');

            $divisi = DB::connection('ConnKCNInventory')->select('exec [SP_1003_INV_List_Trans_Hari_Kel]
            @IdKel = ?, @tanggal = ?', [$IdKel, $tanggal]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'AwalTrans' => $detail_divisi->AwalTrans,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'TypeTransaksi' => $detail_divisi->TypeTransaksi,
                    'IdType' => $detail_divisi->IdType,
                    'NamaType' => $detail_divisi->NamaType,
                    'JumlahPemasukanPrimer' => $detail_divisi->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_divisi->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_divisi->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $detail_divisi->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_divisi->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_divisi->JumlahPengeluaranTritier,
                    'SaatLog' => $detail_divisi->Saatlog,
                ];
            }

            return response()->json($data_divisi);
        }

        // transaksi bulanan kel utama
        else if ($id === 'getTransaksiHarianKelut') {
            $IdKelut = $request->input('IdKelut');
            $tanggal = $request->input('tanggal');

            $divisi = DB::connection('ConnKCNInventory')->select('exec [SP_1003_INV_List_Trans_Hari_Kelut]
            @IdKelUt = ?, @tanggal = ?', [$IdKelut, $tanggal]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'AwalTrans' => $detail_divisi->AwalTrans,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'TypeTransaksi' => $detail_divisi->TypeTransaksi,
                    'IdType' => $detail_divisi->IdType,
                    'NamaType' => $detail_divisi->NamaType,
                    'JumlahPemasukanPrimer' => $detail_divisi->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_divisi->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_divisi->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $detail_divisi->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_divisi->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_divisi->JumlahPengeluaranTritier,
                    'SaatLog' => $detail_divisi->Saatlog,
                ];
            }

            return response()->json($data_divisi);
        }

        // transaksi bulanan kelompok
        else if ($id === 'getTransaksiHarianObjek') {
            $IdObjek = $request->input('IdObjek');
            $tanggal = $request->input('tanggal');

            $divisi = DB::connection('ConnKCNInventory')->select('exec [SP_1003_INV_List_Trans_Hari_Objek]
            @IdObjek = ?, @tanggal = ?', [$IdObjek, $tanggal]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'AwalTrans' => $detail_divisi->AwalTrans,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'TypeTransaksi' => $detail_divisi->TypeTransaksi,
                    'IdType' => $detail_divisi->IdType,
                    'NamaType' => $detail_divisi->NamaType,
                    'JumlahPemasukanPrimer' => $detail_divisi->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_divisi->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_divisi->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $detail_divisi->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_divisi->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_divisi->JumlahPengeluaranTritier,
                    'SaatLog' => $detail_divisi->Saatlog,
                ];
            }

            return response()->json($data_divisi);
        }

        // transaksi bulanan full data
        else if ($id === 'getSaldo') {
            $IdType = $request->input('IdType');

            $divisi = DB::connection('ConnKCNInventory')->select('exec [SP_1003_INV_Saldo_Barang]
            @IdType = ?', [$IdType]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'SaldoPrimer' => $detail_divisi->SaldoPrimer,
                    'SaldoSekunder' => $detail_divisi->SaldoSekunder,
                    'SaldoTritier' => $detail_divisi->SaldoTritier,
                    'SatPrimer' => $detail_divisi->SatPrimer,
                    'SatSekunder' => $detail_divisi->SatSekunder,
                    'SatTritier' => $detail_divisi->SatTritier,
                ];
            }

            return response()->json($data_divisi);
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

    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        //
    }
}
