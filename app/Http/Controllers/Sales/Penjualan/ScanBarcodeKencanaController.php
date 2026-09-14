<?php

namespace App\Http\Controllers\Sales\Penjualan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class ScanBarcodeKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        // dd(date('Y-m-d'));
        $date = date('Y-m-d');
        // Jumlah barcode
        $jumlah = DB::connection('ConnInventory')
            ->table('Tmp_Gudang')
            ->where('Tgl_mutasi', $date)
            ->where('typetransaksi', '09')
            ->where('Aktif', 'Y')
            ->count();

        // Rekap barcode
        $data_kodeBarang = DB::connection('ConnInventory')
            ->table('Tmp_Gudang')
            ->join(
                'Type',
                'Tmp_Gudang.IdType',
                '=',
                'Type.IdType'
            )
            ->join('Dispresiasi', function ($join) {
                $join->on(
                    'Tmp_Gudang.Kode_barang',
                    '=',
                    'Dispresiasi.Kode_barang'
                )
                ->on(
                    'Tmp_Gudang.NoIndeks',
                    '=',
                    'Dispresiasi.NoIndeks'
                );
            })
            ->where('Tmp_Gudang.typetransaksi', '09')
            ->where('Tmp_Gudang.Aktif', 'Y')
            ->whereNotNull('Dispresiasi.Qty_Primer')
            ->whereDate('Tmp_Gudang.Tgl_mutasi', $date)
            ->select([
                'Type.IdType',
                'Type.NamaType',
                'Tmp_Gudang.Kode_barang',
                'Tmp_Gudang.Tgl_mutasi',
                DB::raw('SUM(Dispresiasi.Qty_Primer) AS Qty_Primer'),
                DB::raw('SUM(Dispresiasi.Qty_sekunder) AS Qty_Sekunder'),
                DB::raw('SUM(Dispresiasi.Qty) AS Qty'),
            ])
            ->groupBy([
                'Type.IdType',
                'Type.NamaType',
                'Tmp_Gudang.Kode_barang',
                'Tmp_Gudang.Tgl_mutasi',
            ])
            ->get();

        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Sales.Penjualan.ScanBarcodeKencana', compact('access', 'date', 'jumlah', 'data_kodeBarang'));
    }

    public function scanBarcodeLihatData($date)
    {
        $jumlah = DB::connection('ConnInventory')
            ->table('Tmp_Gudang')
            ->where('Tgl_mutasi', $date)
            ->where('typetransaksi', '09')
            ->where('Aktif', 'Y')
            ->count();

        $data_kodeBarang = DB::connection('ConnInventory')
            ->table('Tmp_Gudang')
            ->join(
                'Type',
                'Tmp_Gudang.IdType',
                '=',
                'Type.IdType'
            )
            ->join('Dispresiasi', function ($join) {
                $join->on(
                    'Tmp_Gudang.Kode_barang',
                    '=',
                    'Dispresiasi.Kode_barang'
                )
                ->on(
                    'Tmp_Gudang.NoIndeks',
                    '=',
                    'Dispresiasi.NoIndeks'
                );
            })
            ->where('Tmp_Gudang.typetransaksi', '09')
            ->where('Tmp_Gudang.Aktif', 'Y')
            ->whereNotNull('Dispresiasi.Qty_Primer')
            ->whereDate('Tmp_Gudang.Tgl_mutasi', $date)
            ->select([
                'Type.IdType',
                'Type.NamaType',
                'Tmp_Gudang.Kode_barang',
                'Tmp_Gudang.Tgl_mutasi',
                DB::raw('SUM(Dispresiasi.Qty_Primer) AS Qty_Primer'),
                DB::raw('SUM(Dispresiasi.Qty_sekunder) AS Qty_Sekunder'),
                DB::raw('SUM(Dispresiasi.Qty) AS Qty'),
            ])
            ->groupBy([
                'Type.IdType',
                'Type.NamaType',
                'Tmp_Gudang.Kode_barang',
                'Tmp_Gudang.Tgl_mutasi',
            ])
            ->get();

        return response()->json([
            [
                'total' => $jumlah
            ],
            $data_kodeBarang
        ]);
    }

    public function scanBarcodeDetailData($idType, $kodeBarang, $tglMutasi)
    {
        $data = DB::connection('ConnInventory')
            ->table('Tmp_Gudang')
            ->join(
                'Type',
                'Tmp_Gudang.IdType',
                '=',
                'Type.IdType'
            )
            ->join('Dispresiasi', function ($join) {
                $join->on(
                    'Tmp_Gudang.Kode_barang',
                    '=',
                    'Dispresiasi.Kode_barang'
                )
                ->on(
                    'Tmp_Gudang.NoIndeks',
                    '=',
                    'Dispresiasi.NoIndeks'
                );
            })
            ->where('Tmp_Gudang.Kode_barang', $kodeBarang)
            ->where('Tmp_Gudang.TypeTransaksi', '09')
            ->where('Tmp_Gudang.Aktif', 'Y')
            ->whereDate('Tmp_Gudang.Tgl_mutasi', $tglMutasi)
            ->where('Tmp_Gudang.IdType', $idType)
            ->select([
                'Tmp_Gudang.NoIndeks',
                'Tmp_Gudang.Kode_barang as KodeBarang',
                'Type.NamaType',
            ])
            ->orderBy('Tmp_Gudang.Tgl_mutasi')
            ->orderBy('Tmp_Gudang.Kode_barang')
            ->orderBy('Tmp_Gudang.NoIndeks')
            ->get();

        return response()->json($data);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $barcodeArray = explode(', ', $request->kode_barcode);
        $barcodeScanBerhasil = [];
        $barcodeScanGagal = [];
        $sudahPernahScan = [];
        $returnAlert = '';

        foreach ($barcodeArray as $barcode) {
            $barcode = trim($barcode);
            if ($barcode === '') {
                continue;
            }

            $kodeBarcode = explode('-', $barcode, 2);
            if (count($kodeBarcode) !== 2) {
                $barcodeScanGagal[] = $barcode;
                continue;
            }

            $indeks = trim($kodeBarcode[0]);
            $kdbrg = trim($kodeBarcode[1]);
            $data = DB::connection('ConnInventory')
                ->table('Tmp_Gudang')
                ->where('NoIndeks', (int) $indeks)
                ->where('Kode_barang', $kdbrg)
                ->where('Aktif', 'Y')
                ->first();


            $status = DB::connection('ConnInventory')
                ->table('Dispresiasi')
                ->join(
                    'Type',
                    'Dispresiasi.Id_type_tujuan',
                    '=',
                    'Type.IdType'
                )
                ->join(
                    'Subkelompok',
                    'Type.IdSubkelompok_Type',
                    '=',
                    'Subkelompok.IdSubkelompok'
                )
                ->join(
                    'Kelompok',
                    'Subkelompok.IdKelompok_Subkelompok',
                    '=',
                    'Kelompok.IdKelompok'
                )
                ->join(
                    'KelompokUtama',
                    'Kelompok.IdKelompokUtama_Kelompok',
                    '=',
                    'KelompokUtama.IdKelompokUtama'
                )
                ->join(
                    'Objek',
                    'KelompokUtama.IdObjek_KelompokUtama',
                    '=',
                    'Objek.IdObjek'
                )
                ->join(
                    'Divisi',
                    'Objek.IdDivisi_Objek',
                    '=',
                    'Divisi.IdDivisi'
                )
                ->whereIn('Divisi.IdDivisi', [
                    'WKC',
                    'KCC'
                ])
                ->whereIn('Objek.IdObjek', [
                    '006',
                    '109',
                    '038',
                    '119',
                    '120',
                    '133',
                    '134',
                    '139',
                    '140',
                    '141',
                    '144',
                    '149',
                    '152',
                    '156',
                    '164',
                ])
                ->where('Dispresiasi.NoIndeks', (int) $indeks)
                ->where('Dispresiasi.Kode_barang', $kdbrg)
                ->select('Dispresiasi.Status')
                ->first();

            $statusValue = $status
                ? (string) $status->Status
                : '3';

            if (empty($data)) {
                if ($statusValue !== '3') {
                    $barcodeScanGagal[] = $barcode;
                    continue;
                }

                $result = DB::connection('ConnInventory')
                    ->table('Dispresiasi')
                    ->select('Id_type_tujuan')
                    ->where('NoIndeks', (int) $indeks)
                    ->where('Kode_barang', $kdbrg)
                    ->first();

                if (!$result) {
                    $barcodeScanGagal[] = $barcode;
                    continue;
                }

                DB::connection('ConnInventory')
                    ->table('Tmp_Gudang')
                    ->insert([
                        'NoIndeks'      => (int) $indeks,
                        'Kode_barang'   => $kdbrg,
                        'Tgl_mutasi'    => now()->format('Y-m-d'),
                        'IdType'        => $result->Id_type_tujuan,
                        'Aktif'         => 'Y',
                        'TypeTransaksi' => '09',
                    ]);

                $barcodeScanBerhasil[] = $barcode;

            } else {
                $sudahPernahScan[] = $barcode;
            }
        }

        if (!empty($barcodeScanBerhasil)) {
            $returnAlert .=
                'Barcode yang berhasil discan: ' .
                implode(', ', $barcodeScanBerhasil) .
                '<br>';
        }

        if (!empty($barcodeScanGagal)) {
            $returnAlert .=
                'Barcode yang gagal discan: ' .
                implode(', ', $barcodeScanGagal) .
                '<br>';
        }

        if (!empty($sudahPernahScan)) {
            $returnAlert .=
                'Barcode yang sudah discan: ' .
                implode(', ', $sudahPernahScan);
        }

        return redirect()
            ->back()
            ->with('success', $returnAlert);
    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update($id)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
