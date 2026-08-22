<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratJalan;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use DB;
use Auth;

class BatalSuratJalanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Transaksi.SuratJalan.BatalSJ', compact('access'));
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
            if ($id == 'getAllCustomer') {
                $data = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
                $response = [];
                foreach ($data as $dataList) {
                    $response[] = [
                        'IDCust' => $dataList->IDCust,
                        'NamaCust' => $dataList->NamaCust,
                    ];
                }
                return datatables($response)->make(true);
            } else if ($id == 'getSPBasedOnCustomer') {
                $data = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_DO @IdCust = ?', [$request->input('IdCust')]);
                $response = [];
                foreach ($data as $dataList) {
                    $response[] = [
                        'IDSuratPesanan' => $dataList->IDSuratPesanan,
                    ];
                }
                return datatables($response)->make(true);
            } else if ($id == 'getJenisSJ') {
                $data = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JENIS_SJ');
                $response = [];
                foreach ($data as $dataList) {
                    $response[] = [
                        'NamaJnsSuratJalan' => $dataList->NamaJnsSuratJalan,
                        'IDJnsSuratJalan' => $dataList->IDJnsSuratJalan,
                    ];
                }
                return datatables($response)->make(true);
            }
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
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
