<?php

namespace App\Http\Controllers\Kencana;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Kencana\KcnCustomer;
use App\Models\JnsCust;
use App\Http\Controllers\HakAksesController;
use App\Http\Controllers\Controller;

class CustomerKencanaController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $model = new KcnCustomer;

        $jnscust = DB::connection('ConnKCNSales')
            ->select('SELECT * FROM T_JnsCust');

        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Kencana');

        return view(
            'Kencana.Customer.Index',
            compact('access', 'model', 'jnscust')
        );
    }

    // Show the form for creating a new resource.
    public function create()
    {
        $model = new KcnCustomer;

        $jnscust = DB::connection('ConnKCNSales')
            ->select('SELECT * FROM T_JnsCust');

        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Kencana');

        return view(
            'Kencana.Customer.Create',
            compact('model', 'jnscust', 'access')
        );
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $request->validate([
            'KodeCust' => 'required',
            'NamaCust' => 'required',
            'JnsCust'  => 'required',
        ]);

        $KodeCust = $request->KodeCust;
        $JnsCust = $request->JnsCust;
        $NamaCust = $request->NamaCust;

        // Check existing customer
        $existing = DB::connection('ConnKCNSales')
            ->table('T_Customer')
            ->where('KodeCust', $KodeCust)
            ->where('NamaCust', $NamaCust)
            ->where('JnsCust', $JnsCust)
            ->exists();

        if ($existing) {
            return response()->json([
                'error' => 'Data dengan kombinasi KodeCust, NamaCust, dan JnsCust sudah ada.'
            ], 409);
        }

        $NPWP = $request->NPWP ?? null;
        $LimitBeli = $request->LimitBeli ?? 0;
        $ContactPerson = $request->ContactPerson ?? null;
        $AlamatKirim = $request->AlamatKirim ?? null;
        $Alamat = $request->Alamat ?? null;
        $Kota = $request->Kota ?? null;
        $Propinsi = $request->Province ?? null;
        $Negara = $request->Negara ?? null;
        $KodePos = $request->KodePos ?? null;
        $NoTelp1 = $request->NoTelp1 ?? null;
        $NoTelp2 = $request->NoTelp2 ?? null;
        $NoFax1 = $request->NoFax1 ?? null;
        $NoFax2 = $request->NoFax2 ?? null;
        $NoHp1 = $request->NoHp1 ?? null;
        $NoHp2 = $request->NoHp2 ?? null;
        $NoTelex = $request->NoTelex ?? null;
        $Email = $request->Email ?? null;
        $NamaNPWP = $request->NamaNPWP ?? null;
        $AlamatNPWP = $request->AlamatNPWP ?? null;
        $KotaKirim = $request->KotaKirim ?? null;
        $NITKU = $request->NITKU ?? null;
        $IdPembeliCoretax = $request->IdPembeliCoretax ?? null;

        try {
            DB::connection('ConnKCNSales')->statement(
                'EXEC SP_1273_PRG_PROSES_INS_CUSTOMER
                    @KodeCust = ?,
                    @JnsCust = ?,
                    @NamaCust = ?,
                    @NPWP = ?,
                    @LimitBeli = ?,
                    @ContactPerson = ?,
                    @AlamatKirim = ?,
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
                    @NoTelex = ?,
                    @Email = ?,
                    @NamaNPWP = ?,
                    @AlamatNPWP = ?,
                    @KotaKirim = ?,
                    @NITKU = ?,
                    @IdPembeliCoretax = ?',
                [
                    $KodeCust,
                    $JnsCust,
                    $NamaCust,
                    $NPWP,
                    $LimitBeli,
                    $ContactPerson,
                    $AlamatKirim,
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
                    $NoTelex,
                    $Email,
                    $NamaNPWP,
                    $AlamatNPWP,
                    $KotaKirim,
                    $NITKU,
                    $IdPembeliCoretax,
                ]
            );

            return response()->json([
                'success' => 'Data berhasil disimpan!'
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'error' => 'Data gagal disimpan: ' . $ex->getMessage()
            ], 500);
        }
    }

    // Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getallcustomer') {

            $data = DB::connection('ConnKCNSales')
                ->select(
                    'EXEC dbo.SP_4384_SLS_MASTER @XKode = ?',
                    [7]
                );

            return response()->json([
                'data' => $data
            ]);
        }

        if ($id == 'getCertainCustomer') {

            $idCust = trim(
                explode('-', $request->input('idCustomer'))[0]
            );

            $data = KcnCustomer::select('*')
                ->join(
                    'T_JnsCust',
                    'IDJnsCust',
                    '=',
                    'JnsCust'
                )
                ->where('IDCust', $idCust)
                ->first();

            return response()->json([
                'data' => $data
            ]);
        }

        return response()->json([
            'error' => 'Request tidak dikenali.'
        ], 404);
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        $model = KcnCustomer::find($id);

        if (!$model) {
            abort(404, 'Customer tidak ditemukan.');
        }

        $jnscust = DB::connection('ConnKCNSales')
            ->select('SELECT * FROM T_JnsCust');

        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Kencana');

        return view(
            'Kencana.Customer.ModalCustomer',
            compact('model', 'jnscust', 'access')
        );
    }

    // Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $request->validate([
            'KodeCust' => 'required',
            'NamaCust' => 'required',
        ]);

        $NamaCust = $request->NamaCust;
        $NPWP = $request->NPWP ?? null;
        $LimitBeli = $request->LimitBeli ?? 0;
        $ContactPerson = $request->ContactPerson ?? null;
        $AlamatKirim = $request->AlamatKirim ?? null;
        $Alamat = $request->Alamat ?? null;
        $Kota = $request->Kota ?? null;
        $Propinsi = $request->Propinsi ?? null;
        $Negara = $request->Negara ?? null;
        $KodePos = $request->KodePos ?? null;
        $NoTelp1 = $request->NoTelp1 ?? null;
        $NoTelp2 = $request->NoTelp2 ?? null;
        $NoFax1 = $request->NoFax1 ?? null;
        $NoFax2 = $request->NoFax2 ?? null;
        $NoHp1 = $request->NoHp1 ?? null;
        $NoHp2 = $request->NoHp2 ?? null;
        $NoTelex = $request->NoTelex ?? null;
        $Email = $request->Email ?? null;
        $NamaNPWP = $request->NamaNPWP ?? null;
        $AlamatNPWP = $request->AlamatNPWP ?? null;
        $KotaKirim = $request->KotaKirim ?? ' ';
        $NITKU = $request->NITKU ?? null;
        $IdPembeliCoretax = $request->IdPembeliCoretax ?? null;

        DB::connection('ConnKCNSales')->statement(
            'EXEC SP_1273_PRG_UDT_CUSTOMER
                @IdCust = ?,
                @NamaCust = ?,
                @NPWP = ?,
                @LimitBeli = ?,
                @ContactPerson = ?,
                @AlamatKirim = ?,
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
                @NoTelex = ?,
                @Email = ?,
                @NamaNPWP = ?,
                @AlamatNPWP = ?,
                @KotaKirim = ?,
                @NITKU = ?,
                @IdPembeliCoretax = ?',
            [
                $id,
                $NamaCust,
                $NPWP,
                $LimitBeli,
                $ContactPerson,
                $AlamatKirim,
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
                $NoTelex,
                $Email,
                $NamaNPWP,
                $AlamatNPWP,
                $KotaKirim,
                $NITKU,
                $IdPembeliCoretax,
            ]
        );

        return response()->json([
            'success' => 'Data berhasil diubah!'
        ]);
    }

    // Remove the specified resource from storage.
    public function destroy($id)
    {
        DB::connection('ConnKCNSales')->statement(
            'EXEC SP_4384_SLS_MASTER
                @XKode = ?,
                @XIDCust = ?',
            [
                1,
                $id
            ]
        );

        return redirect()
            ->route('Kencana.Customer.index')
            ->with('success', 'Data berhasil dihapus');
    }
}