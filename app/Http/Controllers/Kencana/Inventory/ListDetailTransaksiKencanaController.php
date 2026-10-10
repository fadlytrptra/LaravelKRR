<?php

namespace App\Http\Controllers\Kencana\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class ListDetailTransaksiKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Inventory.ListDetailTransaksi', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        // get list
        if ($id === 'getListDetail') {
            $idtype = $request->input('idtype');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_INV_4372_List_Detail_Kartu_Stok
            @idtype = ?',
                [$idtype]
            );

            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    // \Carbon\Carbon::parse($detail_subkel->SaatLog)->format('m/d/Y'),
                    'IdTransaksi' => $detail_subkel->IdTransaksi,
                    'SaatLog' => $detail_subkel->SaatLog,
                    'SaatAwalTransaksi' => $detail_subkel->SaatAwalTransaksi,
                    'TypeTransaksi' => $detail_subkel->TypeTransaksi,
                    'nama_penerima' => $detail_subkel->nama_penerima,
                    'nama_pemberi' => $detail_subkel->nama_pemberi,
                    'JumlahPemasukanPrimer' => $detail_subkel->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_subkel->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_subkel->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $detail_subkel->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_subkel->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_subkel->JumlahPengeluaranTritier,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'IdType' => $detail_subkel->IdType

                ];
            }
            $data_subkel = collect($data_subkel)->sortBy('IdTransaksi')->values()->all();
            return response()->json($data_subkel);
        }

        // get by date
        else if ($id === 'getListDataByDate') {
            $id_brg = $request->input('id_brg');
            $id_subkel = $request->input('id_subkel');
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_INV_4372_List_Detail_Kartu_Stok
            @kode = ?, @id_brg = ?, @id_subkel = ?, @tgl_awal = ?, @tgl_akhir = ?',
                [1, $id_brg, $id_subkel, $tgl_awal, $tgl_akhir]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdTransaksi' => $detail_subkel->IdTransaksi,
                    'SaatLog' => $detail_subkel->SaatLog,
                    'SaatAwalTransaksi' => $detail_subkel->SaatAwalTransaksi,
                    'TypeTransaksi' => $detail_subkel->TypeTransaksi,
                    'nama_penerima' => $detail_subkel->nama_penerima,
                    'nama_pemberi' => $detail_subkel->nama_pemberi,
                    'JumlahPemasukanPrimer' => $detail_subkel->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_subkel->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_subkel->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $detail_subkel->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_subkel->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_subkel->JumlahPengeluaranTritier,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'IdType' => $detail_subkel->IdType

                ];
            }
            $data_subkel = collect($data_subkel)->sortBy('IdTransaksi')->values()->all();
            return response()->json($data_subkel);
        }

        // get saldo
        else if ($id === 'getSaldoBarang') {
            $IdType = $request->input('IdType');

            $subkel = DB::connection('ConnKCNInventory')->select('exec SP_1003_INV_Saldo_Barang
            @IdType = ?',
                [$IdType]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'NamaType' => $detail_subkel->NamaType,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'SatPrimer' => $detail_subkel->SatPrimer,
                    'SatSekunder' => $detail_subkel->SatSekunder,
                    'SatTritier' => $detail_subkel->SatTritier,
                    'PakaiAturanKonversi' => $detail_subkel->PakaiAturanKonversi,
                    'KonvSekunderKePrimer' => $detail_subkel->KonvSekunderKePrimer,
                    'KonvTritierKeSekunder' => $detail_subkel->KonvTritierKeSekunder,
                    'MinimumStock' => $detail_subkel->MinimumStock,
                    'MaximumStock' => $detail_subkel->MaximumStock,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'PIB' => $detail_subkel->PIB
                ];
            }
            return response()->json($data_subkel);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        //
    }
}
