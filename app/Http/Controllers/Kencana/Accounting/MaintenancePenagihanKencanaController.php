<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use function PHPUnit\Framework\isNull;

class MaintenancePenagihanKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.MaintenancePenagihanKencana.index', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $jenisProses = $request->jenisProses;
        if ($jenisProses == 'insertDataSPPB') {
            $idSupplier = $request->idSupplier;
            $idInvSupp = $request->idInvSupp;
            $idJenisDokumen = $request->idJenisDokumen;
            $jumlahDokumen = $request->jumlahDokumen;
            $statusPPN = $request->statusPPN;
            $tabelDataPenagihan = $request->tabelDataPenagihan;
            $idMataUang = $tabelDataPenagihan[0][17];
            $idUser = trim(Auth::user()->NomorUser);
            $idDivisi = $request->idDivisi;
            $noSPPB = $request->noSPPB;

            // == GENERATE ID Penagihan ==
            try {
                $tglPenagihan = DB::connection('ConnKCNAccounting')
                    ->table('T_Counter')
                    ->value('Tgl_Penagihan');

                $ts = strtotime($tglPenagihan);
                $monthFromDB = (int) date('n', $ts);
                $yearFromDB = (int) date('Y', $ts);
                $monthToday = (int) date('n');
                $yearToday = (int) date('Y');
                $bulanPenagihan = str_pad($monthToday, 2, '0', STR_PAD_LEFT);
                $idPenagihanFormatted = '';
                if ($monthFromDB == $monthToday && $yearFromDB == $yearToday) {
                    $XIdPenagihan = DB::connection('ConnKCNAccounting')
                        ->table('T_Counter')
                        ->value('Id_Penagihan');
                    $XIdPenagihan += 1;
                    $noUrutPenagihan = str_pad($XIdPenagihan, 4, '0', STR_PAD_LEFT);
                    $idPenagihanFormatted = (string) $noUrutPenagihan . '/' . $bulanPenagihan . '/' . $yearToday;
                    DB::connection('ConnKCNAccounting')
                        ->table('T_Counter')
                        ->update([
                            'Id_Penagihan' => $XIdPenagihan
                        ]);
                } else {
                    $idPenagihanFormatted = (string) '0001/' . $bulanPenagihan . '/' . $yearToday;
                    DB::connection('ConnKCNAccounting')
                        ->table('T_Counter')
                        ->update([
                            'Tgl_Penagihan' => date('Y-m-d H:i:s'),
                            'Id_Penagihan' => 1
                        ]);
                }
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage() . ' error Generate ID Penagihan'], 500);
            }

            // == INPUT T_Penagihan ==
            try {
                DB::connection('ConnKCNAccounting')
                    ->table('T_Penagihan')
                    ->insert([
                        'Id_Penagihan' => $idPenagihanFormatted,
                        'Waktu_Penagihan' => date('Y-m-d'),   // same as CONVERT(varchar(10),GETDATE(),101)
                        'Id_Supplier' => $idSupplier,
                        'Id_Jenis_Dokumen' => $idJenisDokumen,
                        'Jumlah_Dokumen' => $jumlahDokumen,
                        'Status_PPN' => $statusPPN,
                        'Id_MataUang' => $idMataUang,
                        'UserId' => $idUser,
                        'Lunas' => 'N',
                        'Nilai_Penagihan' => 1,
                        'Id_Inv_Supp' => $idInvSupp,
                    ]);
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage() . ' error input T_Penagihan'], 500);
            }

            // == INPUT Detail Penagihan PO ==
            try {
                foreach ($tabelDataPenagihan as $row) {
                    DB::connection('ConnKCNAccounting')->statement('exec SP_1273_PRG_INS_TT_SPPB
                    @IdPenagihan = ?,
                    @IdDivisi = ?,
                    @NoSPPB = ?,
                    @NoTerima = ?,
                    @HrgSat = ?,
                    @Kurs = ?,
                    @Disc = ?,
                    @Ppn = ?,
                    @HrgDisc = ?,
                    @HrgPpn = ?,
                    @QtyTagih = ?,
                    @SatTagih = ?,
                    @HrgMurni = ?,
                    @HrgSatRp = ?,
                    @HrgMurniRp = ?,
                    @HrgDiscRp = ?,
                    @HrgPpnRp = ?',
                        [
                            $idPenagihanFormatted,
                            $idDivisi,
                            $noSPPB,
                            $row[0],
                            (float) str_replace(',', '', $row[1]),
                            (float) str_replace(',', '', $row[2]),
                            (float) str_replace(',', '', $row[3]),
                            (float) str_replace(',', '', $row[4]),
                            (float) str_replace(',', '', $row[5]),
                            (float) str_replace(',', '', $row[6]),
                            (float) str_replace(',', '', $row[7]),
                            $row[18],
                            (float) str_replace(',', '', $row[9]),
                            (float) str_replace(',', '', $row[10]),
                            (float) str_replace(',', '', $row[11]),
                            (float) str_replace(',', '', $row[12]),
                            (float) str_replace(',', '', $row[13]),
                        ]
                    );
                }
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage() . ' error input Detail Penagihan PO'], 500);
            }
            return response()->json(['success' => 'Berhasil input penagihan SPPB', 'idPenagihan' => $idPenagihanFormatted], 200);
        } else if ($jenisProses == 'insertDataPajak') {
            $nomorFaktur = $request->nomorFaktur;
            $hargaMurni = $request->hargaMurni;
            $nilaiPajak = $request->nilaiPajak;
            $hargaPPN = $request->hargaPPN;
            $kursPajak = $request->kursPajak;
            $idPenagihan = $request->idPenagihan;

            try {
                DB::connection('ConnKCNAccounting')
                    ->statement('exec SP_1273_PRG_UDT_TT_PAJAK
                            @Kode = ?,
                            @IdPenagihan = ?,
                            @NoFaktur = ?,
                            @NilaiFaktur = ?,
                            @NilaiPajak = ?,
                            @KursRupiah = ?,
                            @HrgPpn = ?',
                        [
                            1,
                            $idPenagihan,
                            $nomorFaktur,
                            $hargaMurni,
                            $nilaiPajak,
                            $kursPajak,
                            $hargaPPN
                        ]
                    );
                return response()->json(['success' => 'Input Detail Faktur Pajak berhasil'], 200);
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage() . ' error input Detail Faktur Pajak'], 500);
            }
        } else if ($jenisProses == 'updateDataPajak') {
            $idDetailFakturPajak = $request->idDetailFakturPajak;
            $nomorFaktur = $request->nomorFaktur;
            $hargaMurni = $request->hargaMurni;
            $nilaiPajak = $request->nilaiPajak;
            $hargaPPN = $request->hargaPPN;
            $kursPajak = $request->kursPajak;
            $idPenagihan = $request->idPenagihan;

            try {
                DB::connection('ConnKCNAccounting')
                    ->statement('exec SP_1273_PRG_UDT_TT_PAJAK
                            @Kode = ?,
                            @IdDetailFaktur = ?,
                            @IdPenagihan = ?,
                            @NoFaktur = ?,
                            @NilaiFaktur = ?,
                            @NilaiPajak = ?,
                            @KursRupiah = ?,
                            @HrgPpn = ?',
                        [
                            2,
                            $idDetailFakturPajak,
                            $idPenagihan,
                            $nomorFaktur,
                            $hargaMurni,
                            $nilaiPajak,
                            $kursPajak,
                            $hargaPPN
                        ]
                    );
                return response()->json(['success' => 'Update Detail Faktur Pajak berhasil'], 200);
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage() . ' error update Detail Faktur Pajak'], 500);
            }
        } else if ($jenisProses == 'deleteDataPajak') {
            $idDetailFakturPajak = $request->idDetailFakturPajak;
            $idPenagihan = $request->idPenagihan;

            try {
                DB::connection('ConnKCNAccounting')
                    ->statement('exec SP_1273_PRG_UDT_TT_PAJAK
                            @Kode = ?,
                            @IdDetailFaktur = ?,
                            @IdPenagihan = ?',
                        [
                            3,
                            $idDetailFakturPajak,
                            $idPenagihan,
                        ]
                    );
                return response()->json(['success' => 'Update Detail Faktur Pajak berhasil'], 200);
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage() . ' error update Detail Faktur Pajak'], 500);
            }
        } else if ($jenisProses == 'rupiahkanTagihan') {
            $idPenagihan = $request->idPenagihan;

            try {
                $dataRupiah = DB::connection('ConnKCNAccounting')
                    ->select(
                        'exec SP_1273_PRG_LIST_TT_DIRUPIAHKAN @IdPenagihan = ?',
                        [$idPenagihan]
                    );
                return response()->json(['success' => 'Tagihan berhasil dirupiahkan', 'rupiah' => $dataRupiah], 200);
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage() . ' error rupiahkan tagihan'], 500);
            }
        } else if ($jenisProses == 'inputPembulatanNilaiAkhir') {
            $idPenagihan = $request->idPenagihan;
            $nilaiPenagihan = $request->nilaiPenagihan;

            try {
                DB::connection('ConnKCNAccounting')
                    ->statement(
                        'exec Sp_1273_PRG_LIST_TT_NILAIPEMBULATAN @IdPenagihan = ?, @NilaiPenagihan = ?',
                        [$idPenagihan, $nilaiPenagihan]
                    );
                return response()->json(['success' => 'Nilai Akhir sudah disimpan'], 200);
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage() . ' error update Nilai Akhir'], 500);
            }
        } else if ($jenisProses == 'simpanKeteranganPenagihan') {
            $idPenagihan = $request->idPenagihan;
            $keteranganText = $request->keteranganText;
            $keteranganNilai = $request->keteranganNilai;

            try {
                DB::connection('ConnKCNAccounting')
                    ->statement(
                        'exec SP_1273_PRG_INS_TT_KETERANGAN @IdPenagihan = ?, @Ket = ?, @Nilai = ?',
                        [$idPenagihan, $keteranganText, $keteranganNilai]
                    );
                return response()->json(['success' => 'Keterangan sudah disimpan'], 200);
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage() . ' error insert Keterangan'], 500);
            }
        } else if ($jenisProses == 'updateKeteranganPenagihan') {
            $idPenagihan = $request->idPenagihan;
            $keteranganText = $request->keteranganText;
            $keteranganNilai = $request->keteranganNilai;

            try {
                DB::connection('ConnKCNAccounting')
                    ->statement(
                        'exec SP_1273_PRG_UDT_TT_KETERANGAN @IdPenagihan = ?, @Ket = ?, @Nilai = ?',
                        [$idPenagihan, $keteranganText, $keteranganNilai]
                    );
                return response()->json(['success' => 'Keterangan sudah diupdate'], 200);
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage() . ' error update Keterangan'], 500);
            }
        } else {
            return response()->json('Invalid request', 405);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getDataSupplier') {
            $supplierDetails = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_SUPPLIER');
            $response = [];
            foreach ($supplierDetails as $row) {
                $response[] = [
                    'NM_SUP' => trim($row->NM_SUP),
                    'NO_SUP' => trim($row->NO_SUP),
                ];
            }
            return datatables($response)->make(true);
        } else if ($id == 'getDataPenagihan') {
            $idSupplier = $request->idSupplier;
            $penagihan = DB::connection('ConnKCNAccounting')
                ->select(
                    'exec SP_1273_PRG_LIST_TT_IDTT_1 @IdSupplier = ?',
                    [$idSupplier]
                );
            $response = [];
            foreach ($penagihan as $row) {
                $response[] = [
                    'Id_Penagihan' => trim($row->Id_Penagihan),
                    'Waktu_Penagihan' => $row->Waktu_Penagihan,
                ];
            }
            return datatables($response)->make(true);
        } else if ($id == 'cekReturDanDetail') {
            $idPenagihan = $request->idPenagihan;
            $cekRetur = DB::connection('ConnKCNAccounting')
                ->select(
                    'exec SP_1273_PRG_CHECK_TT_RETUR_IDTT @IDtt = ?',
                    [$idPenagihan]
                );
            ;
            if ($cekRetur[0]->Ada > 0) {
                return response()->json(['error' => 'TT: ' . $idPenagihan . ' Ada Retur Barang, Lihat di menu Maintenance Penagihan diRetur']);
            }

            $cekDetail = DB::connection('ConnKCNAccounting')
                ->select(
                    'exec SP_1273_PRG_CHECK_TT_DETAIL_IDTT @IDpenagihan = ?',
                    [$idPenagihan]
                );

            if ($cekDetail[0]->Ada < 1) {
                return response()->json(['error' => 'TT: ' . $idPenagihan . ' Tidak ada detailnya, hubungi EDP']);
            }
            return response()->json(['success'], 200);
        } else if ($id == 'getHeader') {
            $idPenagihan = $request->idPenagihan;
            $dataHeader = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_TT_IDTT_2 @IdPenagihan = ?', [$idPenagihan]);
            return response()->json($dataHeader, 200);
        } else if ($id == 'getDetailPO') {
            $idPenagihan = $request->idPenagihan;
            $dataDetailPO = DB::connection('ConnKCNAccounting')->select('exec Sp_1273_PRG_LIST_TT_DETAIL_SPPB @IdPenagihan = ?, @XKode = ?', [$idPenagihan, 1]);
            return response()->json($dataDetailPO, 200);
        } else if ($id == 'getDetailPajak') {
            $idPenagihan = $request->idPenagihan;
            $dataDetailPajak = DB::connection('ConnKCNAccounting')->select('exec Sp_1273_PRG_LIST_TT_PAJAK @IdPenagihan = ?, @XKode = ?', [$idPenagihan, 1]);
            return response()->json($dataDetailPajak, 200);
        } else if ($id == 'getDataJenisDokumen') {
            $supplierDetails = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_TT_JNSDOK');
            $response = [];
            foreach ($supplierDetails as $row) {
                $response[] = [
                    'Id_Jenis_Dokumen' => trim($row->Id_Jenis_Dokumen),
                    'Nama_Dokumen' => trim($row->Nama_Dokumen),
                ];
            }
            return datatables($response)->make(true);
        } else if ($id == 'getDivisi') {

            $idUser = trim(Auth::user()->NomorUser);

            $dataDiv = DB::connection('ConnKCNPurchase')
                ->table('YUSER_DIVISI')
                ->join('YDIVISI', 'YUSER_DIVISI.Kd_div', '=', 'YDIVISI.KD_DIV')
                ->where('YUSER_DIVISI.kd_user', $idUser)
                ->orderBy('YDIVISI.NM_DIV')
                ->select(
                    'YUSER_DIVISI.Kd_div',
                    'YDIVISI.NM_DIV'
                )
                ->get();

            return response()->json($dataDiv, 200);
        } else if ($id == 'getSatuan') {
            $idUser = trim(Auth::user()->NomorUser);
            $dataSatuan = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_TT_SATUAN');
            return response()->json($dataSatuan, 200);
        } else if ($id == 'getDataSPPB') {
            $idUser = trim(Auth::user()->NomorUser);
            $idDivisi = $request->idDivisi;
            $nomorSPPB = $request->nomorSPPB;
            $idSupplier = $request->idSupplier;

            $dataSPPB = DB::connection('ConnKCNAccounting')->select('exec SP_1273_PRG_LIST_TT_TERIMABRG_BELI @IDDivisi = ?, @SPPB = ?', [
                $idDivisi,
                $nomorSPPB
            ]);
            return response()->json([
                'idDivisi' => $idDivisi,
                'nomorSPPB' => $nomorSPPB,
                'idSupplier' => $idSupplier,
                'jumlahData' => count($dataSPPB),
                'dataSPPB' => $dataSPPB
            ]);

            if (count($dataSPPB) > 0) {

                $pesanError = '';

                /** ================= SUPPLIER ================= */
                $valid = [];
                $removedSupplier = [];

                foreach ($dataSPPB as $row) {
                    if ($row->No_sup == $idSupplier) {
                        $valid[] = $row;
                    } else {
                        $removedSupplier[] = $row;
                    }
                }

                $dataSPPB = $valid;

                foreach ($removedSupplier as $removed) {
                    $pesanError .= "No. Terima {$removed->No_terima} tidak ditampilkan karena berbeda supplier<br>";
                }

                /** ================= RETUR ================= */
                $valid = [];
                $removedRetur = [];

                foreach ($dataSPPB as $row) {
                    if (is_null($row->Retur)) {
                        $valid[] = $row;
                    } else {
                        $removedRetur[] = $row;
                    }
                }

                $dataSPPB = $valid;

                foreach ($removedRetur as $removed) {
                    $pesanError .= "No. Terima {$removed->No_terima} tidak ditampilkan karena sedang diproses retur<br>";
                }

                /** ================= GUDANG ================= */
                $valid = [];
                $removedGudang = [];

                foreach ($dataSPPB as $row) {
                    if (
                        !is_null($row->NoTransaksiTmp) || $row->no_kat_utama == '005'
                    ) {
                        $valid[] = $row;
                    } else {
                        $removedGudang[] = $row;
                    }
                }

                $dataSPPB = $valid;

                foreach ($removedGudang as $removed) {
                    $pesanError .= "No. Terima {$removed->No_terima} tidak ditampilkan karena belum proses transfer<br>";
                }

                /** ================= TANDA TERIMA ================= */
                $valid = [];
                $removedTT = [];

                foreach ($dataSPPB as $row) {
                    if (is_null($row->Id_Penagihan)) {
                        $valid[] = $row;
                    } else {
                        $removedTT[] = $row;
                    }
                }

                $dataSPPB = $valid;

                foreach ($removedTT as $removed) {
                    $pesanError .= "No. Terima {$removed->No_terima} tidak ditampilkan karena sudah memiliki Tanda Terima {$removed->Id_Penagihan}<br>";
                }

                return response()->json([
                    'error' => $pesanError,
                    'dataSPPB' => $dataSPPB
                ], 200);

            } else {
                return response()->json(['error' => 'Data tidak ditemukan']);
            }
        } else if ($id == 'printTT') {
            $idUser = trim(Auth::user()->NomorUser);
            $idPenagihan = $request->idPenagihan;
            $terbilang = $request->terbilang;
            DB::connection('ConnKCNAccounting')
                ->statement(
                    'exec SP_1273_PRG_UDT_TT_TERBILANG @IdPenagihan = ?, @Konversi = ?',
                    [$idPenagihan, $terbilang]
                );
            $dataCetak = DB::connection('ConnKCNAccounting')->select('SELECT * FROM VW_PRG_1273_ACC_CTK_TT_NONRP WHERE Id_Penagihan = ? ', [$idPenagihan]);
            return view('Kencana.Accounting.Hutang.MaintenancePenagihanKencana.cetak', compact('dataCetak'));
        } else if ($id == 'getDataKeteranganPenagihan') {
            $idPenagihan = $request->idPenagihan;
            $countDataKeterangan = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_CHECK_TT_KETERANGAN @IdPenagihan = ?', [$idPenagihan]);

            if ($countDataKeterangan[0]->Ada > 0) {
                $dataKeterangan = DB::connection('ConnKCNAccounting')
                    ->select('exec SP_1273_PRG_LIST_TT_KETERANGAN @IdPenagihan = ?', [$idPenagihan]);

                return response()->json(['dataKeterangan' => $dataKeterangan], 200);
            } else {
                return response()->json(['error' => 'Data Keterangan Penagihan tidak ditemukan']);
            }
        } else {
            return response()->json('Invalid request', 405);
        }
        // else if ($id == 'getDisplay') {
        //     try {
        //         $no_sup = trim($request->input('supplier_1'));
        //         // dd($no_sup);
        //         $query = DB::connection('ConnKCNAccounting')
        //             ->select('exec SP_5409_ACC_PENAGIHAN_PEMBELIAN ?, ?', [1, $no_sup]);
        //         // dd($query);
        //         $response = [];
        //         foreach ($query as $row) {
        //             $response[] = [
        //                 'No_BTTB' => $row->No_BTTB,
        //                 'No_SuratJalan' => $row->No_SuratJalan ?? '',
        //                 'No_PO' => $row->No_PO,
        //                 'SubTotal' => number_format($row->SubTotal, 2, '.', ','),
        //                 'JumPPN' => intval($row->JumPPN),
        //                 'PPN_Price' => number_format($row->PPN_Price, 2, '.', ','),
        //                 'TotalPrice' => number_format($row->TotalPrice, 2, '.', ','),
        //                 'IdMataUang' => $row->IdMataUang,
        //                 'Nama_MataUang' => $row->Nama_MataUang,
        //                 'Kurs_Rp' => intval($row->Kurs_Rp),
        //             ];
        //         }
        //         return datatables($response)->make(true);
        //     } catch (Exception $e) {
        //         return response()->json(['error' => $e->getMessage()]);
        //     }
        // } else if ($id == 'getBTTB') {
        //     $noBTTB = $request->input('No_BTTB');
        //     $response = [];

        //     try {
        //         $result = DB::connection('ConnKCNAccounting')->select('exec SP_5409_ACC_PENAGIHAN_PEMBELIAN @Kode = ?, @noBTTB = ?', [2, $noBTTB]);

        //         foreach ($result as $row) {
        //             $response[] = [
        //                 'No_BTTB' => $row->No_BTTB,
        //                 'No_terima' => $row->No_terima,
        //                 'Kd_brg' => $row->Kd_brg,
        //                 'nama_brg' => $row->nama_brg,
        //                 'Qty_Terima' => number_format($row->Qty_Terima, 2, '.', ','),
        //                 'hrg_trm' => number_format($row->hrg_trm, 2, '.', ','),
        //                 'Hrg_sub_bttb' => number_format($row->Hrg_sub_bttb, 2, '.', ','),
        //                 'JumPPN' => intval($row->JumPPN),
        //                 'hrg_ppn' => number_format($row->hrg_ppn, 2, '.', ','),
        //                 'Harga_Terbayar' => number_format($row->Harga_Terbayar, 2, '.', ','),
        //                 'IdMataUang' => $row->IdMataUang,
        //                 'Nama_MataUang' => $row->Nama_MataUang,
        //                 'Kurs_Rp' => number_format($row->Kurs_Rp, 2, '.', ','),
        //             ];
        //         }
        //     } catch (Exception $e) {
        //         return response()->json(['error' => $e->getMessage()], 500);
        //     }

        //     return datatables($response)->make(true);
        // } else if ($id == 'getJenisPPH') {
        //     $pphDetails = DB::connection('ConnKCNAccounting')
        //         ->select('exec SP_5409_ACC_PENAGIHAN_PEMBELIAN @Kode = ?', [3]);
        //     // dd($pphDetails);
        //     $response = [];
        //     foreach ($pphDetails as $row) {
        //         $response[] = [
        //             'IdPPH' => trim($row->IdPPH),
        //             'JenisPPH' => trim($row->JenisPPH),
        //         ];
        //     }
        //     return datatables($response)->make(true);
        // } else if ($id == 'getPPH') {
        //     $pphDetails = DB::connection('ConnKCNAccounting')
        //         ->select('exec SP_5409_ACC_PENAGIHAN_PEMBELIAN @Kode = ?', [4]);
        //     // dd($pphDetails);
        //     $response = [];
        //     foreach ($pphDetails as $row) {
        //         $response[] = [
        //             'IdPersen' => trim($row->IdPersen),
        //             'Persen' => trim($row->Persen),
        //         ];
        //     }
        //     return datatables($response)->make(true);
        // } else if ($id == 'getPenagihan') {
        //     $supplier_1 = $request->input('supplier_1');
        //     // dd($supplier_1);
        //     $result = DB::connection('ConnKCNAccounting')
        //         ->select('exec SP_1273_ACC_LIST_TT_IDTT_1 @IdSupplier = ?', [$supplier_1]);
        //     // dd($result);
        //     $response = [];
        //     foreach ($result as $row) {
        //         $response[] = [
        //             'Nm_Sup' => trim($row->Nm_Sup),
        //             'Id_Penagihan' => trim($row->Id_Penagihan),
        //         ];
        //     }
        //     return datatables($response)->make(true);
        // }
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
    public function destroy($id)
    {
        //
    }
}
