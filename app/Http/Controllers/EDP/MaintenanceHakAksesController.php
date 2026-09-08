<?php

namespace App\Http\Controllers\EDP;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Exception;

class MaintenanceHakAksesController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('EDP');
        $pegawai = DB::connection('ConnEDP')->table('UserMaster')
            ->select('NomorUser', 'NamaUser')
            ->where('IsActive', 1)
            ->orderBy('NamaUser', 'asc')
            ->get();
        $program = DB::connection('ConnEDP')->table('ProgramMaster')->select('*')->orderBy('NamaProgram', 'ASC')->get();
        // dd($pegawai);
        return view('EDP.Master.MaintenanceHakAkses', compact('access', 'pegawai', 'program'));
    }

    function getAllFitur($IdProgram, $NomorPegawai)
    {
        $fiturMaster = DB::connection('ConnEDP')->table('FiturMaster')
            ->select('NamaMenu', 'NamaFitur', 'IdFitur')
            ->leftJoin('MenuMaster', 'Id_Menu', '=', 'IdMenu')
            ->where('Id_Program', '=', $IdProgram)
            ->orderBy('NamaMenu', 'ASC')
            ->orderByRaw("
                LTRIM(
                    SUBSTRING(
                        NamaFitur,
                        CHARINDEX('-', NamaFitur) + 1,
                        LEN(NamaFitur)
                    )
                ) ASC
            ")
            ->get();

        $idFiturMilikUser = DB::connection('ConnEDP')->table('User_Fitur')
            ->select('Id_Fitur')
            ->leftJoin('UserMaster', 'IdUser', '=', 'Id_User')
            ->where('NomorUser', '=', $NomorPegawai)
            ->get();

        if ($NomorPegawai !== 666) {
            $idFiturPublic = DB::connection('ConnEDP')->table('User_Fitur')
                ->select('Id_Fitur')
                ->leftJoin('UserMaster', 'IdUser', '=', 'Id_User')
                ->where('NomorUser', '=', '666')
                ->get();

            $data = [
                $fiturMaster,
                $idFiturMilikUser,
                $idFiturPublic
            ];
        } else {
            $data = [
                $fiturMaster,
                $idFiturMilikUser
            ];
        }

        return response()->json($data);
    }

    function EditUserFitur(Request $request)
    {
        // dd($request->all());


        try {
            if ($request->deletedValues !== "[]") {
                $deletedValues = json_decode($request->deletedValues);
                // dd(count($deletedValues), $deletedValues[0]);
                $detedValuesString = implode(', ', $deletedValues);
                // dd($detedValuesString);
                // DB::connection('ConnEDP')
                //     ->table('User_Fitur')
                //     ->leftJoin('UserMaster', 'User_fitur.Id_User', '=', 'UserMaster.IdUser')
                //     ->where('UserMaster.NomorUser', $request->namaPegawaiText)
                //     ->whereIn('User_fitur.Id_Fitur', $deletedValues)
                //     ->delete();
                for ($i = 0; $i < count($deletedValues); $i++) {
                    DB::connection('ConnEDP')->statement('exec SP_4384_EDP_MaintenanceHakAksesLaravel @XKode = ?, @NomorUser = ?, @DeletedValues = ?', [1, $request->namaPegawaiText, $deletedValues[$i]]);
                }
            }
            if ($request->addedValues !== "[]") {
                $addedValues = json_decode($request->addedValues);
                $addedValuesString = implode(', ', $addedValues);
                // dd($addedValuesString, $request->namaPegawaiText);
                // $iduser = DB::connection('ConnEDP')->table('UserMaster')->select('IDUser')->where('NomorUser', '=', $request->namaPegawaiText)->get();
                // dd($addedValues[0], $iduser[0]->IDUser, $request->namaPegawaiText);
                // DB::connection('ConnEDP')
                //     ->table('User_Fitur')
                //     ->insert([
                //         'Id_User' => $iduser[0]->IDUser,
                //         'Id_Fitur' => $addedValues
                //     ]);
                DB::connection('ConnEDP')->statement('exec SP_4384_EDP_MaintenanceHakAksesLaravel @XKode = ?, @NomorUser = ?, @AddedValues = ?', [2, $request->namaPegawaiText, $addedValuesString]);

            }
            return response()->json(['success' => 'Maintenance Berhasil!']);
        } catch (Exception $e) {
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
        }
        // return redirect()->back()->with('success', 'Maintenance Berhasil!');
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {

    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update($id)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
