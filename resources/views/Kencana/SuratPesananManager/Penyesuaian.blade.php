@extends('layouts.appKencana') @section('content')
@section('title', 'Penyesuaian SP Lokal Kencana')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/Kencana/permohonan-s-p.css') }}" rel="stylesheet">
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
                    <div class="card-header">Penyesuaian Surat Pesanan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="permohonan-s-p-container">
                            <form class="permohonan-s-p-form" id="form_suratPesanan" method="POST"
                                action="{{ url('/penyesuaiansp/koreksi') }}">
                                {{ csrf_field() }}
                                <div class="permohonan-s-p-container01" id="div_headerSuratPesanan">
                                    <div class="permohonan-s-p-container02"> <span class="permohonan-s-p-text">Tgl
                                            Pesan</span>
                                        <span permohonan-s-p-text03>Nomor SP</span>
                                        <span class="permohonan-s-p-text02">Customer</span> <span
                                            class="permohonan-s-p-text03">No. PO</span>
                                        <span class="permohonan-s-p-text04">Tgl. PO</span> <span
                                            class="permohonan-s-p-text05">No. PI</span>
                                    </div>
                                    <div class="permohonan-s-p-container03">
                                        <div class="permohonan-s-p-container04"> <input type="date" id="tgl_pesan"
                                                name="tgl_pesan" placeholder="placeholder"
                                                class="permohonan-s-p-textinput input" />
                                            <select name="jenis_sp" id="jenis_sp" class="form-control">
                                                <option disabled selected value>-- Pilih Jenis SP --</option>
                                                @foreach ($jenis_sp as $data)
                                                    <option value="{{ $data->IDJnsSuratPesanan }}">
                                                        {{ $data->JnsSuratPesanan }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="permohonan-s-p-container05" style="margin: 1%">
                                            <input type="text" placeholder="Nomor SP"
                                                class="permohonan-s-p-textinput04 input" id="no_spText" name="no_spText"
                                                readonly />
                                        </div>
                                        <div class="permohonan-s-p-container06"> <select name="list_customer"
                                                id="list_customer" class="form-control">
                                                <option disabled selected value>-- Pilih Customer --</option>
                                                @foreach ($list_customer as $data)
                                                    @php
                                                        $companyName = trim(substr($data->IDCust, strpos($data->IDCust, '-') + 1));
                                                    @endphp
                                                    <option value="{{ $companyName }}">{{ $data->NamaCust }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="permohonan-s-p-container07"> <input type="text"
                                                placeholder="Nomor PO" class="permohonan-s-p-textinput46 input"
                                                id="no_po" name="no_po" /> </div>
                                        <div class="permohonan-s-p-container08"> <input type="date" id="tgl_po"
                                                name="tgl_po" placeholder="placeholder"
                                                class="permohonan-s-p-textinput05 input" /> </div>
                                        <div class="permohonan-s-p-container09"> <input type="text"
                                                placeholder="Nomor PI" class="permohonan-s-p-textinput06 input"
                                                id="no_pi" name="no_pi" /> </div>
                                    </div>
                                    <div class="permohonan-s-p-container10"> <span
                                            class="permohonan-s-p-text06">Sales</span> <span
                                            class="permohonan-s-p-text07">Mata Uang</span> <span
                                            class="permohonan-s-p-text08">Jns
                                            Bayar</span> <span class="permohonan-s-p-text09">Syarat Bayar</span> <span
                                            class="permohonan-s-p-text10">Keterangan</span> </div>
                                    <div class="permohonan-s-p-container11">
                                        <div class="permohonan-s-p-container12"> <select name="list_sales" id="list_sales"
                                                class="form-control">
                                                <option disabled selected value>-- Pilih Sales --</option>
                                                @foreach ($list_sales as $data)
                                                    <option value="{{ $data->IDSales }}">{{ $data->NamaSales }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="permohonan-s-p-container13"> <input type="text"
                                                placeholder="Mata Uang" class="permohonan-s-p-textinput08 input"
                                                id="mata_uang" name="mata_uang" /> </div>
                                        <div class="permohonan-s-p-container14"> <select name="jenis_bayar" id="jenis_bayar"
                                                class="form-control">
                                                <option disabled selected value>-- Pilih Jenis Bayar --</option>
                                                @foreach ($jenis_bayar as $data)
                                                    <option value="{{ $data->IdPembayaran }}">{{ $data->NamaPembayaran }}
                                                    </option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="permohonan-s-p-container15"> <input type="text"
                                                class="permohonan-s-p-textinput10 input" id="syarat_bayar"
                                                name="syarat_bayar" placeholder="0" /> <span class="permohonan-s-p-text11">
                                                <span>Hari</span> <br /> </span>
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
                                    <table class="permohonan-s-p-table" id="list_view" name="list_view">
                                        <thead class="thead-light">
                                            <tr>
                                                <th>Nama Barang</th>
                                                <th>Kode Barang</th>
                                                <th>Harga Satuan</th>
                                                <th>Jumlah</th>
                                                <th>Satuan</th>
                                                <th>Rencana Kirim</th>
                                                <th>Lunas</th>
                                                <th>PPN</th>
                                                <th>B.Karung</th>
                                                <th>In.Karung</th>
                                                <th>Bi.Karung</th>
                                                <th>B.Inner</th>
                                                <th>In.Inner</th>
                                                <th>Bi.Inner</th>
                                                <th>B.Lami</th>
                                                <th>In.Lami</th>
                                                <th>Bi.Lami</th>
                                                <th>B.Kertas</th>
                                                <th>In.Kertas</th>
                                                <th>Bi.Kertas</th>
                                                <th>Bi.Lain2</th>
                                                <th>BS.Total</th>
                                                <th>Total Cost</th>
                                                <th>B.KarungMTR</th>
                                                <th>B.InnerMTR</th>
                                                <th>B.LamiMTR</th>
                                                <th>B.KertasMTR</th>
                                                <th>BS.TotalMTR</th>
                                                <th>Jns SP</th>
                                                <th>IDPesanan</th>
                                                <th>Informasi Tambahan</th>
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
                                            Satuan</span> <span>P P N</span> <span>Status Lunas</span> <span>Informasi
                                            Tambahan</span></div>
                                    <div class="permohonan-s-p-container28">
                                        <div class="permohonan-s-p-container29"> <input type="text"
                                                placeholder="Qty Pesan" class="permohonan-s-p-textinput18 input"
                                                id="qty_pesan" /> </div>
                                        <div class="permohonan-s-p-container30"> <input type="text"
                                                placeholder="Harga Satuan" class="permohonan-s-p-textinput19 input"
                                                id="harga_satuan" /> </div>
                                        <div class="permohonan-s-p-container31"> <input type="text"
                                                placeholder="P P N" class="permohonan-s-p-textinput20 input"
                                                id="ppn" readonly /> </div>
                                        <div class="permohonan-s-p-container31"> <input type="text"
                                                placeholder="Belum Lunas" class="permohonan-s-p-textinput20 input"
                                                id="status_lunas" /> </div>
                                        <div class="permohonan-s-p-container31">
                                            <textarea name="informasi_tambahan" id="informasi_tambahan" cols="20" rows="2"></textarea>
                                        </div>
                                    </div>
                                    <div class="permohonan-s-p-container32"> <span>Satuan Jual</span> <span
                                            class="permohonan-s-p-span1">Sat Gudang</span> <span>Rencana Kirim</span>
                                    </div>
                                    <div class="permohonan-s-p-container33">
                                        <div class="permohonan-s-p-container34"> <select name="satuan_jual"
                                                id="satuan_jual" class="form-control">
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
                                        <span>Berat Standart (KGM) - Index Harga</span>
                                        <br>
                                        <br>
                                        <div class="permohonan-s-p-container38">
                                            <div class="permohonan-s-p-container39"> <span>Berat Karung:</span> <span>Berat
                                                    Inner:</span>
                                                <span>Berat Lami:</span> <span>Berat Kertas:</span> <span
                                                    class="permohonan-s-p-text45">BS
                                                    Total:</span>
                                            </div>
                                            <div class="permohonan-s-p-container40">
                                                <div class="permohonan-s-p-container41"> <input type="text"
                                                        placeholder="Berat Karung"
                                                        class="permohonan-s-p-textinput26 input" id="berat_karung"
                                                        readonly /> </div>
                                                <div class="permohonan-s-p-container42"> <input type="text"
                                                        placeholder="Berat Inner" class="permohonan-s-p-textinput27 input"
                                                        id="berat_inner" readonly /> </div>
                                                <div class="permohonan-s-p-container43"> <input type="text"
                                                        placeholder="Berat Lami" class="permohonan-s-p-textinput28 input"
                                                        id="berat_lami" readonly /> </div>
                                                <div class="permohonan-s-p-container44"> <input type="text"
                                                        placeholder="Berat Kertas"
                                                        class="permohonan-s-p-textinput29 input" id="berat_kertas"
                                                        readonly /> </div>
                                                <div class="permohonan-s-p-container45"> <input type="text"
                                                        placeholder="BS Total" class="permohonan-s-p-textinput30 input"
                                                        id="berat_standardTotal" readonly /> </div>
                                            </div>
                                            <div class="permohonan-s-p-container46"> <span>X</span> <span>X</span>
                                                <span>X</span>
                                                <span>X</span>
                                            </div>
                                            <div class="permohonan-s-p-container47"> <span>Index Karung</span> <span>Index
                                                    Inner</span>
                                                <span>Index Lami</span> <span>Index Kertas</span>
                                            </div>
                                            <div class="permohonan-s-p-container48">
                                                <div class="permohonan-s-p-container49"> <input type="text"
                                                        placeholder="Index Karung"
                                                        class="permohonan-s-p-textinput31 input" id="index_karung"
                                                        readonly /> </div>
                                                <div class="permohonan-s-p-container50"> <input type="text"
                                                        placeholder="Index Inner" class="permohonan-s-p-textinput32 input"
                                                        id="index_inner" readonly /> </div>
                                                <div class="permohonan-s-p-container51"> <input type="text"
                                                        placeholder="Index Lami" class="permohonan-s-p-textinput33 input"
                                                        id="index_lami" readonly /> </div>
                                                <div class="permohonan-s-p-container52"> <input type="text"
                                                        placeholder="Index Kertas"
                                                        class="permohonan-s-p-textinput34 input" id="index_kertas"
                                                        readonly /> </div>
                                            </div>
                                            <div class="permohonan-s-p-container53"> <span>=</span> <span>=</span>
                                                <span>=</span>
                                                <span>=</span> <span class="permohonan-s-p-text58">Biaya Lain2:</span>
                                                <span class="permohonan-s-p-text59">Total Cost:</span>
                                            </div>
                                            <div class="permohonan-s-p-container54">
                                                <div class="permohonan-s-p-container55"> <input type="text"
                                                        placeholder="Berat Index Karung"
                                                        class="permohonan-s-p-textinput35 input" id="berat_indexKarung"
                                                        readonly /> </div>
                                                <div class="permohonan-s-p-container56"> <input type="text"
                                                        placeholder="Berat Index Inner"
                                                        class="permohonan-s-p-textinput36 input" id="berat_indexInner"
                                                        readonly /> </div>
                                                <div class="permohonan-s-p-container57"> <input type="text"
                                                        placeholder="Berat Index Lami"
                                                        class="permohonan-s-p-textinput37 input" id="berat_indexLami"
                                                        readonly /> </div>
                                                <div class="permohonan-s-p-container58"> <input type="text"
                                                        placeholder="Berat Index Kertas"
                                                        class="permohonan-s-p-textinput38 input" id="berat_indexKertas"
                                                        readonly /> </div>
                                                <div class="permohonan-s-p-container59"> <input type="text"
                                                        placeholder="Biaya Lain2" class="permohonan-s-p-textinput39 input"
                                                        id="biaya_lain" readonly /> </div>
                                                <div class="permohonan-s-p-container60"> <input type="text"
                                                        placeholder="Total Cost" class="permohonan-s-p-textinput40 input"
                                                        id="total_cost" readonly /> </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="div_beratStandardMeter" class="acs-div-beratStandard2">
                                        <span>Berat Standard (MTR)</span>
                                        <br>
                                        <br>
                                        <div class="permohonan-s-p-container62">
                                            <div class="permohonan-s-p-container63"> <span>Berat Karung:</span> <span>Berat
                                                    Inner:</span>
                                                <span>Berat Lami:</span> <span>Berat Kertas:</span> <span
                                                    class="permohonan-s-p-text67">BS
                                                    Total:</span>
                                            </div>
                                            <div class="permohonan-s-p-container64">
                                                <div class="permohonan-s-p-container65"> <input type="text"
                                                        placeholder="Berat Karung"
                                                        class="permohonan-s-p-textinput41 input" id="berat_karungMeter" />
                                                </div>
                                                <div class="permohonan-s-p-container66"> <input type="text"
                                                        placeholder="Berat Inner" class="permohonan-s-p-textinput42 input"
                                                        id="berat_innerMeter" /> </div>
                                                <div class="permohonan-s-p-container67"> <input type="text"
                                                        placeholder="Berat Lami" class="permohonan-s-p-textinput43 input"
                                                        id="berat_lamiMeter" /> </div>
                                                <div class="permohonan-s-p-container68"> <input type="text"
                                                        placeholder="Berat Kertas"
                                                        class="permohonan-s-p-textinput44 input" id="berat_kertasMeter" />
                                                </div>
                                                <div class="permohonan-s-p-container69"> <input type="text"
                                                        placeholder="BS Total" class="permohonan-s-p-textinput45 input"
                                                        id="berat_standardTotalMeter" /> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="div_saldoInventory">
                                    <span>Saldo Inventory</span>
                                    <table id="table_saldoInventory" class="permohonan-s-p-table"
                                        style="cursor: default">
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
                                    <button id="koreksi_button" class="permohonan-s-p-button14 button">
                                        <span>Koreksi</span></button>
                                    <button id="batal_spButton" class="permohonan-s-p-button16 button">
                                        <span>Batal SP</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Kencana/penyesuaian-sp.js') }}"></script>
@endsection
