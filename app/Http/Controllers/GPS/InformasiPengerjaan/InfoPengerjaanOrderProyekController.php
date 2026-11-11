<?php

namespace App\Http\Controllers\GPS\InformasiPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Dba\Connection;
use Illuminate\Support\Facades\Auth;

class InfoPengerjaanOrderProyekController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');

        // Default date: awal bulan s/d akhir bulanp
        $now = Carbon::now();
        $startDate = $now->copy()->startOfMonth()->format('Y-m-d');
        $endDate = $now->copy()->endOfMonth()->format('Y-m-d');

        return view('GPS.InformasiPengerjaan.infoPengerjaanOrderProyek', compact('access', 'startDate', 'endDate'));
    }

    // SP_5298_PJW_INF-JDW-TRANSAKSI, SP_5298_PJW_LIST-MATERIAL-LENGKAP, SP_5298_PJW_LIST-SPART-BAGIAN,
    // SP_5298_PJW_BIAYA-PROSES-BAGIAN, SP_5298_PJW_INF-JADWAL-ORDER-KRJ/PRY, SP_5298_PJW_SAVE-STSREADY
    public function getListOrder(Request $request)
    {
        $validated = $request->validate([
            'date1' => 'required|date',
            'date2' => 'required|date|after_or_equal:date1',
        ]);

        $db = DB::connection('Connworkshop');
        try {
            // Ambil daftar order dari SP_5298_PJW_INF-JDW-TRANSAKSI
            $orders = $db->select('EXEC [dbo].[SP_5298_PJW_INF-JDW-TRANSAKSI] @date1=?, @date2=?', [
                $validated['date1'],
                $validated['date2']
            ]);

            $unique = [];
            $lastIndex = -1;

            foreach ($orders as $o) {
                if ($lastIndex === -1) {
                    $lastIndex++;
                    $unique[$lastIndex] = $o;
                } else {
                    $prevIdBagian = trim($unique[$lastIndex]->IdBagian ?? '');
                    $currIdBagian = trim($o->IdBagian ?? '');

                    if ($prevIdBagian !== $currIdBagian) {
                        $lastIndex++;
                        $unique[$lastIndex] = $o;
                    } else {
                        $prevEstDate = \Carbon\Carbon::parse($unique[$lastIndex]->EstDate)->format('Y-m-d');
                        $currEstDate = \Carbon\Carbon::parse($o->EstDate)->format('Y-m-d');

                        if ($prevEstDate === $currEstDate) {
                            if (($o->Cancel ?? 1) == 0) {
                                $unique[$lastIndex] = $o;
                            }
                        }
                    }
                }
            }
            $unique = array_values($unique);

            $result = [];
            $totalBiayaAll = 0;

            foreach ($unique as $order) {
                $jenisOd = $order->JenisOrder;
                $idBagian = $order->IdBagian;
                $noAntri = trim($order->NoAntrian);
                $estDate = $order->EstDate;
                $noType = $order->NoType;
                $stsReady = $order->StsReady1 ?? null;

                // Biaya material (kode 3)
                $biMaterial = 0;
                $mat = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL-LENGKAP] @kode=?, @idBagian=?, @date1=?, @date2=?', [
                    3,
                    $idBagian,
                    $validated['date1'],
                    $validated['date2']
                ]);
                if (!empty($mat) && isset($mat[0]->TotalHarga) && isset($mat[0]->TotalHargaB)) {
                    $biMaterial = $mat[0]->TotalHarga + $mat[0]->TotalHargaB;
                }

                // Biaya spart (kode 7)
                $biSpart = 0;
                $sp = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-SPART-BAGIAN] @kode=?, @noBagian=?, @date1=?, @date2=?', [
                    7,
                    $idBagian,
                    $validated['date1'],
                    $validated['date2']
                ]);
                if (!empty($sp) && isset($sp[0]->TotalHargaB) && isset($sp[0]->TotalHargaS)) {
                    $biSpart = $sp[0]->TotalHargaB + $sp[0]->TotalHargaS;
                }

                // Biaya proses
                $biProses = 0;

                // Total Biaya Proses
                $totalProses = $db->table('VW_PRG_5298_PJW_BIAYA-PROSES-BAGIAN')
                    ->where('IdBagian', $idBagian)
                    ->whereDate('SetujuKR', '>=', $validated['date1'])
                    ->whereDate('SetujuKR', '<=', $validated['date2'])
                    ->sum('Biaya');

                // Total Biaya Makloon
                $totalMakloon = $db->table('Harga_Makloon')
                    ->where('IdBagian', $idBagian)
                    ->whereDate('TimeInput', '>=', $validated['date1'])
                    ->whereDate('TimeInput', '<=', $validated['date2'])
                    ->sum('HargaTotal');

                // Total Biaya Proses + Makloon
                $biProses = $totalProses + $totalMakloon;

                // Cek kelengkapan material (kode 2)
                $dt_mtr = false;
                $materials = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL-LENGKAP] ?, ?', [
                    2,
                    $idBagian
                ]);
                if (!empty($materials)) {
                    $i = $spek = $kd = $jml = $hrg = 0;
                    foreach ($materials as $m) {
                        $i++;
                        if (!empty(trim($m->Spek ?? '')))
                            $spek++;
                        if (!empty(trim($m->KdBrg ?? '')))
                            $kd++;
                        if (($m->Jml ?? 0) > 0)
                            $jml++;
                        if (($m->Status ?? 0) == 0) {
                            if (($m->Harga ?? 0) > 0)
                                $hrg++;
                        } else {
                            if (($m->HargaBekas ?? 0) > 0)
                                $hrg++;
                        }
                    }
                    if ($i > 0 && $spek == $i && $kd == $i && $jml == $i && $hrg == $i) {
                        $dt_mtr = true;
                    }
                }

                // Info order dari SP_5298_PJW_INF-JADWAL-ORDER-KRJ/PRY
                $spName = ($jenisOd === 'H')
                    ? 'SP_5298_PJW_INF-JADWAL-ORDER-KRJ'
                    : 'SP_5298_PJW_INF-JADWAL-ORDER-PRY';
                $info = $db->select("EXEC [dbo].[$spName] @kode=?, @noAntri=?, @date1=?, @noType=?", [
                    1,
                    $noAntri,
                    $estDate,
                    $noType
                ]);
                if (empty($info))
                    continue;
                $info = $info[0];

                $orderSp = ($jenisOd === 'H')
                    ? 'SP_5298_PJW_LIST-ORDER-KERJA'
                    : 'SP_5298_PJW_LIST-ORDER-PROYEK';
                $orderDetail = $db->select("EXEC [dbo].[$orderSp] ?, ?", [
                    2,
                    trim($info->NoOrder ?? '')
                ]);
                $satuan = $info->Nama_Satuan
                    ?? $info->Satuan
                    ?? ($orderDetail[0]->Satuan ?? '');

                $row = [
                    'NoOrder' => trim($info->NoOrder ?? ''),
                    'DM' => $dt_mtr ? 'BL' : 'L',
                    'NamaBarang' => ($jenisOd === 'H') ? trim($info->Nama_Brg ?? '') : trim($info->Nama_Proyek ?? ''),
                    'NamaBagian' => trim($info->NamaBagian ?? ''),
                    'TglStart' => trim($info->EstDate ?? ''),
                    'KdBarang' => ($jenisOd === 'H') ? trim($info->Kd_Brg ?? '') : '',
                    'Divisi' => trim($info->NamaDivisi ?? ''),
                    'StatusOrder' => trim($info->Keterangan ?? ''),
                    'JmlOrder' => trim(implode(' ', array_filter([
                        trim((string) ($info->Jml_Brg ?? '')),
                        trim((string) $satuan),
                    ]))),
                    'TglFinish' => '',
                    'StatusMtr' => '',
                    'IdTrans' => '',
                    'Keterangan' => '',
                    'TotalBiaya' => '',
                    'TglBon' => '',
                    'rowColor' => '',
                ];

                $biTotal = 0;
                $tglFinish = $info->TglFinish ?? null;
                $cancel = $info->Cancel ?? 0;
                $ketCancel = $info->KetCancel ?? '';
                $tglBon = $info->TglBon ?? null;

                if (!is_null($tglFinish)) {
                    if ($cancel == 1) {
                        $row['rowColor'] = 'hotpink';
                        if (!empty($ketCancel)) {
                            $row['Keterangan'] = trim($ketCancel);
                            $row['IdTrans'] = $idBagian;
                        }
                    } else {
                        $row['rowColor'] = 'blue';
                        $row['TglFinish'] = trim($tglFinish);
                        $row['IdTrans'] = $idBagian;
                        $biTotal = $biProses + $biMaterial + $biSpart;
                        $row['TotalBiaya'] = number_format($biTotal, 2, '.', ',');
                        $totalBiayaAll += $biTotal;
                        $row['TglBon'] = $tglBon ? trim($tglBon) : '';
                    }
                } else {
                    if ($cancel == 1) {
                        $row['rowColor'] = 'hotpink';
                        if (!empty($ketCancel)) {
                            $row['Keterangan'] = trim($ketCancel);
                        }
                    } else {
                        if ($stsReady === '1') {
                            $row['StatusMtr'] = 'Ready';
                            $row['IdTrans'] = $idBagian;
                            $biTotal = $biProses + $biMaterial + $biSpart;
                            $row['TotalBiaya'] = number_format($biTotal, 2, '.', ',');
                            $totalBiayaAll += $biTotal;
                            $row['TglBon'] = $tglBon ? trim($tglBon) : '';
                        } elseif ($stsReady === '0') {
                            $row['rowColor'] = 'limegreen';
                            $row['StatusMtr'] = 'Not Ready';
                            $row['IdTrans'] = $idBagian;
                        } else {
                            $today = Carbon::now()->startOfDay();
                            $estDateObj = Carbon::parse($estDate)->startOfDay();
                            $threeDaysLater = $today->copy()->addDays(3);
                            if ($estDateObj >= $today && $estDateObj <= $threeDaysLater) {
                                // Set Not Ready via SP_5298_PJW_SAVE-STSREADY kode=1
                                $db->select('EXEC [dbo].[SP_5298_PJW_SAVE-STSREADY] ?, ?, ?', [
                                    1,
                                    $idBagian,
                                    $estDate
                                ]);
                                $row['rowColor'] = 'limegreen';
                                $row['StatusMtr'] = 'Not Ready';
                                $row['IdTrans'] = $idBagian;
                            } else {
                                $row['IdTrans'] = $idBagian;
                                $row['TglBon'] = $tglBon ? trim($tglBon) : '';
                            }
                        }
                    }
                }

                $result[] = $row;
            }

            return response()->json([
                'success' => true,
                'data' => $result,
                'totalBiaya' => number_format($totalBiayaAll, 2, '.', ','),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_LIST-MATERIAL-LENGKAP
    public function getListMaterial(Request $request)
    {
        $validated = $request->validate([
            'noOrder' => ['required', 'string', 'max:100'],
            'namaBagian' => ['required', 'string', 'max:100'],
            'jenisOrder' => ['required', 'in:H,P'],
        ]);

        try {
            $rows = DB::connection('Connworkshop')->select(
                'EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL-LENGKAP] @noOrder=?, @namaBagian=?, @jenisOrder=?',
                [
                    trim($validated['noOrder']),
                    trim($validated['namaBagian']),
                    $validated['jenisOrder'],
                ]
            );

            $data = [];
            foreach ($rows as $row) {
                $status = (int) ($row->Status ?? 0);
                $data[] = [
                    'MtrType' => trim($row->MtrType ?? ''),
                    'Spek' => trim($row->Spek ?? ''),
                    'KdBrg' => trim($row->KdBrg ?? ''),
                    'Jml' => number_format((float) ($row->Jml ?? 0), 2, '.', ','),
                    'NamaSatuan' => trim($row->Nama_Satuan ?? ''),
                    'Status' => $status,
                    'HargaBaru' => $status === 0
                        ? ((float) ($row->Harga ?? 0) > 0 ? 'Ada' : 'Belum ada')
                        : '',
                    'HargaBekas' => $status === 1
                        ? ((float) ($row->HargaBekas ?? 0) > 0 ? 'Ada' : 'Belum ada')
                        : '',
                ];
            }

            return response()->json(['success' => true, 'data' => $data]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    public function getUserType(Request $request)
    {
        // $user = $request->user ?? (auth()->user()->username ?? 'admin');
        $user = Auth::check() ? Auth::user()->NomorUser : null;
        $db = DB::connection('Connworkshop');
        try {
            $res = $db->select('EXEC [dbo].[SP_5298_PJW_USER-PENJADWALAN] ?', [$user]);
            $jenis = 0;
            if (!empty($res) && isset($res[0]->IdJenisUser)) {
                $jenis = $res[0]->IdJenisUser;
            }
            return response()->json(['jenis' => $jenis]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_SAVE-STSREADY kode=2
    public function setReady(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.idBag' => 'required|integer',
            'items.*.estDate' => 'required|date',
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $count = 0;
            foreach ($validated['items'] as $item) {
                $db->select('EXEC [dbo].[SP_5298_PJW_SAVE-STSREADY] ?, ?, ?', [
                    2,
                    $item['idBag'],
                    $item['estDate']
                ]);
                $count++;
            }
            return response()->json(['success' => true, 'message' => "Data sudah diproses: $count item"]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // SP_5298_PJW_SAVE-STSBON
    public function setBon(Request $request)
    {
        $validated = $request->validate([
            'idBag' => 'required|integer',
            'estDate' => 'required|date',
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $db->statement('EXEC [dbo].[SP_5298_PJW_SAVE-STSBON] ?, ?', [
                $validated['idBag'],
                $validated['estDate']
            ]);
            return response()->json(['success' => true, 'message' => 'BON Material berhasil diproses']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    private function invDb()
    {
        return DB::connection(config('database.connections.ConnInventory')
            ? 'ConnInventory' : 'Connworkshop');
    }

    private function mhnRowValue($row, array $aliases, $default = null)
    {
        $columns = [];
        foreach ((array) $row as $key => $value) {
            $normalizedKey = strtolower(preg_replace('/[^a-z0-9]/i', '', (string) $key));
            $columns[$normalizedKey] = $value;
        }

        foreach ($aliases as $alias) {
            $normalizedAlias = strtolower(preg_replace('/[^a-z0-9]/i', '', (string) $alias));
            if (array_key_exists($normalizedAlias, $columns)) {
                return $columns[$normalizedAlias];
            }
        }

        return $default;
    }

    // SP_5298_PJW_LIST-MOHON-TMPTRANSAKSI (kode=1 pemohon / kode=2 all)
    public function mhnGetListMohon(Request $request)
    {
        $v = $request->validate([
            'kode' => ['required', 'in:1,2'],
            'idDivisi' => ['required', 'string'],
        ]);
        $user = Auth::check() ? Auth::user()->NomorUser : '';
        try {
            $db = $this->invDb();
            if ($v['kode'] == 1) {
                $rows = $db->select(
                    'EXEC [dbo].[SP_5298_PJW_LIST-MOHON-TMPTRANSAKSI] ?, ?, ?, ?',
                    [1, '02', $v['idDivisi'], $user]
                );
            } else {
                $rows = $db->select(
                    'EXEC [dbo].[SP_5298_PJW_LIST-MOHON-TMPTRANSAKSI] ?, ?, ?',
                    [2, '02', $v['idDivisi']]
                );
            }
            $result = [];
            foreach ($rows as $r) {
                $result[] = [
                    'IdTransaksi' => trim($r->IdTransaksi ?? ''),
                    'NamaType' => trim($r->NamaType ?? ''),
                    'UraianDetail' => trim($r->UraianDetailTransaksi ?? ''),
                    'IdPenerima' => trim($r->IdPenerima ?? ''),
                    'SaatAwal' => trim($r->SaatAwalTransaksi ?? ''),
                    'NamaDivisi' => trim($r->NamaDivisi ?? ''),
                    'NamaObjek' => trim($r->NamaObjek ?? ''),
                    'NamaKelUtama' => trim($r->NamaKelompokUtama ?? ''),
                    'NamaKelompok' => trim($r->NamaKelompok ?? ''),
                    'NamaSubKel' => trim($r->NamaSubKelompok ?? ''),
                    'KodeBarang' => trim($r->KodeBarang ?? ''),
                    'IdType' => trim($r->Idtype ?? ''),
                    'Primer' => (float) ($r->JumlahPengeluaranPrimer ?? 0),
                    'Sekunder' => (float) ($r->JumlahPengeluaranSekunder ?? 0),
                    'Tritier' => (float) ($r->JumlahPengeluaranTritier ?? 0),
                    'SatPrimer' => trim($r->SatPrimer ?? ''),
                    'SatSekunder' => trim($r->SatSekunder ?? ''),
                    'SatTritier' => trim($r->SatTritier ?? ''),
                    'IdPenerima1' => trim($r->IdPenerima1 ?? ''),
                ];
            }
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // User divisi list (tujuan / asal)
    public function mhnGetDivisiList(Request $request)
    {
        $v = $request->validate(['mode' => ['required', 'in:tujuan,asal']]);
        $user = Auth::check() ? Auth::user()->NomorUser : '';
        // $db = DB::connection('ConnInventory');
        // Hanya untuk test hapus atau commet
        // if ($user == '4384') {
        //     $user = '0000001';
        // }

        try {
            $db = $this->invDb();
            $sp = $v['mode'] === 'asal' ? 'SP_5298_PJW_USERDIVISI-DIMINTA' : 'SP_5298_PJW_USERDIVISI';
            $list = $db->select("EXEC [dbo].[$sp] ?", [$user]);
            $result = [];
            foreach ($list as $item) {
                $arr = array_values((array) $item);
                $result[] = ['Id' => $arr[1] ?? '', 'Nama' => $arr[0] ?? ''];
            }
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // User objek list
    public function mhnGetObjekList(Request $request)
    {
        $v = $request->validate([
            'mode' => ['required', 'in:tujuan,asal'],
            'idDivisi' => ['required', 'string'],
        ]);
        $user = Auth::check() ? Auth::user()->NomorUser : '';
        // hanya utuk test hapus atau commet
        // if ($user == '4384') {
        //     $user = '0000001';
        // }
        try {
            $db = $this->invDb();
            $sp = $v['mode'] === 'asal' ? 'SP_5298_PJW_USEROBJEK-DIMINTA' : 'SP_5298_PJW_USER-OBJEK';
            $list = $db->select("EXEC [dbo].[$sp] ?, ?", [$user, $v['idDivisi']]);
            $result = [];
            foreach ($list as $item) {
                $arr = array_values((array) $item);
                $result[] = ['Id' => $arr[1] ?? '', 'Nama' => $arr[0] ?? ''];
            }
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mhnGetKelUtamaList(Request $request)
    {
        $v = $request->validate(['idObjek' => ['required', 'string']]);
        try {
            $db = $this->invDb();
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_IDOBJEK-KELOMPOKUTAMA] ?', [$v['idObjek']]);
            $result = [];
            foreach ($list as $item) {
                $arr = array_values((array) $item);
                $result[] = ['Id' => $arr[1] ?? '', 'Nama' => $arr[0] ?? ''];
            }
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mhnGetKelompokList(Request $request)
    {
        $v = $request->validate(['idKelUtama' => ['required', 'string']]);
        try {
            $db = $this->invDb();
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_IDKELOMPOKUTAMA-KELOMPOK] ?', [$v['idKelUtama']]);
            $result = [];
            foreach ($list as $item) {
                $arr = array_values((array) $item);
                $result[] = ['Id' => $arr[1] ?? '', 'Nama' => $arr[0] ?? ''];
            }
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mhnGetSubKelList(Request $request)
    {
        $v = $request->validate(['idKelompok' => ['required', 'string']]);
        try {
            $db = $this->invDb();
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_IDKELOMPOK-SUBKELOMPOK] ?', [$v['idKelompok']]);
            $result = [];
            foreach ($list as $item) {
                $arr = array_values((array) $item);
                $result[] = ['Id' => $arr[1] ?? '', 'Nama' => $arr[0] ?? ''];
            }
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mhnGetTypeList(Request $request)
    {
        $v = $request->validate(['idSubKel' => ['required', 'string']]);
        try {
            $db = $this->invDb();
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_IDSUBKELOMPOK-TYPE] ?', [$v['idSubKel']]);
            $result = [];
            foreach ($list as $item) {
                $arr = array_values((array) $item);
                $result[] = [
                    'Id' => $this->mhnRowValue($item, ['IdType', 'Id'], $arr[1] ?? ''),
                    'Nama' => $this->mhnRowValue($item, ['NamaType', 'Nama'], $arr[0] ?? ''),
                ];
            }
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Kode barang + stock pemberi
    // Kode barang + stock pemberi (mendukung idType ATAU kodeBarang langsung)
    public function mhnGetKodeBarang(Request $request)
    {
        $v = $request->validate([
            'idType' => ['nullable', 'string'],
            'kodeBarang' => ['nullable', 'string'],
            'idSubKel' => ['required', 'string'],
        ]);

        try {
            $db = $this->invDb();

            // Tentukan kode barang: langsung dari input, atau lookup lewat idType
            $kodeBarang = '';
            if (!empty($v['kodeBarang'])) {
                $kodeBarang = trim($v['kodeBarang']);
            } elseif (!empty($v['idType'])) {
                $kb = collect($db->select(
                    'EXEC [dbo].[SP_5298_PJW_NAMATYPE-TYPE] ?, ?',
                    [$v['idType'], $v['idSubKel']]
                ))->first();
                $kodeBarang = trim((string) $this->mhnRowValue($kb, ['KodeBarang', 'KdBrg'], ''));
            }

            if (!$kodeBarang) {
                return response()->json(['error' => 'idType atau kodeBarang harus diisi.'], 422);
            }

            $r = collect($db->select(
                'EXEC [dbo].[SP_5298_PJW_KODEBARANG-TYPE] ?, ?',
                [$kodeBarang, $v['idSubKel']]
            ))->first();

            if (!$r) {
                return response()->json([
                    'error' => 'Barang tidak ditemukan pada Sub Kelompok pemberi.',
                ], 404);
            }

            return response()->json([
                'KodeBarang' => $kodeBarang,
                'IdType' => trim((string) $this->mhnRowValue($r, ['IdType'], '')),
                'NamaType' => trim((string) $this->mhnRowValue($r, ['NamaType'], '')),
                'Primer1' => (float) $this->mhnRowValue($r, ['SaldoPrimer'], 0),
                'Sekunder1' => (float) $this->mhnRowValue($r, ['SaldoSekunder'], 0),
                'Tritier1' => (float) $this->mhnRowValue($r, ['SaldoTritier'], 0),
                'SatPrimer1' => trim((string) $this->mhnRowValue($r, ['SatuanPrimer'], '')),
                'SatSekunder1' => trim((string) $this->mhnRowValue($r, ['SatuanSekunder'], '')),
                'SatTritier1' => trim((string) $this->mhnRowValue($r, ['SatuanTritier'], '')),
                'KonvBeri' => trim((string) $this->mhnRowValue($r, ['PakaiAturanKonversi'], '')),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Cek kode barang pemberi (kode + subkel)
    public function mhnCekKodeBarang(Request $request)
    {
        $v = $request->validate([
            'kodeBarang' => ['required', 'string'],
            'idSubKel' => ['required', 'string'],
        ]);
        try {
            $db = $this->invDb();
            $kode = str_pad(trim($v['kodeBarang']), 9, '0', STR_PAD_LEFT);
            $r = collect($db->select(
                'EXEC [dbo].[SP_5298_PJW_CEKKODEBARANG-TYPE] ?, ?',
                [$kode, $v['idSubKel']]
            ))->first();
            return response()->json(['jumlah' => (int) ($r->jumlah ?? 0)]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Kode barang penerima (satuan tujuan)
    public function mhnGetKodeBarangTerima(Request $request)
    {
        $v = $request->validate([
            'kodeBarang' => ['required', 'string'],
            'idSubKel' => ['required', 'string'],
        ]);
        try {
            $db = $this->invDb();
            $r = collect($db->select(
                'EXEC [dbo].[SP_5298_PJW_KODEBARANG-TYPE] ?, ?',
                [$v['kodeBarang'], $v['idSubKel']]
            ))->first();
            if (!$r) {
                return response()->json([
                    'error' => 'Type barang tidak ditemukan pada Sub Kelompok penerima.',
                ], 404);
            }
            return response()->json([
                'SatPrimer' => trim((string) $this->mhnRowValue($r, ['SatuanPrimer'], '')),
                'SatSekunder' => trim((string) $this->mhnRowValue($r, ['SatuanSekunder'], '')),
                'SatTritier' => trim((string) $this->mhnRowValue($r, ['SatuanTritier'], '')),
                'KonvTerima' => trim((string) $this->mhnRowValue($r, ['PakaiAturanKonversi'], '')),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // INSERT-02-TMPTRANSAKSI
    public function mhnInsertTmp(Request $request)
    {
        $v = $request->validate([
            'idType' => ['required', 'string'],
            'idPenerima' => ['required', 'string'],
            'primer' => ['required', 'numeric'],
            'sekunder' => ['required', 'numeric'],
            'tritier' => ['required', 'numeric'],
            'idSubKelAsal' => ['required', 'string'],
            'idSubKelTujuan' => ['required', 'string'],
            'alasan' => ['nullable', 'string'],
            'tanggal' => ['required', 'date'],
        ]);
        if (
            (float) $v['primer'] === 0.0 &&
            (float) $v['sekunder'] === 0.0 &&
            (float) $v['tritier'] === 0.0
        ) {
            return response()->json(['error' => 'Jumlah BON tidak boleh 0.'], 422);
        }
        if ($v['idSubKelAsal'] === $v['idSubKelTujuan']) {
            return response()->json(
                ['error' => 'Sub Kelompok Asal dan Tujuan tidak boleh sama.'],
                422,
            );
        }
        try {
            $db = $this->invDb();
            $v['idPenerima'] = Auth::check() ? Auth::user()->NomorUser : $v['idPenerima'];
            $db->select('EXEC [dbo].[SP_5298_PJW_INSERT-02-TMPTRANSAKSI] @XIdTypeTransaksi=?, @XUraianDetailTransaksi=?, @XSaatawalTransaksi=?, @XIdType=?, @XIdPenerima=?, @XJumlahKeluarPrimer=?, @XJumlahKeluarSekunder=?, @XJumlahKeluarTritier=?, @XAsalIdSubKelompok=?, @XTujuanIdSubkelompok=?', [
                '02',
                $v['alasan'] ?? '',
                $v['tanggal'],
                $v['idType'],
                $v['idPenerima'],
                $v['primer'],
                $v['sekunder'],
                $v['tritier'],
                $v['idSubKelAsal'],
                $v['idSubKelTujuan'],
            ]);
            return response()->json(['success' => true, 'message' => 'Data berhasil disimpan.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // UPDATE-TMPTRANSAKSI
    public function mhnUpdateTmp(Request $request)
    {
        $v = $request->validate([
            'idTransaksi' => ['required', 'string'],
            'alasan' => ['nullable', 'string'],
            'primer' => ['required', 'numeric'],
            'sekunder' => ['required', 'numeric'],
            'tritier' => ['required', 'numeric'],
            'idSubKelTujuan' => ['required', 'string'],
        ]);
        if (
            (float) $v['primer'] === 0.0 &&
            (float) $v['sekunder'] === 0.0 &&
            (float) $v['tritier'] === 0.0
        ) {
            return response()->json(['error' => 'Jumlah BON tidak boleh 0.'], 422);
        }
        try {
            $db = $this->invDb();
            $db->select('EXEC [dbo].[SP_5298_PJW_UPDATE-TMPTRANSAKSI] @XIdTransaksi=?, @XUraianDetailTransaksi=?, @XJumlahKeluarPrimer=?, @XJumlahKeluarSekunder=?, @XJumlahKeluarTritier=?, @XTujuanSubkelompok=?', [
                $v['idTransaksi'],
                $v['alasan'] ?? '',
                $v['primer'],
                $v['sekunder'],
                $v['tritier'],
                $v['idSubKelTujuan'],
            ]);
            return response()->json(['success' => true, 'message' => 'Data berhasil dikoreksi.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // DELETE-TMPTRANSAKSI
    public function mhnDeleteTmp(Request $request)
    {
        $v = $request->validate(['idTransaksi' => ['required', 'string']]);
        try {
            $db = $this->invDb();
            $db->select('EXEC [dbo].[SP_5298_PJW_DELETE-TMPTRANSAKSI] @XIdTransaksi=?', [$v['idTransaksi']]);
            return response()->json(['success' => true, 'message' => 'Data berhasil dihapus.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // TUJUANSUBKELOMPOK-TMPTRANSAKSI
    public function mhnGetTujuanDetail(Request $request)
    {
        $v = $request->validate(['idTransaksi' => ['required', 'string']]);
        try {
            $db = $this->invDb();
            $r = collect($db->select(
                'EXEC [dbo].[SP_5298_PJW_TUJUANSUBKELOMPOK-TMPTRANSAKSI] ?',
                [$v['idTransaksi']]
            ))->first();
            return response()->json([
                'IdDivisi' => trim($r->IdDivisi ?? ''),
                'IdObjek' => trim($r->IdObjek ?? ''),
                'IdKelUtama' => trim($r->IdKelompokUtama ?? ''),
                'IdKelompok' => trim($r->IDKelompok ?? ''),
                'IdSubKel' => trim($r->Idsubkelompok ?? ''),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // ASALSUBKELOMPOK-TMPTRANSAKSI
    public function mhnGetAsalDetail(Request $request)
    {
        $v = $request->validate(['idTransaksi' => ['required', 'string']]);
        try {
            $db = $this->invDb();
            $r = collect($db->select(
                'EXEC [dbo].[SP_5298_PJW_ASALSUBKELOMPOK-TMPTRANSAKSI] ?',
                [$v['idTransaksi']]
            ))->first();
            return response()->json([
                'IdDivisi' => trim($r->iddivisi ?? ''),
                'IdObjek' => trim($r->IdObjek ?? ''),
                'IdKelUtama' => trim($r->IdKelompokUtama ?? ''),
                'IdKelompok' => trim($r->IdKelompok ?? ''),
                'IdSubKel' => trim($r->IdSubkelompok ?? ''),
                'NamaDivisi' => trim($r->NamaDivisi ?? ''),
                'NamaObjek' => trim($r->namaobjek ?? ''),
                'NamaKelUtama' => trim($r->namakelompokutama ?? ''),
                'NamaKelompok' => trim($r->NamaKelompok ?? ''),
                'NamaSubKel' => trim($r->namasubkelompok ?? ''),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
