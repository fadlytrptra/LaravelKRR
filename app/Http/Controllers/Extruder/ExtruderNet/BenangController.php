<?php

namespace App\Http\Controllers\Extruder\ExtruderNet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class BenangController extends Controller
{
    public function index($form_name, $nama_gedung = null)
    {
        $view_name = 'extruder.Extruder.' . $form_name;
        $form_data = [];

        switch ($form_name) {
            case 'formBenangMohon':
                $current_date = Carbon::now();
                $formatted_date = $current_date->format('Y-m-d');

                $form_data = [
                    'listNomor' => $this->getKoreksiSortirNGBlmAcc($formatted_date),
                    'listKelut' => $this->getKelompokUtama_IdObjek('032', '3'),
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

    #region Benang - ACC
    public function getListIdKonversiNG($tanggal1, $tanggal2, $kode = null)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_IDKONVERSI_NG @Tanggal1 = ?, @Tanggal2 = ?, @kode = ?',
            [$tanggal1, $tanggal2, $kode]
        );

        // @Tanggal1 datetime, @Tanggal2 datetime, @kode char(1) = null
    }

    public function getDetailDataBenangNG($id_konversi_ng)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_DETAILDATA_BENANG_NG @IdKonversiNG = ?',
            [$id_konversi_ng]
        );

        // @IdKonversiNG int
        // IdKonversiNG = 1, 2, 3, 4, 5

        /**
         * VW_PRG_5298_EXT_DETAILDATA_BENANG_NG
         * - INVENTORY.dbo.VW_PRG_5298_EXT_SUBKEL
         * - INVENTORY.dbo.VW_PRG_5298_EXT_TYPE
         * - INVENTORY.dbo.VW_PRG_5298_EXT_TMPTRANSAKSI
         * - VW_PRG_5298_EXT_KONVERSI_SORTIR
         * => WHERE VW_PRG_5298_EXT_KONVERSI_SORTIR.SaatLog IS NULL
         *
         * INVENTORY.dbo.VW_PRG_5298_EXT_SUBKEL
         * Divisi - Objek - KelompokUtama - Kelompok - SubKelompok
         *
         * INVENTORY.dbo.VW_PRG_5298_EXT_TYPE
         * Type
         *
         * INVENTORY.dbo.VW_PRG_5298_EXT_TMPTRANSAKSI
         * Tmp_Transaksi (FK | IdType - Type, IdTypeTransaksi - TypeTransaksi)
         *
         * VW_PRG_5298_EXT_KONVERSI_SORTIR
         * DetailKonversiNG - IdKonversiNG(MasterKonversiNG)
         */
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

    public function getTransaksiKonversiNG($id_konv_ng)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5409_EXT_DISPLAY_TRANSAKSI_KONVERSI_NG @idkonvNG = ?',
            [$id_konv_ng]
        );

        // @idkonvNG  varchar(14)
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

    public function updACCKonversiNG(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_konversi_ng' => 'required|integer'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_ACC_KONVERSI_NG @IdKonversiNG = ?, @UserAcc = ?',
                [$validated['id_konversi_ng'], Auth::user()->NomorUser]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
    #endregion

    #region Benang - Mohon
    public function getListDataNG($id_konversi, $tanggal)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LISTDATA_NG @IdKonversi = ?, @Tanggal = ?',
            [$id_konversi, $tanggal]
        );

        // @IdKonversi int, @Tanggal datetime

        /**
         * IdKonversiNG, IdKonversiEXT, AwalShift, AkhirShift, NamaKomposisi, Tanggal, IdKonversiINV
         * 1	EXT-0000009013	2023-08-25 12:00:00.000	2023-08-25 23:00:00.000	namaKom1	2023-08-22 00:00:00.000	INV0001
         * 2	EXT-0000009032	2023-08-25 01:00:00.000	2023-08-25 02:00:00.000	namaKom1	2023-08-22 00:00:00.000	INV0002
         * 3	EXT-0000009043	2023-08-25 00:00:00.000	2023-08-25 00:00:00.000	namaKom1	2023-08-22 00:00:00.000	INV0003
         *
         * MasterKonversiEXT.IdKonversi - MasterKonversiNG.IdKonversiEXT
         * (EXT-0000009013, EXT-0000009032, EXT-0000009043)
         *
         * MasterKonversiEXT.IdKomposisi - MasterKomposisi.IdKomposisi
         * (DEX000013)
         *
         * MasterKonversiNG.IdKonversiNG - DetailKonversiNG.IdKonversiNG
         * (1, 2, 3)
         */
    }

    public function getDetailUraianKonvNG($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_DETAILURAIAN_KONV_NG @IdKonversi = ?',
            [$id_konversi]
        );

        // @IdKonversi char(9)

        /**
         * IdKonversiNG, TypeMesin + '/' + Shift, Tanggal
         * 1	type1/P 	2023-08-22 00:00:00.000
         * 2	type1/P 	2023-08-22 00:00:00.000
         * 3	type1/P 	2023-08-22 00:00:00.000
         *
         * MasterKonversiEXT.IdMesin - MasterMesin.IdMesin
         * (M-001, mes01)
         *
         * MasterKonversiEXT.IdKonversi - MasterKonversiNG.IdKonversiEXT
         * (EXT-0000009013, EXT-0000009032, EXT-0000009043)
         *
         * MasterKonversiNG.IdKonversiNG - DetailKonversiNG.IdKonversiNG
         * (1, 2, 3)
         */
    }

    public function getKoreksiSortirNGBlmAcc($tanggal)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_KOREKSI_SORTIRNG_BLMACC @Tanggal = ?',
            [$tanggal]
        );

        // @Tanggal datetime
    }

    public function getListProdNG($no_konv)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_PROD_NG @NoKonv = ?',
            [$no_konv]
        );

        // @NoKonv char(14)
    }

    public function getCekDataNG($kode, $no_konv, $id_type)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_CEK_DATA_NG @kode = ?, @noKonv = ?, @idType = ?',
            [$kode, $no_konv, $id_type]
        );

        // @kode int, @noKonv char(14), @idType varchar(20)
    }

    public function getListIdKonv1($id_divisi, $tanggal, $shift)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_IDKONV @Kode = 1, @IdDivisi = ?, @Tanggal = ?, @Shift = ?',
            [$id_divisi, $tanggal, $shift]
        );

        // @IdDivisi char(3)=null, @Tanggal datetime=null, @Shift char(2)=null
    }

    public function getListIdKonv2($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_IDKONV @kode = 2, @IdKonversi = ?',
            [$id_konversi]
        );
    }

    public function getListIdKonv3($id_konversi, $id_type)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_IDKONV @Kode = 3, @IdKonversi = ?, @idType = ?',
            [$id_konversi, $id_type]
        );

        // @IdKonversi char(14)=null, @idType char(20)=null
        // dd($this->getListIdKonv(3, 'KONV0001', 'type1'));
    }

    public function insMasterKonvNG(Request $request)
    {
        try {
            $validated = $request->validate([
                'tanggal' => 'required|date',
                'id_konversi_ext' => 'required|string'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_INSERT_MASTERKONV_NG @Tanggal = ?, @UserInput = ?, @IdKonversiEXT = ?',
                [$validated['tanggal'], Auth::user()->NomorUser, $validated['id_konversi_ext']]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function getMasterKonversiNG()
    {
        $idKonversiNG = DB::connection('ConnExtruder')
            ->select('SELECT IdKonversiNG FROM MasterKonversiNG ORDER BY IdKonversiNG DESC');

        return $idKonversiNG[0];

        // *Query SELECT pada SP_5298_EXT_INSERT_MASTERKONV_NG
    }

    public function getListCounter()
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_LIST_COUNTER'
        );
    }

    public function insDetailKonvNG(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_konversi_ng' => 'required|integer',
                'id_type' => 'required|string',
                'jumlah_primer' => 'required|numeric',
                'jumlah_sekunder' => 'required|numeric',
                'jumlah_tritier' => 'required|numeric',
                'id_konv_inv' => 'nullable|string'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_INSERT_DETAILKONV_NG @IdKonversiNG = ?, @IdType = ?, @JumlahPrimer = ?, @JumlahSekunder = ?, @JumlahTritier = ?, @IdKonv_Inv = ?',
                [$validated['id_konversi_ng'], $validated['id_type'], $validated['jumlah_primer'], $validated['jumlah_sekunder'], $validated['jumlah_tritier'], $validated['id_konv_inv']]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function insAsalTmpTrans(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_type_transaksi' => 'required|string',
                'uraian_detail_transaksi' => 'required|string',
                'id_type' => 'required|string',
                'saat_awal_transaksi' => 'required|string',
                'jumlah_primer' => 'required|numeric',
                'jumlah_sekunder' => 'required|numeric',
                'jumlah_tritier' => 'required|numeric',
                'asal_sub_kel' => 'required|string',
                'id_konversi' => 'required|string'
            ]);

            DB::connection('ConnInventory')->statement(
                'exec SP_5298_EXT_INSERT_04_ASALTMPTRANSAKSI @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XIdType = ?, @XIdPemohon = ?, @XSaatawalTransaksi = ?, @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XAsalsubKel = ?, @XIdKonversi = ?',
                [
                    $validated['id_type_transaksi'],
                    Str::title(str_replace('_', ' ', $validated['uraian_detail_transaksi'])),
                    $validated['id_type'],
                    Auth::user()->NomorUser,
                    $validated['saat_awal_transaksi'],
                    $validated['jumlah_primer'],
                    $validated['jumlah_sekunder'],
                    $validated['jumlah_tritier'],
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

    public function insTujuanTmpTrans(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_type_transaksi' => 'required|string',
                'uraian_detail_transaksi' => 'required|string',
                'id_type' => 'required|string',
                'saat_awal_transaksi' => 'required|string',
                'jumlah_primer' => 'required|numeric',
                'jumlah_sekunder' => 'required|numeric',
                'jumlah_tritier' => 'required|numeric',
                'tujuan_sub_kel' => 'required|string',
                'id_konversi' => 'required|string'
            ]);

            DB::connection('ConnInventory')->statement(
                'exec SP_5298_EXT_INSERT_04_TUJUANTMPTRANSAKSI @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XIdType = ?, @XIdPemohon = ?, @XSaatawalTransaksi = ?, @XJumlahMasukPrimer = ?, @XJumlahMasukSekunder = ?, @XJumlahMasukTritier = ?, @XtujuansubKel = ?, @XIdKonversi = ?',
                [
                    $validated['id_type_transaksi'],
                    Str::title(str_replace('_', ' ', $validated['uraian_detail_transaksi'])),
                    $validated['id_type'],
                    Auth::user()->NomorUser,
                    $validated['saat_awal_transaksi'],
                    $validated['jumlah_primer'],
                    $validated['jumlah_sekunder'],
                    $validated['jumlah_tritier'],
                    $validated['tujuan_sub_kel'],
                    $validated['id_konversi']
                ]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function updDetailKonvNG(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_konversi' => 'required|integer',
                'id_type' => 'required|string',
                'j_primer' => 'required|numeric',
                'j_sekunder' => 'required|numeric',
                'j_tritier' => 'required|numeric'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_UPDATE_DETAIL_KONV_NG @idkonversi = ?, @idType = ?, @jprimer = ?, @jsekunder = ?, @jtritier = ?',
                [$validated['id_konversi'], $validated['id_type'], $validated['j_primer'], $validated['j_sekunder'], $validated['j_tritier']]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function updTmpTransaksi(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_transaksi' => 'required|integer',
                'uraian_detail_transaksi' => 'required|string',
                'jumlah_keluar_primer' => 'required|numeric',
                'jumlah_keluar_sekunder' => 'required|numeric',
                'jumlah_keluar_tritier' => 'required|numeric',
                'tujuan_sub_kelompok' => 'nullable|string'
            ]);

            DB::connection('ConnInventory')->statement(
                'exec SP_5298_EXT_UPDATE_TMPTRANSAKSI @XIdTransaksi = ?, @XUraianDetailTransaksi = ?, @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XTujuanSubKelompok = ?',
                [
                    $validated['id_transaksi'],
                    Str::title(str_replace('_', ' ', $validated['uraian_detail_transaksi'])),
                    $validated['jumlah_keluar_primer'],
                    $validated['jumlah_keluar_sekunder'],
                    $validated['jumlah_keluar_tritier'],
                    $validated['tujuan_sub_kelompok']
                ]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function delKonversiNG($id_konversi)
    {
        try {
            DB::connection('ConnExtruder')->statement(
                'exec SP_5409_EXT_DELETE_KONVERSI_NG @idkonversi = ?',
                [$id_konversi]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
    #endregion

    #region Form Rincian Konversi
    public function getKelompokUtama_IdObjek($id_objek_kelompok_utama, $type = null)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDOBJEK_KELOMPOKUTAMA @Xidobjek_kelompokutama = ?, @Type = ?',
            [$id_objek_kelompok_utama, $type]
        );

        // dd($this->getIdObjKelUtama("032", "3"));
        // @Xidobjek_kelompokutama  varchar(4), @Type char(1) = null
    }

    public function getKelompok_IdKelut($id_kelompok_utama_kelompok, $type = null)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDKELOMPOKUTAMA_KELOMPOK @XIdKelompokUtama_Kelompok = ?, @type = ?',
            [$id_kelompok_utama_kelompok, $type]
        );

        // @XIdKelompokUtama_Kelompok    char (4), @type char(1)=null
    }

    public function getSubKelompok_IdKelompok($id_kelompok_sub_kelompok)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?',
            [$id_kelompok_sub_kelompok]
        );

        // @XIdKelompok_SubKelompok    char (6)
    }

    public function getType_IdSubkel($id_sub_kelompok_type)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDSUBKELOMPOK_TYPE @XIdSubKelompok_Type = ?',
            [$id_sub_kelompok_type]
        );

        // @XIdSubKelompok_Type     char (6)
    }

    public function getSaldoBarang($id_type)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_SALDO_BARANG @IdType = ?',
            [$id_type]
        );

        // @IdType char(20)
    }
    #endregion
}
