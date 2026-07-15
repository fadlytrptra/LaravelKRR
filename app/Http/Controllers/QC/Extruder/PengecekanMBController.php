<?php

namespace App\Http\Controllers\QC\Extruder;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class PengecekanMBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        $listTypeMesin = DB::connection('ConnTestQC')
            ->select('EXEC SP_4451_List_Mesin_CL @Kode = ?', [1]);
        $listLokasi = DB::connection('ConnTestQC')
            ->table('Lokasi')
            ->select('idLokasi', 'nama_lokasi')
            ->get();
        // $filtered = array_values(array_filter($listTypeMesin, function ($item) {
        //     return in_array($item->IdType_Mesin, ['13', '17']);
        // }));
        // // dd($filtered);
        // usort($filtered, function ($a, $b) {
        //     return intval($a->IdType_Mesin) - intval($b->IdType_Mesin);
        // });
        // $listLokasi = collect($listLokasi)
        //     ->whereIn('idLokasi', [1])
        //     ->values();
        return view('QC.Extruder.PengecekanMB', compact('access', 'listLokasi'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $proses = $request->input('proses');
        $id_laporan = $request->input('id_laporan');
        $lokasi = $request->input('lokasi');
        $referensi = $request->input('referensi');
        $tanggal_laporan = $request->input('tanggal_laporan');
        $shiftValue = $request->input('shiftValue');
        $timeStart = $request->input('timeStart');
        $timeEnd = $request->input('timeEnd');
        $bahan_pp = $request->input('bahan_pp');
        $ca_co3 = $request->input('ca_co3');
        $uv = $request->input('uv');
        $m_bath = $request->input('m_bath');
        $lot_no = $request->input('lot_no');
        $spek = $request->input('spek');
        $range = $request->input('range');
        $r12D = $request->input('r12D');
        $r12G = $request->input('r12G');
        $r12K = $request->input('r12K');
        $r12E = $request->input('r12E');
        $r12L = $request->input('r12L');
        $r12Ket = $request->input('r12Ket');
        $r11D = $request->input('r11D');
        $r11G = $request->input('r11G');
        $r11K = $request->input('r11K');
        $r11E = $request->input('r11E');
        $r11L = $request->input('r11L');
        $r11Ket = $request->input('r11Ket');
        $r10D = $request->input('r10D');
        $r10G = $request->input('r10G');
        $r10K = $request->input('r10K');
        $r10E = $request->input('r10E');
        $r10L = $request->input('r10L');
        $r10Ket = $request->input('r10Ket');
        $r9D = $request->input('r9D');
        $r9G = $request->input('r9G');
        $r9K = $request->input('r9K');
        $r9E = $request->input('r9E');
        $r9L = $request->input('r9L');
        $r9Ket = $request->input('r9Ket');
        $r8D = $request->input('r8D');
        $r8G = $request->input('r8G');
        $r8K = $request->input('r8K');
        $r8E = $request->input('r8E');
        $r8L = $request->input('r8L');
        $r8Ket = $request->input('r8Ket');
        $r7D = $request->input('r7D');
        $r7G = $request->input('r7G');
        $r7K = $request->input('r7K');
        $r7E = $request->input('r7E');
        $r7L = $request->input('r7L');
        $r7Ket = $request->input('r7Ket');
        $r6D = $request->input('r6D');
        $r6G = $request->input('r6G');
        $r6K = $request->input('r6K');
        $r6E = $request->input('r6E');
        $r6L = $request->input('r6L');
        $r6Ket = $request->input('r6Ket');
        $r5D = $request->input('r5D');
        $r5G = $request->input('r5G');
        $r5K = $request->input('r5K');
        $r5E = $request->input('r5E');
        $r5L = $request->input('r5L');
        $r5Ket = $request->input('r5Ket');
        $r4D = $request->input('r4D');
        $r4G = $request->input('r4G');
        $r4K = $request->input('r4K');
        $r4E = $request->input('r4E');
        $r4L = $request->input('r4L');
        $r4Ket = $request->input('r4Ket');
        $r3D = $request->input('r3D');
        $r3G = $request->input('r3G');
        $r3K = $request->input('r3K');
        $r3E = $request->input('r3E');
        $r3L = $request->input('r3L');
        $r3Ket = $request->input('r3Ket');
        $r2D = $request->input('r2D');
        $r2G = $request->input('r2G');
        $r2K = $request->input('r2K');
        $r2E = $request->input('r2E');
        $r2L = $request->input('r2L');
        $r2Ket = $request->input('r2Ket');
        $r1D = $request->input('r1D');
        $r1G = $request->input('r1G');
        $r1K = $request->input('r1K');
        $r1E = $request->input('r1E');
        $r1L = $request->input('r1L');
        $r1Ket = $request->input('r1Ket');
        $l1D = $request->input('l1D');
        $l1G = $request->input('l1G');
        $l1K = $request->input('l1K');
        $l1E = $request->input('l1E');
        $l1L = $request->input('l1L');
        $l1Ket = $request->input('l1Ket');
        $l2D = $request->input('l2D');
        $l2G = $request->input('l2G');
        $l2K = $request->input('l2K');
        $l2E = $request->input('l2E');
        $l2L = $request->input('l2L');
        $l2Ket = $request->input('l2Ket');
        $l3D = $request->input('l3D');
        $l3G = $request->input('l3G');
        $l3K = $request->input('l3K');
        $l3E = $request->input('l3E');
        $l3L = $request->input('l3L');
        $l3Ket = $request->input('l3Ket');
        $l4D = $request->input('l4D');
        $l4G = $request->input('l4G');
        $l4K = $request->input('l4K');
        $l4E = $request->input('l4E');
        $l4L = $request->input('l4L');
        $l4Ket = $request->input('l4Ket');
        $l5D = $request->input('l5D');
        $l5G = $request->input('l5G');
        $l5K = $request->input('l5K');
        $l5E = $request->input('l5E');
        $l5L = $request->input('l5L');
        $l5Ket = $request->input('l5Ket');
        $l6D = $request->input('l6D');
        $l6G = $request->input('l6G');
        $l6K = $request->input('l6K');
        $l6E = $request->input('l6E');
        $l6L = $request->input('l6L');
        $l6Ket = $request->input('l6Ket');
        $l7D = $request->input('l7D');
        $l7G = $request->input('l7G');
        $l7K = $request->input('l7K');
        $l7E = $request->input('l7E');
        $l7L = $request->input('l7L');
        $l7Ket = $request->input('l7Ket');
        $l8D = $request->input('l8D');
        $l8G = $request->input('l8G');
        $l8K = $request->input('l8K');
        $l8E = $request->input('l8E');
        $l8L = $request->input('l8L');
        $l8Ket = $request->input('l8Ket');
        $l9D = $request->input('l9D');
        $l9G = $request->input('l9G');
        $l9K = $request->input('l9K');
        $l9E = $request->input('l9E');
        $l9L = $request->input('l9L');
        $l9Ket = $request->input('l9Ket');
        $l10D = $request->input('l10D');
        $l10G = $request->input('l10G');
        $l10K = $request->input('l10K');
        $l10E = $request->input('l10E');
        $l10L = $request->input('l10L');
        $l11D = $request->input('l11D');
        $l11G = $request->input('l11G');
        $l11K = $request->input('l11K');
        $l11E = $request->input('l11E');
        $l11L = $request->input('l11L');
        $l12D = $request->input('l12D');
        $l12G = $request->input('l12G');
        $l12K = $request->input('l12K');
        $l12E = $request->input('l12E');
        $l12L = $request->input('l12L');
        $rrD = $request->input('rrD');
        $rrG = $request->input('rrG');
        $rrK = $request->input('rrK');
        $rrE = $request->input('rrE');
        $rrL = $request->input('rrL');
        $user = trim(Auth::user()->NomorUser);
        // dd($request->all());
        try {
            switch ($proses) {
                case 1:
                    // Simpan
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_PengecekanMutuBenangEXT 
                        @kode = ?,
                        @user_input = ?,
                        @lokasi = ?,
                        @referensi = ?,
                        @tanggal_laporan = ?,
                        @shiftValue = ?,
                        @timeStart = ?,
                        @timeEnd = ?,
                        @bahan_pp = ?,
                        @ca_co3 = ?,
                        @uv = ?,
                        @m_bath = ?,
                        @lot_no = ?,
                        @spek = ?,
                        @range = ?,
                        @r12D = ?,
                        @r12G = ?,
                        @r12K = ?,
                        @r12E = ?,
                        @r12L = ?,
                        @r12Ket = ?,
                        @r11D = ?,
                        @r11G = ?,
                        @r11K = ?,
                        @r11E = ?,
                        @r11L = ?,
                        @r11Ket = ?,
                        @r10D = ?,
                        @r10G = ?,
                        @r10K = ?,
                        @r10E = ?,
                        @r10L = ?,
                        @r10Ket = ?,
                        @r9D = ?,
                        @r9G = ?,
                        @r9K = ?,
                        @r9E = ?,
                        @r9L = ?,
                        @r9Ket = ?,
                        @r8D = ?,
                        @r8G = ?,
                        @r8K = ?,
                        @r8E = ?,
                        @r8L = ?,
                        @r8Ket = ?,
                        @r7D = ?,
                        @r7G = ?,
                        @r7K = ?,
                        @r7E = ?,
                        @r7L = ?,
                        @r7Ket = ?,
                        @r6D = ?,
                        @r6G = ?,
                        @r6K = ?,
                        @r6E = ?,
                        @r6L = ?,
                        @r6Ket = ?,
                        @r5D = ?,
                        @r5G = ?,
                        @r5K = ?,
                        @r5E = ?,
                        @r5L = ?,
                        @r5Ket = ?,
                        @r4D = ?,
                        @r4G = ?,
                        @r4K = ?,
                        @r4E = ?,
                        @r4L = ?,
                        @r4Ket = ?,
                        @r3D = ?,
                        @r3G = ?,
                        @r3K = ?,
                        @r3E = ?,
                        @r3L = ?,
                        @r3Ket = ?,
                        @r2D = ?,
                        @r2G = ?,
                        @r2K = ?,
                        @r2E = ?,
                        @r2L = ?,
                        @r2Ket = ?,
                        @r1D = ?,
                        @r1G = ?,
                        @r1K = ?,
                        @r1E = ?,
                        @r1L = ?,
                        @r1Ket = ?,
                        @l1D = ?,
                        @l1G = ?,
                        @l1K = ?,
                        @l1E = ?,
                        @l1L = ?,
                        @l1Ket = ?,
                        @l2D = ?,
                        @l2G = ?,
                        @l2K = ?,
                        @l2E = ?,
                        @l2L = ?,
                        @l2Ket = ?,
                        @l3D = ?,
                        @l3G = ?,
                        @l3K = ?,
                        @l3E = ?,
                        @l3L = ?,
                        @l3Ket = ?,
                        @l4D = ?,
                        @l4G = ?,
                        @l4K = ?,
                        @l4E = ?,
                        @l4L = ?,
                        @l4Ket = ?,
                        @l5D = ?,
                        @l5G = ?,
                        @l5K = ?,
                        @l5E = ?,
                        @l5L = ?,
                        @l5Ket = ?,
                        @l6D = ?,
                        @l6G = ?,
                        @l6K = ?,
                        @l6E = ?,
                        @l6L = ?,
                        @l6Ket = ?,
                        @l7D = ?,
                        @l7G = ?,
                        @l7K = ?,
                        @l7E = ?,
                        @l7L = ?,
                        @l7Ket = ?,
                        @l8D = ?,
                        @l8G = ?,
                        @l8K = ?,
                        @l8E = ?,
                        @l8L = ?,
                        @l8Ket = ?,
                        @l9D = ?,
                        @l9G = ?,
                        @l9K = ?,
                        @l9E = ?,
                        @l9L = ?,
                        @l9Ket = ?,
                        @l10D = ?,
                        @l10G = ?,
                        @l10K = ?,
                        @l10E = ?,
                        @l10L = ?,
                        @l11D = ?,
                        @l11G = ?,
                        @l11K = ?,
                        @l11E = ?,
                        @l11L = ?,
                        @l12D = ?,
                        @l12G = ?,
                        @l12K = ?,
                        @l12E = ?,
                        @l12L = ?,
                        @rrD = ?,
                        @rrG = ?,
                        @rrK = ?,
                        @rrE = ?,
                        @rrL = ?',
                            [
                                1,
                                $user,
                                $lokasi,
                                $referensi,
                                $tanggal_laporan,
                                $shiftValue,
                                $timeStart,
                                $timeEnd,
                                $bahan_pp,
                                $ca_co3,
                                $uv,
                                $m_bath,
                                $lot_no,
                                $spek,
                                $range,
                                $r12D,
                                $r12G,
                                $r12K,
                                $r12E,
                                $r12L,
                                $r12Ket,
                                $r11D,
                                $r11G,
                                $r11K,
                                $r11E,
                                $r11L,
                                $r11Ket,
                                $r10D,
                                $r10G,
                                $r10K,
                                $r10E,
                                $r10L,
                                $r10Ket,
                                $r9D,
                                $r9G,
                                $r9K,
                                $r9E,
                                $r9L,
                                $r9Ket,
                                $r8D,
                                $r8G,
                                $r8K,
                                $r8E,
                                $r8L,
                                $r8Ket,
                                $r7D,
                                $r7G,
                                $r7K,
                                $r7E,
                                $r7L,
                                $r7Ket,
                                $r6D,
                                $r6G,
                                $r6K,
                                $r6E,
                                $r6L,
                                $r6Ket,
                                $r5D,
                                $r5G,
                                $r5K,
                                $r5E,
                                $r5L,
                                $r5Ket,
                                $r4D,
                                $r4G,
                                $r4K,
                                $r4E,
                                $r4L,
                                $r4Ket,
                                $r3D,
                                $r3G,
                                $r3K,
                                $r3E,
                                $r3L,
                                $r3Ket,
                                $r2D,
                                $r2G,
                                $r2K,
                                $r2E,
                                $r2L,
                                $r2Ket,
                                $r1D,
                                $r1G,
                                $r1K,
                                $r1E,
                                $r1L,
                                $r1Ket,
                                $l1D,
                                $l1G,
                                $l1K,
                                $l1E,
                                $l1L,
                                $l1Ket,
                                $l2D,
                                $l2G,
                                $l2K,
                                $l2E,
                                $l2L,
                                $l2Ket,
                                $l3D,
                                $l3G,
                                $l3K,
                                $l3E,
                                $l3L,
                                $l3Ket,
                                $l4D,
                                $l4G,
                                $l4K,
                                $l4E,
                                $l4L,
                                $l4Ket,
                                $l5D,
                                $l5G,
                                $l5K,
                                $l5E,
                                $l5L,
                                $l5Ket,
                                $l6D,
                                $l6G,
                                $l6K,
                                $l6E,
                                $l6L,
                                $l6Ket,
                                $l7D,
                                $l7G,
                                $l7K,
                                $l7E,
                                $l7L,
                                $l7Ket,
                                $l8D,
                                $l8G,
                                $l8K,
                                $l8E,
                                $l8L,
                                $l8Ket,
                                $l9D,
                                $l9G,
                                $l9K,
                                $l9E,
                                $l9L,
                                $l9Ket,
                                $l10D,
                                $l10G,
                                $l10K,
                                $l10E,
                                $l10L,
                                $l11D,
                                $l11G,
                                $l11K,
                                $l11E,
                                $l11L,
                                $l12D,
                                $l12G,
                                $l12K,
                                $l12E,
                                $l12L,
                                $rrD,
                                $rrG,
                                $rrK,
                                $rrE,
                                $rrL,
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil disimpan!']);

                case 2:
                    // Koreksi
                    // dd($request->all());
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_PengecekanMutuBenangEXT 
                        @kode = ?,
                        @id_laporan = ?,
                        @user_koreksi = ?,
                        @referensi = ?,
                        @tanggal_laporan = ?,
                        @shiftValue = ?,
                        @timeStart = ?,
                        @timeEnd = ?,
                        @bahan_pp = ?,
                        @ca_co3 = ?,
                        @uv = ?,
                        @m_bath = ?,
                        @lot_no = ?,
                        @spek = ?,
                        @range = ?,
                        @r12D = ?,
                        @r12G = ?,
                        @r12K = ?,
                        @r12E = ?,
                        @r12L = ?,
                        @r12Ket = ?,
                        @r11D = ?,
                        @r11G = ?,
                        @r11K = ?,
                        @r11E = ?,
                        @r11L = ?,
                        @r11Ket = ?,
                        @r10D = ?,
                        @r10G = ?,
                        @r10K = ?,
                        @r10E = ?,
                        @r10L = ?,
                        @r10Ket = ?,
                        @r9D = ?,
                        @r9G = ?,
                        @r9K = ?,
                        @r9E = ?,
                        @r9L = ?,
                        @r9Ket = ?,
                        @r8D = ?,
                        @r8G = ?,
                        @r8K = ?,
                        @r8E = ?,
                        @r8L = ?,
                        @r8Ket = ?,
                        @r7D = ?,
                        @r7G = ?,
                        @r7K = ?,
                        @r7E = ?,
                        @r7L = ?,
                        @r7Ket = ?,
                        @r6D = ?,
                        @r6G = ?,
                        @r6K = ?,
                        @r6E = ?,
                        @r6L = ?,
                        @r6Ket = ?,
                        @r5D = ?,
                        @r5G = ?,
                        @r5K = ?,
                        @r5E = ?,
                        @r5L = ?,
                        @r5Ket = ?,
                        @r4D = ?,
                        @r4G = ?,
                        @r4K = ?,
                        @r4E = ?,
                        @r4L = ?,
                        @r4Ket = ?,
                        @r3D = ?,
                        @r3G = ?,
                        @r3K = ?,
                        @r3E = ?,
                        @r3L = ?,
                        @r3Ket = ?,
                        @r2D = ?,
                        @r2G = ?,
                        @r2K = ?,
                        @r2E = ?,
                        @r2L = ?,
                        @r2Ket = ?,
                        @r1D = ?,
                        @r1G = ?,
                        @r1K = ?,
                        @r1E = ?,
                        @r1L = ?,
                        @r1Ket = ?,
                        @l1D = ?,
                        @l1G = ?,
                        @l1K = ?,
                        @l1E = ?,
                        @l1L = ?,
                        @l1Ket = ?,
                        @l2D = ?,
                        @l2G = ?,
                        @l2K = ?,
                        @l2E = ?,
                        @l2L = ?,
                        @l2Ket = ?,
                        @l3D = ?,
                        @l3G = ?,
                        @l3K = ?,
                        @l3E = ?,
                        @l3L = ?,
                        @l3Ket = ?,
                        @l4D = ?,
                        @l4G = ?,
                        @l4K = ?,
                        @l4E = ?,
                        @l4L = ?,
                        @l4Ket = ?,
                        @l5D = ?,
                        @l5G = ?,
                        @l5K = ?,
                        @l5E = ?,
                        @l5L = ?,
                        @l5Ket = ?,
                        @l6D = ?,
                        @l6G = ?,
                        @l6K = ?,
                        @l6E = ?,
                        @l6L = ?,
                        @l6Ket = ?,
                        @l7D = ?,
                        @l7G = ?,
                        @l7K = ?,
                        @l7E = ?,
                        @l7L = ?,
                        @l7Ket = ?,
                        @l8D = ?,
                        @l8G = ?,
                        @l8K = ?,
                        @l8E = ?,
                        @l8L = ?,
                        @l8Ket = ?,
                        @l9D = ?,
                        @l9G = ?,
                        @l9K = ?,
                        @l9E = ?,
                        @l9L = ?,
                        @l9Ket = ?,
                        @l10D = ?,
                        @l10G = ?,
                        @l10K = ?,
                        @l10E = ?,
                        @l10L = ?,
                        @l11D = ?,
                        @l11G = ?,
                        @l11K = ?,
                        @l11E = ?,
                        @l11L = ?,
                        @l12D = ?,
                        @l12G = ?,
                        @l12K = ?,
                        @l12E = ?,
                        @l12L = ?,
                        @rrD = ?,
                        @rrG = ?,
                        @rrK = ?,
                        @rrE = ?,
                        @rrL = ?',
                            [
                                2,
                                $id_laporan,
                                $user,
                                $referensi,
                                $tanggal_laporan,
                                $shiftValue,
                                $timeStart,
                                $timeEnd,
                                $bahan_pp,
                                $ca_co3,
                                $uv,
                                $m_bath,
                                $lot_no,
                                $spek,
                                $range,
                                $r12D,
                                $r12G,
                                $r12K,
                                $r12E,
                                $r12L,
                                $r12Ket,
                                $r11D,
                                $r11G,
                                $r11K,
                                $r11E,
                                $r11L,
                                $r11Ket,
                                $r10D,
                                $r10G,
                                $r10K,
                                $r10E,
                                $r10L,
                                $r10Ket,
                                $r9D,
                                $r9G,
                                $r9K,
                                $r9E,
                                $r9L,
                                $r9Ket,
                                $r8D,
                                $r8G,
                                $r8K,
                                $r8E,
                                $r8L,
                                $r8Ket,
                                $r7D,
                                $r7G,
                                $r7K,
                                $r7E,
                                $r7L,
                                $r7Ket,
                                $r6D,
                                $r6G,
                                $r6K,
                                $r6E,
                                $r6L,
                                $r6Ket,
                                $r5D,
                                $r5G,
                                $r5K,
                                $r5E,
                                $r5L,
                                $r5Ket,
                                $r4D,
                                $r4G,
                                $r4K,
                                $r4E,
                                $r4L,
                                $r4Ket,
                                $r3D,
                                $r3G,
                                $r3K,
                                $r3E,
                                $r3L,
                                $r3Ket,
                                $r2D,
                                $r2G,
                                $r2K,
                                $r2E,
                                $r2L,
                                $r2Ket,
                                $r1D,
                                $r1G,
                                $r1K,
                                $r1E,
                                $r1L,
                                $r1Ket,
                                $l1D,
                                $l1G,
                                $l1K,
                                $l1E,
                                $l1L,
                                $l1Ket,
                                $l2D,
                                $l2G,
                                $l2K,
                                $l2E,
                                $l2L,
                                $l2Ket,
                                $l3D,
                                $l3G,
                                $l3K,
                                $l3E,
                                $l3L,
                                $l3Ket,
                                $l4D,
                                $l4G,
                                $l4K,
                                $l4E,
                                $l4L,
                                $l4Ket,
                                $l5D,
                                $l5G,
                                $l5K,
                                $l5E,
                                $l5L,
                                $l5Ket,
                                $l6D,
                                $l6G,
                                $l6K,
                                $l6E,
                                $l6L,
                                $l6Ket,
                                $l7D,
                                $l7G,
                                $l7K,
                                $l7E,
                                $l7L,
                                $l7Ket,
                                $l8D,
                                $l8G,
                                $l8K,
                                $l8E,
                                $l8L,
                                $l8Ket,
                                $l9D,
                                $l9G,
                                $l9K,
                                $l9E,
                                $l9L,
                                $l9Ket,
                                $l10D,
                                $l10G,
                                $l10K,
                                $l10E,
                                $l10L,
                                $l11D,
                                $l11G,
                                $l11K,
                                $l11E,
                                $l11L,
                                $l12D,
                                $l12G,
                                $l12K,
                                $l12E,
                                $l12L,
                                $rrD,
                                $rrG,
                                $rrK,
                                $rrE,
                                $rrL,
                            ]
                        );

                    return response()->json(['message' => 'Keterangan berhasil diupdate!']);

                case 3:
                    // Delete
                    // dd($request->all());    
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_PengecekanMutuBenangEXT @kode = ?, @id_laporan = ?, @user_koreksi = ?',
                            [3, $id_laporan, $user]
                        );

                    return response()->json(['message' => 'Data berhasil dihapus!']);

                // return response()->json(['message' => 'Data berhasil dihapus!']);

                default:
                    return response()->json(['error', 'Proses tidak valid']);
            }

        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getDataLaporan') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $lokasi = $request->input('lokasi');
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_PengecekanMutuBenangEXT @kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [4, $tgl_awal, $tgl_akhir, $lokasi]);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal_laporan)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal_laporan)->format('Y-m-d'),
                    'id_laporan' => trim($row->id_laporan),
                    'shiftValue' => trim($row->shiftValue),
                    'spek' => trim($row->spek),
                    'NamaUser' => trim($row->NamaUser),
                    'user_acc' => trim($row->user_acc),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataPrint') {
            $id_laporan = $request->input('id_laporan');
            // dd($id_laporan);
            $results = DB::connection('ConnTestQC')
                ->table('LaporanMutuBenangEXT')
                ->where('id_laporan', $id_laporan)
                ->select('*')
                ->get();
            if ($results) {
                $user_input = trim($results[0]->user_input);
                $user_acc = trim($results[0]->user_acc);
                // $userVerified = trim($results[0]->userVerified) ?? '';
            }
            // dd($results);
            $ttdRaw = DB::connection('ConnEDP')
                ->select('EXEC SP_4451_EDP_MaintenanceTTDUser @XKode = ?, @XNomorUser = ?', [2, $user_input]);
            $ttd = null;
            if (!empty($ttdRaw)) {
                $row = $ttdRaw[0]; // ttd pasti 1 baris
                $ttd = [
                    'NamaUser' => $row->NamaUser,
                    'FotoTtd' => trim($row->FotoTtd) ?? '',
                ];
            }

            if ($user_acc !== null) {
                $ttdRaw2 = DB::connection('ConnEDP')
                    ->select('EXEC SP_4451_EDP_MaintenanceTTDUser @XKode = ?, @XNomorUser = ?', [2, $user_acc]);
                $ttd2 = null;
                if (!empty($ttdRaw2)) {
                    $row2 = $ttdRaw2[0]; // ttd pasti 1 baris
                    $ttd2 = [
                        'NamaUser' => $row2->NamaUser,
                        'FotoTtd' => trim($row2->FotoTtd) ?? '',
                    ];
                }
            } else {
                $ttd2 = null;
            }

            if (!empty($results)) {
                return response()->json([
                    'status' => 'ada',
                    'ttd' => $ttd,
                    'ttd2' => $ttd2,
                    'data' => $results
                ]);
            } else {
                return response()->json([
                    'status' => 'tidakAda',
                    'ttd' => [],
                    'ttd2' => [],
                    'data' => []
                ]);

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
