<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class PemberiBarangKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Inventory.PemberiBarang', compact('access'));
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

        // get all data
        else if ($id === 'getAllData') {
            $XIdObjek = $request->input('XIdObjek');

            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_List_BelumACC_TmpTransaksi
            @Kode = ?, @XIdTypeTransaksi = ?, @XIdObjek = ?', [5, '02', $XIdObjek]);
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
                    'NamaUser' => $detail_objek->NamaUser,
                    'JumlahPengeluaranPrimer' => $detail_objek->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_objek->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_objek->JumlahPengeluaranTritier,
                    'SaatAwalTransaksi' => $detail_objek->SaatAwalTransaksi,
                    'KodeBarang' => $detail_objek->KodeBarang,
                    'KomfirmasiPenerima' => $detail_objek->KomfirmasiPenerima,
                    'IdTypeTransaksi' => $detail_objek->IdTypeTransaksi,
                    'IdDivisi' => $detail_objek->IdDivisi,
                    'IdObjek' => $detail_objek->IdObjek,
                    'KomfirmasiPemberi' => $detail_objek->KomfirmasiPemberi,
                    'IdPenerima' => $detail_objek->IdPenerima,
                    'IdPemberi' => $detail_objek->IdPemberi,
                    'SatTritier' => $detail_objek->SatTritier,
                    'SatSekunder' => $detail_objek->SatSekunder,
                    'SatPrimer' => $detail_objek->SatPrimer
                ];
            }
            return response()->json($data_objek);
        }

        // select data
        else if ($id === 'selectData') {
            $XIdTransaksi = $request->input('XIdTransaksi');

            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_TujuanSubKelompok_TmpTransaksi
            @XIdTransaksi = ?', [$XIdTransaksi]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaDivisi' => $detail_objek->NamaDivisi,
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'NamaKelompokUtama' => $detail_objek->NamaKelompokUtama,
                    'NamaKelompok' => $detail_objek->NamaKelompok,
                    'NamaSubKelompok' => $detail_objek->NamaSubKelompok,
                    'SaldoPrimer' => $detail_objek->SaldoPrimer,
                    'SaldoSekunder' => $detail_objek->SaldoSekunder,
                    'SaldoTritier' => $detail_objek->SaldoTritier,
                    'PakaiAturanKonversi' => $detail_objek->PakaiAturanKonversi,
                ];
            }
            return response()->json($data_objek);
        }

        // cek pemberi
        else if ($id === 'cekPemberi') {
            $IdTransaksi = $request->input('IdTransaksi');

            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_check_penyesuaian_transaksi
            @Kode = ?, @IdTransaksi = ?, @IdTypeTransaksi = ?', [1, $IdTransaksi, '06']);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'IdType' => $detail_objek->IdType,
                    'jumlah' => $detail_objek->jumlah,
                ];
            }
            return response()->json($data_objek);
        }

        // cek Penerima
        else if ($id === 'cekPenerima') {
            $IdTransaksi = $request->input('IdTransaksi');
            $KodeBarang = $request->input('KodeBarang');

            $objek = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_check_penyesuaian_transaksi
            @Kode = ?, @IdTransaksi = ?, @IdTypeTransaksi = ?, @KodeBarang = ?', [2, $IdTransaksi, '06', $KodeBarang]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'IdType' => $detail_objek->IdType,
                    'jumlah' => $detail_objek->jumlah,
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
        // dd($user);
        if ($id === 'proses') {
            $IdTransaksi = $request->input('IdTransaksi');
            $JumlahKeluarPrimer = $request->input('JumlahKeluarPrimer');
            $JumlahKeluarSekunder = $request->input('JumlahKeluarSekunder');
            $JumlahKeluarTritier = $request->input('JumlahKeluarTritier');

            try {
                $result = DB::connection('ConnKCNInventory')->table('Type')
                    ->select(
                        'IdType as IdTypePemberi',
                        'UnitPrimer as SPrimerBeri',
                        'UnitSekunder as SSekunderBeri',
                        'UnitTritier as STritierBeri',
                        'SatuanUmum as SUmumBeri',
                        'PakaiAturanKonversi as KonvBeri',
                        'SaldoPrimer as SldPrimerBeri',
                        'SaldoSekunder as SldSekunderBeri',
                        'SaldoTritier as SldTritierBeri',
                        'MinimumStock as MinStokBeri',
                        'KonvTritierKeSekunder as KonvTriSekBeri',
                        'KonvSekunderKePrimer as KonvSekPriBeri',
                        'PIB as NomorPIB'
                    )
                    ->where('IdType', function ($query) use ($IdTransaksi) {
                        $query->select('IdType')
                            ->from('Tmp_Transaksi')
                            ->where('IdTransaksi', $IdTransaksi);
                    })
                    ->where('NonAktif', 'Y')
                    ->first();

                $KonvBeri = $result->KonvBeri;
                $SUmumBeri = $result->SUmumBeri;
                $STritierBeri = $result->STritierBeri;
                $SSekunderBeri = $result->SSekunderBeri;
                $SPrimerBeri = $result->SPrimerBeri;
                $SldPrimerBeri = $result->SldPrimerBeri;
                $SldSekunderBeri = $result->SldSekunderBeri;
                $SldTritierBeri = $result->SldTritierBeri;
                $MinStokBeri = $result->MinStokBeri;
                $KonvTriSekBeri = $result->KonvTriSekBeri;
                $KonvSekPriBeri = $result->KonvSekPriBeri;
                $NomorPIB = $result->NomorPIB;

                $tmpTransaksi = DB::connection('ConnKCNInventory')->table('Tmp_Transaksi')
                    ->where('IdTransaksi', $IdTransaksi)
                    ->select('IdPenerima', 'AsalIdSubKelompok AS IdSubKelAsl', 'TujuanIdSubKelompok AS IdSubKelTuj')
                    ->first();

                $IdPenerima = $tmpTransaksi->IdPenerima;
                $IdSubKelAsl = $tmpTransaksi->IdSubKelAsl;
                $IdSubKelTuj = $tmpTransaksi->IdSubKelTuj;

                $divisiPemberi = DB::connection('ConnKCNInventory')->table('Subkelompok')
                    ->join('Kelompok', 'Subkelompok.IdKelompok_Subkelompok', '=', 'Kelompok.IdKelompok')
                    ->join('KelompokUtama', 'Kelompok.IdKelompokUtama_Kelompok', '=', 'KelompokUtama.IdKelompokUtama')
                    ->join('Objek', 'KelompokUtama.IdObjek_KelompokUtama', '=', 'Objek.IdObjek')
                    ->join('Divisi', 'Objek.IdDivisi_Objek', '=', 'Divisi.IdDivisi')
                    ->where('Subkelompok.IdSubKelompok', $IdSubKelAsl)
                    ->value('Divisi.NamaDivisi');

                $DivisiPemberi = $divisiPemberi;

                $type = DB::connection('ConnKCNInventory')->table('Type')
                    ->select(
                        'IdType',
                        'UnitPrimer AS SPrimerTerima',
                        'UnitSekunder AS SSekunderTerima',
                        'UnitTritier AS STritierTerima',
                        'SatuanUmum AS SUmumTerima',
                        'PakaiAturanKonversi AS KonvTerima',
                        'SaldoPrimer AS SldPrimerTerima',
                        'SaldoSekunder AS SldSekunderTerima',
                        'SaldoTritier AS SldTritierTerima',
                        'MaximumStock AS MaxStokTerima',
                        'KonvSekunderKePrimer AS KonvSekPriTerima'
                    )
                    ->where('KodeBarang', function ($query) use ($IdTransaksi) {
                        $query->select('KodeBarang')
                            ->from('Type')
                            ->where('IdType', function ($query) use ($IdTransaksi) {
                                $query->select('IdType')
                                    ->from('Tmp_Transaksi')
                                    ->where('IdTransaksi', $IdTransaksi);
                            });
                    })
                    ->where('IdSubKelompok_Type', function ($query) use ($IdTransaksi) {
                        $query->select('TujuanIdSubKelompok')
                            ->from('Tmp_Transaksi')
                            ->where('IdTransaksi', $IdTransaksi);
                    })
                    ->where('NonAktif', 'Y')
                    ->first();

                // dd($type);

                $IdTypeTerima = $type->IdType;
                $SPrimerTerima = $type->SPrimerTerima;
                $SSekunderTerima = $type->SSekunderTerima;
                $STritierTerima = $type->STritierTerima;
                $SUmumTerima = $type->SUmumTerima;
                $KonvTerima = $type->KonvTerima;
                $SldPrimerTerima = $type->SldPrimerTerima;
                $SldSekunderTerima = $type->SldSekunderTerima;
                $SldTritierTerima = $type->SldTritierTerima;
                $MaxStokTerima = $type->MaxStokTerima;
                $KonvSekPriTerima = $type->KonvSekPriTerima;

                $divisiPenerima = DB::connection('ConnKCNInventory')->table('Subkelompok')
                    ->join('Kelompok', 'Subkelompok.IdKelompok_Subkelompok', '=', 'Kelompok.IdKelompok')
                    ->join('KelompokUtama', 'Kelompok.IdKelompokUtama_Kelompok', '=', 'KelompokUtama.IdKelompokUtama')
                    ->join('Objek', 'KelompokUtama.IdObjek_KelompokUtama', '=', 'Objek.IdObjek')
                    ->join('Divisi', 'Objek.IdDivisi_Objek', '=', 'Divisi.IdDivisi')
                    ->where('Subkelompok.IdSubKelompok', $IdSubKelTuj)
                    ->value('Divisi.NamaDivisi');

                $DivisiPenerima = $divisiPenerima;

                // Initialize error messages
                $NmError1 = null;
                $NmError2 = null;

                // Validation logic
                if ($KonvBeri !== 'Y') {
                    if ($SUmumBeri === $STritierBeri) {
                        if (($SldTritierBeri - $JumlahKeluarTritier) < $MinStokBeri && $MinStokBeri != 0 && empty($NmError1)) {
                            $NmError1 = 'Divisi PEMBERI : ' . $DivisiPemberi . ' Tidak Dapat memberikan barang, karena melewati batas MINIMUM STOK !!...; Min Stok= ' . $MinStokBeri . '; Saldo Akhir Tritier= ' . $SldTritierBeri . '; Jumlah Tritier yang diberikan= ' . $JumlahKeluarTritier;
                            return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                        }
                    }

                    if ($SUmumBeri === $SSekunderBeri) {
                        if (($SldSekunderBeri - $JumlahKeluarSekunder) < $MinStokBeri && $MinStokBeri != 0 && empty($NmError1)) {
                            $NmError1 = 'Divisi PEMBERI : ' . $DivisiPemberi . ' Tidak Dapat memberikan barang, karena melewati batas MINIMUM STOK !!...; Min Stok = ' . $MinStokBeri . '; Saldo Akhir Sekunder= ' . $SldSekunderBeri . '; Jumlah Sekunder yang diberikan= ' . $JumlahKeluarSekunder;
                            return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                        }
                    }

                    if ($SUmumBeri === $SPrimerBeri) {
                        if (($SldPrimerBeri - $JumlahKeluarPrimer) < $MinStokBeri && $MinStokBeri != 0 && empty($NmError1)) {
                            $NmError1 = 'Divisi PEMBERI : ' . $DivisiPemberi . ' Tidak Dapat memberikan barang, karena melewati batas MINIMUM STOK !!...; Min Stok= ' . $MinStokBeri . '; Saldo Akhir Primer = ' . $SldPrimerBeri . '; Jumlah Primer yang diberikan= ' . $JumlahKeluarPrimer;
                            return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                        }
                    }
                }
                if ($KonvBeri === 'Y') {
                    if ($SUmumBeri === $STritierBeri) {
                        if ($KonvTriSekBeri !== 0) {
                            if (((($SldSekunderBeri * $KonvTriSekBeri) + $SldTritierBeri) - ($JumlahKeluarTritier + ($JumlahKeluarSekunder * $KonvTriSekBeri))) < $MinStokBeri && empty($NmError1)) {
                                $NmError1 = 'Divisi PEMBERI : ' . $DivisiPemberi . ' Tidak Dapat memberikan barang, karena melewati batas MINIMUM STOK !!..; Min Stok= ' . $MinStokBeri . '; Saldo Akhir Sekunder= ' . $SldSekunderBeri . ', Saldo Akhir Tritier= ' . $SldTritierBeri . '; Jumlah Sekunder yang diberikan= ' . $JumlahKeluarSekunder . ', Jumlah Tritier yang diberikan= ' . $JumlahKeluarTritier;
                                return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                            }
                        }
                    }

                    if ($SUmumBeri === $SSekunderBeri) {
                        if ($KonvTriSekBeri !== 0) {
                            if (((($SldTritierBeri / $KonvTriSekBeri) + $SldSekunderBeri) - ($JumlahKeluarTritier / $KonvTriSekBeri + $JumlahKeluarSekunder)) < $MinStokBeri && empty($NmError1)) {
                                $NmError1 = 'Divisi PEMBERI : ' . $DivisiPemberi . ' Tidak Dapat memberikan barang, karena melewati batas MINIMUM STOK !!..; Min Stok =' . $MinStokBeri . '; Saldo Akhir Sekunder= ' . $SldSekunderBeri . ', Saldo Akhir Tritier= ' . $SldTritierBeri . '; Jumlah Sekunder yang diberikan= ' . $JumlahKeluarSekunder . ', Jumlah Tritier yang diberikan= ' . $JumlahKeluarTritier;
                                return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);

                            }
                        }

                        // if ($KonvSekPriBeri !== 0 && empty($NmError1)) {
                        //     dd('hehe1');
                        //     $NmError1 = 'Divisi PEMBERI : ' . $DivisiPemberi . ' Konversi Sekunder Ke Primer BELUM BISA, Programnya tidak bisa memproses data jika terdapat Konversi Primer ke Sekunder !!';
                        //     return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                        // }
                    }

                    if ($SUmumBeri === $SPrimerBeri && empty($NmError1)) {
                        // dd('hehe2');
                        $NmError1 = 'Divisi PEMBERI : ' . $DivisiPemberi . ' Konversi Sekunder Ke Primer BELUM BISA, Programnya tidak bisa memproses data jika terdapat Konversi Primer ke Sekunder !!';
                        return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                    }
                }

                // Cek Satuan Umum PENERIMA untuk MAXIMUM STOCK
                if ($KonvTerima !== 'Y') {
                    if ($KonvBeri === 'Y') {
                        // Check for Tritier conversion and stock limits
                        if ($KonvTriSekBeri !== 0 && $MaxStokTerima !== null && empty($NmError2)) {
                            if (($SldTritierTerima + ($JumlahKeluarSekunder * $KonvTriSekBeri) + $JumlahKeluarTritier) > $MaxStokTerima) {
                                $NmError2 = 'Divisi PENERIMA : ' . $DivisiPenerima . ' Tidak Dapat menerima barang, karena melewati batas MAXIMUM STOK !!.., Max stok= ' . $MaxStokTerima . '; Jumlah Tritier yang diterima= ' . ($SldTritierTerima + ($JumlahKeluarSekunder * $KonvTriSekBeri) + $JumlahKeluarTritier);
                                return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                            }
                        }
                        // Check for KonvSekPriBeri error condition
                        if ($KonvSekPriBeri !== 0 && $MaxStokTerima !== null && empty($NmError2)) {
                            // dd('hehe3');
                            $NmError1 = 'Divisi PEMBERI : ' . $DivisiPemberi . ' Konversi Sekunder Ke Primer BELUM BISA, Programnya tidak bisa memproses data jika terdapat Konversi Primer ke Sekunder !!';
                            return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                        }
                    } else {
                        if ($MaxStokTerima !== null) {
                            // Check for Tritier stock limits
                            if ($SUmumTerima === $STritierTerima && ($SldTritierTerima + $JumlahKeluarTritier) > $MaxStokTerima && empty($NmError2)) {
                                $NmError2 = 'Divisi PENERIMA : ' . $DivisiPenerima . ' Tidak Dapat menerima barang, karena melewati batas MAXIMUM STOK !!.., Max stok= ' . $MaxStokTerima . '; Jumlah Tritier yang diterima= ' . ($SldTritierTerima + $JumlahKeluarTritier);
                                return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                            }

                            // Check for Sekunder stock limits
                            if ($SUmumTerima === $SSekunderTerima && ($SldSekunderTerima + $JumlahKeluarSekunder) > $MaxStokTerima && empty($NmError2)) {
                                $NmError2 = 'Divisi PENERIMA : ' . $DivisiPenerima . ' Tidak Dapat menerima barang, karena melewati batas MAXIMUM STOK !!.., Max stok= ' . $MaxStokTerima . '; Jumlah Sekunder yang diterima= ' . ($SldSekunderTerima + $JumlahKeluarSekunder);
                                return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                            }

                            // Check for Primer stock limits
                            if ($SUmumTerima === $SPrimerTerima && ($SldPrimerTerima + $JumlahKeluarPrimer) > $MaxStokTerima && empty($NmError2)) {
                                $NmError2 = 'Divisi PENERIMA : ' . $DivisiPenerima . ' Tidak Dapat menerima barang, karena melewati batas MAXIMUM STOK !!.., Max stok= ' . $MaxStokTerima . '; Jumlah Primer yang diterima= ' . ($SldPrimerTerima + $JumlahKeluarPrimer);
                                return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                            }
                        }
                    }
                } else {
                    if ($MaxStokTerima !== null && empty($NmError1)) {
                        // dd('hehe4');
                        if ($KonvSekPriTerima !== 0) {
                            $NmError1 = 'Divisi PENERIMA : ' . $DivisiPenerima . ' Konversi Sekunder Ke Primer BELUM BISA, Programnya tidak bisa memproses data jika terdapat Konversi Primer ke Sekunder !!';
                            return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                        }
                    }
                }

                // Cek Saldo Akhir tidak boleh lebih kecil 0
                if ($KonvBeri !== 'Y') {
                    // Tritier balance check
                    if (($SldTritierBeri - $JumlahKeluarTritier) < 0 && empty($NmError1)) {
                        $NmError1 = 'Divisi PEMBERI : ' . $DivisiPemberi . ' Saldo Akhir Tritier Tinggal= ' . $SldTritierBeri . ', Jadi tidak bisa diambil sebanyak= ' . $JumlahKeluarTritier;
                        return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                    }
                    // Sekunder balance check
                    if (($SldSekunderBeri - $JumlahKeluarSekunder) < 0 && empty($NmError1)) {
                        $NmError1 = 'Divisi PEMBERI : ' . $DivisiPemberi . ' Saldo Akhir Sekunder Tinggal= ' . $SldSekunderBeri . ', Jadi tidak bisa diambil sebanyak= ' . $JumlahKeluarSekunder;
                        return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                    }
                    // Primer balance check
                    if (($SldPrimerBeri - $JumlahKeluarPrimer) < 0 && empty($NmError1)) {
                        $NmError1 = 'Divisi PEMBERI : ' . $DivisiPemberi . ' Saldo Akhir Primer Tinggal= ' . $SldPrimerBeri . ', Jadi tidak bisa diambil sebanyak= ' . $JumlahKeluarPrimer;
                        return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
                    }
                }

                // prosesnya
                DB::connection('ConnKCNInventory')
                    ->statement('exec [SP_1003_INV_Proses_ACC_Pemberi]
                                        @Kode = ?, @IdTransaksi = ?, @UserACC = ?, @JumlahKeluarPrimer = ?, @JumlahKeluarSekunder = ?, @JumlahKeluarTritier = ?',
                        [
                            3,
                            $IdTransaksi,
                            $user,
                            $JumlahKeluarPrimer,
                            $JumlahKeluarSekunder,
                            $JumlahKeluarTritier,
                        ]
                    );

                return response()->json(['NmError1' => $NmError1, 'NmError2' => $NmError2]);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diACC: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        //
    }
}
