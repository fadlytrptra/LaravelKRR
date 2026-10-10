<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class MhnPenerimaKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Inventory.MhnPenerima', compact('access'));
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

        $divisiId2 = $request->input('divisiId2');
        $objekId2 = $request->input('objekId2');
        $objekNama2 = $request->input('objekNama2');
        $kelompokId2 = $request->input('kelompokId2');
        $kelutId2 = $request->input('kelutId2');
        $subkelId2 = $request->input('subkelId2');

        $kodeType = $request->input('kodeType');
        $kodeBarang = $request->input('kodeBarang');
        $PIB = $request->input('PIB');
        $kodeTransaksi = $request->input('kodeTransaksi');


        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        } else if ($id === 'getDivisi2') {
            // mendapatkan daftar divisi penerima
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
        } else if ($id === 'getObjek2') {
            // mendapatkan daftar objek penerima
            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$user, $divisiId2]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'IdObjek' => $detail_objek->IdObjek
                ];
            }
            // dd($objek, $request->all());
            return datatables($objek)->make(true);
        } else if ($id === 'getKelUt2') {
            // mendapatkan daftar kelompok utama penerima
            $kelut = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama @XIdObjek_KelompokUtama = ?', [$objekId2]);
            $data_kelut = [];
            foreach ($kelut as $detail_kelut) {
                $data_kelut[] = [
                    'NamaKelompokUtama' => $detail_kelut->NamaKelompokUtama,
                    'IdKelompokUtama' => $detail_kelut->IdKelompokUtama
                ];
            }
            return datatables($kelut)->make(true);
        } else if ($id === 'getKelompok2') {
            // mendapatkan daftar kelompok penerima
            $kelompok = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok @XIdKelompokUtama_Kelompok = ?', [$kelutId2]);
            $data_kelompok = [];
            foreach ($kelompok as $detail_kelompok) {
                $data_kelompok[] = [
                    'idkelompok' => $detail_kelompok->idkelompok,
                    'namakelompok' => $detail_kelompok->namakelompok
                ];
            }
            return datatables($kelompok)->make(true);
        } else if ($id === 'getSubkel2') {
            // mendapatkan daftar sub kelompok penerima
            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?', [$kelompokId2]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);
        } else if ($id === 'getDivisi') {
            // mendapatkan daftar divisi pemberi
            $divisi = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_UserDivisi_Diminta @XKdUser = ?', [$user]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'IdDivisi' => $detail_divisi->IdDivisi
                ];
            }
            return datatables($divisi)->make(true);
        } else if ($id === 'getObjek') {
            // mendapatkan daftar objek penerima
            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_UserObjek_Diminta @XKdUser = ?, @XIdDivisi = ?', [$user, $divisiId]);
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
            // mendapatkan daftar kelompok utama penerima
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
            // mendapatkan daftar kelompok penerima
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
            // mendapatkan daftar sub kelompok penerima
            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?', [$kelompokId]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);
        } else if ($id === 'getSubkelType') {
            // mendapatkan daftar sub kelompok type
            $subkeltype = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdSubKelompok_Type @XIdSubKelompok_Type = ?', [$subkelId]);
            $data_subkeltype = [];
            foreach ($subkeltype as $detail_subkeltype) {
                $data_subkeltype[] = [
                    'IdType' => $detail_subkeltype->IdType,
                    'NamaType' => $detail_subkeltype->NamaType
                ];
            }

            return datatables($subkeltype)->make(true);
        } else if ($id === 'getType') {
            // get type
            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_NamaType_Type @IdType = ?, @IdSubKel = ?', [$kodeType, $subkelId]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'PIB' => $detail_subkel->PIB
                ];
            }
            // dd($data_subkel, $request->all());
            return response()->json($data_subkel);
        } else if ($id === 'cekPIB') {
            $divisiNama2 = $request->input('divisiNama2');
            $subkelNama2 = $request->input('subkelNama2');

            $cekPIB = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_KodeBarang_Type @XKodeBarang = ?, @XIdSubKelompok = ?, @XPIB = ?', [$kodeBarang, $subkelId2, $PIB]);

            if (count($cekPIB) > 0) {
                return response()->json(['success' => true], 200);
            } else {
                $warningMessage = 'Lakukan maintenance type sebelum melanjutkan proses mutasi!<br>'
                    . 'Kode Barang: ' . htmlspecialchars($kodeBarang, ENT_QUOTES, 'UTF-8') . '<br>'
                    . 'Divisi: ' . htmlspecialchars($divisiNama2, ENT_QUOTES, 'UTF-8') . '<br>'
                    . 'Sub Kelompok: ' . htmlspecialchars($subkelNama2, ENT_QUOTES, 'UTF-8');

                return response()->json(['warning' => $warningMessage], 200);
            }
        } else if ($id === 'cekType') {
            // get saldo, satuan & total pengeluaran
            $type = DB::connection('ConnKCNInventory')->select('exec SP_1273_INV_kodebarang_type1 @XKodeBarang = ?, @XIdSubKelompok = ?, @XPIB = ?', [$kodeBarang, $subkelId, $PIB]);

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

            // get total saldo
            $totalSaldo = DB::connection('ConnKCNInventory')->select('exec SP_1273_INV_CekBelumACC @IdTypeTransaksi = ?, @IdType = ?', ['02', $data_type[0]['IdType']]);

            $data_totalSaldo = [];
            foreach ($totalSaldo as $detail_totalSaldo) {
                $data_totalSaldo[] = [
                    'Primer' => $detail_totalSaldo->Primer,
                    'Sekunder' => $detail_totalSaldo->Sekunder,
                    'Tritier' => $detail_totalSaldo->Tritier
                ];
            }

            $response_data = [
                'typeData' => $data_type,
                'totalSaldoData' => $data_totalSaldo
            ];

            // dd($request->all(), $response_data);
            return response()->json($response_data);

        } else if ($id === 'kodeBarangTerima') {
            // ambil satuan
            $satuan = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_KodeBarang_Type @XKodeBarang = ?, @XIdSubKelompok = ?, @XPIB = ?', [$kodeBarang, $subkelId2, $PIB]);

            $data_satuan = [];
            foreach ($satuan as $detail_satuan) {
                $data_satuan[] = [
                    'satuan_primer' => $detail_satuan->satuan_primer,
                    'satuan_sekunder' => $detail_satuan->satuan_sekunder,
                    'satuan_tritier' => $detail_satuan->satuan_tritier,
                    'PakaiAturanKonversi' => $detail_satuan->PakaiAturanKonversi
                ];
            }
            // dd($request->all(), $data_satuan);
            return response()->json($data_satuan);

        } else if ($id === 'getSelect') {
            // mendapatkan saldo, satuan, pemasukan unk selected data table
            $selectData = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_TujuanSubKelompok_TmpTransaksi @XIdTransaksi = ?', [$kodeTransaksi]);
            $data_selectData = [];
            foreach ($selectData as $detail_selectData) {
                $data_selectData[] = [
                    'IdDivisi' => $detail_selectData->IdDivisi,
                    'IdObjek' => $detail_selectData->IdObjek,
                    'IdKelompokUtama' => $detail_selectData->IdKelompokUtama,
                    'IdKelompok' => $detail_selectData->IdKelompok,
                    'IdSubkelompok' => $detail_selectData->IdSubkelompok
                ];
            }

            $identity = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_AsalSubKelompok_TmpTransaksi @XIdTransaksi = ?', [$kodeTransaksi]);

            $data_identity = [];
            foreach ($identity as $detail_identity) {
                $data_identity[] = [
                    'IdDivisi' => $detail_identity->IdDivisi,
                    'NamaDivisi' => $detail_identity->NamaDivisi,
                    'IdObjek' => $detail_identity->IdObjek,
                    'NamaObjek' => $detail_identity->NamaObjek,
                    'IdKelompokUtama' => $detail_identity->IdKelompokUtama,
                    'NamaKelompokUtama' => $detail_identity->NamaKelompokUtama,
                    'IdKelompok' => $detail_identity->IdKelompok,
                    'NamaKelompok' => $detail_identity->NamaKelompok,
                    'IdSubkelompok' => $detail_identity->IdSubkelompok,
                    'NamaSubKelompok' => $detail_identity->NamaSubKelompok
                ];
            }

            $response_data = [
                'data_selectData' => $data_selectData,
                'identityData' => $data_identity
            ];

            return response()->json($response_data);
        } else if ($id === 'getAllData') {
            // dd($objekNama2);
            // dd($request->all());
            // menampilkan semua data di data table
            if (str_contains($objekNama2, 'Sparepart') || $objekNama2 === 'Bahan produksi' || $objekNama2 === 'Bahan Pembantu' || str_contains($objekNama2, 'Pengambilan')) {
                $kode = 11;
            } else {
                $kode = 2;
            }
            // dd($kode);
            $allData = DB::connection('ConnKCNInventory')->select('
            exec SP_1003_INV_List_Mohon_TmpTransaksi @Kode = ?, @XIdDivisi = ?, @XIdTypeTransaksi = ?', [$kode, $divisiId2, '02']);
            // dd($allData);
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
                    'KodeBarang' => $detail_allData->KodeBarang,
                    'IdType' => $detail_allData->IdType,
                    'JumlahPengeluaranPrimer' => $detail_allData->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_allData->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_allData->JumlahPengeluaranTritier,
                    'SatPrimer' => $detail_allData->SatPrimer,
                    'SatSekunder' => $detail_allData->SatSekunder,
                    'SatTritier' => $detail_allData->SatTritier,
                    'IdPenerima1' => $detail_allData->IdPenerima1
                ];
            }
            // dd($request->all(), $data_allData);
            return response()->json($data_allData);
        } else if ($id === 'getData') {
            // menampilkan pemohon data di data table
            if (str_contains($objekNama2, 'Sparepart') || $objekNama2 === 'Bahan produksi' || $objekNama2 === 'Bahan Pembantu') {
                $kode = 12;
            } else {
                $kode = 1;
            }

            $justData = DB::connection('ConnKCNInventory')->select('
            exec SP_1003_INV_List_Mohon_TmpTransaksi @Kode = ?, @XIdDivisi = ?, @XIdTypeTransaksi = ?, @XUser = ?', [$kode, $divisiId2, '02', $user]);
            $data_justData = [];
            foreach ($justData as $detail_justData) {
                $formattedDate = date('m/d/Y', strtotime($detail_justData->SaatAwalTransaksi));

                $data_justData[] = [
                    'IdTransaksi' => $detail_justData->IdTransaksi,
                    'NamaType' => $detail_justData->NamaType,
                    'UraianDetailTransaksi' => $detail_justData->UraianDetailTransaksi,
                    'IdPenerima' => $detail_justData->IdPenerima,
                    'SaatAwalTransaksi' => $formattedDate,
                    'NamaDivisi' => $detail_justData->NamaDivisi,
                    'NamaObjek' => $detail_justData->NamaObjek,
                    'NamaKelompokUtama' => $detail_justData->NamaKelompokUtama,
                    'NamaKelompok' => $detail_justData->NamaKelompok,
                    'NamaSubKelompok' => $detail_justData->NamaSubKelompok,
                    'KodeBarang' => $detail_justData->KodeBarang,
                    'IdType' => $detail_justData->IdType,
                    'JumlahPengeluaranPrimer' => $detail_justData->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_justData->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_justData->JumlahPengeluaranTritier,
                    'SatPrimer' => $detail_justData->SatPrimer,
                    'SatSekunder' => $detail_justData->SatSekunder,
                    'SatTritier' => $detail_justData->SatTritier,
                    'IdPenerima1' => $detail_justData->IdPenerima1
                ];
            }
            // dd($request->all());
            // dd($data_justData);
            return response()->json($data_justData);
        } else if ($id === 'getDetailId') {
            // Get id detail
            $detail = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_IdType_Type @XIdType = ?', [$kodeType]);
            $data_detail = [];

            foreach ($detail as $detail_detail) {
                $data_detail[] = [
                    'KodeBarang' => $detail_detail->KodeBarang,
                    'IdSubkelompok_Type' => $detail_detail->IdSubkelompok_Type
                ];
            }

            $acc = true;

            foreach ($data_detail as $item) {
                $cekBarang = DB::connection('ConnKCNInventory')->select('exec SP_5409_INV_CheckKodeBarang_Type @kodebarang = ?, @subkel = ?', [$item['KodeBarang'], $subkelId2]);

                if (count($cekBarang) === 0) {
                    $acc = false;
                    break;
                }
            }

            $response_data = [
                'detailData' => $data_detail,
                'isValid' => $acc
            ];

            // dd($request->all(), $response_data);

            return response()->json($response_data);
        } else if ($id === 'getListType') {
            $tritier3 = $request->input('tritier3');

            $saldo = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_LIST_TYPE @Kode = 1, @IdType = ?', [$kodeType]);

            $data_saldo = array_map(function ($item) {
                return ['SaldoTritier' => $item->SaldoTritier];
            }, $saldo);

            $hasPositiveSaldo = !empty($data_saldo) && $data_saldo[0]['SaldoTritier'] > 0;

            if ($hasPositiveSaldo) {
                $cekAda = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_LIST_TYPE @Kode = 8, @IdType = ?', [$kodeType]);

                $ada = (int) $cekAda[0]->Ada;

                if ($ada > 0) {
                    $data = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_LIST_TYPE @Kode = 9, @IdType = ?', [$kodeType]);

                    $arrData = array_map(function ($item) {
                        return [
                            'NoTerima' => $item->NoTerima,
                            'Qty' => $item->Qty,
                            'Harga' => $item->Harga,
                            'Kurs' => $item->Kurs,
                            'HargaSatuan' => $item->HargaSatuan
                        ];
                    }, $data);

                    // dd($arrData);

                    $saldo = $data_saldo[0]['SaldoTritier'] ?? 0;
                    $totalHarga1 = 0;
                    $saldo1 = $saldo;
                    $qtyKeluar = (float) $tritier3;

                    foreach ($arrData as $index => $item) {
                        $noTerima = $item['NoTerima'];
                        $qty = (float) $item['Qty'];
                        $hargaSatuan = (float) $item['HargaSatuan'];
                        $totalHarga = $qty * $hargaSatuan;

                        $qtyKeluar -= $qty;

                        if ($qtyKeluar <= 0) {
                            DB::connection('ConnPurchase')->statement('exec SP_1273_INV_Update_QtyAvailable @Kode = ?, @NoTerima = ?, @Qty = ?', ['1', $noTerima, $qty]);
                            break;
                        } else {
                            DB::connection('ConnPurchase')->statement('exec SP_1273_INV_Update_QtyAvailable @Kode = ?, @NoTerima = ?, @Qty = ?', ['1', $noTerima, $qtyKeluar]);
                        }

                        $totalHarga1 += $totalHarga;
                    }

                    $txtHarga = $totalHarga1 / $saldo1;

                    DB::connection('ConnKCNInventory')->statement('exec SP_1003_INV_LIST_TYPE @Kode = ?, @IdType = ?, @Harga = ?', ['7', $kodeType, $txtHarga]);

                    if ($txtHarga === '') {
                        $txtHarga = '0';
                    }

                    $response = [
                        'data' => $arrData,
                        'txtHarga' => $txtHarga
                    ];

                    // dd($request->all(), $response);

                    return response()->json($response);
                }
            }
        } else if ($id === 'cekKodeBarang') {
            $subkelNama = $request->input('subkelNama');

            // cek kode barang dari input
            $kode = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_cekkodebarang_type @XKodeBarang = ?, @XIdSubKelompok = ?', [$kodeBarang, $subkelId]);

            $jumlah = (int) $kode[0]->Jumlah;
            // dd($jumlah);

            if ($jumlah === 0) {
                return response()->json(['warning' => 'Tidak Ada Kode Barang : ' . $kodeBarang . '<br> Pada sub kel : ' . $subkelNama], 200);
            } else {
                return response()->json(['success' => true], 200);
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
        $a = (int) $request->input('a');
        $divisiNama = $request->input('divisiNama');
        $objekNama = $request->input('objekNama');

        $kodeTransaksi = $request->input('kodeTransaksi');
        $alasan = $request->input('alasan');
        $uraian = trim($alasan) === null ? '' : trim($alasan);
        $tanggal = $request->input('tanggal');
        $kodeType = $request->input('kodeType');
        $pemohon = $request->input('pemohon');
        $primer3 = $request->input('primer3');
        $sekunder3 = $request->input('sekunder3');
        $tritier3 = $request->input('tritier3');
        $subkelId = $request->input('subkelId');
        $subkelId2 = $request->input('subkelId2');
        $harga = $request->input('harga');
        $PIB = $request->input('PIB');
        $PIBTrim = trim($PIB) === null ? '' : trim($PIB);
        // dd($request->all());
        // dd($a);
        if ($id === 'proses') {
            // proses terjadi
            if ($a === 1) { // ISI
                try {
                    // insert
                    // proses insert tmprtansaksi
                    if (str_contains($divisiNama, 'Warehouse') && (str_contains($objekNama, 'Gudang teknik') || str_contains($objekNama, 'Persediaan'))) {
                        // dd('if1');
                        DB::connection('ConnKCNInventory')->statement(
                            'exec SP_1273_INV_Insert_02_TmpTransaksi
                            @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XSaatawalTransaksi = ?, @XIdType = ?,  @XIdPenerima = ?,
                            @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XAsalIdSubKelompok = ?,
                            @XTujuanIdSubKelompok = ?, @Harga = ?, @XPIB = ?',
                            [
                                '02',
                                $uraian,
                                $tanggal,
                                $kodeType,
                                $pemohon,
                                $primer3,
                                $sekunder3,
                                $tritier3,
                                $subkelId,
                                $subkelId2,
                                $harga,
                                $PIBTrim,
                            ]
                        );
                    } else if (str_contains($objekNama, 'Sparepart')) {
                        // dd('if2');
                        // proses insert tmprtansaksi
                        DB::connection('ConnKCNInventory')->statement(
                            'exec SP_1273_INV_Insert_02_TmpTransaksi
                            @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XSaatAwalTransaksi = ?, @XIdType = ?,  @XIdPenerima = ?,
                            @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XAsalIdSubKelompok = ?,
                            @XTujuanIdSubKelompok = ?, @Harga = ?',
                            [
                                '02',
                                $uraian,
                                $tanggal,
                                $kodeType,
                                $pemohon,
                                $primer3,
                                $sekunder3,
                                $tritier3,
                                $subkelId,
                                $subkelId2,
                                $harga,
                            ]
                        );
                    } else {
                        // dd('if3');
                        DB::connection('ConnKCNInventory')->statement(
                            'exec SP_1003_INV_Insert_02_TmpTransaksi
                            @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XSaatAwalTransaksi = ?, @XIdType = ?,  @XIdPenerima = ?,
                            @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XAsalIdSubKelompok = ?,
                            @XTujuanIdSubKelompok = ?, @Harga = ?, @XPIB = ?',
                            [
                                '02',
                                $uraian,
                                $tanggal,
                                $kodeType,
                                $pemohon,
                                $primer3,
                                $sekunder3,
                                $tritier3,
                                $subkelId,
                                $subkelId2,
                                $harga,
                                $PIBTrim,
                            ]
                        );
                    }
                    return response()->json(['success' => 'Data sudah diSIMPAN !!'], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data Gagal ter-SIMPAN' . $e->getMessage()], 500);
                }
            } else if ($a === 2) { // KOREKSI
                try {
                    // dd($request->all());
                    // update
                    DB::connection('ConnKCNInventory')->statement(
                        'exec SP_1003_INV_Update_TmpTransaksi
                        @XIdTransaksi = ?, @XUraianDetailTransaksi = ?, @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XTujuanSubkelompok = ?',
                        [$kodeTransaksi, $uraian, $primer3, $sekunder3, $tritier3, $subkelId2]
                    );


                    return response()->json(['success' => 'Data sudah diKOREKSI!!'], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data Gagal ter-KOREKSI' . $e->getMessage()], 500);
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

                return response()->json(['success' => 'Data sudah diHAPUS!!'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }
    }
}
