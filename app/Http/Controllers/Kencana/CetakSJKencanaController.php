<?php

namespace App\Http\Controllers\Kencana;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PDF;
use App\Http\Controllers\HakAksesController;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class CetakSJKencanaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        // $customer = db::connection('sqlsrv2')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        // dd($customer);
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        $user = Auth::user()->NomorUser;
        return view('Kencana.SuratJalan.CetakSJ', compact('access', 'user'));
    }

    public function getSuratJalan($tanggal)
    {
        $data = DB::connection('ConnKCNSales')
            ->table('T_HeaderPengiriman as H')
            ->join(
                'T_DetailPengiriman as D',
                'H.IdHeaderKirim',
                '=',
                'D.IDHeaderKirim'
            )
            ->join(
                'T_JnsSuratJalan as J',
                'H.JnsIdPengiriman',
                '=',
                'J.IDJnsSuratJalan'
            )
            ->where('H.TanggalActual', $tanggal)
            ->select(
                'J.NamaJnsSuratJalan',
                'H.IDPengiriman',
                'D.IDSuratPesanan'
            )
            ->groupBy(
                'J.NamaJnsSuratJalan',
                'D.IDSuratPesanan',
                'H.IDPengiriman'
            )
            ->orderBy('H.IDPengiriman', 'asc')
            ->get();

        return response()->json($data);
    }

    public function getDataCetakSuratJalan($tanggal, $nosj, $jenissj)
    {
        if (!in_array($jenissj, ['suratjalanppn', 'suratjalanexport'])) {
            return response()->json([
                'success' => false,
                'message' => 'Jenis SJ ' . $jenissj . ' belum disetting',
                'data' => []
            ], 400);
        }

        $data = DB::connection('ConnKCNSales')
            ->table('VW_PRG_4496_SLS_CETAK_SJ')
            ->where('IDPengiriman', $nosj)
            ->get();

        return response()->json($data);
    }

    public function downloadPdf($no_sj)
    {
        $items = DB::connection('ConnKCNSales')
            ->table('VW_PRG_4496_SLS_CETAK_SJ')
            ->where('VW_PRG_4496_SLS_CETAK_SJ.IDPengiriman', $no_sj)
            ->first();

        if (!$items) {
            abort(404, 'Data PO tidak ditemukan');
        }

        /* ===============================
         * AMBIL TTD
         * =============================== */
        // $ttdBinary1 = null;

        // if (!empty($items->AccMrg)) {
        //     $ttdBinary1 = DB::connection('ConnEDP')
        //         ->table('dbo.UserMaster')
        //         ->where('NomorUser', $items->AccMrg)
        //         ->value('FotoTtd');
        // }

        // $convertToBase64 = function ($fotoTtd) {
        //     if (empty($fotoTtd)) {
        //         return null;
        //     }

        //     if (str_starts_with($fotoTtd, 'data:image')) {
        //         return $fotoTtd;
        //     }

        //     return 'data:image/png;base64,' . $fotoTtd;
        // };

        // $ttdBase64_1 = $convertToBase64($ttdBinary1);

        /* ===============================
         * GENERATE QR CODE
         * =============================== */

        // $url = url("dokumen/$no_sj");

        // $ttdBase64_1 = base64_encode(
        //     QrCode::format('png')
        //         ->size(150)
        //         ->margin(1)
        //         ->generate($url)
        // );

        // $ttdBase64_1 = 'data:image/png;base64,' . $ttdBase64_1;
        $pdf = Pdf::loadView('Kencana.SuratJalan.SuratJalanPDF', [
            'items' => $items,
            // 'ttdBase64_1' => $ttdBase64_1,
        ])->setPaper('A4', 'portrait');

        return $pdf->stream("{$no_sj}.pdf");
        // return view('Sales.Report.SuratJalanPDF', [
        //     'items' => $items,
        //     'ttdBase64_1' => $ttdBase64_1,
        // ]);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
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
