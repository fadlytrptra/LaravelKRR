@extends('layouts.appKencana')
@section('content')
@section('title', 'Terima Barang')

    <style>
        /* Warna link normal */
        #tableData tbody a.po-link {
            color: #0d6efd;
            text-decoration: underline;
        }

        /* Saat mouse diarahkan */
        #tableData tbody a.po-link:hover {
            color: #ffd700; /* kuning */
            text-decoration: underline;
        }

        /* Saat row dipilih */
        #tableData tbody tr.selected a.po-link {
            color: #ffffff;
        }

        /* Saat row dipilih dan mouse di atas link */
        #tableData tbody tr.selected a.po-link:hover {
            color: #ffd700;
        }
    </style>

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header" style="">Terima Barang</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="baris-1 pl-3" id="baris-1">
                            <div class="row mt-1 pt-2 pr-5">
                                <div class="col-sm-2">
                                    <label for="divisiId">Divisi</label>
                                </div>
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="divisiNama" name="divisiNama"
                                            disabled>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2 offset-sm-1">
                                    <label for="penerima">Penerima</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="penerima" name="penerima" readonly>
                                </div>
                            </div>

                            <div class="row mt-1 pr-5">
                                <div class="col-sm-2">
                                    <label for="objekId">Objek</label>
                                </div>
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_objek" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2 offset-sm-1">
                                    <label for="kelompokId">Kelompok</label>
                                </div>
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kelompokNama" name="kelompokNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_kelompok" class="btn btn-info" disabled>...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-1 pr-5 pb-2">
                                <div class="col-sm-2">
                                    <label for="kelutId">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kelutNama" name="kelutNama" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_kelut" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2 offset-sm-1">
                                    <label for="subkelId">Sub Kelompok</label>
                                </div>
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="subkelNama" name="subkelNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_subkel" class="btn btn-info" disabled>...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row" id="ids" style="display: none">
                            <div class="col-md-5 d-flex">
                                <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                                <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                                <input type="text" id="kelompokId" name="kelompokId" class="form-control" readonly>
                                <input type="text" id="kelutId" name="kelutId" class="form-control" readonly>
                                <input type="text" id="subkelId" name="subkelId" class="form-control" readonly>
                            </div>
                        </div>

                        <div class="baris-2 pl-3">
                            <div class="row pt-2">
                                <div class="col-sm-2">
                                    <label for="kodeTransaksi">Kode Transaksi</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kodeTransaksi" name="kodeTransaksi"
                                        readonly>
                                </div>
                                <div class="col-sm-2 offset-sm-1">
                                    <input type="text" class="form-control" id="tanggal" name="tanggal" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <label for="kodeTransaksi">No. PIB</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="pib" name="pib" readonly>
                                </div>
                            </div>
                            <div class="row mt-1">
                                <div class="col-sm-2">
                                    <label for="kodeBarang">Kode Barang</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kodeBarang" name="kodeBarang"
                                        readonly>
                                </div>
                                <div class="col-sm-1">
                                    <label for="kodeType">Kode Type</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kodeType" name="kodeType" readonly>
                                </div>
                            </div>
                            <div class="row mt-1">
                                <div class="col-sm-2">
                                    <label for="namaBarang">Nama Barang</label>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="namaBarang" name="namaBarang"
                                        readonly>
                                </div>
                            </div>
                            <div class="row mt-1">
                                <div class="col-sm-2 mb-2">
                                    <label>Jumlah Barang</label>
                                </div>

                                <div class="col-sm-1" style="margin-left: -5.25%">
                                    <label>Primer</label>
                                </div>
                                <div class="col-sm-2" style="margin-left: -3%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="primer" name="primer"
                                            readonly>
                                    </div>
                                </div>
                                <div class="col-sm-1" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanPrimer" name="satuanPrimer"
                                            readonly>
                                    </div>
                                </div>

                                <div class="col-sm-1">
                                    <label>Sekunder</label>
                                </div>
                                <div class="col-sm-2" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="sekunder" name="sekunder"
                                            readonly>
                                    </div>
                                </div>
                                <div class="col-sm-1" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanSekunder"
                                            name="satuanSekunder" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-1">
                                    <label>Tritier</label>
                                </div>
                                <div class="col-sm-2" style="margin-left: -3%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="tritier" name="tritier"
                                            readonly>
                                    </div>
                                </div>
                                <div class="col-sm-1" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanTritier"
                                            name="satuanTritier" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-1 pb-2">
                                <div class="col-sm-2">
                                    <label for="keterangan">Keterangan Pembelian</label>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="keterangan" name="keterangan"
                                        readonly>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="col-sm-12 mb-2">
                                <div class="table-responsive fixed-height">
                                    <table class="table table-bordered no-wrap-header" id="tableData">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-2 pl-3">
                            <input type="checkbox" name="centang" id="centang">
                            <label for="centang" id="centang"><i>Centang All</i></label>
                        </div>


                        <div class="row">
                            <div class="col-sm-2 offset-sm-1">
                                <button style="width: 75%" type="button" id="btn_proses" disabled
                                    class="btn btn-info">Proses</button>
                            </div>
                            <div class="col-sm-2 offset-sm-6">
                                <button style="width: 75%" type="button" id="btn_batal" disabled
                                    class="btn btn-info">Batal</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="{{ asset('css/Kencana/TerimaPurchasing.css') }}">
    <script src="{{ asset('js/Kencana/TerimaPurchasing.js') }}"></script>
    <script>const downloadPoUrl = "{{ route('TerimaPurchasing.downloadPdf', ['no_po' => '__NO_PO__']) }}";</script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
