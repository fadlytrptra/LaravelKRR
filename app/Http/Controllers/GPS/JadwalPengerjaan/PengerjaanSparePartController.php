<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PengerjaanSparePartController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.JadwalPengerjaan.PengerjaanSparePart', compact('access'));
    }

    // Load order kerja / proyek
    public function getOrder(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $sp = $validated['jenisOd'] === 'H'
                ? 'EXEC [dbo].[SP_5298_PJW_LIST-ORDER-KERJA] ?, ?'
                : 'EXEC [dbo].[SP_5298_PJW_LIST-ORDER-PROYEK] ?, ?';

            $order = collect($db->select($sp, [1, $validated['noOd']]))->first();
            if (!$order) {
                $label = $validated['jenisOd'] === 'H' ? 'Order Kerja' : 'Order Proyek';
                return response()->json(['error' => "Nomer $label {$validated['noOd']} tidak ada, belum di-ACC, ditolak, atau sudah finish."], 404);
            }

            return response()->json([
                'TDivisi'    => $order->NamaDivisi ?? '',
                'TKdBrg'     => $order->Kd_Brg ?? '',
                'TNamaBrg'   => $validated['jenisOd'] === 'H' ? ($order->Nama_Brg ?? '') : ($order->Nama_Proyek ?? ''),
                'TNoGbr'     => $order->No_Gbr ?? '',
                'TJml'       => trim(($order->Jml_Brg ?? '0') . ' ' . ($order->Satuan ?? '')),
                'OdSts'      => $order->OdSts ?? '',
                'TKetOrder'  => $order->Ket_Order ?? '',
                'TMesin'     => $order->Mesin ?? '',
                'TUserOrder' => $order->UserOrder ?? '',
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }


    // Lookup bagian barang (SP_5298_PJW_LIST-BAGIAN-BARANG)

    public function getBagianList(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-BARANG] ?, ?', [
                $validated['noOd'],
                $validated['jenisOd']
            ]);
            return response()->json(array_map(function ($item) {
                return [
                    'IdBagian'   => $item->NoBagian ?? ($item->IdBagian ?? ''),
                    'NamaBagian' => $item->NamaBagian ?? '',
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Lookup spare part existing (SP_5298_PJW_LIST-SPART-BAGIAN kode=4)
    public function getSpartExisting(Request $request)
    {
        $validated = $request->validate([
            'noBagian' => ['required', 'integer'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-SPART-BAGIAN] ?, ?', [
                4,
                $validated['noBagian']
            ]);
            return response()->json(array_map(function ($item) {
                return [
                    'Nomer'      => $item->Nomer ?? '',
                    'KdBarang'   => $item->KdBrg ?? ($item->KdBarang ?? ''),
                    'NamaBarang' => $item->NM_BRG ?? ($item->NamaBarang ?? ''),
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Detail spare part (SP_5298_PJW_LIST-SPART-BAGIAN kode=1)
    public function getSpartDetail(Request $request)
    {
        $validated = $request->validate([
            'nomer'    => ['required', 'integer'],
            'noBagian' => ['required', 'integer'],
        ]);

        $db = DB::connection('Connworkshop');
        try {
            $row = collect($db->select('EXEC [dbo].[SP_5298_PJW_LIST-SPART-BAGIAN] @kode=?, @nomer=?, @noBagian=?', [
                1,
                $validated['nomer'],
                $validated['noBagian']
            ]))->first();

            if (!$row) {
                return response()->json(['error' => 'Detail spare part tidak ditemukan.'], 404);
            }

            $status = (int)($row->Status ?? 0);
            return response()->json([
                'Jml'        => (float)($row->Jml ?? 0),
                'Status'     => $status,
                'StatusText' => ($status === 0) ? 'STOCK' : 'BARU',
                'HargaStok'  => (float)($row->HargaStok ?? 0),
                'HargaBaru'  => (float)($row->HargaBaru ?? 0),
                'NamaSatuan' => $row->Nama_Satuan ?? '',
                'NoSat'      => $row->NoSat ?? '',
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Lookup kategori (SP_5298_PJW_MOHON-BELI)
    // myType: 1=KatUtama, 2=Kategori, 3=SubKat, 5=Barang
    public function getMohonBeli(Request $request)
    {
        $validated = $request->validate([
            'myType'  => ['required', 'integer', 'in:1,2,3,5'],
            'myValue' => ['nullable', 'string'],
        ]);

        try {
            $type = $validated['myType'];
            $hasSecondParam = $type !== 1;

            $sql = 'EXEC [dbo].[SP_5298_PJW_MOHON-BELI] ' . ($hasSecondParam ? '?, ?' : '?');
            $params = $hasSecondParam ? [$type, $validated['myValue'] ?? ''] : [$type];

            $list = DB::connection('ConnPurchase')->select($sql, $params);

            $result = array_map(fn($item) => [
                'Kode' => $item->no_kat_utama
                    ?? $item->no_kategori
                    ?? $item->no_sub_kategori
                    ?? $item->KD_BRG
                    ?? '',
                'Nama' => $item->nama
                    ?? $item->nama_kategori
                    ?? $item->nama_sub_kategori
                    ?? $item->NAMA_BRG
                    ?? '',
            ], $list);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Load barang by kode (SP_5298_PJW_LOAD-BARANG) di DB PURCHASE
    public function loadBarang(Request $request)
    {
        $validated = $request->validate([
            'kdBarang' => ['required', 'string', 'max:20'],
        ]);

        $db = DB::connection('ConnPurchase');
        try {
            $row = collect($db->select('EXEC [dbo].[SP_5298_PJW_LOAD-BARANG] @KdBarang=?', [
                $validated['kdBarang']
            ]))->first();

            if (!$row) {
                return response()->json(['error' => 'Kode barang tidak ada.'], 404);
            }

            return response()->json([
                'KatUtama'  => $row->nama ?? '',
                'Kategori'  => $row->nama_kategori ?? '',
                'SubKat'    => $row->nama_sub_kategori ?? '',
                'NamaBarang' => $row->nama_brg ?? '',
                'Satuan'    => $row->Nm_Sat_Tri ?? '',
                'NoSat'     => $row->ST_TRI ?? '',
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Lookup satuan (SP_5298_PJW_SATUAN)
    public function getSatuanList()
    {
        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_SATUAN]');
            return response()->json(array_map(function ($item) {
                return [
                    'NoSat'  => $item->No_Satuan ?? ($item->NoSat ?? ''),
                    'Satuan' => $item->Nama_Satuan ?? ($item->Satuan ?? ''),
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Proses simpan/koreksi/hapus S/Part (SP_5298_PJW_MAINT-SPART-BAGIAN)
    // kode:
    // 1 = insert stock, 2 = insert baru
    // 3 = update stock, 4 = update baru
    // 5 = delete
    public function store(Request $request)
    {
        $validated = $request->validate([
            'proses'   => ['required', 'integer', 'in:1,2,3'],
            'status'   => ['nullable', 'integer', 'in:0,1'], // 0=Stock, 1=Baru
            'idBagian' => ['required', 'integer'],
            'kdBrg'    => ['nullable', 'string', 'max:20'],
            'jml'      => ['nullable', 'numeric', 'min:0'],
            'harga'    => ['nullable', 'numeric', 'min:0'],
            'noSat'    => ['nullable', 'string', 'max:10'],
            'tanggal'  => ['nullable', 'date_format:Y-m-d'],
            'nomer'    => ['nullable', 'integer'],
        ]);

        $db = DB::connection('Connworkshop');
        $proses = (int)$validated['proses'];

        try {
            $db->beginTransaction();

            $kode = null;

            if ($proses == 1) {
                // Isi
                $kode = ($validated['status'] == 0) ? 1 : 2;
                $hargaT = (float)$validated['jml'] * (float)$validated['harga'];
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-SPART-BAGIAN] @kode=?, @noBagian=?, @KdBrg=?, @jml=?, @harga=?, @hargaT=?, @status=?, @noSat=?, @Tanggal=?', [
                    $kode,
                    $validated['idBagian'],
                    $validated['kdBrg'],
                    (int)$validated['jml'],
                    (float)$validated['harga'],
                    $hargaT,
                    (int)$validated['status'],
                    $validated['noSat'],
                    $validated['tanggal'] ?? date('Y-m-d'),
                ]);
            } elseif ($proses == 2) {
                // Koreksi
                $kode = ($validated['status'] == 0) ? 3 : 4;
                $hargaT = (float)$validated['jml'] * (float)$validated['harga'];
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-SPART-BAGIAN] @kode=?, @nomer=?, @noBagian=?, @@KdBrg=?, @jml=?, @harga=?, @hargaT?, @status=?, @noSat=?, @Tanggal?', [
                    $kode,
                    $validated['nomer'],
                    $validated['idBagian'],
                    $validated['kdBrg'],
                    (int)$validated['jml'],
                    (float)$validated['harga'],
                    $hargaT,
                    (int)$validated['status'],
                    $validated['noSat'],
                    $validated['tanggal'] ?? date('Y-m-d'),
                ]);
            } elseif ($proses == 3) {
                // Hapus
                $kode = 5;
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-SPART-BAGIAN] @kode=?, @nomer=?, @noBagian=?', [
                    $kode,
                    $validated['nomer'],
                    $validated['idBagian'],
                ]);
            }

            $db->commit();
            return response()->json(['message' => 'Data berhasil diproses.', 'kode' => $kode]);
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
