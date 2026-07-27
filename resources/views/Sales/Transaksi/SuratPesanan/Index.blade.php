@extends('layouts.appSales') @section('content')
    @include('Sales.Transaksi.SuratPesanan.DetailSP'){{-- <script type="text/javascript"> $(function() { var table = $('.SP_datatable').DataTable({ processing: true, serverSide: true, ajax: "{{ url('SuratPesanan') }}", column: [{ data: 'IDSuratPesanan', name: 'IDSuratPesanan' }, { data: 'NamaCust', name: 'NamaCust' }, { data: 'JnsSuratPesanan', name: 'JnsSuratPesanan' }, { data: 'Tgl_Pesan', name: 'Tgl_Pesan' }, { data: 'action', name: 'action', orderable: false, searchable: false }, ] }); }); </script> --}} {{-- <script> $(document).ready(function() { $('#search-btn').click(function() { var search = $('#search').val(); $.ajax({ url: 'SuratPesanan', type: 'GET', data: { search: search }, success: function(data) { $('#data').html(data); } }); }); }); </script> --}}
    {{-- @include('Sales.Transaksi.SuratPesanan.ModalTambah') --}}
@section('title', 'Surat Pesanan Lokal')
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
            processing: true,
            serverSide: true,
            "ajax": {
                "url": "{{ url('splokal') }}",
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
                            {{-- @foreach ($data as $item)
                                    <tr> <td class="RDZPaddingTable RDZCenterTable"><a
                                                class="DetailSP"
                                                data-id="{{ $item->IDSuratPesanan }}">{{ $item->IDSuratPesanan }}</a> </td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->NamaCust }}</td>
                                        <td class="acs-td-button"> <button
                                                class="btn btn-sm btn-primary"
                                                onclick="openNewWindow('{{ url('SuratPesanan/' . $item->IDSuratPesanan . '/edit') }}')"
                                                href=""><span>&#x270E;</span> Koreksi</button>
                                            <form onsubmit="return confirm('Apakah Anda Yakin ?');"
                                                action="{{ route('suratpesanan.destroy', $item->IDSuratPesanan) }}"
                                                method="POST" enctype="multipart/form-data"> {{ csrf_field() }} <button
                                                    type="submit" class="btn btn-sm btn-danger"><span>&#x1F5D1;</span>
                                                    Hapus</button> </form>
                                        </td>
                                    </tr>
                                @endforeach --}}
                        </tbody>
                    </table>
                    {{-- <button class="btn btn-info" onclick="openNewWindow('PenyesuaianSuratPesanan/A10830A/edit')">EDIT</button> --}}
                    {{-- <div>{{ $data->links('pagination::bootstrap-5') }}</div> ->appends($request->except('page')) --}}
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
                    action="{{ url('SuratPesanan') }}">
                    {{ csrf_field() }}
                    <div class="permohonan-s-p-container01" id="div_headerSuratPesanan">
                        <div class="permohonan-s-p-container02"> <span class="permohonan-s-p-text">Tgl
                                Pesan</span>{{-- <span
                            class="permohonan-s-p-text01">Jenis SP</span> --}}
                            <span permohonan-s-p-text03 style="display: none" id="lbl_sp">Nomor SP</span>
                            <span class="permohonan-s-p-text02">Customer</span> <span class="permohonan-s-p-text03">No.
                                PO</span>
                            <span class="permohonan-s-p-text04">Tgl. PO</span> <span class="permohonan-s-p-text05">No.
                                PI</span>
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
                                    id="no_spText" name="no_spText" style="display: none" readonly />
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
                                        <option value="{{ trim($parts[1]) }}">{{ $data->NamaCust }} |
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
                            <span class="permohonan-s-p-text07">Mata Uang</span>
                            <span class="permohonan-s-p-text08">Jns Bayar</span>
                            <span class="permohonan-s-p-text09">Syarat Bayar</span>
                            <span class="permohonan-s-p-text10">Keterangan</span>
                            <span class="permohonan-s-p-text13">Keterangan SKBDN</span>
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
                            <div class="permohonan-s-p-container16">
                                <textarea class="input" name="keteranganSKBDN" id="keteranganSKBDN" cols="60" rows="3" placeholder="Keterangan SKBDN"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="permohonan-s-p-container17" id="div_tabelSuratPesanan">
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
                                    <th>B.Karung</th> {{-- 9 --}}
                                    <th>In.Karung</th> {{-- 10 --}}
                                    <th>Bi.Karung</th>{{-- 11 --}}
                                    <th>B.Inner</th> {{-- 12 --}}
                                    <th>In.Inner</th> {{-- 13 --}}
                                    <th>Bi.Inner</th>{{-- 14 --}}
                                    <th>B.Lami</th> {{-- 15 --}}
                                    <th>In.Lami</th> {{-- 16 --}}
                                    <th>Bi.Lami</th>{{-- 17 --}}
                                    <th>B.OPP</th> {{-- 18 --}}
                                    <th>In.OPP</th> {{-- 19 --}}
                                    <th>Bi.OPP</th> {{-- 20 --}}
                                    <th>B.Kertas</th> {{-- 21 --}}
                                    <th>In.Kertas</th> {{-- 22 --}}
                                    <th>Bi.Kertas</th>{{-- 23 --}}
                                    <th>Bi.Lain2</th> {{-- 24 --}}
                                    <th>BS.Total</th> {{-- 25 --}}
                                    <th>Total Cost</th> {{-- 26 --}}
                                    <th>B.KarungMTR</th>{{-- 27 --}}
                                    <th>B.InnerMTR</th>{{-- 28 --}}
                                    <th>B.LamiMTR</th>{{-- 29 --}}
                                    <th>B.OPPMTR</th> {{-- 30 --}}
                                    <th>B.KertasMTR</th> {{-- 31 --}}
                                    <th>BS.TotalMTR</th> {{-- 32 --}}
                                    <th>Jns SP</th> {{-- 33 --}}
                                    <th>IDPesanan</th> {{-- 34 --}}
                                    <th>Informasi Tambahan</th> {{-- 35 --}}
                                </tr>
                            </thead>
                        </table>
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
                        <div class="permohonan-s-p-container27"> <span>Qty Pesan</span> <span>Harga
                                Satuan</span> <span>P P
                                N</span> <span id="lbl_lunas">Status Lunas</span><span id="lbl_informasi">Informasi
                                Tambahan</span><span id="jml_terkirim">Terkirim</span></div>
                        <div class="permohonan-s-p-container28">
                            <div class="permohonan-s-p-container29"> <input type="text" placeholder="Qty Pesan"
                                    class="permohonan-s-p-textinput18 input" id="qty_pesan" /> </div>
                            <div class="permohonan-s-p-container30"> <input type="text" placeholder="Harga Satuan"
                                    class="permohonan-s-p-textinput19 input" id="harga_satuan" /> </div>
                            <div class="permohonan-s-p-container31"> <input type="text" placeholder="P P N"
                                    class="permohonan-s-p-textinput20 input" id="ppn" /> </div>
                            <div class="permohonan-s-p-container31"> <input type="text" placeholder="Belum Lunas"
                                    class="permohonan-s-p-textinput20 input" id="lunas" /> </div>
                            <div class="permohonan-s-p-container31">
                                <textarea name="informasi_tambahan" id="informasi_tambahan" cols="20" rows="2"></textarea>
                            </div>
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
                    <div id="div_beratStandard" class="acs-div-beratStandard">
                        <div class="acs-div-beratStandard1">
                            <label>Berat Standart (Gram) - Index Harga</label>
                            <div>
                                <div class="d-flex" style="gap: 0.5%;width: 100%">
                                    <div class="form-group"style="flex: 0.16;align-content:center;">
                                        <label for="berat_karung" style="margin: 0;margin-bottom: 10%">Berat Karung:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.2">
                                        <div class="input-group">
                                            <input type="number" name="berat_karung" id="berat_karung"
                                                class="form-control" min="0" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group"style="flex: 0.01">
                                        <label style="font-size: 22px;"><b>X</b></label>
                                    </div>
                                    <div class="form-group"style="flex: 0.2">
                                        <div class="input-group">
                                            <input type="number" name="index_karung" id="index_karung"
                                                placeholder="Index Karung" class="form-control" min="0"
                                                readonly>
                                        </div>
                                    </div>
                                    <div class="form-group"style="flex: 0.01">
                                        <label style="font-size: 22px;"><b>=</b></label>
                                    </div>
                                    <div class="form-group"style="flex: 0.25">
                                        <div class="input-group">
                                            <input type="number" name="berat_indexKarung" id="berat_indexKarung"
                                                placeholder="Berat Index Karung" class="form-control" min="0"
                                                readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex" style="gap: 0.5%;width: 100%">
                                    <div class="form-group"style="flex: 0.16;align-content:center;">
                                        <label for="berat_inner" style="margin: 0;margin-bottom: 10%">Berat Inner:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.2">
                                        <div class="input-group">
                                            <input type="number" name="berat_inner" id="berat_inner"
                                                class="form-control" min="0" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group"style="flex: 0.01">
                                        <label style="font-size: 22px;"><b>X</b></label>
                                    </div>
                                    <div class="form-group"style="flex: 0.2">
                                        <div class="input-group">
                                            <input type="number" name="index_inner" id="index_inner"
                                                placeholder="Index Inner" class="form-control" min="0"
                                                readonly>
                                        </div>
                                    </div>
                                    <div class="form-group"style="flex: 0.01">
                                        <label style="font-size: 22px;"><b>=</b></label>
                                    </div>
                                    <div class="form-group"style="flex: 0.25">
                                        <div class="input-group">
                                            <input type="number" name="berat_indexInner" id="berat_indexInner"
                                                placeholder="Berat Index Inner" class="form-control" min="0"
                                                readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex" style="gap: 0.5%;width: 100%">
                                    <div class="form-group"style="flex: 0.16;align-content:center;">
                                        <label for="berat_lami" style="margin: 0;margin-bottom: 10%">Berat Lami:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.2">
                                        <div class="input-group">
                                            <input type="number" name="berat_lami" id="berat_lami"
                                                class="form-control" min="0" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group"style="flex: 0.01">
                                        <label style="font-size: 22px;"><b>X</b></label>
                                    </div>
                                    <div class="form-group"style="flex: 0.2">
                                        <div class="input-group">
                                            <input type="number" name="index_lami" id="index_lami"
                                                placeholder="Index Lami" class="form-control" min="0"
                                                readonly>
                                        </div>
                                    </div>
                                    <div class="form-group"style="flex: 0.01">
                                        <label style="font-size: 22px;"><b>=</b></label>
                                    </div>
                                    <div class="form-group"style="flex: 0.25">
                                        <div class="input-group">
                                            <input type="number" name="berat_indexLami" id="berat_indexLami"
                                                placeholder="Berat Index Lami" class="form-control" min="0"
                                                readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex" style="gap: 0.5%;width: 100%">
                                    <div class="form-group"style="flex: 0.16;align-content:center;">
                                        <label for="berat_opp" style="margin: 0;margin-bottom: 10%">Berat OPP:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.2">
                                        <div class="input-group">
                                            <input type="number" name="berat_opp" id="berat_opp"
                                                class="form-control" min="0" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group"style="flex: 0.01">
                                        <label style="font-size: 22px;"><b>X</b></label>
                                    </div>
                                    <div class="form-group"style="flex: 0.2">
                                        <div class="input-group">
                                            <input type="number" name="index_opp" id="index_opp"
                                                placeholder="Index OPP" class="form-control" min="0" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group"style="flex: 0.01">
                                        <label style="font-size: 22px;"><b>=</b></label>
                                    </div>
                                    <div class="form-group"style="flex: 0.25">
                                        <div class="input-group">
                                            <input type="number" name="berat_indexOpp" id="berat_indexOpp"
                                                placeholder="Berat Index OPP" class="form-control" min="0"
                                                readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex" style="gap: 0.5%;width: 100%">
                                    <div class="form-group"style="flex: 0.16;align-content:center;">
                                        <label for="berat_kertas" style="margin: 0;margin-bottom: 10%">Berat Kertas:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.2">
                                        <div class="input-group">
                                            <input type="number" name="berat_kertas" id="berat_kertas"
                                                class="form-control" min="0" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group"style="flex: 0.01">
                                        <label style="font-size: 22px;"><b>X</b></label>
                                    </div>
                                    <div class="form-group"style="flex: 0.2">
                                        <div class="input-group">
                                            <input type="number" name="index_kertas" id="index_kertas"
                                                placeholder="Index Kertas" class="form-control" min="0"
                                                readonly>
                                        </div>
                                    </div>
                                    <div class="form-group"style="flex: 0.01">
                                        <label style="font-size: 22px;"><b>=</b></label>
                                    </div>
                                    <div class="form-group"style="flex: 0.25">
                                        <div class="input-group">
                                            <input type="number" name="berat_indexKertas" id="berat_indexKertas"
                                                placeholder="Berat Index Kertas" class="form-control" min="0"
                                                readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex" style="gap: 0.5%;width: 100%">
                                    <div class="form-group"style="flex: 0.16;align-content:center;">
                                        <label for="berat_standardTotal" style="margin: 0;margin-bottom: 10%">Berat
                                            Standard Total:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.2">
                                        <div class="input-group">
                                            <input type="number" name="berat_standardTotal" id="berat_standardTotal"
                                                class="form-control" min="0" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group"style="flex: 0.125"></div>
                                    <div class="form-group"style="flex: 0.1;align-content:center;">
                                        <label for="biaya_lain" style="margin: 0;margin-bottom: 10%">Biaya Lain2:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.25">
                                        <div class="input-group">
                                            <input type="number" name="biaya_lain" id="biaya_lain"
                                                class="form-control" min="0" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex" style="gap: 0.5%;width: 100%">
                                    <div class="form-group"style="flex: 0.485"></div>
                                    <div class="form-group"style="flex: 0.1;align-content:center;">
                                        <label for="total_cost" style="margin: 0;margin-bottom: 10%">Total Cost:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.25">
                                        <div class="input-group">
                                            <input type="number" name="total_cost" id="total_cost"
                                                class="form-control" min="0" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="div_beratStandardMeter" class="acs-div-beratStandard2">
                            <label>Berat Standard (MTR)</label>
                            <div>
                                <div class="d-flex" style="gap: 0.5%;width: 100%">
                                    <div class="form-group"style="flex: 0.25;align-content:center;">
                                        <label for="berat_karungMeter" style="margin: 0;margin-bottom: 10%">Berat
                                            Karung:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.75">
                                        <div class="input-group">
                                            <input type="number" name="berat_karungMeter" id="berat_karungMeter"
                                                class="form-control" min="0">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex" style="gap: 0.5%;width: 100%">
                                    <div class="form-group"style="flex: 0.25;align-content:center;">
                                        <label for="berat_innerMeter" style="margin: 0;margin-bottom: 10%">Berat
                                            Inner:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.75">
                                        <div class="input-group">
                                            <input type="number" name="berat_innerMeter" id="berat_innerMeter"
                                                class="form-control" min="0">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex" style="gap: 0.5%;width: 100%">
                                    <div class="form-group"style="flex: 0.25;align-content:center;">
                                        <label for="berat_lamiMeter" style="margin: 0;margin-bottom: 10%">Berat Lami:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.75">
                                        <div class="input-group">
                                            <input type="number" name="berat_lamiMeter" id="berat_lamiMeter"
                                                class="form-control" min="0">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex" style="gap: 0.5%;width: 100%">
                                    <div class="form-group"style="flex: 0.25;align-content:center;">
                                        <label for="berat_oppMeter" style="margin: 0;margin-bottom: 10%">Berat OPP:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.75">
                                        <div class="input-group">
                                            <input type="number" name="berat_oppMeter" id="berat_oppMeter"
                                                class="form-control" min="0">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex" style="gap: 0.5%;width: 100%">
                                    <div class="form-group"style="flex: 0.25;align-content:center;">
                                        <label for="berat_kertasMeter" style="margin: 0;margin-bottom: 10%">Berat
                                            Kertas:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.75">
                                        <div class="input-group">
                                            <input type="number" name="berat_kertasMeter" id="berat_kertasMeter"
                                                class="form-control" min="0">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex" style="gap: 0.5%;width: 100%">
                                    <div class="form-group"style="flex: 0.25;align-content:center;">
                                        <label for="berat_standardTotalMeter" style="margin: 0;margin-bottom: 10%">BS
                                            Total:
                                        </label>
                                    </div>
                                    <div class="form-group"style="flex: 0.75">
                                        <div class="input-group">
                                            <input type="number" name="berat_standardTotalMeter"
                                                id="berat_standardTotalMeter" class="form-control" min="0"
                                                readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="div_saldoInventory">
                        <span>Saldo Inventory</span>
                        <table id="table_saldoInventory" class="permohonan-s-p-table" style="cursor: default">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Divisi</th>
                                    <th>Saldo Tritier</th>
                                    <th>Sat. Tritier</th>
                                    <th>Saldo Sekunder</th>
                                    <th>Sat. Sekunder</th>
                                    <th>Saldo Primer</th>
                                    <th>Sat. Primer</th>
                                    <th>Objek</th>
                                    <th>Kel. Utama</th>
                                    <th>Kelompok</th>
                                    <th>Sub Kelompok</th>
                                </tr>
                            </thead>
                        </table>
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
    <script type="text/javascript" src="{{ asset('js/Sales/permohonan-sp.js') }}"></script>
</div>
@endsection
