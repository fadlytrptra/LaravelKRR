<?php

namespace App\Http\Controllers\Guard\DaftarTamu;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Http;
use Exception;

class FormDaftarTamuController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Guard');

        $nomorUser = trim(Auth::user()->NomorUser);

        // Cari user berdasarkan NomorUser yang login
        $user = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->where('NomorUser', $nomorUser)
            ->first();

        if (!$user) {
            abort(403, 'Data user tidak ditemukan.');
        }

        // Ambil lokasi yang dimiliki user
        $lokasiUser = DB::connection('ConnEDP')
            ->table('UserLokasi as UL')
            ->join('Lokasi as L', 'UL.Id_Lokasi', '=', 'L.Id_Lokasi')
            ->where('UL.Id_User', $user->IDUser)
            ->select('L.Id_Lokasi', 'L.Lokasi')
            ->distinct()
            ->orderBy('L.Lokasi')
            ->get();

        if ($lokasiUser->isEmpty()) {
            abort(403, 'User belum memiliki lokasi yang terdaftar.');
        }

        return view(
            'Guard.DaftarTamu.FormDaftarTamu',
            compact('access', 'lokasiUser')
        );
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'NamaTamu' => 'required|string|max:150',
            'Instansi' => 'required|string|max:150',
            'BertemuDengan' => 'required|string|max:150',
            'Keperluan' => 'required|string|max:500',
            'Lokasi' => 'required|string|max:255',
            'FotoIdentitas' => 'required|file|mimes:jpg,jpeg,png,webp,pdf|max:3072',
            'FotoDiri' => 'required|image|mimes:jpg,jpeg,png,webp|max:3072',],
            [
            'required' => ':attribute wajib diisi.',
            'FotoIdentitas.max' =>
                'Ukuran foto identitas maksimal 3 MB.',
            'FotoDiri.max' =>
                'Ukuran foto selfie maksimal 3 MB.',
            'FotoIdentitas.mimes' =>
                'Foto identitas harus berupa JPG, PNG, WEBP, atau PDF.',
            'FotoDiri.image' =>
                'Foto selfie harus berupa gambar.',
        ]);

        $validator->validate();

        try {
            $nomorUser = trim(Auth::user()->NomorUser);

            // Validasi ulang user dari database EDP
            $user = DB::connection('ConnEDP')
                ->table('UserMaster')
                ->where('NomorUser', $nomorUser)
                ->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data user tidak ditemukan.',
                ], 403);
            }

            // Pastikan lokasi memang dimiliki user yang login
            $lokasiValid = DB::connection('ConnEDP')
                ->table('UserLokasi as UL')
                ->join('Lokasi as L', 'UL.Id_Lokasi', '=', 'L.Id_Lokasi')
                ->where('UL.Id_User', $user->IDUser)
                ->where('L.Id_Lokasi', $request->input('Lokasi'))
                ->select('L.Lokasi')
                ->first();

            if (!$lokasiValid) {
                return response()->json([
                    'success' => false,
                    'message' => 'Lokasi tidak valid untuk user ini.',
                ], 422);
            }

            $fotoIdentitas = $request->file('FotoIdentitas');
            $fotoDiri = $request->file('FotoDiri');

            // Simpan isi file dalam format Base64
            $fotoIdentitasBase64 = 'data:' .
                $fotoIdentitas->getMimeType() .
                ';base64,' .
                base64_encode($fotoIdentitas->get());

            $fotoDiriBase64 = 'data:' .
                $fotoDiri->getMimeType() .
                ';base64,' .
                base64_encode($fotoDiri->get());

            DB::connection('ConnGuard')
                ->table('Daftar_Tamu')
                ->insert([
                    'NamaTamu' => trim($request->NamaTamu),
                    'Instansi' => trim($request->Instansi),
                    'BertemuDengan' => trim($request->BertemuDengan),
                    'Keperluan' => trim($request->Keperluan),
                    'FotoIdentitas' => $fotoIdentitasBase64,
                    'FotoDiri' => $fotoDiriBase64,
                    'JamKeluar' => null,
                    'Lokasi' => $lokasiValid->Lokasi,
                    'wa_pengumuman' => $request->grup_pengumuman == 1 ? 1 : 0,
                    'wa_staff' => $request->grup_staff == 1 ? 1 : 0,
                    'UserInput' => trim($user->NamaUser),
                    'IPAddress' => $request->ip(),

                    // TimeStamp tidak diisi agar DEFAULT GETDATE()
                    // pada tabel SQL Server berjalan otomatis.
                ]);

            // Ambil tanggal dan jam pendaftaran
            $tanggal = now('Asia/Jakarta')->format('d/m/Y');
            $jam = now('Asia/Jakarta')->format('H:i:s');

            // Template pesan WhatsApp
            $message = "*PENDAFTARAN TAMU DI POS KEAMANAN PT. KERTA RAJASA RAYA (" . strtoupper(trim($lokasiValid->Lokasi)) . ")*\n\n"
                . "Tanggal: " . $tanggal . "\n"
                . "Jam: " . $jam . "\n"
                . "Nama Tamu: " . trim($request->NamaTamu) . "\n"
                . "Instansi: " . trim($request->Instansi) . "\n"
                . "Bertemu Dengan: " . trim($request->BertemuDengan) . "\n"
                . "Keperluan: " . trim($request->Keperluan) . "\n\n"
                . "Mohon " . trim($request->BertemuDengan)
                . " segera menemui " . trim($request->NamaTamu)
                . " - " . trim($request->Instansi)
                . " di Lobby / Ruang Meeting / Lokasi yang sudah ditentukan."
                ."\n\n"
                . "_Pesan ini terkirim otomatis menggunakan website KRR._";

            // Kirim ke grup pengumuman
            if ($request->grup_pengumuman == 1) {
                $response = Http::withHeaders([
                    'Authorization' => env('WA_TOKEN')
                ])->post('https://api.fonnte.com/send', [
                    'target' => '120363039436451185@g.us',
                    'message' => $message,
                ]);
            }

            // Kirim ke grup staff
            if ($request->grup_staff == 1) {
                $response = Http::withHeaders([
                    'Authorization' => env('WA_TOKEN')
                ])->post('https://api.fonnte.com/send', [
                    'target' => '120363044087527441@g.us',
                    'message' => $message,
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Pendaftaran tamu berhasil disimpan.',
            ]);

        } catch (Exception $e) {
            report($e);

            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan data tamu. Silakan coba kembali.',
            ], 500);
        }
    }

    public function show(Request $request, $id)
    {

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
