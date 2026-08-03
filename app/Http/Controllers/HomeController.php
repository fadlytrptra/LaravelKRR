<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TransBL;
use App\User;
use DB;
use Carbon\Carbon;
use Auth;
use Illuminate\Support\Facades\Http;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // $AccessProgram=DB::connection('ConnEDP')->table('User_Fitur')->select('NamaProgram')->join('FiturMaster','Id_Fitur','IdFitur')->join('ProgramMaster','Id_Program','IdProgram')->groupBy('NamaProgram')->where('Id_User',Auth::user()->IDUser)->get();
        $AccessProgram = DB::connection('ConnEDP')->table('User_Fitur')
            ->select('NamaProgram', 'RouteProgram')
            ->join('FiturMaster', 'Id_Fitur', 'IdFitur')
            ->join('MenuMaster', 'Id_Menu', 'IdMenu')
            ->join('ProgramMaster', 'Id_Program', 'IdProgram')
            ->groupBy('NamaProgram', 'RouteProgram')
            ->where('Id_User', Auth::user()->IDUser)
            ->OrWhere('Id_User', 218)->get();
        // dd($AccessProgram);

        $now = Carbon::now('Asia/Jakarta');

        // ambil pengumuman yang belum expired
        $pengumuman = DB::connection('ConnEDP')
            ->table('Pengumuman')
            ->where('tgl_awal', '<=', $now)
            ->where('tgl_akhir', '>=', $now)
            ->orderByDesc('wkt_tulis')
            ->get();

        $users = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->select('NomorUser', 'NamaUser')
            ->orderBy('NamaUser')
            ->get();
        return view('home', compact('AccessProgram', 'pengumuman', 'users'));
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'tgl_akhir' => 'required|date',
            'judul_pesan' => 'required|max:100',
            'isi_pesan' => 'required'
        ]);

        // dd($request->all(), $lampiran);
        DB::connection('ConnEDP')->table('Pengumuman')->insert([
            'tgl_awal' => Carbon::today(),
            'tgl_akhir' => Carbon::parse($request->tgl_akhir)
                ->setTime(23, 59, 59)
                ->format('Y-m-d H:i:s'),
            'penulis' => Auth::user()->NamaUser,
            'wkt_tulis' => Carbon::now('Asia/Jakarta'),
            'judul_pesan' => strtoupper($request->judul_pesan),
            'isi_pesan' => $request->isi_pesan,
            'wa_pengumuman' => $request->grup_pengumuman == 1 ? 1 : 0,
            'wa_staff' => $request->grup_staff == 1 ? 1 : 0,
            'lampiran' => $request->lampiran,
        ]);

        if ($request->grup_pengumuman == 1) {
            $response = Http::withHeaders([
                'Authorization' => env('WA_TOKEN')
            ])->post('https://api.fonnte.com/send', [
                        'target' => '120363039436451185@g.us',
                        'message' => "*PENGUMUMAN*\n\n"
                            . strtoupper($request->judul_pesan)
                            . "\n\n"
                            . $request->isi_pesan
                            . ($request->lampiran !== null && $request->lampiran !== ''
                                ? "\n(Pengumuman ini memiliki lampiran yang dapat dilihat di website KRR)"
                                : "")
                            . "\n\nPenulis: "
                            . Auth::user()->NamaUser
                            . "\n\n_Pesan ini terkirim otomatis menggunakan website KRR_",
                    ]);
        }

        if ($request->grup_staff == 1) {
            $response = Http::withHeaders([
                'Authorization' => env('WA_TOKEN')
            ])->post('https://api.fonnte.com/send', [
                        'target' => '120363044087527441@g.us',
                        'message' => "*PENGUMUMAN*\n\n"
                            . strtoupper($request->judul_pesan)
                            . "\n\n"
                            . $request->isi_pesan
                            . ($request->lampiran !== null && $request->lampiran !== ''
                                ? "\n(Pengumuman ini memiliki lampiran yang dapat dilihat di website KRR)"
                                : "")
                            . "\n\nPenulis: "
                            . Auth::user()->NamaUser
                            . "\n\n_Pesan ini terkirim otomatis menggunakan website KRR_",
                    ]);
        }

        return back()->with('status', 'Pengumuman berhasil dibuat');
    }

    public function lampiran($id)
    {
        $data = DB::connection('ConnEDP')
            ->table('Pengumuman')
            ->where('id', $id)
            ->first();

        abort_if(!$data || empty($data->lampiran), 404);

        $lampiran = $data->lampiran;

        // Ambil mime type
        preg_match('/^data:(.*?);base64,/', $lampiran, $matches);
        $mime = $matches[1] ?? 'application/octet-stream';

        // Ambil isi base64 tanpa prefix
        $base64 = preg_replace('/^data:.*?;base64,/', '', $lampiran);

        return response(base64_decode($base64))
            ->header('Content-Type', $mime)
            ->header('Content-Disposition', 'inline');
    }

    public function Sales()
    {
        $result = (new HakAksesController)->HakAksesProgram('Sales');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        if ($result > 0) {
            return view('layouts.appSales', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Sales!');

        }
    }
    public function Beli()
    {
        $result = (new HakAksesController)->HakAksesProgram('Beli');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        if ($result > 0) {
            return view('layouts.appOrderPembelian', compact('access'));
        } else {
            // abort(403);
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Beli!');
        }
    }
    public function EDP()
    {
        $result = (new HakAksesController)->HakAksesProgram('EDP');
        $access = (new HakAksesController)->HakAksesFiturMaster('EDP');
        if ($result > 0) {
            return view('layouts.appEDP', compact('access'));
        } else {
            // abort(403);
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program EDP!');
        }
    }
    public function GPS()
    {
        $result = (new HakAksesController)->HakAksesProgram('Workshop');
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        if ($result > 0) {
            return view('layouts.appGPS', compact('access'));
        } else {
            // abort(403);
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses!');
        }
    }
    public function Workshop()
    {
        $result = (new HakAksesController)->HakAksesProgram('Workshop'); //belum diatur
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop'); //belum diatur
        if ($result > 0) {
            return view('layouts.appWorkshop', compact('access'));
        } else {
            // abort(403);
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Workshop!');
        }
    }
    public function Utility()
    {
        $result = (new HakAksesController)->HakAksesProgram('Utility');
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');
        // dd($result,$access);
        if ($result > 0) {
            return view('layouts.appUtility', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Utlity!');

        }
    }
    public function WovenBag()
    {
        $result = (new HakAksesController)->HakAksesProgram('Woven Bag');
        $access = (new HakAksesController)->HakAksesFiturMaster('Woven Bag');
        // dd($result,$access);
        if ($result > 0) {
            return view('layouts.appWovenBag', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Woven Bag!');

        }
    }
    public function JumboBag()
    {
        $result = (new HakAksesController)->HakAksesProgram('Jumbo Bag');
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        // dd($result,$access);
        if ($result > 0) {
            return view('layouts.appJumboBag', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Jumbo Bag!');
        }
    }
    function Accounting()
    {
        $result = (new HakAksesController)->HakAksesProgram('Accounting');
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        // dd($access);
        if ($result > 0) {
            return view('layouts.appAccounting', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Accounting!');
        }
    }

    public function Circular()
    {
        $result = (new HakAksesController)->HakAksesProgram('Circular');
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        if ($result > 0) {
            return view('Circular.home', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Circular!');
        }
    }
    public function CircularB()
    {
        $result = (new HakAksesController)->HakAksesProgram('Circular B');
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular B');
        if ($result > 0) {
            return view('CircularB.home', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Circular Gedung B!');
        }
    }
    public function CircularD()
    {
        $result = (new HakAksesController)->HakAksesProgram('Circular D');
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular D');
        if ($result > 0) {
            return view('CircularD.home', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Circular Gedung D!');
        }
    }
    public function Inventory()
    {
        $result = (new HakAksesController)->HakAksesProgram('Inventory');
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        if ($result > 0) {
            return view('layouts.appInventory', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Inventory!');
        }
    }

    public function ABM()
    {
        $result = (new HakAksesController)->HakAksesProgram('ABM');
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        if ($result > 0) {
            return view('layouts.appABM', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program ABM!');
        }
    }

    public function ADS()
    {
        $result = (new HakAksesController)->HakAksesProgram('AD Star');
        $access = (new HakAksesController)->HakAksesFiturMaster('AD Star');
        // $counterBrg = DB::connection('ConnPurchase')->table('YCOUNTER')->select('Y_BARANG')->get();
        // dd(intval($counterBrg[0]->Y_BARANG) + 1);
        if ($result) {
            return view('layouts.appAdStar', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Ad Star!');
        }
    }
    public function QC()
    {
        $result = (new HakAksesController)->HakAksesProgram('QC');
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        if ($result > 0) {
            return view('layouts.appQC', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program QC!');
        }
    }

    public function Guard()
    {
        $result = (new HakAksesController)->HakAksesProgram('Guard');
        $access = (new HakAksesController)->HakAksesFiturMaster('Guard');
        if ($result > 0) {
            return view('layouts.appGuard', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Guard!');
        }
    }

    public function QCInputAfalan()
    {
        $result = (new HakAksesController)->HakAksesProgram('QC');
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        if ($result > 0) {
            return view('layouts.appQC', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Contoh!');
        }
    }

    public function COA()
    {
        $result = (new HakAksesController)->HakAksesProgram('COA');
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        if ($result > 0) {
            return view('layouts.appCOA', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Contoh!');
        }
    }

    public function PDAM()
    {
        $result = (new HakAksesController)->HakAksesProgram('PDAM');
        $access = (new HakAksesController)->HakAksesFiturMaster('PDAM');
        if ($result > 0) {
            return view('layouts.appPDAM', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program PDAM!');
        }
    }

    public function Kencana()
    {
        $result = (new HakAksesController)->HakAksesProgram('Kencana');
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        if ($result > 0) {
            return view('layouts.appKencana', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Kencana!');
        }
    }
}
