<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratJalan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;



class KirimSJACCCustomerController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Transaksi.SuratJalan.KirimSJACC', compact('access'));
    }

    public function create()
    {

    }

    public function show(Request $request, $id)
    {
        if ($id == 'getDataSJACC') {

            $dataSuratJalan = DB::connection('ConnSales')
                ->select(
                    'EXEC SP_4384_SLS_KIRIM_SJ @XKode = ?',
                    [9]
                );

            $tanggalMulai = $request->tanggal_mulai;
            $tanggalAkhir = $request->tanggal_akhir;

            if ($tanggalMulai || $tanggalAkhir) {

                $dataSuratJalan = collect($dataSuratJalan)
                    ->filter(function ($row) use ($tanggalMulai, $tanggalAkhir) {

                        if (empty($row->Tanggal)) {
                            return false;
                        }

                        $tanggalSJ = substr($row->Tanggal, 0, 10);

                        if ($tanggalMulai && $tanggalSJ < $tanggalMulai) {
                            return false;
                        }

                        if ($tanggalAkhir && $tanggalSJ > $tanggalAkhir) {
                            return false;
                        }

                        return true;
                    })
                    ->values();
            }

            foreach ($dataSuratJalan as $row) {

                $row->HasAttachment = DB::connection('ConnPublicWeb')
                    ->table('T_Attachment')
                    ->where('IdSuratJalan', $row->IdSuratJalan)
                    ->exists();
            }

            return datatables($dataSuratJalan)->make(true);
        }
    }

    public function downloadAttachment($idPengiriman)
    {
        $data = DB::connection('ConnPublicWeb')
            ->table('T_KirimSuratJalan as KSJ')
            ->join('T_Attachment as ATT', 'KSJ.IdSuratJalan', '=', 'ATT.IdSuratJalan')
            ->where('KSJ.IDPengiriman', $idPengiriman)
            ->select('ATT.picture')
            ->first();

        if (!$data || empty($data->picture)) {
            return response()->json([
                'success' => false,
                'message' => 'Attachment tidak ditemukan'
            ]);
        }

        $base64 = $data->picture;

        if (strpos($base64, ',') !== false) {
            $base64 = explode(',', $base64)[1];
        }

        $imageData = base64_decode($base64);

        return response($imageData)
            ->header('Content-Type', 'image/jpeg')
            ->header(
                'Content-Disposition',
                'attachment; filename="Attachment SJ '.$idPengiriman.'.jpg"'
            );
    }

    public function edit($id)
    {

    }

    public function update(Request $request, $id)
    {

    }

    public function destroy($id)
    {

    }
}

