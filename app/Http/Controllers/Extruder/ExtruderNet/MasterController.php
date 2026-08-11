<?php

namespace App\Http\Controllers\Extruder\ExtruderNet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class MasterController extends Controller
{
    public function index($form_name, $nama_gedung = null)
    {
        $view_name = 'extruder.Extruder.' . $form_name;
        $form_data = [];

        switch ($form_name) {
            case 'formKomposisiTropodo':
                $form_data = [
                    'listKomposisi' => $this->getListKomposisi('EXT'),
                    'listMesin' => $this->getListMesin(1),
                    'listObjek' => $this->getIdDivisiObjek('EXT')
                ];
                break;

            case 'formKomposisiMojosari':
                $id_hasil = $nama_gedung == "D" ? 2250 : 1994;
                $id_afalan = $nama_gedung == "D" ? 2251 : 1976;
                $id_komposisi = $nama_gedung == "D" ? 'DEX' : 'MEX';
                $kode_mesin = $nama_gedung == "D" ? 3 : 2;

                $form_data = [
                    'listKomposisi' => $this->getListKomposisi($id_komposisi),
                    'listMesin' => $this->getListMesin($kode_mesin),
                    'listAfalan' => $this->getPrgTypeProduksi(1, $id_afalan),
                    'listObjek' => $this->getIdDivisiObjek($id_komposisi),
                    'listHP' => $this->getPrgTypeProduksi(2, $id_hasil),
                    'listNG' => $this->getPrgTypeProduksi(3, $id_hasil)
                ];
                break;

            case 'formKiteEstimasi':
                $form_data = ['listBarang' => $this->getKiteExtruder(2)];
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

    #region KITE
    public function getCekBahanKite($kode)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_1273_EXT_Cek_Bahan_KITE @Kode = ?',
            [$kode]
        );

        // @Kode char(1)
    }

    public function getKiteExtruder($kode, $tgl_start = null, $kode_barang = null, $jenis_fas = null, $bahan_pp = null, $benang = null, $meter = null, $roll = null, $meter_awal = null, $hasil = null, $id_order = null, $caco3 = null)
    {
        // Hanya SELECT untuk route GET ini
        return DB::connection('ConnExtruder')->select(
            'exec SP_1273_EXT_KITE @Kode = ?, @TglStart = ?, @KodeBarang = ?, @JenisFas = ?, @BahanPP = ?, @Benang = ?, @Meter = ?, @Roll = ?, @MeterAwal = ?, @Hasil = ?, @IdOrder = ?, @CaCO3 = ?',
            [$kode, $tgl_start, $kode_barang, $jenis_fas, $bahan_pp, $benang, $meter, $roll, $meter_awal, $hasil, $id_order, $caco3]
        );
    }

    public function insKiteExtruder(Request $request)
    {
        try {
            $validated = $request->validate([
                'kode' => 'required|string',
                'tgl_start' => 'nullable|date',
                'kode_barang' => 'nullable|string',
                'jenis_fas' => 'nullable|string',
                'bahan_pp' => 'nullable|numeric',
                'benang' => 'nullable|numeric',
                'meter' => 'nullable|numeric',
                'roll' => 'nullable|numeric',
                'meter_awal' => 'nullable|numeric',
                'hasil' => 'nullable|numeric',
                'id_order' => 'nullable|integer',
                'caco3' => 'nullable|numeric'
            ]);
            extract($validated);

            // Eksekusi insert/update
            DB::connection('ConnExtruder')->statement(
                'exec SP_1273_EXT_KITE @Kode = ?, @TglStart = ?, @KodeBarang = ?, @JenisFas = ?, @BahanPP = ?, @Benang = ?, @Meter = ?, @Roll = ?, @MeterAwal = ?, @Hasil = ?, @IdOrder = ?, @CaCO3 = ?',
                [$kode, $tgl_start ?? null, $kode_barang ?? null, $jenis_fas ?? null, $bahan_pp ?? null, $benang ?? null, $meter ?? null, $roll ?? null, $meter_awal ?? null, $hasil ?? null, $id_order ?? null, $caco3 ?? null]
            );
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function getKiteExtOrder($kode, $id_order)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_1273_EXT_KITE @Kode = ?, @IdOrder = ?',
            [$kode, $id_order]
        );
    }

    public function insKiteExtruder7(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_order' => 'required|integer',
                'tgl_start' => 'required|date',
                'bahan_pp' => 'required|numeric',
                'caco3' => 'required|numeric',
                'benang' => 'required|numeric'
            ]);
            extract($validated);

            DB::connection('ConnExtruder')->statement(
                'exec SP_1273_EXT_KITE @Kode = 7, @IdOrder = ?, @TglStart = ?, @BahanPP = ?, @CaCO3 = ?, @Benang = ?',
                [$id_order, $tgl_start, $bahan_pp, $caco3, $benang]
            );
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
    #endregion

    #region Mojosari
    public function getListKomposisiBahanMjs($id_komposisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_1273_EXT_LIST_KOMPOSISI_BAHAN @IdKomposisi = ?',
            [$id_komposisi]
        );

        // @IdKomposisi char(9)
    }

    public function getCekJumlahKomposisi($kode, $id_komposisi, $id_kelompok = null, $jns = null, $persentase = null)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_1273_MEX_CEK_JumlahKomposisi @Kode = ?, @IdKomposisi = ?, @IdKelompok = ?, @Jns = ?, @persentase = ?',
            [$kode, $id_komposisi, $id_kelompok, $jns, $persentase]
        );

        // @Kode char(1), @IdKomposisi char(9), @IdKelompok char(4) = null, @Jns char(3) = null, @persentase numeric(9,2) = null
    }

    public function getPrgBomBarang($kode, $kode_barang = null, $id_komposisi = null, $id_kelompok = null, $id_divisi = null, $mesin = null)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_1273_PRG_BOM_Barang @Kode = ?, @KodeBarang  = ?, @IdKomposisi = ?, @IdKelompok = ?, @IdDivisi = ?, @Mesin = ?',
            [$kode, $kode_barang, $id_komposisi, $id_kelompok, $id_divisi, $mesin]
        );

        // @Kode char(2), @KodeBarang  char(9) = null, @IdKomposisi char(9) = null, @IdKelompok char(6) = null, @IdDivisi char(3) = null, @Mesin varchar(50) = null
    }


    public function insKomposisiBahanMjs(Request $request)
    {
        try {
            $validated = $request->validate([
                'kode' => 'required|string',
                'id_komposisi' => 'required|string',
                'id_type' => 'nullable|string',
                'kd_brg' => 'nullable|string',
                'id_divisi' => 'nullable|string',
                'persentase' => 'nullable|numeric',
                'primer' => 'nullable|numeric',
                'sekunder' => 'nullable|numeric',
                'tritier' => 'nullable|numeric',
                'cadangan' => 'nullable|numeric',
                'tmp_tritir' => 'nullable|numeric',
                'id_type1' => 'nullable|string',
            ]);

            extract($validated);

            $userId = Auth::user()->User_id ?? Auth::user()->id ?? 'SYSTEM';

            if ($kode == "3") {
                $result = DB::connection('ConnInventory')->select(
                    'exec SP_1273_MEX_INSERT_KOMPOSISI_BAHAN @Kode = ?, @IdKomposisi = ?, @IdType = ?, @KdBrg = ?, @IdDivisi = ?, @Persentase = ?, @Primer = ?, @Sekunder = ?, @Tritier = ?, @Cadangan = ?, @TmpTritir = ?, @IdType1 = ?',
                    [$kode, $id_komposisi, $id_type ?? null, $kd_brg ?? null, $id_divisi ?? null, $persentase ?? null, $primer ?? null, $sekunder ?? null, $tritier ?? null, $cadangan ?? null, $tmp_tritir ?? null, $id_type1 ?? null]
                );
                return response()->json(['status' => 'success', 'data' => $result]);
            } else {
                DB::connection('ConnInventory')->statement(
                    'exec SP_1273_MEX_INSERT_KOMPOSISI_BAHAN @Kode = ?, @IdKomposisi = ?, @IdType = ?, @KdBrg = ?, @IdDivisi = ?, @Persentase = ?, @Primer = ?, @Sekunder = ?, @Tritier = ?, @Cadangan = ?, @TmpTritir = ?, @IdType1 = ?',
                    [$kode, $id_komposisi, $id_type ?? null, $kd_brg ?? null, $id_divisi ?? null, $persentase ?? null, $primer ?? null, $sekunder ?? null, $tritier ?? null, $cadangan ?? null, $tmp_tritir ?? null, $id_type1 ?? null]
                );
                return response()->json(['status' => 'success']);
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function delKomposisiBahanMjs($id_komposisi)
    {
        try {
            DB::connection('ConnExtruder')->statement(
                'exec SP_1273_MEX_DELETE_KOMPOSISI_BAHAN @idkomposisi = ?',
                [$id_komposisi]
            );
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function getPrgTypeProduksi($kode, $id_kelut)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_1273_PRG_TypeProduksi @Kode = ?, @IdKelut = ?',
            [$kode, $id_kelut]
        );

        // @Kode char(1), @IdKelut  char(4)
    }
    #endregion

    #region Tropodo
    public function getListKomposisiBahan($id_komposisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KOMPOSISI_BAHAN @IdKomposisi = ?',
            [$id_komposisi]
        );

        // @IdKomposisi char(9)
    }

    public function getDetailBahan($id_type)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_DETAIL_BAHAN @idtype = ?',
            [$id_type]
        );

        // @idtype varchar(20)
    }

    public function getListKomposisi($id_divisi, $id_komposisi = null)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KOMPOSISI_1 @iddivisi = ?, @idkomposisi = ?',
            [$id_divisi, $id_komposisi]
        );

        // @iddivisi char(3), @idkomposisi char(9) = null
    }

    public function getListMesin($kode)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_MESIN @kode = ?',
            [$kode]
        );

        // @kode integer
    }

    public function getIdDivisiObjek($id_divisi)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDDIVISI_OBJEK @XIdDivisi_Objek = ?',
            [$id_divisi]
        );

        // @XIdDivisi_Objek     char (3)
    }

    public function getIdObjekKelompokUtama($id_objek, $type = null)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDOBJEK_KELOMPOKUTAMA @Xidobjek_kelompokutama = ?, @Type = ?',
            [$id_objek, $type]
        );

        // @Xidobjek_kelompokutama  varchar(4), @Type char(1) = null
    }

    public function getIdKelompokUtamaKelompok($id_kelompok_utama, $type = null)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDKELOMPOKUTAMA_KELOMPOK @XIdKelompokUtama_Kelompok = ?, @type = ?',
            [$id_kelompok_utama, $type]
        );

        // @XIdKelompokUtama_Kelompok    char (4), @type char(1)=null
    }

    public function getCekKelompokMesin($id_kel)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_CEK_KELOMPOK_MESIN @idkel = ?',
            [$id_kel]
        );

        // @idkel char(4)
    }

    public function getIdKelompokSubKelompok($id_kelompok)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?',
            [$id_kelompok]
        );

        // @XIdKelompok_SubKelompok    char (6)
    }

    public function getIdSubKelompokType($id_sub_kelompok)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDSUBKELOMPOK_TYPE @XIdSubKelompok_Type = ?',
            [$id_sub_kelompok]
        );

        // @XIdSubKelompok_Type     char (6)
    }

    public function getCekKonversi($id_komposisi, $id_type)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5409_EXT_CEK_KONVERSI @idkomposisi = ?, @idtype = ?',
            [$id_komposisi, $id_type]
        );

        // @idkomposisi char(9), @idtype char(20)
    }

    public function getIdMesin($id_kel)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_IDMESIN @idkel = ?',
            [$id_kel]
        );

        // @idkel char(4)
    }

    public function delKomposisiBahan1($id_komposisi, $id_type)
    {
        try {
            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_DELETE_KOMPOSISI_BAHAN_1 @idkomposisi = ?, @idtype = ?',
                [$id_komposisi, $id_type]
            );
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function insKomposisiBahan(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_komposisi' => 'required|string',
                'id_objek' => 'required|string',
                'nama_objek' => 'required|string',
                'id_kelompok_utama' => 'required|string',
                'nama_kelompok_utama' => 'required|string',
                'id_kelompok' => 'required|string',
                'nama_kelompok' => 'required|string',
                'id_sub_kelompok' => 'required|string',
                'nama_sub_kelompok' => 'required|string',
                'id_type' => 'required|string',
                'nama_type' => 'required|string',
                'kd_brg' => 'nullable|string',
                'jumlah_primer' => 'required|numeric',
                'sat_primer' => 'nullable|string',
                'jumlah_sekunder' => 'required|numeric',
                'sat_sekunder' => 'nullable|string',
                'jumlah_tritier' => 'required|numeric',
                'sat_tritier' => 'nullable|string',
                'persentase' => 'required|numeric',
                'status_type' => 'required|string',
                'cadangan' => 'nullable|numeric'
            ]);

            extract($validated);
            $cadangan = $cadangan ?? 0;

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_INSERT_KOMPOSISI_BAHAN @IdKomposisi = ?, @IdObjek = ?, @NamaObjek = ?, @IdKelompokUtama = ?, @NamaKelompokUtama = ?, @IdKelompok = ?, @NamaKelompok = ?, @IdSubKelompok = ?, @NamaSubKelompok = ?, @IdType = ?, @NamaType = ?, @KdBrg = ?, @JumlahPrimer = ?, @SatPrimer = ?, @JumlahSekunder = ?, @SatSekunder = ?, @JumlahTritier = ?, @SatTritier = ?, @Persentase = ?, @StatusType = ?, @Cadangan = ?',
                [$id_komposisi, $id_objek, str_replace('_', ' ', str_replace('/', '~', $nama_objek)), $id_kelompok_utama, str_replace('_', ' ', str_replace('/', '~', $nama_kelompok_utama)), $id_kelompok, str_replace('_', ' ', str_replace('/', '~', $nama_kelompok)), $id_sub_kelompok, str_replace('_', ' ', str_replace('/', '~', $nama_sub_kelompok)), $id_type, str_replace('_', ' ', str_replace('/', '~', $nama_type)), $kd_brg ?? null, $jumlah_primer, $sat_primer ?? null, $jumlah_sekunder, $sat_sekunder ?? null, $jumlah_tritier, $sat_tritier ?? null, $persentase, $status_type, $cadangan]
            );
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function delKomposisiBahan($id_komposisi)
    {
        try {
            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_DELETE_KOMPOSISI_BAHAN @idkomposisi = ?',
                [$id_komposisi]
            );
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function insMasterKomposisi(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama_komposisi' => 'required|string|max:100',
                'id_mesin' => 'required|string',
                'id_divisi' => 'required|string',
                'user' => 'nullable|string'
            ]);

            extract($validated);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_INSERT_MASTER_KOMPOSISI @NamaKomposisi = ?, @idmesin = ?, @iddivisi = ?, @user = ?',
                [str_replace('~', '/', strtoupper(str_replace('_', ' ', $nama_komposisi))), $id_mesin, $id_divisi, Auth::user()->NomorUser]
            );
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function getMasterKomposisi($id_divisi)
    {
        $mCounter = DB::connection('ConnExtruder')
            ->table('CounterTrans')
            ->where('divisi', $id_divisi)
            ->value(DB::raw('ISNULL(MAX(IdKomposisi), 0) + 1'));

        $mCode = str_pad($mCounter, 9, '0', STR_PAD_LEFT);
        $mCode = $id_divisi . substr($mCode, -6);

        return response()->json(['NoKomposisi' => $mCode]);

        // *Query SELECT pada SP_5298_EXT_INSERT_MASTER_KOMPOSISI
    }

    public function updIdKomposisiCounter(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_divisi' => 'required|string'
            ]);
            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_UPDATE_IDKOMPOSISI_COUNTER @iddivisi = ?',
                [$validated['id_divisi']]
            );
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function getCekKomposisi($id)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_CEK_KOMPOSISI @id = ?',
            [$id]
        );

        // @id char(9)
    }

    public function delMasterKomposisi($id_komposisi)
    {
        try {
            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_DELETE_MASTER_KOMPOSISI @idkomposisi = ?',
                [$id_komposisi]
            );
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
    #endregion
}
