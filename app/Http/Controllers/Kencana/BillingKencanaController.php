<?php

namespace App\Http\Controllers\Kencana;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Kencana\KcnBilling;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class BillingKencanaController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $data = KcnBilling::get()->where('IsActive', 1);

        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Kencana');

        return view(
            'Kencana.Billing.Index',
            compact('data', 'access')
        );
    }

    // Show the form for creating a new resource.
    public function create()
    {
        $model = new KcnBilling;

        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Kencana');

        return view(
            'Kencana.Billing.Create',
            compact('model', 'access')
        );
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $request->validate([
            'NamaBill' => 'required',
        ]);

        $NamaBill = $request->NamaBill ?? null;
        $ContactPerson = $request->ContactPerson ?? null;
        $Alamat = $request->Alamat ?? null;
        $Kota = $request->Kota ?? null;
        $Propinsi = $request->Provinsi ?? null;
        $Negara = $request->Negara ?? null;
        $KodePos = $request->KodePos ?? null;
        $NoTelp1 = $request->NoTelp1 ?? null;
        $NoTelp2 = $request->NoTelp2 ?? null;
        $NoFax1 = $request->NoFax1 ?? null;
        $NoFax2 = $request->NoFax2 ?? null;
        $NoHp1 = $request->NoHp1 ?? null;
        $NoHp2 = $request->NoHp2 ?? null;
        $noTelex = $request->NoTelex ?? null;
        $email = $request->Email ?? null;

        DB::connection('ConnKCNSales')->statement(
            'exec SP_1273_PRG_PROSES_INS_BILLING
                @NamaBill = ?,
                @ContactPerson = ?,
                @Alamat = ?,
                @Kota = ?,
                @Propinsi = ?,
                @Negara = ?,
                @KodePos = ?,
                @NoTelp1 = ?,
                @NoTelp2 = ?,
                @NoFax1 = ?,
                @NoFax2 = ?,
                @NoHp1 = ?,
                @NoHp2 = ?,
                @noTelex = ?,
                @email = ?',
            [
                $NamaBill,
                $ContactPerson,
                $Alamat,
                $Kota,
                $Propinsi,
                $Negara,
                $KodePos,
                $NoTelp1,
                $NoTelp2,
                $NoFax1,
                $NoFax2,
                $NoHp1,
                $NoHp2,
                $noTelex,
                $email
            ]
        );

       echo "<script type='text/javascript'>
            alert('Data Berhasil disimpan');

            if (window.opener && !window.opener.closed) {
                window.opener.location.reload();
            }

            window.close();
        </script>";
    }

    // Display the specified resource.
    public function show($id)
    {
        $data = KcnBilling::select('*')
            ->where('IDBill', $id)
            ->first();

        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Kencana');

        return compact('data', 'access');
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        $model = KcnBilling::find($id);

        if (!$model) {
            abort(404, 'Billing tidak ditemukan.');
        }

        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Kencana');

        return view(
            'Kencana.Billing.Edit',
            compact('model', 'access')
        );
    }

    // Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $request->validate([
            'NamaBill' => 'required',
        ]);

        $NamaBill = $request->NamaBill ?? null;
        $ContactPerson = $request->ContactPerson ?? null;
        $Alamat = $request->Alamat ?? null;
        $Kota = $request->Kota ?? null;
        $Propinsi = $request->Provinsi ?? null;
        $Negara = $request->Negara ?? null;
        $KodePos = $request->KodePos ?? null;
        $NoTelp1 = $request->NoTelp1 ?? null;
        $NoTelp2 = $request->NoTelp2 ?? null;
        $NoFax1 = $request->NoFax1 ?? null;
        $NoFax2 = $request->NoFax2 ?? null;
        $NoHp1 = $request->NoHp1 ?? null;
        $NoHp2 = $request->NoHp2 ?? null;
        $noTelex = $request->NoTelex ?? null;
        $email = $request->Email ?? null;

        DB::connection('ConnKCNSales')->statement(
            'exec SP_1273_PRG_UDT_BILLING
                @IDBill = ?,
                @NamaBill = ?,
                @ContactPerson = ?,
                @Alamat = ?,
                @Kota = ?,
                @Propinsi = ?,
                @Negara = ?,
                @KodePos = ?,
                @NoTelp1 = ?,
                @NoTelp2 = ?,
                @NoFax1 = ?,
                @NoFax2 = ?,
                @NoHp1 = ?,
                @NoHp2 = ?,
                @noTelex = ?,
                @email = ?',
            [
                $id,
                $NamaBill,
                $ContactPerson,
                $Alamat,
                $Kota,
                $Propinsi,
                $Negara,
                $KodePos,
                $NoTelp1,
                $NoTelp2,
                $NoFax1,
                $NoFax2,
                $NoHp1,
                $NoHp2,
                $noTelex,
                $email
            ]
        );

        echo "<script type='text/javascript'>
            alert('Data Berhasil diubah');

            if (window.opener && !window.opener.closed) {
                window.opener.location.reload();
            }

            window.close();
        </script>";
    }

    // Remove the specified resource from storage.
    public function destroy($id)
    {
        DB::connection('ConnKCNSales')->statement(
            'exec SP_4384_SLS_MASTER
                @XKode = ?,
                @XIDBill = ?',
            [
                3,
                $id
            ]
        );

        return redirect()
            ->route('Kencana.Billing.index')
            ->with('success', 'Data Berhasil dihapus');
    }
}