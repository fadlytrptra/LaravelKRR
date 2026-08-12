<?php

namespace App\Http\Controllers\Beli\Transaksi;

use Illuminate\Http\Request;
use App\Models\Beli\TransBL;
use App\User;
use App\UserDiv;
use Auth;
use Carbon\Carbon;
use DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class ListOrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $date = Carbon::now()->format('Y-m-d');
        $idUser = trim(Auth::user()->NomorUser);
        $dataDiv = DB::connection('ConnPurchase')->select('exec spSelect_UserDivisi_dotNet @Operator = ' . rtrim($idUser) . '');
        $kategoriUtama = DB::connection('ConnPurchase')->select('exec spSelect_HirarkiTypeBarang_dotNet @MyType = ?', [1]);
        $satuanList = DB::connection('ConnPurchase')->select('exec sp_list_stri');

        $firstDivisi = UserDiv::select()->where('Kd_user', rtrim($idUser))->first();
        if ($firstDivisi !== null) {
            $data = TransBL::select()
                ->leftjoin('Y_BARANG', 'Y_BARANG.KD_BRG', 'YTRANSBL.Kd_brg')
                ->leftjoin('YSATUAN', 'YSATUAN.No_satuan', 'YTRANSBL.NoSatuan')
                ->leftjoin('STATUS_ORDER', 'STATUS_ORDER.KdStatus', 'YTRANSBL.StatusOrder')
                ->where('YTRANSBL.Kd_div', $firstDivisi['Kd_div'])
                ->where('YTRANSBL.Tgl_order', '=', $date)
                ->get();
            return view('Beli.Transaksi.ListOrder.List', compact('data', 'dataDiv', 'access', 'idUser', 'kategoriUtama', 'satuanList'));
        } else {
            return redirect('Beli')->with('status', (string) 'User anda: ' . $idUser . ' Belum terdaftar pada divisi manapun, silahkan hubungi EDP!');
        }
    }

    public function show($id)
    {
        if ($id != null) {
            try {
                $data = DB::connection('ConnPurchase')->select('exec SpSelect_Detail_Permohonan_dotNet @No_Trans = ?', [$id]);
                return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
        ;
    }

    public function filter($divisi, $tglAwal, $tglAkhir, $Me)
    {
        if ($Me == "true") {
            $data = TransBL::select([
                'YTRANSBL.No_trans',
                'YTRANSBL.Tgl_order',
                'YTRANSBL.Kd_brg',
                'Y_BARANG.NAMA_BRG',
                'YTRANSBL.Qty',
                'YSATUAN.Nama_satuan',
                'STATUS_ORDER.Status',
                'YUSER.Nama',
                'YTRANSBL.Kd_div',
                'YTRANSBL.Ket_Internal',
                'YTRANSBL.keterangan'
            ])
                ->leftjoin('Y_BARANG', 'Y_BARANG.KD_BRG', 'YTRANSBL.Kd_brg')
                ->leftjoin('YUSER', 'YUSER.kd_user', 'YTRANSBL.Operator')
                ->leftjoin('YSATUAN', 'YSATUAN.No_satuan', 'YTRANSBL.NoSatuan')
                ->leftjoin('STATUS_ORDER', 'STATUS_ORDER.KdStatus', 'YTRANSBL.StatusOrder')
                ->where('YTRANSBL.Kd_div', $divisi)
                ->where('YTRANSBL.Tgl_order', '>=', $tglAwal)
                ->where('YTRANSBL.Tgl_order', '<=', $tglAkhir)
                ->where('YTRANSBL.Operator', trim(Auth::user()->NomorUser))
                ->get();
        } else {
            $data = TransBL::select([
                'YTRANSBL.No_trans',
                'YTRANSBL.Tgl_order',
                'YTRANSBL.Kd_brg',
                'Y_BARANG.NAMA_BRG',
                'YTRANSBL.Qty',
                'YSATUAN.Nama_satuan',
                'STATUS_ORDER.Status',
                'YUSER.Nama',
                'YTRANSBL.Kd_div',
                'YTRANSBL.Ket_Internal',
                'YTRANSBL.keterangan'
            ])
                ->leftJoin('Y_BARANG', 'Y_BARANG.KD_BRG', '=', 'YTRANSBL.Kd_brg')
                ->leftJoin('YUSER', 'YUSER.kd_user', '=', 'YTRANSBL.Operator')
                ->leftJoin('YSATUAN', 'YSATUAN.No_satuan', '=', 'YTRANSBL.NoSatuan')
                ->leftJoin('STATUS_ORDER', 'STATUS_ORDER.KdStatus', '=', 'YTRANSBL.StatusOrder')
                ->where('YTRANSBL.Kd_div', $divisi)
                ->whereBetween('YTRANSBL.Tgl_order', [$tglAwal, $tglAkhir])
                ->get();
        }

        return compact('data');
    }


}
