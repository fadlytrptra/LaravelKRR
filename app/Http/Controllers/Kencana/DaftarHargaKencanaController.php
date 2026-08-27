<?php

namespace App\Http\Controllers\Kencana;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Illuminate\Support\Facades\DB as FacadesDB;
use Illuminate\Support\Facades\Auth;

class DaftarHargaKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        $result = (new HakAksesController)->HakAksesFitur('Daftar Harga Kencana');
        // dd($result);
        if ($result > 0) {
            return view('Kencana.DaftarHarga.index', compact('access'));
        } else {
            abort(403);
        }
    }

    //Show the form for creating a new resource.
    public function create(Request $request)
    {
        $totalData = DB::connection('ConnKCNPurchase')->table('YTERIMA')
            ->leftJoin('YSUPPLIER', 'YTERIMA.No_sup', '=', 'YSUPPLIER.NO_SUP')
            ->leftJoin('YSATUAN', 'YTERIMA.Satuan_Terima', '=', 'YSATUAN.No_satuan')
            ->leftJoin('ACCOUNTING.dbo.T_MATAUANG', 'YTERIMA.IdMataUang', '=', 'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang')
            ->leftJoin('YTRANSBL', 'YTERIMA.No_trans', '=', 'YTRANSBL.No_trans')
            ->join('Y_BARANG', 'YTRANSBL.Kd_brg', '=', 'Y_BARANG.KD_BRG')
            ->leftJoin('YUSER', 'YTRANSBL.Operator', '=', 'YUSER.kd_user')
            ->whereNull('YTERIMA.Deleted')
            ->select(
                'YTRANSBL.Kd_div',
                'YTRANSBL.Kd_brg',
                'YTRANSBL.Tgl_order',
                'YTRANSBL.Qty',
                'Y_BARANG.NAMA_BRG',
                'YSATUAN.Nama_satuan',
                'YSUPPLIER.NM_SUP',
                'YSUPPLIER.KOTA1',
                'YSUPPLIER.NEGARA1',
                'YTERIMA.Hrg_trm',
                'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang_BC',
                'YUSER.Nama',
                'YTERIMA.Datang'
            )->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        // $maxRecords = $request->input('maximumRecords');

        $query = DB::connection('ConnKCNPurchase')->table('YTERIMA')
            ->leftJoin('YSUPPLIER', 'YTERIMA.No_sup', '=', 'YSUPPLIER.NO_SUP')
            ->leftJoin('YSATUAN', 'YTERIMA.Satuan_Terima', '=', 'YSATUAN.No_satuan')
            ->leftJoin('ACCOUNTING.dbo.T_MATAUANG', 'YTERIMA.IdMataUang', '=', 'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang')
            ->leftJoin('YTRANSBL', 'YTERIMA.No_trans', '=', 'YTRANSBL.No_trans')
            ->join('Y_BARANG', 'YTRANSBL.Kd_brg', '=', 'Y_BARANG.KD_BRG')
            ->leftJoin('YUSER', 'YTRANSBL.Operator', '=', 'YUSER.kd_user')
            ->whereNull('YTERIMA.Deleted')
            ->select(
                'YTRANSBL.Kd_div',
                'YTRANSBL.Kd_brg',
                'YTRANSBL.Tgl_order',
                'YTRANSBL.Qty',
                'Y_BARANG.NAMA_BRG',
                'YSATUAN.Nama_satuan',
                'YSUPPLIER.NM_SUP',
                'YSUPPLIER.KOTA1',
                'YSUPPLIER.NEGARA1',
                'YTERIMA.Hrg_trm',
                'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang_BC',
                'YUSER.Nama',
                'YTERIMA.Datang'
            );
        $filters = $request->input('custom_filters', []);
        $columnMap = [
            'Kd_div' => 'YTRANSBL.Kd_div',
            'Kd_brg' => 'YTRANSBL.Kd_brg',
            'Qty' => 'YTRANSBL.Qty',
        ];
        foreach ($filters as $filter) {
            $rawColumn = $filter['column'];
            $column = $columnMap[$rawColumn] ?? $rawColumn; // Use mapped column if exists
            $operator = $filter['operator'];
            $value = $filter['value'];

            if ($operator === 'like') {
                $query->where($column, 'LIKE', '%' . $value . '%');
            } else if ($operator === '=' or $operator === '!=') {
                if ($column == 'TglAprMGR') {
                    $query->whereRaw('CAST([' . $column . '] AS DATE) = ?', [$value]);
                } else {
                    $query->where($column, $operator, $value);
                }
            } else if ($operator === 'isbetween') {
                $value = is_array($value) ? $value : array_map('trim', explode(',', $value));
                if (is_array($value) && count($value) === 2) {
                    $query->whereBetween($column, [$value[0], $value[1]]);
                }
            } else if ($operator === 'notbetween') {
                $value = is_array($value) ? $value : array_map('trim', explode(',', $value));
                if (is_array($value) && count($value) === 2) {
                    $query->whereNotBetween($column, [$value[0], $value[1]]);
                }
            } else if ($operator === 'in') {
                $query->whereIn($column, $value);
            } else if ($operator === 'notin') {
                $query->whereNotIn($column, $value);
            } else if ($operator === 'isnull') {
                $query->whereNull($column);
            } else if ($operator === 'isnotnull') {
                $query->whereNotNull($column);
            }
        }

        // Apply sorting (optional)
        foreach ($filters as $filter) {
            if (!empty($filter['sort'])) {
                $query->orderBy($filter['column'], $filter['sort']);
            }
        }

        $totalFilteredBeforeCap = (clone $query)->count(); // real filtered count

        // $maxRecords = $request->input('maximumRecords'); 
        // $limitMaxRecords = intval($maxRecords) - intval($start);
        // // Cap the filtered count
        // $totalFiltered = ($maxRecords && $totalFilteredBeforeCap > $maxRecords)
        //     ? $maxRecords
        //     : $totalFilteredBeforeCap;
        $totalFiltered = $totalFilteredBeforeCap;

        // Then apply page offset + limit
        $query->offset($start)
            ->limit($limit);

        $data = $query->get();
        if (!empty($order)) {
            foreach ($order as $dataorder) {
                $nestedData['Kd_div'] = $dataorder->Kd_div ?? NULL;
                $nestedData['Kd_brg'] = $dataorder->Kd_brg ?? NULL;
                $nestedData['Tgl_order'] = $dataorder->Tgl_order ?? NULL;
                $nestedData['Qty'] = $dataorder->Qty ?? NULL;
                $nestedData['NAMA_BRG'] = $dataorder->NAMA_BRG ?? NULL;
                $nestedData['Nama_satuan'] = $dataorder->Nama_satuan ?? NULL;
                $nestedData['NM_SUP'] = $dataorder->NM_SUP ?? NULL;
                $nestedData['KOTA1'] = $dataorder->KOTA1 ?? NULL;
                $nestedData['NEGARA1'] = $dataorder->NEGARA1 ?? NULL;
                $nestedData['Hrg_trm'] = $dataorder->Hrg_trm ?? NULL;
                $nestedData['Id_MataUang_BC'] = $dataorder->Id_MataUang_BC ?? NULL;
                $nestedData['Nama'] = $dataorder->Nama ?? NULL;
                $data[] = $nestedData;
            }
        }

        $json_data = array(
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($totalData),
            "recordsFiltered" => intval($totalFiltered),
            "data" => $data
        );

        return response()->json($json_data);
    }

    // public function redisplay(Request $request)
    // {
    //     $nm_brg = $request->input('nm_brg');
    //     $kd = 1;
    //     $req = $request->input('req');
    //     $sup = $request->input('sup');
    //     $kdbrg = $request->input('kdbrg');
    //     if (($nm_brg != null) || ($req != null) || ($sup != null) || ($kdbrg != null)) {
    //         try {
    //             $redisplay = DB::connection('ConnKCNPurchase')->select('exec spSelect_CariTypeBarang_dotNet @nm_brg = ?, @kd = ?, @req = ?, @sup = ?, @kdbrg = ?', [$nm_brg, $kd, $req, $sup, $kdbrg]);
    //             return datatables($redisplay)->make(true);
    //         } catch (\Throwable $Error) {
    //             return Response()->json($Error);
    //         }
    //     } else {
    //         return Response()->json('Parameter harus di isi');
    //     }
    // }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $jenisStore = $request->input('jenisStore');
        if ($jenisStore == 'exportToExcel') {
            $query = DB::connection('ConnKCNPurchase')->table('YTERIMA')
                ->leftJoin('YSUPPLIER', 'YTERIMA.No_sup', '=', 'YSUPPLIER.NO_SUP')
                ->leftJoin('YSATUAN', 'YTERIMA.Satuan_Terima', '=', 'YSATUAN.No_satuan')
                ->leftJoin('ACCOUNTING.dbo.T_MATAUANG', 'YTERIMA.IdMataUang', '=', 'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang')
                ->leftJoin('YTRANSBL', 'YTERIMA.No_trans', '=', 'YTRANSBL.No_trans')
                ->join('Y_BARANG', 'YTRANSBL.Kd_brg', '=', 'Y_BARANG.KD_BRG')
                ->leftJoin('YUSER', 'YTRANSBL.Operator', '=', 'YUSER.kd_user')
                ->whereNull('YTERIMA.Deleted')
                ->select(
                    'YTRANSBL.Kd_div',
                    'YTRANSBL.Kd_brg',
                    'YTRANSBL.Tgl_order',
                    'YTRANSBL.Qty',
                    'Y_BARANG.NAMA_BRG',
                    'YSATUAN.Nama_satuan',
                    'YSUPPLIER.NM_SUP',
                    'YSUPPLIER.KOTA1',
                    'YSUPPLIER.NEGARA1',
                    'YTERIMA.Hrg_trm',
                    'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang_BC',
                    'YUSER.Nama',
                    'YTERIMA.Datang'
                );

            $filters = $request->input('custom_filters', []);
            $columnMap = [
                'Kd_div' => 'YTRANSBL.Kd_div',
                'Kd_brg' => 'YTRANSBL.Kd_brg',
                'Qty' => 'YTRANSBL.Qty',
            ];

            foreach ($filters as $filter) {
                $rawColumn = $filter['column'];
                $column = $columnMap[$rawColumn] ?? $rawColumn; // Use mapped column if exists
                $operator = $filter['operator'];
                $value = $filter['value'];

                if ($operator === 'like') {
                    $query->where($column, 'LIKE', '%' . $value . '%');
                } else if ($operator === '=' or $operator === '!=') {
                    if ($column == 'TglAprMGR') {
                        $query->whereRaw('CAST([TglAprMGR] AS DATE) = ?', [$value]);
                    } else {
                        $query->where($column, $operator, $value);
                    }
                } else if ($operator === 'isbetween') {
                    $value = is_array($value) ? $value : array_map('trim', explode(',', $value));
                    if (is_array($value) && count($value) === 2) {
                        $query->whereBetween($column, [$value[0], $value[1]]);
                    }
                } else if ($operator === 'notbetween') {
                    $value = is_array($value) ? $value : array_map('trim', explode(',', $value));
                    if (is_array($value) && count($value) === 2) {
                        $query->whereNotBetween($column, [$value[0], $value[1]]);
                    }
                } else if ($operator === 'in') {
                    $query->whereIn($column, $value);
                } else if ($operator === 'notin') {
                    $query->whereNotIn($column, $value);
                } else if ($operator === 'isnull') {
                    $query->whereNull($column);
                } else if ($operator === 'isnotnull') {
                    $query->whereNotNull($column);
                }
            }

            // Apply sorting (optional)
            foreach ($filters as $filter) {
                if (!empty($filter['sort'])) {
                    $query->orderBy($filter['column'], $filter['sort']);
                }
            }

            $maximumRecords = $request->input('maximumRecords');
            if ($maximumRecords) {
                $query->limit($maximumRecords);
            }

            $results = $query->get();

            return response()->json(['data' => $results]);
        } else {
            return response()->json(['error' => 'Invalid store type'], 400);
        }
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
    public function update(Request $request, $id)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
