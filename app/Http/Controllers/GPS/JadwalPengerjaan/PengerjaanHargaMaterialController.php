<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PengerjaanHargaMaterialController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');

        // Default date range: awal bulan s/d akhir bulan
        $now = Carbon::now();
        $startDate = $now->copy()->startOfMonth()->format('Y-m-d');
        $endDate   = $now->copy()->endOfMonth()->format('Y-m-d');

        return view('GPS.JadwalPengerjaan.pengerjaanHargaMaterial', compact('access', 'startDate', 'endDate'));
    }

    // Load material order (SP_5298_PJW_LIST-MATERIAL-ORDER kode=1/2)
    public function getMaterialOrder(Request $request)
    {
        $validated = $request->validate([
            'jenisOd' => ['required', 'string', 'in:H,P'],
            'date1'   => ['required', 'date_format:Y-m-d'],
            'date2'   => ['required', 'date_format:Y-m-d', 'after_or_equal:date1'],
        ]);

        $kode = ($validated['jenisOd'] === 'H') ? 1 : 2;
        $db = DB::connection('Connworkshop');

        try {
            $rows = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL-ORDER] @kode=?, @date1=?, @date2=?', [
                $kode,
                $validated['date1'],
                $validated['date2']
            ]);

            $fmt = function ($val) {
                if ($val === null || $val === '') return '';
                return number_format((float)$val, 2, '.', ',');
            };

            $result = [];
            foreach ($rows as $row) {
                $isHarian = ($validated['jenisOd'] === 'H');

                $namaBrg = $isHarian ? ($row->Nama_Brg ?? '') : ($row->Nama_Proyek ?? '');
                $kdBgr   = $isHarian ? ($row->Kd_Brg ?? '') : '';
                $noGbr   = $isHarian ? ($row->No_Gbr ?? '') : '';

                $status      = (int)($row->Status ?? 0); // 1 = Bekas, 0 = Baru
                $statusWarna = ($status === 1) ? 'bekas' : 'baru';
                $satuanMaterial = trim((string)($row->SatuanMtr ?? ''));
                $jumlahMaterial = $fmt($row->Jml);
                $jumlahMaterialDisplay = trim($jumlahMaterial . ' ' . $satuanMaterial);

                $result[] = [
                    'NoOrder'         => $row->NoOrder ?? '',
                    'Divisi'          => $row->Divisi ?? '',
                    'NamaBarang'      => $namaBrg,
                    'KdBarang'        => $kdBgr,
                    'NoGambar'        => $noGbr,
                    'JmlOrder'        => trim(($row->JmlOrder ?? '0') . ' ' . ($row->Satuan ?? '')),
                    'TglStart'        => $row->EstDate ?? '',
                    'NamaBagian'      => $row->NamaBagian ?? '',
                    'IdBagian'        => (int)($row->IdBagian ?? 0),
                    'MtrType'         => $row->MtrType ?? '',
                    'Spek'            => $row->Spek ?? '',
                    'Nomer'           => (int)($row->Nomer ?? 0),
                    'KdBrgMtr'        => $row->KdBrg ?? '',
                    'JmlMaterial'     => $jumlahMaterialDisplay,
                    'JmlMaterialRaw'  => (float)($row->Jml ?? 0),
                    'SatuanMtr'       => $satuanMaterial,
                    'HargaBaru'       => $fmt($row->Harga),
                    'HargaBaruRaw'    => (float)($row->Harga ?? 0),
                    'HargaTotalBaru'  => $fmt($row->HargaTotal),
                    'HargaBekas'      => $fmt($row->HargaBekas),
                    'HargaBekasRaw'   => (float)($row->HargaBekas ?? 0),
                    'HargaTotalBekas' => $fmt($row->HargaTotalB),
                    'NoSat'           => $row->NoSat ?? '',
                    'AccSpv'          => $row->AccSpv ?? '',
                    'TglBon'          => $row->TglBon ?? '',
                    'Status'          => $status,
                    'statusWarna'     => $statusWarna,
                ];
            }

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Lookup satuan material sesuai sumber data pada FrmHargaMtr1.
    public function getSatuanList()
    {
        $db = DB::connection('Connworkshop');

        try {
            $list = $db->select('EXEC [dbo].[SP_5298_WRK_SATUAN]');
            $result = array_map(function ($item) {
                $columns = (array) $item;
                $values = array_values($columns);
                $normalized = [];

                foreach ($columns as $key => $value) {
                    $normalized[strtolower(preg_replace('/[^a-z0-9]/i', '', $key))] = $value;
                }

                $noSat = $normalized['nosat']
                    ?? $normalized['nosatuan']
                    ?? $normalized['kodesatuan']
                    ?? $normalized['kode']
                    ?? null;
                $satuan = $normalized['namasatuan']
                    ?? $normalized['satuan']
                    ?? $normalized['nama']
                    ?? null;

                // Stored procedure legacy ini mengembalikan kode dan nama secara berurutan.
                if ($noSat === null && count($values) > 1) {
                    $noSat = $values[0];
                }
                if ($satuan === null) {
                    $satuan = $values[1] ?? '';
                }

                return [
                    'NoSat'  => trim((string)($noSat ?? '')),
                    'Satuan' => trim((string)$satuan),
                ];
            }, $list);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Proses update harga material (SP_5298_PJW_HARGA-MATERIAL)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'status'    => ['required', 'integer', 'in:0,1'], // 0=Baru, 1=Bekas
            'nomer'     => ['required', 'integer'],
            'idBagian'  => ['required', 'integer'],
            'jml'       => ['required', 'numeric', 'gt:0'],
            'harga'     => ['required', 'numeric', 'gt:0'],
            'noSat'     => ['required', 'string', 'min:1', 'max:20'],
        ]);

        $db = DB::connection('Connworkshop');

        try {
            $db->beginTransaction();

            $jml    = (float)$validated['jml'];
            $harga  = (float)$validated['harga'];
            $hargaT = $jml * $harga;

            $db->statement('EXEC [dbo].[SP_5298_PJW_HARGA-MATERIAL] @kode=?, @nomer=?, @idBagian=?, @jml=?, @harga=?, @hargaT=?, @noSat=?', [
                $validated['status'],   // @kode (0=Baru, 1=Bekas)
                $validated['nomer'],    // @nomer
                $validated['idBagian'], // @idBagian
                $jml,                   // @jml
                $harga,                 // @harga
                $hargaT,                // @hargaT
                $validated['noSat'],    // @noSat
            ]);

            $db->commit();
            return response()->json(['message' => 'Data TerProses.']);
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
