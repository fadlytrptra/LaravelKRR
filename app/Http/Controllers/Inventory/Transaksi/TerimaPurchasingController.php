<?php

namespace App\Http\Controllers\Inventory\Transaksi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;
use Barryvdh\DomPDF\Facade\Pdf;
use Log;

class TerimaPurchasingController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory'); //tidak perlu menu di navbar
        return view('Inventory.Transaksi.TerimaPurchasing', compact('access'));
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
        $user = Auth::user()->NomorUser;

        // get user id
        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        }

        // get divisi
        else if ($id === 'getDivisi') {
            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_userdivisi @XKdUser = ?', [$user]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'IdDivisi' => $detail_divisi->IdDivisi,
                    'KodeUser' => $detail_divisi->KodeUser
                ];
            }
            return datatables($divisi)->make(true);

            // mendapatkan daftar objek
        } else if ($id === 'getObjek') {
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$user, $request->input('divisi')]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'IdObjek' => $detail_objek->IdObjek,
                    'IdDivisi' => $detail_objek->IdDivisi
                ];
            }
            return datatables($objek)->make(true);
        }
        // get kel utama
        else if ($id === 'getKelUt') {
            $XIdObjek_KelompokUtama = $request->input('XIdObjek_KelompokUtama');
            $KodeBarang = $request->input('KodeBarang');

            $kelut = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama
            @Type = ?, @XIdObjek_KelompokUtama = ?, @KodeBarang = ?', ['13', $XIdObjek_KelompokUtama, $KodeBarang]);
            $data_kelut = [];
            foreach ($kelut as $detail_kelut) {
                $data_kelut[] = [
                    'NamaKelompokUtama' => $detail_kelut->NamaKelompokUtama,
                    'IdKelompokUtama' => $detail_kelut->IdKelompokUtama
                ];
            }
            return datatables($kelut)->make(true);

            // mendapatkan daftar kelompok
        } else if ($id === 'getKelompok') {
            $XIdKelompokUtama_Kelompok = $request->input('XIdKelompokUtama_Kelompok');
            $KodeBarang = $request->input('KodeBarang');

            $kelompok = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok
            @Type = ?, @XIdKelompokUtama_Kelompok = ?, @KodeBarang = ?', ['2', $XIdKelompokUtama_Kelompok, $KodeBarang]);
            $data_kelompok = [];
            foreach ($kelompok as $detail_kelompok) {
                $data_kelompok[] = [
                    'NamaKelompok' => $detail_kelompok->NamaKelompok,
                    'IdKelompok' => $detail_kelompok->IdKelompok
                ];
            }
            return datatables($kelompok)->make(true);

            // mendapatkan daftar sub kelompok
        } else if ($id === 'getSubkel') {
            $KodeBarang = $request->input('KodeBarang');
            $XIdKelompok_SubKelompok = $request->input('XIdKelompok_SubKelompok');

            $XIdKelompok_SubKelompok = $XIdKelompok_SubKelompok ?? '0';

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompok_SubKelompok
            @Type = ?, @XIdKelompok_SubKelompok = ?, @KodeBarang = ?', ['3', $XIdKelompok_SubKelompok, $KodeBarang]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'IdType' => $detail_subkel->IdType,
                ];
            }
            return datatables($subkel)->make(true);
        }

        // all data
        else if ($id === 'callAllData') {
            $IdDivisi = $request->input('IdDivisi');
            $IdObjek = $request->input('IdObjek');

            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_Terima_Transfer_PerObjek
            @IdDivisi = ?, @IdObjek = ?', [$IdDivisi, $IdObjek]);
            // $info = DB::connection('ConnInventory')->selectOne("
            // SELECT
            //         @@SERVERNAME AS ServerName,
            //         DB_NAME() AS DatabaseName
            // ");
            //  dd([
            //     'connection' => $info,
            //     'IdDivisi' => $IdDivisi,
            //     'IdObjek' => $IdObjek,
            //     'data' => $objek
            // ]);
            // dd($objek);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'SaatAwalTransaksi' => $detail_objek->SaatAwalTransaksi,
                    'IdType' => $detail_objek->IdType,
                    'NamaType' => $detail_objek->NamaType,
                    'JumlahPemasukanPrimer' => $detail_objek->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_objek->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_objek->JumlahPemasukanTritier,
                    'IdTransaksi' => $detail_objek->IdTransaksi,
                    'SatPrimer' => $detail_objek->SatPrimer,
                    'SatSekunder' => $detail_objek->SatSekunder,
                    'SatTritier' => $detail_objek->SatTritier,
                    'KodeBarang' => $detail_objek->KodeBarang,
                    'PIB' => $detail_objek->PIB ?? '',
                    'No_PO' => $detail_objek->No_PO ?? '',
                ]
                ;
            }
            return response()->json($data_objek);
        }

        // get id detail
        else if ($id === 'getDetailId') {
            $XIdType = $request->input('XIdType');

            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdType_Type
            @XIdType = ?', [$XIdType]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'IdKelompokUtama' => $detail_objek->IdKelompokUtama,
                    'NamaKelompokUtama' => $detail_objek->NamaKelompokUtama,
                    'IdKelompok' => $detail_objek->IdKelompok,
                    'NamaKelompok' => $detail_objek->NamaKelompok,
                    'IdSubkelompok_Type' => $detail_objek->IdSubkelompok_Type,
                    'NamaSubKelompok' => $detail_objek->NamaSubKelompok,
                ]
                ;
            }
            return response()->json($data_objek);
        }

        // get id detail
        else if ($id === 'getKeterangan') {
            $kodeTrans = $request->input('kodeTrans');

            $objek = DB::connection('ConnInventory')
                ->table('tmp_transaksi')
                ->where('IdTransaksi', $kodeTrans)
                ->get('UraianDetailTransaksi');
            // dd($objek);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'UraianDetailTransaksi' => $detail_objek->UraianDetailTransaksi,
                ]
                ;
            }
            return response()->json($data_objek);
        }

        // get nama detail
        else if ($id === 'getDetailNama') {
            $IdObjek = $request->input('IdObjek');
            $KodeBarang = $request->input('KodeBarang');

            $objek = DB::connection('ConnInventory')->select('exec SP_1273_INV_Cek_TypeBarang
            @Kode = ?, @IdObjek = ?, @KodeBarang = ?', [1, $IdObjek, $KodeBarang]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'Ada' => $detail_objek->Ada,
                ]
                ;
            }
            return response()->json($data_objek);
        }

        // cek penyesuaian
        else if ($id === 'cekPenyesuaianTransaksi') {
            $IdType = $request->input('IdType');
            $IdTypeTransaksi = $request->input('IdTypeTransaksi');

            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_check_penyesuaian_transaksi
            @IdType = ?, @IdTypeTransaksi = ?', ['06', $IdTypeTransaksi]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'jumlah' => $detail_objek->jumlah,
                ]
                ;
            }
            return response()->json($data_objek);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.

    //testing (debug)
    public function update(Request $request, $id)
    {
        if ($id !== 'prosesTerimaTransferBeli') {
            return response()->json([
                'error' => 'Invalid action'
            ], 400);
        }

        // Ambil data dari request
        $IdTransaksi   = $request->input('IdTransaksi');
        $IdType        = $request->input('IdType');
        $IdSubKel      = $request->input('IdSubKel');
        $Penerima      = $request->input('Penerima');
        $MasukPrimer   = $request->input('MasukPrimer');
        $MasukSekunder = $request->input('MasukSekunder');
        $MasukTritier  = $request->input('MasukTritier');

        if (empty($IdTransaksi) || empty($IdType) || empty($Penerima)) {
            return response()->json([
                'error' => 'Data wajib belum lengkap'
            ], 422);
        }

        /*
        | SIMULASI
        */

        if ($request->boolean('simulate')) {

            Log::info('SIMULASI TERIMA TRANSFER BELI', [
                'IdTransaksi'   => $IdTransaksi,
                'IdType'        => $IdType,
                'IdSubKel'      => $IdSubKel,
                'Penerima'      => $Penerima,
                'MasukPrimer'   => $MasukPrimer,
                'MasukSekunder' => $MasukSekunder,
                'MasukTritier'  => $MasukTritier,
            ]);

            return response()->json([
                'success' => true,
                'mode' => 'SIMULATE',
                'IdTransaksi' => $IdTransaksi
            ]);
        }
        /*
        | PROSES KE DATABASE (REAL)
        */
        try {
            DB::connection('ConnInventory')->statement(
                'exec SP_1273_INV_PROSES_TERIMA_TRANSFER_BELI
                    @IdTransaksi = ?,
                    @IdType = ?,
                    @IdSubKel = ?,
                    @Penerima = ?,
                    @MasukPrimer = ?,
                    @MasukSekunder = ?,
                    @MasukTritier = ?',
                [
                    $IdTransaksi,
                    $IdType,
                    $IdSubKel,
                    $Penerima,
                    $MasukPrimer,
                    $MasukSekunder,
                    $MasukTritier,
                ]
            );

            Log::info('TERIMA TRANSFER BELI SUKSES', [
                'IdTransaksi' => $IdTransaksi,
                'IdType'      => $IdType,
                'Penerima'    => $Penerima,
            ]);

            return response()->json([
                'success' => true,
                'IdTransaksi' => $IdTransaksi
            ]);

        } catch (\Exception $e) {

            Log::error('TERIMA TRANSFER BELI GAGAL', [
                'IdTransaksi' => $IdTransaksi,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'error' => 'Data gagal diproses',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function downloadPdf($no_po)
    {
        $header = DB::connection('ConnPurchase')
            ->table('VW_5409_PRINT_HEADER_PO')
            ->where('VW_5409_PRINT_HEADER_PO.NO_PO', $no_po)
            ->first();

        if (!$header) {
            abort(404, 'Data PO tidak ditemukan');
        }

        $items = DB::connection('ConnPurchase')
            ->table('VW_5409_PRINT_PO')
            ->where('VW_5409_PRINT_PO.NO_PO', $no_po)
            ->orderBy('No_trans', 'asc')
            ->get();

        if ($items->isEmpty()) {
            abort(404, 'Detail PO kosong');
        }

        $sumAmount = $items->sum('PriceSub');
        $ppn = $items->sum('PPN');
        $dpp = $items->sum('PriceDPP');
        $total = $sumAmount + $ppn;

        /* ===============================
         * AMBIL TTD DIREKTUR 1 & 2
         * =============================== */
        $ttdBinary1 = null;
        $ttdBinary2 = null;
        $ttdBinary3 = null;
        $ttdBinary4 = null;

        if (!empty($header->Direktur)) {
            $ttdBinary1 = DB::connection('ConnEDP')
                ->table('dbo.UserMaster')
                ->where('NomorUser', $header->Direktur)
                ->value('FotoTtd');
        }

        if (!empty($header->Direktur2)) {
            $ttdBinary2 = DB::connection('ConnEDP')
                ->table('dbo.UserMaster')
                ->where('NomorUser', $header->Direktur2)
                ->value('FotoTtd');
        }

        if (!empty($header->Manager)) {
            $ttdBinary3 = DB::connection('ConnEDP')
                ->table('dbo.UserMaster')
                ->where('NomorUser', $header->Manager)
                ->value('FotoTtd');
        }

        if (!empty($header->Operator)) {
            $ttdBinary4 = DB::connection('ConnEDP')
                ->table('dbo.UserMaster')
                ->where('NomorUser', $header->Operator)
                ->value('FotoTtd');
        }

        $convertToBase64 = function ($fotoTtd) {
            if (empty($fotoTtd)) {
                return null;
            }

            if (str_starts_with($fotoTtd, 'data:image')) {
                return $fotoTtd;
            }

            return 'data:image/png;base64,' . $fotoTtd;
        };

        $ttdBase64_1 = $convertToBase64($ttdBinary1);
        $ttdBase64_2 = $convertToBase64($ttdBinary2);
        $ttdBase64_3 = $convertToBase64($ttdBinary3);
        $ttdBase64_4 = $convertToBase64($ttdBinary4);

        $logo = base64_encode(file_get_contents(public_path('images/KRRLama.png')));
        $logo = 'data:image/png;base64,' . $logo;

        $pdf = Pdf::loadView('Inventory.Transaksi.po_pdf', [
            'header' => $header,
            'items' => $items,
            'sumAmount' => $sumAmount,
            'ppn' => $ppn,
            'dpp' => $dpp,
            'total' => $total,
            'ttdBase64_1' => $ttdBase64_1,
            'ttdBase64_2' => $ttdBase64_2,
            'ttdBase64_3' => $ttdBase64_3,
            'ttdBase64_4' => $ttdBase64_4,
            'logo' => $logo
        ])->setPaper('A4', 'portrait');

        return $pdf->stream("{$no_po}.pdf");
        // return view('po_email', compact(
        //     'header',
        //     'items',
        //     'sumAmount',
        //     'ppn',
        //     'dpp',
        //     'total',
        //     'ttdBase64_1',
        //     'ttdBase64_2',
        //     'ttdBase64_3',
        //     'ttdBase64_4',
        // ));
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        //
    }
}
