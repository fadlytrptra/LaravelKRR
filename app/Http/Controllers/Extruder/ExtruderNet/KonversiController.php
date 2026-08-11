<?php

namespace App\Http\Controllers\Extruder\ExtruderNet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class KonversiController extends Controller
{
    public function index($form_name, $nama_gedung = null)
    {
        $view_name = 'extruder.Extruder.' . $form_name;
        $form_data = [];

        $id_divisi = "";
        $kode_mesin = "";
        switch ($nama_gedung) {
            case 'B':
                $id_divisi = 'MEX';
                $kode_mesin = 2;
                break;

            case 'D':
                $id_divisi = 'DEX';
                $kode_mesin = 3;
                break;

            default:
                $id_divisi = 'EXT';
                $kode_mesin = 1;
                break;
        }

        switch ($form_name) {
            case 'formKonversiMohon':
                $form_data = [
                    'listKonversi' => $this->getListKonversi($id_divisi),
                    'listMesin' => $this->getListMesin($kode_mesin),
                    'listNoOrder' => $this->getOrdAccBlmSelesai($id_divisi)
                ];
                break;

            default:
                break;
        }

        $form_data['namaGedung'] = $nama_gedung;
        $view_data = [
            'pageName' => 'Extruder',
            'formName' => $form_name,
            'formData' => $form_data,
        ];

        return view($view_name, $view_data);
    }

    #region Konversi - ACC
    public function getListKonvBlmAcc($id_divisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KONV_BLM_ACC @IdDivisi = ?',
            [$id_divisi]
        );

        // @IdDivisi char(3)
    }

    public function getListKonvDetail($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KONV_DETAIL_1 @IdKonversi = ?',
            [$id_konversi]
        );

        // @IdKonversi varchar(14)
    }

    public function getPenyesuaianTransaksi($id_type, $id_type_transaksi)
    {
        return DB::connection('ConnInventory')
            ->table('VW_PRG_5298_EXT_TRANSAKSI')
            ->where('idtypetransaksi', $id_type_transaksi)
            ->where('idtype', $id_type)
            ->whereNull('saatlog')
            ->count();

        // *Query pada SP_5298_EXT_CHECK_PENYESUAIAN_TRANSAKSI
        // *tidak perlu data[0].jumlah, langsung data saja.
        // dd($this->getPenyesuaianTransaksi(5, 06));
    }

    public function getTransaksiKonversi($id_konv_ext)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5409_EXT_DISPLAY_TRANSAKSI_KONVERSI @idkonvext = ?',
            [$id_konv_ext]
        );

        // @idkonvext  varchar(14)
        // dd($this->getTransaksiKonversi('EXT-0000009043'));
    }

    public function getJumlahHutang($id_type, $subkel, $shift, $tgl)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_AMBIL_JUMLAH_HUTANG @idType = ?, @subKel = ?, @shift = ?, @tgl = ?',
            [$id_type, $subkel, $shift, $tgl]
        );

        // @idType char(20), @subKel char(6), @shift char(1), @tgl varchar(10)
        // dd($this->getJumlahHutang('5', 'sub1', 'P', '07-09-23'));
        // dd($this->getJumlahHutang('type3', '123456', 'T', 'is is a '));
    }

    public function updProsesACCKonversi(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_transaksi' => 'required|integer',
                'id_type' => 'required|string',
                'waktu_acc' => 'nullable|string',
                'keluar_primer' => 'required|numeric',
                'keluar_sekunder' => 'required|numeric',
                'keluar_tritier' => 'required|numeric',
                'masuk_primer' => 'required|numeric',
                'masuk_sekunder' => 'required|numeric',
                'masuk_tritier' => 'required|numeric'
            ]);

            DB::connection('ConnInventory')->statement(
                'exec SP_5298_EXT_PROSES_ACC_KONVERSI @XIdTransaksi = ?, @XIdType = ?, @XUserACC = ?, @XWaktuACC = ?, @XKeluarPrimer = ?, @XKeluarSekunder = ?, @XKeluarTritier = ?, @XMasukPrimer = ?, @XMasukSekunder = ?, @XMasukTritier = ?',
                [
                    $validated['id_transaksi'],
                    $validated['id_type'],
                    Auth::user()->NomorUser,
                    $validated['waktu_acc'] ?? null,
                    $validated['keluar_primer'],
                    $validated['keluar_sekunder'],
                    $validated['keluar_tritier'],
                    $validated['masuk_primer'],
                    $validated['masuk_sekunder'],
                    $validated['masuk_tritier']
                ]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function getIdTransInv($id_type, $subkel, $tgl, $shift)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_GET_IDTRANS_INV @idType = ?, @subKel = ?, @tgl = ?, @shift = ?',
            [$id_type, $subkel, $tgl, $shift]
        );

        // @idType char(20), @subKel char(6), @tgl varchar(10), @shift char(1)
        // dd($this->getIdTransInv(1, 123456, 'P', '07-09-23'));
    }

    public function updProsesHutang(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_type' => 'required|string',
                'subkel' => 'required|string',
                'id_inv' => 'required|string'
            ]);

            DB::connection('ConnInventory')->statement(
                'exec SP_5298_EXT_PROSES_UPDATE_HUTANG @idType = ?, @subKel = ?, @idINV = ?, @Pemberi = ?',
                [$validated['id_type'], $validated['subkel'], $validated['id_inv'], Auth::user()->NomorUser]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function updACCMasterKonv(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_konversi' => 'required|string'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_ACC_MASTER_KONVERSI @idkonversi = ?, @useracc = ?',
                [$validated['id_konversi'], Auth::user()->NomorUser]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function updSaldoOrderDetail(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_order' => 'required|string',
                'no_urut_order' => 'required|integer',
                'primer' => 'required|numeric',
                'sekunder' => 'required|numeric',
                'tritier' => 'required|numeric'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_UPDATE_SALDO_ORDER_DETAIL @idorder = ?, @nourutorder = ?, @primer = ?, @sekunder = ?, @tritier = ?',
                [$validated['id_order'], $validated['no_urut_order'], $validated['primer'], $validated['sekunder'], $validated['tritier']]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function getSaldoOrderDetail($id_order, $no_urut_order)
    {
        $order_detail = DB::connection('ConnExtruder')
            ->select('SELECT * FROM OrderDetailEXT WHERE idorder = ? AND nourutorder = ?', [$id_order, $no_urut_order]);

        if (!$order_detail) {
            return response()->json(['error' => 'Order detail not found'], 404);
        }

        // dd($order_detail);

        $order_tritier = $order_detail[0]->JumlahTritier;
        $konversi_tritier = $order_detail[0]->JumlahProduksiTritier;
        $nerror = '';

        if ($konversi_tritier >= $order_tritier) {
            $nerror = 'Order dengan IdOrder: ' . $id_order . ' sudah terpenuhi, terdapat sisa stok sebanyak: ' . ($konversi_tritier - $order_tritier) . '.';
        } else {
            $nerror = 'Order dengan IdOrder: ' . $id_order . ' sudah terpenuhi sebanyak: ' . $konversi_tritier . ' dan sisa order yang belum terpenuhi: ' . ($order_tritier - $konversi_tritier) . '.';
        }

        return response()->json(['nmerror' => $nerror]);

        // *Query SELECT pada SP_5298_EXT_UPDATE_SALDO_ORDER_DETAIL
    }

    public function getOrderStatus($id_order)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5409_EXT_ORDER_STATUS @IdOrder = ?',
            [$id_order]
        );

        // PARAMETER - @IdOrder char(10)
    }
    #endregion

    #region Konversi - Permohonan
    public function getListKomposisiBahan($id_komposisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KOMPOSISI_BAHAN @IdKomposisi = ?',
            [$id_komposisi]
        );

        // @IdKomposisi char(9)
    }

    public function getSatuan($id_type)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_GET_SATUAN @idtype = ?',
            [$id_type]
        );

        // @idtype varchar(20)
    }

    public function getSaldoBarang($id_type)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_SALDO_BARANG @idtype = ?',
            [$id_type]
        );

        // @idtype char(20)
    }

    public function getDataKonversi($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_DATA_KONVERSI @idkonversi = ?',
            [$id_konversi]
        );

        // @idkonversi varchar(14)
    }

    public function getListDetailKonversi($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_DETAIL_KONVERSI_1 @idkonversi = ?',
            [$id_konversi]
        );

        // @idkonversi varchar(14)
    }

    public function getListKonversi($id_divisi, $kode = null, $datetime = null)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KONVERSI @Kode = ?, @iddivisi = ?, @Tanggal = ?',
            [$kode, $id_divisi, $datetime]
        );

        // @Kode int=null, @iddivisi char(3), @Tanggal datetime=null
    }

    public function getIdKonversiInv($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_IDKONVERSI_INV @idkonversi = ?',
            [$id_konversi]
        );

        // @idkonversi varchar(14)
    }

    public function getListMesin($kode)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_MESIN @kode = ?',
            [$kode]
        );

        // @kode integer
    }

    public function getOrdAccBlmSelesai($divisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_ORDER_ACC_BLM_SELESAI @Divisi = ?',
            [$divisi]
        );

        // @Divisi char(3)
    }

    public function getListKomposisi($kode, $id_mesin)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KOMPOSISI @Kode = ?, @idmesin = ?',
            [$kode, $id_mesin]
        );

        // @Kode char(1), @idmesin varchar(5)
    }

    public function getListSpek($id_order)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_SPEK_ORDER @idorder = ?',
            [$id_order]
        );

        // @idorder varchar(10)
    }

    public function getSaldoInv($id_type)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_1003_INV_Saldo_Barang @IdType = ?',
            [$id_type]
        );

        // @IdType char(20)
    }

    public function insTmpTransaksi(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_type_transaksi' => 'required|string',
                'uraian_detail_transaksi' => 'required|string',
                'id_type' => 'required|string',
                'saat_awal_transaksi' => 'required|string',
                'jumlah_keluar_primer' => 'required|numeric',
                'jumlah_keluar_sekunder' => 'required|numeric',
                'jumlah_keluar_tritier' => 'required|numeric',
                'asal_sub_kel' => 'required|string',
                'id_konversi' => 'required|string'
            ]);

            $sp_str = '';
            $primer_str = '';
            $sekunder_str = '';
            $tersier_str = '';
            $subkel_str = '';

            if ($validated['uraian_detail_transaksi'] == 'asal_konversi') {
                $sp_str = 'SP_5298_EXT_INSERT_04_ASALTMPTRANSAKSI';
                $primer_str = '@XJumlahKeluarPrimer';
                $sekunder_str = '@XJumlahKeluarSekunder';
                $tersier_str = '@XJumlahKeluarTritier';
                $subkel_str = '@XAsalSubKel';
            } else if ($validated['uraian_detail_transaksi'] == 'tujuan_konversi') {
                $sp_str = 'SP_5298_EXT_INSERT_04_TUJUANTMPTRANSAKSI';
                $primer_str = '@XJumlahMasukPrimer';
                $sekunder_str = '@XJumlahMasukSekunder';
                $tersier_str = '@XJumlahMasukTritier';
                $subkel_str = '@XTujuanSubKel';
            }

            $id_pemohon = Auth::check() ? Auth::user()->NomorUser : null;

            DB::connection('ConnInventory')->statement(
                'exec ' . $sp_str . ' @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XIdType = ?, @XIdPemohon = ?, @XsaatAwalTransaksi = ?, ' . $primer_str . ' = ?, ' . $sekunder_str . ' = ?, ' . $tersier_str . ' = ?, ' . $subkel_str . ' = ?, @XIdKonversi = ?',
                [
                    $validated['id_type_transaksi'],
                    Str::title(str_replace('_', ' ', $validated['uraian_detail_transaksi'])),
                    $validated['id_type'],
                    $id_pemohon,
                    $validated['saat_awal_transaksi'],
                    $validated['jumlah_keluar_primer'],
                    $validated['jumlah_keluar_sekunder'],
                    $validated['jumlah_keluar_tritier'],
                    $validated['asal_sub_kel'],
                    $validated['id_konversi']
                ]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function insDetailKonversi(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_konversi' => 'required|string',
                'id_type' => 'required|string',
                'jumlah_primer' => 'required|numeric',
                'jumlah_sekunder' => 'required|numeric',
                'jumlah_tritier' => 'required|numeric',
                'presentase' => 'nullable|numeric',
                'id_konversi_inv' => 'required|string'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5409_EXT_INSERT_DETAILKONVERSI @IdKonversi = ?, @IdType = ?, @JumlahPrimer = ?, @JumlahSekunder = ?, @JumlahTritier = ?, @Persentase = ?, @idKonversiInv = ?',
                [$validated['id_konversi'], $validated['id_type'], $validated['jumlah_primer'], $validated['jumlah_sekunder'], $validated['jumlah_tritier'], $validated['presentase'] ?? 0, $validated['id_konversi_inv']]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function insMasterKonversi(Request $request)
    {
        try {
            $validated = $request->validate([
                'tgl' => 'required|date',
                'shift' => 'required|string',
                'awal' => 'required|string',
                'akhir' => 'required|string',
                'mesin' => 'required|string',
                'ukuran' => 'required|numeric',
                'denier' => 'required|numeric',
                'warna' => 'required|string',
                'lot_number' => 'required|string',
                'id_order' => 'required|string',
                'no_urut' => 'required|integer',
                'id_komp' => 'required|string',
                'jam1' => 'required|string',
                'jam2' => 'required|string',
                'divisi' => 'nullable|string'
            ]);

            $divisi = $validated['divisi'] ?? 'EXT';
            $user = Auth::check() ? Auth::user()->NomorUser : null;

            $f_awal = Carbon::today()->format('Y-m-d') . ' ' . $validated['awal'];
            $f_akhir = Carbon::today()->format('Y-m-d') . ' ' . $validated['akhir'];
            $f_ukuran = $validated['ukuran'];
            $f_denier = $validated['denier'];
            $f_lot = $validated['lot_number'];
            $f_jam1 = Carbon::today()->format('Y-m-d') . ' ' . $validated['jam1'];
            $f_jam2 = Carbon::today()->format('Y-m-d') . ' ' . $validated['jam2'];

            if ($divisi === 'MEX') {
                DB::connection('ConnExtruder')->statement(
                    'exec SP_1273_MEX_INSERT_MASTER_KONVERSI @tgl = ?, @shift = ?, @awal = ?, @akhir = ?, @mesin = ?, @ukuran = ?, @denier = ?, @warna = ?, @lotNumber = ?, @idOrder = ?, @noUrut = ?, @idKomp = ?, @jam1 = ?, @jam2 = ?, @user = ?',
                    [$validated['tgl'], $validated['shift'], $f_awal, $f_akhir, $validated['mesin'], $f_ukuran, $f_denier, $validated['warna'], $f_lot, $validated['id_order'], $validated['no_urut'], $validated['id_komp'], $f_jam1, $f_jam2, $user]
                );
            } else {
                $kode = ($divisi === 'DEX') ? 'D' : null;

                DB::connection('ConnExtruder')->statement(
                    'exec SP_5298_EXT_INSERT_MASTER_KONVERSI @tgl = ?, @shift = ?, @awal = ?, @akhir = ?, @mesin = ?, @ukuran = ?, @denier = ?, @warna = ?, @lotNumber = ?, @idOrder = ?, @noUrut = ?, @idKomp = ?, @jam1 = ?, @jam2 = ?, @user = ?, @kode = ?',
                    [$validated['tgl'], $validated['shift'], $f_awal, $f_akhir, $validated['mesin'], $f_ukuran, $f_denier, $validated['warna'], $f_lot, $validated['id_order'], $validated['no_urut'], $validated['id_komp'], $f_jam1, $f_jam2, $user, $kode]
                );
            }

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function getMasterKonversi($divisi = 'EXT')
    {
        try {
            // Pastikan format string yang masuk adalah MEX, DEX, atau EXT
            if (!in_array($divisi, ['MEX', 'DEX', 'EXT'])) {
                $divisi = 'EXT';
            }

            $counter = DB::connection('ConnExtruder')
                ->table('CounterTrans')
                ->where('Divisi', $divisi)
                ->value(DB::raw('IdKonversi'));

            $id = '0000000000' . str_pad($counter, 9, '0', STR_PAD_LEFT);
            $id = $divisi . '-' . substr($id, -10);

            return response()->json(['NoKonversi' => $id]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updListCounter()
    {
        return DB::connection('ConnInventory')->statement(
            'exec SP_5298_EXT_LIST_COUNTER',
            []
        );
    }

    public function getListCounter()
    {
        $id_konversi = DB::connection('ConnInventory')->table('counter')->value('IdKonversi');
        $formatted_id = str_pad($id_konversi, 9, '0', STR_PAD_LEFT);
        return response()->json(['NoKonversi' => $formatted_id]);

        // *Query SELECT pada SP_5298_EXT_LIST_COUNTER
    }

    public function updMasterKonversi(Request $request)
    {
        try {
            $validated = $request->validate([
                'tgl' => 'required|date',
                'shift' => 'required|string',
                'awal' => 'required|string',
                'akhir' => 'required|string',
                'ukuran' => 'required|numeric',
                'denier' => 'required|numeric',
                'warna' => 'required|string',
                'lot_number' => 'required|string',
                'jam1' => 'required|string',
                'jam2' => 'required|string',
                'id_konv' => 'required|string'
            ]);

            $f_awal = Carbon::today()->format('Y-m-d') . ' ' . $validated['awal'];
            $f_akhir = Carbon::today()->format('Y-m-d') . ' ' . $validated['akhir'];
            $f_jam1 = Carbon::today()->format('Y-m-d') . ' ' . $validated['jam1'];
            $f_jam2 = Carbon::today()->format('Y-m-d') . ' ' . $validated['jam2'];

            DB::connection('ConnExtruder')->statement(
                'exec SP_5409_EXT_UPDATE_MASTER_KONVERSI @tgl = ?, @shift = ?, @awal = ?, @akhir = ?, @ukuran = ?, @denier = ?, @warna = ?, @lotNumber = ?, @jam1 = ?, @jam2 = ?, @idkonv = ?',
                [
                    $validated['tgl'],
                    $validated['shift'],
                    $f_awal,
                    $f_akhir,
                    $validated['ukuran'],
                    $validated['denier'],
                    $validated['warna'],
                    $validated['lot_number'],
                    $f_jam1,
                    $f_jam2,
                    $validated['id_konv']
                ]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function delDetailKonversi(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_konversi' => 'required|string',
                'id_konv_inv' => 'required|string'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5409_EXT_DELETE_DETAIL_KONVERSI @idkonversi = ?, @idkonvInv = ?',
                [$validated['id_konversi'], $validated['id_konv_inv']]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function delKonversi($id_konversi)
    {
        try {
            DB::connection('ConnExtruder')->statement(
                'exec SP_5409_EXT_DELETE_KONVERSI @idkonversi = ?',
                [$id_konversi]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
    #endregion
}
