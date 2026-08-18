<?php

namespace App\Http\Controllers\Accounting\Informasi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;


class CetakNotaDanFakturController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Informasi.CetakNotaDanFaktur', compact('access'));
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
        if ($id === 'getCust') {
            $Tgl_Penagihan = $request->input('Tgl_Penagihan');

            $divisi = DB::connection('ConnAccounting')->select(
                'exec SP_LIST_PENAGIHAN_SJ @Kode = ?, @Tgl_Penagihan = ?'
                ,
                [10, $Tgl_Penagihan]
            );
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaCust' => $detail_divisi->NamaCust,
                    'Id_Penagihan' => $detail_divisi->Id_Penagihan,
                ];
            }
            return datatables($divisi)->make(true);
        }

        // get divisi
        else if ($id === 'getSuratJalan') {
            $Id_Penagihan = $request->input('Id_Penagihan');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_LIST_PENAGIHAN_SJ
            @Kode = ?, @Id_Penagihan = ?', [11, $Id_Penagihan]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Surat_Jalan' => $detail_divisi->Surat_Jalan,
                ];
            }
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'getPajak') {
            $Id_Penagihan = $request->input('Id_Penagihan');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_LIST_PENAGIHAN_SJ
                    @Kode = ?, @Id_Penagihan = ?', [12, $Id_Penagihan]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdFakturPajak' => $detail_divisi->IdFakturPajak,
                    'Id_MataUang' => $detail_divisi->Id_MataUang,
                ];
            }
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'cekXC') {
            $noInv = $request->input('noInv');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIHAT_PENAGIHAN_SJ
                    @kode = ?, @noInv = ?', [5, $noInv]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'ada' => $detail_divisi->ada,
                ];
            }
            return response()->json($data_divisi);
        }

        else if ($id === 'getBiayaTambahanFakturXC') {
            $Id_Penagihan = $request->input('Id_Penagihan');

            $divisi = DB::connection('ConnAccounting')
                ->table('T_DETAIL_PENAGIHAN_XC')
                ->where('Id_Penagihan', $Id_Penagihan)
                ->get();

            $data_divisi = [];

            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'XCTranspor' => $detail_divisi->XCTranspor,
                    'Storage' => $detail_divisi->Storage,
                ];
            }
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'getSJ') {
            $Id_Penagihan = $request->input('Id_Penagihan');
            $divisi = DB::connection('ConnAccounting')
                ->table('vw_prg_cetak_Penagihan_SJ')
                ->where('Id_Penagihan', $Id_Penagihan)
                ->get();
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaCust' => $detail_divisi->NamaCust,
                    'Alamat' => $detail_divisi->Alamat,
                    'NPWP' => $detail_divisi->NPWP,
                    'NamaNPWP' => $detail_divisi->NamaNPWP,
                    'AlamatNPWP' => $detail_divisi->AlamatNPWP,
                    'Id_Penagihan' => $detail_divisi->Id_Penagihan,
                    'Tgl_Penagihan' => $detail_divisi->Tgl_Penagihan,
                    'NO_PO' => $detail_divisi->NO_PO,
                    'Nilai_Penagihan' => $detail_divisi->Nilai_Penagihan,
                    'Nama_MataUang' => $detail_divisi->Nama_MataUang,
                    'Status_PPN' => $detail_divisi->Status_PPN,
                    'Terbilang' => $detail_divisi->Terbilang,
                    'TglFakturPajak' => $detail_divisi->TglFakturPajak,
                    'IdFakturPajak' => $detail_divisi->IdFakturPajak,
                    'NilaiKurs' => $detail_divisi->NilaiKurs,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'Jml' => $detail_divisi->Jml,
                    'Satuan' => $detail_divisi->Satuan,
                    'NamaType' => $detail_divisi->NamaType,
                    'HargaSatuan' => $detail_divisi->HargaSatuan,
                    'Tgl_Terima_Barang' => $detail_divisi->Tgl_Terima_Barang,
                    'NamaPembayaran' => $detail_divisi->NamaPembayaran,
                    'SyaratBayar' => $detail_divisi->SyaratBayar,
                    'Symbol2' => $detail_divisi->Symbol2,
                    'PPN' => $detail_divisi->PPN,
                    'Discount' => $detail_divisi->Discount,
                    'KdArea_Ppn' => $detail_divisi->KdArea_Ppn,
                    // 'Id_Penagihan_Acuan' => $detail_divisi->Id_Penagihan_Acuan,
                    'Nilai_UM' => $detail_divisi->Nilai_UM,
                    // 'Kurs_UM' => $detail_divisi->Kurs_UM,
                    'PersenPPN' => $detail_divisi->PersenPPN,
                    'PersenPPH' => $detail_divisi->PersenPPH,
                ];
            }
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'getSP') {
            $Id_Penagihan = $request->input('Id_Penagihan');

            $divisi = DB::connection('ConnAccounting')
                ->table('vw_prg_cetak_Penagihan_SP')
                ->where('Id_Penagihan', $Id_Penagihan)
                ->get();

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaCust' => $detail_divisi->NamaCust,
                    'Alamat' => $detail_divisi->Alamat,
                    'NamaNPWP' => $detail_divisi->NamaNPWP,
                    'NPWP' => $detail_divisi->NPWP,
                    'AlamatNPWP' => $detail_divisi->AlamatNPWP,
                    'Id_Penagihan' => $detail_divisi->Id_Penagihan,
                    'Tgl_Penagihan' => $detail_divisi->Tgl_Penagihan,
                    'PO' => $detail_divisi->PO,
                    'Nilai_Penagihan' => $detail_divisi->Nilai_Penagihan,
                    'Nama_MataUang' => $detail_divisi->Nama_MataUang,
                    'Status_PPN' => $detail_divisi->Status_PPN,
                    'Terbilang' => $detail_divisi->Terbilang,
                    'TglFakturPajak' => $detail_divisi->TglFakturPajak,
                    'IdFakturPajak' => $detail_divisi->IdFakturPajak,
                    'NilaiKurs' => $detail_divisi->NilaiKurs,
                    'NAMATYPEBARANG' => $detail_divisi->NAMATYPEBARANG,
                    'Qty' => $detail_divisi->Qty,
                    'Satuan' => $detail_divisi->Satuan,
                    'NamaBarang' => $detail_divisi->NamaBarang,
                    'NamaPembayaran' => $detail_divisi->NamaPembayaran,
                    'SyaratBayar' => $detail_divisi->SyaratBayar,
                    'Symbol2' => $detail_divisi->Symbol2,
                    'HargaSatuan' => $detail_divisi->HargaSatuan,
                    'Discount' => $detail_divisi->Discount,
                    'KdArea_Ppn' => $detail_divisi->KdArea_Ppn,
                    'Nilai_UM' => $detail_divisi->Nilai_UM,
                    'Kurs_UM' => $detail_divisi->Kurs_UM,
                    'Nilai_blm_Pajak' => $detail_divisi->Nilai_blm_Pajak,
                    'IDSuratPesanan' => $detail_divisi->IDSuratPesanan,
                    'TerKirim' => $detail_divisi->TerKirim,
                    // 'Expr1' => $detail_divisi->Expr1,
                    'StatusFaktur' => $detail_divisi->StatusFaktur,
                    'QtyOrder' => $detail_divisi->QtyOrder,
                    'PersenPPN' => $detail_divisi->PersenPPN,
                ];
            }
            return response()->json($data_divisi);
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
