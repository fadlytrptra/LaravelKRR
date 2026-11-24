<?php

namespace App\Http\Controllers\Kencana\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class BKMNoPenagihanKencanaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Kencana');
        return view('Kencana.Accounting.Piutang.BKMNoPenagihan', compact('access'));
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
        // Initialize variables
        $idbkm = intval(substr($request->id_bkm, 0, 3));
        $total = (float) $request->total;
        // $nilai = 0;
        $ada1 = false;
        $listdetail = $request->input('allRowsDataKiri', []);
        $listbiaya = $request->input('allRowsDataKanan', []);
        $bulantahun = \Carbon\Carbon::parse($request->tanggal_input)->format('my');
        $konversi = $request->terbilang;

        $radio = $request->input('radio');
        // dd($radio);
        // $opt2 = $request->input('option2');
        // $opt3 = $request->input('option3');

        if (!empty($request->id_bkm)) {
            // Initial BKM insert

            // foreach ($listdetail as $lunasItem) {
            //     $biaya = 0;

            //     preg_match('/value="(\d+)"/', $lunasItem[0], $matches);
            //     $itemValue = $matches[1] ?? null;

            //     // Check if there are matching items in ListBiaya
            //     foreach ($listbiaya as $biayaItem) {
            //         if ($itemValue == $biayaItem[3]) {
            //             $biaya += floatval(str_replace(",", "", $biayaItem[1]));
            //             $ad1 = true;
            //         }
            //     }

            //     $nilai = floatval($lunasItem[2]) - $biaya;
            //     $total += $nilai;
            // }

            DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_INSERT_BKM_TPELUNASAN @idBKM = ?, @tglinput = ?, @userinput = ?, @terjemahan = ?, @nilaipelunasan = ?, @IdBank = ?, @kode = ?', [
                trim($request->id_bkm),
                $request->tanggal_input,
                trim(Auth::user()->NomorUser),
                $konversi,
                $total,
                $request->id_bank,
                1,
            ]);

            // Loop through ListLunas equivalent
            foreach ($listdetail as $lunasItem) {
                $biaya = 0;
                $ada = false;

                preg_match('/value="(\d+)"/', $lunasItem[0], $matches);
                $itemValue = $matches[1] ?? null;

                // Check for associated costs in ListBiaya
                foreach ($listbiaya as $biayaItem) {
                    if ($itemValue == $biayaItem[3]) {
                        $biaya += floatval(str_replace(",", "", $biayaItem[1]));
                        $ada = true;
                    }
                }

                $nilai = floatval(str_replace(",", "", $lunasItem[2]));

                if ($radio == 1 || $radio == 2) {
                    $saldo = 0;
                } elseif ($radio == 3) {
                    $saldo = floatval(str_replace(',', '', $request->input('total_pelunasan')));
                }

                DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_INSERT_BKM_TPELUNASAN_TAG_NOTAGIH @idBKM = ?, @tgl = ?, @idUang = ?, @idJenis =  ?, @idBank = ?, @kodeperkiraan = ?, @uraian = ?, @idCust = ?, @bukti = ?, @user = ?, @nilaipelunasan = ?, @saldo = ?, @kurs = ?', [
                    trim($request->id_bkm),
                    $request->tanggal_input,
                    ($request->kurs_rupiah == "0") ? intval($request->kode_matauang) : 1,
                    intval($lunasItem[5]),
                    $request->id_bank,
                    trim($lunasItem[3]),
                    trim($lunasItem[4]),
                    trim($lunasItem[1]),
                    trim($lunasItem[6]),
                    trim(Auth::user()->NomorUser),
                    $nilai,
                    $saldo,
                    ($request->kurs_rupiah != "0") ? floatval($request->kurs_rupiah) : null
                ]);

                if ($ada1) {
                    $idPelunasan = DB::connection('ConnKCNAccounting')->select('EXEC SP_1273_PRG_GET_IDPELUNASAN');
                    $IDPelunasan = $idPelunasan[0]->id_pelunasan;

                    if ($ada) {
                        foreach ($listbiaya as $biayaItem) {
                            preg_match('/value="([^"]+)"/', $biayaItem[0], $matches);
                            $itemBiaya = $matches[1] ?? null;
                            if ($itemValue == $biayaItem[3]) {
                                DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_INSERT_DETAIL_BIAYA @idpelunasan = ?, @keterangan = ?, @biaya = ?, @kodeperkiraan = ?', [
                                    $IDPelunasan,
                                    $itemBiaya,
                                    floatval(str_replace(",", "", $biayaItem[1])),
                                    $biayaItem[2]
                                ]);
                            }
                        }
                    } else {
                        DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_INSERT_DETAIL_BIAYA @idpelunasan = ?, @keterangan = ?, @biaya = ?, @kodeperkiraan = ?', [
                            $IDPelunasan,
                            '',
                            $biaya,
                            null
                        ]);
                    }
                }
            }

            DB::connection('ConnKCNAccounting')->statement('EXEC SP_1273_PRG_UPDATE_COUNTER_IDBKM ?, ?, ?, ?', [
                $idbkm,
                $request->id_bank,
                trim($request->jenis_bank),
                $bulantahun,
            ]);

            return response()->json(['message' => (string) 'Data BKM No. ' . $request->id_bkm . ' TerSimpan']);
        } else {
            return response()->json(['message' => 'Tidak Ada Data Yg DiPROSES!']);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getKira') {
            // Execute the stored procedure
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKK1_KODEPERKIRAAN');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NoKodePerkiraan' => trim($row->NoKodePerkiraan),
                    'Keterangan' => trim($row->Keterangan),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getMataUang') {
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_MATA_UANG @kode = ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Id_MataUang' => $row->Id_MataUang,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBank') {
            // Execute the stored procedure for 'SP_1273_PRG_LIST_BANK'
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BANK');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Bank' => $row->Id_Bank,
                    'Nama_Bank' => $row->Nama_Bank,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBankDetail') {
            // Execute the stored procedure for 'SP_1273_PRG_LIST_BANK_1'
            $bankId = $request->input('id_bank');
            $result = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BANK_1 @idBank = ?', [trim($bankId)]);
            // dd($result);
            if (!empty($result)) {
                $response = [
                    'JenisBank' => trim($result[0]->jenis),
                ];
                return response()->json($response);
            }
        } else if ($id == 'getJenisBayar') {
            // Execute the stored procedure
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_JENIS_DOK');

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Jenis_Bayar' => trim($row->Id_Jenis_Bayar),
                    'Jenis_Pembayaran' => trim($row->Jenis_Pembayaran),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getCust') {
            // Execute the stored procedure for customer list
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_CUSTOMER');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NamaCust' => trim($row->NamaCust),
                    'IdCust' => trim($row->IdCust),
                    // Additional fields based on your VB.NET logic
                    'TIdCust' => substr(trim($row->IdCust), -5),
                    // 'TJnsCust' => substr(trim($row->IdCust), 0, 3),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'processData') {
            $input = $request->all();
            // dd($input);
            $ModeKoreksi = false;
            $periode = date('Y');
            // dd($periode);
            $id_output = '';
            if (
                !empty($input['kode_customer']) && !empty($input['jumlah_uang']) && !empty($input['nama_bank']) &&
                !empty($input['keterangan_kira']) && !empty($input['mata_uang']) && !empty($input['jenis_pembayaran'])
            ) {

                $response = [];
                if (empty($input['id_bkm'])) {
                    $results = DB::connection('ConnKCNAccounting')
                        ->statement('exec SP_5409_ACC_COUNTER_BKM_BKK @bank = ?, @jenis = ?, @tgl = ?, @id = ?', [
                            trim($input['id_bank']),
                            'R',
                            $input['tanggal_input'],
                            &
                            $id_output,
                        ]);

                    if (!empty($results)) {
                        $tahun = date('Y', strtotime($input['tanggal_input'])); // Get the year from the date
                        $bank = trim($input['id_bank']); // Trim and set the bank
                        $noUrut = DB::connection('ConnKCNAccounting')
                            ->table('T_Counter_BKM')
                            ->where('Periode', $tahun)
                            ->value('Id_BKM_E_Rp');

                        // Create the '00000' + convert(varchar(5),@noUrut,0)
                        $idBKM = str_pad($noUrut, 5, '0', STR_PAD_LEFT); // Pad the number to 5 digits with leading zeros

                        // Concatenate the bank code, 'R', and the formatted year and number
                        $idBKM = $bank . '-R' . substr($tahun, -2) . substr($idBKM, -5);

                        // Prepare the response with the constructed @idBKM
                        $response['idBKM'] = $idBKM;
                    }
                }

                return response()->json($response);
            } else {
                return response()->json(['error' => 'Incomplete data!']);
            }
        } else if ($id == 'getListBKM') {
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKM_NOTAGIH');
            // dd($results);
            $response = [];
            $j = 0;

            foreach ($results as $row) {
                $j++;
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan ?? "",
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getOkBKM') {
            // Extract the parameters from the request
            $tgl1 = $request->input('tgl_awalbkk');
            $tgl2 = $request->input('tgl_akhirbkk');
            // dd($tgl1, $tgl2);
            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_LIST_BKM_NOTAGIH_PERTGL ?, ?', [$tgl1, $tgl2]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan ?? "",
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'cetakBKM') {
            $cetak = true;
            $brs = 0;
            $idArray = [];
            // $tes = trim($request->input('bkm'));
            // dd($tes);


            $results = DB::connection('ConnKCNAccounting')
                ->select('exec SP_1273_PRG_GET_FIELD_IDPELUNASAN @idBKM = ?', [trim($request->input('bkm'))]);

            foreach ($results as $row) {
                $brs++;
                $idArray[$brs] = $row->Id_Pelunasan;
            }

            // $idP = $idArray[1];
            // dd($idP);

            $ada = false;

            if ($brs != 0) {
                foreach ($idArray as $idPelunasan) {
                    $resultCount = DB::connection('ConnKCNAccounting')
                        ->select('exec SP_1273_PRG_COUNT_IDPELUNASAN @idpelunasan = ?', [$idPelunasan]);

                    if (!empty($resultCount) && $resultCount[0]->ada > 0) {
                        $ada = true;
                        break;
                    }
                }
            }

            $sno = $ada
                ? DB::connection('ConnKCNAccounting')
                    ->select("SELECT * FROM VW_PRG_5298_ACC_CETAK_BKM_NOTAGIH WHERE Id_BKM = ?", [trim($request->input('bkm'))])
                : DB::connection('ConnKCNAccounting')
                    ->select("SELECT * FROM VW_PRG_5298_ACC_CETAK_BKM_NOTAGIH_1 WHERE Id_BKM = ?", [trim($request->input('bkm'))]);

            // dd($sno);

            // $reportType = $ada ? 5 : 4;

            // Tampilkan laporan sesuai kriteria yang ditentukan
            // Disesuaikan dengan mekanisme pencetakan laporan di Laravel
            // Misalnya menggunakan library reporting atau mencetak langsung

            DB::connection('ConnKCNAccounting')
                ->statement('exec SP_1273_PRG_UPDATE_TGLCETAK_BKM @idBKM = ?', [trim($request->input('bkm'))]);
            // dd($sno);
            return response()->json([
                'data' => $sno,
                'message' => 'Laporan telah dicetak dengan sukses'
            ]);
            // return response()->json(['message' => 'Laporan telah dicetak dengan sukses']);
            // return response()->json(['message' => 'Laporan telah dicetak dengan sukses', 'reportType' => $reportType, 'kriteria' => $sno]);
        } else {
            return response()->json(['message' => 'ID tidak valid!']);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
