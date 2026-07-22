<?php

namespace App\Http\Controllers\Extruder\BeratKomposisi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\DB;

class BeratController extends Controller
{
    public function index($form_name)
    {
        $view_name = 'extruder.Berat Komposisi 2.' . $form_name;
        $view_data = [
            'pageName' => 'BeratKomposisi',
            'formName' => $form_name,
        ];
        // dd($view_name);
        return view($view_name, $view_data);
    }

    public function beratStandar($fun_str, $fun_data, Request $request)
    {
        $param_data = explode('~', $fun_data);

        switch ($fun_str) {
            case 'SP_1273_PRG_CEK_KOMPOSISI_1':
            case 'SP_7775_PBL_SELECT_WOVEN':
            case 'SP_1003_PBL_SELECT_JUMBO':
            case 'SP_1273_BCD_DATA_ADSTAR':
            case 'SP_1273_BCD_DATA_CIRCULAR':
            case 'SP_7775_PBL_SELECT_WOVEN_1':
            case 'SP_1003_PBL_SELECT_JUMBO_1':
            case 'SP_1273_BCD_DATA_ADSTAR_1':
            case 'SP_1273_BCD_DATA_CIRCULAR_1':
            case 'SP_1273_BCD_DATA_BeratStandart_Assesoris_1':
                $param_str = '@KD_BRG = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_7775_PBL_UPDATE_BERAT_WOVEN':
                $param_str = '@KD_BRG = ?, @ket = ?, @brt_karung = ?, @brt_inner = ?, @brt_lami = ?, @brt_opp = ?, @brt_kertas = ?, @brt_lain = ?, @brt_total = ?, @UserId = ' . Auth::user()->NomorUser;
                $param_data[1] = str_replace('-', '/', $param_data[1]); // @ket
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1273_BCD_UPDATE_BERAT_WOVEN_1':
                $param_str = '@KD_BRG = ?, @brt_karung = ?, @brt_inner = ?, @brt_lami = ?, @brt_lain = ?, @brt_total = ?, @UserId = ' . Auth::user()->NomorUser;
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1003_PBL_UPDATE_BERAT_JUMBO_1':
                $param_str = '@KD_BRG = ?, @ket = ?, @brt_cloth = ?, @brt_inner = ?, @brt_lami = ?, @brt_opp = ?, @brt_conductive = ?, @brt_total = ?, @UserId = ' . Auth::user()->NomorUser;
                $param_data[1] = str_replace('-', '/', $param_data[1]); // @ket
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1273_BCD_UPDATE_BERAT_JUMBO_1':
                $param_str = '@KD_BRG = ?, @brt_cloth = ?, @brt_inner = ?, @brt_lami = ?, @brt_conductive = ?, @brt_total = ?, @UserId = ' . Auth::user()->NomorUser;
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1273_BCD_UPDATE_BERAT_ADSTAR':
                $param_str = '@KD_BRG = ?, @ket = ?, @brt_cloth = ?, @brt_lami = ?, @brt_opp = ?, @brt_kertas = ?, @brt_total = ?, @UserId = ' . Auth::user()->NomorUser;
                $param_data[1] = str_replace('-', '/', $param_data[1]); // @ket
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1273_BCD_UPDATE_BERAT_ADSTAR2_1':
                $param_str = '@KD_BRG = ?, @brt_cloth = ?, @brt_lami = ?, @brt_kertas = ?, @brt_total = ?, @UserId = ' . Auth::user()->NomorUser;
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1273_BCD_UPDATE_BERAT_CIRCULAR':
                $param_str = '@KD_BRG = ?, @ket = ?, @brt_karung = ?, @brt_reinforced = ?, @brt_lami = ?, @brt_conductive = ?, @brt_total = ?, @UserId = ' . Auth::user()->NomorUser;
                $param_data[1] = str_replace('-', '/', $param_data[1]); // @ket
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1273_BCD_UPDATE_BERAT_CIRCULAR2_1':
                $param_str = '@KD_BRG = ?, @brt_karung = ?, @brt_reinforced = ?, @brt_lami = ?, @brt_conductive = ?, @brt_total = ?, @UserId = ' . Auth::user()->NomorUser;
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1273_BCD_UPDATE_BERAT_BELT_1':
                $param_str = '@KD_BRG = ?, @ket = ?, @brt_conductive = ?, @brt_lain = ?, @brt_total = ?, @UserId = ' . Auth::user()->NomorUser;
                $param_data[1] = str_replace('-', '/', $param_data[1]); // @ket
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1273_BCD_UPDATE_BERAT_BELT2_1':
                $param_str = '@KD_BRG = ?, @brt_conductive = ?, @brt_lain = ?, @brt_total = ?, @UserId = ' . Auth::user()->NomorUser;
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1273_PRG_BERAT_STANDART~1':
                $fun_str = explode('~', $fun_str)[0];
                $param_str = '@KodeBarang = ?, @kd = 1';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_1273_PRG_BERAT_STANDART~2':
                $fun_str = explode('~', $fun_str)[0];
                // $param_data[1] = str_replace('_', ' ', $param_data[1]); // @alasan
                // $param_data[2] = intval($param_data[2]); // @pa
                // $param_data[3] = intval($param_data[3]); // @pb
                $param_data[0] = $request->input('txtKodeBarang'); //@KodeBarang
                $param_data[1] = $request->input('txtAlasan'); // @alasan
                $param_data[2] = floatval($request->input('numAtas')); // @pa
                $param_data[3] = floatval($request->input('numBawah')); // @pb
                $param_data[4] = $request->input('date'); // @tanggal
                $param_str = '@kd = 2, @KodeBarang = ?, @alasan = ?, @pa = ?, @pb = ?, @userApp = ' . Auth::user()->NomorUser . ', @tanggal = ?';
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            default:
                dd("SP tidak ditemukan.");
                break;
        }
    }

    private function executeSP($action_str, $sp_str, $param_str, $param_data)
    {
        if ($action_str == 'statement') {
            return DB::connection('ConnPurchase')->statement(
                'exec ' . $sp_str . ' ' . $param_str,
                $param_data
            );
        } else if ($action_str == 'select') {
            return DB::connection('ConnPurchase')->select(
                'exec ' . $sp_str . ' ' . $param_str,
                $param_data
            );
        }
    }
}
