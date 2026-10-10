<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;


class PenghangusanBarangKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Inventory.PenghangusanBarang', compact('access'));
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

        $divisiId = $request->input('divisiId');
        $objekId = $request->input('objekId');
        $kelompokId = $request->input('kelompokId');
        $kelutId = $request->input('kelutId');
        $subkelId = $request->input('subkelId');
        $kodeBarang = $request->input('kodeBarang');

        $kodeTransaksi = $request->input('kodeTransaksi');
        $kodeType = $request->input('kodeType');

        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        }

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
            // dd($objek, $request->all());
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
        } else if ($id === 'getABM') {
            // mendapatkan daftar type ABM
            $listABM = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdSubKelompok_Type_ABM @XIdSubKelompok_Type = ?', [$subkelId]);
            $data_listABM = [];
            foreach ($listABM as $detail_listABM) {
                $data_listABM[] = [
                    'idtype' => $detail_listABM->idtype,
                    'BARU' => $detail_listABM->BARU
                ];
            }
            return datatables($listABM)->make(true);

        } else if ($id === 'getSatuanType') {
            // mendapatkan satuan type
            $type = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_AsalSubKelompok_Type @XIdType = ?', [$kodeType]);
            $data_type = [];
            if (count($type) > 0) {
                foreach ($type as $detail_type) {
                    $data_type[] = [
                        'KodeBarang' => $detail_type->KodeBarang,
                        'NamaType' => $detail_type->NamaType,
                        'Satuan_Primer' => $detail_type->Satuan_Primer,
                        'Satuan_Sekunder' => $detail_type->Satuan_Sekunder,
                        'Satuan_Tritier' => $detail_type->Satuan_Tritier
                    ];
                }
                // dd($data_type);
                return response()->json($data_type);
            }
            return response()->json([]);
        } else if ($id === 'getSaldo') {
            // mendapatkan saldo
            $saldo = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Saldo_Barang @IdType = ?', [$kodeType]);
            $data_saldo = [];
            foreach ($saldo as $detail_saldo) {
                $data_saldo[] = [
                    'SaldoPrimer' => $detail_saldo->SaldoPrimer,
                    'SaldoSekunder' => $detail_saldo->SaldoSekunder,
                    'SaldoTritier' => $detail_saldo->SaldoTritier
                ];
            }
            // dd($data_saldo);
            return response()->json($saldo);

        } else if ($id === 'getTypeCIR') {
            // mendapatkan nama type & id type
            $typeCIR = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_List_Type_PerUkuran');
            $data_typeCIR = [];
            foreach ($typeCIR as $detail_typeCIR) {
                $data_typeCIR[] = [
                    'Id_Type' => $detail_typeCIR->Id_Type,
                    'Nm_Type' => $detail_typeCIR->Nm_Type
                ];
            }
            return datatables($data_typeCIR)->make(true);

        } else if ($id === 'getType') {
            // mendapatkan nama type & id type
            $type = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Idsubkelompok_type @XIdSubKelompok_Type = ?', [$subkelId]);
            $data_type = [];
            foreach ($type as $detail_type) {
                $data_type[] = [
                    'IdType' => $detail_type->IdType,
                    'NamaType' => $detail_type->NamaType
                ];
            }
            // dd($subkelId, $data_type);
            // dd($request->all());
            return datatables($data_type)->make(true);

        } else if ($id === 'getType2') {
            // mendapatkan jumlah dihanguskan
            $type = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_AsalSubKelompok_TmpTransaksi @XIdTransaksi = ?', [$kodeTransaksi]);
            $data_type = [];
            foreach ($type as $detail_type) {
                $data_type[] = [
                    'JumlahPengeluaranPrimer' => $detail_type->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_type->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_type->JumlahPengeluaranTritier
                ];
            }
            // dd($request->all(), $data_type);
            return response()->json($data_type);


        } else if ($id === 'getAllData') {
            // mendapatkan nama type & id type
            $allData = DB::connection('ConnKCNInventory')->select('
            exec SP_1003_INV_List_Mohon_TmpTransaksi @kode = 2, @XIdDivisi = ?, @XIdTypeTransaksi = ?', [$divisiId, '05']);
            $data_allData = [];
            foreach ($allData as $detail_allData) {
                $formattedDate = date('m/d/Y', strtotime($detail_allData->SaatAwalTransaksi));

                $data_allData[] = [
                    'IdTransaksi' => $detail_allData->IdTransaksi,
                    'NamaType' => $detail_allData->NamaType,
                    'UraianDetailTransaksi' => $detail_allData->UraianDetailTransaksi,
                    'IdPenerima' => $detail_allData->IdPenerima,
                    'SaatAwalTransaksi' => $formattedDate,
                    'NamaDivisi' => $detail_allData->NamaDivisi,
                    'NamaObjek' => $detail_allData->NamaObjek,
                    'NamaKelompokUtama' => $detail_allData->NamaKelompokUtama,
                    'NamaKelompok' => $detail_allData->NamaKelompok,
                    'NamaSubKelompok' => $detail_allData->NamaSubKelompok,
                    'IdPenerima1' => $detail_allData->IdPenerima1,
                    'IdType' => $detail_allData->IdType,
                    'KodeBarang' => $detail_allData->KodeBarang,
                    'IdSubkelompok' => $detail_allData->IdSubkelompok
                ];
            }
            // dd($data_allData);
            return response()->json($data_allData);

        } else if ($id === 'fillKodeBarang') {
            $fill = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_cekkodebarang_type @XKodeBarang = ?, @XIdSubKelompok = ?', [$kodeBarang, $subkelId]);

            $jumlah = (int)$fill[0]->Jumlah;

            if ($jumlah > 0) {
                return response()->json(['success' => true]);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'Tidak Ada Kode Barang : '.$kodeBarang.' Pada sub kel : '.$subkelId
                ]);
            }

        } else if ($id === 'cekKodeBarang') {
            // cek kode barang dari input
            $barang = DB::connection('ConnKCNInventory')->select( 'exec SP_1273_INV_kodebarang_type1 @XKodeBarang = ?, @XIdSubKelompok = ?', [$kodeBarang, $subkelId]);

            $data_barang = [];
            foreach ($barang as $detail_barang) {
                $data_barang[] = [
                    'IdType' => $detail_barang->IdType,
                    'NamaType' => $detail_barang->NamaType,
                    'KodeBarang' => $detail_barang->KodeBarang,
                    'SaldoPrimer' => (float)$detail_barang->SaldoPrimer,
                    'SaldoSekunder' => (float)$detail_barang->SaldoSekunder,
                    'SaldoTritier' => (float)$detail_barang->SaldoTritier,
                    'satuan_primer' => $detail_barang->satuan_primer,
                    'satuan_sekunder' => $detail_barang->satuan_sekunder,
                    'satuan_tritier' => $detail_barang->satuan_tritier,
                ];
            }
            // dd($request->all(), $data_barang);
            return response()->json($data_barang);
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
        $a = (int)$request->input('a');
        $subkelId = $request->input('subkelId');
        $tanggal = $request->input('tanggal');
        $pemohon = $request->input('pemohon');
        $kodeTransaksi = $request->input('kodeTransaksi');
        $kodeType = $request->input('kodeType');
        $alasan = $request->input('alasan');
        $uraian = trim($alasan) === null ? '' : trim($alasan);
        $primer2 = $request->input('primer2');
        $sekunder2 = $request->input('sekunder2');
        $tritier2 = $request->input('tritier2');

        if ($id === 'proses') {
            // proses terjadi
            if ($a === 1) { // ISI
                try{
                    // insert ke tmp transaksi unk di tampilkan di table
                    DB::connection('ConnKCNInventory')->statement(
                        'exec SP_1003_INV_Insert_05_TmpTransaksi
                        @XIdTypeTransaksi = ?, @XIdType = ?,  @XIdPenerima = ?, @XIdPemberi = ?, @XSaatawalTransaksi = ?,
                        @XJumlahPengeluaranPrimer = ?, @XJumlahPengeluaranSekunder = ?, @XJumlahPengeluaranTritier = ?,
                        @XAsalIdSubKelompok = ?, @XTujuanIdSubKelompok = ?, @XUraianDetailTransaksi = ?, @kd = 1',
                        ['05', $kodeType, $pemohon, $pemohon, $tanggal,
                        $primer2, $sekunder2, $tritier2,
                        $subkelId, $subkelId, $uraian]
                    );
                    // dd($request->all());
                    return response()->json(['success' => 'Data inserted successfully'], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data insert failed' . $e->getMessage()], 500);
                }
            } else if ($a === 2) { // KOREKSI
                try {
                    // update
                    DB::connection('ConnKCNInventory')->statement(
                        'exec SP_1003_INV_update_TmpTransaksi
                        @XIdTransaksi = ?, @XUraianDetailTransaksi = ?, @XJumlahKeluarPrimer = ?,
                        @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XTujuanSubKelompok = ?',
                        [ $kodeTransaksi, $uraian, $primer2,
                        $sekunder2, $tritier2, $subkelId]
                    );
                    // dd($request->all());
                    return response()->json(['success' => 'Data updated successfully'], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data update failed' . $e->getMessage()], 500);
                }
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request, $id)
    {
        $kodeTransaksi = $request->input('kodeTransaksi');
        if ($id === 'hapusBarang') {
            try {
                DB::connection('ConnKCNInventory')->statement('exec SP_1003_INV_Delete_TmpTransaksi  @XIdTransaksi = ?', [$kodeTransaksi]);

                return response()->json(['success' => 'Data sudah diHAPUS'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }
    }
}
