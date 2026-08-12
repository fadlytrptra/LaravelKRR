@extends('layouts.appKencana')
@section('title', 'Permohonan Pembelian')

@section('content')

<style>
    #tableSPPB tbody tr{
        cursor:pointer;
    }

    #tableSPPB tbody tr.table-active{
        background:#cce5ff;
    }

    .card{
        border-radius:4px;
    }

    .table td,
    .table th{
        vertical-align:middle;
        font-size:13px;
    }
    .modal-permohonan {
        max-width: 1400px;   /* bisa 1400-1600px */
        width: 95%;
    }

    #modalPermohonan .modal-body{
        padding:25px;
    }

    #FotoBarang{
        width:100%;
        height:520px;
        object-fit:contain;
        border:1px solid #ced4da;
        background:#fff;
    }

    #modalPermohonan .form-control,
    #modalPermohonan .form-select{
        font-size:14px;
    }

    #modalPermohonan textarea{
        resize:none;
    }
</style>

<div class="container-fluid">
    {{-- Filter --}}
    <div class="card shadow-sm mb-2">
        <div class="card-body py-2">

            <div class="row align-items-end">

                <div class="col-md-3">
                    <label>Divisi</label>
                    <select class="form-control" id="divisi">
                    </select>
                </div>

                <div class="col-md-2">
                    <label>Dari</label>
                    <input type="date" class="form-control" id="tgl1">
                </div>

                <div class="col-md-2">
                    <label>Sampai</label>
                    <input type="date" class="form-control" id="tgl2">
                </div>

                <div class="col-md-5 d-flex align-items-center">
                    <div class="form-check mt-4">
                        <input class="form-check-input" type="checkbox" id="operator">
                        <label class="form-check-label">
                            Tampilkan data operator saya saja
                        </label>
                    </div>
                </div>

            </div>
        </div>
    </div>


    <div class="row">
        {{-- List --}}
        <div class="col-md-8">
            <div class="card shadow-sm">
                <div class="card-body p-1">
                    <table class="table table-bordered table-hover table-sm" id="tableSPPB">
                        <thead class="thead-light">
                            <tr>
                                <th>Tanggal</th>
                                <th>Kd Barang</th>
                                <th>Type</th>
                                <th class="text-end">Jumlah</th>
                                <th>Satuan</th>
                                <th>No Trans</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


        {{-- Detail --}}
        <div class="col-md-4">
            <div class="card shadow-sm h-100">
                <div class="card-header">
                    Detail Permohonan
                </div>

                <div class="card-body small">
                    <table class="table table-borderless table-sm">
                        <tr>
                            <td width="40%">Kategori Utama: </td>
                            <td><span id="KategoriUtama"></span></td>
                        </tr>
                        <tr>
                            <td>Kategori:</td>
                            <td><span id="Kategori"></span></td>
                        </tr>
                        <tr>
                            <td>Sub Kategori:</td>
                            <td><span id="SubKategori"></span></td>
                        </tr>
                        <tr>
                            <td>Ket Barang:</td>
                            <td><span id="KetBarang"></span></td>
                        </tr>
                        <tr>
                            <td>Ket Pemesan:</td>
                            <td><span id="KetPemesan"></span></td>
                        </tr>
                        <tr>
                            <td>Gol Mesin:</td>
                            <td><span id="GolMesin"></span></td>
                        </tr>
                        <tr>
                            <td>Nama Mesin:</td>
                            <td><span id="NamaMesin"></span></td>
                        </tr>
                        <tr>
                            <td>Pemesan:</td>
                            <td><span id="Pemesan"></span></td>
                        </tr>
                        <tr>
                            <td>Operator:</td>
                            <td><span id="Operator"></span></td>
                        </tr>
                        <tr>
                            <td>ACC Manager:</td>
                            <td><span id="AccManager"></span></td>
                        </tr>
                        <tr>
                            <td>ACC Direksi:</td>
                            <td><span id="AccDireksi"></span></td>
                        </tr>
                        <tr>
                            <td>No SPPB:</td>
                            <td><span id="NoSPPB"></span></td>
                        </tr>
                         <tr>
                            <td>Keterangan Batal:</td>
                            <td><span id="KetBatal"></span></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>


    {{-- Footer --}}
    <div class="row mt-3">
        <div class="col-md-8">

        </div>


        <div class="col-md-4 text-end">
            <button class="btn btn-primary" id="btnIsi">
                <i class="fa fa-file"></i> Isi
            </button>

            <button class="btn btn-warning" id="btn-koreksi">
                <i class="fa fa-edit"></i> Koreksi
            </button>

            <button class="btn btn-danger" id="btnHapus">
                <i class="fa fa-trash"></i> Hapus
            </button>
        </div>
    </div>
</div>

{{--Modal Untuk Isi--}}
<div class="modal fade" id="modalPermohonan">
    <div class="modal-dialog modal-permohonan">
        <div class="modal-content">

            <div class="modal-header">
                <h5>Permohonan Pembelian</h5>
            </div>

            <div class="modal-body">

                <div class="row">

                    <!-- KIRI -->
                    <div class="col-lg-7">

                        <div class="mb-2 row">
                            <label class="col-sm-3 col-form-label">
                                Kode Barang
                            </label>

                            <div class="col-sm-9">

                                <div class="input-group">

                                    <input type="text"
                                           class="form-control"
                                           id="KdBarang">

                                    <input type="hidden" id="NoSatuan">
                                    <input type="hidden" id="modalNoTrans">
                                    <input type="hidden" id="modalMode" value="insert">

                                    <button class="btn btn-primary"
                                            id="btnCariBarang">

                                        <i class="fa fa-search"></i>

                                    </button>

                                </div>

                            </div>
                        </div>


                        <div class="mb-2 row">
                            <label class="col-sm-3">Kategori Utama</label>
                            <div class="col-sm-9">
                                <input class="form-control"
                                       id="modalKategoriUtama"
                                       readonly>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3">Kategori</label>
                            <div class="col-sm-9">
                                <input class="form-control"
                                       id="modalKategori"
                                       readonly>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3">Sub Kategori</label>
                            <div class="col-sm-9">
                                <input class="form-control"
                                       id="modalSubKategori"
                                       readonly>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3">Ket. Khusus</label>
                            <div class="col-sm-9">
                                <input class="form-control"
                                       id="modalKetKhusus"
                                       readonly>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3">Nama Barang</label>
                            <div class="col-sm-9">
                                <input class="form-control"
                                       id="modalNamaBarang"
                                       readonly>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3">Ket. Barang</label>
                            <div class="col-sm-9">
                                <textarea class="form-control"
                                          id="modalKetBarang"
                                          rows="2"
                                          readonly></textarea>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3">Golongan</label>
                            <div class="col-sm-9">
                                <select id="modalGolongan"
                                        class="form-control select2"></select>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3">Mesin</label>
                            <div class="col-sm-9">
                                <select id="modalMesin"
                                        class="form-control select2"></select>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3">Ket. Order</label>
                            <div class="col-sm-9">
                                <textarea class="form-control"
                                          id="modalKetOrder"></textarea>
                            </div>
                        </div>

                        <div class="mb-2 row">
                            <label class="col-sm-3">Dokumentasi</label>

                            <div class="col-sm-9">

                                <input type="file"
                                    class="form-control"
                                    id="modalDokumentasi"
                                    accept="image/*,.pdf"
                                    multiple>

                                <small class="text-muted">
                                    Format: JPG, JPEG, PNG, WEBP atau PDF. Maksimal 10 MB per file.
                                </small>

                                <div id="fileDokumentasiInfo" class="mt-2"></div>

                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-3">
                                <label>Qty</label>
                                <input class="form-control" id="modalQty">
                            </div>

                            <div class="col-md-3">
                                <label>Pemesan</label>
                                <input class="form-control" id="modalPemesan">
                            </div>

                            <div class="col-md-3">
                                <label>Tgl Dibutuhkan</label>
                                <input type="date"
                                    class="form-control"
                                    id="modalTglButuh">
                            </div>

                        </div>

                        <hr>

                        <div class="mt-3">
                            <div class="row mb-2">
                                <div class="col-4 fw-bold">
                                    Primer
                                </div>

                                <div class="col-1 text-center">
                                    :
                                </div>

                                <div class="col-3 text-end" id="modalstokPrimer">
                                    0
                                </div>

                                <div class="col-4" id="modalsatPrimer">
                                    Null
                                </div>
                            </div>

                            <div class="row mb-2">
                                <div class="col-4 fw-bold">
                                    Sekunder
                                </div>

                                <div class="col-1 text-center">
                                    :
                                </div>

                                <div class="col-3 text-end" id="modalstokSekunder">
                                    0
                                </div>

                                <div class="col-4" id="modalsatSekunder">
                                    Null
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-4 fw-bold">
                                    Tritier
                                </div>

                                <div class="col-1 text-center">
                                    :
                                </div>

                                <div class="col-3 text-end" id="modalstokTritier">
                                    0
                                </div>

                                <div class="col-4" id="modalsatTritier">
                                    Null
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- FOTO -->
                    <div class="col-lg-5">
                        <div class="border rounded p-2 text-center">
                            <img id="modalFotoBarang"
                                 src="/images/no-image.png"
                                 class="img-fluid"
                                 style="max-height:420px">
                        </div>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <button class="btn btn-success" id="btnProses">
                    Proses
                </button>

                <button class="btn btn-secondary"
                        data-bs-dismiss="modal">
                    Batal
                </button>

            </div>

        </div>
    </div>
</div>

<script>
    const currentUser = "{{ Auth::user()->NomorUser }}";
</script>

<script src="{{ asset('js/Kencana/PermohonanPembelian.js') }}"></script>
@endsection
