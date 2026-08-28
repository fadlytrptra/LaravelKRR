<?php
use function foo\func;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QC\QCController;
use App\Http\Controllers\COA\COA\ACCController;
use App\Http\Controllers\COA\COA\PrintController;
use App\Http\Controllers\COA\COA\ResultController;
use App\Http\Controllers\COA\FIBC\FIBCPrintController;
use App\Http\Controllers\COA\FIBC\ACC\ACCQCManController;
use App\Http\Controllers\COA\FIBC\ACC\ACCQCSpvController;
use App\Http\Controllers\QC\Afalan\QCInputAfalanController;
use App\Http\Controllers\QC\Extruder\QCExtruderBController;

use App\Http\Controllers\QC\Extruder\QCExtruderDController;
use App\Http\Controllers\COA\FIBC\Input\InputTestController;
use App\Http\Controllers\COA\COA\Master\MasterPartController;
use App\Http\Controllers\COA\COA\Master\MasterTypeController;
use App\Http\Controllers\QC\Afalan\QCKoreksiAfalanController;
use App\Http\Controllers\COA\FIBC\Input\InputDetailController;
use App\Http\Controllers\COA\COA\Master\MasterMaterialController;
use App\Http\Controllers\QC\Circular\QCCircularTropodoController;
use App\Http\Controllers\QC\Extruder\QCExtruderTropodoController;
use App\Http\Controllers\QC\Circular\QCCircularMojosariController;

use App\Http\Controllers\Extruder\ExtruderController;
use function PHPUnit\Framework\assertDirectoryIsReadable;
use App\Http\Controllers\Circular\OrderCircularController;
use App\Http\Controllers\Circular\MasterCircularController;
use App\Http\Controllers\Circular\ProsesCircularController;
use App\Http\Controllers\Circular\InformasiCircularController;
use App\Http\Controllers\Extruder\ExtruderNet\OrderController;
use App\Http\Controllers\Extruder\ExtruderNet\BenangController;
use App\Http\Controllers\Extruder\ExtruderNet\MasterController;
use App\Http\Controllers\Extruder\BeratKomposisi\BeratController;
use App\Http\Controllers\Extruder\ExtruderNet\KonversiController;
use App\Http\Controllers\Extruder\ExtruderNet\PencatatanController;
use App\Http\Controllers\Accounting\Piutang\UpdateKursBKMController;
use App\Http\Controllers\Accounting\Piutang\BKMDPPelunasanController;
use App\Http\Controllers\Extruder\BeratKomposisi\KomposisiController;
use App\Http\Controllers\Extruder\WarehouseTerima\WarehouseController;
use App\Http\Controllers\Accounting\Piutang\BKMBKKNotaKreditController;
use App\Http\Controllers\Accounting\Piutang\BKMBKKPembulatanController;
use App\Http\Controllers\Accounting\Informasi\CetakNotaKreditController;
use App\Http\Controllers\Accounting\Informasi\CetakNotaDanFakturController;
use App\Http\Controllers\Accounting\Piutang\BatalBKMTransistorisController;
use App\Http\Controllers\Accounting\Piutang\MaintenanceBKMTransistorisBankController;

use App\Http\Controllers\Inventory\InventoryController;
use App\Http\Controllers\Inventory\Master\StokBarangController;
use App\Http\Controllers\Inventory\Informasi\KartuStokController;
use App\Http\Controllers\Inventory\Master\KodePerkiraanController;
use App\Http\Controllers\Inventory\Master\MaintenanceTypeController;
use App\Http\Controllers\Inventory\Master\MaintenanceObjekController;
use App\Http\Controllers\Inventory\Informasi\CariKodeBarangController;
use App\Http\Controllers\Inventory\Informasi\LacakTransaksiController;
use App\Http\Controllers\Inventory\Transaksi\Hibah\AccHibahController;
use App\Http\Controllers\Inventory\Informasi\TransaksiHarianController;
use App\Http\Controllers\Inventory\Informasi\TransaksiBulananController;
use App\Http\Controllers\Inventory\Transaksi\TerimaPurchasingController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\MhnPemberiController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\MhnPenerimaController;
use App\Http\Controllers\Inventory\Informasi\ListDetailTransaksiController;
use App\Http\Controllers\Inventory\Transaksi\Hibah\PenerimaHibahController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\AccSatuDivisiController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\PemberiBarangController;
use App\Http\Controllers\Inventory\Transaksi\PemakaianGelondonganController;
use App\Http\Controllers\Inventory\Transaksi\Hibah\PermohonanHibahController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\AccMhnPenerimaController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\MhnMasukKeluarController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\ReturPenjualanController;
use App\Http\Controllers\Inventory\Transaksi\Konversi\KonversiBarangController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\AccPemberiBarangController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\PemberiBarangAssController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\AccMhnMasukKeluarController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\PermohonanPenerimaController;
use App\Http\Controllers\Inventory\Transaksi\Konversi\AccKonversiBarangController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\PermohonanSatuDivisiController;
use App\Http\Controllers\Inventory\Transaksi\Penyesuaian\PenyesuaianBarangController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\PermohonanPenerimaBenangController;
use App\Http\Controllers\Inventory\Transaksi\Penghangusan\PenghangusanBarangController;
use App\Http\Controllers\Inventory\Transaksi\Penyesuaian\AccPenyesuaianBarangController;
use App\Http\Controllers\Inventory\Transaksi\TerimaBenang\TerimaBenangGedungDController;
use App\Http\Controllers\Inventory\Transaksi\TerimaBenang\TerimaBenangTropodoController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\KeluarBarangUntukPenjualanController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\PengembalianPascaPenjualanController;
use App\Http\Controllers\Inventory\Transaksi\Penghangusan\AccPenghangusanBarangController;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\HomeComProController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\IntercomController;
use Illuminate\Support\Facades\Session;

use App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController;
use App\Http\Controllers\WORKSHOP\Workshop\Proyek\MaintenanceOrderProyekController;
use App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderKerja;
use App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderProyek;

use App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController;
use App\Http\Controllers\Beli\Transaksi\FinalApproveController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
$redirectIfAuthenticated = function () {
    if (Auth::guest())
        return view('auth.login');
    else
        return redirect('/home');
};

Route::get('/', $redirectIfAuthenticated);
Route::get('/logout', $redirectIfAuthenticated);
Route::get('/pengumuman/lampiran/{id}', [HomeController::class, 'lampiran'])
    ->name('pengumuman.lampiran');
//Auth::routes();
Route::get('/refresh-csrf', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
Route::get('/test', 'App\Http\Controllers\testController@index'); //untuk registrasi user password

Route::get('/login', 'App\Http\Controllers\LoginController@index')->name('login');
Route::post('Register', 'App\Http\Controllers\LoginController@Register')->name('register');
Route::post('login', 'App\Http\Controllers\LoginController@login');
Route::post('/logout', 'App\Http\Controllers\LoginController@logout')->name('logout');
Route::get('/sessionexpired', 'App\Http\Controllers\LoginController@sessionexpired')->name('sessionexpired');
Route::get('/check-pdf-server', function () {
    try {
        $ctx = stream_context_create(['http' => ['timeout' => 2]]);
        file_get_contents("http://192.168.99.94:8081", false, $ctx);
        return response()->json(['alive' => true]);
    } catch (\Exception $e) {
        return response()->json(['alive' => false]);
    }
});
Route::post('/PurchaseOrder/SendEmailSupplier', [App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController::class, 'sendEmailSupplier']);
Route::get('/purchase-order/download-pdf/{no_po}', [App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController::class, 'downloadPdf'])->name('purchase.download.pdf');
Route::get('/cetak-sj/download-pdf/{no_sj}', [App\Http\Controllers\Sales\Cetak\CetakSJController::class, 'downloadPdf'])->name('cetaksj.download.pdf');

Route::fallback(function () {
    if (!auth()->check()) {
        return redirect()->route('login');
    }

    abort(404);
});
Route::group(['middleware' => ['auth']], function () {
    Route::get('/home', 'App\Http\Controllers\HomeController@index')->name('home');
    Route::post('/pengumuman/store', [HomeController::class, 'store'])->name('pengumuman.store');
    Route::get('/meeting', [MeetingController::class, 'index'])->name('meeting.index');
    Route::get('/meeting/rekap', [MeetingController::class, 'rekapMeeting']);
    Route::get('/meeting/{id}', [MeetingController::class, 'show'])->name('meeting.show');
    Route::post('/meeting/room', [MeetingController::class, 'storeRoom']);
    Route::post('/meeting/storeMeeting', [MeetingController::class, 'storeMeeting']);
    Route::post('/meeting/update', [MeetingController::class, 'updateMeeting']);
    Route::post('/meeting/cancel', [MeetingController::class, 'cancelMeeting']);
    Route::post('/meeting/admin/store', [MeetingController::class, 'storeAdministrator']);
    Route::get('/meeting/monthly/{room}', [MeetingController::class, 'monthlyMeetings']);
    Route::resource('intercom', IntercomController::class);
    Route::get('/heartbeat', function () {
        return response()->json(['status' => 'ok']);
    });
    Route::get('/bon-kas/list-acc', [App\Http\Controllers\BonKasController::class, 'listAccBonKas'])->name('bon-kas.list-acc');
    Route::resource('bon-kas', App\Http\Controllers\BonKasController::class);
    Route::get('/bon-kas-putih', [App\Http\Controllers\BonKasController::class, 'bonKasPutih'])->name('bonKasPutih');
    Route::get('/bon-kas-merah', [App\Http\Controllers\BonKasController::class, 'bonKasMerah'])->name('bonKasMerah');
    Route::get('/list-bon-kas-putih', [App\Http\Controllers\BonKasController::class, 'listPutih'])->name('listBonKasPutih');
    Route::get('/list-bon-kas-merah', [App\Http\Controllers\BonKasController::class, 'listMerah'])->name('listBonKasMerah');


    #region Beli
    Route::get('Beli', 'App\Http\Controllers\HomeController@Beli');

    Route::resource('ListOrder', App\Http\Controllers\Beli\Transaksi\ListOrderController::class);
    Route::resource('DaftarHarga', App\Http\Controllers\Beli\Informasi\DaftarHargaController::class);
    Route::resource('Approve', App\Http\Controllers\Beli\Transaksi\ApproveController::class);
    Route::resource('FinalApprove', App\Http\Controllers\Beli\Transaksi\FinalApproveController::class);
    Route::resource('MaintenanceOrderPembelian', App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController::class);
    Route::resource('CariType', App\Http\Controllers\Beli\Informasi\CariTypeController::class);
    Route::resource('Supplier', App\Http\Controllers\Beli\Master\SupplierController::class);
    Route::resource('HistoryPembelianMaster', App\Http\Controllers\Beli\Master\HistoryPembelianMasterController::class);
    Route::resource('MaintenanceKodeBarang', App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController::class);
    Route::resource('BatalTransfer', App\Http\Controllers\Beli\Master\BatalTransferController::class);
    Route::resource('PurchaseOrder', App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController::class);
    Route::resource('IsiSupplierHarga', App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController::class);
    Route::resource('ReturBTTB', App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController::class);
    Route::resource('IsiBeaImpor', App\Http\Controllers\Beli\TransaksiBeli\IsiBeaController::class);
    Route::resource('CreateBTTB', App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController::class);
    Route::resource('KoreksiStatusBeli', App\Http\Controllers\Beli\TransaksiBeli\KoreksiStatusBeliController::class);
    Route::resource('ListOrderSudahAppManager', App\Http\Controllers\Beli\TransaksiBeli\ListOrderAppManagerController::class);
    Route::resource('TransferBarang', App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController::class);
    Route::resource('ListSemuaOrder', App\Http\Controllers\Beli\Informasi\ListSemuaOrderController::class);
    Route::resource('FotoBarang', App\Http\Controllers\Beli\TransaksiBeli\FotoBarangController::class);
    Route::resource('ReminderFinalApprove', App\Http\Controllers\Beli\TransaksiBeli\ReminderFinalApproveController::class);
    Route::resource('ReminderApprove', App\Http\Controllers\Beli\Transaksi\ReminderApproveController::class);
    Route::get('/IsiSupplierHarga/{id}/Redisplay', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@redisplay')->name('isisupplierharga.redisplay');
    Route::post('/Supplier/{id}', 'App\Http\Controllers\Beli\Master\SupplierController@destroy')->name('supplier.destroy');
    Route::post('getallsupplier', 'App\Http\Controllers\Beli\Master\SupplierController@getallsupplier');
    Route::get('/options/supplierselect/{id}', 'App\Http\Controllers\Beli\Master\SupplierController@getSupplier');
    Route::get('/Maintenance/KodeBarang', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@kodeBarang')->name('maintenancekodebarang.kodebarang');
    Route::get('/Maintenance/Data', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@data')->name('maintenancekodebarang.data');
    Route::get('/Maintenance/Kategori', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@kategori')->name('maintenancekodebarang.kategori');
    Route::get('/Maintenance/SubKategori', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@subKategori')->name('maintenancekodebarang.subkategori');
    Route::get('/Maintenance/NamaBarang', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@namaBarang')->name('maintenancekodebarang.namabarang');
    Route::get('/Maintenance/CekNamaBarang', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@cekNamaBarang')->name('maintenancekodebarang.ceknamabarang');
    Route::post('/Maintenance/TambahKategori', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@tambahKategori')->name('maintenancekodebarang.tambahkateegori');
    Route::post('/Maintenance/Isi', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@isi')->name('maintenancekodebarang.isi');
    Route::post('/Maintenance/Koreksi', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@koreksi')->name('maintenancekodebarang.koreksi');
    Route::post('/Maintenance/ProsesHapus', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@prosesHapus')->name('maintenancekodebarang.hapus');
    Route::post('/Maintenance/TambahSubKategori', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@tambahSubKategori')->name('maintenancekodebarang.tambahsubkategori');
    Route::post('/BatalTransfer/Proses', 'App\Http\Controllers\Beli\Master\BatalTransferController@batal')->name('bataltransfer.proses');
    Route::get('/GETPurchaseOrder', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@redisplay');
    Route::get('/GETOrder', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@display');
    Route::get('/GETPost', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@show1');
    Route::get('/GETabel', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@showtbl');
    Route::post('/PurchaseOrder/GetEmailSupplier', [App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController::class, 'getEmailSupplier']);
    Route::get('/OpenReviewPO', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@reviewPO');
    Route::put('/OpenReviewPO/Print', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@printReviewPO');
    Route::get('getManager/{kdDiv}', 'App\Http\Controllers\Beli\Transaksi\ReminderApproveController@getManager');


    Route::post('/purchase-order/upload-ttd', [App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController::class, 'uploadTtdPath'])->name('purchaseOrder.uploadTtdPath');
    Route::get('/purchase-order/ttd-base64/{nomorUser}', [App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController::class, 'showTtd']);
    // Route::get('/purchase-order/ttd-image/{nomorUser}', [App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController::class, 'showTtd2'])->name('po.ttd');

    Route::get('/test-ttd-jpg/{nomorUser}', [App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController::class, 'showTtdJpg']);
    Route::get('/purchase-order/print/{no_po}', [App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController::class, 'printPO'])->name('po.print');

    Route::get('/OpenReviewBTTB', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@reviewBTTB');
    Route::put('/OpenReviewBTTB/Print', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@printReviewBTTB');
    Route::post('/PurchaseOrder/Cancel/Close', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@cancel');
    Route::post('/PurchaseOrder/Cancel/Close1', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@cancel1');
    Route::get('/get/dataPermohonanDivisi/{stBeli}/{Kd_Div}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanDivisi');
    Route::get('/get/dataPermohonanUser/{requester}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanUser');
    Route::get('/get/dataPermohonanOrder/{noTrans}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanOrder');
    Route::get('/get/dataPermohonanDivisiNyantol/{stBeli}/{Kd_Div}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanDivisiNyantol');
    Route::get('/get/dataPermohonanUserNyantol/{requester}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanUserNyantol');
    Route::get('/get/dataPermohonanOrderNyantol/{noTrans}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanOrderNyantol');
    Route::put('/PurchaseOrderr/create/CloseOrder', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@closeOrder');
    Route::put('/PurchaseOrderr/create/BackCreatePO', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@backCreatePO');
    Route::get('/openFormCreateSPPB/create', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@openFormCreateSPPB');
    Route::get('/openFormCreateSPPB/create/DaftarSupplier', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@daftarSupplier');
    Route::get('/openFormCreateSPPB/create/Print', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@print');
    Route::post('/openFormCreateSPPB/create/Submit', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@submit');
    Route::put('/openFormCreateSPPB/create/Update', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@update');
    Route::put('/openFormCreateSPPB/create/Remove', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@remove');
    Route::put('/openFormCreateSPPB/create/Reject', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@reject');
    Route::put('/openFormCreateSPPB/create/Post', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@post');
    Route::put('/IsiSupplierHarga/{id}/Approve', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@approve')->name('isisupplierharga.approve');
    Route::get('/IsiSupplierHarga/{id}/DaftarData', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@daftarData')->name('isisupplierharga.daftardata');
    Route::get('/IsiSupplierHarga/{id}/DaftarSupplier', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@daftarSupplier')->name('isisupplierharga.daftarsupplier');
    Route::put('/IsiSupplierHarga/{id}/Reject', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@reject')->name('isisupplierharga.reject');
    Route::get('/RReturBTTB/Display', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@po');
    Route::get('/RReturBTTB/GETRetur', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@kdbrg');
    Route::get('/RReturBTTB/checkInvPenyesuaian', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@checkInvPenyesuaian');
    Route::post('/RReturBTTB/InvInsertTmp', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@invInsertTmp');
    Route::post('/RReturBTTB/AccHangus', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@accHangus');
    Route::put('/RReturBTTB/Batal', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@batal');
    Route::put('/RReturBTTB/Retur', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@retur');
    Route::get('/Create', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@createbttb');
    Route::get('/Drop1', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@drop1');
    Route::get('/GetTabel', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@drop1');
    Route::get('/CCreateBTTB/CreateNoBTTB', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@createNoBTTB');
    Route::get('/CCreateBTTB/SetStatusPO', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@setStatusPO');
    Route::get('/CCreateBTTB/Print', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@print');
    Route::post('/CCreateBTTB/PostData', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@post');
    Route::get('/TransferBrg/Divisi', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@divisi')->name('transferbarang.divisi');
    Route::get('/TransferBrg/Redisplay', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@redisplay')->name('transferbarang.redisplay');
    Route::get('/TransferBrg/Tampil/{id}', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@tampil');
    Route::get('/TransferBarang/TransferBTTB', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@show');
    Route::get('/TransferBarang/TransferBTTB/LoadData', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@loadData')->name('transferbttb.loaddata');
    Route::get('/TransferBarang/TransferBTTB/LoadSatuan', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@loadSatuan')->name('transferbttb.loadsatuan');
    Route::get('/TransferBarang/TransferBTTB/DataDivisi', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@divisiBTTB')->name('transferbttb.datadivisi');
    Route::get('/TransferBarang/TransferBTTB/DataObjek', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@objek')->name('transferbttb.dataobjek');
    Route::get('/TransferBarang/TransferBTTB/LoadKelomDLL', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@loadKelomDLL')->name('transferbttb.loadkelomdll');
    Route::put('/TransferBarang/TransferBTTB/Koreksi', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@koreksi')->name('transferbttb.koreksi');
    Route::post('/TransferBarang/TransferBTTB/Transfer', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@transfer')->name('transferbttb.transfer');
    Route::get('/StatusBeli/Redisplay', 'App\Http\Controllers\Beli\TransaksiBeli\KoreksiStatusBeliController@redisplay')->name('koreksistatusbeli.redisplay');
    Route::post('/StatusBeli/Update', 'App\Http\Controllers\Beli\TransaksiBeli\KoreksiStatusBeliController@update')->name('koreksistatusbeli.update');
    Route::get('/ListOrderAppManager/Redisplay', 'App\Http\Controllers\Beli\TransaksiBeli\ListOrderAppManagerController@redisplay')->name('listordersudahappmanager.redisplay');
    Route::get('/ListOrderAppManager/RedisplayNoOrder', 'App\Http\Controllers\Beli\TransaksiBeli\ListOrderAppManagerController@redisplayNoOrder')->name('listordersudahappmanager.redisplayNoOrder');
    Route::get('/ListOrderAppManager/Divisi', 'App\Http\Controllers\Beli\TransaksiBeli\ListOrderAppManagerController@divisi')->name('listordersudahappmanager.divisi');
    Route::get('/ListOrder/{id}/show', 'App\Http\Controllers\Beli\Transaksi\ListOrderController@show')->name('listorder.show');
    Route::get('/ListOrder/{divisi}/{tglAwal}/{tglAkhir}/{Me}/Filter', 'App\Http\Controllers\Beli\Transaksi\ListOrderController@Filter')->name('listorder.filter');
    Route::get('/Approve/{id}/show', 'App\Http\Controllers\Beli\Transaksi\ApproveController@show')->name('approve.show');
    Route::post('/Approve/{id}/up', 'App\Http\Controllers\Beli\Transaksi\ApproveController@update')->name('approve.update');
    Route::get('/FinalApprove/getDokumentasi/{noTrans}', [FinalApproveController::class, 'getDokumentasi']);
    Route::get('/FinalApprove/foto-barang/{kdBarang}', [App\Http\Controllers\Beli\Transaksi\FinalApproveController::class, 'getFotoBarang'])->name('FinalApprove.fotoBarang');
    Route::get('/FinalApprove/downloadDokumentasi/{noTrans}', [FinalApproveController::class, 'downloadDokumentasi']);
    Route::get('/FinalApprove/{id}/show', 'App\Http\Controllers\Beli\Transaksi\FinalApproveController@show')->name('finalapprove.show');
    Route::post('/FinalApprove/{id}/up', 'App\Http\Controllers\Beli\Transaksi\FinalApproveController@update')->name('finalapprove.update');
    Route::get('/FinalApprove/downloadDokumentasi/{noTrans}', [FinalApproveController::class, 'downloadDokumentasi']);
    Route::get('/MaintenanceOrderPembeliann/CekNoTrans', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@cekNoTrans')->name('maintenanceorderpembelian.ceknotrans');
    Route::get('/MaintenanceOrderPembeliann/CekDivisiPembelian','App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@cekDivisiPembelian')->name('maintenanceorderpembelian.cekdivisipembelian');
    
    Route::get('/MaintenanceOrderPembeliann/KodeBarang', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@kodeBarang')->name('maintenanceorderpembelian.kodebarang');
    Route::get('/MaintenanceOrderPembeliann/Data', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@data')->name('maintenanceorderpembelian.data');
    Route::get('/MaintenanceOrderPembeliann/Kategori', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@kategori')->name('maintenanceorderpembelian.kategori');
    Route::get('/MaintenanceOrderPembeliann/SubKategori', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@subKategori')->name('maintenanceorderpembelian.subkategori');
    Route::get('/MaintenanceOrderPembeliann/KodeBarang', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@kodeBarang')->name('maintenanceorderpembelian.kodebarang');
    Route::get('/MaintenanceOrderPembeliann/Kategori', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@kategori')->name('maintenanceorderpembelian.kategori');
    Route::get('/MaintenanceOrderPembeliann/SubKategori', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@subKategori')->name('maintenanceorderpembelian.subkategori');
    Route::get('/MaintenanceOrderPembeliann/NamaBarang', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@namaBarang')->name('maintenanceorderpembelian.namabarang');
    Route::get('/MaintenanceOrderPembeliann/Golongan', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@golongan')->name('maintenanceorderpembelian.golongan');
    Route::get('/MaintenanceOrderPembeliann/MesinGolongan', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@mesinGolongan')->name('maintenanceorderpembelian.mesingolongan');
    Route::get('/MaintenanceOrderPembeliann/Saldo', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@saldo')->name('maintenanceorderpembelian.saldo');
    Route::get('/MaintenanceOrderPembeliann/CekNoTrans', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@cekNotrans')->name('maintenanceorderpembelian.ceknotrans');
    Route::post('/MaintenanceOrderPembeliann/Save', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@save')->name('maintenanceorderpembelian.save');
    Route::put('/MaintenanceOrderPembeliann/Submit', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@submit')->name('maintenanceorderpembelian.submit');
    Route::delete('/MaintenanceOrderPembeliann/Delete', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@delete')->name('maintenanceorderpembelian.delete');
    Route::post('/MaintenanceOrderPembeliann/uploadDokumentasi', [MaintenanceOrderPembelianController::class, 'uploadDokumentasi'])->name('maintenanceorderpembelian.upload');
    Route::delete('/MaintenanceOrderPembeliann/deleteDokumentasi', [MaintenanceOrderPembelianController::class, 'deleteDokumentasi']);
    Route::get('/FinalApprove/printDokumentasi/{noTrans}', [FinalApproveController::class, 'printDokumentasi']);


    Route::get('/CariTypeSearch', 'App\Http\Controllers\Beli\Informasi\CariTypeController@searchData')->name('caritype.search');
    #endregion

    #region Sales
    Route::get('Sales', 'App\Http\Controllers\HomeController@Sales');

    Route::resource('DeliveryOrder', App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController::class);
    Route::resource('DeliveryOrderManager', App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderManagerController::class);
    Route::resource('InputPEB', App\Http\Controllers\Sales\Transaksi\DeliveryOrder\InputPEBController::class);
    Route::resource('SuratJalan', App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController::class);
    Route::resource('KirimSJ', App\Http\Controllers\Sales\Transaksi\SuratJalan\KirimSJController::class);
    Route::resource('KirimSJACCCustomer', App\Http\Controllers\Sales\Transaksi\SuratJalan\KirimSJACCCustomerController::class);
    Route::resource('BatalSJ', App\Http\Controllers\Sales\Transaksi\SuratJalan\BatalSuratJalanController::class);
    Route::resource('SuratJalanManager', App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanManagerController::class);
    Route::resource('PascaKirim', App\Http\Controllers\Sales\Transaksi\SuratJalan\PascaKirimController::class);
    Route::resource('CetakSP', App\Http\Controllers\Sales\Cetak\CetakSPController::class);
    Route::resource('CetakDO', App\Http\Controllers\Sales\Cetak\CetakDOController::class);
    Route::resource('CetakSJ', App\Http\Controllers\Sales\Cetak\CetakSJController::class);
    Route::resource('CetakSPEkspor', App\Http\Controllers\Sales\Cetak\CetakSPEksportController::class);
    Route::resource('CetakPI', App\Http\Controllers\Sales\Cetak\CetakPIController::class);
    Route::resource('CetakBonKas', App\Http\Controllers\Sales\Cetak\CetakBonKasController::class);
    Route::resource('Customer', App\Http\Controllers\Sales\Master\CustomerController::class);
    Route::resource('VerifyUserCustomer', App\Http\Controllers\Sales\Master\VerifyUserCustomerController::class);
    Route::resource('Billing', App\Http\Controllers\Sales\Master\BillingController::class);
    Route::resource('Expeditor', App\Http\Controllers\Sales\Master\ExpeditorController::class);
    Route::resource('CariBarcode', App\Http\Controllers\Sales\ToolPenjualan\CariBarcodeController::class);
    Route::resource('SuratPesananEkspor', App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController::class);
    Route::resource('SuratPesanan', App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController::class);
    Route::resource('SuratPesananManager', App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController::class);
    Route::resource('PenyesuaianSuratPesanan', App\Http\Controllers\Sales\Transaksi\SuratPesanan\PenyesuaianSuratPesananController::class);
    Route::resource('BarcodeKerta2', App\Http\Controllers\Sales\ToolPenjualan\BarcodeKerta2Controller::class);
    Route::resource('BatalJual', App\Http\Controllers\Sales\ToolPenjualan\BatalJualController::class);
    Route::resource('GantiRPM', App\Http\Controllers\Sales\ToolPenjualan\GantiRPMController::class);
    Route::resource('HapusCIR', App\Http\Controllers\Sales\ToolPenjualan\HapusCIRController::class);
    Route::resource('PenjualanBarcode', App\Http\Controllers\Sales\ToolPenjualan\PenjualanBarcodeController::class);
    Route::resource('PenjualanNyangkut', App\Http\Controllers\Sales\ToolPenjualan\PenjualanNyangkutController::class);
    Route::resource('SetengahJadiNyangkut', App\Http\Controllers\Sales\ToolPenjualan\SetengahJadiNyangkutController::class);
    Route::resource('ScanBarcode', App\Http\Controllers\Sales\Penjualan\ScanBarcodeController::class);
    Route::resource('BarcodeJual', App\Http\Controllers\Sales\Penjualan\BarcodeJualController::class);
    Route::resource('AccPenjualan', App\Http\Controllers\Sales\Penjualan\AccPenjualanController::class);
    Route::get('/Customer/{id}/show', 'App\Http\Controllers\Sales\Master\CustomerController@show')->name('customer.show');
    Route::post('/Customer/{id}/up', 'App\Http\Controllers\Sales\Master\CustomerController@update')->name('customer.update');
    Route::get('KirimSJACCCustomer/downloadAttachment/{idPengiriman}', [App\Http\Controllers\Sales\Transaksi\SuratJalan\KirimSJACCCustomerController::class, 'downloadAttachment']);
    // Route::get('Sales/Master/Customer/getDetail/{idcust}', 'ControllerCustomer@getDetail');
    // Route::get('Customer/{IDCust}', 'CustomerController@show');
    Route::post('/Customer/{id}', 'App\Http\Controllers\Sales\Master\CustomerController@destroy')->name('customer.destroy');
    Route::get('/Billing/{id}/show', 'App\Http\Controllers\Sales\Master\BillingController@show')->name('billing.show');
    Route::post('/Billing/{id}/up', 'App\Http\Controllers\Sales\Master\BillingController@update')->name('billing.update');
    // Route::get('Billing/{IDCust}', 'BillingController@show');
    Route::post('/Billing/{id}', 'App\Http\Controllers\Sales\Master\BillingController@destroy')->name('billing.destroy');
    Route::get('/Expeditor/{id}/show', 'App\Http\Controllers\Sales\Master\ExpeditorController@show')->name('expeditor.show');
    Route::post('/Expeditor/{id}/up', 'App\Http\Controllers\Sales\Master\ExpeditorController@update')->name('expeditor.update');
    // Route::get('Expeditor/{IDCust}', 'ExpeditorController@show');
    Route::post('/Expeditor/{id}', 'App\Http\Controllers\Sales\Master\ExpeditorController@destroy')->name('expeditor.destroy');
    // Route::resource('SuratPesananDirektur', SuratPesananDirekturController::class);
    //Route::get('SuratPesanan', [SuratPesananController::class, 'index'])->name('suratpesanan.index');
    Route::get('/SuratPesanan/{id}/show', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@show')->name('suratpesanan.show');
    Route::post('/SuratPesanan/{id}/up', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@update')->name('suratpesanan.update');
    Route::get('/editSP/{id}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@edit')->name('suratpesanan.edit');
    Route::get('/SuratPesanan/createRobby', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@createRobby');
    // Route::get('SuratPesanan/{IDCust}', 'SuratPesananController@show');
    Route::post('/SuratPesanan/{id}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@destroy')->name('suratpesanan.destroy');
    Route::post('/SuratPesananManager/{id}/up', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@update')->name('suratpesananmanager.update');
    Route::post('/SuratPesananManager/{id}/del', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@destroy')->name('suratpesananmanager.destroy');
    Route::post('/SuratPesananManager/upall', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@updateAll');
    Route::get('/SuratPesananManager/penyesuaian/suratpesanan', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@penyesuaian');
    Route::get('/penyesuaian/{suratPesanan}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@getPenyesuaianSP');
    Route::post('/penyesuaiansp/koreksi', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@koreksiPenyesuaianSP');
    Route::post('/penyesuaiansp/batalsp', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@batalspPenyesuaianSP');
    Route::post('/batalsplokal/{nosp}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@batalspPenyesuaianSP');
    Route::post('/SuratPesananManager/upPenyesuaian', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@updatePenyesuaian');
    Route::get('/options/kategori/{kategoriUtama}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getKategori');
    Route::get('/options/subKategori/{kategori}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getSubKategori');
    Route::get('/options/namaBarang/{subKategori}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getNamaBarang');
    Route::get('/options/namaBarangExport/{subKategori}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getNamaBarangExport');
    Route::get('/satuan/{kode_barang}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getSatuanBarang');
    Route::get('/satuan1/{kode_barang}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getSatuanBarang1');
    Route::get('/displaybarang/{kode_barang}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getDisplayBarang');
    Route::get('/saldoinventory/{kode_barang}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getSaldoInventory');
    Route::get('/beratstandard/{kode_barang}', 'App\http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getBeratStandard');
    Route::get('/deletedetail/{id_pesanan}', 'App\http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@deleteDetailPesanan');
    // Route::post('/tambahmantap', 'App\http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@store');
    // Route::post('/submit-form', [SuratPesananController::class, 'submitForm']);
    Route::post('splokal', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@splokal')->name('splokal');
    // Route::any('splokal', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@splokal')->name('splokal');
    Route::get('/options/spekspor/kelompok/{kelompokUtama}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@getKelompok');
    Route::get('/options/spekspor/subKelompok/{kelompok}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@getSubKelompok');
    Route::get('/options/spekspor/namaBarang/{subKelompok}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@getNamaBarang');
    Route::get('/options/spekspor/kodeBarang/{kodeBarang}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@getKodeBarang');
    Route::get('/options/spekspor/isiSatuan/{idtype}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@isiSatuanInv');
    Route::get('/cekNoSPEkspor/{noSp}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@cekNoSP');
    Route::get('/displaybarangekspor/{idtype}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@getDisplayBarangEkspor');
    Route::get('/deleteDetailBarangEksport/{idpesanan}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@deleteDetailBarangEksport');
    Route::post('spekspor', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@spekspor')->name('spekspor');
    Route::post('penyesuaianEkspor/{noSp}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@penyesuaian')->name('penyesuaianEkspor');
    Route::post('batalSPEkspor/{noSp}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@batalSP')->name('batalSPEkspor');
    Route::post('/DeliveryOrder/{id}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@destroy')->name('deliveryorder.destroy');
    Route::post('/DeliveryOrder/{id}/up', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@update')->name('deliveryorder.update');
    Route::post('/DeliveryOrderManager/up', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderManagerController@update')->name('deliveryordermanager.update');
    Route::get('/DeliveryOrderManager/BatalDo/index', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderManagerController@indexDestroy')->name('deliveryordermanager.destroy');
    Route::post('/DeliveryOrderManager/destroy', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderManagerController@destroy');
    Route::get('/options/nomorsp/{customer}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getSuratPesanan');
    Route::get('/options/id_pesanan/{nomor_sp}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getIdPesanan');
    Route::get('/options/barang/{id_pesanan}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getBarang');
    Route::get('/options/kelompokutama/{kodeBarang}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getKelompokUtama');
    Route::get('/options/kelompok/{kelompokUtama}/{kodeBarang}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getKelompok');
    Route::get('/options/subkelompok/{kelompokUtama}/{kodeBarang}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getSubKelompok');
    Route::get('/options/saldo/{subKelompok}/{kodeBarang}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getSaldo');
    Route::get('/options/nomorDO', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getNomorDeliveryOrder');
    Route::post('dopeb', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\InputPEBController@dopeb')->name('dopeb');
    Route::post('/SuratJalan/{id}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@destroy')->name('suratjalan.destroy');
    Route::post('/SuratJalan/{id}/up', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@update')->name('suratjalan.update');
    Route::post('/SuratJalanManager/up', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanManagerController@update')->name('suratjalanmanager.update');
    Route::get('/options/suratpesanan/{customer}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@getSuratPesanan');
    Route::get('/options/deliveryorder/{suratpesanan}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@getDeliveryOrder');
    Route::get('/options/customer/{id}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@getCustomer');
    Route::get('/options/pascakirimsp/{customer}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\PascaKirimController@getSuratPesanan');
    Route::get('/options/barangpesanan/{suratpesanan}/{suratjalan}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\PascaKirimController@getBarangPesanan');
    Route::get('/options/returkirim/{kodebarang}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\PascaKirimController@getReturKirim');
    Route::get('/options/nomorSJ', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@getNomorSuratJalan');
    Route::get('/options/editSJ/{id}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@getDetailSuratJalan');
    Route::get('/nosp/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@getSuratPesananSelect');
    Route::get('/nospeksport/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakSPEksportController@getSuratPesananSelect');
    Route::get('/nopieksport/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakPIController@getSuratPesananSelect');
    Route::get('/jenisspekspor/{no_spValue}', 'App\Http\Controllers\Sales\Cetak\CetakSPEksportController@getSuratPesananText');
    Route::get('/jenispiekspor/{no_spValue}', 'App\Http\Controllers\Sales\Cetak\CetakPIController@getSuratPesananText');
    Route::get('/text/suratpesanan/{nosp}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@getSuratPesananText');
    Route::get('/options/jenissp/{nosp}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@getJenisSp');
    Route::get('/viewprint/{nosp}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@getViewPrint');
    Route::get('/viewprinteksport/{no_spValue}', 'App\Http\Controllers\Sales\Cetak\CetakSPEksportController@getViewPrint');
    Route::get('/viewprintpi/{no_spValue}', 'App\Http\Controllers\Sales\Cetak\CetakPIController@getViewPrint');
    // Route::get('/print/suratpesanan/{nosp}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@printSuratPesanan');
    Route::get('/dosudahacc/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakDOController@getDeliveryOrderSudahACC');
    Route::get('/dobelumacc/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakDOController@getDeliveryOrderBelumACC');
    // Route::get('/print/deliveryorder/{nodo}', 'App\Http\Controllers\Sales\Cetak\CetakDOController@printDeliveryOrder');
    Route::get('/optionsCetakSuratJalan/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakSJController@getSuratJalan');
    // Route::get('/print/suratjalan/{nosj}', 'App\Http\Controllers\Sales\Cetak\CetakSJController@printSuratJalan');
    Route::get('/cetakSuratJalanPPN/{tanggal}/{nosj}/{jenissj}', 'App\Http\Controllers\Sales\Cetak\CetakSJController@getDataCetakSuratJalan');
    Route::get('/cariBarcodeIdTypeDispresiasi/{kodeBarang}', 'App\Http\Controllers\Sales\ToolPenjualan\CariBarcodeController@getIdTypeDispresiasi');
    Route::get('/cariBarcodeIdTypeTmpGudang/{kodeBarang}', 'App\Http\Controllers\Sales\ToolPenjualan\CariBarcodeController@getIdTypeTmpGudang');
    Route::POST('/cariBarcodeFilter/action', 'App\Http\Controllers\Sales\ToolPenjualan\CariBarcodeController@cariBarcodeFilter');
    Route::get('/batalJualInputBarcode/{kodeBarang}', 'App\Http\Controllers\Sales\ToolPenjualan\BatalJualController@getInputBarcode');
    Route::post('/BatalJual/up', 'App\Http\Controllers\Sales\ToolPenjualan\BatalJualController@update')->name('bataljual.update');
    Route::get('/scanBarcodeLihatData/{date}', 'App\Http\Controllers\Sales\Penjualan\ScanBarcodeController@scanBarcodeLihatData');
    Route::get('/scanBarcodeDetailData/{idType}/{kodeBarang}/{tglMutasi}', 'App\Http\Controllers\Sales\Penjualan\ScanBarcodeController@scanBarcodeDetailData');
    Route::delete('AccPenjualan/{kodebarang}/{noindeks}', 'App\Http\Controllers\Sales\Penjualan\AccPenjualanController@destroy');
    Route::get('/accPenjualanTampilData/{idtransaksi}', 'App\Http\Controllers\Sales\Penjualan\AccPenjualanController@accPenjualanTampilData');
    Route::get('/accPenjualanTampilBarcode/{IdType}/{KodeBarang}', 'App\Http\Controllers\Sales\Penjualan\AccPenjualanController@accPenjualanTampilBarcode');
    Route::resource('AccPenjualanCloth', App\Http\Controllers\Sales\Penjualan\AccPenjualanClothController::class);
    #endregion

    #region EDP
    Route::get('/EDP', 'App\Http\Controllers\HomeController@EDP');
    Route::resource('User', App\Http\Controllers\UserController::class);
    Route::resource('MaintenanceTTDUser', App\Http\Controllers\EDP\MaintenanceTTDUserController::class);
    Route::resource('MaintenanceUserMaster', App\Http\Controllers\EDP\MaintenanceLokasiController::class);
    Route::post('/User/{id}/up', 'App\Http\Controllers\UserController@update')->name('user.update');
    Route::get('/User/{id}/EditAdmin', 'App\Http\Controllers\UserController@EditAdmin')->name('user.EditAdmin');
    Route::get('/User/{id}/EditActive', 'App\Http\Controllers\UserController@EditActive')->name('user.EditActive');
    Route::resource('Cartridge', App\Http\Controllers\EDP\CartridgeController::class);
    Route::post('/Cartridge/{id}/up', 'App\Http\Controllers\EDP\CartridgeController@update')->name('cartridge.update');
    Route::resource('PerbaikanCartridge', App\Http\Controllers\EDP\PerbaikanCartridgeController::class);
    Route::get('/PerbaikanCartridge/{id}/show', 'App\Http\Controllers\EDP\PerbaikanCartridgeController@show')->name('perbaikancartridge.show');
    Route::post('/PerbaikanCartridge/{id}/AddCartridgeRefill', 'App\Http\Controllers\EDP\PerbaikanCartridgeController@AddRefill')->name('perbaikancartridge.addrefill');
    Route::get('/PerbaikanCartridge/{id}/{IdCartridge}/{IdPerbaikan}/DelRefill', 'App\Http\Controllers\EDP\PerbaikanCartridgeController@DelCartridgeRefill')->name('perbaikancartridge.DelCartridgeRefill');
    Route::post('/PerbaikanCartridge/{id}/up', 'App\Http\Controllers\EDP\PerbaikanCartridgeController@update')->name('perbaikancartridge.update');
    Route::post('/PerbaikanCartridge/AddService', 'App\Http\Controllers\EDP\PerbaikanCartridgeController@AddService')->name('perbaikancartridge.addservice');
    Route::get('/PerbaikanCartridge/{id}/DetailRefill', 'App\Http\Controllers\EDP\PerbaikanCartridgeController@DetailRefill')->name('perbaikancartridge.DetailRefill');
    Route::resource('Jurnal', App\Http\Controllers\EDP\JurnalController::class);
    Route::get('/Jurnal/{id}/show', 'App\Http\Controllers\EDP\JurnalController@show')->name('jurnal.show');
    Route::post('/Jurnal/{id}/up', 'App\Http\Controllers\EDP\JurnalController@update')->name('jurnal.update');
    Route::get('/Jurnal/{id}/del', 'App\Http\Controllers\EDP\JurnalController@destroy')->name('jurnal.destroy');
    Route::post('/Jurnal/{id}/InputKelompok', 'App\Http\Controllers\EDP\JurnalController@InputKelompok');
    Route::post('/Jurnal/AddKelompok', 'App\Http\Controllers\EDP\JurnalController@storeKelompok');
    Route::post('/Jurnal/Kelompok/{id}/up', 'App\Http\Controllers\EDP\JurnalController@updateKelompok')->name('kelompok.update');
    Route::post('/Jurnal/AddKategori', 'App\Http\Controllers\EDP\JurnalController@storeKategori');
    Route::post('/Jurnal/Kategori/{id}/up', 'App\Http\Controllers\EDP\JurnalController@updateKategori')->name('kategori.update');
    Route::get('/Jurnal/{tglAwal}/{tglAkhir}/Filter', 'App\Http\Controllers\EDP\JurnalController@Filter')->name('jurnal.filter');
    Route::resource('MaintenanceHakAkses', App\Http\Controllers\EDP\MaintenanceHakAksesController::class);
    Route::get('/AllFitur/{IdProgram}/{NomorPegawai}', 'App\Http\Controllers\EDP\MaintenanceHakAksesController@getAllFitur');
    Route::post('/AllFitur/edit', 'App\Http\Controllers\EDP\MaintenanceHakAksesController@EditUserFitur');
    Route::resource('PerbaikanUjiCobaFitur', App\Http\Controllers\EDP\PerbaikanUjiCobaFiturController::class);
    Route::resource('Computer', App\Http\Controllers\EDP\ComputerController::class);
    Route::post('/Computer/TambahSWAL', 'App\Http\Controllers\EDP\ComputerController@TambahSWAL')->name('computer.TambahSWAL');
    Route::post('/Computer/{id}', 'App\Http\Controllers\EDP\ComputerController@destroy')->name('computer.destroy');
    Route::resource('IsOnline', App\Http\Controllers\EDP\IsOnlineController::class);
    Route::post('/MaintenanceIsOnline/update', [App\Http\Controllers\EDP\IsOnlineController::class, 'updateIsOnline'])->name('maintenance.isonline.update');

    // Route::get('/Computer/FetchOperatingSystems', 'App\Http\Controllers\EDP\ComputerController@FetchOperatingSystems')->name('computer.FetchOperatingSystems');
    #endregion

    /* EXTRUDER */
    #region ExtruderNet
    Route::get('/Extruder/{pageName?}', [ExtruderController::class, 'index']);
    Route::get('/BeratStandarKomposisi/{formName?}', [BeratController::class, 'index']);
    Route::get('/Extruder/WarehouseTerima/{formName?}', [WarehouseController::class, 'index']);
    Route::get('/Extruder/{pageName?}/{formName?}', [ExtruderController::class, 'index']);
    Route::get('/Extruder/Extruder/Master/{formName?}/{namaGedung?}', [MasterController::class, 'index']);
    Route::get('/Extruder/Extruder/Order/{formName?}/{namaGedung?}', [OrderController::class, 'index']);
    Route::get('/Extruder/Extruder/Konversi/{formName?}/{namaGedung?}', [KonversiController::class, 'index']);
    Route::get('/Extruder/Extruder/Benang/{formName?}/{namaGedung?}', [BenangController::class, 'index']);
    Route::get('/Extruder/Extruder/Catat/{formName?}/{namaGedung?}', [PencatatanController::class, 'index']);
    Route::resource('LaporanProduksiExtruder', App\Http\Controllers\Extruder\ExtruderNet\LaporanProduksiExtruderController::class);
    Route::resource('ACCPengecekanMB', App\Http\Controllers\Extruder\ExtruderNet\ACCPengecekanMBController::class);
    Route::resource('ACCBenangNG', App\Http\Controllers\Extruder\ExtruderNet\ACCBenangNGController::class);
    Route::get('/print-laporan-produksi-extruder', [App\Http\Controllers\Extruder\ExtruderNet\LaporanProduksiExtruderController::class, 'print'])
    ->name('print.laporan.produksi.extruder');
    #endregion

    Route::get('/beratStandar/{fun_str}/{fun_data}', [BeratController::class, 'beratStandar']);
    Route::get('/komposisiKonversi/{fun_str}/{fun_data}', [KomposisiController::class, 'komposisiKonversi']);
    Route::get('/warehouseTerima/{fun_str}/{fun_data}', [WarehouseController::class, 'warehouseTerima']);

    #region ExtruderNet - Master (KITE)
    Route::get('/Master/getCekBahanKite/{kode}', [MasterController::class, 'getCekBahanKite']);
    Route::get('/Master/getKiteExtruder/{kode}/{tgl_start?}/{kode_barang?}/{jenis_fas?}/{bahan_pp?}/{benang?}/{meter?}/{roll?}/{meter_awal?}/{hasil?}/{id_order?}/{caco3?}', [MasterController::class, 'getKiteExtruder']);
    Route::get('/Master/getKiteExtOrder/{kode}/{id_order}', [MasterController::class, 'getKiteExtOrder']);

    Route::post('/Master/insKiteExtruder', [MasterController::class, 'insKiteExtruder']);
    Route::post('/Master/insKiteExtruder7', [MasterController::class, 'insKiteExtruder7']);
    #endregion

    #region ExtruderNet - Master (Tropodo)
    Route::get('/Master/getListKomposisiBahan/{id_komposisi}', [MasterController::class, 'getListKomposisiBahan']);
    Route::get('/Master/getDetailBahan/{id_type}', [MasterController::class, 'getDetailBahan']);
    Route::get('/Master/getListKomposisi/{id_divisi}/{id_komposisi?}', [MasterController::class, 'getListKomposisi']);
    Route::get('/Master/getListMesin/{kode}', [MasterController::class, 'getListMesin']);
    Route::get('/Master/getIdDivisiObjek/{id_divisi}', [MasterController::class, 'getIdDivisiObjek']);
    Route::get('/Master/getIdObjekKelompokUtama/{id_objek}/{type?}', [MasterController::class, 'getIdObjekKelompokUtama']);
    Route::get('/Master/getIdKelompokUtamaKelompok/{id_kelompok_utama}/{type?}', [MasterController::class, 'getIdKelompokUtamaKelompok']);
    Route::get('/Master/getCekKelompokMesin/{id_kel}', [MasterController::class, 'getCekKelompokMesin']);
    Route::get('/Master/getIdKelompokSubKelompok/{id_kelompok}', [MasterController::class, 'getIdKelompokSubKelompok']);
    Route::get('/Master/getIdSubKelompokType/{id_sub_kelompok}', [MasterController::class, 'getIdSubKelompokType']);
    Route::get('/Master/getCekKonversi/{id_komposisi}/{id_type}', [MasterController::class, 'getCekKonversi']);
    Route::get('/Master/getCekKomposisi/{id}', [MasterController::class, 'getCekKomposisi']);
    Route::get('/Master/getIdMesin/{id_kel}', [MasterController::class, 'getIdMesin']);

    Route::post('/Master/insKomposisiBahan', [MasterController::class, 'insKomposisiBahan']);
    Route::post('/Master/insMasterKomposisi', [MasterController::class, 'insMasterKomposisi']);
    Route::get('/Master/getMasterKomposisi/{id_divisi}', [MasterController::class, 'getMasterKomposisi']);

    Route::post('/Master/updIdKomposisiCounter', [MasterController::class, 'updIdKomposisiCounter']);

    Route::delete('/Master/delMasterKomposisi/{id_komposisi}', [MasterController::class, 'delMasterKomposisi']);
    Route::delete('/Master/delKomposisiBahan1/{id_komposisi}/{id_type}', [MasterController::class, 'delKomposisiBahan1']);
    Route::delete('/Master/delKomposisiBahan/{id_komposisi}', [MasterController::class, 'delKomposisiBahan']);
    #endregion

    #region ExtruderNet - Master (Mojosari)
    Route::get('/Master/getListKomposisiBahanMjs/{id_komposisi}', [MasterController::class, 'getListKomposisiBahanMjs']);
    Route::get('/Master/getCekJumlahKomposisi/{kode}/{id_komposisi}/{id_kelompok?}/{jns?}/{persentase?}', [MasterController::class, 'getCekJumlahKomposisi']);
    Route::get('/Master/getPrgBomBarang/{kode}/{kode_barang?}/{id_komposisi?}/{id_kelompok?}/{id_divisi?}/{mesin?}', [MasterController::class, 'getPrgBomBarang']);
    Route::get('/Master/getPrgTypeProduksi/{kode}/{id_kelut}', [MasterController::class, 'getPrgTypeProduksi']);

    Route::post('/Master/insKomposisiBahanMjs', [MasterController::class, 'insKomposisiBahanMjs']);

    Route::delete('/Master/delKomposisiBahanMjs/{id_komposisi}', [MasterController::class, 'delKomposisiBahanMjs']);
    #endregion

    #region ExtruderNet - Form Bagian Order
    Route::get('/Order/getListBenang/{kode}', [OrderController::class, 'getListBenang']);
    Route::post('/Order/insOrderBenang', [OrderController::class, 'insOrderBenang']);
    Route::get('/Order/getNoOrder/{kode?}', [OrderController::class, 'getNoOrder']);
    Route::get('/Order/getNoOrderMjs/', [OrderController::class, 'getNoOrderMjs']);
    Route::post('/Order/insOrderDetail', [OrderController::class, 'insOrderDetail']);
    Route::put('/Order/updCounterOrder', [OrderController::class, 'updCounterOrder']);

    Route::get('/Order/getOrderBlmAcc/{divisi}', [OrderController::class, 'getOrderBlmAcc']);
    Route::get('/Order/getListSpek/{id_order}', [OrderController::class, 'getListSpek']);
    Route::put('/Order/updAccOrder', [OrderController::class, 'updAccOrder']);

    Route::get('/Order/getListBatalOrd/{id_divisi}', [OrderController::class, 'getListBatalOrd']);
    Route::get('/Order/getListOrderBtl/{id_order}', [OrderController::class, 'getListOrderBtl']);
    Route::put('/Order/updStatusOrder', [OrderController::class, 'updStatusOrder']);
    #endregion

    #region ExtruderNet - Form Form Konversi Mohon
    Route::get('/Konversi/getListKomposisiBahan/{id_komposisi}', [KonversiController::class, 'getListKomposisiBahan']);
    Route::get('/Konversi/getSatuan/{id_type}', [KonversiController::class, 'getSatuan']);
    Route::get('/Konversi/getSaldoBarang/{id_type}', [KonversiController::class, 'getSaldoBarang']);
    Route::get('/Konversi/getDataKonversi/{id_konversi}', [KonversiController::class, 'getDataKonversi']);
    Route::get('/Konversi/getListDetailKonversi/{id_konversi}', [KonversiController::class, 'getListDetailKonversi']);
    Route::get('/Konversi/getListKonversi/{id_divisi}/{kode?}/{datetime?}', [KonversiController::class, 'getListKonversi']);
    Route::get('/Konversi/getIdKonversiInv/{id_konversi}', [KonversiController::class, 'getIdKonversiInv']);
    Route::get('/Konversi/getListMesin/{kode}', [KonversiController::class, 'getListMesin']);
    Route::get('/Konversi/getOrdAccBlmSelesai/{divisi}', [KonversiController::class, 'getOrdAccBlmSelesai']);
    Route::get('/Konversi/getListKomposisi/{kode}/{id_mesin}', [KonversiController::class, 'getListKomposisi']);
    Route::get('/Konversi/getListSpek/{id_order}', [KonversiController::class, 'getListSpek']);
    Route::get('/Konversi/getSaldoInv/{id_type}', [KonversiController::class, 'getSaldoInv']);

    Route::post('/Konversi/insTmpTransaksi', [KonversiController::class, 'insTmpTransaksi']);
    Route::post('/Konversi/insDetailKonversi', [KonversiController::class, 'insDetailKonversi']);
    Route::post('/Konversi/insMasterKonversi', [KonversiController::class, 'insMasterKonversi']);
    Route::get('/Konversi/getMasterKonversi/{divisi?}', [KonversiController::class, 'getMasterKonversi']);
    Route::put('/Konversi/updListCounter', [KonversiController::class, 'updListCounter']);
    Route::get('/Konversi/getListCounter', [KonversiController::class, 'getListCounter']);
    Route::put('/Konversi/updMasterKonversi', [KonversiController::class, 'updMasterKonversi']);

    Route::delete('/Konversi/delDetailKonversi', [KonversiController::class, 'delDetailKonversi']);
    Route::delete('/Konversi/delKonversi/{id_konversi}', [KonversiController::class, 'delKonversi']);
    #endregion

    #region ExtruderNet - Form Konversi ACC
    Route::get('/Konversi/getListKonvBlmAcc/{id_divisi}', [KonversiController::class, 'getListKonvBlmAcc']);
    Route::get('/Konversi/getListKonvDetail/{id_konversi}', [KonversiController::class, 'getListKonvDetail']);
    Route::get('/Konversi/getPenyesuaianTransaksi/{id_type}/{id_type_transaksi}', [KonversiController::class, 'getPenyesuaianTransaksi']);
    Route::get('/Konversi/getTransaksiKonversi/{id_konv_ext}', [KonversiController::class, 'getTransaksiKonversi']);
    Route::get('/Konversi/getJumlahHutang/{id_type}/{subkel}/{shift}/{tgl}', [KonversiController::class, 'getJumlahHutang']);
    Route::get('/Konversi/getIdTransInv/{id_type}/{subkel}/{tgl}/{shift}', [KonversiController::class, 'getIdTransInv']);
    Route::get('/Konversi/getOrderStatus/{id_order}', [KonversiController::class, 'getOrderStatus']);

    Route::put('/Konversi/updProsesACCKonversi', [KonversiController::class, 'updProsesACCKonversi']);
    Route::put('/Konversi/updProsesHutang', [KonversiController::class, 'updProsesHutang']);
    Route::put('/Konversi/updACCMasterKonv', [KonversiController::class, 'updACCMasterKonv']);

    Route::put('/Konversi/updSaldoOrderDetail', [KonversiController::class, 'updSaldoOrderDetail']);
    Route::get('/Konversi/getSaldoOrderDetail/{id_order}/{no_urut_order}', [KonversiController::class, 'getSaldoOrderDetail']);
    #endregion

    #region ExtruderNet - Form Benang Mohon
    Route::get('/Benang/getListDataNG/{id_konversi}/{tanggal}', [BenangController::class, 'getListDataNG']);
    Route::get('/Benang/getDetailUraianKonvNG/{id_konversi}', [BenangController::class, 'getDetailUraianKonvNG']);
    Route::get('/Benang/getKoreksiSortirNGBlmAcc/{tanggal}', [BenangController::class, 'getKoreksiSortirNGBlmAcc']);
    Route::get('/Benang/getListProdNG/{no_konv}', [BenangController::class, 'getListProdNG']);
    Route::get('/Benang/getCekDataNG/{kode}/{no_konv}/{id_type}', [BenangController::class, 'getCekDataNG']);
    Route::get('/Benang/getListIdKonv1/{id_divisi}/{tanggal}/{shift}/{id_konversi?}/{id_type?}', [BenangController::class, 'getListIdKonv1']);
    Route::get('/Benang/getListIdKonv2/{id_konversi}', [BenangController::class, 'getListIdKonv2']);
    Route::get('/Benang/getListIdKonv3/{id_konversi}/{id_type}', [BenangController::class, 'getListIdKonv3']);
    Route::get('/Benang/getListCounter', [BenangController::class, 'getListCounter']);

    Route::post('/Benang/insMasterKonvNG', [BenangController::class, 'insMasterKonvNG']);
    Route::get('/Benang/getMasterKonversiNG', [BenangController::class, 'getMasterKonversiNG']);
    Route::post('/Benang/insDetailKonvNG', [BenangController::class, 'insDetailKonvNG']);
    Route::post('/Benang/insAsalTmpTrans', [BenangController::class, 'insAsalTmpTrans']);
    Route::post('/Benang/insTujuanTmpTrans', [BenangController::class, 'insTujuanTmpTrans']);

    Route::put('/Benang/updDetailKonvNG', [BenangController::class, 'updDetailKonvNG']);
    Route::put('/Benang/updTmpTransaksi', [BenangController::class, 'updTmpTransaksi']);

    Route::delete('/Benang/delKonversiNG/{id_konversi}', [BenangController::class, 'delKonversiNG']);
    #endregion

    #region ExtruderNet - Form Benang ACC
    Route::get('/Benang/getListIdKonversiNG/{tanggal1}/{tanggal2}/{kode?}', [BenangController::class, 'getListIdKonversiNG']);
    Route::get('/Benang/getDetailDataBenangNG/{id_konversi_ng}', [BenangController::class, 'getDetailDataBenangNG']);
    Route::get('/Benang/getPenyesuaianTransaksi/{kode?}/{id_type?}/{id_type_transaksi?}/{id_transaksi?}/{kode_barang?}/{id_sub_kel?}', [BenangController::class, 'getPenyesuaianTransaksi']);
    Route::get('/Benang/getTransaksiKonversiNG/{id_konversi_ng}', [BenangController::class, 'getTransaksiKonversiNG']);

    Route::put('/Benang/updProsesACCKonversi', [BenangController::class, 'updProsesACCKonversi']);
    Route::put('/Benang/updACCKonversiNG', [BenangController::class, 'updACCKonversiNG']);
    #endregion

    #region ExtruderNet - Form Rincian Konversi
    Route::get('/Benang/getKelompokUtama_IdObjek/{id_objek_kelompok_utama}/{type?}', [BenangController::class, 'getKelompokUtama_IdObjek']);
    Route::get('/Benang/getKelompok_IdKelut/{id_kelompok_utama_kelompok}/{type?}', [BenangController::class, 'getKelompok_IdKelut']);
    Route::get('/Benang/getSubKelompok_IdKelompok/{id_kelompok_sub_kelompok}', [BenangController::class, 'getSubKelompok_IdKelompok']);
    Route::get('/Benang/getType_IdSubkel/{id_sub_kelompok_type}', [BenangController::class, 'getType_IdSubkel']);
    Route::get('/Benang/getSaldoBarang/{id_type}', [BenangController::class, 'getSaldoBarang']);
    #endregion

    #region ExtruderNet - Form Catat Gangguan
    Route::get('/Catat/getListIdKomposisi/{tanggal}/{id_mesin}', [PencatatanController::class, 'getListIdKomposisi']);
    Route::get('/Catat/getDisplayShift/{id_konversi}', [PencatatanController::class, 'getDisplayShift']);
    Route::get('/Catat/getListMesin/{kode}', [PencatatanController::class, 'getListMesin']);
    Route::get('/Catat/getListGangguan', [PencatatanController::class, 'getListGangguan']);
    Route::get('/Catat/getListGangguanProd/{bulan}/{tahun}', [PencatatanController::class, 'getListGangguanProd']);
    Route::get('/Catat/getListShift/{id_konversi}', [PencatatanController::class, 'getListShift']);
    Route::get('/Catat/getNoTrans', [PencatatanController::class, 'getNoTrans']);

    Route::post('/Catat/insGangguanProd', [PencatatanController::class, 'insGangguanProd']);
    Route::put('/Catat/updGangguanProd', [PencatatanController::class, 'updGangguanProd']);
    Route::delete('/Catat/delGangguanProd/{no_trans}', [PencatatanController::class, 'delGangguanProd']);
    #endregion

    #region ExtruderNet - Form Catat Daya
    Route::get('/Catat/getFaktorKali/{id_mesin}', [PencatatanController::class, 'getFaktorKali']);
    Route::get('/Catat/getKwahMesinPerbulan/{bulan}/{tahun}', [PencatatanController::class, 'getKwahMesinPerbulan']);
    Route::get('/Catat/getListDataKwahMesin/{bulan}/{tahun}', [PencatatanController::class, 'getListDataKwahMesin']);
    Route::get('/Catat/getKwahMesin/{tanggal}/{id_divisi}', [PencatatanController::class, 'getKwahMesin']);

    Route::post('/Catat/insKwahMesin', [PencatatanController::class, 'insKwahMesin']);
    Route::put('/Catat/updKwahMesin', [PencatatanController::class, 'updKwahMesin']);
    Route::delete('/Catat/delKwahMesin/{id_kwah}', [PencatatanController::class, 'delKwahMesin']);
    #endregion

    #region ExtruderNet - Form Catat Effisiensi
    Route::get('/Catat/getListAwalProdEff/{tanggal}/{no_mesin}/{shift}', [PencatatanController::class, 'getListAwalProdEff']);
    Route::get('/Catat/getListEffisiensi/{tanggal}/{no_mesin}/{shift}/{awal_produksi}', [PencatatanController::class, 'getListEffisiensi']);
    Route::get('/Catat/getListIdKonversi/{tanggal}/{no_mesin}/{shift}', [PencatatanController::class, 'getListIdKonversi']);
    Route::get('/Catat/getCekDataEff/{tgl}/{mesin}/{shift}/{awal}/{akhir}/{id_konversi}', [PencatatanController::class, 'getCekDataEff']);

    Route::post('/Catat/insEff', [PencatatanController::class, 'insEff']);
    Route::put('/Catat/updEff', [PencatatanController::class, 'updEff']);
    Route::delete('/Catat/delEff', [PencatatanController::class, 'delEff']);
    #endregion

    #region ExtruderNet - Form Catat Perawatan
    Route::get('/Catat/getListJnsPerawatan/{id_divisi}', [PencatatanController::class, 'getListJnsPerawatan']);
    Route::get('/Catat/getListWinder/{id_perawatan}/{id_mesin}', [PencatatanController::class, 'getListWinder']);
    Route::get('/Catat/getJenisGangguan/{id_perawatan}', [PencatatanController::class, 'getJenisGangguan']);
    Route::get('/Catat/getJenisPenyebab/{id_perawatan}', [PencatatanController::class, 'getJenisPenyebab']);
    Route::get('/Catat/getJenisPenyelesaian/{id_perawatan}', [PencatatanController::class, 'getJenisPenyelesaian']);
    Route::get('/Catat/getDataPerawatan/{tanggal}', [PencatatanController::class, 'getDataPerawatan']);

    Route::post('/Catat/insPerawatan', [PencatatanController::class, 'insPerawatan']);
    Route::put('/Catat/updPerawatan', [PencatatanController::class, 'updPerawatan']);
    Route::delete('/Catat/delPerawatan/{kode}', [PencatatanController::class, 'delPerawatan']);
    #endregion

    #region GPS
    Route::get('GPS', 'App\Http\Controllers\HomeController@GPS');

    Route::resource('estimasiJadwal', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EstimasiJadwalController::class);
    Route::get('CekEstimasiKonstruksi/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EstimasiJadwalController@CekEstimasiKonstruksi');
    Route::get('LoadDataEstimasiJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EstimasiJadwalController@LoadData');
    Route::get('GetTanggalEstimasiJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EstimasiJadwalController@GetTanggal');
    Route::get('CekjadwalEstimasiJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EstimasiJadwalController@Cekjadwal');
    Route::get('cektanggalEstimasiJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EstimasiJadwalController@cektanggal');

    Route::resource('MaintenanceGambar', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\MaintenanceBagianGambarController::class);
    Route::get('LoadDataMaintenanceGambar/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\MaintenanceBagianGambarController@LoadData');
    Route::get('cekdataestimasiMaintenanceGambar/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\MaintenanceBagianGambarController@cekdataestimasi');
    Route::get('cekdataMaintenanceGambar/{noOd}/{bagian}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\MaintenanceBagianGambarController@cekdata');
    Route::get('GetdatabagianMaintenanceGambar/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\MaintenanceBagianGambarController@Getdatabagian');
    Route::get('cekdatabagianMaintenanceGambar/{noOd}/{Idbag}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\MaintenanceBagianGambarController@cekdatabagian');

    Route::resource('InputJadwalKonstruksi', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController::class);
    Route::get('LoadDataInputJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@LoadData');
    Route::get('cekdataestimasiInputJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@cekdataestimasi');
    Route::get('GetdatabagianInputJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@Getdatabagian');
    Route::get('GetJamKerjaInputJadwal/{worksts}/{estDate}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@GetJamKerja');
    Route::get('CekdatasudahadaInputJadwal/{idBagian}/{estDate}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@Cekdatasudahada');
    Route::get('Cekestimasidatekonstruksi/{EstDate}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@Cekestimasidatekonstruksi');
    Route::get('HitungSisaJamInputJadwalKons/{EstDate}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@HitungSisaJam');

    Route::resource('EditJam', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJamKerjaOptimalController::class);
    Route::get('HitungSisaJamEditJam/{EstDate}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJamKerjaOptimalController@HitungSisaJam');
    Route::get('GetJamKerjaEditJam/{worksts}/{estDate}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJamKerjaOptimalController@GetJamKerja');

    Route::resource('EditPerWorkStation', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerWorkStationController::class);
    Route::get('NoAntriEditPerWorkstation/{worksts}/{date1}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerWorkStationController@NoAntri');
    Route::get('getdatatableEditPerWorkstation/{noAntri}/{date}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerWorkStationController@getdatatable');

    Route::resource('EditPerOrderkonstruksi', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerOrderController::class);
    Route::get('LoadDataEditPerOrderKonstruksi/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerOrderController@LoadData');
    Route::get('cekEstimasiKonstruksiEditPerOrderKonstruksi/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerOrderController@cekEstimasiKonstruksi');
    Route::get('getDataTableEditPerOrderKonstruksi/{noOd}/{idBag}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerOrderController@getDataTable');

    Route::resource('EditEstimasiTanggal', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiTanggalController::class);
    Route::get('NOFINISHEditEstimasiJadwal/{worksts}/{date1}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiTanggalController@NOFINISH');
    // Route::get('getdatatableEditEstimasiJadwal/{noAntri}/{date}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiTanggalController@getdatatable');
    Route::get('cekestimasiEditEstimasiTanggal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiTanggalController@cekestimasi');
    Route::get('cekestimasikonstruksiEditEstimasiTanggal/{noOd}/{newTgl}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiTanggalController@cekestimasikonstruksi');

    Route::resource('EditEstimasiWaktu', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiWaktuController::class);
    Route::get('LoaddataEditEstimasiWaktu/{worksts}/{date1}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiWaktuController@Loaddata');
    Route::get('hitungjamEditEstimasiWaktu/{EstDate}/{worksts}/{noQue}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiWaktuController@hitungjam');
    Route::post('EditJamKerjaKonstruksiEditEstimasiWaktu', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiWaktuController@EditJamKerjaKonstruksi');
    Route::get('HitungJamSisaEditEstimasiWaktu/{EstDate}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiWaktuController@HitungJamSisa');
    Route::get('GetJamKerjaEditEstimasiWaktu/{worksts}/{EstDate}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiWaktuController@GetJamKerja');


    Route::get('FinishJadwalKonstruksi', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksiController@FinishJadwalKonstruksi');
    Route::get('DeleteJadwalPerWorkStation', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksiController@DeleteJadwalPerWorkStation');
    Route::get('DeleteJadwalPerOrder', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksiController@DeleteJadwalPerOrder');

    //gps2
    Route::get('MaintenanceMaterialType', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@MaintenanceMaterialType');
    Route::get('MaintenanceMaterialType', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@MaintenanceMaterialType');
    Route::get('MaintenanceBagianBarang', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@MaintenanceBagianBarang');
    Route::get('InputJadwal', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@InputJadwal');
    Route::get('EditJamKerja', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@EditJamKerja');
    Route::get('EditPerMesin', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@EditPerMesin');
    Route::get('EditPerOrder', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@EditPerOrder');
    Route::get('EditEstimasiTanggalPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@EditEstimasiTanggal');
    Route::get('EditEstimasiWaktuPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@EditEstimasiWaktu');
    Route::get('EditJumlahBarang', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@EditJumlahBarang');
    Route::get('FinishJadwalPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@FinishJadwal');
    Route::get('DeletePerMesin', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@DeletePerMesin');
    Route::get('DeletePerOrder', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@DeletePerOrder');
    Route::get('BiayaProsesMakloon', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@BiayaProsesMakloon');
    Route::get('HargaMaterial', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@HargaMaterial');
    Route::get('MaintenanceDataSPart', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@MaintenanceDataSpart');
    Route::get('NomorOrderKerjaProyek', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@NomorOrderKerjaProyek');
    Route::get('DataPerencanaan', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@DataPerencanaan');
    Route::get('DataSelesai', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@DataSelesai');

    //gps3
    Route::resource('JadwalPerWorkStation', App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksi\JadwalPerWorkStationController::class);
    Route::get('LoaddataJadwalPerWorkStation/{worksts}/{date1}/{date2}', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksi\JadwalPerWorkStationController@Loaddata');


    // Route::get('', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@JadwalPerWorkStation');
    Route::get('JadwalPerOder', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@JadwalPerOrder');
    Route::get('DaftarOrderGambar', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@DaftarOrderGambar');
    Route::get('DaftarEstimasiJadwal', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@DaftarEstimasiJadwal');
    Route::get('GrafikWorkStation', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@GrafikWorkStation');
    Route::get('JadwalKonstruksiPerBulan', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@JadwalKonstruksiPerBulan');
    Route::get('HistoriProsesKonstruksi', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@HistoriProsesKonstruksi');

    //gps4
    Route::get('JadwalPerMesinPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@JadwalPerMesinPengerjaan');
    Route::get('JadwalPerOrderPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@JadwalPerOrderPengerjaan');
    Route::get('DaftarOrderKerjaProyek', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@DaftarOrderKerjaProyek');
    Route::get('EDMCNC', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@EDMCNC');
    Route::get('DrillMillScrap', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@DrillMillScrap');
    Route::get('MesinGrinding', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@MesinGrinding');
    Route::get('MesinLas', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@MesinLas');
    Route::get('PunchInjectCasting', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@PunchInjectCasting');
    Route::get('Turning', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@Turning');
    Route::get('Finishing', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@Finishing');
    Route::get('ProsesMakloon', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@Makloon');
    Route::get('PengerjaanPerOrder', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@PengerjaanPerOrder');
    Route::get('PengerjaanPerBulan', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@PengerjaanPerBulan');
    Route::get('HistoriProsesPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@HistoriProsesPengerjaan');
    Route::get('DaftarSPerPart', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@DaftarSPerPart');

    //gps - Laporan
    Route::get('OrderPengerjaanMasuk', 'App\Http\Controllers\WORKSHOP\Gps\LaporanController@OrderPengerjaanMasuk');
    Route::get('HasilPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\LaporanController@HasilPengerjaan');
    #endregion

    #region Workshop
    Route::get('Workshop', 'App\Http\Controllers\HomeController@Workshop');

    // Workshop - Master
    Route::resource('MaintenanceDivisi', App\Http\Controllers\WORKSHOP\Workshop\Master\MaintenanceDivisiController::class);
    Route::resource('MaintenanceDrafter', App\Http\Controllers\WORKSHOP\Workshop\Master\MaintenanceDrafterController::class);
    Route::resource('UpdateNoGambar', App\Http\Controllers\WORKSHOP\Workshop\Master\UpdateNoGambarController::class);
    Route::resource('MaintenanceMesin', App\Http\Controllers\WORKSHOP\Workshop\Master\MaintenanceMesinController::class);

    Route::get('getdata/{id}', 'App\Http\Controllers\WORKSHOP\Workshop\Master\UpdateNoGambarController@Getdata');
    Route::get('getmesin/{id}', 'App\Http\Controllers\WORKSHOP\Workshop\Master\MaintenanceMesinController@getmesin');

    // Workshop - Transaksi
    Route::resource('MaintenanceOrderGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderGambarController::class);
    Route::get('getalldata/{tgl_awal}/{tgl_akhir}/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderGambarController@GetDataAll');
    Route::get('GatDataForUserOrder/{tgl_awal}/{tgl_akhir}/{iduserOrder}/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderGambarController@GatDataForUserOrder');
    Route::get('mesin/{idDivisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderGambarController@mesin');
    Route::get('GetBarang/{KdBrg}/{IdDiv}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderGambarController@GetBarang');

    Route::resource('ACCManagerGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCManagerGambarController::class);
    Route::get('getalldatamanager/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCManagerGambarController@GetDataAll');

    Route::resource('ACCDirekturGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCDirekturGambarController::class);
    Route::get('getalldataDirektur/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCDirekturGambarController@GetAllData');

    Route::resource('PenerimaOrderGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController::class);
    Route::get('getalldataPenerimaGambar/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController@GetAllData');
    Route::get('cekuser/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController@cekuser');
    Route::get('cekuserkoreksi/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController@cekuserkoreksi');
    Route::get('cekuserprosesmodal/{user}/{kode}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController@cekuserprosesmodal');
    Route::get('ceknomorGambar/{nogambar}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController@ceknomorGambar');
    Route::get('GetUserDrafterPenerimaOrderGambar/{noOd}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController@GetUserDrafter');

    Route::resource('ProsesPembeliGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ProsesPembeliGambarController::class);
    Route::get('getalldataPembeliGambar/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ProsesPembeliGambarController@GetAllData');
    Route::get('GetDataModalPembeliGambar/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ProsesPembeliGambarController@GetDataModal');
    Route::get('getdataprintGambar/{idorder}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ProsesPembeliGambarController@getdataprint');
    Route::post('UpdateCetakpembeligambar', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ProsesPembeliGambarController@updatedatacetak');

    Route::resource('StatusOrderGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\StatusOrderGambarController::class);
    Route::get('getalldataStatusOrderGambar/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\StatusOrderGambarController@GetAllData');

    Route::resource('MaintenanceKodeGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceKodeBarangController::class);
    Route::get('getbarangkodeGambar/{noOd}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceKodeBarangController@getbarang');
    Route::get('selectnoGambar/{noOd}/{kode}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceKodeBarangController@selectnoGambar');

    Route::resource('MaintenanceOrderKerja', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController::class);
    Route::get('getalldatakerja/{tgl_awal}/{tgl_akhir}/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@GetDataAll');
    Route::get('GatDataForUserOrderkerja/{tgl_awal}/{tgl_akhir}/{iduserOrder}/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@GatDataForUserOrder');
    Route::get('LoadData1/{noGambar}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@LoadData1');
    Route::get('LoadData2/{kdbarang}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@LoadData2');
    Route::get('LoadData/{kdBarang}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@LoadData');
    Route::get('Mesinmodal/{idDivisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@mesin');
    Route::post('inputfile', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@inputfile');
    Route::get('selectpdf/{kdBarang}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@selectpdf');
    Route::post('updatefile', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@updatepdf');
    Route::post('/MaintenanceOrderKerja/uploadDokumentasi', [MaintenanceOrderKerjaController::class, 'uploadDokumentasi']);
    Route::get('/MaintenanceOrderKerja/getDokumentasi/{noOrder}', [MaintenanceOrderKerjaController::class, 'getDokumentasi']);
    Route::delete('/MaintenanceOrderKerja/deleteDokumentasi/{noOrder}', [MaintenanceOrderKerjaController::class, 'deleteDokumentasi']);
    Route::get('MaintenanceOrderKerja/checkDokumentasi/{noOrder}', [MaintenanceOrderKerjaController::class, 'checkDokumentasi']);

    Route::resource('ACCManagerKerja', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCManagerKerjaController::class);
    Route::get('getalldataACCManagerKerja/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCManagerKerjaController@GetDataAll');
    Route::get('LoaddataACCManagerKerja/{id}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCManagerKerjaController@Loaddata');
    Route::get('getsaldoACCManagerKerja/{kodebarang}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCManagerKerjaController@getsaldo');

    Route::resource('ACCDirekturKerja', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCDirekturKerjaController::class);
    Route::get('getalldataACCDirekturKerja/{tglawal}/{tglakhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCDirekturKerjaController@getalldata');
    Route::get('getsaldoACCDirekturKerja/{kode}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCDirekturKerjaController@getdatasaldo');

    Route::resource('ACCPPIC', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCPPICController::class);
    Route::get('ACCCPPIC/{user}/{nomorOrder}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCPPICController@ACCCPPIC');

    Route::resource('PenerimaOrderKerja', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderKerjaController::class);
    Route::get('getalldataPenerimaOrderKerja/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderKerjaController@GetAllData');
    Route::get('cekuserPenerimaOrderKerja/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderKerjaController@cekuser');
    Route::get('cekuserkoreksiOrderKerja/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderKerjaController@cekuserkoreksi');
    Route::get('namauserPenerimaOrderKerja/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderKerjaController@namauserPenerimaOrderKerja');
    Route::get('LoadStokPenerimaOrderKerja/{kdbarang}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderKerjaController@LoadStok');

    Route::resource('CetakSuratOrderKerja', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\CetakOrderKerjaController::class);
    Route::get('getalldataCetakSuratOrderKerja/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\CetakOrderKerjaController@GetAllData');
    Route::get('getdataprintCetakOrderKerja/{idorder}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\CetakOrderKerjaController@getdataprint');
    Route::post('UpdateCetakSuratOrderKerja', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\CetakOrderKerjaController@updatedatacetak');

    Route::resource('StatusOrderKerja', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\StatusOrderKerjaController::class);
    Route::get('getalldataStatusOrderKerja/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\StatusOrderKerjaController@GetAllData');

    // Workshop - Proyek
    Route::resource('MaintenanceOrderProyek', App\Http\Controllers\WORKSHOP\Workshop\Proyek\MaintenanceOrderProyekController::class);
    Route::get('GetDataAllMaintenanceOrderProyek/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\MaintenanceOrderProyekController@GetDataAll');
    Route::get('GatDataForUserOrderMaintenanceOrderKerja/{tgl_awal}/{tgl_akhir}/{iduserOrder}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\MaintenanceOrderProyekController@GatDataForUserOrder');
    Route::get('GetMesinMaintenanceOrderProyek/{idDivisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\MaintenanceOrderProyekController@GetMesin');
    Route::get('GetDataTableMaintenanceOrderProyek/{noOrder}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\MaintenanceOrderProyekController@GetDataTable');
    Route::post('/MaintenanceOrderProyek/uploadDokumentasi', [MaintenanceOrderProyekController::class, 'uploadDokumentasi']);
    Route::get('/MaintenanceOrderProyek/getDokumentasi/{noOrder}', [MaintenanceOrderProyekController::class, 'getDokumentasi']);
    Route::delete('/MaintenanceOrderProyek/deleteDokumentasi/{noOrder}', [MaintenanceOrderProyekController::class, 'deleteDokumentasi']);
    Route::get('MaintenanceOrderProyek/checkDokumentasi/{noOrder}', [MaintenanceOrderProyekController::class, 'checkDokumentasi']);

    Route::resource('ACCManagerProyek', App\Http\Controllers\WORKSHOP\Workshop\Proyek\ACCManagerProyekController::class);
    Route::get('GetDataAllACCManagerProyek/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\ACCManagerProyekController@GetDataAll');
    Route::get('GetDataTableACCManagerProyek/{idOrder}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\ACCManagerProyekController@GetDataTable');

    Route::resource('ACCDirekturProyek', App\Http\Controllers\WORKSHOP\Workshop\Proyek\ACCDirekturProyekController::class);
    Route::get('GetDataAllACCDirekturProyek/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\ACCDirekturProyekController@GetAllData');

    Route::resource('PenerimaOrderProyek', App\Http\Controllers\WORKSHOP\Workshop\Proyek\PenerimaOrderProyekController::class);
    Route::get('GetDataAllPenerimaOrderProyek/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\PenerimaOrderProyekController@GetAllData');
    Route::get('cekuserPenerimaOrderGambar/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\PenerimaOrderProyekController@cekuser');
    Route::get('namauserPenerimaOrderProyek/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\PenerimaOrderProyekController@namauserPenerimaOrderProyek');
    Route::get('cekuserkoreksiPenerimaOrderProyek/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\PenerimaOrderProyekController@cekuserkoreksi');

    Route::resource('CetakSuratOrderProyek', App\Http\Controllers\WORKSHOP\Workshop\Proyek\CetakOrderProyekController::class);
    Route::get('GetAllDataCetakOrderProyek/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\CetakOrderProyekController@GetAllData');
    Route::get('getdataprintCetakOrderProyek/{idorder}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\CetakOrderProyekController@getdataprint');
    Route::post('updatedatacetakOrderProyek', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\CetakOrderProyekController@updatedatacetak');

    Route::resource('StatusOrderProyek', App\Http\Controllers\WORKSHOP\Workshop\Proyek\StatusOrderProyekController::class);
    Route::get('GetAllDataStatusOrderProyek/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\StatusOrderProyekController@GetAllData');

    // Workshop - Informasi

    Route::resource('OrderGambarSelesai', App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderGambar::class);
    Route::get('GetAllDataPengorder/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderGambar@GetAllDataPengorder');
    Route::get('GetAllDataPenerima/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderGambar@GetAllDataPenerima');

    Route::resource('OrderKerjaSelesai', App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderKerja::class);
    Route::get('GetAllDataPengorderKerja/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderKerja@GetAllDataPengorder');
    Route::get('GetAllDataPenerimaKerja/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderKerja@GetAllDataPenerima');

    Route::resource('OrderProyekSelesai', App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderProyek::class);
    Route::get('GetAllDataPengorderProyek/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderProyek@GetAllDataPengorder');
    Route::get('GetAllDataPenerimaProyek/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderProyek@GetAllDataPenerima');

    Route::resource('NomorGambar', App\Http\Controllers\WORKSHOP\Workshop\Informasi\NomorGambar::class);
    Route::get('getdataNomorGambar/{kdbarang}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\NomorGambar@getdata');

    Route::resource('OrderGambar', App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderGambar::class);
    Route::get('GetAllDataPengorderGambar/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderGambar@GetAllDataPengorder');

    Route::resource('OrderKerja', App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderKerja::class);
    Route::get('GetAllDataPengorderKerja/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderKerja@GetAllDataPengorder');
    Route::get('/OrderKerja/getDokumentasi/{id}', [OrderKerja::class, 'getDokumentasi']);
    Route::get('/OrderKerja/checkDokumentasi/{id}', [OrderKerja::class, 'checkDokumentasi']);

    Route::resource('OrderProyek', App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderProyek::class);
    Route::get('GetAllDataPengorderProyek/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderProyek@GetAllDataPengorder');
    Route::get('/OrderProyek/getDokumentasi/{id}', [OrderProyek::class, 'getDokumentasi']);
    Route::get('/OrderProyek/checkDokumentasi/{id}', [OrderProyek::class, 'checkDokumentasi']);
    #endregion

    #region Ad Star
    Route::get('AD Star', 'App\Http\Controllers\HomeController@ADS')->name('AdStar.Home');
    Route::resource('KebutuhanKomponenAdStar', App\Http\Controllers\AdStarController\KebutuhanKomponenADStarController::class);
    Route::resource('MaintenanceOrderKerjaADS', App\Http\Controllers\AdStarController\MaintenanceOrderKerjaADSController::class);
    Route::resource('AdStarOpenTop', App\Http\Controllers\AdStarController\OpenTop::class);
    Route::resource('AdStarCloseTop', App\Http\Controllers\AdStarController\CloseTop::class);
    Route::resource('CetakTabelHitunganAdStar', App\Http\Controllers\AdStarController\CetakTabelHitunganAdStarController::class);
    Route::resource('CopyTableHitunganAdStar', App\Http\Controllers\AdStarController\CopyTableHitunganAdStarController::class);
    #endregion

    #region Utility
    Route::get('Utility', 'App\Http\Controllers\HomeController@Utility');

    //elektrik
    Route::resource('InputGangguanElektrik', App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController::class);
    Route::get('/getUpdatedData', [App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController::class, 'getUpdatedData']);
    Route::post('/postData', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@postData');
    Route::post('/postDataGambar', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@postDataGambar');
    Route::get('/selectImage/{id}/{imageName}', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@selectImage');
    Route::post('/updateDataElektrik', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@updateDataElektrik');
    Route::post('/gangguanBulanan', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@gangguanBulanan');
    Route::post('/upload-image', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@uploadImage')->name('uploadImage');
    Route::get('/getData', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@getData');
    Route::delete('/deleteData', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@deleteData');
    Route::get('/getUserId', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@getUserId');
    Route::get('/getDataElektrikId', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@getDataElektrikId');
    Route::resource('InputGangguanBulananElektrik', App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController::class);
    Route::get('/getDataBulanan', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@getDataBulanan');
    Route::get('/getDataBulananId', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@getDataBulananId');
    Route::get('/selectImageBulanan/{id}/{imageName}', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@selectImageBulanan');
    Route::post('/postDataBulanan', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@postDataBulanan');
    Route::post('/updateDataBulanan', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@updateDataBulanan');
    Route::delete('/deleteDataBulanan', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@deleteDataBulanan');
    Route::get('/reloadTipeKeterangan', [App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController::class, 'reloadTipeKeterangan'])->name('reloadTipeKeterangan');


    //Tipe Gangguan Elektrik
    Route::get('/get-tipegangguan', [App\Http\Controllers\Utility\Elektrik\TipeGangguan\TipeGangguanElektrikController::class, 'getTipeGangguan'])->name('get-tipegangguan');
    Route::get('/reload-tipegangguan', [App\Http\Controllers\Utility\Elektrik\TipeGangguan\TipeGangguanElektrikController::class, 'reloadTipeGangguan'])->name('reload-tipegangguan');
    Route::post('/save-tipegangguan', [App\Http\Controllers\Utility\Elektrik\TipeGangguan\TipeGangguanElektrikController::class, 'saveTipeGangguan'])->name('save-tipegangguan');
    Route::put('/update-tipegangguan', [App\Http\Controllers\Utility\Elektrik\TipeGangguan\TipeGangguanElektrikController::class, 'updateTipeGangguan'])->name('update-tipegangguan');
    Route::delete('/delete-tipegangguan', [App\Http\Controllers\Utility\Elektrik\TipeGangguan\TipeGangguanElektrikController::class, 'deleteTipeGangguan'])->name('delete-tipegangguan');

    // Tambah Gambar Elektrik
    Route::resource('TambahGambarElektrik', App\Http\Controllers\Utility\Elektrik\TambahGambarElektrikController::class);
    Route::post('/postTambahGambar', 'App\Http\Controllers\Utility\Elektrik\TambahGambarElektrikController@postDataGambar');
    Route::post('/updateTambahGambar', 'App\Http\Controllers\Utility\Elektrik\TambahGambarElektrikController@updateDataGambar');
    Route::get('/SelectImages/{id}/{imageName}', 'App\Http\Controllers\Utility\Elektrik\TambahGambarElektrikController@SelectImages');
    Route::get('checkData', 'App\Http\Controllers\Utility\Elektrik\TambahGambarElektrikController@checkData');
    Route::resource('PrintElektrik', App\Http\Controllers\Utility\Elektrik\PrintElektrikController::class);


    //project
    Route::resource('InputProject', App\Http\Controllers\Utility\Project\InputProjectController::class);
    Route::post('/postDataProject', 'App\Http\Controllers\Utility\Project\InputProjectController@postDataProject');
    Route::get('/selectImageProject/{id}/{imageName}', 'App\Http\Controllers\Utility\Project\InputProjectController@selectImage');
    Route::get('/getDataProject', 'App\Http\Controllers\Utility\Project\InputProjectController@getDataProject');
    Route::delete('/deleteDataProject', 'App\Http\Controllers\Utility\Project\InputProjectController@deleteDataProject');
    Route::get('/getDataProjectId', 'App\Http\Controllers\Utility\Project\InputProjectController@getDataProjectId');
    Route::get('/getDataUserId', 'App\Http\Controllers\Utility\Project\InputProjectController@getDataUserId');
    Route::get('/getNamaUser', 'App\Http\Controllers\Utility\Project\InputProjectController@getNamaUser');
    Route::post('/updateDataProject', 'App\Http\Controllers\Utility\Project\InputProjectController@updateDataProject');
    Route::delete('/deleteDataProject', 'App\Http\Controllers\Utility\Project\InputProjectController@deleteDataProject');

    // Tambah Gambar Project
    Route::resource('TambahGambarProject', App\Http\Controllers\Utility\Project\TambahGambarProjectController::class);
    Route::post('/postTambahGambarProject', 'App\Http\Controllers\Utility\Project\TambahGambarProjectController@postDataGambarProject');
    Route::post('/updateTambahGambarProject', 'App\Http\Controllers\Utility\Project\TambahGambarProjectController@updateDataGambarProject');
    Route::get('/SelectImagesProject/{id}/{imageName}', 'App\Http\Controllers\Utility\Project\TambahGambarProjectController@SelectImagesProject');
    Route::get('checkDataProject', 'App\Http\Controllers\Utility\Project\TambahGambarProjectController@checkDataProject');

    // Print Project
    Route::resource('PrintProject', App\Http\Controllers\Utility\Project\PrintProjectController::class);


    // Compressor
    Route::resource('addCompressor', App\Http\Controllers\Utility\Compressor\InputPerawatanController::class);
    Route::get('/get-keterangan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'getKeterangan'])->name('get-keterangan');
    Route::get('/get-perawatan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'getPerawatan'])->name('get-perawatan');
    Route::get('/get-perawatan-compressor', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'getPerawatanById'])->name('get-perawatan-compressor');
    Route::post('/save-perawatan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'savePerawatan'])->name('save-perawatan');
    Route::put('/update-perawatan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'updatePerawatan'])->name('update-perawatan');
    //Route::put('/update-perawatan2', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'updatePerawatan2'])->name('update-perawatan');
    Route::delete('/delete-perawatan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'hapusPerawatan'])->name('delete-perawatan');

    //LogSheet
    Route::resource('LogSheet', App\Http\Controllers\Utility\Compressor\LogSheetController::class);
    Route::get('/get-logsheet', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'getDataLogSheet'])->name('get-logsheet');
    Route::get('/get-logsheet-compressor', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'getDataLogSheetById'])->name('get-logsheet-compressor');
    Route::post('/save-logsheet', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'saveDataLogSheet'])->name('save-logsheet');
    Route::put('/update-logsheet', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'updateDataLogSheet'])->name('update-logsheet');
    Route::delete('/delete-logsheet', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'deleteDataLogSheet'])->name('delete-logsheet');

    // Genzet
    Route::resource('InputOperasional', App\Http\Controllers\Utility\Genzet\InputOperasionalController::class);
    Route::get('/get-genzet', [App\Http\Controllers\Utility\Genzet\InputOperasionalController::class, 'getGenzet'])->name('get-genzet');
    Route::get('/getstatus', [App\Http\Controllers\Utility\Genzet\InputOperasionalController::class, 'statusLog'])->name('getstatus');
    Route::get('/get-operational-genzet', [App\Http\Controllers\Utility\Genzet\InputOperasionalController::class, 'getById'])->name('get-operational-genzet');
    Route::post('/save-genzet', [App\Http\Controllers\Utility\Genzet\InputOperasionalController::class, 'createGenzet'])->name('save-genzet');
    Route::put('/update-genzet', [App\Http\Controllers\Utility\Genzet\InputOperasionalController::class, 'updateGenzet'])->name('update-genzet');
    Route::delete('/delete-genzet', [App\Http\Controllers\Utility\Genzet\InputOperasionalController::class, 'deleteGenzet'])->name('delete-genzet');

    // Status Log Genzet
    Route::get('/get-statuslog', [App\Http\Controllers\Utility\Genzet\StatusLog\StatusLogController::class, 'getStatusLog'])->name('get-statuslog');
    Route::get('/reloadStatus', [App\Http\Controllers\Utility\Genzet\StatusLog\StatusLogController::class, 'reloadStatus'])->name('reloadStatus');
    Route::post('/save-statuslog', [App\Http\Controllers\Utility\Genzet\StatusLog\StatusLogController::class, 'savestatuslog'])->name('save-statuslog');
    Route::put('/update-statuslog', [App\Http\Controllers\Utility\Genzet\StatusLog\StatusLogController::class, 'updatestatuslog'])->name('update-statuslog');
    Route::delete('/delete-statuslog', [App\Http\Controllers\Utility\Genzet\StatusLog\StatusLogController::class, 'deletestatuslog'])->name('delete-statuslog');
    // Panel Induk
    Route::resource('InputGangguanPanel', App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class);
    Route::put('/update-panel', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'updatePANEL'])->name('update-panel');
    Route::post('/save-panel', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'createPANEL'])->name('save-panel');
    Route::get('/get-panel', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'getPANEL'])->name('get-panel');
    Route::get('/get-panel-id', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'getPANELById'])->name('get-panel-id');
    Route::get('/reloadKeterangan', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'reloadKeterangan'])->name('reloadKeterangan');
    Route::delete('/delete-panel', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'deletePANEL'])->name('delete-panel');

    //Keterangan Gangguan Panel Induk
    Route::get('/get-keterangangangguan', [App\Http\Controllers\Utility\PanelInduk\KetGangguan\InputKeteranganGangguanController::class, 'getKeteranganGangguan'])->name('get-keterangangangguan');
    Route::post('/save-keterangangangguan', [App\Http\Controllers\Utility\PanelInduk\KetGangguan\InputKeteranganGangguanController::class, 'saveKeteranganGangguan'])->name('save-keterangangangguan');
    Route::put('/update-keterangangangguan', [App\Http\Controllers\Utility\PanelInduk\KetGangguan\InputKeteranganGangguanController::class, 'updateKeteranganGangguan'])->name('update-keterangangangguan');
    Route::delete('/delete-keterangangangguan', [App\Http\Controllers\Utility\PanelInduk\KetGangguan\InputKeteranganGangguanController::class, 'deleteKeteranganGangguan'])->name('delete-keterangangangguan');

    //PLN
    Route::resource('InputPLN', App\Http\Controllers\Utility\PLN\InputPLNController::class);
    Route::post('/save-pln', [App\Http\Controllers\Utility\PLN\InputPLNController::class, 'createPLN'])->name('save-pln');
    Route::get('/get-pln', [App\Http\Controllers\Utility\PLN\InputPLNController::class, 'getPLN'])->name('get-pln');
    Route::get('/get-pln-id', [App\Http\Controllers\Utility\PLN\InputPLNController::class, 'getPLNId'])->name('get-pln-id');
    Route::delete('/delete-pln', [App\Http\Controllers\Utility\PLN\InputPLNController::class, 'deletePLN'])->name('delete-pln');

    //Panel sdp
    Route::get('/get-sdp', [App\Http\Controllers\Utility\PLN\PanelSDPController::class, 'getsdp'])->name('get-sdp');
    Route::get('/get-sdp-id', [App\Http\Controllers\Utility\PLN\PanelSDPController::class, 'getsdpById'])->name('get-sdp-id');
    Route::put('/update-sdp', [App\Http\Controllers\Utility\PLN\PanelSDPController::class, 'updatesdp'])->name('update-sdp');
    Route::post('/save-sdp', [App\Http\Controllers\Utility\PLN\PanelSDPController::class, 'createsdp'])->name('save-sdp');
    Route::delete('/delete-sdp', [App\Http\Controllers\Utility\PLN\PanelSDPController::class, 'deletesdp'])->name('delete-sdp');

    //Berita Acara
    Route::get('/get-ba', [App\Http\Controllers\Utility\PLN\BeritaAcaraController::class, 'getBA'])->name('get-ba');
    Route::get('/get-ba-id', [App\Http\Controllers\Utility\PLN\BeritaAcaraController::class, 'getBAById'])->name('get-ba-id');
    Route::put('/update-ba', [App\Http\Controllers\Utility\PLN\BeritaAcaraController::class, 'updateBA'])->name('update-ba');
    Route::post('/save-ba', [App\Http\Controllers\Utility\PLN\BeritaAcaraController::class, 'createBA'])->name('save-ba');
    Route::delete('/delete-ba', [App\Http\Controllers\Utility\PLN\BeritaAcaraController::class, 'deleteBA'])->name('delete-ba');

    //Master
    Route::resource('MaintenanceTeknisi', App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class);
    Route::resource('MaintenanceTipeGangguan', App\Http\Controllers\Utility\Master\MaintenanceTipeGangguan::class);
    Route::get('/get-teknisi', [App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class, 'getTeknisi'])->name('get-teknisi');
    Route::get('/get-teknisi-id', [App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class, 'getTeknisiById'])->name('get-teknisi-id');
    Route::get('/search-teknisi', [App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class, 'searchTeknisi'])->name('search-teknisi');
    Route::post('/save-teknisi', [App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class, 'saveTeknisi'])->name('save-teknisi');
    Route::post('/update-teknisi', [App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class, 'updateTeknisi'])->name('update-teknisi');
    Route::delete('/delete-teknisi', [App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class, 'deleteTeknisi'])->name('delete-teknisi');
    Route::get('/AllLokasiTeknisi/{IdTeknisi}', [App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class, 'AllLokasiTeknisi'])->name('All-Lokasi-Teknisi');

    #endRegion

    #region Jumbo Bag
    Route::get('JumboBag', 'App\Http\Controllers\HomeController@JumboBag');
    //informasi
    Route::resource('TabelHitunganInformasi', App\Http\Controllers\JumboBag\TabelHitunganInformasi::class);
    Route::resource('EstimasiHarga', App\Http\Controllers\JumboBag\EstimasiHarga::class);
    //Master
    Route::resource('MaintenanceCustomer', App\Http\Controllers\JumboBag\MaintenanceCustomerJBB::class);
    Route::get('/api/customers', [App\Http\Controllers\JumboBag\MaintenanceCustomerJBB::class, 'getCustomers']);
    Route::delete('/delete-customer/{idCustomer}', [App\Http\Controllers\JumboBag\MaintenanceCustomerJBB::class, 'deleteCustomer']);
    Route::put('/update-customer/{id}', [App\Http\Controllers\JumboBag\MaintenanceCustomerJBB::class, 'updateCustomer']);
    Route::resource('MaintenanceMesinJBB', App\Http\Controllers\JumboBag\MaintenanceMesinJBBController::class);
    //Transaksi
    Route::resource('MaintKegiatanMesinPotongJBB', App\Http\Controllers\JumboBag\MaintenanceKegiatanMesinPotongJBBController::class);
    //Tabel Hitungan
    Route::resource('CopyKodeBarang', App\Http\Controllers\JumboBag\CopyKodeBarang::class);
    Route::resource('KebutuhanKomponenJBB', App\Http\Controllers\JumboBag\KebutuhanKomponenJBBController::class);
    Route::resource('TabelHitunganJBB', App\Http\Controllers\JumboBag\TabelHitunganJumboBag::class);
    Route::post('getDataCustomerJBB', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@getDataCustomerJBB');
    Route::post('getDataTambahKomponenJBB', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@getDataTambahKomponenJBB');
    Route::post('getDataNamaBarangJBB', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@getDataNamaBarangJBB');
    Route::post('getDataModelBodyJBB', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@getDataModelBodyJBB');
    Route::post('getDataModelCerobongAtasJBB', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@getDataModelCerobongAtasJBB');
    Route::post('getDataModelCerobongBawahJBB', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@getDataModelCerobongBawahJBB');
    Route::post('getDataWarnaBeltReinforcedJBB', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@getDataWarnaBeltReinforcedJBB');
    Route::post('getDataLamiReinforcedJBB', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@getDataLamiReinforcedJBB');
    Route::get('loadDataRincianTableHitunganJumboBag/{KodeBarang}/{NamaCustomer}', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@loadDataRincianTableHitunganJumboBag');
    Route::get('GetDataKoreksiJBB/{kodeBarang}/{namaCustomer}', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@GetDataKoreksi');
    Route::get('GetDataTotalJBB/{kodeBarang}', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@GetDataTotal');
    // Route::get('GetDataTglUpdateTH/{kodeBarang}', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@GetDataTglUpdateTH');
    // Route::get('GetDataHeadTH/{kodeBarang}', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@GetDataHeadTH');
    // Route::get('GetDataRincianTH/{kodeBarang}/{namaCustomer}', 'App\Http\Controllers\JumboBag\TabelHitunganJumboBag@GetDataRincianTH');
    Route::resource('UbahKodeBarang', App\Http\Controllers\JumboBag\UbahKodeBarang::class);
    //Tabel Order
    Route::resource('CopyTabelOrder', App\Http\Controllers\JumboBag\CopyTabelOrder::class);
    Route::resource('MaintenanceOrderPress', App\Http\Controllers\JumboBag\MaintenanceOrderPress::class);
    Route::resource('MaintenanceTabelOrder', App\Http\Controllers\JumboBag\MaintenanceTabelOrder::class);
    Route::resource('OrderJahit', App\Http\Controllers\JumboBag\OrderJahit::class); // tidak digunakan
    Route::resource('OrderPotong', App\Http\Controllers\JumboBag\OrderPotong::class); // tidak digunakan
    Route::resource('OrderPress', App\Http\Controllers\JumboBag\OrderPress::class);
    Route::resource('PermohonanRetur', App\Http\Controllers\JumboBag\PermohonanRetur::class);
    Route::resource('ReturPengganti', App\Http\Controllers\JumboBag\ReturPengganti::class);
    #endregion

    #region Woven Bag
    Route::get('WovenBag', 'App\Http\Controllers\HomeController@WovenBag')->name('WovenBag.Home');
    Route::resource('TabelHitungan', App\Http\Controllers\WovenBag\TabelHitunganWovenBag::class);
    Route::resource('TabelHitunganTubingOPP', App\Http\Controllers\WovenBag\TableHitunganTubingOPPController::class);
    Route::resource('TabelHitunganSandwich', App\Http\Controllers\WovenBag\TableHitunganSandwichController::class);
    Route::resource('CopyTableHitunganWoven', App\Http\Controllers\WovenBag\CopyTableHitunganWovenController::class);
    Route::resource('CetakTabelHitunganWovenBag', App\Http\Controllers\WovenBag\CetakTabelHitunganWovenBagController::class);

    #endregion

    #region Accounting
    Route::get('Accounting', 'App\Http\Controllers\HomeController@Accounting');

    //Master
    Route::resource('MaintenanceBank', App\Http\Controllers\Accounting\Master\MaintenanceBankController::class);
    Route::resource('MaintenanceMataUang', App\Http\Controllers\Accounting\Master\MaintenanceMataUangController::class);
    Route::resource('MaintenanceStatusSupplier', App\Http\Controllers\Accounting\Master\MaintenanceStatusSupplierController::class);
    Route::resource('CounterFaktur', App\Http\Controllers\Accounting\Master\CounterFakturController::class);

    Route::resource('MPIsiDetail', App\Http\Controllers\Accounting\Hutang\MPIsiDetailController::class);
    // Route::post('handle_form_submission_faktur', 'IsiDeatilFakturPajak@handleFormSubmission');
    Route::get('detaildivisi/{idDivisi}', 'App\Http\Controllers\Accounting\Hutang\MPIsiDetailController@getDataDivisi');
    Route::get('detailtabelpo/{noPO}', 'App\Http\Controllers\Accounting\Hutang\MPIsiDetailController@getTabelPO');
    Route::resource('MaintenancePenagihan', App\Http\Controllers\Accounting\Hutang\MaintenancePenagihanController::class);

    Route::resource('BatalPenagihan', App\Http\Controllers\Accounting\Hutang\BatalPenagihanController::class);
    Route::get('detailpenagihan/{idPenagihan}', 'App\Http\Controllers\Accounting\Hutang\BatalPenagihanController@getDataPenagihan');

    Route::resource('UpdatePIB', App\Http\Controllers\Accounting\Hutang\UpdatePIBController::class);
    Route::resource('ACCSerahTerimaPenagihan', App\Http\Controllers\Accounting\Hutang\ACCSerahTerimaPenagihanController::class);
    Route::resource('MaintenancePenagihandiRETUR', App\Http\Controllers\Accounting\Hutang\PenagihandiRETURController::class);
    Route::resource('MaintenancePelunasanHutang', App\Http\Controllers\Accounting\Hutang\PelunasanHutangController::class);
    // Route::get('MaintenancePelunasanHutang', 'App\Http\Controllers\Accounting\Hutang\PelunasanHutangController@PelunasanHutang');
    Route::resource('MaintenanceJurnal', App\Http\Controllers\Accounting\Hutang\MaintenanceJurnalBeliController::class);
    Route::resource('RekapHutang', App\Http\Controllers\Accounting\Hutang\RekapHutangController::class);
    Route::resource('PenyesuaianSaldoSupplier', App\Http\Controllers\Accounting\Hutang\PenyesuaianSaldoSupplierController::class);
    Route::resource('MaintenancePengajuanBKK', App\Http\Controllers\Accounting\Hutang\PengajuanBKKController::class);
    Route::resource('MaintenanceACCBKK', App\Http\Controllers\Accounting\Hutang\ACCBKKController::class);
    Route::post('/MaintenanceBKKKRR2/getGroup', [App\Http\Controllers\Accounting\Hutang\MaintenanceBKKController::class, 'getGroup']);
    Route::resource('MaintenanceBKKKRR2', App\Http\Controllers\Accounting\Hutang\MaintenanceBKKController::class);
    Route::get('getBankSelect', 'App\Http\Controllers\Accounting\Hutang\MaintenanceBKKController@getBankSelect');
    Route::get('MaintenanceBKKKRR2Print', 'App\Http\Controllers\Accounting\Hutang\MaintenanceBKKController@print');

    Route::resource('MaintenanceKurs', App\Http\Controllers\Accounting\Hutang\MaintenanceKursController::class);

    Route::resource('MaintenanceTTKRR1', App\Http\Controllers\Accounting\Hutang\MaintenanceTTKRR1Controller::class);
    Route::resource('MaintenanceACCBayarTTKRR1', App\Http\Controllers\Accounting\Hutang\MaintenanceACCBayarTTKRR1Controller::class);
    Route::get('getSupplierTTKRR1', 'App\Http\Controllers\Accounting\Hutang\MaintenanceTTKRR1Controller@getSupplierTTKRR1');
    Route::get('getTabelListDetailBrg/{idSupplier}', 'App\Http\Controllers\Accounting\Hutang\MaintenanceTTKRR1Controller@getTabelListDetailBrg');

    Route::get('ACCBayarTT', 'App\Http\Controllers\Accounting\Hutang\ACCBayarTTController@ACCBayarTT');
    Route::resource('MaintenanceBKKKRR1', App\Http\Controllers\Accounting\Hutang\MaintenanceBKKKRR1Controller::class);
    Route::resource('MaintenanceBKMKRR1', App\Http\Controllers\Accounting\Hutang\MaintenanceBKMKRR1Controller::class);

    Route::resource('MaintenanceKodePerkiraanBKK', App\Http\Controllers\Accounting\Hutang\KodePerkiraanBKKController::class);
    Route::get('getIdBKKKdPrk/{BlnThn}', 'App\Http\Controllers\Accounting\Hutang\KodePerkiraanBKKController@getIdBKKKdPrk');
    Route::get('getIdBKKKdPrk2/{BlnThn}', 'App\Http\Controllers\Accounting\Hutang\KodePerkiraanBKKController@getIdBKKKdPrk2');
    Route::get('getTabelRincianBKK/{idBKK}', 'App\Http\Controllers\Accounting\Hutang\KodePerkiraanBKKController@getTabelRincianBKK');

    Route::resource('MaintenanceKursBKK', App\Http\Controllers\Accounting\Hutang\MaintenanceKursBKKController::class);

    Route::resource('BatalBKK', App\Http\Controllers\Accounting\Hutang\BatalBKKController::class);
    Route::get('getIdBKKBesar/{bulanTahun}', 'App\Http\Controllers\Accounting\Hutang\BatalBKKController@getIdBKKBesar');
    Route::get('getIdBKKKecil/{bulanTahun}', 'App\Http\Controllers\Accounting\Hutang\BatalBKKController@getIdBKKKecil');
    Route::get('getListBKKBtlBKK/{idBKKSelect}', 'App\Http\Controllers\Accounting\Hutang\BatalBKKController@getListBKKBtlBKK');
    Route::get('getCheckBtlBKK/{idBKKSelect}', 'App\Http\Controllers\Accounting\Hutang\BatalBKKController@getCheckBtlBKK');

    Route::resource('MaintenanceUraianBKK', App\Http\Controllers\Accounting\Hutang\UraianBKKController::class);
    Route::get('getCheckBKKIdBKK/{idBKK}', 'App\Http\Controllers\Accounting\Hutang\UraianBKKController@getCheckBKKIdBKK');
    Route::get('getListBKK/{idBKK}', 'App\Http\Controllers\Accounting\Hutang\UraianBKKController@getListBKK');
    Route::get('getListBKKTotalIdBKK/{idBKK}', 'App\Http\Controllers\Accounting\Hutang\UraianBKKController@getListBKKTotalIdBKK');

    //Piutang
    Route::resource('MaintenanceBKMTransistorisBank', MaintenanceBKMTransistorisBankController::class);
    Route::resource('BatalBKMTransistoris', BatalBKMTransistorisController::class);

    Route::resource('MaintenanceFakturPajakPenjualan', App\Http\Controllers\Accounting\Piutang\MaintenanceFakturPajakPenjualanController::class);
    Route::resource('MaintenanceBKMPenagihan', App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController::class);
    Route::get('detailtabelpenagihan/{bulan}/{tahun}', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController@getTabelPelunasan');
    Route::get('detailbank', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController@getDataBank');
    Route::get('tabeldetailpelunasan/{idPelunasan}', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController@getTabelDetailPelunasan');
    Route::get('detailkodeperkiraan/{kode}', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController@getKodePerkiraan');
    Route::get('tabelkuranglebih/{idPelunasan}', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController@getTabelKurangLebih');
    Route::get('getTabelTampilBKMPenagihan/{tanggalInputTampil}/{tanggalInputTampil2}', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController@getTabelTampilBKMPenagihan');
    Route::get('tabelbiaya/{idPelunasan}', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController@getTabelBiaya');
    Route::get('cekNoPelunasanBKMPenagihan/{idPelunasan}/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController@cekNoPelunasanBKMPenagihan');
    Route::get('cekJumlahRincianBKMPenagihan/{idPelunasan}', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController@cekJumlahRincianBKMPenagihan');
    Route::post('insertUpdateBKMPenagihan/groupbkm', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController@insertUpdateBKMPenagihan');
    Route::get('getCetakBKMNoPenagihan/{idBKMInput}', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController@getCetakBKMNoPenagihan');
    Route::get('getCetakBKMJumlahPelunasan/{idBKMInput}', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController@getCetakBKMJumlahPelunasan');
    // Route::get('prosesSisaPiutang/{idPelunasan}', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKMPenagihanController@prosesSisaPiutang');

    Route::resource('MaintenanceBKMNoPenagihan', App\Http\Controllers\Accounting\Piutang\BKMNoPenagihanController::class);
    Route::get('detailcustomer/{kode?}', 'App\Http\Controllers\Accounting\Piutang\BKMNoPenagihanController@getNamaCustomer');
    Route::get('detailmatauang/', 'App\Http\Controllers\Accounting\Piutang\BKMNoPenagihanController@getMataUang');
    Route::get('detailbank', 'App\Http\Controllers\Accounting\Piutang\BKMNoPenagihanController@getDataBank');
    Route::get('jenispembayaran', 'App\Http\Controllers\Accounting\Piutang\BKMNoPenagihanController@getJenisPembayaran');
    Route::get('detailkodeperkiraan/{kode}', 'App\Http\Controllers\Accounting\Piutang\BKMNoPenagihanController@getKodePerkiraan');
    Route::get('detailjenisbank/{idBank}', 'App\Http\Controllers\Accounting\Piutang\BKMNoPenagihanController@getJenisBank');
    Route::get('getidbkm/{idBank}/{tanggalInput}', 'App\Http\Controllers\Accounting\Piutang\BKMNoPenagihanController@getUraianEnter');
    Route::get('tabeltampilbkm/{tanggalInputTampil}/{tanggalInputTampil2}', 'App\Http\Controllers\Accounting\Piutang\BKMNoPenagihanController@getTabelTampilBKM');
    //Route::get('BKMNoPenagihan', 'App\Http\Controllers\Accounting\Piutang\BKMNoPenagihanController@BKMNoPenagihan');

    Route::resource('CreateBKM', App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\CreateBKMController::class);
    Route::get('detailtabelpelunasan2/{bulan}/{tahun}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\CreateBKMController@getTabelPelunasan');
    Route::get('detailkodeperkiraan/{kode}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\CreateBKMController@getKodePerkiraan');
    Route::get('detailjenisbankk/{idBank}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\CreateBKMController@getJenisBank');
    Route::get('tabeltampilbkm/{tanggalInputTampil}/{tanggalInputTampil2}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\CreateBKMController@getTabelTampilBKM');
    Route::get('getJenisBankCreateBKM/{idBank}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\CreateBKMController@getJenisBankCreateBKM');
    Route::post('insertUpdateCreateBKM', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\CreateBKMController@insertUpdateCreateBKM');
    Route::post('insertUpdateCreateBKM2', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\CreateBKMController@insertUpdateCreateBKM2');
    Route::get('getCetak/{idBKMInput}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\CreateBKMController@getCetak');

    Route::resource('UpdateDetailBKM', App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\UpdateDetailBKMController::class);
    Route::get('tabeldatapelunasan/{bulan}/{tahun}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\UpdateDetailBKMController@getTabelPelunasan');
    Route::get('cektabelpelunasan/{idPelunasan}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\UpdateDetailBKMController@cekTabelPelunasan');
    Route::get('tabeldetpelunasan/{idPelunasan}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\UpdateDetailBKMController@getTabelDetailPelunasan');
    Route::get('tabeldetkuranglebih/{idPelunasan}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\UpdateDetailBKMController@getTabelKurangLebih');
    Route::get('dettabelkuranglebih/{idPelunasan}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\UpdateDetailBKMController@getTabelKurangLebih');
    Route::get('dettabelbiaya/{idPelunasan}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\UpdateDetailBKMController@getTabelBiaya');
    Route::get('tabeltampilbkmcashadv/{tanggalInputTampil}/{tanggalInputTampil2}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\UpdateDetailBKMController@getTabelTampilBKM');
    Route::get('getCetakUpdateDetailBKM/{idBKMInput}', 'App\Http\Controllers\Accounting\Piutang\BKMCashAdvance\UpdateDetailBKMController@getCetakUpdateDetailBKM');

    Route::resource('BKMTransitorisBank', App\Http\Controllers\Accounting\Piutang\BKMTransitorisBankController::class);
    Route::get('getmatauang', 'App\Http\Controllers\Accounting\Piutang\BKMTransitorisBankController@getMataUang');
    Route::get('getbank', 'App\Http\Controllers\Accounting\Piutang\BKMTransitorisBankController@getBank');
    Route::get('getjenispembayaran', 'App\Http\Controllers\Accounting\Piutang\BKMTransitorisBankController@getJenisPembayaran');
    Route::get('getkodeperkiraan', 'App\Http\Controllers\Accounting\Piutang\BKMTransitorisBankController@getKodePerkiraan');
    Route::get('getidbkk/{idBank}/{tanggal}', 'App\Http\Controllers\Accounting\Piutang\BKMTransitorisBankController@getUraianEnter');
    Route::get('getidbkmtransitoris/{idBank}/{tanggal}', 'App\Http\Controllers\Accounting\Piutang\BKMTransitorisBankController@getUraianEnterBKM');
    Route::get('tabeltampilbkmtransitoris/{tanggalInputTampilBKM}/{tanggalInputTampilBKM2}', 'App\Http\Controllers\Accounting\Piutang\BKMTransitorisBankController@getTabelTampilBKM');
    Route::get('tabeltampilbkktransitoris/{tanggalInputTampilBKK}/{tanggalInputTampilBKK2}', 'App\Http\Controllers\Accounting\Piutang\BKMTransitorisBankController@getTabelTampilBKK');

    Route::resource('BatalBKMTransitoris', App\Http\Controllers\Accounting\Piutang\BatalBKMTransitorisController::class);
    Route::get('getIdBKMBatal3/{bulanTahun}', 'App\Http\Controllers\Accounting\Piutang\BatalBKMTransitorisController@getIdBKM3');
    Route::get('getIdBKMBatal4/{bulanTahun}', 'App\Http\Controllers\Accounting\Piutang\BatalBKMTransitorisController@getIdBKM4');
    Route::get('getDataBatalBKM/{idBKM}', 'App\Http\Controllers\Accounting\Piutang\BatalBKMTransitorisController@getDataBKM');
    Route::get('cekBatalBKK/{idBKM}', 'App\Http\Controllers\Accounting\Piutang\BatalBKMTransitorisController@cekBatalBKK');
    Route::delete('deletedata/{idBKM}/{alasan}', 'App\Http\Controllers\Accounting\Piutang\BatalBKMTransitorisController@hapus');

    Route::resource('MaintenanceBKMxBKKPembulatan', BKMBKKPembulatanController::class);
    Route::get('tabeldetailbkmbkk/{bulan}/{tahun}', 'App\Http\Controllers\Accounting\Piutang\BKMBKKPembulatanController@getTabelPelunasan');
    Route::get('tabeldetbiayabkmbkk/{idBKM}', 'App\Http\Controllers\Accounting\Piutang\BKMBKKPembulatanController@getTabelDetailBiaya');
    Route::get('getBankPembulatan', 'App\Http\Controllers\Accounting\Piutang\BKMBKKPembulatanController@getBankPembulatan');
    Route::get('getJenisBankPembulatan/{idBank}', 'App\Http\Controllers\Accounting\Piutang\BKMBKKPembulatanController@getJenisBankPembulatan');
    Route::get('getIDBKK/{idBank}/{tanggal}', 'App\Http\Controllers\Accounting\Piutang\BKMBKKPembulatanController@getIDBKK');
    Route::get('getTabelTampilBKKPembulatan/{tanggalInputTampilBKK}/{tanggalInputTampilBKK2}', 'App\Http\Controllers\Accounting\Piutang\BKMBKKPembulatanController@getTabelTampilBKKPembulatan');
    Route::post('insertUpdate', 'App\Http\Controllers\Accounting\Piutang\BKMBKKPembulatanController@insertUpdate');
    Route::get('getCetakBKMBKKPembulatan/{idBKKTampil}', 'App\Http\Controllers\Accounting\Piutang\BKMBKKPembulatanController@getCetakBKMBKKPembulatan');

    Route::resource('MaintenanceBKMUntukDPPelunasan', BKMDPPelunasanController::class);
    Route::get('getcust/', 'App\Http\Controllers\Accounting\Piutang\BKMDPPelunasanController@getNamaCustomer');
    Route::get('getTabelPelunasanBKMDP/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\BKMDPPelunasanController@getTabelDataPelunasan');
    Route::get('getidbkmBKMDP/{idBank}/{tanggal}', 'App\Http\Controllers\Accounting\Piutang\BKMDPPelunasanController@getUraianEnterBKM');
    Route::get('getTabelTampilBKMDP/{tanggalTampilBKM}/{tanggalTampilBKM2}', 'App\Http\Controllers\Accounting\Piutang\BKMDPPelunasanController@getTabelTampilBKM');
    Route::get('getTabelTampilBKKDP/{tanggalTampilBKK}/{tanggalTampilBKK2}', 'App\Http\Controllers\Accounting\Piutang\BKMDPPelunasanController@getTabelTampilBKK');
    Route::get('getidbkmBKMDP/{idBank}/{tanggal}', 'App\Http\Controllers\Accounting\Piutang\BKMDPPelunasanController@getUraianEnterBKM');
    Route::get('getIdPembayaran', 'App\Http\Controllers\Accounting\Piutang\BKMDPPelunasanController@getIdPembayaran');
    Route::get('getIdPelunasan', 'App\Http\Controllers\Accounting\Piutang\BKMDPPelunasanController@getIdPelunasan');
    Route::get('getidbkmBKKDP/{idBankBKK}/{tanggal}', 'App\Http\Controllers\Accounting\Piutang\BKMDPPelunasanController@getUraianEnterBKK');

    Route::resource('MaintenanceBKMxBKKNotaKredit', BKMBKKNotaKreditController::class);
    Route::get('getmatauang', 'App\Http\Controllers\Accounting\Piutang\BKMBKKNotaKreditController@getMataUang');
    Route::get('getDataNotaKredit', 'App\Http\Controllers\Accounting\Piutang\BKMBKKNotaKreditController@getDataNotaKredit');
    // Route::get('getUraianEnterBKM/{idBank}/{tanggal}', 'App\Http\Controllers\Accounting\Piutang\BKMBKKNotaKreditController@getUraianEnterBKM');
    Route::get('getidBKKNota/{idBank}/{tanggal}', 'App\Http\Controllers\Accounting\Piutang\BKMBKKNotaKreditController@getUraianEnterBKK');
    Route::get('getTabelTampilBKKNota/{tanggalTampilBKK}/{tanggalTampilBKK2}', 'App\Http\Controllers\Accounting\Piutang\BKMBKKNotaKreditController@getTabelTampilBKK');
    Route::get('getTabelTampilBKMNota/{tanggalTampilBKM}/{tanggalTampilBKM2}', 'App\Http\Controllers\Accounting\Piutang\BKMBKKNotaKreditController@getTabelTampilBKM');
    Route::get('getIdPelunasanNota', 'App\Http\Controllers\Accounting\Piutang\BKMBKKNotaKreditController@getIdPelunasan');
    Route::get('getIdPembayaranNota', 'App\Http\Controllers\Accounting\Piutang\BKMBKKNotaKreditController@getIdPembayaran');
    Route::get('getCetakBKMBKKNotaKredit/{idBKMTampil}', 'App\Http\Controllers\Accounting\Piutang\BKMBKKNotaKreditController@getCetakBKMBKKNotaKredit');

    Route::resource('BKMLC', App\Http\Controllers\Accounting\Piutang\BKMLCController::class);
    Route::get('getListPelunasanDollar/{bulan}/{tahun}', 'App\Http\Controllers\Accounting\Piutang\BKMLCController@getListPelunasanDollar');

    Route::resource('BKMPengembalianKE', App\Http\Controllers\Accounting\Piutang\BKMPengembalianKEController::class);
    Route::get('getcustomer/', 'App\Http\Controllers\Accounting\Piutang\BKMPengembalianKEController@getNamaCustomer');
    Route::get('getjenispembayaran', 'App\Http\Controllers\Accounting\Piutang\BKMPengembalianKEController@getJenisPembayaran');
    Route::get('getidbkmke/{idBank}/{tanggalInput}', 'App\Http\Controllers\Accounting\Piutang\BKMPengembalianKEController@getUraianBKMEnter');
    Route::get('getidbkkke/{idBank}/{tanggalInput}', 'App\Http\Controllers\Accounting\Piutang\BKMPengembalianKEController@getUraianBKKEnter');
    Route::get('getTabelTampilBKMKE/{tanggalTampilBKM}/{tanggalTampilBKM2}', 'App\Http\Controllers\Accounting\Piutang\BKMPengembalianKEController@getTabelTampilBKM');
    Route::get('getTabelTampilBKKKE/{tanggalTampilBKK}/{tanggalTampilBKK2}', 'App\Http\Controllers\Accounting\Piutang\BKMPengembalianKEController@getTabelTampilBKK');
    Route::get('getIdPembayaranKE', 'App\Http\Controllers\Accounting\Piutang\BKMPengembalianKEController@getIdPembayaran');
    Route::get('getCetakPengembalianKE/{idBKMTampil}', 'App\Http\Controllers\Accounting\Piutang\BKMPengembalianKEController@getCetakPengembalianKE');

    Route::resource('MaintenanceUpdateKursBKM', UpdateKursBKMController::class);

    Route::resource('MaintenanceKodePerkiraanBKM', App\Http\Controllers\Accounting\Piutang\KodePerkiraanBKMController::class);
    Route::get('getIdBKMBatal5/{BlnThn}', 'App\Http\Controllers\Accounting\Piutang\KodePerkiraanBKMController@getIdBKM5');
    Route::get('getIdBKMBatal6/{BlnThn}', 'App\Http\Controllers\Accounting\Piutang\KodePerkiraanBKMController@getIdBKM6');
    Route::get('getlistrincian/{idBKM}', 'App\Http\Controllers\Accounting\Piutang\KodePerkiraanBKMController@getTabelRincian');

    Route::resource('MaintenanceInformasiBank', App\Http\Controllers\Accounting\Piutang\InformasiBank\MaintenanceInformasiBankController::class);
    Route::get('getTabelInformasiBank/{tanggal}', 'App\Http\Controllers\Accounting\Piutang\InformasiBank\MaintenanceInformasiBankController@getTabelInfoBank');

    Route::resource('AnalisaInformasiBank', App\Http\Controllers\Accounting\Piutang\InformasiBank\AnalisaInformasiBankController::class);
    Route::get('getTabelAnalisis/{tanggal}/{tanggal2}/{radiogrup}', 'App\Http\Controllers\Accounting\Piutang\InformasiBank\AnalisaInformasiBankController@getTabelAnalisis');

    Route::resource('FakturUangMuka', App\Http\Controllers\Accounting\Piutang\PenjualanLokal\FakturUangMukaController::class);
    Route::get('getNoPenagihan/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\FakturUangMukaController@getNoPenagihan');
    Route::get('getJenisCustomer/{idJenisCustomer}', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\FakturUangMukaController@getJenisCustomer');
    Route::get('getAlamatCust/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\FakturUangMukaController@getAlamatCust');
    Route::get('getNoSP/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\FakturUangMukaController@getNomorSP');
    Route::get('getNomorPO/{noSP}', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\FakturUangMukaController@getNomorPO');
    Route::get('getUserPenagih', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\FakturUangMukaController@getUserPenagih');
    Route::get('getJenisPajak', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\FakturUangMukaController@getJenisPajak');
    Route::get('getDokumen/{kode}', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\FakturUangMukaController@getDokumen');
    Route::get('DataPenagihanF/{IdPenagihan}', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\FakturUangMukaController@getDataPenagihan');

    Route::resource('PenagihanPenjualanLokal', App\Http\Controllers\Accounting\Piutang\PenjualanLokal\PenagihanPenjualanController::class);
    Route::get('getCustomerr', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\PenagihanPenjualanController@getCustomer');
    Route::get('getCustomer', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\PenagihanPenjualanController@getCustomerKoreksi');
    Route::get('getNoPenagihanUM/{noSP}', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\PenagihanPenjualanController@getNoPenagihanUM');
    Route::get('getSuratJalan/{noSP}', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\PenagihanPenjualanController@getSuratJalan');
    Route::get('getNoPenagihanPenjualan/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\PenagihanPenjualanController@getNoPenagihan');
    Route::get('DataPenagihanPenjualan/{IdPenagihan}', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\PenagihanPenjualanController@getDataPenagihan');
    Route::get('LihatPenagihan/{idJenisPajak}/{IdPenagihan}', 'App\Http\Controllers\Accounting\Piutang\PenjualanLokal\PenagihanPenjualanController@LihatPenagihan');

    Route::resource('MaintenanceNotaPenjualanTunai', App\Http\Controllers\Accounting\Piutang\NotaPenjualanTunaiController::class);
    Route::get('getLihatPesanan/{noSP}', 'App\Http\Controllers\Accounting\Piutang\NotaPenjualanTunaiController@getLihatPesanan');
    Route::get('getNotaJualTunai/{noSP}', 'App\Http\Controllers\Accounting\Piutang\NotaPenjualanTunaiController@getNotaJualTunai');
    Route::get('getNotaJualTunai2/{noSP}', 'App\Http\Controllers\Accounting\Piutang\NotaPenjualanTunaiController@getNotaJualTunai2');
    Route::get('getUserPenagihNota', 'App\Http\Controllers\Accounting\Piutang\NotaPenjualanTunaiController@getUserPenagihNota');
    Route::get('getJenisPajakNota', 'App\Http\Controllers\Accounting\Piutang\NotaPenjualanTunaiController@getJenisPajakNota');
    Route::get('getNoPenagihanUMNota/{noSP}', 'App\Http\Controllers\Accounting\Piutang\NotaPenjualanTunaiController@getNoPenagihanUMNota');
    Route::get('getNoPenagihanNota', 'App\Http\Controllers\Accounting\Piutang\NotaPenjualanTunaiController@getNoPenagihan');
    Route::get('getJenisCust/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\NotaPenjualanTunaiController@getJenisCust');
    Route::get('getJnsCust/{idJenisCustomer}', 'App\Http\Controllers\Accounting\Piutang\NotaPenjualanTunaiController@getJnsCust');
    Route::get('getLihatSP/{idNoPenagihan}', 'App\Http\Controllers\Accounting\Piutang\NotaPenjualanTunaiController@getLihatSP');
    Route::get('getDataSP/{noSP}', 'App\Http\Controllers\Accounting\Piutang\NotaPenjualanTunaiController@getDataSP');
    Route::get('getLihatPenagihan/{idNoPenagihan}', 'App\Http\Controllers\Accounting\Piutang\NotaPenjualanTunaiController@getLihatPenagihan');

    Route::resource('UpdateSuratJalanUntukJualTunai', App\Http\Controllers\Accounting\Piutang\UpdateSuratJalanController::class);
    Route::get('getTabelSuratJalan', 'App\Http\Controllers\Accounting\Piutang\UpdateSuratJalanController@getTabelSuratJalan');

    Route::resource('ACCPenagihanPenjualan', App\Http\Controllers\Accounting\Piutang\ACCPenagihanPenjualanController::class);
    Route::get('getDisplayHeader', 'App\Http\Controllers\Accounting\Piutang\ACCPenagihanPenjualanController@getDisplayHeader');
    Route::get('getDisplayDetail/{idPenagihan}', 'App\Http\Controllers\Accounting\Piutang\ACCPenagihanPenjualanController@getDisplayDetail');
    Route::get('getDisplaySuratJalan/{idPenagihan}', 'App\Http\Controllers\Accounting\Piutang\ACCPenagihanPenjualanController@getDisplaySuratJalan');
    Route::get('accCheckCtkSJ/{idPenagihan}', 'App\Http\Controllers\Accounting\Piutang\ACCPenagihanPenjualanController@accCheckCtkSJ');
    Route::get('accCheckCtkSP/{idPenagihan}', 'App\Http\Controllers\Accounting\Piutang\ACCPenagihanPenjualanController@accCheckCtkSP');

    Route::resource('StatusDokumenTagihan', App\Http\Controllers\Accounting\Piutang\StatusDokumenTagihanController::class);
    Route::get('getCust', 'App\Http\Controllers\Accounting\Piutang\StatusDokumenTagihanController@getCust');
    Route::get('getTabelStatusDokumen/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\StatusDokumenTagihanController@getTabelStatusDokumen');
    Route::get('getDataStatusDokumen', 'App\Http\Controllers\Accounting\Piutang\StatusDokumenTagihanController@getDataStatusDokumen');

    Route::resource('ACCPenagihanPenjualanEksport', App\Http\Controllers\Accounting\Piutang\ACCPenagihanPenjualanExportController::class);
    Route::get('getTabelPenagihanEx', 'App\Http\Controllers\Accounting\Piutang\ACCPenagihanPenjualanExportController@getTabelPenagihanEx');
    Route::get('getDetailPenagihanEx/{idPenagihan}', 'App\Http\Controllers\Accounting\Piutang\ACCPenagihanPenjualanExportController@getDetailPenagihanEx');

    Route::resource('PenagihanPenjualanEksport', App\Http\Controllers\Accounting\Piutang\PenagihanPenjualanExportController::class);
    Route::get('getCustomerEx', 'App\Http\Controllers\Accounting\Piutang\PenagihanPenjualanExportController@getCustomerEx');
    Route::get('getSuratJalanEx/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\PenagihanPenjualanExportController@getSuratJalanEx');

    Route::resource('MaintenancePelunasanPenjualan', App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController::class);
    Route::get('getCustIsi', 'App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController@getCustIsi');
    Route::get('getCustKoreksi', 'App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController@getCustKoreksi');
    Route::get('getJenisPembayaran', 'App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController@getJenisPembayaran');
    Route::get('getReferensiBank/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController@getReferensiBank');
    Route::get('getDataRefBank/{idReferensi}', 'App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController@getDataRefBank');
    Route::get('getListPenagihanSJ/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController@getListPenagihanSJ');
    Route::get('getListPelunasanTagihan/{noPen}', 'App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController@getListPelunasanTagihan');
    Route::get('getKdPerkiraan', 'App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController@getKdPerkiraan');
    Route::get('getListPelunasan/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController@getListPelunasan');
    Route::get('getDataPelunasanTagihan/{IdPelunasan}', 'App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController@getDataPelunasanTagihan');
    Route::get('LihatDetailPelunasan/{IdPelunasan}', 'App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController@LihatDetailPelunasan');
    Route::get('getCekReferensiPelunasan/{IdPelunasan}', 'App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController@getCekReferensiPelunasan');

    Route::resource('PelunasanPenjualanCashAdvance', App\Http\Controllers\Accounting\Piutang\PelunasanPenjualanCashAdvanceController::class);
    Route::get('getCustIsiCashAdvance', 'App\Http\Controllers\Accounting\Piutang\PelunasanPenjualanCashAdvanceController@getCustIsiCashAdvance');
    Route::get('getNoPelunasanCashAdvance/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\PelunasanPenjualanCashAdvanceController@getNoPelunasanCashAdvance');
    Route::get('LihatHeaderPelunasanCashAdvance/{noPelunasan}', 'App\Http\Controllers\Accounting\Piutang\PelunasanPenjualanCashAdvanceController@LihatHeaderPelunasanCashAdvance');
    Route::get('LihatDetailPelunasanCashAdvance/{noPelunasan}', 'App\Http\Controllers\Accounting\Piutang\PelunasanPenjualanCashAdvanceController@LihatDetailPelunasanCashAdvance');
    Route::get('getLihat_PenagihanCashAdvance/{noPen}', 'App\Http\Controllers\Accounting\Piutang\PelunasanPenjualanCashAdvanceController@getLihat_PenagihanCashAdvance');
    Route::get('getLihat_PenagihanCashAdvance2/{noPen}', 'App\Http\Controllers\Accounting\Piutang\PelunasanPenjualanCashAdvanceController@getLihat_PenagihanCashAdvance2');
    Route::get('getNoPenagihanCashAdvance/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\MaintenancePelunasanPenjualanController@getListPenagihanSJ');

    Route::resource('AnalisaStatusPelunasan', App\Http\Controllers\Accounting\Piutang\AnalisaStatusPenjualanController::class);
    Route::get('getDisplaySuratJalan/{tanggal}/{tanggal2}', 'App\Http\Controllers\Accounting\Piutang\AnalisaStatusPenjualanController@getDisplaySuratJalan');

    Route::resource('NotaKreditRetur', App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit\NotaKreditReturController::class);
    Route::get('getCustNotaKredit', 'App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit\NotaKreditReturController@getCustNotaKredit');
    Route::get('getListSJNotaKredit/{idCustomer}', 'App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit\NotaKreditReturController@getListSJNotaKredit');
    Route::get('getLihat_PenagihanNotaKredit/{idCustomer}/{MIdRetur}', 'App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit\NotaKreditReturController@getLihat_PenagihanNotaKredit');

    Route::resource('PotHarga', App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit\PotHargaController::class);
    Route::resource('Free', App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit\FreeController::class);

    Route::resource('KelebihanBayarUntukJualTunai', App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit\KelebihanBayarJualTunaiController::class); //Kode 9 SP
    Route::get('getCustKelebihanBayar', 'App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit\KelebihanBayarJualTunaiController@getCustKelebihanBayar');
    Route::get('getListNotaKreditKelebihanBayar', 'App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit\KelebihanBayarJualTunaiController@getListNotaKreditKelebihanBayar');

    Route::resource('SelisihTimbang', App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit\SelisihTimbangController::class); //Kode 9 SP
    // Route::get('SelisihTimbang', 'App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit\SelisihTimbangController@SelisihTimbang');

    Route::resource('ACCNotaKredit', App\Http\Controllers\Accounting\Piutang\ACCNotaKreditController::class);

    Route::get('getTabelHeaderACCNotaKredit', 'App\Http\Controllers\Accounting\Piutang\ACCNotaKreditController@getTabelHeaderACCNotaKredit');
    Route::get('getDetailHeaderACCNotaKredit/{idNotaKredit}', 'App\Http\Controllers\Accounting\Piutang\ACCNotaKreditController@getDetailHeaderACCNotaKredit');
    Route::get('getDetailHeaderACCNotaKredit2/{idNotaKredit}', 'App\Http\Controllers\Accounting\Piutang\ACCNotaKreditController@getDetailHeaderACCNotaKredit2');

    Route::resource('Pengajuan', App\Http\Controllers\Accounting\Piutang\MaintenanceBKKNotaKredit\PengajuanController::class); //sp bank gaada
    Route::get('loadDataNotaK', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKKNotaKredit\PengajuanController@loadDataNotaK');
    Route::get('getJenisBayarPenagajuan', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKKNotaKredit\PengajuanController@getJenisBayarPenagajuan');
    Route::get('getBankPengajuan', 'App\Http\Controllers\Accounting\Piutang\MaintenanceBKKNotaKredit\PengajuanController@getBankPengajuan');

    Route::resource('BKK', App\Http\Controllers\Accounting\TransBank\BKKController::class);
    Route::resource('BKM', App\Http\Controllers\Accounting\TransBank\BKMController::class);
    // Route::get('BKM', 'App\Http\Controllers\Accounting\TransBank\BKMController@BKM');

    // Route::get('CekNotadanFaktur', 'App\Http\Controllers\Accounting\Informasi\CekNotadanFakturController@CekNotadanFaktur');

    Route::resource('CetakNotaKredit', App\Http\Controllers\Accounting\Informasi\CetakNotaKreditController::class);
    Route::get('getListCetakNotaKredit/{tanggal}', 'App\Http\Controllers\Accounting\Informasi\CetakNotaKreditController@getListCetakNotaKredit');
    Route::get('getIdSuratJalanNotaKredit/{notaKredit}', 'App\Http\Controllers\Accounting\Informasi\CetakNotaKreditController@getIdSuratJalanNotaKredit');
    Route::get('getDisplayDetailNotaKredit/{notaKredit}', 'App\Http\Controllers\Accounting\Informasi\CetakNotaKreditController@getDisplayDetailNotaKredit');
    Route::get('getSFilter1/{notaKredit}', 'App\Http\Controllers\Accounting\Informasi\CetakNotaKreditController@getSFilter1');
    Route::get('getSFilter2/{notaKredit}', 'App\Http\Controllers\Accounting\Informasi\CetakNotaKreditController@getSFilter2');
    Route::get('getSFilter3/{notaKredit}', 'App\Http\Controllers\Accounting\Informasi\CetakNotaKreditController@getSFilter3');
    Route::get('getSFilter4/{notaKredit}', 'App\Http\Controllers\Accounting\Informasi\CetakNotaKreditController@getSFilter4');

    Route::resource('Soplang', App\Http\Controllers\Accounting\Informasi\SoplangController::class);

    Route::resource('RekapPiutang', App\Http\Controllers\Accounting\Informasi\RekapPiutangController::class);
    Route::get('getCekRekPiutang/{tglAkhirLaporan}', 'App\Http\Controllers\Accounting\Informasi\RekapPiutangController@getCekRekPiutang');

    Route::resource('KartuHutang', App\Http\Controllers\Accounting\Informasi\KartuHutangController::class);
    Route::get('KartuHutang', 'App\Http\Controllers\Accounting\Informasi\KartuHutangController@KartuHutang');

    Route::resource('CetakNotaDanFaktur', CetakNotaDanFakturController::class);
    Route::resource('CetakNotaKredit', CetakNotaKreditController::class);
    #endregion

    #region Multiple Program PermohonanKonversiBarcodeJBBPotongController
    Route::get('KonversiRollBarcode/getDataPermohonan/{id}', [App\Http\Controllers\MultipleProgram\KonversiRollBarcodeController::class, 'getDataPermohonan']);
    Route::resource('KonversiRollBarcode', App\Http\Controllers\MultipleProgram\KonversiRollBarcodeController::class)->except(['create']);
    Route::get('KonversiSetengahJadi/getDataPermohonan/{id}', [App\Http\Controllers\MultipleProgram\KonversiSetengahJadiController::class, 'getDataPermohonan']);
    Route::resource('KonversiSetengahJadi', App\Http\Controllers\MultipleProgram\KonversiSetengahJadiController::class);
    #endregion

    #region Circular B
    Route::get('CircularB', 'App\Http\Controllers\HomeController@CircularB');
    Route::resource('HapusHistoryB', App\Http\Controllers\CircularB\HapusHistoryB::class);
    Route::resource('TransferHasilMeterB', App\Http\Controllers\CircularB\TransferHasilMeterBController::class);
    Route::resource('MaintenanceJamGangguanB', App\Http\Controllers\CircularB\MaintenanceJamGangguanBController::class);
    Route::resource('GantiRPMShutleB', App\Http\Controllers\CircularB\GantiRPMShutleBController::class);
    Route::resource('GantiNamaKaryawanB', App\Http\Controllers\CircularB\GantiNamaKaryawanBController::class);
    Route::resource('GantiIdOrderB', App\Http\Controllers\CircularB\GantiIdOrderBController::class);
    Route::resource('HapusKegiatanMesinB', App\Http\Controllers\CircularB\HapusKegiatanMesinBController::class);
    Route::resource('JamKerjaB', App\Http\Controllers\CircularB\JamKerjaBController::class);
    Route::resource('HistorySalahB', App\Http\Controllers\CircularB\HistorySalahBController::class);
    Route::resource('ProsesAfalanB', App\Http\Controllers\CircularB\ProsesAfalanBController::class);
    Route::resource('AfalanKarungB', App\Http\Controllers\CircularB\AfalanKarungBController::class);

    Route::get('/informasiB/{form_name}', [App\Http\Controllers\CircularB\InformasiCircularBController::class, 'index'])->name('informasiB.index');
    Route::get('/informasiB/show/{id}', [App\Http\Controllers\CircularB\InformasiCircularBController::class, 'show'])->name('informasiB.show');
    Route::get('/sp-informasiB/{sp_str}/{sp_data?}', [App\Http\Controllers\CircularB\InformasiCircularBController::class, 'spInformasi']);
    Route::post('/data-table/get-history-cirB', [App\Http\Controllers\CircularB\InformasiCircularBController::class, 'getLaporanHistory']);
    Route::resource('HasilMeterB', App\Http\Controllers\Circular\HasilMeterController::class);
    Route::resource('JamPanenB', App\Http\Controllers\CircularB\JamPanenBController::class);
    Route::resource('EffisiensiB', App\Http\Controllers\CircularB\EffisiensiBController::class);
    Route::resource('EffRataPeriodeB', App\Http\Controllers\CircularB\EffRataPeriodeBController::class);
    Route::get('/getMesinSelectCirB/{idTypeMesin}', [App\Http\Controllers\CircularB\EffRataPeriodeBController::class, 'getMesinSelect']);
    Route::resource('PenyelesaianMesinB', App\Http\Controllers\CircularB\PenyelesaianMesinBController::class);

    Route::get('/masterB/{form_name}', [App\Http\Controllers\CircularB\MasterCircularGedungBController::class, 'index'])->name('masterB.index');
    Route::post('/proses-mesinB', [App\Http\Controllers\CircularB\MasterCircularGedungBController::class, 'prosesMesin']);
    Route::get('/sp-mesinB/{sp_str}/{sp_data?}', [App\Http\Controllers\CircularB\MasterCircularGedungBController::class, 'spMesin']);
    Route::resource('MaintenanceJenisGangguanB', App\Http\Controllers\CircularB\MaintenanceJenisGangguanController::class);

    Route::get('/orderB/{form_name}', [App\Http\Controllers\CircularB\OrderCircularGedungBController::class, 'index'])->name('orderB.index');
    Route::get('/orderB/show/{id}', [App\Http\Controllers\CircularB\OrderCircularGedungBController::class, 'show'])->name('orderB.show');
    Route::post('/orderB/store', [App\Http\Controllers\CircularB\OrderCircularGedungBController::class, 'store'])->name('orderB.store');
    Route::post('/proses-orderB', [App\Http\Controllers\CircularB\OrderCircularGedungBController::class, 'prosesOrder']);
    Route::get('/sp-orderB/{sp_str}/{sp_data?}', [App\Http\Controllers\CircularB\OrderCircularGedungBController::class, 'spOrder']);

    //Form Kegiatan Mesin
    Route::get('/paginationB/get-mesin-order', [App\Http\Controllers\CircularB\OrderCircularGedungBController::class, 'getMesinOrder']);
    Route::get('/paginationB/get-pegawai', [App\Http\Controllers\CircularB\OrderCircularGedungBController::class, 'getDaftarPegawai']);
    Route::get('/paginationB/get-log-mesin', [App\Http\Controllers\CircularB\OrderCircularGedungBController::class, 'getLogMesin']);

    //Form Order Master
    Route::get('/paginationB/get-id-order', [App\Http\Controllers\CircularB\OrderCircularGedungBController::class, 'getIdOrder']); // juga dipakai pada formOrderStop
    Route::get('/paginationB/get-barang', [App\Http\Controllers\CircularB\OrderCircularGedungBController::class, 'getBarang']);
    Route::get('/paginationB/get-benang-warp', [App\Http\Controllers\CircularB\OrderCircularGedungBController::class, 'getBenangWarp']);
    Route::get('/paginationB/get-benang-strip', [App\Http\Controllers\CircularB\OrderCircularGedungBController::class, 'getBenangStrip']);

    Route::resource('HasilMeterB', App\Http\Controllers\CircularB\HasilMeterBController::class);
    #endregion

    #region Circular D
    Route::get('CircularD', 'App\Http\Controllers\HomeController@CircularD');

    Route::get('/masterD/{form_name}', [App\Http\Controllers\CircularD\MasterCircularGedungDController::class, 'index'])->name('masterD.index');
    Route::post('/proses-mesinD', [App\Http\Controllers\CircularD\MasterCircularGedungDController::class, 'prosesMesin']);
    Route::get('/sp-mesinD/{sp_str}/{sp_data?}', [App\Http\Controllers\CircularD\MasterCircularGedungDController::class, 'spMesin']);
    Route::resource('MaintenanceJenisGangguanD', App\Http\Controllers\CircularD\MaintenanceJenisGangguanDController::class);
    Route::resource('ProsesAfalanD', App\Http\Controllers\CircularD\ProsesAfalanDController::class);
    Route::resource('AfalanKarungD', App\Http\Controllers\CircularD\AfalanKarungDController::class);
    Route::resource('EffRataPeriodeD', App\Http\Controllers\CircularD\EffRataPeriodeDController::class);
    Route::get('/getMesinSelectCirD/{idTypeMesin}', [App\Http\Controllers\CircularD\EffRataPeriodeDController::class, 'getMesinSelect']);
    Route::resource('MaintenanceJamGangguanD', App\Http\Controllers\CircularD\MaintenanceJamGangguanDController::class);
    Route::resource('TransferHasilMeterD', App\Http\Controllers\CircularD\TransferHasilMeterDController::class);

    Route::get('/informasiD/{form_name}', [App\Http\Controllers\CircularD\InformasiCircularDController::class, 'index'])->name('informasiD.index');
    Route::get('/informasiD/show/{id}', [App\Http\Controllers\CircularD\InformasiCircularDController::class, 'show'])->name('informasiD.show');
    Route::get('/sp-informasiD/{sp_str}/{sp_data?}', [App\Http\Controllers\CircularD\InformasiCircularDController::class, 'spInformasi']);
    Route::post('/data-table/get-history-cirD', [App\Http\Controllers\CircularD\InformasiCircularDController::class, 'getLaporanHistory']);
    Route::resource('JamPanenD', App\Http\Controllers\CircularD\JamPanenDController::class);
    Route::resource('EffisiensiD', App\Http\Controllers\CircularD\EffisiensiDController::class);
    Route::resource('PenyelesaianMesinD', App\Http\Controllers\CircularD\PenyelesaianMesinDController::class);

    Route::get('/orderD/{form_name}', [App\Http\Controllers\CircularD\OrderCircularGedungDController::class, 'index'])->name('orderD.index');
    Route::get('/orderD/show/{id}', [App\Http\Controllers\CircularD\OrderCircularGedungDController::class, 'show'])->name('orderD.show');
    Route::post('/orderD/store', [App\Http\Controllers\CircularD\OrderCircularGedungDController::class, 'store'])->name('orderD.store');
    Route::post('/proses-orderD', [App\Http\Controllers\CircularD\OrderCircularGedungDController::class, 'prosesOrder']);
    Route::get('/sp-orderD/{sp_str}/{sp_data?}', [App\Http\Controllers\CircularD\OrderCircularGedungDController::class, 'spOrder']);

    Route::resource('GantiIdOrderD', App\Http\Controllers\CircularD\GantiIdOrderDController::class);
    Route::resource('GantiNamaKaryawanD', App\Http\Controllers\CircularD\GantiNamaKaryawanDController::class);
    Route::resource('GantiRPMShutleD', App\Http\Controllers\CircularD\GantiRPMShutleDController::class);
    Route::resource('HapusHistoryD', App\Http\Controllers\CircularD\HapusHistoryDController::class);
    Route::resource('HapusKegiatanMesinD', App\Http\Controllers\CircularD\HapusKegiatanMesinDController::class);
    Route::resource('HistorySalahD', App\Http\Controllers\CircularD\HistorySalahDController::class);
    Route::resource('JamKerjaD', App\Http\Controllers\CircularD\JamKerjaDController::class);

    //Form Kegiatan Mesin
    Route::get('/paginationD/get-mesin-order', [App\Http\Controllers\CircularD\OrderCircularGedungDController::class, 'getMesinOrder']);
    Route::get('/paginationD/get-pegawai', [App\Http\Controllers\CircularD\OrderCircularGedungDController::class, 'getDaftarPegawai']);
    Route::get('/paginationD/get-log-mesin', [App\Http\Controllers\CircularD\OrderCircularGedungDController::class, 'getLogMesin']);

    //Form Order Master
    Route::get('/paginationD/get-id-order', [App\Http\Controllers\CircularD\OrderCircularGedungDController::class, 'getIdOrder']); // juga dipakai pada formOrderStop
    Route::get('/paginationD/get-barang', [App\Http\Controllers\CircularD\OrderCircularGedungDController::class, 'getBarang']);
    Route::get('/paginationD/get-benang-warp', [App\Http\Controllers\CircularD\OrderCircularGedungDController::class, 'getBenangWarp']);
    Route::get('/paginationD/get-benang-strip', [App\Http\Controllers\CircularD\OrderCircularGedungDController::class, 'getBenangStrip']);

    Route::resource('HasilMeterD', App\Http\Controllers\CircularD\HasilMeterDController::class);
    #endregion

    #region Circular
    Route::get('Circular', 'App\Http\Controllers\HomeController@Circular');

    Route::resource('MaintenanceLogSparepartMesin', App\Http\Controllers\Circular\MaintenanceLogSparepartMesinController::class);
    Route::resource('MaintenanceAllJenisSparepart', App\Http\Controllers\Circular\MaintenanceAllJenisSparepartController::class);
    Route::resource('MaintenanceSparepartPerMesin', App\Http\Controllers\Circular\MaintenanceSparepartPerMesinController::class);
    Route::resource('HapusHistory', App\Http\Controllers\Circular\HapusHistoryController::class);
    Route::resource('GantiRPMShutle', App\Http\Controllers\Circular\GantiRPMShutleController::class);
    Route::resource('GantiNamaKaryawan', App\Http\Controllers\Circular\GantiNamaKaryawanController::class);
    Route::resource('GantiIdOrder', App\Http\Controllers\Circular\GantiIdOrderController::class);
    Route::resource('HapusKegiatanMesin', App\Http\Controllers\Circular\HapusKegiatanMesinController::class);
    Route::resource('JamKerja', App\Http\Controllers\Circular\JamKerjaController::class);
    Route::resource('HistorySalah', App\Http\Controllers\Circular\HistorySalahController::class);
    Route::resource('TransferHasilMeter', App\Http\Controllers\Circular\TransferHasilMeterController::class);
    Route::resource('MaintenanceJamGangguan', App\Http\Controllers\Circular\MaintenanceJamGangguanController::class);
    Route::resource('AfalanBenang', App\Http\Controllers\Circular\AfalanBenangController::class);
    Route::resource('ProsesAfalan', App\Http\Controllers\Circular\ProsesAfalanController::class);
    Route::resource('AfalanKarung', App\Http\Controllers\Circular\AfalanKarungController::class);
    Route::resource('MaintenancePGU', App\Http\Controllers\Circular\MaintenancePemeriksaanGantiUkuranController::class);
    Route::resource('ACCGantiUkuran', App\Http\Controllers\Circular\ACCGantiUkuranController::class);

    Route::resource('Effisiensi', App\Http\Controllers\Circular\EffisiensiController::class);
    Route::resource('EffRataPeriode', App\Http\Controllers\Circular\EffRataPeriodeController::class);
    Route::get('/getMesinSelectCir/{idTypeMesin}', [App\Http\Controllers\Circular\EffRataPeriodeController::class, 'getMesinSelect']);

    Route::get('/master/{form_name}', [MasterCircularController::class, 'index'])->name('master.index');
    Route::post('/proses-mesin', [MasterCircularController::class, 'prosesMesin']);
    Route::get('/sp-mesin/{sp_str}/{sp_data?}', [MasterCircularController::class, 'spMesin']);
    Route::resource('MaintenanceJenisGangguan', App\Http\Controllers\Circular\MaintenanceJenisGangguanController::class);

    Route::get('/order/{form_name}', [OrderCircularController::class, 'index'])->name('order.index');
    Route::get('/order/show/{id}', [OrderCircularController::class, 'show'])->name('order.show');
    Route::post('/order/store', [OrderCircularController::class, 'store'])->name('order.store');
    Route::post('/proses-order', [OrderCircularController::class, 'prosesOrder']);
    Route::get('/sp-order/{sp_str}/{sp_data?}', [OrderCircularController::class, 'spOrder']);

    Route::get('/proses/{form_name}', [ProsesCircularController::class, 'index'])->name('proses.index');
    Route::get('/sp-proses/{sp_str}/{sp_data?}', [ProsesCircularController::class, 'spProses']);
    Route::get('/proses/formHasilMeter', [ProsesCircularController::class, 'index'])->name('proses.formHasilMeter');

    Route::get('/informasi/{form_name}', [InformasiCircularController::class, 'index'])->name('informasi.index');
    Route::get('/informasi/show/{id}', [InformasiCircularController::class, 'show'])->name('informasi.show');
    Route::get('/sp-informasi/{sp_str}/{sp_data?}', [InformasiCircularController::class, 'spInformasi']);
    Route::resource('HasilMeter', App\Http\Controllers\Circular\HasilMeterController::class);
    Route::resource('JamPanen', App\Http\Controllers\Circular\JamPanenController::class);
    Route::resource('PenyelesaianMesin', App\Http\Controllers\Circular\PenyelesaianMesinController::class);

    //Form Order Aktif
    Route::get('getOrderBaruSelect/', 'App\Http\Controllers\Circular\OrderCircularController@getOrderBaruSelect');
    Route::get('/pagination/get-mesin-aktif', [OrderCircularController::class, 'getMesinAktif']);
    Route::get('/pagination/get-order-baru', [OrderCircularController::class, 'getOrderBaru']);
    Route::post('/data-table/get-order-barang', [OrderCircularController::class, 'getOrderBarang']);
    Route::post('/data-table/get-mesin-order-barang', [OrderCircularController::class, 'get_Mesin_Order_Barang']);

    //Form Order Master
    Route::get('/pagination/get-id-order', [OrderCircularController::class, 'getIdOrder']); // juga dipakai pada formOrderStop
    Route::get('/pagination/get-barang', [OrderCircularController::class, 'getBarang']);
    Route::get('/pagination/get-benang-warp', [OrderCircularController::class, 'getBenangWarp']);
    Route::get('/pagination/get-benang-strip', [OrderCircularController::class, 'getBenangStrip']);

    //Form Kegiatan Mesin
    Route::get('/pagination/get-mesin-order', [OrderCircularController::class, 'getMesinOrder']);
    Route::get('/pagination/get-pegawai', [OrderCircularController::class, 'getDaftarPegawai']);
    Route::get('/pagination/get-log-mesin', [OrderCircularController::class, 'getLogMesin']);

    //Form Transfer Hasil Meter
    // Route::post('/hasil-konversi', [ProsesController::class, 'hasilKonversi']);
    // Route::post('/data-table/get-hasil-meter', [ProsesController::class, 'getHasilMeter']);
    // Route::get('/pagination/get-sub-kelompok', [ProsesController::class, 'getSubKelompok']);

    Route::get('/sp-informasi/SP_1273_CIR_CEK_MesinTidakAktif/{tgl_awal}/{tgl_akhir}', [InformasiCircularController::class, 'getMesinTidakAktif']);
    Route::post('/data-table/get-history-cir', [InformasiCircularController::class, 'getLaporanHistory']);

    //Form Job Assignment
    Route::post('/data-table/get-pending-order', [ProsesCircularController::class, 'getPendingOrder']);
    Route::post('/data-table/get-order-history', [ProsesCircularController::class, 'getOrderHistory']);
    Route::post('/saw-order/get-avg-kecepatan-group', [ProsesCircularController::class, 'getKecepatanGroup']);
    Route::post('/saw-mesin/get-avg-kecepatan-mesin', [ProsesCircularController::class, 'getKecepatanMesin']);
    Route::post('/saw-mesin/get-umur-mesin', [ProsesCircularController::class, 'getUmurMesin']);

    Route::get('/print/surat-perintah-kerja', function () {
        return view('transaksi.printJobAssignment');
    });

    #region Inventory
    Route::get('Inventory', 'App\Http\Controllers\HomeController@Inventory');
    Route::resource('AccKeluarPenjualan', KeluarBarangUntukPenjualanController::class);
    Route::resource('AccKonversiBarang', AccKonversiBarangController::class);
    Route::resource('AccMhnMasukKeluar', AccMhnMasukKeluarController::class);
    Route::resource('AccMhnPenerima', AccMhnPenerimaController::class);
    Route::resource('AccPascaKirim', PengembalianPascaPenjualanController::class);
    Route::resource('AccPemberiBarang', AccPemberiBarangController::class);
    Route::resource('AccPenghangusanBarang', AccPenghangusanBarangController::class);
    Route::resource('AccPenyesuaianBarang', AccPenyesuaianBarangController::class);
    Route::resource('AccPermohonanHibah', AccHibahController::class);
    Route::resource('AccReturPenjualan', ReturPenjualanController::class);
    Route::resource('AccSatuDivisi', AccSatuDivisiController::class);
    Route::resource('CariKodeBarang', CariKodeBarangController::class);
    Route::resource('KartuStok', KartuStokController::class);
    Route::resource('KodePerkiraan', KodePerkiraanController::class);
    Route::resource('KonversiBarang', KonversiBarangController::class);
    Route::get('getObjekSelect/{divisi}', 'App\Http\Controllers\Inventory\Transaksi\Konversi\KonversiBarangController@getObjekSelect');
    Route::get('getKelompokUtamaSelect/{objek}', 'App\Http\Controllers\Inventory\Transaksi\Konversi\KonversiBarangController@getKelompokUtamaSelect');
    Route::get('getKelompokSelect/{kelompokUtama}', 'App\Http\Controllers\Inventory\Transaksi\Konversi\KonversiBarangController@getKelompokSelect');
    Route::get('getSubKelompokSelect/{kelompok}', 'App\Http\Controllers\Inventory\Transaksi\Konversi\KonversiBarangController@getSubKelompokSelect');
    Route::get('getIdTypeSelect/{subKelompok}', 'App\Http\Controllers\Inventory\Transaksi\Konversi\KonversiBarangController@getIdTypeSelect');
    Route::get('getTypeABMSelect/{subKelompok}', 'App\Http\Controllers\Inventory\Transaksi\Konversi\KonversiBarangController@getTypeABMSelect');
    Route::get('getTypeCIRSelect', 'App\Http\Controllers\Inventory\Transaksi\Konversi\KonversiBarangController@getTypeCIRSelect');
    Route::resource('LacakTransaksi', LacakTransaksiController::class);
    Route::resource('ListDetailTransaksi', ListDetailTransaksiController::class);
    Route::resource('MaintenanceObjek', MaintenanceObjekController::class);
    Route::resource('MaintenanceType', MaintenanceTypeController::class);
    Route::resource('MhnMasukKeluar', MhnMasukKeluarController::class);
    Route::resource('MhnPemberi', MhnPemberiController::class);
    Route::resource('MhnPenerima', MhnPenerimaController::class);
    Route::resource('PemakaianGelondongan', PemakaianGelondonganController::class);
    Route::resource('PemberiBarang', PemberiBarangController::class);
    Route::resource('PemberiBarangAss', PemberiBarangAssController::class);
    Route::resource('PenerimaHibah', PenerimaHibahController::class);
    Route::resource('PenghangusanBarang', PenghangusanBarangController::class);
    Route::resource('PenyesuaianBarang', PenyesuaianBarangController::class);
    Route::resource('PermohonanHibah', PermohonanHibahController::class);
    Route::resource('PermohonanPenerima', PermohonanPenerimaController::class);
    Route::resource('PermohonanPenerimaBenang', PermohonanPenerimaBenangController::class);
    Route::resource('PermohonanSatuDivisi', PermohonanSatuDivisiController::class);
    Route::resource('StokBarang', StokBarangController::class);
    Route::resource('TerimaBenangGedungD', TerimaBenangGedungDController::class);
    Route::resource('TerimaBenangTropodo', TerimaBenangTropodoController::class);
    Route::resource('TerimaPurchasing', TerimaPurchasingController::class);
    Route::get('/TerimaPurchasing/downloadPdf/{no_po}', [TerimaPurchasingController::class, 'downloadPdf'])->name('TerimaPurchasing.downloadPdf');
    Route::resource('TransaksiBulanan', TransaksiBulananController::class);
    Route::resource('TransaksiHarian', TransaksiHarianController::class);
    #endregion

    #region QC
    Route::get('QC', 'App\Http\Controllers\HomeController@QC');
    Route::resource('QCFitur', QCController::class);

    Route::resource('InputAfalanQC', QCInputAfalanController::class);
    Route::resource('KoreksiAfalan', QCKoreksiAfalanController::class);
    Route::resource('CircularTropodo', QCCircularTropodoController::class);
    Route::resource('CircularMojosari', QCCircularMojosariController::class);
    Route::resource('ExtruderTropodo', QCExtruderTropodoController::class);
    Route::resource('ExtruderB', QCExtruderBController::class);
    Route::resource('ExtruderD', QCExtruderDController::class);
    Route::resource('CekKainCircular', App\Http\Controllers\QC\Circular\CekKainCircularController::class);
    Route::resource('GelondonganCircular', App\Http\Controllers\QC\Circular\GelondonganCircularController::class);
    Route::resource('CekGantiUkuranCL', App\Http\Controllers\QC\Circular\CekGantiUkuranCLController::class);
    Route::resource('PemberhentianMesinCL', App\Http\Controllers\QC\Circular\PemberhentianMesinCLController::class);
    Route::resource('ACCCekGantiUkuranCL', App\Http\Controllers\QC\Circular\ACCCekGantiUkuranCLController::class);
    Route::resource('VerifikasiSM', App\Http\Controllers\QC\Extruder\VerifikasiSMController::class);
    Route::resource('PengecekanMB', App\Http\Controllers\QC\Extruder\PengecekanMBController::class);
    Route::resource('BenangNG', App\Http\Controllers\QC\Extruder\BenangNGController::class);

    Route::get('getMesinSelect/{idTypeMesin}', 'App\Http\Controllers\QC\Circular\CekKainCircularController@getMesinSelect');

    #region Guard
    Route::get('Guard', 'App\Http\Controllers\HomeController@Guard');
    Route::resource('PemeriksaanBarang', App\Http\Controllers\Guard\Pemeriksaan\PemeriksaanBarangController::class);
    Route::resource('ACCGudangPB', App\Http\Controllers\Guard\Pemeriksaan\ACCGudangPBController::class);
    Route::resource('ViewPemeriksaanBarang', App\Http\Controllers\Guard\Pemeriksaan\ViewPemeriksaanBarangController::class);
    Route::get('PemeriksaanBarang/download/{id}', [App\Http\Controllers\Guard\Pemeriksaan\PemeriksaanBarangController::class,'downloadPdf']);

    #region COA
    Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmInputFIBC', InputDetailController::class);
    Route::resource('FrmInputTest', InputTestController::class);
    Route::resource('FrmACCMng_FIBC', ACCQCManController::class);
    Route::resource('FrmACCFIBC', ACCQCSpvController::class);
    Route::resource('FrmPrintFIBC', FIBCPrintController::class);
    //tidak dipake
    Route::resource('FrmMasterPart', MasterPartController::class);
    Route::resource('FrmMasterMaterial', MasterMaterialController::class);
    Route::resource('FrmMasterType', MasterTypeController::class);
    Route::resource('FrmResult', ResultController::class);
    Route::resource('FrmPrintResult', PrintController::class);
    Route::resource('FrmACCResult', ACCController::class);

    #region ABM
    Route::get('ABM', 'App\Http\Controllers\HomeController@ABM')->name('ABM.Home');
    Route::resource('MaintenanceMesinABM', App\Http\Controllers\ABM\Master\MaintenanceMesinABMController::class);
    Route::resource('OrderKerjaYangAktifPadaMesin', App\Http\Controllers\ABM\Transaksi\OrderKerjaYangAktifPadaMesinABMController::class);
    Route::resource('MaintenanceOrderKerjaABM', App\Http\Controllers\ABM\Transaksi\MaintenanceOrderKerjaABMController::class);
    Route::resource('KegiatanMesinRTRPerHariABM', App\Http\Controllers\ABM\Transaksi\KegiatanMesinRTRPerHariABMController::class);
    Route::resource('KegiatanMesinMPJPerHariABM', App\Http\Controllers\ABM\Transaksi\KegiatanMesinMPJPerHariABMController::class);
    // Route::resource('ScheduleBarcodeABM', App\Http\Controllers\ABM\Barcode\ScheduleBarcodeABMController::class);
    Route::resource('RekapHarianABM', App\Http\Controllers\ABM\Report\RekapHarianABMController::class);
    Route::resource('LaporanPotongJahitABM', App\Http\Controllers\ABM\Report\LaporanPotongJahitABMController::class);
    Route::resource('KonversiPotongJahitABM', App\Http\Controllers\ABM\Konversi\KonversiPotongJahitABMController::class);
    Route::resource('KonversiPrintingABM', App\Http\Controllers\ABM\Konversi\KonversiPrintingABMController::class);
    Route::resource('KonversiBalikLami', App\Http\Controllers\ABM\Konversi\KonversiBalikLamiController::class);
    #endregion

    #region PDAM
    Route::get('PDAM', 'App\Http\Controllers\HomeController@PDAM')->name('PDAM.Home');
    Route::resource('InputPDAM', App\Http\Controllers\PDAM\InputPDAMController::class);
    Route::resource('InputSumberAir', App\Http\Controllers\PDAM\InputSumberAirController::class);
    #endregion

    #region Kencana Beli
    Route::get('Kencana', 'App\Http\Controllers\HomeController@Kencana')->name('Kencana.Home');
    Route::put('/Kencana/BttbPembelian/updateFlag',[App\Http\Controllers\Kencana\BttbPembelianController::class, 'updateFlag']);
    Route::resource('Kencana/PermohonanPembelian', App\Http\Controllers\Kencana\PermohonanPembelianController::class);
    Route::get('/Kencana/AccPermohonan/dokumentasi/{noTrans}',[App\Http\Controllers\Kencana\AccPermohonanController::class, 'downloadDokumentasi'])->name('AccPermohonan.downloadDokumentasi');
    Route::resource('Kencana/AccPermohonan', App\Http\Controllers\Kencana\AccPermohonanController::class);
    Route::get('/Kencana/AccPembelian/dokumentasi/{noTrans}', [App\Http\Controllers\Kencana\AccPembelianController::class, 'downloadDokumentasi'])->name('AccPembelian.downloadDokumentasi');
    Route::resource('Kencana/AccPembelian', App\Http\Controllers\Kencana\AccPembelianController::class);
    Route::get('/Kencana/SppbPembelian/print', [App\Http\Controllers\Kencana\SppbPembelianController::class, 'print']);
    Route::post('/Kencana/SppbPembelian/sendEmailSupplier', [App\Http\Controllers\Kencana\SppbPembelianController::class, 'sendEmailSupplier'])->name('SppbPembelian.sendEmailSupplier');
    Route::resource('Kencana/SppbPembelian', App\Http\Controllers\Kencana\SppbPembelianController::class);
    Route::resource('Kencana/BttbPembelian', App\Http\Controllers\Kencana\BttbPembelianController::class);
    Route::resource('Kencana/TransferBarang', App\Http\Controllers\Kencana\TransferBarangController::class);
    Route::get('/Kencana/FinalApproveKencana/dokumentasi/{noTrans}', [App\Http\Controllers\Kencana\FinalApproveKencanaController::class, 'downloadDokumentasi'])->name('FinalApprove.downloadDokumentasi');
    Route::resource('Kencana/FinalApprove', App\Http\Controllers\Kencana\FinalApproveKencanaController::class);
    Route::get( '/Kencana/CetakPembelian/print', [App\Http\Controllers\Kencana\CetakPembelianKencanaController::class, 'print'] )->name('Kencana.CetakPembelian.print'); 
    Route::post( '/Kencana/CetakPembelian/sendEmailSupplier', [App\Http\Controllers\Kencana\CetakPembelianKencanaController::class, 'sendEmailSupplier'] )->name('Kencana.CetakPembelian.sendEmailSupplier');
    Route::get('/Kencana/CetakPembelian/getData', [App\Http\Controllers\Kencana\CetakPembelianKencanaController::class, 'getData'])->name('Kencana.CetakPembelian.getData');
    Route::resource('Kencana/Cetak', App\Http\Controllers\Kencana\CetakPembelianKencanaController::class);
    

    #region Kencana Sales
    Route::resource('Kencana/Billing', App\Http\Controllers\Kencana\BillingKencanaController::class)->names('Kencana.Billing');
    Route::resource('Kencana/Customer', App\Http\Controllers\Kencana\CustomerKencanaController::class)->names('Kencana.Customer');
    Route::resource('Kencana/Expeditor', App\Http\Controllers\Kencana\ExpeditorKencanaController::class)->names('Kencana.Expeditor');
    Route::resource('Kencana/DaftarHarga', App\Http\Controllers\Kencana\DaftarHargaKencanaController::class)->names('Kencana.DaftarHarga');
    Route::post('/Kencana/DeliveryOrder/{id}', 'App\Http\Controllers\Kencana\DeliveryOrderKencanaController@destroy')->name('deliveryorder.destroy');
    Route::post('/Kencana/DeliveryOrder/{id}/up', 'App\Http\Controllers\Kencana\DeliveryOrderKencanaController@update')->name('deliveryorder.update');
    Route::get('/Kencana/options/nomorsp/{customer}', 'App\Http\Controllers\Kencana\DeliveryOrderKencanaController@getSuratPesanan');
    Route::get('/Kencana/options/id_pesanan/{nomor_sp}', 'App\Http\Controllers\Kencana\DeliveryOrderKencanaController@getIdPesanan');
    Route::get('/Kencana/options/barang/{id_pesanan}', 'App\Http\Controllers\Kencana\DeliveryOrderKencanaController@getBarang');
    Route::get('/Kencana/options/kelompokutama/{kodeBarang}', 'App\Http\Controllers\Kencana\DeliveryOrderKencanaController@getKelompokUtama');
    Route::get('/Kencana/options/kelompok/{kelompokUtama}/{kodeBarang}', 'App\Http\Controllers\Kencana\DeliveryOrderKencanaController@getKelompok');
    Route::get('/Kencana/options/subkelompok/{kelompokUtama}/{kodeBarang}', 'App\Http\Controllers\Kencana\DeliveryOrderKencanaController@getSubKelompok');
    Route::get('/Kencana/options/saldo/{subKelompok}/{kodeBarang}', 'App\Http\Controllers\Kencana\DeliveryOrderKencanaController@getSaldo');
    Route::get('/Kencana/options/nomorDO', 'App\Http\Controllers\Kencana\DeliveryOrderKencanaController@getNomorDeliveryOrder');
    Route::resource('Kencana/DeliveryOrder', App\Http\Controllers\Kencana\DeliveryOrderKencanaController::class);
    Route::post('/Kencana/DeliveryOrderManager/up', 'App\Http\Controllers\Kencana\DeliveryOrderManagerKencanaController@update')->name('deliveryordermanager.update');
    Route::get('/Kencana/DeliveryOrderManager/BatalDo/index', 'App\Http\Controllers\Kencana\DeliveryOrderManagerKencanaController@indexDestroy')->name('deliveryordermanager.destroy');
    Route::post('/Kencana/DeliveryOrderManager/destroy', 'App\Http\Controllers\Kencana\DeliveryOrderManagerKencanaController@destroy');
    Route::resource('Kencana/DeliveryOrderManager', App\Http\Controllers\Kencana\DeliveryOrderManagerKencanaController::class);
    Route::get('/Kencana/dosudahacc/{tanggal}', 'App\Http\Controllers\Kencana\CetakDOKencanaController@getDeliveryOrderSudahACC');
    Route::get('/Kencana/dobelumacc/{tanggal}', 'App\Http\Controllers\Kencana\CetakDOKencanaController@getDeliveryOrderBelumACC');
    Route::resource('Kencana/CetakDO', App\Http\Controllers\Kencana\CetakDOKencanaController::class);
    Route::get('/Kencana/SuratPesanan/{id}/show', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@show')->name('suratpesanan.show');
    Route::post('/Kencana/SuratPesanan/{id}/up', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@update')->name('suratpesanan.update');
    Route::get('/Kencana/editSP/{id}', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@edit')->name('suratpesanan.edit');
    Route::get('/Kencana/SuratPesanan/createRobby', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@createRobby');
    Route::post('/Kencana/SuratPesanan/{id}', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@destroy')->name('suratpesanan.destroy');
    Route::get('Kencana/options/kategori/{kategoriUtama}', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@getKategori');
    Route::get('Kencana/options/subKategori/{kategori}', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@getSubKategori');
    Route::get('Kencana/options/namaBarang/{subKategori}', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@getNamaBarang');
    Route::get('Kencana/options/namaBarangExport/{subKategori}', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@getNamaBarangExport');
    Route::get('Kencana/satuan/{kode_barang}', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@getSatuanBarang');
    Route::get('Kencana/satuan1/{kode_barang}', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@getSatuanBarang1');
    Route::get('Kencana/displaybarang/{kode_barang}', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@getDisplayBarang');
    Route::get('Kencana/saldoinventory/{kode_barang}', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@getSaldoInventory');
    Route::get('Kencana/beratstandard/{kode_barang}', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@getBeratStandard');
    Route::get('Kencana/deletedetail/{id_pesanan}', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@deleteDetailPesanan');
    Route::post('/Kencana/splokal', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@splokal')->name('splokal');
    Route::post('/Kencana/penyesuaiansp/koreksi', 'App\Http\Controllers\Kencana\SuratPesananKencanaController@update')->name('suratpesanan.koreksi');
    Route::resource('Kencana/SuratPesanan', App\Http\Controllers\Kencana\SuratPesananKencanaController::class);
    Route::post('/Kencana/SuratPesananManager/{id}/up', 'App\Http\Controllers\Kencana\SuratPesananManagerKencanaController@update')->name('suratpesananmanager.update');
    Route::post('/Kencana/SuratPesananManager/{id}/del', 'App\Http\Controllers\Kencana\SuratPesananManagerKencanaController@destroy')->name('suratpesananmanager.destroy');
    Route::post('/Kencana/SuratPesananManager/upall', 'App\Http\Controllers\Kencana\SuratPesananManagerKencanaController@updateAll');
    Route::get('/Kencana/SuratPesananManager/penyesuaian/suratpesanan', 'App\Http\Controllers\Kencana\SuratPesananManagerKencanaController@penyesuaian');
    Route::get('/Kencana/penyesuaian/{suratPesanan}', 'App\Http\Controllers\Kencana\SuratPesananManagerKencanaController@getPenyesuaianSP');
    Route::post('/Kencana/penyesuaiansp/koreksi', 'App\Http\Controllers\Kencana\SuratPesananManagerKencanaController@koreksiPenyesuaianSP');
    Route::post('/Kencana/penyesuaiansp/batalsp', 'App\Http\Controllers\Kencana\SuratPesananManagerKencanaController@batalspPenyesuaianSP');
    Route::post('/Kencana/batalsplokal/{nosp}', 'App\Http\Controllers\Kencana\SuratPesananManagerKencanaController@batalspPenyesuaianSP');
    Route::post('/Kencana/SuratPesananManager/upPenyesuaian', 'App\Http\Controllers\Kencana\SuratPesananManagerKencanaController@updatePenyesuaian');
    Route::resource('Kencana/SuratPesananManager', App\Http\Controllers\Kencana\SuratPesananManagerKencanaController::class);
    Route::resource('Kencana/SuratPesananDirektur', App\Http\Controllers\Kencana\SuratPesananDirekturKencanaController::class);
    Route::get('/Kencana/CetakSP', 'App\Http\Controllers\Kencana\CetakSPKencanaController@index')->name('kencana.cetaksp');
    Route::get('/Kencana/viewprint/{nosp}', 'App\Http\Controllers\Kencana\CetakSPKencanaController@getViewPrint');
    Route::get('/Kencana/options/jenissp/{nosp}', 'App\Http\Controllers\Kencana\CetakSPKencanaController@getJenisSp');
    Route::get('/Kencana/nosp/{tanggal}', 'App\Http\Controllers\Kencana\CetakSPKencanaController@getSuratPesananSelect');
    Route::resource('Kencana/SuratJalan', App\Http\Controllers\Kencana\SuratJalanKencanaController::class);
    Route::post('/Kencana/SuratJalanManager/up', 'App\Http\Controllers\Kencana\SuratJalanManagerKencanaController@update')->name('suratjalanmanager.update');
    Route::get('/Kencana/options/suratpesanan/{customer}', 'App\Http\Controllers\Kencana\SuratJalanKencanaController@getSuratPesanan'); 
    Route::get('/Kencana/options/deliveryorder/{suratpesanan}', 'App\Http\Controllers\Kencana\SuratJalanKencanaController@getDeliveryOrder');
    Route::get('/Kencana/options/selecteddeliveryorder/{deliveryorder}', 'App\Http\Controllers\Kencana\SuratJalanKencanaController@getDataDeliveryOrder');
    Route::get('/Kencana/options/getdatadeliveryorder/{idtransaksi}', 'App\Http\Controllers\Kencana\SuratJalanKencanaController@getDetailDataDeliveryOrder');
    Route::get('/Kencana/options/editSJ/{id}', 'App\Http\Controllers\Kencana\SuratJalanKencanaController@getDetailSuratJalan');
    Route::get('/Kencana/options/nomorSJ', 'App\Http\Controllers\Kencana\SuratJalanKencanaController@getNomorSuratJalan');
    Route::get('/Kencana/options/loadliststokqtydo/{idtype}', 'App\Http\Controllers\Kencana\SuratJalanKencanaController@getDataListStokQtyDO');
    Route::get('/Kencana/options/loadlistjualqtydo/{idtransaksi}', 'App\Http\Controllers\Kencana\SuratJalanKencanaController@getDataListJualQtyDO');
    Route::get('/Kencana/options/qtyDO/{idtransaksi}', 'App\Http\Controllers\Kencana\SuratJalanKencanaController@getDataQtyDeliveryOrder');
    Route::resource('Kencana/SuratJalanManager', App\Http\Controllers\Kencana\SuratJalanManagerKencanaController::class);
    Route::resource('Kencana/BatalSJ', App\Http\Controllers\Kencana\BatalSuratJalanKencanaController::class);
    Route::get('/Kencana/cetak-sj/download-pdf/{no_sj}', [App\Http\Controllers\Kencana\CetakSJKencanaController::class, 'downloadPdf'])->name('cetaksj.download.pdf');
    Route::get('/Kencana/optionsCetakSuratJalan/{tanggal}', 'App\Http\Controllers\Kencana\CetakSJKencanaController@getSuratJalan');
    Route::get('/Kencana/cetakSuratJalanPPN/{tanggal}/{nosj}/{jenissj}', 'App\Http\Controllers\Kencana\CetakSJKencanaController@getDataCetakSuratJalan');
    Route::resource('Kencana/CetakSJ', App\Http\Controllers\Kencana\CetakSJKencanaController::class);
    #endregion

    #region Company Profile
    Route::get('/company-profile', [HomeComProController::class, 'index'])
        ->name('company.profile');

    Route::get('/language/{locale}', function ($locale) {
        if (!in_array($locale, ['id', 'en'])) {
            abort(400);
        }

        Session::put('locale', $locale);

        return redirect()->back();
    })->name('language.switch');

    Route::get('/product/block-bottom', function () {
        return view('Product.blockBottom');
    })->name('product.blockBottom');

    Route::get('/product/block-fibc', function () {
        return view('Product.fibc');
    })->name('product.fibc');

    Route::get('/product/block-woven', function () {
        return view('Product.woven');
    })->name('product.woven');

    Route::view('/catalogue', 'Catalogue.indexCatalogue')
        ->name('catalogue.index');

    Route::view('/sertifikasi', 'Sertifikasi.indexSertifikasi')
        ->name('sertifikasi.index');
    #endregion
});
