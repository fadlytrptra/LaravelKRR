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

class ApproveController extends Controller
{
    public function index()
    {
        $kd = 2;
        $operator = trim(Auth::user()->NomorUser);
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $result = (new HakAksesController)->HakAksesFitur('Approve');
        if ($result > 0) {
            $data = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @Operator=?', [$kd, $operator]);
            // dd($data);
            return view('Beli.Transaksi.Approve.List', compact('data', 'access'));
        } else {
            abort(403);
        }
    }

    public function store(Request $request)
    {
        $Checked = $request->input('checkedBOX');
        $date = new DateTime('now', new DateTimeZone('Asia/Jakarta'));
        $date->format('Y-m-d H:i:s');
        if (empty($Checked)) {
            echo 'kosong';
            return back()->with('danger', 'Gagal Approve/Reject, Karena Tidak Ada Data yang Dipilih');
        }
        switch ($request->input('action')) {
            case 'Approve':
                foreach ($Checked as $item) {
                    TransBL::where('No_trans', $item)->update(['Tgl_acc' => $date, 'Manager' => trim(Auth::user()->NomorUser), 'StatusOrder' => '2']);
                }
                return back();

            case 'Reject':
                foreach ($Checked as $item) {
                    TransBL::where('No_trans', $item)->update(['Tgl_Batal_acc' => $date, 'Batal_acc' => trim(Auth::user()->NomorUser), 'StatusOrder' => '0']);
                }
                return back();
        }
    }

    public function show($id)
    {
        $data = TransBL::select('Y_KATEGORI_UTAMA.nama as KatUtama', 'Y_KATEGORY.nama_kategori as kategori', 'Y_KATEGORI_SUB.nama_sub_kategori as SubKat', 'Y_BARANG.NAMA_BRG as NamaBarang', 'Qty', 'Nama_satuan', 'Pemesan', 'YUSER.Nama as User', 'StatusBeli', 'Tgl_Dibutuhkan', 'Ket_Internal', 'keterangan', 'Kd_div')
            ->leftJoin('Y_BARANG', 'Y_BARANG.KD_BRG', 'YTRANSBL.Kd_brg')
            ->leftJoin('YUSER', 'YUSER.kd_user', 'YTRANSBL.Operator')
            ->leftJoin('YSATUAN','YSATUAN.No_satuan','YTRANSBL.NoSatuan')
            ->leftJoin('STATUS_ORDER','STATUS_ORDER.KdStatus','YTRANSBL.StatusOrder')
            ->leftJoin('Y_KATEGORI_SUB','Y_KATEGORI_SUB.no_sub_kategori','Y_BARANG.NO_SUB_KATEGORI')
            ->leftJoin('Y_KATEGORY','Y_KATEGORY.no_kategori','Y_KATEGORI_SUB.no_kategori')
            ->leftJoin('Y_KATEGORI_UTAMA','Y_KATEGORI_UTAMA.no_kat_utama','Y_KATEGORY.no_kat_utama')
            ->where('No_trans', $id)
            ->first();

        $getKD_Barang = TransBL::select('Kd_brg')->where('No_trans', $id)->first();

        $dataBeliTerakhir = TransBL::select()
            ->leftJoin('YSUPPLIER', 'YSUPPLIER.NO_SUP', '=', 'YTRANSBL.supplier')
            ->where('Kd_brg', $getKD_Barang->Kd_brg)
            ->whereIn('StatusOrder', [4, 5, 8, 10, 11])
            ->orderBy('No_trans', 'desc')
            ->limit(1)
            ->get();

        $dataBeliTerakhir->transform(function ($item) {
            if (!empty($item->DokumentasiFile)) {
                $item->DokumentasiFile = base64_encode($item->DokumentasiFile);
            }

            return $item;
        });

        $dataBeliTerakhir = TransBL::select()
            ->leftJoin(
                'YSUPPLIER',
                'YSUPPLIER.NO_SUP',
                'YTRANSBL.supplier'
            )
            ->where('Kd_brg', $getKD_Barang->Kd_brg)
            ->whereIn('StatusOrder', [4, 5, 8, 10, 11])
            ->orderBy('No_trans', 'desc')
            ->offset(0)
            ->limit(1)
            ->get();


        // ============================================
        // AMBIL FOTO BARANG
        // ============================================

        $fotoBarang = DB::connection('ConnPurchase')
            ->table('Y_FOTO')
            ->select('FOTO')
            ->where('KD_BARANG', $getKD_Barang->Kd_brg)
            ->first();

        $fotoBase64 = null;

        if ($fotoBarang && !empty($fotoBarang->FOTO)) {
            $binary = $fotoBarang->FOTO;

            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->buffer($binary);

            $fotoBase64 =
                'data:' .
                $mimeType .
                ';base64,' .
                base64_encode($binary);
        }


        return compact(
            'data',
            'dataBeliTerakhir',
            'getKD_Barang',
            'fotoBase64'
        );
    }

    public function update(Request $request, $id)
    {
        switch ($request->input('action')) {
            case 'Approve':
                $date = new DateTime('now', new DateTimeZone('Asia/Jakarta'));
                $date->format('Y-m-d H:i:s');
                TransBL::where('No_trans', $id)->update(['Tgl_acc' => $date, 'Manager' => trim(Auth::user()->NomorUser), 'StatusOrder' => '2']);
                return back();

            case 'Reject':
                $date = new DateTime('now', new DateTimeZone('Asia/Jakarta'));
                $date->format('Y-m-d H:i:s');
                TransBL::where('No_trans', $id)->update(['Tgl_Batal_acc' => $date, 'Batal_acc' => trim(Auth::user()->NomorUser), 'StatusOrder' => '0']);
                return back();
        }
    }

    // public function destroy($id)
    // {
    //     $HapusBarang = Barang::find($id);
    //     $HapusBarang->status = "Dihapus";
    //     $HapusBarang->save();



    //     return back();
    // }
}
