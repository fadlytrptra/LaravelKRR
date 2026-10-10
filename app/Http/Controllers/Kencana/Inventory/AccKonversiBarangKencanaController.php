<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class AccKonversiBarangKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Inventory.AccKonversiBarang', compact('access'));
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

        // transaksi awal
        else if ($id === 'getTransaksiAwal') {
            $XKdDivisi = $request->input('XKdDivisi');

            $divisi = DB::connection('ConnKCNInventory')->select('exec [SP_1003_INV_List_Konversi_TmpTransaksi]
           @XKdDivisi = ?', [$XKdDivisi]);
            // dd($divisi);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Tanggal' => $detail_divisi->Tanggal,
                    'UraianDetailTransaksi' => $detail_divisi->UraianDetailTransaksi,
                    'JumlahPengeluaranPrimer' => $detail_divisi->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_divisi->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_divisi->JumlahPengeluaranTritier,
                    'IdObjek' => $detail_divisi->IdObjek,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'IdKelompokUtama' => $detail_divisi->IdKelompokUtama,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'IdKelompok' => $detail_divisi->IdKelompok,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'IdSubkelompok' => $detail_divisi->IdSubkelompok,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdType' => $detail_divisi->IdType,
                    'NamaType' => $detail_divisi->NamaType,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'JumlahPemasukanPrimer' => $detail_divisi->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_divisi->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_divisi->JumlahPemasukanTritier,
                    'HargaSatuan' => $detail_divisi->HargaSatuan,

                ];
            }
            return response()->json($data_divisi);
        }

        // get data list konversi
        else if ($id === 'getKodeKonversi') {
            $XIdDivisi = $request->input('XIdDivisi');

            $divisi = DB::connection('ConnKCNInventory')->select('exec [SP_1003_INV_ListIdKonversi_TmpTransaksi]
           @XIdDivisi = ?', [$XIdDivisi]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdKonversi' => $detail_divisi->IdKonversi,
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
    public function update(Request $request, $id)
    {
        if ($id === 'proses') {
            $user = trim(Auth::user()->NomorUser);
            $IdKonversi = $request->input('IdKonversi');
            $XIdKonversi = $request->input('XIdKonversi');
            $XIdTransaksi = $request->input('XIdTransaksi');
            $XIdType = $request->input('XIdType');
            $XKeluarPrimer = $request->input('XKeluarPrimer');
            $XKeluarSekunder = $request->input('XKeluarSekunder');
            $XKeluarTritier = $request->input('XKeluarTritier');
            $XMasukPrimer = $request->input('XMasukPrimer');
            $XMasukSekunder = $request->input('XMasukSekunder');
            $XMasukTritier = $request->input('XMasukTritier');
            $XUraian = $request->input('XUraian');
            $XHargaSatuan = str_replace(',', '', $request->input('XHargaSatuan'));
            // dd(request()->all());
            // dd($XHargaSatuan);
            try {
                $errors = [];

                //proses cek data konversi
                foreach ($IdKonversi as $index => $transaksi) {
                    $a = 0;
                    $t = 0;

                    $cekDataKonversi = DB::connection('ConnKCNInventory')->select(
                        'exec SP_1003_INV_Cek_Data_Konversi @IdKonversi = ?',
                        [$IdKonversi[$index]]
                    );

                    foreach ($cekDataKonversi as $hasilUraian) {
                        if (strpos($hasilUraian->UraianD, 'Asal Konversi') === 0) {
                            $a += 1;
                        } else {
                            $t += 1;
                        }
                    }

                    if ($a === 0) {
                        $errors[] = 'Id.Konversi: ' . $IdKonversi[$index] . ' TIDAK DAPAT diPROSES, krn tdk terdapat Asal Konversi!!';
                        unset($IdKonversi[$index]);
                    } else if ($t === 0) {
                        $errors[] = 'Id.Konversi: ' . $IdKonversi[$index] . ' TIDAK DAPAT diPROSES, krn tdk terdapat Tujuan Konversi!!';
                        unset($IdKonversi[$index]);
                    }
                }

                //proses cek transaksi penyesuaian
                foreach ($IdKonversi as $index => $transaksi) {
                    $cekDataPenyesuaian = DB::connection('ConnKCNInventory')->select(
                        'exec SP_1003_INV_Check_Sesuai_Konversi @IdKonversi = ?',
                        [$IdKonversi[$index]]
                    );

                    if ($cekDataPenyesuaian[0]->nmerror === 'SALAH') {
                        $errors[] = 'Id.Konversi: ' . $IdKonversi[$index] . ' TIDAK DAPAT diPROSES, krn ada Transaksi Penyesuaian!!';
                        unset($IdKonversi[$index]);
                    }
                }

                //proses cek saldo
                foreach ($IdKonversi as $index => $transaksi) {
                    $cekSaldo = DB::connection('ConnKCNInventory')->select(
                        'exec SP_1003_INV_Check_Saldo_Konversi @IdKonversi = ?',
                        [$IdKonversi[$index]]
                    );

                    if ($cekSaldo[0]->nmerror === 'SALAH') {
                        $errors[] = 'Id.Konversi: ' . $IdKonversi[$index] . ' TIDAK DAPAT diPROSES,
                        krn ada Asal Konversi yg SALDOnya TIDAK CUKUP!!';
                        unset($IdKonversi[$index]);
                    }
                }

                // proses
                $con = 0;
                foreach ($IdKonversi as $index => $transaksi) {
                    foreach ($XIdKonversi as $index2 => $transaksi) {
                        if ($IdKonversi[$index] === $XIdKonversi[$index2]) {
                            // dd($XIdKonversi[$index2], $IdKonversi[$index], $index2);
                            // dd((float)$XHargaSatuan[$index2]);
                            if (stripos($XUraian[$index2], 'Tujuan') !== false) {
                                $idTransaksi = $XIdTransaksi[$index2];

                                $xIdTypeTujuan = DB::connection('ConnKCNInventory')->table('Tmp_Transaksi')
                                    ->where('IdTransaksi', $idTransaksi)
                                    ->value('IdType');

                                $XJumlahMasukTritier = (float) str_replace(',', '', $XMasukTritier[$index2]);
                                $XhargaSatuan = (float) $XHargaSatuan[$index2];
                                $kode = null;
                                // dd($xIdTypeTujuan, $XJumlahMasukTritier, $XhargaSatuan, $kode);
                                // dd($request->all());
                                // dd($kode);
                                $tes = DB::connection('ConnKCNInventory')
                                    ->statement('exec SP_4451_UpdateHarga_Persediaan
                                        @Kode = ?,
                                        @IdType = ?,
                                        @JumlahTritier = ?,
                                        @HargaSatuan = ?', [
                                        $kode,
                                        $xIdTypeTujuan,
                                        $XJumlahMasukTritier,
                                        $XhargaSatuan,
                                    ]);
                                // dd($tes);
                            }
                            DB::connection('ConnKCNInventory')->statement(
                                'exec SP_1273_INV_Proses_Acc_Konversi
                                @XIdTransaksi = ?,
                                @XIdType = ?,
                                @XUserACC = ?,
                                @XKeluarPrimer = ?,
                                @XKeluarSekunder = ?,
                                @XKeluarTritier = ?,
                                @XMasukPrimer = ?,
                                @XMasukSekunder = ?,
                                @XMasukTritier = ?,
                                @XHargaSatuan = ?
                                ',
                                [
                                    $XIdTransaksi[$index2],
                                    $XIdType[$index2],
                                    $user,
                                    $XKeluarPrimer[$index2],
                                    $XKeluarSekunder[$index2],
                                    $XKeluarTritier[$index2],
                                    $XMasukPrimer[$index2],
                                    $XMasukSekunder[$index2],
                                    $XMasukTritier[$index2],
                                    (float) $XHargaSatuan[$index2],
                                ]
                            );
                            $con += 1;
                        }
                    }
                }

                $successMessage = $con === 0 ? 'Tidak Ada Data Yang Di-ACC' : 'Data TerSimpan';
                $successMessages[] = $successMessage;

                return response()->json([
                    'errors' => $errors,
                    'success' => !empty($successMessages) ? $successMessages : null
                ], 200);

            } catch (\Exception $e) {
                return response()->json(['error' => 'Data Gagal TerSimpan' . $e->getMessage()]);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        //
    }
}
