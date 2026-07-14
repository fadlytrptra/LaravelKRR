<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FotoBarangController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $isAdminFotoBarang = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->where('NomorUser', Auth::user()->NomorUser)
            ->where('IsAdminFotoBarang', 1)
            ->exists();

        return view('Beli.TransaksiBeli.FotoBarang', compact('access', 'isAdminFotoBarang'));
    }

    public function show($id)
    {
        try {
            $result = DB::connection('ConnPurchase')
                ->select('EXEC spSelect_Foto_Barang_dotNet ?',[$id]);

            if (empty($result)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Barang tidak ditemukan'
                ]);
            }

            $barang = $result[0];
            return response()->json([
                'success' => true,
                'data' => [
                    'kd_brg' => $barang->KD_BRG ?? '',
                    'nama_brg' => $barang->NAMA_BRG ?? '',
                    'ket' => $barang->KET ?? '',
                    'foto' => !empty($barang->FOTO)
                        ? base64_encode($barang->FOTO)
                        : null
                ]
            ]);

        } catch (\Exception $e) {

            Log::error($e);

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data barang',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'Kd_Barang' => 'required|max:9',
            'Foto' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120'
        ]);

        $kdBarang = trim($request->Kd_Barang);
        $userInput = Auth::user()->NomorUser;
        $inputAt = now()->format('Y-m-d H:i:s');

        $conn = DB::connection('ConnPurchase');
        $conn->beginTransaction();

        try {
            $existing = $conn->table('Y_FOTO')
                ->where('KD_BARANG', $kdBarang)
                ->lockForUpdate()
                ->first();

            $file = $request->file('Foto');

            $binary = $file->get();
            $hex = '0x' . bin2hex($binary);
            $base64 = base64_encode($binary);

            // Row ada dan sudah memiliki foto
            if ($existing && !is_null($existing->FOTO)) {
                $conn->rollBack();

                return response()->json([
                    'success' => false,
                    'message' => 'Kode Barang ini sudah memiliki gambar, hapus dahulu untuk memasukkan gambar baru!'
                ], 400);
            }

            // Row sudah ada, tetapi FOTO masih NULL
            if ($existing) {
                $conn->statement("
                    UPDATE Y_FOTO
                    SET
                        FOTO = $hex,
                        URL = ?,
                        [UserInput] = ?,
                        [InputAt] = ?
                    WHERE KD_BARANG = ?
                ", [
                    $base64,
                    $userInput,
                    $inputAt,
                    $kdBarang
                ]);
            } else {
                // Row belum ada
                $conn->statement("
                    INSERT INTO Y_FOTO (
                        KD_BARANG,
                        FOTO,
                        URL,
                        [UserInput],
                        [InputAt]
                    )
                    VALUES (?, $hex, ?, ?, ?)
                ", [
                    $kdBarang,
                    $base64,
                    $userInput,
                    $inputAt
                ]);
            }

            $conn->commit();

            return response()->json([
                'success' => true,
                'message' => 'Foto berhasil disimpan'
            ]);

        } catch (\Throwable $e) {
            $conn->rollBack();

            Log::error('Upload Foto Error', [
                'message' => $e->getMessage(),
                'userInput' => $userInput,
                'inputAt' => $inputAt,
                'kdBarang' => $kdBarang,
                'trace' => $e->getTraceAsString()
            ]);

            // SEMENTARA untuk debugging
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan foto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
        // cek apakah ada gambar
        $existing = DB::connection('ConnPurchase') ->table('Y_FOTO')
            ->where('KD_BARANG', trim($id)) ->first();

            if ( !$existing || is_null($existing->FOTO) ) {
            return response()->json([
                'success' => false, 'message' => 'Tidak ada gambar untuk dihapus.'
                ], 404);
            }

            DB::connection('ConnPurchase')->statement(
                'EXEC spHapus_FotoBarang_dotNet ?',
                [$id]
            );

            return response()->json([
                'success' => true,
                'message' => 'Foto berhasil dihapus'
            ]);

        } catch (\Exception $e) {
            Log::error($e);

            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus foto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function create()
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }
}

