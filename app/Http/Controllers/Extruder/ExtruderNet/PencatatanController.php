<?php

namespace App\Http\Controllers\Extruder\ExtruderNet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Carbon;

class PencatatanController extends Controller
{
    public function index($form_name, $nama_gedung = null)
    {
        $view_name = 'extruder.Extruder.' . $form_name;
        $form_data = [];

        $id_divisi = "";
        $kode_mesin = "";
        switch ($nama_gedung) {
            case 'D':
                $id_divisi = 'DEX';
                $kode_mesin = 3;
                break;

            default:
                $id_divisi = 'EXT';
                $kode_mesin = 1;
                break;
        }

        if ($nama_gedung == "D") {
            return redirect('/Extruder/Extruder')
                ->with('info', 'Maaf, sementara fitur Pencatatan dan Perawatan hanya dapat dilakukan pada gedung Tropodo.');
        }

        switch ($form_name) {
            case 'formCatatGangguan':
                $form_data = [
                    'listMesin' => $this->getListMesin($kode_mesin),
                    'listGangguan' => $this->getListGangguan(),
                ];
                break;

            case 'formCatatDaya':
                $form_data = ['listMesin' => $this->getListMesin($kode_mesin)];
                break;

            case 'formCatatEffisiensi':
                $form_data = ['listMesin' => $this->getListMesin($kode_mesin)];
                break;

            case 'formCatatPerawatan':
                $form_data = [
                    'listPerawatan' => $this->getListJnsPerawatan($id_divisi),
                    'listMesin' => $this->getListMesin($kode_mesin),
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

    #region Perawatan
    public function getListJnsPerawatan($id_divisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_JNS_PERAWATAN @IdDivisi = ?',
            [$id_divisi]
        );

        // @IdDivisi char(3)
    }

    public function getListWinder($id_perawatan = null, $id_mesin = null)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_WINDER @idperawatan = ?, @idmesin = ?',
            [$id_perawatan, $id_mesin]
        );

        // @idperawatan int =null, @idmesin varchar(5) =null
    }

    public function getJenisGangguan($id_perawatan)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_JENIS_GANGGUAN @IdPerawatan = ?',
            [$id_perawatan]
        );

        // @IdPerawatan int
    }

    public function insPerawatan(Request $request)
    {
        try {
            $validated = $request->validate([
                'tanggal' => 'required|date',
                'shift' => 'required|string|max:1',
                'waktu' => 'required|string|max:15',
                'id_perawatan' => 'required|integer',
                'id_mesin' => 'required|string|max:5',
                'no_winder' => 'required|string|max:5',
                'gangguan' => 'required|string|max:200',
                'sebab' => 'required|string|max:200',
                'solusi' => 'required|string|max:200',
                'mulai' => 'required|string',
                'selesai' => 'required|string',
                'id_gangguan' => 'nullable|integer'
            ]);

            $userId = Auth::user()->NomorUser;

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_INSERT_PERAWATAN @tanggal = ?, @userId = ?, @shift = ?, @waktu = ?, @IdPerawatan = ?, @idmesin = ?, @nowinder = ?, @idGangguan = ?, @gangguan = ?, @sebab = ?, @solusi = ?, @mulai = ?, @selesai = ?, @userinput = ?',
                [
                    $validated['tanggal'],
                    $userId,
                    $validated['shift'],
                    str_replace('_', ' ', $validated['waktu']),
                    $validated['id_perawatan'],
                    $validated['id_mesin'],
                    $validated['no_winder'],
                    $validated['id_gangguan'] ?? null,
                    str_replace('_', ' ', $validated['gangguan']),
                    str_replace('_', ' ', $validated['sebab']),
                    str_replace('_', ' ', $validated['solusi']),
                    $validated['mulai'],
                    $validated['selesai'],
                    $userId
                ]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function updPerawatan(Request $request)
    {
        try {
            $validated = $request->validate([
                'shift' => 'required|string|max:1',
                'waktu' => 'required|string|max:15',
                'id_perawatan' => 'required|integer',
                'id_mesin' => 'required|string|max:5',
                'no_winder' => 'required|string|max:5',
                'gangguan' => 'required|string|max:200',
                'sebab' => 'required|string|max:200',
                'solusi' => 'required|string|max:200',
                'mulai' => 'required|string',
                'selesai' => 'required|string',
                'kode' => 'required|integer',
                'id_gangguan' => 'nullable|integer'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_UPDATE_PERAWATAN @shift = ?, @waktu = ?, @IdPerawatan = ?, @idmesin = ?, @nowinder = ?, @idGangguan = ?, @gangguan = ?, @sebab = ?, @solusi = ?, @mulai = ?, @selesai = ?, @Kode = ?, @userkoreksi = ?',
                [
                    $validated['shift'],
                    str_replace('_', ' ', $validated['waktu']),
                    $validated['id_perawatan'],
                    $validated['id_mesin'],
                    $validated['no_winder'],
                    $validated['id_gangguan'] ?? null,
                    str_replace('_', ' ', $validated['gangguan']),
                    str_replace('_', ' ', $validated['sebab']),
                    str_replace('_', ' ', $validated['solusi']),
                    $validated['mulai'],
                    $validated['selesai'],
                    $validated['kode'],
                    Auth::user()->NomorUser
                ]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function delPerawatan($kode)
    {
        try {
            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_DELETE_PERAWATAN @Kode = ?',
                [$kode]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
    #endregion


    public function getJenisPenyebab($id_perawatan)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5409_EXT_JENIS_PENYEBAB @IdPerawatan = ?',
            [$id_perawatan]
        );

        // @IdPerawatan int
    }

    public function getJenisPenyelesaian($id_perawatan)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5409_EXT_JENIS_PENYELESAIAN @IdPerawatan = ?',
            [$id_perawatan]
        );

        // @IdPerawatan int
    }

    public function getDataPerawatan($tanggal)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_DATA_PERAWATAN @Tanggal = ?, @userId = ?',
            [$tanggal, Auth::user()->NomorUser]
        );

        // @Tanggal datetime, @userId char(4)
    }
    #endregion

    #region Efisiensi
    public function getListAwalProdEff($tanggal, $no_mesin, $shift)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_AWALPROD_EFF @tanggal = ?, @NoMesin = ?, @Shift = ?',
            [$tanggal, $no_mesin, $shift]
        );

        // @tanggal datetime, @NoMesin char (5), @Shift char(2)
    }

    public function getListEffisiensi($tanggal, $no_mesin, $shift, $awal_produksi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_EFFISIENSI @Tanggal = ?, @NoMesin = ?, @Shift = ?, @AwalProduksi = ?',
            [$tanggal, $no_mesin, $shift, str_replace('T', ' ', $awal_produksi)]
        );

        // @Tanggal datetime, @NoMesin char(5), @Shift char(2), @AwalProduksi datetime
    }

    public function getListIdKonversi($tanggal, $no_mesin, $shift)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_IDKONVERSI @tanggal = ?, @noMesin = ?, @shift = ?',
            [$tanggal, $no_mesin, $shift]
        );

        // @tanggal datetime, @noMesin char(5), @shift char(2)

        /**
         * IdKonversi       NamaKomposisi   SaatLog                 Tanggal                 IdMesin Shift
         * EXT-0000009013	namaKom1	    2023-09-22 00:00:00.000	2023-09-22 00:00:00.000	M-001	P
         * EXT-0000009032	namaKom1	    2023-09-22 00:00:00.000	2023-09-22 00:00:00.000	M-001	P
         * EXT-0000009043	namaKom1	    2023-09-22 00:00:00.000	2023-09-22 00:00:00.000	M-001	P
         * EXT-0000009044	namaKom1	    2023-08-29 00:00:00.000	2023-08-25 00:00:00.000	mes01	P
         * EXT-0000009045	namaKom1	    2023-08-29 00:00:00.000	2023-08-25 00:00:00.000	mes01	P
         */
    }

    public function getCekDataEff($tgl, $mesin, $shift, $awal, $akhir, $id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_CEK_DATA_EFF @tgl = ?, @mesin = ?, @shift = ?, @awal = ?, @akhir = ?, @idkonv = ?',
            [$tgl, $mesin, $shift, str_replace('T', ' ', $awal), str_replace('T', ' ', $akhir), $id_konversi]
        );

        // @tgl datetime, @mesin char(5), @shift char(2), @awal datetime, @akhir datetime, @idkonv varchar(14)
    }

    public function insEff(Request $request)
    {
        try {
            $validated = $request->validate([
                'tanggal' => 'required|date',
                'id_mesin' => 'required|string|max:5',
                'shift' => 'required|string|max:2',
                'awal_produksi' => 'required|string',
                'akhir_produksi' => 'required|string',
                'id_konversi' => 'required|string|max:14',
                'screw_revolution' => 'required|numeric',
                'motor_current' => 'required|numeric',
                'slitter_width' => 'required|numeric',
                'no_of_yarn' => 'required|numeric',
                'water_gap' => 'required|numeric',
                'roll_speed3' => 'required|numeric',
                'stretching_ratio' => 'required|numeric',
                'relax' => 'required|numeric',
                'denier' => 'required|numeric',
                'denier_rata' => 'required|numeric',
                'jam_user' => 'required|string'
            ]);

            $f_jam_user = Carbon::today()->format('Y-m-d') . ' ' . $validated['jam_user'];

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_INSERT_EFF @Tanggal = ?, @IdMesin = ?, @Shift = ?, @AwalProduksi = ?, @AkhirProduksi = ?, @IdKonversi = ?, @ScrewRevolution = ?, @MotorCurrent = ?, @SlitterWidth = ?, @NoOfYarn = ?, @WaterGap = ?, @RollSpeed3 = ?, @StretchingRatio = ?, @Relax = ?, @Denier = ?, @DenierRata = ?, @JamUser = ?, @UserInput = ?',
                [
                    $validated['tanggal'],
                    $validated['id_mesin'],
                    $validated['shift'],
                    $validated['awal_produksi'],
                    $validated['akhir_produksi'],
                    $validated['id_konversi'],
                    $validated['screw_revolution'],
                    $validated['motor_current'],
                    $validated['slitter_width'],
                    $validated['no_of_yarn'],
                    $validated['water_gap'],
                    $validated['roll_speed3'],
                    $validated['stretching_ratio'],
                    $validated['relax'],
                    $validated['denier'],
                    $validated['denier_rata'],
                    $f_jam_user,
                    Auth::user()->NomorUser
                ]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function updEff(Request $request)
    {
        try {
            $validated = $request->validate([
                'tanggal' => 'required|date',
                'id_mesin' => 'required|string|max:5',
                'shift' => 'required|string|max:2',
                'awal_produksi' => 'required|string',
                'akhir_produksi' => 'required|string',
                'id_konversi' => 'required|string|max:14',
                'screw_revolution' => 'required|numeric',
                'motor_current' => 'required|numeric',
                'slitter_width' => 'required|numeric',
                'no_of_yarn' => 'required|numeric',
                'water_gap' => 'required|numeric',
                'roll_speed3' => 'required|numeric',
                'stretching_ratio' => 'required|numeric',
                'relax' => 'required|numeric',
                'denier' => 'required|numeric',
                'denier_rata' => 'required|numeric',
                'jam_user' => 'required|string'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_UPDATE_EFF @Tanggal = ?, @IdMesin = ?, @Shift = ?, @AwalProduksi = ?, @AkhirProduksi = ?, @IdKonversi = ?, @ScrewRevolution = ?, @MotorCurrent = ?, @SlitterWidth = ?, @NoOfYarn = ?, @WaterGap = ?, @RollSpeed3 = ?, @StretchingRatio = ?, @Relax = ?, @Denier = ?, @DenierRata = ?, @JamUser = ?, @UserInput = ?',
                [
                    $validated['tanggal'],
                    $validated['id_mesin'],
                    $validated['shift'],
                    str_replace('T', ' ', $validated['awal_produksi']),
                    str_replace('T', ' ', $validated['akhir_produksi']),
                    $validated['id_konversi'],
                    $validated['screw_revolution'],
                    $validated['motor_current'],
                    $validated['slitter_width'],
                    $validated['no_of_yarn'],
                    $validated['water_gap'],
                    $validated['roll_speed3'],
                    $validated['stretching_ratio'],
                    $validated['relax'],
                    $validated['denier'],
                    $validated['denier_rata'],
                    $validated['jam_user'],
                    Auth::user()->NomorUser
                ]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function delEff(Request $request)
    {
        try {
            $validated = $request->validate([
                'tanggal' => 'required|date',
                'id_mesin' => 'required|string|max:5',
                'shift' => 'required|string|max:2',
                'awal_produksi' => 'required|string',
                'akhir_produksi' => 'required|string'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_DELETE_EFF @Tanggal = ?, @IdMesin = ?, @Shift = ?, @AwalProduksi = ?, @AkhirProduksi = ?',
                [
                    $validated['tanggal'],
                    $validated['id_mesin'],
                    $validated['shift'],
                    str_replace('T', ' ', $validated['awal_produksi']),
                    str_replace('T', ' ', $validated['akhir_produksi'])
                ]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
    #endregion

    #region Daya
    public function getFaktorKali($id_mesin)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_FAKTOR_KALI @idmesin = ?',
            [$id_mesin]
        );

        // @idmesin  varchar(5)
    }

    public function getKwahMesinPerbulan($bulan, $tahun)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_KWAH_MESIN_PERBULAN @bulan = ?, @tahun = ?',
            [$bulan, $tahun]
        );

        // @bulan  varchar(2), @tahun varchar(4)
    }

    public function insKwahMesin(Request $request)
    {
        try {
            $validated = $request->validate([
                'tanggal' => 'required|date',
                'id_mesin' => 'required|string|max:5',
                'jam' => 'required|string',
                'counter' => 'required|numeric',
                'kali' => 'required|numeric',
                'jam_user' => 'required|string'
            ]);

            $f_jam = Carbon::today()->format('Y-m-d') . ' ' . $validated['jam'];
            $f_jam_user = Carbon::today()->format('Y-m-d') . ' ' . $validated['jam_user'];

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_INSERT_KWAH_MESIN @tanggal = ?, @idmesin = ?, @jam = ?, @counter = ?, @kali = ?, @jamuser = ?, @user = ?',
                [
                    $validated['tanggal'],
                    $validated['id_mesin'],
                    $f_jam,
                    $validated['counter'],
                    $validated['kali'],
                    $f_jam_user,
                    Auth::user()->NomorUser
                ]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function updKwahMesin(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_kwah_mesin' => 'required|integer',
                'counter' => 'required|numeric'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_UPDATE_KWAH_MESIN @idkwahmesin = ?, @counter = ?',
                [$validated['id_kwah_mesin'], $validated['counter']]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function delKwahMesin($id_kwah)
    {
        try {
            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_DELETE_KWAH_MESIN @IdKwah = ?',
                [$id_kwah]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function getListDataKwahMesin($bulan, $tahun)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LISTDATA_KWAH_MESIN @bulan = ?, @tahun = ?',
            [$bulan, $tahun]
        );

        // @bulan  varchar(2), @tahun varchar(4)
    }

    public function getKwahMesin($tanggal, $id_divisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_KWAH_MESIN @tanggal = ?, @iddivisi = ?',
            [$tanggal, $id_divisi]
        );

        // @tanggal datetime, @iddivisi char(3)
    }
    #endregion

    #region Gangguan
    public function getListMesin($kode)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_MESIN @kode = ?',
            [$kode]
        );

        // If @kode = 1     SELECT * FROM MasterMesin WHERE IdDivisi='EXT'
        // If @kode = 2     SELECT * FROM MasterMesin WHERE IdDivisi='MEX'
        // If @kode = 3     SELECT * FROM MasterMesin WHERE IdDivisi='DEX'
    }

    public function getListIdKomposisi($tanggal, $id_mesin)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_IDKOMPOSISI @tanggal = ?, @idmesin = ?',
            [$tanggal, $id_mesin]
        );

        // @tanggal datetime, @idmesin varchar(5)
    }

    public function getDisplayShift($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_DISPLAY_SHIFT @IdKonversi = ?',
            [$id_konversi]
        );

        // @IdKonversi Varchar(14)
    }

    public function getListGangguan()
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_GANGGUAN',
            []
        );
    }

    public function getListGangguanProd($bulan, $tahun)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5409_EXT_LIST_GANGGUAN_PROD @Bulan = ?, @Tahun = ?',
            [$bulan, $tahun]
        );

        // @Bulan Numeric(10,2), @Tahun Numeric(10,2)
        // dd($this->getListGangguanProd(8, 2023));
    }

    public function getListShift($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_SHIFT @idkonversi = ?',
            [$id_konversi]
        );

        // @idkonversi char(14)
    }

    public function getNoTrans()
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_NO_TRANS',
            []
        );
    }

    // p  #region Gangguan - Mutasi
    public function insGangguanProd(Request $request)
    {
        try {
            $validated = $request->validate([
                'tanggal' => 'required|date',
                'id_mesin' => 'required|string|max:5',
                'id_gangguan' => 'required|string|max:5',
                'id_konversi' => 'nullable|string|max:14',
                'shift' => 'required|string|max:2',
                'awal' => 'required|string',
                'akhir' => 'required|string',
                'awal_gangguan' => 'required|string',
                'akhir_gangguan' => 'required|string',
                'jumlah_jam' => 'required|numeric',
                'jumlah_menit' => 'required|numeric',
                'status' => 'required|string|max:1',
                'keterangan' => 'required|string|max:100',
                'jam_user' => 'required|string'
            ]);

            $f_jam_user = Carbon::today()->format('Y-m-d') . ' ' . $validated['jam_user'];

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_INSERT_GANGGUAN_PROD @Tanggal = ?, @IdMesin = ?, @IdGangguan = ?, @IdKonversi = ?, @Shift = ?, @Awal = ?, @Akhir = ?, @AwalGangguan = ?, @AkhirGangguan = ?, @JumlahJam = ?, @JumlahMenit = ?, @Status = ?, @Keterangan = ?, @JamUser = ?, @User = ?',
                [
                    $validated['tanggal'],
                    $validated['id_mesin'],
                    $validated['id_gangguan'],
                    $validated['id_konversi'] ?? null,
                    $validated['shift'],
                    str_replace('T', ' ', $validated['awal']),
                    str_replace('T', ' ', $validated['akhir']),
                    str_replace('T', ' ', $validated['awal_gangguan']),
                    str_replace('T', ' ', $validated['akhir_gangguan']),
                    $validated['jumlah_jam'],
                    $validated['jumlah_menit'],
                    $validated['status'],
                    $validated['keterangan'],
                    $f_jam_user,
                    Auth::user()->NomorUser
                ]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function updGangguanProd(Request $request)
    {
        try {
            $validated = $request->validate([
                'no_trans' => 'required|integer',
                'awal' => 'required|string',
                'akhir' => 'required|string',
                'jam' => 'required|numeric',
                'menit' => 'required|numeric',
                'ket' => 'required|string|max:100'
            ]);

            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_UPDATE_GANGGUAN_PROD @NoTrans = ?, @Awal = ?, @Akhir = ?, @Jam = ?, @Menit = ?, @Ket = ?',
                [
                    $validated['no_trans'],
                    str_replace('T', ' ', $validated['awal']),
                    str_replace('T', ' ', $validated['akhir']),
                    $validated['jam'],
                    $validated['menit'],
                    $validated['ket']
                ]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function delGangguanProd($no_trans)
    {
        try {
            DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_DELETE_GANGGUAN_PROD @NoTrans = ?',
                [$no_trans]
            );

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
    #endregion
}
