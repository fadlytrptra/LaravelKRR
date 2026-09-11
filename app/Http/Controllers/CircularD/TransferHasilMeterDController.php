<?php

namespace App\Http\Controllers\CircularD;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class TransferHasilMeterDController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular D');
        return view('CircularD.transaksi.TransferHasilMeter', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $listAsal = $request->input('table_modal', []);
        $Tgl_Log = $request->input('Tgl_Log');
        // dd($Tgl_Log);
        $noIndek = $request->input('noIndek');
        $id_type = $request->input('id_type');
        $primer = $request->input('primer');
        $sekunder = $request->input('sekunder');
        $tritier = $request->input('tritier');
        $id_subKelompok = $request->input('id_subKelompok');
        $id_log_awal = $request->input('id_log_awal');
        $Id_Log = $request->input('Id_Log');
        $Id_order = $request->input('Id_order');
        $Id_mesin = $request->input('Id_mesin');
        $flag = false;
        $sIdKonversi = null;
        // dd($request->all());
        foreach ($listAsal as $i => $item) {
            // item mapping (sesuai urutan subitems)
            // 0 = kodeBarang, 1 = type, 2 = KeluarPrimer, 3 = KeluarSekunder, 4 = KeluarTritier
            // 5 = IdSubKel, 6 = IdType, dst...

            // cek pengeluaran yang blm diacc
            $cekKeluar = $this->CekJumlahKeluar($item[6]);
            // dd($cekKeluar);
            $KeluarP = $cekKeluar['KeluarP'];
            $KeluarS = $cekKeluar['KeluarS'];
            $KeluarT = $cekKeluar['KeluarT'];

            // cek saldo akhir
            $cekSaldo = $this->CekDetailAsal($item[0], $item[11], 0);
            // dd($cekSaldo);
            $SaldoPrimer = $cekSaldo['SaldoPrimer'];
            $SaldoSekunder = $cekSaldo['SaldoSekunder'];
            $SaldoTritier = $cekSaldo['SaldoTritier'];

            // hitung jumlah3 (total pengeluaran Tritier untuk IdType yang sama)
            $sJumlah3 = 0;
            foreach ($listAsal as $j => $row) {
                if ($item[5] == $row[5]) {
                    $sJumlah3 += (float) $row[4];
                }
            }
            // dd($sJumlah3);
            // validasi saldo
            if ($SaldoPrimer - ($KeluarP + (float) $item[2]) < 0) {
                // return back()->with('error', "Saldo Primer tidak mencukupi untuk type {$item[1]}");
                return response()->json(['error' => "Saldo Primer tidak mencukupi untuk type {$item[1]}"]);
            } elseif ($SaldoSekunder - ($KeluarS + (float) $item[3]) < 0) {
                return response()->json(['error' => "Saldo Sekunder tidak mencukupi untuk type {$item[1]}"]);
            } elseif ($SaldoTritier - ($KeluarT + $sJumlah3) < 0) {
                return response()->json(['error' => "Saldo Tritier tidak mencukupi untuk type {$item[1]}"]);
            }

            // cek penyesuaian transaksi
            $penyesuaian = DB::connection('ConnInventory')->select(
                'EXEC sp_check_penyesuaian_transaksi @idtype = ?, @idtypetransaksi = ?',
                [$item[5], '06']
            );
            // dd($penyesuaian);
            $sno = 0;
            if (!empty($penyesuaian)) {
                $sno = $penyesuaian[0]->jumlah ?? 0;
            }

            if ($sno >= 1) {
                return response()->json(['error' => "Tidak bisa di-ACC. Ada transaksi penyesuaian yang belum di-ACC untuk type {$item[1]}"]);
            }
        }

        // ambil idkonversi
        // $rows = DB::connection('ConnInventory')->statement(
        //     'EXEC Sp_Transfer_Meter @kode = ?, @Tanggal = ?',
        //     [1, $Tgl_Log]
        // );
        // 1. Ambil idkonversi + 1
        $idkon = DB::connection('ConnInventory')
            ->table('counter')
            ->value(DB::raw('idkonversi + 1'));

        // 2. Update counter
        DB::connection('ConnInventory')
            ->table('counter')
            ->update(['idkonversi' => $idkon]);

        // 3. Insert ke tabel Konversi
        DB::connection('ConnInventory')
            ->table('Konversi')
            ->insert([
                'IdKonversi' => $idkon,
                'SaatTransaksi' => $Tgl_Log
            ]);

        // 4. Return hasil (supaya sama dengan select @idkon as IDKonversi)
        $rows = ['IDKonversi' => $idkon];
        // dd($rows['IDKonversi']);
        if (!empty($rows)) {
            $sIdKonversi = str_pad($rows['IDKonversi'], 9, "0", STR_PAD_LEFT);
            // dd($sIdKonversi);
        }
        // insert asal konversi
        foreach ($listAsal as $i => $item) {
            DB::connection('ConnInventory')->statement(
                'EXEC Sp_Transfer_Meter @kode = ?, @UraianDetailTransaksi = ?, @Tanggal = ?, @IdType = ?, @UserAcc = ?, 
                @MasukPrimer = ?, @MasukSekunder = ?, @MasukTritier = ?, 
                @KeluarPrimer = ?, @KeluarSekunder = ?, @KeluarTritier = ?, 
                @AsalSubKel = ?, @IdKonversi = ?',
                [
                    2,
                    'Asal Konversi',
                    $Tgl_Log,
                    $item[5],
                    trim(Auth::user()->NomorUser),
                    0,
                    0,
                    0,
                    (float) $item[2],
                    (float) $item[3],
                    (float) $item[4],
                    $item[11],
                    $sIdKonversi
                ]
            );
            $flag = true;
        }

        if ($flag) {
            if (empty($noIndek)) {
                // insert tujuan konversi
                DB::connection('ConnInventory')->statement(
                    'EXEC Sp_Transfer_Meter @kode = ?, @UraianDetailTransaksi = ?, @Tanggal = ?, @IdType = ?, @UserAcc = ?, 
                    @MasukPrimer = ?, @MasukSekunder = ?, @MasukTritier = ?, 
                    @KeluarPrimer = ?, @KeluarSekunder = ?, @KeluarTritier = ?, 
                    @AsalSubKel = ?, @IdKonversi = ?',
                    [
                        2,
                        'Tujuan Konversi',
                        $Tgl_Log,
                        $id_type,
                        trim(Auth::user()->NomorUser),
                        (float) $primer,
                        (float) $sekunder,
                        (float) $tritier,
                        0,
                        0,
                        0,
                        $id_subKelompok,
                        $sIdKonversi
                    ]
                );
            } else {
                // update konversi barcode
                DB::connection('ConnInventory')->statement(
                    'EXEC SP_1273_CIR_UPDATE_KONVERSI @noindek = ?, @kd_brg = ?, @IdKonversi = ?',
                    [
                        substr($noIndek, 0, 9),
                        substr($noIndek, -9),
                        $sIdKonversi
                    ]
                );
            }

            // update kalkulasi meter
            DB::connection('ConnCircular')->statement(
                'EXEC Sp_Update_Kalkulasi_Meter @idlog1 = ?, @idlog2 = ?, @id_order = ?, @id_mesin = ?, @IdKonversi = ?',
                [
                    $id_log_awal,
                    $Id_Log,
                    $Id_order,
                    $Id_mesin,
                    $sIdKonversi
                ]
            );
            return response()->json(['message' => "Data telah tersimpan lengkap (Asal & Tujuan Konversi)"]);
        }
        return response()->json(['error' => "Proses gagal"]);
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $results = DB::connection('ConnCircular')
                ->select('exec Sp_Maint_Transfer ?', [11]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                // Panggil SP HitungMeter (SP_1486_CIR_LIST_TRANSF_MTR_3) untuk dapatkan hasil tambahan
                $subResults = DB::connection('ConnCircular')->select(
                    'exec SP_1486_CIR_LIST_TRANSF_MTR_3 @Id_Mesin = ?, @Id_Order = ?, @Id_Log = ?',
                    [
                        $row->Id_mesin ?? 0,
                        $row->Id_order ?? 0,
                        $row->Id_Log ?? 0
                    ]
                );
                // dd($subResults);
                // Default nilai jika SP kosong
                $hasil_meter = 0;
                $id_log_awal = 0;

                if (!empty($subResults)) {
                    $hasil_meter = $subResults[0]->Hasil_Meter ?? 0;
                    $id_log_awal = $subResults[0]->Id_Log_Awal ?? 0;
                }

                $response[] = [
                    // 'Tgl_Log' => isset($row->Tgl_Log) ? date('m/d/Y', strtotime($row->Tgl_Log)) : '',
                    'Tgl_Log' => Carbon::parse($row->Tgl_Log)->format('m/d/Y'),
                    'Tgl_Log_raw' => Carbon::parse($row->Tgl_Log)->format('Y-m-d'),
                    'Nama_mesin' => $row->Nama_mesin ?? '',
                    'NAMA_BRG' => $row->NAMA_BRG ?? '',
                    'Hasil_meter' => (float) $hasil_meter,     // kolom dari HitungMeter
                    'Id_mesin' => $row->Id_mesin ?? '',
                    'Id_order' => $row->Id_order ?? '',
                    'Id_Log' => $row->Id_Log ?? '',
                    'id_log_awal' => (float) $id_log_awal,     // kolom dari HitungMeter
                    'noIndek' => $row->noIndek ?? '',
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDetail') {
            // ambil parameter dari request
            $id_mesin = $request->input('Id_mesin');
            $id_order = $request->input('Id_order');
            $id_log = $request->input('Id_Log');
            $id_log_awal = $request->input('id_log_awal');

            // panggil SP sesuai VB
            $results = DB::connection('ConnCircular')->select(
                'exec SP_1486_CIR_LIST_TRANSF_MTR_2 @Id_Mesin = ?, @Id_Order = ?, @Id_Log = ?, @Id_Log_Awal = ?',
                [$id_mesin, $id_order, $id_log, $id_log_awal]
            );
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Log' => $row->Id_Log ?? '',
                    'Tgl_Log' => isset($row->Tgl_Log) ? Carbon::parse($row->Tgl_Log)->format('m/d/Y') : '',
                    'Shift' => $row->Shift ?? '',
                    'nama_status_log' => $row->nama_status_log ?? '',
                    'Counter_mesin_awal' => $row->Counter_mesin_awal ?? 0,
                    'Counter_mesin_akhir' => $row->Counter_mesin_akhir ?? 0,
                    'Awal_jam_kerja' => isset($row->Awal_jam_kerja)
                        ? Carbon::parse($row->Awal_jam_kerja)->format('h:i:s A')
                        : '',

                    'Akhir_jam_kerja' => isset($row->Akhir_jam_kerja)
                        ? Carbon::parse($row->Akhir_jam_kerja)->format('h:i:s A')
                        : '',
                    // 'Awal_jam_kerja' => isset($row->Awal_jam_kerja) ? Carbon::parse($row->Awal_jam_kerja)->format('H:i:s') : '',
                    // 'Akhir_jam_kerja' => isset($row->Akhir_jam_kerja) ? Carbon::parse($row->Akhir_jam_kerja)->format('H:i:s') : '',
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'isiTujuanKonversi') {
            // parameter dari request (seperti VB: sid_mesin, sid_order, sid_log)
            $sid_mesin = $request->input('Id_mesin');
            $sid_order = $request->input('Id_order');
            $sid_log = $request->input('Id_Log');
            // dd($sid_mesin, $sid_order, $sid_log);
            // Panggil SP dengan @Kode = 4
            $results4 = DB::connection('ConnCircular')->select(
                'exec Sp_Maint_Transfer @Kode = ?, @Id_Mesin = ?, @Id_Order = ?, @Id_Log = ?',
                [4, $sid_mesin, $sid_order, $sid_log]
            );
            // dd($results4);
            $sType = '';
            $sNama = '';
            $skode = '';

            if (!empty($results4)) {
                $sType = $results4[0]->Type_mesin ?? '';
                $sNama = $results4[0]->nama_mesin ?? '';
                $skode = $results4[0]->kodebarang ?? '';
            }
            // dd($sType, $sNama, $skode);
            // Panggil SP dengan @Kode = 8
            $results8 = DB::connection('ConnCircular')->select(
                'exec Sp_Maint_Transfer @Kode = ?, @TypeMesin = ?, @NamaMesin = ?, @Kode_Barang = ?',
                [8, $sType, $sNama, $skode]
            );
            // dd($results8);
            $response = [];
            if (!empty($results8)) {
                foreach ($results8 as $row) {
                    $response[] = [
                        'IdDivisi' => $row->IdDivisi ?? '',
                        'NamaDivisi' => $row->NamaDivisi ?? '',
                        'IdObjek' => $row->IdObjek ?? '',
                        'NamaObjek' => $row->NamaObjek ?? '',
                        'IdKelompokUtama' => $row->IdKelompokUtama ?? '',
                        'NamaKelompokUtama' => $row->NamaKelompokUtama ?? '',
                        'IdKelompok' => $row->IdKelompok ?? '',
                        'NamaKelompok' => $row->NamaKelompok ?? '',
                        'KodeBarang' => $row->KodeBarang ?? '',
                    ];
                }
            }

            return response()->json($response);

        } else if ($id == 'subKelompok') {
            // Ambil input dari request
            $idKelompok = trim($request->input('id_kelompok'));

            // Panggil SP sesuai VB.NET
            $results = DB::connection('ConnInventory')->select(
                'exec sp_IdKelompok_SubKelompok @XIdKelompok_SubKelompok = ?',
                [$idKelompok]
            );
            // dd($results);
            $response = [];
            if (!empty($results)) {
                foreach ($results as $row) {
                    $response[] = [
                        'NamaSubKelompok' => $row->namasubkelompok ?? '',
                        'IdSubKelompok' => $row->idsubkelompok ?? ''
                    ];
                }
            }

            return datatables($response)->make(true);

        } else if ($id == 'CekTypeBarang') {
            // ambil parameter dari request (sama seperti sKdBrg dan sSubKel di VB)
            $sKdBrg = $request->input('kode_barang');
            $sSubKel = $request->input('id_subKelompok');
            // dd($sKdBrg, $sSubKel);
            $results = DB::connection('ConnInventory')->select(
                'exec sp_KodeBarang_Type @XKodeBarang = ?, @XIdSubKelompok = ?',
                [$sKdBrg, $sSubKel]
            );
            // dd($results);
            if (!empty($results)) {
                $row = $results[0];
                $response = [
                    'satuan_primer' => $row->satuan_primer ?? '',
                    'satuan_sekunder' => $row->satuan_sekunder ?? '',
                    'satuan_tritier' => $row->satuan_tritier ?? '',
                    'IdType' => $row->IdType ?? '',
                    'NamaType' => $row->NamaType ?? '',
                    'status' => true,
                ];
            } else {
                $response = [
                    'status' => false
                ];
            }

            return response()->json($response);
        } else if ($id == 'CekAsalKonversi') {
            // ambil parameter id_order dari request (sama seperti sid_order di VB)
            $sid_order = $request->input('Id_order');
            $results = DB::connection('ConnCircular')->select(
                'exec sp_Maint_Transfer @Kode = ?, @id_order = ?',
                [5, $sid_order]
            );

            $response = [
                'A_kodebarang_warp' => $results[0]->A_kodebarang_warp ?? null,
                'A_kodebarang_weft' => $results[0]->A_kodebarang_weft ?? null,
            ];
            return response()->json($response);

        } else if ($id == 'cekTypeKonversi') {
            // Ambil parameter dari request
            $stype1 = trim($request->input('sAsal1'));
            $stype2 = trim($request->input('sAsal2'));
            $id_order = $request->input('Id_order');
            $id_mesin = $request->input('Id_mesin');
            // dd($request->all());
            $results = DB::connection('ConnCircular')->select(
                'exec sp_Maint_Transfer @Kode = ?, @A_kodebarang_warp = ?, @A_kodebarang_weft = ?, @id_order = ?, @id_mesin = ?',
                [6, $stype1, $stype2, $id_order, $id_mesin]
            );
            // dd($results);
            $jumlah = 0;
            if (!empty($results)) {
                $jumlah = $results[0]->jumlah ?? 0;
            }
            // dd($jumlah);
            return response()->json([
                'Jumlah' => $jumlah
            ]);

        } else if ($id == 'IsiAsalKonversi') {
            $stype1 = $request->input('sAsal1');
            $stype2 = $request->input('sAsal2');
            $Pid_mesin = $request->input('Id_mesin');
            $Pid_order = $request->input('Id_order');
            // dd($request->all());
            $response = [];

            // === Ambil data untuk stype1 ===
            $results1 = DB::connection('ConnCircular')->select(
                'exec Sp_Maint_Transfer @Kode = ?, @Id_Mesin = ?, @Id_Order = ?, @A_kodebarang_warp = ?',
                [7, $Pid_mesin, $Pid_order, trim($stype1)]
            );
            // dd($results1);
            foreach ($results1 as $row) {
                $response[] = [
                    'KodeBarang' => $row->KodeBarang ?? '',
                    'NamaType' => $row->NamaType ?? '',
                    'Col1' => 0,
                    'Col2' => 0,
                    'Col3' => 0,
                    'IdSubkelompok' => $row->IdSubkelompok ?? '',
                    'IdType' => $row->IdType ?? '',
                    'SaldoPrimer' => $row->SaldoPrimer ?? 0,
                    'SaldoSekunder' => $row->SaldoSekunder ?? 0,
                    'SaldoTritier' => $row->SaldoTritier ?? 0,
                    'Flag' => 3, // bng Wa utama
                    'NamaSubKelompok' => $row->NamaSubKelompok ?? '',
                ];
            }

            // === Ambil data untuk stype2 ===
            $results2 = DB::connection('ConnCircular')->select(
                'exec Sp_Maint_Transfer @Kode = ?, @Id_Mesin = ?, @Id_Order = ?, @A_kodebarang_warp = ?',
                [7, $Pid_mesin, $Pid_order, trim($stype2)]
            );
            // dd($results2);
            foreach ($results2 as $row) {
                $response[] = [
                    'KodeBarang' => $row->KodeBarang ?? '',
                    'NamaType' => $row->NamaType ?? '',
                    'Col1' => 0,
                    'Col2' => 0,
                    'Col3' => 0,
                    'IdSubkelompok' => $row->IdSubkelompok ?? '',
                    'IdType' => $row->IdType ?? '',
                    'SaldoPrimer' => $row->SaldoPrimer ?? 0,
                    'SaldoSekunder' => $row->SaldoSekunder ?? 0,
                    'SaldoTritier' => $row->SaldoTritier ?? 0,
                    'Flag' => 4, // bng We utama
                    'NamaSubKelompok' => $row->NamaSubKelompok ?? '',
                ];
            }
            // dd($response);
            return datatables($response)->make(true);
            // return response()->json($response);

        } else if ($id == 'IsiAsalKonversi1') {
            // ambil parameter id_order dan NamaMesin dari request
            $sid_order = $request->input('Id_order');
            $sMesin = $request->input('nama_kelompok');
            // dd($sid_order, $sMesin);
            $results = DB::connection('ConnCircular')->select(
                'exec Sp_Maint_Transfer @Kode = ?, @id_order = ?, @NamaMesin = ?',
                [10, $sid_order, $sMesin]
            );
            // dd($results);
            // mapping hasil query ke format array JSON seperti ListAsal di VB
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'KodeBarang' => $row->KodeBarang ?? null,
                    'NamaType' => $row->NamaType ?? null,
                    'Col1' => 0,
                    'Col2' => 0,
                    'Col3' => 0,
                    'IdSubkelompok' => $row->IdSubkelompok ?? null,
                    'IdType' => $row->IdType ?? null,
                    'SaldoPrimer' => $row->SaldoPrimer ?? 0,
                    'SaldoSekunder' => $row->SaldoSekunder ?? 0,
                    'SaldoTritier' => $row->SaldoTritier ?? 0,
                    'Ket' => $row->Ket ?? null,
                    'NamaSubKelompok' => $row->NamaSubKelompok ?? null,
                ];
            }

            return datatables($response)->make(true);
            // return datatables($response)->make(true);

        } else if ($id == 'CekBenangStrip') {
            // ambil parameter id_order dan id_mesin dari request
            $sid_order = $request->input('Id_order');
            $sIdMesin = $request->input('Id_mesin');

            $results = DB::connection('ConnCircular')->select(
                'exec sp_Maint_Transfer @Kode = ?, @id_order = ?, @id_mesin = ?',
                [9, $sid_order, $sIdMesin]
            );
            // dd($results);
            // ambil kolom Error, default null kalau tidak ada hasil
            $response = [
                'Error' => $results[0]->Error,
            ];

            return response()->json($response);

        } else if ($id == 'ListTypeTujuan') {
            // parameter dari request
            $sid_order = $request->input('Id_order');
            $sKd_Brg = trim($request->input('kode_barang'));
            $listAsal = $request->input('table_modal', []); // array dari frontend (mirip ListAsal di VB)
            $tTritier = $request->input('tritier', 0);      // TTritier.Text di VB
            // dd($request->all());
            // panggil stored procedure sp_List_Type
            $results = DB::connection('ConnCircular')->select(
                'exec sp_List_Type @Kode = ?, @IdOrder = ?, @Kd_Brg = ?',
                [1, $sid_order, $sKd_Brg]
            );
            // dd($results, $listAsal, $tTritier);
            if (count($results) > 0) {
                $row = $results[0];

                $RWa = isset($row->Rwa) ? trim($row->Rwa) : 0;
                $DWa = isset($row->Dwa) ? trim($row->Dwa) : 0;
                $RWe = isset($row->Rwe) ? trim($row->Rwe) : 0;
                $DWe = isset($row->Dwe) ? trim($row->Dwe) : 0;
                $Lebar = isset($row->Lebar) ? trim($row->Lebar) : 0;
                $Ket = isset($row->Ket) ? trim($row->Ket) : '';
                $JRein = isset($row->JmlReinf) ? trim($row->JmlReinf) : 0;
                $LRein = isset($row->LReinf) ? trim($row->LReinf) : 0;
                $JmlBng = isset($row->JmlBngStrip) ? trim($row->JmlBngStrip) : 0;
            } else {
                $RWa = $DWa = $RWe = $DWe = $Lebar = $JRein = $LRein = $JmlBng = 0;
                $Ket = '';
            }
            // dd($RWa, $DWa, $RWe, $DWe, $Lebar, $Ket, $JRein, $LRein, $JmlBng);
            // === Hitungan VB.NET versi Laravel ===
            $P1 = ($tTritier * 1143000);
            // dd($P1);
            $P2 = $Lebar * (($RWa * $DWa) + ($RWe * $DWe)) + 0.5 * $JRein * $LRein * $RWa * $DWa;
            // dd($P2);
            $P = ($P2 != 0) ? $P1 / $P2 : 0;
            // dd($P);
            $xReinf = ($JRein * $LRein * $RWa * $DWa * $P) / 2286000;
            // dd($xReinf);
            $BrtStrip = 0;
            $hasilList = [];

            // Loop pertama: strip WA
            foreach ($listAsal as $i => $item) {
                // dd($item);
                $xBrtStrip = 0;
                if (($item[9] ?? '') == "1") { // strip WA
                    $result = $this->listTypeAsal($sid_order, $item[0], $item[9]);
                    // dd($result);
                    $JStrip = $result['JStrip'];
                    $DBenang = $result['DBenang'];

                    $xBrtStrip = ($JStrip * $DBenang * $P) / 900000;
                    $BrtStrip += $xBrtStrip;
                    $item[4] = round($xBrtStrip, 2);
                }
                $hasilList[$i] = $item;
            }

            // Loop kedua: Bng WE & WA
            foreach ($hasilList as $i => $item) {
                if (($item[9] ?? '') == "4") { // Bng WE
                    $xBrt_WE = ($Lebar * $P * $RWe * $DWe) / 1143000;
                    $Brt_WE = $xBrt_WE; // kondisi Ket BELAH LAYAR/FLAT sama di VB (tidak beda)
                    $item[4] = round($Brt_WE, 2);
                }

                if (($item[9] ?? '') == "3") { // Bng WA
                    $xBrt_WA = ($Lebar * $P * $RWa * $DWa) / 1143000;
                    $Brt_WA = $xBrt_WA + $xReinf - $BrtStrip; // sama untuk Ket apapun
                    $item[4] = round($Brt_WA, 2);
                }

                $hasilList[$i] = $item;
            }

            // Hitung total Brt_Benang
            $Brt_Benang = 0;
            foreach ($hasilList as $item) {
                $Brt_Benang += floatval($item[4] ?? 0);
            }

            // Response akhir
            $response = [
                'Lebar' => $Lebar,
                'Ket' => $Ket,
                'RWa' => $RWa,
                'DWa' => $DWa,
                'RWe' => $RWe,
                'DWe' => $DWe,
                'JRein' => $JRein,
                'LRein' => $LRein,
                'JmlBng' => $JmlBng,
                'TotalBng' => round($Brt_Benang, 2),
                'ListAsal' => $hasilList, // hasil update per item
            ];
            // dd($response);
            return response()->json($response);

        }
    }

    private function CekDetailAsal($sKdBrg, $sidsubkel, $skode)
    {
        // Eksekusi stored procedure
        $results = DB::connection('ConnCircular')->select(
            'EXEC sp_List_Subkel @kodeBarang = ?, @idsubkel = ?',
            [trim($sKdBrg), trim($sidsubkel)]
        );
        // dd($results);
        $data = [];

        if (!empty($results)) {
            foreach ($results as $row) {
                if ($skode == 1) {
                    $data = [
                        'T0' => $row->NAMATYPE ?? '',
                        'T1' => $row->IDDIVISI ?? '',
                        'T2' => $row->namadivisi ?? '',
                        'T3' => $row->idobjek ?? '',
                        'T4' => $row->namaobjek ?? '',
                        'T5' => $row->idkelompokutama ?? '',
                        'T6' => $row->namakelompokutama ?? '',
                        'T7' => $row->idkelompok ?? '',
                        'T8' => $row->namakelompok ?? '',
                        'T9' => $row->idsubkelompok ?? '',
                        'T10' => $row->namasubkelompok ?? '',
                        'LP' => $row->satprimer ?? '',
                        'LS' => $row->satsekunder ?? '',
                        'LT' => $row->nama_satuan ?? '',
                        'Tsaldo' => $row->saldotritier ?? 0,
                    ];
                } else {
                    $data = [
                        'SaldoPrimer' => $row->SaldoPrimer ?? 0,
                        'SaldoSekunder' => $row->SaldoSekunder ?? 0,
                        'SaldoTritier' => $row->SaldoTritier ?? 0,
                    ];
                }
            }
        }

        return $data;
    }

    private function CekJumlahKeluar($sidtype)
    {
        // Panggil stored procedure
        $results = DB::connection('ConnInventory')->select(
            'EXEC SP_1486_CIR_LIST_JML_ANTRIAN @IdType = ?',
            [$sidtype]
        );
        // dd($results);
        // Default nilai
        $KeluarP = 0;
        $KeluarS = 0;
        $KeluarT = 0;

        if (!empty($results)) {
            foreach ($results as $row) {
                $KeluarP = $row->OutPrimer ?? 0;
                $KeluarS = $row->OutSekunder ?? 0;
                $KeluarT = $row->OutTritier ?? 0;
            }
        }

        return [
            'KeluarP' => $KeluarP,
            'KeluarS' => $KeluarS,
            'KeluarT' => $KeluarT,
        ];
    }

    private function listTypeAsal($sid_order, $sKd_Brg, $sKet)
    {
        $results = DB::connection('ConnCircular')->select(
            'exec sp_List_Type @kode = ?, @IdOrder = ?, @Kd_Brg = ?, @Ket = ?',
            [2, $sid_order, $sKd_Brg, $sKet]
        );
        // dd($results);
        $LKet = "0";
        $JStrip = 0;

        if (count($results) > 0) {
            $row = $results[0];
            $LKet = $row->D_TEK2 ?? "0";
            $JStrip = $row->JmlBng ?? 0;
        }

        $DBenang = match ($LKet) {
            "60" => 600,
            "70" => 700,
            "75" => 750,
            "80" => 800,
            "85" => 850,
            "90" => 900,
            "A0" => 1000,
            "F0" => 1500,
            "I0" => 1800,
            "K0" => 2000,
            "L0" => 2100,
            default => 0
        };

        return [
            'LKet' => $LKet,
            'JStrip' => $JStrip,
            'DBenang' => $DBenang
        ];
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
