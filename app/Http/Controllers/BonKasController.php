<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use ZipArchive;

class BonKasController extends Controller
{
    public function index(Request $request)
    {
        $nomorUser = Auth::user()->NomorUser;

        $adminKasir = DB::connection('ConnAccounting')
            ->table('T_ADMIN_BON_KAS')
            ->pluck('nomorUser_adm')
            ->map(fn($x) => trim($x))
            ->toArray();

        $isAdminKasir = in_array(trim(Auth::user()->NomorUser), $adminKasir);


        $query = DB::connection('ConnAccounting')
            ->table('T_BON_KAS as BK')
            ->leftJoin('T_STATUS_BON_KAS as SBK', 'BK.Status', '=', 'SBK.KdStatus')
            //->where('BK.Penerima', $nomorUser)
            ->select('BK.*', 'SBK.Status as NamaStatus')
            ->where('BK.Status', '<>', 4);

        if (!$isAdminKasir) {
            $query->where(function ($q) use ($nomorUser) {
                $q->where('BK.Penerima', $nomorUser);
                // ->orWhere('BK.Mengetahui', $nomorUser);
            });
        }


        if ($request->filled('keyword')) {
            $query->where(function ($q) use ($request) {
                $q->where('BK.KodeBonKas', 'like', '%' . $request->keyword . '%')
                ->orWhere('BK.Uraian', 'like', '%' . $request->keyword . '%');
            });
        }

        if ($request->filled('jenis')) {
            $query->where('BK.JenisBonKas', $request->jenis);
        }

        if ($request->filled('status')) {
            $query->where('BK.Status', $request->status);
        }

        $bonKas = $query
            ->orderByDesc('BK.Tanggal')
            ->orderByDesc('BK.KodeBonKas')
            ->get();

        $userList = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->select('NomorUser', 'NamaUser', 'FotoTtd')
            ->get();

        $users = [];

        foreach ($userList as $user) {
            $users[trim($user->NomorUser)] = $user;
        }

        $listUser = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->select('NomorUser', 'NamaUser')
            ->orderBy('NamaUser')
            ->get();

        foreach ($bonKas as $item) {
            $nomorPenerima   = trim((string) $item->Penerima);
            $nomorMengetahui = trim((string) $item->Mengetahui);
            $nomorKasir      = trim((string) $item->Kasir);
            $item->NamaPenerima   = $users[$nomorPenerima]->NamaUser ?? '';
            $item->NamaMengetahui = $users[$nomorMengetahui]->NamaUser ?? '';
            $item->NamaKasir      = $users[$nomorKasir]->NamaUser ?? '';
            $item->TtdPenerima    = $users[$nomorPenerima]->FotoTtd ?? null;
            $item->TtdMengetahui  = $users[$nomorMengetahui]->FotoTtd ?? null;
            $item->TtdKasir       = $users[$nomorKasir]->FotoTtd ?? null;
            $item->Aksi = '';

            if ($item->JenisBonKas == 'P') {
                $penyesuaian = DB::connection('ConnAccounting')
                    ->table('T_BON_KAS')
                    ->where('JenisBonKas', 'M')
                    ->where('KodeBonKas2', $item->KodeBonKas)
                    ->select('KodeBonKas', 'Jumlah')
                    ->get();

                $item->KodeBonKasMerah = $penyesuaian
                    ->pluck('KodeBonKas')
                    ->implode(', ');

                $item->TotalBonKasMerah = $penyesuaian
                    ->sum('Jumlah');

            } else {

                $item->KodeBonKasMerah = '';
                $item->TotalBonKasMerah = 0;

            }


            // Prioritas 1: Kasir
            if ((int)$item->Status == 2 && $isAdminKasir) {
                $item->Aksi = 'KASIR';
            }

            // Prioritas 2
            if ($item->Aksi == '' && trim($item->Mengetahui) == trim($nomorUser)) {
                switch ((int)$item->Status) {
                    case 1:
                        $item->Aksi = 'ACC';
                        break;

                    case 2:
                        $item->Aksi = 'PRINT';
                        break;

                    case 3:
                        $item->Aksi = 'SELESAI';
                        break;
                }
            }

            // Prioritas 2.5: Penerima setelah Submit maupun ACC Kasir
            if (
                $item->Aksi == '' &&
                trim($item->Penerima) == trim($nomorUser) &&
                in_array((int)$item->Status, [1, 2])
            ) {
                $item->Aksi = 'PRINT_PENERIMA';
            }

            // Prioritas 3
            if ($item->Aksi == '' && trim($item->Penerima) == trim($nomorUser)) {
                if ((int)$item->Status == 0) {
                    $item->Aksi = 'KIRIM';
                }
            }
        }

        // Generate kode Bon Kas Putih
        $lastKodePutih = DB::connection('ConnAccounting')
            ->table('T_BON_KAS')
            ->where('JenisBonKas', 'P')
            ->orderByDesc('KodeBonKas')
            ->value('KodeBonKas');

        $nextPutih = $lastKodePutih
            ? ((int) substr($lastKodePutih, 3)) + 1
            : 1;

        $kodeBonKasPutih = 'BKP' . str_pad($nextPutih, 5, '0', STR_PAD_LEFT);

        //merah
        $lastKodeMerah = DB::connection('ConnAccounting')
            ->table('T_BON_KAS')
            ->where('JenisBonKas', 'M')
            ->orderByDesc('KodeBonKas')
            ->value('KodeBonKas');

        $nextMerah = $lastKodeMerah
            ? ((int) substr($lastKodeMerah, 3)) + 1
            : 1;

        $kodeBonKasMerah = 'BKM' . str_pad($nextMerah, 5, '0', STR_PAD_LEFT);

        // Ambil Bon Kas Merah untuk Penyesuaian
        $bonKasMerah = DB::connection('ConnAccounting')
            ->table('T_BON_KAS as BK')
            ->leftJoin('T_STATUS_BON_KAS as SBK', 'BK.Status', '=', 'SBK.KdStatus')
            ->select('BK.*', 'SBK.Status as NamaStatus')
            ->where('BK.JenisBonKas', 'M')
            ->where(function ($q) use ($nomorUser) {
                $q->where('BK.Penerima', $nomorUser);
            })
            ->where(function ($q) {
                $q->whereNull('BK.KodeBonKas2')
                ->orWhere('BK.KodeBonKas2', '');
            })
            ->orderByDesc('BK.Tanggal')
            ->orderByDesc('BK.KodeBonKas')
            ->get();

        $listStatus = DB::connection('ConnAccounting')
            ->table('T_STATUS_BON_KAS')
            ->where('KdStatus', '<>', 4)
            ->orderBy('KdStatus')
            ->get();

        return view('listBonKas', compact('bonKas', 'listUser', 'listStatus', 'isAdminKasir', 'kodeBonKasPutih', 'kodeBonKasMerah' ,'bonKasMerah'));
    }

    public function listAccBonKas(Request $request)
    {
        // Bon Kas yang harus di-ACC
        $nomorUser = Auth::user()->NomorUser;

        $query = DB::connection('ConnAccounting')
            ->table('T_BON_KAS as BK')
            ->leftJoin('T_STATUS_BON_KAS as SBK', 'BK.Status', '=', 'SBK.KdStatus')
            ->select('BK.*', 'SBK.Status as NamaStatus')
            ->where('BK.Mengetahui', $nomorUser)
            ->where('BK.Status', 1);

        if ($request->filled('keyword')) {
            $query->where(function ($q) use ($request) {
                $q->where('BK.KodeBonKas', 'like', '%' . $request->keyword . '%')
                ->orWhere('BK.Uraian', 'like', '%' . $request->keyword . '%');
            });
        }

        if ($request->filled('jenis')) {
            $query->where('BK.JenisBonKas', $request->jenis);
        }

        $bonKas = $query
            ->orderByDesc('BK.Tanggal')
            ->orderByDesc('BK.KodeBonKas')
            ->get();

        $userList = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->select('NomorUser', 'NamaUser', 'FotoTtd')
            ->get();

        $users = [];

        foreach ($userList as $user) {
            $users[trim($user->NomorUser)] = $user;
        }

        $listUser = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->select('NomorUser', 'NamaUser')
            ->orderBy('NamaUser')
            ->get();

        $adminKasir = DB::connection('ConnAccounting')
            ->table('T_ADMIN_BON_KAS')
            ->pluck('nomorUser_adm')
            ->map(fn($x) => trim($x))
            ->toArray();

        $isAdminKasir = in_array(trim(Auth::user()->NomorUser), $adminKasir);

        foreach ($bonKas as $item) {
            $nomorPenerima   = trim((string) $item->Penerima);
            $nomorMengetahui = trim((string) $item->Mengetahui);
            $nomorKasir      = trim((string) $item->Kasir);

            $item->NamaPenerima   = $users[$nomorPenerima]->NamaUser ?? '';
            $item->NamaMengetahui = $users[$nomorMengetahui]->NamaUser ?? '';
            $item->NamaKasir      = $users[$nomorKasir]->NamaUser ?? '';

            $item->TtdPenerima    = $users[$nomorPenerima]->FotoTtd ?? null;
            $item->TtdMengetahui  = $users[$nomorMengetahui]->FotoTtd ?? null;
            $item->TtdKasir       = $users[$nomorKasir]->FotoTtd ?? null;

            if ($item->JenisBonKas == 'P') {
                $penyesuaian = DB::connection('ConnAccounting')
                    ->table('T_BON_KAS')
                    ->where('JenisBonKas', 'M')
                    ->where('KodeBonKas2', $item->KodeBonKas)
                    ->select('KodeBonKas', 'Jumlah')
                    ->get();

                $item->KodeBonKasMerah = $penyesuaian
                    ->pluck('KodeBonKas')
                    ->implode(', ');

                $item->TotalBonKasMerah = $penyesuaian
                    ->sum('Jumlah');

            } else {
                $item->KodeBonKasMerah = '';
                $item->TotalBonKasMerah = 0;
            }

            $item->Aksi = 'ACC';
        }
        return view('listAccBonKas', compact('bonKas', 'listUser', 'isAdminKasir'));
    }

    public function listPutih(Request $request)
    {
        $nomorUser = Auth::user()->NomorUser;

        $query = DB::connection('ConnAccounting')
            ->table('T_BON_KAS as BK')
            ->leftJoin('T_STATUS_BON_KAS as SBK', 'BK.Status', '=', 'SBK.KdStatus')
            ->select('BK.*', 'SBK.Status as NamaStatus')
            ->where('BK.Status', '<>', 4)
            ->where('BK.JenisBonKas', 'P')
            ->where(function ($q) use ($nomorUser) {
                $q->where('BK.Penerima', $nomorUser)
                ->orWhere('BK.Mengetahui', $nomorUser)
                ->orWhere('BK.Kasir', $nomorUser);
            });

        if ($request->filled('keyword')) {
            $query->where(function ($q) use ($request) {
                $q->where(
                    'BK.KodeBonKas',
                    'like',
                    '%' . $request->keyword . '%'
                )
                ->orWhere(
                    'BK.Uraian',
                    'like',
                    '%' . $request->keyword . '%'
                );
            });
        }

        $bonKas = $query
            ->orderByDesc('BK.Tanggal')
            ->orderByDesc('BK.KodeBonKas')
            ->get();

        $userList = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->select(
                'NomorUser',
                'NamaUser',
                'FotoTtd'
            )
            ->get();

        $users = [];

        foreach ($userList as $user) {
            $users[trim($user->NomorUser)] = $user;
        }

        $listUser = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->select('NomorUser', 'NamaUser')
            ->where('IsActive', 1)
            ->orderBy('NamaUser')
            ->get();

        $adminKasir = DB::connection('ConnAccounting')
            ->table('T_ADMIN_BON_KAS')
            ->pluck('nomorUser_adm')
            ->map(fn($x) => trim($x))
            ->toArray();

        $isAdminKasir = in_array(trim(Auth::user()->NomorUser), $adminKasir);

        foreach ($bonKas as $item) {
            $nomorPenerima = trim((string) $item->Penerima);
            $nomorMengetahui = trim((string) $item->Mengetahui);
            $nomorKasir = trim((string) $item->Kasir);

            $item->NamaPenerima =$users[$nomorPenerima]->NamaUser ?? '';
            $item->NamaMengetahui =$users[$nomorMengetahui]->NamaUser ?? '';
            $item->NamaKasir =$users[$nomorKasir]->NamaUser ?? '';
            $item->TtdPenerima =$users[$nomorPenerima]->FotoTtd ?? null;
            $item->TtdMengetahui =$users[$nomorMengetahui]->FotoTtd ?? null;
            $item->TtdKasir =$users[$nomorKasir]->FotoTtd ?? null;

            $item->Aksi = '';
            if ((int)$item->Status == 2 && in_array(trim($nomorUser), $adminKasir)) {
                $item->Aksi = 'KASIR';
            }

            // Prioritas 2: Mengetahui
            if ($item->Aksi == '' && trim($item->Mengetahui) == trim($nomorUser)) {
                switch ((int)$item->Status) {
                    case 1:
                        $item->Aksi = 'ACC';
                        break;

                    case 2:
                        $item->Aksi = 'PRINT';
                        break;

                    case 3:
                        $item->Aksi = 'SELESAI';
                        break;
                }
            }

            // Prioritas 3: Penerima
            if ($item->Aksi == '' && trim($item->Penerima) == trim($nomorUser)) {
                if ((int)$item->Status == 0) {
                    $item->Aksi = 'KIRIM';
                }
            }
        }

        $lastKode = DB::connection('ConnAccounting')
            ->table('T_BON_KAS')
            ->where('JenisBonKas', 'P')
            ->orderByDesc('KodeBonKas')
            ->value('KodeBonKas');

        if ($lastKode) {
            $lastNumber = (int) substr($lastKode, 3);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        $kodeBonKas = 'BKP' . str_pad( $nextNumber, 5, '0', STR_PAD_LEFT);

        $bonKasMerah = DB::connection('ConnAccounting')
            ->table('T_BON_KAS as BK')
            ->leftJoin('T_STATUS_BON_KAS as SBK', 'BK.Status', '=', 'SBK.KdStatus')
            ->select('BK.*', 'SBK.Status as NamaStatus')
            ->where('BK.JenisBonKas', 'M')
            ->where(function ($q) use ($nomorUser) {
                $q->where('BK.Penerima', $nomorUser)
                ->orWhere('BK.Mengetahui', $nomorUser)
                ->orWhere('BK.Kasir', $nomorUser);
            })
            ->orderByDesc('BK.Tanggal')
            ->orderByDesc('BK.KodeBonKas')
            ->get();

        return view('listBonKasPutih', compact('bonKas', 'listUser', 'kodeBonKas', 'bonKasMerah', 'isAdminKasir'));
    }

    public function listMerah(Request $request)
    {
        $nomorUser = Auth::user()->NomorUser;

        $query = DB::connection('ConnAccounting')
            ->table('T_BON_KAS as BK')
            ->leftJoin('T_STATUS_BON_KAS as SBK', 'BK.Status', '=', 'SBK.KdStatus')
            ->select('BK.*', 'SBK.Status as NamaStatus')
            ->where('BK.Status', '<>', 4)
            ->where('BK.JenisBonKas', 'M')
            ->where(function ($q) use ($nomorUser) {
                $q->where('BK.Penerima', $nomorUser)
                ->orWhere('BK.Mengetahui', $nomorUser)
                ->orWhere('BK.Kasir', $nomorUser);
            });

        if ($request->filled('keyword')) {
            $query->where(function ($q) use ($request) {
                $q->where(
                    'BK.KodeBonKas',
                    'like',
                    '%' . $request->keyword . '%'
                )
                ->orWhere(
                    'BK.Uraian',
                    'like',
                    '%' . $request->keyword . '%'
                );
            });
        }

        $bonKas = $query
            ->orderByDesc('BK.Tanggal')
            ->orderByDesc('BK.KodeBonKas')
            ->get();

        $userList = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->select(
                'NomorUser',
                'NamaUser',
                'FotoTtd'
            )
            ->get();

        $users = [];

        foreach ($userList as $user) {
            $users[trim($user->NomorUser)] = $user;
        }

        $listUser = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->select('NomorUser', 'NamaUser')
            ->where('IsActive', 1)
            ->orderBy('NamaUser')
            ->get();

        $adminKasir = DB::connection('ConnAccounting')
            ->table('T_ADMIN_BON_KAS')
            ->pluck('nomorUser_adm')
            ->map(fn($x) => trim($x))
            ->toArray();

        $isAdminKasir = in_array(trim(Auth::user()->NomorUser), $adminKasir);

        foreach ($bonKas as $item) {
            $nomorPenerima = trim((string) $item->Penerima);
            $nomorMengetahui = trim((string) $item->Mengetahui);
            $nomorKasir = trim((string) $item->Kasir);

            $item->NamaPenerima =$users[$nomorPenerima]->NamaUser ?? '';
            $item->NamaMengetahui =$users[$nomorMengetahui]->NamaUser ?? '';
            $item->NamaKasir =$users[$nomorKasir]->NamaUser ?? '';
            $item->TtdPenerima =$users[$nomorPenerima]->FotoTtd ?? null;
            $item->TtdMengetahui =$users[$nomorMengetahui]->FotoTtd ?? null;
            $item->TtdKasir =$users[$nomorKasir]->FotoTtd ?? null;

            $item->Aksi = '';
            // Prioritas 1: Kasir
            if ((int)$item->Status == 2 && in_array(trim($nomorUser), $adminKasir)) {
                $item->Aksi = 'KASIR';
            }

            // Prioritas 2: Mengetahui
            if ($item->Aksi == '' && trim($item->Mengetahui) == trim($nomorUser)) {
                if ((int)$item->Status == 1) {
                    $item->Aksi = 'ACC';
                } elseif ((int)$item->Status >= 2) {
                    $item->Aksi = 'PRINT';
                }
            }

            // Prioritas 3: Penerima
            if ($item->Aksi == '' && trim($item->Penerima) == trim($nomorUser)) {
                if ((int)$item->Status == 0) {
                    $item->Aksi = 'KIRIM';
                }
            }
        }

        $lastKode = DB::connection('ConnAccounting')
            ->table('T_BON_KAS')
            ->where('JenisBonKas', 'M')
            ->orderByDesc('KodeBonKas')
            ->value('KodeBonKas');

        if ($lastKode) {
            $lastNumber = (int) substr($lastKode, 3);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        $kodeBonKas = 'BKM' . str_pad( $nextNumber, 5, '0', STR_PAD_LEFT);

        return view('listBonKasMerah', compact('bonKas', 'listUser', 'kodeBonKas', 'isAdminKasir'));
    }

    public function bonKasPutih()
    {
        $lastKode = DB::connection('ConnAccounting')
            ->table('T_BON_KAS')
            ->where('JenisBonKas', 'P')
            ->max('KodeBonKas');

        if ($lastKode) {
            $nomor = (int) substr($lastKode, 5) + 1;
        } else {
            $nomor = 1;
        }

        $kodeBonKas = 'BKP' . str_pad($nomor, 5, '0', STR_PAD_LEFT);

        $listUser = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->select('NomorUser', 'NamaUser')
            ->where('IsActive', 1)
            ->orderBy('NamaUser')
            ->get();

        $adminKasir = DB::connection('ConnAccounting')
            ->table('T_ADMIN_BON_KAS')
            ->pluck('nomorUser_adm')
            ->map(fn($x) => trim($x))
            ->toArray();

        return view('bonKasPutih', [
            'user' => Auth::user(),
            'kodeBonKas' => $kodeBonKas,
            'listUser' => $listUser
        ]);
    }

    public function bonKasMerah()
    {
        $lastKode = DB::connection('ConnAccounting')
            ->table('T_BON_KAS')
            ->where('JenisBonKas', 'M')
            ->max('KodeBonKas');

        if ($lastKode) {
            $nomor = (int) substr($lastKode, 5) + 1;
        } else {
            $nomor = 1;
        }

        $kodeBonKas = 'BKM' . str_pad($nomor, 5, '0', STR_PAD_LEFT);

        $listUser = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->select('NomorUser', 'NamaUser')
            ->where('IsActive', 1)
            ->orderBy('NamaUser')
            ->get();

        $adminKasir = DB::connection('ConnAccounting')
            ->table('T_ADMIN_BON_KAS')
            ->pluck('nomorUser_adm')
            ->map(fn($x) => trim($x))
            ->toArray();

        return view('bonKasMerah', [
            'user' => Auth::user(),
            'kodeBonKas' => $kodeBonKas,
            'listUser' => $listUser
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $request->merge([
            'jumlah' => str_replace(',', '', $request->jumlah)
        ]);

        $request->validate([
            'tanggal'        => 'required|date',
            'jumlah'         => 'required|numeric|min:1',
            'uraian'         => 'required|string|max:1000',
            'NoPO'           => 'nullable|string|max:100',
            'dokumentasi.*'  => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'action'         => 'required|in:simpan,kirim',
            'Mengetahui'     => 'required_if:action,kirim',
            'TotalPenyesuaian' => 'nullable|numeric|min:0',
        ]);

        DB::connection('ConnAccounting')->beginTransaction();

        try {

            $jenis = $request->JenisBonKas;

            $prefix = $jenis == 'P' ? 'BKP' : 'BKM';

            $lastKode = DB::connection('ConnAccounting')
                ->table('T_BON_KAS')
                ->where('JenisBonKas', $jenis)
                ->max('KodeBonKas');

            if ($lastKode) {
                $nomor = (int) substr($lastKode, 5) + 1;
            } else {
                $nomor = 1;
            }

            $kodeBonKas = $prefix . str_pad($nomor, 5, '0', STR_PAD_LEFT);

            /*
            |--------------------------------------------------------------------------
            | Upload Dokumentasi
            |--------------------------------------------------------------------------
            */

            $dokumentasi = null;

            if ($request->hasFile('dokumentasi')) {
                $totalSize = 0;
                $base64Files = [];

                foreach ($request->file('dokumentasi') as $file) {
                    $totalSize += $file->getSize();
                    $mime = $file->getMimeType();
                    $base64Files[] =
                        'data:' . $mime .
                        ';base64,' .
                        base64_encode(file_get_contents($file));
                }

                if ($totalSize > (5 * 1024 * 1024)) {
                    DB::connection('ConnAccounting')->rollBack();
                    return back()
                        ->withInput()
                        ->withErrors([
                            'dokumentasi' => 'Total ukuran seluruh file maksimal 5 MB.'
                        ]);
                }

                // Jika memang menggunakan pemisah koma
                $dokumentasi = implode(',', $base64Files);
            }

            /*
            |--------------------------------------------------------------------------
            | Simpan Bon Kas
            |--------------------------------------------------------------------------
            */

            $isKirim = $request->action === 'kirim';
            $totalPenyesuaian = $request->filled('TotalPenyesuaian') ? $request->TotalPenyesuaian : null;


            DB::connection('ConnAccounting')
                ->table('T_BON_KAS')
                ->insert([
                    'KodeBonKas'   => $kodeBonKas,
                    'JenisBonKas'  => $jenis,
                    'Tanggal'      => $request->tanggal,
                    'Jumlah'       => $request->jumlah,
                    'Uraian'       => $request->uraian,
                    'Penerima'     => Auth::user()->NomorUser,
                    'Mengetahui'   => $isKirim ? $request->Mengetahui : null,
                    'Status'       => $isKirim ? 1 : 0,
                    'Kasir'        => null,
                    'CreatedAt'    => Carbon::now('Asia/Jakarta'),
                    'NoPO'         => $request->NoPO,
                    'Dokumentasi'  => $dokumentasi,
                    'TotalPenyesuaian' => $totalPenyesuaian,
                ]);

            if ($jenis == 'P' && $request->filled('KodeBonKasMerah')) {
                DB::connection('ConnAccounting')
                    ->table('T_BON_KAS')
                    ->whereIn('KodeBonKas', $request->KodeBonKasMerah)
                    ->update([
                        'KodeBonKas2' => $kodeBonKas
                    ]);
            }


            DB::connection('ConnAccounting')->commit();

            return redirect()
                ->route('bon-kas.index')
                ->with('successBonKas', [
                    'kode'   => $kodeBonKas,
                    'action' => $request->action
                ]);

        } catch (\Exception $e) {

            DB::connection('ConnAccounting')->rollBack();

            return back()
                ->withInput()
                ->with('error', $e->getMessage());
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'kirimBonKas') {

            $validator = Validator::make($request->all(), [
                'idBonKas'   => 'required|integer',
                'nomorUser'  => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first()
                ], 422);
            }

            DB::connection('ConnAccounting')->beginTransaction();

            try {

                $update = DB::connection('ConnAccounting')
                    ->table('T_BON_KAS')
                    ->where('IdBonKas', $request->idBonKas)
                    ->where('Penerima', Auth::user()->NomorUser)
                    ->update([
                        'Mengetahui' => $request->nomorUser,
                        'Status'     => 1,
                    ]);

                DB::connection('ConnAccounting')->commit();

                if (!$update) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Data tidak ditemukan atau tidak memiliki hak mengirim.'
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Bon Kas telah berhasil dikirim.'
                ]);

            } catch (\Exception $e) {

                DB::connection('ConnAccounting')->rollBack();

                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 500);
            }

        } else {

            return response()->json('Invalid request', 405);

        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        if ($request->action == 'kirimBonKas') {
            $validator = Validator::make($request->all(), [
                'nomorUser' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first()
                ], 422);
            }

            DB::connection('ConnAccounting')->beginTransaction();

            try {

                // Ambil data Bon Kas terlebih dahulu
                $bonKas = DB::connection('ConnAccounting')
                    ->table('T_BON_KAS')
                    ->select('KodeBonKas')
                    ->where('IdBonKas', $id)
                    ->where('Penerima', Auth::user()->NomorUser)
                    ->first();

                if (!$bonKas) {
                    DB::connection('ConnAccounting')->rollBack();

                    return response()->json([
                        'success' => false,
                        'message' => 'Data tidak ditemukan atau tidak memiliki hak mengirim.'
                    ]);
                }

                DB::connection('ConnAccounting')
                    ->table('T_BON_KAS')
                    ->where('IdBonKas', $id)
                    ->where('Penerima', Auth::user()->NomorUser)
                    ->update([
                        'Mengetahui' => $request->nomorUser,
                        'Status'     => 1,
                    ]);

                DB::connection('ConnAccounting')->commit();

                return response()->json([
                    'success' => true,
                    'message' => "Bon Kas {$bonKas->KodeBonKas} berhasil dikirim."
                ]);

            } catch (\Exception $e) {

                DB::connection('ConnAccounting')->rollBack();

                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 500);

            }
        }

        else if ($request->action == 'accBonKas') {
            DB::connection('ConnAccounting')->beginTransaction();

            try {

                $update = DB::connection('ConnAccounting')
                    ->table('T_BON_KAS')
                    ->where('IdBonKas', $id)
                    ->where('Mengetahui', Auth::user()->NomorUser)
                    ->where('Status', 1)
                    ->update([
                        'Status' => 2,
                        'TglAcc' => Carbon::now('Asia/Jakarta'),
                    ]);

                DB::connection('ConnAccounting')->commit();

                if (!$update) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Data tidak ditemukan atau sudah diproses.'
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Bon Kas berhasil di-ACC.'
                ]);

            } catch (\Exception $e) {

                DB::connection('ConnAccounting')->rollBack();

                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 500);

            }

        }

        else if ($request->action == 'cancelBonKas') {
            DB::connection('ConnAccounting')->beginTransaction();

            try {
                $update = DB::connection('ConnAccounting')
                    ->table('T_BON_KAS')
                    ->where('IdBonKas', $id)
                    ->update([
                        'Status'      => 0,
                        'Mengetahui'  => null,
                        'Kasir'       => null,
                        'TglAcc'      => null,
                        'TglKasir'    => null,
                    ]);

                DB::connection('ConnAccounting')->commit();

                if (!$update) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Data tidak ditemukan.'
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Bon Kas berhasil dibatalkan.'
                ]);

            } catch (\Exception $e) {
                DB::connection('ConnAccounting')->rollBack();
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 500);
            }
        }

        else if ($request->action == 'accKasir') {
            DB::connection('ConnAccounting')->beginTransaction();

            try {

                $adminKasir = DB::connection('ConnAccounting')
                    ->table('T_ADMIN_BON_KAS')
                    ->pluck('nomorUser_adm')
                    ->map(fn($x) => trim($x))
                    ->toArray();

                if (!in_array(trim(Auth::user()->NomorUser), $adminKasir)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Anda tidak memiliki hak melakukan ACC Kasir.'
                    ], 403);
                }

                $update = DB::connection('ConnAccounting')
                    ->table('T_BON_KAS')
                    ->where('IdBonKas', $id)
                    ->where('Status', 2)
                    ->update([
                        'Kasir' => Auth::user()->NomorUser,
                        'Status' => 3,
                        'TglKasir' => Carbon::now('Asia/Jakarta')
                    ]);

                DB::connection('ConnAccounting')->commit();

                if (!$update) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Data tidak ditemukan atau sudah diproses.'
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Bon Kas berhasil di-ACC Kasir.'
                ]);

            } catch (\Exception $e) {

                DB::connection('ConnAccounting')->rollBack();

                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 500);
            }
        }

        else if ($request->action == 'downloadDokumentasi') {

            // Ambil data Bon Kas
            $bonKas = DB::connection('ConnAccounting')
                ->table('T_BON_KAS')
                ->where('IdBonKas', $id)
                ->first();

            if (!$bonKas || empty($bonKas->Dokumentasi)) {
                abort(404, 'Dokumentasi tidak ditemukan.');
            }

            // Ambil data user yang diperlukan dari ConnEDP
            $userList = DB::connection('ConnEDP')
                ->table('UserMaster')
                ->select('NomorUser', 'NamaUser', 'FotoTtd')
                ->whereIn('NomorUser', [
                    trim($bonKas->Penerima),
                    trim($bonKas->Mengetahui),
                    trim($bonKas->Kasir)
                ])
                ->get();

            $users = [];

            foreach ($userList as $user) {
                $users[trim($user->NomorUser)] = $user;
            }

            $nomorPenerima   = trim((string) $bonKas->Penerima);
            $nomorMengetahui = trim((string) $bonKas->Mengetahui);
            $nomorKasir      = trim((string) $bonKas->Kasir);

            $bonKas->NamaPenerima   = $users[$nomorPenerima]->NamaUser ?? '';
            $bonKas->NamaMengetahui = $users[$nomorMengetahui]->NamaUser ?? '';
            $bonKas->NamaKasir      = $users[$nomorKasir]->NamaUser ?? '';

            $bonKas->TtdPenerima    = $users[$nomorPenerima]->FotoTtd ?? null;
            $bonKas->TtdMengetahui  = $users[$nomorMengetahui]->FotoTtd ?? null;
            $bonKas->TtdKasir       = $users[$nomorKasir]->FotoTtd ?? null;

            // Folder temporary
            $folder = storage_path('app/temp_bonkas');

            if (!file_exists($folder)) {
                mkdir($folder, 0777, true);
            }

            // Generate PDF Bon Kas
            $pdf = Pdf::loadView(
                'downloadBonKas',
                [
                    'bonKas' => $bonKas,
                    'terbilang' => $this->terbilang($bonKas->Jumlah)
                ]
            );

            $pdfPath = $folder . DIRECTORY_SEPARATOR . $bonKas->KodeBonKas . '.pdf';

            $pdf->save($pdfPath);

            // Ambil seluruh Data URI dokumentasi
            preg_match_all(
                '/data:(.*?);base64,([A-Za-z0-9+\/=\r\n]+)/',
                $bonKas->Dokumentasi,
                $matches,
                PREG_SET_ORDER
            );

            if (count($matches) == 0) {
                @unlink($pdfPath);
                abort(404, 'Dokumentasi tidak valid.');
            }

            $savedFiles = [];

            foreach ($matches as $index => $match) {

                $mime = $match[1];
                $data = base64_decode($match[2]);

                switch ($mime) {
                    case 'image/jpeg':
                        $ext = 'jpg';
                        break;

                    case 'image/png':
                        $ext = 'png';
                        break;

                    case 'application/pdf':
                        $ext = 'pdf';
                        break;

                    default:
                        $ext = 'bin';
                }

                $filename = $bonKas->KodeBonKas . '_' . ($index + 1) . '.' . $ext;

                $path = $folder . DIRECTORY_SEPARATOR . $filename;

                file_put_contents($path, $data);

                $savedFiles[] = $path;
            }

            // Buat ZIP
            $zipPath = $folder . DIRECTORY_SEPARATOR . $bonKas->KodeBonKas . '.zip';

            $zip = new ZipArchive();

            if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {

                @unlink($pdfPath);

                foreach ($savedFiles as $file) {
                    @unlink($file);
                }

                abort(500, 'Gagal membuat file ZIP.');
            }

            // Tambahkan PDF Bon Kas
            $zip->addFile(
                $pdfPath,
                $bonKas->KodeBonKas . '.pdf'
            );

            // Tambahkan dokumentasi
            foreach ($savedFiles as $file) {
                $zip->addFile($file, basename($file));
            }

            $zip->close();

            // Hapus file temporary
            @unlink($pdfPath);

            foreach ($savedFiles as $file) {
                @unlink($file);
            }

            return response()
                ->download($zipPath)
                ->deleteFileAfterSend(true);
        }

         else if ($request->action == 'deleteBonKas') {
            DB::connection('ConnAccounting')->beginTransaction();

            try {
                $update = DB::connection('ConnAccounting')
                    ->table('T_BON_KAS')
                    ->where('IdBonKas', $id)
                    ->update([
                        'Status' => 4
                    ]);

                DB::connection('ConnAccounting')->commit();

                if (!$update) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Data tidak ditemukan.'
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Bon Kas berhasil dihapus.'
                ]);

            } catch (\Exception $e) {
                DB::connection('ConnAccounting')->rollBack();

                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid request.'
        ], 400);
    }

    public function penyebut($nilai)
    {
        $nilai = abs(floor($nilai));

        $huruf = [
            "", "Satu", "Dua", "Tiga", "Empat",
            "Lima", "Enam", "Tujuh", "Delapan",
            "Sembilan", "Sepuluh", "Sebelas"
        ];

        if ($nilai < 12) {
            return $huruf[$nilai];
        } elseif ($nilai < 20) {
            return $this->penyebut($nilai - 10) . " Belas";
        } elseif ($nilai < 100) {
            return $this->penyebut(floor($nilai / 10)) . " Puluh" .
                ($nilai % 10 ? " " . $this->penyebut($nilai % 10) : "");
        } elseif ($nilai < 200) {
            return "Seratus" .
                ($nilai - 100 ? " " . $this->penyebut($nilai - 100) : "");
        } elseif ($nilai < 1000) {
            return $this->penyebut(floor($nilai / 100)) . " Ratus" .
                ($nilai % 100 ? " " . $this->penyebut($nilai % 100) : "");
        } elseif ($nilai < 2000) {
            return "Seribu" .
                ($nilai - 1000 ? " " . $this->penyebut($nilai - 1000) : "");
        } elseif ($nilai < 1000000) {
            return $this->penyebut(floor($nilai / 1000)) . " Ribu" .
                ($nilai % 1000 ? " " . $this->penyebut($nilai % 1000) : "");
        } elseif ($nilai < 1000000000) {
            return $this->penyebut(floor($nilai / 1000000)) . " Juta" .
                ($nilai % 1000000 ? " " . $this->penyebut($nilai % 1000000) : "");
        } elseif ($nilai < 1000000000000) {
            return $this->penyebut(floor($nilai / 1000000000)) . " Miliar" .
                ($nilai % 1000000000 ? " " . $this->penyebut($nilai % 1000000000) : "");
        } elseif ($nilai < 1000000000000000) {
            return $this->penyebut(floor($nilai / 1000000000000)) . " Triliun" .
                ($nilai % 1000000000000 ? " " . $this->penyebut($nilai % 1000000000000) : "");
        }

        return "";
    }

    public function terbilang($nilai)
    {
        return trim($this->penyebut($nilai)) . " Rupiah";
    }


    public function destroy($id)
    {
        //
    }
}
