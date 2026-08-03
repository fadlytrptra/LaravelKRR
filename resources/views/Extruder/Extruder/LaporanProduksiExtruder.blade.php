@extends('layouts.appExtruder')

@section('title')
    Laporan Produksi Extruder
@endsection
@section('content')

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Laporan Produksi Extruder</title>
        <style>
            @page {
                size: A4 portrait;
                margin: 15mm;
            }

            body {
                font-family: "Times New Roman", serif;
                font-size: 12px;
                color: #000;
            }

            .container {
                width: 100%;
                border: 1px solid #000;
                padding: 5px;
                box-sizing: border-box;
            }

            table {
                border-collapse: collapse;
                width: 100%;
            }

            td,
            th {
                border: 1px solid #000;
                padding: 1px 2px;
                vertical-align: middle;
            }

            .no-border td,
            .no-border th {
                border: none;
            }

            .center {
                text-align: center;
            }

            .right {
                text-align: right;
            }

            .bold {
                font-weight: bold;
            }

            .section-title {
                font-weight: bold;
                text-align: center;
                margin: 5px 0;
            }

            .small-text {
                font-size: 10px;
            }

            .remark {
                height: 60px;
            }

            .signature td {
                height: 30px;
            }
        </style>
    </head>
    {{-- <link href="{{ asset('css/customer.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet"> --}}
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                {{-- <button class="acs-icon-btn acs-add-btn acs-float" onclick="openNewWindow('Customer/create')"> --}}
                <button class="acs-icon-btn acs-add-btn acs-float" {{--data-bs-toggle="modal" data-bs-target="#modalLaporan"--}}
                    data-typeForm="tambah" id="btn_tambahLaporan">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Laporan</div>
                </button>
                <div class="row">
                    <div class="col-md-3">
                        <label for="lokasi" class="form-label">Lokasi</label>
                        <select id="lokasi" class="form-select form-select-sm" style="width: 100%">
                            <option></option>
                            @foreach ($listLokasi as $d)
                                <option value="{{ $d->idLokasi }}">
                                    {{ $d->idLokasi . ' | ' . $d->nama_lokasi }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="row align-items-end">
                    <label for="tgl_awal" class="form-label">Tanggal</label>
                    <div class="col-auto">
                        <input type="date" class="form-control font-weight-bold" id="tgl_awal" name="tgl_awal">
                    </div>
                    <div class="col-auto">
                        <label for="sampai_dengan" class="ms-2 me-2">s/d</label>
                    </div>
                    <div class="col-auto">
                        <input type="date" class="form-control font-weight-bold" id="tgl_akhir" name="tgl_akhir">
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-info w-100" id="btn_redisplay">Redisplay</button>
                    </div>
                </div>
                <button type="button" id="btn_print" class="btn btn-success" style="display: none">Print</button>
                <script>
                    const printLaporanUrl = "{{ route('print.laporan.produksi.extruder') }}";
                </script>
                <br>
                {{-- <script>
                    document.getElementById('btn_print').addEventListener('click', function() {
                        // buka halaman baru untuk print
                        window.open("{{ route('print.laporan.produksi.extruder') }}", "_blank");
                    });
                </script> --}}
                <br>
                <div class="card">
                    <div class="card-header">Data Laporan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <table id="table_laporan" class="table" style="width:100%">
                            <thead class="table-dark">
                                <tr>
                                    <th>ID Laporan</th>
                                    <th>Shift</th>
                                    <th>Tanggal</th>
                                    <th>Spek Mesin</th>
                                    <th>Spek Benang</th>
                                    <th>Nomor User Input</th>
                                    <th>Action</th>
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
    <style>
        .custom-modal-width {
            max-width: 100%;
        }
    </style>
    <script>
        function applyColor(id, color) {
            const el = document.getElementById(id);
            el.style.color = color;
            el.querySelectorAll("*").forEach(child => {
                child.style.color = color;
            });
        }

        document.addEventListener("DOMContentLoaded", function() {

            // === SET DEFAULT BLACK ===
            // ["B","C","D","E","F","G"].forEach(letter => {
            //     applyColor("time" + letter, "black");
            // });

            // ==== B ====
            document.querySelectorAll('input[name="colorB"]').forEach(r => {
                r.addEventListener("change", function() {
                    applyColor("timeB", this.value);
                    applyColor("c1B", this.value);
                    applyColor("c2B", this.value);
                    applyColor("c3B", this.value);
                    applyColor("c4B", this.value);
                    applyColor("c5B", this.value);
                    applyColor("c6B", this.value);
                    applyColor("c7B", this.value);
                    applyColor("c8B", this.value);
                    applyColor("flB", this.value);
                    applyColor("scB", this.value);
                    applyColor("jnB", this.value);
                    applyColor("d1B", this.value);
                    applyColor("d2B", this.value);
                    applyColor("d3B", this.value);
                    applyColor("d4B", this.value);
                    applyColor("d5B", this.value);
                    applyColor("d6B", this.value);
                    applyColor("srB", this.value);
                    applyColor("mrB", this.value);
                    applyColor("mvB", this.value);
                    applyColor("mpp1B", this.value);
                    applyColor("mpp2B", this.value);
                    applyColor("qbB", this.value);
                    applyColor("fewB", this.value);
                    applyColor("swB", this.value);
                    applyColor("noyB", this.value);
                    applyColor("wgB", this.value);
                    applyColor("rs1B", this.value);
                    applyColor("rs2B", this.value);
                    applyColor("rs3B", this.value);
                    applyColor("strB", this.value);
                    applyColor("rB", this.value);
                    applyColor("uotB", this.value);
                    applyColor("lotB", this.value);
                    applyColor("at1B", this.value);
                    applyColor("at2B", this.value);
                    applyColor("at3B", this.value);
                });
            });

            // ==== C ====
            document.querySelectorAll('input[name="colorC"]').forEach(r => {
                r.addEventListener("change", function() {
                    applyColor("timeC", this.value);
                    applyColor("c1C", this.value);
                    applyColor("c2C", this.value);
                    applyColor("c3C", this.value);
                    applyColor("c4C", this.value);
                    applyColor("c5C", this.value);
                    applyColor("c6C", this.value);
                    applyColor("c7C", this.value);
                    applyColor("c8C", this.value);
                    applyColor("flC", this.value);
                    applyColor("scC", this.value);
                    applyColor("jnC", this.value);
                    applyColor("d1C", this.value);
                    applyColor("d2C", this.value);
                    applyColor("d3C", this.value);
                    applyColor("d4C", this.value);
                    applyColor("d5C", this.value);
                    applyColor("d6C", this.value);
                    applyColor("srC", this.value);
                    applyColor("mrC", this.value);
                    applyColor("mvC", this.value);
                    applyColor("mpp1C", this.value);
                    applyColor("mpp2C", this.value);
                    applyColor("qbC", this.value);
                    applyColor("fewC", this.value);
                    applyColor("swC", this.value);
                    applyColor("noyC", this.value);
                    applyColor("wgC", this.value);
                    applyColor("rs1C", this.value);
                    applyColor("rs2C", this.value);
                    applyColor("rs3C", this.value);
                    applyColor("strC", this.value);
                    applyColor("rC", this.value);
                    applyColor("uotC", this.value);
                    applyColor("lotC", this.value);
                    applyColor("at1C", this.value);
                    applyColor("at2C", this.value);
                    applyColor("at3C", this.value);
                });
            });

            // ==== D ====
            document.querySelectorAll('input[name="colorD"]').forEach(r => {
                r.addEventListener("change", function() {
                    applyColor("timeD", this.value);
                    applyColor("c1D", this.value);
                    applyColor("c2D", this.value);
                    applyColor("c3D", this.value);
                    applyColor("c4D", this.value);
                    applyColor("c5D", this.value);
                    applyColor("c6D", this.value);
                    applyColor("c7D", this.value);
                    applyColor("c8D", this.value);
                    applyColor("flD", this.value);
                    applyColor("scD", this.value);
                    applyColor("jnD", this.value);
                    applyColor("d1D", this.value);
                    applyColor("d2D", this.value);
                    applyColor("d3D", this.value);
                    applyColor("d4D", this.value);
                    applyColor("d5D", this.value);
                    applyColor("d6D", this.value);
                    applyColor("srD", this.value);
                    applyColor("mrD", this.value);
                    applyColor("mvD", this.value);
                    applyColor("mpp1D", this.value);
                    applyColor("mpp2D", this.value);
                    applyColor("qbD", this.value);
                    applyColor("fewD", this.value);
                    applyColor("swD", this.value);
                    applyColor("noyD", this.value);
                    applyColor("wgD", this.value);
                    applyColor("rs1D", this.value);
                    applyColor("rs2D", this.value);
                    applyColor("rs3D", this.value);
                    applyColor("strD", this.value);
                    applyColor("rD", this.value);
                    applyColor("uotD", this.value);
                    applyColor("lotD", this.value);
                    applyColor("at1D", this.value);
                    applyColor("at2D", this.value);
                    applyColor("at3D", this.value);
                });
            });

            // ==== E ====
            document.querySelectorAll('input[name="colorE"]').forEach(r => {
                r.addEventListener("change", function() {
                    applyColor("timeE", this.value);
                    applyColor("c1E", this.value);
                    applyColor("c2E", this.value);
                    applyColor("c3E", this.value);
                    applyColor("c4E", this.value);
                    applyColor("c5E", this.value);
                    applyColor("c6E", this.value);
                    applyColor("c7E", this.value);
                    applyColor("c8E", this.value);
                    applyColor("flE", this.value);
                    applyColor("scE", this.value);
                    applyColor("jnE", this.value);
                    applyColor("d1E", this.value);
                    applyColor("d2E", this.value);
                    applyColor("d3E", this.value);
                    applyColor("d4E", this.value);
                    applyColor("d5E", this.value);
                    applyColor("d6E", this.value);
                    applyColor("srE", this.value);
                    applyColor("mrE", this.value);
                    applyColor("mvE", this.value);
                    applyColor("mpp1E", this.value);
                    applyColor("mpp2E", this.value);
                    applyColor("qbE", this.value);
                    applyColor("fewE", this.value);
                    applyColor("swE", this.value);
                    applyColor("noyE", this.value);
                    applyColor("wgE", this.value);
                    applyColor("rs1E", this.value);
                    applyColor("rs2E", this.value);
                    applyColor("rs3E", this.value);
                    applyColor("strE", this.value);
                    applyColor("rE", this.value);
                    applyColor("uotE", this.value);
                    applyColor("lotE", this.value);
                    applyColor("at1E", this.value);
                    applyColor("at2E", this.value);
                    applyColor("at3E", this.value);
                });
            });

            // ==== F ====
            document.querySelectorAll('input[name="colorF"]').forEach(r => {
                r.addEventListener("change", function() {
                    applyColor("timeF", this.value);
                    applyColor("c1F", this.value);
                    applyColor("c2F", this.value);
                    applyColor("c3F", this.value);
                    applyColor("c4F", this.value);
                    applyColor("c5F", this.value);
                    applyColor("c6F", this.value);
                    applyColor("c7F", this.value);
                    applyColor("c8F", this.value);
                    applyColor("flF", this.value);
                    applyColor("scF", this.value);
                    applyColor("jnF", this.value);
                    applyColor("d1F", this.value);
                    applyColor("d2F", this.value);
                    applyColor("d3F", this.value);
                    applyColor("d4F", this.value);
                    applyColor("d5F", this.value);
                    applyColor("d6F", this.value);
                    applyColor("srF", this.value);
                    applyColor("mrF", this.value);
                    applyColor("mvF", this.value);
                    applyColor("mpp1F", this.value);
                    applyColor("mpp2F", this.value);
                    applyColor("qbF", this.value);
                    applyColor("fewF", this.value);
                    applyColor("swF", this.value);
                    applyColor("noyF", this.value);
                    applyColor("wgF", this.value);
                    applyColor("rs1F", this.value);
                    applyColor("rs2F", this.value);
                    applyColor("rs3F", this.value);
                    applyColor("strF", this.value);
                    applyColor("rF", this.value);
                    applyColor("uotF", this.value);
                    applyColor("lotF", this.value);
                    applyColor("at1F", this.value);
                    applyColor("at2F", this.value);
                    applyColor("at3F", this.value);
                });
            });

            // ==== G ====
            document.querySelectorAll('input[name="colorG"]').forEach(r => {
                r.addEventListener("change", function() {
                    applyColor("timeG", this.value);
                    applyColor("c1G", this.value);
                    applyColor("c2G", this.value);
                    applyColor("c3G", this.value);
                    applyColor("c4G", this.value);
                    applyColor("c5G", this.value);
                    applyColor("c6G", this.value);
                    applyColor("c7G", this.value);
                    applyColor("c8G", this.value);
                    applyColor("flG", this.value);
                    applyColor("scG", this.value);
                    applyColor("jnG", this.value);
                    applyColor("d1G", this.value);
                    applyColor("d2G", this.value);
                    applyColor("d3G", this.value);
                    applyColor("d4G", this.value);
                    applyColor("d5G", this.value);
                    applyColor("d6G", this.value);
                    applyColor("srG", this.value);
                    applyColor("mrG", this.value);
                    applyColor("mvG", this.value);
                    applyColor("mpp1G", this.value);
                    applyColor("mpp2G", this.value);
                    applyColor("qbG", this.value);
                    applyColor("fewG", this.value);
                    applyColor("swG", this.value);
                    applyColor("noyG", this.value);
                    applyColor("wgG", this.value);
                    applyColor("rs1G", this.value);
                    applyColor("rs2G", this.value);
                    applyColor("rs3G", this.value);
                    applyColor("strG", this.value);
                    applyColor("rG", this.value);
                    applyColor("uotG", this.value);
                    applyColor("lotG", this.value);
                    applyColor("at1G", this.value);
                    applyColor("at2G", this.value);
                    applyColor("at3G", this.value);
                });
            });

        });
    </script>

    <div class="modal fade" id="modalLaporan" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog custom-modal-width">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabelCustomer">Tambah Laporan</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <button type="button" id="btn_simpanLaporan" class="btn btn-success">Simpan</button>

                    <body>
                        <div class="mt-2" style="font-size: 13px; text-align: center;">
                            <div class="d-flex justify-content-center" style="white-space: nowrap;">
                                <div class="text-center" style="width:100px;"><strong>Kolom B</strong></div>
                                <div class="text-center" style="width:100px;"><strong>Kolom C</strong></div>
                                <div class="text-center" style="width:100px;"><strong>Kolom D</strong></div>
                                <div class="text-center" style="width:100px;"><strong>Kolom E</strong></div>
                                <div class="text-center" style="width:100px;"><strong>Kolom F</strong></div>
                                <div class="text-center" style="width:100px;"><strong>Kolom G</strong></div>
                            </div>
                            <div class="d-flex justify-content-center" style="white-space: nowrap;">

                                <div class="text-center" style="width:100px;">
                                    <label><input type="radio" name="colorB" value="red"> Merah</label><br>
                                    <label><input type="radio" name="colorB" value="black" checked> Hitam</label>
                                </div>

                                <div class="text-center" style="width:100px;">
                                    <label><input type="radio" name="colorC" value="red"> Merah</label><br>
                                    <label><input type="radio" name="colorC" value="black" checked> Hitam</label>
                                </div>

                                <div class="text-center" style="width:100px;">
                                    <label><input type="radio" name="colorD" value="red"> Merah</label><br>
                                    <label><input type="radio" name="colorD" value="black" checked> Hitam</label>
                                </div>

                                <div class="text-center" style="width:100px;">
                                    <label><input type="radio" name="colorE" value="red"> Merah</label><br>
                                    <label><input type="radio" name="colorE" value="black" checked> Hitam</label>
                                </div>

                                <div class="text-center" style="width:100px;">
                                    <label><input type="radio" name="colorF" value="red"> Merah</label><br>
                                    <label><input type="radio" name="colorF" value="black" checked> Hitam</label>
                                </div>

                                <div class="text-center" style="width:100px;">
                                    <label><input type="radio" name="colorG" value="red"> Merah</label><br>
                                    <label><input type="radio" name="colorG" value="black" checked> Hitam</label>
                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <table>
                                <tr>
                                    <td colspan="2" class="bold textBener"
                                        style="border-bottom:none !important; text-align: center; width:400px !important">
                                        PT. KERTA
                                        RAJASA RAYA</td>
                                    <td class="small-text left" style="border-right:none !important">No. Referensi:</td>
                                    <td colspan="4" class="small-text left"
                                        style="width:100px; border-left:none !important" id="referensi"
                                        contenteditable="true"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="textBener"
                                        style="border-top:none !important; border-bottom:none !important; text-align: center;">
                                        Woven Bag /
                                        Jumbo Bag Industrial</td>
                                    <td class="small-text left" style="border-right:none !important">Tanggal:</td>
                                    <td colspan="4" class="small-text left" style="border-left:none !important">
                                        <input class="small-text left" type="date" id="tanggal"
                                            style="border:none; width:50%; outline:none;">
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="textBener"
                                        style="border-top:none !important; text-align: center;">
                                        fm - 7.5 - 01 - ex - 03 - 02</td>
                                    <td class="small-text left" style="border-right:none !important">Halaman:</td>
                                    <td colspan="4" class="small-text left" style="border-left:none !important"
                                        contenteditable="false" id="halaman">
                                        1&emsp;Dari&emsp;1</td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="center bold textBener">LAPORAN PRODUKSI EXTRUDER</td>
                                    <td colspan="4" class="center bold textBener">FORM</td>
                                </tr>
                                <tr class="textBener">
                                    <td colspan="4" class="center bold" style="border-right:none !important"></td>
                                    <td colspan="1" class="center bold"
                                        style="border-left:none !important; border-right:none !important; text-align: right;">
                                        Effisiensi :</td>
                                    <td colspan="1" class="center bold"
                                        style="border-left:none !important; width: 100px; text-align: left;"
                                        id="effisiensi" contenteditable="true"></td>
                                </tr>
                            </table>
                            <table>
                                <tr class="textBener">
                                    <td style="width: 100px; border-right:none !important">Shift / Time</td>
                                    <td style="width: 5px; border-left:none !important; border-right:none !important">:
                                    </td>
                                    <td
                                        style="border-left:none !important; border-right:none !important; text-align:center;">
                                        <div id="shiftSelector"
                                            style="display:inline-flex; gap:8px; font-weight:bold; cursor:pointer;">
                                            <span class="shift-option" data-value="A">A</span> /
                                            <span class="shift-option" data-value="B">B</span> /
                                            <span class="shift-option" data-value="C">C</span> /
                                            <span class="shift-option" data-value="D">D</span>
                                        </div>
                                        <input type="hidden" id="shiftValue" name="shiftValue">
                                    </td>

                                    <style>
                                        .shift-option {
                                            display: inline-block;
                                            width: 22px;
                                            height: 22px;
                                            text-align: center;
                                            line-height: 20px;
                                            border-radius: 50%;
                                            transition: 0.2s;
                                        }

                                        .shift-option.active {
                                            border: 2px solid black;
                                        }

                                        .shift-option:hover {
                                            background-color: #f0f0f0;
                                        }
                                    </style>

                                    <script>
                                        document.querySelectorAll('.shift-option').forEach(el => {
                                            el.addEventListener('click', function() {
                                                // Hilangkan lingkaran dari semua
                                                document.querySelectorAll('.shift-option').forEach(opt => opt.classList.remove('active'));
                                                // Tambahkan lingkaran pada yang diklik
                                                this.classList.add('active');
                                                // Simpan value ke hidden input
                                                document.getElementById('shiftValue').value = this.dataset.value;
                                                console.log("Shift terpilih:", this.dataset.value);
                                            });
                                        });
                                    </script>
                                    <td
                                        style="width: 110px; border-left:none !important; border-right:none !important; text-align:right;">
                                        <input type="time" id="timeStart"
                                            style="width:100px; border:none; outline:none; text-align:center;">
                                    </td>
                                    <td
                                        style="width: 30px; border-left:none !important; border-right:none !important; text-align:center;">
                                        s/d
                                    </td>
                                    <td style="width: 110px; border-left:none !important; text-align:left;">
                                        <input type="time" id="timeEnd"
                                            style="width:100px; border:none; outline:none; text-align:center;">
                                    </td>
                                    <td style="text-align: center; width: 80px">Manager</td>
                                    <td style="text-align: center; width: 80px">Supervisor</td>
                                    <td style="text-align: center; width: 80px">Chief of Group</td>
                                </tr>
                                <tr class="textBener">
                                    <td style="border-right:none !important">Spec. of Machine</td>
                                    <td style="border-left:none !important; border-right:none !important">:</td>
                                    <td colspan="4" style="border-left:none !important" id="spek_mesin"
                                        contenteditable="true"></td>
                                    {{-- <td class="center bold" style="width:120px; border:none !important">
                                        <img id="ttd_satpam" style="display:none; max-width:200px;">
                                    </td> --}}
                                    <td rowspan="2" style="border-bottom:none !important"></td>
                                    <td rowspan="2" style="border-bottom:none !important"></td>
                                    <td rowspan="2" style="border-bottom:none !important">
                                        <img id="ttd_cog" style="display:none; max-width:70px;">
                                    </td>
                                </tr>
                                <tr class="textBener">
                                    <td style="border-right:none !important">Spec. of Yarn</td>
                                    <td style="border-left:none !important; border-right:none !important">:</td>
                                    <td colspan="4" style="border-left:none !important" id="spek_benang"
                                        contenteditable="true"></td>
                                    {{-- <td style="border-top:none !important"></td>
                                    <td style="border-top:none !important"></td>
                                    <td style="border-top:none !important"></td> --}}
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <th colspan="2">Time</th>
                                    <th class="center small-text" id="timeA" contenteditable="true"
                                        style="width:120px; color: red"></th>
                                    <th class="center small-text" id="timeB" contenteditable="true"
                                        style="width:120px"></th>
                                    <th class="center small-text" id="timeC" contenteditable="true"
                                        style="width:120px"></th>
                                    <th class="center small-text" id="timeD" contenteditable="true"
                                        style="width:120px"></th>
                                    <th class="center small-text" id="timeE" contenteditable="true"
                                        style="width:120px"></th>
                                    <th class="center small-text" id="timeF" contenteditable="true"
                                        style="width:120px"></th>
                                    <th class="center small-text" id="timeG" contenteditable="true"
                                        style="width:120px"></th>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important"></td>
                                    <td style="width: 30px">C1</td>
                                    <td class="center small-text" id="c1A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="c1B" contenteditable="true"></td>
                                    <td class="center small-text" id="c1C" contenteditable="true"></td>
                                    <td class="center small-text" id="c1D" contenteditable="true"></td>
                                    <td class="center small-text" id="c1E" contenteditable="true"></td>
                                    <td class="center small-text" id="c1F" contenteditable="true"></td>
                                    <td class="center small-text" id="c1G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;"></td>
                                    <td>C2</td>
                                    <td class="center small-text" id="c2A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="c2B" contenteditable="true"></td>
                                    <td class="center small-text" id="c2C" contenteditable="true"></td>
                                    <td class="center small-text" id="c2D" contenteditable="true"></td>
                                    <td class="center small-text" id="c2E" contenteditable="true"></td>
                                    <td class="center small-text" id="c2F" contenteditable="true"></td>
                                    <td class="center small-text" id="c2G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important;">
                                        Cylinder Temperature</td>
                                    <td>C3</td>
                                    <td class="center small-text" id="c3A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="c3B" contenteditable="true"></td>
                                    <td class="center small-text" id="c3C" contenteditable="true"></td>
                                    <td class="center small-text" id="c3D" contenteditable="true"></td>
                                    <td class="center small-text" id="c3E" contenteditable="true"></td>
                                    <td class="center small-text" id="c3F" contenteditable="true"></td>
                                    <td class="center small-text" id="c3G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;"></td>
                                    <td>C4</td>
                                    <td class="center small-text" id="c4A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="c4B" contenteditable="true"></td>
                                    <td class="center small-text" id="c4C" contenteditable="true"></td>
                                    <td class="center small-text" id="c4D" contenteditable="true"></td>
                                    <td class="center small-text" id="c4E" contenteditable="true"></td>
                                    <td class="center small-text" id="c4F" contenteditable="true"></td>
                                    <td class="center small-text" id="c4G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;">( C )</td>
                                    <td>C5</td>
                                    <td class="center small-text" id="c5A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="c5B" contenteditable="true"></td>
                                    <td class="center small-text" id="c5C" contenteditable="true"></td>
                                    <td class="center small-text" id="c5D" contenteditable="true"></td>
                                    <td class="center small-text" id="c5E" contenteditable="true"></td>
                                    <td class="center small-text" id="c5F" contenteditable="true"></td>
                                    <td class="center small-text" id="c5G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;"></td>
                                    <td>C6</td>
                                    <td class="center small-text" id="c6A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="c6B" contenteditable="true"></td>
                                    <td class="center small-text" id="c6C" contenteditable="true"></td>
                                    <td class="center small-text" id="c6D" contenteditable="true"></td>
                                    <td class="center small-text" id="c6E" contenteditable="true"></td>
                                    <td class="center small-text" id="c6F" contenteditable="true"></td>
                                    <td class="center small-text" id="c6G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;"></td>
                                    <td>C7</td>
                                    <td class="center small-text" id="c7A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="c7B" contenteditable="true"></td>
                                    <td class="center small-text" id="c7C" contenteditable="true"></td>
                                    <td class="center small-text" id="c7D" contenteditable="true"></td>
                                    <td class="center small-text" id="c7E" contenteditable="true"></td>
                                    <td class="center small-text" id="c7F" contenteditable="true"></td>
                                    <td class="center small-text" id="c7G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-top:none !important;"></td>
                                    <td>C8</td>
                                    <td class="center small-text" id="c8A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="c8B" contenteditable="true"></td>
                                    <td class="center small-text" id="c8C" contenteditable="true"></td>
                                    <td class="center small-text" id="c8D" contenteditable="true"></td>
                                    <td class="center small-text" id="c8E" contenteditable="true"></td>
                                    <td class="center small-text" id="c8F" contenteditable="true"></td>
                                    <td class="center small-text" id="c8G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="text-align: left; border-bottom:none !important;">Flange ( C )</td>
                                    <td>FL</td>
                                    <td class="center small-text" id="flA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="flB" contenteditable="true"></td>
                                    <td class="center small-text" id="flC" contenteditable="true"></td>
                                    <td class="center small-text" id="flD" contenteditable="true"></td>
                                    <td class="center small-text" id="flE" contenteditable="true"></td>
                                    <td class="center small-text" id="flF" contenteditable="true"></td>
                                    <td class="center small-text" id="flG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important;">
                                        Screen ( C )
                                    </td>
                                    <td>SC</td>
                                    <td class="center small-text" id="scA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="scB" contenteditable="true"></td>
                                    <td class="center small-text" id="scC" contenteditable="true"></td>
                                    <td class="center small-text" id="scD" contenteditable="true"></td>
                                    <td class="center small-text" id="scE" contenteditable="true"></td>
                                    <td class="center small-text" id="scF" contenteditable="true"></td>
                                    <td class="center small-text" id="scG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="text-align: left; border-top:none !important;">Joint ( C )</td>
                                    <td>JN</td>
                                    <td class="center small-text" id="jnA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="jnB" contenteditable="true"></td>
                                    <td class="center small-text" id="jnC" contenteditable="true"></td>
                                    <td class="center small-text" id="jnD" contenteditable="true"></td>
                                    <td class="center small-text" id="jnE" contenteditable="true"></td>
                                    <td class="center small-text" id="jnF" contenteditable="true"></td>
                                    <td class="center small-text" id="jnG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important;"></td>
                                    <td>D1</td>
                                    <td class="center small-text" id="d1A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="d1B" contenteditable="true"></td>
                                    <td class="center small-text" id="d1C" contenteditable="true"></td>
                                    <td class="center small-text" id="d1D" contenteditable="true"></td>
                                    <td class="center small-text" id="d1E" contenteditable="true"></td>
                                    <td class="center small-text" id="d1F" contenteditable="true"></td>
                                    <td class="center small-text" id="d1G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important;">
                                        Die
                                        Temperature</td>
                                    <td>D2</td>
                                    <td class="center small-text" id="d2A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="d2B" contenteditable="true"></td>
                                    <td class="center small-text" id="d2C" contenteditable="true"></td>
                                    <td class="center small-text" id="d2D" contenteditable="true"></td>
                                    <td class="center small-text" id="d2E" contenteditable="true"></td>
                                    <td class="center small-text" id="d2F" contenteditable="true"></td>
                                    <td class="center small-text" id="d2G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;"></td>
                                    <td>D3</td>
                                    <td class="center small-text" id="d3A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="d3B" contenteditable="true"></td>
                                    <td class="center small-text" id="d3C" contenteditable="true"></td>
                                    <td class="center small-text" id="d3D" contenteditable="true"></td>
                                    <td class="center small-text" id="d3E" contenteditable="true"></td>
                                    <td class="center small-text" id="d3F" contenteditable="true"></td>
                                    <td class="center small-text" id="d3G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;">( C )</td>
                                    <td>D4</td>
                                    <td class="center small-text" id="d4A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="d4B" contenteditable="true"></td>
                                    <td class="center small-text" id="d4C" contenteditable="true"></td>
                                    <td class="center small-text" id="d4D" contenteditable="true"></td>
                                    <td class="center small-text" id="d4E" contenteditable="true"></td>
                                    <td class="center small-text" id="d4F" contenteditable="true"></td>
                                    <td class="center small-text" id="d4G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;"></td>
                                    <td>D5</td>
                                    <td class="center small-text" id="d5A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="d5B" contenteditable="true"></td>
                                    <td class="center small-text" id="d5C" contenteditable="true"></td>
                                    <td class="center small-text" id="d5D" contenteditable="true"></td>
                                    <td class="center small-text" id="d5E" contenteditable="true"></td>
                                    <td class="center small-text" id="d5F" contenteditable="true"></td>
                                    <td class="center small-text" id="d5G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-top:none !important;"></td>
                                    <td>D6</td>
                                    <td class="center small-text" id="d6A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="d6B" contenteditable="true"></td>
                                    <td class="center small-text" id="d6C" contenteditable="true"></td>
                                    <td class="center small-text" id="d6D" contenteditable="true"></td>
                                    <td class="center small-text" id="d6E" contenteditable="true"></td>
                                    <td class="center small-text" id="d6F" contenteditable="true"></td>
                                    <td class="center small-text" id="d6G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-right:none !important;">
                                        Melt Pump / Extruder</td>
                                    <td style="border-left:none !important; border-bottom:none !important;">(Rpm)</td>
                                    <td class="center small-text" id="srA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="srB" contenteditable="true"></td>
                                    <td class="center small-text" id="srC" contenteditable="true"></td>
                                    <td class="center small-text" id="srD" contenteditable="true"></td>
                                    <td class="center small-text" id="srE" contenteditable="true"></td>
                                    <td class="center small-text" id="srF" contenteditable="true"></td>
                                    <td class="center small-text" id="srG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Motor Current</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (A)
                                    </td>
                                    <td class="center small-text" id="mrA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="mrB" contenteditable="true"></td>
                                    <td class="center small-text" id="mrC" contenteditable="true"></td>
                                    <td class="center small-text" id="mrD" contenteditable="true"></td>
                                    <td class="center small-text" id="mrE" contenteditable="true"></td>
                                    <td class="center small-text" id="mrF" contenteditable="true"></td>
                                    <td class="center small-text" id="mrG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text" style="display: none">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Motor Voltage</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (V)
                                    </td>
                                    <td class="center small-text" id="mvA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="mvB" contenteditable="true"></td>
                                    <td class="center small-text" id="mvC" contenteditable="true"></td>
                                    <td class="center small-text" id="mvD" contenteditable="true"></td>
                                    <td class="center small-text" id="mvE" contenteditable="true"></td>
                                    <td class="center small-text" id="mvF" contenteditable="true"></td>
                                    <td class="center small-text" id="mvG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Pressure Before Die</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (bar)</td>
                                    <td class="center small-text" id="mpp1A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="mpp1B" contenteditable="true"></td>
                                    <td class="center small-text" id="mpp1C" contenteditable="true"></td>
                                    <td class="center small-text" id="mpp1D" contenteditable="true"></td>
                                    <td class="center small-text" id="mpp1E" contenteditable="true"></td>
                                    <td class="center small-text" id="mpp1F" contenteditable="true"></td>
                                    <td class="center small-text" id="mpp1G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Pressure Before Filter</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (Kgf/cm)</td>
                                    <td class="center small-text" id="mpp2A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="mpp2B" contenteditable="true"></td>
                                    <td class="center small-text" id="mpp2C" contenteditable="true"></td>
                                    <td class="center small-text" id="mpp2D" contenteditable="true"></td>
                                    <td class="center small-text" id="mpp2E" contenteditable="true"></td>
                                    <td class="center small-text" id="mpp2F" contenteditable="true"></td>
                                    <td class="center small-text" id="mpp2G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        WB/Chiller/Temp Yarn</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (C)
                                    </td>
                                    <td class="center small-text" id="qbA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="qbB" contenteditable="true"></td>
                                    <td class="center small-text" id="qbC" contenteditable="true"></td>
                                    <td class="center small-text" id="qbD" contenteditable="true"></td>
                                    <td class="center small-text" id="qbE" contenteditable="true"></td>
                                    <td class="center small-text" id="qbF" contenteditable="true"></td>
                                    <td class="center small-text" id="qbG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Film Effective Width</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (mm)</td>
                                    <td class="center small-text" id="fewA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="fewB" contenteditable="true"></td>
                                    <td class="center small-text" id="fewC" contenteditable="true"></td>
                                    <td class="center small-text" id="fewD" contenteditable="true"></td>
                                    <td class="center small-text" id="fewE" contenteditable="true"></td>
                                    <td class="center small-text" id="fewF" contenteditable="true"></td>
                                    <td class="center small-text" id="fewG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Slitter Width</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (mm)</td>
                                    <td class="center small-text" id="swA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="swB" contenteditable="true"></td>
                                    <td class="center small-text" id="swC" contenteditable="true"></td>
                                    <td class="center small-text" id="swD" contenteditable="true"></td>
                                    <td class="center small-text" id="swE" contenteditable="true"></td>
                                    <td class="center small-text" id="swF" contenteditable="true"></td>
                                    <td class="center small-text" id="swG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        No. of Yarn</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (pcs)</td>
                                    <td class="center small-text" id="noyA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="noyB" contenteditable="true"></td>
                                    <td class="center small-text" id="noyC" contenteditable="true"></td>
                                    <td class="center small-text" id="noyD" contenteditable="true"></td>
                                    <td class="center small-text" id="noyE" contenteditable="true"></td>
                                    <td class="center small-text" id="noyF" contenteditable="true"></td>
                                    <td class="center small-text" id="noyG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-top:none !important; border-right:none !important;">
                                        Water Gap</td>
                                    <td style="border-left:none !important; border-top:none !important;">(mm)</td>
                                    <td class="center small-text" id="wgA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="wgB" contenteditable="true"></td>
                                    <td class="center small-text" id="wgC" contenteditable="true"></td>
                                    <td class="center small-text" id="wgD" contenteditable="true"></td>
                                    <td class="center small-text" id="wgE" contenteditable="true"></td>
                                    <td class="center small-text" id="wgF" contenteditable="true"></td>
                                    <td class="center small-text" id="wgG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-right:none !important;">
                                        1 Roll Speed
                                    </td>
                                    <td style="border-left:none !important; border-bottom:none !important;">(m/min)</td>
                                    <td class="center small-text" id="rs1A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="rs1B" contenteditable="true"></td>
                                    <td class="center small-text" id="rs1C" contenteditable="true"></td>
                                    <td class="center small-text" id="rs1D" contenteditable="true"></td>
                                    <td class="center small-text" id="rs1E" contenteditable="true"></td>
                                    <td class="center small-text" id="rs1F" contenteditable="true"></td>
                                    <td class="center small-text" id="rs1G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        2 Roll Speed</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (m/min)</td>
                                    <td class="center small-text" id="rs2A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="rs2B" contenteditable="true"></td>
                                    <td class="center small-text" id="rs2C" contenteditable="true"></td>
                                    <td class="center small-text" id="rs2D" contenteditable="true"></td>
                                    <td class="center small-text" id="rs2E" contenteditable="true"></td>
                                    <td class="center small-text" id="rs2F" contenteditable="true"></td>
                                    <td class="center small-text" id="rs2G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        3 Roll Speed</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (m/min)</td>
                                    <td class="center small-text" id="rs3A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="rs3B" contenteditable="true"></td>
                                    <td class="center small-text" id="rs3C" contenteditable="true"></td>
                                    <td class="center small-text" id="rs3D" contenteditable="true"></td>
                                    <td class="center small-text" id="rs3E" contenteditable="true"></td>
                                    <td class="center small-text" id="rs3F" contenteditable="true"></td>
                                    <td class="center small-text" id="rs3G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Stretching Ratio</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (Times)</td>
                                    <td class="center small-text" id="strA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="strB" contenteditable="true"></td>
                                    <td class="center small-text" id="strC" contenteditable="true"></td>
                                    <td class="center small-text" id="strD" contenteditable="true"></td>
                                    <td class="center small-text" id="strE" contenteditable="true"></td>
                                    <td class="center small-text" id="strF" contenteditable="true"></td>
                                    <td class="center small-text" id="strG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left;border-top:none !important; border-right:none !important;">
                                        Relax</td>
                                    <td style="border-left:none !important; border-top:none !important;">(%)</td>
                                    <td class="center small-text" id="rA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="rB" contenteditable="true"></td>
                                    <td class="center small-text" id="rC" contenteditable="true"></td>
                                    <td class="center small-text" id="rD" contenteditable="true"></td>
                                    <td class="center small-text" id="rE" contenteditable="true"></td>
                                    <td class="center small-text" id="rF" contenteditable="true"></td>
                                    <td class="center small-text" id="rG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-right:none !important;">
                                        Oven Temp</td>
                                    <td style="border-left:none !important; border-bottom:none !important;">(C)</td>
                                    <td class="center small-text" id="uotA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="uotB" contenteditable="true"></td>
                                    <td class="center small-text" id="uotC" contenteditable="true"></td>
                                    <td class="center small-text" id="uotD" contenteditable="true"></td>
                                    <td class="center small-text" id="uotE" contenteditable="true"></td>
                                    <td class="center small-text" id="uotF" contenteditable="true"></td>
                                    <td class="center small-text" id="uotG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        1 Anneling Temp</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (C)
                                    </td>
                                    <td class="center small-text" id="lotA" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="lotB" contenteditable="true"></td>
                                    <td class="center small-text" id="lotC" contenteditable="true"></td>
                                    <td class="center small-text" id="lotD" contenteditable="true"></td>
                                    <td class="center small-text" id="lotE" contenteditable="true"></td>
                                    <td class="center small-text" id="lotF" contenteditable="true"></td>
                                    <td class="center small-text" id="lotG" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        2 Anneling Temp</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (C)
                                    </td>
                                    <td class="center small-text" id="at1A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="at1B" contenteditable="true"></td>
                                    <td class="center small-text" id="at1C" contenteditable="true"></td>
                                    <td class="center small-text" id="at1D" contenteditable="true"></td>
                                    <td class="center small-text" id="at1E" contenteditable="true"></td>
                                    <td class="center small-text" id="at1F" contenteditable="true"></td>
                                    <td class="center small-text" id="at1G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        1 Chiller Low / High Pressure</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        (C)
                                    </td>
                                    <td class="center small-text" id="at2A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="at2B" contenteditable="true"></td>
                                    <td class="center small-text" id="at2C" contenteditable="true"></td>
                                    <td class="center small-text" id="at2D" contenteditable="true"></td>
                                    <td class="center small-text" id="at2E" contenteditable="true"></td>
                                    <td class="center small-text" id="at2F" contenteditable="true"></td>
                                    <td class="center small-text" id="at2G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        2 Chiller Low / High Pressure</td>
                                    <td style="border-left:none !important; border-top:none !important;">(C)</td>
                                    <td class="center small-text" id="at3A" contenteditable="true"
                                        style="color: red"></td>
                                    <td class="center small-text" id="at3B" contenteditable="true"></td>
                                    <td class="center small-text" id="at3C" contenteditable="true"></td>
                                    <td class="center small-text" id="at3D" contenteditable="true"></td>
                                    <td class="center small-text" id="at3E" contenteditable="true"></td>
                                    <td class="center small-text" id="at3F" contenteditable="true"></td>
                                    <td class="center small-text" id="at3G" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td class="bold">T I M E</td>
                                    <td colspan="8" class="bold">R E M A R K</td>
                                </tr>
                                <tr class="center small-text">
                                    <td class="center small-text" id="time1" contenteditable="true">&nbsp;</td>
                                    <td colspan="8" class="small-text" id="remark1" style="text-align: left"
                                        contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td class="center small-text" id="time2" contenteditable="true">&nbsp;</td>
                                    <td colspan="8" class="small-text" id="remark2" style="text-align: left"
                                        contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td class="center small-text" id="time3" contenteditable="true">&nbsp;</td>
                                    <td colspan="8" class="small-text" id="remark3" style="text-align: left"
                                        contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td class="center small-text" id="time4" contenteditable="true">&nbsp;</td>
                                    <td colspan="8" class="small-text" id="remark4" style="text-align: left"
                                        contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td class="center small-text" id="time5" contenteditable="true">&nbsp;</td>
                                    <td colspan="8" class="small-text" id="remark5" style="text-align: left"
                                        contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td class="center small-text" id="time6" contenteditable="true">&nbsp;</td>
                                    <td colspan="8" class="small-text" id="remark6" style="text-align: left"
                                        contenteditable="true"></td>
                                </tr>
                            </table>
                            <table>
                                <tr class="textBener">
                                    <td rowspan="2" class="bold" style="text-align: center; width: 50px;">BAHAN
                                    </td>
                                    <td colspan="4" class="bold" style="text-align: center">SPEK :</td>
                                    <td rowspan="2" class="bold" style="text-align: center; width: 50px;">Kwh
                                        Meter</td>
                                    <td style="text-align: center; width: 80px;" class="small-text" id="kwhM1"
                                        contenteditable="true"></td>
                                    <td style="text-align: center; width: 50px;">Jam Prod</td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="width: 100px">Trade Mark</td>
                                    <td style="width: 100px">Kode</td>
                                    <td style="width: 100px">Lot number</td>
                                    <td style="width: 100px">Kg</td>
                                    <td class="small-text" id="kwhM2" contenteditable="true"></td>
                                    <td class="small-text" id="jamProd" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td>P . P</td>
                                    <td id="ppA" style="text-align: left" contenteditable="true"></td>
                                    <td id="ppB" style="text-align: left" contenteditable="true"></td>
                                    <td id="ppC" style="text-align: left" contenteditable="true"></td>
                                    <td id="ppD" style="text-align: left" contenteditable="true"></td>
                                    <td colspan="2">Umur Sarangan</td>
                                    <td>Umur Silet</td>
                                </tr>
                                <tr class="center small-text">
                                    <td>CaCO3</td>
                                    <td id="cacA" style="text-align: left" contenteditable="true"></td>
                                    <td id="cacB" style="text-align: left" contenteditable="true"></td>
                                    <td id="cacC" style="text-align: left" contenteditable="true"></td>
                                    <td id="cacD" style="text-align: left" contenteditable="true"></td>
                                    <td style="text-align: left; border-right:none !important;">P1 =</td>
                                    <td style="border-left:none !important;" id="cacE" contenteditable="true"> /
                                    </td>
                                    <td id="cacF" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td id="mbAT" contenteditable="true">M . B</td>
                                    <td id="mbA" style="text-align: left" contenteditable="true"></td>
                                    <td id="mbB" style="text-align: left" contenteditable="true"></td>
                                    <td id="mbC" style="text-align: left" contenteditable="true"></td>
                                    <td id="mbD" style="text-align: left" contenteditable="true"></td>
                                    <td style="text-align: left; border-right:none !important;">P2 =</td>
                                    <td style="border-left:none !important;" id="mbE" contenteditable="true"> /
                                    </td>
                                    <td id="mbF" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td id="uvAT" contenteditable="true">U . V</td>
                                    <td id="uvA" style="text-align: left" contenteditable="true"></td>
                                    <td id="uvB" style="text-align: left" contenteditable="true"></td>
                                    <td id="uvC" style="text-align: left" contenteditable="true"></td>
                                    <td id="uvD" style="text-align: left" contenteditable="true"></td>
                                    <td style="text-align: left; border-right:none !important;">N . G -)</td>
                                    <td style="border-right:none !important; border-left:none !important;"
                                        id="uvE" contenteditable="true"></td>
                                    <td style="border-left:none !important;" id="uvF" contenteditable="true">
                                        =&emsp;&emsp;&emsp;krj</td>
                                </tr>
                                <tr class="center small-text">
                                    <td id="asbAT" contenteditable="true">A . S</td>
                                    <td id="asbA" style="text-align: left" contenteditable="true"></td>
                                    <td id="asbB" style="text-align: left" contenteditable="true"></td>
                                    <td id="asbC" style="text-align: left" contenteditable="true"></td>
                                    <td id="asbD" style="text-align: left" contenteditable="true"></td>
                                    <td style="text-align: left; border-right:none !important;">&emsp;&emsp;&nbsp; -)</td>
                                    <td style="border-right:none !important; border-left:none !important;"
                                        id="asbE" contenteditable="true"></td>
                                    <td style="border-left:none !important;" id="asbF" contenteditable="true">
                                        =&emsp;&emsp;&emsp;krj</td>
                                </tr>
                                <tr class="center small-text">
                                    <td id="llAT" contenteditable="true">Lain-lain</td>
                                    <td id="llA" style="text-align: left" contenteditable="true"></td>
                                    <td id="llB" style="text-align: left" contenteditable="true"></td>
                                    <td id="llC" style="text-align: left" contenteditable="true"></td>
                                    <td id="llD" style="text-align: left" contenteditable="true"></td>
                                    <td colspan="3" id="llF" style="text-align: left"
                                        contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td id="bhn1A" style="text-align: left" contenteditable="true"></td>
                                    <td id="bhn1B" style="text-align: left" contenteditable="true"></td>
                                    <td id="bhn1C" style="text-align: left" contenteditable="true"></td>
                                    <td id="bhn1D" style="text-align: left" contenteditable="true"></td>
                                    <td id="bhn1E" style="text-align: left" contenteditable="true"></td>
                                    <td colspan="3" id="bhn1F" style="text-align: left"
                                        contenteditable="true">&nbsp;</td>
                                </tr>
                                <tr class="center small-text">
                                    <td id="bhn2A" style="text-align: left" contenteditable="true"></td>
                                    <td id="bhn2B" style="text-align: left" contenteditable="true"></td>
                                    <td id="bhn2C" style="text-align: left" contenteditable="true"></td>
                                    <td id="bhn2D" style="text-align: left" contenteditable="true"></td>
                                    <td id="bhn2E" style="text-align: left" contenteditable="true"></td>
                                    <td colspan="3" id="bhn2F" style="text-align: left"
                                        contenteditable="true">&nbsp;</td>
                                </tr>
                            </table>
                            <table>
                                <tr class="center bold textBener">
                                    <td colspan="3">MANUSIA</td>
                                    <td colspan="3">LISTRIK</td>
                                    <td colspan="3">MESIN</td>
                                    <td colspan="3">GANTI BENANG</td>
                                    <td colspan="3">LAIN-LAIN</td>
                                    <td rowspan="2">TOTAL</td>
                                </tr>
                                <tr class="center small-text">
                                    <td>Bng</td>
                                    <td>Prong</td>
                                    <td>Sil</td>
                                    <td>Bng</td>
                                    <td>Prong</td>
                                    <td>Sil</td>
                                    <td>Bng</td>
                                    <td>Prong</td>
                                    <td>Sil</td>
                                    <td>Bng</td>
                                    <td>Prong</td>
                                    <td>Sil</td>
                                    <td>Bng</td>
                                    <td>Prong</td>
                                    <td>Sil</td>
                                </tr>
                                <tr class="center small-text">
                                    <td id="bngM" style="width: 40px" contenteditable="true">&nbsp;</td>
                                    <td id="prongM" style="width: 40px" contenteditable="true"></td>
                                    <td id="silM" style="width: 40px" contenteditable="true"></td>
                                    <td id="bngL" style="width: 40px" contenteditable="true"></td>
                                    <td id="prongL" style="width: 40px" contenteditable="true"></td>
                                    <td id="silL" style="width: 40px" contenteditable="true"></td>
                                    <td id="bngMe" style="width: 40px" contenteditable="true"></td>
                                    <td id="prongMe" style="width: 40px" contenteditable="true"></td>
                                    <td id="silMe" style="width: 40px" contenteditable="true"></td>
                                    <td id="bngGB" style="width: 40px" contenteditable="true"></td>
                                    <td id="prongGB" style="width: 40px" contenteditable="true"></td>
                                    <td id="silGB" style="width: 40px" contenteditable="true"></td>
                                    <td id="bngLL" style="width: 40px" contenteditable="true"></td>
                                    <td id="prongLL" style="width: 40px" contenteditable="true"></td>
                                    <td id="silLL" style="width: 40px" contenteditable="true"></td>
                                    <td id="total" style="width: 50px" contenteditable="true"></td>
                                </tr>
                            </table>
                        </div>
                    </body>
                </div>
            </div>
        </div>
    </div>
    {{-- @include('Extruder.Extruder.ModalLaporanProdGedD') --}}
    <script src="{{ asset('js/Extruder/ExtruderNet/LaporanProduksiExtruder.js') }}"></script>
    {{-- @include('Extruder.Extruder.printLaporanProduksiExtruder') --}}
@endsection
