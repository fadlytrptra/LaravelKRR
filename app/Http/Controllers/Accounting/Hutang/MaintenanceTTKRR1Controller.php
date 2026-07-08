<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceTTKRR1Controller extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.MaintenanceTTKRR1', compact('access'));
    }

    public function getSupplierTTKRR1()
    {
        $supplier = DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_SUPPLIER]');
        return response()->json($supplier);
    }

    public function getTabelListDetailBrg($idSupplier)
    {
        $supplier = DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_BKK1_DETAILBRG] @IdSupplier = ?', [$idSupplier]);
        return response()->json($supplier);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        // Assign all $request->input values to variables
        $ListPO = $request->input('rowDataArray', []);
        $terbilang = $request->input('terbilang');
        $TIDPenagihan = $request->input('id_penagihan');
        $TIDSupplier = $request->input('id_supp');
        $txtInvSup = $request->input('id_inv') ?: null;
        $TIdUang = 1;
        $user_id = trim(Auth::user()->NomorUser);
        $TNilaiTagih = $request->input('nilai_penagihan');
        $TNilaiBayarTanpaKoma = str_replace(',', '', $request->input('nilai_penagihan'));
        $TNilaiBayar = (float) $TNilaiBayarTanpaKoma;
        $TNoFaktur = $request->input('nofaktur_pajak');
        $TNilaiFaktur = $request->input('nilai_pajak');
        $TPajak = $request->input('pajak');
        $cekHrg_tot_bttb = 0;
        // dd($TNilaiBayar);
        // dd($request->all());
        $simpan = false;

        if (empty($TIDPenagihan)) {
            // Execute the stored procedure to insert and get the ID
            DB::connection('ConnAccounting')
                ->statement('exec SP_1273_ACC_INS_BKK1_IDTT @IdSupplier = ?, @invSup = ?, @IdMataUang = ?, @UserId = ?', [
                    $TIDSupplier,
                    $txtInvSup,
                    $TIdUang,
                    $user_id,
                ]);

            $TIDPenagihanqq = DB::connection('ConnAccounting')->table('T_Penagihan')
                ->select('Id_Penagihan')
                ->where('Id_Penagihan', 'like', 'TT%')
                ->orderBy('Waktu_Penagihan', 'desc')
                ->orderBy('Id_Penagihan', 'desc')
                ->first();

            $TIDPenagihan = trim($TIDPenagihanqq->Id_Penagihan);
            $simpan = true;
        }
        // if (empty($TIDPenagihan)) {
        //     $year = date('Y');

        //     $mValue = DB::connection('ConnAccounting')
        //         ->table('T_COUNTER_INVOICE')
        //         ->where('Periode', $year)
        //         ->value('NoTT');

        //     $idTT = 'TT-' . substr($year, -2) . str_pad($mValue, 6, '0', STR_PAD_LEFT);

        //     DB::connection('ConnAccounting')
        //         ->table('T_COUNTER_INVOICE')
        //         ->where('Periode', $year)
        //         ->update(['NoTT' => $mValue + 1]);

        //     DB::connection('ConnAccounting')
        //         ->table('T_Penagihan')
        //         ->insert([
        //             'Id_Penagihan' => $idTT,
        //             'Waktu_Penagihan' => now()->format('m/d/Y'),
        //             'Id_Supplier' => $TIDSupplier,
        //             'Id_Jenis_Dokumen' => 2,
        //             'Jumlah_Dokumen' => 1,
        //             'Status_PPN' => 'N',
        //             'Id_MataUang' => $TIdUang,
        //             'UserId' => $user_id,
        //             'Lunas' => 'N',
        //             'Id_Inv_Supp' => $txtInvSup ?? null,
        //         ]);

        //     $TIDPenagihan = $idTT;
        //     $simpan = true;
        //     // dd($TIDPenagihan);
        // }

        foreach ($ListPO as $item) {
            DB::connection('ConnAccounting')
                ->statement('exec SP_1273_ACC_INS_BKK1_SPPB @IdPenagihan=?, @IdDivisi=?, @NoSppb=?, @NoBTTB=?, @NoTerima=?, @HrgSat=?, @Disc=?, @PPN=?, @Kurs=?, @HrgDisc=?, @HrgPpn=?, @QtyTagih=?, @SatTagih=?', [
                    $TIDPenagihan,
                    $item['Kd_div'],
                    $item['NO_PO'],
                    $item['No_BTTB'],
                    $item['No_terima'],
                    (float) $item['Hrg_trm'],
                    (float) $item['Disc_trm'],
                    (float) $item['Ppn_trm'],
                    (float) $item['Kurs_Rp'],
                    (float) $item['Harga_disc'],
                    (float) $item['Harga_Ppn'],
                    (float) $item['Qty_Terima'],
                    $item['Sat_Terima']
                ]);
            $hrgTotBttb = DB::connection('ConnPurchase')->table('Yterima')
                ->where('No_terima', $item['No_terima'])
                ->value('Hrg_tot_bttb');
            $cekHrg_tot_bttb += (float) $hrgTotBttb;
        }
        $cekHrg_tot_bttb = number_format($cekHrg_tot_bttb, 2, '.', '');
        $cekHrg_tot_bttb = round($cekHrg_tot_bttb, 2);
        // $cekHrg_tot_bttb = round($cekHrg_tot_bttb, 2);
        // $TNilaiBayar = round($TNilaiBayar, 2);
        if (!$simpan) {
            return response()->json(['error' => 'TIDAK ADA Data yang diPROSES !!..']);
        } else {
            // dd($cekHrg_tot_bttb, $TNilaiBayar);
            if (abs($cekHrg_tot_bttb - $TNilaiBayar) < 0.01) {
                return response()->json(['error' => 'Data Hrg_tot_bttb dan Nilai Bayar tidak sesuai!']);
            }

            DB::connection('ConnAccounting')
                ->statement('exec SP_1273_ACC_UDT_BKK1_NILAI_TT ?, ?', [
                    $TIDPenagihan,
                    $TNilaiBayar
                ]);
            DB::connection('ConnAccounting')
                ->statement('exec SP_1273_ACC_INS_BKK1_PAJAK @IdPenagihan=?, @NoFaktur=?, @NilaiFaktur=?, @NilaiPajak=?, @Kode=?', [
                    $TIDPenagihan,
                    $TNoFaktur,
                    $TNilaiFaktur,
                    $TPajak,
                    1
                ]);

            DB::connection('ConnAccounting')
                ->statement('exec SP_1273_ACC_UDT_BKK1_TERBILANG ?, ?', [
                    $TIDPenagihan,
                    $terbilang,
                ]);

            return response()->json([
                'message' => "Data berhasil disimpan dengan No.Penagihan: $TIDPenagihan, Jumlah Penagihan Rp. $TNilaiTagih"
            ]);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getSupplier') {
            $supplierDetails = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_SUPPLIER');
            $response = [];
            foreach ($supplierDetails as $row) {
                $response[] = [
                    'NM_SUP' => trim($row->NM_SUP),
                    'NO_SUP' => trim($row->NO_SUP),
                ];
            }
            $search = request('search.value');

            if (!empty($search)) {
                $response = collect($response)->filter(function ($row) use ($search) {
                    return
                        stripos($row['NM_SUP'], $search) === 0 ||
                        stripos($row['NO_SUP'], $search) === 0;
                })->values()->all();
            }
            return datatables($response)
                ->filter(function () {}, false)
                ->make(true);
        } else if ($id == 'getPO') {
            $idSupplier = $request->input('id_supp');
            // dd($idSupplier);
            $poDetails = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_DETAILBRG ?', [$idSupplier]);
            // dd($poDetails);
            $response = [];
            foreach ($poDetails as $row) {
                $response[] = [
                    'Kd_div' => trim($row->Kd_div),
                    'NO_PO' => trim($row->NO_PO),
                    'No_BTTB' => trim($row->No_BTTB),
                    'Harga_terbayar' => number_format($row->Harga_terbayar, 2, '.', ','),
                    'Kd_brg' => trim($row->Kd_brg),
                    'NAMA_BRG' => trim($row->NAMA_BRG),
                    'Qty_Terima' => $row->Qty_Terima,
                    'SatTerima' => trim($row->SatTerima),
                    'No_terima' => trim($row->No_terima),
                    'Hrg_trm' => number_format($row->Hrg_trm, 2, '.', ','),
                    'Kurs_Rp' => number_format($row->Kurs_Rp, 2, '.', ','),
                    'Disc_trm' => number_format($row->Disc_trm, 2, '.', ','),
                    'Ppn_trm' => number_format($row->Ppn_trm, 2, '.', ','),
                    'Harga_disc' => number_format($row->Harga_disc, 2, '.', ','),
                    'Harga_Ppn' => number_format($row->Harga_Ppn, 2, '.', ','),
                    'Sat_Terima' => $row->Sat_Terima,
                    'hrg_murni' => number_format($row->hrg_murni, 2, '.', ','),
                ];
            }
            return datatables($response)->make(true);
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
    public function destroy($id)
    {
        //
    }
}
