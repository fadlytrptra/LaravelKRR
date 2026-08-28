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
        \Log::info('=== CETAK SJ DEBUG ===');

        \Log::info('Tanggal', [
            'tanggal' => $tanggal
        ]);

        \Log::info('No SJ', [
            'nosj' => $nosj
        ]);

        \Log::info('Jenis SJ', [
            'jenissj' => $jenissj
        ]);

        if (!in_array($jenissj, ['suratjalanppn', 'suratjalanexport'])) {

            \Log::warning('Jenis SJ tidak valid', [
                'jenissj' => $jenissj
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Jenis SJ ' . $jenissj . ' belum disetting',
                'data' => []
            ], 400);
        }

        $connection = DB::connection('ConnKCNSales');

        \Log::info('Database', [
            'database' => $connection->getDatabaseName(),
        ]);

        $data = $connection
            ->table('dbo.VW_PRG_4496_SLS_CETAK_SJ')
            ->where('IDPengiriman', $nosj)
            ->get();

        \Log::info('Jumlah data view', [
            'jumlah' => $data->count()
        ]);

        \Log::info('Data view', [
            'data' => $data->toArray()
        ]);

        return response()->json($data);
    }

    public function downloadPdf($no_sj)
    {
        $items = DB::connection('ConnKCNSales')
            ->table('VW_PRG_4496_SLS_CETAK_SJ as V')
            ->join(
                'T_HeaderPengiriman as H',
                'V.IDPengiriman',
                '=',
                'H.IDPengiriman'
            )
            ->where('V.IDPengiriman', $no_sj)
            ->select(
                'V.*',
                'H.TanggalActual'
            )
            ->first();

        if (!$items) {
            abort(404, 'Data Surat Jalan tidak ditemukan');
        }

        $pdf = Pdf::loadView('Kencana.SuratJalan.SuratJalanPDF', [
            'items' => $items,
        ])->setPaper('A4', 'portrait');

        return $pdf->stream("{$no_sj}.pdf");
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
