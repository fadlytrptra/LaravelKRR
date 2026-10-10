<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class MaintenanceTypeKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana'); //tidak perlu menu di navbar
        return view('Kencana.Inventory.MaintenanceType', compact('access'));
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
        $a = (int)$request->input('a');
        $impor = (int)$request->input('impor');
        $namaType = $request->input('namaType');
        $ketType = $request->input('ketType');
        $uraianType = trim($ketType) === '' ? '' : trim($ketType);
        $ketType = $request->input('ketType');
        $PIB = $request->input('PIB');
        $PEB = $request->input('PEB');
        $kdBarang = $request->input('kdBarang');
        $subkelId = $request->input('subkelId');
        $konversi = $request->input('konversi');
        $divisiId = $request->input('divisiId');
        $objekId = $request->input('objekId');
        $kelompokId = $request->input('kelompokId');
        $kelutId = $request->input('kelutId');
        $katUtama = $request->input('katUtama');
        $kategori = $request->input('kategori');
        $kodeType = $request->input('kodeType');
        $satuan = $request->input('satuan');
        $satuanUmum = trim($satuan) === '' ? '' : trim($satuan);

        $primerSekunder = $request->input('primerSekunder');
        $sekunderTritier = $request->input('sekunderTritier');

        $no_tritier = $request->input('no_tritier');
        $no_sekunder = $request->input('no_sekunder');
        $no_primer = $request->input('no_primer');

        $no_katUtama = $request->input('no_katUtama');
        $no_kategori = $request->input('no_kategori');
        $no_subkategori = $request->input('no_subkategori');

        $idtype = $request->input('idtype');


        if ($id === 'getDivisi') {
            // mendapatkan daftar divisi
            $divisi = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_userdivisi @XKdUser = ?', [$user]);
            // $data_divisi = [];
            // foreach ($divisi as $detail_divisi) {
            //     $data_divisi[] = [
            //         'NamaDivisi' => $detail_divisi->NamaDivisi,
            //         'IdDivisi' => $detail_divisi->IdDivisi
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
            // mendapatkan daftar objek
            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$user, $divisiId]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'IdObjek' => $detail_objek->IdObjek
                ];
            }
            return datatables($objek)->make(true);

        } else if ($id === 'getKelUt') {
            // mendapatkan daftar kelompok utama
            $kelut = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama @XIdObjek_KelompokUtama = ?', [$objekId]);
            $data_kelut = [];
            foreach ($kelut as $detail_kelut) {
                $data_kelut[] = [
                    'NamaKelompokUtama' => $detail_kelut->NamaKelompokUtama,
                    'IdKelompokUtama' => $detail_kelut->IdKelompokUtama
                ];
            }
            return datatables($kelut)->make(true);

        } else if ($id === 'getKelompok') {
            // mendapatkan daftar kelompok
            $kelompok = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok @XIdKelompokUtama_Kelompok = ?', [$kelutId]);
            $data_kelompok = [];
            foreach ($kelompok as $detail_kelompok) {
                $data_kelompok[] = [
                    'idkelompok' => $detail_kelompok->idkelompok,
                    'namakelompok' => $detail_kelompok->namakelompok
                ];
            }
            return datatables($kelompok)->make(true);

        } else if ($id === 'getSubkel') {
            // mendapatkan daftar sub kelompok
            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?', [$kelompokId]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);

        } else if ($id === 'getKatut') {
            // mendapatkan daftar kategori utama
            $katUtama = DB::connection('ConnKCNPurchase')->select('exec SP_1003_INV_mohon_beli @MyType = 1');
            $data_katUtama = [];
            foreach ($katUtama as $detail_katUtama) {
                $data_katUtama[] = [
                    'no_kat_utama' => $detail_katUtama->no_kat_utama,
                    'nama' => $detail_katUtama->nama
                ];
            }
            return datatables($katUtama)->make(true);

        } else if ($id === 'getKategori') {
            // mendapatkan daftar kategori
            $kategori = DB::connection('ConnKCNPurchase')->select('exec SP_1003_INV_mohon_beli @MyType = 2, @MyValue = ?', [$no_katUtama]);
            $data_kategori = [];
            foreach ($kategori as $detail_kategori) {
                $data_kategori[] = [
                    'no_kategori' => $detail_kategori->no_kategori,
                    'nama_kategori' => $detail_kategori->nama_kategori
                ];
            }
            return datatables($kategori)->make(true);

        } else if ($id === 'getSubkategori') {
            // mendapatkan daftar sub kategori
            $subKategori = DB::connection('ConnKCNPurchase')->select('exec SP_1003_INV_mohon_beli @MyType = 3, @MyValue = ?', [$no_kategori]);
            $data_subKategori = [];
            foreach ($subKategori as $detail_subKategori) {
                $data_subKategori[] = [
                    'no_sub_kategori' => $detail_subKategori->no_sub_kategori,
                    'nama_sub_kategori' => $detail_subKategori->nama_sub_kategori
                ];
            }
            return datatables($subKategori)->make(true);

        } else if ($id === 'getBarang') {

            // KCC dan WKC menggunakan database KCN_PURCHASE
            if (in_array(strtoupper(trim($divisiId)), ['KCC', 'WKC'])) {
                $barang = DB::connection('ConnKCNPurchase')->select(
                    'exec SP_1003_INV_lihat_type @no_jns_1 = ?',
                    [$no_subkategori]
                );
            } else {
                // Divisi selain KCC dan WKC tetap menggunakan PURCHASE
                $barang = DB::connection('ConnKCNPurchase')->select(
                    'exec SP_1003_INV_lihat_type @no_jns_1 = ?',
                    [$no_subkategori]
                );
            }

            $data_barang = [];

            foreach ($barang as $detail_barang) {
                $data_barang[] = [
                    'KD_BRG' => $detail_barang->KD_BRG,
                    'NAMA_BRG' => $detail_barang->NAMA_BRG
                ];
            }

            return datatables($data_barang)->make(true);
        } else if ($id === 'getSatuanBarang') {
            // KCC dan WKC menggunakan database KCN_PURCHASE
            if (in_array(strtoupper(trim($divisiId)), ['KCC', 'WKC'])) {
                $satuanBarang = DB::connection('ConnKCNPurchase')->select(
                    'exec SP_1003_INV_KdBrg_Satuan_YBarang @KodeBarang = ?',
                    [$kdBarang]
                );
            } else {
                // Divisi selain KCC dan WKC tetap menggunakan PURCHASE
                $satuanBarang = DB::connection('ConnKCNPurchase')->select(
                    'exec SP_1003_INV_KdBrg_Satuan_YBarang @KodeBarang = ?',
                    [$kdBarang]
                );
            }

            $data_satuanBarang = [];

            foreach ($satuanBarang as $detail_satuanBarang) {
                $data_satuanBarang[] = [
                    'NmSat_Tri'  => $detail_satuanBarang->NmSat_Tri,
                    'ST_TRI'     => $detail_satuanBarang->ST_TRI,
                    'NmSat_Sek'  => $detail_satuanBarang->NmSat_Sek,
                    'ST_SEK'     => $detail_satuanBarang->ST_SEK,
                    'NmSat_Prim' => $detail_satuanBarang->NmSat_Prim,
                    'ST_PRIM'    => $detail_satuanBarang->ST_PRIM
                ];
            }

            return response()->json([
                'data_satuanBarang' => $data_satuanBarang
            ]);
        } else if ($id === 'getSatuan') {
            // daftar satuan primer, sekunder, tritier
            $satuan = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_list_satuan');
            $data_satuan = [];
            foreach ($satuan as $detail_satuan) {
                $data_satuan[] = [
                    'no_satuan' => $detail_satuan->no_satuan,
                    'nama_satuan' => $detail_satuan->nama_satuan
                ];
            }
            return datatables($satuan)->make(true);

        } else if ($id === 'getListKoreksi') {
            // daftar kode barang untuk koreksi
            $getKoreksi = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_idsubkelompok_type @kd = 1, @XIdSubKelompok_Type = ?', [$subkelId]);
            $data_getKoreksi = [];
            foreach ($getKoreksi as $detail_getKoreksi) {
                $namaType = explode('[', $detail_getKoreksi->NamaType)[0];
                $data_getKoreksi[] = [
                    'IdType' => $detail_getKoreksi->IdType,
                    'namaType' => trim($namaType)
                ];
            }
            // dd($data_getKoreksi);
            return datatables($data_getKoreksi)->make(true);

        } else if ($id === 'getSatuanKodeBarang') {
            // get beberapa data untuk koreksi
            $unit = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_NamaType_Type  @IdType = ?, @IdSubKel = ?', [$idtype, $subkelId]);

            $data_unit = [];
            foreach ($unit as $detail_unit) {
                $data_unit[] = [
                    'NamaType' => $detail_unit->NamaType,
                    'UraianType' => $detail_unit->UraianType,
                    'KodeBarang' => $detail_unit->KodeBarang,
                    'PIB' => $detail_unit->PIB,
                    'PEB' => $detail_unit->PEB,
                    'PakaiAturanKonversi' => $detail_unit->PakaiAturanKonversi,
                    'KonvSekunderKePrimer' => $detail_unit->KonvSekunderKePrimer,
                    'KonvTritierKeSekunder' => $detail_unit->KonvTritierKeSekunder,
                    'satuan_tritier' => $detail_unit->satuan_tritier,
                    'kdSatTertier' => $detail_unit->kdSatTertier,
                    'satuan_sekunder' => $detail_unit->satuan_sekunder,
                    'kdSatSekunder' => $detail_unit->kdSatSekunder,
                    'satuan_primer' => $detail_unit->satuan_primer,
                    'kdSatPrimer' => $detail_unit->kdSatPrimer
                ];
            }

            $kode = DB::connection('ConnKCNPurchase')->select('exec SP_1003_INV_mohon_beli @MyType = 6, @MyValue = ?', [$detail_unit->KodeBarang]);

            $data_kode = [];
            foreach ($kode as $detail_kode) {
                $data_kode[] = [
                    'KD_BRG' => $detail_kode->KD_BRG,
                    'NAMA_BRG' => $detail_kode->NAMA_BRG,
                    'SubKategory' => $detail_kode->SubKategory,
                    'Kategory' => $detail_kode->Kategory,
                    'Kategory_Utama' => $detail_kode->Kategory_Utama
                ];
            }

            $response_data = [
                'data_unit' => $data_unit,
                'data_kode' => $data_kode
            ];

            // dd($response_data);

            return response()->json($response_data);

        } else if ($id === 'getSatuanUmum') {
            // daftar kode barang untuk koreksi
            $cekSatuanType = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_satumum_type @idtype = ?', [$idtype]);
            $satuan_umum = $cekSatuanType[0]->SatuanUmum;
            // dd($request->all(), $satuan_umum);

            if (!empty($satuan_umum)) {
                // dd('masuk');
                $satuanFinal = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_nama_satumum @no_satumum = ?', [$satuan_umum]);
                $satuan_final = trim($satuanFinal[0]->nama_satuan);
                // dd($satuan_final);


                return response()->json($satuan_final);
            } else {
                return response()->json([]);
            }

        } else if ($id === 'fillKodeBarang') {
            if (in_array(strtoupper(trim($divisiId)), ['KCC', 'WKC'])) {

                $fill = DB::connection('ConnKCNPurchase')->select(
                    'exec SP_1003_INV_List_Detail_YTransType @kd_brg_1 = ?',
                    [$kdBarang]
                );

            } else {

                $fill = DB::connection('ConnKCNPurchase')->select(
                    'exec SP_1003_INV_List_Detail_YTransType @kd_brg_1 = ?',
                    [$kdBarang]
                );
            }

            if (count($fill) > 0) {
                $data_fill = [];
                foreach ($fill as $detail_fill) {
                    $data_fill[] = [
                        'kat_utama' => $detail_fill->kat_utama,
                        'no_kat_utama' => $detail_fill->no_kat_utama,
                        'no_kategori' => $detail_fill->no_kategori,
                        'nama_kategori' => $detail_fill->nama_kategori,
                        'no_sub_kategori' => $detail_fill->no_sub_kategori,
                        'nama_sub_kategori' => $detail_fill->nama_sub_kategori,
                        'KD_BRG' => $detail_fill->KD_BRG,
                        'NAMA_BRG' => $detail_fill->NAMA_BRG,
                        'No_Sat_Tri' => $detail_fill->No_Sat_Tri,
                        'Tritier' => $detail_fill->Tritier,
                        'No_Sat_Sek' => $detail_fill->No_Sat_Sek,
                        'Sekunder' => $detail_fill->Sekunder,
                        'No_Sat_Prim' => $detail_fill->No_Sat_Prim,
                        'Primer' => $detail_fill->Primer,
                        'No_Sat' => $detail_fill->No_Sat,
                        'Satuan' => $detail_fill->Satuan,
                        'KET' => $detail_fill->KET
                    ];
                }
                // dd($data_fill);
                return response()->json($data_fill);
            }

        } else if ($id === 'proses') {

            if ($subkelId === null) {
                return response()->json([
                    'error' => true,
                    'errorType' => 'subkelIdEmpty',
                    'message' => 'ID Sub Kelompok Kosong!'
                ]);
            }

            // proses terjadi
            if ($a === 1) { // ISI
                // cek id kode barang
                // dd($request->all());

                if ($impor === 1) {
                    // Jika impor bernilai 1, jalankan query dengan @kd dan @noPIB
                    $cekKodeBarang = DB::connection('ConnKCNInventory')->select(
                        'exec SP_1003_INV_CheckKodeBarang_Type @kd = 1, @noPIB = ?, @XKodebarang = ?, @XIdSubKelompok = ?',
                        [$PIB, $kdBarang, $subkelId]
                    );
                } else {
                    // Jika impor tidak bernilai 1, jalankan query tanpa @kd dan @noPIB
                    $cekKodeBarang = DB::connection('ConnKCNInventory')->select(
                        'exec SP_1003_INV_CheckKodeBarang_Type @XKodebarang = ?, @XIdSubKelompok = ?',
                        [$kdBarang, $subkelId]
                    );
                }

                // dd($cekKodeBarang);

                if (count($cekKodeBarang) > 0) {
                    return response()->json([
                        'error' => true,
                        'errorType' => 'kodeBarangExists',
                        'data' => $cekKodeBarang
                    ], 500);
                } else {
                    // cek counter
                    $cekTabel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_List_Counter');
                    if (!empty($cekTabel)) {
                        $idtype = $cekTabel[0]->IdType + 1;
                    }
                    $idtype = str_pad($idtype, 20, '0', STR_PAD_LEFT);

                    DB::connection('ConnKCNInventory')->statement(
                        'exec SP_1003_INV_insert_type
                        @XIdType = ?, @XNamaType = ?, @XUraianType = ?, @XIdSubKelompok_Type = ?, @XKodeBarang = ?,
                        @XSaatStokAwal = ?, @XStokAwalPrimer = ?, @XTotalPemasukanPrimer = ?, @XSaldoPrimer = ?, @XUnitPrimer = ?,
                        @XStokAwalSekunder = ?, @XTotalPemasukanSekunder = ?, @XSaldoSekunder = ?, @XUnitSekunder = ?,
                        @XStokAwalTritier = ?, @XTotalPemasukanTritier = ?, @XSaldoTritier = ?, @XUnitTritier = ?,
                        @XPakaiAturanKonversi = ?, @XKonvSekunderKePrimer = ?, @XKonvTritierkeSekunder = ?, @XNonaktif = ?,
                        @XMinimumStok = ?, @Xno_satuan_umum = ?, @userInput = ?, @noPIB = ?, @noPEB = ?',
                    [
                        $idtype, $namaType, $uraianType, $subkelId, $kdBarang,
                        now(), 0,0,0, $no_primer,
                        0,0,0, $no_sekunder,
                        0,0,0, $no_tritier,
                        $konversi, $primerSekunder, $sekunderTritier, "Y",
                        0, $satuanUmum, $user, $PIB, $PEB
                    ]);
                    // dd($request->all());


                    DB::connection('ConnKCNInventory')->statement('exec SP_1003_INV_Update_IdType_Counter @XIdType = ?',[$idtype]);

                    return response()->json(['success' => true, 'data' => [['idtype' => $idtype]]], 200);
                }
            } else if ($a === 2) { // KOREKSI

                $query = 'exec SP_1003_INV_update_type
                    @XIdType = ?, @XNamaType = ?, @XUraianType = ?, @XIdSubKelompok_Type = ?, @XKodeBarang = ?,
                    @XUnitPrimer = ?, @XUnitSekunder = ?, @XUnitTritier = ?, @XPakaiAturanKonversi = ?,
                    @XKonvSekunderKePrimer = ?, @XKonvTritierkeSekunder = ?, @Xno_satuan_umum = ?';

                $params = [
                    $kodeType, $namaType, $uraianType, $subkelId, $kdBarang,
                    $no_primer, $no_sekunder, $no_tritier, $konversi,
                    $primerSekunder, $sekunderTritier, $satuanUmum
                ];

                if ($PIB !== null) {
                    $query .= ', @noPIB = ?';
                    $params[] = $PIB;
                }

                if ($PEB !== null) {
                    $query .= ', @noPEB = ?';
                    $params[] = $PEB;
                }

                // dd($request->all(), $params);

                DB::connection('ConnKCNInventory')->statement($query, $params);

                return response()->json(['success' => 'Data updated successfully'], 200);
            }

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
    public function destroy(Request $request, $id)
    {
        if ($id === 'hapusMaintenance') {
            $idtype = $request->input('idtype');

            $jumlah = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_CheckIdType_Transaksi @XIdType = ?', [$idtype]);

            if (count($jumlah) > 0) {
                DB::connection('ConnKCNInventory')->statement('exec SP_1003_INV_delete_type @XIdType = ?', [$idtype]);
            } else {
                return response()->json(['error' => "Type : #{$idtype} Tidak Dapat Di Hapus. Karena Sudah Terjadi Transaksi."], 200);
            }

            return response()->json(['success' => 'Data deleted successfully'], 200);
        }
    }
}
