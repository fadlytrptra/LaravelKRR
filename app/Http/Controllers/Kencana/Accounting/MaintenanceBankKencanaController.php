<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;


class MaintenanceBankKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        $kodePerkiraan = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_KODE_PERKIRAAN] @Kode = 1');
        return view('Kencana.Accounting.MaintenanceBank', compact(['kodePerkiraan', 'access']));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        try {
            $IdBank = $request->idBank;
            $NamaBank = $request->isiNamaBank;
            $JenisBank = $request->jenisBankSelect;
            $Alamat = $request->alamat;
            $Kota = $request->kota;
            $Telp = $request->telp;
            $Person = $request->person;
            $Hp = $request->hp;
            $Rekening = $request->noRekening;
            $Saldo = $request->saldoBank;
            $kodePerkiraanSelect = $request->kodePerkiraanSelect;
            $Aktif = 'Y';

            DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_UDT_BANK_TBANK]
            @Kode = ?,
            @IdBank = ?,
            @NamaBank = ?,
            @JenisBank = ?,
            @Alamat = ?,
            @Kota = ?,
            @Telp = ?,
            @Person = ?,
            @Hp = ?,
            @Rekening = ?,
            @Aktif = ?,
            @Saldo = ?,
            @Perkiraan = ?', [
                1,
                $IdBank,
                $NamaBank,
                $JenisBank,
                $Alamat,
                $Kota,
                $Telp,
                $Person,
                $Hp,
                $Rekening,
                $Aktif,
                $Saldo,
                $kodePerkiraanSelect
            ]);
            return response()->json(['success' => 'Bank berhasil ditambahkan!']);
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }

    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        try {
            if ($id == 'getAllBank') {
                $listBank = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_BANK_IDBANK_TBANK]'); //Get All data Bank where aktif == 'Y'
                return datatables($listBank)->make(true);
            } else if ($id == 'getCertainBank') {
                $data = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_BANK_IDBANK_TBANK] @IdBank = ?', [$request->idBank]);
                return response()->json($data);
            }
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        dd('masuk edit');
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        try {
            $idBank = $id;
            $namaBankSelect = $request->namaBankSelect;
            $jenisBank = $request->jenisBankSelect;
            $alamat = $request->alamat;
            $kota = $request->kota;
            $telp = $request->telp;
            $person = $request->person;
            $hp = $request->hp;
            $saldoBank = $request->saldoBank;
            $noRekening = $request->norekening;
            $Aktif = 'Y';
            $kodePerkiraan = $request->kodePerkiraanSelect;

            // Perform the database update for the selected namaBank
            DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_UDT_BANK_TBANK]
            @Kode = ?,
            @IdBank = ?,
            @NamaBank = ?,
            @JenisBank = ?,
            @Alamat = ?,
            @Kota = ?,
            @Telp = ?,
            @Person = ?,
            @Hp = ?,
            @Rekening = ?,
            @Aktif = ?,
            @Saldo = ?,
            @Perkiraan = ?', [
                2,
                $idBank,
                $namaBankSelect,
                $jenisBank,
                $alamat,
                $kota,
                $telp,
                $person,
                $hp,
                $noRekening,
                $Aktif,
                $saldoBank,
                $kodePerkiraan
            ]);
            return response()->json(['success' => 'Bank berhasil ditambahkan!']);
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        try {
            DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_UDT_BANK_TBANK]
            @Kode = ?,
            @IdBank = ?', [
                3,
                $id
            ]);
            return response()->json(['success' => 'Bank berhasil dinonaktifkan!']);
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }
}
