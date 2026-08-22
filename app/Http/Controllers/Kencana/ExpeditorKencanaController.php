<?php

namespace App\Http\Controllers\Kencana;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Kencana\KcnExpeditor;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class ExpeditorKencanaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = KcnExpeditor::where('IsActive', 1)->get();

        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Kencana');

        return view(
            'Kencana.Expeditor.Index',
            compact('data', 'access')
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $model = new KcnExpeditor;

        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Kencana');

        return view(
            'Kencana.Expeditor.Create',
            compact('model', 'access')
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'NamaExpeditor' => 'required',
        ]);

        $NamaExpeditor = $request->NamaExpeditor ?? null;
        $ContactPerson = $request->ContactPerson ?? null;
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

        DB::connection('ConnKCNSales')->statement(
            'EXEC SP_1273_PRG_MAINT_EXPEDITOR
                @Kode = ?,
                @NamaExpeditor = ?,
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
                @NoTelex = ?,
                @Email = ?',
            [
                1,
                $NamaExpeditor,
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
                $NoTelex,
                $Email
            ]
        );

        return redirect()
            ->route('Kencana.Expeditor.index')
            ->with('success', 'Data Expeditor berhasil disimpan.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = KcnExpeditor::where(
            'IDExpeditor',
            $id
        )->first();

        if (!$data) {
            return response()->json([
                'error' => 'Expeditor tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $model = KcnExpeditor::find($id);

        if (!$model) {
            abort(404, 'Expeditor tidak ditemukan.');
        }

        $access = (new HakAksesController)
            ->HakAksesFiturMaster('Kencana');

        return view(
            'Kencana.Expeditor.Edit',
            compact('model', 'access')
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'NamaExpeditor' => 'required',
        ]);

        $NamaExpeditor = $request->NamaExpeditor ?? null;
        $ContactPerson = $request->ContactPerson ?? null;
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

        DB::connection('ConnKCNSales')->statement(
            'EXEC SP_1273_PRG_MAINT_EXPEDITOR
                @Kode = ?,
                @IDExpeditor = ?,
                @NamaExpeditor = ?,
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
                @NoTelex = ?,
                @Email = ?',
            [
                2,
                $id,
                $NamaExpeditor,
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
                $NoTelex,
                $Email
            ]
        );

        return redirect()
            ->route('Kencana.Expeditor.index')
            ->with('success', 'Data Expeditor berhasil diubah.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        DB::connection('ConnKCNSales')->statement(
            'EXEC SP_4384_SLS_MASTER
                @XKode = ?,
                @XIDExpeditor = ?',
            [
                5,
                $id
            ]
        );

        return redirect()
            ->route('Kencana.Expeditor.index')
            ->with('success', 'Data Expeditor berhasil dihapus.');
    }
}