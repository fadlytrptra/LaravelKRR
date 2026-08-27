@extends('layouts.appOrderPembelian')
@section('content')
@section('title', 'Maintenance KB')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">Maintence Kode Barang</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                        <label for="kd_barang">Kd Barang</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" class="form-control" id="kd_barang" name="kd_barang">
                                    </div>
                                    <div class="col-4 col-md-2">
                                        <button type="button" class="btn btn-primary w-100"
                                            id="btn_cari_kdBarang">Cari</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                        <label for="kategori_utama">Kategori Utama</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_kategori_utama" id="select_kategori_utama" class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>-- Pilih Kategori Utama --
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-4 col-md-2">
                                        <button type="button" class="btn btn-success w-100"
                                            id="btn_tambah_kategoriUtama" data-toggle="modal" data-target="#tambahKategoriUtamaModal">Tambah</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                        <label for="kategori">Kategori</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_kategori" id="select_kategori" class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>-- Pilih Kategori --
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-4 col-md-2">
                                        <button type="button" class="btn btn-success w-100" id="btn_tambah_kategori"
                                            data-toggle="modal" data-target="#tambahKategoriModal">Tambah</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2 ">
                                        <label for="subKategori">Sub Kategori</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_subKategori" id="select_subKategori" class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>-- Pilih Sub Kategori --
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-4 col-md-2">
                                        <button type="button" class="btn btn-success w-100" id="btn_tambah_subKategori"
                                            data-toggle="modal" data-target="#tambahSubKategoriModal">Tambah</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                        <label for="ket_khusus">Keterangan Khusus</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" class="form-control" id="ket_khusus" name="ket_khusus" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                        <label for="namaBarang">Nama Barang</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" class="form-control" id="nama_Barang" name="nama_Barang">
                                    </div>
                                    <div class="col-4 col-md-2">
                                        <button type="button" class="btn btn-primary w-100" id="btn_cekNamaBarang"
                                            data-toggle="modal" data-target="#namaBarangModal">Nama Barang</button>
                                            <button type="button" class="btn btn-primary w-100" id="btn_namaBarang"
                                            data-toggle="modal" data-target="#cekNamaBarangModal">Cek</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                        <label for="ket_barang">Keterangan Barang</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" class="form-control" id="ket_barang" name="ket_barang">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                        <label for="jenisPembelian">Jenis Pembelian</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_jenisPembelian" id="select_jenisPembelian"
                                            class="w-100 input">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                    </div>
                                    <div class="col-8">
                                        <div class="row">
                                            <div class="col-3">
                                                <input type="checkbox" class="input" id="check_barangSama"
                                                    name="check_jenisPembelian">
                                                <label for="check_barangSama">Barang Sama</label>
                                            </div>
                                            <div class="col-2">
                                                <input type="checkbox" class="input" id="check_round"
                                                    name="check_jenisPembelian">
                                                <label for="check_round">Round</label>
                                            </div>
                                            <div class="col-7">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <input type="checkbox" class="input" id="check_export"
                                                            name="check_jenisPembelian">
                                                        <label for="check_export">Export</label>
                                                    </div>
                                                    <div class="col-md-8" id="labelExport">
                                                        <p>KALO YANG MINTA KODE BARANG BARU DIVISI EXIM, HARUS DITANYA
                                                            APAKAH HASIL PRODUKSI
                                                            INI UNTUK EXPORT. KALO IYA, CHECK BOX BARANG EXPORT HARUS
                                                            DICENTANG.</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                        <label for="org_penjaluk">Orang Penjaluk</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" class="form-control" id="org_penjaluk" name="org_penjaluk">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                        <label for="satuanPrimer">Satuan Primer</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_satuanPrimer" id="select_satuanPrimer" class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2 ">
                                        <label for="satuanSekunder">Satuan Sekunder</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_satuanSekunder" id="select_satuanSekunder"
                                            class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                        <label for="satuanTritier">Satuan Tritier</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_satuanTritier" id="select_satuanTritier"
                                            class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2 ">
                                        <label for="satuanUmum">Satuan Umum</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_satuanUmum" id="select_satuanUmum" class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox1" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox2" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox3" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox4" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox5" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox6" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox7" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox8" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox9" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox10" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox11" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox12" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox13" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox14" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox15" name="textBox"
                                            readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" id="textBox16" name="textBox"
                                            readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2 d-none" id="groupSpek">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                        <input type="checkbox" class="input" id="check_spek"
                                            name="check_jenisPembelian">
                                        <label for="spek"">Spek</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_spek" id="select_spek" class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="modal fade" id="tambahKategoriUtamaModal" tabindex="-1" role="dialog"
                                    aria-labelledby="tambahKategoriUtamaModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="tambahKategoriUtamaModalLabel">Isi Kategori</h5>
                                            </div>
                                            <div class="modal-body">
                                                <p>Tambah Kategori Utama Belum Dibuat Jreng</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="modal fade" id="tambahKategoriModal" tabindex="-1" role="dialog"
                                    aria-labelledby="tambahKategoriModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="tambahKategoriModalLabel">Isi Kategori</h5>
                                            </div>
                                            <div class="modal-body">
                                                <p>Tambah Kategori</p>
                                                <input type="text" class="form-control" id="tambah_kategori"
                                                    name="tambah_kategori">
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary"
                                                    id="btn_tambahKategori">Tambah</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="modal fade" id="tambahSubKategoriModal" tabindex="-1" role="dialog"
                                    aria-labelledby="tambahSubKategoriModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="tambahSubKategoriModalLabel">Isi Sub Kategori
                                                </h5>
                                            </div>
                                            <div class="modal-body">
                                                <p>Tambah Sub Kategori</p>
                                                <input type="text" class="form-control" id="tambah_subKategori"
                                                    name="tambah_subKategori">
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary"
                                                    id="btn_tambahSubKategori">Tambah</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
                                id="namaBarangModal" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="namaBarangModalModalLabel">Nama Barang
                                            </h5>
                                        </div>
                                        <div class="modal-body">
                                            <table id="table_namaBarang" class="table table-bordered table-striped"
                                                style="width:100%">
                                                <thead class="thead-dark">
                                                    <tr>
                                                        <th>Kode</th>
                                                        <th>Deskripsi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                                id="btn_closeNamaBarang">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
                                id="cekNamaBarangModal" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="cekNamaBarangModalModalLabel">Cek Daftar Nama Barang
                                            </h5>
                                        </div>
                                        <div class="modal-body">
                                            <table id="table_cekNamaBarang" class="table table-bordered table-striped"
                                                style="width:100%">
                                                <thead class="thead-dark">
                                                    <tr>
                                                        <th>Sub Kategori</th>
                                                        <th>Kode</th>
                                                        <th>Deskripsi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                                id="btn_closeCekBarang">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-4 col-md-2"><button type="button" class="w-100 btn btn-primary"
                                            id="btn_isi">Isi</button></div>
                                    <div class="col-4 col-md-2"><button type="button" class="w-100 btn btn-secondary"
                                            id="btn_koreksi">Koreksi</button></div>
                                    <div class="col-4 col-md-2"><button type="button" class="w-100 btn btn-danger"
                                            id="btn_hapus">Hapus</button></div>
                                    <div class="col-4 col-md-2"><button type="button" class="w-100 btn btn-success"
                                            id="btn_proses">Proses</button></div>
                                    <div class="col-4 col-md-2"><button type="button" class="w-100 btn btn-info"
                                            id="btn_batal">Batal</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/OrderPembelian/MaintenanceKodeBarang/MaintenceKodeBarang.js') }}"></script>
@endsection
