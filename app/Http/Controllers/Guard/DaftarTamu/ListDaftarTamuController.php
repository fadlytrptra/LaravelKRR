<?php

namespace App\Http\Controllers\Guard\DaftarTamu;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Exception;

class ListDaftarTamuController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Guard');

        $nomorUser = trim(Auth::user()->NomorUser);

        // Validasi user yang sedang login
        $user = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->where('NomorUser', $nomorUser)
            ->first();

        if (!$user) {
            abort(403, 'Data user tidak ditemukan.');
        }

        // Ambil lokasi yang dimiliki user untuk validasi akses
        $lokasiUser = DB::connection('ConnEDP')
            ->table('UserLokasi as UL')
            ->join(
                'Lokasi as L',
                'UL.Id_Lokasi',
                '=',
                'L.Id_Lokasi'
            )
            ->where('UL.Id_User', $user->IDUser)
            ->select('L.Id_Lokasi', 'L.Lokasi')
            ->distinct()
            ->orderBy('L.Lokasi')
            ->get();

        if ($lokasiUser->isEmpty()) {
            abort(403, 'User belum memiliki lokasi yang terdaftar.');
        }

        // Ambil SEMUA lokasi dari tabel EDP.dbo.Lokasi
        // Termasuk lokasi yang belum memiliki data tamu
        $daftarLokasi = DB::connection('ConnEDP')
            ->table('Lokasi')
            ->select('Id_Lokasi', 'Lokasi')
            ->orderBy('Id_Lokasi')
            ->get();

        // Ambil data daftar tamu
        $dataTamu = DB::connection('ConnGuard')
            ->table('Daftar_Tamu')
            ->select(
                'IdDaftarTamu',
                'NamaTamu',
                'Instansi',
                'BertemuDengan',
                'Keperluan',
                'TimeStamp',
                'JamKeluar',
                'Lokasi',
                'UserInput',
                'UserEdit',
                'TimeEdit'
            )
            ->orderByDesc('TimeStamp')
            ->get();

        return view(
            'Guard.DaftarTamu.ListDaftarTamu',
            compact(
                'access',
                'lokasiUser',
                'daftarLokasi',
                'dataTamu'
            )
        );
    }

    // Ambil detail tamu beserta foto
    public function show(Request $request, $id)
    {
        $tamu = DB::connection('ConnGuard')
            ->table('Daftar_Tamu')
            ->where('IdDaftarTamu', $id)
            ->first();

        if (!$tamu) {
            return response()->json([
                'success' => false,
                'message' => 'Data tamu tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $tamu
        ]);
    }

    // Simpan jam keluar
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'JamKeluar' => [
                'required',
                'date_format:H:i'
            ]
        ]);

        $db = DB::connection('ConnGuard');

        $tamu = $db->table('Daftar_Tamu')
            ->where('IdDaftarTamu', $id)
            ->first();

        if (!$tamu) {
            return response()->json([
                'success' => false,
                'message' => 'Data tamu tidak ditemukan.'
            ], 404);
        }

        // Pertahankan tanggal JamKeluar sebelumnya jika sedang mengedit.
        // Jika belum pernah diisi, gunakan tanggal hari ini.
        if ($tamu->JamKeluar) {
            $jamKeluar = \Carbon\Carbon::parse($tamu->JamKeluar)
                ->setTimeFromTimeString($validated['JamKeluar'])
                ->format('Y-m-d H:i:s');
        } else {
            $jamKeluar = \Carbon\Carbon::today('Asia/Jakarta')
                ->setTimeFromTimeString($validated['JamKeluar'])
                ->format('Y-m-d H:i:s');
        }

        // Ambil NamaUser dari database EDP berdasarkan user yang login
        $nomorUser = trim((string) (Auth::user()->NomorUser ?? ''));

        $user = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->where('NomorUser', $nomorUser)
            ->select('NamaUser')
            ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Data user tidak ditemukan.'
            ], 403);
        }

        $userEdit = substr(trim($user->NamaUser), 0, 50);

        $db->table('Daftar_Tamu')
            ->where('IdDaftarTamu', $id)
            ->update([
                'JamKeluar' => $jamKeluar,
                'UserEdit' => substr($userEdit, 0, 50),
                'TimeEdit' => \Carbon\Carbon::now('Asia/Jakarta')
                    ->format('Y-m-d H:i:s')
            ]);

        return response()->json([
            'success' => true,
            'message' => $tamu->JamKeluar
                ? 'Jam keluar berhasil diperbarui.'
                : 'Jam keluar berhasil disimpan.'
        ]);
    }

    public function foto($id, $jenis)
    {
        if (!in_array($jenis, ['identitas', 'diri'])) {
            abort(404);
        }

        $kolom = $jenis === 'identitas'
            ? 'FotoIdentitas'
            : 'FotoDiri';

        $foto = DB::connection('ConnGuard')
            ->table('Daftar_Tamu')
            ->where('IdDaftarTamu', $id)
            ->value($kolom);

        if (empty($foto)) {
            abort(404, 'Foto tidak ditemukan.');
        }

        // Ambil MIME type dan Base64 dari data URL.
        if (!preg_match(
            '/^data:(image\/[a-zA-Z0-9.+-]+|application\/pdf);base64,(.+)$/s',
            $foto,
            $matches
        )) {
            abort(415, 'Format gambar tidak valid.');
        }

        $mime = $matches[1];
        $binary = base64_decode($matches[2], true);

        if ($binary === false) {
            abort(404, 'Data Base64 tidak valid.');
        }

        return response($binary)
            ->header('Content-Type', $mime)
            ->header('Content-Disposition', 'inline')
            ->header('X-Content-Type-Options', 'nosniff');
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
