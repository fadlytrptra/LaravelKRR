<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class BatalBKKKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Hutang.BatalBKK', compact('access'));
        // $data = 'Accounting';
        // return view('Accounting.Hutang.BatalBKK', compact('data'));
    }

    public function getIdBKKBesarKencana($bulanTahun)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_IDBKK_BTLBKK] @Kode = ?, @BlnThn = ?', [2, $bulanTahun]);
        return response()->json($tabel);
    }

    public function getIdBKKKecilKencana($bulanTahun)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_IDBKK_BTLBKK] @Kode = ?, @BlnThn = ?', [1, $bulanTahun]);
        return response()->json($tabel);
    }

    public function getListBKKBtlBKKKencana($idBKKSelect)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_LIST_BKK_BTLBKK] @BKK = ?', [$idBKKSelect]);
        return response()->json($tabel);
    }

    public function getCheckBtlBKKKencana($idBKKSelect)
    {
        $tabel = DB::connection('ConnKCNAccounting')->select('exec [SP_1273_PRG_CHECK_BTLBKK] @BKK = ?', [$idBKKSelect]);
        return response()->json($tabel);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        // dd($request->all());
        // Mengambil data dari request
        $bkk = (string)$request->input('idBKKSelect');
        $alasan = (string)$request->input('alasan');
        $user_id = trim(Auth::user()->NomorUser);
        $besar = (boolean)$request->input('radiogrup1');
        $kecil = (boolean)$request->input('radiogrup2');
        // dd($user_id, $besar, $kecil);
        // Konfirmasi pertama
        $confirmation = $request->input('confirmation', 'no');
        $ttconfirmation = $request->input('ttReuseConfirmation');
        // dd($confirmation === 'yes', $ttconfirmation);
        if ($confirmation === 'yes') {
            // dd($ttconfirmation === 'yes');
            try {
                // dd($bkk, $alasan, $user_id);
                // Menjalankan prosedur tersimpan pertama
                DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_BATAL_BKK @BKK = :bkk, @Alasan = :alasan, @User = :user', [
                    'bkk' => $bkk,
                    'alasan' => $alasan,
                    'user' => $user_id
                ]);
                // dd($tes);
                // Pesan sukses
                // $this->alert('Data BKK sudah diBATALkan!!..');

                // Konfirmasi kedua
                // dd($ttconfirmation);
                if ($ttconfirmation === 'yes') {
                    // Menentukan kode berdasarkan input
                    $kode = ($besar == false && $kecil == true) ? 2 : (($besar == true && $kecil == false) ? 2 : null);
                    // dd($kode);
                    // Menjalankan prosedur tersimpan kedua jika kode ditentukan
                    if ($kode !== null) {
                        DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_BATAL_BKK_TTLNS @Kode = :kode, @BKK = :bkk', [
                            'kode' => $kode,
                            'bkk' => $bkk
                        ]);
                    }
                }

                // Mengatur ulang form
                $request->merge([
                    'Alasan' => '',
                    'BKK' => '',
                    'StatusTT' => '',
                    'Uang' => '',
                    'Nilai' => 0,
                    'StatusLns' => ''
                ]);

                // Menonaktifkan tombol CmdProses
                // Logika untuk menonaktifkan tombol pada view dapat ditambahkan sesuai kebutuhan

                // Redirect atau respon sesuai kebutuhan
                return redirect()->back()->with('success', 'Proses berhasil!');
            } catch (Exception $e) {
                // dd($e);
                // Menangani kesalahan
                return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
            }
        }

        // Mengarahkan kembali jika tidak ada konfirmasi
        return redirect()->back();
    }

    //Display the specified resource.
    public function show($cr)
    {
        //
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    public function update1(Request $request)
    {
        $idBKKSelect = $request->idBKKSelect;
        $alasan = $request->alasan;

        DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_BATAL_BKK]
            @BKK = ?,
            @Alasan = ?,
            @User = ?', [
            $idBKKSelect,
            $alasan,
            1
        ]);
        return redirect()->back()->with('success', 'Data BKK sudah diBATALkan!!..');
    }

    public function update2(Request $request)
    {
        $idBKKSelect = $request->idBKKSelect;

        DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_PRG_BATAL_BKK_TTLNS]
        @Kode = ?,
        @BKK = ?', [
            2,
            $idBKKSelect
        ]);

        return redirect()->back()->with('success', '');
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        // $idBKKSelect = $request->idBKKSelect;
        // $alasan = $request->alasan;

        // // Pertanyaan pertama
        // if (confirm("Anda yakin Batal BKK ??...")) {
        //     // Jika pengguna menjawab "ya" (OK), jalankan perintah pertama
        //     DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_ACC_BATAL_BKK]
        //     @BKK = ?,
        //     @Alasan = ?,
        //     @User = ?', [
        //         $idBKKSelect,
        //         $alasan,
        //         1
        //     ]);

        //     // Tampilkan pesan
        //     return redirect()->back()->with('success', 'Data BKK sudah diBATALkan!!..');

        //     // Pertanyaan kedua
        //     if (confirm("Apakah Tanda Terima Penagihan dipakai kembali?")) {
        //         // Jika pengguna menjawab "ya" (OK), jalankan perintah kedua
        //         DB::connection('ConnKCNAccounting')->statement('exec [SP_1273_ACC_BATAL_BKK_TTLNS]
        //         @Kode = ?,
        //         @BKK = ?', [
        //             2,
        //             $idBKKSelect
        //         ]);

        //         return redirect()->back()->with('success', '');
        //     }
        // }
        // return redirect()->back();
    }


    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
