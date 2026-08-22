<?php

namespace App\Http\Controllers\Kencana;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Spatie\Html\Facades\Form;
use App\Http\Controllers\HakAksesController;

class DeliveryOrderKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        $data = DB::connection('ConnKCNSales')->select('exec SP_1486_SLS_LIST_DO_BLM_ACC1');
        // dd($data);
        return view('Kencana.DeliveryOrder.Index', compact('data', 'access'));
    }

    // Show the form for creating a new resource.

    public function create()
    {
        $customer = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.DeliveryOrder.Create', compact('customer', 'access'));
    }

    public function getSuratPesanan($customer)
    {
        $suratPesanan = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SP_DO @IdCust = ?', [$customer]);
        return response()->json($suratPesanan);
    }

    // saat pilih customer, fungsi ini untuk cek apakah ada SP yang belum lunas
    public function getIdPesanan($nomor_sp)
    {
        if (strstr($nomor_sp, '.')) {
            $no_spValue = str_replace('.', '/', $nomor_sp);
            $idPesanan = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_TYPE_DO1 @IDSuratPesanan = ?, @Kode = ?', [$no_spValue, 1]);
        } else {
            $no_spValue = $nomor_sp;
            $idPesanan = DB::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_TYPE_DO1 @IDSuratPesanan = ?', [$no_spValue]);
        }
        return response()->json($idPesanan);
    }

    public function getBarang($idPesanan)
    {
        if (strstr($idPesanan, '.Ekspor')) {
            $idPesananValue = str_replace('.Ekspor','',$idPesanan);
            $data = db::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SALDO_TYPE_DO1 @IDPesanan = ?, @Kode = ?', [$idPesananValue, 1]);
        } else {
            $data = db::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_SALDO_TYPE_DO1 @IDPesanan = ?', [$idPesanan]);
        }
        return response()->json($data);
    }
    public function getKelompokUtama($kodeBarang)
    {
        $data = DB::connection('ConnInventory')->select(
            'SELECT DISTINCT
                T.IdType,
                T.NamaType,
                KU.IdKelompokUtama,
                KU.NamaKelompokUtama
            FROM dbo.Type T
            INNER JOIN dbo.Subkelompok S
                ON RTRIM(T.IdSubkelompok_Type) = RTRIM(S.IdSubkelompok)
            INNER JOIN dbo.Kelompok K
                ON RTRIM(S.IdKelompok_Subkelompok) = RTRIM(K.IdKelompok)
            INNER JOIN dbo.KelompokUtama KU
                ON RTRIM(K.IdKelompokUtama_Kelompok) = RTRIM(KU.IdKelompokUtama)
            WHERE RTRIM(T.KodeBarang) = RTRIM(?)',
            [$kodeBarang]
        );

        return response()->json($data);
    }
    public function getKelompok($kelompokUtama, $kodeBarang)
    {
        $data = DB::connection('ConnInventory')->select(
            'SELECT DISTINCT
                K.IdKelompok,
                K.NamaKelompok
            FROM dbo.Type T
            INNER JOIN dbo.Subkelompok S
                ON RTRIM(T.IdSubkelompok_Type) = RTRIM(S.IdSubkelompok)
            INNER JOIN dbo.Kelompok K
                ON RTRIM(S.IdKelompok_Subkelompok) = RTRIM(K.IdKelompok)
            WHERE RTRIM(T.KodeBarang) = RTRIM(?)
            AND RTRIM(K.IdKelompokUtama_Kelompok) = RTRIM(?)',
            [$kodeBarang, $kelompokUtama]
        );

        return response()->json($data);
    }
    public function getSubKelompok($kelompok, $kodeBarang)
    {
        $data = DB::connection('ConnInventory')->select(
            'SELECT DISTINCT
                S.IdSubkelompok,
                S.NamaSubKelompok
            FROM dbo.Type T
            INNER JOIN dbo.Subkelompok S
                ON RTRIM(T.IdSubkelompok_Type) = RTRIM(S.IdSubkelompok)
            INNER JOIN dbo.Kelompok K
                ON RTRIM(S.IdKelompok_Subkelompok) = RTRIM(K.IdKelompok)
            WHERE RTRIM(T.KodeBarang) = RTRIM(?)
            AND RTRIM(K.IdKelompok) = RTRIM(?)',
            [$kodeBarang, $kelompok]
        );

        return response()->json($data);
    }
    public function getSaldo($subKelompok, $kodeBarang)
    {
        $data = DB::connection('ConnInventory')->select(
            'SELECT
                IdType,
                NamaType,
                KodeBarang,
                IdSubkelompok_Type
            FROM dbo.Type
            WHERE RTRIM(KodeBarang) = RTRIM(?)
            AND RTRIM(IdSubkelompok_Type) = RTRIM(?)',
            [
                $kodeBarang,
                $subKelompok
            ]
        );

        return response()->json($data);
    }
    public function getNomorDeliveryOrder()
    {
        $data = db::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_DO_BLM_ACC1');
        return response()->json($data);
    }
    public function indexInputPEB(){

    }
    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $MyType = 1;

        $Tanggal = $request->input('tgl_do');
        $IDPesanan = $request->input('id_pesanan');

        $QtyPrimer = $request->input('qty_primer');
        $QtySekunder = $request->input('qty_sekunder');
        $QtyTritier = $request->input('qty_tritier');

        $MaxKirim = $request->input('max_kirim');
        $MinKirim = $request->input('min_kirim');

        if ($MinKirim === null || $MinKirim < 0.1) {
            $MinKirim = 0.1;
        }

        $AlamatKirim = $request->input('alamat_kirim');
        $KotaKirim = $request->input('kota_kirim');
        $IdType = $request->input('id_typeBarang');

        // Cek IDPesanan sebelum masuk SP
        if (empty($IDPesanan)) {
            return redirect()->back()->with(
                'error',
                'ID Pesanan tidak boleh kosong.'
            );
        }

        DB::connection('ConnKCNSales')->statement(
            'EXEC SP_1273_PRG_MAINT_DO1
                @MyType = ?,
                @Tanggal = ?,
                @IDPesanan = ?,
                @QtyPrimer = ?,
                @QtySekunder = ?,
                @QtyTritier = ?,
                @MaxKirim = ?,
                @MinKirim = ?,
                @AlamatKirim = ?,
                @KotaKirim = ?,
                @IdType = ?',
            [
                $MyType,
                $Tanggal,
                $IDPesanan,
                $QtyPrimer,
                $QtySekunder,
                $QtyTritier,
                $MaxKirim,
                $MinKirim,
                $AlamatKirim,
                $KotaKirim,
                $IdType
            ]
        );

        return redirect()->back()->with(
            'success',
            'Delivery Order Sudah Disimpan!'
        );
    }

    //Display the specified resource.

    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.

    public function edit($id)
    {
        // $customer = DB::connection('sqlsrv2')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        $detail = db::connection('ConnKCNSales')->select('exec SP_1273_PRG_LIST_DETAIL_DO1 @IDDO = ?', [$id]);
        // $data = [$customer,$detail];
        // dd($data);
        return response()->json($detail);
        // return view('Sales.Transaksi.DeliveryOrder.Edit', compact('data', 'customer'));
    }

    //Update the specified resource in storage.

    public function update($id, Request $request)
    {
        // $data = $request->all();
        // dd($request->all());
        $MyType = 2;
        $Tanggal = $request->tgl_do;
        $IDPesanan = $request->id_pesanan;
        $QtyPrimer = $request->qty_primer;
        $QtySekunder = $request->qty_sekunder;
        $QtyTritier = $request->qty_tritier;
        $MaxKirim = $request->max_kirim;
        $MinKirim = $request->min_kirim;
        $AlamatKirim = $request->alamat_kirim;
        $KotaKirim = $request->kota_kirim;
        $IdType = $request->id_typeBarang;
        $IdDO = $id;
        DB::connection('ConnKCNSales')->statement('exec SP_1273_PRG_MAINT_DO1 @MyType = ?,
        @IdDO = ?,
        @Tanggal = ?,
        @IDPesanan = ?,
        @QtyPrimer = ?,
        @QtySekunder = ?,
        @QtyTritier = ?,
        @MaxKirim = ?,
        @MinKirim = ?,
        @AlamatKirim = ?,
        @KotaKirim = ?,
        @IdType = ?',
            [
                $MyType,
                $IdDO,
                $Tanggal,
                $IDPesanan,
                $QtyPrimer,
                $QtySekunder,
                $QtyTritier,
                $MaxKirim,
                $MinKirim,
                $AlamatKirim,
                $KotaKirim,
                $IdType
            ]
        );
        // echo "<script type='text/javascript'>alert('Data Berhasil diubah') ;</script>";
        // echo "<script type='text/javascript'>window.close();</script>";
        return redirect()->back()->with('success', 'Delivery Order Sudah Diubah!');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        // dd("DELETE");
        DB::connection('ConnKCNSales')->statement('exec SP_1273_PRG_MAINT_DO1 @MyType = ?, @IdDO = ? ', [3, $id]);
        // return redirect()->route('DeliveryOrder.index');
        return redirect()->back()->with('success', 'Delivery Order Sudah Dihapus!');
    }
}
