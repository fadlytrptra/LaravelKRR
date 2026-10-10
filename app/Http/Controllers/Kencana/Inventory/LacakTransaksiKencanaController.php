<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class LacakTransaksiKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {

        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana'); //tidak perlu menu di navbar
        return view('Kencana.Inventory.LacakTransaksi', compact('access'));
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

        // Lacak by divisi
        else if ($id === 'lacakDivisi') {
            $Status = $request->input('Status');
            $IdTypeTransaksi = $request->input('IdTypeTransaksi');
            $Tanggal = $request->input('Tanggal');
            $IdDivisi = $request->input('IdDivisi');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Lacak_TmpTransaksi
            @Kode = ?, @Status = ?, @IdTypeTransaksi = ?, @Tanggal = ?, @IdDivisi = ?',
                [1, $Status, $IdTypeTransaksi, $Tanggal, $IdDivisi]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'idtransaksi' => $detail_subkel->idtransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'nmpenerima' => $detail_subkel->nmpenerima,
                    'ACCPenerima' => $detail_subkel->ACCPenerima,
                    'ACCPemberi' => $detail_subkel->ACCPemberi,
                    'nmpemberi' => $detail_subkel->nmpemberi,
                    'jumlahpengeluaranprimer' => $detail_subkel->jumlahpengeluaranprimer,
                    'jumlahpengeluaransekunder' => $detail_subkel->jumlahpengeluaransekunder,
                    'jumlahpengeluarantritier' => $detail_subkel->jumlahpengeluarantritier,
                ];
            }
            return response()->json($data_subkel);
        }

        // Lacak by objek
        else if ($id === 'lacakObjek') {
            $Status = $request->input('Status');
            $IdTypeTransaksi = $request->input('IdTypeTransaksi');
            $Tanggal = $request->input('Tanggal');
            $IdDivisi = $request->input('IdDivisi');
            $Idobjek = $request->input('Idobjek');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Lacak_TmpTransaksi
            @Kode = ?, @Status = ?, @IdTypeTransaksi = ?, @Tanggal = ?, @IdDivisi = ?, @Idobjek = ?',
                [2, $Status, $IdTypeTransaksi, $Tanggal, $IdDivisi, $Idobjek]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'idtransaksi' => $detail_subkel->idtransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'nmpenerima' => $detail_subkel->nmpenerima,
                    'ACCPenerima' => $detail_subkel->ACCPenerima,
                    'ACCPemberi' => $detail_subkel->ACCPemberi,
                    'nmpemberi' => $detail_subkel->nmpemberi,
                    'jumlahpengeluaranprimer' => $detail_subkel->jumlahpengeluaranprimer,
                    'jumlahpengeluaransekunder' => $detail_subkel->jumlahpengeluaransekunder,
                    'jumlahpengeluarantritier' => $detail_subkel->jumlahpengeluarantritier,
                ];
            }
            return response()->json($data_subkel);
        }

        // Lacak by kel ut
        else if ($id === 'lacakKelUt') {
            $Status = $request->input('Status');
            $IdTypeTransaksi = $request->input('IdTypeTransaksi');
            $Tanggal = $request->input('Tanggal');
            $IdDivisi = $request->input('IdDivisi');
            $Idobjek = $request->input('Idobjek');
            $Idkelutama = $request->input('Idkelutama');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Lacak_TmpTransaksi
            @Kode = ?, @Status = ?, @IdTypeTransaksi = ?, @Tanggal = ?, @IdDivisi = ?, @Idobjek = ?, @Idkelutama = ?',
                [3, $Status, $IdTypeTransaksi, $Tanggal, $IdDivisi, $Idobjek, $Idkelutama]
            );
            $data_subkel = [];

            if ($Status == 1) {
                foreach ($subkel as $detail_subkel) {
                    $data_subkel[] = [
                        'idtransaksi' => $detail_subkel->idtransaksi,
                        'NamaType' => $detail_subkel->NamaType,
                        'nmpenerima' => $detail_subkel->nmpenerima,
                        'ACCPenerima' => $detail_subkel->ACCPenerima,
                        'ACCPemberi' => $detail_subkel->ACCPemberi,
                        'nmpemberi' => $detail_subkel->nmpemberi,
                        'jumlahpengeluaranprimer' => $detail_subkel->jumlahpengeluaranprimer,
                        'jumlahpengeluaransekunder' => $detail_subkel->jumlahpengeluaransekunder,
                        'jumlahpengeluarantritier' => $detail_subkel->jumlahpengeluarantritier,
                    ];
                }
            } else {
                foreach ($subkel as $detail_subkel) {
                    $data_subkel[] = [
                        'idtransaksi' => $detail_subkel->IdTransaksi,
                        'NamaType' => $detail_subkel->NamaType,
                        'nmpenerima' => $detail_subkel->NmPenerima,
                        'ACCPenerima' => $detail_subkel->ACCPenerima,
                        'ACCPemberi' => $detail_subkel->ACCPemberi,
                        'nmpemberi' => $detail_subkel->NmPemberi,
                        'jumlahpengeluaranprimer' => $detail_subkel->JumlahPengeluaranPrimer,
                        'jumlahpengeluaransekunder' => $detail_subkel->JumlahPengeluaranSekunder,
                        'jumlahpengeluarantritier' => $detail_subkel->JumlahPengeluaranTritier,
                    ];
                }
            }
            return response()->json($data_subkel);
        }

        // Lacak by kel ut
        else if ($id === 'lacakKelompok') {
            $Status = $request->input('Status');
            $IdTypeTransaksi = $request->input('IdTypeTransaksi');
            $Tanggal = $request->input('Tanggal');
            $IdDivisi = $request->input('IdDivisi');
            $Idobjek = $request->input('Idobjek');
            $Idkelutama = $request->input('Idkelutama');
            $Idkelompok = $request->input('Idkelompok');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Lacak_TmpTransaksi
            @Kode = ?, @Status = ?, @IdTypeTransaksi = ?, @Tanggal = ?, @IdDivisi = ?, @Idobjek = ?, @Idkelutama = ?, @Idkelompok = ?',
                [4, $Status, $IdTypeTransaksi, $Tanggal, $IdDivisi, $Idobjek, $Idkelutama, $Idkelompok]
            );
            $data_subkel = [];

            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'idtransaksi' => $detail_subkel->idtransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'nmpenerima' => $detail_subkel->nmpenerima,
                    'ACCPenerima' => $detail_subkel->ACCPenerima,
                    'ACCPemberi' => $detail_subkel->ACCPemberi,
                    'nmpemberi' => $detail_subkel->nmpemberi,
                    'jumlahpengeluaranprimer' => $detail_subkel->jumlahpengeluaranprimer,
                    'jumlahpengeluaransekunder' => $detail_subkel->jumlahpengeluaransekunder,
                    'jumlahpengeluarantritier' => $detail_subkel->jumlahpengeluarantritier,
                ];

            }
            return response()->json($data_subkel);
        }

        // Lacak by kel ut
        else if ($id === 'lacakSubKelompok') {
            $Status = $request->input('Status');
            $IdTypeTransaksi = $request->input('IdTypeTransaksi');
            $Tanggal = $request->input('Tanggal');
            $IdDivisi = $request->input('IdDivisi');
            $Idobjek = $request->input('Idobjek');
            $Idkelutama = $request->input('Idkelutama');
            $Idkelompok = $request->input('Idkelompok');
            $Idsubkel = $request->input('Idsubkel');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Lacak_TmpTransaksi
            @Kode = ?, @Status = ?, @IdTypeTransaksi = ?, @Tanggal = ?, @IdDivisi = ?, @Idobjek = ?, @Idkelutama = ?, @Idkelompok = ?, @Idsubkel = ?',
                [5, $Status, $IdTypeTransaksi, $Tanggal, $IdDivisi, $Idobjek, $Idkelutama, $Idkelompok, $Idsubkel]
            );
            $data_subkel = [];

            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'idtransaksi' => $detail_subkel->idtransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'nmpenerima' => $detail_subkel->nmpenerima,
                    'ACCPenerima' => $detail_subkel->ACCPenerima,
                    'ACCPemberi' => $detail_subkel->ACCPemberi,
                    'nmpemberi' => $detail_subkel->nmpemberi,
                    'jumlahpengeluaranprimer' => $detail_subkel->jumlahpengeluaranprimer,
                    'jumlahpengeluaransekunder' => $detail_subkel->jumlahpengeluaransekunder,
                    'jumlahpengeluarantritier' => $detail_subkel->jumlahpengeluarantritier,
                ];

            }
            return response()->json($data_subkel);
        } else if ($id === 'lacakDivisiTmp') {
            $Status = $request->input('Status');
            $IdTypeTransaksi = $request->input('IdTypeTransaksi');
            $Tanggal = $request->input('Tanggal');
            $IdDivisi = $request->input('IdDivisi');
            // dd($request->all());
            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Lacak_TmpTransaksi
            @Kode = ?, @Status = ?, @IdTypeTransaksi = ?, @Tanggal = ?, @IdDivisi = ?',
                [6, $Status, $IdTypeTransaksi, $Tanggal, $IdDivisi]
            );
            // dd($subkel);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'idtransaksi' => $detail_subkel->IdTransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'nmpenerima' => $detail_subkel->NmPenerima,
                    'ACCPenerima' => $detail_subkel->ACCPenerima,
                    'ACCPemberi' => $detail_subkel->ACCPemberi,
                    'nmpemberi' => $detail_subkel->NmPemberi,
                    'jumlahpengeluaranprimer' => $detail_subkel->JumlahPengeluaranPrimer,
                    'jumlahpengeluaransekunder' => $detail_subkel->JumlahPengeluaranSekunder,
                    'jumlahpengeluarantritier' => $detail_subkel->JumlahPengeluaranTritier,
                ];
            }
            return response()->json($data_subkel);
        } else if ($id === 'lacakObjekTmp') {
            $Status = $request->input('Status');
            $IdTypeTransaksi = $request->input('IdTypeTransaksi');
            $Tanggal = $request->input('Tanggal');
            $IdDivisi = $request->input('IdDivisi');
            $Idobjek = $request->input('Idobjek');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Lacak_TmpTransaksi
            @Kode = ?, @Status = ?, @IdTypeTransaksi = ?, @Tanggal = ?, @IdDivisi = ?, @Idobjek = ?',
                [7, $Status, $IdTypeTransaksi, $Tanggal, $IdDivisi, $Idobjek]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'idtransaksi' => $detail_subkel->IdTransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'nmpenerima' => $detail_subkel->NmPenerima,
                    'ACCPenerima' => $detail_subkel->ACCPenerima,
                    'ACCPemberi' => $detail_subkel->ACCPemberi,
                    'nmpemberi' => $detail_subkel->NmPemberi,
                    'jumlahpengeluaranprimer' => $detail_subkel->JumlahPengeluaranPrimer,
                    'jumlahpengeluaransekunder' => $detail_subkel->JumlahPengeluaranSekunder,
                    'jumlahpengeluarantritier' => $detail_subkel->JumlahPengeluaranTritier,
                ];
            }
            return response()->json($data_subkel);
        } else if ($id === 'lacakKelUtTmp') {
            $Status = $request->input('Status');
            $IdTypeTransaksi = $request->input('IdTypeTransaksi');
            $Tanggal = $request->input('Tanggal');
            $IdDivisi = $request->input('IdDivisi');
            $Idobjek = $request->input('Idobjek');
            $Idkelutama = $request->input('Idkelutama');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Lacak_TmpTransaksi
            @Kode = ?, @Status = ?, @IdTypeTransaksi = ?, @Tanggal = ?, @IdDivisi = ?, @Idobjek = ?, @Idkelutama = ?',
                [8, $Status, $IdTypeTransaksi, $Tanggal, $IdDivisi, $Idobjek, $Idkelutama]
            );
            $data_subkel = [];

            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'idtransaksi' => $detail_subkel->IdTransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'nmpenerima' => $detail_subkel->NmPenerima,
                    'ACCPenerima' => $detail_subkel->ACCPenerima,
                    'ACCPemberi' => $detail_subkel->ACCPemberi,
                    'nmpemberi' => $detail_subkel->NmPemberi,
                    'jumlahpengeluaranprimer' => $detail_subkel->JumlahPengeluaranPrimer,
                    'jumlahpengeluaransekunder' => $detail_subkel->JumlahPengeluaranSekunder,
                    'jumlahpengeluarantritier' => $detail_subkel->JumlahPengeluaranTritier,
                ];
            }
            return response()->json($data_subkel);
        } else if ($id === 'lacakKelompokTmp') {
            $Status = $request->input('Status');
            $IdTypeTransaksi = $request->input('IdTypeTransaksi');
            $Tanggal = $request->input('Tanggal');
            $IdDivisi = $request->input('IdDivisi');
            $Idobjek = $request->input('Idobjek');
            $Idkelutama = $request->input('Idkelutama');
            $Idkelompok = $request->input('Idkelompok');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Lacak_TmpTransaksi
            @Kode = ?, @Status = ?, @IdTypeTransaksi = ?, @Tanggal = ?, @IdDivisi = ?, @Idobjek = ?, @Idkelutama = ?, @Idkelompok = ?',
                [9, $Status, $IdTypeTransaksi, $Tanggal, $IdDivisi, $Idobjek, $Idkelutama, $Idkelompok]
            );
            $data_subkel = [];

            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'idtransaksi' => $detail_subkel->IdTransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'nmpenerima' => $detail_subkel->NmPenerima,
                    'ACCPenerima' => $detail_subkel->ACCPenerima,
                    'ACCPemberi' => $detail_subkel->ACCPemberi,
                    'nmpemberi' => $detail_subkel->NmPemberi,
                    'jumlahpengeluaranprimer' => $detail_subkel->JumlahPengeluaranPrimer,
                    'jumlahpengeluaransekunder' => $detail_subkel->JumlahPengeluaranSekunder,
                    'jumlahpengeluarantritier' => $detail_subkel->JumlahPengeluaranTritier,
                ];
            }
            return response()->json($data_subkel);
        } else if ($id === 'lacakSubKelompokTmp') {
            $Status = $request->input('Status');
            $IdTypeTransaksi = $request->input('IdTypeTransaksi');
            $Tanggal = $request->input('Tanggal');
            $IdDivisi = $request->input('IdDivisi');
            $Idobjek = $request->input('Idobjek');
            $Idkelutama = $request->input('Idkelutama');
            $Idkelompok = $request->input('Idkelompok');
            $Idsubkel = $request->input('Idsubkel');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Lacak_TmpTransaksi
            @Kode = ?, @Status = ?, @IdTypeTransaksi = ?, @Tanggal = ?, @IdDivisi = ?, @Idobjek = ?, @Idkelutama = ?, @Idkelompok = ?, @Idsubkel = ?',
                [10, $Status, $IdTypeTransaksi, $Tanggal, $IdDivisi, $Idobjek, $Idkelutama, $Idkelompok, $Idsubkel]
            );
            $data_subkel = [];
            // dd($subkel);

            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'idtransaksi' => $detail_subkel->IdTransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'nmpenerima' => $detail_subkel->NmPenerima,
                    'ACCPenerima' => $detail_subkel->ACCPenerima,
                    'ACCPemberi' => $detail_subkel->ACCPemberi,
                    'nmpemberi' => $detail_subkel->NmPemberi,
                    'jumlahpengeluaranprimer' => $detail_subkel->JumlahPengeluaranPrimer,
                    'jumlahpengeluaransekunder' => $detail_subkel->JumlahPengeluaranSekunder,
                    'jumlahpengeluarantritier' => $detail_subkel->JumlahPengeluaranTritier,
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
