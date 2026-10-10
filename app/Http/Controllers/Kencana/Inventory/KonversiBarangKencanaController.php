<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class KonversiBarangKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Inventory.KonversiBarang', compact('access'));
    }

    public function getObjekSelect($divisi)
    {
        $user = Auth::user()->NomorUser;
        $data = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$user, $divisi]);
        return response()->json($data);
    }

    public function getKelompokUtamaSelect($objek)
    {
        $data = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama @XIdObjek_KelompokUtama = ?', [$objek]);
        return response()->json($data);
    }

    public function getKelompokSelect($kelompokUtama)
    {
        $data = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok @XIdKelompokUtama_Kelompok = ?', [$kelompokUtama]);
        return response()->json($data);
    }

    public function getSubKelompokSelect($kelompok)
    {
        $kelompok = $kelompok ?? '0';
        $data = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?', [$kelompok]);
        return response()->json($data);
    }

    public function getIdTypeSelect($subKelompok)
    {
        // dd($subKelompok);
        $data = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_idsubkelompok_type @XIdSubKelompok_Type = ?', [$subKelompok]);
        // dd($data);
        return response()->json($data);
    }

    public function getTypeABMSelect($subKelompok)
    {
        $data = DB::connection('ConnKCNInventory')->select('exec SP_4451_INV_idsubkelompok_type_ABM @XIdSubKelompok_Type = ?', [$subKelompok]);
        return response()->json($data);
    }

    public function getTypeCIRSelect()
    {
        $data = DB::connection('ConnKCNInventory')->select('exec SP_4451_INV_list_type_perukuran');
        return response()->json($data);
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
        }

        // objek
        else if ($id === 'getObjek') {
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

        // ambil kode type
        else if ($id === 'getIdType') {
            $XIdSubKelompok_Type = $request->input('XIdSubKelompok_Type');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_idsubkelompok_type
            @XIdSubKelompok_Type = ?'
                ,
                [$XIdSubKelompok_Type]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'NamaType' => $detail_subkel->NamaType,
                    'IdType' => $detail_subkel->IdType,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                ];
            }
            return datatables($subkel)->make(true);
        }

        // ambil kode type
        else if ($id === 'insertTempType') {
            $XIdDivisi = $request->input('XIdDivisi');
            $XIdSubKelompok = $request->input('XIdSubKelompok');

            $subkel = DB::connection('ConnKCNInventory')->statement('exec SP_1003_INV_idnamasubkelompok_type
            @XIdDivisi = ?, @XIdSubKelompok = ?'
                ,
                [$XIdDivisi, $XIdSubKelompok]
            );
        }

        // saldo
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
        } else if ($id === 'cekKodeBarang') {
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
        }

        // saldo
        else if ($id === 'getJumlahAntrian') {
            $IdType = $request->input('IdType');

            $divisi = DB::connection('ConnKCNInventory')->select('exec [SP_1003_INV_List_JmlAntrian_TmpTransaksi]
           @kode = ?, @IdType = ?', [1, $IdType]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'OutPrimer' => $detail_divisi->OutPrimer,
                    'OutSekunder' => $detail_divisi->OutSekunder,
                    'OutTritier' => $detail_divisi->OutTritier,
                ];
            }

            return response()->json($data_divisi);
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
                ];
            }
            return datatables($subkel)->make(true);
        }

        // get type
        else if ($id === 'getType') {
            $IdType = $request->input('IdType');
            $IdSubKel = $request->input('IdSubKel');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_NamaType_Type
            @IdType = ?, @IdSubKel = ?', [$IdType, $IdSubKel]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'NamaType' => $detail_subkel->NamaType,
                ];
            }
            // dd($subkel);
            return response()->json($data_subkel);
        }

        // get kode konversi
        else if ($id === 'loadDataKonversi') {
            $XIdDivisi = $request->input('XIdDivisi');

            $divisi = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_ListIdKonversi_TmpTransaksi
            @XIdDivisi = ?', [$XIdDivisi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'SaatTransaksi' => $detail_divisi->SaatTransaksi,
                ];
            }
            return response()->json($data_divisi);
        }

        // get kode konversi
        else if ($id === 'getKdBrgByType') {
            $sTypeVal = $request->input('sTypeVal');

            $divisiConn = DB::connection('ConnKCNInventory')
                ->table('Type')
                ->select('KodeBarang')
                ->where('IdType', $sTypeVal)
                ->first();

            // dd($divisiConn);
            return response()->json($divisiConn);
        }

        // get data asal
        else if ($id === 'loadAllDataAsal') {
            $XIdDivisi = $request->input('XIdDivisi');

            $divisi = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_AsalKonv_BlmACC_TmpTransaksi
            @XIdDivisi = ?', [$XIdDivisi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'NamaType' => $detail_divisi->NamaType,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdPenerima' => $detail_divisi->IdPenerima,
                    'IdType' => $detail_divisi->IdType,
                ];
            }
            return response()->json($data_divisi);
        }

        // get data tujuan
        else if ($id === 'loadAllDataTujuan') {
            $XIdDivisi = $request->input('XIdDivisi');

            $divisi = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_TujKonv_BlmACC_TmpTransaksi
            @XIdDivisi = ?', [$XIdDivisi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'NamaType' => $detail_divisi->NamaType,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdPenerima' => $detail_divisi->IdPenerima,
                    'IdType' => $detail_divisi->IdType,
                ];
            }
            return response()->json($data_divisi);
        }

        // get data asal
        else if ($id === 'loadDataAsal') {
            $XIdDivisi = $request->input('XIdDivisi');
            $IdKonversi = $request->input('IdKonversi');

            $divisi = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_AsalKonv1_BlmACC_TmpTransaksi
            @XIdDivisi = ?, @IdKonversi = ?', [$XIdDivisi, $IdKonversi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'NamaType' => $detail_divisi->NamaType,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdPenerima' => $detail_divisi->IdPenerima,
                    'IdType' => $detail_divisi->IdType,
                ];
            }
            return response()->json($data_divisi);
        }

        // get data tujuan
        else if ($id === 'loadDataTujuan') {
            $XIdDivisi = $request->input('XIdDivisi');
            $IdKonversi = $request->input('IdKonversi');

            $divisi = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_TujKonv1_BlmACC_TmpTransaksi
            @XIdDivisi = ?, @IdKonversi = ?', [$XIdDivisi, $IdKonversi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'NamaType' => $detail_divisi->NamaType,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdPenerima' => $detail_divisi->IdPenerima,
                    'IdType' => $detail_divisi->IdType,
                ];
            }
            return response()->json($data_divisi);
        }

        // get data tujuan
        else if ($id === 'getStatusKonversi') {
            $XIdTransaksi = $request->input('XIdTransaksi');

            $divisi = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_List_AsalKonversi_TmpTransaksi
            @XIdTransaksi = ?', [$XIdTransaksi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdDivisi' => $detail_divisi->IdDivisi,
                    'Saatawaltransaksi' => $detail_divisi->Saatawaltransaksi,
                    'IdTypeTransaksi' => $detail_divisi->IdTypeTransaksi,
                    'UraianDetailTransaksi' => $detail_divisi->UraianDetailTransaksi,
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'IdType' => $detail_divisi->IdType,
                    'NamaType' => $detail_divisi->NamaType,
                    'IdPenerima' => $detail_divisi->IdPenerima,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdSubkelompok' => $detail_divisi->IdSubkelompok,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'IdKelompok' => $detail_divisi->IdKelompok,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'IdKelompokUtama' => $detail_divisi->IdKelompokUtama,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'IdObjek' => $detail_divisi->IdObjek,
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'JumlahPengeluaranPrimer' => $detail_divisi->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_divisi->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_divisi->JumlahPengeluaranTritier,
                    'KodeBarang' => $detail_divisi->KodeBarang,
                ];

            }
            return response()->json($data_divisi);
        }

        // get data tujuan
        else if ($id === 'getStatusKonversiTujuan') {
            $XIdTransaksi = $request->input('XIdTransaksi');

            $divisi = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_List_TujuanKonversi_TmpTransaksi
            @XIdTransaksi = ?', [$XIdTransaksi]);
            // dd($divisi);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdDivisi' => $detail_divisi->IdDivisi,
                    'SaatAwalTransaksi' => $detail_divisi->SaatAwalTransaksi,
                    'IdTypeTransaksi' => $detail_divisi->IdTypeTransaksi,
                    'UraianDetailTransaksi' => $detail_divisi->UraianDetailTransaksi,
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'IdType' => $detail_divisi->IdType,
                    'NamaType' => $detail_divisi->NamaType,
                    'IdPenerima' => $detail_divisi->IdPenerima,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdSubkelompok' => $detail_divisi->IdSubkelompok,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'IdKelompok' => $detail_divisi->IdKelompok,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'IdKelompokUtama' => $detail_divisi->IdKelompokUtama,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'IdObjek' => $detail_divisi->IdObjek,
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'JumlahPemasukanPrimer' => $detail_divisi->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_divisi->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_divisi->JumlahPemasukanTritier,
                    'KodeBarang' => $detail_divisi->KodeBarang,
                    'HargaSatuan' => $detail_divisi->HargaSatuan ?? 0,
                ];

            }
            return response()->json($data_divisi);
        } else if ($id === 'getTypePersediaan') {
            $idType = $request->input('idType');

            $result = DB::connection('ConnKCNInventory')->select('exec SP_4451_CekPersediaan @IdType = ?', [$idType]);
            // dd($result);
            if ($result[0]->Ada > 0) {
                return response()->json(['success' => 'Data tersedia']);
            } else {
                return response()->json(['error' => 'Data tidak tersedia']);
            }
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
        // update isi, kalau proses button ISI
        if ($id == 'prosesIsiAsal') {
            $XUraianDetailTransaksi = $request->input('XUraianDetailTransaksi');
            $XIdType = $request->input('XIdType');
            $XSaatAwalTransaksi = $request->input('XSaatAwalTransaksi');
            $XJumlahKeluarPrimer = $request->input('XJumlahKeluarPrimer');
            $XJumlahKeluarSekunder = $request->input('XJumlahKeluarSekunder');
            $XJumlahKeluarTritier = $request->input('XJumlahKeluarTritier');
            $XAsalSubKel = $request->input('XAsalSubKel');
            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);

            $XJumlahKeluarPrimer = ($XJumlahKeluarPrimer === 'Infinity') ? 0 : $XJumlahKeluarPrimer;
            $XJumlahKeluarSekunder = ($XJumlahKeluarSekunder === 'Infinity') ? 0 : $XJumlahKeluarSekunder;
            $XJumlahKeluarTritier = ($XJumlahKeluarTritier === 'Infinity') ? 0 : $XJumlahKeluarTritier;

            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec [SP_PROSES_ASALKONVTMPTRANSAKSI]
                @XIdTypeTransaksi = ?,
                @XUraianDetailTransaksi = ?,
                @XIdType = ?,
                @XIdPemohon = ?,
                @XSaatAwalTransaksi = ?,
                @XJumlahKeluarPrimer = ?,
                @XJumlahKeluarSekunder = ?,
                @XJumlahKeluarTritier = ?,
                @XAsalSubKel = ?', [
                        '04',
                        $XUraianDetailTransaksi,
                        $XIdType,
                        $UserInput,
                        $XSaatAwalTransaksi,
                        $XJumlahKeluarPrimer,
                        $XJumlahKeluarSekunder,
                        $XJumlahKeluarTritier,
                        $XAsalSubKel,
                    ]);

                $divisiConn = DB::connection('ConnKCNInventory')
                    ->table('Counter')
                    ->select('IdKonversi')
                    ->first();

                $XIdKonversi = $divisiConn ? $divisiConn->IdKonversi : null;

                if ($XIdKonversi !== null) {
                    $XIdKonversiFormatted = substr('000000000' . ltrim((string) $XIdKonversi), -9);
                } else {
                    $XIdKonversiFormatted = null;
                }

                // DB::connection('ConnKCNInventory')
                //     ->statement('exec [SP_1003_INV_Insert_04_AsalTmpTransaksi]
                // @XIdTypeTransaksi = ?,
                // @XUraianDetailTransaksi = ?,
                // @XIdType = ?,
                // @XIdPemohon = ?,
                // @XSaatAwalTransaksi = ?,
                // @XJumlahKeluarPrimer = ?,
                // @XJumlahKeluarSekunder = ?,
                // @XJumlahKeluarTritier = ?,
                // @XAsalSubKel = ?,
                // @XIdKonversi = ?', [
                //         '04',
                //         $XUraianDetailTransaksi,
                //         $XIdType,
                //         $UserInput,
                //         $XSaatAwalTransaksi,
                //         $XJumlahKeluarPrimer,
                //         $XJumlahKeluarSekunder,
                //         $XJumlahKeluarTritier,
                //         $XAsalSubKel,
                //         trim($XIdKonversiFormatted),
                //     ]);
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        //ins persediaan
        else if ($id == 'insPersediaan') {
            $XIdType = $request->input('XIdType');
            $XJumlahMasukTritier = $request->input('XJumlahMasukTritier');
            $XhargaSatuan = (float) str_replace(',', '', $request->input('hargaSatuan'));
            // dd($XhargaSatuan);
            // dd(request()->all());
            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec SP_4451_UpdateHarga_Persediaan
                @IdType = ?,
                @JumlahTritier = ?,
                @HargaSatuan = ?', [
                        $XIdType,
                        $XJumlahMasukTritier,
                        $XhargaSatuan,
                    ]);

                return response()->json([
                    'success' => 'Data Telah Terkoreksi, idtransaksi : '
                ]);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diPROSES: ' . $e->getMessage()]);
            }
        }

        // proses isi tujuan
        else if ($id == 'prosesIsiTujuan') {
            $XUraianDetailTransaksi = $request->input('XUraianDetailTransaksi');
            $XIdType = $request->input('XIdType');
            $XSaatAwalTransaksi = $request->input('XSaatAwalTransaksi');
            $XJumlahMasukPrimer = $request->input('XJumlahMasukPrimer');
            $XJumlahMasukSekunder = $request->input('XJumlahMasukSekunder');
            $XJumlahMasukTritier = $request->input('XJumlahMasukTritier');
            $XTujuanSubKel = $request->input('XTujuanSubKel');
            $XIdKonversi = $request->input('XIdKonversi');
            $XhargaSatuan = (float) str_replace(',', '', $request->input('hargaSatuan'));
            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);
            // dd($XhargaSatuan);

            $XJumlahMasukPrimer = ($XJumlahMasukPrimer === 'Infinity') ? 0 : $XJumlahMasukPrimer;
            $XJumlahMasukSekunder = ($XJumlahMasukSekunder === 'Infinity') ? 0 : $XJumlahMasukSekunder;
            $XJumlahMasukTritier = ($XJumlahMasukTritier === 'Infinity') ? 0 : $XJumlahMasukTritier;

            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec [SP_1003_INV_Insert_04_TujuanTmpTransaksi]
                @XIdTypeTransaksi = ?,
                @XUraianDetailTransaksi = ?,
                @XIdType = ?,
                @XIdPemohon = ?,
                @XSaatAwalTransaksi = ?,
                @XJumlahMasukPrimer = ?,
                @XJumlahMasukSekunder = ?,
                @XJumlahMasukTritier = ?,
                @XTujuanSubKel = ?,
                @XIdKonversi = ?,
                @HargaSatuan = ?', [
                        '04',
                        $XUraianDetailTransaksi,
                        $XIdType,
                        $UserInput,
                        $XSaatAwalTransaksi,
                        $XJumlahMasukPrimer,
                        $XJumlahMasukSekunder,
                        $XJumlahMasukTritier,
                        $XTujuanSubKel,
                        $XIdKonversi,
                        $XhargaSatuan
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // update isi, kalau proses button ISI
        else if ($id == 'prosesIsi2Asal') {
            // dd($request->all());
            $XUraianDetailTransaksi = $request->input('XUraianDetailTransaksi');
            $XIdType = $request->input('XIdType');
            $XSaatAwalTransaksi = $request->input('XSaatAwalTransaksi');
            $XJumlahKeluarPrimer = $request->input('XJumlahKeluarPrimer');
            $XJumlahKeluarSekunder = $request->input('XJumlahKeluarSekunder');
            $XJumlahKeluarTritier = $request->input('XJumlahKeluarTritier');
            $XAsalSubKel = $request->input('XAsalSubKel');
            $XIdKonversi = $request->input('XIdKonversi');
            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);

            $XJumlahKeluarPrimer = ($XJumlahKeluarPrimer === 'Infinity') ? 0 : $XJumlahKeluarPrimer;
            $XJumlahKeluarSekunder = ($XJumlahKeluarSekunder === 'Infinity') ? 0 : $XJumlahKeluarSekunder;
            $XJumlahKeluarTritier = ($XJumlahKeluarTritier === 'Infinity') ? 0 : $XJumlahKeluarTritier;

            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec [SP_1003_INV_Insert_04_AsalTmpTransaksi]
                @XIdTypeTransaksi = ?,
                @XUraianDetailTransaksi = ?,
                @XIdType = ?,
                @XIdPemohon = ?,
                @XSaatAwalTransaksi = ?,
                @XJumlahKeluarPrimer = ?,
                @XJumlahKeluarSekunder = ?,
                @XJumlahKeluarTritier = ?,
                @XAsalSubKel = ?,
                @XIdKonversi = ?', [
                        '04',
                        $XUraianDetailTransaksi,
                        $XIdType,
                        $UserInput,
                        $XSaatAwalTransaksi,
                        $XJumlahKeluarPrimer,
                        $XJumlahKeluarSekunder,
                        $XJumlahKeluarTritier,
                        $XAsalSubKel,
                        trim($XIdKonversi),
                    ]);
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // update isi, kalau proses button ISI
        else if ($id == 'prosesUpdateAsal') {
            $XIdTransaksi = $request->input('XIdTransaksi');
            $XIdType = $request->input('XIdType');
            $XUraianDetaiLTransaksi = $request->input('XUraianDetaiLTransaksi');
            $XJumlahKeluarPrimer = $request->input('XJumlahKeluarPrimer');
            $XJumlahKeluarSekunder = $request->input('XJumlahKeluarSekunder');
            $XJumlahKeluarTritier = $request->input('XJumlahKeluarTritier');

            $XJumlahKeluarPrimer = ($XJumlahKeluarPrimer === 'Infinity') ? 0 : $XJumlahKeluarPrimer;
            $XJumlahKeluarSekunder = ($XJumlahKeluarSekunder === 'Infinity') ? 0 : $XJumlahKeluarSekunder;
            $XJumlahKeluarTritier = ($XJumlahKeluarTritier === 'Infinity') ? 0 : $XJumlahKeluarTritier;

            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec [SP_1003_INV_Update_TmpTransaksi]
                    @XIdTransaksi = ?,
                    @XIdTypeTujuan = ?,
                    @XUraianDetaiLTransaksi = ?,
                    @XJumlahKeluarPrimer = ?,
                    @XJumlahKeluarSekunder = ?,
                    @XJumlahKeluarTritier = ?', [
                        $XIdTransaksi,
                        $XIdType,
                        $XUraianDetaiLTransaksi,
                        $XJumlahKeluarPrimer,
                        $XJumlahKeluarSekunder,
                        $XJumlahKeluarTritier,
                    ]);
                return response()->json(['success' => 'Data sudah diKOREKSI'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diKOREKSI: ' . $e->getMessage()], 500);
            }
        }
        // update isi, kalau proses button ISI
        else if ($id == 'prosesUpdateTujuan') {
            $XIdTransaksi = $request->input('XIdTransaksi');
            $XIdType = $request->input('XIdType');
            $XUraianDetaiLTransaksi = $request->input('XUraianDetaiLTransaksi');
            $XJumlahKeluarPrimer = $request->input('XJumlahKeluarPrimer');
            $XJumlahKeluarSekunder = $request->input('XJumlahKeluarSekunder');
            $XJumlahKeluarTritier = $request->input('XJumlahKeluarTritier');
            $XhargaSatuan = (float) str_replace(',', '', $request->input('hargaSatuan'));

            $XJumlahKeluarPrimer = ($XJumlahKeluarPrimer === 'Infinity') ? 0 : $XJumlahKeluarPrimer;
            $XJumlahKeluarSekunder = ($XJumlahKeluarSekunder === 'Infinity') ? 0 : $XJumlahKeluarSekunder;
            $XJumlahKeluarTritier = ($XJumlahKeluarTritier === 'Infinity') ? 0 : $XJumlahKeluarTritier;
            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec [SP_1003_INV_Update_TmpTransaksi]
                    @XIdTransaksi = ?,
                    @XIdTypeTujuan = ?,
                    @XUraianDetaiLTransaksi = ?,
                    @XJumlahKeluarPrimer = ?,
                    @XJumlahKeluarSekunder = ?,
                    @XJumlahKeluarTritier = ?,
                    @HargaSatuan = ?', [
                        $XIdTransaksi,
                        $XIdType,
                        $XUraianDetaiLTransaksi,
                        $XJumlahKeluarPrimer,
                        $XJumlahKeluarSekunder,
                        $XJumlahKeluarTritier,
                        $XhargaSatuan,
                    ]);
                return response()->json(['success' => 'Data sudah diKOREKSI'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diKOREKSI: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request, $id)
    {
        if ($id == 'prosesDeleteAsal') {
            $XIdTransaksi = $request->input('XIdTransaksi');

            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec [SP_1003_INV_Delete_TmpTransaksi]
                    @XIdTransaksi = ?', [
                        $XIdTransaksi,
                    ]);
                return response()->json(['success' => 'Data sudah diHAPUS'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }

        // delete tujuan
        else if ($id == 'prosesDeleteTujuan') {
            $XIdTransaksi = $request->input('XIdTransaksi');

            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec [SP_1003_INV_Delete_TmpTransaksi]
                    @XIdTransaksi = ?', [
                        $XIdTransaksi,
                    ]);
                return response()->json(['success' => 'Data sudah diHAPUS'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }
    }
}
