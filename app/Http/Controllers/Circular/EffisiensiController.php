<?php

namespace App\Http\Controllers\Circular;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class EffisiensiController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        return view('Circular.laporanCircular.Effisiensi', compact('access'));
    }
    public function create()
    {
        //
    }
    public function store(Request $request)
    {
        //
    }
    public function show(Request $request, $id)
    {
        if ($id == 'prosesLapEffisiensi') {
            // // Jalankan SP_Proses_LapEffisiensi @Kode = 1, @Tanggal = request('Tanggal')
            // DB::connection('ConnCircular')->statement("
            // EXEC Sp_Proses_LapEffisiensi 
            // @Kode = 1, 
            // @Tanggal = ?
            // ", [$request->tanggal]);

            // // Jalankan SP_Proses_LapEffisiensi @Kode = 2
            // DB::connection('ConnCircular')->statement("
            // EXEC Sp_Proses_LapEffisiensi 
            // @Kode = 2
            // ");

            $tanggal = $request->tanggal;
            try {
                DB::connection('ConnCircular')->transaction(function () use ($tanggal) {

                    // 1️⃣ Hapus data lama di T_Laporan_Eff
                    DB::connection('ConnCircular')
                        ->table('T_Laporan_Eff')
                        ->delete();

                    // 2️⃣ Ambil data awal untuk loop mesin
                    $rows = DB::connection('ConnCircular')
                        ->table('INF_Effisiensi as a')
                        ->join('T_Group as b', 'a.Id_Group', '=', 'b.Id_Group')
                        ->select(
                            'a.Nama_mesin',
                            'a.Id_order',
                            'a.Id_Group',
                            'b.Keterangan',
                            'a.A_Rpm',
                            DB::raw('SUM(a.AfalanWA) as AfalanWA'),
                            DB::raw('SUM(a.AfalanWE) as AfalanWE')
                        )
                        ->whereDate('a.Tgl_Log', '=', $tanggal)
                        ->where('a.Id_Lokasi', '<>', 4)
                        ->groupBy('a.Nama_mesin', 'a.Id_order', 'a.Id_Group', 'b.Keterangan', 'a.A_Rpm')
                        ->orderBy('a.Nama_mesin')
                        ->get();

                    foreach ($rows as $row) {

                        $NmMesin = $row->Nama_mesin;
                        $IdOrder = $row->Id_order;
                        $IdGroup = $row->Id_Group;
                        $Ket = $row->Keterangan;
                        $Rpm = $row->A_Rpm;
                        $AfalanWA = $row->AfalanWA;
                        $AfalanWE = $row->AfalanWE;
                        $AfalanWA = ($AfalanWA == 0 || $AfalanWA == '.00') ? 0 : round((float) $AfalanWA);
                        $AfalanWE = ($AfalanWE == 0 || $AfalanWE == '.00') ? 0 : round((float) $AfalanWE);

                        // Variabel shift
                        $shifts = ['P', 'S', 'M'];
                        $eff = [];
                        $mtr = [];
                        $rata_ket = [];

                        foreach ($shifts as $shift) {
                            // ambil data eff dan hasil meter per mesin
                            $data = DB::connection('ConnCircular')
                                ->table('INF_Effisiensi')
                                ->where('Tgl_Log', $tanggal)
                                ->where('Shift', $shift)
                                ->where('Nama_mesin', $NmMesin)
                                ->where('Id_order', $IdOrder)
                                ->where('Id_Lokasi', '<>', 4)
                                ->selectRaw('
                                    SUM(Hasil_Meter) as Hasil_Meter,
                                    AVG(Effisiensi) as Effisiensi,
                                    SUM(Hasil_Kg) as Hasil_Kg
                                ')
                                ->first();

                            $eff[$shift] = $data->Effisiensi ?? 0;
                            $mtr[$shift] = $data->Hasil_Meter ?? 0;

                            $sumEff = DB::connection('ConnCircular')
                                ->table('INF_Effisiensi')
                                ->where('Id_Group', $IdGroup)
                                ->where('Shift', $shift)
                                ->where('Tgl_Log', $tanggal)
                                ->where('Effisiensi', '<>', 0)
                                ->where('Id_Lokasi', '<>', 4)
                                ->select(DB::raw('SUM(Effisiensi) as sumEff, COUNT(Effisiensi) as cnt'))
                                ->first();

                            $rata_ket[$shift] = ($sumEff->cnt ?? 0) > 0 ? ($sumEff->sumEff / $sumEff->cnt) : 0;
                        }

                        // Hitung rata-rata
                        $JmlEff = collect([$eff['P'], $eff['S'], $eff['M']])->filter(fn($v) => $v > 0)->count();
                        $RataEff = $JmlEff > 0 ? ($eff['P'] + $eff['S'] + $eff['M']) / $JmlEff : 0;
                        $RataMtr = $JmlEff > 0 && ($mtr['P'] + $mtr['S'] + $mtr['M']) > 0
                            ? ($mtr['P'] + $mtr['S'] + $mtr['M']) / $JmlEff
                            : 0;

                        // Ambil ID_Lap terakhir
                        $IdLap = (DB::connection('ConnCircular')
                            ->table('T_Laporan_Eff')
                            ->max('Id_Lap') ?? 0) + 1;

                        // Insert ke T_Laporan_Eff
                        DB::connection('ConnCircular')
                            ->table('T_Laporan_Eff')
                            ->insert([
                                'Id_Lap' => $IdLap,
                                'Tanggal' => $tanggal,
                                'No_mesin' => $NmMesin,
                                'Id_Order' => $IdOrder,
                                'Eff_P' => $eff['P'],
                                'Mtr_P' => $mtr['P'],
                                'Eff_S' => $eff['S'],
                                'Mtr_S' => $mtr['S'],
                                'Eff_M' => $eff['M'],
                                'Mtr_M' => $mtr['M'],
                                'Rata_Eff' => $RataEff,
                                'Rata_Mtr' => $RataMtr,
                                'Tot_Mtr' => $mtr['P'] + $mtr['S'] + $mtr['M'],
                                'Ket' => $Ket,
                                'Rata_KetP' => $rata_ket['P'],
                                'Rata_KetS' => $rata_ket['S'],
                                'Rata_KetM' => $rata_ket['M'],
                                'Rpm' => $Rpm,
                                'AfalanWA' => $AfalanWA,
                                'AfalanWE' => $AfalanWE,
                            ]);
                    }

                    // 3️⃣ Hitung rata-rata SO/ST (bagian akhir SP)
                    $TEff = [];
                    $TBagi = [];
                    $rata = [];

                    foreach (['P', 'S', 'M'] as $shift) {
                        $sum = DB::connection('ConnCircular')
                            ->table('INF_Effisiensi')
                            ->where('Shift', $shift)
                            ->where('Tgl_Log', $tanggal)
                            ->where('Effisiensi', '<>', 0)
                            ->whereNotIn('Id_Group', ['02', '03'])
                            ->where('Id_Lokasi', '<>', 4)
                            ->select(DB::raw('SUM(Effisiensi) as sumEff, COUNT(Effisiensi) as cnt'))
                            ->first();

                        $TEff[$shift] = $sum->sumEff ?? 0;
                        $TBagi[$shift] = $sum->cnt ?? 0;
                        $rata[$shift] = ($TBagi[$shift] ?? 0) > 0 ? ($TEff[$shift] / $TBagi[$shift]) : 0;
                    }

                    $IdLap = (DB::connection('ConnCircular')
                        ->table('T_Laporan_Eff')
                        ->max('Id_Lap') ?? 0) + 1;

                    DB::connection('ConnCircular')
                        ->table('T_Laporan_Eff')
                        ->insert([
                            'Id_Lap' => $IdLap,
                            'Tanggal' => $tanggal,
                            'Ket' => 'ZZ Terakhir Rata-Rata SO dan ST',
                            'Rata_KetP' => $rata['P'],
                            'Rata_KetS' => $rata['S'],
                            'Rata_KetM' => $rata['M'],
                        ]);

                    // 4️⃣ Update SubEff (rata-rata per Keterangan)
                    $subEffs = DB::connection('ConnCircular')
                        ->table('T_Laporan_Eff')
                        ->select('Ket', DB::raw('SUM(Rata_Eff) as SumEff'), DB::raw('COUNT(*) as Cnt'))
                        ->whereNotNull('Ket')
                        ->where('Rata_Eff', '>', 0)
                        ->groupBy('Ket')
                        ->get();

                    foreach ($subEffs as $s) {
                        $subVal = ($s->Cnt > 0) ? ($s->SumEff / $s->Cnt) : 0;
                        DB::connection('ConnCircular')
                            ->table('T_Laporan_Eff')
                            ->where('Ket', $s->Ket)
                            ->update(['SubEff' => $subVal]);
                    }

                    // 5️⃣ Update EfektivitasMesin
                    $effMesin = DB::connection('ConnCircular')
                        ->table('T_Group as g')
                        ->join('T_Laporan_Eff as l', 'g.Keterangan', '=', 'l.Ket')
                        ->select('g.Id_Group', 'g.JumlahMesin', 'l.Ket', DB::raw('SUM(l.Rata_Eff) as TotalEff'))
                        ->groupBy('g.Id_Group', 'g.JumlahMesin', 'l.Ket')
                        ->get();

                    foreach ($effMesin as $em) {
                        $val = ($em->JumlahMesin ?? 0) > 0 ? ($em->TotalEff / $em->JumlahMesin) : 0;
                        DB::connection('ConnCircular')
                            ->table('T_Laporan_Eff')
                            ->where('Ket', $em->Ket)
                            ->update(['EfektivitasMesin' => $val]);
                    }
                });

                // Ambil data dari view yang dipakai report (vw_lap_eff)
                $data = DB::connection('ConnCircular')
                    ->table('vw_lap_eff')
                    ->get();
                // dd($data);

                return response()->json([
                    'success' => true,
                    'message' => 'Proses laporan efisiensi berhasil dijalankan',
                    'data' => $data
                ]);
            } catch (Exception $e) {
                return response()->json([
                    'error' => $e->getMessage()
                ], 500);
            }
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
