<?php

namespace App\Http\Controllers\Kencana;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use DB;
use Auth;

class BatalSuratJalanKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.SuratJalan.BatalSJ', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $idCust  = $request->input('idCustomer');
        $noSP    = $request->input('surat_pesanan');
        $ket     = $request->input('alasan_batal');
        $idUser  = Auth::user()->NomorUser;
        $idJnsSJ = $request->input('idJenisSuratJalan');
        $noSJ    = str_pad(
            (string) $request->input('surat_jalan'),
            10,
            '0',
            STR_PAD_LEFT
        );

        try {

            $query = DB::connection('ConnKCNSales')
                ->table('T_HeaderPengiriman')
                ->where('JnsIdPengiriman', $idJnsSJ)
                ->where('IDPengiriman', $noSJ)
                ->where('IDCust', $idCust);

            $data = $query->first();

            if (!$data) {
                return response()->json([
                    'error' => 'Surat Jalan ' . $noSJ . ' tidak ditemukan.'
                ], 404);
            }

            if (!empty($data->BatalSJ)) {
                return response()->json([
                    'error' => 'Surat Jalan ' . $noSJ . ' sudah pernah dibatalkan.'
                ], 422);
            }

            $query->update([
                'AlasanSjDiganti' => $ket,
                'BatalSJ'         => $idUser,
                'NoSP'            => $noSP,
            ]);

            return response()->json([
                'success' => 'Surat Jalan ' . $noSJ . ' berhasil dibatalkan!'
            ]);

        } catch (Exception $ex) {

            return response()->json([
                'error' => $ex->getMessage()
            ], 500);
        }
    }

    public function show($id, Request $request)
    {
        try {

            /*
            |--------------------------------------------------------------------------
            | GET ALL CUSTOMER
            | SP: SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = 1
            |--------------------------------------------------------------------------
            */
            if ($id == 'getAllCustomer') {

                $data = DB::connection('ConnKCNSales')
                    ->table('T_CUSTOMER')
                    ->select([
                        DB::raw("NAMACUST + ' (' + KotaKirim + ')' AS NamaCust"),
                        DB::raw("JNSCUST + ' -' + IDCUST AS IDCust")
                    ])
                    ->whereNotNull('NAMACUST')
                    ->where('IsActive', 1)
                    ->orderBy('NAMACUST')
                    ->orderBy('JNSCUST')
                    ->get();

                $response = [];

                foreach ($data as $dataList) {
                    $response[] = [
                        'IDCust'   => $dataList->IDCust,
                        'NamaCust' => $dataList->NamaCust,
                    ];
                }

                return datatables($response)->make(true);
            }


            /*
            |--------------------------------------------------------------------------
            | GET SP BASED ON CUSTOMER
            | SP: SP_1486_SLS_LIST_SP_DO
            |--------------------------------------------------------------------------
            */
            else if ($id == 'getSPBasedOnCustomer') {
                $idCust = $request->input('IdCust');
                $data = DB::connection('ConnKCNSales')
                    ->table('T_Customer as C')
                    ->join(
                        'T_HeaderPesanan as HP',
                        'C.IDCust',
                        '=',
                        'HP.IDCust'
                    )
                    ->join(
                        'T_DetailPesanan as DP',
                        'HP.IDSuratPesanan',
                        '=',
                        'DP.IDSuratPesanan'
                    )
                    ->join(
                        'T_JnsSuratPesanan as JSP',
                        'HP.IDJnsSuratPesanan',
                        '=',
                        'JSP.IDJnsSuratPesanan'
                    )
                    ->select([
                        'HP.IDSuratPesanan',
                        'JSP.JnsSuratPesanan',
                        'HP.Tgl_Pesan',
                        'C.AlamatKirim',
                    ])
                    ->whereNull('DP.Lunas')
                    ->whereNotNull('HP.AccManager')
                    ->where('C.IDCust', $idCust)
                    ->whereNull('HP.Deleted')
                    ->whereNotExists(function ($query) {
                        $query->select(DB::raw(1))
                            ->from('T_HeaderPengiriman as TH')
                            ->whereColumn(
                                'TH.NoSP',
                                'HP.IDSuratPesanan'
                            )
                            ->whereNotNull('TH.BatalSJ');
                    })
                    ->groupBy([
                        'HP.IDSuratPesanan',
                        'HP.Tgl_Pesan',
                        'JSP.JnsSuratPesanan',
                        'C.AlamatKirim',
                    ])
                    ->orderByDesc('HP.IDSuratPesanan')
                    ->get();

                $response = [];

                foreach ($data as $dataList) {
                    $response[] = [
                        'IDSuratPesanan' => $dataList->IDSuratPesanan,
                    ];
                }

                return datatables($response)->make(true);
            }


            /*
            |--------------------------------------------------------------------------
            | GET JENIS SURAT JALAN
            | SP: SP_1486_SLS_LIST_JENIS_SJ
            |--------------------------------------------------------------------------
            */
            else if ($id == 'getJenisSJ') {

                $data = DB::connection('ConnKCNSales')
                    ->table('T_JnsSuratJalan')
                    ->select([
                        'NamaJnsSuratJalan',
                        'IDJnsSuratJalan',
                    ])
                    ->where('IDJnsSuratJalan', '<>', 5)
                    ->get();

                $response = [];

                foreach ($data as $dataList) {
                    $response[] = [
                        'NamaJnsSuratJalan' => $dataList->NamaJnsSuratJalan,
                        'IDJnsSuratJalan'   => $dataList->IDJnsSuratJalan,
                    ];
                }

                return datatables($response)->make(true);
            }


            /*
            |--------------------------------------------------------------------------
            | ID TIDAK DIKENAL
            |--------------------------------------------------------------------------
            */
            return response()->json([
                'error' => 'Request tidak dikenali.'
            ], 404);

        } catch (Exception $ex) {

            return response()->json([
                'error' => $ex->getMessage()
            ], 500);
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
