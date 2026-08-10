@extends('layouts.appWorkshop')
@section('content')
@section('title', 'Maintenance Order Kerja')
<link href="{{ asset('css/Workshop/Transaksi/MaintenanceOrderGambar.css') }}" rel="stylesheet">
@if (Session::has('success'))
    <div class="alert alert-success">
        {{ Session::get('success') }}
    </div>
@elseif (Session::has('error'))
    <div class="alert alert-danger">
        {{ Session::get('error') }}
    </div>
@endif
<style>
    .custom-modal-width {
        max-width: 80%;
        /* Adjust the percentage as needed */
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">
                    Maintenance Order Kerja
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <div class="row">
                            <div class="col-lg-1">
                                <label for="Tanggal">Tanggal</label>
                            </div>
                            <div class="col-lg-2">
                                <input type="Date" class="form-control" name="tgl_awal" id="tgl_awal">
                            </div>
                            <div class="col-lg-1 d-flex justify-content-center">
                                <span style="margin-top: 5px;">s/d</span>
                            </div>
                            <div class="col-lg-2">
                                <input type="Date" class="form-control" name="tgl_akhir" id="tgl_akhir">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="row">
                            <div class="col-lg-1">
                                <label for="divisi">Divisi</label>
                            </div>
                            <div class="col-lg-2">
                                <select class="form-select" name="KodeDivisi"
                                    style="width: 36vh;
                                height: 6vh;" id="kddivisi">
                                    <option disabled selected>Pilih Divisi</option>
                                    @foreach ($divisi as $d)
                                        <option value="{{ $d->IdDivisi }}">{{ $d->IdDivisi }} -- {{ $d->NamaDivisi }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="table-responsive">
                                <table  style="width: 100%" id="tableOrderKerja">
                                    <thead>
                                        <tr>
                                            <th>Nomor Order</th>
                                            <th>Tanggal Order</th>
                                            <th>Nama Barang</th>
                                            <th>Status Order</th>
                                            <th>Nomor Gambar</th>
                                            <th>Mesin</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>

                            </div>
                            <div class="mb-3">
                                <button class="btn btn-success" id="btnRefresh">Refresh</button>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="div" style="text-align: -webkit-center; ">
                                <h5 id="status" style="text-align: -webkit-center;"></h5>
                            </div>
                            <form id="formMaintenanceOrderGambar" method="POST">
                                {{ csrf_field() }}
                                <input type="hidden" name="_method" id="methodForm">
                                <div class="row">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">No. Order:</span>
                                    </div>
                                    <div class="col-lg-5">
                                        <input type="text" name="no_order" class="form-control" id="no_order">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Kode Barang:</span>
                                    </div>
                                    <div class="col-lg-5">
                                        <input type="text" name="Kode_Barang" class="form-control" id="Kode_Barang">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Nomor Gambar:</span>
                                    </div>
                                    <div class="col-lg-5">
                                        <input type="text" name="Nomor_Gambar" class="form-control"
                                            id="Nomor_Gambar">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Jumlah:</span>
                                    </div>
                                    <div class="col-lg-5">
                                        <div class="input-group">
                                            <input type="number" name="jmlh1" class="form-control" value="1"
                                                id="jmlh1">
                                            <input type="text" name="jmlh2" class="form-control"
                                                style="width: 7.5vw;" id="jmlh2">
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Keterangan Order:</span>
                                    </div>
                                    <div class="col-lg-7">
                                        <input type="text" name="keterangan_order" class="form-control"
                                            id="keterangan_order">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Peng-Order:</span>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="text" name="pengorder" class="form-control" id="pengorder">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">ACC Manager:</span>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="text" name="acc_manager" class="form-control"
                                            id="acc_manager">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Manager:</span>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="text" name="manager" class="form-control" id="manager">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">ACC Direktur:</span>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="text" name="acc_direktur" class="form-control"
                                            id="acc_direktur">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Tgl. tdk disetujui Manager:</span>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="date" name="tgl_manager" class="form-control"
                                            id="tgl_manager">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Ket. tdk disetujui Manager:</span>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="text" name="ket_manager" class="form-control"
                                            id="ket_manager">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Tgl. tdk disetujui Direktur:</span>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="date" name="tgl_direktur" class="form-control"
                                            id="tgl_direktur">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Ket. tdk disetujui Direktur:</span>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="text" name="ket_direktur" class="form-control"
                                            id="ket_direktur">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Tgl. Ditolak Div. Teknik:</span>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="date" name="tgl_teknik" class="form-control"
                                            id="tgl_teknik">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Ket. Ditolak Div. Teknik:</span>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="text" name="ket_teknik" class="form-control"
                                            id="ket_teknik">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Ket. Ditunda Div. Teknik:</span>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="text" name="tunda_teknik" class="form-control"
                                            id="tunda_teknik">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">File Attachment:</span>
                                    </div>
                                    <div class="col-lg-7" id="fileActionContainer">

                                    </div>
                                </div>


                                <div class="row mt-3 d-flex justify-content-center">
                                    <div class="col-lg-8 content-center">
                                        <div>
                                            <button type="button" class="btn btn-success custom-btn" id="isi"
                                                onclick="klikisi()">ISI</button>
                                            <button type="button" class="btn btn-warning custom-btn"
                                                onclick="koreksiklik()" id="koreksi">KOREKSI</button>
                                            <button type="button" class="btn btn-danger custom-btn"
                                                onclick="hapusklik()">HAPUS</button>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="keterangan">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <span style="color: red;">xxxxx -></span>
                                            <span>ACC Direktur</span><br>
                                            <span style="color: magenta;">xxxxx -></span>
                                            <span>Ditunda Div. Teknik</span><br>
                                            <span style="color: green;">xxxxx -></span>
                                            <span>Ditolak Div. Teknik</span><br>
                                        </div>

                                        <div class="col-lg-6">
                                            <span style="color: blue;">xxxxx -></span>
                                            <span>ACC Manager</span><br>
                                            <span style="color: grey;">xxxxx -></span>
                                            <span>Tdk disetujui Direktur</span><br>
                                            <span style="color: brown;">xxxxx -></span>
                                            <span>Tdk disetujui Manager</span><br>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="OrderKerja" tabindex="-1" role="dialog" aria-labelledby="OrderKerjaLabel"
    aria-hidden="true">
    <div class="modal-dialog custom-modal-width" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title-container" style="flex: 1;text-align: center;">
                    <h5 class="modal-title" id="isiOrderKerjatitle">Judul Modal</h5>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form method="POST" id="formOrderKerja" action="{{ url('MaintenanceOrderKerja') }}">
                {{ csrf_field() }}
                <input type="hidden" name="_method" id="methodFormOrderKerja">
                <input type="hidden" name="iddivisiOrder" id="iddivisimodalOrder">
                <input type="hidden" name="NomorSatuanModal" id="NomorSatuanModal">

                <div class="modal-body">
                    <div class="container">
                        <div class="row" style="margin-top: 10px;">
                            <div class="col-2">
                                <span>Tanggal</span>
                            </div>
                            <div class="col-4">
                                <input type="date" class="form-control" id="tanggalmodal" name="tanggalmodal"
                                    readonly>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                        id="buatbarumodal" value="Baru">
                                    <label class="form-check-label" for="buatbarumodal">Buat Baru</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                        id="Perbaikanmodal" value="Perbaikan">
                                    <label class="form-check-label" for="Perbaikanmodal">Perbaikan</label>
                                </div>
                            </div>
                        </div>

                        <div class="row" style="margin-top: 10px;">
                            <div class="col-2">
                                <span>Kd. Barang</span>
                            </div>
                            <div class="col-5">
                                <input type="text" class="form-control" id="Kdbarangmodal" name="Kdbarangmodal" enterkeyhint="enter">
                            </div>
                            <div class="col-2" style="text-align: right;">
                                <span style="color: red">input PDF</span>
                            </div>
                            <div class="col-3" id="inputpdfdiv">
                                <input class="form-control" type="file" id="inputpdfmodal" name="inputpdfmodal"
                                    accept=".pdf" disabled>
                            </div>
                        </div>

                        <div class="row" style="margin-top: 10px;">
                            <div class="col-2">
                                <span>No. Gambar</span>
                            </div>
                            <div class="col-2">
                                <input type="text" class="form-control" id="NomorGambarModal"
                                    name="NomorGambarModal" enterkeyhint="enter">
                            </div>
                            <div class="col-3">
                                <input type="text" class="form-control" id="NamaBarangModal"
                                    name="NamaBarangModal" readonly>
                            </div>
                            <div class="col-2" style="text-align: right;">
                                <span>Update PDF</span>
                            </div>
                            <div class="col-3" id="updatepdfdiv">
                                <input class="form-control" type="file" id="updatepdfmodal" name="updatepdfmodal"
                                    accept=".pdf" disabled>
                            </div>
                        </div>

                        <div class="row" style="margin-top: 10px;">
                            <div class="col-2">
                                <span>Keterangan</span>
                            </div>
                            <div class="col-7">
                                <input type="text" class="form-control" id="KeteranganModal"
                                    name="KeteranganModal">
                            </div>
                        </div>

                        <div class="row" style="margin-top: 10px;">
                            <div class="col-2">
                                <span>Jumlah</span>
                            </div>
                            <div class="col-2">
                                <input type="number" class="form-control" id="JumlahModal" name="JumlahModal">
                            </div>
                            <div class="col-4">
                                <select class="form-select" name="SatuanModal" style="width: 36vh; height: 6vh;"
                                    id="SatuanModal">
                                    <option disabled selected>Pilih Satuan</option>
                                    @foreach ($satuan as $s)
                                        <option value="{{ $s->No_Satuan }}">{{ $s->Nama_Satuan }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="row" style="margin-top: 10px;">
                            <div class="col-2">
                                <span>Mesin</span>
                            </div>
                            <div class="col-5">
                                <select class="form-select" name="MesinModal" style="width: 36vh; height: 6vh;"
                                    id="MesinModal"></select>
                            </div>
                        </div>

                        <div class="row" style="margin-top: 10px;">
                            <div class="col-2">
                                <span>Peng-Order</span>
                            </div>
                            <div class="col-3">
                                <input type="text" class="form-control" id="UserModal" name="UserModal" readonly>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer" style="margin-top: 10px">
                    <div class="container">
                        <div class="row">
                            <div class="col-6" style="border-style: ridge;">
                                <span style="color: red">Saldo Di Gudang S/Part</span>
                                <div class="row" style="align-items: center; margin-top: 10px;">
                                    <div class="col-6">
                                        <span>Saldo Primer</span>
                                    </div>
                                    <div class="col-6">
                                        <input type="text" class="form-control form-control" id="PrimerModal"
                                            name="PrimerModal">
                                    </div>
                                </div>
                                <div class="row" style="align-items: center; margin-top: 10px;">
                                    <div class="col-6">
                                        <span>Saldo Sekunder</span>
                                    </div>
                                    <div class="col-6">
                                        <input type="text" class="form-control form-control" id="SekunderModal"
                                            name="SekunderModal">
                                    </div>
                                </div>
                                <div class="row" style="align-items: center; margin-top: 10px; margin-bottom:10px">
                                    <div class="col-6">
                                        <span>Saldo Tritier</span>
                                    </div>
                                    <div class="col-6">
                                        <input type="text" class="form-control form-control" id="tritierModal"
                                            name="tritierModal">
                                    </div>
                                </div>

                            </div>
                            <div class="col-6">
                                <div class="row" style="margin-top: 10px;">
                                    <div class="col-5" style="text-align-last: right;display:flex">
                                        <button type="button" class="btn btn-primary" onclick="prosesmodalklik()"
                                            id="ProsesModal">Proses</button>
                                        <button type="button" class="btn btn-danger"
                                            data-dismiss="modal">Batal</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<script type="text/javascript">
    let user = @json($nomoruser).trim();
</script>
<script src="{{ asset('js/Andre-WorkShop/Workshop/Transaksi/MaintenanceOrderKerja.js') }}"></script>
@endsection
