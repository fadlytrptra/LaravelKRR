<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class PermohonanSatuDivisiKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Inventory.PermohonanSatuDivisi', compact('access'));
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

        // get divisi
        if ($id === 'getUser') {
            $NamaUser = $request->input('NamaUser');

            $divisi = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_ListNama_Login @NamaUser = ?', [$NamaUser]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'kodeUser' => $detail_divisi->kodeUser,
                ];
            }
            return response()->json($data_divisi);
        } else if ($id === 'getUserId') {
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

        // get objek2
        else if ($id === 'getObjek2') {
            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_user_Objek @XKdUser = ?, @XIdDivisi = ?', [$user, $request->input('XIdDivisi')]);
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
        }
        // get kel utama
        else if ($id === 'getKelUt') {
            $XIdObjek_KelompokUtama = $request->input('XIdObjek_KelompokUtama');

            $kelut = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama
            @XIdObjek_KelompokUtama = ?', [$XIdObjek_KelompokUtama]);
            $data_kelut = [];
            foreach ($kelut as $detail_kelut) {
                $data_kelut[] = [
                    'NamaKelompokUtama' => $detail_kelut->NamaKelompokUtama,
                    'IdKelompokUtama' => $detail_kelut->IdKelompokUtama
                ];
            }
            return datatables($kelut)->make(true);

        }

        // get kelut 2
        else if ($id === 'getKelUt2') {
            $kelut = DB::connection('ConnKCNInventory')->select(
                'exec SP_1003_INV_IdObjek_KelompokUtama @XIdObjek_KelompokUtama = ?'
                ,
                [$request->input('XIdObjek_KelompokUtama')]
            );
            $data_kelut = [];
            foreach ($kelut as $detail_kelut) {
                $data_kelut[] = [
                    'NamaKelompokUtama' => $detail_kelut->NamaKelompokUtama,
                    'IdKelompokUtama' => $detail_kelut->IdKelompokUtama
                ];
            }
            return datatables($kelut)->make(true);

        }

        // mendapatkan daftar kelompok
        else if ($id === 'getKelompok') {
            $XIdKelompokUtama_Kelompok = $request->input('XIdKelompokUtama_Kelompok');

            $kelompok = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok
            @XIdKelompokUtama_Kelompok = ?', [$XIdKelompokUtama_Kelompok]);
            $data_kelompok = [];
            foreach ($kelompok as $detail_kelompok) {
                $data_kelompok[] = [
                    'namakelompok' => $detail_kelompok->namakelompok,
                    'idkelompok' => $detail_kelompok->idkelompok
                ];
            }
            return datatables($kelompok)->make(true);

        }

        // mendapatkan kelompok 2
        else if ($id === 'getKelompok2') {
            $kelompok = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok
            @XIdKelompokUtama_Kelompok = ?', [$request->input('XIdKelompokUtama_Kelompok')]);
            $data_kelompok = [];
            foreach ($kelompok as $detail_kelompok) {
                $data_kelompok[] = [
                    'idkelompok' => $detail_kelompok->idkelompok,
                    'namakelompok' => $detail_kelompok->namakelompok
                ];
            }
            return datatables($kelompok)->make(true);

        }

        // mendapatkan daftar sub kelompok
        else if ($id === 'getSubkel') {
            $XIdKelompok_SubKelompok = $request->input('XIdKelompok_SubKelompok') ?? '0';

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdKelompok_SubKelompok
            @XIdKelompok_SubKelompok = ?', [$XIdKelompok_SubKelompok]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                ];
            }
            return datatables($subkel)->make(true);
        }

        // get subkel 2
        else if ($id === 'getSubkel2') {
            $XIdKelompok_SubKelompok = $request->input('XIdKelompok_SubKelompok');
            $XIdKelompok_SubKelompok = $XIdKelompok_SubKelompok ?? '0';

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdKelompok_SubKelompok
            @XIdKelompok_SubKelompok = ?', [$XIdKelompok_SubKelompok]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);
        }

        // mendapatkan load penerima
        else if ($id === 'loadPenerima') {
            $XKodeBarang = $request->input('XkodeBarangPemberi');
            $XIdSubKelompok = $request->input('XIdSubKelompok') ?? '0';
            $XPIB = $request->input('XpibPemberi');
            if ($XPIB === null) {
                $kelompok = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_KodeBarang_Type
            @XKodeBarang = ?, @XIdSubKelompok = ?', [$XKodeBarang, $XIdSubKelompok]);
                $data_kelompok = [];
                foreach ($kelompok as $detail_kelompok) {
                    $data_kelompok[] = [
                        'satuan_primer' => $detail_kelompok->satuan_primer,
                        'satuan_sekunder' => $detail_kelompok->satuan_sekunder,
                        'satuan_tritier' => $detail_kelompok->satuan_tritier,
                    ];
                }
                return response()->json($data_kelompok);
            } else {
                $kelompok = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_KodeBarang_Type
                @XKodeBarang = ?, @XIdSubKelompok = ?, @XPIB = ?', [$XKodeBarang, $XIdSubKelompok, $XPIB]);
                $data_kelompok = [];
                foreach ($kelompok as $detail_kelompok) {
                    $data_kelompok[] = [
                        'satuan_primer' => $detail_kelompok->satuan_primer,
                        'satuan_sekunder' => $detail_kelompok->satuan_sekunder,
                        'satuan_tritier' => $detail_kelompok->satuan_tritier,
                    ];
                }
                return response()->json($data_kelompok);
            }
        }

        // full data
        else if ($id === 'tampilAllData') {
            $XIdDivisi = $request->input('XIdDivisi');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_List_Mohon_TmpTransaksi
            @kode = ?, @XIdDivisi = ?, @XIdTypeTransaksi = ?', [4, $XIdDivisi, '01']);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdTransaksi' => $detail_subkel->IdTransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'UraianDetailTransaksi' => $detail_subkel->UraianDetailTransaksi,
                    'NamaDivisi' => $detail_subkel->NamaDivisi,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'IdPemberi' => $detail_subkel->IdPemberi,
                    'SaatAwalTransaksi' => $detail_subkel->SaatAwalTransaksi,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                ];
            }
            return response()->json($data_subkel);
        }

        // tampil data
        else if ($id === 'tampilData') {
            $XIdDivisi = $request->input('XIdDivisi');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_List_Mohon_TmpTransaksi
            @kode = ?, @XIdDivisi = ?, @XIdTypeTransaksi = ?, @Xuser = ?', [5, $XIdDivisi, '01', $user]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdTransaksi' => $detail_subkel->IdTransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'UraianDetailTransaksi' => $detail_subkel->UraianDetailTransaksi,
                    'NamaDivisi' => $detail_subkel->NamaDivisi,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'IdPemberi' => $detail_subkel->IdPemberi,
                    'SaatAwalTransaksi' => $detail_subkel->SaatAwalTransaksi,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                ];
            }
            return response()->json($data_subkel);
        }

        // get type abm
        else if ($id === 'getTypeABM') {
            $XIdSubKelompok_Type = $request->input('XIdSubKelompok_Type') ?? '0';

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_idsubkelompok_type_ABM
                    @XIdSubKelompok_Type = ?', [$XIdSubKelompok_Type]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'idtype' => $detail_subkel->idtype,
                    'BARU' => $detail_subkel->BARU,
                ];
            }
            return datatables($subkel)->make(true);
        }

        // get type cir
        else if ($id === 'getTypeCIR') {
            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_list_type_perukuran');
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'Nm_Type' => $detail_subkel->Nm_Type,
                    'Id_Type' => $detail_subkel->Id_Type,
                    'Kode_Barang' => $detail_subkel->Kode_Barang,
                ];
            }
            return datatables($subkel)->make(true);
        }
        // get type
        else if ($id === 'getType') {
            $XIdSubKelompok_Type = $request->input('XIdSubKelompok_Type') ?? '0';
            $XJenisLoad = $request->input('XJenisLoad');
            $XKodeBarang = $request->input('XKodeBarang');
            if ($XJenisLoad == 'pemberi') {
                $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_idsubkelompok_type @XIdSubKelompok_Type = ?', [$XIdSubKelompok_Type]);
            } else if ($XJenisLoad == 'penerima') {
                $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_idsubkelompok_type @XIdSubKelompok_Type = ?, @kd = ?, @XKodeBarang = ?', [$XIdSubKelompok_Type, 2, $XKodeBarang]);
            }

            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'NamaType' => $detail_subkel->NamaType,
                    'IdType' => $detail_subkel->IdType,
                ];
            }
            return datatables($subkel)->make(true);
        }

        // get saldo
        else if ($id === 'getSaldo') {
            $IdType = $request->input('IdType');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Saldo_Barang
            @IdType = ?', [$IdType]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'SatPrimer' => $detail_subkel->SatPrimer,
                    'SatSekunder' => $detail_subkel->SatSekunder,
                    'SatTritier' => $detail_subkel->SatTritier,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'PIB' => $detail_subkel->PIB
                ];
            }
            return response()->json($data_subkel);
        }
        // cek kode
        else if ($id === 'cekKodeBarang') {
            $XKodeBarang = $request->input('XKodeBarang');
            $XIdSubKelompok = $request->input('XIdSubKelompok');

            $divisi = DB::connection('ConnKCNInventory')->select('exec [SP_1003_INV_cekkodebarang_type]
           @XKodeBarang = ?, @XIdSubKelompok = ?', [$XKodeBarang, $XIdSubKelompok]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Jumlah' => $detail_divisi->Jumlah,
                ];
            }

            return response()->json($data_divisi);
        } else if ($id === 'loadTypeBarang') {
            $XKodeBarang = $request->input('XKodeBarang');
            $XIdSubKelompok = $request->input('XIdSubKelompok');
            $XPIB = $request->input('XPIB');

            if ($XPIB === null) {
                $type = DB::connection('ConnKCNInventory')->select('exec SP_1273_INV_kodebarang_type1 @XKodeBarang = ?, @XIdSubKelompok = ?', [$XKodeBarang, $XIdSubKelompok]);
            } else {
                $type = DB::connection('ConnKCNInventory')->select('exec SP_1273_INV_kodebarang_type1 @XKodeBarang = ?, @XIdSubKelompok = ?, @XPIB = ?', [$XKodeBarang, $XIdSubKelompok, $XPIB]);
            }

            $data_type = [];
            foreach ($type as $detail_type) {
                $data_type[] = [
                    'IdType' => $detail_type->IdType,
                    'NamaType' => $detail_type->NamaType,
                    'KodeBarang' => $detail_type->KodeBarang,
                    'SaldoPrimer' => $detail_type->SaldoPrimer,
                    'SaldoSekunder' => $detail_type->SaldoSekunder,
                    'SaldoTritier' => $detail_type->SaldoTritier,
                    'satuan_primer' => $detail_type->satuan_primer,
                    'satuan_sekunder' => $detail_type->satuan_sekunder,
                    'satuan_tritier' => $detail_type->satuan_tritier,
                    'PakaiAturanKonversi' => $detail_type->PakaiAturanKonversi
                ];
            }

            return response()->json($data_type);
        }
        // get saldo
        else if ($id === 'tampilItem') {
            $XIdTransaksi = $request->input('XIdTransaksi');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_TujuanSubKelompok_TmpTransaksi
            @XIdTransaksi = ?', [$XIdTransaksi]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'IdDivisi' => $detail_subkel->IdDivisi,
                    'NamaDivisi' => $detail_subkel->NamaDivisi,
                    'IdObjek' => $detail_subkel->IdObjek,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'IdKelompokUtama' => $detail_subkel->IdKelompokUtama,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'IdKelompok' => $detail_subkel->IdKelompok,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'SaatAwalTransaksi' => $detail_subkel->SaatAwalTransaksi,
                    'UraianDetailTransaksi' => $detail_subkel->UraianDetailTransaksi,
                    'JumlahPemasukanPrimer' => $detail_subkel->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_subkel->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_subkel->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $detail_subkel->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_subkel->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_subkel->JumlahPengeluaranTritier,
                    'Satuan_Primer' => $detail_subkel->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_subkel->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_subkel->Satuan_Tritier,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'PakaiAturanKonversi' => $detail_subkel->PakaiAturanKonversi,
                    'KonvSekunderKePrimer' => $detail_subkel->KonvSekunderKePrimer,
                    'KonvTritierKeSekunder' => $detail_subkel->KonvTritierKeSekunder

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
    public function update(Request $request, $id)
    {
        $user = Auth::user()->NomorUser;

        if ($id == 'insertTempType') {
            $XIdDivisi = $request->input('XIdDivisi');
            $XIdSubKelompok = $request->input('XIdSubKelompok');

            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec [SP_1003_INV_idnamasubkelompok_type]
                @XIdDivisi = ?,
                @XIdSubKelompok = ?', [
                        $XIdDivisi,
                        $XIdSubKelompok,
                    ]);
                return response()->json(['success' => 'Data berhasil diPROSES'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diPROSES: ' . $e->getMessage()], 500);
            }
        }

        // save
        else if ($id == 'saveData') {
            $XUraianDetailTransaksi = $request->input('XUraianDetailTransaksi');
            $XIdType = $request->input('XIdType');
            $Xsaatawaltransaksi = $request->input('Xsaatawaltransaksi');
            $XJumlahKeluarPrimer = $request->input('XJumlahKeluarPrimer');
            $XJumlahKeluarSekunder = $request->input('XJumlahKeluarSekunder');
            $XJumlahKeluarTritier = $request->input('XJumlahKeluarTritier');
            $XAsalIdSubKelompok = $request->input('XAsalIdSubKelompok');
            $XTujuanIdSubkelompok = $request->input('XTujuanIdSubkelompok');
            $XIdTypeTujuan = $request->input('XIdTypeTujuan');
            $XPIB = $request->input('XpibPemberi');

            $nextIdTrans = DB::connection('ConnKCNInventory')->select("SELECT IDENT_CURRENT('Tmp_Transaksi') + 1 AS IdTrans");
            $idtransaksi = $nextIdTrans[0]->IdTrans;

            if ($XPIB === null) {
                try {
                    DB::connection('ConnKCNInventory')
                        ->statement('exec [SP_1003_INV_Insert_01_TmpTransaksi]
                @XIdTypeTransaksi = ?,
                @XUraianDetailTransaksi = ?,
                @XIdType = ?,
                @XIdPemberi = ?,
                @Xsaatawaltransaksi = ?,
                @XJumlahKeluarPrimer = ?,
                @XJumlahKeluarSekunder = ?,
                @XJumlahKeluarTritier = ?,
                @XAsalIdSubKelompok = ?,
                @XTujuanIdSubkelompok = ?,
                @XIdTypeTujuan = ?', [
                            '01',
                            $XUraianDetailTransaksi,
                            $XIdType,
                            $user,
                            $Xsaatawaltransaksi,
                            $XJumlahKeluarPrimer,
                            $XJumlahKeluarSekunder,
                            $XJumlahKeluarTritier,
                            $XAsalIdSubKelompok,
                            $XTujuanIdSubkelompok,
                            $XIdTypeTujuan,
                        ]);

                    return response()->json([
                        'success' => 'Data tersimpan dg Idtransaksi : ' . $idtransaksi,
                        'idtransaksi' => $idtransaksi  // Return idtransaksi separately
                    ], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data gagal diPROSES: ' . $e->getMessage()], 500);
                }
            } else {
                try {
                    DB::connection('ConnKCNInventory')
                        ->statement('exec [SP_1003_INV_Insert_01_TmpTransaksi]
                @XIdTypeTransaksi = ?,
                @XUraianDetailTransaksi = ?,
                @XIdType = ?,
                @XIdPemberi = ?,
                @Xsaatawaltransaksi = ?,
                @XJumlahKeluarPrimer = ?,
                @XJumlahKeluarSekunder = ?,
                @XJumlahKeluarTritier = ?,
                @XAsalIdSubKelompok = ?,
                @XTujuanIdSubkelompok = ?,
                @XIdTypeTujuan = ?,
                @XPIB = ?', [
                            '01',
                            $XUraianDetailTransaksi,
                            $XIdType,
                            $user,
                            $Xsaatawaltransaksi,
                            $XJumlahKeluarPrimer,
                            $XJumlahKeluarSekunder,
                            $XJumlahKeluarTritier,
                            $XAsalIdSubKelompok,
                            $XTujuanIdSubkelompok,
                            $XIdTypeTujuan,
                            $XPIB,
                        ]);

                    return response()->json([
                        'success' => 'Data tersimpan dg Idtransaksi : ' . $idtransaksi,
                        'idtransaksi' => $idtransaksi  // Return idtransaksi separately
                    ], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data gagal diPROSES: ' . $e->getMessage()], 500);
                }
            }
        }

        // save
        else if ($id == 'koreksiData') {
            $XIdTransaksi = $request->input('XIdTransaksi');
            $XUraianDetailTransaksi = $request->input('XUraianDetailTransaksi');
            $XJumlahKeluarPrimer = $request->input('XJumlahKeluarPrimer');
            $XJumlahKeluarSekunder = $request->input('XJumlahKeluarSekunder');
            $XJumlahKeluarTritier = $request->input('XJumlahKeluarTritier');
            $XTujuanSubkelompok = $request->input('XTujuanSubkelompok');

            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec [SP_1003_INV_Update_TmpTransaksi]
                @XIdTransaksi = ?,
                @XUraianDetailTransaksi = ?,
                @XJumlahKeluarPrimer = ?,
                @XJumlahKeluarSekunder = ?,
                @XJumlahKeluarTritier = ?,
                @XTujuanSubkelompok = ?', [
                        $XIdTransaksi,
                        $XUraianDetailTransaksi,
                        $XJumlahKeluarPrimer,
                        $XJumlahKeluarSekunder,
                        $XJumlahKeluarTritier,
                        $XTujuanSubkelompok,
                    ]);

                return response()->json([
                    'success' => 'Data Telah Terkoreksi, idtransaksi : ' . $XIdTransaksi,
                    'XIdTransaksi' => $XIdTransaksi  // Return idtransaksi separately
                ], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diPROSES: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request, $id)
    {
        if ($id == 'deleteData') {
            $XIdTransaksi = $request->input('XIdTransaksi');

            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec [SP_1003_INV_Delete_TmpTransaksi]
                @XIdTransaksi = ?', [
                        $XIdTransaksi,
                    ]);

                return response()->json([
                    'success' => 'Data Telah Terhapus, idtransaksi : ' . $XIdTransaksi,
                    'XIdTransaksi' => $XIdTransaksi  // Return idtransaksi separately
                ], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diPROSES: ' . $e->getMessage()], 500);
            }
        }
    }
}
