@extends('layouts.app') @section('content')
@section('title', 'Edit SJ')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/Kencana/permohonan-sj.css') }}" rel="stylesheet">
    @php
        $data_headerEncode = json_encode($DisplayDataHeader);
        $data_headerArray = json_decode($data_headerEncode, true);
        $data_detailEncode = json_encode($DisplayDataDetail);
        $data_detailArray = json_decode($data_detailEncode, true);
        print $data_headerEncode;
    @endphp
    <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="permohonan-sj-container">
            <form method="POST" enctype="multipart/form-data" class="permohonan-sj-form" action="{{ url('Kencana/SuratJalan') }}">
                {{ csrf_field() }}
                {!! Form::hidden('customer', $data_headerArray[0]['IDCust'], ['id' => 'customer_edit']) !!}
                {!! Form::hidden('surat_pesanan', $data_detailArray[0]['IDSuratPesanan'], ['id' => 'surat_pesanan_edit']) !!}
                <div class="permohonan-sj-container01">
                    <span>Jenis Pengiriman</span>
                    <select class="permohonan-sj-select input" name="jenis_pengiriman" id="jenis_pengiriman">
                        <option disabled selected>-- Pilih Jenis Pengiriman --</option>
                        @foreach ($jenisPengiriman as $data)
                            <option
                                value="{{ $data->IDJnsSuratJalan }}"{{ $data_headerArray[0]['JnsIdPengiriman'] == $data->IDJnsSuratJalan ? 'selected' : '' }}>
                                {{ $data->NamaJnsSuratJalan }}</option>
                        @endforeach
                    </select>
                    <span>Keterangan</span>
                    <textarea placeholder="Keterangan" id="keterangan" name="keterangan" class="permohonan-sj-textarea textarea">{{ $data_headerArray[0]['Ket'] }}</textarea>
                </div>
                <div class="permohonan-sj-container02">
                    <span>Surat Jalan</span>
                    <input type="text" id="surat_jalan" name="surat_jalan" placeholder="Surat Jalan" class="input"
                        value="{{ $data_headerArray[0]['IDPengiriman'] }}" readonly />
                    <span>Truk Nopol</span>
                    <input type="text" id="truk_nopol" name="truk_nopol" placeholder="Truk Nopol" class="input"
                        value="{{ $data_headerArray[0]['TrukNopol'] }}" />
                </div>
                <div class="permohonan-sj-container03">
                    <span>Tanggal</span>
                    <input type="date" id="tanggal" name="tanggal" class="input"
                        value="{{ date('Y-m-d', strtotime($data_headerArray[0]['Tanggal'])) }}" />
                    <span>Biaya</span>
                    <input type="text" id="biaya" name="biaya" placeholder="0" class="input"
                        value="{{ $data_headerArray[0]['Biaya'] }}" />
                </div>
                <div class="permohonan-sj-container04">
                    <span>Tanggal Actual</span>
                    <input type="date" id="tanggal_actual" name="tanggal_actual" class="input"
                        value="" />
                    <span>No. Container</span>
                    <input type="text" placeholder="No. Container" id="nomor_container" name="nomor_container"
                        class="input" value="" />
                </div>
                <div class="permohonan-sj-container05">
                    <span>Customer</span>
                    <select class="permohonan-sj-select1 input" id="customer" name="customer">
                        <option disabled selected>-- Pilih Customer--</option>
                        @foreach ($customer as $data)
                            @php
                                $IDCust = explode(' - ', $data->IdCust);
                                // $IDCust = trim(substr($data->IdCust, strpos($data->IdCust, '-')));
                            @endphp
                            <option value="{{ $IDCust[0] }}">{{ $data->NamaCust }}</option>
                        @endforeach
                    </select>
                    <span>No. Seal</span>
                    <input type="text" placeholder="No. Seal" class="input" id="nomor_seal" name="nomor_seal" />
                </div>
                <div class="permohonan-sj-container06">
                    <span>Expeditor</span>
                    <select class="permohonan-sj-select2 input" id="expeditor" name="expeditor">
                        <option disabled selected>-- Pilih Expeditor--</option>
                        @foreach ($expeditor as $data)
                            <option
                                value="{{ $data->IDEXPEDITOR }}"{{ $data_headerArray[0]['IDExpeditor'] == $data->IDEXPEDITOR ? 'selected' : '' }}>
                                {{ $data->NAMAEXPEDITOR }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="permohonan-sj-container07">
                    <table class="permohonan-sj-table" id="list_view" name="list_view">
                        <thead class="thead-light">
                            <tr>
                                <th>No. DO</th>
                                <th>Uraian</th>
                                <th>No. Trans</th>
                                <th>Surat Pesanan</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                foreach ($data_detailArray as $row) {
                                    $i = 0;
                                    echo '<tr class="acs-tr-hover">';
                                    echo '<td class="acs-tr-hover">';
                                    echo '<input type="text" readonly="true" value="'.$row['IDDO'].'" class="acs-input-table" name="barang'.$i.'[]"></td>';
                                    $i++;
                                    echo '<td class="acs-tr-hover">';
                                    echo '<input type="text" readonly="true" value="'.$row['Uraian'].'" class="acs-input-table" name="barang'.$i.'[]"></td>';
                                    $i++;
                                    echo '<td class="acs-tr-hover">';
                                    echo '<input type="text" readonly="true" value="'.$row['IDDetailKirim'].'" class="acs-input-table" name="barang'.$i.'[]"></td>';
                                    $i++;
                                    echo '<td class="acs-tr-hover">';
                                    echo '<input type="text" readonly="true" value="'.$row['IDSuratPesanan'].'" class="acs-input-table" name="barang'.$i.'[]"></td>';
                                    echo '</tr>';
                                }
                            @endphp
                        </tbody>
                    </table>
                </div>
                <div class="permohonan-sj-container08">
                    <div class="permohonan-sj-container09">
                        <span>Surat Pesanan</span>
                        <select class="permohonan-sj-select3 input" id="surat_pesanan" name="surat_pesanan">
                            <option disabled selected>-- Pilih Jenis Pengiriman --</option>
                        </select>
                    </div>
                    <div class="permohonan-sj-container10">
                        <span>Nomor DO</span>
                        <select class="permohonan-sj-select4 input" id="nomor_do" name="nomor_do">
                            <option disabled selected>-- Pilih Jenis Pengiriman --</option>
                        </select>
                    </div>
                    <div class="permohonan-sj-container11">
                        <span>Uraian</span>
                        <textarea id="uraian" name="uraian" placeholder="Uraian" class="permohonan-sj-textarea1 textarea"></textarea>
                    </div>
                    <div class="permohonan-sj-container12">
                        <button id="add_item" name="add_item" type="button" class="button">
                            Add Item
                        </button>
                        <button id="remove_item" name="remove_item" type="button" class="button">
                            Remove Item
                        </button>
                    </div>
                </div>
                <button id="submit" name="submit" type="submit" class="permohonan-sj-button2 button">
                    Submit
                </button>
            </form>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Kencana/permohonan-s-j edit.js') }}"></script>
@endsection
