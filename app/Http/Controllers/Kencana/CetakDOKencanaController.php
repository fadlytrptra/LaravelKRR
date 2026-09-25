<?php

namespace App\Http\Controllers\Kencana;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

use PDF;

class CetakDOKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.DeliveryOrder.CetakDO', compact('access'));
    }

    public function getDeliveryOrderSudahACC($tanggal)
    {
        $list_do = DB::connection('ConnKCNSales')
            ->table('VW_PRG_4496_SLS_DO_INV1 as V')
            ->leftJoin('T_Customer as C', 'V.NamaCust', '=', 'C.NamaCust')
            ->whereDate('V.TglDO', $tanggal)
            ->select(
                'V.*',
                'C.JnsCust as JenisCustomer'
            )
            ->get();

        return response()->json($list_do);
    }

    public function getDeliveryOrderBelumACC($tanggal)
    {
        $list_do = DB::connection('ConnKCNSales')->select('SELECT * FROM VW_PRG_1486_SLS_CETAK_DO_BLMACC1 WHERE (TglDO = \'' . $tanggal . '\')');
        return response()->json($list_do);
    }

    public function getDeliveryOrderAll($tanggal)
    {
        $list_do = DB::connection('ConnKCNSales')->table('T_HeaderPesanan as HP')
            ->leftJoin('T_JnsSuratPesanan as JSP', function ($join) {
                $join->on('JSP.IDJnsSuratPesanan','=','HP.IDJnsSuratPesanan');
            })
            ->leftJoin('T_DetailPesanan as DP', function ($join) {
                $join->on('DP.IDSuratPesanan','=','HP.IDSuratPesanan');
            })
            ->leftJoin('T_DeliveryOrder as DO', function ($join) {
                $join->on('DP.IDPesanan','=','DO.IDPesanan');
            })
            ->leftJoin('T_Customer as C', function ($join) {
                $join->on('HP.IDCust','=','C.IDCust');
            })
            ->join('VW_INV_1273_SLS_BARANG_1 as BRG', function ($join) {
                $join->on('BRG.IDBarang','=','DO.IdType');
            })
            ->leftJoin('VW_PRG_4496_POSISI_SP_LOKAL as POS', function ($join) {
                $join->on('HP.IDSuratPesanan','=','POS.NO_SP')->on('DP.IDBarang','=','POS.IDBarangPesanan');
            })
            ->join(
                DB::raw('KCN_PURCHASE.dbo.Y_BARANG_DETAIL_BRT_STD as BRT'),
                function ($join) {
                    $join->on('DP.IDBarang','=','BRT.KD_BRG');
                }
            )

            ->whereDate('DO.tanggal', $tanggal)
            ->whereNull('DO.KetBatal')
            ->select(
                'HP.IDSuratPesanan',
                'C.NamaCust',
                'HP.NO_PO',
                'HP.Tgl_PO',
                'DO.MaxKirimDO',
                'DO.MinKirimDO',
                'DP.Satuan as SatuanJual',
                'DP.IDBarang',
                'DO.tanggal as TglDO',
                'C.AlamatKirim',
                'C.Alamat',
                'C.Kota',
                'DO.IdTransTmp',
                'JSP.JnsSuratPesanan',
                'DO.Vessel',
                'DO.ETD',
                'DO.CC',
                'BRG.NamaBarang',
                'BRG.Corak',
                'BRG.NamaKelompok',
                'DO.AlamatKirim as Keterangan',
                'POS.SaldoTritier',
                'POS.SaldoSekunder',
                'POS.SaldoPrimer',
                'POS.satPrimer',
                'POS.satSekunder',
                'POS.satTritier',
                'BRT.BERAT_TOTAL',
                'C.JnsCust as JenisCustomer',
                'DO.TglAccManager'
            )

            ->orderBy('DO.IdTransTmp')
            ->get();

        return response()->json($list_do);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {

    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update($id)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
