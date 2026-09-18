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
            return response()->json([
                'success' => false,
                'message' => 'Jenis SJ ' . $jenissj . ' belum disetting',
                'data' => []
            ], 400);
        }

        $connection = DB::connection('ConnKCNSales');

        $data = $connection
            ->table('T_HeaderPengiriman as H')

            // =====================================================
            // DETAIL SURAT JALAN
            // =====================================================
            ->join(
                'T_DetailPengiriman as DG',
                'H.IdHeaderKirim',
                '=',
                'DG.IDHeaderKirim'
            )

            // =====================================================
            // DELIVERY ORDER
            // =====================================================
            ->join(
                'T_DeliveryOrder as DO',
                'DG.IDDO',
                '=',
                'DO.IDDO'
            )

            // =====================================================
            // DETAIL PESANAN
            // Dipakai untuk IDBarang, IDJnsBarang, Qty, Satuan, dll
            // =====================================================
            ->leftJoin(
                'T_DetailPesanan as DP',
                function ($join) {
                    $join->on('DO.IDPesanan', '=', 'DP.IDPesanan')
                        ->on('DG.IDSuratPesanan', '=', 'DP.IDSuratPesanan');
                }
            )

            // =====================================================
            // HEADER PESANAN
            // =====================================================
            ->leftJoin(
                'T_HeaderPesanan as HP',
                'DP.IDSuratPesanan',
                '=',
                'HP.IDSuratPesanan'
            )

            // =====================================================
            // CUSTOMER
            // =====================================================
            ->leftJoin(
                'T_Customer as C',
                'HP.IDCust',
                '=',
                'C.IDCust'
            )

            // =====================================================
            // TYPE BARANG
            // DP.IDBarang -> INVENTORY.dbo.Type.KodeBarang
            // =====================================================
            ->leftJoin(
                DB::raw('INVENTORY.dbo.Type as TY'),
                'DP.IDBarang',
                '=',
                'TY.KodeBarang'
            )

            // =====================================================
            // FILTER SJ
            // =====================================================
            ->where('H.IDPengiriman', $nosj)

            ->select([
                'DP.IDJnsBarang as IDJnsBarang',

                // Customer
                'C.NamaCust as NamaCust',
                'C.AlamatKirim as AlamatKirim',

                // SP
                'DG.IDSuratPesanan as IdSP',

                // SJ
                'H.IDPengiriman as IDPengiriman',

                // Type Barang
                'TY.NamaType as NamaTipeBarang',

                // Nama Barang
                'DO.Uraian as NamaBarang',

                // Tanggal dari T_HeaderPengiriman
                'H.TanggalActual as TanggalActual',

                // Quantity
                'DP.Qty as JumlahPesan',
                'DO.QtyPrimer as QtyPrimer',
                'DO.QtySekunder as QtySekunder',
                'DO.QtyTritier as QtyTritier',

                // Satuan
                'DP.Satuan as Satuan',

                // No Polisi dari T_HeaderPengiriman
                'H.TrukNopol as TrukNopol',

                // No SP
                'H.NoSP as NoSP',

                // Alamat pengiriman
                'DO.AlamatKirim as AlamatPengiriman',
                'DO.KotaKirim as KotaKirim',

                'DO.Expeditor as Expeditor',

                'H.Ket as Ket',

                'DP.KodeBarang as KodeBarang',
                'DP.UraianPesanan as UraianPesanan',
            ])

            ->distinct()
            ->get();

        \Log::info('Jumlah data query builder', [
            'jumlah' => $data->count()
        ]);

        \Log::info('Data query builder', [
            'data' => $data->toArray()
        ]);

        return response()->json($data);
    }

    public function downloadPdf($no_sj)
    {
        $connection = DB::connection('ConnKCNSales');

        $items = $connection
            ->table('T_HeaderPengiriman as H')

            // Detail Surat Jalan
            ->join(
                'T_DetailPengiriman as DG',
                'H.IdHeaderKirim',
                '=',
                'DG.IDHeaderKirim'
            )

            // Delivery Order
            ->join(
                'T_DeliveryOrder as DO',
                'DG.IDDO',
                '=',
                'DO.IDDO'
            )

            // Detail Pesanan
            ->leftJoin(
                'T_DetailPesanan as DP',
                function ($join) {
                    $join->on(
                        'DO.IDPesanan',
                        '=',
                        'DP.IDPesanan'
                    )->on(
                        'DG.IDSuratPesanan',
                        '=',
                        'DP.IDSuratPesanan'
                    );
                }
            )

            // Header Pesanan
            ->leftJoin(
                'T_HeaderPesanan as HP',
                'DP.IDSuratPesanan',
                '=',
                'HP.IDSuratPesanan'
            )

            // Customer
            ->leftJoin(
                'T_Customer as C',
                'HP.IDCust',
                '=',
                'C.IDCust'
            )

            // Type Barang
            ->leftJoin(
                DB::raw('INVENTORY.dbo.Type as TY'),
                'DP.IDBarang',
                '=',
                'TY.KodeBarang'
            )

            ->where('H.IDPengiriman', $no_sj)

            ->select([
                'C.NamaCust as NamaCust',
                'C.AlamatKirim as AlamatKirim',
                'DG.IDSuratPesanan as IdSP',
                'H.IDPengiriman as IDPengiriman',
                'H.TanggalActual as TanggalActual',
                'H.TrukNopol as TrukNopol',
                'H.NoSP as NoSP',
                'H.Ket as Ket',
                'TY.NamaType as NamaTipeBarang',
                'DO.Uraian as NamaBarang',
                'DP.Qty as JumlahPesan',
                'DO.QtyTritier as QtyTritier',
                'DP.Satuan as Satuan',
                'DO.AlamatKirim as AlamatPengiriman',
                'DO.KotaKirim as KotaKirim',
                'DO.Expeditor as Expeditor',
                'DP.KodeBarang as KodeBarang',
                'DP.UraianPesanan as UraianPesanan',
            ])

            ->first();

        if (!$items) {
            abort(404, 'Data Surat Jalan tidak ditemukan');
        }

        \Log::info('=== DOWNLOAD PDF SJ ===', [
            'no_sj' => $no_sj,
            'data' => (array) $items,
        ]);

        $pdf = Pdf::loadView(
            'Kencana.SuratJalan.SuratJalanPDF',
            [
                'items' => $items,
            ]
        )->setPaper('A4', 'portrait');

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
