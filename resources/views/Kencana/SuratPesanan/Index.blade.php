@extends('layouts.appKencana') @section('content')
   {{-- @include('Sales.Transaksi.SuratPesanan.ModalTambah') --}}
@section('title', 'Surat Pesanan Kencana')
<style>
    .custom-modal-width {
        max-width: 95%;
        /* Adjust the percentage as needed */
    }
</style>
<script>
    $(document).ready(function() {
        // console.log(dataArray.data);
        $('#table_SP').DataTable({
            order: [
                [2, 'desc']
            ],
            processing: true,
            serverSide: true,
            "ajax": {
                "url": "{{ url('/Kencana/splokal') }}",
                "dataType": "json",
                "type": "POST",
                "data": {
                    _token: "{{ csrf_token() }}"
                }
            },
            "columns": [{
                    "data": "IDSuratPesanan"
                },
                {
                    "data": "NamaCust"
                },
                {
                    "data": "Tgl_Pesan"
                },
                {
                    "data": "Actions"
                }
            ]
        });
    });
</script>
<link href="{{ asset('css/permohonan-s-p.css') }}" rel="stylesheet">
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0"> {{-- button untuk munculin create billing --}}
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @elseif (Session::has('error'))
                <div class="alert alert-danger">
                    {{ Session::get('error') }}
                </div>
            @endif
            {{-- <button class="acs-icon-btn acs-add-btn acs-float" onclick="openNewWindow('SuratPesanan/create')">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah SP</div>
            </button> --}}
            <button class="acs-icon-btn acs-add-btn acs-float" id="btn_tambahModal">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah SP</div>
            </button>
            <div class="card">
                <div class="card-header" id="headerCard">Surat Pesanan Sudah ACC Manager</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="mb-2">
                    </div>
                    <table id="table_SP" class="table table-bordered table-striped SP_datatable" style="width:100%">
                        <thead class="thead-light">
                            <tr>
                                <th>Nomor SP</th>
                                <th>Nama Customer</th>
                                <th>Tanggal Pesan</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="createSPModal" tabindex="-1" aria-labelledby="createSPModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-modal-width" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createSPModalLabel">Tambah Surat Pesanan</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="permohonan-s-p-form" id="form_suratPesanan" method="POST"
                    action="{{ url('Kencana/SuratPesanan') }}">
                    {{ csrf_field() }}
                    <div class="permohonan-s-p-container01" id="div_headerSuratPesanan">
                        <div class="permohonan-s-p-container02"> <span class="permohonan-s-p-text">Tgl
                                Pesan</span>{{-- <span
                            class="permohonan-s-p-text01">Jenis SP</span> --}}
                            <span permohonan-s-p-text03 style="display: none" id="lbl_sp">Nomor SP</span>
                            <span class="permohonan-s-p-text02">No. SP</span>
                            <span class="permohonan-s-p-text02">Customer</span>
                            <span class="permohonan-s-p-text03">No. PO</span>
                            <span class="permohonan-s-p-text04">Tgl. PO</span>
                            <span class="permohonan-s-p-text05">No. PI</span>
                        </div>
                        <div class="permohonan-s-p-container03">
                            <div class="permohonan-s-p-container04"> <input type="date" id="tgl_pesan"
                                    name="tgl_pesan" placeholder="placeholder" class="permohonan-s-p-textinput input" />
                                {{-- <div class="permohonan-s-p-textinput01"> </div> <input type="text" placeholder="Jenis SP" class="permohonan-s-p-textinput01 input" /> <button class="permohonan-s-p-button button">...</button> --}}
                                <select name="jenis_sp" id="jenis_sp" class="form-control">
                                    <option disabled selected value>-- Pilih Jenis SP --</option>
                                    @foreach ($jenis_sp as $data)
                                        <option value="{{ $data->IDJnsSuratPesanan }}">
                                            {{ $data->JnsSuratPesanan }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="permohonan-s-p-container05" style="margin: 1%;">
                                <input type="text" placeholder="Nomor SP" class="permohonan-s-p-textinput04 input"
                                    id="no_spText" name="no_spText" />
                                <select name="no_spSelect" id="no_spSelect" class="form-control" style="display: none">
                                    <option disabled selected value>-- Pilih Nomor SP --</option>
                                    @foreach ($list_sp as $data)
                                        <option value="{{ $data->IDSuratPesanan }}">{{ $data->IDSuratPesanan }}
                                            | {{ $data->NamaCust }}</option>
                                    @endforeach
                                </select>
                                <button id="list_noSP" class="permohonan-s-p-button18 button" style="display: none"
                                    disabled>
                                    <span>Lihat Data</span></button>
                            </div>
                            <div class="permohonan-s-p-container06"> <select name="list_customer" id="list_customer"
                                    class="form-control">
                                    <option disabled selected value>-- Pilih Customer --</option>
                                    @foreach ($list_customer as $data)
                                        @php
                                            $parts = explode('-', $data->IDCust);
                                        @endphp
                                        <option value="{{ trim($parts[1]) }}">{{ $data->NAMACUST }} |
                                            {{ $data->IDCust }}</option>
                                    @endforeach
                                </select></div>
                            <div class="permohonan-s-p-container07"> <input type="text" placeholder="Nomor PO"
                                    class="permohonan-s-p-textinput46 input" id="no_po" name="no_po" /> </div>
                            <div class="permohonan-s-p-container08"> <input type="date" id="tgl_po" name="tgl_po"
                                    placeholder="placeholder" class="permohonan-s-p-textinput05 input" /> </div>
                            <div class="permohonan-s-p-container09"> <input type="text" placeholder="Nomor PI"
                                    class="permohonan-s-p-textinput06 input" id="no_pi" name="no_pi" /> </div>
                        </div>
                        <div class="permohonan-s-p-container10"> <span class="permohonan-s-p-text06">Sales</span>
                            <span class="permohonan-s-p-text07">Mata Uang</span> <span
                                class="permohonan-s-p-text08">Jns
                                Bayar</span> <span class="permohonan-s-p-text09">Syarat Bayar</span> <span
                                class="permohonan-s-p-text10">Keterangan</span>
                        </div>
                        <div class="permohonan-s-p-container11">
                            <div class="permohonan-s-p-container12"> <select name="list_sales" id="list_sales"
                                    class="form-control">
                                    <option disabled selected value>-- Pilih Sales --</option>
                                    @foreach ($list_sales as $data)
                                        <option value="{{ $data->IDSales }}">{{ $data->NamaSales }}</option>
                                    @endforeach
                                </select> {{-- <input type="text" placeholder="Nama Sales" class="permohonan-s-p-textinput07 input" name="list_sales" id="list_sales" list="data_sales" /> <datalist id="data_sales"> @foreach ($list_sales as $data) <option value="{{ $data->IDSales }} - {{ $data->NamaSales }}"></option> @endforeach </datalist> --}} {{-- <button class="permohonan-s-p-button03 button">...</button> --}} </div>
                            <div class="permohonan-s-p-container13"> <input type="text" placeholder="Mata Uang"
                                    class="permohonan-s-p-textinput08 input" id="mata_uang" name="mata_uang" />
                            </div>
                            <div class="permohonan-s-p-container14"> <select name="jenis_bayar" id="jenis_bayar"
                                    class="form-control">
                                    <option disabled selected value>-- Pilih Jenis Bayar --</option>
                                    @foreach ($jenis_bayar as $data)
                                        <option value="{{ $data->IdPembayaran }}">{{ $data->NamaPembayaran }}
                                        </option>
                                    @endforeach
                                </select> {{-- <input type="text" placeholder="Jenis Bayar" class="permohonan-s-p-textinput09 input" name="jenis_bayar" id="jenis_bayar" list="data_jenisbayar" /> <datalist id="data_jenisbayar"> @foreach ($jenis_bayar as $data) <option value="{{ $data->IdPembayaran }} - {{ $data->NamaPembayaran }}"></option> @endforeach </datalist> <button class="permohonan-s-p-button04 button">...</button> --}} </div>
                            <div class="permohonan-s-p-container15"> <input type="text"
                                    class="permohonan-s-p-textinput10 input" id="syarat_bayar" name="syarat_bayar"
                                    placeholder="" /> <span class="permohonan-s-p-text11"> <span>Hari</span> <br />
                                </span>
                                <span class="permohonan-s-p-text14"> <span>Faktur PJK:</span> <br /> </span>
                                <input type="radio" class="permohonan-s-p-radiobutton" id="faktur_pjkBiasa"
                                    name="faktur_pjk" value="0" required checked /> <span
                                    class="permohonan-s-p-text17"> <span>Biasa</span>
                                    <br /> </span> <input type="radio" class="permohonan-s-p-radiobutton1"
                                    id="faktur_pjkSederhana" name="faktur_pjk" value="1" /> <span
                                    class="permohonan-s-p-text20">
                                    <span>Sederhana</span> <br />
                                </span>
                            </div>
                            <div class="permohonan-s-p-container16">
                                <textarea class="input" name="keterangan" id="keterangan" cols="60" rows="3" placeholder="Keterangan"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="permohonan-s-p-container17" id="div_tabelSuratPesanan">
                        <div style="overflow: auto; width: 100%; margin-bottom: 1%;">
                            <table class="permohonan-s-p-table" id="list_view" name="list_view">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Nama Barang</th> {{-- 0 --}}
                                        <th>Kode Barang</th> {{-- 1 --}}
                                        <th>Harga Satuan</th> {{-- 2 --}}
                                        <th>Jumlah</th> {{-- 3 --}}
                                        <th>Terkirim</th>{{-- 4 --}}
                                        <th>Satuan</th> {{-- 5 --}}
                                        <th>Rencana Kirim</th> {{-- 6 --}}
                                        <th>Lunas</th> {{-- 7 --}}
                                        <th>PPN</th> {{-- 8 --}}
                                        <th>Jns SP</th> {{-- 9 --}}
                                        <th>IDPesanan</th> {{-- 10 --}}
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="permohonan-s-p-container18" id="div_detailSuratPesanan">
                        <div class="permohonan-s-p-container19"> <span>Jenis Brg</span> <span>Kat. Utama</span>
                            <span>Kategori</span> <span>Sub Kategori</span> <span>Nama Brg</span> <span>Kode
                                Brg</span>
                        </div>
                        <div class="permohonan-s-p-container20">
                            <div class="permohonan-s-p-container21"> <select name="jenis_brg" id="jenis_brg"
                                    class="form-control">
                                    <option disabled selected value>-- Pilih Jenis Barang --</option>
                                    @foreach ($jenis_brg as $data)
                                        <option value="{{ $data->IDJnsBrg }}">{{ $data->NamaJnsBrg }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="permohonan-s-p-container22">
                                <select name="kategori_utama" id="kategori_utama" class="form-control">
                                    <option disabled selected value>-- Pilih Kategori Utama --</option>
                                    @foreach ($kategori_utama as $data)
                                        <option value="{{ $data->no_kat_utama }}">{{ $data->nama_kat_utama }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="permohonan-s-p-container23">
                                <select name="kategori" id="kategori" class="form-control"></select>
                            </div>
                            <div class="permohonan-s-p-container24">
                                <select name="sub_kategori" id="sub_kategori" class="form-control"></select>
                            </div>
                            <div class="permohonan-s-p-container25">
                                <select name="nama_barang" id="nama_barang" class="form-control"></select>
                            </div>
                            <div class="permohonan-s-p-container26">
                                <input type="text" id="kode_barang" placeholder="Kode Barang"
                                    class="permohonan-s-p-textinput17 input" readonly />
                                <span id="enter_kodeBarang" style="display: none">Tekan Enter</span>
                            </div>
                        </div>
                        <div class="permohonan-s-p-container27">
                            <span>Qty Pesan</span>
                            <span>Harga Satuan</span>
                            <span>P P N</span>
                            <span id="lbl_lunas">Status Lunas</span>
                            <span id="jml_terkirim">Terkirim</span>
                        </div>
                        <div class="permohonan-s-p-container28">
                            <div class="permohonan-s-p-container29"> <input type="text" placeholder="Qty Pesan"
                                    class="permohonan-s-p-textinput18 input" id="qty_pesan" /> </div>
                            <div class="permohonan-s-p-container30"> <input type="text" placeholder="Harga Satuan"
                                    class="permohonan-s-p-textinput19 input" id="harga_satuan" /> </div>
                            {{-- <div class="permohonan-s-p-container31"> <input type="text" placeholder="P P N"
                                    class="permohonan-s-p-textinput20 input" id="ppn" /> </div> --}}
                            <div class="permohonan-s-p-container31">
                                <select name="ppn" id="ppn" class="permohonan-s-p-textinput20 input">
                                    <option value="0">0</option>
                                    <option value="INCLUDE">INCLUDE</option>
                                    <option value="EXCLUDE">EXCLUDE</option>
                                </select>
                            </div>
                            <div class="permohonan-s-p-container31"> <input type="text" placeholder="Belum Lunas"
                                    class="permohonan-s-p-textinput20 input" id="lunas" /> </div>
                            <div class="permohonan-s-p-container31"> <input type="text" placeholder="Jml Terkirim"
                                    class="permohonan-s-p-textinput20 input" id="terkirim" /> </div>
                        </div>
                        <div class="permohonan-s-p-container32"> <span>Satuan Jual</span> <span
                                class="permohonan-s-p-span1">Sat Gudang</span> <span>Rencana Kirim</span>
                        </div>
                        <div class="permohonan-s-p-container33">
                            <div class="permohonan-s-p-container34"> <select name="satuan_jual" id="satuan_jual"
                                    class="form-control">
                                    <option disabled selected value>-- Pilih Satuan Jual --</option>
                                    @foreach ($list_satuan as $data)
                                        <option value="{{ $data->No_satuan }}">{{ $data->Nama_satuan }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="permohonan-s-p-container35">
                                <input type="text" placeholder="Satuan Primer"
                                    class="permohonan-s-p-textinput22 input" id="satuan_primer" readonly />
                                <input type="text" placeholder="Satuan Sekunder"
                                    class="permohonan-s-p-textinput23 input" id="satuan_sekunder" readonly />
                                <input type="text" placeholder="Satuan Tritier"
                                    class="permohonan-s-p-textinput24 input" id="satuan_tritier" readonly />
                            </div>
                            <div class="permohonan-s-p-container36">
                                <input type="date" placeholder="Rencana Kirim"
                                    class="permohonan-s-p-textinput25 input" id="rencana_kirim" />
                            </div>
                        </div>
                        <div class="permohonan-s-p-container37">
                            <button class="permohonan-s-p-button11 button" id="add_button">Add</button>
                            <button class="permohonan-s-p-button12 button" id="update_button">Update</button>
                            <button class="permohonan-s-p-button13 button" id="delete_button">Delete</button>
                        </div>
                    </div>
                    <div class="permohonan-s-p-container61">
                        <button id="isi_button" class="permohonan-s-p-button14 button">
                            <span>Proses</span></button>
                        <button id="edit_button" class="permohonan-s-p-button16 button">
                            <span>Koreksi</span></button>
                        <button id="hapus_button" class="permohonan-s-p-button17 button" style="display: none">
                            <span>Hapus</span></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Kencana/permohonan-sp.js') }}"></script>
</div>
@endsection
