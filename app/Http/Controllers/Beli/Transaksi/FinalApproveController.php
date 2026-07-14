<?php

namespace App\Http\Controllers\Beli\Transaksi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Beli\TransBL;
use App\User;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DateTime;
use DateTimeZone;
use DB;


class FinalApproveController extends Controller
{
    public function index(Request $request)
    {
        $kd = 4;
        $operator = strtoupper(trim(Auth::user()->NomorUser));
        $result = (new HakAksesController)->HakAksesFitur('Final Approve');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $isManager = $this->isManager($operator);
        if ($result > 0) {
            // $data = TransBL::select()->join('YUSER_ACC_DIR', 'YUSER_ACC_DIR.Kd_div', 'YTRANSBL.Kd_div')->leftjoin('Y_BARANG', 'Y_BARANG.KD_BRG', 'YTRANSBL.Kd_brg')->leftjoin('YUSER', 'YUSER.kd_user', 'YTRANSBL.Operator')->leftjoin('YSATUAN', 'YSATUAN.No_satuan', 'YTRANSBL.NoSatuan')->leftjoin('STATUS_ORDER', 'STATUS_ORDER.KdStatus', 'YTRANSBL.StatusOrder')->where('YUSER_ACC_DIR.Kd_user', strval(Auth::user()->kd_user))->where('StatusOrder', '3')->get();
            // $data = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @Operator=?', [$kd, $operator]);
            // dd($data);
            return view('Beli.Transaksi.FinalApprove.List', compact('access', 'operator', 'isManager'));
        } else {
            abort(403);
        }
    }

    public function store(Request $request)
    {
        $jenisStore = $request->input('jenisStore');

        if ($jenisStore === 'exportToExcel') {

            $kdUser = trim(Auth::user()->NomorUser);
            $isDirektur = in_array($kdUser, ['RUDY', 'TJAHYO', 'YUDI']);
            $isManager = $this->isManager($kdUser);

            $kdDivisiDoubleACC = [
                "BKL",
                "BKR",
                "BRD",
                "CL",
                "CLD",
                "CLM",
                "NDL",
                "RBL",
            ];

            $kdDivisiOnlyTjahyo = [
                "BHM",
                "BHN",
            ];

            $data = collect(DB::connection('ConnPurchase')->select(
                'EXEC dbo.SP_5409_LIST_ORDER @kd = ?, @Operator = ?',
                [4, $kdUser]
            ));

            $data = $data->filter(function ($row) use ($isDirektur, $kdUser, $kdDivisiDoubleACC, $kdDivisiOnlyTjahyo) {

                if ($isDirektur) {

                    if ($kdUser == 'TJAHYO') {
                        return $row->StatusBeli == 1
                            && (
                                in_array(trim($row->Kd_div), $kdDivisiDoubleACC)
                                || in_array(trim($row->Kd_div), $kdDivisiOnlyTjahyo)
                            );
                    }

                    if ($kdUser == 'RUDY' || $kdUser == 'YUDI') {
                        return $row->StatusBeli == 1
                            && !in_array(trim($row->Kd_div), $kdDivisiOnlyTjahyo);
                    }

                    return $row->StatusBeli == 1;
                }

                return true;
            });

            $filters = $request->input('custom_filters', []);

            // foreach ($filters as $filter) {

            //     $column = $filter['column'];
            //     $operator = strtolower($filter['operator']);
            //     $value = $filter['value'];

            //     $data = $data->filter(function ($row) use ($column, $operator, $value) {

            //         $rowValue = $row->$column ?? null;

            //         switch ($operator) {

            //             case 'like':
            //                 return stripos($rowValue, $value) !== false;

            //             case '=':
            //                 return $rowValue == $value;

            //             case '!=':
            //                 return $rowValue != $value;

            //             case 'isbetween':
            //                 $range = explode(',', $value);
            //                 if (count($range) == 2) {
            //                     return $rowValue >= trim($range[0])
            //                         && $rowValue <= trim($range[1]);
            //                 }
            //                 return true;

            //             default:
            //                 return true;
            //         }
            //     });
            // }

            if (!empty($filters)) {
                $data = $this->applyAdvancedFilter($data, $filters);
            }

            $data = $data->map(function ($row) use ($isManager) {
                $row->is_manager = $isManager;
                return $row;
            });

            return response()->json([
                'data' => $data->values()
            ]);
        }


        DB::beginTransaction();
        try {
            $checkBox = $request->input('checkedBOX', []);
            if (empty($checkBox)) {
                DB::rollBack();
                return response()->json(['error' => 'Tidak ada data dipilih', 404]);
                // return back()->with('danger', 'Tidak ada data dipilih');
            }

            $now = now('Asia/Jakarta');
            $user = trim(Auth::user()->NomorUser);
            $kdDivisiDoubleACC = [
                "BKL",
                "BKR",
                "BRD",
                "CL",
                "CLD",
                "CLM",
                "NDL",
                "RBL",
            ];
            // dd($checked, $statusBeli, $kdDivisiChecked);

            switch ($request->input('action')) {

                /* =========================
                 * APPROVE
                 * ========================= */
                case 'Approve':
                    foreach ($checkBox as $row) {
                        $noTrans = trim($row['No_trans']);
                        $statusBeli = (int) $row['StatusBeli'];
                        $kdDivisiChecked = trim($row['Kd_div']);
                        $isDirektur = in_array($user, ['RUDY', 'TJAHYO', 'YUDI']);
                        $isManager = $this->isManager($user);
                        $user = trim(Auth::user()->NomorUser);
                        if (
                            $statusBeli === 1 &&
                            in_array(trim($kdDivisiChecked), $kdDivisiDoubleACC)

                        ) {
                            if ($user === 'TJAHYO') {
                                // Direktur2
                                TransBL::where('No_trans', '=', $noTrans)
                                    ->where('StatusOrder', '<>', 8)
                                    ->update([
                                        'Tgl_Direktur2' => $now,
                                        'Direktur2' => $user,
                                        'Dir_Agree2' => 1,
                                    ]);
                            } else {
                                // Direktur1
                                TransBL::where('No_trans', '=', $noTrans)
                                    ->where('StatusOrder', '<>', 8)
                                    ->update([
                                        'Tgl_Direktur' => $now,
                                        'Direktur' => $user,
                                        'Dir_Agree' => 1
                                    ]);
                            }
                            $data = TransBL::where('No_trans', $noTrans)
                                ->select('Direktur', 'Direktur2')
                                ->first();

                            if ($data && $data->Direktur && $data->Direktur2) {
                                TransBL::where('No_trans', $noTrans)
                                    ->where('StatusOrder', '<>', 8)
                                    ->update([
                                        'StatusOrder' => 4,
                                    ]);
                            }

                        } else if ($statusBeli === 0 && $isManager) {
                            // MANAGER FINAL APPROVE (Beli Sendiri)
                            TransBL::where('No_trans', $noTrans)
                                ->where('StatusOrder', '<>', 8)
                                ->update([
                                    'Tgl_Direktur' => $now,
                                    'Direktur' => $user,
                                    'Dir_Agree' => 1,
                                    'StatusOrder' => 4,
                                ]);
                        } else {
                            // Direktur1
                            // kode divisi only tjahyo ketika acc masuk direktur 1 supaya ttd pada cetak po bagus
                            TransBL::where('No_trans', '=', $noTrans)
                                ->where('StatusOrder', '<>', 8)
                                ->update([
                                    'Tgl_Direktur' => $now,
                                    'Direktur' => $user,
                                    'Dir_Agree' => 1,
                                    'StatusOrder' => 4,
                                ]);
                        }
                    }
                    DB::commit();
                    return response()->json(['success' => 'Data berhasil di-approve'], 200);
                case 'Cancel':
                    foreach ($checkBox as $row) {
                        $noTrans = trim($row['No_trans']);
                        $statusBeli = (int) $row['StatusBeli'];
                        $kdDivisiChecked = trim($row['Kd_div']);
                        $isDirektur = in_array($user, ['RUDY', 'TJAHYO', 'YUDI']);
                        $isManager = $this->isManager($user);
                        $user = trim(Auth::user()->NomorUser);
                        if (
                            $statusBeli === 1 &&
                            in_array($kdDivisiChecked, $kdDivisiDoubleACC, true)
                        ) {
                            if ($user === 'TJAHYO') {
                                // Direktur2
                                TransBL::where('No_trans', '=', $noTrans)->update([
                                    'Tgl_batal_Acc' => $now,
                                    'Batal_acc' => $user,
                                    'StatusOrder' => 12,
                                    'Ket_Reject' => 'Dibatalkan Final Approve oleh user ' . $user
                                ]);
                            } else {
                                // Direktur1
                                return response()->json(['error' => 'Data Nomor Transaksi ' . $noTrans . ' termasuk divisi yang membutuhkan double acc, bisa dibatalkan oleh user pak Tjahyo'], 200);
                            }
                            // $data = TransBL::where('No_trans', $noTrans)
                            //     ->select('Direktur', 'Direktur2')
                            //     ->first();

                            // if ($data && $data->Direktur && $data->Direktur2) {
                            //     TransBL::where('No_trans', $noTrans)->update([
                            //         'StatusOrder' => 6,
                            //     ]);
                            // }

                        } else if ($statusBeli === 0 && $isManager) {
                            // MANAGER FINAL APPROVE (Beli Sendiri)
                            TransBL::where('No_trans', $noTrans)->update([
                                'Tgl_batal_Acc' => $now,
                                'Batal_acc' => $user,
                                'StatusOrder' => 12,
                                'Ket_Reject' => 'Dibatalkan Final Approve oleh user ' . $user
                            ]);
                        } else {
                            // Direktur1
                            // kode divisi only tjahyo ketika acc masuk direktur 1 supaya ttd pada cetak po bagus
                            TransBL::where('No_trans', '=', $noTrans)->update([
                                'Tgl_batal_Acc' => $now,
                                'Batal_acc' => $user,
                                'StatusOrder' => 12,
                                'Ket_Reject' => 'Dibatalkan Final Approve oleh user ' . $user
                            ]);
                        }
                    }
                    DB::commit();
                    return response()->json(['success' => 'Data berhasil dibatalkan'], 200);
                default:
                    DB::rollBack();
                    return response()->json(['error' => 'Request invalid'], 405);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e], 405);

            // dd([
            //     'ERROR_MESSAGE' => $e->getMessage(),
            //     'ERROR_FILE' => $e->getFile(),
            //     'ERROR_LINE' => $e->getLine(),
            //     'TRACE' => collect($e->getTrace())->take(5),
            // ]);
        }

    }



    public function show($id, Request $request)
    {
        if ($id == 'getAllSPPB') {

            $kdUser = trim(Auth::user()->NomorUser);
            $isDirektur = in_array($kdUser, ['RUDY', 'TJAHYO', 'YUDI']);
            $isManager = $this->isManager($kdUser);

            $kdDivisiDoubleACC = [
                "BKL",
                "BKR",
                "BRD",
                "CL",
                "CLD",
                "CLM",
                "NDL",
                "RBL",
            ];

            $kdDivisiOnlyTjahyo = [
                "BHM",
                "BHN",
            ];

            $data = collect(DB::connection('ConnPurchase')->select(
                'EXEC dbo.SP_5409_LIST_ORDER @kd = ?, @Operator = ?',
                [4, $kdUser]
            ));

            $data = $data->filter(function ($row) use ($isDirektur, $kdUser, $kdDivisiDoubleACC, $kdDivisiOnlyTjahyo) {

                if ($isDirektur) {

                    if ($kdUser == 'TJAHYO') {
                        return $row->StatusBeli == 1
                            && (
                                in_array(trim($row->Kd_div), $kdDivisiDoubleACC)
                                || in_array(trim($row->Kd_div), $kdDivisiOnlyTjahyo)
                            );
                    }

                    if ($kdUser == 'RUDY' || $kdUser == 'YUDI') {
                        return $row->StatusBeli == 1
                            && !in_array(trim($row->Kd_div), $kdDivisiOnlyTjahyo);
                    }

                    return $row->StatusBeli == 1;
                }

                return true;
            });

            $filters = $request->input('custom_filters', []);

            if (!empty($filters)) {
                $data = $this->applyAdvancedFilter($data, $filters);
            }


            $data = $data->map(function ($row) use ($isManager) {
                $row->is_manager = $isManager;
                return $row;
            });

            return datatables($data)->make(true);
        } else if ($id == 'getAllNoTrans') {
            $kdUser = trim(Auth::user()->NomorUser);
            $isDirektur = in_array($kdUser, ['RUDY', 'TJAHYO', 'YUDI']);
            $isManager = $this->isManager($kdUser);
            $kdDivisiDoubleACC = [
                "BKL",
                "BKR",
                "BRD",
                "CL",
                "CLD",
                "CLM",
                "NDL",
                "RBL",
            ];

            $kdDivisiOnlyTjahyo = [
                "BHM",
                "BHN",
            ];

            // proteksi
            if (!$isDirektur && !$isManager) {
                return response()->json([], 200);
            }

            // $operator = $isDirektur ? $kdUser : null;

            $data = DB::connection('ConnPurchase')->select(
                'EXEC dbo.SP_5409_LIST_ORDER @kd = ?, @Operator = ?',
                [4, $kdUser]
            );
            // dd($isManager, $isDirektur);
            $collection = collect($data);

            // filter hak approve
            $collection = $collection->filter(function ($row) use ($isDirektur, $kdUser, $kdDivisiDoubleACC, $kdDivisiOnlyTjahyo) {

                // Direktur → semua sesuai SP
                if ($isDirektur) {
                    // TJAHYO → StatusBeli = 1 AND division must match
                    if ($kdUser == 'TJAHYO') {
                        return $row->StatusBeli == 1
                            && (in_array(trim($row->Kd_div), $kdDivisiDoubleACC)
                                || in_array(trim($row->Kd_div), $kdDivisiOnlyTjahyo));
                    }
                    if ($kdUser == 'RUDY' || $kdUser == 'YUDI') {
                        return $row->StatusBeli == 1
                            && in_array(trim($row->Kd_div), $kdDivisiDoubleACC) ||
                            $row->StatusBeli == 1
                            && !in_array(trim($row->Kd_div), $kdDivisiOnlyTjahyo);
                    }
                }

                // Manager → hanya Beli Sendiri & divisinya sendiri
                $isManager = $this->isManager($kdUser, $row->Kd_div);
                if ($isManager) {
                    if ($row->StatusBeli == 0) {
                        return true;
                    }
                }

                return false;
            });

            // search DataTables
            if ($request->filled('search.value')) {
                $search = strtoupper($request->input('search.value'));

                $collection = $collection->filter(function ($row) use ($search) {
                    return str_contains(
                        strtoupper(trim($row->NO_PO)),
                        $search
                    );
                });
            }

            return $collection->map(function ($row) {
                return [
                    'No_trans' => trim($row->No_trans),
                    'StatusBeli' => trim($row->StatusBeli),
                    'Kd_div' => trim($row->Kd_div),
                ];
            })->values();
        } else if ($id == 'getDetailNoTrans') {
            $noTrans = $request->noTrans;
            $data = DB::connection('ConnPurchase')
                ->select('SELECT	YBR.NAMA_BRG, YTB.Qty, YSU.NM_SUP, YDI.NM_DIV,
            YTB.Operator, YTB.StatusBeli, YTB.keterangan, YTB.Ket_Internal, YTB.PriceUnit, TMT.Id_MataUang_BC,
            YKU.nama, YKK.nama_kategori, YKS.nama_sub_kategori, YUS.Nama AS NamaUser, YTB.PriceExt, YTB.PPN, YTB.harga_disc, YTB.Dokumentasi, YTB.Kd_brg
            FROM	YTRANSBL YTB INNER JOIN
                    Y_BARANG YBR ON YTB.Kd_brg = YBR.KD_BRG INNER JOIN
                    YSUPPLIER YSU ON YTB.Supplier = YSU.NO_SUP INNER JOIN
                    YDIVISI YDI ON YTB.Kd_div = YDI.KD_DIV INNER JOIN
                    ACCOUNTING.dbo.T_MATAUANG TMT ON YTB.Currency = TMT.Id_MataUang INNER JOIN
                    Y_KATEGORI_SUB YKS ON YBR.NO_SUB_KATEGORI = YKS.no_sub_kategori INNER JOIN
                    Y_KATEGORY YKK ON YKS.no_kategori = YKK.no_kategori INNER JOIN
                    Y_KATEGORI_UTAMA YKU ON YKK.no_kat_utama = YKU.no_kat_utama INNER JOIN
                    YUSER YUS ON YUS.kd_user = YTB.Operator
            WHERE	YTB.No_trans = ?', [$noTrans]);
            return response()->json($data, 200);
        } else {
            return response()->json('Invalid request', 405);
        }
    }

    public function update(Request $request, $id)
    {
        $date = new DateTime('now', new DateTimeZone('Asia/Jakarta'));
        $date->format('Y-m-d H:i:s');
        TransBL::where('No_trans', $id)->update(['Tgl_Direktur' => $date, 'Direktur' => trim(Auth::user()->NomorUser), 'StatusOrder' => '4']);

        return back();
    }

    public function isManager(string $user, string $kdDiv = null): bool
    {
        if ($kdDiv == null) {
            return DB::table('YUSER_ACC_DIR')
                ->where('Kd_user', $user)
                ->exists();
        } else {
            return DB::table('YUSER_ACC_DIR')
                ->where('Kd_user', $user)
                ->where('Kd_div', $kdDiv)
                ->exists();
        }
    }

    public function applyAdvancedFilter($data, array $filters)
    {
        $allowedColumns = [
            'No_trans',
            'Tgl_order',
            'Kd_brg',
            'NAMA_BRG',
            'Qty',
            'NoSatuan',
            'Status',
            'Operator',
            'Nama',
            'Kd_div',
            'StatusOrder',
            'Nama_satuan',
            'DirekturBeliSendiri',
            'DirekturPengadaan',
            'Direktur2Status',
            'NO_PO',
            'StatusBeli',
            'PriceUnit',
            'Id_MataUang_BC',
            'PriceExt',
        ];

        if (empty($filters)) {
            return $data;
        }

        return $data->filter(function ($row) use ($filters, $allowedColumns) {

            foreach ($filters as $filter) {

                $column = $filter['column'] ?? null;
                $operator = strtolower($filter['operator'] ?? '');
                $value = $filter['value'] ?? null;

                if (!$column || !in_array($column, $allowedColumns)) {
                    continue;
                }

                $rowValue = $row->$column ?? null;

                // if (in_array($column, ['Direktur', 'Direktur2'])) {

                //     $statusBeli = (int) $row->StatusBeli;
                //     $kdDiv = trim($row->Kd_div ?? '');
                //     $direktur = trim($row->Direktur ?? '');
                //     $direktur2 = trim($row->Direktur2 ?? '');

                //     $kdDivisiDoubleACC = ["BKL", "BKR", "BRD", "CL", "CLD", "CLM", "NDL", "RBL"];
                //     $kdDivisiOnlyTjahyo = ["BHM", "BHN"];

                //     if ($column === 'Direktur' && $statusBeli == 0) {

                //         if (!$direktur) {
                //             $rowValue = 'Belum ACC';
                //         } elseif (!in_array($direktur, ['RUDY', 'YUDI', 'TJAHYO'])) {
                //             $rowValue = 'Sudah ACC';
                //         } else {
                //             $rowValue = 'Sudah ACC';
                //         }
                //     } elseif ($column === 'Direktur' && $statusBeli == 1) {
                //         if (in_array($kdDiv, $kdDivisiOnlyTjahyo)) {
                //             $rowValue = 'Tidak Perlu ACC';
                //         } elseif (in_array($kdDiv, $kdDivisiDoubleACC)) {
                //             if (!$direktur) {
                //                 $rowValue = 'Belum ACC';
                //             } elseif (in_array($direktur, ['RUDY', 'YUDI'])) {
                //                 $rowValue = 'Sudah ACC';
                //             } else {
                //                 $rowValue = 'Belum ACC';
                //             }
                //         } else {
                //             $rowValue = 'Tidak Perlu ACC';
                //         }
                //     } elseif ($column === 'Direktur2') {

                //         if ($statusBeli == 0) {
                //             $rowValue = 'Tidak Perlu ACC';
                //         } else {

                //             if (
                //                 in_array($kdDiv, $kdDivisiDoubleACC)
                //                 || in_array($kdDiv, $kdDivisiOnlyTjahyo)
                //             ) {

                //                 if (!$direktur2) {
                //                     $rowValue = 'Belum ACC';
                //                 } elseif ($direktur2 === 'TJAHYO') {
                //                     $rowValue = 'Sudah ACC';
                //                 } else {
                //                     $rowValue = 'Belum ACC';
                //                 }

                //             } else {
                //                 $rowValue = 'Tidak Perlu ACC';
                //             }
                //         }
                //     }
                // }
                if ($column === 'Tgl_order' && $rowValue) {
                    $rowValue = \Carbon\Carbon::parse($rowValue)->format('Y-m-d');
                }

                $matched = false;

                switch ($operator) {

                    case '=':
                        if (is_numeric($rowValue)) {
                            $matched = ($rowValue == $value);
                        } else {
                            $matched = mb_strtolower(trim((string) $rowValue)) === mb_strtolower(trim((string) $value));
                        }
                        break;

                    case '!=':
                        if (is_numeric($rowValue)) {
                            $matched = ($rowValue != $value);
                        } else {
                            $matched = mb_strtolower(trim((string) $rowValue)) !== mb_strtolower(trim((string) $value));
                        }
                        break;

                    case 'like':
                        $matched = stripos((string) $rowValue, (string) $value) !== false;
                        break;

                    case 'isnull':
                        $matched = is_null($rowValue) || $rowValue === '';
                        break;

                    case 'isnotnull':
                        $matched = !is_null($rowValue) && $rowValue !== '';
                        break;

                    case 'isbetween':

                        $range = array_map('trim', explode(',', $value));

                        if (count($range) === 2) {

                            if ($column === 'Tgl_order') {

                                $rowDate = \Carbon\Carbon::parse($rowValue);
                                $minDate = \Carbon\Carbon::parse($range[0]);
                                $maxDate = \Carbon\Carbon::parse($range[1]);

                                $matched = $rowDate->between($minDate, $maxDate);

                            } elseif (is_numeric($rowValue)) {

                                $rowNum = floatval($rowValue);
                                $min = floatval($range[0]);
                                $max = floatval($range[1]);

                                $matched = ($rowNum >= $min && $rowNum <= $max);

                            } else {

                                $matched = ($rowValue >= $range[0] && $rowValue <= $range[1]);
                            }
                        }

                        break;

                    case 'notbetween':

                        $range = array_map('trim', explode(',', $value));

                        if (count($range) === 2) {

                            if ($column === 'Tgl_order') {

                                $rowDate = \Carbon\Carbon::parse($rowValue);
                                $minDate = \Carbon\Carbon::parse($range[0]);
                                $maxDate = \Carbon\Carbon::parse($range[1]);

                                $matched = !$rowDate->between($minDate, $maxDate);

                            } elseif (is_numeric($rowValue)) {

                                $rowNum = floatval($rowValue);
                                $min = floatval($range[0]);
                                $max = floatval($range[1]);

                                $matched = ($rowNum < $min || $rowNum > $max);

                            } else {

                                $matched = ($rowValue < $range[0] || $rowValue > $range[1]);
                            }
                        }

                        break;
                }

                // AND logic
                if (!$matched) {
                    return false;
                }
            }

            return true;
        });
    }

    public function getDokumentasi($noTrans)
    {
        $data = DB::connection('ConnPurchase')
            ->table('YTRANSBL')
            ->select('Dokumentasi', 'DokumentasiFile')
            ->where('No_trans', trim($noTrans))
            ->first();

        // Jika record tidak ditemukan
        if (!$data) {
            return response('', 204);
        }
        if (!is_null($data->DokumentasiFile) && strlen($data->DokumentasiFile) > 0) {

            return response($data->DokumentasiFile)
                ->header('Content-Type', 'application/pdf')
                ->header('Content-Disposition', 'inline; filename="Dokumentasi.pdf"');
        }


        if (!is_null($data->Dokumentasi) && trim($data->Dokumentasi) !== '') {

            $binaryImage = base64_decode($data->Dokumentasi, true);

            // Jika gagal decode base64
            if ($binaryImage === false) {
                return response('', 204);
            }

            // Deteksi mime type otomatis
            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->buffer($binaryImage);

            // Fallback jika mime tidak terdeteksi
            if (!$mimeType) {
                $mimeType = 'image/jpeg';
            }

            // Tentukan ekstensi berdasarkan mime
            $extension = match ($mimeType) {
                'image/png' => 'png',
                'image/jpeg' => 'jpg',
                'image/jpg' => 'jpg',
                default => 'jpg'
            };

            return response($binaryImage)
                ->header('Content-Type', $mimeType)
                ->header('Content-Disposition', 'inline; filename="Dokumentasi.' . $extension . '"');
        }

        return response('', 204);
    }

    public function downloadDokumentasi($noTrans)
    {
        $data = DB::connection('ConnPurchase')
            ->table('YTRANSBL')
            ->select('Dokumentasi', 'DokumentasiFile')
            ->where('No_trans', trim($noTrans))
            ->first();

        if (!$data) {
            return response('', 204);
        }

        if (!is_null($data->DokumentasiFile)) {

            return response($data->DokumentasiFile)
                ->header('Content-Type', 'application/pdf')
                ->header('Content-Disposition', 'attachment; filename="Dokumentasi_' . $noTrans . '.pdf"');
        }

        if (!empty(trim($data->Dokumentasi ?? ''))) {

            return response(base64_decode($data->Dokumentasi))
                ->header('Content-Type', 'image/jpeg')
                ->header('Content-Disposition', 'attachment; filename="Dokumentasi_' . $noTrans . '.jpg"');
        }

        return response('', 204);
    }

    public function getFotoBarang($kdBarang)
    {
        $kdBarang = trim(urldecode($kdBarang));
        $data = DB::connection('ConnPurchase')
            ->table('Y_FOTO')
            ->select('FOTO', 'URL')
            ->whereRaw('LTRIM(RTRIM(KD_BARANG)) = ?', [$kdBarang])
            ->first();

        if (!$data) {
            return response('', 404);
        }

        if (!is_null($data->FOTO) && $data->FOTO !== '') {
            $foto = $data->FOTO;

            if (is_resource($foto)) {
                $foto = stream_get_contents($foto);
            }
            if (
                is_string($foto) &&
                preg_match(
                    '/^data:image\/([a-zA-Z0-9.+-]+);base64,(.*)$/s',
                    $foto,
                    $matches
                )
            ) {
                $binary = base64_decode($matches[2], true);

                if ($binary !== false) {
                    return response($binary)
                        ->header(
                            'Content-Type',
                            'image/' . strtolower($matches[1])
                        )
                        ->header('Cache-Control', 'private, max-age=3600');
                }
            }

            if (is_string($foto)) {
                $cleanBase64 = preg_replace('/\s+/', '', $foto);
                $decoded = base64_decode($cleanBase64, true);

                if ($decoded !== false && strlen($decoded) > 0) {
                    $finfo = new \finfo(FILEINFO_MIME_TYPE);
                    $mimeType = $finfo->buffer($decoded);

                    if (
                        $mimeType &&
                        str_starts_with($mimeType, 'image/')
                    ) {
                        return response($decoded)
                            ->header('Content-Type', $mimeType)
                            ->header('Cache-Control', 'private, max-age=3600');
                    }
                }
            }

            if (is_string($foto) && strlen($foto) > 0) {
                $finfo = new \finfo(FILEINFO_MIME_TYPE);
                $mimeType = $finfo->buffer($foto);

                if (
                    $mimeType &&
                    str_starts_with($mimeType, 'image/')
                ) {
                    return response($foto)
                        ->header('Content-Type', $mimeType)
                        ->header('Cache-Control', 'private, max-age=3600');
                }
            }
        }

        if (!empty(trim($data->URL ?? ''))) {
            $url = trim($data->URL);

            if (
                filter_var($url, FILTER_VALIDATE_URL) ||
                str_starts_with($url, '/')
            ) {
                return redirect($url);
            }
        }

        return response('', 404);
    }

}
