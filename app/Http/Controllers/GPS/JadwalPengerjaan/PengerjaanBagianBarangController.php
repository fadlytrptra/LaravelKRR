<?php

namespace App\Http\Controllers\GPS\JadwalPengerjaan;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PengerjaanBagianBarangController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('GPS');
        return view('GPS.JadwalPengerjaan.pengerjaanBagianBarang', compact('access'));
    }

    // Load order kerja / proyek (SP_5298_PJW_LIST-ORDER-KERJA / SP_5298_PJW_LIST-ORDER-PROYEK)
    public function getOrder(Request $request)
    {
        $validated = $request->validate([
            'noOd'    => ['required', 'string', 'max:6'],
            'jenisOd' => ['required', 'string', 'in:H,P'],
        ]);

        $noOd = $validated['noOd'];
        $jenisOd = $validated['jenisOd'];
        $db = DB::connection('Connworkshop');

        try {
            $sp = $jenisOd === 'H'
                ? 'EXEC [dbo].[SP_5298_PJW_LIST-ORDER-KERJA] @kode=?, @noOd=?'
                : 'EXEC [dbo].[SP_5298_PJW_LIST-ORDER-PROYEK] @kode=?, @noOd=?';
            $order = collect($db->select($sp, [1, $noOd]))->first();

            if (!$order) {
                $label = $jenisOd === 'H' ? 'Order Kerja' : 'Order Proyek';
                return response()->json(['error' => "Nomer $label $noOd tidak ada, belum di-ACC, ditolak, atau sudah finish."], 404);
            }

            $response = [
                'TDivisi'    => $order->NamaDivisi ?? '',
                'TKdBrg'     => $order->Kd_Brg ?? '',
                'TNamaBrg'   => $jenisOd === 'H' ? ($order->Nama_Brg ?? '') : ($order->Nama_Proyek ?? ''),
                'TNoGbr'     => $order->No_Gbr ?? '',
                'TJml'       => trim(($order->Jml_Brg ?? '0') . ' ' . ($order->Satuan ?? '')),
                'OdSts'      => $order->OdSts ?? '',
                'TKetOrder'  => $order->Ket_Order ?? '',
                'TMesin'     => $order->Mesin ?? '',
                'TUserOrder' => $order->UserOrder ?? '',
            ];
            return response()->json($response);
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
                $validated['jenisOd'],
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

    // Lookup material (SP_5298_PJW_LIST-MATERIAL)
    public function getMaterialList()
    {
        $db = DB::connection('Connworkshop');
        try {
            $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL]');
            return response()->json(array_map(function ($item) {
                return [
                    'IdMaterial'   => $item->NoMtr ?? ($item->NoMaterial ?? ''),
                    'NamaMaterial' => $item->MtrType ?? ($item->MaterialType ?? ''),
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Lookup spek material bagian (SP_5298_PJW_LIST-MATERIAL-BAGIAN kode=1 / kode=2)
    public function getSpekList(Request $request)
    {
        $validated = $request->validate([
            'kode'     => ['required', 'integer', 'in:1,2'],
            'noBagian' => ['nullable', 'integer'],
            'nomer'    => ['nullable', 'integer'],
        ]);

        $db = DB::connection('Connworkshop');
        $kode = $validated['kode'];
        try {
            if ($kode == 1) {
                $list = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL-BAGIAN] @kode=?, @noBagian=?', [1, $validated['noBagian'] ?? 0]);
                return response()->json(array_map(function ($item) {
                    return [
                        'NoSpek'   => $item->Nomer ?? ($item->NoSpek ?? ''),
                        'Spek'     => $item->Spek ?? '',
                    ];
                }, $list));
            } else {
                // kode = 2 → detail satu spek
                $detail = collect($db->select('EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL-BAGIAN] @kode=?, @nomer=?', [2, $validated['nomer'] ?? 0]))->first();
                if (!$detail) {
                    return response()->json(['error' => 'Data spek tidak ditemukan.'], 404);
                }
                return response()->json([
                    'MtrType' => $detail->MtrType ?? '',
                    'NoMtr'   => $detail->NoMtr ?? '',
                    'KdBrg'   => $detail->KdBrg ?? '',
                    'Status'  => (int)($detail->Status ?? 0),
                    'Spek'    => $detail->Spek ?? '',
                ]);
            }
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
                    'NoSat'   => $item->NoSat ?? ($item->KodeSatuan ?? ''),
                    'Satuan'  => $item->Nama_Satuan ?? ($item->Satuan ?? ''),
                ];
            }, $list));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Proses Bagian Barang (SP_5298_PJW_MAINT-BAGIAN-BARANG)
    // Juga menangani cek duplikat & cek transaksi.
    public function processBagian(Request $request)
    {
        $validated = $request->validate([
            'proses'   => ['required', 'integer', 'in:1,2,3'],
            'noOd'     => ['required', 'string', 'max:6'],
            'jenisOd'  => ['required', 'string', 'in:H,P'],
            'bagian'   => ['nullable', 'string', 'max:100'],
            'idBagian' => ['nullable', 'integer'],
        ]);

        $proses = (int)$validated['proses'];
        $noOd = $validated['noOd'];
        $jenisOd = $validated['jenisOd'];
        $bagian = trim($validated['bagian'] ?? '');
        $idBagian = $validated['idBagian'] ?? null;

        $db = DB::connection('Connworkshop');

        try {
            $db->beginTransaction();

            // Cek duplikat untuk bagian baru.
            if ($proses == 1) {
                if ($bagian === '') {
                    $db->rollBack();
                    return response()->json(['error' => 'Nama Bagian tidak boleh kosong.'], 400);
                }
                $cek = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-BAGIAN-BARANG] ?, ?, ?', [$noOd, $bagian, $jenisOd]))->first();
                if ($cek && $cek->ada > 0) {
                    $db->rollBack();
                    return response()->json(['error' => 'Nama Bagian yang akan diinputkan sudah ada. Tlg dicek datanya.'], 400);
                }
            }

            // Cek transaksi (proses hapus)
            if ($proses == 3) {
                if (!$idBagian) {
                    $db->rollBack();
                    return response()->json(['error' => 'ID Bagian tidak ditemukan.'], 400);
                }
                $cekTrx = collect($db->select('EXEC [dbo].[SP_5298_PJW_CEK-TRANSAKSI-BAGIAN] ?, ?, ?', [$noOd, $idBagian, $jenisOd]))->first();
                if ($cekTrx && $cekTrx->ada > 0) {
                    $db->rollBack();
                    return response()->json(['error' => 'Nama Bagian tidak bisa dihapus, karena sudah bertransaksi.'], 400);
                }

                $bagianList = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-BARANG] ?, ?', [$noOd, $jenisOd]);
                $bagianExists = collect($bagianList)->contains(function ($item) use ($idBagian) {
                    return (string)($item->NoBagian ?? ($item->IdBagian ?? '')) === (string)$idBagian;
                });
                if (!$bagianExists) {
                    $db->rollBack();
                    return response()->json(['error' => 'Bagian tidak ditemukan pada order tersebut.'], 404);
                }

                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-MATERIAL-BAGIAN] ?, ?', [4, $idBagian]);
                $remainingMaterials = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL-BAGIAN] ?, ?', [1, $idBagian]);
                if ($remainingMaterials) {
                    throw new \RuntimeException('Material bagian masih ditemukan setelah proses hapus.');
                }
            }

            // Eksekusi SP_5298_PJW_MAINT-BAGIAN-BARANG
            if ($proses == 1) {
                // SP maintenance dijalankan sebagai statement. Ambil ID hasil insert
                // dari SP list, yang memang mengembalikan NoBagian untuk order ini.
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-BAGIAN-BARANG] @kode=?, @noOd=?, @bagian=?, @jenisOd=?', [1, $noOd, $bagian, $jenisOd]);
                $insertedBagian = collect($db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-BARANG] ?, ?', [$noOd, $jenisOd]))
                    ->first(function ($item) use ($bagian) {
                        return trim((string)($item->NamaBagian ?? '')) === $bagian;
                    });
                $newIdBagian = $insertedBagian->NoBagian ?? ($insertedBagian->IdBagian ?? null);
                if (!$newIdBagian) {
                    throw new \RuntimeException('ID bagian baru tidak ditemukan setelah proses simpan.');
                }
                $db->commit();
                return response()->json([
                    'message' => 'Data telah disimpan.',
                    'idBagian' => $newIdBagian,
                ]);
            } elseif ($proses == 2) {
                if (!$idBagian) {
                    $db->rollBack();
                    return response()->json(['error' => 'ID Bagian tidak ditemukan.'], 400);
                }
                if ($bagian === '') {
                    $db->rollBack();
                    return response()->json(['error' => 'Nama Bagian tidak boleh kosong.'], 400);
                }
                $bagianList = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-BARANG] ?, ?', [$noOd, $jenisOd]);
                $currentBagian = collect($bagianList)->first(function ($item) use ($idBagian) {
                    return (string)($item->NoBagian ?? ($item->IdBagian ?? '')) === (string)$idBagian;
                });
                if (!$currentBagian) {
                    $db->rollBack();
                    return response()->json(['error' => 'Bagian tidak ditemukan pada order tersebut.'], 404);
                }

                $duplicateMessage = 'Nama Bagian yang diinputkan sudah ada, Tolong di cek kembali datanya';
                $currentName = trim((string)($currentBagian->NamaBagian ?? ''));
                $sameName = strcasecmp($currentName, $bagian) === 0;
                $nameAlreadyUsed = collect($bagianList)->contains(function ($item) use ($idBagian, $bagian) {
                    $itemId = (string)($item->NoBagian ?? ($item->IdBagian ?? ''));
                    $itemName = trim((string)($item->NamaBagian ?? ''));

                    return $itemId !== (string)$idBagian && strcasecmp($itemName, $bagian) === 0;
                });
                if ($sameName || $nameAlreadyUsed) {
                    $db->rollBack();
                    return response()->json(['error' => $duplicateMessage], 400);
                }

                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-BAGIAN-BARANG] @kode=?, @idBagian=?, @bagian=?', [2, $idBagian, $bagian]);
                $updatedBagian = collect($db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-BARANG] ?, ?', [$noOd, $jenisOd]))
                    ->first(function ($item) use ($idBagian) {
                        return (string)($item->NoBagian ?? ($item->IdBagian ?? '')) === (string)$idBagian;
                    });
                if (!$updatedBagian || trim((string)($updatedBagian->NamaBagian ?? '')) !== $bagian) {
                    throw new \RuntimeException('Perubahan nama bagian tidak tersimpan.');
                }
                $db->commit();
                return response()->json(['message' => 'Data telah dikoreksi.']);
            } else {
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-BAGIAN-BARANG] @kode=?, @idBagian=?', [3, $idBagian]);
                $remainingBagian = collect($db->select('EXEC [dbo].[SP_5298_PJW_LIST-BAGIAN-BARANG] ?, ?', [$noOd, $jenisOd]))
                    ->contains(function ($item) use ($idBagian) {
                        return (string)($item->NoBagian ?? ($item->IdBagian ?? '')) === (string)$idBagian;
                    });
                if ($remainingBagian) {
                    throw new \RuntimeException('Bagian masih ditemukan setelah proses hapus.');
                }
                $db->commit();
                return response()->json(['message' => 'Data bagian telah dihapus.']);
            }
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // Proses Material Bagian (SP_5298_PJW_MAINT-MATERIAL-BAGIAN kode 1-5)
    // public function processMaterial(Request $request)
    // {
    //     $validated = $request->validate([
    //         'proses'   => ['required', 'integer', 'in:1,2,3,4'],  // prosesMtr
    //         'idBagian' => ['required', 'integer'],
    //         'noMat'    => ['nullable', 'integer'],
    //         'spek'     => ['nullable', 'string', 'max:255'],
    //         'kdBrg'    => ['nullable', 'string', 'max:50'],
    //         'status'   => ['nullable', 'integer', 'in:0,1'],
    //         'nomer'    => ['nullable', 'integer'], // TNoSpek untuk koreksi/hapus
    //     ]);

    //     $proses = (int)$validated['proses'];
    //     $idBagian = (int)$validated['idBagian'];
    //     $noMat = $validated['noMat'] ?? 0;
    //     $spek = trim($validated['spek'] ?? '');
    //     $kdBrg = trim($validated['kdBrg'] ?? '');
    //     $status = $validated['status'] ?? 0;
    //     $nomer = $validated['nomer'] ?? 0;

    //     $db = DB::connection('Connworkshop');

    //     try {
    //         $db->beginTransaction();

    //         if ($proses == 1) {
    //             // kode=1: insert material bagian
    //             $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-MATERIAL-BAGIAN] @kode=?, @noBagian=?, @noMtr=?, @spek=?, @kdBrg=?, @status=?', [
    //                 1, $idBagian, $noMat, $spek, $kdBrg, $status
    //             ]);
    //             $db->commit();
    //             return response()->json(['message' => 'Data Material telah disimpan.']);
    //         } elseif ($proses == 2) {
    //             // kode=5: koreksi material bagian
    //             if (!$nomer) {
    //                 $db->rollBack();
    //                 return response()->json(['error' => 'Data spek tidak ditemukan.'], 400);
    //             }
    //             $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-MATERIAL-BAGIAN] @kode=?, @nomer=?, @noMtr=?, @spek=?, @kdBrg=?, @status=?', [
    //                 5, $nomer, $noMat, $spek, $kdBrg, $status
    //             ]);
    //             $updatedMaterial = collect($db->select('EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL-BAGIAN] ?, ?', [2, $nomer]))->first();
    //             if (
    //                 !$updatedMaterial
    //                 || (string)($updatedMaterial->NoMtr ?? '') !== (string)$noMat
    //                 || trim((string)($updatedMaterial->Spek ?? '')) !== $spek
    //                 || trim((string)($updatedMaterial->KdBrg ?? '')) !== $kdBrg
    //                 || (int)($updatedMaterial->Status ?? -1) !== (int)$status
    //             ) {
    //                 throw new \RuntimeException('Perubahan material tidak tersimpan.');
    //             }
    //             $db->commit();
    //             return response()->json(['message' => 'Data Material telah dikoreksi.']);
    //         } elseif ($proses == 3) {
    //             // kode=3: hapus material bagian
    //             if (!$nomer) {
    //                 $db->rollBack();
    //                 return response()->json(['error' => 'Data spek tidak ditemukan.'], 400);
    //             }
    //             $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-MATERIAL-BAGIAN] @kode=?, @nomer=?', [3, $nomer]);
    //             $remainingMaterial = collect($db->select('EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL-BAGIAN] ?, ?', [2, $nomer]))->first();
    //             if ($remainingMaterial) {
    //                 throw new \RuntimeException('Material masih ditemukan setelah proses hapus.');
    //             }
    //             $db->commit();
    //             return response()->json(['message' => 'Data Material telah dihapus.']);
    //         } else {
    //             // kode=4: hapus semua material dari bagian (untuk delete bagian)
    //             $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-MATERIAL-BAGIAN] @kode=?, @noBgaian=?', [4, $idBagian]);
    //             $remainingMaterials = $db->select('EXEC [dbo].[SP_5298_PJW_LIST-MATERIAL-BAGIAN] ?, ?', [1, $idBagian]);
    //             if ($remainingMaterials) {
    //                 throw new \RuntimeException('Material bagian masih ditemukan setelah proses hapus.');
    //             }
    //             $db->commit();
    //             return response()->json(['message' => 'Semua material bagian telah dihapus.']);
    //         }

    //     } catch (\Exception $e) {
    //         $db->rollBack();
    //         return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
    //     }
    // }

    // Proses Material Bagian (SP_5298_PJW_MAINT-MATERIAL-BAGIAN kode 1-5)
    public function processMaterial(Request $request)
    {
        $validated = $request->validate([
            'proses'   => ['required', 'integer', 'in:1,2,3,4'],  // prosesMtr
            'idBagian' => ['required', 'integer'],
            'noMat'    => ['nullable', 'integer'],
            'spek'     => ['nullable', 'string', 'max:255'],
            'kdBrg'    => ['nullable', 'string', 'max:50'],
            'status'   => ['nullable', 'integer', 'in:0,1'],
            'nomer'    => ['nullable', 'integer'], // TNoSpek untuk koreksi/hapus
        ]);

        $proses = (int)$validated['proses'];
        $idBagian = (int)$validated['idBagian'];
        $noMat = $validated['noMat'] ?? 0;
        $spek = trim($validated['spek'] ?? '');
        $kdBrg = trim($validated['kdBrg'] ?? '');
        $status = $validated['status'] ?? 0;
        $nomer = $validated['nomer'] ?? 0;

        $db = DB::connection('Connworkshop');

        try {
            $db->beginTransaction();

            if ($proses == 1) {
                // kode=1: insert material bagian
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-MATERIAL-BAGIAN] @kode=?, @noBagian=?, @noMtr=?, @spek=?, @kdBrg=?, @status=?', [
                    1,
                    $idBagian,
                    $noMat,
                    $spek,
                    $kdBrg,
                    $status
                ]);
                $db->commit();
                return response()->json(['message' => 'Data Material telah disimpan.']);
            } elseif ($proses == 2) {
                // kode=5: koreksi material bagian
                if (!$nomer) {
                    $db->rollBack();
                    return response()->json(['error' => 'Data spek tidak ditemukan.'], 400);
                }

                // Eksekusi SP tanpa perlu di-select ulang untuk divalidasi (Mencegah false positive error whitespace)
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-MATERIAL-BAGIAN] @kode=?, @nomer=?, @noMtr=?, @spek=?, @kdBrg=?, @status=?', [
                    5,
                    $nomer,
                    $noMat,
                    $spek,
                    $kdBrg,
                    $status
                ]);
                $db->commit();
                return response()->json(['message' => 'Data Material telah dikoreksi.']);
            } elseif ($proses == 3) {
                // kode=3: hapus material bagian
                if (!$nomer) {
                    $db->rollBack();
                    return response()->json(['error' => 'Data spek tidak ditemukan.'], 400);
                }
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-MATERIAL-BAGIAN] @kode=?, @nomer=?', [3, $nomer]);
                $db->commit();
                return response()->json(['message' => 'Data Material telah dihapus.']);
            } else {
                // kode=4: hapus semua material dari bagian (untuk delete bagian)
                $db->statement('EXEC [dbo].[SP_5298_PJW_MAINT-MATERIAL-BAGIAN] @kode=?, @noBagian=?', [4, $idBagian]);
                $db->commit();
                return response()->json(['message' => 'Semua material bagian telah dihapus.']);
            }
        } catch (\Exception $e) {
            $db->rollBack();
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
