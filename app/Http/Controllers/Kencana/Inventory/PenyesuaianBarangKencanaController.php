<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;


class PenyesuaianBarangKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Inventory.PenyesuaianBarang', compact('access'));
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

        $pemohon = $request->input('pemohon');
        $kodeTransaksi = $request->input('kodeTransaksi');
        $kodeType = $request->input('kodeType');
        $alasan = $request->input('alasan');
        $uraian = trim($alasan) === null ? '' : trim($alasan);
        $kodeBarang = $request->input('kodeBarang');
        $PIB = $request->input('PIB');


        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        } else if ($id === 'getDivisi') {
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
            // dd($detail_listABM);
            return datatables($detail_listABM)->make(true);
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
                        'Satuan_Tritier' => $detail_type->Satuan_Tritier,
                        'PIB' => $detail_type->PIB,
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
                    'SaldoTritier' => $detail_saldo->SaldoTritier,

                ];
            }
            // dd($data_saldo);
            return response()->json($data_saldo);
        } else if ($id === 'getTypeCIR') {
            // mendapatkan nama type & id type
            DB::connection('ConnKCNInventory')->statement('exec SP_1003_INV_idnamasubkelompok_type @XIdDivisi = ?, @XIdSubKelompok = ?', [$divisiId, $subkelId]);

            $typeCIR = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_List_Type_PerUkuran');
            $data_typeCIR = [];
            foreach ($typeCIR as $detail_typeCIR) {
                $data_typeCIR[] = [
                    'Id_Type' => $detail_typeCIR->Id_Type,
                    'Nm_Type' => $detail_typeCIR->Nm_Type
                ];
            }

            // dd($data_typeCIR);
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
            dd($request->all(), $data_type);
            return response()->json($data_type);
        } else if ($id === 'getSelect') {
            // mendapatkan saldo, satuan, pemasukan unk selected data table
            $selectData = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_AsalSubKelompok_Transaksi @XIdTransaksi = ?', [$kodeTransaksi]);
            $data_selectData = [];
            foreach ($selectData as $detail_selectData) {
                $data_selectData[] = [
                    'SaldoPrimer' => $detail_selectData->SaldoPrimer,
                    'SaldoSekunder' => $detail_selectData->SaldoSekunder,
                    'SaldoTritier' => $detail_selectData->SaldoTritier,
                    'Satuan_Primer' => $detail_selectData->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_selectData->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_selectData->Satuan_Tritier,
                    'JumlahPemasukanPrimer' => $detail_selectData->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_selectData->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_selectData->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $detail_selectData->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_selectData->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_selectData->JumlahPengeluaranTritier,
                    'IdSubkelompok' => $detail_selectData->IdSubkelompok

                ];
            }

            foreach ($data_selectData as $key => $data) {
                // PRIMER
                if ($data['JumlahPemasukanPrimer'] > 0) {
                    $primer2 = $data['JumlahPemasukanPrimer'] + $data['SaldoPrimer'];
                } else {
                    $primer2 = $data['JumlahPemasukanPrimer'] + $data['SaldoPrimer'];
                }

                if ($data['JumlahPengeluaranPrimer'] > 0) {
                    $primer2 -= $data['JumlahPengeluaranPrimer'];
                } else {
                    $primer2 += $data['JumlahPengeluaranPrimer'];
                }

                $data_selectData[$key]['SaldoPrimer2'] = $primer2;

                // SEKUNDER
                if ($data['JumlahPemasukanSekunder'] > 0) {
                    $sekunder2 = $data['JumlahPemasukanSekunder'] + $data['SaldoSekunder'];
                } else {
                    $sekunder2 = $data['JumlahPemasukanSekunder'] + $data['SaldoSekunder'];
                }

                if ($data['JumlahPengeluaranSekunder'] > 0) {
                    $sekunder2 -= $data['JumlahPengeluaranSekunder'];
                } else {
                    $sekunder2 += $data['JumlahPengeluaranSekunder'];
                }

                $data_selectData[$key]['SaldoSekunder2'] = $sekunder2;

                // TRITIER
                if ($data['JumlahPemasukanTritier'] > 0) {
                    $tritier2 = $data['JumlahPemasukanTritier'] + $data['SaldoTritier'];
                } else {
                    $tritier2 = $data['JumlahPemasukanTritier'] + $data['SaldoTritier'];
                }

                if ($data['JumlahPengeluaranTritier'] > 0) {
                    $tritier2 -= $data['JumlahPengeluaranTritier'];
                } else {
                    $tritier2 += $data['JumlahPengeluaranTritier'];
                }

                $data_selectData[$key]['SaldoTritier2'] = round($tritier2, 2);
            }

            // dd($request->all(), $data_selectData);
            return response()->json($data_selectData);
        } else if ($id === 'getAllData') {
            // menampilkan semua data di data table
            $allData = DB::connection('ConnKCNInventory')->select('
            exec SP_1003_INV_AllPenerima_BlmACC_Transaksi @XIdDivisi = ?, @XIdTypeTransaksi = ?', [$divisiId, '06']);
            $data_allData = [];
            foreach ($allData as $detail_allData) {
                $formattedDate = date('m/d/Y', strtotime($detail_allData->SaatAwalTransaksi));

                $data_allData[] = [
                    'IdTransaksi' => $detail_allData->IdTransaksi,
                    'NamaType' => $detail_allData->NamaType,
                    'UraianDetailTransaksi' => $detail_allData->UraianDetailTransaksi,
                    'NamaUser' => $detail_allData->NamaUser,
                    'SaatAwalTransaksi' => $formattedDate,
                    'NamaDivisi' => $detail_allData->NamaDivisi,
                    'NamaObjek' => $detail_allData->NamaObjek,
                    'NamaKelompokUtama' => $detail_allData->NamaKelompokUtama,
                    'NamaKelompok' => $detail_allData->NamaKelompok,
                    'NamaSubKelompok' => $detail_allData->NamaSubKelompok,
                    'IdPenerima' => $detail_allData->IdPenerima,
                    'IdObjek' => $detail_allData->IdObjek
                ];
            }
            // dd($request->all(), $data_allData);
            return response()->json($data_allData);
        } else if ($id === 'getData') {
            // menampilkan pemohon data di data table
            $justData = DB::connection('ConnKCNInventory')->select('
            exec SP_1003_INV_IdPenerima_BlmACC_Transaksi @XIdDivisi = ?, @XIdTypeTransaksi = ?, @XIdPenerima = ?', [$divisiId, '06', $pemohon]);
            $data_justData = [];
            foreach ($justData as $detail_justData) {
                $formattedDate = date('m/d/Y', strtotime($detail_justData->SaatAwalTransaksi));

                $data_justData[] = [
                    'IdTransaksi' => $detail_justData->IdTransaksi,
                    'NamaType' => $detail_justData->NamaType,
                    'UraianDetailTransaksi' => $detail_justData->UraianDetailTransaksi,
                    'NamaUser' => $detail_justData->NamaUser,
                    'SaatAwalTransaksi' => $formattedDate,
                    'NamaDivisi' => $detail_justData->NamaDivisi,
                    'NamaObjek' => $detail_justData->NamaObjek,
                    'NamaKelompokUtama' => $detail_justData->NamaKelompokUtama,
                    'NamaKelompok' => $detail_justData->NamaKelompok,
                    'NamaSubKelompok' => $detail_justData->NamaSubKelompok,
                    'IdPenerima' => $detail_justData->IdPenerima,
                ];
            }
            // dd($data_justData);
            return response()->json($data_justData);
        } else if ($id === 'getSubkelId') {
            // mendapatkan subkel id
            $subkelId = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Cek_SubKel @IdType = ?', [$kodeType]);
            $data_subkelId = [];
            foreach ($subkelId as $detail_subkelId) {
                $data_subkelId[] = [
                    'idsubkel' => $detail_subkelId->idsubkel
                ];
            }
            // dd($data_subkelId, $request->all());
            return response()->json($data_subkelId);
        } else if ($id === 'cekKodeBarang') {
            // cek kode barang dari input
            $kode = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_cekkodebarang_type @XKodeBarang = ?, @XIdSubKelompok = ?', [$kodeBarang, $subkelId]);

            $jumlah = (int) $kode[0]->Jumlah;

            if ($jumlah > 0) {
                return response()->json(['warning' => 'Tidak Ada Kode Barang : ' . $kodeBarang . 'Pada sub kel : ' . $subkelId], 200);
            } else {
                $barang = DB::connection('ConnKCNInventory')->select(
                    'exec SP_1273_INV_kodebarang_type1 @XKodeBarang = ?, @XIdSubKelompok = ?, @XPIB = ?',
                    [$kodeBarang, $subkelId, $PIB]
                );
            }

            $data_barang = [];
            foreach ($barang as $detail_barang) {
                $data_barang[] = [
                    'IdType' => $detail_barang->IdType,
                    'NamaType' => $detail_barang->NamaType,
                    'KodeBarang' => $detail_barang->KodeBarang,
                    'SaldoPrimer' => $detail_barang->SaldoPrimer,
                    'SaldoSekunder' => $detail_barang->SaldoSekunder,
                    'SaldoTritier' => $detail_barang->SaldoTritier,
                    'Satuan_Primer' => $detail_barang->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_barang->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_barang->Satuan_Tritier,
                ];
            }
            // dd($request->all(), $data_barang);
            return response()->json($data_barang);

        } else if ($id === 'getHargaSatuan') {
            $kodeTransaksi = $request->input('kodeTransaksi');

            $harga = DB::connection('ConnKCNInventory')
                ->table('Transaksi')
                ->where('IdTransaksi', $kodeTransaksi)
                ->value('HargaSatuan');
            // dd($harga);
            return response()->json([
                'harga_satuan' => $harga
            ]);
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
        $a = (int) $request->input('a');
        $subkelId = $request->input('subkelId');
        $tanggal = $request->input('tanggal');
        $pemohon = $request->input('pemohon');
        $kodeTransaksi = $request->input('kodeTransaksi');
        $kodeType = $request->input('kodeType');
        $alasan = $request->input('alasan');
        $uraian = trim($alasan) === null ? '' : trim($alasan);
        $primer3 = $request->input('primer3');
        $sekunder3 = $request->input('sekunder3');
        $tritier3 = $request->input('tritier3');
        $XhargaSatuan = (float) str_replace(',', '', $request->input('hargaSatuan'));
        // dd($request->all());

        if ($id === 'proses') {
            // proses terjadi
            if ($a === 1) { // ISI
                // dd($request->all());
                try {
                    // insert
                    DB::connection('ConnKCNInventory')->statement(
                        'exec SP_1003_INV_Insert_06_Transaksi
                        @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XIdType = ?,  @XIdPenerima = ?, @XSaatawalTransaksi = ?,
                        @XPrimer = ?, @XSekunder = ?, @XTritier = ?, @XAsalIdSubKelompok = ?, @XTujuanIdSubKelompok = ?, @HargaSatuan = ?',
                        [
                            '06',
                            $uraian,
                            $kodeType,
                            $pemohon,
                            $tanggal,
                            $primer3,
                            $sekunder3,
                            $tritier3,
                            $subkelId,
                            $subkelId,
                            $XhargaSatuan
                        ]
                    );


                    return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data Gagal ter-SIMPAN' . $e->getMessage()], 500);
                }
            } else if ($a === 2) { // KOREKSI
                try {
                    // update
                    DB::connection('ConnKCNInventory')->statement(
                        'exec SP_1003_INV_update_Penyesuaian_Transaksi
                        @XIdTransaksi = ?, @Xuraian = ?, @XPrimer = ?, @XSekunder = ?, @XTritier = ?, @HargaSatuan = ?',
                        [$kodeTransaksi, $uraian, $primer3, $sekunder3, $tritier3, $XhargaSatuan]
                    );

                    // dd($request->all());

                    return response()->json(['success' => 'Data terKOREKSI'], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data Gagal ter-KOREKSI' . $e->getMessage()], 500);
                }
            }
        }

        //ins persediaan
        else if ($id == 'insPersediaan') {
            $XIdType = $request->input('XIdType');
            $XJumlahKeluarTritier = $request->input('XJumlahKeluarTritier');
            $XhargaSatuan = (float) str_replace(',', '', $request->input('hargaSatuan'));
            $kode = $request->input('kondisi');
            // dd($request->all());
            if ($kode == '1') {
                $kode = null;
            } else if ($kode == '2') {
                $kode = 2;
            }
            // dd($XhargaSatuan);
            // dd($request->all());
            // dd($kode);
            try {
                DB::connection('ConnKCNInventory')
                    ->statement('exec SP_4451_UpdateHarga_Persediaan
                @Kode = ?,
                @IdType = ?,
                @JumlahTritier = ?,
                @HargaSatuan = ?', [
                        $kode,
                        $XIdType,
                        $XJumlahKeluarTritier,
                        $XhargaSatuan,
                    ]);

                return response()->json([
                    'success' => 'Data Telah Terkoreksi, idtransaksi : '
                ]);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diPROSES: ' . $e->getMessage()]);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request, $id)
    {
        $kodeTransaksi = $request->input('kodeTransaksi');
        if ($id === 'hapusBarang') {
            try {
                DB::connection('ConnKCNInventory')->statement('exec SP_1003_INV_Delete_Transaksi  @XIdTransaksi = ?', [$kodeTransaksi]);

                return response()->json(['success' => 'Data sudah diHAPUS'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }
    }
}
