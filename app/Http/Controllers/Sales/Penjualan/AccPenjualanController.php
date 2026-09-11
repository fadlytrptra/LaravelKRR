<?php

namespace App\Http\Controllers\Sales\Penjualan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class AccPenjualanController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $user = Auth::user()->NomorUser;
        $data = db::connection('ConnInventory')->select('exec SP_1273_INV_ListJual_TmpTransaksi @User = ?', [$user]);
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        // dd($data, $user);
        return view('Sales.Penjualan.AccPenjualan', compact('data', 'access'));
    }

    public function accPenjualanTampilData($idtransaksi)
    {
        $user = Auth::user()->NomorUser;
        $data = db::connection('ConnInventory')->select('exec SP_1273_INV_ListJual_TmpTransaksi @User = ?, @IDTransaksi = ?', [$user, $idtransaksi]);
        return response()->json($data);
    }

    public function accPenjualanTampilBarcode($idtype, $kodebarang)
    {
        $data = db::connection('ConnInventory')->select('exec SP_1273_INV_AMBIL_TMPGUDANG_ACCKELUAR @idtype = ?, @kode_barang = ?', [$idtype, $kodebarang]);
        return response()->json($data);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        // dd($request->all());

        $idtype = $request->id_type;
        $penyesuaian = db::connection('ConnInventory')->select('exec SP_1003_INV_check_penyesuaian_transaksi @idtype = ?, @idtypetransaksi = ?', [$idtype, '06']);
        // dd($penyesuaian);
        if ($penyesuaian[0]->jumlah > 0) {
            return redirect()->back()->with('error', 'Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk Type' . $idtype);
        }

        $idtransaksi = $request->id_transaksi;
        $user = Auth::user()->NomorUser;
        $saldo_primerDikeluarkan = $request->saldo_primerDikeluarkan;
        $saldo_sekunderDikeluarkan = $request->saldo_sekunderDikeluarkan;
        $saldo_tritierDikeluarkan = $request->saldo_tritierDikeluarkan;
        $jumlah_konversi = $request->jumlah_konversi;
        $no_sp = $request->no_sp;
        $kodebarang = $request->kodebarang;
        $noindeks = explode(',', $request->noindeks);
        // dd($noindeks);

        db::connection('ConnInventory')->statement('exec SP_1003_INV_PROSES_ACC_JUAL_BARCODE
        @IDtransaksi = ' . $idtransaksi . ',
        @IDPemberi = ' . $user . ',
        @JumlahKeluarPrimer = ' . $saldo_primerDikeluarkan . ',
        @JumlahKeluarSekunder = ' . $saldo_sekunderDikeluarkan . ',
        @JumlahKeluarTritier = ' . $saldo_tritierDikeluarkan . ',
        @JumlahKonversi = ' . $jumlah_konversi . ',
        @NoSP = \'' . $no_sp . '\''
        );

        $counter = db::connection('ConnInventory')->select('exec SP_1003_BCD_Ambil_COUNTER_SALES');

        //proses update barcode yang dicentang

        for ($i = 0; $i < count($noindeks); $i++) {
            db::connection('ConnInventory')->statement('exec SP_1273_INV_Update_Penjualan
            @kode_barang = \'' . $kodebarang . '\',
            @item_number = \'' . $noindeks[$i] . '\',
            @XIdTransTmp = \'' . $idtransaksi . '\'');
            // dd($noindeks[$i]);
        }

        db::connection('ConnInventory')->statement('exec SP_1273_INV_Update_Dispresiasi_Penjualan
        @XIdTransTmp = \'' . $idtransaksi . '\',
        @idtransaksi_inv = \'' . trim($counter[0]->IdTransaksi_Inv_Bcd_Pjl) . '\',
        @idtype = \'' . $idtype . '\',
        @NoSP = \'' . $no_sp . '\''
        );

        $noindeksAll = implode(', ', $noindeks);
        return redirect()->back()->with('success', 'Barcode Penjualan dengan Kode Barang ' . $kodebarang . ' dan Nomor Indeks ' . $noindeksAll . ' Sudah Disetujui !');
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
    public function destroy($kodebarang, $noindeks)
    {
        // dd('masuk destroy');
        db::connection('ConnIventory')->statement('exec SP_1273_INV_Hapus_Barcode_Tmp_Gudang @kode_barang = ?, @item_number = ?', [$kodebarang, $noindeks]);
        return redirect()->back()->with('success', 'Kode Barang ' . $kodebarang . 'dengan Nomor Indeks ' . $noindeks . 'Sudah Dihapus!');
    }
}
