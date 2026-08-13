<?php

namespace App\Http\Controllers\Extruder\ExtruderNet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class LaporanProduksiExtruderController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Extruder');
        $view_data = [
            'pageName' => 'Extruder',
            'formName' => 'LaporanProduksiExtruder',
            // 'formData' => $form_data,
        ];
        $listLokasi = DB::connection('ConnTestQC')
            ->table('Lokasi')
            ->select('idLokasi', 'nama_lokasi')
            ->get();
        return view('Extruder.Extruder.LaporanProduksiExtruder', compact('access', 'listLokasi'), $view_data);

    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // dd($request->all());
        #region Laporan Starex
        $referensi = $request->input('referensi');
        $tanggal = $request->input('tanggal');
        $effisiensi = $request->input('effisiensi');
        $shiftValue = $request->input('shiftValue');
        $timeStart = $request->input('timeStart');
        $timeEnd = $request->input('timeEnd');
        $spek_mesin = $request->input('spek_mesin');
        $spek_benang = $request->input('spek_benang');
        $colorB = $request->input('colorB');
        $colorC = $request->input('colorC');
        $colorD = $request->input('colorD');
        $colorE = $request->input('colorE');
        $colorF = $request->input('colorF');
        $colorG = $request->input('colorG');
        $timeA = $request->input('timeA');
        $timeB = $request->input('timeB');
        $timeC = $request->input('timeC');
        $timeD = $request->input('timeD');
        $timeE = $request->input('timeE');
        $timeF = $request->input('timeF');
        $timeG = $request->input('timeG');
        $c1A = $request->input('c1A');
        $c1B = $request->input('c1B');
        $c1C = $request->input('c1C');
        $c1D = $request->input('c1D');
        $c1E = $request->input('c1E');
        $c1F = $request->input('c1F');
        $c1G = $request->input('c1G');
        $c2A = $request->input('c2A');
        $c2B = $request->input('c2B');
        $c2C = $request->input('c2C');
        $c2D = $request->input('c2D');
        $c2E = $request->input('c2E');
        $c2F = $request->input('c2F');
        $c2G = $request->input('c2G');
        $c3A = $request->input('c3A');
        $c3B = $request->input('c3B');
        $c3C = $request->input('c3C');
        $c3D = $request->input('c3D');
        $c3E = $request->input('c3E');
        $c3F = $request->input('c3F');
        $c3G = $request->input('c3G');
        $c4A = $request->input('c4A');
        $c4B = $request->input('c4B');
        $c4C = $request->input('c4C');
        $c4D = $request->input('c4D');
        $c4E = $request->input('c4E');
        $c4F = $request->input('c4F');
        $c4G = $request->input('c4G');
        $c5A = $request->input('c5A');
        $c5B = $request->input('c5B');
        $c5C = $request->input('c5C');
        $c5D = $request->input('c5D');
        $c5E = $request->input('c5E');
        $c5F = $request->input('c5F');
        $c5G = $request->input('c5G');
        $c6A = $request->input('c6A');
        $c6B = $request->input('c6B');
        $c6C = $request->input('c6C');
        $c6D = $request->input('c6D');
        $c6E = $request->input('c6E');
        $c6F = $request->input('c6F');
        $c6G = $request->input('c6G');
        $c7A = $request->input('c7A');
        $c7B = $request->input('c7B');
        $c7C = $request->input('c7C');
        $c7D = $request->input('c7D');
        $c7E = $request->input('c7E');
        $c7F = $request->input('c7F');
        $c7G = $request->input('c7G');
        $c8A = $request->input('c8A');
        $c8B = $request->input('c8B');
        $c8C = $request->input('c8C');
        $c8D = $request->input('c8D');
        $c8E = $request->input('c8E');
        $c8F = $request->input('c8F');
        $c8G = $request->input('c8G');
        $flA = $request->input('flA');
        $flB = $request->input('flB');
        $flC = $request->input('flC');
        $flD = $request->input('flD');
        $flE = $request->input('flE');
        $flF = $request->input('flF');
        $flG = $request->input('flG');
        $scA = $request->input('scA');
        $scB = $request->input('scB');
        $scC = $request->input('scC');
        $scD = $request->input('scD');
        $scE = $request->input('scE');
        $scF = $request->input('scF');
        $scG = $request->input('scG');
        $jnA = $request->input('jnA');
        $jnB = $request->input('jnB');
        $jnC = $request->input('jnC');
        $jnD = $request->input('jnD');
        $jnE = $request->input('jnE');
        $jnF = $request->input('jnF');
        $jnG = $request->input('jnG');
        $d1A = $request->input('d1A');
        $d1B = $request->input('d1B');
        $d1C = $request->input('d1C');
        $d1D = $request->input('d1D');
        $d1E = $request->input('d1E');
        $d1F = $request->input('d1F');
        $d1G = $request->input('d1G');
        $d2A = $request->input('d2A');
        $d2B = $request->input('d2B');
        $d2C = $request->input('d2C');
        $d2D = $request->input('d2D');
        $d2E = $request->input('d2E');
        $d2F = $request->input('d2F');
        $d2G = $request->input('d2G');
        $d3A = $request->input('d3A');
        $d3B = $request->input('d3B');
        $d3C = $request->input('d3C');
        $d3D = $request->input('d3D');
        $d3E = $request->input('d3E');
        $d3F = $request->input('d3F');
        $d3G = $request->input('d3G');
        $d4A = $request->input('d4A');
        $d4B = $request->input('d4B');
        $d4C = $request->input('d4C');
        $d4D = $request->input('d4D');
        $d4E = $request->input('d4E');
        $d4F = $request->input('d4F');
        $d4G = $request->input('d4G');
        $d5A = $request->input('d5A');
        $d5B = $request->input('d5B');
        $d5C = $request->input('d5C');
        $d5D = $request->input('d5D');
        $d5E = $request->input('d5E');
        $d5F = $request->input('d5F');
        $d5G = $request->input('d5G');
        $d6A = $request->input('d6A');
        $d6B = $request->input('d6B');
        $d6C = $request->input('d6C');
        $d6D = $request->input('d6D');
        $d6E = $request->input('d6E');
        $d6F = $request->input('d6F');
        $d6G = $request->input('d6G');
        $srA = $request->input('srA');
        $srB = $request->input('srB');
        $srC = $request->input('srC');
        $srD = $request->input('srD');
        $srE = $request->input('srE');
        $srF = $request->input('srF');
        $srG = $request->input('srG');
        $mrA = $request->input('mrA');
        $mrB = $request->input('mrB');
        $mrC = $request->input('mrC');
        $mrD = $request->input('mrD');
        $mrE = $request->input('mrE');
        $mrF = $request->input('mrF');
        $mrG = $request->input('mrG');
        $mvA = $request->input('mvA');
        $mvB = $request->input('mvB');
        $mvC = $request->input('mvC');
        $mvD = $request->input('mvD');
        $mvE = $request->input('mvE');
        $mvF = $request->input('mvF');
        $mvG = $request->input('mvG');
        $mpp1A = $request->input('mpp1A');
        $mpp1B = $request->input('mpp1B');
        $mpp1C = $request->input('mpp1C');
        $mpp1D = $request->input('mpp1D');
        $mpp1E = $request->input('mpp1E');
        $mpp1F = $request->input('mpp1F');
        $mpp1G = $request->input('mpp1G');
        $mpp2A = $request->input('mpp2A');
        $mpp2B = $request->input('mpp2B');
        $mpp2C = $request->input('mpp2C');
        $mpp2D = $request->input('mpp2D');
        $mpp2E = $request->input('mpp2E');
        $mpp2F = $request->input('mpp2F');
        $mpp2G = $request->input('mpp2G');
        $qbA = $request->input('qbA');
        $qbB = $request->input('qbB');
        $qbC = $request->input('qbC');
        $qbD = $request->input('qbD');
        $qbE = $request->input('qbE');
        $qbF = $request->input('qbF');
        $qbG = $request->input('qbG');
        $fewA = $request->input('fewA');
        $fewB = $request->input('fewB');
        $fewC = $request->input('fewC');
        $fewD = $request->input('fewD');
        $fewE = $request->input('fewE');
        $fewF = $request->input('fewF');
        $fewG = $request->input('fewG');
        $swA = $request->input('swA');
        $swB = $request->input('swB');
        $swC = $request->input('swC');
        $swD = $request->input('swD');
        $swE = $request->input('swE');
        $swF = $request->input('swF');
        $swG = $request->input('swG');
        $noyA = $request->input('noyA');
        $noyB = $request->input('noyB');
        $noyC = $request->input('noyC');
        $noyD = $request->input('noyD');
        $noyE = $request->input('noyE');
        $noyF = $request->input('noyF');
        $noyG = $request->input('noyG');
        $wgA = $request->input('wgA');
        $wgB = $request->input('wgB');
        $wgC = $request->input('wgC');
        $wgD = $request->input('wgD');
        $wgE = $request->input('wgE');
        $wgF = $request->input('wgF');
        $wgG = $request->input('wgG');
        $rs1A = $request->input('rs1A');
        $rs1B = $request->input('rs1B');
        $rs1C = $request->input('rs1C');
        $rs1D = $request->input('rs1D');
        $rs1E = $request->input('rs1E');
        $rs1F = $request->input('rs1F');
        $rs1G = $request->input('rs1G');
        $rs2A = $request->input('rs2A');
        $rs2B = $request->input('rs2B');
        $rs2C = $request->input('rs2C');
        $rs2D = $request->input('rs2D');
        $rs2E = $request->input('rs2E');
        $rs2F = $request->input('rs2F');
        $rs2G = $request->input('rs2G');
        $rs3A = $request->input('rs3A');
        $rs3B = $request->input('rs3B');
        $rs3C = $request->input('rs3C');
        $rs3D = $request->input('rs3D');
        $rs3E = $request->input('rs3E');
        $rs3F = $request->input('rs3F');
        $rs3G = $request->input('rs3G');
        $strA = $request->input('strA');
        $strB = $request->input('strB');
        $strC = $request->input('strC');
        $strD = $request->input('strD');
        $strE = $request->input('strE');
        $strF = $request->input('strF');
        $strG = $request->input('strG');
        $rA = $request->input('rA');
        $rB = $request->input('rB');
        $rC = $request->input('rC');
        $rD = $request->input('rD');
        $rE = $request->input('rE');
        $rF = $request->input('rF');
        $rG = $request->input('rG');
        $uotA = $request->input('uotA');
        $uotB = $request->input('uotB');
        $uotC = $request->input('uotC');
        $uotD = $request->input('uotD');
        $uotE = $request->input('uotE');
        $uotF = $request->input('uotF');
        $uotG = $request->input('uotG');
        $lotA = $request->input('lotA');
        $lotB = $request->input('lotB');
        $lotC = $request->input('lotC');
        $lotD = $request->input('lotD');
        $lotE = $request->input('lotE');
        $lotF = $request->input('lotF');
        $lotG = $request->input('lotG');
        $at1A = $request->input('at1A');
        $at1B = $request->input('at1B');
        $at1C = $request->input('at1C');
        $at1D = $request->input('at1D');
        $at1E = $request->input('at1E');
        $at1F = $request->input('at1F');
        $at1G = $request->input('at1G');
        $at2A = $request->input('at2A');
        $at2B = $request->input('at2B');
        $at2C = $request->input('at2C');
        $at2D = $request->input('at2D');
        $at2E = $request->input('at2E');
        $at2F = $request->input('at2F');
        $at2G = $request->input('at2G');
        $at3A = $request->input('at3A');
        $at3B = $request->input('at3B');
        $at3C = $request->input('at3C');
        $at3D = $request->input('at3D');
        $at3E = $request->input('at3E');
        $at3F = $request->input('at3F');
        $at3G = $request->input('at3G');
        $time1 = $request->input('time1');
        $remark1 = $request->input('remark1');
        $time2 = $request->input('time2');
        $remark2 = $request->input('remark2');
        $time3 = $request->input('time3');
        $remark3 = $request->input('remark3');
        $time4 = $request->input('time4');
        $remark4 = $request->input('remark4');
        $time5 = $request->input('time5');
        $remark5 = $request->input('remark5');
        $time6 = $request->input('time6');
        $remark6 = $request->input('remark6');
        $kwhM1 = $request->input('kwhM1');
        $kwhM2 = $request->input('kwhM2');
        $jamProd = $request->input('jamProd');
        $ppA = $request->input('ppA');
        $ppB = $request->input('ppB');
        $ppC = $request->input('ppC');
        $ppD = $request->input('ppD');
        $cacA = $request->input('cacA');
        $cacB = $request->input('cacB');
        $cacC = $request->input('cacC');
        $cacD = $request->input('cacD');
        $cacE = $request->input('cacE');
        $cacF = $request->input('cacF');
        $mbA = $request->input('mbA');
        $mbB = $request->input('mbB');
        $mbC = $request->input('mbC');
        $mbD = $request->input('mbD');
        $mbE = $request->input('mbE');
        $mbF = $request->input('mbF');
        $uvA = $request->input('uvA');
        $uvB = $request->input('uvB');
        $uvC = $request->input('uvC');
        $uvD = $request->input('uvD');
        $uvE = $request->input('uvE');
        $uvF = $request->input('uvF');
        $asbA = $request->input('asbA');
        $asbB = $request->input('asbB');
        $asbC = $request->input('asbC');
        $asbD = $request->input('asbD');
        $asbE = $request->input('asbE');
        $asbF = $request->input('asbF');
        $llA = $request->input('llA');
        $llB = $request->input('llB');
        $llC = $request->input('llC');
        $llD = $request->input('llD');
        $llF = $request->input('llF');
        $bhn1A = $request->input('bhn1A');
        $bhn1B = $request->input('bhn1B');
        $bhn1C = $request->input('bhn1C');
        $bhn1D = $request->input('bhn1D');
        $bhn1E = $request->input('bhn1E');
        $bhn1F = $request->input('bhn1F');
        $bhn2A = $request->input('bhn2A');
        $bhn2B = $request->input('bhn2B');
        $bhn2C = $request->input('bhn2C');
        $bhn2D = $request->input('bhn2D');
        $bhn2E = $request->input('bhn2E');
        $bhn2F = $request->input('bhn2F');
        $mbAT = $request->input('mbAT');
        $uvAT = $request->input('uvAT');
        $asbAT = $request->input('asbAT');
        $llAT = $request->input('llAT');
        $bngM = $request->input('bngM');
        $prongM = $request->input('prongM');
        $silM = $request->input('silM');
        $bngL = $request->input('bngL');
        $prongL = $request->input('prongL');
        $silL = $request->input('silL');
        $bngMe = $request->input('bngMe');
        $prongMe = $request->input('prongMe');
        $silMe = $request->input('silMe');
        $bngGB = $request->input('bngGB');
        $prongGB = $request->input('prongGB');
        $silGB = $request->input('silGB');
        $bngLL = $request->input('bngLL');
        $prongLL = $request->input('prongLL');
        $silLL = $request->input('silLL');
        $total = $request->input('total');
        $user = trim(Auth::user()->NomorUser);
        $kodeProses = $request->input('kodeProses');
        $id_lokasi = $request->input('id_lokasi');

        #region Laporan Lohia
        $referensiD = $request->input("referensiD");
        $tanggalD = $request->input("tanggalD");
        $effisiensiD = $request->input("effisiensiD");
        $shiftValueD = $request->input("shiftValueD");
        $timeStartD = $request->input("timeStartD");
        $timeEndD = $request->input("timeEndD");
        $spek_mesinD = $request->input("spek_mesinD");
        $spek_benangD = $request->input("spek_benangD");
        $id_lokasiD = $request->input("id_lokasi");
        $timeAD = $request->input("timeAD");
        $timeBD = $request->input("timeBD");
        $timeCD = $request->input("timeCD");
        $timeDD = $request->input("timeDD");
        $timeED = $request->input("timeED");
        $timeFD = $request->input("timeFD");
        $bz1AD = $request->input("bz1AD");
        $bz1BD = $request->input("bz1BD");
        $bz1CD = $request->input("bz1CD");
        $bz1DD = $request->input("bz1DD");
        $bz1ED = $request->input("bz1ED");
        $bz1FD = $request->input("bz1FD");
        $bz2AD = $request->input("bz2AD");
        $bz2BD = $request->input("bz2BD");
        $bz2CD = $request->input("bz2CD");
        $bz2DD = $request->input("bz2DD");
        $bz2ED = $request->input("bz2ED");
        $bz2FD = $request->input("bz2FD");
        $bz3AD = $request->input("bz3AD");
        $bz3BD = $request->input("bz3BD");
        $bz3CD = $request->input("bz3CD");
        $bz3DD = $request->input("bz3DD");
        $bz3ED = $request->input("bz3ED");
        $bz3FD = $request->input("bz3FD");
        $bz4AD = $request->input("bz4AD");
        $bz4BD = $request->input("bz4BD");
        $bz4CD = $request->input("bz4CD");
        $bz4DD = $request->input("bz4DD");
        $bz4ED = $request->input("bz4ED");
        $bz4FD = $request->input("bz4FD");
        $bz5AD = $request->input("bz5AD");
        $bz5BD = $request->input("bz5BD");
        $bz5CD = $request->input("bz5CD");
        $bz5DD = $request->input("bz5DD");
        $bz5ED = $request->input("bz5ED");
        $bz5FD = $request->input("bz5FD");
        $bz6AD = $request->input("bz6AD");
        $bz6BD = $request->input("bz6BD");
        $bz6CD = $request->input("bz6CD");
        $bz6DD = $request->input("bz6DD");
        $bz6ED = $request->input("bz6ED");
        $bz6FD = $request->input("bz6FD");
        $scAD = $request->input("scAD");
        $scBD = $request->input("scBD");
        $scCD = $request->input("scCD");
        $scDD = $request->input("scDD");
        $scED = $request->input("scED");
        $scFD = $request->input("scFD");
        $mpAD = $request->input("mpAD");
        $mpBD = $request->input("mpBD");
        $mpCD = $request->input("mpCD");
        $mpDD = $request->input("mpDD");
        $mpED = $request->input("mpED");
        $mpFD = $request->input("mpFD");
        $ad1AD = $request->input("ad1AD");
        $ad1BD = $request->input("ad1BD");
        $ad1CD = $request->input("ad1CD");
        $ad1DD = $request->input("ad1DD");
        $ad1ED = $request->input("ad1ED");
        $ad1FD = $request->input("ad1FD");
        $ad2AD = $request->input("ad2AD");
        $ad2BD = $request->input("ad2BD");
        $ad2CD = $request->input("ad2CD");
        $ad2DD = $request->input("ad2DD");
        $ad2ED = $request->input("ad2ED");
        $ad2FD = $request->input("ad2FD");
        $wpheAD = $request->input("wpheAD");
        $wpheBD = $request->input("wpheBD");
        $wpheCD = $request->input("wpheCD");
        $wpheDD = $request->input("wpheDD");
        $wpheED = $request->input("wpheED");
        $wpheFD = $request->input("wpheFD");
        $ipheAD = $request->input("ipheAD");
        $ipheBD = $request->input("ipheBD");
        $ipheCD = $request->input("ipheCD");
        $ipheDD = $request->input("ipheDD");
        $ipheED = $request->input("ipheED");
        $ipheFD = $request->input("ipheFD");
        $mtAD = $request->input("mtAD");
        $mtBD = $request->input("mtBD");
        $mtCD = $request->input("mtCD");
        $mtDD = $request->input("mtDD");
        $mtED = $request->input("mtED");
        $mtFD = $request->input("mtFD");
        $dz1AD = $request->input("dz1AD");
        $dz1BD = $request->input("dz1BD");
        $dz1CD = $request->input("dz1CD");
        $dz1DD = $request->input("dz1DD");
        $dz1ED = $request->input("dz1ED");
        $dz1FD = $request->input("dz1FD");
        $dz2AD = $request->input("dz2AD");
        $dz2BD = $request->input("dz2BD");
        $dz2CD = $request->input("dz2CD");
        $dz2DD = $request->input("dz2DD");
        $dz2ED = $request->input("dz2ED");
        $dz2FD = $request->input("dz2FD");
        $dz3AD = $request->input("dz3AD");
        $dz3BD = $request->input("dz3BD");
        $dz3CD = $request->input("dz3CD");
        $dz3DD = $request->input("dz3DD");
        $dz3ED = $request->input("dz3ED");
        $dz3FD = $request->input("dz3FD");
        $dz4AD = $request->input("dz4AD");
        $dz4BD = $request->input("dz4BD");
        $dz4CD = $request->input("dz4CD");
        $dz4DD = $request->input("dz4DD");
        $dz4ED = $request->input("dz4ED");
        $dz4FD = $request->input("dz4FD");
        $dz5AD = $request->input("dz5AD");
        $dz5BD = $request->input("dz5BD");
        $dz5CD = $request->input("dz5CD");
        $dz5DD = $request->input("dz5DD");
        $dz5ED = $request->input("dz5ED");
        $dz5FD = $request->input("dz5FD");
        $haoAD = $request->input("haoAD");
        $haoBD = $request->input("haoBD");
        $haoCD = $request->input("haoCD");
        $haoDD = $request->input("haoDD");
        $haoED = $request->input("haoED");
        $haoFD = $request->input("haoFD");
        $unitAD = $request->input("unitAD");
        $unitBD = $request->input("unitBD");
        $unitCD = $request->input("unitCD");
        $unitDD = $request->input("unitDD");
        $unitED = $request->input("unitED");
        $unitFD = $request->input("unitFD");
        $mp2AD = $request->input("mp2AD");
        $mp2BD = $request->input("mp2BD");
        $mp2CD = $request->input("mp2CD");
        $mp2DD = $request->input("mp2DD");
        $mp2ED = $request->input("mp2ED");
        $mp2FD = $request->input("mp2FD");
        $extAD = $request->input("extAD");
        $extBD = $request->input("extBD");
        $extCD = $request->input("extCD");
        $extDD = $request->input("extDD");
        $extED = $request->input("extED");
        $extFD = $request->input("extFD");
        $niprAD = $request->input("niprAD");
        $niprBD = $request->input("niprBD");
        $niprCD = $request->input("niprCD");
        $niprDD = $request->input("niprDD");
        $niprED = $request->input("niprED");
        $niprFD = $request->input("niprFD");
        $trAD = $request->input("trAD");
        $trBD = $request->input("trBD");
        $trCD = $request->input("trCD");
        $trDD = $request->input("trDD");
        $trED = $request->input("trED");
        $trFD = $request->input("trFD");
        $huAD = $request->input("huAD");
        $huBD = $request->input("huBD");
        $huCD = $request->input("huCD");
        $huDD = $request->input("huDD");
        $huED = $request->input("huED");
        $huFD = $request->input("huFD");
        $isuAD = $request->input("isuAD");
        $isuBD = $request->input("isuBD");
        $isuCD = $request->input("isuCD");
        $isuDD = $request->input("isuDD");
        $isuED = $request->input("isuED");
        $isuFD = $request->input("isuFD");
        $suAD = $request->input("suAD");
        $suBD = $request->input("suBD");
        $suCD = $request->input("suCD");
        $suDD = $request->input("suDD");
        $suED = $request->input("suED");
        $suFD = $request->input("suFD");
        $pauAD = $request->input("pauAD");
        $pauBD = $request->input("pauBD");
        $pauCD = $request->input("pauCD");
        $pauDD = $request->input("pauDD");
        $pauED = $request->input("pauED");
        $pauFD = $request->input("pauFD");
        $auAD = $request->input("auAD");
        $auBD = $request->input("auBD");
        $auCD = $request->input("auCD");
        $auDD = $request->input("auDD");
        $auED = $request->input("auED");
        $auFD = $request->input("auFD");
        $wgAD = $request->input("wgAD");
        $wgBD = $request->input("wgBD");
        $wgCD = $request->input("wgCD");
        $wgDD = $request->input("wgDD");
        $wgED = $request->input("wgED");
        $wgFD = $request->input("wgFD");
        $fewAD = $request->input("fewAD");
        $fewBD = $request->input("fewBD");
        $fewCD = $request->input("fewCD");
        $fewDD = $request->input("fewDD");
        $fewED = $request->input("fewED");
        $fewFD = $request->input("fewFD");
        $noyAD = $request->input("noyAD");
        $noyBD = $request->input("noyBD");
        $noyCD = $request->input("noyCD");
        $noyDD = $request->input("noyDD");
        $noyED = $request->input("noyED");
        $noyFD = $request->input("noyFD");
        $swAD = $request->input("swAD");
        $swBD = $request->input("swBD");
        $swCD = $request->input("swCD");
        $swDD = $request->input("swDD");
        $swED = $request->input("swED");
        $swFD = $request->input("swFD");
        $totrAD = $request->input("totrAD");
        $totrBD = $request->input("totrBD");
        $totrCD = $request->input("totrCD");
        $totrDD = $request->input("totrDD");
        $totrED = $request->input("totrED");
        $totrFD = $request->input("totrFD");
        $relaxAD = $request->input("relaxAD");
        $relaxBD = $request->input("relaxBD");
        $relaxCD = $request->input("relaxCD");
        $relaxDD = $request->input("relaxDD");
        $relaxED = $request->input("relaxED");
        $relaxFD = $request->input("relaxFD");
        $tp2AD = $request->input("tp2AD");
        $tp2BD = $request->input("tp2BD");
        $tp2CD = $request->input("tp2CD");
        $tp2DD = $request->input("tp2DD");
        $tp2ED = $request->input("tp2ED");
        $tp2FD = $request->input("tp2FD");
        $tp1AD = $request->input("tp1AD");
        $tp1BD = $request->input("tp1BD");
        $tp1CD = $request->input("tp1CD");
        $tp1DD = $request->input("tp1DD");
        $tp1ED = $request->input("tp1ED");
        $tp1FD = $request->input("tp1FD");
        $tp3AD = $request->input("tp3AD");
        $tp3BD = $request->input("tp3BD");
        $tp3CD = $request->input("tp3CD");
        $tp3DD = $request->input("tp3DD");
        $tp3ED = $request->input("tp3ED");
        $tp3FD = $request->input("tp3FD");
        $at1AD = $request->input("at1AD");
        $at1BD = $request->input("at1BD");
        $at1CD = $request->input("at1CD");
        $at1DD = $request->input("at1DD");
        $at1ED = $request->input("at1ED");
        $at1FD = $request->input("at1FD");
        $at2AD = $request->input("at2AD");
        $at2BD = $request->input("at2BD");
        $at2CD = $request->input("at2CD");
        $at2DD = $request->input("at2DD");
        $at2ED = $request->input("at2ED");
        $at2FD = $request->input("at2FD");
        $tfAD = $request->input("tfAD");
        $tfBD = $request->input("tfBD");
        $tfCD = $request->input("tfCD");
        $tfDD = $request->input("tfDD");
        $tfED = $request->input("tfED");
        $tfFD = $request->input("tfFD");
        $ldAD = $request->input("ldAD");
        $ldBD = $request->input("ldBD");
        $ldCD = $request->input("ldCD");
        $ldDD = $request->input("ldDD");
        $ldED = $request->input("ldED");
        $ldFD = $request->input("ldFD");
        $time1D = $request->input("time1D");
        $remark1D = $request->input("remark1D");
        $time2D = $request->input("time2D");
        $remark2D = $request->input("remark2D");
        $time3D = $request->input("time3D");
        $remark3D = $request->input("remark3D");
        $time4D = $request->input("time4D");
        $remark4D = $request->input("remark4D");
        $kwhM1D = $request->input("kwhM1D");
        $kwhM2D = $request->input("kwhM2D");
        $jamProdD = $request->input("jamProdD");
        $ppAD = $request->input("ppAD");
        $ppBD = $request->input("ppBD");
        $ppCD = $request->input("ppCD");
        $ppDD = $request->input("ppDD");
        $cacAD = $request->input("cacAD");
        $cacBD = $request->input("cacBD");
        $cacCD = $request->input("cacCD");
        $cacDD = $request->input("cacDD");
        $cacED = $request->input("cacED");
        $cacFD = $request->input("cacFD");
        $mbATD = $request->input("mbATD");
        $mbAD = $request->input("mbAD");
        $mbBD = $request->input("mbBD");
        $mbCD = $request->input("mbCD");
        $mbDD = $request->input("mbDD");
        $mbED = $request->input("mbED");
        $mbFD = $request->input("mbFD");
        $uvATD = $request->input("uvATD");
        $uvAD = $request->input("uvAD");
        $uvBD = $request->input("uvBD");
        $uvCD = $request->input("uvCD");
        $uvDD = $request->input("uvDD");
        $uvED = $request->input("uvED");
        $uvFD = $request->input("uvFD");
        $asbATD = $request->input("asbATD");
        $asbAD = $request->input("asbAD");
        $asbBD = $request->input("asbBD");
        $asbCD = $request->input("asbCD");
        $asbDD = $request->input("asbDD");
        $asbED = $request->input("asbED");
        $asbFD = $request->input("asbFD");
        $llATD = $request->input("llATD");
        $llAD = $request->input("llAD");
        $llBD = $request->input("llBD");
        $llCD = $request->input("llCD");
        $llDD = $request->input("llDD");
        $llFD = $request->input("llFD");
        $bngMD = $request->input("bngMD");
        $prongMD = $request->input("prongMD");
        $silMD = $request->input("silMD");
        $bngLD = $request->input("bngLD");
        $prongLD = $request->input("prongLD");
        $silLD = $request->input("silLD");
        $bngMeD = $request->input("bngMeD");
        $prongMeD = $request->input("prongMeD");
        $silMeD = $request->input("silMeD");
        $bngGBD = $request->input("bngGBD");
        $prongGBD = $request->input("prongGBD");
        $silGBD = $request->input("silGBD");
        $bngLLD = $request->input("bngLLD");
        $prongLLD = $request->input("prongLLD");
        $silLLD = $request->input("silLLD");
        $totalD = $request->input("totalD");

        if ($kodeProses == "1") {
            $check = DB::connection('ConnExtruder')
                ->select(
                    'EXEC SP_4451_Count_LaporanProduksiExtruder @Tanggal = ?, @ShiftValue = ?, @lokasi = ?',
                    [$tanggal, $shiftValue, $id_lokasi]
                );
            // dd($check);
            $Ada = 0;
            foreach ($check as $row) {
                $Ada = $row->JumlahData ?? 0;
            }

            if ($Ada < 3) {
                try {
                    DB::connection('ConnExtruder')
                        ->statement('EXEC SP_4451_LaporanProduksiExtruder 
                        @kode =?,
                        @referensi =?,
                        @tanggal =?,
                        @effisiensi =?,
                        @shiftValue =?,
                        @timeStart =?,
                        @timeEnd =?,
                        @spek_mesin =?,
                        @spek_benang =?,
                        @colorB = ?,
                        @colorC = ?,
                        @colorD = ?,
                        @colorE = ?,
                        @colorF = ?,
                        @colorG = ?,
                        @timeA =?,
                        @timeB =?,
                        @timeC =?,
                        @timeD =?,
                        @timeE =?,
                        @timeF =?,
                        @timeG =?,
                        @c1A =?,
                        @c1B =?,
                        @c1C =?,
                        @c1D =?,
                        @c1E =?,
                        @c1F =?,
                        @c1G =?,
                        @c2A =?,
                        @c2B =?,
                        @c2C =?,
                        @c2D =?,
                        @c2E =?,
                        @c2F =?,
                        @c2G =?,
                        @c3A =?,
                        @c3B =?,
                        @c3C =?,
                        @c3D =?,
                        @c3E =?,
                        @c3F =?,
                        @c3G =?,
                        @c4A =?,
                        @c4B =?,
                        @c4C =?,
                        @c4D =?,
                        @c4E =?,
                        @c4F =?,
                        @c4G =?,
                        @c5A =?,
                        @c5B =?,
                        @c5C =?,
                        @c5D =?,
                        @c5E =?,
                        @c5F =?,
                        @c5G =?,
                        @c6A =?,
                        @c6B =?,
                        @c6C =?,
                        @c6D =?,
                        @c6E =?,
                        @c6F =?,
                        @c6G =?,
                        @c7A =?,
                        @c7B =?,
                        @c7C =?,
                        @c7D =?,
                        @c7E =?,
                        @c7F =?,
                        @c7G =?,
                        @c8A =?,
                        @c8B =?,
                        @c8C =?,
                        @c8D =?,
                        @c8E =?,
                        @c8F =?,
                        @c8G =?,
                        @flA =?,
                        @flB =?,
                        @flC =?,
                        @flD =?,
                        @flE =?,
                        @flF =?,
                        @flG =?,
                        @scA =?,
                        @scB =?,
                        @scC =?,
                        @scD =?,
                        @scE =?,
                        @scF =?,
                        @scG =?,
                        @jnA =?,
                        @jnB =?,
                        @jnC =?,
                        @jnD =?,
                        @jnE =?,
                        @jnF =?,
                        @jnG =?,
                        @d1A =?,
                        @d1B =?,
                        @d1C =?,
                        @d1D =?,
                        @d1E =?,
                        @d1F =?,
                        @d1G =?,
                        @d2A =?,
                        @d2B =?,
                        @d2C =?,
                        @d2D =?,
                        @d2E =?,
                        @d2F =?,
                        @d2G =?,
                        @d3A =?,
                        @d3B =?,
                        @d3C =?,
                        @d3D =?,
                        @d3E =?,
                        @d3F =?,
                        @d3G =?,
                        @d4A =?,
                        @d4B =?,
                        @d4C =?,
                        @d4D =?,
                        @d4E =?,
                        @d4F =?,
                        @d4G =?,
                        @d5A =?,
                        @d5B =?,
                        @d5C =?,
                        @d5D =?,
                        @d5E =?,
                        @d5F =?,
                        @d5G =?,
                        @d6A =?,
                        @d6B =?,
                        @d6C =?,
                        @d6D =?,
                        @d6E =?,
                        @d6F =?,
                        @d6G =?,
                        @srA =?,
                        @srB =?,
                        @srC =?,
                        @srD =?,
                        @srE =?,
                        @srF =?,
                        @srG =?,
                        @mrA =?,
                        @mrB =?,
                        @mrC =?,
                        @mrD =?,
                        @mrE =?,
                        @mrF =?,
                        @mrG =?,
                        @mvA =?,
                        @mvB =?,
                        @mvC =?,
                        @mvD =?,
                        @mvE =?,
                        @mvF =?,
                        @mvG =?,
                        @mpp1A =?,
                        @mpp1B =?,
                        @mpp1C =?,
                        @mpp1D =?,
                        @mpp1E =?,
                        @mpp1F =?,
                        @mpp1G =?,
                        @mpp2A =?,
                        @mpp2B =?,
                        @mpp2C =?,
                        @mpp2D =?,
                        @mpp2E =?,
                        @mpp2F =?,
                        @mpp2G =?,
                        @qbA =?,
                        @qbB =?,
                        @qbC =?,
                        @qbD =?,
                        @qbE =?,
                        @qbF =?,
                        @qbG =?,
                        @fewA =?,
                        @fewB =?,
                        @fewC =?,
                        @fewD =?,
                        @fewE =?,
                        @fewF =?,
                        @fewG =?,
                        @swA =?,
                        @swB =?,
                        @swC =?,
                        @swD =?,
                        @swE =?,
                        @swF =?,
                        @swG =?,
                        @noyA =?,
                        @noyB =?,
                        @noyC =?,
                        @noyD =?,
                        @noyE =?,
                        @noyF =?,
                        @noyG =?,
                        @wgA =?,
                        @wgB =?,
                        @wgC =?,
                        @wgD =?,
                        @wgE =?,
                        @wgF =?,
                        @wgG =?,
                        @rs1A =?,
                        @rs1B =?,
                        @rs1C =?,
                        @rs1D =?,
                        @rs1E =?,
                        @rs1F =?,
                        @rs1G =?,
                        @rs2A =?,
                        @rs2B =?,
                        @rs2C =?,
                        @rs2D =?,
                        @rs2E =?,
                        @rs2F =?,
                        @rs2G =?,
                        @rs3A =?,
                        @rs3B =?,
                        @rs3C =?,
                        @rs3D =?,
                        @rs3E =?,
                        @rs3F =?,
                        @rs3G =?,
                        @strA =?,
                        @strB =?,
                        @strC =?,
                        @strD =?,
                        @strE =?,
                        @strF =?,
                        @strG =?,
                        @rA =?,
                        @rB =?,
                        @rC =?,
                        @rD =?,
                        @rE =?,
                        @rF =?,
                        @rG =?,
                        @uotA =?,
                        @uotB =?,
                        @uotC =?,
                        @uotD =?,
                        @uotE =?,
                        @uotF =?,
                        @uotG =?,
                        @lotA =?,
                        @lotB =?,
                        @lotC =?,
                        @lotD =?,
                        @lotE =?,
                        @lotF =?,
                        @lotG =?,
                        @at1A =?,
                        @at1B =?,
                        @at1C =?,
                        @at1D =?,
                        @at1E =?,
                        @at1F =?,
                        @at1G =?,
                        @at2A =?,
                        @at2B =?,
                        @at2C =?,
                        @at2D =?,
                        @at2E =?,
                        @at2F =?,
                        @at2G =?,
                        @at3A =?,
                        @at3B =?,
                        @at3C =?,
                        @at3D =?,
                        @at3E =?,
                        @at3F =?,
                        @at3G =?,
                        @time1 =?,
                        @remark1 =?,
                        @time2 =?,
                        @remark2 =?,
                        @time3 =?,
                        @remark3 =?,
                        @time4 =?,
                        @remark4 =?,
                        @time5 =?,
                        @remark5 =?,
                        @time6 =?,
                        @remark6 =?,
                        @kwhM1 =?,
                        @kwhM2 =?,
                        @jamProd =?,
                        @ppA =?,
                        @ppB =?,
                        @ppC =?,
                        @ppD =?,
                        @cacA =?,
                        @cacB =?,
                        @cacC =?,
                        @cacD =?,
                        @cacE =?,
                        @cacF =?,
                        @mbA =?,
                        @mbB =?,
                        @mbC =?,
                        @mbD =?,
                        @mbE =?,
                        @mbF =?,
                        @uvA =?,
                        @uvB =?,
                        @uvC =?,
                        @uvD =?,
                        @uvE =?,
                        @uvF =?,
                        @asbA =?,
                        @asbB =?,
                        @asbC =?,
                        @asbD =?,
                        @asbE =?,
                        @asbF =?,
                        @llA =?,
                        @llB =?,
                        @llC =?,
                        @llD =?,
                        @llF =?,
                        @bhn1A =?,
                        @bhn1B =?,
                        @bhn1C =?,
                        @bhn1D =?,
                        @bhn1E =?,
                        @bhn1F =?,
                        @bhn2A =?,
                        @bhn2B =?,
                        @bhn2C =?,
                        @bhn2D =?,
                        @bhn2E =?,
                        @bhn2F =?,
                        @mbAT =?,
                        @uvAT =?,
                        @asbAT =?,
                        @llAT =?,
                        @bngM =?,
                        @prongM =?,
                        @silM =?,
                        @bngL =?,
                        @prongL =?,
                        @silL =?,
                        @bngMe =?,
                        @prongMe =?,
                        @silMe =?,
                        @bngGB =?,
                        @prongGB =?,
                        @silGB =?,
                        @bngLL =?,
                        @prongLL =?,
                        @silLL =?,
                        @total =?,
                        @userInput =?,
                        @lokasi =?
                        ', [
                            1,
                            $referensi,
                            $tanggal,
                            $effisiensi,
                            $shiftValue,
                            $timeStart,
                            $timeEnd,
                            $spek_mesin,
                            $spek_benang,
                            $colorB,
                            $colorC,
                            $colorD,
                            $colorE,
                            $colorF,
                            $colorG,
                            $timeA,
                            $timeB,
                            $timeC,
                            $timeD,
                            $timeE,
                            $timeF,
                            $timeG,
                            $c1A,
                            $c1B,
                            $c1C,
                            $c1D,
                            $c1E,
                            $c1F,
                            $c1G,
                            $c2A,
                            $c2B,
                            $c2C,
                            $c2D,
                            $c2E,
                            $c2F,
                            $c2G,
                            $c3A,
                            $c3B,
                            $c3C,
                            $c3D,
                            $c3E,
                            $c3F,
                            $c3G,
                            $c4A,
                            $c4B,
                            $c4C,
                            $c4D,
                            $c4E,
                            $c4F,
                            $c4G,
                            $c5A,
                            $c5B,
                            $c5C,
                            $c5D,
                            $c5E,
                            $c5F,
                            $c5G,
                            $c6A,
                            $c6B,
                            $c6C,
                            $c6D,
                            $c6E,
                            $c6F,
                            $c6G,
                            $c7A,
                            $c7B,
                            $c7C,
                            $c7D,
                            $c7E,
                            $c7F,
                            $c7G,
                            $c8A,
                            $c8B,
                            $c8C,
                            $c8D,
                            $c8E,
                            $c8F,
                            $c8G,
                            $flA,
                            $flB,
                            $flC,
                            $flD,
                            $flE,
                            $flF,
                            $flG,
                            $scA,
                            $scB,
                            $scC,
                            $scD,
                            $scE,
                            $scF,
                            $scG,
                            $jnA,
                            $jnB,
                            $jnC,
                            $jnD,
                            $jnE,
                            $jnF,
                            $jnG,
                            $d1A,
                            $d1B,
                            $d1C,
                            $d1D,
                            $d1E,
                            $d1F,
                            $d1G,
                            $d2A,
                            $d2B,
                            $d2C,
                            $d2D,
                            $d2E,
                            $d2F,
                            $d2G,
                            $d3A,
                            $d3B,
                            $d3C,
                            $d3D,
                            $d3E,
                            $d3F,
                            $d3G,
                            $d4A,
                            $d4B,
                            $d4C,
                            $d4D,
                            $d4E,
                            $d4F,
                            $d4G,
                            $d5A,
                            $d5B,
                            $d5C,
                            $d5D,
                            $d5E,
                            $d5F,
                            $d5G,
                            $d6A,
                            $d6B,
                            $d6C,
                            $d6D,
                            $d6E,
                            $d6F,
                            $d6G,
                            $srA,
                            $srB,
                            $srC,
                            $srD,
                            $srE,
                            $srF,
                            $srG,
                            $mrA,
                            $mrB,
                            $mrC,
                            $mrD,
                            $mrE,
                            $mrF,
                            $mrG,
                            $mvA,
                            $mvB,
                            $mvC,
                            $mvD,
                            $mvE,
                            $mvF,
                            $mvG,
                            $mpp1A,
                            $mpp1B,
                            $mpp1C,
                            $mpp1D,
                            $mpp1E,
                            $mpp1F,
                            $mpp1G,
                            $mpp2A,
                            $mpp2B,
                            $mpp2C,
                            $mpp2D,
                            $mpp2E,
                            $mpp2F,
                            $mpp2G,
                            $qbA,
                            $qbB,
                            $qbC,
                            $qbD,
                            $qbE,
                            $qbF,
                            $qbG,
                            $fewA,
                            $fewB,
                            $fewC,
                            $fewD,
                            $fewE,
                            $fewF,
                            $fewG,
                            $swA,
                            $swB,
                            $swC,
                            $swD,
                            $swE,
                            $swF,
                            $swG,
                            $noyA,
                            $noyB,
                            $noyC,
                            $noyD,
                            $noyE,
                            $noyF,
                            $noyG,
                            $wgA,
                            $wgB,
                            $wgC,
                            $wgD,
                            $wgE,
                            $wgF,
                            $wgG,
                            $rs1A,
                            $rs1B,
                            $rs1C,
                            $rs1D,
                            $rs1E,
                            $rs1F,
                            $rs1G,
                            $rs2A,
                            $rs2B,
                            $rs2C,
                            $rs2D,
                            $rs2E,
                            $rs2F,
                            $rs2G,
                            $rs3A,
                            $rs3B,
                            $rs3C,
                            $rs3D,
                            $rs3E,
                            $rs3F,
                            $rs3G,
                            $strA,
                            $strB,
                            $strC,
                            $strD,
                            $strE,
                            $strF,
                            $strG,
                            $rA,
                            $rB,
                            $rC,
                            $rD,
                            $rE,
                            $rF,
                            $rG,
                            $uotA,
                            $uotB,
                            $uotC,
                            $uotD,
                            $uotE,
                            $uotF,
                            $uotG,
                            $lotA,
                            $lotB,
                            $lotC,
                            $lotD,
                            $lotE,
                            $lotF,
                            $lotG,
                            $at1A,
                            $at1B,
                            $at1C,
                            $at1D,
                            $at1E,
                            $at1F,
                            $at1G,
                            $at2A,
                            $at2B,
                            $at2C,
                            $at2D,
                            $at2E,
                            $at2F,
                            $at2G,
                            $at3A,
                            $at3B,
                            $at3C,
                            $at3D,
                            $at3E,
                            $at3F,
                            $at3G,
                            $time1,
                            $remark1,
                            $time2,
                            $remark2,
                            $time3,
                            $remark3,
                            $time4,
                            $remark4,
                            $time5,
                            $remark5,
                            $time6,
                            $remark6,
                            $kwhM1,
                            $kwhM2,
                            $jamProd,
                            $ppA,
                            $ppB,
                            $ppC,
                            $ppD,
                            $cacA,
                            $cacB,
                            $cacC,
                            $cacD,
                            $cacE,
                            $cacF,
                            $mbA,
                            $mbB,
                            $mbC,
                            $mbD,
                            $mbE,
                            $mbF,
                            $uvA,
                            $uvB,
                            $uvC,
                            $uvD,
                            $uvE,
                            $uvF,
                            $asbA,
                            $asbB,
                            $asbC,
                            $asbD,
                            $asbE,
                            $asbF,
                            $llA,
                            $llB,
                            $llC,
                            $llD,
                            $llF,
                            $bhn1A,
                            $bhn1B,
                            $bhn1C,
                            $bhn1D,
                            $bhn1E,
                            $bhn1F,
                            $bhn2A,
                            $bhn2B,
                            $bhn2C,
                            $bhn2D,
                            $bhn2E,
                            $bhn2F,
                            $mbAT,
                            $uvAT,
                            $asbAT,
                            $llAT,
                            $bngM,
                            $prongM,
                            $silM,
                            $bngL,
                            $prongL,
                            $silL,
                            $bngMe,
                            $prongMe,
                            $silMe,
                            $bngGB,
                            $prongGB,
                            $silGB,
                            $bngLL,
                            $prongLL,
                            $silLL,
                            $total,
                            $user,
                            $id_lokasi
                        ]);
                    return response()->json(['message' => 'Data sudah tersimpan']);

                } catch (Exception $e) {
                    return response()->json(['error' => 'Terjadi kesalahan saat memproses data: ' . $e->getMessage()]);
                }
            } else {
                return response()->json(['error' => 'Maksimal membuat 2 laporan pada tanggal dan shift yang sama!']);
            }

        } else if ($kodeProses == "2") {
            $idLaporan = $request->input('idLaporan');
            // dd($idLaporan);
            // $check = DB::connection('ConnExtruder')
            //     ->select(
            //         'EXEC SP_4451_Count_LaporanProduksiExtruder @Tanggal = ?, @ShiftValue = ?',
            //         [$tanggal, $shiftValue]
            //     );
            // // dd($check);
            // $Ada = 0;
            // foreach ($check as $row) {
            //     $Ada = $row->JumlahData ?? 0;
            // }

            // if ($Ada == 0) {
            $result = DB::connection('ConnExtruder')
                ->select('EXEC SP_4451_GetDataLaporanProduksiExtruder @Kode = ?, @idLaporan = ?', [3, $idLaporan]);
            $userEdit = null;
            foreach ($result as $row) {
                $userEdit = $row->userInput ?? 0;
            }
            // dd(in_array($user, ['4451', '4384']));
            if ($userEdit == $user || in_array($user, ['4451', '4384'])) {
                try {
                    DB::connection('ConnExtruder')
                        ->statement('EXEC SP_4451_LaporanProduksiExtruder 
                            @kode =?,
                            @referensi =?,
                            @tanggal =?,
                            @effisiensi =?,
                            @shiftValue =?,
                            @timeStart =?,
                            @timeEnd =?,
                            @spek_mesin =?,
                            @spek_benang =?,
                            @colorB =?,
                            @colorC =?,
                            @colorD =?,
                            @colorE =?,
                            @colorF =?,
                            @colorG =?,
                            @timeA =?,
                            @timeB =?,
                            @timeC =?,
                            @timeD =?,
                            @timeE =?,
                            @timeF =?,
                            @timeG =?,
                            @c1A =?,
                            @c1B =?,
                            @c1C =?,
                            @c1D =?,
                            @c1E =?,
                            @c1F =?,
                            @c1G =?,
                            @c2A =?,
                            @c2B =?,
                            @c2C =?,
                            @c2D =?,
                            @c2E =?,
                            @c2F =?,
                            @c2G =?,
                            @c3A =?,
                            @c3B =?,
                            @c3C =?,
                            @c3D =?,
                            @c3E =?,
                            @c3F =?,
                            @c3G =?,
                            @c4A =?,
                            @c4B =?,
                            @c4C =?,
                            @c4D =?,
                            @c4E =?,
                            @c4F =?,
                            @c4G =?,
                            @c5A =?,
                            @c5B =?,
                            @c5C =?,
                            @c5D =?,
                            @c5E =?,
                            @c5F =?,
                            @c5G =?,
                            @c6A =?,
                            @c6B =?,
                            @c6C =?,
                            @c6D =?,
                            @c6E =?,
                            @c6F =?,
                            @c6G =?,
                            @c7A =?,
                            @c7B =?,
                            @c7C =?,
                            @c7D =?,
                            @c7E =?,
                            @c7F =?,
                            @c7G =?,
                            @c8A =?,
                            @c8B =?,
                            @c8C =?,
                            @c8D =?,
                            @c8E =?,
                            @c8F =?,
                            @c8G =?,
                            @flA =?,
                            @flB =?,
                            @flC =?,
                            @flD =?,
                            @flE =?,
                            @flF =?,
                            @flG =?,
                            @scA =?,
                            @scB =?,
                            @scC =?,
                            @scD =?,
                            @scE =?,
                            @scF =?,
                            @scG =?,
                            @jnA =?,
                            @jnB =?,
                            @jnC =?,
                            @jnD =?,
                            @jnE =?,
                            @jnF =?,
                            @jnG =?,
                            @d1A =?,
                            @d1B =?,
                            @d1C =?,
                            @d1D =?,
                            @d1E =?,
                            @d1F =?,
                            @d1G =?,
                            @d2A =?,
                            @d2B =?,
                            @d2C =?,
                            @d2D =?,
                            @d2E =?,
                            @d2F =?,
                            @d2G =?,
                            @d3A =?,
                            @d3B =?,
                            @d3C =?,
                            @d3D =?,
                            @d3E =?,
                            @d3F =?,
                            @d3G =?,
                            @d4A =?,
                            @d4B =?,
                            @d4C =?,
                            @d4D =?,
                            @d4E =?,
                            @d4F =?,
                            @d4G =?,
                            @d5A =?,
                            @d5B =?,
                            @d5C =?,
                            @d5D =?,
                            @d5E =?,
                            @d5F =?,
                            @d5G =?,
                            @d6A =?,
                            @d6B =?,
                            @d6C =?,
                            @d6D =?,
                            @d6E =?,
                            @d6F =?,
                            @d6G =?,
                            @srA =?,
                            @srB =?,
                            @srC =?,
                            @srD =?,
                            @srE =?,
                            @srF =?,
                            @srG =?,
                            @mrA =?,
                            @mrB =?,
                            @mrC =?,
                            @mrD =?,
                            @mrE =?,
                            @mrF =?,
                            @mrG =?,
                            @mvA =?,
                            @mvB =?,
                            @mvC =?,
                            @mvD =?,
                            @mvE =?,
                            @mvF =?,
                            @mvG =?,
                            @mpp1A =?,
                            @mpp1B =?,
                            @mpp1C =?,
                            @mpp1D =?,
                            @mpp1E =?,
                            @mpp1F =?,
                            @mpp1G =?,
                            @mpp2A =?,
                            @mpp2B =?,
                            @mpp2C =?,
                            @mpp2D =?,
                            @mpp2E =?,
                            @mpp2F =?,
                            @mpp2G =?,
                            @qbA =?,
                            @qbB =?,
                            @qbC =?,
                            @qbD =?,
                            @qbE =?,
                            @qbF =?,
                            @qbG =?,
                            @fewA =?,
                            @fewB =?,
                            @fewC =?,
                            @fewD =?,
                            @fewE =?,
                            @fewF =?,
                            @fewG =?,
                            @swA =?,
                            @swB =?,
                            @swC =?,
                            @swD =?,
                            @swE =?,
                            @swF =?,
                            @swG =?,
                            @noyA =?,
                            @noyB =?,
                            @noyC =?,
                            @noyD =?,
                            @noyE =?,
                            @noyF =?,
                            @noyG =?,
                            @wgA =?,
                            @wgB =?,
                            @wgC =?,
                            @wgD =?,
                            @wgE =?,
                            @wgF =?,
                            @wgG =?,
                            @rs1A =?,
                            @rs1B =?,
                            @rs1C =?,
                            @rs1D =?,
                            @rs1E =?,
                            @rs1F =?,
                            @rs1G =?,
                            @rs2A =?,
                            @rs2B =?,
                            @rs2C =?,
                            @rs2D =?,
                            @rs2E =?,
                            @rs2F =?,
                            @rs2G =?,
                            @rs3A =?,
                            @rs3B =?,
                            @rs3C =?,
                            @rs3D =?,
                            @rs3E =?,
                            @rs3F =?,
                            @rs3G =?,
                            @strA =?,
                            @strB =?,
                            @strC =?,
                            @strD =?,
                            @strE =?,
                            @strF =?,
                            @strG =?,
                            @rA =?,
                            @rB =?,
                            @rC =?,
                            @rD =?,
                            @rE =?,
                            @rF =?,
                            @rG =?,
                            @uotA =?,
                            @uotB =?,
                            @uotC =?,
                            @uotD =?,
                            @uotE =?,
                            @uotF =?,
                            @uotG =?,
                            @lotA =?,
                            @lotB =?,
                            @lotC =?,
                            @lotD =?,
                            @lotE =?,
                            @lotF =?,
                            @lotG =?,
                            @at1A =?,
                            @at1B =?,
                            @at1C =?,
                            @at1D =?,
                            @at1E =?,
                            @at1F =?,
                            @at1G =?,
                            @at2A =?,
                            @at2B =?,
                            @at2C =?,
                            @at2D =?,
                            @at2E =?,
                            @at2F =?,
                            @at2G =?,
                            @at3A =?,
                            @at3B =?,
                            @at3C =?,
                            @at3D =?,
                            @at3E =?,
                            @at3F =?,
                            @at3G =?,
                            @time1 =?,
                            @remark1 =?,
                            @time2 =?,
                            @remark2 =?,
                            @time3 =?,
                            @remark3 =?,
                            @time4 =?,
                            @remark4 =?,
                            @time5 =?,
                            @remark5 =?,
                            @time6 =?,
                            @remark6 =?,
                            @kwhM1 =?,
                            @kwhM2 =?,
                            @jamProd =?,
                            @ppA =?,
                            @ppB =?,
                            @ppC =?,
                            @ppD =?,
                            @cacA =?,
                            @cacB =?,
                            @cacC =?,
                            @cacD =?,
                            @cacE =?,
                            @cacF =?,
                            @mbA =?,
                            @mbB =?,
                            @mbC =?,
                            @mbD =?,
                            @mbE =?,
                            @mbF =?,
                            @uvA =?,
                            @uvB =?,
                            @uvC =?,
                            @uvD =?,
                            @uvE =?,
                            @uvF =?,
                            @asbA =?,
                            @asbB =?,
                            @asbC =?,
                            @asbD =?,
                            @asbE =?,
                            @asbF =?,
                            @llA =?,
                            @llB =?,
                            @llC =?,
                            @llD =?,
                            @llF =?,
                            @bhn1A =?,
                            @bhn1B =?,
                            @bhn1C =?,
                            @bhn1D =?,
                            @bhn1E =?,
                            @bhn1F =?,
                            @bhn2A =?,
                            @bhn2B =?,
                            @bhn2C =?,
                            @bhn2D =?,
                            @bhn2E =?,
                            @bhn2F =?,
                            @mbAT =?,
                            @uvAT =?,
                            @asbAT =?,
                            @llAT =?,
                            @bngM =?,
                            @prongM =?,
                            @silM =?,
                            @bngL =?,
                            @prongL =?,
                            @silL =?,
                            @bngMe =?,
                            @prongMe =?,
                            @silMe =?,
                            @bngGB =?,
                            @prongGB =?,
                            @silGB =?,
                            @bngLL =?,
                            @prongLL =?,
                            @silLL =?,
                            @total =?,
                            @userInput =?,
                            @idLaporan =?', [
                            2,
                            $referensi,
                            $tanggal,
                            $effisiensi,
                            $shiftValue,
                            $timeStart,
                            $timeEnd,
                            $spek_mesin,
                            $spek_benang,
                            $colorB,
                            $colorC,
                            $colorD,
                            $colorE,
                            $colorF,
                            $colorG,
                            $timeA,
                            $timeB,
                            $timeC,
                            $timeD,
                            $timeE,
                            $timeF,
                            $timeG,
                            $c1A,
                            $c1B,
                            $c1C,
                            $c1D,
                            $c1E,
                            $c1F,
                            $c1G,
                            $c2A,
                            $c2B,
                            $c2C,
                            $c2D,
                            $c2E,
                            $c2F,
                            $c2G,
                            $c3A,
                            $c3B,
                            $c3C,
                            $c3D,
                            $c3E,
                            $c3F,
                            $c3G,
                            $c4A,
                            $c4B,
                            $c4C,
                            $c4D,
                            $c4E,
                            $c4F,
                            $c4G,
                            $c5A,
                            $c5B,
                            $c5C,
                            $c5D,
                            $c5E,
                            $c5F,
                            $c5G,
                            $c6A,
                            $c6B,
                            $c6C,
                            $c6D,
                            $c6E,
                            $c6F,
                            $c6G,
                            $c7A,
                            $c7B,
                            $c7C,
                            $c7D,
                            $c7E,
                            $c7F,
                            $c7G,
                            $c8A,
                            $c8B,
                            $c8C,
                            $c8D,
                            $c8E,
                            $c8F,
                            $c8G,
                            $flA,
                            $flB,
                            $flC,
                            $flD,
                            $flE,
                            $flF,
                            $flG,
                            $scA,
                            $scB,
                            $scC,
                            $scD,
                            $scE,
                            $scF,
                            $scG,
                            $jnA,
                            $jnB,
                            $jnC,
                            $jnD,
                            $jnE,
                            $jnF,
                            $jnG,
                            $d1A,
                            $d1B,
                            $d1C,
                            $d1D,
                            $d1E,
                            $d1F,
                            $d1G,
                            $d2A,
                            $d2B,
                            $d2C,
                            $d2D,
                            $d2E,
                            $d2F,
                            $d2G,
                            $d3A,
                            $d3B,
                            $d3C,
                            $d3D,
                            $d3E,
                            $d3F,
                            $d3G,
                            $d4A,
                            $d4B,
                            $d4C,
                            $d4D,
                            $d4E,
                            $d4F,
                            $d4G,
                            $d5A,
                            $d5B,
                            $d5C,
                            $d5D,
                            $d5E,
                            $d5F,
                            $d5G,
                            $d6A,
                            $d6B,
                            $d6C,
                            $d6D,
                            $d6E,
                            $d6F,
                            $d6G,
                            $srA,
                            $srB,
                            $srC,
                            $srD,
                            $srE,
                            $srF,
                            $srG,
                            $mrA,
                            $mrB,
                            $mrC,
                            $mrD,
                            $mrE,
                            $mrF,
                            $mrG,
                            $mvA,
                            $mvB,
                            $mvC,
                            $mvD,
                            $mvE,
                            $mvF,
                            $mvG,
                            $mpp1A,
                            $mpp1B,
                            $mpp1C,
                            $mpp1D,
                            $mpp1E,
                            $mpp1F,
                            $mpp1G,
                            $mpp2A,
                            $mpp2B,
                            $mpp2C,
                            $mpp2D,
                            $mpp2E,
                            $mpp2F,
                            $mpp2G,
                            $qbA,
                            $qbB,
                            $qbC,
                            $qbD,
                            $qbE,
                            $qbF,
                            $qbG,
                            $fewA,
                            $fewB,
                            $fewC,
                            $fewD,
                            $fewE,
                            $fewF,
                            $fewG,
                            $swA,
                            $swB,
                            $swC,
                            $swD,
                            $swE,
                            $swF,
                            $swG,
                            $noyA,
                            $noyB,
                            $noyC,
                            $noyD,
                            $noyE,
                            $noyF,
                            $noyG,
                            $wgA,
                            $wgB,
                            $wgC,
                            $wgD,
                            $wgE,
                            $wgF,
                            $wgG,
                            $rs1A,
                            $rs1B,
                            $rs1C,
                            $rs1D,
                            $rs1E,
                            $rs1F,
                            $rs1G,
                            $rs2A,
                            $rs2B,
                            $rs2C,
                            $rs2D,
                            $rs2E,
                            $rs2F,
                            $rs2G,
                            $rs3A,
                            $rs3B,
                            $rs3C,
                            $rs3D,
                            $rs3E,
                            $rs3F,
                            $rs3G,
                            $strA,
                            $strB,
                            $strC,
                            $strD,
                            $strE,
                            $strF,
                            $strG,
                            $rA,
                            $rB,
                            $rC,
                            $rD,
                            $rE,
                            $rF,
                            $rG,
                            $uotA,
                            $uotB,
                            $uotC,
                            $uotD,
                            $uotE,
                            $uotF,
                            $uotG,
                            $lotA,
                            $lotB,
                            $lotC,
                            $lotD,
                            $lotE,
                            $lotF,
                            $lotG,
                            $at1A,
                            $at1B,
                            $at1C,
                            $at1D,
                            $at1E,
                            $at1F,
                            $at1G,
                            $at2A,
                            $at2B,
                            $at2C,
                            $at2D,
                            $at2E,
                            $at2F,
                            $at2G,
                            $at3A,
                            $at3B,
                            $at3C,
                            $at3D,
                            $at3E,
                            $at3F,
                            $at3G,
                            $time1,
                            $remark1,
                            $time2,
                            $remark2,
                            $time3,
                            $remark3,
                            $time4,
                            $remark4,
                            $time5,
                            $remark5,
                            $time6,
                            $remark6,
                            $kwhM1,
                            $kwhM2,
                            $jamProd,
                            $ppA,
                            $ppB,
                            $ppC,
                            $ppD,
                            $cacA,
                            $cacB,
                            $cacC,
                            $cacD,
                            $cacE,
                            $cacF,
                            $mbA,
                            $mbB,
                            $mbC,
                            $mbD,
                            $mbE,
                            $mbF,
                            $uvA,
                            $uvB,
                            $uvC,
                            $uvD,
                            $uvE,
                            $uvF,
                            $asbA,
                            $asbB,
                            $asbC,
                            $asbD,
                            $asbE,
                            $asbF,
                            $llA,
                            $llB,
                            $llC,
                            $llD,
                            $llF,
                            $bhn1A,
                            $bhn1B,
                            $bhn1C,
                            $bhn1D,
                            $bhn1E,
                            $bhn1F,
                            $bhn2A,
                            $bhn2B,
                            $bhn2C,
                            $bhn2D,
                            $bhn2E,
                            $bhn2F,
                            $mbAT,
                            $uvAT,
                            $asbAT,
                            $llAT,
                            $bngM,
                            $prongM,
                            $silM,
                            $bngL,
                            $prongL,
                            $silL,
                            $bngMe,
                            $prongMe,
                            $silMe,
                            $bngGB,
                            $prongGB,
                            $silGB,
                            $bngLL,
                            $prongLL,
                            $silLL,
                            $total,
                            $user,
                            $idLaporan
                        ]);
                    return response()->json(['message' => 'Data sudah terkoreksi']);

                } catch (Exception $e) {
                    return response()->json(['error' => 'Terjadi kesalahan saat memproses data: ' . $e->getMessage()]);
                }
            } else {
                return response()->json(['error' => 'User tidak memiliki hak untuk koreksi laporan dengan id ' . $idLaporan]);
            }
            // } else {
            //     return response()->json(['error' => 'Tidak bisa update laporan. Sudah ada tanggal dan shift yang sama !']);
            // }

        } else if ($kodeProses == "3") {
            $idLaporan = $request->input('idLaporan');
            $result = DB::connection('ConnExtruder')
                ->select('EXEC SP_4451_GetDataLaporanProduksiExtruder @Kode = ?, @idLaporan = ?', [3, $idLaporan]);
            $userDel = null;
            foreach ($result as $row) {
                $userDel = $row->userInput ?? 0;
            }
            // dd(in_array($user, ['4451', '4384']));
            if ($userDel == $user || in_array($user, ['4451', '4384'])) {
                try {
                    $results = DB::connection('ConnExtruder')
                        ->statement('EXEC SP_4451_GetDataLaporanProduksiExtruder @Kode = ?, @idLaporan = ?, @userDel = ?', [2, $idLaporan, $user]);

                    return response()->json(['message' => 'Data sudah terhapus']);

                } catch (Exception $e) {
                    return response()->json(['error' => 'Terjadi kesalahan saat memproses data: ' . $e->getMessage()]);
                }
            } else {
                return response()->json(['error' => 'User tidak memiliki hak untuk menghapus laporan dengan id ' . $idLaporan]);
            }

            #region Proses Lohia
        } else if ($kodeProses == "4") {
            // dd($request->all());
            try {
                DB::connection('ConnExtruder')
                    ->statement('EXEC SP_4451_LaporanProduksiLohia
                        @kode = ?,
                        @user_input = ?,
                        @referensi = ?,
                        @tanggal = ?,
                        @effisiensi = ?,
                        @shiftValue = ?,
                        @timeStart = ?,
                        @timeEnd = ?,
                        @spek_mesin = ?,
                        @spek_benang = ?,
                        @lokasi = ?,
                        @timeA = ?,
                        @timeB = ?,
                        @timeC = ?,
                        @timeD = ?,
                        @timeE = ?,
                        @timeF = ?,
                        @bz1A = ?,
                        @bz1B = ?,
                        @bz1C = ?,
                        @bz1D = ?,
                        @bz1E = ?,
                        @bz1F = ?,
                        @bz2A = ?,
                        @bz2B = ?,
                        @bz2C = ?,
                        @bz2D = ?,
                        @bz2E = ?,
                        @bz2F = ?,
                        @bz3A = ?,
                        @bz3B = ?,
                        @bz3C = ?,
                        @bz3D = ?,
                        @bz3E = ?,
                        @bz3F = ?,
                        @bz4A = ?,
                        @bz4B = ?,
                        @bz4C = ?,
                        @bz4D = ?,
                        @bz4E = ?,
                        @bz4F = ?,
                        @bz5A = ?,
                        @bz5B = ?,
                        @bz5C = ?,
                        @bz5D = ?,
                        @bz5E = ?,
                        @bz5F = ?,
                        @bz6A = ?,
                        @bz6B = ?,
                        @bz6C = ?,
                        @bz6D = ?,
                        @bz6E = ?,
                        @bz6F = ?,
                        @scA = ?,
                        @scB = ?,
                        @scC = ?,
                        @scD = ?,
                        @scE = ?,
                        @scF = ?,
                        @mpA = ?,
                        @mpB = ?,
                        @mpC = ?,
                        @mpD = ?,
                        @mpE = ?,
                        @mpF = ?,
                        @ad1A = ?,
                        @ad1B = ?,
                        @ad1C = ?,
                        @ad1D = ?,
                        @ad1E = ?,
                        @ad1F = ?,
                        @ad2A = ?,
                        @ad2B = ?,
                        @ad2C = ?,
                        @ad2D = ?,
                        @ad2E = ?,
                        @ad2F = ?,
                        @wpheA = ?,
                        @wpheB = ?,
                        @wpheC = ?,
                        @wpheD = ?,
                        @wpheE = ?,
                        @wpheF = ?,
                        @ipheA = ?,
                        @ipheB = ?,
                        @ipheC = ?,
                        @ipheD = ?,
                        @ipheE = ?,
                        @ipheF = ?,
                        @mtA = ?,
                        @mtB = ?,
                        @mtC = ?,
                        @mtD = ?,
                        @mtE = ?,
                        @mtF = ?,
                        @dz1A = ?,
                        @dz1B = ?,
                        @dz1C = ?,
                        @dz1D = ?,
                        @dz1E = ?,
                        @dz1F = ?,
                        @dz2A = ?,
                        @dz2B = ?,
                        @dz2C = ?,
                        @dz2D = ?,
                        @dz2E = ?,
                        @dz2F = ?,
                        @dz3A = ?,
                        @dz3B = ?,
                        @dz3C = ?,
                        @dz3D = ?,
                        @dz3E = ?,
                        @dz3F = ?,
                        @dz4A = ?,
                        @dz4B = ?,
                        @dz4C = ?,
                        @dz4D = ?,
                        @dz4E = ?,
                        @dz4F = ?,
                        @dz5A = ?,
                        @dz5B = ?,
                        @dz5C = ?,
                        @dz5D = ?,
                        @dz5E = ?,
                        @dz5F = ?,
                        @haoA = ?,
                        @haoB = ?,
                        @haoC = ?,
                        @haoD = ?,
                        @haoE = ?,
                        @haoF = ?,
                        @unitA = ?,
                        @unitB = ?,
                        @unitC = ?,
                        @unitD = ?,
                        @unitE = ?,
                        @unitF = ?,
                        @mp2A = ?,
                        @mp2B = ?,
                        @mp2C = ?,
                        @mp2D = ?,
                        @mp2E = ?,
                        @mp2F = ?,
                        @extA = ?,
                        @extB = ?,
                        @extC = ?,
                        @extD = ?,
                        @extE = ?,
                        @extF = ?,
                        @niprA = ?,
                        @niprB = ?,
                        @niprC = ?,
                        @niprD = ?,
                        @niprE = ?,
                        @niprF = ?,
                        @trA = ?,
                        @trB = ?,
                        @trC = ?,
                        @trD = ?,
                        @trE = ?,
                        @trF = ?,
                        @huA = ?,
                        @huB = ?,
                        @huC = ?,
                        @huD = ?,
                        @huE = ?,
                        @huF = ?,
                        @isuA = ?,
                        @isuB = ?,
                        @isuC = ?,
                        @isuD = ?,
                        @isuE = ?,
                        @isuF = ?,
                        @suA = ?,
                        @suB = ?,
                        @suC = ?,
                        @suD = ?,
                        @suE = ?,
                        @suF = ?,
                        @pauA = ?,
                        @pauB = ?,
                        @pauC = ?,
                        @pauD = ?,
                        @pauE = ?,
                        @pauF = ?,
                        @auA = ?,
                        @auB = ?,
                        @auC = ?,
                        @auD = ?,
                        @auE = ?,
                        @auF = ?,
                        @wgA = ?,
                        @wgB = ?,
                        @wgC = ?,
                        @wgD = ?,
                        @wgE = ?,
                        @wgF = ?,
                        @fewA = ?,
                        @fewB = ?,
                        @fewC = ?,
                        @fewD = ?,
                        @fewE = ?,
                        @fewF = ?,
                        @noyA = ?,
                        @noyB = ?,
                        @noyC = ?,
                        @noyD = ?,
                        @noyE = ?,
                        @noyF = ?,
                        @swA = ?,
                        @swB = ?,
                        @swC = ?,
                        @swD = ?,
                        @swE = ?,
                        @swF = ?,
                        @totrA = ?,
                        @totrB = ?,
                        @totrC = ?,
                        @totrD = ?,
                        @totrE = ?,
                        @totrF = ?,
                        @relaxA = ?,
                        @relaxB = ?,
                        @relaxC = ?,
                        @relaxD = ?,
                        @relaxE = ?,
                        @relaxF = ?,
                        @tp2A = ?,
                        @tp2B = ?,
                        @tp2C = ?,
                        @tp2D = ?,
                        @tp2E = ?,
                        @tp2F = ?,
                        @tp1A = ?,
                        @tp1B = ?,
                        @tp1C = ?,
                        @tp1D = ?,
                        @tp1E = ?,
                        @tp1F = ?,
                        @tp3A = ?,
                        @tp3B = ?,
                        @tp3C = ?,
                        @tp3D = ?,
                        @tp3E = ?,
                        @tp3F = ?,
                        @at1A = ?,
                        @at1B = ?,
                        @at1C = ?,
                        @at1D = ?,
                        @at1E = ?,
                        @at1F = ?,
                        @at2A = ?,
                        @at2B = ?,
                        @at2C = ?,
                        @at2D = ?,
                        @at2E = ?,
                        @at2F = ?,
                        @tfA = ?,
                        @tfB = ?,
                        @tfC = ?,
                        @tfD = ?,
                        @tfE = ?,
                        @tfF = ?,
                        @ldA = ?,
                        @ldB = ?,
                        @ldC = ?,
                        @ldD = ?,
                        @ldE = ?,
                        @ldF = ?,
                        @time1 = ?,
                        @remark1 = ?,
                        @time2 = ?,
                        @remark2 = ?,
                        @time3 = ?,
                        @remark3 = ?,
                        @time4 = ?,
                        @remark4 = ?,
                        @kwhM1 = ?,
                        @kwhM2 = ?,
                        @jamProd = ?,
                        @ppA = ?,
                        @ppB = ?,
                        @ppC = ?,
                        @ppD = ?,
                        @cacA = ?,
                        @cacB = ?,
                        @cacC = ?,
                        @cacD = ?,
                        @cacE = ?,
                        @cacF = ?,
                        @mbAT = ?,
                        @mbA = ?,
                        @mbB = ?,
                        @mbC = ?,
                        @mbD = ?,
                        @mbE = ?,
                        @mbF = ?,
                        @uvAT = ?,
                        @uvA = ?,
                        @uvB = ?,
                        @uvC = ?,
                        @uvD = ?,
                        @uvE = ?,
                        @uvF = ?,
                        @asbAT = ?,
                        @asbA = ?,
                        @asbB = ?,
                        @asbC = ?,
                        @asbD = ?,
                        @asbE = ?,
                        @asbF = ?,
                        @llAT = ?,
                        @llA = ?,
                        @llB = ?,
                        @llC = ?,
                        @llD = ?,
                        @llF = ?,
                        @bngM = ?,
                        @prongM = ?,
                        @silM = ?,
                        @bngL = ?,
                        @prongL = ?,
                        @silL = ?,
                        @bngMe = ?,
                        @prongMe = ?,
                        @silMe = ?,
                        @bngGB = ?,
                        @prongGB = ?,
                        @silGB = ?,
                        @bngLL = ?,
                        @prongLL = ?,
                        @silLL = ?,
                        @total = ?
                        ', [
                        1,
                        $user,
                        $referensiD,
                        $tanggalD,
                        $effisiensiD,
                        $shiftValueD,
                        $timeStartD,
                        $timeEndD,
                        $spek_mesinD,
                        $spek_benangD,
                        $id_lokasi,
                        $timeAD,
                        $timeBD,
                        $timeCD,
                        $timeDD,
                        $timeED,
                        $timeFD,
                        $bz1AD,
                        $bz1BD,
                        $bz1CD,
                        $bz1DD,
                        $bz1ED,
                        $bz1FD,
                        $bz2AD,
                        $bz2BD,
                        $bz2CD,
                        $bz2DD,
                        $bz2ED,
                        $bz2FD,
                        $bz3AD,
                        $bz3BD,
                        $bz3CD,
                        $bz3DD,
                        $bz3ED,
                        $bz3FD,
                        $bz4AD,
                        $bz4BD,
                        $bz4CD,
                        $bz4DD,
                        $bz4ED,
                        $bz4FD,
                        $bz5AD,
                        $bz5BD,
                        $bz5CD,
                        $bz5DD,
                        $bz5ED,
                        $bz5FD,
                        $bz6AD,
                        $bz6BD,
                        $bz6CD,
                        $bz6DD,
                        $bz6ED,
                        $bz6FD,
                        $scAD,
                        $scBD,
                        $scCD,
                        $scDD,
                        $scED,
                        $scFD,
                        $mpAD,
                        $mpBD,
                        $mpCD,
                        $mpDD,
                        $mpED,
                        $mpFD,
                        $ad1AD,
                        $ad1BD,
                        $ad1CD,
                        $ad1DD,
                        $ad1ED,
                        $ad1FD,
                        $ad2AD,
                        $ad2BD,
                        $ad2CD,
                        $ad2DD,
                        $ad2ED,
                        $ad2FD,
                        $wpheAD,
                        $wpheBD,
                        $wpheCD,
                        $wpheDD,
                        $wpheED,
                        $wpheFD,
                        $ipheAD,
                        $ipheBD,
                        $ipheCD,
                        $ipheDD,
                        $ipheED,
                        $ipheFD,
                        $mtAD,
                        $mtBD,
                        $mtCD,
                        $mtDD,
                        $mtED,
                        $mtFD,
                        $dz1AD,
                        $dz1BD,
                        $dz1CD,
                        $dz1DD,
                        $dz1ED,
                        $dz1FD,
                        $dz2AD,
                        $dz2BD,
                        $dz2CD,
                        $dz2DD,
                        $dz2ED,
                        $dz2FD,
                        $dz3AD,
                        $dz3BD,
                        $dz3CD,
                        $dz3DD,
                        $dz3ED,
                        $dz3FD,
                        $dz4AD,
                        $dz4BD,
                        $dz4CD,
                        $dz4DD,
                        $dz4ED,
                        $dz4FD,
                        $dz5AD,
                        $dz5BD,
                        $dz5CD,
                        $dz5DD,
                        $dz5ED,
                        $dz5FD,
                        $haoAD,
                        $haoBD,
                        $haoCD,
                        $haoDD,
                        $haoED,
                        $haoFD,
                        $unitAD,
                        $unitBD,
                        $unitCD,
                        $unitDD,
                        $unitED,
                        $unitFD,
                        $mp2AD,
                        $mp2BD,
                        $mp2CD,
                        $mp2DD,
                        $mp2ED,
                        $mp2FD,
                        $extAD,
                        $extBD,
                        $extCD,
                        $extDD,
                        $extED,
                        $extFD,
                        $niprAD,
                        $niprBD,
                        $niprCD,
                        $niprDD,
                        $niprED,
                        $niprFD,
                        $trAD,
                        $trBD,
                        $trCD,
                        $trDD,
                        $trED,
                        $trFD,
                        $huAD,
                        $huBD,
                        $huCD,
                        $huDD,
                        $huED,
                        $huFD,
                        $isuAD,
                        $isuBD,
                        $isuCD,
                        $isuDD,
                        $isuED,
                        $isuFD,
                        $suAD,
                        $suBD,
                        $suCD,
                        $suDD,
                        $suED,
                        $suFD,
                        $pauAD,
                        $pauBD,
                        $pauCD,
                        $pauDD,
                        $pauED,
                        $pauFD,
                        $auAD,
                        $auBD,
                        $auCD,
                        $auDD,
                        $auED,
                        $auFD,
                        $wgAD,
                        $wgBD,
                        $wgCD,
                        $wgDD,
                        $wgED,
                        $wgFD,
                        $fewAD,
                        $fewBD,
                        $fewCD,
                        $fewDD,
                        $fewED,
                        $fewFD,
                        $noyAD,
                        $noyBD,
                        $noyCD,
                        $noyDD,
                        $noyED,
                        $noyFD,
                        $swAD,
                        $swBD,
                        $swCD,
                        $swDD,
                        $swED,
                        $swFD,
                        $totrAD,
                        $totrBD,
                        $totrCD,
                        $totrDD,
                        $totrED,
                        $totrFD,
                        $relaxAD,
                        $relaxBD,
                        $relaxCD,
                        $relaxDD,
                        $relaxED,
                        $relaxFD,
                        $tp2AD,
                        $tp2BD,
                        $tp2CD,
                        $tp2DD,
                        $tp2ED,
                        $tp2FD,
                        $tp1AD,
                        $tp1BD,
                        $tp1CD,
                        $tp1DD,
                        $tp1ED,
                        $tp1FD,
                        $tp3AD,
                        $tp3BD,
                        $tp3CD,
                        $tp3DD,
                        $tp3ED,
                        $tp3FD,
                        $at1AD,
                        $at1BD,
                        $at1CD,
                        $at1DD,
                        $at1ED,
                        $at1FD,
                        $at2AD,
                        $at2BD,
                        $at2CD,
                        $at2DD,
                        $at2ED,
                        $at2FD,
                        $tfAD,
                        $tfBD,
                        $tfCD,
                        $tfDD,
                        $tfED,
                        $tfFD,
                        $ldAD,
                        $ldBD,
                        $ldCD,
                        $ldDD,
                        $ldED,
                        $ldFD,
                        $time1D,
                        $remark1D,
                        $time2D,
                        $remark2D,
                        $time3D,
                        $remark3D,
                        $time4D,
                        $remark4D,
                        $kwhM1D,
                        $kwhM2D,
                        $jamProdD,
                        $ppAD,
                        $ppBD,
                        $ppCD,
                        $ppDD,
                        $cacAD,
                        $cacBD,
                        $cacCD,
                        $cacDD,
                        $cacED,
                        $cacFD,
                        $mbATD,
                        $mbAD,
                        $mbBD,
                        $mbCD,
                        $mbDD,
                        $mbED,
                        $mbFD,
                        $uvATD,
                        $uvAD,
                        $uvBD,
                        $uvCD,
                        $uvDD,
                        $uvED,
                        $uvFD,
                        $asbATD,
                        $asbAD,
                        $asbBD,
                        $asbCD,
                        $asbDD,
                        $asbED,
                        $asbFD,
                        $llATD,
                        $llAD,
                        $llBD,
                        $llCD,
                        $llDD,
                        $llFD,
                        $bngMD,
                        $prongMD,
                        $silMD,
                        $bngLD,
                        $prongLD,
                        $silLD,
                        $bngMeD,
                        $prongMeD,
                        $silMeD,
                        $bngGBD,
                        $prongGBD,
                        $silGBD,
                        $bngLLD,
                        $prongLLD,
                        $silLLD,
                        $totalD,
                    ]);
                return response()->json(['message' => 'Data sudah tersimpan']);

            } catch (Exception $e) {
                return response()->json(['error' => 'Terjadi kesalahan saat memproses data: ' . $e->getMessage()]);
            }

        } else if ($kodeProses == "5") {
            $idLaporan = $request->input('idLaporan');
            // dd($request->all());
            $result = DB::connection('ConnExtruder')
                ->select('EXEC SP_4451_LaporanProduksiLohia @kode = ?, @idLaporan = ?', [7, $idLaporan]);
            $userEdit = null;
            foreach ($result as $row) {
                $userEdit = $row->user_input ?? 0;
            }
            // dd(in_array($user, ['4451', '4384']));
            if ($userEdit == $user || in_array($user, ['4451', '4384'])) {
                try {
                    DB::connection('ConnExtruder')
                        ->statement('EXEC SP_4451_LaporanProduksiLohia
                        @kode = ?,
                        @idLaporan = ?,
                        @user_koreksi = ?,
                        @referensi = ?,
                        @tanggal = ?,
                        @effisiensi = ?,
                        @shiftValue = ?,
                        @timeStart = ?,
                        @timeEnd = ?,
                        @spek_mesin = ?,
                        @spek_benang = ?,
                        @lokasi = ?,
                        @timeA = ?,
                        @timeB = ?,
                        @timeC = ?,
                        @timeD = ?,
                        @timeE = ?,
                        @timeF = ?,
                        @bz1A = ?,
                        @bz1B = ?,
                        @bz1C = ?,
                        @bz1D = ?,
                        @bz1E = ?,
                        @bz1F = ?,
                        @bz2A = ?,
                        @bz2B = ?,
                        @bz2C = ?,
                        @bz2D = ?,
                        @bz2E = ?,
                        @bz2F = ?,
                        @bz3A = ?,
                        @bz3B = ?,
                        @bz3C = ?,
                        @bz3D = ?,
                        @bz3E = ?,
                        @bz3F = ?,
                        @bz4A = ?,
                        @bz4B = ?,
                        @bz4C = ?,
                        @bz4D = ?,
                        @bz4E = ?,
                        @bz4F = ?,
                        @bz5A = ?,
                        @bz5B = ?,
                        @bz5C = ?,
                        @bz5D = ?,
                        @bz5E = ?,
                        @bz5F = ?,
                        @bz6A = ?,
                        @bz6B = ?,
                        @bz6C = ?,
                        @bz6D = ?,
                        @bz6E = ?,
                        @bz6F = ?,
                        @scA = ?,
                        @scB = ?,
                        @scC = ?,
                        @scD = ?,
                        @scE = ?,
                        @scF = ?,
                        @mpA = ?,
                        @mpB = ?,
                        @mpC = ?,
                        @mpD = ?,
                        @mpE = ?,
                        @mpF = ?,
                        @ad1A = ?,
                        @ad1B = ?,
                        @ad1C = ?,
                        @ad1D = ?,
                        @ad1E = ?,
                        @ad1F = ?,
                        @ad2A = ?,
                        @ad2B = ?,
                        @ad2C = ?,
                        @ad2D = ?,
                        @ad2E = ?,
                        @ad2F = ?,
                        @wpheA = ?,
                        @wpheB = ?,
                        @wpheC = ?,
                        @wpheD = ?,
                        @wpheE = ?,
                        @wpheF = ?,
                        @ipheA = ?,
                        @ipheB = ?,
                        @ipheC = ?,
                        @ipheD = ?,
                        @ipheE = ?,
                        @ipheF = ?,
                        @mtA = ?,
                        @mtB = ?,
                        @mtC = ?,
                        @mtD = ?,
                        @mtE = ?,
                        @mtF = ?,
                        @dz1A = ?,
                        @dz1B = ?,
                        @dz1C = ?,
                        @dz1D = ?,
                        @dz1E = ?,
                        @dz1F = ?,
                        @dz2A = ?,
                        @dz2B = ?,
                        @dz2C = ?,
                        @dz2D = ?,
                        @dz2E = ?,
                        @dz2F = ?,
                        @dz3A = ?,
                        @dz3B = ?,
                        @dz3C = ?,
                        @dz3D = ?,
                        @dz3E = ?,
                        @dz3F = ?,
                        @dz4A = ?,
                        @dz4B = ?,
                        @dz4C = ?,
                        @dz4D = ?,
                        @dz4E = ?,
                        @dz4F = ?,
                        @dz5A = ?,
                        @dz5B = ?,
                        @dz5C = ?,
                        @dz5D = ?,
                        @dz5E = ?,
                        @dz5F = ?,
                        @haoA = ?,
                        @haoB = ?,
                        @haoC = ?,
                        @haoD = ?,
                        @haoE = ?,
                        @haoF = ?,
                        @unitA = ?,
                        @unitB = ?,
                        @unitC = ?,
                        @unitD = ?,
                        @unitE = ?,
                        @unitF = ?,
                        @mp2A = ?,
                        @mp2B = ?,
                        @mp2C = ?,
                        @mp2D = ?,
                        @mp2E = ?,
                        @mp2F = ?,
                        @extA = ?,
                        @extB = ?,
                        @extC = ?,
                        @extD = ?,
                        @extE = ?,
                        @extF = ?,
                        @niprA = ?,
                        @niprB = ?,
                        @niprC = ?,
                        @niprD = ?,
                        @niprE = ?,
                        @niprF = ?,
                        @trA = ?,
                        @trB = ?,
                        @trC = ?,
                        @trD = ?,
                        @trE = ?,
                        @trF = ?,
                        @huA = ?,
                        @huB = ?,
                        @huC = ?,
                        @huD = ?,
                        @huE = ?,
                        @huF = ?,
                        @isuA = ?,
                        @isuB = ?,
                        @isuC = ?,
                        @isuD = ?,
                        @isuE = ?,
                        @isuF = ?,
                        @suA = ?,
                        @suB = ?,
                        @suC = ?,
                        @suD = ?,
                        @suE = ?,
                        @suF = ?,
                        @pauA = ?,
                        @pauB = ?,
                        @pauC = ?,
                        @pauD = ?,
                        @pauE = ?,
                        @pauF = ?,
                        @auA = ?,
                        @auB = ?,
                        @auC = ?,
                        @auD = ?,
                        @auE = ?,
                        @auF = ?,
                        @wgA = ?,
                        @wgB = ?,
                        @wgC = ?,
                        @wgD = ?,
                        @wgE = ?,
                        @wgF = ?,
                        @fewA = ?,
                        @fewB = ?,
                        @fewC = ?,
                        @fewD = ?,
                        @fewE = ?,
                        @fewF = ?,
                        @noyA = ?,
                        @noyB = ?,
                        @noyC = ?,
                        @noyD = ?,
                        @noyE = ?,
                        @noyF = ?,
                        @swA = ?,
                        @swB = ?,
                        @swC = ?,
                        @swD = ?,
                        @swE = ?,
                        @swF = ?,
                        @totrA = ?,
                        @totrB = ?,
                        @totrC = ?,
                        @totrD = ?,
                        @totrE = ?,
                        @totrF = ?,
                        @relaxA = ?,
                        @relaxB = ?,
                        @relaxC = ?,
                        @relaxD = ?,
                        @relaxE = ?,
                        @relaxF = ?,
                        @tp2A = ?,
                        @tp2B = ?,
                        @tp2C = ?,
                        @tp2D = ?,
                        @tp2E = ?,
                        @tp2F = ?,
                        @tp1A = ?,
                        @tp1B = ?,
                        @tp1C = ?,
                        @tp1D = ?,
                        @tp1E = ?,
                        @tp1F = ?,
                        @tp3A = ?,
                        @tp3B = ?,
                        @tp3C = ?,
                        @tp3D = ?,
                        @tp3E = ?,
                        @tp3F = ?,
                        @at1A = ?,
                        @at1B = ?,
                        @at1C = ?,
                        @at1D = ?,
                        @at1E = ?,
                        @at1F = ?,
                        @at2A = ?,
                        @at2B = ?,
                        @at2C = ?,
                        @at2D = ?,
                        @at2E = ?,
                        @at2F = ?,
                        @tfA = ?,
                        @tfB = ?,
                        @tfC = ?,
                        @tfD = ?,
                        @tfE = ?,
                        @tfF = ?,
                        @ldA = ?,
                        @ldB = ?,
                        @ldC = ?,
                        @ldD = ?,
                        @ldE = ?,
                        @ldF = ?,
                        @time1 = ?,
                        @remark1 = ?,
                        @time2 = ?,
                        @remark2 = ?,
                        @time3 = ?,
                        @remark3 = ?,
                        @time4 = ?,
                        @remark4 = ?,
                        @kwhM1 = ?,
                        @kwhM2 = ?,
                        @jamProd = ?,
                        @ppA = ?,
                        @ppB = ?,
                        @ppC = ?,
                        @ppD = ?,
                        @cacA = ?,
                        @cacB = ?,
                        @cacC = ?,
                        @cacD = ?,
                        @cacE = ?,
                        @cacF = ?,
                        @mbAT = ?,
                        @mbA = ?,
                        @mbB = ?,
                        @mbC = ?,
                        @mbD = ?,
                        @mbE = ?,
                        @mbF = ?,
                        @uvAT = ?,
                        @uvA = ?,
                        @uvB = ?,
                        @uvC = ?,
                        @uvD = ?,
                        @uvE = ?,
                        @uvF = ?,
                        @asbAT = ?,
                        @asbA = ?,
                        @asbB = ?,
                        @asbC = ?,
                        @asbD = ?,
                        @asbE = ?,
                        @asbF = ?,
                        @llAT = ?,
                        @llA = ?,
                        @llB = ?,
                        @llC = ?,
                        @llD = ?,
                        @llF = ?,
                        @bngM = ?,
                        @prongM = ?,
                        @silM = ?,
                        @bngL = ?,
                        @prongL = ?,
                        @silL = ?,
                        @bngMe = ?,
                        @prongMe = ?,
                        @silMe = ?,
                        @bngGB = ?,
                        @prongGB = ?,
                        @silGB = ?,
                        @bngLL = ?,
                        @prongLL = ?,
                        @silLL = ?,
                        @total = ?
                        ', [
                            2,
                            $idLaporan,
                            $user,
                            $referensiD,
                            $tanggalD,
                            $effisiensiD,
                            $shiftValueD,
                            $timeStartD,
                            $timeEndD,
                            $spek_mesinD,
                            $spek_benangD,
                            $id_lokasi,
                            $timeAD,
                            $timeBD,
                            $timeCD,
                            $timeDD,
                            $timeED,
                            $timeFD,
                            $bz1AD,
                            $bz1BD,
                            $bz1CD,
                            $bz1DD,
                            $bz1ED,
                            $bz1FD,
                            $bz2AD,
                            $bz2BD,
                            $bz2CD,
                            $bz2DD,
                            $bz2ED,
                            $bz2FD,
                            $bz3AD,
                            $bz3BD,
                            $bz3CD,
                            $bz3DD,
                            $bz3ED,
                            $bz3FD,
                            $bz4AD,
                            $bz4BD,
                            $bz4CD,
                            $bz4DD,
                            $bz4ED,
                            $bz4FD,
                            $bz5AD,
                            $bz5BD,
                            $bz5CD,
                            $bz5DD,
                            $bz5ED,
                            $bz5FD,
                            $bz6AD,
                            $bz6BD,
                            $bz6CD,
                            $bz6DD,
                            $bz6ED,
                            $bz6FD,
                            $scAD,
                            $scBD,
                            $scCD,
                            $scDD,
                            $scED,
                            $scFD,
                            $mpAD,
                            $mpBD,
                            $mpCD,
                            $mpDD,
                            $mpED,
                            $mpFD,
                            $ad1AD,
                            $ad1BD,
                            $ad1CD,
                            $ad1DD,
                            $ad1ED,
                            $ad1FD,
                            $ad2AD,
                            $ad2BD,
                            $ad2CD,
                            $ad2DD,
                            $ad2ED,
                            $ad2FD,
                            $wpheAD,
                            $wpheBD,
                            $wpheCD,
                            $wpheDD,
                            $wpheED,
                            $wpheFD,
                            $ipheAD,
                            $ipheBD,
                            $ipheCD,
                            $ipheDD,
                            $ipheED,
                            $ipheFD,
                            $mtAD,
                            $mtBD,
                            $mtCD,
                            $mtDD,
                            $mtED,
                            $mtFD,
                            $dz1AD,
                            $dz1BD,
                            $dz1CD,
                            $dz1DD,
                            $dz1ED,
                            $dz1FD,
                            $dz2AD,
                            $dz2BD,
                            $dz2CD,
                            $dz2DD,
                            $dz2ED,
                            $dz2FD,
                            $dz3AD,
                            $dz3BD,
                            $dz3CD,
                            $dz3DD,
                            $dz3ED,
                            $dz3FD,
                            $dz4AD,
                            $dz4BD,
                            $dz4CD,
                            $dz4DD,
                            $dz4ED,
                            $dz4FD,
                            $dz5AD,
                            $dz5BD,
                            $dz5CD,
                            $dz5DD,
                            $dz5ED,
                            $dz5FD,
                            $haoAD,
                            $haoBD,
                            $haoCD,
                            $haoDD,
                            $haoED,
                            $haoFD,
                            $unitAD,
                            $unitBD,
                            $unitCD,
                            $unitDD,
                            $unitED,
                            $unitFD,
                            $mp2AD,
                            $mp2BD,
                            $mp2CD,
                            $mp2DD,
                            $mp2ED,
                            $mp2FD,
                            $extAD,
                            $extBD,
                            $extCD,
                            $extDD,
                            $extED,
                            $extFD,
                            $niprAD,
                            $niprBD,
                            $niprCD,
                            $niprDD,
                            $niprED,
                            $niprFD,
                            $trAD,
                            $trBD,
                            $trCD,
                            $trDD,
                            $trED,
                            $trFD,
                            $huAD,
                            $huBD,
                            $huCD,
                            $huDD,
                            $huED,
                            $huFD,
                            $isuAD,
                            $isuBD,
                            $isuCD,
                            $isuDD,
                            $isuED,
                            $isuFD,
                            $suAD,
                            $suBD,
                            $suCD,
                            $suDD,
                            $suED,
                            $suFD,
                            $pauAD,
                            $pauBD,
                            $pauCD,
                            $pauDD,
                            $pauED,
                            $pauFD,
                            $auAD,
                            $auBD,
                            $auCD,
                            $auDD,
                            $auED,
                            $auFD,
                            $wgAD,
                            $wgBD,
                            $wgCD,
                            $wgDD,
                            $wgED,
                            $wgFD,
                            $fewAD,
                            $fewBD,
                            $fewCD,
                            $fewDD,
                            $fewED,
                            $fewFD,
                            $noyAD,
                            $noyBD,
                            $noyCD,
                            $noyDD,
                            $noyED,
                            $noyFD,
                            $swAD,
                            $swBD,
                            $swCD,
                            $swDD,
                            $swED,
                            $swFD,
                            $totrAD,
                            $totrBD,
                            $totrCD,
                            $totrDD,
                            $totrED,
                            $totrFD,
                            $relaxAD,
                            $relaxBD,
                            $relaxCD,
                            $relaxDD,
                            $relaxED,
                            $relaxFD,
                            $tp2AD,
                            $tp2BD,
                            $tp2CD,
                            $tp2DD,
                            $tp2ED,
                            $tp2FD,
                            $tp1AD,
                            $tp1BD,
                            $tp1CD,
                            $tp1DD,
                            $tp1ED,
                            $tp1FD,
                            $tp3AD,
                            $tp3BD,
                            $tp3CD,
                            $tp3DD,
                            $tp3ED,
                            $tp3FD,
                            $at1AD,
                            $at1BD,
                            $at1CD,
                            $at1DD,
                            $at1ED,
                            $at1FD,
                            $at2AD,
                            $at2BD,
                            $at2CD,
                            $at2DD,
                            $at2ED,
                            $at2FD,
                            $tfAD,
                            $tfBD,
                            $tfCD,
                            $tfDD,
                            $tfED,
                            $tfFD,
                            $ldAD,
                            $ldBD,
                            $ldCD,
                            $ldDD,
                            $ldED,
                            $ldFD,
                            $time1D,
                            $remark1D,
                            $time2D,
                            $remark2D,
                            $time3D,
                            $remark3D,
                            $time4D,
                            $remark4D,
                            $kwhM1D,
                            $kwhM2D,
                            $jamProdD,
                            $ppAD,
                            $ppBD,
                            $ppCD,
                            $ppDD,
                            $cacAD,
                            $cacBD,
                            $cacCD,
                            $cacDD,
                            $cacED,
                            $cacFD,
                            $mbATD,
                            $mbAD,
                            $mbBD,
                            $mbCD,
                            $mbDD,
                            $mbED,
                            $mbFD,
                            $uvATD,
                            $uvAD,
                            $uvBD,
                            $uvCD,
                            $uvDD,
                            $uvED,
                            $uvFD,
                            $asbATD,
                            $asbAD,
                            $asbBD,
                            $asbCD,
                            $asbDD,
                            $asbED,
                            $asbFD,
                            $llATD,
                            $llAD,
                            $llBD,
                            $llCD,
                            $llDD,
                            $llFD,
                            $bngMD,
                            $prongMD,
                            $silMD,
                            $bngLD,
                            $prongLD,
                            $silLD,
                            $bngMeD,
                            $prongMeD,
                            $silMeD,
                            $bngGBD,
                            $prongGBD,
                            $silGBD,
                            $bngLLD,
                            $prongLLD,
                            $silLLD,
                            $totalD,
                        ]);
                    return response()->json(['message' => 'Data sudah terkoreksi']);

                } catch (Exception $e) {
                    return response()->json(['error' => 'Terjadi kesalahan saat memproses data: ' . $e->getMessage()]);
                }
            } else {
                return response()->json(['error' => 'User tidak memiliki hak untuk koreksi laporan dengan id ' . $idLaporan]);
            }
        } else if ($kodeProses == "6") {
            $idLaporan = $request->input('idLaporan');
            $result = DB::connection('ConnExtruder')
                ->select('EXEC SP_4451_LaporanProduksiLohia @kode = ?, @idLaporan = ?', [7, $idLaporan]);
            $userDel = null;
            foreach ($result as $row) {
                $userDel = $row->user_input ?? 0;
            }
            // dd(in_array($user, ['4451', '4384']));
            if ($userDel == $user || in_array($user, ['4451', '4384'])) {
                try {
                    $results = DB::connection('ConnExtruder')
                        ->statement('EXEC SP_4451_LaporanProduksiLohia @kode = ?, @idLaporan = ?, @user_delete = ?', [6, $idLaporan, $user]);

                    return response()->json(['message' => 'Data sudah terhapus']);

                } catch (Exception $e) {
                    return response()->json(['error' => 'Terjadi kesalahan saat memproses data: ' . $e->getMessage()]);
                }
            } else {
                return response()->json(['error' => 'User tidak memiliki hak untuk menghapus laporan dengan id ' . $idLaporan]);
            }
        }

    }

    public function print(Request $request)
    {
        // dd($request->all());
        $idLaporan = $request->input('idLaporan');

        $data = DB::connection('ConnExtruder')
            ->table('LaporanProduksiExtruder')
            ->where('idLaporan', $idLaporan)
            ->first();

        if (!$data) {
            abort(404, 'Data laporan tidak ditemukan');
        }

        $userInput = trim($data->userInput);

        $ttdRaw = DB::connection('ConnEDP')
            ->select(
                'EXEC SP_4451_EDP_MaintenanceTTDUser @XKode = ?, @XNomorUser = ?',
                [2, $userInput]
            );

        $ttd = null;

        if (!empty($ttdRaw)) {
            $row = $ttdRaw[0];

            $ttd = [
                'NamaUser' => $row->NamaUser,
                'FotoTtd' => trim($row->FotoTtd),
            ];
        }


        return view(
            'Extruder.Extruder.printLaporanProduksiExtruder',
            [
                'data' => $data,
                'ttd' => $ttd
            ]
        );
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getPrintLaporan') {
            $idLaporan = $request->input('idLaporan');
            $results = DB::connection('ConnExtruder')
                ->table('LaporanProduksiExtruder')
                ->where('idLaporan', $idLaporan)
                ->select('*')
                ->get();
            if ($results) {
                $userInput = trim($results[0]->userInput);
            }

            $ttdRaw = DB::connection('ConnEDP')
                ->select('EXEC SP_4451_EDP_MaintenanceTTDUser @XKode = ?, @XNomorUser = ?', [2, $userInput]);
            $ttd = null;
            if (!empty($ttdRaw)) {
                $row = $ttdRaw[0]; // ttd pasti 1 baris
                $ttd = [
                    'NamaUser' => $row->NamaUser,
                    'FotoTtd' => trim($row->FotoTtd),
                ];
            }
            if (!empty($results)) {
                return response()->json([
                    'status' => 'ada',
                    'ttd' => $ttd,
                    'data' => $results
                ]);
            } else {
                return response()->json([
                    'status' => 'tidakAda',
                    'ttd' => [],
                    'data' => []
                ]);

            }

        } else if ($id == 'getDataLaporan') {
            // $idLaporan = $request->input('idLaporan');
            $results = DB::connection('ConnExtruder')
                ->select('EXEC SP_4451_GetDataLaporanProduksiExtruder @Kode = ?', [1]);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'idLaporan' => trim($row->idLaporan),
                    'shiftValue' => trim($row->shiftValue),
                    // 'tanggal' => trim($row->tanggal),
                    'spek_mesin' => trim($row->spek_mesin),
                    'spek_benang' => trim($row->spek_benang),
                    'userInput' => trim($row->userInput),

                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataLaporanRedisplay') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $id_lokasi = $request->input('id_lokasi');

            if ($id_lokasi == 3) {
                // dd($tgl_awal, $tgl_akhir, $id_lokasi);
                $results = DB::connection('ConnExtruder')
                    ->select('EXEC SP_4451_LaporanProduksiLohia @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [5, $tgl_awal, $tgl_akhir, $id_lokasi]);
                // dd($results);
                $response = [];
                foreach ($results as $row) {
                    $response[] = [
                        'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                        'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                        'idLaporan' => trim($row->idLaporan),
                        'shiftValue' => trim($row->shiftValue),
                        // 'tanggal' => trim($row->tanggal),
                        'spek_mesin' => trim($row->spek_mesin),
                        'spek_benang' => trim($row->spek_benang),
                        'userInput' => trim($row->user_input),
                        'userVerified' => trim($row->userVerified),
                    ];
                }
                // dd($response); 
                return datatables($response)->make(true);
            } else {
                $results = DB::connection('ConnExtruder')
                    ->select('EXEC SP_4451_GetDataLaporanProduksiExtruder @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [4, $tgl_awal, $tgl_akhir, $id_lokasi]);
                $response = [];
                foreach ($results as $row) {
                    $response[] = [
                        'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                        'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                        'idLaporan' => trim($row->idLaporan),
                        'shiftValue' => trim($row->shiftValue),
                        // 'tanggal' => trim($row->tanggal),
                        'spek_mesin' => trim($row->spek_mesin),
                        'spek_benang' => trim($row->spek_benang),
                        'userInput' => trim($row->userInput),
                        'userVerified' => trim($row->userVerified),
                    ];
                }
                // dd($response); 
                return datatables($response)->make(true);
            }
        } else if ($id == 'getPrintLaporanL') {
            $idLaporan = $request->input('idLaporan');
            $results = DB::connection('ConnExtruder')
                ->table('LaporanProduksiLohia')
                ->where('idLaporan', $idLaporan)
                ->select('*')
                ->get();
            if ($results) {
                $user_input = trim($results[0]->user_input);
            }

            $ttdRaw = DB::connection('ConnEDP')
                ->select('EXEC SP_4451_EDP_MaintenanceTTDUser @XKode = ?, @XNomorUser = ?', [2, $user_input]);
            $ttd = null;
            if (!empty($ttdRaw)) {
                $row = $ttdRaw[0]; // ttd pasti 1 baris
                $ttd = [
                    'NamaUser' => $row->NamaUser,
                    'FotoTtd' => trim($row->FotoTtd),
                ];
            }
            if (!empty($results)) {
                return response()->json([
                    'status' => 'ada',
                    'ttd' => $ttd,
                    'data' => $results
                ]);
            } else {
                return response()->json([
                    'status' => 'tidakAda',
                    'ttd' => [],
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
