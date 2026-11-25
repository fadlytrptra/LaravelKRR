<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Yajra\DataTables\Facades\DataTables;
use Exception;
use DB;
use Auth;
use Carbon\Carbon;

class MaintenanceKegiatanJahitJBB extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        $listMesin = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?', [0]);
        $user = trim(Auth::user()->NomorUser);
        return view('JumboBag.Transaksi.KegiatanJahit.MaintenanceKegiatanJahit', compact('access', 'listMesin', 'user'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $proses = $request->input('proses');
        $idLog = $request->input('idLog');
        $idDetail = $request->input('idDetail');
        $lokasi = $request->input('lokasi');
        $tanggalLog = $request->input('tanggalLog');
        $namaLine = $request->input('namaLine');
        $shiftJahit = $request->input('shiftJahit');
        $total_hasil = $request->input('total_hasil');
        $jumlah_operator = $request->input('jumlah_operator');
        $allRowsDataDetail = $request->input('allRowsDataDetail', []);
        $user = trim(Auth::user()->NomorUser);
        // dd($request->all());
        try {
            // dd($request->all());
            switch ($proses) {
                case 1:
                    // Simpan
                    DB::connection('ConnJumboBag')
                        ->statement(
                            'EXEC SP_4451_JBB_Maintenance_Log_Jahit_JBB 
                        @kode = ?,
                        @tanggalLog = ?,
                        @lokasi = ?,
                        @namaLine = ?,
                        @shiftJahit = ?,
                        @total_hasil = ?,
                        @jumlah_operator = ?,       
                        @user = ?',
                            [
                                2,
                                $tanggalLog,
                                $lokasi,
                                $namaLine,
                                $shiftJahit,
                                $total_hasil,
                                $jumlah_operator,
                                $user
                            ]
                        );

                    $idLogResult = DB::connection('ConnJumboBag')->select(
                        'EXEC SP_4451_JBB_Maintenance_Log_Jahit_JBB
                        @kode = ?,
                        @user = ?',
                        [
                            3,
                            $user,
                        ]
                    );
                    $idLogResult = $idLogResult[0]->idLog;

                    if ($idLogResult) {
                        foreach ($allRowsDataDetail as $row) {
                            DB::connection('ConnJumboBag')
                                ->statement(
                                    'EXEC SP_4451_JBB_Maintenance_Log_Jahit_JBB 
                                        @kode = ?,
                                        @idLog = ?,
                                        @nama_operator = ?,
                                        @kode_pegawai = ?,
                                        @status = ?,
                                        @customer = ?,
                                        @kodeBarang = ?,
                                        @std_waktu = ?,
                                        @hasil = ?,
                                        @keterangan_kegiatan = ?',
                                    [
                                        4,
                                        $idLogResult,
                                        $row[1],
                                        $row[2],
                                        $row[3],
                                        $row[4],
                                        $row[5],
                                        $row[6],
                                        $row[7],
                                        $row[8],
                                    ]
                                );
                        }
                    }

                    return response()->json(['message' => 'Data berhasil disimpan!']);

                case 2:
                    // Koreksi
                    DB::connection('ConnJumboBag')
                        ->statement(
                            'EXEC SP_4451_JBB_Maintenance_Log_Jahit_JBB 
                        @kode = ?,
                        @tanggalLog = ?,
                        @lokasi = ?,
                        @namaLine = ?,
                        @shiftJahit = ?,
                        @total_hasil = ?,
                        @jumlah_operator = ?,       
                        @user = ?',
                            [
                                8,
                                $tanggalLog,
                                $lokasi,
                                $namaLine,
                                $shiftJahit,
                                $total_hasil,
                                $jumlah_operator,
                                $user
                            ]
                        );

                    foreach ($allRowsDataDetail as $row) {
                        // JIKA ID DETAIL KOSONG (DATA BARU)
                        if ($row[0] == '' || $row[0] === null) {
                            DB::connection('ConnJumboBag')
                                ->statement(
                                    'EXEC SP_4451_JBB_Maintenance_Log_Jahit_JBB 
                                        @kode = ?,
                                        @idLog = ?,
                                        @nama_operator = ?,
                                        @kode_pegawai = ?,
                                        @status = ?,
                                        @customer = ?,
                                        @kodeBarang = ?,
                                        @std_waktu = ?,
                                        @hasil = ?,
                                        @keterangan_kegiatan = ?',
                                    [
                                        4,
                                        $idLog,
                                        $row[1],
                                        $row[2],
                                        $row[3],
                                        $row[4],
                                        $row[5],
                                        $row[6],
                                        $row[7],
                                        $row[8],
                                    ]
                                );
                        } else {
                            // JIKA ID DETAIL ADA (UPDATE)
                            DB::connection('ConnJumboBag')
                                ->statement(
                                    'EXEC SP_4451_JBB_Maintenance_Log_Jahit_JBB 
                                        @kode = ?,
                                        @idDetail = ?,
                                        @nama_operator = ?,
                                        @kode_pegawai = ?,
                                        @status = ?,
                                        @customer = ?,
                                        @kodeBarang = ?,
                                        @std_waktu = ?,
                                        @hasil = ?,
                                        @keterangan_kegiatan = ?',
                                    [
                                        9,
                                        $row[0],
                                        $row[1],
                                        $row[2],
                                        $row[3],
                                        $row[4],
                                        $row[5],
                                        $row[6],
                                        $row[7],
                                        $row[8],
                                    ]
                                );
                        }
                    }

                return response()->json(['message' => 'Data berhasil diupdate!']);

                case 3:
                    // Delete
                    DB::connection('ConnJumboBag')
                        ->statement(
                            'EXEC SP_4451_JBB_Maintenance_Log_Jahit_JBB 
                        @kode = ?,
                        @idLog = ?,
                        @user = ?',
                            [
                                10,
                                $idLog,
                                $user
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil dihapus!']);

                case 4:
                    // Delete Detail
                    $idDetail = $request->input('idDetail');
                    DB::connection('ConnJumboBag')
                        ->statement(
                            'EXEC SP_4451_JBB_Maintenance_Log_Jahit_JBB 
                        @kode = ?,
                        @idDetail = ?',
                            [
                                11,
                                $idDetail
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil dihapus!']);

                default:
                    return response()->json(['error', 'Proses tidak valid']);
            }

        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'initModalTambahKegiatanMesinPotong') {
            $idTypeMesin = $request->input('idTypeMesin');
            $user = trim(Auth::user()->NomorUser);
            $dataMesin = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?, @XIdTypeMesin = ?, @XNomorUser = ?', [0, $idTypeMesin, $user]);
            $dataCustomer = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?', [3]);
            return response()->json([
                'dataMesin' => $dataMesin,
                'dataCustomer' => $dataCustomer,
            ], 200);
        } else if ($id == 'getTabelHitunganByCustomer') {
            $kodeCustomer = $request->input('kodeCustomer');
            $dataTabelHit = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?,
             @XKodeCustomer = ?', [4, $kodeCustomer]);
            return response()->json($dataTabelHit, 200);
        } else if ($id == 'getKomponenByTabelHitungan') {
            $kodeBarang = $request->input('kodeBarang');
            $dataKomponen = DB::connection('ConnJumboBag')->select('EXEC SP_4384_JBB_Maintenance_Log_Mesin_Potong_JBB @XKode = ?, @XKdBrgTabelHit = ?', [5, $kodeBarang]);
            return response()->json($dataKomponen, 200);
        } else if ($id == 'getOperator') {
            $dataOperator = DB::connection('ConnJumboBag')->select('EXEC SP_4451_JBB_Maintenance_Log_Jahit_JBB @kode = ?', [1]);
            return response()->json($dataOperator, 200);
        } else if ($id == 'getSTDWaktu') {
            $kodeBarang = $request->input('kodeBarang');
            $dataSTDWaktu = DB::connection('ConnJumboBag')
                ->table(DB::raw("
                    HEAD_TABEL_HITUNGAN H
        
                    OUTER APPLY (
                        SELECT UPPER(ISNULL(H.Keterangan, '')) AS KetUpper
                    ) U
        
                    OUTER APPLY (
                        SELECT TOP 1
                            K.Kata,
                            K.Posisi
                        FROM (
                            VALUES
                                ('WSP', PATINDEX('%WSP%', U.KetUpper), 1),
                                ('WSS', PATINDEX('%WSS%', U.KetUpper), 2),
                                ('SWAT', PATINDEX('%SWAT%', U.KetUpper), 3),
                                ('STD', PATINDEX('%STD%', U.KetUpper), 4),
                                ('SWF', PATINDEX('%SWF%', U.KetUpper), 5),
                                ('WS', PATINDEX('%WS%', U.KetUpper), 6)
                        ) K(Kata, Posisi, Prioritas)
                        WHERE K.Posisi > 0
                        ORDER BY K.Posisi, K.Prioritas
                    ) K
        
                    OUTER APPLY (
                        SELECT SUBSTRING(
                            H.Keterangan,
                            K.Posisi + LEN(K.Kata),
                            100
                        ) AS Sisa
                    ) S
        
                    OUTER APPLY (
                        SELECT PATINDEX('%[0-9]%', S.Sisa) AS PosAngka
                    ) N
        
                    OUTER APPLY (
                        SELECT SUBSTRING(
                            S.Sisa,
                            N.PosAngka,
                            30
                        ) AS Angka
                    ) A
        
                    OUTER APPLY (
                        SELECT PATINDEX(
                            '%[^0-9]%',
                            A.Angka + 'X'
                        ) - 1 AS Panjang
                    ) L
                "))
                ->selectRaw("
                    CASE
                        WHEN ISNULL(H.Std_Waktu, 0) > 0
                            THEN H.Std_Waktu
                
                        WHEN N.PosAngka > 0 AND L.Panjang > 0
                            THEN CAST(
                                SUBSTRING(A.Angka, 1, L.Panjang)
                                AS INT
                            )
                
                        ELSE NULL
                    END AS Std_Waktu
                ")
                ->where('H.Kode_Barang', $kodeBarang)
                ->first();

            return response()->json($dataSTDWaktu, 200);
        } else if ($id == 'getData') {
            // dd($request->all());
            // $tgl_awal = $request->input('tgl_awal');
            // $tgl_akhir = $request->input('tgl_akhir');
            $lokasi = $request->input('lokasi');
            // dd($lokasi);
            $user = trim(Auth::user()->NomorUser);
            // if ($lokasi == 3) {
            //     // dd($lokasi);
            //     $results = DB::connection('ConnExtruder')
            //         ->select('EXEC SP_4451_JBB_Maintenance_Log_Mesin_Printing_JBB @kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [9, $tgl_awal, $tgl_akhir, $lokasi]);
            // } else {
            //     $results = DB::connection('ConnExtruder')
            //         ->select('EXEC SP_4451_MaintenanceSettingMesin @kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [4, $tgl_awal, $tgl_akhir, $lokasi]);
            // }

            $results = DB::connection('ConnJumboBag')
                ->select('EXEC SP_4451_JBB_Maintenance_Log_Jahit_JBB @kode = ?, @lokasi = ?', [5, $lokasi]);

            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggalLog' => Carbon::parse($row->tanggalLog)->format('m/d/Y'),
                    'tanggalLog_raw' => Carbon::parse($row->tanggalLog)->format('Y-m-d'),
                    'idLog' => trim($row->idLog),
                    'shiftJahit' => trim($row->shiftJahit),
                    'namaLine' => trim($row->namaLine),
                    'total_hasil' => $row->total_hasil,
                    'jumlah_operator' => $row->jumlah_operator,
                    'user_input' => trim($row->user_input),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataEdit') {
            // dd($request->all());
            $idLog = $request->input('idLog');
            $lokasi = $request->input('lokasi');
            $user = trim(Auth::user()->NomorUser);

            $results = DB::connection('ConnJumboBag')
                ->select('EXEC SP_4451_JBB_Maintenance_Log_Jahit_JBB @kode = ?, @idLog = ?', [6, $idLog]);

            return response()->json($results, 200);

        } else if ($id == 'getDataEditDetail') {
            // dd($request->all());
            $idLog = $request->input('idLog');
            $lokasi = $request->input('lokasi');
            $user = trim(Auth::user()->NomorUser);

            $results = DB::connection('ConnJumboBag')
                ->select('EXEC SP_4451_JBB_Maintenance_Log_Jahit_JBB @kode = ?, @idLog = ?', [7, $idLog]);

            return datatables($results)->make(true);

        }
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
